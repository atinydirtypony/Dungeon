app.factory("collectablesFactory", function() {
	
	
	var healHealth=function(n, player){
		player.statAdjust(n,0,0);
	}
	
	var healMana=function(n, player){
		player.statAdjust(0,n,0);
	}
	
	var healVitality=function(n, player){
		player.statAdjust(0,0,n);
		
	}
	
	var unlockDoor=function(player, direction){
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
		
		
		if(direction == "south"){
			//south lock
			if(player.getRoom().doors.south){
				player.getRoom().locks.south = !player.getRoom().locks.south;
				player.getRoom().nextRoomOver(south).locks.north = !player.getRoom().nextRoomOver(south).locks.north;
				player.outText = "***CLICK***"
			}else{
				player.outText="Ummmm...sooooo...you can't lock a wall. Just thought you should know that."
			}
		}
		
		
		if(direction == "east"){
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


});

