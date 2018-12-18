var origins = data.results[0].members;

function nombreCompleto(member) {
    if (member.middle_name == null) {
        return member.first_name + " " + member.last_name;
    } else {
        return member.first_name + " " + member.middle_name + " " + member.last_name;
    }
}
    
var stadistics = {
    //tabla 1
    numberR: 0,
    numberD: 0,
    numberI: 0,
    mediaVwPR: 0,
    mediaVwPD: 0,
    mediaVwPI: 0,

    //tabla 2 pag 1
    miembrosMasVotos: [],
    //tabla 3 pag 1
    miembrosMenosVotos: [],
    //tabla 2 pag 2
    masVotosPerdidos: [],
    //tabla 3 pag 2
    menosVotosPerdidos: [],
}

//funcion para sacar cantidad por partido--OK--funciona
function quantity() {
    var Rep = [];
    var Dem = [];
    var Ind = [];
    for (let j = 0; j < origins.length; j++) {
        if (origins[j].party == "R") {
            Rep.push(origins[j].party);
        }
        if (origins[j].party == "D") {
            Dem.push(origins[j].party);
        }
        if (origins[j].party == "I") {
            Ind.push(origins[j].party);
        }
    }
    stadistics.numberR = Rep.length;
    stadistics.numberD = Dem.length;
    stadistics.numberI = Ind.length;
}
quantity();


//funcion para sacar promedio --OK--funciona
function overage() {
    stadistics.mediaVwPR = (stadistics.numberR / origins.length * 100).toFixed(2);
    stadistics.mediaVwPD = (stadistics.numberD / origins.length * 100).toFixed(2);
    stadistics.mediaVwPI = (stadistics.numberI / origins.length * 100).toFixed(2);
}
overage();

//creo 4 arrays vacias 
var maxVotos = [];
var minVotos = [];
var masPerdidos = [];
var menosPerdidos = [];

//clono las 4 arrays vacias
maxVotos = origins.slice();
minVotos = origins.slice();
masPerdidos = origins.slice();
menosPerdidos = origins.slice();

//funcion de ordenacion doble por parametros, incluido la key --OK-- funciona
function ordenacion(array, array2, keyToSort) {
    //primero me compara el max de la array con el parametro establecido en el keyToSort = key de jason
    array.sort(function (a, b) {
        if (a[keyToSort] > b[keyToSort]) {
            return -1;
        }
    })

    array2.sort(function (a, b) {
        if (a[keyToSort] < b[keyToSort]) {
            return -1;
        }
    })
}
//llamo a la funcion de ordenacion y ordeno las arrays correctamente;
ordenacion(maxVotos, minVotos, "votes_with_party_pct");
ordenacion(masPerdidos, menosPerdidos, "missed_votes_pct");

//calculo el 10% del total
var corte = Math.round(((origins.length) * 10 / 100));


function percent(array, keyToSort) {
    for (var j = corte-1; j < array.length; j++) {
        let jj = j + 1;
        if (array[j][keyToSort] != array[jj][keyToSort]) {
            return j +1;
        }
    }
}
percent(maxVotos, "votes_with_party_pct")

stadistics.miembrosMasVotos = maxVotos.slice(0, percent(maxVotos, "votes_with_party_pct"));
stadistics.miembrosMenosVotos = minVotos.slice(0, percent(minVotos, "votes_with_party_pct"));
stadistics.masVotosPerdidos = masPerdidos.slice(0, percent(masPerdidos, "missed_votes_pct"));

stadistics.menosVotosPerdidos = menosPerdidos.slice(0, percent(menosPerdidos, "missed_votes_pct"));

var colmOne = "";
var colmTwo = "";
var colmThree = "";

function tabla(members,cuerpoT) {
    for (let j = 0; j < members.length; j++) {
        interior(members[j],cuerpoT);
    }
}


var paginaW = document.getElementById('nombre_pagina').value;


if(paginaW=="Atendance"){
//    console.log("estoy en LOYAL")
var cuerpoTabla2 = document.getElementById('cuerpoTablaTwo');
var cuerpoTabla3 = document.getElementById('cuerpoTablaThree');
tabla(stadistics.masVotosPerdidos,cuerpoTabla2);
tabla(stadistics.menosVotosPerdidos,cuerpoTabla3);
}

if(paginaW=="Loyal"){
var cuerpoTabla4 = document.getElementById('cuerpoTablaFour');
var cuerpoTabla5 = document.getElementById('cuerpoTablaFive');
//    console.log("estoy en ATTENDANCE")
tabla(stadistics.miembrosMasVotos,cuerpoTabla4);
tabla(stadistics.miembrosMenosVotos,cuerpoTabla5);
}


function interior(member,cuerpoT) {
    var fila = document.createElement('tr');
    var columna = document.createElement('td');
    var columnaDos = document.createElement('td');
    var columnaTres = document.createElement('td');
    //crea elemento a para enlace
    var aElement = document.createElement('a');
    //asocia el elemento anterior a la columna de url del "jason"
    aElement.setAttribute("href", member.url);
    //añade el texto al href anterior ya creado con el enlace
    aElement.innerHTML = nombreCompleto(member);

    colmTwo = document.createTextNode(member.missed_votes);
    colmThree = document.createTextNode(member.missed_votes_pct);

    columna.appendChild(aElement);
    fila.appendChild(columna);
    columnaDos.appendChild(colmTwo);
    fila.appendChild(columnaDos);
    columnaTres.appendChild(colmThree);
    fila.appendChild(columnaTres);
    
    cuerpoT.appendChild(fila);
}

//interior(stadistics.masVotosPerdidos,cuerpoTabla2);
//interior(stadistics.menosVotosPerdidos,cuerpoTabla3);

document.getElementById("numberR").innerHTML =stadistics.numberR;
document.getElementById("numberD").innerHTML =stadistics.numberD;
document.getElementById("numberI").innerHTML =stadistics.numberI;
var numberT=stadistics.numberR+stadistics.numberD+stadistics.numberI;
document.getElementById("numberT").innerHTML =numberT;

document.getElementById("mediaR").innerHTML =stadistics.mediaVwPR;
document.getElementById("mediaD").innerHTML =stadistics.mediaVwPD;
document.getElementById("mediaI").innerHTML =stadistics.mediaVwPI;


