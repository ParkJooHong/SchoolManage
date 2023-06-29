employmentChart();

function enterLogin(e){
	if(e.keyCode == 13){
		login()
	}
}

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
					
					document.querySelector('.log_error').remove()

					let str = '';
					str += `<div class="log_error" style="color: red; font-size: 0.9rem; text-align: left; height:1.5rem">`
					str += `${log_error}`
					str += `</div>`

					error_div.insertAdjacentHTML('beforeend', str);
				}
			}
			else if (result == 'admin' || result == 'stu' || result == 'professor') {
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
						else if(role == 'professor'){
							location.href = '/professor/regLecture';
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
		url: '/member/findIdAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		//data: loginData, //필요한 데이터
		data: { 'memName': memName, 'memEmail': memEmail }, //필요한 데이터
		success: function(result) {
			
			console.log(result);	
		
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
					str += `<div style="color: red; font-size: 0.9rem; text-align: left; margin-top:10px">`
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

function findPw(){
	const mem_no = document.querySelector('#findPwModal #memNo').value;
	const mem_email = document.querySelector('#findPwModal #memEmail').value;

	//ajax start
	$.ajax({
		url: '/member/findPwAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'memNo': mem_no, 'memEmail': mem_email }, //필요한 데이터
		success: function(result) {
			if (result == true) {
				swal.fire({
					title: "성공",
					text: "입력하신 이메일로 임시 비밀번호가 \n 발송되었습니다.",
					icon: 'success',
					button: '확인',

				});
			}
			else {
				swal.fire({
					title: "실패",
					text: "알 수 없는 오류가 발생했습니다 \n 관리자에게 문의하세요",
					icon: 'warning',
					button: '확인',

				});
			}
		},
		error: function() {
			alert('실패');
		}
	});
		//ajax end
}

//문자 인증번호 발송
//1. 등록된 휴대전화가 있는지 검증후 검증이 되면 문자발송
function tellAutho(){
	const memTell = document.querySelector('#findPwForm #memTell').value;
	
	if(memTell == null || memTell == ''){
		swal.fire({
			title: "실패",
			text: "전화번호를 입력해주세요",
			icon: 'error',
			button: '확인',
		});
	}
	else{
		//ajax start
		$.ajax({
			url: '/member/phoneAuthAjax', //요청경로
			type: 'post',
			async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
			data: {'memTell':memTell},			//JSON.stringify(classInfo), //필요한 데이터
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(result) {
				if(result){
					swal.fire({
						title: "문자 전송 완료",
						text: "입력한 번호로 코드가 전송되었습니다",
						icon: 'success',
						button: '확인',
					});
					document.querySelector('#tell_auth').disabled = false;
				}
				else{
					swal.fire({
						title: "등록된 번호없음",
						text: "등록된 휴대폰 번호가 없습니다",
						icon: 'error',
						button: '확인',
					});
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end 
	}
}

//2. 인증하기
function auth_sms() {
	
	const input_num = document.querySelector('#authNum').value;
	//ajax start
	$.ajax({
		url: '/member/phoneAuthOkAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'inputNum':input_num},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if (!result) {
				swal.fire({
					title: "인증완료",
					text: "문자 인증이 완료되었습니다",
					icon: 'success',
					button: '확인',
				});
				document.querySelector('#findPwBtn').disabled = false;
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}


//대학별 취업률 차트
function employmentChart() {
	//ajax start
	$.ajax({
		url: '/restApi', //요청경로
		type: 'get',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		success: function(result) {
			//json데이터로 변환
			const json_data = JSON.parse(result)
			console.log(json_data)
			//차트를 그려줄 태그
			const div_tag = document.querySelector('.chart')
			//각 데이터를 배열로 저장
			let categories = Object.keys(json_data);
			console.log(categories);
			let graduation_data = categories.map(category => json_data[category]["졸업자(명)"])
			let employment_data = categories.map(category => json_data[category]["취업자(명)"])
			let employment_rate = categories.map(category => json_data[category]["취업률(%)"])
		

			let employment_chart = new Chart(document.querySelector('.chart'), {
				type: 'bar',
				data: {
					labels: categories,
					datasets: [{
						label: '취업률(%)',
						data: employment_rate,
						type: 'line',
						fill: false,
						backgroundColor: 'rgba(75, 192, 192, 1)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
						yAxisID: 'y1',
						},
						{
						label: '졸업자(명)',
						data: graduation_data,
						backgroundColor: 'rgba(255, 99, 132, 0.2)',
						borderColor: 'rgba(255, 99, 132, 1)',
						yAxisID: 'y2',
						},
						{
						label: '취업자(명)',
						data: employment_data,
						backgroundColor: 'rgba(54, 162, 235, 0.2)',
						borderColor: 'rgba(54, 162, 235, 0.2)',
						yAxisID: 'y2',
						}]
				},
				options: {
					legend: {
						display: false
					},
					scales: {
						y1: {
							type: 'linear',
							position: 'left',
							ticks: {
								beginAtZero: true,
								callback: function(value, index, values) {
									return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
								},
							},
							scaleLabel: {
								display: true,
								position: 'left',
								labelString: '(단위 : 원)'
							},
						},

						y2: {

							type: 'linear',
							position: 'left',
							ticks: {
								beginAtZero: true,
								callback: function(value, index, values) {
									return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건';
								},
							},
							scaleLabel: {
								display: true,
								position: 'right',
								labelString: '(단위 : 개)'
							},
							grid: {
								drawOnChartArea: false, // only want the grid lines for one axis to show up
							},
						},
					},
					tooltips: {
						mode: 'index',
						callbacks: {
							label: function(tooltipItem, data) {
								let dataset = data.datasets[tooltipItem.datasetIndex];
								let value = tooltipItem.yLabel;

								if (tooltipItem.datasetIndex === 0) {
									return '금액 ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원';
								} else {
									return '건수 ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '건';
								}
							}
						}
					}
				}
			});

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//모달창이 닫힐때 입력한 정보 초기화
//1.아이디 찾기 모달창
$('#findIdModal').on('hide.bs.modal', function (e) {
	document.querySelector('#findIdModal #memName').value = '';
	document.querySelector('#findIdModal #memEmail').value = '';
	if(document.querySelector('#findIdModal #error_find_id_div div') != null){
		document.querySelector('#findIdModal #error_find_id_div div').innerHTML = '';
	}
});

//2.아이디 찾기 모달창
$('#findPwModal').on('hide.bs.modal', function (e) {
	document.querySelector('#findPwModal #memNo').value = '';
	document.querySelector('#findPwModal #memEmail').value = '';
	document.querySelector('#findPwModal #memTell').value = '';
});


//오토 하이픈
const autoHyphen2 = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
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






