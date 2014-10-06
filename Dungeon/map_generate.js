//Room Class
var Room = function(){
	var collectables = [];
	var furniture = [];
	var monsters =[];
	var home_base = false;
	var enemy = null;
	
	//doors (north, south, east, west)
	this.doors = {north:true, south:true, east:true, west:true};
	this.locks = {north:false, south:false, east:false, west:false};
	
	for(i=0; i<Math.floor(Math.random()*10); i++){
		var rand_item = Math.floor(Math.random()*1000);
		if(rand_item<333){
			collectables.push("dust");
		}else if(rand_item>=334 && rand_item<667){
			collectables.push("lint");
		}else if(rand_item>=667 && rand_item<768){
			collectables.push("food");
		}else if(rand_item>=768 && rand_item<818){
			collectables.push("drink");
		}else if(rand_item>=818 && rand_item<845){
			collectables.push("key");
		}else if(rand_item>=845 && rand_item<900){
			collectables.push("dead-baby");
		}else if(rand_item>=900 && rand_item<999){
			collectables.push("balloon");
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
		
		
		return info;
	}
		
	
}


//Floor Class
app.factory("floor", function() {

	var roomSet = new Array();
	for(i=0;i<2000;i++){
		roomSet[i] = new Array();
		for(j=0;j<2000;j++){
			roomSet[i][j] = null;
		} 
	}
	
	
	//create new room
	this.newRoom = function(x,y){
		roomSet[x][y] = new Room();
		alert("now in: " + x + " , " + y);
		
		//north door
		if(roomSet[x][y-1] != null){
			if(roomSet[x][y-1].doors.south){
				roomSet[x][y].doors.north = true;
			}else{
				roomSet[x][y].doors.north = false;
			}
		}else{
			var chance = Math.floor(Math.random());
			if(chance){
				roomSet[x][y].doors.north = true;
			}else{
				roomSet[x][y].doors.north = false;
			}
		}
		
		//South door
		if(roomSet[x][y+1] != null){
			if(roomSet[x][y+1].doors.north){
				roomSet[x][y].doors.south = true;
			}else{
				roomSet[x][y].doors.south = false;
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors.south = true;
			}else{
				roomSet[x][y].doors.south = false;
			}
		}
		
		
		//East door
		if(roomSet[x+1][y] != null){
			if(roomSet[x+1][y].doors.west){
				roomSet[x][y].doors.east = true;
			}else{
				roomSet[x][y].doors.east = false;
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors.east = true;
			}else{
				roomSet[x][y].doors.east = false;
			}
		}
	
		//west door
		if(roomSet[x-1][y] != null){
			if(roomSet[x-1][y].doors.east){
				roomSet[x][y].doors.west = true;
			}else{
				roomSet[x][y].doors.west = false;
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors.west = false;
			}else{
				roomSet[x][y].doors.west = true;
			}
		}
	}
	
	this.getRoom = function(x,y) {
		if(!this.roomCheck(x,y)){
			//alert(x + " - " + y);
			this.newRoom(x,y);
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




