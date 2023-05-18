package com.study.test.util;

import java.io.File;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.study.test.member.vo.MemImgVO;
import com.study.test.professor.vo.LecturePdfVO;

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
    
    //강의 자료 파일 업로드 메소드
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
}

