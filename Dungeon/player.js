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
	
	var inventory ={};
	
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
	}
	
	this.getRoom = function() {
		return floor.getRoom(location.x, location.y);
	}
	
	this.move = function(direction){
		//console.log(direction+" v: "+vitality);
		var result;
		if(this.getRoom().hasDoor(direction)) {
			if(!this.getRoom().isLocked(direction)){
				this.statAdjust(0,0,-3);
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
				result = "You have moved "+direction+".";
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
	
	this.invList=function(type){
		var result ="In "+type+"s you have: "
		for(i=0;i<inventory[type].length; i++){
			result += inventory[type][i].name
			if((i+1) != inventory[type].length){
				result +=", "
			}
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
	}
	
	this.updateStats();
	
	return this;
});
