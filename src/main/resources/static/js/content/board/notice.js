init();

function init() {
	//날짜 구하기
	const today = new Date();
	const monthAgo = new Date(today);
	monthAgo.setMonth(today.getMonth() - 1);

	const now_date = document.querySelector('#toDate');
	const month_date = document.querySelector('#monthDate')
	if (now_date.value == '') {
		now_date.valueAsDate = today;
	}
	if (month_date.value == '') {
		month_date.valueAsDate = monthAgo;
	}




	//모달 데이터 삭제
	const pw_modal = new bootstrap.Modal('#boardPwModal');

	$(pw_modal._element).on('hidden.bs.modal', function(e) {
		document.querySelector('#boardPw').value = '';
	});




}
//페이지 이동
function getOrderListPaging(page_num) {
	document.querySelector('#nowPage').value = page_num;
	searchByStatusInBoard();
}


//검색기능
function searchByStatusInBoard() {
	const search_form = document.querySelector('#searchForm');
	search_form.submit();
}

//게시글 상세정보
function readBoardDetail(board_no, is_private) {
	const pw_modal = new bootstrap.Modal('#boardPwModal');
	const modal_board_no = document.querySelector('#modalNo');
	modal_board_no.value = board_no;
	if (is_private == 'Y') {
		pw_modal.show();
	}
	else {
		location.href = `/board/noticeDetail?boardNo=${board_no}`
	}
}

//게시글 등록 페이지 이동
function moveRegForm() {
	swal.fire({
		title: "게시글 등록",
		text: "게시글 등록 페이지로 이동합니다.",
		icon: "success",
		button: '확인',
	}).then((r) => {
		location.href = "/board/regBoard";
	})
}

//비밀글 비밀번호 확인
function checkPw() {
	const board_pw = document.querySelector('#boardPw').value;
	const board_no = document.querySelector('#modalNo').value;

	console.log(board_pw);
	console.log(board_no);

	//ajax start
	$.ajax({
		url: '/board/checkPwAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'boardPw': board_pw, 'boardNo': board_no }, //필요한 데이터
		success: function(result) {
			if (result != 1) {
				swal.fire({
					title: "경고",
					text: "비밀번호가 다릅니다 \n 다시 확인해주세요.",
					icon: "warning",
					button: '확인',
				})
			}
			else{
				swal.fire({
					title: "확인",
					text: "비밀번호가 일치합니다 \n 게시글 상세 페이지로 \n 이동합니다.",
					icon: "success",
					button: '확인',
				}).then((r)=>{
					location.href = `/board/noticeDetail?boardNo=${board_no}`;
				})
					
			
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end



}


