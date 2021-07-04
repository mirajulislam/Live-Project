package com.naztech.lms.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

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
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.model.User;

public class CustomerService extends AbstractService<Customer> {
	private static Logger log = LogManager.getLogger(CustomerService.class);

	@Autowired
	JdbcService jdbcService;

	@Autowired
	FinacleService finacleService;

	@Value("${is.dev.mode}")
	private boolean devMode;

	@Autowired
	NConfigurationService configService;

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT_CUSTOMER.toString())) {
				Customer customer = null;
				if (!devMode) {
					customer = handleSelectCustomer(msg, action);
				}
				else {
					customer = doHandleSelectCustomer(msg, action);
				}

				msgResponse = MessageBuilder.withPayload(customer).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ALL_CUSTOMER.toString())) {
				msgResponse = MessageBuilder.withPayload(doHandleSelectAllCustomer(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SEARCH_NID_DETAILS_FOR_COMPARE.toString())) {
				msgResponse = MessageBuilder.withPayload(selectNidDetailsCustomer(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else {
				throw new Exception("Unknow action " + action);
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}

	private Customer handleSelectCustomer(Message<List<Customer>> msg, String action) throws Exception {

		List<Customer> customerList = msg.getPayload();

		if (customerList == null || customerList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			Customer customerFromIOffice = finacleService.selectCustFromIOffice(customerList.get(0));
			Customer customerFromFinacle;
			if (customerFromIOffice.getAccountNo() != null && !customerFromIOffice.getAccountNo().isEmpty()) {
				customerFromFinacle = finacleService.selectCustFromFinacle(customerFromIOffice, ActionType.SELECT_CUST_FROM_FINACLE.toString());
			}
			else {
				log.info("Account No not found in iOffice response");
				throw new Exception("Customer not found for [" + customerList.get(0).getSearchByStr() + "]");
			}

			Customer customer = getMargedCustomer(customerFromIOffice, customerFromFinacle);

			customer.setUserModKey(customerList.get(0).getUserModKey());

			if (customer.getCustomerType() != null && !customer.getCustomerType().isEmpty()) {
				NConfiguration nConfig = new NConfiguration();
				nConfig.setGroup(Str.STR_CUSTOMER.toString());
				nConfig.setSubGroup(Str.STR_CUSTOMER_TYPE.toString());
				nConfig.setValue1(customer.getCustomerType());
				nConfig.setUserModKey(customer.getUserModKey());

				List<NConfiguration> nConfigList = configService.select(nConfig);

				if (nConfigList == null || nConfigList.size() == 0) {
					nConfig = configService.insert(nConfig);
					customer.setIdCustomerTypeKey(nConfig.getConfigurationId());
				}
				else {
					customer.setIdCustomerTypeKey(nConfigList.get(0).getConfigurationId());
				}
			}
			// insert update handling in DB
			Customer cust = insertCustomer(customer);
			customer.setCustomerIdKey(cust.getCustomerIdKey());
			customer.setIdCustomerVer(cust.getIdCustomerVer());

			log.info("Customer found using Api [{}]", customer.toString());

			return customer;

		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	private List<Customer> doHandleSelectAllCustomer(Message<List<Customer>> msg, String action) throws Exception {

		List<Customer> customerList = msg.getPayload();

		if (customerList == null || customerList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			return selectCustomer(customerList.get(0));
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	private Customer doHandleSelectCustomer(Message<List<Customer>> msg, String action) throws Exception {

		List<Customer> customerList = msg.getPayload();

		if (customerList == null || customerList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			List<Customer> custList = selectCustomer(customerList.get(0));
			if (custList == null || custList.size() == 0) return new Customer();
			return custList.get(0);

		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}
	private Customer selectNidDetailsCustomer(Message<List<Customer>> msg, String action) throws Exception {

		List<Customer> customerList = msg.getPayload();

		if (customerList == null || customerList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			List<Customer> custList = selectCustomerNidDetails(customerList.get(0));
			if (custList == null || custList.size() == 0) return new Customer();
			return custList.get(0);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	/**
	 * @param custIO
	 * @param custF
	 * @return marge two obj with giving priority to custF
	 */
	private Customer getMargedCustomer(Customer custIO, Customer custF) {

		if (custF.getBpNo() == null || custF.getBpNo().isEmpty()) custF.setBpNo(custIO.getBpNo());
		if (custF.getPermanentAddr() == null || custF.getPermanentAddr().isEmpty()) custF.setPermanentAddr(custIO.getPermanentAddr());
		if (custF.getOfficeAddr() == null || custF.getOfficeAddr().isEmpty()) custF.setOfficeAddr(custIO.getOfficeAddr());
		if (custF.getNid() == null || custF.getNid().isEmpty()) custF.setNid(custIO.getNid());
		if (custF.getAccountNo() == null || custF.getAccountNo().isEmpty()) custF.setAccountNo(custIO.getAccountNo());
		if (custF.getCif() == null || custF.getCif().isEmpty()) custF.setCif(custIO.getCif());
		if (custF.getCustomerId() == null || custF.getCustomerId().isEmpty()) custF.setCustomerId(custIO.getCif());
		if (custF.getMaritalStatus() == null || custF.getMaritalStatus().isEmpty()) custF.setMaritalStatus(custIO.getMaritalStatus());
		if (custF.getMotherName() == null || custF.getMotherName().isEmpty()) custF.setMotherName(custIO.getMotherName());
		if (custF.getFatherName() == null || custF.getFatherName().isEmpty()) custF.setFatherName(custIO.getFatherName());
		if (custF.getSpouse() == null || custF.getSpouse().isEmpty()) custF.setSpouse(custIO.getSpouse());
		if (custF.getMobile() == null || custF.getMobile().isEmpty()) custF.setMobile(custIO.getMobile());
		if (custF.getEmerPhone() == null || custF.getEmerPhone().isEmpty()) custF.setEmerPhone(custIO.getEmerPhone());
		if (custF.getDesignation() == null || custF.getDesignation().isEmpty()) custF.setDesignation(custIO.getDesignation());
		custF.setCustomerType(custIO.getCustomerType());
		custF.setOfficeDistrict(custIO.getOfficeDistrict());
		custF.setOfficeDivision(custIO.getOfficeDivision());
		custF.setUnitName(custIO.getUnitName());
		custF.setSubUnitName(custIO.getSubUnitName());
		return custF;
	}

	public List<Customer> selectCustomer(Customer customer) throws Exception {
		return doSelectCustomer(customer);
	}
	
	public List<Customer> selectCustomerNidDetails(Customer customer) throws Exception {
		return doSelectCustomerNidDetails(customer);
	}

	public Customer insertCustomer(Customer customer) throws Exception {
		return execute(customer, ActionType.NEW.toString());
	}

	public Customer updateCustomer(Customer customer) throws Exception {
		return execute(customer, ActionType.UPDATE.toString());
	}

	private List<Customer> doSelectCustomer(Customer customer) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<Customer> customerList = new ArrayList<Customer>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(customer, Customer.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CUSTOMER.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(ActionType.SELECT.toString(), SPName.ACT_CUSTOMER.toString(), spArgsMap, jdbcResult);

			customerList = JdbcUtils.mapRows(Customer.class, Customer.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER.toString()));
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return customerList;
	}
	
	private List<Customer> doSelectCustomerNidDetails(Customer customer) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<Customer> customerList = new ArrayList<Customer>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(customer, Customer.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CUSTOMER.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(ActionType.SEARCH_NID_DETAILS_FOR_COMPARE.toString(), SPName.ACT_CUSTOMER.toString(), spArgsMap, jdbcResult);

			customerList = JdbcUtils.mapRows(Customer.class, Customer.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER_NID_DETAILS.toString()));
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return customerList;
	}

	private Customer execute(Customer customer, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(customer, Customer.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CUSTOMER.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_CUSTOMER.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_customer_key") != null) {
				customer.setCustomerIdKey(Integer.parseInt(outputMap.get("@id_customer_key").toString()));
			}
			if (outputMap.get("@id_customer_ver") != null) {
				customer.setIdCustomerVer(Integer.parseInt(outputMap.get("@id_customer_ver").toString()));
			}
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return customer;
	}

	public List<User> SelectUser(Integer userModKey) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<User> userList = new ArrayList<User>();

		try {
			Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
			spArgsMap.put("@id_user_mod_key", userModKey);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CUSTOMER.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(ActionType.SELECT_USER.toString(), SPName.ACT_CUSTOMER.toString(), spArgsMap, jdbcResult);

			userList = JdbcUtils.mapRows(User.class, User.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER.toString()));
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return userList;
	}

}
