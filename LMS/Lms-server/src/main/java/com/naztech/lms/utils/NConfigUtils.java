/**
 * 
 */
package com.naztech.lms.utils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.naztech.lms.constants.NConfigStr;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.service.NConfigurationService;

/**
 * @author md.kamruzzaman
 *
 */
public class NConfigUtils {
	private static Logger log = LoggerFactory.getLogger(NConfigUtils.class);

	public static List<NConfiguration> getConfig(String group) {
		return NConfigurationService.configListOnInit.parallelStream().filter(c -> c.getGroup().equals(group)).collect(Collectors.toList());
	}

	public static List<NConfiguration> getConfig(String group, String subGroup) {
		return NConfigurationService.configListOnInit.parallelStream().filter(c -> c.getGroup().equals(group) && c.getSubGroup().equals(subGroup)).collect(Collectors.toList());
	}

	public static NConfiguration getConfig(String group, String subGroup, String name) {
		Optional<NConfiguration> con = NConfigurationService.configListOnInit.parallelStream()
				.filter(c -> c.getGroup().equals(group) && c.getSubGroup().equals(subGroup) && c.getName().equals(name)).findFirst();
		if (con.isPresent())
			return con.get();
		return null;
	}

	public static String getFinacleCustomerUrl() {
		NConfiguration c = getConfig(NConfigStr.CBS, NConfigStr.URL, NConfigStr.FINACLE_CUSTOMER_INFO_URL);
		if (c != null)
			return c.getValue1();
		return null;
	}

	public static String getIOfficeCustomerUrl() {
		NConfiguration c = getConfig(NConfigStr.CBS, NConfigStr.URL, NConfigStr.I_OFFICE_CUSTOMER_INFO_URL);
		if (c != null)
			return c.getValue1();
		return null;
	}
}
