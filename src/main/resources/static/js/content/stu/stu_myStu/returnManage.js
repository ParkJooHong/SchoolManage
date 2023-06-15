function returnManage(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	//alert(menuCode);
	//alert(subMenuCode);
	
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
	
	//alert(stuStatus);
	//alert(ingStatus);
	
	if(stuStatus == '제적'){
		swal.fire({
			title: "제적 상태입니다. 학과에 문의하세요.",
			icon: 'warning',
			button: '확인',
		});
						return;
	}
	
	if(ingStatus == '승인완료' && stuStatus == '재학'){
				swal.fire({
								title: "이미 재학중인 상태입니다",
								icon: 'warning',
								button: '확인',
							});
			}
	
	 if(ingStatus == 0 && stuStatus == '재학'){
				swal.fire({
								title: "이미 재학중인 상태입니다",
								icon: 'warning',
								button: '확인',
							});
				
	}else if(ingStatus == 0 && stuStatus == '휴학'){
		$.ajax({
			url: '/stuMenu/returnManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
			success: function(result) {
				swal.fire({
											title: "복학 신청이 완료되었습니다.",
											icon: 'success',
											button: '확인',
										});
				
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
				swal.fire({
								title: "이미 재학중인 상태입니다",
								icon: 'warning',
								button: '확인',
							});
				
			}else if(ingStatus == 0 && stuStatus == '휴학'){
				$.ajax({
					url: '/stuMenu/returnManageAjax', //요청경로
					type: 'post',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
					success: function(result) {
						swal.fire({
											title: "복학 신청이 완료되었습니다.",
											icon: 'success',
											button: '확인',
										});
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

						
						if(ingStatus == "승인완료"){
							swal.fire({
											title: "복학 신청이 완료되었습니다.",
											icon: 'success',
											button: '확인',
										});
							setTimeout(function() {
								location.reload();
								}, 500);					
						}
						else{
							swal.fire({
								title: "이미 신청이 접수되었습니다.",
								icon: 'warning',
								button: '확인',
							});
						}
					},
					error: function() {
						alert('실패');
						
					}
				});
			}
			else if(ingStatus == '승인대기' && stuStatus == '휴학'){
				swal.fire({
								title: "이미 신청이 접수되었습니다.",
								icon: 'warning',
								button: '확인',
							});
			}
			else if(ingStatus == '승인완료' && stuStatus == '재학'){
				swal.fire({
								title: "이미 재학중인 상태입니다.",
								icon: 'warning',
								button: '확인',
							});
			}
			else{
				swal.fire({
								title: "제적 중인 상태입니다",
								icon: 'warning',
								button: '확인',
							});
		}
	} else {
	  // 실행하지 않을 경우에 대한 코드 작성
		swal.fire({
								title: "이미 처리중인 상태입니다.",
								icon: 'warning',
								button: '확인',
							});
	}
	
	
	
}


function plus(memNo, memName, stuYear, stuStatus, collName, deptName){
	const button = document.querySelector('.plus');
	const table = document.querySelector('.tableAdd');
	
	let union;
	const processStatus = document.querySelector('.processStatus');
	let doubleCollName;
	let doubleDeptName;
	
	if(processStatus && processStatus.value === '승인완료'){
		doubleDeptName = document.querySelector('.doubleDeptName').value;
		doubleCollName = document.querySelector('.doubleCollName').value;
	}else{
		doubleDeptName = '해당없음';
		doubleCollName = '해당없음'
	}
	
	if(deptName == '간호학과' || deptName == '유아교육학과'){
		union = '유';
	}else{
		union = '무';
	}
	
	const pOrm = button.textContent;

	button.textContent = '';
	table.textContent= '';

	let str = '';
	let str2 ='';
	if(pOrm=='+')
	{
		str +='-';
		str2 +=`<table border="3" style="border-color: red;" class="default_info">`;
		str2 +=`	<tr>`;
		str2 +=`	<td>학번</td>`;
		str2 +=`	<td><input type="text" readonly value="${memNo}"></td>`;
		str2 +=`	<td>성명</td>`;
		str2 +=`	<td><input type="text" readonly value="${memName}"></td>`;
		str2 +=`	<td>학년</td>`;
		str2 +=`	<td><input type="text" readonly value="${stuYear}"></td>`;
		str2 +=`	<td>학적상태</td>`;
		str2 +=`	<td><input type="text" readonly value="${stuStatus}"></td>`;
		str2 +=`</tr>`;
		str2 +=`<tr>`;
		str2 +=`	<td>학과</td>`;
		str2 +=`	<td><input type="text" readonly value="${collName}"></td>`;
		str2 +=`	<td>전공</td>`;
		str2 +=`	<td><input type="text" readonly value="${deptName}"></td>`;
		str2 +=`	<td>복수전공학과</td>`;
		str2 +=`	<td><input type="text" readonly value="${doubleCollName}"></td>`;
		str2 +=`	<td>복수전공</td>`;
		str2 +=`	<td><input type="text" readonly value="${doubleDeptName}"></td>`;
		str2 +=`</tr>`;
		str2 +=`<tr>`;
		str2 +=`	<td>교직</td>`;
		str2 +=`	<td><input type="text" readonly value="${union}"></td>`;
		str2 +=`	<td>지도교수</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
		str2 +=`	<td></td>`;
		str2 +=`	<td></td>`;
		str2 +=`	<td></td>`;
		str2 +=`	<td></td>`;
		str2 +=`</tr>`;
		str2 +=`</table>`;
	}
	else
	{
		str +='+';
		str2 += `<table border="3" style="border-color: red;" class="default_info">`;
		str2 += `<tr>`;
		str2 += `<td>학번</td>`;
		str2 += `<td><input type="text" readonly value="${memNo}"></td>`;
		str2 += `<td>성명</td>`;
		str2 += `<td><input type="text" readonly value="${memName}"></td>`;
		str2 += `<td>학년</td>`;
		str2 += `<td><input type="text" readonly value="${stuYear}"></td>`;
		str2 += `<td>학적상태</td>`;
		str2 += `<td><input type="text" readonly value="${stuStatus}"></td>`;
		str2 += `</tr>`;
		str2 += `</table>`;
	}
	
	button.insertAdjacentHTML('afterbegin', str);
	table.insertAdjacentHTML('afterbegin', str2);
	
}