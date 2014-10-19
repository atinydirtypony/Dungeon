app.factory("collectablesFactory", function() {
	
	
	var healHealth = function(n){
		if(n == null){
			n=0;
		}
		return function(player){
			//console.log(n);
			player.statAdjust(n,0,0);
			return {text: "You healed "+n+" health", result: true};
		}
	}
	
	var healMana = function(n){
		if(n == null){
			n=0;
		}
		return function(player){
			//console.log(n);
			player.statAdjust(0,n,0);
			return {text: "You healed "+n+" mana", result: true};
		}
	}
	
	var healVitality = function(n){
		if(n == null){
			n=0;
		}
		return function(player){
			//console.log(n);
			player.statAdjust(0,0,n);
			return {text: "You healed "+n+" vitality", result: true};
			
		}
	}
	
	var unlockDoor=function(player){
		direction =player.lastInput().replace("use Key ", "");
		place =player.getLocation();
		if(direction == "north"){
			//north lock
			if(player.getRoom().doors.north){
				player.getRoom().locks.north = !player.getRoom().locks.north;
				if(player.getRoom().nextRoomOver("north",place.x,place.y) != null){
					player.getRoom().nextRoomOver("north",place.x,place.y).locks.south = !player.getRoom().nextRoomOver("north",place.x,place.y).locks.south;
				}
				return {text:"***CLICK***", result: true};
			}else{
				return {text:"Ummmm...sooooo...you can't lock a wall. Just thought you should know that.", result: false};
			}
		}
		
		
		else if(direction == "south"){
			//south lock
			if(player.getRoom().doors.south){
				player.getRoom().locks.south = !player.getRoom().locks.south;
				if(player.getRoom().nextRoomOver("south",place.x,place.y) != null){
					player.getRoom().nextRoomOver("south",place.x,place.y).locks.north = !player.getRoom().nextRoomOver("south",place.x,place.y).locks.north;
				}
				return {text:"***CLICK***", result: true};
			}else{
				return {text:"Ummmm...sooooo...you can't lock a wall. Just thought you should know that.", result: false};
			}
		}
		
		
		else if(direction == "east"){
			//east lock
			if(player.getRoom().doors.east){
				player.getRoom().locks.east = !player.getRoom().locks.east;
				if(player.getRoom().nextRoomOver("east",place.x,place.y) != null){
					player.getRoom().nextRoomOver("east",place.x,place.y).locks.west = !player.getRoom().nextRoomOver("east",place.x,place.y).locks.west;
				}
				return {text:"***CLICK***", result: true};
			}else{
				return {text:"Ummmm...sooooo...you can't lock a wall. Just thought you should know that.", result: false};
			}	
		}
		
		
		if(direction == "west"){
			//west lock
			if(player.getRoom().doors.west){
				player.getRoom().locks.west = !player.getRoom().locks.west;
				if(player.getRoom().nextRoomOver("west",place.x,place.y) != null){
					player.getRoom().nextRoomOver("west",place.x,place.y).locks.east = !player.getRoom().nextRoomOver("west",place.x,place.y).locks.east;
				}
				return {text:"***CLICK***", result: true};
			}else{
				return {text:"Ummmm...sooooo...you can't lock a wall. Just thought you should know that.", result: false};
			}
		}
		
	}
	
	var changeType = function(type){
		var staticType = type;
		
		return function(player){
			//console.log(staticType.getName())
			types = player.getTypes();
			
			if(types.length>=3){
				types.splice(0,1);
			}
			types.push(staticType);
			player.setTypes(types);
			console.log(types.length);
			return {text: "You have changed your type to "+type.getName(), result: true}
		}
		
	}
		
	var stealPower = function(player){
		if(player.getRoom().getEnemy() != null && player.getATKnames.length < 5){
			var ATK =player.getRoom().getEnemy().getAttack();
			player.addAttack(ATK);
			return{text: ATK.getName() + " was gained", result: true }
		}else{
			return {text:"Nothing was gained", result: false};
		}
		
	}
		
	
	//<----------------------------------actual items----------------------------------------------------------------->
	 
	var item = function(){
		var uses = 1;
		this.functions=[];
		this.type;
		this.name = "";

		
		this.use = function(player){
			used = true;
			var text = "";
			_.each(this.functions,function(doIt){
				check = doIt(player);
				if(!check.result){
					used = false;
				}
				text+=check.text+"\n";
			});
			if(used){
				uses-=1;
			}
			return text;
		}
		
		this.changeUses=function(t){
			uses = t;
		}
		
		this.checkExpire = function(){
			if(uses<1){
				return true;
			}else{
				return false;
			}
		}
		
		
	}
	
	this.createPotion = function(){
		var core = new item();
		
		core.type = "potion";
		
		
		chance = Math.floor(Math.random()*3);
		
		if(chance == 0){
			core.name = "Health Potion";
			var intensity = Math.floor(Math.random()*50)+1;
			core.functions.push(healHealth(intensity));
			if(intensity<15){
				core.name = "Lesser "+core.name;
			}else if(intensity>35){
				core.name = "Greater "+core.name;
			}
		}
		
		if(chance == 1){
			core.name = "Mana Potion";
			var intensity = Math.floor(Math.random()*50)+1;
			core.functions.push(healMana(intensity));
			if(intensity<15){
				core.name = "Lesser "+core.name;
			}else if(intensity>35){
				core.name = "Greater "+core.name;
			}
		}
		
		if(chance == 2){
			core.name = "Vitality Potion";
			var intensity = Math.floor(Math.random()*50)+1;
			core.functions.push(healVitality(intensity));
			if(intensity<15){
				core.name = "Lesser "+core.name;
			}else if(intensity>35){
				core.name = "Greater "+core.name;
			}
		}
		
		//console.log(core.functions[0] + "-------------"+ core.functions[0].n);
		return core;
	}
	
	
	this.createKey = function() {
		var core = new item();
		
		core.type = "Special";
		core.name = "Key";
		
		core.functions.push(unlockDoor);
		
		return core;
	}
	
	this.createDrink = function(){
		var names = [["water", "soda", "energy drink", "goblin tears"],
		             ["milk","electrolyte solution","experimental nanite infusion","orphan tears"],
		             ["smoothie","vitamin-enriched smoothie","experimental vitamin-enriched nanite smoothie","fairy tears"],
		             ["oger blood","human blood", "vampire blood","unicorn blood and tears"]];
		
		var key1 = Math.floor(Math.random()*100);
		if(key1<50){
			key1=0;
		}else if(key1>=50 && key1<80){
			key1=1;
		}else if(key1>=80 && key1<95){
			key1=2;
		}else{
			key1=3;
		}
		
		var key2 = Math.floor(Math.random()*100);
		if(key2<50){
			key2=0;
		}else if(key2>=50 && key2<80){
			key2=1;
		}else if(key2>=80 && key2<95){
			key2=2;
		}else{
			key2=3;
		}
		
		var core = new item();
		
		core.name = names[key1][key2];
		core.type= "drink";
		core.functions.push(healVitality(5*key1+1+Math.floor(Math.random()*9)));
		core.functions.push(healMana(5*key2+1+Math.floor(Math.random()*9)));
		
		var size = Math.floor(Math.random()*100);
		if(size<84){
			core.changeUses(1);
			core.name= "small "+core.name;
		}else if(size>=84 && size<94){
			core.changeUses(2);
			core.name= "medium "+core.name;
		}else if(size>=94 && size<99){
			core.changeUses(3);
			core.name ="large "+core.name;
		}else{
			core.changeUses(4);
			core.name ="huge sip "+core.name;
		}
		
		return core;
	}
	
	this.createFood = function(){
		var names = [["chicken nugget", "chicken breast", "whole roast chicken", "leviathan fillet"],
		             ["slider","ham sandwich","turkey panini","9-headed hydra steak"],
		             ["soy-kale nugget","grilled-cheese sandwich","pheonix egg omlet","kracken fillet"],
		             ["dragon nugget","dragon burger", "dragon ribs","dragon steak"]];
		
		var key1 = Math.floor(Math.random()*100);
		if(key1<50){
			key1=0;
		}else if(key1>=50 && key1<80){
			key1=1;
		}else if(key1>=80 && key1<95){
			key1=2;
		}else{
			key1=3;
		}
		
		var key2 = Math.floor(Math.random()*100);
		if(key2<50){
			key2=0;
		}else if(key2>=50 && key2<80){
			key2=1;
		}else if(key2>=80 && key2<95){
			key2=2;
		}else{
			key2=3;
		}
		
		var core = new item();
		
		core.name = names[key1][key2];
		core.type= "food";
		var k1_intenisty=
		core.functions.push(healVitality(5*key1+1+Math.floor(Math.random()*9)));
		core.functions.push(healHealth(5*key2+1+Math.floor(Math.random()*9)));
		
		var size = Math.floor(Math.random()*100);
		if(size<84){
			core.changeUses(1);
			core.name= "small "+core.name;
		}else if(size>=84 && size<94){
			core.changeUses(2);
			core.name= "medium "+core.name;
		}else if(size>=94 && size<99){
			core.changeUses(3);
			core.name ="large "+core.name;
		}else{
			core.changeUses(4);
			core.name ="family sized "+core.name;
		}
		
		return core;
	}
	
	this.createIdol = function(type){
		core = new item();
		if(type == null){
			type = _.sample(elements);
			core.functions.push(changeType(type));
			
		}else{
			core.functions.push(changeType(type));
			
		}
		
		core.type = "Idol";
		core.name = "Idol";
		
		core.name = type.getName()+ " "+core.name;
		core.name = core.name[0].toUpperCase() + core.name.slice(1);
		
		return core;
		
	}
	
	this.createMirror = function(){
		core = new item;
		
		core.functions.push(stealPower);
		
		core.type = "Special";
		core.name ="Mystic Mirror";
		
		return core;
		
	}
	
	return this;

});

