
//뒤로가기
function goBack(){
	window.history.go(-1);
}

//글 상세보기, 이전글
function prev(boardNo, readCnt, menuCode, subMenuCode){
   var number = parseInt(boardNo.substr(9), 10); // 문자열에서 숫자 부분 추출
   var incrementedNumber = number - 1; // 숫자 증가
   var replacedStr = boardNo.replace(number, incrementedNumber); // 문자열에서 숫자 대체
   console.log(replacedStr);   

   location.href='/board/boardDetail?boardNo=' + replacedStr  + '&readCnt=' + readCnt + '&menuCode=' + menuCode + '&subMenuCode=' + subMenuCode;
}

//글 상세보기, 다음글
function next(boardNo, readCnt, menuCode, subMenuCode){
   var number = parseInt(boardNo.substr(9), 10); // 문자열에서 숫자 부분 추출
   var incrementedNumber = number + 1; // 숫자 증가
   var replacedStr = boardNo.replace(number, incrementedNumber); // 문자열에서 숫자 대체
   console.log(replacedStr);   

   location.href='/board/boardDetail?boardNo=' + replacedStr  + '&readCnt=' + readCnt + '&menuCode=' + menuCode + '&subMenuCode=' + subMenuCode;
}


// 댓글 등록
function insertReply(menuCode, subMenuCode){
	
	const replyContent = document.querySelector('.replyContent').value;
	const boardNo = document.querySelector('.boardNo').value;
	const stuNo = document.querySelector('.stuNo').value;

	if(replyContent.length ==0){
		swal.fire({
								title: "공백은 입력할 수 없습니다.",
								icon: 'error',
								button: '확인',
							});
	}
	else{
		$.ajax({
			url: '/stuMenu/replyAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'menuCode' : menuCode, 'subMenuCode' : subMenuCode , 'replyContent' : replyContent, 'boardNo' : boardNo, 'stuNo' : stuNo}, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
											title: "댓글이 등록되었습니다.",
											icon: 'success',
											button: '확인',
										});
					setTimeout(function() {
						location.reload();
						}, 500);
					//location.href=`/stuMenu/boardDetail?menuCode=${menuCode} & subMenuCode=${subMenuCode}`;
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

//게시글 수정
function updateBoard(boardContent,boardTitle, boardNo){
	//const menuCode = document.querySelector('.menuCode').value;
	//const subMenuCode = document.querySelector('.subMenuCode').value;
	
	const updateOrDelete = document.querySelector('.updateOrDelete');
	const boardTitleStr = document.querySelector('.boardTitle');
	const boardContentStr = document.querySelector('.boardContent');

	
	boardTitleStr.replaceChildren();
	boardContentStr.replaceChildren();

	updateOrDelete.replaceChildren();
	
	let updateOrDelete_str = '';
	let boardTitle_str = '';
	let boardContent_str ='';
	
	boardTitle_str = '<input type="text" class="newBoardTitle" placeholder="변경할 제목을 입력해주세요." style="width:100%;">';
	boardContent_str = '<textarea class="newBoardContent" placeholder="변경할 내용을 입력해주세요." style="box-sizing: border-box; width:100%; height: 100%; resize: none;"></textarea>';
	
	
	boardContent = boardContent.replace('\n','');
	updateOrDelete_str = `<input type="button" value="수정 완료" class="btn btn-primary" onclick="updateBoardGo('${boardContent}', '${boardTitle}','${boardNo}');">`;
	
	boardTitleStr.insertAdjacentHTML('afterbegin', boardTitle_str);
	boardContentStr.insertAdjacentHTML('afterbegin', boardContent_str);
	updateOrDelete.insertAdjacentHTML('afterbegin', updateOrDelete_str);
}

//게시글 수정 ajax
function updateBoardGo(boardContent, boardTitle ,boardNo ){
	const newBoardTitle = document.querySelector('.newBoardTitle').value;
	const newBoardContent = document.querySelector('.newBoardContent').value;
	
	//alert(menuCode);
	
	if(newBoardTitle == ''){
		swal.fire({
				title: "변경할 제목을 입력해주세요.",
				icon: 'error',
				button: '확인',
			});
			return;
	}
	
	if(newBoardContent == ''){
		swal.fire({
				title: "변경할 내용을 입력해주세요.",
				icon: 'error',
				button: '확인',
			});
			return;
	}
	
	
		$.ajax({
			url: '/board/boardUpdateAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'newBoardTitle' : newBoardTitle, 'newBoardContent' : newBoardContent , 'boardNo' : boardNo }, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
											title: "게시글이 수정되었습니다.",
											icon: 'success',
											button: '확인',
										});
					setTimeout(function() {
						location.reload();
						}, 500);
					//location.href=`/stuMenu/totalBoard?menuCode=${menuCode} & subMenuCode=${subMenuCode}`;
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

//게시글 삭제
function deleteBoard(boardNo ){

	$.ajax({
			url: '/board/boardDeleteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'boardNo' : boardNo }, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
											title: "게시글이 삭제되었습니다.",
											icon: 'success',
											button: '확인',
										});
					 setTimeout(function() {
						location.reload();
						}, 500);
					//window.history.go(-1);
					//location.href=`/board/board`;
				}
				else{
					alert('일시적 오류가 발생했습니다.');
				}
			},
			error: function() {
				swal.fire({
											title: "댓글이 있어서 삭제할 수 없습니다.\n 삭제를 하기 위해서는 댓글을 모두 지워주세요.",
											icon: 'error',
											button: '확인',
										});
				
			}
		});
	
}

//댓글 수정.
function replyUpdate(){
	const replyText = document.querySelector('.replyText');
	const upOrDe = document.querySelector('.upOrDe');
	
	const replyNo = document.querySelector('.replyNo').value;
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	
	
	upOrDe.replaceChildren();
	replyText.replaceChildren();	
	
	let reply_str = '';
	
	reply_str += `<td><input type="text" placeholder="변경할 댓글을 입력하세요." class="replyContent"></td>`;
	reply_str += `<td> <button onclick="updateReplyGo('${replyNo}', '${menuCode}', '${subMenuCode}');">☑️ 변경</button> </td>`;
	
	replyText.insertAdjacentHTML('afterbegin', reply_str);
	
}

//댓글 수정 Ajax
function updateReplyGo(replyNo, menuCode, subMenuCode){

	const replyContent = document.querySelector('.replyContent').value;

	$.ajax({
			url: '/board/replyUpdateAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'replyContent' : replyContent, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode, 'replyNo' : replyNo }, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
											title: "댓글이 수정되었습니다.",
											icon: 'success',
											button: '확인',
										});
					setTimeout(function() {
						location.reload();
						}, 500);
					//location.href=`/stuMenu/totalBoard?menuCode=${menuCode} & subMenuCode=${subMenuCode}`;
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


//댓글 삭제.
function replyDelete(replyWriter, replyNo, menuCode, subMenuCode){
	const boardNo = document.querySelector('.boardNo').value;
	//alert(boardNo);
		$.ajax({
			url: '/board/replyDeleteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'replyWriter' : replyWriter, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode, 'replyNo' : replyNo, 'boardNo' : boardNo }, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
											title: "댓글이 삭제되었습니다.",
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








