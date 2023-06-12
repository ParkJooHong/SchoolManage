package com.study.test.board.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchVO extends PageVO{
	private int month;
	
	
	private String fromDate;
	private String toDate;
	
	private String searchKeyword;
	private String searchValue;
	
	private String orderBy;
	
	private String categoryList;

	@Override
	public String toString() {
		return "SearchVO [month=" + month + ", fromDate=" + fromDate + ", toDate=" + toDate + ", searchKeyword="
				+ searchKeyword + ", searchValue=" + searchValue + ", orderBy=" + orderBy + ", categoryList="
				+ categoryList + "]";
	}


	
	
	
}
