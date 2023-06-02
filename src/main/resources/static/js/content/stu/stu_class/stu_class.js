let glopbal_semNo = '';

function getChange(menuCode, subMenuCode){
	
	
	//샐렉트 박스에서 선택한 옵션의 value값 가져오기
	document.querySelector('#semNo').querySelectorAll('option').forEach(function(optionTag, index){
		if(optionTag.selected){
			document.querySelector('#grade_search_form > input:first-child').value = optionTag.value;
		}
	});
	
	//가져온 value값을 히든 input태그의 value에 저장

	document.querySelector('#grade_search_form').submit();
}


getChartDataAjax();

function getChartDataAjax(){
	
	document.querySelector('#semNo').value = document.querySelector('#grade_search_form').querySelectorAll('input')[0].value;
	
	
	//document.querySelector('#semNo').value = "2023년 1학기";

	const semNo = document.querySelector('#grade_search_form').querySelectorAll('input')[0].value;
	const menuCode = document.querySelector('.menuCode').value;
	const subMenuCode = document.querySelector('.subMenuCode').value;
	
	
	
	//const semNo = document.querySelector('#semNo').value;
	//alert(semNo);
	
	
	$.ajax({
		url: '/stuMenu/getChartDataAjax', //요청경로
		type: 'post',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'menuCode' : menuCode, 'subMenuCode' : subMenuCode, 'semNo' : semNo }, 
		success: function(result) {
		
			console.log(result);
			drawChart(result);
		},
		error: function() {
			alert('실패~');
		}
	});
}

function drawChart(data){
	const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+' , 'D', 'F'],
      datasets: [{
        label: '학점 등급 분포',
        data: [data.aPlus, data.a, data.bPlus, data.b, data.cPlus, data.c, data.dPlus, data.d, data.f],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
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
