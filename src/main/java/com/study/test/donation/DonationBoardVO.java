package com.study.test.donation;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class DonationBoardVO {
    private String donationCode;
    private int donationPrice;
    private String donationContent;
    private String donationName;
    private String donationImage;
    private DonationBoardImageVO donationBoardImageVO;
}
