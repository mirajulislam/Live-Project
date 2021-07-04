/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.Profile', {
    extend: 'Ext.window.Window',

    uses: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Border',

        'Ext.ux.desktop.Wallpaper',

        'Desktop.model.Wallpaper'
    ],

    layout: 'anchor',
    title: 'User - ',
    modal: true,
    width: 700,
    height: 480,
    border: false,

    initComponent: function () {
        var me = this;

        me.userPanel = Ext.create('Desktop.view.admin.userAccountDetailsForm');
        me.userPanel.setTitle('User Details');
        me.userPanel.closable = false;

        me.buttons = [
            { text: 'OK', handler: me.onOK, scope: me },
            { text: 'Close', handler: me.close, scope: me }
        ];

        if(loginUser){
            me.userPanel.down('#btnSave').hide();
            me.userPanel.down('#btnCancel').hide();

            me.userPanel.down('#isLdapUser').hide();

            me.userPanel.down('#isDisabled').hide();

            me.userPanel.down('#unId').setReadOnly(true);
            me.userPanel.down('#firstName').setReadOnly(true);
            me.userPanel.down('#lastName').setReadOnly(true);
            me.userPanel.down('#userAlias').setReadOnly(true);
            me.userPanel.down('#isAllowLogin').setReadOnly(true);           

            me.userPanel.down('#unId').setValue(loginUser.unId);
            me.userPanel.down('#firstName').setValue(loginUser.firstName);
            me.userPanel.down('#lastName').setValue(loginUser.lastName);
            me.userPanel.down('#userAlias').setValue(loginUser.userAlias);
            me.userPanel.down('#email').setValue(loginUser.email);
            me.userPanel.down('#isAllowLogin').setValue(loginUser.isAllowLogin);
            me.userPanel.down('#id').setValue(loginUser.id);
            me.userPanel.down('#userVersion').setValue(loginUser.userVersion);

        }

        me.items = [
            {
                anchor: '0 -30',
                border: false,
                layout: 'border',
                items: [
                    {
                        xtype: 'panel',
                        region: 'center',
                        layout: 'fit',
                        items: [ me.userPanel ]
                    }
                ]
            },
            {
                xtype: 'button',
                margin: '4px 0px 0px 583px',
                text: 'Change Password',
                scope: me,
                handler : me.onChangePassword
            }
        ];

        me.callParent();
    },

    onOK: function () {
        var me = this;

        me.destroy();
    },

    onChangePassword : function(){
        var me = this;

        Ext.create('Ext.form.Panel', {
            width: 350,
            height: 160,
            reference: 'changePasswordPanel',
            title: 'Change Password',
            bodyStyle: "background-image:url('resources/images/desktop.gif')",
            floating: true,
            closable : true,
            layout: 'form',
            margin: '10 10 10 10',
            items: [
                {
                    itemId: 'oldPasswordRef',
                    xtype: 'textfield',
                    //width: 120,
                    fieldLabel: 'Old Password',
                    dataIndex: 'password',
                    labelAlign: 'right',
                    labelStyle : 'color: #fff;',
                    labelWidth: 80,
                    align: 'right',
                    inputType: 'password',
                    listeners   : {
                        specialkey: me.onKeyPress
                    }
                },
                {
                    xtype       : 'textfield',
                    itemId      : 'newPasswordRef',
                    fieldLabel  : 'New Password',
                    inputType   : 'password',
                    name        : 'password',
                    margin      : '10 0 5 0',
                    labelAlign  : 'right',
                    labelStyle  : 'color: #fff;',
                    allowBlank  : false,
                    hidden      : false,
                    enableKeyEvents: true,
                    listeners   : {
                        specialkey: me.onKeyPress
                    }
                },
                {
                    xtype       : 'textfield',
                    itemId      : 'confirmPasswordRef',
                    fieldLabel  : 'Confirm Password',
                    inputType   : 'password',
                    name        : 'password',
                    margin      : '10 0 5 0',
                    labelAlign  : 'right',
                    labelStyle  : 'color: #fff;',
                    allowBlank  : false,
                    hidden      : false,
                    enableKeyEvents: true,
                    listeners   : {
                        specialkey: me.onKeyPress
                    }
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    padding: 1,
                    items: [
                        {
                            xtype: 'tbspacer',
                            width: 150
                        },
                        {
                            xtype: 'button',
                            reference: 'savePasswordBtn',
                            //icon: 'admin.png',
                            width: '75px',
                            //cls: 'btn',
                            style: 'border: groove',
                            //ctCls: 'x-btn-over',
                            text    : '<div style="margin-left:0px">Save</div>',
                            listeners: {
                                click: me.onChangePasswordBtnPress
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            //cls: 'btn',
                            //ctCls: 'x-btn-over',
                            width: '75px',
                            style: 'border: groove',
                            //icon: 'login-cancel.png',
                            text    : '<div style="margin-left:0px">Cancel</div>',
                            listeners: {
                                click: function (){
                                    this.up('panel').close();
                                }
                            }
                        }
                    ]
                }
            ]
        }).show();

    },

    onKeyPress: function(field, e){
        var me = this;

        if (e.getKey() == e.ENTER) {
            // me.onChangePasswordBtnPress(field, e);
        }
        else if(e.getKey() == e.TAB){
            e.stopEvent();
            field.nextSibling().focus();
        }
    },

    onChangePasswordBtnPress: function (field, e){

        var me = this;

        var password = me.up('panel').down('#oldPasswordRef').getValue();
        var newPassword = me.up('panel').down('#newPasswordRef').getValue();
        var confirmPassword = me.up('panel').down('#confirmPasswordRef').getValue();

        if(password != loginUser.password){
            Ext.MessageBox.alert('Error', 'Old Password is not correct.');
            return;
        }
        else if(newPassword != confirmPassword){
            Ext.MessageBox.alert('Error', 'Your new password and confirmation password do not match');
            return;
        }
        else if(newPassword.toUpperCase() == password.toUpperCase()){
            Ext.MessageBox.alert('Error', 'Your new password can not be same as old password');
            return;
        }
        else if(newPassword.length < 8){
            Ext.MessageBox.alert('Error', 'Your new password length must be minimum 8 characters');
            return;
        }
        else if(newPassword.search(/\d/) == -1){
            Ext.MessageBox.alert('Error', 'Your new password must have atleast one number');
            return;
        }
        else if(newPassword.search(/[A-Z]/) == -1){
            Ext.MessageBox.alert('Error', 'Your new password must have atleast one capital letter');
            return;
        }
        else if(newPassword.search(/[\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) == -1){
            Ext.MessageBox.alert('Error', 'Your new password must have atleast one special character');
            return;
        }


        // SEND REQ TO MT FOR UPDATING PASSWORD
        var headerInfo = {
                objectType   : 'USER',
                actionType   : 'UPDATE_PASSWORD',
        };

        var payLoadInfo = [{
            unId                : loginUser.unId,
            id                  : loginUser.id,
            userVersion         : loginUser.userVersion,
            password            : password,
            newPassword         : newPassword
        }];

        var jsonObj = {
                header  : headerInfo,
                payLoad : payLoadInfo
        };
        // if(logInUser){
        if(loginUser){
           // jsonObj.headerInfo.senderId = loginUser.id;
            jsonObj.header.senderId = loginUser.id;
        }
        jsonObj.header.source = 'nSCREEN';
        var jsonString = JSON.stringify(jsonObj, replacer);

        showProcessMessage('Processing...');

        Ext.Ajax.request({
            url     : LOGIN_URL,
            method  : 'POST',
            params  : jsonString,
            success : function(result, request){

                var message = eval("(" + result.responseText + ")");

                if(message.header.objectType == 'MULTI'){
                    for(var i = 0; i < message.payLoad.length; i++){
                        var responseData;
                        if(typeof(message.payLoad[i]) === 'object'){
                            responseData = message.payLoad[i];
                        } else {
                            responseData = eval("(" + message.payLoad[i] + ")");
                        }
                        if(responseData.header.objectType == appContentType.CONTENT_TYPE_STATUS){

                            if(responseData.payLoad[0].status == 'OK'){

                                me.up('panel').close();

                                Ext.MessageBox.alert('Status',"Password Updated Successfully. Please re login.");

                                javascript:document.location.reload();
                            }
                            else {

                                var msg;

                                if(responseData.payLoad[0].message){
                                   msg = responseData.payLoad[0].message;
                                }
                                else {
                                   msg = 'Failed to update password.'
                                }

                                Ext.MessageBox.alert('Status', msg);
                            }
                        }
                    }
                }
            },
            failure : function(result, request){
                Ext.MessageBox.alert('Server Error',"Password Update Failed.");
            }
        });

    }
});
