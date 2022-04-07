Ext.define('Desktop.view.admin.businessAdministration.addNewCreditCardPopup', {
	extend : 'Ext.panel.Panel',
	title : "New Credit Card Type",
	requires: [
		'Desktop.view.admin.businessAdministration.businessAdminController',
		'Desktop.view.admin.businessAdministration.businessAdminModel',
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
		itemId : 'ofacEntitytMainPanel',
		closable : true,
		floatable : true,
		floating : true,
		draggable : true,
		width : 750,
		height :130,
		modal :true,
		alwaysOnTop: true,
		items : [
			{
				xtype : "panel",
				name : 'creditCardTypeAdd',
				itemId : 'creditCardTypeAdd',
				width : 750,						
					items: [
						{
							// xtype: 'fieldset',
							height: 70,
							padding: 10,
							layout: 'column',
							// title: 'Details',
							items:[{
								columnWidth:.33,
								border:false,
								// layout: 'anchor',
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
										reference: 'idPopupRef',
										hidden  :  true,
									},
									{
										xtype: 'combobox',
										hidden  :  true,
									},
									{
										xtype: 'textfield',
										margin: '10 0 10 10',
										labelWidth: 150,
										reference: 'creditCardType',
										fieldLabel: 'Credit Card Type',
										columnWidth:.33,   
										labelAlign: 'left',
										labelWidth: 70,
									}
								]
							},
							{
								columnWidth:.27,
								border:false,
								layout: 'anchor',
								defaultType: 'textfield',
								maxLength: 3,
								items: [
									{
										xtype: 'textfield',
										margin: '10 0 10 10',
										labelWidth: 45,
										reference: 'prefix',
										fieldLabel: 'Prefix',
										columnWidth:.27,   
										labelAlign: 'left',
										maxLength: 3,
									}
								]
							},
							{
								columnWidth:.40,
								border:false,
								layout: 'anchor',
								defaultType: 'textfield',
								items: [
									{
										xtype: 'numberfield',
										margin: '10 0 10 10',
										labelWidth: 120,
										reference: 'defualtInterestRate',
										fieldLabel: 'Default Interest Rate',
										columnWidth: .40,   
										labelAlign: 'left',
									}
								]
							}
						]
					},
					{
					   	buttonAlign: 'center',
					   	border : 0,
					   	buttons: [{
					 		xtype: 'button',
					 		formBind: true,
					 		itemId  : 'btnCreditCardTypeAdd',
					 		reference : 'btnCreditCardTypeAdd',
					 		iconCls: 'save-icon',
					 		text: 'Save',
					 		listeners: {
								click: 'onClickSaveCreditCardType'
							 },
					   }]                    
					}]
		}],
});