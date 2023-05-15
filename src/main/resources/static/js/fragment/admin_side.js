
function mainMenu(menuCode, menuUrl){

	location.href=`/admin${menuUrl}?menuCode=${menuCode}`;
	alert(menuUrl);
	alert(menuCode);
	
	
}

function subMenu(subMenuCode, subMenuUrl, menuCode){
	location.href=`/admin${subMenuUrl}?menuCode=${menuCode}`;
	// subMenuCode=${subMenuCode} 
	alert(menuUrl);
	alert(menuCode);
}



