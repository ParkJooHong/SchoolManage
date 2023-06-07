

// 알림창 오른쪽 아래 정렬
toastr.options.positionClass = 'toast-bottom-right';
toastr.options.rtl = true;

toastr.options.progressBar = true;

window.onload = function(){
	
	var memName = document.querySelector('.memName').value;
	
	alert(memName);
}

function alert(memName){
	toastr.options.escapeHtml = true;
    toastr.options.closeButton = true;
    toastr.options.newestOnTop = false;
    toastr.options.progressBar = true;
    toastr.info(`!${memName}님`, `환영합니다`, {timeOut: 5000});	
}
