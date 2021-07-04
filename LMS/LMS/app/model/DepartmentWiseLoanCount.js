Ext.define('Desktop.model.DepartmentWiseLoanCount', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'id'		    		, type: 'int'},
		{name : 'date'					, type: 'date'},
		{name : 'fileInPpc'		        , type: 'string'},
		{name : 'fileInCrm'		        , type: 'string'},
		{name : 'fileInCib'		        , type: 'string'},
		{name : 'fileInCad'		        , type: 'string'},
		{name : 'totalFile'		        , type: 'string'},
	]
});
