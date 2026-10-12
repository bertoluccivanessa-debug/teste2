extends Control

const BG := Color("09142f")
const PANEL := Color("111f40")
const PANEL_ALT := Color("172951")
const BORDER := Color("29457a")
const CYAN := Color("61e7f5")
const AMBER := Color("ffca72")
const GREEN := Color("62e39a")
const RED := Color("ff7b8a")
const MUTED := Color("9bb1d6")

var cases: Array[Dictionary] = []
var case_index := 0
var current_case: Dictionary = {}
var selected_evidence: String = ""
var selected_mechanism: String = ""
var links: Array = []
var wrong_attempts := 0
var hints_used := 0
var xp := 0

var root_box: VBoxContainer
var header_box: HBoxContainer
var content_box: HBoxContainer
var patient_panel: PanelContainer
var board_panel: PanelContainer
var evidence_panel: PanelContainer
var feedback_label: Label
var links_box: VBoxContainer
var evidence_box: VBoxContainer
var mechanism_box: VBoxContainer
var xp_label: Label
var progress_label: Label
var case_title: Label
var case_summary: Label
var validate_button: Button

func _ready() -> void:
    cases = ImmunoCatalog.cases()
    xp = int(SaveStore.data.get("xp", 0))
    _load_saved_case()
    _build_interface()
    _render_case()

func _load_saved_case() -> void:
    var saved_id: String = str(SaveStore.data.get("current_case", "caso_01"))
    for i in cases.size():
        if cases[i].get("id") == saved_id:
            case_index = i
            break
    current_case = cases[case_index]

func _build_interface() -> void:
    var background := ColorRect.new()
    background.color = BG
    background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
    add_child(background)

    var glow := ColorRect.new()
    glow.color = Color("102a51")
    glow.position = Vector2(0, 0)
    glow.size = Vector2(1440, 7)
    add_child(glow)

    root_box = VBoxContainer.new()
    root_box.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT, Control.PRESET_MODE_MINSIZE, 36)
    root_box.add_theme_constant_override("separation", 18)
    add_child(root_box)

    _build_header()
    _build_content()
    _build_action_bar()

    var footer := Label.new()
    footer.text = "IMMUNOVERSE  /  laboratório de raciocínio clínico  ·  progresso salvo localmente"
    footer.add_theme_color_override("font_color", Color("5c77a6"))
    footer.add_theme_font_size_override("font_size", 12)
    footer.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
    root_box.add_child(footer)

func _build_header() -> void:
    header_box = HBoxContainer.new()
    header_box.custom_minimum_size.y = 74
    header_box.add_theme_constant_override("separation", 22)
    root_box.add_child(header_box)

    var brand := VBoxContainer.new()
    brand.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    header_box.add_child(brand)
    var kicker := Label.new()
    kicker.text = "MISSÃO  ·  QUADRO DE CASOS CLÍNICOS"
    kicker.add_theme_color_override("font_color", CYAN)
    kicker.add_theme_font_size_override("font_size", 12)
    brand.add_child(kicker)
    var title := Label.new()
    title.text = "IMMUNOVERSE"
    title.add_theme_color_override("font_color", Color("f3f7ff"))
    title.add_theme_font_size_override("font_size", 29)
    brand.add_child(title)

    case_title = Label.new()
    case_title.custom_minimum_size.x = 245
    case_title.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    case_title.add_theme_color_override("font_color", Color("dbe7ff"))
    case_title.add_theme_font_size_override("font_size", 16)
    header_box.add_child(case_title)

    progress_label = _stat_chip("CASO 1 / 2", AMBER)
    header_box.add_child(progress_label)
    xp_label = _stat_chip("XP 000", GREEN)
    header_box.add_child(xp_label)
    var pause := _button("PAUSAR", Color("243b69"))
    pause.pressed.connect(_on_pause)
    header_box.add_child(pause)

func _build_content() -> void:
    content_box = HBoxContainer.new()
    content_box.size_flags_vertical = Control.SIZE_EXPAND_FILL
    content_box.add_theme_constant_override("separation", 16)
    root_box.add_child(content_box)
    patient_panel = _make_panel()
    patient_panel.custom_minimum_size.x = 275
    content_box.add_child(patient_panel)
    board_panel = _make_panel()
    board_panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    content_box.add_child(board_panel)
    evidence_panel = _make_panel()
    evidence_panel.custom_minimum_size.x = 330
    content_box.add_child(evidence_panel)

