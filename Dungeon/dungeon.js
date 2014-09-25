app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout) {
	
	$scope.commands = ["look","move","yell"];
	$scope.known_commands =[];
	
	$scope.results = [];
	
	$scope.ref_user_text = function(){
		console.log($scope.user_text);
		
		if(_.contains($scope.commands, $scope.user_text)) {
			$scope.results.push("You have " + $scope.user_text + "ed!");
			if(!_.contains($scope.known_commands,$scope.user_text)) {
				$scope.known_commands.push($scope.user_text);
			}
		} else {
			$scope.results.push("I don't understand " + $scope.user_text );
		}
		$scope.user_text = "";
	}
	
	$scope.boyfriend = "Rus Fillmore!!";
	

});