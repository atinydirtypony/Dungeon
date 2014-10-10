app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout,player,floor,terminal) {
	
	$scope.commands = ["look","move","yell", "fight", "WALLS", "teleport", "pick", "up", "inventory", "use", "list"];
	$scope.known_commands =[];
	
	$scope.results = [];
	
	$scope.player = player;
	
	$scope.init = function() {
		floor.newRoom(1000,1000);
		terminal.startConsole($scope);
	}

});



