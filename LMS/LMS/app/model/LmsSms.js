Ext.define('Desktop.model.LmsSms', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [	
	{name : 'smsId'			        		, type: 'int'},
	{name : 'smsVersion'			        , type: 'int'},
	{name : 'retryCount'			        , type: 'int'},
	{name : 'clientCbsSmsId'	      	    , type: 'string'},
	{name : 'acctId'		                , type: 'string'},
	{name : 'cellPhone'						, type: 'string'},
	{name : 'status'						, type: 'string'},
	{name : 'smsStatus'						, type: 'string'},
	{name : 'gatewayName'					, type: 'string'},
	{name : 'expiryDateTime'	        	, type: 'date'},
	{name : 'clientRequestDateTime'	        , type: 'date'},
	{name : 'amount'						, type: 'number'},
	{name : 'message'						, type: 'string'},	
	{name : 'loanSendCount'			        , type: 'int'},	
	]
});
