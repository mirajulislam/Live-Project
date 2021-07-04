Ext.define('Desktop.model.BaseModel', {
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
		{name : 'stateId'		, type: 'int'},
		{name : 'idActionKey'	, type: 'int'},
		{name : 'actionId'		, type: 'int'},
		{name : 'actionType'	, type: 'string'},
		{name : 'creatorId'		, type: 'int'},
		{name : 'creatorId'		, type: 'int'},
		{name : 'description'	, type: 'string'},
		{name : 'stateName'		, type: 'string'},
	]
});
