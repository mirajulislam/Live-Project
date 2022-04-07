Ext.define('Desktop.view.admin.businessAdministration.PreApprovalLimit',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.cardPreApprovalLimit',
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
		'Ext.grid.RowNumberer',
	],

	controller: 'admin-businessadministration-businessadmin',
	reference: 'preLimitPanel',
	autoScroll : true,
	scrollable : true,
	layout: 'fit',
	border: false,
	modal: true,
	items:[
		{
			xtype: 'panel',
			autoScroll : true,
			scrollable : true,
			height: 510,
			items:[
				{
					xtype: 'gridpanel',
					itemId: 'cardPreApprovalLimitGridRef',
					reference: 'cardPreApprovalLimitGridRef',
					header: false,
					border: false,
					title: false,

					tbar: [
						{
							text: 'New Limit Configure',
							iconCls: 'add',
							itemId: 'addLimitConfigure',
							disabled: false,
							listeners : {
								click : 'onClickNewLimitConfigure'
							}
						},
           				'-',
           				{
                			xtype: 'textfield',
                			width: 300,
                			fieldLabel: 'Grid Filter',
                			labelAlign: 'right',
                			labelWidth: 60,
                			listeners: {
                    			change: 'onGridFilterPreLimit'
                			}
            			}
					],
					store : 'gPreLimitConfigStore',
					columns: [
						{
							header: "SL No",
							xtype: 'rownumberer',
							width: 60,
							sortable: true,
							align: 'center'
						},
												{
							header: "Config Id",
							width: 120,
							sortable: true,
							hidden: true,
							align: 'center',
							dataIndex: 'configurationId',
							filter:{
								type: 'list'
							}
						},
						{
							header: "Config Ver",
							width: 120,
							sortable: true,
							hidden: true,
							align: 'center',
							dataIndex: 'configurationVer'
						},
						{
							header: "Organization", 
							width: 120,
							sortable: true,
							align: 'center',
							dataIndex: 'value1',
							filter:{
								type: 'list'
							}
						},
						{
							header: "Department", 
							width: 120,
							sortable: true,
							align: 'center',
							dataIndex: 'name',
							filter:{
								type: 'list'
							}
						},
						{
							header: "Type",
							width: 250,
							sortable: true,
							align: 'center',
							hidden: true,
							dataIndex: 'value1',
							filter:{
								type: 'list'
							}
						}, 
						{
							header: "Designation",
							width: 200,
							sortable: true,
							align: 'center',
							dataIndex: 'value2',
							maxLength: 200,
							filter:{
								type: 'list'
							}
						}, 
						{
							header: 'Approval Limit',
							width: 140,
							sortable: true,
							dataIndex: 'value3',
							align: 'center',
							filter:{
								type: 'number'
							}
						},
						{
							xtype: 'datecolumn', 
							text: 'Modified Date',
							width: 225, 
							sortable: false,
							align: 'center', 
							dataIndex : 'dttMod',
							format: 'M d, Y h:i A',
							filter:{
								type: 'date'
							}
						},
						{
							xtype: 'gridcolumn', 
							text: 'Modified By', 
							width: 225, 
							sortable: false, 
							align: 'center', 
							dataIndex : 'modifiedBy', 
							hidden: false,
							filter:{
								type: 'list'
							}
						},
						{
							xtype: 'actioncolumn',
							flex: 1,
							align: 'center',
							text: 'Action',
							items: [
								{
									iconCls : 'grid-delete',
									tooltip: 'Delete Limit',
									reference: 'limitnDelRef',
									handler: 'onDelConfig'
								}
							]
						}
					],
					listeners: {
						itemdblclick: 'onPreLimitGridItemDblClick'
					}
				}
			]
		}
	]
});