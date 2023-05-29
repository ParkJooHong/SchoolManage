package com.study.test.school.enrollment;

import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.grade.GradeVO;
import com.study.test.stu.vo.StuVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EnrollmentVO {
	private String enrollmentNo;
	private String stuNo;
	private String lecNo;
	private String semNo;
	private StuVO stuVO;
	private ColleageVO colleageVO;
	private DeptVO deptVO;
	private GradeVO gradeVO;
}
