Ext.define('Desktop.view.admin.businessAdministration.addNewConfigurationPopup', {
    extend : 'Ext.panel.Panel',
    title : "New Entity",
	requires: [
        'Desktop.view.admin.businessAdministration.businessAdminController',
        'Desktop.view.admin.businessAdministration.businessAdminModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Boolean',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Text',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.filters.filter.Number',
        'Ext.grid.column.Date',
        'Ext.grid.filters.filter.Date',
        'Ext.grid.filters.filter.String',
        'Ext.grid.filters.filter.Boolean',
        'Ext.selection.CheckboxModel',
        'Ext.grid.filters.Filters',
        'Ext.grid.feature.Summary',
    ],

    controller: 'admin-businessadministration-businessadmin',

    closable : true,
    floatable : true,
    floating : true,
    draggable : true,
    modal: true,
    width : 300,
	modal : true,
    items : [
    	{
			xtype : "panel",
			name : 'lsPanel',
			width : 300,
			items:[
                {
                    xtype: 'form',
                    width: 300,
                    autoScroll: false,
                    header: false,
                    title: 'My Form',
                    modal: true,
                    items: [
                        {
                        	border:false,
                            xtype: 'panel',
                            layout : 'center',
                            items:[
                            	{	
	                                columnWidth:1,
	                                layout: 'column',
	                                padding: '10 10 10 10',
	                                items: [ 
	                                	{   xtype: 'textfield',
                                        	hidden  :  true,   
                                        	dataIndex: 'configurationId', 
                                        	reference: 'configurationIdRef',                
                                    	},
                                    	{   xtype: 'textfield',
                                        	hidden  :  true,    
                                        	dataIndex: 'configurationVer', 
                                        	reference: 'configurationVerRef',                
                                   		},
	                                    {
											xtype: 'textfield',
											fieldLabel: 'Group',
											margin: '10 10 10 10',
											reference: 'group',
											columnWidth:1,   
											labelAlign: 'left',
											labelWidth: 90,
	                                    },
	                                    {
                                            xtype: 'textfield',
                                            fieldLabel: 'Sub Group',
                                            margin: '10 10 10 10',
                                            reference: 'subgroup',
                                            columnWidth:1,   
                                            labelAlign: 'left',
                                            labelWidth: 90,
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Name',
                                            margin: '10 10 10 10',
                                            reference: 'name',
                                            columnWidth:1,   
                                            labelAlign: 'left',
                                            labelWidth: 90,
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Value1',
                                            margin: '10 10 10 10',
                                            reference: 'value1',
                                            columnWidth:1,   
                                            labelAlign: 'left',
                                            labelWidth: 90,
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Value2',
                                            margin: '10 10 10 10',
                                            reference: 'value2',
                                            columnWidth:1,   
                                            labelAlign: 'left',
                                            labelWidth: 90,
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Value3',
                                            margin: '10 10 10 10',
                                            reference: 'value3',
                                            columnWidth:1,   
                                            labelAlign: 'left',
                                            labelWidth: 90,
                                        },,                                    	                                    
                                	]
                                	
								    }]
								},
								{
								   buttonAlign: 'center',
								   border : 0,
								   buttons: [{
								     xtype: 'button',
								     formBind: true,
								     itemId: 'btnLogin',
								     text: 'Save',
								     reference:'configurationBtnRef',
								     listeners: {
					                         click: 'onClickSaveNewConfiguration'
					                     },
								   }]                    
								}
                            ]
                    	}
                    ]
                }
            ]
       
});
