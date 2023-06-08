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
























