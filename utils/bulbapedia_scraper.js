//http://bulbapedia.bulbagarden.net/w/api.php?action=query&titles=Lucario&format=json
var http = require('http'),
	url = require('url'),
	request = require("request"),
	fs = require('fs');
// var baseUrl = "http://bulbapedia.bulbagarden.net/w/api.php";
// var requestUrl = baseUrl + "?action=query&titles=Lucario&format=json&prop=categories";
var baseUrl = "http://pokeapi.co/api/v1/"
var requestUrl = baseUrl + "pokemon?format=json"
var outFile = "pokemons.json"

console.log(requestUrl)
request(requestUrl, function(error, response, body) {
	console.log(body.meta);
	var objects = body.objects;

	fs.writeFile(outFile, objects, function(err) { 
 		if(err) {
  			console.log(err); 
  		} else { 
  			console.log("The file was saved!"); 
  		} 
  	}); //finished writing file
});