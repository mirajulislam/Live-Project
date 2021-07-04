var resultFiler = new Array('loanTrackingId', 'loanGroupId','loanId', 'applicationNo', 'accountNo', 'idLoanTypeKey', 'idCustomerTypeKey', 'appliedLoanAmount', 'purposeOfLoan', 'interestRate', 'monthlyInstallment', 'mobile', 'customerIdKey', 'customerId', 'customerType', 'bpNo', 'customerName', 'designation', 'dateOfBirth', 'joiningDate', 'permanentAddr', 'officeAddr', 'nid', 'tin', 'maritalStatus', 'motherName', 'fatherName', 'spouse');
var fieldSetInIoanDetailsWinArr = new Array('personalInfoField', 'loanInfoField', 'existingLiabilitiesField', 'cibStatusFldSet', 'analystsComments', 'exceptionDetailsField', 'approvalFromHeadOffice', 'instrucationsToCAD', 'documenttation', 'commentsJustification', 'recmdFrmBranch', 'commentsWaiverSought', 'conditionFieldSet');
var headOfficeUserRoles = new Array('CAD','CEO','CREDIT_ANALYST','HO_CRM', 'MANAGING_DIRECTOR', 'MIS', 'RISK_MANAGER','UNIT_HEAD');

/*
	this loanDetailsWinToClose var is only created to close this window.
*/
var loanDetailsWinToClose;
var cibDetailsWinClose;
var addLoanToLoanGroupWindow;
var loanPanel = null;
Ext.define('Desktop.view.loan.LoanController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.loanPanel',

	// rcv request
	onSuccess: function (request, response) {
		var controller = request.sender;
		var headerRef = request.header.reference;

		if (isMessageBox) {
			Ext.MessageBox.hide();
			isMessageBox = false;
		}

		var data = response.payload[1].payload;

		if (headerRef == 'onActivateLoanPanelRender' || headerRef == 'onClickLoanSearch' ||
			headerRef == 'loadLoanGridData') {
			
			var statusTreePanel = controller.lookupReference('loanStatusTree');
            
            if(!statusTreePanel){
            	statusTreePanel= loanPanel.lookupReference('loanStatusTree');
            }

			if (statusTreePanel) {
				loadLoanStatusTree(data, statusTreePanel);
			}

			loadDataInGlobalStore(data, 'gLoanGridViewStore');		
			
			var check = controller.lookupReference('loanStatusGridRefresh');
			
			if(headerRef == 'loadLoanGridData' && check != null){
				//enable refresh button
				controller.lookupReference('loanStatusGridRefresh').setDisabled(false);
			}

		} 
		else if (headerRef == 'loadGroupGridPanelData'|| headerRef == 'loadSearchGroupGridPanelData') {
			loadDataInGlobalStore(data, 'gLoanGroupGridViewStore');

			var statusTreePanel = controller.lookupReference('loanStatusTree');
			if (statusTreePanel) {
				loadLoanStatusTree(data, statusTreePanel);
			}
			if(headerRef == 'loadGroupGridPanelData'){
				//enable refresh button
				controller.lookupReference('loanStatusGridRefresh').setDisabled(false);
			}
		}
		else if (headerRef == 'onClickHoCrmBulkSendToCad') {
			controller.loadGroupGridPanelData();
		}
		else if (headerRef == 'onCreateLoanGroup'  || headerRef == 'onAddLoanToLoanGroup' || headerRef == 'onLoanRemoveFromLoanGroup') {
			controller.loadGroupGridPanelData();
			Ext.toast('Action completed Succcessfully');
		}
		else if (headerRef == 'onLoanAddToLoanGroupDetailsPanelLoad') {
			loadDataInGlobalStore(data, 'gAddToLoanGroupGridViewStore');
		} 
		else if (headerRef == 'onClickSearchCustomer') {
			if (!data.customerIdKey) {
				Ext.MessageBox.alert('Alert', 'Customer not found.');
			} else {
				controller.lookupReference('personalInfoField').setExpanded(true);
				setCustomerInfo(controller.getView(), data);
				setCbblAccountNo(controller, data.accountNo);

				var customerType = controller.lookupReference('customerType').value;
				var hiddenCustomerType = controller.lookupReference('hiddenCustomerType').value;
				if (!customerType && hiddenCustomerType) {
					controller.loadCustomerType();
				}
			}
		} else if (headerRef == 'onClickSearchFO') {
			if (!data.customerIdKey) {
				Ext.MessageBox.alert('Alert', 'Customer not found.');
			} else {
				setCustomerObjForFOView(controller.getView(), data);
			}
		} else if (headerRef == 'SELECT_RECOMMEND_TO_ROLE_USER') {

			var recmndToProprtyMap = getRecmndToProprtyMap();

			var onGroupClickListener = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK];
			var onUserClickListener = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK];
			var recommendGroupMenu = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU];
			var recommendGroupMenuBtn = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN];
			if (recommendGroupMenu) {
				var groupMenu = [];
				for (var i = 0; i < data.length; i++) {
					var group = getRecomndAndReturnMenu(data[i], onGroupClickListener, onUserClickListener);
					groupMenu.push(group);
				}

				controller.lookupReference(recommendGroupMenu).add(groupMenu);
				controller.lookupReference(recommendGroupMenuBtn).setDisabled(false);
			}
		} else if (headerRef == 'SELECT_RETURN_TO_ROLE_USER') {

			var returnToProprtyMap = getRetuenToProprtyMap();

			var onGroupClickListener = returnToProprtyMap[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK];
			var onUserClickListener = returnToProprtyMap[appConstants.MAP_KEY_RETURN_TO_USER_CLICK];
			var returnGroupMenu = returnToProprtyMap[appConstants.MAP_KEY_RETURN_GROUP_MENU];
			var returnGroupMenuBtn = returnToProprtyMap[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN];

			if (returnGroupMenu) {
				var groupMenu = [];
				for (var i = 0; i < data.length; i++) {
					var group = getRecomndAndReturnMenu(data[i], onGroupClickListener, onUserClickListener);
					groupMenu.push(group);
				}

				controller.lookupReference(returnGroupMenu).add(groupMenu);
				controller.lookupReference(returnGroupMenuBtn).setDisabled(false);
			}
		} else if (headerRef == 'onSaveApplication') {
			//controller.loadLoanGridData();
			controller.onRefreshGrid(controller.getView());
			loanDetailsWinToClose.close();
		} else if (headerRef == 'onUpdateApplication') {
			//controller.loadLoanGridData();
			controller.onRefreshGrid(controller.getView());
			loanDetailsWinToClose.close();
		} else if (headerRef == 'onDeleteApplication') {
			//controller.loadLoanGridData();
			controller.onRefreshGrid(controller.getView());
			loanDetailsWinToClose.close();
		} else if (headerRef == 'onClickSoRecommendbtn') {
			loanDetailsWinToClose.close();
		} else if (headerRef == 'executeStateTransitionDetailsPage') {
			//controller.loadLoanGridData();
			controller.onRefreshGrid(controller.getView());
			loanDetailsWinToClose.close();
			Ext.toast('Action completed succcessfully.');
		} else if (headerRef == 'loadCustomerType') {
			loadDataInGlobalStore(data, 'gCustTypeStore');

			var customerType = controller.lookupReference('customerType');
			var hiddenCustType = controller.lookupReference('hiddenCustomerType');
			if (customerType && !customerType.value && hiddenCustType && hiddenCustType.value) {
				controller.lookupReference('customerType').setValue(hiddenCustType.value);
			}
			if (hiddenCustType) hiddenCustType.reset();
		} else if (headerRef == 'loadLoanType') {
			loadDataInGlobalStore(data, 'gLoanTypeStore');
			loadCreateNewLoanTree(getGlobalStore('gLoanTypeStore').data.items, controller.lookupReference('createNewLoanTree'));
		} else if (headerRef == 'getLoanPercent') {
			request.sender.lookupReference('interestRate').setValue(data.interestRate);
		} else if (headerRef == 'onSaveLiability') {
			var store = getGlobalStore('gExistingLiabilitiesStore');
			var items = store.data.items;

			items[items.length - 1].data.existingLiabilityId = data.existingLiabilityId;
		} else if (headerRef == 'onActivateLoanDetailsWin') {

			controller.lookupReference('isLoading').setValue('true');
			controller.getView().lookupReference('hiddenLoanRawData').setValue(data);

			controller.getView().lookupReference('hiddenLoanRawData').setValue(data);

			setCustomerInfo(controller.getView(), data.customer);
			setCbblAccountNo(controller, data.accountNo);

			setLoanInfo(controller.getView(), data);
			setHiddenLoanInfo(controller.getView(), data);

			loadDataInGlobalStore(data.cibStatusList, 'gCibStatusCommentStore');
			loadDataInGlobalStore(data.analystsCommentsList, 'gAnalystCommentStore');
			loadDataInGlobalStore(data.exceptionDetailsList, 'gExceptionDetailStore');
			loadDataInGlobalStore(data.instructionToCadList, 'gIns2CADStore');
			loadDataInGlobalStore(data.existingLiabilityList, 'gExistingLiabilitiesStore');
			loadDataInGlobalStore(data.cmntJustificationList, 'gCmntJustificationStore');
			loadDataInGlobalStore(data.sourceRecmndList, 'gSourceRecmndStore');
			loadDataInGlobalStore(data.branchRecmndList, 'gBranchRecmndStore');
			loadDataInGlobalStore(data.loanDocumentList, 'gLoanDocumentStore');
			loadDataInGlobalStore(data.cmntWaiverSoughtList, 'gCmntWaiverSoughtStore');

			if (data.stateName == appConstants.FO_SUBMITTED && userRoles.containsKey(appConstants.SOURCE_OFFICER)) {
				setDefaultSourceOfficerRecmnd();
				setDefaultBranchRecmnd();
			}
			setDefaultIns2Cad();
			setDefultRowOfAllGrid();

			if (data.loanDocListForCibStatus && data.loanDocListForCibStatus.length > 0) {
				controller.lookupReference('viewCibStatus').setDisabled(false);
			} else {
				controller.lookupReference('viewCibStatus').setDisabled(true);
			}
			controller.lookupReference('proposedDBR').setValue(data.proposedDBR);
			controller.lookupReference('isLoading').setValue('false');

			if (data.rmOrUhManagerList.length > 0) {
				var dbUserName = data.rmOrUhManagerList[0].userName;
				var dbDesigNation = data.rmOrUhManagerList[0].designation;
				if(dbUserName){
					controller.lookupReference('rmOUhName').setValue(dbUserName);
				}
				if(dbDesigNation){
					controller.lookupReference('rmOUhDesignation').setValue(dbDesigNation);
				}
				
			}

		} else if (headerRef == 'onActivateNewLoanDetailsWin') {
			setCustomerObjForFOView(controller.getView(), data.customer);
			setLoanObjForFOView(controller.getView(), data);
			setDocObjForFOView(controller.getView(), data.loanDocumentList);

			setHiddenLoanInfo(controller.getView(), data);
		} else if (headerRef == 'onActionSaveLiability') {
			loadDataInGlobalStore(data, 'gExistingLiabilitiesStore');
			Ext.toast('Succcessfully Saved.');
			controller.lookupReference('existingLiabilitiesGrid').getView().refresh();
		} else if (headerRef == 'onNewLiability') {
			loadDataInGlobalStore(data, 'gExistingLiabilitiesStore');
			setLiabilityRowAtEnd('gExistingLiabilitiesStore');
			controller.lookupReference('existingLiabilitiesGrid').getView().refresh();
		} else if (headerRef == 'onSaveCibStatus') {
			handleAfterSaveComment(data, controller, 'gCibStatusCommentStore', 'cibStatusGrid');
		} else if (headerRef == 'onSaveAnalystsComment') {
			handleAfterSaveComment(data, controller, 'gAnalystCommentStore', 'analystsCommentsGrid');
		} else if (headerRef == 'onSaveExceptionDetail') {
			handleAfterSaveComment(data, controller, 'gExceptionDetailStore', 'exceptionDetailGrid');
		} else if (headerRef == 'onSaveInstruction2Cad') {
			handleAfterSaveComment(data, controller, 'gIns2CADStore', 'instrucationsToCADGrid');
		} else if (headerRef == 'onSaveCmntJustification') {
			handleAfterSaveComment(data, controller, 'gCmntJustificationStore', 'cmntJustificationGrid');
		} else if (headerRef == 'onSaveCmntWaiverSought') {
			handleAfterSaveComment(data, controller, 'gCmntWaiverSoughtStore', 'cmntWaiverSoughtGrid');
		} else if (headerRef == 'onSaveSourceRecmnd') {
			handleAfterSaveComment(data, controller, 'gSourceRecmndStore', 'sourceRecmndGrid');
		} else if (headerRef == 'onSaveBranchRecmnd') {
			handleAfterSaveComment(data, controller, 'gBranchRecmndStore', 'branchRecmndGrid');
		} else if (headerRef == 'onSaveQueryResponse') {
			Ext.toast('Successfully Saved.');
			controller.lookupReference('queryResponseGrid').getView().refresh();

			controller.loadQueryResponseGrid(controller);
		} else if (headerRef == 'onRefreshCreateNewLoanTree') {
			loadDataInGlobalStore(data, 'gLoanTypeStore');
			loadCreateNewLoanTree(getGlobalStore('gLoanTypeStore').data.items, controller.lookupReference('createNewLoanTree'));
		} else if (headerRef == 'loadDocumentationList') {
			if (data[0] && data[0].loanDocMapList) {
				loadDataInGlobalStore(data[0].loanDocMapList, 'gLoanDocumentStore');
			} else {
				getGlobalStore('gLoanDocumentStore').clearData();
			}

			controller.lookupReference('documenttation').setExpanded(false);
			controller.lookupReference('documenttation').setExpanded(true);
		} else if (headerRef == 'onExpandComntOfActionPanel') {
			loadDataInGlobalStore(data, 'gCmntOfActionStore');
		} else if(headerRef == 'onTabNotesOfActionPanel'){
			loadDataInGlobalStore(data, 'gNotesStore');
		}else if(headerRef == 'onSaveNotes'){
			controller.lookupReference('loanNotes').reset();
			controller.onTabNotesOfActionPanel();			
		}
		else if (headerRef == 'loadQueryResponseGrid') {
			loadDataInGlobalStore(data, 'gQueryCmntStore');
		} else if (headerRef == 'onClickSaveLoanActionComment') {
			controller.onRefreshGrid(controller.getView());
			controller.getView().close();
			loanDetailsWinToClose.close();
		} else if (headerRef == 'loadDocListForExistingLoan') {
			loadDataInGlobalStore(data, 'gLoanDocumentStore');

			controller.lookupReference('documenttation').setExpanded(false);
			controller.lookupReference('documenttation').setExpanded(true);
		} else if (headerRef == 'loadLoanAllDocument') {
			loadDataInGlobalStore(data, 'gLoanDocumentStore');

			controller.lookupReference('documenttation').setExpanded(false);
			controller.lookupReference('documenttation').setExpanded(true);
		} else if (headerRef == 'onReqCibStatusDoc') {
			// console.log(data);
			if (data && data.length > 0) {
				controller.lookupReference('viewCibStatus').setDisabled(false);
			} else {
				controller.lookupReference('viewCibStatus').setDisabled(true);
			}
		} else if (headerRef == appActionType.ACTION_TYPE_PPC_EXCEL_REPORT) {
			if (data == true) {
				//Ext.Msg.alert('Status', 'Downloaded !');
			}
		} else if (headerRef == 'onClickBulkSubmit') {
			controller.loadLoanGridData();
		}

		else if(headerRef == 'staffIdshowOnPopupBeforeGeneratingPdf'){

			if(data.length > 0 && data[0].staffId2 != null){
				controller.lookupReference('staffId').setValue(data[0].staffId2);
			}

		}

		else if(headerRef == 'lastCreditAnalistRecommand'){
			
			if(data.length > 0){
				var CAName=data[0].userName;
				controller.lookupReference('creditSupportOfficer').setValue(CAName);
			}	
		}
		// else if(headerRef == 'deputyHoCRMName'){
			
		// 	if(data.length > 0){
		// 		var deputyHoCRM=data[0].deputyHoCRM;
		// 		controller.lookupReference('deputyHoCRM').setValue(deputyHoCRM);
		// 	}	
		// }
		else if(headerRef == 'loadDataSource'){
			loadDataInGlobalStore(data, 'gSourceStore');
		}
		else if(headerRef == 'loadWorkHistoryData'){
			loadDataInGlobalStore(data, 'gWorkHistoryGridViewStore');

			var statusTreePanel = controller.lookupReference('loanStatusTree');
			if (statusTreePanel) {
				loadLoanStatusTree(data, statusTreePanel);
			}
			//enable refresh button
			controller.lookupReference('loanStatusGridRefresh').setDisabled(false);
		}
		else if(headerRef == 'executeStateTransitionFromLoanGrid'){
			controller.onClickLoanSearch();
		}else if(headerRef == 'onClickSearchNid'){
			if(data.responseCode==400){
				resetOnldLmsinformationInForm(controller.getView());
				resetOnldNidinformationInForm(controller.getView());
				Ext.create('Ext.window.MessageBox', {
				    alwaysOnTop: true,
				    closeAction: 'destroy'
				}).show({
				    title: 'Not Found',
				    buttons: Ext.Msg.OK,
				    message: 'Customer Not Found Nid Local Site.'
				});
			}else if(data.responseMessage){
				resetOnldLmsinformationInForm(controller.getView());
				resetOnldNidinformationInForm(controller.getView());
				Ext.create('Ext.window.MessageBox', {
				    alwaysOnTop: true,
				    closeAction: 'destroy'
				}).show({
				    title: 'NID Error',
				    buttons: Ext.Msg.OK,
				    message: data.responseMessage
				});
			}
			else{
				controller.lookupReference('nidInformation').setExpanded(true);
			    controller.lookupReference('lmsSideInformationForm').setHidden(true);
			    resetOnldNidinformationInForm(controller.getView());
			    resetOnldLmsinformationInForm(controller.getView());
			    setNidInformation(controller.getView(), data);
			}
		}
		else if(headerRef == 'onClickCompareNidDetails'){
			if(data.responseCode == 400){
				resetOnldLmsinformationInForm(controller.getView());
				resetOnldNidinformationInForm(controller.getView());
				Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
				}).show({
			    title: 'Site Down',
			    buttons: Ext.Msg.OK,
			    message: 'Customer Not Found NID Local Site.'
				});
			}else if(data.responseMessage){
				resetOnldLmsinformationInForm(controller.getView());
				resetOnldNidinformationInForm(controller.getView());
				Ext.create('Ext.window.MessageBox', {
				    alwaysOnTop: true,
				    closeAction: 'destroy'
				}).show({
				    title: 'NID Error',
				    buttons: Ext.Msg.OK,
				    message: data.responseMessage
				});
			}else{
				controller.lookupReference('nidInformation').setExpanded(true);
                controller.lookupReference('lmsSideInformationForm').setHidden(false);
                resetOnldNidinformationInForm(controller.getView());
			    setNidInformation(controller.getView(), data);
			}
		}else if(headerRef == 'onClickCompareLmsNidDetails'){
			if(!data.nid){
				resetOnldLmsinformationInForm(controller.getView());
				resetOnldLmsinformationInForm(controller.getView());
				Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
				}).show({
			    title: 'Not Found',
			    buttons: Ext.Msg.OK,
			    message: 'LMS Customer Not Found .'
				});
			}
			else{
			   controller.lookupReference('lmsSideInformationForm').setHidden(false);
			   resetOnldLmsinformationInForm(controller.getView());
			   setLmsNidInformation(controller.getView(), data);
			}
		}else if(headerRef == 'onActivateCibForm'){
			if(!data.nid){
				Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
				}).show({
			    title: 'Not Found',
			    buttons: Ext.Msg.OK,
			    message: 'NID Customer Not Found .'
				});
			}else{
				setCibFormInformation(controller.getView(), data);
			}
		}else if(headerRef == 'onClickNewPersonBtn'){
			if(!data){
				Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
				}).show({
			    title: 'Not Found',
			    buttons: Ext.Msg.OK,
			    message: 'CIB Not Found .'
				});
			}else{
				var dockLink = data.docDownloadUrl;
				if(dockLink){
					var cibLoanId = data.loanId;
					cibDetailsWinClose.close();
					controller.viewFileByLoanIdDocType(cibLoanId, appConstants.CIB_STATUS);
				}else{
					Ext.create('Ext.window.MessageBox', {
				    alwaysOnTop: true,
				    closeAction: 'destroy'
					}).show({
				    title: 'Not Found',
				    buttons: Ext.Msg.OK,
				    message: 'CIB Not Found .'
				});
				}
			}
		}else if(headerRef == 'onClickCheckInquiryBtn'){
			if(!data){
				Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
				}).show({
			    title: 'Not Found',
			    buttons: Ext.Msg.OK,
			    message: 'CIB Not Found .'
				});
			}else{
				var dockLink = data.docDownloadUrl;
				if(dockLink){
					var cibLoanId = data.loanId;
					cibDetailsWinClose.close();
					controller.viewFileByLoanIdDocType(cibLoanId, appConstants.CIB_STATUS);
				}else{
					Ext.create('Ext.window.MessageBox', {
				    alwaysOnTop: true,
				    closeAction: 'destroy'
					}).show({
				    title: 'Not Found',
				    buttons: Ext.Msg.OK,
				    message: 'CIB Not Found .'
				});
				}
			}
		}else if(headerRef == 'duplicateBpNumberLoanCheck'){
			var searchData = JSON.parse(localStorage.getItem('loanSearchParam'));
				var bpNoSc = searchData.bpNo;
			if(data.length>0){
				if(data[0].duplicationCheckSameBp>0){
					Ext.Msg.show({
					title:'Duplicate',
					message: 'This BP Already Used,Again Use Click Yes',
					buttons: Ext.Msg.YESNO,
					icon: Ext.Msg.QUESTION,
					modal: true,
					fn: function(btn) {
						if (btn == 'yes') {
							controller.onKeyPressCustomerSrc("bpNo", data[0].bpNo, "BP No");

						}
					}
				});
			    Ext.defer(function () { Ext.Msg.toFront() }, 200);
				}else{
					controller.onKeyPressCustomerSrc("bpNo", bpNoSc, "BP No");
				}
			}else{
				controller.onKeyPressCustomerSrc("bpNo", bpNoSc, "BP No");
		}
	   }else if(headerRef == 'onClickManualSmsSend'){
	   	controller.onRefreshGrid(controller.getView());
	   	Ext.toast('Successfully Send for SMS Process.');
	   }
	},

	// send json request
	sendRequest: function (actionName, contentType, payload, header) {

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
			onSuccess: this.onSuccess,
			onError: this.onError,
			onStatusUpdate: this.onStatusUpdate
		};

		var requestId = nMessageProcessor.sendRequest(request);
	},

	onActivateLoanPanelRender: function (cmp, eOpts) {

		cmp.lookupReference('createNewLoanTree').setVisible(hasAnyRole(['SOURCE_OFFICER', 'FIELD_OFFICER']));

		this.loadLoanGridData();
		this.loadCustomerType();
		this.loadLoanType();
		this.loadDataSource();
	},

	onMainLoanTabChange: function(tab){
		this.executeActionOnTabChange(tab.activeTab.id, 'onMainLoanTabChange');
	},

	executeActionOnTabChange: function(tabId, ref){
		var me = this;
		if (tabId == 'workHistoryTab') {
			if(ref == 'onRefreshStatusTree'){
				me.onClickWorkHistorySearchClear();
			}
			me.loadWorkHistoryGridData();
		}
	    else if (tabId == 'loanSearchPanel') {
	    	if(ref == 'onRefreshStatusTree'){
				me.onClickSearchClear();			
			}
			me.loadLoanGridData();
		}
		else if (tabId == 'idloanGrouping') {
			if(ref == 'onRefreshStatusTree'){
				me.onClickGroupSearchClear();
			}
			me.loadGroupGridPanelData();     
		}
	},

	loadDataSource: function () {
		var header = {
			reference: 'loadDataSource'
		};

		var payload = [{
            userModKey	: loginUser.id,
        }];

		this.sendRequest(appActionType.ACTION_TYPE_LOAN_DATA_SOURCE, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	onBeforeLoadLoanPanel: function (cmp, eOpts) {
		var store = getGlobalStore('gLoanGridViewStore');
		store.clearFilter()
		store.removeAll();

		if (userRoles.containsKey(appConstants.FIELD_OFFICER)) {
			cmp.lookupReference('loanReportAsPdf').setHidden(true);
			cmp.lookupReference('bulkSubmit').setHidden(false);
		}
		if(userRoles.containsKey(appConstants.CREDIT_ANALYST) || userRoles.containsKey(appConstants.RISK_MANAGER)
			|| userRoles.containsKey(appConstants.UNIT_HEAD)){
		   cmp.lookupReference('createLoanGroupBtn').setHidden(false);
		   cmp.lookupReference('idloanGrouping').setDisabled(false);
		
		}
		if(userRoles.containsKey(appConstants.HO_CRM)){
		   cmp.lookupReference('idloanGrouping').setDisabled(false);
		}
		if(userRoles.containsKey(appConstants.CAD)){
		   cmp.lookupReference('manualSmsSend').setHidden(false);
		}
	},

	onSaveApplication: function (cmp, action) {
		var me=this;
		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
					if (btn == 'yes') {
					var header = {
						reference: 'onSaveApplication'
					};
						if (isMandatoryFieldFilled(cmp)) {
						showProcessMessage('Saving data....');
						var payload = getPayloadOfLoanApplication(cmp, 'ToSave');
						cmp.sendRequest(action, appContentType.CONTENT_TYPE_LOAN, payload, header);
					 }				
				}

			 }

		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);

	},
	onDeleteApplication: function (cmp, action) {

		var me = this;

		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
	            if (btn == 'yes') {

					var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

					var header = {
						reference: 'onDeleteApplication'
					};
					var payload = [{
						loanId: loanId,
						stateId: cmp.lookupReference('loanStateId').value,
						userModKey: loginUser.id
					}];

					me.sendRequest(action, appContentType.CONTENT_TYPE_LOAN, payload, header);
					//Refreshing loan grid
			    //	me.onRefreshGrid();
				}
			 }
		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);

	},
	onActionFoApplication: function (cmp, action) {
		var me = this;

		Ext.Msg.show({
		title:'Attention',
		message: 'Are your sure?',
		buttons: Ext.Msg.YESNO,
		icon: Ext.Msg.QUESTION,
		modal: true,
		fn: function(btn) {
			if (btn == 'yes') {
				var verificationEmail = cmp.lookupReference('verificationEmail').value;
				verificationEmail =verificationEmail.trim();
				if (isMandatoryFieldFilledOfficer(cmp)) {

					if (!Ext.isEmpty(verificationEmail) && !validEmailCheck(cmp)) {
						return;
					}

					var customer = getCustomerObjForFOView(cmp);
					var loanDocumentList = getLoanDocumentListForFOView(cmp);
					var loan = getLoanObjForFOView(cmp);
					loan["customer"] = customer;
					loan["loanDocumentList"] = loanDocumentList;

					var form = cmp.lookupReference('newFOLoanAccount');
					form.submit({
						params: {
							loan: JSON.stringify(loan),
							actionType: action
						},
						url: INITIATE_LOAN_URL,

						waitMsg: 'Working with Data...',

						success: function (result, request) {
							if (action == "FO_SUBMIT") {
								foSubmitedReset(cmp)								
							}
							else{
								loanDetailsWinToClose.close();
							}

						},

						failure: function (result, request) {
							if (action == "FO_SUBMIT") {
								foSubmitedReset(cmp)
							}
							else{
								loanDetailsWinToClose.close();
							}
						}
					});
				}

				//Refreshing loan grid
				me.onRefreshGrid();
			}
		}
		});

		Ext.defer(function () { Ext.Msg.toFront() }, 200);

	},
	onUpdateApplication: function (cmp, action) {
		var me=this;
		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
				if (btn == 'yes') {
					showProcessMessage('Updating data....');

					var header = {
						reference: 'onUpdateApplication'
					};
	                if (isMandatoryFieldFilled(cmp)) {
					    showProcessMessage('Updating data....');
					    var payload = getPayloadOfLoanApplication(cmp, 'ToUpdate');
					    me.sendRequest(action, appContentType.CONTENT_TYPE_LOAN, payload, header);
					    //me.onRefreshGrid();
				    }			
				}
			 }

		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);
	},

	onLoanGridItemDblClick: function (view, rec, item, index, e) {
           // loginUser=gLoginUuser;
        loanPanel = this;

        if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}
		var loanPrefix = rec.data.loanPrefix;
        if(!loanPrefix) loanPrefix = getLoanPrefix(rec.data);

		if (userRoles.containsKey(appConstants.FIELD_OFFICER)) {
			showProcessMessage('Loading...');
			var win = getFieldOfficerLoanWindow(buildTitle(rec.data));		
			var loanDetailsPanel = win.down('#FieldOfficerInfoDetails');

			loanDetailsPanel.lookupReference('keepHiddenloanIdKey').setValue(rec.data.loanId);
			loanDetailsPanel.lookupReference('accountNo').setValue(rec.data.accountNo);
			loanDetailsPanel.lookupReference('saveApplicationBtn').setHidden(true);

			loanDetailsPanel.lookupReference('loanSearchPad').setCollapsed(true);
            loanDetailsPanel.lookupReference('hiddenLoanPrefix').setValue(loanPrefix);
			manageLoanField(loanDetailsPanel, rec.data);
			
			if(!isLoanTypeGpf(loanPrefix)){
				mandotaryForPersonal(loanDetailsPanel);
			}

			if (rec.data.permission == 0) {
				loanDetailsPanel.lookupReference('saveApplicationBtn').setHidden(true);
				loanDetailsPanel.lookupReference('deleteApplicationBtn').setHidden(true);
				loanDetailsPanel.lookupReference('updateApplicationBtn').setHidden(true);
				loanDetailsPanel.lookupReference('submitApplicationBtn').setHidden(true);
			}

			Ext.MessageBox.hide();
			isMessageBox = false;

			win.show();
		}      
		 else {
			showProcessMessage('Loading...');
			var loanDetailsPanelWin = getLoanWindow(buildTitle(rec.data));
			var loanDetailsPanel = loanDetailsPanelWin.down('#LoanDetails');
			 loanDetailsPanel.lookupReference('hiddenLoanPrefix').setValue(loanPrefix);   

			if((userRoles.containsKey(appConstants.SOURCE_OFFICER))||(userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))||
				(userRoles.containsKey(appConstants.BOM_GULSHAN)) ||(userRoles.containsKey(appConstants.BRANCH_MANAGER))||
			   	 (userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER))){
			      var loantype = (buildLoanType(rec.data));
			   
				if(isLoanTypeGpf(loanPrefix) && (userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))||
				 (userRoles.containsKey(appConstants.BOM_GULSHAN)) ||(userRoles.containsKey(appConstants.BRANCH_MANAGER))||
			   	 (userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER))){
				     showGpfAmount(loanDetailsPanel);	
				     setColorGPF(loanDetailsPanel)	;					
			       } 
			   if((userRoles.containsKey(appConstants.SOURCE_OFFICER))){
			   	if(isLoanTypeGpf(loanPrefix)){
				  writeGpfAmount(loanDetailsPanel);	
				  showGpfAmount(loanDetailsPanel);					 				
			    }
			   }
			}        
			if (hasAnyRole(headOfficeUserRoles)) {
				hideFieldForHeadOffice(loanDetailsPanel);
			} else {
				hideFieldForBranchOffice(loanDetailsPanel);
			}

			if (userRoles.containsKey(appConstants.PC)) {
				hideHouseOwner(loanDetailsPanel);
			} else if (isLoanTypeGpf(loanPrefix)) {
				showSecurity(loanDetailsPanel);
				if (userRoles.containsKey(appConstants.BOM_GULSHAN) ||
					(userRoles.containsKey(appConstants.SOURCE_OFFICER)) ||
					(userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))) {
					hideCibStatus(loanDetailsPanel);
				}
			} else if (userRoles.containsKey(appConstants.BOM_GULSHAN) ||
				(userRoles.containsKey(appConstants.SOURCE_OFFICER)) ||
				(userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))) {
				hideCibStatus(loanDetailsPanel);
			}
			manageLoanField(loanDetailsPanel, rec.data);

			loanDetailsPanel.lookupReference('keepHiddenloanIdKey').setValue(rec.data.loanId);
			loanDetailsPanel.lookupReference('accountNo').setValue(rec.data.accountNo);
			if (userRoles.containsKey(appConstants.CAD)&& rec.data.stateName == 'CAD_DISBURSED'||rec.data.stateName == 'SENT_TO_CAD') {		
				loanDetailsPanel.lookupReference('smsStatus').setHidden(false);		
			}

			loanDetailsPanel.lookupReference('loanAccountSearchPad').setCollapsed(true);
			expandAllFieldSetInLoanWin(loanDetailsPanel, fieldSetInIoanDetailsWinArr);

			if (rec.data.permission == 0) {
				hideAllActionButton(loanDetailsPanel);
				var arrayOfGrid = getArrayOfGrid(loanDetailsPanel);
				hideAllActionColumn(arrayOfGrid);
			}
			Ext.MessageBox.hide();
			isMessageBox = false;
			loanDetailsPanelWin.show();
			
		}

	},
	onActivateLoanDetailsWin: function (cmp, eOpts) {

		var me = this;
		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

		var arrayOfGrid = getArrayOfGrid(cmp);

		setPluginWithoutListenerInAllField(arrayOfGrid);

		if (!Ext.isEmpty(loanId)) {

			var header = {
				reference: 'onActivateLoanDetailsWin'
			};

			var payload = [{
				userModKey: loginUser.id,
				loanId: loanId
			}];

			me.sendRequest(appActionType.ACTION_TYPE_SELECT_FULL_LOAN, appContentType.CONTENT_TYPE_LOAN, payload, header);
		} else {
			setDefaultSourceOfficerRecmnd();
			setDefaultBranchRecmnd();
			setDefaultIns2Cad();
			setDefultRowOfAllGrid();

			hideSaveActionColWithRefSaveOfAllGrid(arrayOfGrid);
			var docGrid = cmp.lookupReference('documenttationGrid');
			hideActionColumn(docGrid, 'downloadReference');
			hideActionColumn(docGrid, 'uploadReference');
			hideActionColumn(docGrid, 'viewReference');
			docGrid.down('#docGridRefreshBtn').setHidden(true);

			cmp.lookupReference('uploadCibStatusFileBtn').setHidden(true);
			cmp.lookupReference('viewCibStatus').setHidden(true);
			cmp.lookupReference('cibStatus').columnWidth = 1;

			cmp.lookupReference('cmntOfActionPanel').setHidden(true);
		}

		if (loanId) {
			// send recommand and return role req
			// check state to send req

			var header = {
				reference: 'SELECT_RECOMMEND_TO_ROLE_USER'
			};

			var fromRoleIds = loginUser.roleList.map(u => u.id).join(',')

			var payload = [{
				userModKey: loginUser.id,
				loanId: loanId,
				fromRoleIds: fromRoleIds

			}];

			me.sendRequest(appActionType.SELECT_RECOMMEND_TO_ROLE_USER, appContentType.CONTENT_TYPE_LOAN, payload, header);

			var header = {
				reference: 'SELECT_RETURN_TO_ROLE_USER'
			};

			me.sendRequest(appActionType.SELECT_RETURN_TO_ROLE_USER, appContentType.CONTENT_TYPE_LOAN, payload, header);
		}
	},

	onActivateNewLoanDetailsWin: function (cmp, eOpts) {

		var me = this;
		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

		if (!Ext.isEmpty(loanId)) {

			var header = {
				reference: 'onActivateNewLoanDetailsWin'
			};

			var payload = [{
				userModKey: loginUser.id,
				loanId: loanId
			}];

			me.sendRequest(appActionType.ACTION_TYPE_SELECT_FULL_LOAN, appContentType.CONTENT_TYPE_LOAN, payload, header);
		}
	},

	onRefreshStatusTree: function(){
		this.lookupReference('loanStatusGridRefresh').setDisabled(true);
		this.executeActionOnTabChange(this.lookupReference('loanHome').activeTab.id, 'onRefreshStatusTree');
	},

	loadLoanGridData: function () {

		var accountNo=  this.lookupReference('accountNo').value;
	    var bpNoSrc	=this.lookupReference('bpNoSrc').value;
	    var nid4Search=this.lookupReference('nid4Search').value;
		var phone4Search = this.lookupReference('phone4Search').value;
		var fromDate = this.lookupReference('fromDate').value
		var toDate = this.lookupReference('toDate').value;
		var applicationNo=this.lookupReference('applicationNoSrc').value;
		var loanTrackingId=this.lookupReference('loanTrackingId').value;
		var dataSourceCombo=this.lookupReference('dataSourceCombo').value;
		var lastActionDateWiseSearch=this.lookupReference('lastActionDateWiseSearch').value;

		var actionType ;
		if(lastActionDateWiseSearch === true){
		  actionType = appActionType.ACTION_TYPE_SELECT_LAST_ACTION;
		}else if(lastActionDateWiseSearch===false){
		  actionType = appActionType.ACTION_TYPE_SELECT_ALL_LOAN;
		}else{
			actionType=actionType;
		}

        if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }		
		var header = {
			reference: 'loadLoanGridData'
		};

		//var fromDate = Ext.Date.add(new Date(),Ext.Date.DAY,-30);
		var toDate = new Date();
		var actionType, fromDate;
 
			
        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
		toDate = Ext.Date.format(toDate, 'Y-m-d');

		var roleName = loginUser.roleList[0].name;
        if(roleName == 'UNIT_HEAD'){
        	if(!fromDate){
                fromDate = Ext.Date.add(new Date(1970,01,01));
                fromDate = Ext.Date.format(fromDate, 'Y-m-d');
                actionType=appActionType.ACTION_TYPE_SELECT_UNIT_HEAD_LOAD_DATA;
        	}
            }else{
            	if(!fromDate){
            	fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
                fromDate = Ext.Date.format(fromDate, 'Y-m-d');
                actionType=appActionType.ACTION_TYPE_SELECT_ALL_LOAN;
            	}
            }

		var payload = [{
            userModKey	: loginUser.id,
            fromDate4Src: fromDate,
			toDate4Src 	: toDate,
			actionType : actionType
        }];
        localStorage.setItem('loanSearchParam', JSON.stringify(payload[0]));
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},	
	loadWorkHistoryGridData: function () {
		showProcessMessage('Loading data....');

		if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

        var header = {
			reference: 'loadWorkHistoryData'
		};

		var today = Ext.Date.format(new Date(), 'Y-m-d');

		var payload = [{
            userModKey	: loginUser.id,
            fromDate4Src: today,
			toDate4Src 	: today
        }];

        this.sendRequest(appActionType.SELECT_WORK_HISTORY, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	loadCustomerType: function () {
		var header = {
			reference: 'loadCustomerType'
		};
		var payload = [{
			group: appConstants.CUSTOMER,
			subGroup: appConstants.CUSTOMER_TYPE,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
	},

	loadLoanType: function () {
		var header = {
			reference: 'loadLoanType'
		};
		var payload = [{
			group: appConstants.LOAN,
			subGroup: appConstants.LOAN_TYPE,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
	},

	onAppliedLoanAmountChange: function (cmp, newValue, oldValue, e, eOpt) {
		var loanDetails = cmp.up('#LoanDetails');
		var appliedLoanAmountApproval = this.lookupReference('appliedLoanAmountApproval');
		var appliedLoanAmount = this.lookupReference('appliedLoanAmount');
		
		var gPFAmount = this.lookupReference('gPFAmount').getValue();

		if (gPFAmount && gPFAmount != -2147483648 && gPFAmount != null && gPFAmount != undefined 
			&& ((Math.round(gPFAmount*0.9)) < (appliedLoanAmount.getValue()))) {
			Ext.Msg.alert('Attention', 'This is not allowed amount. It should not greater than 90% of GPF Amount');
			appliedLoanAmount.reset();
			return;
		}else{
			appliedLoanAmountApproval.setValue(newValue);
		}
		
		this.lookupReference('businessRecommendedAmnt').setValue(newValue);
		var should = shouldCalcInstmtOnAppliedAmount(loanDetails);
		if (newValue == -2147483648 || newValue == null || newValue === undefined) {
			cmp.reset();
			return;
		}
		if (!should) {
			return;
		}

		var tenorYear = this.lookupReference('tenorYear').value;
		var interestRate = this.lookupReference('interestRate').value;

		var emi = calculateEMI(newValue, tenorYear, interestRate, 12);
		this.lookupReference('monthlyInstallment').setValue(emi);
		this.lookupReference('monthlyInstallment').setValue(emi);

		if ((globalLonaPrefix != appConstants.LOAN_PREFIX_GPF)||
			((userRoles.containsKey(appConstants.SOURCE_OFFICER)) ||
		    (userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)))) {
			this.lookupReference('priceQuotationAmount').setValue(getPriceQuatationAmount(newValue));
		}


	},
	onAppliedLoanAmountChangeApproval: function (cmp, newValue, oldValue, e, eOpt) {

		var appliedLoanAmount = this.lookupReference('appliedLoanAmount').value;
		var appliedLoanAmountApproval = this.lookupReference('appliedLoanAmountApproval').value;
		if (!appliedLoanAmount) {
			this.lookupReference('appliedLoanAmountApproval').setValue(0);
		} else {
			this.lookupReference('appliedLoanAmountApproval').setValue(appliedLoanAmount);
		}
		if (appliedLoanAmount) {
			this.lookupReference('appliedLoanAmountApproval').setValue(appliedLoanAmount);
		} else {
			this.lookupReference('appliedLoanAmountApproval').setValue(0);
		}

		// 	if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		// else cmp.setValue(newValue);
	},
	ongrossSalaryPerMonth: function (cmp, newValue, oldValue, e, eOpt) {
		var totalEMI = this.lookupReference('totalEMI').value;
		var grossSalaryPerMonth = this.lookupReference('grossSalaryPerMonth').value;
		var remainingAmtAftEMI = this.lookupReference('remainingAmtAftEMI');

		if (!grossSalaryPerMonth || !totalEMI) {
			this.lookupReference('proposedDBR').setValue(0);
		} else {
			this.lookupReference('proposedDBR').setValue((totalEMI / grossSalaryPerMonth) * 100);

		}
		remainingAmtAftEMI.setValue(grossSalaryPerMonth - totalEMI);
		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
	},
	onremainingAmtAftEMI: function (cmp, newValue, oldValue, e, eOpt) {
		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
	},
	onTenorYearChange: function (cmp, newValue, oldValue, e, eOpt) {
		var tenorYear = this.lookupReference('tenorYear').value;
		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		var loanDetails = cmp.up('#LoanDetails');

		var appropriateAmount = getInstallmentCaclAmount(loanDetails);

		var tenorYear = this.lookupReference('tenorYear').value;
		var interestRate = this.lookupReference('interestRate').value;

		var emi = calculateEMI(appropriateAmount, tenorYear, interestRate, 12);
		this.lookupReference('monthlyInstallment').setValue(emi);

		var parsedYear = 0;
		var dobOfPgYear = this.lookupReference('dobOfPgYear').value;

		if (dobOfPgYear) {
			var idx = dobOfPgYear.indexOf("y");
			parsedYear = parseInt(dobOfPgYear.substring(0, idx));
		}

		if (parsedYear + tenorYear ? tenorYear : 0 <= 60) {
			this.lookupReference('guarantorElibiblity').setValue("Eligible");
		} else {
			this.lookupReference('guarantorElibiblity').setValue("Not Eligible");
		}
		this.ongrossSalaryPerMonth(cmp, newValue, oldValue, e, eOpt);

	},
	onInterestRateChange: function (cmp, newValue, oldValue, e, eOpt) {
		if (newValue == -2147483648) cmp.reset();
		var loanDetails = cmp.up('#LoanDetails');

		var appropriateAmount = getInstallmentCaclAmount(loanDetails);

		var tenorYear = this.lookupReference('tenorYear').value;
		var interestRate = this.lookupReference('interestRate').value;

		var emi = calculateEMI(appropriateAmount, tenorYear, interestRate, 12);
		this.lookupReference('monthlyInstallment').setValue(emi);

	},
	onTotalEMIChange: function (cmp, newValue, oldValue, e, eOpt) {

		var netMonthlyIncome = this.lookupReference('netMonthlyIncome').value;
		var totalEMI = this.lookupReference('totalEMI').value;
		var grossSalaryPerMonth = this.lookupReference('grossSalaryPerMonth').value;

		if (this.lookupReference('netMonthlyIncome').isVisible()) {
			if (!netMonthlyIncome || !totalEMI) {
				this.lookupReference('proposedDBR').setValue(0);
			} else {
				this.lookupReference('proposedDBR').setValue((totalEMI / netMonthlyIncome) * 100);
			}
		} else {
			if (!grossSalaryPerMonth || !totalEMI) {
				this.lookupReference('proposedDBR').setValue(0);
			} else {
				this.lookupReference('proposedDBR').setValue((totalEMI / grossSalaryPerMonth) * 100);
			}
		}


		//disposableIncome
		if (netMonthlyIncome) {
			this.lookupReference('disposableIncome').setValue(netMonthlyIncome - totalEMI);
		} else {
			this.lookupReference('disposableIncome').setValue(0);
		}

		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
	},
	onNetMonthlyIncomeChange: function (cmp, newValue, oldValue, e, eOpt) {

		var netMonthlyIncome = this.lookupReference('netMonthlyIncome').value;
		var totalEMI = this.lookupReference('totalEMI').value;
		if (!netMonthlyIncome || !totalEMI) {
			this.lookupReference('proposedDBR').setValue(0);
		} else {
			this.lookupReference('proposedDBR').setValue((totalEMI / netMonthlyIncome) * 100);
		}

		//disposableIncome
		if (netMonthlyIncome) {
			this.lookupReference('disposableIncome').setValue(netMonthlyIncome - totalEMI);
		} else {
			this.lookupReference('disposableIncome').setValue(0);
		}

		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
	},
	onMonthlyInstallmentChange: function (cmp, newValue, oldValue, e, eOpt) {
		var monthlyInstallment = this.lookupReference('monthlyInstallment').value;
		var existingLoanEMI = this.lookupReference('existingLoanEMI').value;
		this.lookupReference('totalEMI').setValue(monthlyInstallment + existingLoanEMI);

		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
	},
	onExistingLoanEMIChange: function (cmp, newValue, oldValue, e, eOpt) {
		var monthlyInstallment = this.lookupReference('monthlyInstallment').value;
		var existingLoanEMI = this.lookupReference('existingLoanEMI').value;
		this.lookupReference('totalEMI').setValue(monthlyInstallment + existingLoanEMI);

		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
		this.ongrossSalaryPerMonth(cmp, newValue, oldValue, e, eOpt);

	},
	onPriceQuotationAmountChange: function (cmp, newValue, oldValue, e, eOpt) {
		if (newValue == -2147483648) cmp.reset();
		var priceQuotationAmount = this.lookupReference('priceQuotationAmount').value;
		var LoanDetails = cmp.up('#LoanDetails');
		var bankParticipation = this.lookupReference('bankParticipation');
		var appropriateAmount = getInstallmentCaclAmount(LoanDetails);

		if (globalLonaPrefix != appConstants.LOAN_PREFIX_GPF) {
			if (priceQuotationAmount > 0) {
				var iBranchMode = isBranchMode(LoanDetails);
				// only head office mode allow to change bank perticipation
				if (!iBranchMode) {
					var ltv = ((appropriateAmount / priceQuotationAmount) * 100);
					bankParticipation.setValue(ltv);
				}
			} else {
				bankParticipation.setValue(0);
			}
		}

		

	},
	onBusinessRecommendedAmntChange: function (cmp, newValue, oldValue, e, eOpt) {

		if (newValue == -2147483648 || newValue == null || newValue === undefined) {
			cmp.setValue(this.lookupReference('appliedLoanAmount').value);
		}
	},
	onRecommendedForApprovalChange: function (cmp, newValue, oldValue, e, eOpt) {
		if (isLoadingLoanWindow(this)) {
			if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
			return;
		}
		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();

		if (!isValidRecommendedApproval(this)) {
			return;
		}

		var priceQuotationAmount = this.lookupReference('priceQuotationAmount').value;
		var recommendedForApproval = this.lookupReference('recommendedForApproval').value;
		var tenorYear = this.lookupReference('tenorYear').value;
		var interestRate = this.lookupReference('interestRate').value;
		var bankParticipation = this.lookupReference('bankParticipation');
		var priceQuotationAmount = this.lookupReference('priceQuotationAmount');

		if (globalLonaPrefix != null && globalLonaPrefix == appConstants.LOAN_PREFIX_GPF) {
				bankParticipation.setValue(recommendedForApproval / priceQuotationAmount.getValue());
				priceQuotationAmount.setReadOnly(true);
		}else{
			if (recommendedForApproval) {
				bankParticipation.setValue(priceQuotationAmount / recommendedForApproval);
				priceQuotationAmount.setValue(getPriceQuatationAmount(recommendedForApproval));
			} else {
				bankParticipation.setValue(0);
				priceQuotationAmount.setValue(0);
			}
		}
		



		var emi = calculateEMI(recommendedForApproval, tenorYear, interestRate, 12);
		this.lookupReference('monthlyInstallment').setValue(emi);
	},

	onCustomerTypeChange: function (cmp, newValue, oldValue, eOpts) {
		var me = this;
		var custTypeId = newValue;
		var loanTypeId = me.lookupReference('loanType').value;

		me.loadLoanAllDocument(me);

		me.getLoanPercent(custTypeId, loanTypeId);
	},

	onLoanTypeChange: function (cmp, newValue, oldValue, eOpts) {
		var me = this;
		var custTypeId = me.lookupReference('customerType').value;
		var loanTypeId = newValue;

        me.getLoanPercent(custTypeId, loanTypeId);
	},

	getLoanPercent: function (custTypeId, loanTypeId) {

        if(!custTypeId || !loanTypeId) return;
        
		var header = {
			reference: 'getLoanPercent'
		};
		var payload = [{
			userModKey: loginUser.id,
			loanTypeId: loanTypeId,
			customerTypeId: custTypeId
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_PERCENT, appContentType.CONTENT_TYPE_LOAN_CONFIG, payload, header);
	},
	onClickSearchClearBtn: function () {
		this.lookupReference('accountNo').reset();
		this.lookupReference('bpNoSrc').reset();
		this.lookupReference('nid4Search').reset();
		this.lookupReference('phone4Search').reset();
	},
	onClearNotes: function(cmp){
		this.lookupReference('loanNotes').reset();
	},

	onClickSearchClear: function () {
		this.lookupReference('accountNo').reset();
		this.lookupReference('bpNoSrc').reset();
		this.lookupReference('nid4Search').reset();
		this.lookupReference('phone4Search').reset();
		this.lookupReference('fromDate').reset();
		this.lookupReference('toDate').reset();
		this.lookupReference('applicationNoSrc').reset();
		this.lookupReference('loanTrackingId').reset();
		this.lookupReference('dataSourceCombo').reset();
		this.lookupReference('lastActionDateWiseSearch').reset();		
	},

	onClickWorkHistorySearchClear: function () {
		this.lookupReference('fromDateWorkHis').reset();
		this.lookupReference('toDateWorkHis').reset();
	},
	
	onAddToLoanGroupSearchClear: function () {
		this.lookupReference('fromDate').reset();
		this.lookupReference('toDate').reset();
		this.lookupReference('loanTrackingId').reset();		
	},
	onClickGroupSearchClear: function () {

		var me = this;

		if(me.lookupReference('loanGroupId')){
			me.lookupReference('loanGroupId').reset();
			me.lookupReference('loanTrackingId').reset();	
			me.lookupReference('fromDate').reset();
			me.lookupReference('toDate').reset();
		}
		else{
			var loanGroupPanel = me.lookupReference('idloanGrouping');
			loanGroupPanel.lookupReference('loanGroupId').reset();
			loanGroupPanel.lookupReference('loanTrackingId').reset();	
			loanGroupPanel.lookupReference('fromDate').reset();
			loanGroupPanel.lookupReference('toDate').reset();
		}
	},

	loadOldLoanGridData: function(){
       var accountNo=  this.lookupReference('accountNo').value;
	   var bpNoSrc	=this.lookupReference('bpNoSrc').value;
	   var nid4Search=this.lookupReference('nid4Search').value;
		var phone4Search = this.lookupReference('phone4Search').value;
		var fromDate = this.lookupReference('fromDate').value
		var toDate = this.lookupReference('toDate').value;
		var applicationNo=this.lookupReference('applicationNoSrc').value;
		var loanTrackingId=this.lookupReference('loanTrackingId').value;
		var dataSourceCombo=this.lookupReference('dataSourceCombo').value;
		var lastActionDateWiseSearch=this.lookupReference('lastActionDateWiseSearch').value;
		this.searchLoan(accountNo,bpNoSrc,nid4Search,phone4Search,applicationNo,loanTrackingId,dataSourceCombo,lastActionDateWiseSearch,fromDate,toDate);

	},

	onRefreshGrid: function() {
		if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

        var searchData = JSON.parse(localStorage.getItem('loanSearchParam'));

        var accountNo = searchData.accountNo4Src;
		var bpNoSrc = searchData.bpNo;
		var nid4Search = searchData.nid4Src;
		var phone4Search = searchData.phone4Src;
		var applicationNo = searchData.applicationNo;
		var loanTrackingId = searchData.loanTrackingId;
		var dataSourceCombo = searchData.dataSource;
		var lastActionDateWiseSearch = searchData.lastActionDateWiseSearch;
		var fromDate = searchData.fromDate4Src;
		var toDate = searchData.toDate4Src;
		var actionType = searchData.actionType;

		this.searchLoan(accountNo,bpNoSrc,nid4Search,phone4Search,applicationNo,loanTrackingId,dataSourceCombo,lastActionDateWiseSearch,fromDate,toDate,actionType);
	},

	onClickLoanSearch: function () {
		var me = this;
		if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

		var accountNo = me.lookupReference('accountNo').value;
		var bpNoSrc = me.lookupReference('bpNoSrc').value;
		var nid4Search = me.lookupReference('nid4Search').value;
		var phone4Search = me.lookupReference('phone4Search').value;
		var applicationNo = me.lookupReference('applicationNoSrc').value;
		var loanTrackingId = me.lookupReference('loanTrackingId').value;
		var dataSourceCombo = me.lookupReference('dataSourceCombo').value;

		var lastActionDateWiseSearch = me.lookupReference('lastActionDateWiseSearch').value; 

		var fromDate = me.lookupReference('fromDate').value;
		var toDate = me.lookupReference('toDate').value;

		if(lastActionDateWiseSearch == true && !fromDate){
			Ext.Msg.alert('Error', 'From date is required.');
			return;
		}

		if (!fromDate  && !accountNo && !bpNoSrc && !nid4Search && !phone4Search 
			&& !applicationNo && !loanTrackingId && !dataSourceCombo){
				fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
			}				
		if (!toDate) toDate = new Date();
		 		
		if (fromDate && toDate.getTime() < fromDate.getTime()) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		me.searchLoan(accountNo,bpNoSrc,nid4Search,phone4Search,applicationNo,loanTrackingId,dataSourceCombo,lastActionDateWiseSearch,fromDate,toDate);
	},

	onActivateSearchNid: function(){
		var cmp = this;
		cmp.lookup('nidSideInformationForm').items.insert(1, getImagePosition());
		this.onClickSearchNid(cmp);
	},

	onActivateCibForm: function(){
        this.lookupReference('cibSubjectDatafoField').setExpanded(true);
        this.lookupReference('searchBySubjetDataForm').setExpanded(true);
        this.lookupReference('installmentInfoForm').setExpanded(true);
        this.lookupReference('individualInfo').setExpanded(true);
        this.lookupReference('permanentAddress').setExpanded(true);
        this.lookupReference('identificationDocuments').setExpanded(true);
        this.lookupReference('sectorData').setExpanded(true);
        this.lookupReference('contactNumberHistory').setExpanded(true);  
        this.lookupReference('cibSubjectCodeInquiry').setExpanded(true);
        this.lookupReference('presentAddress').setExpanded(true);                         
        
        var subjectRole = this.lookupReference('subjectRole').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var typeOfFinancing = this.lookupReference('typeOfFinancing').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var periodicityofPayment = this.lookupReference('periodicityofPayment').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var countryOfBirth = this.lookupReference('countryOfBirth').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var parmanentCountryOfBirth = this.lookupReference('parmanentCountryOfBirth').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var iDIssueCountry = this.lookupReference('iDIssueCountry').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var sectorCode = this.lookupReference('sectorCode').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var presentCountryOfBirth = this.lookupReference('presentCountryOfBirth').initialConfig.store.byValue.initialConfig.collection.items[0].data.name;
        var nid = this.lookupReference('lmsNid').value;
        var searchDateOfBirth = this.lookupReference('lmsDateOfBirth').value;
        
        this.lookupReference('subjectRole').setValue(subjectRole);
        this.lookupReference('typeOfFinancing').setValue(typeOfFinancing);
        this.lookupReference('periodicityofPayment').setValue(periodicityofPayment);
        this.lookupReference('countryOfBirth').setValue(countryOfBirth); 
        this.lookupReference('parmanentCountryOfBirth').setValue(parmanentCountryOfBirth);
        this.lookupReference('iDIssueCountry').setValue(iDIssueCountry);    
        this.lookupReference('sectorCode').setValue(sectorCode);  
        this.lookupReference('presentCountryOfBirth').setValue(presentCountryOfBirth); 

        if(searchDateOfBirth && typeof searchDateOfBirth != 'string'){
				searchDateOfBirth =  Ext.Date.format(searchDateOfBirth, 'Y-m-d');
			}

		var header = {
			reference: 'onActivateCibForm'
		};

		var payload = [{
			userModKey: loginUser.id,
			searchDateOfBirth: searchDateOfBirth,
			nid : nid,
		}];	
		this.sendRequest(appActionType.ACTION_TYPE_SEARCH_FOR_CUSTOMER_NID_DETAILS,appContentType.CONTENT_TYPE_NID_INFORMATION, payload, header);

	},

	onClickSearchNid: function(){
		var searchDateOfBirth = this.lookupReference('searchDateOfBirth').value;		
		var searchNidNumber = this.lookupReference('searchNidNumber').value;
		searchNidNumber = searchNidNumber.trim();

		if(isMandatoryFieldNid(this)){
			var actionType = appActionType.ACTION_TYPE_SEARCH_NID_DETAILS_FORM_API;

			var header = {
				reference: 'onClickSearchNid'
			};

			var month = searchDateOfBirth.getMonth()+1;

			var dobObj = {
				"year": searchDateOfBirth.getFullYear(),
				"month": month,
				"day": searchDateOfBirth.getDate()
			}

			if(searchDateOfBirth && typeof searchDateOfBirth != 'string'){
				searchDateOfBirth =  Ext.Date.format(searchDateOfBirth, 'Y-m-d');
			}

			var payload = [{
				userModKey: loginUser.id,
				searchDateOfBirth: searchDateOfBirth,
				nid : searchNidNumber,
				dateOfBirth: dobObj,
				forceFatch: true,
				actionType: actionType
			}];	

			this.sendRequest(actionType, appContentType.CONTENT_TYPE_NID_INFORMATION, payload, header);
		}

	},
	onClickCompareNid: function(){
		var searchDateOfBirth = this.lookupReference('searchDateOfBirth').value;
		var searchNidNumber = this.lookupReference('searchNidNumber').value;

		if(isMandatoryFieldNid(this)){
			var actionType = appActionType.ACTION_TYPE_SEARCH_NID_DETAILS_FOR_COMPARE;
			var month = searchDateOfBirth.getMonth()+1;
			
			var dobObj = {
				"year": searchDateOfBirth.getFullYear(),
				"month": month,
				"day": searchDateOfBirth.getDate()
			}

			if(searchDateOfBirth && typeof searchDateOfBirth != 'string'){
				searchDateOfBirth =  Ext.Date.format(searchDateOfBirth, 'Y-m-d');
			}

			var header = {
				reference: 'onClickCompareNidDetails'
			};
			var payload = [{
				userModKey: loginUser.id,
				searchDateOfBirth: searchDateOfBirth,
				nid : searchNidNumber,
				dateOfBirth: dobObj,
				forceFatch: true,
				actionType: actionType
			}];	
			this.sendRequest(actionType, appContentType.CONTENT_TYPE_NID_INFORMATION, payload, header);
			
			header = {
				reference: 'onClickCompareLmsNidDetails'
			}

			payload = [{
				userModKey: loginUser.id,
				searchDateOfBirth: searchDateOfBirth,
				nid : searchNidNumber,
				actionType: actionType
			}];	

			this.sendRequest(actionType, appContentType.CONTENT_TYPE_CUSTOMER, payload, header);

	  }
	},
	onClickClearNid: function(){
        this.lookupReference('searchDateOfBirth').reset();
		this.lookupReference('searchNidNumber').reset();
	},
	searchLoan: function(accountNo,bpNoSrc,nid4Search,phone4Search,applicationNo,loanTrackingId,dataSourceCombo,lastActionDateWiseSearch,fromDate,toDate,actionType){
		var actionType ;
		if(lastActionDateWiseSearch === true){
		  actionType = appActionType.ACTION_TYPE_SELECT_LAST_ACTION;
		}else if(lastActionDateWiseSearch===false){
		  actionType = appActionType.ACTION_TYPE_SELECT_ALL_LOAN;
		}else{
			actionType=actionType;
		}

		if(fromDate && typeof fromDate != 'string'){
			fromDate =  Ext.Date.format(fromDate, 'Y-m-d');
		}

		if(toDate && typeof toDate != 'string'){
			toDate =  Ext.Date.format(toDate, 'Y-m-d');
		}

		accountNo = accountNo ? accountNo : null;
		bpNoSrc = bpNoSrc ? bpNoSrc : null;
		nid4Search = nid4Search ? nid4Search : null;
		phone4Search = phone4Search ? phone4Search : null;
		fromDate =  fromDate ? fromDate : null;
		toDate = toDate ? toDate: null;
		applicationNo = applicationNo ? applicationNo : null;
		loanTrackingId = loanTrackingId ? loanTrackingId : null;
		dataSourceCombo = dataSourceCombo ? dataSourceCombo : null;

		var header = {
			reference: 'onClickLoanSearch'
		};

		var payload = [{
			userModKey: loginUser.id,
			accountNo4Src: accountNo,
			bpNo: bpNoSrc,
			nid4Src: nid4Search,
			phone4Src: phone4Search,
			fromDate4Src: fromDate,
			toDate4Src: toDate,
			applicationNo: applicationNo,
			loanTrackingId: loanTrackingId,
			dataSource: dataSourceCombo,
			lastActionDateWiseSearch:lastActionDateWiseSearch,
			actionType: actionType
		}];		

		localStorage.setItem('loanSearchParam', JSON.stringify(payload[0]));

		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	
	onClickWorkHistorySearch: function () {
		var me = this;

		var fromDate = me.lookupReference('fromDateWorkHis').value;
		var toDate = me.lookupReference('toDateWorkHis').value;

		if (!fromDate) fromDate = new Date();
		if (!toDate) toDate = new Date();

		if (toDate.getTime() < fromDate.getTime()) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		var header = {
			reference: 'loadWorkHistoryData'
		};
		var payload = [{
            userModKey	: loginUser.id,
            fromDate4Src: fromDate,
			toDate4Src 	: toDate
        }];

        me.sendRequest(appActionType.SELECT_WORK_HISTORY, appContentType.CONTENT_TYPE_LOAN, payload, header);
    },


	onClickGroupingLoanSearch: function(){
        var me = this;

		var loanGroupId = me.lookupReference('loanGroupId').value;
		var loanTrackingId = me.lookupReference('loanTrackingId').value;
		
		var fromDate = me.lookupReference('fromDate').value;
		var toDate = me.lookupReference('toDate').value;

		if (!toDate) toDate = new Date();
		if(!loanTrackingId && !fromDate && !loanGroupId){
			fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
		}

		if (fromDate && toDate.getTime() < fromDate.getTime()) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		fromDate =  fromDate ? Ext.Date.format(fromDate, 'Y-m-d') : null;
		toDate = toDate ? Ext.Date.format(toDate, 'Y-m-d') : null;
		loanGroupId = loanGroupId ? loanGroupId : null;
		loanTrackingId = loanTrackingId ? loanTrackingId : null;

		var header = {
			reference: 'loadSearchGroupGridPanelData'
		};

		var payload = [{
			userModKey: loginUser.id,
			fromDate4Src: fromDate,
			toDate4Src: toDate,
			loanTrackingId: loanTrackingId,
			loanGroupId : loanGroupId,
		}];

		me.sendRequest(appActionType.ACTION_TYPE_SEARCH_LOAN_GROUP_DATA, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	onAddComment: function (btn, e, eOpt) {
		var btnRf = btn.reference,
			commentType,
			loanId = this.lookupReference('keepHiddenloanIdKey').value;
		var title = 'New';

		if (btnRf == 'cibStatusCommntBtn') {
			commentType = appConstants.CIB_STATUS;
			title = 'New CIB Status';
		} else if (btnRf == 'analystsCommntBtn') {
			commentType = appConstants.ANALYSTS_COMMENTS;
			title = 'New Analyst Comment';
		} else if (btnRf == 'exceptionDetailBtn') {
			commentType = appConstants.EXCEPTION_DETAILS;
			title = 'New Exception';
		} else if (btnRf == 'ins2CADBtn') {
			commentType = appConstants.INS_2_CAD;
			title = 'New Instruction';
		} else {
			console.log('No reference found');
		}


		var newComment = Ext.widget('newComment');


		newComment.lookupReference('commentType').setValue(commentType);
		newComment.lookupReference('objectType').setValue(appContentType.CONTENT_TYPE_LOAN.toUpperCase());
		newComment.lookupReference('loanId').setValue(loanId);
		newComment.setTitle(title);

		newComment.show();
	},

	onNewComment: function (cmp, newValue, oldValue) {
		var saveComment = this.lookupReference('saveComment');

		if (Ext.isEmpty(newValue)) {
			saveComment.setDisabled(true);
		} else {
			saveComment.setDisabled(false);
		}
	},

	onCancelComment: function (btn, e, eOpts) {
		this.view.destroy();
	},

	onSaveComment: function (btn, e, eOpts) {
		var me = this,
			store;

		var commentType = me.lookupReference('commentType').value,
			objectType = me.lookupReference('objectType').value,
			comment = me.lookupReference('comment').value,
			loanId = me.lookupReference('loanId').value;

		if (commentType == appConstants.CIB_STATUS) {
			store = Ext.data.StoreManager.lookup('gCibStatusCommentStore');
		} else if (commentType == appConstants.ANALYSTS_COMMENTS) {
			store = Ext.data.StoreManager.lookup('gAnalystCommentStore');
		} else if (commentType == appConstants.EXCEPTION_DETAILS) {
			store = Ext.data.StoreManager.lookup('gExceptionDetailStore');
		} else if (commentType == appConstants.INS_2_CAD) {
			store = Ext.data.StoreManager.lookup('gIns2CADStore');
		} else {
			console.log('Unknown comment type');
		}

		var header = {
			reference: 'onSaveComment'
		};

		var payload = [{
			userModKey: loginUser.id,
			creatorId: loginUser.id,
			objectType: objectType,
			commentType: commentType,
			refId: loanId,
			comments: comment
		}];

		if (!Ext.isEmpty(loanId)) {
			me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_COMMENT, payload, header);
		}

		payload[0].userName = loginUser.unId;
		payload[0].createDate = new Date();

		store.add(payload[0]);

		me.view.destroy();
	},

	onAddCellLiability: function (cmp, newValue, oldValue) {
		var colHeader = cmp.activeColumn.text;
	},

	onAddLiability: function (btn, e, eOpts) {
		var newLiability = Ext.widget('newLiability');
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		newLiability.lookupReference('loanId').setValue(loanId);
		newLiability.show();
	},

	onSaveLiability: function (btn, e, eOpts) {
		var me = this;

		var bankName = checkIsEmpty(me.lookupReference('bankName').value),
			product = checkIsEmpty(me.lookupReference('product').value),
			disbursed = checkIsEmpty(me.lookupReference('disbursed').value),
			currentOutstanding = checkIsEmpty(me.lookupReference('currentOutstanding').value),
			eMISize = checkIsEmpty(me.lookupReference('eMISize').value),
			remarks = checkIsEmpty(me.lookupReference('remarks').value),
			loanId = me.lookupReference('loanId').value;

		var header = {
			reference: 'onSaveLiability'
		};

		var payload = [{
			existingLiabilityId: null,
			userModKey: loginUser.id,
			creatorId: loginUser.id,
			bankName: bankName,
			product: product,
			disbursed: disbursed,
			currentOutstanding: currentOutstanding,
			eMISize: eMISize,
			remarks: remarks,
			loanId: loanId
		}];

		if (!Ext.isEmpty(loanId)) {
			me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);
		}

		var store = Ext.data.StoreManager.lookup('gExistingLiabilitiesStore');
		var arr = [];

		var data = store.data.items;

		for (var i = 0; i < data.length; i++) {
			arr.push(data[i].data);
		}

		if (!Ext.isEmpty(bankName) || !Ext.isEmpty(product) || !Ext.isEmpty(disbursed) || !Ext.isEmpty(currentOutstanding) || !Ext.isEmpty(eMISize) || !Ext.isEmpty(remarks)) {
			arr.push(payload[0]);
		}

		store.add(arr);
		me.view.destroy();
	},


	generateLoanGridReport: function (btn, e, eOpts) {

		var grid = this.lookupReference('loanMainSearchGrid');
        
	    
		var selectedLoan = grid.getSelectionModel().getSelection();
		if (selectedLoan.length > 0) {
			var namePopup = Ext.create('Desktop.view.loan.NamePopup');
			namePopup.lookupReference('loanMainSearchGrid').setValue(grid);
			namePopup.show();
			namePopup.modal = true;
		} else {
			Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\'.');
			return;
		}
	},
	onClickVerifyNid: function (btn, e, eOpts) {
        var searchNidForm = Ext.create('Desktop.view.loan.SearchNidForm');
        var nid = this.lookupReference('nid').value;
        var dateOfBirth = this.lookupReference('dateOfBirth').value;
        searchNidForm.lookupReference('searchNidNumber').setValue(nid);
        searchNidForm.lookupReference('searchDateOfBirth').setValue(dateOfBirth);
		searchNidForm.show();
	},
	onClickcibDetails: function(btn, e, eOpts){
		var tenorYear = this.lookupReference('tenorYear').value;
		var appliedLoanAmount = this.lookupReference('appliedLoanAmount').value;
        var loanId = this.lookupReference('loanId').value;
        var monthlyInstallment = this.lookupReference('monthlyInstallment').value;
        var tin = this.lookupReference('tin').value;
        var nid = this.lookupReference('nid').value;
        var dateOfBirth = this.lookupReference('dateOfBirth').value;  
        var mobile = this.lookupReference('mobile').value;        

		var win = getCibInformationWindow("CIB Generated Information Form");	
        var cibInformationsPanel = win.down('#CibInformationForm');
        cibInformationsPanel.lookupReference('numberOfInstallment').setValue(tenorYear*12);
        cibInformationsPanel.lookupReference('totalInstallmentAmount').setValue(appliedLoanAmount);
        cibInformationsPanel.lookupReference('loanIdForNewPerson').setValue(loanId);
        cibInformationsPanel.lookupReference('loanIdForSubjectCode').setValue(loanId);
        cibInformationsPanel.lookupReference('installmentAmount').setValue(monthlyInstallment);
        cibInformationsPanel.lookupReference('tin').setValue(tin);
        cibInformationsPanel.lookupReference('lmsNid').setValue(nid);
        cibInformationsPanel.lookupReference('lmsDateOfBirth').setValue(dateOfBirth);
        cibInformationsPanel.lookupReference('telephoneNumber').setValue(mobile);
               
		Ext.MessageBox.hide();
		isMessageBox = false;
		win.show();
	},
	generateLoanMemoReport: function (btn, e, eOpts) {

		var grid = this.lookupReference('loanGroupMainSearchGrid');
        
        var selectedRows = grid.getSelection().length;
	    
		var selectedLoan = grid.getSelectionModel().getSelection();
		if (selectedLoan.length > 0) {

			var loanGroupId = selectedLoan[0].data.loanGroupId;

			for (var i = 0; i < selectedRows; i++) {
	             if(loanGroupId != grid.getSelection()[i].data.loanGroupId){
						Ext.Msg.alert('Attention', 'Remove loan from loan group allowed only for same loan group');
						return;
				}
			}
			var memonamePopup = Ext.create('Desktop.view.loan.MemoNamePopup');
			memonamePopup.lookupReference('loanGroupMainSearchGrid').setValue(grid);
			memonamePopup.show();
			memonamePopup.modal = true;
		} else {
			Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\'.');
			return;
		}

	},


	onGridFilterEntryChange: function (component, newValue, oldValue, eOpts) {
		var grid = component.up('grid');
		this.filterLoanGrid(grid, newValue, resultFiler);
	},
	filterLoanGrid: function (grid, newValue, arrOfResultFiler) {
		grid.store.clearFilter();
		if (newValue) {
			var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
			grid.store.filter({
				filterFn: function (record) {
					var match = false;
					Ext.Object.each(record.data, function (property, value) {
						if (arrOfResultFiler.indexOf(property) > -1) {
							match = match || matcher.test(String(value));
						}
					});
					return match;
				}
			});
		}
	},
	filterLoanGridByMultiValue: function (grid, newValueArr, arrOfResultFiler) {
		grid.store.clearFilter();
		if (newValueArr === undefined || newValueArr.length == 0) return;
		else {
			grid.store.filter({
				filterFn: function (record) {
					var match = false;
					Ext.Object.each(record.data, function (property, value) {
						if (arrOfResultFiler.indexOf(property) > -1) {
							match = match || newValueArr.includes(String(value));
						}
					});
					return match;
				}
			});
		}
	},

	onLoanSearchGridItemSelect: function (rowmodel, record, index) {
		var me = this,
			count = 0,
			value = new Array();
		var selection = rowmodel.getSelected().items;
		console.log(selection.length);

		if (selection.length == 1) {
			record = selection[0];

			if (record.data.stateName == 'PEND_RECEIVED' && hasAnyRole(['MIS', 'CREDIT_ANALYST'])) {
				me.lookupReference('misPullFromGridBtn').setDisabled(false);
			}
			if ((record.data.stateName == 'SENT_TO_CAD' || record.data.stateName == 'SL_GENERATED ')
			 && hasAnyRole(['CAD'])) {
				me.lookupReference('cadReport').setDisabled(false);
			}
		} else {
			me.lookupReference('misPullFromGridBtn').setDisabled(true);
			me.lookupReference('cadReport').setDisabled(true);
		}
	},

	onKeyPressAccountNoSrc: function (field, e) {
		if (e.getKey() == e.ENTER) {
			this.onKeyPressCustomerSrc("accountNo", field.value, "Account No");
		}
	},
	onKeyPressBpNoSrc: function (field, e) {
		if (e.getKey() == e.ENTER) {
			this.duplicateLoanCheckForSameBp(field.value);		
		}
	},
	onKeyPressNid4Src: function (field, e) {
		if (e.getKey() == e.ENTER) {
			this.onKeyPressCustomerSrc("nid", field.value, "NID");
		}
	},
	onKeyPressphone4Src: function (field, e) {
		if (e.getKey() == e.ENTER) {
			this.onKeyPressCustomerSrc("phone", field.value, "Phone");
		}
	},

	duplicateLoanCheckForSameBp(bp){
		var me=this;
		var bpNo = bp;

		if(bpNo){
			showProcessMessage('Checking For Duplicate BP Number....');
			var header = {
				reference: 'duplicateBpNumberLoanCheck'
			};				
			var payload = [{
				userModKey: loginUser.id,
				bpNo : bpNo ? bpNo : null,		
			}];
			me.sendRequest(appActionType.ACTION_TYPE_DUPLICATE_LOAN_CHECK_SAME_BP, appContentType.CONTENT_TYPE_LOAN, payload, header);	
			localStorage.setItem('loanSearchParam', JSON.stringify(payload[0]));	
		}else{
			Ext.MessageBox.alert('Invalid Data', 'Canot search with Empty');
			return;
		}
	},
	onKeyPressCustomerSrc(valueType, value, valueTypeText) {

		var me=this;

		if(value){
			showProcessMessage('Searching for Customer....');

			var header;
			if (userRoles.containsKey(appConstants.FIELD_OFFICER)) {
				header = {
					reference: 'onClickSearchFO'
				};

			    var payload = [{
					userModKey: loginUser.id		
			   }];	
			} 
			else {
				header = {
					reference: 'onClickSearchCustomer'
				};

				var payload = [{
					userModKey: loginUser.id				
				}];
			}

			payload[0][valueType] = value;
			payload[0]['searchByStr'] = valueTypeText + ' = ' + value;

			me.sendRequest(appActionType.ACTION_TYPE_SELECT_CUSTOMER, appContentType.CONTENT_TYPE_CUSTOMER, payload, header);
		}
		else{
			Ext.MessageBox.alert('Invalid Data', 'Canot search with Empty [' + valueType + ']');
			return;
		}
	},


	onNewCibStatus: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gCibStatusCommentStore');
	},
	onNewAnalystComment: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gAnalystCommentStore');
	},
	onNewExceptionDetail: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gExceptionDetailStore');
	},
	onNewInstruction2Cad: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gIns2CADStore');
	},
	onNewLiability: function (grid, rowIndex, colIndex) {
		var me = this;
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		if (loanId) {
			var header = {
				reference: 'onNewLiability'
			};

			var payload = getLiabilitiesForSaveAndNewCol(this);

			me.sendRequest(appActionType.ACTION_TYPE_NEW_UPDATE_LIABILITY, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);
		}
	},

	onSaveCibStatus: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.CIB_STATUS;
		var reference = 'onSaveCibStatus';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onSaveAnalystsComment: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.ANALYSTS_COMMENTS;
		var reference = 'onSaveAnalystsComment';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onSaveExceptionDetail: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.EXCEPTION_DETAILS;
		var reference = 'onSaveExceptionDetail';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onSaveInstruction2Cad: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.INS_2_CAD;
		var reference = 'onSaveInstruction2Cad';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onSaveCommentModelGrid(grid, rowIndex, reference, commentType) {
		var me = this;

		var data = grid.store.data.items[rowIndex].data;

		if (!isValidComment(data.comments)) {
			console.log('Please do some Comment.');
			return;
		}

		var header = {
			reference: reference
		};

		if (!data.commentId) {
			var loanId = me.lookupReference('keepHiddenloanIdKey').value;
			var payload = [{
				userModKey: loginUser.id,
				creatorId: loginUser.id,
				objectType: appContentType.CONTENT_TYPE_LOAN.toUpperCase(),
				commentType: commentType,
				refId: loanId,
				comments: data.comments,
				rowIndex: rowIndex,
				commentedBy: loginUser.unId
			}];
			me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_COMMENT, payload, header);
		} else {
			var payload = [{
				userModKey: loginUser.id,
				comments: data.comments,
				commentId: data.commentId
			}];
			me.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_COMMENT, payload, header);
		}
	},

	onActionSaveLiability: function (grid, rowIndex, colIndex) {
		var me = this;
		var data = grid.store.data.items[rowIndex].data;
		if (!isValidLiability(data)) {
			Ext.MessageBox.alert('Invalid Data', 'Column value can not be Empty.');
			return false;
		}

		var header = {
			reference: 'onActionSaveLiability'
		};

		var payload = getLiabilitiesForSaveAndNewCol(this);

		me.sendRequest(appActionType.ACTION_TYPE_NEW_UPDATE_LIABILITY, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);
	},

	onDelCibStatus: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gCibStatusCommentStore', rowIndex, 'onDelCibStatus');
	},
	onDelAnalystsComment: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gAnalystCommentStore', rowIndex, 'onDelCibStatus');
	},
	onDelExceptionDetail: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gExceptionDetailStore', rowIndex, 'onDelCibStatus');
	},
	onDelInstruction2Cad: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gIns2CADStore', rowIndex, 'onDelCibStatus');
	},
	onDeleteCommentModelGrid(storeId, rowIndex, reference) {
		var me = this;
		var store = getGlobalStore(storeId);
		var data = store.getAt(rowIndex).data;

		if (!data.commentId) {
			store.removeAt(rowIndex);
			if (store.data.items.length == 0) {
				setDefultCommentRow(storeId);
			}
		} else {
			    Ext.Msg.show({
				title:'Attention',
				message: 'Are your sure?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				modal: true,
				fn: function(btn) {
						if (btn == 'yes') {

						var header = {
							reference: reference
						};
						var payload = [{
							userModKey: loginUser.id,
							commentId: data.commentId
						}];

						me.sendRequest(appActionType.ACTION_TYPE_DELETE, appContentType.CONTENT_TYPE_COMMENT, payload, header);

						store.removeAt(rowIndex);

						if (store.data.items.length == 0) {
							setDefultCommentRow(storeId);
						}
					}

				 }

		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);
				
		}
	},

	onDelLiability: function (grid, rowIndex, colIndex) {

		var me = this;
		var store = me.lookupReference('existingLiabilitiesGrid').store;
		var data = store.getAt(rowIndex).data;

		if (!data.existingLiabilityId) {
			store.removeAt(rowIndex);

			if (store.data.items.length == 0) {
				store.insert(0, new Desktop.model.ExistingLiabilitiesModel());
			}
		} else {
				Ext.Msg.show({
				title:'Attention',
				message: 'Are your sure?',
				buttons: Ext.Msg.YESNO,
				icon: Ext.Msg.QUESTION,
				modal: true,
				fn: function(btn) {
						if (btn == 'yes') {
						var header = {
							reference: 'onDelLiability'
						};
						var payload = [data];

						me.sendRequest(appActionType.ACTION_TYPE_DELETE, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);

						store.removeAt(rowIndex);

						if (store.data.items.length == 0) {
							store.insert(0, new Desktop.model.ExistingLiabilitiesModel());
						}
					}
				 }
			});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);
		}
	},

	onDelCmntJustification: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gCmntJustificationStore', rowIndex, 'onDelCmntJustification');
	},
	onDelCmntWaiverSought: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gCmntWaiverSoughtStore', rowIndex, 'onDelCmntWaiverSought');
	},
	onSaveCmntJustification: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.COMMENTS_JUSTIFICATION;
		var reference = 'onSaveCmntJustification';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onSaveCmntWaiverSought: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.COMMENTS_WAIVER_SOUGHT;
		var reference = 'onSaveCmntWaiverSought';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onNewCmntJustification: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gCmntJustificationStore');
	},
	onNewCmntWaiverSought: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gCmntWaiverSoughtStore');
	},
	onDelSourceRecmnd: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gSourceRecmndStore', rowIndex, 'onDelSourceRecmnd');
	},
	onSaveSourceRecmnd: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.SO_RECOMMENDATION;
		var reference = 'onSaveSourceRecmnd';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onNewSourceRecmnd: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gSourceRecmndStore');
	},

	onDelBranchRecmnd: function (grid, rowIndex, colIndex) {
		this.onDeleteCommentModelGrid('gBranchRecmndStore', rowIndex, 'onDelBranchRecmnd');
	},
	onSaveBranchRecmnd: function (grid, rowIndex, colIndex) {
		var commentType = appConstants.BM_RECOMMENDATION;
		var reference = 'onSaveBranchRecmnd';
		this.onSaveCommentModelGrid(grid, rowIndex, reference, commentType);
	},
	onNewBranchRecmnd: function (grid, rowIndex, colIndex) {
		setCommentRowAtEnd('gBranchRecmndStore');
	},

	onRefreshCreateNewLoanTree: function () {
		var header = {
			reference: 'onRefreshCreateNewLoanTree'
		};
		var payload = [{
			group: appConstants.LOAN,
			subGroup: appConstants.LOAN_TYPE,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);

	},

	onNewLoanTreeChildDblClick: function (cmp, rec) {
		var loanPrefix = rec.data.loanPrefix;
		var title = rec.data.text.toUpperCase();
		if (title.includes('LOAN')) title = "NEW " + title;
		else title = "NEW " + title + ' LOAN';
		var win;
		var loanDetailsPanel;

		if (userRoles.containsKey(appConstants.FIELD_OFFICER)) {
			win = getFieldOfficerLoanWindow(title);
			loanDetailsPanel = win.down('#FieldOfficerInfoDetails');
			loanDetailsPanel.setHeight(770);
			loanDetailsPanel.lookupReference('saveApplicationBtn').setHidden(false);
			loanDetailsPanel.lookupReference('hiddenLoanPrefix').setValue(loanPrefix);
			
			if(!isLoanTypeGpf(loanPrefix)){
				mandotaryForPersonal(loanDetailsPanel);
			}
		}
		else {
			win = getLoanWindow(title);
			loanDetailsPanel = win.down('#LoanDetails');
			loanDetailsPanel.lookupReference('hiddenLoanPrefix').setValue(loanPrefix);

			if (hasAnyRole(headOfficeUserRoles)) {
				hideFieldForHeadOffice(loanDetailsPanel);
			} else if (isLoanTypeGpf(loanPrefix)) {
				showSecurity(loanDetailsPanel);
				if (userRoles.containsKey(appConstants.BOM_GULSHAN) ||
					(userRoles.containsKey(appConstants.SOURCE_OFFICER)) ||
					(userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))) {
					hideCibStatus(loanDetailsPanel);
				}
			    if(userRoles.containsKey(appConstants.SOURCE_OFFICER)||userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)){
				 loanDetailsPanel.lookupReference('gPFAmount').setHidden(false); 
			    }
			    if((userRoles.containsKey(appConstants.SOURCE_OFFICER))){				   
					  writeGpfAmount(loanDetailsPanel);						 
			   }  
			} else if (userRoles.containsKey(appConstants.BOM_GULSHAN) ||
				(userRoles.containsKey(appConstants.SOURCE_OFFICER)) ||
				(userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR))) {
				hideCibStatus(loanDetailsPanel);
			}
			else {
				hideFieldForBranchOffice(loanDetailsPanel);
			}

			manageLoanFieldForNewLoan(loanDetailsPanel);
		}
		loanDetailsPanel.lookupReference('loanType').setValue(rec.data.configurationId);
		win.show();
	},

	onAppliedLoanAmountChangeFO: function (cmp, newValue, oldValue, e, eOpt) {
		var val = this.lookupReference('appliedLoanAmount').value;
		if (val >= 500000) {
			this.lookupReference('uploadTinContainer').setHidden(false);
		} else {
			this.lookupReference('uploadTinContainer').setHidden(true);
		}

	},

	onRefreshDocGrid: function (cmp) {
		this.loadLoanAllDocument(cmp.up('#LoanDetails'));
	},

	loadDocumentationList: function (cmp) {

		var customerTypeId = cmp.lookupReference('customerType').value;
		var loanTypeId = cmp.lookupReference('loanType').value;

		if (!customerTypeId) {
			Ext.MessageBox.alert('Missing Field', 'Please fill Customer Type.');
			return;
		}

		var header = {
			reference: 'loadDocumentationList'
		};
		var payload = [{
			customerTypeId: customerTypeId,
			loanTypeId: loanTypeId,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_CONFIG, appContentType.CONTENT_TYPE_LOAN_CONFIG, payload, header);

	},

	loadDocListForExistingLoan: function (cmp) {

		var customerTypeId = cmp.lookupReference('customerType').value;
		var loanTypeId = cmp.lookupReference('loanType').value;
		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

		if (Ext.isEmpty(loanTypeId)) {
			return;
		}
		if (!customerTypeId) {
            Ext.MessageBox.alert('Missing Field', 'Please fill Customer Type.');
            return;
        }

		var header = {
			reference: 'loadDocListForExistingLoan'
		};
		var payload = [{
			idCustomerTypeKey: customerTypeId,
			idLoanTypeKey: loanTypeId,
			loanId: loanId ? loanId : null,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_DOC_FOR_EXISTING_LOAN, appContentType.CONTENT_TYPE_LOAN_DOCUMENT, payload, header);
	},

	loadLoanAllDocument: function (cmp) {

		var customerTypeId = cmp.lookupReference('customerType').value;
		var loanTypeId = cmp.lookupReference('loanType').value;
		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

		if (Ext.isEmpty(loanTypeId)) {
			return;
		}
		if (!customerTypeId) {
            Ext.MessageBox.alert('Missing Field', 'Please fill Customer Type.');
            return;
        }

		var header = {
			reference: 'loadLoanAllDocument'
		};
		var payload = [{
			idCustomerTypeKey: customerTypeId,
			idLoanTypeKey: loanTypeId,
			loanId: loanId ? loanId : null,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_ALL_DOCUMENT, appContentType.CONTENT_TYPE_LOAN_DOCUMENT, payload, header);
	},

	onChangeDocumentFile: function (filefield, value, eOpts) {

		var me = this;

		var rowIndex = filefield.up().items.items[0].value;
		var data = getGlobalStore('gLoanDocumentStore').getAt(rowIndex).data;
		data.dttMod = null;
		if (!data.userModKey) {
			data['userModKey'] = loginUser.id;
		} else {
			data.userModKey = loginUser.id;
		}


		var sizeInBytes = filefield.fileInputEl.dom.files[0].size;
		var sizeInMb = sizeInBytes / 1048576;

		if (sizeInMb > 1.0) {
			Ext.MessageBox.alert('Warn', 'Maximum file size is 1 MB.');
			return;
		}

		filefield.up('form').submit({
			params: {
				loanDocument: JSON.stringify(data),
				docTrack: data.docType ? data.docType : null,
			},
			url: UPLOAD_LOAN_DOC_URL,

			waitMsg: 'Uploading File...',

			success: function (result, request) {
				me.loadLoanAllDocument(filefield.up('#LoanDetails'));
			},

			failure: function (result, request) {
				me.loadLoanAllDocument(filefield.up('#LoanDetails'));
			}
		});
	},

	onChangeDocGridUploadStatus: function (field, newValue, oldValue) {
		var rowIndex = field.items.items[0].value;
		var data = getGlobalStore('gLoanDocumentStore').getAt(rowIndex).data;
		var uploadStatus = Object.values(newValue)[0];
		data.uploadStatus = uploadStatus;

		var header = {
			reference: 'onChangeDocGridUploadStatus'
		};
		var payload = [{
			uploadStatus: uploadStatus,
			loanDocId: data.loanDocId,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_LOAN_DOCUMENT, payload, header);
	},

	onClickPersonViewImage: function(btn){
		var personImagePath = this.lookupReference('personImagePath').value;
        var pdfPanel = getNidImagePanel("", "", "", "", "", personImagePath);
		pdfPanel.show();

	},

	onClickNidViewImage(btn){
		var nidImagePath = this.lookupReference('nidImagePath').value;
        var pdfPanel = getNidImagePanel("", "", "", "", "", nidImagePath);
		pdfPanel.show();

	},

	onClickDocGridViewFile: function (grid, rowIndex, colIndex) {

		var data = grid.store.data.items[rowIndex].data;
		if (data.filePresent == 1) {
			var serverUrl = VIEW_LOAN_DOC_URL + '?loanDocId=' + data.loanDocId + '&userModKey=' + loginUser.id;

			var pdfPanel = getPdfPanel("", "", "", "", "", serverUrl);
			pdfPanel.show();
		} else {
			Ext.toast('File is Not Present.');
		}
	},
	onClickDocGridDownload: function (grid, rowIndex, colIndex) {

		var data = grid.store.data.items[rowIndex].data;
		if (data.filePresent == 1) {
			var serverUrl = DOWNLOAN_LOAN_DOC_URL + '?loanDocId=' + data.loanDocId + '&userModKey=' + loginUser.id;
			var pdfPanel = getPdfPanel("", "", "", "", "", serverUrl);

			pdfPanel.show();
			pdfPanel.destroy();
		} else {
			Ext.toast('File is Not Present.');
		}
	},

	onClickFODeleteApplication: function (btn) {
		this.onDeleteApplication(this, appActionType.ACTION_TYPE_FO_DELETE);
	},
	onClickFOCreateApplication: function (btn) {
		this.onActionFoApplication(this, appActionType.ACTION_TYPE_FO_CREATE);
	},
	onClickFOUpdateApplication: function (btn) {
		this.onActionFoApplication(this, appActionType.ACTION_TYPE_FO_UPDATE);
	},
	onClickFOSubmitApplication: function (btn) {
		this.onActionFoApplication(this, appActionType.ACTION_TYPE_FO_SUBMIT);
	},
	onClickFOCloseApplication: function (button, e, eOpts) {
		loanDetailsWinToClose.close();
	},
	onClickCIBFormCloseBtn:function(button, e, eOpts){
		cibDetailsWinClose.close();
	},


	// Source Officer Actions
	onClickSoSaveApplication: function (btn) {
		this.onSaveApplication(this, appActionType.ACTION_TYPE_SO_CREATE);
	},
	onClickSoUpdateApplication: function (btn) {
		var loanStateName= this.lookupReference('loanStateName').value;

		if((loanStateName=='CAD_SENT_QUERY_TO_SO')||(loanStateName=='SO_CAD_QUERY_UPDATED')) {
		    this.onUpdateApplication(this, appActionType.ACTION_TYPE_SO_CAD_QUERY_UPDATE);
		} else {
			this.onUpdateApplication(this, appActionType.ACTION_TYPE_SO_UPDATE);
		}		
	},
	onClickSoDeleteApplication: function (btn) {
		this.onDeleteApplication(this, appActionType.ACTION_TYPE_SO_DELETE);
	},
	onClickCaDeleteApplication: function (btn) {
		this.onDeleteApplication(this, appActionType.ACTION_TYPE_CA_DELETE);
	},
	onSoRecommendToGroupClick: function (cmp, items) {
		this.onRecommendToGroupClick(cmp, getSoRecommendAction(this), appConstants.SO_RECOMMEND_TO_GROUP);
	},
	onSoRecommendToUserClick: function (cmp, items) {
		this.onRecommendToUserClick(cmp, getSoRecommendAction(this), appConstants.SO_RECOMMEND_TO_USER);
	},

	// BM, BOM, PPC actions
	onClickBmBomPcRecommendbtn: function (btn) {
		var cmp = this;
		var actionType;
		var commentType;
		if (userRoles.containsKey(appConstants.BRANCH_MANAGER)) {
			actionType = appActionType.ACTION_TYPE_BM_RECOMMEND;
			commentType = appConstants.BM_RECOMMEND_COMMENT;
		} else if (userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER)) {
			actionType = appActionType.ACTION_TYPE_BOM_RECOMMEND;
			commentType = appConstants.BOM_RECOMMEND_COMMENT;
		} else if (userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)) {
			actionType = appActionType.ACTION_TYPE_PPC_RECOMMEND;
			commentType = appConstants.PPC_RECOMMEND_COMMENT;
		}

		this.executeStateTransitionDetailsPage(cmp, actionType);

		// var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		// recommentSetValueOnBtnClick(newRecomment, cmp, commentType, actionType);
		// newRecomment.show();
	},
	onClickBmBomPcReturnBtn: function (btn) {
		var cmp = this;
		var actionType;
		var commentType;
		if (userRoles.containsKey(appConstants.BRANCH_MANAGER)) {
			actionType = appActionType.ACTION_TYPE_BM_RETURN;
			commentType = appConstants.BM_RETURN_COMMENT;
		} else if (userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER)) {
			actionType = appActionType.ACTION_TYPE_BOM_RETURN;
			commentType = appConstants.BOM_RETURN_COMMENT;
		} else if (userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)) {
			actionType = appActionType.ACTION_TYPE_PPC_RETURN;
			commentType = appConstants.PPC_RETURN_COMMENT;
		}

		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, cmp, commentType, actionType);
		newRecomment.show();
	},

	// MIS's actions
	onClickMisPullFromDetailBtnClick: function (btn) {
		var me = this;

		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
					if (btn == 'yes') {
					var loanId = me.lookupReference('loanId').value;
					var stateName = me.lookupReference('loanStateName').value;
					var stateId = me.lookupReference('loanStateId').value;
					var loanTypeId = me.lookupReference('loanType').value;
					var bpNo = me.lookupReference('bpNo').value;
					if (!bpNo) bpNo = null;

					var header = {
						reference: 'executeStateTransitionDetailsPage'
					};

					var payload = [{
						loanId: loanId,
						stateName: stateName,
						stateId: stateId,
						userModKey: loginUser.id,
						idLoanTypeKey: loanTypeId,
						bpNo: bpNo,
						uiActionName: appActionType.ACTION_TYPE_MIS_RECEIVE
					}];

					showProcessMessage('Executing action....');
					me.sendRequest(appActionType.ACTION_TYPE_MIS_RECEIVE, appContentType.CONTENT_TYPE_LOAN, payload, header);
					var LoanPanelClass = new Desktop.view.loan.LoanPanel();
					var loanSearchBtn = LoanPanelClass.lookupReference('loanSearchBtn');
					loanSearchBtn.fireEvent('click');
				}
			 }
		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);		
	},

	onClickCApendReceivedClick: function (btn) {
		var me = this;

		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
					if (btn == 'yes') {
					var loanId = me.lookupReference('loanId').value;
					var stateName = me.lookupReference('loanStateName').value;
					var stateId = me.lookupReference('loanStateId').value;
					var loanTypeId = me.lookupReference('loanType').value;
					var bpNo = me.lookupReference('bpNo').value;
					if (!bpNo) bpNo = null;

					var header = {
						reference: 'executeStateTransitionDetailsPage'
					};

					var payload = [{
						loanId: loanId,
						stateName: stateName,
						stateId: stateId,
						userModKey: loginUser.id,
						idLoanTypeKey: loanTypeId,
						bpNo: bpNo,
						uiActionName: appActionType.ACTION_TYPE_CA_RECEIVE
					}];

					showProcessMessage('Executing action....');
					me.sendRequest(appActionType.ACTION_TYPE_CA_RECEIVE, appContentType.CONTENT_TYPE_LOAN, payload, header);
				//	var LoanPanelClass = new Desktop.view.loan.LoanPanel();
				//	var loanSearchBtn = LoanPanelClass.lookupReference('loanSearchBtn');
					//loanSearchBtn.fireEvent('click');
				//	me.onRefreshGrid();
				}
			 }
		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);			
	},

	onClickMisUpdateBtn: function (btn) {
		this.onUpdateApplication(this, appActionType.ACTION_TYPE_MIS_UPDATE);
	},
	onClickMisSendToCadBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_MIS_SEND_TO_CAD);
	},
	onClickMisSendToCibBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_MIS_SEND_TO_CIB);
	},
	onClickMisMailToPoliceBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.MAIL_TO_POLICE);
	},
	onMisAllocateToGroupClick: function (cmp, items) {
		this.onRecommendToGroupClick(cmp, getMisAllocateAction(this), appConstants.MIS_ALLOCATE_TO_GROUP);
	},
	onMisAllocateToUserClick: function (cmp, items) {
		this.onRecommendToUserClick(cmp, getMisAllocateAction(this), appConstants.MIS_ALLOCATE_TO_USER);
	},
	onMisReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_MIS_RETURN, appConstants.MIS_RETURN_TO_GROUP);
	},
	onMisReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_MIS_RETURN, appConstants.MIS_RETURN_TO_USER);
	},

	// Credit Analyst's actions
	onClickCreditAnalystUpdt: function (btn) {
		var loanStateName= this.lookupReference('loanStateName').value;
		
		if((loanStateName=='CAD_SENT_QUERY_TO_CA')||(loanStateName=='CA_CAD_QUERY_UPDATED')) {
		    this.onUpdateApplication(this, appActionType.ACTION_TYPE_CA_CAD_QUERY_UPDATE);
		} else {
			this.onUpdateApplication(this, appActionType.ACTION_TYPE_CA_UPDATE);
		}	
	},
	onCaRecommendToGroupClick: function (cmp, items) {
		this.onRecommendToGroupClick(cmp, getCaRecommendAction(this), appConstants.CA_RECOMMEND_TO_GROUP);
	},
	onCaRecommendToUserClick: function (cmp, items) {
		this.onRecommendToUserClick(cmp, getCaRecommendAction(this), appConstants.CA_RECOMMEND_TO_USER);
	},
	onCaReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_CA_RETURN, appConstants.CA_RETURN_TO_GROUP);
	},
	onCaReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_CA_RETURN, appConstants.CA_RETURN_TO_USER);
	},
	onClickBtnConditionFulfil: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_CA_C_FULFILL);
	},
	onClickBtnSendQuery: function (btn) {
		var me = btn;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = appConstants.CA_SEND_QUERY_COMMENT;
		recommentSetValue(newRecomment, me, commentType, appActionType.ACTION_TYPE_CA_SEND_QUERY);
		newRecomment.lookupReference('commentForSendQuery').setHidden(false);
		newRecomment.lookupReference('newComment').setHidden(true);
		newRecomment.show();
	},
	onClickCaSendToCibBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_CA_SEND_TO_CIB);
	},

	// Risk Manager's actions
	onClickRmApproveBtn: function (btn) {
		var me = btn;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = appConstants.RM_APPREOVED_COMMENT;
		recommentSetValue(newRecomment, me, commentType, appActionType.ACTION_TYPE_RM_APPROVE);
		newRecomment.show();
	},
	onClickRmConditionalApproveBtn: function (btn) {
		var me = btn;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = appConstants.RM_SEND_QUERY_COMMENT;
		recommentSetValue(newRecomment, me, commentType, appActionType.ACTION_TYPE_RM_C_APPROVE);
		newRecomment.show();
	},
	onRmRecommendToGroupClick: function (cmp, items) {
		this.onRecommendToGroupClick(cmp, getRmRecommendAction(this), appConstants.RM_RECOMMEND_TO_GROUP);
	},
	onRmRecommendToUserClick: function (cmp, items) {
		this.onRecommendToUserClick(cmp, getRmRecommendAction(this), appConstants.RM_RECOMMEND_TO_USER);
	},
	onRmReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_RM_RETURN, appConstants.RM_RETURN_TO_GROUP);
	},
	onRmReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_RM_RETURN, appConstants.RM_RETURN_TO_USER);
	},
	onClickRmDeclineBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_RM_DECLINE);
	},
	onClickRmDeferBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_RM_DEFER);
	},

	//Unit Head's Actions
	onClickUhApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.UH_APPROVE_COMMENT, appActionType.ACTION_TYPE_UH_APPROVE);
		newRecomment.show();
	},
	onClickUhConditionalApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.UH_C_APPROVE_COMMENT, appActionType.ACTION_TYPE_UH_C_APPROVE);
		newRecomment.show();
	},
	onUhRecommendToGroupClick: function (cmp, items) {
		this.onRecommendToGroupClick(cmp, getUhRecommendAction(this), appConstants.UH_RECOMMEND_TO_GROUP);
	},
	onUhRecommendToUserClick: function (cmp, items) {
		this.onRecommendToUserClick(cmp, getUhRecommendAction(this), appConstants.UH_RECOMMEND_TO_USER);
	},
	onUhReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_UH_RETURN, appConstants.UH_RETURN_TO_GROUP);
	},
	onUhReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_UH_RETURN, appConstants.UH_RETURN_TO_USER);
	},
	onClickUhDeclineBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_UH_DECLINE);
	},
	onClickUhDeferBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_UH_DEFER);
	},

	//Start HoCRM's Actions
	onClickHoCrmApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.HOCRM_APPROVE_COMMENT, appActionType.ACTION_TYPE_HOCRM_APPROVE);
		newRecomment.show();
	},
	onClickHoCrmConditionalApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.HOCRM_C_APPROVE_COMMENT, appActionType.ACTION_TYPE_HOCRM_C_APPROVE);
		newRecomment.show();
	},
	onHoCrmRecommendToGroupClick: function (cmp, items) {
		this.onRecommendToGroupClick(cmp, getHoCrmRecommendAction(this), appConstants.HoCRM_RECOMMEND_TO_GROUP);
	},
	onHoCrmRecommendToUserClick: function (cmp, items) {
		this.onRecommendToUserClick(cmp, getHoCrmRecommendAction(this), appConstants.HoCRM_RECOMMEND_TO_USER);
	},
	onHoCrmReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_HOCRM_RETURN, appConstants.HoCRM_RETURN_TO_GROUP);
	},
	onHoCrmReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_HOCRM_RETURN, appConstants.HoCRM_RETURN_TO_USER);
	},
	onClickHoCrmDeclineBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_HOCRM_DECLINE);
	},
	onClickHoCrmDeferBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_HOCRM_DEFER);
	},
	onClickHoCrmSendToCadBtn: function (btn) {
		var loanGroupId = this.lookupReference('hiddenLoanGroupId').getValue();
		if (typeof  loanGroupId !== "undefined" && loanGroupId!=null && loanGroupId !='') {
			this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_HOCRM_SEND_TO_CAD);
		}else{
			Ext.Msg.alert('Attention', 'This Loan has not any group Id. Please create loan group before send to cad.');
		}
		
	},

	//Start MD's Actions
	onClickMdApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.MD_APPROVE_COMMENT, appActionType.ACTION_TYPE_MD_APPROVE);
		newRecomment.show();
	},
	onClickMdConditionalApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.MD_C_APPROVE_COMMENT, appActionType.ACTION_TYPE_MD_C_APPROVE);
		newRecomment.show();
	},
	onMdReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_MD_RETURN, appConstants.MD_RETURN_TO_GROUP);
	},
	onMdReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_MD_RETURN, appConstants.MD_RETURN_TO_USER);
	},
	onClickMdDeclineBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_MD_DECLINE);
	},
	onClickMdDeferBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_MD_DEFER);
	},

	//Start CEO's Actions
	onClickCeoApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.CEO_APPROVE_COMMENT, appActionType.ACTION_TYPE_CEO_APPROVE);
		newRecomment.show();
	},
	onClickCeoConditionalApproveBtn: function (btn) {
		var me = this;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		recommentSetValueOnBtnClick(newRecomment, me, appConstants.CEO_C_APPROVE_COMMENT, appActionType.ACTION_TYPE_CEO_C_APPROVE);
		newRecomment.show();
	},
	onCeoReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_CEO_RETURN, appConstants.CEO_RETURN_TO_GROUP);
	},
	onCeoReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_CEO_RETURN, appConstants.CEO_RETURN_TO_USER);
	},
	onClickCeoDeclineBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_CEO_DECLINE);
	},
	onClickCeoDeferBtn: function (btn) {
		this.executeStateTransitionDetailsPage(this, appActionType.ACTION_TYPE_CEO_DEFER);
	},

	/*For Cad user*/
	onCadReturnToGroupClick: function (cmp, items) {
		this.onReturnToGroupClick(cmp, appActionType.ACTION_TYPE_CAD_RETURN, appConstants.CAD_RETURN_TO_GROUP);
	},
	onCadReturnToUserClick: function (cmp, items) {
		this.onReturnToUserClick(cmp, appActionType.ACTION_TYPE_CAD_RETURN, appConstants.CAD_RETURN_TO_USER);
	},

	onClickCadSendQuery2So: function (btn) {
		var me = btn;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = appConstants.CAD_QUERY_TO_SO_COMMENT;
		recommentSetValue(newRecomment, me, commentType, appActionType.ACTION_TYPE_CAD_QUERY_TO_SO);
		newRecomment.show();
	},
	onClickCadSendQuery2Ca: function (btn) {
		var me = btn;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = appConstants.CAD_QUERY_TO_CA_COMMENT;
		recommentSetValue(newRecomment, me, commentType, appActionType.ACTION_TYPE_CAD_QUERY_TO_CA);
		newRecomment.show();
	},
	onClickCadDisbursed: function (btn) {
		var me = btn;
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = appConstants.CAD_DISBURSED;
		recommentSetValue(newRecomment, me, commentType, appActionType.ACTION_TYPE_CAD_DISBURSE);
		newRecomment.show();
	},
	oncommentForSendQuery: function(btn) {
		var commentType = this.lookupReference('commentForSendQuery').value;
		if(commentType == 'Others'){
			this.lookupReference('newComment').setHidden(false);
		}else{
			this.lookupReference('newComment').setHidden(true);
		}
	},

	// Common Functions in Action Segment
	executeStateTransitionFromLoanGrid(grid, action) {

		var selectedLoan = grid.getSelectionModel().getSelection();

		var data = selectedLoan[0].data;

		showProcessMessage('Executing action....');

		var header = {
			reference: 'executeStateTransitionFromLoanGrid'
		};

		var payload = [{
			loanId: data.loanId,
			stateName: data.stateName,
			stateId: data.stateId,
			userModKey: loginUser.id,
			uiActionName: action
		}];
		this.sendRequest(appActionType.ACTION_STATE_TRANSITION, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	executeStateTransitionDetailsPage(loanDetailsPanel, action) {
		var me = this;
		Ext.Msg.show({
			title:'Attention',
			message: 'Are your sure?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			modal: true,
			fn: function(btn) {
					if (btn == 'yes') {
					var actionType;
					var loanId = me.lookupReference('loanId').value;
					var stateName = me.lookupReference('loanStateName').value;
					var stateId = me.lookupReference('loanStateId').value;

					showProcessMessage('Executing action....');

					var header = {
						reference: 'executeStateTransitionDetailsPage'
					};

					var payload = [{
						loanId: loanId,
						stateName: stateName,
						stateId: stateId,
						userModKey: loginUser.id,
						uiActionName: action
					}];

					me.sendRequest(appActionType.ACTION_STATE_TRANSITION, appContentType.CONTENT_TYPE_LOAN, payload, header);
					//me.onRefreshGrid();
				}
			 }
		});
	    Ext.defer(function () { Ext.Msg.toFront() }, 200);			
	},

	onRecommendToGroupClick: function (cmp, actionType, commentType) {
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = commentType;
		recommentSetValue(newRecomment, cmp, commentType, actionType);
		newRecomment.show();
	},
	onRecommendToUserClick: function (cmp, actionType, commentType) {

		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = commentType;
		recommentSetValue(newRecomment, cmp, commentType, actionType);
		newRecomment.show();
	},
	onReturnToGroupClick: function (cmp, actionType, commentType) {
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = commentType;
		recommentSetValue(newRecomment, cmp, commentType, actionType);
		newRecomment.show();
	},
	onReturnToUserClick: function (cmp, actionType, commentType) {
		var newRecomment = Ext.create('Desktop.view.loan.RecommentPopup');
		var commentType = commentType;
		recommentSetValue(newRecomment, cmp, commentType, actionType);
		newRecomment.show();
	},

	misPullFromGridBtnClick: function (btn, e, eOpts) {
		console.log("receiving");
		var grid = this.lookupReference('loanMainSearchGrid');

		var selectedLoan = grid.getSelectionModel().getSelection();

		var data = selectedLoan[0].data;

		var actionType = appActionType.ACTION_TYPE_MIS_RECEIVE;
		if(hasAnyRole(['CREDIT_ANALYST'])){
			actionType = appActionType.ACTION_TYPE_CA_RECEIVE;
		}

		var header = {
			reference: 'executeStateTransitionFromLoanGrid'
		};

		var payload = [{
			loanId: data.loanId,
			stateName: data.stateName,
			stateId: data.stateId,
			userModKey: loginUser.id,
			idLoanTypeKey: data.idLoanTypeKey,
			bpNo: data.bpNo,
			uiActionName: actionType
		}];

		showProcessMessage('Executing action....');
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	onLoanStatusTreeDblClick: function (cmp, rec) {
		if (rec.data.reference) return;

		var recc = this.lookupReference('loanMainSearchGrid').store.findRecord('loanId', rec.data.loanId);
		this.onLoanGridItemDblClick(cmp, recc);
	},
	onLoanStatusTreeChildClick: function (cmp, rec) {
		if (!rec.data.reference) return;

		var grid = this.lookupReference('loanHome').activeTab.down('gridpanel');
		var arr = new Array('folderName');

		var selectAll = false;

		var filterParm = new Array();
		var selected = cmp.getSelectionModel().getSelected().items;
		selected.forEach(function(it) {
		    if(it.data.reference){
		    	if(it.data.reference === "ALL"){
		    		selectAll = true;
		    	}
		    	filterParm.push(it.data.reference.split(':')[1])
		    }
		});

		if(selectAll){
			grid.store.clearFilter();
		}
		else{
			this.filterLoanGridByMultiValue(grid, filterParm, arr);
		}
	},

	onBusinessRecomndAmntChange: function (cmp, newValue, oldValue, e, eOpt) {
		if (isLoadingLoanWindow(this)) {
			if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
			return;
		}
		if (newValue == -2147483648 || newValue == null || newValue === undefined) cmp.reset();
		else cmp.setValue(newValue);
	},

	onChangeCibStatusFile: function (filefield, value, eOpts) {

		var me = this;

		var loanId = filefield.up('#LoanDetails').lookupReference('keepHiddenloanIdKey').value;

		var sizeInBytes = filefield.fileInputEl.dom.files[0].size;
		var sizeInMb = sizeInBytes / 1048576;

		if (sizeInMb > 1.0) {
			Ext.MessageBox.alert('Warn', 'Maximum file size is 1 MB.');
			return;
		}

		var loanDoc = {
			loanId: loanId,
			docType: appConstants.CIB_STATUS,
			userModKey: loginUser.id
		}

		filefield.up('form').submit({
			params: {
				loanDocument: JSON.stringify(loanDoc),
				docTrack: appConstants.CIB_STATUS,
			},
			url: UPLOAD_LOAN_DOC_URL,

			waitMsg: 'Uploading File...',

			success: function (result, request) {
				me.onReqCibStatusDoc(me);
			},

			failure: function (result, request) {
				me.onReqCibStatusDoc(me);
			}
		});
	},

	onReqCibStatusDoc: function (cmp) {
		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

		var header = {
			reference: 'onReqCibStatusDoc'
		};

		var payload = [{
			loanId: loanId,
			docType: appConstants.CIB_STATUS,
			userModKey: loginUser.id
		}]

		this.sendRequest(appActionType.SELECT_CIB_STATUS_DOC, appContentType.CONTENT_TYPE_LOAN_DOCUMENT, payload, header);
	},

	onClickCibStatusViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.CIB_STATUS);
	},

	viewFileByLoanIdDocType: function (loanId, docType) {
		var serverUrl = VIEW_LOAN_DOC_URL + '?loanId=' + loanId + '&docType=' + docType + '&userModKey=' + loginUser.id;
        var pdfPanel = getPdfPanel("", "", "", "", "", serverUrl);
        pdfPanel.show();
	},

	onCancelCommentTypePopup: function (button, e, eOpts) {
		button.up('#loanActionComment').close();
	},

	onSaveNotes: function(button, e, eOpts){
		var me = this;
		var loanNotes = me.lookupReference('loanNotes').value;

		if (!loanNotes) {
			Ext.MessageBox.alert('Empty', 'Please Write Your Notes.');
			return false;
		} 
		showProcessMessage('Saving Notes...');				

		var refId = me.lookupReference('loanId').value;
		var notesBy = gLoginUuser.unId;


		var payload;

		var header = {
			reference: 'onSaveNotes'
		};

		payload = [{
			userModKey: loginUser.id,			
			creatorId : loginUser.id,
			loanNotes     : loanNotes   ? loanNotes   : null,
        	notesBy   : notesBy ? notesBy : null,
        	refId     : refId   ? refId   : null,
		}];

		me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_NOTES, payload, header);
	},
	onClickSaveLoanActionComment: function (button, cmp, data) {

		showProcessMessage('Saving Data...');

		var me = this;
		var userComment = me.lookupReference('newComment').value;
		var commentForSendQuery = me.lookupReference('commentForSendQuery').value;
		
		var commentType = me.lookupReference('commentType').value;
		var loanId = me.lookupReference('loanId').value;
		var stateName = me.lookupReference('stateName').value;
		var stateId = me.lookupReference('stateId').value;
		var actionType = me.lookupReference('actionType').value;
		var uiActionName = me.lookupReference('uiActionName').value;

		var userId = me.lookupReference('userId').value;
		var roleId = me.lookupReference('roleId').value;
		var comment;

		if(!commentForSendQuery && commentType == 'CA_SEND_QUERY_COMMENT'){
			Ext.Msg.alert('Error', 'Please select some Comment.')
			return;
		}		
		if(commentType == 'CA_SEND_QUERY_COMMENT'){
			if(commentForSendQuery == 'Others'){
				comment = userComment;
			}else{
				comment = commentForSendQuery;
			}
		}else{
			comment = userComment;
		}
		
		var header = {
			reference: 'onClickSaveLoanActionComment'
		};

		var payload;

		var payloadCmnt = [{
			userModKey: loginUser.id,
			creatorId: loginUser.id,
			objectType: appConstants.LOAN_ACTION_COMMENT,
			commentType: commentType,
			refId: loanId,
			comments: comment,
			recommendGroupId: roleId,
			recommendToId: userId,
			commentedBy: loginUser.unId
		}];

		if((actionType == 'MIS_RETURN' || actionType == 'CA_RETURN') && (stateName == 'RM_APPROVED' || stateName == 'UH_APPROVED' || stateName == 'HOCRM_APPROVED')){
			actionType = 'APPROVED_RETURN';
		}

		if (actionType == appActionType.ACTION_TYPE_SO_RECOMMEND ||
			actionType == appActionType.ACTION_TYPE_SO_RE_RECOMMEND ||
			actionType == appActionType.ACTION_TYPE_MIS_ALLOCATE ||
			actionType == appActionType.ACTION_TYPE_MIS_RE_ALLOCATE ||
			actionType == appActionType.ACTION_TYPE_CA_RECOMMEND ||
			actionType == appActionType.ACTION_TYPE_CA_RE_RECOMMEND) {
			var cmp = me.lookupReference('loanDetailsPanel').value;
	      	var recommendedForApproval = cmp.lookupReference('recommendedForApproval').value;
	      	if(userRoles.containsKey(appConstants.CREDIT_ANALYST)&& actionType == appActionType.ACTION_TYPE_CA_RECOMMEND && !recommendedForApproval){
				Ext.MessageBox.alert('Missing Field', 'Recommended for Approval Amount should not be empty.');
				return;
			}

			if (isMandatoryFieldFilled(cmp)) {
				payload = getPayloadOfLoanApplication(cmp, 'ToUpdate');
				payload[0]['recommendGroupId'] = roleId;
				payload[0]['recommendToId'] = userId;
				payload[0]['uiActionName'] = uiActionName;

				if (isValidComment(comment)) {
					payload[0]['commentList'] = payloadCmnt;
				} else {
					if (!canRecommendWithoutComment(actionType)) {
						Ext.Msg.alert('Error', 'Please do some Comment.')
						return;
					}
				}
			} else {
				return;
			}
		} else {
			var loginUserC = me.lookupReference('loginUser').value;
			var userId = me.lookupReference('userId').value;
			var firstName = me.lookupReference('firstName').value;
			var lastName = me.lookupReference('lastName').value;
			var loginName = me.lookupReference('loginName').value;
			var legalEntityKey = me.lookupReference('legalEntityKey').value;
			var primaryGroupId = me.lookupReference('primaryGroupId').value;
			var userModKey = me.lookupReference('userModKey').value;
			var roleName = me.lookupReference('roleName').value;
			var roleId = me.lookupReference('roleId').value;

			payload = [{
				userModKey: loginUser.id,
				loanId: loanId,
				stateName: stateName,
				stateId: stateId,
				recommendGroupId: roleId,
				recommendToId: userId,
				uiActionName: uiActionName
			}];

			if (isValidComment(comment)) {
				payload[0]['commentList'] = payloadCmnt;
			} else {
				if (!canRecommendWithoutComment(actionType)) {
					Ext.Msg.alert('Error', 'Please do some Comment.')
					return;
				}
			}
		}
		me.sendRequest(actionType, appContentType.CONTENT_TYPE_LOAN, payload, header);

		//me.onRefreshGrid();
	},
	onLoanTabChange: function (tab,cmp) {
		var tabid=tab.activeTab.id;
		if(tabid == 'commentsPanel'){
			this.onExpandComntOfActionPanel(cmp);
		}else if(tabid == 'notesPanel')	{
			this.onTabNotesOfActionPanel(cmp);
		}	
	},
	onExpandComntOfActionPanel: function (cmp) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;

		var header = {
			reference: 'onExpandComntOfActionPanel'
		};
		var payload = [{
			refId: loanId,
			objectType: appConstants.LOAN_ACTION_COMMENT,
			userModKey: loginUser.id
		}];

		this.loadQueryResponseGrid(this);

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_COMMENT, payload, header);
	},

	onTabNotesOfActionPanel: function (cmp) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;

		var header = {
			reference: 'onTabNotesOfActionPanel'
		};
		var payload = [{
			refId: loanId,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NOTES, payload, header);
	},

	loadQueryResponseGrid: function (cmp) {

		if (userRoles.containsKey(appConstants.SOURCE_OFFICER)) {
			showActionColumn(cmp.lookupReference('queryResponseGrid'), 'saveReference');
		}

		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

		var header = {
			reference: 'loadQueryResponseGrid'
		};
		var payload = [{
			refId: loanId,
			userModKey: loginUser.id
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_ALL_QUERY, appContentType.CONTENT_TYPE_COMMENT, payload, header);
	},

	onClickIdCardViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.DOC_TYPE_OFFICE_ID_CARD);
	},
	onClickNidViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.DOC_TYPE_NID_CARD);
	},
	onClickSignaturePhotoViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.GUARANTOR_NID);
	},
	onClickTinViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.DOC_TYPE_TIN);
	},
	onClickSalaryCertificateViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.DOC_TYPE_SALARY_CERTIFICATE);
	},
	onClickNidOfTheGuarantorViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.GUARANTOR_NID);
	},
	onClickGuarantorNidView: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.GUARANTOR_NID);
	},

	onClickAdditionalDocOneViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.ADDITIONAL_DOC_1);
	},
	onClickAdditionalDocTwoViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.ADDITIONAL_DOC_2);
	},
	onClickAdditionalDocThreeViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.ADDITIONAL_DOC_3);
	},
	onClickSignatureViewFile: function (btn) {
		var loanId = this.lookupReference('keepHiddenloanIdKey').value;
		this.viewFileByLoanIdDocType(loanId, appConstants.SIGNATURE);
	},

	onClickStateTransitionCancelBtn: function (cmp) {
		cmp.up('#stateTransitionPopUp').close();
	},

	onClickStateTransitionPopUpSubmit: function (cmp) {

	},

	onChangeDobOfPg: function (cmp, newValue, oldValue, eOpts) {

		var dobOfPgDate=this.lookupReference('dobOfPg').value
		var toDate = new Date();

        if(dobOfPgDate>toDate) {
			Ext.Function.defer(function () {
            Ext.MessageBox.alert('Not Valid', 'DOB of PG age should not be greater  then present date');
        }, 1000);       
			this.lookupReference('dobOfPgYear').setValue(null);
			return;
		}

		if(!newValue){
			this.lookupReference('dobOfPg').setValue(null);
			this.lookupReference('dobOfPgYear').setValue(null);
			return;
		}
		
		if(cmp.getRawValue().length<=10||cmp.getRawValue().length>=12){
           cmp.up('#loanDetailsWin').down('#dobOfPgYear').setValue(null);
           
           if((cmp.getRawValue().length == 8 && cmp.getRawValue().substring(4, 5) != '-') 
            || (cmp.getRawValue().length == 10 && (cmp.getRawValue().substring(4, 5) != '-'
           	|| cmp.getRawValue().substring(7, 8) != '-'))){
           		Ext.MessageBox.alert('Not Valid', 'DOB of PG age manually input format should like 2001-07-10');
				return;
           }

		}
		else{
			if (newValue) {

				var parsedMap = parseDiffOfTowDate(newValue, new Date())
				var parseddate = parsedMap['DATE'];
				var parsedYear = parsedMap['YEAR'];
				var parsedMonth = parsedMap['MONTH'];

				this.lookupReference('dobOfPgYear').setValue(parsedYear+"y, "+parsedMonth+"m");

				var tenorYear = this.lookupReference('tenorYear').value ? this.lookupReference('tenorYear').value : 0;
				
				if (parsedYear + tenorYear <= 60) {
					this.lookupReference('guarantorElibiblity').setValue("Eligible");
				} else {
					this.lookupReference('guarantorElibiblity').setValue("Not Eligible");
				}
			} 
		    else {
				cmp.up('#loanDetailsWin').down('#dobOfPgYear').setValue(null);
			}
        }
	},
	onchangeDORetirement:function(cmp, newValue, oldValue, eOpts){
        if(!newValue || newValue.length<=10||newValue.length>=12){
           cmp.up('#loanDetailsWin').down('#remainingYearOfRetirement').setValue(null);
		}else{
			if(newValue){
                var newserviceRemaining = calculateAge(Ext.Date.format(new Date(), 'Y-m-d'), newValue);
                var indx = newserviceRemaining.indexOf("m");
                var serviceRemaining = newserviceRemaining.substring(0, indx+1);
                cmp.up('#loanDetailsWin').down('#remainingYearOfRetirement').setValue(serviceRemaining);
            }
            else{
                 cmp.up('#loanDetailsWin').down('#remainingYearOfRetirement').setValue(null);
            }
		}           
	},

	onchangeDOJoining:function(cmp, newValue, oldValue, eOpts){
        if(!newValue || newValue.length<=10||newValue.length>=12){
           cmp.up('#loanDetailsWin').down('#serviceLength').setValue(null);
		}
		else{
		 	if(newValue){
	            var formt = Ext.Date.format(newValue, 'Y-m-d');
	            var newage = calculateAge(formt, new Date());
	            var indx = newage.indexOf("m");
	            var age = newage.substring(0, indx+1);
	            cmp.up('#loanDetailsWin').down('#serviceLength').setValue(age);
	        }
	        else{
	            cmp.up('#loanDetailsWin').down('#serviceLength').setValue(null);
	        }			
		}           
	},

	onchangeDOB:function(cmp, newValue, oldValue, eOpts){
        if(!newValue || newValue.length<=10||newValue.length>=12){
           cmp.up('#loanDetailsWin').down('#age').setValue(null);
		}
		else{
			if(newValue){
                var formt = Ext.Date.format(newValue, 'Y-m-d');
                var newage = calculateAge(formt, new Date());
                var indx = newage.indexOf("m");
                var age = newage.substring(0, indx+1);

                cmp.up('#loanDetailsWin').down('#age').setValue(age);
                var retirementDate = getRetirementDate(newValue);
                cmp.up('#loanDetailsWin').down('#dateOfRetirement').setValue(retirementDate);
            }
            else{
                cmp.up('#loanDetailsWin').down('#age').setValue(null);          
            }
        }           
	},

	onChangeDobOfPgFO: function (cmp, newValue, oldValue, eOpts) {

		var dobOfPgDate=this.lookupReference('dobOfPg').value
		var toDate = new Date();

        if(dobOfPgDate>toDate) {
			Ext.Function.defer(function () {
            Ext.MessageBox.alert('Not Valid', 'DOB of PG age should not be greater  then present date');
        }, 1000);       
			this.lookupReference('dobOfPgYear').setValue(null);
			return;
		}

		if(!newValue){
			this.lookupReference('dobOfPgYear').setValue(null);
			this.lookupReference('dobOfPg').setValue(null);
			return;
		}

		if(cmp.getRawValue().length<=10||cmp.getRawValue().length>=12){
           cmp.up('#FieldOfficerInfoDetailsWin').down('#dobOfPgYear').setValue(null);
		}
		else{
			if (newValue) {
				var parsedMap = parseDiffOfTowDate(newValue, new Date())
				var parseddate = parsedMap['DATE'];
				var parsedYear = parsedMap['YEAR'];
				var parsedMonth = parsedMap['MONTH'];

				this.lookupReference('dobOfPgYear').setValue(parsedYear+"y, "+parsedMonth+"m");
			} else {
				cmp.up('#FieldOfficerInfoDetailsWin').down('#dobOfPgYear').setValue(null);
			}
	    }	
	},

	onTenorYearChangeFO: function (cmp) {
		var tenorYear = this.lookupReference('tenorYear').value;
		if (tenorYear != null) {
			var tenorYearFO = tenorYear.replace(/[^0-9\.]+/g, "");
			this.lookupReference('tenorYear').setValue(tenorYearFO);
		}
	},

	onLoanGrdSelChng: function (cmp, records, eOpts) {

		var rptBtn = this.lookupReference('loanReportAsPdf');
		var cadReportBtn = this.lookupReference('cadReport');
		var ppcExcelReport = this.lookupReference('lmsPPCExcelReport');
		var misCrmExcelReport = this.lookupReference('lmsMISExcelReport');
		var createLoanGroupBtn = this.lookupReference('createLoanGroupBtn');
		var manualSmsSend = this.lookupReference('manualSmsSend');			

		var grid = this.lookupReference('loanMainSearchGrid');
		var selectedRows = grid.getSelection().length;
        var selectedLoan = grid.getSelectionModel().getSelection();
		var loanApprovalState = ['RM_APPROVED','UH_APPROVED'];		
		var loandStatename = [];	
		var smsStateName = ['SENT_TO_CAD','CAD_DISBURSED'];	
		var smsStateNameStore = [];
		var loanCount = 0;
		count=0
		if (selectedLoan.length > 0) {
			for (var i = 0; i < selectedRows; i++) {
				loandStatename.push(grid.getSelection()[i].data.stateName);
			}
		}	

		rptBtn.setDisabled(true);
		cadReportBtn.setDisabled(true);
		ppcExcelReport.setDisabled(true);
		misCrmExcelReport.setDisabled(true);
		createLoanGroupBtn.setDisabled(true);
		manualSmsSend.setDisabled(true);

		if(records.length > 0 ){
			
			if ( userRoles.containsKey(appConstants.SOURCE_OFFICER) || userRoles.containsKey(appConstants.BRANCH_MANAGER) || 
				userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER) ||
				userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)){

				ppcExcelReport.setDisabled(false);
			}

			if (userRoles.containsKey(appConstants.MIS) || userRoles.containsKey(appConstants.CREDIT_ANALYST) || 
				userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.HO_CRM)){

				misCrmExcelReport.setDisabled(false);
			}

			if (records.length == 1) {
				rptBtn.setDisabled(false);
			} 			

			if ((records.length == 1 && userRoles.containsKey(appConstants.CAD)) && ((records[0].data.stateName=='SL_GENERATED')||(records[0].data.stateName=='CA_CAD_QUERY_UPDATED')||(records[0].data.stateName=='SO_CAD_QUERY_UPDATED'))) {
				cadReportBtn.setDisabled(false);
			}

			for (var i = 0; i < loandStatename.length; ++i) {
			    var temp = loandStatename[i].split(".");
			    var found = false;
			    
			    for (var j = 0; j < loanApprovalState.length; ++j) {
			        if (loanApprovalState[j] === temp[0]) {
			            found = true;
			            break;
			        }
			    }
		        if (!found) {
		        	count++;
		    	}
			} 

			for (var i = 0; i < records.length; i++) {
			
				if ((records[i].data.loanGroupId == null) || (records[i].data.loanGroupId == '') 
					|| (records[i].data.loanGroupId === undefined)) {    

					for(var j=0; j<loandStatename.length; j++){
		                if((userRoles.containsKey(appConstants.RISK_MANAGER)&&count==0)||
							(userRoles.containsKey(appConstants.UNIT_HEAD)&&count==0)||
						   (userRoles.containsKey(appConstants.CREDIT_ANALYST)&&count==0)){
			                createLoanGroupBtn.setDisabled(false);
						}else{
							  createLoanGroupBtn.setDisabled(true);
							//  return;
						}
					}

				}else{
					  createLoanGroupBtn.setDisabled(true);
					 // return;
				}
			}

			if(userRoles.containsKey(appConstants.CAD)&&records.length > 0){

				if (selectedLoan.length > 0) {
					for (var i = 0; i < selectedRows; i++) {
						smsStateNameStore.push(grid.getSelection()[i].data.stateName);
					}
				}

			    for (var i = 0; i < smsStateNameStore.length; ++i) {
				    var temp = smsStateNameStore[i].split(".");
				    var found = false;
				    
				    for (var j = 0; j < smsStateName.length; ++j) {
				        if (smsStateName[j] === temp[0]) {
				            found = true;
				            break;
				        }
				    }
			        if (!found) {
			        	loanCount++;
			    	}
				} 

				for (var i = 0; i < records.length; i++) {
				   
						for(var j=0; j<smsStateNameStore.length; j++){
			                if((userRoles.containsKey(appConstants.CAD)&&loanCount==0)){
				                manualSmsSend.setDisabled(false);
							}else{
								  manualSmsSend.setDisabled(true);
								//  return;
							}
						}
				}
		    }

		}		

	},
	onLoanGroupSelChng: function(cmp, records, eOpts){
		var memoReport = this.lookupReference('memoReport');
		var removeFromLoanGroupBtn = this.lookupReference('removeFromLoanGroupBtn');
		var btnHoCrmBulkSnd2Cad = this.lookupReference('btnHoCrmBulkSnd2Cad');
		memoReport.setDisabled(true);
		removeFromLoanGroupBtn.setDisabled(true);
		btnHoCrmBulkSnd2Cad.setDisabled(true);

		if(records.length >0){
		    memoReport.setDisabled(false);			
		}

        if(records.length ==1){
			removeFromLoanGroupBtn.setDisabled(false);
		}
		if(records.length > 0){
			removeFromLoanGroupBtn.setDisabled(false);

			if(userRoles.containsKey(appConstants.HO_CRM)){
			  btnHoCrmBulkSnd2Cad.setDisabled(false);
			}
			
			for (var i = 0; i < records.length; i++) {
				if(records[i].data.stateName == appConstants.SENT_TO_CAD)
				{
					btnHoCrmBulkSnd2Cad.setDisabled(true);
				}
				if(records[i].data.stateName == appConstants.SENT_TO_CAD|| records[i].data.stateName == appConstants.SL_GENERATED||
					records[i].data.stateName == appConstants.CAD_SENT_QUERY_TO_SO || records[i].data.stateName == appConstants.SENT_QUERY_UPDATED|| 
					records[i].data.stateName == appConstants.CAD_SENT_QUERY_TO_CA|| records[i].data.stateName == appConstants.SO_CAD_QUERY_UPDATED|| records[i].data.stateName == appConstants.CA_CAD_QUERY_UPDATED)
				{
					removeFromLoanGroupBtn.setDisabled(true);
					return;
				}
			}

		}   
	},

	onAddToLoanGroupGridSelectionChange: function (cmp, records, eOpts) {

		var grid = this.lookupReference('addToLoanGroupGrid');
		var addToLoanGroupBtn = this.lookupReference('addToLoanGroupBtn');

		var selectedRows = grid.getSelection().length;
        var selectedLoan = grid.getSelectionModel().getSelection();

		var loandStatename = [];		
		count=0
		if (selectedLoan.length > 0) {
			for (var i = 0; i < selectedRows; i++) {
				addToLoanGroupBtn.setDisabled(false);
			}
		}else {
			addToLoanGroupBtn.setDisabled(true);
		}		
	},

	onActivateNamePopup: function (cmp, eOpts) {
		console.log("Loan pdf panel show......");
		
		if(loginUser == null ||  loginUser == '') {
		  loginUser=gLoginUuser;
		}
		else {
			loginUser=loginUser;
		}

		if (!hasAnyRole(headOfficeUserRoles)) {
			cmp.lookupReference('creditSupportOfficer').setHidden(true);
			cmp.lookupReference('deputyHoCRM').setHidden(true);

			if(cmp.lookupReference('rmOrUhName')){
				cmp.lookupReference('rmOrUhName').setHidden(true);
			}
			if(cmp.lookupReference('rmOrUhDesignation')){
				cmp.lookupReference('rmOrUhDesignation').setHidden(true);
			}
			if(cmp.lookupReference('rmOrUhNameCheckBox')){
				cmp.lookupReference('rmOrUhNameCheckBox').setHidden(true);
			}
			
			cmp.lookupReference('hocrm').setHidden(true);
			cmp.lookupReference('managingDirectorCeo').setHidden(true);

			cmp.setHeight(140);
		}

		/// check if any other place use this panel
		// check multiple loan generate pdf from this panel

		var grid = this.lookupReference('loanMainSearchGrid').value;
		var selectedLoan = grid.getSelectionModel().getSelection();
		console.log(selectedLoan);
		var loanId = selectedLoan[0].data.loanId;
		var userId = loginUser.id;
		var userName = loginUser.unId;

		var payload = [{
	        userModKey	: userId,
	        userId      : userId,
	        userName	: userName,
			loanId		: loanId
		}];

		var header = {
			reference: 'lastCreditAnalistRecommand'
		};
    	this.sendRequest(appActionType.ACTION_TYPE_LAST_CREDIT_ANAYLST_RECOMMAND, appContentType.CONTENT_TYPE_LOAN, payload, header);
	    
	 //    var header = {
		// 	reference: 'deputyHoCRMName'
		// };
  //   	this.sendRequest(appActionType.ACTION_TYPE_DEPUTY_HO_CRM, appContentType.CONTENT_TYPE_LOAN, payload, header);
	

	},

	showRmOrUhNameAndDesignation: function (cBox, e, eOpts) {
		var NamePopupPanel = this.lookupReference('NamePopupPanel');
		var rmOrUhNameCheckBox = this.lookupReference('rmOrUhNameCheckBox').value;
		var rmOrUhName = this.lookupReference('rmOrUhName');
		var rmOrUhDesignation = this.lookupReference('rmOrUhDesignation');

		if(rmOrUhNameCheckBox == true){
			//Ext.getCmp('namePopup').setHeight(500);
			rmOrUhName.setHidden(false);
			rmOrUhDesignation.setHidden(false);
		}
		else{
			rmOrUhName.setHidden(true);
			rmOrUhDesignation.setHidden(true);
			rmOrUhDesignation.reset();
			rmOrUhName.reset();
		}
	},

	onCancelNamePopup: function (button, e, eOpts) {
		button.up('#namePopup').close();
	},
	onCancelMemoNamePopup: function (button, e, eOpts) {
		button.up('#memoNamePopup').close();
	},
	onClickCadReportPopup: function (button, e, eOpts) {
		button.up('#cadReportPopup').close();
	},
	onClickYesOnNamePopup: function (button, e, eOpts) {

		var creditSupportOfficerName = this.lookupReference('creditSupportOfficer').value;
		//var riskManagerName = this.lookupReference('riskManager').value;
		//var unitHeadReailCreditName = this.lookupReference('unitHeadReailCredit').value;

		var rmOrUhName = this.lookupReference('rmOrUhName').value;
		var rmOrUhDesignation = this.lookupReference('rmOrUhDesignation').value;
		var rmOrUhNameCheckBox = this.lookupReference('rmOrUhNameCheckBox').value;

		if(rmOrUhNameCheckBox == true && (rmOrUhName == null || rmOrUhName == '' 
			|| rmOrUhDesignation == null || rmOrUhDesignation == '')){

			Ext.MessageBox.alert('Report Error', 'Rm or UH name and designation should not empty.');
			return;
		}

		var hocrmName = this.lookupReference('hocrm').value;
		var managingDirectorCeoName = this.lookupReference('managingDirectorCeo').value;
		var deputyHoCRM = this.lookupReference('deputyHoCRM').value;		

		var grid = this.lookupReference('loanMainSearchGrid').value;
		var selectedLoan = grid.getSelectionModel().getSelection();

		var idList = 'idList=';

		for (var i = 0; i < selectedLoan.length; i++) {

			idList += selectedLoan[i].data.loanId;

			var j = i + 1;

			if (j != selectedLoan.length) {
				idList += '&idList=';
			}
		}

		var userId = loginUser.id;
		var userName = loginUser.unId;

		var reportName = appConstants.LMS_BRANCH_OFFICE;
		if (hasAnyRole(headOfficeUserRoles)) {
			reportName = appConstants.LMS_HEAD_OFFICE;
		}


		var d = new Date();
		var reportReqTime = d.getTime();

		var pdfPanel = Ext.create('Ext.panel.Panel', {
			title: "Loan Details Report",
			itemId: 'loanDetailsPdfReportPanel',
			closable: true,
			floatable: true,
			floating: true,
			draggable: true,
			width: 950,
			height: 550,
			modal: true,
			alwaysOnTop: true,
			items: [{
				xtype: "component",
				name: 'loanDetailsReportPanel',
				itemId: 'loanDetailsReportPanel',
				id: 'loanDetailsReportPanel',
				width: 940,
				height: 540,
				modal: true,
				autoEl: {
					tag: 'iframe',
					style: 'overflow:auto;width:100%;height:540px;',
					src: LMS_REPORT_URL + '?reportlocation=webreturn&reportformat=pdf' + '&reportName=' +
						reportName + '&reportReqTime=' + reportReqTime + '&userId=' + userId + '&username=' +
						userName + '&creditSupportOfficerName=' + creditSupportOfficerName +
						'&rmOrUhName=' + rmOrUhName + '&rmOrUhDesignation=' + rmOrUhDesignation +
						'&hocrmName=' + hocrmName + '&deputyHoCRM=' + deputyHoCRM + '&managingDirectorCeoName=' + managingDirectorCeoName +
						'&' + idList
				},
				listeners: {
					load: {
						element: 'el',
						fn: function () {
							this.parent().unmask();
						}
					},
					/**/
					render: function () {
						// this.up('panel').body.mask('Please Wait...');
					}
				}
			}]
		});

		button.up('#namePopup').close();
		pdfPanel.show();
	},
	generateExcelReport: function (button) {

		console.log('generateExcelReport');

		var me = this;
		var reportName = 'Work_History';
		var now = new Date();
		var reportReqTime = now.getTime();

		var grid = me.lookupReference('workHistorySearchGrid');
		var dataItems = grid.getSelectionModel().getSelection();
		var columns = grid.columns;

		if(!dataItems || dataItems.length == 0) {
			Ext.MessageBox.alert('Report Error', 'Please select some loan to generate report.');
			return;
		}

		showDownloadProcessingBar(button, 'Downloading...', 'Please wait...');

		var headerList = new Array();
		var dataIndexMap = {};
		var count = 0;
		columns.forEach(function(it){
			if(!it.hidden){
				headerList.push(it.text);
				dataIndexMap[it.dataIndex] = count++;
			}
		});

		var dataList = new Array();
		dataItems.forEach(function(obj){
			var dataMap = {};
			columns.forEach(function(it){
				if(!it.hidden){
					if(it.dataIndex == 'idLoanTypeKey'){
						var loanType = getLoanTypeFromKey(obj.data[it.dataIndex]);
						dataMap[it.dataIndex] = loanType ? loanType : "";
					}
					else if(it.dataIndex == 'idCustomerTypeKey'){
						var custType = getCustomerTypeFromKey(obj.data[it.dataIndex]);
						dataMap[it.dataIndex] = custType ? custType : "";
					}
					else{
						if(it.xtype == 'datecolumn'){
							dataMap[it.dataIndex] = obj.data[it.dataIndex] ? obj.data[it.dataIndex].split(' +')[0] : "";
						}
						else{
							dataMap[it.dataIndex] = obj.data[it.dataIndex] ? obj.data[it.dataIndex] : "";	
						}
					}
				}
			});
			dataList.push(dataMap);
		});

		var download = Ext.create('Ext.form.Panel', {
			renderTo: Ext.getBody(),
			standardSubmit: true,
			url: LMS_LOAN_GRID_EXCEL_REPORT_URL
		});
		download.submit({
			params: {
				'reportlocation': 'webreturn',
				'reportformat': 'xlsx',
				'reportName': reportName,
				'reportReqTime': reportReqTime,
				'userId': gLoginUuser.id,
				'userName': gLoginUuser.unId,
				'headerList': JSON.stringify(headerList),
				'dataList': JSON.stringify(dataList),
				'dataIndexMap': JSON.stringify(dataIndexMap)
			}
		});
	},

	onClickYesOnMemoNamePopup: function(button, e, eOpts){
		var unitHeadReailCredit = this.lookupReference('unitHeadReailCredit').value;
		var hocrm = this.lookupReference('hocrm').value;
		var managingDirectorCeo = this.lookupReference('managingDirectorCeo').value;
		var deputyHoCRM = this.lookupReference('deputyHoCRM').value;

		var grid = this.lookupReference('loanGroupMainSearchGrid').value;
		// var selectedRows = grid.getSelection().length;
        var selectedLoan = grid.getSelectionModel().getSelection();

		var userId = loginUser.id;
		var userName = loginUser.unId;

		var reportName = appConstants.LOAN_GROUPING_MEMO_APPROVAL_REPORT;

		var loanGroupId;
		
		for (var i = 0; i < selectedLoan.length; i++) {

			loanGroupId= selectedLoan[i].data.loanGroupId;
		}

		var d = new Date();
		var reportReqTime = d.getTime();

		var pdfPanel = Ext.create('Ext.panel.Panel', {
			title: "Memo Approval Report",
			itemId: 'loanMemoPdfReportPanel',
			closable: true,
			floatable: true,
			floating: true,
			draggable: true,
			width: 950,
			height: 550,
			modal: true,
			alwaysOnTop: true,
			items: [{
				xtype: "component",
				name: 'loanMemoReportPanel',
				itemId: 'loanMemoReportPanel',
				id: 'loanMemoReportPanel',
				width: 940,
				height: 540,
				modal: true,
				autoEl: {
					tag: 'iframe',
					style: 'overflow:auto;width:100%;height:540px;',
					src: LMS_REPORT_URL + '?reportlocation=webreturn&reportformat=pdf' + '&reportName=' +
						reportName + '&reportReqTime=' + reportReqTime + '&userId=' + userId + '&username=' +
						userName + '&unitHeadReailCredit=' + unitHeadReailCredit + '&deputyHoCRM=' + deputyHoCRM +
						'&hocrm=' + hocrm + '&managingDirectorCeo=' + managingDirectorCeo + '&loanGroupId=' + loanGroupId
				},
				listeners: {
					load: {
						element: 'el',
						fn: function () {
							this.parent().unmask();
						}
					},
					/**/
					render: function () {
						// this.up('panel').body.mask('Please Wait...');
					}
				}
			}]
		});

		button.up('#memoNamePopup').close();
		pdfPanel.show();
	},

	generatelmsPPCExcelReport: function (button) {

		console.log("Generating PPC Excel Report");

		var me = this;
		var grid = me.lookupReference('loanMainSearchGrid');
		var selectedRows = grid.getSelection().length;
		var reportName = 'PPC-Excel';
		var d = new Date();
		var reportReqTime = d.getTime();
		var loandIdsList = [];
		loginUser = gLoginUuser;
		var userId = gLoginUuser.id;
		var userName = gLoginUuser.unId;
		var selectedLoan = grid.getSelectionModel().getSelection();
		if (selectedLoan.length > 0) {

			showDownloadProcessingBar(button, 'Downloading...', 'Please wait...');

			for (var i = 0; i < selectedRows; i++) {
				loandIdsList.push(grid.getSelection()[i].data.loanId);
			}

			var loanId = loandIdsList.join();
			var download = Ext.create('Ext.form.Panel', {
				renderTo: Ext.getBody(),
				standardSubmit: true,
				url: LMS_LOAN_GRID_PPC_EXCEL_REPORT_URL
			});
			download.submit({
				params: {
					'loanId': loanId,
					'reportlocation': 'webreturn',
					'reportformat': 'xlsx',
					'reportName': reportName,
					'reportReqTime': reportReqTime,
					'userId': userId,
					'userName': userName,

				}
			});
		} else {
			Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\' item(s).');
			return;
		}

	},
	generatelmsMISExcelReport: function (button) {

		console.log("Generating MIS-CRM-Excel Report");

		var me = this;
		var grid = me.lookupReference('loanMainSearchGrid');
		var selectedRows = grid.getSelection().length;
		var reportName = 'CRM-Excel';
		var d = new Date();
		var reportReqTime = d.getTime();
		var userId = gLoginUuser.id;
		var userName = gLoginUuser.unId;
		var loanId = [];
		var selectedLoan = grid.getSelectionModel().getSelection();
		if (selectedLoan.length > 0) {

			showDownloadProcessingBar(button, 'Downloading...', 'Please wait...');

			for (var i = 0; i < selectedRows; i++) {
				loanId.push(grid.getSelection()[i].data.loanId);
			}
			loanId = loanId.join();
			Ext.create('Ext.form.Panel', {
				renderTo: Ext.getBody(),
				standardSubmit: true,
				url: LMS_LOAN_GRID_MIS_EXCEL_REPORT_URL
			}).submit({
				params: {
					'loanId': loanId,
					'reportlocation': 'webreturn',
					'reportformat': 'xlsx',
					'reportName': reportName,
					'reportReqTime': reportReqTime,
					'userId': userId,
					'userName': userName,

				}
			});
		} else {
			Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\'.');
			return;
		}
	},

	onSaveQueryResponse: function (grid, rowIndex, colIndex) {
		var data = grid.store.data.items[rowIndex].data;

		if (!isValidComment(data.commentResponse)) {
			console.log('Please write some response.');
			return;
		}

		var header = {
			reference: 'onSaveQueryResponse'
		};

		var payload = [{
			userModKey: loginUser.id,
			commentResponse: data.commentResponse,
			commentResponseBy: loginUser.unId,
			commentId: data.commentId
		}];
		this.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_COMMENT, payload, header);
	},

	generateCadReport: function (btn, e, eOpts) {
		loanPanel = this;

		var items = this.lookupReference('loanMainSearchGrid').getSelectionModel().selected.items;

		if (items.length != 1) {
			Ext.MessageBox.alert('Error', 'Please select only one \'Loan\'.');
			return;
		}

		var cadReportPopup = Ext.create('Desktop.view.loan.CadReportPopup');
		cadReportPopup.lookupReference('loanMainSearchGridData').setValue(items[0].data);

		cadReportPopup.show();
	},
	onActivateCadReportPopup: function(cmp, eOpts){
		
		var data = cmp.lookupReference('loanMainSearchGridData').value;

		var reportRef = 'CBBL/HO/CAD/SA/' + new Date().getFullYear() + '/' + data.loanTrackingId;
		cmp.lookupReference('careOf').setValue(data.fatherName);
		cmp.lookupReference('rateOfInterest').setValue(data.interestRate);
		cmp.lookupReference('reportRef').setValue(reportRef);
		if (data.recommendedForApproval == -2147483648) {
	    	cmp.lookupReference('loanLimit').setValue(null);
	    }else{
	    	cmp.lookupReference('loanLimit').setValue(data.recommendedForApproval);
	    }	

		var tenorYear = data.tenorYear;
		var monthlyInstallment = data.monthlyInstallment;
		var OneNosChequesAmount= tenorYear*monthlyInstallment*12;
		cmp.lookupReference('zeroOneNosChequesAmount').setValue(OneNosChequesAmount);
		cmp.lookupReference('zeroThreeNosChequesAmount').setValue(monthlyInstallment);	
	},
	onCancelCadReportPopup: function (button, e, eOpts) {
		button.up('#cadReportPopup').close();
	},
	onClickYesCadReportPopup: function (button, e, eOpts) {
		var reportName = 'Sanction Letter';
		var d = new Date();
		var reportReqTime = d.getTime();
		var me=this;

		var userModKey = loginUser.id;
		var userName = loginUser.unId;

		var zeroOneNosChequesAmount = this.lookupReference('zeroOneNosChequesAmount').value;
		var zeroThreeNosChequesAmount = this.lookupReference('zeroThreeNosChequesAmount').value;
		var specialTermsAndConditionsOne = this.lookupReference('specialTermsAndConditionsOne').value;
		var specialTermsAndConditionsTwo = this.lookupReference('specialTermsAndConditionsTwo').value;
		var specialTermsAndConditionsThree = this.lookupReference('specialTermsAndConditionsThree').value;
		var specialTermsAndConditionsFour = this.lookupReference('specialTermsAndConditionsFour').value;

		var loanGridData = this.lookupReference('loanMainSearchGridData').value;

		var reportRef = this.lookupReference('reportRef').value;
		var mdApprovalDate = Ext.Date.format(this.lookupReference('mdApprovalDate').value, 'd M, Y');
		var careOf = this.lookupReference('careOf').value;
		var letterReqDate = Ext.Date.format(this.lookupReference('letterReqDate').value, 'd M, Y');
		var loanLimit = this.lookupReference('loanLimit').value;
		var rateOfInterest = this.lookupReference('rateOfInterest').value;

		var serverUrl = LMS_REPORT_URL + '?reportlocation=webreturn&reportformat=pdf' +
						'&reportName=' + reportName +
						'&reportReqTime=' + reportReqTime +
						'&userModKey=' + userModKey + '&username=' + userName +
						'&zeroOneNosChequesAmount=' + zeroOneNosChequesAmount +
						'&zeroThreeNosChequesAmount=' + zeroThreeNosChequesAmount +
						'&specialTermsAndConditionsOne=' + specialTermsAndConditionsOne +
						'&specialTermsAndConditionsTwo=' + specialTermsAndConditionsTwo +
						'&specialTermsAndConditionsThree=' + specialTermsAndConditionsThree +
						'&specialTermsAndConditionsFour=' + specialTermsAndConditionsFour +
						'&loanId=' + loanGridData.loanId +
						'&reportRef=' + reportRef +
						'&mdApprovalDate=' + mdApprovalDate +
						'&careOf=' + careOf +
						'&letterReqDate=' + letterReqDate +
						'&loanLimit=' + loanLimit +
						'&rateOfInterest=' + rateOfInterest;

		var pdfPanel = getSanctionPdfPanel(me,"Sanction Letter", 'cadPdfReportPanel', 'cadReportPanel', 'cadReportPanel', 'cadReportPanel', serverUrl);


		button.up('#cadReportPopup').close();
		pdfPanel.show();
	}, 

	onClickBulkSubmit: function (btn, e, eOpts) {
		console.log('Bulk Submitting');

		var selected = this.lookupReference('loanMainSearchGrid').getSelectionModel().getSelection();

		if(selected.length == 0){
			Ext.MessageBox.alert('Select', 'Please select some loan to submit.');
			return;
		}

		var loanIds = '';

		for (var i = 0; i < selected.length; i++) {
			if(selected[i].data.stateName == 'FO_CREATED' ||
			   selected[i].data.stateName == 'FO_UPDATED')
			{
				loanIds += selected[i].data.loanId;
				if(i < selected.length -1) loanIds += ',';
			}
		}

		var actionType = appActionType.ACTION_TYPE_FO_BULK_SUBMIT;

		var header = {
			reference: 'onClickBulkSubmit'
		};

		var payload = [{
			loanIds: loanIds,
			userModKey: loginUser.id
		}];

		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LOAN, payload, header);

		showProcessMessage('Submitting Loan....');

	},

	onCreateLoanGroup: function(btn, e, eOpts){

		var loanMainPanel = this;
		var grid = loanMainPanel.lookupReference('loanMainSearchGrid');
		var selectedRows = grid.getSelection().length;
		var loandIdsList = [];
		var loandTrackingIdList = [];
		var userId = gLoginUuser.id;
		var userName = gLoginUuser.unId;
		var selectedLoan = grid.getSelectionModel().getSelection();
		
		if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

		if (selectedLoan.length > 0) {

			for (var i = 0; i < selectedRows; i++) {
				loandIdsList.push(grid.getSelection()[i].data.loanId);
				loandTrackingIdList.push(grid.getSelection()[i].data.loanTrackingId);
			}

			var msgText = 'Are your sure to create new loan group for '+selectedRows+' item(s)?';

			Ext.Msg.confirm("Attention", msgText, function(btn){
			  	if (btn == 'yes'){
					var header = {
						reference: 'onCreateLoanGroup'
					};

					var payload = [{
						loanIdList 	 : loandIdsList,
						userModKey 	 : loginUser.id
					}]

					loanMainPanel.sendRequest(appActionType.ACTION_TYPE_CREATE_LOAN_GROUP, appContentType.CONTENT_TYPE_LOAN, payload, header);
					//loanMainPanel.loadLoanGridData();
					loanMainPanel.lookupReference('idloanGrouping').setDisabled(false);
					loanMainPanel.lookupReference('idloanGrouping').show();
					loanMainPanel.loadGroupGridPanelData();
			  	}
			});
		} else {
			Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
			return;
		}
       
	},
	onClickManualSmsSend: function(btn, e, eOpts){

		var loanMainPanel = this;
		var grid = loanMainPanel.lookupReference('loanMainSearchGrid');
		var selectedRows = grid.getSelection().length;
		var loandIdsList = [];
		var userId = gLoginUuser.id;
		var userName = gLoginUuser.unId;
		var selectedLoan = grid.getSelectionModel().getSelection();
		var loanIdListStr; 
		if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }

		if (selectedLoan.length > 0) {

			for (var i = 0; i < selectedRows; i++) {
				loandIdsList.push(grid.getSelection()[i].data.loanId);
			}

			var msgText = 'Are your sure , You want send SMS '+selectedRows+' loan(s)?';
			loanIdListStr = loandIdsList.join();

			Ext.Msg.confirm("Attention", msgText, function(btn){
			  	if (btn == 'yes'){
					var header = {
						reference: 'onClickManualSmsSend'
					};

					var payload = [{
						loanIdListStr 	 : loanIdListStr,
						userModKey 	     : loginUser.id
					}]

					loanMainPanel.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_FOR_MANUAL_SMS_SEND, appContentType.CONTENT_TYPE_LOAN, payload, header);
			  	}
			});
		} else {
			Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
			return;
		}
       
	},

	onLoanRemoveFromLoanGroup: function(cmp, e, eOpts){
		var loanMainPanel = this;
		var grid = loanMainPanel.lookupReference('loanGroupMainSearchGrid');
		var selectedRows = grid.getSelection().length;
		var loandIdsList = [];
		var loandTrackingIdList = [];
		var userId = gLoginUuser.id;
		var userName = gLoginUuser.unId;
		var selectedLoan = grid.getSelectionModel().getSelection();

		if (selectedLoan.length > 0) {

			var loanGroupId = selectedLoan[0].data.loanGroupId;

			for (var i = 0; i < selectedRows; i++) {

				var loanState= selectedLoan[i].data.stateName;
				if(loanState == 'SENT_TO_CAD'){
					Ext.Msg.alert('Attention', 'SENT_TO_CAD state Loan can not remove from loan group. Tracking No.: '+selectedLoan[i].data.loanTrackingId);
					return;
				}

				loandIdsList.push(grid.getSelection()[i].data.loanId);
				loandTrackingIdList.push(grid.getSelection()[i].data.loanTrackingId);
				if(loanGroupId != grid.getSelection()[i].data.loanGroupId){
					Ext.Msg.alert('Attention', 'Remove loan from loan group allowed only for same loan group');
					return;
				}
			}

			var msgText = 'Are your sure to remove '+selectedRows+' item(s) from group';

			Ext.Msg.confirm("Attention", msgText, function(btn){
			  	if (btn == 'yes'){
		    		var header = {
						reference: 'onLoanRemoveFromLoanGroup'
					};

					var payload = [{
						loanIdList 	 : loandIdsList,
						loanGroupId  : loanGroupId,
						userModKey 	 : loginUser.id
					}]

					loanMainPanel.sendRequest(appActionType.ACTION_TYPE_REMOVE_LOAN_FROM_LOAN_GROUP, appContentType.CONTENT_TYPE_LOAN, payload, header);
					loanMainPanel.loadLoanGridData();
					loanMainPanel.loadGroupGridPanelData();
			    }
			});
		} else {
			Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
			return;
		}
       
	},

	onAddLoanToLoanGroup: function(btn, e, eOpts){
   		var loanGroupPanel = this;
		var grid = loanGroupPanel.lookupReference('addToLoanGroupGrid');
		var selectedRows = grid.getSelection().length;
		var loandIdsList = [];
		var loandTrackingIdList = [];
		var userId = gLoginUuser.id;
		var userName = gLoginUuser.unId;
		var selectedLoan = grid.getSelectionModel().getSelection();
		if (selectedLoan.length > 0) {

			var loanGroupId = selectedLoan[0].data.loanGroupId;
			for (var i = 0; i < selectedRows; i++) {
				loandIdsList.push(grid.getSelection()[i].data.loanId);
				loandTrackingIdList.push(grid.getSelection()[i].data.loanTrackingId);
				if(loanGroupId != grid.getSelection()[i].data.loanGroupId){
					Ext.Msg.alert('Attention', 'Loan add to Group allowed only from same loan group');
					return;
				}
			}

			var msgText = 'Are your sure to add '+selectedRows+' item(s) in loan group '+addLoanToLoanGroupWindow.title+'? whose tracking id: '+loandTrackingIdList.join(", ");

			Ext.Msg.confirm("Attention", msgText, function(btn){
			  	if (btn == 'yes'){
		    		var header = {
						reference: 'onAddLoanToLoanGroup'
					};

					var payload = [{
						loanIdList 	 : loandIdsList,
						loanGroupId  : addLoanToLoanGroupWindow.title,
						userModKey 	 : loginUser.id
					}]

					loanGroupPanel.sendRequest(appActionType.ACTION_TYPE_ADD_LOAN_TO_LOAN_GROUP, appContentType.CONTENT_TYPE_LOAN, payload, header);
					loanGroupPanel.loadLoanGridData();
					loanGroupPanel.loadGroupGridPanelData();
					addLoanToLoanGroupWindow.close();
				}
			});

		} else {
			Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
			return;
		}
	},

	onAddToloanGroupSearch: function () {

		var me = this;

		var loanTrackingId = me.lookupReference('loanTrackingId').value;
		var fromDate = me.lookupReference('fromDate').value;
		var toDate = me.lookupReference('toDate').value;

		if (!toDate) toDate = new Date();
		if(!loanTrackingId && !fromDate){
			fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
		}

		if (fromDate && toDate.getTime() < fromDate.getTime()) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		fromDate =  fromDate ? Ext.Date.format(fromDate, 'Y-m-d') : null;
		toDate = toDate ? Ext.Date.format(toDate, 'Y-m-d') : null;
		loanTrackingId = loanTrackingId ? loanTrackingId : null;

		if(!loanTrackingId && !fromDate){
			fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
		}

		var header = {
			reference: 'onLoanAddToLoanGroupDetailsPanelLoad'
		};

		var payload = [{
			userModKey	: loginUser.id,
			fromDate4Src: fromDate,
			toDate4Src: toDate,
			loanTrackingId: loanTrackingId,
		}];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_FOR_ADD_TO_LOAN_GROUP, appContentType.CONTENT_TYPE_LOAN, payload, header);
		
	},

	onChangeGPFamountField: function (cmp, newValue, oldValue, e, eOpt) {
	    if (newValue == -2147483648 || newValue == null || newValue === undefined) {
	    	cmp.reset();
	    }
	    else {
	    	cmp.setValue(newValue);
	    	var appliedLoanAmount = this.lookupReference('appliedLoanAmount');
	    	appliedLoanAmount.setValue(newValue*0.9);
	   	}
                        
	},

	onChangeLTVFfield: function (cmp, newValue, oldValue, e, eOpt) {
	    if (newValue == -2147483648 || newValue == null || newValue === undefined) {
	    	cmp.reset();
	    }
	    else {
	    	var recommendedForApproval = this.lookupReference('recommendedForApproval');
	    	var recommendedValue = recommendedForApproval.getValue();
	    	var priceQuotationAmount = this.lookupReference('priceQuotationAmount');
	    	var pqaValue = priceQuotationAmount.getValue();
	    	var bankParticipation = this.lookupReference('bankParticipation');
	    	var ltvFieldValue = 0;

	    	if (globalLonaPrefix != null && globalLonaPrefix == appConstants.LOAN_PREFIX_GPF) {
	    		if(recommendedValue > 0 && pqaValue > 0 ){
	    			ltvFieldValue =(recommendedValue / pqaValue)*100 ;

	    			if (ltvFieldValue > 90 && bankParticipation.fieldLabel == 'LTV (%)') {
	    				recommendedForApproval.reset();
			    		bankParticipation.reset();
			    		Ext.Msg.alert('Attention', 'LTV field does not allow more than 90. You should minimize amount of \'Recommend  for Approval\'');
						return;
				    }
				    else{
				    	bankParticipation.setValue(ltvFieldValue);
				    }

	    		}else{
	    			bankParticipation.reset();
	    		}
		    	
			}
	   	}
                        
	},
	loadGroupGridPanelData: function () {
		if(loginUser == null ||  loginUser == '') {
            loginUser=gLoginUuser;
        }
        else{
            loginUser=loginUser;
        }
		var header = {
			reference: 'loadGroupGridPanelData'
		};

		var fromDate = Ext.Date.add(new Date(),Ext.Date.DAY,-7);
		var toDate = new Date();

        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
		toDate = Ext.Date.format(toDate, 'Y-m-d');

		var payload = [{
            userModKey	: loginUser.id,
            fromDate4Src: fromDate,
			toDate4Src 	: toDate
        }];

		this.sendRequest(appActionType.ACTION_TYPE_SELECT_ALL_LOAN_GROUP_DATA, appContentType.CONTENT_TYPE_LOAN, payload, header);
	},

	onClickHoCrmBulkSendToCad: function () {
		var loanMainPanel = this;
		var grid = loanMainPanel.lookupReference('loanGroupMainSearchGrid');
		var selectedRows = grid.getSelection().length;
		var loanList = [];
		var loandTrackingIdList = [];
		var selectedLoan = grid.getSelectionModel().getSelection();

		if (selectedLoan.length > 0) {

			var loanGroupId = selectedLoan[0].data.loanGroupId;

			for (var i = 0; i < selectedRows; i++) {

				loanList.push(selectedLoan[i].data);
				loandTrackingIdList.push(grid.getSelection()[i].data.loanTrackingId);
				if(loanGroupId != grid.getSelection()[i].data.loanGroupId){
					Ext.Msg.alert('Attention', 'Select same loan group\'s loan for bulk send to cad');
					return;
				}else if(grid.getSelection()[i].data.stateName == appConstants.SENT_TO_CAD){
					Ext.Msg.alert('Attention', 'Tracking No. '+grid.getSelection()[i].data.loanTrackingId+' already in '+appConstants.SENT_TO_CAD+' state.');
					return;
				}
			}

			var msgText = 'Are your sure '+selectedRows+' item(s) send to cad ?';

			Ext.Msg.confirm("Attention", msgText, function(btn){
			  	if (btn == 'yes'){
		    		var header = {
						reference: 'onClickHoCrmBulkSendToCad'
					};

					var payload = [{
						loanList 	 : loanList,
						userModKey 	 : loginUser.id
					}]

					loanMainPanel.sendRequest(appActionType.ACTION_TYPE_BULK_HOCRM_SEND_TO_CAD, appContentType.CONTENT_TYPE_LOAN, payload, header);
					loanMainPanel.loadLoanGridData();
					loanMainPanel.loadGroupGridPanelData();
			    }
			});
		} else {
			Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
			return;
		}
	},

	onClickNidViewCloseBtn: function(cmp, e, eOpts){
		this.view.destroy();
	},

	onClickNewPersonBtn: function(cmp, e, eOpts){
		var cmp = this;
		var loanId = cmp.lookupReference('loanIdForNewPerson').value;
		var quaryMod = appConstants.QUERY_MOD;
		if(isMandatoryNewPerson(cmp)){
			var newInquiryModel = getNewPerson(cmp);	
			var payload = [{
		        userModKey	: loginUser.userIdModified,
		        quaryMod : quaryMod, 
		        loanId : loanId,
		        newInquiryModel : newInquiryModel
			}];

			var header = {
				reference: 'onClickNewPersonBtn'
			};
			showProcessMessage('Wait For CIB Generate....');
			this.sendRequest(appActionType.ACTION_TYPE_NEW_PERSON_INQUERY, appContentType.CONTENT_TYPE_CIB_INFORMATION, payload, header);
		}
	},
	onClickCheckInquiryBtn: function(cmp, e, eOpts){
		var cmp = this;
		var loanId = cmp.lookupReference('loanIdForSubjectCode').value;
		var quaryMod = appConstants.QUERY_MOD_SUB;
		
		if(isMandatorySubjectCode(cmp)){
			var newInquiryModel = getSubCode(cmp);			
			var header = {
				reference: 'onClickCheckInquiryBtn'
			};
			var payload = [{
		        userModKey	: loginUser.userIdModified,
		        quaryMod : quaryMod, 
		        loanId : loanId,
		        newInquiryModel : newInquiryModel
			}];
			showProcessMessage('Wait For CIB Generate....');
			this.sendRequest(appActionType.ACTION_TYPE_NEW_PERSON_INQUERY, appContentType.CONTENT_TYPE_CIB_INFORMATION, payload, header);
		
		}
	}
});

