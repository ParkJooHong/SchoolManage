package com.study.test.board.service;

import java.util.List;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.SearchVO;
import com.study.test.board.vo.UniBoardVO;

public interface BoardService {

	//보드 게시판 카테고리 조회
	List<BoardCategoryVO> getBoardCategoryList();
	
	//내가 쓴 보드 전체 리스트 조회
	List<UniBoardVO> getTotalMyBoardList(UniBoardVO uniBoardVO);
	
	//보드 개수 조회
	int totalBoardCount(UniBoardVO uniBoardVO);
	
	//전체 게시판 페이징
	int totalBoardPage(SearchVO searchVO);
	
	// 보드 전체 리스트 조회
	List<UniBoardVO> getTotalBoardList();
	
	//보드 게시글 등록
	void insertBoard(UniBoardVO uniBoardVO);
	
	//보드 글 상세보기
	List<UniBoardVO> boardDetail(String boardNo);
	
	//보드 게시글 삭제
	void boardDelete(String boardNo);
	
	//보드 수정
	void boardUpdate(UniBoardVO uniBoardVO);
	
	//보드 조회 수
	void readCnt(UniBoardVO uniBoardVO);
	
	
	
	//보드 최근 개월 수 조회
	List<UniBoardVO> getMonthBoardList(int month);
}
