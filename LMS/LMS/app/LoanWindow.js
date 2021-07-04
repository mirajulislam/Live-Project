/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.LoanWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'loan-win',

    init : function(){
        this.launcher = {
            text: 'Loan',
            iconCls:'icon-loan-grid'
        };
        this.createGlobalStores();
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('loan-win');
        if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }
        if(!win){
            win = desktop.createWindow({
                id: 'loan-win',
                title:'Loan - ' + loginUser.firstName + ' ' + loginUser.lastName,
                width: desktop.getWidth() - 200,
                height: desktop.getHeight() - 50,
                iconCls: 'icon-loan-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        xtype: 'loanPanel'
                    }
                ]
            });
        }
        return win;
    },

    createGlobalStores : function(){

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration',
            storeId: 'gCustTypeStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration',
            storeId: 'gLoanTypeStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCibStatusCommentStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gAnalystCommentStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gExceptionDetailStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gIns2CADStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCmntJustificationStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCmntWaiverSoughtStore'
        });        

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gSourceRecmndStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gBranchRecmndStore'
        });
        
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.ExistingLiabilitiesModel',
            storeId: 'gExistingLiabilitiesStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanDocument',
            storeId: 'gLoanDocumentStore',
            sorters: [{
                property: 'docType',
                direction: 'ASC'
            }]
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanGridViewModel',
            storeId: 'gLoanGridViewStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanGroupGridViewModel',
            storeId: 'gLoanGroupGridViewStore',
            groupField:'loanGroupId',
            groupDir: 'DESC',
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCmntOfActionStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gQueryCmntStore'
        });
        
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LegalEntity',
            storeId: 'gLegalEntityStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.SourceModel',
            storeId: 'gSourceStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanGridViewModel',
            storeId: 'gWorkHistoryGridViewStore'
        });
        
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.LoanGroupGridViewModel',
            storeId: 'gAddToLoanGroupGridViewStore',
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Notes',
            storeId: 'gNotesStore'
        });
    }
});

