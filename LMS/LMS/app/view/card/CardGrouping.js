
Ext.define('Desktop.view.card.CardGrouping',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.cardGrouping',

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

    id: 'cardGroupingMain',
    reference: 'cardGroupingMain',
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
                itemId: 'groupingCardSearchItemProperties',
                layout: 'column',
                collapseDirection: 'top',
                collapsed: false,
                collapsible: true,
                title: 'Grouping Card Search',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    shadow: true,
                    itemId: 'cardSearchTollbar',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [{
                            xtype: 'button',
                            padding: 2,
                            text: 'Search',
                            reference: 'groupCardSearchBtn',
                            listeners: {
                                click: 'onClickGroupingCardSearch'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Clear',
                            listeners: {
                                click: 'onClickCardGroupSearchClear'
                            }
                        }
                    ]
                }],
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'cardGroupId',
                        reference: 'cardGroupId',
                        fieldLabel: 'Grouping Id',
                        columnWidth: .25,
                        labelAlign: 'right',
                        labelWidth: 100,
                        margin : '5 5 5 5',
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'ccGroupStatus',
                        reference: 'ccGroupStatus',
                        fieldLabel: 'Group Status',
                        columnWidth: .25,
                        labelAlign: 'right',
                        labelWidth: 90,
                        margin : '5 5 5 5',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                                         
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'CREATED_GROUP',
                                    value: 'CREATED_GROUP'
                                },
                                {
                                    name: 'PEND_MD_APPROVED',
                                    value: 'PEND_MD_APPROVED'
                                },
                                {
                                    name: 'REJECTED',
                                    value: 'REJECTED'
                                },
                                {
                                    name: 'MD_APPROVED',
                                    value: 'MD_APPROVED'
                                }
                            ]
                        }),
                    },
                    {
                        xtype: 'datefield',
                        columnWidth: 0.25,
                        reference: 'fromDate',
                        itemId: 'fromDate',
                        fieldLabel: 'Created From',
                        labelAlign: 'right',
                        emptyText: 'From Date',
                        labelWidth: 85,
                        margin : '5 5 5 5',
                        format: 'd M Y',
                    }, 
                    {
                        xtype: 'datefield',
                        columnWidth: 0.25,
                        itemId: 'toDate',
                        reference: 'toDate',
                        fieldLabel: 'Created To',
                        labelAlign: 'right',
                        emptyText: 'To Date',
                        labelWidth: 85,
                        margin : '5 5 5 5',
                        format: 'd M Y',
                    },                 
                    
                ],
            }],            
            items: [{
                    xtype: 'gridpanel',
                    reference: 'cardGroupMainSearchGrid',
                    itemId: 'cardGroupMainSearchGrid',
                    multiSelect: true,
                    loadMask: true,
                    store: 'gCardGroupGridViewStore',
                    plugins: [{
                        ptype: 'gridfilters'
                    }],
                    viewConfig: {
                        stripeRows: true,
                        autoHeight: true,
                        enableTextSelection: true,
                        getRowClass: function(record) {},
                        listeners: {
                            itemcontextmenu: function(view, rec, node, index, e) {}
                        }
                    },
                    listeners: {
                        itemdblclick: 'onCardGroupGridItemDblClick',
                    },
                    // listeners: {
                    //     groupcontextmenu: function(view, node, group, e, eOpts) {
                    //         e.stopEvent();
                    //         var contextMenu = Ext.create('Ext.menu.Menu', {
                    //             items: [{
                    //                 text: 'View Loan Group ' + group,
                    //                 handler: function(data) {
                    //                     var title = 'View Card Group ID: '+group;
                    //                     var win = getNewCardAddToCardGroupWindow(title);
                    //                     win.show();
                    //                 }
                    //             }]
                    //         });
                    //         contextMenu.showAt(e.getXY());
                    //     }
                    // },
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        itemId: 'searchCardGridUprToolbar',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'cardGridLocalFilter',
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
                                text: 'Memo Approval Report',
                                tooltip: 'Generate Memo Report',
                                iconCls :'pdf-icon',
                                reference: 'cardMemoReport',
                                itemId: 'cardMemoReport',
                                disabled: true,
                                labelAlign: 'right',
                                listeners: {
                                    click: 'generateCardMemoReport'
                                }
                            },                                                      
                        ]
                    }],

                    // features: [{
                    //     ftype: 'grouping',
                    //     groupHeaderTpl: '{name} ({children.length})',
                    //     enableNoGroups: true,
                    //     // startCollapsed: true,
                    // }],

                    columns: [  
                        {
                            header: "Group Id",
                            align: 'center',
                            width: 100,
                            sortable: true,
                            dataIndex: 'cardGroupId',
                            filter: {type: 'string'}
                        }, 
                        {
                            header: "Total Card",
                            align: 'center',
                            width: 70,
                            sortable: true,
                            dataIndex: 'totalLoanThisGroup',
                            filter: {type: 'number'},
                            renderer: function (value, meta, record) {
                                if (value == -2147483648 || value == null || value === undefined) return 0;
                                return value;
                            }
                        },
                        {
                            header: "Total Amount",
                            align: 'center',
                            width: 150,
                            sortable: true,
                            dataIndex: 'totalGroupAmount',
                            filter: {type: 'number'},
                            renderer: function (value, meta, record) {
                                if (value == -2147483648 || value == null || value === undefined) return 0;
                                return value;
                            }
                        },  
                        {
                            header: "Created By",
                            align: 'center',
                            width: 150,
                            sortable: true,
                            dataIndex: 'creatorName',
                            filter: {type: 'string'}
                        },  
                        {
                            header: "Creation On",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d h:i:s A',
                            width: 140,
                            sortable: true,
                            dataIndex: 'dobOfGroupCreate',
                            filter: {type: 'date'}
                        },                                                      
                        {
                            header: "Group Status",
                            align: 'center',
                            width: 100,
                            sortable: true,
                            dataIndex: 'stateDisplayLabel',
                            filter: {type: 'list'}
                        },                                                                                                                                                                                            
                        {
                            header: "HO-CRM Comments",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'hoCrmComment',
                            filter: {type: 'string'}
                        },
                        {
                            header: "CD Comments",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'cadComment',
                            filter: {type: 'string'}
                        },                                           
                    ],
                    selModel: {
                        selType: 'checkboxmodel',
                        listeners: {
                            selectionchange:'onCardGroupSelChng'
                        }
                    }

                }]
        }
    ]


});
