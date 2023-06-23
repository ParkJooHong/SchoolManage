//주소록 api실행
function searchAddr() {
	new daum.Postcode({
		oncomplete: function(data) {
			//도로명 주소
			const roadAddr = data.roadAddress;
			//도로명 주소 세팅
			document.querySelector('#inputAddress').value = roadAddr;

		}
	}).open();
}
//아이디 중복 검사
function checkId() {
	const mem_id = document.querySelector('#memberId');
	console.log(mem_id);
	const join_btn = document.querySelector('#joinBtn');
	let reg_id_rule = /^\d{8}$/;
	if (mem_id.value == '') {
		swal.fire({
			title: "오류",
			text: "빈 값은 입력될 수 없습니다.",
			icon: "warning",
			button: '확인',
		})
		return
	}
	else if (!mem_id.value.match(reg_id_rule)) {
		swal.fire({
			title: "오류",
			text: "8자리 숫자만 가능합니다.",
			icon: "warning",
			button: '확인',
		})
		return
	}
	else {
		//ajax start
		$.ajax({
			url: '/admin/checkIdAjax', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'memNo': mem_id.value }, //필요한 데이터
			success: function(result) {
				if (result == 0) {
					swal.fire({
						title: "성공",
						text: "사용 가능한 아이디 입니다.",
						icon: "success",
						button: '확인',
					}).then((r)=>{
						join_btn.disabled = false;
						mem_id.readOnly = true;
					})
				}
				else {
					swal.fire({
						title: "오류",
						text: "아이디가 중복입니다.",
						icon: "warning",
						button: '확인',
					})
					return
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end

	}
}

//메일인증 : 메일전송
function sendMail(tag) {
	
	let mail_bool = true;
	let str_mail_ck = '';
	//메일 입력 태그
	const input_email = document.querySelector('.detail_info #memEmail').value;
	//에러 메세지 입력 태그
	const vali_email = document.querySelector('#valiEmail');
	//이메일 정규식
	const reg_mail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	//이메일 규정
	if(input_email == ''){
		str_mail_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		mail_bool = false;
	}
	else if(!input_email.match(reg_mail)){
		str_mail_ck += '<div class="my-invalid">입력하신 이메일은 규정에 맞지 않습니다.</div>';
		mail_bool = false;
	}
	
	if(!mail_bool){
		vali_email.innerHTML = str_mail_ck;
	}
	else {
		//메일전송
		//ajax start
		$.ajax({
			url: '/admin/sendCatiMailAjax', //요청경로
			type: 'post',
			async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
			data: { 'mail': input_email },			//JSON.stringify(classInfo), //필요한 데이터
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(result) {
				swal.fire({
					title: "인증번호 전송완료",
					text: "입력하신 메일로 인증번호가 전송되었습니다.",
					icon: 'success',
					button: '확인'
				}).then((r)=>{
					//모달창 띄우기
					const modal = new bootstrap.Modal(document.querySelector('#mailAuthModal'));
					modal.show();
					
					//타이머 실행
					timer();
				})
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end 
	}
}

//메일인증
function mailAuth_1(){
	const input_auth_num = document.querySelector('#mailAuthModal #mailAuthNum').value;

	//ajax start
	$.ajax({
		url: '/admin/checkCatiNumAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'catiNum': input_auth_num},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if(result){
				swal.fire({
					title : "인증완료",
					text : "인증이 완료되었습니다",
					icon : 'success',
					button : '확인'
				}).then((r) => {
					$('#mailAuthModal').modal('hide');
					document.querySelector('#mailAuth').setAttribute('data-mail-auth', 'true');
					document.querySelector('#mailAuth').value = '인증완료'
					document.querySelector('#mailAuth').disabled = true
				});
			}
			else{
				swal.fire({
					title : "인증실패",
					text : "인증번호를 다시 확인하여주세요",
					icon : 'error',
					button : '확인'
				})
				return
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//인증 시간 타이머
let timerInterval;

function timer() {
	// 이미 실행 중인 타이머가 있다면 타이머를 정지
	if(timerInterval){
		clearInterval(timerInterval);
	}
	
	// 현재 시간에 5분을 더함
	let countdownTime = 60 * 5;
	
	timerInterval = setInterval(function() {
		
		let minutes = Math.floor(countdownTime / 60); // 분으로 변환
		let seconds = countdownTime % 60; // 초로 변환

		// 0 앞에 붙일 '0'을 미리 선언
        let displayMinutes = (minutes < 10 ? "0" : "") + minutes;
        let displaySeconds = (seconds < 10 ? "0" : "") + seconds;

		document.getElementById("mail_countdown").innerHTML = displayMinutes + ":" + displaySeconds;
		
		countdownTime--;
		
		// 타이머가 0에 도달했을 때 
		if (countdownTime < 0) {
			clearInterval(timerInterval);
			$('#mailAuthModal').modal('hide');
		}
	}, 1000);
}

//이메일 모달창을 닫을때 시간 초기화
$('#mailAuthModal').on('hide.bs.modal', function (e) {
   	clearInterval(timerInterval);
    document.querySelector('#mail_countdown').innerHTML = '05:00';
});


//벨리데이션
function validate(){
	//정규식
	const reg_pass = /^[A-Za-z0-9]{6,12}$/;
	const reg_name =  /^[가-힣]{2,4}$/;
	const reg_mail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	const reg_birth = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
	
	//오류 메세지
	let str_pw_ck = '';
	let str_name_ck = '';
	let str_add_ck = '';
	let str_de_ck = '';
	let str_mail_ck = '';
	let str_birth_ck = '';
	let str_img_ck = '';
	
	//서브밋 조건
	let pw_bool = true;
	let name_bool = true;
	let add_bool = true;
	let detail_bool = true;
	let mail_bool = true;
	let birth_bool = true;
	let img_bool = true;
	
	
	//입력 받는 값
	const input_pw = document.querySelector('#memPw').value;
	const input_name = document.querySelector('#memName').value;
	const input_addr = document.querySelector('#inputAddress').value;
	const input_detail = document.querySelector('#inputAddrDetail').value;
	const input_email = document.querySelector('#memEmail').value;
	const input_birth = document.querySelector('#memBirth').value;
	const input_img = document.querySelector('#memImg').value;
	
	//검사 결과 입력 태그	
	const vali_pw = document.querySelector('#valiPw');
	const vali_name = document.querySelector('#valiName');
	const vali_addr = document.querySelector('#valiAddr');
	const vali_detail = document.querySelector('#valiDetail');
	const vali_email = document.querySelector('#valiEmail');
	const vali_birth = document.querySelector('#valiBirth');
	const vali_img = document.querySelector('#valiImg');
	console.log(input_birth);
	
	
	
	//비밀번호 규정
	if(input_pw == ''){
		str_pw_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		pw_bool = false;
	}
	else if (!input_pw.match(reg_pass)){
		str_pw_ck += '<div class="my-invalid">입력한 비밀번호가 규정에 어긋납니다.</div>';
		pw_bool = false;
	}
	
	//이름 규정
	if(input_name == ''){
		str_name_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		name_bool = false;
	}
	else if(!input_name.match(reg_name)){
		str_name_ck += '<div class="my-invalid">이름은 2~4 글자 한글만 입력 가능합니다</div>';
		name_bool = false;
	}
	
	//주소 규정
	if(input_addr == ''){
		str_add_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		add_bool = false;
	}
	//상세주소 규정
	if(input_detail == ''){
		str_de_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		detail_bool = false;
	}
	//이메일 규정
	if(input_email == ''){
		str_mail_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		mail_bool = false;
	}
	else if(document.querySelector('#mailAuth').dataset.mailAuth =='false'){
		str_mail_ck += '<div class="my-invalid">메일이 인증되지 않았습니다.</div>';
		mail_bool = false;
	}
	else if(!input_email.match(reg_mail)){
		str_mail_ck += '<div class="my-invalid">입력하신 이메일은 규정에 맞지 않습니다.</div>';
		mail_bool = false;
	}
	//생년월일 규정
	if(input_birth == ''){
		str_birth_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		birth_bool = false;
	}
	else if(!input_birth.match(reg_birth)){
		str_birth_ck  += '<div class="my-invalid">입력하신 내용은 규정에 맞지 않습니다.</div>';
		birth_bool = false;
	}
	//이미지 빈값 체크
	if(input_img == ''){
		str_img_ck += '<div class="my-invalid">빈 값은 입력될 수 없습니다.</div>';
		img_bool = false;
	}
	
	
	vali_pw.insertAdjacentHTML('afterbegin',str_pw_ck);
	vali_name.insertAdjacentHTML('afterbegin', str_name_ck);
	vali_addr.insertAdjacentHTML('afterbegin',str_add_ck);
	vali_detail.insertAdjacentHTML('afterbegin',str_de_ck);
	vali_email.insertAdjacentHTML('afterbegin',str_mail_ck);
	vali_birth.insertAdjacentHTML('afterbegin', str_birth_ck);
	vali_img.insertAdjacentHTML('afterbegin',str_img_ck);
	
	return pw_bool && name_bool && add_bool && detail_bool && mail_bool && birth_bool && img_bool
	
}


//회원 등록
function insertMember() {
	const member_form = document.querySelector('#memberForm');

	const vali_div = document.querySelectorAll('.my-invalid');
	vali_div.forEach(function(v) {
		v.remove();
	});

	let is_valid = validate();
	if (is_valid) {
		swal.fire({
			title: "회원 등록 성공",
			text: "선택하신 권한에 따라 학생 또는 교직원 등록 페이지로 이동합니다. ",
			icon: 'success',
			button: '확인',
		})
			.then((result) => {

				member_form.action = '/admin/join';
				member_form.method = 'post';
				member_form.submit();
			})
	}
}

//오토 하이픈
const autoHyphen2 = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}
