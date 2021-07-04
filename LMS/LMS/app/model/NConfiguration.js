Ext.define('Desktop.model.NConfiguration', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'configurationId'		    , type: 'int'},
		{name : 'configurationVer'		    , type: 'int'},
		{name : 'readOnly'		            , type: 'int'},
		{name : 'group'				        , type: 'string'},
		{name : 'subGroup'				    , type: 'string'},
		{name : 'name'		                , type: 'string'},
		{name : 'serialNo'                  , type: 'int'},
		{name : 'dttMod'                    , type: 'date'},
		{name : 'modifiedBy'              	, type: 'string'},
		{name : 'value1'				    , type: 'string'},
		{name : 'value2'				 	, type: 'string'},
		{name : 'value3'				    , type: 'string'},
		{name : 'desc'				        , type: 'string'},
		{name : 'comment'			        , type: 'string'},
		{name : 'valueType'	                , type: 'string'},
	]
});