function buildTitle(data) {
	var customerName = data.customerName;
	var accountNo = data.accountNo;
	var appliedLoanAmount = data.appliedLoanAmount;
	var loanTrackingId = data.loanTrackingId;

	var loanType = "";
	var rec = getGlobalStore('gLoanTypeStore').findRecord('configurationId', data.idLoanTypeKey);
	if (rec) {
		loanType = rec.data.value1;
	}

	var state = data.stateDisplayLabel;

	return "Tracking Number : " + loanTrackingId + ", " + "Applicant : " + customerName + ", ACCOUNT : " + accountNo + ", Loan Type: " + loanType + ", Amount: " + appliedLoanAmount + ", State : " + state;
}

function buildLoanType(data) {
	var loanType = "";
	var rec = getGlobalStore('gLoanTypeStore').findRecord('configurationId', data.idLoanTypeKey);
	if (rec) {
		loanType = rec.data.value1;
	}

	return loanType ;
}

function getLoanPrefix(data) {
    var loanPrefix = "";
    var rec = getGlobalStore('gLoanTypeStore').findRecord('configurationId', data.idLoanTypeKey);
    if (rec) {
        loanPrefix = rec.data.value3;
    }

    return loanPrefix ;
}

function getLoanWindow(title) {
	var win = Ext.create('Ext.window.Window', {
		height: 550,
		width: 1130,
		layout: 'fit',
		itemId: 'loanDetailsWin',
		reference: 'loanDetailsWin',
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		autoScroll: true,
		title: title,
		modal: true,
		listeners: {
			close: function (cmp, eOpts) {
				getGlobalStore('gCibStatusCommentStore').clearData();
				getGlobalStore('gAnalystCommentStore').clearData();
				getGlobalStore('gExistingLiabilitiesStore').clearData();
				getGlobalStore('gExceptionDetailStore').clearData();
				getGlobalStore('gIns2CADStore').clearData();
				getGlobalStore('gCmntJustificationStore').clearData();
				getGlobalStore('gCmntWaiverSoughtStore').clearData();
				getGlobalStore('gSourceRecmndStore').clearData();
				getGlobalStore('gBranchRecmndStore').clearData();
				getGlobalStore('gLoanDocumentStore').clearData();
				getGlobalStore('gCmntOfActionStore').clearData();
			}
		},
		items: [{
			xtype: 'loanDetails'
		}]
	});

	loanDetailsWinToClose = win;

	return win;
}

