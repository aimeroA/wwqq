//select the elements
const clear = document.querySelector(".clear");
const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

let LIST ;
let id;

// classes names
const CHECK= "fa-check-circle";
const UNCHECK= "fa-circle-thin";
const LINE_THOUGH= "lineThrough";

//get item from local storage
let data = localStorage.getItem("aimers_list")
 
//check if data is empty or not 
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else{
    //if empthy
    LIST = [];
    id = 0;
}
//load items to the user
function loadList(array){
    array.forEach(function(item) {
        if(item.trash==false){
        addToDo(item.name,item.id,item.done,item.trash);}
        else{
            console.log("why");
        }

    });
}


//show todays date
const options = {weekday: "long", month:"short", day:"numeric"}
const today = new Date();

dataElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(todo,id,done,trash){
    if(trash){return;}
    postion = "beforeend";
    const DONE = done?CHECK:UNCHECK;
    const LINE = done?LINE_THOUGH:"";
    const item= `<li class= "item">
          <i class="fa ${DONE} co" job="complete" id="${id}"></i>
          <p class="text ${LINE}">${todo}</p>
          <i class="fa fa-trash-o de" job="remove" id=${id}></i> 
         </li> `;
    list.insertAdjacentHTML(postion,item);
}
document.addEventListener("keyup",function(KeyboardEvent){
  if(KeyboardEvent.code=="Enter"){
      const toDo = input.value;
      if(toDo){
          addToDo(toDo,id,false,false);
          LIST.push({
              name:toDo,
              id:id,
              done:false,
              trash:false
          });
          id++;
          console.log(list);
          localStorage.setItem("aimers_list",JSON.stringify(LIST));
      }
      input.value="";
  }
});

function complteToDo(element){
   element.classList.toggle(CHECK);
   element.classList.toggle(UNCHECK);
   element.parentNode.querySelector(".text").classList.toggle(LINE_THOUGH);

   LIST[element.id].done = LIST[element.id].done ? false:true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
    
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        complteToDo(element);
    }else if(elementJob == "remove"){
        removeToDo(element);
    }
    console.log(LIST);
    localStorage.setItem("aimers_list",JSON.stringify(LIST));
});