//Hide and unhide text
var myPT = document.getElementById("PT");
var display = 0;

function hideShow1() {
    if (display == 1) {
        myPT.style.display = 'none';
        display = 0;
        fArrow.style.transform = 'rotate(360deg)';
        first.style.color = 'black';
    } else { 
        myPT.style.display = 'block';
        display = 1;
        fArrow.style.transform = 'rotate(90deg)';
        first.style.color = '#775555';
    }
}

document.getElementById("first").onclick = hideShow1;


//Second Project
var myCompany = document.getElementById("Company");
var display = 0;
function hideShow2() {
    if (display == 1) {
        myCompany.style.display = 'none';
        display = 0;
        sArrow.style.transform = 'rotate(360deg)';
        second.style.color = 'black';
    } else {
        myCompany.style.display = 'block';
        display = 1;
        sArrow.style.transform = 'rotate(90deg)';
        second.style.color = '#775555';
    }
}
document.getElementById("second").onclick = hideShow2;


//Third Project
var myTea = document.getElementById("Tea");
var display = 0;
function hideShow3() {
    if (display == 1) {
        myTea.style.display = 'none';
        display = 0;
        tArrow.style.transform = 'rotate(360deg)';
        third.style.color = 'black';
    } else {
        myTea.style.display = 'block';
        display = 1;
        tArrow.style.transform = 'rotate(90deg)';
        third.style.color = '#775555';
    }
}
document.getElementById("third").onclick = hideShow3;
