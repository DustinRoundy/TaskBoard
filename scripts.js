
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
        $('#card' + id).animate({
            opacity: 0
        }, 800, function(){
            //when animation is done
            Save();
            redrawLists();
        });
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
        $( ".card-columns" ).sortable();
        for(let j = 0; j < lists[i].task.length; j++){
            if (lists[i].task[j].complete === true){
                $('.col' + i).append(`<div class="card border-success text-secondary" id="card${j}" style="">
                 <div class="card-body">
                     <h5 class="card-title">${lists[i].task[j].name}</h5>
                     <p class="card-text">${lists[i].task[j].text}</p>
                     
                     <a href="#" onclick="lists[${i}].removeItem(${j})" class="card-link text-danger">Delete</a>
                 </div>
             </div>`);
            }
            else{
                $('.col' + i).append(`<div class="card" id="card${j}" style="">
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