func _build_action_bar() -> void:
    var bar := HBoxContainer.new()
    bar.custom_minimum_size.y = 82
    bar.add_theme_constant_override("separation", 12)
    root_box.add_child(bar)
    var intro_box := VBoxContainer.new()
    intro_box.size_flags_horizontal = Control.SIZE_EXPAND_FILL
    bar.add_child(intro_box)
    var intro := Label.new()
    intro.text = "SEU RACIOCÍNIO  ·  selecione uma evidência e depois o mecanismo correspondente."
    intro.add_theme_color_override("font_color", MUTED)
    intro.add_theme_font_size_override("font_size", 13)
    intro_box.add_child(intro)
    feedback_label = Label.new()
    feedback_label.text = "Escolha uma evidência para iniciar a investigação."
    feedback_label.add_theme_color_override("font_color", MUTED)
    feedback_label.add_theme_font_size_override("font_size", 13)
    feedback_label.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    intro_box.add_child(feedback_label)
    var hint := _button("DICA  −20 XP", Color("604c32"))
    hint.pressed.connect(_on_hint)
    bar.add_child(hint)
    validate_button = _button("VALIDAR CASO", Color("1c735f"))
    validate_button.pressed.connect(_on_validate_case)
    bar.add_child(validate_button)

func _render_case() -> void:
    current_case = cases[case_index]
    selected_evidence = ""
    selected_mechanism = ""
    links.clear()
    wrong_attempts = 0
    hints_used = 0
    _clear_children(patient_panel)
    _clear_children(board_panel)
    _clear_children(evidence_panel)
    case_title.text = str(current_case.get("id", "")).to_upper().replace("_", " ")
    progress_label.text = "CASO %d / %d" % [case_index + 1, cases.size()]
    xp_label.text = "XP %03d" % xp
    _render_patient()
    _render_board()
    _render_evidence()
    _set_feedback("Escolha uma evidência para iniciar a investigação.", MUTED)

func _render_patient() -> void:
    var box := _panel_content(patient_panel, "PACIENTE INDEXADO", CYAN)
    var avatar := Label.new()
    avatar.text = "◉"
    avatar.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    avatar.add_theme_color_override("font_color", CYAN)
    avatar.add_theme_font_size_override("font_size", 64)
    box.add_child(avatar)
    var name := Label.new()
    name.text = str(current_case.get("patient_name"))
    name.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    name.add_theme_color_override("font_color", Color("f3f7ff"))
    name.add_theme_font_size_override("font_size", 20)
    box.add_child(name)
    var summary := Label.new()
    summary.text = str(current_case.get("summary"))
    summary.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
    summary.add_theme_color_override("font_color", MUTED)
    summary.add_theme_font_size_override("font_size", 14)
    box.add_child(summary)
    _spacer(box, 8)
    var symptom_title := Label.new()
    symptom_title.text = "SINAIS OBSERVADOS"
    symptom_title.add_theme_color_override("font_color", AMBER)
    symptom_title.add_theme_font_size_override("font_size", 11)
    box.add_child(symptom_title)
    for symptom in current_case.get("symptoms", []):
        var row := Label.new()
        row.text = "  ·  " + str(symptom)
        row.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
        row.add_theme_color_override("font_color", Color("c4d3ee"))
        box.add_child(row)

func _render_board() -> void:
    var box := _panel_content(board_panel, "MAPA DE RELAÇÕES", AMBER)
    var instruction := Label.new()
    instruction.text = "Conecte cada pista ao mecanismo que explica o caso."
    instruction.add_theme_color_override("font_color", MUTED)
    box.add_child(instruction)
    _spacer(box, 8)
    links_box = VBoxContainer.new()
    links_box.add_theme_constant_override("separation", 8)
    links_box.size_flags_vertical = Control.SIZE_EXPAND_FILL
    box.add_child(links_box)
    var empty := Label.new()
    empty.name = "EmptyState"
    empty.text = "Nenhuma conexão construída ainda.\n\nO quadro ficará mais claro a cada hipótese."
    empty.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    empty.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    empty.size_flags_vertical = Control.SIZE_EXPAND_FILL
    empty.add_theme_color_override("font_color", Color("6683b5"))
    links_box.add_child(empty)

