

function getOrderBy(orderBy){
	const orderForm = document.querySelector('#orderForm');
	
	orderForm.querySelector('input').value = orderBy;
	orderForm.submit();
}


//수강 신청 클릭
function apllication(lecNo, maxMem, nowMem, semNo,stuNo, menuCode, subMenuCode){
	
	//const applyLecNos = document.querySelectorAll('.applyLecNo');
		
	//console.log(applyLecNos);
	

	
	$.ajax({
		url: '/stuMenu/apllyLectureAjax', //요청경로
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'lecNo' :lecNo , 'maxMem' : maxMem, 'nowMem' : nowMem, 'semNo' : semNo, 'stuNo' : stuNo,  'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
		success: function(result) {

			if(result['menuCode'] == 'MENU_003'){
				swal("수강신청 완료!", "신청이 완료되었습니다.", "success");
						setTimeout(function() {
						location.reload();
						}, 1000);
			}
			else{
				swal("실패", "이미 신청하셨습니다.", "error");
			}
			
		},
		error: function() {
			alert('실패~');
		}
	});
}



//수강 취소 
function cancel(lecNo, maxMem, nowMem, semNo,stuNo, menuCode, subMenuCode){
	
	
	$.ajax({
		url: '/stuMenu/cancelLectureAjax', //요청경로
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'lecNo' :lecNo , 'maxMem' : maxMem, 'nowMem' : nowMem, 'semNo' : semNo, 'stuNo' : stuNo,  'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
		success: function(result) {
			swal("수강취소 완료!", "취소가 완료되었습니다.", "success");
						setTimeout(function() {
						location.reload();
						}, 1000);
		},
		error: function() {
			alert('실패~');
		}
	});
}


//대학에 따른 소속 학과 변경
function updateDept(menuCode, subMenuCode){
	
	const coll = document.querySelector('.colleage');
	const dept = document.querySelector('.dept');
	
	$.ajax({
		url: '/stuMenu/deptUpdateAjax', //요청경로
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'collNo' : coll.value , 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
		success: function(result) {
			if(result)
			{
				//학과 자식태그 삭제
				dept.replaceChildren();			
				let dept_str = '';				
				//학과 목록
				for(const dept of result['deptList']){
					dept_str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
				}				
				dept.insertAdjacentHTML('afterbegin', dept_str);
				}
				else{
					alert("에러발생");
				}		
		},
		error: function() {
			alert('실패~');
		}
	});

}


// 소속학과에 따른 강의 수강 리스트 변경
function updateLecture(){
	const coll = document.querySelector('.colleage');
	const dept = document.querySelector('.dept');
	
	$.ajax({
		url: '/stuMenu/lectureUpdateAjax', //요청경로
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'collNo' : coll.value , 'menuCode' : menuCode, 'subMenuCode' : subMenuCode  }, //필요한 데이터
		success: function(result) {
			if(result)
			{
				//학과 자식태그 삭제
				dept.replaceChildren();			
				let dept_str = '';				
				//학과 목록
				for(const dept of result['deptList']){
					dept_str += `<option value="${dept.deptNo}">${dept.deptName}</option>`;
				}				
				dept.insertAdjacentHTML('afterbegin', dept_str);
				}
				else{
					alert("에러발생");
				}		
		},
		error: function() {
			alert('실패~');
		}
	});
}




function plus(){
	const button = document.querySelector('.plus');
	const table = document.querySelector('.tableAdd');
	
	const pOrm = button.textContent;
	button.textContent = '';

	table.textContent= '';

	let str = '';
	let str2 ='';
	if(pOrm=='+')
	{
		str +='-';
		str2 +='<table border="3" style="border-color: red;" class="default_info">'
		str2 +='	<tr>'
		str2 +='	<td>학번</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>성명</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>학년</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>학적상태</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='</tr>'
		str2 +='<tr>'
		str2 +='	<td>학과코드</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>전공</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>복수전공</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>부전공</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='</tr>'
		str2 +='<tr>'
		str2 +='	<td>교직</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td>지도교수</td>'
		str2 +='	<td><input type="text" readonly></td>'
		str2 +='	<td></td>'
		str2 +='	<td></td>'
		str2 +='	<td></td>'
		str2 +='	<td></td>'
		str2 +='</tr>'
		str2 +='</table>'
	}
	else
	{
		str +='+';
		str2 += '<table border="3" style="border-color: red;" class="default_info">';
		str2 += '<tr>';
		str2 += '<td>학번</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '<td>성명</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '<td>학년</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '<td>학적상태</td>';
		str2 += '<td><input type="text" readonly></td>';
		str2 += '</tr>';
		str2 += '</table>';
	}
	
	button.insertAdjacentHTML('afterbegin', str);
	table.insertAdjacentHTML('afterbegin', str2);
}