function getFieldOfficerLoanWindow(title) {
	var win = Ext.create('Ext.window.Window', {
		height: 600,
		width: 630,
		layout: 'fit',
		itemId: 'FieldOfficerInfoDetailsWin',
		reference: 'FieldOfficerInfoDetailsWin',
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		scrollable: true,
    	autoScroll : true,   
		title: title,
		modal: true,
		items: [{
			xtype: 'FieldOfficerInfoDetails'
		}]
	});

	loanDetailsWinToClose = win;

	return win;
}

function getCibInformationWindow(title) {
	var win = Ext.create('Ext.window.Window', {
		height: 600,
		width: 800,
		layout: 'fit',
		itemId: 'cibInformationWin',
		reference: 'cibInformationWin',
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		scrollable: true,
    	autoScroll : true,   
		title: title,
		modal: true,
		items: [{
			xtype: 'CibInformationForm'
		}]
	});

	cibDetailsWinClose = win;

	return win;
}

function setCustomerInfo(cmp, data) {

	if (cmp.lookupReference('keepHiddenCustomerId').value == data.customerId) {
		setCustInfoWithValidData(cmp, data);
	} else {
		setCustInfoWithData(cmp, data);
	}

	cmp.lookupReference('keepHiddenCustomerId').setValue(data.customerId);
	cmp.lookupReference('keepHiddenCustomerIdKey').setValue(data.customerIdKey);

	cmp.lookupReference('bpNo').setValue(data.bpNo);
	cmp.lookupReference('nameOfBorrower').setValue(data.customerName);
	cmp.lookupReference('banglaNameOfBorrower').setValue(data.banglaNameOfBorrower);
	cmp.lookupReference('district').setValue(data.officeDistrict);
	cmp.lookupReference('division').setValue(data.officeDivision);
	cmp.lookupReference('designation').setValue(data.designation);
	cmp.lookupReference('currentPlaceofPosting').setValue(data.currentPlaceofPosting);
	cmp.lookupReference('houseOwnership').setValue(data.houseOwnership);
	cmp.lookupReference('permanentAddress').setValue(data.permanentAddr);

	cmp.lookupReference('nid').setValue(data.nid);

	var isMatchedNid = cmp.lookupReference('isMatchedNid');
	data.isMatchedNid == "true" ? isMatchedNid.setValue(true) : isMatchedNid.setValue(false);

	cmp.lookupReference('cif').setValue(data.cif);
	cmp.lookupReference('motherName').setValue(data.motherName);
	cmp.lookupReference('fatherName').setValue(data.fatherName);
	cmp.lookupReference('spouse').setValue(data.spouse);
	cmp.lookupReference('officeAddress').setValue(data.officeAddr);

	cmp.lookupReference('mobile').setValue(data.mobile);
	cmp.lookupReference('emerPhone').setValue(data.emerPhone);

	var storeData = getGlobalStore('gCustTypeStore').findRecord('configurationId', data.idCustomerTypeKey);
	if (!storeData) cmp.lookupReference('hiddenCustomerType').setValue(data.idCustomerTypeKey);
	cmp.lookupReference('customerType').setValue(data.idCustomerTypeKey);

	if (data.salaryDisbursedWithCBBL == 1) {
		cmp.lookupReference('salaryDisbursedWithCBBLYes').setValue(true);
	} else if (data.salaryDisbursedWithCBBL == 0) {
		cmp.lookupReference('salaryDisbursedWithCBBLNo').setValue(true);
	}

	if (data.maritalStatus) {
		if (data.maritalStatus.toUpperCase() == 'MARRIED') {
			cmp.lookupReference('maritalStatusMarried').setValue(true);
		} else if (data.maritalStatus.toUpperCase() == 'UNMARRIED') {
			cmp.lookupReference('maritalStatusUnmarried').setValue(true);
		}
	}
}

