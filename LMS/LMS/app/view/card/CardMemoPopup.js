Ext.define('Desktop.view.card.CardMemoPopup', {
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
	width : 800,
	height :450,
	modal : true,

	itemId: 'memoPopup',

	items : [
	{
		xtype : "panel",
		itemId : 'MemoPopupPanel',
		reference: 'MemoPopupPanel',
		width : 780,
		border:false,
		items:[
			{
				xtype: 'form',
				border: false,
				width: 760,
				margin : '15 15 15 15',
				defaultType : 'textfield',
				anchor : '100%',
				layout : 'column',
				defaults : {
					anchor : '100%'
				},
				layout : 'anchor',
				items: [ 
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'approvedMemoRef',
			                    reference: 'approvedMemoRef',
			                    fieldLabel: 'Approved MEMO Ref',
			                    labelAlign: 'left',
			                    labelWidth: 150,
			                    columnWidth: 1,
			                    margin: '10 0 0 10',
			                },
						]
					}, 						
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'preparedByName',
			                    reference: 'preparedByName',
			                    fieldLabel: 'Prepared By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Kazi Rakibul Islam'
			                },
			                {
			                    itemId: 'preparedByDesignation',
			                    reference: 'preparedByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'SO, Cards'
	                		}
						]
					}, 
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'recommended1ByName',
			                    reference: 'recommended1ByName',
			                    fieldLabel: 'Recommended By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Mir Md. Shahinur Rahman'
			                },
			                {
			                    itemId: 'recommended1ByDesignation',
			                    reference: 'recommended1ByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'VP & Head of Cards'
	                		}
						]
					},
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'recommended2ByName',
			                    reference: 'recommended2ByName',
			                    fieldLabel: 'Recommended By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Md Kabir Uddin'
			                },
			                {
			                    itemId: 'recommended2ByDesignation',
			                    reference: 'recommended2ByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'AVP &Manager, Retail CRM'
	                		}
						]
					},
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'recommended3ByName',
			                    reference: 'recommended3ByName',
			                    fieldLabel: 'Recommended By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Razee -Ul- Ameen'
			                },
			                {
			                    itemId: 'recommended3ByDesignation',
			                    reference: 'recommended3ByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'Deputy Head Of CRM'
	                		}
						]
					},
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'recommended4ByName',
			                    reference: 'recommended4ByName',
			                    fieldLabel: 'Recommended By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Hasi Rani Bepari'
			                },
			                {
			                    itemId: 'recommended4ByDesignation',
			                    reference: 'recommended4ByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'Head of Credit Risk Management'
	                		}
						]
					},
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'recommended5ByName',
			                    reference: 'recommended5ByName',
			                    fieldLabel: 'Recommended By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Shamsul Haque Sufyani'
			                },
			                {
			                    itemId: 'recommended5ByDesignation',
			                    reference: 'recommended5ByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'EVP & Head Of Operations'
	                		}
						]
					},
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'recommended6ByName',
			                    reference: 'recommended6ByName',
			                    fieldLabel: 'Recommended By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Mohammad Abdul Qaium Khan'
			                },
			                {
			                    itemId: 'recommended6ByDesignation',
			                    reference: 'recommended6ByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'SEVP & Chief Information Officer'
	                		}
						]
					},
					{
						xtype : 'fieldcontainer',
						anchor : '100%',
						defaultType : 'textfield',
						defaults : {
							labelAlign : 'left'
						},
						layout : 'column',
						items : [
							{
			                    itemId: 'approvedByName',
			                    reference: 'approvedByName',
			                    fieldLabel: 'Approved By Name',
			                    labelWidth: 150,
			                    margin: '10 0 0 10',
			                    columnWidth: .6,
			                    value: 'Masihul Huq Chowdhury'
			                },
			                {
			                    itemId: 'approvedByDesignation',
			                    reference: 'approvedByDesignation',
			                    fieldLabel: 'Designation',
			                    labelWidth: 75,
			                   	margin: '10 0 0 10',
			                    columnWidth: .4,
			                    value: 'Managing Director & CEO'
	                		}
						]
					},	
					{
						xtype : 'displayfield',
	                    itemId: 'cardGroupMainSearchGrid',
	                    reference: 'cardGroupMainSearchGrid',
	                    hidden: true
	                },
	                {
	                    xtype: 'displayfield',
	                    reference: 'onlyCardPrintValue',
	                    hidden: true
	                },
	                {
	                    xtype: 'displayfield',
	                    reference: 'cardGroupId',
	                    hidden: true
	                }
				]

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
				itemId: 'btnCancelMemoNamePopup',
				reference : 'btnCancelMemoNamePopup',
				iconCls: 'remove',
				width : 80,
				handler:'onCancelMemoPopup'
				
			},
			{
				itemId  : 'btnYesMemoNamePopup',
				reference : 'btnYesMemoPopup',
				text    : 'Yes',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickYesOnMemoPopup'
				}
			},
		]
	}],

	// listeners: {
 //        afterrender: 'onActivateNamePopup'
 //    }
});