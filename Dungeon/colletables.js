app.factory("collectablesFactory", function() {
	
	
	var healHealth=function(n, player){
		this.n=0;
		player.statAdjust(n,0,0);
	}
	
	var healMana=function(player){
		this.n=0;
		player.statAdjust(0,n,0);
	}
	
	var healVitality=function(player){
		this.n=0;
		player.statAdjust(0,0,n);
		
	}
	
	var unlockDoor=function(player){
		direction =prompt("Which direction?");
		if(direction == "north"){
			//north lock
			if(player.getRoom().doors.north){
				player.getRoom().locks.north = !player.getRoom().locks.north;
				player.getRoom().nextRoomOver(north).locks.south = !player.getRoom().nextRoomOver(north).locks.south;
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}
		}
		
		
		else if(direction == "south"){
			//south lock
			if(player.getRoom().doors.south){
				player.getRoom().locks.south = !player.getRoom().locks.south;
				player.getRoom().nextRoomOver(south).locks.north = !player.getRoom().nextRoomOver(south).locks.north;
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}
		}
		
		
		else if(direction == "east"){
			//east lock
			if(player.getRoom().doors.east){
				player.getRoom().locks.east = !player.getRoom().locks.east;
				player.getRoom().nextRoomOver(east).locks.west = !player.getRoom().nextRoomOver(east).locks.west;
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}	
		}
		
		
		if(direction == "west"){
			//west lock
			if(player.getRoom().doors.west){
				player.getRoom().locks.west = !player.getRoom().locks.west;
				player.getRoom().nextRoomOver(west).locks.east = !player.getRoom().nextRoomOver(west).locks.east;
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
			_.each(functions,function(doIt){
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
			core.functions.push(healHealth);
			core.functions[0].n = Math.floor(Math.random()*50)+1;
			if(core.functions[0].n<15){
				core.name = "Lesser "+core.name;
			}else if(core.functions[0].n>35){
				core.name = "Greater "+core.name;
			}
		}
		
		if(chance == 1){
			core.name = "Mana Potion";
			core.functions.push(healMana);
			core.functions[0].n = Math.floor(Math.random()*50)+1;
			if(core.functions[0].n<15){
				core.name = "Lesser "+core.name;
			}else if(core.functions[0].n>35){
				core.name = "Greater "+core.name;
			}
		}
		
		if(chance == 2){
			core.name = "Vitality Potion";
			core.functions.push(healVitality);
			core.functions[0].n = Math.floor(Math.random()*50)+1;
			if(core.functions[0].n<15){
				core.name = "Lesser "+core.name;
			}else if(core.functions[0].n>35){
				core.name = "Greater "+core.name;
			}
		}
		
		
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
