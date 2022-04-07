/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.CardWindow', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer'
    ],

    id:'card-win',

    init : function(){
        this.launcher = {
            text: 'Card',
            iconCls:'icon-card-grid'
        };
        this.createGlobalStores();
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('card-win');
        if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }
        if(!win){
            win = desktop.createWindow({
                id: 'card-win',
                title:'Card - ' + loginUser.firstName + ' ' + loginUser.lastName,
                width: desktop.getWidth() - 200,
                height: desktop.getHeight() - 50,
                iconCls: 'icon-card-grid',
                animCollapse:false,
                constrainHeader:true,
                layout: 'fit',
                items: [
                    {
                        xtype: 'cardPanel'
                    }
                ]
            });
        }
        return win;
    },

    createGlobalStores : function(){
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration',
            storeId: 'gCardTypeStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.CardGridView',
            storeId: 'gCardGridViewStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.NConfiguration',
            storeId: 'gCustTypeStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Document',
            storeId: 'gCardDocumentStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCmntJustificationStoreCard'
        }); 
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gAnalystCommentStoreCard'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gExceptionDetailStoreCard'
        });  
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gIns2CADStoreCard'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCibStatusCommentStoreCard'
        }); 
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Notes',
            storeId: 'gCardNotesStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCardQueryCmntStore'
        }); 
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCardCmntOfActionStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.ExistingLiabilitiesModel',
            storeId: 'gExistingLiabilitiesStoreCard',
            groupField: 'groupName',
            groupDir: 'ASC',

        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.CardGridView',
            storeId: 'gCardWorkHistoryGridStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.CardGridView',
            storeId: 'gCardGroupGridViewStore',
            groupField:'cardGroupId',
            groupDir: 'DESC',
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.CardGridView',
            storeId: 'gAddToCardGroupGridViewStore',
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Comment',
            storeId: 'gCmntDeviationsStore',
        }); 
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.SourceModel',
            storeId: 'gCardSourceStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AcquisitionDetailsConfig',
            storeId: 'gPriviousOrganizationStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AcquisitionDetailsConfig',
            storeId: 'gOthersBankLiabilityStore'
        });
        
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AcquisitionDetailsConfig',
            storeId: 'gAboutOtherBankDetailsStore'
        });

        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AcquisitionDetailsConfig',
            storeId: 'gSecurityDetailsStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AcquisitionDetailsConfig',
            storeId: 'gCompaniesUderOwnershipStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.DuplicationGridModel',
            storeId: 'gCardDublicationGridStore'
        });    
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.CibStatusModel',
            storeId: 'gCibCardStatusStore'
        });  
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.AcquisitionViewModel',
            storeId: 'gAcquisitionViewStore'
        });
        Ext.create('Ext.data.Store', {
            model: 'Desktop.model.Document',
            storeId: 'gAttachmentCardDocumentStore'
        });
    }
});

