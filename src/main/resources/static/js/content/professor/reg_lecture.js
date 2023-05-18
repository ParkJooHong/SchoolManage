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
function getDeptList(){
	//담당교수 태그
	const professor_tag = document.querySelector('#empSelect');
}