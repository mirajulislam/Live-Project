/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.ExecutiveDashboardWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Desktop.model.DashboardDetailsView'
    ],

    id:'executive-dashboard-win',

    init : function(){
        this.launcher = {
            text: 'Executive Dashboard',
            iconCls:'dashboard-shortcut',
        };
        this.createGlobalStores();
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('executive-Dashboard-win');
        if(!loginUser){
            loginUser = gLoginUuser;
        }
        if(!win){
            win = desktop.createWindow({
                id: 'executive-Dashboard-win',
                title:'Executive Dashboard - ' + loginUser.firstName + ' ' + loginUser.lastName,
                width: desktop.getWidth() - 200,
                height: desktop.getHeight() - 50,
                iconCls: 'dashboard-shortcut',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                closable: true,
                draggable: true,
                resizable: true,
                items: [
                    {
                        xtype: 'executiveDashboard'
                    }
                ]
            });
        }
        win.show ();
        return win;
    },


     createGlobalStores : function(){
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.ExecutiveDashboard',

            storeId: 'gUserWiseOnProcess'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.ExecutiveDashboard',
            storeId: 'gUserWiseFileReceived'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.OnProcessPpc',

            storeId: 'gPpcUserWiseOnProcess'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.StatusWiseLoanCount',
            storeId: 'gStatusWiseLoanCount'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.DepartmentWiseLoanCount',
            storeId: 'gDepartmentWiseLoanCount'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.DashboardDetailsView',
            storeId: 'gDashboardDetailsViewGridStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.CustomerModel',
            storeId: 'gCustomerStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.DashboardStatus',
            storeId: 'gDashboardStatusStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanCountDateWise',
            storeId: 'gLoanCountDateWiseStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanStatusDeptWise',
            storeId: 'gLoanStatusDeptWiseStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanTrackerDepartmentWise',
            storeId: 'gLoanTrackerDepartmentWise'
        });

        // Ext.create('Ext.data.Store', {
        //     model: 'Desktop.model.LegalEntity',
        //     storeId: 'gLegalEntityStore'

        // });
     },

});

/*Create store for immidiate executive dashboard show after login*/
/*function ececutiveDashboardGlobalStores(){
    Ext.create('Ext.data.Store', {
        model: 'Desktop.model.ExecutiveDashboard',
        storeId: 'gUserWiseOnProcess'
    });

    Ext.create('Ext.data.Store', {
        model: 'Desktop.model.ExecutiveDashboard',
        storeId: 'gUserWiseFileReceived'
    });

    Ext.create('Ext.data.Store', {
        model: 'Desktop.model.StatusWiseLoanCount',
        storeId: 'gStatusWiseLoanCount'
    });

    Ext.create('Ext.data.Store', {
        model: 'Desktop.model.DepartmentWiseLoanCount',
        storeId: 'gDepartmentWiseLoanCount'
    });

    Ext.create('Ext.data.Store', {
        model: 'Desktop.model.LegalEntity',
        storeId: 'gLegalEntityStore'
    });
}*/