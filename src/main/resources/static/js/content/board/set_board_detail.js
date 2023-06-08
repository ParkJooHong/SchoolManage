function setBoard(){
	const board_title = document.querySelector('#boardTitle').value;
	const board_content = document.querySelector('#boardContent').value;
	const set_board_form = document.querySelector('#setBoardForm');
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
		swal.fire({
			title: "게시글 수정",
		text: "수정하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"		
		}).then((r)=>{
			if(r.isConfirmed){
				set_board_form.submit();
			}
			else if(r.isDismissed){
				swal.fire({
					title: "수정이 취소되었습니다.",
					icon: 'success',
					button: '확인',
				});
			}
		})
		
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


//공지사항 라디오 컨트롤
function changeNotice(mem_role,radio){
	console.log(mem_role);
	if(!mem_role.indexOf('ROLE_ADMIN')){
		radio.disabled;
		swal.fire({
			title: "관리자만 공지사항을 올릴 수 있습니다.",
			icon: 'warning',
			button: '확인',
		});
		return
	}
}