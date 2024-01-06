extends MenuBar



var menuItems = {
	'File': {
		'Open': {
			'callback': func(_args = {}):
				FileManager.request_open_file(),
			'shortcut': Helpers.createShortcut(KEY_O, true)
		},
		'New File': {
			'callback': func(_args = {}): pass,
			'shortcut': Helpers.createShortcut(KEY_N, true)
		},
		'Save': {
			'callback': func(_args = {}):
				FileManager.request_save_file(),
			'shortcut': Helpers.createShortcut(KEY_S, true)
		},
		'Save As': {
			'callback': func(_args = {}):
				FileManager.request_save_file_as(),
			'shortcut': Helpers.createShortcut(KEY_S, true, true)
		},
		'Recent Files': {
			'children': {}
		}
	},
	'Edit': {
		'Undo': {
			'callback': func(_args = {}): History.go_back(),
			'shortcut': Helpers.createShortcut(KEY_Z, true),
		},
		'Redo': {
			'callback': func(_args = {}): History.go_forward(),
			'shortcut': Helpers.createShortcut(KEY_Y, true),
			'add_seperator': true,
		},
		'Tools': {
			'children': {},
			'add_seperator': true,
		},
		'Delete': {
			'callback': func(_args = {}):
				Layers.remove_selected_pixels_in_current_layer(),
			'shortcut': Helpers.createShortcut(KEY_DELETE),
		},
		'Copy': {},
		'Insert': {
			'add_seperator': true,
		},
		'Layers': {
			'children': {
				'Add Layer': {
					'callback': func(_args = {}): Layers.add_canvas_layer(),
				},
				'Duplicate current layer': {
					'callback': func(_args = {}): Layers.duplicate_layer(Layers.get_current_layer_data())
				},
				'Delete current layer': {
					'callback': func(_args = {}): Layers.remove_layer(Layers.get_current_layer_data()),
					'add_seperator': true,
				},
				'Move current layer to top': {},
				'Move current layer up': {},
				'Move current layer down': {},
				'Move current layer to bottom': {
					'add_seperator': true,
				},
				'Mirror layer vertically': {},
				'Mirror layer horizontally': {},
			}
		},
		'Layer corrections': {
			'children': {
				'Invert colors': {
					'callback': func(_args = {}): Layers.invert_colors_in_current_layer(),
					'shortcut': Helpers.createShortcut(KEY_I, false, false, true)
				},
				'Black and white': {
					'callback': func(_args = {}): Layers.black_and_white_current_layer(),
				},
			},
			'add_seperator': true,
		},
		'Colors': {
			'children': {
				'Reset Colors': {
					'callback': func(_args = {}): UserInterface.reset_colors(),
					'shortcut': Helpers.createShortcut(KEY_D)
				},
				'Swap Colors': {
					'callback': func(_args = {}): UserInterface.swap_colors(),
					'shortcut': Helpers.createShortcut(KEY_X)
				},
			}
		}
	},
	'Image': {
		'Mirror vertically': {},
		'Mirror horizontally': {
			'add_seperator': true
		},
		'Resize image': {
			'callback': func(_args = {}): UserInterface.request_image_resize_popup()
		},
		'Resize canvas': {
			'add_seperator': true
		},
	},
	'Selection': {
		'Select All': {
			'callback': func(_args = {}): Selection.select_all(),
			'shortcut': Helpers.createShortcut(KEY_A, true)
		},
		'Select None': {
			'callback': func(_args = {}): Selection.unselect_all(),
			'shortcut': Helpers.createShortcut(KEY_D, true)
		},
		'Inverse Selection': {
			'add_seperator': true,
			'callback': func(_args = {}): Selection.inverse_selection(),
			'shortcut': Helpers.createShortcut(KEY_I, true, true)
		},
	},
	'View': {
		'Fit Canvas to Viewport': {
			'callback': func(_args = {}): UserInterface.fit_view(),
			'shortcut': Helpers.createShortcut(KEY_0, true),
		},
		'Cover Viewport with Canvas': {
			'callback': func(_args = {}): UserInterface.cover_view(),
			'shortcut': Helpers.createShortcut(KEY_1, true),
		},
		'Center Canvas': {
			'callback': func(_args = {}): UserInterface.center_view(),
			'shortcut': Helpers.createShortcut(KEY_F),
			'add_seperator': true,
		},
		'Background Transparent': {
			'callback': func(_args = {}): UserInterface.toggle_transparent_bg(),
			'shortcut': Helpers.createShortcut(KEY_B, true, true),
		},
		'Gridline background': {
			'callback': func(_args = {}): UserInterface.toggle_gridline_bg(),
			'shortcut': Helpers.createShortcut(KEY_G, true),
			'add_seperator': true,
		},
		'Zoom in': {
			'callback': func(_a = {}): UserInterface.zoom_in(),
			'shortcut': Helpers.createShortcut(KEY_1, true, true)
		},
		'Zoom out': {
			'callback': func(_a = {}): UserInterface.zoom_out(),
			'shortcut': Helpers.createShortcut(KEY_2, true, true)
		},
		'Reset View': {
			'callback': func(_a = {}): UserInterface.reset_view(),
			'shortcut': Helpers.createShortcut(KEY_2, true),
		},
	},
}

func _ready():
	print('Creating Menu')

	for file in FileManager.load_recent_files():
		menuItems['File']['Recent Files']['children'][file] = {
			'callback': func(_args = {}):
				print('Opening recent file: ', file)
				FileManager.open_file(file),
		}

	var i = 0
	for tool in ToolManager.tools:
		menuItems['Edit']['Tools']['children'][tool.tool_name] = {
			'callback': func(_args = {}): ToolManager.switch_to_tool(i),
			'shortcut': tool.tool_shortcut
		}
		i += 1
		print()

	for menu in menuItems:
		add_child(Helpers.createSubmenu(menu, menuItems[menu]))


