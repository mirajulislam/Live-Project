package com.example.demo;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class ReadXmlSanction {
	private static Logger logger = Logger.getLogger(ReadXmlSanction.class.getName());

	public void readXml() {

		try {

//			logger.info("Hello World");

			InputStream inputStream = new FileInputStream("C:\\tmp\\UK_Sanctions_List.xml");
			Reader reader = new InputStreamReader(inputStream, "UTF-8");
			InputSource is = new InputSource(reader);
			is.setEncoding("UTF-8");

			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(is);
			doc.getDocumentElement().normalize();

//			logger.info("Root element: " + doc.getDocumentElement().getNodeName());

			NodeList nodeList = doc.getElementsByTagName("Designation");
			// nodeList is not iterable, so we are using for loop
			for (int itr = 0; itr < nodeList.getLength(); itr++) {
				Designation designation = new Designation();
				Node node = nodeList.item(itr);
//				logger.info("\nNode Name :" + node.getNodeName());
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) node;

					// designation property
					if (eElement.getElementsByTagName("LastUpdated").item(0) != null) {
//						logger.info("LastUpdated: "
//								+ eElement.getElementsByTagName("LastUpdated").item(0).getTextContent());
						designation
								.setLastUpdated(eElement.getElementsByTagName("LastUpdated").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("DateDesignated").item(0) != null) {
//						logger.info("DateDesignated: "
//								+ eElement.getElementsByTagName("DateDesignated").item(0).getTextContent());
						designation.setDateDesignated(
								eElement.getElementsByTagName("DateDesignated").item(0).getTextContent());
					}
					
					if (eElement.getElementsByTagName("RegimeName").item(0) != null) {
//						logger.info("DateDesignated: "
//								+ eElement.getElementsByTagName("DateDesignated").item(0).getTextContent());
						designation.setRegimeName(
								eElement.getElementsByTagName("RegimeName").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("UniqueID").item(0) != null) {
//						logger.info("UniqueID: " + eElement.getElementsByTagName("UniqueID").item(0).getTextContent());
						designation.setUniqueID(eElement.getElementsByTagName("UniqueID").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("OFSIGroupID").item(0) != null) {
//						logger.info("OFSIGroupID: "
//								+ eElement.getElementsByTagName("OFSIGroupID").item(0).getTextContent());
						designation
								.setOFSIGroupID(eElement.getElementsByTagName("OFSIGroupID").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("UNReferenceNumber").item(0) != null) {
//						logger.info("UNReferenceNumber: "
//								+ eElement.getElementsByTagName("UNReferenceNumber").item(0).getTextContent());
						designation.setUNReceNumber(
								eElement.getElementsByTagName("UNReferenceNumber").item(0).getTextContent());
					}

					designation.setName(readName(eElement));
					designation.setAddress(readAddress(eElement));
					designation.setPhoneNumbers(readPhoneNumbers(eElement));
					designation.setEmailAddresses(readEmailAddress(eElement));
					designation.setSanctionsImposedIndicators(readSanctionsImposedIndicators(eElement));
					designation.setNonLatinName(readNonLatinName(eElement));
					setData(designation);

				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void setData(Designation designation) {

		List<SanctionScreen> sanctionScreenList = new ArrayList<SanctionScreen>();
		PhoneNumbers phoneNumbers = new PhoneNumbers();
		EmailAddresses emailAddresses = new EmailAddresses();
		NonLatinName nonLatinName = new NonLatinName();
		Address address = new Address();

		if (designation.getName().size() > 0 && !designation.getName().isEmpty()) {
			int i = 0;
			int j = 0;
			int k = 0;
			int l = 0;
			for (Name name : designation.getName()) {
				if(!isEmptyString(name.getNameType())) {
				SanctionScreen sanctionScreen = new SanctionScreen();
				
				if(designation.getAddress().isEmpty()) {
					sanctionScreen = setSanctionObj(designation, name, address, phoneNumbers,
							emailAddresses,nonLatinName);
					sanctionScreenList.add(sanctionScreen);
				}else {
				if (designation.getAddress().size() > 0 && !designation.getAddress().isEmpty()) {
					sanctionScreen = setSanctionObj(designation, name, designation.getAddress().get(i), phoneNumbers,
							emailAddresses,nonLatinName);
					i++;
					if (i == designation.getAddress().size()) {
						i = 0;
					}
				}

				if (designation.getNonLatinName().size() > 0 && !designation.getNonLatinName().isEmpty()
						&& designation.getAddress().size() > 0 && !designation.getAddress().isEmpty()) {
					sanctionScreen = setSanctionObj(designation, name, designation.getAddress().get(i),
							phoneNumbers, emailAddresses,designation.getNonLatinName().get(j));
					j++;
					if (j == designation.getNonLatinName().size()) {
						j = 0;
					}
				} 
				
				if (designation.getEmailAddresses().size() > 0 && !designation.getEmailAddresses().isEmpty()
						&& designation.getAddress().size() > 0 && !designation.getAddress().isEmpty()
						&& designation.getNonLatinName().size() > 0 && !designation.getNonLatinName().isEmpty()) {
					sanctionScreen = setSanctionObj(designation, name, designation.getAddress().get(i),
							phoneNumbers, designation.getEmailAddresses().get(k),designation.getNonLatinName().get(j));
					k++;
					if (k == designation.getEmailAddresses().size()) {
						k = 0;
					}
				} 
				
				if (designation.getPhoneNumbers().size() > 0 && !designation.getPhoneNumbers().isEmpty()
						&& designation.getAddress().size() > 0 && !designation.getAddress().isEmpty() 
						&& designation.getEmailAddresses().size() > 0 && !designation.getEmailAddresses().isEmpty()
						&& designation.getNonLatinName().size() > 0 && !designation.getNonLatinName().isEmpty()) {
					sanctionScreen = setSanctionObj(designation, name, designation.getAddress().get(i),
							designation.getPhoneNumbers().get(l), designation.getEmailAddresses().get(k),designation.getNonLatinName().get(j));
					l++;
					if (l == designation.getPhoneNumbers().size()) {
						l = 0;
					}
				} 				
				sanctionScreenList.add(sanctionScreen);
			}
				}
		}
		}

		for (SanctionScreen sanction : sanctionScreenList) {
			logger.info("Sanction Data: " + sanction.toString());
		}

	}

	private SanctionScreen setSanctionObj(Designation designation, Name strName, Address strAddress,
			PhoneNumbers strPhoneNumbers, EmailAddresses strEmailAddresses, NonLatinName nonLatinName) {
		SanctionScreen sanctionScreen = new SanctionScreen();
		sanctionScreen.setLastUpdated(designation.getLastUpdated());
		sanctionScreen.setDateDesignated(designation.getDateDesignated());
		sanctionScreen.setUniqueID(designation.getUniqueID());
		sanctionScreen.setOFSIGroupID(designation.getOFSIGroupID());
		sanctionScreen.setUNReceNumber(designation.getUNReceNumber());
		sanctionScreen.setRegimeName(designation.getRegimeName());
		sanctionScreen.setIndividualEntityShip(designation.getIndividualEntityShip());
		sanctionScreen.setDesignationSource(designation.getDesignationSource());
		sanctionScreen.setSanctionsImposed(designation.getSanctionsImposed());
		sanctionScreen.setOtherInformation(designation.getOtherInformation());

		sanctionScreen.setAssetFreeze(designation.getSanctionsImposedIndicators().getAssetFreeze());
		sanctionScreen.setArmsEmbargo(designation.getSanctionsImposedIndicators().getArmsEmbargo());
		sanctionScreen.setTargetedArmsEmbargo(designation.getSanctionsImposedIndicators().getTargetedArmsEmbargo());
		sanctionScreen.setCharteringOfShips(designation.getSanctionsImposedIndicators().getCharteringOfShips());
		sanctionScreen.setClosureOfRepresentativeOffices(
				designation.getSanctionsImposedIndicators().getClosureOfRepresentativeOffices());
		sanctionScreen.setCrewServicingOfShipsAndAircraft(
				designation.getSanctionsImposedIndicators().getCrewServicingOfShipsAndAircraft());
		sanctionScreen.setDeflag(designation.getSanctionsImposedIndicators().getDeflag());
		sanctionScreen.setPreventionOfBusinessArrangements(
				designation.getSanctionsImposedIndicators().getPreventionOfBusinessArrangements());
		sanctionScreen
				.setProhibitionOfPortEntry(designation.getSanctionsImposedIndicators().getProhibitionOfPortEntry());
		sanctionScreen.setTravelBan(designation.getSanctionsImposedIndicators().getTravelBan());
		sanctionScreen.setPreventionOfCharteringOfShips(
				designation.getSanctionsImposedIndicators().getPreventionOfCharteringOfShips());
		sanctionScreen.setPreventionOfCharteringOfShipsAndAircraft(
				designation.getSanctionsImposedIndicators().getPreventionOfCharteringOfShipsAndAircraft());
		sanctionScreen.setTechnicalAssistanceRelatedToAircraft(
				designation.getSanctionsImposedIndicators().getTechnicalAssistanceRelatedToAircraft());

		sanctionScreen.setName1(strName.getName1());
		sanctionScreen.setName2(strName.getName2());
		sanctionScreen.setName3(strName.getName3());
		sanctionScreen.setName4(strName.getName4());
		sanctionScreen.setName5(strName.getName5());
		sanctionScreen.setName6(strName.getName6());
		sanctionScreen.setNameType(strName.getNameType());
		sanctionScreen.setAddressLine1(strAddress.getAddressLine1());
		sanctionScreen.setAddressLine2(strAddress.getAddressLine2());
		sanctionScreen.setAddressLine3(strAddress.getAddressLine3());
		sanctionScreen.setAddressLine4(strAddress.getAddressLine4());
		sanctionScreen.setAddressLine5(strAddress.getAddressLine5());
		sanctionScreen.setAddressLine6(strAddress.getAddressLine6());
		sanctionScreen.setAddressCountry(strAddress.getAddressCountry());
		sanctionScreen.setPhoneNumber(strPhoneNumbers.getPhoneNumber());
		sanctionScreen.setEmailAddress(strEmailAddresses.getEmailAddress());
		sanctionScreen.setNameNonLatinScript(nonLatinName.getNameNonLatinScript());
		return sanctionScreen;
	}

	private List<Name> readName(Element eElement) {
		List<Name> nameList = new ArrayList<Name>();
		NodeList namesNodeList = eElement.getElementsByTagName("Name");
		// nodeList is not iterable, so we are using for loop
		for (int nameItr = 0; nameItr < namesNodeList.getLength(); nameItr++) {
			Node nameNode = namesNodeList.item(nameItr);

			Element nameElement = (Element) nameNode;
			Name nameStr = new Name();

			if (nameElement.getElementsByTagName("Name1").item(0) != null) {
//				logger.info("Name1: " + nameElement.getElementsByTagName("Name1").item(0).getTextContent());
				nameStr.setName1(nameElement.getElementsByTagName("Name1").item(0).getTextContent());
			}

			if (nameElement.getElementsByTagName("Name2").item(0) != null) {
//				logger.info("Name2: " + nameElement.getElementsByTagName("Name2").item(0).getTextContent());
				nameStr.setName2(nameElement.getElementsByTagName("Name2").item(0).getTextContent());
			}

			if (nameElement.getElementsByTagName("Name3").item(0) != null) {
//				logger.info("Name3: " + nameElement.getElementsByTagName("Name3").item(0).getTextContent());
				nameStr.setName3(nameElement.getElementsByTagName("Name3").item(0).getTextContent());
			}

			if (nameElement.getElementsByTagName("Name4").item(0) != null) {
//				logger.info("Name4: " + nameElement.getElementsByTagName("Name4").item(0).getTextContent());
				nameStr.setName4(nameElement.getElementsByTagName("Name4").item(0).getTextContent());
			}

			if (nameElement.getElementsByTagName("Name5").item(0) != null) {
//				logger.info("Name5: " + nameElement.getElementsByTagName("Name5").item(0).getTextContent());
				nameStr.setName5(nameElement.getElementsByTagName("Name5").item(0).getTextContent());
			}

			if (nameElement.getElementsByTagName("Name6").item(0) != null) {
//				logger.info("Name6: " + nameElement.getElementsByTagName("Name6").item(0).getTextContent());
				nameStr.setName6(nameElement.getElementsByTagName("Name6").item(0).getTextContent());
			}

			if (nameElement.getElementsByTagName("NameType").item(0) != null) {
//				logger.info("NameType: " + nameElement.getElementsByTagName("NameType").item(0).getTextContent());
				nameStr.setNameType(nameElement.getElementsByTagName("NameType").item(0).getTextContent());
			}
			nameList.add(nameStr);

		}
		return nameList;
	}

	private List<Address> readAddress(Element eElement) {
		List<Address> addressList = new ArrayList<Address>();
		NodeList addressNodeList = eElement.getElementsByTagName("Address");
		// nodeList is not iterable, so we are using for loop
		for (int addressItr = 0; addressItr < addressNodeList.getLength(); addressItr++) {
			Node addressNode = addressNodeList.item(addressItr);

			Element addressElement = (Element) addressNode;
			Address addressStr = new Address();

			if (addressElement.getElementsByTagName("AddressLine1").item(0) != null) {
//				logger.info("AddressLine1: "
//						+ addressElement.getElementsByTagName("AddressLine1").item(0).getTextContent());
				addressStr
						.setAddressLine1(addressElement.getElementsByTagName("AddressLine1").item(0).getTextContent());
			}

			if (addressElement.getElementsByTagName("AddressLine2").item(0) != null) {
//				logger.info("AddressLine2: "
//						+ addressElement.getElementsByTagName("AddressLine2").item(0).getTextContent());
				addressStr
						.setAddressLine2(addressElement.getElementsByTagName("AddressLine2").item(0).getTextContent());
			}

			if (addressElement.getElementsByTagName("AddressLine3").item(0) != null) {
//				logger.info("AddressLine3: "
//						+ addressElement.getElementsByTagName("AddressLine3").item(0).getTextContent());
				addressStr
						.setAddressLine3(addressElement.getElementsByTagName("AddressLine3").item(0).getTextContent());
			}

			if (addressElement.getElementsByTagName("AddressLine4").item(0) != null) {
//				logger.info("AddressLine4: "
//						+ addressElement.getElementsByTagName("AddressLine4").item(0).getTextContent());
				addressStr
						.setAddressLine4(addressElement.getElementsByTagName("AddressLine4").item(0).getTextContent());
			}

			if (addressElement.getElementsByTagName("AddressLine5").item(0) != null) {
//				logger.info("AddressLine5: "
//						+ addressElement.getElementsByTagName("AddressLine5").item(0).getTextContent());
				addressStr
						.setAddressLine5(addressElement.getElementsByTagName("AddressLine5").item(0).getTextContent());
			}

			if (addressElement.getElementsByTagName("AddressLine6").item(0) != null) {
//				logger.info("AddressLine6: "
//						+ addressElement.getElementsByTagName("AddressLine6").item(0).getTextContent());
				addressStr
						.setAddressLine6(addressElement.getElementsByTagName("AddressLine6").item(0).getTextContent());
			}

			if (addressElement.getElementsByTagName("AddressCountry").item(0) != null) {
//				logger.info("AddressCountry: "
//						+ addressElement.getElementsByTagName("AddressCountry").item(0).getTextContent());
				addressStr.setAddressCountry(
						addressElement.getElementsByTagName("AddressCountry").item(0).getTextContent());
			}

			addressList.add(addressStr);

		}
		return addressList;
	}

	private List<NonLatinName> readNonLatinName(Element eElement) {

		List<NonLatinName> nonLatinNameList = new ArrayList<NonLatinName>();
		NodeList nonLatinNodeList = eElement.getElementsByTagName("NonLatinName");
		// nodeList is not iterable, so we are using for loop
		for (int nonLatinItr = 0; nonLatinItr < nonLatinNodeList.getLength(); nonLatinItr++) {
			Node nonLatinNode = nonLatinNodeList.item(nonLatinItr);
			NonLatinName nonLatinName = new NonLatinName();

			Element nonLatinElement = (Element) nonLatinNode;

			if (nonLatinElement.getElementsByTagName("NameNonLatinScript").item(0) != null) {
				nonLatinName.setNameNonLatinScript(nonLatinElement.getElementsByTagName("NameNonLatinScript").item(0).getTextContent());
			}
			nonLatinNameList.add(nonLatinName);
		}


		return nonLatinNameList;
	}

	private List<PhoneNumbers> readPhoneNumbers(Element eElement) {

		List<PhoneNumbers> phoneNumberList = new ArrayList<PhoneNumbers>();
		NodeList phoneNumberNodeList = eElement.getElementsByTagName("PhoneNumber");
		// nodeList is not iterable, so we are using for loop
		for (int phoneNuberItr = 0; phoneNuberItr < phoneNumberNodeList.getLength(); phoneNuberItr++) {
			Node phoneNumberNode = phoneNumberNodeList.item(phoneNuberItr);

			Element phoneNumberElement = (Element) phoneNumberNode;
			PhoneNumbers phoneNumberStr = new PhoneNumbers();

			if (phoneNumberElement.getFirstChild() != null) {
//				logger.info("PhoneNumber: " + phoneNumberElement.getFirstChild().getTextContent());
				phoneNumberStr.setPhoneNumber(phoneNumberElement.getFirstChild().getTextContent());
			}

			phoneNumberList.add(phoneNumberStr);

		}
		return phoneNumberList;
	}

	private List<EmailAddresses> readEmailAddress(Element eElement) {
		List<EmailAddresses> emailAddressesList = new ArrayList<EmailAddresses>();
		NodeList emailAddressesNodeList = eElement.getElementsByTagName("EmailAddress");
		// nodeList is not iterable, so we are using for loop
		for (int emailAddressItr = 0; emailAddressItr < emailAddressesNodeList.getLength(); emailAddressItr++) {
			Node emailAddressNode = emailAddressesNodeList.item(emailAddressItr);

			Element emailAddressElement = (Element) emailAddressNode;
			EmailAddresses emailAddressStr = new EmailAddresses();

			if (emailAddressElement.getFirstChild() != null) {
//				logger.info("EmailAddress: " + emailAddressElement.getFirstChild().getTextContent());
				emailAddressStr.setEmailAddress(emailAddressElement.getFirstChild().getTextContent());
			}

			emailAddressesList.add(emailAddressStr);

		}
		return emailAddressesList;
	}

	private SanctionsImposedIndicators readSanctionsImposedIndicators(Element eElement) {

		SanctionsImposedIndicators sanctionsImposedIndicators = new SanctionsImposedIndicators();

		NodeList sanctionsImposedIndicatorsNodeList = eElement.getElementsByTagName("SanctionsImposedIndicators");
		// nodeList is not iterable, so we are using for loop
		for (int sanctionsImposedItr = 0; sanctionsImposedItr < sanctionsImposedIndicatorsNodeList
				.getLength(); sanctionsImposedItr++) {
			Node sanctionsImposedNode = sanctionsImposedIndicatorsNodeList.item(sanctionsImposedItr);

			Element sanctionsImposedNodeElement = (Element) sanctionsImposedNode;

			if (sanctionsImposedNodeElement.getElementsByTagName("AssetFreeze").item(0) != null) {

//				logger.info("AssetFreeze: "
//						+ sanctionsImposedNodeElement.getElementsByTagName("AssetFreeze").item(0).getTextContent());
				sanctionsImposedIndicators.setAssetFreeze(
						sanctionsImposedNodeElement.getElementsByTagName("AssetFreeze").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("ArmsEmbargo").item(0) != null) {

//				logger.info("ArmsEmbargo: "
//						+ sanctionsImposedNodeElement.getElementsByTagName("ArmsEmbargo").item(0).getTextContent());
				sanctionsImposedIndicators.setArmsEmbargo(
						sanctionsImposedNodeElement.getElementsByTagName("ArmsEmbargo").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("TargetedArmsEmbargo").item(0) != null) {

//				logger.info("TargetedArmsEmbargo: " + sanctionsImposedNodeElement
//						.getElementsByTagName("TargetedArmsEmbargo").item(0).getTextContent());

				sanctionsImposedIndicators.setTargetedArmsEmbargo(sanctionsImposedNodeElement
						.getElementsByTagName("TargetedArmsEmbargo").item(0).getTextContent());
			}

			if (sanctionsImposedNodeElement.getElementsByTagName("CharteringOfShips").item(0) != null) {

//				logger.info("CharteringOfShips: " + sanctionsImposedNodeElement
//						.getElementsByTagName("CharteringOfShips").item(0).getTextContent());
				sanctionsImposedIndicators.setCharteringOfShips(
						sanctionsImposedNodeElement.getElementsByTagName("CharteringOfShips").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("ClosureOfRepresentativeOffices").item(0) != null) {

//				logger.info("ClosureOfRepresentativeOffices: " + sanctionsImposedNodeElement
//						.getElementsByTagName("ClosureOfRepresentativeOffices").item(0).getTextContent());
				sanctionsImposedIndicators.setClosureOfRepresentativeOffices(sanctionsImposedNodeElement
						.getElementsByTagName("ClosureOfRepresentativeOffices").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("CrewServicingOfShipsAndAircraft").item(0) != null) {

//				logger.info("CrewServicingOfShipsAndAircraft: " + sanctionsImposedNodeElement
//						.getElementsByTagName("CrewServicingOfShipsAndAircraft").item(0).getTextContent());
				sanctionsImposedIndicators.setCrewServicingOfShipsAndAircraft(sanctionsImposedNodeElement
						.getElementsByTagName("CrewServicingOfShipsAndAircraft").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("Deflag").item(0) != null) {

//				logger.info("Deflag: "
//						+ sanctionsImposedNodeElement.getElementsByTagName("Deflag").item(0).getTextContent());
				sanctionsImposedIndicators
						.setDeflag(sanctionsImposedNodeElement.getElementsByTagName("Deflag").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("PreventionOfBusinessArrangements").item(0) != null) {

//				logger.info("PreventionOfBusinessArrangements: " + sanctionsImposedNodeElement
//						.getElementsByTagName("PreventionOfBusinessArrangements").item(0).getTextContent());
				sanctionsImposedIndicators.setPreventionOfBusinessArrangements(sanctionsImposedNodeElement
						.getElementsByTagName("PreventionOfBusinessArrangements").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("ProhibitionOfPortEntry").item(0) != null) {

//				logger.info("ProhibitionOfPortEntry: " + sanctionsImposedNodeElement
//						.getElementsByTagName("ProhibitionOfPortEntry").item(0).getTextContent());
				sanctionsImposedIndicators.setProhibitionOfPortEntry(sanctionsImposedNodeElement
						.getElementsByTagName("ProhibitionOfPortEntry").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("TravelBan").item(0) != null) {

//				logger.info("TravelBan: "
//						+ sanctionsImposedNodeElement.getElementsByTagName("TravelBan").item(0).getTextContent());
				sanctionsImposedIndicators.setTravelBan(
						sanctionsImposedNodeElement.getElementsByTagName("TravelBan").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("PreventionOfCharteringOfShips").item(0) != null) {

//				logger.info("PreventionOfCharteringOfShips: " + sanctionsImposedNodeElement
//						.getElementsByTagName("PreventionOfCharteringOfShips").item(0).getTextContent());
				sanctionsImposedIndicators.setPreventionOfCharteringOfShips(sanctionsImposedNodeElement
						.getElementsByTagName("PreventionOfCharteringOfShips").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("PreventionOfCharteringOfShipsAndAircraft")
					.item(0) != null) {

//				logger.info("PreventionOfCharteringOfShipsAndAircraft: " + sanctionsImposedNodeElement
//						.getElementsByTagName("PreventionOfCharteringOfShipsAndAircraft").item(0).getTextContent());
				sanctionsImposedIndicators.setPreventionOfCharteringOfShipsAndAircraft(sanctionsImposedNodeElement
						.getElementsByTagName("PreventionOfCharteringOfShipsAndAircraft").item(0).getTextContent());

			}

			if (sanctionsImposedNodeElement.getElementsByTagName("TechnicalAssistanceRelatedToAircraft")
					.item(0) != null) {

//				logger.info("TechnicalAssistanceRelatedToAircraft: " + sanctionsImposedNodeElement
//						.getElementsByTagName("TechnicalAssistanceRelatedToAircraft").item(0).getTextContent());
				sanctionsImposedIndicators.setTechnicalAssistanceRelatedToAircraft(sanctionsImposedNodeElement
						.getElementsByTagName("TechnicalAssistanceRelatedToAircraft").item(0).getTextContent());

			}

		}
		return sanctionsImposedIndicators;
	}
	
	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}

}
