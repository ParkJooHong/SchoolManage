//수강 신청한 학생 목록 조회
function getLecStuList(lecNo) {
	//ajax start
	$.ajax({
		url: '/professor/getLecStuListAjax', //요청경로
		type: 'post',
		async: true, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: {'lecNo' : lecNo},			//JSON.stringify(classInfo), //필요한 데이터
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			alert('성공');
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end 
}