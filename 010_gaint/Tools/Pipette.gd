extends "res://Tools/ToolTemplate.gd"

var label: Label
var label_settings: LabelSettings = preload("res://Tools/pipette_label_settings.tres")

func _init():
	icon = load("res://Icons/pipette.png")
	tool_name = 'Pipette'
	tool_shortcut = Helpers.createShortcut(KEY_P, true)

func tool_selected():
	label = Label.new()
	label.label_settings = label_settings

	UserInterface.bottom_h_box.add_child(label)

func tool_deselected():
	label.queue_free()

func canvas_clicked(where):
	var color = Layers.get_pixel_color_at(where)
	UserInterface.set_primary_color(color)

func canvas_mouse_move(where):
	var color = Layers.get_pixel_color_at(where)
	label.label_settings.shadow_color = color
	label.text = 'Pipette Color: %s' % color
