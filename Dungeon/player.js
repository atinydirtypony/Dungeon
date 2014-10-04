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
	//var floor = floor1;
	
	function levelUp() {
		
	}
	
	this.getStats = function() {
		return [{name: "Health", current: health, maximum: maximumHealth},
		        {name: "Mana", current: mana, maximum: maximumMana},
		        {name: "Vitality", current: vitality, maximum: maximumVitality}]
	}
	
	this.addExperience = function(exp) {
		experience += exp;
	}
	
	this.move = function(dPad){
		var tempLocation = {x : location.x, y: location.y}
		if(dPad = "left"){
			templocation.x+=-1;
		}
		if(dPad = "right"){
			templocation.x+=1;
		}
		if(dPad = "up"){
			templocation.y+=-1;
		}
		if(dPad = "down"){
			templocation.y+=1;
		}
		
		
		
	}
	
	return this;
});
