Ext.define('Desktop.model.AtmDisputeView', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],
	fields	: [
			{name : 'customerComplaintKey'},
			{name : 'customerComplaintVer'},
			{name : 'txnDate'},
			{name : 'atmOwner'},
			{name : 'txnAmount'},
			{name : 'accountNumber'},
			{name : 'cardNumber'},
			{name : 'atmLocation'},
			{name : 'dataSource'},
			{name : 'trackingNumber'},
			{name : 'createDate'},
			{name : 'stateName'},
			{name : 'comment'},
	]
});