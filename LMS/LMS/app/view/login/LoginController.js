
Ext.define('Desktop.view.login.LoginController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login-login',

	sendRequest: function(actionName, contentType, payload, header) {

		if (Ext.isEmpty(payload)) {
			payload = new Array();
		}

		var request = {
			actionName      : actionName,
			contentType     : contentType,
			requestId       : null,
			requestType     : null,
			header          : header,
			body            : payload,
			message         : null,
			dispatchType    : null,
			sender          : this,
			component       : null,
			onSuccess       : this.onSuccess,
			onLoginFailed   : this.onLoginFailed
		};

		var requestId = nMessageProcessor.sendRequest(request);
	},

	onSuccess: function(request, response) {

		if (request.contentType == appContentType.CONTENT_TYPE_USER) {

			if(response.payload[1].payload > -1) {

				houseNumberGlobalVariable = response.payload[1].payload.toString();

				gUserId = response.payload[1].payload.toString();

				// show the Desktop view
				loginWindow.close();
				loginUser = true;

				app = new Desktop.App();
			}
		}
		else if(request.contentType == appContentType.CONTENT_TYPE_LEGAL_ENTITY && request.actionName == 'SELECT_ALL'){
			console.log("gLegalEntityStore Loaded");
			if (isMessageBox) {
				Ext.MessageBox.hide();
				isMessageBox = false;
			}

			var data = response.payload[1].payload;	
			var legalEntityStore = Ext.data.StoreManager.lookup('gLegalEntityStore');
			if(!legalEntityStore){
				console.log('gLegalEntityStore not found in scope');
				Ext.create('Ext.data.Store', {
		            model: 'Desktop.model.LegalEntity',
		            storeId: 'gLegalEntityStore'
		        });
			}
			legalEntityStore = Ext.data.StoreManager.lookup('gLegalEntityStore');

			legalEntityStore.removeAll();
			legalEntityStore.add(data);

			globalLegalEntityStore = legalEntityStore;
		}
	},

	onLoginFailed: function(request, response, statusText) {

		Ext.MessageBox.alert('LOGIN FAILED', "Please Provide Appropriate Credentials");
	},

	onKeyPress: function(field, e){

		if (e.getKey() == e.ENTER) {
			this.lookupReference('loginBtn').disable();
			this.onLoginButtonClick(field, e);
		}
	},

	onLoginButtonClick: function(button, e, eOpts) {

		var me = this;
		var userId = me.lookupReference('uid').value;
		var password = me.lookupReference('pass').value;
		var newPassword = me.lookupReference('newPassword').value;
		var confirmPassword = this.lookupReference('confirmPassword').value;
		var buttonLogin = this.lookupReference('loginBtn');
		
		buttonLogin.disable();
		
		if(userId == null || userId == ""){
			Ext.MessageBox.alert('Error', 'Please enter your login name');
			buttonLogin.enable();
			return;
		}

		if(password == null || password == ""){
			Ext.MessageBox.alert('Error', 'Please enter your password');
			buttonLogin.enable();
			return;
		}

		if(newPassword && (newPassword != confirmPassword)){
			Ext.MessageBox.alert('Error', 'Your new password and confirmation password do not match');
			return;
		}
		else if(newPassword && (newPassword == password)){
			Ext.MessageBox.alert('Error', 'Your new password can not be same as old password');
			return;
		}
		
		var action = appActionType.ACTION_TYPE_LOGIN;
		var isFirstLogin;
		
		if(button.text == '<div style="margin-left:0px">Update Password</div>'){
			action = 'UPDATE_PASSWORD';
			isFirstLogin = 0;
		}

		var headerInfo = {
				objectType      : appContentType.CONTENT_TYPE_USER,
				actionType      : action,
				source          : 'nSCREEN' // change this source : 'LMS' when user does not get logged in with Bank Asia UAT server
		};
		
		if(action == appActionType.ACTION_TYPE_LOGIN){
			password = window.btoa(password);
		}

		var payLoadInfo = [{
			unId                : userId,
			password            : password,
			newPassword         : newPassword,
			isFirstLogin        : isFirstLogin
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

				var message = eval("(" + result.responseText + ")");

				// show the Desktop view
				// loginUser = true;

				if(message.header.objectType == 'MULTI'){
					for(var i = 0; i < message.payLoad.length; i++){
						var responseData;
						if(typeof(message.payLoad[i]) === 'object'){
							responseData = message.payLoad[i];
						} 
						else {
							responseData = eval("(" + message.payLoad[i] + ")");
						}
						
						if(responseData.header.objectType == appContentType.CONTENT_TYPE_STATUS){

							var loginController = new Desktop.view.login.LoginController();

							if(responseData.payLoad[0].status == 'OK'){

								for(var i = 0; i < message.payLoad.length; i++){
									var responseData = eval("(" + message.payLoad[i] + ")");
									
									if(responseData.header.objectType == appContentType.CONTENT_TYPE_USER){
										loginUser =  responseData.payLoad[0];
										gLoginUuser = responseData.payLoad[0];

										for(var j=0; j<loginUser.roleList.length; j++){
											userRoles.add(loginUser.roleList[j].name, loginUser.roleList[j].name);
										}
									}
								}

								// check if two factor login enable or not. loginUser.isLoggedIn ==2 means need authenticate login
								if(loginUser.isLoggedIn == 2 && loginUser.isFirstLogin != 1){
									loginWindow.close();
									loginController.AuthenticationWindow(message);
								}
								else if(loginUser.isFirstLogin === 1){
									 buttonLogin.enable();
									me.getView().setHeight(250);
									me.lookupReference('loginFormRef').setHeight(220);
									me.lookupReference('loginPanelRef').setHeight(220);

									me.lookupReference('newPassword').show();
									me.lookupReference('confirmPassword').show();
									me.lookupReference('pass').setFieldLabel('Old Password');

									me.getView().setTitle('Please save your password.');
									me.lookupReference('loginBtn').setText('<div style="margin-left:0px">Update Password</div>');
									Ext.MessageBox.alert('Status', 'Your password has expired. Please update your password.');
								}
								else {

									loginWindow.close();
									console.log('success');
									Ext.ux.ActivityMonitor.init({ verbose : false });
									Ext.ux.ActivityMonitor.start();

									// DISPLAY DESKTOP ICONS
									app = new Desktop.App();

									// Load Branch combobox
									loginController.onLegalEntityRequest(loginUser.id);

									// Load Country Combobox
									loginController.onCountryRequest(loginUser.id);

									// Load Remittance Combobox
									loginController.onRefDataRequest(loginUser.id);

									/* END LOAD COMBOBOX STORES */

									/*Create store for immidiate executive dashboard show after login*/
									//loginController.loadExecutiveDashboardWindow(loginUser.id);


								}
							} 
							else {
								buttonLogin.enable();
								var msg;
								if(responseData.payLoad[0].message){
									msg = responseData.payLoad[0].message;
								} 
								else {

									var errorMsg = responseData.payLoad[0].errorMessage;

									if(errorMsg.indexOf("Exceeded Maximum Number") > -1 && errorMsg.indexOf("User is not allowed for") < 0){
										msg = 'Invalid Login.<br/>' + 'Error: ' + errorMsg;
									} 
									else if(errorMsg.indexOf("User is not allowed for") > -1)
									{
										msg = 'User is not allowed for login';
									}
									else if(errorMsg.indexOf("In vacation") > -1)
									{
										msg = errorMsg;
									}
									else if(errorMsg.indexOf("User is restricted to login after") > -1)
									{
										msg = errorMsg;
									}
									else {
										msg = 'Invalid User Name or Password.';
									}

									if(errorMsg.indexOf("already logged in") > -1){
										msg = 'Login Failed.<br/>' + 'Error: ' + errorMsg;
									}
								}
								Ext.MessageBox.alert('Status', msg);
							}
						}
					}
				}
			},
			failure : function(result, request){
				buttonLogin.enable();
				Ext.MessageBox.alert('Server Error',"Login Error");
			}
		});
		//</TODO_H: REMOVE AFTER NEW MT>
	},

	onCancelButtonClick: function(button, e, eOpts) {

		this.lookupReference('uid').reset();
		this.lookupReference('loginBtn').enable();
		this.lookupReference('pass').reset();
	},

	onLegalEntityRequest : function (id) {

		var modelData = {
			userIdModified : id		
		};

		transactionPayload = new Array();
		transactionPayload[0] = modelData;

		this.sendRequest('SELECT_ALL',appContentType.CONTENT_TYPE_LEGAL_ENTITY, transactionPayload,	null);
		showProcessMessage("Initializing...");
	},

	onRefDataRequest: function (id) {

		var modelData = {
					userIdModified: id
		};

		transactionPayload = new Array();
		transactionPayload[0] = modelData;

		this.sendRequest(
					appActionType.ACTION_TYPE_SELECT,
					appContentType.CONTENT_TYPE_REF_DATA, transactionPayload,
					null);
	},

	onCountryRequest: function (id) {

		var modelData = {
					userIdModified: id
		};

		transactionPayload = new Array();
		transactionPayload[0] = modelData;

		this.sendRequest(
					appActionType.ACTION_TYPE_SELECT,
					appContentType.CONTENT_TYPE_COUNTRY, transactionPayload,
					null);
	},

	AuthenticationWindow : function (message){
		Ext.create('Ext.window.Window', {
			title   : 'Authentication',
			id      : 'authWindow',
			closable: false,
			draggable: false,
			resizable: false,
			y: 150,
			layout  : 'fit',
			iconCls:'icon-lock',
			resizable: false,
			items   : [this.AuthenticationCodeForm(message)]
		}).show();

		window.onblur = function() {
			isnSMARTInFocus = false;
		};

		window.onfocus = function()  {  
			isnSMARTInFocus = true;
		};
	},
	
	AuthenticationCodeForm : function(message){
		var user = JSON.parse(message.payLoad[1]).payLoad[0];
		var fieldText = (user.rsaAuth) ? 'RSA token' : 'Code';
		var fieldWidth = (user.rsaAuth) ? 70 : 50;
		var authanticationCodeForm = Ext.create('Ext.form.Panel', {
			id: 'authCodeForm',
			border: false,
			width   : 300,
			bodyPadding: 5,
			bodyStyle:{"background-color":"#3162A1"}, 
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 50,
				msgTarget: 'side'
			},
			defaults: {
				border: false,
				layout: 'anchor',
				anchor: '100%'
			},
			items:[{
				xtype       : 'textfield',
				itemId      : 'authenticationCode',
				fieldLabel  : fieldText,
				margin      : '15 0 15 0',
				labelWidth  : fieldWidth,
				name        : 'authCode',
				labelStyle  : 'color: #fff;',
				enableKeyEvents: true,
				listeners: {
					keypress : function(textfield,eo){
						if (eo.getCharCode() === Ext.EventObject.ENTER) {
							var container = this.up('window');
							AuthenticateUser(message,container);
						}
					},
					afterrender:function(cmp){
						cmp.inputEl.set({
							autocomplete:'on'
						});
					}
				},
				allowBlank  : false
			}
			],
			buttons: [
			{
				text : '<div style="margin-left:0px">Resend</div>',
				//iconCls : 'icon-admin',
				itemId : 'btnResend',
				reference: 'btnResend',
				hidden : (user.rsaAuth),
				margin: '0 60px 0 0',
				handler : function() {
					var container = this.up('window');

					if (this.text.includes('Resend')) {

						ResendAuthCode(message, container);
					}
				}
			},
			{
				text    : '<div style="margin-left:0px">Verify</div>',
				iconCls : 'icon-admin',
				itemId  : 'btnVerify',
				handler : function(){
						//SWIFT-108
						if (!authanticationCodeForm.getForm().isValid()) {
							Ext.MessageBox.alert('Login Error', 'Please insert verification code.');
							return;
						}
						var container = this.up('window');

						if(this.text.includes('Verify')){
							container.down('#btnVerify').disable();
							AuthenticateUser(message,container);
						}
					}
				},
				{
					text    : '<div style="margin-left:0px">Clear</div>',
					iconCls : 'icon-login-cancel',
					handler : function(){
						container.down('#btnVerify').enable();
						ClearAuthenticatonBox();
					}
				}
				]
			});
		return authanticationCodeForm;

		function ClearAuthenticatonBox(){
			authanticationCodeForm.getComponent('authenticationCode').setValue('');
		}

		function AuthenticateUser(message, container){
			var headerInfo = {
				objectType   : appContentType.CONTENT_TYPE_USER,
				actionType   : appActionType.ACTION_TYPE_AUTHENTICATE_LOGIN,
				source       : 'nSCREEN' // change this source : 'LMS' when user does not get logged in with Bank Asia UAT server
			};

			for(var i = 0; i < message.payLoad.length; i++){
				var responseData = eval("(" + message.payLoad[i] + ")");
				if(responseData.header.objectType == appContentType.CONTENT_TYPE_USER){

					logInUser =  responseData.payLoad[0];
				}
			}

			var authCode = container.down('#authenticationCode').getValue();

			if(authCode == '' || authCode == null){
				container.down('#btnVerify').enable();
				Ext.MessageBox.alert('Login Error', 'Authentication code can not be empty!');
				return;
			}

			var payLoadInfo = [{
				authenticationCode  : container.down('#authenticationCode').getValue(),
				unId                : logInUser.unId,
				id                  : logInUser.id,
				password            : logInUser.password,
				firstName           : logInUser.firstName,
				lastName            : logInUser.lastName
			}];

			var jsonObj = {
				header  : headerInfo,
				payLoad : payLoadInfo
			};
			if(logInUser){
				jsonObj.header.senderId = logInUser.id;
			}
			var jsonString = JSON.stringify(jsonObj, replacer);

			Ext.Ajax.request({
				url     : LOGIN_URL,
				method  : 'POST',
				params  : jsonString,
				success : function(result, request){
					container.down('#btnVerify').enable();
					var messageAuth = eval("(" + result.responseText + ")");
					ProcessMultiDataForAuthentication(message, messageAuth, container);

				},
				failure : function(result, request){
					
					container.down('#btnVerify').enable();
					Ext.MessageBox.alert('Server Error',"Server Error");
				}
			});
		}
		function ProcessMultiDataForAuthentication(message, messageAuth, container){

			if(message.header.objectType == 'MULTI'){

				var header =  eval("(" + messageAuth.payLoad[0] + ")") ;
				var payload = eval("(" + messageAuth.payLoad[1] + ")") ;

				if(header.payLoad[0].status == 'OK'){
					var loginController = new Desktop.view.login.LoginController();
					loginWindow.close();
					container.close();

					// DISPLAY DESKTOP ICONS
					app = new Desktop.App();
						

					// Load Branch combobox
					loginController.onLegalEntityRequest(loginUser.id);

					// Load Country Combobox
					loginController.onCountryRequest(loginUser.id);

					// Load Remittance Combobox
					loginController.onRefDataRequest(loginUser.id);

					/* END LOAD COMBOBOX STORES */


				}
				else{

					var  errorMessage = header.payLoad[0].errorMessage;

					if( errorMessage.startsWith('Authentication code expired.') ){
						Ext.MessageBox.alert('Error', errorMessage);
						setTimeout(function(){ 
							window.location.reload();
						 }, 1000);
					}
					else {
						Ext.MessageBox.alert('Error', errorMessage);
					}
				}
			}
		}
		//Imamul Hossain
		function ResendAuthCode(message, container){

			for (var i = 0; i < message.payLoad.length; i++) {
				var responseData = eval("(" + message.payLoad[i] + ")");
				if (responseData.header.objectType == appContentType.CONTENT_TYPE_USER) {

					logInUser = responseData.payLoad[0];
				}
			}

			var headerInfo = {
				objectType  : appContentType.CONTENT_TYPE_USER,
				actionType  : appActionType.ACTION_TYPE_RESEND_AUTHCODE,
				source      : 'nSCREEN'
			};

			var payLoadInfo = [ {
				unId : logInUser.unId,
				id : logInUser.id,
				password : logInUser.password,
				email: logInUser.email
			} ];

			var jsonObj = {
				header : headerInfo,
				payLoad : payLoadInfo
			};
			if(logInUser){
				jsonObj.header.senderId = logInUser.id;
			}
			jsonObj.header.source = 'nSCREEN';
			var jsonString = JSON.stringify(jsonObj, replacer);

			showProcessMessage('Sending Auth Code...');

			Ext.Ajax.request({
				url : LOGIN_URL,
				method : 'POST',
				params : jsonString,
				success : function(result, request) {
					setTimeout(function() {
						Ext.MessageBox.hide();
					}, 2000);
				},
				failure : function(result, request) {
					Ext.MessageBox.alert('Server Error', "Server Error");
				}
			});
		}
	},

	/*Md. Meher Dewan*/
	/*Create store for immidiate executive dashboard show after login*/
	/*loadExecutiveDashboardWindow:function (message){

		 if(!userRoles.containsKey(appConstants.FIELD_OFFICER) && !userRoles.containsKey(appConstants.SOURCE_OFFICER) 
                && !userRoles.containsKey(appConstants.BRANCH_MANAGER && !userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER) 
                && !userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))){
		 	
		 	ececutiveDashboardGlobalStores();

			Ext.create('Ext.window.Window', {
	        	id: 'executiveDashboardWin2',
	        	reference: 'executiveDashboardWin2',
	            title:'Executive Dashboard - ' + loginUser.firstName + ' ' + loginUser.lastName,
	            iconCls: 'dashboard-shortcut',
	            animCollapse:false,
	            constrainHeader:true,
	            layout: 'fit',
	            closable: true,
				draggable: true,
				resizable: true,
				width:1170,
				height:600,
	            items: [
	                {
	                    xtype: 'executiveDashboard'
	                }
	            ],
	            tools:[
	            	{
					   	xtype: 'button',
						text: 'Go To Main',
						align: 'left',
						iconCls: 'dashboard-shortcut',
					    handler: function(event){
					        this.up().up().close();
					        app.init(true);
					    }
					}
				],
				listeners: {
					afterrender: function (thisWindow) {
						new Desktop.ExecutiveDashboardWindow();
					},
					beforeclose: function (thisWindow) {
						app.init(true);
					}
				}
				
			}).show();
		}
	},*/


});
