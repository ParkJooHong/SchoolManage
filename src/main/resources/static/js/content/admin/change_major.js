init();

function init() {

	//모달창 닫히면 내부 내용 초기화
	const major_modal = new bootstrap.Modal('#majorModal');
	$(major_modal._element).on('hidden.bs.modal', function(e) {
		const img_modal_tag = document.querySelector('#memImg');
		img_modal_tag.src = '';
		document.querySelector('#memInfo').replaceChildren();
		document.querySelector('#memAddr').replaceChildren();
		document.querySelector('#memTell').replaceChildren();
		document.querySelector('#memYear').replaceChildren();
		document.querySelector('#memStatus').replaceChildren();
		document.querySelector('#memDept').replaceChildren();
		document.querySelector('#memDbDept').replaceChildren();
		document.querySelector('#fromColl').replaceChildren();
		document.querySelector('#toColl').replaceChildren();
		document.querySelector('#fromDept').replaceChildren();
		document.querySelector('#toDept').replaceChildren();
		document.querySelector('#reason').replaceChildren();
	});

};


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
	const checkboxes = document.querySelectorAll('#changeMajorBody input[type="checkbox"]');

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


//전과 신청 모달
function acceptChangeMajor() {
	const apply_no = document.querySelector('#memApplyNo').value;
	const mem_no = document.querySelector('#memNo').value;
	//ajax start
	$.ajax({
		url: '/admin/acceptChangeMajorAjax', //요청경로
		type: 'post',
		async: false, // 수정된 부분
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'applyNo': apply_no, 'memNo': mem_no }, //필요한 데이터
		success: function(result) {
			const major_modal = new bootstrap.Modal('#majorModal');

			const deptData = result['acceptData'];
			const memData = result['acceptInfoData'];

			const img_modal_tag = document.querySelector('#memImg');
			console.log(memData);
			img_modal_tag.src = `/image/memImg/${memData.memImgVO.attachedFileName}`;

			const mem_info_td = document.querySelector('#memInfo');

			let str = '';
			str += `<input type="hidden" id="stuNo" value= ${memData.stuVO.stuNo}>`
			str += `<input type="hidden" id="applyNo" value= ${deptData.applyNo}>`
			str += `<input type="hidden" id="toCollNo" value= ${deptData.toColl}>`
			str += `<input type="hidden" id="toDeptNo" value= ${deptData.toDept}>`
			str += `${memData.memName}`;
			str += '(';
			str += `${memData.memNo}`;
			str += '  ,  ';
			str += `${memData.memBirth}`;
			str += ')';
			mem_info_td.insertAdjacentHTML('afterbegin', str);

			const mem_addr_td = document.querySelector('#memAddr');
			mem_addr_td.insertAdjacentHTML('afterbegin', memData.memAddr);

			const mem_tell_td = document.querySelector('#memTell');
			mem_tell_td.insertAdjacentHTML('afterbegin', memData.memTell);

			const mem_year_td = document.querySelector('#memYear');
			let str1 = '';
			str1 += `${memData.stuVO.stuYear}`;
			str1 += '학년';
			str1 += ' ';
			str1 += `${memData.stuVO.stuSem}`;
			str1 += '학기';
			mem_year_td.insertAdjacentHTML('afterbegin', str1);
			const mem_status_td = document.querySelector('#memStatus');
			mem_status_td.insertAdjacentHTML('afterbegin', memData.stuVO.stuStatus);
			const mem_dept_td = document.querySelector('#memDept');
			mem_dept_td.insertAdjacentHTML('afterbegin', deptData.fromDeptName);
			const mem_db_dept_td = document.querySelector('#memDbDept');
			mem_db_dept_td.insertAdjacentHTML('afterbegin', deptData.doubleMajorDeptName);

			const from_coll_td = document.querySelector('#fromColl');
			from_coll_td.insertAdjacentHTML('afterbegin', deptData.fromCollName);
			const to_coll_td = document.querySelector('#toColl');
			to_coll_td.insertAdjacentHTML('afterbegin', deptData.toCollName);
			const from_dept_td = document.querySelector('#fromDept');
			from_dept_td.insertAdjacentHTML('afterbegin', deptData.fromDeptName);
			const to_dept_td = document.querySelector('#toDept');
			to_dept_td.insertAdjacentHTML('afterbegin', deptData.toDeptName);
			const apply_reason = document.querySelector('#reason');
			apply_reason.insertAdjacentHTML('afterbegin', deptData.applyReason);

			const accept_btn = document.querySelector('#acceptBtn');
			
			if(deptData.processStatus == '승인완료'){
				accept_btn.value = '승인완료';
				accept_btn.classList.add('disabled');				
			}

			major_modal.show();


		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//학적변동 승인
function updateStuInfo() {

	swal.fire({
		title: "승인하시겠습니까?",
		text: "진행하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((result) => {
		if (result.isConfirmed) {
			const mem_no = document.querySelector('#stuNo').value;
			const apply_no = document.querySelector('#applyNo').value;
			const to_coll = document.querySelector('#toCollNo').value;
			const to_dept = document.querySelector('#toDeptNo').value;

			stuData = {
				'memNo': mem_no,
				'applyNo': apply_no,
				'toColl': to_coll,
				'toDept': to_dept,
			}

			//ajax start
			$.ajax({
				url: '/admin/updateStuInfoAjax', //요청경로
				type: 'post',
				async: false,
				contentType: 'application/json; charset=UTF-8',
				//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: JSON.stringify(stuData), //필요한 데이터
				success: function(result) {
					swal.fire({
						title: "승인이 완료되었습니다.",
						icon: 'success',
						button: '확인',
					})
						.then((result) => {
							location.href = '/admin/changeMajor';
						})
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end

		} else if (result.isDismissed) {
			swal.fire({
				title: "승인이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	});

}




















