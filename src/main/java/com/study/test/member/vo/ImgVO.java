package com.study.test.member.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ImgVO {
	private String imgCode;
	private String originFileName;
	private String attachedFileName;
	private String isMain;
	private String itemCode;
}
