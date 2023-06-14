package com.study.test.donation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@ToString
@Setter
@Getter
public class DonationBoardImageVO {
    private String imgCode;
    private String originFileName;
    private String attachedFileName;
    private String donationCode;
    private String isMain;
    
}
