Ext.define('Desktop.view.admin.businessAdministration.configuration',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.configuration',

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
        'Ext.grid.RowNumberer',
    ],

    controller: 'admin-businessadministration-businessadmin',

    reference: 'configurationTabRef',

    items:[
        {
        xtype: 'gridpanel',
        itemId: 'configurationGrid',
        reference: 'configurationGridRef',
        header: false,
        border: false,
        title: false,
        autoScroll : true,
		scrollable : true,
		height: 510,
        // dockedItems: [{
        //             xtype: 'panel',
        //             dock: 'top',
        //             itemId: 'loanSearchItemProperties',
        //             layout: 'column',
        //             collapseDirection: 'top',
        //             collapsed: false,
        //             collapsible: true,
        //             title: 'Search',
        //             dockedItems: [{
        //                 xtype: 'toolbar',
        //                 dock: 'bottom',
        //                 shadow: true,
        //                 itemId: 'loanSearchTollbar',
        //                 layout: {
        //                     type: 'hbox',
        //                     align: 'middle',
        //                     pack: 'center'
        //                 },
        //                 items: [{
        //                         xtype: 'button',
        //                         padding: 2,
        //                         text: 'Search',
        //                         listeners: {
        //                             click: 'onClickAllConfigSearch'
        //                         }
        //                     },
        //                     {
        //                         xtype: 'button',
        //                         padding: 3,
        //                         text: 'Clear',
        //                         listeners: {
        //                             click: 'onClickSearchClear'
        //                         }
        //                     }
        //                 ]
        //             }],
        //             items: [
        //                 {
        //                     xtype: 'textfield',
        //                     itemId: 'groupSearch',
        //                     reference: 'groupSearch',
        //                     fieldLabel: 'Group',
        //                     columnWidth: .25,
        //                     labelAlign: 'left',
        //                     labelWidth: 68,
        //                     margin : '5 5 5 15',
        //                     listeners   : {
        //                         specialkey: 'onKeyPress'
        //                     }
        //                 },
        //                 {
        //                     xtype: 'textfield',
        //                     itemId: 'subgroupSearch',
        //                     reference: 'subgroupSearch',
        //                     fieldLabel: 'SubGroup',
        //                     columnWidth: .25,
        //                     labelAlign: 'left',
        //                     labelWidth: 50,
        //                     margin : '5 5 5 5',
        //                     listeners   : {
        //                         specialkey: 'onKeyPress'
        //                     }
        //                 },
        //                 {
        //                     xtype: 'textfield',
        //                     itemId: 'nameSearch',
        //                     reference: 'nameSearch',
        //                     fieldLabel: 'Name',
        //                     columnWidth: .25,
        //                     labelAlign: 'right',
        //                     labelWidth: 40,
        //                     margin : '5 5 5 5',
        //                     listeners   : {
        //                         specialkey: 'onKeyPress'
        //                     }
        //                 },
        //                 {
        //                     xtype: 'textfield',
        //                     itemId: 'value1Search',
        //                     reference: 'value1Search',
        //                     fieldLabel: 'value1',
        //                     columnWidth: .25,
        //                     labelAlign: 'right',
        //                     labelWidth: 40,
        //                     margin : '5 5 5 5',
        //                     listeners   : {
        //                         specialkey: 'onKeyPress'
        //                     }
        //                 },
        //                 {
        //                     xtype: 'textfield',
        //                     itemId: 'value2Search',
        //                     reference: 'value2Search',
        //                     fieldLabel: 'value2',
        //                     columnWidth: .25,
        //                     labelAlign: 'right',
        //                     labelWidth: 40,
        //                     margin : '5 5 5 15',
        //                     listeners   : {
        //                         specialkey: 'onKeyPress'
        //                     }
        //                 },
        //                 {
        //                     xtype: 'textfield',
        //                     itemId: 'value3Search',
        //                     reference: 'value3Search',
        //                     fieldLabel: 'value3',
        //                     columnWidth: .25,
        //                     labelAlign: 'right',
        //                     labelWidth: 40,
        //                     margin : '5 5 5 5',
        //                     listeners   : {
        //                         specialkey: 'onKeyPress'
        //                     }
        //                 },
        //             ]
        //         }],
         tbar: [
            {
                text: 'New',
                iconCls: 'add',
                itemId: 'addNewDocument',
                disabled: false,
                listeners : {
                click : 'onClickAddNewConfiguration'
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
                    change: 'onGridFilterConfiguration'
                }
            },
            '->',
            {
                xtype : 'button',
                text : 'Refetch',
                iconCls: 'icon-refresh',
                tooltip: 'Refresh Data',
                reference: 'configurationRefetchBtn',
                itemId: 'configurationRefetchBtn',
                align: 'right',
                margin: '0 15 0 0',
                listeners : {
                    click : 'onClickConfigurationRefetch'
                }
            }
        ],

        listeners: {
                itemdblclick: 'onConfigurationDblClick'
        },
        store : 'gConfigurationConfigStore',
        viewConfig: {
            stripeRows: true,
            enableTextSelection: true,
        },
        features: [
            {
               ftype: 'grouping',
               groupHeaderTpl: '{name} ({children.length})',
               enableNoGroups:true
            }
        ],
        columns: [
            {
                header: "SL No",
                xtype: 'rownumberer',
                width: 60,
                sortable: true,
                editable: true,
                align: 'center'
            },
            {
                header: "Type",
                width: 100,
                sortable: true,
                editable: true,
                align: 'center', 
                dataIndex: 'group',
                editor: 'textfield',
                reference: 'group',
                filter:{
                    type: 'list'
                }
            },
            {
                header: "Sub Group",
                width: 120,
                sortable: true,
                editable: true,
                align: 'center', 
                dataIndex: 'subGroup',
                editor: 'textfield',
                reference: 'subGroup',
                filter:{
                    type: 'list'
                }
            },
            {
                header: "Name",
                width: 150,
                sortable: true,
                editable: true,
                align: 'center', 
                dataIndex: 'name',
                editor: 'textfield',
                reference: 'name',
                filter: {type: 'string'},
                listeners   : {
                    specialkey: 'onKeyPress'
                }
            },
            {
                header: 'Value1',
                width: 200,
                sortable: true,
                editable: false,
                align: 'center', 
                dataIndex: 'value1',
                reference: 'value1',
                filter: {type: 'string'},
                listeners   : {
                    specialkey: 'onKeyPress'
                }
            },
            {
                header: 'Value2',
                width:200,
                sortable: true,
                editable: true,
                align: 'center', 
                dataIndex: 'value2',
                reference: 'value2',
                filter: {type: 'string'},
                listeners   : {
                    specialkey: 'onKeyPress'
                }
            },
            {
                header: 'Value3',
                width:200,
                sortable: true,
                editable: true,
                align: 'center', 
                dataIndex: 'value3',
                reference: 'value3',
                filter: {type: 'string'}
            },
            {
                xtype: 'actioncolumn',
                flex: 1,
                align: 'center',
                iconCls : 'grid-delete',
                tooltip: 'Delete Configuration',
                reference: 'configurationDelRef',
                handler: 'onDelConfig'
            }
        ]
    }],
    listeners : {
        afterrender : 'onConfigurationDataShow'
    }
});
