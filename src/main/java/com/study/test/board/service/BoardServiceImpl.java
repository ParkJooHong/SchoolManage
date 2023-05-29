package com.study.test.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.SearchVO;
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
	
	//내가쓴 보드 전체 리스트 조회
	@Override
	public List<UniBoardVO> getTotalMyBoardList(UniBoardVO uniBoardVO) {
		return sqlSession.selectList("boardMapper.getTotalMyBoardList", uniBoardVO);
	}
	
	//내가 쓴 보드 개수 조회
	@Override
	public int totalBoardCount(UniBoardVO uniBoardVO) {
		return sqlSession.selectOne("boardMapper.totalBoardCount", uniBoardVO);
	}

	// 보드 전체 게시판 조회
	@Override
	public List<UniBoardVO> getTotalBoardList(UniBoardVO uniBoardVO) {
		return sqlSession.selectList("boardMapper.getTotalBoardList", uniBoardVO);
	}
	
	//전체 게시판페이징
		@Override
		public int totalBoardPage(SearchVO searchVO) {	
			return sqlSession.selectOne("boardMapper.totalBoardPage", searchVO);
		}

	//보드 게시글 쓰기
	@Override
	public void insertBoard(UniBoardVO uniBoardVO) {
		sqlSession.insert("boardMapper.insertBoard",uniBoardVO);
		
	}

	//보드 글 상세보기
	@Override
	public UniBoardVO boardDetail(String boardNo) {
		return sqlSession.selectOne("boardMapper.boardDetail" , boardNo);
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

	

	//보드 조회 수 
	@Override
	public void readCnt(UniBoardVO uniBoardVO) {
		sqlSession.insert("boardMapper.readCnt", uniBoardVO);
		
	}

	//보드 최근 개월 수에 따른 조회
	@Override
	public List<UniBoardVO> getMonthBoardList(int month) {
		return sqlSession.selectList("boardMapper.getMonthBoardList", month);
	}

	

	
	
	
}
