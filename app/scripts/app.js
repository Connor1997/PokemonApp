var MyPokeApp = angular.module('MyPokeApp', []);
MyPokeApp.controller('mainController', function($scope) {
	$scope.data={};
	$scope.data.hpBase=0;
	$scope.data.hpEv=0;
	$scope.data.hpIv=31;
	$scope.data.atkBase=0;
	$scope.data.atkEv=0;
	$scope.data.atkIv=31;
	$scope.data.atkNat="";
	$scope.data.atkBoost=1;
	$scope.data.defBase=0;
	$scope.data.defEv=0;
	$scope.data.defIv=31;
	$scope.data.defNat="";
	$scope.data.defBoost=1;
	$scope.data.spaBase=0;
	$scope.data.spaEv=0;
	$scope.data.spaIv=31;
	$scope.data.spaNat="";
	$scope.data.spaBoost=1;
	$scope.data.spdBase=0;
	$scope.data.spdEv=0;
	$scope.data.spdIv=31;
	$scope.data.spdNat="";
	$scope.data.spdBoost=1;
	$scope.data.speBase=0;
	$scope.data.speEv=0;
	$scope.data.speIv=31;
	$scope.data.speNat="";
	$scope.data.speBoost=1;
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


	});


 });

