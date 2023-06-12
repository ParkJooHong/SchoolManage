package com.study.test.member.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class MailVO {
	private String title;
	private String content;
	private List<String> recipientList;
}
