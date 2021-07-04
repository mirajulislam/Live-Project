Ext.define('Desktop.view.admin.businessAdministration.NewDocMap', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.newDocMap',

	controller: 'admin-businessadministration-businessadmin',

	closable: true,
	floatable: true,
	floating: true,
	draggable: true,
	width: 450,
	height:200,
	modal:true,
	alwaysOnTop: true,
	title: "New Document Mapping",
	border: false,
	autoScroll : true,
	scrollable : true,
	items: [
		{
			xtype: "panel",
			reference: 'loanDocAdd',
			width: 430,
			items: [
				{
					reference:'newDocumentMapGrid',
					xtype: 'gridpanel',
					height: 200,
					widget: 300,
					stripeRows : true,
					columnLines: true,
					multiSelect: true,
					border: false,
					plugins: [{
						ptype: 'gridfilters'
					}],
					selModel: {
						selType: 'checkboxmodel',
						listeners: {
							selectionchange:'onDocMapSelChng'
						}
					},
					columns: [
						{
							text: 'Loan Doc Id',
							dataIndex: 'loanDocMapId',
							align: 'center',
							sortable: true,
							hidden: true,
							filter: {
								type: 'list'
							}
						},
						{
							text: 'Loan Doc Ver',
							dataIndex: 'loanDocMapVer',
							align: 'center',
							sortable: true,
							hidden: true
						},
						{
							text: 'Loan Config Id',
							dataIndex: 'loanConfigId',
							align: 'center',
							sortable: true,
							hidden: true,
							filter: {
								type: 'list'
							}
						},
						{
							text: 'User Mod Key',
							dataIndex: 'userModKey',
							align: 'center',
							sortable: true,
							hidden: true,
							filter: {
								type: 'list'
							}
						},
						{
							text: "Date Modified",
							xtype: 'datecolumn',
							align: 'center',
							format:'Y-m-d h:i:s A',
							width: 140,
							hidden: true,
							sortable: true,
							dataIndex: 'dttMod',
							filter: {
								type: 'date'
							}
						},
						{
							text: 'Document Type',
							dataIndex: 'docType',
							align: 'center',
							sortable: true,
							flex: 1,
							filter: {
								type: 'list'
							}
						},
						{
							text: 'Is Mandatory',
							dataIndex: 'isMandatory',
							align: 'center',
							flex: 1,
							sortable: true,
							filter: {
								type: 'list'
							},
							renderer : function(value){
								if(value == 1){
									return 'Yes';
								}
								else{
									return 'No';
								}
							}
						},
						{
							text: 'Is Default',
							dataIndex: 'isDefault',
							align: 'center',
							sortable: true,
							filter: {
								type: 'list'
							},
							renderer : function(value){
								if(value == 1){
									return 'Yes';
								}
								else{
									return 'No';
								}
							}
						},
						{
							text: 'Is Active',
							dataIndex: 'active',
							align: 'center',
							sortable: true,
							hidden: true,
							filter: {
								type: 'list'
							},
							renderer : function(value){
								if(value == 1){
									return 'Yes';
								}
								else{
									return 'No';
								}
							}
						}
					]
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'loanConfigId',
					name: 'loanConfigId',
					reference: 'loanConfigId',
					hidden: true
				},
				{
					xtype: 'displayfield',
					fieldLabel: 'docMappingGridRef',
					name: 'docMappingGridRef',
					reference: 'docMappingGridRef',
					hidden: true
				}
			]
		}
	],
	dockedItems : [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			items : [
				{
					xtype: 'button',
					text: 'Add',
					//iconCls: 'add',
					disabled: true,
					width: 50,
					reference: 'newDocMapBtn',
					listeners: {
						click: 'onNewDocMapBtn'
					}
				},
				{
					xtype: 'button',
					text: 'Cancel',
					width: 50,
					reference: 'cancelDocMapBtn',
					handler: 'onCancelDocMap'
				},
				'->'
			]
		}
	],
	listeners:{
		afterrender: 'onNewDocMapShow',
	}
});