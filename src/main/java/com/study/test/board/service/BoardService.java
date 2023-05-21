package com.study.test.board.service;

import java.util.List;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.UniBoardVO;

public interface BoardService {

	//보드 게시판 카테고리 조회
	List<BoardCategoryVO> getBoardCategoryList();
	
	// 보드 전체 리스트 조회
	List<UniBoardVO> getTotalBoardList();
	
	//보드 게시글 등록
	void insertBoard(UniBoardVO uniBoardVO);
	
	//보드 글 상세보기
	List<UniBoardVO> boardDetail(String boardNo);
	
	//보드 게시글 삭제
	void boardDelete(String boardNo);
}