function setCustInfoWithData(cmp, data) {
    cmp.lookupReference('tin').setValue(data.tin);
    cmp.lookupReference('age').setValue(data.age);
    cmp.lookupReference('serviceLength').setValue(data.serviceLength);
    cmp.lookupReference('remainingYearOfRetirement').setValue(data.remainingYearOfRetirement);
    cmp.lookupReference('dateOfRetirement').setValue(data.retirementDate ? new Date(data.retirementDate.substr(0, 10)) : null);    
    cmp.lookupReference('dateOfJoining').setValue(data.joiningDate ? new Date(data.joiningDate.substr(0, 10)) : null);
    cmp.lookupReference('dateOfBirth').setValue(data.dateOfBirth ? new Date(data.dateOfBirth.substr(0, 10)) : null);
}

function setCustInfoWithValidData(cmp, data) {
    if (data.tin) cmp.lookupReference('tin').setValue(data.tin);
    if (data.age) cmp.lookupReference('age').setValue(data.age);
    if (data.serviceLength) cmp.lookupReference('serviceLength').setValue(data.serviceLength);
    if (data.remainingYearOfRetirement) cmp.lookupReference('remainingYearOfRetirement').setValue(data.remainingYearOfRetirement);
    if (data.retirementDate) cmp.lookupReference('dateOfRetirement').setValue(data.retirementDate ? new Date(data.retirementDate.substr(0, 10)) : null);
    if (data.joiningDate) cmp.lookupReference('dateOfJoining').setValue(data.joiningDate ? new Date(data.joiningDate.substr(0, 10)) : null); 
    if (data.dateOfBirth) cmp.lookupReference('dateOfBirth').setValue(data.dateOfBirth ? new Date(data.dateOfBirth.substr(0, 10)) : null);
}

