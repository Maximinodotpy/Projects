extends MenuBar

func createShortcut(letter: Key, ctrl: bool = false, shift: bool = false, alt: bool = false)-> Shortcut:
	var shortcut = Shortcut.new()

	var input_event = InputEventKey.new()

	input_event.keycode = letter
	input_event.ctrl_pressed = ctrl
	input_event.shift_pressed = shift
	input_event.alt_pressed = alt

	shortcut.events = [ input_event ]

	return shortcut

var menuItems = {
	'File': {
		'Open': {
			'callback': func(_args = {}):
				FileManager.request_open_file(),
			'shortcut': createShortcut(KEY_O, true)
		},
		'New File': {
			'callback': func(_args = {}):
				pass,
			'shortcut': createShortcut(KEY_N, true)
		},
		'Save': {
			'callback': func(_args = {}):
				FileManager.request_save_file(),
			'shortcut': createShortcut(KEY_S, true)
		},
		'Save As': {
			'callback': func(_args = {}):
				FileManager.request_save_file_as(),
			'shortcut': createShortcut(KEY_S, true, true)
		},
	},
	'Tools': {
		'Pen': {},
		'Selection Rect': {},
		'Picker': {},
	},
	'Selection': {
		'Select All': {
			'callback': func(_args = {}): Selection.select_all(),
			'shortcut': createShortcut(KEY_A, true)
		},
		'Select None': {
			'callback': func(_args = {}): Selection.unselect_all(),
			'shortcut': createShortcut(KEY_D, true)
		},
		'Inverse Selection': {
			'add_seperator': true,
			'callback': func(_args = {}): Selection.inverse_selection(),
			'shortcut': createShortcut(KEY_I, true, true)
		},
	},
	'Edit': {
		'Undo': {
			'callback': func(_args = {}): History.go_back(),
			'shortcut': createShortcut(KEY_Z, true),
		},
		'Redo': {
			'callback': func(_args = {}): History.go_forward(),
			'shortcut': createShortcut(KEY_Y, true),
		},
		'Delete': {
			'callback': func(_args = {}):
				Layers.remove_selected_pixels_in_current_layer(),
			'shortcut': createShortcut(KEY_DELETE),
		},
		'Copy': {},
		'Insert': {},
		'Insert Image': {},
		'Colors': {
			'children': {
				'Reset Colors': {
					'callback': func(_args = {}): UserInterface.reset_colors(),
					'shortcut': createShortcut(KEY_D)
				},
				'Swap Colors': {
					'callback': func(_args = {}): UserInterface.swap_colors(),
					'shortcut': createShortcut(KEY_X)
				},
			}
		}
	},
	'Layers': {
		'Add Layer': {
			'callback': func(_args = {}):
				Layers.add_canvas_layer(),
		}
	},
	'View': {
		'Fit Canvas to Viewport': {
			'callback': func(_args = {}): UserInterface.fit_view(),
			'shortcut': createShortcut(KEY_0, true),
		},
		'Cover Viewport with Canvas': {
			'callback': func(_args = {}): UserInterface.cover_view(),
			'shortcut': createShortcut(KEY_1, true),
		},
		'Background Transparent': {
			'callback': func(_args = {}): UserInterface.toggle_transparent_bg(),
			'shortcut': createShortcut(KEY_B, true, true),
		},
		'Reset View': {
			'callback': func(_args = {}): UserInterface.reset_view(),
			'shortcut': createShortcut(KEY_2, true),
		},
		'Center Canvas': {
			'callback': func(_args = {}): UserInterface.center_view(),
			'shortcut': createShortcut(KEY_F),
		},
	},
}

func _ready():
	print('Creating Menu')

	for menu in menuItems:
		add_child(createSubmenu(menu, menuItems[menu]))

func createSubmenu(submenu_name: String, data: Dictionary) -> PopupMenu:
	var popup_menu = PopupMenu.new()
	popup_menu.name = submenu_name

	var index = 0
	for menu_item_name in data:
		var menu_item_data = data[menu_item_name]

		popup_menu.add_item(menu_item_name, index)

		if 'shortcut' in menu_item_data: popup_menu.set_item_shortcut(index, menu_item_data['shortcut'])

		if 'tooltip' in menu_item_data: popup_menu.set_item_tooltip(index, menu_item_data['tooltip'])

		if 'icon' in menu_item_data: popup_menu.set_item_icon(index, menu_item_data['icon'])

		if 'icon_max_width' in menu_item_data:
			popup_menu.set_item_icon_max_width(index, menu_item_data['icon_max_width'])
		else:
			popup_menu.set_item_icon_max_width(index, 30)

		if 'check_state' in menu_item_data:
			popup_menu.set_item_as_checkable(index, true)
			popup_menu.set_item_checked(index, menu_item_data['check_state'])

		if 'children' in menu_item_data:
			var submenu = createSubmenu(menu_item_name + '_sub-menu', menu_item_data['children'])
			popup_menu.set_item_submenu(index, submenu.name)
			popup_menu.add_child(submenu)

		var index_pressed_callback = func(pressed_index):
			if pressed_index == index:
				var isChecked = popup_menu.is_item_checked(index)

				if 'callback' in menu_item_data:
					menu_item_data['callback'].call({
						'checked': isChecked,
						'popup_menu': popup_menu,
						'index': index
					})

		popup_menu.index_pressed.connect(index_pressed_callback)

		# Dependant
		var dependant_callback = func():
			var isEnabled = menu_item_data['condition'].call()
			popup_menu.set_item_disabled(index, !isEnabled)

		if 'condition' in menu_item_data:
			dependant_callback.call()

			if 'depends_on' in menu_item_data:
				menu_item_data['depends_on'].call(dependant_callback)

		if 'add_seperator' in menu_item_data:
			if menu_item_data['add_seperator']:
				index += 1
				popup_menu.add_separator('', index)

		index += 1

	return popup_menu
