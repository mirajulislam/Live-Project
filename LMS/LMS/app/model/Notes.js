Ext.define('Desktop.model.Notes', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'notesId'		, type: 'int'},
		{name : 'notesVer'	    , type: 'int'},
		{name : 'refId'			, type: 'int'},
		{name : 'loanNotes'		, type: 'string'},
		{name : 'notesBy'	    , type: 'string'},
		{name : 'createDate'	, type: 'date'},
		{name : 'creatorId'		, type: 'int'},
		{name : 'userModKey'	, type: 'int'},
	]
});
