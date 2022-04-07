package com.naztech.nid.client;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.naztech.nid.client.adapter.DateDeserializer;
import com.naztech.nid.client.service.ConfigService;
import com.naztech.nid.model.Header;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.model.NidResponse;
import com.naztech.nid.model.RequestHistoryResponse;
import com.naztech.nid.model.SearchHistory;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.PWA;

@Route(value = "nid/fetch")
@PWA(name = "Project Base for Vaadin Flow with Spring", shortName = "Project Base")
public class MainView extends VerticalLayout {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3895909788146993487L;

	private static final Logger log = LoggerFactory.getLogger(MainView.class);

	private static final String DUMMY_IMAGE_URL = "https://dummyimage.com/600x400/000/fff";

	private static final String NID_IMAGE = "NID_IMAGE";
	private static final String NID_PERSON_IMAGE = "NID_PERSON_IMAGE";

	private static final String API_KEY = "sfdsfsd-sdf-dsf-sdf-sd-fds-f125";
	private static final String CONTENT_TYPE_NATIONAL_ID = "NationalId";
	private static final String ACTION_TYPE_FETCH = "FETCH";
	private static final String ACTION_TYPE_SELECT_HISTORY = "SELECT_HISTORY";
	private static final String REQUEST_TYPE_SYNC = "SYNC";
	private static final String REQUEST_TYPE_ASYNC = "ASYNC";
	private static final String DESTINATION_NID = "Nid";

	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	@Autowired
	ConfigService configService;
	
	HorizontalLayout content;
	VerticalLayout leftPanel;
	HorizontalLayout rightPanel;
	Image nidImage;
	Image nidImage2;
	Image personImage;
	Checkbox checkbox;
	
	TextArea errorShower;
	
	TextField nid;
	DatePicker datePicker;
	
	TextField nidForSrc;
	DatePicker dobForSrc;
	
	Grid<SearchHistory> searchHistoryGrid;
	
	Label staticLabel;

	private static Gson gson;
	static {
		GsonBuilder gsonBuilder = new GsonBuilder();
		gsonBuilder.registerTypeAdapter(Date.class, new DateDeserializer());
		gson = gsonBuilder.create();
	}

	public MainView() {
		setSizeFull();

		content = new HorizontalLayout();
		content.setWidthFull();

		leftPanel = new VerticalLayout();
		leftPanel.setWidth("50%");
		leftPanel.setHeight("85%");
		leftPanel.setId("leftPanel");
		
		rightPanel = new HorizontalLayout();
		rightPanel.setWidth("50%");
		rightPanel.setHeight("85%");
		rightPanel.setId("rightPanel");

		add(content);
		content.add(leftPanel);
		content.add(rightPanel);
		
		leftPanel.add(getNidField());
		leftPanel.add(getDatePicker());

		rightPanel.add(getNidImageLayout());
		rightPanel.add(getPersonImageLayout());

		leftPanel.add(getForceRefetchCheckbox());
		
		leftPanel.add(getButtonFetchClear());
		
		leftPanel.add(getErrorShowerTextField());
		
		leftPanel.add(getSearchPanel());
		
		leftPanel.add(getStaticLabel());
		leftPanel.add(getSearchHistoryGrid());
	}

	private Component getStaticLabel() {

		staticLabel = new Label(getGridInfoMsg(0, 0, 0, 0, 0));
		return staticLabel;
	}

	private Component getNidField() {
		
		nid = new TextField();
		nid.setLabel("NID");
		nid.setWidth("50%");
		
		nid.addValueChangeListener(event -> {
			nidForSrc.setValue(nid.getValue());
		});
		
		return nid;
	}

	private Component getDatePicker() {
		
		datePicker = new DatePicker();
		datePicker.setLabel("DOB");
		datePicker.setMinWidth("50%");
		datePicker.setLocale(Locale.CHINA);
		
		datePicker.addValueChangeListener(event ->{
			dobForSrc.setValue(datePicker.getValue());
		});
		
		return datePicker;
	}

