
Ext.define('Desktop.view.card.AcquisitionDetailsView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.acquisitionDetailsView',
    xtype : 'AcquisitionDetailsView',

    requires: [
        'Desktop.view.card.CardController',
        'Desktop.view.card.CardViewModel',
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
    id: 'AcquisitionDetailsView',
    reference: 'AcquisitionDetailsView',
    layout: 'fit',
    border: false,
    modal: true,
    height:520,
    items:[
        {
            xtype: 'panel',
            layout: 'fit',
            dockedItems: [{
                xtype: 'panel',
                dock: 'top',
                itemId: 'addToAcquisitionDetailsViewPanel',
                layout: 'column',
                collapseDirection: 'top',
                collapsed: false,
                collapsible: true,
                title: 'Search',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    shadow: true,
                    itemId: 'AcquisitionDetailsViewTollbar',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [{
                            xtype: 'button',
                            padding: 2,
                            text: 'Search',
                            reference: 'addToAcquisitionDetailsViewSearchBtn',
                            listeners: {
                                click: 'onAddToAcquisitionDetailsViewSearch'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Clear',
                            listeners: {
                                click: 'onClickAcquisitionClear'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Refresh',
                            listeners: {
                                click: 'onAcquisitionDetailsViewRefresh'
                            }
                        }
                    ]
                }],
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'ccTrackingNumberAC',
                        reference: 'ccTrackingNumberAC',
                        fieldLabel: 'Tracking Number',
                        columnWidth: .32,
                        labelAlign: 'right',
                        labelWidth: 100,
                        margin : '5 5 5 5',
                    },
                    {
                        xtype: 'datefield',
                        columnWidth: 0.34,
                        reference: 'fromDateAC',
                        itemId: 'fromDateAC',
                        fieldLabel: 'From Date',
                        labelAlign: 'right',
                        emptyText: 'From Date',
                        labelWidth: 60,
                        margin : '5 5 5 5',
                        format: 'd M Y',
                    }, 
                    {
                        xtype: 'datefield',
                        columnWidth: 0.34,
                        itemId: 'toDateAC',
                        reference: 'toDateAC',
                        fieldLabel: 'To Date',
                        labelAlign: 'right',
                        emptyText: 'To Date',
                        labelWidth: 50,
                        margin : '5 5 5 5',
                        format: 'd M Y',
                    },                 
                    
                ],
            }],            
            items: [{
                    xtype: 'gridpanel',
                    reference: 'addToAcquisitionDetailsView',
                    itemId: 'addToAcquisitionDetailsView',
                    multiSelect: true,
                    loadMask: true,
                    autoScroll : true,
                    scrollable : true,
                    height:300,
                    store: 'gAcquisitionViewStore',
                    listeners: {
                        itemdblclick: 'onAcquitionDblClick',
                    },
                    viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                    },
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        itemId: 'searchCardGridUprToolbar',
                        items: [{
                                xtype: 'textfield',
                                itemId: 'cardGridLocalFilter',
                                fieldLabel: 'Grid Filter',
                                padding: 3,
                                left: '6px',
                                width: 300,
                                labelWidth: 65,
                                // listeners: {
                                //     change: 'onCardGridFilter'
                                // }
                            },
                            {
                                text: 'Acquisition Report',
                                iconCls: 'pdf-icon',
                                tooltip: 'Export to .pdf',
                                reference: 'cardAcquisitionPdf',
                                itemId: 'cardAcquisitionPdf',
                                disabled:true,
                                listeners: {
                                    click: 'generateAcquisitionGridReport'
                                }
                            },
                            {
                                text: 'Bulk Report',
                                tooltip: 'Export to .pdf',
                                reference: 'bulkAcquisitionPdf',
                                itemId: 'bulkAcquisitionPdf',
                                disabled:true,
                                hidden: true,
                                listeners: {
                                    click: 'generateBulkAcquisitionGridReport'
                                }
                            }
                        ]
                    }],
                    plugins: [{
                        ptype: 'gridfilters'
                    }],               
                    columns: [
                    {
                            xtype: 'gridcolumn',
                            align: 'center',
                            width: 100,
                            dataIndex: 'idSupplementAndReferKey',
                            hidden: true,
                            sortable: true,
                            text: 'Card Id',
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            width: 100,
                            dataIndex: 'creditCardId',
                            sortable: true,
                            text: 'Card Tracking Number',
                        },
                        {
                            header: "Applicant Applying For",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantApplyingFor',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Card Type",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantTypeOfCard',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Card Present State ",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'cardStateName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Account No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantAccountNumber',
                            filter: {type: 'string'}
                        },                       
                        {
                            header: "BP No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantBpNumber',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Creation Date",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d h:i:s A',
                            width: 140,
                            sortable: true,
                            dataIndex: 'createDate',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Last Action",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d h:i:s A',
                            width: 140,
                            sortable: true,
                            dataIndex: 'dttMod',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Mobile",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantMobileNumber',
                            filter: {type: 'string'}
                        },
                        {
                            header: "BP No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantBpNumber',
                            filter: {type: 'string'}
                        },
                        {
                            header: "NID",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantNidNumber',
                            filter: {type: 'string'}
                        },
                        {
                            header: "TIN",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantEtinNumber',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Date Of Birth",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d',
                            width: 100,
                            sortable: true,
                            dataIndex: 'applicantDateOfBirth',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Designation",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantDesignation',
                            filter: {type: 'list'}
                        },                       
                        {
                            header: "Marital Status",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantMaritalStatus',
                            filter: {type: 'list'}
                        },
                        {
                            header: "Mother Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantMotherName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Father Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantFatherName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Spouse",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicantSpouseName',
                            filter: {type: 'string'}
                        },              
                    ],
                    selModel: {
                        selType: 'checkboxmodel',
                        listeners: {
                            selectionchange: 'onAcquistionGrdSelChng'
                        }
                    }
                }]
        }
    ],
});
