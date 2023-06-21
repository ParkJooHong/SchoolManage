package com.study.test.stu.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ScheduleVO {

	private String scdNo;
	private String title;
	private String startTime;
	private String endTime;
	private String viewTitle;
	private String memNo;
	
	private String memRole;
}
