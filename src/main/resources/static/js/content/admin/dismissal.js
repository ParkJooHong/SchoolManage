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
			str += '<option value="">전체</option>';
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

//학생 검색
function getStuInfoList() {
	const coll_no = document.querySelector('#collSelect');
	const dept_no = document.querySelector('#deptSelect');
	const stu_status = document.querySelector('#stuStatus');
	const stu_name = document.querySelector('#stuName');

	stuData = {
		'collNo': coll_no.value,
		'deptNo': dept_no.value,
		'stuStatus': stu_status.value,
		'memName': stu_name.value,
	};

	//ajax start
	$.ajax({
		url: '/admin/getStuInfoListAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: JSON.stringify(stuData), //필요한 데이터
		success: function(result) {
			console.log(result);
			const stu_num = document.querySelector('#stuNum');
			stu_num.replaceChildren();
			stu_num.insertAdjacentHTML('afterbegin', result.length);
			const out_tbody = document.querySelector('.outTbody');
			out_tbody.replaceChildren();
			let str = '';
			result.forEach(function(data) {
				str += '<tr>';
				str += `<td>${data.memName}</td>`;
				str += `<td><a href="javascript:void(0)" onclick="getStuInfoByModal(${data.memNo})">${data.memNo}</a></td>`;
				str += `<td>${data.colleageVO.collName}</td>`;
				str += `<td>${data.deptVO.deptName}</td>`;
				str += `<td>${data.stuVO.stuStatus}</td>`;
				str += `<td>${data.stuOutVO.stuOutDate}</td>`;
				str += '</tr>';
			});

			out_tbody.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end



}

//제적 모달
function getStuInfoByModal(mem_no) {
	console.log(mem_no);
	//ajax start
	$.ajax({
		url: '/admin/getStuInfoByModalAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'memNo': mem_no }, //필요한 데이터
		success: function(result) {
			console.log(result);
				const prob_list = result['probList'];
				const stu_data = result['stuData'];
				const mem_info = document.querySelector('#disMemInfo');

				const dismissal_modal = new bootstrap.Modal('#dismissalModal');
				let str = '';

				str += `${stu_data.memName} (${stu_data.stuVO.stuNo} , ${stu_data.memBirth})`;

				mem_info.insertAdjacentHTML('afterbegin', str);

				document.querySelector('#disMemImg').src = `/image/memImg/${stu_data.memImgVO.attachedFileName}`;

				const mem_addr = document.querySelector('#disMemAddr');
				let str1 = '';
				str1 += `${stu_data.memAddr},${stu_data.memAddrDetail}`;
				str1 += `<input type="hidden" id="stuNo" value="${stu_data.memNo}">`

				mem_addr.insertAdjacentHTML('afterbegin', str1)
				const mem_tell = document.querySelector('#disMemTell');
				mem_tell.insertAdjacentHTML('afterbegin', stu_data.memTell);
				const mem_year = document.querySelector('#disMemYear');
				let str2 = '';
				str2 += `${stu_data.stuVO.stuYear} 학년 ${stu_data.stuVO.stuSem} 학기`;
				mem_year.insertAdjacentHTML('afterbegin', str2);

				const mem_status = document.querySelector('#disMemStatus');

				mem_status.insertAdjacentHTML('afterbegin', stu_data.stuVO.stuStatus);

				const coll_name = document.querySelector('#disCollName');
				coll_name.insertAdjacentHTML('afterbegin', stu_data.colleageVO.collName);

				const dept_name = document.querySelector('#disDeptName');

				dept_name.insertAdjacentHTML('afterbegin', stu_data.deptVO.deptName);

				const dis_tbody = document.querySelector('#disTbody');
				dis_tbody.replaceChildren();
				console.log(prob_list);
				let str3 = '';
				prob_list.forEach(function(prob) {
					str3 += '<tr>';
					str3 += `<td>${prob.probDate}</td>`;
					str3 += `<td>${prob.probReason}</td>`;
					str3 += '</tr>';
				});

				dis_tbody.insertAdjacentHTML('afterbegin', str3);
				
				dismissal_modal.show();

			
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}




