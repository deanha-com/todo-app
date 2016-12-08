'use strict';

var Todo = function(uid, label, done, template) {
	var label = label;
	var uid = uid;
	var done = done;
	var template = template;

	var $element;
	var $label;
	var $deleteButton;

	create();

	function create() {
		$element = document.createElement('li');
	}

	function render() {
		var $templateElement = document.createElement('template');

		$templateElement.innerHTML = template
			.trim()
			.replace('{{label}}', label)
			.replace('{{uid}}', uid)
			.replace('{{done}}', done ? 'checked' : '');

		$element = $templateElement.content.firstChild;
		$deleteButton = $element.getElementsByClassName('todo_item-delete')[0];
		$label = $element.getElementsByTagName('label')[0];

		addListeners();

		return $element;
	}

	function addListeners() {
		$label.addEventListener('click', onLabelClicked);
		$deleteButton.addEventListener('click', onDeleteClicked);
	}

	function onLabelClicked(evt) {

	}

	function onDeleteClicked(evt) {

	}

	return {
		label: label,
		uid: uid,
		done: done,
		render: render
	}
}


/* ------------------------------------------------------------------------------------ */



var TodoList = function($container) {

	var todos = [];
	var myTask = todos.todolist;
	// loadData();
	var uniqID = todos.length; // Set unique task ID counter to existing todo length.

	var todoTemplate = document.getElementById('todo-item-template').innerHTML;

	// Add a task and set the status
	function addTask(todoItem, done) {
		// Add task and make it false as default if 2nd param not used.
		done = (typeof done !== 'undefined') ?  done : false; 

		var object = new Todo(++uniqID, todoItem, done, todoTemplate);

		//var object = {uid: ++uniqID, label: todoItem, done: done}; // Create a new opject and format it.
		todos.push(object); //push it into the original array of todolist.
		// adding();
		saveData();

		// loadData();
		// renderTask();

		return todos;
	}
	

	//Find a task by its Unique ID and not the array index ID.
	function findTask(uid) {
		var findTask = [];
		console.log(todos);
		findTask = todos.filter(function (todo) { // Go through the array
			return todo.uid === uid;								// and filter it to match uid params
		});

		return findTask[0];												//return the object and select it, we will need to use this later.
	}


	//This changes the state of the chosen task
	function markDone(uid, state) {
		state = (typeof state !== 'undefined') ?  state : true; // default state is TRUE, if 2nd params used then you can set FALSE.
		var todo = findTask(uid); // go and find out specific task using the uid.
		todo.done = state;				// now that we have it selected in out findTask() we can now access the 'done' key and set the state. Default is TRUE.

		return todo;
	}


	function removeTask(uid) {
		var todelete = [];
		todelete = todos.filter(function (todel) {
			return todel.uid !== uid;
		});

		return todos = todelete;
	}


	// Mark all tasks as DONE
	function markAllDone (){
		for (var i=1; i < todos.length+1; i++) {
			markDone(i, true);
		}		
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
	function filterTask() {
		var filteredList = [];
		filteredList = todos.filter(function (todo) {
			return todo.done === false;
		});
		console.log(filteredList);
	}


	// Load data from local storage
	function loadData() {
		
		var jjson = localStorage.getItem("myTodo");

		if (jjson === undefined || jjson === null || jjson.length === 0) {
     todos = [];
     console.log('The array of task is empty');
		}
		else {
			todos = JSON.parse(jjson);
			console.log('Loading from localStorage: ' + todos.length + ' task left to do!');
		}

		// return todos;
	}


	// save current todo list to local storage
	function saveData() {
		var todoJson = JSON.stringify(todos);
		localStorage.setItem("myTodo", todoJson);
		return todoJson;
	}


	// HTML functions
	// 1. Grab all the elements
	// 2. Render function

	function render() {
			
		/*DEAN CURRENT*/
		// var template = template;
		// var $templateElement = document.createElement('template');

		// $templateElement.innerHTML = template
		// 	.trim()
		// 	.replace('{{label}}', label)
		// 	.replace('{{uid}}', uid)
		// 	.replace('{{done}}', done ? 'checked' : '');

		// $element = $templateElement.content.firstChild;
		// $deleteButton = $element.getElementsByClassName('todo_item-delete')[0];
		// $label = $element.getElementsByTagName('label')[0];

		// addListeners();

		// return $element;


		/*DEAN OLD*/
		// var itm = document.querySelector(".todo_list_boiler li");
		// var cln = itm.cloneNode(true);
		// document.querySelector('.todo_list').appendChild(cln);
		// document.querySelector('.todo_task').innerHTML = tt[i].label;
		// console.log(cln);


		/*TOMMER*/
		var $todoElements = [];

		todos.forEach(function(todo) {
			var $todoElements = todo.render();
			$container.appendChild($todoElements);
		});

		console.log($container);

		$container.innerHTML = html;
	}

	// 3. Listen for changes
	// 3a. On every change:
	//    * First update the model (todos array)
	//    * Then render

	return {
		addTask: addTask,
		markDone: markDone,
		removeTask: removeTask,
		saveData: saveData,
		todolist: todos,
		render: render,
		filterTask: filterTask,
		markAllDone: markAllDone,
		markAllTodo: markAllTodo,
		findTask: findTask,
		loadData: loadData
	}

};


/* Resources *//*

// Links
http://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
http://www.w3schools.com/html/html5_webstorage.asp

// How many tasks are marked as done - SHORTHAND.
todos.todolist
	.map(function(todo) { return todo.done ? 1 : 0 })
	.forEach(function(todo) { sum += todo });

// How many tasks are marked as done. - EASY READ
todos.todolist.filter(function(todo) { return todo.done });
todos.todolist.filter(function(todo) { return todo.done }).length;

// localStorage.lastname = "Smith";
//localStorage.getItem("mtTodo");  // localStorage.lastname;
//localStorage.removeItem("lastname");


*/