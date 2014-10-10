app.factory("terminal", function(player) {
	
	var terminal = null;
	
	var $scope;
	
	var commands = ["look","move","yell", "fight", "WALLS", "teleport", "pick up", "up", "inventory", "use", "list"];
	
	var autoComplete = function(terminal, string, callback) {
		var current = terminal.get_command();
		console.log("CURRENT" + current);
		var options = commands.slice(0);
		if(current.trim().indexOf(" ") >0) {
			options = [];
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
			
			//moves player
			if(command.indexOf("move") >= 0){
				
				if(command.indexOf("up") >= 0 || command.indexOf("north") >= 0){
					player.move("north");
					
				} else if(command.indexOf("down") >= 0 || command.indexOf("south") >= 0){
					player.move("south");
					
				}else if(command.indexOf("left") >= 0 || command.indexOf("west") >= 0){
					player.move("west");
					
				}else if(command.indexOf("right") >= 0 || command.indexOf("east") >= 0){
					player.move("east");
					
				}else{
					var x_or_y =Math.floor( Math.random()*2);
					var plus_or_minus=Math.floor( Math.random()*2);
					if(x_or_y){
						if(plus_or_minus){
							player.move("east");
						}else{
							player.move("west");
						}						
					}else{
						if(plus_or_minus){
							player.move("north");
						}else{
							player.move("south");
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
				echo("This room is now a trap...consequently you are trapped...should have thought about that first...");
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

			if(command.indexOf("pick") >= 0 && command.indexOf("up") >=0){
				item = command.replace("pick up ", "");
				//console.log(item);
				item_info=player.getRoom().hasItem(item);
				if(item_info.state){
					player.addToInventory(player.getRoom().takeItem(item_info.location));
					echo("You picked up a " + item + ".");
				}else{
					echo("There is no "+item+ " in this room!"); 
				}
				
			}
			
			if(command.indexOf("inventory") >= 0){
				echo(player.getInventory());
			}
			
			if(command.indexOf("use") >= 0 ){
				item = command.replace("use ", "");
				result = player.hasItem(item);
				if(result.state){
					player.useItem(result.type, item);
				}else{
					echo("You do not have a "+item+"!");
				}
			}
			
			if(command.indexOf("list") >= 0 ){
				type = command.replace("list ", "");
				echo(player.invList(type));
			}
				

		} else {
			echo("I don't understand " + command);
		}
		$scope.$apply();
	}
	
	this.startConsole = function(scope) {
		terminal = $("#litterbox").terminal(processCommand,{
	        greetings: '',
	        name: 'game',
	        prompt: 'Command: ',
	        completion: autoComplete});
		$scope = scope;
	}
	
	var echo = function(text) {
		terminal.echo(text);
	}
	this.echo = echo;
	
	return this;
	
});