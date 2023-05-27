package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SearchVO extends PageVO{
	private int month;
	
	private String fromDate;
	private String toDate;
	
	private String searchKeyword;
	private String searchValue;
	
	private String orderBy;
}
