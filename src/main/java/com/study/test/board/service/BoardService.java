package com.study.test.board.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardReplyVO;
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
	List<UniBoardVO> getTotalBoardList(UniBoardVO uniBoardVO);
	
	//보드 게시판 학과별 조회
	List<UniBoardVO> getTotalDeptBoardList(UniBoardVO uniBoardVO);
	
	//보드 게시글 등록
	void insertBoard(UniBoardVO uniBoardVO);
	
	//보드 글 상세보기
	UniBoardVO boardDetail(String boardNo);
	
	//보드 게시글 삭제
	void boardDelete(String boardNo);
	
	//보드 수정
	void boardUpdate(UniBoardVO uniBoardVO);
	
	//보드 조회 수
	void readCnt(UniBoardVO uniBoardVO);

	//보드 최근 개월 수 조회
	List<UniBoardVO> getMonthBoardList(int month);
	
	//여기서부터 변경된 내용
	
	//게시판 검색
	List<UniBoardVO> searchByBoard(UniBoardVO uniBoardVO);
	
	//게시판 상세보기
	UniBoardVO getBoardDetail(String boardNo);
	
	//댓글 조회
	List<BoardReplyVO> getBoardReplyList(String boardNo);
	
	//전체 페이징
	int cntBoardList(UniBoardVO uniBoardVO);
	
	//게시판 등록
	void insertByBoard(UniBoardVO uniBoardVO);
	
	//게시판 조회수 업데이트
	void setReadCnt(String boardNo);
	
	//게시판 상세정보 업데이트
	void setBoardDetail(UniBoardVO uniBoardVO);
	
	//게시글 삭제
	void delBoard(String boardNo);
	
	//비밀글 비밀번호 확인
	int getCheckPw(UniBoardVO uniBoardVO);
	
	//댓글 등록
	void regReply(BoardReplyVO boardReplyVO);
	
}
