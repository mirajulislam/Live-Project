package com.naztech.lms.service;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.naztech.lms.constants.Str;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.utils.NConfigUtils;
/**
 * @author Mirajul.islam
 */
@Service
public class MultipleFileAttachmentService {
	private static Logger log = LogManager.getLogger(MultipleFileAttachmentService.class);
	private static final String STR_DBL_BACK_SLASH = "\\\\";
	private static final String STR_BACK_SLASH = "\\";
	private static List<String> fileNameList = new ArrayList<String>();
	private static final int IMAGE_WIDTH = 900;
	
	public String anyFileLocation(String id, String objectType) {
		String destination;
		try {
			NConfiguration config = NConfigUtils.getConfig(objectType, Str.STR_DOCUMENT.toString(), Str.STR_BASE_PATH.toString());

			String dest = config.getValue1();
			int len = dest.length();

			StringBuilder sb = new StringBuilder(dest);

			if (dest.substring(len - 2, len).equals(STR_DBL_BACK_SLASH)) {
				sb.append(id).append(File.separator);
			}
			else if (dest.substring(len - 1, len).equals(STR_BACK_SLASH)) {
				sb.append(id).append(File.separator).append(id).append(File.separator);
			}
			else {
				sb.append(File.separator).append(id).append(File.separator);
			}

			destination = sb.toString();
		}
		catch (Exception e) {
			log.error("Exception file Location [{}]", e);
			throw e;
		}
		log.info("Any File Object Name File Location Method: [{}]",objectType);
		return destination;	
	}
	
	public String checkFileDoc(String dest, String fileName, MultipartFile file,String objectType) {
		String fullFileName = null;
		log.info("Any File Object Name Check File Doc Method: [{}]",objectType);
		log.info("Any File check for save multiple Attachment");
		List<String> fileNameList = new ArrayList<String>();
		int count = 0;
		try {			
		File folder = new File(dest);
		if(isFilePathCheck(dest)) {
			fileNameList = listFilesNameFormFolder(folder);
		} 
		boolean isFilePresent = false;
		if(fileNameList.size()>0) {
			for(String folderFileName : fileNameList) {
				isFilePresent = isMultipleFileCheck(folderFileName,fileName);
				if(isFilePresent) {
					count++;
				}
			}
		}		
		//	ThisClass.classlist.clear();	
		if(fileNameList.size()>0) {
			MultipleFileAttachmentService.fileNameList.clear();
		}		
		} catch (Exception e) {
			log.error("Exception when file Check [{}]", e);
			e.printStackTrace();
		}
		if(count>0) {		
			fullFileName = builtNewFileName(fileName, count ,FilenameUtils.getExtension(file.getOriginalFilename()));
		}else {
			fullFileName = builtFileName(fileName, FilenameUtils.getExtension(file.getOriginalFilename()));
		}
		return fullFileName;	
	}
	
	public String checkFileDoc1(String dest, String fileName,String objectType) {
		String fullFileName = null;
		log.info("Any File Object Name Check File Doc Method: [{}]",objectType);
		log.info("Any File check for save multiple Attachment");
		List<String> fileNameList = new ArrayList<String>();
		int count = 0;
		try {			
		File folder = new File(dest);
		if(isFilePathCheck(dest)) {
			fileNameList = listFilesNameFormFolder(folder);
		} 
		boolean isFilePresent = false;
		if(fileNameList.size()>0) {
			for(String folderFileName : fileNameList) {
				isFilePresent = isMultipleFileCheck(folderFileName,fileName);
				if(isFilePresent) {
					count++;
				}
			}
		}		
		//	ThisClass.classlist.clear();	
		if(fileNameList.size()>0) {
			MultipleFileAttachmentService.fileNameList.clear();
		}		
		} catch (Exception e) {
			log.error("Exception when file Check [{}]", e);
			e.printStackTrace();
		}
		if(count>0) {		
			fullFileName = builtNewFileName(fileName, count ,"pdf");
		}else {
			fullFileName = builtFileName(fileName, "pdf");
		}
		return fullFileName;	
	}

