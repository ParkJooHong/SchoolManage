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

//메일 인증
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
						title: "변경 완료.",
						text: "변경이 완료되었습니다",
						icon: 'success',
						button: '확인',
					}).then((r) => {
						updateMemInfo('memEmail')
					})
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

//연락처 변경 문자 인증번호 발송
function sendSms() {
	const memTell = document.querySelector('#changeInfoModal #changeTell').value;

	if (memTell == null || memTell == '') {
		swal.fire({
			title: "실패",
			text: "전화번호를 입력해주세요",
			icon: 'error',
			button: '확인',
		});
	}
	else {
		//ajax start
		$.ajax({
			url: '/member/updateTellsendSmsAjax', //요청경로
			type: 'post',
			async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
			data: { 'memTell': memTell },			//JSON.stringify(classInfo), //필요한 데이터
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(result) {
				if (result) {
					swal.fire({
						title: "문자 전송 완료",
						text: "입력한 번호로 코드가 전송되었습니다",
						icon: 'success',
						button: '확인',
					});
					document.querySelector('#tell_auth').disabled = false;
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end 
	}
}

//sms 인증하고 연락처 변경
function updateMemTell() {

	const input_num = document.querySelector('#smsNum').value;
	//ajax start
	$.ajax({
		url: '/member/phoneAuthOkAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'inputNum': input_num },			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if (!result) {
				swal.fire({
					title: "변경완료",
					text: "연락처 변경이 완료되었습니다.",
					icon: 'success',
					button: '확인',
				}).then((r) => {
					updateMemInfo('memTell')
				})
			}
			else {
				swal.fire({
					title: "인증실패",
					text: "인증 번호가 다릅니다.",
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

//회원 정보 변경
function updateMemInfo(data) {
	
	let memberVO ={
	}
	if(data == 'memEmail'){
		const mem_email = document.querySelector('#changeInfoModal #catifiNumByMail').value;
		
		if (mem_email == null || mem_email == '') {
			swal.fire({
				title: "빈 값은 입력 될 수 없습니다.",
				icon: 'error',
				button: '확인',
			});
			return
		}
		else{
			memberVO = Object.assign({}, memberVO, {
				memEmail : mem_email
			});
		}
	}
	else if(data == 'memTell'){
		const mem_tell = document.querySelector('#changeInfoModal #changeTell').value;

		if (mem_tell == null || mem_tell == '') {
			swal.fire({
				title: "빈 값은 입력 될 수 없습니다.",
				icon: 'error',
				button: '확인',
			});
			return
		}
		else{
			memberVO = Object.assign({}, memberVO, {
				memTell : mem_tell
			});
		}
	}
	else if(data == 'memName'){
		const mem_name = document.querySelector('#changeInfoModal #changeName').value

		if (mem_name == null || mem_name == '') {
			swal.fire({
				title: "빈 값은 입력 될 수 없습니다.",
				icon: 'error',
				button: '확인',
			});
			return
		}
		else{
			memberVO = Object.assign({}, memberVO, {
				memName : mem_name
			});
		}
	}
	else if(data == 'memAddr'){
		const mem_addr = document.querySelector('#changeInfoModal #changeAddress').value
		const mem_addr_detail = document.querySelector('#changeInfoModal #changeAddrDetail').value

		if ((mem_addr == null || mem_addr == '') || (mem_addr_detail == null || mem_addr_detail == ''))  {
			swal.fire({
				title: "빈 값은 입력 될 수 없습니다.",
				icon: 'error',
				button: '확인',
			});
			return
		}
		else{
			memberVO = Object.assign({}, memberVO, {
				memAddr : mem_addr,
				memAddrDetail : mem_addr_detail
			});
		}
	}
	
	//ajax start
	$.ajax({
		url: '/member/updateMemInfoAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: JSON.stringify(memberVO) ,			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		success: function(result) {
			if (result) {
				swal.fire({
					title: "정보 변경 완료",
					text: "정보가 변경되었습니다.",
					icon: 'success',
					button: '확인',
				});
			}
			else{
				swal.fire({
					title: "정보 변경 실페",
					text: "제대로 입력하였는지 확인해주세요.",
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

//오토 하이픈
const autoHyphen3 = (target) => {
	target.value = target.value
		.replace(/[^0-9]/g, '')
		.replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}