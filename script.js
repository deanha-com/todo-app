/**
* Script for the Time Recording and LocalStorage Functions
*/


//Listen to when a button is clicked. If its clicked run the getTime() on that particular button)
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
            document.getElementById("user").innerHTML = localStorage.getItem('userName');
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

    var currentdate = localStorage.getItem('currentdate');
    localStorage.setItem('currentdate', dd);

    if (currentdate == dd) {
        loadLocalS();
        console.log('You reloaded this page within the same day so we are going to load LocalStorage...');

    } else {
        console.log('new date, time records cleared')
        clearTime();
    }
}


// Each time the button is clicked, the the current time, save it and parse it into the button text.
//
function getTime() {

    var d = formatAMPM(new Date());
    console.log(d);
    this.innerHTML = d;
    // this.style.pointerEvents = "none";
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
    saveDayLog();
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

    saveLoadName();
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


function saveDayLog() {
    localStorage.setItem(formatDate(new Date()),
        '{start : '+localStorage.start+'} ' +
        '{onlunch : ' + localStorage.onlunch+'} ' +
        '{hadlunch : ' +localStorage.hadlunch+'} ' + 
        '{finish :' + localStorage.finish +'} ');
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}


function confirmSave() {
    var resp = confirm('Save today\'s time log?');
    if (resp) {
        saveDayLog();
    // alert('okay lets save');
    } else {
    // alert('dont save;');
    }
}


// window.onbeforeunload = confirmSave();
document.querySelector('.saveLog').onclick = saveDayLog;


document.getElementById("minimize").addEventListener("click", todoToggle);


function todoToggle() {
    var d = document.getElementById("todo_widget");
    if(d.className=="todo") {
        d.className = "todo active";
    } else {
        d.className = "todo";
    }
}

function saveLoadName() {
    var x = document.getElementById("user");
    localStorage.setItem('userName',x.innerHTML);
    console.log('out of userName');
    // x.innerHTML = localStorage.getItem('userName');
}

var startShiftTime = 20;
var finishShiftTime = 19;

function checkTime () {
    if(new Date().getMinutes() > (startShiftTime -1) ) {
        console.log(new Date().getMinutes());
        if (confirm('Hey Dean, are you ready to START?')) {
            // Save it!
            document.getElementById("startBtn").click();
            console.log("true saved");

        } else {
            // Do nothing!
            console.log("false bye");
        }
    } 
}

// document.getElementById("myCheck").click();