
Ext.define('Desktop.view.admin.naztechAdministration.naztechAdmin',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.naztechAdmin',

    requires: [
        'Desktop.view.admin.naztechAdministration.naztechAdminController',
        'Desktop.view.admin.naztechAdministration.naztechAdminModel'
    ],

    controller: 'admin-naztechadministration-naztechadmin',
    viewModel: {
        type: 'admin-naztechadministration-naztechadmin'
    },

    items: [
                     {
                             xtype: 'panel',
                             region: 'center',
                             layout: 'fit',
                             title: 'Tech Admin Home',
                             items: [
                                    {
                                        xtype: 'tabpanel',
                                        // height: 470,
                                        itemId: 'techAdminMainTabPanel',
                                        headerPosition: 'bottom',
                                        overlapHeader: false,
                                        //activeTab: 0,
                                        tabPosition: 'bottom',
                                        //reference: 'techAdminMainTab',
                                        items: [
                                            {
                                                xtype: 'panel',
                                                itemId: 'userAccountTabPanel',
                                                layout: 'fit',
                                                title: 'User Accounts',
                                                reference: 'userAccount',
                                                tabConfig: {
                                                                xtype: 'tab',
                                                                id: 'userAccountTabPanelId',
                                                                itemId: 'userAccountTabPanel'
                                                            },
                                                items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    height: 100,
                                                    //itemId: 'userAccountSearchTabPanel',
                                                    reference: 'userAccountMain',
                                                    tabConfig: {
                                                            //xtype: 'tab',
                                                            id: 'userAccountSearchTabPanelId',
                                                            itemId: 'userAccountSearchTabPanel'
                                                        },
                                                   activeTab: 0,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            itemId: 'userAccountSearchGridPanel',
                                                            layout: 'border',
                                                            title: 'User Search',   
                                                            tabConfig: {
                                                                        xtype: 'tab',
                                                                        id: 'userAccountSearchGridPanelId',
                                                                        itemId: 'userAccountSearchGridPanel'
                                                                    },
                                                             items: [
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    itemId: 'userSearchMainGrid',
                                                                    reference : 'userAccountMainGrid',
                                                                    header: false,
                                                                    region: 'center',
                                                                      viewConfig: {
                                                                        stripeRows: true,
                                                                        enableTextSelection: true,
                                                                        getRowClass: function(record)
                                                                        {
                                                                             if(record.get('isLoggedIn') === 1) {
                                                                                return 'logged';
                                                                             } 
                                                                             else if(record.get('isAllowLogin') === 0) {
                                                                                return 'hit';
                                                                             } else
                                                                             {
                                                                                return 'not-hit';
                                                                             }
                                                                        }/*,
                                                                        listeners:
                                                                        {
                                                                            cellclick: 'onClickLogoutLink'
                                                                        }*/
                                                                    },
                                                                      bind : {
                                                                        // store : '{adminAccountStore}'
                                                                    },
                                                                    title: 'User Search',
                                                                    listeners: {
                                                                        itemdblclick: 'onUserSearchGridItemDblClick',
                                                                        //itemclick: 'onUserGrdSel',
                                                                        itemcontextmenu: 'onUserGrdSelContxt',
                                                                    },
                                                                    plugins: [
                                                                        {
                                                                            ptype: 'gridfilters'
                                                                        }
                                                                    ],
                                                                    columns: [
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'ID', 
                                                                            width       : 250, 
                                                                            sortable    : false, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'id', 
                                                                            hidden      : true
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Logged In', 
                                                                            width       : 100, 
                                                                            sortable    : true, 
                                                                            align       : 'center',
                                                                            dataIndex   : 'isLoggedIn', 
                                                                            filter      : {type :'list'},
                                                                            renderer    : function(value, meta) {
                                                                                if (value == 1) {
                                                                                    return '<a href="#"><font color="228B22">'+ 'Yes' +'</font></a>';
                                                                                }
                                                                                else{
                                                                                    return 'No';
                                                                                }
                                                                            },
                                                                        },
                                                                        { 
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Branch Id', 
                                                                            width       : 80, 
                                                                            sortable    : false, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'legalEntityId', 
                                                                            hidden      : false,
                                                                            filter      : {
                                                                                           type :'string'
                                                                                       }
                                                                        },
                                                                        { 
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Branch Name', 
                                                                            width       : 120, 
                                                                            sortable    : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'legalEntityType', 
                                                                            hidden      : false,
                                                                            filter      : {type :'string'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'USER ID', 
                                                                            width       : 120, 
                                                                            sortable    : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'unId', 
                                                                            hidden      : false, 
                                                                            filter      : {type: 'string'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'First Name', 
                                                                            width       : 120, 
                                                                            sortable    : true, 
                                                                            align       : 'left', 
                                                                            dataIndex   : 'firstName', 
                                                                            filter      : {type: 'string'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Last Name', 
                                                                            width       : 120, 
                                                                            sortable    : true, 
                                                                            align       : 'left', 
                                                                            dataIndex   : 'lastName',
                                                                            filter      : {type: 'string'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'User Alias', 
                                                                            width       : 120, 
                                                                            sortable    : true, 
                                                                            align       : 'left', 
                                                                            dataIndex   : 'userAlias', 
                                                                            filter      : {type: 'string'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Email', 
                                                                            width       : 120, 
                                                                            sortable    : true, 
                                                                            align       : 'left', 
                                                                            dataIndex   : 'email', 
                                                                            filter      : {type: 'string'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Version', 
                                                                            width       : 80, 
                                                                            sortable    : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'userVersion', 
                                                                            hidden      : false,
                                                                            filter      : {type :'list'}
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Modified Date',
                                                                            width       : 150, 
                                                                            sortable    : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'dateModified',
                                                                            filter      : {type: 'date'}, 
                                                                            renderer : Ext.util.Format.dateRenderer('M d, Y g:i A')
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Modified By.', 
                                                                            width       : 140, 
                                                                            sortable    : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'modifiedBy', 
                                                                            hidden      : false,
                                                                            filter      : {type: 'string'}
                                                                        },
                                                                        /*{
                                                                            xtype       : 'gridcolumn',
                                                                            text        : 'Group', 
                                                                            width       : 100, 
                                                                            sortable    : false, 
                                                                            align       : 'left', 
                                                                            dataIndex   : 'userGroup', 
                                                                            hidden      : false,
                                                                            filter      : { type: 'string'}
                                                                        },*/
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Status', 
                                                                            width       : 100, 
                                                                            sortable    : false, 
                                                                            align       : 'left', 
                                                                            dataIndex   : 'isAllowLogin', 
                                                                            hidden      : false,
                                                                            filter      : {type: 'string'},
                                                                            renderer    : function(value, meta) {
                                                                                if (value == 1) {
                                                                                    return '<a href="#"><font color="228B22">'+ 'Approved' +'</font></a>';
                                                                                }
                                                                                else{
                                                                                    return 'Pend_Approve';
                                                                                }
                                                                            },
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'In Vacation?', 
                                                                            width       : 100, 
                                                                            sortable    : true, 
                                                                            align       : 'center',
                                                                            dataIndex   : 'isInVacation', 
                                                                            hidden      : false,
                                                                            filter      : {type : 'string'},
                                                                            renderer    : function(value, meta) {
                                                                                if (value == 1) {
                                                                                    //return '<a href="#"><font color="ff0000">'+ 'Yes' +'</font></a>';
                                                                                    return '<font color="ff0000">'+'Yes'+'</font>';
                                                                                }
                                                                                else{
                                                                                    return 'No';
                                                                                }
                                                                            },
                                                                        }
                                                                    ],
                                                                    selModel: {
                                                                        selType: 'checkboxmodel',
                                                                        listeners: {
                                                                            selectionchange:'onUserGrdSelChng'
                                                                        }
                                                                    },
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            itemId: 'userSearchMainGridToolbar',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    reference: 'adminAccountGridLocalFilterRef',
                                                                                    width: 300,
                                                                                    fieldLabel: 'Grid Filter',
                                                                                    labelAlign: 'right',
                                                                                    labelWidth: 60,
                                                                                    listeners: {
                                                                                        change: 'onGridFilterEntryChange'
                                                                                    }
                                                                                },
                                                                                '-',
                                                                                {
                                                                                    xtype: 'button',
                                                                                    width: 70,
                                                                                    text: 'Clear',
                                                                                    listeners: {
                                                                                        click: 'onClickGridFilterClear'
                                                                                    }
                                                                                },
                                                                                '-',
                                                                                {
                                                                                    xtype: 'button',
                                                                                    iconCls:'export-icon',
                                                                                    text: 'Export to Excel',
                                                                                    listeners: {
                                                                                        click: 'onGenerateXLSClick'
                                                                                    }
                                                                                },
                                                                                '-',
                                                                               {
                                                                                    text: 'Export to PDF',
                                                                                    iconCls: 'pdf-icon',
                                                                                    tooltip: 'Export to PDF',
                                                                                    listeners:{
                                                                                        click: 'onUserSearchGridExportToPdf',
                                                                                    }
                                                                                },
                                                                                '-',
                                                                                ]
                                                                        }
                                                                        ]   

                                                                },
                                                                {
                                                                    dock: 'right',
                                                                    xtype: 'gridpanel',
                                                                    layout: 'fit',
                                                                    width: 350,
                                                                    border: false,
                                                                    region: 'east',
                                                                    zIndex: 0,
                                                                    collapsed: true,
                                                                    collapsible: true,
                                                                    title: 'Login Status',
                                                                    reference: 'loginStatusPnl',
                                                                    // store : 'gUserLoginAppStore',
                                                                    columns: [
                                                                           {
                                                                            xtype       : 'gridcolumn',
                                                                            text        : 'Id', 
                                                                            hidden      : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'userId'
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn',
                                                                            text        : 'Login Id', 
                                                                            hidden      : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'loginId'
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn',
                                                                            text        : 'User Id', 
                                                                            hidden      : true, 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'unId'
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn',
                                                                            text        : 'App Name', 
                                                                            align       : 'center', 
                                                                            dataIndex   : 'appName',
                                                                            renderer    : function(value, meta) {
                                                                                return '<a href="#"><font color="228B22">'+ value +'</font></a>';
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'IP Address',
                                                                            align       : 'center', 
                                                                            dataIndex   : 'ipAddress'
                                                                        },
                                                                        {
                                                                            xtype       : 'gridcolumn', 
                                                                            text        : 'Login Time',
                                                                            align       : 'center', 
                                                                            dataIndex   : 'loginDate',
                                                                            width       : 140,
                                                                            renderer    : Ext.util.Format.dateRenderer('M d, Y g:i A')
                                                                        }
                                                                       ],
                                                                       listeners: {
                                                                        itemclick: 'onClickLogoutLink'
                                                                    }
                                                                }
                                                                ]                     
                                                        }
                                                        ]    
                                                 }
                                                 ]              
                                             },


                                            {
                                                xtype: 'panel',
                                                itemId: 'userGroupTabPanel',
                                                layout: 'fit',
                                                title: 'User Groups',
                                                reference: 'userGroup',
                                                items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    height: 100,
                                                    itemId: 'userGroupSearchTabPanel',
                                                    reference: 'userGroupMain',
                                                    activeTab: 0,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            itemId: 'userGroupSearchGridPanel',
                                                            layout: 'fit',
                                                            title: 'User Group Search',
                                                            items: [
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    itemId: 'userGroupMainGrid',
                                                                    reference : 'usergroupMainGridRef',
                                                                    header: true,
                                                                    title: '<div style="margin-left:0px; font-size:12px; font-weight:lighter">Group Live Search Pad</div>',
                                                               
                                                                    plugins: [
                                                                        {
                                                                            ptype: 'gridfilters'
                                                                        }
                                                                    ],
                                                                    bind : {
                                                                        // store : '{userGroupStore}'
                                                                    },

                                                                    listeners: {
                                                                        itemdblclick: 'onUserGroupGridItemDblClick'
                                                                    },

                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'ID', 
                                                                            width: 250, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'id', 
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Group Name', 
                                                                            width: 180, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'name', 
                                                                            hidden: false, 
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Group Description', 
                                                                            width: 180, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'description', 
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Version', 
                                                                            width: 150, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'groupVersion',
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        },

                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Modified Date',
                                                                            width: 180, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'dateModified',
                                                                            filter: {
                                                                                        type: 'date'
                                                                                    }, 
                                                                            renderer : Ext.util.Format.dateRenderer('M d, Y g:i A')
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Modified By.', 
                                                                            width: 180, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'userNameModified', 
                                                                            hidden: false,
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        }
                                                                    ],
                                                                    selModel: {
                                                                        selType: 'checkboxmodel'
                                                                    },
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            itemId: 'userGroupMainGridToolbar',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    reference: 'adminGroupGridLocalFilterRef',
                                                                                    width: 300,
                                                                                    fieldLabel: 'Grid Filter',
                                                                                    labelAlign: 'right',
                                                                                    labelWidth: 60,
                                                                                    listeners: {
                                                                                        change: 'OnUserGroupGridFilterEntryChange'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    width: 70,
                                                                                    text: 'Clear',
                                                                                    listeners: {
                                                                                        click: 'onClickUserGroupGridFilterClear'
                                                                                    }
                                                                                }
                                                                            ]
                                                                        }
                                                                    ]

                                                                }
                                                                ]  
                                                        }
                                                        ]    
                                                }
                                                ]    
                                             },


                                            {
                                                xtype: 'panel',
                                                itemId: 'groupRoleTabPanel',
                                                layout: 'fit',
                                                title: 'Group Role',  
                                                items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    height: 100,
                                                    itemId: 'groupRoleSearchTabPanel',
                                                    activeTab: 0, 
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            itemId: 'groupRoleSearchGridPanel',
                                                            layout: 'fit',
                                                            title: 'Group Role Search',
                                                            items: [
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    itemId: 'groupRoleMainGrid',
                                                                    reference : 'groupRoleMainGridRef',
                                                                    header: true,
                                                                    title: '<div style="margin-left:0px; font-size:12px; font-weight:lighter">Role Live Search Pad</div>',
                                                                    bind : {
                                                                        store : '{userRoleStore}'
                                                                    },
                                                                    plugins: [
                                                                        {
                                                                            ptype: 'gridfilters'
                                                                        }
                                                                    ],
                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'ID', 
                                                                            width: 250, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'id', 
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Role Name', 
                                                                            width: 200, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'name', 
                                                                            hidden: false, 
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Role Description', 
                                                                            width: 230, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'description', 
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Modified Date',
                                                                            width: 200, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'dateModified',
                                                                            filter: {
                                                                                        type: 'date'
                                                                                    }, 
                                                                            renderer : Ext.util.Format.dateRenderer('M d, Y g:i A')
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Modified By.', 
                                                                            width: 240, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'userNameModified', 
                                                                            hidden: false,filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        }
                                                                    ],
                                                                    selModel: {
                                                                        selType: 'checkboxmodel'
                                                                    },
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            itemId: 'groupRoleMainGridToolbar',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    reference: 'adminRoleGridLocalFilterRef',
                                                                                    width: 300,
                                                                                    fieldLabel: 'Grid Filter',
                                                                                    labelAlign: 'right',
                                                                                    labelWidth: 60,
                                                                                    listeners: {
                                                                                        change: 'OnUserRoleFilterEntryChange'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    width: 70,
                                                                                    text: 'Clear',
                                                                                    listeners: {
                                                                                        click: 'OnClickRoleGridFilterClear'
                                                                                    }
                                                                                }

                                                                                ]
                                                                        }
                                                                        ]    
                         

                                                                }
                                                                ]  

                                                        }
                                                        ]    
                                                }
                                                ]    

                                             },

                                            {
                                                xtype: 'panel',
                                                itemId: 'legalEntityTabPanel',
                                                layout: 'fit',
                                                title: 'Branch',
                                                reference: 'legalEntity',
                                                listeners: {
                                                        render: 'onLegalEntityGridRender'

                                            },
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    height: 100,
                                                    itemId: 'legalEntitySearchTabPanel',
                                                    reference: 'legalEntityMain',
                                                    activeTab: 0,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            itemId: 'legalEntitySearchGridPanel',
                                                            layout: 'fit',
                                                            title: 'Branch Search',
                                                            items: [
                                                                {
                                                                    xtype: 'gridpanel',
                                                                    itemId: 'legalEntityMainGrid',
                                                                    reference : 'legalEntityMainGrid',
                                                                    header: true,
                                                                    title: '<div style="margin-left:0px; font-size:12px; font-weight:lighter">Branch Live Search Pad</div>',
                                                                    tools:[{
                                                                        type:'refresh',
                                                                        itemId: 'branchGridRefresh',
                                                                        reference: 'branchGridRefresh',
                                                                        tooltip: 'Refresh Data',
                                                                        listeners : {
                                                                            click : 'onLegalEntityGridRender'
                                                                        }
                                                                    }],
                                                                    plugins: [
                                                                        {
                                                                            ptype: 'gridfilters'
                                                                        }
                                                                    ],
                                                                    bind : {
                                                                        //store : '{legalEntityStores}'
                                                                    },
                                                                    listeners: {
                                                                        itemdblclick: 'onLegalEntitySearchGridItemDblClick'
                                                                    },

                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'ID', 
                                                                            width: 250, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'id', 
                                                                            hidden: true
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Branch ID', 
                                                                            width: 100, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'branchId',
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Branch Name', 
                                                                            width: 150, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'name', 
                                                                            hidden: false, 
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Alias', 
                                                                            width: 150, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'alias', 
                                                                            hidden: false,
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Mode', 
                                                                            width: 120, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'mode', filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Branch Description', 
                                                                            width: 150, sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'description', 
                                                                            filter: {
                                                                                        type: 'string'
                                                                                    }
                                                                        }
                                                                    ],
                                                                    selModel: {
                                                                        selType: 'checkboxmodel'
                                                                    },
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            itemId: 'legalEntityMainGridToolbar',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    reference: 'leganEntityGridLocalFilterRef',
                                                                                    width: 300,
                                                                                    fieldLabel: 'Grid Filter',
                                                                                    labelAlign: 'right',
                                                                                    labelWidth: 60,
                                                                                    listeners: {
                                                                                        change: 'OnLegalEntityGridFilterEntryChange'
                                                                                    }   
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    width: 70,
                                                                                    text: 'Clear',
                                                                                    listeners: {
                                                                                        click: 'OnClickLegalEntityGridFilterClear'
                                                                                    }
                                                                                }
                                                                                ]
                                                                        }
                                                                        ]
                                                                }
                                                                ]

                                                        }
                                                        ]

                                                }
                                                ]

                                                  
                                              },

                                            {
                                                xtype: 'panel',
                                                itemId: 'bicCodeEntityTabPanel',
                                                layout: 'fit',
                                                title: 'BIC Code',
                                                reference: 'bicCodeEntity',
                                                listeners: {
                                                        render: 'onBicCodeEntityGridRenderForRMA'
                                                  },
                                                items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    height: 100,
                                                    itemId: 'bicCodeEntitySearchTabPanel',
                                                    reference: 'bicCodeEntityMain',
                                                    activeTab: 0,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            itemId: 'bicCodeEntitySearchGridPanel',

                                                            layout: 'fit',
                                                            title: 'BIC Code Search',
                                                            items: [
                                                                {
                                                                   xtype: 'gridpanel',
                                                                    itemId: 'bicCodeEntityMainGrid',
                                                                    reference : 'bicCodeEntityMainGrid',
                                                                    header: true,
                                                                    title: '<div style="margin-left:0px; font-size:12px; font-weight:lighter">BIC Code Search Pad</div>',
                                                                    tools:[
                                                                    //Refersh All data
                                                                    {
                                                                        type:'refresh',
                                                                        itemId: 'bicCodeGridRefresh',
                                                                        reference: 'bicCodeGridRefresh',
                                                                        tooltip: 'Refresh Data',
                                                                        listeners : {
                                                                            click : 'onBicCodeEntityGridRenderForRMA'
                                                                        }
                                                                    }],
                                                                    plugins: [
                                                                        {
                                                                            ptype: 'gridfilters'
                                                                        }
                                                                    ],
                                                                    bind : {
                                                                       // store : '{bicCodeEntityStores}'
                                                                    },

                                                                    listeners: {
                                                                        itemdblclick: 'onBicCodeSearchGridItemDblClick',
                                                                        beforecellcontextmenu: 'onBicCodeRightClick',
                                                                        itemClick: 'onBicCodeSearchGridItemClick'
                                                                    },

                                                                    columns: [
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Swift BIC Code',
                                                                            width: 100, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'bicCode',
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Bank Name', 
                                                                            width: 270, 
                                                                            sortable: false, 
                                                                            align: 'center', 
                                                                            dataIndex : 'bankName',
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Ext Bank ID', 
                                                                            width: 70, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'extBankId', 
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Branch Name', 
                                                                            width: 150, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'branchName', 
                                                                            hidden: false, 
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Bank City', 
                                                                            width: 150, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'bankCity', 
                                                                            hidden: false,
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'Bank Country', 
                                                                            width: 120, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'bankCountry', 
                                                                            filter: {
                                                                                type: 'string'
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'gridcolumn', 
                                                                            text: 'RMA', 
                                                                            width: 50, 
                                                                            sortable: false, 
                                                                            align: 'left', 
                                                                            dataIndex : 'isListedInRMA', 
                                                                            filter: {
                                                                                type: 'string'
                                                                            },
                                                                            renderer: function(value, meta) {
                                                                                if (value == 1) {
                                                                                    return '<a href="#"><font color="228B22">'+ 'Yes' +'</font></a>';
                                                                                }
                                                                                else if(value == 0) {
                                                                                    return 'No';
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    selModel: {
                                                                        selType: 'checkboxmodel'
                                                                    },
                                                                    dockedItems: [
                                                                        {
                                                                            xtype: 'toolbar',
                                                                            dock: 'top',
                                                                            itemId: 'bicCodeMainGridToolbar',
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    reference: 'bicCodeGridLocalFilterRef',
                                                                                    width: 300,
                                                                                    fieldLabel: 'Grid Filter',
                                                                                    labelAlign: 'right',
                                                                                    labelWidth: 60,
                                                                                    listeners: {
                                                                                        change: 'OnBicCodeGridFilterEntryChange'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    width: 70,
                                                                                    text: 'Clear',
                                                                                    listeners: {
                                                                                        click: 'OnClickBicCodeEntityGridFilterClear'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    reference: 'bicCodeGridLocalSearch',
                                                                                    width: 300,
                                                                                    fieldLabel: 'BIC Code',
                                                                                    fieldStyle: 'text-transform:uppercase;',
                                                                                    labelAlign: 'right',
                                                                                    maxLength: 11,
                                                                                    enforceMaxLength: true,
                                                                                    labelWidth: 60,
                                                                                    listeners: {
                                                                                        change: function(field, newValue, oldValue) {
                                                                                            field.setValue(newValue.toUpperCase());
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    width: 70,
                                                                                    text: 'Search',
                                                                                    listeners: {
                                                                                        click: 'onBicCodeEntityGridRender'
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype:'displayfield',
                                                                                    padding: '0 0 0 50',
                                                                                    labelWidth: 60,
                                                                                    itemId: 'bicCodeGridTotalRows',
                                                                                    reference: 'bicCodeGridTotalRows',
                                                                                    fieldLabel: 'Total Rows',
                                                                                    name: 'bicCodeGridTotalRows',
                                                                                    value: '0',
                                                                                    readOnly: true,
                                                                                    allowBlank: false
                                                                                }

                                                                                ]
                                                                        }
                                                                        ],

                                                                        bbar: ['->',{
                                                                             xtype: 'panel',
                                                                        items:[
                                                                            {
                                                                                xtype: 'button',
                                                                                itemId: 'btnDeleteGroupBIC',
                                                                                text: 'Delete BIC Code',
                                                                                reference : 'btnDeleteGroupBICRef',
                                                                                iconCls: 'remove',
                                                                                name: 'deleteGroupBIC',
                                                                                disabled: true,
                                                                                listeners : {
                                                                                    click : 'onDeleteGroupSelectedBIC'
                                                                                },
                            
                                                                            },
                                                                             {
                                                                                xtype: 'button',
                                                                                itemId  : 'btnAddGroupBICinRMA',
                                                                                text    : 'Add to RMA',
                                                                                reference : 'btnAddGroupBICinRMARef',
                                                                                iconCls: 'save-icon',
                                                                                name    : 'addGroupBICinRMA',
                                                                                margin: '0 0 0 8',
                                                                                listeners : {
                                                                                    click : 'onMultiplBICaddORremove'
                                                                                },
                                                                            },
                                                                            {
                                                                                xtype: 'button',
                                                                                itemId  : 'btnDeleteFromRMA',
                                                                                text    : 'Remove from RMA',
                                                                                reference : 'btnDeleteFromRMARef',
                                                                                iconCls: 'remove',
                                                                                name    : 'deleteFromRMA',
                                                                                margin: '0 0 0 8',
                                                                                disabled: true,
                                                                                listeners : {
                                                                                    click : 'onMultiplBICaddORremove'
                                                                                },

                                                                            },

                                                                            ]

                                                                            }
                                                                        ]

                                                                }
                                                                ]


                                                        }
                                                        ]
                                                }
                                                ]  


                                              },

                                            {
                                                xtype: 'panel',
                                                itemId: 'smtpEntityTabPanel',
                                                layout: 'fit',
                                                title: 'SMTP',
                                                hidden : true,
                                                listeners: {
                                                        activate: 'onSMTPTabActive'
                                                    },
                                                reference: 'smtpEntity',
                                                items: [
                                                  {
                                                    xtype: 'tabpanel',
                                                    height: 100,
                                                    itemId: 'smtpEntityTabPanel',
                                                    reference: 'smtpEntityMain',
                                                    activeTab: 0,
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            itemId: 'smtpConfigEntitySavedGridPanel',
                                                            layout: 'fit',
                                                            title: 'SMTP Saved Data',

                                                            items: [
                                                            {
                                                                xtype: 'gridpanel',
                                                                itemId: 'smtpEntityMainGrid',
                                                                reference : 'smtpEntityMainGrid',
                                                                header: true,
                                                                title: '<div style="margin-left:0px; font-size:12px; font-weight:lighter">SMTP Server Saved Pad</div>',
                                                                bind : {
                                                                    //store : '{smtpConfigStores}'
                                                                },
                                                                listeners: {
                                                                    itemdblclick: 'onClickSaveButtonSmtpConfigEntity'
                                                                },

                                                                columns: [
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'SMTP Server',
                                                                    width: 100, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'smtpServer',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'SSL/TLS/None', 
                                                                    width: 100, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'sslTlsNone',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'SMTP Port', 
                                                                    width: 90, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'smtpPort',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'SMTP Authenticate?', 
                                                                    width: 120, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'smtpAuthenticate',
                                                                    filter: {
                                                                                type: 'string'
                                                                            },
                                                                    renderer: function(value, meta) {
                                                                        if (value == 1) {
                                                                            return '<a href="#"><font color="228B22">'+ 'Yes' +'</font></a>';
                                                                        }
                                                                            else if(value == 0) {
                                                                            //return 'No';
                                                                            return '<a href="#"><font color="ff0000">'+ 'No' +'</font></a>';
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'Username', 
                                                                    width: 100, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'authUsername',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'Password', 
                                                                    width: 100, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'authPassword',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'Default Email Subject', 
                                                                    width: 120, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'defaultEmailSubject',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'Disclaimer', 
                                                                    width: 100, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'disclaimer',
                                                                    filter: {
                                                                                type: 'string'
                                                                            }
                                                                },
                                                                {
                                                                    xtype: 'gridcolumn', 
                                                                    text: 'SMTP Enabled?', 
                                                                    width: 95, 
                                                                    sortable: false, 
                                                                    align: 'center', 
                                                                    dataIndex : 'smtpEnabled',
                                                                    filter: {
                                                                                type: 'string'
                                                                            },
                                                                    renderer: function(value, meta) {
                                                                        if (value == 1) {
                                                                            return '<a href="#"><font color="228B22">'+ 'Yes' +'</font></a>';
                                                                        }
                                                                            else if(value == 0) {
                                                                            //return 'No';
                                                                            return '<a href="#"><font color="ff0000">'+ 'No' +'</font></a>';
                                                                        }
                                                                    }
                                                                }
                                                            ],

                                                            selModel: {
                                                                selType: 'checkboxmodel'
                                                            },

                                                            }
                                                            ]


                                                        }
                                                        ]

                                                }
                                                ]
                                             },

                                             {
                                                xtype: 'tabpanel',
                                                title: 'Setting',
                                                reference : 'techAdminSettingTab',
                                                layout: 'fit',
                                                itemId : 'techAdminSettingTab',
                                                listeners: { 
                                                    afterrender: 'loadnKycSettings' 
                                            },
                                            items : [
                                                {
                                                    xtype : 'panel',
                                                    title : 'KYC',
                                                    autoScroll:true,
                                                    reference : 'kycSetting',
                                                    itemId : 'kycSettingPanel',
                                                    bodyPadding : 15,
                                                    items : [
                                                        {
                                                            xtype : 'fieldset',
                                                             title: 'Legacy Report Schedule',
                                                             collapsible : true,
                                                             reference : 'scheduleSetting',
                                                             padding : 15,
                                                             items : [
                                                                {
                                                                    xtype : 'checkboxfield',
                                                                    fieldLabel : 'Schedule On',
                                                                    labelWidth : 165,
                                                                    reference : 'recheck',
                                                                    listeners : {
                                                                        change : 'onScheduleRecheckChange'
                                                                    }
                                                                },
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'RecheckIdVersion',
                                                                    reference : 'recheckIdVersion',
                                                                    hidden:true
                                                                },
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'scheduleAtIdVersion',
                                                                    reference : 'scheduleAtIdVersion',
                                                                    hidden:true
                                                                },
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'reportOutPutOptionIdVersion',
                                                                    reference : 'reportOutPutOptionIdVersion',
                                                                    hidden:true
                                                                },
                                                                {
                                                                    xtype : 'textfield',
                                                                    fieldLabel : 'isFullRecheckIdVersion',
                                                                    reference : 'isFullRecheckIdVersion',
                                                                    hidden:true
                                                                },
                                                                {
                                                                    xtype: 'fieldset',
                                                                    padding:5,
                                                                    items:[
                                                                        {
                                                                            xtype : 'checkboxfield',
                                                                            labelWidth : 165,
                                                                            fieldLabel : 'Is Full Cycle Screening?',
                                                                            reference : 'isFullRecheck',
                                                                            disabled : true
                                                                        },
                                                                        {
                                                                            xtype: 'label',
                                                                            forId: 'myFieldId',
                                                                            style: {color : 'red'},
                                                                            text: '*** Full Cycle Screening will perform a complete cycle of screening meaning importing data and screening on whole data which may take longer. Otherwise, it will perform screening only on those items updated since last screening.',
                                                                            margins: '0 0 0 10'
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    xtype: 'fieldset',
                                                                    title: 'Schedule',
                                                                    reference: 'schedule',
                                                                    hidden: true,
                                                                    layout: {
                                                                                type: 'vbox',
                                                                                align : 'stretch',
                                                                                pack  : 'start'
                                                                            },
                                                                    items: [
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    flex: 1,
                                                                                    layout : 'hbox',
                                                                                    reference : 'scheduleOption',
                                                                                    items:[
                                                                                            {
                                                                                                xtype      : 'radiogroup',
                                                                                                fieldLabel : 'Schedule Option',
                                                                                                items:[
                                                                                                    {
                                                                                                        xtype: 'radiofield',
                                                                                                        reference : 'scheduleDaily',
                                                                                                        boxLabel  : 'Date Basis',
                                                                                                        listeners :{
                                                                                                            change : 'onscheduleOptionDailyChange'
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        xtype: 'radiofield',
                                                                                                        reference : 'scheduleWeekly',
                                                                                                        margin : '0 0 0 20',
                                                                                                        boxLabel  : 'Weekly Basis',
                                                                                                        listeners :{
                                                                                                            change : 'onscheduleOptionWeeklyChange'
                                                                                                        }
                                                                                                    }

                                                                                                    ]
                                                                                            }
                                                                                            ]
                                                                                },

                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    flex: 1,
                                                                                    layout : 'hbox',
                                                                                    fieldLabel : 'Date Basis',
                                                                                    hidden:true,
                                                                                    labelWidth : 70,
                                                                                    reference : 'scheduleDateBasis',
                                                                                    items : [
                                                                                        {
                                                                                            xtype: 'combobox',
                                                                                            reference : 'scheduleMonth',
                                                                                            width : 150,
                                                                                            editable : false,
                                                                                            fieldLabel : 'Month',
                                                                                            margin : '0 0 0 10',
                                                                                            labelWidth : 70,
                                                                                            value : '*',
                                                                                            store :Ext.create('Ext.data.Store', {
                                                                                                fields: ['month', 'value'],
                                                                                                data : [
                                                                                                    { "month":"*" , "value":"*" },
                                                                                                    { "month":"JAN" , "value":"1" },
                                                                                                    { "month":"FEB" , "value":"2" },
                                                                                                    { "month":"MARCH" , "value":"3" },
                                                                                                    { "month":"APRIL" , "value":"4" },
                                                                                                    { "month":"MAY" , "value":"5" },
                                                                                                    { "month":"JUNE" , "value":"6" },
                                                                                                    { "month":"JULY" , "value":"7" },
                                                                                                    { "month":"AUG" , "value":"8" },
                                                                                                    { "month":"SEP" , "value":"9" },
                                                                                                    { "month":"OCT" , "value":"10" },
                                                                                                    { "month":"NOV" , "value":"11" },
                                                                                                    { "month":"DEC" , "value":"12" }
                                                                                                ]
                                                                                            }),
                                                                                            queryMode: 'local',
                                                                                            displayField: 'month',
                                                                                            valueField: 'value',
                                                                                            listeners :{
                                                                                                change : 'onscheduleMonthComboChange'
                                                                                            }

                                                                                        },
                                                                                        {
                                                                                            xtype: 'combobox',
                                                                                            reference : 'scheduleDay',
                                                                                            width : 100,
                                                                                            editable : false,
                                                                                            margin : '0 0 0 20',
                                                                                            fieldLabel : 'Date',
                                                                                            labelWidth : 30,
                                                                                            value : '*',
                                                                                            store :Ext.create('Ext.data.Store', {
                                                                                                fields: ['day', 'value'],
                                                                                                data : [
                                                                                                    { "day":"*" , "value":"*" },
                                                                                                    { "day":"0" , "value":"0" },
                                                                                                    { "day":"1" , "value":"1" },
                                                                                                    { "day":"2" , "value":"2" },
                                                                                                    { "day":"3" , "value":"3" },
                                                                                                    { "day":"4" , "value":"4" },
                                                                                                    { "day":"5" , "value":"5" },
                                                                                                    { "day":"6" , "value":"6" },
                                                                                                    { "day":"7" , "value":"7" },
                                                                                                    { "day":"8" , "value":"8" },
                                                                                                    { "day":"9" , "value":"9" },
                                                                                                    { "day":"10" , "value":"10" },
                                                                                                    { "day":"11" , "value":"11" },
                                                                                                    { "day":"12" , "value":"12" },
                                                                                                    { "day":"13" , "value":"13" },
                                                                                                    { "day":"14" , "value":"14" },
                                                                                                    { "day":"15" , "value":"15" },
                                                                                                    { "day":"16" , "value":"16" },
                                                                                                    { "day":"17" , "value":"17" },
                                                                                                    { "day":"18" , "value":"18" },
                                                                                                    { "day":"19" , "value":"19" },
                                                                                                    { "day":"20" , "value":"20" },
                                                                                                    { "day":"21" , "value":"21" },
                                                                                                    { "day":"22" , "value":"22" },
                                                                                                    { "day":"23" , "value":"23" },
                                                                                                    { "day":"24" , "value":"24" },
                                                                                                    { "day":"25" , "value":"25" },
                                                                                                    { "day":"26" , "value":"26" },
                                                                                                    { "day":"27" , "value":"27" },
                                                                                                    { "day":"28" , "value":"28" },
                                                                                                    { "day":"29" , "value":"29" },
                                                                                                    { "day":"30" , "value":"30" },
                                                                                                    { "day":"31" , "value":"31" }
                                                                                                ]
                                                                                            }),
                                                                                            queryMode: 'local',
                                                                                            displayField: 'day',
                                                                                            valueField: 'value',
                                                                                            listeners : {
                                                                                                change : 'onScheduleDayComboChange'
                                                                                            }  

                                                                                        }


                                                                                        ]
                                                                                },

                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    flex: 1,
                                                                                    layout : 'hbox',
                                                                                    hidden:true,
                                                                                        
                                                                                    fieldLabel : 'Weekly',
                                                                                    labelWidth : 70,
                                                                                    reference : 'scheduleWeeklyBasis',
                                                                                    //disabled : true,
                                                                                    items : [

                                                                                        {
                                                                                            xtype: 'combobox',
                                                                                            reference : 'scheduleWeekDay',
                                                                                            width : 200,
                                                                                            editable : false,
                                                                                            fieldLabel : 'Week Day',
                                                                                            margin : '0 0 0 10',
                                                                                            labelWidth : 70,
                                                                                            value : '*',
                                                                                            store :Ext.create('Ext.data.Store', {
                                                                                                fields: ['day', 'value'],
                                                                                                data : [
                                                                                                    { "day":"*" , "value":"*" },
                                                                                                    { "day":"SATURDAY" , "value":"SAT" },
                                                                                                    { "day":"SUNDAY" , "value":"SUN" },
                                                                                                    { "day":"MONDAY" , "value":"MON" },
                                                                                                    { "day":"TUESDAY" , "value":"TUE" },
                                                                                                    { "day":"WEDNESDAY" , "value":"WED" },
                                                                                                    { "day":"THURSDAY" , "value":"THU" },
                                                                                                    { "day":"FRIDAY" , "value":"FRI" }
                                                                                                ]
                                                                                            }),
                                                                                            queryMode: 'local',
                                                                                            displayField: 'day',
                                                                                            valueField: 'value'
                                                                                        }
                                                                                        ]

                                                                                },

                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    flex: 1,
                                                                                    layout : 'hbox',
                                                                                    fieldLabel : 'Time',
                                                                                    labelWidth : 70,
                                                                                    reference : 'scheduleTime',
                                                                                     items : [
                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        fieldLabel : 'Minute',
                                                                                        reference : 'scheduleMinute',
                                                                                        width : 150,
                                                                                        editable : false,
                                                                                        margin : '0 0 0 10',
                                                                                        labelWidth : 70,
                                                                                        value : '*',
                                                                                        store :Ext.create('Ext.data.Store', {
                                                                                            fields: ['minute','value'],
                                                                                            data : [
                                                                                                { "minute":"*" , "value":"*" },
                                                                                                { "minute":"0" , "value":"0" },
                                                                                                { "minute":"1" , "value":"1" },
                                                                                                { "minute":"2" , "value":"2" },
                                                                                                { "minute":"3" , "value":"3" },
                                                                                                { "minute":"4" , "value":"4" },
                                                                                                { "minute":"5" , "value":"5" },
                                                                                                { "minute":"6" , "value":"6" },
                                                                                                { "minute":"7" , "value":"7" },
                                                                                                { "minute":"8" , "value":"8" },
                                                                                                { "minute":"9" , "value":"9" },
                                                                                                { "minute":"10" , "value":"10" },
                                                                                                { "minute":"11" , "value":"11" },
                                                                                                { "minute":"12" , "value":"12" },
                                                                                                { "minute":"13" , "value":"13" },
                                                                                                { "minute":"14" , "value":"14" },
                                                                                                { "minute":"15" , "value":"15" },
                                                                                                { "minute":"16" , "value":"16" },
                                                                                                { "minute":"17" , "value":"17" },
                                                                                                { "minute":"18" , "value":"18" },
                                                                                                { "minute":"19" , "value":"19" },
                                                                                                { "minute":"20" , "value":"20" },
                                                                                                { "minute":"21" , "value":"21" },
                                                                                                { "minute":"22" , "value":"22" },
                                                                                                { "minute":"23" , "value":"23" },
                                                                                                { "minute":"24" , "value":"24" },
                                                                                                { "minute":"25" , "value":"25" },
                                                                                                { "minute":"26" , "value":"26" },
                                                                                                { "minute":"27" , "value":"27" },
                                                                                                { "minute":"28" , "value":"28" },
                                                                                                { "minute":"29" , "value":"29" },
                                                                                                { "minute":"30" , "value":"30" },
                                                                                                { "minute":"31" , "value":"31" },
                                                                                                { "minute":"32" , "value":"32" },
                                                                                                { "minute":"33" , "value":"33" },
                                                                                                { "minute":"34" , "value":"34" },
                                                                                                { "minute":"35" , "value":"35" },
                                                                                                { "minute":"36" , "value":"36" },
                                                                                                { "minute":"37" , "value":"37" },
                                                                                                { "minute":"38" , "value":"38" },
                                                                                                { "minute":"39" , "value":"39" },
                                                                                                { "minute":"40" , "value":"40" },
                                                                                                { "minute":"41" , "value":"41" },
                                                                                                { "minute":"42" , "value":"42" },
                                                                                                { "minute":"43" , "value":"43" },
                                                                                                { "minute":"44" , "value":"44" },
                                                                                                { "minute":"45" , "value":"45" },
                                                                                                { "minute":"46" , "value":"46" },
                                                                                                { "minute":"47" , "value":"47" },
                                                                                                { "minute":"48" , "value":"48" },
                                                                                                { "minute":"49" , "value":"49" },
                                                                                                { "minute":"50" , "value":"50" },
                                                                                                { "minute":"51" , "value":"51" },
                                                                                                { "minute":"52" , "value":"52" },
                                                                                                { "minute":"53" , "value":"53" },
                                                                                                { "minute":"54" , "value":"54" },
                                                                                                { "minute":"55" , "value":"55" },
                                                                                                { "minute":"56" , "value":"56" },
                                                                                                { "minute":"57" , "value":"57" },
                                                                                                { "minute":"58" , "value":"58" },
                                                                                                { "minute":"59" , "value":"59" }
                                                                                            ]
                                                                                        }),
                                                                                        queryMode: 'local',
                                                                                        displayField: 'minute',
                                                                                        valueField: 'value'
                                                                                    },

                                                                                    {
                                                                                        xtype: 'combobox',
                                                                                        fieldLabel : 'Hour',
                                                                                        reference : 'scheduleHour',
                                                                                        width : 100,
                                                                                        editable : false,
                                                                                        margin : '0 0 0 20',
                                                                                        value : '*',
                                                                                        labelWidth : 30,
                                                                                         store :Ext.create('Ext.data.Store', {
                                                                                            fields: ['hour', 'value'],
                                                                                            data : [
                                                                                                { "hour":"*" , "value":"*" },
                                                                                                { "hour":"0" , "value":"0" },
                                                                                                { "hour":"1" , "value":"1" },
                                                                                                { "hour":"2" , "value":"2" },
                                                                                                { "hour":"3" , "value":"3" },
                                                                                                { "hour":"4" , "value":"4" },
                                                                                                { "hour":"5" , "value":"5" },
                                                                                                { "hour":"6" , "value":"6" },
                                                                                                { "hour":"7" , "value":"7" },
                                                                                                { "hour":"8" , "value":"8" },
                                                                                                { "hour":"9" , "value":"9" },
                                                                                                { "hour":"10" , "value":"10" },
                                                                                                { "hour":"11" , "value":"11" },
                                                                                                { "hour":"12" , "value":"12" }
                                                                                            ]
                                                                                        }),
                                                                                        queryMode: 'local',
                                                                                        displayField: 'hour',
                                                                                        valueField: 'value',
                                                                                        listeners :{
                                                                                            change : 'onscheduleHourComboChange'
                                                                                        }
                                                                                    },

                                                                                     {
                                                                                        xtype: 'combobox',
                                                                                        reference : 'ampm',
                                                                                        width : 50,
                                                                                        margin : '0 0 0 5',
                                                                                        editable : false,
                                                                                        value : 'AM',
                                                                                        store :Ext.create('Ext.data.Store', {
                                                                                            fields: ['ampm', 'value'],
                                                                                            data : [
                                                                                                { "ampm":"AM", "value": "AM"},
                                                                                                { "ampm":"PM", "value": "PM"}
                                                                                            ]
                                                                                        }),
                                                                                        queryMode: 'local',
                                                                                        displayField: 'ampm',
                                                                                        valueField: 'value',
                                                                                        listeners :{
                                                                                            change : 'onscheduleAMComboChange'
                                                                                        }
                                                                                    }

                                                                                    ]
                 

                                                                                }

                                                                                ]        
                                                                },

                                                                {
                                                                     xtype: 'fieldcontainer',
                                                                            flex: 1,
                                                                            //width: 500,
                                                                            //fieldLabel: 'Report Output',
                                                                            layout : 'hbox',
                                                                            reference : 'reportOption',
                                                                            items:[
                                                                                    {
                                                                                        xtype      : 'radiogroup',
                                                                                                fieldLabel : 'Report Output',
                                                                                                items:[
                                                                                                            {
                                                                                                                labelWidth : 30,
                                                                                                                reference : 'hitOnly',
                                                                                                                boxLabel  : 'HIT ONLY'

                                                                                                            },
                                                                                                            {
                                                                                                                reference : 'nonHitOnly',
                                                                                                                labelWidth : 30,
                                                                                                                boxLabel  : 'NON-HIT ONLY'
                                                                                                            },
                                                                                                            {
                                                                                                                reference : 'both',
                                                                                                                margin : '0 0 0 20',
                                                                                                                labelWidth : 30,
                                                                                                                boxLabel  : 'BOTH'
                                                                                                            }
                                                                                                ]
                                                                                    }
                                                                                    ]

                                                                }


                                                                ]

                                                        }
                                                        ]
                                                }
                                                ]
                                             }



                                             ]    
                                    }
                                    ]    
                     }
                     ]
});
