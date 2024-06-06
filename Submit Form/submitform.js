//get the total depending of the input entered
function zukini() {
    var num1 = parseInt(document.getElementById("quantity").value);
    var num2 = parseFloat(document.getElementById("unitprice").value).toFixed(2); //to multiply by decimals
    document.getElementById("total").value = "£" + ((num1 * num2).toFixed(2)); //.toFixed(2) to get two decimals & "£" to add the sign
}

let one = zukini();

function tomato() {
    var num1 = parseInt(document.getElementById("quantitytomato").value);
    var num2 = parseFloat(document.getElementById("unitpricetomato").value).toFixed(2); //to multiply by decimals
    document.getElementById("totaltomato").value = "£" + ((num1 * num2).toFixed(2)); //.toFixed(2) to get two decimals & "£" to add the sign
}

let two = tomato();

function potatoe() {
    var num1 = parseInt(document.getElementById("quantitypotatoe").value);
    var num2 = parseFloat(document.getElementById("unitpricepotatoe").value).toFixed(2); //to multiply by decimals
    document.getElementById("totalpotatoe").value = "£" + ((num1 * num2).toFixed(2)); //.toFixed(2) to get two decimals & "£" to add the sign
}

let three = potatoe();

function sweet() {
    var num1 = parseInt(document.getElementById("quantitysweet").value);
    var num2 = parseFloat(document.getElementById("unitpricesweet").value).toFixed(2); //to multiply by decimals
    document.getElementById("totalsweet").value = "£" + ((num1 * num2).toFixed(2)); //.toFixed(2) to get two decimals & "£" to add the sign
}

let four = sweet();


//get the total of the total per line - NOT WORKING
function total() {
    /*var num1 = parseFloat(document.getElementById("total"));
    var num2 = parseFloat(document.getElementById("totaltomato"));
    var num3 = parseFloat(document.getElementById("totalpotatoe"));
    var num4 = parseFloat(document.getElementById("totalsweet"));*/
    document.getElementById("finaltotal").value = (one + two + three + four).toFixed(2);
}   

//Alert box with a recap of the total
function result() {
    var num5 = document.getElementById("finaltotal").value;
    alert("Thank you for your order! Your total is" + " " + num5);
} 


