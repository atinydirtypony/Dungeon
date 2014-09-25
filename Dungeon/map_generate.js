//Room Class
var Room = function(){
	collectables = [];
	furniture = [];
	monsters =["taco","fish","bat"];
	home_base = false;
	enemy = null;
	
	//begin a fight with a monster
	this.battle = function(){
		if(monsters.length != 0){
			enemy=monsters[Math.Floor(monster.length * Math.Random)];
			alert("you are fighting a "+ enemy);
		}
	}
}

//Makes map
var current_room = Room();