function setLoanInfo(cmp, data) {

	if (cmp.lookupReference('keepHiddenloanIdKey').value == data.loanId) {
		setLoanInfoWithValidData(cmp, data);
	} else {
		setLoanInfoWithData(cmp, data);
	}

	changeFieldName(cmp, data);
	cmp.lookupReference('applicationNo').setValue(data.applicationNo);

	cmp.lookupReference('keepHiddenloanIdKey').setValue(data.loanId);

	cmp.lookupReference('customerType').setValue(data.idCustomerTypeKey);
	cmp.lookupReference('loanType').setValue(data.idLoanTypeKey);

	cmp.lookupReference('purposeOfLoan').setValue(data.purposeOfLoan);
	cmp.lookupReference('netMonthlyIncome').setValue(data.netMonthlyIncome);
	cmp.lookupReference('tenorYear').setValue(data.tenorYear);
	cmp.lookupReference('existingLoanEMI').setValue(data.existingLoanAmount);
	cmp.lookupReference('interestRate').setValue(data.interestRate);
	cmp.lookupReference('totalEMI').setValue(data.totalEMI);
	cmp.lookupReference('disposableIncome').setValue(data.disposableIncome);
	cmp.lookupReference('proposeEMIDate').setValue(data.proposeEMIDate);
	cmp.lookupReference('duplications').setValue(data.duplications);
	cmp.lookupReference('relationshipWithApplicant').setValue(data.relationshipWithApplicant);
	cmp.lookupReference('relationshipWithPg').setValue(data.relationshipWithPg);
	cmp.lookupReference('nameOfGuarantor').setValue(data.nameOfGuarantor);
	cmp.lookupReference('guarantorNid').setValue(data.guarantorNid);
	cmp.lookupReference('allowedDBR').setValue(data.allowedDBR);
	cmp.lookupReference('cibStatus').setValue(data.cibStatus);
	cmp.lookupReference('hiddenLoanGroupId').setValue(data.loanGroupId);
	cmp.lookupReference('mobileOfGuarantor').setValue(data.mobileOfGuarantor);
	cmp.lookupReference('smsStatus').setValue(data.smsStatus);

	var quotationAmnt = 0;
	if (data.priceQuotationAmount < 0 || Ext.isEmpty(data.priceQuotationAmount)) {
		quotationAmnt = getPriceQuatationAmount(data.appliedLoanAmount);
	} else {
		quotationAmnt = data.priceQuotationAmount;
	}
	
	cmp.lookupReference('guarantorElibiblity').setValue(data.guarantorElibiblity);
	cmp.lookupReference('grossSalaryPerMonth').setValue(data.grossSalaryPerMonth);
	cmp.lookupReference('security').setValue(data.security);
	cmp.lookupReference('remainingAmtAftEMI').setValue(data.remainingAmtAftEMI);
	cmp.lookupReference('dobOfPg').setValue(data.dobOfPg ? new Date(data.dobOfPg.substr(0, 10)) : null);
	cmp.lookupReference('dobOfPgYear').setValue(data.dobOfPgYear);
	cmp.lookupReference('borrowerParticipation').setValue(data.borrowerParticipation);

	cmp.lookupReference('appliedLoanAmountApproval').setValue(data.appliedLoanAmount);
	cmp.lookupReference('businessRecommendedAmnt').setValue(data.businessRecommendedAmnt);
	cmp.lookupReference('recommendedForApproval').setValue(data.recommendedForApproval);
	
	if (globalLonaPrefix == appConstants.LOAN_PREFIX_GPF) {
		cmp.lookupReference('gPFAmount').setValue(data.gPFAmount);
		cmp.lookupReference('bankParticipation').setValue((data.recommendedForApproval) / (data.gPFAmount));
	}else{
		cmp.lookupReference('priceQuotationAmount').setValue(quotationAmnt);
		cmp.lookupReference('bankParticipation').setValue(data.bankParticipation);
	}

	cmp.lookupReference('appliedLoanAmount').setValue(data.appliedLoanAmount);

	var cibDate = data.cibGenerationDate;
	cmp.lookupReference('dateOfCIBGeneration').setValue(cibDate ? new Date(cibDate.substr(0, 10)) : null);

	if (data.overLoan == 1) {
		cmp.lookupReference('takeOverLoan').getBoxes()[0].setValue(true)
	} else if (data.overLoan == 0) {
		cmp.lookupReference('takeOverLoan').getBoxes()[1].setValue(true)
	}

	if (data.topUp == 1) {
		cmp.lookupReference('topUpLoan').getBoxes()[0].setValue(true)
	} else if (data.topUp == 0) {
		cmp.lookupReference('topUpLoan').getBoxes()[1].setValue(true)
	}

	var dobpgCal=(data.dobOfPg ? new Date(data.dobOfPg.substr(0, 10)) : null);
	if(dobpgCal ==null || dobpgCal ==""){
		cmp.lookupReference('dobOfPgYear').setValue(null);
	}else{
		var formt = Ext.Date.format((data.dobOfPg ? new Date(data.dobOfPg.substr(0, 10)) : null), 'Y-m-d');
		var newparseddate = calculateAge(formt, new Date());
		var indx = newparseddate.indexOf("m");
		var parseddate = newparseddate.substring(0, indx + 1);
		cmp.lookupReference('dobOfPgYear').setValue(parseddate);
	}

	if(data.dobOfPgYear=='NaNy, NaNm'){
		cmp.lookupReference('dobOfPgYear').setValue(null);
	}


	cmp.lookupReference('condition').setValue(data.condition);

	// setting this to keep of DB while loading
	cmp.lookupReference('monthlyInstallment').setValue(data.monthlyInstallment);
	cmp.lookupReference('proposedDBR').setValue(data.proposedDBR);

}

function setLoanInfoWithData(cmp, data) {
    cmp.lookupReference('sourcingBranch').setValue(data.sourcingBrc);
 	cmp.lookupReference('staffId').setValue(data.staffId);
}

function setLoanInfoWithValidData(cmp, data) {
    if (data.sourcingBrc) cmp.lookupReference('sourcingBranch').setValue(data.sourcingBrc);
 	if (data.staffId) cmp.lookupReference('staffId').setValue(data.staffId);
}


function setHiddenLoanInfo(cmp, data) {
	cmp.lookupReference('loanStateName').setValue(data.stateName);
	cmp.lookupReference('loanStateId').setValue(data.stateId);
	cmp.lookupReference('loanId').setValue(data.loanId);
	cmp.lookupReference('loanVer').setValue(data.loanVer);
}

function setCbblAccountNo(controller, accountNo) {
	var accountNoArr = accountNo.split(',');
	var accountNoList = [];
	for (var i = 0; i < accountNoArr.length; i++) {
		accountNoList[i] = Ext.create('Desktop.model.CbblAccountNoModel', {
			accountNo: accountNoArr[i].trim()
		});
	}
	controller.getViewModel().data.cbblAccountNoStore.removeAll();
	controller.getViewModel().data.cbblAccountNoStore.loadData(accountNoList);
	controller.getView().lookupReference('CbblAccountNo').setValue(accountNoArr[0].trim());
}

function getPayloadOfLoanApplication(cmp, reason) {
	var payloadOfCustomer = getPayloadOfCustomer(cmp);
	var payloadOfLoan = getPayloadOfLoan(cmp);

	payloadOfLoan[0]["customer"] = payloadOfCustomer[0];

	var payloadOfLoanDoc = getPayloadOfLoanDocument('gLoanDocumentStore');
	payloadOfLoan[0]["loanDocumentList"] = payloadOfLoanDoc;


	var payloadOfLiability = getPayloadOfLiability(cmp);
	var payloadOfCibStatus = getPayloadOfCibStatus(cmp);
	var payloadOfAnalystsCmnt = getPayloadOfAnalystsCmnt(cmp);
	var payloadOfExceptionDtls = getPayloadOfExceptionDtls(cmp);
	var payloadOfIns2Cad = getPayloadOfIns2Cad(cmp);
	var payloadOfCmntJustification = getPayloadOfCmntJustification(cmp);
	var payloadOfSourceRecmnd = getPayloadOfSourceRecmnd(cmp);
	var payloadOfBranchRecmnd = getPayloadOfBranchRecmnd(cmp);
	var payloadOfCmntWaiverSought = getPayloadOfCmntWaiverSought(cmp);

	payloadOfLoan[0]["existingLiabilityList"] = payloadOfLiability;
	payloadOfLoan[0]["cibStatusList"] = payloadOfCibStatus;
	payloadOfLoan[0]["analystsCommentsList"] = payloadOfAnalystsCmnt;
	payloadOfLoan[0]["exceptionDetailsList"] = payloadOfExceptionDtls;
	payloadOfLoan[0]["instructionToCadList"] = payloadOfIns2Cad;

	payloadOfLoan[0]["cmntJustificationList"] = payloadOfCmntJustification;
	payloadOfLoan[0]["sourceRecmndList"] = payloadOfSourceRecmnd;
	payloadOfLoan[0]["branchRecmndList"] = payloadOfBranchRecmnd;
	payloadOfLoan[0]["cmntWaiverSoughtList"] = payloadOfCmntWaiverSought;

	return payloadOfLoan;
}

