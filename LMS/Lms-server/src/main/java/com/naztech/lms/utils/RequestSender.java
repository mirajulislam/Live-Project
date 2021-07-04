package com.naztech.lms.utils;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;
import org.apache.http.util.EntityUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;
import com.google.gson.JsonSyntaxException;

/**
 * This class responsible for sending request to external server.
 * <br>
 * All request will send as POST request
 * 
 * <pre>
 * HttpResponse response = RequestSender.send(url, json);
 * int httpStatus = response.getStatusLine().getStatusCode();
 * String responseBody = EntityUtils.toString(response.getEntity());
 * <br>
 * 
 * @author md.kamruzzaman
 */
public class RequestSender {
	private static Logger log = LogManager.getLogger(RequestSender.class);

	private static Gson gson;

	private static Gson buildGson() {
		if (gson == null) {
			gson = new GsonBuilder().registerTypeAdapter(Double.class, new JsonSerializer<Double>() {
				@Override
				public JsonElement serialize(Double src, Type typeOfSrc, JsonSerializationContext context) {
					if (null == src) return null;
					BigDecimal value = BigDecimal.valueOf(src);
					return new JsonPrimitive(value);
				}
			}).create();;
		}
		return gson;
	}

	/**
	 * return generate gson
	 * 
	 * @return
	 */
	public static Gson getGson() {
		if (null == gson) {
			buildGson();
		}
		return gson;
	}

	/**
	 * @param url
	 * @param json
	 * @return
	 * @throws Exception
	 */
	private static HttpResponse send(final String url, final String json) throws Exception {
		log.info("Sending request to [{}]", url);
		log.debug("Request json [{}]", json);

		CloseableHttpClient client = getCloseableHttpClient();
		HttpPost httpPost = new HttpPost(url);

		httpPost.setEntity(new StringEntity(json));
		return client.execute(httpPost);

	}

	private static HttpResponse sendGet(final String url, final Map<String, String> params) throws Exception {
		log.info("Sending request to [{}], params : [{}]", url, params);
		CloseableHttpClient client = getCloseableHttpClient();
		URIBuilder builder = new URIBuilder(url);
		if (params != null) {
			for (Map.Entry<String, String> entry : params.entrySet()) {
				builder.addParameter(entry.getKey(), entry.getValue());
			}
		}
		HttpGet http = new HttpGet(builder.build());

		return client.execute(http);
	}

	public static String sendGet4Str(final String url, final Map<String, String> params) throws Exception {
		String response = null;
		HttpResponse httpResponse = sendGet(url, params);
		int httpStatus = httpResponse.getStatusLine().getStatusCode();
		if (httpStatus >= 200 && httpStatus < 300) {
			HttpEntity entity = httpResponse.getEntity();
			response = EntityUtils.toString(entity, StandardCharsets.UTF_8.toString());
		}
		return response;
	}

	/**
	 * Send request to spacific url with NameValuePair
	 * 
	 * @param url
	 * @param params
	 *            {@link NameValuePair}
	 * @return HttpResponse
	 * @throws Exception
	 */
	public static HttpResponse send(final String url, final List<NameValuePair> params) throws Exception {
		CloseableHttpClient httpClient = getCloseableHttpClient();
		HttpPost httpPost = new HttpPost(url);
		httpPost.setEntity(new UrlEncodedFormEntity(params));
		return httpClient.execute(httpPost);
	}

	/**
	 * Send request to spacific url with NameValuePair
	 * 
	 * @param url
	 * @param params
	 *            {@link NameValuePair}
	 * @return String
	 * @throws Exception
	 */
	public static String send4Str(final String url, final List<NameValuePair> params) throws Exception {
		String response = null;
		HttpResponse httpResponse = send(url, params);
		int httpStatus = httpResponse.getStatusLine().getStatusCode();
		if (httpStatus >= 200 && httpStatus < 300) {
			HttpEntity entity = httpResponse.getEntity();
			response = EntityUtils.toString(entity, StandardCharsets.UTF_8.toString());
		}
		return response;
	}

	public static String send4Str(final String url, final String json) throws Exception {
		String response = null;
		HttpResponse httpResponse = send(url, json);
		int httpStatus = httpResponse.getStatusLine().getStatusCode();
		if (httpStatus >= 200 && httpStatus < 300) {
			HttpEntity entity = httpResponse.getEntity();
			response = EntityUtils.toString(entity, StandardCharsets.UTF_8.toString());
		}
		else {
			throw new Exception("Can not connecto to [" + url + "]");
		}
		return response;
	}

	/**
	 * @param url
	 * @param message
	 * @return
	 * @throws Exception
	 */
	public static HttpResponse send(final String url, final Object message) throws Exception {
		return send(url, buildGson().toJson(message));
	}

	/**
	 * @param obj
	 * @return
	 */
	public static String makeJson(final Object obj) {
		return buildGson().toJson(obj);
	}

	public static boolean isJson(final String json) throws Exception {
		try {
			new JsonParser().parse(json);
		}
		catch (JsonSyntaxException ex) {
			return false;
		}
		return true;
	}

	public static CloseableHttpClient getCloseableHttpClient() {
		CloseableHttpClient httpClient = null;
		try {
			httpClient = HttpClients.custom().setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
			        .setSSLContext(new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				        @Override
				        public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
					        return true;
				        }
			        }).build()).build();
		}
		catch (KeyManagementException e) {
			log.error("KeyManagementException in creating http client instance", e);
		}
		catch (NoSuchAlgorithmException e) {
			log.error("NoSuchAlgorithmException in creating http client instance", e);
		}
		catch (KeyStoreException e) {
			log.error("KeyStoreException in creating http client instance", e);
		}
		return httpClient;
	}

}
