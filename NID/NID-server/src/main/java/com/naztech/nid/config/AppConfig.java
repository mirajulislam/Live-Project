package com.naztech.nid.config;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

import com.nazdaqTechnologies.core.message.processor.json.gson.GsonJsonMessageProcessor;
import com.nazdaqTechnologies.core.service.ServiceMap;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.model.NidRequest;
import com.naztech.nid.service.NationalIdService;
import com.naztech.nid.service.NidRequestService;
import com.naztech.nid.service.ServiceCoordinator;

/**
 * @author md.kamruzzaman
 */
@Import({ DbConfig.class })
@Configuration
@PropertySource("classpath:scraper.properties")
@PropertySource("classpath:application.properties")
public class AppConfig {

	@Autowired
	DbConfig dbConfig;

	@Autowired
	JdbcService jdbcService;

	@Bean
	ServiceMap serviceMap() {
		ServiceMap ob = new ServiceMap();
		ob.addService(nationalIdService(jdbcService));
		ob.addService(nidRequestService(jdbcService));
		return ob;
	}

	@Bean
	GsonJsonMessageProcessor gsonJsonMessageProcessor() {
		GsonJsonMessageProcessor gsn = new GsonJsonMessageProcessor();
		Map<String, String> classMap = new LinkedHashMap<>();
		classMap.put(NationalId.class.getSimpleName(), NationalId.class.getName());
		classMap.put(NidRequest.class.getSimpleName(), NidRequest.class.getName());
		gsn.setClassMap(classMap);
		return gsn;
	}

	@Bean
	ServiceCoordinator serviceCoordinator() {
		ServiceCoordinator sc = new ServiceCoordinator();
		sc.setServiceMap(serviceMap());
		return sc;
	}

	@Bean(value = "nationalIdService", initMethod = "init")
	NationalIdService nationalIdService(JdbcService jdbcService) {
		NationalIdService nationalIdService = new NationalIdService();

		nationalIdService.setJdbcService(jdbcService);

		return nationalIdService;
	}

	@Bean
	NidRequestService nidRequestService(JdbcService jdbcService) {
		NidRequestService service = new NidRequestService();

		service.setJdbcService(jdbcService);

		return service;
	}

}
