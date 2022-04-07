Ext.define('Desktop.model.CardDocMap', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'cardDocMapKey'				, type: 'int'},
		{name : 'cardDocMapVer'				, type: 'int'},
		{name : 'cardConfigKey'				, type: 'int'},
		{name : 'userModKey'				, type: 'int'},
		{name : 'dttMod'					, type: 'date'},
		{name : 'docType'					, type: 'string'},
		{name : 'isMandatory'				, type: 'int'},
		{name : 'isMandatoryForAllCards'	, type: 'int'},
		{name : 'isDefault'					, type: 'int'}
	]
});
