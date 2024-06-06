//Create an array inside a function and call that function on window load
const myNumbers = function() {
    const myArray = ["One 1", "Two 2", "Three 3", "Four 4", "Five 5", "Six 6", "Seven 7", "Eight 8", "Nine 9", "Ten 10"];

    //console.log(myArray[2]);
    //console.log(myArray[4]);

    //Get the random number to pick in your array
    let arrayIndex = Math.floor(Math.random() * myArray.length);

    document.getElementById('text').innerHTML = myArray[arrayIndex];
}

//Create the on click random number
window.onload = function() {
    myNumbers();
    document.getElementById("button").addEventListener('click', myNumbers);
}

