'use strict';

var TodoList = function($container) {

	var todos = [];
	var uniqID = 0;
	loadData();

	// Add a task and set the status
	function addTodo(todoItem, done) {
		var object = {uid: ++uniqID, label: todoItem, done: done}; 
		todos.push(object);

		return todos;
	}
	

	function findTask(uid) {
		var findTask = [];
			findTask = todos.filter(function (todo) {
				return todo.uid === uid;
			});

		return findTask[0];
	}


	//This changes the state of the chosen task
	function markDone(uid, state) {
		var todo = findTask(uid);
		todo.done = state;

		return todo;
	}

	function removeTodo(uid) {

		var todelete = [];

		todelete = todos.filter(function (todel) {
			return todel.uid !== uid;
		});

		// return todelete;
		return todelete;

	}


	// Mark all tasks as DONE
	function markAllDone (){
		for (var i=1; i < todos.length+1; i++) {
			markDone(i, true);
		}		

		// var doneTodos = [];

		// todos = todos.map(function(todo) {
		// 	todo.done = true;
		// 	return todo;
		// });

		return todos;
	}

	// Mark all task as pending to do
	function markAllTodo (){
		for (var i=1; i < todos.length+1; i++) {
			markDone(i, false);
		}
		return todos;
	}

	// Filter the task and only show task that needs to be done 
	function filterTodos() {
		var filteredList = [];
		
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
		markDone: markDone,
		removeTodo: removeTodo,
		saveData: saveData,
		todolist: todos,
		render: render,
		filterTodos: filterTodos,
		markAllDone: markAllDone,
		markAllTodo: markAllTodo,
		findTask: findTask
	}

};

var todos = new TodoList();


/* Resources*//*

http://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
http://www.w3schools.com/html/html5_webstorage.asp

*/

/* 

// How many tasks are marked as done - SHORTHAND.
todos.todolist
	.map(function(todo) { return todo.done ? 1 : 0 })
	.forEach(function(todo) { sum += todo });

// How many tasks are marked as done. - EASY READ
todos.todolist.filter(function(todo) { return todo.done });
todos.todolist.filter(function(todo) { return todo.done }).length;



*/