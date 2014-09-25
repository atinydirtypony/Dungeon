app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout,player) {
	
	$scope.commands = ["look","move","yell", "fight"];
	$scope.known_commands =[];
	
	$scope.results = [];
	
	$scope.player = player;
	
	$scope.ref_user_text = function(){
		console.log($scope.user_text);
		alert(player.getHitPoints());
		if(_.contains($scope.commands, $scope.user_text)) {
			$scope.results.push("You have " + $scope.user_text + "ed!");
			if(!_.contains($scope.known_commands,$scope.user_text)) {
				$scope.known_commands.push($scope.user_text);
				
				//engage in battle if player chooses fight
					if($scope.user_text == "fight"){
						current_room.battle();
					}
				}
			}
		} else {
			$scope.results.push("I don't understand " + $scope.user_text );
		}
		
		$scope.user_text = "";
	}

});



