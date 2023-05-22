package com.study.test.board.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.study.test.board.vo.BoardReplyVO;


public interface BoardReplyService {
	
	//게시글 수정
	

	//댓글 조회
	List<BoardReplyVO> selectReply(String boardNo);
	
	//댓글 등록
	void insertReply(BoardReplyVO boardReplyVO);
	
	//댓글 삭제
	void replyDelete(BoardReplyVO boardReplyVO);
	
	//댓글 수정
	void replyUpdate(BoardReplyVO boardReplyVO);
	
}
