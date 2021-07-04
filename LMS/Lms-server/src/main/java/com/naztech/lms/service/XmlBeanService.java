package com.naztech.lms.service;

import java.util.List;
import java.util.Map;

public class XmlBeanService {

	Map<String, List<String>> recommendationStateRoleMap;
	Map<String, List<String>> returnStateRoleMap;

	public Map<String, List<String>> getRecommendationStateRoleMap() {
		return recommendationStateRoleMap;
	}

	public void setRecommendationStateRoleMap(Map<String, List<String>> recommendationStateRoleMap) {
		this.recommendationStateRoleMap = recommendationStateRoleMap;
	}

	public Map<String, List<String>> getReturnStateRoleMap() {
		return returnStateRoleMap;
	}

	public void setReturnStateRoleMap(Map<String, List<String>> returnStateRoleMap) {
		this.returnStateRoleMap = returnStateRoleMap;
	}

}
