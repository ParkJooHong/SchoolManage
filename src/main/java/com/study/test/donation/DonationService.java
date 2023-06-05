package com.study.test.donation;

import java.util.List;

public interface DonationService {

    //중고 상품을 데이터베이스에 등록하는 쿼리문
    void insertDonation(DonationBoardVO donationBoardVO);

    //중고 상품을 데이터베이스에서 조회하는 쿼리문 
    List<DonationBoardVO> donationSearch(DonationBoardVO donationBoardVO);
    
}
