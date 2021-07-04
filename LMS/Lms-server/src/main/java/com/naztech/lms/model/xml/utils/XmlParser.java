package com.naztech.lms.model.xml.utils;

import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.naztech.lms.model.xml.res.FIXML;
import com.naztech.lms.model.xml.res.IOFFICEGET;

public class XmlParser {
	private static Logger log = LogManager.getLogger(XmlParser.class);

	public static com.naztech.lms.model.xml.res.FIXML parseToObject(String xml) throws Exception {
		log.info("Parsing finacle response");
		com.naztech.lms.model.xml.res.FIXML fixml = null;
		JAXBContext jaxbContext;
		jaxbContext = JAXBContext.newInstance(com.naztech.lms.model.xml.res.FIXML.class);

		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		fixml = (com.naztech.lms.model.xml.res.FIXML) jaxbUnmarshaller.unmarshal(new StringReader(xml));
		log.info("Finish parsing finacle response [{}]\n", getCustId(fixml));

		return fixml;

	}

	public static com.naztech.lms.model.xml.res.IOFFICEGET parseToIOfficeObject(String xml) throws Exception {
		log.info("Parsing iOffice response");
		com.naztech.lms.model.xml.res.IOFFICEGET ioxml = null;
		JAXBContext jaxbContext;
		jaxbContext = JAXBContext.newInstance(com.naztech.lms.model.xml.res.IOFFICEGET.class);

		Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

		ioxml = (com.naztech.lms.model.xml.res.IOFFICEGET) jaxbUnmarshaller.unmarshal(new StringReader(xml));
		log.info("Finish parsing finacle response [{}]\n", getCustIdFromIOffice(ioxml));

		return ioxml;

	}

	public static String parseToXml(com.naztech.lms.model.xml.req.ReqFIXML fixml) throws Exception {
		String xmlString = "";
		JAXBContext context = JAXBContext.newInstance(com.naztech.lms.model.xml.req.ReqFIXML.class);
		Marshaller m = context.createMarshaller();

		m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE); // To format XML

		StringWriter sw = new StringWriter();
		m.marshal(fixml, sw);
		xmlString = sw.toString();

		return xmlString;
	}

	public static String parseToXml(com.naztech.lms.model.xml.res.FIXML fixml) throws Exception {
		String xmlString = "";
		JAXBContext context = JAXBContext.newInstance(com.naztech.lms.model.xml.res.FIXML.class);
		Marshaller m = context.createMarshaller();

		m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE); // To format XML

		StringWriter sw = new StringWriter();
		m.marshal(fixml, sw);
		xmlString = sw.toString();

		return xmlString;
	}

	public static String getCustId(FIXML fixml) {

		if (fixml == null || fixml.getBody() == null || fixml.getBody().getRetCustInqResponse() == null
		        || fixml.getBody().getRetCustInqResponse().getRetCustInqRs() == null
		        || fixml.getBody().getRetCustInqResponse().getRetCustInqRs().getRetCustDtls() == null)
		    return null;
		return fixml.getBody().getRetCustInqResponse().getRetCustInqRs().getRetCustDtls().getCustId();

	}

	private static String getCustIdFromIOffice(IOFFICEGET ioxml) {

		if (ioxml == null || ioxml.getId() == null) {
			return null;
		}

		return ioxml.getId();
	}
}
