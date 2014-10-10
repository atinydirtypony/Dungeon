
var elements ={};
	
var element = function(id, rooms, monstersNames, descript, colorhex){
	var name = id;
	var roomNames=rooms;
	var monsters =monstersNames;
	var descriptors = descript;
	var color = colorhex;
		
	var crossElements ={};
		

	
	this.getRoom = function(){return _.sample(roomNames)}
	
	this.getMonster = function(kind){return monsters[kind];}
	
	this.getDescriptor = function(){return _.sample(descriptors);}
	
	this.getColor = function(){
		console.log(color)
		return "#"+color;
		}
	
	elements[name]=this;
}

	
var fire = new element( "fire", ["Coal Room", "Lake of Fire", "Kitchen"], {fighter:"Pheonix",balanced:"Fire Giant",sensor:"Lava Blob", mental:"Pyrokineticist"}, ["Fiery", "BLazing", "Burning"], "FF0000");

var water = new element( "water", ["Pool", "Fountain Room", "Bathroom"], {fighter:"Squid",balanced:"Water Giant",sensor:"Living Water", mental: "Jar Whale"}, ["Watery", "Wet", "Slippery"], "0033CC");
var earth = new element( "earth", ["Cave", "Mine", "Ancient Ruins"], {fighter:"Golem",balanced:"Earth Giant",sensor:"Crystaline Being", mental: "Weeping Statue"}, ["Rocky", "Crystal", "Dirty"], "3D1F00");
var air = new element( "air", ["Wind Tunnel", "Sky Tower", "Solid CLouds"], {fighter:"Sky Dragon",balanced:"Air Giant",sensor:"Living Tornadow", mental:"Whispy Woman"}, ["Breezey", "Fluffy", "Floating"], "E0B2FF");
var light = new element("light", [ "Church", "Meditation Circle" , "Chapple"],{fighter:"Monk" , balanced:"Angel" , sensor:"Saint" , mental:"Priest" }, [ "Holy" , "Anointed" , "Blessed" ], "FFFFCC");
var shadow = new element("shadow", [ "Sacraficial Alter", "Blood Stone Circle", "Dungeon"],{fighter:"Murderer" , balanced:"Demon" , sensor:"Nightmare" , mental:"Slenderman" }, [ "Evil", "Unholy", "Cursed"], "3E1963");

var machine = new element( "machine", [ "Clockwork Tower", "Fabrication Shop", "Factory"], {fighter: "Tank", balanced: "Cyborg", sensor: "Sentry-bot" , mental: "Cyber-Brain"}, [ "Robotic", "Metalic", "Cyber"], "B2B2CC");
var chemical = new element( "chemical", [ "Chemical Plant", "Laboratory", "Apothacary"], {fighter: "Sluge Beast", balanced: "Escaped Experiment", sensor: "Toxic Cloud" , mental: "Living Pollution" }, [ "Venomous", "Poisonous" , ""], "990033");
var energy = new element( "energy", [ "Power Plant", "High Voltage Area" , "Reactor"], {fighter: "Living Lightning", balanced: "Cosmic Traveller", sensor: "Static Mouse", mental: "Living Star"}, [ "Powered", "Energized", "Electric"], "FFA319");

var martial = new element( "martial", [ "Dojo", "Boxing Ring", "Back Alley"], {fighter: "Boxer", balanced: "Kung Fu Master", sensor: "Street Fighter", mental: "Kung Fu Master" }, [ "Strong","Scrappy" , "Tough"], "8F0000");
var mental = new element( "mental", [ "Library", "Study", "University"], {fighter: "Warlock", balanced: "Wizard", sensor: "Witch", mental: "Psychic"}, [ "Smart", "Magical", "Intellegent"], "000066");
var stealth = new element( "stealth", [ "Hidden Passage", "Panic Room", "Crawlspace"], {fighter: "Ninja", balanced: "Invisible Man", sensor: "Hunter", mental:"Spy" }, [ "Sneaky", "Stealthy", "Deceptive"], "7A5C00");


var plant = new element( "plant", [ "Garden", "Arbory", "Park"], {fighter: "Whip Vine", balanced: "Tree", sensor: "", mental: "Carnivorous Flower"}, [ "Floral", "Photosynthesizing", "Mossy"], "66FF66");
var animal = new element( "animal", [ "Kennels", "Animal Den", "Nest"], {fighter: "Wolf", balanced: "Snake", sensor: "Vulture", mental: "Kitty"}, [ "Furry", "Scaley", "Feathered"], "A37F66");
var human = new element( "human", [ "Bedroom", "Cottage", "Livingroom"], {fighter: "Bro", balanced: "Villager", sensor: "Receptionist", mental: "Geek"}, [ "Human Arms and Huamn Legs on a", "Humanoid", "Normal"], "CCFFFF");

var undead = new element( "undead", [ "Graveyard", "Morgue", "Haunted House"], {fighter: "Zombie", balanced: "Lich", sensor: "Ghost", mental: "Vampire"}, [ "Rotted", "Putrid", "Decomposing"], "ADD633");
var sylven = new element( "sylven", [ "Toadstool Ring", "Mystic Pond", "Magic Forest"], {fighter: "Faun", balanced: "Erlking", sensor: "Nymph" , mental: "Pixie"}, [ "Fey", "Elfin", "Whimsical"], "FFCCFF");
var alien = new element( "alien", [ "Spaceship", "Flying Saucer", "Space Station"], {fighter: "Reptoids" , balanced: "Tentacle Monster" , sensor: "Taco" , mental: "Little Green Men" }, [ "Tentacular", "Strange", "Unusual"], "9999FF");

//console.log(_.keys(elements));
/*_.each(elements, function(thing){
	
	console.log(thing.getRoom());
});*/
//console.log(elements.fire.getRoom());