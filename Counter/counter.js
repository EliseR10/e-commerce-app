// set initial count
let count = 0;

// select value and buttons
const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
    btn.addEventListener("click", function(e) {
       const styles = e.currentTarget.classList;
       if (styles.contains('decrease')) { //looking for style with decrease class
        count--;
       }
       else if (styles.contains("increase")) { //looking for style with increase class
        count ++;
       }
       else {
        count = 0;
       }
       if (count > 0) {
        value.style.color = "green"; //set the color to green if the count is greater than 0
       }

       if (count < 0) {
        value.style.color = "red"; //set the color to red if the count if less than 0
       }

       if (count === 0) {
        value.style.color = "black"; //set the color to black if the count is = 0
       }
       value.textContent = count;
    });
});
