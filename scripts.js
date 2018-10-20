
let lists = [];
let curlist;

class List {
    constructor(name,task){
        this.name = name;
        this.task = task;
    }
    delete(){
        lists.splice(curlist, 1);
        Save();
        redrawLists();
    }
    addItem(){
        //adding to list goes here
        let name = $('#title' + curlist).val();
        let text = $('#text' + curlist).val();
        let complete = false;
        this.task.push(new Task(name, text, complete));
        Save();
        redrawLists();
    }
    completeItem(id){
        this.task[id].complete = true;
        Save();
        redrawLists();
    }
    removeItem(id){
        this.task.splice(id, 1);
        Save();
        redrawLists();
    }
}
class Task {
    constructor(name, text, complete){
        this.name = name;
        this.text = text;
        this.complete = complete;
    }

}
Load();

function createNewList(){
    lists.push(new List($('#new-list-input').val(), []));
    $('#new-list-input').val('');
    redrawLists();
}

function redrawLists(){
    $('#myTab').html('');
    $('#myTabContent').html('');
    for (let i = 0; i < lists.length; i++){
        if (curlist === i){
            $("#myTab").append(`<li class="nav-item"><a class="nav-link active" id="home-tab" data-toggle="tab" href="#${"nav" + i}" role="tab" aria-controls="home" aria-selected="true" onclick="curlist=${i}">${lists[i].name}</a></li>`);
            $('#myTabContent').append(`<div class="tab-pane fade show active" id="nav${i}" role="tabpanel" aria-labelledby="profile-tab"></div>`);
            $('#nav' + i).append(`<div class="card-columns col${i}">
             <div class="card" style="">
                 <div class="card-body">
                     <h5 class="card-title"><input id="title${i}" placeholder="Task Title" type="text" style="border: none;"></h5>
                     <h6 class="card-subtitle mb-2 text-muted"><input id="subtitle${i}" placeholder="Task Subtitle" type="text" style="border: none;"></h6>
                     <p class="card-text"><textarea id="text${i}" style="width: 100%; border: none;" placeholder="This is the Tasks Text. Put any information you need here."></textarea></p>
                     <a href="#" onclick="lists[${i}].addItem()" class="card-link text-success">Add Card</a>
                     <!--<a href="#" class="card-link">Another link</a>-->
                 </div>
             </div>
         </div>`);
        }else {
            $("#myTab").append(`<li class="nav-item"><a class="nav-link" id="home-tab" data-toggle="tab" href="#${"nav" + i}" role="tab" aria-controls="home" aria-selected="true" onclick="curlist=${i}">${lists[i].name}</a></li>`);
            $('#myTabContent').append(`<div class="tab-pane fade" id="nav${i}" role="tabpanel" aria-labelledby="profile-tab"></div>`);
            $('#nav' + i).append(`<div class="card-columns col${i}">
             <div class="card" style="">
                 <div class="card-body">
                     <h5 class="card-title"><input id="title${i}" placeholder="Task Title" type="text" style="border: none;"></h5>
                     <h6 class="card-subtitle mb-2 text-muted"><input id="subtitle${i}" placeholder="Task Subtitle" type="text" style="border: none;"></h6>
                     <p class="card-text"><textarea id="text${i}" style="width: 100%; border: none;" placeholder="This is the Tasks Text. Put any information you need here."></textarea></p>
                     <a href="#" onclick="lists[${i}].addItem()" class="card-link text-success">Add Card</a>
                     <!--<a href="#" class="card-link">Another link</a>-->
                 </div>
             </div>
         </div>`);
        }
        for(let j = 0; j < lists[i].task.length; j++){
            if (lists[i].task[j].complete === true){
                $('.col' + i).append(`<div class="card border-success text-secondary" style="">
                 <div class="card-body">
                     <h5 class="card-title">${lists[i].task[j].name}</h5>
                     <p class="card-text">${lists[i].task[j].text}</p>
                     
                     <a href="#" onclick="lists[${i}].removeItem(${j})" class="card-link text-danger">Delete</a>
                 </div>
             </div>`);
            }
            else{
                $('.col' + i).append(`<div class="card" style="">
                 <div class="card-body">
                     <h5 class="card-title">${lists[i].task[j].name}</h5>
                     <p class="card-text">${lists[i].task[j].text}</p>
                     <a href="#" onclick="lists[${i}].completeItem(${j})" class="card-link text-success">Complete</a>
                     <a href="#" onclick="lists[${i}].removeItem(${j})" class="card-link text-danger">Delete</a>
                 </div>
             </div>`);
            }
        }
    }
    $('#myTab').append(`<li class="nav-item dropdown d-flex justify-content-end">
         <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Options</a>
         <div class="dropdown-menu">
             <input type="text" placeholder="New List" onclick="this.select()"
                    onKeyDown="if(event.keyCode==13) createNewList();" size="20" id="new-list-input">
             <div class="dropdown-divider"></div>
             <a class="dropdown-item text-danger" href="#" onclick="lists[curlist].delete()">Delete List</a>
         </div>
     </li>`)
}

