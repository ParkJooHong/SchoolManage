//비번 변경
function updatePw() {
	const mem_id = document.querySelector('#memId').value;
	const now_pwd = document.querySelector('#nowPwd').value;
	const change_pwd = document.querySelector('#changePwd').value;
	const check_pwd = document.querySelector('#checkPwd').value;
	let reg_pass = /^[A-Za-z0-9]{6,12}$/;
	console.log(change_pwd);
	swal.fire({
		title: "비밀번호 변경",
		text: "변경하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			if (now_pwd == '') {
				swal.fire({
					title: "빈값은 입력될 수 없습니다.",
					icon: 'warning',
					button: '확인',
				});
				return
			}
			else if (change_pwd == '') {
				swal.fire({
					title: "빈값은 입력될 수 없습니다.",
					icon: 'warning',
					button: '확인',
				});

				return
			}
			else if (check_pwd == '') {
				swal.fire({
					title: "빈값은 입력될 수 없습니다.",
					icon: 'warning',
					button: '확인',
				});
				return
			}
			else if (!reg_pass.test(change_pwd)) {
				swal.fire({
					title: "영문, 숫자 조합으로 \n 6자리 이상 입력해 주세요.",
					icon: 'warning',
					button: '확인',
				});
				return
			}
			else if (!reg_pass.test(check_pwd)) {
				swal.fire({
					title: "영문, 숫자 조합으로 \n 6자리 이상 입력해 주세요.",
					icon: 'warning',
					button: '확인',
				});
				return
			}
			else if (change_pwd != check_pwd) {
				swal.fire({
					title: "중복검사된 비밀번호가 일치하지 않습니다.",
					icon: 'warning',
					button: '확인',
				});
				return
			}
			else if(change_pwd == now_pwd){
				swal.fire({
					title: "현재 비밀번호와 동일한 비밀번호 입니다.",
					icon: 'warning',
					button: '확인',
				});
				return
			}
			else {
				//ajax start
				$.ajax({
					url: '/member/updatePwAjax', //요청경로
					type: 'post',
					async: true,
					//contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'memPw': now_pwd, 'memNo': mem_id }, //필요한 데이터
					success: function(result) {
						if (result == false) {
							swal.fire({
								title: "현재 비밀번호가 일치하지 않습니다.",
								icon: 'warning',
								button: '확인',
							});
							return
						}
						else {
							//ajax start
							$.ajax({
								url: '/member/changePwAjax', //요청경로
								type: 'post',
								async: true,
								//contentType: 'application/json; charset=UTF-8',
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								data: { 'memPw': check_pwd, 'memNo': mem_id }, //필요한 데이터
								success: function(result) {
									if (result != 0) {
										swal.fire({
											title: "비밀번호가 변경되었습니다.",
											icon: 'success',
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
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end

			}


		}
		else if (r.isDismissed) {
			swal.fire({
				title: "승인이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	})

}