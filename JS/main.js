var origins = data.results[0].members;
//funcion con parametros para crear lista de nombres

function nombreCompleto(member) {
    if (member.middle_name == null) {
        return member.first_name + " " + member.last_name;
    } else {
        return member.first_name + " " + member.middle_name + " " + member.last_name;
    }
}

var cuerpoTabla = document.getElementById('cuerpoTabla');
var colmOne = "";
var colmTwo = "";
var colmThree = "";
var colmFour = "";
var colmFive = "";

function tabla() {
    for (let j = 0; j < origins.length; j++) {
        interior(origins[j]);
    }
}
tabla();

//creamos el interior del a tabla 
function interior(member) {
    var fila = document.createElement('tr');
    var columna = document.createElement('td');
    var columnaDos = document.createElement('td');
    var columnaTres = document.createElement('td');
    var columnaCuatro = document.createElement('td');
    var columnaCinco = document.createElement('td');
    //crea elemento a para enlace
    var aElement = document.createElement('a');
    //asocia el elemento anterior a la columna de url del "jason"
    aElement.setAttribute("href", member.url);
    //añade el texto al href anterior ya creado con el enlace
    aElement.innerHTML = nombreCompleto(member);

    colmTwo = document.createTextNode(member.party);
    colmThree = document.createTextNode(member.state);
    colmFour = document.createTextNode(member.seniority);
    colmFive = document.createTextNode(member.votes_with_party_pct);

    //console.log(aElement);
    columna.appendChild(aElement);
    fila.appendChild(columna);
    columnaDos.appendChild(colmTwo);
    fila.appendChild(columnaDos);
    columnaTres.appendChild(colmThree);
    fila.appendChild(columnaTres);
    columnaCuatro.appendChild(colmFour);
    fila.appendChild(columnaCuatro);
    columnaCinco.appendChild(colmFive);
    fila.appendChild(columnaCinco);

    cuerpoTabla.appendChild(fila);
}

var R = document.getElementById("R")
var D = document.getElementById("D")
var I = document.getElementById("I")

//filtro
function filtroPartido() {
    cuerpoTabla.innerHTML = "";
    if (R.checked == true) {
        for (let j = 0; j < origins.length; j++) {
            var Rep = (origins[j].party == "R");
            if (Rep == true) {
                interior(origins[j]);
            }
        }
    }
    if (D.checked == true) {
        for (let j = 0; j < origins.length; j++) {
            var Dem = (origins[j].party == "D");
            if (Dem == true) {
                interior(origins[j]);
            }
        }
    }
    if (I.checked == true) {
        for (let j = 0; j < origins.length; j++) {
            var Ind = (origins[j].party == "I");
            if (Ind == true) {
                interior(origins[j]);
            }
        }
    } else {
        tabla();
    }
}

var select = document.getElementById('select');
var states = [];
for (let j = 0; j < origins.length; j++) {
    states.push(origins[j].state);
}

var selected = [];

states.sort();

for (let h = 0; h < states.length; h++) {
    if (selected.indexOf(states[h]) == -1) {
        selected.push(states[h])
    }
}
//console.log(selected);

function createSelect() {
    for (let h = 0; h < selected.length; h++) {
        var option = document.createElement('option');
        var opciones = document.createTextNode(selected[h])
        option.appendChild(opciones);
        select.appendChild(option);
    }
}

createSelect();


function estat() {

    var election = document.getElementById("select").value;
    cuerpoTabla.innerHTML = "";
    for (let j = 0; j < origins.length; j++) {
        //        console.log("hola");
        var Sta = (origins[j].state === election);
        console.log(Sta);
        if (Sta == true) {
            console.log("hola2");
            interior(origins[j]);
          
        }

    }
}


function filtroDoble() {
    cuerpoTabla.innerHTML = "";
    var election = document.getElementById("select").value;
    cuerpoTabla.innerHTML = "";
    for (let j = 0; j < origins.length; j++) {
        var Rep = (origins[j].party == "R");
        var Dem = (origins[j].party == "D");
        var Ind = (origins[j].party == "I");

        var Sta = (origins[j].state === election);

        if (Sta == true) {

            if (R.checked == true && Rep == true) {
                interior(origins[j]);
                console.log("hi Republicans true");
            }

            if (D.checked == true && Dem == true) {
                //            cuerpoTabla.innerHTML = "";
                interior(origins[j]);
                console.log("hi Democrats true");

            }
            if (I.checked == true && Ind == true) {
                //            cuerpoTabla.innerHTML = "";
                interior(origins[j]);
                console.log("hi Independents true");
            }

            if (I.checked == false && R.checked == false && D.checked == false) {
                interior(origins[j])
            }
            //            if (I.checked == true & Ind == false) {var fila = document.createElement('tr');
            //                var texto =  document.createTextNode("No members this party in this country");
            //                fila.appendChild(texto);
            //                cuerpoTabla.appendChild(fila);
            //                
            //                    }
        } else if (election == 'Choose a state...') {

            if (R.checked == true && Rep == true) {
                interior(origins[j]);
                console.log("hi Republicans f");
            }
            if (D.checked == true && Dem == true) {
                //            cuerpoTabla.innerHTML = "";
                interior(origins[j]);
                console.log("hi Democrats f");
            }
            if (I.checked == true && Ind == true) {
                //            cuerpoTabla.innerHTML = "";
                interior(origins[j]);
                console.log("hi Independents f");

            }
            if (I.checked == false && R.checked == false && D.checked == false) {
                interior(origins[j])
            }
        }
    }
}