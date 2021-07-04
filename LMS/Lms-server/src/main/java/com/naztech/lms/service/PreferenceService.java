package com.naztech.lms.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.IPrefConstants;
import com.naztech.lms.model.Preference;

/**
 * @author md.kamruzzaman
 */
public final class PreferenceService extends AbstractService<Preference> implements IPrefConstants {
	private static Logger log = LogManager.getLogger(PreferenceService.class);

	public static List<Preference> PREFERENCE_LIST = new LinkedList<Preference>();
	public static Map<String, Map<String, String>> PREFERENCE_MAP = new LinkedHashMap<String, Map<String, String>>();

	public static boolean IS_LOGIN_AUTHENTICATE_VIA_EMAIL = false;
	public static boolean IS_LOGIN_AUTHENTICATE_VIA_SMS = false;
	public static boolean IS_TWO_FACTOR_LOGIN = false;

	public void init() throws Exception {
		try {
			PREFERENCE_LIST = selectPreference();

			log.info("Total Pref Count [{}]", PREFERENCE_LIST.size());

			for (Preference pref : PREFERENCE_LIST) {

				if (PREFERENCE_MAP.containsKey(pref.getPrefGroup())) {
					PREFERENCE_MAP.get(pref.getPrefGroup()).put(pref.getPrefName(), pref.getPrefValue());
				}
				else {
					Map<String, String> map = new HashMap<String, String>();
					map.put(pref.getPrefName(), pref.getPrefValue());
					PREFERENCE_MAP.put(pref.getPrefGroup(), map);
				}
			}
			if (PREFERENCE_MAP.containsKey(MAP_GROUP_NAME_KEY_LOGIN_PREF)) {

				Map<String, String> loginMap = PREFERENCE_MAP.get(MAP_GROUP_NAME_KEY_LOGIN_PREF);

				if (loginMap.containsKey(MAP_VALUE_NAME_KEY_IS_TWO_FACTOR_LOGIN)) {
					IS_TWO_FACTOR_LOGIN = Integer.parseInt(loginMap.get(MAP_VALUE_NAME_KEY_IS_TWO_FACTOR_LOGIN)) == 1;
				}

				if (loginMap.containsKey(MAP_VALUE_NAME_KEY_IS_LOGIN_AUTHENTICATE_VIA_EMAIL)) {
					IS_LOGIN_AUTHENTICATE_VIA_EMAIL = Integer.parseInt(loginMap.get(MAP_VALUE_NAME_KEY_IS_LOGIN_AUTHENTICATE_VIA_EMAIL)) == 1;
				}

				if (loginMap.containsKey(MAP_VALUE_NAME_KEY_IS_LOGIN_AUTHENTICATE_VIA_SMS)) {
					IS_LOGIN_AUTHENTICATE_VIA_SMS = Integer.parseInt(loginMap.get(MAP_VALUE_NAME_KEY_IS_LOGIN_AUTHENTICATE_VIA_SMS)) == 1;
				}
			}
		}
		catch (SQLException sqlEx) {
			log.error("error {}, \nMessage *** : {}", sqlEx, sqlEx.getLocalizedMessage());
			throw sqlEx;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

	}

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {
			msgHeader = msg.getHeader();
			String action = msgHeader.getActionType();
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT.toString())) {
				List<Preference> preference = selectPreference();
				msgResponse = MessageBuilder.withPayload(preference).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.NEW.toString()) || action.equals(ActionType.UPDATE.toString())
			        || action.equals(ActionType.DELETE.toString())) {
				List<Preference> preference = insertUpdateDeletePreference(msg, action);
				msgResponse = MessageBuilder.withPayload(preference).copyHeadersIfAbsent(msgHeader).build();
			}
			else {
				throw new Exception("Unknow action " + action);
			}
			init();
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}

	public List<Preference> selectPreference() throws Exception {

		List<Preference> preferenceList = new LinkedList<Preference>();
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SEL_PREFERENCE);
		JdbcResult jdbcResult = new JdbcResult();
		jdbcResult.addFilteredRsType(RS_TYPE_PREFERENCE);
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
		try {
			jdbcResult = getJdbcService().executeSP(null, null, SEL_PREFERENCE, spArgsMap, jdbcResult);
			preferenceList = JdbcUtils.mapRows(Preference.class, Preference.getRs2BeanMap(), jdbcResult.getRsTypeMap(RS_TYPE_PREFERENCE));

		}
		catch (SQLException sqlEx) {
			log.error("error {}, \nMessage *** : {}", sqlEx, sqlEx.getLocalizedMessage());
			throw sqlEx;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return preferenceList;
	}

	public List<Preference> insertUpdateDeletePreference(Message<List<Preference>> msg, String action) throws Exception {

		List<Preference> preferenceList = new LinkedList<Preference>();
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

		Preference preference = msg.getPayload().get(0);

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(ACT_PREFERENCE);
		JdbcResult jdbcResult = new JdbcResult();
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
		try {
			spArgsMap = JdbcUtils.createSqlMap(preference, Preference.getSql2BeanMap());
			jdbcResult = getJdbcService().executeSP(action, null, ACT_PREFERENCE, spArgsMap, jdbcResult);
			preferenceList = selectPreference();
		}
		catch (SQLException sqlEx) {
			log.error("error {}, \nMessage *** : {}", sqlEx, sqlEx.getLocalizedMessage());
			throw sqlEx;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return preferenceList;
	}

	public boolean doRefreshPreference() {
		try {
			init();
			return true;
		}
		catch (Exception e) {
			log.error("Exception Refreshing Preference [{}]", e);
			return false;
		}
	}
}
