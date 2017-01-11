
/**
* Script for the Time Recording and LocalStorage Functions
*/


//Listen to when a button is clicked. If its clicked run the getTime() on that particular butto)
//
var btns = document.querySelectorAll('.btn');
var localStorageKeys = ['start','onlunch','hadlunch','finish'];

Array.prototype.forEach.call(btns, function addClickListener(btn) {
  btn.addEventListener('click', getTime);
});


// load the localStorage data and parse it into the button text.
//
function loadLocalS() {
    localStorageKeys.forEach(function(e){
        if (localStorage.getItem(e) && localStorage.getItem(e).length > 1) {
            console.log(localStorage.getItem(e));
            document.querySelector('.'+e).innerHTML = localStorage.getItem(e);
            document.querySelector('.'+e).style.pointerEvents = "none";
        }
        else {
            console.log('nothing here');
        }
    });
}

// button to clear the time record.
//
function clearTime() {
    localStorageKeys.forEach(function(e){
        localStorage.removeItem(e);
        console.log ('removed.. '+e);
    });
}

// Assign clearTime to the 'X' button.
//
document.querySelector('.clearTime').addEventListener("click", clearTime);

// check when reloading the page, are we still in the same day.. if so get the localStorage data.
//
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
//
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
}

// Convert time to AM or PM
//
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
//
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
};