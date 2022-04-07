var approvalPanelHeaderFooterBgColor = "#F0ECEC";
var approvalPanelHeight = 120;
var approvalPanelBorder = true;

var cardForm = Ext.define('Desktop.view.card.CardDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.cardDetails',
    itemId: 'CardDetails',
    reference: 'CardDetails',
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

    border: false,

    viewModel: {
        type: 'cardPanel'
    },
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
        listeners: {
            tabchange: 'onCardTabChange'
        },
        items: [{
            xtype: 'panel',
            id: 'cardApplicationDetailsPanel',
            reference: 'cardApplicationDetailsPanel',
            title: 'Application Details',
            scrollable: true,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                shadow: true,
                itemId: 'cardSearchTollbar',
                layout: 'column',
                columnWidth: 1,
                items : [{
                    xtype : 'panel',
                    itemId: 'cardAccountSearchPad',
                    reference: 'cardAccountSearchPad',
                    collapsible: true,
                    collapsed: false,
                    columnWidth: 1,
                    layout: 'column',
                    border : false,
                    title: 'Search',
                    dockedItems : [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        itemId: 'cardSearchTollbar',
                        items : [
                            '->',
                            {
                                xtype: 'button',
                                text: 'Clear',
                                listeners: {
                                    click: 'onClickCardSearchClearBtn'
                                }
                            },
                            '->'
                        ]
                    }],
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'customerId',
                            reference: 'customerId',
                            fieldLabel: 'Customer ID',
                            columnWidth: .25,
                            hidden : true,
                            labelAlign: 'right',
                            labelWidth: 100,
                            margin : '5 5 5 5',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'accountNo',
                            reference: 'accountNo',
                            fieldLabel: 'Account No',
                            columnWidth: .24,
                            focusCls: 'focusClass',
                            labelAlign: 'left',
                            labelWidth: 68,
                            margin : '5 5 5 5',
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
                            columnWidth: .24,
                            labelAlign: 'left',
                            labelWidth: 40,
                            margin : '5 5 5 5',
                            listeners   : {
                                specialkey: 'onKeyPressBpNoSrc'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'nid4Search',
                            reference: 'nid4Search',
                            focusCls: 'focusClass',
                            fieldLabel: 'NID',
                            columnWidth: .24,
                            labelAlign: 'right',
                            labelWidth: 100,
                            margin : '5 5 5 5',
                            listeners   : {
                                specialkey: 'onKeyPressNid4Src'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'phone4Search',
                            reference: 'phone4Search',
                            fieldLabel: 'Phone',
                            focusCls: 'focusClass',
                            columnWidth: .24,
                            labelAlign: 'right',
                            labelWidth: 100,
                            margin : '5 5 5 5',
                            listeners   : {
                                specialkey: 'onKeyPressphone4Src'
                            }
                        }
                    ]
                }]
            },
            {
                xtype : 'toolbar',
                dock : 'bottom',
                items : [
                   '->',
                   // originator action start
                    {
                        xtype: 'button',
                        itemId: 'foSaveApplicationBtn',
                        reference: 'foSaveApplicationBtn',
                        text: 'SAVE',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickCardFoSaveApplication'
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'foUpdateApplicationBtn',
                        reference: 'foUpdateApplicationBtn',
                        text: 'UPDATE',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickFoUpdateApplication'
                        }
                    },                    
                    {
                        xtype: 'button',
                        itemId: 'foDeleteApplicationBtn',
                        reference: 'foDeleteApplicationBtn',
                        text: 'DELETE',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickFODeleteApplication'
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'foRecommendedApplicationBtn',
                        reference: 'foRecommendedApplicationBtn',
                        text: 'SUBMIT',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickFoRecommendedApplication'
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'foCloseApplicationBtn',
                        reference: 'foCloseApplicationBtn',
                        text: 'CLOSE',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        iconCls: 'remove',
                        listeners: {
                            click: 'onClickFoCloseApplication'
                        }
                    },
                    // originator action end  

                            // Card Officer of Card Division action start
                            {
                                xtype: 'button',
                                itemId: 'coOfCOUpdateAppBtn',
                                reference: 'coOfCOUpdateAppBtn',
                                text: 'UPDATE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickcoOfCOUpdateApplication'
                                }
                            },
                            {
                                xtype: 'button',
                                reference: 'coOfCORecommend',
                                itemId: 'coOfCORecommend',
                                text: 'RECOMMEND',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickcoOfCORecommend'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'coOfCORejectAppBtn',
                                reference: 'coOfCORejectAppBtn',
                                text: 'REJECT',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onCliclCORejectApp'
                                }
                            },
                            // Card Officer of Card Division action End

                            // Head of Card of Card Division action start
                            {
                                xtype: 'button',
                                itemId: 'hoCoCDRecommendbtn',
                                reference: 'hoCoCDRecommendbtn',
                                text: 'RECOMMEND',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickHoCoCDRecommendbtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'hoCoCDReturnBtn',
                                reference: 'hoCoCDReturnBtn',
                                text: 'RETURN',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickHoCoCDReturnBtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnHeadOfCardApprove',
                                reference: 'btnHeadOfCardApprove',
                                text: 'APPROVE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnHeadOfCardApprove'
                                }
                            },
                            // Head of Card of Card Division action End

                            // Credit Analyst of CRM action start
                            {
                                xtype: 'button',
                                itemId: 'creAnalystPendRecBtn',
                                reference: 'creAnalystPendRecBtn',
                                text: 'RECEIVED',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickCAReceived'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'creAnalystUpdtBtn',
                                reference: 'creAnalystUpdtBtn',
                                text: 'UPDATE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickCreAnalystUpdt'
                                }
                            },
                            {
                                xtype: 'button',
                                reference: 'caRecommendBtn',
                                itemId: 'caRecommendBtn',
                                text: 'RECOMMEND',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickCaRecBtnRcm'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCaReturn',
                                reference: 'btnCaReturn',
                                text: 'RETURN',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnCaReturn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCaQuery',
                                reference: 'btnCaQuery',
                                text: 'QUERY',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnCaQuery'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCaResend',
                                reference: 'btnCaResend',
                                text: 'RESEND',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnCaResend'
                                }
                            },
                            // Credit Analyst of CRM action End

                            // RM of CRM action start
                            {
                                xtype: 'button',
                                itemId: 'rmOfCRMdeclineBtn',
                                reference: 'rmOfCRMdeclineBtn',
                                text: 'DECLINE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickRmOfCRMdeclineBtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnRMApprove',
                                reference: 'btnRMApprove',
                                text: 'APPROVE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnRMApprove'
                                }
                            },
                            {
                                xtype: 'button',
                                reference: 'rmOfCRMRecommendBtnUh',
                                itemId: 'rmOfCRMRecommendBtnUh',
                                text: 'RECOMMEND-UH',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickRmRecommendBtnUh'
                                }
                            },
                            {
                                // text: 'RM Recommend To',  
                                text: 'Recommend To',
                                reference: 'rmCardRecommendGroupMenuBtn',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                disabled: true,
                                hidden: true,
                                menu: {
                                    xtype: 'menu',
                                    reference: 'rmCardRecommendGroupMenu',
                                    items: []
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnRmOfCRMReturn',
                                reference: 'btnRmOfCRMReturn',
                                text: 'RETURN',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnRmOfCRMReturn'
                                }
                            },
                            // RM of CRM action End

                            // UH of CRM action start
                            {
                                xtype: 'button',
                                itemId: 'uhOfCRMdeclineBtn',
                                reference: 'uhOfCRMdeclineBtn',
                                text: 'DECLINE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickUhOfCRMdeclineBtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'uhOfCRMRecommendBtn',
                                reference: 'uhOfCRMRecommendBtn',
                                text: 'RECOMMEND',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickUhOfCRMRecommendBtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnUhOfCRMReturn',
                                reference: 'btnUhOfCRMReturn',
                                text: 'RETURN',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnUhOfCRMReturn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnUhOfCRMApprove',
                                reference: 'btnUhOfCRMApprove',
                                text: 'APPROVE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnUhOfCRMApprove'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnUhQuery',
                                reference: 'btnUhQuery',
                                text: 'QUERY',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnUhQuery'
                                }
                            },
                            // UH of CRM action End

                            // HOCRM of CRM action start
                            {
                                xtype: 'button',
                                itemId: 'hoCRMofCRMdeclineBtn',
                                reference: 'hoCRMofCRMdeclineBtn',
                                text: 'DECLINE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickhoCRMofCRMdeclineBtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'hoCRMofCRMRecommendBtn',
                                reference: 'hoCRMofCRMRecommendBtn',
                                text: 'RECOMMEND',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickHoCRMofCRMRecommendBtn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnHoCRMofCRMReturn',
                                reference: 'btnHoCRMofCRMReturn',
                                text: 'RETURN',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnHoCRMoReturn'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnHoCRMofCRMApprove',
                                reference: 'btnHoCRMofCRMApprove',
                                text: 'APPROVE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnHoCRMofCRMApprove'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnHoCRMofCRMSendToCo',
                                reference: 'btnHoCRMofCRMSendToCo',
                                text: 'SEND to CO',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnHoCRMofCRMSendToCo'
                                }
                            },
                            // HOCRM of CRM action end

                            // CD action start
                            {
                                xtype: 'button',
                                itemId: 'btnCDByAgree',
                                reference: 'btnCDByAgree',
                                text: 'AGREE',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnCDByMDAgree'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnCDByReject',
                                reference: 'btnCDByReject',
                                text: 'REJECT',
                                style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                                hidden: true,
                                listeners: {
                                    click: 'onClickBtnCDByMDReject'
                                }
                            },

                            // CD  action End

                    // Card Operation action start
                    {
                        xtype: 'button',
                        itemId: 'btnCOperationReadyCard',
                        reference: 'btnCOperationReadyCard',
                        text: 'CARD READY',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickCOperationReadyCard'
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnCOperationQueryToCo',
                        reference: 'btnCOperationQueryToCo',
                        text: 'QUERY to Card Officer',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickBtnCOperationQueryToCo'
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnbtnCOperationQueryToCa',
                        reference: 'btnbtnCOperationQueryToCa',
                        text: 'QUERY to CA',
                        style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                        hidden: true,
                        listeners: {
                            click: 'onClickBtnCOperationQueryToCa'
                        }
                    },
                    // Card Operation action End
                   '->'
                   ]
            }],
            items: [
            {
                xtype : 'form',
                itemId: 'newFOCardAccount',
                reference: 'newFOCardAccount',
                collapsible: false,
                collapsed: false,
                layout: 'column',
                border : false,
                autoHeight: true,             
                scrollable: true,
                autoScroll: true,
                items: [
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
                            reference : 'cardStateName'
                        },
                        {
                            xtype : 'displayfield',
                            reference : 'cardStateId'
                        },
                        {
                            xtype : 'displayfield',
                            reference : 'creditCardId'
                        },
                        {
                            xtype : 'displayfield',
                            reference : 'creditCardVer'
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
                            xtype : 'displayfield',
                            reference : 'hiddenCardRawData'
                        },
                        { 
                            xtype: 'displayfield',
                            reference: 'hiddenCardPrefix'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'cardSourcingForm',
                    reference: 'cardSourcingForm',
                    columnWidth: 1,
                    layout: 'column',
                    title: 'SOURCING FORM',
                    margin: '10 10 10 10',
                    items: [
                       {
                        xtype: 'displayfield',
                        itemId: 'sourceFrom',
                        reference: 'sourceFrom',
                        columnWidth: .20,
                        fieldLabel: 'SOURCE FROM',
                        labelAlign: 'left',
                        labelWidth: 100,
                        disabled: true,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Branch',
                        name: 'sourceBrance',
                        columnWidth:.20,
                        reference: 'sourceBrance',
                        labelAlign: 'left',
                        disabled: true,
                        labelWidth: 50,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'CSE',
                        name: 'sourceCSE',
                        columnWidth:.20,
                        reference: 'sourceCSE',
                        labelAlign: 'left',
                        disabled: true,
                        labelWidth: 20,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Self-Application',
                        name: 'sourceSelfApplication',
                        columnWidth:.20,
                        reference: 'sourceSelfApplication',
                        labelAlign: 'left',
                        disabled: true,
                        labelWidth: 50,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Others',
                        name: 'sourceOthers',
                        columnWidth:.20,
                        reference: 'sourceOthers',
                        labelAlign: 'left',
                        disabled: true,
                        labelWidth: 50,
                        margin: '5 10 5 15',
                    }
                    ]
                },           
                {
                    xtype: 'fieldset',
                    itemId: 'applicantPersonalInfoField',
                    reference: 'applicantPersonalInfoField',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    layout: 'column',
                    title: 'APPLICANT\'S PERSONAL INFORMATION',
                    margin: '10 10 10 10',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'keepHiddenCustomerId',
                            reference: 'keepHiddenCustomerId',
                            hidden: true
                        },
                        {
                            // We will use this field to update 
                            xtype: 'textfield',
                            itemId: 'keepHiddenCustomerIdKey',
                            reference: 'keepHiddenCustomerIdKey',
                            hidden: true
                        },                      
                        {
                            xtype: 'textfield',
                            itemId: 'ccTrackingNumber',
                            reference: 'ccTrackingNumber',
                            columnWidth: .50,
                            fieldLabel: 'CC Tracking Number',
                            fieldStyle: 'background: #7ABDFF',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                            hidden: false,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'applicationNumber',
                            reference: 'applicationNumber',
                            columnWidth: .50,
                            fieldLabel: 'Application Number',
                            fieldStyle: 'background: #7ABDFF',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                            hidden: true,
                            readOnly: true
                        },                       
                        {
                            xtype: 'textfield',
                            itemId: 'bpNo',
                            reference: 'bpNo',
                            columnWidth: .50,
                            fieldLabel: 'BP No/CIV ID'+ '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                        },                    
                        {
                            xtype: 'textfield',
                            itemId: 'nameOfBorrower',
                            reference: 'nameOfBorrower',
                            columnWidth: .50,
                            fieldLabel: 'Name of Borrower',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'customerType',
                            reference: 'customerType',
                            columnWidth: .50,
                            fieldLabel: 'Customer\'s Ownership Type',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                            mode: 'local',
                            displayField: 'value1',
                            valueField: 'configurationId',
                            queryMode: 'local',
                            forceSelection: true,
                            store: 'gCustTypeStore', 
                            listeners : {
                                change : 'onCardCustomerTypeChange'
                            }                         
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'nameOfCard',
                            reference: 'nameOfCard',
                            columnWidth: .50,
                            fieldLabel: 'Name on Card',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'cardMonthlyBillDebited',
                            reference: 'cardMonthlyBillDebited',
                            columnWidth: .50,
                            fieldLabel: 'Card Monthly Bill Debited',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'nameAsPerbpcivid',
                            reference: 'nameAsPerbpcivid',
                            columnWidth: .50,
                            fieldLabel: 'Name as per BP/CIV ID',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: false,
                            margin: '5 10 0 15'
                        },                        
                        {
                            xtype: 'textfield',
                            itemId: 'designation',
                            reference: 'designation',
                            columnWidth: .50,
                            fieldLabel: 'Designation'+ '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                        },
                        // {
                        //     xtype: 'textfield',
                        //     itemId: 'cardMonthlyBillDebited',
                        //     reference: 'cardMonthlyBillDebited',
                        //     columnWidth: .50,
                        //     fieldLabel: 'Card monthly Bill debited',
                        //     labelAlign: 'left',
                        //     labelWidth: 200,
                        //     margin: '5 10 5 15',
                        // },
                        {
                            xtype: 'textfield',
                            itemId: 'nameAsPerNid',
                            reference: 'nameAsPerNid',
                            columnWidth: .50,
                            fieldLabel: 'Name As Per NID',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 0 15'
                        }, 
                        {
                            xtype: 'textfield',
                            itemId: 'currentPlaceofPosting',
                            reference: 'currentPlaceofPosting',
                            columnWidth: .50,
                            fieldLabel: 'Current Place of Posting',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 0 15',
                        },                      
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : .50,
                            layout : 'column',
                            reference : 'uploadTinContainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'TIN'+ '<span class="req" style="color:red">*</span>',
                                    itemId: 'tin',
                                    reference: 'tin',
                                    columnWidth: .80,
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 0 15',
                                },
                                {
                                    xtype: 'filefield',
                                    columnWidth: .20,                   
                                    itemId: 'uploadTINFO',
                                    reference: 'uploadTINFO',
                                    name: 'file',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 0 0',
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
                                    margin: '5 10 0 0',
                                    itemId: 'viewTinFile',
                                    reference: 'viewTinFile', 
                                    iconCls : 'view_icon',
                                    tooltip: 'View File',
                                    hidden: true,
                                    handler: 'onClickCardTinViewFile'
                                }
                            ]
                        }, 
                        {                         
                            xtype: 'displayfield',
                            margin: '5 10 0 15',
                            columnWidth : .20,
                            reference: 'verifyNidDisplay',
                            fieldLabel: 'Verify NID',
                            hidden: true
                        },
                        {
                            xtype: 'checkbox',
                            boxLabel: 'Matched',
                            name: 'isMatchedNid',
                            columnWidth:.15,
                            reference: 'isMatchedNid',
                            labelWidth: 40,
                            margin: '5 10 0 15',
                            hidden: true,
                        },
                        {
                            xtype: 'button',
                            itemId: 'searchNidDetails',
                            reference: 'searchNidDetails',
                            text: 'Verify',
                            margin: '5 10 0 15',
                            columnWidth: .15,
                            hidden: true,
                            listeners: {
                                click: 'onClickCardVerifyNid'
                            }
                        }, 
                        {
                            xtype: 'datefield',
                            itemId: 'lastDateOfPosting',
                            reference: 'lastDateOfPosting',
                            columnWidth: .50,
                            fieldLabel: 'Last Posting Date',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            format: 'd M Y',
                            // listeners: {
                            //     change: 'onchangeDOB'
                            // }
                        },                       
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : .50,
                            layout : 'column',
                            reference : 'uploadNIdCardContainer1',
                            items : [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'NID',
                                    itemId: 'nid',
                                    reference: 'nid',
                                    columnWidth: .80,
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 15',
                                },
                                {
                                    xtype: 'filefield',                           
                                    columnWidth: .20,
                                    itemId: 'uploadNIdCard',
                                    reference: 'uploadNIdCard',
                                    name: 'file',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 0',
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
                                    handler: 'onClicCardNidViewFile'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'customerPostingDistrict',
                            reference: 'customerPostingDistrict',
                            columnWidth: .50,
                            fieldLabel: 'Customer\'s Posting District',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },                                              
                        {
                            xtype: 'combobox',
                            itemId: 'CbblAccountNo',
                            reference: 'CbblAccountNo',
                            columnWidth: .50,
                            fieldLabel: 'CBBL Account No' + '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            mode: 'local',
                            displayField: 'accountNo',
                            valueField: 'accountNo',
                            queryMode: 'local',
                            forceSelection: true,
                            hidden: true,
                            bind: {
                                store: '{cbblAccountNoStore}'
                            },
                            triggerAction: 'all',
                            selectOnFocus:true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'customerPostingDivision',
                            reference: 'customerPostingDivision',
                            columnWidth: .50,
                            fieldLabel: 'Customer\'s Posting Division',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'cif',
                            reference: 'cif',
                            columnWidth: .50,
                            fieldLabel: 'CIF' + '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        }, 
                        {
                            xtype: 'textfield',
                            itemId: 'mobile',
                            reference: 'mobile',
                            columnWidth: .50,
                            fieldLabel: 'Personal Mobile',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        },
                        {
                            xtype: 'radiogroup',
                            itemId: 'salaryDisbursedWithCBBL',
                            reference: 'salaryDisbursedWithCBBL',
                            fieldLabel: 'Salary Disbursed With CBBL' + '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 200,
                            columnWidth: .50,
                            margin: '5 10 5 15',
                            hidden: true,
                            items: [
                                { 
                                    boxLabel: 'YES',
                                    itemId : 'salaryDisbursedWithCBBLYes', 
                                    reference : 'salaryDisbursedWithCBBLYes', 
                                    inputValue: '1',
                                    checked: true
                                },
                                { 
                                    boxLabel: 'NO',
                                    itemId : 'salaryDisbursedWithCBBLNo', 
                                    reference : 'salaryDisbursedWithCBBLNo', 
                                    inputValue: '0'
                                }            
                            ]
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'emerPhone',
                            reference: 'emerPhone',
                            columnWidth: .50,
                            fieldLabel: 'Home Mobile/Emergency Phone',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dateOfBirth',
                            reference: 'dateOfBirth',
                            columnWidth: .35,
                            fieldLabel: 'Date of Birth & Age',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            format: 'd M Y',
                            listeners: {
                                change: 'onchangeDOB'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'age',
                            reference: 'age',
                            columnWidth: .15,
                            margin: '5 10 5 15',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'passportNo',
                            reference: 'passportNo',
                            columnWidth: .50,
                            fieldLabel: 'Valid Passport No(for dual Card)',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'districtOfPosting',
                            reference: 'districtOfPosting',
                            columnWidth: .50,
                            fieldLabel: 'District Of Posting',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },                                              
                        {
                            xtype: 'datefield',
                            itemId: 'dateOfJoining',
                            reference: 'dateOfJoining',
                            columnWidth: .35,
                            fieldLabel: 'Date of Joining & Service Length',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            format: 'd M Y',
                            listeners: {
                                change: 'onchangeDOJoining'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'serviceLength',
                            reference: 'serviceLength',
                            columnWidth: .15,
                            margin: '5 10 5 15',
                            fieldStyle: 'background: #7ABDFF',
                            readOnly: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'sourcingBranch',
                            reference: 'sourcingBranch',
                            columnWidth: .40,
                            fieldLabel: 'Sourcing Branch & Staff ID',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            readOnly: true,
                            hidden: true,
                            fieldStyle: 'background: #7ABDFF',
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'staffId',
                            reference: 'staffId',
                            columnWidth: .10,
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            readOnly: true,
                            hidden: true,
                            fieldStyle: 'background: #7ABDFF',
                        },                        
                        {
                            xtype: 'datefield',
                            itemId: 'dateOfRetirement',
                            reference: 'dateOfRetirement',
                            columnWidth: .35,
                            fieldLabel: 'Date of Retirement & Remaining Yr',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            format: 'd M Y',
                            hidden: true,
                            listeners: {
                                change:'onchangeDORetirement'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'remainingYearOfRetirement',
                            reference: 'remainingYearOfRetirement',
                            columnWidth: .15,
                            margin: '5 10 5 15',
                            fieldStyle: 'background: #7ABDFF',
                            hidden: true,
                            readOnly: true
                        },                                                                                                                                                                  
                        {
                            xtype: 'radiogroup',
                            itemId: 'maritalStatus',
                            reference: 'maritalStatus',
                            fieldLabel: 'Marital Status' + '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 200,
                            columnWidth: .50,
                            margin: '5 10 5 15',
                            hidden: true,
                            items: [
                                { 
                                    boxLabel: 'MARRIED',
                                    reference : 'maritalStatusMarried', 
                                    itemId : 'maritalStatusMarried', 
                                    inputValue: 'MARRIED' 
                                },
                                { 
                                    boxLabel: 'UNMARRIED',
                                    reference : 'maritalStatusUnmarried', 
                                    itemId : 'maritalStatusUnmarried', 
                                    inputValue: 'UNMARRIED',
                                    checked: true 
                                }            
                            ]
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'email',
                            reference: 'email',
                            columnWidth: .50,
                            fieldLabel: 'Email',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },                                              
                        {
                            xtype: 'textfield',
                            itemId: 'motherName',
                            reference: 'motherName',
                            columnWidth: .50,
                            fieldLabel: 'Mother\'s Name',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },                    
                        {
                            xtype: 'textfield',
                            itemId: 'fatherName',
                            reference: 'fatherName',
                            columnWidth: .50,
                            fieldLabel: 'Father\'s Name',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'houseOwnership',
                            reference: 'houseOwnership',
                            columnWidth: .50,
                            fieldLabel: 'House Ownership',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'spouse',
                            reference: 'spouse',
                            columnWidth: .50,
                            fieldLabel: 'Spouse',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'permanentAddress',
                            reference: 'permanentAddress',
                            columnWidth: .50,
                            fieldLabel: 'Permanent Address',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'officeAddress',
                            reference: 'officeAddress',
                            columnWidth: .50,
                            fieldLabel: 'Office Address',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            hidden: true,
                        },                                                                                                  
                        {
                            xtype: 'textfield',
                            itemId: 'district',
                            reference: 'district',
                            columnWidth: .50,
                            fieldLabel: 'District',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'division',
                            reference: 'division',
                            columnWidth: .50,
                            fieldLabel: 'Division',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },                                                                                                                      
                        {
                            xtype: 'textfield',
                            itemId: 'highestLevelOfEducation',
                            reference: 'highestLevelOfEducation',
                            columnWidth: .50,
                            fieldLabel: 'Highest Level Of Education',
                            labelAlign: 'left',
                            labelWidth: 200,
                            hidden: true,
                            margin: '5 10 5 15'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'passpordExpiryDate',
                            reference: 'passpordExpiryDate',
                            columnWidth: .50,
                            fieldLabel: 'Passport Expiry Date',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15',
                            format: 'd M Y',
                            hidden: true,                           
                        },                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'referenceDetails',
                    reference: 'referenceDetails',
                    collapsible: false,
                    collapsed: false,
                    columnWidth: 1,
                    layout: 'column',
                    title: 'Reference',
                    margin: '10 10 10 10',
                    items: [ 
                    {
                        xtype: 'textfield',
                        itemId: 'referenceName',
                        reference: 'referenceName',
                        columnWidth: .50,
                        fieldLabel: 'Name',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                    
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'relationShipWithApplicant',
                        reference: 'relationShipWithApplicant',
                        columnWidth: .50,
                        fieldLabel: 'Relationship with Applicant',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15' 
                    }, 
                    {
                        xtype: 'radiogroup',
                        itemId: 'referProfesion',
                        reference: 'referProfesion',
                        fieldLabel: 'Profession',
                        labelAlign: 'left',
                        labelWidth: 200,
                        columnWidth: .70,
                        margin: '5 10 5 15',
                        items: [
                            { 
                                boxLabel: 'Service',
                                reference : 'referService', 
                                itemId : 'referService', 
                                inputValue: 'Service',
                                checked: true  
                            },
                            { 
                                boxLabel: 'Self Employed',
                                reference : 'referSelfEmployed', 
                                itemId : 'referSelfEmployed', 
                                inputValue: 'Self Employed',
                            },
                            { 
                                boxLabel: 'Business',
                                reference : 'referBusiness', 
                                itemId : 'referBusiness', 
                                inputValue: 'Business',
                            },
                            { 
                                boxLabel: 'Other',
                                reference : 'referOther', 
                                itemId : 'referOther', 
                                inputValue: 'Other',
                            }            
                        ]
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'referenceNameOfOrganization',
                        reference: 'referenceNameOfOrganization',
                        columnWidth: .50,
                        fieldLabel: 'Name Of Organization',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                 
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'referenceDesignation',
                        reference: 'referenceDesignation',
                        columnWidth: .50,
                        fieldLabel: 'Designation',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                 
                    },  
                    {
                        xtype: 'textfield',
                        itemId: 'referenceWorkAndResidenceAddress',
                        reference: 'referenceWorkAndResidenceAddress',
                        columnWidth: .50,
                        fieldLabel: 'Work/Residence Address',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                 
                    },                                                   
                    {
                        xtype: 'textfield',
                        itemId: 'referenceTelephone',
                        reference: 'referenceTelephone',
                        columnWidth: .50,
                        fieldLabel: 'Telephone',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                 
                    },                                                 
                    {
                        xtype: 'textfield',
                        itemId: 'referenceMobile',
                        reference: 'referenceMobile',
                        columnWidth: .50,
                        fieldLabel: 'Mobile',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                 
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'referenceEmail',
                        reference: 'referenceEmail',
                        columnWidth: .50,
                        fieldLabel: 'Email',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'                 
                    },  
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'salaryFinancialInformationDetails',
                    reference: 'salaryFinancialInformationDetails',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    layout: 'column',
                    title: 'SALARY & FINANCIAL INFORMATION DETAILS',
                    margin: '10 10 10 10',
                    items: [ 
                    {
                        xtype: 'numberfield',
                        reference: 'keepHiddenCreditCardId',
                        hidden: true
                    },                   
                    {
                        xtype: 'numberfield',
                        itemId: 'netMonthlyIncome',
                        reference: 'netMonthlyIncome',
                        columnWidth: .50,
                        fieldLabel: 'Net Monthly Income(NMI)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hidden: false,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'salaryDepositedLastMonth',
                        reference: 'salaryDepositedLastMonth',
                        columnWidth: .50,
                        fieldLabel: 'Salary deposited in last month',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false, 
                        listeners : {
                            change : 'onAdditionalIncomeCal'
                        }  

                    }, 
                    {
                        xtype: 'numberfield',
                        itemId: 'totalEmiPaidInCbbl',
                        reference: 'totalEmiPaidInCbbl',
                        columnWidth: .50,
                        fieldLabel: 'Total EMIs paid in CBBL',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,     
                        listeners : {
                            change : 'onTotalEmiPaidInCbbl'
                        }                 
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'afterCbblEmi',
                        reference: 'afterCbblEmi',
                        columnWidth: .50,
                        fieldLabel: 'After CBBL EMIs,remaining',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },                  
                    {
                        xtype: 'numberfield',
                        itemId: 'additionalIncomeAmount',
                        reference: 'additionalIncomeAmount',
                        columnWidth: .50,
                        fieldLabel: 'Additional Income Amount',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'onAdditionalIncomeCal'
                        }                    
                    },                                     
                    {
                        xtype: 'textfield',
                        itemId: 'additionalIncomeSource',
                        reference: 'additionalIncomeSource',
                        columnWidth: .50,
                        fieldLabel: 'Additional Income source',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',                 
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'totalIncome',
                        reference: 'totalIncome',
                        columnWidth: .50,
                        fieldLabel: 'Total Income',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        mouseWheelEnabled: false,     
                        listeners : {
                            change : 'ontotalIncome'
                        }               
                    },                                                               
                    {
                        xtype: 'textfield',
                        itemId: 'duplications',
                        reference: 'duplications',
                        columnWidth: .40,
                        fieldLabel: 'Duplication',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        // hidden: true,                    
                    },
                    {
                        xtype: 'button',
                        itemId: 'checkCardDuplications',
                        reference: 'checkCardDuplications',
                        text: 'Details',
                        margin: '5 10 5 0', 
                        columnWidth: .10,
                        // disabled: true,
                        // hidden : true,
                        listeners: {
                            click: 'onClickCheckCardDuplications'
                        }
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'duplicationAreas',
                        reference: 'duplicationAreas',
                        columnWidth: .50,
                        fieldLabel: 'Duplication Areas',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hidden: true,                    
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'cibGeneration',
                        reference: 'cibGeneration',
                        columnWidth: .50,
                        fieldLabel: 'Date Of CIB generation',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: 'd M Y',
                        hidden: true,
                    },                    
                    {
                        xtype: 'numberfield',
                        itemId: 'valueOfSecurity',
                        reference: 'valueOfSecurity',
                        columnWidth: .50,
                        fieldLabel: 'Value Of Security(for secured card)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        hidden: true,
                        mouseWheelEnabled: false,  
                        listeners : {
                            change : 'onValueOfSecurity'
                        }                   
                    },
                    {
                        xtype : 'fieldcontainer',
                        columnWidth : .5,
                        layout : 'column',
                        items : [
                            {
                                xtype: 'textfield',
                                itemId: 'cibStatus',
                                reference: 'cibStatus',
                                columnWidth: .53,
                                fieldLabel: 'CIB Status',
                                labelAlign: 'left',
                                labelWidth: 200,
                                hidden: false,
                                margin: '5 10 5 15'
                            },
                            {
                                xtype: 'combobox',
                                itemId: 'cibStatusType',
                                reference: 'cibStatusType',
                                columnWidth: .12,
                                labelAlign: 'left',
                                labelWidth: 200,
                                margin: '5 2 5 2',
                                mode: 'local',
                                displayField: 'cibStatusName',
                                valueField: 'cibStatusName',
                                queryMode: 'local',
                                forceSelection: true,
                                store: 'gCibCardStatusStore',
                                listeners : {
                                    change : 'onCardCibStatusChange'
                                }
                            },
                            {
                                xtype: 'form',
                                border: false,
                                columnWidth: .10,
                                items: [
                                    {
                                        xtype: 'filefield',
                                        buttonOnly: true,
                                        columnWidth: .10,
                                        itemId: 'uploadCibStatusFileBtn',
                                        reference: 'uploadCibStatusFileBtn',
                                        name: 'file',
                                        margin: '5 10 5 -50',
                                        buttonText: '...',
                                        listeners: {
                                            change: 'onChangeCardCibStatusFile'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                columnWidth: .10,
                                margin: '5 10 5 0',
                                itemId: 'viewCibStatus',
                                reference: 'viewCibStatus', 
                                iconCls : 'view_icon',
                                tooltip: 'View File',
                                disabled: true,
                                handler: 'onClickCardMultipleFileAttachment'
                            },
                            {
                                xtype: 'button',
                                itemId: 'cibDetails',
                                reference: 'cibDetails',
                                text: 'Inquiry',
                                margin: '5 10 5 0', 
                                columnWidth: .15,
                                listeners: {
                                    click: 'onCardClickcibDetails'
                                }
                        },
                        ]

                    },                                           
                    {
                        xtype: 'textfield',
                        itemId: 'loanToValue',
                        reference: 'loanToValue',
                        columnWidth: .50,
                        fieldLabel: 'Loan To Value(LTV)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        hidden: false,
                        hidden: true,
                        margin: '5 10 5 15'
                    },   
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'creditCardLimitInformation',
                    reference: 'creditCardLimitInformation',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    layout: 'column',
                    title: 'CREDIT CARD LIMIT INFORMATION',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'numberfield',
                        itemId: 'appliedAmount',
                        reference: 'appliedAmount',
                        columnWidth: .50,
                        fieldLabel: 'Applied Amount'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,    
                        listeners : {
                            change : 'onAppliedAmount'
                        }                 
                    },               
                    {
                        xtype: 'numberfield',
                        itemId: 'preApprovedLimitRange1',
                        reference: 'preApprovedLimitRange1',
                        columnWidth: .50,
                        fieldLabel: 'Pre-Approved Limit Range',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                   
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'cardType',
                        reference: 'cardType',
                        columnWidth: .50,
                        fieldLabel: 'Card Type' ,
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'value1',
                        valueField: 'configurationId',
                        queryMode: 'local',
                        forceSelection: true,
                        store:'gCardTypeStore',
                        readOnly: true,
                        hideTrigger: true
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'appliedCardMinBill',
                        reference: 'appliedCardMinBill',
                        columnWidth: .50,
                        fieldLabel: 'Applied Card Min Bill will',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                         

                    },                   
                    {
                        xtype: 'textfield',
                        itemId: 'interestRate',
                        reference: 'interestRate',
                        columnWidth: .50,
                        fieldLabel: 'Interest Rate (%)' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        hidden: true,
                        // listeners : {
                        //     change : 'onInterestRateChange'
                        // }
                    },                
                    
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'creditCardDeclaration',
                    reference: 'creditCardDeclaration',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    layout: 'column',
                    title: 'DECLARATION',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'textareafield',
                        itemId: 'individualDeclaration',
                        reference: 'individualDeclaration',
                        columnWidth: 1,
                        fieldLabel: 'Individual Declaration'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        // height : 20,
                        margin: '5 10 5 15',
                        value: 'I do hereby declare that, my liabilities (if any) with other Bank(s) are regular and I am not a default borrower of any Financial institute of Bangladesh.'
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'cardDeliveryFrom',
                        reference: 'cardDeliveryFrom',
                        columnWidth: 1,
                        fieldLabel: 'Card Delivery from',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        // height : 30, 
                        value: "I do hereby declare that, I have collected applicant\'s request for Credit card and forwarding to next level with required following documents & information."                    },                   
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'creditDivisionLimitRecommendation',
                    reference: 'creditDivisionLimitRecommendation',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    layout: 'column',
                    title: 'CREDIT DIVISION LIMIT RECOMMENDATION',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'numberfield',
                        itemId: 'applicantAskingLimit',
                        reference: 'applicantAskingLimit',
                        columnWidth: .50,
                        fieldLabel: 'Applicant Asking Limit',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },               
                    {
                        xtype: 'numberfield',
                        itemId: 'preApprovedLimitRange2',
                        reference: 'preApprovedLimitRange2',
                        columnWidth: .50,
                        fieldLabel: 'Pre-Approved Limit Range',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'cardProposedLimit',
                        reference: 'cardProposedLimit',
                        columnWidth: .50,
                        fieldLabel: 'Card Proposed Limit',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false, 
                        listeners : {
                            change : 'onCardProposedLimit'
                        }                
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'minimumPayment1',
                        reference: 'minimumPayment1',
                        columnWidth: .50,
                        fieldLabel: 'Minimum Payment(5%)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                   
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'btRequest',
                        reference: 'btRequest',
                        columnWidth: .30,
                        fieldLabel: 'BT Request & Concern Bank Name',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'concerBankName',
                        reference: 'concerBankName',
                        columnWidth: .20,
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'btCreditCardOutstanding',
                        reference: 'btCreditCardOutstanding',
                        columnWidth: .50,
                        fieldLabel: 'BT Credit Card Outstanding',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                   
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'cardType1',
                        reference: 'cardType1',
                        columnWidth: .50,
                        fieldLabel: 'Card Type',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'value1',
                        valueField: 'configurationId',
                        queryMode: 'local',
                        forceSelection: true,
                        store:'gCardTypeStore',
                        readOnly: true,
                        hidden: true,
                        hideTrigger: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'kycLevel',
                        reference: 'kycLevel',
                        columnWidth: .50,
                        fieldLabel: 'Kyc Level',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },                  
                    {
                        xtype: 'textfield',
                        itemId: 'proposedBillingDate',
                        reference: 'proposedBillingDate',
                        columnWidth: .50,
                        fieldLabel: 'Proposed Billing Date',
                        labelAlign: 'left',
                        labelWidth: 200,
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',                   
                    }, 
                    {
                        xtype: 'textfield',
                        itemId: 'autoDebitAmount',
                        reference: 'autoDebitAmount',
                        columnWidth: .50,
                        fieldLabel: 'Auto Debit Amount',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                   
                    },               
                    
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'cardLimiteDetails',
                    reference: 'cardLimiteDetails',
                    columnWidth: 1,
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    layout: 'column',
                    title: 'CARD LIMIT & DETAILS',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'numberfield',
                        itemId: 'appliedAmount1',
                        reference: 'appliedAmount1',
                        columnWidth: .50,
                        fieldLabel: 'Applied Amount',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'preApprovedLimitRange3',
                        reference: 'preApprovedLimitRange3',
                        columnWidth: .50,
                        fieldLabel: 'Pre-Approved Limit Range',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'recommendForApproval',
                        reference: 'recommendForApproval',
                        columnWidth: .50,
                        fieldLabel: 'Recommended For Approval',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },

                    {
                        xtype: 'numberfield',
                        itemId: 'minimumPayment2',
                        reference: 'minimumPayment2',
                        columnWidth: .50,
                        fieldLabel: 'Minimum Payment(5%)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'proposedBillingDate1',
                        reference: 'proposedBillingDate1',
                        columnWidth: .50,
                        fieldLabel: 'Proposed Billing Date',
                        labelAlign: 'left',
                        labelWidth: 200,
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',                   
                    }, 
                    {
                        xtype: 'textfield',
                        itemId: 'autoDebitAmount1',
                        reference: 'autoDebitAmount1',
                        columnWidth: .50,
                        fieldLabel: 'Auto Debit (Mandatory) Amount',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                   
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'btRequest1',
                        reference: 'btRequest1',
                        columnWidth: .30,
                        fieldLabel: 'BT Request & Concern Bank Name',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'concerBankName1',
                        reference: 'concerBankName1',
                        columnWidth: .20,
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'balanceTransferRequestAmount',
                        reference: 'balanceTransferRequestAmount',
                        columnWidth: .50,
                        fieldLabel: 'Balance Transfer Request Amount',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,                    
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'cardType2',
                        reference: 'cardType2',
                        columnWidth: .50,
                        fieldLabel: 'Card\'s Type' ,
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'value1',
                        valueField: 'configurationId',
                        queryMode: 'local',
                        forceSelection: true,
                        store:'gCardTypeStore',
                        readOnly: true,
                        hideTrigger: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'kycLevel1',
                        reference: 'kycLevel1',
                        columnWidth: .50,
                        fieldLabel: 'KYC Level',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'currentTypeBasedOnCardNature',
                        reference: 'currentTypeBasedOnCardNature',
                        columnWidth: .50,
                        fieldLabel: 'Currency type based on card nature',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'cardSecurityType',
                        reference: 'cardSecurityType',
                        columnWidth: .50,
                        fieldLabel: 'Cards Security Type',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },                   
                    ]
                },                                                
                {
                    xtype: 'fieldset',
                    id: 'autoDebitRequest',
                    reference: 'autoDebitRequest',
                    columnWidth: 1,
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    layout: 'column',
                    title: 'AUTO DEBIT REQUEST',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'checkbox',
                        itemId: 'autoDebitReqFullOutstanding',
                        reference: 'autoDebitReqFullOutstanding',
                        columnWidth: .25,
                        boxLabel: 'Full Outstanding',
                        labelAlign: 'left',
                        labelWidth: 150,
                        margin: '5 10 5 10',
                        // listeners : {
                        //     change : 'onFullOutstanding'
                        // }, 
                    },
                    {
                        xtype: 'checkbox',
                        itemId: 'autoDebitReqMinimumAmount',
                        reference: 'autoDebitReqMinimumAmount',
                        columnWidth: .150,
                        boxLabel: 'Minimum Amount',
                        labelAlign: 'left',
                        labelWidth: 150,
                        margin: '5 10 5 15',                   
                    }                    
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'existingLiabilitiesFieldCard',
                    reference: 'existingLiabilitiesFieldCard',
                    columnWidth: 1,
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    layout: 'column',
                    title: 'EXISTING LIABILITIES DETAILS',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'gridpanel',
                        itemId: 'existingLiabilitiesGridCard',
                        reference: 'existingLiabilitiesGridCard',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gExistingLiabilitiesStoreCard',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        plugins: [],

                        features: [
                            {
                                ftype: 'grouping',
                                groupHeaderTpl: '{name}({children.length})',
                                hideGroupedHeader: true,
                                showSummaryRow: true
                            },
                            {
                                ftype: 'summary',
                                dock: 'bottom'
                            }
                        ],

                        tbar: [
                            {
                                text: 'New Liability',
                                handler : 'onAddLiabilityCard',
                                hidden: true
                            }
                        ],

                        columns: [
                            {
                                header: "#",
                                sortable: false,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                header: "Bank/Fis Name",
                                width: 200,
                                sortable: false,
                                editable: true,
                                align: 'center',
                                dataIndex: 'bankName',
                                editor: 'textfield'
                            }, {
                                header: "Product",
                                width: 100,
                                sortable: false,
                                editable: true,
                                align: 'center',
                                dataIndex: 'product',
                                editor: 'textfield',
                                //summaryType: 'count',
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                    return '<b>Total: </b>'; 
                                }
                            }, {
                                header: "Disbursed",
                                width: 120,
                                sortable: false,
                                editable: true,
                                align: 'center',
                                dataIndex: 'disbursed',
                                summaryType: 'sum',
                                editor: {
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                },
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                 if(isNaN(value)){
                                        return 0;      
                                    }else{
                                        return Ext.String.format('<b>{0}</b>', value);       
                                    }
                                },
                            }, {
                                header: "Current Outstanding",
                                width: 120,
                                sortable: false,
                                editable: true,
                                align: 'center',
                                dataIndex: 'currentOutstanding',
                                summaryType: 'sum',
                                editor: {
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                },
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                    if(isNaN(value)){
                                        return 0;      
                                    }else{
                                        return Ext.String.format('<b>{0}</b>', value);       
                                    }
                                }
                            }, {
                                header: "EMI size",
                                width: 120,
                                sortable: false,
                                editable: true,
                                align: 'center',
                                dataIndex: 'eMISize',
                                summaryType: 'sum',
                                editor: {
                                    xtype: 'numberfield',
                                    hideTrigger: true,                   
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                },
                                summaryRenderer: function(value, summaryData, dataIndex) {
                                    // this.up('#cardDetailsWin').down('#existingCardEMI').setValue(value);
                                    if(isNaN(value)){
                                        return 0;      
                                    }else{
                                    return Ext.String.format('<b>{0}</b>', value);   
                                    }
                                    
                                }
                            }, {
                                header: "Remarks",
                                flex: 1,
                                align: 'center',
                                sortable: false,
                                editable: true,
                                dataIndex: 'remarks',
                                editor: 'textfield'
                            }, {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                tooltip: 'Delete Liability',
                                reference: 'deleteReference',
                                handler: 'onDelLiabilityCard'
                            }, {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                hidden: false,
                                tooltip: 'Save Liability',
                                reference: 'saveReference',
                                handler : 'onActionSaveLiabilityCard'
                            }, {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New Liability',
                                handler : 'onNewLiabilityCard'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    id: 'analystsComments',
                    reference: 'analystsComments',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    title: 'ANALYSTS COMMENTS',
                    margin: '10 10 10 10',
                    layout: 'column',
                    items: [
                    {
                        xtype: 'gridpanel',
                        reference: 'analystsCommentsGrid',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gAnalystCommentStoreCard',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        tbar: [{
                            text: 'New Comment',
                            reference: 'analystsCommntBtn',
                            handler : 'onAddCommentCard',
                            hidden: true
                        }],

                        columns: [
                            {
                                header: "#",
                                sortable: true,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            }, 
                            {
                                header: "Comment Id",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentId',
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
                                format:'Y-m-d h:i:s A',
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
                                header: "<span style='margin-left: 350px'>Comment</span>",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'comments',
                                editable: true,
                                editor: 'textfield',
                                filter: {
                                    type: 'text'
                                }
                            },
                            {
                                header: "Commented By",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentedBy',
                                align: 'center',
                                readOnly: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                reference: 'deleteReference',
                                hidden: false,
                                tooltip: 'Delete Analysts Comment',
                                handler: 'onDelAnalystsCommentCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                reference: 'saveReference',
                                hidden: false,
                                tooltip: 'Save Analysts Comment',
                                handler : 'onSaveAnalystsCommentCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New Analysts Comment',
                                handler : 'onNewAnalystCommentCard'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    id: 'cardDocument',
                    reference: 'cardDocument',
                    columnWidth: 1,
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    layout: 'column',
                    title: 'UPLOAD DOCUMENTATION',
                    margin: '10 10 10 10',
                    items: [{
                        xtype: 'fieldset',
                        id: 'regularDocument',
                        reference: 'regularDocument',
                        columnWidth: 1,
                        layout: 'column',
                        title: 'DOCUMENTS',
                        margin: '10 10 10 10',
                        items: [                                            
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadCibUnderTakingContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'CIB Undertaking',
                                    itemId: 'uploadCibUnderTaking',
                                    reference: 'uploadCibUnderTaking',
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
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadLetterOfIntroductionContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Letter Of Introduction(LOI)',
                                    itemId: 'uploadLetterOfIntroduction',
                                    reference: 'uploadLetterOfIntroduction',
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
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadSalaryStatementContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Salary Statement',
                                    itemId: 'uploadsalaryStatement',
                                    reference: 'uploadsalaryStatement',
                                    name: 'file',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 10',
                                    hidden: false,
                                    buttonText: '...',
                                    listeners: {
                                        change: function(f,v){
                                            var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                            node.value = v.replace("C:\\fakepath\\","");
                                        }
                                    }
                                },                                
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadReferenceDetailsContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Reference Details',
                                    itemId: 'uploadReferenceDetails',
                                    reference: 'uploadReferenceDetails',
                                    name: 'file',
                                    labelAlign: 'left',
                                    labelWidth: 200,
                                    margin: '5 10 5 10',
                                    hidden: false,
                                    buttonText: '...',
                                    listeners: {
                                        change: function(f,v){
                                            var node = Ext.DomQuery.selectNode('input[id='+f.getInputId()+']');
                                            node.value = v.replace("C:\\fakepath\\","");
                                        }
                                    }
                                },                                
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadBpCibDocumentsContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'BP/CIV ID Documents Copy',
                                    itemId: 'uploadBpCibDocuments',
                                    reference: 'uploadBpCibDocuments',
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
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadPassportSizePhotoContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Passport Size Photo 1',
                                    itemId: 'uploadPassportSizePhoto1',
                                    reference: 'uploadPassportSizePhoto1',
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
                            ]
                        },
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',
                            reference : 'uploadPassportSizePhotoContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Passport Size Photo 2',
                                    itemId: 'uploadPassportSizePhoto2',
                                    reference: 'uploadPassportSizePhoto2',
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
                            ]
                        },                                                                
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        id: 'additionalDocument',
                        reference: 'additionalDocument',
                        columnWidth: 1,
                        layout: 'column',
                        title: 'ADDITIONAL DOCUMENT',
                        margin: '10 10 10 10',
                        items: [
                        {
                            xtype : 'fieldcontainer',
                            columnWidth : 1,
                            layout : 'column',                        
                            reference : 'uploadValidPassportDualCardContainer',
                            items : [                            
                                {
                                    xtype: 'filefield',
                                    columnWidth: 1,                   
                                    itemId: 'uploadValidPassportDualCard',
                                    reference: 'uploadValidPassportDualCard',
                                    fieldLabel: 'Valid Passport for Dual Card',
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
                                    itemId: 'viewValidPassport',
                                    reference: 'viewValidPassport', 
                                    iconCls : 'view_icon',
                                    tooltip: 'View File',
                                    hidden: true,
                                    // handler: 'onClickTinViewFile'
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'validPassportDualCardUploaded',
                                    reference: 'validPassportDualCardUploaded',
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
                                            reference: 'validPassportDualCardUploadedYes'
                                        },
                                        { 
                                            boxLabel: 'NO',
                                            inputValue: '0',
                                            reference: 'validPassportDualCardUploadedNo',
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
                            reference : 'uploadSupplApplicatPhotoContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Supplementary- Applicant Photo',
                                    itemId: 'uploadSupplApplicatPhoto',
                                    reference: 'uploadSupplApplicatPhoto',
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
                                    itemId: 'viewSupplApplicatPhotoFile',
                                    reference: 'viewSupplApplicatPhotoFile', 
                                    iconCls : 'view_icon',
                                    tooltip: 'View File',
                                    hidden: true,
                                    // handler: 'onClickSalaryCertificateViewFile'
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'supplApplicatPhotoUploaded',
                                    reference: 'supplApplicatPhotoUploaded',
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
                                            reference: 'supplApplicatPhotoUploadedYes'
                                        },
                                        { 
                                            boxLabel: 'NO',
                                            inputValue: '0',
                                            reference: 'supplApplicatPhotoUploadedNo',
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
                            reference : 'uploadSupplApplicatNidContainer',
                            items : [
                                {
                                    xtype: 'filefield',
                                    columnWidth:1,
                                    fieldLabel: 'Supplementary- Applicant NID',
                                    itemId: 'uploadSupplApplicatNid',
                                    reference: 'uploadSupplApplicatNid',
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
                                    itemId: 'viewSupplApplicatNidFile',
                                    reference: 'viewSupplApplicatNidFile', 
                                    iconCls : 'view_icon',
                                    tooltip: 'View File',
                                    hidden: true,
                                    // handler: 'onClickSalaryCertificateViewFile'
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'supplApplicatNidUploaded',
                                    reference: 'supplApplicatNidUploaded',
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
                                            reference: 'supplApplicatNidUploadedYes'
                                        },
                                        { 
                                            boxLabel: 'NO',
                                            inputValue: '0',
                                            reference: 'supplApplicatNidUploadedNo',
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
                            reference : 'uploadSecDocSecuredCardContainer',
                            items : [                            
                                {
                                    xtype: 'filefield',
                                    columnWidth: 1,                   
                                    itemId: 'uploadSecDocSecuredCard',
                                    reference: 'uploadSecDocSecuredCard',
                                    fieldLabel: 'Security doc for secured Card',
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
                                    itemId: 'viewSecDocSecuredCardFile',
                                    reference: 'viewSecDocSecuredCardFile', 
                                    iconCls : 'view_icon',
                                    tooltip: 'View File',
                                    hidden: true,
                                    // handler: 'onClickTinViewFile'
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'secDocSecuredCardUploaded',
                                    reference: 'secDocSecuredCardUploaded',
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
                                            reference: 'secDocSecuredCardUploadedYes'
                                        },
                                        { 
                                            boxLabel: 'NO',
                                            inputValue: '0',
                                            reference: 'secDocSecuredCardUploadedNo',
                                            checked: true
                                        }            
                                    ]
                                }
                            ]
                        },
                        ]
                    }
                    
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'documenttation',
                    reference: 'documenttation',
                    columnWidth: 1,
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    title: 'DOCUMENTS CHECKLIST BY CD',
                    margin: '10 10 10 10',
                    items: [
                    {
                        xtype: 'gridpanel',
                        itemId: 'documenttationGrid',
                        reference: 'documenttationGrid',
                        header: false,
                        border: true,
                        title: false,
                        margin: '5 10 5 15',
                        store: 'gCardDocumentStore',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'top',
                            itemId: 'documenttationGridToolbar',
                            items: [
                                '->',
                                {
                                    xtype : 'button',
                                    text : 'Refresh',
                                    iconCls: 'icon-refresh',
                                    tooltip: 'Refresh Data',
                                    reference: 'docGridRefreshBtn',
                                    itemId: 'docGridRefreshBtn',
                                    align: 'right',
                                    listeners : {
                                        click : 'onRefreshDocGrid'
                                    }
                                }
                            ]
                        }],

                        columns: [
                            {
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
                                onWidgetAttach: function (column, widget, record) {
                                    widget.down().setValue(record.store.indexOf(record));

                                    var status = record.get('uploadStatus');
                                    if(!status){
                                        widget.items.items[2].setValue(true);
                                        record.data.uploadStatus = 0;
                                    }
                                    else{
                                        widget.items.items[1].setValue(true);
                                        record.data.uploadStatus = 1;
                                    } 
                                },
                                widget: {
                                    xtype: 'radiogroup',
                                    align: 'center',
                                    margin: '0 0 0 -25',
                                    items: [
                                    {
                                        xtype : 'textfield',
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
                                    }],
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
                                onWidgetAttach: function (column, widget, record) {
                                    widget.down().setValue(record.store.indexOf(record));
                                },
                                widget: {
                                    xtype: 'form',
                                    border: false,
                                    items: [
                                        {
                                            xtype : 'textfield',
                                            hidden : true
                                        },
                                        {
                                            xtype: 'filefield',
                                            buttonOnly: true,
                                            name: 'file',
                                            margin: '0 0 0 -10',
                                            buttonText: '...',
                                            listeners: {
                                                change: 'onChangeDocumentFileCard'
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
                                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                                    if(value == 1) return 'YES';
                                    return 'NO';
                                }               
                            },
                            {
                                header: "File Present",
                                width: 150,
                                sortable: true,
                                align: 'center',
                                dataIndex: 'filePresent',
                                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                                    if(value == 1) return 'YES';
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
                                iconCls : 'view_icon',
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
                                iconCls : 'grid-download',
                                tooltip: 'Download File',
                                handler: 'onClickDocGridDownloadCard'
                            }]
                        }  
                    ] 
                },
                {
                    xtype: 'fieldset',
                    id: 'checkingAreas',
                    reference: 'checkingAreas',
                    columnWidth: 1,
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    layout: 'column',
                    title: 'Checking Areas',
                    margin: '10 10 10 10',
                    items: [{
                        xtype: 'fieldset',
                        id: 'cardDuplicationChecking',
                        reference: 'cardDuplicationChecking',
                        columnWidth: 1,
                        layout: 'column',
                        title: 'Card Duplication',
                        margin: '10 10 10 10',
                        items: [                    
                        {
                            xtype: 'textfield',
                            itemId: 'cardDuplicationResult',
                            reference: 'cardDuplicationResult',
                            columnWidth: 1,
                            fieldLabel: 'Result',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        }, 
                        {
                            xtype: 'textfield',
                            itemId: 'cardDuplicationReason',
                            reference: 'cardDuplicationReason',
                            columnWidth: 1,
                            fieldLabel: 'Reason',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        },                                                                                                    
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        id: 'unSanctionChecking',
                        reference: 'unSanctionChecking',
                        columnWidth: 1,
                        layout: 'column',
                        title: 'UN Sanction',
                        margin: '10 10 10 10',
                        items: [                    
                        {
                            xtype: 'textfield',
                            itemId: 'unSanctionResult',
                            reference: 'unSanctionResult',
                            columnWidth: 1,
                            fieldLabel: 'Result',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        }, 
                        {
                            xtype: 'textfield',
                            itemId: 'unSanctionReason',
                            reference: 'unSanctionReason',
                            columnWidth: 1,
                            fieldLabel: 'Reason',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        },                                                                                                    
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        id: 'ofacChecking',
                        reference: 'ofacChecking',
                        columnWidth: 1,
                        layout: 'column',
                        title: 'OFAC',
                        margin: '10 10 10 10',
                        items: [                    
                        {
                            xtype: 'textfield',
                            itemId: 'ofacSanctionResult',
                            reference: 'ofacSanctionResult',
                            columnWidth: 1,
                            fieldLabel: 'Result',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        }, 
                        {
                            xtype: 'textfield',
                            itemId: 'ofacSanctionReason',
                            reference: 'ofacSanctionReason',
                            columnWidth: 1,
                            fieldLabel: 'Reason',
                            labelAlign: 'left',
                            labelWidth: 200,
                            margin: '5 10 5 15'
                        },                                                                                                    
                        ]
                    },                    
                    
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'commentsDeviation',
                    reference: 'commentsDeviation',
                    collapsible: true,
                    collapsed: true,
                    title: 'DEVIATIONS(IF ANY)',
                    margin: '10 10 10 10',
                    layout: 'column',
                    hidden: true,
                    columnWidth: 1,
                    items: [
                    {
                        xtype: 'gridpanel',
                        reference: 'cmntDeviationGrid',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gCmntDeviationsStore',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        plugins: [],

                        columns: [
                            {
                                header: "#",
                                sortable: true,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            }, 
                            {
                                header: "Comment Id",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentId',
                                hidden: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                header: "Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format:'Y-m-d h:i:s A',
                                width: 140,
                                sortable: true,
                                readOnly: true,
                                dataIndex: 'createdDate',
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
                                header: "<span style='margin-left: 350px'>Comment</span>",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'comments',
                                editable: true,
                                editor: 'textfield',
                                filter: {
                                    type: 'text'
                                }
                            },
                            {
                                header: "Commented By",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentedBy',
                                align: 'center',
                                readOnly: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                reference: 'deleteReference',
                                hidden: false,
                                tooltip: 'Delete Comments Deviation',
                                handler: 'onDelCmntDeviation'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                hidden: false,
                                tooltip: 'Save Comments Deviation',
                                reference: 'saveReference',
                                handler : 'onSaveCmntDeviation'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New Comments Deviation',
                                handler : 'onNewCmntDeviation'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    id: 'commentsJustification',
                    reference: 'commentsJustification',
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    title: 'COMMENTS/JUSTIFICATION',
                    margin: '10 10 10 10',
                    columnWidth: 1,
                    items: [
                    {
                        xtype: 'gridpanel',
                        reference: 'cmntJustificationGrid',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gCmntJustificationStoreCard',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        plugins: [],

                        columns: [
                            {
                                header: "#",
                                sortable: true,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            }, 
                            {
                                header: "Comment Id",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentId',
                                hidden: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                header: "Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format:'Y-m-d h:i:s A',
                                width: 140,
                                sortable: true,
                                readOnly: true,
                                dataIndex: 'createdDate',
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
                                header: "<span style='margin-left: 350px'>Comment</span>",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'comments',
                                editable: true,
                                editor: 'textfield',
                                filter: {
                                    type: 'text'
                                }
                            },
                            {
                                header: "Commented By",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentedBy',
                                align: 'center',
                                readOnly: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                reference: 'deleteReference',
                                hidden: false,
                                tooltip: 'Delete Comments Justification',
                                handler: 'onDelCmntJustificationCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                hidden: false,
                                tooltip: 'Save Comments Justification ',
                                reference: 'saveReference',
                                handler : 'onSaveCmntJustificationCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New Comments Justification',
                                handler : 'onNewCmntJustificationCard'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    id: 'cibStatusFldSet',
                    reference: 'cibStatusFldSet',
                    collapsible: true,
                    collapsed: true,
                    title: 'CIB STATUS',
                    margin: '10 10 10 10',
                    layout: 'column',
                    hidden: true,
                    columnWidth: 1,
                    items: [
                    {
                        xtype: 'gridpanel',
                        reference: 'cibStatusGrid',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gCibStatusCommentStoreCard',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        plugins: [],

                        tbar: [{
                            text: 'New Status',
                            reference: 'cibStatusCommntBtn',
                            handler : 'onAddCommentCard',
                            hidden: true
                        }],

                        columns: [
                            {
                                header: "#",
                                sortable: true,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            }, 
                            {
                                header: "Comment Id",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentId',
                                hidden: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                header: "Date",
                                xtype: 'datecolumn',
                                align: 'center',
                                format:'Y-m-d h:i:s A',
                                width: 140,
                                sortable: true,
                                readOnly: true,
                                dataIndex: 'createdDate',
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
                                header: "<span style='margin-left: 350px'>Comment</span>",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'comments',
                                editable: true,
                                editor: 'textfield',
                                filter: {
                                    type: 'text'
                                }
                            },
                            {
                                header: "Commented By",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentedBy',
                                align: 'center',
                                readOnly: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                reference: 'deleteReference',
                                hidden: false,
                                tooltip: 'Delete CIB Status',
                                handler: 'onDelCibStatusCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                hidden: false,
                                tooltip: 'Save CIB Status',
                                reference: 'saveReference',
                                handler : 'onSaveCibStatusCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New CIB Status',
                                handler : 'onNewCibStatusCard'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'approvalFromBranchOfficea',
                    reference: 'approvalFromBranchOfficea',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    title: 'APPROVAL FROM BRANCH OFFICE (CARD OFFICER/ HEAD OF CARD)',
                    margin: '10 10 10 10',
                    columnWidth: 1,
                    layout: 'column',
                    items: [                      
                        {
                            xtype : 'panel',
                            columnWidth : .50,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'creditSupportOfficerApprovePanel',
                            margin : 1,
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            value: 'Name Of Employees',
                                            // margin: '0 10 0 10',
                                            labelAlign: 'left',
                                            columnWidth : 1
                                        },
                                        {
                                            xtype : 'displayfield',
                                            value: 'ID:',
                                            margin: '0 10 0 150',
                                            columnWidth : 1
                                        },
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Recommended By</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                    reference : 'creditSupportOfficerName'
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'creditSupportOfficerApproveDate'
                                }
                            ]
                        },
                        {
                            xtype : 'panel',
                            columnWidth : .50,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'hoCRMApprovePanel',
                            margin : 1,
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            value: 'Head of Cards',
                                            columnWidth : .50
                                        },                                        
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Endorsed by</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                    reference : 'hoCRMName'
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'hoCRMApproveDate'
                                }
                            ]
                        },                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: 'instrucationsToCAD',
                    reference: 'instrucationsToCAD',
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    title: 'INSTRUCTIONS TO CARD OPERATION',
                    margin: '10 10 10 10',
                    columnWidth: 1,
                    layout: 'column',
                    items: [
                    {
                        xtype: 'gridpanel',
                        reference: 'instrucationsToCADGrid',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gIns2CADStoreCard',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        plugins: [],

                        tbar: [{
                            text: 'New Instruction',
                            reference : 'cardCadInstructionBtn',
                            reference: 'ins2CADBtn',
                            handler : 'onAddCommentCard',
                            hidden: true
                        }],

                        columns: [
                            {
                                header: "Instruction No",
                                sortable: true,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            }, 
                            {
                                header: "Comment Id",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentId',
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
                                format:'Y-m-d h:i:s A',
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
                                header: "<span style='margin-left: 350px'>Instructions</span>",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'comments',
                                editable: true,
                                editor: 'textfield',
                                filter: {
                                    type: 'text'
                                }
                            },
                            {
                                header: "Instucted By",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentedBy',
                                align: 'center',
                                readOnly: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                hidden: false,
                                reference: 'deleteReference',
                                tooltip: 'Delete Instruction To CAD',
                                handler: 'onDelInstruction2CadCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                reference: 'saveReference',
                                hidden: false,
                                tooltip: 'Save Instruction To CAD',
                                handler : 'onSaveInstruction2CadCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New Instruction To CAD',
                                handler : 'onNewInstruction2CadCard'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    id: 'exceptionDetailsField',
                    reference: 'exceptionDetailsField',
                    collapsible: true,
                    collapsed: true,
                    hidden: true,
                    title: 'EXCEPTION DETAILS',
                    margin: '10 10 10 10',
                    columnWidth: 1,
                    layout: 'column',
                    items: [
                    {
                        xtype: 'gridpanel',
                        reference: 'exceptionDetailGrid',
                        columnWidth: 1,
                        margin: '5 10 5 15',
                        layout: 'column',
                        header: false,
                        border: true,
                        title: false,
                        store: 'gExceptionDetailStoreCard',
                        viewConfig : {
                            stripeRows : true,
                            autoHeight : true,
                            enableTextSelection: true,
                            columnLines: true
                        },

                        plugins: [],

                        tbar: [{
                            text: 'New Exception',
                            reference: 'exceptionDetailBtn',
                            handler : 'onAddCommentCard',
                            hidden: true
                        }],

                        columns: [
                            {
                                header: "#",
                                sortable: true,
                                xtype: 'rownumberer',
                                filter: {
                                    type: 'list'
                                }
                            }, 
                            {
                                header: "Comment Id",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentId',
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
                                format:'Y-m-d h:i:s A',
                                width: 140,
                                sortable: true,
                                readOnly: true,
                                dataIndex: 'createdDate',
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
                                header: "<span style='margin-left: 350px'>Comment</span>",
                                flex: 1,
                                sortable: true,
                                dataIndex: 'comments',
                                editable: true,
                                editor: 'textfield',
                                filter: {
                                    type: 'text'
                                }
                            },
                            {
                                header: "Commented By",
                                width: 100,
                                sortable: true,
                                dataIndex: 'commentedBy',
                                align: 'center',
                                readOnly: true,
                                filter: {
                                    type: 'list'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'grid-delete',
                                reference: 'deleteReference',
                                hidden: false,
                                tooltip: 'Delete Exception Detail',
                                handler: 'onDelExceptionDetailCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'save-icon',
                                reference: 'saveReference',
                                hidden: false,
                                tooltip: 'Save Exception Detail',
                                handler : 'onSaveExceptionDetailCard'
                            },
                            {
                                xtype: 'actioncolumn',
                                width:30,
                                sortable: false,
                                align: 'center',
                                iconCls : 'new-icon2',
                                reference: 'addNewCellReference',
                                tooltip: 'New Exception Detail',
                                handler : 'onNewExceptionDetailCard'
                            }
                        ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'approvalFromHeadOffice',
                    reference: 'approvalFromHeadOffice',
                    collapsible: true,
                    collapsed: true,
                    columnWidth: 1,
                    hidden: true,
                    title: 'APPROVAL FROM HEAD OFFICE (CREDIT ANALYST/ RISK MANAGER/ HOCRM/ MD)',
                    margin: '10 10 10 10',
                    columnWidth: 1,
                    layout: 'column',
                    items: [
                        {
                            xtype: 'numberfield',
                            itemId: 'appliedAmount2',
                            reference: 'appliedAmount2',
                            columnWidth: .50,
                            fieldLabel: 'Applied Amount',
                            labelAlign: 'left',
                            labelWidth: 165,
                            margin: '5 10 5 6',
                            format: '0.00',
                            minValue: 0,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            readOnly: true,
                        },
                        {
                            xtype: 'numberfield',
                            itemId: 'approvedLimit',
                            reference: 'approvedLimit',
                            columnWidth: .50,
                            fieldLabel: 'Approved Limit' + '<span class="req" style="color:red">*</span>',
                            labelAlign: 'left',
                            labelWidth: 165,
                            margin: '5 4 5 10',
                            hideTrigger : true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            format: '0.00',
                            minValue: 0,
                            // listeners : {
                            //     change : 'onRecommendedForApprovalChange'
                            // }
                        },
                        {
                            xtype : 'panel',
                            columnWidth : .25,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'creditSupportOfficerApprovePanel',
                            margin : 1,
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            columnWidth : 1
                                        },
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Recommended By</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                    reference : 'creditSupportOfficerName'
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'creditSupportOfficerApproveDate'
                                }
                            ]
                        },
                        {
                            xtype : 'panel',
                            columnWidth : .25,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'unitHeadRetailCreditPanel',
                            margin : 1,
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            reference : 'rmOUhDesignation',
                                            //value: 'Unit Head, Retail Credit',
                                            columnWidth : 1
                                        },
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Recommended By</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    reference : 'rmOUhName',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'unitHeadRetailCreditApproveDate'
                                }
                            ]
                        },
                        {
                            xtype : 'panel',
                            columnWidth : .25,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'hoCRMApprovePanel',
                            margin : 1,
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            // value: 'HoCRM',
                                            columnWidth : 1
                                        },
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Endorsed by</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                    reference : 'hoCRMName'
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'hoCRMApproveDate'
                                }
                            ]
                        },
                        {
                            xtype : 'panel',
                            columnWidth : .25,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'chiefBusinessOfficerApprovePanel',
                            // hidden: true,
                            margin : 1,
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            // value: 'Chief Business Officer',
                                            columnWidth : 1
                                        },
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Endorsed by</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                    reference : 'chiefBusinessOfficerName'
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'chiefBusinessOfficerApproveDate'
                                }
                            ]
                        },
                        {
                            xtype : 'panel',
                            columnWidth : 1,
                            border : approvalPanelBorder,
                            height : approvalPanelHeight,
                            reference : 'managingDirectorAndCERApprovePanel',
                            margin : '20 1 1 1',
                            layout : 'column',
                            dockedItems : [
                                {
                                    xtype : 'toolbar',
                                    dock : 'bottom',
                                    style: {
                                      background: approvalPanelHeaderFooterBgColor
                                    },
                                    items : [
                                        '->',
                                        {
                                            xtype : 'displayfield',
                                            value: 'Managing Director & CEO',
                                            columnWidth : 1
                                        },
                                        '->'
                                    ]
                                }
                            ],
                            items : [
                                {
                                    xtype : 'displayfield',
                                    value: '<div style="text-align:center;">Approved By</div>',
                                    columnWidth : 1,
                                    style: {
                                         background: approvalPanelHeaderFooterBgColor,
                                         border: '1px'
                                     }
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Name',
                                    columnWidth : 1,
                                    margin : '0 0 0 5',
                                    reference : 'managingDirectorName'
                                },
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Date',
                                    margin : '0 0 0 5',
                                    columnWidth : 1,
                                    reference : 'ManagingDirectorApproveDate'
                                }
                            ]
                        }
                    ]
                },
                ]
            }
            ]
       },
       {
            xtype: 'panel',
            id: 'commentsPanel',
            reference: 'commentsPanel',
            layout: 'fit',
            title: ' Queries',
            height: 486.5,
            items : [
                {
                    xtype : 'panel',
                    itemId: 'cmntOfActionPanel',
                    reference: 'cmntOfActionPanel',
                    border : false,
                    layout: 'column',
                    columnWidth: 1,
                    title: 'Comments',
                    // listeners: {
                    //     expand: 'onExpandComntOfActionPanel'
                    // },
                    items: [
                        {
                            xtype: 'gridpanel',
                            reference: 'cmntOfActionGrid',
                            columnWidth: 1,
                            margin: '5 10 5 15',
                            layout: 'column',
                            header: false,
                            border: true,
                            title: false,
                            store: 'gCardCmntOfActionStore',
                            viewConfig : {
                                stripeRows : true,
                                autoHeight : true,
                                enableTextSelection: true,
                                columnLines: true
                            },

                            columns: [
                                {
                                    header: "#",
                                    sortable: true,
                                    xtype: 'rownumberer',
                                    filter: {
                                        type: 'list'
                                    }
                                }, 
                                {
                                    header: "Comment Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'commentId',
                                    hidden: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Date",
                                    xtype: 'datecolumn',
                                    align: 'center',
                                    format:'Y-m-d h:i:s A',
                                    width: 140,
                                    sortable: true,
                                    readOnly: true,
                                    dataIndex: 'createdDate',
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
                                    header: "<span style='margin-left: 350px'>Comment</span>",
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'comments',
                                    editable: true,
                                    editor: 'textfield',
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Commented By",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'commentedBy',
                                    align: 'center',
                                    readOnly: true,
                                    filter: {
                                        type: 'list'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            reference: 'queryResponseGrid',
                            columnWidth: 1,
                            margin: '5 10 5 15',
                            layout: 'column',
                            header: false,
                            border: true,
                            title: false,
                            store: 'gCardQueryCmntStore',
                            viewConfig : {
                                stripeRows : true,
                                autoHeight : true,
                                enableTextSelection: true,
                                columnLines: true
                            },

                            plugins: [],

                            columns: [
                                {
                                    header: "#",
                                    sortable: true,
                                    xtype: 'rownumberer',
                                    filter: {
                                        type: 'list'
                                    }
                                }, 
                                {
                                    header: "Comment Id",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'commentId',
                                    hidden: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Query Date",
                                    xtype: 'datecolumn',
                                    align: 'center',
                                    format:'Y-m-d h:i:s A',
                                    width: 140,
                                    sortable: true,
                                    readOnly: true,
                                    dataIndex: 'createdDate',
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
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Queried By",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'commentedBy',
                                    align: 'center',
                                    readOnly: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    header: "Query",
                                    align: 'center',
                                    width:350,
                                    sortable: true,
                                    dataIndex: 'comments',
                                    editable: false,
                                    cellWrap: true,
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Query Response",
                                    align: 'center',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'commentResponse',
                                    editable: true,
                                    editor: 'textfield',
                                    cellWrap: true,
                                    filter: {
                                        type: 'text'
                                    }
                                },
                                {
                                    header: "Responsed By",
                                    width: 100,
                                    sortable: true,
                                    dataIndex: 'commentResponseBy',
                                    align: 'center',
                                    readOnly: true,
                                    filter: {
                                        type: 'list'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width:30,
                                    sortable: false,
                                    align: 'center',
                                    iconCls : 'save-icon',
                                    hidden: true,
                                    tooltip: 'Save Query Response',
                                    reference: 'saveReference',
                                    handler : 'onCardSaveQueryResponse'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
       {
            xtype: 'fieldcontainer',
            id: 'cardNotesPanel',
            reference: 'cardNotesPanel',
            layout: 'column',
            title: 'Notes',
            // scrollable: true,
            columnWidth: 1,
            height: 486.5,
            items: [
            {
                xtype : 'form',
                itemId: 'notesForm',
                reference: 'notesForm',
                collapsible: false,
                title: 'Notes',
                layout: 'column',
                columnWidth: .5,
                margin : '5 0 0 10',
                height: 481,
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
                            text: 'Save Notes',
                            reference: 'saveNotesCard',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onSaveCardNotes'
                            }
                        },
                        {
                            xtype: 'button',
                            padding: 3,
                            text: 'Clear Notes',
                            style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                            listeners: {
                                click: 'onClearCardNotes'
                            }
                        }
                    ]
                }],
                items: [
                {
                    xtype: 'textareafield',
                    itemId: 'loanNotes',
                    reference: 'loanNotes',
                    fieldLabel: 'Notes',
                    emptyText: 'Please write your Notes here',
                    columnWidth: 1,
                    labelAlign: 'left',
                    labelWidth: 120,
                    anchor : '100%',
                    height: 250,
                    margin : '50 10 5 10',
                },
              ]
            },
            {
                xtype : 'panel',
                itemId: 'lonNotesForm',
                reference: 'lonNotesForm',
                collapsible: false,
                scrollable: true, 
                title: 'Card Notes',
                layout: 'fit',
                columnWidth: .5,
                margin : '5 10 0 0',
                height: 488,
                items: [
                {
                    xtype: 'gridpanel',
                    reference: 'notesOfActionGrid',
                    width: 570,
                    layout: 'fit',     
                    store: 'gCardNotesStore',
                    multiSelect: true,
                    loadMask: true,
                    viewConfig : {
                        stripeRows: true,
                        enableTextSelection: true,
                    },
                    columns: [
                        {
                            header: "#",
                            sortable: true,
                            xtype: 'rownumberer',
                            filter: {
                                type: 'list'
                            }
                        }, 
                        {
                            header: "Notes Id",
                            width: 100,
                            sortable: true,
                            dataIndex: 'notesId',
                            hidden: true,
                            filter: {
                                type: 'list'
                            }
                        },
                        {
                            header: "Date",
                            xtype: 'datecolumn',
                            align: 'center',
                            format:'Y-m-d h:i:s A',
                            width: 140,
                            sortable: true,
                            readOnly: true,
                            dataIndex: 'createDate',
                            filter: {
                                type: 'date'
                            }
                        },
                        {
                            header: "Notes",
                            align: 'center',
                            width: 250,
                            sortable: true,
                            dataIndex: 'loanNotes',
                            editable: false,
                            cellWrap: true,
                            filter: {
                                type: 'text'
                            }
                        },
                        {
                            header: "Notes By",
                            align: 'center',
                            width: 150,
                            sortable: true,
                            dataIndex: 'notesBy',
                            editable: false,
                            cellWrap: true,
                            filter: {
                                type: 'text'
                            }
                        }                 
                    ]
                },
             ]
            }
          ]
       },
       ]
    }],
    listeners: {
        afterrender: 'onActivateCardDetailsWin'
    } 
});