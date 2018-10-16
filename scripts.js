let nextId = 0;
let listi = 0;
let list = [];
$('.card-columns').sortable();


class List {
    constructor(id, name, task) {
        this.id = id;
        this.name = name;
        this.task = task;
    }
    delete() {

    }
}


function displayCurrentList(){
    let listString = '';
    for (let i = 0; i < list.length; i++){
        let listitem = list[i];
        listString += `<li class="nav-item"><a class="nav-link" id="current-list-name" data-toggle="tab" href="#nav${listitem.id}" role="tab" aria-controls="home" aria-selected="true">${listitem.name}</a></li>`
    }
    listString += `<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu">
            <input type="text" placeholder="New List" onclick="this.select()"
                   onKeyDown="if(event.keyCode==13) createNewList();" size="20" id="new-list-input">
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Separated link</a>
        </div>
    </li>`;
    document.getElementById('myTab').innerHTML = listString;

    // let tasksString = '';
    //
    // for (let index = 0; index < lists.currentList.tasks.length; index++){
    //     const task = lists.currentList.tasks[index];
    //     tasksString +=`<div><li>${task.text}</li><input type="checkbox" checked="${task.done}"></div>`;
    // }
    //
    // document.getElementById('tasklist').innerHTML = tasksString;
}

// displayCurrentList();

function createNewList(){
    list[listi] = new List(listi, document.getElementById('new-list-input').value, []);
    listi++;
    // let newList = {
    //     id: nextId++,
    //     name: document.getElementById('new-list-input').value,
    //     tasks:[]
    // };
    console.log(list);
    displayCurrentList();
}

