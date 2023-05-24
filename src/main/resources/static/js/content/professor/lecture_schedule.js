
//맵이용
lecScheduleAjax();
function lecScheduleAjax() {
    $.ajax({
        url: '/professor/lectureScheduleAjax', 
        type: 'post',
        async: true,
        contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {},
        success: function(lecTimeList) {
         
            lecTimeList.forEach(function(lecTime, index) {
                lecTimeList[index]['START_TIME'] = parseInt(lecTime['START_TIME']);
                lecTimeList[index]['FINISH_TIME'] = parseInt(lecTime['FINISH_TIME']);
                lecTimeList[index]['LEC_DAY'] = parseInt(lecTime['LEC_DAY']);
                lecTimeList[index]['LEC_NAME'] = lecTime['LEC_NAME'];
            });
            console.log(lecTimeList);
            
         let str = '';          
         
         str += `<tr>`
         str += `	<td></td>`
         str += `	<td>월</td>`
         str += `	<td>화</td>`
         str += `	<td>수</td>`
         str += `	<td>목</td>`
         str += `	<td>금</td>`
         str += `</tr>`
         	
         for(let t = 1; t<10; t++){
            str += `<tr style="height: 40px;">`;  
            str += `   <td>`;  
            str += `       <div>${t+'교시'}</div>`;  
            str += `       <div>${(t+8)+':00'}</div>`;  
            str += `    </td> `;  
            for(let num = 1; num<6; num++){
               str += `<td class="tdTag"> `;  
               for(let i = 0; i<lecTimeList.length; i++){
                  if(lecTimeList[i]['LEC_DAY']==num && lecTimeList[i]['START_TIME']<=t+8 && lecTimeList[i]['FINISH_TIME']>=t+8){
                     str += `<span id="${'span'+i+num}">${lecTimeList[i]['LEC_NAME']}</span>`;
                  }
               }
               str += `</td>`;
            }
            str += `</tr>`;
         }
             document.querySelector('tbody').insertAdjacentHTML('afterend', str);
            
        },
        error: function() {
            alert('실패');
        }
    });
}
