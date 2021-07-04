Ext.define('Desktop.model.ExistingLiabilitiesModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'existingLiabilityId'},
		{name : 'bankName'},
		{name : 'product'},
		{name : 'disbursed', type: 'number'},
		{name : 'currentOutstanding', type: 'number'},
		{name : 'eMISize', type: 'number'},
		{name : 'remarks'},
		{name : 'loanId'},
		{name : 'userModKey'}
	]
});
