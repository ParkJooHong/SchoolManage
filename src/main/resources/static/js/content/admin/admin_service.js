//체크박스 바디 꺼지면 상단 꺼지는 기능
function checkControll() {
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
function allCheckControll(allCheck) {
	const checkboxes = document.querySelectorAll('#cateTbody input[type="checkbox"]');

	if (allCheck.checked) {
		for (const chk of checkboxes) {
			chk.checked = true;
		}
	}
	else {
		for (const chk of checkboxes) {
			chk.checked = false;
		}
	}

}


//카테고리 등록
function regBoardCate() {
	swal.fire({
		title: "카테고리 등록",
		text: "등록하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			const cate_name = document.querySelector('#cateName').value;
			const is_use = document.querySelector('#isUse').value;
			if (cate_name == '') {
				swal.fire({
					title: "카테고리명은 빈값으로 입력 할 수 없습니다.",
					icon: "warning",
					button: '확인',
				});
				return
			}
			else {
				//ajax start
				$.ajax({
					url: '/admin/regBoardCateAjax', //요청경로
					type: 'post',
					async: true,
					contentType: 'application/json; charset=UTF-8',
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					data: { 'cateName': cate_name, 'isUse': is_use }, //필요한 데이터
					success: function(result) {
						swal.fire({
							title: "카테고리 등록이 완료되었습니다.",
							icon: "success",
							button: '확인',
						});
						const cate_tbody = document.querySelector('#cateTbody');
						cate_tbody.replaceChildren();
						let str = '';
						const size_span = document.querySelector('#sizeSpan');
						size_span.replaceChildren();
						let str2 = '';
						str2 += `※총 ${result.length}개의 카테고리가 검색되었습니다.`;

						result.forEach(function(cate, idx) {
							str += '<tr>';
							str += '<td><input type="checkbox" checked onclick="checkControll();" class="form-check-input checkboxes"></td>';
							str += `<td>${idx + 1}</td>`;
							str += `<td>${cate.cateNo}</td>`;
							str += `<td>${cate.cateName}</td>`;
							str += '<td>';
							if (cate.isUse == 'Y') {
								str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" checked value="Y">사용중`;
								str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" value="N">미사용`;
							}
							else {
								str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" value="Y">사용중`;
								str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" checked value="N">미사용`;
							}
							str += '</td>';
							str += '</tr>';
						});

						cate_tbody.insertAdjacentHTML('afterbegin', str);
						size_span.insertAdjacentHTML('afterbegin', str2);
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
				title: "등록이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			});
		}

	})

}

//사용여부 변경
function changeIsUse(cate_no, is_use_data) {
	swal.fire({
		title: "카테고리 사용여부 변경",
		text: "변경하시겠습니까?",
		icon: "question",
		showCancelButton: true,
		confirmButtonText: "확인",
		cancelButtonText: "취소"
	}).then((r) => {
		if (r.isConfirmed) {
			//ajax start
			$.ajax({
				url: '/admin/changeIsUseAjax', //요청경로
				type: 'post',
				async: true,
				contentType: 'application/json; charset=UTF-8',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'cateNo': cate_no, 'isUse': is_use_data.value }, //필요한 데이터
				success: function(result) {
					swal.fire({
						title: "카테고리 변경이 완료되었습니다.",
						icon: "success",
						button: '확인',
					});
					const cate_tbody = document.querySelector('#cateTbody');
					cate_tbody.replaceChildren();
					let str = '';
					const size_span = document.querySelector('#sizeSpan');
					size_span.replaceChildren();
					let str2 = '';
					str2 += `※총 ${result.length}개의 카테고리가 검색되었습니다.`;

					result.forEach(function(cate, idx) {
						str += '<tr>';
						str += '<td><input type="checkbox" checked onclick="checkControll();" class="form-check-input checkboxes"></td>';
						str += `<td>${idx + 1}</td>`;
						str += `<td>${cate.cateNo}</td>`;
						str += `<td>${cate.cateName}</td>`;
						str += '<td>';
						if (cate.isUse == 'Y') {
							str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" checked value="Y">사용중`;
							str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" value="N">미사용`;
						}
						else {
							str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" value="Y">사용중`;
							str += `<input type="radio" name="isUse${idx}" onchange="changeIsUse('${cate.cateNo}',this);" class="form-check-input" checked value="N">미사용`;
						}
						str += '</td>';
						str += '</tr>';
					});

					cate_tbody.insertAdjacentHTML('afterbegin', str);
					size_span.insertAdjacentHTML('afterbegin', str2);
				},
				error: function() {
					alert('실패');
				}
			});
			//ajax end

		}
		else if (r.isDismissed) {
			swal.fire({
				title: "변경이 취소되었습니다.",
				icon: 'success',
				button: '확인',
			}).then((r) => {
				if (is_use_data.nextElementSibling != undefined) {
					is_use_data.checked = false;
					is_use_data.nextElementSibling.checked = true;
				}
				else {
					is_use_data.checked = false;
					is_use_data.previousElementSibling.checked = true;
				}
			});
		}
	})

}