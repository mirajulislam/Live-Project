Ext.define('Desktop.view.admin.businessAdministration.LoanConfig',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.loanConfig',

	requires: [
		'Ext.layout.container.Accordion'
	],

	controller: 'admin-businessadministration-businessadmin',

	reference: 'loanConfigTabRef',
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
			reference: 'loanConfigAccordionRef',
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
					itemId: 'loanType',
					reference: 'loanType',
					fieldLabel: 'Loan Type',
					labelAlign: 'left',
					labelWidth: 60,
					margin: '0 0 0 5',
					mode: 'local',
					displayField: 'value1',
					valueField: 'configurationId',
					queryMode: 'local',
					forceSelection: true,
					store:'gLoanTypeStore'
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
					reference: 'loanConfigSrchBtn',
					listeners: {
						click: 'onSrchLoanConfig'
					}
				},
				{
					xtype: 'button',
					text: 'Clear',
					reference: 'loanConfigClrBtn',
					listeners: {
						click: 'onClrLoanConfig'
					}
				},
				'->'
			]
		}
	],
	listeners : {
		afterrender: 'onLoanConfigShow'
	}
});