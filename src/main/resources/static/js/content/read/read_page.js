init();


function init() {

	const a_line = document.querySelector('#aLine');
	const b_line = document.querySelector('#bLine');
	const c_line = document.querySelector('#cLine');
	const d_line = document.querySelector('#dLine');

	let a_str = '';
	let b_str = '';
	let c_str = '';
	let d_str = '';
	//ajax start
	$.ajax({
		url: '/stuMenu/getSeatDataAjax', //요청경로
		type: 'post',
		async: true,
		contentType: 'application/json; charset=UTF-8',
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		data: {}, //필요한 데이터
		success: function(result) {
			console.log(result);
			for(let i = 0 ; i < 10; i ++){
				a_str += `<td value="${result[i].seatNo}" onclick="reservRead(${result[i].seatNo});">${result[i].seatName}</td>`;
			}
			
			for(let i = 10 ; i < 20; i++){
				b_str += `<td value="${result[i].seatNo}" onclick="reservRead(${result[i].seatNo});">${result[i].seatName}</td>`;
			}
			for(let i = 20 ; i < 30 ; i++){
				c_str += `<td value="${result[i].seatNo}" onclick="reservRead(${result[i].seatNo});">${result[i].seatName}</td>`;
			}
			for(let i = 30 ; i < 40 ; i++){
				d_str += `<td value="${result[i].seatNo}" onclick="reservRead(${result[i].seatNo});">${result[i].seatName}</td>`;
			}
			
			a_line.insertAdjacentHTML('afterbegin',a_str);
			b_line.insertAdjacentHTML('afterbegin',b_str);
			c_line.insertAdjacentHTML('afterbegin',c_str);
			d_line.insertAdjacentHTML('afterbegin',d_str);
		},
		error: function() {
			alert('실패');
		}
	});
	//ajax end

}






function reservRead(seat_no){
	
}