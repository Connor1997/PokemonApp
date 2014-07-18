//http://bulbapedia.bulbagarden.net/w/api.php?action=query&titles=Lucario&format=json
var http = require('http'),
	url = require('url'),
	request = require("request"),
	fs = require('fs');
// var baseUrl = "http://bulbapedia.bulbagarden.net/w/api.php";
// var requestUrl = baseUrl + "?action=query&titles=Lucario&format=json&prop=categories";
var baseUrl = "http://pokeapi.co"
var requestUrl = baseUrl + "/api/v1/pokemon?format=json&limit=100"
var outFile = "../app/scripts/pokemons.json"
var objects = [];

console.log(requestUrl)


function get_pokemon(url){
	request(url, function(error, response, raw) {
		var data = JSON.parse(raw)
		console.log(data.meta);
		objects = objects.concat(data.objects);
		console.log(objects.length)
		if(data.meta.next){
			url = baseUrl + data.meta.next;
			console.log(url)
			get_pokemon(url);
		} else {
			write_file();
		}

	});
}
function write_file(){
	debugger
	fs.writeFile(outFile, JSON.stringify(objects), function(err) { 
 		if(err) {
  			console.log(err); 
  		} else { 
  			console.log("The file was saved!"); 
  		} 
  	});
}
get_pokemon(requestUrl);