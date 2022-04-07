Ext.define('Desktop.view.card.CardPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cardPanel',

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
    id: 'cardMain',
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
            id: 'cardHome',
            reference: 'cardHome',
            margin: '5 0 0 0',
            tabPosition: 'bottom',
            listeners: {
                tabchange: 'onMainCardTabChange'
            },
            items: [{
                    xtype: 'panel',
                    id: 'cardSearchPanel',
                    layout: 'fit',
                    title: 'Card Search',
                    tabConfig: {
                        xtype: 'tab',
                        id: 'cardSearchTabPanelId',
                        itemId: 'cardSearchTabPanel'
                    },
                    dockedItems: [{
                        xtype: 'panel',
                        dock: 'top',
                        itemId: 'cardSearchItemProperties',
                        reference: 'cardSearchItemProperties',
                        layout: 'column',
                        collapseDirection: 'top',
                        collapsed: false,
                        collapsible: true,
                        title: 'Card Search',
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
                                    reference: 'cardSearchBtn',
                                    listeners: {
                                        click: 'onClickSearchCard'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    padding: 3,
                                    text: 'Clear',
                                    listeners: {
                                        click: 'onClickCCSearchClear'
                                    }
                                }
                            ]
                        }],
                        items: [{
                                xtype: 'textfield',
                                itemId: 'ccTrackingNumber',
                                reference: 'ccTrackingNumber',
                                fieldLabel: 'Tracking Number',
                                columnWidth: .28,
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '5 5 5 5',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'bpNoSrc',
                                reference: 'bpNoSrc',
                                fieldLabel: 'BP No',
                                columnWidth: .23,
                                labelAlign: 'right',
                                labelWidth: 60,
                                margin: '5 5 5 5',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'nid4Search',
                                reference: 'nid4Search',
                                fieldLabel: 'NID',
                                columnWidth: .23,
                                labelAlign: 'right',
                                labelWidth: 50,
                                margin: '5 5 5 5',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'accountNo',
                                reference: 'accountNo',
                                fieldLabel: 'Account No',
                                columnWidth: .26,
                                labelAlign: 'right',
                                labelWidth: 95,
                                margin: '5 5 5 5',

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
                                margin: '5 5 5 5',
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
                                margin: '5 5 5 5',
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
                                margin: '5 5 5 5',
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
                                margin: '5 5 5 5'
                            },
                            {
                                xtype: 'combobox',
                                itemId: 'dataSourceCombo',
                                reference: 'dataSourceCombo',
                                columnWidth: 0.28,
                                fieldLabel: 'Source',
                                labelAlign: 'right',
                                labelWidth: 100,
                                margin: '5 5 5 5',
                                mode: 'local',
                                displayField: 'dataSource',
                                valueField: 'dataSource',
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                selectOnFocus: true,
                                store: 'gCardSourceStore'
                            },
                            {
                                xtype: 'checkbox',
                                itemId: 'lastActionDateWiseSearch',
                                reference: 'lastActionDateWiseSearch',
                                fieldLabel: 'Search Last Action Wise',
                                labelAlign: 'right',
                                columnWidth: 0.24,
                                labelWidth: 160,
                                hidden: true,
                                margin: '5 5 5 5',
                            }
                        ]
                    }],
                    items: [{
                        xtype: 'gridpanel',
                        reference: 'cardMainSearchGrid',
                        itemId: 'cardMainSearchGrid',
                        multiSelect: true,
                        loadMask: true,
                        store: 'gCardGridViewStore',
                        plugins: [{
                            ptype: 'gridfilters'
                        }],
                        listeners: {
                            itemdblclick: 'onCardGridItemDblClick',
                            selectionchange: 'onCardSearchGridItemSelect'
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
                                    listeners: {
                                        change: 'onCardGridFilter'
                                    }
                                },
                                {
                                    text: 'Receive',
                                    tooltip: 'Receive Card',
                                    reference: 'misPullFromGridBtn',
                                    disabled: true,
                                    hidden: true,
                                    listeners: {
                                        // click: 'misPullFromGridBtnClick'
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    text: 'Bulk Submit',
                                    tooltip: 'Submit Selected Card',
                                    reference: 'bulkSubmit',
                                    itemId: 'bulkSubmit',
                                    hidden: true,
                                    listeners: {
                                        // click: 'onClickBulkSubmit'
                                    }
                                },
                                {
                                    text: 'Make Group',
                                    tooltip: 'Create Card Group',
                                    iconCls: 'icon-folder2',
                                    reference: 'createCardGroupBtn',
                                    itemId: 'createCardGroupBtn',
                                    disabled: true,
                                    hidden: true,
                                    //style: 'background-color: #AFEEEE' ,
                                    listeners: {
                                        click: 'onCreateCardGroup'
                                    }
                                },
                                {
                                    text: 'Sanction Letter',
                                    tooltip: 'Generate Sanction Letter',
                                    iconCls: 'pdf-icon',
                                    reference: 'cadCardReport',
                                    itemId: 'cadCardReport',
                                    disabled: true,
                                    hidden: true,
                                    listeners: {
                                        // click: 'generateCadReport'
                                    }
                                },
                                {
                                    text: 'HOC Excel Report',
                                    tooltip: 'Export to .pdf',
                                    iconCls: 'export-icon',
                                    reference: 'cardCOfficerExcelReport',
                                    itemId: 'cardCOfficerExcelReport',
                                    disabled: true,
                                    hidden: true,
                                    listeners: {
                                        click: 'generateCardCOfficerExcelReport',
                                    }
                                },
                                {
                                    text: 'CRM Excel Report',
                                    tooltip: 'Export to .pdf',
                                    iconCls: 'export-icon',
                                    reference: 'cardCRMExcelReport',
                                    itemId: 'cardCRMExcelReport',
                                    disabled: true,
                                    hidden: true,
                                    listeners: {
                                        click: 'generateCardMISExcelReport',
                                    }
                                },
                                {
                                    text: 'Card Report',
                                    iconCls: 'pdf-icon',
                                    tooltip: 'Export to .pdf',
                                    reference: 'cardReportAsPdf',
                                    itemId: 'cardReportAsPdf',
                                    // disabled:true,
                                    // hidden: true,
                                    listeners: {
                                        click: 'generateCardGridReport'
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
                                dataIndex: 'creditCardId',
                                hidden: true,
                                sortable: true,
                                text: 'Card Id',
                            },
                            {
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 80,
                                dataIndex: 'applicationNumber',
                                sortable: true,
                                text: 'Application Number',
                            },
                            {
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 80,
                                dataIndex: 'ccTrackingNumber',
                                sortable: true,
                                text: 'Tracking Number',
                            },
                            {
                                header: "Card Type",
                                align: 'center',
                                width: 140,
                                sortable: true,
                                dataIndex: 'cardTypeKey',
                                filter: { type: 'list' },
                                renderer: function(value, meta, rec) {
                                    var rec = Ext.data.StoreManager.lookup('gCardTypeStore').findRecord('configurationId', value);
                                    if (rec) {
                                        value = rec.data.value1;
                                    }
                                    return value;
                                }
                            },
                            {
                                header: "BP No",
                                align: 'center',
                                width: 120,
                                sortable: true,
                                dataIndex: 'bpNo',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Card Group ID",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'cardGroupId',
                                filter: { type: 'string' },
                                renderer: function(value, a, rec) {
                                    if (!value) {
                                        if (rec.data.inGroup == 2) {
                                            return "REMOVED";
                                        }
                                    }

                                    return value;
                                }
                            },
                            {
                                header: "State",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'stateDisplayLabel',
                                filter: { type: 'list' }
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
                            {
                                header: "Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'customerName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Account No",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'accountNo',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Applied Card Amount",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'applicantAskingLimit',
                                filter: { type: 'number' },
                                renderer: function(value, meta, record) {
                                    if (value == -2147483648 || value == null || value === undefined) return 0;
                                    return value;
                                }
                            },
                            {
                                header: "Interest Rate (%)",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'interestRate',
                                filter: { type: 'number' },
                                renderer: function(value, meta, record) {
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
                                filter: { type: 'string' }
                            },


                            {
                                header: "Customer Id",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'customerId',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Customer Type",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'idCustomerTypeKey',
                                filter: { type: 'list' },
                                renderer: function(value, meta, rec) {
                                    var rec = Ext.data.StoreManager.lookup('gCustTypeStore').findRecord('configurationId', value);
                                    if (rec) {
                                        value = rec.data.value1;
                                    }
                                    return value;
                                }
                            },
                            {
                                header: "NID",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'nid',
                                filter: { type: 'string' }
                            },
                            {
                                header: "TIN",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'tin',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Date Of Birth",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d',
                                width: 100,
                                sortable: true,
                                dataIndex: 'dateOfBirth',
                                filter: { type: 'date' }
                            },
                            {
                                header: "Designation",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'designation',
                                filter: { type: 'list' }
                            },
                            {
                                header: "Joining Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d',
                                width: 100,
                                sortable: true,
                                dataIndex: 'joiningDate',
                                filter: { type: 'date' }
                            },
                            {
                                header: "Permanent Address",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'permanentAddr',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Office Address",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'officeAddr',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Marital Status",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'maritalStatus',
                                filter: { type: 'list' }
                            },
                            {
                                header: "Mother Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'motherName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Father Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'fatherName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Spouse",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'spouse',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Creator Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'creatorName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Source",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'dataSource',
                                filter: { type: 'string' }
                            },
                            {
                                header: "District",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'district',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Division",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'division',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Staff Id",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                // hidden: true,
                                dataIndex: 'staffId',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Sourcing Branch",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                // hidden: true,
                                dataIndex: 'sourceBrance',
                                filter: { type: 'string' }
                            },
                        ],
                        selModel: {
                            selType: 'checkboxmodel',
                            listeners: {
                                selectionchange: 'onCardGrdSelChng'
                            }
                        }
                    }]
                },
                {
                    xtype: 'cardGrouping',
                    title: 'Card Grouping',
                    id: 'idCardGrouping',
                    reference: 'idCardGrouping',
                    disabled: true,
                    // hidden: true,
                },
                {
                    xtype: 'acquisitionDetailsView',
                    title: 'Acquisition View',
                    id: 'acquisitionDetailsView',
                    reference: 'acquisitionDetailsView',
                },
                {
                    xtype: 'panel',
                    id: 'ccWorkHistoryTab',
                    layout: 'fit',
                    title: 'Work History',
                    tabConfig: {
                        xtype: 'tab',
                        id: 'ccWorkHistoryTabPanel',
                        itemId: 'ccWorkHistoryTabPanel'
                    },
                    dockedItems: [{
                        xtype: 'panel',
                        dock: 'top',
                        itemId: 'ccWorkHistorySearchProperties',
                        layout: 'column',
                        collapseDirection: 'top',
                        collapsed: false,
                        collapsible: true,
                        title: 'Card Search',
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            shadow: true,
                            itemId: 'ccWorkHistorySearchTollbar',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [{
                                    xtype: 'button',
                                    padding: 2,
                                    text: 'Search',
                                    reference: 'ccWorkHistorySearchBtn',
                                    listeners: {
                                        click: 'onClickCardWorkHistorySearch'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    padding: 3,
                                    text: 'Clear',
                                    listeners: {
                                        click: 'onClickCardWorkHisSearchClear'
                                    }
                                }
                            ]
                        }],
                        items: [{
                                xtype: 'datefield',
                                columnWidth: 0.50,
                                reference: 'fromDateWorkHis',
                                itemId: 'fromDateWorkHis',
                                fieldLabel: 'From Date',
                                labelAlign: 'right',
                                emptyText: 'From Date',
                                labelWidth: 60,
                                margin: '10 10 10 250',
                                format: 'd M Y',
                            },
                            {
                                xtype: 'datefield',
                                columnWidth: 0.23,
                                itemId: 'toDateWorkHis',
                                reference: 'toDateWorkHis',
                                fieldLabel: 'To Date',
                                labelAlign: 'right',
                                emptyText: 'To Date',
                                labelWidth: 50,
                                margin: '10 10 10 10',
                                format: 'd M Y',
                            }
                        ]
                    }],
                    items: [{
                        xtype: 'gridpanel',
                        reference: 'workHistoryCardGrid',
                        itemId: 'workHistoryCardGrid',
                        multiSelect: true,
                        loadMask: true,
                        store: 'gCardWorkHistoryGridStore',
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
                            itemId: 'workHistoryCardGridToolbar',
                            items: [{
                                    xtype: 'textfield',
                                    itemId: 'workHistoryGridFilter',
                                    fieldLabel: 'Grid Filter',
                                    padding: 3,
                                    left: '6px',
                                    width: 300,
                                    labelWidth: 65,
                                    listeners: {
                                        change: 'onGridCDHisFilterEntryChange'
                                    }
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    text: 'Excel Report',
                                    tooltip: 'Export to Excel',
                                    iconCls: 'export-icon',
                                    reference: 'workHistoryCardExcelReport',
                                    itemId: 'workHistoryCardExcelReport',
                                    listeners: {
                                        click: 'generateCardExcelReport',
                                    }
                                }
                            ]
                        }],
                        features: [{
                            ftype: 'grouping',
                            groupHeaderTpl: '{name} ({children.length})',
                            enableNoGroups: true
                        }],

                        selModel: {
                            selType: 'checkboxmodel'
                        },

                        columns: [{
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 100,
                                dataIndex: 'creditCardId',
                                hidden: true,
                                sortable: true,
                                text: 'Card Id',
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
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 150,
                                dataIndex: 'userName',
                                sortable: true,
                                text: 'My Name',
                            },
                            {
                                header: "My Action Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d h:i:s A',
                                width: 140,
                                sortable: true,
                                dataIndex: 'dttMod',
                                filter: { type: 'date' }
                            },
                            {
                                xtype: 'gridcolumn',
                                align: 'center',
                                width: 100,
                                dataIndex: 'actionName',
                                sortable: true,
                                text: 'My Action',
                            },
                            {
                                header: "State After Action",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'stateDisplayLabel',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Current State",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'currentStateName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Creator Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'creatorName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Creation Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d h:i:s A',
                                width: 140,
                                sortable: true,
                                dataIndex: 'createDate',
                                filter: { type: 'date' }
                            },
                            {
                                header: "Card Type",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'cardTypeKey',
                                filter: { type: 'list' },
                                renderer: function(value, meta, rec) {
                                    var rec = Ext.data.StoreManager.lookup('gCardTypeStore').findRecord('configurationId', value);
                                    if (rec) {
                                        value = rec.data.value1;
                                    }
                                    return value;
                                }
                            },
                            {
                                header: "Customer Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'customerName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Customer Id",
                                align: 'center',
                                width: 120,
                                sortable: true,
                                dataIndex: 'customerId',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Customer Type",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'idCustomerTypeKey',
                                filter: { type: 'list' },
                                renderer: function(value, meta, rec) {
                                    var rec = Ext.data.StoreManager.lookup('gCustTypeStore').findRecord('configurationId', value);
                                    if (rec) {
                                        value = rec.data.value1;
                                    }
                                    return value;
                                }
                            },
                            {
                                header: "Account No",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'accountNo',
                                filter: { type: 'string' }
                            },
                            {
                                header: "BP No",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'bpNo',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Interest Rate (%)",
                                align: 'center',
                                width: 150,
                                sortable: true,
                                dataIndex: 'interestRate',
                                filter: { type: 'number' },
                                renderer: function(value, meta, record) {
                                    if (value == -2147483648 || value == null || value === undefined) return 0;
                                    return value;
                                }
                            },
                            {
                                header: "NID",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'nid',
                                filter: { type: 'string' }
                            },
                            {
                                header: "TIN",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'tin',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Date Of Birth",
                                xtype: 'datecolumn',
                                align: 'center',
                                format: 'Y-m-d',
                                width: 100,
                                sortable: true,
                                dataIndex: 'dateOfBirth',
                                filter: { type: 'date' }
                            },
                            {
                                header: "Designation",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'designation',
                                filter: { type: 'list' }
                            },
                            {
                                header: "Permanent Address",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'permanentAddr',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Office Address",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'officeAddr',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Marital Status",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'maritalStatus',
                                filter: { type: 'list' }
                            },
                            {
                                header: "Mother Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'motherName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Father Name",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'fatherName',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Spouse",
                                align: 'center',
                                width: 200,
                                sortable: true,
                                dataIndex: 'spouse',
                                filter: { type: 'string' }
                            },
                            {
                                header: "Source",
                                align: 'center',
                                width: 100,
                                sortable: true,
                                dataIndex: 'dataSource',
                                filter: { type: 'string' }
                            }
                        ]
                    }]
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            id: 'cardWestPanel',
            margin: '5 0 0 0',
            width: 210,
            layout: 'accordion',
            collapsed: false,
            collapsible: true,
            title: 'Card Menu',
            titleCollapse: true,

            items: [{
                    xtype: 'treepanel',
                    reference: 'cardStatusTree',
                    id: 'cardStatusTree',
                    title: 'Status',
                    useArrows: true,
                    rootVisible: false,
                    tools: [{
                        type: 'refresh',
                        itemId: 'cardStatusGridRefresh',
                        reference: 'cardStatusGridRefresh',
                        tooltip: 'Refresh Data',
                        disabled: false,
                        hidden: false,
                        listeners: {
                            click: 'onCardRefreshStatusTree'
                        }
                    }]
                },                
                {
                    xtype: 'treepanel',
                    reference: 'createNewCardTree',
                    id: 'createNewCardTree',
                    title: 'Create New Card Application',
                    useArrows: true,
                    rootVisible: false,
                    tools: [{
                        type: 'refresh',
                        itemId: 'refreshCreateNewCardTree',
                        tooltip: 'Refresh Data',
                        listeners: {
                            click: 'onRefreshCreateNewCardTree'
                        }
                    }]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onActivateCardPanelRender',
        beforerender: 'onBeforeLoadCardPanel',
    }

});