package com.study.test.board.service;

import java.util.List;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.UniBoardVO;

public interface BoardService {

	//보드 게시판 카테고리 조회
	List<BoardCategoryVO> getBoardCategoryList();
	
	// 보드 전체 리스트 조회
	List<UniBoardVO> getTotalBoardList();
}
