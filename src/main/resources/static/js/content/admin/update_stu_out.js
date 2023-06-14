init();

function init() {
	const prob_modal = new bootstrap.Modal('#probModal');


	$(prob_modal._element).on('hidden.bs.modal', function(e) {
		const img_modal_tag = document.querySelector('#memImg');
		img_modal_tag.src = '';
		document.querySelector('#memInfo').replaceChildren();
		document.querySelector('#memAddr').replaceChildren();
		document.querySelector('#memTell').replaceChildren();
		document.querySelector('#memYear').replaceChildren();
		document.querySelector('#memStatus').replaceChildren();
		document.querySelector('#collName').replaceChildren();
		document.querySelector('#deptName').replaceChildren();
		const accept_btn = document.querySelector('.acceptBtn');
		accept_btn.replaceChildren();
		str = '';
		str += '<input type="button" value="승인하기" onclick="regProbStu();" class="btn btn-primary">';
		
		accept_btn.insertAdjacentHTML('afterbegin',str);


	});

}

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
			const prob_tbody = document.querySelector('.probTbody');
			prob_tbody.replaceChildren();
			let str = '';
			result.forEach(function(data, idx) {
				str += '<tr>';
				str += `<td style="width:12%">${data.memName}</td>`;
				str += `<td style="width:17%"><a href="javascript:void(0)" onclick="getStuInfoByModal(${data.memNo},1)">${data.memNo}</a></td>`;
				str += `<td style="width:17%">${data.colleageVO.collName}</td>`;
				str += `<td style="width:17%">${data.deptVO.deptName}</td>`;
				str += `<td style="width:12%">${data.stuVO.stuStatus}</td>`;
				str += `<td style="width:12%">${data.stuVO.probCnt}회</td>`;
				if(data.stuVO.stuStatus == '제적'){
					str += `<td style="width:13%" class="gap-2"><div class="d-grid"><input type="button" class="btn btn-primary stu_out_btn" disabled value="제적완료"></div></td>`;
				}
				else if (data.stuVO.probCnt >= 3) {
					str += `<td style="width:13%" class="gap-2"><div class="d-grid"><input type="button" onclick="getStuInfoByModal(${data.memNo},2);" class="btn btn-primary" value="제적처리"></div></td>`;
				}
				else {
					str += `<td style="width:13%"></td>`;
				}
			});

			prob_tbody.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//학사경고, 제적  모달창 열기
function getStuInfoByModal(mem_no, type) {
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
			//학사경고시
			if (type == 1) {
				const prob_list = result['probList'];
				const stu_data = result['stuData'];
				const mem_info = document.querySelector('#memInfo');

				const prob_modal = new bootstrap.Modal('#probModal');
				let str = '';

				str += `${stu_data.memName} (${stu_data.stuVO.stuNo} , ${stu_data.memBirth})`;

				mem_info.insertAdjacentHTML('afterbegin', str);

				document.querySelector('#memImg').src = `/image/memImg/${stu_data.memImgVO.attachedFileName}`;

				const mem_addr = document.querySelector('#memAddr');
				let str1 = '';
				str1 += `${stu_data.memAddr},${stu_data.memAddrDetail}`;
				str1 += `<input type="hidden" id="stuNo" value="${stu_data.memNo}">`

				mem_addr.insertAdjacentHTML('afterbegin', str1)
				const mem_tell = document.querySelector('#memTell');
				mem_tell.insertAdjacentHTML('afterbegin', stu_data.memTell);
				const mem_year = document.querySelector('#memYear');
				let str2 = '';
				str2 += `${stu_data.stuVO.stuYear} 학년 ${stu_data.stuVO.stuSem} 학기`;
				mem_year.insertAdjacentHTML('afterbegin', str2);

				const mem_status = document.querySelector('#memStatus');

				mem_status.insertAdjacentHTML('afterbegin', stu_data.stuVO.stuStatus);

				const coll_name = document.querySelector('#collName');
				coll_name.insertAdjacentHTML('afterbegin', stu_data.colleageVO.collName);

				const dept_name = document.querySelector('#deptName');

				dept_name.insertAdjacentHTML('afterbegin', stu_data.deptVO.deptName);

				const prob_tbody = document.querySelector('#probTbody');
				prob_tbody.replaceChildren();
				console.log(prob_list);
				let str3 = '';
				if (prob_list.length == 0) {
					str3 += '<tr>';
					str3 += '<td colspan="2">등록된 내용이 없습니다.</td>';
					str3 += '</tr>';
				}
				else {
					prob_list.forEach(function(prob) {
						str3 += '<tr>';
						str3 += `<td>${prob.probDate}</td>`;
						str3 += `<td>${prob.probReason}</td>`;
						str3 += '</tr>';
					});
				}
				prob_tbody.insertAdjacentHTML('afterbegin', str3);
				
				const accept_btn = document.querySelector('.acceptBtn');
				if(stu_data.stuVO.stuStatus == '제적'){
					str4 = '';
					accept_btn.replaceChildren();
					str4 += '<input type="button" value="제적완료" disabled class="btn btn-lg btn-primary">';
					accept_btn.insertAdjacentHTML('afterbegin',str4);
				}
				
				prob_modal.show();

			}
			//제척처리시
			else if (type == 2) {
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
				if (prob_list.length == 0) {
					str3 += '<tr>';
					str3 += '<td colspan="2">등록된 내용이 없습니다.</td>';
					str3 += '</tr>';
				}
				else {
					prob_list.forEach(function(prob) {
						str3 += '<tr>';
						str3 += `<td>${prob.probDate}</td>`;
						str3 += `<td>${prob.probReason}</td>`;
						str3 += '</tr>';
					});
				}
				dis_tbody.insertAdjacentHTML('afterbegin', str3);
				
				dismissal_modal.show();
			}


		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end




}

