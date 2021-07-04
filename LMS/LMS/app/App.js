/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */


Ext.define('Desktop.App', {
    extend: 'Ext.ux.desktop.App',

    name: 'LMS',

    requires: [
        'Desktop.ExecutiveDashboardWindow',
        'Ext.window.MessageBox',
        'Ext.ux.desktop.ShortcutModel',
        'Desktop.LoanWindow',
        'Desktop.Settings',
        'Desktop.About',
        'Desktop.Profile',
    ],

    init: function(start) {
        // custom logic before getXYZ methods get called...
        /*Create store for immidiate executive dashboard show after login*/
         // if(userRoles.containsKey(appConstants.FIELD_OFFICER) || userRoles.containsKey(appConstants.SOURCE_OFFICER) 
         //    || userRoles.containsKey(appConstants.BRANCH_MANAGER) || userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER) 
         //    || userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR) || start==true
         //    )
         // {

             this.callParent();

        // }

        // now ready..
        
        //Store user data to local storage
        if(!isLoggedOutAfterBrowserRefresh){

            if(isSessionStore){
                sessionStorage.setItem('loginUser', JSON.stringify(loginUser));
            }

            if(isLocalStore){
               localStorage.setItem('loginUser', JSON.stringify(loginUser));
            }
        }
    },

    getModules : function() {

        var modules = new Array();

       if(loginUser) {
            modules.push(new Desktop.LoanWindow());

            if(userRoles.containsKey(appConstants.NAZTECH_ADMIN) 
                ||userRoles.containsKey(appConstants.BIZ_ADMIN) 
                || userRoles.containsKey(appConstants.SA_TECH) 
                || userRoles.containsKey(appConstants.SA_BIZ) 
                || userRoles.containsKey(appConstants.TECH_ADMIN)
                )
            {
                modules.push(new Desktop.AdminWindow());
            }

            gLoginUuser = loginUser;
            modules.push(new Desktop.ExecutiveDashboardWindow());

        }

        return modules;
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        /*
         * Added a shortcut store
         * According to permission icons are added to the store.
         */

        var shortcutIcons = Ext.create('Ext.data.Store', {
            model: 'Ext.ux.desktop.ShortcutModel'
        });

      if(loginUser) {
        
            if(userRoles.containsKey(appConstants.NAZTECH_ADMIN) 
                ||userRoles.containsKey(appConstants.BIZ_ADMIN) 
                || userRoles.containsKey(appConstants.SA_TECH) 
                || userRoles.containsKey(appConstants.SA_BIZ) 
                || userRoles.containsKey(appConstants.TECH_ADMIN)
                )
            {
                shortcutIcons.add({ name: 'Admin', iconCls: 'admin-shortcut', module: 'admin-win' });
            }

            shortcutIcons.add({ name: 'Loan', iconCls: 'loan-shortcut', module: 'loan-win' });
            
            gLoginUuser = loginUser;
            shortcutIcons.add({ name: 'Dashboard', iconCls:  'dashboard-shortcut', module: 'executive-dashboard-win' });
            
        }

        return Ext.apply(ret, {
            shortcuts: shortcutIcons,

            wallpaper: 'resources/images/wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {

        if(loginUser){
            var me = this, ret = me.callParent();

            return Ext.apply(ret, {
                title: loginUser.firstName + ' ' + loginUser.lastName,
                iconCls: 'user',
                height: 300,
                toolConfig: {
                    width: 100,
                    items: [
                        {
                            text:'Settings',
                            iconCls:'settings',
                            handler: me.onSettings,
                            scope: me
                        },
                        {
                            text:'Profile',
                            iconCls:'user',
                            handler: me.onProfile,
                            scope: me
                        },
                        '-',
                        {
                            text:'About',
                            iconCls:'icon-about',
                            handler: me.onAbout,
                            scope: me
                        },
                        '-',
                        {
                            text:'Logout',
                            iconCls:'logout',
                            handler: me.onLogout,
                            scope: me
                        }
                    ]
                }
            });
        }

    },

    getTaskbarConfig: function () {

        if(loginUser){
            var ret = this.callParent();
            var today = Ext.Date.parse(Ext.Date.format(new Date(), 'M d Y'), 'M d Y'),
            items = [];
            var me = this,

            items = [
                    {xtype: 'button',align: 'center',
                     reference: 'eLoanAPKReference', 
                     iconCls : 'grid-download',
                     tooltip: 'Download eLoan APK File',
                     handler: me.onClickELoanAPKDownload,
                     scope: me
                     },
                     '-',
                    'User:', loginUser.firstName + ' ' + loginUser.lastName,
                    '-',
                    '<span style="color:#ff0000;">Today\'s Date: </span>',
                    '<span style="color:#ff0000;">'+Ext.Date.format(today, "d M Y")+'</span>',
                    '-',
                    { xtype: 'trayclock', flex: .5 },
                     '-',
                     '<span style="background-color:#662425; color : white; padding : 3px; border-radius: 50px">'+versionTag+'</span>'
            ];

            return Ext.apply(ret, {
                quickStart: [

                ],
               trayWidth: 660,
               trayItems: items
            });
        } else {
            var ret = this.callParent();

            return Ext.apply(ret, {
                trayWidth: 80,
                trayItems: [
                    { xtype: 'trayclock', flex: 1 }
                ]
            });
        }
    },

    onLogout: function () {

        if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?', function(btn){
            if(btn == 'yes'){
                
                var headerInfo = {
                        objectType  : 'USER',
                        actionType  : 'LOGOUT',
                        source      : 'nSCREEN' // change this source : 'LMS' when user does not get logged in with Bank Asia UAT server
                };

                var payLoadInfo = [{
                    unId            : loginUser.unId,
                    password        : 'null',
                    userIdModified  : loginUser.id,
                    id              : loginUser.id
                }];

                var jsonObj = {
                        header  : headerInfo,
                        payLoad : payLoadInfo
                };

                var jsonString = JSON.stringify(jsonObj, replacer);

                Ext.Ajax.request({
                    url     : LOGIN_URL,
                    method  : 'POST',
                    params  : jsonString,
                    success : function(result, request){
                        loginUser = null;

                        if(isSessionStore){
                            sessionStorage.removeItem('loginUser');
                        }

                        if(isLocalStore){
                           localStorage.removeItem('loginUser');
                        }
                    },
                    failure : function(result, request){

                    }
                });
                javascript:document.location.reload();
            }
        });
    },

    onSettings: function () {
        var dlg = new Desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    },

    onProfile: function () {
        if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

        var profile = new Desktop.Profile({
            desktop: this.desktop
        });

        profile.setTitle('User - ' + loginUser.firstName + ' ' + loginUser.lastName);
        profile.show();
    },
    onAbout: function () {
        var profile = new Desktop.About({
            desktop: this.desktop
        });
        profile.show();
    },
    onClickELoanAPKDownload: function () {
        var download = Ext.create('Ext.form.Panel', {
            renderTo: Ext.getBody(),
            standardSubmit: true,
            url: DOWNLOAN_ELOAN_URL,
            method: 'GET'
        });
        download.submit({
            params: {
                'reportlocation': 'webreturn',
                'reportformat': 'apk'
            }
        });
    }
});



