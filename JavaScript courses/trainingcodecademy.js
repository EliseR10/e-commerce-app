//String Interpolation
let myName = 'Elise';
let myCity = 'Edinburgh';
console.log(`My name is ${myName} and I live in ${myCity}`);

//Type of
let myTypeOf = 'Elise';
console.log(typeof myTypeOf);

//If, else if statement
var a = 2;
var b = 5;

if (a > b) {
    console.log("you managed to do if statement");
} else if (a = b) {
    console.log("this should print, otherwise...")
} else {
    console.log("This will print");
}

//Logical operators
if (stopLight === 'green' && pedestrians === 0){ //Needs to have both conditions true
    console.log('Go!');
} else {
    console.log('Stop');
}

if (day === 'Saturday' || day === 'Sunday') { //Here only 1 on 2 conditions needs to be true
    console.log('Enjoy the week-end');
} else {
    console.log('Go to work');
}

let excited = true;
console.log(!excited); //this should print false

let sleepy = false;
console.log(!sleepy); // this should print true

//Truthy and falsy assignment
let userName = '';
let defaultName;

if (userName) {
    defaultName = userName;
} else {
    defaultName = 'Stranger';
}

//Combine logical operators + truthy value
let lastName = '';
let defaultLast = lastName || 'Stranger'; //choose between the true one
//refered as short-circuit evaluation

//Ternary Operator
let isNightTime = true;

if (isNightTime) {
    console.log('Turn on the lights!');
} else {
    console.log('Turn off the lights!');
}

//Short-hand - simplify the if/else statement to:
isNightTime ? console.log('Turn on the lights') : console.log('Turn off the lights');

//Check if the condition is true 
walkSignal === 'Walk' ? console.log('You may walk!') : console.log('Do not walk!');

//Switch statement
let groceryItem = 'papaya';

switch (groceryItem) {
    case 'tomato':
        console.log('Tomatos are $0.49');
        break;
    case 'lime':
        console.log('Limes are $1.49');
        break;
    case 'papaya':
        console.log('Papaya are $1.29');
        break;
    default:
        console.log('Invalid item');
        break;
}

//Functions with parameters - you can reuse it for everything
function myFunction(width, height){
    console.log(width * height);
}

//Parameters to use as variable in the body
function sayThanks(name) {
    console.log('Thank you for your purchase '+ name + '!');
}

sayThanks('Elise')

//Default parameters
function greeting (name = 'Mr and Mrs'){
    console.log(`Hello, ${name}!`);
}

greeting ('Nick') //this will replace the default name/parameters
greeting() //This will be filled in by the default name/parameters

//Return
function myFunction1(width, height){
    const area = width * height;
    return area; //otherwise you don't have return
    //if we use return keyword in a function body, the function is stopped
    //and the code that follows won't be executed
}
//You can put the produced result in a variable to keep for later use.

//Helper functions
function monitorCount(rows, columns) {
    return rows * columns;
}

function costOfMonitors(rows, columns) {
    return monitorCount(rows, columns) * 200;
}

const totalCost = costOfMonitors(5,4); //save the cost in a variable
console.log(totalCost);

//Function Expressions
const calculateArea = function(width, height) {
    const area = width * height;
    return area;
} //here the variable is identifying your function

//to call that function:
variableName(argument1, argument2)

//Arrow Function - shorter way of declaring function
const calculateArea2 = (width, height) => {
    const area = width * height;
    return area;
}

//Concise Body Arrow Function - the most condensed form of function
//zero parameters - use ()
const functionName = () => {

}

//one parameter - no need of ()
const functionName2 = paramOne => {

}

//two or more parameters - use ()
const functionName3 = (paramOne, paramTwo) => {

}

//for single line code: no need of {} and no need of return keyword:
const sumNumbers = numbers => number + number;

//for multi-line block:
const sumNumbers2 = number => {
    const sum = number + number;
    return sum;
}