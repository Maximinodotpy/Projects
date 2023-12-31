extends Node
class_name ToolScript

var tool_name = ''
var tool_shortcut
var icon

var root_node: VBoxContainer

func tool_selected():pass
func tool_deselected(): pass

func canvas_clicked(where: Vector2): pass
func canvas_mouse_move(where: Vector2): pass

func drag_start(position: Vector2): pass
func dragging(start_position: Vector2, current_position: Vector2, relative: Vector2): pass
func drag_end(start_position: Vector2, end_position: Vector2): pass

func drag_start_left(position: Vector2): pass
func dragging_left(start_position: Vector2, current_position: Vector2, relative: Vector2): pass
func drag_end_left(start_position: Vector2, end_position: Vector2): pass

func drag_start_right(position: Vector2): pass
func dragging_right(start_position: Vector2, current_position: Vector2, relative: Vector2): pass
func drag_end_right(start_position: Vector2, end_position: Vector2): pass

func dragging_container(relative: Vector2): pass
