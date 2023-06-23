//전체, 강의중, 폐강 ajax 목록조회
function getLetureList_1() {
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
			const tbody_tag = document.querySelector('#lecture_list_body');

			//기존리스트 삭제
			tbody_tag.replaceChildren();
			
			//학생 목록이 그려진 tbodytag선택
			const stu_tbody_tag = document.querySelector('#lec_stu_list_body');
			
			//기존리스트 삭제
			stu_tbody_tag.innerHTML = '';
			
			console.log(lecture_list);

			//검색한 목록 추가
			let str = '';

			if (lecture_list.length != 0) {
				for (const lecture of lecture_list) {
					str += `<tr onclick="getLecStuList_1('${lecture.lecNo}')">`;
					str += `<td>${lecture.lecName}</td>`;
					str += `<td>${lecture.lecScore}</td>`;
					str += `<td>${lecture.colleageVO.collName}</td>`;
					str += `<td>${lecture.deptVO.deptName}</td>`;
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


//수강 신청한 학생 목록 조회
function getLecStuList_1(lec_no) {
	//ajax start
	$.ajax({
		url: '/professor/getLecStuListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'lecNo' : lec_no},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(mapData) {
			
			//학생 목록이 그려진 tbodytag선택
			const tbody_tag = document.querySelector('#lec_stu_list_body');
			
			//기존리스트 삭제
			tbody_tag.innerHTML = '';
			
			let str = '';
			
			if(mapData['enrollList'].length == 0){
				str += `<tr>`
				str += `	<td colspan="8">`
				str += `		수강 신청한 학생이 없습니다.`
				str += `	</td>`
				str += `</tr>`
			}
			else{
				mapData['enrollList'].forEach((lec_stu) => {
					str += `<tr>`;
					str += `	<td>${lec_stu['STU_NO']}</td>`;
					str += `	<td>${lec_stu['MEM_NAME']}</td>`;
					str += `	<td>${lec_stu['COLL_NAME']}</td>`;
					str += `	<td>${lec_stu['DEPT_NAME']}</td>`;
					str += `	<td>${lec_stu['STU_YEAR']}</td>`;
					if(lec_stu['GRADE'] != null){
						str += `<td>${lec_stu['GRADE']}</td>`;
					}
					else{
						str += `<td>평가전</td>`;
					}
					str += `	<td>`;
					str += `		<select class="w-100" name="grade">`;
						mapData['gradeScoreList'].forEach((gradeScore) =>{
							if(lec_stu['GRADE'] != null && lec_stu['GRADE'] === gradeScore.grade){
								str += `<option value="${gradeScore.grade}" selected>${gradeScore.grade}</option>`;
							}
							else{
								str += `<option value="${gradeScore.grade}">${gradeScore.grade}</option>`;	
							}
						});				
					str += `	</td>`;
					str += `	<td><button class="btn btn-primary" onclick="updateGrade('${lec_stu['STU_GRADE_NO']}',this)">수정</button>`;
					str += `	</td>`;
					str += `	<input type="hidden" id="lecNo" value="${lec_stu['LEC_NO']}">`;
					str += `</tr>`;
				})
			}
			
			tbody_tag.insertAdjacentHTML('afterbegin', str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}


//학생 성적 업데이트
function updateGrade(stu_grade_no, btn_tag){
	//바꿀 성적
	const grade = btn_tag.closest('tr').querySelector('select').value;

	//다시 수강 인원을 조회하기 위해 lec_no가져오기
	const lec_no = document.querySelector('#lecNo').value;
	
	//ajax start
	$.ajax({
		url: '/professor/updateStuGradeAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'stuGradeNo': stu_grade_no, 'grade':grade},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			getLecStuList(lec_no);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
	
	
}