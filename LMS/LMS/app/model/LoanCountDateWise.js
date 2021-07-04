Ext.define('Desktop.model.LoanCountDateWise', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'date'},
		{name : 'entryELoan'},
		{name : 'entryWeb'},
		{name : 'ppcReceived'},
		{name : 'ppcRejcetPending'},
		{name : 'ppcRecommend'},
		{name : 'crmReceived'},
		{name : 'crmRejcetPending'},
		{name : 'crmApproved'},
		{name : 'mdApproved'},
		{name : 'cadSanction'},
		{name : 'cadDisbursed'}
	]
});
