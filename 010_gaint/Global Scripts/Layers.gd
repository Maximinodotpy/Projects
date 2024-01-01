extends Node

signal added_layer(layer: ImageLayer)
signal removed_layer(layer: ImageLayer)

signal pixel_modified

signal current_layer_changed(old: int, new: int)

var layer_data: Array[ImageLayer] = []
var current_layer = 0

var image_dimensions = Vector2(200, 200)

func _init():
	History.bind_info(
		'layer_data',
		func(): return get_layer_data_copy(),
		func(data): set_layer_data(data)
	)

	History.stop_tracking()
	add_canvas_layer()
	History.continue_tracking()

	History.clear_history()

func get_layer_data() -> Array[ImageLayer]:
	return layer_data

func get_layer_data_copy() -> Array[ImageLayer]:
	var new_arr: Array[ImageLayer] = []

	for layer in get_layer_data():
		# The image has to be exctracted and reinserted
		var new_layer: ImageLayer = layer.duplicate()
		new_layer.layer_texture.set_image(layer.layer_texture.get_image())
		new_layer.visible = layer.visible
		new_layer.layer_name = layer.layer_name
		new_arr.append(new_layer)

	return new_arr

func clear_layer_data():
	for layer in Layers.get_layer_data():
		Layers.remove_layer(layer)

func add_canvas_layer() -> ImageLayer:
	print('Adding Layer')

	var new_layer = ImageLayer.new()

	new_layer.layer_texture.set_image(
		Image.create(image_dimensions.x, image_dimensions.y, true, Image.FORMAT_RGBA8)
	)

	layer_data.append(new_layer)
	added_layer.emit(new_layer)

	History.create_snapshot('Added layer')

	return new_layer

func remove_layer(layer: ImageLayer):
	var deleted_index = layer_data.find(layer)
	if current_layer == deleted_index:
		if current_layer != 0:
			switch_to_layer(layer_data[current_layer-1])

	layer_data.erase(layer)
	removed_layer.emit(layer)

	History.create_snapshot('Removed layer')

func am_i_the_current_layer(layer: ImageLayer):
	return current_layer == layer_data.find(layer)

func switch_to_layer(layer: ImageLayer):
	var old_index = current_layer
	current_layer = layer_data.find(layer)
	current_layer_changed.emit(old_index, current_layer)

func get_image_rect() -> Rect2:
	return Rect2(Vector2(0, 0), Layers.image_dimensions)

func draw_pixel(where: Vector2, color: Color):
	var image = get_current_layer_data().layer_texture.get_image()
	image.set_pixelv(where, color)
	get_current_layer_data().layer_texture.set_image(image)
	pixel_modified.emit()

func draw_line(start: Vector2, end: Vector2, color: Color):
	for pos in Helpers.getIntegerVectorLine(start, end):
		draw_pixel(pos, color)
	pixel_modified.emit()

func get_pixel_color_at(position: Vector2):
	return get_merged_image().get_pixelv(position)

func toggle_layer_visibility(layer: ImageLayer, force = null):
	if force == null:
		layer.visible = not layer.visible
	else:
		layer.visible = force

	History.create_snapshot('Toggled layer visibility')

func get_merged_image() -> Image:
	var composition = Image.create(image_dimensions.x, image_dimensions.y, true, Image.FORMAT_RGBA8)

	for layer in get_layer_data():
		composition.blit_rect(layer.layer_texture.get_image(), get_image_rect(), Vector2.ZERO)

	return composition

func remove_selected_pixels_in_current_layer():
	var img = get_current_layer_data().layer_texture.get_image()

	for pixel in Selection.get_selection():
		img.set_pixelv(pixel, Color(0, 0, 0, 0))
		pixel_modified.emit()

	get_current_layer_data().layer_texture.set_image(img)

	History.create_snapshot('Removed selected pixels')

func get_current_layer_data() -> ImageLayer:
	# Ensure that the current layer cannot be more than the amount of layers
	current_layer = min(current_layer, layer_data.size() - 1)

	return layer_data[current_layer]

func set_layer_data(new_layer_data: Array[ImageLayer]):
	History.stop_tracking()

	for old_layer in get_layer_data().duplicate():
		remove_layer(old_layer)

	for new_layer in new_layer_data:
		var layer = add_canvas_layer()
		layer.layer_name = new_layer.layer_name
		layer.layer_texture.set_image(new_layer.layer_texture.get_image())
		layer.visible = new_layer.visible

	History.continue_tracking()

func get_fillable_pixels(from: Vector2, image: Image, tolerance = 0):
	pass

func duplicate_layer(layer: ImageLayer):
	var index = get_layer_data().find(layer)
	var new_layer = layer.copy()
	layer_data.insert(index + 1, new_layer)

	added_layer.emit(new_layer)
	History.create_snapshot('Duplicated layer')

func invert_colors_in_current_layer():
	var img = get_current_layer_data().layer_texture.get_image()

	for y in range(image_dimensions.y):
		for x in range(image_dimensions.x):
			var color = img.get_pixel(x, y)
			color.inverted()
			img.set_pixel(x, y, color.inverted())

	get_current_layer_data().layer_texture.set_image(img)

	History.create_snapshot('Inverted colors in current layer')

func black_and_white_current_layer():
	var img = get_current_layer_data().layer_texture.get_image()

	for y in range(image_dimensions.y):
		for x in range(image_dimensions.x):
			var color = img.get_pixel(x, y)
			color.s = 0
			img.set_pixel(x, y, color)

	get_current_layer_data().layer_texture.set_image(img)

	History.create_snapshot('Black and white current layer')
