
//복수전공 신청
function doubleManage(){
	
	const stuYear = document.querySelector('.stuYear').value;
	const stuSem = document.querySelector('.stuSem').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	const currentDept = document.querySelector('.currentDept').value;
	const doubleMajorColl = document.querySelector('.doubleMajorColl').value;
	const doubleMajorDept = document.querySelector('.doubleMajorDept').value;
	const applyReason = document.querySelector('.applyReason').value;
	const processStatus = document.querySelector('.processStatus');
	
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;

	
	alert(stuYear);
	alert(stuStatus);
	alert(currentDept);
	alert(doubleMajorDept);
	alert(doubleMajorColl);
	alert(applyReason);
	
	if(processStatus == null){
		if(stuYear == 1){
			swal("신청 실패!", "복수전공 신청은 2학년 이상의 재학생만 가능합니다.", "error");
			return;
		}
		if(stuStatus != '재학'){
			swal("신청 실패!", "현재 재학 상태가 아닙니다. \n복수전공 신청은 2학년 이상의 재학생만 가능합니다.", "error");
			return;
		}
		if(currentDept == doubleMajorDept){
			swal("신청 실패!", "복수전공을 희망하는 학과가 현재와 동일 합니다. \n 다시 입력해주세요.", "error");
			return;
		}
		if(applyReason == ''){
			swal("실패", "신청 사유를 작성해주세요.", "error");
			return;
		}
		else{
			alert("복수전공 신청이 접수되었습니다.");		
			
				$.ajax({
				url: '/stuMenu/doubleManageAjax', //요청경로
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: {'doubleMajorColl' : doubleMajorColl, 'doubleMajorDept' : doubleMajorDept , 'applyReason' : applyReason, 'stuYear' : stuYear 
				, 'stuSem' : stuSem, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode}, //필요한 데이터
				success: function(result) {
					if(result){
						swal("신청 완료!", "복수전공 신청이 완료되었습니다.", "success");
						setTimeout(function() {
							location.reload();
							}, 500);
					}
					else{
						alert('일시적 오류가 발생했습니다.');
					}
				},
				error: function() {
					alert('실패');
					
				}
			});
				
		}
	}
	else{
		swal("신청 실패!", "이미 신청하신 내역이 있습니다. \n또한, 복수전공 신청과 전과신청은 함께할 수 없습니다.", "error");
	}
}


// 대학 변경시 학과 변경
function updateDept(menuCode, subMenuCode){
	
	const coll = document.querySelector('.doubleMajorColl');
	const dept = document.querySelector('.doubleMajorDept');
	
	$.ajax({
		url: '/stuMenu/deptUpdateAjax', //요청경로
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'collNo' : coll.value , 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
		success: function(result) {
			if(result)
			{
				//학과 자식태그 삭제
				dept.replaceChildren();			
				let dept_str = '';				
				//학과 목록
				for(const dept of result['deptList']){
					dept_str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
				}				
				dept.insertAdjacentHTML('afterbegin', dept_str);
				}
				else{
					alert("에러발생");
				}		
		},
		error: function() {
			alert('실패~');
		}
	});

	
	
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