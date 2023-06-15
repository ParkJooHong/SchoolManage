


function changePassword(memPw, memNo){
	
	currentPassword = document.querySelector('.currentPassword').value;

	newPassword = document.querySelector('.newPassword').value;
	confirmPassword = document.querySelector('.confirmPassword').value;
	
	$.ajax({
			url: '/stuMenu/securityChangePwdAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'memPw' : currentPassword, 'memNo' : memNo }, //필요한 데이터
			success: function(result) {
				if (result == false) {
					swal.fire({
						title: "실패!",
						text : "현재 비밀번호가 일치하지 않습니다.",
						icon: 'error',
						button: '확인',
					});
					return
				}
		
				else{
					$.ajax({
						url: '/stuMenu/changePwdAjax', //요청경로
						type: 'post',
						contentType: "application/x-www-form-urlencoded; charset=UTF-8",
						data: {'memPw' : newPassword, 'memNo' : memNo , 'confirmPassword' : confirmPassword}, //필요한 데이터
						success: function(result) {
							if (result == true) {
							swal.fire({
									title: "성공!",
									text : "비밀번호가 변경되었습니다.",
									icon: 'success',
									button: '확인',
								});	
							}
							else{
								swal.fire({
									title: "정보",
									text : "새로운 비밀번호가 일치하지 않습니다.",
									icon: 'info',
									button: '확인',
								});	
							}							
						},
						error: function() {
							alert('실패');
							
						}
					});
				}
			},
			error: function() {
				alert('실패');
				
			}
	});
}
		
	
	
	/*
	if(currentPassword != memPw){
		swal.fire({
								title: "현재 비밀번호가 올바르지 않습니다. \n 다시 입력해주세요.",
								icon: 'error',
								button: '확인',
							});
			currentPassword.textContent = '';
					newPassword.textContent = '';
					confirmPassword.textContent = '';
					
					let str = '';
					currentPassword.insertAdjacentHTML('afterbegin', str);
	}
	else if(newPassword != confirmPassword){
		swal.fire({
								title: "새로운 비밀번호가 올바르지 않습니다. \n 다시 입력해주세요.",
								icon: 'error',
								button: '확인',
							});
	}
	else if(currentPassword == newPassword){
		swal.fire({
								title: "현재 비밀번호와 새로운 비밀번호가 중복입니다. \n 다시 입력해주세요.",
								icon: 'error',
								button: '확인',
							});
	}
	else{
		
			$.ajax({
			url: '/stuMenu/changePwdAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'newPassword' : newPassword, 'memNo' : memNo }, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
								title: "비밀번호가 변경되었습니다.",
								icon: 'success',
								button: '확인',
							});				
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
			*/
	
	




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








