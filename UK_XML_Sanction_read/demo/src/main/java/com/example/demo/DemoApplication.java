package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		
		ReadXmlSanction xreader=new ReadXmlSanction();
		//XmlReader xreader=new XmlReader();
		xreader.readXml();
		
	}

}
