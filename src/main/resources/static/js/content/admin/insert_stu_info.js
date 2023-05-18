//대학에 따른 소속학과 리스트 조회
function getDeptList() {
	//선택한 대학교 코드
	const coll_tag = document.querySelector('#collSelect');
	//소속학과 태그
	const dept_tag = document.querySelector('#deptSelect');

	//ajax start
	$.ajax({
		url: '/admin/deptListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: { 'collNo': coll_tag.value },
		//JSON.stringify(classInfo), //필요한 데이터
		//contentType: 'application/json; charset=UTF-8',
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			//자식태그 삭제
			dept_tag.replaceChildren();

			let str = '';

			for (const dept of result) {
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

//학생 등록
function insertStu() {
	const stu_form = document.querySelector('#insertStuForm');
	const parent_name = document.querySelector('#parentName');
	const parent_tell = document.querySelector('#parentTell');
	const stu_bank_name = document.querySelector('#stuBankName');
	const stu_bank_account = document.querySelector('#stuBankAccount');

	if (parent_name.value.trim() == "" || parent_tell.value.trim() == "" || stu_bank_name.value.trim() == "" || stu_bank_account.value.trim() == "") {
		swal.fire({
			title: "경고",
			text: "text란에 빈 값은 들어갈 수 없습니다.",
			icon: 'error',
			button: '확인',
		})
		return;
	}
	else{
		swal.fire({
			title: "학생 등록 성공",
			icon: 'success',
			button: '확인',
		})
		.then((result) =>{
			
			stu_form.action = '/admin/insertStu';
			stu_form.method = 'post';
			stu_form.submit();
		
		})
	}

}


