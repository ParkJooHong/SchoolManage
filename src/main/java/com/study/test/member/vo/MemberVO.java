package com.study.test.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO {
	private String memNo;
	private String memPw;
	private String memName;
	private String memEmail;
	private String memAddr;
	private String memAddrDetail;
	private String memTell;
	private String memImage;
	private String memGender;
	private String memBirth;
	private String memRole;
	private MemImgVO memImgVO;
	
}
