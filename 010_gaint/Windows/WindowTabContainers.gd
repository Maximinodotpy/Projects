extends TabContainer
class_name window_tab_container

# Called when the node enters the scene tree for the first time.
func _ready():
	tabs_rearrange_group = 1
	drag_to_rearrange_enabled = true

	print('Creating window tab container ... bombo')

	var popup: PopupMenu = Helpers.createSubmenu('Pablo', {
		'Close window': {
			'callback': func(_args = {}):
				get_current_tab_control().queue_free(),
		},
		'Close tab group': {
			'callback': func(_args = {}): queue_free()
		},
		'Move window up': {
			'callback': move_window_up,
		},
		'Move window down': {
			'callback': move_window_down,
		},
	})

	add_child(popup)

	set_popup(popup)

func find_parent_index():
	return get_parent().get_index()

func get_grand_parent():
	return get_parent().get_parent()

func _process(delta):
	if get_children().size() == 1:
		queue_free()

func move_window_up(_args = {}):
	var top_tab

	if get_index() == 0:
		top_tab = window_tab_container.new()
		top_tab.size_flags_vertical = Control.SIZE_EXPAND_FILL
		get_parent().add_child(top_tab)
		get_parent().move_child(top_tab, 0)
	else:
		print('there is a tab above')
		top_tab = get_parent().get_children()[get_index() - 1]

	get_current_tab_control().reparent(top_tab)

func move_window_down(_args = {}):
	var bottom_tab

	if get_index() == get_parent().get_child_count() - 1:
		bottom_tab = window_tab_container.new()
		bottom_tab.size_flags_vertical = Control.SIZE_EXPAND_FILL
		get_parent().add_child(bottom_tab)
		get_parent().move_child(bottom_tab, get_parent().get_child_count() - 1)
	else:
		print('there is a tab below')
		bottom_tab = get_parent().get_children()[get_index() + 1]

	get_current_tab_control().reparent(bottom_tab)
