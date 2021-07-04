package com.naztech.lms.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.Service;
import com.nazdaqTechnologies.core.service.ServiceMap;
import com.naztech.lms.constants.ContentType;
import com.naztech.lms.constants.Destination;
import com.naztech.lms.constants.ServiceName;

/**
 * @author md.kamruzzaman
 */
public class ServiceCoordinator {

	private static Logger log = LogManager.getLogger(ServiceCoordinator.class);

	private ServiceMap serviceMap;
	private static final String privateAddressList = "privateAddressList";

	// service coordinator
	public Message<?> service(Message<?> msg) throws Exception {

		List<Message> payloadList = null;
		List<Message> msgList = new ArrayList<>();
		Message msgRet = null;

		try {

			if (msg.getHeader().getContentType().equals(ContentType.MULTI_MESSAGE.toString())) {

				payloadList = (List<Message>) msg.getPayload();

				if (!payloadList.isEmpty()) {

					for (Message payload : payloadList) {
						msgRet = handleMessege(payload);
						msgList.add(msgRet);
					}
				}
				msg = MessageBuilder.withPayload(msgList).setHeader(MessageHeader.SOURCE, Destination.destination.toString())
				        .setHeader(MessageHeader.CONTENT_TYPE, msg.getHeader().getContentType())
				        .setHeader(MessageHeader.ACTION_TYPE, msg.getHeader().getActionType())
				        .setHeader(MessageHeader.DESTINATION, Destination.destination.toString()).build();
			}
			else if (msg.getHeader().get(privateAddressList) != null && msg.getHeader().get(privateAddressList).equals(privateAddressList)) {
				msg = handleMessege(msg);
				msg = MessageBuilder.withPayload(msg.getPayload()).setHeader(MessageHeader.SOURCE, Destination.destination.toString())
				        .setHeader(MessageHeader.CONTENT_TYPE, msg.getHeader().getContentType())
				        .setHeader(MessageHeader.ACTION_TYPE, msg.getHeader().getActionType())
				        .setHeader(privateAddressList, msg.getHeader().get(privateAddressList).toString())
				        .setHeader(MessageHeader.DESTINATION, Destination.destination.toString()).build();
			}
			else {

				msg = handleMessege(msg);
				msg = MessageBuilder.withPayload(msg.getPayload()).setHeader(MessageHeader.SOURCE, Destination.destination.toString())
				        .setHeader(MessageHeader.CONTENT_TYPE, msg.getHeader().getContentType())
				        .setHeader(MessageHeader.ACTION_TYPE, msg.getHeader().getActionType())
				        .setHeader(MessageHeader.DESTINATION, Destination.destination.toString()).build();
			}

		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msg;
	}

	// handle message & lookup services
	private Message handleMessege(Message msg) throws Exception {

		String serviceName = msg.getHeader().getContentType();
		// String serviceName = msg.getHeaders().getDestination();

		String actionType = msg.getHeader().getActionType();

		Service serviceHandler;

		try {

			serviceHandler = serviceMap.getServiceByName(serviceName + ServiceName.SERVICE_POSTFIX.toString());
			log.info("Service Lookup {} -> {} ", serviceName, serviceHandler.getServiceName());

			if (serviceHandler != null) {

				msg = serviceHandler.serviceSingle(msg);
			}

		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msg;

	}

	public ServiceMap getServiceMap() {
		return serviceMap;
	}

	public void setServiceMap(ServiceMap serviceMap) {
		this.serviceMap = serviceMap;
	}

}
