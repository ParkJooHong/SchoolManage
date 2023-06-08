init();

function init() {
	//날짜 구하기
	const today = new Date();
	const monthAgo = new Date(today);
	monthAgo.setMonth(today.getMonth() - 1);

	const now_date = document.querySelector('#toDate');
	const month_date = document.querySelector('#monthDate')
	if(now_date.value == ''){
		now_date.valueAsDate = today;
	}
	if(month_date.value == ''){
		month_date.valueAsDate = monthAgo;
	}
	
	
	
	
	//모달 데이터 삭제
	const pw_modal = new bootstrap.Modal('#boardPwModal');
	
	$(pw_modal._element).on('hidden.bs.modal', function(e){
		document.querySelector('#boardPw').value='';
	});
	
	


}
//페이지 이동
function getOrderListPaging(page_num){
	document.querySelector('#nowPage').value = page_num;
	searchByStatusInBoard();
}


//검색기능
function searchByStatusInBoard() {
	const search_form= document.querySelector('#searchForm');
	search_form.submit();
}

//게시글 상세정보
function readBoardDetail(board_no, is_private){
	const pw_modal = new bootstrap.Modal('#boardPwModal');
	
	if(is_private == 'Y'){
		pw_modal.show();
	}
	else{
		location.href=`/board/boardDetail?boardNo=${board_no}`
	}
}

//게시글 등록 페이지 이동
function moveRegForm(){
	swal.fire({
		title: "게시글 등록",
		text: "게시글 등록 페이지로 이동합니다.",
		icon: "success",
		button: '확인',	
	}).then((r)=>{
		location.href="/board/regBoard";
	})
}