function getPayloadOfCustomer(cmp) {
	var dateOfBirth = Ext.Date.format(cmp.lookupReference('dateOfBirth').value, 'Ymd H:i:s');
	var joiningDate = Ext.Date.format(cmp.lookupReference('dateOfJoining').value, 'Ymd H:i:s');
	var retirementDate = Ext.Date.format(cmp.lookupReference('dateOfRetirement').value, 'Ymd H:i:s');

	var age = cmp.lookupReference('age').value;
	var serviceLength = cmp.lookupReference('serviceLength').value;
	var remainYearToRetir = cmp.lookupReference('remainingYearOfRetirement').value;

	var customerIdKey = cmp.lookupReference('keepHiddenCustomerIdKey').value;
	var customerId = cmp.lookupReference('keepHiddenCustomerId').value;
	var customerName = cmp.lookupReference('nameOfBorrower').value;
	var banglaNameOfBorrower = cmp.lookupReference('banglaNameOfBorrower').value;
	var bpNo = cmp.lookupReference('bpNo').value;
	var nid = cmp.lookupReference('nid').value;
	var isMatchedNid = cmp.lookupReference('isMatchedNid').value;
	var tin = cmp.lookupReference('tin').value;
	var designation = cmp.lookupReference('designation').value;

	var disbursedChecked = cmp.lookupReference('salaryDisbursedWithCBBL').getChecked();
	var salaryDisbursed = disbursedChecked.length == 1 ? disbursedChecked[0].inputValue : null;
	var currentPosting = cmp.lookupReference('currentPlaceofPosting').value;
	
	var cif = cmp.lookupReference('cif').value;

	var maritalStatusChecked = cmp.lookupReference('maritalStatus').getChecked();
	var maritalStatus = maritalStatusChecked.length == 1 ? maritalStatusChecked[0].inputValue : null;
	var motherName = cmp.lookupReference('motherName').value;
	var fatherName = cmp.lookupReference('fatherName').value;
	var houseOwnership = cmp.lookupReference('houseOwnership').value;
	var spouse = cmp.lookupReference('spouse').value;
	var permanentAddr = cmp.lookupReference('permanentAddress').value;
	var officeAddr = cmp.lookupReference('officeAddress').value;
	var officeDivision = cmp.lookupReference('division').value;
	var officeDistrict = cmp.lookupReference('district').value;

	var mobile = cmp.lookupReference('mobile').value;
	var emerPhone = cmp.lookupReference('emerPhone').value;

	var payload = [{
		userModKey: loginUser.id,
		customerIdKey: customerIdKey ? customerIdKey : null,
		customerId: customerId ? customerId : null,
		customerName: customerName ? customerName : null,
		banglaNameOfBorrower: banglaNameOfBorrower ? banglaNameOfBorrower : null,
		bpNo: bpNo ? bpNo : null,
		nid: nid ? nid : null,
		isMatchedNid: isMatchedNid ? isMatchedNid : null,
		tin: tin ? tin : "",
		designation: designation ? designation : null,
		salaryDisbursedWithCBBL: salaryDisbursed ? salaryDisbursed : null,
		currentPlaceofPosting: currentPosting ? currentPosting : null,
		dateOfBirth: dateOfBirth ? dateOfBirth : null,
		cif: cif ? cif : null,
		joiningDate: joiningDate ? joiningDate : null,
		maritalStatus: maritalStatus ? maritalStatus : null,
		retirementDate: retirementDate ? retirementDate : null,
		motherName: motherName ? motherName : null,
		fatherName: fatherName ? fatherName : null,
		houseOwnership: houseOwnership ? houseOwnership : null,
		spouse: spouse ? spouse : null,
		permanentAddr: permanentAddr ? permanentAddr : null,
		officeAddr: officeAddr ? officeAddr : null,
		age: age ? age : null,
		serviceLength: serviceLength ? serviceLength : null,
		remainingYearOfRetirement: remainYearToRetir ? remainYearToRetir : null,
		mobile: mobile ? mobile : null,
		emerPhone: emerPhone ? emerPhone : null,
		officeDivision: officeDivision ? officeDivision : null,
		officeDistrict: officeDistrict ? officeDistrict : null,
	}]
	return payload;
}

function getPayloadOfLoan(cmp) {
	var cibGenerationDate = Ext.Date.format(cmp.lookupReference('dateOfCIBGeneration').value, 'Ymd H:i:s');

	var customerType = cmp.lookupReference('customerType').value;
	var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;
	var appliedLoanAmount = cmp.lookupReference('appliedLoanAmount').value;
	var purposeOfLoan = cmp.lookupReference('purposeOfLoan').value;
	var overLoanChecked = cmp.lookupReference('takeOverLoan').getChecked();
	var overLoan = overLoanChecked.length == 1 ? overLoanChecked[0].inputValue : null;
	var topUpLoan = cmp.lookupReference('topUpLoan').getChecked();
	var topUp = topUpLoan.length == 1 ? topUpLoan[0].inputValue : null;
	var netMonthlyIncome = cmp.lookupReference('netMonthlyIncome').value;
	var tenorYear = cmp.lookupReference('tenorYear').value;
	var existingLoanAmount = cmp.lookupReference('existingLoanEMI').value;
	var interestRate = cmp.lookupReference('interestRate').value;
	var totalEMI = cmp.lookupReference('totalEMI').value;
	var monthlyInstallment = cmp.lookupReference('monthlyInstallment').value;
	var disposableIncome = cmp.lookupReference('disposableIncome').value;
	var proposeEMIDate = cmp.lookupReference('proposeEMIDate').value;
	var duplications = cmp.lookupReference('duplications').value;
	var relationshipWithApplicant = cmp.lookupReference('relationshipWithApplicant').value;
	var relationshipWithPg = cmp.lookupReference('relationshipWithPg').value;
	var nameOfGuarantor = cmp.lookupReference('nameOfGuarantor').value;
	var guarantorNid = cmp.lookupReference('guarantorNid').value;
	var mobileOfGuarantor = cmp.lookupReference('mobileOfGuarantor').value;
	var allowedDBR = cmp.lookupReference('allowedDBR').value;
	var cibStatus = cmp.lookupReference('cibStatus').value;
	var proposedDBR = cmp.lookupReference('proposedDBR').value;
	var priceQuotationAmount = cmp.lookupReference('priceQuotationAmount').value;
	var bankParticipation = cmp.lookupReference('bankParticipation').value;

	var grossSalaryPerMonth = cmp.lookupReference('grossSalaryPerMonth').value;
	var guarantorElibiblity = cmp.lookupReference('guarantorElibiblity').value;
	var security = cmp.lookupReference('security').value;
	var dobOfPg = Ext.Date.format(cmp.lookupReference('dobOfPg').value, 'Ymd H:i:s');
	var dobOfPgYear = cmp.lookupReference('dobOfPgYear').value;
	var remainingAmtAftEMI = cmp.lookupReference('remainingAmtAftEMI').value;
	var borrowerParticipation = cmp.lookupReference('borrowerParticipation').value;

	var loanType = cmp.lookupReference('loanType').value;
	var applicationNo = cmp.lookupReference('applicationNo').value;

	var appliedLoanAmountApproval = cmp.lookupReference('appliedLoanAmount').value;
	var businessRecommendedAmnt = cmp.lookupReference('businessRecommendedAmnt').value;
	var recommendedForApproval = cmp.lookupReference('recommendedForApproval').value;
	var loanStateName = cmp.lookupReference('loanStateName').value;
	var loanStateId = cmp.lookupReference('loanStateId').value;
	var condition = cmp.lookupReference('condition').value;
	var gPFAmount = cmp.lookupReference('gPFAmount').value;

	var sourcingBrc = cmp.lookupReference('sourcingBranch').value;
    var staffId = cmp.lookupReference('staffId').value;

	var accountNo4Src = cmp.lookupReference('CbblAccountNo').value;

	if (!loanStateName) {
		loanStateName = null;
	}

	if(dobOfPgYear==null||dobOfPgYear==""||dobOfPgYear=="NaNy, NaNm"){
		dobOfPgYear="TEST YEAR";
	}

	if(dobOfPg==null||dobOfPg==""||dobOfPg=="NaNy, NaNm"){
		dobOfPg="19700101";
	}

	var payloadOfLoan = [{
		userModKey: loginUser.id,
		loanId: loanId ? loanId : null,
		applicationNo: applicationNo ? applicationNo : null,
		appliedLoanAmount: appliedLoanAmount,
		purposeOfLoan: purposeOfLoan ? purposeOfLoan : null,
		overLoan: overLoan ? overLoan : null,
		topUp: topUp ? topUp : null,
		netMonthlyIncome: netMonthlyIncome,
		tenorYear: tenorYear,
		existingLoanAmount: existingLoanAmount,
		interestRate: interestRate,
		totalEMI: totalEMI,
		monthlyInstallment: monthlyInstallment,
		disposableIncome: disposableIncome,
		proposeEMIDate: proposeEMIDate ? proposeEMIDate : null,
		duplications: duplications ? duplications : null,
		relationshipWithApplicant: relationshipWithApplicant ? relationshipWithApplicant : null,
		relationshipWithPg: relationshipWithPg ? relationshipWithPg : null,
		nameOfGuarantor: nameOfGuarantor ? nameOfGuarantor : null,
		guarantorNid: guarantorNid ? guarantorNid : null,
		mobileOfGuarantor: mobileOfGuarantor ? mobileOfGuarantor : null,		
		cibGenerationDate: cibGenerationDate ? cibGenerationDate : null,
		allowedDBR: allowedDBR ? allowedDBR : null,
		cibStatus: cibStatus ? cibStatus : null,
		proposedDBR: proposedDBR,
		priceQuotationAmount: priceQuotationAmount,
		bankParticipation: bankParticipation,

		grossSalaryPerMonth: grossSalaryPerMonth,
		guarantorElibiblity: guarantorElibiblity ? guarantorElibiblity : null,
		security: security ? security : null,
		remainingAmtAftEMI: remainingAmtAftEMI,
		dobOfPg: dobOfPg ? dobOfPg : null,
		dobOfPgYear: dobOfPgYear ? dobOfPgYear : null,
		borrowerParticipation: borrowerParticipation,

		appliedLoanAmountApproval: appliedLoanAmountApproval,
		businessRecommendedAmnt: businessRecommendedAmnt,
		recommendedForApproval: recommendedForApproval,
		idLoanTypeKey: loanType ? loanType : null,
		idCustomerTypeKey: customerType ? customerType : null,
		stateId: loanStateId ? loanStateId : null,
		stateName: loanStateName ? loanStateName : null,
		condition: condition ? condition : null,
		gPFAmount: gPFAmount ? gPFAmount : null,
		idLegalEntityKey: loginUser.legalEntityTypeId,
		dataSource: appConstants.DATA_SOURCE_WEB,

		sourcingBrc: sourcingBrc ? sourcingBrc : null,
        staffId: staffId ? staffId : null,

        accountNo4Src: accountNo4Src ? accountNo4Src : null,
	}];

	return payloadOfLoan;
}

function getPayloadOfLiability(cmp) {
	return getLiabilitiesListArray('gExistingLiabilitiesStore');
}

function getPayloadOfCibStatus(cmp) {
	return getCommentListArray('gCibStatusCommentStore');
}

function getPayloadOfAnalystsCmnt(cmp) {
	return getCommentListArray('gAnalystCommentStore');
}

function getPayloadOfExceptionDtls(cmp) {
	return getCommentListArray('gExceptionDetailStore');
}

function getPayloadOfIns2Cad(cmp) {
	return getCommentListArray('gIns2CADStore');
}

function getPayloadOfCmntJustification(cmp) {
	return getCommentListArray('gCmntJustificationStore');
}

function getPayloadOfCmntWaiverSought(cmp) {
	return getCommentListArray('gCmntWaiverSoughtStore');
}

function getPayloadOfSourceRecmnd(cmp) {
	return getCommentListArray('gSourceRecmndStore');
}

function getPayloadOfBranchRecmnd(cmp) {
	return getCommentListArray('gBranchRecmndStore');
}

function getPayloadOfLoanDocument(storeId) {
	var data = getGlobalStore(storeId).data.items;

	var arr = [];
	for (var i = 0; i < data.length; i++) {
		var obj = {
			loanDocId: data[i].data.loanDocId ? data[i].data.loanDocId : null,
			docId: data[i].data.docId ? data[i].data.docId : null,
			docType: data[i].data.docType ? data[i].data.docType : null,
			isMandatory: data[i].data.isMandatory ? data[i].data.isMandatory : null,
			uploadStatus: data[i].data.uploadStatus ? data[i].data.uploadStatus : null,
			userModKey: loginUser.id
		}
		arr.push(obj);
	}

	return arr;
}

function getLiabilitiesListArray(storeId) {
	var arr = [];
	var store = getGlobalStore(storeId);
	var data = store.data.items;
	for (var i = 0; i < data.length; i++) {
		if (Ext.isEmpty(data[i].data.loanId) || !data[i].data.loanId) data[i].data.loanId = null;
		if (Ext.isEmpty(data[i].data.existingLiabilityId) || !data[i].data.existingLiabilityId) {
			data[i].data.existingLiabilityId = null;
		}
		data[i].data.userModKey = loginUser.id;

		if (isValidLiability(data[i].data)) {
			arr.push(data[i].data);
		}
	}
	return arr;
}

function getLiabilitiesForSaveAndNewCol(cmp) {
	var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;
	var arr = [];
	var store = getGlobalStore('gExistingLiabilitiesStore');
	var data = store.data.items;
	for (var i = 0; i < data.length; i++) {
		if (data[i].data.existingLiabilityId) {
			arr.push(data[i].data);
		} else {
			if (isValidLiability(data[i].data)) {
				var payload = {
					existingLiabilityId: null,
					userModKey: loginUser.id,
					creatorId: loginUser.id,
					bankName: data[i].data.bankName,
					product: data[i].data.product,
					disbursed: data[i].data.disbursed,
					currentOutstanding: data[i].data.currentOutstanding,
					eMISize: data[i].data.eMISize,
					remarks: data[i].data.remarks,
					loanId: loanId
				};

				arr.push(payload);
			}
		}
	}
	return arr;
}

function getCommentListArray(storeId) {

	var data = getGlobalStore(storeId).data.items;

	var commentType;
	if (storeId == 'gCibStatusCommentStore') {
		commentType = appConstants.CIB_STATUS;
	} else if (storeId == 'gAnalystCommentStore') {
		commentType = appConstants.ANALYSTS_COMMENTS;
	} else if (storeId == 'gExceptionDetailStore') {
		commentType = appConstants.EXCEPTION_DETAILS;
	} else if (storeId == 'gIns2CADStore') {
		commentType = appConstants.INS_2_CAD;
	} else if (storeId == 'gCmntJustificationStore') {
		commentType = appConstants.COMMENTS_JUSTIFICATION;
	} else if (storeId == 'gCmntWaiverSoughtStore') {
		commentType = appConstants.COMMENTS_WAIVER_SOUGHT;
	} else if (storeId == 'gSourceRecmndStore') {
		commentType = appConstants.SO_RECOMMENDATION;
	} else if (storeId == 'gBranchRecmndStore') {
		commentType = appConstants.BM_RECOMMENDATION;
	}

	var arr = []
	for (var i = 0; i < data.length; i++) {
		if (Ext.isEmpty(data[i].data.refId) || !data[i].data.refId) {
			data[i].data.refId = null;
		}
		if (Ext.isEmpty(data[i].data.commentId) || !data[i].data.commentId) {
			data[i].data.commentId = null;
		}
		if (Ext.isEmpty(data[i].data.commentVer) || !data[i].data.commentVer) {
			data[i].data.commentVer = null;
		}
		if (Ext.isEmpty(data[i].data.createdDate) || !data[i].data.createdDate) {
			data[i].data.createdDate = null;
		} else {
			data[i].data.createdDate = Ext.Date.format(data[i].data.createdDate, 'Ymd H:i:s');
		}
		data[i].data.userModKey = loginUser.id;
		data[i].data.creatorId = loginUser.id;
		data[i].data.commentedBy = loginUser.unId;
		data[i].data.commentType = commentType;
		data[i].data.objectType = appContentType.CONTENT_TYPE_LOAN.toUpperCase();

		if (isValidComment(data[i].data.comments)) {
			arr.push(data[i].data);
		}
	}
	return arr;
}

function isMandatoryFieldFilled(cmp) {

	var accountNo = cmp.lookupReference('CbblAccountNo').value;
	var nid = cmp.lookupReference('nid').value;
	var customerName = cmp.lookupReference('nameOfBorrower').value;
	var designation = cmp.lookupReference('designation').value;
	var currentPosting = cmp.lookupReference('currentPlaceofPosting').value;
	var checked = cmp.lookupReference('salaryDisbursedWithCBBL').getChecked();
	var salaryDisbursed = checked.length == 1 ? checked[0].inputValue : null;
	var dateOfBirth = cmp.lookupReference('dateOfBirth').value;
	var cif = cmp.lookupReference('cif').value;
	var maritalStatusChecked = cmp.lookupReference('maritalStatus').getChecked();
	var maritalStatus = maritalStatusChecked.length == 1 ? maritalStatusChecked[0].inputValue : null;
	var customerType = cmp.lookupReference('customerType').value;
	var appliedLoanAmount = cmp.lookupReference('appliedLoanAmount').value;
	var tenorYear = cmp.lookupReference('tenorYear').value;
	var interestRate = cmp.lookupReference('interestRate').value;
	var monthlyInstallment = cmp.lookupReference('monthlyInstallment').value;
	var recommendedApproval = cmp.lookupReference('recommendedForApproval').value;
	var loanType = cmp.lookupReference('loanType').value;
	var tin = cmp.lookupReference('tin').value;
	var dobOfPgYear = cmp.lookupReference('dobOfPg').value;
	var loanPrefix = cmp.lookupReference('hiddenLoanPrefix').value;
	var gPFAmount = cmp.lookupReference('gPFAmount').value;
	var loanStateName = cmp.lookupReference('loanStateName').value;
	var parseddate;
	var parsedYear;

	var mobileOfGuarantor = cmp.lookupReference('mobileOfGuarantor').value;	
	var mobile = cmp.lookupReference('mobile').value;
	var emerPhone = cmp.lookupReference('emerPhone').value;

	var mobileValidation = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
	if(mobileOfGuarantor){
		if (!mobileOfGuarantor.match(mobileValidation)) {
			Ext.MessageBox.alert('Invalid Mobile', 'Please Give Valid Guarantor Mobile.');
			return false;
		}
	}
	if(emerPhone){
		if (!emerPhone.match(mobileValidation)) {
			Ext.MessageBox.alert('Invalid Mobile', 'Please Give Valid Emergency  Mobile.');
			return false;
		}
	}

	if(mobile){
		if (!mobile.match(mobileValidation)) {
			Ext.MessageBox.alert('Invalid Mobile', 'Please Give Valid Mobile.');
			return false;
		}
	}

	if(dobOfPgYear != null && dobOfPgYear != undefined && dobOfPgYear != "NaNy, NaNm"){
		var parsedMap = parseDiffOfTowDate(dobOfPgYear, new Date());
		parseddate = parsedMap['DATE'];
		parsedYear = parsedMap['YEAR'];
	}
	var tenorYear = cmp.lookupReference('tenorYear').value ? cmp.lookupReference('tenorYear').value : 0;

	if (!accountNo) {
		Ext.MessageBox.alert('Missing Field', 'CBBL Account No. should not be Empty.');
		return false;
	} 
	if (!loanType) {
		Ext.MessageBox.alert('Missing Field', 'Loan Type should not be Empty.');
		return false;
	} 
	if (!customerType) {
		Ext.MessageBox.alert('Missing Field', 'Customer Type should not be Empty.');
		return false;
	} 
	if (!nid) {
		Ext.MessageBox.alert('Missing Field', 'NID should not be Empty.');
		return false;
	} 
	if (!customerName) {
		Ext.MessageBox.alert('Missing Field', 'Borrower Name should not be Empty.');
		return false;
	} 
	if (!designation) {
		Ext.MessageBox.alert('Missing Field', 'Designation should not be Empty.');
		return false;
	} else if (!salaryDisbursed) {
		Ext.MessageBox.alert('Missing Field', 'Salary Diabursed with CBBL should not be Empty.');
		return false;
	} 
	if (!currentPosting) {
		Ext.MessageBox.alert('Missing Field', 'Current place of posting should not be Empty.');
		return false;
	} 
	if (!dateOfBirth) {
		Ext.MessageBox.alert('Missing Field', 'Date of birth should not be Empty.');
		return false;
	} 
	if (!cif) {
		Ext.MessageBox.alert('Missing Field', 'CIF should not be Empty.');
		return false;
	} 
	if (!maritalStatus) {
		Ext.MessageBox.alert('Missing Field', 'Marital status should not be Empty.');
		return false;
	} 
	if (!appliedLoanAmount) {
		Ext.MessageBox.alert('Missing Field', 'Applied Loan Amount should not be Empty.');
		return false;
	} 
	if (!tenorYear) {
		Ext.MessageBox.alert('Missing Field', 'Tenor Year should not be Empty.');
		return false;
	} 
	if (!interestRate) {
		Ext.MessageBox.alert('Missing Field', 'Interest Rate should not be Empty.');
		return false;
	} 
	if (!monthlyInstallment) {
		Ext.MessageBox.alert('Missing Field', 'Monthly Installment should not be Empty.');
		return false;
	}
	if(parsedYear + tenorYear >= 60){
        Ext.MessageBox.alert('Not Valid', 'Guarantor is not Eligible. Tenor Year + Age of PG should be less than or equal to 60.');
		return false;
	}
	if((!recommendedApproval && loanStateName == 'CA_UPDATED')|| (!recommendedApproval && loanStateName == 'CA_RECEIVED')){
		Ext.MessageBox.alert('Missing Field', 'Recommended For Approval should not be Empty.');
		return false;
	}
	if(parsedYear < 18){
        Ext.MessageBox.alert('Not Valid', 'Age of PG should not be less then 18.');
		return false;
	}
	if (appliedLoanAmount >= 500000 && !tin) {
		Ext.MessageBox.alert('Missing Field', 'Applied Loan Amount is more than 500000, Tin must not be Empty.');
		return false;
	}
	if(isLoanTypeGpf(loanPrefix)){
		if(!gPFAmount){	    
	       Ext.MessageBox.alert('Missing Field', 'GPF Amount should not be empty.');
	      return false;						
        }
	}
	return true;
}

function isMandatoryFieldNid(cmp){
	var searchDateOfBirth = cmp.lookupReference('searchDateOfBirth').value;
	var searchNidNumber = cmp.lookupReference('searchNidNumber').value;
	 if (!searchNidNumber) {
			Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
			}).show({
			    title: 'Missing Field',
			    buttons: Ext.Msg.OK,
			    message: 'NID should not be Empty.'
			});
			return false;
		}else if (!searchDateOfBirth) {
			Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
			}).show({
			    title: 'Missing Field',
			    buttons: Ext.Msg.OK,
			    message: 'Date Of Birth should not be Empty.'
			});
			return false;
		}else if (searchNidNumber.length<9) {
			Ext.create('Ext.window.MessageBox', {
			    alwaysOnTop: true,
			    closeAction: 'destroy'
			}).show({
			    title: 'Missing Field',
			    buttons: Ext.Msg.OK,
			    message: 'NID Should be Minimum 10 character.'
			});
			return false;
		} 

	return true;
}

function setDefultCommentRow(storeId) {
	var store = getGlobalStore(storeId);
	var items = store.data.items;
	if (items.length == 0) {
		store.insert(0, new Desktop.model.Comment());
	}
}

function setDefultLiabilityRow(storeId) {
	var store = getGlobalStore(storeId);
	var items = store.data.items;
	if (items.length == 0) {
		store.insert(0, new Desktop.model.ExistingLiabilitiesModel());
	}
}

function setDefaultIns2Cad() {
	var store = getGlobalStore('gIns2CADStore');
	var items = store.data.items;

	if (items.length == 0) {
		var insOne = Ext.create('Desktop.model.Comment', {
			comments: 'Security and security documents to be as per approved PPG and Documents list'
		});
		var insTwo = Ext.create('Desktop.model.Comment', {
			comments: 'UDC & PDC tp be obtained as per Retail Loan PPG of Bangladesh Police'
		});
		var insThree = Ext.create('Desktop.model.Comment', {
			comments: 'Pay Order to be issued to take over loan of ......... based on total loan outstanding and the rest of the amount to be disbursed after getting NOC from the respective Bank'
		});

		store.insert(0, insOne);
		store.insert(1, insTwo);
		store.insert(2, insThree);
	}
}

function setDefaultSourceOfficerRecmnd() {
	var store = getGlobalStore('gSourceRecmndStore');
	var items = store.data.items;

	if (items.length == 0) {
		var insOne = Ext.create('Desktop.model.Comment', {
			comments: 'I do hereby certify that I have verified the information given above and do here by acknowledge and affirm ' +
				'that all the information given above are true and accurate.I do understand that I shall be held accountable and be ' +
				'responsible if there is any KYC related discrepancy ever found or discovered later with regard to this particular borrower.'
		});
		var insTwo = Ext.create('Desktop.model.Comment', {
			comments: 'Not meet the client.'
		});

		store.insert(0, insOne);
		store.insert(1, insTwo);
	}
}

function setDefaultBranchRecmnd() {
	var store = getGlobalStore('gBranchRecmndStore');
	var items = store.data.items;

	if (items.length == 0) {
		var insOne = Ext.create('Desktop.model.Comment', {
			comments: 'I am confirming that client(s) has been met by my team member (details in the left column)and all the ' +
				'required documentation for this loan/card application has been collected from the client(s).'
		});
		var insTwo = Ext.create('Desktop.model.Comment', {
			comments: 'I do hereby certify that I have verified the information given above and do hereby acknowledge and affirm ' +
				'that all the information given above are true and accurate. I do understand that I shall be held accountable and be ' +
				'responsible if there is any KYC related discrepancy ever found or discovered later with regard to this particular borrower.'
		});

		store.insert(0, insOne);
		store.insert(1, insTwo);
	}
}

function setCommentRowAtEnd(storeId) {
	var store = getGlobalStore(storeId);
	var items = store.data.items;
	store.insert(items.length, new Desktop.model.Comment());
}

function setLiabilityRowAtEnd(storeId) {
	var store = getGlobalStore(storeId);
	var items = store.data.items;
	store.insert(items.length, new Desktop.model.ExistingLiabilitiesModel());
}

function onSaveCommentModelGrid(cmp, grid, rowIndex, reference, commentType) {

	var data = grid.store.data.items[rowIndex].data;

	if (Ext.isEmpty(data.comments)) {
		Ext.Msg.alert('Error', 'Please do some Comment.')
		return;
	}

	var header = {
		reference: reference
	};

	if (!data.commentId) {
		var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;
		var payload = [{
			userModKey: loginUser.id,
			creatorId: loginUser.id,
			objectType: appContentType.CONTENT_TYPE_LOAN.toUpperCase(),
			commentType: commentType,
			refId: loanId,
			comments: data.comments,
			commentId: data.commentId
		}];
		me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_COMMENT, payload, header);
	} else {
		var payload = [{
			userModKey: loginUser.id,
			comments: data.comments,
			commentId: data.commentId
		}];
		me.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_COMMENT, payload, header);
	}
}

function setCommentIdInStore(storeId, commentId, rowIndex) {
	var store = getGlobalStore(storeId);
	var data = store.getAt(rowIndex).data;

	data.commentId = commentId;
	data.commentedBy = loginUser.unId;
	data.createdDate = new Date();
}

function isValidLiability(data) {

	if (!data.bankName || Ext.isEmpty(data.bankName)) return false;
	if (!data.product || Ext.isEmpty(data.product)) return false;

	// allow zero in numeric column

	/*if(!data.eMISize   || Ext.isEmpty(data.eMISize)){
		if(data.eMISize != 0) return false;
	}   
	if(!data.disbursed || Ext.isEmpty(data.disbursed)) return false;*/
	// if(!data.currentOutstanding || Ext.isEmpty(data.currentOutstanding)) return false;

	return true;
}

function isValidComment(comment) {
	comment = doTrim(comment);

	if (!comment) return false;
	if (Ext.isEmpty(comment)) return false;

	return true;
}

function setDefultRowOfAllGrid() {
	setDefultCommentRow('gCibStatusCommentStore');
	setDefultCommentRow('gAnalystCommentStore');
	setDefultCommentRow('gExceptionDetailStore');
	setDefultCommentRow('gCmntJustificationStore');
	setDefultCommentRow('gCmntWaiverSoughtStore');
	setDefultCommentRow('gSourceRecmndStore');
	setDefultCommentRow('gBranchRecmndStore');
	setDefultCommentRow('gIns2CADStore');

	setDefultLiabilityRow('gExistingLiabilitiesStore');
}

function setPluginWithoutListenerInAllField(arr) {
	for (var i = 0; i < arr.length; i++) {
		setPluginWithoutListener(arr[i]);
	}
}

function hideSaveActionColWithRefSaveOfAllGrid(arr) {
	for (var i = 0; i < arr.length; i++) {
		hideActionColumn(arr[i], 'saveReference');
	}
}

function hideFieldForBranchOffice(cmp) {

	cmp.lookupReference('proposeEMIDate').setHidden(true);
	cmp.lookupReference('security').setHidden(true);
	//cmp.lookupReference('takeOverLoan').setHidden(true);
	cmp.lookupReference('netMonthlyIncome').setHidden(true);
	cmp.lookupReference('disposableIncome').setHidden(true);
	cmp.lookupReference('duplications').setHidden(true);
	cmp.lookupReference('bankParticipation').setHidden(true);
	cmp.lookupReference('analystsComments').setHidden(true);
	cmp.lookupReference('exceptionDetailsField').setHidden(true);
	cmp.lookupReference('approvalFromHeadOffice').setHidden(true);
	cmp.lookupReference('instrucationsToCAD').setHidden(true);

	cmp.lookupReference('relationshipWithPg').setHidden(false);
}

function hideFieldForHeadOffice(cmp) {

	cmp.lookupReference('mobile').setHidden(false);
	cmp.lookupReference('emerPhone').setHidden(false);
	cmp.lookupReference('borrowerParticipation').setHidden(true);
	cmp.lookupReference('grossSalaryPerMonth').setHidden(true);
	cmp.lookupReference('remainingAmtAftEMI').setHidden(true);
	// cmp.lookupReference('documenttation').setHidden(true);
	cmp.lookupReference('commentsJustification').setHidden(true);
	cmp.lookupReference('recmdFrmBranch').setHidden(true);

	cmp.lookupReference('relationshipWithApplicant').setHidden(false);
}

function hideCibStatus(cmp) {
	cmp.lookupReference('cibStatus').setHidden(true);
	cmp.lookupReference('uploadCibStatusFileBtn').setHidden(true);
	cmp.lookupReference('viewCibStatus').setHidden(true);
	cmp.lookupReference('cibDetails').setHidden(true);

}
function showGpfAmount(cmp){
	cmp.lookupReference('gPFAmount').setHidden(false);
}
function writeGpfAmount(cmp){
	cmp.lookupReference('gPFAmount').setReadOnly(false);
}
function setColorGPF(cmp){
    cmp.lookupReference('gPFAmount').setFieldStyle('background: #7ABDFF');
}
function hideHouseOwner(cmp) {
	cmp.lookupReference('houseOwnership').setHidden(true);
}

function showSecurity(cmp) {
	cmp.lookupReference('security').setHidden(false);
}
function mandotaryForPersonal(cmp){
	cmp.lookupReference('nameOfGuarantor').setFieldLabel('Name Of the guarantor' + '<span class="req" style="color:red">*</span>');
	cmp.lookupReference('appliedLoanAmount').setFieldLabel('Asking Loan/Applied Amount' + '<span class="req" style="color:red">*</span>');
}

