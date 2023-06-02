init();

function init() {
	//날짜 구하기
	const today = new Date();
	const monthAgo = new Date(today);
	monthAgo.setMonth(today.getMonth() - 1);

	document.querySelector('#toDate').valueAsDate = today;

	document.querySelector('#monthDate').valueAsDate = monthAgo;
	
	
	
	//모달 데이터 삭제
	const pw_modal = new bootstrap.Modal('#boardPwModal');
	
	$(pw_modal._element).on('hidden.bs.modal', function(e){
		document.querySelector('#boardPw').value='';
	});
	
	


}

//검색기능
function searchByStatusInBoard() {
	const search_select = document.querySelector('#searchSelect').value;
	const to_date = document.querySelector('#toDate').value;
	const month_date = document.querySelector('#monthDate').value;
	const search_value = document.querySelector('#searchValue').value;
	const board_tbody = document.querySelector('.boardTbody');
	const board_cnt = document.querySelector('#boardCnt');
	searchData = {
		'toDate': to_date,
		'fromDate': month_date,
		'searchSelect': search_select,
		'searchValue': search_value
	};


	//ajax start
	$.ajax({
		url: '/board/searchByStatusInBoardAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: JSON.stringify(searchData), //필요한 데이터
		success: function(result) {
			console.log(result);
			board_tbody.replaceChildren();
			board_cnt.replaceChildren();

			let str = '';
			let str1 = '';
			str1 += `총 ${result.length} 개의 게시글이 검색되었습니다.`;
			if (result.length == 0) {
				str += '<tr>';
				str += '<td colspan="6">등록된 게시글이 없습니다.</td>';
				str += '</tr>';
			}
			else {
				result.forEach(function(board, idx) {
					str += '<tr>';
					str += `<td>${idx + 1}</td>`;
					str += `<td>${board.boardTitle}</td>`;
					str += `<td>${board.boardWriter}</td>`;
					str += `<td>${board.regBoardDate}</td>`;
					str += `<td>${board.readCnt}</td>`;
					str += `<td>${board.isPrivate}</td>`;
					str += `</tr>`;
				});

				board_tbody.insertAdjacentHTML('afterbegin', str);

			}
			board_cnt.insertAdjacentHTML('afterbegin', str1);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

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




