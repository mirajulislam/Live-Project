Ext.define('Desktop.view.admin.businessAdministration.addNewDocumentPopup', {
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

    itemId : 'ofacEntitytMainPanel',
    closable : true,
    floatable : true,
    floating : true,
    draggable : true,
    modal: true,
    width : 550,
	height : 180,
	modal : true,
    items : [
    	{
			xtype : "panel",
			name : 'lsPanel',
			itemId : 'ofacWhiteListFormDetailsPanel',
			width : 550,
			items:[
                {
                    xtype: 'form',
                    width: 550,
                    autoScroll: false,
                    header: false,
                    title: 'My Form',
                    modal: true,
                    items: [
                        {
                        	border:false,
                            xtype: 'panel',
                            height: 120,
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
											fieldLabel: 'Document Type',
											margin: '10 10 10 10',
											reference: 'documentType',
											columnWidth:.42,   
											labelAlign: 'left',
											labelWidth: 90,
	                                    },
	                                    {
	                                        xtype: 'checkbox',
	                               		 	boxLabel: 'Is Default',
	                                		name: 'isDefault',
	                                		columnWidth:.15,
	                                		reference: 'isDefault',
	                                		labelAlign: 'left',
											labelWidth: 20,
											margin: '10 10 0 0',
	                                    },
	                                    {
	                                        xtype: 'checkbox',
	                               		 	boxLabel: 'Mandatory for all Loans',
	                                		name: 'mandatoryForAllLoan',
	                                		columnWidth:.32,
	                                		reference: 'mandatoryForAllLoan',
	                                		labelAlign: 'left',
											labelWidth: 50,
											margin: '10 10 0 0',
	                                    }	                                    	                                    
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
								     reference:'documentBtnRef',
								     listeners: {
					                         click: 'onClickSaveNewDocument'
					                     },
								   }]                    
								}
                            ]
                    	}
                    ]
                }
            ]
       
});
