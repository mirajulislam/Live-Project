Ext.define('Desktop.view.atmDispute.DisputePanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.disputePanel',

    requires: [
        'Desktop.view.atmDispute.AtmDisputeController',
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
    controller: 'atmDisputeController',

    viewModel: {
        type: 'atmDisputeController'
    },
    id: 'disputePanelMain',
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
            id: 'atmDisputeHome',
            reference: 'atmDisputeHome',
            margin: '5 0 0 0',
            tabPosition: 'bottom',
            listeners: {
                tabchange: 'onMainAtmDisputeTabChange'
            },
            items: [{
                    xtype: 'panel',
                    id: 'atmDisputeSearchPanel',
                    layout: 'fit',
                    title: 'Dispute',
                    tabConfig: {
                        xtype: 'tab',
                        id: 'atmDisputeSearchTabPanelId',
                        itemId: 'atmDisputeSearchTabPanel'
                    },
                    dockedItems: [{
                        xtype: 'panel',
                        dock: 'top',
                        itemId: 'atmDisputeSearchItemProperties',
                        reference: 'atmDisputeSearchItemProperties',
                        layout: 'column',
                        collapseDirection: 'top',
                        collapsed: false,
                        collapsible: true,
                        title: 'AtmDispute Search',
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            shadow: true,
                            itemId: 'atmDisputeSearchTollbar',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [{
                                    xtype: 'button',
                                    padding: 2,
                                    text: 'Search',
                                    reference: 'atmDisputeSearchBtn',
                                    listeners: {
                                        click: 'onClickSearchAtmDispute'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    padding: 3,
                                    text: 'Clear',
                                    listeners: {
                                        click: 'onClickAtmDisputeClear'
                                    }
                                }
                            ]
                        }],
                        items: [{
                                xtype: 'textfield',
                                itemId: 'name',
                                reference: 'name',
                                fieldLabel: 'Name',
                                columnWidth: .25,
                                labelAlign: 'right',
                                labelWidth: 70,
                                margin: '5 5 5 5',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'cardNumber',
                                reference: 'cardNumber',
                                fieldLabel: 'Card Number',
                                columnWidth: .25,
                                labelAlign: 'right',
                                labelWidth: 90,
                                margin: '5 5 5 5',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'accountNumber',
                                reference: 'accountNumber',
                                fieldLabel: 'A/c Number',
                                columnWidth: .25,
                                labelAlign: 'right',
                                labelWidth: 95,
                                margin: '5 5 5 5',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'atmLocation',
                                reference: 'atmLocation',
                                fieldLabel: 'Location',
                                columnWidth: .25,
                                labelAlign: 'right',
                                labelWidth: 50,
                                margin: '5 5 5 5',
                            }
                           
                        ]
                    }],
                    items: [{
                        xtype: 'gridpanel',
                        reference: 'atmDisputeMainSearchGrid',
                        itemId: 'atmDisputeMainSearchGrid',
                        multiSelect: true,
                        loadMask: true,
                        store: 'gAtmDisputeViewStore',
                        plugins: [{
                            ptype: 'gridfilters'
                        }],
                        listeners: {
                            itemdblclick: 'onDisputeGridItemDblClick',
                        },
                        viewConfig: {
                            stripeRows: true,
                            enableTextSelection: true,
                        },
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            itemId: 'searchAtmDisputeGridUprToolbar',
                            items: [{
                                    xtype: 'textfield',
                                    itemId: 'atmDisputeGridLocalFilter',
                                    fieldLabel: 'Grid Filter',
                                    padding: 3,
                                    left: '6px',
                                    width: 300,
                                    labelWidth: 65,
                                    listeners: {
                                        change: 'onAtmDisputeGridFilter'
                                    }
                                }
                            ]
                        }],
                        features: [{
                            ftype: 'grouping',
                            groupHeaderTpl: '{name} ({children.length})',
                            enableNoGroups: true
                        }],
                        columns: [{
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 100,
                                dataIndex: 'customerComplaintKey',
                                hidden: true,
                                sortable: true,
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
                                header: "Account No",
                                align: 'center',
                                width: 120,
                                sortable: true,
                                dataIndex: 'accountNumber',
                                filter: { type: 'string' }
                            },   
                            {
                                header: "Card Number",
                                align: 'center',
                                width: 120,
                                sortable: true,
                                dataIndex: 'cardNumber',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Dispute Amount",
                                align: 'center',
                                width: 120,
                                sortable: true,
                                dataIndex: 'txnAmount',
                                filter: { type: 'number' },
                                renderer: function(value, meta, record) {
                                    if (value == -2147483648 || value == null || value === undefined) return 0;
                                    return value;
                                }
                            },
                            {
                                header: "Claimed Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d',
                                width: 120,
                                sortable: true,
                                dataIndex: 'txnDate',
                                filter: { type: 'date' }
                            },
                            {
                                header: "ATM Location",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'atmLocation',
                                filter: { type: 'list' }
                            },
                            {
                                header: "Current Status",
                                align: 'center',
                                width: 120,
                                sortable: true,
                                dataIndex: 'stateName',
                                filter: { type: 'string' }
                            },  
                            {
                                header: "Comments",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'comment',
                                filter: { type: 'string' }
                            },                                                                                                                                   
                            {
                                header: "Last Action Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d h:i:s A',
                                width: 120,
                                sortable: true,
                                dataIndex: 'dttMod',
                                filter: { type: 'date' }
                            },
                            {
                                header: "Creation Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d h:i:s A',
                                width: 120,
                                sortable: true,
                                dataIndex: 'createDate',
                                filter: { type: 'date' }
                            },
                            {
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 150,
                                dataIndex: 'legalEntityName',
                                sortable: true,
                                hidden: true,
                                text: 'Creator Branch',
                            },                                                  
                        ],
                        // selModel: {
                        //     selType: 'checkboxmodel',
                        //     listeners: {
                        //         selectionchange: 'onAtmDisputeGrdSelChng'
                        //     }
                        // }
                    }]
                },
            ]
        },
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            id: 'atmDisputeWestPanel',
            margin: '5 0 0 0',
            width: 210,
            layout: 'accordion',
            collapsed: false,
            collapsible: true,
            title: 'Dispute Menu',
            titleCollapse: true,

            items: [{
                    xtype: 'treepanel',
                    reference: 'atmDisputeStatusTree',
                    id: 'atmDisputeStatusTree',
                    title: 'Status',
                    useArrows: true,
                    rootVisible: false,
                    tools: [{
                        type: 'refresh',
                        itemId: 'atmDisputeStatusGridRefresh',
                        reference: 'atmDisputeStatusGridRefresh',
                        tooltip: 'Refresh Data',
                        disabled: false,
                        hidden: false,
                        listeners: {
                            click: 'onAtmDisputeRefreshStatusTree'
                        }
                    }]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onActivateCardPanelRender',
        // beforerender: 'onBeforeLoadAtmDisputePanel',
    }
});