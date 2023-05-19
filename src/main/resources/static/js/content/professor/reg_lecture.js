//대학에 따른 소속학과 리스트 조회
function getDeptList(){
	//선택한 대학교 코드
	const coll_tag = document.querySelector('#collSelect');
	//소속학과 태그
	const dept_tag = document.querySelector('#deptSelect');
	//담당교수 태그
	const professor_tag = document.querySelector('#empSelect');
	 
	//ajax start
	$.ajax({
		url: '/professor/deptListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'collNo':coll_tag.value},			
		//JSON.stringify(classInfo), //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			//학과, 담당교수 자식태그 삭제
			dept_tag.replaceChildren();
			professor_tag.replaceChildren();
			
			let dept_str = '';
			let professor_str = '';
			
			//학과 목록
			for(const dept of result['deptList']){
				dept_str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
			}
			
			//담당교수 목록
			for(const professor of result['professorList']){
				professor_str += `<option value="${professor.empNo}">${professor.memName}</option>`;
			}
			
			dept_tag.insertAdjacentHTML('afterbegin', dept_str);
			professor_tag.insertAdjacentHTML('afterbegin', professor_str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//학과에 따른 교수 목록 갱신
function getProfessorfList(){
	//소속학과 태그
	const dept_tag = document.querySelector('#deptSelect');
	//담당교수 태그
	const professor_tag = document.querySelector('#empSelect');
	//ajax start
	$.ajax({
		url: '/professor/professorListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'deptNo':dept_tag.value},			
		//JSON.stringify(classInfo), //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			//담당교수 자식태그 삭제
			professor_tag.replaceChildren();
			
			let professor_str = '';
			
			//담당교수 목록
			for(const professor of result['professorList']){
				professor_str += `<option value="${professor.empNo}">${professor.memName}</option>`;
			}
			
			professor_tag.insertAdjacentHTML('afterbegin', professor_str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}

//--------시간 체크----------//
function lectureTimeCheck() {
	console.log(pdfFileValidate());
	//강의 상세 등록 정보를 다 입력하여야 시간 체크 기능 작동
	if (pdfFileValidate() && lecDayValidate() && startTimeValidate() && finishDateValidate()) {
		//강의 날짜, 강의 시작시간, 강의 종료시간
		let lectureTimeVO = {
			lecDay: document.querySelector('#lecDay').value,
			startTime: document.querySelector('#startTime').value,
			finishDate: document.querySelector('#finishDate').value
		}

		console.log(lectureTimeVO);

		//ajax start
		$.ajax({
			url: '/professor/lectureTimeCheckAjax', //요청경로
			type: 'post',
			async: false, //동기방식으로 진행
			data: JSON.stringify(lectureTimeVO),
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
					});
					//join버튼에 disabled 속성 제거
					document.querySelector('#reg_btn').disabled = false;
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
	else{
		lecDayValidate();
		startTimeValidate();
		finishDateValidate();
		pdfFileValidate()
	}
}

//강의 상세 등록 정보 변경시 강의 등록 버튼 disabled
function regBtnDisable(){
	document.querySelector('#reg_btn').disabled = true;
}

//시간 체크(강의 등록 상세) 입력사항 무결성
//0.파일 첨부
function pdfFileValidate(){
	const error_div = document.querySelector('#pdfFileValidate');
	if(error_div != null){
		error_div.remove();
	}
	
	//함수의 리턴 결과를 저장하는 변수
	let result_pdf_file = false;
	
	//에러 메세지
	let str_pdf_file = '';
	
	//강의 날짜 태그 가져오기
	const pdf_file = document.querySelector('#pdfFile');
	
	//입력값이 없을때	
	if(pdf_file.files.length === 0){
		str_pdf_file = '강의 자료 첨부는 필수입니다.';
		result_pdf_file = false;
	}
	else{
		pdf_file.style.border = '';
		result_pdf_file = true;
	}
	
	//결과가 false일때 에러메세지 출력
	if(!result_pdf_file){
		const errorHTML = `<div id="pdfFileValidate" class="my-invalid">${str_pdf_file}</div>`
		pdf_file.insertAdjacentHTML('afterend',errorHTML);
	}
	
	return result_pdf_file;
}

//1.강의 날짜
function lecDayValidate(){
	const error_div = document.querySelector('#lecDayValidate');
	if(error_div != null){
		error_div.remove();
	}
	
	//함수의 리턴 결과를 저장하는 변수
	let result_lec_day = false;
	
	//에러 메세지
	let str_lec_day = '';
	
	//강의 날짜 태그 가져오기
	const lec_day = document.querySelector('#lecDay');
	
	//강의 날짜 정규식
	const exp_lec_day = /^[월화수목금토]$/;
	
	//입력값이 없을때	
	if(lec_day.value == ''){
		str_lec_day = '강의 날짜는 필수 입력입니다.';
		lec_day.style.border = '1px solid red';
		result_lec_day = false;
	}
	else if(!exp_lec_day.test(lec_day.value)){
		str_lec_day = '강의 날짜는 월화수목금토일중에 하나만 입력해주세요';
		lec_day.style.border = '1px solid red';
		result_lec_day = false;
	}
	else{
		lec_day.style.border = '';
		result_lec_day = true;
	}
	
	//결과가 false일때 에러메세지 출력
	if(!result_lec_day){
		const errorHTML = `<div id="lecDayValidate" class="my-invalid">${str_lec_day}</div>`
		lec_day.insertAdjacentHTML('afterend',errorHTML);
	}
	
	return result_lec_day;
}

//2.강의 시작시간
function startTimeValidate(){
	const error_div = document.querySelector('#startTimeValidate');
	if(error_div != null){
		error_div.remove();
	}
	
	//함수의 리턴 결과를 저장하는 변수
	let result_start_time = false;
	
	//에러 메세지
	let str_start_time = '';
	
	//강의 날짜 태그 가져오기
	const start_time = document.querySelector('#startTime');
	
	//강의 날짜 정규식
	const exp_start_time = /^([01]?[0-9]|2[0-3]):[0][0]$/;
	
	//입력값이 없을때	
	if(start_time.value == ''){
		str_start_time = '강의 날짜는 필수 입력입니다.';
		start_time.style.border = '1px solid red';
		result_start_time = false;
	}
	else if(!exp_start_time.test(start_time.value)){
		str_start_time = '강의시간은 해당 예와같이 입력해주세요 예)16:00';
		start_time.style.border = '1px solid red';
		result_start_time = false;
	}
	else{
		start_time.style.border = '';
		result_start_time = true;
	}
	
	//결과가 false일때 에러메세지 출력
	if(!result_start_time){
		const errorHTML = `<div id="startTimeValidate" class="my-invalid">${str_start_time}</div>`
		start_time.insertAdjacentHTML('afterend',errorHTML);
	}
	
	return result_start_time;
}

//3.강의 종료시간
function finishDateValidate(){
	const error_div = document.querySelector('#finishDateValidate');
	if(error_div != null){
		error_div.remove();
	}
	
	//함수의 리턴 결과를 저장하는 변수
	let result_finish_date = false;
	
	//에러 메세지
	let str_finish_date = '';
	
	//강의 날짜 태그 가져오기
	const finish_date = document.querySelector('#finishDate');
	
	//강의 날짜 정규식
	const exp_finish_date = /^([01]?[0-9]|2[0-3]):[0][0]$/;
	
	//입력값이 없을때	
	if(finish_date.value == ''){
		str_finish_date = '강의 날짜는 필수 입력입니다.';
		finish_date.style.border = '1px solid red';
		result_finish_date = false;
	}
	else if(finish_date.value < document.querySelector('#startTime').value){
		str_finish_date = '강의시간은 시작시간보다 뒤어야 합니다.';
		finish_date.style.border = '1px solid red';
		result_finish_date = false;
	}
	else if(!exp_finish_date.test(finish_date.value)){
		str_finish_date = '강의시간은 해당 예와같이 입력해주세요 예)16:00';
		finish_date.style.border = '1px solid red';
		result_finish_date = false;
	}
	else{
		finish_date.style.border = '';
		result_finish_date = true;
	}
	
	//결과가 false일때 에러메세지 출력
	if(!result_finish_date){
		const errorHTML = `<div id="finishDateValidate" class="my-invalid">${str_finish_date}</div>`
		finish_date.insertAdjacentHTML('afterend',errorHTML);
	}
	
	return result_finish_date;
}

//-----------------강의 등록 무결성 검사---------------
//강의 등록 함수
function regLecture(){
	if(lecNameValidate() && maxMemValidate()){
		//강의등록 진행
		document.querySelector('#regLectureForm').submit();
	}
	else{
		lecNameValidate();
		maxMemValidate();
		return;
	}
}

//강의명 무결성(입력만)
function lecNameValidate() {
	//추가된 경고값 태그 초기화
	const error_div = document.querySelector('#lecNameValidate');
	if(error_div != null){
		error_div.remove();
	}
	
	//함수의 리턴 결과를 저장하는 변수
	let result_lecName = false;
	
	//에러 메세지
	let str_lecName = '';
	
	//교과목명 태그 가져오기
	const lecName = document.querySelector('#lecName');
	
	//입력값이 없을때	
	if(lecName.value == ''){
		str_lecName = '교과목명은 필수 입력입니다.';
		lecName.style.border = '1px solid red';
		result_lecName = false;
	}
	else{
		lecName.style.border = '';
		result_lecName = true;
	}
	
	//결과가 false일때 에러메세지 출력
	if(!result_lecName){
		const errorHTML = `<div id="lecNameValidate" class="my-invalid">${str_lecName}</div>`
		lecName.insertAdjacentHTML('afterend',errorHTML);
	}
	
	return result_lecName;
};

//최대 수강신청 인원
function maxMemValidate(){
	//추가된 경고값 태그 초기화
	const error_div = document.querySelector('#maxMemValidate');
	if(error_div != null){
		error_div.remove();
	}
	
	//함수의 리턴결과를 저장하는 변수
	let result_max_mem = false;
	
	//오류메세지
	let str_max_mem = '';
	
	//최대 수강 인원 입력 태그 가져오기
	const maxMem = document.querySelector('#maxMem');
	
	//최대 수강인원 정규식 
	const max_exp = /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9])?$/;
	
	//무결성 조건들
	if(!max_exp.test(maxMem.value)){
		str_max_mem = '150명 이하의 숫자만 입력해주세요.'
		maxMem.style.border = '1px solid red';
		result_max_mem = false;
	}
	
	else{
		maxMem.style.border = '';
		result_max_mem = true;
	}
	
	if(!result_max_mem){
		const errorHTML = `<div id="maxMemValidate" class="my-invalid">${str_max_mem}</div>`
		maxMem.insertAdjacentHTML('afterend',errorHTML);
	}
	
	return result_max_mem;
}
 




