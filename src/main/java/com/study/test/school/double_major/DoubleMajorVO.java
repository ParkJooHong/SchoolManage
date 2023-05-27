package com.study.test.school.double_major;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DoubleMajorVO {
	private String doubleNo;
	private String doubleDeptName;
	private String doubleColl;
	private List<String> doubleMajorDeptNoList;
}
