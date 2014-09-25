app.factory("player", function() {
	
	var name = "Unnamed Player";
	var health = 100;
	var mana = 100;
	var vitality = 100;
	var level = 1;
	
	var experience = 0;
	
	this.getName = function() {
		return name;
	}
	
	this.setName = function(newName) {
		// TODO CHECK FOR BAD NAMES
		name = newName;
	}
	
	this.getHealth = function() {
		return health;
	}
	
	this.getMana = function() {
		return mana;
	}
	
	this.getVitality = function() {
		return vitality;
	}
	
	this.getLevel = function() {
		return level;
	}
	
	this.addExperience = function(exp) {
		experience += exp;
		// TODO LEVEL UP
	}
	
	
	
	return this;
});
