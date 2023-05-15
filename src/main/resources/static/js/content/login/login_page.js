function login(){
	let memNo = document.querySelector('#memNo').value;
	let memPw = document.querySelector('#memPw').value;
	//ajax start
	$.ajax({
		url: '/member/login', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: { 'memNo': memNo, 'memPw': memPw }, //필요한 데이터
		success: function(result) {
			if (result == 'fail') {
				swal.fire({
					title: "로그인 실패",
					text: "아이디 또는 비밀번호가 잘못 되었습니다",
					icon: 'error',
					button: '확인',
				})
				//id, pw input 태그 초기화
				memNo = '';
				memPw = '';
			
				
				//경고창 메세지 띄우기
				if (document.querySelector('.input_pw').querySelector('div') == null) {
					const error_div = document.querySelector('.input_pw');

					let str = '';
					str += `<div style="color: red; font-size: 0.9rem; text-align: left;">`
					str += `로그인 정보를 확인하세요.`
					str += `</div>`

					error_div.insertAdjacentHTML('beforeend', str);
				}
			}
			else if (result == 'success') {
				swal.fire({
					title: "로그인 성공",
					icon: 'success',
					button: '확인',
				})
					.then((result) => {
						if (result == 'admin') {
							location.href = '/';
						}
						else{
							location.href = '/';
						}
					})
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
} 	