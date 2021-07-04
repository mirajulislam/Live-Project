Ext.define('Desktop.model.SourceModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'dataSource'	, type: 'string'},
	]
});
