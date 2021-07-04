var dbrPercent = 65;
var approvalPanelHeaderFooterBgColor = "#F0ECEC";
var approvalPanelHeight = 120;
var approvalPanelBorder = true;

var loanForm = Ext.define('Desktop.view.loan.CibInformationForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CibInformationForm',
    itemId: 'CibInformationForm',
    reference: 'CibInformationForm',
    xtype : 'CibInformationForm',
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

    controller: 'loanPanel',
    viewModel: {
        type: 'loanPanel'
    },
    border: false,
    modal: false,
    layout: 'fit',
    //height: 550,
    scrollable: true,
    autoScroll: true,
    items: [{
        xtype: 'tabpanel',
        region: 'center',
        layout: 'fit',
        id: 'cibHome',
        reference: 'cibHome',
        //margin: '5 0 0 0',
        tabPosition: 'bottom',
        listeners: {
            tabchange:'onMainCibTabChange'
        },
        items: [{
            xtype: 'panel',
            id: 'cibSubjectDataPanel',
            layout: 'fit',
            title: 'SEARCH BY DETAILS',
            tabConfig: {
                xtype: 'tab',
                id: 'cibSubjectDataTabPanelId',
                itemId: 'cibSubjectDataTabPanel',               
            },
            items: [{
                xtype: 'fieldset',
                itemId: 'cibSubjectDatafoField',
                reference: 'cibSubjectDatafoField',
                collapsible: true,
                collapsed: true,
                columnWidth: 1,
                overflowY: 'auto',
                layout: 'column',
                title: 'SEARCH BY SUBJECT DATA (BORROWER/CO-BORROWER/GUARANTOR/OWNER)',
                margin: '10 10 10 10',
                items: [
                {
                    xtype : 'fieldset',
                    itemId: 'searchBySubjetDataForm',
                    reference: 'searchBySubjetDataForm',
                    title: 'Subject Role & Finance Type',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [
                    {
                        xtype: 'combobox',
                        itemId: 'subjectRole',
                        reference: 'subjectRole',
                        fieldLabel: 'Subject Role'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .45,                    
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Borrower',
                                    value: 'Borrower'
                                },
                                {
                                    name: 'Co-Borrower',
                                    value: 'Co-Borrower'
                                },
                                {
                                    name: 'Guarantor',
                                    value: 'Guarantor'
                                },
                                {
                                    name: 'Owner',
                                    value: 'Owner'
                                }
                            ]
                        }),
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'typeOfFinancing',
                        reference: 'typeOfFinancing',
                        fieldLabel: 'Type of financing'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Term Loan',
                                    value: 'Term Loan'
                                }, {
                                    name: 'Bai-Muazzal (Instalment Payment)',
                                    value:'Bai-Muazzal (Instalment Payment)'
                                }, {
                                    name: 'Bai-Muazzal (Real Estate)',
                                    value:'Bai-Muazzal (Real Estate)'
                                }, {
                                    name: 'Financial Leasing',
                                    value:'Financial Leasing'
                                }, {
                                    name: 'Demand Loan (Instalment repayment)',
                                    value:'Demand Loan (Instalment repayment)'
                                }, {
                                    name: 'Hire-Purchase',
                                    value:'Hire-Purchase'
                                }, {
                                    name: 'Hire-Purchase under shirkatul Meelk',
                                    value:'Hire-Purchase under shirkatul Meelk'
                                }, {
                                    name: 'Ijara (Lease Finance)',
                                    value:'Ijara (Lease Finance)'
                                }, {
                                    name: 'Mortgage loan',
                                    value:'Mortgage loan'
                                }, {
                                    name: 'Operational Leasing',
                                    value:'Operational Leasing'
                                }, {
                                    name: 'Other instalment contract',
                                    value:'Other instalment contract'
                                },{
                                    name: 'Packing Credit (Instalment repayment)',
                                    value:'Packing Credit (Instalment repayment)'
                                }, {
                                    name: 'Partially Secured Term Loan',
                                    value:'Partially Secured Term Loan'
                                }, {
                                    name: 'Charge Card (Payable in full each month)',
                                    value:'Charge Card (Payable in full each month)'
                                }, {
                                    name: 'Credit Card (Revolving)',
                                    value:'Credit Card (Revolving)'
                                }, {
                                    name: 'Revolving Credit',
                                    value:'Revolving Credit'
                                }, {
                                    name: 'Any other Pre-shipment Credit',
                                    value:'Any other Pre-shipment Credit'
                                }, {
                                    name: 'Bai-Muazzal Pre-shipment Credit',
                                    value:'Bai-Muazzal Pre-shipment Credit'
                                }, {
                                    name: 'Bai-Muazzal; Bai-Muazzal WES/Bills',
                                    value:'Bai-Muazzal; Bai-Muazzal WES/Bills'
                                }, {
                                    name: 'Bai-Murabaha',
                                    value:'Bai-Murabaha'
                                }, {
                                    name: 'Bai-Murabaha-commercial',
                                    value:'Bai-Murabaha-commercial'
                                },{
                                    name: 'Bai-Murabaha-TR',
                                    value: 'Bai-Murabaha-TR'
                                }, {
                                    name: 'Cash Credit against Hypothecation',
                                    value:'Cash Credit against Hypothecation'
                                }, {
                                    name: 'Cash Credit against Pledge',
                                    value:'Cash Credit against Pledge'
                                }, {
                                    name: 'Demand Loan (Not Installment)',
                                    value:'Demand Loan (Not Installment)'
                                }, {
                                    name: 'Export Credit',
                                    value:'Export Credit'
                                }, {
                                    name: 'Export loan against Foreign Bill Purchased',
                                    value:'Export loan against Foreign Bill Purchasede'
                                }, {
                                    name: 'Export loan against Local Bill Purchased',
                                    value:'Export loan against Local Bill Purchased'
                                }, {
                                    name: 'Finance against Imported Merchandise (FIM)',
                                    value:'Finance against Imported Merchandise (FIM)'
                                }, {
                                    name: 'Foreign Bill Negotiation (FBN)',
                                    value:'Foreign Bill Negotiation (FBN)'
                                }, {
                                    name: 'Foreign Bill Purchase (FBP)',
                                    value:'Foreign Bill Purchase (FBP)'
                                }, {
                                    name: 'Guarantee (non funded)',
                                    value:'Guarantee (non funded)'
                                },{
                                    name: 'Letter of credit (non funded)',
                                    value:'Letter of credit (non funded)'
                                }, {
                                    name: 'Loan Against Imported Merchandise (LIM)',
                                    value:'Loan Against Imported Merchandise (LIM)'
                                }, {
                                    name: 'Loan Against Imported Merchandise (LTR)',
                                    value:'Loan Against Imported Merchandise (LTR)'
                                }, {
                                    name: 'Murabaha Bills, Murabaha Bill of Exchange (General) Import Bills',
                                    value:'Murabaha Bills, Murabaha Bill of Exchange (General) Import Bills'
                                }, {
                                    name: 'Murabaha Post Import (MPI)',
                                    value:'Murabaha Post Import (MPI)'
                                }, {
                                    name: 'Murabaha Post Import Trust Receipt (MPITR)',
                                    value:'Murabaha Post Import Trust Receipt (MPITR)'
                                }, {
                                    name: 'Musharaka (General)',
                                    value:'Musharaka (General)'
                                }, {
                                    name: 'Musharaka (Local Purchase-Hypo)',
                                    value:'Musharaka (Local Purchase-Hypo)'
                                }, {
                                    name: 'Musharaka Documentary Bills(MDB)',
                                    value:'Musharaka Documentary Bills(MDB)'
                                }, {
                                    name: 'Musharaka on consigment basis',
                                    value:'Musharaka on consigment basis'
                                },{
                                    name: 'Musharaka Pre-shipment, Bai-Salam',
                                    value:'Musharaka Pre-shipment, Bai-Salam'
                                }, {
                                    name: 'Other indirect facility (non funded)',
                                    value:'Other indirect facility (non funded)'
                                }, {
                                    name: 'Other non instalment contract',
                                    value:'Other non instalment contract'
                                }, {
                                    name: 'Overdraft',
                                    value:'Overdraft'
                                }, {
                                    name: 'Packing Credit (Not Installment)',
                                    value:'Packing Credit (Not Installment)'
                                }, {
                                    name: 'PAD/BLC/BE loan against doc/bills',
                                    value:'PAD/BLC/BE loan against doc/bills'
                                }, {
                                    name: 'Post-shipment Finance',
                                    value:'Post-shipment Finance'
                                }, {
                                    name: 'Quard (All types)',
                                    value:'Quard (All types)'
                                }, {
                                    name: 'Working capital financing',
                                    value:'Working capital financing'
                                }
                            ]
                        }),
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: ' installmentInfoForm',
                    reference: 'installmentInfoForm',
                    title: 'Installment  Info',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [{
                        xtype: 'textfield',
                        itemId: 'numberOfInstallment',
                        reference: 'numberOfInstallment',
                        fieldLabel: 'Number of Installment'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'installmentAmount',
                        reference: 'installmentAmount',
                        fieldLabel: 'Installment Amount'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'totalInstallmentAmount',
                        reference: 'totalInstallmentAmount',
                        fieldLabel: 'Total'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'periodicityofPayment',
                        reference: 'periodicityofPayment',
                        fieldLabel: 'Periodicity of Payment'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Monthly Installments-30 days',
                                    value:'Monthly Installments-30 days'
                                }
                            ]
                        }),
                    },
                    {
                        xtype : 'textfield',
                        hidden: true,
                        reference : 'loanIdForNewPerson'
                    },
                    {
                        xtype : 'textfield',
                        hidden: true,
                        reference : 'lmsNid'
                    },
                    {
                        xtype : 'datefield',
                        hidden: true,
                        reference : 'lmsDateOfBirth'
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: ' individualInfo',
                    reference: 'individualInfo',
                    title: 'Individual Info',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [{
                        xtype: 'textfield',
                        itemId: 'title',
                        reference: 'title',
                        fieldLabel: 'Title',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'nameOfBrrower',
                        reference: 'nameOfBrrower',
                        fieldLabel: 'Name'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'fathertitle',
                        reference: 'fathertitle',
                        fieldLabel: 'Father\'s title',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'fatherName',
                        reference: 'fatherName',
                        fieldLabel: 'Father\'s Name'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'mothertitle',
                        reference: 'mothertitle',
                        fieldLabel: 'Mother\'s title',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'motherName',
                        reference: 'motherName',
                        fieldLabel: 'Mother\'s Name'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'spousetitle',
                        reference: 'spousetitle',
                        fieldLabel: 'Spouse\'s title',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'spouseName',
                        reference: 'spouseName',
                        fieldLabel: 'Spouse\'s Name',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'tin',
                        reference: 'tin',
                        fieldLabel: 'TIN',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'nidpin',
                        reference: 'nidpin',
                        fieldLabel: 'NID PIN',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'dateofBirth',
                        reference: 'dateofBirth',
                        fieldLabel: 'Date of Birth'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'radiogroup',
                        itemId: 'gender',
                        reference: 'gender',
                        fieldLabel: 'Gender' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                        items: [
                            { 
                                boxLabel: 'Male',
                                reference : 'male', 
                                itemId : 'male', 
                                inputValue: 'Male' ,
                                checked: true
                            },
                            { 
                                boxLabel: 'Female',
                                reference : 'female', 
                                itemId : 'female', 
                                inputValue: 'Female',                                
                            }            
                        ]
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'districtOfBirth',
                        reference: 'districtOfBirth',
                        fieldLabel: 'District Of Birth'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'countryOfBirth',
                        reference: 'countryOfBirth',
                        fieldLabel: 'Country of Birth'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Bangladesh',
                                    value:'Bangladesh'
                                },
                                {
                                    name: 'London',
                                    value:'London'
                                }
                            ]
                        }),
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: ' permanentAddress',
                    reference: 'permanentAddress',
                    title: 'Permanent Address',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [
                    {
                        xtype: 'textfield',
                        itemId: 'parmanentDistrict',
                        reference: 'parmanentDistrict',
                        fieldLabel: 'District'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'streetNameAndNumber',
                        reference: 'streetNameAndNumber',
                        fieldLabel: 'Street Name and number'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'postalCode',
                        reference: 'postalCode',
                        fieldLabel: 'Postal Code',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },                    
                    {
                        xtype: 'combobox',
                        itemId: 'parmanentCountryOfBirth',
                        reference: 'parmanentCountryOfBirth',
                        fieldLabel: 'Country of Birth'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Bangladesh',
                                    value:'Bangladesh'
                                },
                                {
                                    name: 'London',
                                    value:'London'
                                }
                            ]
                        }),
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: ' presentAddress',
                    reference: 'presentAddress',
                    title: 'Present Address',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [
                    {
                        xtype: 'textfield',
                        itemId: 'presentDistrict',
                        reference: 'presentDistrict',
                        fieldLabel: 'District',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'preStreetNameAndNumber',
                        reference: 'preStreetNameAndNumber',
                        fieldLabel: 'Street Name and number',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'presentPostalCode',
                        reference: 'presentPostalCode',
                        fieldLabel: 'Postal Code',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },                    
                    {
                        xtype: 'combobox',
                        itemId: 'presentCountryOfBirth',
                        reference: 'presentCountryOfBirth',
                        fieldLabel: 'Country of Birth',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Bangladesh',
                                    value:'Bangladesh'
                                },
                                {
                                    name: 'London',
                                    value:'London'
                                }
                            ]
                        }),
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: ' identificationDocuments',
                    reference: 'identificationDocuments',
                    title: ' Identification Documents',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [                                     
                    {
                        xtype: 'combobox',
                        itemId: 'iDType',
                        reference: 'iDType',
                        fieldLabel: 'ID Type',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .45,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'PASSPORT',
                                    value:'PASSPORT'
                                },
                                {
                                    name: 'DRIVING LICENSE',
                                    value:'DRIVING LICENSE'
                                },
                                {
                                    name: 'BIRTH REGISTRATION',
                                    value:'BIRTH REGISTRATION'
                                },
                                {
                                    name: 'DRIVING LICENSE',
                                    value:'DRIVING LICENSE'
                                },
                                {
                                    name: 'BIRTH REGISTRATION',
                                    value:'BIRTH REGISTRATION'
                                },
                            ]
                        }),
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'iDNumber',
                        reference: 'iDNumber',
                        fieldLabel: 'ID Number',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'iDIssueDate',
                        reference: 'iDIssueDate',
                        fieldLabel: 'ID Issue date',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'iDIssueCountry',
                        reference: 'iDIssueCountry',
                        fieldLabel: 'ID issue country',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: 'Bangladesh',
                                    value:'Bangladesh'
                                },
                                {
                                    name: 'London',
                                    value:'London'
                                }
                            ]
                        }),
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: 'sectorData',
                    reference: 'sectorData',
                    title: 'Sector Data',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [                                     
                    {
                        xtype: 'radiogroup',
                        itemId: 'sectorType',
                        reference: 'sectorType',
                        fieldLabel: 'Sector Type' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                        items: [
                            { 
                                boxLabel: 'Private',
                                reference : 'private', 
                                itemId : 'private', 
                                inputValue: 'Private',
                                checked: true 
                            },
                            { 
                                boxLabel: 'Public',
                                reference : 'public', 
                                itemId : 'public', 
                                inputValue: 'Public',                               
                            }            
                        ]
                    },                   
                    {
                        xtype: 'combobox',
                        itemId: 'sectorCode',
                        reference: 'sectorCode',
                        fieldLabel: 'Sector Code'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        border: 1,
                        labelWidth: 145,
                        margin: '5 10 10 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        editable: false,
                        columnWidth: .55,                
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: '911000 - Service Holders (Salaried Person)',
                                    value:'911000 - Service Holders (Salaried Person)'
                                },
                                {
                                    name: '111000 - Food Ministry ( Including food divisions/directorates)',
                                    value:'111000 - Food Ministry ( Including food divisions/directorates)'
                                }
                            ]
                        }),
                    },
                 ]
                },
                {
                    xtype : 'fieldset',
                    itemId: ' contactNumberHistory',
                    reference: 'contactNumberHistory',
                    title: 'Contact Number & History',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    layout: 'column',
                    margin: '5 5 5 5',
                    items: [
                    {
                        xtype: 'textfield',
                        itemId: 'telephoneNumber',
                        reference: 'telephoneNumber',
                        fieldLabel: 'Telephone number',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .45,
                        margin: '5 10 10 15',
                    },  
                    {
                        xtype: 'radiogroup',
                        itemId: 'ContactHistory',
                        reference: 'ContactHistory',
                        fieldLabel: 'Contact History' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 145,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                        items: [
                            { 
                                boxLabel: '12 month',
                                reference : '12Month', 
                                itemId : '12Month', 
                                inputValue: '12 month',
                                checked: true 
                            },
                            { 
                                boxLabel: '24 month',
                                reference : '24Month', 
                                itemId : '24Month', 
                                inputValue: '24 month',                               
                            }            
                        ]
                    },                                    
                 ]
                },
                ]
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    itemId: 'newPersonInquiryTollbar',
                    items : [
                        '->',
                        {
                            xtype: 'button',
                            text: 'New Person Inquiry',
                            listeners: {
                                click: 'onClickNewPersonBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Close',
                            listeners: {
                                click: 'onClickCIBFormCloseBtn'
                            }
                        },
                        '->'
                    ]
                }
            ]  
        },    
        {
            xtype: 'panel',
            id: 'cibSubjectCodePanel',
            layout: 'column',
            title: 'SEARCH BY CODE',
            tabConfig: {
                xtype: 'tab',
                id: 'cibSubjectCodeTabPanelId',
                itemId: 'cibSubjectCodeTabPanel'               
            },
            items: [{
                xtype: 'fieldset',
                itemId: 'cibSubjectCodeInquiry',
                reference: 'cibSubjectCodeInquiry',
                collapsible: true,
                collapsed: true,
                columnWidth: 1,
                layout: 'column',
                title: 'CIB Subject Code Inquiry',
                margin: '10 10 10 10',
                items: [{
                    xtype: 'textfield',
                    itemId: 'cibSubjectCode',
                    reference: 'cibSubjectCode',
                    columnWidth: .50,
                    fieldLabel: 'CIB Subject Code'+ '<span class="req" style="color:red">*</span>',
                    labelAlign: 'left',
                    labelWidth: 150,
                    margin: '5 10 10 15',
                },
                {
                    xtype: 'radiogroup',
                    itemId: 'codeCountryHistory',
                    reference: 'codeCountryHistory',
                    fieldLabel: 'Contact History' + '<span class="req" style="color:red">*</span>',
                    labelAlign: 'left',
                    labelWidth: 145,
                    columnWidth: .50,
                    margin: '5 10 10 15',
                    items: [
                        { 
                            boxLabel: '12 month',
                            reference : '12Month', 
                            itemId : '12Month', 
                            inputValue: '12 month',
                            checked: true 
                        },
                        { 
                            boxLabel: '24 month',
                            reference : '24Month', 
                            itemId : '24Month', 
                            inputValue: '24 month',                               
                        }            
                    ]
                }, 
                {
                    xtype : 'displayfield',
                    hidden : true,
                    reference : 'loanIdForSubjectCode'
                },
               
                ]
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    itemId: 'checkInquiryTollbar',
                    items : [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Check Inquiry',
                            listeners: {
                                click: 'onClickCheckInquiryBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Close',
                            listeners: {
                                click: 'onClickCIBFormCloseBtn'
                            }
                        },
                        '->'
                    ]
                }
            ]
        }],     
    }
    ],
    listeners: {
            afterrender: 'onActivateCibForm'
        }
    
});