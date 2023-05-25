init();

function init() {

	//날짜 구하기
	const today = new Date();
	const monthAgo = new Date(today);
	monthAgo.setMonth(today.getMonth() - 1);



	//오늘날짜 선택
	document.querySelector('.nowDate').valueAsDate = today;
	document.querySelector('.rollNowDate').valueAsDate = today;
	//한달 전 날짜 선택
	document.querySelector('.monthDate').valueAsDate = monthAgo;
	document.querySelector('.rollMonthDate').valueAsDate = monthAgo;




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
	const roll_all_check = document.querySelector('#allChkRoll');
	const total_cnt = document.querySelectorAll('.checkboxes').length;
	const roll_total_cnt = document.querySelectorAll('.rollCheckboxes').length;
	const checked_cnt = document.querySelectorAll('.checkboxes:checked').length;
	const roll_checked_cnt = document.querySelectorAll('.rollCheckboxes:checked').length;
	//위에
	if (total_cnt == checked_cnt) {
		all_check.checked = true;

	}
	else {
		all_check.checked = false;

	}
	//아래
	if (roll_total_cnt == roll_checked_cnt) {
		roll_all_check.checked = true;

	}
	else {
		roll_all_check.checked = false;

	}
}
//상단 전체 체크박스 on off
function allCheckControll(allCheck) {
	const checkboxes = document.querySelectorAll('#leaveTbody input[type="checkbox"]');
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
function allCheckRollControll(allCheck) {
	const checkboxes = document.querySelectorAll('#rollTbody input[type="checkbox"]');
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






//휴학,복학 신청 모달창 열기
function stateModalOpen(status_no, stu_no, after_status) {
	const state_modal = new bootstrap.Modal('#stateModal');
	data = {
		'statusNo': status_no,
		'stuNo': stu_no,
		'afterStatus': after_status
	};
	//ajax start
	$.ajax({
		url: '/admin/statusModalOpenAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: JSON.stringify(data), //필요한 데이터
		success: function(result) {
			console.log(result);
			const member_info = result['memberInfo'];
			const status_info = result['statusInfo'];
			let str = '';
			const mem_info = document.querySelector('#memInfo');
			str += `${member_info.memName} (${member_info.stuVO.stuNo} , ${member_info.stuVO.stuStatus})`

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

			let double_major_data = member_info.doubleMajorVO.doubleDeptName;
			if (double_major_data == null) {
				double_major_data = '없음';
			}
			mem_double.insertAdjacentHTML('afterbegin', double_major_data);

			const img_modal_tag = document.querySelector('#memImg');
			img_modal_tag.src = `/image/memImg/${member_info.memImgVO.attachedFileName}`;

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
//휴학 신청
function changeStatus(status_no, stu_no, idx) {
	const stu_status = '휴학';
	const changeStatusData = {
		'statusNo': status_no,
		'stuNo': stu_no,
		'stuStatus': stu_status
	};

	swal.fire({
		title: "휴학승인",
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
					contentType : 'application/json; charset=UTF-8',
					//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: JSON.stringify(changeStatusData), //필요한 데이터
					success: function(result) {
						if (result != 0) {
							swal.fire({
								title: '완료',
								text: '휴학신청 승인이 완료되었습니다.',
								icon: "success",
								button: '확인'
							})
								.then((result) => {
									document.querySelector(`#waitRadio${idx}`).addEventListener('click', function(event) {
										event.preventDefault();
									});

									document.querySelector(`#confirmRadio${idx}`).addEventListener('click', function(event) {
										event.preventDefault();
									});
									selectByStatus();
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
						document.querySelector(`#waitRadio${idx}`).checked = true;
						document.querySelector(`#confirmRadio${idx}`).checked = false;
					})
			}
		});
}

//승인 상태에 따른 검색
function selectByStatus(status_data) {
	console.log(status_data);
	//ajax start
	$.ajax({
		url: '/admin/selectByStatusAjax', //요청경로
		type: 'post',
		async: true,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'statusData': status_data }, //필요한 데이터
		success: function(result) {
			console.log(result);
			const leave_tbody = document.querySelector('#leaveTbody');
			leave_tbody.replaceChildren();

			str = '';
			result.forEach(function(sta, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="checkbox" checked onclick="checkControll();" data-ing-status="${sta.ingStatus}" data-stu-no="${sta.stuVO.stuNo}" class="form-check-input checkboxes">`;
				str += '</td>';
				str += `<td>${result.length - index}</td>`;
				str += `<td>${sta.memberVO.memName}</td>`;
				str += `<td><a href="javascript:void(0);" onclick="stateModalOpen('${sta.statusNo}', '${sta.stuVO.stuNo}', '${sta.afterStatus}');">${sta.stuVO.stuNo}</a></td>`;
				str += `<td>${sta.stuVO.stuYear}학년 ${sta.stuVO.stuSem}학기</td>`;
				str += `<td>${sta.colleageVO.collName}</td>`;
				str += `<td>${sta.deptVO.deptName}</td>`;
				str += `<td>${sta.applyDate}</td>`;
				str += '<td>';
				if (sta.ingStatus == '승인대기') {
					str += `<input type="radio" class="form-check-input" checked id="waitRadio${index}" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" id="confirmRadio${index}" onclick="changeStatus('${sta.statusNo}', '${sta.stuVO.stuNo}', ${index});" name="status${index}">승인완료`;
				}
				else {
					str += `<input type="radio" class="form-check-input" id="waitRadio" onclick="event.preventDefault();" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" checked id="confirmRadio" onclick="event.preventDefault();" name="status${index}">승인완료`;
				}
				str += '</td>';
				str += '</tr>';
			})

			leave_tbody.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//휴학 신청자 날짜별 검색
function selectByDateStatusInfo() {
	const month_date = document.querySelector('.monthDate').value;
	const now_date = document.querySelector('.nowDate').value;
	const status_data = document.querySelector('input[name="status-1"]:checked').value;
	console.log(now_date);
	console.log(month_date);
	console.log(status_data);
	data = {
		'ingStatus': status_data,
		'fromDate': now_date,
		'toDate': month_date,
	}
	//ajax start
	$.ajax({
		url: '/admin/selectByDateStatusInfoAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		// contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: JSON.stringify(data), //필요한 데이터
		success: function(result) {
			console.log(result);
			const leave_tbody = document.querySelector('#leaveTbody');
			leave_tbody.replaceChildren();

			str = '';
			result.forEach(function(sta, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="checkbox" checked onclick="checkControll();" data-ing-status="${sta.ingStatus}" data-stu-no="${sta.stuVO.stuNo}" class="form-check-input checkboxes">`;
				str += '</td>';
				str += `<td>${result.length - index}</td>`;
				str += `<td>${sta.memberVO.memName}</td>`;
				str += `<td><a href="javascript:void(0);" onclick="stateModalOpen('${sta.statusNo}', '${sta.stuVO.stuNo}', '${sta.afterStatus}');">${sta.stuVO.stuNo}</a></td>`;
				str += `<td>${sta.stuVO.stuYear}학년 ${sta.stuVO.stuSem}학기</td>`;
				str += `<td>${sta.colleageVO.collName}</td>`;
				str += `<td>${sta.deptVO.deptName}</td>`;
				str += `<td>${sta.applyDate}</td>`;
				str += '<td>';
				if (sta.ingStatus == '승인대기') {
					str += `<input type="radio" class="form-check-input" checked id="waitRadio${index}" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" id="confirmRadio${index}" onclick="changeStatus('${sta.statusNo}', '${sta.stuVO.stuNo}', ${index});" name="status${index}">승인완료`;
				}
				else {
					str += `<input type="radio" class="form-check-input" id="waitRadio${index}" onclick="event.preventDefault();" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" checked id="confirmRadio${index}" onclick="event.preventDefault();" name="status${index}">승인완료`;
				}
				str += '</td>';
				str += '</tr>';
			})

			leave_tbody.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}
//휴학 신청 일괄 승인
function checkedAcceptByStatus() {
	const checkboxes = document.querySelectorAll('#leaveTbody input[type="checkbox"]:checked');
	const checked_status_list = [];
	const status_code_list = [];
	const stu_no_list = [];
	checkboxes.forEach(function(chk, index) {
		status_code_list[index] = chk.value;
		checked_status_list[index] = chk.getAttribute('data-ing-status');
		stu_no_list[index] = chk.getAttribute('data-stu-no');
	});

	const acceptData = {
		'statusNoList': status_code_list,
		'stuNoList': stu_no_list
	}

	console.log(stu_no_list);
	if (status_code_list.length == 0) {
		swal.fire({
			title: "경고",
			text: "선택된 내용이 없습니다!",
			icon: 'error',
			button: '확인',
		})
		return;
	}

	if (checked_status_list.includes('승인완료')) {
		swal.fire({
			title: "경고",
			text: "승인 완료된 데이터가 있습니다 다시 확인해주세요!",
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
	})
		.then((result) => {
			if (result.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/admin/checkedAcceptByStatusAjax', //요청경로
					type: 'post',
					async: true,
					contentType: 'application/json; charset=UTF-8',
					//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: JSON.stringify(acceptData), //필요한 데이터
					success: function(result) {
						if (result != 0) {
							swal.fire({
								title: "승인이 완료되었습니다.",
								icon: 'success',
								button: '확인',
							})
								.then((re) => {
									document.querySelector('#waitRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});

									document.querySelector('#confirmRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});
									selectByDateStatusInfo();
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

			}
		});

}

//복학신청
function changeStatusRoll(status_no, stu_no, idx) {
	const stu_status = '재학';
	const changeStatusData = {
		'statusNo': status_no,
		'stuNo': stu_no,
		'stuStatus': stu_status
	};

	swal.fire({
		title: "복학승인",
		text: "복학신청을 승인하시겠습니까?",
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
					contentType: 'application/json; charset=UTF-8',
					//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: JSON.stringify(changeStatusData), //필요한 데이터
					success: function(result) {
						if (result != 0) {
							swal.fire({
								title: '완료',
								text: '복학신청 승인이 완료되었습니다.',
								icon: "success",
								button: '확인'
							})
								.then((result) => {
									document.querySelector('#rollWaitRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});

									document.querySelector('#rollConfirmRadio').addEventListener('click', function(event) {
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
						document.querySelector(`#rollWaitRadio${idx}`).checked = true;
						document.querySelector(`#rollConfirmRadio${idx}`).checked = false;
					})
			}
		});
}

//승인상태별 검색기능(복학)
function selectByStatusRoll(status_data) {
	
	//ajax start
	$.ajax({
		url: '/admin/selectByStatusRollAjax', //요청경로
		type: 'post',
		async: true,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'statusData': status_data}, //필요한 데이터
		success: function(result) {
			console.log(result);
			const roll_tbody = document.querySelector('#rollTbody');
			roll_tbody.replaceChildren();

			str = '';
			result.forEach(function(sta, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="checkbox" checked onclick="checkControll();" data-ing-status="${sta.ingStatus}" data-stu-no="${sta.stuVO.stuNo}" class="form-check-input checkboxes">`;
				str += '</td>';
				str += `<td>${result.length - index}</td>`;
				str += `<td>${sta.memberVO.memName}</td>`;
				str += `<td><a href="javascript:void(0);" onclick="stateModalOpen('${sta.statusNo}', '${sta.stuVO.stuNo}', '${sta.afterStatus}');">${sta.stuVO.stuNo}</a></td>`;
				str += `<td>${sta.stuVO.stuYear}학년 ${sta.stuVO.stuSem}학기</td>`;
				str += `<td>${sta.colleageVO.collName}</td>`;
				str += `<td>${sta.deptVO.deptName}</td>`;
				str += `<td>${sta.applyDate}</td>`;
				str += '<td>';
				if (sta.ingStatus == '승인대기') {
					str += `<input type="radio" class="form-check-input" checked id="waitRadio${index}" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" id="confirmRadio${index}" onclick="changeStatusRoll('${sta.statusNo}', '${sta.stuVO.stuNo}', '${index}');" name="status${index}">승인완료`;
				}
				else {
					str += `<input type="radio" class="form-check-input" id="waitRadio" onclick="event.preventDefault();" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" checked id="confirmRadio" onclick="event.preventDefault();" name="status${index}">승인완료`;
				}
				str += '</td>';
				str += '</tr>';
			})

			roll_tbody.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}
//날짜별 검색기능(복학)
function selectByDateStatusRollInfo(){
	const month_date = document.querySelector('.rollMonthDate').value;
	const now_date = document.querySelector('.rollNowDate').value;
	const status_data = document.querySelector('input[name="status-3"]:checked').value;
	console.log(now_date);
	console.log(month_date);
	console.log(status_data);
	data = {
		'ingStatus': status_data,
		'fromDate': now_date,
		'toDate': month_date,
	}
	//ajax start
	$.ajax({
		url: '/admin/selectByDateStatusRollInfoAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		// contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: JSON.stringify(data), //필요한 데이터
		success: function(result) {
			console.log(result);
			const roll_tbody = document.querySelector('#rollTbody');
			roll_tbody.replaceChildren();

			str = '';
			result.forEach(function(sta, index) {
				str += '<tr>';
				str += '<td>';
				str += `<input type="checkbox" checked onclick="checkControll();" data-ing-status="${sta.ingStatus}" data-stu-no="${sta.stuVO.stuNo}" class="form-check-input checkboxes">`;
				str += '</td>';
				str += `<td>${result.length - index}</td>`;
				str += `<td>${sta.memberVO.memName}</td>`;
				str += `<td><a href="javascript:void(0);" onclick="stateModalOpen('${sta.statusNo}', '${sta.stuVO.stuNo}', '${sta.afterStatus}');">${sta.stuVO.stuNo}</a></td>`;
				str += `<td>${sta.stuVO.stuYear}학년 ${sta.stuVO.stuSem}학기</td>`;
				str += `<td>${sta.colleageVO.collName}</td>`;
				str += `<td>${sta.deptVO.deptName}</td>`;
				str += `<td>${sta.applyDate}</td>`;
				str += '<td>';
				if (sta.ingStatus == '승인대기') {
					str += `<input type="radio" class="form-check-input" checked id="waitRadio${index}" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" id="confirmRadio${index}" onclick="changeStatusRoll('${sta.statusNo}', '${sta.stuVO.stuNo}', '${index}');" name="status${index}">승인완료`;
				}
				else {
					str += `<input type="radio" class="form-check-input" id="waitRadio" onclick="event.preventDefault();" name="status${index}">승인대기`;
					str += `<input type="radio" class="form-check-input" checked id="confirmRadio" onclick="event.preventDefault();" name="status${index}">승인완료`;
				}
				str += '</td>';
				str += '</tr>';
			})

			roll_tbody.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}


//복학신청 일괄 승인
function checkedAcceptByStatusRoll(){
	const checkboxes = document.querySelectorAll('#rollTbody input[type="checkbox"]:checked');
	const checked_status_list = [];
	const status_code_list = [];
	const stu_no_list = [];
	checkboxes.forEach(function(chk, index) {
		status_code_list[index] = chk.value;
		checked_status_list[index] = chk.getAttribute('data-ing-status');
		stu_no_list[index] = chk.getAttribute('data-stu-no');
	});

	const acceptData = {
		'statusNoList': status_code_list,
		'stuNoList': stu_no_list
	}

	console.log(stu_no_list);
	if (status_code_list.length == 0) {
		swal.fire({
			title: "경고",
			text: "선택된 내용이 없습니다!",
			icon: 'error',
			button: '확인',
		})
		return;
	}

	if (checked_status_list.includes('승인완료')) {
		swal.fire({
			title: "경고",
			text: "승인 완료된 데이터가 있습니다 다시 확인해주세요!",
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
	})
		.then((result) => {
			if (result.isConfirmed) {
				//ajax start
				$.ajax({
					url: '/admin/checkedAcceptByStatusRollAjax', //요청경로
					type: 'post',
					async: true,
					contentType: 'application/json; charset=UTF-8',
					//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: JSON.stringify(acceptData), //필요한 데이터
					success: function(result) {
						if (result != 0) {
							swal.fire({
								title: "승인이 완료되었습니다.",
								icon: 'success',
								button: '확인',
							})
								.then((re) => {
									document.querySelector('#waitRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});

									document.querySelector('#confirmRadio').addEventListener('click', function(event) {
										event.preventDefault();
									});
									selectByDateStatusRollInfo()();
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

			}
		});

}

