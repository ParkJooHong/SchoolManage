

function moveManage(){
	
	const toColl = document.querySelector('.colleage').value;
	const toDept = document.querySelector('.dept').value;
	const fromDept = document.querySelector('.currentDept').value;
	const applyReason = document.querySelector('.applyReason').value;
	
	
	if(toDept == fromDept){
		alert("변경하려는 학과가 현재와 동일 합니다. \n 다시 입력해주세요.");
	}
	if(applyReason == ''){
		alert("전과 사유를 작성해 주세요.");
	}
	else{
		alert("전과 신청이 접수되었습니다.");		
		
			$.ajax({
			url: '/stuMenu/moveManageAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'toDept' : toDept, 'toColl' : toColl , 'applyReason' : applyReason, 'fromDept' : fromDept}, //필요한 데이터
			success: function(result) {
				if(result){
					alert('전과 신청이 완료 되었습니다.');
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


function updateDept(){
	
	const coll = document.querySelector('.colleage').value;
	
	$.ajax({
		url: '/stuMenu/deptUpdateAjax', //요청경로
		type: 'post',
		async: false,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'collNo' : coll }, //필요한 데이터
		success: function(result) {
			alert("ajaxa 통신 성공");
			alert(result);
			
		},
		error: function() {
			alert('실패~');
		}
	});

	
	
}



function plus(memNo, memName, stuYear, stuStatus){


	const button = document.querySelector('.plus');
	const table = document.querySelector('.tableAdd');
	
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
		str2 +=`	<td>학과코드</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
		str2 +=`	<td>전공</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
		str2 +=`	<td>복수전공</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
		str2 +=`	<td>부전공</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
		str2 +=`</tr>`;
		str2 +=`<tr>`;
		str2 +=`	<td>교직</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
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
		str2 += `<td><input type="text" readonly></td>`;
		str2 += `<td>학년</td>`;
		str2 += `<td><input type="text" readonly></td>`;
		str2 += `<td>학적상태</td>`;
		str2 += `<td><input type="text" readonly></td>`;
		str2 += `</tr>`;
		str2 += `</table>`;
	}
	
	button.insertAdjacentHTML('afterbegin', str);
	table.insertAdjacentHTML('afterbegin', str2);
}