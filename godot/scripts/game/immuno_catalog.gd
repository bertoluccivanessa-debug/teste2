class_name ImmunoCatalog
extends RefCounted

static func cases() -> Array[Dictionary]:
    return [
        {
            "id": "caso_01",
            "patient_name": "Marina Alves, 34 anos",
            "summary": "Febre persistente, fadiga e dor articular após infecção respiratória.",
            "symptoms": ["Febre baixa recorrente", "Fadiga intensa", "Dor articular"],
            "evidence": [
                {"id": "ev_01", "title": "C3b elevado", "description": "Fragmentos de C3b aparecem depositados na superfície do patógeno.", "mechanism": "opsonizacao"},
                {"id": "ev_02", "title": "Macrófagos ativados", "description": "Células fagocíticas estão recrutadas para o tecido inflamado.", "mechanism": "fagocitose"},
                {"id": "ev_03", "title": "Antígeno apresentado", "description": "Peptídeos do agente são exibidos no MHC para reconhecimento celular.", "mechanism": "apresentacao"}
            ],
            "mechanisms": [
                {"id": "opsonizacao", "title": "Opsonização", "tag": "marcar para eliminar"},
                {"id": "fagocitose", "title": "Fagocitose", "tag": "capturar e digerir"},
                {"id": "apresentacao", "title": "Apresentação de antígeno", "tag": "ativar resposta"}
            ],
            "correct_links": [["ev_01", "opsonizacao"], ["ev_02", "fagocitose"], ["ev_03", "apresentacao"]],
            "xp": 180,
            "pedagogical_weight": 2
        },
        {
            "id": "caso_02",
            "patient_name": "Rafael Souza, 19 anos",
            "summary": "Infecções recorrentes e baixa produção de anticorpos após vacinação.",
            "symptoms": ["Infecções recorrentes", "Resposta vacinal reduzida", "Linfonodos aumentados"],
            "evidence": [
                {"id": "ev_04", "title": "Linfócitos B imaturos", "description": "Amostra mostra baixa diferenciação de células produtoras de anticorpos.", "mechanism": "anticorpos"},
                {"id": "ev_05", "title": "Memória imunológica", "description": "Poucas células de memória foram identificadas após o reforço vacinal.", "mechanism": "memoria"},
                {"id": "ev_06", "title": "T auxiliares", "description": "Sinalização reduzida entre linfócitos T auxiliares e células B.", "mechanism": "cooperacao"}
            ],
            "mechanisms": [
                {"id": "anticorpos", "title": "Produção de anticorpos", "tag": "neutralizar agentes"},
                {"id": "memoria", "title": "Memória imunológica", "tag": "responder mais rápido"},
                {"id": "cooperacao", "title": "Cooperação T–B", "tag": "orquestrar resposta"}
            ],
            "correct_links": [["ev_04", "anticorpos"], ["ev_05", "memoria"], ["ev_06", "cooperacao"]],
            "xp": 220,
            "pedagogical_weight": 3
        }
    ]