	private Component getForceRefetchCheckbox() {
		
		checkbox = new Checkbox();
		checkbox.setLabel("Force Refetch");
		
		return checkbox;
	}
	
	private HorizontalLayout getButtonFetchClear() {
		
		Button buttonFetch = new Button("Fetch", e -> {
			try {
				if (nid.getValue() == null || nid.getValue().length() < 1) {
					//Notification notification = Notification.show("NID Number can not be empty.", 3000, Position.MIDDLE);
					errorShower.setValue("NID Number can not be empty.");
					
					return;
				}

				if (datePicker.getValue() == null) {
					//Notification notification = Notification.show("Date can not be empty.", 3000, Position.MIDDLE);
					errorShower.setValue("Date of Birth(DOB) can not be empty.");
					return;
				}

				handleNidValidation(nid, datePicker, this);
			}
			catch (Exception e2) {
				log.error("Error handling validate {}", e2);
			}

		});
		
		Button buttonClear = new Button("Clear", e -> {
			try {
				nid.clear();
				datePicker.clear();
			}
			catch (Exception e2) {
				log.error("Error handling Clear button {}", e2);
			}

		});

		HorizontalLayout buttonFetchClear =  new HorizontalLayout();
		buttonFetchClear.add(buttonFetch);
		buttonFetchClear.add(buttonClear);
		
		return buttonFetchClear;
	}
	
	private Component getErrorShowerTextField() {
		
		errorShower = new TextArea();
		errorShower.setWidth("50%");
		
		return errorShower;
	}
	
	private VerticalLayout getNidImageLayout() {
		
		VerticalLayout nidImageLayout = new VerticalLayout();
		nidImageLayout.setWidth("50%");

		Label nidImageLabel = new Label("NID");
		nidImage = new Image(DUMMY_IMAGE_URL, "Nid");
		nidImage.setWidth("275px");
		nidImage.setHeight("250px");

		nidImageLayout.add(nidImageLabel);
		nidImageLayout.add(nidImage);
		
		return nidImageLayout;
	}
	
	private VerticalLayout getPersonImageLayout() {
		
		VerticalLayout personImageLayout = new VerticalLayout();
		personImageLayout.setWidth("50%");

		Label personImageLabel = new Label("Person");
		personImage = new Image(DUMMY_IMAGE_URL, "Person Image");
		personImage.setWidth("275px");
		personImage.setHeight("250px");

		personImageLayout.add(personImageLabel);
		personImageLayout.add(personImage);
		
		return personImageLayout;
	}

	private HorizontalLayout getSearchPanel() {
		
		nidForSrc = new TextField();
		nidForSrc.setLabel("NID");
		nidForSrc.setWidth("50%");
		nidForSrc.addThemeName("inline-block");

		dobForSrc = new DatePicker();
		dobForSrc.setLabel("DOB");
		dobForSrc.setWidth("40%");
		dobForSrc.setLocale(Locale.CHINA);
		
		DatePicker formDateForSrc = new DatePicker();
		formDateForSrc.setLabel("From");
		formDateForSrc.setWidth("40%");
		formDateForSrc.setLocale(Locale.CHINA);
		
		DatePicker toDateForSrc = new DatePicker();
		toDateForSrc.setLabel("To");
		toDateForSrc.setWidth("40%");
		toDateForSrc.setLocale(Locale.CHINA);

		Button buttonToAlign= new Button("", e -> {
		});
		buttonToAlign.setHeight("0px");
		
		Button buttonSearch = new Button("Search", e -> {
			try {
				handleSearchHistory(formDateForSrc, toDateForSrc);
			}
			catch (Exception e2) {
				log.error("Error handling Search button {}", e2);
			}
		});
		
		buttonSearch.setWidth("25%");
		
		VerticalLayout btnSearch = new VerticalLayout();
		btnSearch.add(buttonToAlign);
		btnSearch.add(buttonSearch);
		
		HorizontalLayout searchPanel = new HorizontalLayout();
		searchPanel.setWidth("200%");;
		searchPanel.add(nidForSrc);
		searchPanel.add(dobForSrc);
		searchPanel.add(formDateForSrc);
		searchPanel.add(toDateForSrc);
		searchPanel.add(btnSearch);
		
		return searchPanel;
	}
	

