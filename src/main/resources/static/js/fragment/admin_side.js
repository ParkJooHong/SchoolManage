
function moveByMenuCode(menuCode, menuUrl){

	location.href=`/admin${menuUrl}?subMenuCode=${menuCode}`;

	
	
}

function moveBySubMenuCode(subMenuCode,subMenuUrl){
	location.href=`/admin${subMenuUrl}?subMenuCode=${subMenuCode}`;
}



