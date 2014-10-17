
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
		health_use = Math.floor(Math.random()*11);
	}
	if(use_chance<19){
		vitality_use =Math.floor(Math.random()*31);
	}
	if(use_chance>11 && use_chance<28){
		mana_use = Math.floor(Math.random()*21);
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
	
	this.effectiveRatio = function(){
			var cost = (3*health_use+1.5*mana_use+vitality_use)/45;
			var enchancer= accuracy/100*(1+0.5*(chance_extra/100));
			//console.log("cost: "+cost);
			//console.log("enchancer: "+enchancer);
			return enchancer/cost;
	}
	
	this.statReduce =function(player){
		player.statAdjust(health_use, mana_use, vitality_use);
	}
	
	
}


var ability = function(T, goal){
	
	var type = T;
	//console.log(goal);
	
	var style = _.sample(fight_styles);
	//console.log(style.effectiveRatio());
	var name = type.getDescriptor()+ " "+style.name;
	var power = Math.floor((goal-10+Math.floor(Math.random()*20))/(style.effectiveRatio()));
	//console.log(power);
	
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
	
}

var fight_styles = [
new fight_style("physiq","Punch"),
new fight_style("intellegence","Blast"),
new fight_style("senses","Breath"),
new fight_style("physiq","Kick"),
new fight_style("intellegence","Force"),
new fight_style("senses","Stare")
];

allbilities ={};




