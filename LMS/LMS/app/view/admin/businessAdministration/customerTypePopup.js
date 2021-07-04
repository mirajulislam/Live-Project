Ext.define('Desktop.view.admin.businessAdministration.CustomerTypePopup', {
	extend : 'Ext.panel.Panel',
	requires: [
		'Desktop.view.admin.businessAdministration.businessAdminController',
		'Desktop.view.admin.businessAdministration.businessAdminModel',
		'Desktop.view.admin.businessAdministration.customerTypes',
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

	controller: 'admin-businessadministration-businessadmin',
		  
	itemId : 'customerTypePopupId',
	reference: 'customerTypePopupRef',
	closable : true,
	floatable : true,
	floating : true,
	draggable : true,
	width : 290,
	height :160,
	modal : true,

	items : [
		{
			xtype : "panel",
			name : 'LoanTypeAdd',
			itemId : 'newCustomerTypePanelId',
			reference: 'newCustomerTypePanelRef',
			width : 290,
			border:false,
			items:[
				{
					xtype: 'form',
					border: false,
					width: 290,
					layout: {
						type: 'vbox',
						align : 'stretch',
						pack  : 'start'
					},
					header: false,
					items: [
						{
							xtype: 'fieldset',
							height: 70,
							border:false,
							margin: '40 10 10 10',
							items:[{
								border:false,
								defaultType: 'textfield',
								items: [ 
									{
										hidden  :  true,    
										dataIndex: 'configurationId', 
										reference: 'configurationIdRef',                
									},
									{
										hidden  :  true,    
										dataIndex: 'configurationVer', 
										reference: 'configurationVerRef',                
									},
									{
										xtype: 'textfield',
										labelWidth: 100,
										width: 240,
										reference: 'newCustomerTypeRef',
										fieldLabel: 'Customer Type'
									}
								  
								   ]
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
					itemId: 'btnLoanTypeCancel',
					text: 'Close',
					reference : 'btnLoanTypeCancel',
					iconCls: 'remove',
					width : 80,
					name: 'btnCancel',
					listeners : {
					   click : 'onCancelCustomerTypePopup'
					}
				},
				{
					itemId  : 'btnLoanTypeAdd',
					reference : 'customerTypeSaveBtn',
					text    : 'Save',
					iconCls: 'add',
					name    : 'btnWLAdd',
					width : 80,
					hidden  :  false,
					listeners : {
					   click : 'onClickSaveCustomerType'
					}
				},
			]
		}],

});