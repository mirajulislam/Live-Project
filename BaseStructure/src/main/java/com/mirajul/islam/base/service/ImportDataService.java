/**
 * 
 */
package com.mirajul.islam.base.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mirajul.islam.base.model.ImportData;

/**
 * @author mirajul.islam
 *
 */
@Service
public class ImportDataService {
	
	private static Logger log = LogManager.getLogger(ImportDataService.class);
	
	@Value("${app.upload.file}")
	public String EXCEL_FILE_PATH;
	
	@Value("${loan.type.PL}")
	public Integer pL;
	
	@Value("${loan.type.GPF}")
	public Integer GPF;
	
	@Value("${loan.type.HBL}")
	public Integer HBL;
	
	@Value("${loan.type.SEC}")
	public Integer SEC;
	
	@Value("${cust.type.gold}")
	public Integer gold;
	
	@Value("${cust.type.platinum}")
	public Integer platinum;
	
	@Value("${cust.type.yet}")
	public Integer yet;
	
	@Value("${loan.creatorId}")
	public Integer creatorId;
	
	@Value("${loan.receiverId}")
	public Integer receiverId;
	
	@Value("${loan.approverId}")
	public Integer approverId;
	
	@Value("${loan.sentToCadId}")
	public Integer sentToCadId;
	
	@Value("${loan.crStateId}")
	public Integer crStateId;
	
	@Value("${loan.recevedStateId}")
	public Integer recevedStateId;
	
	@Value("${loan.approvedStateId}")
	public Integer approvedStateId;
	
	@Value("${loan.sentToCadStateId}")
	public Integer sentToCadStateId;
	
	@Value("${loan.trackingid}")
	public Integer trackingid;
	
	@Value("${id.legalEntity.Key}")	
	public Integer legalEntity;
		
	@Value("${id.creator.Key.createLoan}")
	public Integer idCreatorKeyLoanCreate;
	
