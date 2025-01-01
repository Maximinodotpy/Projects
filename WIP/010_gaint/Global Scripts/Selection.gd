extends Node

signal selection_changed

var selected_pixels: Array[Vector2] = []

func get_selection() -> Array[Vector2]:
	return selected_pixels

func select_all():
	selected_pixels = []

	for y in range(Layers.image_dimensions.y):
		for x in range(Layers.image_dimensions.x):
			selected_pixels.append(Vector2(x, y))

	selection_changed.emit()

func unselect_all():
	selected_pixels = []
	selection_changed.emit()

func inverse_selection():
	var new_selection: Array[Vector2] = []

	for y in range(Layers.image_dimensions.y):
		for x in range(Layers.image_dimensions.x):
			var pos = Vector2(x, y)
			if not get_selection().has(pos):
				new_selection.append(pos)

	selected_pixels = new_selection
	selection_changed.emit()

func add_rect_to_selection(rect: Rect2):
	for y in range(rect.position.y, rect.position.y + rect.size.y):
		for x in range(rect.position.x, rect.position.x + rect.size.x):
			var pos = Vector2(x, y)

			if not get_selection().has(pos):
				selected_pixels.append(pos)

	selection_changed.emit()

func remove_rect_from_selection(rect: Rect2):
	for y in range(rect.position.y, rect.position.y + rect.size.y):
		for x in range(rect.position.x, rect.position.x + rect.size.x):
			var pos = Vector2(x, y)

			if get_selection().has(pos):
				selected_pixels.erase(pos)

	selection_changed.emit()

func add_pixel_to_selection(where: Vector2):
	if not selected_pixels.has(where):
		selected_pixels.append(where)
		selection_changed.emit()
