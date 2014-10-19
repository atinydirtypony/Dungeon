
var secondaryAbilites = function(){
	var effects = [];

	var damageVitality = function(attacker, defender, n){
		defender.statAdjust(0,0,-Math.floor(n/3));
	}
	effects.push({name: "Vitality Damage", use: damageVitality});
	
	var damageMana = function(attacker, defender, n){
		defender.statAdjust(0,-Math.floor(n/3),0);
		
	}
	effects.push({name: "Mana Damage", use: damageMana});
	
	var healthDrain= function(attacker, defender, n){
		
		attacker.statAdjust(Math.floor(n/5),0,0);

	}
	effects.push({name:"Health Drain", use: healthDrain});
	
	var vitalityDrain= function(attacker, defender, n){
		defender.statAdjust(0,0,-Math.floor(n/5));
		attacker.statAdjust(0,0,Math.floor(n/5));

	}
	effects.push({name:"Vitality Drain", use: vitalityDrain});
	
	var manaDrain= function(attacker, defender, n){
		defender.statAdjust(0,-Math.floor(n/5),0);
		attacker.statAdjust(0,Math.floor(n/5),0);

	}
	effects.push({name:"Mana Drain", use: manaDrain});

	
	
	
	//----------------------------------------------------------
	
	
	this.getEffect = function(){
		return _.sample(effects);
	}
	

}

var SEffects = new secondaryAbilites();
console.log(SEffects.getEffect().name);

//########################################################################################



var fight_style = function(attack_skill, attack_name){
	this.skill =attack_skill;
	this.name = attack_name;
	
	var accuracy = 50+5*Math.floor(Math.random()*10);
	var chance_extra = 5+Math.floor(Math.random()*45);
	
	var use_chance = Math.floor(Math.random()*29);
	
	var health_use =0;
	var vitality_use=0;
	var mana_use=0;
	
	if(use_chance%4 == 0){
		health_use = Math.floor(Math.random()*11)+1;
	}
	if(use_chance<19){
		vitality_use =Math.floor(Math.random()*31)+1;
	}
	if(use_chance>11 && use_chance<28){
		mana_use = Math.floor(Math.random()*21)+1;
	}
	
	//console.log(health_use+" "+mana_use+" "+vitality_use);
	
	this.checkHit =function(){
		var chance = 1+Math.floor(Math.random()*100);
		if(chance < accuracy){
			return true;
		}else{
			return false;
		}
	}
	
	this.checkExtra =function(){
		var chance = 1+Math.floor(Math.random()*100);
		if(chance < chance_extra){
			return true;
		}else{
			return false;
		}
	}
	
	this.getInfo = function(){
		return " ==> ( H:"+health_use+" M:"+mana_use+ " V:"+vitality_use+" ) \nAccuracy: "+accuracy+"\t Secondary Effect Chance: "+chance_extra;
	}
	
	this.effectiveRatio = function(){
			var cost = (4*health_use+3*mana_use+2*vitality_use)/60;
			var enchancer= accuracy/100*(1+0.5*(chance_extra/100));
			//console.log("cost: "+cost);
			//console.log("enchancer: "+enchancer);
			return enchancer/cost;
	}
	
	this.statReduce =function(player){
		if(player.getStats()[0].current > health_use && player.getStats()[1].current > mana_use && player.getStats()[2].current > vitality_use){
			console.log("H: "+ player.getStats()[0].current+ " M: "+ player.getStats()[1].current +" V: "+ player.getStats()[2].current);
			player.statAdjust(-health_use, -mana_use, -vitality_use);
			console.log("H: "+ player.getStats()[0].current+ " M: "+ player.getStats()[1].current +" V: "+ player.getStats()[2].current);
			return true;
		}else{
			return false;
		}
		
	}
	
	
}


//##########################################################

var ability = function(T, goal){
	
	var type = T;
	//console.log(goal);
	
	var style = _.sample(fight_styles);
	//console.log(style.effectiveRatio());
	var name = type.getDescriptor()+ " "+style.name;
	var power = Math.ceil((goal-10+Math.floor(Math.random()*20))/(style.effectiveRatio()));
	//console.log(power);
	
	var effect = SEffects.getEffect();
	
	this.getStyle =function(){
		return style;
	}
	
	this.getName = function(){
		return name;
	}
	
	this.getPower = function(){
		return power;
	}
	
	this.damageCalc=function(player1, player2, target){
		var skill1= player1.getSkills()[style.skill];
		console.log(target);
		var skill2 =player2.getSkills()[target];
		console.log("1: "+skill1);
		console.log("2: "+skill2);
		console.log("power: "+power);
		return Math.sqrt(Math.sqrt((skill1/skill2)))*power;
	}
	
	this.secondar = function(player1, player2,D){
		if(style.checkExtra()){
			effect.use(player1, player2,D);
			return true;
		}else{
			return false;
		}
	}
	
	this.getSecondar =function(){
		return effect.name;
	}
	
	this.getType = function(){
		return type;
	}
	
}

var fight_styles = [
new fight_style("physiq","Punch"),
new fight_style("intellegence","Blast"),
new fight_style("senses","Breath"),
new fight_style("physiq","Kick"),
new fight_style("intellegence","Force"),
new fight_style("senses","Stare"),
new fight_style("senses", "Scream"),
new fight_style("intellegence", "Prayer"),
new fight_style("physiq", "Thrust"),
new fight_style("senses", "Pulse"),
new fight_style("intellegence", "Field"),
new fight_style("physiq", "Slam"),
new fight_style("senses", "Goo"),
new fight_style("intellegence", "Experiment"),
new fight_style("physiq", "Upper-Cut"),
new fight_style("senses", "Smell"),
new fight_style("intellegence", "Telepathy"),
new fight_style("physiq", "Grab")
];

allbilities ={};



