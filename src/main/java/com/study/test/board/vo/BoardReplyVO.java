package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class BoardReplyVO {

	private String replyNo;
	private String boardNo;
	private String replyContent;
	private String replyWriter;
	private String isPrivate;
}
