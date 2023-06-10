
function logout(){
	location.href = "https://kauth.kakao.com/oauth/logout?client_id=6dcec8f87a854652753ec92d49fbd9a4&logout_redirect_uri=http://localhost:8081/";
}


window.Kakao.init("ef814d9af762d95219094a714893ec19");

function kakaoLogin(){
	
	window.Kakao.Auth.login({
		scope:'profile_nickname, account_email, gender',
		success: function(authObj){

			console.log(authObj);
			window.Kakao.API.request({
				url:'/v2/user/me',
				success: res => {
					const kakao_account = res.kakao_account;
					console.log(kakao_account);
					
					
				     console.log(res);
					console.log(res.properties['nickname']);
				     console.log(res.kakao_account['email']);
				     console.log(res.kakao_account['gender']);
				      
				      const profileNickname = res.properties['nickname'];
				      const accountEmail = res.kakao_account['email'];
				      const gender = res.kakao_account['gender'];
				      
				      $.ajax({
							url: '/kakao/kakaoLoginAjax', //요청경로
							type: 'post',
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							data: {'profileNickname' : profileNickname, 'accountEmail' : accountEmail, 'gender' : gender }, 
							success: function(result) {
							
								let memNo = 0101;
								alert(result['profileNickname']);
								location.href=`/stuMenu/mainPage?menuCode=${result['menuCode']}&profileNickname=${result['profileNickname']}&memNo=${memNo}`;
								
								
							},
							error: function() {
								alert('실패~');
							}
						});
				}
			});
			
		}
	});
}