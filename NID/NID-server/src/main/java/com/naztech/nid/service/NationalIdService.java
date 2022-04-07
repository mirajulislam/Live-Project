package com.naztech.nid.service;

import java.io.File;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.message.processor.json.gson.GsonJsonMessageProcessor;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.nid.constants.ActionType;
import com.naztech.nid.constants.Constants;
import com.naztech.nid.constants.RSType;
import com.naztech.nid.constants.SPName;
import com.naztech.nid.constants.Str;
import com.naztech.nid.controller.NidController;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.model.NidRequest;
import com.naztech.nid.scraper.NidScraper;
import com.naztech.nid.utils.ScraperUtils;

/**
 * @author fahim.reza
 */

public class NationalIdService extends AbstractService<NationalIdService> {
	private static Logger log = LoggerFactory.getLogger(NationalIdService.class);

	private static final int DATASOURCE_LOCAL_CACHE = 1;
	private static final int DATASOURCE_NID_SERVER = 2;

	private static final String FORCE_REFETCH = "forceRefetch";

	private static final int SUCCESS_FLAG = 1;

	@Value("${sub.folder.nid.image}")
	private String subFolderNidImage;
	@Value("${sub.folder.person.image}")
	private String subFolderPersonImage;

	@Value("${nid.base.image.path}")
	private String basePath;

	@Value("${server.port}")
	private int serverPort;

	@Value("${nid.image.base.folder}")
	private String nidImageBaseFolder;

	@Value("${should.nid.file.resp}")
	private boolean shouldFileResponse;

	@Value("${nid.expired.time.in.days}")
	private int nidExpiredTimeInDays;

	//@Autowired
	NidScraper nidScraper;

	@Autowired
	private NidRequestService nidRequestService;

	@Autowired
	private GsonJsonMessageProcessor messageProcessor;

	static String ip;

	public void init() {
		ip = ScraperUtils.getIp();
	}

	private static final String REQUEST_TYPE_ASYNC = "ASYNC";

	private static final String MAP_KEY_REQUEST_TYPE = "requestType";
	private static final String MAP_KEY_CALL_BACK_URL = "callbackUrl";

	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;

		NationalId nid;
		List<NationalId> objList = new ArrayList<NationalId>();

