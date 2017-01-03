window.onload = function() {
    // var x = new Date();

    // localStorage.setItem('startTime', x);
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

var btns = document.querySelectorAll('.btn');

Array.prototype.forEach.call(btns, function addClickListener(btn) {
  btn.addEventListener('click', getTime);
});

function getTime() {
    var d = formatAMPM(new Date());
    console.log(d);
    this.innerHTML = d;
    this.style.pointerEvents = "none";
    var btnClicked = this.className;
    var state;

    switch (btnClicked) {
        case 'btn start':
            state= "start";
            break;
        case 'btn onlunch':
            state= "onlunch";
            break;
        case 'btn hadlunch':
            state= "hadlunch";
            break;
        case 'btn finish':
            state= "finish";
            break;

    }

    localStorage.setItem(state, d);
    console.log('Started on: ' + localStorage.getItem('start'));

};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}