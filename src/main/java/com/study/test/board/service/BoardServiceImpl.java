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

	//보드 게시글 쓰기
	@Override
	public void insertBoard(UniBoardVO uniBoardVO) {
		sqlSession.insert("boardMapper.insertBoard",uniBoardVO);
		
	}

	//보드 글 상세보기
	@Override
	public List<UniBoardVO> boardDetail(String boardNo) {
		return sqlSession.selectList("boardMapper.boardDetail" , boardNo);
	}

	//보드 게시글 삭제
	@Override
	public void boardDelete(String boardNo) {
		sqlSession.delete("boardMapper.boardDelete", boardNo);
		
	}

	//보드 수정
	@Override
	public void boardUpdate(UniBoardVO uniBoardVO) {
		sqlSession.update("boardMapper.boardUpdate", uniBoardVO);
		
	}

	//보드 개수 조회
	@Override
	public int totalBoardCount() {
		return sqlSession.selectOne("boardMapper.totalBoardCount");
	}
	
	
}
