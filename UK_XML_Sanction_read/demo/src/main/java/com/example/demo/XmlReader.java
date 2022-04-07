package com.example.demo;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.logging.Logger;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class XmlReader {

	private static Logger logger = Logger.getLogger(XmlReader.class.getName());

	public void readXml(){

		try {

			logger.info("Hello World");

			InputStream inputStream = new FileInputStream("C:\\tmp\\UK_Sanctions_List.xml");
			Reader reader = new InputStreamReader(inputStream, "UTF-8");
			InputSource is = new InputSource(reader);
			is.setEncoding("UTF-8");

			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(is);
			doc.getDocumentElement().normalize();

			logger.info("Root element: " + doc.getDocumentElement().getNodeName());

			NodeList nodeList = doc.getElementsByTagName("Designation");
			// nodeList is not iterable, so we are using for loop
			for (int itr = 0; itr < nodeList.getLength(); itr++) {
				Node node = nodeList.item(itr);
				logger.info("\nNode Name :" + node.getNodeName());
				if (node.getNodeType() == Node.ELEMENT_NODE) {
					Element eElement = (Element) node;

					if (eElement.getElementsByTagName("LastUpdated").item(0) != null) {
						logger.info("LastUpdated: "
								+ eElement.getElementsByTagName("LastUpdated").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("DateDesignated").item(0) != null) {
						logger.info("DateDesignated: "
								+ eElement.getElementsByTagName("DateDesignated").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("UniqueID").item(0) != null) {
						logger.info("UniqueID: " + eElement.getElementsByTagName("UniqueID").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("OFSIGroupID").item(0) != null) {
						logger.info("OFSIGroupID: "
								+ eElement.getElementsByTagName("OFSIGroupID").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("UNReferenceNumber").item(0) != null) {
						logger.info("UNReferenceNumber: "
								+ eElement.getElementsByTagName("UNReferenceNumber").item(0).getTextContent());
					}

					NodeList namesNodeList = eElement.getElementsByTagName("Name");
					// nodeList is not iterable, so we are using for loop
					for (int nameItr = 0; nameItr < namesNodeList.getLength(); nameItr++) {
						Node nameNode = namesNodeList.item(nameItr);

						Element nameElement = (Element) nameNode;

						if (nameElement.getElementsByTagName("Name1").item(0) != null) {
							logger.info("Name1: " + nameElement.getElementsByTagName("Name1").item(0).getTextContent());
						}

						if (nameElement.getElementsByTagName("Name2").item(0) != null) {
							logger.info("Name2: " + nameElement.getElementsByTagName("Name2").item(0).getTextContent());
						}

						if (nameElement.getElementsByTagName("Name3").item(0) != null) {
							logger.info("Name3: " + nameElement.getElementsByTagName("Name3").item(0).getTextContent());
						}

						if (nameElement.getElementsByTagName("Name4").item(0) != null) {
							logger.info("Name4: " + nameElement.getElementsByTagName("Name4").item(0).getTextContent());
						}

						if (nameElement.getElementsByTagName("Name5").item(0) != null) {
							logger.info("Name5: " + nameElement.getElementsByTagName("Name5").item(0).getTextContent());
						}

						if (nameElement.getElementsByTagName("Name6").item(0) != null) {
							logger.info("Name6: " + nameElement.getElementsByTagName("Name6").item(0).getTextContent());
						}

						if (nameElement.getElementsByTagName("NameType").item(0) != null) {
							logger.info("NameType: "
									+ nameElement.getElementsByTagName("NameType").item(0).getTextContent());
						}

					}

					NodeList nonLatinNodeList = eElement.getElementsByTagName("NonLatinName");
					// nodeList is not iterable, so we are using for loop
					for (int nonLatinItr = 0; nonLatinItr < nonLatinNodeList.getLength(); nonLatinItr++) {
						Node nonLatinNode = nonLatinNodeList.item(nonLatinItr);

						Element nonLatinElement = (Element) nonLatinNode;

						if (nonLatinElement.getElementsByTagName("NameNonLatinScript").item(0) != null) {

							logger.info("NameNonLatinScript: " + nonLatinElement
									.getElementsByTagName("NameNonLatinScript").item(0).getTextContent());

						}
					}

					if (eElement.getElementsByTagName("RegimeName").item(0) != null) {
						logger.info(
								"RegimeName: " + eElement.getElementsByTagName("RegimeName").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("IndividualEntityShip").item(0) != null) {
						logger.info("IndividualEntityShip: "
								+ eElement.getElementsByTagName("IndividualEntityShip").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("DesignationSource").item(0) != null) {
						logger.info("DesignationSource: "
								+ eElement.getElementsByTagName("DesignationSource").item(0).getTextContent());
					}

					if (eElement.getElementsByTagName("SanctionsImposed").item(0) != null) {
						logger.info("SanctionsImposed: "
								+ eElement.getElementsByTagName("SanctionsImposed").item(0).getTextContent());
					}

					NodeList sanctionsImposedIndicatorsNodeList = eElement
							.getElementsByTagName("SanctionsImposedIndicators");
					// nodeList is not iterable, so we are using for loop
					for (int sanctionsImposedItr = 0; sanctionsImposedItr < sanctionsImposedIndicatorsNodeList
							.getLength(); sanctionsImposedItr++) {
						Node sanctionsImposedNode = sanctionsImposedIndicatorsNodeList.item(sanctionsImposedItr);

						Element sanctionsImposedNodeElement = (Element) sanctionsImposedNode;

						if (sanctionsImposedNodeElement.getElementsByTagName("AssetFreeze").item(0) != null) {

							logger.info("AssetFreeze: " + sanctionsImposedNodeElement
									.getElementsByTagName("AssetFreeze").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("ArmsEmbargo").item(0) != null) {

							logger.info("ArmsEmbargo: " + sanctionsImposedNodeElement
									.getElementsByTagName("ArmsEmbargo").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("TargetedArmsEmbargo").item(0) != null) {

							logger.info("TargetedArmsEmbargo: " + sanctionsImposedNodeElement
									.getElementsByTagName("TargetedArmsEmbargo").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("CharteringOfShips").item(0) != null) {

							logger.info("CharteringOfShips: " + sanctionsImposedNodeElement
									.getElementsByTagName("CharteringOfShips").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("ClosureOfRepresentativeOffices")
								.item(0) != null) {

							logger.info("ClosureOfRepresentativeOffices: " + sanctionsImposedNodeElement
									.getElementsByTagName("ClosureOfRepresentativeOffices").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("CrewServicingOfShipsAndAircraft")
								.item(0) != null) {

							logger.info("CrewServicingOfShipsAndAircraft: " + sanctionsImposedNodeElement
									.getElementsByTagName("CrewServicingOfShipsAndAircraft").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("Deflag").item(0) != null) {

							logger.info("Deflag: " + sanctionsImposedNodeElement.getElementsByTagName("Deflag").item(0)
									.getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("PreventionOfBusinessArrangements")
								.item(0) != null) {

							logger.info("PreventionOfBusinessArrangements: " + sanctionsImposedNodeElement
									.getElementsByTagName("PreventionOfBusinessArrangements").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("ProhibitionOfPortEntry")
								.item(0) != null) {

							logger.info("ProhibitionOfPortEntry: " + sanctionsImposedNodeElement
									.getElementsByTagName("ProhibitionOfPortEntry").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("TravelBan").item(0) != null) {

							logger.info("TravelBan: " + sanctionsImposedNodeElement.getElementsByTagName("TravelBan")
									.item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("PreventionOfCharteringOfShips")
								.item(0) != null) {

							logger.info("PreventionOfCharteringOfShips: " + sanctionsImposedNodeElement
									.getElementsByTagName("PreventionOfCharteringOfShips").item(0).getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("PreventionOfCharteringOfShipsAndAircraft")
								.item(0) != null) {

							logger.info("PreventionOfCharteringOfShipsAndAircraft: " + sanctionsImposedNodeElement
									.getElementsByTagName("PreventionOfCharteringOfShipsAndAircraft").item(0)
									.getTextContent());

						}

						if (sanctionsImposedNodeElement.getElementsByTagName("TechnicalAssistanceRelatedToAircraft")
								.item(0) != null) {

							logger.info("TechnicalAssistanceRelatedToAircraft: " + sanctionsImposedNodeElement
									.getElementsByTagName("TechnicalAssistanceRelatedToAircraft").item(0)
									.getTextContent());

						}

					}

					if (eElement.getElementsByTagName("OtherInformation").item(0) != null) {
						logger.info("OtherInformation: "
								+ eElement.getElementsByTagName("OtherInformation").item(0).getTextContent());
					}

					NodeList addressNodeList = eElement.getElementsByTagName("Address");
					// nodeList is not iterable, so we are using for loop
					for (int addressItr = 0; addressItr < addressNodeList.getLength(); addressItr++) {
						Node addressNode = addressNodeList.item(addressItr);

						Element addressElement = (Element) addressNode;

						if (addressElement.getElementsByTagName("AddressLine1").item(0) != null) {
							logger.info("AddressLine1: "
									+ addressElement.getElementsByTagName("AddressLine1").item(0).getTextContent());

						}

						if (addressElement.getElementsByTagName("AddressLine2").item(0) != null) {
							logger.info("AddressLine2: "
									+ addressElement.getElementsByTagName("AddressLine2").item(0).getTextContent());

						}

						if (addressElement.getElementsByTagName("AddressLine3").item(0) != null) {
							logger.info("AddressLine3: "
									+ addressElement.getElementsByTagName("AddressLine3").item(0).getTextContent());

						}

						if (addressElement.getElementsByTagName("AddressLine4").item(0) != null) {
							logger.info("AddressLine4: "
									+ addressElement.getElementsByTagName("AddressLine4").item(0).getTextContent());

						}

						if (addressElement.getElementsByTagName("AddressLine5").item(0) != null) {
							logger.info("AddressLine5: "
									+ addressElement.getElementsByTagName("AddressLine5").item(0).getTextContent());

						}

						if (addressElement.getElementsByTagName("AddressLine6").item(0) != null) {
							logger.info("AddressLine6: "
									+ addressElement.getElementsByTagName("AddressLine6").item(0).getTextContent());

						}

						if (addressElement.getElementsByTagName("AddressCountry").item(0) != null) {
							logger.info("AddressCountry: "
									+ addressElement.getElementsByTagName("AddressCountry").item(0).getTextContent());

						}

					}

					NodeList phoneNodeList = eElement.getElementsByTagName("PhoneNumber");
					// nodeList is not iterable, so we are using for loop
					for (int phoneItr = 0; phoneItr < phoneNodeList.getLength(); phoneItr++) {
						Node phoneNode = phoneNodeList.item(phoneItr);

						Element phoneElement = (Element) phoneNode;

						if (phoneElement.getFirstChild() != null) {
							logger.info("PhoneNumber: " + phoneElement.getFirstChild().getTextContent());

						}
					}

					NodeList emailNodeList = eElement.getElementsByTagName("EmailAddress");
					// nodeList is not iterable, so we are using for loop
					for (int emailItr = 0; emailItr < emailNodeList.getLength(); emailItr++) {
						Node emailNode = emailNodeList.item(emailItr);

						Element emailElement = (Element) emailNode;

						if (emailElement.getFirstChild() != null) {
							logger.info("EmailAddress: " + emailElement.getFirstChild().getTextContent());

						}
					}
					
					NodeList dobNodeList = eElement.getElementsByTagName("DOB");
					// nodeList is not iterable, so we are using for loop
					for (int dobItr = 0; dobItr < dobNodeList.getLength(); dobItr++) {
						Node dobNode = dobNodeList.item(dobItr);

						Element dobElement = (Element) dobNode;

						if (dobElement.getFirstChild() != null) {
							logger.info("DOB: " + dobElement.getFirstChild().getTextContent());

						}
					}
					
					NodeList nationalityNodeList = eElement.getElementsByTagName("Nationality");
					// nodeList is not iterable, so we are using for loop
					for (int nationalityItr = 0; nationalityItr < nationalityNodeList.getLength(); nationalityItr++) {
						Node nationalityNode = nationalityNodeList.item(nationalityItr);

						Element nationalityElement = (Element) nationalityNode;

						if (nationalityElement.getFirstChild() != null) {
							logger.info("Nationality: " + nationalityElement.getFirstChild().getTextContent());

						}
					}
					
					NodeList positionNodeList = eElement.getElementsByTagName("Position");
					// nodeList is not iterable, so we are using for loop
					for (int positionItr = 0; positionItr < positionNodeList.getLength(); positionItr++) {
						Node positionNode = positionNodeList.item(positionItr);

						Element positionElement = (Element) positionNode;

						if (positionElement.getFirstChild() != null) {
							logger.info("Position: " + positionElement.getFirstChild().getTextContent());

						}
					}
					
					NodeList titleNodeList = eElement.getElementsByTagName("Title");
					// nodeList is not iterable, so we are using for loop
					for (int titleItr = 0; titleItr < titleNodeList.getLength(); titleItr++) {
						Node titleNode = titleNodeList.item(titleItr);

						Element titleElement = (Element) titleNode;

						if (titleElement.getFirstChild() != null) {
							logger.info("Title: " + titleElement.getFirstChild().getTextContent());

						}
					}
					
					NodeList genderNodeList = eElement.getElementsByTagName("Gender");
					// nodeList is not iterable, so we are using for loop
					for (int genderItr = 0; genderItr < genderNodeList.getLength(); genderItr++) {
						Node genderNode = genderNodeList.item(genderItr);

						Element genderElement = (Element) genderNode;

						if (genderElement.getFirstChild() != null) {
							logger.info("Title: " + genderElement.getFirstChild().getTextContent());

						}
					}
					
					
					NodeList locationNodeList = eElement.getElementsByTagName("Location");
					// nodeList is not iterable, so we are using for loop
					for (int locationItr = 0; locationItr < locationNodeList.getLength(); locationItr++) {
						Node locationNode = locationNodeList.item(locationItr);

						Element locationElement = (Element) locationNode;

						if (locationElement.getElementsByTagName("TownOfBirth").item(0) != null) {
							logger.info("TownOfBirth: "
									+ locationElement.getElementsByTagName("TownOfBirth").item(0).getTextContent());

						}

						if (locationElement.getElementsByTagName("CountryOfBirth").item(0) != null) {
							logger.info("CountryOfBirth: "
									+ locationElement.getElementsByTagName("CountryOfBirth").item(0).getTextContent());

						}
					}
					
					
					NodeList passportNodeList = eElement.getElementsByTagName("Passport");
					// nodeList is not iterable, so we are using for loop
					for (int passportItr = 0; passportItr < passportNodeList.getLength(); passportItr++) {
						Node passportNode = passportNodeList.item(passportItr);

						Element passportElement = (Element) passportNode;

						if (passportElement.getElementsByTagName("PassportNumber").item(0) != null) {
							logger.info("PassportNumber: "
									+ passportElement.getElementsByTagName("PassportNumber").item(0).getTextContent());

						}

						if (passportElement.getElementsByTagName("PassportAdditionalInformation").item(0) != null) {
							logger.info("PassportAdditionalInformation: "
									+ passportElement.getElementsByTagName("PassportAdditionalInformation").item(0).getTextContent());

						}
					}

				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
