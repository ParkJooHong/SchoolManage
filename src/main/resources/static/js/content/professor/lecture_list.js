//전체, 강의중, 폐강 ajax 목록조회
function getLetureList(){
	//강의상태 radio 선택값 가져오기
	const lec_statuses = document.querySelectorAll('.lec_status');
	//변수지정
	let lec_status;
	let semNo;
	
	lec_statuses.forEach(function(status){
		if(status.checked){
			lec_status = status.value;
		}
	});
	//전체 선택시 null값을 줌
	if(lec_status == 'all'){
		lec_status = null;
	}
	//입력값
	//1.선택한 학기
	const semesters = document.querySelectorAll('.semNo');
	semesters.forEach(function(seme){
		if(seme.selected){
			semNo = seme.value;
		}
	});
	//2.교과목명
	const lecName = document.querySelector('#lecName').value;
	
	const lectureVO = {
		lecStatus : lec_status,
		semNo : semNo,
		lecName : ''
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
			
			console.log(lecture_list);
			
			if(lecture_list.length != 0){
				for(const lecture of lecture_list){
					str += `<tr>`;
					str += `<td>${lecture.lecNo}</td>`;
					str += `<td>${lecture.lecName}</td>`;
					str += `<td>${lecture.colleageVO.collName}</td>`;
					str += `<td>${lecture.deptVO.deptName}</td>`;
					str += `<td>${lecture.lecScore}</td>`;
					str += `<td>${lecture.memName}</td>`;
					str += `<td>`;
					for(const lecTime of lecture.lectureTimeList){
						str += `<div>${lecTime.lecDay} / ${lecTime.startTime}~${lecTime.finishTime}</div>`
					}
					str += `</td>`;
					if(lecture.lecStatus == 'Y'){
						str += `<td>강의중</td>`;
					}
					else{
						str += `<td>폐강</td>`;
					}
					str += `<td><input class="btn btn-primary" type="button" value="강의수정"></td>`;
					str += `</tr>`;
				}
			}
			else{
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

//강의 수정 모달창
function updateLecModal(lecNo){
	
	//ajax start
	$.ajax({
		url: '/professor/updateLectureInfoAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'lecNo' : lecNo},			//JSON.stringify(classInfo), //필요한 데이터
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
		str += `				<input class="w-100" type="text" name="lecName" value="${lecture[0].lecName}">`;
		str += `			</td>`;
		str += `		</tr>`;
		str += `		<tr>`;
		str += `			<td>학점</td>`;
		str += `			<td colspan="3">`;
		str += `				<select class="w-100" name="lecScore">`;
		if(lecture[0].lecScore == '1'){
			str += `				<option value="1" selected>1</option>`;
			str += `				<option value="2">2</option>`;
			str += `				<option value="3">3</option>`;			
		}
		else if(lecture[0].lecScore == '2'){
			str += `				<option value="1">1</option>`;
			str += `				<option value="2" selected>2</option>`;
			str += `				<option value="3">3</option>`;			
		}
		else{
			str += `				<option value="1">1</option>`;
			str += `				<option value="2">2</option>`;
			str += `				<option value="3" selected>3</option>`;			
		}

		str += `			</td>`;
		str += `		</tr>`;
		str += `		<tr>`;
		str += `			<td>강의상태</td>`;
		str += `			<td colspan="3">`;
		if(lecture[0].lecStatus == 'Y'){
		str += `				<select class="w-100" name="lecStatus">`;
			str += `				<option value="Y" selected>강의중</option>`;
			str += `				<option value="N">폐강</option>`;
			str += `			</select>`;
			str += `				<div style="color:red; font-size:10px;">주의 폐강으로 변경하면 다시 강의중으로 바꿀수 없습니다.</div>`
		}
		else{
			str += `			폐강`;
		}
		str += `			</td>`;
		str += `		</tr>`;
		for(lecTime of lecture[0].lectureTimeList){
			str += `	<tr>`;
			str += `		<td>강의시간</td>`;
			str += `		<td>`;	
			str += `			<input class="lecture_time w-100" value=${lecTime.lecDay} type="text" name="lecDay" id="lecDay" required placeholder="예)월" onchange="regBtnDisable(this)" onkeyup="lecDayValidate(this)" onblur="lecDayValidate(this)">`;		
			str += `		</td>`;
			str += `		<td>`;	
			str += `			<input class="lecture_time w-100" value=${lecTime.startTime} type="text" name="startTime" id="startTime" required placeholder="예)14:00" onchange="regBtnDisable(this)" onkeyup="startTimeValidate(this)" onblur="startTimeValidate(this)">`;
			str += `		</td>`;
			str += `		<td>`;	
			str += `			<input class="lecture_time w-100" value="${lecTime.finishTime}" type="text" name="finishTime" id="finishTime" required placeholder="예)16:00" onchange="regBtnDisable(this)" onkeyup="finishTimeValidate(this)" onblur="finishTimeValidate(this)">`;
			str += `		</td>`;
			str += `		<input type="hidden" name="timeNo" value="${lecTime.timeNo}">`;	
			str += `	</tr>`;
		}
		str += `</tbody>`;
		str += `</table>`;
		str += `<input type="hidden" name="lecNo" value="${lecture[0].lecNo}">`;
		
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


//강의 수정
function updateLecture(){
	const updateData = $("#updateLecForm").serialize();
	//ajax start
	$.ajax({
		url: '/professor/updateLectureAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: updateData, //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if(result){
				swal.fire({
					title:'수정 완료',
					text:'강의 수정이 완료되었습니다.',
					icon:'success',
					buttom:'확인'
				})
				.then((result) => {
					//모달 태그 선택
					const modalTag = document.querySelector('#updateLecModal');
					const modalBackdrop = document.querySelector('.modal-backdrop');
					
					//모달창 닫기
					modalTag.style.display = 'none';
  					modalBackdrop.style.display = 'none'; // 모달의 배경 요소를 감추기 위해 display 속성 변경
  					
  					location.href = '/professor/lectureList';
				})
				
			}
			else{
				swal.fire({
					title:'수정 실패',
					text:'수정 사항을 다시 확인하세요.',
					icon:'error',
					buttom:'확인'
				})
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
	
}