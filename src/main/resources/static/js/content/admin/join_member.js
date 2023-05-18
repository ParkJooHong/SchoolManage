//주소록 api실행
function searchAddr() {
	new daum.Postcode({
		oncomplete: function(data) {
			//도로명 주소
			const roadAddr = data.roadAddress;
			//도로명 주소 세팅
			document.querySelector('#inputAddress').value = roadAddr;

		}
	}).open();
}

//회원 등록
function insertMember() {
	const member_form = document.querySelector('#memberForm');
	swal.fire({
		title: "회원 등록 성공",
		text: "선택하신 권한에 따라 학생 또는 교직원 등록 페이지로 이동합니다. ",
		icon: 'success',
		button: '확인',
	})
	.then((result) =>{
		
		member_form.action = '/admin/join';
		member_form.method = 'post';
		member_form.submit();
	})
		
}