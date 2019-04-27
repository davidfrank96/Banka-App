// Get the modal
const modal = document.querySelector("dialog");
const close = document.querySelector(".close");

console.log();


const btn = document.getElementById("myBtn");
const btn1 = document.getElementById("frank");
const btn2 = document.getElementById("frank1");
const btn3 = document.getElementById("frank2");

const span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  modal.showModal();
};

btn1.onclick = function () {
    modal.showModal();
};
btn2.onclick = function() {
  modal.showModal();
};

btn3.onclick = function() {
  modal.showModal();
};



close.onclick = function() {
  modal.close();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.close();
  }
};
