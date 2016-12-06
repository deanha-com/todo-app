'use strict';

var TodoList = function($container) {

	var todos = [];

	var uniqID = 0;
	loadData();



	// TODO functions

	function addTodo(todoItem, done) {
		var object = {uid: ++uniqID, label: todoItem, done: done}; 
		todos.push(object);

		return todos;
	}

	//This changes the state of the chosen task
	function todoDone(uid, state) {
		todos.uid[uid].done = state;
		// todos.findTask(uid).done = state;
		return todos;
	}


function findTask(uid) {
	var findTask = [];
		findTask = todos.filter(function (todo) {
			return todo.uid === uid;
		});
		console.log(findTask);
}

	function removeTodo(uid) {

		todos.splice(findTask(uid), 1);
		console.log(findTask);

	}

	function filterTodos() {
		var filteredList = [];
		// for (var i = 0; i < todos.length; i++) {

		// 	if(todos[i].done === false) {
		// 		filteredList.push(todos[i]);	
		// 	}
		// }
		
		filteredList = todos.filter(function (todo) {
			return todo.done === false;
		});

		console.log(filteredList);
	}

	function loadData() {
		todos = JSON.parse(localStorage.myTodo);
	}

	function saveData() {
		// save cookie with data
		var todoJson = JSON.stringify(todos);
		console.log(todoJson);

		localStorage.setItem("myTodo", todoJson); // localStorage.lastname = "Smith";
		//localStorage.getItem("mtTodo");  // localStorage.lastname;
		//localStorage.removeItem("lastname");

	}

	// HTML functions
	// 1. Grab all the elements
	// 2. Render function

	function render() {
			// todos = localStorage.myTodo;
	}




	// 3. Listen for changes
	// 3a. On every change:
	//    * First update the model (todos array)
	//    * Then render


	return {
		addTodo: addTodo,
		todoDone: todoDone,
		removeTodo: removeTodo,
		saveData: saveData,
		todolist: todos,
		render: render,
		filterTodos: filterTodos,
		findTask: findTask
	}

};

var todos = new TodoList();



/* Resources*//*

http://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
http://www.w3schools.com/html/html5_webstorage.asp

*/
