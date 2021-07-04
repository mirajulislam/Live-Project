Ext.define('Desktop.About', {
    extend: 'Ext.window.Window',

    layout: 'anchor',
    title: 'About - '+versionTag,
    modal: true,
    width: 500,
    height: 200,
    border: false,

    initComponent: function () {
        var me = this;
        me.items = [
            {
                anchor: '0 -30',
                border: true,
                layout: 'border',
                items: [
                    {
                        xtype: 'panel',
                        region: 'center',
                        layout: {
                            type: 'vbox',
                            align: 'center',
                            pack: 'center'
                        },
                        items : [
                            {
                                xtype: 'label',
                                html: ' <span>nSCREEN - '+versionTag+'</span></br>'
                            },
                            {
                                xtype: 'label',
                                html: ' Support: <a href="mailto:support@nazdaqtechnologies.com" style = "text-decoration: underline;">support@nazdaqtechnologies.com</a>'
                            }
                        ],
                        dockedItems: [
                            {
                                xtype: 'panel',
                                region: 'center',
                                dock: 'bottom',
                                title : false,
                                border : false,
                                layout: {
                                    type: 'vbox',
                                    align: 'center',
                                    pack: 'center'
                                },
                                bodyStyle: {
                                    background: '#662524',
                                    padding: '10px',
                                    color : 'white'
                                },
                                items : [
                                    {
                                        xtype: 'label',
                                        html: ' <span style="color : white; font-family : Monospace;font-style: italic;">Copyright &copy; '+new Date().getFullYear()+', <a href="http://www.nazdaqtechnologies.com" target="_blank" style = "text-decoration: underline; color : white;">nazdaqTechnologies Inc</a>. All rights reserved.</span>'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];
        me.callParent();
    }
});
