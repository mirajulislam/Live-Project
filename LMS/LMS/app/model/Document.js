Ext.define('Desktop.model.Document', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'cardDocMapKey'	, type: 'int'},
		{name : 'cardDocMapVer'	, type: 'int'},
		{name : 'cardConfigKey'	, type: 'int'},
		{name : 'docId'			, type: 'int'},
		{name : 'isMandatory'	, type: 'int'},
		{name : 'isDefault'		, type: 'int'},
		{name : 'docType'		, type: 'string'},
		{name : 'uploadStatus'	, type: 'int'},
		{name : 'refKey'		, type: 'int'},
		{name : 'downloadLink'	, type: 'string'},
		{name : 'docName'		, type: 'string'},
		{name : 'docPath'		, type: 'string'},
		{name : 'filePresent'	, type: 'int'},
		{name : 'documentKey'	, type: 'int'},
	]
});


