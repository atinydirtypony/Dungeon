app.factory("monsterFactory", function() {

	var monsterNames = ["Bob","Sam","Lars","Frank","Tom","Steve","Slutzor"];
	
	var monsterTypes = ["Toe Jam","Whale","Sloth"];
	
	var Monster = function(monsterName, monsterType) {
		
		this.getName = function() {
			return monsterName;
		}
		
		this.getType = function() {
			return monsterType;
		}
	}
	
	this.createMonster = function() {
		return new Monster(_.sample(monsterNames,1), _.sample(monsterTypes,1));
	}
	
	return this;
	
});
