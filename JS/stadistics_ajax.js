var data;
var origins = [];
var paginaW = document.getElementById('nombre_pagina').value;
var chamber = document.getElementById('chamber').value;
var corte;
var stadistics = {
    numberR: 0,
    numberD: 0,
    numberI: 0,
    mediaVwPR: 0,
    mediaVwPD: 0,
    mediaVwPI: 0,

    miembrosMasVotos: [],
    miembrosMenosVotos: [],
    masVotosPerdidos: [],
    menosVotosPerdidos: [],
}
var maxVotos = [];
var minVotos = [];
var masPerdidos = [];
var menosPerdidos = [];

var cuerpoTabla2 = document.getElementById('cuerpoTablaTwo');
var cuerpoTabla3 = document.getElementById('cuerpoTablaThree');
var cuerpoTabla4 = document.getElementById('cuerpoTablaFour');
var cuerpoTabla5 = document.getElementById('cuerpoTablaFive');


if (paginaW == "Atendance") {

    if (chamber == "House") {
        fetch("https://api.propublica.org/congress/v1/113/house/members.json/", {
            method: "GET",
            headers: {
                'X-API-Key': "unHi1VHGrT803qlbAMqoYZhs4EE8pBC0H1mGrj47"
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

        }).then(function (json) {
            data = json;
            origins = data.results[0].members;

            quantity(origins, stadistics);
            overage(stadistics, origins);
            table(stadistics)

            masPerdidos = origins.slice();
            menosPerdidos = origins.slice();

            ordenacion(masPerdidos, menosPerdidos, 'missed_votes_pct');

            corte = Math.round(((origins.length) * 10 / 100));

            stadistics.masVotosPerdidos = masPerdidos.slice(0, percent(masPerdidos, "missed_votes_pct"));
            
            stadistics.menosVotosPerdidos = menosPerdidos.slice(0, percent(menosPerdidos, "missed_votes_pct"));

            tabla(stadistics.masVotosPerdidos, cuerpoTabla2, "missed_votes", "missed_votes_pct");
            tabla(stadistics.menosVotosPerdidos, cuerpoTabla3, "missed_votes", "missed_votes_pct");



        }).catch(function (error) {
            console.log("Request failed:" + error.message);
        });
    }

    if (chamber == "Senate") {
        fetch("https://api.propublica.org/congress/v1/113/senate/members.json/", {
            method: "GET",
            headers: {
                'X-API-Key': "unHi1VHGrT803qlbAMqoYZhs4EE8pBC0H1mGrj47"
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

        }).then(function (json) {
            data = json;
            origins = data.results[0].members;

            quantity(origins, stadistics);
            overage(stadistics, origins);
            table(stadistics)

            maxVotos = origins.slice();
            minVotos= origins.slice();

            ordenacion(maxVotos, minVotos, 'missed_votes_pct');

            corte = Math.round(((origins.length) * 10 / 100));

            stadistics.miembrosMasVotos = maxVotos.slice(0, percent(maxVotos, 'missed_votes_pct'));
            stadistics.miembrosMenosVotos = minVotos.slice(0, percent(minVotos, 'missed_votes_pct'));

            tabla(stadistics.miembrosMasVotos, cuerpoTabla2, "missed_votes", "missed_votes_pct");
            tabla(stadistics.miembrosMenosVotos, cuerpoTabla3, "missed_votes", "missed_votes_pct");

        }).catch(function (error) {
            console.log("Request failed:" + error.message);
        });

    }
}

if (paginaW == "Loyal") {
    if (chamber == "House") {
    
        fetch("https://api.propublica.org/congress/v1/113/house/members.json/", {
            method: "GET",
            headers: {
                'X-API-Key': "unHi1VHGrT803qlbAMqoYZhs4EE8pBC0H1mGrj47"
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

        }).then(function (json) {
            data = json;
            origins = data.results[0].members;

            quantity(origins, stadistics);
            overage(stadistics, origins);
            table(stadistics)

            masPerdidos = origins.slice();
            menosPerdidos = origins.slice();

            ordenacion(masPerdidos, menosPerdidos, 'votes_with_party_pct');

            corte = Math.round(((origins.length) * 10 / 100));

            stadistics.masVotosPerdidos = masPerdidos.slice(0, percent(masPerdidos, "votes_with_party_pct"));
            
            stadistics.menosVotosPerdidos = menosPerdidos.slice(0, percent(menosPerdidos, "votes_with_party_pct"));

            tabla(stadistics.masVotosPerdidos, cuerpoTabla4, "total_votes", "votes_with_party_pct");
            tabla(stadistics.menosVotosPerdidos, cuerpoTabla5, "total_votes", "votes_with_party_pct");



        }).catch(function (error) {
            console.log("Request failed:" + error.message);
        });
    }

    if (chamber == "Senate") {
        fetch("https://api.propublica.org/congress/v1/113/senate/members.json/", {
            method: "GET",
            headers: {
                'X-API-Key': "unHi1VHGrT803qlbAMqoYZhs4EE8pBC0H1mGrj47"
            }
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }

        }).then(function (json) {
            data = json;
            origins = data.results[0].members;

            quantity(origins, stadistics);
            overage(stadistics, origins);
            table(stadistics)

            maxVotos = origins.slice();
            minVotos= origins.slice();

            ordenacion(maxVotos, minVotos, 'votes_with_party_pct');

            corte = Math.round(((origins.length) * 10 / 100));

            stadistics.miembrosMasVotos = maxVotos.slice(0, percent(maxVotos, 'votes_with_party_pct'));
            stadistics.miembrosMenosVotos = minVotos.slice(0, percent(minVotos, 'votes_with_party_pct'));

            tabla(stadistics.miembrosMasVotos, cuerpoTabla4, "total_votes", "votes_with_party_pct");
            tabla(stadistics.miembrosMenosVotos, cuerpoTabla5, "total_votes", "votes_with_party_pct");

        }).catch(function (error) {
            console.log("Request failed:" + error.message);
        });

    }
}
 
function nombreCompleto(member) {
    if (member.middle_name == null) {
        return member.first_name + " " + member.last_name;
    } else {
        return member.first_name + " " + member.middle_name + " " + member.last_name;
    }
}


//funcion para sacar cantidad por partido--OK--funciona
function quantity(member, stadistics) {
    var Rep = [];
    var Dem = [];
    var Ind = [];
    for (let j = 0; j < member.length; j++) {
        if (member[j].party == "R") {
            Rep.push(member[j].party);
        }
        if (member[j].party == "D") {
            Dem.push(member[j].party);
        }
        if (member[j].party == "I") {
            Ind.push(member[j].party);
        }
    }
    console.log(numberR);
    stadistics.numberR = Rep.length;
    stadistics.numberD = Dem.length;
    stadistics.numberI = Ind.length;
    console.log(numberR)
    //    console.log(numberD)
    //    console.log(numberI)
}


//funcion para sacar promedio --OK--funciona
function overage(stadistics, origins) {
    console.log(stadistics, "overage")
    stadistics.mediaVwPR = (stadistics.numberR / origins.length * 100).toFixed(2);
    stadistics.mediaVwPD = (stadistics.numberD / origins.length * 100).toFixed(2);
    stadistics.mediaVwPI = (stadistics.numberI / origins.length * 100).toFixed(2);
    console.log(stadistics, "overage")

}

//creo 4 arrays vacias 
//var maxVotos = [];
//var minVotos = [];
//var masPerdidos = [];
//var menosPerdidos = [];

//clono las 4 arrays vacias
//maxVotos = origins.slice();
//minVotos = origins.slice();
//masPerdidos = origins.slice();
//menosPerdidos = origins.slice();

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


//calculo el 10% del total
//var corte = Math.round(((origins.length) * 10 / 100));


function percent(array, keyToSort) {
    for (var j = corte - 1; j < array.length; j++) {
        let jj = j + 1;
        if (array[j][keyToSort] != array[jj][keyToSort]) {
            return j + 1;
        }
    }
}
//percent(maxVotos, "votes_with_party_pct")


var colmOne = "";
var colmTwo = "";
var colmThree = "";

function tabla(members, cuerpoT, key1, key2) {
    for (let j = 0; j < members.length; j++) {

        interior(members[j], cuerpoT, key1, key2);

    }
}



function interior(member, cuerpoT, key1, key2) {
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

    colmTwo = document.createTextNode(member[key1]);
    colmThree = document.createTextNode(member[key2]);

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


function table(stadistics) {

    document.getElementById("numberR").innerHTML = stadistics.numberR;
    document.getElementById("numberD").innerHTML = stadistics.numberD;
    document.getElementById("numberI").innerHTML = stadistics.numberI;
    var numberT = stadistics.numberR + stadistics.numberD + stadistics.numberI;
    document.getElementById("numberT").innerHTML = numberT;

    document.getElementById("mediaR").innerHTML = stadistics.mediaVwPR;
    document.getElementById("mediaD").innerHTML = stadistics.mediaVwPD;
    document.getElementById("mediaI").innerHTML = stadistics.mediaVwPI;
}