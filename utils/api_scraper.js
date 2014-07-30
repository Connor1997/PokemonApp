//http://bulbapedia.bulbagarden.net/w/api.php?action=query&titles=Lucario&format=json
var http = require('http'),
	url = require('url'),
	request = require("request"),
	fs = require('fs');
// var baseUrl = "http://bulbapedia.bulbagarden.net/w/api.php";
// var requestUrl = baseUrl + "?action=query&titles=Lucario&format=json&prop=categories";
var baseUrl = "http://pokeapi.co"
var objectsPokemon = [];
var objectsMove = [];


function get(url, outFile, objects){
	console.log("in get: " + outFile)
	request(url, function(error, response, raw) {
		var data = JSON.parse(raw)
		console.log(data.meta);
		objects = objects.concat(data.objects);
		console.log(objects.length)
		if(data.meta.next){
			url = baseUrl + data.meta.next;
			console.log(url)
			get(url, outFile, objects);
		} else {
			console.log("in callback: " + outFile)
			write_file(outFile, objects);
		}

	});
}
function write_file(outFile, objects){
	console.log("in write_file: " + outFile)
	fs.writeFile(outFile, JSON.stringify(objects), function(err) { 
 		if(err) {
  			console.log(err); 
  		} else { 
  			console.log("The file was saved!"); 
  		} 
  	});
}


var requestUrl = baseUrl + "/api/v1/pokemon?format=json&limit=100"
get(requestUrl, "../app/scripts/pokemons.json", objectsPokemon);

requestUrl = baseUrl + "/api/v1/move?format=json&limit=100"
get(requestUrl, "../app/scripts/moves.json", objectsMove);


