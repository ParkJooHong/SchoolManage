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

//학사경고 학생 조회
function getStuInfoList() {
	const coll_no = document.querySelector('#collSelect');
	console.log(coll_no.value);
	const dept_no = document.querySelector('#deptSelect');
	console.log(dept_no.value);
	const stu_status = document.querySelector('#stuStatus');
	console.log(stu_status.value);
	const stu_name = document.querySelector('#stuName');
	console.log(stu_name.value);

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
			const prod_tbody = document.querySelector('.prodTbody');
			prod_tbody.replaceChildren();
			let str = '';
			result.forEach(function(data, idx) {
				str += '<tr>';
				str += `<td>${data.memName}</td>`;
				str += `<td><a href="javascript:void(0)" onclick="getStuInfoByModal(${data.memNo})">${data.memNo}</a></td>`;
				str += `<td>${data.colleageVO.collName}</td>`;
				str += `<td>${data.deptVO.deptName}</td>`;
				str += `<td>${data.stuVO.stuStatus}</td>`;
				str += `<td>${data.stuVO.probCnt}회</td>`;
				if(data.stuVO.probCnt == 3){
					str += `<td><input type button class="btn btn-primary" value="제적"></td>`;
				}
				else{
					str += `<td></td>`;
				}
			});
			
			prod_tbody.insertAdjacentHTML('afterbegin',str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//학사경고 모달창 열기
function getStuInfoByModal(mem_no){
	console.log(mem_no);
		//ajax start
		$.ajax({
		   url: '/admin/getStuInfoByModalAjax', //요청경로
		   type: 'post',
		   async: true,
		   contentType : 'application/json; charset=UTF-8',
		   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		   data: {'memNo':mem_no}, //필요한 데이터
		   success: function(result) {
		      console.log(result);
		   },
		   error: function() {
		      alert('실패');
		   }
		});
		//ajax end

	
	//const prod_modal = new bootstrap.Modal('#prodModal');
	
}








