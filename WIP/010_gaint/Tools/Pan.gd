extends "res://Tools/ToolTemplate.gd"

func _init():
	icon = load("res://Icons/hand.png")
	tool_name = 'Pan'

func dragging_container(relative):
	var relative_adj = relative
	UserInterface.canvas_texture.position += relative_adj
