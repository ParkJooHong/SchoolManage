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
function stateModalOpen(status_no, stu_no) {
	const state_modal = new bootstrap.Modal('#stateModal');

	//ajax start
	$.ajax({
		url: '/admin/statusModalOpenAjax', //요청경로
		type: 'post',
		async: true,
		//contentType : 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'statusNo': status_no, 'stuNo': stu_no }, //필요한 데이터
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

//승인 상태에 따른 검색
function selectByStatus(status_data) {
	console.log(status_data);
	//ajax start
	$.ajax({
		url: '/admin/selectByStatusAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'statusData': status_data }, //필요한 데이터
		success: function(result) {
			console.log(result);
			const leave_tbody = document.querySelector('.leaveTbody');
			leave_tbody.replaceChildren();

			str = '';
			result.forEach(function(sta, index) {
			str += '<tr>';
			str += '<td>';
			str += '<input type="checkbox" checked onclick="checkControll();" class="form-check-input checkboxes">';
			str += '</td>';
			str += `<td>${result.length - index}</td>`;
			str += `<td>${sta.memberVO.memName}</td>`;
			str += `<td><a href="javascript:void(0);" onclick="stateModalOpen('${sta.statusNo}', '${sta.stuVO.stuNo}');">${sta.stuVO.stuNo}</a></td>`;
			str += `<td>${sta.stuVO.stuYear}학년 ${sta.stuVO.stuSem}학기</td>`;
			str += `<td>${sta.colleageVO.collName}</td>`;
			str += `<td>${sta.deptVO.deptName}</td>`;
			str += `<td>${sta.applyDate}</td>`;
			str += '<td>';
			if(sta.ingStatus == '승인대기'){
				str += `<input type="radio" class="form-check-input" checked id="waitRadio" name="status+${index}">승인대기`;
				str += `<input type="radio" class="form-check-input" id="confirmRadio" onclick="changeStatus('${sta.statusNo}', '${sta.stuVO.stuNo}');" name="status+${index}">승인완료`;
			}
			else{
				str += `<input type="radio" class="form-check-input" id="waitRadio" onclick="event.preventDefault();" name="status+${index}">승인대기`;
				str += `<input type="radio" class="form-check-input" checked id="confirmRadio" onclick="event.preventDefault();" name="status+${index}">승인완료`;
			}
			str += '</td>';
			str += '</tr>';		
			})
			
			leave_tbody.insertAdjacentHTML('afterbegin',str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}

//휴학 신청자 날짜별 검색
function selectByDateStatusInfo(){
	const month_date = document.querySelector('.monthDate').value;
	const now_date = document.querySelector('.nowDate').value;
	const status_data = document.querySelector('input[name="status-1"]:checked').value;
	console.log(now_date);
	console.log(month_date);
	console.log(status_data);
	data = {
		'ingStatus':status_data,
		'fromDate':now_date,
		'toDate':month_date,		
	}
		//ajax start
		$.ajax({
		   url: '/admin/selectByDateStatusInfoAjax', //요청경로
		   type: 'post',
		   async: true,
		   contentType : 'application/json; charset=UTF-8',
		  // contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		   data: JSON.stringify(data), //필요한 데이터
		   success: function(result) {
		      			console.log(result);
			const leave_tbody = document.querySelector('.leaveTbody');
			leave_tbody.replaceChildren();

			str = '';
			result.forEach(function(sta, index) {
			str += '<tr>';
			str += '<td>';
			str += '<input type="checkbox" checked onclick="checkControll();" class="form-check-input checkboxes">';
			str += '</td>';
			str += `<td>${result.length - index}</td>`;
			str += `<td>${sta.memberVO.memName}</td>`;
			str += `<td><a href="javascript:void(0);" onclick="stateModalOpen('${sta.statusNo}', '${sta.stuVO.stuNo}');">${sta.stuVO.stuNo}</a></td>`;
			str += `<td>${sta.stuVO.stuYear}학년 ${sta.stuVO.stuSem}학기</td>`;
			str += `<td>${sta.colleageVO.collName}</td>`;
			str += `<td>${sta.deptVO.deptName}</td>`;
			str += `<td>${sta.applyDate}</td>`;
			str += '<td>';
			if(sta.ingStatus == '승인대기'){
				str += `<input type="radio" class="form-check-input" checked id="waitRadio" name="status+${index}">승인대기`;
				str += `<input type="radio" class="form-check-input" id="confirmRadio" onclick="changeStatus('${sta.statusNo}', '${sta.stuVO.stuNo}');" name="status+${index}">승인완료`;
			}
			else{
				str += `<input type="radio" class="form-check-input" id="waitRadio" onclick="event.preventDefault();" name="status+${index}">승인대기`;
				str += `<input type="radio" class="form-check-input" checked id="confirmRadio" onclick="event.preventDefault();" name="status+${index}">승인완료`;
			}
			str += '</td>';
			str += '</tr>';		
			})
			
			leave_tbody.insertAdjacentHTML('afterbegin',str);
		   },
		   error: function() {
		      alert('실패');
		   }
		});
		//ajax end

	
	
	
	
	
	
	
	
	
	
	
	
	
	
}



