
Ext.define('Desktop.view.card.CardAddToCardGroupDetails',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.cardGrouping',
    xtype : 'CardAddToCardGroupDetails',

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

    // viewModel: {
    //     type: 'loanGrouping'
    // },
    id: 'CardAddToCardGroupDetails',
    reference: 'CardAddToCardGroupDetails',
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
                itemId: 'addToloanGroupSearchPanel',
                layout: 'column',
                collapseDirection: 'top',
                collapsed: false,
                collapsible: true,
                title: 'Grouping Card Search',
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
                            reference: 'addToloanGroupSearchBtn',
                            listeners: {
                                click: 'onAddToCardGroupSearch'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Clear',
                            listeners: {
                                click: 'onAddToCardGroupSearchClear'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Refresh',
                            listeners: {
                                click: 'onCardGroupSearchRefresh'
                            }
                        }
                    ]
                }],
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'ccTrackingNumber',
                        reference: 'ccTrackingNumber',
                        fieldLabel: 'Tracking Number',
                        columnWidth: .32,
                        labelAlign: 'right',
                        labelWidth: 100,
                        margin : '5 5 5 5',
                    },
                    {
                        xtype: 'datefield',
                        columnWidth: 0.34,
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
                        columnWidth: 0.34,
                        itemId: 'toDate',
                        reference: 'toDate',
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
                    reference: 'addToCardGroupGrid',
                    itemId: 'addToCardGroupGrid',
                    multiSelect: true,
                    loadMask: true,
                    autoScroll : true,
                    scrollable : true,
                    height:300,
                    store: 'gAddToCardGroupGridViewStore',
                    plugins: [{
                        ptype: 'gridfilters'
                    }],

                    dockedItems: [
                    {
                        xtype: 'panel',                        
                        reference: 'cardGroupRejectPanel',
                        hidden: true,
                        items:[
                            {
                                xtype: 'displayfield',
                                reference: 'hoCrmCommentCard',
                                labelWidth: 120,
                                fieldLabel: 'CRM Comments',
                                style : "font-weight : 'bold",
                                hidden: true,
                                labelStyle: "font-size:11px;font-weight:bold;",
                                style:"font-size:11px;font-weight:bold;padding:10px 0px 0px 10px;",
                                value: ''
                            },
                            {
                                xtype: 'displayfield',
                                reference: 'cadCommentCard',
                                labelWidth: 100,
                                fieldLabel: 'CAD Comments',
                                 labelStyle: "font-size:11px;font-weight:bold;",
                                style:"font-size:11px;font-weight:bold;padding:10px 0px 0px 10px;",
                                hidden: true,
                                value: ''
                            }
                        ]
                    },
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        itemId: 'searchAddToCardGroupGridToolbar',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'cardGridLocalFilter',
                                fieldLabel: 'Grid Filter',
                                padding: 3,
                                left: '6px',
                                width: 180,
                                labelWidth: 65,
                                listeners: {
                                    change:  'onGridFilterEntryChange'
                                }
                            },
                            {
                                xtype: 'displayfield',
                                reference: 'cardGroupStateName',
                                hidden: true
                            },
                            {
                                xtype: 'displayfield',
                                reference: 'cardGroupId',
                                hidden: true
                            },
                            {
                                xtype: 'displayfield',
                                reference: 'cardSearchValue',
                                hidden: true
                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'cardGroupTotalAmount',
                                reference: 'cardGroupTotalAmount',
                                fieldLabel: 'Total Amount',
                                labelWidth: 80,
                                padding: 3,
                                columnWidth: 0.34,
                                margin : '0 15 0 10',
                                readOnly: true,
                                hidden: true,
                                value: ''
                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'cardGroupTotalFile',
                                reference: 'cardGroupTotalFile',
                                fieldLabel: 'File',
                                labelWidth: 20,
                                padding: 3,
                                columnWidth: 0.34,
                                margin : '0 10 0 5',
                                readOnly: true,
                                hidden: true,
                                value: ''
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'Only Print',
                                name: 'isCardOnlyPrint',
                                columnWidth:.09,
                                reference: 'isCardOnlyPrint',
                                labelAlign: 'left',
                                labelWidth: 40,
                                value: true,
                                disabled: true,
                                hidden: true,
                                margin: '0 5 0 5',
                                listeners: {
                                    change: 'onClickCardOnlyPrint'
                                }
                            },
                            {
                                xtype: 'button',
                                padding: 2,
                                text: 'Add To Group',
                                reference: 'addToCardGroupBtn',
                                disabled: true,
                                listeners: {
                                    click: 'onAddCardToCardGroup'
                                }
                            },
                            {
                                xtype: 'button',
                                padding: 2,
                                text: 'Remove From Group',
                                reference: 'removeFromCardGroupBtn',
                                disabled: true,
                                listeners: {
                                    click: 'onCardRemoveFromCardGroup'
                                }
                            }, 
                            {
                                text: 'Memo Approval Report',
                                tooltip: 'Generate Memo Report',
                                iconCls :'pdf-icon',
                                reference: 'cardMemoReport',
                                itemId: 'cardMemoReport',
                                disabled: true,
                                listeners: {
                                    click: 'generateCardMemoReportSecond'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCardSendToMd',
                                reference: 'btnCardSendToMd',
                                text: 'Send To MD',
                                disabled: true,
                                hidden: true,
                                listeners: {
                                    click: 'onClickbtnCardSendToMd'
                                }
                            },                           
                            {
                                xtype: 'button',
                                itemId: 'btnCardUnlockGroup',
                                reference: 'btnCardUnlockGroup',
                                text: 'Unlock Group',
                                disabled: true,
                                hidden: true,
                                listeners: {
                                    click: 'onClickbtnCardUnlockGroup'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCardMdApproved',
                                reference: 'btnCardMdApproved',
                                text: 'MD Approved',
                                disabled: true,
                                hidden: true,
                                listeners: {
                                    click: 'onClickbtnCardMdApproved'
                                }
                            },
                            {
                                text: 'Match Amount',
                                tooltip: 'Match Group Amount',
                                reference: 'matchCardGroupAmount',
                                itemId: 'matchCardGroupAmount',
                                disabled: true,
                                hidden: true,
                                listeners: {
                                    click: 'onClickMatchGroupAmount'
                                }
                            },
                        ]
                    }],

                    columns: [
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
                            width: 100,
                            dataIndex: 'ccTrackingNumber',
                            sortable: true,
                            text: 'Tracking Number',
                        },
                        {
                            header: "Card Type",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'cardTypeKey',
                            filter: {type: 'list'},
                            renderer: function(value, meta, rec ){
                                var rec = Ext.data.StoreManager.lookup('gCardTypeStore').findRecord('configurationId',value);
                                if(rec){
                                    value = rec.data.value1;
                                }
                                return value;
                            }
                        },
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            width: 100,
                            dataIndex: 'legalEntityName',
                            sortable: true,
                            text: 'Creator Branch',
                        },
                        // {
                        //     header: "State",
                        //     align: 'center',
                        //     width: 100,
                        //     sortable: true,
                        //     dataIndex: 'stateDisplayLabel',
                        //     filter: {type: 'list'}
                        // },
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
                            header: "Application No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicationNumber',
                            filter: {type: 'string'}
                        },                        
                        // {
                        //     header: "Cib Status",
                        //     align: 'center',
                        //     width: 200,
                        //     sortable: true,
                        //     dataIndex: 'cibStatus',
                        //     filter: {type: 'list'}
                        // },
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
                            header: "Purpose of Loan",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'purposeOfLoan',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Interest Rate (%)",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'interestRate',
                            filter: {type: 'number'},
                            renderer: function (value, meta, record) {
                                if (value == -2147483648 || value == null || value === undefined) return 0;
                                return value;
                            }
                        },
                        {
                            header: "Monthly Installment",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'monthlyInstallment',
                            filter: {type: 'number'},
                            renderer: function (value, meta, record) {
                                if (value == -2147483648 || value == null || value === undefined) return 0;
                                return value;
                            }
                        },
                        {
                            header: "Mobile",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'mobile',
                            filter: {type: 'string'}
                        },


                        {
                            header: "Customer Id",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'customerId',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Customer Type",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'idCustomerTypeKey',
                            filter: {type: 'list'},
                            renderer: function(value, meta, rec ){
                                var rec = Ext.data.StoreManager.lookup('gCustTypeStore').findRecord('configurationId',value);
                                if(rec){
                                    value = rec.data.value1;
                                }
                                return value;
                            }
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
                            header: "NID",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'nid',
                            filter: {type: 'string'}
                        },
                        {
                            header: "TIN",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'tin',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Date Of Birth",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d',
                            width: 100,
                            sortable: true,
                            dataIndex: 'dateOfBirth',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Designation",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'designation',
                            filter: {type: 'list'}
                        },
                        {
                            header: "Joining Date",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d',
                            width: 100,
                            sortable: true,
                            dataIndex: 'joiningDate',
                            filter: {type: 'date'}
                        },
                        {
                            header: "Permanent Address",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'permanentAddr',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Office Address",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'officeAddr',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Marital Status",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'maritalStatus',
                            filter: {type: 'list'}
                        },
                        {
                            header: "Mother Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'motherName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Father Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'fatherName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Spouse",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'spouse',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Creator Name",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'creatorName',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Source",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'dataSource',
                            filter: {type: 'string'}
                        },
                        {
                            header: "District",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'district',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Division",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'division',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Card Group ID",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'cardGroupId',
                            filter: {type: 'string'}
                        },
                    ],
                    selModel: {
                        selType: 'checkboxmodel',
                        listeners: {
                            selectionchange:'onAddToCardGroupGridSelectionChange'
                        }
                    }

                }]
        }
    ],
    listeners: {
        afterrender: 'onLoadCardGroupDataARender',
        beforerender : 'onBeforeCardGroupDataARender'
    },
});
