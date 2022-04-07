var approvalPanelHeaderFooterBgColor = "#F0ECEC";
var approvalPanelHeight = 120;
var approvalPanelBorder = true;

var cardForm = Ext.define('Desktop.view.card.AqusitionApplicationForm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.AqusitionApplicationForm',
    itemId: 'AqusitionApplicationForm',
    reference: 'AqusitionApplicationForm',
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

    //    test start
    controller: 'cardPanel',

    border: false,

    viewModel: {
        type: 'cardPanel'
    },
    // test end

    autoShow: true,
    layout: 'fit',
    maximized: true,
    minimizable: true,

    items: [{
        xtype: 'tabpanel',
        region: 'center',
        layout: 'fit',
        id: 'cardDetailsHome',
        reference: 'cardDetailsHome',
        tabPosition: 'bottom',
        // listeners: {
        //     tabchange: 'onCardTabChange'
        // },
        items: [{
                xtype: 'panel',
                itemId: 'step_1',
                reference: 'step_1',
                title: 'Step 1',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_1',
                            reference: 'prev_1',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            disabled: true,
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn',
                            reference: 'acquisitionUpdateBtn',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_1',
                            reference: 'next_1',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [{
                        xtype: 'textfield',
                        itemId: 'applicantTId',
                        reference: 'applicantTId',
                        fieldLabel: 'TID',
                        columnWidth: 1,
                        labelAlign: 'right',
                        labelWidth: 900,
                        margin: '10 10 10 10',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'applicantCustomerType',
                        reference: 'applicantCustomerType',
                        fieldLabel: 'Customer Type',
                        columnWidth: 1,
                        labelAlign: 'right',
                        labelWidth: 900,
                        margin: '10 10 10 10',
                        // margin: '5 558 5 -420',
                        hidden: true,
                        // readOnly: false,
                        // listeners: {
                        //     click: 'onapplicantaccountnumber'
                        // }
                    },
                    {
                        xtype: 'form',
                        itemId: 'newFOCardAccount1',
                        reference: 'newFOCardAccount1',
                        collapsible: false,
                        collapsed: false,
                        layout: 'column',
                        border: false,
                        autoHeight: true,
                        scrollable: true,
                        autoScroll: true,
                        items: [{
                                xtype: 'fieldset',
                                itemId: 'applicantPersonalInfoField',
                                reference: 'applicantPersonalInfoField',
                                collapsible: true,
                                collapsed: false,
                                columnWidth: 1,
                                layout: 'column',
                                title: 'ABOUT YOUR APPLICATION',
                                margin: '10 10 10 10',
                                items: [{
                                        xtype: 'displayfield',
                                        hidden: true,
                                        reference: 'hiddentCreditCardId'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        hidden: true,
                                        reference: 'hiddentidAcquisitionApplicantKey'
                                    },
                                    {
                                        xtype: 'displayfield',
                                        itemId: 'applicantCustomerType1',
                                        reference: 'applicantCustomerType1',
                                        columnWidth: .15,
                                        fieldLabel: 'Customer Type',
                                        labelAlign: 'left',
                                        labelWidth: 88,
                                        disabled: true,
                                        margin: '5 5 5 30',
                                    },
                                    {
                                        xtype: 'checkbox',
                                        boxLabel: 'New',
                                        name: 'newApplicantCustomerType',
                                        columnWidth: .07,
                                        reference: 'newApplicantCustomerType',
                                        labelAlign: 'left',
                                        labelWidth: 10,
                                        // margin: '5 10 5 -85',
                                        margin: '5 5 5 16',
                                        listeners: {
                                            change: 'onApplicantCustomerType1'
                                        }
                                    },
                                    {
                                        xtype: 'checkbox',
                                        boxLabel: 'Existing CBBL A/C',
                                        name: 'existingApplicantCustomerType',
                                        columnWidth: .12,
                                        reference: 'existingApplicantCustomerType',
                                        labelAlign: 'left',
                                        labelWidth: 10,
                                        margin: '5 5 5 7',
                                        listeners: {
                                            change: 'onApplicantCustomerType2'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantAccountNumber',
                                        reference: 'applicantAccountNumber',
                                        columnWidth: .16,
                                        labelAlign: 'left',
                                        labelWidth: 10,
                                        margin: '5 30 5 0',
                                        hidden: true,
                                        readOnly: false,
                                        listeners: {
                                            change: 'onApplicantAccountNumber'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantNidNumber',
                                        reference: 'applicantNidNumber',
                                        fieldLabel: 'NID Number',
                                        columnWidth: .50,
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        //margin: '5 294 5 232',

                                        listeners: {
                                            change: 'onchangeApplicantNidNumber'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantBpNumber',
                                        reference: 'applicantBpNumber',
                                        fieldLabel: 'BP Number',
                                        emptyText: 'Applicable for Bangladesh Police Employees',
                                        columnWidth: .35,
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        // margin: '5 -130 5 -235'
                                        margin: '5 30 10 -128',
                                        // margin: '5 5 5 5',
                                        listeners: {
                                            change: 'onchangeApplicantBpNumber'
                                        }
                                    },

                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantApplyingFor',
                                        reference: 'applicantApplyingFor',
                                        fieldLabel: 'I am applying for a',
                                        labelStyle: 'font-weight:bold;',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        columnWidth: .50,
                                        margin: '5 30 10 30',
                                        items: [{
                                                itemId: 'applicantApplyingForCreditCard',
                                                reference: 'applicantApplyingForCreditCard',
                                                boxLabel: 'Credit Card',
                                                columnWidth: .50,
                                                inputValue: '0',
                                                // inputValue: 'Credit Card',
                                            },
                                            {
                                                itemId: 'applicantApplyingForPrepaidCard',
                                                reference: 'applicantApplyingForPrepaidCard',
                                                boxLabel: 'Prepaid Card',
                                                columnWidth: .50,
                                                inputValue: '1',
                                                // inputValue: 'Prepaid Card',
                                                margin: '0 0 0 -20'
                                            },
                                            {
                                                itemId: 'applicantApplyingForOthers',
                                                reference: 'applicantApplyingForOthers',
                                                boxLabel: 'Others',
                                                columnWidth: .50,
                                                // inputValue: 'Others',
                                                inputValue: '2',
                                                margin: '0 0 0 -21'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantTypeOfCard',
                                        reference: 'applicantTypeOfCard',
                                        fieldLabel: 'Types of Card',
                                        labelAlign: 'left',
                                        labelWidth: 138,
                                        columnWidth: .55,
                                        margin: '5 15 10 30',
                                        items: [{
                                                itemId: 'applicantTypeOfCardVisaClassic',
                                                reference: 'applicantTypeOfCardVisaClassic',
                                                boxLabel: 'Visa Classic',
                                                labelWidth: 200,
                                                columnWidth: .50,
                                                margin: '0 0 0 -2',
                                                inputValue: '0'

                                            },
                                            {
                                                itemId: 'applicantTypeOfCardVisaGold',
                                                reference: 'applicantTypeOfCardVisaGold',
                                                boxLabel: 'Visa Gold',
                                                labelWidth: 200,
                                                columnWidth: .40,
                                                margin: '0 0 0 -4',
                                                inputValue: '1'

                                            },
                                            {
                                                itemId: 'applicantTypeOfCardVisaPlatinum',
                                                reference: 'applicantTypeOfCardVisaPlatinum',
                                                boxLabel: 'Visa Platinum',
                                                labelWidth: 200,
                                                columnWidth: .60,
                                                margin: '0 0 0 -16',
                                                inputValue: '2'

                                            },
                                            {
                                                itemId: 'applicantTypeOfCardVisaSignature',
                                                reference: 'applicantTypeOfCardVisaSignature',
                                                boxLabel: 'Visa Signature',
                                                labelWidth: 200,
                                                columnWidth: .50,
                                                margin: '0 0 0 -10',
                                                inputValue: '3'


                                            }
                                        ]
                                    }
                                ]

                            },
                            {
                                xtype: 'fieldset',
                                id: 'applicantPersonalDetails',
                                reference: 'applicantPersonalDetails',
                                collapsible: true,
                                collapsed: false,
                                columnWidth: 1,
                                title: 'ABOUT YOURSELF',
                                layout: 'column',
                                margin: '10 10 10 10',
                                items: [{
                                        xtype: 'radiogroup',
                                        itemId: 'applicantGenderNeutralTitle',
                                        reference: 'applicantGenderNeutralTitle',
                                        labelAlign: 'left',
                                        labelWidth: 50,
                                        columnWidth: 1,
                                        margin: '5 30 5 30',
                                        items: [{
                                                itemId: 'applicantGenderNeutralTitleMr',
                                                reference: 'applicantGenderNeutralTitleMr',
                                                boxLabel: 'Mr.',
                                                labelWidth: 20,
                                                inputValue: '0'
                                            },
                                            {
                                                itemId: 'applicantGenderNeutralTitleMs',
                                                reference: 'applicantGenderNeutralTitleMs',
                                                boxLabel: 'Ms.',
                                                labelWidth: 20,
                                                // columnWidth: .20,
                                                margin: '0 0 0 -200',
                                                inputValue: '1'
                                            },
                                            {
                                                itemId: 'applicantGenderNeutralTitleMrs',
                                                reference: 'applicantGenderNeutralTitleMrs',
                                                boxLabel: 'Mrs.',
                                                labelWidth: 50,
                                                // columnWidth: .20,
                                                margin: '0 0 0 -400',
                                                inputValue: '2'
                                            },
                                            {
                                                itemId: 'applicantGenderNeutralTitleOthers',
                                                reference: 'applicantGenderNeutralTitleOthers',
                                                boxLabel: 'Others',
                                                // labelWidth: 200,
                                                // columnWidth: .20,
                                                margin: '0 0 0 -600',
                                                inputValue: '3'
                                            }


                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantName',
                                        reference: 'applicantName',
                                        columnWidth: 1,
                                        fieldLabel: 'Applicant\'s Name <br> (as in Passport/NID)',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        hidden: false,
                                        readOnly: false,
                                        listeners: {
                                            change: 'onchangeApplicantName'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantNameOnCard',
                                        reference: 'applicantNameOnCard',
                                        columnWidth: 1,
                                        fieldLabel: 'Name on Card',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        emptyText: 'Name to appear on the Card (19 Character’s,Please keep one blank space between each part of your name)',
                                        hidden: false,
                                        readOnly: false
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantNameInBangla',
                                        reference: 'applicantNameInBangla',
                                        columnWidth: 1,
                                        fieldLabel: 'মেম্বারের নাম (বাংলায়)',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        hidden: false,
                                        readOnly: false
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantNationality',
                                        reference: 'applicantNationality',
                                        fieldLabel: 'Nationality',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        columnWidth: .51,
                                        margin: '5 30 5 30',
                                        items: [{
                                                itemId: 'applicantNationalityBangladeshi',
                                                reference: 'applicantNationalityBangladeshi',
                                                boxLabel: 'Bangladeshi',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                inputValue: '0'
                                                    //margin: '5 10 5 15'
                                            },
                                            {
                                                boxLabel: 'Others',
                                                itemId: 'applicantNationalityOthers',
                                                reference: 'applicantNationalityOthers',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                margin: '0 0 0 -72',
                                                inputValue: '1',
                                                listeners: {
                                                    change: 'onApplicantNationality'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantSpecifyNationality',
                                        reference: 'applicantSpecifyNationality',
                                        columnWidth: .49,
                                        emptyText: 'please specify your nationality',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        hidden: true,
                                        margin: '5 557 5 -207',
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantProfession',
                                        reference: 'applicantProfession',
                                        columnWidth: .50,
                                        fieldLabel: 'Profession',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                    },
                                    {
                                        xtype: 'datefield',
                                        itemId: 'applicantDateOfBirth',
                                        reference: 'applicantDateOfBirth',
                                        columnWidth: .50,
                                        fieldLabel: 'Date of Birth',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        format: 'd M Y',
                                        listeners: {
                                            change: 'onchangeApplicantDateOfBirth'
                                        }
                                    },



                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantEtinNumber',
                                        reference: 'applicantEtinNumber',
                                        columnWidth: .50,
                                        fieldLabel: 'E-TIN Number',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        listeners: {
                                            change: 'onchangeApplicantEtinNumber'
                                        }
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantGender',
                                        reference: 'applicantGender',
                                        fieldLabel: 'Gender',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        columnWidth: .50,
                                        margin: '5 30 5 30',
                                        items: [{
                                                itemId: 'applicantGenderMale',
                                                reference: 'applicantGenderMale',
                                                boxLabel: 'Male',
                                                labelWidth: 130,
                                                columnWidth: .20,
                                                inputValue: '0',
                                                // margin: '0 10 10 15'
                                            },
                                            {
                                                itemId: 'applicantGenderFemale',
                                                reference: 'applicantGenderFemale',
                                                boxLabel: 'Female',
                                                labelWidth: 130,
                                                columnWidth: .20,
                                                margin: '0 0 0 -30',
                                                inputValue: '1',
                                            },
                                            {
                                                itemId: 'applicantGenderThirdGender',
                                                reference: 'applicantGenderThirdGender',
                                                boxLabel: 'Third Gender',
                                                labelWidth: 130,
                                                columnWidth: .20,
                                                margin: '0 0 0 -60',
                                                inputValue: '2',
                                            }
                                        ],
                                        // listeners: {
                                        //     change: 'onchangeApplicantGender'
                                        // }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantMobileNo',
                                        reference: 'applicantMobileNo',
                                        columnWidth: .50,
                                        fieldLabel: 'Mobile Number:',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        maxLength: 11,
                                        listeners: {
                                            change: 'onchangeApplicantMobileNo'
                                        }
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantOtherPhotoID',
                                        reference: 'applicantOtherPhotoID',
                                        fieldLabel: 'Other Photo ID',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        columnWidth: .50,
                                        margin: '5 30 5 30',
                                        items: [{
                                                itemId: 'applicantOtherPhotoIDPassport',
                                                reference: 'applicantOtherPhotoIDPassport',
                                                boxLabel: 'Passport',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                inputValue: '1',
                                                //  margin: '0 10 10 15'
                                            },
                                            {
                                                itemId: 'applicantOtherPhotoIDOthers',
                                                reference: 'applicantOtherPhotoIDOthers',
                                                boxLabel: 'Others',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                inputValue: '4',
                                                margin: '0 0 0 -81'
                                            }
                                        ],                                       
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantPassportNo',
                                        reference: 'applicantPassportNo',
                                        columnWidth: .50,
                                        fieldLabel: 'Passport Number',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        listeners: {
                                            change: 'onchangeApplicantPassportNo'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantIdIssueCountry',
                                        reference: 'applicantIdIssueCountry',
                                        columnWidth: .50,
                                        fieldLabel: 'ID Issue Country',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        listeners: {
                                            change: 'onchangeApplicantIdIssueCountry'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        itemId: 'applicantIdIssueDate',
                                        reference: 'applicantIdIssueDate',
                                        columnWidth: .50,
                                        fieldLabel: 'Date of Issue',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        format: 'd/m/Y',
                                        hidden: false,
                                        listeners: {
                                            change: 'onchangeIdIssueDate'
                                        }
                                    },
                                    {
                                        xtype: 'datefield',
                                        itemId: 'applicantIdIssueDateExp',
                                        reference: 'applicantIdIssueDateExp',
                                        columnWidth: .50,
                                        fieldLabel: 'Date of Exp.',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        format: 'd/m/Y',
                                        listeners: {
                                            change: 'onchangeIdIssueDateExp'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantFatherName',
                                        reference: 'applicantFatherName',
                                        columnWidth: .50,
                                        fieldLabel: 'Father\'s Name',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        hidden: false,
                                        readOnly: false,
                                        listeners: {
                                            change: 'onchangeApplicantFatherName'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantMotherName',
                                        reference: 'applicantMotherName',
                                        columnWidth: .50,
                                        fieldLabel: 'Mother\'s Name',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        hidden: false,
                                        readOnly: false,
                                        listeners: {
                                            change: 'onchangeApplicantMotherName'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantSpouseName',
                                        reference: 'applicantSpouseName',
                                        columnWidth: .50,
                                        fieldLabel: 'Spouse Name',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        listeners: {
                                            change: 'onchangeApplicantSpouseName'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantSpouseMobileNo',
                                        reference: 'applicantSpouseMobileNo',
                                        columnWidth: .50,
                                        fieldLabel: 'Spouse Mobile Number:',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                        maxLength: 11
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantMaritalStatus',
                                        reference: 'applicantMaritalStatus',
                                        fieldLabel: 'Marital Status',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        columnWidth: .30,
                                        margin: '5 5 5 30',
                                        items: [{
                                                itemId: 'applicantMaritalStatusSingle',
                                                reference: 'applicantMaritalStatusSingle',
                                                boxLabel: 'Single',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                inputValue: '0'
                                                    //  margin: '0 10 10 15'
                                            },
                                            {
                                                itemId: 'applicantMaritalStatusMarried',
                                                reference: 'applicantMaritalStatusMarried',
                                                boxLabel: 'Married',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                // margin: '0 0 0 -69',
                                                inputValue: '1'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantMaritalStatusOthers',
                                        reference: 'applicantMaritalStatusOthers',
                                        columnWidth: .20,
                                        fieldLabel: 'Others',
                                        labelAlign: 'left',
                                        labelWidth: 60,
                                        margin: '5 30 5 10',
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantNoOfDependents',
                                        reference: 'applicantNoOfDependents',
                                        columnWidth: .50,
                                        fieldLabel: 'No. of Dependents',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        margin: '5 30 5 30',
                                    },
                                    {
                                        xtype: 'radiogroup',
                                        itemId: 'applicantHighestEducation',
                                        reference: 'applicantHighestEducation',
                                        fieldLabel: 'Highest Education Level',
                                        labelAlign: 'left',
                                        labelWidth: 142,
                                        columnWidth: .60,
                                        margin: '5 10 5 30',
                                        items: [{
                                                itemId: 'applicantHighestEducationSSC',
                                                reference: 'applicantHighestEducationSSC',
                                                boxLabel: 'SSC',
                                                labelWidth: 200,
                                                columnWidth: .10,
                                                margin: '0 0 0 -2',
                                                inputValue: '0'
                                            },
                                            {
                                                itemId: 'applicantHighestEducationHSC',
                                                reference: 'applicantHighestEducationHSC',
                                                boxLabel: 'HSC',
                                                labelWidth: 200,
                                                columnWidth: .10,
                                                //  margin: '0 0 0 -50',
                                                margin: '0 0 0 -20',
                                                inputValue: '1'
                                            },
                                            {
                                                itemId: 'applicantHighestEducationGraduate',
                                                reference: 'applicantHighestEducationGraduate',
                                                boxLabel: 'Graduate',
                                                labelWidth: 200,
                                                columnWidth: .10,
                                                //   margin: '0 0 0 -95',
                                                margin: '0 0 0 -40',
                                                inputValue: '2'
                                            },
                                            {
                                                itemId: 'applicantHighestEducationPostGraduate',
                                                reference: 'applicantHighestEducationPostGraduate',
                                                boxLabel: 'Post Graduate',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                margin: '0 0 0 -33',
                                                inputValue: '3'
                                            },
                                            {
                                                boxLabel: 'Others',
                                                itemId: 'applicantHighestEducationOther',
                                                reference: 'applicantHighestEducationOther',
                                                labelWidth: 200,
                                                columnWidth: .20,
                                                //    margin: '0 0 0 -100',
                                                margin: '0 -25 0 0',
                                                inputValue: '4',
                                                listeners: {
                                                    change: 'onApplicantEducationLevel'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        //Highest Education Level Others
                                        xtype: 'textfield',
                                        // fieldLabel: '(If Others)',
                                        emptyText: 'Please specify your Highest Education Level',
                                        itemId: 'applicantHighestEducationOthers',
                                        reference: 'applicantHighestEducationOthers',
                                        columnWidth: .40,
                                        hidden: true,
                                        labelAlign: 'left',
                                        labelWidth: 130,
                                        margin: '5 30 10 70',

                                    },

                                ]
                            },
                            {
                                xtype: 'fieldset',
                                itemId: 'applicantResidence',
                                reference: 'applicantResidence',
                                collapsible: true,
                                collapsed: false,
                                columnWidth: 1,
                                layout: 'column',
                                title: 'ABOUT YOUR RESIDENCE',
                                margin: '10 10 10 10',
                                items: [{
                                        xtype: 'radiogroup',
                                        itemId: 'applicantResStatus',
                                        reference: 'applicantResStatus',
                                        fieldLabel: 'Residential Status', // + '<span class="req" style="color:red">*</span>',
                                        labelAlign: 'left',
                                        labelWidth: 140,
                                        columnWidth: 1,
                                        margin: '10 10 10 30',
                                        // hidden: true,
                                        items: [{
                                                itemId: 'applicantResStatusOwned',
                                                reference: 'applicantResStatusOwned',
                                                boxLabel: 'Owned',
                                                // itemId: 'owned',
                                                // reference: 'owned',
                                                inputValue: '1',
                                                // checked: true
                                            },
                                            {
                                                itemId: 'applicantResStatusFamilyOwned',
                                                reference: 'applicantResStatusFamilyOwned',
                                                boxLabel: 'Family Owned',
                                                // itemId: 'familyOwned',
                                                // reference: 'familyOwned',
                                                labelWidth: 10,
                                                margin: '0 0 0 -100',
                                                inputValue: '2'

                                            },
                                            {
                                                itemId: 'applicantResStatusRented',
                                                reference: 'applicantResStatusRented',
                                                boxLabel: 'Rented',
                                                // itemId: 'rented',
                                                // reference: 'rented',
                                                margin: '0 0 0 -160',
                                                inputValue: '3'
                                            },
                                            {
                                                itemId: 'applicantResStatusCompanyProvided',
                                                reference: 'applicantResStatusCompanyProvided',
                                                boxLabel: 'Company Provided',
                                                // itemId: 'companyProvided',
                                                // reference: 'companyProvided',
                                                margin: '0 0 0 -260',
                                                inputValue: '4'
                                            },
                                            {
                                                itemId: 'applicantResStatusOthers',
                                                reference: 'applicantResStatusOthers',
                                                boxLabel: 'Others',
                                                // itemId: 'others',
                                                // reference: 'others',
                                                margin: '0 0 0 -300',
                                                inputValue: '5'
                                            }
                                        ]

                                    },

                                    {
                                        xtype: 'fieldset',
                                        id: 'residentialAddressFieldSet1',
                                        reference: 'residentialAddressFieldSet1',
                                        columnWidth: 0.5,
                                        layout: 'column',
                                        margin: '10 15 10 15',
                                        items: [{
                                                xtype: 'textfield',
                                                itemId: 'applicantResiAddress',
                                                reference: 'applicantResiAddress',
                                                columnWidth: 1,
                                                fieldLabel: 'Residential Address',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                //  hidden: true,
                                                margin: '10 5 5 5',
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantResiNearLandmark',
                                                reference: 'applicantResiNearLandmark',
                                                columnWidth: 1,
                                                fieldLabel: 'Nearest Landmark',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                margin: '5 5 5 5',
                                                // margin: '5 -30 5 15',
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantResiAddressPS',
                                                reference: 'applicantResiAddressPS',
                                                columnWidth: 1,
                                                fieldLabel: 'PS. ',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                //  margin: '5 10 5 50',
                                                margin: '5 5 5 5',

                                            },

                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantResiAddressPostCode',
                                                reference: 'applicantResiAddressPostCode',
                                                fieldLabel: 'Post Code',
                                                columnWidth: 1,
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                //  margin: '5 -30 5 15',
                                                margin: '5 5 5 5',

                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantResiAddressDistrict',
                                                reference: 'applicantResiAddressDistrict',
                                                columnWidth: 1,
                                                fieldLabel: 'District',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                //  margin: '5 -15 5 -30',
                                                margin: '5 5 5 5',

                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantResiAddressCountry',
                                                reference: 'applicantResiAddressCountry',
                                                columnWidth: 1,
                                                fieldLabel: 'Country',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                //   margin: '5 10 5 -40',
                                                margin: '5 5 10 5',


                                            },

                                        ]

                                    },
                                    {
                                        xtype: 'fieldset',
                                        id: 'residentialAddressFieldSet2',
                                        reference: 'residentialAddressFieldSet2',
                                        columnWidth: 0.5,
                                        layout: 'column',
                                        margin: '10 15 10 15',
                                        items: [{
                                                xtype: 'textfield',
                                                itemId: 'applicantPerAddress',
                                                reference: 'applicantPerAddress',
                                                columnWidth: 1,
                                                fieldLabel: 'Permanent Address',
                                                labelAlign: 'left',
                                                // labelAlign: 'right',
                                                labelWidth: 138,
                                                margin: '10 5 5 5',
                                                listeners: {
                                                    change: 'onchangeApplicantPerAddress'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantPerAddressNearLand',
                                                reference: 'applicantPerAddressNearLand',
                                                columnWidth: 1,
                                                fieldLabel: 'Nearest Landmark',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                margin: '5 5 5 5',
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantPerAddressPS',
                                                reference: 'applicantPerAddressPS',
                                                columnWidth: 1,
                                                fieldLabel: 'PS. ',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                margin: '5 5 5 5',
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantPerAddressPostCode',
                                                reference: 'applicantPerAddressPostCode',
                                                columnWidth: 1,
                                                fieldLabel: 'Post Code',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                margin: '5 5 5 5',
                                                listeners: {
                                                    change: 'onchangeApplicantPerAddressPostCode'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantPerAddressDistrict',
                                                reference: 'applicantPerAddressDistrict',
                                                columnWidth: 1,
                                                fieldLabel: 'District',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                margin: '5 5 5 5',
                                                listeners: {
                                                    change: 'onchangeApplicantPerAddressDistrict'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                itemId: 'applicantPerAddressCountry',
                                                reference: 'applicantPerAddressCountry',
                                                columnWidth: 1,
                                                fieldLabel: 'Country',
                                                labelAlign: 'left',
                                                labelWidth: 138,
                                                margin: '5 5 10 5',
                                                listeners: {
                                                    change: 'onchangeApplicantPerAddressCountry'
                                                }

                                            }

                                        ]

                                    },
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                id: 'acqusitionFormDocument',
                                reference: 'acqusitionFormDocument',
                                columnWidth: 1,
                                collapsible: true,
                                collapsed: false,
                                layout: 'column',
                                title: 'DOCUMENTATION',
                                margin: '10 10 10 10',
                                items: [{
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadCibUnderTakingContainer',
                                        items: [{

                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Applicant\'s Signature',
                                            itemId: 'uploadApplicantSignature',
                                            reference: 'uploadApplicantSignature',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 5 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadPassportSizePhotoContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Passport Size Photo',
                                            itemId: 'uploadPassportSizePhoto',
                                            reference: 'uploadPassportSizePhoto',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 5 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadTinCertificateContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'TIN Certificate',
                                            itemId: 'uploadTinCertificate',
                                            reference: 'uploadTinCertificate',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 5 30',
                                            hidden: false,
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },

                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadBankStatementContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Bank Statement',
                                            itemId: 'uploadBankStatement',
                                            reference: 'uploadBankStatement',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 5 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        layout: 'column',
                                        reference: 'uploadPassportSizePhotoContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Copy of Valid Passport',
                                            itemId: 'uploadCopyOfValidPassport',
                                            reference: 'uploadCopyOfValidPassport',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 5 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        layout: 'column',
                                        reference: 'uploadTradeLicenseContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Trade License',
                                            itemId: 'uploadTradeLicense',
                                            reference: 'uploadTradeLicense',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 5 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        layout: 'column',
                                        reference: 'uploadBpIdContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'BP ID',
                                            itemId: 'uploadBpId',
                                            reference: 'uploadBpId',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 3 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadSalaryCertificateContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Salary Certificate/ Payslip',
                                            itemId: 'uploadSalaryCertificate',
                                            reference: 'uploadSalaryCertificate',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '5 30 3 30',
                                            hidden: false,
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.50,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadArticlesOfAssociationContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Memorandum/ Articles of Association',
                                            itemId: 'uploadArticlesOfAssociationDocuments',
                                            reference: 'uploadArticlesOfAssociationDocuments',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '2 30 10 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadSupplementaryPassportSizePhotoContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Supplementary Passport Size Photo',
                                            itemId: 'uploadSupplementaryPassportSizePhoto',
                                            reference: 'uploadSupplementaryPassportSizePhoto',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '2 30 10 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploaddAditionalIncomeRelevantContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Additional Income Relevant Document',
                                            itemId: 'uploadAditionalIncomeRelevant',
                                            reference: 'uploadAditionalIncomeRelevant',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '2 30 10 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 0.5,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadIncomeOfSpouseRelevantContainer',
                                        items: [{
                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            fieldLabel: 'Income Of Spouse Relevant Document',
                                            itemId: 'uploadIncomeOfSpouseRelevant',
                                            reference: 'uploadIncomeOfSpouseRelevant',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 140,
                                            margin: '2 30 10 30',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }]
                                    },

                                ]

                            }
                        ],
                    }
                ],
            },
            {
                xtype: 'panel',
                id: 'step_2',
                reference: 'step_2',
                title: 'Step 2',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_2',
                            reference: 'prev_2',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn1',
                            reference: 'acquisitionUpdateBtn1',
                            text: 'Update',
                            hidden: true,
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_2',
                            reference: 'next_2',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [

                    {
                        // ABOUT YOUR WORK
                        // items: [{
                        xtype: 'fieldset',
                        itemId: 'aboutYourWork',
                        reference: 'aboutYourWork',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'ABOUT YOUR WORK',
                        margin: '10 10 10 10',
                        items: [{
                                xtype: 'radiogroup',
                                itemId: 'applicantOccupation',
                                reference: 'applicantOccupation',
                                fieldLabel: '<span class="req" style="color:red">*</span>'+'You Are', 
                                labelAlign: 'left',
                                labelWidth: 130,
                                columnWidth:.85,
                                // margin: '5 10 5 15',
                                margin: '5 20 5 30',
                                // hidden: true,
                                items: [{
                                        boxLabel: 'Service Holder',
                                        itemId: 'serviceHolder',
                                        reference: 'serviceHolder',
                                        columnWidth: .15,
                                        inputValue: '1',
                                    },
                                    {
                                        boxLabel: 'Businessman',
                                        itemId: 'businessman',
                                        reference: 'businessman',
                                        // labelWidth: 100,
                                        columnWidth: .15,                                        
                                        inputValue: '2'

                                    },
                                    {
                                        boxLabel: 'Salaried',
                                        itemId: 'salaried',
                                        reference: 'salaried',                                        
                                        columnWidth: .15,
                                        inputValue: '3'
                                    },
                                    {
                                        boxLabel: 'Company Provided',
                                        itemId: 'companyProvided',
                                        reference: 'companyProvided',
                                        columnWidth: .15,
                                        inputValue: '4'
                                    },
                                    {
                                        boxLabel: 'Others',
                                        itemId: 'othersYouAre',
                                        reference: 'othersYouAre',
                                        columnWidth: .15,
                                        inputValue: '5',
                                        listeners: {
                                            change: 'onOthersYouAre'
                                        }
                                    }
                                ]

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'othersYouAreText',
                                reference: 'othersYouAreText',
                                emptyText: 'Please Specify',
                                columnWidth: .15,
                                labelAlign: 'left',
                                // labelWidth: 80,
                                hidden: true,
                                // margin: '5 255 5 -290',
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantCompanyName',
                                reference: 'applicantCompanyName',
                                columnWidth: .50,
                                fieldLabel: '<span class="req" style="color:red">*</span>'+'Company/Firm Name' ,
                                labelAlign: 'left',
                                labelWidth: 130,
                                //  hidden: true,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantDesignation',
                                reference: 'applicantDesignation',
                                columnWidth: .50,
                                fieldLabel: 'Designation',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantDepartment',
                                reference: 'applicantDepartment',
                                columnWidth: .50,
                                fieldLabel: 'Department',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantNatureOfBusiness',
                                reference: 'applicantNatureOfBusiness',
                                columnWidth: .50,
                                fieldLabel: 'Nature of Business',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantEmployeeID',
                                reference: 'applicantEmployeeID',
                                columnWidth: .50,
                                fieldLabel: 'Employee ID',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',
                                listeners: {
                                    change: 'onchangeApplicantEmployeeID'
                                }
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantOfficeAddress',
                                reference: 'applicantOfficeAddress',
                                columnWidth: .50,
                                fieldLabel: 'Office Address',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',
                                listener: {
                                    change: 'onchangeApplicantOfficeAddress'
                                }
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantOfficeAddressPS',
                                reference: 'applicantOfficeAddressPS',
                                columnWidth: .50,
                                fieldLabel: 'PS. ',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantOfficeAddressPostCode',
                                reference: 'applicantOfficeAddressPostCode',
                                columnWidth: .50,
                                fieldLabel: 'Post Code',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantOfficeAddressDistrict',
                                reference: 'applicantOfficeAddressDistrict',
                                columnWidth: .50,
                                fieldLabel: 'District',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantOfficeAddressCountry',
                                reference: 'applicantOfficeAddressCountry',
                                columnWidth: .50,
                                fieldLabel: 'Country',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',
                                listener: {
                                    change: 'onchangeApplicantOfficeAddressCountry'
                                }

                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'applicantEmployeeStatus',
                                reference: 'applicantEmployeeStatus',
                                fieldLabel: 'Employee Status',
                                labelAlign: 'left',
                                labelWidth: 130,
                                columnWidth: .50,
                                margin: '5 30 5 30',
                                //  hidden: true,
                                items: [{
                                        boxLabel: 'Permanent',
                                        itemId: 'applicantEmployeeStatusPermanent',
                                        reference: 'applicantEmployeeStatusPermanent',
                                        inputValue: '1',
                                        // checked: true
                                    },
                                    {
                                        boxLabel: 'Contractual',
                                        itemId: 'applicantEmployeeStatusContractual',
                                        reference: 'applicantEmployeeStatusContractual',
                                        margin: '0 0 0 -70',
                                        inputValue: '2'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantBusinessEstablished',
                                reference: 'applicantBusinessEstablished',
                                columnWidth: .50,
                                fieldLabel: 'Business Established On(if businessman)',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'displayfield',
                                // xtype: 'textfield',
                                itemId: 'applicantDurInCurrentJobMonths',
                                reference: 'applicantDurInCurrentJobMonths',
                                columnWidth: .20,
                                fieldLabel: 'Duration in Current Job',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantDurInCurrentJobYear',
                                reference: 'applicantDurInCurrentJobYear',
                                columnWidth: .15,
                                fieldLabel: 'Year',
                                labelAlign: 'left',
                                labelWidth: 40,
                                margin: '5 30 5 5',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantDurInCurrentJobMonth',
                                reference: 'applicantDurInCurrentJobMonth',
                                columnWidth: .15,
                                fieldLabel: 'Months',
                                labelAlign: 'left',
                                labelWidth: 50,
                                // margin: '5 30 5 30',
                                margin: '5 30 5 5',

                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'applicantTotalWorkExps',
                                reference: 'applicantTotalWorkExps',
                                columnWidth: .20,
                                fieldLabel: 'Total Work Experience',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantTotalWorkExpYear',
                                reference: 'applicantTotalWorkExpYear',
                                columnWidth: .15,
                                fieldLabel: 'Year',
                                labelAlign: 'left',
                                labelWidth: 40,
                                margin: '5 30 5 5',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantTotalWorkExpMonth',
                                reference: 'applicantTotalWorkExpMonth',
                                columnWidth: .15,
                                fieldLabel: 'Months',
                                labelAlign: 'left',
                                labelWidth: 50,
                                // margin: '5 30 5 30',
                                margin: '5 30 5 5',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantOfficePhoneNo',
                                reference: 'applicantOfficePhoneNo',
                                columnWidth: .50,
                                fieldLabel: 'Office Phone No. (s)',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 10 30',
                                listeners: {
                                    change: 'onchangeApplicantOfficePhoneNo'
                                }

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantMobileNo1',
                                reference: 'applicantMobileNo1',
                                columnWidth: .50,
                                fieldLabel: 'Mobile No',
                                labelAlign: 'left',
                                labelWidth: 130,
                                margin: '5 30 10 30',
                                margin: '5 30 5 30',

                            },

                        ]

                        //about your work done

                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'previousOrganizationDetails',
                        reference: 'previousOrganizationDetails',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'PREVIOUS ORGANIZATION DETAILS',
                        margin: '10 10 10 10',
                        items: [{
                            xtype: 'gridpanel',
                            reference: 'previousOrganizationDetailsGrid',
                            columnWidth: 1,
                            margin: '5 20 10 20',
                            layout: 'column',
                            header: false,
                            border: true,
                            title: false,
                            store: 'gPriviousOrganizationStore',
                            viewConfig: {
                                stripeRows: true,
                                autoHeight: true,
                                enableTextSelection: true,
                                columnLines: true
                            },

                            tbar: [{
                                text: 'New Comment',
                                reference: 'analystsCommntBtn',
                                // handler: 'onAddCommentCard',
                                hidden: true
                            }],

                            columns: [{
                                    header: "#",
                                    sortable: true,
                                    xtype: 'rownumberer',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'acquisitionDetailsConfigId',
                                    hidden: true,
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Date",
                                    xtype: 'datecolumn',
                                    align: 'center',
                                    format: 'Y-m-d h:i:s A',
                                    width: 140,
                                    sortable: true,
                                    dataIndex: 'createdDate',
                                    readOnly: true,
                                    hidden: true,
                                    filter: {
                                        type: 'date'
                                    }
                                },
                                {
                                    header: "User Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'creatorId',
                                    hidden: true,
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Organization Name",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'organizationName',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Designation",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'designation',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Service Length",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'serviceLength',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Inputed By",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'inputedBy',
                                    align: 'center',
                                    hidden: true,
                                    readOnly: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'grid-delete',
                                    reference: 'deleteReference',
                                    hidden: false,
                                    tooltip: 'Delete Previous Organization Details',
                                    handler: 'onDelPreviousOrganization'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'save-icon',
                                    reference: 'saveReference',
                                    hidden: false,
                                    tooltip: 'Save Previous Organization Details',
                                    handler: 'onSavePreviousOrganization'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'new-icon2',
                                    reference: 'addNewCellReference',
                                    tooltip: 'New Previous Organization Details',
                                    handler: 'onNewPreviousOrganization'
                                }
                            ]
                        }]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'applicantMailingInstruction',
                        reference: 'applicantMailingInstruction',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'MAILING INSTRUCTION',
                        margin: '10 10 10 10',

                        items: [{
                                xtype: 'radiogroup',
                                itemId: 'applicantMailingComAddress',
                                reference: 'applicantMailingComAddress',
                                fieldLabel: 'Communication Address (Please select anyone)',
                                labelAlign: 'left',
                                labelWidth: 260,
                                columnWidth: 0.80,
                                margin: '5 30 5 30',
                                items: [{
                                        itemId: 'applicantMailingComAddressOfficeAddress',
                                        reference: 'applicantMailingComAddressOfficeAddress',
                                        boxLabel: 'Office Address',
                                        labelWidth: 100,
                                        columnWidth: .20,
                                        inputValue: '0'
                                            //  margin: '0 10 10 15'
                                    },
                                    {
                                        itemId: 'applicantMailingComAddressResidentalAddress',
                                        reference: 'applicantMailingComAddressResidentalAddress',
                                        boxLabel: 'Residential Address',
                                        labelWidth: 100,
                                        columnWidth: .30,
                                        margin: '0 0 0 -35',
                                        inputValue: '1'
                                    },
                                    {
                                        itemId: 'applicantMailingComAddressPermanentAddress',
                                        reference: 'applicantMailingComAddressPermanentAddress',
                                        boxLabel: 'Permanent Address',
                                        labelWidth: 100,
                                        columnWidth: .25,
                                        margin: '0 0 0 -55',
                                        inputValue: '2'
                                    }
                                ]
                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'applicantCardReceivingWay',
                                reference: 'applicantCardReceivingWay',
                                fieldLabel: 'How do you want to receive the card?',
                                labelAlign: 'left',
                                labelWidth: 245,
                                columnWidth: 0.80,
                                margin: '5 0 10 30',
                                items: [{
                                        itemId: 'applicantCardReceivingWayComAddress',
                                        reference: 'applicantCardReceivingWayComAddress',
                                        boxLabel: 'Communication Address',
                                        labelWidth: 90,
                                        columnWidth: .30,
                                        margin: '0 10 10 15',
                                        inputValue: '0'
                                    },
                                    {
                                        itemId: 'applicantCardReceivingWayCBBLBranch',
                                        reference: 'applicantCardReceivingWayCBBLBranch',
                                        boxLabel: 'CBBL Branch',
                                        labelWidth: 90,
                                        columnWidth: .30,
                                        // margin: '0 0 0 -40',
                                        inputValue: '1',
                                        listeners: {
                                            change: 'onApplicantCardReceivingWay'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'applicantCardReceivingWayName',
                                        reference: 'applicantCardReceivingWayName',
                                        hidden: true,
                                        columnWidth: 0.20,
                                        margin: '0 0 0 -55',                                        
                                    }
                                ]
                            }                            
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'statementMailingAddress',
                        reference: 'statementMailingAddress',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'STATEMENT MAILING ADDRESS',
                        margin: '10 10 10 10',

                        items: [{
                                xtype: 'label',
                                margin: '5 30 5 30',
                                labelAlign: 'left',
                                text: '*E-Statement',
                                style: 'font-weight:bold; text-align: left',
                                columnWidth: 1
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantMonthlyStatementsSentWay',
                                reference: 'applicantMonthlyStatementsSentWay',
                                columnWidth: 1,
                                fieldLabel: 'Your Monthly Statements will be sent in the form of e-statements:'+ '<span class="req" style="color:red">*</span>',
                                labelAlign: 'left',
                                labelWidth: 365,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'applicantPromActivitPurposeId',
                                reference: 'applicantPromActivitPurposeId',
                                columnWidth: 1,
                                fieldLabel: 'Facebook ID or FB Name (for promotional activities purpose)'+ '<span class="req" style="color:red">*</span>',
                                labelAlign: 'left',
                                labelWidth: 365,
                                margin: '5 30 10 30',

                            }

                        ]

                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'financialInformation',
                        reference: 'financialInformation',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'FINANCIAL INFORMATION',
                        margin: '10 10 10 10',

                        items: [
                            {
                                xtype: 'form',
                                itemId: 'salariedFinancialInformation',
                                reference: 'salariedFinancialInformation',
                                collapsible: false,
                                collapsed: false,
                                columnWidth: 1,
                                layout: 'column',
                                title: 'For Salaried',
                                margin: '10 10 10 10',
                                items: [{
                                    xtype: 'fieldset',
                                    id: 'geoxLxoc',
                                    reference: 'gexxoLoc',
                                    columnWidth: 1,
                                    layout: 'column',
                                    margin: '10 10 10 10',
                                    labelAlign: 'left',
                                    items: [{
                                        xtype: 'label',
                                        margin: '10 10 0 15',
                                        labelAlign: 'right',
                                        text: 'Gross Salary (Monthly)',
                                        columnWidth: .33,
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '10 10 0 15',
                                        labelAlign: 'right',
                                        text: 'Total Deduction (Monthly)',
                                        columnWidth: .33,
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '10 10 0 15',
                                        labelAlign: 'right',
                                        text: 'Net Income (Monthly)',
                                        columnWidth: .33,
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'salariedMonthGrossSalary',
                                        reference: 'salariedMonthGrossSalary',
                                        columnWidth: .33,
                                        emptyText: 'TK.',
                                        labelAlign: 'left',
                                        labelWidth: 200,
                                        margin: '5 10 5 15',
                                        readOnly: false,
                                        format: '0.00',
                                        minValue: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'salariedMonthTotalDeduction',
                                        reference: 'salariedMonthTotalDeduction',
                                        columnWidth: .33,
                                        emptyText: 'TK.',
                                        labelAlign: 'left',
                                        labelWidth: 200,
                                        margin: '5 10 5 15',
                                        readOnly: false,
                                        format: '0.00',
                                        minValue: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'salariedMonthNetIncome',
                                        reference: 'salariedMonthNetIncome',
                                        columnWidth: .33,
                                        emptyText: 'TK.',
                                        labelAlign: 'left',
                                        labelWidth: 200,
                                        margin: '5 10 5 15',
                                        readOnly: false,
                                        format: '0.00',
                                        minValue: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    }                                
                                ]
                                }],
                            },
                            {
                                xtype: 'form',
                                itemId: 'nonSalariedFinancialInformation',
                                reference: 'nonSalariedFinancialInformation',
                                collapsible: false,
                                collapsed: false,
                                columnWidth: 1,
                                layout: 'column',
                                title: 'For Non Salaried',
                                margin: '10 10 10 10',
                                items:[{
                                    xtype: 'fieldset',
                                    id: 'geoxLxaoc',
                                    reference: 'gexxoLaoc',
                                    columnWidth: 1,
                                    layout: 'column',
                                    margin: '10 10 10 10',
                                    labelAlign: 'left',
                                    items: [{
                                        xtype: 'label',
                                        margin: '10 10 0 15',
                                        labelAlign: 'right',
                                        text: 'Gross (Monthly)',
                                        columnWidth: .33,
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '10 10 0 15',
                                        labelAlign: 'right',
                                        text: 'Expense (Monthly)',
                                        columnWidth: .33,
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '10 10 0 15',
                                        labelAlign: 'right',
                                        text: 'Net Income (Monthly)',
                                        columnWidth: .33,
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'nonSalariedMonthGrossSalary',
                                        reference: 'nonSalariedMonthGrossSalary',
                                        columnWidth: .33,
                                        emptyText: 'TK.',
                                        labelAlign: 'left',
                                        margin: '5 10 5 15',
                                        readOnly: false,
                                        format: '0.00',
                                        minValue: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'nonSalariedMonthTotalExpense',
                                        reference: 'nonSalariedMonthTotalExpense',
                                        columnWidth: .33,
                                        emptyText: 'TK.',
                                        labelAlign: 'left',
                                        margin: '5 10 5 15',
                                        readOnly: false,
                                        format: '0.00',
                                        minValue: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'numberfield',
                                        itemId: 'nonSalariedMonthNetIncome',
                                        reference: 'nonSalariedMonthNetIncome',
                                        columnWidth: .33,
                                        emptyText: 'TK.',
                                        labelAlign: 'left',
                                        margin: '5 10 5 15',
                                        readOnly: false,
                                        format: '0.00',
                                        minValue: 0,
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    }
                                ]
                                   
                                }],                               
                            },
                            {
                                xtype: 'numberfield',
                                itemId: 'applicantAdditionalIncome',
                                reference: 'applicantAdditionalIncome',
                                columnWidth: 1,
                                fieldLabel: 'Additional Income (If any, Please attach relevant documents) Tk ',
                                labelAlign: 'left',
                                labelWidth: 360,
                                emptyText: 'TK.',
                                margin: '10 20 5 20',
                                format: '0.00',
                                minValue: 0,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                            },
                            {
                                xtype: 'numberfield',
                                itemId: 'applicantSpouseIncome',
                                reference: 'applicantSpouseIncome',
                                columnWidth: 1,
                                fieldLabel: 'Income of Spouse (If any, Please attach relevant documents) Tk ',
                                labelAlign: 'left',
                                labelWidth: 360,
                                emptyText: 'TK.',
                                margin: '5 20 10 20',
                                format: '0.00',
                                minValue: 0,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                            }

                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'aboutYourOtherBankLiability',
                        reference: 'aboutYourOtherBankLiability',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'ABOUT YOUR OTHER BANK LIABILITY POSITION',
                        margin: '10 10 10 10',
                        items: [{
                                xtype: 'radiogroup',
                                itemId: 'otherBankLiabilityPosition',
                                reference: 'otherBankLiabilityPosition',
                                fieldLabel: ' DO YOU HAVE ANY LIABILITIES?',
                                labelAlign: 'left',
                                labelWidth: 200,
                                columnWidth: .36,
                                margin: '5 20 5 20',
                                items: [{
                                        boxLabel: 'YES',
                                        reference: 'otherBankLiabilityPositionYes',
                                        itemId: 'otherBankLiabilityPositionYes',
                                        inputValue: '0'
                                    },
                                    {
                                        boxLabel: 'NO',
                                        reference: 'otherBankLiabilityPositionNo',
                                        itemId: 'otherBankLiabilityPositionNo',
                                        inputValue: '1',
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                reference: 'aboutYourOtherBankLiabilityGrid',
                                columnWidth: 1,
                                margin: '5 20 10 20',
                                layout: 'column',
                                header: false,
                                border: true,
                                title: false,
                                store: 'gOthersBankLiabilityStore',
                                viewConfig: {
                                    stripeRows: true,
                                    autoHeight: true,
                                    enableTextSelection: true,
                                    columnLines: true
                                },

                                tbar: [{
                                    text: 'New Comment',
                                    reference: 'analystsCommntBtn',
                                    // handler: 'onAddCommentCard',
                                    hidden: true
                                }],

                                columns: [{
                                        header: "#",
                                        sortable: true,
                                        xtype: 'rownumberer',
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        header: "Id",
                                        width: 100,
                                        sortable: true,
                                        dataIndex: 'acquisitionDetailsConfigId',
                                        hidden: true,
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        header: "Date",
                                        xtype: 'datecolumn',
                                        align: 'center',
                                        hidden: true,
                                        format: 'Y-m-d h:i:s A',
                                        width: 140,
                                        sortable: true,
                                        dataIndex: 'createdDate',
                                        readOnly: true,
                                        filter: {
                                            type: 'date'
                                        }
                                    },
                                    {
                                        header: "User Id",
                                        width: 100,
                                        sortable: true,
                                        dataIndex: 'creatorId',
                                        hidden: true,
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        header: "Loan Type",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'loanType',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Name of Financial Institution",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'financialInstitutionName',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Loan A/C No./ Card No",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'loanACnoOrCardNo',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Sanction Limit",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'sanctionLimit',
                                        editable: true,
                                        editor: {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                        },
                                    },
                                    {
                                        header: "Validity",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'validity',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Present Outstanding (as on .....) ",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'presentOutstanding',
                                        editable: true,
                                        editor: {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                        },
                                    },
                                    {
                                        header: "EMI (If Applicable)",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'emi',
                                        editable: true,
                                        editor: {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            keyNavEnabled: false,
                                            mouseWheelEnabled: false,
                                        },
                                    },
                                    {
                                        header: "Inputed By",
                                        width: 100,
                                        sortable: true,
                                        dataIndex: 'inputedBy',
                                        align: 'center',
                                        readOnly: true,
                                        hidden: true,
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 30,
                                        sortable: false,
                                        align: 'center',
                                        iconCls: 'grid-delete',
                                        reference: 'deleteReference',
                                        hidden: false,
                                        tooltip: 'Delete Other Bank Liability',
                                        handler: 'onDelOtherBankLiability'
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 30,
                                        sortable: false,
                                        align: 'center',
                                        iconCls: 'save-icon',
                                        reference: 'saveReference',
                                        hidden: false,
                                        tooltip: 'Save Other Bank Liability',
                                        handler: 'onSaveOtherBankLiability'
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 30,
                                        sortable: false,
                                        align: 'center',
                                        iconCls: 'new-icon2',
                                        reference: 'addNewCellReference',
                                        tooltip: 'New Other Bank Liability',
                                        handler: 'onNewOtherBankLiability'
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                xtype: 'panel',
                id: 'step_3',
                reference: 'step_3',
                title: 'Step 3',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_3',
                            reference: 'prev_3',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn2',
                            reference: 'acquisitionUpdateBtn2',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_3',
                            reference: 'next_3',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [{
                        xtype: 'fieldset',
                        itemId: 'aboutYourOtherBankAcountDetails',
                        reference: 'aboutYourOtherBankAcountDetails',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'ABOUT YOUR OTHER BANK ACCOUNT DETAILS',
                        margin: '10 10 10 10',
                        items: [{
                                xtype: 'radiogroup',
                                itemId: 'otherBankAccDetails',
                                reference: 'otherBankAccDetails',
                                fieldLabel: 'DO YOU HAVE ANY OTHER ACCOUNT?',
                                labelAlign: 'left',
                                labelWidth: 230,
                                columnWidth: .40,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'YES',
                                        reference: 'otherBankAccDetailsYes',
                                        itemId: 'otherBankAccDetailsYes',
                                        inputValue: '0',
                                    },
                                    {
                                        boxLabel: 'NO',
                                        reference: 'otherBankAccDetailsNo',
                                        itemId: 'otherBankAccDetailsNo',
                                        inputValue: '1',
                                        // checked: true
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                reference: 'otherBankAccDetailsGrid',
                                columnWidth: 1,
                                margin: '5 30 15 30',
                                layout: 'column',
                                header: false,
                                border: true,
                                title: false,
                                store: 'gAboutOtherBankDetailsStore',
                                viewConfig: {
                                    stripeRows: true,
                                    autoHeight: true,
                                    enableTextSelection: true,
                                    columnLines: true
                                },
                                columns: [{
                                        header: "#",
                                        sortable: true,
                                        xtype: 'rownumberer',
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        header: "Id",
                                        width: 100,
                                        sortable: true,
                                        dataIndex: 'acquisitionDetailsConfigId',
                                        hidden: true,
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        header: "Date",
                                        xtype: 'datecolumn',
                                        align: 'center',
                                        hidden: true,
                                        format: 'Y-m-d h:i:s A',
                                        width: 140,
                                        sortable: true,
                                        dataIndex: 'createdDate',
                                        readOnly: true,
                                        filter: {
                                            type: 'date'
                                        }
                                    },
                                    {
                                        header: "User Id",
                                        width: 100,
                                        sortable: true,
                                        dataIndex: 'creatorId',
                                        hidden: true,
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        header: "Title of Account",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'accountTitle',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Bank Name",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'bankName',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Branch Name",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'branchName',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Account No.",
                                        align: 'center',
                                        flex: 1,
                                        sortable: true,
                                        dataIndex: 'accountNo',
                                        editable: true,
                                        editor: 'textfield',
                                        filter: {
                                            type: 'text'
                                        }
                                    },
                                    {
                                        header: "Inputed By",
                                        width: 100,
                                        sortable: true,
                                        dataIndex: 'inputedBy',
                                        align: 'center',
                                        readOnly: true,
                                        hidden: true,
                                        filter: {
                                            type: 'list'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 30,
                                        sortable: false,
                                        align: 'center',
                                        iconCls: 'grid-delete',
                                        reference: 'deleteReference',
                                        hidden: false,
                                        tooltip: 'Delete OTHER BANK ACCOUNT DETAILS.',
                                        handler: 'onDelOtherBankAcountDetails'
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 30,
                                        sortable: false,
                                        align: 'center',
                                        iconCls: 'save-icon',
                                        reference: 'saveReference',
                                        hidden: false,
                                        tooltip: 'Save OTHER BANK ACCOUNT DETAILS.',
                                        handler: 'onSaveOtherBankAcountDetails'
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 30,
                                        sortable: false,
                                        align: 'center',
                                        iconCls: 'new-icon2',
                                        reference: 'addNewCellReference',
                                        tooltip: 'New OTHER BANK ACCOUNT DETAILS.',
                                        handler: 'onNewOtherBankAcountDetails'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'referencesOneRelative',
                        reference: 'referencesOneRelative',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'REFERENCES(AT LEAST ONE FROM A CLOSE RELATIVE)',
                        margin: '10 10 10 10',

                        items: [{
                                xtype: 'textfield',
                                itemId: 'refName',
                                reference: 'refName',
                                columnWidth: 0.50,
                                fieldLabel: 'Name',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refRelationWithApplicant',
                                reference: 'refRelationWithApplicant',
                                columnWidth: .50,
                                fieldLabel: 'Relationship With Applicant',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'refProfession',
                                reference: 'refProfession',
                                fieldLabel: 'Profession',
                                labelAlign: 'left',
                                labelWidth: 150,
                                columnWidth: 0.50,
                                margin: '5 15 5 30',
                                //  hidden: true,
                                items: [{
                                        boxLabel: 'Service',
                                        itemId: 'refProfessionService',
                                        reference: 'refProfessionService',
                                        inputValue: '1',
                                        // checked: true
                                    },
                                    {
                                        boxLabel: 'Self Employed',
                                        itemId: 'refProfessionSelfEmployed',
                                        reference: 'refProfessionSelfEmployed',
                                        margin: '0 0 0 -15',
                                        inputValue: '2'
                                    },
                                    {
                                        boxLabel: 'Business',
                                        itemId: 'refProfessionBusiness',
                                        reference: 'refProfessionBusiness',
                                        margin: '0 0 0 5',
                                        inputValue: '3'
                                    },
                                    {
                                        boxLabel: 'Other',
                                        itemId: 'refProfessionOther',
                                        reference: 'refProfessionOther',
                                        margin: '0 -15 0 0',
                                        inputValue: '4'
                                    }
                                ]
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refOrgName',
                                reference: 'refOrgName',
                                columnWidth: .50,
                                fieldLabel: 'Name Of Organization',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refDesignation',
                                reference: 'refDesignation',
                                columnWidth: .50,
                                fieldLabel: 'Designation',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refWorkOrResidenceAddress',
                                reference: 'refWorkOrResidenceAddress',
                                columnWidth: .50,
                                fieldLabel: 'Work/Residence Address',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refTelephone',
                                reference: 'refTelephone',
                                columnWidth: .50,
                                fieldLabel: 'Telephone',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refMobile',
                                reference: 'refMobile',
                                columnWidth: .50,
                                fieldLabel: 'Mobile',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'refEmail',
                                reference: 'refEmail',
                                columnWidth: .50,
                                fieldLabel: 'Email',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 10 30',

                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'securityDetailsFieldset',
                        reference: 'securityDetailsFieldset',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'SECURITY DETAILS(APPLICABLE ONLY FOR SECURED CARDS AGAINST TD/RFCD/ERQ ETC.)',
                        margin: '10 10 10 10',
                        items: [{
                            xtype: 'gridpanel',
                            reference: 'securityDetailsGrid',
                            columnWidth: 1,
                            margin: '10 30 15 30',
                            layout: 'column',
                            header: false,
                            border: true,
                            title: false,
                            store: 'gSecurityDetailsStore',
                            viewConfig: {
                                stripeRows: true,
                                autoHeight: true,
                                enableTextSelection: true,
                                columnLines: true
                            },
                            columns: [{
                                    header: "SL",
                                    sortable: true,
                                    xtype: 'rownumberer',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'acquisitionDetailsConfigId',
                                    hidden: true,
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Date",
                                    xtype: 'datecolumn',
                                    align: 'center',
                                    hidden: true,
                                    format: 'Y-m-d h:i:s A',
                                    width: 140,
                                    sortable: true,
                                    dataIndex: 'createdDate',
                                    readOnly: true,
                                    filter: {
                                        type: 'date'
                                    }
                                },
                                {
                                    header: "User Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'creatorId',
                                    hidden: true,
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Security Type",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'securityType',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Beneficiary",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'beneficiary',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Rate",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'rate',
                                    editable: true,
                                    editor: {
                                        xtype: 'numberfield',
                                        hideTrigger: true,
                                        keyNavEnabled: false,
                                        mouseWheelEnabled: false,
                                    },
                                },
                                {
                                    header: "A/C Instrument No. ",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'aCInstrumentNo',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Bank Name",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'bankName',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Date",
                                    xtype: 'datecolumn',
                                    align: 'center',
                                    width: 140,
                                    sortable: true,
                                    editor: 'datefield',
                                    dataIndex: 'issueDate',
                                    format: 'd M Y',
                                    filter: {
                                        type: 'date'
                                    }
                                },
                                {
                                    header: "Face Value",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'faceValue',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Present Value",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'presentValue',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Inputed By",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'inputedBy',
                                    align: 'center',
                                    readOnly: true,
                                    hidden: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'grid-delete',
                                    reference: 'deleteReference',
                                    hidden: false,
                                    tooltip: 'Delete Security Details.',
                                    handler: 'onDelSecurityDetails'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'save-icon',
                                    reference: 'saveReference',
                                    hidden: false,
                                    tooltip: 'Save Security Details.',
                                    handler: 'onSaveSecurityDetails'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'new-icon2',
                                    reference: 'addNewCellReference',
                                    tooltip: 'New securityDetails.',
                                    handler: 'onNewSecurityDetails'
                                }
                            ]
                        }]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'standingInstructionForAutoDebit',
                        reference: 'standingInstructionForAutoDebit',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'STANDING INSTRUCTION FOR AUTO DEBIT',
                        margin: '10 10 10 10',
                        items: [{

                                xtype: 'radiogroup',
                                itemId: 'youAreCbblAccountHolder',
                                reference: 'youAreCbblAccountHolder',
                                columnWidth: 1,
                                fieldLabel: 'Are you a Community Bank Bangladesh Limited Account Holder?',
                                labelAlign: 'left',
                                labelWidth: 350,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Yes',
                                        itemId: 'youAreCbblAccountHolderYes',
                                        reference: 'youAreCbblAccountHolderYes',
                                        inputValue: '0'
                                    },
                                    {
                                        boxLabel: 'No',
                                        itemId: 'youAreCbblAccountHolderNo',
                                        reference: 'youAreCbblAccountHolderNo',
                                        margin: '0 0 0 -260',
                                        inputValue: '1'

                                    },
                                ]
                            },
                            {
                                xtype: 'label',
                                columnWidth: 1,
                                text: 'I would like to have my community bank account automaticly debited each month for the payment of my card dues as Follows:',
                                labelAlign: 'left',
                                labelWidth: 650,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'label',
                                columnWidth: 1,
                                text: 'Account No-',
                                //    style: 'font-weight:bold',
                                labelAlign: 'left',
                                labelWidth: 650,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'form',
                                itemId: 'bdtPortion',
                                reference: 'bdtPortion',
                                collapsible: false,
                                collapsed: false,
                                columnWidth: 0.5,
                                layout: 'column',
                                title: 'BDT Portion',
                                style: {
                                    'text-align': 'center'
                                },
                                margin: '5 30 5 30',
                                items: [{
                                    xtype: 'textfield',
                                    itemId: 'bdtPortionText',
                                    reference: 'bdtPortionText',
                                    columnWidth: 1,
                                    //  emptyText: 'TK.',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '10 10 10 10',
                                    readOnly: false,
                                }, ]
                            },
                            {
                                xtype: 'form',
                                itemId: 'usdPortion',
                                reference: 'usdPortion',
                                collapsible: false,
                                collapsed: false,
                                columnWidth: 0.5,
                                layout: 'column',
                                title: 'USD Portion',
                                style: {
                                    'text-align': 'center'
                                },
                                margin: '5 30 5 30',
                                items: [{
                                    xtype: 'textfield',
                                    itemId: 'applicantUsdAccountPortion',
                                    reference: 'applicantUsdAccountPortion',
                                    columnWidth: 1,
                                    //  emptyText: 'TK.',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '10 10 10 10',
                                    readOnly: false,
                                }, ]
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'titleOfAccount',
                                reference: 'titleOfAccount',
                                columnWidth: 0.5,
                                fieldLabel: 'Title of Account',
                                fieldStyle: 'background: #7ABDFF',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',
                                readOnly: true
                            },
                            {

                                xtype: 'radiogroup',
                                itemId: 'autoPayInstruction',
                                reference: 'autoPayInstruction',
                                columnWidth: 0.5,
                                fieldLabel: 'Auto pay Instruction',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Yes',
                                        itemId: 'autoPayInstructionYes',
                                        reference: 'autoPayInstructionYes',
                                        inputValue: '0'
                                    },
                                    {
                                        boxLabel: 'No',
                                        itemId: 'autoPayInstructionNo',
                                        reference: 'autoPayInstructionNo',
                                        margin: '0 0 0 -70',
                                        inputValue: '1'

                                    },
                                ]
                            },
                            {

                                xtype: 'radiogroup',
                                itemId: 'paymentTypeOfStandingInstruction',
                                reference: 'paymentTypeOfStandingInstruction',
                                columnWidth: 0.5,
                                //    fieldLabel: 'Auto pay Instruction',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Full Payment',
                                        itemId: 'fullPayment',
                                        reference: 'fullPayment',
                                        inputValue: '0'
                                    },
                                    {
                                        boxLabel: 'Minimum Payment',
                                        itemId: 'minimumPayment',
                                        reference: 'minimumPayment',
                                        margin: '0 0 0 -74',
                                        inputValue: '1'
                                    },
                                ]
                            },
                            {

                                xtype: 'radiogroup',
                                itemId: 'paymentTypeOfStandingInstruction1',
                                reference: 'paymentTypeOfStandingInstruction1',
                                columnWidth: 0.5,
                                //    fieldLabel: 'Auto pay Instruction',
                                labelAlign: 'left',
                                labelWidth: 150,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Full Payment',
                                        itemId: 'fullPayment1',
                                        reference: 'fullPayment1',
                                        inputValue: '0'
                                    },
                                    {
                                        boxLabel: 'Minimum Payment',
                                        itemId: 'minimumPayment1',
                                        reference: 'minimumPayment1',
                                        margin: '0 0 0 -74',
                                        inputValue: '1'

                                    },
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                id: 'standingInstructionForAutoDebitFieldSet',
                                reference: 'standingInstructionForAutoDebitFieldSet',
                                columnWidth: 0.5,
                                layout: 'column',
                                margin: '10 30 10 30',
                                hidden: true,
                                items: [{
                                        xtype: 'label',
                                        margin: '5 5 5 5',
                                        style: 'font-weight:bold; text-align: center',
                                        columnWidth: 1,
                                        text: 'Signature of Account Holder'

                                    },

                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 1,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadSignOfAccHolder1',
                                        items: [{

                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            //  fieldLabel: 'Signature of Account Holder',
                                            itemId: 'uploadSignatureOfAccHolder',
                                            reference: 'uploadSignatureOfAccHolder',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 10 5 10',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 5 5 5',
                                        style: 'text-align: center',
                                        columnWidth: 1,
                                        text: 'Signature verified by respective Branch Authorized Officer mentioning PA No.',

                                    },

                                ]
                            },
                            {
                                xtype: 'fieldset',
                                id: 'standingInstructionForAutoDebitFieldSet1',
                                reference: 'standingInstructionForAutoDebitFieldSet1',
                                columnWidth: 0.5,
                                layout: 'column',
                                margin: '10 30 10 30',
                                hidden: true,
                                items: [{
                                        xtype: 'label',
                                        margin: '5 5 5 5',
                                        style: 'font-weight:bold; text-align: center',
                                        columnWidth: 1,
                                        text: 'Signature of Account Holder- Joint'

                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 1,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadSignOfAccHolder2',
                                        items: [{

                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            //  fieldLabel: 'Signature of Account Holder-Joint',
                                            itemId: 'uploadSignatureOfAccHolderJoint',
                                            reference: 'uploadSignatureOfAccHolderJoint',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 10 5 10',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 5 5 5',
                                        style: 'text-align: center',
                                        columnWidth: 1,
                                        text: 'Signature verified by respective Branch Authorized Officer mentioning PA No.',

                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {
                xtype: 'panel',
                id: 'step_4',
                reference: 'step_4',
                title: 'Step 4',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_4',
                            reference: 'prev_4',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn3',
                            reference: 'acquisitionUpdateBtn3',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_4',
                            reference: 'next_4',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [{
                        xtype: 'fieldset',
                        itemId: 'supplementaryApplicationForm',
                        reference: 'supplementaryApplicationForm',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'SUPPLEMENTARY APPLICATION FORM',
                        margin: '10 10 10 10',
                        items: [{
                                xtype: 'displayfield',
                                hidden: true,
                                reference: 'hiddenSupplymentReferKey'
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantName',
                                reference: 'suppApplicantName',
                                columnWidth: 1,
                                fieldLabel: 'Name of Supplementary Card Applicant Mr./Mrs./Ms',
                                //fieldStyle: 'background: #7ABDFF',
                                labelAlign: 'left',
                                labelWidth: 300,
                                emptyText: 'Name to appear on the Card (19 Characters, Please keep one blank space between each part of your name)',
                                margin: '5 30 5 30',
                                maxLength: 19
                                //hidden: false,
                                //readOnly: true,

                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'relationPrincipalApplicant',
                                reference: 'relationPrincipalApplicant',
                                fieldLabel: 'Relationship with the Principal Card applicant',
                                labelAlign: 'left',
                                labelWidth: 250,
                                columnWidth: 0.70,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Spouse',
                                        itemId: 'relationPrincipalApplicantSpouse',
                                        reference: 'relationPrincipalApplicantSpouse',
                                        inputValue: '0'
                                    },
                                    {
                                        boxLabel: 'Parents',
                                        itemId: 'relationPrincipalApplicantParents',
                                        reference: 'relationPrincipalApplicantParents',
                                        margin: '0 0 0 -20',
                                        inputValue: '1'
                                    },
                                    {
                                        boxLabel: 'Brother/Sister',
                                        itemId: 'relationPrincipalApplicantBroSis',
                                        reference: 'relationPrincipalApplicantBroSis',
                                        margin: '0 0 0 -40',
                                        inputValue: '2'
                                    },
                                    {
                                        boxLabel: 'Child',
                                        itemId: 'relationPrincipalApplicantChild',
                                        reference: 'relationPrincipalApplicantChild',
                                        margin: '0 0 0 -25',
                                        inputValue: '3'
                                    },
                                    {
                                        boxLabel: 'Other',
                                        itemId: 'relationPrincipalApplicantOther',
                                        reference: 'relationPrincipalApplicantOther',
                                        margin: '0 0 0 -55',
                                        inputValue: '4',
                                        listeners: {
                                            change: 'onApplicantRelationship'
                                        }
                                    },

                                ]
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'relationPrincipalApplicantOthers',
                                reference: 'relationPrincipalApplicantOthers',
                                emptyText: 'Please specify',
                                columnWidth: .30,
                                hidden: true,
                                labelAlign: 'left',
                                labelWidth: 100,
                                margin: '5 30 5 -69',
                            },

                            {
                                xtype: 'radiogroup',
                                itemId: 'suppApplicantGender',
                                reference: 'suppApplicantGender',
                                fieldLabel: 'Gender',
                                labelAlign: 'left',
                                labelWidth: 110,
                                columnWidth: 0.50,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Male',
                                        itemId: 'suppApplicantGenderMale',
                                        reference: 'suppApplicantGenderMale',
                                        inputValue: '0',
                                    },
                                    {
                                        boxLabel: 'Female',
                                        itemId: 'suppApplicantGenderFemale',
                                        reference: 'suppApplicantGenderFemale',
                                        labelWidth: 100,
                                        margin: '0 0 0 -110',
                                        inputValue: '1',
                                    }

                                ]
                            },

                            {
                                xtype: 'radiogroup',
                                itemId: 'suppApplicantOccupation',
                                reference: 'suppApplicantOccupation',
                                fieldLabel: 'Occupation',
                                labelAlign: 'left',
                                labelWidth: 110,
                                columnWidth: 0.50,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Service',
                                        itemId: 'suppApplicantOccupationService',
                                        reference: 'suppApplicantOccupationService',
                                        inputValue: '0',
                                    },
                                    {
                                        boxLabel: 'Business',
                                        itemId: 'suppApplicantOccupationBusiness',
                                        reference: 'suppApplicantOccupationBusiness',
                                        labelWidth: 100,
                                        margin: '0 0 0 -26',
                                        inputValue: '1',
                                    },
                                    {
                                        boxLabel: 'Self Employed',
                                        itemId: 'suppApplicantOccupationSelfEmployed',
                                        reference: 'suppApplicantOccupationSelfEmployed',
                                        margin: '0 0 0 -43',
                                        inputValue: '2',
                                    },
                                    {
                                        boxLabel: 'Others',
                                        itemId: 'suppApplicantOccupationOthers',
                                        reference: 'suppApplicantOccupationOthers',
                                        margin: '0 0 0 -27',
                                        inputValue: '3',
                                    }
                                ]
                            },
                            {
                                xtype: 'datefield',
                                itemId: 'suppApplicantDateOfBirth',
                                reference: 'suppApplicantDateOfBirth',
                                columnWidth: .50,
                                fieldLabel: 'Date of Birth',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                                format: 'd M Y',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantFatherName',
                                reference: 'suppApplicantFatherName',
                                columnWidth: .50,
                                fieldLabel: 'Father\'s Name',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantMotherName',
                                reference: 'suppApplicantMotherName',
                                columnWidth: .50,
                                fieldLabel: 'Mother\'s Name',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantSpouseName',
                                reference: 'suppApplicantSpouseName',
                                columnWidth: .50,
                                fieldLabel: 'Spouse Name',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantPresentAddress',
                                reference: 'suppApplicantPresentAddress',
                                columnWidth: 1,
                                fieldLabel: 'Present Address',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantPerAddress',
                                reference: 'suppApplicantPerAddress',
                                columnWidth: 1,
                                fieldLabel: 'Permanent Address',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantMobile',
                                reference: 'suppApplicantMobile',
                                columnWidth: .50,
                                fieldLabel: 'Mobile Number :',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                                maxLength: 11,
                            },
                            {
                                xtype: 'textfield',
                                vtype: 'email',
                                itemId: 'suppApplicantEmail',
                                reference: 'suppApplicantEmail',
                                columnWidth: .50,
                                fieldLabel: 'Email',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantNid',
                                reference: 'suppApplicantNid',
                                columnWidth: .50,
                                fieldLabel: 'NID Number',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'suppApplicantPassport',
                                reference: 'suppApplicantPassport',
                                columnWidth: .50,
                                fieldLabel: 'Passport Number',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'datefield',
                                itemId: 'suppApplicantDateOfExp',
                                reference: 'suppApplicantDateOfExp',
                                columnWidth: 0.50,
                                fieldLabel: 'Date of Exp',
                                labelAlign: 'left',
                                labelWidth: 110,
                                margin: '5 30 5 30',
                                format: 'd M Y',
                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'suppYouAreSetupLimitCard',
                                reference: 'suppYouAreSetupLimitCard',
                                fieldLabel: 'Would you like to set up a spending limit to your supplementary card?',
                                labelAlign: 'left',
                                labelWidth: 390,
                                columnWidth: 1,
                                //columnWidth: 0.50,
                                margin: '5 30 5 30',
                                items: [{
                                        boxLabel: 'Yes',
                                        itemId: 'suppYouAreSetupLimitCardYes',
                                        reference: 'suppYouAreSetupLimitCardYes',
                                        margin: '0 0 0 -8',
                                        inputValue: '0',
                                        listeners: {
                                            change: 'onApplicantYesSupp'
                                        }
                                    },
                                    {
                                        boxLabel: 'No',
                                        itemId: 'suppYouAreSetupLimitCardNo',
                                        reference: 'suppYouAreSetupLimitCardNo',
                                        margin: '0 0 0 -260',
                                        inputValue: '1',
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                itemId: 'fieldsetForSupplementary',
                                reference: 'fieldsetForSupplementary',
                                columnWidth: 1,
                                collapsible: false,
                                collapsed: false,
                                hidden: true,
                                layout: 'column',
                                margin: '10 10 10 10',
                                items: [{

                                        xtype: 'textfield',
                                        itemId: 'suppSetUpLimitBDAmount',
                                        reference: 'suppSetUpLimitBDAmount',
                                        columnWidth: 0.40,
                                        fieldLabel: 'If yes, amount per month (BDT)',
                                        labelAlign: 'left',
                                        labelWidth: 180,
                                        margin: '10 10 10 10',
                                        // minValue: 0,
                                        // format: '0.00',
                                        // hideTrigger: true,
                                        // keyNavEnabled: false,
                                        // mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'suppSetUpLimitUSDAmount',
                                        reference: 'suppSetUpLimitUSDAmount',
                                        columnWidth: .20,
                                        labelWidth: 50,
                                        fieldLabel: 'USD',
                                        labelAlign: 'left',
                                        margin: '10 10 10 10',
                                        // format: '0.00',
                                        // minValue: 0,
                                        // hideTrigger: true,
                                        // keyNavEnabled: false,
                                        // mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'textfield',
                                        itemId: 'suppSetUpLimitPercent',
                                        reference: 'suppSetUpLimitPercent',
                                        columnWidth: .15,
                                        labelWidth: 40,
                                        fieldLabel: 'Or',
                                        labelAlign: 'left',
                                        margin: '10 10 10 10',
                                        // format: '0.00',
                                        // minValue: 0,
                                        // hideTrigger: true,
                                        // keyNavEnabled: false,
                                        // mouseWheelEnabled: false,
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '13 10 10 10',
                                        labelAlign: 'left',
                                        text: '% of the total credit limit',
                                        columnWidth: .20,
                                    },
                                ]
                            }

                        ]

                    },
                    {
                        xtype: 'fieldset',
                        id: 'submittedDocumentsFieldSet',
                        reference: 'documenttation',
                        columnWidth: 1,
                        collapsible: true,
                        collapsed: false,
                        title: 'DOCUMENTS SUBMITTED',
                        margin: '10 10 10 10',
                        items: [{
                            xtype: 'gridpanel',
                            itemId: 'submittedDocumentsGrid',
                            reference: 'submittedDocumentsGrid',
                            header: false,
                            border: true,
                            title: false,
                            margin: '5 10 10 15',
                            store: 'gCardDocumentStore',
                            viewConfig: {
                                stripeRows: true,
                                autoHeight: true,
                                enableTextSelection: true,
                                columnLines: true
                            },

                            dockedItems: [{
                                xtype: 'toolbar',
                                dock: 'top',
                                itemId: 'submittedDocumentsToolbar',
                                items: [
                                    '->',
                                    {
                                        xtype: 'button',
                                        text: 'Refresh',
                                        iconCls: 'icon-refresh',
                                        tooltip: 'Refresh Data',
                                        reference: 'docGridRefreshBtn',
                                        itemId: 'docGridRefreshBtn',
                                        align: 'right',
                                        // listeners : {
                                        //     click : 'onRefreshDocGrid'
                                        // }
                                    }
                                ]
                            }],

                            columns: [{
                                    header: "#",
                                    sortable: true,
                                    xtype: 'rownumberer',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Type",
                                    width: 200,
                                    sortable: true,
                                    align: 'center',
                                    dataIndex: 'docType'
                                },
                                {
                                    header: 'Received',
                                    width: 250,
                                    align: 'center',
                                    xtype: 'widgetcolumn',
                                    dataIndex: 'uploadStatus',
                                    onWidgetAttach: function(column, widget, record) {
                                        widget.down().setValue(record.store.indexOf(record));

                                        var status = record.get('uploadStatus');
                                        if (!status) {
                                            widget.items.items[2].setValue(true);
                                            record.data.uploadStatus = 0;
                                        } else {
                                            widget.items.items[1].setValue(true);
                                            record.data.uploadStatus = 1;
                                        }
                                    },
                                    widget: {
                                        xtype: 'radiogroup',
                                        align: 'center',
                                        margin: '0 0 0 -25',
                                        items: [{
                                                xtype: 'textfield',
                                                hidden: true
                                            },
                                            {
                                                boxLabel: 'YES',
                                                inputValue: 1,
                                                ///disabled : true
                                            }, {
                                                boxLabel: 'NO',
                                                inputValue: 0,
                                                /// disabled : true
                                            }
                                        ],
                                        // listeners: {
                                        //     change: 'onChangeDocGridUploadStatus'
                                        // }
                                    }
                                },
                                {
                                    header: "Upload",
                                    width: 150,
                                    align: 'center',
                                    xtype: 'widgetcolumn',
                                    reference: 'uploadReference',
                                    onWidgetAttach: function(column, widget, record) {
                                        widget.down().setValue(record.store.indexOf(record));
                                    },
                                    widget: {
                                        xtype: 'form',
                                        border: false,
                                        items: [{
                                                xtype: 'textfield',
                                                hidden: true
                                            },
                                            {
                                                xtype: 'filefield',
                                                buttonOnly: true,
                                                name: 'file',
                                                margin: '0 0 0 -10',
                                                buttonText: '...',
                                                listeners: {
                                                    change: 'onChangeDocumentFileAcquisition'
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    header: "Is Mandatory",
                                    width: 150,
                                    sortable: true,
                                    align: 'center',
                                    dataIndex: 'isMandatory',
                                    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                                        if (value == 1) return 'YES';
                                        return 'NO';
                                    }
                                },
                                {
                                    header: "File Present",
                                    width: 150,
                                    sortable: true,
                                    align: 'center',
                                    dataIndex: 'filePresent',
                                    renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                                        if (value == 1) return 'YES';
                                        return 'NO';
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    header: "View",
                                    width: 50,
                                    sortable: false,
                                    align: 'center',
                                    reference: 'viewReference',
                                    iconCls: 'view_icon',
                                    tooltip: 'View File',
                                    handler: 'onClickDocGridViewFileCard'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    header: "Download",
                                    flex: 1,
                                    sortable: false,
                                    align: 'center',
                                    reference: 'downloadReference',
                                    iconCls: 'grid-download',
                                    tooltip: 'Download File',
                                    handler: 'onClickDocGridDownloadCard'
                                }
                            ]
                        }]
                    },

                ]
            },
            {
                xtype: 'panel',
                id: 'step_5',
                reference: 'step_5',
                title: 'Step 5',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_5',
                            reference: 'prev_5',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn4',
                            reference: 'acquisitionUpdateBtn4',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_5',
                            reference: 'next_5',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                scrollable: true,
                items: [{
                        xtype: 'fieldset',
                        itemId: 'demandPromissoryNote',
                        reference: 'demandPromissoryNote',
                        collapsible: false,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'DEMAND PROMISSORY NOTE',
                        margin: '10 10 10 10',

                        items: [{
                                xtype: 'numberfield',
                                itemId: 'demandPromissoryTaka',
                                reference: 'demandPromissoryTaka',
                                columnWidth: .50,
                                fieldLabel: 'Taka',
                                labelAlign: 'left',
                                labelWidth: 50,
                                margin: '5 30 5 30',
                                format: '0.00',
                                minValue: 0,
                                hidden: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false,
                            },
                            {
                                xtype: 'datefield',
                                itemId: 'demandPromissoryDate',
                                reference: 'demandPromissoryDate',
                                columnWidth: .50,
                                fieldLabel: 'Date',
                                labelAlign: 'left',
                                labelWidth: 50,
                                margin: '5 30 5 30',
                                format: 'd/m/Y',
                                hidden: false,
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'demandPromissoryPlace',
                                reference: 'demandPromissoryPlace',
                                columnWidth: .50,
                                fieldLabel: 'Place',
                                labelAlign: 'left',
                                labelWidth: 50,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'demandPromissoryMessage',
                                reference: 'demandPromissoryMessage',
                                margin: '5 10 5 30',
                                labelAlign: 'left',
                                fieldLabel: 'I promise to pay on demand to Community Bank Bangladesh Limited',
                                columnWidth: .51,
                                labelWidth: 370,
                            },
                            {
                                xtype: 'numberfield',
                                itemId: 'demandPromissorySecondTaka',
                                reference: 'demandPromissorySecondTaka',
                                margin: '5 10 5 5',
                                labelAlign: 'left',
                                fieldLabel: 'or order the sum of BDT TAKA',
                                columnWidth: .34,
                                labelWidth: 180,
                                format: '0.00',
                                minValue: 0,
                                hidden: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                            },
                            {
                                xtype: 'label',
                                itemId: 'demandPromissoryMessage2',
                                reference: 'demandPromissoryMessage2',
                                margin: '8 30 5 3',
                                labelAlign: 'left',
                                text: 'only.',
                                columnWidth: .10,
                            },
                            {
                                xtype: 'numberfield',
                                itemId: 'demandPromissoryRate',
                                reference: 'demandPromissoryRate',
                                margin: '5 10 5 30',
                                labelAlign: 'left',
                                fieldLabel: 'For value received with interest rate of',
                                columnWidth: .40,
                                labelWidth: 230,
                                format: '0.00',
                                minValue: 0,
                                hidden: false,
                                hideTrigger: true,
                                keyNavEnabled: false,
                                mouseWheelEnabled: false
                            },
                            {
                                xtype: 'label',
                                itemId: 'demandPromissoryMessage4',
                                reference: 'demandPromissoryMessage4',
                                margin: '8 30 5 3',
                                labelAlign: 'left',
                                text: 'percent per annum with monthly rates or at such rate as may be fixed by Community Bank Bangladesh Limited',
                                columnWidth: .60,
                                labelWidth: 400,
                            },
                            {
                                xtype: 'label',
                                itemId: 'demandPromissoryMessage5',
                                reference: 'demandPromissoryMessage5',
                                margin: '5 10 10 30',
                                labelAlign: 'left',
                                text: 'from time to time.',
                                columnWidth: 1,
                                labelWidth: 200,
                            },



                        ]

                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'declarationOnCibUndertaking',
                        reference: 'declarationOnCibUndertaking',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'DECLARATION ON CIB UNDERTAKING',
                        margin: '10 10 10 10',

                        items: [{
                            xtype: 'label',
                            itemId: 'declarationOnCibUndertakingMessage',
                            reference: 'declarationOnCibUndertakingMessage',
                            margin: '10 30 10 30',
                            labelAlign: 'left',
                            style: 'text-align:justify; text-justify: inter-word',
                            text: 'I/We would like to authorise the bank to retrieve my/our CIB online system based on the CIB undertaking provided with this application. This undertaking is valid until we inform the bank to disregard this instruction. You are also authorised to search CIB report online as and when by the bank for the purpose of applied loan or credit card. Please note that for any change in personal information or directorship (where applicable), we will notify the bank in writing to update the CIB database and obtain fresh CIB report.',
                            columnWidth: 1,
                        }]

                    },
                    //PRIMARY CARD APPLICANT DECLARATION
                    {
                        xtype: 'fieldset',
                        itemId: 'PrimaryCardApplicantDeclaration',
                        reference: 'PrimaryCardApplicantDeclaration',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'PRIMARY CARD APPLICANT DECLARATION',
                        margin: '10 10 10 10',
                        items: [{
                            xtype: 'label',
                            margin: '5 30 10 30',
                            style: 'text-align:justify; text-justify: inter-word',
                            // style: 'text-align: left; text-justify: inter-word',
                            columnWidth: 1,
                            labelWidth: 200,
                            text: 'By signing below, I hereby apply for the issuance of Community Bank Bangladesh Ltd Card without any undue influence as I have filled the' +
                                ' application form myself and furnished all supporting documents along with the application.I declare that the information provided in the application is' +
                                ' true,complete and correct and I shall advise Community Bank Bangladesh Ltd. of any changes thereto. I hereby  authorize Community Bank  ' +
                                ' Bangladesh Limited to verify the information from whatever sources it may consider appropriate.  I  accept  that  Community  Bank  Bangladesh Limited' +
                                ' is entitled in its absolute discretion to accept or reject this application without assigning any reason whatsoever and that the application and its' +
                                ' supporting documents shall become part of the bank\'s records and shall not be returned to me. I acknowledge and agree that the use of the primary' +
                                ' card and /or supplementary Card(s) issue on my account shall be deemed as an acceptance of the Terms and Conditions of the Bank\'s card' +
                                ' agreement (which may be amended from time to time).' + ' If the card is issued in my favor, I agree to pay the fees and charges of Community Bank' +
                                ' Bangladesh limited as may be amended from time to time (www.communitybankbd.com). Where requested, I authorize Community Bank' +
                                ' Bangladesh Ltd. to issue supplementary card(s) for use on my account to the person named who I understand is or over 18 years of age and is a' +
                                ' resident of Bangladesh and agree that Community Bank Bangladesh Ltd. may provide information to him/her about the account. I agree to get' +
                                ' enrolled into the SMS , Transaction alert service and credit shield insurance program automatically upon the opening of my Credit Card account and' +
                                ' I understand that this insurance is not applicable to the consequences of a sickness or of an accident incurred prior to my enrollment in the policy. I' +
                                ' also agree to indemnify Community Bank Bangladesh Ltd. against any loss, damage, liability or cost incurred by the bank on account of any act,' +
                                ' negligence, unauthorized use and/or breach by me or the supplementary card holder(s) of the aforesaid conditions or any other terms and conditions' +
                                ' contained in the bank\'s card agreement. I also understand that the supplementary card\'s transactions and Fees & Charges shall be billed in my' +
                                ' statement and it shall be dependent on the continuation of my membership. I assume full responsibility for complying with the provisions of the' +
                                ' Foreign Exchange 1947, and rules, orders and directives issued under. I understand this card can be used for Internet transaction in compliance with' +
                                ' Bangladesh bank regulations as effective and amended from time to time. I hereby declare that I agree to have my security items (i.e. card, PIN, card' +
                                ' cheque and other security items) delivered to my mailing address and also understand that card chq and card will be delivered with deactivated' +
                                ' status for security reason. I am aware that the card and PIN should not be given away to anyone in any situation.' +
                                ' In consideration of the bank agreeing to accept my request for sending my card monthly statement to my e-mail address in lieu of paper statements, I' +
                                ' hereby agree that all statements (whether through e-statement service or other means of transmission) sent by the bank shall be accepted and' +
                                ' upheld by me as correct as authentic. The bank doesn\'t warrant against any external factors affecting the privacy and/or security of e-mails during' +
                                ' Internet transmission. I also agree to keep the bank fully indemnified against all action, proceedings, liabilities and claims, cases, damages, costs' +
                                ' and expenses in relation to or arising out of transmission of statement and information via E-mail.' +
                                ' I irrevocably authorize and permit the Community Bank Bangladesh to disclose and furnish such information that it deems fit concerning my' +
                                ' application, my business, accounts held with Bank or my relationship with the bank to the Bank\'s associates, branches, assignees, agents or other' +
                                ' parties. I also irrevocably authorize and permit the Bank to disclose information about application/ account to any credit rating /reference agency' +
                                ' bank, financial institution, any government regulatory agency or to anyone else when the Bank deems it in its interest to do so. The Bank will' +
                                ' immediately comply with the disclosure of information to any authority under any law. The Bank shall have the right to check my credit standing any' +
                                ' time as and when the Bank may deem fit without reference to me. I authorize Community Bank Bangladesh Limited to increase credit limit/upgrade' +
                                ' credit card type applying Community Bank\'s internal policies and other terms and conditions.'

                        }]
                    },
                    //PRIMARY CARD APPLICANT DECLARATION Ended

                    {
                        xtype: 'fieldset',
                        itemId: 'bankUseOnly1',
                        reference: 'bankUseOnly1',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'Bank Use Only',
                        margin: '10 10 10 10',
                        items: [{
                                xtype: 'textfield',
                                itemId: 'applicantEmployeeID1',
                                reference: 'applicantEmployeeID1',
                                columnWidth: .35,
                                fieldLabel: 'Employee ID',
                                fieldStyle: 'background: #7ABDFF',
                                readOnly: true,
                                labelAlign: 'left',
                                labelWidth: 80,
                                margin: '5 30 5 30',
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'bankBranchname',
                                reference: 'bankBranchname',
                                columnWidth: .35,
                                fieldLabel: 'Branch Name',
                                labelAlign: 'left',
                                labelWidth: 80,
                                margin: '5 30 5 30',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'bankSolID',
                                reference: 'bankSolID',
                                columnWidth: .30,
                                fieldLabel: 'SOL ID',
                                labelAlign: 'left',
                                labelWidth: 80,
                                margin: '5 30 5 30',

                            },                            
                            {
                                xtype: 'label',
                                margin: '5 30 5 30',
                                columnWidth: 1,
                                labelWidth: 100,
                                text: 'Yes I have checked the completely filed up application and attached appropriate document as per requirment.'

                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'bankGeoLocationCheck1',
                                reference: 'bankGeoLocationCheck1',
                                columnWidth: .16,
                                fieldLabel: 'Geo Location',
                                labelAlign: 'left',
                                labelWidth: 100,
                                disabled: true,
                                margin: '5 10 5 30',
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'Office Address',
                                name: 'bankGeoLocationCheck1',
                                columnWidth: .16,
                                reference: 'bankGeoLocationCheck1',
                                labelAlign: 'left',
                                labelWidth: 100,
                                // margin: '5 0 5 -400',
                                margin: '5 10 5 -50',
                                listeners: {
                                    change: 'ongeoOfficeAddress'
                                }
                            },

                            {
                                xtype: 'textfield',
                                itemId: 'bankGeoLocationText1',
                                reference: 'bankGeoLocationText1',
                                columnWidth: .16,
                                labelAlign: 'left',
                                labelWidth: 10,
                                hidden: true,
                                margin: '5 9 5 -90',

                            },
                            {
                                xtype: 'displayfield',
                                itemId: 'geoLocation2',
                                reference: 'geoLocation2',
                                columnWidth: .16,
                                fieldLabel: 'Geo Location',
                                labelAlign: 'left',
                                labelWidth: 100,
                                //  disabled: true,
                                // margin: '5 0 5 -513',
                                margin: '5 10 5 51',

                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: 'Residential Address',
                                name: 'bankGeoLocationCheck2',
                                columnWidth: .16,
                                reference: 'bankGeoLocationCheck2',
                                labelAlign: 'left',
                                labelWidth: 100,
                                //  margin: '5 0 5 -505',
                                margin: '5 10 5 -25',
                                listeners: {
                                    change: 'ongeoResidentalAddress'
                                }
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'bankGeoLocationText2',
                                reference: 'bankGeoLocationText2',
                                columnWidth: .16,
                                labelAlign: 'left',
                                labelWidth: 100,
                                hidden: true,
                                margin: '5 -13 5 -50',
                                //     margin: '5 245 5 -445',

                            },
                            {
                                xtype: 'textfield',
                                itemId: 'sourceComments',
                                reference: 'sourceComments',
                                fieldLabel: 'Comments by Source (if any):',
                                columnWidth: 1,
                                labelAlign: 'left',
                                labelWidth: 170,
                                hidden: false,
                                margin: '5 30 10 30',

                            },
                        ]
                    },
                ]
            },
            {
                xtype: 'panel',
                id: 'step_6',
                reference: 'step_6',
                title: 'Step 6',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_6',
                            reference: 'prev_6',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn5',
                            reference: 'acquisitionUpdateBtn5',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_6',
                            reference: 'next_6',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [{
                    xtype: 'fieldset',
                    itemId: 'letterUndertakingForCib',
                    reference: 'letterUndertakingForCib',
                    collapsible: true,
                    collapsed: false,
                    columnWidth: 1,
                    layout: 'column',
                    title: 'LETTER OF UNDERTAKING FOR CIB',
                    margin: '10 10 10 10',
                    items: [{
                            xtype: 'label',
                            margin: '10 30 0 30',
                            labelAlign: 'right',
                            text: 'To, The Manager',
                            columnWidth: 1,
                        },
                        {
                            xtype: 'label',
                            margin: '10 30 2 30',
                            labelAlign: 'left',
                            text: 'Subject: Provision of information on the ownership of companies and their bank liabilities.',
                            columnWidth: 1,
                        },
                        {
                            xtype: 'label',
                            margin: '10 30 2 30',
                            labelAlign: 'left',
                            text: 'Dear Sir, I',                            
                            columnWidth: .20,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantName1', 
                            reference: 'applicantName1',
                            columnWidth: .80,
                            labelWidth: 110,
                            labelAlign: 'left',
                            margin: '10 30 2 30',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,

                        },
                        {
                            xtype: 'label',
                            columnWidth: .25,
                            text: 'owner/partner/director/guarantor of',
                            labelAlign: 'left',
                            margin: '10 30 2 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantOwnerPartner',
                            reference: 'applicantOwnerPartner',
                            columnWidth: .75,
                            labelAlign: 'left',
                            margin: '10 30 2 30',
                            labelWidth: 200,
                        },
                        {
                            xtype: 'label',
                            margin: '10 30 2 30',
                            labelAlign: 'left',
                            text: 'am applying for sanction/renewal/rescheduling of a loan in my own name/aforementioned company’s name.',
                            columnWidth: 1,
                        },             
                        {
                            xtype: 'textfield',
                            itemId: 'applicantFatherName1',
                            reference: 'applicantFatherName1',
                            columnWidth: 1,
                            fieldLabel: 'Father\'s Name',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',

                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantMotherName1',
                            reference: 'applicantMotherName1',
                            columnWidth: .50,
                            fieldLabel: 'Mother\'s Name',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',

                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantSpouseName1',
                            reference: 'applicantSpouseName1',
                            columnWidth: .50,
                            fieldLabel: 'Spouse Name',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',

                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantPerAddress1',
                            reference: 'applicantPerAddress1',
                            columnWidth: 1,
                            fieldLabel: 'Permanent Address',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',


                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantPerAddressDistrict1',
                            reference: 'applicantPerAddressDistrict1',
                            columnWidth: .50,
                            fieldLabel: 'District',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantPerAddressDistrict1'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantPerStreetName',
                            reference: 'applicantPerStreetName',
                            columnWidth: .50,
                            fieldLabel: 'Street Name',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantPerStreetName'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantPerStreetNo',
                            reference: 'applicantPerStreetNo',
                            columnWidth: .50,
                            fieldLabel: 'Street Number',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantPerStreetNo'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantPerAddressPostCode1',
                            reference: 'applicantPerAddressPostCode1',
                            columnWidth: .50,
                            fieldLabel: 'Postal Code',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantPerAddressPostCode1'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantPerAddressCountry1',
                            reference: 'applicantPerAddressCountry1',
                            columnWidth: .50,
                            fieldLabel: 'Country',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'businessAddress',
                            reference: 'businessAddress',
                            columnWidth: 1,
                            fieldLabel: 'Business Address',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'businessDistrict',
                            reference: 'businessDistrict',
                            columnWidth: .50,
                            fieldLabel: 'District',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'businessStreetName',
                            reference: 'businessStreetName',
                            columnWidth: .50,
                            fieldLabel: 'Street Name',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'businessStreetNumber',
                            reference: 'businessStreetNumber',
                            columnWidth: .50,
                            fieldLabel: 'Street Number',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'businessPostalCode',
                            reference: 'businessPostalCode',
                            columnWidth: .50,
                            fieldLabel: 'Postal Code',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'businessCountry',
                            reference: 'businessCountry',
                            columnWidth: .50,
                            fieldLabel: 'Country',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantNidNumber1',
                            reference: 'applicantNidNumber1',
                            columnWidth: .50,
                            fieldLabel: 'NID Number',
                            labelAlign: 'left',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'applicantDateOfBirth1',
                            reference: 'applicantDateOfBirth1',
                            columnWidth: .50,
                            fieldLabel: 'Date of Birth',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            format: 'd/m/Y',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantEtinNumber1',
                            reference: 'applicantEtinNumber1',
                            columnWidth: .50,
                            fieldLabel: 'ETIN Number',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'applicantGender1',
                            reference: 'applicantGender1',
                            fieldLabel: 'Gender',
                            labelAlign: 'left',
                            labelWidth: 110,
                            columnWidth: .50,
                            margin: '5 30 5 30',
                            items: [{
                                    boxLabel: 'Male',
                                    inputValue: '1',
                                    itemId: 'applicantGenderMale1',
                                    reference: 'applicantGenderMale1',
                                    labelWidth: 200,
                                    columnWidth: .50,

                                },
                                {
                                    boxLabel: 'Female',
                                    inputValue: '2',
                                    itemId: 'applicantGenderFemale1',
                                    reference: 'applicantGenderFemale1',
                                    labelWidth: 200,
                                    columnWidth: .50,
                                    margin: '0 0 0 -110'

                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantDistrictOfBirth',
                            reference: 'applicantDistrictOfBirth',
                            columnWidth: .50,
                            fieldLabel: 'District of Birth',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantDistrictOfBirth'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantCountryOfBirth',
                            reference: 'applicantCountryOfBirth',
                            columnWidth: .50,
                            fieldLabel: 'Country of Birth',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantCountryOfBirth'
                            }
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'applicantIdType',
                            reference: 'applicantIdType',
                            fieldLabel: 'ID Type',
                            labelAlign: 'left',
                            labelWidth: 110,
                            columnWidth: .50,
                            margin: '5 30 5 30',
                            items: [{
                                    boxLabel: 'Passport',
                                    itemId: 'applicantIdTypePassport',
                                    reference: 'applicantIdTypePassport',
                                    inputValue: '1',
                                    labelWidth: 200,
                                    columnWidth: .50,

                                },
                                {
                                    boxLabel: 'Driving License',
                                    itemId: 'applicantIdTypeDrivingLicense',
                                    reference: 'applicantIdTypeDrivingLicense',
                                    inputValue: '2',
                                    labelWidth: 200,
                                    columnWidth: .50,
                                    margin: '0 0 0 -45'

                                },
                                {
                                    boxLabel: 'Birth Registration',
                                    itemId: 'applicantIdTypeBirthReg',
                                    reference: 'applicantIdTypeBirthReg',
                                    inputValue: '3',
                                    labelWidth: 200,                                   
                                    columnWidth: .50,
                                    margin: '0 0 0 -55'
                                }
                            ],
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantOfficePhoneNo1',
                            reference: 'applicantOfficePhoneNo1',
                            anchor: '100%',
                            columnWidth: .50,
                            fieldLabel: 'Telephone No',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantIdNo',
                            reference: 'applicantIdNo',
                            columnWidth: .50,
                            fieldLabel: 'ID Number',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            listeners: {
                                change: 'onchangeApplicantIdNo'
                            }
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'applicantIdIssueDate1',
                            reference: 'applicantIdIssueDate1',
                            columnWidth: .50,
                            fieldLabel: 'ID Issue Date',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                            format: 'd/m/Y',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicantIdIssueCountry1',
                            reference: 'applicantIdIssueCountry1',
                            columnWidth: .50,
                            fieldLabel: 'ID Issue Country',
                            labelAlign: 'left',
                            labelWidth: 110,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'displayfield',
                            margin: '5 30 5 30',
                            columnWidth: 1,
                            labelWidth: 850,
                            reference: 'verifyNidDisplay',
                            fieldLabel: 'are given for your kind consideration. The list of companies under the ownership of mine along with their bank liability status is given in the following table:',
                        },
                        {
                            xtype: 'gridpanel',
                            reference: 'companiesUderOwnershipGrid',
                            columnWidth: 1,
                            margin: '5 30 15 30',
                            layout: 'column',
                            header: false,
                            border: true,
                            title: false,
                            store: 'gCompaniesUderOwnershipStore',
                            viewConfig: {
                                stripeRows: true,
                                autoHeight: true,
                                enableTextSelection: true,
                                columnLines: true
                            },
                            columns: [{
                                    header: "SL",
                                    sortable: true,
                                    xtype: 'rownumberer',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'acquisitionDetailsConfigId',
                                    hidden: true,
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Date",
                                    xtype: 'datecolumn',
                                    align: 'center',
                                    hidden: true,
                                    format: 'Y-m-d h:i:s A',
                                    width: 140,
                                    sortable: true,
                                    dataIndex: 'createdDate',
                                    readOnly: true,
                                    filter: {
                                        type: 'date'
                                    }
                                },
                                {
                                    header: "User Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'creatorId',
                                    hidden: true,
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: " Name of the Company",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'companyName',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Main Address",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'mainAddress',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Additional Address",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'additionalAddress',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Whether the company is availing any loan or not",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'availingAnyLoanThisCompany',
                                    editable: true,
                                    editor: {
                                        completeOnEnter: false,
                                        field: {
                                            xtype: 'combobox',
                                            displayField: 'name',
                                            valueField: 'value',
                                            queryMode: 'local',
                                            forceSelection: true,
                                            editable: false,
                                            columnWidth: .55,
                                            store: ['Yes', 'No']
                                        }
                                    },
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Name of the bank/FI",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'nameOfCompanyBank',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: " Name of the branch",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'branchOfCompanyBank',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Inputed By",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'inputedBy',
                                    align: 'center',
                                    readOnly: true,
                                    hidden: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'grid-delete',
                                    reference: 'deleteReference',
                                    hidden: false,
                                    handler: 'onDelCompaniesUderOwnership'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'save-icon',
                                    reference: 'saveReference',
                                    hidden: false,
                                    handler: 'onSaveCompaniesUderOwnership'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls: 'new-icon2',
                                    reference: 'addNewCellReference',
                                    handler: 'onNewCompaniesUderOwnership'
                                }
                            ]
                        }

                    ]
                }, ]
            },
            {
                xtype: 'panel',
                id: 'step_7',
                reference: 'step_7',
                title: 'Step 7',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_7',
                            reference: 'prev_7',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn6',
                            reference: 'acquisitionUpdateBtn6',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_7',
                            reference: 'next_7',
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [{
                    xtype: 'fieldset',
                    itemId: 'cibOnlineInquiryForm1',
                    reference: 'cibOnlineInquiryForm1',
                    collapsible: true,
                    collapsed: false,
                    columnWidth: 1,
                    layout: 'column',
                    title: 'CIB ONLINE INQUIRY FORM-1',
                    margin: '10 10 10 10',
                    items: [
                    {

                            xtype: 'textfield',
                            itemId: 'cibSubjectCode',
                            reference: 'cibSubjectCode',
                            columnWidth: .45,
                            fieldLabel: 'CIB Subject Code',
                            labelAlign: 'left',
                            labelWidth: 150,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'fiSubjectCode',
                            reference: 'fiSubjectCode',
                            columnWidth: .45,
                            fieldLabel: 'FI Subject Code',
                            labelAlign: 'left',
                            labelWidth: 150,
                            margin: '5 30 5 30',
                        },
                        {
                            xtype : 'displayfield',
                            columnWidth: .10,
                            reference : 'annexN',
                            fieldLabel: 'Annex - N',
                            labelStyle: 'font-weight:bold;',
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'individualInformation',
                            reference: 'individualInformation',
                            collapsible: false,
                            collapsed: false,
                            columnWidth: 1,
                            layout: 'column',
                            title: 'Individual\'s (Borrower/Co-borrower/Guarantor/Owner) information',
                            margin: '10 10 10 10',
                            items: [{

                                    xtype: 'textfield',
                                    itemId: 'bankName',
                                    reference: 'bankName',
                                    columnWidth: .50,
                                    fieldLabel: 'Name of Bank/FI',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'tradeName',
                                    reference: 'tradeName',
                                    columnWidth: .50,
                                    fieldLabel: 'Trade Name',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',

                                },

                                {
                                    xtype: 'textfield',
                                    itemId: 'fiCode',
                                    reference: 'fiCode',
                                    columnWidth: .50,
                                    fieldLabel: 'FI Code',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'branchCode',
                                    reference: 'branchCode',
                                    columnWidth: .50,
                                    fieldLabel: 'Branch Code',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'typeOfFinancing',
                                    reference: 'typeOfFinancing',
                                    columnWidth: .50,
                                    fieldLabel: 'Type Of Financing' + '<span class="req" style="color:red">*</span>',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 0 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'totalRequestedAmountOrCreditLmt',
                                    reference: 'totalRequestedAmountOrCreditLmt',
                                    columnWidth: .50,
                                    fieldLabel: 'Total requested Amount/ Credit Limit' + '<span class="req" style="color:red">*</span>',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '1 30 5 30',

                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'installmentContractDate',
                                    reference: 'installmentContractDate',
                                    columnWidth: .50,
                                    fieldLabel: 'Installment Contract Date',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    format: 'd M Y',
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'installmentAmount',
                                    reference: 'installmentAmount',
                                    columnWidth: .50,
                                    fieldLabel: 'Installment Amount',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '0 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'numOfInstallment',
                                    reference: 'numOfInstallment',
                                    columnWidth: .50,
                                    fieldLabel: 'Number Of Installment',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '2 30 10 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'paymentPeriodicity',
                                    reference: 'paymentPeriodicity',
                                    columnWidth: .50,
                                    fieldLabel: 'Periodicity of Payment',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '2 30 15 30',
                                },
                            ]
                        },

                        //Role in the institution
                        {
                            xtype: 'fieldset',
                            itemId: 'roleInInstitution',
                            reference: 'roleInInstitution',
                            collapsible: false,
                            collapsed: false,
                            columnWidth: 1,
                            layout: 'column',
                            title: 'Role in the Institution',
                            margin: '10 10 10 10',
                            items: [{
                                xtype: 'label',
                                margin: '10 30 10 30',
                                columnWidth: 1,
                                labelWidth: 200,
                                text: 'Chairman/ Managing Director/ Elected Director/ Nominational Director/ Nominated Director(by Govt)/ Nominated Director(by Pvt. Institution)/ Shareholder/ partner/ Owner of Proprietorship/ Others.(If the individual is an owner/ director/ partner of any company then select a role)'
                            }]
                        },



                        //Individual's Subject Data.....
                        {
                            xtype: 'fieldset',
                            itemId: 'individualSubjectData',
                            reference: 'individualSubjectData',
                            collapsible: false,
                            collapsed: false,
                            columnWidth: 1,
                            layout: 'column',
                            title: 'Individual Subject Data',
                            margin: '10 10 10 10',
                            items: [{
                                    xtype: 'textfield',
                                    itemId: 'applicantName2',
                                    reference: 'applicantName2',
                                    columnWidth: .50,
                                    fieldLabel: 'Name' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantFatherName2',
                                    reference: 'applicantFatherName2',
                                    columnWidth: .50,
                                    fieldLabel: 'Father\'s Name' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantMotherName2',
                                    reference: 'applicantMotherName2',
                                    columnWidth: .50,
                                    fieldLabel: 'Mother\'s Name' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantSpouseName2',
                                    reference: 'applicantSpouseName2',
                                    columnWidth: .50,
                                    fieldLabel: 'Spouse Name' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantNidNumber2',
                                    reference: 'applicantNidNumber2',
                                    columnWidth: .50,
                                    fieldLabel: 'NID Number',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',

                                },

                                {
                                    xtype: 'datefield',
                                    itemId: 'applicantDateOfBirth2',
                                    reference: 'applicantDateOfBirth2',
                                    columnWidth: .50,
                                    fieldLabel: 'Date of Birth' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    format: 'd M Y',
                                    margin: '5 30 5 30',
                                },

                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantEtinNumber2',
                                    reference: 'applicantEtinNumber2',
                                    columnWidth: .50,
                                    fieldLabel: 'ETIN Number' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'applicantGender2',
                                    reference: 'applicantGender2',
                                    fieldLabel: 'Gender' + '<span class="req" style="color:red">*</span>',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    columnWidth: 0.50,
                                    margin: '5 30 5 30',
                                    items: [{
                                            boxLabel: 'Male',
                                            itemId: 'aMale',
                                            reference: 'aMale',
                                            inputValue: '1',
                                        },
                                        {
                                            boxLabel: 'Female',
                                            itemId: 'aFemale',
                                            reference: 'aFemale',
                                            inputValue: '1',
                                            margin: '0 0 0 -70',
                                        }

                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantDistrictOfBirth1',
                                    reference: 'applicantDistrictOfBirth1',
                                    columnWidth: .50,
                                    fieldLabel: 'District of Birth'+ '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantCountryOfBirth1',
                                    reference: 'applicantCountryOfBirth1',
                                    columnWidth: .50,
                                    fieldLabel: 'Country of Birth' + '<span class="req" style="color:red">*</span>',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                    listeners: {
                                        change: 'onchangeApplicantCountryOfBirth1'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantOtherId',
                                    reference: 'applicantOtherId',
                                    columnWidth: .50,
                                    fieldLabel: 'Other ID',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantMobileNo2',
                                    reference: 'applicantMobileNo2',
                                    columnWidth: .50,
                                    fieldLabel: 'Mobile No',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'applicantIdType1',
                                    reference: 'applicantIdType1',
                                    columnWidth: .50,
                                    fieldLabel: 'ID Type',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',

                                    items: [{
                                            boxLabel: 'Passport',
                                            itemId: 'aPassport',
                                            reference: 'aPassport',
                                            style: 'text-size-adjust: none;text-size-adjust: auto',
                                            inputValue: '1',
                                        },
                                        {
                                            boxLabel: 'Driving License',
                                            itemId: 'aDrivingLicence',
                                            reference: 'aDrivingLicence',
                                            margin: '0 0 0 -28',
                                            style: 'text-size-adjust: none;text-size-adjust: auto',
                                            inputValue: '2'
                                        },
                                        {
                                            boxLabel: 'Birth Registration',
                                            itemId: 'aBirthRegistration',
                                            reference: 'aBirthRegistration',
                                            style: 'text-size-adjust: none;text-size-adjust: auto',
                                            margin: '0 0 0 -20',
                                            inputValue: '3'
                                        }

                                    ]
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'applicantIdIssueDate2',
                                    reference: 'applicantIdIssueDate2',
                                    columnWidth: .50,
                                    fieldLabel: 'ID Issue Date',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    format: 'd/m/Y',
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantIdNo1',
                                    reference: 'applicantIdNo1',
                                    columnWidth: .50,
                                    fieldLabel: 'ID Number',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },

                                {
                                    xtype: 'radiogroup',
                                    itemId: 'sectorType',
                                    reference: 'sectorType',
                                    columnWidth: .50,
                                    fieldLabel: 'Sector Type' + '<span class="req" style="color:red">*</span>',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                    items: [{
                                            boxLabel: 'Public',
                                            itemId: 'sectorTypePublic',
                                            reference: 'sectorTypePublic',
                                            inputValue: '1',
                                        },
                                        {
                                            boxLabel: 'Private',
                                            itemId: 'sectorTypePrivate',
                                            reference: 'sectorTypePrivate',
                                            margin: '0 0 0 -70',
                                            inputValue: '2'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantIdIssueCountry2',
                                    reference: 'applicantIdIssueCountry2',
                                    columnWidth: .50,
                                    fieldLabel: 'ID Issue Country',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },

                                {
                                    xtype: 'textfield',
                                    itemId: 'sectorCode',
                                    reference: 'sectorCode',
                                    columnWidth: .50,
                                    fieldLabel: 'Sector Code'+ '<span class="req" style="color:red">*</span>',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantMobileNo3',
                                    reference: 'applicantMobileNo3',
                                    columnWidth: .50,
                                    fieldLabel: 'Mobile Number',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'applicantDate',
                                    reference: 'applicantDate',
                                    columnWidth: .50,
                                    fieldLabel: 'Date',
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    format: 'd/m/Y',
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'fieldset',
                                    id: 'cibPermanentAddressFieldSet',
                                    reference: 'cibPermanentAddressFieldSet',
                                    columnWidth: 0.5,
                                    layout: 'column',
                                    margin: '10 15 10 15',
                                    items: [{
                                            xtype: 'textfield',
                                            itemId: 'applicantPerAddress2',
                                            reference: 'applicantPerAddress2',
                                            columnWidth: 1,
                                            fieldLabel: 'Permanent Address'+ '<span class="req" style="color:red">*</span>',
                                            fieldStyle: 'background: #7ABDFF',
                                            readOnly: true,
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '10 5 5 5',
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPerAddressDistrict2',
                                            reference: 'applicantPerAddressDistrict2',
                                            columnWidth: 1,
                                            fieldLabel: 'District' + '<span class="req" style="color:red">*</span>',
                                            fieldStyle: 'background: #7ABDFF',
                                            readOnly: true,
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',
                                            listeners: {
                                                change: 'onchangeApplicantPerAddressDistrict2'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPerStreetName1',
                                            reference: 'applicantPerStreetName1',
                                            columnWidth: 1,
                                            fieldLabel: 'Street Name' + '<span class="req" style="color:red">*</span>',
                                            fieldStyle: 'background: #7ABDFF',
                                            readOnly: true,
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',
                                            listeners: {
                                                change: 'onchangeApplicantPerStreetName1'
                                            },
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPerStreetNo1',
                                            reference: 'applicantPerStreetNo1',
                                            columnWidth: 1,
                                            fieldLabel: 'Street Number',
                                            fieldStyle: 'background: #7ABDFF',
                                            readOnly: true,
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',
                                            listeners: {
                                                change: 'onchangeApplicantPerStreetNo1'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPerAddressPostCode2',
                                            reference: 'applicantPerAddressPostCode2',
                                            columnWidth: 1,
                                            fieldLabel: 'Postal Code',
                                            fieldStyle: 'background: #7ABDFF',
                                            readOnly: true,
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',
                                            listeners: {
                                                change: 'onchangeApplicantPerAddressPostCode2'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPerAddressCountry3',
                                            reference: 'applicantPerAddressCountry3',
                                            columnWidth: 1,
                                            fieldLabel: 'Country' + '<span class="req" style="color:red">*</span>',
                                            fieldStyle: 'background: #7ABDFF',
                                            readOnly: true,
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 10 5',
                                        },
                                    ]

                                },
                                {
                                    xtype: 'fieldset',
                                    id: 'cibPresentAddressFieldSet',
                                    reference: 'cibPresentAddressFieldSet',
                                    columnWidth: 0.5,
                                    layout: 'column',
                                    margin: '10 15 10 15',
                                    items: [{
                                            xtype: 'textfield',
                                            itemId: 'applicantAddress',
                                            reference: 'applicantAddress',
                                            columnWidth: 1,
                                            fieldLabel: 'Present Address',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '10 5 5 5',
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantDistrict',
                                            reference: 'applicantDistrict',
                                            columnWidth: 1,
                                            fieldLabel: 'District',
                                            labelAlign: 'left',                                           
                                            labelWidth: 150,
                                            margin: '5 5 5 5',

                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPresentaddressStreetName',
                                            reference: 'applicantPresentaddressStreetName',
                                            columnWidth: 1,
                                            fieldLabel: 'Street Name',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',

                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPresentaddressStreetNumber',
                                            reference: 'applicantPresentaddressStreetNumber',
                                            columnWidth: 1,
                                            fieldLabel: 'Street Number',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',

                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantPostalCode',
                                            reference: 'applicantPostalCode',
                                            columnWidth: 1,
                                            fieldLabel: 'Postal Code',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 5 5',

                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'applicantCountryOfBirth2',
                                            reference: 'applicantCountryOfBirth2',
                                            columnWidth: 1,
                                            fieldLabel: 'Country',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 5 10 5',
                                            listeners: {
                                                change: 'onchangeApplicantCountryOfBirth2'
                                            }
                                        },
                                    ]

                                },


                            ]
                        }
                    ]
                }, ]
            },
            {
                xtype: 'panel',
                id: 'step_8',
                reference: 'step_8',
                title: 'Step 8',
                scrollable: true,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        // originator action start
                        {
                            xtype: 'button',
                            itemId: 'prev_8',
                            reference: 'prev_8',
                            text: 'Previous',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'acquisitionUpdateBtn7',
                            reference: 'acquisitionUpdateBtn7',
                            text: 'Update',
                            align: 'center',
                            hidden: true,
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionUpdate'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'next_8',
                            reference: 'next_8',
                            disabled: true,
                            text: 'Next',
                            align: 'center',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClickAcquisitionPrevious'
                            }
                        },
                        '->'
                    ]
                }],
                items: [{
                        xtype: 'fieldset',
                        itemId: 'kycProfileForm',
                        reference: 'kycProfileForm',
                        collapsible: true,
                        collapsed: false,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'KYC PROFILE FORM',
                        margin: '10 10 10 10',
                        items: [{
                            xtype: 'fieldset',
                            itemId: 'kycBankUseOnly',
                            reference: 'kycBankUseOnly',
                            collapsible: false,
                            collapsed: false,
                            columnWidth: 1,
                            layout: 'column',
                            title: 'Bank Use Only',
                            margin: '10 10 10 10',
                            items: [{

                                    xtype: 'textfield',
                                    itemId: 'cifNo',
                                    reference: 'cifNo',
                                    columnWidth: .50,
                                    fieldLabel: 'CIF',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'applicantName3',
                                    reference: 'applicantName3',
                                    columnWidth: .50,
                                    fieldLabel: 'Applicant\'s Name',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    margin: '5 30 5 30',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true


                                },

                                {
                                    xtype: 'textfield',
                                    itemId: 'fundSource',
                                    reference: 'fundSource',
                                    columnWidth: .50,
                                    fieldLabel: 'Source of Fund',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'monthlyincome',
                                    reference: 'monthlyincome',
                                    columnWidth: .50,
                                    fieldLabel: 'Monthly Income',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'spouseEmploymentStatus',
                                    reference: 'spouseEmploymentStatus',
                                    fieldLabel: 'Spouse\'s Employment Status',
                                    labelAlign: 'left',
                                    labelWidth: 301,
                                    columnWidth: 1,
                                    margin: '5 30 5 30',
                                    //  hidden: true,
                                    items: [{
                                            boxLabel: 'Salaried',
                                            itemId: 'spouseEmploymentStatusSalaried',
                                            reference: 'spouseEmploymentStatusSalaried',
                                            columnWidth: 0.20,
                                            labelWidth: 100,
                                            inputValue: '1',
                                            // checked: true
                                        },
                                        {
                                            boxLabel: 'Self Employed',
                                            itemId: 'spouseEmploymentStatusSelfEmployed',
                                            reference: 'spouseEmploymentStatusSelfEmployed',
                                            columnWidth: 0.20,
                                            labelWidth: 100,
                                            margin: '0 0 0 -140',
                                            inputValue: '2'
                                        },
                                        {
                                            boxLabel: 'Other',
                                            itemId: 'spouseEmploymentStatusOther',
                                            reference: 'spouseEmploymentStatusOther',
                                            columnWidth: 0.20,
                                            labelWidth: 100,
                                            margin: '0 0 0 -250',
                                            inputValue: '3'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    margin: '5 30 5 30',
                                    columnWidth: 0.50,
                                    labelWidth: 100,
                                    text: '1. Membership Of Club?'

                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'membershipOfClub',
                                    reference: 'membershipOfClub',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    columnWidth: 0.15,
                                    margin: '0 30 5 30',
                                    //  hidden: true,
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'membershipOfClubYes',
                                            reference: 'membershipOfClubYes',
                                            inputValue: '1',
                                            margin: '0 0 0 -200',
                                            // listeners: {
                                            //     change: 'onKycMembershipOfClubYes'
                                            // }
                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'membershipOfClubNo',
                                            reference: 'membershipOfClubNo',
                                            inputValue: '2',
                                            margin: '0 0 0 -168',

                                        }
                                    ]

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'specifyClubName',
                                    reference: 'specifyClubName',
                                    emptyText: 'Please mention the name',
                                    columnWidth: .35,
                                    labelAlign: 'left',
                                    labelWidth: 150,
                                    margin: '0 335 5 -180',
                                    hidden: true,

                                },
                                {
                                    xtype: 'label',
                                    margin: '5 30 5 30',
                                    columnWidth: 0.50,
                                    labelWidth: 100,
                                    text: '2. Has the address of the customer been verfied?'

                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'youAreVerifiedCustomer',
                                    reference: 'youAreVerifiedCustomer',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    columnWidth: 0.50,
                                    margin: '0 30 5 30',
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'youAreVerifiedCustomerYes',
                                            reference: 'youAreVerifiedCustomerYes',
                                            columnWidth: 0.10,
                                            labelWidth: 100,
                                            inputValue: '1',
                                            margin: '0 0 0 -200',

                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'youAreVerifiedCustomerNo',
                                            reference: 'youAreVerifiedCustomerNo',
                                            columnWidth: .10,
                                            labelWidth: 100,
                                            inputValue: '2',
                                            margin: '0 0 0 -346',


                                        }
                                    ]

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'houseRentRange',
                                    reference: 'houseRentRange',
                                    columnWidth: 1,
                                    fieldLabel: '3. House rent range',
                                    labelAlign: 'left',
                                    labelWidth: 308,
                                    margin: '0 335 5 30',
                                },
                                {
                                    xtype: 'label',
                                    margin: '5 30 5 30',
                                    columnWidth: .50,
                                    labelWidth: 40,
                                    text: '4. Does the customer own a car?'
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'haveCustomerOwnCar',
                                    reference: 'haveCustomerOwnCar',
                                    labelAlign: 'left',
                                    labelWidth: 20,
                                    columnWidth: 0.15,
                                    margin: '5 30 5 30',
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'haveCustomerOwnCarYes',
                                            reference: 'haveCustomerOwnCarYes',
                                            inputValue: '1',
                                            margin: '0 0 0 -198',
                                            listeners: {
                                                change: 'onKycOwnCarYes'
                                            }
                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'haveCustomerOwnCarNo',
                                            reference: 'haveCustomerOwnCarNo',
                                            inputValue: '2',
                                            margin: '0 0 0 -167',
                                        },
                                        // {
                                        //     xtype: 'textfield',
                                        //     itemId: 'carBrandName',
                                        //     reference: 'carBrandName',
                                        //     columnWidth: 0.35,
                                        //     emptyText: 'Please specify the Brand',
                                        //     //    fieldLabel: 'Brand',
                                        //     labelAlign: 'left',
                                        //     labelWidth: 50,
                                        //     hidden: true,
                                        //     margin: '5 335 5 -180',

                                        // },
                                    ]

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'carBrandName',
                                    reference: 'carBrandName',
                                    columnWidth: 0.35,
                                    emptyText: 'Please specify the Brand',
                                    //    fieldLabel: 'Brand',
                                    labelAlign: 'left',
                                    labelWidth: 50,
                                    hidden: true,
                                    margin: '5 335 5 -180',

                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'travelYearlyNumber',
                                    reference: 'travelYearlyNumber',
                                    columnWidth: 1,
                                    fieldLabel: '5. Number of foreign travel yearly?',
                                    labelAlign: 'left',
                                    labelWidth: 308,
                                    margin: '5 335 5 30',
                                },

                                {
                                    xtype: 'label',
                                    margin: '5 30 5 30',
                                    columnWidth: 1,
                                    labelWidth: 200,
                                    text: '6. Identification Document'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'passportNumberIndentity',
                                    reference: 'passportNumberIndentity',
                                    columnWidth: .70,
                                    fieldLabel: '(a) Passport Number (If Applicable)',
                                    labelAlign: 'left',
                                    labelWidth: 310,
                                    // disabled: true,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Copy Obtained',
                                    name: 'passportNumberObtained',
                                    columnWidth: .15,
                                    reference: 'passportNumberObtained',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Verified',
                                    name: 'passportNumberVerified',
                                    columnWidth: .15,
                                    reference: 'passportNumberVerified',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },

                                ///
                                {
                                    xtype: 'textfield',
                                    itemId: 'nidIndetity',
                                    reference: 'nidIndetity',
                                    columnWidth: .70,
                                    fieldLabel: '(b) NID (If Applicable)',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 310,
                                    // disabled: true,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Copy Obtained',
                                    name: 'nidIndetityObtained',
                                    columnWidth: .15,
                                    reference: 'nidIndetityObtained',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Verified',
                                    name: 'nidIndetityVerified',
                                    columnWidth: .15,
                                    reference: 'nidIndetityVerified',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'eTinIdIdentity',
                                    reference: 'eTinIdIdentity',
                                    columnWidth: .70,
                                    fieldLabel: '(c) E-TIN ID (If Applicable)',
                                    fieldStyle: 'background: #7ABDFF',
                                    readOnly: true,
                                    labelAlign: 'left',
                                    labelWidth: 310,
                                    // disabled: true,
                                    margin: '5 30 5 30',
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Copy Obtained',
                                    name: 'eTinIdIdentityObtained',
                                    columnWidth: .15,
                                    reference: 'eTinIdIdentityObtained',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },
                                {
                                    xtype: 'checkbox',
                                    boxLabel: 'Verified',
                                    name: 'eTinIdIdentityVerified',
                                    columnWidth: .15,
                                    reference: 'eTinIdIdentityVerified',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },

                                {
                                    xtype: 'label',
                                    margin: '5 30 5 30',
                                    columnWidth: 0.70,
                                    labelWidth: 100,
                                    style: 'text-align:justify; text-justify: inter-word',
                                    text: '7. Is the customer, his/her family member or close associate a Politically Exposed Person(PEP)/Influential Person(IP)/Cheif of High Official of an International Organization(as per the definition in the circular issued by BFIU)?'
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'politicallyExposedPerson',
                                    reference: 'politicallyExposedPerson',
                                    labelAlign: 'left',
                                    labelWidth: 100,
                                    columnWidth: 0.15,
                                    margin: '5 10 5 15',
                                    //  hidden: true,
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'politicallyExposedPersonYes',
                                            reference: 'politicallyExposedPersonYes',
                                            columnWidth: 0.15,
                                            labelWidth: 150,
                                            inputValue: '1',
                                            // listeners: {
                                            //     change: 'onkycpoint7Yes'
                                            // }

                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'politicallyExposedPersonNo',
                                            reference: 'politicallyExposedPersonNo',
                                            columnWidth: .15,
                                            labelWidth: 150,
                                            inputValue: '2'
                                        }
                                    ]

                                },

                                {
                                    xtype: 'radiogroup',
                                    itemId: 'youAreSeniorManagment',
                                    reference: 'youAreSeniorManagment',
                                    fieldLabel: 'If yes, has the approval been taken from the senior management?',
                                    labelAlign: 'left',
                                    labelWidth: 500,
                                    columnWidth: 1,
                                    // hidden: true,
                                    margin: '5 30 5 30',
                                    //  hidden: true,
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'youAreSeniorManagmentYes',
                                            reference: 'youAreSeniorManagmentYes',
                                            columnWidth: 0.20,
                                            labelWidth: 150,
                                            inputValue: '1',
                                            margin: '0 0 0 191',

                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'youAreSeniorManagmentNo',
                                            reference: 'youAreSeniorManagmentNo',
                                            columnWidth: .20,
                                            labelWidth: 150,
                                            inputValue: '2',
                                            margin: '0 0 0 24',
                                        }
                                    ]

                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'youAreFaceToFaceInterview',
                                    reference: 'youAreFaceToFaceInterview',
                                    labelAlign: 'left',
                                    labelWidth: 707,
                                    fieldLabel: '8. Has a face to face interview of the client been taken?',
                                    columnWidth: 1,
                                    margin: '5 30 5 30',
                                    //  hidden: true,
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'youAreFaceToFaceInterviewYes',
                                            reference: 'youAreFaceToFaceInterviewYes',
                                            columnWidth: 0.15,
                                            labelWidth: 100,
                                            inputValue: '1',
                                            margin: '0 0 0 -15',

                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'youAreFaceToFaceInterviewNo',
                                            reference: 'youAreFaceToFaceInterviewNo',
                                            columnWidth: .15,
                                            labelWidth: 100,
                                            inputValue: '2',
                                            margin: '0 0 0 -74',
                                        }
                                    ]

                                },

                                {
                                    xtype: 'radiogroup',
                                    itemId: 'youAreTerroristActivities',
                                    reference: 'youAreTerroristActivities',
                                    fieldLabel: '9. While screening, in light of relevant acts, rules and circulars, has the customer\'s name matched with the suspected individuals or entities as listed under various resolutions of the United Nations Security Council for terrorist activities, financing of terrorism and financing the proliferation of weapons of mass destruction and banned list individuals of entities by the government of the people\'s republic of Bangladesh?',
                                    labelAlign: 'left',
                                    style: 'text-align:justify; text-justify: inter-word',
                                    labelWidth: 690,
                                    columnWidth: 1,
                                    margin: '5 30 5 30',
                                    //  hidden: true,
                                    items: [{
                                            boxLabel: 'Yes',
                                            itemId: 'youAreTerroristActivitiesYes',
                                            reference: 'youAreTerroristActivitiesYes',
                                            columnWidth: 0.15,
                                            labelWidth: 150,
                                            inputValue: '1',
                                            margin: '0 0 0 4',
                                            // listeners: {
                                            //     change: 'onkycpoint9Yes'
                                            // }

                                        },
                                        {
                                            boxLabel: 'No',
                                            itemId: 'youAreTerroristActivitiesNo',
                                            reference: 'youAreTerroristActivitiesNo',
                                            columnWidth: .15,
                                            labelWidth: 150,
                                            inputValue: '2',
                                            margin: '0 0 0 -64',
                                        }
                                    ]

                                },

                                {
                                    xtype: 'textfield',
                                    itemId: 'youAreTerroristActivitieRegard',
                                    reference: 'youAreTerroristActivitieRegard',
                                    fieldLabel: 'If yes step taken in this regard',
                                    columnWidth: 1,
                                    hidden: true,
                                    labelAlign: 'left',
                                    labelWidth: 180,
                                    margin: '5 30 5 30',

                                },
                                {
                                    xtype: 'fieldset',
                                    itemId: 'exceptionDetails1',
                                    reference: 'exceptionDetails1',
                                    collapsible: false,
                                    collapsed: false,
                                    columnWidth: 1,
                                    layout: 'column',
                                    title: 'Exception details(if any)',
                                    margin: '10 10 10 10',
                                    items: [{

                                            xtype: 'textfield',
                                            itemId: 'exceptionDetails',
                                            reference: 'exceptionDetails',
                                            columnWidth: 1,
                                            labelAlign: 'left',
                                            labelWidth: 100,
                                            margin: '5 10 5 15',

                                        },
                                        {

                                            xtype: 'textfield',
                                            itemId: 'applicantAskingLimit',
                                            reference: 'applicantAskingLimit',
                                            columnWidth: 0.50,
                                            fieldLabel: 'Asking Limit',
                                            labelAlign: 'left',
                                            labelWidth: 130,
                                            margin: '5 10 20 15',

                                        },
                                        {

                                            xtype: 'textfield',
                                            itemId: 'applicantRecommendedLimit',
                                            reference: 'applicantRecommendedLimit',
                                            columnWidth: 0.50,
                                            fieldLabel: 'Recommended Limit',
                                            labelAlign: 'left',
                                            labelWidth: 130,
                                            margin: '5 10 20 15',

                                        }
                                    ]
                                }

                            ]
                        }, ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'recommendationFormBranch',
                        reference: 'recommendationFormBranch',
                        collapsible: true,
                        collapsed: false,
                        hidden: true,
                        columnWidth: 1,
                        layout: 'column',
                        title: 'RECOMMENDATIONS FROM BRANCH',
                        margin: '10 10 10 10',
                        items: [{
                                xtype: 'fieldset',
                                id: 'recommendatioFormFieldSet',
                                reference: 'recommendatioFormFieldSet',
                                columnWidth: 0.5,
                                layout: 'column',
                                margin: '10 10 10 10',
                                items: [{
                                        xtype: 'label',
                                        margin: '5 10 5 15',
                                        style: 'font-weight:bold; text-align: center',
                                        columnWidth: 1,
                                        //labelWidth: 200,
                                        text: 'Recommended By'

                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 10 10 15',
                                        style: 'text-align: left',
                                        columnWidth: 1,
                                        style: 'text-align:justify; text-justify: inter-word',
                                        text: 'I do hereby certify that I have verified the information given above and do here by acknowledge and affirm that all the information given above are true and accurate. I do understand that I shall be held accountable and be responsible if there is any KYC related discrepancy ever found or later with regard to this particular borrower'
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 10 5 15',
                                        style: 'text-align: center',
                                        columnWidth: 1,
                                        //labelWidth: 200,
                                        text: 'Source who interviewed the applicant on this form'
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 1,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadSignOfSource',
                                        items: [{

                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            itemId: 'SourceSignText',
                                            reference: 'SourceSignText',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 10 5 10',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 10 10 15',
                                        style: 'text-align: center',
                                        columnWidth: 1,
                                        //labelWidth: 200,
                                        text: 'Name, Date & Signature'
                                    },


                                ]

                            },
                            {
                                xtype: 'fieldset',
                                id: 'recommendatioFormFieldSet1',
                                reference: 'recommendatioFormFieldSet1',
                                columnWidth: 0.5,
                                layout: 'column',
                                margin: '10 10 10 10',
                                items: [{
                                        xtype: 'label',
                                        margin: '5 10 25 15',
                                        style: 'font-weight:bold; text-align: center',
                                        columnWidth: 1,
                                        //labelWidth: 200,
                                        text: 'Recommended By'

                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 10 5 15',
                                        style: 'text-align: left',
                                        columnWidth: 1,
                                        style: 'text-align:justify; text-justify: inter-word',
                                        text: 'I am confirming that client(s) has been met my team member (details in the left column) and all the documentation for this application has been collected from the client(s).'
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 10 5 15',
                                        style: 'text-align: center',
                                        columnWidth: 1,
                                        //labelWidth: 200,
                                        text: 'Manager/Unit Head/Branch'
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        columnWidth: 1,
                                        labelWidth: 140,
                                        layout: 'column',
                                        reference: 'uploadSignOfSource1',
                                        items: [{

                                            xtype: 'filefield',
                                            columnWidth: 1,
                                            itemId: 'SourceSignTex1',
                                            reference: 'SourceSignText1',
                                            name: 'file',
                                            labelAlign: 'left',
                                            labelWidth: 150,
                                            margin: '5 10 5 10',
                                            buttonText: '...',
                                            listeners: {
                                                change: function(f, v) {
                                                    var node = Ext.DomQuery.selectNode('input[id=' + f.getInputId() + ']');
                                                    node.value = v.replace("C:\\fakepath\\", "");
                                                }
                                            }
                                        }, ]
                                    },
                                    {
                                        xtype: 'label',
                                        margin: '5 10 10 15',
                                        style: 'text-align: center',
                                        columnWidth: 1,
                                        //labelWidth: 200,
                                        text: 'Name, Date & Signature'
                                    },


                                ]

                            },


                        ]

                    }
                ]
            }

        ]
    }],
    listeners: {
        afterrender: 'onActivateAcquisitionDetailsWin'
    }
});