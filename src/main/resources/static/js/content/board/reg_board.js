function regBoard(){
	const board_title = document.querySelector('#boardTitle').value;
	const board_content = document.querySelector('#boardContent').value;
	const reg_board_form = document.querySelector('#regBoardForm');
	if(board_title == ''){
		swal.fire({
			title: "제목에 빈 값은 들어갈 수 없습니다.",
			icon: 'warning',
			button: '확인',
		})
		return
	}
	else if(board_content == ''){
		swal.fire({
			title: "내용에 빈 값은 들어갈 수 없습니다.",
			icon: 'warning',
			button: '확인',
		})
		return
	}
	else{
		reg_board_form.submit();
	}
}
//비밀글 라디오 컨트롤
function radioCtrl(radio_val){
	const board_pw = document.querySelector('#boardPw');
	
	let str = '';
	if(radio_val.value == 'Y'){
		str += '<input type="password" class="form-control" name="boardPw">';
		board_pw.insertAdjacentHTML('afterbegin',str);
	}
	else if(radio_val.value == 'N'){
		board_pw.replaceChildren();
	}
}




