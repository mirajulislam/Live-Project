
Ext.define('Desktop.view.loan.LoanAddToLoanGroupDetails',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.loanGrouping',
    xtype : 'LoanAddToLoanGroupDetails',

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

    // viewModel: {
    //     type: 'loanGrouping'
    // },
    id: 'LoanAddToLoanGroupDetails',
    reference: 'LoanAddToLoanGroupDetails',
    layout: 'fit',
    border: false,
    modal: true,
    height:370,
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
                title: 'Grouping Loan Search',
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
                                click: 'onAddToloanGroupSearch'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Clear',
                            listeners: {
                                click: 'onAddToLoanGroupSearchClear'
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
                    reference: 'addToLoanGroupGrid',
                    itemId: 'addToLoanGroupGrid',
                    multiSelect: true,
                    loadMask: true,
                    autoScroll : true,
                    scrollable : true,
                    height:300,
                    store: 'gAddToLoanGroupGridViewStore',
                    plugins: [{
                        ptype: 'gridfilters'
                    }],

                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'top',
                        itemId: 'searchAddToLoanGroupGridToolbar',
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'loanGridLocalFilter',
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
                                xtype: 'button',
                                padding: 2,
                                text: 'Add To Group',
                                reference: 'addToLoanGroupBtn',
                                disabled: true,
                                listeners: {
                                    click: 'onAddLoanToLoanGroup'
                                }
                            }, 
                        ]
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
                            dataIndex: 'loanTrackingId',
                            sortable: true,
                            text: 'Tracking Number',
                        },
                        {
                            header: "Loan Type",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'idLoanTypeKey',
                            filter: {type: 'list'},
                            renderer: function(value, meta, rec ){
                                var rec = Ext.data.StoreManager.lookup('gLoanTypeStore').findRecord('configurationId',value);
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
                            header: "Application No",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'applicationNo',
                            filter: {type: 'string'}
                        },
                        {
                            header: "Recommended for Approval",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'recommendedForApproval',
                            filter: {type: 'string'},
                            renderer: function(value){
                                if(value < 0){
                                    return null;
                                }
                            }
                        },
                        {
                            header: "Cib Status",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'cibStatus',
                            filter: {type: 'list'}
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
                        // {
                        //     header: "District/Division",
                        //     align: 'center',
                        //     width: 200,
                        //     sortable: true,
                        //     dataIndex: 'districtDivision',
                        //     filter: {type: 'string'},
                        //     renderer: function (value, meta, record) {
                        //         if (value == '/' || value == null || value === undefined) {
                        //             return '';
                        //         }else if(value.substring(0, 1) == '/' ){
                        //             return value.substring(1, value.length);
                        //         }else if(value.substring(value.length-1, value.length) == '/' ){
                        //             return value.substring(0, value.length-1);
                        //         }else{
                        //             return value;   
                        //         }
                                
                        //     }
                        // },
                        {
                            header: "Loan Group ID",
                            align: 'center',
                            width: 200,
                            sortable: true,
                            dataIndex: 'loanGroupId',
                            filter: {type: 'string'}
                        },
                    ],
                    selModel: {
                        selType: 'checkboxmodel',
                        listeners: {
                            selectionchange:'onAddToLoanGroupGridSelectionChange'
                        }
                    }

                }]
        }
    ],
    listeners: {
        //afterrender: 'onLoanAddToLoanGroupDetailsPanelLoad',
    },


});
