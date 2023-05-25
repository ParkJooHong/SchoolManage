
function leave(memNo){
	
	const applyReason = document.querySelector('.applyReason').value;
	const stuStatus = document.querySelector('.stuStatus').value;
	
	const ingStatus = document.querySelector('.ingStatus').value;

// 1. ㅈ ㅐ학인데 재학신청 불가
// 2. 휴학인데 휴학신청 불가
// 3. 신청중인 데이터 있으면 불가.
	// 신청자 학생 정보 조회 쿼리.
	if(ingStatus == '승인대기')
	{
		
		$.ajax({
				url: '/stuMenu/leaveManageAjax', //요청경로
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: {'memNo' : memNo, 'stuStatus' : stuStatus , 'applyReason' : applyReason, 'ingStatus' : ingStatus}, //필요한 데이터
				success: function(result) {
					if(result != 9999){
						swal("신청 완료!", "휴학 신청이 완료되었습니다.", "success");
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
