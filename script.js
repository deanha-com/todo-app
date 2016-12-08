function adding() {
	var node = document.createElement("li");
  var newDiv = document.createElement("div");
  var newLabel = document.createElement("label");
  var newInput = document.createElement("input");
  var newSpan = document.createElement("span");
  var newButton = document.createElement("button");
  newSpan.className += " todo_task";


  console.log(node);
  node.className += " todo_item";
  
  node.appendChild(newDiv);
  node.querySelector('div').appendChild(newLabel);
  node.querySelector('div').appendChild(newButton).innerHTML = 'Delete';
  node.querySelector('div').appendChild(newButton).className = 'todo_item-delete';

  node.querySelector('label').appendChild(newInput).type = 'checkbox';
  node.querySelector('label').appendChild(newSpan).className = 'todo_task';


  var textnode = document.createTextNode(document.querySelector('.todo_input').value);
  node.querySelector('label').appendChild(newSpan).appendChild(textnode);
  document.querySelector('.todo_list').appendChild(node);

}

function removing() {
this.parentElement.style.display = 'none';

}


function renderTask() {

	var tt = todos.todolist;

		for (i = 0; i < tt.length; i++) { 
		    // console.log(tt[i].label);
			    var node = document.createElement("li");
			    var newDiv = document.createElement("div");
			    var newLabel = document.createElement("label");
			    var newInput = document.createElement("input");
			    var newSpan = document.createElement("span");
			    var newButton = document.createElement("button");
			    newSpan.className += " todo_task";


			    console.log(node);
			    node.className += " todo_item";
			    
			    node.appendChild(newDiv);
			    node.querySelector('div').appendChild(newLabel);
			    node.querySelector('div').appendChild(newButton).innerHTML = 'Delete';
			    node.querySelector('div').appendChild(newButton).className = 'todo_item-delete';

			    node.querySelector('label').appendChild(newInput).type = 'checkbox';
			    node.querySelector('label').appendChild(newSpan).className = 'todo_task';


			    var textnode = document.createTextNode(tt[i].label);
			    node.querySelector('label').appendChild(newSpan).appendChild(textnode);
			    document.querySelector('.todo_list').appendChild(node);

		}
}

window.onload = function () {

	document.getElementsByClassName("todo_count")[0].innerHTML = todos.todolist.length + ' task left to do';
	// console.log (todos.todolist.length);

	document.querySelector('.todo_add-item').onclick=function(){todos.addTask();};
	document.getElementById("todoInput").focus();
	// document.querySelector('.todo_input').onclick=function(){this.value = 'testing';};
	document.getElementsByClassName('todo_item-delete').onclick=function(){alert('sssss');};


	renderTask();

}


//////////////////////

// CLONE HIDDEN STRUCTURE - Works but adds the copy list item as well.. we dont want that.

	// 	for (i = 0; i < tt.length; i++) { 
	//     var itm = document.querySelector(".todo_list_boiler li");
	// 		var cln = itm.cloneNode(true);
	// 		document.querySelector('.todo_task').innerHTML = tt[i].label;
	// 		document.querySelector('.todo_list').appendChild(cln);

	// 		console.log(cln);
	// 	}




	// function render() {
	// 	var itm = document.querySelector(".todo_list_boiler li");
	// 	var cln = itm.cloneNode(true);
	// 	document.querySelector('.todo_list').appendChild(cln);
	// 	document.querySelector('.todo_task').innerHTML = tt[i].label;
	// 	console.log(cln);
	// }