		// change action name as needed
		try {
			msgHeader = msg.getHeader();

			objList = (List<NationalId>) msg.getPayload();

			nid = objList.get(0);

			String actionType = msgHeader.getActionType();

			if (actionType.equals(ActionType.SELECT.toString())) {
				objList = select(nid, actionType);
				msg = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.FETCH.toString())) {
				NationalId nationalId = handleFetch(nid, msgHeader, actionType);
				msg = MessageBuilder.withPayload(nationalId).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.SELECT_HISTORY.toString())) {
				List<NationalId> nidRequestList = handleSelectHistory(nid, actionType);
				msg = MessageBuilder.withPayload(nidRequestList).copyHeadersIfAbsent(msgHeader).build();
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
		}

		checkToSendResponseForRequestTypeAsync(msgHeader, msg);

		return msg;
	}

	@SuppressWarnings("rawtypes")
	private void checkToSendResponseForRequestTypeAsync(MessageHeader msgHeader, Message msg) {

		if (msgHeader.containsKey(MAP_KEY_REQUEST_TYPE) && msgHeader.get(MAP_KEY_REQUEST_TYPE) != null
		        && msgHeader.get(MAP_KEY_REQUEST_TYPE).equals(REQUEST_TYPE_ASYNC)) {

			log.info("This is ASYNC request and we are responsing to callBackUrl...");

			String callBackUrl = msgHeader.get(MAP_KEY_CALL_BACK_URL).toString();
			String responseBody = messageProcessor.toJson(msg);

			HttpResponse response = NidController.handleHttpPostRequest(callBackUrl, responseBody);

			try {
				if (response != null) {
					log.info("Response of ASYNC request has sent as request and response received\n[{}]", EntityUtils.toString(response.getEntity()));
				}
			}
			catch (Exception e) {
				log.error("Exception parsing response [{}]", e);
			}
		}

	}

	public NationalId saveNid(NationalId nid) throws Exception {
		return saveAndUpdate(nid, ActionType.NEW.toString());
	}

	public NationalId updateNid(NationalId nid) throws Exception {
		return saveAndUpdate(nid, ActionType.UPDATE.toString());
	}

	private NationalId handleFetch(NationalId nid, MessageHeader msgHeader, String actionType) throws Exception {
		log.info("Working on NID:DOB => [{}]", nid.getNid(), nid.getDateOfBirth());

		NidRequest nidRequest = new NidRequest();
		NationalId nidFromInsUpd = new NationalId();
		try {

			try {
				nidRequest.setRequestTime(new Date());
				nidRequest.setValidReq(1);
				nidRequest.setCallBackUrl(msgHeader.get("callbackUrl") == null ? null : msgHeader.get("callbackUrl").toString());
				nidRequest = nidRequestService.save(nidRequest);
			}
			catch (Exception e) {
				log.error("Exception saving nidRequest [{}]", e);
			}

			// SELECT
			List<NationalId> list = execute(nid, ActionType.SELECT.toString(), RSType.RS_TYPE_NID.toString());
			boolean forceRefetch = false;
			if (msgHeader.containsKey(FORCE_REFETCH)) {
				Object force = msgHeader.get(FORCE_REFETCH);
				if (force instanceof Boolean) {
					forceRefetch = (Boolean) force;
				}
				else if (force instanceof String) {
					if (!StringUtils.isEmpty(((String) force))) {
						forceRefetch = Boolean.valueOf((String) msgHeader.get(FORCE_REFETCH));
					}
				}
			}
			if (list == null || list.isEmpty()) {
				log.info("NID not found in local cache.");

				// need to scrap
				try {
					nid = nidScraper.doScrapNid(nid.getNid(), nid.getDateOfBirth());
				}
				catch (Exception e) {
					log.error("Exception Parsing NID Data [{}]", e);
					nid.setComments("Failed to access NID server.");
					nid.setSuccess(0);
				}

				nid.setNidSource(DATASOURCE_NID_SERVER);
				nid.setNidRequestId(nidRequest.getNidRequestId());

				nidFromInsUpd = saveNid(nid);
			}
			else if (forceRefetch || isUnsuccessfull(list) || isNidDataExpired(list)) {
				if (forceRefetch) {
					log.info("Force Refetching NID data.");
				}
				else if (isNidDataExpired(list)) {
					log.info("NID data is Expired.");
				}
				else {
					log.info("NID data is in Failed status.");
				}

				// need to scrap again
				try {
					nid = nidScraper.doScrapNid(nid.getNid(), nid.getDateOfBirth());
				}
				catch (Exception e) {
					log.error("Exception Parsing NID Data [{}]", e);
					nid.setComments("Failed to access NID server.");
					nid.setSuccess(0);
				}

				nid.setNidSource(DATASOURCE_NID_SERVER);
				nid.setNidRequestId(nidRequest.getNidRequestId());

				nidFromInsUpd = updateNid(nid);
			}
			else {
				log.info("Found in local cache");
				nid = list.get(0);
				try {
					nid.setNidImage(new File(ScraperUtils.buildImagePath(nid.getNid(), java.sql.Date.valueOf(nid.getDateOfBirth()), basePath,
					        subFolderNidImage, Constants.SUFFIX_NID)));
					nid.setNidPersonImage(new File(ScraperUtils.buildImagePath(nid.getNid(), java.sql.Date.valueOf(nid.getDateOfBirth()), basePath,
					        subFolderPersonImage, Constants.SUFFIX_PERSON)));
					nid.setNidSource(DATASOURCE_LOCAL_CACHE);
				}
				catch (Exception e) {
					log.error("NID found in local cache but image not found [{}]", e);
				}
			}
		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}
		if (!shouldFileResponse) {
			log.info("Building accessible image path");
			buildPublicUrl(nid);
		}

		try {

			nidRequest.setDataSource(nid.getNidSource());

			nidRequest.setSuccessReq(nid.getSuccess());
			nidRequest.setComments(nid.getComments());
			nidRequest.setResponseTime(new Date());
			nidRequest.setSuccessReq(nid.getSuccess());
			nidRequest.setIdNidKey(nidFromInsUpd.getNidId());
			nidRequestService.save(nidRequest);
		}
		catch (Exception e) {
			log.error("Exception updating nidRequest [{}]", e);
		}

		return nid;
	}

	private boolean isUnsuccessfull(List<NationalId> list) {

		if (list.get(0).getSuccess() == null || !list.get(0).getSuccess().equals(SUCCESS_FLAG)) {
			return true;
		}
		return false;
	}

	private boolean isNidDataExpired(List<NationalId> list) {

		if (list.get(0).getExtractTime() == null) {
			log.info("ExtractTime not found, returning as Expired");
			return true;
		}

		if (Math.abs(list.get(0).getExtractTime().until(LocalDateTime.now(), ChronoUnit.DAYS)) > nidExpiredTimeInDays) {
			return true;
		}

		return false;
	}

	void buildPublicUrl(NationalId nid) {
		nid.setNidImagePath(buildPath(nid.getNidImageName(), subFolderNidImage));
		nid.setPersonImagePath(buildPath(nid.getPersonImageName(), subFolderPersonImage));

		// making image location null. otherwise it will produce absulate path in response json
		nid.setNidImage(null);
		nid.setNidPersonImage(null);

	}

	String buildPath(String imageName, String subFolder) {
		StringBuilder sb = new StringBuilder();
		sb.append(Str.http).append(ip).append(Str.STR_COLON).append(serverPort).append(Str.STR_SLASH).append(nidImageBaseFolder).append(Str.STR_SLASH)
		        .append(subFolder).append(Str.STR_SLASH).append(imageName);
		log.debug("Image Path [{}]", sb.toString());
		return sb.toString();
	}

	private List<NationalId> select(NationalId obj, String actionType) throws Exception {
		return execute(obj, actionType, RSType.RS_TYPE_NID.toString());
	}

	@SuppressWarnings("unused")
	private List<NationalId> all(NationalId obj, String actionType, Message<List<Object>> msg) throws Exception {
		return execute(obj, actionType, RSType.RS_TYPE_NID.toString());
	}

	private List<NationalId> execute(NationalId obj, String action, String rsType) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<NationalId> objList = new ArrayList<NationalId>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_NID.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(action, SPName.ACT_NID.toString(), spArgsMap, jdbcResult);

			objList = JdbcUtils.mapRows(NationalId.class, NationalId.getRs2BeanMap(), jdbcResult.getRsTypeMap(rsType));

		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

		return objList;
	}

	private NationalId saveAndUpdate(NationalId obj, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_NID.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(action, SPName.ACT_NID.toString(), spArgsMap, jdbcResult);

			if (jdbcResult.getOutputParamValueMap().containsKey("@id_nid_key") && jdbcResult.getOutputParamValueMap().get("@id_nid_key") != null) {
				obj.setNidId(Integer.parseInt(jdbcResult.getOutputParamValueMap().get("@id_nid_key").toString()));
			}
			if (jdbcResult.getOutputParamValueMap().containsKey("@id_nid_request_key")
			        && jdbcResult.getOutputParamValueMap().get("@id_nid_request_key") != null) {
				obj.setNidRequestId(Integer.parseInt(jdbcResult.getOutputParamValueMap().get("@id_nid_request_key").toString()));
			}
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

		return obj;
	}

	private List<NationalId> handleSelectHistory(NationalId nid, String actionType) {

		try {
			return execute(nid, actionType, RSType.RS_TYPE_NID_SELECT_REQUEST_HISTORY.toString());
		}
		catch (Exception e) {
			log.error("Exception get request history [{}]", e);
		}

		return null;
	}
}
