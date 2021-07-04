/**
 * 
 */
package com.naztech.lms.service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.google.gson.Gson;
import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.constants.Str;
import com.naztech.lms.model.NidInformation;
import com.naztech.lms.utils.RequestSender;

/**
 * @author mirajul.islam
 */
public class NidInformationService extends AbstractService<NidInformation> {
	private static Logger log = LoggerFactory.getLogger(NidInformationService.class);

	@Autowired
	JdbcService jdbcService;

	@Value("${nid.api.url}")
	public String url;

	@Value("${nid.image.saveLocation}")
	public String saveLocation;

	@Value("${nid.image.showLocation}")
	public String showLocation;

	InputStream inputStream = null;
	OutputStream outputStream = null;

	static Gson gson;

	static {
		gson = new Gson();
	}

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();
			Integer userModKeyValue = msgHeader.getUserId();
			//String apiNidNumber = msgHeader.
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SEARCH_NID_DETAILS_FORM_API.toString())
			        || action.equals(ActionType.SEARCH_NID_DETAILS_FOR_COMPARE.toString())) {
				NidInformation nidInformation = null;

				nidInformation = doHandleSelectCustomerNidInformation(msg, action);
				if (nidInformation.getNid() == null) {
					//api call
					if (nidInformation.getUserModKey() == null) {
						nidInformation.setUserModKey(userModKeyValue);
					}
					nidInformation = handleSaveNidDetails(msg, action);
				}
				msgResponse = MessageBuilder.withPayload(nidInformation).copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.SEARCH_FOR_CUSTOMER_NID_DETAILS.toString())) {
				NidInformation nidInformation = null;
				nidInformation = doHandleSelectCustomerNidInformation(msg, action);
				msgResponse = MessageBuilder.withPayload(nidInformation).copyHeadersIfAbsent(msgHeader).build();
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 * @throws Exception
	 */
	private NidInformation handleSaveNidDetails(Message<List<NidInformation>> msg, String action) throws Exception {
		List<NidInformation> nidInfoList = msg.getPayload();
		if (nidInfoList == null || nidInfoList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			return selectFormApi(nidInfoList.get(0));
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	public NidInformation selectFormApi(NidInformation nidInformation) throws Exception {
		try {
			String data = sendRequestNidApi(nidInformation);
			NidInformation nidInformation2;
			if (RequestSender.isJson(data)) {
				nidInformation2 = gson.fromJson(data, NidInformation.class);
				nidInformation2.setUserModKey(nidInformation.getUserModKey());				
				String comments = nidInformation2.getComments();
				String nidPin = nidInformation2.getNidPin();
				String personImagePath = nidInformation2.getPersonImagePublicPath();
				String nidImagePath = nidInformation2.getNidImagePublicPath();
				if (isEmptyString(comments)) {
					if (!isEmptyString(nidPin) && !isEmptyString(personImagePath) && !isEmptyString(nidImagePath)) {
						nidInformation2 = savePersonImage(nidInformation2);
						nidInformation2 = saveNidImage(nidInformation2);
						doHandleSaveNidDetails(nidInformation2, ActionType.NEW.toString());
					}
					else {
						nidInformation.setResponseCode(400);
						return nidInformation;
					}
				}
			}else {
				nidInformation.setResponseMessage(data);
				return nidInformation;
			}
			
			return nidInformation2;
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	/**
	 * @param nidInformation
	 */
	private NidInformation saveNidImage(NidInformation nidInformation) {
		String nidImageName = null;
		String nidImagePublicUrl = nidInformation.getNidImagePublicPath();
		nidImageName = nidInformation.getNid() + "nidImage.jpg";
		nidInformation.setNidImageName(nidImageName);
		nidInformation.setNidImagePath(showLocation + nidImageName);
		nidInformation.setNidImagePublicPath(showLocation + nidImageName);
		try {
			URL url = new URL(nidImagePublicUrl);
			inputStream = url.openStream();
			outputStream = new FileOutputStream(saveLocation + nidImageName);
			byte[] buffer = new byte[2048];
			int length;
			while ((length = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, length);
			}

		}
		catch (MalformedURLException e) {
			log.error("MalformedURLException :- " + e.getMessage());

		}
		catch (FileNotFoundException e) {
			log.error("FileNotFoundException :- " + e.getMessage());

		}
		catch (IOException e) {
			log.error("IOException :- " + e.getMessage());
		}
		finally {
			try {

				inputStream.close();
				outputStream.close();

			}
			catch (IOException e) {
				log.error("Finally IOException :- " + e.getMessage());
			}
		}
		return nidInformation;
	}

	/**
	 * @param nidInformation
	 * @return
	 */
	private NidInformation savePersonImage(NidInformation nidInformation) {
		String personImageName = null;
		String personImagePublicUrl = nidInformation.getPersonImagePublicPath();
		personImageName = nidInformation.getNid() + "personImage.jpg";
		nidInformation.setPersonImageName(personImageName);
		nidInformation.setPersonImagePath(showLocation + personImageName);
		nidInformation.setPersonImagePublicPath(showLocation + personImageName);
		try {
			URL url = new URL(personImagePublicUrl);
			inputStream = url.openStream();
			outputStream = new FileOutputStream(saveLocation + personImageName);
			byte[] buffer = new byte[4096];
			int length;
			while ((length = inputStream.read(buffer)) != -1) {
				outputStream.write(buffer, 0, length);
			}

		}
		catch (MalformedURLException e) {
			log.error("MalformedURLException :- " + e.getMessage());

		}
		catch (FileNotFoundException e) {
			log.error("FileNotFoundException :- " + e.getMessage());

		}
		catch (IOException e) {
			log.error("IOException :- " + e.getMessage());
		}
		finally {
			try {

				inputStream.close();
				outputStream.close();

			}
			catch (IOException e) {
				log.error("Finally IOException :- " + e.getMessage());
			}
		}
		return nidInformation;
	}

	/**
	 * @param nidInformation
	 * @return
	 */
	private String sendRequestNidApi(NidInformation nidInformation) throws Exception {
		return RequestSender.send4Str(url, gson.toJson(nidInformation));
	}

	/**
	 * @param nidInformation
	 * @param action
	 * @return
	 * @throws Exception
	 */
	private NidInformation doHandleSaveNidDetails(NidInformation nidInformation, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(nidInformation, NidInformation.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_NID_INFORMATION.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			jdbcResult = jdbcService.executeSP(action, SPName.ACT_NID_INFORMATION.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return nidInformation;
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 * @throws Exception
	 */
	private NidInformation doHandleSelectCustomerNidInformation(Message<List<NidInformation>> msg, String action) throws Exception {
		// TODO Auto-generated method stub
		List<NidInformation> information = msg.getPayload();
		if (information == null || information.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			List<NidInformation> infoList = selectNidInformation(information.get(0), action);
			if (infoList == null || infoList.size() == 0) return new NidInformation();
			return infoList.get(0);

		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}

	}

	/**
	 * @param nidInformation
	 * @return
	 * @throws Exception
	 */
	private List<NidInformation> selectNidInformation(NidInformation nidInformation, String action) throws Exception {
		return doSelectNidInformation(nidInformation, action);
	}

	/**
	 * @param nidInformation
	 * @param act
	 * @return
	 * @throws Exception
	 */
	private List<NidInformation> doSelectNidInformation(NidInformation nidInformation, String action) throws Exception {
		// TODO Auto-generated method stub
		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(nidInformation, NidInformation.getSql2BeanMap());
			spArgsMap.put("@dtt_dob", null);
			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_NID_INFORMATION.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			jdbcResult = jdbcService.executeSP(action, SPName.ACT_NID_INFORMATION.toString(), spArgsMap, jdbcResult);
			List<NidInformation> nidInfoList = JdbcUtils.mapRows(NidInformation.class, NidInformation.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_NID_DETAILS.toString()));
			return nidInfoList;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

	}

	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
}
