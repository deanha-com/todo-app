'use strict';

var todosList = [
	{
		done: false,
		task: 'Do the washing'
	},
	{
		done: true,
		task: 'Do the ironing'
	},
	{
		done: false,
		task: 'eat'
	}
];

function addTodo(todos, todoItem) {
	todos.push(todoItem);

	return todos;
}

function todoDone(todos, todoItem, state) {
	todos.push(todoItem);
	return todos;
}

// function removeTodo(todos, attr, value) {
// 	var i = todos.length;
// 	while(i--){
// 		if( todos[i] 
// 			&& todos[i].hasOwnProperty(attr) 
// 			&& (arguments.length > 2 && todos[i][attr] === value ) ){ 

// 			todos.splice(i,1);

// 			}
// 	}
// 	return todos;
// }



function removeTodo(todos, id) {

	var cool = todos.indexOf(id);
	var i = todos.length;
	console.log(i);
	todos.splice(id);

	return todos;
}