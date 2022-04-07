package com.naztech.nid.client.adapter;

import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;

public class DateDeserializer implements JsonDeserializer<Date> {

	private static final Logger log = LoggerFactory.getLogger(DateDeserializer.class);
	private static SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	public Date deserialize(JsonElement element, Type arg1, JsonDeserializationContext arg2) throws JsonParseException {
		String date = element.getAsString();
		log.debug("Date des [{}]", date);
		if (date == null) {
			return null;
		}
		if (date.length() > 19) {
			date = date.substring(0, 19);
		}

		formatter.setTimeZone(TimeZone.getTimeZone("UTC"));

		try {
			return formatter.parse(date);
		}
		catch (ParseException e) {
			log.error("Error parsing data [{}]", date);
			return null;
		}
	}
}
