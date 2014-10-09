app.factory("collectablesFactory", function() {
	
	
	var healHealth = function(n){
		if(n == null){
			n=0;
		}
		return function(player){
			//console.log(n);
			player.statAdjust(n,0,0);
			
		}
	}
	
	var healMana = function(n){
		if(n == null){
			n=0;
		}
		return function(player){
			//console.log(n);
			player.statAdjust(0,n,0);
			
		}
	}
	
	var healVitality = function(n){
		if(n == null){
			n=0;
		}
		return function(player){
			//console.log(n);
			player.statAdjust(0,0,n);
			
		}
	}
	
	var unlockDoor=function(player){
		direction =prompt("Which direction?");
		place =player.getLocation();
		if(direction == "north"){
			//north lock
			if(player.getRoom().doors.north){
				player.getRoom().locks.north = !player.getRoom().locks.north;
				if(player.getRoom().nextRoomOver("north",place.x,place.y) != null){
					player.getRoom().nextRoomOver("north",place.x,place.y).locks.south = !player.getRoom().nextRoomOver("north",place.x,place.y).locks.south;
				}
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}
		}
		
		
		else if(direction == "south"){
			//south lock
			if(player.getRoom().doors.south){
				player.getRoom().locks.south = !player.getRoom().locks.south;
				if(player.getRoom().nextRoomOver("south",place.x,place.y) != null){
					player.getRoom().nextRoomOver("south",place.x,place.y).locks.north = !player.getRoom().nextRoomOver("south",place.x,place.y).locks.north;
				}
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}
		}
		
		
		else if(direction == "east"){
			//east lock
			if(player.getRoom().doors.east){
				player.getRoom().locks.east = !player.getRoom().locks.east;
				if(player.getRoom().nextRoomOver("east",place.x,place.y) != null){
					player.getRoom().nextRoomOver("east",place.x,place.y).locks.west = !player.getRoom().nextRoomOver("east",place.x,place.y).locks.west;
				}
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}	
		}
		
		
		if(direction == "west"){
			//west lock
			if(player.getRoom().doors.west){
				player.getRoom().locks.west = !player.getRoom().locks.west;
				if(player.getRoom().nextRoomOver("west",place.x,place.y) != null){
					player.getRoom().nextRoomOver("west",place.x,place.y).locks.east = !player.getRoom().nextRoomOver("west",place.x,place.y).locks.east;
				}
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}
		}
		
	}
	
	
	
	//<----------------------------------actual items----------------------------------------------------------------->
	 
	var item = function(){
		var uses = 1;
		this.functions=[];
		this.type;
		this.name = "";

		
		this.use = function(player){
			uses-=1;
			_.each(this.functions,function(doIt){
				doIt(player);
			});
		}
		
		this.changeUses=function(t){
			uses = t;
		}
		
		this.checkExpire = function(){
			if(uses<1){
				return true;
			}else{
				return false;
			}
		}
		
		
	}
	
	this.createPotion = function(){
		var core = new item();
		
		core.type = "potion";
		
		
		chance = Math.floor(Math.random()*3);
		
		if(chance == 0){
			core.name = "Health Potion";
			var intensity = Math.floor(Math.random()*50)+1;
			core.functions.push(healHealth(intensity));
			if(intensity<15){
				core.name = "Lesser "+core.name;
			}else if(intensity>35){
				core.name = "Greater "+core.name;
			}
		}
		
		if(chance == 1){
			core.name = "Mana Potion";
			var intensity = Math.floor(Math.random()*50)+1;
			core.functions.push(healMana(intensity));
			if(intensity<15){
				core.name = "Lesser "+core.name;
			}else if(intensity>35){
				core.name = "Greater "+core.name;
			}
		}
		
		if(chance == 2){
			core.name = "Vitality Potion";
			var intensity = Math.floor(Math.random()*50)+1;
			core.functions.push(healVitality(intensity));
			if(intensity<15){
				core.name = "Lesser "+core.name;
			}else if(intensity>35){
				core.name = "Greater "+core.name;
			}
		}
		
		//console.log(core.functions[0] + "-------------"+ core.functions[0].n);
		return core;
	}
	
	
	this.createKey = function() {
		var core = new item();
		
		core.type = "key";
		core.name = "Key";
		
		core.functions.push(unlockDoor);
		
		return core;
	}
	
	this.createDrink = function(){
		var names = [["water", "soda", "energy drink", "goblin tears"],
		             ["milk","electrolyte solution","experimental nanite infusion","orphan tears"],
		             ["smoothie","vitamin-enriched smoothie","experimental vitamin-enriched nanite smoothie","fairy tears"],
		             ["oger blood","human blood", "vampire blood","unicorn blood and tears"]];
		
		var key1 = Math.floor(Math.random()*100);
		if(key1<50){
			key1=0;
		}else if(key1>=50 && key1<80){
			key1=1;
		}else if(key1>=80 && key1<95){
			key1=2;
		}else{
			key1=3;
		}
		
		var key2 = Math.floor(Math.random()*100);
		if(key2<50){
			key2=0;
		}else if(key2>=50 && key2<80){
			key2=1;
		}else if(key2>=80 && key2<95){
			key2=2;
		}else{
			key2=3;
		}
		
		var core = new item();
		
		core.name = names[key1][key2];
		core.type= "drink";
		core.functions.push(healVitality(5*key1+1+Math.floor(Math.random()*9)));
		core.functions.push(healMana(5*key2+1+Math.floor(Math.random()*9)));
		
		var size = Math.floor(Math.random()*100);
		if(size<84){
			core.changeUses(1);
			core.name= "small "+core.name;
		}else if(size>=84 && size<94){
			core.changeUses(2);
			core.name= "medium "+core.name;
		}else if(size>=94 && size<99){
			core.changeUses(3);
			core.name ="large "+core.name;
		}else{
			core.changeUses(4);
			core.name ="huge sip "+core.name;
		}
		
		return core;
	}
	
	this.createFood = function(){
		var names = [["chicken nugget", "chicken breast", "whole roast chicken", "leviathan fillet"],
		             ["slider","ham sandwich","turkey panini","9-headed hydra steak"],
		             ["soy-kale nugget","grilled-cheese sandwich","pheonix egg omlet","kracken fillet"],
		             ["dragon nugget","dragon burger", "dragon ribs","dragon steak"]];
		
		var key1 = Math.floor(Math.random()*100);
		if(key1<50){
			key1=0;
		}else if(key1>=50 && key1<80){
			key1=1;
		}else if(key1>=80 && key1<95){
			key1=2;
		}else{
			key1=3;
		}
		
		var key2 = Math.floor(Math.random()*100);
		if(key2<50){
			key2=0;
		}else if(key2>=50 && key2<80){
			key2=1;
		}else if(key2>=80 && key2<95){
			key2=2;
		}else{
			key2=3;
		}
		
		var core = new item();
		
		core.name = names[key1][key2];
		core.type= "food";
		var k1_intenisty=
		core.functions.push(healVitality(5*key1+1+Math.floor(Math.random()*9)));
		core.functions.push(healHealth(5*key2+1+Math.floor(Math.random()*9)));
		
		var size = Math.floor(Math.random()*100);
		if(size<84){
			core.changeUses(1);
			core.name= "small "+core.name;
		}else if(size>=84 && size<94){
			core.changeUses(2);
			core.name= "medium "+core.name;
		}else if(size>=94 && size<99){
			core.changeUses(3);
			core.name ="large "+core.name;
		}else{
			core.changeUses(4);
			core.name ="family sized "+core.name;
		}
		
		return core;
	}
	
	return this;

});

