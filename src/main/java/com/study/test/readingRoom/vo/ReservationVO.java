package com.study.test.readingRoom.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReservationVO {
	private String reserNo;
	private String memNo;
	private String seatNo;
	private String startTime;
	private String endTime;
	private String regDate;
	private String dateNo;
	private String isLeave;
}
