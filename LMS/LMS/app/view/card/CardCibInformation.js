var loanForm = Ext.define('Desktop.view.loan.CardCibInformation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.CardCibInformation',
    itemId: 'CardCibInformation',
    reference: 'CardCibInformation',
    xtype : 'CardCibInformation',
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

    controller: 'cardPanel',
    viewModel: {
        type: 'cardPanel'
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
                                    value: 'A'
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
                                    value: 'TL'
                                }, {
                                    name: 'Bai-Muazzal (Instalment Payment)',
                                    value:'BI'
                                }, {
                                    name: 'Bai-Muazzal (Real Estate)',
                                    value:'BM'
                                }, {
                                    name: 'Financial Leasing',
                                    value:'FL'
                                }, {
                                    name: 'Demand Loan (Instalment repayment)',
                                    value:'DI'
                                }, {
                                    name: 'Hire-Purchase',
                                    value:'HP'
                                }, {
                                    name: 'Hire-Purchase under shirkatul Meelk',
                                    value:'HS'
                                }, {
                                    name: 'Ijara (Lease Finance)',
                                    value:'IJ'
                                }, {
                                    name: 'Mortgage loan',
                                    value:'MG'
                                }, {
                                    name: 'Operational Leasing',
                                    value:'OL'
                                }, {
                                    name: 'Other instalment contract',
                                    value:'OI'
                                },{
                                    name: 'Packing Credit (Instalment repayment)',
                                    value:'PI'
                                }, {
                                    name: 'Partially Secured Term Loan',
                                    value:'PS'
                                }, {
                                    name: 'Charge Card (Payable in full each month)',
                                    value:'CG'
                                }, {
                                    name: 'Credit Card (Revolving)',
                                    value:'CR'
                                }, {
                                    name: 'Revolving Credit',
                                    value:'RV'
                                }, {
                                    name: 'Any other Pre-shipment Credit',
                                    value:'OP'
                                }, {
                                    name: 'Bai-Muazzal Pre-shipment Credit',
                                    value:'PC'
                                }, {
                                    name: 'Bai-Muazzal; Bai-Muazzal WES/Bills',
                                    value:'BB'
                                }, {
                                    name: 'Bai-Murabaha',
                                    value:'BU'
                                }, {
                                    name: 'Bai-Murabaha-commercial',
                                    value:'BC'
                                },{
                                    name: 'Bai-Murabaha-TR',
                                    value: 'TR'
                                }, {
                                    name: 'Cash Credit against Hypothecation',
                                    value:'CH'
                                }, {
                                    name: 'Cash Credit against Pledge',
                                    value:'CP'
                                }, {
                                    name: 'Demand Loan (Not Installment)',
                                    value:'DN'
                                }, {
                                    name: 'Export Credit',
                                    value:'EX'
                                }, {
                                    name: 'Export loan against Foreign Bill Purchased',
                                    value:'FB'
                                }, {
                                    name: 'Export loan against Local Bill Purchased',
                                    value:'LB'
                                }, {
                                    name: 'Finance against Imported Merchandise (FIM)',
                                    value:'FI'
                                }, {
                                    name: 'Foreign Bill Negotiation (FBN)',
                                    value:'FN'
                                }, {
                                    name: 'Foreign Bill Purchase (FBP)',
                                    value:'FP'
                                }, {
                                    name: 'Guarantee (non funded)',
                                    value:'GU'
                                },{
                                    name: 'Letter of credit (non funded)',
                                    value:'LC'
                                }, {
                                    name: 'Loan Against Imported Merchandise (LIM)',
                                    value:'LI'
                                }, {
                                    name: 'Loan Against Imported Merchandise (LTR)',
                                    value:'LT'
                                }, {
                                    name: 'Murabaha Bills, Murabaha Bill of Exchange (General) Import Bills',
                                    value:'MB'
                                }, {
                                    name: 'Murabaha Post Import (MPI)',
                                    value:'MP'
                                }, {
                                    name: 'Murabaha Post Import Trust Receipt (MPITR)',
                                    value:'MT'
                                }, {
                                    name: 'Musharaka (General)',
                                    value:'MS'
                                }, {
                                    name: 'Musharaka (Local Purchase-Hypo)',
                                    value:'PH'
                                }, {
                                    name: 'Musharaka Documentary Bills(MDB)',
                                    value:'MD'
                                }, {
                                    name: 'Musharaka on consigment basis',
                                    value:'MC'
                                },{
                                    name: 'Musharaka Pre-shipment, Bai-Salam',
                                    value:'BS'
                                }, {
                                    name: 'Other indirect facility (non funded)',
                                    value:'OF'
                                }, {
                                    name: 'Other non instalment contract',
                                    value:'ON'
                                }, {
                                    name: 'Overdraft',
                                    value:'OD'
                                }, {
                                    name: 'Packing Credit (Not Installment)',
                                    value:'PN'
                                }, {
                                    name: 'PAD/BLC/BE loan against doc/bills',
                                    value:'BL'
                                }, {
                                    name: 'Post-shipment Finance',
                                    value:'PF'
                                }, {
                                    name: 'Quard (All types)',
                                    value:'QA'
                                }, {
                                    name: 'Working capital financing',
                                    value:'WK'
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
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
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
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
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
                                    value:'M'
                                }
                            ]
                        }),
                    },
                    {
                        xtype : 'textfield',
                        hidden: true,
                        reference : 'cardIdForNewPerson'
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
                        itemId: 'nid',
                        reference: 'nid',
                        fieldLabel: 'NID',
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
                                inputValue: 'M' ,
                                checked: true
                            },
                            { 
                                boxLabel: 'Female',
                                reference : 'female', 
                                itemId : 'female', 
                                inputValue: 'F',                                
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
                                    name: 'BANGLADESH',
                                    value:'BD'
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
                                    name: 'BANGLADESH',
                                    value:'BD'
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
                                    name: 'BANGLADESH',
                                    value:'BD'
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
                                    value:'1'
                                },
                                {
                                    name: 'DRIVING LICENSE',
                                    value:'2'
                                },
                                {
                                    name: 'BIRTH REGISTRATION',
                                    value:'3'
                                }
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
                                    name: 'BANGLADESH',
                                    value:'BD'
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
                                inputValue: '1',
                                checked: true 
                            },
                            { 
                                boxLabel: 'Public',
                                reference : 'public', 
                                itemId : 'public', 
                                inputValue: '9',                               
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
                                    value:'911000'
                                },
                                {
                                    name: '111000 - Food Ministry ( Including food divisions/directorates)',
                                    value:'111000'
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
                    title: 'Contact Number & Contract Details',
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
                        itemId: 'contractHistory',
                        reference: 'contractHistory',
                        fieldLabel: 'Contract History' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 120,
                        columnWidth: .55,
                        margin: '5 10 10 15',
                        items: [
                            { 
                                boxLabel: '12 month',
                                reference : '12Month', 
                                itemId : '12Month', 
                                inputValue: '12',
                                checked: true 
                            },
                            { 
                                boxLabel: '24 month',
                                reference : '24Month', 
                                itemId : '24Month', 
                                inputValue: '24',                               
                            }            
                        ]
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'newInQueryContractPhase',
                        reference: 'newInQueryContractPhase',
                        fieldLabel: 'Contract Phase',
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
                                    name: 'All Loans',
                                    value:'TM'
                                },
                                {
                                    name: 'Only Living Loans',
                                    value:'LV'
                                }
                            ]
                        }),
                    }                                  
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
                                click: 'onClickCardNewPerson'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Close',
                            listeners: {
                                click: 'onClickCloseCardCib'
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
                    xtype: 'combobox',
                    itemId: 'contractPhase',
                    reference: 'contractPhase',
                    fieldLabel: 'Contract Phase'+ '<span class="req" style="color:red">*</span>',
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
                    columnWidth: .50,                
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: [
                            {
                                name: 'All Loans',
                                value:'TM'
                            },
                            {
                                name: 'Only Living Loans',
                                value:'LV'
                            }
                        ]
                    }),
                },
                {
                    xtype: 'radiogroup',
                    itemId: 'codeContractHistory',
                    reference: 'codeContractHistory',
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
                            inputValue: '12',
                            checked: true 
                        },
                        { 
                            boxLabel: '24 month',
                            reference : '24Month', 
                            itemId : '24Month', 
                            inputValue: '24',                               
                        }            
                    ]
                }, 
                {
                    xtype: 'combobox',
                    itemId: 'subjectTypeCode',
                    reference: 'subjectTypeCode',
                    fieldLabel: 'Subject Type Code'+ '<span class="req" style="color:red">*</span>',
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
                    columnWidth: .50,                
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: [
                            {
                                name: 'CIB subject code',
                                value:'C'
                            },
                            {
                                name: 'F.I. subject code',
                                value:'F'
                            }
                        ]
                    }),
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
                                click: 'onClickCardCheckInquiry'
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Close',
                            listeners: {
                                click: 'onClickCloseCardCib'
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
            afterrender: 'onCardActivateCibForm'
        }
    
});