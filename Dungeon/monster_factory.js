app.factory("monsterFactory", function() {
	
	
	var Monster = function(roomTypes, plevel) {
		var name ="";
		var level = Math.floor(Math.random()*7)+plevel-3;
		if(level<1){
			level = 1;
		}
		
		var maxHealth = 50+ 2*level;
		var health =50+ 2*level;
		
		var maxMana = 50+2*level;
		var mana = 50+2*level;
		
		var maxVitality = 50+2*level;
		var vitality = 50+2*level;
		
		var skills = { physiq: 1, senses: 1, intellegence: 1};
		
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
			physiq = level*4;
			senses = level*1;
			intellegence = level*1;
		}else if(num>=3 && num <6){
			monsterClass = "sensor";
			physiq = level*1;
			senses = level*4;
			intellegence = level*1;
		}else if(num>=6 && num <9){
			monsterClass = "mental";
			physiq = level*1;
			senses = level*1;
			intellegence = level*4;
		}else{
			monsterClass = "balanced";
			physiq = level*2;
			senses = level*2;
			intellegence = level*2;
		}
		
		name = types[0].getMonster(monsterClass);

		for(i=0;i<(types.length-1);i++){
			name =types[i+1].getDescriptor() +" "+name ;
		}
		
		
		
		
		var attack_count = Math.floor(level/5)+1;
		if(attack_count>5){
			attack_count =5;
		}
		attacks = {};
		for(i=0;i<attack_count;i++){
			var crtType = _.sample(types);
			console.log(name+ ": "+crtType.getName());
			var ATK = new ability(crtType,15+level);
			if(allbilities[ATK.getName().replace(" ","")] == null){
				allbilities[ATK.getName().replace(" ","")] = ATK;
				attacks[ATK.getName().replace(" ","")] = ATK;
			}else{
				attacks[ATK.getName().replace(" ","")]=allbilities[ATK.getName().replace(" ","")];
			}
		}
		
		
		this.getName = function() {
			return name;
		}
		
		this.getTypes = function() {
			return types;
		}
		
		this.isAlive = function(){
			return health >0;
		}
		
		this.statAdjust= function(H,M,V){
			health+=H;
			mana+=M;
			vitality+=V;
		}
		
		
		this.getSkills =function(){
			return  skills;
		}
		
		this.getStats = function(){
			return [{current: health}, {current: mana},{current: vitality}];
		}
		
		this.printOut = function(){
			console.log(name);
			console.log("Level: "+level);
			_.each(attacks,function(attack){
				console.log(attack.getName()+": "+attack.getPower());
			});
		}
		
		this.getAttack =function(){
			return _.sample(attacks);
		}
		
		//this.printOut();
	}
	
	this.createMonster = function(roomTypes, plevel) {
		return new Monster(roomTypes, plevel);
	}
	
	return this;
	
});
