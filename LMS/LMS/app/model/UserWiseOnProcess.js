Ext.define('Desktop.model.UserWiseOnProcess', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'id'		    , type: 'int'},
		{name : 'name'		                , type: 'string'},
	]
});
