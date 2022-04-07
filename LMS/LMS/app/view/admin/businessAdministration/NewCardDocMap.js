Ext.define('Desktop.view.admin.businessAdministration.NewCardDocMap', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.newCardDocMap',

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
			reference: 'cardDocAdd',
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
							selectionchange:'onCardDocMapSelChng'
						}
					},
					columns: [
						{
							text: 'Card Doc Id',
							dataIndex: 'cardDocMapKey',
							align: 'center',
							sortable: true,
							hidden: true,
							filter: {
								type: 'list'
							}
						},
						{
							text: 'Card Doc Ver',
							dataIndex: 'cardDocMapVer',
							align: 'center',
							sortable: true,
							hidden: true
						},
						{
							text: 'Card Config Id',
							dataIndex: 'cardConfigKey',
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
					fieldLabel: 'cardConfigKey',
					name: 'cardConfigKey',
					reference: 'cardConfigKey',
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
					reference: 'newCardDocMapBtn',
					listeners: {
						click: 'onNewCardDocMapBtn'
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
		afterrender: 'onNewCardDocMapShow',
	}
});