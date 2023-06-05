package com.study.test.donation;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.Resource;

@RequestMapping("/donationlogic")
@Controller
public class DonationController {

    @Resource(name = "donationService")
    private DonationService donationService;

    @RequestMapping(value = "/donationFetch", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> donationFetch(@RequestParam("donationCode") String donationCode,
            @RequestParam("donationName") String donationName,
            @RequestParam("donationPrice") int donationPrice,
            @RequestParam("donationIntro") String donationIntro,
            @RequestParam("image") MultipartFile image) {
        try {
            DonationBoardVO donationBoardVO = new DonationBoardVO();
            donationBoardVO.setDonationCode(donationCode);
            donationBoardVO.setDonationName(donationName);
            donationBoardVO.setDonationPrice(donationPrice);
            donationBoardVO.setDonationIntro(donationIntro);

            // 이미지 처리 로직
            byte[] imageData = image.getBytes();
            donationBoardVO.setImageData(imageData);

            // 상품 입력 로직
            donationService.insertDonation(donationBoardVO);

            return ResponseEntity.ok().body("{\"message\": \"데이터 저장 성공\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("데이터 저장 실패");
        }
    }

    @RequestMapping(value = "/donationList", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<DonationBoardVO>> getDonationList() {
        try {
            List<DonationBoardVO> donationList = donationService.donationSearch(new DonationBoardVO());

            return ResponseEntity.ok().body(donationList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
