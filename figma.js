const rawMoviesList = [
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
  {
    id: "4",
    title: "The Godfather",
    status: true,
  },
  {
    id: "5",
    title: "The Dark Knight",
    status: true,
  },
  {
    id: "6",
    title: "Schindler's List",
    status: false,
  },
  {
    id: "7",
    title: "The Lord of the Rings: The Return of the King",
    status: true,
  },
  {
    id: "8",
    title: "The Shawshank Redemption",
    status: true,
  },
  {
    id: "9",
    title: "Pulp Fiction",
    status: false,
  },
  {
    id: "10",
    title: "Forrest Gump",
    status: true,
  },
];

localStorage.setItem("tasks", JSON.stringify(rawMoviesList));

async function getData() {
  const data = fetch("http://localhost:3000/api/movies")
    .then((res) => res.json())
    .then((res) => res);

  return data;
}

const returnedData = getData().then((res) => {
  console.log(res);
});

console.log(returnedData);
// В moviesList прокидываем данные из fetch
// результат getdata массив с сервера (из файла) 
let moviesList = JSON.parse(localStorage.getItem("tasks")) || [];

const globalTasks = document.querySelector(".thirdLine");
const inp = document.querySelector(".input");
const circleButton = document.querySelector(".circle");

const doneButton = document.querySelector(".done");
const notDoneButton = document.querySelector(".notDone");
const allButton = document.querySelector(".all");

doneButton.addEventListener("click", (e) => {
  while (globalTasks.firstChild) {
    globalTasks.removeChild(globalTasks.firstChild);
  }
  let moviesListDone = moviesList.filter((item) => item.status);
  moviesListDone.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
});

notDoneButton.addEventListener("click", (e) => {
  while (globalTasks.firstChild) {
    globalTasks.removeChild(globalTasks.firstChild);
  }
  let moviesListDone = moviesList.filter((item) => !item.status);
  moviesListDone.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
});

allButton.addEventListener("click", (e) => {
  while (globalTasks.firstChild) {
    globalTasks.removeChild(globalTasks.firstChild);
  }
  moviesList.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
});

function createTask(task, id, status) {
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

  function taskAddEventListeners(newElement, id, status = false) {
    const newCheckBox = newElement.querySelector(".bar");
    const newTodoText = newElement.querySelector(".todo-text");
    const newTrashBtn = newElement.querySelector(".trash");
    let newId = id;
    newCheckBox.checked = status;

    if (newCheckBox.checked) {
      newTodoText.classList.add("todo-text_through");
    }

    //CHANGE

    newCheckBox.addEventListener("change", (e) => {
      if (status) {
        e.target.checked;
      }

      if (e.target.checked) {
        newTodoText.classList.add("todo-text_through");
        moviesList.forEach((i) => {
          if (i.id == newId) {
            i.status = !i.status;
            changeDataArrInLocalStorage("tasks", i.id, {
              ...i,
              status: i.status,
            });
          }
        });

        console.log(moviesList);
      } else {
        newTodoText.classList.remove("todo-text_through");
        moviesList.forEach((i) => {
          if (i.id == newId) {
            i.status = !i.status;
            changeDataArrInLocalStorage("tasks", i.id, {
              ...i,
              status: i.status,
            });
          }
        });

        console.log(moviesList);
      }
    });

    //DELETE

    newTrashBtn.addEventListener("click", (e) => removeTask(e));

    function removeTask(e) {
      const taskEl = e.target.closest(".task");

      if (taskEl) {
        moviesList = moviesList.filter((item) => item.id !== newId);
        taskEl.remove();
        localStorage.setItem("tasks", JSON.stringify(moviesList));
      }
    }
  }

  taskAddEventListeners(newElement, id, status);
  return newElement;
}

moviesList.forEach((movie) => {
  let createNewMovie = createTask(movie.title, movie.id, movie.status);
  globalTasks.append(createNewMovie);
});

circleButton.addEventListener("click", (e) => {
  const inputValue = inp.value;
  if (inputValue == "") {
    alert("Input is empty");
  } else {
    const createNewTask = createTask(inputValue, globalTasks.children.length);
    globalTasks.append(createNewTask);
  }

  moviesList.push({
    id: `${globalTasks.children.length.toString()}`,
    title: inp.value,
    status: false,
  });

  localStorage.setItem("tasks", JSON.stringify(moviesList));

  inp.value = "";
});

exMovie = [
  {
    id: "2",
    title: "The Shawshank Redemption",
    status: false,
  },
  {
    id: "3",
    title: "The Shawshank Redemption",
    status: false,
  },
];

function addDataToLocalStorage(lcKey, data) {
  localStorage.setItem(lcKey, data);
}

addDataToLocalStorage("someKey", JSON.stringify(exMovie));

// function removeDataFromLocalStorage(lcKey, id) {
//   let dataFromls = JSON.parse(localStorage.getItem(`${lcKey}`))
//   let newData = dataFromls.filter(item => item.id !== id)
//   localStorage.setItem(`${lcKey}`, JSON.stringify(newData))
// }

// removeDataFromLocalStorage('someKey', '2')

function changeDataArrInLocalStorage(lcKey, id, data) {
  let dataFromls = JSON.parse(localStorage.getItem(`${lcKey}`));
  ////////////////////////////////////////////////////////////
  const newData = dataFromls.map((item) => {
    if (item.id === id) {
      const newElement = { ...item, ...data };
      return newElement;
    }

    return item;
  });
  localStorage.setItem(`${lcKey}`, JSON.stringify(newData));
}

const arrObj = [
  { key: "value1", key2: "value2" },
  { key: "value1", key2: "value2" },
  { key: "opachki", key2: "value2" },
  { key: "value1", key2: "value2" },
];

function editArrValue(key, arr, newData) {
  const newArrObj = arrObj.map((item) => {
    if (arr.key == key) {
      return { ...item, ...newData };
    }
    return item;
  });

  return newArrObj;
}

const arrTest = [1, 2, 3, 4, 5];

const newArrTest = arrTest.map((item, i) => i ** 2);
console.log("arr", arrTest);
console.log("newArr", newArrTest);

changeDataArrInLocalStorage(
  "someKey",
  "3",
  "Rita Hayworth and The Shawshank Redemption"
);

// UPDATE function changeDataInLocalStorage(id, data, lcKey) {}

// inp.addEventListener("input", (e) => {
//   if (!e.target.value.trim()) {
//     return;
//   }
//   console.log(e.target.value);
//   localStorage.setItem("inputValue", e.target.value);
// });

function serverLive() {
  console.log("Log info");
  return serverLive();
}

// const test123 = someFunc();

// const aksjdkasd = test123("asdkasd");

// aksjdkasd();
