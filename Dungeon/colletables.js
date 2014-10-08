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
	
	
	return this;
	


});

