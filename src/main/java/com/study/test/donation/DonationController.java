package com.study.test.donation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.study.test.util.UploadUtil;

import ch.qos.logback.core.model.Model;
import jakarta.annotation.Resource;

@RequestMapping("/donation")
@Controller
public class DonationController {

	@Resource(name = "donationService")
	private DonationService donationService;

	// 중고물품 등록
	@PostMapping("/regDonation")
	public String donationInsert(DonationBoardVO donationBoardVO,
			MultipartFile mainImg) {

		// UploadUtill 객체 호출해서(util패키지에 만들어놓음)
		// DonationBoardImageVO객체를 attachedImgVO 변수에
		// 할당한 후 에 이후 attachedImgVO 객체를 활용하여 필요한 작업 수행

		// DoatnionBoardImageVO 객체에서 아예 받아버림

		DonationBoardImageVO attachedImgVO = UploadUtil.uploadDonationFile(mainImg);

		attachedImgVO.setDonationCode(donationBoardVO.getDonationCode());
		// 다음에 들어갈 img코드 호출해서 세팅하는 메소드
		attachedImgVO.setImgCode(donationService.getNextDonationImgCode());

		// donationBoard VO에 있는 DonationImage에 attachedimgVO
		// 즉 위에서 만든 attachedImgVO = 자체가
		donationBoardVO.setDonationImage(attachedImgVO.getImgCode());

		// memberVO안에있는 memImgVO에 UploadUtill로 불러온 데이터 넣음
		// 트랜 잭션 처리 때문에
		donationBoardVO.setDonationBoardImageVO(attachedImgVO);

		donationService.insertDonation(donationBoardVO);

		return "redirect:/stuMenu/donation";

	}

}
