let nextId = 0;
let listi = 0;
let list = [];
let taski = 0;
let curlist;
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
class Task {
    constructor(id, name, subtitle, text, complete) {
        this.id = id;
        this.name = name;
        this.subtitle = subtitle;
        this.text = text;
        this.complete = complete
    }
}


function displayCurrentList(){
    $( "<li class=\"nav-item\" onclick=\"curlist=${listitem.id}\"><a class=\"nav-link\" id=\"current-list-name\" data-toggle=\"tab\" href=\"#nav${listitem.id}\" role=\"tab\" aria-controls=\"home\" aria-selected=\"true\">${listitem.name}</a>" ).insertBefore( ".dropdown" );
    // let listString = '';
    // for (let i = 0; i < list.length; i++){
    //     let listitem = list[i];
    //     listString += `<li class="nav-item" onclick="curlist=${listitem.id}"><a class="nav-link" id="current-list-name" data-toggle="tab" href="#nav${listitem.id}" role="tab" aria-controls="home" aria-selected="true">${listitem.name}</a></li>`
    // }
    // listString += `<li class="nav-item dropdown">
    //     <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
    //     <div class="dropdown-menu">
    //         <input type="text" placeholder="New List" onclick="this.select()"
    //                onKeyDown="if(event.keyCode==13) createNewList();" size="20" id="new-list-input">
    //         <div class="dropdown-divider"></div>
    //         <a class="dropdown-item" href="#">Separated link</a>
    //     </div>
    // </li>`;
    // document.getElementById('myTab').innerHTML = listString;


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
    $(`<li class="nav-item" onclick="curlist=${list[listi].id}"><a class="nav-link" id="current-list-name" data-toggle="tab" href="#nav${list[listi].id}" role="tab" aria-controls="home" aria-selected="true">${list[listi].name}</a>`).insertBefore(".dropdown");
    $(".tab-content").append(`<div class="tab-pane fade" id="nav${list[listi].id}" role="tabpanel" aria-labelledby="profile-tab"><div class="card-columns col${list[listi].id}">
            <div class="card" style="">
                <div class="card-body">
                    <h5 class="card-title"><input id="title" placeholder="Task Title" type="text" style="border: none;"></h5>
                    <h6 class="card-subtitle mb-2 text-muted"><input id="subtitle" placeholder="Task Subtitle" type="text" style="border: none;"></h6>
                    <p class="card-text"><textarea id="text" style="width: 100%; border: none;" placeholder="This is the Tasks Text. Put any information you need here."></textarea></p>
                    <a href="#" onclick="addTask()" class="card-link text-success">Add Card</a>
                    <!--<a href="#" class="card-link">Another link</a>-->
                </div>
            </div>
        </div></div>`);
    listi++;
    $('.card-columns').sortable();
    // let newList = {
    //     id: nextId++,
    //     name: document.getElementById('new-list-input').value,
    //     tasks:[]
    // };
    console.log(list);
    // displayCurrentList();
}

function addTask(){
    list[curlist].task[taski] = new Task(taski, document.getElementById('title').value, document.getElementById('subtitle').value, document.getElementById('text').value, false);

    document.getElementById('title').value = '';
    document.getElementById('subtitle').value = '';
    document.getElementById('text').value = '';
    $('.col'+ curlist).append(`<div class="card" style="">
                <div class="card-body">
                    <h5 class="card-title">${list[curlist].task[taski].name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${list[curlist].task[taski].subtitle}</h6>
                    <p class="card-text">${list[curlist].task[taski].text}</p>
                    <a href="#" onclick="completeTask(${taski})" class="card-link text-success">Complete</a>
                    <a href="#" onclick="deleteTask(${taski})" class="card-link text-danger">Delete</a>
                </div>
            </div>`);
    taski++;
    // displayCurrentTasks();

}

function deleteTask(id){
    
}