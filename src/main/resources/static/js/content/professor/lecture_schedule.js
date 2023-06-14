
//맵이용
lecScheduleAjax();

function lecScheduleAjax() {
	$.ajax({
		url: '/professor/lectureScheduleAjax',
		type: 'post',
		async: true,
		contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
		data: {},
		success: function(lecTimeList) {

			lecTimeList.forEach(function(lecTime, index) {
				lecTimeList[index]['START_TIME'] = parseInt(lecTime['START_TIME']);
				lecTimeList[index]['FINISH_TIME'] = parseInt(lecTime['FINISH_TIME']);
				lecTimeList[index]['LEC_DAY'] = parseInt(lecTime['LEC_DAY']);
				lecTimeList[index]['LEC_NAME'] = lecTime['LEC_NAME'];
			});

			let str = '';


			for (let t = 1; t < 10; t++) {
				str += `<tr style="height: 40px;">`;
				str += `   <td>`;
				str += `       <div>${t + '교시'}</div>`;
				str += `       <div>${(t + 8) + ':00'}</div>`;
				str += `    </td> `;
				for (let num = 1; num < 6; num++) {
					str += `<td class="tdTag"> `;
					for (let i = 0; i < lecTimeList.length; i++) {
						if (lecTimeList[i]['LEC_DAY'] == num && lecTimeList[i]['START_TIME'] <= t + 8 && lecTimeList[i]['FINISH_TIME'] > t + 8) {
							str += `<span id="${'span' + i + num}">${lecTimeList[i]['LEC_NAME']}</span>`;
						}
					}
					str += `</td>`;
				}
				str += `</tr>`;
			}
			
			const tbody_tag = document.querySelector('.schedule_tbody');
			
			tbody_tag.insertAdjacentHTML('afterbegin', str);

		},
		error: function() {
			alert('실패');
		}
	});
}


//시간표 캡쳐 저장 새창 띄우기

function pdfPrint() {
	// 캡쳐 라이브러리를 통해서 canvas 오브젝트를 받고 이미지 파일로 리턴한다.
	html2canvas(document.querySelector(".lec_schedule")).then(canvas => {
		saveAs(canvas.toDataURL('image/png'), `시간표.png`);
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

