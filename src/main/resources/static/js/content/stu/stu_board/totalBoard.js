

function success(menuCode, subMenuCode){
	
	const boardTitle = document.querySelector('.boardTitle').value;
	const boardContent = document.querySelector('.boardContent').value;
	//const isPrivate = document.querySelector('.isPrivate:checked').value;
	const isPrivate = document.querySelector('input[name="isPrivate"]:checked').value;
	const isNotice = document.querySelector('input[name="isNotice"]:checked').value;
	const boardWriter = document.querySelector('.boardWriter').value;
	let cateNo =document.querySelector('.cateNo').value;
	const deptNo = document.querySelector('.deptNo').value;

	if(boardTitle == '')
	{
		swal("실패", "게시글 제목을 입력해주세요.", "error");
	}
	if(boardContent == ''){
		swal("실패", "게시글 내용을 입력해주세요.", "error");
	}
	
	$.ajax({
			url: '/stuMenu/boardWriteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'menuCode' : menuCode, 'subMenuCode' : subMenuCode,  'boardTitle' : boardTitle, 'boardContent' : boardContent,
			 'isPrivate' : isPrivate, 'isNotice' : isNotice, 'boardWriter' : boardWriter, 'cateNo' : cateNo, 'deptNo' : deptNo}, //필요한 데이터
			success: function(result) {
				if(result){
					swal("등록 성공!", "게시글이 등록되었습니다.", "success");
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
