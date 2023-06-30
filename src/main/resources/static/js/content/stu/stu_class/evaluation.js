
//시간표 캡처하기
function capture(memName) {
	
	//const memName = document.querySelector('.memName').value;
	//alert(memName);
	
  // 캡쳐 라이브러리를 통해서 canvas 오브젝트를 받고 이미지 파일로 리턴한다.
  html2canvas(document.querySelector("#capture")).then(canvas => {
    saveAs(canvas.toDataURL('image/png'), `${memName}님의 시간표.png`);
  });
}

function saveAs(uri, filename) {
  // 캡쳐된 파일을 이미지 파일로 내보낸다.
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}


/*
var lecNoElements = document.querySelectorAll('.lecNo');
var lecNameElements = document.querySelectorAll('.lecName');
var memNameElements = document.querySelectorAll('.memName');
var lecDayElements = document.querySelectorAll('.lecDay');
var startTimeElements = document.querySelectorAll('.startTime');
var finishTimeElements = document.querySelectorAll('.finishTime');

for (var i = 0; i < lecNoElements.length; i++) {
  var lecNo = lecNoElements[i].value;
  console.log(`lecNo${i}:`, lecNo);
  
  var lecName = lecNameElements[i].value;
  console.log(`lecName${i}:`, lecName);
  
  var memName = memNameElements[i].value;
  console.log(`memName${i}:`, memName);
  
  var lecDayValues = lecDayElements[i].value.split(',');
  var startTimeValues = startTimeElements[i].value.split(',');
  var finishTimeValues = finishTimeElements[i].value.split(',');

  for (var j = 0; j < lecDayValues.length; j++) {
    var lecDay = lecDayValues[j];
    console.log(`lecDay${i}-${j}:`, lecDay);

    var startTime = startTimeValues[j];
    console.log(`startTime${i}-${j}:`, startTime);

    var finishTime = finishTimeValues[j];
    console.log(`finishTime${i}-${j}:`, finishTime);
  }
}
*/

var applyMapElements = document.querySelectorAll('.applyMap');

