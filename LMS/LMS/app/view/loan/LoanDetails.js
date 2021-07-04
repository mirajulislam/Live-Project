var dbrPercent = 65;
var approvalPanelHeaderFooterBgColor = "#F0ECEC";
var approvalPanelHeight = 120;
var approvalPanelBorder = true;

var loanForm = Ext.define('Desktop.view.loan.LoanDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.loanDetails',
    itemId: 'LoanDetails',
    reference: 'LoanDetails',
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

    viewModel: {
        type: 'loanPanel'
    },
    autoShow: true,
    layout: 'fit',
    maximized: true,
    minimizable: true,
    items: [{
        xtype: 'tabpanel',
        region: 'center',
        layout: 'fit',
        id: 'loanDetailsHome',
        reference: 'loanDetailsHome',
        tabPosition: 'bottom',
        listeners: {
            tabchange: 'onLoanTabChange'
        },
        items: [{
            xtype: 'panel',
            id: 'applicationDetailsPanel',
            reference: 'applicationDetailsPanel',
            // layout: 'fit',
            title: 'Application Details',
            scrollable: true,
           // height: 486.5,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    shadow: true,
                    itemId: 'loanSearchTollbar',
                    layout: 'column',
                    columnWidth: 1,
                    items : [
                        {
                            xtype : 'panel',
                            itemId: 'loanAccountSearchPad',
                            reference: 'loanAccountSearchPad',
                            collapsible: true,
                            collapsed: false,
                            columnWidth: 1,
                            layout: 'column',
                            border : false,
                            title: 'Search',
                            dockedItems : [
                                {
                                    xtype: 'toolbar',
                                    dock: 'bottom',
                                    itemId: 'loanSearchTollbar',
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
                        }
                    ]
                },
                {
                    xtype : 'toolbar',
                    dock : 'bottom',
                    items : [
                        '->',
                        // source officer action start
                        {
                            xtype: 'button',
                            itemId: 'soSaveApplicationBtn',
                            reference: 'soSaveApplicationBtn',
                            text: 'Save',
                            // text: 'SO Save',
                            hidden: true,
                            listeners: {
                                click: 'onClickSoSaveApplication'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'soUpdateApplicationBtn',
                            reference: 'soUpdateApplicationBtn',
                            // text: 'SO Update',
                            text: 'Update',
                            hidden: true,
                            listeners: {
                                click: 'onClickSoUpdateApplication'
                            }
                        },
                        {
                            text: 'Recommend To',     
                            reference : 'soRecommendGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'soRecommendGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'soDeleteApplicationBtn',
                            reference: 'soDeleteApplicationBtn',
                            // text: 'SO Delete',
                            text: 'Delete',
                            hidden: true,
                            listeners: {
                                click: 'onClickSoDeleteApplication'
                            }
                        },
                        // source officer action end
                        // BM, BOM, PPC officer action start
                        {
                            xtype: 'button',
                            itemId: 'bmBomPcRecommendbtn',
                            reference: 'bmBomPcRecommendbtn',
                            // text: 'BM/BOM/PC Recommend',
                            text: 'Recommend',
                            hidden: true,
                            listeners: {
                                click: 'onClickBmBomPcRecommendbtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bmBomPcReturnBtn',
                            reference: 'bmBomPcReturnBtn',
                            // text: 'BM/BOM/PC Return',
                            text: 'Return',
                            hidden: true,
                            listeners: {
                                click: 'onClickBmBomPcReturnBtn'
                            }
                        },
                        // BM, BOM, PPC officer action end

                        //Start MIS's Actions start
                        {
                            xtype: 'button',
                            itemId: 'btnMisRcv',
                            reference: 'btnMisRcv',
                            text: 'Receive',
                            hidden: true,
                            listeners: {
                                click: 'onClickMisPullFromDetailBtnClick'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMisUpdt',
                            reference: 'btnMisUpdt',
                            // text: 'MIS_UPDATE',
                            text: 'Update',
                            hidden: true,
                            listeners: {
                                click: 'onClickMisUpdateBtn'
                            }
                        },
                        {
                            // text: 'MIS Allocate To',
                            text: 'Allocate To',        
                            reference : 'misAllocateGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'misAllocateGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            // text: 'MIS Return To',
                            text: 'Return To',     
                            reference : 'misReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'misReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMisMailToPolice',
                            reference: 'btnMisMailToPolice',
                            // text: 'MIS_MAIL_TO_POLICE',
                            text: 'Mail To Police',
                            hidden: true,
                            listeners: {
                                click: 'onClickMisMailToPoliceBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMisSnd2Cad',
                            reference: 'btnMisSnd2Cad',
                            // text: 'MIS_SEND_TO_CAD',
                            text: 'Send To CAD',
                            hidden: true,
                            listeners: {
                                click: 'onClickMisSendToCadBtn'
                            }
                        },
                        {
                            text: 'Return To',     
                            reference : 'cadReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'cadReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMisSnd2Cib',
                            reference: 'btnMisSnd2Cib',
                            text: 'Send To CIB',
                            hidden: true,
                            listeners: {
                                click: 'onClickMisSendToCibBtn'
                            }
                        },
                        //End MIS's Actions
                        // Credit Analyst action start 
                         {
                            xtype: 'button',
                            itemId: 'creditAnalystPendReceiveBtn',
                            reference: 'creditAnalystPendReceiveBtn',
                            text: 'Receive',
                            hidden: true,
                            listeners: {
                                click: 'onClickCApendReceivedClick'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'creditAnalystUpdtBtn',
                            reference: 'creditAnalystUpdtBtn',
                            // text: 'CA_UPDATE',
                            text: 'Update',
                            hidden: true,
                            listeners: {
                                click: 'onClickCreditAnalystUpdt'
                            }
                        },
                        {
                            // text: 'CA Recommend To', 
                            text: 'Recommend To',    
                            reference : 'caRecommendGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'caRecommendGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            // text: 'CA Return To', 
                            text: 'Return To',    
                            reference : 'caReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'caReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnConditionFulfil',
                            reference: 'btnConditionFulfil',
                            // text: 'CA Condition Fulfil',
                            text: 'Condition Fulfil',
                            hidden: true,
                            listeners: {
                                click: 'onClickBtnConditionFulfil'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnSendQuery',
                            reference: 'btnSendQuery',
                            // text: 'CA Send Query',
                            text: 'Send Query',
                            hidden: true,
                            listeners: {
                                click: 'onClickBtnSendQuery'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnCaSnd2Cib',
                            reference: 'btnCaSnd2Cib',
                            text: 'Send To CIB',
                            hidden: true,
                            listeners: {
                                click: 'onClickCaSendToCibBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'caDeleteApplicationBtn',
                            reference: 'caDeleteApplicationBtn',
                            // text: 'SO Delete',
                            text: 'Delete',
                            hidden: true,
                            listeners: {
                                click: 'onClickCaDeleteApplication'
                            }
                        },
                        // Credit Analyst action end
                        //Start Risk Manager's Actions
                        {
                            xtype: 'button',
                            itemId: 'btnRMApprv',
                            reference: 'btnRMApprv',
                            text: 'Approve',
                            // text: 'RM_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickRmApproveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnRMCApprv',
                            reference: 'btnRMCApprv',
                            text: 'Conditional Approve',
                            // text: 'RM_C_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickRmConditionalApproveBtn'
                            }
                        },
                        {
                            // text: 'RM Recommend To',  
                            text: 'Recommend To',   
                            reference : 'rmRecommendGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'rmRecommendGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            // text: 'RM Return To',   
                            text: 'Return To',  
                            reference : 'rmReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'rmReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnRMDecline',
                            reference: 'btnRMDecline',
                            text: 'Decline',
                            // text: 'RM_DECLINE',
                            hidden: true,
                            listeners: {
                                click: 'onClickRmDeclineBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnRMDefer',
                            reference: 'btnRMDefer',
                            text: 'Defer',
                            // text: 'RM_DEFER',
                            hidden: true,
                            listeners: {
                                click: 'onClickRmDeferBtn'
                            }
                        },
                        //End Risk Manager's Actions
                        //Start Unit Head's Actions
                        {
                            xtype: 'button',
                            itemId: 'btnUHApprv',
                            reference: 'btnUHApprv',
                            text: 'Approve',
                            // text: 'UH_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickUhApproveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnUHCApprv',
                            reference: 'btnUHCApprv',
                            text: 'Conditional Approve',
                            // text: 'UH_C_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickUhConditionalApproveBtn'
                            }
                        },
                        {
                            // text: 'UH Recommend To',    
                            text: 'Recommend To', 
                            reference : 'uhRecommendGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'uhRecommendGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            // text: 'UH Return To',  
                            text: 'Return To',   
                            reference : 'uhReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'uhReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnUHDecline',
                            reference: 'btnUHDecline',
                            text: 'Decline',
                            // text: 'UH_DECLINE',
                            hidden: true,
                            listeners: {
                                click: 'onClickUhDeclineBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnUHDefer',
                            reference: 'btnUHDefer',
                            text: 'Defer',
                            // text: 'UH_DEFER',
                            hidden: true,
                            listeners: {
                                click: 'onClickUhDeferBtn'
                            }
                        },
                        //End Unit Head's Actions
                        //Start HOCRM's Actions
                        {
                            xtype: 'button',
                            itemId: 'btnHoCrmApprv',
                            reference: 'btnHoCrmApprv',
                            text: 'Approve',
                            // text: 'HOCRM_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickHoCrmApproveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnHoCrmCApprv',
                            reference: 'btnHoCrmCApprv',
                            text: 'Conditional Approve',
                            // text: 'HOCRM_C_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickHoCrmConditionalApproveBtn'
                            }
                        },
                        {
                            // text: 'HoCRM Recommend To', 
                            text: 'Recommend To',    
                            reference : 'hoCrmRecommendGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'hoCrmRecommendGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            // text: 'HoCRM Return To',  
                            text: 'Return To',   
                            reference : 'hoCrmReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'hoCrmReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnHoCrmDecline',
                            reference: 'btnHoCrmDecline',
                            text: 'Decline',
                            // text: 'HOCRM_DECLINE',
                            hidden: true,
                            listeners: {
                                click: 'onClickHoCrmDeclineBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnHoCrmDefer',
                            reference: 'btnHoCrmDefer',
                            text: 'Defer',
                            // text: 'HOCRM_DEFER',
                            hidden: true,
                            listeners: {
                                click: 'onClickHoCrmDeferBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnHoCrmSnd2Cad',
                            reference: 'btnHoCrmSnd2Cad',
                            text: 'Send To CAD',
                            hidden: true,
                            listeners: {
                                click: 'onClickHoCrmSendToCadBtn'
                            }
                        },
                         //End HOCRM's Actions 

                        //Start MD's Actions
                        {
                            xtype: 'button',
                            itemId: 'btnMdApprv',
                            reference: 'btnMdApprv',
                            text: 'Approve',
                            // text: 'MD_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickMdApproveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMdCApprv',
                            reference: 'btnMdCApprv',
                            text: 'Conditional Approve',
                            hidden: true,
                            // text: 'MD_C_APPROVE',
                            listeners: {
                                click: 'onClickMdConditionalApproveBtn'
                            }
                        },
                        {
                            // text: 'MD Return To', 
                            text: 'Return To',    
                            reference : 'mdReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'mdReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMdDecline',
                            reference: 'btnMdDecline',
                            text: 'Decline',
                            hidden: true,
                            // text: 'MD_DECLINE',
                            listeners: {
                                click: 'onClickMdDeclineBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnMdDefer',
                            reference: 'btnMdDefer',
                            text: 'Defer',
                            // text: 'MD_DEFER',
                            hidden: true,
                            listeners: {
                                click: 'onClickMdDeferBtn'
                            }
                        },
                         //End MD's Actions
                         //Start CEO's Actions
                        {
                            xtype: 'button',
                            itemId: 'btnCeoApprv',
                            reference: 'btnCeoApprv',
                            text: 'Approve',
                            hidden: true,
                            // text: 'CEO_APPROVE',
                            listeners: {
                                click: 'onClickCeoApproveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnCeoCApprv',
                            reference: 'btnCeoCApprv',
                            text: 'Conditional Approve',
                            // text: 'CEO_C_APPROVE',
                            hidden: true,
                            listeners: {
                                click: 'onClickCeoConditionalApproveBtn'
                            }
                        },
                        {
                            // text: 'CEO Return To',  
                            text: 'Return To',   
                            reference : 'ceoReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'ceoReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnCeoDecline',
                            reference: 'btnCeoDecline',
                            text: 'Decline',
                            hidden: true,
                            // text: 'CEO_DECLINE',
                            listeners: {
                                click: 'onClickCeoDeclineBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnCeoDefer',
                            reference: 'btnCeoDefer',
                            text: 'Defer',
                            hidden: true,
                            // text: 'CEO_DEFER',
                            listeners: {
                                click: 'onClickCeoDeferBtn'
                            }
                        },
                         //End CEO's Actions    
                         //Start CAD's Actions 

                         {
                            xtype: 'button',
                            itemId: 'cadSendQuery2So',
                            reference: 'cadSendQuery2So',
                            text: 'Query To SO',
                            hidden: true,
                            listeners: {
                                click: 'onClickCadSendQuery2So'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'cadSendQuery2Ca',
                            reference: 'cadSendQuery2Ca',
                            text: 'Query To CA',
                            hidden: true,
                            listeners: {
                                click: 'onClickCadSendQuery2Ca'
                            }
                        },
                        {
                            // text: 'CAD Return To SL_GENERATED state',  
                            text: 'Return To',   
                            reference : 'cadReturnGroupMenuBtn',  
                            disabled: true,   
                            hidden: true,       
                            menu: {
                                xtype: 'menu',  
                                reference : 'cadReturnGroupMenu',                   
                                items: []                          
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'cadDisbursed',
                            reference: 'cadDisbursed',
                            text: 'Disbursed',
                            hidden: true,
                            listeners: {
                                click: 'onClickCadDisbursed'
                            }
                        },

                         //End CAD's Actions           
                        '->'
                    ]
                }
            ],
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
                        xtype : 'displayfield',
                        reference : 'hiddenLoanRawData'
                    },
                    { 
                        xtype: 'displayfield',
                        reference: 'hiddenLoanPrefix'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'personalInfoField',
                reference: 'personalInfoField',
                collapsible: true,
                collapsed: true,
                columnWidth: 1,
                layout: 'column',
                title: 'PERSONAL INFORMATION',
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
                        itemId: 'applicationNo',
                        reference: 'applicationNo',
                        columnWidth: .50,
                        fieldLabel: 'Application No',
                        fieldStyle: 'background: #7ABDFF',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        readOnly: true
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
                        fieldStyle: 'background: #7ABDFF',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'bpNo',
                        reference: 'bpNo',
                        columnWidth: .50,
                        fieldLabel: 'BP No/CIV ID',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'nid',
                        reference: 'nid',
                        columnWidth: .35,
                        fieldLabel: 'NID' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 1 5 15',
                    },
                    {
                        xtype: 'checkbox',
                        boxLabel: 'Matched NID',
                        name: 'isMatchedNid',
                        columnWidth:.09,
                        reference: 'isMatchedNid',
                        labelAlign: 'left',
                        labelWidth: 40,
                        margin: '5 0 0 5',
                    },
                    {
                        xtype: 'button',
                        itemId: 'searchNidDetails',
                        reference: 'searchNidDetails',
                        text: 'Verify',
                        margin: '5 0 0 5',
                        columnWidth: .050,
                        // hidden : true,
                        listeners: {
                            click: 'onClickVerifyNid'
                        }
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'nameOfBorrower',
                        reference: 'nameOfBorrower',
                        columnWidth: .50,
                        fieldLabel: 'Name of Borrower' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                     {
                        xtype: 'textfield',
                        itemId: 'banglaNameOfBorrower',
                        reference: 'banglaNameOfBorrower',
                        columnWidth: .50,
                        fieldLabel: 'Name of Borrower in Bangla',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'tin',
                        reference: 'tin',
                        columnWidth: .50,
                        fieldLabel: 'TIN',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'designation',
                        reference: 'designation',
                        columnWidth: .50,
                        fieldLabel: 'Designation'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
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
                        itemId: 'currentPlaceofPosting',
                        reference: 'currentPlaceofPosting',
                        columnWidth: .50,
                        fieldLabel: 'Current Place of Posting' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
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
                        bind: {
                            store: '{cbblAccountNoStore}'
                        },
                        triggerAction: 'all',
                        selectOnFocus:true
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'dateOfBirth',
                        reference: 'dateOfBirth',
                        columnWidth: .35,
                        fieldLabel: 'Date of Birth & Age'+ '<span class="req" style="color:red">*</span>',
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
                        itemId: 'cif',
                        reference: 'cif',
                        columnWidth: .50,
                        fieldLabel: 'CIF' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
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
                        xtype: 'datefield',
                        itemId: 'dateOfRetirement',
                        reference: 'dateOfRetirement',
                        columnWidth: .35,
                        fieldLabel: 'Date of Retirement & Remaining Yr',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: 'd M Y',
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
                        readOnly: true
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
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'customerType',
                        reference: 'customerType',
                        columnWidth: .50,
                        fieldLabel: 'Customer\'s Type' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'value1',
                        valueField: 'configurationId',
                        queryMode: 'local',
                        forceSelection: true,
                        store: 'gCustTypeStore',
                        listeners : {
                            change : 'onCustomerTypeChange'
                        }
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
                    }, 
                    {
                        xtype: 'textfield',
                        itemId: 'mobile',
                        reference: 'mobile',
                        columnWidth: .50,
                        fieldLabel: 'Mobile',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'emerPhone',
                        reference: 'emerPhone',
                        columnWidth: .50,
                        fieldLabel: 'Emergency Phone',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'district',
                        reference: 'district',
                        columnWidth: .50,
                        fieldLabel: 'District',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'
                    } ,
                    {
                        xtype: 'textfield',
                        itemId: 'division',
                        reference: 'division',
                        columnWidth: .50,
                        fieldLabel: 'Division',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'
                    } 
                ]
            },
            {
                xtype: 'fieldset',
                id: 'loanInfoField',
                reference: 'loanInfoField',
                collapsible: true,
                collapsed: true,
                columnWidth: 1,
                layout: 'column',
                title: 'LOAN INFORMATION',
                margin: '10 10 10 10',
                items: [
                    {
                        // We will use this field to update 
                        xtype: 'textfield',
                        itemId: 'keepHiddenloanIdKey',
                        reference: 'keepHiddenloanIdKey',
                        hidden: true
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'loanType',
                        reference: 'loanType',
                        columnWidth: .50,
                        fieldLabel: 'Loan Type' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'value1',
                        valueField: 'configurationId',
                        queryMode: 'local',
                        forceSelection: true,
                        store:'gLoanTypeStore',
                        readOnly: true,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        hidden: true,
                        listeners : {
                            change : 'onLoanTypeChange'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'appliedLoanAmount',
                        reference: 'appliedLoanAmount',
                        columnWidth: .50,
                        fieldLabel: 'Asking Loan/Applied Amount' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'onAppliedLoanAmountChange'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'grossSalaryPerMonth',
                        reference: 'grossSalaryPerMonth',
                        columnWidth: .50,
                        fieldLabel: 'Gross Salary(per month)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'ongrossSalaryPerMonth'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'gPFAmount',
                        reference: 'gPFAmount',
                        columnWidth: .50,
                        fieldLabel: 'GPF Amount' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        hidden: true,
                        readOnly: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,    
                        listeners : {
                            change : 'onChangeGPFamountField',
                        }              
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'purposeOfLoan',
                        reference: 'purposeOfLoan',
                        columnWidth: .50,
                        fieldLabel: 'Purpose of the loan',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                            {
                                name: 'Purchase of home appliance',
                                value: 'Purchase of home appliance'
                            },
                            {
                                name: 'Emergency medical needs',
                                value: 'Emergency medical needs'
                            },
                            {
                                name: 'Trips in abroad',
                                value: 'Trips in abroad'
                            },
                            {
                                name: 'Education',
                                value: 'Education'
                            },
                            {
                                name: 'Training',
                                value: 'Training'
                            },
                            {
                                name: 'Marriage of family member',
                                value: 'Marriage of family member'
                            },
                            {
                                name: 'Home renovation',
                                value: 'Home renovation'
                            }
                            ]
                        }),
                    },
                    {
                        xtype: 'radiogroup',
                        itemId: 'takeOverLoan',
                        reference: 'takeOverLoan',
                        fieldLabel: 'Take Over Loan',
                        labelAlign: 'left',
                        labelWidth: 200,
                        columnWidth: .50,
                        margin: '5 10 5 15',
                        items: [
                            { 
                                boxLabel: 'YES',
                                reference : 'takeOverLoanYes', 
                                inputValue: '1' 
                            },
                            { 
                                boxLabel: 'NO',
                                reference : 'takeOverLoanNo', 
                                inputValue: '0',
                                checked: true
                            }            
                        ]
                    },
                    {
                        xtype: 'radiogroup',
                        itemId: 'topUpLoan',
                        reference: 'topUpLoan',
                        fieldLabel: 'Top-Up',
                        labelAlign: 'left',
                        labelWidth: 200,
                        columnWidth: .50,
                        margin: '5 10 5 15',
                        items: [
                            { 
                                boxLabel: 'YES',
                                reference : 'topUpLoanYes', 
                                inputValue: '1' 
                            },
                            { 
                                boxLabel: 'NO',
                                reference : 'topUpLoanNo', 
                                inputValue: '0',
                                checked: true
                            }            
                        ]
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
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'onNetMonthlyIncomeChange'
                        } 
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'tenorYear',
                        reference: 'tenorYear',
                        columnWidth: .50,
                        fieldLabel: 'Tenor (Year/s)' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'onTenorYearChange'
                        }
                    },  
                    {
                        xtype: 'numberfield',
                        itemId: 'existingLoanEMI',
                        reference: 'existingLoanEMI',
                        columnWidth: .50,
                        fieldLabel: 'Existing Loan EMIs (if any)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'onExistingLoanEMIChange'
                        }
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
                        listeners : {
                            change : 'onInterestRateChange'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'totalEMI',
                        reference: 'totalEMI',
                        columnWidth: .50,
                        fieldLabel: 'Total EMIs',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        listeners : {
                            change : 'onTotalEMIChange'
                        }
                    }, 
                    {
                        xtype: 'numberfield',
                        itemId: 'disposableIncome',
                        reference: 'disposableIncome',
                        columnWidth: .50,
                        fieldLabel: 'Disposable Income',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        listeners : {
                            change : function(cmp, newValue, oldValue, e, eOpt){
                                if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
                                else cmp.setValue(newValue);
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'proposeEMIDate',
                        reference: 'proposeEMIDate',
                        columnWidth: .50,
                        fieldLabel: 'Propose EMI Date',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        mode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        queryMode: 'local',
                        forceSelection: true,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {
                                    name: '1st day of month',
                                    value: '1st day of month'
                                }, {
                                    name: '2nd day of month',
                                    value:'2nd day of month'
                                },{
                                    name: '3rd day of month',
                                    value:'3rd day of month'
                                },
                                {
                                    name: '4th day of month',
                                    value:'4th day of month'
                                },
                                {
                                    name: '5th day of month',
                                    value:'5th day of month'
                                },
                                {
                                    name: '6th day of month',
                                    value:'6th day of month'
                                },
                                {
                                    name: '7th day of month',
                                    value:'7th day of month',
                                },
                                {
                                    name: '8th day of month',
                                    value:'8th day of month',
                                },
                                {
                                    name: '9th day of month',
                                    value:'9th day of month',
                                },
                                {
                                    name: '10th day of month',
                                    value:'10th day of month',
                                },{
                                    name: '11th day of month',
                                    value:'11th day of month',
                                },{
                                    name: '12th day of month',
                                    value:'12th day of month',
                                },{
                                    name: '13th day of month',
                                    value:'13th day of month',
                                },{
                                    name: '14th day of month',
                                    value:'14th day of month',
                                },{
                                    name: '15th day of month',
                                    value:'15th day of month',
                                },{
                                    name: '16th day of month',
                                    value:'16th day of month',
                                },{
                                    name: '17th day of month',
                                    value:'17th day of month',
                                },{
                                    name: '18th day of month',
                                    value:'18th day of month',
                                },{
                                    name: '19th day of month',
                                    value:'19th day of month',
                                },{
                                    name: '20th day of month',
                                    value:'20th day of month',
                                },{
                                    name: '21th day of month',
                                    value:'21th day of month',
                                },{
                                    name: '22th day of month',
                                    value:'22th day of month',
                                },{
                                    name: '23th day of month',
                                    value:'23th day of month',
                                },{
                                    name: '24th day of month',
                                    value:'24th day of month',
                                },{
                                    name: '25th day of month',
                                    value:'25th day of month',
                                },{
                                    name: '26th day of month',
                                    value:'26th day of month',
                                },{
                                    name: '27th day of month',
                                    value:'27th day of month',
                                },{
                                    name: '28th day of month',
                                    value:'28th day of month',
                                },{
                                    name: '29th day of month',
                                    value:'29th day of month',
                                },{
                                    name: '30th day of month',
                                    value:'30th day of month',
                                },{
                                    name: '31th day of month',
                                    value:'31th day of month',
                                }
                            ]
                        }),
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'duplications',
                        reference: 'duplications',
                        columnWidth: .50,
                        fieldLabel: 'Duplications',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'monthlyInstallment',
                        reference: 'monthlyInstallment',
                        columnWidth: .50,
                        fieldLabel: 'Monthly Installment/Propose EMI'+ '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        listeners : {
                            change : 'onMonthlyInstallmentChange'
                        }
                    },    
                    {
                        xtype: 'datefield',
                        itemId: 'dateOfCIBGeneration',
                        reference: 'dateOfCIBGeneration',
                        columnWidth: .50,
                        fieldLabel: 'Date of CIB Generation',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: 'M d Y'
                    },  
                    {
                        xtype: 'numberfield',
                        itemId: 'allowedDBR',
                        reference: 'allowedDBR',
                        columnWidth: .50,
                        fieldLabel: 'Allowed DBR (%)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        value : (dbrPercent),
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        listeners : {
                            change : function(cmp, newValue, oldValue, e, eOpt){
                                if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
                                else cmp.setValue(newValue);
                            }
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
                                columnWidth: .65,
                                fieldLabel: 'CIB Status',
                                labelAlign: 'left',
                                labelWidth: 200,
                                margin: '5 10 5 15', 
                                readOnly: false,
                                hidden:true,
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
                                        hidden: true,
                                        listeners: {
                                            change: 'onChangeCibStatusFile'
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
                                hidden: true,
                                disabled: true,
                                handler: 'onClickCibStatusViewFile'
                            },
                            {
                                xtype: 'button',
                                itemId: 'cibDetails',
                                reference: 'cibDetails',
                                text: 'Inquiry',
                                margin: '5 10 5 0', 
                                columnWidth: .15,
                                disabled: true,
                                // hidden : true,
                                listeners: {
                                    click: 'onClickcibDetails'
                                }
                        },
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'proposedDBR',
                        reference: 'proposedDBR',
                        columnWidth: .50,
                        fieldLabel: 'Proposed DBR (%)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        fieldStyle: 'background : #FFFFFF',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly : true,
                        listeners : {
                            change : function(cmp, newValue, oldValue, e, eOpt){
                                if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
                                else cmp.setValue(newValue);
                                if(newValue>65){
                                    this.setFieldStyle("background-color : #FFFF00");
                                }
                                else{
                                    this.setFieldStyle("background-color : #FFFFFF");
                                }
                            }
                        }
                    },                

                    {
                        xtype: 'numberfield',
                        itemId: 'priceQuotationAmount',
                        reference: 'priceQuotationAmount',
                        columnWidth: .50,
                        fieldLabel: 'Price Quotation Amount at Least',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly : true,
                        fieldStyle: 'background: #7ABDFF',
                        listeners : {
                            change : 'onPriceQuotationAmountChange',
                        }
                    },

                    {
                        xtype: 'textfield',
                        itemId: 'relationshipWithApplicant',
                        reference: 'relationshipWithApplicant',
                        columnWidth: .50,
                        fieldLabel: 'Relationship With Applicant',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        hidden: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'nameOfGuarantor',
                        reference: 'nameOfGuarantor',
                        columnWidth: .50,
                        fieldLabel: 'Name Of the guarantor',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'mobileOfGuarantor',
                        reference: 'mobileOfGuarantor',
                        columnWidth: .50,
                        fieldLabel: 'Mobile Of Guarantor',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        // hidden: true
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'relationshipWithPg',
                        reference: 'relationshipWithPg',
                        columnWidth: .50,
                        fieldLabel: 'Relationship With PG',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        hidden: true
                    },      
                    {
                        xtype: 'textfield',
                        itemId: 'guarantorNid',
                        reference: 'guarantorNid',
                        columnWidth: .50,
                        fieldLabel: 'Guarantor NID',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        // hidden: true
                    },          
                    {
                        xtype: 'numberfield',
                        itemId: 'bankParticipation',
                        reference: 'bankParticipation',
                        columnWidth: .50,
                        fieldLabel: 'Bank Participation (%)',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        readOnly : false,
                        fieldStyle: 'background: #7ABDFF',
                        listeners : {
                            change : 'onChangeLTVFfield',
                        }
                    },               
                    {
                        xtype: 'textfield',
                        itemId: 'guarantorElibiblity',
                        reference: 'guarantorElibiblity',
                        columnWidth: .50,
                        fieldLabel: 'Guarantor Eligibility',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'dobOfPg',
                        reference: 'dobOfPg',
                        columnWidth: .40,
                        fieldLabel: 'DOB of PG & Age',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: 'd M Y',
                        listeners: {
                            change: 'onChangeDobOfPg'
                        }
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'dobOfPgYear',
                        reference: 'dobOfPgYear',
                        columnWidth: .10,
                        margin: '5 10 5 15',
                        readOnly: true,
                        fieldStyle: 'background: #7ABDFF',
                    },  
                    {
                        xtype: 'textfield',
                        itemId: 'smsStatus',
                        reference: 'smsStatus',
                        readOnly: true,
                        columnWidth: .50,
                        fieldLabel: 'SMS Status',
                        labelAlign: 'left',
                        hidden: true,
                        labelWidth: 200,
                        margin: '5 10 5 15',
                    },               
                    {
                        xtype: 'numberfield',
                        itemId: 'borrowerParticipation',
                        reference: 'borrowerParticipation',
                        columnWidth: .50,
                        fieldLabel: 'Borrower\'s Participation',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        minValue: 0,
                        listeners : {
                            change : function(cmp, newValue, oldValue, e, eOpt){
                                if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
                                else cmp.setValue(newValue);
                            }
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'remainingAmtAftEMI',
                        reference: 'remainingAmtAftEMI',
                        columnWidth: .50,
                        fieldLabel: 'Remaining Amount After EMI',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        listeners : {
                            change : 'onremainingAmtAftEMI'
                        }
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'security',
                        reference: 'security',
                        columnWidth: .50,
                        fieldLabel: 'Security',
                        labelAlign: 'left',
                        labelWidth: 200,
                        margin: '5 10 5 15',
                        hidden: true
                    },
                    {
                        xtype: 'displayfield',
                        reference: 'hiddenLoanGroupId',
                        hidden: true
                    }
                ]
            },
            {
                xtype: 'fieldset',
                id: 'documenttation',
                reference: 'documenttation',
                collapsible: true,
                collapsed: true,
                title: 'DOCUMENTATION',
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
                    store: 'gLoanDocumentStore',
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
                                listeners: {
                                    change: 'onChangeDocGridUploadStatus'
                                }
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
                                            change: 'onChangeDocumentFile'
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
                            handler: 'onClickDocGridViewFile'
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
                            handler: 'onClickDocGridDownload'
                        }]
                    }  
                ] 
             },
            {
                xtype: 'fieldset',
                id: 'existingLiabilitiesField',
                reference: 'existingLiabilitiesField',
                collapsible: true,
                collapsed: true,
                title: 'EXISTING LIABILITIES DETAILS',
                margin: '10 10 10 10',
                items: [
                {
                    xtype: 'gridpanel',
                    itemId: 'existingLiabilitiesGrid',
                    reference: 'existingLiabilitiesGrid',
                    header: false,
                    border: true,
                    title: false,
                    margin: '5 10 5 15',
                    store: 'gExistingLiabilitiesStore',
                    viewConfig : {
                        stripeRows : true,
                        autoHeight : true,
                        enableTextSelection: true,
                        columnLines: true
                    },

                    plugins: [],

                    features: [
                        {
                            id: 'group',
                            ftype: 'summary',
                            groupHeaderTpl: '{name}',
                            hideGroupedHeader: true,
                            enableGroupingMenu: false,
                            showSummaryRow: true
                        }
                    ],

                    tbar: [
                        {
                            text: 'New Liability',
                            handler : 'onAddLiability',
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
                        }, {
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
                            summaryType: 'count',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return '<b>Sum</b>'; 
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
                                this.up('#loanDetailsWin').down('#existingLoanEMI').setValue(value);
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
                            handler: 'onDelLiability'
                        }, {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'save-icon',
                            hidden: false,
                            tooltip: 'Save Liability',
                            reference: 'saveReference',
                            handler : 'onActionSaveLiability'
                        }, {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Liability',
                            handler : 'onNewLiability'
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
                title: 'COMMENTS/JUSTIFICATION',
                margin: '10 10 10 10',
                layout: 'column',
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
                    store: 'gCmntJustificationStore',
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
                            handler: 'onDelCmntJustification'
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
                            handler : 'onSaveCmntJustification'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Comments Justification',
                            handler : 'onNewCmntJustification'
                        }
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                id: 'recmdFrmBranch',
                reference: 'recmdFrmBranch',
                collapsible: true,
                collapsed: true,
                title: 'RECOMMENDATIONS FROM BRANCH',
                margin: '10 10 10 10',
                layout: 'column',
                items: [
                {
                    xtype: 'gridpanel',
                    reference: 'sourceRecmndGrid',
                    title: 'SOURCE OFFICER RECOMMENDATIONS',
                    columnWidth: 1,
                    margin: '5 10 5 15',
                    layout: 'column',
                    border: true,
                    store: 'gSourceRecmndStore',
                    viewConfig : {
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
                            editor: 'textareafield',
                            cellWrap: true,
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
                            tooltip: 'Delete Source Recmnd',
                            handler: 'onDelSourceRecmnd'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'save-icon',
                            hidden: false,
                            tooltip: 'Save Source Recmnd',
                            reference: 'saveReference',
                            handler : 'onSaveSourceRecmnd'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Source Recmnd',
                            handler : 'onNewSourceRecmnd'
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    reference: 'branchRecmndGrid',
                    title: 'BRANCH MANAGER RECOMMENDATIONS',
                    columnWidth: 1,
                    margin: '5 10 5 15',
                    layout: 'column',
                    border: true,
                    store: 'gBranchRecmndStore',
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
                            editor: 'textareafield',
                            cellWrap: true,
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
                            tooltip: 'Delete Branch Recmnd',
                            handler: 'onDelBranchRecmnd'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'save-icon',
                            hidden: false,
                            tooltip: 'Save Branch Recmnd',
                            reference: 'saveReference',
                            handler : 'onSaveBranchRecmnd'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Branch Recmnd',
                            handler : 'onNewBranchRecmnd'
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
                    store: 'gCibStatusCommentStore',
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
                        handler : 'onAddComment',
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
                            handler: 'onDelCibStatus'
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
                            handler : 'onSaveCibStatus'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New CIB Status',
                            handler : 'onNewCibStatus'
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
                    store: 'gAnalystCommentStore',
                    viewConfig : {
                        stripeRows : true,
                        autoHeight : true,
                        enableTextSelection: true,
                        columnLines: true
                    },

                    plugins: [],

                    tbar: [{
                        text: 'New Comment',
                        reference: 'analystsCommntBtn',
                        handler : 'onAddComment',
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
                            handler: 'onDelAnalystsComment'
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
                            handler : 'onSaveAnalystsComment'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Analysts Comment',
                            handler : 'onNewAnalystComment'
                        }
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                id: 'conditionFieldSet',
                reference: 'conditionFieldSet',
                collapsible: true,
                collapsed: true,
                title: 'CONDITION',
                margin: '10 10 10 10',
                items: [{
                    xtype : 'textareafield',
                    grow : true,
                    reference: 'condition',
                    anchor : '100%',
                    height: 90,
                    margin: '10 10 10 10'
                }]
            },
            {
                xtype: 'fieldset',
                id: 'exceptionDetailsField',
                reference: 'exceptionDetailsField',
                collapsible: true,
                collapsed: true,
                title: 'EXCEPTION DETAILS',
                margin: '10 10 10 10',
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
                    store: 'gExceptionDetailStore',
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
                        handler : 'onAddComment',
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
                            handler: 'onDelExceptionDetail'
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
                            handler : 'onSaveExceptionDetail'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Exception Detail',
                            handler : 'onNewExceptionDetail'
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
                layout: 'column',
                title: 'APPROVAL FROM HEAD OFFICE (CREDIT ANALYST/ UNIT HEAD, RETAIL CREDIT/ HOCRM/ MD)',
                margin: '10 10 10 10',
                items: [
                    {
                        xtype: 'numberfield',
                        itemId: 'appliedLoanAmountApproval',
                        reference: 'appliedLoanAmountApproval',
                        columnWidth: .29,
                        fieldLabel: 'Asking Loan/Applied Amount',
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
                        itemId: 'businessRecommendedAmnt',
                        reference: 'businessRecommendedAmnt',
                        columnWidth: .33,
                        fieldLabel: 'Business Recommended Amount',
                        labelAlign: 'left',
                        labelWidth: 185,
                        margin: '5 10 5 10',
                        format: '0.00',
                        minValue: 0,
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        readOnly: true,
                        listeners : {
                            change : 'onBusinessRecommendedAmntChange'
                        }
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'recommendedForApproval',
                        reference: 'recommendedForApproval',
                        columnWidth: .29,
                        fieldLabel: 'Recommended for Approval' + '<span class="req" style="color:red">*</span>',
                        labelAlign: 'left',
                        labelWidth: 165,
                        margin: '5 4 5 10',
                        hideTrigger : true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        format: '0.00',
                        minValue: 0,
                        listeners : {
                            change : 'onRecommendedForApprovalChange'
                        }
                    },
                    {
                        xtype : 'panel',
                        columnWidth : .33,
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
                                        value: 'Credit Analyst',
                                        columnWidth : 1
                                    },
                                    '->'
                                ]
                            }
                        ],
                        items : [
                            {
                                xtype : 'displayfield',
                                value: '<div style="text-align:center;">Appraise By</div>',
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
                        columnWidth : .34,
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
                        columnWidth : .33,
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
                                        value: 'HoCRM',
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
                        columnWidth : .20,
                        border : approvalPanelBorder,
                        height : approvalPanelHeight,
                        reference : 'chiefBusinessOfficerApprovePanel',
                        hidden: true,
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
                                        value: 'Chief Business Officer',
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
            {
                xtype: 'fieldset',
                id: 'instrucationsToCAD',
                reference: 'instrucationsToCAD',
                collapsible: true,
                collapsed: true,
                title: 'INSTRUCTIONS TO CAD',
                margin: '10 10 10 10',
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
                    store: 'gIns2CADStore',
                    viewConfig : {
                        stripeRows : true,
                        autoHeight : true,
                        enableTextSelection: true,
                        columnLines: true
                    },

                    plugins: [],

                    tbar: [{
                        text: 'New Instruction',
                        reference : 'loanCadInstructionBtn',
                        reference: 'ins2CADBtn',
                        handler : 'onAddComment',
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
                            handler: 'onDelInstruction2Cad'
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
                            handler : 'onSaveInstruction2Cad'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Instruction To CAD',
                            handler : 'onNewInstruction2Cad'
                        }
                    ]
                }]
            },
            {
                xtype: 'fieldset',
                id: 'commentsWaiverSought',
                reference: 'commentsWaiverSought',
                collapsible: true,
                collapsed: true,
                title: 'WAIVER SOUGHT(IF ANY)',
                margin: '10 10 10 10',
                layout: 'column',
                items: [
                {
                    xtype: 'gridpanel',
                    reference: 'cmntWaiverSoughtGrid',
                    columnWidth: 1,
                    margin: '5 10 5 15',
                    layout: 'column',
                    header: false,
                    border: true,
                    title: false,
                    store: 'gCmntWaiverSoughtStore',
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
                            tooltip: 'Delete Comments Waiver Sought',
                            handler: 'onDelCmntWaiverSought'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'save-icon',
                            hidden: false,
                            tooltip: 'Save Comments Waiver Sought',
                            reference: 'saveReference',
                            handler : 'onSaveCmntWaiverSought'
                        },
                        {
                            xtype: 'actioncolumn',
                            width:30,
                            sortable: false,
                            align: 'center',
                            iconCls : 'new-icon2',
                            reference: 'addNewCellReference',
                            tooltip: 'New Comments Waiver Sought',
                            handler : 'onNewCmntWaiverSought'
                        }
                    ]
                }]
            },
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
                        store: 'gCmntOfActionStore',
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
                        store: 'gQueryCmntStore',
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
                                handler : 'onSaveQueryResponse'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        xtype: 'fieldcontainer',
        id: 'notesPanel',
        reference: 'notesPanel',
        layout: 'column',
        title: 'Notes',
        // scrollable: true,
        columnWidth: 1,
        height: 486.5,
        items: [
        {
            xtype : 'form',
            itemId: 'nidSideInformationForm',
            reference: 'nidSideInformationForm',
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
                itemId: 'loanSearchTollbar',
                layout: {
                    type: 'hbox',
                    align: 'middle',
                    pack: 'center'
                },
                items: [{
                        xtype: 'button',
                        padding: 2,
                        text: 'Save Notes',
                        reference: 'saveNotesLoan',
                        listeners: {
                            click: 'onSaveNotes'
                        }
                    },
                    {
                        xtype: 'button',
                        padding: 3,
                        text: 'Clear Notes',
                        listeners: {
                            click: 'onClearNotes'
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
            title: 'Loan Notes',
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
                store: 'gNotesStore',
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
        afterrender: 'onActivateLoanDetailsWin'
    }   
});