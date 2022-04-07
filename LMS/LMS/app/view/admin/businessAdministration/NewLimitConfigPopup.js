Ext.define('Desktop.view.admin.businessAdministration.NewLimitConfigPopup', {
	extend : 'Ext.panel.Panel',
	title : "New LimitConfig",
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
	closable : true,
	floatable : true,
	floating : true,
	draggable : true,
	width : 520,
	height :220,
	modal : true,
	alwaysOnTop: true,

	itemId: 'preLimitPopupPopup',
	reference: 'preLimitPopupPopup',

	items : [
	{
		xtype : "panel",
		itemId : 'MemoNamePopupPanel',
		reference: 'MemoNamePopupPanel',
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
					margin: '0 0 0 60',
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
		                    xtype: 'combobox',
	                        fieldLabel: 'Organization',
	                        itemId: 'limitOrganization',
                        	reference: 'limitOrganization',
	                        labelAlign: 'left',
	                        border: 1,
	                        labelWidth: 150,
	                        margin: '10 20 10 20',
	                        mode: 'local',
	                        displayField: 'name',
	                        valueField: 'value',
	                        queryMode: 'local',
	                        value: 'POLICE',
	                        forceSelection: true,
	                        editable: false,               
	                        store: Ext.create('Ext.data.Store', {
	                            fields: ['name', 'value'],
	                            data: [
	                                {
	                                    name: 'BANK',
	                                    value: 'BANK'
	                                },
	                                {
	                                    name: 'POLICE',
	                                    value: 'POLICE'
	                                }
	                            ]
	                        }),
	                        listeners : {
	                            change : 'onOrganizationChange'
	                        }
		                },
		                {
		                    xtype: 'combobox',
		                    itemId: 'limitDepartment',
		                    reference: 'limitDepartment',
		                    fieldLabel: 'Department',
		                    labelAlign: 'left',
	                        border: 1,
	                        labelWidth: 150,
	                        margin: '10 20 10 20',
	                        mode: 'local',
	                        displayField: 'name',
	                        valueField: 'value',
	                        value: 'CREDIT CARD',
	                        queryMode: 'local',
	                        forceSelection: true,
	                        editable: false,               
	                        store: Ext.create('Ext.data.Store', {
	                            fields: ['name', 'value'],
	                            data: [
	                                {
	                                    name: 'LOAN',
	                                    value: 'LOAN'
	                                },
	                                {
	                                    name: 'CREDIT CARD',
	                                    value: 'CREDIT CARD'
	                                }
	                            ]
	                        }),
		                },
		                {
		                    xtype: 'combobox',
		                    itemId: 'limitDesignation',
		                    reference: 'limitDesignation',
		                    fieldLabel: 'Designation',
		                    labelAlign: 'left',
	                        border: 1,
	                        labelWidth: 150,
	                        margin: '10 20 10 20',
	                        mode: 'local',
	                        displayField: 'value1',
	                        valueField: 'value1',
	                        queryMode: 'local',
	                        forceSelection: true,	                       
	                        store : 'gDesignationStore',
		                },
		                {
		                    xtype: 'numberfield',
		                    itemId: 'preApprovalLimit',
		                    reference: 'preApprovalLimit',
		                    fieldLabel: 'Pre-Approval Limit',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    format: '0.00',
		                    margin: '10 20 10 20',
                        	minValue: 0,
                        	hideTrigger: true,
                        	keyNavEnabled: false,
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
				itemId: 'btnCancelPreLimitPopup',
				reference : 'btnCancelPreLimitPopup',
				iconCls: 'remove',
				width : 80,
				handler:'onCancelPreLimitPopup'				
			},
			{
				itemId  : 'btnYesPreLimitPopup',
				reference : 'btnYesPreLimitPopup',
				text    : 'Yes',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickYesOnPreLimitPopup'
				}
			},
		]
	}],
		listeners: {
        afterrender: 'onActivateLimitPopup'
    }
});