package com.naztech.lms.config;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.nazdaqTechnologies.core.message.processor.json.gson.GsonJsonMessageProcessor;
import com.nazdaqTechnologies.core.service.ServiceMap;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.naztech.lms.model.CibInformation;
import com.naztech.lms.model.Comment;
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.ExistingLiability;
import com.naztech.lms.model.LegalEntity;
import com.naztech.lms.model.LmsDashboard;
import com.naztech.lms.model.LmsSms;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanConfig;
import com.naztech.lms.model.LoanDocMap;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.model.NidInformation;
import com.naztech.lms.model.Notes;
import com.naztech.lms.model.Preference;
import com.naztech.lms.model.Report;
import com.naztech.lms.model.User;
import com.naztech.lms.service.CibInformationService;
import com.naztech.lms.service.CommentService;
import com.naztech.lms.service.CustomerService;
import com.naztech.lms.service.ExistingLiabilityService;
import com.naztech.lms.service.FinacleService;
import com.naztech.lms.service.LegalEntityService;
import com.naztech.lms.service.LmsDashboardService;
import com.naztech.lms.service.LmsSmsService;
import com.naztech.lms.service.LoanConfigService;
import com.naztech.lms.service.LoanDocMapService;
import com.naztech.lms.service.LoanDocumentService;
import com.naztech.lms.service.LoanService;
import com.naztech.lms.service.NConfigurationService;
import com.naztech.lms.service.NidInformationService;
import com.naztech.lms.service.NotesService;
import com.naztech.lms.service.PreferenceService;
import com.naztech.lms.service.ReportService;
import com.naztech.lms.service.ServiceCoordinator;
import com.naztech.lms.service.UserService;
import com.naztech.lms.service.XmlBeanService;

/**
 * @author md.kamruzzaman
 */

@Import({ DbConfig.class })
@Configuration
@PropertySource("classpath:app.properties")
@PropertySource("classpath:application.properties")
@ImportResource({ "classpath:spring-beans.xml" })
public class AppConfig {

	@Autowired
	JdbcService jdbcService;
	@Autowired
	XmlBeanService xmlBeanService;

	@Bean
	ServiceMap serviceMap() {
		ServiceMap ob = new ServiceMap();
		ob.addService(loanService());
		ob.addService(loanConfigService());
		ob.addService(preferenceService());
		ob.addService(customerService());
		ob.addService(configurationService());
		ob.addService(commentService());
		ob.addService(existingLiabilityService());
		ob.addService(loanDocMapService());
		ob.addService(loanDocumentService());
		ob.addService(legalEntityService());
		ob.addService(userService());
		ob.addService(reportService());
		ob.addService(lmsDashboardService());
		ob.addService(nidInformationService());
		ob.addService(cibInformationService());
		ob.addService(notesService());
		ob.addService(lmsSmsService());
		return ob;
	}

	@Bean
	GsonJsonMessageProcessor gsonJsonMessageProcessor() {
		GsonJsonMessageProcessor gsn = new GsonJsonMessageProcessor();
		Map<String, String> classMap = new LinkedHashMap<>();
		classMap.put(Loan.class.getSimpleName(), Loan.class.getName());
		classMap.put(LoanConfig.class.getSimpleName(), LoanConfig.class.getName());
		classMap.put(Preference.class.getSimpleName(), Preference.class.getName());
		classMap.put(Customer.class.getSimpleName(), Customer.class.getName());
		classMap.put(NConfiguration.class.getSimpleName(), NConfiguration.class.getName());
		classMap.put(Comment.class.getSimpleName(), Comment.class.getName());
		classMap.put(ExistingLiability.class.getSimpleName(), ExistingLiability.class.getName());
		classMap.put(LoanDocMap.class.getSimpleName(), LoanDocMap.class.getName());
		classMap.put(LoanDocument.class.getSimpleName(), LoanDocument.class.getName());
		classMap.put(LegalEntity.class.getSimpleName(), LegalEntity.class.getName());
		classMap.put(User.class.getSimpleName(), User.class.getName());
		classMap.put(Report.class.getSimpleName(), Report.class.getName());
		classMap.put(LmsDashboard.class.getSimpleName(), LmsDashboard.class.getName());
		classMap.put(NidInformation.class.getSimpleName(), NidInformation.class.getName());
		classMap.put(CibInformation.class.getSimpleName(), CibInformation.class.getName());
		classMap.put(Notes.class.getSimpleName(),Notes.class.getName());
		classMap.put(LmsSms.class.getSimpleName(),LmsSms.class.getName());
		gsn.setClassMap(classMap);
		return gsn;
	}

	@Bean
	ServiceCoordinator serviceCoordinator() {
		ServiceCoordinator sc = new ServiceCoordinator();
		sc.setServiceMap(serviceMap());
		return sc;
	}

	@Bean(initMethod = "init")
	LoanService loanService() {
		LoanService loanService = new LoanService();
		loanService.setJdbcService(jdbcService);
		return loanService;
	}

	@Bean(initMethod = "init")
	LoanConfigService loanConfigService() {
		LoanConfigService loanConfigService = new LoanConfigService();
		loanConfigService.setJdbcService(jdbcService);
		return loanConfigService;
	}

	@Bean(initMethod = "init")
	PreferenceService preferenceService() {
		PreferenceService service = new PreferenceService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean(initMethod = "init")
	FinacleService finacleService() {
		FinacleService service = new FinacleService();
		return service;
	}

	@Bean
	CustomerService customerService() {
		CustomerService service = new CustomerService();
		return service;
	}

	@Bean(initMethod = "init")
	NConfigurationService configurationService() {
		NConfigurationService service = new NConfigurationService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	CommentService commentService() {
		CommentService service = new CommentService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	ExistingLiabilityService existingLiabilityService() {
		ExistingLiabilityService service = new ExistingLiabilityService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean(initMethod = "init")
	LoanDocMapService loanDocMapService() {
		LoanDocMapService service = new LoanDocMapService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	LoanDocumentService loanDocumentService() {
		LoanDocumentService service = new LoanDocumentService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	LegalEntityService legalEntityService() {
		LegalEntityService service = new LegalEntityService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	UserService userService() {
		UserService service = new UserService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	ReportService reportService() {
		ReportService service = new ReportService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean
	LmsDashboardService lmsDashboardService() {
		LmsDashboardService service = new LmsDashboardService();
		service.setJdbcService(jdbcService);
		return service;
	}

	@Bean(name = "CommonsMultipartResolver")
	public CommonsMultipartResolver commonsMultipartResolver() {
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
		multipartResolver.setMaxUploadSize(104857600);
		return multipartResolver;
	}
	
	@Bean
	NidInformationService nidInformationService() {
		NidInformationService nidInformationService = new NidInformationService();
		nidInformationService.setJdbcService(jdbcService);
		return nidInformationService;
	}
	
	@Bean
	CibInformationService cibInformationService() {
		CibInformationService cibInformationService = new CibInformationService();
		cibInformationService.setJdbcService(jdbcService);
		return cibInformationService;
	}
	
	@Bean
	NotesService notesService() {
		NotesService notesService = new NotesService();
		notesService.setJdbcService(jdbcService);
		return notesService;
	}
	
	@Bean
	LmsSmsService lmsSmsService() {
		LmsSmsService lmsSmsService = new LmsSmsService();
		lmsSmsService.setJdbcService(jdbcService);
		return lmsSmsService;
	}

}
