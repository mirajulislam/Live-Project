Ext.define('Desktop.view.loan.MatchGroupPopup', {
	extend : 'Ext.panel.Panel',
	title : "Group Amount Match",
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
	width : 450,
	height :120,
	modal : true,
	alwaysOnTop: true,

	itemId: 'matchGroupPopup',

	items : [
	{
		xtype : "panel",
		name : 'matchGroupAmount',
		itemId : 'matchGroupAmount',
		reference: 'matchGroupAmount',
		width : 380,
		border:false,
		items:[
			{
				xtype: 'form',
				border: false,
				width: 380,
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
		                    xtype: 'numberfield',
	                        itemId: 'enterGroupTotalAmount',
	                        reference: 'enterGroupTotalAmount',
	                        columnWidth: 2,
	                        fieldLabel: 'Total Amount',
	                        labelAlign: 'left',
	                        labelWidth: 100,
	                        margin: '5 10 5 85',
	                        format: '0.00',
	                        minValue: 0,
	                        hideTrigger: true,
	                        keyNavEnabled: false,
	                        mouseWheelEnabled: false,
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'groupTotalAmount',
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
				itemId: 'btnCancelCompareAmount',
				text: 'Close',
				reference : 'btnCancelCompareAmount',
				iconCls: 'remove',
				width : 80,
				name: 'btnCancel',
				handler:'onCancelCompareAmount'
				
			},
			{
				itemId  : 'btnCompareAmount',
				reference : 'btnCompareAmount',
				text    : 'Compare',
				name    : 'btnWLAdd',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickCompareAmount'
				}
			}
		]
	}],
});