'use strict';


var TodoList = function($container) {

	var todos = [];

	// TODO functions

	function addTodo(todoItem) {
		todos.push(todoItem);

		return todos;
	}

	function todoDone(id, state) {
		todos[id].done = state;
		return todos;
	}

	function removeTodo(id) {
		var cool = todos.indexOf(id);
		todos.splice(id, 1);

		return todos;
	}

	function saveData() {
		// save cookie with data
		var todoJson = JSON.stringify(todos);
	}

	// HTML functions
	// 1. Grab all the elements
	// 2. Render function

	function render() {

	}

	// 3. Listen for changes
	// 3a. On every change:
	//    * First update the model (todos array)
	//    * Then render


	return {
		addTodo: addTodo,
		todoDone: todoDone,
		removeTodo: removeTodo,
		list: todos
	}

};

var todos = new TodoList();



/* Resources*//*

http://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property

*/