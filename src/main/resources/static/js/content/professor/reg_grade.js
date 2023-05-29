//수강 신청한 학생 목록 조회
function getLecStuList(lec_no) {
	//ajax start
	$.ajax({
		url: '/professor/getLecStuListAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'lecNo' : lec_no},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(lec_stu_list) {
			
			console.log(lec_stu_list);
			
			//학생 목록이 그려진 tbodytag선택
			const tbody_tag = document.querySelector('#lec_stu_list_body');
			
			//기존리스트 삭제
			tbody_tag.replaceChildren();
			
			let str = '';
			
			lec_stu_list.forEach((lec_stu) => {
				str += `<tr>`;
				str += `	<td>${lec_stu}</td>`;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += ``;
				str += `</tr>`;
			})
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}