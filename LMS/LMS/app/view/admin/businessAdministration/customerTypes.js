Ext.define('Desktop.view.admin.businessAdministration.customerTypes',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.customerTypes',

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
	reference: 'customerTypeTabRef',
	autoScroll : true,
	scrollable : true,
	layout: 'fit',
	border: false,
	modal: true,
	margin: 0,
	items:[
		{
			xtype: 'panel',
			autoScroll : true,
			scrollable : true,
			height: 510,
			items:[
				{
					xtype: 'gridpanel',
					itemId: 'customerTypeGridId',
					reference: 'customerTypeGridRef',
					header: false,
					border: false,
					title: false,
					tbar: [
						{
							text: 'New',
							iconCls: 'add',
							itemId: 'addNewCustomerTypeId',
							reference: 'addNewCustomerTypeRef',
							disabled: false,
							listeners : {
								click : 'onClickAddCustomerType'
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
                    			change: 'onGridFilterCustomerType'
                			}
            			}
					],
					store : 'gCustTypeConfigStore',
					columns: [
						{
							header: "SL No",
							xtype: 'rownumberer',
							width: 60,
							sortable: true,
							align: 'center',
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
							header: "Group",
							width: 120,
							sortable: true,
							hidden: true,
							align: 'center',
							dataIndex: 'group',
							filter:{
								type: 'list'
							}
						},
						{
							header: "Sub Group",
							width: 120,
							sortable: true,
							hidden: true,
							align: 'center',
							dataIndex: 'subGroup',
							filter:{
								type: 'list'
							}
						},
						{
							header: "Customer Type",
							width: 120,
							sortable: true,
							align: 'center',
							dataIndex: 'value1',
							filter:{
								type: 'list'
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
							items: [
								{
									iconCls : 'grid-delete',
									tooltip: 'Delete Customer Type',
									reference: 'custDelRef',
									handler: 'onDelConfig'
								}
							]
						}
					],
					listeners: {
						itemdblclick: 'onCustomerTypeGridItemDblClick'
					}
				}
			]
		}
	]
});