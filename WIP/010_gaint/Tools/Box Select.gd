extends "res://Tools/ToolTemplate.gd"

var indicator_box: Panel
var style_box = preload("res://Tools/box_select_style_box.tres")

func _init():
	icon = load("res://Icons/box-select.png")
	tool_name = 'Box Select'
	tool_shortcut = Helpers.createShortcut(KEY_M, true)

func tool_selected():
	indicator_box = Panel.new()
	indicator_box.size = Vector2(100, 100)
	indicator_box.add_theme_stylebox_override('panel', style_box)
	UserInterface.canvas_texture.add_child(indicator_box)

	indicator_box.hide()

	indicator_box.mouse_filter = Control.MOUSE_FILTER_IGNORE

	var t = indicator_box.create_tween().set_loops()

	t.tween_property(indicator_box, 'modulate', Color(1,1,1), 0.1)
	t.tween_property(indicator_box, 'modulate', Color(0,0,0), 0.2)
	t.tween_property(indicator_box, 'modulate', Color(1,1,1), 0.3)

func tool_deselected():
	indicator_box.queue_free()

func drag_start(start):
	indicator_box.show()
	indicator_box.position = start
	indicator_box.size = Vector2.ZERO

func dragging(start, current, _rel):
	var rect = get_rect(start, current)
	indicator_box.position = rect.position
	indicator_box.size = rect.size

func get_rect(pos1, pos2):
	var rect = Rect2(pos1, Vector2.ZERO)
	rect = rect.expand(pos1)
	rect = rect.expand(pos2)

	return rect

func drag_end(start, end):
	var rect = get_rect(start, end)

	if Input.is_key_pressed(KEY_ALT):
		Selection.remove_rect_from_selection(rect)
	else:
		if not Input.is_key_pressed(KEY_SHIFT):
			Selection.unselect_all()

		Selection.add_rect_to_selection(rect)

	indicator_box.hide()