function Save(){
    let listString = JSON.stringify(lists);
    localStorage.setItem(0, listString);
}
function Load(){
    if (localStorage.length == 0) {
        console.log("none found");
    }
    else{
        let list = JSON.parse(localStorage.getItem(0));
        console.log(list);
        for (let i = 0; i < list.length; i++){
            name = list[i].name;
            lists.push(new List(list[i].name, []));
            for (let j = 0; j < list[i].task.length; j++){
                lists[i].task.push(new Task(list[i].task[j].name, list[i].task[j].text, list[i].task[j].complete));
            }
        }
        redrawLists();
    }

}

// class List{
//     constructor(name, tasks, done){
//         this.name = name;
//         this.tasks = tasks;
//         this.done = done;
//     }
//
// }
// let listArray = [];
// let currentList;
//
// function createListObject(){
//     listArray.push(new List($("listName").val(), [], false));
//     let id = listArray.length - 1;
//     currentList = id;
//     // let newList = new List(id, $(".listName").val());
//     // nextId++;
//     // addListArray(newList);
//     //
//     // currentList = newList.id;
//
//
//     $(".sideContainer").append("<div class='row' >" +
//         "<span class='sideListName' onclick='displayList(" + id + ")' contenteditable='true'>" + listArray[id].name +
//         "</span></div>");
//     $(".listName").val("");
//     //
//     // let idName = 'listIdName';
//     // console.log("attrb id is " + $(this).id);
//     // console.log(nextId + ": "  + listArray[listArray.length -1].name);
// }
//
// function addListArray(list) {
//     listArray.push(list);
//     console.log(listArray.length);
//     console.log(list.name);
// }
//
// function findId(list) {
//
// }
//
// function displayList(x){
//     console.log("newlist name" + x);
//     $(".mainContainer").append("<div class='listContainer'>" +
//         "<div class='listTitle'>" + "To Do List" + "</div>" +
//         "<div class='taskContainer'>" + "</div>" +
//         //"<div class='taskList'>" +
//         //     "<div>" + "<i class='far fa-square'>" + "</i>" + "Name of Task Here"+ "</div>" +
//         //     "<i class='trashCan far fa-trash-alt'>" + "</i>"+
//         // "</div>" + "</div>" +
//         "<div class='listFooter'>" +
//         "<button class='taskButton' onclick='addTask()'>" + "New Task" + "</button>" + "</div>");
//
//     $('.myInput').val("");
//     $('.trashCan').click(function(){ +
//         $(this).parent().parent().animate({
//             opacity: 0,
//             left: '+=200'
//         }, 800, function() {
//             $(this).remove();
//         });
//     });
//
//     for(let j = 0; j < listArray.length; j++){
//         console.log(" from displayList: " + listArray[j].name + " and ");
//     }
// }
//
// function addTask() {
// // $(".taskContainer").append("<div class='taskList'>" + 'Hello' +
// //     "<div>" + "<i class='trashCan far fa-trash-alt'>" + "</i>" +
// //     "<i class='far fa-square'>" + "</i>" + "</div>" + "</div>");
//
//     $(".taskContainer").append("<div class='taskList'>" +
//         "<div class='checkboxName'>" + "<i class='far fa-square'>" + "</i>" + "Name of Task Here"+ "</div>" +
//         "<i class='trashCan far fa-trash-alt'>" + "</i>"+
//         "</div>");
//
//     $('.myInput').val("");
//     $('.trashCan').click(function(){
//         $(this).parent().parent().animate({
//             opacity: 0,
//             left: '+=200'
//         }, 800, function() {
//             $(this).remove();
//         });
//     });
// }