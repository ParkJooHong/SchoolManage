package com.study.test.member.vo;

import com.study.test.admin.vo.EmpVO;
import com.study.test.admin.vo.StuOutVO;
import com.study.test.board.vo.PageVO;
import com.study.test.board.vo.SearchVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MemberVO extends SearchVO {
	private String memNo;
	private String memPw;
	private String memName;
	private String memEmail;
	private String memAddr;
	private String memAddrDetail;
	private String memTell;
	private String memImage;
	private String memGender;
	private String memBirth;
	private String memRole;
	private String engName;
	private String memStatus;
	private MemImgVO memImgVO;
	private StuVO stuVO;
	private EmpVO empVO;
	private ColleageVO colleageVO;
	private DeptVO deptVO;
	private DoubleMajorVO doubleMajorVO;
	private StatusInfoVO statusInfoVO;
	private StuOutVO stuOutVO;
}
