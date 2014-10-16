app.factory("player", function(floor) {
	
	var name = "Unnamed Player";
	var input = "";
	
	var maximumHealth = 100;
	var health = 100;
	
	var maximumMana = 100;
	var mana = 100;

	var maximumVitality = 100;
	var vitality = 100;
	
	var skills = { physiq: 1, senses: 1, intellegence: 1};

	var level = 1;
	
	var experience = 0;
	
	var location = {x: 1000, y: 1000};

	var stats = [];
	
	var insanity = false;
	
	var inventory ={};
	
	var types=[elements.human];
	//console.log(types[0].getName());
	
	var attacks =[];
	
	
	this.setInput = function(text){
		input = text;
	}
	
	this.lastInput = function(){
		return input;
	}
	
	function levelUp() {
		
	}
	
	this.getStats = function() {
		return stats;
	}
	
	this.updateStats = function() {
		stats = [{name: "Health", current: health, maximum: maximumHealth, color: 'rgba(' + Math.floor( (health*200)/maximumHealth) + ',0,0,1)'}, //'#C80000'},
		        {name: "Mana", current: mana, maximum: maximumMana, color: 'rgba(0,0,' + Math.floor( (mana*200)/maximumMana) + ',1)'},
		        {name: "Vitality", current: vitality, maximum: maximumVitality, color: 'rgba(0,' + Math.floor( (vitality*200)/maximumVitality) + ',0,1)'}]
	}
	
	//changes temp stats
	this.statAdjust= function(H,M,V){
		health+=H;
		mana+=M;
		vitality+=V;
		
		
		//set to max
		if(mana>maximumMana){
			mana = maximumMana;
		}
		if(health>maximumHealth){
			health = maximumHealth;
		}
		if(vitality>maximumVitality){
			vitality=maximumVitality;
		}
		
		//check for 0's
		if(health<=0){
			this.die();
		}
		
		if(mana<=0){
			this.goInsane();
		}
		
		this.updateStats();
		
		
	}
	
	//changes max stat
	this.statChange= function(H,M,V){
		maximumhealth+=H;
		maximummana+=M;
		maximumvitality+=V;
		this.updateStats();	
	}

	this.addExperience = function(exp) {
		experience += exp;
		if (experience > (level*(level-1))){
			this.levelup();
			experience = experience - (level*(level-1));
		}
	}
	
	this.levelUp = function(){
		
	}
	
	var getRoom = function() {
		return floor.getRoom(location.x, location.y,level);
	}
	this.getRoom = getRoom;

	this.move = function(direction){
		//console.log(direction+" v: "+vitality);
		var result;
		if(this.getRoom().hasDoor(direction)) {
			if(!this.getRoom().isLocked(direction)){
				
				//adjust vitality based on room type you leave
				var bigM=1;

				_.each(types, function(t1){

					bigM = bigM * t1.getCross(getRoom().getTypes()[1].getName());
					bigM = bigM * t1.getCross(getRoom().getTypes()[0].getName());
				});
				this.statAdjust(0,0,Math.floor(-8*bigM));
				
				
				if(direction == "west"){
					location.x = location.x -1;
					
				}
				if(direction == "east"){
					location.x = location.x +1;
				}
				if(direction == "north"){
					location.y = location.y -1;
				}
				if(direction == "south"){
					location.y = location.y + 1;
				}
				this.getRoom();
				result = "You have moved "+direction+"."+" It took you "+Math.floor(bigM*8)+" vitality of effort to do so.";
			} else {
				result = "The door is locked!";
			}
			
			//alert("now in: " + location.x + " , " + location.y);
		} else {
			result = "You run into the wall. It hurts!";
			this.statAdjust(-10,0,0);
		}
		console.log("x:"+location.x+ " y:"+location.y)
		return result;
		
	}
	
	this.teleport = function(direction){
		if(direction == "west"){
			location.x = location.x -1;
		}else if(direction == "east"){
			location.x = location.x +1;
		}else if(direction == "north"){
			location.y = location.y -1;
		}else if(direction == "south"){
			location.y = location.y + 1;
		}else{
			location.x=location.x + Math.floor(Math.random()*21)-10;
			location.y=location.y + Math.floor(Math.random()*21)-10;
		}
		this.getRoom();
		this.statAdjust(0,-50,0);
		return "You have teleported!";
	}
	
	this.getInventory = function(){
		var list = _.flatten(_.pairs(inventory), true);
		var result = "You have===>   ";
		//console.log(list.length);
		for(i=0;i<list.length; i++){
			//console.log(i+"  "+list[i]+"   lengeth:"+list[i].length)
			if(i%2 == 0){
				result += list[i]+"s: ";
			}else{
				result += list[i].length+"   ";
			}	
		}
		return result;
	}
	
	this.addToInventory= function(item){
		//console.log(item.functions);
		if(inventory[item.type] != null){
			inventory[item.type].push(item);
		}else{
			inventory[item.type]=[];
			inventory[item.type].push(item);
		}
		
	}
	
	this.hasItem=function(name){
		var names= [];
		var types =[];
		_.each(inventory,function(group){
			_.each(group,function(item){
			names.push(item.name);
			types.push(item.type);
			});
		});
		//console.log(names);
		if(_.indexOf(names,name)>=0){
			return {state:true, type:types[_.indexOf(names,name)]};
		}else{
			return {state:false};
		}
	}
	
	this.invKeys=function(){
		return _.keys(inventory);
	}
	
	this.invList=function(type){
		console.log(type);
		console.log(_.indexOf(_.keys(inventory),type));
		if(_.indexOf(_.keys(inventory),type)>=0){
			var result ="In "+type+"s you have: "
			for(i=0;i<inventory[type].length; i++){
				result += inventory[type][i].name
				if((i+1) != inventory[type].length){
					result +=", "
				}
			}
		}else{
			result = "What the fuck do you think you have in your inventory? You ain't got none of that shit!"
		}
		return result;
	}
		
	this.useItem=function(type, item){
		var names=[];
		_.each(inventory[type], function(slot){
			names.push(slot.name);
		});
		var index=_.indexOf(names,item);
		inventory[type][index].use(this);
		if(inventory[type][index].checkExpire()){
			inventory[type].splice(index, 1);
		}
	}
	
	this.getLocation = function(){
		return location
	};
	
	this.die = function(){
		mana = 100;
		health = 100;
		vitality = 100;
		maximumMana = 100;
		maximumHealth = 100;
		maximumVitality = 100;
		inventory ={};
		location.x = Math.floor(Math.random()*2000);
		location.y = Math.floor(Math.random()*2000);
		this.getRoom();
	}
	
	this.isAlive = function(){
		return (health > 0);
	}
	
	this.goInsane = function(){
		insanity = true;
		
	}
	
	this.getSanity = function(){
		return insanity;
	}
	
	this.updateStats();
	
	this.getRandomItem = function(){
		var keys = _.keys(inventory);
		return _.sample(inventory[_.sample(keys)]);
	}
	
	this.getTypes =function(){
		return types;
	}
	
	this.setTypes = function(newTypes){
		types = newTypes;
		types = _.uniq(types);
		/*_.each(types, function(type){
			console.log(type.getName());
		});*/
	}
	
	
	this.typeColors = function(){
		colors = ["#000000","#000000","#000000"];
		for(i=0;i<types.length;i++){
			colors[i] = types[i].getColor();
		}
		return colors;
	}
	
	this.getAttack = function(){
		return {name: kick}
	}
	
	this.getSkills = function(){
		return skills;
	}
	
	return this;
});
