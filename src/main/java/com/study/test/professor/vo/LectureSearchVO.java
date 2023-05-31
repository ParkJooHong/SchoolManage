package com.study.test.professor.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LectureSearchVO {

	private String searchKeyword;
	private String searchValue;
	
	private String searchColl;
	private String searchDept;
	
	private String orderBy;

	@Override
	public String toString() {
		return "LectureSearchVO [searchValue=" + searchValue + ", orderBy=" + orderBy + "]";
	}
	
	
}
