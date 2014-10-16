app = angular.module("dungeonApp", []);
			
app.controller("dungeonController", function($scope,$timeout,player,floor,terminal) {
	
	$scope.commands = ["look","move", "WALLS", "teleport", "pick", "up", "inventory", "use", "list"];
	$scope.known_commands =[];
	
	$scope.results = [];
	
	$scope.player = player;
	
	$scope.init = function() {
		floor.newRoom(1000,1000,1);
		terminal.startConsole($scope);
	}
	
	$scope.fullscreen = function() {
		var el = $("#terminal")[0];
		console.log(el);
		var func = el.requestFullScreen
        || el.webkitRequestFullscreen
        || el.mozRequestFullScreen;
		func.call(el);
	}

});



