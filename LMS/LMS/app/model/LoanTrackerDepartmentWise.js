Ext.define('Desktop.model.LoanTrackerDepartmentWise', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'date'},
		{name : 'fieldOfficerCount'},
		{name : 'ppcCount'},
		{name : 'crmCount'},
		{name : 'cadCount'},
		{name : 'loanTrackerTotal'}
	]
});