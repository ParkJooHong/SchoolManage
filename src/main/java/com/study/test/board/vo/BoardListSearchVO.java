package com.study.test.board.vo;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Setter
@Getter
public class BoardListSearchVO extends PageVO {

	private List<Integer> statusCodeList;
	private String searchFromDate;
	private String searchToDate;
	private String searchKeyword;
	private String searchValue;
	
	private String orderBy;
}
