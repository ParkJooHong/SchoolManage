
 
var calendar = null;
 
function allSave(calendar){
	
	const memNo = document.querySelector('.memNo').value;
	
	var allEvent = calendar.getEvents();
	console.log(allEvent);
	
	
	var events = new Array();
	
	for(var i=0; i<allEvent.length; i++){
		
		var obj = new Object();
		
		obj.title = allEvent[i]._def.title;
		obj.allday = allEvent[i]._def.allDay;
		obj.start =  allEvent[i]._instance.range.start; // 시작 날짜 시간
		obj.end =  allEvent[i]._instance.range.end; //마치는 날짜 시간
		obj.viewTitle = allEvent[i]._context.viewTitle;
		obj.memNo = memNo;
		
		events.push(obj);
		
	}
	var jsondata = JSON.stringify(events);

	
	saveData(jsondata);
}


//디비 저장된 데이터 로딩
function loadingEvents(memNo) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: '/schedule/selectMyScheduleAjax',
      type: 'post',
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: { 'memNo': memNo },
      success: function (result) {
        var return_value = result.mySchedul;
        console.log(return_value); // 추출한 데이터 확인
        var events = [];
        for (i = 0; i < return_value.length; i++) { // 수정된 부분: result.length 대신에 return_value.length 사용
          events.push({
            title: return_value[i]['title'],
            start: return_value[i]['startTime'],
            end: return_value[i]['endTime']
          });
        }
        resolve(events); // 데이터 처리 완료 후 Promise를 이용하여 결과값 전달
      },
      error: function () {
        alert('실패~');
        reject(); // 실패 시에는 Promise를 이용하여 실패 상태 전달
      }
    });
  });
}

//일정 추가, 저장
function saveData(jsondata) {
const memNo = document.querySelector('.memNo').value;
  $.ajax({
    url: '/schedule/myScheduleAjax?mem=' + encodeURIComponent(memNo), // 요청경로
    type: 'post',
    async: true,
    contentType: 'application/json; charset=UTF-8',
    data: jsondata,
    success: function(result) {
      swal("저장 완료!", "일정이 등록되었습니다.", "success");
      setTimeout(function() {
        location.reload();
      }, 1000);
    },
    error: function() {
      alert('실패~');
    }
  });
}


document.addEventListener('DOMContentLoaded', function () {
  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendar.Draggable;

  var containerEl = document.getElementById('external-events');
  var calendarEl = document.getElementById('calendar');
  var checkbox = document.getElementById('drop-remove');
  const memNo = document.querySelector('.memNo').value;

  var all_events = null;

	new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: function(eventEl) {
        return {
          title: eventEl.innerText
        };
      }
    });

  // FullCalendar 객체 초기화
  var calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    droppable: true,
    events: all_events,
    drop: function (info) {
      if (checkbox.checked) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },
    locale: "ko"
  });

  loadingEvents(memNo)
    .then(function (events) {
      all_events = events; // 비동기 처리가 완료된 데이터를 할당
      console.log(all_events);
      calendar.setOption('events', all_events); // events 데이터 업데이트

      calendar.render(); // FullCalendar 렌더링
      
      //일정 추가 버튼 변수
      var saveButton = document.getElementById('save-button');
      saveButton.addEventListener('click', function () {
        allSave(calendar);
      });
      
      //일정 삭제 버튼 변수
      var deleteButton = document.getElementById('delete-button');
      deleteButton.addEventListener('click', function () {
        allDelete(calendar);
      });
    })
    .catch(function () {
      alert('데이터 로딩 실패');
    });
    
    calendar.render();
});

//일정 전체 삭제 함수
function allDelete(calendar){
	const memNo = document.querySelector('.memNo').value;
	
	var allEvent = calendar.getEvents();
	console.log(allEvent);
	
	
	var events = new Array();
	
	for(var i=0; i<allEvent.length; i++){
		
		var obj = new Object();
		
		obj.title = allEvent[i]._def.title;
		obj.allday = allEvent[i]._def.allDay;
		obj.start =  allEvent[i]._instance.range.start; // 시작 날짜 시간
		obj.end =  allEvent[i]._instance.range.end; //마치는 날짜 시간
		obj.viewTitle = allEvent[i]._context.viewTitle;
		obj.memNo = memNo;
		
		events.push(obj);
		
	}
	var jsondata = JSON.stringify(events);

	
	deleteData(jsondata);
}

//일정 삭제하기.
function deleteData(jsondata) {
const memNo = document.querySelector('.memNo').value;
  $.ajax({
    url: '/schedule/deleteScheduleAjax?mem=' + encodeURIComponent(memNo), // 요청경로
    type: 'post',
    async: true,
    contentType: 'application/json; charset=UTF-8',
    data: jsondata,
    success: function(result) {
      swal("삭제 완료!", "일정이 모두 삭제되었습니다.", "success");
      setTimeout(function() {
        location.reload();
      }, 1000);
    },
    error: function() {
      alert('실패~');
    }
  });
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

