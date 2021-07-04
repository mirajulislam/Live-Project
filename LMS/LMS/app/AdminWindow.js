/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.AdminWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'admin-win',

    init : function(){
        this.launcher = {
            text: 'Admin',
            iconCls:'icon-admin-grid'
        };
        this.createGlobalStores();
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('admin-win');
        if(!win){
            win = desktop.createWindow({
                id: 'admin-win',
                title:'Administrator - ' + loginUser.firstName + ' ' + loginUser.lastName,
                width: desktop.getWidth() - 200,
                height: desktop.getHeight() - 50,
                iconCls: 'icon-admin-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        xtype: 'adminPanel'
                    }
                ]
            });
        }
        return win;
    },
    

    createGlobalStores : function(){

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration', 
            storeId: 'nConfigStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration', 
            storeId: 'gLoanTypeConfigStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration', 
            storeId: 'gCustTypeConfigStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration', 
            storeId: 'gDocConfigStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration', 
            storeId: 'gConfigurationConfigStore'
        });

       Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration',
            storeId: 'gCustTypeStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration',
            storeId: 'gLoanTypeStore'
        });

        

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.RoleModel',
            storeId: 'gRoleTypeStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.StateModel',
            storeId: 'gAssignedStateStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.StateModel',
            storeId: 'gAvailableStateStore'
        });
    }
});

