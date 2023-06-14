

//정렬 기능 날짜순
function getOrderListDesc(REG_BOARD_DATE){
	
	const orderDate = document.querySelector('.orderDate');
	alert(orderDate);
	
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

function success(menuCode, subMenuCode){
	
	const boardTitle = document.querySelector('.boardTitle').value;
	const boardContent = document.querySelector('.boardContent').value;
	//const isPrivate = document.querySelector('.isPrivate:checked').value;
	const isPrivate = document.querySelector('input[name="isPrivate"]:checked').value;
	//const isNotice = document.querySelector('input[name="isNotice"]:checked').value;
	const boardWriter = document.querySelector('.boardWriter').value;
	const cateNo =document.querySelector('.cateNo').value;
	console.log(cateNo);
	
	const deptNo = document.querySelector('.deptNo').value;
	
	//비밀번호 등록
	const inputPwd = document.querySelector('.inputPwd').value;

	if(boardTitle == '')
	{
		swal.fire({
								title: "게시글 제목을 입력해주세요.",
								icon: 'error',
								button: '확인',
							});
	}
	if(boardContent == ''){
		swal.fire({
								title: "게시글 내용을 입력해주세요.",
								icon: 'error',
								button: '확인',
							});
	}
	
	$.ajax({
			url: '/stuMenu/boardWriteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'menuCode' : menuCode, 'subMenuCode' : subMenuCode,  'boardTitle' : boardTitle, 'boardContent' : boardContent, 
			'isPrivate' : isPrivate,  'boardWriter' : boardWriter, 'cateNo' : cateNo, 'inputPwd' : inputPwd, 'deptNo' : deptNo}, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
											title: "게시글이 등록되었습니다.",
											icon: 'success',
											button: '확인',
										});
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
			swal.fire({
								title: "비밀번호를 확인해주세요.",
								icon: 'error',
								button: '확인',
							});
		}
		
	  console.log("입력 받은 데이터:", data);
	}
	  	
  	useUserInput(userInput);
}


