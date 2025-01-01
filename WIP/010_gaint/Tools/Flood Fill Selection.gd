extends "res://Tools/ToolTemplate.gd"


func _init():
	icon = load("res://Icons/wand.png")
	tool_name = 'Flood fill selection'


func canvas_clicked(where: Vector2):
	var pixels = Helpers.getFloodFillPixels(Layers.get_merged_image(), where, Layers.get_pixel_color_at(where))

	if not Input.is_key_pressed(KEY_SHIFT):
		Selection.unselect_all()

	for pos in pixels:
		Selection.add_pixel_to_selection(pos)
