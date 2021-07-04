Ext.define('Desktop.view.loan.StateTransition', {
	extend : 'Ext.panel.Panel',
	title : "Comment",
	requires: [
	    'Desktop.view.loan.LoanController',
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

	controller: 'loanPanel',

	closable : true,
	floatable : true,
	floating : true,
	draggable : true,
	width : 520,
	height :200,
	modal : true,

	itemId: 'stateTransitionPopUp',

	items : [
	{
		xtype : "panel",
		name : 'stateTransitionPopUpPanel',
		itemId : 'stateTransitionPopUpPanel',
		reference: 'stateTransitionPopUpPanel',
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
		                    reference: 'newStateTransitionComment',
		                    anchor : '100%',
		                    width: 450,
		                    height: 90,
		                    margin: '10 20 10 20'
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loginUser',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'userId',
		                    hidden: true
		                },
		                
		                {
		                    xtype: 'displayfield',
		                    reference: 'loginName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loanId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'actionType',
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
		                }
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
				itemId: 'btnStateTransitionCancel',
				text: 'Close',
				reference : 'btnStateTransitionCancel',
				iconCls: 'remove',
				width : 80,
				name: 'btnCancel',
				handler:'onClickStateTransitionCancelBtn'
				
			},
			{
				itemId  : 'btnStateTransitionSubmit',
				reference : 'btnStateTransitionSubmit',
				text    : 'Submit',
				name    : 'btnStateTransitionSubmit',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickStateTransitionPopUpSubmit'
				}
			},
		]
	}],

});