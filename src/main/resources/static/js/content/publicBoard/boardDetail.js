
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
		swal("댓글 등록 실패", "공백은 입력할 수 없습니다.", "error");
	}
	else{
		$.ajax({
			url: '/stuMenu/replyAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'menuCode' : menuCode, 'subMenuCode' : subMenuCode , 'replyContent' : replyContent, 'boardNo' : boardNo, 'stuNo' : stuNo}, //필요한 데이터
			success: function(result) {
				if(result){
					swal("등록 성공!", "댓글이 등록되었습니다.", "success");
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
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	
	const updateOrDelete = document.querySelector('.updateOrDelete');
	const boardTitleStr = document.querySelector('.boardTitle');
	const boardContentStr = document.querySelector('.boardContent');
	
	boardTitleStr.replaceChildren();
	boardContentStr.replaceChildren();

	updateOrDelete.replaceChildren();
	
	let updateOrDelete_str = '';
	let boardTitle_str = '';
	let boardContent_str ='';
	
	boardTitle_str = '<input type="text" class="newBoardTitle" placeholder="변경할 제목을 입력해주세요.">';
	boardContent_str = '<textarea class="newBoardContent" placeholder="변경할 내용을 입력해주세요." style="box-sizing: border-box; height: 100%; resize: none;"></textarea>';
	
	
	updateOrDelete_str = `<input type="button" value="수정 완료" class="btn btn-primary" onclick="updateBoardGo('${boardContent}', '${boardTitle}','${boardNo}' , '${menuCode}', '${subMenuCode}');">`;
	
	boardTitleStr.insertAdjacentHTML('afterbegin', boardTitle_str);
	boardContentStr.insertAdjacentHTML('afterbegin', boardContent_str);
	updateOrDelete.insertAdjacentHTML('afterbegin', updateOrDelete_str);
}

//게시글 수정 ajax
function updateBoardGo(menuCode, subMenuCode ,boardNo ){
	const newBoardTitle = document.querySelector('.newBoardTitle').value;
	const newBoardContent = document.querySelector('.newBoardContent').value;
	
	$.ajax({
			url: '/board/boardUpdateAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'newBoardTitle' : newBoardTitle, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode, 'newBoardContent' : newBoardContent , 'boardNo' : boardNo }, //필요한 데이터
			success: function(result) {
				if(result){
					swal("수정 성공!", "게시글이 수정되었습니다.", "success");
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
function deleteBoard(boardNo, menuCode, subMenuCode ){

	$.ajax({
			url: '/board/boardDeleteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'boardNo' : boardNo, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode }, //필요한 데이터
			success: function(result) {
				if(result){
					swal("삭제 성공!", "게시글이 삭제되었습니다.", "success");
					 setTimeout(function() {
						location.reload();
						}, 500);
					window.history.go(-1);
					//location.href=`/stuMenu/myBoard?menuCode=${menuCode} & subMenuCode=${subMenuCode}`;
				}
				else{
					alert('일시적 오류가 발생했습니다.');
				}
			},
			error: function() {
				swal("삭제 실패", "댓글이 있어서 삭제할 수 없습니다.\n 삭제를 하기 위해서는 댓글을 모두 지워주세요.", "error");
				
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
					swal("수정 성공!", "댓글이 수정되었습니다.", "success");
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
					swal("삭제 성공!", "댓글이 삭제되었습니다.", "success");
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