func _render_evidence() -> void:
    var box := _panel_content(evidence_panel, "PISTAS E MECANISMOS", GREEN)
    var evidence_title := Label.new()
    evidence_title.text = "EVIDÊNCIAS"
    evidence_title.add_theme_color_override("font_color", AMBER)
    evidence_title.add_theme_font_size_override("font_size", 11)
    box.add_child(evidence_title)
    evidence_box = VBoxContainer.new()
    evidence_box.add_theme_constant_override("separation", 7)
    box.add_child(evidence_box)
    for evidence in current_case.get("evidence", []):
        var button := _button("▣  " + str(evidence.get("title")), Color("1b315c"))
        button.alignment = HORIZONTAL_ALIGNMENT_LEFT
        button.tooltip_text = str(evidence.get("description"))
        button.pressed.connect(_select_evidence.bind(evidence))
        evidence_box.add_child(button)
    _spacer(box, 10)
    var mech_title := Label.new()
    mech_title.text = "MECANISMOS IMUNES"
    mech_title.add_theme_color_override("font_color", CYAN)
    mech_title.add_theme_font_size_override("font_size", 11)
    box.add_child(mech_title)
    mechanism_box = VBoxContainer.new()
    mechanism_box.add_theme_constant_override("separation", 7)
    box.add_child(mechanism_box)
    for mechanism in current_case.get("mechanisms", []):
        var button := _button("◇  " + str(mechanism.get("title")), Color("1b315c"))
        button.alignment = HORIZONTAL_ALIGNMENT_LEFT
        button.tooltip_text = str(mechanism.get("tag"))
        button.pressed.connect(_select_mechanism.bind(mechanism))
        mechanism_box.add_child(button)

func _select_evidence(evidence: Dictionary) -> void:
    selected_evidence = str(evidence.get("id"))
    _set_feedback("Pista selecionada: %s  ·  agora escolha o mecanismo que a explica." % evidence.get("title"), CYAN)

func _select_mechanism(mechanism: Dictionary) -> void:
    selected_mechanism = str(mechanism.get("id"))
    if selected_evidence.is_empty():
        _set_feedback("Selecione uma evidência primeiro; depois conecte o mecanismo.", AMBER)
        return
    for link in links:
        if link[0] == selected_evidence:
            _set_feedback("Esta evidência já está conectada. Escolha outra pista.", AMBER)
            return
    var correct := false
    for pair in current_case.get("correct_links", []):
        if pair[0] == selected_evidence and pair[1] == selected_mechanism:
            correct = true
            break
    if correct:
        links.append([selected_evidence, selected_mechanism, true])
        _set_feedback("Conexão coerente registrada. O mecanismo explica a evidência.", GREEN)
    else:
        wrong_attempts += 1
        _set_feedback("Hipótese não sustentada por esta pista. Revise a função do mecanismo.", RED)
    selected_evidence = ""
    selected_mechanism = ""
    _refresh_links()

func _refresh_links() -> void:
    if not is_instance_valid(links_box): return
    for child in links_box.get_children():
        child.queue_free()
    if links.is_empty():
        var empty := Label.new()
        empty.text = "Nenhuma conexão construída ainda.\n\nO quadro ficará mais claro a cada hipótese."
        empty.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
        empty.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
        empty.size_flags_vertical = Control.SIZE_EXPAND_FILL
        empty.add_theme_color_override("font_color", Color("6683b5"))
        links_box.add_child(empty)
        return
    for link in links:
        var row := HBoxContainer.new()
        row.add_theme_constant_override("separation", 10)
        var label := Label.new()
        label.text = "  %s   →   %s" % [_evidence_title(link[0]), _mechanism_title(link[1])]
        label.add_theme_color_override("font_color", GREEN)
        label.add_theme_font_size_override("font_size", 15)
        label.size_flags_horizontal = Control.SIZE_EXPAND_FILL
        row.add_child(label)
        var mark := Label.new()
        mark.text = "VALIDADA"
        mark.add_theme_color_override("font_color", GREEN)
        mark.add_theme_font_size_override("font_size", 11)
        row.add_child(mark)
        links_box.add_child(row)

func _on_validate_case() -> void:
    var total: int = current_case.get("correct_links", []).size()
    if links.size() < total:
        _set_feedback("Ainda faltam %d conexão(ões) para fechar o caso." % (total - links.size()), AMBER)
        return
    var reward := ProgressionService.reward(current_case, links.size(), hints_used)
    var pedagogical_score := PedagogicalAssessment.score(links.size(), total, wrong_attempts)
    xp += reward
    var id := str(current_case.get("id"))
    if not SaveStore.data["completed_cases"].has(id):
        SaveStore.data["completed_cases"].append(id)
    SaveStore.data["current_case"] = id
    SaveStore.data["xp"] = xp
    SaveStore.data["pedagogical_scores"][id] = pedagogical_score
    SaveStore.save_progress()
    xp_label.text = "XP %03d" % xp
    _set_feedback("CASO CONCLUÍDO  ·  +%d XP  ·  Domínio pedagógico: %.1f/10  ·  %s" % [reward, pedagogical_score, PedagogicalAssessment.label_for(pedagogical_score)], GREEN)
    validate_button.text = "PRÓXIMO CASO"
    validate_button.pressed.disconnect(_on_validate_case)
    validate_button.pressed.connect(_next_case)

