//회원 목록 검색
function findMem() {
	const search_keyword = document.querySelector('input[name="recvMemNo"]').value;

	//ajax start
	$.ajax({
		url: '/member/getMemListAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'memName': search_keyword },			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(mem_list) {

			const member_list_div = document.querySelector('#memberDropdown');
			member_list_div.innerHTML = '';

			if (search_keyword && mem_list.length > 0) {
				member_list_div.style.display = 'block';
				member_list_div.classList.add('show');
				mem_list.forEach((mem) => {
					const memName = mem['MEM_NAME'];
					const memRole = mem['MEM_ROLE'];

					const mem_li = document.createElement('li');
					mem_li.textContent = memName + '( ' + memRole + ' )';
					mem_li.classList.add('dropdown-item');
					mem_li.addEventListener('click', function() {
						const selectMember = this.textContent.split('(')[0];
						document.querySelector('.recvMem').value = selectMember
						//클릭후 드롭다운 제거
						memberDropdown.style.display = 'none';
						memberDropdown.classList.remove('show');
					});
					member_list_div.appendChild(mem_li);
				});
			}
			else if (search_keyword == null || search_keyword == '') {
				memberDropdown.style.display = 'none';
				memberDropdown.classList.remove('show');
			}
			else {
				member_list_div.style.display = 'block';
				member_list_div.classList.add('show');
				const no_mem_li = document.createElement('li');
				no_mem_li.textContent = '일치하는 회원이 없습니다.';
				no_mem_li.classList.add('dropdown-item', 'disabled');
				member_list_div.appendChild(no_mem_li);
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//메세지 전송
function sendMessage() {
	//메세지 받을 사람
	const recv_name = document.querySelector('input[name="recvMemNo"]').value;
	//메세지 내용
	const content = document.querySelector('#content').value;
	
	location.href = '/message/sendMessage?recvName=' + recv_name + '&content=' + content;
}

//대화 메세지 목록 조회(1:1대화 내용들)
function getConversContent(memName){
	//ajax start
	$.ajax({
		url: '/message/getConversContentAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'memName':memName},			//JSON.stringify(classInfo), //필요한 데이터
		success: function(convers_content) {
			
			//대화 목록 태그
			const convers_content_tag = document.querySelector('#convers_content');
			
			//기존 대화 목록 제거
			if (convers_content_tag && convers_content_tag.innerHTML !== null && convers_content_tag.innerHTML !== '') {
  				convers_content_tag.innerHTML = '';
			}
			
			//대화 목록을 담을 str생성
			let str = '';
			
			//현재 날짜 객체 생성
			const current_date = new Date();
			
			//isFirstElement 변수를 forEach 메서드 외부에서 선언
			let isFirstElement = true; 
			
			//이전 날짜 변수 초기화
			let previousDate = null;
			
			//현재 날짜 가져오기
			//현재 날짜 가져오기
			const current_year = current_date.getFullYear(); // 연도
			const current_month = current_date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
			const current_day = current_date.getDate(); // 일 
			
			convers_content.forEach((convers)=> {
				
				//대화 내용 날짜 가져오기
				const sendTime = new Date(convers['SEND_TIME']);
				const msg_year = sendTime.getFullYear(); //연도
				const msg_month = sendTime.getMonth() + 1; //달
				const msg_day = sendTime.getDate(); //일
				const msg_hour = sendTime.getHours(); //시간
				const msg_minute = sendTime.getMinutes(); //분

				// 날짜가 변경되었는지 확인
				const currentDate = new Date(msg_year, msg_month - 1, msg_day); // 연, 월(0부터 시작하므로 1을 빼줌), 일로 Date 객체 생성
				if (!previousDate || currentDate > previousDate) {
					// 이전 날짜와 현재 날짜가 다른 경우, 날짜 표시
					const dateString = currentDate.toLocaleDateString(); // 현재 날짜를 원하는 형식으로 변환 (예: "yyyy-MM-dd")
					str += `<div class="row text-center convers_date mt-2">`;
					str += `  <div class="col-12">`;
					str += `    ${dateString}`;
					str += `  </div>`;
					str += `</div>`;
					previousDate = currentDate;
				}
					
				if(convers['memNo'] == convers['SEND_MEM_NO']){
					str += `<div class="row text-end mt-3 mb-3">`;
					str += `	<div class="col-12">`;
					str += `		<span style="margin-right:5px;">${msg_hour}:${msg_minute}</span>`;
					str += `		<span>${convers['CONTENT']}</span>`;
					str += `	</div>`;
					str += `</div>`;
				}
				else{
					str += `<div class="row text-start mt-3 mb-3">`;
					str += `	<div class="col-12">`;
					str += `		<span style="margin-right:5px;">${convers['CONTENT']}</span>`;
					str += `		<span>${msg_hour}:${msg_minute}</span>`;
					str += `	</div>`;
					str += `</div>`;
				}

			})
			
			console.log(str);
			
			convers_content_tag.insertAdjacentHTML('afterbegin', str);
		
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

/*
const FirstMessageList = function() {
	$.ajax({
		url: "/message/messageListAjax",
		method: "get",
		data: {},
		success: function(msg_list) {
			
			console.log(msg_list);
			
			let str = '';
			
			msg_list.forEach((msg) => {
				str += `<div class="chat_listbox${msg.msgRoom} chat_list_box">`;
				str += `	<div class="chat_list" room="${msg.msgRoom}" other-name="${msg.otherName}">`;
				str += `		<div class="chat_people">`;
				str += `			<div class="chat_ib">`;
				str += `				<h5>${msg.otherName}`;
				str += `				<span class="chat_date">${msg.sendTime}</span>`;
				str += `				</h5>`;
				str += `				<div class="row">`;
				str += `					<div class="col-10">`;
				str += `						<p>${msg.content}</p>`;
				str += `					</div>`;
				if(msg.unread > 0){
					str += `				<div class="col-2 unread${msg.msgRoom}">`;
					str += `					<span class="budge bg-danger">${msg.unread}</span>`;
					str += `				</div>`;
				}
				str += `				</div>`;
				str += `			</div>`;
				str += `		</div>`;
				str += `	</div>`;
				str += `</div>`;
			})
			

			$('.inbox_chat').html(str);

			// 메세지 리스트중 하나를 클릭했을 때
			$('.chat_list').on('click', function() {
				//alert('room : '+ $(this).attr('room'));

				let room = $(this).attr('room');
				let other_nick = $(this).attr('other-nick');

				// 선택한 메세지빼고 나머지는 active 효과 해제하기
				$('.chat_list_box').not('.chat_list_box.chat_list_box' + room).removeClass('active_chat');
				// 선택한 메세지만 active 효과 주기
				$('.chat_list_box' + room).addClass('active_chat');

				let send_msg = "";
				send_msg += "<div class='type_msg'>";
				send_msg += "	<div class='input_msg_write row'>";
				send_msg += "		<div class='col-11'>";
				send_msg += "			<input type='text' class='write_msg form-control' placeholder='메세지를 입력...' />";
				send_msg += "		</div>";
				send_msg += "		<div class='col-1'>";
				send_msg += "			<button class='msg_send_btn' type='button'><i class='fa fa-paper-plane-o' aria-hidden='true'></i></button>";
				send_msg += "		</div>";
				send_msg += "	</div>";
				send_msg += "</div>";

				// 메세지 입력, 전송 칸을 보인다.
				$('.send_message').html(send_msg);

				// 메세지 전송버튼을 눌렀을 때
				$('.msg_send_btn').on('click', function() {

					// 메세지 전송 함수 호출
					SendMessage(room, other_nick);

					// 전송버튼을 누르면 메세지 리스트가 리로드 되면서 현재 열린 메세지의 선택됨 표시가 사라진다.
					// 이걸 해결하기 위해 메세지 전송버튼을 누르고 메세지 리스트가 리로드되면 메세지 리스트의 첫번째 메세지(현재 열린 메세지)가 선택됨 표시 되도록 한다.
					//$('.chat_list_box:first').addClass('active_chat');
				});


				// 메세지 내용을 불러오는 함수 호출
				MessageContentList(room);
			});
				
			}
		})
	};

// 메세지 리스트를 다시 가져온다.
const MessageList = function() {
	$.ajax({
		url: "/message/messageListAjax",
		method: "post",
		data: {
		},
		success: function(data) {
			console.log("메세지 리스트 리로드 성공");

			$('.inbox_chat').html(data);

			// 메세지 리스트중 하나를 클릭했을 때
			$('.chat_list').on('click', function() {
				//alert('room : '+ $(this).attr('room'));

				let room = $(this).attr('room');
				let other_nick = $(this).attr('other-nick');

				// 선택한 메세지빼고 나머지는 active 효과 해제하기
				$('.chat_list_box').not('.chat_list_box.chat_list_box' + room).removeClass('active_chat');
				// 선택한 메세지만 active 효과 주기
				$('.chat_list_box' + room).addClass('active_chat');

				let send_msg = "";
				send_msg += "<div class='type_msg'>";
				send_msg += "	<div class='input_msg_write row'>";
				send_msg += "		<div class='col-11'>";
				send_msg += "			<input type='text' class='write_msg form-control' placeholder='메세지를 입력...' />";
				send_msg += "		</div>";
				send_msg += "		<div class='col-1'>";
				send_msg += "			<button class='msg_send_btn' type='button'><i class='fa fa-paper-plane-o' aria-hidden='true'></i></button>";
				send_msg += "		</div>";
				send_msg += "	</div>";
				send_msg += "</div>";

				// 메세지 입력, 전송 칸을 보인다.
				$('.send_message').html(send_msg);

				// 메세지 전송버튼을 눌렀을 때
				$('.msg_send_btn').on('click', function() {

					// 메세지 전송 함수 호출
					SendMessage(room, other_nick);

					// 전송버튼을 누르면 메세지 리스트가 리로드 되면서 현재 열린 메세지의 선택됨 표시가 사라진다.
					// 이걸 해결하기 위해 메세지 전송버튼을 누르고 메세지 리스트가 리로드되면 메세지 리스트의 첫번째 메세지(현재 열린 메세지)가 선택됨 표시 되도록 한다.
					//$('.chat_list_box:first').addClass('active_chat');
				});

				// 메세지 내용을 불러오는 함수 호출
				MessageContentList(room);

			});

			// 전송버튼을 누르면 메세지 리스트가 리로드 되면서 현재 열린 메세지의 선택됨 표시가 사라진다.
			// 이걸 해결하기 위해 메세지 전송버튼을 누르고 메세지 리스트가 리로드되면 메세지 리스트의 첫번째 메세지(현재 열린 메세지)가 선택됨 표시 되도록 한다.
			$('.chat_list_box:first').addClass('active_chat');
		}
	})
};


// 메세지 내용을 가져온다.
// 읽지 않은 메세지들을 읽음으로 바꾼다.
const MessageContentList = function(room) {

	$.ajax({
		url: "message_content_list.do",
		method: "GET",
		data: {
			room: room,
		},
		success: function(data) {
			console.log("메세지 내용 가져오기 성공");

			// 메세지 내용을 html에 넣는다
			$('.msg_history').html(data);

			// 이 함수로 메세지 내용을 가져올때마다 스크롤를 맨아래로 가게 한다.
			$(".msg_history").scrollTop($(".msg_history")[0].scrollHeight);

		},
		error: function() {
			alert('서버 에러');
		}
	})

	$('.unread' + room).empty();

};


// 메세지를 전송하는 함수
const SendMessage = function(room, other_nick) {

	let content = $('.write_msg').val();
	//alert("content: " + content);

	content = content.trim();

	if (content == "") {
		alert("메세지를 입력하세요!");
	} else {
		$.ajax({
			url: "message_send_inlist.do",
			method: "GET",
			data: {
				room: room,
				other_nick: other_nick,
				content: content
			},
			success: function(data) {
				console.log("메세지 전송 성공");

				// 메세지 입력칸 비우기
				$('.write_msg').val("");

				// 메세지 내용  리로드
				MessageContentList(room);

				// 메세지 리스트 리로드
				MessageList();

			},
			error: function() {
				alert('서버 에러');
			}
		});
	}

};

$(document).ready(function() {
	// 메세지 리스트 리로드
	FirstMessageList();
});

*/