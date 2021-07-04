/**
 * 
 */
package com.naztech.lms.utils;

import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.naztech.lms.service.LoanService;

/**
 * @author md.kamruzzaman
 *
 */
public class DbExecutor {
	private static Logger log = LogManager.getLogger(LoanService.class);

	public static JdbcResult execute(String sp, String action, Map<String, Object> spArgsMap, JdbcService jdbcService) throws Exception {
		log.debug("Executing SP:[{}], Action:[{}]", sp, action);
		JdbcResult jdbcResult = new JdbcResult();
		try {
			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(sp);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			jdbcResult = jdbcService.executeSP(action, sp, spArgsMap, jdbcResult);
		} catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return jdbcResult;
	}
}
