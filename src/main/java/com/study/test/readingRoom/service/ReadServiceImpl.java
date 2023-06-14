package com.study.test.readingRoom.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.readingRoom.vo.ReadVO;
import com.study.test.readingRoom.vo.ReservationVO;

import jakarta.persistence.RollbackException;
import jakarta.transaction.Transactional;

@Service("readService")
public class ReadServiceImpl implements ReadService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<ReadVO> getSeatList(String dateNo) {
		return sqlSession.selectList("readMapper.getSeatList", dateNo);
	}

	@Override
	public String getDateNo(String seatNo) {
		return sqlSession.selectOne("readMapper.getDateNo", seatNo);
	}

	@Override
	@Transactional(rollbackOn = RollbackException.class)
	public int reservationRoom(ReservationVO reservationVO) {
		sqlSession.insert("readMapper.reservationRoom", reservationVO);
		return sqlSession.update("readMapper.seatUpdate", reservationVO.getSeatNo());
	}

	@Override
	public void setBeforDateBySeatUsed(String dateNo) {
		sqlSession.update("readMapper.setBeforDateBySeatUsed",dateNo);
		
	}
	
	
	@Override
	public int verifyReservationRoom(ReservationVO reservationVO) {
		return sqlSession.selectOne("readMapper.verifyReservationRoom",reservationVO);
	}

	@Override
	public int verifyLeaveRoom(String memNo) {
		return sqlSession.selectOne("readMapper.verifyLeaveRoom",memNo);
	}
	
	
	
}
