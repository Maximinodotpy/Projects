extends "res://Tools/ToolTemplate.gd"

var color_rect_preview: ColorRect

func _init():
	icon = load("res://Icons/pen.png")
	tool_name = 'Pen'
	tool_shortcut = Helpers.createShortcut(KEY_P)

func tool_selected():
	color_rect_preview = ColorRect.new()
	color_rect_preview.size = Vector2(1, 1)

	UserInterface.preview_container.add_child(color_rect_preview)

func canvas_entered(): color_rect_preview.show()
func canvas_left(): color_rect_preview.hide()

func tool_deselected():
	if color_rect_preview:
		color_rect_preview.queue_free()

func canvas_mouse_move(where: Vector2):
	print(where)
	color_rect_preview.position = where
	color_rect_preview.color = UserInterface.get_primary_color()

func drag_start(where: Vector2): draw_with_pen(where, where, Vector2.ZERO)
func dragging(start, current, relative): draw_with_pen(start, current, relative)

func draw_with_pen(start, current, relative):
	if Input.is_mouse_button_pressed(MOUSE_BUTTON_LEFT):
		Layers.draw_line(current - relative, current, UserInterface.get_primary_color())
	elif Input.is_mouse_button_pressed(MOUSE_BUTTON_RIGHT):
		Layers.draw_line(current - relative, current, UserInterface.get_secondary_color())

func drag_end(start, end):
	History.create_snapshot('Drew with pen')
