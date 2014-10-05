//Room Class
var Room = function(){
	var collectables = [];
	var furniture = [];
	var monsters =[];
	var home_base = false;
	var enemy = null;
	
	//doors (north, south, east, west)
	this.doors = ["open","open","open","open"];

	this.hasDoor = function(direction) {
		if(direction == "north") {
			return this.doors[0] == "open";
		}
		if(direction =="south") {
			return this.doors[1] == "open";
		}
		if(direciton == "east") {
			return this.doors[2] == "open";
		}
		if(direction == "west") {
			return this.doors[3] == "open";
		}
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
			if(roomSet[x][y-1].doors[1] == "open"){
				roomSet[x][y].doors[0] = "open";
			}else{
				roomSet[x][y].doors[0] = "closed";
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors[0] = "closed";
			}else{
				roomSet[x][y].doors[0] = "open";
			}
		}
		
		//South door
		if(roomSet[x][y+1] != null){
			if(roomSet[x][y+1].doors[0] == "open"){
				roomSet[x][y].doors[1] = "open";
			}else{
				roomSet[x][y].doors[1] = "closed";
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors[1] = "closed";
			}else{
				roomSet[x][y].doors[1] = "open";
			}
		}
		
		
		//East door
		if(roomSet[x+1][y] != null){
			if(roomSet[x+1][y].doors[4] == "open"){
				roomSet[x][y].doors[3] = "open";
			}else{
				roomSet[x][y].doors[3] = "closed";
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors[3] = "closed";
			}else{
				roomSet[x][y].doors[3] = "open";
			}
		}
	
	
		if(roomSet[x-1][y] != null){
			if(roomSet[x-1][y].doors[3] == "open"){
				roomSet[x][y].doors[4] = "open";
			}else{
				roomSet[x][y].doors[4] = "closed";
			}
		}else{
			var chance = Math.floor(2*Math.random());
			if(chance){
				roomSet[x][y].doors[4] = "closed";
			}else{
				roomSet[x][y].doors[4] = "open";
			}
		}
	}
	
	this.getRoom = function(x,y) {
		if(!this.roomCheck(x,y)){
			alert(x + " - " + y);
			this.newRoom(x,y);
		}
		return roomSet[x][y];
	}
	
	
	//check to see if a room exists
	this.roomCheck = function(x,y){
		alert("HERE")
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




