var fs = require('fs');
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
	var pokemons;
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
	loadPokemon("pokemons.json");

	var pokemonSchema = mongoose.Schema({
	    name: String,
	    stats: [{
	    	hp: Number,
	    	atk: Number,
	    	def: Number,
	    	spa: Number,
	    	spd: Number,
	    	spe: Number
	    }],
	    moves: [{ name: String, method: String}]
	});

	function createPokemons(){
		var Pokemon = mongoose.model('Pokemon', pokemonSchema);
		//loop over pokemons and write to database
		for(var i=0;i<10;i++){
			var item = pokemons[i];
			var p = new Pokemon({ name: item.name });
	  		p.stats = { hp: item.hp, atk: item.attack, def: item.defense, spa: item.sp_atk, spd: item.sp_def, spe: item.speed };
  			// p.moves = { name: item.moves.name, method: item.moves.learn_type };
  			//@TODO build new moves list
  			//for loop over original move list
  			//create new_moves, which is a list w/ each item having keywords name and method
  			var new_moves = [];
  			for(var j=0;j<item.moves.length;j++){
  				var obj = {name: item.moves[j].name, method: item.moves[j].learn_type};
  				new_moves.push(obj);
  			};
  			p.moves = new_moves
			p.save(function (err, p){
				if (err) return console.error(err);
			});
  			
			
			console.log("added " + item.name)
		}
	}
});


