function myFunction() {
    var x = document.getElementById("frm1");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value + "<br>";
    }
    document.getElementById("formatinfo").innerHTML = text;
}
function myFunction2() {
    var x = document.getElementById("firstname");
    var text = "";
    }
    document.getElementById("firstn").innerHTML = text;
}
