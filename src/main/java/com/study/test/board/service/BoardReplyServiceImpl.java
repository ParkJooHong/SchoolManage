package com.study.test.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.board.vo.BoardReplyVO;


@Service("boardReplyService")
public class BoardReplyServiceImpl implements BoardReplyService {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//댓글 조회
	@Override
	public List<BoardReplyVO> selectReply(String boardNo) {
		// TODO Auto-generated method stub
		return sqlSession.selectList("replyMapper.selectReply", boardNo);
	}

	
	//댓글 등록
	@Override
	public void insertReply(BoardReplyVO boardReplyVO) {
		sqlSession.insert("replyMapper.insertReply", boardReplyVO);
		
	}

	
}
