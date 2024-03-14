const allButon = document.querySelector(".all");
const doneButon = document.querySelector(".done");
const notDoneButon = document.querySelector(".notDone");

const inp = document.querySelector(".input");

const check = document.querySelector(".bar");

allButon.addEventListener("click", () => {
  inp.value ? console.log("all") : console.log("allEmpty");
});

doneButon.addEventListener("click", () => {
  inp.value ? console.log("done") : console.log("doneEmpty");
  const newElement = document.createElement('div');
});

notDoneButon.addEventListener("click", () => {
  inp.value ? console.log("notDone") : console.log("notDoneEmpty");
});

check.addEventListener("change", () => console.log("check"));
