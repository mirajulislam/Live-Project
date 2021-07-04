var loanConfigTab = null;
Ext.define('Desktop.view.admin.businessAdministration.businessAdminController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.admin-businessadministration-businessadmin',


	// rcv request
	onSuccess: function(request, response) {
		if (isMessageBox) {
			Ext.MessageBox.hide();
			isMessageBox = false;
		}

		var data = response.payload[1].payload;
		var requestRef = request.reference;
		var controller = request.sender;

		if (requestRef == 'nConfigStoreLoad') {
			loadDataInGlobalStore(data, 'nConfigStore');

			globalConfigStore = data;
		}
		else if (requestRef == 'onDocumentDataShow') {
			loadDataInGlobalStore(data, 'gDocConfigStore');
		}
		else if (requestRef == 'onLoanTypeDataShow') {
			loadDataInGlobalStore(data, 'gLoanTypeConfigStore');
		}
		else if (requestRef == 'onShowCustomerType') {
			loadDataInGlobalStore(data, 'gCustTypeConfigStore');
		}
		else if (requestRef == 'onConfigurationDataShow') {
			loadDataInGlobalStore(data, 'gConfigurationConfigStore');
		}
		else if (requestRef == 'onClickSaveNewDocument') {
			controller.onDocumentDataShow();
			controller.getView().close();
		}
		else if (requestRef == 'onClickSaveLoanType') {
			controller.onLoanTypeDataShow();
			controller.getView().close();
		}
		else if (requestRef == 'SaveNewCustomerType') {
			controller.onShowCustomerType();
			controller.getView().close();
		}
		else if (requestRef == 'onClickSaveNewConfiguration') {
			controller.onConfigurationDataShow();
			controller.getView().close();
		}
		else if (requestRef == 'configSearchGrid') {
			controller.getView().close();
			loadDataInGlobalStore(data, 'nConfigStore');
			globalConfigStore = data;
		}
		else if (requestRef == 'loadLoanConfig' || requestRef == 'onSrchLoanConfig') {
			makeLoanConfigAccordion(controller.getView(), data);
		}
		else if(requestRef == 'onSearchRoleType'){
			loadDataInGlobalStore(data, 'gAssignedStateStore');
		}
		else if(requestRef == 'onSearchRoleType2'){
			loadDataInGlobalStore(data, 'gAvailableStateStore');
		}
		else if(requestRef == 'onRoleToStateMapSaveBtn'){
			var loginController = new Desktop.view.admin.businessAdministration.businessAdminController();
			loginController.onSearchRoleType();
		}
		else if(requestRef == 'onRoleToStateMapRmvBtn'){
			var loginController = new Desktop.view.admin.businessAdministration.businessAdminController();
			loginController.onSearchRoleType();
		}
		else if(requestRef == 'loadCustomerType'){
			loadDataInGlobalStore(data, 'gCustTypeStore');
		}
		else if(requestRef == 'loadLoanType'){
			loadDataInGlobalStore(data, 'gLoanTypeStore');
		}
		else if(requestRef == 'loadRoleType'){
			loadDataInGlobalStore(data, 'gRoleTypeStore');
		}
		else if(requestRef == 'onUpdateLoanConfig'){
			controller.loadLoanConfig();
		}
		else if(requestRef == 'onNewDocMapShow'){
			var store = controller.getView().lookupReference('newDocumentMapGrid').store;
			store.removeAll();
			store.add(data);
		}
		else if(requestRef == 'onClickConfigurationRefetch'){
			if(data){
				Ext.MessageBox.alert('Success', 'Refetching Configuration is successful.');
			}
			else{
				Ext.MessageBox.alert('Error', 'Refetching Configuration is unsuccessful.');
			}
		}
	},

	// send json request
	sendRequest: function(actionName, contentType, payload, header) {

		if (Ext.isEmpty(payload)) {
			payload = new Array();
		}
		header.appName = gAppName;
		header.envId = gEnvId;
		header.senderId = loginUser.id;
		header.destination = SERVER_URL;

		var request = {
			actionName: actionName,
			contentType: contentType,
			requestId: null,
			requestType: null,
			header: header,
			body: payload,
			message: null,
			dispatchType: null,
			sender: this,
			component: payload[0].reference,
			reference: header.reference,
			onSuccess: this.onSuccess,
			onError: this.onError,
			onStatusUpdate: this.onStatusUpdate,
			destination: SERVER_URL
		};

		var requestId = nMessageProcessor.sendRequest(request);
	},

	onActiveBusinessAdmin: function(cmp, eOpts){
		if(!userRoles.containsKey(appConstants.NAZTECH_ADMIN)){
			hideActionColumn(cmp.down('configuration').lookupReference('configurationGridRef'), 'configurationDelRef');
		}
	},

	onBusinessAdminTabChange:function(tabPanel, newCard, oldCard, eOpts){
	   
		if(newCard.getReference() == 'documentsTabRef'){
			this.onDocumentDataShow();
		} 
		else  if(newCard.getReference() == 'loanTypesTabRef'){
			this.onLoanTypeDataShow();
		}  
		else if(newCard.getReference() == 'customerTypeTabRef'){
			this.onShowCustomerType();
		}  
		else if(newCard.getReference() == 'configurationTabRef'){
			this.onConfigurationDataShow();
		}
		else if(newCard.getReference() == 'loanConfigTabRef'){
			this.loadLoanConfig();
		}
		else if(newCard.getReference() == 'roleToStateMapTabRef'){
			this.onShowRoleToStateMap(); 
		}
	},

	onLoanConfigShow: function(){
		var me = this;

		me.loadLoanConfig();
		me.loadCustomerType();
		me.loadLoanType();
		me.loadRoleType();
		showProcessMessage('Loading...');
	},

	loadLoanConfig: function(){
		var header = {
			reference: 'loadLoanConfig'
		};

		var payload = [
			{
				userModKey: loginUser.id
			}
		];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_CONFIG, appContentType.CONTENT_TYPE_LOAN_CONFIG, payload, header);
	},

	onDocumentTypeUpdate: function(component, eOpts) {

		var documentTypeCombo = this.lookupReference('documentTypeCombo');
		var documentTypeTextfield = this.lookupReference('documentTypeTextfield');

		if(documentTypeCombo.getValue() == 'OTHERS'){
			documentTypeTextfield.show();
			//Ext.getCmp('fieldId').setCls('updateColor');
		}
		else{
			documentTypeTextfield.hide();
		}
	},
	
	onClickAddNewDocument: function(component, eOpts) {
		var newDocumentAddFormPanel = Ext.create('Desktop.view.admin.businessAdministration.addNewDocumentPopup');
		newDocumentAddFormPanel.show();
	},

	onDocumentDataShow: function(button, e, eOpts){
		var me = this;
		var header = {
			reference: 'onDocumentDataShow'
		};
		var payload = [{
			group : appConstants.DOCUMENT,
			subGroup : appConstants.DOCUMENT_TYPE,
			userModKey: loginUser.id,
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);  
		showProcessMessage('Loading...');             
	}, 

	onClickSaveNewDocument:function(button, e, eOpts){
		
		var me = this;
		var id = me.lookupReference('configurationIdRef').value;
		var configVerRef = me.lookupReference('configurationVerRef').value;
		var newDocument = me.lookupReference('documentType').value;
		var newDocumentValue = newDocument.toUpperCase();
		var isDefault = me.lookupReference('isDefault').value;
		var mandatoryForAllLoan = me.lookupReference('mandatoryForAllLoan').value;
		var action = appActionType.ACTION_TYPE_SELECT_SAVE;
		var configId = null;

		if(!newDocument)
		{
			Ext.Msg.alert("Error", "Document type should not be empty");
			return;
		}
		
		if (button.text == 'Update') {
			action = appActionType.ACTION_TYPE_UPDATE;
			configId = id;
			showProcessMessage('Updating Data...');
		}
		else if(button.text == 'Save'){
			showProcessMessage('Saving Data...');
		}

		var index = getGlobalStore('gDocConfigStore').findExact('value1',newDocument);
		if(index >= 0){
			Ext.Msg.alert("Error", "Document is already exist.");
			return;
		}

		var header = {
			reference: 'onClickSaveNewDocument'
		};
		var payload1 = [{
			group : appConstants.DOCUMENT,
			subGroup : appConstants.DOCUMENT_TYPE,
			value1: newDocument,
			value2: isDefault,
			value3: mandatoryForAllLoan,
			userModKey: loginUser.id,
			configurationVer 	: Ext.isEmpty(configVerRef)?null:configVerRef,
			configurationId 	: configId
		}];
		this.sendRequest(action, appContentType.CONTENT_TYPE_NCONFIGURATION, payload1, header);               
		
		this.onDocumentDataShow();
	},

	onDocumentGridItemDblClick: function (component, record){

		var updatePanel = Ext.create('Desktop.view.admin.businessAdministration.addNewDocumentPopup');
		var id = updatePanel.lookupReference('configurationIdRef');
		var configVer = updatePanel.lookupReference('configurationVerRef');
		var isDefaultCbox = updatePanel.lookupReference('isDefault');
		var mandatoryForAllLoan = updatePanel.lookupReference('mandatoryForAllLoan');
		var updateBtn = updatePanel.lookupReference('documentBtnRef');

		id.setValue(record.data.configurationId);
		configVer.setValue(record.data.configurationVer);
		updatePanel.lookupReference('documentType').setValue(record.data.value1);
		record.data.value2 == "true" ? isDefaultCbox.setValue(true):isDefaultCbox.setValue(false);
		record.data.value3 == "true" ? mandatoryForAllLoan.setValue(true):mandatoryForAllLoan.setValue(false);
		
		updatePanel.setTitle('Update Entity');
		updateBtn.setText('Update');
		updatePanel.show();
		
	},

	onGridFilterDocument: function(component, newValue, oldValue, eOpts) {

		/* Admin controller Main Grid */
		//var grid = this.lookupReference("DocumentTypeGridRef");
		var grid = component.up('grid');

		grid.store.clearFilter(true);

		if (newValue) {

			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");

			grid.store.filter({
				filterFn: function(record) {
					if(record.get('value2') == 'true')
					{
						var value2 = 'yes';
					}
					else if (record.get('value2') == 'false') {
						
						var value2 = 'no';
					}
					if(record.get('value3') == 'true')
					{
						var value3 = 'yes';
					}
					else if (record.get('value3') == 'false') {
						
						var value3 = 'no';
					}
					return matcher.test(record.get('value1')) ||
						matcher.test(value2) ||
						matcher.test(value3) ||
						matcher.test(record.get('dttMod')) ||
						matcher.test(record.get('modifiedBy'));
				}
			});
		}
		component.focus();
	},

	// loanType start working
	onClickAddNewLoanType: function(component, eOpts) {
		var newLoanTypeAddFormPanel = Ext.create('Desktop.view.admin.businessAdministration.addNewLoanTypePopup');
		newLoanTypeAddFormPanel.show();
	},
   
	onLoanTypeDataShow: function(button, e, eOpts){
		var me = this;
		var header = {
			reference: 'onLoanTypeDataShow'
		};
		var payload = [{
			group : appConstants.LOAN,
			subGroup : appConstants.LOAN_TYPE,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);      
		showProcessMessage('Loading...');         
   }, 

  // loan type if double click show popup
	onLoanTypeGridItemDblClick: function(component, record ) {
		var updatePanel = Ext.create('Desktop.view.admin.businessAdministration.addNewLoanTypePopup');
		var idPopupRef = updatePanel.lookupReference('configurationIdRef');
		var loanType = updatePanel.lookupReference('loanType');
		var updateBtn = updatePanel.lookupReference('btnLoanTypeAdd');
		var defualtInterestRate = updatePanel.lookupReference('defualtInterestRate');
		var prefix = updatePanel.lookupReference('prefix');
		var configVer = updatePanel.lookupReference('configurationVerRef');

		idPopupRef.setValue(record.data.configurationId);
		configVer.setValue(record.data.configurationVer);
		loanType.setValue(record.data.value1);
		defualtInterestRate.setValue(record.data.value2);
		prefix.setValue(record.data.value3);
		updateBtn.setText('Update');
		updatePanel.setTitle('Update Loan Type');
		updatePanel.show();
	},
	//SaveLoanType start
	onClickSaveLoanType: function(button, e, eOpts){

		var me = this;
		var id = this.lookupReference('configurationIdRef').value;
		var loanType = this.lookupReference('loanType');
		var loanTypeVal =loanType.value.toUpperCase();
		var defualtInterestRate = this.lookupReference('defualtInterestRate').value;
		var prefix = this.lookupReference('prefix').value.toUpperCase();
		var configId = null;
		var configVerRef = 0;
		var action = appActionType.ACTION_TYPE_SELECT_SAVE;

		if(prefix.length != 3){
			Ext.Msg.alert("Error", "Prefix should be two character");
			return;
		}
		if(!loanTypeVal){
			Ext.Msg.alert("Error", "Loan type should not be empty");
			return;
		}

		if (button.text == 'Update') {
			action = appActionType.ACTION_TYPE_UPDATE;
			configId = id;
			configVerRef = this.lookupReference('configurationVerRef').value;
			showProcessMessage('Updating Data...');
		}
		else if(button.text == 'Save'){
			showProcessMessage('Saving Data...');
		}

		var loanTypeStore = getGlobalStore('gLoanTypeConfigStore');
		var index = loanTypeStore.findExact('value1',loanTypeVal);
		if(index >= 0){
			if(button.text == 'Update'){
				var data = loanTypeStore.getAt(index).data;
				if(data.configurationId != configId){
					Ext.Msg.alert("Error", "Loan type is already exist.");
					return;
				}
			}
			else{
				Ext.Msg.alert("Error", "Loan type is already exist.");
				return;
			}
		}

		//Send customer type id list to map with loan type
		var custmerTypeStore = getGlobalStore('gCustTypeStore');
		var custTypeIdList = this.getConfigList(custmerTypeStore);

		var header = {
			reference: 'onClickSaveLoanType'
		};
		var payload = [
			{
				group 			: appConstants.LOAN,
				subGroup 		: appConstants.LOAN_TYPE,
				value1 			: loanTypeVal,
				value2 			: defualtInterestRate,
				value3    		: prefix,
				userModKey 		: loginUser.id,
				configurationVer: configVerRef,
				configurationId : configId,
				configList 		: custTypeIdList
			}
		];
		
		this.sendRequest(action, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
	},
	//SaveLoanType end
	// loanType end working
 
	getConfigList: function(store){
		var allRecords = store.data, list = [];

		allRecords.each(function(record) {
			list.push(record.data.configurationId);
		});

		return list;
	},

	onClickAddCustomerType: function(component, eOpts) {
		var customerTypesPanel = Ext.create('Desktop.view.admin.businessAdministration.CustomerTypePopup');
		customerTypesPanel.show();
	},

	onCancelCustomerTypePopup: function(button, e, eOpts) {
		button.up().up().close();
	},

	onShowCustomerType: function(button, e, eOpts){
		var me = this;
		var header = {
			reference: 'onShowCustomerType'
		};
		var payload = [{
			group : appConstants.CUSTOMER,
			subGroup : appConstants.CUSTOMER_TYPE,
			userModKey: loginUser.id,
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);       
		showProcessMessage('Loading...');        
   },
//Tarek
   onShowRoleToStateMap: function(button, e, eOpts){
		var me = this;
		var header = {
			reference: 'onShowRoleToStateMap'
		};
		var payload = [{
			group : appConstants.CUSTOMER,
			subGroup : appConstants.CUSTOMER_TYPE,
			userModKey: loginUser.id,
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);       
		showProcessMessage('Loading...');        
   },

	onClickSaveCustomerType: function(button, e, eOpts){
		var me = this;
		var newCustomerType = this.lookupReference('newCustomerTypeRef').value.toUpperCase();
		var ctGrid = this.lookupReference('customerTypeGridRef');
		var id = this.lookupReference('configurationIdRef').value;
		var configVerRef = 0;
		var configId = null;
		var action = appActionType.ACTION_TYPE_SELECT_SAVE;

		if(!newCustomerType){
			Ext.Msg.alert("Error", "Customer type should not be empty");
			return;
		}

		if (button.text == 'Update') {
			action = appActionType.ACTION_TYPE_UPDATE;
			configId = id;
			configVerRef = this.lookupReference('configurationVerRef').value;
			showProcessMessage('Updating Data...');
		}
		else if(button.text == 'Save'){
			showProcessMessage('Saving Data...');
		}

		var index = getGlobalStore('gCustTypeConfigStore').findExact('value1',newCustomerType);
		if(index >= 0){
			Ext.Msg.alert("Error", "Customer type is already exist.");
			return;
		}

		//Send loan type id list to map with customer type
		var loanTypeStore = getGlobalStore('gLoanTypeStore');
		var loanTypeIdList = this.getConfigList(loanTypeStore);

		var header = {
			reference: 'SaveNewCustomerType'
		};
		var payload = [
			{
				group 				: appConstants.CUSTOMER,
				subGroup 			: appConstants.CUSTOMER_TYPE,
				value1 				: newCustomerType,
				userModKey 			: loginUser.id,
				configurationVer 	: configVerRef,
				configurationId 	: configId,
				configList 			: loanTypeIdList
			}
		];

		this.sendRequest(action, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);          
	},

	onUpdateLoanConfig: function(btn, e, eOpts){
		var btnRef = btn.reference, me = this, docMapList = [];
		
		var index = btnRef.charAt(btnRef.length - 1);

		var loanConfigId 	= me.lookupReference('loanConfigId_' + index).value,
		loanConfigVerRef 	= me.lookupReference('loanConfigVer_' + index),
		loanConfigVer 		= loanConfigVerRef.value,
		interestRate 		= me.lookupReference('interestRate_' + index).value,
		docMapStore 		= me.lookupReference('documentMappingGrid_' + index).store;

		if(docMapStore.count() > 0){

			var filteredData = docMapStore.data.items;

			for(var i =0; i < filteredData.length; i++){
				var data = filteredData[i].data;
				
				if(data.isMandatoryForAllLoans == 0){
					var docMap = {
						loanDocMapId 	: data.loanDocMapId,
						//loanConfigId 	: data.loanConfigId,
						//docId 			: data.docId,
						isMandatory 	: data.isMandatory
					};

					docMapList.push(docMap);
				}
			}
		}

		var header = {
			reference: 'onUpdateLoanConfig',
			cmpRef: loanConfigVerRef.referenceKey
		};

		var payload = [
			{
				userModKey 		: loginUser.id,
				loanConfigId 	: loanConfigId,
				loanConfigVer 	: loanConfigVer,
				interestRate 	: checkIsEmpty(interestRate),
				loanDocMapList 	: docMapList
			}
		];

		this.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_LOAN_CONFIG, payload, header);
	
		showProcessMessage('Updating...');
	},

	loadLoanType: function(){
		var header = {
			reference: 'loadLoanType'
		};
		var payload = [{
			group : appConstants.LOAN,
			subGroup : appConstants.LOAN_TYPE,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
	},

	loadRoleType: function(){
		var header = {
			reference: 'loadRoleType'
		};
		var payload = [{
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_ROLE_TYPE, appContentType.CONTENT_TYPE_USER_NEW, payload, header);
	},


	loadCustomerType: function(){
		var header = {
			reference: 'loadCustomerType'
		};
		var payload = [{
			group : appConstants.CUSTOMER,
			subGroup : appConstants.CUSTOMER_TYPE,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
		showProcessMessage('Loading...');
	},

	onGridFilterLoanType: function(component, newValue, oldValue, eOpts) {

		/* Admin controller Main Grid */
		var grid = this.lookupReference("loanTypeGridRef");

		grid.store.clearFilter();

		if (newValue) {

			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");

			grid.store.filter({
				filterFn: function(record) {
					return matcher.test(record.get('value1')) ||
						matcher.test(record.get('value2')) ||
						matcher.test(record.get('dttMod')) ||
						matcher.test(record.get('modifiedBy'));
				}
			});
		}
		component.focus();
	},

	onCustomerTypeGridItemDblClick : function(component, record ) {
		var updatePanel = Ext.create('Desktop.view.admin.businessAdministration.CustomerTypePopup');
		var id = updatePanel.lookupReference('configurationIdRef');
		var configVer = updatePanel.lookupReference('configurationVerRef');
		var cusType = updatePanel.lookupReference('newCustomerTypeRef');
		var saveBtn = updatePanel.lookupReference('customerTypeSaveBtn');
		

		id.setValue(record.data.configurationId);
		configVer.setValue(record.data.configurationVer);
		cusType.setValue(record.data.value1);
		saveBtn.setText('Update');

		updatePanel.show();
	},

	onGridFilterCustomerType: function(component, newValue, oldValue, eOpts) {

		/* Admin controller Main Grid */
		var grid = this.lookupReference("customerTypeGridRef");

		grid.store.clearFilter();

		if (newValue) {

			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");

			grid.store.filter({
				filterFn: function(record) {
					return matcher.test(record.get('value1')) ||
						matcher.test(record.get('dttMod')) ||
						matcher.test(record.get('modifiedBy'));
				}
			});
		}
		component.focus();
	},

	onGridFilterAvailableState: function(component, newValue, oldValue, eOpts) {

		//var grid = this.lookupReference("roleTypeGridRef");
		var grid = component.up('grid');

		grid.store.clearFilter();

		if (newValue) {

			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");

			grid.store.filter({
				filterFn: function(record) {
					return matcher.test(record.get('stateId')) ||
						matcher.test(record.get('stateName')) ||
						matcher.test(record.get('statePermission'));
				}
			});
		}
		component.focus();
	},

	onGridFilterAvailableState2: function(component, newValue, oldValue, eOpts) {

		//var grid = this.lookupReference("roleTypeGridRef2");
		var grid = component.up('grid');

		grid.store.clearFilter();

		if (newValue) {

			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");

			grid.store.filter({
				filterFn: function(record) {
					return matcher.test(record.get('stateId')) ||
						matcher.test(record.get('stateName')) ||
						matcher.test(record.get('statePermission'));
				}
			});
		}
		component.focus();
	},

	onConfigurationDataShow: function(button, e, eOpts){
		var me = this;
		var header = {
			reference: 'onConfigurationDataShow'
		};
		var payload = [{

			userModKey: loginUser.id,
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);   
		showProcessMessage('Loading...');            
	},

	onClickAddNewConfiguration: function(component, eOpts) {
		var newConfigurationAddPanel = Ext.create('Desktop.view.admin.businessAdministration.addNewConfigurationPopup');
		newConfigurationAddPanel.show();
	},

	onClickSaveNewConfiguration:function(button, e, eOpts){
		
		var me = this;
		var id = me.lookupReference('configurationIdRef').value;
		var newGroup = me.lookupReference('group').value;
		var newGroupValue = newGroup.toUpperCase();
		var newSubGroup = me.lookupReference('subgroup').value;
		var newSubGroupValue = newSubGroup.toUpperCase();
		var newName = me.lookupReference('name').value;
		var newNameValue = newName.toUpperCase();
		var value1 = me.lookupReference('value1').value;
		var value2 = me.lookupReference('value2').value;
		var value3 = me.lookupReference('value3').value;
		var action = appActionType.ACTION_TYPE_SELECT_SAVE;
		var configId = null;
		var configVerRef = 0;

		if(!newGroup)
		{
			Ext.Msg.alert("Error", "Group should not be empty");
			return;
		}
		else if (!newSubGroup) {
			Ext.Msg.alert("Error", "Sub Group should not be empty");
			return;
		}	

		if(newNameValue){
			var flag = false;
			var items = getGlobalStore('gConfigurationConfigStore').data.items;
			for (var i = 0; i < items.length; i++) {
				if(items[i].data.group == newGroupValue 
					&& items[i].data.subGroup == newSubGroupValue 
					&& items[i].data.name == newNameValue){
					flag = true;
					break;
				}
			}
			if(flag){
				Ext.Msg.alert("Error", "Name is provided, Combination of Group, Sub Group, Name must be unique.");
				return;
			}
		}

		if (button.text == 'Update') {
			action = appActionType.ACTION_TYPE_UPDATE;
			configId = id;
			configVerRef = this.lookupReference('configurationVerRef').value;
			showProcessMessage('Updating Data...');
		}
		else if(button.text == 'Save'){
			showProcessMessage('Saving Data...');
		}

		var header = {
			reference: 'onClickSaveNewConfiguration'
		};
		var payload1 = [{
			group : newGroupValue,
			subGroup : newSubGroupValue,
			name : newNameValue,
			value1: value1,
			value2: value2,
			value3: value3,
			userModKey: loginUser.id,
			configurationVer 	: configVerRef,
			configurationId 	: configId,
		}];
		this.sendRequest(action, appContentType.CONTENT_TYPE_NCONFIGURATION, payload1, header);
	},

	onConfigurationDblClick: function (component, record){

		var updatePanel = Ext.create('Desktop.view.admin.businessAdministration.addNewConfigurationPopup');
		var id = updatePanel.lookupReference('configurationIdRef');
		var configVer = updatePanel.lookupReference('configurationVerRef');
		var group = updatePanel.lookupReference('group');
		var subgroup = updatePanel.lookupReference('subgroup');
		var newName = updatePanel.lookupReference('name');
		var value1 = updatePanel.lookupReference('value1');
		var value2 = updatePanel.lookupReference('value2');
		var value3 = updatePanel.lookupReference('value3');
		var updateBtn = updatePanel.lookupReference('configurationBtnRef');

		id.setValue(record.data.configurationId);
		configVer.setValue(record.data.configurationVer);
		group.setValue(record.data.group);
		subgroup.setValue(record.data.subGroup);
		newName.setValue(record.data.name);
		updatePanel.lookupReference('value1').setValue(record.data.value1);
		updatePanel.lookupReference('value2').setValue(record.data.value2);
		updatePanel.lookupReference('value3').setValue(record.data.value3);
		
		updatePanel.setTitle('Update Entity');
		updateBtn.setText('Update');
		updatePanel.show();
		
	},

	onGridFilterConfiguration: function(component, newValue, oldValue, eOpts) {

		/* Admin controller Main Grid */
		// var grid = this.lookupReference("ConfigurationGridRef");
		 var grid = component.up('grid');

		grid.store.clearFilter();

		if (newValue) {

			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");

			grid.store.filter({
				filterFn: function(record) {
					return matcher.test(record.get('group')) ||
						matcher.test(record.get('subGroup')) ||
						matcher.test(record.get('name')) ||
						matcher.test(record.get('value1')) ||
						matcher.test(record.get('value2')) ||
						matcher.test(record.get('value3')) ||
						matcher.test(record.get('dttMod')) ||
						matcher.test(record.get('modifiedBy'));
				}
			});
		}
		component.focus();
	},

	// onKeyPress: function(field, e){
 //        if (e.getKey() == e.ENTER) {
 //           this.onClickConfigurationSearch(field, e);
 //        }
    // },
    
	onSrchLoanConfig: function(btn, e, eOpts){
		var customerTypeId 	= this.lookupReference('customerType').value,
			loanTypeId 		= this.lookupReference('loanType').value;

		if(Ext.isEmpty(customerTypeId) && Ext.isEmpty(loanTypeId)){
			Ext.Msg.alert("Warning", "Loan type or customer type is required");
			return;
		}

		var header = {
			reference: 'onSrchLoanConfig'
		};

		var payload = [
			{
				userModKey 		: loginUser.id,
				customerTypeId 	: customerTypeId,
				loanTypeId 		: loanTypeId
			}
		];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_CONFIG, appContentType.CONTENT_TYPE_LOAN_CONFIG, payload, header);

	},

	onSearchRoleType: function(btn, e, eOpts){
		var roleId 	= this.lookupReference('roleType').value;

		if(Ext.isEmpty(roleId)){
			Ext.Msg.alert("Warning", "Role type is required");
			return;
		}

		var header = {
			reference: 'onSearchRoleType'
		};

		var header2 = {
			reference: 'onSearchRoleType2'
		};

		var payload = [
			{
				userModKey 		: loginUser.id,
				roleId 			: roleId
			}
		];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_ASSIGNED_STATE, appContentType.CONTENT_TYPE_USER_NEW, payload, header);
		this.sendRequest(appActionType.ACTION_TYPE_SELECT_AVAILABLE_STATE, appContentType.CONTENT_TYPE_USER_NEW, payload, header2);

	},


	onClrLoanConfig: function(btn, e, eOpts){
		this.lookupReference('customerType').reset();
		this.lookupReference('loanType').reset();

		this.loadLoanConfig();
	},

	onClearRoletype: function(btn, e, eOpts){
		this.lookupReference('roleType').reset();

		this.onShowRoleToStateMap();
	},

	onAssignStateSaveBtn: function(btn, e, eOpts){
		
		var roleId 	= this.lookupReference('roleType').value;
		
		 var stateList = [];

		 var data = this.lookupReference('roleTypeGridRef').store.data;

		 for(var i = 0; i < data.length; i++ ){
		 		stateList.push(data.items[i].data);
		 }

		 var payload = [
			 {
			 	stateList : stateList,
			 	userModKey : loginUser.id,
			 	roleId : roleId
			 }
		];


		var header = {
			reference: 'onRoleToStateMapSaveBtn'
		};

		this.sendRequest(appActionType.ACTION_TYPE_ADD_AVAILABLE_STATE, appContentType.CONTENT_TYPE_USER_NEW, payload, header);
	},

	onAssignStateRmvBtn: function(btn, e, eOpts){
    
		 var roleId 	= this.lookupReference('roleType').value;
	     var stateId =this.lookupReference('roleTypeGridRef').getSelectionModel().getSelection()[0].data.stateId;

		 var payload = [
			 {
			 	stateId : stateId,
			 	userModKey : loginUser.id,
			 	roleId : roleId
			 }
		];

		var header = {
			reference: 'onRoleToStateMapRmvBtn'
		};

		this.sendRequest(appActionType.ACTION_TYPE_REMOVE_AVAILABLE_STATE, appContentType.CONTENT_TYPE_USER_NEW, payload, header);
	
		var store = this.lookupReference('roleTypeGridRef').store;
		var store2 = this.lookupReference('roleTypeGridRef2').store;

		store2.add(this.lookupReference('roleTypeGridRef').getSelectionModel().getSelection()[0]);
		store.remove(this.lookupReference('roleTypeGridRef').getSelectionModel().getSelection()[0]);

		store.sync();
		store2.sync();
	},

	onavailableSateAddBtn: function(btn, e, eOpts){

		var store = this.lookupReference('roleTypeGridRef2').store;
		var store2 = this.lookupReference('roleTypeGridRef').store;

		store2.add(this.lookupReference('roleTypeGridRef2').getSelectionModel().getSelection()[0]);
		store.remove(this.lookupReference('roleTypeGridRef2').getSelectionModel().getSelection()[0]);

		store.sync();
		store2.sync();
	},

	onDelConfig: function(grid, rowIndex, colIndex, btn){
		var me = this, store, btnRef = btn.reference;

		if(btnRef == 'custDelRef'){
			store = me.lookupReference('customerTypeGridRef').store;
		}
		else if(btnRef == 'loanDelRef'){
			store = me.lookupReference('loanTypeGridRef').store;
		}
		else if(btnRef == 'docDelRef'){
			store = me.lookupReference('documentTypeGridRef').store;
		}
		else if(btnRef == 'configurationDelRef'){
			store = me.lookupReference('configurationGridRef').store;
		}

		var data = store.getAt(rowIndex).data;
		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
					if (btn == 'yes') {

					var header = {
						reference: 'onDelConfig'
					};
					
					var payload = [
						{
							userModKey 		: loginUser.id,
							configurationId : data.configurationId,
							configurationVer: data.configurationVer,
							group 			: data.group,
							subGroup		: data.subGroup
						}
					];

					me.sendRequest(appActionType.ACTION_TYPE_DELETE, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
					
					store.removeAt(rowIndex);
					store.sync(); 
				}
			 }
		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);
	},

	onAddLoanDocMap: function(btn, e, eOpts){
		var btnRef = btn.reference, index = btnRef.split('_')[1];
		var loanConfigId = this.lookupReference('loanConfigId_' + index).value;

		loanConfigTab = this;

		var newDocMap = Ext.widget('newDocMap');

		newDocMap.lookupReference('loanConfigId').setValue(loanConfigId);
		newDocMap.lookupReference('docMappingGridRef').setValue('documentMappingGrid_' + index);

		newDocMap.show();

		showProcessMessage('Loading...');

	},

	onCancelDocMap: function(btn, e, eOpts){
		this.view.destroy();
	},

	onNewDocMapBtn: function(btn, e, eOpts){
		var btnRef = btn.reference, me = this, docMapList = [];

		var selection = me.lookupReference('newDocumentMapGrid').getSelectionModel().selected.items;
		var docMappingGridRef = me.lookupReference('docMappingGridRef').value;

		if(selection.length > 0){
			for(var i = 0; i < selection.length; i++ ){
				
				var data = selection[i].data, isActive = null, isMandatory = null;

				var docMap = {
						loanDocMapId 	: data.loanDocMapId,
						isMandatory 	: 1,
						active       	: 1
					};

				docMapList.push(docMap);
			}
		}
		
		var header = {
				reference: 'onNewDocMapBtn'
			};

		var payload = [
			{
				userModKey 		: loginUser.id,
				loanDocMapList 	: docMapList
			}
		];


		me.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_LOAN_DOC_MAP, payload, header);

		me.view.destroy();

		loanConfigTab.lookupReference(docMappingGridRef).store.add(selection);

		loanConfigTab = null; 
	},

	onDocMapSelChng: function(cmp, records, eOpts){

		var btn = this.lookupReference('newDocMapBtn');

		if(records.length > 0){
			btn.setDisabled(false);
		}
		else{
			btn.setDisabled(true);
		}
	},

	onNewDocMapShow: function(cmp){

		var loanConfigId = cmp.lookupReference('loanConfigId').value;
		var header = {
				reference: 'onNewDocMapShow'
			};

		var payload = [
			{
				userModKey 		: loginUser.id,
				loanConfigId 	: loanConfigId
			}
		];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_DOC_MAP, appContentType.CONTENT_TYPE_LOAN_DOC_MAP, payload, header);
		
	},

	onDelLoanDocMap: function(grid, rowIndex, colIndex){

		var me = this;
		var store = grid.store;
		var data = store.getAt(rowIndex).data;
		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
					if (btn == 'yes') {
					var header = {
						reference: 'onDelLoanDocMap'
					};
					var payload = [{
						userModKey 		: loginUser.id,
						loanDocMapId 	: data.loanDocMapId
					}];

					me.sendRequest(appActionType.ACTION_TYPE_DELETE, appContentType.CONTENT_TYPE_LOAN_DOC_MAP, payload, header);

					store.removeAt(rowIndex); 
				}
			 }
		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);		
	},

	onCheckLaonDocMap: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
		if(e.target.type && e.target.type === 'checkbox') {
			let checkVal = e.target.checked ? 1 : 0;
			record.set('isMandatory', checkVal);
			showProcessMessage('Loading...');

		}
	},

	onClickConfigurationRefetch : function(cmp, eOpts){
		var header = {
			reference: 'onClickConfigurationRefetch'
		};

		var payload = [
			{
				userModKey: loginUser.id
			}
		];

		this.sendRequest(appActionType.ACTION_TYPE_REFETC_N_CONFIGURATION, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);

	}

});

