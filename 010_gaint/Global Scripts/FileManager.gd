extends Node

signal file_modified

const new_file_name = 'New File'

var current_file = new_file_name
var is_modified = false

var window_min_size = Vector2(700, 500)
var filters = PackedStringArray(["*.png ; PNG Images"])

func _ready():
	update_current_file_label()

	var modifed_cb = func(_args = {}):
		is_modified = true
		update_current_file_label(true)

	file_modified.connect(modifed_cb)
	Layers.pixel_modified.connect(modifed_cb)
	Layers.added_layer.connect(modifed_cb)
	Layers.removed_layer.connect(modifed_cb)

func update_current_file_label(modified = false):
	var nice_name = current_file.split('/')[-1]

	if modified:
		UserInterface.current_file_label.text = '*' + nice_name
	else:
		UserInterface.current_file_label.text = nice_name

func warn_file_unsaved_changes():
	var dialogue = AcceptDialog.new()
	dialogue.show()
	dialogue.initial_position = Window.WINDOW_INITIAL_POSITION_CENTER_MAIN_WINDOW_SCREEN
	get_tree().root.get_children()[-1].add_child(dialogue)

	dialogue.dialog_text = 'There are unsaved changes, you may want to save these first ...'
	dialogue.ok_button_text = 'Discard changes'

	var h = await dialogue.confirmed

	print('POPUP', h)

func warn_file_format():
	pass

func create_window():
	var window = FileDialog.new()
	window.initial_position = Window.WINDOW_INITIAL_POSITION_CENTER_MAIN_WINDOW_SCREEN
	window.size = window_min_size
	window.file_mode = FileDialog.FILE_MODE_OPEN_FILE
	window.access = FileDialog.ACCESS_FILESYSTEM
	window.filters = filters

	get_tree().root.get_children()[-1].add_child(window)

	window.show()

	return window

func request_open_file():
	print(is_modified)
	if is_modified:
		print('Because is Modified ask')
		if await warn_file_unsaved_changes(): return

	var window = create_window()

	var selected_file = await window.file_selected

	var compressed_texture: CompressedTexture2D = load(selected_file)

	if not compressed_texture:
		return

	var image = compressed_texture.get_image()
	var dimensions = compressed_texture.get_size()

	Layers.image_dimensions = dimensions

	for layer in Layers.get_layer_data():
		Layers.remove_layer(layer)

	var default_layer: ImageLayer = Layers.add_canvas_layer()
	default_layer.layer_texture.set_image(image)

	current_file = selected_file
	update_current_file_label()

	var t = create_tween()
	t.tween_callback(UserInterface.fit_view).set_delay(0.01)

func request_save_file_as():
	var window = create_window()
	window.file_mode = FileDialog.FILE_MODE_SAVE_FILE

	current_file = await window.file_selected

	update_current_file_label()
	request_save_file()

func request_save_file():
	if current_file == new_file_name:
		request_save_file_as()
		return
	else:
		var image = Layers.get_merged_image()
		image.save_png(current_file)
		is_modified = false
		update_current_file_label()
