package com.study.test.readingRoom.service;

import java.util.List;

import com.study.test.readingRoom.vo.ReadVO;
import com.study.test.readingRoom.vo.ReservationVO;

public interface ReadService {
	List<ReadVO> getSeatList(String dateNo);
	
	String getDateNo(String seatNo);
	
	int reservationRoom(ReservationVO reservationVO);
	
	void setBeforDateBySeatUsed(String dateNo);
	
	int verifyReservationRoom(ReservationVO reservationVO);
	
	int verifyLeaveRoom(String memNo);
}
