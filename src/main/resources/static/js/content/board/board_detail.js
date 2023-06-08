//게시글 수정
function setBoardDetail(board_no) {
	swal.fire({
		title: "게시글 수정",
		text: "수정하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			swal.fire({
				title: "수정 페이지로 이동합니다.",
				icon: 'success',
				button: '확인',
			}).then((e) => {
				location.href = `/board/setBoardDetailPage?boardNo=${board_no}`;
			})
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "수정이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	})
}

//게시글 삭제
function delBoardDetail(board_no) {
	swal.fire({
		title: "게시글 삭제",
		text: "삭제하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			swal.fire({
				title: "게시글을 삭제합니다.",
				icon: 'success',
				button: '확인',
			}).then((e) => {
				location.href = `/board/delBoardDetail?boardNo=${board_no}`;
			})
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "삭제가 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	})
}

//비밀 댓글 컨트롤
function radioCtrl(radio_val) {
	const reply_pw = document.querySelector('#replyPwDiv');

	let str = '';
	if (radio_val.value == 'Y') {
		str += '<input type="password" class="form-control" name="replyPw">';
		reply_pw.insertAdjacentHTML('afterbegin', str);
	}
	else if (radio_val.value == 'N') {
		reply_pw.replaceChildren();
	}

}

//댓글 등록
function regReply(board_no) {
	const reply_div = document.querySelector('#replyIct');
	const reply_content = reply_div.querySelector('input[type=text]').value;
	const is_private = reply_div.querySelector('input[type=radio]:checked').value;
	const reply_list = document.querySelector('#replyList');
	let reply_pw = '';
	if (is_private == 'Y') {
		reply_pw += reply_div.querySelector('input[type=password]').value;
	}

	//ajax start
	$.ajax({
		url: '/board/regReplyAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {
			'replyContent': reply_content,
			'isPrivate': is_private,
			'replyPw': reply_pw,
			'boardNo': board_no
		}, //필요한 데이터
		success: function(result) {
			reply_list.replaceChildren();
			let str1 = '';
			result.forEach(function(reply, idx) {
				str1 += `댓글번호 : ${result.length - idx} <br>`;
				str1 += `작성자 : ${reply.replyWriter} <br>`;
				str1 += `내용 : ${reply.replyContent} <br>`;
				str1 += `<div class="mb-3"></div>`;
			});
			
			reply_list.insertAdjacentHTML('afterbegin',str1);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}




















