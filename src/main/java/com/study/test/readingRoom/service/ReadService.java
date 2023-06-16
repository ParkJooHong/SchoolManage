package com.study.test.readingRoom.service;

import java.util.List;

import com.study.test.readingRoom.vo.ReadVO;
import com.study.test.readingRoom.vo.ReservationVO;

public interface ReadService {
	//시트 리스트
	List<ReadVO> getSeatList(String dateNo);
	//날짜번호 가져오기
	String getDateNo(String seatNo);
	//예약 여부 확인
	int reservationRoom(ReservationVO reservationVO);
	//시트 사용여부 확인
	int setBeforDateBySeatUsed(String dateNo);
	//퇴실 검증
	int verifyLeaveRoom(String memNo);
	//퇴실하는 회원 시트번호 가져오기
	String getMemSeatNo(ReservationVO reservationVO);
	//퇴실 처리
	int setReservationRoomByMember(ReservationVO reservationVO);
}
