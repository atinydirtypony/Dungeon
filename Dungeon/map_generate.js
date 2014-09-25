//Room Class
var Room = function(){
	var collectables = [];
	var furniture = [];
	var monsters =["taco","fish","bat"];
	var home_base = false;
	var enemy = null;
	
	//begin a fight with a monster
	this.battle = function(){
		if(monsters.length != 0){
			enemy=monsters[Math.floor(monsters.length * Math.random())];
			alert("you are fighting a "+ enemy);
		}
	}
}

//Makes map
var current_room = new Room();