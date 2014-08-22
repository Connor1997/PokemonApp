var fs = require('fs');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
	var pokemons;
	var moves;
	function loadPokemon(path){
		var file = path;
		 
		fs.readFile(file, 'utf8', function (err, data) {
		  if (err) {
		    console.dir(err.stack);
		    return;
		  };
		 
		  pokemons = JSON.parse(data);
		  console.log("done loading pokemons.json");
		  createPokemons();
		});
	};
	console.log("loading pokemons.json");
	loadPokemon("../app/scripts/pokemons.json");


	function loadMoves(path){
		var file = path;
		 
		fs.readFile(file, 'utf8', function (err, data) {
		  if (err) {
		    console.dir(err.stack);
		    return;
		  };
		 
		  moves = JSON.parse(data);
		  console.log("done loading moves.json");
		  createMoves();
		});
	};
	console.log("loading moves.json");
	loadMoves("../app/scripts/moves.json");

	var moveSchema = mongoose.Schema({
		name: String,
		power: Number,
		accuracy: Number,
		category: String,
		description: String,
		pp: Number,
	});

	var pokemonSchema = mongoose.Schema({
	    name: String,
	    type: [{ name: String }],
	    natId: String,
	    stats: [{
	    	hp: Number,
	    	atk: Number,
	    	def: Number,
	    	spa: Number,
	    	spd: Number,
	    	spe: Number
	    }],
	    moves: [{ name: String, method: String }],
	    abilities: [{ name: String }]
	});

	function createPokemons(){
		console.log("creating pokemon")
		var Pokemon = mongoose.model('Pokemon', pokemonSchema);
		//loop over pokemons and write to database
		for(var i=0;i<pokemons.length;i++){
			var item = pokemons[i];
			var p = new Pokemon({ name: item.name });

			var newId;

			var tempId = item.national_id+"";
			if(tempId.length === 1){
				newId = "00"+tempId;
			} else if(tempId.length === 2){
				newId = "0"+tempId;
			}else if(tempId.length === 3){
				newId = tempId;
			}else {
				newId = "F"+tempId;
			}


			p.natId = newId;
	  		p.stats = { hp: item.hp, atk: item.attack, def: item.defense, spa: item.sp_atk, spd: item.sp_def, spe: item.speed };
  			// p.moves = { name: item.moves.name, method: item.moves.learn_type };
  			//@TODO build new moves list
  			//for loop over the original move list
  			//create new_moves, which is a list w/ each item having keywords name and method
  			var new_moves = [];
  			for(var j=0;j<item.moves.length;j++){
  				var obj = {name: item.moves[j].name, method: item.moves[j].learn_type};
  				new_moves.push(obj);
  			};
  			p.moves = new_moves;
  			var new_abilities = [];
  			for(var k=0;k<item.abilities.length;k++){
  				var obj = {name: item.abilities[k].name};
  				new_abilities.push(obj);
  			};
  			p.abilities = new_abilities;

			var new_types = [];
  			for(var l=0;l<item.types.length;l++){
  				var obj = {name: item.types[l].name};
  				new_types.push(obj);
  			};
  			p.type = new_types;

			p.save(function (err, p){
				if (err) return console.error(err);
			});
  			
			
			console.log("added " + item.name)
		}
		console.log("done creating pokemon")
	}
	function createMoves(){
		console.log("creating moves")
		var Move = mongoose.model('Move', moveSchema);
		//loop over pokemons and write to database
		for(var i=0;i<moves.length;i++){
			var item = moves[i];
			var m = new Move({ name: item.name,
							   power: item.power,
							   accuracy: item.accuracy,
							   category: item.category,
							   description: item.description,
							   pp: item.pp });
  		
			m.save(function (err, m){
				if (err) return console.error(err);
			});
  			
			
			console.log("added " + item.name)
		}
		console.log("done creating moves")
	}
});


