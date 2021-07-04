var dbrPercent = 65;
var approvalPanelHeaderFooterBgColor = "#F0ECEC";
var approvalPanelHeight = 120;
var approvalPanelBorder = true;

var loanForm = Ext.define('Desktop.view.loan.FieldOfficerInfoDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.FieldOfficerInfoDetails',
    itemId: 'FieldOfficerInfoDetails',
    reference: 'FieldOfficerInfoDetails',
    xtype : 'FieldOfficerInfoDetails',
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

    border: false,
    modal: false,
    layout: 'fit',
    height: 550,
    scrollable: true,
    autoScroll: true,
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            shadow: true,
            itemId: 'addNewLoanTollbar',
            layout: 'column',
            columnWidth: 1,
            autoHeight: true,             
            scrollable: true,
            autoScroll : true,   
            items : [
                {
                    xtype : 'panel',
                    itemId: 'loanSearchPad',
                    reference: 'loanSearchPad',
                    collapsible: true,
                    collapsed: false,
                    columnWidth: 1,
                    layout: 'column',
                    border : true,
                    title: 'Search',
                    dockedItems : [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            itemId: 'loanSearch',
                            items : [
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Clear',
                                    listeners: {
                                        click: 'onClickSearchClearBtn'
                                    }
                                },
                                '->'
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'accountNo',
                            reference: 'accountNo',
                            fieldLabel: 'Account No',
                            columnWidth: .45,
                            focusCls: 'focusClass',
                            labelAlign: 'left',
                            margin: '5 0 5 10',
                            labelWidth: 68,
                            listeners   : {
                                specialkey: 'onKeyPressAccountNoSrc'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'bpNoSrc',
                            reference: 'bpNoSrc',
                            fieldLabel: 'BP No',
                            focusCls: 'focusClass',
                            columnWidth: .5,
                            margin: '5 0 5 0',
                            labelAlign : 'right',
                            listeners   : {
                                specialkey: 'onKeyPressBpNoSrc'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype : 'toolbar',
            dock : 'bottom',
            layout: {
                pack: 'center',
                type: 'hbox',
            },
            items : [
                {
                    xtype: 'button',
                    itemId: 'saveApplicationBtn',
                    reference: 'saveApplicationBtn',
                    text: 'Save',
                    hidden: true,
                    listeners: {
                        click: 'onClickFOCreateApplication'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'deleteApplicationBtn',
                    reference: 'deleteApplicationBtn',
                    text: 'Delete',
                    hidden: true,
                    listeners: {
                        click: 'onClickFODeleteApplication'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'updateApplicationBtn',
                    reference: 'updateApplicationBtn',
                    text: 'Update',
                    hidden: true,
                    listeners: {
                        click: 'onClickFOUpdateApplication'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'submitApplicationBtn',
                    reference: 'submitApplicationBtn',
                    text: 'Submit',
                    hidden: true,
                    listeners: {
                        click: 'onClickFOSubmitApplication'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'closeApplicationBtn',
                    reference: 'closeApplicationBtn',
                    text: 'Close',
                    iconCls: 'remove',
                    listeners: {
                        click: 'onClickFOCloseApplication'
                    }
                }
            ]
        }
    ],
    items : [
        {
            xtype: 'fieldset',
            itemId: 'hiddenPropFieldSet',
            reference: 'hiddenPropFieldSet',
            collapsible: true,
            collapsed: true,
            columnWidth: 1,
            hidden : true,
            layout: 'column',
            margin: '10 10 10 10',
            items : [
                {
                    xtype : 'displayfield',
                    reference : 'loanStateName'
                },
                {
                    xtype : 'displayfield',
                    reference : 'loanStateId'
                },
                {
                    xtype : 'displayfield',
                    reference : 'loanId'
                },
                {
                    xtype : 'displayfield',
                    reference : 'loanVer'
                },
                {
                    xtype : 'displayfield',
                    reference : 'isLoading'
                },
                {
                    xtype : 'displayfield',
                    reference : 'hiddenCustomerType'
                },
                {
                    xtype: 'displayfield',
                    reference: 'keepHiddenCustomerId'
                },
                {
                    xtype: 'displayfield',
                    reference: 'keepHiddenCustomerIdKey'
                },
                { 
                    xtype: 'displayfield',
                    reference: 'keepHiddenloanIdKey'
                },
                { 
                    xtype: 'displayfield',
                    reference: 'hiddenLoanPrefix'
                }
            ]
        },
        {
            xtype : 'form',
            itemId: 'newFOLoanAccount',
            reference: 'newFOLoanAccount',
            collapsible: false,
            collapsed: false,
            columnWidth: 1,
            layout: 'column',
            border : false,
            autoHeight: true,             
            scrollable: true,
            autoScroll: true,
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'bpNo',
                    reference: 'bpNo',
                    fieldLabel: 'BP No' + '<span class="req" style="color:red">*</span>',
                    columnWidth: 1,
                    labelAlign: 'left',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    labelWidth: 200,
                    margin : '5 10 5 10',
                },
                {
                    xtype: 'textfield',
                    itemId: 'acNo',
                    reference: 'acNo',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    fieldLabel: 'AC No' + '<span class="req" style="color:red">*</span>',
                    columnWidth: 1,
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin : '5 10 5 10',
                },
                {
                    xtype: 'textfield',
                    itemId: 'nameOfBorrower',
                    reference: 'nameOfBorrower',
                    columnWidth: 1,
                    fieldLabel: 'Name of Borrower' + '<span class="req" style="color:red">*</span>',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    readOnly: true,
                    fieldStyle: 'background: #7ABDFF'

                },
                {
                    xtype: 'textfield',
                    itemId: 'mobile',
                    reference: 'mobile',
                    columnWidth: 1,
                    fieldLabel: 'Mobile' + '<span class="req" style="color:blue">*</span>',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    fieldStyle: 'background: #7ABDFF',
                    readOnly : true
                },
                {
                    xtype: 'textfield',
                    itemId: 'alternativeMobile',
                    reference: 'alternativeMobile',
                    columnWidth: 1,
                    fieldLabel: 'Alternative Mobile' + '<span class="req" style="color:blue">*</span>',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10'
                },
                {
                    xtype: 'textfield',
                    itemId: 'sourcingBranch',
                    reference: 'sourcingBranch',
                    columnWidth: .70,
                    fieldLabel: 'Sourcing Branch & Staff ID',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    readOnly: true,
                    fieldStyle: 'background: #7ABDFF',
                },
                {
                    xtype: 'textfield',
                    itemId: 'staffId',
                    reference: 'staffId',
                    columnWidth: .30,
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    readOnly: true,
                    fieldStyle: 'background: #7ABDFF',
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadIdCardContainer',
                    items : [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Office Id Card',
                            itemId: 'officeId',
                            reference: 'officeId',
                            columnWidth: .80,
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                        },
                        {
                            xtype: 'filefield',
                            columnWidth: .20,
                            itemId: 'uploadIdCard',
                            reference: 'uploadIdCard',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            },
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'viewIdCardFile',
                            reference: 'viewIdCardFile', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickIdCardViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'officeCardUploaded',
                            reference: 'officeCardUploaded',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'officeCardUploadedYes'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'officeCardUploadedNo',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadNIdCardContainer',
                    items : [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'NID Card' + '<span class="req" style="color:red">*</span>',
                            itemId: 'nid',
                            reference: 'nid',
                            columnWidth: .80,
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                        },
                        {
                            xtype: 'filefield',                           
                            columnWidth: .20,
                            itemId: 'uploadNIdCard',
                            reference: 'uploadNIdCard',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            },
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'viewNidFile',
                            reference: 'viewNidFile', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickNidViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'nidCardUploaded',
                            reference: 'nidCardUploaded',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'nidCardUploadedYes'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'nidCardUploadedNo',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadSignaturePhotoContainer',
                    items : [
                        {
                            xtype: 'filefield',
                            columnWidth:1,
                            fieldLabel: 'Signature Photo',
                            itemId: 'signaturePhoto',
                            reference: 'signaturePhoto',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'viewSignaturePhoto',
                            reference: 'viewSignaturePhoto', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickSignatureViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'radioSignaturePhoto',
                            reference: 'radioSignaturePhoto',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'yesSignaturePhotoRef'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'noSignaturePhotoRef',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    itemId: 'loanType',
                    reference: 'loanType',
                    columnWidth: 1,
                    fieldLabel: 'Loan Type' + '<span class="req" style="color:red">*</span>',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    mode: 'local',
                    displayField: 'value1',
                    valueField: 'configurationId',
                    queryMode: 'local',
                    forceSelection: true,
                    store:'gLoanTypeStore',
                    readOnly: true,
                    hideTrigger: true
                },
                {
                    xtype: 'numberfield',
                    itemId: 'appliedLoanAmount',
                    reference: 'appliedLoanAmount',
                    columnWidth: 1,
                    fieldLabel: 'Asking Loan/Applied Amount',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    format: '0.00',
                    minValue: 0,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    listeners : {
                        change : 'onAppliedLoanAmountChangeFO'
                    }
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadTinContainer',
                    hidden: true,
                    items : [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'TIN' + '<span class="req" style="color:red">*</span>',
                            itemId: 'tin',
                            reference: 'tin',
                            columnWidth: .80,
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                        },
                        {
                            xtype: 'filefield',
                            columnWidth: .20,                   
                            itemId: 'uploadTINFO',
                            reference: 'uploadTINFO',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            },
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'viewTinFile',
                            reference: 'viewTinFile', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickTinViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'tinUploaded',
                            reference: 'tinUploaded',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'tinCardUploadedYes'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'tinCardUploadedNo',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype: 'numberfield',
                    itemId: 'tenorYear',
                    reference: 'tenorYear',
                    columnWidth: 1,
                    fieldLabel: 'Tenor (Year/s)' + '<span class="req" style="color:red">*</span>',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    format: '0.00',
                    minValue: 0,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    listeners : {
                        // change : 'onTenorYearChangeFO'
                    }
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadIdCardContainer',
                    items : [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nid of the guarantor',
                            itemId: 'guarantorNid',
                            reference: 'guarantorNid',
                            columnWidth: .80,
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                        },
                        {
                            xtype: 'filefield',
                            columnWidth: .20,
                            itemId: 'nidOfGuarantorId',
                            reference: 'nidOfGuarantorRef',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            },
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'viewNidOfGuarantorId',
                            reference: 'viewNidOfGuarantorRef', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickNidOfTheGuarantorViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'radioNidOfGuarantorId',
                            reference: 'radioNidOfGuarantorRef',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'yesNidOfGuarantorRef'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'noNidOfGuarantorRef',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    itemId: 'nameOfGuarantor',
                    reference: 'nameOfGuarantor',
                    columnWidth: 1,
                    fieldLabel: 'Name Of the guarantor',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10'
                },
                // {
                //     xtype : 'fieldcontainer',
                //     columnWidth : 1,
                //     layout : 'column',
                //     reference : 'uploadNidOfGuarantorContainer',
                //     items : [
                //         {
                //             xtype: 'filefield',
                //             columnWidth:1,
                //             fieldLabel: 'Nid of the guarantor',
                //             itemId: 'nidOfGuarantorId',
                //             reference: 'nidOfGuarantorRef',
                //             name: 'file',
                //             labelAlign: 'left',
                //             labelWidth: 200,
                //             margin: '5 10 5 10',
                //             buttonText: '...',
                //             listeners: {
                //                 change: function(f,v){
                //                     var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                //                     node.value = v.replace("C:\\fakepath\\","");
                //                 }
                //             }
                //         },
                //         {
                //             xtype: 'button',
                //             columnWidth: .10,
                //             margin: '5 10 5 0',
                //             itemId: 'viewNidOfGuarantorId',
                //             reference: 'viewNidOfGuarantorRef', 
                //             iconCls : 'view_icon',
                //             tooltip: 'View File',
                //             hidden: true,
                //             handler: 'onClickNidOfTheGuarantorViewFile'
                //         },
                //         {
                //             xtype: 'radiogroup',
                //             itemId: 'radioNidOfGuarantorId',
                //             reference: 'radioNidOfGuarantorRef',
                //             fieldLabel: 'Received',
                //             labelAlign: 'left',
                //             labelWidth: 50,
                //             width: 150,
                //             margin: '5 10 5 15',
                //             hidden : true,
                //             items: [
                //                 { 
                //                     boxLabel: 'YES',
                //                     inputValue: '1',
                //                     reference: 'yesNidOfGuarantorRef'
                //                 },
                //                 { 
                //                     boxLabel: 'NO',
                //                     inputValue: '0',
                //                     reference: 'noNidOfGuarantorRef',
                //                     checked: true
                //                 }            
                //             ]
                //         }
                //     ]
                // },               
                {
                    xtype: 'textfield',
                    itemId: 'mobileOfGuarantor',
                    reference: 'mobileOfGuarantor',
                    columnWidth: 1,
                    fieldLabel: 'Mobile Of Guarantor',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                },
                {
                    xtype: 'datefield',
                    itemId: 'dobOfPg',
                    reference: 'dobOfPg',
                    columnWidth: .70,
                    fieldLabel: 'DOB of PG & Age',
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin: '5 10 5 10',
                    format: 'd M Y',
                    listeners: {
                        change: 'onChangeDobOfPgFO'
                    }
                },
                {
                    xtype: 'textfield',
                    itemId: 'dobOfPgYear',
                    reference: 'dobOfPgYear',
                    columnWidth: .30,
                    margin: '5 10 5 10',
                    fieldStyle: 'background: #7ABDFF',
                    readOnly: true
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadSalaryCertificateContainer',
                    items : [
                        {
                            xtype: 'filefield',
                            columnWidth:1,
                            fieldLabel: 'Salary Certificate',
                            itemId: 'uploadsalaryCertificateBtn',
                            reference: 'uploadsalaryCertificateBtn',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'viewSalaryCertificateFile',
                            reference: 'viewSalaryCertificateFile', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickSalaryCertificateViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'salaryCertificateUploaded',
                            reference: 'salaryCertificateUploaded',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'salaryCertificateUploadedYes'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'salaryCertificateUploadedNo',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    itemId: 'verificationEmail',
                    reference: 'verificationEmail',
                    fieldLabel: 'Verification Email' + '<span class="req" style="color:red">*</span>',
                    columnWidth: 1,
                    labelAlign: 'left',
                    labelWidth: 200,
                    margin : '5 10 5 10',
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadAddtionalDocument1Container',
                    items : [
                        {
                            xtype: 'filefield',
                            columnWidth:1,
                            fieldLabel: 'Additional Document 1',
                            itemId: 'additionalDocument1Filefield',
                            reference: 'additionalDocument1Filefield',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'additionalDocument1ViewBtn',
                            reference: 'additionalDocument1ViewBtn', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickAdditionalDocOneViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'additionalDocument1RadioBtn',
                            reference: 'additionalDocument1RadioBtn',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'additionalDocumentYesRadio'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'additionalDocument1NoRadio',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadAddtionalDocument2Container',
                    items : [
                        {
                            xtype: 'filefield',
                            columnWidth:1,
                            fieldLabel: 'Additional Document 2',
                            itemId: 'additionalDocument2Filefield',
                            reference: 'additionalDocument2Filefield',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'additionalDocument2ViewBtn',
                            reference: 'additionalDocument2ViewBtn', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickAdditionalDocTwoViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'additionalDocument2RadioBtn',
                            reference: 'additionalDocument2RadioBtn',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'additionalDocument2YesRadio'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'additionalDocument2NoRadio',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
                {
                    xtype : 'fieldcontainer',
                    columnWidth : 1,
                    layout : 'column',
                    reference : 'uploadAddtionalDocument3Container',
                    items : [
                        {
                            xtype: 'filefield',
                            columnWidth:1,
                            fieldLabel: 'Additional Document 3',
                            itemId: 'additionalDocument3Filefield',
                            reference: 'additionalDocument3Filefield',
                            name: 'file',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 10',
                            buttonText: '...',
                            listeners: {
                                change: function(f,v){
                                    var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                    node.value = v.replace("C:\\fakepath\\","");
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            columnWidth: .10,
                            margin: '5 10 5 0',
                            itemId: 'additionalDocument3ViewBtn',
                            reference: 'additionalDocument3ViewBtn', 
                            iconCls : 'view_icon',
                            tooltip: 'View File',
                            hidden: true,
                            handler: 'onClickAdditionalDocThreeViewFile'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'additionalDocument3RadioBtn',
                            reference: 'additionalDocument3RadioBtn',
                            fieldLabel: 'Received',
                            labelAlign: 'left',
                            labelWidth: 50,
                            width: 150,
                            margin: '5 10 5 15',
                            hidden : true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    inputValue: '1',
                                    reference: 'additionalDocument3YesRadio'
                                },
                                { 
                                    boxLabel: 'NO',
                                    inputValue: '0',
                                    reference: 'additionalDocument3NoRadio',
                                    checked: true
                                }            
                            ]
                        }
                    ]
                },
            ]
        }
    ],
    listeners: {
        afterrender: 'onActivateNewLoanDetailsWin'
    }
});