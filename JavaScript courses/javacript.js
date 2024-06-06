//This is just to keep example of JS script
var myImage = document.getElementById("Malaysia");
console.log(myImage);

var para = document.getElementByClassName("intro");
var content = para.innerHTML;
console.log(content);

var mainTitle = document.getElementById("mainTitle");
console.log("This is an element of type: ", mainTitle.nodeType);
console.log("The inner HTML is ", mainTitle.innerHTML);
console.log("There are this many child objects ", mainTitle.childNodes);

var myLinks = document.getElementByTagName("a");
console.log(myLinks.length);

document.getElementByClassName("class").innerHTML;

//This is to change an HTML element to the following:
document.getElementById("mainTitle").innerHTML = "This is why you should travel with us!"

var align = mainTitle.getAttribute("align");
console.log(align);

//Changing DOM - aligning a div/text right
document.getElementById("customer1").setAttribute("align", "right");

//Changing DOM - aligning a div/text left
document.getElementById("customer1").setAttribute("align", "left");

//You can do few attributes in the same time with the same id
document.getElementById("China").setAttribute("src", "images/japan.jpg"); //changing images
document.getElementById("China").setAttribute("alt", "picture of China") //adding alt

//Makes the title changes to green color
document.getElementById("intro").style.color = "green";

//Gives a background color
document.getElementById("intro").style.backgroundColor = "yellow";

//Change the font Family
document.getElementById("intro").style.fontFamily = "Times New Roman";

//Here you can use dash because it is between paratheses so JavaScript knows it is not minus
document.getElementById("intro").setAttribute("style", "font-weight : bold");

//Creating an element on the DOM
var myListItem = document.createElement("li");//creating a list item
var myTextNode = document.createTextNode("The Hobbit");//creating the text node that's gonna have the content you want to add
myListItem.appendChild(myTextNode);//link both - text node + list item
var books = document.getElementById("books");//that's locating the text in the DOM
books.appendChild(myListItem);//make it appear on the list

myElement.insertBefore(para, child); //specify where you want to put the text

document.getElementById("mainTitle").onclick = function () {
    alert("Hello World")
};

//third option Event Listener
document.getElementById("mainTitle").addEventListener("click", function () {
    alert("Hello World");
} );

document.getElementById("mainTitle").addEventListener("mouseover", function () {
    alert("Hello again");
} );

//Event Mouseover me
function mouseover(obj) {
    obj.innerHTML = "Mouse over Me"
}

//Set time to display message
function simpleMessage () {
    alert("This is a simple alert box")
}

setTimeout(simpleMessage, 5000); //wait a certain amount of time before to display

//Set up a bunch of pictures to show one by one
var myImage = document.getElementById("Malaysia");
var imageArray = ["images/malaysia.jpg" , "images/malaysia2.jpg" , "images/malaysia3.jpg" , "images/malaysia4.jpg"];
var imageIndex = 0;
function changeImage () {
    myImage.setAttribute("src", imageArray[imageIndex]);
    imageIndex++;
    if (imageIndex >= imageArray.length){ //this is to set it up in circle and start again at the end
        imageIndex = 0;
    }
}

setInterval(changeImage, 5000);

//no JQuery
function myFunction() {
    var obj = document.getElementById("h01");
    obj.innerHTML = "Hello JQuery";
}

//with JQuery - changing the title 
function myFunction () {
    $("#h01").html("Hello Jquery");
}

$(document).ready(myFunction);

//with JQuery example 2 - changing the title color to red
function myFunction () {
    $ ("#firsth2").attr("style", "color:red").html("Hello jQuery")
}

//to hide a paragraph when you click on a button
$(document).ready(function () {
    $("button").click(function () {
        $("p").hide ();
    })
})

//make clickable button
$("#btn1").click (function () {
    alert ("Text: " + $("#test").text () );
});

$("btn2").click (function() {
    alert("HTML: " + $("#test").html ());
});

//make more clickable buttons
$(document).ready(function () {
    $("#btn1").click(function () {
        $("#test1").text("Hello World!");
    }) //button 1, change text to Hello World

$("#btn2").click(function () {
    $("#test2").html("<b>Hello World!</b>");
}); //button 2 put the Hello World in bold

$("#btn3").click (function () {
    $("#test3").val("Donal Duck");
}); //button 3 modify the value to Donald Duck

});

//Append Text with 3 different methods
function appendText() {
    var txt1 = "<p>This is text along with html markup</p>";//create text with HTML
    var txt2 = $("<p></p>").text("This is text.");//method of creating text with jQuery
    var txt3 = document.createElement("p");
    text3.innerHTML = "Text created using the DOM"; //Create text with the DOM
    $("body").append(txt1, txt2, txt2); //Append new elements
}

//remove some HTML elements
$(document).ready(function () {
    $("button").click(function () {
        $("#div1").remove();
    })
})

//code an animation with jQuery
$(document).ready(function() {
    $("button").click(function() {
        $("div").animate({left:'250'});
    })
})