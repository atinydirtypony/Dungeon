app.factory("monsterFactory", function() {
	
	mosters={};
	
	var monster = function() {
		var name ="";
		var level = Math.floor(Math.random()*20)+1;
		var maxhealth = 10*level;
		var strength = 2*level+Math.floor(Math.random()*5);
		
		
		
		this.getName = function() {
			return monsterName;
		}
		
		this.getType = function() {
			return monsterType;
		}
		
		this.fight = function(player) {
			// TODO FIGHT THE PLAYER AND UPDATE STATS ACCORDINGLY
			
		}
		
	}
	
	this.createMonster = function() {
		return new Monster());
	}
	
	return this;
	
});
