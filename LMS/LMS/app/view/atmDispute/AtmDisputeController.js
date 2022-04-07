var atmDisputeWinToClose;
var disputePanel = null ;
var arrOfDisputResultFiler = new Array('trackingNumber', 'accountNumber', 'cardNumber', 'txnAmount', 'stateName');
Ext.define('Desktop.view.atmDispute.AtmDisputeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.atmDisputeController',

    onSuccess: function(request, response) {
        var controller = request.sender;
        var headerRef = request.header.reference;

        if (isMessageBox) {
            Ext.MessageBox.hide();
            isMessageBox = false;
        }

        var data = response.payload[1].payload;
        if (headerRef == 'onLoadDisputeGridData') {
            var statusTreePanel = controller.lookupReference('atmDisputeStatusTree');

            if (!statusTreePanel) {
                statusTreePanel = disputePanel.lookupReference('atmDisputeStatusTree');
            }

            if (statusTreePanel) {
                loadDisputeStatusTree(data, statusTreePanel);
            }

            var store = getGlobalStore('gAtmDisputeViewStore');
                store.clearFilter()
                store.removeAll();

            loadDataInGlobalStore(data, 'gAtmDisputeViewStore');

            var check = controller.lookupReference('atmDisputeStatusGridRefresh');


            if (headerRef == 'onLoadDisputeGridData' && check != null) {
                //enable refresh button
                controller.lookupReference('atmDisputeStatusGridRefresh').setDisabled(false);
            }

        }else if(headerRef == 'onActivateNewDisputeDetailsWin'){
            setDisputeData(controller.getView(), data);
            if(data.stateName == 'REQUESTED'){
                 controller.lookupReference('rejecteBtn').setHidden(false);
                  controller.lookupReference('resolveBtn').setHidden(false);

            }
        }else if(headerRef == 'executeStateTransitionDispute'){
            controller.onRefreshDisputeGridData(controller.getView());
            atmDisputeWinToClose.close();
            Ext.toast('Action completed succcessfully.');
        }
        else{
            console.log('No Header');
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
    onDisputeStatusTreeChildClick: function(cmp, rec) {
        if (!rec.data.reference) return;

        var grid = this.lookupReference('atmDisputeHome').activeTab.down('gridpanel');
        var arr = new Array('folderName');

        var selectAll = false;

        var filterParm = new Array();
        var selected = cmp.getSelectionModel().getSelected().items;
        selected.forEach(function(it) {
            if (it.data.reference) {
                if (it.data.reference === "ALL") {
                    selectAll = true;
                }
                filterParm.push(it.data.reference.split(':')[1])
            }
        });

        if (selectAll) {
            grid.store.clearFilter();
        } else {
            this.filterDisputeGridByMultiValue(grid, filterParm, arr);
        }
    },
    filterDisputeGridByMultiValue: function(grid, newValueArr, arrOfResultFiler) {
        grid.store.clearFilter();
        if (newValueArr === undefined || newValueArr.length == 0) return;
        else {
            grid.store.filter({
                filterFn: function(record) {
                    var match = false;
                    Ext.Object.each(record.data, function(property, value) {
                        if (arrOfResultFiler.indexOf(property) > -1) {
                            match = match || newValueArr.includes(String(value));
                        }
                    });
                    return match;
                }
            });
        }
    },
    onDisputeStatusTreeDblClick: function(cmp, rec) {
        if (rec.data.reference) return;

        var recc = this.lookupReference('atmDisputeMainSearchGrid').store.findRecord('customerComplaintKey', rec.data.customerComplaintKey);
        this.onDisputeGridItemDblClick(cmp, recc);
    },
    onDisputeGridItemDblClick: function(view, rec, item, index, e) {
        showProcessMessage('Loading...');
        disputePanel = this;

        var disputeDetailsPanelWin = this.getDisputeWindow(this.buildDisputeTitle(rec.data));       
        var disputeDetailsPanel = disputeDetailsPanelWin.down('#disputeDetails');    
            disputeDetailsPanel.lookupReference('customerComplaintKey').setValue(rec.data.customerComplaintKey);
        Ext.MessageBox.hide();
        isMessageBox = false;
        disputeDetailsPanelWin.show();
    },
        
    buildDisputeTitle : function(data) {
        var cardNumber = data.cardNumber;
        var accountNumber = data.accountNumber;
        var trackingNumber = data.trackingNumber;

        var state = data.stateName;

        return "Tracking Number : " + trackingNumber + ", ACCOUNT : " + accountNumber +", State : " + state;
    },
    getDisputeWindow : function (title) {
        var win = Ext.create('Ext.window.Window', {
            height: 390,
            width: 350,
            layout: 'fit',
            itemId: 'disputeDetailsWin',
            reference: 'disputeDetailsWin',
            maximizable: true,
            constrainHeader: true,
            closeAction: 'destroy',
            autoScroll: true,
            title: title,
            modal: true,
            items: [{
                xtype: 'disputeDetails'
            }]
        });

        atmDisputeWinToClose = win;

        return win;
    },
    onActivateCardPanelRender: function(cmp, eOpts){
        var actionType = appActionType.ACTION_TYPE_SELECT_ATM_DISPUTE_FOR_GRID;
        this.onLoadDisputeGridData(actionType);
    },
    onLoadDisputeGridData: function(cmp, eOpts){
        var actionType = appActionType.ACTION_TYPE_SELECT_ATM_DISPUTE_FOR_GRID;
        this.onSearchAtmDispute(actionType);
    },
    onClickSearchAtmDispute : function(cmp, eOpts){
        var actionType = appActionType.ACTION_TYPE_SELECT_ATM_DISPUTE_FOR_GRID;
        this.onSearchAtmDispute(actionType);

    },
    onRefreshDisputeGridData: function(cmp){
         if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var searchData = JSON.parse(localStorage.getItem('disputeSearchParam'));

        var name = searchData.name;
        var cardNumber = searchData.cardNumber;
        var accountNumber = searchData.accountNumber;
        var atmLocation = searchData.atmLocation;
        var fromDate4Src = searchData.fromDate4Src;
        var toDate4Src = searchData.toDate4Src;
        var actionType = appActionType.ACTION_TYPE_SELECT_ATM_DISPUTE_FOR_GRID;

        var header = {
            reference: 'onLoadDisputeGridData'
        };

        var payload = [{
            userModKey: loginUser.id,
            name: name ? name : null,
            cardNumber: cardNumber ? cardNumber : null,
            accountNumber: accountNumber ? accountNumber : null,
            atmLocation: atmLocation ? atmLocation : null,
            fromDate4Src: fromDate4Src,
            toDate4Src: toDate4Src,
            actionType: actionType,
        }];

        this.sendRequest(actionType, appContentType.CONTENT_TYPE_COMPLAINT, payload, header);

    },
    onSearchAtmDispute: function(actionType) {
        var me = this;
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var fromDate;
        var toDate;

        var name = me.lookupReference('name').value;
        var cardNumber = me.lookupReference('cardNumber').value;
        var accountNumber = me.lookupReference('accountNumber').value;
        var atmLocation = me.lookupReference('atmLocation').value;
        var action;

        if (!fromDate && !name && !cardNumber && !accountNumber && !atmLocation) {
            fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
        }

        if (!toDate) toDate = new Date();

        toDate = Ext.Date.format(toDate, 'Y-m-d');
        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
        showProcessMessage('Loading data....');

        var header = {
            reference: 'onLoadDisputeGridData'
        };

        var payload = [{
            userModKey: loginUser.id,
            name: name ? name : null,
            cardNumber: cardNumber ? cardNumber : null,
            accountNumber: accountNumber ? accountNumber : null,
            atmLocation: atmLocation ? atmLocation : null,
            fromDate4Src: fromDate,
            toDate4Src: toDate,
            actionType: actionType,
        }];

        localStorage.setItem('disputeSearchParam', JSON.stringify(payload[0]));
        me.sendRequest(actionType, appContentType.CONTENT_TYPE_COMPLAINT, payload, header);
    },
    onAtmDisputeRefreshStatusTree: function() {
        showProcessMessage('Loading data....');
        // this.lookupReference('cardStatusGridRefresh').setDisabled(true);
        this.executeDisputeActionOnTabChange(this.lookupReference('atmDisputeHome').activeTab.id, 'onAtmDisputeRefreshStatusTree');
    },
    executeDisputeActionOnTabChange: function(tabId, ref) {
        var me = this;
        disputePanel = this;
        if (tabId == 'atmDisputeSearchPanel') {
            if (ref == 'onAtmDisputeRefreshStatusTree') {
                me.onClickAtmDisputeClear();
            }
            me.onLoadDisputeGridData();
        }
    },
    onClickAtmDisputeClear: function() {
        this.lookupReference('name').reset();
        this.lookupReference('cardNumber').reset();
        this.lookupReference('accountNumber').reset();
        this.lookupReference('atmLocation').reset();
    },
    onAtmDisputeGridFilter:function(component, newValue, oldValue, eOpts){
        var grid = component.up('grid');
        this.filterDisputeGrid(grid, newValue, arrOfDisputResultFiler);
    },
    filterDisputeGrid: function(grid, newValue, arrOfDisputResultFiler) {
        grid.store.clearFilter();
        if (newValue) {
            var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
            grid.store.filter({
                filterFn: function(record) {
                    var match = false;
                    Ext.Object.each(record.data, function(property, value) {
                        if (arrOfDisputResultFiler.indexOf(property) > -1) {
                            match = match || matcher.test(String(value));
                        }
                    });
                    return match;
                }
            });
        }
    },
    onClickCloseDispute: function (button, e, eOpts) {
        atmDisputeWinToClose.close();
    },
    onActivateNewDisputeDetailsWin : function (button, e, eOpts) {
        var customerComplaintKey = this.lookupReference('customerComplaintKey').value;
        if (!Ext.isEmpty(customerComplaintKey)) {
                var header = {
                    reference: 'onActivateNewDisputeDetailsWin'
                };
                var payload = [{
                userModKey: loginUser.id,          
                customerComplaintKey: customerComplaintKey ? customerComplaintKey : null,
            }];
            this.sendRequest(appActionType.SELECT_FULL_ATM_DISPUTE, appContentType.CONTENT_TYPE_COMPLAINT, payload, header);
        }        
    },
     //onClickResolve
    onClickResolve: function(btn) {
        this.executeStateTransitionDispute(this, appActionType.ACTION_TYPE_RESOLVED_DISPUTE);
    },
     //reject
    onClickRejecte: function(btn) {
        this.executeStateTransitionDispute(this, appActionType.ACTION_TYPE_REJECTED_DISPUTE);
    },
    executeStateTransitionDispute: function(cardDetailsPanel, action) {
        var me = this;
        Ext.Msg.show({
            title: 'Attention',
            message: 'Are your sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn == 'yes') {
                    var actionType;
                    var customerComplaintKey = me.lookupReference('customerComplaintKey').value;
                    var stateName = me.lookupReference('hiddenStateName').value;
                    var stateId = me.lookupReference('hiddenStateId').value;

                    showProcessMessage('Executing action....');

                    var header = {
                        reference: 'executeStateTransitionDispute'
                    };

                    var payload = [{
                        customerComplaintKey: customerComplaintKey,
                        stateName: stateName,
                        stateId: stateId,
                        userModKey: loginUser.id,
                        uiActionName: action
                    }];

                    me.sendRequest(appActionType.ACTION_STATE_TRANSITION, appContentType.CONTENT_TYPE_COMPLAINT, payload, header);
                }
            }
        });
        Ext.defer(function() { Ext.Msg.toFront() }, 200);
    },

});

    function loadDisputeStatusTree(data, disputeStatusTree) {

        var disputeStatusTreeChild = disputeStatusTree.down('#disputeStatusTreeChildPanel');
        if (disputeStatusTreeChild) {
            disputeStatusTree.remove(disputeStatusTreeChild);
        }

        var newSubTreeForAll = {
            "text": 'ALL(0)',
            "reference": 'ALL',
            "expanded": false,
            "children": []
        };

        var tree = [];
        var statusdisputeMap = {};

        for (var i = 0; i < data.length; i++) {

            var child = {
                "text": getDisputeStatusChildText(data[i]),
                "leaf": true,
                "customerComplaintKey": data[i].customerComplaintKey
            };
            newSubTreeForAll.children.push(child);

            var arr = [];
            if (statusdisputeMap[data[i].folderName]) {
                arr = statusdisputeMap[data[i].folderName];
            }
            arr.push(child);
            statusdisputeMap[data[i].folderName] = arr;
        }

        newSubTreeForAll.text = "ALL(" + newSubTreeForAll.children.length + ")";
        tree.push(newSubTreeForAll);

        for (var key in statusdisputeMap) {
            var newSubTree = {
                "text": key + '(' + statusdisputeMap[key].length + ')',
                "reference": 'STATE_NAME :' + key,
                "expanded": false,
                "children": statusdisputeMap[key]
            };
            tree.push(newSubTree);
        }

        // CREATE SUB TREE AND ADD TO TREE PANEL
        var treePanel = Ext.create('Ext.tree.Panel', {
            itemId: 'disputeStatusTreeChildPanel',
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
                itemdblclick: 'onDisputeStatusTreeDblClick',
                itemclick: 'onDisputeStatusTreeChildClick'
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
        disputeStatusTree.insert(0, treePanel);
    }
   function  getDisputeStatusChildText(data) {
        var returnValue;

        returnValue = data.trackingNumber + '-' + data.stateName;
        return returnValue;

    }
    function setDisputeData(cmp, data) {
        cmp.lookupReference('customerComplaintKey').setValue(data.customerComplaintKey);
        cmp.lookupReference('customerComplaintVer').setValue(data.customerComplaintVer);
        cmp.lookupReference('txnDate').setValue(data.txnDate ? new Date(data.txnDate.substr(0, 10)) : null);
        cmp.lookupReference('atmOwner').setValue(data.atmOwner);
        cmp.lookupReference('txnAmount').setValue(data.txnAmount);
        cmp.lookupReference('accountNumber').setValue(data.accountNumber);
        cmp.lookupReference('cardNumber').setValue(data.cardNumber);
        cmp.lookupReference('atmLocation').setValue(data.atmLocation);
        cmp.lookupReference('comment').setValue(data.comment);
        cmp.lookupReference('trackingNumber').setValue(data.trackingNumber);
        cmp.lookupReference('hiddenStateName').setValue(data.stateName);
        cmp.lookupReference('hiddenStateId').setValue(data.stateId);
    }
