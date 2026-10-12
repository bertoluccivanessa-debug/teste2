class_name ProgressionService
extends RefCounted

static func reward(case_data: Dictionary, correct_count: int, hints_used: int) -> int:
    var total: int = case_data.get("correct_links", []).size()
    var completion := int(case_data.get("xp", 0))
    var accuracy_bonus := 40 if correct_count == total else correct_count * 10
    var hint_penalty := hints_used * 20
    return maxi(completion + accuracy_bonus - hint_penalty, 0)
