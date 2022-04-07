/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */

 // @require @packageOverrides
Ext.Loader.setConfig({

});

// DISABLE BACKSPACE BUTTON WINDOW EVENT
/*Ext.EventManager.on(window, 'keydown', function(e, t) {
    if (e.getKey() == e.BACKSPACE && (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly)) {
        console.log('Stopping Backspace Window Event.');
        e.stopEvent();
    }
});*/

// GLOBAL VAR
var gAppName = "LMS";
var gEnvId = 100000;
var gPriceQuateAmountPortion = 0.3;
var gAllowedDBR = 65;
var gGovernmentJobServiceAge = 59;
var loginUser, loginWindow, app, legalEntityStoreGlobal, userGroupStoreGlobal,
    countryStoreGlobal, remitExchHouseStoreGlobal, remitFileFormatStoreGlobal,
    remitPaymentTypeStoreGlobal, ofacPrivateFileList, privateWhiteListStore,
    privateEntityStoreGlobal, swiftMtTypeGlobal;
var mainTapHeight = 500;
var panelHeight = mainTapHeight;
var gridHeght = panelHeight - 20;
var headerpanelHeight = 120;
var gAutoGenPassOnUserCreation = true;
var ajaxRequestTimeout = 1800000;
//@naztech.us.com, 
var emailDomain = '@naztech.us.com';

var gLoginUuser;

var globalLonaPrefix = null;

var isLoggedOutAfterBrowserRefresh = true; // user will get logged out if false
//Either of these is true
var isSessionStore = false; // user will get logged out if he closes tab
var isLocalStore = true; // user will not logged out if he closes tab

// if this [true] swift screening module will be two factor auth. else one authorization.
// 
var screeningTwoStepAuth = false;

var globalConfigStore = null;
var globalLegalEntityStore = null;
 
var returnType = false;

var userRoles = new Ext.util.HashMap();

Ext.application({
    /*models: [
        'kyc'
    ],
    stores: [
        'kycStore'
    ],*/

    name: 'Desktop',

    extend: 'Desktop.App',

    //-------------------------------------------------------------------------
    // Most customizations should be made to Desktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'Desktop.*'
    ],
    init: function() {

         //library merge
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
        Ext.Ajax.timeout = ajaxRequestTimeout;
        Ext.override(Ext.form.Basic, { timeout: Ext.Ajax.timeout / 1000 });
        Ext.override(Ext.data.proxy.Server, { timeout: Ext.Ajax.timeout });
        Ext.override(Ext.data.Connection, { timeout: Ext.Ajax.timeout });
        Ext.merge(appConstants, nConstants);
        Ext.merge(appActionType, nActionType);
        Ext.merge(appContentType, nContentType);
        Ext.merge(appStatusType, nStatusType);

        Ext.getBody().setStyle('overflow', 'auto');


        //Imamul Hossain
        this.getLoggedIn();
    },

    getLoggedIn: function(){

        if(isLoggedOutAfterBrowserRefresh){
            loginWindow = Ext.create('Desktop.view.login.Login');

            loginWindow.show();
        }
        else{

            var userData = null;

            if(isSessionStore){
                userData = sessionStorage.getItem('loginUser')
            }

            if(isLocalStore){
                userData = localStorage.getItem('loginUser');
            }

            loginUser = JSON.parse(userData);

            if(loginUser){
                app = new Desktop.App();
            }
            else{
                loginWindow = Ext.create('Desktop.view.login.Login');

                loginWindow.show();
            }
        }
        
        //app = new Desktop.App();
    }
});
