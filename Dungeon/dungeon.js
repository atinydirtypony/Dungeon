app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout,player,floor) {
	
	$scope.commands = ["look","move","yell", "fight"];
	$scope.known_commands =[];
	
	$scope.results = [];
	
	$scope.player = player;
	
	$scope.init = function() {
		floor.newRoom(10,10);
	}
	
	$scope.ref_user_text = function(){
		console.log($scope.user_text);
		if(_.contains($scope.commands, $scope.user_text)) {
			$scope.results.push("You have " + $scope.user_text + "ed!");
			//add's to known commands
			
			if(!_.contains($scope.known_commands,$scope.user_text)) {
				$scope.known_commands.push($scope.user_text);
			}
			
			
			//moves player
			if($scope.user.text.indexOf("move") >= 0){
				
				if($scope.user.text.indexOf("up") >= 0 || $scope.user.text.indexOf("north") >= 0){
					player.move("north");
					
				} else if($scope.user.text.indexOf("down") >= 0 || $scope.user.text.indexOf("south") >= 0){
					player.move("south");
					
				}else if($scope.user.text.indexOf("left") >= 0 || $scope.user.text.indexOf("west") >= 0){
					player.move("west");
					
				}else if($scope.user.text.indexOf("right") >= 0 || $scope.user.text.indexOf("east") >= 0){
					player.move("east");
					
				}else{
					var x_or_y =Math.floor( Math.random()*2);
					var plus_or_minus=Math.floor( Math.random()*2)*2-1;
					player.location[x_or_y]+=plus_or_minus;
				}
			}
				
				

		} else {
			$scope.results.push("I don't understand " + $scope.user_text );
		}
		
		$scope.user_text = "";
	}

});



