var calendar = null;
 
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
          title: eventEl.innerText,
          start: eventEl.innerText,
          end: eventEl.innerText
        };
      }
    });

  // FullCalendar 객체 초기화
  var calendar = new Calendar(calendarEl, {
		
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'customButton1, customButton2'
    },
    
    customButtons: {
	    customButton1: {
	      text: '일정 저장',
	      click: function() {
	        // 원하는 동작을 수행하는 함수 호출
	        allSave(calendar);
	      }
	    },
	    customButton2: {
	      text: '전체 삭제',
	      click: function() {
	        // 원하는 동작을 수행하는 함수 호출
	        allDelete(calendar);
	      }
	    }
  },
	  
    editable: true,
    droppable: true,
    selectable: true, // 달력 일자 드래그 설정가능
    events: all_events,
    
    drop: function (info) {	
      if (checkbox.checked) {
        info.draggedEl.parentNode.removeChild(info.draggedEl);
      }
    },
    locale: "ko",
    
	    eventClick: function (info) {
	    if (confirm("일정을 삭제하시겠습니까?")) {
	      info.event.remove(); // 클릭한 이벤트 삭제
	      deleteEvent(info.event.id); // 서버에서 해당 이벤트 삭제
	    }
	  },
    
    dateClick: function (info) {
      var title = prompt('추가할 일정을 입력하세요:');
      if (title) {
        calendar.addEvent({
          title: title,
          start: info.dateStr,
          allDay: info.allDay
        });
      }
    },
    
    select: function(info) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
          var title = prompt('추가할 일정을 입력하세요.:');
          if (title) {
            calendar.addEvent({
              title: title,
              start: info.start,
              end : info.end,
              allDay: info.allDay
            })
          }
          calendar.unselect()
        }
    
  });

  loadingEvents(memNo).then(function (events) {
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


function deleteEvent(eventId) {
	swal.fire({
				title: "일정 저장 클릭시 데이터가\n 영구적으로 삭제됩니다.",
				icon: 'info',
				button: '확인',
			});
}
 
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
            end: return_value[i]['endTime'],
            date: return_value[i]['startTime'],
            allDay : true
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
	swal.fire({
				title: "일정이 등록되었습니다.",
				icon: 'success',
				button: '확인',
			});
      setTimeout(function() {
        location.reload();
      }, 1000);
    },
    error: function() {
      alert('실패~');
    }
  });
}


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
		swal.fire({
				title: "일정이 모두 삭제되었습니다.",
				icon: 'success',
				button: '확인',
			});
      setTimeout(function() {
        location.reload();
      }, 1000);
    },
    error: function() {
      alert('실패~');
    }
  });
}




FullCalendar.globalLocales.push(function () {
  'use strict';

  var ko = {
    code: 'ko',
    buttonText: {
      prev: '이전달',
      next: '다음달',
      today: '오늘',
      month: '월',
      week: '주',
      day: '일',
      list: '일정목록',
    },
    weekText: '주',
    allDayText: '종일',
    moreLinkText: '개',
    noEventsText: '일정이 없습니다',
  };

  return ko;

}());

