class_name PedagogicalAssessment
extends RefCounted

static func score(correct_count: int, total: int, wrong_attempts: int) -> float:
    if total <= 0:
        return 0.0
    var base := float(correct_count) / float(total) * 10.0
    var penalty := minf(float(wrong_attempts) * 0.5, 2.0)
    return snapped(maxf(base - penalty, 0.0), 0.1)

static func label_for(score_value: float) -> String:
    if score_value >= 9.0: return "Domínio consolidado"
    if score_value >= 7.0: return "Boa compreensão"
    if score_value >= 5.0: return "Em desenvolvimento"
    return "Revisão recomendada"
