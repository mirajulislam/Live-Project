Ext.define('Desktop.model.LoanDocMap', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'loanDocMapId'				, type: 'int'},
		{name : 'loanDocMapVer'				, type: 'int'},
		{name : 'loanConfigId'				, type: 'int'},
		{name : 'userModKey'				, type: 'int'},
		{name : 'dttMod'					, type: 'date'},
		{name : 'docType'					, type: 'string'},
		{name : 'isMandatory'				, type: 'int'},
		{name : 'isMandatoryForAllLoans'	, type: 'int'},
		{name : 'isDefault'					, type: 'int'}
	]
});
