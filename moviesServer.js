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
    addMoviesFromServer(data);
  })
  .catch((err) => {
    console.error(err);
  });

function addMoviesFromServer(data) {
  data.forEach((movie) => {
    let createNewMovie = createTask(movie.title, movie.id, movie.status);
    globalTasks.append(createNewMovie);
  });
}

function createTask(task, id, status) {
  const newElement = new TaskElement(task);

  function taskAddEventListeners(newElement, id, status) {
    const newCheckBox = newElement.querySelector(".bar");
    const newTodoText = newElement.querySelector(".todo-text");
    const newTrashBtn = newElement.querySelector(".trash");
    let newId = id;
    newCheckBox.checked = status;

    if (newCheckBox.checked) {
      newTodoText.classList.add("todo-text_through");
    }

    newCheckBox.addEventListener("change", (e) => {
      e.preventDefault();
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

    newTrashBtn.addEventListener("click", (e) => removeTask(e));

    function removeTask(e) {
      const taskEl = e.target.closest(".task");

      if (taskEl) {
        arrFromLs = arrFromLs.filter((item) => item.id !== newId);
        taskEl.remove();
        localStorage.setItem("tasks", JSON.stringify(arrFromLs));

        fetch(`${url}/movies/${newId}`, {
          method: "DELETE",
          body: JSON.stringify(),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  }

  taskAddEventListeners(newElement, id, status);
  return newElement;
}

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
    fetch(`${url}/movies`, {
      method: "POST",
      body: JSON.stringify({
        status: false,
        title: String(input.value),
        id: String(newId),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  localStorage.setItem("tasks", JSON.stringify(arrFromLs));

  input.value = "";
});

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

function setTasks() {
  globalTasks.innerHTML = "";
  arrFromLs.forEach(({ title, id, status }) => {
    globalTasks.append(createTask(title, id, status));
  });
}

const renderMovies = (status = null) => {
  globalTasks.innerHTML = "";
  arrFromLs
    .filter((item) => status === null || item.status === status)
    .forEach(({ title, id, status }) =>
      globalTasks.append(createTask(title, id, status))
    );
};
doneButton.addEventListener("click", () => renderMovies(true));

notDoneButton.addEventListener("click", () => renderMovies(false));

allButton.addEventListener("click", () => renderMovies());
