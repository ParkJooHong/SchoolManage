package com.study.test.donation;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service("donationService")
public class DonationServiceImpl implements DonationService {

    @Autowired SqlSessionTemplate sqlSession;


    //중고 상품을 데이터베이스에 넣는 매퍼 쿼리문 
    @Override
    public void insertDonation(DonationBoardVO donationBoardVO) {
            sqlSession.insert("donationMapper.regDonationItem", donationBoardVO);
            
        }


    @Override
    public List<DonationBoardVO> donationSearch(DonationBoardVO donationboardVO) {
        return sqlSession.selectList("donationMapper.selectDonationData",donationboardVO);
    
    }


    }
    
