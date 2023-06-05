package com.study.test.kakao.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.kakao.service.KakaoService;
import com.study.test.kakao.vo.KakaoVO;
import com.study.test.stu.service.StuService;

import jakarta.annotation.Resource;



@Controller
@RequestMapping("/kakao")
public class KakaoController {
	
	@Resource(name = "kakaoService")
	private KakaoService kakaoService;
	
	//카카오톡
		@PostMapping("/kakaoLoginAjax")
		@ResponseBody
		public Map<String, Object> kakaoLoginAjax(KakaoVO kakaoVO, String profileNickname, String accountEmail, String gender) {		
			System.out.println(profileNickname);
			System.out.println(accountEmail);
			System.out.println(gender);
			
			kakaoVO.setProfileNickname(profileNickname);
			kakaoVO.setAccountEmail(accountEmail);
			kakaoVO.setGender(gender);
			
			System.out.println(kakaoVO);
			
			kakaoService.kakaoLogin(kakaoVO);
			
			Map<String, Object> data = new HashMap<>();
						
			data.put("profileNickname", kakaoVO.getProfileNickname());
			data.put("gender", kakaoVO.getGender());
			data.put("menuCode", "MENU_001");
			
			return data;
		}
}
