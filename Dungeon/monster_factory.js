app.factory("monsterFactory", function() {
	
	mosters={};
	
	var Monster = function(roomTypes) {
		var name ="";
		var level = Math.floor(Math.random()*20)+1;
		var maxhealth = 10*level;
		var strength = 2*level+Math.floor(Math.random()*5);
		var types = [];
		var monsterCLass ="";
		

		
		var num = Math.floor(Math.random()*6);
		
		if (num < 3){
			var chance = Math.floor(Math.random()*2);
			if(chance){
				var chance2 = Math.floor(Math.random()*2);
				types.push(roomTypes[chance2])
			}else{
				types.push(_.sample(elements));
			}
		}else if(num>= 3 && num <5){
			var chance = Math.floor(Math.random()*2);
			var chance2 = Math.floor(Math.random()*2);
			
			if(chance){
				types.push(roomTypes[chance2]);
			}else{
				types.push(_.sample(elements));
			}
			
			var chance = Math.floor(Math.random()*2);
			if(chance){
				types.push(roomTypes[1-chance2]);
			}else{
				types.push(_.sample(elements));
			}
			
			while(types[0] == types[1]){
				types[1]=_.sample(elements);
			}
		}else{
			var chance = Math.floor(Math.random()*2);
			var chance2 = Math.floor(Math.random()*2);
			
			if(chance){
				types.push(roomTypes[chance2]);
			}else{
				types.push(_.sample(elements));
			}
			
			var chance = Math.floor(Math.random()*2);
			if(chance){
				types.push(roomTypes[1-chance2]);
			}else{
				types.push(_.sample(elements));
			}
			
			types.push(_.sample(elements));
			while(types[0] == types[1]){
				types[1]=_.sample(elements);
			}
			while(types[0] == types[2] || types[1] == types[2]){
				types[2]=_.sample(elements);
			}
		}
		
		num = Math.floor(Math.random()*10);
		
		if(num < 3){
			monsterClass = "fighter";
		}else if(num>=3 && num <6){
			monsterClass = "sensor";
		}else if(num>=6 && num <9){
			monsterClass = "mental";
		}else{
			monsterClass = "balanced";
		}
		
		name = types[0].getMonster(monsterClass)
		for(i=0;i<(types.length-1);i++){
			name =types[i+1].getDescriptor() +" "+name ;
		}
		
		this.getName = function() {
			return name;
		}
		
		this.getType = function() {
			return monsterType;
		}
		
		this.fight = function(player) {
			// TODO FIGHT THE PLAYER AND UPDATE STATS ACCORDINGLY
			
		}
		
	}
	
	this.createMonster = function(roomTypes) {
		return new Monster(roomTypes);
	}
	
	return this;
	
});
