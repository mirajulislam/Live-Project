Ext.define('Desktop.model.AtmDispute', {
	extend: 'Desktop.model.BaseModel',

	requires: [
		'Ext.data.field.Field'
	],
	fields	: [
			{name : 'customerComplaintKey',	type: 'int'},
			{name : 'customerComplaintVer',	type: 'int'},
			{name : 'txnDate',				type: 'date'},
			{name : 'atmOwner',				type: 'string'},
			{name : 'txnAmount',			type: 'string'},
			{name : 'accountNumber',		type: 'string'},
			{name : 'cardNumber',			type: 'string'},
			{name : 'atmLocation',			type: 'string'},
			{name : 'dataSource',			type: 'string'},
			{name : 'trackingNumber',		type: 'int'},
			{name : 'comment'},
			{name : 'uiActionName',			type: 'string'},
			{name : 'fromDate4Src',			type: 'string'},
			{name : 'toDate4Src',			type: 'string'},
	]
});