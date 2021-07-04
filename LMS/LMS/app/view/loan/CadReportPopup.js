Ext.define('Desktop.view.loan.CadReportPopup', {
    extend : 'Ext.panel.Panel',
    title : "SANCTION LETTER INFO",
    requires: [
        'Desktop.view.loan.LoanController',
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

    closable : true,
    floatable : true,
    floating : true,
    draggable : true,
    width : 600,
    height :500,
    modal : true,

    itemId: 'cadReportPopup',

    items : [
    {
        xtype : "panel",
        itemId : 'cadReportPopupPanel',
        reference: 'cadReportPopupPanel',
        width : 580,
        border:false,
        layout: 'column',
        items:[
            {
                xtype: 'displayfield',
                reference: 'loanMainSearchGridData',
                hidden: true
            },
            {
                xtype: 'textfield',
                itemId: 'reportRef',
                reference: 'reportRef',
                fieldLabel: 'Ref',
                labelAlign: 'left',
                labelWidth: 200,
                columnWidth: 1,
                margin: '10 0 0 10',
                readOnly: true
            },
            {
                xtype: 'datefield',
                itemId: 'mdApprovalDate',
                reference: 'mdApprovalDate',
                fieldLabel: 'MD Approval Date',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1,
                format: 'd M Y'
            },
            {
                xtype: 'textfield',
                itemId: 'careOf',
                reference: 'careOf',
                fieldLabel: 'Care Of',
                labelAlign: 'left',
                labelWidth: 200,
                columnWidth: 1,
                margin: '10 0 0 10',
            },
            {
                xtype: 'datefield',
                itemId: 'letterReqDate',
                reference: 'letterReqDate',
                fieldLabel: 'Letter Request Date',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1,
                format: 'd M Y'
            },
            {
                xtype: 'numberfield',
                itemId: 'loanLimit',
                reference: 'loanLimit',
                fieldLabel: 'Limit',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1,
                format: '0.00',
                //minValue: 0,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
            },
            {
                //xtype: 'numberfield',
                xtype: 'textfield',
                itemId: 'rateOfInterest',
                reference: 'rateOfInterest',
                fieldLabel: 'Rate Of Interest',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1,
                //format: '0.00',
                //minValue: 0,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false,
                listeners: {
                    change: function(e, text, prev) {
                        if (!/^-?[0-9]*(\.[0-9]{0,2})?$/.test(text)) 
                        {   
                            this.setValue(prev);
                        }
                    }
                }
            },
            {
                xtype: 'numberfield',
                // xtype: 'textfield',
                itemId: 'zeroOneNosChequesAmount',
                reference: 'zeroOneNosChequesAmount',
                fieldLabel: '01 Nos. Cheques Amount',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1,
                //format: '0.00',
                //minValue: 0,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
            },
            {
                xtype: 'numberfield',
                // xtype: 'textfield',
                itemId: 'zeroThreeNosChequesAmount',
                reference: 'zeroThreeNosChequesAmount',
                fieldLabel: '03 Nos. Cheques Amount',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1,
                //format: '0.00',
                //minValue: 0,
                hideTrigger: true,
                keyNavEnabled: false,
                mouseWheelEnabled: false
            },
            {
                xtype : 'textareafield',
                grow : true,
                height: 25,
                itemId: 'specialTermsAndConditionsOne',
                reference: 'specialTermsAndConditionsOne',
                fieldLabel: 'Special Terms and Conditions 1',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1
            },
            {
                xtype : 'textareafield',
                grow : true,
                height: 25,
                itemId: 'specialTermsAndConditionsTwo',
                reference: 'specialTermsAndConditionsTwo',
                fieldLabel: 'Special Terms and Conditions 2',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1
            },
            {
                xtype : 'textareafield',
                grow : true,
                height: 25,
                itemId: 'specialTermsAndConditionsThree',
                reference: 'specialTermsAndConditionsThree',
                fieldLabel: 'Special Terms and Conditions 3',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1
            },
            {
                xtype : 'textareafield',
                grow : true,
                height: 25,
                itemId: 'specialTermsAndConditionsFour',
                reference: 'specialTermsAndConditionsFour',
                fieldLabel: 'Special Terms and Conditions 4',
                labelAlign: 'left',
                labelWidth: 200,
                margin: '10 0 0 10',
                columnWidth: 1
            }
        ]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        itemId:'btnPanel',
        items : ['->',
            {
                text: 'Close',
                itemId: 'btnCancelCadReportPopup',
                reference : 'btnCancelCadReportPopup',
                iconCls: 'remove',
                width : 80,
                handler:'onClickCadReportPopup'
                
            },
            {
                itemId  : 'btnYesCadReportPopup',
                reference : 'btnYesCadReportPopup',
                text    : 'Yes',
                width : 80,
                hidden  :  false,
                listeners : {
                   click : 'onClickYesCadReportPopup'
                }
            },
        ]
    }],

    listeners: {
        afterrender: 'onActivateCadReportPopup'
    }
});