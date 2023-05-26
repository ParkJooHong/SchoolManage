function returnManage(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	alert(menuCode);
	alert(subMenuCode);
	
	let ingStatus = document.querySelector('.ingStatus').value;
	alert(stuStatus);
	alert(ingStatus);
	if(ingStatus == 0 && stuStatus == '재학'){
		$.ajax({
			url: '/stuMenu/returnManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
			success: function(result) {
				if(result == 20230005){
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
	}else if(ingStatus == 0 && stuStatus == '휴학'){
		swal("실패", "말이안되는 상태입니다", "error");
	}
	else if(ingStatus == '승인완료' && stuStatus == '휴학'){
		$.ajax({
			url: '/stuMenu/returnManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus , 'menuCode' : menuCode, 'subMenuCode' : subMenuCode}, //필요한 데이터
			success: function(result) {
				
				const menuCode = result['menuCode'];
				ingStatus = result['ingStatus'];
				alert(ingStatus);
				
				if(ingStatus == "승인완료"){
					swal("신청 완료!", "복학 신청이 완료되었습니다.", "success");
					setTimeout(function() {
						location.reload();
						}, 500);					
				}
				else{
					swal("실패", "이미 신청이 접수되었습니다.", "error");
				}
			},
			error: function() {
				alert('실패');
				
			}
		});
	}
	else if(ingStatus == '승인대기' && stuStatus == '휴학'){
		swal("실패", "이미 신청이 접수되었습니다.", "error");
	}
	else if(ingStatus == '승인완료' && stuStatus == '재학'){
		swal("실패", "이미 재학중인 상태입니다", "error");
	}
	else{
		swal("실패", "이미 처리중인 신청이 있습니다.", "error");
	}
	
}
