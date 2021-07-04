Ext.define('Desktop.model.StateModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'stateId'		, type: 'int'},
		{name : 'stateVer'		, type: 'int'},
		{name : 'stateName'		, type: 'string'},
		{name : 'permission'	, type: 'int'},
		{name : 'comment'	, type: 'string'},
		{name : 'roleToStateMapVer'	, type: 'int'},

	]
});
