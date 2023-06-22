//새로운 메세지가 있을시 메시지 표시 변경
getNewMsg();
function getNewMsg() {
	//ajax start
	$.ajax({
		url: '/message/messageListAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		success: function(read_chk) {

			let str = '';

			//메세지 표시할 태그
			const msg_tag = document.querySelector('.msg_btn_wrap');

			if (read_chk == true) {
				msg_tag.innerHTML = '';

				str += `<button class="btn btn-success mx-2" style="background-color: #897c76; border-radius: 20px; padding: 0 0; width: 50px;">`;
				str += `	<img src="/image/icon/new_message.png" width="65%" onclick="messageList()"/>`;
				str += `</button>`;
				msg_tag.insertAdjacentHTML('afterbegin', str);
			}
			else {
				msg_tag.innerHTML = '';

				str += `<button class="btn btn-success mx-2" style="background-color: #f2f2f2; border-radius: 20px; padding: 0 0; width: 50px;">`;
				str += `	<img src="/image/icon/no_message.png" width="65%" onclick="messageList()"/>`;
				str += `</button>`;
				msg_tag.insertAdjacentHTML('afterbegin', str);
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//메세지 목록 창으로 이동
function messageList() {
	// AJAX 요청
	$.ajax({
		url: '/message/getAuthAjax',
		type: 'post',
		dataType: 'json',
		success: function(response) {
			
			let menu_code = '';
			
			// 권한 정보 처리
			var roles = response;
			if (roles.includes('ROLE_ADMIN')) {
				menu_code = document.querySelector('#adminSubMenuVO').value;
			}
			if (roles.includes('ROLE_PRO')) {
				menu_code = document.querySelector('#professorSubMenuVO').value;
			}
			if (roles.includes('ROLE_STU')) {
				menu_code = document.querySelector('#memberSubMenuVO').value;
			}
			location.href = '/message/messageList?menuCode=' + menu_code;
		}
	});
}


function closeModal(){
	$('#changeInfoModal').modal('hide');
	location.reload(); // 페이지 새로고침
}
