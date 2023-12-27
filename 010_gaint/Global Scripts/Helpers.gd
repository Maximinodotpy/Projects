extends Node

func _init():
	print('BOMBOCLAT')
	print(getIntegerVectorLine(Vector2(0, 10), Vector2(30, 30)))

func getIntegerVectorPositions(start_pos: Vector2, end_pos: Vector2) -> Array:
	var positions = []

	for x in range(int(start_pos.x), int(end_pos.x) + 1):
		for y in range(int(start_pos.y), int(end_pos.y) + 1):
			positions.append(Vector2(x, y))

	return positions

func getIntegerVectorLine(start_pos: Vector2, end_pos: Vector2) -> Array:
	var positions = []

	var x = int(start_pos.x)
	var y = int(start_pos.y)
	var end_x = int(end_pos.x)
	var end_y = int(end_pos.y)

	var dx = abs(end_x - x)
	var dy = -abs(end_y - y)

	var sx = 1  if x < end_x else -1
	var sy = 1  if y < end_y else -1

	var err = dx + dy

	while true:
		positions.append(Vector2(x, y))

		if x == end_x && y == end_y:
			break

		var e2 = 2 * err
		if e2 >= dy:
			err += dy
			x += sx
		if e2 <= dx:
			err += dx
			y += sy

	return positions