function manageLoanField(cmp, data) {
	//TODO: Manage Loand panel field as per user roles and loan state
	var stateName = data.stateName;
	console.log("managing laon field for state : " + stateName);

	if (userRoles.containsKey(appConstants.SOURCE_OFFICER)) {
		if (data.stateName == 'SO_CREATED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		} else if (data.stateName == 'SO_UPDATED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
			cmp.lookupReference('soRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'FO_SUBMITTED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		} else if (data.stateName == 'BM_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		} else if (data.stateName == 'BOM_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		} else if (data.stateName == 'PPC_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		} else if (data.stateName == 'MIS_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		} else if (data.stateName == 'APPROVED_RETURNED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		} else if (data.stateName == 'CA_SENT_QUERY' || data.stateName == 'SENT_QUERY_UPDATED') {
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		}
		if((userRoles.containsKey(appConstants.SOURCE_OFFICER))&&(data.stateName == 'APPROVED_RETURNED')|| 
			(userRoles.containsKey(appConstants.SOURCE_OFFICER))&&(data.stateName == 'CAD_RETURNED')){
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
			// cmp.lookupReference('soDeleteApplicationBtn').setHidden(false);
		}
		if (userRoles.containsKey(appConstants.SOURCE_OFFICER)&&(data.stateName == 'CAD_SENT_QUERY_TO_SO')||(data.stateName == 'SO_CAD_QUERY_UPDATED')){
			cmp.lookupReference('soUpdateApplicationBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.MIS)) {
		if (data.stateName == 'MIS_RECEIVED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
			cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'PEND_RECEIVED') {
			false
			cmp.lookupReference('btnMisRcv').setHidden(false);
		} else if (data.stateName == 'MIS_UPDATED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
			cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
			cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(true);
			cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
			cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'SENT_TO_CIB') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
			cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'CEO_RETURNED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'MD_RETURNED') {
			cmp.lookupReference('btnMisUpdt').setHidden(false);
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
		} else if ( data.stateName == 'MD_APPROVED' 
			|| data.stateName == 'CEO_APPROVED' || data.stateName == 'HOCRM_APPROVED' ) {
			cmp.lookupReference('btnMisSnd2Cad').setHidden(false);
		} else if ( data.stateName == 'RM_APPROVED' || data.stateName == 'UH_APPROVED' || data.stateName == 'HOCRM_APPROVED') {
			//cmp.lookupReference('btnMisSnd2Cad').setHidden(false);
		 	cmp.lookupReference('misReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'MIS_UPDATED') {
			cmp.lookupReference('btnMisSnd2Cib').setHidden(false);
		} else if (data.stateName == 'MIS_ALLOCATED') {
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'MIS_RE_ALLOCATED') {
			cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.BRANCH_MANAGER)) {
		if (data.stateName == 'SO_RECOMMENDED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'SO_RE_RECOMMENDED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)) {
		if (data.stateName == 'SO_RECOMMENDED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'SO_RE_RECOMMENDED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER)) {
		if (data.stateName == 'SO_RECOMMENDED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'SO_RE_RECOMMENDED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('bmBomPcRecommendbtn').setHidden(false);
			cmp.lookupReference('bmBomPcReturnBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.CEO)) {
		if (data.stateName == 'RM_RECOMMENDED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		} else if (data.stateName == 'UH_RECOMMENDED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		} else if (data.stateName == 'HOCRM_RECOMMENDED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('btnCeoApprv').setHidden(false);
			cmp.lookupReference('btnCeoCApprv').setHidden(false);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCeoDecline').setHidden(false);
			cmp.lookupReference('btnCeoDefer').setHidden(false);
		}
	}
	if(userRoles.containsKey(appConstants.MIS)){
		if(data.stateName == 'UH_RETURNED' || data.stateName == 'RM_RETURNED' 
		|| data.stateName == 'CA_RETURNED' || data.stateName == 'HOCRM_RETURNED'){
			cmp.lookupReference('btnCeoApprv').setHidden(true);
			cmp.lookupReference('btnCeoCApprv').setHidden(true);
			cmp.lookupReference('btnCeoDecline').setHidden(true);
			cmp.lookupReference('btnCeoDefer').setHidden(true);
			cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(true);

			cmp.lookupReference('btnMdApprv').setHidden(true);
			cmp.lookupReference('btnMdCApprv').setHidden(true);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(true);
			cmp.lookupReference('btnMdDefer').setHidden(true);
			cmp.lookupReference('btnMdDecline').setHidden(true);
		}
		if(data.stateName == 'UH_RECOMMENDED'){
			cmp.lookupReference('btnCeoApprv').setHidden(true);
            cmp.lookupReference('btnCeoCApprv').setHidden(true);
            cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(true);
            cmp.lookupReference('btnCeoDecline').setHidden(true);
            cmp.lookupReference('btnCeoDefer').setHidden(true);
		}
	}
	if (userRoles.containsKey(appConstants.MANAGING_DIRECTOR)) {
		if (data.stateName == 'RM_RECOMMENDED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		} else if (data.stateName == 'UH_RECOMMENDED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		} else if (data.stateName == 'HOCRM_RECOMMENDED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('btnMdApprv').setHidden(false);
			cmp.lookupReference('btnMdCApprv').setHidden(false);
			cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnMdDecline').setHidden(false);
			cmp.lookupReference('btnMdDefer').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.HO_CRM)) {
		if (data.stateName == 'UH_RECOMMENDED') {
			cmp.lookupReference('btnHoCrmApprv').setHidden(false);
			cmp.lookupReference('btnHoCrmCApprv').setHidden(false);
			cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnHoCrmDecline').setHidden(false);
			cmp.lookupReference('btnHoCrmDefer').setHidden(false);
			cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'RM_RECOMMENDED') {
			cmp.lookupReference('btnHoCrmApprv').setHidden(false);
			cmp.lookupReference('btnHoCrmCApprv').setHidden(false);
			cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnHoCrmDecline').setHidden(false);
			cmp.lookupReference('btnHoCrmDefer').setHidden(false);
			cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('btnHoCrmApprv').setHidden(false);
			cmp.lookupReference('btnHoCrmCApprv').setHidden(false);
			cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnHoCrmDecline').setHidden(false);
			cmp.lookupReference('btnHoCrmDefer').setHidden(false);
			cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('btnHoCrmApprv').setHidden(false);
			cmp.lookupReference('btnHoCrmCApprv').setHidden(false);
			cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnHoCrmDecline').setHidden(false);
			cmp.lookupReference('btnHoCrmDefer').setHidden(false);
			cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('btnHoCrmApprv').setHidden(false);
			cmp.lookupReference('btnHoCrmCApprv').setHidden(false);
			cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnHoCrmDecline').setHidden(false);
			cmp.lookupReference('btnHoCrmDefer').setHidden(false);
			cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('btnHoCrmApprv').setHidden(false);
			cmp.lookupReference('btnHoCrmCApprv').setHidden(false);
			cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnHoCrmDecline').setHidden(false);
			cmp.lookupReference('btnHoCrmDefer').setHidden(false);
			cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(false);
		} else if ((data.stateName == 'RM_APPROVED' || data.stateName == 'UH_APPROVED') 
			&& (typeof  data.loanGroupId !== "undefined" && data.loanGroupId !=null && data.loanGroupId !='')) {
			cmp.lookupReference('btnHoCrmSnd2Cad').setHidden(false);
		} 
	}
	if (userRoles.containsKey(appConstants.UNIT_HEAD)) {
		if (data.stateName == 'RM_RECOMMENDED') {
			cmp.lookupReference('btnUHApprv').setHidden(false);
			cmp.lookupReference('btnUHCApprv').setHidden(false);
			cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnUHDecline').setHidden(false);
			cmp.lookupReference('btnUHDefer').setHidden(false);
			cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'CA_RECOMMENDED') {
			cmp.lookupReference('btnUHApprv').setHidden(false);
			cmp.lookupReference('btnUHCApprv').setHidden(false);
			cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnUHDecline').setHidden(false);
			cmp.lookupReference('btnUHDefer').setHidden(false);
			cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('btnUHApprv').setHidden(false);
			cmp.lookupReference('btnUHCApprv').setHidden(false);
			cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnUHDecline').setHidden(false);
			cmp.lookupReference('btnUHDefer').setHidden(false);
			cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('btnUHApprv').setHidden(false);
			cmp.lookupReference('btnUHCApprv').setHidden(false);
			cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnUHDecline').setHidden(false);
			cmp.lookupReference('btnUHDefer').setHidden(false);
			cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('btnUHApprv').setHidden(false);
			cmp.lookupReference('btnUHCApprv').setHidden(false);
			cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnUHDecline').setHidden(false);
			cmp.lookupReference('btnUHDefer').setHidden(false);
			cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('btnUHApprv').setHidden(false);
			cmp.lookupReference('btnUHCApprv').setHidden(false);
			cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnUHDecline').setHidden(false);
			cmp.lookupReference('btnUHDefer').setHidden(false);
			cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.RISK_MANAGER)) {
		if (data.stateName == 'CA_RECOMMENDED') {
			cmp.lookupReference('btnRMApprv').setHidden(false);
			cmp.lookupReference('btnRMCApprv').setHidden(false);
			cmp.lookupReference('rmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnRMDecline').setHidden(false);
			cmp.lookupReference('btnRMDefer').setHidden(false);
			cmp.lookupReference('rmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('btnRMApprv').setHidden(false);
			cmp.lookupReference('btnRMCApprv').setHidden(false);
			cmp.lookupReference('rmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnRMDecline').setHidden(false);
			cmp.lookupReference('btnRMDefer').setHidden(false);
			cmp.lookupReference('rmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('btnRMApprv').setHidden(true);
			cmp.lookupReference('btnRMCApprv').setHidden(true);
			cmp.lookupReference('rmReturnGroupMenuBtn').setHidden(true);
			cmp.lookupReference('btnRMDecline').setHidden(true);
			cmp.lookupReference('btnRMDefer').setHidden(true);
			cmp.lookupReference('rmRecommendGroupMenuBtn').setHidden(true);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('btnRMApprv').setHidden(false);
			cmp.lookupReference('btnRMCApprv').setHidden(false);
			cmp.lookupReference('rmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnRMDecline').setHidden(false);
			cmp.lookupReference('btnRMDefer').setHidden(false);
			cmp.lookupReference('rmRecommendGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('btnRMApprv').setHidden(false);
			cmp.lookupReference('btnRMCApprv').setHidden(false);
			cmp.lookupReference('rmReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnRMDecline').setHidden(false);
			cmp.lookupReference('btnRMDefer').setHidden(false);
			cmp.lookupReference('rmRecommendGroupMenuBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.CREDIT_ANALYST)) {
		if (data.stateName == 'MIS_ALLOCATED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} 
		else if (data.stateName == 'PEND_RECEIVED') {
			cmp.lookupReference('creditAnalystPendReceiveBtn').setHidden(false);
		}
		else if (data.stateName == 'CA_RECEIVED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('caRecommendGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
		}
		else if (data.stateName == 'CA_UPDATED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('caRecommendGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
		}
		else if (data.stateName == 'MIS_RE_ALLOCATED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('caRecommendGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
		} 
		else if (data.stateName == 'SENT_QUERY_UPDATED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(true);
			cmp.lookupReference('caRecommendGroupMenuBtn').setHidden(true);
			cmp.lookupReference('btnSendQuery').setHidden(true);
		}
		else if (data.stateName == 'CA_SENT_QUERY') {
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
		} else if (data.stateName == 'RM_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
		} else if (data.stateName == 'CA_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'UH_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
		} else if (data.stateName == 'HOCRM_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
		} else if (data.stateName == 'CEO_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'BOM_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'BM_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'MIS_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
			cmp.lookupReference('btnCaSnd2Cib').setHidden(false);
		} else if (data.stateName == 'PPC_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'MD_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'SO_RETURNED') {
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(false);
		} else if (data.stateName == 'RM_C_APPROVED') {
			cmp.lookupReference('btnConditionFulfil').setHidden(false);
		} else if (data.stateName == 'UH_C_APPROVED') {
			cmp.lookupReference('btnConditionFulfil').setHidden(false);
		} else if (data.stateName == 'CEO_C_APPROVED') {
			cmp.lookupReference('btnConditionFulfil').setHidden(false);
		} else if (data.stateName == 'MD_C_APPROVED') {
			cmp.lookupReference('btnConditionFulfil').setHidden(false);
		} else if (data.stateName == 'HOCRM_C_APPROVED') {
			cmp.lookupReference('btnConditionFulfil').setHidden(false);
		} else if(data.stateName == 'UH_DECLINED'||data.stateName == 'RM_DECLINED'||data.stateName == 'HOCRM_DECLINED'
			||data.stateName == 'CEO_DECLINED'||data.stateName == 'MD_DECLINED'){
			cmp.lookupReference('btnSendQuery').setHidden(false);
			cmp.lookupReference('caRecommendGroupMenuBtn').setHidden(false);
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('caDeleteApplicationBtn').setHidden(false);
		}
		if (userRoles.containsKey(appConstants.CREDIT_ANALYST)&& data.stateName == 'SENT_TO_CIB') {
			cmp.lookupReference('caReturnGroupMenuBtn').setHidden(true);
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);			
		} 
		if(userRoles.containsKey(appConstants.CREDIT_ANALYST)&&(data.inGroup  == 2 ) && data.stateName!='SENT_QUERY_UPDATED' && data.stateName!='PEND_RECEIVED' && data.stateName!='CA_RECEIVED'){
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
			cmp.lookupReference('btnSendQuery').setHidden(false);
		}
		if (userRoles.containsKey(appConstants.CREDIT_ANALYST)&&(data.stateName == 'CAD_SENT_QUERY_TO_CA')
			||(data.stateName == 'CA_CAD_QUERY_UPDATED')){
			cmp.lookupReference('creditAnalystUpdtBtn').setHidden(false);
		}
	}
	if (userRoles.containsKey(appConstants.FIELD_OFFICER)) {
		if (data.stateName == 'FO_CREATED') {
			cmp.lookupReference('deleteApplicationBtn').setHidden(false);
			cmp.lookupReference('updateApplicationBtn').setHidden(false);
			cmp.lookupReference('submitApplicationBtn').setHidden(false);
		} else if (data.stateName == 'FO_UPDATED') {
			cmp.lookupReference('deleteApplicationBtn').setHidden(false);
			cmp.lookupReference('updateApplicationBtn').setHidden(false);
			cmp.lookupReference('submitApplicationBtn').setHidden(false);
		}
	}
	if(userRoles.containsKey(appConstants.MANAGING_DIRECTOR) || userRoles.containsKey(appConstants.CEO)
	     || userRoles.containsKey(appConstants.CAD) || userRoles.containsKey(appConstants.HO_CRM)
	     || userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.RISK_MANAGER)	
	     || userRoles.containsKey(appConstants.CREDIT_ANALYST)|| userRoles.containsKey(appConstants.CIB)){
		if(data.stateName == 'RM_APPROVED' || data.stateName == 'RM_C_APPROVED' ||data.stateName == 'UH_C_APPROVED' 
		   ||data.stateName == 'HOCRM_APPROVED' ||data.stateName == 'HOCRM_C_APPROVED' ||data.stateName == 'CEO_APPROVED' 
		   ||data.stateName == 'CEO_C_APPROVED' ||data.stateName == 'MD_APPROVED' ||data.stateName == 'MD_C_APPROVED' 
		   ||data.stateName == 'APPROVED' ||data.stateName ==  'UH_APPROVED'){
			cmp.lookupReference('uploadCibStatusFileBtn').setHidden(true);
			cmp.lookupReference('cibStatus').setReadOnly(true);  
			cmp.lookupReference('cibStatus').setHidden(false); 	
			cmp.lookupReference('viewCibStatus').setHidden(false);
			cmp.lookupReference('cibDetails').setDisabled(true);
		}else{
			cmp.lookupReference('cibStatus').setHidden(false);
			cmp.lookupReference('uploadCibStatusFileBtn').setHidden(false);   
			cmp.lookupReference('viewCibStatus').setHidden(false);
			cmp.lookupReference('cibDetails').setDisabled(false);
		}
			/*
			returning from CAD is stopped
			if(userRoles.containsKey(appConstants.CAD) && stateName == 'SENT_TO_CAD'){
				cmp.lookupReference('cadReturnGroupMenuBtn').setHidden(false);
			}	
			*/
	}
	if (userRoles.containsKey(appConstants.CAD)&& data.stateName == 'SENT_TO_CAD') {
		cmp.lookupReference('cadSendQuery2So').setHidden(false);
		cmp.lookupReference('cadSendQuery2Ca').setHidden(false);		
	}
	if (userRoles.containsKey(appConstants.CAD)&& data.stateName == 'SL_GENERATED') {
		cmp.lookupReference('cadReturnGroupMenuBtn').setHidden(false);
		cmp.lookupReference('cadDisbursed').setHidden(false);		
	}
	
}

function manageLoanFieldForNewLoan(cmp) {
	//TODO: Manage Loand panel field as per user roles, do not use loan state here

	if (userRoles.containsKey(appConstants.SOURCE_OFFICER)) {
		cmp.lookupReference('soSaveApplicationBtn').setHidden(false);
	}
	if (userRoles.containsKey(appConstants.MIS)) {}
	if (userRoles.containsKey(appConstants.UNIT_HEAD)) {}
	if (userRoles.containsKey(appConstants.BRANCH_MANAGER)) {}
}

function handleAfterSaveComment(data, cmp, storeId, gridRef) {
	if (data.commentId && data.rowIndex != null && data.rowIndex !== undefined) {
		setCommentIdInStore(storeId, data.commentId, data.rowIndex);
	}
	Ext.toast('Successfully Saved.');
	cmp.lookupReference(gridRef).getView().refresh();
}

function loadCreateNewLoanTree(data, newLoanTree) {
	var newLoanTreeChild = newLoanTree.down('#newLoanTreeChildPanel');
	if (newLoanTreeChild) {
		newLoanTree.remove(newLoanTreeChild);
	}

	var tree = [];

	for (var i = 0; i < data.length; i++) {
		var child = {
			"text": data[i].data.value1,
			"leaf": true,
            "loanPrefix": data[i].data.value3,
			"configurationId": data[i].data.configurationId
		};
		tree.push(child);
	}

	// CREATE SUB TREE AND ADD TO TREE PANEL
	var treePanel = Ext.create('Ext.tree.Panel', {
		itemId: 'newLoanTreeChildPanel',
		rootVisible: false,
		useArrows: true,
		border: true,
		containerScroll: false,
		defaultTools: false,
		lines: true,
		leaf: false,
		autoScroll: true,
		allowDrop: false,
		draggable: false,
		layout: 'fit',
		listeners: {
			itemdblclick: 'onNewLoanTreeChildDblClick'
		},
		viewConfig: {
			draggable: false
		},
		bodyStyle: {
			"background-color": "#ffffff"
		},
		style: 'margin:5px 5px 5px 5px',
		store: Ext.create('Ext.data.TreeStore', {
			root: {
				text: 'Root',
				expanded: true,
				children: tree
			}
		})
	});

	newLoanTree.insert(0, treePanel);
}

function expandAllFieldSetInLoanWin(cmp, arr) {
	for (var i = 0; i < arr.length; i++) {
		cmp.lookupReference(arr[i]).setExpanded(true);
	}
}

function getPdfPanel(title, itemId, cmpName, cmpItemId, cmpId, serverUrl) {
	var pdfPanel = Ext.create('Ext.window.Window', {
		height: 550,
		width: 1130,
		layout: 'fit',
		itemId: itemId,
		reference: itemId,
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		autoScroll: true,
		title: title,
		modal: true,
		listeners: {
			close: function (cmp, eOpts) {
				if(title=='Sanction Letter'){

				}
			}
		},
		items: [{
			xtype: "component",
			name: cmpName,
			itemId: cmpItemId,
			id: cmpId,
			width: 940,
			height: 540,
			modal: true,
			autoEl: {
				tag: 'iframe',
				style: 'overflow:auto;width:100%;height:540px;',
				src: serverUrl
			},
			listeners: {
				load: {
					element: 'el',
					fn: function () {
						this.parent().unmask();
					}
				},
				render: function () {}
			}
		}]
	});

	return pdfPanel;
}
function getNidImagePanel(title, itemId, cmpName, cmpItemId, cmpId, serverUrl) {
	var pdfPanel = Ext.create('Ext.window.Window', {
		height: 500,
		width: 800,
		layout: 'fit',
		itemId: itemId,
		reference: itemId,
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		autoScroll: true,
		title: title,
		modal: true,
		alwaysOnTop: true,
		listeners: {
			close: function (cmp, eOpts) {
				if(title=='Sanction Letter'){

				}
			}
		},
		items: [{
			xtype: "component",
			name: cmpName,
			itemId: cmpItemId,
			id: cmpId,
			width: 940,
			height: 540,
			modal: true,
			autoEl: {
				tag: 'iframe',
				style: 'overflow:auto;width:100%;height:540px;',
				src: serverUrl
			},
			listeners: {
				load: {
					element: 'el',
					fn: function () {
						this.parent().unmask();
					}
				},
				render: function () {}
			}
		}]
	});

	return pdfPanel;
}
function getSanctionPdfPanel(me,title, itemId, cmpName, cmpItemId, cmpId, serverUrl) {

	var pdfPanel = Ext.create('Ext.window.Window', {
		height: 550,
		width: 1130,
		layout: 'fit',
		itemId: itemId,
		reference: itemId,
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		autoScroll: true,
		title: title,
		modal: true,
		listeners: {
			close: function (cmp, eOpts) {
				var searchData = JSON.parse(localStorage.getItem('loanSearchParam'));
				var accountNo = searchData.accountNo4Src;
				var bpNoSrc = searchData.bpNo;
				var nid4Search = searchData.nid4Src;
				var phone4Search = searchData.phone4Src;
				var applicationNo = searchData.applicationNo;
				var loanTrackingId = searchData.loanTrackingId;
				var dataSourceCombo = searchData.dataSource;
				var lastActionDateWiseSearch = searchData.lastActionDateWiseSearch;
				var fromDate = searchData.fromDate4Src;
				var toDate = searchData.toDate4Src;
				var actionType = searchData.actionType;
				me.searchLoan(accountNo,bpNoSrc,nid4Search,phone4Search,applicationNo,loanTrackingId,dataSourceCombo,lastActionDateWiseSearch,fromDate,toDate,actionType);	

			}
		},
		items: [{
			xtype: "component",
			name: cmpName,
			itemId: cmpItemId,
			id: cmpId,
			width: 940,
			height: 540,
			modal: true,
			autoEl: {
				tag: 'iframe',
				style: 'overflow:auto;width:100%;height:540px;',
				src: serverUrl
			},
			listeners: {
				load: {
					element: 'el',
					fn: function () {
						this.parent().unmask();
					}
				},
				render: function () {}
			}
		}]
	});

	return pdfPanel;
}


function shouldCalcInstmtOnAppliedAmount(loanDetailsPanel) {
	//TODO:fix which state should allow to use applied load to calculate installemnt
	console.log('TODO:fix which state should allow to use applied load to calculate installemnt');
	var stateName = loanDetailsPanel.lookupReference('loanStateName').value;
	if (!stateName || hasRole('SOURCE_OFFICER')) return true;

	return false;

}

// check if this loan still in branch mode
function isBranchMode(loanDetailsPanel) {
	console.log('TODO:fix which state is branch mode');
	var stateName = loanDetailsPanel.lookupReference('loanStateName').value;
	if ((stateName == 'PEND_NEW') && hasRole('SOURCE_OFFICER')) return true;
	return false;

}

function getInstallmentCaclAmount(loanDetailsPanel) {
	var should = shouldCalcInstmtOnAppliedAmount(loanDetailsPanel);
	var recommendedForApproval = loanDetailsPanel.lookupReference('recommendedForApproval').value;
	var appliedLoanAmount = loanDetailsPanel.lookupReference('appliedLoanAmount').value;

	appliedLoanAmount = appliedLoanAmount < 0 ? 0 : appliedLoanAmount
	recommendedForApproval = recommendedForApproval < 0 ? 0 : recommendedForApproval

	var appropriateAmount = should ? appliedLoanAmount : recommendedForApproval;
	if(!appropriateAmount){
 		console.log("getInstallmentCaclAmount not found amount. getting non null value");
 		if(appliedLoanAmount > 0){
 			appropriateAmount = appliedLoanAmount
 		}
 		else{
 			appropriateAmount = recommendedForApproval
 		}
 	}
	return appropriateAmount;
}


function getPriceQuatationAmount(validAmount) {
	return Math.ceil(validAmount / 0.3);
}

function loadLoanStatusTree(data, loanStatusTree) {

	var loanStatusTreeChild = loanStatusTree.down('#loanStatusTreeChildPanel');
	if (loanStatusTreeChild) {
		loanStatusTree.remove(loanStatusTreeChild);
	}

	var newSubTreeForAll = {
		"text": 'ALL(0)',
		"reference": 'ALL',
		"expanded": false,
		"children": []
	};

	var tree = [];
	var statusLoanMap = {};

	for (var i = 0; i < data.length; i++) {

		var child = {
			"text": getLoanStatusChildText(data[i]),
			"leaf": true,
			"loanId": data[i].loanId
		};
		newSubTreeForAll.children.push(child);

		var arr = [];
		if (statusLoanMap[data[i].folderName]) {
			arr = statusLoanMap[data[i].folderName];
		}
		arr.push(child);
		statusLoanMap[data[i].folderName] = arr;
	}

	newSubTreeForAll.text = "ALL(" + newSubTreeForAll.children.length + ")";
	tree.push(newSubTreeForAll);

	for (var key in statusLoanMap) {
		var newSubTree = {
			"text": key + '(' + statusLoanMap[key].length + ')',
			"reference": 'STATE_NAME :' + key,
			"expanded": false,
			"children": statusLoanMap[key]
		};
		tree.push(newSubTree);
	}

	// CREATE SUB TREE AND ADD TO TREE PANEL
	var treePanel = Ext.create('Ext.tree.Panel', {
		itemId: 'loanStatusTreeChildPanel',
		rootVisible: false,
		useArrows: true,
		border: true,
		containerScroll: false,
		defaultTools: false,
		lines: true,
		leaf: false,
		autoScroll: true,
		allowDrop: false,
		draggable: false,
		layout: 'fit',

		selModel: {
            //selType: 'checkboxmodel',
            mode: 'SIMPLE'
        },
		listeners: {
			itemdblclick: 'onLoanStatusTreeDblClick',
			itemclick: 'onLoanStatusTreeChildClick'
		},
		viewConfig: {
			draggable: false
		},
		bodyStyle: {
			"background-color": "#ffffff"
		},
		style: 'margin:5px 5px 5px 5px',
		store: Ext.create('Ext.data.TreeStore', {
			root: {
				text: 'Root',
				expanded: true,
				children: tree
			}
		})
	});

	//treePanel.store.sort('text', 'ASC');
	loanStatusTree.insert(0, treePanel);
}

function getLoanStatusChildText(data) {
	return data.applicationNo ? data.applicationNo + '-' + data.customerName : data.customerName;
}

// use this function to ignore change effect on load loan window
function isLoadingLoanWindow(cmp) {
	if (cmp.lookupReference('isLoading').value == 'true') return true;
	return false;
}


function getRecomndAndReturnMenu(data, onGroupClick, onUserClick) {

	var userList = data.roleUserList;

	var items = [];
	for (var i = 0; i < userList.length; i++) {
		var user = {
			text: userList[i].loginName,
			userId: userList[i].userId,
			userVer: userList[i].userVer,
			firstName: userList[i].firstName,
			lastName: userList[i].lastName,
			loginName: userList[i].loginName,
			userAlias: userList[i].userAlias,
			legalEntityKey: userList[i].legalEntityKey,
			primaryGroupId: userList[i].primaryGroupId,
			userModKey: userList[i].userModKey,
			roleId: data.roleId,
			handler: onUserClick
		}
		items.push(user);
	}

	var subMenu = Ext.create('Ext.menu.Menu', {
		items: items
	});

	var fullMenu = {
		text: data.roleName,
		roleId: data.roleId,
		roleVer: data.roleVer,
		roleName: data.roleName,
		handler: onGroupClick
	}

	if (items.length > 0) {
		fullMenu["menu"] = subMenu;
	}

	return fullMenu;
}

function recommentSetValue(newRecomment, cmp, commentType, actionType) {
	newRecomment.lookupReference('loginUser').setValue(cmp.loginUser);
	newRecomment.lookupReference('userId').setValue(cmp.userId);
	newRecomment.lookupReference('firstName').setValue(cmp.firstName);
	newRecomment.lookupReference('lastName').setValue(cmp.lastName);
	newRecomment.lookupReference('loginName').setValue(cmp.loginName);
	newRecomment.lookupReference('legalEntityKey').setValue(cmp.legalEntityKey);
	newRecomment.lookupReference('primaryGroupId').setValue(cmp.primaryGroupId);
	newRecomment.lookupReference('userModKey').setValue(cmp.userModKey);
	newRecomment.lookupReference('roleName').setValue(cmp.roleName);
	newRecomment.lookupReference('roleId').setValue(cmp.roleId);

	newRecomment.lookupReference('commentType').setValue(commentType);
	newRecomment.lookupReference('actionType').setValue(actionType);
	newRecomment.lookupReference('uiActionName').setValue(actionType);

	var loanDetailsPanel = cmp.up('#LoanDetails');
	var loanId = loanDetailsPanel.lookupReference('keepHiddenloanIdKey').value;
	var loanStateName = loanDetailsPanel.lookupReference('loanStateName').value;
	var loanStateId = loanDetailsPanel.lookupReference('loanStateId').value;

	newRecomment.lookupReference('loanId').setValue(loanId);
	newRecomment.lookupReference('stateName').setValue(loanStateName);
	newRecomment.lookupReference('stateId').setValue(loanStateId);

	newRecomment.lookupReference('loanDetailsPanel').setValue(loanDetailsPanel);
}

function recommentSetValueOnBtnClick(newRecomment, cmp, commentType, actionType) {
	newRecomment.lookupReference('commentType').setValue(commentType);
	newRecomment.lookupReference('actionType').setValue(actionType);
	newRecomment.lookupReference('uiActionName').setValue(actionType);

	var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;
	var loanStateName = cmp.lookupReference('loanStateName').value;
	var loanStateId = cmp.lookupReference('loanStateId').value;

	var loanRawData = cmp.lookupReference('hiddenLoanRawData').value;

	newRecomment.lookupReference('loanId').setValue(loanId);
	newRecomment.lookupReference('stateName').setValue(loanStateName);
	newRecomment.lookupReference('stateId').setValue(loanStateId);
	newRecomment.lookupReference('roleId').setValue(loanRawData.recommendGroupId);
}

function setLoanObjForFOView(cmp, data) {
	cmp.lookupReference('keepHiddenloanIdKey').setValue(data.loanId);
	cmp.lookupReference('loanType').setValue(data.idLoanTypeKey);
	cmp.lookupReference('appliedLoanAmount').setValue(data.appliedLoanAmount);
	cmp.lookupReference('tenorYear').setValue(data.tenorYear);
	cmp.lookupReference('nameOfGuarantor').setValue(data.nameOfGuarantor);
	cmp.lookupReference('mobileOfGuarantor').setValue(data.mobileOfGuarantor);
	cmp.lookupReference('nidOfGuarantorRef').setValue(data.guarantorNid);
	cmp.lookupReference('dobOfPg').setValue(data.dobOfPg ? new Date(data.dobOfPg.substr(0, 10)) : null);
	cmp.lookupReference('dobOfPgYear').setValue(data.dobOfPgYear);
	cmp.lookupReference('verificationEmail').setValue(data.verificationEmail);
	cmp.lookupReference('guarantorNid').setValue(data.guarantorNid);

	cmp.lookupReference('sourcingBranch').setValue(data.sourcingBrc);
	cmp.lookupReference('staffId').setValue(data.staffId);

    if (data.appliedLoanAmount == -2147483648) {
    	cmp.lookupReference('appliedLoanAmount').setValue(null);
    }
    if(data.dobOfPgYear=='NaNy, NaNm'||data.dobOfPgYear=='TEST YEAR'){
		cmp.lookupReference('dobOfPgYear').setValue(null);
	}
}

function setCustomerObjForFOView(cmp, data) {

	cmp.lookupReference('keepHiddenCustomerIdKey').setValue(data.customerIdKey);
	cmp.lookupReference('keepHiddenCustomerId').setValue(data.customerId);

	cmp.lookupReference('bpNo').setValue(data.bpNo);
	cmp.lookupReference('acNo').setValue(data.accountNo.split(',')[0]);
	cmp.lookupReference('nameOfBorrower').setValue(data.customerName);
	cmp.lookupReference('mobile').setValue(data.mobile);
	cmp.lookupReference('alternativeMobile').setValue(data.emerPhone);
	cmp.lookupReference('tin').setValue(data.tin);
	cmp.lookupReference('nid').setValue(data.nid);
	cmp.lookupReference('officeId').setValue(data.officeId);
}

function setDocObjForFOView(cmp, data) {

	var store = getGlobalStore('gLoanDocumentStore');
	store.clearData();
	store.loadData(data);

	fixLayoutForViewBtnWithTextField(cmp, store, appConstants.DOC_TYPE_OFFICE_ID_CARD, 'officeCardUploadedYes', 
		'officeCardUploadedNo', 'uploadIdCard', 'viewIdCardFile', 'officeId');

	fixLayoutForViewBtnWithTextField(cmp, store, appConstants.DOC_TYPE_NID_CARD, 'nidCardUploadedYes', 
		'nidCardUploadedNo', 'uploadNIdCard', 'viewNidFile', 'nid');

	fixLayoutForViewBtnWithTextField(cmp, store, appConstants.DOC_TYPE_TIN, 'tinCardUploadedYes', 
		'tinCardUploadedNo', 'uploadTINFO', 'viewTinFile', 'tin');
	fixLayoutForViewBtnWithTextField(cmp, store, appConstants.GUARANTOR_NID, 'yesNidOfGuarantorRef', 
		'noNidOfGuarantorRef', 'nidOfGuarantorRef', 'viewNidOfGuarantorRef', 'guarantorNid');

	fixLayoutForViewBtn(cmp, store, appConstants.DOC_TYPE_SALARY_CERTIFICATE, 'salaryCertificateUploadedYes', 
		'salaryCertificateUploadedNo', 'uploadsalaryCertificateBtn', 'viewSalaryCertificateFile');

	// fixLayoutForViewBtn(cmp, store, appConstants.GUARANTOR_NID, 'yesNidOfGuarantorRef', 
 //        'noNidOfGuarantorRef', 'nidOfGuarantorRef', 'viewNidOfGuarantorRef');

	fixLayoutForViewBtn(cmp, store, appConstants.SIGNATURE, 'yesSignaturePhotoRef', 
		'noSignaturePhotoRef', 'signaturePhoto', 'viewSignaturePhoto');

	fixLayoutForViewBtn(cmp, store, appConstants.ADDITIONAL_DOC_1, 'additionalDocumentYesRadio', 
		'additionalDocument1NoRadio', 'additionalDocument1Filefield', 'additionalDocument1ViewBtn');

	fixLayoutForViewBtn(cmp, store, appConstants.ADDITIONAL_DOC_2, 'additionalDocument2YesRadio', 
		'additionalDocument2NoRadio', 'additionalDocument2Filefield', 'additionalDocument2ViewBtn');

	fixLayoutForViewBtn(cmp, store, appConstants.ADDITIONAL_DOC_3, 'additionalDocument3YesRadio', 
		'additionalDocument3NoRadio', 'additionalDocument3Filefield', 'additionalDocument3ViewBtn');

	store.clearData();
}

function fixLayoutForViewBtn(cmp, store, docType, yesRef, noRef, fileFieldRef, viewBtnRef){
	var rec = store.findRecord('docType', docType);
	if (rec) {
		if (rec.data.uploadStatus == 1) cmp.lookupReference(yesRef).setValue(true);
		else cmp.lookupReference(noRef).setValue(true);

		if (rec.data.filePresent) {
			cmp.lookupReference(fileFieldRef).columnWidth = .9;
			cmp.lookupReference(viewBtnRef).setHidden(false);
		}
	}
}
function fixLayoutForViewBtnWithTextField(cmp, store, docType, yesRef, noRef, fileFieldRef, viewBtnRef, textFieldRef){
	var rec = store.findRecord('docType', docType);
	if (rec) {
		if (rec.data.uploadStatus == 1) cmp.lookupReference(yesRef).setValue(true);
		else cmp.lookupReference(noRef).setValue(true);

		if (rec.data.filePresent) {
			cmp.lookupReference(fileFieldRef).columnWidth = .2;
			cmp.lookupReference(textFieldRef).columnWidth = .7;
			cmp.lookupReference(viewBtnRef).setHidden(false);
		}
	}
}

function getLoanObjForFOView(cmp) {

	var loanId = cmp.lookupReference('keepHiddenloanIdKey').value;

	var idLoanTypeKey = cmp.lookupReference('loanType').value;
	var appliedLoanAmount = cmp.lookupReference('appliedLoanAmount').value;
	var tenorYear = cmp.lookupReference('tenorYear').value;
	var nameOfGuarantor = cmp.lookupReference('nameOfGuarantor').value;
	var guarantorNid = cmp.lookupReference('guarantorNid').value;
	var mobileOfGuarantor = cmp.lookupReference('mobileOfGuarantor').value;	
	var dobOfPg = Ext.Date.format(cmp.lookupReference('dobOfPg').value, 'Ymd');
	var dobOfPgYear = cmp.lookupReference('dobOfPgYear').value;
	var verificationEmail = cmp.lookupReference('verificationEmail').value;
	    verificationEmail = verificationEmail.trim();

	var sourcingBrc = cmp.lookupReference('sourcingBranch').value;
	var staffId = cmp.lookupReference('staffId').value;

	var loanStateName = cmp.lookupReference('loanStateName').value;
	var loanStateId = cmp.lookupReference('loanStateId').value;

	var accountNo4Src = cmp.lookupReference('acNo').value;

	if (!loanStateName) {
		loanStateName = null;
	}
	if (!loanStateName) {
		loanStateName = null;
	}
	if(dobOfPgYear==null||dobOfPgYear==""||dobOfPgYear=="NaNy, NaNm"){
		dobOfPgYear="TEST YEAR";
	}
	if(dobOfPg==null||dobOfPg==""||dobOfPg=="NaNy, NaNm"){
		dobOfPg="19700101";
	}
	var loan = {
		loanId: loanId ? loanId : null,
		idLoanTypeKey: idLoanTypeKey ? idLoanTypeKey : null,
		appliedLoanAmount: appliedLoanAmount ? appliedLoanAmount : null,
		tenorYear: tenorYear ? tenorYear : null,
		nameOfGuarantor: nameOfGuarantor ? nameOfGuarantor : null,
		guarantorNid: guarantorNid ? guarantorNid : null,
		mobileOfGuarantor: mobileOfGuarantor ? mobileOfGuarantor : null,		
		dobOfPg: dobOfPg ? dobOfPg : null,
		dobOfPgYear: dobOfPgYear ? dobOfPgYear : null,
		verificationEmail: verificationEmail ? verificationEmail : null,
		stateId: loanStateId ? loanStateId : null,
		stateName: loanStateName ? loanStateName : null,
		dataSource: appConstants.DATA_SOURCE_WEB,
		userModKey: loginUser.id,
		idLegalEntityKey: loginUser.legalEntityTypeId,
		sourcingBrc: sourcingBrc ? sourcingBrc : null,
		staffId: staffId ? staffId : null,
		accountNo4Src: accountNo4Src ? accountNo4Src : null,
	}

	return loan;
}

function getCustomerObjForFOView(cmp) {

	var bpNo = cmp.lookupReference('bpNo').value;
	var customerName = cmp.lookupReference('nameOfBorrower').value;
	var mobile = cmp.lookupReference('mobile').value;
	var alternativeMobile = cmp.lookupReference('alternativeMobile').value;
	var customerIdKey = cmp.lookupReference('keepHiddenCustomerIdKey').value;
	var customerId = cmp.lookupReference('keepHiddenCustomerId').value;
	var tin = cmp.lookupReference('tin').value;
	var nid = cmp.lookupReference('nid').value;
	var officeId = cmp.lookupReference('officeId').value;

	var custmer = {
		customerIdKey: customerIdKey ? customerIdKey : null,
		customerId: customerId ? customerId : null,
		bpNo: bpNo ? bpNo : null,
		customerName: customerName ? customerName : null,
		mobile: mobile ? mobile : null,
		emerPhone: alternativeMobile ? alternativeMobile : null,
		tin: tin ? tin : "",
		nid: nid ? nid : null,
		officeId: officeId ? officeId : null,
		userModKey: loginUser.id,
	};

	return custmer;
}

function getLoanDocumentListForFOView(cmp) {
	
	var appliedLoanAmount = cmp.lookupReference('appliedLoanAmount').value;
	
	var arr = [];
	var obj1 = {
		docType: appConstants.DOC_TYPE_OFFICE_ID_CARD,
		docName: cmp.lookupReference('uploadIdCard').value,
		isMandatory: 1,
		uploadStatus: 1
	};
	var obj2 = {
		docType: appConstants.DOC_TYPE_NID_CARD,
		docName: cmp.lookupReference('uploadNIdCard').value,
		isMandatory: 1,
		uploadStatus: 1
	};
	var obj3 = {
		docType: appConstants.DOC_TYPE_TIN,
		docName: cmp.lookupReference('uploadTINFO').value,
		isMandatory: 1,
		uploadStatus: 1
	};
	var obj4 = {
		docType: appConstants.DOC_TYPE_SALARY_CERTIFICATE,
		docName: cmp.lookupReference('uploadsalaryCertificateBtn').value,
		isMandatory: 0,
		uploadStatus: 1
	};

	var obj5 = {
		docType: appConstants.ADDITIONAL_DOC_1,
		docName: cmp.lookupReference('additionalDocument1Filefield').value,
		isMandatory: 0,
		uploadStatus: 1
	};
	var obj6 = {
		docType: appConstants.ADDITIONAL_DOC_2,
		docName: cmp.lookupReference('additionalDocument2Filefield').value,
		isMandatory: 0,
		uploadStatus: 1
	};
	var obj7 = {
		docType: appConstants.ADDITIONAL_DOC_3,
		docName: cmp.lookupReference('additionalDocument3Filefield').value,
		isMandatory: 0,
		uploadStatus: 1
	};
	var obj8 = {
		docType: appConstants.GUARANTOR_NID,
		docName: cmp.lookupReference('nidOfGuarantorRef').value,
		isMandatory: cmp.lookupReference('loanType').rawValue === 'PERSONAL LOAN' ? 1 : 0,
		uploadStatus: 1
	};
	var obj9 = {
		docType: appConstants.SIGNATURE,
		docName: cmp.lookupReference('signaturePhoto').value,
		isMandatory: 0,
		uploadStatus: 1
	};

	if(obj1.docName) arr.push(obj1);
	if(obj2.docName) arr.push(obj2);
	if(obj3.docName && appliedLoanAmount >= 500000) arr.push(obj3);
	if(obj4.docName) arr.push(obj4);
	if(obj5.docName) arr.push(obj5);
	if(obj6.docName) arr.push(obj6);
	if(obj7.docName) arr.push(obj7);
	if(obj8.docName) arr.push(obj8);
	if(obj9.docName) arr.push(obj9);
	return arr;
}

function isMandatoryFieldFilledOfficer(cmp) {

	var bpNo = cmp.lookupReference('bpNo').value;
	var acNo = cmp.lookupReference('acNo').value;
	var customerName = cmp.lookupReference('nameOfBorrower').value;
	var mobile = cmp.lookupReference('mobile').value;
	var alternativeMobile = cmp.lookupReference('alternativeMobile').value;
	var loanPrefix = cmp.lookupReference('hiddenLoanPrefix').value;
	var uploadIdCard = cmp.lookupReference('uploadIdCard').value;
	var nid = cmp.lookupReference('nid').value;
	var uploadNIdCard = cmp.lookupReference('uploadNIdCard').value;
	var idLoanTypeKey = cmp.lookupReference('loanType').value;
	var appliedLoanAmount = cmp.lookupReference('appliedLoanAmount').value;
	var tin = cmp.lookupReference('tin').value;
	var tenorYear = cmp.lookupReference('tenorYear').value;
	var nameOfGuarantor = cmp.lookupReference('nameOfGuarantor').value;
	var officeCardUploadedYes = cmp.lookupReference('officeCardUploadedYes').value;
	var nidCardUploadedYes = cmp.lookupReference('nidCardUploadedYes').value;
	var verificationEmail = cmp.lookupReference('verificationEmail').value;
	var dobOfPg = cmp.lookupReference('dobOfPg').value;

	var mobileOfGuarantor = cmp.lookupReference('mobileOfGuarantor').value;	
	
	var mobileValidation = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
	if(mobileOfGuarantor){
		if (!mobileOfGuarantor.match(mobileValidation)) {
			Ext.MessageBox.alert('Invalid Mobile', 'Please Give Valid Guarantor Mobile.');
			return false;
		}
	}

	if (!officeCardUploadedYes && !uploadIdCard) {
		officeCardUploadedYes = false;
	} 
	else {
		officeCardUploadedYes = true;
	}

	if (!nidCardUploadedYes && !uploadNIdCard) {
		nidCardUploadedYes = false;
	} 
	else {
		nidCardUploadedYes = true;
	}

	if (!bpNo) {
		Ext.MessageBox.alert('Missing Field', 'BP should not be empty.');
		return false;
	} 
	if (!acNo) {
		Ext.MessageBox.alert('Missing Field', 'Acount No should not be empty.');
		return false;
	} 
	if (!customerName) {
		Ext.MessageBox.alert('Missing Field', 'Borrower name should not be empty.');
		return false;
	} 
	if (!mobile && !alternativeMobile) {
		if (!alternativeMobile) {
			Ext.MessageBox.alert('Missing Field', 'Alternative mobile number should not be empty.');
			return false;
		} else {
			Ext.MessageBox.alert('Missing Field', 'Mobile number should not be empty.');
			return false;
		}
	}
	if (!nid) {
		Ext.MessageBox.alert('Missing Field', 'Borrower nid should not be empty.');
		return false;
	}
	if(appliedLoanAmount >= 500000 && !tin){
		Ext.MessageBox.alert('Missing Field', 'TIN should not be empty.');
	    return false;	
	}
	if(!verificationEmail){
	    Ext.MessageBox.alert('Missing Field', 'Verification Email should not be empty.');
	    return false;
	} 
	if (!idLoanTypeKey) {
		Ext.MessageBox.alert('Missing Field', 'Loan Type should not be empty.');
		return false;
	} 
	if (!tenorYear) {
		Ext.MessageBox.alert('Missing Field', 'Tenor (year/s) should not be empty.');
		return false;
	} 
	if(!isLoanTypeGpf(loanPrefix) && !nameOfGuarantor){
		Ext.MessageBox.alert('Missing Field', 'Name Of Guarantor should not be empty.');
	    return false;		
	}
	if(!isLoanTypeGpf(loanPrefix) && !appliedLoanAmount){
		Ext.MessageBox.alert('Missing Field', 'Applied Amount should not be empty.');
	    return false;
	}
	if(dobOfPg != null && dobOfPg != undefined && dobOfPg != "NaNy, NaNm"){
		var parsedMap = parseDiffOfTowDate(dobOfPg, new Date())
		var parsedYear = parsedMap['YEAR'];

		if (parsedYear < 18) {
			Ext.MessageBox.alert('Not Valid', 'Age of PG should not be less then 18.');
			return false;
		}
	}
	 
	return true;
}


function validEmailCheck(cmp) {
	var verificationEmail = cmp.lookupReference('verificationEmail').value.trim();
	var emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!verificationEmail.match(emailValidator)) {
		Ext.MessageBox.alert('Invalid Email', 'Please Give Valid Email.');
		return false;
	}
	return true;
}

function getRecmndToProprtyMap() {
	var map = {};

	// TODO: fix this map values according to user and state

	if (userRoles.containsKey(appConstants.SOURCE_OFFICER)) {
		map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onSoRecommendToGroupClick';
		map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onSoRecommendToUserClick';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'soRecommendGroupMenu';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'soRecommendGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.MIS)) {
		map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onMisAllocateToGroupClick';
		map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onMisAllocateToUserClick';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'misAllocateGroupMenu';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'misAllocateGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.CREDIT_ANALYST)) {
		map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onCaRecommendToGroupClick';
		map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onCaRecommendToUserClick';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'caRecommendGroupMenu';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'caRecommendGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.RISK_MANAGER)) {
		map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onRmRecommendToGroupClick';
		map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onRmRecommendToUserClick';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'rmRecommendGroupMenu';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'rmRecommendGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.UNIT_HEAD)) {
		map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onUhRecommendToGroupClick';
		map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onUhRecommendToUserClick';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'uhRecommendGroupMenu';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'uhRecommendGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.HO_CRM)) {
		map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onHoCrmRecommendToGroupClick';
		map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onHoCrmRecommendToUserClick';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'hoCrmRecommendGroupMenu';
		map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'hoCrmRecommendGroupMenuBtn';
	}

	return map;
}

function getRetuenToProprtyMap() {
	var map = {};

	// TODO: fix this map values according to user and state

	if (userRoles.containsKey(appConstants.MIS)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onMisReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onMisReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'misReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'misReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.CREDIT_ANALYST)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onCaReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onCaReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'caReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'caReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.RISK_MANAGER)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onRmReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onRmReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'rmReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'rmReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.UNIT_HEAD)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onUhReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onUhReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'uhReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'uhReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.HO_CRM)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onHoCrmReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onHoCrmReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'hoCrmReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'hoCrmReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.MANAGING_DIRECTOR)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onMdReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onMdReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'mdReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'mdReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.CEO)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onCeoReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onCeoReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'ceoReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'ceoReturnGroupMenuBtn';
	} else if (userRoles.containsKey(appConstants.CAD)) {
		map[appConstants.MAP_KEY_RETURN_TO_GROUP_CLICK] = 'onCadReturnToGroupClick';
		map[appConstants.MAP_KEY_RETURN_TO_USER_CLICK] = 'onCadReturnToUserClick';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU] = 'cadReturnGroupMenu';
		map[appConstants.MAP_KEY_RETURN_GROUP_MENU_BTN] = 'cadReturnGroupMenuBtn';
	}

	return map;
}

