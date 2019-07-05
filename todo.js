'use strict';
/**
 * The main function that handles each task - Create, Read, Update, And Delete (CRUD)
 * 
 */

var Todo = function(uid, label, done, template, onDelete) {
    var label = label;
    var uid = uid;
    var done = done;
    var template = template;
    var onDelete = onDelete;
    var $element;
    var $label;
    var $deleteButton;
    var $addBtn = document.getElementsByClassName('todo_add-item')[0];

    var self = this;

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
        $addBtn.addEventListener('click', onSubmit);
    }


    function onLabelClicked(evt) {
        // console.log('Ive been clicked - LABEL')
        // todos.markDone(this);
        var $checkbox = $element.getElementsByTagName('input')[0];

        done = $checkbox.checked;
        console.log('uid: '+uid,', done?: ' + done);
        todos.saveData();
        todos.leftTodo();
    }


    function onSubmit(evt) {
        var taskValue = document.getElementById("todoInput").value;
        // todos.addTask(taskValue);
        console.log('submited new task')
            // console.log(this);
            // render();
    }


    function onDeleteClicked(evt) {
        console.log('Delete icon clicked, task item removed');
        onDelete(uid);
    }


    return {
        label: label,
        uid: uid,
        done: done,
        render: render,
        onDelete: onDelete,
        getData: function() {
            return {
                done: done,
                uid: uid,
                label: label
            }
        }
    }
}


/**
 * Be as basic and dump as possible + does not care about state changes
 * Handles the whole list.
 */

var TodoList = function($container) {

    var todos = [];
    var myTask = todos.todolist;
    // loadData();
    var uniqID = 0; // Set unique task ID counter to existing todo length.

    // todos.forEach(function(todo) {
    // 	if(todo.uid > uniqID)
    // 		uniqID = todo.uid + 1;
    // });

    var todoTemplate = document.getElementById('todo-item-template').innerHTML;
    var self = this;

    // Add a task and set the status
    function addTask(todoItem, done) {

        todos.forEach(function(todo) {
            if (todo.uid > uniqID)
                uniqID = todo.uid;
        });

        console.log(uniqID);
        // Add task and make it false as default if 2nd param not used.
        done = (typeof done !== 'undefined') ? done : false;

        // Create a new object and format using template.
        var object = new Todo(++uniqID, todoItem, done, todoTemplate, removeTask);

        todos.push(object); //push it into the original array of todolist.
        // adding();
        saveData();


        // renderTask();

        render();

        return todos;
    }


    //Find a task by its Unique ID and not the array index ID.
    function findTask(uid) {
        var findTask = [];
        console.log(todos);
        // Go through the array
        findTask = todos.filter(function(todo) {
            // and filter it to match uid params
            return todo.uid === uid;
        });

        //return the object and select it, we will need to use this later.
        return findTask[0];
    }


    //This changes the state of the chosen task
    function markDone(uid, state) {
        // default state is TRUE, if 2nd params used then you can set FALSE.
        state = (typeof state !== 'undefined') ? state : true;
        // go and find out specific task using the uid.
        var todo = findTask(uid);
        // now that we have it selected in out findTask() we can now access
        // the 'done' key and set the state. Default is TRUE.
        todo.done = state;

        return todo;
    }


    function removeTask(uid) {
        var todelete = [];
        todelete = todos.filter(function(todel) {
            return todel.uid !== uid;
        });

        todos = todelete;
        leftTodo();
        saveData();
        render();

        return todos;
    }



    // Mark all tasks as DONE
    function markAllDone() {
        for (var i = 1; i < todos.length + 1; i++) {
            markDone(i, true);
        }
        return todos;
    }


    // Mark all task as pending to do
    function markAllTodo() {
        for (var i = 1; i < todos.length + 1; i++) {
            markDone(i, false);
        }
        return todos;
    }


    // Filter the task and only show task that needs to be done 
    function filterTask() {
        var filteredList = [];
        filteredList = todos.filter(function(todo) {
            return todo.done === false;
        });

        return filteredList;
    }


    function leftTodo() {
        var leftTodo = filterTask().length;
        document.getElementsByClassName("todo_count")[0].innerHTML = leftTodo + ' task left to do';
        return leftTodo;
    }


    // Load data from local storage
    function loadData() {

        var jjson = localStorage.getItem("myTodo");

        if (jjson === undefined || jjson === null || jjson.length === 0) {
            todos = [];
            console.log('The array of task is empty');
        } else {
            var todosData = JSON.parse(jjson);

            for (var i = 0; i < todosData.length; i++) {
                var todo = todosData[i];

                todos.push(new Todo(todo.uid, todo.label, todo.done, todoTemplate, removeTask));
            }
        }
        render();
        // return todos;
    }


    // Save current todo list to local storage
    function saveData() {
        // console.log(todos);
        var todosData = todos.map(function(todo) {
            return todo.getData();
        });
        var todoJson = JSON.stringify(todosData);
        localStorage.setItem("myTodo", todoJson);
        // console.log(todoJson);
        return todoJson;
    }


    function resetInput() {
        document.getElementById("todoInput").value = "";
        console.log('resetting..');
        leftTodo();
        
    }


    function checkInput(thisEvent) {
        if (thisEvent.keyCode == 13) { // enter key
            console.log('you pressed ENTER');

            var taskValue = document.getElementById("todoInput").value;
            if (taskValue.length < 1) {
                console.log('nothing task to add...');
            }
            else {
                addTask(taskValue);
                resetInput();
            }
        }
    }

    // HTML functions
    // 1. Grab all the elements
    // 2. Render function

    function render() {
        $container.innerHTML = '';
        var $todoElements = [];

        todos.forEach(function(todo) {
            var $todoElement = todo.render();
            $container.appendChild($todoElement);
        });

        console.log('Loading from localStorage: ' + leftTodo() + ' task left to do!');

        // console.log($container);
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
        loadData: loadData,
        resetInput: resetInput,
        checkInput: checkInput,
        leftTodo: leftTodo
    }

};

var TodoContainer = function($container) {}
