
 
 var calendar = null;
 
function allSave(){
	
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
	console.log(jsondata);
	
	saveData(jsondata);
}

//디비 저장된 데이터 로딩
function loadingEvents(memNo){

	$.ajax({
		url: '/schedule/selectMyScheduleAjax', //요청경로
		type: 'post',
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {'memNo' : memNo}, //필요한 데이터
		success: function(result) {
			
			
		},
		error: function() {
			alert('실패~');
		}
	}); 
}

function saveData(jsondata){



	$.ajax({
		url: '/schedule/myScheduleAjax', //요청경로
		type: 'post',
		async: true,
		contentType:'application/json; charset=UTF-8' ,
		//contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: jsondata, //필요한 데이터
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


 
 /* document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: 'dayGridMonth',
          locale : "ko"
        });
        calendar.render();
      }); */
      
      document.addEventListener('DOMContentLoaded', function() {
    	    var Calendar = FullCalendar.Calendar;
    	    var Draggable = FullCalendar.Draggable;

    	    var containerEl = document.getElementById('external-events');
    	    var calendarEl = document.getElementById('calendar');
    	    var checkbox = document.getElementById('drop-remove');
    	    const memNo = document.querySelector('.memNo').value;

    	    // initialize the external events
    	    // -----------------------------------------------------------------
    	    var all_events = null;
    	    all_events = loadingEvents(memNo);

    	    new Draggable(containerEl, {
    	      itemSelector: '.fc-event',
    	      eventData: function(eventEl) {
    	        return {
    	          title: eventEl.innerText
    	        };
    	      }
    	    });

    	    // initialize the calendar
    	    // -----------------------------------------------------------------

    	    calendar = new Calendar(calendarEl, {
    	      headerToolbar: {
    	        left: 'prev,next today',
    	        center: 'title',
    	        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    	      },
    	      editable: true,
    	      droppable: true, // this allows things to be dropped onto the calendar
    	      events: all_events, 
    	      drop: function(info) {
    	        // is the "remove after drop" checkbox checked?
    	        if (checkbox.checked) {
    	          // if so, remove the element from the "Draggable Events" list
    	          info.draggedEl.parentNode.removeChild(info.draggedEl);
    	        }
    	      },
    	      locale : "ko"
    	    });

    	    calendar.render();
    	  });



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

