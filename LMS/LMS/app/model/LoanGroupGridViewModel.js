Ext.define('Desktop.model.LoanGroupGridViewModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'loanId'},
		{name : 'applicationNo'},
		{name : 'accountNo'},
		{name : 'idLoanTypeKey'},
		{name : 'idCustomerTypeKey'},
		{name : 'appliedLoanAmount'},
		{name : 'purposeOfLoan'},
		{name : 'interestRate'},
		{name : 'monthlyInstallment'},
		{name : 'mobile'},
		
		{name : 'customerIdKey'},
		{name : 'customerId'},
		{name : 'customerType'},
		{name : 'bpNo'},
		{name : 'customerName'},
		{name : 'designation'},
		{name : 'dateOfBirth'},
		{name : 'joiningDate'},
		{name : 'permanentAddr'},
		{name : 'officeAddr'},
		{name : 'nid'},
		{name : 'tin'},
		{name : 'maritalStatus'},
		{name : 'motherName'},
		{name : 'fatherName'},
		{name : 'spouse'},
		{name : 'stateDisplayLabel'},
		{name : 'locked', type:'number'},
		{name : 'permission', type:'number'},
		{name : 'recommendedForApproval'},
		{name : 'legalEntityName'},
		{name : 'loanGroupId'},
		{name : 'loanGroupCreator'},
		{name : 'inGroup'},
	]
});
