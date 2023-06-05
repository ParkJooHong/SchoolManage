package com.study.test.donation;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class DonationBoardVO {
    private String donationCode;
    private String donationName;
    private int donationPrice;
    private String donationIntro;
    private byte[] imageData;

}

// MultipartFile은 Spring 에서 파일 업로드를 하는데
// 자주 사용 된다