package com.naztech.nid.service;

import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.nazdaqTechnologies.core.message.processor.json.gson.GsonJsonMessageProcessor;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.nid.constants.ActionType;
import com.naztech.nid.constants.Constants;
import com.naztech.nid.constants.RSType;
import com.naztech.nid.constants.SPName;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.model.NidRequest;
import com.naztech.nid.scraper.NidScraper;
import com.naztech.nid.utils.ScraperUtils;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

/**
 * @author assaduzzaman.sohan
 */
@Service
public class NidService {
	private static Logger log = LoggerFactory.getLogger(NidService.class);

	@Autowired
	protected Environment springEnv;

	@Autowired
	NidScraper nidScraper;

	@Autowired
	private NidRequestService nidRequestService;

	@Autowired
	JdbcService jdbcService;
	@Autowired
	private GsonJsonMessageProcessor messageProcessor;

	@Value("${nid.expired.time.in.days:100}")
	private int nidExpiredTimeInDays;

	public NationalId getNidInfo(NationalId nid) throws Exception {
		log.info("Working on NID:DOB => [{}]", nid.getNid(), nid.getDateOfBirth());

		NidRequest nidRequest = new NidRequest();
		NationalId nidFromInsUpd = new NationalId();
		try {
			// SELECT
			List<NationalId> list = execute(nid, ActionType.SELECT.toString(), RSType.RS_TYPE_NID.toString());
			//insert search details in table
			executeSearch(nid, ActionType.NEW_SEARCH.toString());

			if (hasLocalUatProfile()) {
				if (list == null || list.isEmpty()) {
					nid.setComments("We are on local UAT, NID not found in local cache.");
					//insert search data in new table
					nid.setNidDetailsFrom("NID NOT FOUND LOCAL UAT");
					onSaveSearchResult(list.get(0),ActionType.NEW_SEARCH_RESULT.toString());
					return nid;
				}
				else {
					//insert search data in new table
					nid.setNidDetailsFrom("EC Portal");
					onSaveSearchResult(list.get(0),ActionType.NEW_SEARCH_RESULT.toString());
					return checkNidPublicPath(list.get(0));
				}
			}						

			if (list == null || list.isEmpty()) {
				log.info("NID not found in local cache.");
				nid = nidScraper.doScrapNid(nid.getNid(), nid.getDateOfBirth());
				nid.setNidSource(Constants.DATASOURCE_NID_SERVER);
				nid.setNidRequestId(nidRequest.getNidRequestId());
				nid.setSuccess(nid.getComments() == null || nid.getComments().isEmpty() ? 1 : 0);
				nidFromInsUpd = saveNid(nid);
				//insert search data in new table
				nid.setNidDetailsFrom("EC Portal");
				onSaveSearchResult(list.get(0),ActionType.NEW_SEARCH_RESULT.toString());
			}
			else if (nid.isForceFatch() || ScraperUtils.isUnsuccessfull(list.get(0))
			        || ScraperUtils.isNidDataExpired(list.get(0), nidExpiredTimeInDays)) {
				log.info("User is asking to Fatch Now, Going to NID server to fatch");
				nid = nidScraper.doScrapNid(nid.getNid(), nid.getDateOfBirth());
				nid.setNidSource(Constants.DATASOURCE_NID_SERVER);
				nid.setNidRequestId(nidRequest.getNidRequestId());
				nid.setSuccess(nid.getComments() == null || nid.getComments().isEmpty() ? 1 : 0);
				nidFromInsUpd = updateNid(nid);
				//insert search data in new table
				nid.setNidDetailsFrom("EC Portal");
				onSaveSearchResult(list.get(0),ActionType.NEW_SEARCH_RESULT.toString());
			}
			else {
				log.info("Found in local cache");
				nid = list.get(0);
				nid.setNidSource(Constants.DATASOURCE_LOCAL_CACHE);
				nid = checkNidPublicPath(nid);
			}
		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}

		try {
			nidRequest.setRequestTime(new Date());
			nidRequest.setValidReq(1);
			nidRequest.setCallBackUrl(nid.getCallBackUrl());
			nidRequest.setDataSource(nid.getNidSource());
			nidRequest.setComments(nid.getComments());
			nidRequest.setResponseTime(new Date());
			nidRequest.setIdNidKey(nidFromInsUpd.getNidId());
			nidRequestService.save(nidRequest);
			//insert search data in new table
			nid.setNidDetailsFrom("TESTED DEPENDED");
			onSaveSearchResult(nid,ActionType.NEW_SEARCH_RESULT.toString());
		}
		catch (Exception e) {
			log.error("Exception updating nidRequest [{}]", e);
		}

		return nid;
	}

	private void onSaveSearchResult(NationalId obj, String action) throws Exception {		
		JdbcResult jdbcResult = new JdbcResult();
		if(obj.getNidDetailsFrom() == null || obj.getNidDetailsFrom().isEmpty()) {
			obj.setNidDetailsFrom("Internal DB");
		}		
		log.info("Save Search Result information Parameters: [{}] , ActionType : [{}]",obj.toString(),action);

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_SEARCH_RESULT.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_SEARCH_RESULT.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

	}

