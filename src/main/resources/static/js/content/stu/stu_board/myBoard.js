

//정렬 기능 날짜순
function getOrderListDesc(REG_BOARD_DATE){
	
	const orderBy = document.querySelector('#orderBy');
	orderBy.querySelector('input').value = REG_BOARD_DATE;
	orderBy.submit();
}

//정렬 기능 조회순
function getOrderListDesc(READ_CNT){
	const orderBy = document.querySelector('#orderBy');
	orderBy.querySelector('input').value = READ_CNT;
	orderBy.submit();
}

//정렬 기능 댓글 순
function getOrderListDesc(REPLY_CNT){
	const orderBy = document.querySelector('#orderBy');
	orderBy.querySelector('input').value = REPLY_CNT;
	orderBy.submit();
}


//검색기능
function searchList(month){
	const month_form = document.querySelector('#month-form');
	month_form.querySelector('input').value = month;
	month_form.submit();
}


// 비밀번호 예
function private(){
	
	const isPrivate = document.querySelector('.pwd');
	isPrivate.textContent = '';
	
	let str = '';

	str += '<input type="text" style="width: 200px;" placeholder="비밀번호를 입력해주세요." class="inputPwd">';
	
	isPrivate.insertAdjacentHTML('afterbegin', str);
}

//비밀번호 아니오
function noPrivate(){
	const isPrivate = document.querySelector('.pwd');
	isPrivate.textContent = '';
}


//글 등록
function success(menuCode, subMenuCode){
	
	const boardTitle = document.querySelector('.boardTitle').value;
	const boardContent = document.querySelector('.boardContent').value;
	//const isPrivate = document.querySelector('.isPrivate:checked').value;
	const isPrivate = document.querySelector('input[name="isPrivate"]:checked').value;
	const isNotice = document.querySelector('input[name="isNotice"]:checked').value;
	const boardWriter = document.querySelector('.boardWriter').value;
	const cateNo =document.querySelector('.cateNo').value;
	
	//비밀번호 등록
	const inputPwd = document.querySelector('.inputPwd').value;

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
			data: { 'menuCode' : menuCode, 'subMenuCode' : subMenuCode,  'boardTitle' : boardTitle, 'boardContent' : boardContent, 'isPrivate' : isPrivate, 'isNotice' : isNotice, 'boardWriter' : boardWriter, 'cateNo' : cateNo, 'inputPwd' : inputPwd}, //필요한 데이터
			success: function(result) {
				if(result){
					swal("등록 성공!", "게시글이 등록되었습니다.", "success");
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


//페스워드 체크!
function checkPwd(isPrivate ,boardNo, menuCode, subMenuCode, readCnt){
	
  	const userInput = prompt("비밀번호를 입력하세요:");

	// 다른 함수에서 입력 받은 데이터 사용
	function useUserInput(data) {
		
		if(data == isPrivate){
				$.ajax({
				url: '/stuMenu/pwdAjax', //요청경로
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'menuCode' : menuCode, 'subMenuCode' : subMenuCode, 'isPrivate' : isPrivate, 'boardNo' : boardNo, 'readCnt' : readCnt}, //필요한 데이터
				success: function(result) {
					if(result){		
			
						location.href=`/stuMenu/boardDetail?menuCode=${menuCode}&subMenuCode=${subMenuCode}&boardNo=${boardNo}&readCnt=${readCnt} `;
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
		else{
			swal("실패", "비밀번호를 확인해주세요.", "error");
		}
		
	  console.log("입력 받은 데이터:", data);
	}
	  	
  	useUserInput(userInput);
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
