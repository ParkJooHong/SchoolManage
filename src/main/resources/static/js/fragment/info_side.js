
function mainMenu(menuCode, menuUrl){

	location.href=`/stuMenu${menuUrl}?menuCode=${menuCode}`;
	
	const change = document.querySelector('.submenuTd');
	
	change.style.backgroundColor = "#870119";
}

function subMenu(subMenuCode, subMenuUrl, menuCode){
	location.href=`/stuMenu${subMenuUrl}?menuCode=${menuCode}`;
	// subMenuCode=${subMenuCode} 
}