func _next_case() -> void:
    case_index = (case_index + 1) % cases.size()
    SaveStore.data["current_case"] = cases[case_index].get("id")
    SaveStore.save_progress()
    validate_button.text = "VALIDAR CASO"
    validate_button.pressed.disconnect(_next_case)
    validate_button.pressed.connect(_on_validate_case)
    _render_case()

func _on_hint() -> void:
    hints_used += 1
    var pending := []
    for pair in current_case.get("correct_links", []):
        var found := false
        for link in links:
            if link[0] == pair[0]: found = true
        if not found: pending.append(pair)
    if pending.is_empty():
        _set_feedback("Todas as relações já foram encontradas. Valide o caso.", GREEN)
    else:
        _set_feedback("Dica: procure a relação entre “%s” e sua função imunológica principal." % _evidence_title(pending[0][0]), AMBER)

func _on_pause() -> void:
    get_tree().paused = not get_tree().paused
    _set_feedback("Jogo pausado." if get_tree().paused else "Jogo retomado.", AMBER)

func _set_feedback(text: String, color: Color) -> void:
    if feedback_label:
        feedback_label.text = text
        feedback_label.add_theme_color_override("font_color", color)

func _evidence_title(id: String) -> String:
    for e in current_case.get("evidence", []):
        if e.get("id") == id: return str(e.get("title"))
    return id

func _mechanism_title(id: String) -> String:
    for m in current_case.get("mechanisms", []):
        if m.get("id") == id: return str(m.get("title"))
    return id

func _make_panel() -> PanelContainer:
    var panel := PanelContainer.new()
    var style := StyleBoxFlat.new()
    style.bg_color = PANEL
    style.border_color = BORDER
    style.set_border_width_all(1)
    style.set_corner_radius_all(12)
    style.content_margin_left = 18
    style.content_margin_right = 18
    style.content_margin_top = 16
    style.content_margin_bottom = 16
    panel.add_theme_stylebox_override("panel", style)
    return panel

func _panel_content(panel: PanelContainer, heading: String, color: Color) -> VBoxContainer:
    var box := VBoxContainer.new()
    box.add_theme_constant_override("separation", 10)
    panel.add_child(box)
    var title := Label.new()
    title.text = heading
    title.add_theme_color_override("font_color", color)
    title.add_theme_font_size_override("font_size", 12)
    box.add_child(title)
    var line := ColorRect.new()
    line.color = Color(color, 0.35)
    line.custom_minimum_size.y = 1
    box.add_child(line)
    return box

func _button(text: String, color: Color) -> Button:
    var button := Button.new()
    button.text = text
    button.custom_minimum_size.y = 42
    button.add_theme_color_override("font_color", Color("dce8ff"))
    button.add_theme_color_override("font_hover_color", Color.WHITE)
    button.add_theme_font_size_override("font_size", 13)
    var style := StyleBoxFlat.new()
    style.bg_color = color
    style.set_corner_radius_all(7)
    style.content_margin_left = 12
    style.content_margin_right = 12
    button.add_theme_stylebox_override("normal", style)
    var hover := style.duplicate()
    hover.bg_color = color.lightened(0.12)
    button.add_theme_stylebox_override("hover", hover)
    return button

func _stat_chip(text: String, color: Color) -> Label:
    var label := Label.new()
    label.text = text
    label.vertical_alignment = VERTICAL_ALIGNMENT_CENTER
    label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
    label.custom_minimum_size = Vector2(110, 38)
    label.add_theme_color_override("font_color", color)
    label.add_theme_font_size_override("font_size", 12)
    return label

func _spacer(box: Container, amount: int) -> void:
    var spacer := Control.new()
    spacer.custom_minimum_size.y = amount
    box.add_child(spacer)

func _clear_children(node: Node) -> void:
    for child in node.get_children():
        child.queue_free()

func _render_feedback_host() -> void:
    pass
