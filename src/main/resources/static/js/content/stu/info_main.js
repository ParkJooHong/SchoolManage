

// 알림창 오른쪽 아래 정렬
toastr.options.positionClass = 'toast-bottom-right';
toastr.options.rtl = true;

toastr.options.progressBar = true;

window.onload = function(){
	
	var memName = document.querySelector('.memName').value;
	
	alert(memName);
}

function alert(memName){
	toastr.options.escapeHtml = true;
    toastr.options.closeButton = true;
    toastr.options.newestOnTop = false;
    toastr.options.progressBar = true;
    toastr.info(`!${memName}님`, `환영합니다`, {timeOut: 5000});	
}


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

  var calendarEl = document.getElementById('calendar');
  const memNo = document.querySelector('.memNo').value;

  var all_events = null;

  // FullCalendar 객체 초기화
  var calendar = new Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
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
      //alert('데이터 로딩 실패');
    });
    
    calendar.render();
});
