


//Floor Class
app.factory("floor", function(collectablesFactory,monsterFactory) {
	
	//Room Definition
	var Room = function(level){
		var collectables = [];
		var furniture = [];
		var monsters = [];
		var home_base = false;
		var enemy = null;
		var type = [];
		var type1 = _.sample(elements);
		var type2 =_.sample(elements);
		while(type1 == type2){
			type2 =_.sample(elements);
		}
		
		var chance = Math.floor(Math.random()*20);
		if(chance>7){
			monsters.push(monsterFactory.createMonster([type1,type2],level));
		}
		if(chance>14){
			monsters.push(monsterFactory.createMonster([type1,type2],level));
		}
		if(chance>18){
			monsters.push(monsterFactory.createMonster([type1,type2],level));
		}
	
		
		this.getCollectables = function() {
			return collectables;
		}
		
		var name = type2.getDescriptor()+" "+type1.getRoom();
		
		this.fontColor = type2.getColor();
		this.color = type1.getColor();
		
		//doors (north, south, east, west)
		this.doors = {north:true, south:true, east:true, west:true};
		this.locks = {north:false, south:false, east:false, west:false};
		
		
		for(i=0; i<Math.floor(10-Math.sqrt( Math.random()*100)); i++){
			var rand_item = Math.floor(Math.random()*1000);
			if(rand_item<350){
				collectables.push(collectablesFactory.createDrink());
			}else if(rand_item>=350 && rand_item<700){
				collectables.push(collectablesFactory.createFood());
			}else if(rand_item>=700 && rand_item<900){
				collectables.push(collectablesFactory.createKey());
			}else{
				collectables.push(collectablesFactory.createPotion());
			}
			
		}
		
		if(Math.floor(Math.random())){
			collectables.push(collectablesFactory.createIdol(type1))
		}else{
			collectables.push(collectablesFactory.createIdol(type2))
		}
		
		collectables.push(collectablesFactory.createMirror());
		
		this.getName = function(){
			return name;
		}
		
		this.nextRoomOver =function(direction,x,y){
			if(direction = "north"){
				return roomSet[x][y-1];
				
			}
			if(direction = "south"){
				return roomSet[x][y+1];
				
			}
			if(direction = "east"){
				return roomSet[+-1][y];
				
			}
			if(direction = "west"){
				return roomSet[x-1][y];
				
			}
		}

		this.hasDoor = function(direction) {
			if(direction == "north") {
				return this.doors.north;
			}
			if(direction =="south") {
				return this.doors.south;
			}
			if(direction == "east") {
				return this.doors.east;
			}
			if(direction == "west") {
				return this.doors.west;
			}
		}
		
		this.getTypes =function(){
			return [type1, type2];//console.log(colors);
		}
		
		this.isLocked = function(direction){
			if(direction == "north") {
				return this.locks.north;
			}
			if(direction =="south") {
				return this.locks.south;
			}
			if(direction == "east") {
				return this.locks.east;
			}
			if(direction == "west") {
				return this.locks.west;
			}
			
		}
		
		this.hasItem=function(name){
			var names= [];
			_.each(collectables,function(item){
				names.push(item.name);
			});
			//console.log(names);
			if(_.indexOf(names,name)>=0){
				return {state:true, location:_.indexOf(names,name)};
			}else{
				return {state:false};
			}
			
		}
		
		this.takeItem = function(index){
			var gift = collectables[index];
			collectables.splice(index, 1);
			return gift;
			
		}
		
		
		this.getInfo = function(){
			var info = "";
			info = info+"This room has doors in the ";
			count =0;
			for(direction in this.doors){
				if(this.doors[direction]){
					if(count>0){
						info = info + "and ";
					}
					
					info = info + direction+" ";
					count+=1;
					//console.log(dOOrs);
				}
			}
			if( count == 0 ){
				info = "There are no fucking doors! How the hell did you get in here?"
			}
			
			info = info + " This room also has";
			
			if(collectables.length == 0){
				info = info + " nothing else sucker!"
			}else{
				_.each(collectables, function(collectable){
					info = info + " a "+ collectable.name;
					
				});
				
			}
			
			return info;
		}
		
		
		this.getEnemy = function(){
			return enemy;
		}

		 
		
		this.setEnemy = function(){
			console.log(monsters.length);
			if(this.getEnemy() == null && monsters.length >0 ){

				chance = Math.floor(Math.random()*(10+monsters.length));
				if(chance >9){
					spot=Math.floor(Math.random()*monsters.length);
					enemy=_.first(monsters.splice(spot,1));
				}
			}else if(this.getEnemy() != null){
				if(!enemy.isAlive()){
					enemy = null;
				}
			}
		}
		
	}
	
	
	
//-------------------end room DEF-----------------------------------------------------------------------------------------------
	
	
	
	
	
	var roomSet = new Array();
	for(i=0;i<2000;i++){
		roomSet[i] = new Array();
		for(j=0;j<2000;j++){
			roomSet[i][j] = null;
		} 
	}
	
	
	//create new room
	this.newRoom = function(x,y,level){
		roomSet[x][y] = new Room(level);
		//alert("now in: " + x + " , " + y);
		
		//north door
		if(roomSet[x][y-1] != null){
			if(roomSet[x][y-1].doors.south){
				roomSet[x][y].doors.north = true;
				if(roomSet[x][y-1].locks.south){
					roomSet[x][y].locks.north = true;
				}else{
					roomSet[x][y].locks.north = false;
				}
			}else{
				roomSet[x][y].doors.north = false;
			}
		}else{
			var chance = Math.floor(4*Math.random());
			if(chance < 3){
				roomSet[x][y].doors.north = true;
				if(chance == 0){
					roomSet[x][y].locks.north = true;
				}else{
					roomSet[x][y].locks.north = false;
				}
			}else{
				roomSet[x][y].doors.north = false;
			}
		}
		
		//south door
		if(roomSet[x][y+1] != null){
			if(roomSet[x][y+1].doors.north){
				roomSet[x][y].doors.south = true;
				if(roomSet[x][y+1].locks.north){
					roomSet[x][y].locks.south = true;
				}else{
					roomSet[x][y].locks.south = false;
				}
			}else{
				roomSet[x][y].doors.south = false;
			}
		}else{
			var chance = Math.floor(4*Math.random());
			if(chance < 3){
				roomSet[x][y].doors.south = true;
				if(chance == 0){
					roomSet[x][y].locks.south = true;
				}else{
					roomSet[x][y].locks.south = false;
				}
			}else{
				roomSet[x][y].doors.south = false;
			}
		}
		
		//east door
		if(roomSet[x+1][y] != null){
			if(roomSet[x+1][y].doors.west){
				roomSet[x][y].doors.east = true;
				if(roomSet[x+1][y].locks.west){
					roomSet[x][y].locks.east = true;
				}else{
					roomSet[x][y].locks.east = false;
				}
			}else{
				roomSet[x][y].doors.east = false;
			}
		}else{
			var chance = Math.floor(4*Math.random());
			if(chance < 3){
				roomSet[x][y].doors.east = true;
				if(chance == 0){
					roomSet[x][y].locks.east = true;
				}else{
					roomSet[x][y].locks.east = false;
				}
			}else{
				roomSet[x][y].doors.east = false;
			}
		}
		
		//west door
		if(roomSet[x-1][y] != null){
			if(roomSet[x-1][y].doors.east){
				roomSet[x][y].doors.west = true;
				if(roomSet[x-1][y].locks.west){
					roomSet[x][y].locks.west = true;
				}else{
					roomSet[x][y].locks.west = false;
				}
			}else{
				roomSet[x][y].doors.west = false;
			}
		}else{
			var chance = Math.floor(4*Math.random());
			if(chance < 3){
				roomSet[x][y].doors.west = true;
				if(chance == 0){
					roomSet[x][y].locks.west = true;
				}else{
					roomSet[x][y].locks.west = false;
				}
			}else{
				roomSet[x][y].doors.west = false;
			}
		}
		

	}
	
	this.getRoom = function(x,y,level) {
		if(!this.roomCheck(x,y)){
			//alert(x + " - " + y);
			this.newRoom(x,y,level);
			//console.log(level);
		}
		return roomSet[x][y];
	}
	
	
	//check to see if a room exists
	this.roomCheck = function(x,y){
		//alert("HERE")
		if(roomSet[x][y] != null){
			return true;
		}else{
			return false;
		}
	
	
	}
	return this;
});
//Makes map

//floor1 = new Floor();




