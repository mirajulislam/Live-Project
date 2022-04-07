Ext.define('Desktop.view.card.CardRejUnlockComments', {
	extend : 'Ext.panel.Panel',
	title : "Comment",
	requires: [
	    'Desktop.view.card.CardController',
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.grid.Panel',
		'Ext.grid.column.Boolean',
		'Ext.toolbar.Toolbar',
		'Ext.form.field.Text',
		'Ext.tree.Panel',
		'Ext.tree.View',
		'Ext.grid.filters.filter.Number',
		'Ext.grid.column.Date',
		'Ext.grid.filters.filter.Date',
		'Ext.grid.filters.filter.String',
		'Ext.grid.filters.filter.Boolean',
		'Ext.selection.CheckboxModel',
		'Ext.grid.filters.Filters',
		'Ext.grid.feature.Summary',
	],

	controller: 'cardPanel',

	closable : true,
	floatable : true,
	floating : true,
	draggable : true,
	width : 520,
	height :230,
	modal : true,

	itemId: 'cardRejUnlockActionComment',

	items : [
	{
		xtype : "panel",
		name : 'CommentAdd',
		itemId : 'commentCardPanel',
		reference: 'commentCardPanel',
		width : 490,
		border:false,
		items:[
			{
				xtype: 'form',
				border: false,
				width: 490,
				layout: {
					type: 'vbox',
					align : 'stretch',
					pack  : 'start'
				},

				margin : '15 15 15 15',
				items:[{
					border:false,
					defaultType: 'textfield',
					items: [ 
						{
		                    xtype : 'textareafield',
		                    grow : true,		           
		                    emptyText: 'Please write your comment here',
		                    reference: 'hoCrmCommentCard',
		                    anchor : '100%',
		                    width: 450,
		                    height: 90,
		                    hidden: true,
		                    margin: '10 20 10 20'
		                },
		                {
		                    xtype : 'textareafield',
		                    grow : true,		           
		                    emptyText: 'Please write your comment here',
		                    reference: 'cadCommentCard',
		                    anchor : '100%',
		                    width: 450,
		                    height: 90,
		                    hidden: true,
		                    margin: '10 20 10 20'
		                },			                
		                {
		                    xtype: 'displayfield',
		                    reference: 'cardGroupId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'stateName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'stateId',
		                    hidden: true
		                },
					]
				}]
			}
		]
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		itemId:'btnPanel',
		items : ['->',
			{
				itemId: 'btnCommentCancel',
				text: 'Close',
				reference : 'btnCommentCancel',
				iconCls: 'remove',
				width : 80,
				name: 'btnCancel',
				handler:'onCancelUnlockCard'
				
			},
			{
				itemId  : 'btnCommentAdd',
				reference : 'btnCommentAdd',
				text    : 'Yes',
				name    : 'btnWLAdd',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onSaveUnlockCard'
				}
			},
		]
	}],
	listeners: {
        beforerender: 'onBeforerenderUnlockCard',
    },
});