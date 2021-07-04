Ext.define('Desktop.model.LegalEntity', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields: [
		{
			name: 'alias'
		},
		{
			name: 'name'
		},
		{
			name: 'id'
		},
		{
			name: 'branchId'
		},
		{
			name: 'description'
		},
		{
			name: 'mode'
		}
	]
});