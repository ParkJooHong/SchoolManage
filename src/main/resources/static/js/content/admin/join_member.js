//주소록 api실행
function searchAddr() {
	new daum.Postcode({
		oncomplete: function(data) {
			//도로명 주소
			const roadAddr = data.roadAddress;
			//도로명 주소 세팅
			document.querySelector('#inputAddress').value = roadAddr;

		}
	}).open();
}