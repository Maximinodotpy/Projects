extends "res://Tools/ToolTemplate.gd"


func _init():
	tool_name = 'Bucket'
	icon = load("res://Icons/paint-bucket.png")
	tool_shortcut = Helpers.createShortcut(KEY_B, true)

func canvas_clicked(where: Vector2):
	var pixels = Helpers.getFloodFillPixels(Layers.get_merged_image(), where, Layers.get_pixel_color_at(where))

	for pixel in pixels:
		var color = UserInterface.get_primary_color()
		if Input.is_mouse_button_pressed(MOUSE_BUTTON_RIGHT):
			color = UserInterface.get_secondary_color()

		Layers.draw_pixel(pixel, color)

	History.create_snapshot('Filled layer')
