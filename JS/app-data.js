    var app = new Vue({
    	el: '#app',

    	data: {
    		chamber: document.getElementById('chamber').value,			
			selections:[],
    		infoWeb: "",
    		origins: [],
    		filter: [],
			filterMembers : this.origins,
    		selected: "Choose a state...",
    		messageNoPeople: "No hay miembros en este estado",
    		states: [],
    		Sta: [],
    		election: "Choose a state...",
    		noPeople: false,
    		loader: true,

    	},
    	created: function () {
    		this.start();
    	},
    	methods: {
    		start: function () {
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
    				app.estados();
					app.filterDouble();
				}).catch(function (error) {
    				console.log("Request failed:" + error.message);
    			})
    		},

			
    		estados: function () {
				let allStates=[];
				for(let j = 0; j < app.origins.length; j++){
					allStates = app.origins[j].state;
					if(!app.states.includes(allStates)){
						app.states.push(allStates);
					}
				}

    		},
			
			filterDouble(){
				let stateFilter = document.getElementById("select").value;
				//app.filterMembers=app.origins.filter(member => app.election == stateFilter ? true : member.state == stateFilter);

				app.filterMembers = 
					(app.selections.length > 0
					 ? app.origins.filter(member => app.selections.includes(member.party))
					 : app.origins)
					.filter(member => app.election == stateFilter ? true : member.state == stateFilter);
			},
			
			
    	}

    });