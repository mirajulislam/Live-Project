var dbrPercent = 65;
var approvalPanelHeaderFooterBgColor = "#F0ECEC";
var approvalPanelHeight = 120;
var approvalPanelBorder = true;

var dashboardDetailsForm = Ext.define('Desktop.view.dashboard.dashboardDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dashboardDetails',
    itemId: 'dashboardDetails',
    reference: 'dashboardDetails',
    requires: [
        'appConstants',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.toolbar.Toolbar',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.filters.filter.Number',
        'Ext.grid.column.Date',
        'Ext.grid.filters.filter.Date',
        'Ext.grid.filters.filter.String',
        'Ext.grid.filters.filter.Boolean',
        'Ext.selection.CheckboxModel',
        'Ext.grid.filters.Filters',
        'Ext.selection.CellModel'
    ],
    controller: 'dashboardController',
    layout: 'fit',
    border: false,
    modal: true,
      items:[
        {
            xtype: 'panel',
            layout: 'fit',
            dockedItems: [{
                xtype: 'panel',
                dock: 'top',
                itemId: 'loanAccountSearchPad',
                layout: 'column',
                collapseDirection: 'top',
                collapsed: false,
                collapsible: true,
                title: 'Search',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    shadow: true,
                    itemId: 'loanSearchTollbar',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [{
                            xtype: 'button',
                            padding: 2,
                            text: 'Search',
                            reference: 'loanSearchBtn',
                            listeners: {
                                click: 'onClickLoanSearchFromDashboard'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Clear',
                            listeners: {
                                click: 'onClickLoanSearchClearFromDashboard'
                            }
                        }
                    ]
                }],
                items: [
                    {
                            xtype: 'textfield',
                            itemId: 'loanTrackingId',
                            reference: 'loanTrackingId',
                            fieldLabel: 'Tracking Number',
                            columnWidth: .28,
                            labelAlign: 'right',
                            labelWidth: 100,
                            margin : '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'bpNoSrc',
                            reference: 'bpNoSrc',
                            fieldLabel: 'BP No',
                            columnWidth: .23,
                            labelAlign: 'right',
                            labelWidth: 60,
                            margin : '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'nid4Search',
                            reference: 'nid4Search',
                            fieldLabel: 'NID',
                            columnWidth: .23,
                            labelAlign: 'right',
                            labelWidth: 50,
                            margin : '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'accountNo',
                            reference: 'accountNo',
                            fieldLabel: 'Account No',
                            columnWidth: .26,
                            labelAlign: 'right',
                            labelWidth: 95,
                            margin : '5 5 5 5',
                            
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'phone4Search',
                            reference: 'phone4Search',
                            fieldLabel: 'Phone',
                            columnWidth: .28,
                            labelAlign: 'right',
                            //left: '15px',
                            labelWidth: 100,
                            margin : '5 5 5 5',
                        },
                        {
                            xtype: 'datefield',
                            columnWidth: 0.23,
                            reference: 'fromDate',
                            itemId: 'fromDate',
                            fieldLabel: 'From Date',
                            labelAlign: 'right',
                            emptyText: 'From Date',
                            labelWidth: 60,
                            margin : '5 5 5 5',
                            format: 'd M Y',
                        }, 
                        {
                            xtype: 'datefield',
                            columnWidth: 0.23,
                            itemId: 'toDate',
                            reference: 'toDate',
                            fieldLabel: 'To Date',
                            labelAlign: 'right',
                            emptyText: 'To Date',
                            labelWidth: 50,
                            margin : '5 5 5 5',
                            format: 'd M Y',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicationNoSrc',
                            reference: 'applicationNoSrc',
                            fieldLabel: 'Application No',
                            columnWidth: 0.26,
                            labelAlign: 'right',
                            labelWidth: 95,
                            margin : '5 5 5 5'
                        }           
                    
                ],
            }],            
            items: [
             {
                xtype: 'fieldset',
                itemId: 'hiddenFieldSet',
                reference: 'hiddenFieldSet',
                hidden : true,
                items : [
                    {
                        xtype : 'displayfield',
                        reference : 'deptName',
                        itemId : 'deptName'
                    },
                    {
                        xtype : 'displayfield',
                        reference : 'total',
                        itemId : 'total'
                    },
                    {
                        xtype : 'displayfield',
                        reference : 'record',
                        itemId : 'record'
                    },
                    {
                        xtype : 'displayfield',
                        reference : 'cellClickIndecate',
                        hidden : 'true',
                        itemId : 'cellClickIndecate'
                    },
                    {
                        xtype : 'displayfield',
                        reference : 'filterdata',
                        itemId : 'filterdata'
                    },
                    {
                        xtype : 'displayfield',
                        reference : 'dateType',
                        itemId : 'dateType'
                    },
                ]
            },
            {
                    xtype: 'gridpanel',
                    reference: 'dashboardDetailsGrid',
                    itemId: 'dashboardDetailsGrid',
                    multiSelect: true,
                    loadMask: true,
                    store: 'gDashboardDetailsViewGridStore',
                    plugins: [{
                        ptype: 'gridfilters'
                    }],
                    listeners: {
                        itemdblclick: '',
                        selectionchange : ''
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                    },
                 
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        itemId: 'searchLoanGridUprToolbar',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'loanGridLocalFilter',
                                reference: 'loanGridLocalFilter',
                                fieldLabel: 'Grid Filter',
                                padding: 3,
                                left: '6px',
                                width: 300,
                                labelWidth: 65,
                                listeners: {
                                    change:  'onGridFilterEntryChange'
                                }
                            },
                            {

                                xtype: 'displayfield',
                                itemId: 'loanListCount',
                                reference: 'loanListCount',
                                fieldLabel: 'Count',
                                labelWidth: 35,
                                value: ''
                            },
                            {
                                text: 'PPC MIS Report',
                                tooltip: 'Export to .xlsx',
                                iconCls :'export-icon',
                                reference: 'lmsPPCExcelReport',
                                itemId: 'lmsPPCExcelReport',
                                disabled:true,
                                hidden: true,
                                listeners: {
                                    click: 'generateDashboardPPCExcelReport',
                                }
                            },
                            {
                                text: 'CRM-MIS-Excel',
                                tooltip: 'Export to .xlsx',
                                iconCls :'export-icon',
                                reference: 'lmsMISExcelReport',
                                itemId: 'lmsMISExcelReport',
                                disabled:true,
                                hidden: true,
                                listeners: {
                                    click: 'generateDashboardMISExcelReport',
                                }
                            },                            
                        ]
                    }],

                    // features: [{
                    //     ftype: 'grouping',
                    //     groupHeaderTpl: '{name} ({children.length})',
                    //     enableNoGroups: true,
                    //     startCollapsed: true,
                    // }],

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
                            dataIndex: 'loanTrackingId',
                            sortable: true,
                            text: 'Tracking Number',
                        },
                        {
                            header: "State",
                            align: 'center',
                            width: 100,
                            sortable: true,
                            dataIndex: 'stateDisplayLabel',
                            filter: {type: 'list'}
                        },
                        {
                            header: "Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'customerName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Account No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'accountNo',
                            filter: {type: 'string'}
                        },
                        {
                            header: "BP No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'bpNo',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Creation Date",
                            xtype: 'datecolumn',
                            reference: 'creationDate',
                            align: 'center',
                            format:'Y-m-d h:i:s A',
                            width: 140,
                            sortable: true,
                            dataIndex: 'createDate',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Action Date",
                            xtype: 'datecolumn',
                            reference: 'actionDate',
                            align: 'center',
                            format:'Y-m-d h:i:s A',
                            width: 140,
                            sortable: true,
                            dataIndex: 'dttMod',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Applied Loan Amount",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'appliedLoanAmount',
                            filter: {type: 'number'},
                            renderer: function (value, meta, record) {
                                if (value == -2147483648 || value == null || value === undefined) return 0;
                                return value;
                            }
                        },
                        {
                            header: "SMS Status",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'smsStatus',
                            filter: {type: 'string'}
                        },
                        
                    ],
                    selModel: {
                        selType: 'checkboxmodel',
                        listeners: {
                            selectionchange:'onDashboardGrdSelChng'
                        }
                    }

                }]
        }
    ],
    listeners: {
        afterrender: 'onActivateDashboardDetailsWin',
        beforerender : 'onBeforeLoadDashboardPanel',
    }

});