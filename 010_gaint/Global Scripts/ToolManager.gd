extends Node

signal tool_changed

var tools: Array[ToolScript] = [
	preload("res://Tools/Pen.gd").new(),
	preload("res://Tools/Pipette.gd").new(),
	preload("res://Tools/Box Select.gd").new(),
	preload("res://Tools/Bucket.gd").new(),
	preload("res://Tools/Pan.gd").new(),
]

var current_tool = 0

var is_dragging = false
var drag_start_pos = Vector2.ZERO
var drag_last_pos = Vector2.ZERO

func _ready():
	UserInterface.canvas_container.gui_input.connect(gui_input_callback)

func get_current_tool() -> ToolScript:
	return tools[current_tool]

func switch_to_tool(index):
	get_current_tool().tool_deselected()
	current_tool = index
	get_current_tool().tool_selected()
	tool_changed.emit()

func gui_input_callback(event):
	#print(event)
	var canvas_mouse_pos = UserInterface.canvas_texture.get_local_mouse_position().floor()

	if event is InputEventMouseButton:

		var right_or_left_pressed = [MOUSE_BUTTON_LEFT, MOUSE_BUTTON_RIGHT].has(event.button_index)
		var left_pressed = event.button_index == MOUSE_BUTTON_LEFT

		if right_or_left_pressed and event.pressed:
			is_dragging = true
			drag_start_pos = canvas_mouse_pos
			drag_last_pos = canvas_mouse_pos

			if left_pressed: get_current_tool().drag_start_left(canvas_mouse_pos)
			else: get_current_tool().drag_start_right(canvas_mouse_pos)

			get_current_tool().drag_start(canvas_mouse_pos)

		if right_or_left_pressed and not event.pressed:
			is_dragging = false

			if left_pressed: get_current_tool().drag_end_left(drag_start_pos, canvas_mouse_pos)
			else: get_current_tool().drag_end_right(drag_start_pos, canvas_mouse_pos)

			get_current_tool().drag_end(drag_start_pos, canvas_mouse_pos)

		if right_or_left_pressed:
			if Layers.get_image_rect().has_point(canvas_mouse_pos):
				get_current_tool().canvas_clicked(canvas_mouse_pos)

	if event is InputEventMouseMotion:
		if Layers.get_image_rect().has_point(canvas_mouse_pos):
			get_current_tool().canvas_mouse_move(canvas_mouse_pos)

		if is_dragging:
			if event.button_mask == MOUSE_BUTTON_LEFT: get_current_tool().drag_end_left(drag_start_pos, canvas_mouse_pos)
			else: get_current_tool().drag_end_right(drag_start_pos, canvas_mouse_pos)

			get_current_tool().dragging(drag_start_pos, canvas_mouse_pos, canvas_mouse_pos - drag_last_pos)
			get_current_tool().dragging_container(event.relative)

			drag_last_pos = canvas_mouse_pos
