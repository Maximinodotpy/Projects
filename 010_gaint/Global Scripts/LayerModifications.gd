extends Node

func invert_layers(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()
		for y in range(Layers.image_dimensions.y):
			for x in range(Layers.image_dimensions.x):
				var color = img.get_pixel(x, y)
				color.inverted()
				img.set_pixel(x, y, color.inverted())

		layer.layer_texture.set_image(img)

	History.create_snapshot('Inverted colors in %s Layer(s)' % [ layers.size() ])


func black_and_white(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()

		for y in range(Layers.image_dimensions.y):
			for x in range(Layers.image_dimensions.x):
				var color = img.get_pixel(x, y)
				color.s = 0
				img.set_pixel(x, y, color)

		layer.layer_texture.set_image(img)

	History.create_snapshot('Black and white %s Layer(s)' % [ layers.size() ])


func mirror_vertically(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()
		img.flip_x()
		layer.layer_texture.set_image(img)

	History.create_snapshot('Mirrored %s Layer(s) vertically' % [ layers.size() ])

func mirror_horizontally(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()
		img.flip_y()
		layer.layer_texture.set_image(img)

	History.create_snapshot('Mirrored %s Layer(s) horizontally' % [ layers.size() ])

func rotate_left_90(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()
		img.rotate_90(COUNTERCLOCKWISE)
		layer.layer_texture.set_image(img)

	History.create_snapshot('Rotate %s Layer(s) left by 90deg' % [ layers.size() ])


func rotate_right_90(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()
		img.rotate_90(CLOCKWISE)
		layer.layer_texture.set_image(img)

	History.create_snapshot('Rotate %s Layer(s) right by 90deg' % [ layers.size() ])


func rotate_180(layers: Array[ImageLayer] = [Layers.get_current_layer_data()]):
	for layer in layers:
		var img = layer.layer_texture.get_image()
		img.rotate_180()
		layer.layer_texture.set_image(img)

	History.create_snapshot('Rotate %s Layer(s) by 180deg' % [ layers.size() ])
