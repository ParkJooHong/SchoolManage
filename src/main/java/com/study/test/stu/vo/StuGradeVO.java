package com.study.test.stu.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StuGradeVO {

	private String aPlus;
	private String a;
	private String bPlus;
	private String b;
	private String cPlus;
	private String c;
	private String dPlus;
	private String d;
	private String f;
	
	public List<String> getDataToList(){
		List<String> list = new ArrayList<>();
		
		list.add(getAPlus());
		list.add(getA());
		list.add(getBPlus());
		list.add(getB());
		list.add(getCPlus());
		list.add(getC());
		list.add(getDPlus());
		list.add(getD());
		list.add(getF());
		
		
		return list;
	}
	
}
