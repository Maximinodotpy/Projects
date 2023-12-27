extends Node

# Signals
signal zoomed

signal primary_color_changed(to: Color)
signal secondary_color_changed(to: Color)

var primary_color = Color.WHITE
var secondary_color = Color.BLACK

var transparent_bg = false

# Nodes
@onready var bottom_h_box: HBoxContainer = get_tree().root.get_children()[-1].find_child('Bottom HBox')
@onready var canvas_container: Control = get_tree().root.get_children()[-1].find_child('Canvas Container')
@onready var canvas_texture: TextureRect = get_tree().root.get_children()[-1].find_child('Canvas Texture')
@onready var preview_container: TextureRect = get_tree().root.get_children()[-1].find_child('Preview Texture')
@onready var selection_container: TextureRect = get_tree().root.get_children()[-1].find_child('Selection Texture')
@onready var current_file_label: Label = get_tree().root.get_children()[-1].find_child('Current File Label')

func _ready():
	History.bind_info(
		'primary_color',
		func(): return get_primary_color(),
		func(color): set_primary_color(color)
	)

	reset_colors()

	var t = create_tween()
	t.tween_callback(fit_view).set_delay(0.01)

	var canvas_container_input_cb = func(event):
		if event is InputEventMouse:
			if event.is_pressed():
				var scroll = int(event.button_index == MOUSE_BUTTON_WHEEL_UP) - int(event.button_index == MOUSE_BUTTON_WHEEL_DOWN)
				if scroll != 0:
					UserInterface.zoom(scroll)

	canvas_container.gui_input.connect(canvas_container_input_cb)


func reset_colors():
	set_primary_color(Color.BLACK)
	set_secondary_color(Color.WHITE)

func get_primary_color() -> Color:
	return primary_color

func set_primary_color(color: Color):
	primary_color = color
	primary_color_changed.emit(color)

	History.create_snapshot('Set primary color')

func get_secondary_color() -> Color:
	return secondary_color

func set_secondary_color(color: Color):
	secondary_color = color
	secondary_color_changed.emit(color)

func swap_colors():
	print('Swapping Colors ...')

	var temp_secondary = secondary_color

	secondary_color = primary_color
	primary_color = temp_secondary

	primary_color_changed.emit(primary_color)
	secondary_color_changed.emit(secondary_color)

func reset_view():
	canvas_texture.scale = Vector2.ONE
	center_view()

	zoomed.emit()

func center_view():
	var x = (canvas_container.size.x / 2) - ((canvas_texture.size.x * canvas_texture.scale.x) / 2)
	var y = (canvas_container.size.y / 2) - ((canvas_texture.size.y * canvas_texture.scale.y) / 2)

	canvas_texture.position.x = x
	canvas_texture.position.y = y

	zoomed.emit()

func cover_view():
	print('Cover View ...')

	reset_view()

	var ratio := 0.0;

	if canvas_container.size.y > canvas_container.size.x:
		# Find Ratio between canvas height and container height
		ratio = canvas_container.size.y / (canvas_texture.size.y * canvas_texture.scale.y)
	else:
		ratio = canvas_container.size.x / (canvas_texture.size.x * canvas_texture.scale.x)

	canvas_texture.scale = Vector2(ratio, ratio)
	center_view()
	zoomed.emit()

func fit_view():
	print('Fit View ...')

	reset_view()

	var ratio := 0.0;

	if canvas_container.size.y < canvas_container.size.x:
		# Find Ratio between canvas height and container height
		ratio = canvas_container.size.y / (canvas_texture.size.y * canvas_texture.scale.y)
	else:
		ratio = canvas_container.size.x / (canvas_texture.size.x * canvas_texture.scale.x)

	canvas_texture.scale = Vector2(ratio, ratio)
	center_view()
	zoomed.emit()

func toggle_transparent_bg():
	transparent_bg = not transparent_bg

func zoom(scroll, global_mouse: Vector2 = canvas_texture.get_global_mouse_position()):
	var loc_mouse: Vector2 = global_mouse - canvas_texture.global_position
	var pixel: Vector2 = loc_mouse / canvas_texture.scale.x

	canvas_texture.scale += scroll * Vector2.ONE * .1 * canvas_texture.scale.x
	canvas_texture.global_position = -(pixel*canvas_texture.scale.x - global_mouse)

	zoomed.emit()
