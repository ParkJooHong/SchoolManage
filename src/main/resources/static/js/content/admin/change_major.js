init();

function init() {
	//날짜 구하기
	const today = new Date();
	const monthAgo = new Date(today);
	monthAgo.setMonth(today.getMonth() - 1);



	//오늘날짜 선택
	document.querySelector('.nowDate').valueAsDate = today;
	document.querySelector('.dbNowDate').valueAsDate = today;

	//한달 전 날짜 선택
	document.querySelector('.monthDate').valueAsDate = monthAgo;
	document.querySelector('.dbMonthDate').valueAsDate = monthAgo;


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
	//복수전공 신청 모달창 닫히면 내부 내용 초기화
	const double_modal = new bootstrap.Modal('#doubleModal');
	$(double_modal._element).on('hidden.bs.modal', function(e) {
		const img_modal_tag = document.querySelector('#doubleMemImg');
		img_modal_tag.src = '';
		document.querySelector('#doubleMemInfo').replaceChildren();
		document.querySelector('#doubleMemAddr').replaceChildren();
		document.querySelector('#doubleMemTell').replaceChildren();
		document.querySelector('#doubleMemYear').replaceChildren();
		document.querySelector('#doubleMemStatus').replaceChildren();
		document.querySelector('#doubleMemDept').replaceChildren();
		document.querySelector('#doubleMemDbDept').replaceChildren();
		document.querySelector('#doubleReason').replaceChildren();
	});

};


