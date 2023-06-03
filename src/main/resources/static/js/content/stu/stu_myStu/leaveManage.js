
// 1. ㅈ ㅐ학인데 재학신청 불가
// 2. 휴학인데 휴학신청 불가
// 3. 신청중인 데이터 있으면 불가.
	// 신청자 학생 정보 조회 쿼리.
function leave(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	
	/*
	let ingStatusInputs = document.querySelectorAll('.ingStatus');

	// 가장 위에 있는 .ingStatus 요소를 선택합니다.
	let firstIngStatusInput = ingStatusInputs[0];
	
	// 가장 위에 있는 .ingStatus 요소의 value 값을 추출합니다.
	let ingStatus = firstIngStatusInput.value;
	*/
	// 모든 .ingStatus 클래스를 가진 요소를 선택합니다.
	let ingStatusInputs = document.querySelectorAll('.ingStatus');
	
	// 마지막 .ingStatus 요소를 선택합니다.
	let lastIngStatusInput = ingStatusInputs[ingStatusInputs.length - 1];
	
	// 마지막 .ingStatus 요소의 value 값을 추출합니다.
	let ingStatus = lastIngStatusInput.value;
	
	
	
	let shouldExecute = true;

	ingStatusInputs.forEach(input => {
	  if (input.value === '승인대기') {
	    shouldExecute = false;
	  }
	});
	
	if (shouldExecute) {
	 	if(applyReason.length == 0){
		swal("실패", "휴학 사유를 입력해주세요.", "error");
		}
		else{
			if(ingStatus == 0 && stuStatus == '재학'){	
				$.ajax({
					url: '/stuMenu/leaveManageAjax', //요청경로
					type: 'post',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode}, //필요한 데이터
					success: function(result) {
							swal("신청 완료!", "휴학 신청이 완료되었습니다.", "success");
							setTimeout(function() {
							location.reload();
							}, 500);
							return;
					},
					error: function() {
						alert('실패');
						
					}
				});
			}
			else if(ingStatus == '승인완료' && stuStatus == '재학'){
				$.ajax({
					url: '/stuMenu/leaveManageAjax', //요청경로
					type: 'post',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus}, //필요한 데이터
					success: function(result) {
		
							swal("신청 완료!", "휴학 신청이 완료되었습니다.", "success");
							setTimeout(function() {
							location.reload();
							}, 500);
		
					},
					error: function() {
						alert('실패');
						
					}
				});
			}
			else if(ingStatus == '승인대기' && stuStatus == '휴학'){
				swal("실패", "이미 휴학중인 상태입니다.", "error");
			}
			
			if(ingStatus == '승인완료' && stuStatus == '휴학'){
				swal("실패", "이미 휴학중인 상태입니다.", "error");
			}
			else if(ingStatus == '승인대기' && stuStatus == '재학'){
				swal("실패", "이미 처리중인 신청이 있습니다.", "error");
			}
			else{
				swal("실패", "이미 휴학중인 상태입니다.", "error");
			}
		}
	} 
	else {
	  swal("실패", "이미 처리중인 신청이 있습니다.", "error");
	}
	
	//alert(stuStatus);
	//alert(ingStatus);
	
	
	/*
	else if(ingStatus =='0'  && stuStatus == '휴학'){
		swal("실패", "이미 휴학중인 상태입니다.", "error");
	}
	
	
	
	else if(ingStatus == '승인완료' && stuStatus == '휴학'){
		swal("실패", "이미 휴학중인 상태입니다.", "error");
	}*/
	
	
}




function plus(memNo, memName, stuYear, stuStatus, collName, deptName){


	const button = document.querySelector('.plus');
	const table = document.querySelector('.tableAdd');
	
	let union;
	const processStatus = document.querySelector('.processStatus');
	let doubleCollName;
	let doubleDeptName;
	if(processStatus?.value == '승인완료'){
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
