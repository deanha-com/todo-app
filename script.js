
// Listen to when a button is clicked. If its clicked run the getTime() on that particular butto)
var btns = document.querySelectorAll('.btn');

Array.prototype.forEach.call(btns, function addClickListener(btn) {
  btn.addEventListener('click', getTime);
});

    

// load the localStorage data and parse it into the button text.
function loadLocalS() {
    if (localStorage.length > 1){
        document.querySelector('.start').innerHTML = localStorage.getItem('start');
        document.querySelector('.start').style.pointerEvents = "none";
        document.querySelector('.onlunch').innerHTML = localStorage.getItem('onlunch');
        document.querySelector('.onlunch').style.pointerEvents = "none";
        document.querySelector('.hadlunch').innerHTML = localStorage.getItem('hadlunch');
        document.querySelector('.hadlunch').style.pointerEvents = "none";
        document.querySelector('.finish').innerHTML = localStorage.getItem('finish');
        document.querySelector('.finish').style.pointerEvents = "none";
    }

    else {
        console.log('nothing here');
    }
}

// check when reloading the page, are we still in the same day.. if so get the localStorage data.
function sameDay() {
    var today = new Date();
    var dd = today.getDate();

    localStorage.setItem('currentdate', dd);
    var currentdate = localStorage.getItem('currentdate');

    if (currentdate == dd) {
        loadLocalS();
        console.log('You reloaded this page within the same day so we are going to load LocalStorage...');

    } else {

        localStorage.clear();
    }
}


// Each time the button is clicked, the the current time, save it and parse it into the button text.
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

};

// Convert time to AM or PM
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

// When once the page is fully loaded.
window.onload = function() {

    console.log('Started on: ' + localStorage.getItem('start'));

    var todos = new TodoList(document.getElementById('todo'));

    sameDay();
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