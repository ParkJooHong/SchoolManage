package com.study.test.message.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MessageVO {
	private String msgNo;
	private String sendMemNo;
	private String recvMemNo;
	private String sendTime;
	private String readTime;
	private int readChk;
	private String content;
	private String otherName;
	private String name;
	private int unread;
}
