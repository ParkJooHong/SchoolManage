package com.study.test.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.UUID;

import javax.sound.midi.Soundbank;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.study.test.member.vo.MemImgVO;
import com.study.test.professor.vo.LecturePdfVO;
import com.study.test.professor.vo.LectureVO;

import jakarta.servlet.http.HttpServletResponse;


public class UploadUtil {
	
	// 단일 파일 업로드 메소드
	public static MemImgVO uploadFile(MultipartFile img) {
		MemImgVO imgVO = null;
		if (img != null && !img.isEmpty()) {
			imgVO = new MemImgVO();

			String originFileName = img.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String attachedFileName = uuid + extension;
			try {
				File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
				img.transferTo(file);
				imgVO.setOriginFileName(originFileName);
				imgVO.setAttachedFileName(attachedFileName);
				imgVO.setIsMain("Y");

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return imgVO;
	}

	// 강의 자료 파일 업로드 메소드
	public static LecturePdfVO uploadPdfFile(MultipartFile pdfFile) {
		LecturePdfVO lecturePdfVO = null;
		if (pdfFile != null && !pdfFile.isEmpty()) {
			lecturePdfVO = new LecturePdfVO();

			String originFileName = pdfFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String attachedFileName = uuid + extension;

			try {
				File file = new File(ConstVariable.PROFESSOR_UPLOAD_PATH + attachedFileName);
				pdfFile.transferTo(file);
				lecturePdfVO.setOriginPdfName(originFileName);
				lecturePdfVO.setAttachedPdfName(attachedFileName);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return lecturePdfVO;
	}

	// 강의 자료 파일 다운로드 메소드
	public static void downloadPdfFile(LectureVO lectureVO, HttpServletResponse response) {
		
		//원래 파일명(한글로된)
		String originFileName = lectureVO.getLecturePdfVO().getOriginPdfName();
		//첨부된 파일명(생성된 파일명)
		String attachedFileName = lectureVO.getLecturePdfVO().getAttachedPdfName();
		
		File file = new File(ConstVariable.PROFESSOR_UPLOAD_PATH + attachedFileName);
		boolean canRead = file.canRead();
		System.out.println("읽기 권한: " + canRead);
		
		if (file.exists()) {
			try (FileInputStream fis = new FileInputStream(file);
					OutputStream out = response.getOutputStream()) {
				
				//원본 파일명 인코딩
				String encodeFileName = URLEncoder.encode(originFileName, "UTF-8");
				// 응답이 파일 타입이라는 것을 명시
				response.addHeader("Content-Disposition", "attachment;filename=\"" + encodeFileName + "\";");
				response.setHeader("Content-Transfer-Encoding", "binary");
				response.setContentType("application/octet-stream");
				response.setHeader("Pragma", "no-cache;");
				response.setHeader("Expires", "-1;");
				int readCount = 0;
				byte[] buffer = new byte[1024];
				while((readCount = fis.read(buffer)) != -1){
					out.write(buffer,0,readCount);
				}

			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
