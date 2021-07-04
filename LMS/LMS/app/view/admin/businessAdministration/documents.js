Ext.define('Desktop.view.admin.businessAdministration.documents',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.documents',

    requires: [
        'Desktop.view.loan.LoanController',
        'Desktop.view.loan.LoanViewModel',
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

    reference: 'documentsTabRef',

    items:[
        {
        xtype: 'gridpanel',
        itemId: 'documentTypeGrid',
        reference: 'documentTypeGridRef',
        header: false,
        border: false,
        title: false,
        autoScroll: true,
        height: 500,
        margin: 0,
        overflowY: 'scroll',
         tbar: [{
            text: 'New',
            iconCls: 'add',
            itemId: 'addNewDocument',
            disabled: false,
            listeners : {
                click : 'onClickAddNewDocument'
            }
           },
           '-',
           {
                xtype: 'textfield',
                width: 300,
                fieldLabel: 'Grid Filter',
                labelAlign: 'right',
                labelWidth: 60,
                listeners: {
                    change: 'onGridFilterDocument'
                }
            }
        ],

        listeners: {
                itemdblclick: 'onDocumentGridItemDblClick'
        },
        store : 'gDocConfigStore',
        columns: [
            {
                header: "SL No",
                xtype: 'rownumberer',
                width: 60,
                sortable: true,
                editable: true,
                align: 'center',
                filter: {type: 'string'}
            },
            {
                header: "Document Type",
                width: 100,
                sortable: true,
                editable: true,
                dataIndex: 'value1',
                editor: 'textfield',
                reference: 'document',
                align: 'center',
                filter: {type: 'string'}
            }, {
                header: 'Is Default',
                sortable: true,
                editable: false,
                dataIndex: 'value2',
                id : 'monField',
                align: 'center',
                reference: 'isDefault',
                renderer : function(value){
                    if(value == "true"){
                        return 'Yes';
                    }
                    else{
                        return 'No';
                    }
                },
                 filter: {
                    type: 'list',
                }
                
            }, {
                header: 'Is Mandatory for all Loans',
                width:200,
                sortable: true,
                editable: true,
                align: 'center',
                dataIndex: 'value3',
                renderer : function(value){
                    if(value == "true"){
                        return 'Yes';
                    }
                    else{
                        return 'No';
                    }
                },
                filter: {type: 'list'}
            },
            {
                xtype: 'datecolumn', 
                header: "Last Modified Date",
                width: 150,
                align: 'center', 
                sortable: true,
                editable: true,
                dataIndex: 'dttMod',
                format: 'M d, Y h:i A',
                reference: 'lastModifiedDate',
                filter: {
                type: 'date'
                }
            },
            {
                header: "Last Modifier",
                width: 100,
                sortable: true,
                editable: true,
                dataIndex: 'modifiedBy',
                align: 'center', 
                editor: 'textfield',
                reference: 'lastModifiedBy',
                filter: {
                type: 'list'
                }
            },
            {
                xtype: 'actioncolumn',
                flex: 1,
                align: 'center',
                items: [
                    {
                        iconCls : 'grid-delete',
                        tooltip: 'Delete Documents',
                        reference: 'docDelRef',
                        handler: 'onDelConfig'
                    }
                ]
            }
        ]
    }],
    listeners : {
        afterrender : 'onDocumentDataShow'
    }
});
