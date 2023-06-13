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
	//ajax end111111
}


//승인내역 차트 그리기
function drowAcceptChart(chart_data_list){
	const accept_data = chart_data_list['acceptData'];
	const total_data = chart_data_list['totalData'];
	const prob_data = chart_data_list['probData'];
	const out_data = chart_data_list['outData'];
	console.log(prob_data);
	console.log(out_data);
	accept_date_list = [];
	data_cnt_list = [];
	total_data_cnt = [];
	prob_month_list = [];
	prob_data_list = [];
	out_data_list = [];
	accept_data.forEach(function(accept){
		const date = accept.acceptDate.substr(5,);
		accept_date_list.push(date);
		data_cnt_list.push(accept.dataCnt);
	});
	total_data.forEach(function(total){
		total_data_cnt.push(total.dataCnt);
	});
	prob_data.forEach(function(prob){
		prob_month_list.push(prob.monthData);
		prob_data_list.push(prob.probCnt);
	});
	out_data.forEach(function(out){
		out_data_list.push(out.outCnt);
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
						maintainAspectRatio :false,
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
				
	const ctx2 = document.getElementById('disChart');
				new Chart(ctx2, {
					type: 'bar',
					data: {
						labels: prob_month_list,
						datasets: [
							{			
								label: '학사 경고 내역',
								data: prob_data_list,
								borderWidth: 1,
								yAxisID:'y'
							},
							{			
								label: '제적 내역',
								type: 'bar',
								data : out_data_list,
								borderWidth: 2,
								yAxisID:'y1'
							}
						
						]
					},
					options: {
						maintainAspectRatio :false,
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