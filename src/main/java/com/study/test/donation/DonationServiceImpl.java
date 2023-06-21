package com.study.test.donation;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("donationService")
public class DonationServiceImpl implements DonationService {

    @Autowired
    SqlSessionTemplate sqlSession;

    // 중고 상품을 데이터베이스에 넣는 매퍼 쿼리문
    // Transaction(rollbackFor=Exception.class)를 메소드나 클래스에 적용하면
    // 해당 메서드가 실행되는 동안 트랜젝션이 시작되고 메서드의 모든 데이터베이스 작업은
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertDonation(DonationBoardVO donationBoardVO) {
        sqlSession.insert("donationMapper.regDonationItem", donationBoardVO);
        sqlSession.insert("donationMapper.regDonationImg", donationBoardVO);
    }

    // 중고 상품을 데이터베이스에서 조회하는 매퍼 쿼리문
    @Override
    public List<DonationBoardVO> donationSearch() {
        return sqlSession.selectList("donationMapper.donationData");
    }

    // 중고 상품의 상세보기를 하는 매퍼 쿼리문
    @Override
    public DonationBoardVO detailDonation(String donationCode) {
        return sqlSession.selectOne("donationMapper.donationDetail", donationCode);

    }

    // 다음 이미지 코드를 조회하는 쿼리문
    @Override
    public String getNextDonationImgCode() {
        return sqlSession.selectOne("donationMapper.getNextDonationImgCode");

    }
}