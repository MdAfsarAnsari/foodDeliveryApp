let box = document.getElementById("box");

let colors = ["blue", "red", "green", "purple"];
let index = 0;

box.addEventListener("click", () => {
  box.classList.remove(colors[index]);
  index = (index + 1) % colors.length;
  box.classList.add(colors[index]);
});