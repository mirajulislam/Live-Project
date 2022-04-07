Ext.define('Desktop.view.admin.businessAdministration.CardConfig',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.cardConfig',

	requires: [
		'Ext.layout.container.Accordion'
	],

	controller: 'admin-businessadministration-businessadmin',

	reference: 'cardConfigTabRef',
	width: '100%',
	height: 482,
	layout:'vbox',
	layoutConfig: {
		align: 'stretch',
		pack: 'start',
	},
	margin: 0,
	border: false,
	autoScroll: true,
	scrollable: true,
	items: [
		{
			xtype: 'container',
			reference: 'cardConfigAccordionRef',
			layout: 'accordion',
			width: '100%',
			margin: 0,
			border: false,
			items:[]
		}
	],
	dockedItems : [
		{
			xtype: 'toolbar',
			dock: 'top',
			items : [
				{
					xtype: 'combobox',
					itemId: 'cardType',
					reference: 'cardType',
					fieldLabel: 'Card Type',
					labelAlign: 'left',
					labelWidth: 60,
					margin: '0 0 0 5',
					mode: 'local',
					displayField: 'value1',
					valueField: 'configurationId',
					queryMode: 'local',
					forceSelection: true,
					store:'gCardTypeConfigStore'
				},
				{
					xtype: 'combobox',
					itemId: 'customerType',
					reference: 'customerType',
					fieldLabel: 'Customer Type',
					labelAlign: 'left',
					margin: '0 0 0 10',
					labelWidth: 80,
					mode: 'local',
					displayField: 'value1',
					valueField: 'configurationId',
					queryMode: 'local',
					forceSelection: true,
					store: 'gCustTypeStore'
				},
				{
					xtype: 'button',
					text: 'Search',
					reference: 'cardConfigSrchBtn',
					listeners: {
						click: 'onSrchCardConfig'
					}
				},
				{
					xtype: 'button',
					text: 'Clear',
					reference: 'cardConfigClrBtn',
					listeners: {
						click: 'onClrCardConfig'
					}
				},
				'->'
			]
		}
	],
	listeners : {
		afterrender: 'onCardConfigShow'
	}
});