//학사경고
function regProbStu() {
	swal.fire({
		title: "학적 변동",
		text: "승인하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"

	}).then((r) => {
		if (r.isConfirmed) {
			const stu_no = document.querySelector('#stuNo').value;
			const stu_year = document.querySelector('#stuYear').value;
			const stu_sem = document.querySelector('#stuSem').value;
			const reason = document.querySelector('#reason').value;
			console.log(stu_no);
			console.log(stu_year);
			console.log(stu_sem);
			console.log(reason);

			probData = {
				'stuNo': stu_no,
				'stuYear': stu_year,
				'stuSem': stu_sem,
				'reason': reason
			};

			//ajax start
			$.ajax({
				url: '/admin/regProbStuAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: JSON.stringify(probData), //필요한 데이터
				success: function(result) {
					if (result != null) {
						swal.fire({
							title: "승인이 완료되었습니다.",
							icon: 'success',
							button: '확인',
						}).then((r) => {
							if (r) {
								const prob_tbody = document.querySelector('#probTbody');
								let str = '';
								result.forEach(function(prob) {
									str += '<tr>';
									str += `<td>${prob.probDate}</td>`;
									str += `<td>${prob.probReason}</td>`;
									str += '</tr>';
								});
								prob_tbody.replaceChildren();
								prob_tbody.insertAdjacentHTML('afterbegin', str);
								getStuInfoList();

							}
						});
					}
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end

		}
		else if (r.isDismissed) {
			swal.fire({
				title: "승인이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	});

}


//제적처리
function regDismissalStu() {
	const dismissal_reason = document.querySelector('#dismissalReson');
	const stu_no = document.querySelector('#stuNo').value;
	swal.fire({
		title: "제적 처리",
		text: "승인하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"

	}).then((r) => {
		if (r.isConfirmed) {
			if (dismissal_reason.value == "") {
				swal.fire({
					title: "경고",
					text: "제적 사유에 빈 값은 들어갈 수 없습니다.",
					icon: 'warning',
					button: '확인',
				});
			}
			else {
				//ajax start
				$.ajax({
					url: '/admin/regDismissalStuAjax', //요청경로
					type: 'post',
					async: false,
					contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'stuNo': stu_no, 'stuOutReason': dismissal_reason.value }, //필요한 데이터
					success: function(result) {
						mem_status = document.querySelector('#disMemStatus');
						dismissal_btn = document.querySelector('.dismissalBtn');
						if (result != null) {
							swal.fire({
								title: "승인이 완료되었습니다.",
								icon: 'success',
								button: '확인',
							}).then((r)=>{
								if(r){
									mem_status.replaceChildren();
									mem_status.insertAdjacentHTML('afterbegin', result.stuVO.stuStatus);
									dismissal_btn.replaceChildren();								
									getStuInfoList();
								}
							})
						}
					},
					error: function() {
						alert('실패');
					}
				});
				//ajax end

			}
		}
		else if (r.isDismissed) {
			swal.fire({
				title: "승인이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}
	});


}


