//전체, 강의중, 폐강 ajax 목록조회
function getLetureList() {
	//강의상태 radio 선택값 가져오기
	const lec_statuses = document.querySelectorAll('.lec_status');
	//변수지정
	let lec_status;
	let semNo;

	lec_statuses.forEach(function(status) {
		if (status.checked) {
			lec_status = status.value;
		}
	});
	//전체 선택시 null값을 줌
	if (lec_status == 'all') {
		lec_status = null;
	}
	//입력값
	//1.선택한 학기
	const semesters = document.querySelectorAll('.semNo');
	semesters.forEach(function(seme) {
		if (seme.selected) {
			semNo = seme.value;
		}
	});
	//2.교과목명
	const lecName = document.querySelector('.search_row #lecName').value;

	const lectureVO = {
		lecStatus: lec_status,
		semNo: semNo,
		lecName: ''
	}
	if (lecName != null || lecName != '') {
		lectureVO.lecName = lecName;
	}

	//ajax start
	$.ajax({
		url: '/professor/getLectureListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		contentType: 'application/json; charset=UTF-8',
		data: JSON.stringify(lectureVO),			//JSON.stringify(classInfo), //필요한 데이터
		success: function(lecture_list) {
			//목록이 그려질 tbody태그 선택
			const tbody_tag = document.querySelector('tbody');

			//기존리스트 삭제
			tbody_tag.replaceChildren();

			//검색한 목록 추가
			let str = '';

			if (lecture_list.length != 0) {
				for (const lecture of lecture_list) {
					str += `<tr>`;
					str += `<td>${lecture.lecNo}</td>`;
					str += `<td onclick="getPdfAjax('${lecture.lecNo}')">${lecture.lecName}</td>`;
					str += `<td>${lecture.colleageVO.collName}</td>`;
					str += `<td>${lecture.deptVO.deptName}</td>`;
					str += `<td>${lecture.lecScore}</td>`;
					str += `<td>${lecture.maxMem}</td>`;
					str += `<td>${lecture.nowMem}</td>`;
					str += `<td>`;
					for (const lecTime of lecture.lectureTimeList) {
						str += `<div>${lecTime.lecDay} / ${lecTime.startTime}~${lecTime.finishTime}</div>`
					}
					str += `</td>`;
					if (lecture.lecStatus == 'Y') {
						str += `<td>강의중</td>`;
					}
					else {
						str += `<td>폐강</td>`;
					}
					str += `<td><button class="btn btn-primary" onclick="updateLecModal('${lecture.lecNo}')">강의수정</button></td>`;
					str += `</tr>`;
				}
			}
			else {
				str += `<tr>`;
				str += `<td colspan="10">조회된 강의가 없습니다.</td>`;
				str += `</tr>`;
			}

			//검색된 목록 삽입
			tbody_tag.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//강의자료 다운로드
function getPdfAjax(lec_no) {
	location.href='/professor/getPdfAjax?lecNo=' + lec_no;
}

//강의 수정 모달창
function updateLecModal(lecNo) {

	//ajax start
	$.ajax({
		url: '/professor/updateLectureInfoAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'lecNo': lecNo },			//JSON.stringify(classInfo), //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(lecture) {

			//모달창 생성	
			const modalTag = document.querySelector('#updateLecModal');

			//모달 바디 태그 선택
			const modalBodyTag = document.querySelector('#updateLecModalBody');
			
			//모달 바디 태그 내용 지우기
			modalBodyTag.innerHTML = '';

			let str = '';

			str += `<table class="table text-start align-middle update_table">`;
			str += `	<tbody>`;
			str += `		<tr>`;
			str += `			<td>교과목명</td>`;
			str += `			<td colspan="3">`;
			str += `				<input class="w-100" type="text" id="lecName" name="lecName" value="${lecture[0].lecName}" onkeyup="lecNameValidate()" onblur="lecNameValidate()">`;
			str += `			</td>`;
			str += `		</tr>`;
			str += `		<tr>`;
			str += `			<td>학점</td>`;
			str += `			<td colspan="3">`;
			str += `				<select class="w-100" name="lecScore">`;
			if (lecture[0].lecScore == '1') {
				str += `				<option value="1" selected>1</option>`;
				str += `				<option value="2">2</option>`;
				str += `				<option value="3">3</option>`;
			}
			else if (lecture[0].lecScore == '2') {
				str += `				<option value="1">1</option>`;
				str += `				<option value="2" selected>2</option>`;
				str += `				<option value="3">3</option>`;
			}
			else {
				str += `				<option value="1">1</option>`;
				str += `				<option value="2">2</option>`;
				str += `				<option value="3" selected>3</option>`;
			}

			str += `			</td>`;
			str += `		</tr>`;
			str += `		<tr>`;
			str += `			<td>강의상태</td>`;
			str += `			<td colspan="3">`;
			if (lecture[0].lecStatus == 'Y') {
				str += `				<select class="w-100" name="lecStatus">`;
				str += `				<option value="Y" selected>강의중</option>`;
				str += `				<option value="N">폐강</option>`;
				str += `			</select>`;
				str += `				<div style="color:red; font-size:12px;">주의! 폐강으로 변경하면 다시 강의중으로 바꿀수 없습니다.</div>`
			}
			else {
				str += `			폐강`;
			}
			str += `			</td>`;
			str += `		</tr>`;
			lecture[0].lectureTimeList.forEach((lecTime, index) =>{
				str += `	<tr class="lecture_time_wrap">`;
				str += `		<td>강의시간</td>`;
				str += `		<td>`;
				str += `			<input class="lecture_time w-100" value=${lecTime.lecDay} type="text" name="lecDay" id="lecDay-${index+1}" required placeholder="예)월" onchange="regBtnDisable(this)" onkeyup="lecDayValidate(this)" onblur="lecDayValidate(this)">`;
				str += `		</td>`;
				str += `		<td>`;
				str += `			<input class="lecture_time w-100" value=${lecTime.startTime} type="text" name="startTime" id="startTime" required placeholder="예)14:00" onchange="regBtnDisable(this)" onkeyup="startTimeValidate(this)" onblur="startTimeValidate(this)">`;
				str += `		</td>`;
				str += `		<td>`;
				str += `			<input class="lecture_time w-100" value="${lecTime.finishTime}" type="text" name="finishTime" id="finishTime" required placeholder="예)16:00" onchange="regBtnDisable(this)" onkeyup="finishTimeValidate(this)" onblur="finishTimeValidate(this)">`;
				str += `		</td>`;
				str += `		<input type="hidden" name="timeNo" value="${lecTime.timeNo}">`;
				str += `	</tr>`;
			});
			str += `<input type="hidden" id="lecNo" name="lecNo" value="${lecture[0].lecNo}">`;
			str += `</tbody>`;
			str += `</table>`;

			//모달창 내용 채우기
			modalBodyTag.innerHTML = str;

			const updateLecModal = new bootstrap.Modal(modalTag);
			updateLecModal.show();

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}


//강의 수정 함수(총 유효성 검사)
function updateLecture() {
	if (lecNameValidate() && validateAllLectureTimes()) {
		// 강의 시간들을 가져옵니다.
		const lectureTimes = document.querySelectorAll('.lecture_time_wrap');
		// 강의 코드를 가져옴
		const lecNo = document.querySelector('.update_table #lecNo');
		// 강의 시간 체크를 위한 데이터
		let lectureTimeVO_list = [];

		for (const lectureTime of lectureTimes) {
			let lectureTimeVO = {
				lecNo : lecNo.value,
				lecDay: lectureTime.querySelector('input[name="lecDay"]').value,
				startTime: lectureTime.querySelector('input[name="startTime"]').value,
				finishTime: lectureTime.querySelector('input[name="finishTime"]').value
			};
			lectureTimeVO_list.push(lectureTimeVO);
		}

		console.log(lectureTimeVO_list);

		//ajax start
		$.ajax({
			url: '/professor/lectureTimeCheckAjax', //요청경로
			type: 'post',
			async: false, //동기방식으로 진행
			data: JSON.stringify(lectureTimeVO_list),
			contentType: "application/json; charset=UTF-8",
			success: function(result) {
				if (!result) {
					swal.fire({
						title: '등록 불가',
						text: '해당 시간은 이미 등록되어있습니다.',
						icon: 'error',
						button: '확인'
					});
				}
				else {
					swal.fire({
						title: '등록가능.',
						text: '등록 가능한 시간입니다.',
						icon: 'success',
						button: '확인'
					})
						.then((result) => {
							swal.fire({
								title: '수정 완료',
								text: '강의 수정이 완료되었습니다.',
								icon: 'success',
								buttom: '확인'
							})
								.then((result) => {
									
									//업데이트 ajax 함수 실행
									updateLectureAjax();
								})
						})
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
	else {
		lecNameValidate();
		validateAllLectureTimes();
		return;
	}
}

//강의 수정 ajax함수
function updateLectureAjax() {
	const updateData = $("#updateLecForm").serialize();
	//ajax start
	$.ajax({
		url: '/professor/updateLectureAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: updateData, //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if (result) {
				//모달 태그 선택
				const modalTag = document.querySelector('#updateLecModal');
				const modalBackdrop = document.querySelector('.modal-backdrop');

				//모달창 닫기
				modalTag.style.display = 'none';
				modalBackdrop.style.display = 'none'; // 모달의 배경 요소를 감추기 위해 display 속성 변경

				location.href = '/professor/lectureList';
			}
			else {
				swal.fire({
					title: '수정 실패',
					text: '수정 사항을 다시 확인하세요.',
					icon: 'error',
					buttom: '확인'
				})
			}
		},
		error: function() {
			swal.fire({
				title: '수정 실패',
				text: '폐강된 강의는 수정이 불가능합니다.',
				icon: 'error',
				buttom: '확인'
			})
		}
	});
	//ajax end
}

// 강의 시간들의 유효성을 검사하는 함수
function validateAllLectureTimes() {
	const lectureTimes = document.querySelectorAll('.lecture_time_wrap');
	let isValid = true;

	lectureTimes.forEach((time) => {
		const lecDayInput = time.querySelector('input[name="lecDay"]');
		const startTimeInput = time.querySelector('input[name="startTime"]');
		const finishTimeInput = time.querySelector('input[name="finishTime"]');
		lecDayValidate(lecDayInput);
		startTimeValidate(startTimeInput);
		finishTimeValidate(finishTimeInput);
		if (!lecDayValidate(lecDayInput) || !startTimeValidate(startTimeInput) || !finishTimeValidate(finishTimeInput)) {
			isValid = false;
		}
	});

	return isValid;
}


//강의 수정 무결성 검사
//0.강의명 무결성(입력만)
function lecNameValidate() {
	//추가된 경고값 태그 초기화
	const error_div = document.querySelector('#lecNameValidate');
	if (error_div != null) {
		error_div.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_lecName = false;

	//에러 메세지
	let str_lecName = '';

	//교과목명 태그 가져오기
	const lecName = document.querySelector('#updateLecModal #lecName');

	//입력값이 없을때	
	if (lecName.value == '') {
		str_lecName = '교과목명은 필수 입력입니다.';
		lecName.style.border = '1px solid red';
		result_lecName = false;
	}
	else {
		lecName.style.border = '';
		result_lecName = true;
	}

	//결과가 false일때 에러메세지 출력
	if (!result_lecName) {
		const errorHTML = `<div id="lecNameValidate" class="my-invalid">${str_lecName}</div>`
		lecName.insertAdjacentHTML('afterend', errorHTML);
	}

	return result_lecName;
};

//1.강의 날짜
function lecDayValidate(check) {
	const error_div = check.closest('tr').querySelector('#lecDayValidate');
	if (error_div != null) {
		error_div.remove();
	}

	//입력한 요일 값들 가져오기
	const lec_days = document.querySelectorAll('input[name="lecDay"]');
	const lec_day_ids = Array.from(lec_days).map((element) => element.id);
	const lec_day_values = [];


	for (let i = 0; i < lec_day_ids.length; i++) {
		if (lec_day_ids[i] != check.id) {
			lec_day_values.push(lec_days[i].value);
		}
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_lec_day = false;

	//에러 메세지
	let str_lec_day = '';

	//강의 날짜 태그 가져오기
	const lec_day = check;

	//강의 날짜 정규식
	const exp_lec_day = /^[월화수목금토]$/;

	//입력값이 없을때	
	if (lec_day.value == '') {
		str_lec_day = '강의 날짜는 필수 입력입니다.';
		lec_day.style.border = '1px solid red';
		result_lec_day = false;
	}
	else if (!exp_lec_day.test(lec_day.value)) {
		str_lec_day = '강의 날짜는 월화수목금토일중에 하나만 입력해주세요';
		lec_day.style.border = '1px solid red';
		result_lec_day = false;
	}
	else if(lec_day_values.includes(lec_day.value)){
		str_lec_day = '중복된 강의 요일이 있습니다.';
		lec_day.style.border = '1px solid red';
		result_lec_day = false;
	}
	else {
		lec_day.style.border = '';
		result_lec_day = true;
	}

	//결과가 false일때 에러메세지 출력
	if (!result_lec_day) {
		const errorHTML = `<div id="lecDayValidate" class="my-invalid">${str_lec_day}</div>`
		lec_day.insertAdjacentHTML('afterend', errorHTML);
	}

	return result_lec_day;
}

//2.강의 시작시간
function startTimeValidate(check) {
	const error_div = check.closest('tr').querySelector('#startTimeValidate');
	if (error_div != null) {
		error_div.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_start_time = false;

	//에러 메세지
	let str_start_time = '';

	//강의 날짜 태그 가져오기
	const start_time = check;

	//강의 날짜 정규식
	const exp_start_time = /^(0[0-9]|1[0-9]|2[0-3]):[0][0]$/;;

	//입력값이 없을때	
	if (start_time.value == '') {
		str_start_time = '강의 시간은 필수 입력입니다.';
		start_time.style.border = '1px solid red';
		result_start_time = false;
	}
	else if (!exp_start_time.test(start_time.value)) {
		str_start_time = '강의시간은 해당 예와같이 입력해주세요 예)16:00';
		start_time.style.border = '1px solid red';
		result_start_time = false;
	}
	else {
		start_time.style.border = '';
		result_start_time = true;
	}

	//결과가 false일때 에러메세지 출력
	if (!result_start_time) {
		const errorHTML = `<div id="startTimeValidate" class="my-invalid">${str_start_time}</div>`
		start_time.insertAdjacentHTML('afterend', errorHTML);
	}

	return result_start_time;
}

//3.강의 종료시간
function finishTimeValidate(check) {
	const error_div = check.closest('tr').querySelector('#finishTimeValidate');
	if (error_div != null) {
		error_div.remove();
	}

	//함수의 리턴 결과를 저장하는 변수
	let result_finish_time = false;

	//에러 메세지
	let str_finish_time = '';

	//강의 날짜 태그 가져오기
	const finish_time = check;

	//강의 날짜 정규식
	const exp_finish_time = /^(0[0-9]|1[0-9]|2[0-3]):[0][0]$/;

	//입력값이 없을때	
	if (finish_time.value == '') {
		str_finish_time = '강의 시간은 필수 입력입니다.';
		finish_time.style.border = '1px solid red';
		result_finish_time = false;
	}
	else if (finish_time.value < check.closest('tr').querySelector('#startTime').value) {
		str_finish_time = '강의시간은 시작시간보다 뒤어야 합니다.';
		finish_time.style.border = '1px solid red';
		result_finish_time = false;
	}
	else if (!exp_finish_time.test(finish_time.value)) {
		str_finish_time = '강의시간은 해당 예와같이 입력해주세요 예)16:00';
		finish_time.style.border = '1px solid red';
		result_finish_time = false;
	}
	else {
		finish_time.style.border = '';
		result_finish_time = true;
	}

	//결과가 false일때 에러메세지 출력
	if (!result_finish_time) {
		const errorHTML = `<div id="finishTimeValidate" class="my-invalid">${str_finish_time}</div>`
		finish_time.insertAdjacentHTML('afterend', errorHTML);
	}

	return result_finish_time;
}