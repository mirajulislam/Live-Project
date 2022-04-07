Ext.define('Desktop.AtmDisputeWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'dispute-win',

    init : function(){
        this.launcher = {
            text: 'Atm-Dispute',
            iconCls:'icon-dispute-grid'
        };
        this.createGlobalStores();
    },
    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('dispute-win');
        if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }
        if(!win){
            win = desktop.createWindow({
                id: 'dispute-win',
                title:'Atm-Dispute - ' + loginUser.firstName + ' ' + loginUser.lastName,
                width: desktop.getWidth() - 200,
                height: desktop.getHeight() - 50,
                iconCls: 'icon-dispute-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        xtype: 'disputePanel'
                    }
                ]
            });
        }
        return win;
    },
    createGlobalStores : function(){
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AtmDisputeView',
            storeId: 'gAtmDisputeViewStore'
        });
    }
});