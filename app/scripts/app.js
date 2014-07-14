var MyPokeApp = angular.module('MyPokeApp', []);
MyPokeApp.controller('mainController', function($scope, $http) {
	$scope.pokemons=[];

	$scope.res={};
	$scope.res.hp=0;
	$scope.res.atk=0;
	$scope.res.def=0;
	$scope.res.spa=0;
	$scope.res.spd=0;
	$scope.res.spe=0;
	$scope.res.woScarf=0;
	$scope.res.wScarf=0;

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
	$scope.data.atkMult=1;
	$scope.data.defBase=0;
	$scope.data.defEv=0;
	$scope.data.defIv=31;
	$scope.data.defNat="";
	$scope.data.defMult=1;
	$scope.data.spaBase=0;
	$scope.data.spaEv=0;
	$scope.data.spaIv=31;
	$scope.data.spaNat="";
	$scope.data.spaMult=1;
	$scope.data.spdBase=0;
	$scope.data.spdEv=0;
	$scope.data.spdIv=31;
	$scope.data.spdNat="";
	$scope.data.spdMult=1;
	$scope.data.speBase=0;
	$scope.data.speEv=0;
	$scope.data.speIv=31;
	$scope.data.speNat="";
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
		console.log(newVal)
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
		$scope.res.atk=$scope.computeStat($scope.data.atkNat, $scope.data.atkBase, $scope.data.atkIv, $scope.data.atkEv, $scope.data.atkMult);
		$scope.res.def=$scope.computeStat($scope.data.defNat, $scope.data.defBase, $scope.data.defIv, $scope.data.defEv, $scope.data.defMult);
		$scope.res.spa=$scope.computeStat($scope.data.spaNat, $scope.data.spaBase, $scope.data.spaIv, $scope.data.spaEv, $scope.data.spaMult);
		$scope.res.spd=$scope.computeStat($scope.data.spdNat, $scope.data.spdBase, $scope.data.spdIv, $scope.data.spdEv, $scope.data.spdMult);
		$scope.res.spe=$scope.computeStat($scope.data.speNat, $scope.data.speBase, $scope.data.speIv, $scope.data.speEv, $scope.data.speMult);
	},true);
	$scope.computeHp = function(){
		var top = (2*$scope.data.hpBase+1*$scope.data.hpIv+$scope.data.hpEv/4+100)*$scope.data.level;
		var out = Math.floor(top/100+10);
		return out;
	};
	$scope.computeStat = function(N, B, I, E, M){
		var n = 1;
		if(N === "+"){
			n = 1.1;
		} else if(N === "-"){
			n = 0.9;
		};
		var top = (2*B+1*I+E/4)*$scope.data.level;
		var stat = Math.floor(n*Math.floor(top/100+5));
		var out = Math.floor(M*stat);
		return out;
	};
	
	$scope.$watch('data',function(newVal){
		$scope.res.woScarf = $scope.computeScarf($scope.res.spe);
		$scope.res.wScarf = $scope.computeScarf(Math.ceil($scope.res.spe/1.5));
	},true);

	$scope.get_pokemon = function(){
		var url = "http://pokeapi.co/api/v1/pokemon/";
		$http({method:"GET",url:url})
			.success(function(data){
				$scope.pokemons = data.objects;
			
			}).error(function(data, status, headers, config){
			
			})
	};
	// $scope.get_pokemon();

	$scope.computeScarf = function(sped){
		var top = (Math.ceil(sped/1.1)-5)*100;
		var mid = Math.ceil(top/$scope.data.meta_level)-94;
		var out = Math.ceil(mid/2);
		if(out < 0) out = 0;
		return out;
	};

 });

