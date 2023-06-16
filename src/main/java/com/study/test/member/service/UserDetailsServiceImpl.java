package com.study.test.member.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;


//시큐리티가 로그인 할 때 자동으로 실행하는 클래스
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService{
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberVO memberInfo = new MemberVO();
		memberInfo.setMemNo(username);
		MemberVO userInfo = memberService.login(memberInfo);
		
		if(userInfo == null) {
			throw new UsernameNotFoundException("계정 조회 오류");
		}
		
		//Roles to GrantedAuthority Conversion
	    List<GrantedAuthority> grantedAuthorities = Arrays.stream(userInfo.getMemRole().split(","))
	            .map(SimpleGrantedAuthority::new)
	            .collect(Collectors.toList());
	    
	    UserDetails user = new UserCustom(userInfo.getMemNo()
	    									, userInfo.getMemPw()
	    									, authorities(userInfo)
	    									, userInfo.getMemName());
		
//		UserDetails user = User.withUsername(userInfo.getMemNo())
//								.password(userInfo.getMemPw())
//								.roles(userInfo.getMemRole())
//								.build();
	    
		return user;
	}
	
	// DB에 등록된 권한에 따라 유저권한 부여 user_role
	private static Collection<GrantedAuthority> authorities(MemberVO memberVO) {
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		// DB에 저장한 USER_ROLE 이 1이면 ADMIN 권한, 아니면 ROLE_USER 로 준다.
		if (memberVO.getMemRole().equals("ADMIN")) {
			authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
		} 
		else if (memberVO.getMemRole().equals("PRO")) {
			authorities.add(new SimpleGrantedAuthority("ROLE_PRO"));
		}
		else {
			authorities.add(new SimpleGrantedAuthority("ROLE_STU"));
		}
		return authorities;
	}
	
}

