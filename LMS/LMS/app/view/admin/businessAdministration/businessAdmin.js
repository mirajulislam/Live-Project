
Ext.define('Desktop.view.admin.businessAdministration.businessAdmin',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.businessAdmin',

	requires: [
		'Desktop.view.admin.businessAdministration.businessAdminController',
		'Desktop.view.admin.businessAdministration.businessAdminModel'
	],

	controller: 'admin-businessadministration-businessadmin',
	viewModel: {
		type: 'admin-businessadministration-businessadmin'
	},
	margin: 0,
	border: false,
	items:[
		{
			xtype: 'panel',
			tabPosition : 'top',
			margin: 0,
			border: false,
			items: 
			[
				{
					xtype: 'tabpanel',
					reference: 'bizAdminTabPanel',
					margin: 0,
					border: false,
					items:[
						{
							xtype: 'loanConfig',
							title: 'Loan Configuration'
						},
						{
							xtype: 'documents',
							title: 'Documents',
						},
						{
							xtype: 'loanTypes',
							title: 'Loan Types',
						},
						{
							xtype: 'customerTypes',
							title: 'Customer Types',
  						},
                        {
                            xtype: 'configuration',
                            title: 'Configuration',
						},
                        {
                            xtype: 'roleToStateMap',
                            title: 'Role To State Map',
						}
						
					],
					listeners:{
						tabchange:'onBusinessAdminTabChange',
						afterrender: 'onActiveBusinessAdmin'
					},
				}
			]
		}
	]
});
