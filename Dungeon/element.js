
var elements ={};
	
var element = function(id, rooms, monstersNames, descript, colorhex){
	var name = id;
	var roomNames=rooms;
	var monsters =monstersNames;
	var descriptors = descript;
	var color = colorhex;
		
	var crossElements ={};
		
	this.getName = function(){return name;}
	
	this.getRoom = function(){return _.sample(roomNames);}
	
	this.getMonster = function(kind){return monsters[kind];}
	
	this.getDescriptor = function(){return _.sample(descriptors);}
	
	this.getColor = function(){
		console.log(color)
		return "#"+color;
		}
	
	elements[name]=this;
	
	this.setCross = function(types, multi){
		crossElements = _.object(types, multi);
	}
	
	this.getCross= function(other){
		multiplier =crossElements[other];
		if(multiplier == null){
			multiplier =1;
		}
		return multiplier;
	}
}

	
var fire = new element( "fire", ["Coal Room", "Lake of Fire", "Kitchen"], {fighter:"Pheonix",balanced:"Fire Giant",sensor:"Lava Blob", mental:"Pyrokineticist"}, ["Fiery", "Blazing", "Burning"], "FF0000");
elements.fire.setCross(["water", "human", "earth", "fire"],[2,2,0.5,0.5]);

var water = new element( "water", ["Pool", "Fountain Room", "Bathroom"], {fighter:"Squid",balanced:"Water Giant",sensor:"Living Water", mental: "Jar Whale"}, ["Watery", "Wet", "Slippery"], "0033CC");
elements.water.setCross(["air", "plant", "fire", "water"],[2,2,0.5,0.5]);


var earth = new element( "earth", ["Cave", "Mine", "Ancient Ruins"], {fighter:"Golem",balanced:"Earth Giant",sensor:"Crystaline Being", mental: "Weeping Statue"}, ["Rocky", "Crystal", "Dirty"], "3D1F00");
elements.earth.setCross(["fire", "chemical", "air", "earth"],[2,2,0.5,0.5]);


var air = new element( "air", ["Wind Tunnel", "Sky Tower", "Solid Clouds"], {fighter:"Sky Dragon",balanced:"Air Giant",sensor:"Living Tornadow", mental:"Whispy Woman"}, ["Breezey", "Fluffy", "Floating"], "E0B2FF");
elements.air.setCross(["earth", "machine", "water", "air"],[2,2,0.5,0.5]);


var light = new element("light", [ "Church", "Meditation Circle" , "Chapel"],{fighter:"Monk" , balanced:"Angel" , sensor:"Saint" , mental:"Priest" }, [ "Holy" , "Anointed" , "Blessed" ], "FFFFCC");
elements.light.setCross(["shadow", "light"],[2,0.5]);


var shadow = new element("shadow", [ "Sacraficial Alter", "Blood Stone Circle", "Dungeon"],{fighter:"Murderer" , balanced:"Demon" , sensor:"Nightmare" , mental:"Slenderman" }, [ "Evil", "Unholy", "Cursed"], "3E1963");
elements.shadow.setCross(["light", "shadow"], [2,0.5]);


var machine = new element( "machine", [ "Clockwork Tower", "Fabrication Shop", "Factory"], {fighter: "Tank", balanced: "Cyborg", sensor: "Sentry-bot" , mental: "Cyber-Brain"}, [ "Robotic", "Metalic", "Cyber"], "B2B2CC");
elements.machine.setCross(["martial", "stealth", "human", "water", "light","shadow"],[2,2,2,2,0,0]);


var chemical = new element( "chemical", [ "Chemical Plant", "Laboratory", "Apothacary"], {fighter: "Sluge Beast", balanced: "Escaped Experiment", sensor: "Toxic Cloud" , mental: "Living Pollution" }, [ "Venomous", "Poisonous" , ""], "990033");
elements.chemical.setCross(["animal", "undead", "alien", "fire", "light","shadow"],[2,2,2,2,0,0]);


