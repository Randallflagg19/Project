// const moviesList = [
//   {
//     id: "1",
//     title: "Dune",
//     status: true,
//   },
//   {
//     id: "2",
//     title: "The Shawshank Redemption",
//     status: false,
//   },
//   {
//     id: "3",
//     title: "The Matrix",
//     status: false,
//   },
//   {
//     id: "4",
//     title: "The Godfather",
//     status: true,
//   },
//   {
//     id: "5",
//     title: "The Dark Knight",
//     status: true,
//   },
// ];

// localStorage.setItem("tasks", JSON.stringify(moviesList));


// class Task {
//   constructor() {}

//   create(task, id, status) {
//     // делаем фетч с post параметром на создание новой таски.
//     const newElement = document.createElement("div");
//     newElement.innerHTML = `<div class="task">
//       <div class="leftinfo">
//         <input type="checkbox" class="bar"/>
//         <p class="todo-text">${task}</p>
//       </div>
    
//       <div class="display-flex">
//         <button class="trash rightinfo">
//           <img src="trash.png" height="16px" width="16px" />
//       </button>
//       </div>
//     </div>`;

//     function taskAddEventListeners(newElement, id, status) {
//       const newCheckBox = newElement.querySelector(".bar");
//       const newTodoText = newElement.querySelector(".todo-text");
//       const newTrashBtn = newElement.querySelector(".trash");
//       let newId = id;
//       newCheckBox.checked = status;

//       if (newCheckBox.checked) {
//         newTodoText.classList.add("todo-text_through");
//       }

//       //CHANGE +++

//       newCheckBox.addEventListener("change", (e) => {
//         const isChecked = e.target.checked;
//         const toggleClass = isChecked ? "add" : "remove";

//         newTodoText.classList[toggleClass]("todo-text_through");
//         arrFromLs.forEach((i) => {
//           if (i.id == newId) {
//             i.status = !i.status;
//             changeDataInLocalStorage(task, i.id, "tasks", i.status);
//           }
//         });
//         fetch(`${url}/movies/${newId}`, {
//           method: "PUT",
//           body: JSON.stringify({
//             status: isChecked,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//       });

//       //DELETE +++
//       // на мусорку чтобы удалялось через сервер .delete

//       newTrashBtn.addEventListener("click", (e) => removeTask(e));

//       function removeTask(e) {
//         const taskEl = e.target.closest(".task");

//         if (taskEl) {
//           arrFromLs = arrFromLs.filter((item) => item.id !== newId);
//           taskEl.remove();
//           localStorage.setItem("tasks", JSON.stringify(arrFromLs));
//         }
//       }
//     }

//     taskAddEventListeners(newElement, id, status);
//     return newElement;
//   }
// }

// class API {
//   constructor(url, params) {
//     this.url = url;
//     this.params = params;
//   }

//   fetchJson(url, params) {
//     return this.fetchJson(url, params).then((res) => res.json());
//   }
//   async getAllTasks() {
//     return await this.fetchJson(this.url);
//   }
// }

function TaskElement(task) {
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

  return newElement;
}


const url = "http://localhost:3000/api";

let arrFromLs = JSON.parse(localStorage.getItem("tasks")) || [];
const globalTasks = document.querySelector(".thirdLine");
const input = document.querySelector(".input");
const circleButton = document.querySelector(".circle");
const doneButton = document.querySelector(".done");
const notDoneButton = document.querySelector(".notDone");
const allButton = document.querySelector(".all");

fetch(`${url}/movies`)
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
    // add data to localstorage
    addMoviesFromServer(data);
  })
  .catch((err) => {
    console.error(err);
  });




function createTask(task, id, status) {
  // делаем фетч с post параметром на создание новой таски.
  const newElement = new TaskElement(task)

  function taskAddEventListeners(newElement, id, status) {
    const newCheckBox = newElement.querySelector(".bar");
    const newTodoText = newElement.querySelector(".todo-text");
    const newTrashBtn = newElement.querySelector(".trash");
    let newId = id;
    newCheckBox.checked = status;

    if (newCheckBox.checked) {
      newTodoText.classList.add("todo-text_through");
    }

    //CHANGE +++

    newCheckBox.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      const toggleClass = isChecked ? "add" : "remove";

      newTodoText.classList[toggleClass]("todo-text_through");
      arrFromLs.forEach((i) => {
        if (i.id == newId) {
          i.status = !i.status;
          changeDataInLocalStorage(task, i.id, "tasks", i.status);
        }
      });
      fetch(`${url}/movies/${newId}`, {
        method: "PUT",
        body: JSON.stringify({
          status: isChecked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    //DELETE +++
    // на мусорку чтобы удалялось через сервер .delete

    newTrashBtn.addEventListener("click", (e) => removeTask(e));

    function removeTask(e) {
      const taskEl = e.target.closest(".task");

      if (taskEl) {
        arrFromLs = arrFromLs.filter((item) => item.id !== newId);
        taskEl.remove();
        localStorage.setItem("tasks", JSON.stringify(arrFromLs));
      }
    }
  }

  taskAddEventListeners(newElement, id, status);
  return newElement;
}

doneButton.addEventListener("click", (e) => {
  globalTasks.innerHTML = "";
  let moviesListDone = arrFromLs.filter((item) => item.status);
  moviesListDone.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
});

notDoneButton.addEventListener("click", (e) => {
  globalTasks.innerHTML = "";
  let moviesListDone = arrFromLs.filter((item) => !item.status);
  moviesListDone.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
});

allButton.addEventListener("click", (e) => {
  globalTasks.innerHTML = "";
  arrFromLs.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
});

circleButton.addEventListener("click", () => {
  if (input.value == "") {
    alert("Input is empty");
  } else {
    let newId = new Date().getTime();
    globalTasks.append(createTask(input.value, newId));
    arrFromLs.push({
      id: `${newId}`,
      title: input.value,
      status: false,
    });
  }

  localStorage.setItem("tasks", JSON.stringify(arrFromLs));

  input.value = "";
});

function setTasks() {
  globalTasks.innerHTML = "";
  arrFromLs.forEach(({ title, id, status }) => {
    globalTasks.append(createTask(title, id, status));
  });
}

// setTasks();

function changeDataInLocalStorage(data, id, lcKey, status) {
  let value = localStorage.getItem(lcKey);
  let changedDataForLS = JSON.parse(value);
  changedDataForLS.forEach((el) => {
    if (el.id == id) {
      el.title = data;
      el.status = status;
      localStorage.setItem(lcKey, JSON.stringify(changedDataForLS));

      setTasks();
    }
  });
}

//changeDataInLocalStorage("22", 3, "tasks", true);

function addMoviesFromServer(data) {
  data.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
}

// const newMovie = {
//   id: "16",
//   title: "Schindler's List",
//   status: true,
// };

// fetch(requestURL, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(newMovie),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("New movie added:", data);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     userId: 11111,
//     id: newMovie.id,
//     title: newMovie.title,
//     body: newMovie.status,
//   }),
// })
//   .then((data) => data.json())
//   .then((data) => console.log(data));
