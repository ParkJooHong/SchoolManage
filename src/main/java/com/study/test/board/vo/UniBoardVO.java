package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UniBoardVO {

	private String boardNo;
	private String boardTitle;
	private String boardContent;
	private String boardWriter;
	private String regBoardDate;
	private int readCnt;
	private String cateNo;
	private int replyCnt;
	private String isPrivate;
	private String isNotice;
	private BoardReplyVO boardReplyVO;
}
