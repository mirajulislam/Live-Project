/**
 * 
 */
package com.naztech.lms.service;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.model.CibInformation;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.utils.DbExecutor;
import com.naztech.lms.utils.RequestSender;

/**
 * @author mirajul.islam
 *
 */
public class CibInformationService extends AbstractService<CibInformation>{
	private static Logger log = LoggerFactory.getLogger(CibInformationService.class);
	
	@Autowired
	JdbcService jdbcService;
	@Value("${cib.save.location}")
	public String saveCibLocation;
	
	@Value("${cib.create.directory}")
	public String directory;	
	
	@Value("${cib.api.url}")
	public String url;	
	
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
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.NEW_PERSON_INQUERY.toString())) {
				CibInformation cibInformation = null;
				cibInformation = handleCibServie(msg, action);
				msgResponse = MessageBuilder.withPayload(cibInformation).copyHeadersIfAbsent(msgHeader).build();
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
	private CibInformation handleCibServie(Message<List<CibInformation>> msg, String action) throws Exception {
		// TODO Auto-generated method stub
				List<CibInformation> cibInformation = msg.getPayload();
				if (cibInformation == null || cibInformation.size() == 0) {
					throw new Exception("Empty Request.");
				}
				try {
					return  selectCibInformation(cibInformation.get(0));
				}
				catch (Exception e) {
					log.error("Exception: ", e);
					throw e;
				}
	}

	/**
	 * @param cibInformation
	 * @param action
	 * @return
	 */
	private CibInformation selectCibInformation(CibInformation cibInformation) throws Exception{
		CibInformation cibInformation1;
		String data=sendRequsetCibApi(cibInformation);
		if (RequestSender.isJson(data)) {
			cibInformation1 = gson.fromJson(data, CibInformation.class);
			String downloadLink = cibInformation1.getDocDownloadUrl();
			if (!isEmptyString(downloadLink)) {
				cibInformation1.setLoanId(cibInformation.getLoanId());
				cibInformation1.setUserModKey(cibInformation.getUserModKey());
				cibInformation1 = saveCibReport(cibInformation1);
				cibInformation1 = saveCibStatus(cibInformation1);				
			}else {
				cibInformation.setMsg("Not Found In CIB Site");
				return cibInformation;
			}
			return cibInformation1;
		}else{
			return cibInformation;
		}
	}
	
	/**
	 * @param cibInformation1
	 * @return
	 * @throws Exception 
	 */
	private CibInformation saveCibStatus(CibInformation cibInformation1) throws Exception {
		Loan loan = new Loan();
		LoanDocument loanDoc = new LoanDocument();
		//loan details update
		if (isEmptyString(cibInformation1.getCibStatus())) {
			loan.setCibStatus("UNDEFINED");
		}else {			
			//String cibStatus = cibInformation1.getCibStatus();
			loan.setCibStatus(cibInformation1.getCibStatus());
		}
		loan.setLoanId(cibInformation1.getLoanId());
		loan.setUserModKey(cibInformation1.getUserModKey());				
		
		if (!isEmptyString(cibInformation1.getDocDownloadUrl())) {
			loan.setCibStatus(cibInformation1.getCibStatus());
		}		
	    execute(loan, ActionType.CIB_STATUS_UPDATE.toString());
		
		//document updoad
		String docPath = directory+cibInformation1.getLoanId()+"/";
		String downloadLink = docPath+ "CIB_STATUS.pdf";
		loanDoc.setDocType("CIB_STATUS");
		loanDoc.setLoanId(cibInformation1.getLoanId());
		loanDoc.setUserModKey(cibInformation1.getUserModKey());
		loanDoc.setDocPath(docPath);
		loanDoc.setDownloadLink(downloadLink);
		loanDoc.setFilePresent(1);
		loanDoc.setUploadStatus(1);
		loanDoc.setDocName("CIB_STATUS.pdf");
		executeDoc(loanDoc, ActionType.NEW_CIB_STATUS.toString());
		return cibInformation1;
	}

	/**
	 * @param cibInformation
	 * @return
	 * @throws Exception 
	 */
	private String sendRequsetCibApi(CibInformation cibInformation) throws Exception {
		 String USER_AGENT = "PostmanRuntime/7.26.10";
		 URL obj = new URL(url);
		 HttpURLConnection con = (HttpURLConnection) obj.openConnection();
		        // Setting basic post request
		  con.setRequestMethod("POST");
		  con.setRequestProperty("User-Agent", USER_AGENT);
		  con.setRequestProperty("Accept-Language", "en-US,en;q=0.5");
		  con.setRequestProperty("Content-Type","application/json");
		 
		  String postJsonData =gson.toJson(cibInformation);
		 
		  // Send post request
		  con.setDoOutput(true);
		  DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		  wr.writeBytes(postJsonData);
		  wr.flush();
		  wr.close();
		 
		  int responseCode = con.getResponseCode();
		  log.info("nSending 'POST' request to URL : [{}]",url );
		  log.info("Post Data : : [{}]",postJsonData );
		  log.info("Response Code : [{}]",responseCode );
		  
		  if(responseCode==500) {
			  return "CIB Not Found";
		  }else {
			  BufferedReader in = new BufferedReader(
			          new InputStreamReader(con.getInputStream()));
			  String output;
			  StringBuffer response = new StringBuffer();
			 
			  while ((output = in.readLine()) != null) {
			   response.append(output);
			  }
			  in.close();
			  log.info("Response Code : [{}]",response.toString());
			  return  response.toString();
		  }		 		 		 	 
	}

	public CibInformation saveCibReport(CibInformation cibInformation) {

        try{
            //String arg = args[0];
        	String pdfDownloadUrl = cibInformation.getDocDownloadUrl();     	
            URL cibDownloadUrl = new URL(pdfDownloadUrl);
            String reportName = "CIB_STATUS.pdf"; 
            directoryCreate(cibInformation);      
            String saveCibIndir = saveCibLocation + cibInformation.getLoanId()+"/" +reportName;           
            log.info("Cib Save Directory Location: [{}]",saveCibIndir);
            //jpg
            InputStream in = new BufferedInputStream(cibDownloadUrl.openStream());
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            byte[] buf = new byte[131072];
            int n = 0;
            while (-1!=(n=in.read(buf)))
            {
               out.write(buf, 0, n);
            }
            out.close();
            in.close();
            byte[] response = out.toByteArray();
            FileOutputStream fos = new FileOutputStream(saveCibIndir);
            fos.write(response);
            fos.close();
         }
        catch (Exception e) {
            e.printStackTrace();
        }
		return cibInformation;
	}
	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
	
	private Loan execute(Loan loan, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);
			
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return loan;
	}
	
	public void directoryCreate(CibInformation cibInformation) throws IOException {       
        String directoryName = directory+cibInformation.getLoanId()+"/";
        Path path = Paths.get(directoryName);

        if (!Files.exists(path)) {
            
            Files.createDirectory(path);
            log.info("Directory Create");
        } else {
        	log.info("Directory already exists");
        }
	}
	private LoanDocument executeDoc(LoanDocument loanDoc, String action) throws Exception {

		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_LOAN_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(loanDoc, LoanDocument.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_loan_doc_key") != null) {
				loanDoc.setLoanDocId(Integer.parseInt(outputMap.get("@id_loan_doc_key").toString()));
			}
		}
		catch (Exception e) {
			log.error("Error inserting comment, [{}] \n [{}]", loanDoc.toString(), e);
			throw e;
		}

		return loanDoc;

	}

}
