//대학에 따른 소속학과 리스트 조회
function getDeptList(){
	//선택한 대학교 코드
	const coll_tag = document.querySelector('#collSelect');
	//소속학과 태그
	const dept_tag = document.querySelector('#deptSelect');
	 
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
			//자식태그 삭제
			dept_tag.replaceChildren();
			
			let str = '';
			
			for(const dept of result){
				console.log(dept);
				str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
			}
			
			dept_tag.insertAdjacentHTML('afterbegin', str);
			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}