	private NationalId checkNidPublicPath(NationalId nid) {

		String nidImagePath = nidScraper.buildPublicPath(nid.getNid(), nid.getNidImageName());
		String personImagePath = nidScraper.buildPublicPath(nid.getNid(), nid.getPersonImageName());

		if (!nid.getNidImagePublicPath().matches(nidImagePath)) nid.setNidImagePublicPath(nidImagePath);
		if (!nid.getPersonImagePublicPath().matches(personImagePath)) nid.setPersonImagePublicPath(personImagePath);

		return nid;
	}

	public NationalId saveNid(NationalId nid) throws Exception {
		return saveAndUpdate(nid, ActionType.NEW.toString());
	}

	public NationalId updateNid(NationalId nid) throws Exception {
		return saveAndUpdate(nid, ActionType.UPDATE.toString());
	}

	public List<NationalId> select(NationalId obj, String actionType) throws Exception {
		return execute(obj, actionType, RSType.RS_TYPE_NID.toString());
	}

	private List<NationalId> execute(NationalId obj, String action, String rsType) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<NationalId> objList = new ArrayList<>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_NID_V2.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_NID_V2.toString(), spArgsMap, jdbcResult);

			objList = JdbcUtils.mapRows(NationalId.class, NationalId.getRs2BeanMap(), jdbcResult.getRsTypeMap(rsType));
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

		return objList;
	}

	private void executeSearch(NationalId obj, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		log.info("Save Search information Parameters: [{}] , ActionType : [{}]",obj.toString(),action);

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_SEARCH_NID.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_SEARCH_NID.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

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

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_NID_V2.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_NID_V2.toString(), spArgsMap, jdbcResult);

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

	public boolean hasLocalUatProfile() {
		try {
			return Arrays.asList(springEnv.getActiveProfiles()).contains("local-uat");
		}
		catch (Exception e) {
			log.error("Exception getting active profile list [{}]", e);
			return false;
		}
	}
	public JasperPrint getJasperPrintForAcquisitionReport(HttpServletRequest request) throws Exception {
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String userName = request.getParameter("username");
		Date reportGenDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		String[] idList = request.getParameterValues("idList");

		InputStream template = null;
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		NationalId NationalId = new NationalId();
//		for (int i = 0; i < idList.length; i++) {
//			acquisitionDetails.setCreditCardId(Integer.parseInt(idList[i]));
//			NationalId.setUserModKey(userId);
//		}
//		spArgsMap = getAcquisitionMap(request, acquisitionDetails);
		spArgsMap.put("tx_user_name", userName);
		spArgsMap.put("@id_user_mod_key", userId);
		spArgsMap.put("genDateTime", dateFormat.format(reportGenDate).toString());
		log.info("Acqusition Report View");
		try {
//			template = getClass().getResourceAsStream(Str.NID_DETAILS_SHEET.toString());
			jasperDesign = JRXmlLoader.load(template);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			jasperPrint = JasperFillManager.fillReport(jasperReport, spArgsMap, new JREmptyDataSource());
			log.info("Acqusition details report");
		} catch (Exception ex) {
			log.error("Acqusition Report Error : {}", ex.getLocalizedMessage());

			throw ex;
		}
		return jasperPrint;
	}
	
	public String getNidDetails(NationalId nid) throws Exception {
		List<NationalId> list =  new ArrayList<NationalId>();
		if(nid.isForceFatch()) {
			log.info("Hit Controller API /verify/nid: [{}] , Force Fatch() : [{}]",nid.toString(),nid.isForceFatch());
			nid = getNidInfo(nid);
			list.add(nid);
			return messageProcessor.toJson(list);
		}else {
			log.info("Hit Controller API /verify/nid: [{}] , Force Fatch() : [{}]",nid.toString(),nid.isForceFatch());
			list = execute(nid, ActionType.SELECT_NID_DETAILS.toString(), RSType.RS_TYPE_NID.toString());
			//insert search details in table
			executeSearch(nid, ActionType.NEW_SEARCH.toString());
			if(list.size()>0 || !list.isEmpty()) {
				for(NationalId nidObj : list) {
					//insert search result in table
					onSaveSearchResult(nidObj,ActionType.NEW_SEARCH_RESULT.toString());
				}
			}						
			return messageProcessor.toJson(list);
		}
	}
	
	private List<NationalId> executeSearch(NationalId obj, String action, String rsType) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<NationalId> objList = new ArrayList<>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_SEARCH_NID.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_SEARCH_NID.toString(), spArgsMap, jdbcResult);

			objList = JdbcUtils.mapRows(NationalId.class, NationalId.getRs2BeanMap(), jdbcResult.getRsTypeMap(rsType));
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

		return objList;
	}
}
