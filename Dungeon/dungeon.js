app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout) {
	
	$scope.commands = ["look","move","yell"];
	$scope.known_commands =[];
	
	//Define Spot in room
	
	//Define Room
	
	//Generate Map
	$scope.map_produce = function()
	
	//Check to see if the user knows that command and if not add it to list
	$scope.ref_user_text = function(){
		console.log($scope.user_text);
		
		if(_.contains($scope.commands, $scope.user_text) 
				&& !_.contains($scope.known_commands,$scope.user_text)) {
			$scope.known_commands.push($scope.user_text);
		}
	}
	
});