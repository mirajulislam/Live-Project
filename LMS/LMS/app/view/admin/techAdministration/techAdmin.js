
Ext.define('Desktop.view.admin.techAdministration.techAdmin',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.techAdmin',

    requires: [
        'Desktop.view.admin.techAdministration.techAdminController',
        'Desktop.view.admin.techAdministration.techAdminModel'
    ],

    controller: 'admin-techadministration-techadmin',
    viewModel: {
        type: 'admin-techadministration-techadmin'
    },

    html: 'Hello, World!!'
});
