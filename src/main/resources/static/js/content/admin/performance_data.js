getChartDataList();

//차트 그릴 데이터 가져오기
function getChartDataList(){
	const accept_date = document.querySelector('#monthData').value;
	//ajax start
	$.ajax({
	   url: '/admin/getChartDataListAjax', //요청경로
	   type: 'post',
	   async: true,
	   contentType : 'application/json; charset=UTF-8',
	   contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	   data: {'acceptDate':accept_date}, //필요한 데이터
	   success: function(result) {
	     drowAcceptChart(result);
	   },
	   error: function() {
	      alert('실패');
	   }
	});
	//ajax end
}


//승인내역 차트 그리기
function drowAcceptChart(chart_data_list){
	const accept_data = chart_data_list['acceptData'];
	const total_data = chart_data_list['totalData'];
	accept_date_list = [];
	data_cnt_list = [];
	total_data_cnt = [];
	accept_data.forEach(function(accept){
		accept_date_list.push(accept.acceptDate);
		data_cnt_list.push(accept.dataCnt);
	});
	total_data.forEach(function(total){
		total_data_cnt.push(total.dataCnt);
	});
	console.log(accept_date_list);
	console.log(data_cnt_list);
	const chart = Chart.getChart('myChart');
		if (chart) {
		    chart.destroy();
		}
	const ctx = document.getElementById('myChart');
				new Chart(ctx, {
					type: 'line',
					data: {
						labels: accept_date_list,
						datasets: [
							{			
								label: '일별 승인 내역',
								data: data_cnt_list,
								borderWidth: 1,
								yAxisID:'y'
							},
							{			
								label: '전체 신청 내역',
								type: 'bar',
								data : total_data_cnt,
								borderWidth: 2,
								yAxisID:'y1'
							}
						
						]
					},
					options: {
						scales: {
							y: {
								beginAtZero: true,
								type:'linear',
								display: true,
								position:'left',
								min: 0,
								max: 10,
							},
							y1: {
								beginAtZero: true,
								type:'linear',
								display: true,
								position:'right',
								min: 0,
								max: 10,
							},
						}
					}
				});

}