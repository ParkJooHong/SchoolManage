
function moveByMenuCode(menuCode, menuUrl){

	location.href=`/professor${menuUrl}?subMenuCode=${menuCode}`;

	
	
}

function moveBySubMenuCode(subMenuCode,subMenuUrl){
	location.href=`/professor${subMenuUrl}?subMenuCode=${subMenuCode}`;
}



