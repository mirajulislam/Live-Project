Ext.define('Desktop.view.card.MatchAmountPopup', {
	extend : 'Ext.panel.Panel',
	title : "Group Amount Match",
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
	width : 450,
	height :120,
	modal : true,

	itemId: 'matchAmountPopup',

	items : [
	{
		xtype : "panel",
		name : 'cardMatchGroupAmount',
		itemId : 'cardMatchGroupAmount',
		reference: 'cardMatchGroupAmount',
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
	                        itemId: 'entryCardGroupTotalAmount',
	                        reference: 'entryCardGroupTotalAmount',
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
		                    reference: 'cardGroupTotalAmount',
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
				itemId: 'btnCardCancelCompareAmount',
				text: 'Close',
				reference : 'btnCardCancelCompareAmount',
				iconCls: 'remove',
				width : 80,
				name: 'btnCancel',
				handler:'onCardCancelCompareAmount'
				
			},
			{
				itemId  : 'btnCardCompareAmount',
				reference : 'btnCardCompareAmount',
				text    : 'Compare',
				name    : 'btnWLAdd',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onCardClickCompareAmount'
				}
			}
		]
	}],
});