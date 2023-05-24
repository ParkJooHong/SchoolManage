package com.study.test.school.dept;

import java.util.List;

import com.study.test.member.vo.MemberVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.stu.vo.StuVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DeptManageVO {
	private String applyNo;
	private String stuNo;
	private String applyCode;
	private String applyDate;
	private String applyReason;
	private String applrovalDate;
	private String processStatus;
	private String fromColl;
	private String toColl;
	private String fromDept;
	private String toDept;
	private String doubleMajorColl;
	private String doubleMajorDept;
	private int stuYear;
	private int stuSem;
	private MemberVO memberVO;
	private StuVO stuVO;
	private String fromCollName;
	private String toCollName;
	private String fromDeptName;
	private String toDeptName;
	private String doubleMajorCollName;
	private String doubleMajorDeptName;
	private String toDate;
	private String fromDate;
	private ColleageVO colleageVO;
	private DeptVO deptVO;
	private List<String> applyNoList;
	private List<StuVO> stuVOList;
	
	
}
