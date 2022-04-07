Ext.define('Desktop.model.DuplicationGridModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'loanId'},
		{name : 'creditCardId'},
		{name : 'trackingNumber'},
		{name : 'status'},
		{name : 'statusDate'},
		{name : 'approvedAmount'},
		{name : 'loanAcount'},
		{name : 'disbursedAmount'},
		{name : 'disbursedDate'},
		{name : 'emiPaidOutOf'},
		{name : 'emiSize'},
		{name : 'outstanding'},
		{name : 'product'},
	]
});
