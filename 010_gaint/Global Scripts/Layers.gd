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
		func(): return get_layer_data(),
		func(data): set_layer_data(data)
	)

	add_canvas_layer()

func get_layer_data() -> Array[ImageLayer]:
	return layer_data

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

	History.create_snapshot('Switched active layer')

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

func get_current_layer_data() -> ImageLayer:
	return layer_data[current_layer]

func set_layer_data(new_layer_data: Array[ImageLayer]):
	for old_layer in get_layer_data():
		if not new_layer_data.has(old_layer):
			layer_data.erase(old_layer)
			removed_layer.emit(old_layer)

	for new_layer in layer_data:
		if not new_layer in layer_data:
			layer_data.append(new_layer)
			added_layer.emit(new_layer)
