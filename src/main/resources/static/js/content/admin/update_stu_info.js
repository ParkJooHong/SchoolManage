init();

function init() {

	//날짜 구하기
	const today = new Date();
	const monthAgo = new Date(today);
	monthAgo.setMonth(today.getMonth() - 1);



	//오늘날짜 선택
	document.querySelector('.nowDate').valueAsDate = today;

	//한달 전 날짜 선택
	document.querySelector('.monthDate').valueAsDate = monthAgo;




	//모달창 닫히면 내부 내용 초기화
	const state_modal = new bootstrap.Modal('#stateModal');
	$(state_modal._element).on('hidden.bs.modal', function(e) {
		const img_modal_tag = document.querySelector('#memImg');
		img_modal_tag.src = '';
		document.querySelector('#memInfo').replaceChildren();
		document.querySelector('#memBirth').replaceChildren();
		document.querySelector('#memYear').replaceChildren();
		document.querySelector('#memColl').replaceChildren();
		document.querySelector('#memDept').replaceChildren();
		document.querySelector('#memDouble').replaceChildren();
		document.querySelector('#statusReason').replaceChildren();
	});
}

//체크박스 바디 꺼지면 상단 꺼지는 기능
function checkControll() {
	const all_check = document.querySelector('#allChk');
	const total_cnt = document.querySelectorAll('.checkboxes').length;
	const checked_cnt = document.querySelectorAll('.checkboxes:checked').length;

	if (total_cnt == checked_cnt) {
		all_check.checked = true;

	}
	else {
		all_check.checked = false;

	}
}
//상단 전체 체크박스 on off
function allCheckControll(allCheck) {
	const checkboxes = document.querySelectorAll('.leaveTbody input[type="checkbox"]');

	if (allCheck.checked) {
		for (const chk of checkboxes) {
			chk.checked = true;
		}
	}
	else {
		for (const chk of checkboxes) {
			chk.checked = false;
		}
	}

}






//휴학 신청 모달창 열기
function stateModalOpen(status_no,stu_no) {
	const state_modal = new bootstrap.Modal('#stateModal');

	//ajax start
	$.ajax({
		url: '/admin/statusModalOpenAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'statusNo': status_no,'stuNo':stu_no }, //필요한 데이터
		success: function(result) {
			console.log(result);
			const member_info = result['memberInfo'];
			const status_info = result['statusInfo'];
			let str = '';
			const mem_info = document.querySelector('#memInfo');
			str += `${member_info.memName} (${member_info.stuVO.stuNo} , ${status_info.nowStatus})`

			mem_info.insertAdjacentHTML('afterbegin', str);

			const mem_birth = document.querySelector('#memBirth');
			mem_birth.insertAdjacentHTML('afterbegin', member_info.memBirth);

			const mem_year = document.querySelector('#memYear');
			let str1 = '';
			str1 += `${member_info.stuVO.stuYear}학년 ${member_info.stuVO.stuSem}학기`;

			mem_year.insertAdjacentHTML('afterbegin', str1);

			const mem_coll = document.querySelector('#memColl');
			mem_coll.insertAdjacentHTML('afterbegin', member_info.colleageVO.collName);

			const mem_dept = document.querySelector('#memDept');
			mem_dept.insertAdjacentHTML('afterbegin', member_info.deptVO.deptName);

			const mem_double = document.querySelector('#memDouble');
			mem_double.insertAdjacentHTML('afterbegin', member_info.doubleMajorVO.doubleDeptName);

			const img_modal_tag = document.querySelector('#memImg');
			img_modal_tag.src = `/image/memImg/${member_info.memberVO.memImgVO.attachedFileName}`;

			const status_reason = document.querySelector('#statusReason');
			status_reason.insertAdjacentHTML('afterbegin', status_info.statusReason);

			state_modal.show();

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}

function changeStatus(status_no, stu_no) {
	swal.fire({
		title: "휴학신청",
		text: "휴학신청을 승인하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "승인",
		cancelButtonText: "취소"
	})
		.then((result) => {

			if (result.isConfirmed) {

				//ajax start
				$.ajax({
					url: '/admin/changeStatusAjax', //요청경로
					type: 'post',
					async: true,
					//contentType : 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'statusNo': status_no, 'stuNo': stu_no }, //필요한 데이터
					success: function(result) {
						if (result != 0) {
							swal.fire({
								title: '완료',
								text: '휴학신청 승인이 완료되었습니다.',
								icon: "success",
								button: '확인'
							})
								.then((result) => {
									document.querySelector('#waitRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});

									document.querySelector('#confirmRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});

								})
						}
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end



			}
			else if (result.isDismissed) {
				swal.fire({
					title: "승인이 취소되었습니다.",
					icon: 'success',
					button: '확인',
				})
					.then((result) => {
						document.querySelector('#waitRadio').checked = true;
						document.querySelector('#confirmRadio').checked = false;
					})
			}
		});
}