	private void handleSearchHistory(DatePicker formDateForSrc, DatePicker toDateForSrc) {
		
		Header header = getHeader();
		header.setActionType(ACTION_TYPE_SELECT_HISTORY);

		NationalId payLoad = new NationalId();

		payLoad.setNid(nidForSrc.getValue());
		payLoad.setDob(dobForSrc.getValue().toString());
		payLoad.setToDate(toDateForSrc.getValue().toString());
		payLoad.setFormDate(formDateForSrc.getValue().toString());

		Map<String, Object> requestBodyMap = new LinkedHashMap<>();
		requestBodyMap.put("header", header);
		requestBodyMap.put("payLoad", payLoad);

		String requestBody = gson.toJson(requestBodyMap);

		try {
			HttpResponse response = HandleHttpPostRequest(configService.getServerUrl(), requestBody);

			if (response == null) {
				errorShower.setValue("Did not get any valid response from server.Please try again.");
				
				log.debug("Did not get any valid response from server");
				return;
			}

			HttpEntity entity = response.getEntity();

			String content = EntityUtils.toString(entity);
			log.debug("Nid Request History resp [{}]", content);
			
			RequestHistoryResponse res = gson.fromJson(content, RequestHistoryResponse.class);

			List<SearchHistory> resList =  res.getPayload();
			
			int success = 0;
			int fail = 0;
			int localCache = 0;
			int nidServer = 0;
			
			for (SearchHistory it : resList) {
				it.setDob(it.getDob() == null ? it.getDob() : it.getDob().split(" ")[0]);
				it.setExtractTime(it.getExtractTime() == null ? it.getExtractTime() : it.getExtractTime().split(" ")[0]);
				it.setRequestDate(it.getRequestDate() == null ? it.getRequestDate() : it.getRequestDate().split(" ")[0]);
				
				if(it.getSuccess() != null && it.getSuccess().equals(1)) success++;
				else fail++;
				
				if(it.getNidSource() != null && it.getNidSource().equals(1)) localCache++;
				else if(it.getNidSource() != null && it.getNidSource().equals(2)) nidServer++;
			}
			
			staticLabel.setText(getGridInfoMsg(resList.size(), success, fail, localCache, nidServer));

			searchHistoryGrid.setItems(resList);
		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}
	}

	private Component getSearchHistoryGrid() {
		
		searchHistoryGrid = new Grid<>(SearchHistory.class);
		
		searchHistoryGrid.setWidth("200%");
		
		return searchHistoryGrid;
	}
	
	private void handleNidValidation(TextField nid, DatePicker datePicker, MainView mainView) {

		Header header = getHeader();
		header.setForceRefetch(checkbox.getValue().toString());

		NationalId payLoad = new NationalId();

		payLoad.setDob(datePicker.getValue().toString());
		payLoad.setNid(nid.getValue());

		Map<String, Object> requestBodyMap = new LinkedHashMap<>();
		requestBodyMap.put("header", header);
		requestBodyMap.put("payLoad", payLoad);

		String requestBody = gson.toJson(requestBodyMap);

		try {
			HttpResponse response = HandleHttpPostRequest(configService.getServerUrl(), requestBody);

			if (response == null) {
				//Notification notification = Notification.show("Did not get any valid response from server.Please try again.", 3000, Position.MIDDLE);
				errorShower.setValue("Did not get any valid response from server.Please try again.");
				
				log.debug("Did not get any valid response from server");
				return;
			}

			HttpEntity entity = response.getEntity();

			String content = EntityUtils.toString(entity);
			log.debug("Nid resp [{}]", content);

			NidResponse res = gson.fromJson(content, NidResponse.class);

			try {
				nidImage.setSrc(res.getPayload().getNidImagePath());
				personImage.setSrc(res.getPayload().getPersonImagePath());
			}
			catch (Exception e) {
				// NID information not Found

				log.error("We can't set Null value, Exception [{}]", e);
				nidImage.setSrc(DUMMY_IMAGE_URL);
				personImage.setSrc(DUMMY_IMAGE_URL);

				//Notification notification = Notification.show(res.getPayload().getComments(), 10000, Position.MIDDLE);
				errorShower.setValue(res.getPayload().getComments());
			}

			//handleFileResponse(entity);

		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}
	}