function makeLoanConfigAccordion(view, data){

	if(view.reference != "loanConfigTabRef"){
	   view = view.lookupReference("loanConfigTabRef");
	}
	
	var existingAccordion = view.lookupReference('loanConfigAccordionRef').items.items;
	

	if(existingAccordion){
		view.lookupReference('loanConfigAccordionRef').removeAll();
	}

	for(var i = 0; i< data.length; i++){

		var interestRate = null;

		if(Ext.isEmpty(data[i].interestRate) || data[i].interestRate == 0){
			interestRate = data[i].defaultInterestRate;
		}
		else{
			interestRate = data[i].interestRate;
		}

		/*Document Mapping Grid*/
		var docMapGridStore  =  Ext.create('Ext.data.Store', {
				model: 'Desktop.model.LoanDocMap'
			});
		
		docMapGridStore.clearFilter();
		docMapGridStore.removeAll();
		docMapGridStore.add(data[i].loanDocMapList);

		docMapGridStore.sort('isMandatoryForAllLoans', 'ASC');
		var accordionPanel = {
			xtype: 'panel',
			reference: 'loanConfigAccordion_' + i,
			title: createTitle(data[i]),
			items: [
				{
					xtype: 'fieldcontainer',
					columnWidth: 1,
					layout: {
						type: 'column',
						align: 'stretch'
					},
					margin: '15 0 10 10',
					items : [
						{
							xtype: 'displayfield',
							fieldLabel: 'loanConfigId',
							name: 'loanConfigId',
							reference: 'loanConfigId_' + i,
							value: data[i].loanConfigId,
							hidden: true
						}, 
						{
							xtype: 'displayfield',
							fieldLabel: 'loanConfigVer',
							name: 'loanConfigVer',
							reference: 'loanConfigVer_' + i,
							value: data[i].loanConfigVer,
							hidden: true
						},
						{
							xtype : 'fieldcontainer',
							layout : 'column',
							columnWidth : 1,
							items: [
								{
									xtype : 'fieldcontainer',
									columnWidth : .33,
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: 'Loan Type',
											name: 'loanType',
											reference: 'loanType_' + i,
											value: data[i].loanType,
											labelWidth: 65
										}
									]
								},
								{
									xtype : 'fieldcontainer',
									columnWidth : .33,
									margin: '0 0 0 100',
									items: [
										{
											xtype: 'displayfield',
											fieldLabel: 'Customer Type',
											name: 'customerType',
											reference: 'customerType_' + i,
											value: data[i].customerType,
											labelWidth: 90
										}
									]
								},
								{
									xtype : 'fieldcontainer',
									columnWidth : .33,
									margin: '0 0 0 100',
									items: [
										{
                                            xtype: 'numberfield',
                                            xtype: 'textfield',
                                            fieldLabel: 'Interest Rate(%)',
                                            name: 'interestRate',
                                            reference: 'interestRate_' + i,
                                            value: interestRate,
                                            labelWidth: 100,
                                            minValue: 0,
                                            format: '0.0',
                                            maskRe: /[0-9.-]/,
                                            validator: function(v) {
                                                return /^-?[0-9]*(\.[0-9]{1,2})?$/.test(v)? true : 'Only positive/negative float (x.yy)/int formats allowed!';
                                            },
                                            listeners: {
                                                change: function(e, text, prev) {
                                                    if (!/^-?[0-9]*(\.[0-9]{0,2})?$/.test(text)) 
                                                    {   
                                                        this.setValue(prev);
                                                    }
                                                }
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
					margin: '0 0 10 10',
					title: 'Document Mapping',
					scrollable: false,
					items:[
						{
							reference:'documentMappingGrid_' + i,
							xtype: 'gridpanel',
							store: docMapGridStore,
							height: 250,
							stripeRows : true,
							columnLines: true,
							border: false,
							columns: [
								{
									text: 'Loan Doc Id',
									dataIndex: 'loanDocMapId',
									align: 'center',
									sortable: true,
									hidden: true,
									filter: {
										type: 'list'
									}
								},
								{
									text: 'Loan Doc Ver',
									dataIndex: 'loanDocMapVer',
									align: 'center',
									sortable: true,
									hidden: true
								},
								{
									text: 'Loan Config Id',
									dataIndex: 'loanConfigId',
									align: 'center',
									sortable: true,
									hidden: true,
									filter: {
										type: 'list'
									}
								},
								{
									text: 'User Mod Key',
									dataIndex: 'userModKey',
									align: 'center',
									sortable: true,
									hidden: true,
									filter: {
										type: 'list'
									}
								},
								{
									text: "Date Modified",
									xtype: 'datecolumn',
									align: 'center',
									format:'Y-m-d h:i:s A',
									width: 140,
									hidden: true,
									sortable: true,
									dataIndex: 'dttMod',
									filter: {
										type: 'date'
									}
								},
								{
									text: 'Document Type',
									dataIndex: 'docType',
									align: 'center',
									sortable: true,
									flex: 1,
									filter: {
										type: 'list'
									}
								},
								{
									text: 'Is Mandatory',
									dataIndex: 'isMandatory',
									align: 'center',
									flex: 1,
									sortable: true,
									editor: {
										xtype: 'checkbox',
										inputValue: 1,
										uncheckedValue: 0
									},
									renderer: function(value, metadata, record, rowIndex, colIndex, store) {
										var tempVal = '', disabled = '', me = this;
										if (value === 1) {
											tempVal = 'checked';

											if(record.get('isMandatoryForAllLoans') == 1){
												disabled = 'disabled';
											}
										}
										return "<input name=" + record.get('id') + "_" + record.get('id') + " type='checkbox'" + tempVal + " " + disabled +">";
									}
								},
								{
									text: 'Is Default',
									dataIndex: 'isDefault',
									align: 'center',
									sortable: true,
									hidden: true,
									filter: {
										type: 'list'
									},
									renderer : function(value){
										if(value == 1){
											return 'Yes';
										}
										else{
											return 'No';
										}
									}
								},
								{
									text: 'Is Mandatory for all Loans',
									dataIndex: 'isMandatoryForAllLoans',
									align: 'center',
									sortable: true,
									hidden: true,
									filter: {
										type: 'list'
									},
									renderer : function(value){
										if(value == 1){
											return 'Yes';
										}
										else{
											return 'No';
										}
									}
								},
								{
									xtype: 'actioncolumn',
									text: 'Action',
									flex: 1,
									align: 'center',
									items: [
										{
											icon: 'login-cancel.png',
											tooltip: 'Delete',
											reference: 'loanDocMapDelBtn',
											handler: 'onDelLoanDocMap',
											getClass: function(value, meta, record) {
												if(record.get('isMandatoryForAllLoans') == 1){
													return 'x-disabled'; //'x-disabled' is custom css in app.css
												}
											}
										}
									]
								}
							],
							tbar:[
								{
									xtype: 'button',
									text: 'New',
									iconCls: 'add',
									reference:'loanDocMapAddBtn_' + i,
									listeners: {
										click: 'onAddLoanDocMap'
									}
								}
							],
							listeners: {
								cellclick: 'onCheckLaonDocMap'
							}
						}
					]
				}
			],
			dockedItems : [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					items : [
						'->',
						{
							xtype: 'button',
							text: 'Update',
							reference: 'loanConfigUpdtBtn_' + i,
							listeners: {
								click: 'onUpdateLoanConfig'
							}
						},
						'->'
					]
				}
			]
		};
		

		view.lookupReference('loanConfigAccordionRef').add(accordionPanel);
	}
}

function createTitle(data){
	var title = null;
	
	if(Ext.isEmpty(data.interestRate)  || data.interestRate == 0){
		title = data.loanType + ' > ' + data.customerType + ' > ' + data.defaultInterestRate +'% [DEFAULT INTEREST RATE]';
	}
	else{
		title = data.loanType + ' > ' + data.customerType + ' > ' + data.interestRate +'%';
	}

	return title;
}