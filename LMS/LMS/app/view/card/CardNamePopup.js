Ext.define('Desktop.view.card.CardNamePopup', {
	extend : 'Ext.panel.Panel',
	title : "Names",
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
	height :400,
	modal : true,

	itemId: 'namePopup',

	items : [
	{
		xtype : "panel",
		itemId : 'NamePopupPanel',
		reference: 'NamePopupPanel',
		width : 490,
		border:false,
		items:[
			{
				xtype: 'form',
				border: false,
				width: 490,
				margin : '15 15 15 15',
				layout: {
					type: 'vbox',
					align : 'stretch',
					pack  : 'start'
				},
				items:[{
					border:false,
					defaultType: 'textfield',
					margin: '0 0 0 20',
					items: [ 
		                {
		                    xtype: 'textfield',
		                    itemId: 'nameOfEmployees',
		                    reference: 'nameOfEmployees',
		                    fieldLabel: 'Name of Employees',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'employeeId',
		                    reference: 'employeeId',
		                    fieldLabel: 'Employee ID',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'headOfCard',
		                    reference: 'headOfCard',
		                    fieldLabel: 'Head of Cards',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'checkbox',
		                    boxLabel: 'Presonal Loan Duplicate',
		                    itemId: 'presonalLoanDuplicate',
		                    reference: 'presonalLoanDuplicate',
		                    name: 'presonalLoanDuplicate',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20',
		                    columnWidth:.5,
		                },
		                {
		                    xtype: 'checkbox',
		                    boxLabel: 'GPF Loan Duplicate',
		                    itemId: 'gpfLoanDuplicate',
		                    reference: 'gpfLoanDuplicate',
		                    name: 'gpfLoanDuplicate',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20',
		                    columnWidth:.5,
		                },
		                {
		                    xtype: 'checkbox',
		                    boxLabel: 'Card Duplicate',
		                    itemId: 'cardDuplicate',
		                    reference: 'cardDuplicate',
		                    name: 'cardDuplicate',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20',
		                    columnWidth:.5,
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'duplicationStatus',
		                    reference: 'duplicationStatus',
		                    fieldLabel: 'Duplication Status',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'managingDirectorCeoName',
		                    reference: 'managingDirectorCeoName',
		                    fieldLabel: 'Managing Director/Ceo Name',
		                    labelAlign: 'left',
		                    value: 'Masihul Huq Chowdhury',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'recommendedBy1',
		                    reference: 'recommendedBy1',
		                    fieldLabel: 'Recommended By(1)',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'recommendedBy2',
		                    reference: 'recommendedBy2',
		                    fieldLabel: 'Recommended By(2)',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'endorsedBy1',
		                    reference: 'endorsedBy1',
		                    fieldLabel: 'Endorsed By(1)',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'endorsedBy2',
		                    reference: 'endorsedBy2',
		                    fieldLabel: 'Endorsed By(2)',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 05 10 20'
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'cardMainSearchGrid',
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
				text: 'Close',
				itemId: 'btnCancelNamePopup',
				reference : 'btnCancelNamePopup',
				iconCls: 'remove',
				width : 80,
				handler:'onCardCancelNamePopup'
				
			},
			{
				itemId  : 'btnYesNamePopup',
				reference : 'btnYesNamePopup',
				text    : 'Yes',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickYesCardOnNamePopup'
				}
			},
		]
	}],

	listeners: {
        // afterrender: 'onActivateCardNamePopup'
    }
});