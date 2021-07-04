Ext.define('Desktop.view.admin.businessAdministration.roleToStateMap', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.roleToStateMap',

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
		'Ext.grid.RowNumberer',
		'Ext.grid.column.Date',
		'Ext.grid.filters.filter.Date',
		'Ext.grid.filters.filter.String',
		'Ext.grid.filters.filter.Boolean',
		'Ext.selection.CheckboxModel',
		'Ext.grid.filters.Filters',
		'Ext.grid.feature.Summary',
	],

	controller: 'admin-businessadministration-businessadmin',
	reference: 'roleToStateMapTabRef',
	layout: 'fit',
	//columnwidth: '1',
	border: false,
	modal: true,
	margin: 0,
	items: [{
		xtype: 'panel',
		reference: 'roleToStateMapPnl',
		layout: 'column',
		columnwidth: '0.5',
		autoScroll: true,
		scrollable: true,
		items:[
			{
				xtype: 'panel',
				reference: 'assignedStatePnl',
				height: 450,
				width: 570,
				padding: '0 5 0 0',
				scrollable: true,
				autoScroll: true,
				border: false,
				title: 'Assigned State',
				dockedItems : [
					{
						xtype : 'toolbar',
						dock : 'bottom',
						items : [
							'->',
							{
								xtype : 'button',
								text : 'Save',
								reference: 'assignStateSaveBtn',
								listeners: {
									click: 'onAssignStateSaveBtn'
								}
							},
							'-',
							{
								xtype : 'button',
								text : 'Remove',
								reference: 'assignStateRmvBtn',
								listeners: {
									click: 'onAssignStateRmvBtn'
								}
							},
							'->'
						]
					}
				],
				items:[
					{
						xtype: 'gridpanel',
						itemId: 'roleTypeGridRef',
						reference: 'roleTypeGridRef',
						height: 390,
						width: 565,
						header: false,
						border: false,
						multiSelect: false,
						selModel: {
							selType: 'checkboxmodel'
						},
						tbar : [
							{
		            			xtype: 'textfield',
		            			width: 300,
		            			fieldLabel: 'Grid Filter',
		            			labelAlign: 'right',
		            			labelWidth: 60,
		            			listeners: {
		                			change: 'onGridFilterAvailableState'
		            			}
		        			}
						],
						store : 'gAssignedStateStore',
						columns: [
							{
								header: "SL No",
								xtype: 'rownumberer',
								width: 60,
								sortable: true,
								align: 'center',
							},
							{
								header: "State ID",
								width: 120,
								sortable: true,
								hidden: true,
								align: 'center',
								dataIndex: 'stateId',
								filter:{
									type: 'list'
								}
							},
							{
								header: "Satate Name",
								width: 220,
								sortable: true,
								align: 'center',
								dataIndex: 'stateName',
								filter:{
									type: 'list'
								}

							},
							{
								header: "Permission",
								width: 120,
								sortable: true,
								align: 'center',
								dataIndex: 'permission',
								filter:{
									type: 'list'
								}
							}
						]
					}
				]
			},
			{
				xtype: 'panel',
				reference: 'availableStatePnl',
				height: 450,
				width: 575,
				autoScroll: true,
				scrollable: true,
				border: false,
				title: 'Available State',
				dockedItems : [
					{
						xtype : 'toolbar',
						dock : 'bottom',
						items : [
							'->',
							{
								xtype : 'button',
								text : 'Add',
								reference: 'availableSateAddBtn',
								listeners: {
									click: 'onavailableSateAddBtn'
								}
							},
							'->'
						]
					}
				],
				items:[
					{
						xtype: 'gridpanel',
						itemId: 'roleTypeGridRef2',
						reference: 'roleTypeGridRef2',
						height: 395,
						width: 575,
						header: false,
						border: false,
						multiSelect: false,
						selModel: {
							selType: 'checkboxmodel'
						},
						tbar : [
							{
		            			xtype: 'textfield',
		            			width: 300,
		            			fieldLabel: 'Grid Filter',
		            			labelAlign: 'right',
		            			labelWidth: 60,
		            			listeners: {
		                			change: 'onGridFilterAvailableState2'
		            			}
		        			}
						],
						store : 'gAvailableStateStore',
						columns: [
							{
								header: "SL No",
								xtype: 'rownumberer',
								width: 60,
								sortable: true,
								align: 'center',
							},
							{
								header: "Satate ID",
								width: 120,
								sortable: true,
								hidden: true,
								align: 'center',
								dataIndex: 'stateId',
								filter:{
									type: 'list'
								}
							},
							{
								header: "Satate Name",
								width: 220,
								sortable: true,
								align: 'center',
								dataIndex: 'stateName',
								filter:{
									type: 'list'
								}
							},
							{
								header: "Permission",
								width: 120,
								sortable: true,
								align: 'center',
								dataIndex: 'permission',
								filter:{
									type: 'list'
								}
							}
						]
					}
				]
			}
		]
	}],
	dockedItems : [
		{
			xtype: 'toolbar',
			dock: 'top',
			items : [
				{
					xtype: 'combobox',
					itemId: 'roleType',
					reference: 'roleType',
					fieldLabel: 'Role Type',
					labelAlign: 'left',
					labelWidth: 60,
					margin: '0 0 0 20',
					mode: 'local',
					displayField: 'roleName',
					valueField: 'roleId',
					queryMode: 'local',
					forceSelection: true,
					store: 'gRoleTypeStore'
				},
				{
					xtype: 'button',
					text: 'Search',
					reference: 'roleTypeSrchBtn',
					listeners: {
						click: 'onSearchRoleType'
					}
				},
				'-',
				{
					xtype: 'button',
					text: 'Clear',
					reference: 'loanConfigClrBtn',
					listeners: {
						click: 'onClearRoletype'
					}
				}
			]

		}
						
	]
});