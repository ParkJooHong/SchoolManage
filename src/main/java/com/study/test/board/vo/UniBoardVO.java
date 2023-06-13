package com.study.test.board.vo;

import com.study.test.member.vo.MemImgVO;

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
	private String boardPw;
	private BoardReplyVO boardReplyVO;
	private MemImgVO memImgVO;
	
	private String cateName;
	
	@Override
	public String toString() {
		return "UniBoardVO [boardNo=" + boardNo + ", boardTitle=" + boardTitle + ", boardContent=" + boardContent
				+ ", boardWriter=" + boardWriter + ", regBoardDate=" + regBoardDate + ", readCnt=" + readCnt + ", deptNo = " + deptNo
				+ ", cateNo=" + cateNo + ", replyCnt=" + replyCnt + ", isPrivate=" + isPrivate + ", isNotice="
				+ isNotice + ", boardReplyVO=" + boardReplyVO + ", toString()=" + super.toString() + "]";
	}
	
	
}