for (var i = 0; i < applyMapElements.length; i++) {
  var applyMapElement = applyMapElements[i];
  var applyMapValue = applyMapElement.value;

  // 정규식을 사용하여 필요한 정보 추출
  var lecNoMatch = applyMapValue.match(/lecNo=(\w+)/);
  var lecNameMatch = applyMapValue.match(/lecName=([^,]+)/);
  var memNameMatch = applyMapValue.match(/memName=([^,]+)/);
  var lecDayMatches = applyMapValue.match(/lecDay=([^,]+)/g);
  var startTimeMatches = applyMapValue.match(/startTime=([^,]+)/g);
  var finishTimeMatches = applyMapValue.match(/finishTime=([^,]+)/g);

  // 추출된 정보 출력
  console.log(`=== html에 있는 정보 추출. ${i + 1} ===`);
  console.log(`lecNo${i}:`, lecNoMatch[1]);
  console.log(`lecName${i}:`, lecNameMatch[1]);
  console.log(`memName${i}:`, memNameMatch[1]);

  for (var j = 0; j < lecDayMatches.length; j++) {
    var lecDay = lecDayMatches[j].match(/lecDay=([^,]+)/)[1];
    var startTime = startTimeMatches[j].match(/startTime=([^,]+)/)[1];
    var finishTime = finishTimeMatches[j].match(/finishTime=([^,]+)/)[1];
    console.log(`lecTime${j + 1}:`, lecDay, startTime, finishTime);
  }
  console.log('===================');
  
  //자바_심화 시간표
	if (lecNoMatch[1] === 'LEC_0002') {
		var tdElement = document.querySelector('.mondayFristClass');
		if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}
	
	// 스프링 기초 시간표
	if (lecNoMatch[1] === 'LEC_0003') {
		var tdElement = document.querySelector('.wendesdayFirstClass');
		var tdElement2 = document.querySelector('.wendesdaySecondClass');
		var tdElement3 = document.querySelector('.wendesdayThirdClass');

		 if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		  
		  if (tdElement2.textContent.trim() === '') {
		    tdElement2.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		  
		  if (tdElement3.textContent.trim() === '') {
		    tdElement3.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href =`/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}
	// 스프링 심화 시간표
	if (lecNoMatch[1] === 'LEC_0004') {
		var tdElement = document.querySelector('.mondaySevenClass');
		var tdElement2 = document.querySelector('.tuesdaySevenClass');
		if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		if (tdElement2.textContent.trim() === '') {
		    tdElement2.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}
	
	
	
  // 오라클데이터베이스_기초 시간표
	 if (lecNoMatch[1] === 'LEC_0005') {
		var tdElement = document.querySelector('.thursdayFirstClass');
		var tdElement2 = document.querySelector('.thursdaySecondClass');
		var tdElement3 = document.querySelector('.thursdayThirdClass');
		var tdElement4 = document.querySelector('.fridaySixClass');
		if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		if (tdElement2.textContent.trim() === '') {
		    tdElement2.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		if (tdElement3.textContent.trim() === '') {
		    tdElement3.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		 if (tdElement4.textContent.trim() === '') {
		    tdElement4.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}

	
	// 사회복지학개론 시간표
	if (lecNoMatch[1] === 'LEC_0006') {
		var tdElement = document.querySelector('.mondayEightClass');
		var tdElement2 = document.querySelector('.wendesdayEightClass');
		if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		  
		  if (tdElement2.textContent.trim() === '') {
		    tdElement2.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}
	
	// 파이썬 기초 시간표
	if(lecNoMatch[1] === 'LEC_0007'){
		var tdElement = document.querySelector('.mondayThirdClass');
		if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}
	
	// 파이썬 중급 시간표
	if(lecNoMatch[1] === 'LEC_0008'){
		var tdElement = document.querySelector('.mondaySecondClass');
		var tdElement2 = document.querySelector('.tuesdayFristClass');
		if (tdElement.textContent.trim() === '') {
		    tdElement.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
		 if (tdElement2.textContent.trim() === '') {
		    tdElement2.textContent = lecNameMatch[1];
		  } else {
			alert("조회 실패! 시간이 중복된 수강항목이 있습니다. \n학부 사무실에서 임의로 수강취소 할 수 있습니다. \n문의 : 052-222-1123 ");
		    window.location.href = `/stuMenu/application?menuCode=MENU_003&subMenuCode=SUB_MENU_009`; // 중복 시 다른 페이지로 이동
		  }
	}
	
}


function plus(memNo, memName, stuYear, stuStatus, collName, deptName){
	const button = document.querySelector('.plus');
	const table = document.querySelector('.tableAdd');
	
	let union;
	const processStatus = document.querySelector('.processStatus');
	let doubleCollName;
	let doubleDeptName;
	
	if(processStatus && processStatus.value === '승인완료'){
		doubleDeptName = document.querySelector('.doubleDeptName').value;
		doubleCollName = document.querySelector('.doubleCollName').value;
	}else{
		doubleDeptName = '해당없음';
		doubleCollName = '해당없음'
	}
	
	if(deptName == '간호학과' || deptName == '유아교육학과'){
		union = '유';
	}else{
		union = '무';
	}
	
	const pOrm = button.textContent;

	button.textContent = '';
	table.textContent= '';

	let str = '';
	let str2 ='';
	if(pOrm=='+')
	{
		str +='-';
		str2 +=`<table border="3" style="border-color: red;" class="default_info">`;
		str2 +=`	<tr>`;
		str2 +=`	<td>학번</td>`;
		str2 +=`	<td><input type="text" readonly value="${memNo}"></td>`;
		str2 +=`	<td>성명</td>`;
		str2 +=`	<td><input type="text" readonly value="${memName}"></td>`;
		str2 +=`	<td>학년</td>`;
		str2 +=`	<td><input type="text" readonly value="${stuYear}"></td>`;
		str2 +=`	<td>학적상태</td>`;
		str2 +=`	<td><input type="text" readonly value="${stuStatus}"></td>`;
		str2 +=`</tr>`;
		str2 +=`<tr>`;
		str2 +=`	<td>학과</td>`;
		str2 +=`	<td><input type="text" readonly value="${collName}"></td>`;
		str2 +=`	<td>전공</td>`;
		str2 +=`	<td><input type="text" readonly value="${deptName}"></td>`;
		str2 +=`	<td>복수전공학과</td>`;
		str2 +=`	<td><input type="text" readonly value="${doubleCollName}"></td>`;
		str2 +=`	<td>복수전공</td>`;
		str2 +=`	<td><input type="text" readonly value="${doubleDeptName}"></td>`;
		str2 +=`</tr>`;
		str2 +=`<tr>`;
		str2 +=`	<td>교직</td>`;
		str2 +=`	<td><input type="text" readonly value="${union}"></td>`;
		str2 +=`	<td>지도교수</td>`;
		str2 +=`	<td><input type="text" readonly></td>`;
		str2 +=`	<td></td>`;
		str2 +=`	<td></td>`;
		str2 +=`	<td></td>`;
		str2 +=`	<td></td>`;
		str2 +=`</tr>`;
		str2 +=`</table>`;
	}
	else
	{
		str +='+';
		str2 += `<table border="3" style="border-color: red;" class="default_info">`;
		str2 += `<tr>`;
		str2 += `<td>학번</td>`;
		str2 += `<td><input type="text" readonly value="${memNo}"></td>`;
		str2 += `<td>성명</td>`;
		str2 += `<td><input type="text" readonly value="${memName}"></td>`;
		str2 += `<td>학년</td>`;
		str2 += `<td><input type="text" readonly value="${stuYear}"></td>`;
		str2 += `<td>학적상태</td>`;
		str2 += `<td><input type="text" readonly value="${stuStatus}"></td>`;
		str2 += `</tr>`;
		str2 += `</table>`;
	}
	
	button.insertAdjacentHTML('afterbegin', str);
	table.insertAdjacentHTML('afterbegin', str2);
	
}
