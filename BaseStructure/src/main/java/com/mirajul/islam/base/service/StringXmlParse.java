package com.mirajul.islam.base.service;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.w3c.dom.CharacterData;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
@Service
public class StringXmlParse {
	private static Logger log = LogManager.getLogger(StringXmlParse.class);
	
	public String readXml(String reqStr) {
		
		String custId = null;
		
		try {
			
			log.info("StringXmlParse Service Class: " );
			
			DocumentBuilder db = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		    InputSource is = new InputSource();
		    is.setCharacterStream(new StringReader(reqStr));
		    
		    Document doc = db.parse(is);
		    NodeList nodes = doc.getElementsByTagName("CUSTOMERLIST");
		    for (int i = 0; i < nodes.getLength(); i++) {
		        Element element = (Element) nodes.item(i);
		        NodeList name = element.getElementsByTagName("CIFID");
		        Element line = (Element) name.item(0);
		        log.info("Finacal Api Phone number request to respoce wise CIFID [{}]: ",getCharacterDataFromElement(line));
		        custId  = getCharacterDataFromElement(line);
		    }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return custId;		
	}
	
	private String getCharacterDataFromElement(Element e) {
	    Node child = e.getFirstChild();
	    if (child instanceof CharacterData) {
	      CharacterData cd = (CharacterData) child;
	      return cd.getData();
	    }
	    return "";
	  }

}
