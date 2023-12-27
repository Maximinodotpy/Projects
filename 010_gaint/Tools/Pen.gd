extends "res://Tools/ToolTemplate.gd"

func _init():
	icon = load("res://Icons/pen.png")
	tool_name = 'Pen'

func tool_selected():
	print('Selected Pen from pen')

func canvas_clicked(where: Vector2):
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT):
		Layers.draw_pixel(where, UserInterface.get_primary_color())
	elif Input.is_mouse_button_pressed(MOUSE_BUTTON_RIGHT):
		Layers.draw_pixel(where, UserInterface.get_secondary_color())

func dragging(start, current, relative):
	print('------------')

	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT):
		Layers.draw_line(current - relative, current, UserInterface.get_primary_color())
	elif Input.is_mouse_button_pressed(MOUSE_BUTTON_RIGHT):
		Layers.draw_line(current - relative, current, UserInterface.get_secondary_color())
