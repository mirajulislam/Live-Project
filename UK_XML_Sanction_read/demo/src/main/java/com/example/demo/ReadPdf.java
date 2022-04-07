package com.example.demo;

import java.io.IOException;
import java.util.logging.Logger;

import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.parser.PdfTextExtractor;

public class ReadPdf {

	private static Logger logger = Logger.getLogger(ReadPdf.class.getName());

	private static final String FILE_NAME = "C:\\tmp\\itext.pdf";

	public void read() {

		PdfReader reader;

		try {

			reader = new PdfReader(FILE_NAME);

			String textFromPage = PdfTextExtractor.getTextFromPage(reader, 1);

			logger.info("\nPdf Reader :" + textFromPage);

			reader.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
