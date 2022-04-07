Ext.define('Desktop.model.CibStatusModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'cibStatusName'		, type: 'string'},
	]
});