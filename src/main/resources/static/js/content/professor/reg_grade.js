//수강 신청한 학생 목록 조회
function getLecStuList(lec_no) {
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