	@Value("${id.creator.Key.reArv}")
	public Integer idCreatorRCPrvKey;
	
	
	Workbook wb = null;
	
//	public void getExcelDataAsList() throws Exception{
//		List<ImportData> dataList = readExcelFile();		
//
//		for (ImportData ob : dataList) {
//			
//			Loan loan = getBaseLoanData(ob);			
//			Customer cust = getBaseCustomerDta(ob);
//			cust.setUserModKey(creatorId);	
//			loan.setIdLegalEntityKey(legalEntity);
//			
//			//insert customer
//			cust = customerService.insertCustomer(cust);
//			
//            loan.setCustomerIdKey(cust.getCustomerIdKey());
//			loan.setIdCustomerVer(cust.getIdCustomerVer());
//			Date createDate=new SimpleDateFormat("dd/MM/yyyy").parse(Str.INSERTDATE);  
//			loan.setCreatorId(idCreatorKeyLoanCreate);
//			// set loan tracking id at save time
//			loan.setLoanTrackingId(String.valueOf(trackingid));
//			loan.setUserModKey(creatorId);
//			loan.setCreateDate(createDate);
//			loan.setDttMod(createDate);
//			loan.setCreatorId(idCreatorKeyLoanCreate);
//			loan.setStateId(crStateId);
//			//create loan
//			Loan loan2 = importExecute(loan);	
//			
//			//received loan		
//			
//			Date receivedDate=new SimpleDateFormat("dd/MM/yyyy").parse(Str.RECEIVEDDATE);  
//			loan.setDttMod(receivedDate);			
//			loan.setUserModKey(receiverId);
//			loan.setApplicationNo(ob.getFileSerial());
//			loan.setStateId(recevedStateId);
//			loan.setLoanId(loan2.getLoanId());
//			loan.setCreatorId(idCreatorRCPrvKey);
//			Loan loan3 = importUpdate(loan);
//			
//			//approvedloan
//			
//			Date approvedDate=new SimpleDateFormat("dd/MM/yyyy").parse(Str.APPROVEDDATE);  
//			loan.setDttMod(approvedDate);
//			loan.setUserModKey(approverId);
//			loan.setStateId(approvedStateId);
//			loan.setLoanId(loan2.getLoanId());
//			loan.setCreatorId(idCreatorRCPrvKey);
//			Loan loan4 = importUpdate(loan);	
//			
//			//send to cad
//			
//			Date sentTocadDate=new SimpleDateFormat("dd/MM/yyyy").parse(Str.SENDTOCAD);  
//			loan.setDttMod(sentTocadDate);
//			loan.setUserModKey(sentToCadId);
//			loan.setStateId(sentToCadStateId);
//			loan.setLoanId(loan2.getLoanId());
//			loan.setCreatorId(idCreatorRCPrvKey);
//			Loan loan5 = importUpdate(loan);	
//			
//			trackingid++;
//		}
//	}
//	
	
//	private List<ImportData> readExcelFile() throws ParseException{
//
//		List<ImportData> dataList = new ArrayList<ImportData>();
//		
//		try {
//			wb = new XSSFWorkbook(new FileInputStream(new File(EXCEL_FILE_PATH)));
//			Sheet sheet = wb.getSheetAt(0);
//
//			boolean skipHeader = true;
//
//			for (Row row : sheet) {
//				if (skipHeader) {
//					skipHeader = false;
//					continue;
//				}
//
//				List<Cell> cells = new ArrayList<Cell>();
//
//				int lastColumn = Math.max(row.getLastCellNum(), 33);
//				for (int cn = 0; cn < lastColumn; cn++) {
//					Cell c = row.getCell(cn, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
//					cells.add(c);
//				}
//
//				ImportData info = extractInfoFromCell(cells);
//				dataList.add(info);
//			}
//		} catch (IOException e) {
//			e.printStackTrace();
//		} finally {
//			if (wb != null) {
//				try {
//					wb.close();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}
//			}
//		}
//		
//		return dataList;
//	}
//	
	private static ImportData extractInfoFromCell(List<Cell> cells) throws ParseException {
		ImportData info = new ImportData();
		
		Cell fileSerial = cells.get(0);
		if (fileSerial != null) {
		   if(fileSerial.getCellType()==HSSFCell.CELL_TYPE_STRING) {
			    info.setFileSerial(fileSerial.getStringCellValue());
			}else if(fileSerial.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setFileSerial(String.valueOf(fileSerial.getNumericCellValue()));
			}else {
				info.setFileSerial(null);
			}
		}
		
		Cell bpNo = cells.get(1);
		if (bpNo != null) {
			if(bpNo.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setBpNo(bpNo.getStringCellValue());
			}else if(bpNo.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setBpNo(String.valueOf(bpNo.getNumericCellValue()));
			}
			else {
				info.setBpNo(null);
			}
		}
		
		Cell loanType = cells.get(2);
		if (loanType != null) {
			if(loanType.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setLoanType(loanType.getStringCellValue());
			}else if(loanType.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setLoanType(String.valueOf(loanType.getNumericCellValue()));
			}
			else {
				info.setLoanType(null);
			}
		}
		
		Cell nameOfBorrower = cells.get(3);
		if (nameOfBorrower != null) {
			if(nameOfBorrower.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setNameOfBorrower(nameOfBorrower.getStringCellValue());
			}else if(nameOfBorrower.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setNameOfBorrower(String.valueOf(nameOfBorrower.getNumericCellValue()));
			}
			else {
				info.setNameOfBorrower(null);
			}

		}

		Cell dateOfBirth = cells.get(4);
		if (dateOfBirth != null) {
			try {
				if (HSSFDateUtil.isCellDateFormatted(dateOfBirth)) {
			          info.setDateOfBirth(dateOfBirth.getDateCellValue());
			    }
			}catch(Exception e) {
				Date dd = new Date(1900, 01, 01); 
				info.setDateOfBirth(dd);
			}				
		 }
	
		Cell designation = cells.get(5);
		if (designation != null) {
			if(designation.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setDesignation(designation.getStringCellValue());
			}else if(designation.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setDesignation(String.valueOf(designation.getNumericCellValue()));
			}
			else {
				info.setDesignation(null);
			}

		}
		
		Cell customerType = cells.get(6);
		if (customerType != null) {
			if(customerType.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setCustomerType(customerType.getStringCellValue());
			}else if(customerType.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setCustomerType(String.valueOf(customerType.getNumericCellValue()));
			}else {
				info.setCustomerType(null);
			}

		}
		
		Cell cif = cells.get(7);
		if (cif != null) {
			if(cif.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setcIf(cif.getStringCellValue());
			}else if(cif.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setcIf(String.valueOf(cif.getNumericCellValue()));
			}else {
				info.setcIf(null);
			}
		}

		Cell account = cells.get(8);
		if (account != null) {
			if(account.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setAccountNo(account.getStringCellValue());
			}else if(account.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setAccountNo(String.valueOf(account.getNumericCellValue()));
			}else {
				info.setAccountNo(null);
			}
		}
		
		Cell nid = cells.get(9);
		if (nid != null) {
			if(nid.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setnId(nid.getStringCellValue());
			}else if(nid.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setnId(String.valueOf(nid.getNumericCellValue()));
			}else {
				info.setnId(null);
			}

		}
		
		Cell tin = cells.get(10);
		if (tin != null) {
			if(tin.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setTiN(tin.getStringCellValue());
			}else if(tin.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setTiN(String.valueOf(tin.getNumericCellValue()));
			}
			else {
				info.setTiN(null);
			}
		}
		
		Cell dateOfJoin = cells.get(11);
		if (dateOfJoin != null) {
			try {
				 if (HSSFDateUtil.isCellDateFormatted(dateOfJoin)) {
			          info.setDateOfJoin(dateOfJoin.getDateCellValue());
			    }
			}catch(Exception e) {
				Date d1 = new Date(1901, 01, 01); 
				 info.setDateOfJoin(d1);
			}
			
		}
		
		
		Cell analysit = cells.get(13);
		if (analysit != null) {
			if(analysit.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setAnalyst(analysit.getStringCellValue());
			}else if(analysit.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setAnalyst(String.valueOf(analysit.getNumericCellValue()));
			}else {
				info.setAnalyst(null);
			}

		}
		
		Cell status = cells.get(14);
		if (status != null) {
			if(status.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setStatus(status.getStringCellValue());
			}else if(status.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setStatus(String.valueOf(status.getNumericCellValue()));
			}else {
				info.setStatus(null);
			}
		}		
		
		Cell appliedAmound = cells.get(15);
		if (appliedAmound != null) {
			if(appliedAmound.getCellType()==HSSFCell.CELL_TYPE_STRING) {				
				info.setAppliedAmount(Double.valueOf(appliedAmound.getStringCellValue()));
			}else if(appliedAmound.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setAppliedAmount(appliedAmound.getNumericCellValue());
			}else {
				info.setAppliedAmount(null);
			}
		}		
		
		Cell approvedAmound = cells.get(16);
		if (approvedAmound != null) {
			if(approvedAmound.getCellType()==HSSFCell.CELL_TYPE_STRING) {				
				info.setApprovedAmount(Double.valueOf(approvedAmound.getStringCellValue()));
			}else if(approvedAmound.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setApprovedAmount(approvedAmound.getNumericCellValue());
			}else {
				info.setApprovedAmount(null);
			}
		}		
				
		Cell tenor = cells.get(19);
		if (tenor != null) {
			if(tenor.getCellType()==HSSFCell.CELL_TYPE_STRING) {				
				info.setTenorYear(Double.valueOf(tenor.getStringCellValue()));
			}else if(tenor.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setTenorYear(tenor.getNumericCellValue());
			}else {
				info.setTenorYear(null);
			}
		}		
		
		Cell rate = cells.get(20);
		if (rate != null) {
			if(rate.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setInterestRate(Double.valueOf(rate.getStringCellValue()));				
			}else if(rate.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setInterestRate(rate.getNumericCellValue());
			}else {
				info.setInterestRate(null);
			}
		}
		
		Cell district = cells.get(21);
		if (district != null) {
			if(district.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setDistrict(district.getStringCellValue());
			}else if(district.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setDistrict(String.valueOf(district.getNumericCellValue()));
			}else {
				info.setDistrict(null);
			}
		}
		
		Cell dbr = cells.get(22);
		if (dbr != null) {
				if(dbr.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setProposedDBR(Double.valueOf(dbr.getNumericCellValue()));
			}else {
				info.setProposedDBR(0.0);
			}
		}
		
		Cell mobile = cells.get(23);
		if (mobile != null) {
			if(mobile.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setMobile(mobile.getStringCellValue());
			}else if(mobile.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setMobile(String.valueOf(mobile.getNumericCellValue()));
			}else {
				info.setMobile(null);
			}
		}
		
		Cell branch = cells.get(24);
		if (branch != null) {
			if(branch.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setSourcingBrc(branch.getStringCellValue());
			}else if(branch.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setSourcingBrc(String.valueOf(branch.getNumericCellValue()));
			}else {
				info.setSourcingBrc(null);
			}
		}
				
		Cell rmrc =cells.get(25);
		if (rmrc != null) {
			if(rmrc.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setRmRcCode(rmrc.getStringCellValue());
			}else if(rmrc.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setRmRcCode(String.valueOf(rmrc.getNumericCellValue()));
			}
		}
		
		Cell gurantorName = cells.get(26);
		if (gurantorName != null) {
			if(gurantorName.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setNameOfGuarantor(gurantorName.getStringCellValue());
			}else if(gurantorName.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setNameOfGuarantor(String.valueOf(gurantorName.getNumericCellValue()));
			}else {
				info.setNameOfGuarantor(null);
			}
		}
		
		Cell gurantorNid = cells.get(27);
		if (gurantorNid != null) {
			if(gurantorNid.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setNidOfGurantor(gurantorNid.getStringCellValue());
			}else if(gurantorNid.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setNidOfGurantor(String.valueOf(gurantorNid.getNumericCellValue()));
			}else {
				info.setNidOfGurantor(null);
			}
		}
		
		Cell topUp = cells.get(28);
		if (topUp != null) {
			if(topUp.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setOverLoan(topUp.getStringCellValue());
			}else if(topUp.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setOverLoan(String.valueOf(topUp.getNumericCellValue()));
			}else {
				info.setOverLoan(null);
			}
		}
		
		Cell marriedStatus = cells.get(29);
		if (marriedStatus != null) {
			if(marriedStatus.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setMaritalStatus(marriedStatus.getStringCellValue());
			}else if(marriedStatus.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setMaritalStatus(String.valueOf(marriedStatus.getNumericCellValue()));
			}else {
				info.setMaritalStatus(null);
			}
		}
		
		Cell loanAcc = cells.get(30);
		if (loanAcc != null) {
			if(loanAcc.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setLoanAccount(loanAcc.getStringCellValue());
			}else if(loanAcc.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setLoanAccount(String.valueOf(loanAcc.getNumericCellValue()));
			}else {
				info.setLoanAccount(null);
			}
		}
		
		Cell nameOfBangla = cells.get(31);
		if (nameOfBangla != null) {
			if(nameOfBangla.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setBanglaNameOfBorrower(nameOfBangla.getStringCellValue());
			}else if(nameOfBangla.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setBanglaNameOfBorrower(String.valueOf(nameOfBangla.getNumericCellValue()));
			}else {
				info.setBanglaNameOfBorrower(null);
			}
		}

		Cell division = cells.get(32);
		if (division != null) {
			if(division.getCellType()==HSSFCell.CELL_TYPE_STRING) {
				info.setDivision(division.getStringCellValue());
			}else if(division.getCellType()==HSSFCell.CELL_TYPE_NUMERIC) {
				info.setDivision(String.valueOf(division.getNumericCellValue()));
			}else {
				info.setDivision(null);
			}
		}
		return info;
	}

	
	/**
	 * @param ob
	 * @return
	 */
//	private Customer getBaseCustomerDta(ImportData ob) {
//		// TODO Auto-generated method stub
//		Customer cust = new Customer();
//			 
//			 cust.setBpNo(ob.getBpNo());
//			 cust.setCustomerName(ob.getNameOfBorrower());
//			 cust.setDesignation(ob.getDesignation());
//			 if(ob.getDateOfBirth()!=null) {
//				 cust.setDateOfBirth(ob.getDateOfBirth());
//				 Age ageCust = calculateAge(ob.getDateOfBirth());
//			     String ageValue=ageCust.toString();
//			     cust.setAge(ageValue);
//			 }			 
//		     if(ob.getDateOfJoin()!=null) {
//		    	 cust.setJoiningDate(ob.getDateOfJoin());	
//				 Age ageService = calculateAge(ob.getDateOfJoin());
//			     String ageServiceValue=ageService.toString();
//			     cust.setServiceLength(ageServiceValue);
//		     }			 		     
//			 cust.setNid(ob.getnId());
//			 cust.setTin(ob.getTiN());
//			 cust.setAccountNo(ob.getAccountNo());
//			 cust.setCif(ob.getcIf());
//			 cust.setMaritalStatus(ob.getMaritalStatus());
//			 cust.setMobile(ob.getMobile());
//			 cust.setBanglaNameOfBorrower(ob.getBanglaNameOfBorrower());
//			 cust.setOfficeDistrict(ob.getDistrict());
//			 cust.setOfficeDivision(ob.getDivision());	
//			 cust.setCustomerId(ob.getcIf());
//		return cust;
//	}
//	
	/**
	 * @param ob
	 * @return
	 */
//	private Loan getBaseLoanData(ImportData ob) {
//	     	Loan loan = new Loan();
//			
//			loan.setAppliedLoanAmount(ob.getAppliedAmount());
//			loan.setRecommendedForApproval(ob.getApprovedAmount());
//			String overLoan=ob.getOverLoan();
//			String custtype=ob.getCustomerType();
//			String loanType=ob.getLoanType();
//			 
//			if(overLoan!=null) {
//				loan.setOverLoan(1);
//			}else {
//				loan.setOverLoan(0);
//			}		
//			 if(custtype.equals(Str.Gold)) {
//				 loan.setIdCustomerTypeKey(gold);
//			 }else if(custtype.equals(Str.Yet)) {
//				 loan.setIdCustomerTypeKey(yet); 
//			 } else{			 
//				 loan.setIdCustomerTypeKey(platinum);
//			 }	
//			 
//			 if(loanType.equals(Str.PL)) {
//				 loan.setIdLoanTypeKey(pL);
//			 }else if(loanType.equals(Str.GPF)) {
//				 loan.setIdLoanTypeKey(GPF);
//			 }else if(loanType.equals(Str.HBL)) {
//				 loan.setIdLoanTypeKey(HBL);
//			 }
//			 else{
//				 loan.setIdLoanTypeKey(SEC);
//			 }	
//			 
//			loan.setTenorYear(ob.getTenorYear());
//			loan.setInterestRate(ob.getInterestRate());
//			loan.setProposedDBR(ob.getProposedDBR());
//			loan.setNameOfGuarantor(ob.getNameOfGuarantor());
//			loan.setGuarantorNid(ob.getNidOfGurantor());
//			loan.setSourcingBrc(ob.getSourcingBrc());
//			loan.setStaffId(ob.getRmRcCode());
//			loan.setDataSource(Str.DataSource);
//			log.debug("Read Excel file to  Loan Application detail [{}], [{}]",loan.toString());
//		
//		return loan;
//	}

//	private Loan importExecute(Loan loan) throws Exception {
//
//		JdbcResult jdbcResult = new JdbcResult();
//
//		try {
//
//			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
//
//			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.INS_loan.toString());
//			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
//			jdbcResult.setProcessWarnings(true);
//
//			jdbcResult = jdbcService.executeSP(SPName.INS_loan.toString(), spArgsMap, jdbcResult);
//
//			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
//
//			if (outputMap.get("@id_loan_key") != null) {
//				loan.setLoanId(Integer.parseInt(outputMap.get("@id_loan_key").toString()));
//			}
//			if (outputMap.get("@id_customer_key") != null) {
//				loan.setCustomerIdKey(Integer.parseInt(outputMap.get("@id_customer_key").toString()));
//			}
//
//			if (outputMap.get("@id_customer_ver") != null) {
//				loan.setIdCustomerVer(Integer.parseInt(outputMap.get("@id_customer_ver").toString()));
//			}
//		}
//		catch (Exception ex) {
//			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
//			throw ex;
//		}
//
//		return loan;
//	}
//	
//	private Loan importUpdate(Loan loan) throws Exception {
//
//		JdbcResult jdbcResult = new JdbcResult();
//
//		try {
//
//			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
//
//			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.UPD_loan.toString());
//			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
//			jdbcResult.setProcessWarnings(true);
//
//			jdbcResult = jdbcService.executeSP(SPName.UPD_loan.toString(), spArgsMap, jdbcResult);
//
//			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
//
//			if (outputMap.get("@id_loan_key") != null) {
//				loan.setLoanId(Integer.parseInt(outputMap.get("@id_loan_key").toString()));
//			}
//			if (outputMap.get("@id_customer_key") != null) {
//				loan.setCustomerIdKey(Integer.parseInt(outputMap.get("@id_customer_key").toString()));
//			}
//
//			if (outputMap.get("@id_customer_ver") != null) {
//				loan.setIdCustomerVer(Integer.parseInt(outputMap.get("@id_customer_ver").toString()));
//			}
//		}
//		catch (Exception ex) {
//			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
//			throw ex;
//		}
//
//		return loan;
//	}
//	
//	 private static Age calculateAge(Date birthDate)
//	   {
//	      int years = 0;
//	      int months = 0;
//	      int days = 0;
//	 
//	      //create calendar object for birth day
//	      Calendar birthDay = Calendar.getInstance();
//	      birthDay.setTimeInMillis(birthDate.getTime());
//	 
//	      //create calendar object for current day
//	      long currentTime = System.currentTimeMillis();
//	      Calendar now = Calendar.getInstance();
//	      now.setTimeInMillis(currentTime);
//	 
//	      //Get difference between years
//	      years = now.get(Calendar.YEAR) - birthDay.get(Calendar.YEAR);
//	      int currMonth = now.get(Calendar.MONTH) + 1;
//	      int birthMonth = birthDay.get(Calendar.MONTH) + 1;
//	 
//	      //Get difference between months
//	      months = currMonth - birthMonth;
//	 
//	      //if month difference is in negative then reduce years by one 
//	      //and calculate the number of months.
//	      if (months < 0)
//	      {
//	         years--;
//	         months = 12 - birthMonth + currMonth;
//	         if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
//	            months--;
//	      } else if (months == 0 && now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
//	      {
//	         years--;
//	         months = 11;
//	      }
//	 
//	      //Calculate the days
//	      if (now.get(Calendar.DATE) > birthDay.get(Calendar.DATE))
//	         days = now.get(Calendar.DATE) - birthDay.get(Calendar.DATE);
//	      else if (now.get(Calendar.DATE) < birthDay.get(Calendar.DATE))
//	      {
//	         int today = now.get(Calendar.DAY_OF_MONTH);
//	         now.add(Calendar.MONTH, -1);
//	         days = now.getActualMaximum(Calendar.DAY_OF_MONTH) - birthDay.get(Calendar.DAY_OF_MONTH) + today;
//	      } 
//	      else
//	      {
//	         days = 0;
//	         if (months == 12)
//	         {
//	            years++;
//	            months = 0;
//	         }
//	      }
//	      //Create new Age object 
//	      return new Age(days, months, years);
//	   }
//	 
}
