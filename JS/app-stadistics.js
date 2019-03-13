var app = new Vue({
	el: '#app',

	data: {
		paginaW: document.getElementById('nombre_pagina').value,
		chamber: document.getElementById('chamber').value,
		corte: 0,
		infoWeb: "",
		origins: [],

		//table1
		numberR: 0,
		numberD: 0,
		numberI: 0,
		mediaVwPR: 0,
		mediaVwPD: 0,
		mediaVwPI: 0,

		//table 2
		miembrosMasVotos: [],
		//table 3
		miembrosMenosVotos: [],

		//table 4
		menosVotosPerdidos: [],
		//table 5
		masVotosPerdidos: [],

		maxVotos: [],
		minVotos: [],

		masPerdidos: [],
		menosPerdidos: [],
		loader: true,

	},
	created: function () {
		this.runPage();
	},

	methods: {
		runPage: function () {
			if (this.paginaW == "Loyal") {
				fetch("https://api.propublica.org/congress/v1/113/" + this.chamber + "/members.json/", {
					method: "GET",
					headers: {
						'X-API-Key': "unHi1VHGrT803qlbAMqoYZhs4EE8pBC0H1mGrj47"
					}
				}).then(function (response) {
					if (response.ok) {
						return response.json();
					}
				}).then(function (json) {
					app.infoWeb = json;
					app.loader = false;
					app.origins = app.infoWeb.results[0].members;
					app.quantity(app.origins, "numberR", "numberD", "numberI");
					app.overage(app.numberR, app.numberD, app.numberI, app.origins);
					app.masPerdidos = app.origins.slice();
					app.menosPerdidos = app.origins.slice();
					app.ordenacion(app.masPerdidos, app.menosPerdidos, 'votes_with_party_pct');
					app.corte = Math.round(((app.origins.length) * 10 / 100));
					app.masVotosPerdidos = app.masPerdidos.slice(0, app.percent(app.masPerdidos, 'votes_with_party_pct'));
					app.menosVotosPerdidos = app.menosPerdidos.slice(0, app.percent(app.menosPerdidos, 'votes_with_party_pct'));
				}).catch(function (error) {
					console.log("Request failed:" + error.message);
				})
			}
			if (this.paginaW == "Attendance") {
				fetch("https://api.propublica.org/congress/v1/113/" + this.chamber + "/members.json/", {
					method: "GET",
					headers: {
						'X-API-Key': "unHi1VHGrT803qlbAMqoYZhs4EE8pBC0H1mGrj47"
					}
				}).then(function (response) {
					if (response.ok) {
						return response.json();
					}
				}).then(function (json) {
					app.infoWeb = json;
					app.loader = false;
					app.origins = app.infoWeb.results[0].members;
					app.quantity(app.origins, "numberR", "numberD", "numberI");
					app.overage(app.numberR, app.numberD, app.numberI, app.origins);
					app.maxVotos = app.origins.slice();
					app.minVotos = app.origins.slice();
					app.ordenacion(app.maxVotos, app.minVotos, 'missed_votes_pct');
					app.corte = Math.round(((app.origins.length) * 10 / 100));
					app.miembrosMasVotos = app.maxVotos.slice(0, app.percent(app.maxVotos, 'missed_votes_pct'));
					app.miembrosMenosVotos = app.minVotos.slice(0, app.percent(app.maxVotos, 'missed_votes_pct'));
				}).catch(function (error) {
					console.log("Request failed:" + error.message);
				})
			}


		},
		//funcion para sacar cantidad por partido--OK--funciona
		quantity: function (member, R, D, I) {
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
			this[R] = Rep.length;
			this[D] = Dem.length;
			this[I] = Ind.length;
		},


		//funcion para sacar promedio --OK--funciona
		overage: function (numberR, numberD, numberI, member) {
			app.mediaVwPR = (numberR / member.length * 100).toFixed(2);
			app.mediaVwPD = (numberD / member.length * 100).toFixed(2);
			app.mediaVwPI = (numberI / member.length * 100).toFixed(2);
		},


		//funcion de ordenacion doble por parametros, incluido la key --OK-- funciona

		ordenacion: function (array, array2, keyToSort) {
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
		},


		percent: function (array, keyToSort) {
			for (var j = app.corte - 1; j < array.length; j++) {
				let jj = j + 1;
				if (array[j][keyToSort] != array[jj][keyToSort]) {
					return j + 1;
				}
			}
		},

	}
});