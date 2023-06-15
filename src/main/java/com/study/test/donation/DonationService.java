package com.study.test.donation;

import java.util.List;

public interface DonationService {

    // 중고 상품을 데이터베이스에 등록하는 쿼리문
    void insertDonation(DonationBoardVO donationBoardVO);

    //다음 이미지 코드를 조회하는 코드 
    String getNextDonationImgCode();

    // 중고 상품을 데이터베이스에서 조회하는 쿼리문
    List<DonationBoardVO> donationSearch();


    // 중고 상품 상세보기 조회하는 쿼리문
    DonationBoardVO detailDonation(String donationCode);

}
