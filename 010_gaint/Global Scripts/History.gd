extends Node

signal history_changed

var history = []
var bound_infos = []
var offset = 0
var is_reinserting_state = false
const MAX_HISTORY_LENGTH = 50

func _init():
	clear_history()

func stop_tracking():
	is_reinserting_state = true

func continue_tracking():
	is_reinserting_state = false

func clear_history():
	history = []
	create_snapshot('Init', true)

func create_snapshot(text, force: bool = false):
	if is_reinserting_state:
		#print('Not saving state because inserting is ongoing')
		return

	#print('----------------------')
	#print('Pushing history state: ', text)

	# Reset array so states that come after this one are deleted
	history = history.slice(offset)

	offset = 0

	var new_snapshot = {
		'text': text,
		'infos': {}
	}

	for i in bound_infos:
		var value = i.create_callback.call()
		new_snapshot['infos'][i.name] = value

	if not force:
		if history.size() != 0:
			if history[0] == new_snapshot:
				print('Nothing new ...')
				return

	#print('Adding new snapshot ... ')
	#print(JSON.stringify(new_snapshot, '    '))

	history.push_front(new_snapshot)
	history_changed.emit()

	history = history.slice(0, MAX_HISTORY_LENGTH)

func go_back():
	offset = min(offset + 1, history.size() - 1)
	var targeted_snapshot = history[offset]
	insert_snapshot(targeted_snapshot)

func go_forward():
	offset = max(offset - 1, 0)
	var targeted_snapshot = history[offset]
	insert_snapshot(targeted_snapshot)

func go_to_snapshot(new_offset):
	offset = new_offset
	var targeted_snapshot = history[offset]
	insert_snapshot(targeted_snapshot)

func insert_snapshot(targeted_snapshot):
	#print('-------------------------')
	#print('Inserting history state')
	#print(JSON.stringify(targeted_snapshot))
	#print('-------------------------')

	History.stop_tracking()
	for i in bound_infos:
		if i.name in targeted_snapshot['infos']:
			i.revert_callback.call(targeted_snapshot['infos'][i.name])

	history_changed.emit()
	History.continue_tracking()

func bind_info(name: String, create_callback: Callable, revert_callback: Callable):
	bound_infos.append({
		'name': name,
		'create_callback': create_callback,
		'revert_callback': revert_callback,
	})
