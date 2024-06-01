extends Node

# Signals
signal zoomed

signal primary_color_changed(to: Color)
signal secondary_color_changed(to: Color)

var primary_color = Color.WHITE
var secondary_color = Color.BLACK

var transparent_bg = false
var gridline_bg = true

# Used for the pan tool which can be temporarly chosen when holding space
var previous_tool = 0

enum ViewModes {
	ANY,
	RESET,
	FITTED,
	COVERED
}
var current_view_mode: ViewModes = ViewModes.FITTED

# Nodes
@onready var bottom_h_box: HBoxContainer = get_tree().root.get_children()[-1].find_child('Bottom HBox')
@onready var canvas_container: Control = get_tree().root.get_children()[-1].find_child('Canvas Container')
@onready var canvas_texture: TextureRect = get_tree().root.get_children()[-1].find_child('Canvas Texture')
@onready var preview_container: TextureRect = get_tree().root.get_children()[-1].find_child('Preview Texture')
@onready var selection_container: TextureRect = get_tree().root.get_children()[-1].find_child('Selection Texture')
@onready var current_file_label: Label = get_tree().root.get_children()[-1].find_child('Current File Label')
@onready var main_h_split: HSplitContainer = get_tree().root.get_children()[-1].find_child('Main H Split')

func _ready():
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

	get_tree().root.size_changed.connect(preserve_view_mode)
	main_h_split.dragged.connect(preserve_view_mode)


func _process(delta):
	if Input.is_action_just_pressed('space'):
		previous_tool = ToolManager.current_tool
		ToolManager.switch_to_tool(5)
	if Input.is_action_just_released("space"):
		ToolManager.switch_to_tool(previous_tool)

func reset_colors():
	set_primary_color(Color.BLACK)
	set_secondary_color(Color.WHITE)

func get_primary_color() -> Color:
	return primary_color

func set_primary_color(color: Color):
	primary_color = color
	primary_color_changed.emit(color)

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
	current_view_mode = ViewModes.RESET
	zoomed.emit()

func pan_view_by(by: Vector2):
	current_view_mode = ViewModes.ANY

func center_view():
	var x = (canvas_container.size.x / 2) - ((canvas_texture.size.x * canvas_texture.scale.x) / 2)
	var y = (canvas_container.size.y / 2) - ((canvas_texture.size.y * canvas_texture.scale.y) / 2)

	canvas_texture.position.x = x
	canvas_texture.position.y = y

	zoomed.emit()

func cover_view():
	reset_view()
	current_view_mode = ViewModes.COVERED

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
	reset_view()
	current_view_mode = ViewModes.FITTED

	var ratio := 0.0;

	if canvas_container.size.y < canvas_container.size.x and canvas_texture.size.x <= canvas_texture.size.y:
		# Find Ratio between canvas height and container height
		ratio = canvas_container.size.y / (canvas_texture.size.y * canvas_texture.scale.y)
	else:
		ratio = canvas_container.size.x / (canvas_texture.size.x * canvas_texture.scale.x)

	canvas_texture.scale = Vector2(ratio, ratio)
	center_view()
	zoomed.emit()

func toggle_transparent_bg():
	transparent_bg = not transparent_bg

func toggle_gridline_bg():
	gridline_bg = not gridline_bg

func preserve_view_mode(_a = null):
	var window_size = get_tree().root.size

	await get_tree().create_timer(.01).timeout

	match current_view_mode:
		ViewModes.RESET:
			reset_view()
		ViewModes.FITTED:
			fit_view()
		ViewModes.COVERED:
			cover_view()

func request_image_resize_popup():
	var popup = load("res://UI Elements/Resize Image Dialogue.tscn").instantiate()
	get_tree().root.get_children()[-1].add_child(popup)

func zoom(scroll, global_mouse: Vector2 = canvas_texture.get_global_mouse_position()):
	current_view_mode = ViewModes.ANY

	var loc_mouse: Vector2 = global_mouse - canvas_texture.global_position
	var pixel: Vector2 = loc_mouse / canvas_texture.scale.x

	canvas_texture.scale += scroll * Vector2.ONE * .1 * canvas_texture.scale.x
	canvas_texture.global_position = -(pixel*canvas_texture.scale.x - global_mouse)

	zoomed.emit()

func zoom_in():
	zoom(1, canvas_container.size / 2)

func zoom_out():
	zoom(-1, canvas_container.size / 2)
