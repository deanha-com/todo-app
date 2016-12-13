window.onload = function() {
    var x = new Date();

    localStorage.setItem('startTime', x);
    console.log('Started on: ' + localStorage.getItem('startTime'));

    var todos = new TodoList(document.getElementById('todo'));

    todos.loadData();
    todos.leftTodo();


    document.getElementById("todoInput").focus();
    var taskText = document.querySelector('.todo_input').value;
    document.querySelector('.todo_add-item').onclick = function() {

        var taskText = document.querySelector('.todo_input').value;
        if (taskText) {
            todos.addTask(taskText);
            console.log('added');


        } else {
            console.log('nothing to add');
        }
    };
    window.todos = todos;
}