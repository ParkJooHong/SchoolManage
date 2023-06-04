

function moveManage(){
	
	const toColl = document.querySelector('.colleage').value;
	const toDept = document.querySelector('.dept').value;
	const fromDept = document.querySelector('.currentDept').value;
	const applyReason = document.querySelector('.applyReason').value;
	const processStatus = document.querySelector('.processStatus');

	
	if(processStatus == null){
		if(toDept == fromDept){
		alert("변경하려는 학과가 현재와 동일 합니다. \n 다시 입력해주세요.");
		}
		if(applyReason == ''){
			swal("실패", "전과 사유를 작성해주세요.", "error");
		}
		else{
			alert("전과 신청이 접수되었습니다.");		
			
				$.ajax({
				url: '/stuMenu/moveManageAjax', //요청경로
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: {'toDept' : toDept, 'toColl' : toColl , 'applyReason' : applyReason, 'fromDept' : fromDept }, //필요한 데이터
				success: function(result) {
					if(result){
						swal("신청 완료!", "전과 신청이 완료되었습니다.", "success");
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


function updateDept(menuCode, subMenuCode){
	
	const coll = document.querySelector('.colleage');
	const dept = document.querySelector('.dept');
	
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