function plus(){
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
		str2 +='<table border="3" style="border-color: red;" class="default_info">'
		str2 +='	<tr>'
		str2 +='	<td>학번</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>성명</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>학년</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>학적상태</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='</tr>'
		str2 +='<tr>'
		str2 +='	<td>학과코드</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>전공</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>복수전공</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>부전공</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='</tr>'
		str2 +='<tr>'
		str2 +='	<td>교직</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>지도교수</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td></td>'
		str2 +='	<td></td>'
		str2 +='	<td></td>'
		str2 +='	<td></td>'
		str2 +='</tr>'
		str2 +='</table>'
	}
	else
	{
		str +='+';
		str2 += '<table border="3" style="border-color: red;" class="default_info">';
		str2 += '<tr>';
		str2 += '<td>학번</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '<td>성명</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '<td>학년</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '<td>학적상태</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '</tr>';
		str2 += '</table>';
	}
	
	button.insertAdjacentHTML('afterbegin', str);
	table.insertAdjacentHTML('afterbegin', str2);
}


function changePassword(memPw, memNo){
	
	currentPassword = document.querySelector('.currentPassword').value;
	newPassword = document.querySelector('.newPassword').value;
	confirmPassword = document.querySelector('.confirmPassword').value;
	
	
	if(currentPassword != memPw){
		alert("현재 비밀번호가 올바르지 않습니다. \n 다시 입력해주세요.");
	}
	else if(newPassword != confirmPassword){
		alert("새로운 비밀번호가 올바르지 않습니다. \n 다시 입력해주세요.");
	}
	else if(currentPassword == newPassword){
		alert("현재 비밀번호와 새로운 비밀번호가 중복입니다. \n 다시 입력해주세요.");
	}
	else{
		alert("비밀번호를 변경합니다.");		
		
			$.ajax({
			url: '/stuMenu/changePwdAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'newPassword' : newPassword, 'memNo' : memNo }, //필요한 데이터
			success: function(result) {
				if(result){
					alert(result);
					alert('사용여부가 변경되었습니다.');
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