//체크박스 바디 꺼지면 상단 꺼지는 기능
function checkControll() {
	const all_check = document.querySelector('#allChk');
	const double_all_check = document.querySelector('#dAllCheck');
	const total_cnt = document.querySelectorAll('.checkboxes').length;
	const checked_cnt = document.querySelectorAll('.checkboxes:checked').length;
	const double_cnt = document.querySelectorAll('.doubleCheckboxes').length;
	const checked_double_cnt = document.querySelectorAll('.doubleCheckboxes:checked').length;

	if (total_cnt == checked_cnt) {
		all_check.checked = true;

	}
	else {
		all_check.checked = false;

	}
	if (double_cnt == checked_double_cnt) {
		double_all_check.checked = true;
	}
	else {
		double_all_check.checked = false;
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
//하단 전체 체크박스 on off
function doubleCheckControll(allCheck) {
	const double_checkboxes = document.querySelectorAll('#doubleTbody input[type="checkbox"]');

	if (allCheck.checked) {
		for (const chk of double_checkboxes) {
			chk.checked = true;
		}
	}
	else {
		for (const chk of double_checkboxes) {
			chk.checked = false;
		}
	}


}

//전과 신청 모달
function acceptChangeMajor(count_num) {
	const apply_no = document.querySelector(`#memApplyNo${count_num}`).value;
	const mem_no = document.querySelector(`#memNo${count_num}`).value;
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

			if (deptData.processStatus == '승인완료') {
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
		title: "학적 변동",
		text: "승인하시겠습니까?",
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


//승인상태에 따른 검색
function searchByStatus(status) {
	$.ajax({
		url: '/admin/searchByStatusAjax',
		type: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: { 'processStatus': status.value },
		success: function(result) {
			const table_body = document.querySelector('#changeMajorBody');
			table_body.replaceChildren();
			let str = '';
			result.forEach(function(dept, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="hidden" id="memApplyNo${index + 1}" value="${dept.applyNo}">`;
				str += `<input type="hidden" id="memNo${index + 1}" value="${dept.memberVO.memNo}">`;
				str += `<input type="checkbox" checked onclick="checkControll();" class="form-check-input checkboxes">`;
				str += '</td>'
				str += `<td>${result.length - index}</td>`;
				str += `<td>${dept.memberVO.memName}</td>`;
				str += `<td>${dept.memberVO.memNo}</td>`;
				str += `<td>${dept.stuYear}</td>`;
				str += `<td>${dept.fromCollName}</td>`;
				str += `<td>${dept.fromDeptName}</td>`;
				str += `<td>${dept.toCollName}</td>`;
				str += `<td>${dept.toDeptName}</td>`;
				str += `<td>${dept.applyDate}</td>`;
				str += '<td class="d-grid">';
				if (dept.processStatus == '승인대기') {
					str += `<input type="button" value="승인" onclick="acceptChangeMajor(${index + 1});" class="btn btn-primary">`;
				}
				if (dept.processStatus == '승인완료') {
					str += `<input type="button" value="완료" onclick="acceptChangeMajor(${index + 1});" class="btn btn-primary">`;
				}
				str += '</td>';
				str += '</tr>';
			});
			table_body.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});


}

//날짜별 검색
function searchByDate() {
	const to_date = document.querySelector('.monthDate').value;
	const from_date = document.querySelector('.nowDate').value;

	//ajax start
	$.ajax({
		url: '/admin/searchByDateAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'toDate': to_date, 'fromDate': from_date }, //필요한 데이터
		success: function(result) {
			const table_body = document.querySelector('#changeMajorBody');
			table_body.replaceChildren();
			let str = '';
			result.forEach(function(dept, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="hidden" id="memApplyNo${index + 1}" value="${dept.applyNo}">`;
				str += `<input type="hidden" id="memNo${index + 1}" value="${dept.memberVO.memNo}">`;
				str += `<input type="hidden" th:class="deptStatus" th:value="${dept.processStatus}">`
				str += `<input type="checkbox" value="${dept.applyNo}" checked onclick="checkControll();" class="form-check-input checkboxes">`;
				str += '</td>'
				str += `<td>${result.length - index}</td>`;
				str += `<td>${dept.memberVO.memName}</td>`;
				str += `<td>${dept.memberVO.memNo}</td>`;
				str += `<td>${dept.stuYear}</td>`;
				str += `<td>${dept.fromCollName}</td>`;
				str += `<td>${dept.fromDeptName}</td>`;
				str += `<td>${dept.toCollName}</td>`;
				str += `<td>${dept.toDeptName}</td>`;
				str += `<td>${dept.applyDate}</td>`;
				str += '<td class="d-grid">';
				if (dept.processStatus == '승인대기') {
					str += `<input type="button" value="승인" onclick="acceptChangeMajor(${index + 1});" class="btn btn-primary">`;
				}
				if (dept.processStatus == '승인완료') {
					str += `<input type="button" value="완료" onclick="acceptChangeMajor(${index + 1});" class="btn btn-primary">`;
				}
				str += '</td>';
				str += '</tr>';
			});
			table_body.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//일괄 승인
function checkedAccept() {
	const checkboxes = document.querySelectorAll('#changeMajorBody input[type="checkbox"]:checked');
	applyCodeList = [];
	const dept_status = document.querySelectorAll('.deptStatus');
	for (let i = 0; i < checkboxes.length; i++) {
		applyCodeList[i] = checkboxes[i].value;
	};
	applyData = {
		'applyCodeList': applyCodeList
	};
	if (applyCodeList.length == 0) {
		swal.fire({
			title: "경고",
			text: "선택된 내용이 없습니다!",
			icon: 'error',
			button: '확인',
		})
		return;
	}
	for (const st of dept_status) {
		if (st.value == '승인완료') {
			swal.fire({
				title: "경고",
				text: "승인된 내용이 있습니다 다시 확인해주세요.",
				icon: 'error',
				button: '확인',
			})

		}
		return;
	}



	swal.fire({
		title: "승인하시겠습니까?",
		text: "진행하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((result) => {
		if (result.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/admin/checkedAcceptAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: JSON.stringify(applyData), //필요한 데이터
				success: function(result) {
					if (result != 0) {
						swal.fire({
							title: "승인완료",
							text: "일괄 승인이 완료되었습니다",
							icon: 'success',
							button: '확인',
						})
							.then((result) => {
								searchByStatus();
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
			});
		}
	});

}


//복수전공 신청 모달
function acceptDoubleMajor(count_num) {
	const apply_no = document.querySelector(`#dmemApplyNo${count_num}`).value;
	const mem_no = document.querySelector(`#dmemNo${count_num}`).value;

	//ajax start
	$.ajax({
		url: '/admin/acceptDoubleMajorAjax', //요청경로
		type: 'post',
		async: false, // 수정된 부분
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'applyNo': apply_no, 'memNo': mem_no }, //필요한 데이터
		success: function(result) {
			const double_modal = new bootstrap.Modal('#doubleModal');

			const deptData = result['acceptData'];
			const memData = result['acceptInfoData'];

			const img_modal_tag = document.querySelector('#doubleMemImg');
			console.log(deptData);
			console.log(memData);
			img_modal_tag.src = `/image/memImg/${memData.memImgVO.attachedFileName}`;

			const mem_info_td = document.querySelector('#doubleMemInfo');

			let str = '';
			str += `<input type="hidden" id="stuNoDb" value= ${memData.stuVO.stuNo}>`;
			str += `<input type="hidden" id="applyNoDb" value= ${deptData.applyNo}>`;
			str += `<input type="hidden" id="doubleDeptNo" value="${deptData.doubleMajorDept}">`;
			str += `<input type="hidden" id="doubleCollNo" value="${deptData.doubleMajorColl}">`;
			str += `${memData.memName}`;
			str += '(';
			str += `${memData.memNo}`;
			str += '  ,  ';
			str += `${memData.memBirth}`;
			str += ')';
			mem_info_td.insertAdjacentHTML('afterbegin', str);

			const mem_addr_td = document.querySelector('#doubleMemAddr');
			mem_addr_td.insertAdjacentHTML('afterbegin', memData.memAddr);

			const mem_tell_td = document.querySelector('#doubleMemTell');
			mem_tell_td.insertAdjacentHTML('afterbegin', memData.memTell);

			const mem_year_td = document.querySelector('#doubleMemYear');
			let str1 = '';
			str1 += `${memData.stuVO.stuYear}`;
			str1 += '학년';
			str1 += ' ';
			str1 += `${memData.stuVO.stuSem}`;
			str1 += '학기';
			mem_year_td.insertAdjacentHTML('afterbegin', str1);
			const mem_status_td = document.querySelector('#doubleMemStatus');
			mem_status_td.insertAdjacentHTML('afterbegin', memData.stuVO.stuStatus);
			const mem_dept_td = document.querySelector('#doubleMemDept');
			mem_dept_td.insertAdjacentHTML('afterbegin', deptData.deptVO.deptName);
			const mem_db_dept_td = document.querySelector('#doubleMemDbDept');
			let doubleMajor = '';
			if (deptData.doubleMajorDeptName == null) {
				doubleMajor = '없음';
			}
			mem_db_dept_td.insertAdjacentHTML('afterbegin', doubleMajor);
			const apply_reason = document.querySelector('#doubleReason');
			apply_reason.insertAdjacentHTML('afterbegin', deptData.applyReason);

			const accept_btn = document.querySelector('#acceptDoubleBtn');

			if (deptData.processStatus == '승인완료') {
				accept_btn.value = '승인완료';
				accept_btn.classList.add('disabled');
			}

			double_modal.show();


		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//복수전공 승인상태에 따른 검색
function searchByDoubleStatus(status) {
	$.ajax({
		url: '/admin/searchByDoubleStatusAjax',
		type: 'post',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: { 'processStatus': status },
		success: function(result) {
			console.log(result);
			const table_body = document.querySelector('#doubleTbody');
			table_body.replaceChildren();
			let str = '';
			result.forEach(function(double, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="hidden" id="dmemApplyNo${index + 1}" value="${double.applyNo}">`;
				str += `<input type="hidden" id="dmemNo${index + 1}" value="${double.stuVO.stuNo}">`;
				str += `<input type="hidden" class="deptStatus" value="${double.processStatus}">`;
				str += `<input type="checkbox" checked onclick="checkControll();" data-process-status="${double.processStatus}" value="${double.applyNo}" data-stu-no="${double.stuVO.stuNo}" data-double-dept-no="${double.doubleMajorDept}" class="form-check-input checkboxes">`;
				str += '</td>'
				str += `<td>${result.length - index}</td>`;
				str += `<td>${double.memberVO.memName}</td>`;
				str += `<td>${double.stuVO.stuNo}</td>`;
				str += `<td>${double.stuYear}학년 ${double.stuSem}학기</td>`;
				str += `<td>${double.colleageVO.collName}</td>`;
				str += `<td>${double.deptVO.deptName}</td>`;
				str += `<td>${double.doubleMajorCollName}</td>`;
				str += `<td>${double.doubleMajorDeptName}</td>`;
				str += `<td>${double.applyDate}</td>`;
				str += '<td class="d-grid">';
				if (double.processStatus == '승인대기') {
					str += `<input type="button" value="승인" onclick="acceptDoubleMajor(${index + 1});" class="btn btn-primary">`;
				}
				if (double.processStatus == '승인완료') {
					str += `<input type="button" value="완료" onclick="acceptDoubleMajor(${index + 1});" class="btn btn-primary">`;
				}
				str += '</td>';
				str += '</tr>';
			});
			table_body.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});


}


//날짜별 복수전공 검색
function searchByDateDouble() {
	const to_date = document.querySelector('.dbMonthDate').value;
	const from_date = document.querySelector('.dbNowDate').value;

	//ajax start
	$.ajax({
		url: '/admin/searchByDateDoubleAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'toDate': to_date, 'fromDate': from_date }, //필요한 데이터
		success: function(result) {
			console.log(result);
			const table_body = document.querySelector('#doubleTbody');
			table_body.replaceChildren();
			let str = '';
			result.forEach(function(double, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="hidden" id="dmemApplyNo${index + 1}" value="${double.applyNo}">`;
				str += `<input type="hidden" id="dmemNo${index + 1}" value="${double.stuVO.stuNo}">`;
				str += `<input type="hidden" class="deptStatus" value="${double.processStatus}">`;
				str += `<input type="checkbox" checked onclick="checkControll();" data-process-status="${double.processStatus}" data-stu-no="${double.stuVO.stuNo}" data-double-dept-no="${double.doubleMajorDept}" value="${double.applyNo}" class="form-check-input checkboxes">`;
				str += '</td>'
				str += `<td>${result.length - index}</td>`;
				str += `<td>${double.memberVO.memName}</td>`;
				str += `<td>${double.stuVO.stuNo}</td>`;
				str += `<td>${double.stuYear}학년 ${double.stuSem}학기</td>`;
				str += `<td>${double.colleageVO.collName}</td>`;
				str += `<td>${double.deptVO.deptName}</td>`;
				str += `<td>${double.doubleMajorCollName}</td>`;
				str += `<td>${double.doubleMajorDeptName}</td>`;
				str += `<td>${double.applyDate}</td>`;
				str += '<td class="d-grid">';
				if (double.processStatus == '승인대기') {
					str += `<input type="button" value="승인" onclick="acceptDoubleMajor(${index + 1});" class="btn btn-primary">`;
				}
				if (double.processStatus == '승인완료') {
					str += `<input type="button" value="완료" onclick="acceptDoubleMajor(${index + 1});" class="btn btn-primary">`;
				}
				str += '</td>';
				str += '</tr>';
			});
			table_body.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}
//복수전공 신청 업데이트
function updateStuInfoByDouble() {
	swal.fire({
		title: "학적 변동",
		text: "승인하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((result) => {
		if (result.isConfirmed) {
			const mem_no = document.querySelector('#stuNoDb').value;
			const apply_no = document.querySelector('#applyNoDb').value;
			const double_major_coll_no = document.querySelector('#doubleCollNo').value;
			const double_major_dept_no = document.querySelector('#doubleDeptNo').value;

			stuData = {
				'memNo': mem_no,
				'applyNo': apply_no,
				'doubleMajorCollNo': double_major_coll_no,
				'doubleMajorDeptNo': double_major_dept_no
			}
			console.log(stuData)
			//ajax start
			$.ajax({
				url: '/admin/updateStuInfoByDoubleAjax', //요청경로
				type: 'post',
				async: false,
				contentType: 'application/json; charset=UTF-8',
				//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: JSON.stringify(stuData), //필요한 데이터
				success: function(result) {
					if (result != 0) {
						swal.fire({
							title: "승인이 완료되었습니다.",
							icon: 'success',
							button: '확인',
						})
							.then((result) => {
								location.href = '/admin/changeMajor';
							})
					}
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
//복수전공 일괄승인
function checkedByDoubleMajor() {
	const checkboxes = document.querySelectorAll('#doubleTbody input[type="checkbox"]:checked');
	const double_major_dept_no_list = [];
	const stu_no_list = [];
	const applyCodeList = [];
	const process_status_list = [];
	//const double_status = document.querySelectorAll('.doubleStatus');

	for (let i = 0; i < checkboxes.length; i++) {
		applyCodeList[i] = checkboxes[i].value;
		stu_no_list[i] = checkboxes[i].getAttribute('data-stu-no');
		double_major_dept_no_list[i] = checkboxes[i].getAttribute('data-double-dept-no');
		process_status_list[i] = checkboxes[i].getAttribute('data-process-status');
	};
	applyData = {
		'applyCodeList': applyCodeList,
		'stuNoList': stu_no_list,
		'doubleMajorDeptNoList': double_major_dept_no_list
	};

	if (applyCodeList.length == 0) {
		swal.fire({
			title: "경고",
			text: "선택된 내용이 없습니다!",
			icon: 'error',
			button: '확인',
		})
		return;
	}

	if (process_status_list.includes('승인완료')) {
		swal.fire({
			title: "경고",
			text: "승인된 내용이 있습니다 다시 확인해주세요.",
			icon: 'error',
			button: '확인',
		})
		return;
	}


	swal.fire({
		title: "승인하시겠습니까?",
		text: "진행하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((result) => {
		if (result.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/admin/checkedByDoubleMajorAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: JSON.stringify(applyData), //필요한 데이터
				success: function(result) {
					if (result != 0) {
						swal.fire({
							title: "승인완료",
							text: "일괄 승인이 완료되었습니다",
							icon: 'success',
							button: '확인',
						})
							.then((result) => {
								location.href = '/admin/changeMajor';
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
			});
		}
	});
}




