//페이징 처리
function getBoardList(pageNum){
	const test_form = document.querySelector('#test_form');
	
	test_form.querySelector('input[name="nowPage"]').value = pageNum;
	
	const order_label = document.querySelector('.order').querySelector('input[class*="btn-primary"]').dataset.orderBy;
	test_form.querySelector('input[name="orderBy"]').value = order_label;
	
	const categoryList_label = document.querySelector('.categoryList').querySelector('input[class*="btn-primary"]').dataset.categoryList;
	test_form.querySelector('input[name="categoryList"]').value = categoryList_label;
	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	test_form.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	test_form.querySelector('input[name="searchValue"]').value = searchValue_label;
	

	test_form.submit();
}


//정렬 orderby 최신 순
function getOrderList(REG_BOARD_DATE_ORDER){
	const test_orderBy = document.querySelector('#test_orderBy');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	//const pageNum_label = document.querySelector('#pageNum').querySelector('a[class="page-link active"]').dataset.pageNum;
	test_orderBy.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	test_orderBy.querySelector('input[name="orderBy"]').value = REG_BOARD_DATE_ORDER;
	
	const categoryList_label = document.querySelector('.categoryList').querySelector('input[class*="btn-primary"]').dataset.categoryList;
	test_orderBy.querySelector('input[name="categoryList"]').value = categoryList_label;
	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	test_orderBy.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	test_orderBy.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	test_orderBy.submit();
}

//정렬 orderby 조회 순
function getOrderList(READ_CNT){
	const test_orderBy = document.querySelector('#test_orderBy');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	//const pageNum_label = document.querySelector('#pageNum').querySelector('a[class="page-link active"]').dataset.pageNum;
	test_orderBy.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	test_orderBy.querySelector('input[name="orderBy"]').value = READ_CNT;
	
	const categoryList_label = document.querySelector('.categoryList').querySelector('input[class*="btn-primary"]').dataset.categoryList;
	test_orderBy.querySelector('input[name="categoryList"]').value = categoryList_label;
	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	test_orderBy.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	test_orderBy.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	test_orderBy.submit();
}


//정렬 orderby 댓글 순
function getOrderList(REPLY_CNT){
	const test_orderBy = document.querySelector('#test_orderBy');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	//const pageNum_label = document.querySelector('#pageNum').querySelector('a[class="page-link active"]').dataset.pageNum;
	test_orderBy.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	test_orderBy.querySelector('input[name="orderBy"]').value = REPLY_CNT;
	
	const categoryList_label = document.querySelector('.categoryList').querySelector('input[class*="btn-primary"]').dataset.categoryList;
	test_orderBy.querySelector('input[name="categoryList"]').value = categoryList_label;
	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	test_orderBy.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	test_orderBy.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	test_orderBy.submit();
}

//전체 정렬
function cateOrderList(CATE_001){
	
	const cateListOrder = document.querySelector('#cateListOrder');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	cateListOrder.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	const order_label = document.querySelector('.order').querySelector('input[class*="btn-primary"]').dataset.orderBy;
	cateListOrder.querySelector('input[name="orderBy"]').value = order_label;
	
	cateListOrder.querySelector('input[name="categoryList"]').value = CATE_001;	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	cateListOrder.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	cateListOrder.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	cateListOrder.submit();
}

//질문 순 정렬
function cateOrderList(CATE_003){
	
	const cateListOrder = document.querySelector('#cateListOrder');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	cateListOrder.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	const order_label = document.querySelector('.order').querySelector('input[class*="btn-primary"]').dataset.orderBy;
	cateListOrder.querySelector('input[name="orderBy"]').value = order_label;
	
	cateListOrder.querySelector('input[name="categoryList"]').value = CATE_003;	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	cateListOrder.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	cateListOrder.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	cateListOrder.submit();
}


//잡담 순 정렬
function cateOrderList(CATE_004){
	
	const cateListOrder = document.querySelector('#cateListOrder');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	cateListOrder.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	const order_label = document.querySelector('.order').querySelector('input[class*="btn-primary"]').dataset.orderBy;
	cateListOrder.querySelector('input[name="orderBy"]').value = order_label;
	
	cateListOrder.querySelector('input[name="categoryList"]').value = CATE_004;	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	cateListOrder.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	cateListOrder.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	cateListOrder.submit();
}


//정보 순 정렬
function cateOrderList(CATE_005){
	
	const cateListOrder = document.querySelector('#cateListOrder');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	cateListOrder.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	const order_label = document.querySelector('.order').querySelector('input[class*="btn-primary"]').dataset.orderBy;
	cateListOrder.querySelector('input[name="orderBy"]').value = order_label;
	
	cateListOrder.querySelector('input[name="categoryList"]').value = CATE_005;	
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	cateListOrder.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	cateListOrder.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	cateListOrder.submit();
}

//검색 정렬 keyword
function searchOrder(){
	
	const searchKeyword = document.querySelector('#searchKeyword');
	
	const pageNum_label = document.querySelector('#pageNum a.page-link.active').dataset.pageNum;
	searchKeyword.querySelector('input[name="nowPage"]').value = pageNum_label;
	
	
	const order_label = document.querySelector('.order').querySelector('input[class*="btn-primary"]').dataset.orderBy;
	searchKeyword.querySelector('input[name="orderBy"]').value = order_label;
	
	const categoryList_label = document.querySelector('.categoryList').querySelector('input[class*="btn-primary"]').dataset.categoryList;
	searchKeyword.querySelector('input[name="categoryList"]').value = categoryList_label;
	
	const searchKeyword_label = document.querySelector('.searchKeyword').value;
	searchKeyword.querySelector('input[name="searchKeyword"]').value = searchKeyword_label;
	
	const searchValue_label = document.querySelector('.searchValue').value;
	searchKeyword.querySelector('input[name="searchValue"]').value = searchValue_label;
	
	searchKeyword.submit();
}




