//메일 인증 보내기
function sendCatiMail() {
	const change_mail = document.querySelector('#changeMail').value;
	const reg_mail = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	const cati_btn = document.querySelector('#mailCatiBtn');

	//이메일 규정
	if (change_mail == '') {
		swal.fire({
			title: "빈값은 입력 될 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else if (!change_mail.match(reg_mail)) {
		swal.fire({
			title: "이메일 형식에 맞지 않습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		//ajax start
		$.ajax({
			url: '/member/sendCatiMailAjax', //요청경로
			type: 'post',
			async: true,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'changeMail': change_mail }, //필요한 데이터
			success: function(result) {
				if (result == true) {
					swal.fire({
						title: "인증번호가 전송 되었습니다.",
						icon: 'success',
						button: '확인',
					}).then((r) => {
						cati_btn.disabled = false;
					})

				}
				else if (result == false) {
					swal.fire({
						title: "중복된 이메일 입니다.",
						icon: 'success',
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

function checkByCatiNum() {
	const checked_num = document.querySelector('#catifiNumByMail').value;

	if (checked_num == '') {
		swal.fire({
			title: "빈 값은 입력 될 수 없습니다.",
			icon: 'error',
			button: '확인',
		});
		return
	}
	else {
		//ajax start
		$.ajax({
			url: '/member/checkCatiNumAjax', //요청경로
			type: 'post',
			async: true,
			contentType: 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'catiNum': checked_num }, //필요한 데이터
			success: function(result) {
				if (result == true) {
					swal.fire({
						title: "인증이 완료되었습니다.",
						icon: 'success',
						button: '확인',
					});
				}
				else {
					swal.fire({
						title: "인증번호가 일치하지 않습니다.",
						icon: 'error',
						button: '확인',
					});
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

//정보 변경
function changeMemberInfo() {
	const mail_cati_btn = document.querySelector('#mailCatiBtn').disabled;
	const change_mail = document.querySelector('#changeMail').value;
	const tell_cati_btn = document.querySelector('#tellCatiBtn').disabled;
	const change_tell = document.querySelector('#changeTell').value;
	const change_name = document.querySelector('#changeName').value;
	const change_addr = document.querySelector('#changeAddress').value;
	const change_detail_addr = document.querySelector('#changeAddrDetail').value;
	

		
	
	
	
	
	
	

	
	
	
	
	
	 
}


//오토 하이픈
const autoHyphen3 = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}