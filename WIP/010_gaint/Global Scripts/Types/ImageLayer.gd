extends Node

class_name ImageLayer

var layer_name = 'Layer'

# The Image will be added by the Layers Singleton
var layer_texture: ImageTexture = ImageTexture.new()

var visible = true

func copy():
	var copy_layer = ImageLayer.new()

	copy_layer.layer_name = layer_name
	copy_layer.layer_texture.set_image(layer_texture.get_image())
	copy_layer.visible = visible

	return copy_layer
