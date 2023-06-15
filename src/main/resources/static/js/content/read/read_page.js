init();

/////퇴실 처리시 INIT 함수 말고 다른 불러올 방법 찾기

function init() {
	const today = new Date();
	const day_no = parseInt(today.getDay());
	const befor_no = day_no - 1;
	const date_no = 'DATE_' + (day_no);
	const befor_date_no = 'DATE_' + befor_no;

	deleteByBeforData(befor_date_no);

	const a_line = document.querySelector('#aLine');
	const b_line = document.querySelector('#bLine');
	const c_line = document.querySelector('#cLine');
	const d_line = document.querySelector('#dLine');
	
	a_line.replaceChildren();
	b_line.replaceChildren();
	c_line.replaceChildren();
	d_line.replaceChildren();
	
	$('#roomDay').val(day_no).prop("selected", true);

	let a_str = '';
	let b_str = '';
	let c_str = '';
	let d_str = '';

	//ajax start
	$.ajax({
		url: '/stuMenu/getSeatDataAjax', //요청경로
		type: 'post',
		async: false,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'dateNo': date_no }, //필요한 데이터
		success: function(result) {
			console.log(result);
			for (let i = 0; i < 10; i++) {
				if (result[i].isReserve == 'O') {
					a_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					a_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}
			for (let i = 10; i < 20; i++) {
				if (result[i].isReserve == 'O') {
					b_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					b_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}
			for (let i = 20; i < 30; i++) {
				if (result[i].isReserve == 'O') {
					c_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					c_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}
			for (let i = 30; i < 40; i++) {
				if (result[i].isReserve == 'O') {
					d_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					d_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}

			a_line.insertAdjacentHTML('afterbegin', a_str);
			b_line.insertAdjacentHTML('afterbegin', b_str);
			c_line.insertAdjacentHTML('afterbegin', c_str);
			d_line.insertAdjacentHTML('afterbegin', d_str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}
//날짜 변경
function changeDay(room_day) {
	const today = new Date();
	const day_no = parseInt(today.getDay());
	const date = parseInt(room_day.value);
	const date_no = 'DATE_' + date;
	console.log(date);
	if ((date + 1) == day_no) {
		swal.fire({
			title: "전일로 예약 할 수 없습니다.",
			icon: 'error',
			button: '확인',
		})
		$('#roomDay').val(day_no).prop("selected", true);
		return
	}
	else {
		getRoomData(date_no);
	}


}



//열람실 정보 가져오기
function getRoomData(date_no) {
	const a_line = document.querySelector('#aLine');
	const b_line = document.querySelector('#bLine');
	const c_line = document.querySelector('#cLine');
	const d_line = document.querySelector('#dLine');

	a_line.replaceChildren();
	b_line.replaceChildren();
	c_line.replaceChildren();
	d_line.replaceChildren();

	let a_str = '';
	let b_str = '';
	let c_str = '';
	let d_str = '';

	//ajax start
	$.ajax({
		url: '/stuMenu/getSeatDataAjax', //요청경로
		type: 'post',
		async: false,
		//contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'dateNo': date_no }, //필요한 데이터
		success: function(result) {
			console.log(result);
			for (let i = 0; i < 10; i++) {
				if (result[i].isReserve == 'O') {
					a_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					a_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}
			for (let i = 10; i < 20; i++) {
				if (result[i].isReserve == 'O') {
					b_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					b_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}
			for (let i = 20; i < 30; i++) {
				if (result[i].isReserve == 'O') {
					c_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					c_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}
			for (let i = 30; i < 40; i++) {
				if (result[i].isReserve == 'O') {
					d_str += `<td style="background-color: none"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="reservRead(this);">${result[i].seatName}</a></td>`;
				}
				else {
					d_str += `<td style="background-color: #F7E6C4;"><a href="javascript:void(0)" data-seat-no="${result[i].seatNo}" data-seat-name="${result[i].seatName}" onclick="disableedRead(this);">${result[i].seatName}</a></td>`;
				}
			}

			a_line.insertAdjacentHTML('afterbegin', a_str);
			b_line.insertAdjacentHTML('afterbegin', b_str);
			c_line.insertAdjacentHTML('afterbegin', c_str);
			d_line.insertAdjacentHTML('afterbegin', d_str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end
}


//모달 열기
function reservRead(seat_tag) {

	const read_modal = new bootstrap.Modal('#readModal');
	const seat_no = seat_tag.dataset.seatNo;
	const seat_name = seat_tag.dataset.seatName;

	const seat_hidden_val = document.querySelector('#seatNo');
	const seat_input = document.querySelector('#seatName');

	seat_hidden_val.value = seat_no;
	seat_input.value = seat_name;

	console.log(seat_no);

	read_modal.show();
}

//예약 진행
function reserveReadingRoom() {
	const seat_no = document.querySelector('#seatNo').value;
	const start_time = document.querySelector('#startTime').value;

	const end_time = parseInt(start_time) + 4;
	const today = new Date();
	const day_no = parseInt(today.getDay());
	const hours = ('0' + today.getHours()).slice(-2);
	const hour = parseInt(hours);
	const room_day = parseInt(document.querySelector('#roomDay').value);
	console.log(hour);

	if (day_no == room_day && hour >= start_time) {
		swal.fire({
			title: "예약 할 수 있는 시간이 아닙니다.",
			icon: 'error',
			button: '확인',
		})
		return
	}
	else {
		//예약 검증
		//ajax start
		$.ajax({
			url: '/stuMenu/reservateByVerifyAjax', //요청경로
			type: 'post',
			async: true,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {}, //필요한 데이터
			success: function(result) {
				if (result == 1) {
					swal.fire({
						title: "퇴실처리를 하지않아 예약이 불가능합니다.",
						icon: 'error',
						button: '확인',
					})
					return
				}
				else {
					swal.fire({
						title: "열람실 예약",
						text: "해당 내용으로 예약하시겠습니까?",
						icon: "question",
						showCancelButton: true,
						confirmButtonText: "확인",
						cancelButtonText: "취소"
					}).then((r) => {
						if (r.isConfirmed) {
							//ajax start
							$.ajax({
								url: '/stuMenu/regRoomAjax', //요청경로
								type: 'post',
								async: true,
								//contentType : 'application/json; charset=UTF-8',
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								data: { 'seatNo': seat_no, 'startTime': start_time, 'endTime': end_time }, //필요한 데이터
								success: function(result) {
									if (result == 1) {
										swal.fire({
											title: "예약이 완료되었습니다.",
											icon: 'success',
											button: '확인',
										}).then((r) => {
											location.href = '/stuMenu/read';
										})
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
								title: "예약이 취소되었습니다.",
								icon: 'success',
								button: '확인',
							});
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

//퇴실 처리
function leaveReadingRoom() {
	const today = new Date();

	const year = today.getFullYear();
	const month = today.getMonth() + 1;
	const date = today.getDate();

	const reg_date = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;

	console.log(reg_date);

	const day_no = parseInt(today.getDay());
	const room_day = parseInt(document.querySelector('#roomDay').value);

	if (day_no != room_day) {
		swal.fire({
			title: "해당 날짜에 입실한 이력이 없습니다.",
			icon: 'error',
			button: '확인',
		});
	}
	//데이터 검증
	else {
		//ajax start
		$.ajax({
			url: '/stuMenu/confirmedReadingRoomAjax', //요청경로
			type: 'post',
			async: true,
			//contentType : 'application/json; charset=UTF-8',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: {}, //필요한 데이터
			success: function(result) {
				if (result != 1) {
					swal.fire({
						title: "입실한 내역이 없습니다.",
						icon: 'error',
						button: '확인',
					});
					return
				}
				//퇴실 처리
				else if (result == 1) {
					swal.fire({
						title: "퇴실 처리",
						text: "퇴실하시겠습니까?",
						icon: "question",
						showCancelButton: true,
						confirmButtonText: "확인",
						cancelButtonText: "취소"
					}).then((r) => {
						if (r.isConfirmed) {
							//ajax start
							$.ajax({
								url: '/stuMenu/leaveReadingRoomAjax', //요청경로
								type: 'post',
								async: true,
								contentType: 'application/json; charset=UTF-8',
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								data: { 'regDate': reg_date }, //필요한 데이터
								success: function(result) {
									if (result == 1) {
										swal.fire({
											title: "퇴실 처리가 완료되었습니다.",
											icon: 'success',
											button: '확인',
										}).then((r)=>{
											if(r){
												init();
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
						else if (r.isDismissed) {
							swal.fire({
								title: "퇴실 처리가 취소되었습니다.",
								icon: 'success',
								button: '확인',
							});
						}
					})

				}
				else {
					swal.fire({
						title: "오류입니다 관리자에게 문의하세요",
						icon: 'error',
						button: '확인',
					});
					return
				}
			},
			error: function() {
				alert('실패');
			}
		});
		//ajax end
	}
}



//전날 데이터 지우기
function deleteByBeforData(date_no) {

	//ajax start
	$.ajax({
		url: '/stuMenu/deleteByBeforDataAjax', //요청경로
		type: 'post',
		async: false,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: { 'dateNo': date_no }, //필요한 데이터
		success: function(result) {

		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}
















