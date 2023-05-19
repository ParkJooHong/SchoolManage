package com.study.test.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.UniBoardVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//보드 게시판 카테고리 조회
	@Override
	public List<BoardCategoryVO> getBoardCategoryList() {
		return sqlSession.selectList("boardMapper.getBoardCategoryList");
	}

	// 보드 전체 게시판 조회
	@Override
	public List<UniBoardVO> getTotalBoardList() {
		return sqlSession.selectList("boardMapper.getTotalBoardList");
	}
}
