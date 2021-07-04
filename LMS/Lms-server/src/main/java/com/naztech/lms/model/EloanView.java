/**
 * 
 */
package com.naztech.lms.model;

import java.util.ArrayList;
import java.util.List;


/**
 * @author mirajul.islam
 *
 */
public class EloanView {
	private Integer totalCount;
	private List<LoanGridView> loandList;
	List<String> stateList = new ArrayList<>();
		
	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public List<LoanGridView> getLoandList() {
		return loandList;
	}

	public void setLoandList(List<LoanGridView> loandList) {
		this.loandList = loandList;
	}

	public List<String> getStateList() {
		return stateList;
	}

	public void setStateList(List<String> stateList) {
		this.stateList = stateList;
	}
	
	
}
