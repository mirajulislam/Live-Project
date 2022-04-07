Ext.define('Desktop.view.loan.MultipleFileAttachmentPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.MultipleFileAttachmentPanel',
	itemId: 'MultipleFileAttachmentPanel',
    reference: 'MultipleFileAttachmentPanel',
    xtype : 'MultipleFileAttachmentPanel',

	requires: [
		'Desktop.view.loan.LoanController',
		'Desktop.view.loan.LoanViewModel',
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

	controller: 'loanPanel',

	viewModel: {
		type: 'loanPanel'
	},
	autoShow: true,
	height: 649,
	width: 899,
	layout: 'border',
	maximized: true,
	minimizable: true,
	header: false,
	modal: true,
	items: [{
			xtype: 'tabpanel',
			region: 'center',
			layout: 'fit',
			id: 'multipleFileAttachmentHome',
			reference: 'multipleFileAttachmentHome',
			margin: '5 0 0 0',
			tabPosition: 'bottom',
			items: [{
				xtype: 'panel',
				id: 'multipleFileAttachmentPanel',
				layout: 'fit',
				title: 'Report',
				dockedItems: [{					
	                xtype: 'fieldset',
	                itemId: 'hiddenMultipleFileFieldSet',
	                reference: 'hiddenMultipleFileFieldSet',
	                collapsible: true,
	                collapsed: true,
	                columnWidth: 1,
	                hidden : true,
	                layout: 'column',
	                margin: '10 10 10 10',
	                items : [			                    
	                    {
	                        xtype : 'displayfield',
	                        reference : 'hiddenLoanId'
	                    }
					]
				}],
				items: [{
					xtype: 'gridpanel',
					reference: 'attachmentFileSearchGrid',
					itemId: 'attachmentFileSearchGrid',
					multiSelect: true,
					loadMask: true,
					store: 'gAttachmentLoanDocumentStore',
					plugins: [{
						ptype: 'gridfilters'
					}],
					viewConfig: {
						stripeRows: true,
						enableTextSelection: true,
					},
					dockedItems: [{
						xtype: 'toolbar',
						dock: 'top',
						itemId: 'multipleFileAttachmentnGridUprToolbar',
						items: [	
							{
								xtype: 'tbfill'
							},						
							{
								text: 'View Report',
								iconCls: 'pdf-icon',
								tooltip: 'Export to .pdf',
								reference: 'viewReportAsPdf',
								itemId: 'viewReportAsPdf',
								align: 'right',
								disabled:true,
								handler: 'generateLoanAttechmentGridReport'								
							}
						]
					}],
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
							width: 80,
							dataIndex: 'docId',
							sortable: true,
							hidden: true,
							text: 'Doc Id',
						},
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 80,
							dataIndex: 'loanDocMapId',
							sortable: true,
							hidden: true,
							text: 'loan Doc Map Id',
						},
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 80,
							dataIndex: 'loanDocId',
							sortable: true,
							hidden: true,
						},
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 80,
							dataIndex: 'loanDocMapVer',
							sortable: true,
							hidden: true,
							text: 'loan Doc Map ver',
						},
						{
							header: "Document Type",
							align: 'center',
							width: 150,
							sortable: true,
							dataIndex: 'docType',
							filter: {type: 'string'}
						},																	
						{
							header: "Upload Date",
							xtype: 'datecolumn',
							align: 'center',
							format:'Y-m-d h:i:s A',
							width: 150,
							sortable: true,
							dataIndex: 'dttMod',
							filter: {type: 'date'}
						},						
						{
							header: "Document Name",
							align: 'center',
							width: 150,
							sortable: true,
							dataIndex: 'docName',
							filter: {type: 'string'}
						},	
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 150,
							dataIndex: 'isMandatory',
							sortable: true,
							text: 'Is Mandatory',
						},
						{
							xtype: 'gridcolumn',
							align: 'center',
							width: 150,
							dataIndex: 'filePresent',
							sortable: true,
							text: 'File Present',
						},																	
					],
					selModel: {
						selType: 'checkboxmodel',
						listeners: {
							selectionchange:'onMultipleFileAttachmentGrdSelChng'
						}
					}
				}]
			},
			
			]
		},
	],
	listeners: {
		beforerender : 'onBeforeMultipleFileAttachmentPanel',
	}
});