Ext.define('Desktop.model.RoleModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'roleId'		, type: 'int'},
		{name : 'roleVer'	, type: 'int'},
		{name : 'roleName'	, type: 'string'},
	]
});
