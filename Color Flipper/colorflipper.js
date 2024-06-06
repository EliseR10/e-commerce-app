//Simple - how to create 4 colors and turn around when you click
const colors = ["green", "red", "rgba(133,122,200)","#f15025"];
const btn = document.getElementById("btn");
const color = document.querySelector(".color");

btn.addEventListener("click", function () {
   //get random number between 0 - 3 (to get all the arrays items)
   const randomNumber = getRandomNumber();
   document.body.style.backgroundColor = colors[randomNumber];
   color.textContent = colors[randomNumber]; 
});

//generate a function that get random numbers between 0 - 3
function getRandomNumber(){
   return Math.floor(Math.random() * colors.length);
}
//This Math.floor is to round up to the nearest integer not to get 0.01 etc