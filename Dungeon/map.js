var map = function(player, floor){
	var visualMap = ["","","","","","","","","","","","","","","","","","","",""];
	var centerLocation = player.getLocation(); 
	
	for(h=0;h<5;h++){
		for(j=0;j<5;j++){
			/*for(z=0;z<visualMap.length;z++){
				console.log(visualMap[z]);
			}*/
			//console.log(floor.roomCheck(centerLocation.x-2+h,centerLocation.y-2+j));
			if(floor.roomCheck(centerLocation.x-2+h,centerLocation.y-2+j)){

				var current_room= floor.getRoom(centerLocation.x-2+h,centerLocation.y-2+j);
				//console.log(current_room.doors);
				
				if(current_room.doors.north){
					visualMap[j*4] = visualMap[j*4]+"  ||  ";
				}else{
					visualMap[j*4] = visualMap[j*4]+"      ";
				}
				
				if(current_room.doors.east){
					if(current_room.doors.west){
						visualMap[j*4+1] = visualMap[j*4+1]+"-[##]-";
						visualMap[j*4+2] = visualMap[j*4+2]+"-[##]-";
					}else{
						visualMap[j*4+1] = visualMap[j*4+1]+" [##]-";
						visualMap[j*4+2] = visualMap[j*4+2]+" [##]-";
					}
				}else{
					if(current_room.doors.west){
						visualMap[j*4+1] = visualMap[j*4+1]+"-[##] ";
						visualMap[j*4+2] = visualMap[j*4+2]+"-[##] ";
					}else{
						visualMap[j*4+1] = visualMap[j*4+1]+" [##] ";
						visualMap[j*4+2] = visualMap[j*4+2]+" [##] ";
					}
				}
				
				if(current_room.doors.south){
					visualMap[j*4+3] = visualMap[j*4+3]+"  ||  ";
				}else{
					visualMap[j*4+3] = visualMap[j*4+3]+"      ";
				}
				
			}else{
				visualMap[j*4] = visualMap[j*4]+"      ";
				visualMap[j*4+1] = visualMap[j*4+1]+"      ";
				visualMap[j*4+2] = visualMap[j*4+2]+"      ";
				visualMap[j*4+3] = visualMap[j*4+3]+"      ";
				
			}
		}
	}
	

	return visualMap;
}
