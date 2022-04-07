package com.naztech.nid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class NidScraperApplication extends SpringBootServletInitializer {
	private static Logger log = LoggerFactory.getLogger(NidScraperApplication.class);

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(NidScraperApplication.class);
	}

	public static void main(String[] args) {
		log.info("Initializing project");
		SpringApplication.run(NidScraperApplication.class, args);
	}

}
