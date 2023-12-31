extends "res://Tools/ToolTemplate.gd"


func _init():
	tool_name = 'Bucket'
	icon = load("res://Icons/paint-bucket.png")
	tool_shortcut = Helpers.createShortcut(KEY_B, true)
