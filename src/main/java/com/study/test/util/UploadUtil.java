package com.study.test.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import com.study.test.member.vo.MemImgVO;
import com.study.test.professor.vo.LecturePdfVO;

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
	public static void downloadPdfFile(String attachedFileName, HttpServletResponse response) {
		File file = new File(ConstVariable.PROFESSOR_UPLOAD_PATH + attachedFileName);
		if (file.exists()) {
			try (FileInputStream fis = new FileInputStream(file);
					BufferedInputStream bis = new BufferedInputStream(fis);
					OutputStream out = response.getOutputStream()) {
				// 응답이 파일 타입이라는 것을 명시
				response.addHeader("Content-Disposition", "attachment;filename=\"" + file + "\"");
				// 응답 크기 명시
				response.setContentLength((int) file.length());

				int read = 0;

				// 실제 데이터 전송
				// OutputStream 의 Deafult 버퍼 사이즈는 8192 Byte
				// 이 루프를 8000 번 정도 돌때마다 약 8KB 정도의 데이터가 전송
				while ((read = bis.read()) != -1) {
					out.write(read);
				}

			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
