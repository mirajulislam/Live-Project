
Ext.define("Desktop.view.login.Login",{
    extend: "Ext.window.Window",

    requires: [
        "Desktop.view.login.LoginController",
        "Desktop.view.login.LoginModel",
        'appConstants',
        'Ext.ux.ActivityMonitor'
    ],

    controller: "login-login",
    viewModel: {
        type: "login-login"
    },

    //height: 650,
    //style: '{background-color:#ECEDEF;}',
    width: 360,
    closable: false,
    title   : 'User Login',
    closable: false,
    draggable: false,
    resizable: false,
    y: 170,
    iconCls:'icon-lock',

    layout: {
        type: 'hbox',
        align: 'middle',
        pack: 'center'
    },
    items: [
        {
            xtype: 'form',
            reference: 'loginFormRef',
            flex: 1,
            height: 160,
            maxWidth: 370,
            width: 370,
            layout: 'border',
            bodyBorder: true,
            items: [
                {
                    xtype: 'panel',
                    reference: 'loginPanelRef',
                    id:'loginPanel',
                    region: 'center',
                    margin: '5 5 5 5',
                    maxWidth: 360,
                    layout: 'form',
                    bodyStyle: "background-image:url('resources/images/desktop.gif')",
                    bind: {
                        reference: '{loginStore}'
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            height: 15
                        },
                        {
                            reference: 'uid',
                            xtype: 'textfield',
                            //maxWidth: 180,
                            //width: 100,
                            fieldLabel: 'User Name',
                            dataIndex: 'userId',
                            labelAlign: 'right',
                            labelStyle  : 'color: #fff;',
                            labelWidth: 80,
                            //value: 'SUPER1',
                            align: 'right',
                            listeners   : {
                                specialkey: 'onKeyPress'
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            height: 10
                        },
                        {
                            reference: 'pass',
                            xtype: 'textfield',
                            //width: 120,
                            fieldLabel: 'Password',
                            dataIndex: 'password',
                            labelAlign: 'right',
                            labelStyle : 'color: #fff;',
                            labelWidth: 80,
                            align: 'right',
                            inputType: 'password',
                           //value: 'SUPER1@12345',
                            listeners   : {
                                specialkey: 'onKeyPress'
                            }
                        },
                        {
                            xtype       : 'textfield',
                            reference   : 'newPassword',
                            fieldLabel  : 'New Password',
                            inputType   : 'password',
                            name        : 'password',
                            margin      : '10 0 5 0',
                            labelAlign  : 'right',
                            labelStyle  : 'color: #fff;',
                            allowBlank  : false,
                            hidden      : true,
                            enableKeyEvents: true,
                            listeners   : {
                                specialkey: 'onKeyPress'
                            }
                        },
                        {
                            xtype       : 'textfield',
                            reference   : 'confirmPassword',
                            fieldLabel  : 'Confirm Password',
                            inputType   : 'password',
                            name        : 'password',
                            margin      : '10 0 5 0',
                            labelAlign  : 'right',
                            labelStyle  : 'color: #fff;',
                            allowBlank  : true,
                            hidden      : true,
                            enableKeyEvents: true,
                            listeners   : {
                                specialkey: 'onKeyPress'
                            }
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            padding: 1,
                            items: [
                                '->',
                                {
                                    xtype: 'button',
                                    reference: 'loginBtn',
                                    icon: 'admin.png',
                                    //width: '75px',
                                    //cls: 'btn',
                                    style: 'border: groove',
                                    //ctCls: 'x-btn-over',
                                    text    : 'Login',
                                    listeners: {
                                        click: 'onLoginButtonClick'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 7
                                },
                                {
                                    xtype: 'button',
                                    //cls: 'btn',
                                    //ctCls: 'x-btn-over',
                                    //width: '75px',
                                    style: 'border: groove',
                                    icon: 'login-cancel.png',
                                    text    : 'Cancel',
                                    listeners: {
                                        click: 'onCancelButtonClick'
                                    }
                                },
                                {
                                    xtype: 'tbspacer',
                                    width: 7
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
