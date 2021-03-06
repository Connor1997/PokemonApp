var MyPokeApp = angular.module('MyPokeApp', ['ngTable']);
MyPokeApp.controller('mainController', function($scope, $http, ngTableParams, $filter) {

	$scope.pokedex = {};//this is used to store the selected pokemon in the pokedex

	$scope.nav = "calculator"
	$scope.pokemons=[];
	$scope.moves=[];

	$scope.res={};
	$scope.res.hp=0;
	$scope.res.atk=0;
	$scope.res.def=0;
	$scope.res.spa=0;
	$scope.res.spd=0;
	$scope.res.spe=0;
	$scope.res.woScarf=0;
	$scope.res.wScarf=0;
	$scope.boosts=[
		{value:"4",verbose:"+6"},
		{value:"3.5",verbose:"+5"},
		{value:"3",verbose:"+4"},
		{value:"2.5",verbose:"+3"},
		{value:"2",verbose:"+2"},
		{value:"1.5",verbose:"+1"},
		{value:"1",verbose:"0"},
		{value:"0.6666666667",verbose:"-1"},
		{value:"0.5",verbose:"-2"},
		{value:"0.4",verbose:"-3"},
		{value:"0.3333333333",verbose:"-4"},
		{value:"0.2857142857",verbose:"-5"},
		{value:"0.25",verbose:"-6"}
	]
	$scope.data={};
	$scope.data.level=50;
	$scope.data.meta_level=50;
	$scope.data.hpBase=0;
	$scope.data.hpEv=0;
	$scope.data.hpIv=31;
	$scope.data.atkBase=0;
	$scope.data.atkEv=0;
	$scope.data.atkIv=31;
	$scope.data.atkNat="";
	$scope.data.atkBoost=$scope.boosts[6];
	$scope.data.atkMult=1;
	$scope.data.defBase=0;
	$scope.data.defEv=0;
	$scope.data.defIv=31;
	$scope.data.defNat="";
	$scope.data.defBoost=$scope.boosts[6];
	$scope.data.defMult=1;
	$scope.data.spaBase=0;
	$scope.data.spaEv=0;
	$scope.data.spaIv=31;
	$scope.data.spaNat="";
	$scope.data.spaBoost=$scope.boosts[6];
	$scope.data.spaMult=1;
	$scope.data.spdBase=0;
	$scope.data.spdEv=0;
	$scope.data.spdIv=31;
	$scope.data.spdNat="";
	$scope.data.spdBoost=$scope.boosts[6];
	$scope.data.spdMult=1;
	$scope.data.speBase=0;
	$scope.data.speEv=0;
	$scope.data.speIv=31;
	$scope.data.speNat="";
	$scope.data.speBoost=$scope.boosts[6];
	$scope.data.speMult=1;

	$scope.natures=[
		{name:"Adamant",verbose:"Adamant (+Atk, -SpA)",atkNat:"+",spaNat:"-"},
		{name:"Bashful",verbose:"Bashful"},
		{name:"Bold",verbose:"Bold (+Def, -Atk)",defNat:"+",atkNat:"-"},
		{name:"Brave",verbose:"Brave (+Atk, -Spe)",atkNat:"+",speNat:"-"},
		{name:"Calm",verbose:"Calm (+SpD, -Atk)",spdNat:"+",atkNat:"-"},
        {name:"Careful",verbose:"Careful (+SpD, -SpA)",spdNat:"+",spaNat:"-"},
        {name:"Docile",verbose:"Docile"},      
        {name:"Gentle",verbose:"Gentle (+SpD, -Def)",spdNat:"+",defNat:"-"},
        {name:"Hardy",verbose:"Hardy"},      
        {name:"Hasty",verbose:"Hasty (+Spe, -Def)",speNat:"+",defNat:"-"},      
        {name:"Impish",verbose:"Impish (+Def, -SpA)",defNat:"+",spaNat:"-"},      
        {name:"Jolly",verbose:"Jolly (+Spe, -SpA)",speNat:"+",spaNat:"-"},      
        {name:"Lax",verbose:"Lax (+Def, -SpD)",defNat:"+",spdNat:"-"},      
        {name:"Lonely",verbose:"Lonely (+Atk, -Def)",atkNat:"+",defNat:"-"},      
        {name:"Mild",verbose:"Mild (+SpA, -Def)",spaNat:"+",defNat:"-"},      
        {name:"Modest",verbose:"Modest (+SpA, -Atk)",spaNat:"+",atkNat:"-"},      
        {name:"Naive",verbose:"Naive (+Spe, -SpD)",speNat:"+",spdNat:"-"},      
        {name:"Naughty",verbose:"Naughty (+Atk, -SpD)",atkNat:"+",spdNat:"-"},      
        {name:"Quiet",verbose:"Quiet (+SpA, -Spe)",spaNat:"+",speNat:"-"},      
        {name:"Quirky",verbose:"Quirky"},      
        {name:"Rash",verbose:"Rash (+SpA, -SpD)",spaNat:"+",spdNat:"-"},      
        {name:"Relaxed",verbose:"Relaxed (+Def, -Spe)",defNat:"+",speNat:"-"},      
        {name:"Sassy",verbose:"Sassy (+SpD, -Spe)",spdNat:"+",speNat:"-"},      
        {name:"Serious",verbose:"Serious"},      
        {name:"Timid",verbose:"Timid (+Spe, -Atk)",speNat:"+",atkNat:"-"}      
              
	];
	$scope.data.nature=$scope.natures[23];
	$scope.$watch('data.nature',function(newVal){
		
		if(newVal.atkNat){
			$scope.data.atkNat=newVal.atkNat;
		} else{
			$scope.data.atkNat="";
		};
		if(newVal.defNat){
			$scope.data.defNat=newVal.defNat;
		} else{
			$scope.data.defNat="";
		};
		if(newVal.spaNat){
			$scope.data.spaNat=newVal.spaNat;
		} else{
			$scope.data.spaNat="";
		};
		if(newVal.spdNat){
			$scope.data.spdNat=newVal.spdNat;
		} else{
			$scope.data.spdNat="";
		};
		if(newVal.speNat){
			$scope.data.speNat=newVal.speNat;
		} else{
			$scope.data.speNat="";
		};
	});  //end of data.nature watch
	$scope.$watch('data',function(newVal){
		$scope.res.hp=$scope.computeHp();
		$scope.res.atk=$scope.computeStat($scope.data.atkNat, $scope.data.atkBase, $scope.data.atkIv, $scope.data.atkEv, $scope.data.atkBoost.value, $scope.data.atkMult);
		$scope.res.def=$scope.computeStat($scope.data.defNat, $scope.data.defBase, $scope.data.defIv, $scope.data.defEv, $scope.data.defBoost.value, $scope.data.defMult);
		$scope.res.spa=$scope.computeStat($scope.data.spaNat, $scope.data.spaBase, $scope.data.spaIv, $scope.data.spaEv, $scope.data.spaBoost.value, $scope.data.spaMult);
		$scope.res.spd=$scope.computeStat($scope.data.spdNat, $scope.data.spdBase, $scope.data.spdIv, $scope.data.spdEv, $scope.data.spdBoost.value, $scope.data.spdMult);
		$scope.res.spe=$scope.computeStat($scope.data.speNat, $scope.data.speBase, $scope.data.speIv, $scope.data.speEv, $scope.data.speBoost.value, $scope.data.speMult);
	},true);
	$scope.computeHp = function(){
		var top = (2*$scope.data.hpBase+1*$scope.data.hpIv+$scope.data.hpEv/4+100)*$scope.data.level;
		var out = Math.floor(top/100+10);
		if(parseInt($scope.data.hpBase) === 1){
			out = 1
		}
		return out;
	};
	$scope.computeStat = function(N, B, I, E, M, F){
		var n = 1;
		if(N === "+"){
			n = 1.1;
		} else if(N === "-"){
			n = 0.9;
		};
		var top = (2*B+1*I+E/4)*$scope.data.level;
		var stat = Math.floor(n*Math.floor(top/100+5));
		var out = Math.floor(F*M*stat);
		return out;
	};
	
	$scope.$watch('data',function(newVal){
		$scope.res.woScarf = $scope.computeScarf($scope.res.spe);
		$scope.res.wScarf = $scope.computeScarf(Math.ceil($scope.res.spe/1.5));
	},true);

	$scope.get_pokemon = function(){
		var url = "/collections/pokemons";
		$http({method:"GET",url:url})
			.success(function(data){
				// data = JSON.parse(data)
				$scope.pokemons = data;
			
				$scope.dexTableParams = new ngTableParams({
			        page: 1,            // show first page
			        count: 10,           // count per page
			        sorting: {
			        	name: 'asc'
			        }
			    }, {
			        total: $scope.pokemons.length, // length of data
			        getData: function($defer, params) {

			            var orderedData = params.sorting() ?
			                                $filter('orderBy')($scope.pokemons, params.orderBy()) :
			                                $scope.pokemons;
						// var out = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
						$scope.orderedData = orderedData;
			            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						// console.table(out)




			        }
			    });



			}).error(function(data, status, headers, config){
			
			})
	};
	$scope.get_pokemon();
	$scope.pokedexRowCallback = function(national_id){
		$scope.pokedex.active_id = national_id;
		var pokemon = _.find($scope.pokemons, function(obj){
			return (obj.natId === national_id)
		});
		$scope.pokedex.active_pokemon = pokemon;


		// $scope.movesTableParams = new ngTableParams({
	 //        page: 1,            // show first page
	 //        count: 10,           // count per page
	 //        sorting: {
	 //        	learn_type: 'asc'
	 //        }
	 //    }, {
	 //        total: $scope.pokedex.active_pokemon.moves.length, // length of data
	 //        getData: function($defer, params) {

	 //            var orderedData = params.sorting() ?
	 //                                $filter('orderBy')($scope.pokedex.active_pokemon.moves, params.orderBy()) :
	 //                                $scope.pokedex.active_pokemon.moves;
		// 		// var out = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
		// 		$scope.orderedMoves = orderedData;
	 //            $defer.resolve(orderedMoves.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		// 		// console.table(out)




	 //        }
	 //    });

	};
	$scope.computeScarf = function(sped){
		var top = (Math.ceil(sped/1.1)-5)*100;
		var mid = Math.ceil(top/$scope.data.meta_level)-94;
		var out = Math.ceil(mid/2);
		if(out < 0) out = 0;
		return out;
	};
	$scope.$watch('pokemon_active',function(newVal){
		if(newVal){
			var moves = [];
			for(var i=0;i<newVal.moves.length;i++){
				var move = newVal.moves[i]
				var name = move.name.replace("-"," ");
				moves.push(name);
			};
			
			$scope.data.hpBase = newVal.stats[0].hp;
			$scope.data.atkBase = newVal.stats[0].atk;
			$scope.data.defBase = newVal.stats[0].def;
			$scope.data.spaBase = newVal.stats[0].spa;
			$scope.data.spdBase = newVal.stats[0].spd;
			$scope.data.speBase = newVal.stats[0].spe;
			$scope.moves = moves;
			$('#moves1').autocomplete("option", { source: $scope.moves });
			$('#moves2').autocomplete("option", { source: $scope.moves });
			$('#moves3').autocomplete("option", { source: $scope.moves });
			$('#moves4').autocomplete("option", { source: $scope.moves });
		}
	})
	$scope.getStyle = function(meta, stat, value){
		var m;
		if(stat === "HP"){
			if(parseInt(meta) === 5){
				m = 28;
			} else if(parseInt(meta) === 50){
				m = 255;
			} else if(parseInt(meta) === 100){
				m = 500;
			}
			
		} else if(stat === "AD"){
			
			if(parseInt(meta) === 5){
				m = 20;
			} else if(parseInt(meta) === 50){
				m = 253;
			} else if(parseInt(meta) === 100){
				m = 500;
			}

		} else if(stat === "Speed"){ 

			if(parseInt(meta) === 5){
				m = 20;
			} else if(parseInt(meta) === 50){
				m = 222;
			} else if(parseInt(meta) === 100){
				m = 438;
			}
		}
		var f = ((value - 1)/(m - 1))
		var width = Math.min(f * 100, 100)
		var hue = Math.min(f * 120, 180)
		var out = {
			"width": width+"%",
			"background-color": "hsl("+hue+", 100%, 50%)"
		};
		return out
	};
 });
MyPokeApp.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
    	
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});
