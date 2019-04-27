// Get the modal
const details = document.querySelector(".det");
const close = document.querySelectorAll(".close");

const delet  = document.querySelector(".del");


console.log();


//get details buttons
const btn = document.getElementById("myBtn");
const btn1 = document.getElementById("frank");
const btn2 = document.getElementById("frank1");
const btn3 = document.getElementById("frank2");

//get delete buttons
const delBtn = document.getElementById("delBtn");


const span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
  details.showModal();
};

btn1.onclick = function () {
  details.showModal();
};
btn2.onclick = function() {
  details.showModal();
};

btn3.onclick = function() {
  details.showModal();
};


close[0].onclick = function() {
  details.close();
};

close[1].onclick = function () {
  delet.close();
};



delBtn.onclick = function () {
  delet.showModal();
};
