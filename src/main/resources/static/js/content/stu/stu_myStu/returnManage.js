function returnManage(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	alert(memNo);
	alert(stuStatus);
	alert(applyReason);
	
	$.ajax({
			url: '/stuMenu/returnManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason}, //필요한 데이터
			success: function(result) {
				if(result != 9999){
					alert('복학 신청이 완료 되었습니다.');
				}
				else{
					alert('중복체크 미구현');
				}
			},
			error: function() {
				alert('실패');
				
			}
		});
}