	private Header getHeader() {
		
		Header header = new com.naztech.nid.model.Header();
		header.setApiKey(API_KEY);
		header.setContentType(CONTENT_TYPE_NATIONAL_ID);
		header.setActionType(ACTION_TYPE_FETCH);
		header.setRequestType(REQUEST_TYPE_SYNC);
		header.setDestination(DESTINATION_NID);
		
		return header;
	}

	private void handleFileResponse(HttpEntity entity) {

		try {
			InputStream inS = entity.getContent();

			File tempFile = File.createTempFile("Test", "zip");

			OutputStream fileOut = new FileOutputStream(new File(tempFile.getPath()));

			byte[] fileContent = IOUtils.toByteArray(inS);

			fileOut.write(fileContent, 0, fileContent.length);

			inS.close();
			fileOut.close();

			log.debug(tempFile.getName() + ": " + tempFile.length() / 1024 + "Kb");

			List<File> fileList = unzipTestTempFile(tempFile);

			for (File file : fileList) {
				log.debug(file.getName() + ": " + file.length() / 1024 + "Kb");

				// not showing file in UI, Need to handle in future
				if (file.getName().contains("_n")) {
					Image nidImageNew = new Image(file.toURI().toString(), "Nid Image");
					nidImage.setSrc(nidImageNew.getSrc());
				}
				if (file.getName().contains("_p")) {
					Image personImageNew = new Image(file.toURI().toString(), "Person Image");
					personImage.setSrc(personImageNew.getSrc());
				}
			}
		}
		catch (Exception e) {
			log.error("Exception Handling File Response [{}]", e);
		}

	}


	private static List<File> unzipTestTempFile(File tempFile) {

		List<File> fileList = new ArrayList<>();

		try {
			FileInputStream fis = new FileInputStream(tempFile);
			ZipInputStream zis = new ZipInputStream(fis);
			ZipEntry ze = zis.getNextEntry();

			while (ze != null) {
				File newFile = File.createTempFile(ze.getName(), "zip");
				FileOutputStream fileOut = new FileOutputStream(newFile);

				byte[] fileContent = IOUtils.toByteArray(zis);

				fileOut.write(fileContent, 0, fileContent.length);

				fileOut.close();

				zis.closeEntry();
				ze = zis.getNextEntry();

				fileList.add(newFile);
			}
			zis.closeEntry();
			zis.close();
			fis.close();
		}
		catch (Exception e) {
			log.error("Exception while trying to UnZip File [{}]", e);
		}

		return fileList;
	}


	private HttpResponse HandleHttpPostRequest(String url, String requestBody) {

		CloseableHttpClient httpclient = HttpClients.createDefault();

		log.info("Sending request to [{}]", url);
		HttpPost request = new HttpPost(url);
		request.setHeader("Content-type", "application/json");

		try {
			log.debug("Json [{}]", requestBody);
			request.setEntity(new StringEntity(requestBody));

			HttpResponse httpResponse = httpclient.execute(request);

			int httpStatus = httpResponse.getStatusLine().getStatusCode();
			log.info("nid resp status [{}]", httpStatus);

			if (httpStatus >= 200 && httpStatus < 300) {
				return httpResponse;
			}
			else {
				return null;
			}
		}
		catch (Exception e) {
			log.error("Error fetching nid {}", e);
			return null;
		}
	}
	
	private String getGridInfoMsg(int total, int success, int fail, int localCache, int nidServer) {
		return "Total: " + total + " , Success/Fail: " + success + "/" + fail + ", Local Cache: " + localCache +" , Nid Server: "+ nidServer;  
	}
}
