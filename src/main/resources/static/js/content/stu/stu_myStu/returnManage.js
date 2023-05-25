function returnManage(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	const ingStatus = document.querySelector('.ingStatus').value;
	
	if(ingStatus == '승인대기'){
		$.ajax({
			url: '/stuMenu/returnManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason}, //필요한 데이터
			success: function(result) {
				if(result != 9999){
					swal("신청 완료!", "복학 신청이 완료되었습니다.", "success");
					setTimeout(function() {
						location.reload();
						}, 500);
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
	else{
		swal("실패", "이미 처리중인 신청이 있습니다.", "error");
	}
	
}
