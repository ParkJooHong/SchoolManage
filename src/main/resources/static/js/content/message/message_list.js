//회원 목록 검색
function findMem() {
	const search_keyword = document.querySelector('input[name="recvName"]').value;

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
						document.querySelector('.recvMem').value = selectMember;
						document.querySelector('input[name="recvMemNo"]').value = mem['MEM_NO'];
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
	const recv_mem_no = document.querySelector('input[name="recvMemNo"]').value;
	//메세지 내용
	const content = document.querySelector('#content').value;
	
	location.href = '/message/sendMessage?recvMemNo=' + recv_mem_no + '&content=' + content;
}

//대화창에서 메세지 전송
function sendMessageConvers(recvMemNo, recvName){
	//보낼 메세지(content)
	const content = document.querySelector('#conversSendContent').value;
	
	//ajax start
	$.ajax({
		url: '/message/sendMessageAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'recvMemNo':recvMemNo, 'content':content},			//JSON.stringify(classInfo), //필요한 데이터
		success: function() {
			getConversContent(recvMemNo, recvName);
			},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//대화 메세지 목록 조회(1:1대화 내용들)
function getConversContent(recvMemNo, recvName){
	//ajax start
	$.ajax({
		url: '/message/getConversContentAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'recvMemNo':recvMemNo},			//JSON.stringify(classInfo), //필요한 데이터
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
			
			str += `<div class="row mt-3">`;
			str += `	<div class="col-12 recv_name">`;
			str += `		${recvName}`;
			str += `	</div>`;
			str += `</div>`;
			
			str += `<div class="row content_list">`
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
					str += `  <div class="col-12 text-center convers_date mt-2">`;
					str += `    ${dateString}`;
					str += `  </div>`;
					previousDate = currentDate;
				}
					
				if(convers['memNo'] == convers['SEND_MEM_NO']){
					str += `	<div class="col-12 text-end mt-3 mb-3">`;
					if(convers['READ_CHK']==1){
						str += `<span>`;
						str += `	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>`
						str += `</span>`
					}
					str += `		<span style="margin-right:5px;">${msg_hour}:${msg_minute}</span>`;
					str += `		<button class="content btn btn-primary msg" disabled>${convers['CONTENT']}</button>`;
					str += `	</div>`;
				}
				else{
					str += `	<div class="col-12 text-start mt-3 mb-3">`;
					str += `		<button class="content btn btn-primary msg" style="margin-right:5px;" disabled>${convers['CONTENT']}</button>`;
					str += `		<span>${msg_hour}:${msg_minute}</span>`;
					if(convers['READ_CHK']==1){
						str += `<span>`;
						str += `	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>`
						str += `</span>`
					}
					str += `	</div>`;
				}

			})
			str += `</div>`
			
			str += `<div class="row send_message text-center">`;
			str += `	<div class="col-10 d-grid">`;
			str += `		<input type="text" id="conversSendContent">`;
			str += `	</div>`;
			str += `	<div class="col-2 d-grid">`;
			str += `		<button class="btn btn-primary" onclick="sendMessageConvers('${recvMemNo}', '${recvName}')">보 내 기</button>`;
			str += `	</div>`;
			str += `</div>`;
			
			
			convers_content_tag.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

