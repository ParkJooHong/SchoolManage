function returnManage(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	alert(menuCode);
	alert(subMenuCode);
	
	let ingStatusInputs = document.querySelectorAll('.ingStatus');

	let firstIngStatusInput = ingStatusInputs[0];

	let ingStatus = firstIngStatusInput.value;
	
	// 선택된 요소들을 순서대로 담을 배열을 생성합니다.
	let orderedValues = [];
		ingStatusInputs.forEach(function(input) {
	  		orderedValues.push(input.value);
		});
	ingStatus = orderedValues[0];
	//let ingStatusInputs = document.querySelectorAll('.ingStatus');
	
	// 마지막 .ingStatus 요소를 선택합니다.
	//let lastIngStatusInput = ingStatusInputs[ingStatusInputs.length - 1];
	
	// 마지막 .ingStatus 요소의 value 값을 추출합니다.
	//let ingStatus = lastIngStatusInput.value;
	
	alert(stuStatus);
	alert(ingStatus);
	if(ingStatus == '승인완료' && stuStatus == '재학'){
				swal("실패", "이미 재학중인 상태입니다", "error");
			}
	
	 if(ingStatus == 0 && stuStatus == '재학'){
				swal("실패", "이미 재학중인 상태입니다.", "error");
				
	}else if(ingStatus == 0 && stuStatus == '휴학'){
		$.ajax({
			url: '/stuMenu/returnManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
			success: function(result) {
				swal("신청 완료!", "복학 신청이 완료되었습니다.", "success");
				
					setTimeout(function() {
						location.reload();
						}, 500);
						
					
			},
			error: function() {
				alert('실패');
				
			}
		});
	}
			
	if(ingStatus == 0){
		return;
	}
		
	let shouldExecute = true
			
	ingStatusInputs.forEach(input => {
 	 if (input.value === '승인대기') {
	    shouldExecute = false;
		  }
	 });
	
	if (shouldExecute) {
			  if(ingStatus == 0 && stuStatus == '재학'){
				swal("실패", "이미 재학중인 상태입니다.", "error");
				
			}else if(ingStatus == 0 && stuStatus == '휴학'){
				$.ajax({
					url: '/stuMenu/returnManageAjax', //요청경로
					type: 'post',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
					success: function(result) {
						swal("신청 완료!", "복학 신청이 완료되었습니다.", "success");
							setTimeout(function() {
								location.reload();
								}, 500);
					},
					error: function() {
						alert('실패');
						
					}
				});
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
	} else {
	  // 실행하지 않을 경우에 대한 코드 작성
	 swal("실패", "이미 처리중인 신청이 있습니다.", "error");
	}
	
	
	
}
