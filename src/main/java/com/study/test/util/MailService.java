package com.study.test.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MailVO;



@Service("mailService")
public class MailService {
	@Autowired
	private JavaMailSender javaMailSender;
	
	
	// 단순 문자 메일 보내기
		public void sendSimpleEmail(MailVO mailVO) {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setSubject(mailVO.getTitle());
					
			message.setText(mailVO.getContent());

			// 여려명 보내기
			message.setTo(mailVO.getRecipientList().toArray(new String[mailVO.getRecipientList().size()]));

			javaMailSender.send(message);

		}
		
		
		// 6자리의 랜덤 비밀번호 생성
		public String createRandomPw() {
	        String[] charSet = new String[]{ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
	                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
			        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
			        "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"};
	        String imsiPw = "";
	        
	        for(int i = 0 ; i < 6 ; i++) {
	            int randIndex = (int)(Math.random() * charSet.length);
	            imsiPw += charSet[randIndex];
	        }
	        return imsiPw;
		}
		
		
	
}
