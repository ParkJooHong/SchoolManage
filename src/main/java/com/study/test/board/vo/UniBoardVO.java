package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UniBoardVO extends SearchVO {

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
	private String deptNo;
	private BoardReplyVO boardReplyVO;
	
	@Override
	public String toString() {
		return "UniBoardVO [boardNo=" + boardNo + ", boardTitle=" + boardTitle + ", boardContent=" + boardContent
				+ ", boardWriter=" + boardWriter + ", regBoardDate=" + regBoardDate + ", readCnt=" + readCnt
				+ ", cateNo=" + cateNo + ", replyCnt=" + replyCnt + ", isPrivate=" + isPrivate + ", isNotice="
				+ isNotice + ", boardReplyVO=" + boardReplyVO + ", toString()=" + super.toString() + "]";
	}
	
	
}
