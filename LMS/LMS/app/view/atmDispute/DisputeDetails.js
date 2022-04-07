var cardForm = Ext.define('Desktop.view.atmDispute.DisputeDetails', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.disputeDetails',
    itemId: 'disputeDetails',
    reference: 'disputeDetails',
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

    controller: 'atmDisputeController',

    viewModel: {
        type: 'atmDisputeController'
    },
    border: false,

    autoShow: true,
    layout: 'fit',
    maximized: true,
    minimizable: true,

    dockedItems: [
        
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
                    itemId: 'resolveBtn',
                    reference: 'resolveBtn',
                    style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                    text: 'Resolve',
                    hidden: true,
                    listeners: {
                        click: 'onClickResolve'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'rejecteBtn',
                    reference: 'rejecteBtn',
                    style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                    text: 'Rejecte',
                    hidden: true,
                    listeners: {
                        click: 'onClickRejecte'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'closeApplicationBtn',
                    reference: 'closeApplicationBtn',
                    style: 'border-style: solid; border-width: medium;border-color: PowderBlue;',
                    text: 'Close',
                    iconCls: 'remove',
                    listeners: {
                        click: 'onClickCloseDispute'
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
                    reference : 'hiddenStateName'
                },
                {
                    xtype : 'displayfield',
                    reference : 'hiddenStateId'
                },
                {
                    xtype : 'displayfield',
                    reference : 'customerComplaintKey'
                },
                {
                    xtype : 'displayfield',
                    reference : 'customerComplaintVer'
                },
                {
                    xtype : 'displayfield',
                    reference : 'trackingNumber'
                },
                {
                    xtype : 'displayfield',
                    reference : 'actionId'
                }                 
            ]
        },
        {
            xtype : 'form',
            itemId: 'newDisputeDeatils',
            reference: 'newDisputeDeatils',
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
                    xtype : 'displayfield',
                    margin : '5 10 5 10',
                    labelAlign: 'left',
                    columnWidth: 1,
                    // hidden : true,
                    reference : 'test1'
                },
                {
                    xtype: 'datefield',
                    itemId: 'txnDate',
                    reference: 'txnDate',
                    columnWidth: 1,
                    fieldLabel: 'Dispute Date',
                    format: 'd-M-Y H:i',
                    labelAlign: 'left',
                    labelWidth: 100,
                    margin: '5 10 5 10',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    format: 'd M Y',                    
                },
                {
                    xtype: 'textfield',
                    itemId: 'atmOwner',
                    reference: 'atmOwner',
                    fieldLabel: 'ATM Owner',
                    columnWidth: 1,
                    labelAlign: 'left',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    labelWidth: 100,
                    margin : '5 10 5 10',
                },
                {
                    xtype: 'numberfield',
                    itemId: 'txnAmount',
                    reference: 'txnAmount',
                    columnWidth: 1,
                    fieldLabel: 'Transaction Amount',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    labelAlign: 'left',
                    labelWidth: 100,
                    margin: '5 10 5 10',
                    format: '0.00',
                    minValue: 0,
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                },
                {
                    xtype: 'textfield',
                    itemId: 'accountNumber',
                    reference: 'accountNumber',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    fieldLabel: 'Account Number',
                    columnWidth: 1,
                    labelAlign: 'left',
                    labelWidth: 100,
                    margin : '5 10 5 10',
                },
                {
                    xtype: 'textfield',
                    itemId: 'cardNumber',
                    reference: 'cardNumber',
                    columnWidth: 1,
                    fieldLabel: 'Card Number',
                    labelAlign: 'left',
                    labelWidth: 100,
                    margin: '5 10 5 10',
                    readOnly: true,
                    fieldStyle: 'background: #7ABDFF'

                },
                {
                    xtype: 'textfield',
                    itemId: 'atmLocation',
                    reference: 'atmLocation',
                    columnWidth: 1,
                    fieldLabel: 'ATM Location',
                    labelAlign: 'left',
                    labelWidth: 100,
                    margin: '5 10 5 10',
                    fieldStyle: 'background: #7ABDFF',
                    readOnly : true
                },
                {
                    xtype: 'textfield',
                    itemId: 'comment',
                    reference: 'comment',
                    columnWidth: 1,
                    fieldLabel: 'Add Comments',
                    readOnly : true,
                    fieldStyle: 'background: #7ABDFF',
                    labelAlign: 'left',
                    labelWidth: 100,
                    margin: '5 10 5 10'
                }             
            ]
        }
    ],
    listeners: {
        afterrender: 'onActivateNewDisputeDetailsWin'
    }

});