extends Node

var history = []

var bound_infos = []

var offset = 0

func _init():
	clear_history()

func clear_history():
	history = [
		{ 'text': 'Initial state', 'infos': {} }
	]

func create_snapshot(text):
	print('----------------------')
	print('Pushing history state: ', text)

	offset = 0

	var new_snapshot = {
		'text': text,
		'infos': {}
	}

	for i in bound_infos:
		var value = i.create_callback.call()
		print('Value ', value, i.name)
		new_snapshot['infos'][i.name] = value

	if history[0] == new_snapshot:
		print('Nothing new ...')
	else:
		print('Adding new snapshot ... ', new_snapshot)
		history.push_front(new_snapshot)

func go_back():
	print('Go to state ', offset)

	offset = min(offset + 1, history.size() - 1)
	var targeted_snapshot = history[(-1 - offset)]

	#for i in bound_infos:
		#if i.name in targeted_snapshot['infos']:
			#i.revert_callback.call(targeted_snapshot['infos'][i.name])

func bind_info(name: String, create_callback: Callable, revert_callback: Callable):
	bound_infos.append({
		'name': name,
		'create_callback': create_callback,
		'revert_callback': revert_callback,
	})
