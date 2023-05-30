
function mainMenu(menuCode, menuUrl){

	location.href=`/stuMenu${menuUrl}?menuCode=${menuCode}`;
	
	const change = document.querySelector('.submenuTd');
	
	change.style.backgroundColor = "#870119";
}

function subMenu(subMenuCode, subMenuUrl, menuCode){
	location.href=`/stuMenu${subMenuUrl}?menuCode=${menuCode}&subMenuCode=${subMenuCode} `;
	// subMenuCode=${subMenuCode} 
}

// 세션 시간
var x;
var time = 3600;

 x = setInterval(function(){
	
	
	var mm = "";
	var ss = "";
		
		
	mm = parseInt(time/60);
	ss = time % 60;
	
	document.getElementById("timer").innerHTML ='🕦' +  mm + ':' + ss;
	time --;
	
	if(time < 0){
		clearInterval(x);
		swal("세션 만료!", "세션이 만료되었습니다. \n 다시 로그인 해주세요. ", "error");
		setTimeout(function() {
			location.reload();
			location.href='/'
		}, 3000);
		
	}
	
	
}, 1000)

function resetTimer(){
	time = 3600;
}
