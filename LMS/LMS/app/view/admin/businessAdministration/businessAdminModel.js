Ext.define('Desktop.view.admin.businessAdministration.businessAdminModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.admin-businessadministration-businessadmin',

    requires: [
        'Ext.data.Store',
        'Desktop.model.NConfiguration', 
    ],

    stores: {
        nConfigurationStore :{
            model: 'Desktop.model.NConfiguration', 
            storeId: 'NConfiguration'
        },
	}

});
