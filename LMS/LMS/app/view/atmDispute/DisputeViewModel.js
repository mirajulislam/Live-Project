Ext.define('Desktop.view.atmDispute.DisputeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.atmDisputeController',

    requires: [
        'Ext.data.Store',
        'Desktop.model.AtmDispute',
        'Desktop.model.AtmDisputeView',
    ]

});