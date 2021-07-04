Ext.define('Desktop.model.Comment', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'commentId'		    , type: 'int'},
		{name : 'commentVer'	    , type: 'string'},
		{name : 'objectType'	    , type: 'string'},
		{name : 'commentType'	    , type: 'string'},
		{name : 'refId'			    , type: 'string'},
		{name : 'comments'		    , type: 'string'},
		{name : 'commentedBy'	    , type: 'string'},
		{name : 'createdDate'	    , type: 'date'},
		{name : 'creatorId'		    , type: 'int'},
		{name : 'userModKey'	    , type: 'int'},
		{name : 'commentResponse'	, type: 'string'},
		{name : 'commentResponseBy'	, type: 'string'},
	]
});
