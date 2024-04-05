let input = document.querySelector(".text-box")
let btn = document.querySelector(".submit")
let taskDiv = document.querySelector(".task-div")
let choosen = document.querySelector(".choosen")
let chooseBtn = document.querySelector(".choose")

let taskArray = []

getFromStorage()

// Add task
btn.onclick = function () {
    if(input.value != "") {
        addTaskToArray(input.value);
        input.value = ''
    }
}

function addTaskToArray(inputText){
    let task = {
        id: Date.now(),
        text: inputText,
    }
    taskArray.push(task)
    addElementToPage(taskArray)
    addElementToStorage(taskArray)
}

function addElementToPage(taskArray) {
    taskDiv.innerHTML = ""
    taskArray.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
        div.setAttribute("id" , task.id)
        div.innerHTML= `<p class ="p-text">${task.text}</p>`
        let del = document.createElement("span")
        del.className = "del"
        del.innerHTML = "Delete"
        div.appendChild(del)
        taskDiv.appendChild(div)
    });
}

function addElementToStorage(taskArray){
    window.localStorage.setItem("items" , JSON.stringify(taskArray))
}

function getFromStorage () {
  let data =  window.localStorage.getItem("items")
  if (data){
    let tasks = JSON.parse(data)
    taskArray = tasks
    addElementToPage(taskArray)
  }
}

// remove task 
taskDiv.addEventListener("click" , (e) => {
    //delete
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        // remove from storage
        taskArray = taskArray.filter((task) => task.id != e.target.parentElement.getAttribute("id"))
        addElementToStorage(taskArray)
    }
})

// choose
chooseBtn.onclick = function (){
    choosen.innerHTML = ""
    let randomIndex = Math.floor(Math.random() * taskArray.length) 
    let item = taskArray[randomIndex].text
    choosen.innerHTML = item
    console.log(randomIndex)
}