function getSoRecommendAction(cmp) {
	var stateName = cmp.lookupReference('loanStateName').value;
	var action = appActionType.ACTION_TYPE_SO_RECOMMEND;
	if (action + 'ED' == stateName) {
		action = appActionType.ACTION_TYPE_SO_RE_RECOMMEND;
	}
	return action;
}

function getMisAllocateAction(cmp) {
	var stateName = cmp.lookupReference('loanStateName').value;
	var action = appActionType.ACTION_TYPE_MIS_ALLOCATE;
	if (action + 'D' == stateName) {
		action = appActionType.ACTION_TYPE_MIS_RE_ALLOCATE;
	}
	return action;
}

function getCaRecommendAction(cmp) {
	var stateName = cmp.lookupReference('loanStateName').value;
	var action = appActionType.ACTION_TYPE_CA_RECOMMEND;
	if (action + 'ED' == stateName) {
		action = appActionType.ACTION_TYPE_CA_RE_RECOMMEND;
	}
	return action;
}

function getRmRecommendAction(cmp) {
	var stateName = cmp.lookupReference('loanStateName').value;
	var action = appActionType.ACTION_TYPE_RM_RECOMMEND;
	if (action + 'ED' == stateName) {
		action = appActionType.ACTION_TYPE_RM_RE_RECOMMEND;
	}
	return action;
}

function getUhRecommendAction(cmp) {
	var stateName = cmp.lookupReference('loanStateName').value;
	var action = appActionType.ACTION_TYPE_UH_RECOMMEND;
	if (action + 'ED' == stateName) {
		action = appActionType.ACTION_TYPE_UH_RE_RECOMMEND;
	}
	return action;
}

function getHoCrmRecommendAction(cmp) {
	var stateName = cmp.lookupReference('loanStateName').value;
	var action = appActionType.ACTION_TYPE_HOCRM_RECOMMEND;
	if (action + 'ED' == stateName) {
		action = appActionType.ACTION_TYPE_HOCRM_RE_RECOMMEND;
	}
	return action;
}

function isValidRecommendedApproval(cmp) {
	var recommendedApproval = cmp.lookupReference('recommendedForApproval').value;
	var businessRecommendedAmnt = cmp.lookupReference('businessRecommendedAmnt').value;

	if (recommendedApproval > businessRecommendedAmnt) {
		cmp.lookupReference('recommendedForApproval').reset();
		Ext.MessageBox.alert('Not Valid Data', 'Recommended for Approval can not bigger than Business Recommended Amount');
		return false;
	}

	return true;
}

function foSubmitedReset(cmp) {

    cmp.lookupReference('loanStateName').reset();
    cmp.lookupReference('loanStateId').reset();
    cmp.lookupReference('loanId').reset();
    cmp.lookupReference('loanVer').reset();
    cmp.lookupReference('isLoading').reset();
    cmp.lookupReference('hiddenCustomerType').reset();
    cmp.lookupReference('keepHiddenCustomerId').reset();
    cmp.lookupReference('keepHiddenCustomerIdKey').reset();
    cmp.lookupReference('keepHiddenloanIdKey').reset();

	cmp.lookupReference('bpNo').reset();
	cmp.lookupReference('acNo').reset();
	cmp.lookupReference('officeId').reset();
	cmp.lookupReference('nameOfBorrower').reset();
	cmp.lookupReference('tenorYear').reset();
	cmp.lookupReference('mobile').reset();
	cmp.lookupReference('alternativeMobile').reset();
	cmp.lookupReference('nid').reset();
	cmp.lookupReference('mobileOfGuarantor').reset();
	cmp.lookupReference('appliedLoanAmount').reset();
	cmp.lookupReference('nameOfGuarantor').reset();
	cmp.lookupReference('nidOfGuarantorRef').reset();
	cmp.lookupReference('dobOfPg').reset();
	cmp.lookupReference('sourcingBranch').reset();
	cmp.lookupReference('staffId').reset();
	cmp.lookupReference('verificationEmail').reset();

	cmp.lookupReference('saveApplicationBtn').setHidden(false);
	cmp.lookupReference('deleteApplicationBtn').setHidden(true);
	cmp.lookupReference('updateApplicationBtn').setHidden(true);
	cmp.lookupReference('submitApplicationBtn').setHidden(true);

	//view button height

	cmp.lookupReference('viewIdCardFile').setHidden(true);
	cmp.lookupReference('officeId').columnWidth = .80;
	cmp.lookupReference('uploadIdCard').columnWidth = .20;

	cmp.lookupReference('viewNidFile').setHidden(true);
	cmp.lookupReference('nid').columnWidth = .80;
	cmp.lookupReference('uploadNIdCard').columnWidth = .20;

	cmp.lookupReference('viewSignaturePhoto').setHidden(true);
	cmp.lookupReference('signaturePhoto').columnWidth = 1;

	cmp.lookupReference('viewTinFile').setHidden(true);
	cmp.lookupReference('tin').columnWidth = .80;
	cmp.lookupReference('uploadTINFO').columnWidth = .20;

	cmp.lookupReference('viewNidOfGuarantorRef').setHidden(true);
	cmp.lookupReference('guarantorNid').columnWidth = .80;
	cmp.lookupReference('nidOfGuarantorRef').columnWidth = .20;

	cmp.lookupReference('viewSalaryCertificateFile').setHidden(true);	
	cmp.lookupReference('uploadsalaryCertificateBtn').columnWidth = 1;	

	cmp.lookupReference('additionalDocument1ViewBtn').setHidden(true);	
	cmp.lookupReference('additionalDocument1Filefield').columnWidth = 1;

	cmp.lookupReference('additionalDocument2Filefield').columnWidth = 1;
	cmp.lookupReference('additionalDocument2ViewBtn').setHidden(true);	

	cmp.lookupReference('additionalDocument3Filefield').columnWidth = 1;
	cmp.lookupReference('additionalDocument3ViewBtn').setHidden(true);
}

function canRecommendWithoutComment(actionType) {
	if (actionType == appActionType.ACTION_TYPE_SO_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_SO_RE_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_BM_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_BOM_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_PPC_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_CA_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_CA_RE_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_RM_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_RM_RE_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_UH_RECOMMEND) return true;
	if (actionType == appActionType.ACTION_TYPE_UH_RE_RECOMMEND) return true;

	return false;
}

function getArrayOfGrid(cmp) {
	var arrayOfGrid = [];
	arrayOfGrid.push(cmp.lookupReference('existingLiabilitiesGrid'));
	arrayOfGrid.push(cmp.lookupReference('cibStatusGrid'));
	arrayOfGrid.push(cmp.lookupReference('analystsCommentsGrid'));
	arrayOfGrid.push(cmp.lookupReference('exceptionDetailGrid'));
	arrayOfGrid.push(cmp.lookupReference('instrucationsToCADGrid'));
	arrayOfGrid.push(cmp.lookupReference('cmntJustificationGrid'));
	arrayOfGrid.push(cmp.lookupReference('sourceRecmndGrid'));
	arrayOfGrid.push(cmp.lookupReference('branchRecmndGrid'));
	arrayOfGrid.push(cmp.lookupReference('cmntWaiverSoughtGrid'));
	arrayOfGrid.push(cmp.lookupReference('queryResponseGrid'));

	return arrayOfGrid;
}

function hideAllActionButton(cmp) {

	cmp.lookupReference('soSaveApplicationBtn').setHidden(true);
	cmp.lookupReference('soUpdateApplicationBtn').setHidden(true);
	cmp.lookupReference('soRecommendGroupMenuBtn').setHidden(true);
	cmp.lookupReference('soDeleteApplicationBtn').setHidden(true);
	cmp.lookupReference('bmBomPcRecommendbtn').setHidden(true);
	cmp.lookupReference('bmBomPcReturnBtn').setHidden(true);
	cmp.lookupReference('btnMisRcv').setHidden(true);
	cmp.lookupReference('btnMisUpdt').setHidden(true);
	cmp.lookupReference('misAllocateGroupMenuBtn').setHidden(true);
	cmp.lookupReference('misReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnMisMailToPolice').setHidden(true);
	cmp.lookupReference('btnMisSnd2Cad').setHidden(true);
	cmp.lookupReference('btnMisSnd2Cib').setHidden(true);

	cmp.lookupReference('creditAnalystPendReceiveBtn').setHidden(true);
	cmp.lookupReference('creditAnalystUpdtBtn').setHidden(true);
	cmp.lookupReference('caRecommendGroupMenuBtn').setHidden(true);
	cmp.lookupReference('caReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnConditionFulfil').setHidden(true);
	cmp.lookupReference('btnSendQuery').setHidden(true);
	cmp.lookupReference('btnRMApprv').setHidden(true);
	cmp.lookupReference('btnRMCApprv').setHidden(true);
	cmp.lookupReference('rmRecommendGroupMenuBtn').setHidden(true);
	cmp.lookupReference('rmReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnRMDecline').setHidden(true);
	cmp.lookupReference('btnRMDefer').setHidden(true);
	cmp.lookupReference('btnUHApprv').setHidden(true);
	cmp.lookupReference('btnUHCApprv').setHidden(true);
	cmp.lookupReference('uhRecommendGroupMenuBtn').setHidden(true);
	cmp.lookupReference('uhReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnUHDecline').setHidden(true);
	cmp.lookupReference('btnUHDefer').setHidden(true);
	cmp.lookupReference('btnHoCrmApprv').setHidden(true);
	cmp.lookupReference('btnHoCrmCApprv').setHidden(true);
	cmp.lookupReference('hoCrmRecommendGroupMenuBtn').setHidden(true);
	cmp.lookupReference('hoCrmReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnHoCrmDecline').setHidden(true);
	cmp.lookupReference('btnHoCrmDefer').setHidden(true);
	cmp.lookupReference('btnMdApprv').setHidden(true);
	cmp.lookupReference('btnMdCApprv').setHidden(true);
	cmp.lookupReference('mdReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnMdDecline').setHidden(true);
	cmp.lookupReference('btnMdDefer').setHidden(true);
	cmp.lookupReference('btnCeoApprv').setHidden(true);
	cmp.lookupReference('btnCeoCApprv').setHidden(true);
	cmp.lookupReference('ceoReturnGroupMenuBtn').setHidden(true);
	cmp.lookupReference('btnCeoDecline').setHidden(true);
	cmp.lookupReference('btnCeoDefer').setHidden(true);
}

function hideAllActionColumn(arr) {
	for (var i = 0; i < arr.length; i++) {
		hideActionColumn(arr[i], 'saveReference');
		hideActionColumn(arr[i], 'deleteReference');
		hideActionColumn(arr[i], 'addNewCellReference');
	}
}


function formatAmountNumber(cmp, data) {
	var val = data.appliedLoanAmount;
	var convertVal = val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	cmp.lookupReference('appliedLoanAmount').setValue(convertVal);

}

function showDownloadProcessingBar(button, title, pText){
	
	Ext.MessageBox.show ({
        title: title,
       // msg: message,
        progressText: pText,
        width:300,
        progress:true,
        closable:true
     });
	showProgressBar();
}

function showProgressBar() {
   for(var i = 1; i < 16; i++) {
      setTimeout(progressBar(i), i*500);
   }
}

function progressBar(v) {
   return function()	{
      if(v == 15) {
         Ext.MessageBox.hide();
      } else {
         var i = v/14;
         Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
      }
   };
}

function changeFieldName (cmp, data){
	var priceQuotationAmount = cmp.lookupReference('priceQuotationAmount');
	var bankParticipation = cmp.lookupReference('bankParticipation');
	globalLonaPrefix = data.loanPrefix;

	if(isLoanTypeGpf(data.loanPrefix) && !userRoles.containsKey(appConstants.FIELD_OFFICER) 
            && !userRoles.containsKey(appConstants.SOURCE_OFFICER) 
            && !userRoles.containsKey(appConstants.BRANCH_MANAGER) 
            && !userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER) 
            && !userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)
            )
        {
           priceQuotationAmount.setFieldLabel('GPF Amount');
           priceQuotationAmount.setValue(data.gPFAmount);
           priceQuotationAmount.setReadOnly(true);
           bankParticipation.setFieldLabel('LTV (%)');
        }
}

function isLoanTypeGpf(loanPrefix){
  return loanPrefix == appConstants.LOAN_PREFIX_GPF;
}

function getLoanTypeFromKey(key){
	var value = "";
	var rec = getGlobalStore('gLoanTypeStore').findRecord('configurationId',key);
	if(rec){
		value = rec.data.value1;
	}
	return value;
}
function getCustomerTypeFromKey(key){
	var value = "";
	var rec = getGlobalStore('gCustTypeStore').findRecord('configurationId',key);
	if(rec){
		value = rec.data.value1;
	}
	return value;
}
function getNewLoanAddToLoanGroupWindow(title) {
	var win = Ext.create('Ext.window.Window', {
		height: 400,
		width: 800,
		itemId: 'newLoanAddToLoanGroup',
		reference: 'newLoanAddToLoanGroup',
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		//scrollable: true,
    	//autoScroll : true,   
		title: title,
		modal: true,
		layout: 'anchor',
		listeners: {
			close: function (cmp, eOpts) {
				getGlobalStore('gAddToLoanGroupGridViewStore').clearData();
			}
		},
		items: [{
			xtype: 'LoanAddToLoanGroupDetails'
		}]
	});

	addLoanToLoanGroupWindow = win;
	return win;
}

function setNidInformation(cmp,data) {

	var date = data.dateOfBirth.year + '-' + data.dateOfBirth.month + '-' + data.dateOfBirth.day;

	cmp.lookupReference('nidNo').setValue(data.nid);
	cmp.lookupReference('nameOfBangla').setValue(data.nameBangla);
	cmp.lookupReference('nameOfEnglish').setValue(data.nameEnglish);
	cmp.lookupReference('comments').setValue(data.comments);
	cmp.lookupReference('dateOfBirth').setValue(date ? new Date(date.substr(0, 10)) : null);
	cmp.lookupReference('fatherName').setValue(data.fatherName);	
	cmp.lookupReference('motherName').setValue(data.motherName);
	cmp.lookupReference('spouseName').setValue(data.spouseName);	
	cmp.lookupReference('occupation').setValue(data.occupation);
	cmp.lookupReference('presentDistrict').setValue(data.presentDistrict);	
	cmp.lookupReference('presentDivision').setValue(data.presentDivision);	
	cmp.lookupReference('presentRmo').setValue(data.presentRmo);
	cmp.lookupReference('presentMunicipality').setValue(data.presentMunicipality);	
	cmp.lookupReference('presentUpozila').setValue(data.presentUpozila);
	cmp.lookupReference('presentUnion').setValue(data.presentUnion);
	cmp.lookupReference('presentMoholla').setValue(data.presentMoholla);	
	cmp.lookupReference('presentAddMoholla').setValue(data.presentAddMoholla);
	cmp.lookupReference('presentWardUnionPorishod').setValue(data.presentWardUnionPorishod);	
	cmp.lookupReference('presentVillage').setValue(data.presentVillage);
	cmp.lookupReference('presentAddVillage').setValue(data.presentAddVillage);	
	cmp.lookupReference('presentHome').setValue(data.presentHome);
	cmp.lookupReference('presentPostOffice').setValue(data.presentPostOffice);	
	cmp.lookupReference('presentPostalCode').setValue(data.presentPostalCode);
	cmp.lookupReference('presentRegion').setValue(data.presentRegion);	

	cmp.lookupReference('permanentDistrict').setValue(data.permanentDistrict);	
	cmp.lookupReference('permanentDivision').setValue(data.permanentDivision);
	cmp.lookupReference('permanentRmo').setValue(data.permanentRmo);	
	cmp.lookupReference('permanentMunicipality').setValue(data.permanentMunicipality);
	cmp.lookupReference('permanentUpozila').setValue(data.permanentUpozila);	
	cmp.lookupReference('permanentUnion').setValue(data.permanentUnion);
	cmp.lookupReference('permanentMoholla').setValue(data.permanentMoholla);	
	cmp.lookupReference('permanentAddMoholla').setValue(data.permanentAddMoholla);
	cmp.lookupReference('permanentWardUnionPorishod').setValue(data.permanentWardUnionPorishod);
	cmp.lookupReference('permanentVillage').setValue(data.permanentVillage);	
	cmp.lookupReference('permanentAddVillage').setValue(data.permanentAddVillage);
	cmp.lookupReference('permanentHome').setValue(data.permanentHome);	
	cmp.lookupReference('permanentPostOffice').setValue(data.permanentPostOffice);
	cmp.lookupReference('permanentPostalCode').setValue(data.permanentPostalCode);	
	cmp.lookupReference('permanentRegion').setValue(data.permanentRegion);
	cmp.lookupReference('bloodGroup').setValue(data.bloodGroup);		
	cmp.lookupReference('nidPin').setValue(data.nidPin);		
    // cmp.lookupReference('nidSideInformationForm').setValue(data.personImagePublicPath)
	cmp.lookupReference('nidSideInformationForm').items.items[1].setSrc(data.personImagePublicPath);
}

function resetOnldNidinformationInForm(cmp){
	cmp.lookupReference('nidNo').reset();
	cmp.lookupReference('nameOfBangla').reset();
	cmp.lookupReference('nameOfEnglish').reset();
	cmp.lookupReference('comments').reset();
	cmp.lookupReference('dateOfBirth').reset();
	cmp.lookupReference('fatherName').reset();	
	cmp.lookupReference('motherName').reset();
	cmp.lookupReference('spouseName').reset();	
	cmp.lookupReference('occupation').reset();
	cmp.lookupReference('presentDistrict').reset();
	cmp.lookupReference('presentDivision').reset();
	cmp.lookupReference('presentRmo').reset();
	cmp.lookupReference('presentMunicipality').reset();	
	cmp.lookupReference('presentUpozila').reset();
	cmp.lookupReference('presentUnion').reset();
	cmp.lookupReference('presentMoholla').reset();	
	cmp.lookupReference('presentAddMoholla').reset();
	cmp.lookupReference('presentWardUnionPorishod').reset();	
	cmp.lookupReference('presentVillage').reset();
	cmp.lookupReference('presentAddVillage').reset();	
	cmp.lookupReference('presentHome').reset();
	cmp.lookupReference('presentPostOffice').reset();
	cmp.lookupReference('presentPostalCode').reset();
	cmp.lookupReference('presentRegion').reset();
	cmp.lookupReference('permanentDistrict').reset();	
	cmp.lookupReference('permanentDivision').reset();
	cmp.lookupReference('permanentRmo').reset();	
	cmp.lookupReference('permanentMunicipality').reset();
	cmp.lookupReference('permanentUpozila').reset();
	cmp.lookupReference('permanentUnion').reset();
	cmp.lookupReference('permanentMoholla').reset();	
	cmp.lookupReference('permanentAddMoholla').reset();
	cmp.lookupReference('permanentWardUnionPorishod').reset();
	cmp.lookupReference('permanentVillage').reset();
	cmp.lookupReference('permanentAddVillage').reset();
	cmp.lookupReference('permanentHome').reset();
	cmp.lookupReference('permanentPostOffice').reset();
	cmp.lookupReference('permanentPostalCode').reset();	
	cmp.lookupReference('permanentRegion').reset();
	cmp.lookupReference('bloodGroup').reset();	
	cmp.lookupReference('nidPin').reset();
	cmp.lookupReference('personImage').reset();
	cmp.lookupReference('personImagePath').reset();
	cmp.lookupReference('nidImage').reset();
	cmp.lookupReference('nidImagePath').reset();
	cmp.lookupReference('personImage').setHidden(true);
	cmp.lookupReference('personImageButton').setHidden(true);
	cmp.lookupReference('nidImage').setHidden(true);
	cmp.lookupReference('nidImageButton').setHidden(true);
	cmp.lookupReference('nidSideInformationForm').reset();
}

function setLmsNidInformation(cmp,data) {
	cmp.lookupReference('lmsNidNo').setValue(data.nid);
	cmp.lookupReference('lmsNameOfBangla').setValue(data.banglaNameOfBorrower);
	cmp.lookupReference('lmsNameOfEnglish').setValue(data.customerName)
	cmp.lookupReference('lmsDateOfBirth').setValue(data.dateOfBirth ? new Date(data.dateOfBirth.substr(0, 10)) : null);
	cmp.lookupReference('lmsFatherName').setValue(data.fatherName);	
	cmp.lookupReference('lmsMotherName').setValue(data.motherName);
	cmp.lookupReference('lmsspouseName').setValue(data.spouse);	
	cmp.lookupReference('lmsBloodGroup').setValue("Not Yet");
	cmp.lookupReference('presentAddress').setValue(data.currentPlaceofPosting);
	cmp.lookupReference('permanentAddr').setValue(data.permanentAddr);
}
function resetOnldLmsinformationInForm(cmp){
	cmp.lookupReference('lmsNidNo').reset();
	cmp.lookupReference('lmsNameOfBangla').reset();
	cmp.lookupReference('lmsNameOfEnglish').reset();
	cmp.lookupReference('lmsDateOfBirth').reset();
	cmp.lookupReference('lmsFatherName').reset();
	cmp.lookupReference('lmsMotherName').reset();
	cmp.lookupReference('lmsspouseName').reset();
	cmp.lookupReference('lmsBloodGroup').reset();
	cmp.lookupReference('permanentAddr').reset();
	cmp.lookupReference('presentAddress').reset();
}
function isMandatoryNewPerson(cmp){
	var subjectRole = cmp.lookupReference('subjectRole').value;
	var typeOfFinancing = cmp.lookupReference('typeOfFinancing').value;
	var numberOfInstallment = cmp.lookupReference('numberOfInstallment').value;
	var installmentAmount = cmp.lookupReference('installmentAmount').value;
	var totalInstallmentAmount = cmp.lookupReference('totalInstallmentAmount').value;
	var periodicityofPayment = cmp.lookupReference('periodicityofPayment').value;
	var nameOfBrrower = cmp.lookupReference('nameOfBrrower').value;
	var fatherName = cmp.lookupReference('fatherName').value;
	var motherName = cmp.lookupReference('motherName').value;
	var dateofBirth = cmp.lookupReference('dateofBirth').value;
	var districtOfBirth = cmp.lookupReference('districtOfBirth').value;
	var countryOfBirth = cmp.lookupReference('countryOfBirth').value;
	var parmanentDistrict = cmp.lookupReference('parmanentDistrict').value;
	var streetNameAndNumber = cmp.lookupReference('streetNameAndNumber').value;
	var parmanentCountryOfBirth = cmp.lookupReference('parmanentCountryOfBirth').value;
	var sectorCode = cmp.lookupReference('sectorCode').value;

	if (!subjectRole) {
		Ext.MessageBox.alert('Missing Field', 'Subject role should not be Empty.');
		return false;
	}else if (!typeOfFinancing) {
		Ext.MessageBox.alert('Missing Field', 'Type of financing should not be Empty.');
		return false;
	}else if (!numberOfInstallment) {
		Ext.MessageBox.alert('Missing Field', 'Number of installment should not be Empty.');
		return false;
	}else if (!installmentAmount) {
		Ext.MessageBox.alert('Missing Field', 'Installment amount should not be Empty.');
		return false;
	}else if (!totalInstallmentAmount) {
		Ext.MessageBox.alert('Missing Field', 'Total installment amount should not be Empty.');
		return false;
	}else if (!periodicityofPayment) {
		Ext.MessageBox.alert('Missing Field', 'Periodicity of payment should not be Empty.');
		return false;
	}else if (!nameOfBrrower) {
		Ext.MessageBox.alert('Missing Field', 'Name of brrower should not be Empty.');
		return false;
	}else if (!fatherName) {
		Ext.MessageBox.alert('Missing Field', 'Father name should not be Empty.');
		return false;
	}else if (!motherName) {
		Ext.MessageBox.alert('Missing Field', 'Mother name should not be Empty.');
		return false;
	}else if (!dateofBirth) {
		Ext.MessageBox.alert('Missing Field', 'Date of birth should not be Empty.');
		return false;
	}else if (!districtOfBirth) {
		Ext.MessageBox.alert('Missing Field', 'District of birth should not be Empty.');
		return false;
	}else if (!countryOfBirth) {
		Ext.MessageBox.alert('Missing Field', 'Country of birth should not be Empty.');
		return false;
	}else if (!parmanentDistrict) {
		Ext.MessageBox.alert('Missing Field', 'Parmanent district should not be Empty.');
		return false;
	}else if (!streetNameAndNumber) {
		Ext.MessageBox.alert('Missing Field', 'Street name and number should not be Empty.');
		return false;
	}else if (!parmanentCountryOfBirth) {
		Ext.MessageBox.alert('Missing Field', 'Parmanent country should not be Empty.');
		return false;
	}

  return true;
}

function getNewPerson(cmp){
	var subjectRole = cmp.lookupReference('subjectRole').value;
	var typeOfFinancing = cmp.lookupReference('typeOfFinancing').value;
	var numOfInstallment = cmp.lookupReference('numberOfInstallment').value;
	var installmentAmount = cmp.lookupReference('installmentAmount').value;
	var totalReqAmount = cmp.lookupReference('totalInstallmentAmount').value;
	var periodicityOfPayment = cmp.lookupReference('periodicityofPayment').value;
	var name = cmp.lookupReference('nameOfBrrower').value;
	var fathersName = cmp.lookupReference('fatherName').value;
	var mothersName = cmp.lookupReference('motherName').value;
	var dateOfBirthObj = cmp.lookupReference('dateofBirth').value;
	var gender = cmp.lookupReference('gender').getChecked()[0].initialConfig.boxLabel;	
	var districtOfBirth = cmp.lookupReference('districtOfBirth').value;
	var countryOfBirth = cmp.lookupReference('countryOfBirth').value;
	var permanentAddrDistrict = cmp.lookupReference('parmanentDistrict').value;
	var permanentAddrStreetNameNNum = cmp.lookupReference('streetNameAndNumber').value;
	var permanentAddrCountry = cmp.lookupReference('parmanentCountryOfBirth').value;
	var permanentAddrPostalCode = cmp.lookupReference('postalCode').value;
	var presentAddrDistrict = cmp.lookupReference('presentDistrict').value;
	var presentAddrStreetNameNNum = cmp.lookupReference('preStreetNameAndNumber').value;
	var presentAddrPostalCode = cmp.lookupReference('presentPostalCode').value;
	var presentAddrCountry = cmp.lookupReference('presentCountryOfBirth').value;
	var sectorType = cmp.lookupReference('sectorType').getChecked()[0].initialConfig.boxLabel
	var sectorCode = cmp.lookupReference('sectorCode').value;
	var title = cmp.lookupReference('title').value;
	var fathersTitle = cmp.lookupReference('fathertitle').value;
	var mothersTitle = cmp.lookupReference('mothertitle').value;
	var spouseTitle = cmp.lookupReference('spousetitle').value;
	var spouseName = cmp.lookupReference('spouseName').value;
	var tin = cmp.lookupReference('tin').value;
	var nid = cmp.lookupReference('nidpin').value;
	var idType = cmp.lookupReference('iDType').value;
	var idNum = cmp.lookupReference('iDNumber').value;
	var idIssueCountry = cmp.lookupReference('iDIssueCountry').value;
	var idIssueDateObj = cmp.lookupReference('iDIssueDate').value;
	var telephoneNum = cmp.lookupReference('telephoneNumber').value;
	var contractHistory = cmp.lookupReference('ContactHistory').getChecked()[0].initialConfig.boxLabel;
	var idIssueDate;
	var month1 = dateOfBirthObj.getMonth()+1;

	var dateOfBirth = {
				"year": dateOfBirthObj.getFullYear(),
				"month": month1,
				"day": dateOfBirthObj.getDate()
			}	

   if(idIssueDateObj){
   	var month2 = idIssueDateObj.getMonth()+1;
   	idIssueDate = {
				"year": idIssueDateObj.getFullYear(),
				"month": month2,
				"day": idIssueDateObj.getDate()
			}
   }	

	var newInquiryModel = {
		typeOfFinancing: typeOfFinancing ? typeOfFinancing : null,
		numOfInstallment: numOfInstallment ? numOfInstallment : null,
		installmentAmount: installmentAmount ? installmentAmount : null,
		totalReqAmount: totalReqAmount ? totalReqAmount : null,
		periodicityOfPayment: periodicityOfPayment ? periodicityOfPayment : null,
		name: name ? name : null,
		fathersName: fathersName ? fathersName : null,
		mothersName: mothersName ? mothersName : null,
		dateOfBirth: dateOfBirth ? dateOfBirth : null,
		gender: gender ? gender : null,
		districtOfBirth: districtOfBirth ? districtOfBirth : null,
		countryOfBirth: countryOfBirth ? countryOfBirth : null,
		presentAddrDistrict: presentAddrDistrict ? presentAddrDistrict : null,
		presentAddrStreetNameNNum: presentAddrStreetNameNNum ? presentAddrStreetNameNNum : null,
		presentAddrPostalCode: presentAddrPostalCode ? presentAddrPostalCode : null,
		presentAddrCountry: presentAddrCountry ? presentAddrCountry : null,
		permanentAddrDistrict: permanentAddrDistrict ? permanentAddrDistrict : null,
		permanentAddrStreetNameNNum: permanentAddrStreetNameNNum ? permanentAddrStreetNameNNum : null,
		permanentAddrPostalCode: permanentAddrPostalCode ? permanentAddrPostalCode : null,
		permanentAddrCountry: permanentAddrCountry ? permanentAddrCountry : null,
		sectorType: sectorType ? sectorType : null,
		sectorCode: sectorCode ? sectorCode : null,
		contractHistory: contractHistory ? contractHistory : null,
		nid: nid ? nid : null,
		fathersTitle: fathersTitle ? fathersTitle : null,
		mothersTitle: mothersTitle ? mothersTitle : null,
		spouseTitle: spouseTitle ? spouseTitle : null,
		spouseName: spouseName ? spouseName : null,
		tin: tin ? tin : null,
		idType: idType ? idType : null,
		idNum: idNum ? idNum : null,
		idIssueDate: idIssueDate ? idIssueDate : null,
		idIssueCountry: idIssueCountry ? idIssueCountry : null,
		telephoneNum: telephoneNum ? telephoneNum : null,
		subjectRole: subjectRole ? subjectRole : null,
		title: title ? title : null,
    }
 return newInquiryModel;

}

function isMandatorySubjectCode(cmp){
	var cibSubjectCode = cmp.lookupReference('cibSubjectCode').value;
	if (!cibSubjectCode) {
		Ext.MessageBox.alert('Missing Field', 'Subject Code should not be Empty.');
		return false;
	}
	
  return true;
}
function getSubCode(cmp){
	var cibSubjectCode = cmp.lookupReference('cibSubjectCode').value;
	var contractHistory = cmp.lookupReference('codeCountryHistory').getChecked()[0].initialConfig.boxLabel;

	var newInquiryModel = {
		contractHistory: contractHistory ? contractHistory : null,
		cibSubjectCode: cibSubjectCode ? cibSubjectCode : null,
	}
	return newInquiryModel;
}

function setCibFormInformation(cmp,data){
	var date = data.dateOfBirth.year + '-' + data.dateOfBirth.month + '-' + data.dateOfBirth.day;
    cmp.lookupReference('dateofBirth').setValue(date ? new Date(date.substr(0, 10)) : null);
    cmp.lookupReference('nidpin').setValue(data.nidPin);
    cmp.lookupReference('nameOfBrrower').setValue(data.nameEnglish);
    cmp.lookupReference('fatherName').setValue(data.fatherName);
    cmp.lookupReference('motherName').setValue(data.motherName);
    cmp.lookupReference('spouseName').setValue(data.spouseName);
    cmp.lookupReference('parmanentDistrict').setValue(data.permanentDistrict);
    cmp.lookupReference('postalCode').setValue(data.permanentPostalCode);
    cmp.lookupReference('presentDistrict').setValue(data.presentDistrict);
    cmp.lookupReference('presentPostalCode').setValue(data.presentPostalCode);
}
