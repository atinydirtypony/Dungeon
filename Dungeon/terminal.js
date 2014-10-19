app.factory("terminal", function(player, floor) {
	
	var terminal = null;
	
	var $scope;
	
	var commands = ["map","look","move", "WALLS", "teleport", "pick", "inventory", "use", "list", "help", "attacks"];
	
	var fights =player.getATKnames();
	//console.log(commands);
	
	
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
		if(_.contains(commands, command.split(" ")[0]) || _.contains(fights, command)) {
			player.setInput(command);
			var startX = player.getLocation.x;
			var startY = player.getLocation.y;
			//console.log(player.lastInput());
			///----------------------------------------------------------------------------------
			player.getRoom().setEnemy();
			//console.log(player.getRoom().getEnemy());
			if( player.getRoom().getEnemy() != null){
				echo("**********A "+player.getRoom().getEnemy().getName()+ " is attacking!**********");
				echo("----\tH: "+player.getRoom().getEnemy().getStats()[0].current+"\t----" );
				attack=player.getRoom().getEnemy().getAttack();
				battle = true;
			}else{
				battle = false;
			}
			var playerATK =null;
			
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
				echo("*****HELP*****\n\n"+
						"map ==> display a map of the local area\n"+
						"look ==> tells you the rooms surroundings\n"+
						"move + (north,south,east,west) ==> moves you to a different room\n"+
						"pick up + (full item name) ==> picks up item\n"+
						"use + (full item name) ==> uses item\n"+
						"inventory ==> tells you the number of each type of item you have \n"+
						"list + (type) ==> list the items of type\n"+
						"attacks ==> lists out all attacks known\n\n"
						
				);
				player.addExperience(1);
				//console.log(player.getSkills());
			}
			
			if(command.indexOf("attacks") >= 0){
				var string =""
				_.each(fights, function(name){
					string+=name+": "+player.getAttack(name).getSecondar()+"\t"+player.getAttack(name).getStyle().getInfo()+"\t Power: "+player.getAttack(name).getPower()+"\n\n";
				})
				echo(string);
			}
			
			
			//set up players attack
			_.each(player.getATKnames(),function(ATKcommand){
				if(command.indexOf(ATKcommand) >= 0 && battle){
					playerATK = player.getAttack(ATKcommand);
					//console.log(playerATK.getName());
				}else if(command.indexOf(ATKcommand) >= 0 && !battle){
					echo("Not in battle!");
				}
			})
			
			
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
				
				if(command.indexOf("Key") >= 0 ){
					item = "Key";
				}
				
				
				
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
			
			
			if(startX != player.getLocation().x || startY != player.getLocation().y){
				if( player.getRoom().getEnemy() != null){
					battle =true;
				}else{
					battle =false;
				}
			}
			
			if(battle){
				if(playerATK != null){
					//attack set up
					var targets =["physiq","senses","intellegence"];
					var pTarget = _.sample(targets);
					var target = _.sample(targets);
					var damage =attack.damageCalc(player.getRoom().getEnemy(),player, target);
					var hit = playerATK.damageCalc(player, player.getRoom().getEnemy(), pTarget);
					_.each(player.getRoom().getEnemy().getTypes(), function(defenseT){
						
						hit = hit * defenseT.getCross(playerATK.getType());
					});
					_.each(player.getTypes(), function(defenseT){
						
						damage = damage * defenseT.getCross(attack.getType());
					});
					 hit = Math.ceil(hit);
					 damage = Math.ceil(hit);
					 
					 //choose who goes first then deal out the damages
					
					
					if((_.indexOf(targets, pTarget)+1)%3 == _.indexOf(targets, target)){
						
						if(attack.getStyle().statReduce(player.getRoom().getEnemy())){
							if(attack.getStyle().checkHit()){
								player.statAdjust(-damage,0,0);
								echo(player.getRoom().getEnemy().getName()+" used "+attack.getName()+" againt your "+target);
								var effect = attack.secondar(player.getRoom().getEnemy(),player, damage);
								if(effect){
									echo(attack.getSecondar()+ " took effect;")
								}
							}else{
								echo(player.getRoom().getEnemy().getName()+" missed!");
							}
						}else{
							echo(player.getRoom().getEnemy().getName()+" could not attack!");
						}
						
						if(playerATK.getStyle().statReduce(player)){
							if(playerATK.getStyle().checkHit()){
								player.getRoom().getEnemy().statAdjust(-hit,0,0);
								echo("You used "+playerATK.getName()+" againt its "+pTarget);
								var effect = playerATK.secondar(player, player.getRoom().getEnemy(), damage);
								if(effect){
									echo(playerATK.getSecondar()+ " took effect;")
								}
							}else{
								echo("You missed!");
							}
						}else{
							echo("You could not attack!");
						}
						
						
					}else if((_.indexOf(targets, target)+1)%3 == _.indexOf(targets, pTarget)){
						
						
						if(playerATK.getStyle().statReduce(player)){
							if(playerATK.getStyle().checkHit()){
								player.getRoom().getEnemy().statAdjust(-hit,0,0);
								echo("You used "+playerATK.getName()+" againt its "+pTarget);
								var effect = playerATK.secondar(player, player.getRoom().getEnemy(), damage);
								if(effect){
									echo(playerATK.getSecondar()+ " took effect;")
								}
							}else{
								echo("You missed!");
							}
						}else{
							echo("You could not attack!");
						}
						
						
						if(attack.getStyle().statReduce(player.getRoom().getEnemy())){
							if(attack.getStyle().checkHit()){
								player.statAdjust(-damage,0,0);
								echo(player.getRoom().getEnemy().getName()+" used "+attack.getName()+" againt your "+target);
								var effect = attack.secondar(player.getRoom().getEnemy(),player, damage);
								if(effect){
									echo(attack.getSecondar()+ " took effect;")
								}
							}else{
								echo(player.getRoom().getEnemy().getName()+" missed!");
							}
						}else{
							echo(player.getRoom().getEnemy().getName()+" could not attack!");
						}
						
						
					}else{
						if(Math.floor(Math.random()*2)){
							
							
							if(attack.getStyle().statReduce(player.getRoom().getEnemy())){
								if(attack.getStyle().checkHit()){
									player.statAdjust(-damage,0,0);
									echo(player.getRoom().getEnemy().getName()+" used "+attack.getName()+" againt your "+target);
									var effect = attack.secondar(player.getRoom().getEnemy(),player, damage);
									if(effect){
										echo(attack.getSecondar()+ " took effect;")
									}
								}else{
									echo(player.getRoom().getEnemy().getName()+" missed!");
								}
							}else{
								echo(player.getRoom().getEnemy().getName()+" could not attack!");
							}
							
							if(playerATK.getStyle().statReduce(player)){
								if(playerATK.getStyle().checkHit()){
									player.getRoom().getEnemy().statAdjust(-hit,0,0);
									echo("You used "+playerATK.getName()+" againt its "+pTarget);
									var effect = playerATK.secondar(player, player.getRoom().getEnemy(), damage);
									if(effect){
										echo(playerATK.getSecondar()+ " took effect;")
									}
								}else{
									echo("You missed!");
								}
							}else{
								echo("You could not attack!");
							}
							
							
						}else{
							
							
							if(playerATK.getStyle().statReduce(player)){
								if(playerATK.getStyle().checkHit()){
									player.getRoom().getEnemy().statAdjust(-hit,0,0);
									echo("You used "+playerATK.getName()+" againt its "+pTarget);
									var effect = playerATK.secondar(player, player.getRoom().getEnemy(), damage);
									if(effect){
										echo(playerATK.getSecondar()+ " took effect;")
									}
								}else{
									echo("You missed!");
								}
							}else{
								echo("You could not attack!");
							}
							
							
							if(attack.getStyle().statReduce(player.getRoom().getEnemy())){
								if(attack.getStyle().checkHit()){
									player.statAdjust(-damage,0,0);
									echo(player.getRoom().getEnemy().getName()+" used "+attack.getName()+" againt your "+target);
									var effect = attack.secondar(player.getRoom().getEnemy(),player, damage);
									if(effect){
										echo(attack.getSecondar()+ " took effect;")
									}
								}else{
									echo(player.getRoom().getEnemy().getName()+" missed!");
								}
							}else{
								echo(player.getRoom().getEnemy().getName()+" could not attack!");
							}
						}
						
					}
						
					
				}else{
					var target = _.sample(["physiq","senses","intellegence"]);
					var damage =attack.damageCalc(player.getRoom().getEnemy(),player, target);
					_.each(player.getTypes(), function(defenseT){
						
						damage = damage * defenseT.getCross(attack.getType());
					});
					damage = Math.ceil(damage);
					if(attack.getStyle().statReduce(player.getRoom().getEnemy())){
						if(attack.getStyle().checkHit()){
							player.statAdjust(-damage,0,0);
							echo(player.getRoom().getEnemy().getName()+" used "+attack.getName()+" againt your "+target);
							var effect = attack.secondar(player.getRoom().getEnemy(),player, damage);
							if(effect){
								echo(attack.getSecondar()+ " took effect;")
							}
						}else{
							echo(player.getRoom().getEnemy().getName()+" missed!");							}
					}else{
						echo(player.getRoom().getEnemy().getName()+" could not attack!");
					}
				}
				
				if(!player.getRoom().getEnemy().isAlive()){
					echo(player.getRoom().getEnemy().getName() + " has died.");
					echo("You gained "+player.getRoom().getEnemy().getExperience()+" experience!");
					player.addExperience(player.getRoom().getEnemy().getExperience());
				}
				
			}
			
			
			fights =player.getATKnames();

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