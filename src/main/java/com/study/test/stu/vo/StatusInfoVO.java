package com.study.test.stu.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StatusInfoVO {

	private String statusNo;
	private String stuNo;
	private String nowStatus;
	private String afterStatus;
	private String applyDate;
	private String approvalDate;
	private String ingStatus;
	private int stuYear;
	private int stuSem;
	private String statusReason;
}
