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
function acceptChangeMajor() {
	const apply_no = document.querySelector('#memApplyNo').value;
	const mem_no = document.querySelector('#memNo').value;
	//ajax start
		$.ajax({
		url: '/admin/acceptChangeMajorAjax', //요청경로
		type: 'post',
		async: false, // 수정된 부분
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'applyNo': apply_no,'memNo':mem_no}, //필요한 데이터
		success: function(result) {
			const major_modal = new bootstrap.Modal('#majorModal');
			
			const deptData = result['acceptData'];
			const memData = result['acceptInfoData'];
					
			const img_modal_tag = document.querySelector('#memImg');
			console.log(memData);
			img_modal_tag.src = `/image/memImg/${memData.memImgVO.attachedFileName}`;
			
			const mem_info_td = document.querySelector('#memInfo');
			
			let str = '';
			str += `${memData.memName}`;
			str += '(';
			str += `${memData.memNo}`;
			str += '  ,  ';
			str += `${memData.memBirth}`;
			str += ')';
			mem_info_td.insertAdjacentHTML('afterbegin',str);
			
			const mem_addr_td = document.querySelector('#memAddr');
			mem_addr_td.insertAdjacentHTML('afterbegin',memData.memAddr);
			
			const mem_tell_td = document.querySelector('#memTell');
			mem_tell_td.insertAdjacentHTML('afterbegin',memData.memTell);
			
			const mem_year_td = document.querySelector('#memYear');		
			let str1 = '';
			str1 += `${memData.stuVO.stuYear}`;
			str1 += '학년';
			str1 +=  ' ';
			str1 += `${memData.stuVO.stuSem}`;
			str1 += '학기';
			mem_year_td.insertAdjacentHTML('afterbegin',str1);
			const mem_status_td = document.querySelector('#memStatus');
			mem_status_td.insertAdjacentHTML('afterbegin',memData.stuVO.stuStatus);
			const mem_dept_td = document.querySelector('#memDept');
			mem_dept_td.insertAdjacentHTML('afterbegin',deptData.fromDeptName);
			const mem_db_dept_td = document.querySelector('#memDbDept');
			mem_db_dept_td.insertAdjacentHTML('afterbegin',deptData.doubleMajorDeptName);
			
			const from_coll_td = document.querySelector('#fromColl');			
			from_coll_td.insertAdjacentHTML('afterbegin', deptData.fromCollName);			
			const to_coll_td = document.querySelector('#toColl');
			to_coll_td.insertAdjacentHTML('afterbegin', deptData.toCollName);			
			const from_dept_td = document.querySelector('#fromDept');
			from_dept_td.insertAdjacentHTML('afterbegin', deptData.fromDeptName);			
			const to_dept_td = document.querySelector('#toDept');
			to_dept_td.insertAdjacentHTML('afterbegin', deptData.toDeptName);
			const apply_reason = document.querySelector('#reason');
			apply_reason.insertAdjacentHTML('afterbegin',deptData.applyReason);			
			
			
			
			major_modal.show();
			
			major_modal.hideEvent = function () {
			  const td = document.querySelectorAll('table td');
			  alert(td);
			};


		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}






