	public  List<String> listFilesNameFormFolder(final File folder) {
	    for (final File fileEntry : folder.listFiles()) {
	        if (fileEntry.isDirectory()) {
	        	listFilesNameFormFolder(fileEntry);
	        } else {
	        	fileNameList.add(fileEntry.getName());
	        }
	    }
	    return fileNameList;
	}
	
	private boolean isMultipleFileCheck(String folderFileName,String checkFileName) {
		String splitFileName = folderFileName.split("\\.")[0];
		log.info("File name check , File name : [{}]",splitFileName);
		if(splitFileName.contains(checkFileName)) {
			return true;
		}
		return false;
	}
	
	private String builtFileName(String docType, String fileExt) {
		return docType + Str.STR_DOT.toString() + fileExt;
	}
	
	private String builtNewFileName(String docType, int count, String fileExt) {
		return docType + count+ Str.STR_DOT.toString() + fileExt;
	}
	
	private boolean isFilePathCheck(String dir) {
		 Path path = Paths.get(dir);
		 if (!Files.exists(path)) {
			 log.info("Directory not exists");
			 return false;			
	     } else {	    	
	     	log.info("Directory exists");
	     	 return true;
	     }		
	}	
	
	public String saveFile(MultipartFile multipartFile, String fileName, String id,String objectType) throws Exception{
		String destination;
		try {
			NConfiguration config = NConfigUtils.getConfig(objectType, Str.STR_DOCUMENT.toString(), Str.STR_BASE_PATH.toString());

			String dest = config.getValue1();
			int len = dest.length();

			StringBuilder sb = new StringBuilder(dest);

			if (dest.substring(len - 2, len).equals(STR_DBL_BACK_SLASH)) {
				sb.append(id).append(File.separator);
			}
			else if (dest.substring(len - 1, len).equals(STR_BACK_SLASH)) {
				sb.append(id).append(File.separator).append(id).append(File.separator);
			}
			else {
				sb.append(File.separator).append(id).append(File.separator);
			}

			destination = sb.toString();

			File dir = new File(destination);
			if (!dir.exists()) dir.mkdirs();

			sb.append(fileName);

			File destFile = new File(sb.toString());

			log.debug("Saving document to [{}]", destFile.getAbsoluteFile());

			// Write bytes from the multipart file to disk.
			FileUtils.writeByteArrayToFile(destFile, multipartFile.getBytes());

			if (doResizeImage(sb.toString(), FilenameUtils.getExtension(multipartFile.getOriginalFilename()))) {
				log.info("Successfully Resized the Image.");
			}
			else {
				log.info("Image Resizing unsuccessfull.");
			}
		}
		catch (Exception e) {
			log.error("Exception saving card document file [{}]", e);
			throw e;
		}

		return destination;
	}
	
	private boolean doResizeImage(String imagePath, String fileExt) {
		try {
			File inputFile = new File(imagePath);
			BufferedImage inputImage = ImageIO.read(inputFile);
			double percent = (double) IMAGE_WIDTH / (double) inputImage.getWidth();
			int scaledWidth = (int) (inputImage.getWidth() * percent);
			int scaledHeight = (int) (inputImage.getHeight() * percent);

			if (inputImage.getWidth() > IMAGE_WIDTH) {
				BufferedImage resizedImage = resizeImage(inputImage, scaledWidth, scaledHeight);
				if (resizedImage == null) {
					return false;
				}
				ImageIO.write(resizedImage, fileExt, new File(imagePath));
			}
			return true;
		}
		catch (Exception e) {
			log.debug("Error reading image to resize [{}]", e);
			return false;
		}

	}
	
	BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) throws Exception {
		try {
			Image resultingImage = originalImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_DEFAULT);
			BufferedImage outputImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
			outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
			return outputImage;
		}
		catch (Exception e) {
			log.error("Error resizing image [{}]", e);
			return null;
		}
	}
	
}
