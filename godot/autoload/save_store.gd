extends Node

const SAVE_PATH := "user://immunoverse_progress.json"
var data: Dictionary = {
    "current_case": "caso_01",
    "completed_cases": [],
    "xp": 0,
    "pedagogical_scores": {},
    "hints_used": {}
}

func _ready() -> void:
    load_progress()

func load_progress() -> void:
    if not FileAccess.file_exists(SAVE_PATH):
        return
    var file := FileAccess.open(SAVE_PATH, FileAccess.READ)
    var parsed = JSON.parse_string(file.get_as_text())
    if parsed is Dictionary:
        for key in data:
            if parsed.has(key):
                data[key] = parsed[key]

func save_progress() -> void:
    var file := FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    file.store_string(JSON.stringify(data))

func reset_progress() -> void:
    data = {"current_case": "caso_01", "completed_cases": [], "xp": 0, "pedagogical_scores": {}, "hints_used": {}}
    save_progress()
