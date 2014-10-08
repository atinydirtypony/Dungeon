app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout,player,floor) {
	
	$scope.commands = ["look","move","yell", "fight", "WALLS", "teleport", "pick", "up", "inventory"];
	$scope.known_commands =[];
	
	$scope.results = [];
	
	$scope.player = player;
	
	$scope.init = function() {
		floor.newRoom(1000,1000);
	}
	
	$scope.ref_user_text = function(){
		//console.log($scope.user_text);
		if(_.contains($scope.commands, $scope.user_text.split(" ")[0])) {
			//$scope.results.push("You have " + $scope.user_text + "ed!");
			//add's to known commands
			if(!_.contains($scope.known_commands,$scope.user_text)) {
				$scope.known_commands.push($scope.user_text);
			}
			
			
			//moves player
			if($scope.user_text.indexOf("move") >= 0){
				
				if($scope.user_text.indexOf("up") >= 0 || $scope.user_text.indexOf("north") >= 0){
					player.move("north");
					
				} else if($scope.user_text.indexOf("down") >= 0 || $scope.user_text.indexOf("south") >= 0){
					player.move("south");
					
				}else if($scope.user_text.indexOf("left") >= 0 || $scope.user_text.indexOf("west") >= 0){
					player.move("west");
					
				}else if($scope.user_text.indexOf("right") >= 0 || $scope.user_text.indexOf("east") >= 0){
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
			if($scope.user_text.indexOf("look") >= 0){
				player.outText=player.getRoom().getInfo();
			}
			
			if($scope.user_text.indexOf("WALLS") >= 0){
				player.getRoom().doors.north = false;
				player.getRoom().doors.south = false;
				player.getRoom().doors.east = false;
				player.getRoom().doors.west = false;
				player.outText = "This room is now a trap...consequently you are trapped...should have thought about that first...";
			}
			
			if($scope.user_text.indexOf("teleport") >= 0){
				if($scope.user_text.indexOf("up") >= 0 || $scope.user_text.indexOf("north") >= 0){
					player.teleport("north");
					
				}else if($scope.user_text.indexOf("down") >= 0 || $scope.user_text.indexOf("south") >= 0){
					player.teleport("south");
					
				}else if($scope.user_text.indexOf("left") >= 0 || $scope.user_text.indexOf("west") >= 0){
					player.teleport("west");
					
				}else if($scope.user_text.indexOf("right") >= 0 || $scope.user_text.indexOf("east") >= 0){
					player.teleprt("east");
					
				}else{
					player.teleport("");
				}
			}
			
			//console.log($scope.user_text.indexOf("up"));
			//console.log($scope.user_text);
			if($scope.user_text.indexOf("pick") >= 0 && $scope.user_text.indexOf("up") >=0){
				item = $scope.user_text.replace("pick up ", "");
				console.log(item);
				item_info=player.getRoom().hasItem(item);
				if(item_info.state){
					player.addToInventory(player.getRoom().takeItem(item_info.location));
					player.outText= "You picked up a " + item + ".";
				}else{
					player.outText= "There is no "+item+ " in this room!"; 
				}
				
			}
			
			if($scope.user_text.indexOf("inventory") >= 0){
				player.getInventory();
			}
				
				

		} else {
			player.outText="I don't understand " + $scope.user_text;
		}
		$scope.results.push($scope.user_text+": "+ player.outText)
		$scope.user_text = "";
	}

});