// 비밀번호 예
function private(){
	
	const isPrivate = document.querySelector('.pwd');
	isPrivate.textContent = '';
	
	let str = '';

	str += '<input type="text" style="width: 200px;" placeholder="비밀번호를 입력해주세요." class="inputPwd">';
	
	isPrivate.insertAdjacentHTML('afterbegin', str);
}

//비밀번호 아니오
function noPrivate(){
	const isPrivate = document.querySelector('.pwd');
	isPrivate.textContent = '';
}

function success(menuCode, subMenuCode){
	
	const boardTitle = document.querySelector('.boardTitle').value;
	const boardContent = document.querySelector('.boardContent').value;
	//const isPrivate = document.querySelector('.isPrivate:checked').value;
	const isPrivate = document.querySelector('input[name="isPrivate"]:checked').value;
	//const isNotice = document.querySelector('input[name="isNotice"]:checked').value;
	const boardWriter = document.querySelector('.boardWriter').value;
	const cateNo =document.querySelector('.cateNo').value;
	const deptNo = document.querySelector('.deptNo').value;

	//비밀번호 등록
	const inputPwd = document.querySelector('.inputPwd').value;

	if(boardTitle == '')
	{
		swal.fire({
								title: "게시글 제목을 입력해주세요.",
								icon: 'warning',
								button: '확인',
							});
	}
	if(boardContent == ''){
		swal.fire({
								title: "게시글 제목을 입력해주세요.",
								icon: 'warning',
								button: '확인',
							});
	}
	
	$.ajax({
			url: '/stuMenu/boardWriteAjax', //요청경로
			type: 'post',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: { 'menuCode' : menuCode, 'subMenuCode' : subMenuCode,  'boardTitle' : boardTitle, 
			'boardContent' : boardContent, 'isPrivate' : isPrivate,  'boardWriter' : boardWriter, 'cateNo' : cateNo, 'inputPwd' : inputPwd, 'deptNo' : deptNo}, //필요한 데이터
			success: function(result) {
				if(result){
					swal.fire({
								title: "게시글이 등록되었습니다.",
								icon: 'success',
								button: '확인',
							});
					setTimeout(function() {
						location.reload();
						}, 500);
				}
				else{
					alert('일시적 오류가 발생했습니다.');
				}
			},
			error: function() {
				alert('실패');
				
			}
		});
}

//페스워드 체크!
function checkPwd(isPrivate ,boardNo, menuCode, subMenuCode, readCnt){
	
  	const userInput = prompt("비밀번호를 입력하세요:");

	// 다른 함수에서 입력 받은 데이터 사용
	function useUserInput(data) {
		
		if(data == isPrivate){
				$.ajax({
				url: '/stuMenu/pwdAjax', //요청경로
				type: 'post',
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: { 'menuCode' : menuCode, 'subMenuCode' : subMenuCode, 'isPrivate' : isPrivate, 'boardNo' : boardNo, 'readCnt' : readCnt}, //필요한 데이터
				success: function(result) {
					if(result){		
			
						location.href=`/board/boardDetail?menuCode=${menuCode}&subMenuCode=${subMenuCode}&boardNo=${boardNo}&readCnt=${readCnt} `;
					}
					else{
						alert('일시적 오류가 발생했습니다.');
					}
				},
				error: function() {
					alert('실패');
					
				}
			}); 
		}
		else{
			swal.fire({
								title: "비밀번호를 확인해주세요.",
								icon: 'warning',
								button: '확인',
							});
		}
		
	  console.log("입력 받은 데이터:", data);
	}
	  	
  	useUserInput(userInput);
}



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





/*정렬 기능 날짜순
function getOrderListDesc(REG_BOARD_DATE){
	
	const orderDate = document.querySelector('.orderDate');
	alert(orderDate);
	
	const orderBy = document.querySelector('#orderBy');
	orderBy.querySelector('input').value = REG_BOARD_DATE;
	
	orderBy.submit();
}
*/
/*정렬 기능 조회순
function getOrderListDesc(READ_CNT){
	const orderBy = document.querySelector('#orderBy');
	orderBy.querySelector('input').value = READ_CNT;
	
	
	orderBy.submit();
}
*/
/*정렬 기능 댓글 순
function getOrderListDesc(REPLY_CNT){
	const orderBy = document.querySelector('#orderBy');
	orderBy.querySelector('input').value = REPLY_CNT;
	orderBy.submit();
}
*/
/*
//전체
function cateList(CATE_001){

	const orderBy = document.querySelector('#categoryList');
	orderBy.querySelector('input').value = CATE_001;
	orderBy.submit();
}


//질문
function cateList(CATE_003){

	const orderBy = document.querySelector('#categoryList');
	orderBy.querySelector('input').value = CATE_003;
	orderBy.submit();
}

//잡담
function cateList(CATE_004){
	const orderBy = document.querySelector('#categoryList');
	orderBy.querySelector('input').value = CATE_004;
	orderBy.submit();
}

//정보
function cateList(CATE_005){
	const orderBy = document.querySelector('#categoryList');
	orderBy.querySelector('input').value = CATE_005;
	orderBy.submit();
}


//검색기능
function searchList(month){
	const month_form = document.querySelector('#month-form');
	month_form.querySelector('input').value = month;
	month_form.submit();
}
*/





