var energy = new element( "energy", [ "Power Plant", "High Voltage Area" , "Reactor"], {fighter: "Living Lightning", balanced: "Cosmic Traveller", sensor: "Static Mouse", mental: "Living Star"}, [ "Powered", "Energized", "Electric"], "FFA319");
elements.energy.setCross(["mental", "sylven", "plant", "earth", "light","shadow"],[2,2,2,2,0,0]);


var martial = new element( "martial", [ "Dojo", "Boxing Ring", "Back Alley"], {fighter: "Boxer", balanced: "Kung Fu Master", sensor: "Street Fighter", mental: "Kung Fu Master" }, [ "Strong","Scrappy" , "Tough"], "8F0000");
elements.martial.setCross(["mental", "stealth"],[2,0.5]);


var mental = new element( "mental", [ "Library", "Study", "University"], {fighter: "Warlock", balanced: "Wizard", sensor: "Witch", mental: "Psychic"}, [ "Smart", "Magical", "Intellegent"], "000066");
elements.mental.setCross(["stealth", "martial"],[2,0.5]);


var stealth = new element( "stealth", [ "Hidden Passage", "Panic Room", "Crawlspace"], {fighter: "Ninja", balanced: "Invisible Man", sensor: "Hunter", mental:"Spy" }, [ "Sneaky", "Stealthy", "Deceptive"], "7A5C00");
elements.stealth.setCross(["martial", "mental"],[2,0.5]);


var plant = new element( "plant", [ "Garden", "Arbory", "Park"], {fighter: "Whip Vine", balanced: "Tree", sensor: "", mental: "Carnivorous Flower"}, [ "Floral", "Photosynthesizing", "Mossy"], "66FF66");
elements.plant.setCross(["shadow", "chemical", "light", "energy"],[2,2,0.5,0.5]);


var animal = new element( "animal", [ "Kennels", "Animal Den", "Nest"], {fighter: "Wolf", balanced: "Snake", sensor: "Vulture", mental: "Kitty"}, [ "Furry", "Scaley", "Feathered"], "A37F66");
elements.animal.setCross(["light", "machine", "human", "plant", "air"],[2,2,2,0.5,0]);


var human = new element( "human", [ "Bedroom", "Cottage", "Livingroom"], {fighter: "Bro", balanced: "Villager", sensor: "Receptionist", mental: "Geek"}, [ "Human Arms and Huamn Legs on a", "Humanoid", "Normal"], "CCFFFF");


var undead = new element( "undead", [ "Graveyard", "Morgue", "Haunted House"], {fighter: "Zombie", balanced: "Lich", sensor: "Ghost", mental: "Vampire"}, [ "Rotted", "Putrid", "Decomposing"], "ADD633");
elements.undead.setCross(["light", "undead", "machine", "shadow", "human"],[2,2,2,0.5,0]);

var sylven = new element( "sylven", [ "Toadstool Ring", "Mystic Pond", "Magic Forest"], {fighter: "Faun", balanced: "Erlking", sensor: "Nymph" , mental: "Pixie"}, [ "Fey", "Elfin", "Whimsical"], "FFCCFF");
elements.sylven.setCross(["shadow", "sylven", "plant","animal"],[2,2,0.5,0.5]);

var alien = new element( "alien", [ "Spaceship", "Flying Saucer", "Space Station"], {fighter: "Reptoids" , balanced: "Tentacle Monster" , sensor: "Taco" , mental: "Little Green Men" }, [ "Tentacular", "Strange", "Unusual"], "9999FF");
elements.alien.setCross(["alien","fire","earth","air","water", "human","machine","chemical","energy","animal"],[2,2,2,2,2,0.5,0.5,0.5,0.5,0.5]);


//console.log(_.keys(elements));

_.each(elements, function(thing){
	_.each(elements, function(othing){
		print = "";
		print+= thing.getName() + " ===> "+ othing.getName() +": ";
		print+= thing.getCross(othing.getName());
		console.log(print);
		
		
	});
});
//console.log(elements.fire.getRoom());