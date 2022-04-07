package com.naztech.nid.config;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.JdbcStatementFactory;

/**
 * @author md.kamruzzaman
 */
public class DbConfig {

	@Value("${jdbc.url}")
	String url;

	@Value("${jdbc.username}")
	String username;

	@Value("${jdbc.password}")
	String password;

	@Value("${jdbc.driver.class}")
	private String driverClassName;

	@Value("${jdbc.max.active}")
	int maxActive;

	@Value("${jdbc.max.idle}")
	int maxIdle;

	@Value("${jdbc.auto.commit}")
	boolean defaultAutoCommit;

	@Value("${jdbc.inital.size}")
	int initialSize;

	@Value("${jdbc.validator.query}")
	String validationQuery;

	@Bean
	BasicDataSource dataSource() {
		BasicDataSource ds = new BasicDataSource();
		ds.setDriverClassName(driverClassName);
		ds.setUrl(url);
		ds.setUsername(username);
		ds.setPassword(password);
		if (maxActive != 0) {
			ds.setMaxActive(maxActive);
		}

		if (maxIdle != 0) {
			ds.setMaxIdle(maxIdle);
		}

		if (initialSize != 0) {
			ds.setInitialSize(initialSize);
		}

		ds.setDefaultAutoCommit(defaultAutoCommit);
		if (validationQuery != null && validationQuery.length() > 0) {
			ds.setValidationQuery(validationQuery);
			ds.setTestOnBorrow(true);
		}

		return ds;
	}

	@Bean
	JdbcService jdbcService() {
		JdbcService jdbcService = new JdbcService();
		jdbcService.setDataSource(dataSource());
		jdbcService.setTransactionManager(dataSourceTransactionManager());
		jdbcService.setJdbcStatementFactory(jdbcStatementFactory());
		return jdbcService;
	}

	@Bean
	DataSourceTransactionManager dataSourceTransactionManager() {
		DataSourceTransactionManager obj = new DataSourceTransactionManager();
		obj.setDataSource(dataSource());
		return obj;
	}

	@Bean
	JdbcStatementFactory jdbcStatementFactory() {
		return new JdbcStatementFactory();
	}

}
