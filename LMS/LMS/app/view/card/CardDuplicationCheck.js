/*
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Desktop.view.card.CardDuplicationCheck', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.CardDuplicationCheck',

	requires: [
		'Desktop.view.card.CardController',
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

	controller: 'cardPanel',

	viewModel: {
		type: 'cardPanel'
	},

	id: 'cardDuplicationCheckMain',
	autoShow: true,
	height: 649,
	width: 899,
	layout: 'border',
	maximized: true,
	minimizable: true,
	header: false,
	modal: true,
	items: [{
			xtype: 'panel',
			region: 'center',
			layout: 'fit',
			items: [{
				xtype: 'panel',
				id: 'cardDuplicationCheckPanel',
				layout: 'fit',				
				items: [{
					xtype: 'gridpanel',
					reference: 'cardDuplicationCheckGrid',
					itemId: 'cardDuplicationCheckGrid',
					multiSelect: true,
					loadMask: true,
					store: 'gCardDublicationGridStore',
					plugins: [{
						ptype: 'gridfilters'
					}],
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
					},
					features: [{
						ftype: 'grouping',
						groupHeaderTpl: '{name} ({children.length})',
						enableNoGroups: true
					}],
					columns: [
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 100,
							dataIndex: 'loanId',
							hidden: true,
							sortable: true,
							text: 'Loan Id',
						},
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 100,
							dataIndex: 'creditCardId',
							hidden: true,
							sortable: true,
							text: 'Credit Card Id',
						},
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 120,
							dataIndex: 'trackingNumber',
							sortable: true,
							text: 'Tracking Number',
						},
						{
							header: "Product",
							align: 'center',
							width: 120,
							sortable: true,
							dataIndex: 'product',
							filter: {type: 'string'}
						},
						{
							header: "Status",
							align: 'center',
							width: 120,
							sortable: true,
							dataIndex: 'status',
							filter: {type: 'string'}
						},
						{
							header: "Approved Amount",
							align: 'center',
							width: 200,
							sortable: true,
							dataIndex: 'approvedAmount',
							filter: {type: 'number'},
							renderer: function (value, meta, record) {
								if (value == -2147483648 || value == null || value === undefined) return 0;
								return value;
							}
						},						
						{
							header: "Status Date",
							xtype: 'datecolumn',
							align: 'center',
							format:'Y-m-d h:i:s A',
							width: 120,
							sortable: true,
							dataIndex: 'statusDate',
							filter: {type: 'date'}
						},	
						{
							header: "Loan AC",
							align: 'center',
							width: 120,
							sortable: true,
							dataIndex: 'loanAcount',
							filter: {type: 'string'}
						},	
						{
							header: "DIS Amount",
							align: 'center',
							width: 200,
							sortable: true,
							dataIndex: 'disbursedAmount',
							filter: {type: 'number'},
							renderer: function (value, meta, record) {
								if (value == -2147483648 || value == null || value === undefined) return 0;
								return value;
							}
						},
						{
							header: "DIS Date",
							xtype: 'datecolumn',
							align: 'center',
							format:'Y-m-d h:i:s A',
							width: 120,
							sortable: true,
							dataIndex: 'disbursedDate',
							filter: {type: 'date'}
						},
						{
							header: "EMI Paid out of",
							align: 'center',
							width: 120,
							sortable: true,
							dataIndex: 'emiPaidOutOf',
							filter: {type: 'string'}
						},					
						{
							header: "EMI Size",
							align: 'center',
							width: 200,
							sortable: true,
							dataIndex: 'emiSize',
							filter: {type: 'number'},
							renderer: function (value, meta, record) {
								if (value == -2147483648 || value == null || value === undefined) return 0;
								return value;
							}
						},
						{
							header: "OUTSTANDING",
							align: 'center',
							width: 120,
							sortable: true,
							dataIndex: 'outstanding',
							filter: {type: 'string'}
						},
					],
				}]
			},
			]
		},
	],
	listeners: {
		afterrender: 'onActivateCardDuplicateRender',
	}
});