function login() {
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
			else if (result == 'admin' || result == 'stu') {
				const role = result
				swal.fire({
					title: "로그인 성공",
					icon: 'success',
					button: '확인',
				})
					.then((result) => {
						if (role == 'admin') {
							location.href = '/admin/joinMember';
						}
						else {
							location.href = '/mainPage';
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

//아이디 찾기
function findId() {
	let memName = document.querySelector('#findIdForm #memName').value;
	let memEmail = document.querySelector('#findIdForm #memEmail').value;
	//ajax start
	$.ajax({
		url: '/member/findId', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: { 'memName': memName, 'memEmail': memEmail }, //필요한 데이터
		success: function(result) {
			if (result == null || result == '') {
				swal.fire({
					title: "아이디 찾기 실패",
					text: "이름 또는 이메일이 잘못 되었습니다",
					icon: 'error',
					button: '확인',
				})
				//id, pw input 태그 초기화
				memNo = '';
				memEmail = '';

				//경고창 메세지 띄우기
				if (document.querySelector('#error_find_id_div').querySelector('div') == null) {
					const error_div = document.querySelector('#error_find_id_div');

					let str = '';
					str += `<div style="color: red; font-size: 0.9rem; text-align: left;">`
					str += `이름 또는 이메일을 확인하세요.`
					str += `</div>`

					error_div.insertAdjacentHTML('beforeend', str);
				}
			}
			else {
				const find_memNo = result;
				const message = `당신의 학번(교직원번호)는 <div style="color:#554d4a"><strong>${find_memNo}</strong>입니다</div>`;
				swal.fire({
					title: "정보 체크 완료",
					html: message,
					icon: 'success',
					button: '확인',
				})
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//배경 자동전환 (애니메이션)
//메인페이지 전체 선택
const imgContainer = document.querySelector('.login_backgroung');

const images = ['/image/login/img_login00.jpg', '/image/login/img_login01.png', '/image/login/img_login02.png']; // 이미지 경로를 배열로 저장

let currentImageIndex = 0;

const intervalDuration = 3000; // 이미지 전환 간격 (밀리초)

// 이미지를 로드하고 배경 이미지로 설정하는 함수
    function loadAndSetImage(index) {
      const image = new Image();
      image.src = images[index];
      image.onload = () => {
        imgContainer.style.backgroundImage = `url(${images[index]})`;
      };
    }

    setInterval(() => {
      // 다음 이미지 인덱스 계산
      currentImageIndex = (currentImageIndex + 1) % images.length;

      // 다음 이미지로 배경 이미지 변경하여 표시
      loadAndSetImage(currentImageIndex);
    }, intervalDuration);

    // 초기에 첫 번째 이미지 로드하여 표시
    loadAndSetImage(0);






