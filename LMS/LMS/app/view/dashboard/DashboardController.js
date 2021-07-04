var dashboardResultFiler = new Array('loanTrackingId', 'loanId', 'applicationNo', 'accountNo','appliedLoanAmount', 'customerId', 'bpNo', 'customerName', 'nid');

var dashboardDetailsWinToClose;

Ext.define('Desktop.view.dashboard.DashboardController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.dashboardController',

	// rcv request
	onSuccess: function(request, response) {
		var controller = request.sender;
		var headerRef = request.header.reference;

		if (isMessageBox) {
			Ext.MessageBox.hide();
			isMessageBox = false;
		}

        var data = response.payload[1].payload;
        
        if (headerRef == 'loadOnProcessStatusData') {

			var gridData = getLoadAbleDataInGrid(data);

			var columns = getLoadAbleColumnsInGrid(data, gridData);

			controller.lookupReference('userWiseOnProcessGrid').setColumns(columns);

			loadDataInGlobalStore(gridData, 'gUserWiseOnProcess');
		}
		else if(headerRef == 'loadPpcOnProcessStatusData'){
			var gridData = getLoadAbleDataInGrid(data);

			var columns = getLoadAbleColumnsInGrid(data, gridData);
			controller.lookupReference('ppcUserWiseOnProcessGrid').setColumns(columns);

			loadDataInGlobalStore(gridData, 'gPpcUserWiseOnProcess');
		}
		else if (headerRef == 'loadFileReceivedStatusData') {

			var gridData = getLoadAbleDataInGrid(data);

			var columns = getLoadAbleColumnsInGrid(data, gridData);

			controller.lookupReference('userWiseFileReceivedGrid').setColumns(columns);

			loadDataInGlobalStore(gridData, 'gUserWiseFileReceived');
		}
		else if (headerRef == 'loadStatusWiseLoanCountData') {
			loadDataInGlobalStore(data, 'gStatusWiseLoanCount');
		}
		else if (headerRef == 'loadDepartmentWiseLoanCountData') {

			var gridData = getLoadAbleDataInGrid(data);

			var columns = getLoadAbleColumnsInGrid(data, gridData);

			controller.lookupReference('departmentWiseLoanCountGrid').setColumns(columns);

			loadDataInGlobalStore(gridData, 'gDepartmentWiseLoanCount');
		}
		else if (headerRef == 'onActivateDashboardDetailsWin' 
			|| headerRef == 'onClickLoanSearchFromDashboard'|| headerRef=='onActivateDashboardDetailsWinLoanTracker'
			|| headerRef == 'onActivateDashboardLoanCountDateWise' || headerRef=='onActivateDashboardDetailsLoanStatusDeptWise'
			|| headerRef=='onActivateDashboardDetailsPpcStatus') {
			
			if(!controller.lookupReference('loanGridLocalFilter').value){
				getGlobalStore('gDashboardDetailsViewGridStore').clearFilter();
			}
			loadDataInGlobalStore(data, 'gDashboardDetailsViewGridStore');
			controller.lookupReference('loanListCount').setValue(data.length);
		}
		else if(headerRef == 'loadAllCustomer'){
			loadDataInGlobalStore(data, 'gCustomerStore');
		}
		else if(headerRef == 'loadDashboardStatus'){
			controller.lookupReference('totalRequest').setValue(data.totalRequest);
			controller.lookupReference('totalCompleted').setValue(data.totalCompleted);
			controller.lookupReference('totalPending').setValue(data.totalPending);

			var statusData = [];
			// var ob = {
			// 	name: 'Total Request',
			// 	value: data.totalRequest
			// }
			var ob2 = {
				name: 'Total Completed',
				value: data.totalCompleted
			}
			var ob3 = {
				name: 'Total Pending',
				value: data.totalPending
			}
			// statusData.push(ob);
			statusData.push(ob2);
			statusData.push(ob3);

			loadDataInGlobalStore(statusData, 'gDashboardStatusStore');
		}
		else if(headerRef == 'loadLoanCountDateWiseData'){
			loadDataInGlobalStore(data, 'gLoanCountDateWiseStore');
		}
		else if(headerRef == 'loadLoanStatusDeptWiseData'){
			loadDataInGlobalStore(data, 'gLoanStatusDeptWiseStore');
		}
		else if(headerRef== 'loadLoanTrackerDeptWiseData'|| headerRef=='onClickLoanTrackerDeptWiseSearch'){
			loadDataInGlobalStore(data, 'gLoanTrackerDepartmentWise');
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
			onSuccess: this.onSuccess,
			onError: this.onError,
			onStatusUpdate: this.onStatusUpdate
		};

		var requestId = nMessageProcessor.sendRequest(request);
	},

	refreshExecutiveDashboard: function(cmp, data){
		this.clearFromToDate(this, 'loanCountDateWiseToDateRef', 'loanCountDateWiseFormDateRef');
		this.clearFromToDate(this, 'loanStatusDeptWiseToDateRef', 'loanStatusDeptWiseFormDateRef');

		this.clearFromToDate(this, 'statusToDateRef', 'statusFormDateRef');

		this.clearFromToDate(this, 'departmentToDateRef', 'departmentFormDateRef');
		this.lookupReference('customerName').reset();

		this.clearFromToDate(this, 'onProcessToDateRef', 'onProcessFormDateRef');
		this.clearFromToDate(this, 'fileReceivedToDateRef', 'fileReceivedFormDateRef');

		this.loadExecutiveDashboardAllData(cmp, data);		
	},

	onDashboardTabChange: function(tab){
	
		var tabid=tab.activeTab.id;

		var payload = getModKeyAsPayload();
		var dateType =1;

		var payload = [{
	        userModKey	: loginUser.id,
	        dateType    : dateType
	    }];

	    if(tabid == 'statusWiseLoanCount'){
        this.loadStatusWiseLoanCountData(appActionType.ACTION_TYPE_STATUS_WISE_LOAN_COUNT, payload);
	    }
	    else if(tabid=='loanTrackerDeptWisePanel'){
	    this.loadLoanTrackerDeptWiseData(appActionType.LOAN_TRACKER_DEPT_WISE, payload);
	    }
	    else if(tabid=='loanStatusDeptWisePanel'){
	    this.lookupReference('modificationDate').setValue(true);
	    this.loadLoanStatusDeptWiseData(appActionType.LOAN_STATUS_DEPT_WISE, payload);
	    }
	    else if(tabid=='departmentWiseLoanCountPanel'){
	    this.loadDepartmentWiseLoanCountData(appActionType.ACTION_TYPE_DEPARTMENT_WISE_LOAN_COUNT, payload); 	
	    }
	    else if(tabid=='userWiseOnProcessPanel'){
	    this.loadOnProcessStatusData(appActionType.ACTION_TYPE_ON_PROCESS_STATUS, payload);	
	    }
	    else if(tabid=='userWiseFileReceivedPanel'){
	    this.loadFileReceivedStatusData(appActionType.ACTION_TYPE_FILE_RECEIVED_STATUS, payload);	    	
	    }
	    else if(tabid=='ppcUserWiseOnProcessPanel'){
	    this.loadPpcOnProcessStatusData(appActionType.ACTION_TYPE_PPC_ON_PROCESS_STATUS, payload);		
	    }
	    else 
	    {
	    	// loanCountDateWisePanel
	    this.loadLoanCountDateWiseData(appActionType.LOAN_STATUS_DATE_WISE, payload); 	    	
	    }
     
	},

	refreshLoanTrackerDeptWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
	    this.onClickSearchClear();
		this.loadLoanTrackerDeptWiseData(appActionType.LOAN_TRACKER_DEPT_WISE, payload);
	},
	refreshLoanCountDateWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadLoanCountDateWiseData(appActionType.LOAN_STATUS_DATE_WISE, payload);
	},
	refreshLoanFileReceive:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadFileReceivedStatusData(appActionType.ACTION_TYPE_FILE_RECEIVED_STATUS, payload);
	},
	refreshLoanStatusWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadStatusWiseLoanCountData(appActionType.ACTION_TYPE_STATUS_WISE_LOAN_COUNT, payload);
	},
	refreshLoanStatusDeptWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadLoanStatusDeptWiseData(appActionType.LOAN_STATUS_DEPT_WISE, payload);
	},
	refreshLoanDepartmentWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadDepartmentWiseLoanCountData(appActionType.ACTION_TYPE_DEPARTMENT_WISE_LOAN_COUNT, payload);
	},
	refreshLoanProcessWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadOnProcessStatusData(appActionType.ACTION_TYPE_ON_PROCESS_STATUS, payload);
	},
	refreshLoanPpcProcessWise:function(cmp, data) {
		var payload = getModKeyAsPayload();
		var payload = [{
	        userModKey	: loginUser.id
	    }];
		this.loadPpcOnProcessStatusData(appActionType.ACTION_TYPE_PPC_ON_PROCESS_STATUS, payload);
		this.onClickPpcOnProcessCountClear();
	},	
	loadExecutiveDashboardAllData: function(cmp, data) {
		this.loadAllCustomer();
		this.loadDashboardStatus();   
	},

	onClickPpcOnProcessSearch: function(cmp, data){

		var employeeInInformation = this.lookupReference('employeeInInformation').value;
		var employeeValue = this.lookupReference('employeeValue').value;
		var fromDate = this.lookupReference('onPpcProcessFormDateRef').value;
		var toDate = this.lookupReference('onPpcProcessToDateRef').value;
		var loanTrackingId4Src = this.lookupReference('onPpcProcessloanTrackingId').value;
		var bpNo4Src = this.lookupReference('onPpcProcessbpNoSrc').value;
		var nid4Src = this.lookupReference('onPpcProcessnid4Search').value;
		var accountNo4Src = this.lookupReference('onPpcProcessaccount4Search').value;

		var loginName;
		var staffId;
		if (!toDate) toDate = new Date();

		if (fromDate && toDate.getTime() < fromDate.getTime()) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		if(employeeInInformation=='Employee Id'){
			staffId = employeeValue;			
        }
		else{
			loginName = employeeValue;	 	
		}

		if (!fromDate && !employeeValue && !nid4Src && !nid4Src && !bpNo4Src && !accountNo4Src && !loanTrackingId4Src){
		    fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
		}		

		if(!fromDate){
            fromDate = Ext.Date.add(new Date(1970,01,01));
            fromDate = Ext.Date.format(fromDate, 'Y-m-d');	     	  	
	    }

		if(!Ext.isEmpty(employeeInInformation) && !fromDate){
			if(Ext.isEmpty(employeeValue)){
				Ext.MessageBox.alert('Empty', 'Please Enter User Name Or User Id Or From - To Date');
			    return;
			}
		}
								
		 				
		if(fromDate && typeof fromDate != 'string'){
			fromDate =  Ext.Date.format(fromDate, 'Y-m-d');
		}

		if(toDate && typeof toDate != 'string'){
			toDate =  Ext.Date.format(toDate, 'Y-m-d');
		}

		fromDate           = fromDate           ? fromDate                            : null;
		toDate             = toDate             ? toDate                              : null;
		bpNo4Src           = bpNo4Src           ? bpNo4Src                            : null;
		nid4Src            = nid4Src            ? nid4Src                             : null;
		loanTrackingId4Src = loanTrackingId4Src ? loanTrackingId4Src                  : null;
		accountNo4Src      = accountNo4Src      ? accountNo4Src                       : null;
		staffId            = staffId            ? staffId                             : null;
		loginName          = loginName          ? loginName                           : null;
  
		var payload = [{
	            userModKey	: loginUser.id,
	            loginName	: loginName,
				fromDate4Src: fromDate,
				toDate4Src: toDate,
				staffId: staffId,
				nid4Src: nid4Src,
				bpNo4Src : bpNo4Src,
				accountNo4Src : accountNo4Src,
				loanTrackingId4Src: loanTrackingId4Src

	        }];
	    this.loadPpcOnProcessStatusData(appActionType.ACTION_TYPE_PPC_ON_PROCESS_STATUS, payload);	
	},

	loadDashboardStatus: function(){
		var header = {
			reference: 'loadDashboardStatus'
		};
		var payload = [{
	        userModKey	: loginUser.id
	    }];

		this.sendRequest(appActionType.ACTION_TYPE_DASHBOARD_STATUS, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},

	onClickUserWiseOnProcessRefresh: function(cmp, eOpts){
		var payload = getModKeyAsPayload();
		this.loadOnProcessStatusData(appActionType.ACTION_TYPE_ON_PROCESS_STATUS, payload);
	},
	onClickUserWiseFileReceivedFRefresh: function(cmp, eOpts){
		var payload = getModKeyAsPayload();
		this.loadFileReceivedStatusData(appActionType.ACTION_TYPE_FILE_RECEIVED_STATUS, payload);
	},

	loadLoanCountDateWiseData: function(actionType, payload){
		var header = {
			reference: 'loadLoanCountDateWiseData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadLoanStatusDeptWiseData: function(actionType, payload){
		var header = {
			reference: 'loadLoanStatusDeptWiseData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadOnProcessStatusData: function(actionType, payload){
		var header = {
			reference: 'loadOnProcessStatusData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadPpcOnProcessStatusData: function(actionType, payload){
		var header = {
			reference: 'loadPpcOnProcessStatusData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadFileReceivedStatusData: function(actionType, payload){
		var header = {
			reference: 'loadFileReceivedStatusData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadStatusWiseLoanCountData: function(actionType, payload){
		var header = {
			reference: 'loadStatusWiseLoanCountData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadDepartmentWiseLoanCountData: function(actionType, payload){
		var header = {
			reference: 'loadDepartmentWiseLoanCountData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},
	loadLoanTrackerDeptWiseData:function(actionType, payload){

		var fromDate = Ext.Date.add(new Date(),Ext.Date.DAY,-30);
		var toDate = new Date();

        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
		toDate = Ext.Date.format(toDate, 'Y-m-d');

		var payload = [{
            userModKey	: loginUser.id,
            fromDate4Src: fromDate,
			toDate4Src 	: toDate
        }];
		var header = {
			reference: 'loadLoanTrackerDeptWiseData'
		};
		this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},

	loadAllCustomer: function(){
		var header = {
			reference: 'loadAllCustomer'
		};

		var payload = [{
	        userModKey	: loginUser.id
	    }];

	    this.sendRequest(appActionType.ACTION_TYPE_SELECT_ALL_CUSTOMER, appContentType.CONTENT_TYPE_CUSTOMER, payload, header);
	},

	onGridFilterByLetter: function (component, newValue, oldValue, eOpts) {
        var grid = component.up('grid');
        this.filterOnGrid(grid, newValue, resultFiler);
    },

    filterOnGrid: function(grid, newValue, arrOfResultFiler){
    	var columnLength = grid.store.data.items.length;
    	var columnNameArray=[]
		for (var i=0; i<columnLength; i++) {
			columnNameArray.push('column'+i);
	    }

        grid.store.clearFilter();
        if (newValue) {
            var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
            grid.store.filter({
                filterFn: function (record) {
                    var match = false;
                    Ext.Object.each(record.data, function (property, value) {
                        if (columnNameArray.indexOf(property) > -1) {
                            match = match || matcher.test(String(value));
                        }
                    });
                    return match;
                }
            });
        }
    },

    onClickLoanStatusDeptWiseSrc: function(){
    	var payload = this.onCountSrcDept(this, 'loanStatusDeptWiseToDateRef', 'loanStatusDeptWiseFormDateRef','loanStatusDeptWiseaccount4Search','loanStatusDeptWisebpNoSrc','loanStatusDeptWiseloanTrackingId','loanStatusDeptWisenid4Search','loanStatusDeptWiseCheckOutDate');
    	this.loadLoanStatusDeptWiseData(appActionType.LOAN_STATUS_DEPT_WISE, payload);
    },
    onCheckOrigModDate: function(cmp, newValue, oldValue, eOpts){

    	if(!newValue){
    		return;
    	}

    	var radioLabel = cmp.boxLabel;

    	var me = this;
    	var loanTrackingId4Src = me.lookupReference('loanStatusDeptWiseloanTrackingId').value;
		var bpNo4Src = me.lookupReference('loanStatusDeptWisebpNoSrc').value;
		var nid4Src = me.lookupReference('loanStatusDeptWisenid4Search').value;
		var accountNo4Src =this.lookupReference('loanStatusDeptWiseaccount4Search').value;
		var fromDate = me.lookupReference('loanStatusDeptWiseFormDateRef').value;
		var toDate = me.lookupReference('loanStatusDeptWiseToDateRef').value;
		
		if(radioLabel=='Modification'){
			dateType =1;
		}
		else{
			dateType = 0;
		}

		if (toDate < fromDate) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		fromDate           = fromDate           ? Ext.Date.format(fromDate, 'Y-m-d')  : null;
		toDate             = toDate             ? Ext.Date.format(toDate, 'Y-m-d')    : null;
		bpNo4Src           = bpNo4Src           ? bpNo4Src                            : null;
		nid4Src            = nid4Src            ? nid4Src                             : null;
		loanTrackingId4Src = loanTrackingId4Src ? loanTrackingId4Src                  : null;
		accountNo4Src      = accountNo4Src      ? accountNo4Src                       : null;

		var payload = [{
            userModKey	       : loginUser.id,
            fromDate	       : fromDate,
			toDate		       : toDate,
			fromDate4Src       : fromDate,
			toDate4Src         : toDate,
			bpNo4Src           : bpNo4Src,
			nid4Src            : nid4Src,
			loanTrackingId4Src : loanTrackingId4Src,
			accountNo4Src      : accountNo4Src,
			dateType           : dateType
        }];   

	    this.loadLoanStatusDeptWiseData(appActionType.LOAN_STATUS_DEPT_WISE, payload);
    },
    
    onClickLoanStatusDeptWiseClear: function(){
		this.clearFromToDate(this, 'loanStatusDeptWiseToDateRef', 'loanStatusDeptWiseFormDateRef','loanStatusDeptWiseaccount4Search','loanStatusDeptWisebpNoSrc','loanStatusDeptWiseloanTrackingId','loanStatusDeptWisenid4Search');
    },

    onClickLoanCountDateWiseSrc: function(){
    	var payload = this.onCountSrc(this, 'loanCountDateWiseToDateRef', 'loanCountDateWiseFormDateRef','loanCountDateWiseaccount4Search','loanCountDateWisebpNoSrc','loanCountDateWiseloanTrackingId','loanCountDateWisenid4Search');
    	this.loadLoanCountDateWiseData(appActionType.LOAN_STATUS_DATE_WISE, payload);
    },
    onClickLoanCountDateWiseClear: function(){
		this.clearFromToDate(this, 'loanCountDateWiseToDateRef', 'loanCountDateWiseFormDateRef','loanCountDateWiseloanTrackingId','loanCountDateWisebpNoSrc','loanCountDateWisenid4Search','loanCountDateWiseaccount4Search');
    },

    onClickStatusCountSrc: function(){
    	var payload = this.onCountSrc(this, 'statusToDateRef', 'statusFormDateRef','statusWiseLoanCountaccount4Search','statusWiseLoanCountbpNoSrc','statusWiseLoanCountloanTrackingId','statusWiseLoanCountnid4Search');
    	this.loadStatusWiseLoanCountData(appActionType.ACTION_TYPE_STATUS_WISE_LOAN_COUNT, payload);
    },
    onClickStatusCountClear: function(){
		this.clearFromToDate(this, 'statusToDateRef', 'statusFormDateRef','statusWiseLoanCountaccount4Search','statusWiseLoanCountbpNoSrc','statusWiseLoanCountloanTrackingId','statusWiseLoanCountnid4Search');
    },

    onClickDeptCountSrc: function(){
    	var payload = this.onCountSrc(this, 'departmentToDateRef', 'departmentFormDateRef');

    	payload[0]['customerName'] = this.lookupReference('customerName').value;

    	this.loadDepartmentWiseLoanCountData(appActionType.ACTION_TYPE_DEPARTMENT_WISE_LOAN_COUNT, payload);
    },
    onClickDeptCountClear: function(){
		this.clearFromToDate(this, 'departmentToDateRef', 'departmentFormDateRef');
		this.lookupReference('customerName').reset();
    },

    onClickOnProcessCountSrc: function(){
    	var payload = this.onCountSrc(this, 'onProcessToDateRef', 'onProcessFormDateRef','onProcessaccount4Search','onProcessbpNoSrc','onProcessloanTrackingId','onProcessnid4Search');
    	this.loadOnProcessStatusData(appActionType.ACTION_TYPE_ON_PROCESS_STATUS, payload);
    },
    onClickOnProcessCountClear: function(){
		this.clearFromToDate(this, 'onProcessToDateRef', 'onProcessFormDateRef','onProcessaccount4Search','onProcessbpNoSrc','onProcessloanTrackingId','onProcessnid4Search');
    },

    onClickFileReceivedCountSrc: function(){
    	var payload = this.onCountSrc(this, 'fileReceivedToDateRef', 'fileReceivedFormDateRef','fileReceivedaccount4Search','fileReceivedbpNoSrc','fileReceivedloanTrackingId','fileReceivednid4Search');
    	this.loadFileReceivedStatusData(appActionType.ACTION_TYPE_FILE_RECEIVED_STATUS, payload);
    },
    onClickFileReceivedCountClear: function(){
		this.clearFromToDate(this, 'fileReceivedToDateRef', 'fileReceivedFormDateRef','fileReceivedaccount4Search','fileReceivedbpNoSrc','fileReceivedloanTrackingId','fileReceivednid4Search');
    },

    
    onCountSrc: function(me, toRef, fromRef,accountNo,bpNo,loanTrackingId,nid){

    	var fromDate = me.lookupReference(fromRef).value;
		var toDate = me.lookupReference(toRef).value;

		var loanTrackingId4Src = me.lookupReference(loanTrackingId).value;
		var bpNo4Src = me.lookupReference(bpNo).value;
		var nid4Src = me.lookupReference(nid).value;
		var accountNo4Src =this.lookupReference(accountNo).value;

		if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}

		if (!fromDate && !toDate && !loanTrackingId4Src && !bpNo4Src
			&& !nid4Src && !accountNo4Src){
			Ext.Msg.alert('Error', 'Enter from date To to date.');
			return;
		}else if(fromDate && !toDate && !loanTrackingId4Src && !bpNo4Src
			&& !nid4Src && !accountNo4Src){	
			Ext.Msg.alert('Error', 'To date must not be Empty.');
			return;			
		}else if(!fromDate && toDate && !loanTrackingId4Src && !bpNo4Src
			&& !nid4Src && !accountNo4Src){	
			Ext.Msg.alert('Error', 'From date must not be Empty.');
			return;			
		}

		if (toDate < fromDate) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}
		if (!fromDate && !toDate){
			var d = new Date(1971, 0, 0, 18, 30);
			fromDate = d;
			toDate = new Date();
		}

		fromDate           = fromDate           ? Ext.Date.format(fromDate, 'Y-m-d')  : null;
		toDate             = toDate             ? Ext.Date.format(toDate, 'Y-m-d')    : null;
		bpNo4Src           = bpNo4Src           ? bpNo4Src                            : null;
		nid4Src            = nid4Src            ? nid4Src                             : null;
		loanTrackingId4Src = loanTrackingId4Src ? loanTrackingId4Src                  : null;
		accountNo4Src      = accountNo4Src      ? accountNo4Src                       : null;

		var payload = [{
            userModKey	       : loginUser.id,
            fromDate	       : fromDate,
			toDate		       : toDate,
			fromDate4Src       : fromDate,
			toDate4Src         : toDate,
			bpNo4Src           : bpNo4Src,
			nid4Src            : nid4Src,
			loanTrackingId4Src : loanTrackingId4Src,
			accountNo4Src      : accountNo4Src,
        }];   

        return payload;
    },
    onCountSrcDept: function(me, toRef, fromRef,accountNo,bpNo,loanTrackingId,nid,dateWiseCheck){

    	var fromDate = me.lookupReference(fromRef).value;
		var toDate = me.lookupReference(toRef).value;
		var dateWiseCheck = me.lookupReference(dateWiseCheck).getChecked()[0].initialConfig.boxLabel;
		var dateType ;

		if(dateWiseCheck=='Modification'){
			dateType =1;
		}
		else{
			dateType = 0;
		}

		var loanTrackingId4Src = me.lookupReference(loanTrackingId).value;
		var bpNo4Src = me.lookupReference(bpNo).value;
		var nid4Src = me.lookupReference(nid).value;
		var accountNo4Src =this.lookupReference(accountNo).value;

		if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}

		if (!fromDate && !toDate && !loanTrackingId4Src && !bpNo4Src
			&& !nid4Src && !accountNo4Src){
			Ext.Msg.alert('Error', 'Enter from date To to date.');
			return;
		}else if(fromDate && !toDate && !loanTrackingId4Src && !bpNo4Src
			&& !nid4Src && !accountNo4Src){	
			Ext.Msg.alert('Error', 'To date must not be Empty.');
			return;			
		}else if(!fromDate && toDate && !loanTrackingId4Src && !bpNo4Src
			&& !nid4Src && !accountNo4Src){	
			Ext.Msg.alert('Error', 'From date must not be Empty.');
			return;			
		}

		if (toDate < fromDate) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}
		if (!fromDate && !toDate){
			var d = new Date(1971, 0, 0, 18, 30);
			fromDate = d;
			toDate = new Date();
		}

		fromDate           = fromDate           ? Ext.Date.format(fromDate, 'Y-m-d')  : null;
		toDate             = toDate             ? Ext.Date.format(toDate, 'Y-m-d')    : null;
		bpNo4Src           = bpNo4Src           ? bpNo4Src                            : null;
		nid4Src            = nid4Src            ? nid4Src                             : null;
		loanTrackingId4Src = loanTrackingId4Src ? loanTrackingId4Src                  : null;
		accountNo4Src      = accountNo4Src      ? accountNo4Src                       : null;
		dateType           = dateType           ? dateType                            : null;

		var payload = [{
            userModKey	       : loginUser.id,
            fromDate	       : fromDate,
			toDate		       : toDate,
			fromDate4Src       : fromDate,
			toDate4Src         : toDate,
			bpNo4Src           : bpNo4Src,
			nid4Src            : nid4Src,
			loanTrackingId4Src : loanTrackingId4Src,
			accountNo4Src      : accountNo4Src,
			dateType           : dateType
        }];   

        return payload;
    },
    clearFromToDate: function(me, toRef, fromRef,accountNo,bpNo,loanTrackingId,nid){
    	me.lookupReference(fromRef).reset();
		me.lookupReference(toRef).reset();
		me.lookupReference(accountNo).reset();
		me.lookupReference(bpNo).reset();
		me.lookupReference(loanTrackingId).reset();
		me.lookupReference(nid).reset();
    },
    onClickPpcOnProcessCountClear: function(){
    	this.lookupReference('onPpcProcessFormDateRef').reset();
		this.lookupReference('onPpcProcessToDateRef').reset();
		this.lookupReference('employeeInInformation').reset();
		this.lookupReference('employeeValue').reset();
		this.lookupReference('employeeValue').setReadOnly(true);
		this.lookupReference('employeeValue').setFieldStyle('background: #7ABDFF');
		this.lookupReference('onPpcProcessloanTrackingId').reset();
		this.lookupReference('onPpcProcessbpNoSrc').reset();
		this.lookupReference('onPpcProcessnid4Search').reset();
		this.lookupReference('onPpcProcessaccount4Search').reset();
    },

    onDonPpcProcessData: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts){
    	var deptName = view.up().getColumns()[cellIndex].text;
    	if(td.textContent==0||deptName=='#'||deptName=='Date'){
    		return;
    	}else{
    		var dashboardDetailsWin = getDashboardDetailsWindow('DASHBOARD DETAILS');

	    	dashboardDetailsWin.down('#deptName').setValue(deptName);
	    	dashboardDetailsWin.down('#record').setValue(record);
			dashboardDetailsWin.show();
    	}   	
    },

    onActivateDashboardDetailsWin: function(cmp, eOpts){

    	if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}

    	var panelType=cmp.lookupReference('record').value.id;
    	    panelType=panelType.split('.').pop().split('-')[0];

    	var deptName = cmp.lookupReference('deptName').value;
		var record = cmp.lookupReference('record').value;
		var cellClickIndecate = cmp.lookupReference('cellClickIndecate').value;
		var girdfiltervalue = cmp.lookupReference('filterdata').value;	
		var dateType = cmp.lookupReference('dateType').value;	
		var total = cmp.lookupReference('total').value;
		
    	if(panelType=="LoanTrackerDepartmentWise"){

    		cmp.lookupReference('lmsPPCExcelReport').setHidden(false);
    		cmp.lookupReference('lmsMISExcelReport').setHidden(false);
    		if(typeof  girdfiltervalue !== "undefined" && girdfiltervalue !=null && girdfiltervalue !='')
			{
			 cmp.lookupReference('loanGridLocalFilter').setValue(girdfiltervalue);
			}			
    		var fromDate;
			var toDate;
			if(cellClickIndecate=="selectCell"){
				fromDate = record.data.date;
    		    toDate =  record.data.date;
	    	}
	    	else{
    		   var lastIndex=record.store.data.items.length-1;
				fromDate= record.store.data.items[lastIndex].data.date;
				toDate = record.store.data.items[0].data.date;
	    	}

		    var header = {
				reference: 'onActivateDashboardDetailsWinLoanTracker'
			};

    		var payload = [{
	            userModKey	: loginUser.id,
	            deptName	: deptName,
				fromDate4Src: fromDate,
				toDate4Src: toDate,
	        }];
	        this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_TRACKER_DEPT_WISE, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
    	
    	}else if(panelType=="LoanCountDateWise"){
    		cmp.lookupReference('lmsPPCExcelReport').setHidden(false);
    		cmp.lookupReference('lmsMISExcelReport').setHidden(false);

    		if(typeof  girdfiltervalue !== "undefined" && girdfiltervalue !=null && girdfiltervalue !='')
			{
			 cmp.lookupReference('loanGridLocalFilter').setValue(girdfiltervalue);
			}
 			
    		var fromDate;
			var toDate;
			if(cellClickIndecate=="selectCell"){
				fromDate = record.data.date;
    		    toDate =  record.data.date;
	    	}
	    	else{
    		   var lastIndex=record.store.data.items.length-1;
				fromDate=record.store.data.items[0].data.date;
				toDate =record.store.data.items[lastIndex].data.date ; 
	    	}

		    var header = {
				reference: 'onActivateDashboardLoanCountDateWise'
			};

    		var payload = [{
	            userModKey	: loginUser.id,
	            deptName	: deptName,
				fromDate4Src: fromDate,
				toDate4Src: toDate,
	        }];
	        this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_COUNT_DATE_WISE, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
    	
    	}else if(panelType=="LoanStatusDeptWise"){
    		cmp.lookupReference('lmsPPCExcelReport').setHidden(false);
    		cmp.lookupReference('lmsMISExcelReport').setHidden(false);

    		var actionType;

    		if(typeof  girdfiltervalue !== "undefined" && girdfiltervalue !=null && girdfiltervalue !='')
			{
			 cmp.lookupReference('loanGridLocalFilter').setValue(girdfiltervalue);
			}

			if(dateType=='Modification'){
			   actionType = appActionType.ACTION_TYPE_SELECT_LOAN_STATUS_DEPT_WISE;
			}else{
				actionType = appActionType.ACTION_TYPE_CREATION_DATE_WISE_DEPT_LOAN;
			}
 			
    		var fromDate;
			var toDate;
			if(cellClickIndecate=="selectCell"){
				fromDate = record.data.date;
    		    toDate =  record.data.date;
	    	}
	    	else{
    		   var lastIndex=record.store.data.items.length-1;
				fromDate=record.store.data.items[0].data.date;
				toDate =record.store.data.items[lastIndex].data.date ; 
	    	}

		    var header = {
				reference: 'onActivateDashboardDetailsLoanStatusDeptWise'
			};

    		var payload = [{
	            userModKey	: loginUser.id,
	            deptName	: deptName,
				fromDate4Src: fromDate,
				toDate4Src: toDate,
	        }];
	        this.sendRequest(actionType, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
    	
    	}else if(panelType=='OnProcessPpc'){
            var fromDate;
			var toDate;
			if(typeof  girdfiltervalue !== "undefined" && girdfiltervalue !=null && girdfiltervalue !='')
			{
			 cmp.lookupReference('loanGridLocalFilter').setValue(girdfiltervalue);
			}

			if(cellClickIndecate=="selectCell"){
				fromDate = record.data.column0;
    		    toDate =  record.data.column0;
	    	}
	    	else{
    		   var lastIndex=record.store.data.items.length-1;
				fromDate= record.store.data.items[0].data.column0;
				toDate = record.store.data.items[lastIndex].data.column0;
	    	}
    		cmp.lookupReference('lmsPPCExcelReport').setHidden(false);
    		cmp.lookupReference('lmsMISExcelReport').setHidden(false);
    		var loginName = deptName;

    		var header = {
				reference: 'onActivateDashboardDetailsPpcStatus'
			};

    		var payload = [{
	            userModKey	: loginUser.id,
	            loginName : loginName,
				fromDate4Src: fromDate,
				toDate4Src: toDate,
				total : total
	        }];
	        this.sendRequest(appActionType.ACTION_TYPE_SELECT_PPC_STATUS_WISE_DATA, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);    	
    	}else{
	    	var deptName = cmp.lookupReference('deptName').value;
	    	var record = cmp.lookupReference('record').value;

	    	if(typeof  girdfiltervalue !== "undefined" && girdfiltervalue !=null && girdfiltervalue !='')
			{
			 cmp.lookupReference('loanGridLocalFilter').setValue(girdfiltervalue);
			}

	    	if(deptName == "Grand Total" || deptName == "Date"){
	    		deptName = null;
	    	}

	    	var fromDate;
			var toDate;

			if(record.data.column0 == "Grand Total"){
				fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
				fromDate = Ext.Date.format(fromDate, 'Y-m-d');

				toDate = new Date();
				toDate = Ext.Date.format(toDate, 'Y-m-d');
			}
			else{
				fromDate = record.data.column0;
				toDate = record.data.column0;
			}

	    	var header = {
				reference: 'onActivateDashboardDetailsWin'
			};

			var payload = [{
	            userModKey	: loginUser.id,
	            deptName	: deptName,
				fromDate4Src: fromDate,
				toDate4Src: toDate,
	        }];

			this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_FOR_DEPT_BY_DATE, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);	 
    	}
 	},

    onClickLoanSearchClearFromDashboard: function () {
		this.lookupReference('accountNo').reset();
		this.lookupReference('bpNoSrc').reset();
		this.lookupReference('nid4Search').reset();
		this.lookupReference('phone4Search').reset();
		this.lookupReference('fromDate').reset();
		this.lookupReference('toDate').reset();
		this.lookupReference('applicationNoSrc').reset();
		this.lookupReference('loanTrackingId').reset();
	},
	onClickSearchClear: function(){
		this.lookupReference('loanTrackingId').reset();
		this.lookupReference('bpNoSrc').reset();
		this.lookupReference('nid4Search').reset();
		this.lookupReference('account4Search').reset();
		this.lookupReference('customerName4Search').reset();
		this.lookupReference('fromDate').reset();
		this.lookupReference('toDate').reset();
	},

	onClickLoanSearchFromDashboard: function () {
		var me = this;

		var accountNo = me.lookupReference('accountNo').value;
		var bpNoSrc = me.lookupReference('bpNoSrc').value;
		var nid4Search = me.lookupReference('nid4Search').value;
		var phone4Search = me.lookupReference('phone4Search').value;
		var applicationNo = me.lookupReference('applicationNoSrc').value;
		var loanTrackingId = me.lookupReference('loanTrackingId').value;

		var fromDate = me.lookupReference('fromDate').value;
		var toDate = me.lookupReference('toDate').value;

		if (!fromDate) fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
		if (!toDate) toDate = new Date();

		if (toDate.getTime() < fromDate.getTime()) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}

		if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}

		accountNo = accountNo ? accountNo : null;
		bpNoSrc = bpNoSrc ? bpNoSrc : null;
		nid4Search = nid4Search ? nid4Search : null;
		phone4Search = phone4Search ? phone4Search : null;
		fromDate = Ext.Date.format(fromDate, 'Y-m-d');
		toDate = Ext.Date.format(toDate, 'Y-m-d');
		applicationNo = applicationNo ? applicationNo : null;
		loanTrackingId = loanTrackingId ? loanTrackingId : null;

		var header = {
			reference: 'onClickLoanSearchFromDashboard'
		};

		var payload = [{
			userModKey: loginUser.id,
			accountNo4Src: accountNo,
			bpNo4Src: bpNoSrc,
			nid4Src: nid4Search,
			phone4Src: phone4Search,
			fromDate4Src: fromDate,
			toDate4Src: toDate,
			applicationNo4Src: applicationNo,
			loanTrackingId4Src: loanTrackingId
		}];

		me.sendRequest(appActionType.ACTION_TYPE_SEARCH_LOAN_FOR_DASHBOARD_VIEW, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);
	},

	onClickLoanTrackerDeptWiseSearch: function (){
		var me = this;
		var loanTrackingId = me.lookupReference('loanTrackingId').value;
		var bpNoSrc = me.lookupReference('bpNoSrc').value;
		var nid4Search = me.lookupReference('nid4Search').value;
		var customerName4Search = me.lookupReference('customerName4Search').value;
		var fromDate = me.lookupReference('fromDate').value;
		var toDate = me.lookupReference('toDate').value;
		var account4Search =this.lookupReference('account4Search').value;

		if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}

		if (!fromDate && !toDate && !bpNoSrc && !nid4Search
			&& !loanTrackingId && !customerName4Search && !account4Search){
			Ext.Msg.alert('Error', 'Enter from date To to date.');
			return;
		}else if(fromDate && !toDate && !bpNoSrc && !nid4Search
			&& !loanTrackingId && !customerName4Search && !account4Search){	
			Ext.Msg.alert('Error', 'To date must not be Empty.');
			return;			
		}else if(!fromDate && toDate && !bpNoSrc && !nid4Search
			&& !loanTrackingId && !customerName4Search && !account4Search){	
			Ext.Msg.alert('Error', 'From date must not be Empty.');
			return;			
		}

		if (toDate < fromDate) {
			Ext.Msg.alert('Error', 'To date must be greater then from date.');
			return;
		}
		if (!fromDate && !toDate){
			var d = new Date(1971, 0, 0, 18, 30);
			fromDate = d;
			toDate = new Date();
		}

		customerName4Search = customerName4Search ? customerName4Search : null;
		bpNoSrc = bpNoSrc ? bpNoSrc : null;
		nid4Search = nid4Search ? nid4Search : null;
		fromDate =  fromDate ? Ext.Date.format(fromDate, 'Y-m-d') : null;
		toDate = toDate ? Ext.Date.format(toDate, 'Y-m-d') : null;
		loanTrackingId = loanTrackingId ? loanTrackingId : null;
		account4Search = account4Search ? account4Search : null;

		var header = {
			reference: 'onClickLoanTrackerDeptWiseSearch'
		};

		var payload = [{
			userModKey: loginUser.id,
			bpNo4Src: bpNoSrc,
			nid4Src: nid4Search,
			fromDate4Src: fromDate,
			toDate4Src: toDate,
			loanTrackingId4Src: loanTrackingId,
			customerName : customerName4Search,
			accountNo4Src : account4Search,
		}];
		me.sendRequest(appActionType.ACTION_TYPE_SEARCH_LOAN_TRACKER_DEPT_WISE, appContentType.CONTENT_TYPE_LMS_DASHBOARD, payload, header);

	},

	onDashboardGrdSelChng: function (cmp, records, eOpts) {
		var ppcExcelReport = this.lookupReference('lmsPPCExcelReport');
		var misCrmExcelReport = this.lookupReference('lmsMISExcelReport');

		misCrmExcelReport.setDisabled(true);
		ppcExcelReport.setDisabled(true);

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

		}
	},

	generateDashboardPPCExcelReport: function (button) {

		console.log("Generating PPC MIS Excle excel Report");

		var me = this;
		var grid = me.lookupReference('dashboardDetailsGrid');
		var selectedRows = grid.getSelection().length;
		var reportName = 'PPC Excel Report';
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

	generateDashboardMISExcelReport: function (button) {

		console.log("Generating CRM-MIS-Excel Report");

		var me = this;
		var grid = me.lookupReference('dashboardDetailsGrid');
		var selectedRows = grid.getSelection().length;
		var reportName = 'MIS-CRM-Excel';
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


	onGridFilterEntryChange: function (component, newValue, oldValue, eOpts) {
		var grid = component.up('grid');
		this.filterOnDashboardGrid(grid, newValue, dashboardResultFiler);
	},
	filterOnDashboardGrid: function (grid, newValue, arrOfResultFiler) {
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

	onGridDataRenderer : function(value, meta) {
	    if(!value) {
	        meta.style = "background-color:#FFCCCB;";
	    } else {
	        meta.style = "background-color:	#98FB98; cursor: pointer;";
	    }

	    return value;
	},
	onBeforeLoadDashboardPanel: function (cmp, eOpts) {
		var store = getGlobalStore('gDashboardDetailsViewGridStore');
		store.clearFilter()
		store.removeAll();		
	},
	onEmployeeInInfor: function(cmp, eOpts){
		this.lookupReference('employeeValue').setReadOnly(false);
		this.lookupReference('employeeValue').setFieldStyle('background: #FDFEFE');
	},

});

function getDashboardDetailsWindow(title) {
	var win = Ext.create('Ext.window.Window', {
		height: 610,
		width: 1000,
		layout: 'fit',
		itemId: 'dashboardDetailsWin',
		reference: 'dashboardDetailsWin',
		maximizable: true,
		constrainHeader: true,
		closeAction: 'destroy',
		autoScroll: true,
		title: title,
		modal: true,
		listeners: {
			close: function (cmp, eOpts) {
				//getGlobalStore('gCibStatusCommentStore').clearData();
			}
		},
		items: [{
			xtype: 'dashboardDetails'
		}]
	});

	dashboardDetailsWinToClose = win;

	return win;
}

function getLoadAbleDataInGrid(data){
	var loginNameIdxMap = {};
	for (var i = 0; i < data.userList.length; i++) {
		loginNameIdxMap[data.userList[i].loginName] = i;
	}

	var dateIdxMap = {};
	for (var i = 0; i < data.dateList.length; i++) {
		dateIdxMap[data.dateList[i].date] = i;
	}

	var arr = [];
	var rows = data.dateList.length;
	var columns = data.userList.length;
	fill2DimensionsArray(arr, rows, columns);

	for (var i = 0; i < data.dataList.length; i++) {
		var dateIxd = dateIdxMap[data.dataList[i].date];
		var loginNameIdx = loginNameIdxMap[data.dataList[i].loginName];

		if(!arr[dateIxd][loginNameIdx]) arr[dateIxd][loginNameIdx] = 1;
		else arr[dateIxd][loginNameIdx] ++;
	}

	var gridData = [];

	for (var i = 0; i < rows; i++) {
		var gridRow = {
			column0 : Object.keys(dateIdxMap).find(key => dateIdxMap[key] === i)
		}
		for (var j=0; j<columns; j++){
			gridRow['column' + (j+1)] = arr[i][j];
		}
		gridData.push(gridRow);
	}

	return gridData;
}

function getLoadAbleColumnsInGrid(data, gridData){
	var columns = [];

	var colRowCount = {
        header: "#",
        sortable: false,
        xtype: 'rownumberer',
        width: 30,
        filter: {
            type: 'list'
        }
    }

	var column = {
        xtype: 'gridcolumn',
        cls: 'content-column',
        dataIndex: 'column0',
        text: 'Date',
        sortable: true,
        align: 'center',
        summaryType: 'count',
        summaryRenderer: function(value, summaryData, dataIndex) {
            return '<b>Total</b>'; 
        }
    }
    columns.push(colRowCount);
    columns.push(column);

	for (var i = 0; i < data.userList.length; i++) {
		var column = {
            xtype: 'gridcolumn',
            cls: 'content-column',
            dataIndex: 'column' + (i + 1),
            text: data.userList[i].loginName,
            sortable: true,
            align: 'center',
            summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
             if(isNaN(value)){
                    return 0;      
                }else{
                    return Ext.String.format('<h7 style="background-color:#98FB98;cursor:pointer;">{0}</h7>', value);       
                }
            },
            renderer : function(value, meta) {
			    if(!value) {
			        meta.style = "background-color:#FFCCCB;";
			    } else {
			        meta.style = "background-color:	#98FB98;cursor: pointer;";
			    }

			    return value;
			}
        }
        columns.push(column);
	}

    return columns;
}

function fill2DimensionsArray(arr, rows, columns){
    for (var i = 0; i < rows; i++) {
        arr.push([0])
        for (var j = 0; j < columns; j++) {
            arr[i][j] = 0;
        }
    }
}


function getModKeyAsPayload(){

	if(loginUser == null ||  loginUser == '') {
			loginUser=gLoginUuser;
		}
		else{
			loginUser=loginUser;
		}

	var payload = [{
        userModKey	: loginUser.id
    }];

    return payload;
}
