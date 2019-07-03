/**
 * Script for the Time Recording and LocalStorage Functions
 */


//Listen to when a button is clicked. If its clicked run the getTime() on that particular button)
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
            if (localStorage.getItem('userName') !== '') {

                document.getElementById("user").innerHTML = localStorage.getItem('userName');
            }
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
    letsBegin();

    window.todos = todos;
};


function saveDayLog() {
    localStorage.setItem(formatDate(new Date()),
        '{start : '+localStorage.start+'} ' +
        '{onlunch : ' + localStorage.onlunch+'} ' +
        '{hadlunch : ' +localStorage.hadlunch+'} ' + 
        '{finish :' + localStorage.finish +'} ');
}

// structure the json
var structuredJSON = {
  "profile": {
    "name": "Dean H",
    "email": "example@home.com",
    "avatar": "https://deanha.com/wp-content/uploads/2017/01/deanha_logo.png"
  },
  "settings": {
    "theme": "light",
    "todo_minimised": false,
    "bacgroundWallpaper": "https://www.toptal.com/designers/subtlepatterns/patterns/papyrus.png",
    "proUser": false,
    "extensions": [
      "todo",
      "weather",
      "temperature"
    ]
  },
  "history": [
    {
      "28/06/29": {
        "startOfDay": "08:00am",
        "lunchStart": "12:00pm",
        "lunchEnd": "01:00pm",
        "endOfDay": "05:00pm",
        "lunchDuration": 58,
        "dayDuration": 8
      },
      "27/06/29": {
        "startOfDay": "08:00am",
        "lunchStart": "12:00pm",
        "lunchEnd": "01:00pm",
        "endOfDay": "05:00pm",
        "lunchDuration": 58,
        "dayDuration": 8
      }
    }
  ],
  "todos": []
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

    return year + "/" + monthIndex + "/" + day ;
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
// document.getElementById("todo_widget").addEventListener("click", todoToggle);

function maximise() {
    var element = document.getElementById("todo_widget");
    element.classList.toggle("expand");
}

function todoToggle() {
    var minimizeBtn = document.getElementById("minimize");
    var expand = document.querySelector(".maximise");
    var widget = document.getElementById("todo_widget");
    if(widget.className=="todo") {
        widget.classList.toggle("active");
    } else {
        widget.classList.toggle("active");
    }

    if(minimizeBtn.className=="") {
        minimizeBtn.className = "pinned";
    } else {
        minimizeBtn.className = "";
    }

    if(minimizeBtn.innerHTML =="📌") {
        minimizeBtn.innerHTML = "📌";
    } else {
        minimizeBtn.innerHTML ="📌";
    }
}

function saveLoadName() {
    var x = document.getElementById("user");
    console.log('loaded from userName from localStorage');
 
    x.addEventListener("input", function() {
        var userText = document.getElementById("user").innerHTML;
        localStorage.setItem('userName',userText);
        console.log("input event fired");
    }, false);

    document.getElementById('user').addEventListener('keypress', function(evt) {
        if (evt.which === 13) {
            evt.preventDefault();
        }
    });
}

var startShiftTime = 8;
var finishShiftTime = 17;

function letsBegin() {
    if(new Date().getHours() > (startShiftTime -1) ) {
        console.log(new Date().getHours());
        if (localStorage.start) {
            console.log('we\'ve already started');
        } else {

            if (localStorage.userName !== undefined) {
                var user = localStorage.userName;
                document.getElementById("user").innerHTML = user;
            }

            if (confirm('Hey '+ user +', \nare you ready to START?')) {
                // Save it!
                document.getElementById("startBtn").click();
                console.log("true saved");
                var started = true;

            } else {
                // Do nothing!
                console.log("false bye");
                var started = false;
            }
        }
    } 
}


// Load bg if on desktop
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (!window.mobilecheck()) {
    document.body.style.backgroundImage = "url('https://wallpaperscraft.com/image/milky_way_august_sky_fir-trees_trees_night_45544_2560x1600.jpg')";
    // document.body.style.backgroundImage = "url('http://cdn.wallpapername.com/1680x1050/20140408/video%20games%20robots%20eclipse%20aliens_www.wallpapername.com_79.jpg')";
    
}


// Load adsense after 5secs
// setTimeout(function() { (adsbygoogle = window.adsbygoogle || []).push({}); console.log('ads loaded'); }, 5000);

function greetingMsg() {
    let timeNow = new Date().getHours();
    let greetMsg = document.getElementById("greeting");

    if ( timeNow < 12) {

        greetMsg.innerHTML = "Good morning";

    }

    if ( ( timeNow > 12 ) && ( timeNow < 18 ) ) {

        greetMsg.innerHTML = "Good afternoon";

    }

    if (timeNow > 18) {

        greetMsg.innerHTML = "Good evening";

    }

}
greetingMsg();