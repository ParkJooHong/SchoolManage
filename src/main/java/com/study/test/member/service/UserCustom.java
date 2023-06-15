package com.study.test.member.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserCustom extends User {
	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

	private String memName;

	//추가로 알아두면 좋은거!!!
	//boolean enabled
	//계정이 활성화되어 있는지를 나타내는 플래그입니다. false인 경우, 사용자는 로그인할 수 없습니다.
	//boolean accountNonExpired
	//계정이 만료되지 않았음을 나타내는 플래그입니다. false인 경우, 사용자는 로그인할 수 없습니다.
	//boolean credentialsNonExpired
	//사용자의 자격 증명(일반적으로 비밀번호를 의미)이 만료되지 않았음을 나타내는 플래그입니다. false인 경우, 사용자는 로그인할 수 없습니다.
	//boolean accountNonLocked
	//계정이 잠기지 않았음을 나타내는 플래그입니다. false인 경우, 사용자는 로그인할 수 없습니다.

	public UserCustom(String username, String password
			, Collection<? extends GrantedAuthority> authorities
			, String memName) {
		super(username, password, authorities);
		this.memName = memName;
	}
	
}
