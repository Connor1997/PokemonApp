function getStyle(meta, stat, value){
	var m;
	if(stat === "HP"){
		if(parseInt(meta) === 5){
			m = 28;
		} else if(meta === 50){
			m = 255;
		} else if(meta === 100){
			m = 500;
		}
		
	} else if(stat === "AD"){
		
		if(parseInt(meta) === 5){
			m = 20;
		} else if(meta === 50){
			m = 253;
		} else if(meta === 100){
			m = 500;
		}

	} else if(stat === "Speed"){ 

		if(parseInt(meta) === 5){
			m = 20;
		} else if(meta === 50){
			m = 222;
		} else if(meta === 100){
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
x = getStyle(100, "HP", 714);
console.log(x);