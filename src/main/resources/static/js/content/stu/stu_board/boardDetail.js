


function insertReply(menuCode, subMenuCode){
	
	const replyContent = document.querySelector('.replyContent').value;
	const boardNo = document.querySelector('.boardNo').value;
	const stuNo = document.querySelector('.stuNo').value;

	
	$.ajax({
			url: '/stuMenu/replyAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'menuCode' : menuCode, 'subMenuCode' : subMenuCode , 'replyContent' : replyContent, 'boardNo' : boardNo, 'stuNo' : stuNo}, //필요한 데이터
			success: function(result) {
				if(result){
					swal("등록 성공!", "댓글이 등록되었습니다.", "success");
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

function deleteBoard(boardNo, menuCode, subMenuCode ){

	$.ajax({
			url: '/board/boardDeleteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {'boardNo' : boardNo, 'menuCode' : menuCode, 'subMenuCode' : subMenuCode }, //필요한 데이터
			success: function(result) {
				if(result){
					swal("삭제 성공!", "게시글이 삭제되었습니다.", "success");
					//location.href=`/stuMenu/boardDetail?menuCode=${menuCode} & subMenuCode=${subMenuCode}`;
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