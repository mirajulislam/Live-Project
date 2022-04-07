Ext.define('Desktop.model.AcquisitionBase', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'active'		, type: 'int'},
		{name : 'idEnvKey'		, type: 'int'},
		{name : 'userModKey'	, type: 'int'},
		{name : 'dttMod'		, type: 'date'},
		{name : 'createDate'	, type: 'date'},
		{name : 'idEventKey'	, type: 'int'},
		{name : 'creatorId'		, type: 'int'},
		{nane :  'createdName'	, type: 'string'},
	]
});
