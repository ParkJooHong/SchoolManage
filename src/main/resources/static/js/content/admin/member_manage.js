//페이지 이동
function getOrderListPaging(page_num) {
	document.querySelector('#nowPage').value = page_num;
	searchByStatusInBoard();
}

//검색기능
function searchByStatusInBoard() {
	const search_form = document.querySelector('#searchForm');
	search_form.submit();
}

//회원 상태 수정(HTML에서만)
function updateMemStatus(tag, status){
	const mem_chk_tag = tag.closest('tr').querySelector('.memChk');
	
	mem_chk_tag.setAttribute("data-mem-status", status);
}

//회원 상태 수정
function memStatusUpdate(){
	
	//회원 정보를 담을 리스트
	const member_list = []
	
	//선택한 회원들의 태그 가져옴
	const members = document.querySelectorAll('.memChk:checked')
	
	members.forEach(function(member, index){
		const memberVO = {
			memNo : member.getAttribute('data-mem-no'),
			memStatus : member.getAttribute('data-mem-status')
		}
		member_list[index] = memberVO;
	});
	
	console.log(member_list);
	
	//ajax start
	$.ajax({
		url: '/member/updateMemStatusAjax', //요청경로
		type: 'post',
		async: false, //동기 방식으로 실행, 작성하지 않으면 기본 true값을 가짐
		data: JSON.stringify(member_list), //필요한 데이터
		contentType: 'application/json; charset=UTF-8',
		///contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		success: function(result) {
			if(result){
				
				const searchKeyword = document.querySelector('#searchKeyword').value;
				const searchValue = document.querySelector('#searchValue').value;
				
				swal.fire({
					title : "상태변경 완료",
					text : "선택한 멤버의 상태가 변경되었습니다.",
					icon : 'success',
					button : '확인'
				}).then((result) => {
					location.href = '/admin/memberManage?searchKeyword='+searchKeyword+'&searchValue='+searchValue;
				})
			}
			else{
				swal.fire({
					title : "실패",
					text : "한명이상 선택하여 주세요.",
					icon : 'warning',
					button : '확인'
				})
			}
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//-------------------------체크박스-------------------------//
//전체 체크박스
function allCheckBox(){
	//전체 체크박스
	const allCheckbox = document.querySelector('.allMemChk');

	//하위 체크박스
	const checkboxes = document.querySelectorAll('.memChk');

	if (allCheckbox.checked) {
		checkboxes.forEach(function(checkbox){
			checkbox.checked = true
		});
	}
	else {
		checkboxes.forEach(function(checkbox){
			checkbox.checked = false
		});
	}
}

//체크 박스 선택에 따른 전체선택 박스 체크 또는 해제 
function checkBox() {

	//2-1. 내용부에 있는 체크박스들 선택
	const checkboxes = document.querySelectorAll('.memChk');

	//체크가 된 체크박스의 개수
	const checkedCnt = document.querySelectorAll('.memChk:checked').length;
	const totalCnt = checkboxes.length;

	if (totalCnt == checkedCnt) {
		document.querySelector('.allMemChk').checked = true;
	}
	else {
		document.querySelector('.allMemChk').checked = false;
	}
}
