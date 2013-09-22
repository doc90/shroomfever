/*
	SHROOM FEVER - ©2013
	    by ildoc.it
	Some rights reserved
*/

DEBUG=true;

Game={};

Game.Launch=function() {
	
	Game.Init=function(){ //initialize stuff
		Game.version=0.1;
		
		Game.shrooms=0;
		Game.totalshrooms=0;
		
		Game.multiplier=0;
		Game.updateshop=true;
		
		Game.shroomnado=false;
		Game.shroomnadotime=0;
		
		//buildings
		Game.slaves=0;
		Game.slavecost=10;
		
		Game.harvesters=0;
		Game.harvestercost=100;
		
		Game.magnets=0;
		Game.magnetcost=1000;
		
		setInterval(function() {Game.Tick();},100);
		setInterval(function() {Game.Phrases();},10000);
		document.getElementById("version").innerHTML=Game.version;	
		
		Game.Phrases();
	};
	
	Game.CostFunction=function(initialcost,howmany){ //set the curve of costs
		return initialcost + Math.pow(2,howmany);		
	};
	
	Game.Pick=function() { //click click click
		Game.shrooms+=1+(1*Game.multiplier);
		Game.totalshrooms+=1+(1*Game.multiplier);
		Game.updateshop=true;
	};
		
	Game.Shop=function() { //magage shops buttons
		Game.Setupgradecosts();
		shopcode='';
		if (Game.totalshrooms>=10) {
				shopcode+='<input type="button" value="Slave - ' + Game.slavecost + '" onclick="Game.Buy(\'slave\')"';
				if (Game.shrooms<Game.slavecost)
					shopcode+="disabled";
				shopcode+=" /> - " + Game.slaves + "<br />";
		}
		if (Game.totalshrooms>=100) {
				shopcode+='<input type="button" value="Harvester - ' + Game.harvestercost + '" onclick="Game.Buy(\'harvester\')"';
				if (Game.shrooms<Game.harvestercost)
					shopcode+="disabled";
				shopcode+=" /> - " + Game.harvesters + "<br />";
		}
		if (Game.totalshrooms>=1000) {
				shopcode+='<input type="button" value="Shroom Magnet - ' + Game.magnetcost + '" onclick="Game.Buy(\'magnet\')"';
				if (Game.shrooms<Game.magnetcost)
					shopcode+="disabled";
				shopcode+=" /> - " + Game.magnets + "<br />";
		}
		
		document.getElementById("shop").innerHTML=shopcode;	
	};
	
	Game.Setupgradecosts = function() { //sets shop's prices
		Game.slavecost=Game.CostFunction(10,Game.slaves);
		Game.harvestercost=Game.CostFunction(100,Game.harvesters);
		Game.magnetcost=Game.CostFunction(1000,Game.magnets);
	};
	
	Game.Buy = function(what) {
		Game.Setupgradecosts();
		switch(what) {
			case 'slave':
				Game.slaves+=1;
				Game.shrooms-=Game.slavecost;
				break;
			case 'harvester':
				Game.harvesters+=1;
				Game.shrooms-=Game.harvestercost;
				break;
			case 'magnet':
				Game.magnets+=1;
				Game.shrooms-=Game.magnetcost;
				break;
		}
		Game.Shop();
	};
	
	Game.Tick = function() {
		add=0;
		if (Game.slaves>0){
			add+=Game.slaves * 0.1;
		}
		if (Game.harvesters>0){
			add+=Game.harvesters * 2;
		}
		if (Game.magnets>0){
			add+=Game.magnets * 100;
		}
				
		Game.shrooms+=add/10;
		document.getElementById("shrooms").innerHTML=Math.floor(Game.shrooms) + " shrooms";
		document.getElementById("sps").innerHTML=add + " SpS";
		if(Game.updateshop)
			Game.Shop();
		Game.updateshop=false;	
	};
	
	
	Game.Phrases=function() {
		phrases=new Array();
		phrases.push("Ninja dwarves picking shrooms? Totally legit.");
		phrases.push("Screw smurfs. We're dwarves. NINJA DWARVES.");
		
		if(Game.slaves>0){
			phrases.push("You bought some slaves. That's racist!");
		}
		if(Game.harvesters>0){
			phrases.push("CHOO CHOO MOTHERFUCKERS!");
		}
		if(Game.magnets>0){
			phrases.push("Fuckin' magnets, how do they work?");
		}
		
		i=Math.floor(Math.random()*phrases.length);
		document.getElementById("phrase").innerHTML=phrases[i];
		
	};
	
	Game.ShroomNado=function(time) { //wtf
		i=0;
		colors=Array("Blue","Lime","Magenta","OrangeRed","Yellow");
		document.getElementById("main").className="fuzz";
		var fuzz = setInterval(function() {
			document.body.style.backgroundColor=colors[i];
			if(i==colors.length) 
				i=0;
			else
				i+=1;
		}, 30);
		
		setTimeout(function() {
			clearInterval(fuzz);
			document.body.style.backgroundColor="White";
			document.getElementById("main").className="";
		}, time*1000);
	};
	
};

Game.Launch();


if(!DEBUG){
	window.onbeforeunload = confirmExit;
}

function confirmExit() {
    return "### Warning! ###\n\nYou're leaving this page!\nThere's no save function yet so you'll lose all your shrooms, are you sure you want to exit this page?";
}




