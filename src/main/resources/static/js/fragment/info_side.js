
function mainMenu(menuCode, menuUrl){

	location.href=`/stuMenu${menuUrl}?menuCode=${menuCode}`;
	
	
}

function subMenu(subMenuCode, subMenuUrl, menuCode){
	location.href=`/stuMenu${subMenuUrl}?menuCode=${menuCode}`;
	// subMenuCode=${subMenuCode} 
}


