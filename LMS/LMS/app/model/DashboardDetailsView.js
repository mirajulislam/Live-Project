Ext.define('Desktop.model.DashboardDetailsView', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'loanId'},
		{name : 'stateDisplayLabel'},
		{name : 'appliedLoanAmount'},
		{name : 'accountNo'},
		{name : 'loanTrackingId'},
		{name : 'stateDisplayLabel'},

		{name : 'customerIdKey'},
		{name : 'customerId'},
		{name : 'customerName'},
		{name : 'bpNo'},
		{name : 'smsStatus'},
	]
});
