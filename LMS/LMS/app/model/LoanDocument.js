Ext.define('Desktop.model.LoanDocument', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'loanDocMapId'	, type: 'int'},
		{name : 'loanDocMapVer'	, type: 'int'},
		{name : 'loanConfigId'	, type: 'int'},
		{name : 'docId'			, type: 'int'},
		{name : 'isMandatory'	, type: 'int'},
		{name : 'isDefault'		, type: 'int'},
		{name : 'docType'		, type: 'string'},
		{name : 'uploadStatus'	, type: 'int'},
		{name : 'loanId'		, type: 'int'},
		{name : 'downloadLink'	, type: 'string'},
		{name : 'docName'		, type: 'string'},
		{name : 'docPath'		, type: 'string'},
		{name : 'filePresent'	, type: 'int'},
	]
});


