Ext.define('Desktop.view.admin.userAccountDetailsForm', {
    extend: 'Ext.form.Panel',
    layout: 'border',
    title: 'New User',
    reference: 'userAccountDetailsForm',
    border: true,
    closable: true,
    /*floatable: true,
    floating: true,
    draggable: true,
    maximizable: true,
    minimizable: true,*/
    // width: '80%',
    // height: '90%',

    requires: [
        'appConstants',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Spacer',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Boolean',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.tree.Panel',
        'Ext.grid.filters.filter.Number',
        'Ext.grid.column.Date',
        'Ext.grid.filters.filter.Date',
        'Ext.grid.filters.filter.String',
        'Ext.grid.filters.filter.Boolean',
        'Ext.selection.CheckboxModel',
        'Ext.grid.filters.Filters',
        'Ext.grid.feature.Summary'
    ],

    layout: 'fit',
    initComponent: function() {

        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',
                activeTab: 0,
                dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        itemId: 'btnPanel',
                        items: ['->', {
                            itemId: 'btnCancel',
                            text: 'Close',
                            reference: 'btnCancel',
                            iconCls: 'cancel-icon',
                            name: 'btnCancel',
                            listeners: {
                                click: 'onClickCancelButton'
                            }
                        }, {
                            itemId: 'btnUpdate',
                            text: 'Update',
                            reference: 'btnUpdate',
                            iconCls: 'approve-icon',
                            hidden: true,
                            name: 'btnUpdate',
                            listeners: {
                                click: 'onClickUpdateButton'
                            }
                        }, {
                            itemId: 'btnSave',
                            reference: 'btnSave',
                            text: 'Save',
                            iconCls: 'save-icon',
                            name: 'btnSave',
                            hidden: false,
                            listeners: {
                                click: 'onClickSaveButton'
                            }
                        }]
                    }],
                items: [{
                    xtype: 'panel',
                    border: true,
                    title: 'Basic Information',
                    region: 'center',
                    layout: 'fit',
                    autoScroll: true,
                    itemId: 'userAccountInfoFormId',
                    reference: 'userAccountInfoFormId',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    bodyPadding: 10,
                    header: false,
                    fieldDefaults: {
                        labelAlign: 'right',
                        msgTarget: 'side'
                    },
                    items: [{
                        xtype: 'displayfield',
                        itemId: 'id',
                        fieldLabel: 'ID',
                        reference: 'id',
                        name: 'id',
                        readOnly: true,
                        allowBlank: false,
                        hidden: true
                    }, {
                        xtype: 'displayfield',
                        itemId: 'userVersion',
                        reference: 'userVersion',
                        name: 'id',
                        readOnly: true,
                        allowBlank: false,
                        hidden: true
                    }, {
                        xtype: 'textfield',
                        itemId: 'unId',
                        reference: 'unId',
                        fieldLabel: 'UNID*',
                        name: 'unId',
                        allowBlank: false
                    }, {
                        xtype: 'checkboxfield',
                        itemId: 'isLdapUser',
                        // reference: 'isLdapUser',
                        name: 'isLdapUser',
                        fieldLabel: 'Active Directory User',
                        hidden: false,
                        listeners: {
                            change: function(field, newValue, oldValue) {

                                if (newValue == true) {

                                    field.nextSibling().hide();
                                    field.nextSibling().setValue('Test123');
                                } else {
                                    field.nextSibling().show();
                                    field.nextSibling().setValue('');
                                }
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        itemId: 'password',
                        reference: 'userAccountPassword',
                        fieldLabel: 'Password*',
                        inputType: 'password',
                        name: 'password',
                        hidden: false,
                        allowBlank: true,
                        // readOnly: true
                    }, {
                        xtype: 'textfield',
                        itemId: 'firstName',
                        reference: 'userAccountFirstName',
                        fieldLabel: 'First Name*',
                        name: 'firstName',
                        allowBlank: false
                    }, {
                        fieldLabel: 'Last Name*',
                        itemId: 'lastName',
                        reference: 'userAccountLastName',
                        name: 'lastName',
                        xtype: 'textfield',
                        allowBlank: false
                    }, {
                        fieldLabel: 'Is Allow Login',
                        itemId: 'isAllowLogin',
                        reference: 'isAllowLogin',
                        name: 'lastName',
                        xtype: 'textfield',
                        hidden: true
                            //allowBlank: false
                    }, 
                    {
                        fieldLabel: 'User Alias',
                        itemId: 'userAlias',
                        reference: 'userAccountUserAlias',
                        name: 'userAlias',
                        xtype: 'textfield',
                        allowBlank: true
                    }, 
                    {
                        fieldLabel: 'Email',
                        itemId: 'email',
                        reference: 'email',
                        name: 'email',
                        xtype: 'textfield',
                        allowBlank: false,
                        validateBlank: true,
                        emptyText: 'username',
                        vtype: 'email',
                        vtypeText: 'Invalid email address',
                        //value:emailDomain,
                        allowBlank: true,
                        // text-transform: 'uppercase',
                        tip:'You need to give only email id, domain will be '+emailDomain+' and it will be added automatically.',
                        listeners: {
                                        render: function(c) {
                                          Ext.create('Ext.tip.ToolTip', {
                                            target: c.getEl(),
                                            html: c.tip
                                          });
                                        },
                                        blur: function(component) {
                                            if(component.getValue()!='' && component.getValue().indexOf(emailDomain)<0){
                                                component.setValue(component.getValue()+emailDomain);
                                            }
                                          
                                        },
                                        change: function (obj, newValue) {
                                            console.log(newValue);
                                            obj.setRawValue(newValue.toLowerCase());
                                        }
                        }
                    },
                    {
                        fieldLabel: 'CBS User Id',
                        itemId: 'cbsUserId',
                        // reference: 'cbsUserId',
                        name: 'cbsUserId',
                        xtype: 'textfield',
                        allowBlank: true
                    },                   
                    {
                        fieldLabel: 'In Vacation',
                        // reference: 'userAccountIsInVacation',
                        itemId: 'isInVacation',
                        name: 'isInVacation',
                        //disabled: true,
                        xtype: 'checkboxfield'
                    }, 
                    {
                        fieldLabel: 'Disabled',
                        // reference: 'userAccountIsDisabled',
                        itemId: 'isDisabled',
                        name: 'isDisabled',
                        //disabled: true,
                        xtype: 'checkboxfield'
                    },
                    
                    ]
                    
                }
                ]
            }]
        });

        me.callParent(arguments);
    },
    listeners: {
        afterrender: 'onAccountDetailsPanelRender'
    }
});