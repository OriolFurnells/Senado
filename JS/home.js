document.getElementById("ocultacion").style.display="none";

function expand() {
    if (document.getElementById("expand").innerHTML == "Expand") {
        document.getElementById("expand").innerHTML = "Contract";
        document.getElementById("ocultacion").style.display="block";
        
    } else {
        document.getElementById("expand").innerHTML = "Expand";
        document.getElementById("ocultacion").style.display="none";
    }
}




