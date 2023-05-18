//체크박스 바디 꺼지면 상단 꺼지는 기능
function checkControll(){
	const all_check = document.querySelector('#allChk');
	const total_cnt = document.querySelectorAll('.checkboxes').length;
	const checked_cnt = document.querySelectorAll('.checkboxes:checked').length;

	if (total_cnt == checked_cnt) {
		all_check.checked = true;

	}
	else {
		all_check.checked = false;

	}
}
//상단 전체 체크박스 on off
function allCheckControll(allCheck){
	const checkboxes = document.querySelectorAll('#changeMajorBody input[type="checkbox"]');
	
	if(allCheck.checked){
		for(const chk of checkboxes){
			chk.checked = true;
		}
	}
	else{
		for(const chk of checkboxes){
			chk.checked = false;
		}
	}
	
}


//전과 신청 모달
function acceptChangeMajor(){
	const apply_no = document.querySelector('#memApplyNo');
	const stu_no = document.querySelector
		
		//ajax start
		$.ajax({
		   url: '/admin/acceptChangeMajorAjax', //요청경로
		   type: 'post',
		   ansyc: true,
		   contentType : 'application/json; charset=UTF-8',
		   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		   data: {'applyNo': apply_no}, //필요한 데이터
		   success: function(result) {
		      const major_modal = new bootstrap.Modal('#majorModal');
			  major_modal.show();	
		   },
		   error: function() {
		      alert('실패');
		   }
		});
		//ajax end

	
	
	
	
	
	
	
	
	
}






















