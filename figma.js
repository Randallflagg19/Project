const moviesList = [
  {
    id: "1",
    title: "Dune",
    status: true,
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    status: false,
  },
  {
    id: "3",
    title: "The Matrix",
    status: false,
  },
  // {
  //   id: "4",
  //   title: "The Godfather",
  //   status: true,
  // },
  // {
  //   id: "5",
  //   title: "The Dark Knight",
  //   status: true,
  // },
  // {
  //   id: "6",
  //   title: "Schindler's List",
  //   status: false,
  // },
  // {
  //   id: "7",
  //   title: "The Lord of the Rings: The Return of the King",
  //   status: true,
  // },
  // {
  //   id: "8",
  //   title: "The Shawshank Redemption",
  //   status: true,
  // },
  // {
  //   id: "9",
  //   title: "Pulp Fiction",
  //   status: false,
  // },
  // {
  //   id: "10",
  //   title: "Forrest Gump",
  //   status: true,
  // },
];

// localStorage.setItem("tasks", JSON.stringify(moviesList3));
//
// const moviesList = moviesList1.filter((item) => (item.id = "3"));

// const moviesList = JSON.parse(localStorage.getItem("tasks")) || [];

const globalTasks = document.querySelector(".thirdLine");
const inp = document.querySelector(".input");
const circleButton = document.querySelector(".circle");





function createTask(task, status) {
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="task">
    <div class="leftinfo">
      <input type="checkbox" class="bar"/>
      <p class="todo-text">${task}</p>
    </div>
  
    <div class="display-flex">
      <button class="trash rightinfo">
        <img src="trash.png" height="16px" width="16px" />
    </button>
    </div>
  </div>`;

function taskAddEventListeners(newElement, status = false){
  const newCheckBox = newElement.querySelector(".bar");
  const newTodoText = newElement.querySelector(".todo-text");
  const newTrashBtn = newElement.querySelector(".trash");
  
  newCheckBox.checked = status;
  
  if (newCheckBox.checked) {
    newTodoText.classList.add("todo-text_through");
  }
    
  newCheckBox.addEventListener("change", (e) => {
    if (status) {
      e.target.checked;
    }
    
    if (e.target.checked) {
      newTodoText.classList.add("todo-text_through");
    } else {
      newTodoText.classList.remove("todo-text_through");
    }
  });

  newTrashBtn.addEventListener("click", (e) => removeTask(e));

  function removeTask(e) {
    const taskEl = e.target.closest(".task");
  
    if (taskEl) {
      taskEl.remove();
    }
  }
}

taskAddEventListeners(newElement, status)

  return newElement;
}



moviesList.forEach((movie) => {
  let createNewMovie = createTask(movie.title, movie.status);
  globalTasks.append(createNewMovie);
});




// circleButton.addEventListener("click", (e) => {
//   const inputValue = inp.value;
//   if (inputValue == ''){
//     alert('Input is empty')
//   }
//   else{
//   const createNewTask = createTask(inputValue);
//   globalTasks.append(createNewTask)
//   }

//   // moviesListz

//   // moviesList.push({ id: "11", title: inp.value, status: false });

//   // localStorage.setItem("tasks", JSON.stringify(moviesList));
//   // console.log(moviesList);

//   inp.value = "";
// });



circleButton.addEventListener("click", (e) => {
  const inputValue = inp.value;
  if (inputValue == ''){
    alert('Input is empty')
  }
  else{
  const createNewTask = createTask(inputValue);
  globalTasks.append(createNewTask)
  }

  // moviesListz

  // moviesList.push({ id: "11", title: inp.value, status: false });

  // localStorage.setItem("tasks", JSON.stringify(moviesList));
  // console.log(moviesList);

  inp.value = "";
});



// function addDataToLocalStorage(data, lcKey) {}

// function removeDataFromLocalStorage(id, lcKey) {}

// function changeDataInLocalStorage(id, data, lcKey) {}

// // кнопки функции, LocalStorage

// //********************************* LocalStorage  */

// inp.addEventListener("input", (e) => {
//   if (!e.target.value.trim()) {
//     return;
//   }
//   console.log(e.target.value);
//   localStorage.setItem("inputValue", e.target.value);
// });

// inp.value = localStorage.getItem("inputValue");

// localStorage.setItem("tasks", JSON.stringify(moviesList1));

//console.log(typeof localStorage.getItem("tasks"));

























// const createNewTask1 = createTask("Сделать дз 1");
// globalTasks.append(createNewTask1);
// setNewTask();

// const createNewTask2 = createTask("Сделать дз 2");
// globalTasks.append(createNewTask2);
// setNewTask();

// const createNewTask3 = createTask("Сделать дз 3");
// globalTasks.append(createNewTask3);
// setNewTask();

//(+)адекватная реакция на новые таски чтобы зачеркивались

//(+)массив подгружается в данные тасок, исходит из них (используя цикл)
//оптимизировать код с чат gpt



// const todoList = document.querySelectorAll(".task");

// const allButon = document.querySelector(".all");
// const doneButon = document.querySelector(".done");
// const notDoneButon = document.querySelector(".notDone");
