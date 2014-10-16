app.factory("terminal", function(player, floor) {
	
	var terminal = null;
	
	var $scope;
	
	var commands = ["map","look","move", "WALLS", "teleport", "pick", "inventory", "use", "list", "help"];
	
	var autoComplete = function(terminal, string, callback) {
		var current = terminal.get_command();
		var options = commands.slice(0);
		if(current.trim().indexOf(" ") >0) {
			options = [];
		}
		if(current.split(" ")[0] == "pick") {
			options = ["up"];
		}
		if(current.split(" ")[0] == "list") {
			options = player.invKeys();
		}
		if(current.split(" ")[0] == "move") {
			options = ["north","south","east","west"];
		}
		if(current.indexOf("pick up") >= 0) {
			var items= [];
			_.each(player.getRoom().getCollectables(),function(collectable) {
				items.push(collectable.name);
			});
			options = items;
		}
		callback(options);
	}
	
	
	var processCommand = function(command, terminal) {
		if(command == ""){
			return;
		}
		if(_.contains(commands, command.split(" ")[0])) {
			player.setInput(command);
			//console.log(player.lastInput());
			///----------------------------------------------------------------------------------
			player.getRoom().setEnemy();
			//console.log(player.getRoom().getEnemy());
			if( player.getRoom().getEnemy() != null){
				echo("**********A "+player.getRoom().getEnemy().getName()+ " is attacking!**********");
				battle = true;
			}else{
				battle = false;
			}
			
			//check for insanity and possibly use random
			if(player.getSanity()){
				if(Math.floor(Math.random()*2)){
					command = _.sample(commands);
					if(command == "move"){
						chance = Math.floor(Math.random()*4);
						if(chance ==0){
							command= command + " north";
						}
						if(chance ==1){
							command= command + " east";
						}
						if(chance ==2){
							command= command + " south";
						}player1.statAdjust(7,0,0);
						if(chance ==3){
							command= command + " west";
						}
					}
					
					
					if(command == "use"){
							command = command + " "+player.getRandomItem().name;
					}
					
					if(command == "pick"){
						command = command + " up " + _.sample(player.getRoom().getCollectables()).name;
					}
				}
			}
			
			if(command.indexOf("help") >= 0){
				echo("*****Help*****\n\n"+
						"map ==> display a map of the local area\n\n"+
						"look ==> tells you the rooms surroundings\n\n"+
						"move + (north,south,east,west) ==> moves you to a different room\n\n"+
						"pick up + (full item name) ==> picks up item\n\n"+
						"use + (full item name) ==> uses item\n\n"+
						"inventory ==> tells you the number of each type of item you have \n\n"+
						"list + (type) ==> list the items of type"
						
				);
			}
			
			
			
			
			//moves player
			if(command.indexOf("move") >= 0){
				
				if(command.indexOf("up") >= 0 || command.indexOf("north") >= 0){
					echo(player.move("north"));
				} else if(command.indexOf("down") >= 0 || command.indexOf("south") >= 0){
					echo(player.move("south"));
					
				}else if(command.indexOf("left") >= 0 || command.indexOf("west") >= 0){
					echo(player.move("west"));
					
				}else if(command.indexOf("right") >= 0 || command.indexOf("east") >= 0){
					echo(player.move("east"));
					
				}else{
					var x_or_y =Math.floor( Math.random()*2);
					var plus_or_minus=Math.floor( Math.random()*2);
					if(x_or_y){
						if(plus_or_minus){
							echo(player.move("east"));
						}else{
							echo(player.move("west"));
						}						
					}else{
						if(plus_or_minus){
							echo(player.move("north"));
						}else{
							echo(player.move("south"));
						}
					}
				}
			}
			
			//look around
			if(command.indexOf("look") >= 0){
				echo(player.getRoom().getInfo());
			}
			
			if(command.indexOf("WALLS") >= 0){
				player.getRoom().doors.north = false;
				player.getRoom().doors.south = false;
				player.getRoom().doors.east = false;
				player.getRoom().doors.west = false;
				echo("This room is now a traplayer1.statAdjust(7,0,0);p...consequently you are trapped...should have thought about that first...");
			}
			
			if(command.indexOf("teleport") >= 0){
				if(command.indexOf("up") >= 0 || command.indexOf("north") >= 0){
					player.teleport("north");
					
				}else if(command.indexOf("down") >= 0 || command.indexOf("south") >= 0){
					player.teleport("south");
					
				}else if(command.indexOf("left") >= 0 || command.indexOf("west") >= 0){
					player.teleport("west");
					
				}else if(command.indexOf("right") >= 0 || command.indexOf("east") >= 0){
					player.teleprt("east");
					
				}else{
					player.teleport("");
				}
			}
			
			//pick up item
			if(command.indexOf("pick") >= 0 && command.indexOf("up") >=0){
				item = command.replace("pick up ", "").trim();
				
				item_info=player.getRoom().hasItem(item);
				if(item_info.state){
					player.addToInventory(player.getRoom().takeItem(item_info.location));
					echo("You picked up a " + item + ".");
				}else{
					echo("There is no "+item+ " in this room!"); 
				}
				
			}
			//give inventory
			if(command.indexOf("inventory") >= 0){
				echo(player.getInventory());
			}
			//use item
			if(command.indexOf("use") >= 0 ){
				item = command.replace("use ", "");
				
				//remove direction
				item=item.replace("north", "").trim();
				item=item.replace("east", "").trim();
				item=item.replace("south", "").trim();
				item=item.replace("west", "").trim();
				
				console.log(item);
				
				result = player.hasItem(item);
				if(result.state){
					use =player.useItem(result.type, item);
					if(use != null){
						echo(use);
					}
				}else{
					echo("You do not have a "+item+"!");
				}
			}
			//list items of type
			if(command.indexOf("list") >= 0 ){
				type = command.replace("list ", "").trim();
				echo(player.invList(type));
			}
			
			if(command.indexOf("map")>=0){
				var mapScape = map(player, floor );
				for(i=0; i<mapScape.length; i++){
					echo(mapScape[i]);
				}
			}
			
			if(battle){
				player.statAdjust(-5,0,0);
			}

		} else {
			echo("I don't understand " + command);
		}
		$scope.$apply();
	}
	
	this.startConsole = function(scope) {
		terminal = $("#litterbox").terminal(processCommand,{
	        greetings: greeting,
	        name: 'game',
	        prompt: 'Command: ',
	        completion: autoComplete});
		$scope = scope;
	}
	
	var echo = function(text) {
		terminal.echo(text);
	}
	this.echo = echo;
	this.battle = false;
	
	return this;
	
	
});