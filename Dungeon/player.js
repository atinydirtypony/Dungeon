app.factory("player", function(floor) {
	
	var name = "Unnamed Player";
	
	var maximumHealth = 100;
	var health = 100;
	
	var maximumMana = 100;
	var mana = 100;

	var maximumVitality = 100;
	var vitality = 100;
	
	var level = 1;
	
	var experience = 0;
	
	var location = {x: 1000, y: 1000};

	var stats = [];
	
	function levelUp() {
		
	}
	
	this.getStats = function() {
		return stats;
	}
	
	this.updateStats = function() {
		stats = [{name: "Health", current: health, maximum: maximumHealth},
		        {name: "Mana", current: mana, maximum: maximumMana},
		        {name: "Vitality", current: vitality, maximum: maximumVitality}]
	}

	this.addExperience = function(exp) {
		experience += exp;
	}
	
	this.getRoom = function() {
		floor.getRoom(location.x, location.y);
	}
	
	this.move = function(direction){
		if(this.getRoom().hasDoor(direction)) {			
			if(direction = "west"){
				location.x+=-1;
			}
			if(direction = "east"){
				location.x+=1;
			}
			if(direction = "north"){
				location.y+=-1;
			}
			if(direction = "south"){
				location.y+=1;
			}
			this.getRoom();
		} else {
			return false;
		}
		
	}
	
	this.updateStats();
	
	return this;
});
