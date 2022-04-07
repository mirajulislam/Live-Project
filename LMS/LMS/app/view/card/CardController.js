var cardResultFiler = new Array('ccTrackingNumber', 'applicationNo', 'accountNo', 'idCustomerTypeKey', 'interestRate', 'mobile', 'customerIdKey', 'customerId', 'customerType', 'bpNo', 'customerName', 'designation', 'dateOfBirth', 'joiningDate', 'officeAddr', 'nid', 'tin', 'maritalStatus', 'motherName', 'fatherName', 'spouse');
var fieldSetInDetailsWinFO = new Array('applicantPersonalInfoField', 'salaryFinancialInformationDetails', 'creditCardLimitInformation', 'autoDebitRequest', 'creditCardDeclaration');
var fieldSetInDetailCO = new Array('applicantPersonalInfoField', 'salaryFinancialInformationDetails', 'creditDivisionLimitRecommendation', 'autoDebitRequest', 'commentsJustification', 'cibStatusFldSet', 'approvalFromBranchOfficea', 'checkingAreas', 'commentsDeviation');
var fieldSetInDetailOthers = new Array('applicantPersonalInfoField', 'salaryFinancialInformationDetails', 'cardLimiteDetails', 'analystsComments', 'instrucationsToCAD', 'exceptionDetailsField', 'approvalFromHeadOffice', 'existingLiabilitiesFieldCard');
var cardDetailsWinToClose;
var cardPanel = null;
var groupCardPanel;
var acquisitionPanel = null;
var addCardToCardGroupWindow;
var carduplicationView;
var carDuplicationWinToClose;
var cardCibDetailsWinClose;
var cardCibReport;
var acquisitionWinToClose;
var multipleCardReportPanel;
Ext.define('Desktop.view.card.CardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cardPanel',

    onSuccess: function(request, response) {
        var controller = request.sender;
        var headerRef = request.header.reference;

        if (isMessageBox) {
            Ext.MessageBox.hide();
            isMessageBox = false;
        }

        var data = response.payload[1].payload;

        if (headerRef == 'onCardTypeDataShow') {
            loadDataInGlobalStore(data, 'gCardTypeStore');
            loadCreateNewCardTree(getGlobalStore('gCardTypeStore').data.items, controller.lookupReference('createNewCardTree'));
        } else if (headerRef == 'loadCustomerType') {
            loadDataInGlobalStore(data, 'gCustTypeStore');
        } else if (headerRef == 'onClickCardSearch') {
            var statusTreePanel = controller.lookupReference('cardStatusTree');

            if (!statusTreePanel) {
                statusTreePanel = cardPanel.lookupReference('cardStatusTree');
            }

            if (statusTreePanel) {
                loadCardStatusTree(data, statusTreePanel);
            }

            loadDataInGlobalStore(data, 'gCardGridViewStore');

            var check = controller.lookupReference('cardStatusGridRefresh');


            if (headerRef == 'onClickCardSearch' && check != null) {
                //enable refresh button
                controller.lookupReference('cardStatusGridRefresh').setDisabled(false);
            }
        } else if (headerRef == 'onLoadAcquisitionData') {
            var store = getGlobalStore('gAcquisitionViewStore');
            store.clearFilter()
            store.removeAll();
            loadDataInGlobalStore(data, 'gAcquisitionViewStore');
            var statusTreePanel = controller.lookupReference('cardStatusTree');
            if (!statusTreePanel) {
                statusTreePanel = cardPanel.lookupReference('cardStatusTree');
            }

            if (statusTreePanel) {
                loadCardStatusTree(data, statusTreePanel);
            }

        } else if (headerRef == 'onClickSearchCustomer' || headerRef == 'onClickSearchFO') {
            if (!data.customerIdKey) {
                Ext.MessageBox.alert('Alert', 'Customer not found.');
            } else {
                expandedSet(controller.getView());
                setCustomerInfoC(controller.getView(), data);
                setCbblAccountNoC(controller, data.accountNo);

                var customerType = controller.lookupReference('customerType').value;
                var hiddenCustomerType = controller.lookupReference('hiddenCustomerType').value;
                if (!customerType && hiddenCustomerType) {
                    controller.loadCustomerType();
                }
            }
        } else if (headerRef == 'duplicateBpNumberLoanCheck') {
            var searchData = JSON.parse(localStorage.getItem('loanSearchParam'));
            var bpNoSc = searchData.bpNo;
            if (data.length > 0) {
                if (data[0].duplicationCheckSameBp > 0) {
                    Ext.Msg.show({
                        title: 'Duplicate',
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
                    Ext.defer(function() { Ext.Msg.toFront() }, 200);
                } else {
                    controller.onKeyPressCustomerSrc("bpNo", bpNoSc, "BP No");
                }
            } else {
                controller.onKeyPressCustomerSrc("bpNo", bpNoSc, "BP No");
            }
        } else if (headerRef == 'onSaveApplication' || headerRef == 'onUpdateApplication' || headerRef == 'onDeleteApplicationCard') {
            controller.onRefreshGridCard(controller.getView());
            cardDetailsWinToClose.close();
        } else if (headerRef == 'onActivateCardDetailsWin') {
            controller.lookupReference('isLoading').setValue('true');
            controller.getView().lookupReference('hiddenCardRawData').setValue(data);
            setCustomerInfoC(controller.getView(), data.customer);
            var accountNo;
            if (data.accountNo) {
                accountNo = data.accountNo;
            } else {
                accountNo = data.customer.accountNo
            }
            setCbblAccountNoC(controller, accountNo);

            setCardData(controller.getView(), data);
            setHiddenCardInfo(controller.getView(), data);

            loadDataInGlobalStore(data.cibStatusList, 'gCibStatusCommentStoreCard');
            loadDataInGlobalStore(data.analystsCommentsList, 'gAnalystCommentStoreCard');
            loadDataInGlobalStore(data.exceptionDetailsList, 'gExceptionDetailStoreCard');
            loadDataInGlobalStore(data.instructionToCadList, 'gIns2CADStoreCard');
            loadDataInGlobalStore(data.existingLiabilityList, 'gExistingLiabilitiesStoreCard');
            loadDataInGlobalStore(data.cmntJustificationList, 'gCmntJustificationStoreCard');
            loadDataInGlobalStore(data.cmntDeivationList, 'gCmntDeviationsStore');
            // loadDataInGlobalStore(data.branchRecmndList, 'gBranchRecmndStore');
            loadDataInGlobalStore(data.cardDocumentList, 'gCardDocumentStore');
            checkAdditionalDcumentFiled(controller.getView(), data);
            checkNonAdditionalDcumentFiled(controller.getView(), data);
            checkDcumentFiled(controller.getView(), data);
            setCardDocObjForView(controller.getView(), data.cardDocumentList)
            setDefultRowOfAllGridCard();
            setDefaultIns2CadCard();
            if (!data.duplications) {
                controller.onCheckCardDuplicate(data.creditCardId);
            }
            if (data.cibReportStatusList) {
                var cibStatus = data.cibReportStatusList;

                cibStatus = cibStatus.replace('[', '');
                cibStatus = cibStatus.replace(']', '');
                var arr = cibStatus.split(', ');
                var cibStatusList = new Array();
                for (var i = 0; i < arr.length; i++) {
                    var x = new Desktop.model.CibStatusModel();
                    x.data.cibStatusName = arr[i];
                    cibStatusList.push(x);
                }
                loadDataInGlobalStore(cibStatusList, 'gCibCardStatusStore');
            } else {
                var store = getGlobalStore('gCibCardStatusStore');
                store.clearFilter()
                store.removeAll();
            }
            if (data.cardDocListForCibStatus.length > 0 && data.cardDocListForCibStatus[0].docType) {
                controller.lookupReference('viewCibStatus').setDisabled(false);
            }
            if (data.stateName == 'UH_APPROVE' || data.stateName == 'RM_APPROVE' ||
                data.stateName == 'HOCRM_APPROVE' || data.stateName == 'PRE_APPROVED') {
                controller.lookupReference('cibDetails').setDisabled(true);
            }
        } else if (headerRef == 'onActivateAcquisitionDetailsWin') {
            setAcquisitionApplicantDetails(controller.getView(), data);
            setReferAndSupplementData(controller.getView(), data.supplementAndReferDetails);
            if (data.cardStateName == 'PRE_APPROVED' || data.cardStateName == 'RM_APPROVE' || data.cardStateName == 'UH_APPROVE' || data.cardStateName == 'HOCRM_APPROVE') {
                console.log(data.cardStateName);
            } else {
                controller.lookupReference('acquisitionUpdateBtn').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn1').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn2').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn3').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn4').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn5').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn6').setHidden(false);
                controller.lookupReference('acquisitionUpdateBtn7').setHidden(false);
            }

            if (data.priviousOrganizationDetails.length > 0) {
                loadDataInGlobalStore(data.priviousOrganizationDetails, 'gPriviousOrganizationStore');
            }
            if (data.othersBankLiabilityPosition.length > 0) {
                loadDataInGlobalStore(data.othersBankLiabilityPosition, 'gOthersBankLiabilityStore');
            }
            if (data.aboutOtherBankDetails.length > 0) {
                loadDataInGlobalStore(data.aboutOtherBankDetails, 'gAboutOtherBankDetailsStore');
            }
            if (data.securityDetails.length > 0) {
                loadDataInGlobalStore(data.securityDetails, 'gSecurityDetailsStore');
            }
            if (data.companiesUderOwnership.length > 0) {
                loadDataInGlobalStore(data.companiesUderOwnership, 'gCompaniesUderOwnershipStore');
            }
            if (data.applicantDocumentList.length > 0) {
                checkAcquisitionDocument(data.applicantDocumentList, controller);
                loadDataInGlobalStore(data.applicantDocumentList, 'gCardDocumentStore');
            }
        } else if (headerRef == 'loadCardAllDocument') {
            loadDataInGlobalStore(data, 'gCardDocumentStore');
            controller.lookupReference('documenttation').setExpanded(false);
            controller.lookupReference('documenttation').setExpanded(true);
        } else if (headerRef == 'getCardPercent') {
            controller.lookupReference('interestRate').setValue(data.interestRate);
        } else if (headerRef == 'onSaveCibStatusCard') {
            handleAfterSaveCommentCard(data, controller, 'gCibStatusCommentStoreCard', 'cibStatusGrid');
        } else if (headerRef == 'onSaveAnalystsCommentCard') {
            handleAfterSaveCommentCard(data, controller, 'gAnalystCommentStoreCard', 'analystsCommentsGrid');
        } else if (headerRef == 'onSaveExceptionDetail') {
            handleAfterSaveCommentCard(data, controller, 'gExceptionDetailStoreCard', 'exceptionDetailGrid');
        } else if (headerRef == 'onSaveInstruction2CadCard') {
            handleAfterSaveCommentCard(data, controller, 'gIns2CADStoreCard', 'instrucationsToCADGrid');
        } else if (headerRef == 'onSaveCmntJustificationCard') {
            handleAfterSaveCommentCard(data, controller, 'gCmntJustificationStoreCard', 'cmntJustificationGrid');
        } else if (headerRef == 'onSaveCmntDeviation') {
            handleAfterSaveCommentCard(data, controller, 'gCmntDeviationsStore', 'cmntDeviationGrid');
        } else if (headerRef == 'onSaveCmntWaiverSought') {
            handleAfterSaveCommentCard(data, controller, 'gCmntDeviationsStore', 'cmntDeviationGrid');
        } else if (headerRef == 'onSaveSourceRecmnd') {
            handleAfterSaveCommentCard(data, controller, 'gSourceRecmndStoreCard', 'sourceRecmndGrid');
        } else if (headerRef == 'onSaveBranchRecmnd') {
            handleAfterSaveCommentCard(data, controller, 'gBranchRecmndStoreCard', 'branchRecmndGrid');
        } else if (headerRef == 'onActionSaveLiabilityCard') {
            loadDataInGlobalStore(data, 'gExistingLiabilitiesStoreCard');
            Ext.toast('Succcessfully Saved.');
            controller.lookupReference('existingLiabilitiesGridCard').getView().refresh();
        } else if (headerRef == 'onNewLiabilityCard') {
            loadDataInGlobalStore(data, 'gExistingLiabilitiesStoreCard');
            setLiabilityRowAtEndCard('gExistingLiabilitiesStoreCard');
            controller.lookupReference('existingLiabilitiesGridCard').getView().refresh();
        } else if (headerRef == 'onSaveLiabilityCard') {
            var store = getGlobalStore('gExistingLiabilitiesStoreCard');
            var items = store.data.items;

            items[items.length - 1].data.existingLiabilityId = data.existingLiabilityId;
        } else if (headerRef == 'executeStateTransitionFromLoanGrid') {
            //controller.onClickSearchCard();
        } else if (headerRef == 'executeStateTransitionDetailsPageCard') {
            controller.onRefreshGridCard(controller.getView());
            cardDetailsWinToClose.close();
            Ext.toast('Action completed succcessfully.');
        } else if (headerRef == 'onClickSaveCardActionComment') {
            controller.onRefreshGridCard(controller.getView());
            controller.getView().close();
            cardDetailsWinToClose.close();
            Ext.toast('Action completed succcessfully.');
        } else if (headerRef == 'onSaveCardNotes') {
            controller.lookupReference('loanNotes').reset();
            controller.onTabCardNotesOfActionPanel();
        } else if (headerRef == 'onTabCardNotesOfActionPanel') {
            loadDataInGlobalStore(data, 'gCardNotesStore');
        } else if (headerRef == 'loadCardQueryResponseGrid') {
            loadDataInGlobalStore(data, 'gCardQueryCmntStore');
        } else if (headerRef == 'onExpandCardComntOfActionPanel') {
            loadDataInGlobalStore(data, 'gCardCmntOfActionStore');
        } else if (headerRef == 'onCardSaveQueryResponse') {
            Ext.toast('Successfully Saved.');
            controller.lookupReference('queryResponseGrid').getView().refresh();

            controller.loadCardQueryResponseGrid(controller);
        } else if (headerRef == 'loadCardWorkHistoryGridData') {
            loadDataInGlobalStore(data, 'gCardWorkHistoryGridStore');

            var statusTreePanel = controller.lookupReference('cardStatusTree');
            if (statusTreePanel) {
                loadCardStatusTree(data, statusTreePanel);
            }
            //enable refresh button
            controller.lookupReference('cardStatusGridRefresh').setDisabled(false);
        } else if (headerRef == 'onCreateCardGroup') {
            controller.loadCardGroupGridPanelData();
            Ext.toast('Action completed Succcessfully');
        } else if (headerRef == 'onAddCardToCardGroup' || headerRef == 'onCardRemoveFromCardGroup') {
            var searchData = JSON.parse(localStorage.getItem('cardGroupAddParam'));
            var cardGroupId = searchData.cardGroupId;
            controller.onCardGroupGrid(cardGroupId);
            Ext.toast('Action completed Succcessfully');
        } else if (headerRef == 'onCardGroupGrid') {
            loadDataInGlobalStore(data, 'gAddToCardGroupGridViewStore');
            var cardStateNameVal = data[0].stateName;
            var stateName = data[0].stateName;

            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].approvedLimit != -2147483648) {
                    sum += data[i].approvedLimit;
                }
            }
            loadDataInGlobalStore(data, 'gAddToCardGroupGridViewStore');

            if (!controller && stateName == appConstants.REJECTED_FROM_GROUP) {
                controller = groupLoanPanel;
            }
            console.log(cardStateNameVal);
            controller.lookupReference('cardGroupStateName').setValue(cardStateNameVal);
            controller.lookupReference('cardGroupTotalFile').setValue(data.length);
            controller.lookupReference('cardGroupTotalAmount').setValue(sum);

        } else if (headerRef == 'loadCardGroupGridPanelData' || headerRef == 'onClickGroupingCardSearch') {
            loadDataInGlobalStore(data, 'gCardGroupGridViewStore');

            var statusTreePanel = controller.lookupReference('cardStatusTree');
            if (!statusTreePanel) {
                statusTreePanel = cardPanel.lookupReference('cardStatusTree');
            }

            if (statusTreePanel) {
                loadCardStatusTree(data, statusTreePanel);
            }
            // if(headerRef == 'loadCardGroupGridPanelData'){
            // 	//enable refresh button
            // 	controller.lookupReference('cardStatusGridRefresh').setDisabled(false);
            // }
        } else if (headerRef == 'onCardAddToCardGroupDetailsPanelLoad') {
            loadDataInGlobalStore(data, 'gAddToCardGroupGridViewStore');
        } else if (headerRef == 'SELECT_RECOMMEND_TO_ROLE_USER') {

            var recmndToProprtyMap = getCardRecmndToProprtyMap();

            var onGroupClickListener = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK];
            var onUserClickListener = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK];
            var recommendGroupMenu = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU];
            var recommendGroupMenuBtn = recmndToProprtyMap[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN];
            if (recommendGroupMenu) {
                var groupMenu = [];
                for (var i = 0; i < data.length; i++) {
                    var group = getCardRecomndAndReturnMenu(data[i], onGroupClickListener, onUserClickListener);
                    groupMenu.push(group);
                }

                controller.lookupReference(recommendGroupMenu).add(groupMenu);
                controller.lookupReference(recommendGroupMenuBtn).setDisabled(false);
            }
        } else if (headerRef == 'loadCardDataSource') {
            loadDataInGlobalStore(data, 'gCardSourceStore');
        } else if (headerRef == 'onLoadCardGroupDataARender') {
            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].approvedLimit != -2147483648) {
                    sum += data[i].approvedLimit;
                }
            }
            loadDataInGlobalStore(data, 'gAddToCardGroupGridViewStore');
            controller.lookupReference('cardGroupTotalFile').setValue(data.length);
            controller.lookupReference('cardGroupTotalAmount').setValue(sum);

        } else if (headerRef == 'onClickbtnCardSendToMd') {
            Ext.toast('Succcessfully Working.');
            var searchData = JSON.parse(localStorage.getItem('cardGroupAddParam'));
            var cardGroupId = searchData.cardGroupId;
            controller.onCardGroupGrid(cardGroupId);
            controller.lookupReference('isCardOnlyPrint').setValue(true);
        } else if (headerRef == 'onSaveUnlockCard') {
            Ext.toast('Succcessfully Working.');
            var searchData = JSON.parse(localStorage.getItem('cardGroupAddParam'));
            var cardGroupId = searchData.cardGroupId;
            controller.onCardUnlockGroupGrid(cardGroupId);
        } else if (headerRef == 'onClickbtnCardMdApproved') {
            Ext.toast('Succcessfully Working.');
            var searchData = JSON.parse(localStorage.getItem('cardGroupAddParam'));
            var cardGroupId = searchData.cardGroupId;
            controller.onCardGroupGrid(cardGroupId);
            controller.lookupReference('isCardOnlyPrint').setValue(true);
        } else if (headerRef == 'onAddToCardGroupSearch') {
            loadDataInGlobalStore(data, 'gAddToCardGroupGridViewStore');
            var cardGroupStateName = data[0].stateName;
            console.log(cardGroupStateName);
            groupCardPanel.lookupReference('cardGroupStateName').setValue(cardGroupStateName);
        } else if (headerRef == 'onCardGroupCommentsView') {
            var stateName = data[0].stateName;
            if (stateName == appConstants.REJECTED_CARD_GROUP) {
                controller.lookupReference('cardGroupRejectPanel').setHidden(false);
                if (data[0].hoCrmComment) {
                    controller.lookupReference('hoCrmCommentCard').setValue(data[0].hoCrmComment);
                    controller.lookupReference('hoCrmCommentCard').setHidden(false);
                }
                if (data[0].cadComment) {
                    controller.lookupReference('cadCommentCard').setValue(data[0].cadComment);
                    controller.lookupReference('cadCommentCard').setHidden(false);
                }
            }
        } else if (headerRef == 'onCardGroupGridViewMemo') {
            loadDataInGlobalStore(data, 'gAddToCardGroupGridViewStore');
            var stateNameVal = data[0].stateName;
            console.log(stateNameVal);
            if (groupCardPanel) {
                var cardGroupStateName = groupCardPanel.lookupReference('cardGroupStateName');
                if (cardGroupStateName) {
                    groupCardPanel.lookupReference('cardGroupStateName').setValue(stateNameVal);
                }
            }
        } else if (headerRef == 'onCheckCardDuplicate') {
            if (data.length > 0) {
                controller.lookupReference('duplications').setFieldStyle('background: #addfad');
                controller.lookupReference('duplications').setValue('FOUND');
            } else {
                controller.lookupReference('duplications').setValue('NOT FOUND');
                controller.lookupReference('checkCardDuplications').setDisabled(true);
            }
        } else if (headerRef == 'onClickCheckCardDuplications') {
            loadDataInGlobalStore(data, 'gCardDublicationGridStore');
            // if(data.length>0){
            // 	duplicationView.lookupReference('duplications').setFieldStyle('background: #addfad');
            // }
        } else if (headerRef == 'onCardActivateCibForm') {
            if (!data.nid) {
                Ext.create('Ext.window.MessageBox', {
                    alwaysOnTop: true,
                    closeAction: 'destroy'
                }).show({
                    title: 'Warning .............',
                    buttons: Ext.Msg.OK,
                    message: 'NID server not available .'
                });
            } else {
                setCardCibFormInformation(controller.getView(), data);
            }
        } else if (headerRef == 'onClickCardCheckInquiry' || headerRef == 'onClickCardNewPerson') {
            if (!data) {
                Ext.create('Ext.window.MessageBox', {
                    alwaysOnTop: true,
                    closeAction: 'destroy'
                }).show({
                    title: 'Not Found',
                    buttons: Ext.Msg.OK,
                    message: 'CIB Not Found .'
                });
            } else {
                var dockLink = data.docDownloadUrl;
                if (dockLink) {
                    var cibCardId = data.creditCardId;
                    var cibStatus = data.cibStatus;
                    if (cibStatus) {
                        var store = getGlobalStore('gCibCardStatusStore');
                        store.clearFilter()
                        store.removeAll();

                        var cibStatusList = new Array();
                        for (var i = 0; i < cibStatus.length; i++) {
                            var x = new Desktop.model.CibStatusModel();
                            x.data.cibStatusName = cibStatus[i];
                            cibStatusList.push(x);
                        }
                        loadDataInGlobalStore(cibStatusList, 'gCibCardStatusStore');
                    }

                    cardCibReport.lookupReference('cibStatusType').bindStore(getGlobalStore('gCibCardStatusStore'));

                    cardCibDetailsWinClose.close();
                    controller.viewFileByCardDocType(cibCardId, appConstants.CIB_STATUS);
                    if (cibStatus) {
                        cardCibReport.lookupReference('viewCibStatus').setDisabled(false);
                    }
                } else {
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
        } else if (headerRef == 'onCardReqCibStatusDoc') {
            // console.log(data);
            if (data && data.length > 0) {
                controller.lookupReference('viewCibStatus').setDisabled(false);
            } else {
                controller.lookupReference('viewCibStatus').setDisabled(true);
            }
        } else if (headerRef == 'onActivateCardDuplicateRender') {
            loadDataInGlobalStore(data, 'gCardDublicationGridStore');
        } else if (headerRef == 'onSavePreviousOrganization') {
            Ext.toast('Successfully Saved.');
            var store = getGlobalStore('gPriviousOrganizationStore');
            store.clearFilter()
            store.removeAll();
            loadDataInGlobalStore(data, 'gPriviousOrganizationStore');
        } else if (headerRef == 'onSaveOtherBankLiability') {
            Ext.toast('Successfully Saved.');
            var store = getGlobalStore('gOthersBankLiabilityStore');
            store.clearFilter()
            store.removeAll();
            loadDataInGlobalStore(data, 'gOthersBankLiabilityStore');
        } else if (headerRef == 'onSaveOtherBankAcountDetails') {
            Ext.toast('Successfully Saved.');
            var store = getGlobalStore('gAboutOtherBankDetailsStore');
            store.clearFilter()
            store.removeAll();
            loadDataInGlobalStore(data, 'gAboutOtherBankDetailsStore');
        } else if (headerRef == 'onSaveSecurityDetails') {
            Ext.toast('Successfully Saved.');
            var store = getGlobalStore('gSecurityDetailsStore');
            store.clearFilter()
            store.removeAll();
            loadDataInGlobalStore(data, 'gSecurityDetailsStore');
        } else if (headerRef == 'onSaveCompaniesUderOwnership') {
            Ext.toast('Successfully Saved.');
            var store = getGlobalStore('gCompaniesUderOwnershipStore');
            store.clearFilter()
            store.removeAll();
            loadDataInGlobalStore(data, 'gCompaniesUderOwnershipStore');
        } else if (headerRef == 'onBeforeCardAttachmentCardPanel') {
                var store = getGlobalStore('gAttachmentLoanDocumentStore');
                store.clearFilter()
                store.removeAll();
                loadDataInGlobalStore(data, 'gAttachmentCardDocumentStore');
        } else {
            console.log('No header');
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
    onNewCardTreeChildDblClick: function(cmp, rec) {
        var cardPrefix = rec.data.cardPrefix;
        var title = rec.data.text.toUpperCase();
        if (title.includes('REQUEST FORM')) title = "PRE-APPROVED " + title;
        else title = "PRE-APPROVED " + title + ' REQUEST FORM';
        var win;
        var cardDetailsPanel;

        win = getCardWindow(title);
        cardDetailsPanel = win.down('#CardDetails');
        cardDetailsPanel.lookupReference('hiddenCardPrefix').setValue(cardPrefix);
        manageCardFieldForNewCard(cardDetailsPanel);


        if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
            expandAllFieldSetInCardShow(cardDetailsPanel, fieldSetInDetailsWinFO);
            cardDetailsPanel.lookupReference('cardDocument').setHidden(false);
            cardDetailsPanel.lookupReference('cardDocument').setExpanded(true);
            cardDetailsPanel.lookupReference('cardMonthlyBillDebited').setHidden(false);
            cardDetailsPanel.lookupReference('customerType').setFieldLabel('Customer\'s Type');
            cardDetailsPanel.lookupReference('email').setHidden(false);
            cardDetailsPanel.lookupReference('nameAsPerbpcivid').setHidden(true);
            cardDetailsPanel.lookupReference('districtOfPosting').setHidden(false);
            cardDetailsPanel.lookupReference('netMonthlyIncome').setHidden(true);

        } else if (userRoles.containsKey(appConstants.CARD_OFFICER) ||
            userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
            cardDetailsPanel.lookupReference('email').setHidden(false);
            cardDetailsPanel.lookupReference('nameAsPerbpcivid').setHidden(true);
            cardDetailsPanel.lookupReference('districtOfPosting').setHidden(false);
            cardDetailsPanel.lookupReference('netMonthlyIncome').setHidden(true);
        }
        cardDetailsPanel.lookupReference('cardType').setValue(rec.data.configurationId);
        cardDetailsPanel.lookupReference('cardType1').setValue(rec.data.configurationId);
        cardDetailsPanel.lookupReference('cardType2').setValue(rec.data.configurationId);
        win.show();

    },
    onCardStatusTreeDblClick: function(cmp, rec) {
        if (rec.data.reference) return;

        var recc = this.lookupReference('cardMainSearchGrid').store.findRecord('creditCardId', rec.data.creditCardId);
        this.onCardGridItemDblClick(cmp, recc);
    },
    onAcquitionTreeDblClick: function(cmp, rec) {
        this.onAcquisitionItemDblClick(rec.data);
    },
    onCardGroupGridItemDblClick: function(view, rec, item, index, e) {
        var title = 'View Card Group ID: ' + rec.data.cardGroupId;
        var win = getNewCardAddToCardGroupWindow(title);
        win.show();
    },
    onAcquitionDblClick: function(view, rec, item, index, e) {
        this.onAcquisitionItemDblClick(rec.data);
    },
    onCardGridItemDblClick: function(view, rec, item, index, e) {
        showProcessMessage('Loading...');
        cardPanel = this;

        var cardDetailsPanelWin = getCardWindow(buildCardTitle(rec.data));
        var cardDetailsPanel = cardDetailsPanelWin.down('#CardDetails');
        // cardDetailsPanel.lookupReference('hiddenCardPrefix').setValue(rec.data.cardPrefix);
        cardDetailsPanel.lookupReference('keepHiddenCreditCardId').setValue(rec.data.creditCardId);
        cardDetailsPanel.lookupReference('accountNo').setValue(rec.data.accountNo);
        cardDetailsPanel.lookupReference('cardAccountSearchPad').setCollapsed(true);
        if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
            expandAllFieldSetInCardShow(cardDetailsPanel, fieldSetInDetailsWinFO);
            cardDetailsPanel.lookupReference('cardMonthlyBillDebited').setHidden(false);
            cardDetailsPanel.lookupReference('customerType').setFieldLabel('Customer\'s Type');
            cardDetailsPanel.lookupReference('mobile').setFieldLabel('Mobile' + '<span class="req" style="color:red">*</span>');
            cardDetailsPanel.lookupReference('email').setHidden(false);
            cardDetailsPanel.lookupReference('nameAsPerbpcivid').setHidden(true);
            cardDetailsPanel.lookupReference('districtOfPosting').setHidden(false);
            cardDetailsPanel.lookupReference('netMonthlyIncome').setHidden(true);
            if (rec.data.creditCardId) {
                cardDetailsPanel.lookupReference('documenttation').setHidden(false);
                cardDetailsPanel.lookupReference('documenttation').setExpanded(true);
            }
            if (rec.data.creditCardId) {
                cardDetailsPanel.lookupReference('cardDocument').setHidden(false);
                cardDetailsPanel.lookupReference('cardDocument').setExpanded(true);
            }
        } else if (userRoles.containsKey(appConstants.CARD_OFFICER) || userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
            if (rec.data.creditCardId) {
                cardDetailsPanel.lookupReference('documenttation').setHidden(false);
                cardDetailsPanel.lookupReference('documenttation').setExpanded(true);
                cardDetailsPanel.lookupReference('email').setHidden(false);
                cardDetailsPanel.lookupReference('nameAsPerbpcivid').setHidden(true);
                cardDetailsPanel.lookupReference('districtOfPosting').setHidden(false);
                cardDetailsPanel.lookupReference('netMonthlyIncome').setHidden(true);
            }
            cardDetailsPanel.lookupReference('duplications').setHidden(false);
            expandAllFieldSetInCardShow(cardDetailsPanel, fieldSetInDetailCO);
            setCustFiledDisplay(cardDetailsPanel);
        } else {
            expandAllFieldSetInCardShow(cardDetailsPanel, fieldSetInDetailOthers);
            cardDetailsPanel.lookupReference('duplicationAreas').setHidden(false);
            setCustFiledDisplay(cardDetailsPanel);
        }

        // if (rec.data.permission == 0) {
        // 	hideAllActionButton(cardDetailsPanel);

        // 	hideAllActionColumn(arrayOfGrid);
        // }
        manageCardField(cardDetailsPanel, rec.data);
        // var arrayOfGrid = getArrayOfGridCard(cardDetailsPanel);
        // hideAllActionColumn(arrayOfGrid);
        Ext.MessageBox.hide();
        isMessageBox = false;
        cardDetailsPanelWin.show();
    },
    onCardGridItemDblClickAcqusition: function(rec) {
        showProcessMessage('Loading...');
        cardPanel = this;

        var cardDetailsPanelWin = getAcqusitionApplicationWindow(buildAcquisitionTitle(data));

        Ext.MessageBox.hide();
        isMessageBox = false;
        cardDetailsPanelWin.show();
    },
    onAcquisitionItemDblClick: function(data) {

        var acquisitionPanelWin = getAcqusitionApplicationWindow(buildAcquisitionTitle(data));
        acquisitionPanel = acquisitionPanelWin.down('#AqusitionApplicationForm');
        if (data.idAcquisitionApplicantKey) {
            acquisitionPanel.lookupReference('hiddentidAcquisitionApplicantKey').setValue(data.idAcquisitionApplicantKey);
        }
        acquisitionPanel.lookupReference('hiddentCreditCardId').setValue(data.creditCardId);

        Ext.MessageBox.hide();
        isMessageBox = false;

        acquisitionPanelWin.show();

    },
    onActivateCardPanelRender: function(cmp, eOpts) {
        this.lookupReference('createNewCardTree').setVisible(hasAnyRole(['FIELD_ORIGINATOR', 'FIELD_OFFICER']));
        this.onCardTypeDataShow();
        this.loadCustomerType();
        this.onLoadCardGridData();
        this.loadCardDataSource();
    },
    loadCardDataSource: function() {
        var header = {
            reference: 'loadCardDataSource'
        };

        var payload = [{
            userModKey: loginUser.id,
        }];

        this.sendRequest(appActionType.ACTION_TYPE_LOAD_DATA_SOURCE, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onClickCardFoSaveApplication: function(btn) {
        this.onActionCardFOApplicationSave(this, appActionType.ACTION_TYPE_SAVE);
    },

    //update action
    onClickSaveApplication: function(btn) {
        this.onActionCardApplicationSave(this, appActionType.ACTION_TYPE_SAVE);
    },
    onClickFoUpdateApplication: function(btn) {
        this.onActionCardFOApplicationSave(this, appActionType.ACTION_TYPE_UPDATE);
    },
    onClickCreAnalystUpdt: function(btn) {
        if (!isValidRecommendedApprovalCard(this)) {
            return;
        } else {
            this.onActionCardApplicationUpdate(this, appActionType.ACTION_TYPE_UPDATE);
        }
    },

    onClickcoOfCOUpdateApplication: function(btn) {
        this.onActionCardApplicationUpdate(this, appActionType.ACTION_TYPE_UPDATE);
    },

    //close
    onClickFoCloseApplication: function(button, e, eOpts) {
        cardDetailsWinToClose.close();
    },

    //received
    onClickCAReceived: function(btn) {
        this.onActionCardApplicationRecived(this, appActionType.ACTION_TYPE_RECEIVED);
    },
    //recommend
    onClickFoRecommendedApplication: function(btn) {
        this.onActionCardFOApplicationSave(this, appActionType.ACTION_TYPE_RECOMMEND);
    },
    onClickcoOfCORecommend: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_RECOMMEND, appConstants.CARD_OFFICER_RECOMMEND);
    },
    onClickHoCoCDRecommendbtn: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_RECOMMEND, appConstants.HEAD_OF_CARD_RECOMMEND);
    },
    onClickCaRecBtnRcm: function(btn) {
        if (!isValidRecommendedApprovalCard(this)) {
            return;
        } else {
            this.onRecommendFunction(this, appActionType.ACTION_TYPE_RECOMMEND, appConstants.CREDIT_ANALYST_RECOMMEND);
        }
    },
    onClickRmOfCRMRecommendBtnHoCRM: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_RECOMMEND_TO_HOCRM, appConstants.RISK_MANAGER_RECOMMEND);
    },

    onClickUhOfCRMRecommendBtn: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_RECOMMEND, appConstants.UNIT_HEAD_RECOMMEND);
    },
    onClickHoCRMofCRMRecommendBtn: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_RECOMMEND, appConstants.HO_CRM_RECOMMEND);
    },
    onActionCardApplicationRecmmd: function(cmp, actionType) {
        if (isMandatoryField(cmp)) {
            this.executeStateTransitionDetailsPageCard(cmp, actionType);
        }
    },
    onActionCardApplicationRecived: function(cmp, actionType) {
        this.executeStateTransitionDetailsPageCard(cmp, actionType);
    },
    //qurey
    onClickBtnCaQuery: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_QUERY_TO_C_OFFICER, appConstants.CA_QUERY_TO_C_OFFICER);
    },
    onClickBtnUhQuery: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_QUERY_TO_CA, appConstants.CA_QUERY_TO_CA);
    },
    onClickBtnCOperationQueryToCo: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_QUERY_TO_C_OFFICER, appConstants.CO_QUERY_TO_C_OFFICER);
    },
    onClickBtnCOperationQueryToCa: function(btn) {
        this.onRecommendFunction(this, appActionType.ACTION_TYPE_QUERY_TO_CA, appConstants.CO_QUERY_TO_CA);
    },
    //resend
    onClickBtnCaResend(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_RESEND);
    },
    //decline
    onClickRmOfCRMdeclineBtn(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_DECLINE);
    },
    onClickUhOfCRMdeclineBtn(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_DECLINE);
    },
    onClickhoCRMofCRMdeclineBtn(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_DECLINE);
    },
    //approved
    onClickBtnUhOfCRMApprove(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_C_UH_APPROVE);
    },
    onClickBtnHeadOfCardApprove(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_PRE_APPROVE);
    },
    onClickBtnRMApprove(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_APPROVE);
    },
    onClickBtnHoCRMofCRMApprove(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_APPROVE);
    },
    //agree
    onClickBtnCDByMDAgree(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_AGREE);
    },
    //reject
    onCliclCORejectApp(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_REJECT);
    },
    onClickBtnCDByMDReject(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_REJECT);
    },
    //sent to co
    onClickBtnHoCRMofCRMSendToCo(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_SEND_TO_CO);
    },
    // //ready to card
    onClickCOperationReadyCard(btn) {
        this.executeStateTransitionDetailsPageCard(this, appActionType.ACTION_TYPE_CARD_READY);
    },
    //delete action
    onClickFODeleteApplication: function(btn) {
        this.onDeleteApplicationCard(this, appActionType.ACTION_TYPE_DELETE);
    },

    onDeleteApplicationCard: function(cmp, action) {

        var me = this;

        Ext.Msg.show({
            title: 'Attention',
            message: 'Are your sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn == 'yes') {

                    var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;

                    var header = {
                        reference: 'onDeleteApplicationCard'
                    };
                    var payload = [{
                        creditCardId: creditCardId,
                        stateId: cmp.lookupReference('cardStateId').value,
                        userModKey: loginUser.id
                    }];

                    me.sendRequest(action, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                }
            }
        });
        Ext.defer(function() { Ext.Msg.toFront() }, 200);
    },

    onRecommendFunction(cmp, actionType, commentType) {
        if (isMandatoryField(cmp)) {
            var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
            recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType);
            newRecomment.show();
        }
    },

    //return
    onClickHoCoCDReturnBtn: function(btn) {
        var cmp = this;
        var actionType;
        var commentType;
        actionType = appActionType.ACTION_TYPE_RETURN;
        commentType = appConstants.HEAD_OF_CARD_RETURN;

        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onClickBtnCaReturn: function(btn) {
        var cmp = this;
        var actionType;
        var commentType;
        actionType = appActionType.ACTION_TYPE_RETURN;
        commentType = appConstants.CREDIT_ANALYST_RETURN;

        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onClickBtnRmOfCRMReturn: function(btn) {
        var cmp = this;
        var actionType;
        var commentType;
        actionType = appActionType.ACTION_TYPE_RETURN;
        commentType = appConstants.RISK_MANAGER_RETURN;

        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onClickBtnUhOfCRMReturn: function(btn) {
        var cmp = this;
        var actionType;
        var commentType;
        actionType = appActionType.ACTION_TYPE_RETURN;
        commentType = appConstants.UNIT_HEAD_RETURN;

        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onClickBtnHoCRMoReturn: function(btn) {
        var cmp = this;
        var actionType;
        var commentType;
        actionType = appActionType.ACTION_TYPE_RETURN;
        commentType = appConstants.HO_CRM_RETURN;

        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onClickSaveCardActionComment: function(button, cmp, data) {

        showProcessMessage('Saving Data...');

        var me = this;
        var userComment = me.lookupReference('newComment').value;

        var commentType = me.lookupReference('commentType').value;
        var creditCardId = me.lookupReference('creditCardId').value;
        var stateName = me.lookupReference('stateName').value;
        var stateId = me.lookupReference('stateId').value;
        var actionType = me.lookupReference('actionType').value;
        var uiActionName = me.lookupReference('uiActionName').value;

        var userId = me.lookupReference('userId').value;
        var roleId = me.lookupReference('roleId').value;
        var currentUserroleName = me.lookupReference('currentUserroleName').value;
        var custDesignation = me.lookupReference('custDesignation').value;
        var applicantAskingLimit = me.lookupReference('applicantAskingLimit').value;
        var comment;

        comment = userComment;

        var header = {
            reference: 'onClickSaveCardActionComment'
        };

        var payload;

        var payloadCmnt = [{
            userModKey: loginUser.id,
            creatorId: loginUser.id,
            objectType: appConstants.CARD_ACTION_COMMENT,
            commentType: commentType,
            refId: creditCardId,
            comments: comment,
            commentedBy: loginUser.unId
        }];

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
            creditCardId: creditCardId,
            stateName: stateName,
            stateId: stateId,
            recommendGroupId: roleId,
            recommendToId: userId,
            currentUserRoleName: currentUserroleName,
            custDesignation: custDesignation,
            applicantAskingLimit: applicantAskingLimit,
            uiActionName: uiActionName
        }];

        if (isCardValidComment(comment)) {
            payload[0]['commentList'] = payloadCmnt;
        } else {
            if (!comment) {
                Ext.Msg.alert('Error', 'Please do some Comment.')
                return;
            }
        }
        me.sendRequest(actionType, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);

        //me.onRefreshGrid();
    },
    onMainCardTabChange: function(tab) {
        this.executeCardActionOnTabChange(tab.activeTab.id, 'onMainCardTabChange');
    },
    onCardRefreshStatusTree: function() {
        showProcessMessage('Loading data....');
        // this.lookupReference('cardStatusGridRefresh').setDisabled(true);
        this.executeCardActionOnTabChange(this.lookupReference('cardHome').activeTab.id, 'onCardRefreshStatusTree');
    },
    loadCustomerType: function() {
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
    onKeyPressAccountNoSrc: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onKeyPressCustomerSrc("accountNo", field.value, "Account No");
        }
    },
    onKeyPressBpNoSrc: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onKeyPressCustomerSrc("bpNo", field.value, "BP No");
        }
    },
    onKeyPressNid4Src: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onKeyPressCustomerSrc("nid", field.value, "NID");
        }
    },
    onKeyPressphone4Src: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.onKeyPressCustomerSrc("phone", field.value, "Phone");
        }
    },
    onKeyPressCustomerSrc(valueType, value, valueTypeText) {

        var me = this;

        if (value) {
            showProcessMessage('Searching for Customer....');

            var header;
            if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
                header = {
                    reference: 'onClickSearchFO'
                };

                var payload = [{
                    userModKey: loginUser.id
                }];
            } else {
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
        } else {
            Ext.MessageBox.alert('Invalid Data', 'Canot search with Empty [' + valueType + ']');
            return;
        }
    },
    duplicateLoanCheckForSameBp(bp) {
        var me = this;
        var bpNo = bp;

        if (bpNo) {
            showProcessMessage('Checking For Duplicate BP Number....');
            var header = {
                reference: 'duplicateBpNumberLoanCheck'
            };
            var payload = [{
                userModKey: loginUser.id,
                bpNo: bpNo ? bpNo : null,
            }];
            me.sendRequest(appActionType.ACTION_TYPE_DUPLICATE_LOAN_CHECK_SAME_BP, appContentType.CONTENT_TYPE_LOAN, payload, header);
            localStorage.setItem('loanSearchParam', JSON.stringify(payload[0]));
        } else {
            Ext.MessageBox.alert('Invalid Data', 'Canot search with Empty');
            return;
        }
    },
    executeCardActionOnTabChange: function(tabId, ref) {
        var me = this;
        cardPanel = this;
        if (tabId == 'ccWorkHistoryTab') {
            if (ref == 'onCardRefreshStatusTree') {
                me.onClickCardWorkHisSearchClear();
            }
            me.loadCardWorkHistoryGridData();
        } else if (tabId == 'cardSearchPanel') {
            if (ref == 'onCardRefreshStatusTree') {
                me.onClickCCSearchClear();
            }
            me.onLoadCardGridData();
        } else if (tabId == 'idCardGrouping') {
            if (ref == 'onCardRefreshStatusTree') {
                me.onClickCardGroupSearchClear();
            }
            me.loadCardGroupGridPanelData();
        } else if (tabId == 'acquisitionDetailsView') {
            if (ref == 'onCardRefreshStatusTree') {
                me.onClickAcquisitionClear();
            }
            me.onLoadAcquisitionData();
        }
    },

    onClickCardGroupSearchClear: function() {

        var me = this;

        if (me.lookupReference('cardGroupId')) {
            me.lookupReference('cardGroupId').reset();
            me.lookupReference('ccGroupStatus').reset();
            me.lookupReference('fromDate').reset();
            me.lookupReference('toDate').reset();
        } else {
            var cardGroupPanel = me.lookupReference('idCardGrouping');
            cardGroupPanel.lookupReference('cardGroupId').reset();
            cardGroupPanel.lookupReference('ccGroupStatus').reset();
            cardGroupPanel.lookupReference('fromDate').reset();
            cardGroupPanel.lookupReference('toDate').reset();
        }
    },
    onClickAcquisitionClear: function() {
        var me = this;

        if (me.lookupReference('ccTrackingNumberAC')) {
            me.lookupReference('ccTrackingNumberAC').reset();
            me.lookupReference('fromDateAC').reset();
            me.lookupReference('toDateAC').reset();
        } else {
            var acquisition = me.lookupReference('acquisitionDetailsView');
            acquisition.lookupReference('ccTrackingNumberAC').reset();
            acquisition.lookupReference('fromDateAC').reset();
            acquisition.lookupReference('toDateAC').reset();
        }
    },
    onAddToCardGroupSearchClear: function() {
        this.lookupReference('ccTrackingNumber').reset();
        this.lookupReference('fromDate').reset();
        this.lookupReference('toDate').reset();
    },

    loadCardWorkHistoryGridData: function() {
        showProcessMessage('Loading data....');

        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var header = {
            reference: 'loadCardWorkHistoryGridData'
        };

        var today = Ext.Date.format(new Date(), 'Y-m-d');

        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: today,
            toDate4Src: today
        }];

        this.sendRequest(appActionType.SELECT_CARD_WORK_HISTORY, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },

    onClickCardWorkHisSearchClear: function() {
        this.lookupReference('fromDateWorkHis').reset();
        this.lookupReference('toDateWorkHis').reset();
    },
    onCardTabChange: function(tab, cmp) {
        var tabid = tab.activeTab.id;
        if (tabid == 'commentsPanel') {
            this.onExpandCardComntOfActionPanel(cmp);
        } else if (tabid == 'cardNotesPanel') {
            this.onTabCardNotesOfActionPanel(cmp);
        } else if (tabid == 'smsStatusPanel') {
            // this.onTabSmsStatusOfActionPanel(cmp);
        }

    },
    onLoadCardGridData: function() {
        var actionType = appActionType.ACTION_TYPE_SELECT_CREDIT_CARD_FOR_GRID;
        this.onClickCardSearch(actionType);
    },
    onClickCCSearchClear: function() {
        this.lookupReference('ccTrackingNumber').reset();
        this.lookupReference('bpNoSrc').reset();
        this.lookupReference('nid4Search').reset();
        this.lookupReference('accountNo').reset();
        this.lookupReference('phone4Search').reset();
        this.lookupReference('fromDate').reset();
        this.lookupReference('toDate').reset();
        this.lookupReference('dataSourceCombo').reset();
        this.lookupReference('applicationNoSrc').reset();
    },

    onCardTypeDataShow: function(button, e, eOpts) {
        var me = this;
        var header = {
            reference: 'onCardTypeDataShow'
        };
        var payload = [{
            group: appConstants.CREDIT_CARD,
            subGroup: appConstants.CREDIT_CARD_TYPE,
            userModKey: loginUser.id
        }];

        this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_NCONFIGURATION, payload, header);
        showProcessMessage('Loading...');
    },


    onClickSearchCard: function(button, e, eOpts) {
        var actionType = appActionType.ACTION_TYPE_SEARCH_DATA_FOR_CC_GRID;
        this.onClickCardSearch(actionType);

    },
    onRefreshGridCard: function() {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var searchData = JSON.parse(localStorage.getItem('cardSearchParam'));

        var accountNo4Src = searchData.accountNo4Src;
        var bpNo4Src = searchData.bpNo4Src;
        var nid4Src = searchData.nid4Src;
        var phone4Src = searchData.phone4Src;
        var applicationNo = searchData.applicationNo;
        var ccTrackingNumber = searchData.ccTrackingNumber;
        var dataSource = searchData.dataSource;
        var fromDate4Src = searchData.fromDate4Src;
        var toDate4Src = searchData.toDate4Src;
        var actionType = searchData.actionType;
        this.searchOnRefreshGridCard(accountNo4Src, bpNo4Src, nid4Src, phone4Src, applicationNo, ccTrackingNumber, dataSource, fromDate4Src, toDate4Src, actionType);
    },
    onClickCardSearch: function(actionType) {
        var me = this;
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var accountNo = me.lookupReference('accountNo').value;
        var bpNoSrc = me.lookupReference('bpNoSrc').value;
        var nid4Search = me.lookupReference('nid4Search').value;
        var phone4Search = me.lookupReference('phone4Search').value;
        var applicationNo = me.lookupReference('applicationNoSrc').value;
        var ccTrackingNumber = me.lookupReference('ccTrackingNumber').value;
        var dataSourceCombo = me.lookupReference('dataSourceCombo').value;
        var fromDate = me.lookupReference('fromDate').value
        var toDate = me.lookupReference('toDate').value;
        var action;

        ccTrackingNumber = parseInt(ccTrackingNumber);

        if (!fromDate && !accountNo && !bpNoSrc && !nid4Search && !phone4Search &&
            !applicationNo && !ccTrackingNumber && !dataSourceCombo) {
            fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
        }

        if (!toDate) toDate = new Date();

        if (fromDate && toDate.getTime() < fromDate.getTime()) {
            Ext.Msg.alert('Error', 'To date must be greater then from date.');
            return;
        }

        toDate = Ext.Date.format(toDate, 'Y-m-d');
        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
        showProcessMessage('Loading data....');

        var header = {
            reference: 'onClickCardSearch'
        };

        var payload = [{
            userModKey: loginUser.id,
            accountNo4Src: accountNo ? accountNo : null,
            bpNo4Src: bpNoSrc ? bpNoSrc : null,
            nid4Src: nid4Search ? nid4Search : null,
            phone4Src: phone4Search ? phone4Search : null,
            fromDate4Src: fromDate,
            toDate4Src: toDate,
            actionType: actionType,
            applicationNumber: applicationNo ? applicationNo : null,
            ccTrackingNumber: ccTrackingNumber ? ccTrackingNumber : null,
            dataSource: dataSourceCombo ? dataSourceCombo : null,
        }];

        localStorage.setItem('cardSearchParam', JSON.stringify(payload[0]));
        me.sendRequest(actionType, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onAcquisitionDetailsViewRefresh: function(button, e, eOpts) {
        this.onClickAcquisitionClear();
        this.onLoadAcquisitionData();
    },
    onLoadAcquisitionData: function(button, e, eOpts) {
        showProcessMessage('Loading data....');

        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var header = {
            reference: 'loadCardGroupGridPanelData'
        };

        var fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -10);
        var toDate = new Date();

        var header = {
            reference: 'onLoadAcquisitionData'
        };

        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: fromDate,
            toDate4Src: toDate,
        }];
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_ACQUISITION_DATA, appContentType.CONTENT_TYPE_ACQUISITION_APPLICANT_DETAILS, payload, header);

    },
    onAddToAcquisitionDetailsViewSearch: function(button, e, eOpts) {
        acquisitionPanel = this;
        var me = this;
        var fromDate = me.lookupReference('fromDateAC').value;
        var toDate = me.lookupReference('toDateAC').value
        var creditCardId = me.lookupReference('ccTrackingNumberAC').value;
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        if (!fromDate) {
            fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -30);
        }

        if (!toDate) toDate = new Date();

        if (fromDate && toDate.getTime() < fromDate.getTime()) {
            Ext.Msg.alert('Error', 'To date must be greater then from date.');
            return;
        }

        toDate = Ext.Date.format(toDate, 'Y-m-d');
        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
        showProcessMessage('Loading data....');

        var header = {
            reference: 'onLoadAcquisitionData'
        };

        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: fromDate,
            toDate4Src: toDate,
            creditCardId: creditCardId ? creditCardId : null,
        }];
        me.sendRequest(appActionType.ACTION_TYPE_SELECT_ACQUISITION_DATA, appContentType.CONTENT_TYPE_ACQUISITION_APPLICANT_DETAILS, payload, header);
    },

    searchOnRefreshGridCard: function(accountNo4Src, bpNo4Src, nid4Src, phone4Src, applicationNo, ccTrackingNumber, dataSource, fromDate4Src, toDate4Src, actionType) {
        var header = {
            reference: 'onClickCardSearch'
        };

        var payload = [{
            userModKey: loginUser.id,
            accountNo4Src: accountNo4Src ? accountNo4Src : null,
            bpNo4Src: bpNo4Src ? bpNo4Src : null,
            nid4Src: nid4Src ? nid4Src : null,
            phone4Src: phone4Src ? phone4Src : null,
            fromDate4Src: fromDate4Src,
            toDate4Src: toDate4Src,
            actionType: actionType,
            applicationNumber: applicationNo ? applicationNo : null,
            ccTrackingNumber: ccTrackingNumber ? ccTrackingNumber : null,
            dataSource: dataSource ? dataSource : null,
        }];
        localStorage.setItem('cardSearchParam', JSON.stringify(payload[0]));

        this.sendRequest(actionType, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);

    },
    onCardGridFilter: function(component, newValue, oldValue, eOpts) {
        var grid = component.up('grid');
        this.filterCardGrid(grid, newValue, cardResultFiler);
    },
    filterCardGrid: function(grid, newValue, arrOfResultFiler) {
        grid.store.clearFilter();
        if (newValue) {
            var matcher = new RegExp(Ext.String.escapeRegex(newValue), "i");
            grid.store.filter({
                filterFn: function(record) {
                    var match = false;
                    Ext.Object.each(record.data, function(property, value) {
                        if (arrOfResultFiler.indexOf(property) > -1) {
                            match = match || matcher.test(String(value));
                        }
                    });
                    return match;
                }
            });
        }
    },
    onClickCardSearchClearBtn: function() {
        this.lookupReference('accountNo').reset();
        this.lookupReference('bpNoSrc').reset();
        this.lookupReference('nid4Search').reset();
        this.lookupReference('phone4Search').reset();
    },

    onchangeDOB: function(cmp, newValue, oldValue, eOpts) {
        if (!newValue || newValue.length <= 10 || newValue.length >= 12) {
            cmp.up('#cardDetailsWin').down('#age').setValue(null);
        } else {
            if (newValue) {
                var formt = Ext.Date.format(newValue, 'Y-m-d');
                var newage = calculateAge(formt, new Date());
                var indx = newage.indexOf("m");
                var age = newage.substring(0, indx + 1);

                cmp.up('#cardDetailsWin').down('#age').setValue(age);
                var retirementDate = getRetirementDate(newValue);
                cmp.up('#cardDetailsWin').down('#dateOfRetirement').setValue(retirementDate);
            } else {
                cmp.up('#cardDetailsWin').down('#age').setValue(null);
            }
        }
    },
    onchangeDOJoining: function(cmp, newValue, oldValue, eOpts) {
        if (!newValue || newValue.length <= 10 || newValue.length >= 12) {
            cmp.up('#cardDetailsWin').down('#serviceLength').setValue(null);
        } else {
            if (newValue) {
                var formt = Ext.Date.format(newValue, 'Y-m-d');
                var newage = calculateAge(formt, new Date());
                var indx = newage.indexOf("m");
                var age = newage.substring(0, indx + 1);
                cmp.up('#cardDetailsWin').down('#serviceLength').setValue(age);
            } else {
                cmp.up('#cardDetailsWin').down('#serviceLength').setValue(null);
            }
        }
    },
    onchangeDORetirement: function(cmp, newValue, oldValue, eOpts) {
        if (!newValue || newValue.length <= 10 || newValue.length >= 12) {
            cmp.up('#cardDetailsWin').down('#remainingYearOfRetirement').setValue(null);
        } else {
            if (newValue) {
                var newserviceRemaining = calculateAge(Ext.Date.format(new Date(), 'Y-m-d'), newValue);
                var indx = newserviceRemaining.indexOf("m");
                var serviceRemaining = newserviceRemaining.substring(0, indx + 1);
                cmp.up('#cardDetailsWin').down('#remainingYearOfRetirement').setValue(serviceRemaining);
            } else {
                cmp.up('#cardDetailsWin').down('#remainingYearOfRetirement').setValue(null);
            }
        }
    },
    onActionCardFOApplicationSave: function(cmp, action) {
        var me = this;

        Ext.Msg.show({
            title: 'Attention',
            message: 'Are your sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn == 'yes') {
                    if (isMandatoryField(cmp)) {

                        var customer = getCardCustomerObjFO(cmp);
                        var cardDocumentList = getCardDocumentList(cmp);
                        var card = getCardObjFO(cmp, action);
                        card["customer"] = customer;
                        card["cardDocumentList"] = cardDocumentList;

                        var form = cmp.lookupReference('newFOCardAccount');
                        form.submit({
                            params: {
                                card: JSON.stringify(card),
                                actionType: action
                            },
                            url: INITIATE_CARD_URL,

                            waitMsg: 'Working with Data...',

                            success: function(result, request) {
                                console.log('Working');
                                cardDetailsWinToClose.close();
                            },

                            failure: function(result, request) {
                                console.log('Working');
                                cardDetailsWinToClose.close();
                            }
                        });
                    }

                    //Refreshing loan grid
                    // me.onRefreshGrid();
                }
            }
        });

        Ext.defer(function() { Ext.Msg.toFront() }, 200);
    },
    onActionCardApplicationSave: function(cmp, action) {
        var me = this;
        Ext.Msg.show({
            title: 'Attention',
            message: 'Are your sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn == 'yes') {
                    showProcessMessage('Save data....');

                    var header = {
                        reference: 'onSaveApplication'
                    };
                    if (isMandatoryField(cmp)) {
                        showProcessMessage('Saving data....');
                        var payload = getPayloadOfCardApplication(cmp, 'ToSave');
                        me.sendRequest(action, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                        //me.onRefreshGrid();
                    }
                }
            }

        });
        Ext.defer(function() { Ext.Msg.toFront() }, 200);
    },
    onActionCardApplicationUpdate: function(cmp, action) {
        var me = this;
        Ext.Msg.show({
            title: 'Attention',
            message: 'Are your sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn == 'yes') {
                    showProcessMessage('Update data....');

                    var header = {
                        reference: 'onUpdateApplication'
                    };
                    if (isMandatoryField(cmp)) {
                        showProcessMessage('Updating data....');
                        var payload = getPayloadOfCardApplication(cmp, 'ToSave');
                        me.sendRequest(action, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                        //me.onRefreshGrid();
                    }
                }
            }

        });
        Ext.defer(function() { Ext.Msg.toFront() }, 200);
    },
    onActionCardApplicationReturn: function(cmp, actionType) {
        if (isMandatoryField(cmp)) {
            this.executeStateTransitionDetailsPageCard(cmp, actionType);
        }
    },
    onActivateCardDetailsWin: function(cmp, eOpts) {
        var me = this;
        var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;

        var arrayOfGrid = getArrayOfGridCard(cmp);

        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        setPluginWithoutListenerInAllFieldCard(arrayOfGrid);


        if (creditCardId) {
            cmp.lookupReference('verifyNidDisplay').setHidden(false);
            cmp.lookupReference('isMatchedNid').setHidden(false);
            cmp.lookupReference('searchNidDetails').setHidden(false);
        }

        if (!Ext.isEmpty(creditCardId)) {

            var header = {
                reference: 'onActivateCardDetailsWin'
            };

            var payload = [{
                userModKey: loginUser.id,
                creditCardId: creditCardId
            }];
            me.sendRequest(appActionType.ACTION_TYPE_SELECT_FULL_CREDIT_CARD, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
        } else {
            // setDefaultSourceOfficerRecmnd();
            // setDefaultBranchRecmnd();
            // setDefaultIns2Cad();
            setDefultRowOfAllGridCard();
            setDefaultIns2CadCard();

            hideSaveActionColWithRefSaveOfAllGridCard(arrayOfGrid);
            var docGrid = cmp.lookupReference('documenttationGrid');
            hideActionColumn(docGrid, 'downloadReference');
            hideActionColumn(docGrid, 'uploadReference');
            hideActionColumn(docGrid, 'viewReference');
            docGrid.down('#docGridRefreshBtn').setHidden(true);

            // cmp.lookupReference('uploadCibStatusFileBtn').setHidden(true);
            // cmp.lookupReference('viewCibStatus').setHidden(true);
            // cmp.lookupReference('cibStatus').columnWidth = 1;

            // cmp.lookupReference('cmntOfActionPanel').setHidden(true);
        }
        if (creditCardId) {
            var header = {
                reference: 'SELECT_RECOMMEND_TO_ROLE_USER'
            };

            var fromRoleIds = loginUser.roleList.map(u => u.id).join(',')

            var payload = [{
                userModKey: loginUser.id,
                creditCardId: creditCardId,
                fromRoleIds: fromRoleIds

            }];

            me.sendRequest(appActionType.SELECT_RECOMMEND_TO_ROLE_USER, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
        }
    },
    onCardCustomerTypeChange: function(cmp, newValue, oldValue, eOpts) {
        var me = this;
        var custTypeId = newValue;
        var cardTypeId = me.lookupReference('cardType').value;

        me.loadCardAllDocument(me);

        me.getCardPercent(custTypeId, cardTypeId);
    },
    loadCardAcquisitionAllDocument: function(cmp) {

        var cardTypeKey = cmp.lookupReference('cardType').value;
        var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;

        if (Ext.isEmpty(cardTypeKey)) {
            return;
        }
        if (!customerTypeId) {
            Ext.MessageBox.alert('Missing Field', 'Please fill Customer Type.');
            return;
        }

        var header = {
            reference: 'loadCardAllDocument'
        };
        var payload = [{
            idCardTypeKey: cardTypeKey,
            refKey: creditCardId ? creditCardId : null,
            userModKey: loginUser.id
        }];

        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_ALL_DOCUMENT, appContentType.CONTENT_TYPE_DOCUMENT, payload, header);
    },
    loadCardAllDocument: function(cmp) {

        var customerTypeId = cmp.lookupReference('customerType').value;
        var cardTypeKey = cmp.lookupReference('cardType').value;
        var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;

        if (Ext.isEmpty(cardTypeKey)) {
            return;
        }
        if (!customerTypeId) {
            Ext.MessageBox.alert('Missing Field', 'Please fill Customer Type.');
            return;
        }

        var header = {
            reference: 'loadCardAllDocument'
        };
        var payload = [{
            idCustomerTypeKey: customerTypeId,
            idCardTypeKey: cardTypeKey,
            refKey: creditCardId ? creditCardId : null,
            userModKey: loginUser.id
        }];

        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_ALL_DOCUMENT, appContentType.CONTENT_TYPE_DOCUMENT, payload, header);
    },
    getCardPercent: function(custTypeId, cardTypeId) {

        if (!custTypeId || !cardTypeId) return;

        var header = {
            reference: 'getCardPercent'
        };
        var payload = [{
            userModKey: loginUser.id,
            cardTypeKey: cardTypeId,
            customerTypeKey: custTypeId
        }];

        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_PERCENT, appContentType.CONTENT_TYPE_CARD_CONFIG, payload, header);
    },
    onRefreshDocGrid: function(cmp) {
        this.loadCardAllDocument(cmp.up('#CardDetails'));
    },
    onChangeDocumentFileCard: function(filefield, value, eOpts) {

        var me = this;

        var rowIndex = filefield.up().items.items[0].value;
        var data = getGlobalStore('gCardDocumentStore').getAt(rowIndex).data;
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
                cardDocument: JSON.stringify(data),
                docTrack: data.docType ? data.docType : null,
            },
            url: UPLOAD_CARD_DOC_URL,

            waitMsg: 'Uploading File...',

            success: function(result, request) {
                me.loadCardAllDocument(filefield.up('#CardDetails'));
            },

            failure: function(result, request) {
                me.loadCardAllDocument(filefield.up('#CardDetails'));
            }
        });
    },
    onChangeDocumentFileAcquisition: function(filefield, value, eOpts) {

        var me = this;

        var rowIndex = filefield.up().items.items[0].value;
        var data = getGlobalStore('gCardDocumentStore').getAt(rowIndex).data;
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
                cardDocument: JSON.stringify(data),
                docTrack: data.docType ? data.docType : null,
            },
            url: UPLOAD_CARD_DOC_URL,

            waitMsg: 'Uploading File...',

            success: function(result, request) {
                console.log('Document Upload succcessfully')
            },

            failure: function(result, request) {
                console.log('Document Upload succcessfully')
            }
        });
    },
    onClickDocGridViewFileCard: function(grid, rowIndex, colIndex) {

        var data = grid.store.data.items[rowIndex].data;
        var objectType = 'CREDIT_CARD_TYPE';
        if (data.filePresent == 1) {
            var serverUrl = VIEW_LOAN_DOC_URL + '?cardDocId=' + data.documentKey + '&userModKey=' + loginUser.id + '&objectType=' + objectType;

            var pdfPanel = getCardPdfPanel("", "", "", "", "", serverUrl);
            pdfPanel.show();
        } else {
            Ext.toast('File is Not Present.');
        }
    },
    onClickDocGridDownloadCard: function(grid, rowIndex, colIndex) {

        var data = grid.store.data.items[rowIndex].data;
        var objectType = 'CREDIT_CARD_TYPE';
        if (data.filePresent == 1) {
            var serverUrl = DOWNLOAN_LOAN_DOC_URL + '?cardDocId=' + data.documentKey + '&userModKey=' + loginUser.id + '&objectType=' + objectType;
            var pdfPanel = getCardPdfPanel("", "", "", "", "", serverUrl);

            pdfPanel.show();
            pdfPanel.destroy();
        } else {
            Ext.toast('File is Not Present.');
        }
    },
    onDelCmntJustificationCard: function(grid, rowIndex, colIndex) {
        this.onDeleteCommentModelGridCard('gCmntJustificationStoreCard', rowIndex, 'onDelCmntJustificationCard');
    },
    onDelAnalystsCommentCard: function(grid, rowIndex, colIndex) {
        this.onDeleteCommentModelGridCard('gAnalystCommentStoreCard', rowIndex, 'onDelAnalystsCommentCard');
    },
    onDelExceptionDetailCard: function(grid, rowIndex, colIndex) {
        this.onDeleteCommentModelGridCard('gExceptionDetailStoreCard', rowIndex, 'onDelExceptionDetailCard');
    },
    onDelInstruction2CadCard: function(grid, rowIndex, colIndex) {
        this.onDeleteCommentModelGridCard('gIns2CADStoreCard', rowIndex, 'onDelInstruction2CadCard');
    },
    onDelCibStatusCard: function(grid, rowIndex, colIndex) {
        this.onDeleteCommentModelGridCard('gCibStatusCommentStoreCard', rowIndex, 'onDelCibStatusCard');
    },
    onDelCmntDeviation: function(grid, rowIndex, colIndex) {
        this.onDeleteCommentModelGridCard('gCmntDeviationsStore', rowIndex, 'onDelCmntDeviation');
    },
    onDelLiabilityCard: function(grid, rowIndex, colIndex) {

        var me = this;
        var store = me.lookupReference('existingLiabilitiesGridCard').store;
        var data = store.getAt(rowIndex).data;

        if (!data.existingLiabilityId) {
            store.removeAt(rowIndex);

            if (store.data.items.length == 0) {
                store.insert(0, new Desktop.model.ExistingLiabilitiesModel());
            }
        } else {
            Ext.Msg.show({
                title: 'Attention',
                message: 'Are your sure?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn == 'yes') {
                        var header = {
                            reference: 'onDelLiabilityCard'
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
            Ext.defer(function() { Ext.Msg.toFront() }, 200);
        }
    },
    onNewCmntJustificationCard: function(grid, rowIndex, colIndex) {
        setCommentRowAtEndCard('gCmntJustificationStoreCard');
    },
    onNewCmntDeviation: function(grid, rowIndex, colIndex) {
        setCommentRowAtEndCard('gCmntDeviationsStore');
    },
    onNewInstruction2CadCard: function(grid, rowIndex, colIndex) {
        setCommentRowAtEndCard('gIns2CADStoreCard');
    },
    onNewExceptionDetailCard: function(grid, rowIndex, colIndex) {
        setCommentRowAtEndCard('gExceptionDetailStoreCard');
    },
    onDeleteCommentModelGridCard(storeId, rowIndex, reference) {
        var me = this;
        var store = getGlobalStore(storeId);
        var data = store.getAt(rowIndex).data;

        if (!data.commentId) {
            store.removeAt(rowIndex);
            if (store.data.items.length == 0) {
                setDefultCommentRowCard(storeId);
            }
        } else {
            Ext.Msg.show({
                title: 'Attention',
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
                            setDefultCommentRowCard(storeId);
                        }
                    }

                }

            });
            Ext.defer(function() { Ext.Msg.toFront() }, 200);

        }
    },
    onSaveCmntJustificationCard: function(grid, rowIndex, colIndex) {
        var commentType = appConstants.COMMENTS_JUSTIFICATION;
        var reference = 'onSaveCmntJustificationCard';
        this.onSaveCommentModelGridCard(grid, rowIndex, reference, commentType);
    },
    onSaveCmntDeviation: function(grid, rowIndex, colIndex) {
        var commentType = appConstants.COMMENTS_DEVIATION;
        var reference = 'onSaveCmntDeviation';
        this.onSaveCommentModelGridCard(grid, rowIndex, reference, commentType);
    },
    onSaveAnalystsCommentCard: function(grid, rowIndex, colIndex) {
        var commentType = appConstants.ANALYSTS_COMMENTS;
        var reference = 'onSaveAnalystsCommentCard';
        this.onSaveCommentModelGridCard(grid, rowIndex, reference, commentType);
    },
    onSaveCibStatusCard: function(grid, rowIndex, colIndex) {
        var commentType = appConstants.CIB_STATUS;
        var reference = 'onSaveCibStatusCard';
        this.onSaveCommentModelGridCard(grid, rowIndex, reference, commentType);
    },
    onSaveInstruction2CadCard: function(grid, rowIndex, colIndex) {
        var commentType = appConstants.INS_2_CAD;
        var reference = 'onSaveInstruction2CadCard';
        this.onSaveCommentModelGridCard(grid, rowIndex, reference, commentType);
    },
    onSaveExceptionDetailCard: function(grid, rowIndex, colIndex) {
        var commentType = appConstants.EXCEPTION_DETAILS;
        var reference = 'onSaveExceptionDetail';
        this.onSaveCommentModelGridCard(grid, rowIndex, reference, commentType);
    },
    onNewAnalystCommentCard: function(grid, rowIndex, colIndex) {
        setCommentRowAtEndCard('gAnalystCommentStoreCard');
    },
    onNewCibStatusCard: function(grid, rowIndex, colIndex) {
        setCommentRowAtEndCard('gCibStatusCommentStoreCard');
    },
    onSaveCommentModelGridCard(grid, rowIndex, reference, commentType) {
        var me = this;

        var data = grid.store.data.items[rowIndex].data;

        if (!isValidCommentCard(data.comments)) {
            console.log('Please do some Comment.');
            return;
        }

        var header = {
            reference: reference
        };

        if (!data.commentId) {
            var creditCardId = me.lookupReference('keepHiddenCreditCardId').value;
            var payload = [{
                userModKey: loginUser.id,
                creatorId: loginUser.id,
                objectType: appContentType.CONTENT_TYPE_CREDIT_CARD_CMD.toUpperCase(),
                commentType: commentType,
                refId: creditCardId,
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
    onActionSaveLiabilityCard: function(grid, rowIndex, colIndex) {
        var me = this;
        var data = grid.store.data.items[rowIndex].data;
        if (!isValidLiabilityCard(data)) {
            Ext.MessageBox.alert('Invalid Data', 'Column value can not be Empty.');
            return false;
        }

        var header = {
            reference: 'onActionSaveLiabilityCard'
        };

        var payload = getLiabilitiesForSaveAndNewColCard(this);

        me.sendRequest(appActionType.ACTION_TYPE_NEW_UPDATE_LIABILITY, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);
    },
    onNewLiabilityCard: function(grid, rowIndex, colIndex) {
        var me = this;
        var creditCardId = this.lookupReference('keepHiddenCreditCardId').value;
        if (creditCardId) {
            var header = {
                reference: 'onNewLiabilityCard'
            };

            var payload = getLiabilitiesForSaveAndNewColCard(this);

            me.sendRequest(appActionType.ACTION_TYPE_NEW_UPDATE_LIABILITY, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);
        }
    },
    onAddLiabilityCard: function(btn, e, eOpts) {
        var newLiability = Ext.widget('newLiabilityCard');
        var creditCardId = this.lookupReference('keepHiddenCreditCardId').value;
        newLiability.lookupReference('creditCardId').setValue(creditCardId);
        newLiability.show();
    },
    onAddCommentCard: function(btn, e, eOpt) {
        var btnRf = btn.reference,
            commentType,
            creditCardId = this.lookupReference('keepHiddenCreditCardId').value;
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
        newComment.lookupReference('objectType').setValue(appContentType.CONTENT_TYPE_CREDIT_CARD_CMD.toUpperCase());
        newComment.lookupReference('creditCardId').setValue(creditCardId);
        newComment.setTitle(title);

        newComment.show();
    },
    onSaveLiabilityCard: function(btn, e, eOpts) {
        var me = this;

        var bankName = checkIsEmpty(me.lookupReference('bankName').value),
            product = checkIsEmpty(me.lookupReference('product').value),
            disbursed = checkIsEmpty(me.lookupReference('disbursed').value),
            currentOutstanding = checkIsEmpty(me.lookupReference('currentOutstanding').value),
            eMISize = checkIsEmpty(me.lookupReference('eMISize').value),
            remarks = checkIsEmpty(me.lookupReference('remarks').value),
            creditCardId = me.lookupReference('creditCardId').value;

        var header = {
            reference: 'onSaveLiabilityCard'
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
            creditCardId: creditCardId
        }];

        if (!Ext.isEmpty(creditCardId)) {
            me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_EXISTING_LIABILITY, payload, header);
        }

        var store = Ext.data.StoreManager.lookup('gExistingLiabilitiesStoreCard');
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

    // FO actions
    // onClickFoRecommendedApplication: function (btn) {
    // 	var cmp = this;
    // 	var actionType;
    // 	var commentType;
    // 	if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR)|| userRoles.containsKey(appConstants.FIELD_OFFICER)) {
    // 		actionType = appActionType.ACTION_TYPE_RECOMMEND;
    // 		commentType = appConstants.BM_RECOMMEND_COMMENT;
    // 	} else if (userRoles.containsKey(appConstants.BRANCH_OPERATION_MANAGER)) {
    // 		actionType = appActionType.ACTION_TYPE_BOM_RECOMMEND;
    // 		commentType = appConstants.BOM_RECOMMEND_COMMENT;
    // 	} else if (userRoles.containsKey(appConstants.POLICE_PORTFOLIO_COORDINATOR)) {
    // 		actionType = appActionType.ACTION_TYPE_PPC_RECOMMEND;
    // 		commentType = appConstants.PPC_RECOMMEND_COMMENT;
    // 	}

    // 	if (isMandatoryField(cmp)) {
    // 		this.executeStateTransitionDetailsPageCard(cmp, actionType);
    // 	}		

    // },
    executeStateTransitionDetailsPageCard(cardDetailsPanel, action) {
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
                    var creditCardId = me.lookupReference('creditCardId').value;
                    var stateName = me.lookupReference('cardStateName').value;
                    var stateId = me.lookupReference('cardStateId').value;
                    var cardTypeKey = me.lookupReference('cardType').value;

                    showProcessMessage('Executing action....');

                    var header = {
                        reference: 'executeStateTransitionDetailsPageCard'
                    };

                    var payload = [{
                        creditCardId: creditCardId,
                        stateName: stateName,
                        stateId: stateId,
                        userModKey: loginUser.id,
                        cardTypeKey: cardTypeKey,
                        uiActionName: action
                    }];

                    me.sendRequest(appActionType.ACTION_STATE_TRANSITION, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                }
            }
        });
        Ext.defer(function() { Ext.Msg.toFront() }, 200);
    },
    // Common Functions in Action Segment
    executeStateTransitionFromLoanGrid(grid, action) {

        var selectedCard = grid.getSelectionModel().getSelection();

        var data = selectedCard[0].data;

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

    onCardStatusTreeChildClick: function(cmp, rec) {
        if (!rec.data.reference) return;

        var grid = this.lookupReference('cardHome').activeTab.down('gridpanel');
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
            this.filterCardGridByMultiValue(grid, filterParm, arr);
        }
    },

    filterCardGridByMultiValue: function(grid, newValueArr, arrOfResultFiler) {
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
    onCancelCommentTypePopupCard: function(button, e, eOpts) {
        button.up('#cardActionComment').close();
    },
    onClearCardNotes: function(cmp) {
        this.lookupReference('loanNotes').reset();
    },
    onSaveCardNotes: function(button, e, eOpts) {
        var me = this;
        var loanNotes = me.lookupReference('loanNotes').value;

        if (!loanNotes) {
            Ext.MessageBox.alert('Empty', 'Please Write Your Notes.');
            return false;
        }
        showProcessMessage('Saving Notes...');

        var refId = me.lookupReference('creditCardId').value;
        var notesBy = gLoginUuser.unId;
        var objectType = appConstants.CREDIT_CARD_NOTES;


        var payload;

        var header = {
            reference: 'onSaveCardNotes'
        };

        payload = [{
            userModKey: loginUser.id,
            creatorId: loginUser.id,
            loanNotes: loanNotes ? loanNotes : null,
            notesBy: notesBy ? notesBy : null,
            objectType: objectType ? objectType : null,
            refId: refId ? refId : null,
        }];

        me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_NOTES, payload, header);
    },
    onTabCardNotesOfActionPanel: function(cmp) {
        var creditCardId = this.lookupReference('keepHiddenCreditCardId').value;

        var header = {
            reference: 'onTabCardNotesOfActionPanel'
        };
        var payload = [{
            refId: creditCardId,
            userModKey: loginUser.id
        }];

        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_NOTES, appContentType.CONTENT_TYPE_NOTES, payload, header);
    },
    onExpandCardComntOfActionPanel: function(cmp) {
        var creditCardId = this.lookupReference('keepHiddenCreditCardId').value;

        if (!creditCardId && creditCardId) {
            var store = getGlobalStore('gCardCmntOfActionStore');
            store.clearFilter()
            store.removeAll();
            return;
        }

        var header = {
            reference: 'onExpandCardComntOfActionPanel'
        };
        var payload = [{
            refId: creditCardId,
            objectType: appConstants.CARD_ACTION_COMMENT,
            userModKey: loginUser.id
        }];

        this.loadCardQueryResponseGrid(this);

        this.sendRequest(appActionType.ACTION_TYPE_SELECT, appContentType.CONTENT_TYPE_COMMENT, payload, header);
    },
    loadCardQueryResponseGrid: function(cmp) {

        var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;

        if (!creditCardId) {
            var store = getGlobalStore('gCardCmntOfActionStore');
            store.clearFilter()
            store.removeAll();
            return;
        }
        var cardStateName = cmp.lookupReference('cardStateName').value;

        if (userRoles.containsKey(appConstants.CARD_OFFICER) && cardStateName == 'CO_QUERY_TO_C_OFFICER') {
            showActionColumn(cmp.lookupReference('queryResponseGrid'), 'saveReference');
        } else if (userRoles.containsKey(appConstants.CARD_OFFICER) && cardStateName == 'CA_QUERY_TO_C_OFFICER') {
            showActionColumn(cmp.lookupReference('queryResponseGrid'), 'saveReference');
        }
        if (userRoles.containsKey(appConstants.CREDIT_ANALYST) && cardStateName == 'CO_QUERY_TO_CA') {
            showActionColumn(cmp.lookupReference('queryResponseGrid'), 'saveReference');
        }

        var header = {
            reference: 'loadCardQueryResponseGrid'
        };
        var payload = [{
            refId: creditCardId,
            objectType: appConstants.CARD_ACTION_COMMENT,
            userModKey: loginUser.id
        }];

        this.sendRequest(appActionType.ACTION_TYPE_SELECT_ALL_CARD_QUERY, appContentType.CONTENT_TYPE_COMMENT, payload, header);
    },
    onCardSaveQueryResponse: function(grid, rowIndex, colIndex) {
        var data = grid.store.data.items[rowIndex].data;

        if (!isCardValidComment(data.commentResponse)) {
            console.log('Please write some response.');
            return;
        }

        var header = {
            reference: 'onCardSaveQueryResponse'
        };

        var payload = [{
            userModKey: loginUser.id,
            commentResponse: data.commentResponse,
            commentResponseBy: loginUser.unId,
            commentId: data.commentId
        }];
        this.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_COMMENT, payload, header);
    },
    onGridCDHisFilterEntryChange: function(component, newValue, oldValue, eOpts) {
        var grid = component.up('grid');
        this.filterCardGrid(grid, newValue, cardResultFiler);
    },
    onClickCardWorkHistorySearch: function() {
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
            reference: 'loadCardWorkHistoryGridData'
        };
        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: fromDate,
            toDate4Src: toDate
        }];

        me.sendRequest(appActionType.SELECT_CARD_WORK_HISTORY, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    generateCardExcelReport: function(button) {

        console.log('generateCardExcelReport');

        var me = this;
        var reportName = 'Work_History';
        var now = new Date();
        var reportReqTime = now.getTime();

        var grid = me.lookupReference('workHistoryCardGrid');
        var dataItems = grid.getSelectionModel().getSelection();
        var columns = grid.columns;

        if (!dataItems || dataItems.length == 0) {
            Ext.MessageBox.alert('Report Error', 'Please select some card to generate report.');
            return;
        }

        showDownloadProcessingBarCard(button, 'Downloading...', 'Please wait...');

        var headerList = new Array();
        var dataIndexMap = {};
        var count = 0;
        columns.forEach(function(it) {
            if (!it.hidden) {
                headerList.push(it.text);
                dataIndexMap[it.dataIndex] = count++;
            }
        });

        var dataList = new Array();
        dataItems.forEach(function(obj) {
            var dataMap = {};
            columns.forEach(function(it) {
                if (!it.hidden) {
                    if (it.dataIndex == 'cardTypeKey') {
                        var loanType = getCardTypeFromKey(obj.data[it.dataIndex]);
                        dataMap[it.dataIndex] = loanType ? loanType : "";
                    } else if (it.dataIndex == 'idCustomerTypeKey') {
                        var custType = getCardCustomerTypeFromKey(obj.data[it.dataIndex]);
                        dataMap[it.dataIndex] = custType ? custType : "";
                    } else {
                        if (it.xtype == 'datecolumn') {
                            dataMap[it.dataIndex] = obj.data[it.dataIndex] ? obj.data[it.dataIndex].split(' +')[0] : "";
                        } else {
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
            url: LMS_CARD_GRID_EXCEL_REPORT_URL
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
    onCardGrdSelChng: function(cmp, records, eOpts) {
        var rptBtn = this.lookupReference('cardReportAsPdf');
        var cadCardReport = this.lookupReference('cadCardReport');
        var cardCOfficerExcel = this.lookupReference('cardCOfficerExcelReport');
        var cardCRMExcel = this.lookupReference('cardCRMExcelReport');
        var createCardGroupBtn = this.lookupReference('createCardGroupBtn');
        // var manualSmsSend = this.lookupReference('manualSmsSend');					

        var grid = this.lookupReference('cardMainSearchGrid');
        var selectedRows = grid.getSelection().length;
        var selectedCard = grid.getSelectionModel().getSelection();
        var cardApprovalState;
        if (userRoles.containsKey(appConstants.CARD_OFFICER)) {
            cardApprovalState = ['PRE_APPROVED'];
        } else {
            var cardApprovalState = ['HOCRM_APPROVE', 'UH_APPROVE', 'RM_APPROVE'];
        }
        var cardStatename = [];
        // var smsStateName = ['SENT_TO_CAD','CAD_DISBURSED'];	
        // var smsStateNameStore = [];
        // var loanCount = 0;
        var count = 0
        if (selectedCard.length > 0) {
            for (var i = 0; i < selectedRows; i++) {
                cardStatename.push(grid.getSelection()[i].data.stateName);
            }
        }

        rptBtn.setDisabled(true);
        cadCardReport.setDisabled(true);
        cardCOfficerExcel.setDisabled(true);
        cardCRMExcel.setDisabled(true);
        createCardGroupBtn.setDisabled(true);
        // manualSmsSend.setDisabled(true);

        if (records.length > 0) {

            if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.CARD_OFFICER) ||
                userRoles.containsKey(appConstants.HEAD_OF_CARD) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {

                cardCOfficerExcel.setDisabled(false);
            }

            if (userRoles.containsKey(appConstants.CO) || userRoles.containsKey(appConstants.CD) || userRoles.containsKey(appConstants.CREDIT_ANALYST) ||
                userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.HO_CRM)) {

                cardCRMExcel.setDisabled(false);
            }

            if (records.length == 1) {
                rptBtn.setDisabled(false);
            }

            if ((records.length == 1 && userRoles.containsKey(appConstants.CAD)) && ((records[0].data.stateName == 'SL_GENERATED') || (records[0].data.stateName == 'CA_CAD_QUERY_UPDATED') || (records[0].data.stateName == 'SO_CAD_QUERY_UPDATED'))) {
                cadCardReport.setDisabled(false);
            }

            for (var i = 0; i < cardStatename.length; ++i) {
                var temp = cardStatename[i].split(".");
                var found = false;

                for (var j = 0; j < cardApprovalState.length; ++j) {
                    if (cardApprovalState[j] === temp[0]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    count++;
                }
            }

            for (var i = 0; i < records.length; i++) {

                if ((records[i].data.cardGroupId == null) || (records[i].data.cardGroupId == '') ||
                    (records[i].data.cardGroupId === undefined)) {

                    for (var j = 0; j < cardStatename.length; j++) {
                        if ((userRoles.containsKey(appConstants.RISK_MANAGER) && count == 0) ||
                            (userRoles.containsKey(appConstants.UNIT_HEAD) && count == 0) ||
                            (userRoles.containsKey(appConstants.CREDIT_ANALYST) && count == 0 ||
                                (userRoles.containsKey(appConstants.CARD_OFFICER) && count == 0))) {
                            createCardGroupBtn.setDisabled(false);
                        } else {
                            createCardGroupBtn.setDisabled(true);
                            //  return;
                        }
                    }

                } else {
                    createCardGroupBtn.setDisabled(true);
                    // return;
                }
            }

        }
    },

    generateCardGridReport: function(btn, e, eOpts) {

        var grid = this.lookupReference('cardMainSearchGrid');


        var selectedCard = grid.getSelectionModel().getSelection();
        var creatorName = loginUser.unId;
        var staffId = selectedCard[0].data.staffId;
        if (selectedCard.length > 0) {
            var namePopup = Ext.create('Desktop.view.card.CardNamePopup');
            namePopup.lookupReference('cardMainSearchGrid').setValue(grid);
            namePopup.lookupReference('nameOfEmployees').setValue(creatorName);
            namePopup.lookupReference('employeeId').setValue(staffId);

            if (!(userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER) || userRoles.containsKey(appConstants.CARD_OFFICER)) ||
                userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
                namePopup.lookupReference('nameOfEmployees').setHidden(true);
                namePopup.lookupReference('employeeId').setHidden(true);
                namePopup.lookupReference('headOfCard').setHidden(true);
                namePopup.lookupReference('presonalLoanDuplicate').setHidden(true);
                namePopup.lookupReference('gpfLoanDuplicate').setHidden(true);
                namePopup.lookupReference('cardDuplicate').setHidden(true);
                namePopup.lookupReference('duplicationStatus').setHidden(true);
            } else {
                namePopup.lookupReference('managingDirectorCeoName').setHidden(true);
                namePopup.lookupReference('recommendedBy1').setHidden(true);
                namePopup.lookupReference('recommendedBy2').setHidden(true);
                namePopup.lookupReference('endorsedBy1').setHidden(true);
                namePopup.lookupReference('endorsedBy2').setHidden(true);
            }

            namePopup.show();
            namePopup.modal = true;
        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Card\'.');
            return;
        }
    },

    onCardCancelNamePopup: function(button, e, eOpts) {
        button.up('#namePopup').close();
    },
    onClickYesCardOnNamePopup: function(button, e, eOpts) {
        var reportApplicationType = 'CREDIT_CARD_TYPE';

        var nameOfEmployees = this.lookupReference('nameOfEmployees').value;
        var employeeId = this.lookupReference('employeeId').value;
        var headOfCard = this.lookupReference('headOfCard').value;

        var presonalLoanDuplicate = this.lookupReference('presonalLoanDuplicate').value;
        var gpfLoanDuplicate = this.lookupReference('gpfLoanDuplicate').value;
        var cardDuplicate = this.lookupReference('cardDuplicate').value;
        var duplicationStatus = this.lookupReference('duplicationStatus').value;

        var managingDirectorCeoName = this.lookupReference('managingDirectorCeoName').value;
        var recommendedBy1 = this.lookupReference('recommendedBy1').value;
        var recommendedBy2 = this.lookupReference('recommendedBy2').value;
        var endorsedBy1 = this.lookupReference('endorsedBy1').value;
        var endorsedBy2 = this.lookupReference('endorsedBy2').value;

        var grid = this.lookupReference('cardMainSearchGrid').value;
        var selectedCard = grid.getSelectionModel().getSelection();

        var idList = 'idList=';

        for (var i = 0; i < selectedCard.length; i++) {

            idList += selectedCard[i].data.creditCardId;

            var j = i + 1;

            if (j != selectedCard.length) {
                idList += '&idList=';
            }
        }

        var userId = loginUser.id;
        var userName = loginUser.unId;

        var reportName = appConstants.LMS_BRANCH_OFFICE;
        if (!(userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER) || userRoles.containsKey(appConstants.CARD_OFFICER) || userRoles.containsKey(appConstants.HEAD_OF_CARD))) {
            reportName = appConstants.LMS_HEAD_OFFICE;
        }


        var d = new Date();
        var reportReqTime = d.getTime();

        var pdfPanel = Ext.create('Ext.panel.Panel', {
            title: "Card Details Report",
            itemId: 'cardDetailsPdfReportPanel',
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
                name: 'cardDetailsReportPanel',
                itemId: 'cardDetailsReportPanel',
                id: 'cardDetailsReportPanel',
                width: 940,
                height: 540,
                modal: true,
                autoEl: {
                    tag: 'iframe',
                    style: 'overflow:auto;width:100%;height:540px;',
                    src: LMS_REPORT_URL + '?reportlocation=webreturn&reportformat=pdf' + '&reportName=' +
                        reportName + '&reportReqTime=' + reportReqTime + '&userId=' + userId + '&username=' + '&reportApplicationType=' + reportApplicationType +
                        '&nameOfEmployees=' + nameOfEmployees + '&employeeId=' + employeeId + '&headOfCard=' + headOfCard +
                        '&presonalLoanDuplicate=' + presonalLoanDuplicate + '&gpfLoanDuplicate=' + gpfLoanDuplicate +
                        '&cardDuplicate=' + cardDuplicate + '&duplicationStatus=' + duplicationStatus + '&managingDirectorCeoName=' + managingDirectorCeoName +
                        '&recommendedBy1=' + recommendedBy1 + '&recommendedBy2=' + recommendedBy2 + '&endorsedBy1=' + endorsedBy1 +
                        '&endorsedBy2=' + endorsedBy2 + '&' + idList
                },
                listeners: {
                    load: {
                        element: 'el',
                        fn: function() {
                            this.parent().unmask();
                        }
                    },
                    /**/
                    render: function() {
                        // this.up('panel').body.mask('Please Wait...');
                    }
                }
            }]
        });

        button.up('#namePopup').close();
        pdfPanel.show();
    },
    onActivateCardNamePopup: function(cmp, eOpts) {},

    generateCardCOfficerExcelReport: function(button) {

        console.log("Generating PPC Excel Report");

        var me = this;
        var grid = me.lookupReference('cardMainSearchGrid');
        var selectedRows = grid.getSelection().length;
        var reportName = 'HOC-Excel';
        var d = new Date();
        var reportReqTime = d.getTime();
        var cardIdsList = [];
        loginUser = gLoginUuser;
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var selectedCard = grid.getSelectionModel().getSelection();
        var reportApplicationType = 'CREDIT_CARD_TYPE';
        if (selectedCard.length > 0) {

            showDownloadProcessingBarCard(button, 'Downloading...', 'Please wait...');

            for (var i = 0; i < selectedRows; i++) {
                cardIdsList.push(grid.getSelection()[i].data.creditCardId);
            }

            var creditCardId = cardIdsList.join();
            var download = Ext.create('Ext.form.Panel', {
                renderTo: Ext.getBody(),
                standardSubmit: true,
                url: LMS_LOAN_GRID_PPC_EXCEL_REPORT_URL
            });
            download.submit({
                params: {
                    'creditCardId': creditCardId,
                    'reportlocation': 'webreturn',
                    'reportformat': 'xlsx',
                    'reportName': reportName,
                    'reportReqTime': reportReqTime,
                    'userId': userId,
                    'userName': userName,
                    'reportApplicationType': reportApplicationType,
                }
            });
        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\' item(s).');
            return;
        }

    },
    generateCardMISExcelReport: function(button) {

        console.log("Generating MIS-CRM-Excel Report");

        var me = this;
        var grid = me.lookupReference('cardMainSearchGrid');
        var selectedRows = grid.getSelection().length;
        var reportName = 'CRM-Excel';
        var d = new Date();
        var reportReqTime = d.getTime();
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var creditCardId = [];
        var selectedCard = grid.getSelectionModel().getSelection();
        var reportApplicationType = 'CREDIT_CARD_TYPE';
        if (selectedCard.length > 0) {

            showDownloadProcessingBarCard(button, 'Downloading...', 'Please wait...');

            for (var i = 0; i < selectedRows; i++) {
                creditCardId.push(grid.getSelection()[i].data.creditCardId);
            }
            creditCardId = creditCardId.join();
            Ext.create('Ext.form.Panel', {
                renderTo: Ext.getBody(),
                standardSubmit: true,
                url: LMS_LOAN_GRID_MIS_EXCEL_REPORT_URL
            }).submit({
                params: {
                    'creditCardId': creditCardId,
                    'reportlocation': 'webreturn',
                    'reportformat': 'xlsx',
                    'reportName': reportName,
                    'reportReqTime': reportReqTime,
                    'userId': userId,
                    'userName': userName,
                    'reportApplicationType': reportApplicationType,
                }
            });
        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\'.');
            return;
        }
    },
    onBeforeLoadCardPanel: function(cmp, eOpts) {
        var store = getGlobalStore('gCardGridViewStore');
        store.clearFilter()
        store.removeAll();

        if (userRoles.containsKey(appConstants.CREDIT_ANALYST) || userRoles.containsKey(appConstants.UNIT_HEAD) ||
            userRoles.containsKey(appConstants.HO_CRM) || userRoles.containsKey(appConstants.ICT_DIVISION) ||
            userRoles.containsKey(appConstants.CO) || userRoles.containsKey(appConstants.RISK_MANAGER) ||
            userRoles.containsKey(appConstants.CARD_OFFICER)) {

            cmp.lookupReference('createCardGroupBtn').setHidden(false);
            cmp.lookupReference('idCardGrouping').setDisabled(false);
        }
    },
    onCreateCardGroup: function(btn, e, eOpts) {

        var cardMainPanel = this;
        var grid = cardMainPanel.lookupReference('cardMainSearchGrid');
        var selectedRows = grid.getSelection().length;
        var cardIdsList = [];
        var cardTrackingIdList = [];
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var selectedCard = grid.getSelectionModel().getSelection();

        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        if (selectedCard.length > 0) {

            for (var i = 0; i < selectedRows; i++) {
                cardIdsList.push(grid.getSelection()[i].data.creditCardId);
                cardTrackingIdList.push(grid.getSelection()[i].data.ccTrackingNumber);
            }

            var msgText = 'Are your sure to create new card group for ' + selectedRows + ' item(s)?';

            Ext.Msg.confirm("Attention", msgText, function(btn) {
                if (btn == 'yes') {
                    var header = {
                        reference: 'onCreateCardGroup'
                    };

                    var payload = [{
                        cardIdList: cardIdsList,
                        userModKey: loginUser.id
                    }]

                    cardMainPanel.sendRequest(appActionType.ACTION_TYPE_CREATE_CARD_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                    //loanMainPanel.loadLoanGridData();
                    cardMainPanel.lookupReference('idCardGrouping').setDisabled(false);
                    cardMainPanel.lookupReference('idCardGrouping').show();
                    cardMainPanel.loadCardGroupGridPanelData();
                }
            });
        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
            return;
        }

    },
    loadCardGroupGridPanelData: function() {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var header = {
            reference: 'loadCardGroupGridPanelData'
        };

        var fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
        var toDate = new Date();

        fromDate = Ext.Date.format(fromDate, 'Y-m-d');
        toDate = Ext.Date.format(toDate, 'Y-m-d');

        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: fromDate,
            toDate4Src: toDate
        }];
        showProcessMessage('Loading data....');
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_ALL_CARD_GROUP_DATA, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onClickGroupingCardSearch: function() {
        var me = this;
        // cardPanel = this;

        var me = this;
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var cardGroupId = me.lookupReference('cardGroupId').value;
        var stateName = me.lookupReference('ccGroupStatus').value;

        var fromDate = me.lookupReference('fromDate').value;
        var toDate = me.lookupReference('toDate').value;

        if (!toDate) toDate = new Date();
        if (!stateName && !fromDate && !cardGroupId) {
            fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
        }

        if (fromDate && toDate.getTime() < fromDate.getTime()) {
            Ext.Msg.alert('Error', 'To date must be greater then from date.');
            return;
        }

        fromDate = fromDate ? Ext.Date.format(fromDate, 'Y-m-d') : null;
        toDate = toDate ? Ext.Date.format(toDate, 'Y-m-d') : null;
        cardGroupId = cardGroupId ? cardGroupId : null;
        stateName = stateName ? stateName : null;

        var header = {
            reference: 'onClickGroupingCardSearch'
        };

        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: fromDate,
            toDate4Src: toDate,
            stateName: stateName,
            cardGroupId: cardGroupId,
        }];
        showProcessMessage('Loading data....');
        me.sendRequest(appActionType.ACTION_TYPE_SEARCH_CARD_GROUP_DATA, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onAddCardToCardGroup: function(btn, e, eOpts) {
        var cardGroupPanel = this;
        var grid = cardGroupPanel.lookupReference('addToCardGroupGrid');
        var selectedRows = grid.getSelection().length;
        var cardIdsList = [];
        var cardTrackingIdList = [];
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var selectedCard = grid.getSelectionModel().getSelection();
        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;
            for (var i = 0; i < selectedRows; i++) {
                cardIdsList.push(grid.getSelection()[i].data.creditCardId);
                cardTrackingIdList.push(grid.getSelection()[i].data.ccTrackingNumber);
                if (cardGroupId != grid.getSelection()[i].data.cardGroupId) {
                    Ext.Msg.alert('Attention', 'Card add to Group allowed only from same loan group');
                    return;
                }
            }

            var msgText = 'Are your sure to add ' + selectedRows;
            var viewTitle = addCardToCardGroupWindow.title.split(':');
            var groupId = viewTitle[1].trim();
            Ext.Msg.confirm("Attention", msgText, function(btn) {
                if (btn == 'yes') {
                    var header = {
                        reference: 'onAddCardToCardGroup'
                    };

                    var payload = [{
                        cardIdList: cardIdsList,
                        cardGroupId: groupId,
                        userModKey: loginUser.id
                    }]

                    cardGroupPanel.sendRequest(appActionType.ACTION_TYPE_ADD_CARD_TO_CARD_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                    localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
                }
            });

        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Card\' item(s).');
            return;
        }
    },
    onCardRemoveFromCardGroup: function(cmp, e, eOpts) {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var cardMainPanel = this;
        cardPanel = this;
        var grid = cardMainPanel.lookupReference('addToCardGroupGrid');
        var selectedRows = grid.getSelection().length;
        var cardIdsList = [];
        var cardTrackingIdList = [];
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var selectedCard = grid.getSelectionModel().getSelection();

        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;

            for (var i = 0; i < selectedRows; i++) {

                var cardState = selectedCard[i].data.stateName;
                if (cardState == 'SENT_TO_CO') {
                    Ext.Msg.alert('Attention', 'SENT_TO_CO state Card can not remove from card group. Tracking No.: ' + selectedCard[i].data.ccTrackingNumber);
                    return;
                }

                cardIdsList.push(grid.getSelection()[i].data.creditCardId);
                cardTrackingIdList.push(grid.getSelection()[i].data.ccTrackingNumber);
                if (cardGroupId != grid.getSelection()[i].data.cardGroupId) {
                    Ext.Msg.alert('Attention', 'Remove or Memo generation allowed only for same card group');
                    return;
                }
            }

            var msgText = 'Are your sure to remove ' + selectedRows + ' item(s) from group';

            Ext.Msg.confirm("Attention", msgText, function(btn) {
                if (btn == 'yes') {
                    var header = {
                        reference: 'onCardRemoveFromCardGroup'
                    };

                    var payload = [{
                        cardIdList: cardIdsList,
                        cardGroupId: cardGroupId,
                        userModKey: loginUser.id
                    }]

                    cardMainPanel.sendRequest(appActionType.ACTION_TYPE_REMOVE_CARD_FROM_CARD_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                    localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
                }
            });
        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Card\' item(s).');
            return;
        }

    },
    onCardGroupSearchRefresh: function(groupId) {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var viewTitle = addCardToCardGroupWindow.title.split(':');
        var groupId = viewTitle[1].trim();
        var header = {
            reference: 'onCardGroupGrid'
        };

        var payload = [{
            cardGroupId: groupId,
            userModKey: loginUser.id
        }]
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_FROM_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onCardGroupGrid: function(groupId) {
        this.lookupReference('cardSearchValue').setValue(null);
        var header = {
            reference: 'onCardGroupGrid'
        };

        var payload = [{
            cardGroupId: groupId,
            userModKey: loginUser.id
        }]
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_FROM_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onCardUnlockGroupGrid: function(groupId) {
        var header = {
            reference: 'onCardUnlockGroupGrid'
        };

        var payload = [{
            cardGroupId: groupId,
            userModKey: loginUser.id
        }]
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_FROM_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);

    },
    onAddToCardGroupSearch: function() {

        var me = this;

        var ccTrackingNumber = me.lookupReference('ccTrackingNumber').value;
        var fromDate = me.lookupReference('fromDate').value;
        var toDate = me.lookupReference('toDate').value;
        me.lookupReference('cardSearchValue').setValue('SEARCH');
        me.lookupReference('isCardOnlyPrint').setValue(true);

        var data = getGlobalStore('gAddToCardGroupGridViewStore').data.items;
        if (data.length > 0) {
            var cardGroupStateName = data[0].data.stateName;
            var cardGroupId = data[0].data.cardGroupId;
            me.lookupReference('cardGroupStateName').setValue(cardGroupStateName);
            me.lookupReference('cardGroupId').setValue(cardGroupId);
        }

        if (!toDate) toDate = new Date();
        if (!ccTrackingNumber && !fromDate) {
            fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
        }

        if (fromDate && toDate.getTime() < fromDate.getTime()) {
            Ext.Msg.alert('Error', 'To date must be greater then from date.');
            return;
        }

        fromDate = fromDate ? Ext.Date.format(fromDate, 'Y-m-d') : null;
        toDate = toDate ? Ext.Date.format(toDate, 'Y-m-d') : null;
        ccTrackingNumber = ccTrackingNumber ? ccTrackingNumber : null;

        if (!ccTrackingNumber && !fromDate) {
            fromDate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
        }

        var currentUserRoleName = loginUser.roleList[0].name;

        var header = {
            reference: 'onCardAddToCardGroupDetailsPanelLoad'
        };

        var payload = [{
            userModKey: loginUser.id,
            fromDate4Src: fromDate,
            toDate4Src: toDate,
            ccTrackingNumber: ccTrackingNumber,
            currentUserRoleName: currentUserRoleName,
        }];
        showProcessMessage('Loading data....');
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_FOR_ADD_TO_CARD_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);

    },
    onAddToCardGroupGridSelectionChange: function(cmp, records, eOpts) {

        var grid = this.lookupReference('addToCardGroupGrid');
        var addToCardnGroupBtn = this.lookupReference('addToCardGroupBtn');
        var cardGroupStateName = this.lookupReference('cardGroupStateName').value;
        var groupId = this.lookupReference('cardGroupId').value;
        var cardSearchValue = this.lookupReference('cardSearchValue').value;
        var isCardPrintValue = this.lookupReference('isCardOnlyPrint').value;
        var isOnlyPrintCard = this.lookupReference('isCardOnlyPrint');
        var searchValue = this.lookupReference('cardSearchValue').value;
        var btnCardSendToMd = this.lookupReference('btnCardSendToMd');
        var removeFromCardGroupBtn = this.lookupReference('removeFromCardGroupBtn');
        var cardMemoReport = this.lookupReference('cardMemoReport');
        var matchCardGroupAmount = this.lookupReference('matchCardGroupAmount');
        var btnCardUnlockGroup = this.lookupReference('btnCardUnlockGroup');

        var selectedRows = grid.getSelection().length;
        var selectedCard = grid.getSelectionModel().getSelection();
        var cardStateName;
        var cardGroupId;

        count = 0
        if (selectedCard.length > 0) {
            for (var i = 0; i < selectedRows; i++) {
                cardGroupId = selectedCard[i].data.cardGroupId;
                cardStateName = selectedCard[i].data.stateName;

                if (!cardGroupStateName) {
                    cardGroupStateName = cardStateName;
                }
                if (!cardGroupId) {
                    cardGroupId = groupId;
                }
                if (cardGroupId) {
                    if (((cardStateName == appConstants.CREATED_GROUP) || (cardGroupStateName == appConstants.REJECTED_FROM_GROUP)) &&
                        (userRoles.containsKey(appConstants.HO_CRM)) || userRoles.containsKey(appConstants.CREDIT_ANALYST) ||
                        userRoles.containsKey(appConstants.RISK_MANAGER) || userRoles.containsKey(appConstants.UNIT_HEAD)) {

                        if ((cardGroupStateName == appConstants.CREATED_GROUP) || (cardGroupStateName == appConstants.REJECTED_CARD_GROUP)) {
                            isOnlyPrintCard.setDisabled(false);
                        } else {
                            isOnlyPrintCard.setDisabled(true);
                        }

                        if (searchValue == 'SEARCH') {
                            isOnlyPrintCard.setDisabled(true);
                        }
                        if (isCardPrintValue == true) {
                            btnCardSendToMd.setDisabled(true);
                        } else {
                            btnCardSendToMd.setDisabled(false);
                        }
                    }

                    //add in group
                    if (userRoles.containsKey(appConstants.CREDIT_ANALYST) || userRoles.containsKey(appConstants.RISK_MANAGER) ||
                        userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.HO_CRM)) {
                        if ((cardGroupStateName == appConstants.CREATED_GROUP || (cardGroupStateName == appConstants.REJECTED_CARD_GROUP)) &&
                            (cardStateName == "UH_APPROVE") || (cardStateName == "RM_APPROVE") || (cardStateName == "HOCRM_APPROVE")) {
                            addToCardnGroupBtn.setDisabled(false);
                        } else {
                            addToCardnGroupBtn.setDisabled(true);
                        }
                    }

                    if (userRoles.containsKey(appConstants.CARD_OFFICER)) {
                        if ((cardGroupStateName == appConstants.CREATED_GROUP || (cardGroupStateName == appConstants.REJECTED_CARD_GROUP)) &&
                            (cardStateName == "PRE_APPROVED")) {
                            addToCardnGroupBtn.setDisabled(false);
                        } else {
                            addToCardnGroupBtn.setDisabled(true);
                        }
                    }

                    // remove form group
                    if ((cardGroupStateName == appConstants.CREATED_GROUP || cardGroupStateName == appConstants.REJECTED_CARD_GROUP) && (userRoles.containsKey(appConstants.CREDIT_ANALYST) ||
                            userRoles.containsKey(appConstants.RISK_MANAGER) || userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.HO_CRM) || userRoles.containsKey(appConstants.CARD_OFFICER))) {
                        if (selectedCard[i].data.cardGroupId) {
                            removeFromCardGroupBtn.setDisabled(false);
                        }
                    } else {
                        removeFromCardGroupBtn.setDisabled(true);
                    }
                    //memo button
                    if (selectedCard[i].data.cardGroupId) {
                        cardMemoReport.setDisabled(false);
                    }
                    //unlock && reject from group ICT_DIVISION
                    if (userRoles.containsKey(appConstants.ICT_DIVISION)) {
                        if ((cardGroupStateName == appConstants.PEND_MD_APPROVED)) {
                            if ((cardStateName == "UH_APPROVE") || (cardStateName == "RM_APPROVE") ||
                                (cardStateName == "HOCRM_APPROVE") || (cardStateName == "PRE_APPROVED")) {
                                btnCardUnlockGroup.setDisabled(true);
                            } else {
                                btnCardUnlockGroup.setDisabled(false);
                            }
                        } else {
                            btnCardUnlockGroup.setDisabled(true);
                        }
                    }
                    // //Match Group Amount button
                    if (userRoles.containsKey(appConstants.CO)) {
                        if ((cardGroupStateName == appConstants.PEND_MD_APPROVED)) {
                            matchCardGroupAmount.setDisabled(false);
                        } else {
                            matchCardGroupAmount.setDisabled(true);
                        }
                        matchCardGroupAmount.setHidden(false);
                    }
                }
            }
        } else {
            addToCardnGroupBtn.setDisabled(true);
            removeFromCardGroupBtn.setDisabled(true);
            btnCardSendToMd.setDisabled(true);
            isOnlyPrintCard.setDisabled(true);
            matchCardGroupAmount.setDisabled(true);
            cardMemoReport.setDisabled(true);
            btnCardUnlockGroup.setDisabled(true);
        }
    },
    onGridFilterEntryChange: function(component, newValue, oldValue, eOpts) {
        var grid = component.up('grid');
        this.filterCardGrid(grid, newValue, cardResultFiler);
    },
    onCancelMemoPopup: function(button, e, eOpts) {
        button.up('#memoPopup').close();
    },
    onCardGroupSelChng: function(button, e, eOpts) {
        var grid = this.lookupReference('cardGroupMainSearchGrid');
        var cardMemoReport = this.lookupReference('cardMemoReport');
        var selectedRows = grid.getSelection().length;
        if (selectedRows == 1) {
            cardMemoReport.setDisabled(false);
        } else {
            cardMemoReport.setDisabled(true);
        }
    },
    generateCardMemoReport: function(btn, e, eOpts) {
        var grid
        grid = this.lookupReference('cardGroupMainSearchGrid');
        if (!grid) {
            grid = this.lookupReference('addToCardGroupGrid');
        }
        var selectedRows = grid.getSelection().length;

        var selectedCard = grid.getSelectionModel().getSelection();
        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;

            for (var i = 0; i < selectedRows; i++) {
                if (cardGroupId != grid.getSelection()[i].data.cardGroupId) {
                    Ext.Msg.alert('Attention', 'Remove card from card group allowed only for same card group');
                    return;
                }
            }
            var memonamePopup = Ext.create('Desktop.view.card.CardMemoPopup');
            memonamePopup.lookupReference('cardGroupMainSearchGrid').setValue(grid);
            memonamePopup.show();
            memonamePopup.modal = true;
        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\'.');
            return;
        }

    },

    generateCardMemoReportSecond: function(btn, e, eOpts) {
        var grid
        grid = this.lookupReference('cardGroupMainSearchGrid');
        if (!grid) {
            grid = this.lookupReference('addToCardGroupGrid');
        }
        groupCardPanel = this;
        var isCardOnlyPrint = this.lookupReference('isCardOnlyPrint').value;
        var sendToMdMode;

        if (isCardOnlyPrint == true) {
            sendToMdMode = appConstants.ONLY_PRINT;
        } else {
            sendToMdMode = appConstants.PRINT_WITH_SENT_TO_MD;
        }
        this.lookupReference('isCardOnlyPrint').setValue(true);

        var selectedRows = grid.getSelection().length;

        var selectedCard = grid.getSelectionModel().getSelection();
        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;

            for (var i = 0; i < selectedRows; i++) {
                if (cardGroupId != grid.getSelection()[i].data.cardGroupId) {
                    Ext.Msg.alert('Attention', 'Remove card from card group allowed only for same card group');
                    return;
                }
            }
            var memonamePopup = Ext.create('Desktop.view.card.CardMemoPopup');
            memonamePopup.lookupReference('cardGroupMainSearchGrid').setValue(grid);
            memonamePopup.lookupReference('cardGroupId').setValue(cardGroupId);
            memonamePopup.lookupReference('onlyCardPrintValue').setValue(sendToMdMode);
            memonamePopup.show();
            memonamePopup.modal = true;
        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Loan\'.');
            return;
        }

    },
    onClickYesOnMemoPopup: function(button, e, eOpts) {
        var me = this;
        var approvedMemoRef = this.lookupReference('approvedMemoRef').value;
        var preparedByName = this.lookupReference('preparedByName').value;
        var preparedByDesignation = this.lookupReference('preparedByDesignation').value;
        var recommended1ByName = this.lookupReference('recommended1ByName').value;
        var recommended2ByName = this.lookupReference('recommended2ByName').value;
        var recommended3ByName = this.lookupReference('recommended3ByName').value;
        var recommended4ByName = this.lookupReference('recommended4ByName').value;
        var recommended5ByName = this.lookupReference('recommended5ByName').value;
        var recommended6ByName = this.lookupReference('recommended6ByName').value;
        var recommended1ByDesignation = this.lookupReference('recommended1ByDesignation').value;
        var recommended2ByDesignation = this.lookupReference('recommended2ByDesignation').value;
        var recommended3ByDesignation = this.lookupReference('recommended3ByDesignation').value;
        var recommended4ByDesignation = this.lookupReference('recommended4ByDesignation').value;
        var recommended5ByDesignation = this.lookupReference('recommended5ByDesignation').value;
        var recommended6ByDesignation = this.lookupReference('recommended6ByDesignation').value;
        var approvedByName = this.lookupReference('approvedByName').value;
        var approvedByDesignation = this.lookupReference('approvedByDesignation').value;
        var onlyCardPrintValue = this.lookupReference('onlyCardPrintValue').value;

        recommended1ByDesignation = recommended1ByDesignation.replaceAll('&', 'AND_SYMBOL');
        recommended2ByDesignation = recommended2ByDesignation.replaceAll('&', 'AND_SYMBOL');
        recommended3ByDesignation = recommended3ByDesignation.replaceAll('&', 'AND_SYMBOL');
        recommended4ByDesignation = recommended4ByDesignation.replaceAll('&', 'AND_SYMBOL');
        recommended5ByDesignation = recommended5ByDesignation.replaceAll('&', 'AND_SYMBOL');
        recommended6ByDesignation = recommended6ByDesignation.replaceAll('&', 'AND_SYMBOL');
        approvedByDesignation = approvedByDesignation.replaceAll('&', 'AND_SYMBOL');

        var grid = this.lookupReference('cardGroupMainSearchGrid').value;
        // var selectedRows = grid.getSelection().length;
        var selectedCard = grid.getSelectionModel().getSelection();

        var userId = loginUser.id;
        var userName = loginUser.unId;
        var reportApplicationType = 'CREDIT_CARD_TYPE';
        var stateId;
        var stateName;

        var reportName = appConstants.CARD_GROUPING_MEMO_APPROVAL_REPORT;

        var cardGroupId;

        for (var i = 0; i < selectedCard.length; i++) {

            cardGroupId = selectedCard[i].data.cardGroupId;
            stateId = selectedCard[0].data.idGroupStateKey;
            stateName = selectedCard[0].data.stateName;
        }

        var d = new Date();
        var reportReqTime = d.getTime();

        var pdfPanel = Ext.create('Ext.panel.Panel', {
            title: "Memo Approval Report",
            itemId: 'cardMemoPdfReportPanel',
            closable: true,
            floatable: true,
            floating: true,
            draggable: true,
            width: 950,
            height: 550,
            modal: true,
            alwaysOnTop: true,
            listeners: {
                close: function(cmp, eOpts) {
                    me.onCardGroupGridViewMemo(cardGroupId);
                }
            },
            items: [{
                xtype: "component",
                name: 'cardMemoReportPanel',
                itemId: 'cardMemoReportPanel',
                id: 'cardMemoReportPanel',
                width: 940,
                height: 540,
                modal: true,
                autoEl: {
                    tag: 'iframe',
                    style: 'overflow:auto;width:100%;height:540px;',
                    src: LMS_REPORT_URL + '?reportlocation=webreturn&reportformat=pdf' +
                        '&reportName=' + reportName +
                        '&reportReqTime=' + reportReqTime +
                        '&userId=' + userId +
                        '&username=' + userName +
                        '&approvedMemoRef=' + approvedMemoRef +
                        '&preparedByName=' + preparedByName +
                        '&preparedByDesignation=' + preparedByDesignation +
                        '&recommended1ByName=' + recommended1ByName +
                        '&recommended2ByName=' + recommended2ByName +
                        '&recommended3ByName=' + recommended3ByName +
                        '&recommended4ByName=' + recommended4ByName +
                        '&recommended5ByName=' + recommended5ByName +
                        '&recommended6ByName=' + recommended6ByName +
                        '&recommended1ByDesignation=' + recommended1ByDesignation +
                        '&recommended2ByDesignation=' + recommended2ByDesignation +
                        '&recommended3ByDesignation=' + recommended3ByDesignation +
                        '&recommended4ByDesignation=' + recommended4ByDesignation +
                        '&recommended5ByDesignation=' + recommended5ByDesignation +
                        '&recommended6ByDesignation=' + recommended6ByDesignation +
                        '&approvedByName=' + approvedByName +
                        '&approvedByDesignation=' + approvedByDesignation +
                        '&cardGroupId=' + cardGroupId +
                        '&onlyCardPrintValue=' + onlyCardPrintValue +
                        '&stateId=' + stateId +
                        '&stateName=' + stateName +
                        '&reportApplicationType=' + reportApplicationType
                },
                listeners: {
                    load: {
                        element: 'el',
                        fn: function() {
                            this.parent().unmask();
                        }
                    },
                    /**/
                    render: function() {
                        // this.up('panel').body.mask('Please Wait...');
                    }
                }
            }]
        });

        button.up('#memoPopup').close();
        pdfPanel.show();
    },
    // onFullOutstanding: function (btn, e, eOpts) {
    // 	var autoDebitReqFullOutstanding = this.lookupReference('autoDebitReqFullOutstanding').value;
    // 	if(autoDebitReqFullOutstanding == false){
    // 		this.lookupReference('minimumAmount').setHidden(false);
    // 	}else{
    // 		this.lookupReference('minimumAmount').setHidden(true);
    // 	}
    // },
    onAdditionalIncomeCal: function(btn, e, eOpts) {
        var additionalIncomeAmount = this.lookupReference('additionalIncomeAmount').value;
        var salaryDepositedLastMonth = this.lookupReference('salaryDepositedLastMonth').value;
        var totalAmount = this.lookupReference('totalIncome').value;
        if (additionalIncomeAmount && salaryDepositedLastMonth) {
            totalAmount = additionalIncomeAmount + salaryDepositedLastMonth;
            this.lookupReference('totalIncome').setValue(totalAmount);
        } else if (additionalIncomeAmount && !salaryDepositedLastMonth) {
            this.lookupReference('totalIncome').setValue(additionalIncomeAmount);
        } else if (!additionalIncomeAmount && salaryDepositedLastMonth) {
            this.lookupReference('totalIncome').setValue(salaryDepositedLastMonth);
        } else {
            this.lookupReference('totalIncome').setValue(totalAmount);
        }

    },
    onTotalEmiPaidInCbbl: function(btn, e, eOpts) {
        var totalAmount = this.lookupReference('totalIncome').value;
        var totalEmiPaidInCbbl = this.lookupReference('totalEmiPaidInCbbl').value;
        this.lookupReference('afterCbblEmi').setValue(totalAmount - totalEmiPaidInCbbl);

    },
    ontotalIncome: function(btn, e, eOpts) {
        var totalAmount = this.lookupReference('totalIncome').value;
        var totalEmiPaidInCbbl = this.lookupReference('totalEmiPaidInCbbl').value;
        this.lookupReference('afterCbblEmi').setValue(totalAmount - totalEmiPaidInCbbl);

    },
    onAppliedAmount: function(btn, e, eOpts) {
        var appliedAmount = this.lookupReference('appliedAmount').value;
        var calAppliedCardMinBill = appliedAmount * 5 / 100;

        this.lookupReference('appliedCardMinBill').setValue(calAppliedCardMinBill);
    },
    onCardProposedLimit: function(btn, e, eOpts) {
        var cardProposedLimit = this.lookupReference('cardProposedLimit').value;
        var valueOfSecurity = this.lookupReference('valueOfSecurity').value;
        if (cardProposedLimit) {
            var calCardProposedLimit = cardProposedLimit * 5 / 100;
            this.lookupReference('minimumPayment1').setValue(calCardProposedLimit);
            this.lookupReference('minimumPayment2').setValue(calCardProposedLimit);
        }
        if (cardProposedLimit && valueOfSecurity) {
            var calLoanToValue = cardProposedLimit / valueOfSecurity;
            this.lookupReference('loanToValue').setValue(calLoanToValue);
        }
    },
    onValueOfSecurity: function(btn, e, eOpts) {
        var cardProposedLimit = this.lookupReference('cardProposedLimit').value;
        var valueOfSecurity = this.lookupReference('valueOfSecurity').value;
        if (cardProposedLimit && valueOfSecurity) {
            var calLoanToValue = cardProposedLimit / valueOfSecurity;
            this.lookupReference('loanToValue').setValue(calLoanToValue);
        }
    },
    onCardRmRecommendToGroupClick: function(cmp, items) {
        var roleName = cmp.initialConfig.roleName;
        var action;
        if (roleName == appConstants.UNIT_HEAD) {
            action = appActionType.ACTION_TYPE_RECOMMEND_TO_UH;
        } else if (roleName == appConstants.HO_CRM) {
            action = appActionType.ACTION_TYPE_RECOMMEND_TO_HOCRM;
        } else {
            action = appActionType.ACTION_TYPE_RECOMMEND_TO_CD;
        }
        this.onCardRecommendToGroupClick(cmp, action, appConstants.RM_RECOMMEND_TO_GROUP);
    },
    onCardRmRecommendToUserClick: function(cmp, items) {
        var roleName = cmp.parentMenu.ownerCmp.roleName;
        var action;
        if (roleName == appConstants.UNIT_HEAD) {
            action = appActionType.ACTION_TYPE_RECOMMEND_TO_UH;
        } else if (roleName == appConstants.HO_CRM) {
            action = appActionType.ACTION_TYPE_RECOMMEND_TO_HOCRM;
        } else {
            action = appActionType.ACTION_TYPE_RECOMMEND_TO_CD;
        }
        this.onCardRecommendToUserClick(cmp, action, appConstants.RM_RECOMMEND_TO_USER);
    },

    onCardRecommendToGroupClick: function(cmp, actionType, commentType) {
        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        var commentType = commentType;
        cardRecommentSetValue(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onCardRecommendToUserClick: function(cmp, actionType, commentType) {

        var newRecomment = Ext.create('Desktop.view.card.CardRecommentPopup');
        var commentType = commentType;
        cardRecommentSetValue(newRecomment, cmp, commentType, actionType);
        newRecomment.show();
    },
    onClicCardNidViewFile: function(btn, e, eOpts) {
        var cardId = this.lookupReference('keepHiddenCreditCardId').value;
        this.viewFileByCardDocType(cardId, appConstants.DOC_TYPE_NID_CARD);
    },
    onClickCardTinViewFile: function(btn, e, eOpts) {
        var cardId = this.lookupReference('keepHiddenCreditCardId').value;
        this.viewFileByCardDocType(cardId, appConstants.DOC_TYPE_TIN);
    },
    viewFileByCardDocType: function(cardId, docType) {
        var objectType = 'CREDIT_CARD_TYPE';
        var serverUrl = VIEW_LOAN_DOC_URL + '?cardId=' + cardId + '&docType=' + docType + '&userModKey=' + loginUser.id + '&objectType=' + objectType;
        var pdfPanel = getCardPdfPanel("", "", "", "", "", serverUrl);
        pdfPanel.show();
    },
    onLoadCardGroupDataARender: function(btn, e, eOpts) {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var title = this.view.ownerCt.title;
        var viewTitle = title.split(':')
        var groupId = viewTitle[1].trim();

        var header = {
            reference: 'onLoadCardGroupDataARender'
        };

        var payload = [{
            cardGroupId: groupId,
            userModKey: loginUser.id
        }]
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_FROM_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
        localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
    },
    onBeforeCardGroupDataARender: function(btn, e, eOpts) {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var isOnlyPrint = this.lookupReference('isCardOnlyPrint');
        var header;
        isOnlyPrint.setValue(true);

        if (userRoles.containsKey(appConstants.CREDIT_ANALYST) || userRoles.containsKey(appConstants.RISK_MANAGER) ||
            userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.HO_CRM) || userRoles.containsKey(appConstants.ICT_DIVISION)) {
            this.lookupReference('btnCardSendToMd').setHidden(true);
            this.lookupReference('cardGroupTotalAmount').setHidden(false);
            this.lookupReference('cardGroupTotalFile').setHidden(false);
        }
        if (userRoles.containsKey(appConstants.CREDIT_ANALYST) || userRoles.containsKey(appConstants.RISK_MANAGER) ||
            userRoles.containsKey(appConstants.UNIT_HEAD) || userRoles.containsKey(appConstants.HO_CRM)) {
            this.lookupReference('btnCardUnlockGroup').setHidden(false);
            this.lookupReference('isCardOnlyPrint').setHidden(false);
            this.lookupReference('btnCardSendToMd').setHidden(false);
        }
        if (userRoles.containsKey(appConstants.ICT_DIVISION)) {
            this.lookupReference('btnCardUnlockGroup').setHidden(false);
        }
        if (userRoles.containsKey(appConstants.CD)) {
            this.lookupReference('cardMemoReport').setHidden(true);
            this.lookupReference('matchCardGroupAmount').setHidden(false);
            this.lookupReference('addToCardGroupBtn').setHidden(true);
            this.lookupReference('removeFromCardGroupBtn').setHidden(true);
        }

        var viewTitle = addCardToCardGroupWindow.title.split(':');
        var groupId = viewTitle[1].trim();

        var payload = [{
            cardGroupId: groupId,
            userModKey: loginUser.id
        }]
        header = {
            reference: 'onCardGroupCommentsView'
        }
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_LOAN_GROUP_COMMENTS_VIEW, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onClickCardOnlyPrint: function(cmp, eOpts) {
        var isCardOnlyPrint = this.lookupReference('isCardOnlyPrint').value;
        var btnCardSendToMd = this.lookupReference('btnCardSendToMd');

        var stateName = this.lookupReference('addToCardGroupGrid').getSelectionModel().getSelection()[0].data.stateName;
        if (stateName == appConstants.PEND_MD_APPROVED) {
            this.lookupReference('isCardOnlyPrint').setValue(false);
            this.lookupReference('isCardOnlyPrint').setDisabled(true);
        } else {
            if (isCardOnlyPrint == true) {
                btnCardSendToMd.setDisabled(true);
            } else {
                btnCardSendToMd.setDisabled(false);
            }
        }
    },
    onClickbtnCardSendToMd: function(cmp, eOpts) {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var cardGridPanel = this;
        var grid = cardGridPanel.lookupReference('addToCardGroupGrid');
        var selectedRows = grid.getSelection().length;
        var selectedCard = grid.getSelectionModel().getSelection();

        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;
            var stateId = selectedCard[0].data.idGroupStateKey;
            var stateName = selectedCard[0].data.stateName;

            var msgText = 'Sure you want SEND_TO_MD this Group?';

            Ext.Msg.confirm("Attention", msgText, function(btn) {
                if (btn == 'yes') {
                    var header = {
                        reference: 'onClickbtnCardSendToMd'
                    };

                    var payload = [{
                        cardGroupId: cardGroupId,
                        stateId: stateId,
                        stateName: stateName,
                        userModKey: loginUser.id
                    }]
                    cardGridPanel.sendRequest(appActionType.ACTION_TYPE_BULK_HOCRM_SEND_TO_MD, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                    localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
                }
            });
        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Card\' item(s).');
            return;
        }
    },
    onClickbtnCardUnlockGroup: function(btn, e, eOpts) {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        groupCardPanel = this;

        var grid = this.lookupReference('addToCardGroupGrid');

        var selectedRows = grid.getSelection().length;

        var selectedCard = grid.getSelectionModel().getSelection();

        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;
            var stateId = selectedCard[0].data.idGroupStateKey;
            var stateName = selectedCard[0].data.stateName;

            var unlockRejectComments = Ext.create('Desktop.view.card.CardRejUnlockComments');
            unlockRejectComments.lookupReference('cardGroupId').setValue(cardGroupId);
            unlockRejectComments.lookupReference('stateName').setValue(stateName);
            unlockRejectComments.lookupReference('stateId').setValue(stateId);
            unlockRejectComments.show();
            unlockRejectComments.modal = true;
        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
            return;
        }
    },
    onBeforerenderUnlockCard: function(cmp, records, eOpts) {
        if (userRoles.containsKey(appConstants.ICT_DIVISION)) {
            this.lookupReference('hoCrmCommentCard').setHidden(false);
        }
        if (userRoles.containsKey(appConstants.CD)) {
            this.lookupReference('cadCommentCard').setHidden(false);
        }
    },
    onCancelUnlockCard: function(button, e, eOpts) {
        button.up('#cardRejUnlockActionComment').close();
    },
    onCardCancelCompareAmount: function(button, e, eOpts) {
        button.up('#matchAmountPopup').close();
    },
    onSaveUnlockCard: function(button, e, eOpts) {
        var hoCrmComment = this.lookupReference('hoCrmCommentCard').value;
        var cadComment = this.lookupReference('cadCommentCard').value;
        var cardGroupId = this.lookupReference('cardGroupId').value;
        var stateId = this.lookupReference('stateId').value;
        var stateName = this.lookupReference('stateName').value;
        var me = this;
        var grid = this.lookupReference('addToCardGroupGrid');
        var selectedRows = grid.getSelection().length;
        var selectedCard = grid.getSelectionModel().getSelection();

        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;
            var stateId = selectedCard[0].data.idGroupStateKey;
            var stateName = selectedCard[0].data.stateName;

            var msgText = 'Sure you want Approved this Group?';

            Ext.Msg.confirm("Attention", msgText, function(btn) {
                if (btn == 'yes') {
                    var header = {
                        reference: 'onClickbtnCardMdApproved'
                    };

                    var payload = [{
                        cardGroupId: cardGroupId,
                        stateId: stateId,
                        stateName: stateName,
                        userModKey: loginUser.id
                    }]
                    me.sendRequest(appActionType.ACTION_TYPE_MD_APPROVED_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                    localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
                }
            });
        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
            return;
        }
    },
    onClickMatchGroupAmount: function(btn, e, eOpts) {
        groupCardPanel = this;
        var cardGroupTotalAmount = this.lookupReference('cardGroupTotalAmount').value;

        var matchGroupPopup = Ext.create('Desktop.view.card.MatchAmountPopup');
        matchGroupPopup.lookupReference('cardGroupTotalAmount').setValue(cardGroupTotalAmount);
        matchGroupPopup.show();
        matchGroupPopup.modal = true;
    },
    onCardClickCompareAmount: function(btn, e, eOpts) {
        var cardGroupTotalAmount = this.lookupReference('cardGroupTotalAmount').value;
        var entryCardGroupTotalAmount = this.lookupReference('entryCardGroupTotalAmount').value;
        var lonGroupDetailsStore = this.lookupReference('lonGroupDetailsStore')
        if (!entryCardGroupTotalAmount) {
            Ext.Msg.alert('Error', 'Please enter amount.')
            return;
        }
        if (cardGroupTotalAmount == entryCardGroupTotalAmount) {
            btn.up('#matchAmountPopup').close();
            Ext.toast('Amount Match.');
            groupCardPanel.lookupReference('btnCardMdApproved').setHidden(false);
            groupCardPanel.lookupReference('matchCardGroupAmount').setHidden(true);
            groupCardPanel.lookupReference('btnCardMdApproved').setDisabled(false);
        } else {
            btn.up('#matchAmountPopup').close();
            Ext.toast('Amount Not Match.');
            groupCardPanel.lookupReference('btnCardUnlockGroup').setText('Reject Group');
            groupCardPanel.lookupReference('btnCardUnlockGroup').setHidden(false);
            groupCardPanel.lookupReference('matchCardGroupAmount').setHidden(true);
            groupCardPanel.lookupReference('btnCardUnlockGroup').setDisabled(false);
        }
    },
    onCardGroupGridViewMemo: function(groupId) {
        var header = {
            reference: 'onCardGroupGridViewMemo'
        };

        var payload = [{
            cardGroupId: groupId,
            userModKey: loginUser.id
        }]
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_FROM_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);

    },
    onCheckCardDuplicate: function(creditCardId) {
        var header = {
            reference: 'onCheckCardDuplicate'
        };

        var payload = [{
            userModKey: loginUser.id,
            creditCardId: creditCardId
        }];
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_FOR_DUPLICATE_CHECK, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onClickCheckCardDuplications: function(cmp, e, eOpts) {

        if (!hoCrmComment && (userRoles.containsKey(appConstants.ICT_DIVISION))) {
            Ext.Msg.alert('Error', 'Please write your Comments.')
            return;
        }
        if (!cadComment && userRoles.containsKey(appConstants.CAD)) {
            Ext.Msg.alert('Error', 'Please write your Comments.')
            return;
        }
        button.up('#cardRejUnlockActionComment').close();
        var msgText = 'Sure you want Unlock & Reject this Group?';
        Ext.Msg.confirm("Attention", msgText, function(btn) {
            if (btn == 'yes') {
                var header = {
                    reference: 'onSaveUnlockCard'
                };

                var payload = [{
                    cardGroupId: cardGroupId,
                    stateId: stateId,
                    stateName: stateName,
                    hoCrmComment: hoCrmComment ? hoCrmComment : null,
                    cadComment: cadComment ? cadComment : null,
                    userModKey: loginUser.id
                }]
                me.sendRequest(appActionType.ACTION_TYPE_UNLOCK_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
            }
        });
    },
    onClickbtnCardMdApproved: function() {
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var me = this;
        var grid = this.lookupReference('addToCardGroupGrid');
        var selectedRows = grid.getSelection().length;
        var selectedCard = grid.getSelectionModel().getSelection();

        if (selectedCard.length > 0) {

            var cardGroupId = selectedCard[0].data.cardGroupId;
            var stateId = selectedCard[0].data.idGroupStateKey;
            var stateName = selectedCard[0].data.stateName;

            var msgText = 'Sure you want Approved this Group?';

            Ext.Msg.confirm("Attention", msgText, function(btn) {
                if (btn == 'yes') {
                    var header = {
                        reference: 'onClickbtnCardMdApproved'
                    };

                    var payload = [{
                        cardGroupId: cardGroupId,
                        stateId: stateId,
                        stateName: stateName,
                        userModKey: loginUser.id
                    }]
                    me.sendRequest(appActionType.ACTION_TYPE_MD_APPROVED_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
                    localStorage.setItem('cardGroupAddParam', JSON.stringify(payload[0]));
                }
            });
        } else {
            Ext.MessageBox.alert('Attention', 'Please select one or more \'Loan\' item(s).');
            return;
        }
    },
    // onClickMatchGroupAmount: function(btn, e, eOpts) {
    //     groupCardPanel = this;
    //     var cardGroupTotalAmount = this.lookupReference('cardGroupTotalAmount').value;

    //     var matchGroupPopup = Ext.create('Desktop.view.card.MatchAmountPopup');
    //     matchGroupPopup.lookupReference('cardGroupTotalAmount').setValue(cardGroupTotalAmount);
    //     matchGroupPopup.show();
    //     matchGroupPopup.modal = true;
    // },
    // onCardClickCompareAmount: function(btn, e, eOpts) {
    //     var cardGroupTotalAmount = this.lookupReference('cardGroupTotalAmount').value;
    //     var entryCardGroupTotalAmount = this.lookupReference('entryCardGroupTotalAmount').value;
    //     var lonGroupDetailsStore = this.lookupReference('lonGroupDetailsStore')
    //     if (!entryCardGroupTotalAmount) {
    //         Ext.Msg.alert('Error', 'Please enter amount.')
    //         return;
    //     }
    //     if (cardGroupTotalAmount == entryCardGroupTotalAmount) {
    //         btn.up('#matchAmountPopup').close();
    //         Ext.toast('Amount Match.');
    //         groupCardPanel.lookupReference('btnCardMdApproved').setHidden(false);
    //         groupCardPanel.lookupReference('matchCardGroupAmount').setHidden(true);
    //         groupCardPanel.lookupReference('btnCardMdApproved').setDisabled(false);
    //     } else {
    //         btn.up('#matchAmountPopup').close();
    //         Ext.toast('Amount Not Match.');
    //         groupCardPanel.lookupReference('btnCardUnlockGroup').setText('Reject Group');
    //         groupCardPanel.lookupReference('btnCardUnlockGroup').setHidden(false);
    //         groupCardPanel.lookupReference('matchCardGroupAmount').setHidden(true);
    //         groupCardPanel.lookupReference('btnCardUnlockGroup').setDisabled(false);
    //     }
    // },
    // onCardGroupGridViewMemo: function(groupId) {
    //     var header = {
    //         reference: 'onCardGroupGridViewMemo'
    //     };

    //     var payload = [{
    //         cardGroupId: groupId,
    //         userModKey: loginUser.id
    //     }]
    //     this.sendRequest(appActionType.ACTION_TYPE_SELECT_CARD_FROM_GROUP, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);

    // },
    onchangeApplicantDateOfBirth: function(cmp, newValue, oldValue, eOpts) {
        var applicantDateOfBirth = Ext.Date.format(newValue, 'Y-m-d');
        if (applicantDateOfBirth) {
            this.lookupReference('applicantDateOfBirth1').setValue(applicantDateOfBirth);
            this.lookupReference('applicantDateOfBirth2').setValue(applicantDateOfBirth);
        } else {
            this.lookupReference('applicantDateOfBirth1').setValue(null);
            this.lookupReference('applicantDateOfBirth2').setValue(null);
        }
    },

    //Start ---- Azizul Islam 2022-02-02
    onchangeApplicantName: function(cmp, newValue, oldValue, eOpts) {
        var applicantName = this.lookupReference('applicantName').value;
        if (applicantName != null) {
            this.lookupReference('applicantName1').setValue(applicantName);
            this.lookupReference('applicantName2').setValue(applicantName);
            this.lookupReference('applicantName3').setValue(applicantName);
            this.lookupReference('titleOfAccount').setValue(applicantName);
        } else {
            this.lookupReference('applicantName1').setValue(null);
            this.lookupReference('applicantName2').setValue(null);
            this.lookupReference('applicantName3').setValue(null);
            this.lookupReference('titleOfAccount').setValue(null);
        }
    },
    onchangeApplicantIdNo: function(cmp, newValue, oldValue, eOpts) {
        var applicantIdNo = this.lookupReference('applicantIdNo').value;
        if (applicantIdNo) {
            this.lookupReference('applicantIdNo1').setValue(applicantIdNo);
            // this.lookupReference('applicantIdNo2').setValue(applicantIdNo);
        } else {
            this.lookupReference('applicantIdNo1').setValue(null);
            // this.lookupReference('applicantIdNo2').setValue(null);

        }
    },
    onchangeApplicantCountryOfBirth: function(cmp, newValue, oldValue, eOpts) {
        var applicantCountryOfBirth = this.lookupReference('applicantCountryOfBirth').value;
        if (applicantCountryOfBirth) {
            this.lookupReference('applicantCountryOfBirth1').setValue(applicantCountryOfBirth);
            this.lookupReference('applicantCountryOfBirth2').setValue(applicantCountryOfBirth);
        } else {
            this.lookupReference('applicantCountryOfBirth1').setValue(null);
            this.lookupReference('applicantCountryOfBirth2').setValue(null);
        }
    },
    onchangeApplicantCountryOfBirth1: function(cmp, newValue, oldValue, eOpts) {
        var applicantCountryOfBirth1 = this.lookupReference('applicantCountryOfBirth1').value;
        if (applicantCountryOfBirth1) {
            this.lookupReference('applicantCountryOfBirth').setValue(applicantCountryOfBirth1);
            this.lookupReference('applicantCountryOfBirth2').setValue(applicantCountryOfBirth1);
        } else {
            this.lookupReference('applicantCountryOfBirth').setValue(null);
            this.lookupReference('applicantCountryOfBirth2').setValue(null);
        }
    },

    onchangeApplicantCountryOfBirth2: function(cmp, newValue, oldValue, eOpts) {
        var applicantCountryOfBirth2 = this.lookupReference('applicantCountryOfBirth2').value;
        if (applicantCountryOfBirth2) {
            this.lookupReference('applicantCountryOfBirth1').setValue(applicantCountryOfBirth2);
            this.lookupReference('applicantCountryOfBirth').setValue(applicantCountryOfBirth2);
        } else {
            this.lookupReference('applicantCountryOfBirth1').setValue(null);
            this.lookupReference('applicantCountryOfBirth').setValue(null);
        }
    },
    onchangeApplicantOfficePhoneNo: function(cmp, newValue, oldValue, eOpts) {
        var applicantOfficePhoneNo = this.lookupReference('applicantOfficePhoneNo').value;
        if (applicantOfficePhoneNo) {
            this.lookupReference('applicantOfficePhoneNo1').setValue(applicantOfficePhoneNo);
        } else {
            this.lookupReference('applicantOfficePhoneNo1').setValue(null);

        }
    },

    onchangeApplicantNidNumber: function(cmp, newValue, oldValue, eOpts) {
        var applicantNidNumber = this.lookupReference('applicantNidNumber').value;
        if (applicantNidNumber) {
            this.lookupReference('applicantNidNumber1').setValue(applicantNidNumber);
            this.lookupReference('applicantNidNumber2').setValue(applicantNidNumber);
        } else {
            this.lookupReference('applicantNidNumber1').setValue(null);
            this.lookupReference('applicantNidNumber2').setValue(null);

        }
    },
    onchangeApplicantBpNumber: function(cmp, newValue, oldValue, eOpts) {
        var applicantBpNumber = this.lookupReference('applicantBpNumber').value;
        if (applicantBpNumber) {
            this.lookupReference('applicantEmployeeID').setValue(applicantBpNumber);
            this.lookupReference('applicantEmployeeID1').setValue(applicantBpNumber);
        }
    },

    onchangeApplicantOfficeAddressCountry: function(cmp, newValue, oldValue, eOpts) {
        var applicantOfficeAddressCountry = this.lookupReference('applicantOfficeAddressCountry').value;
        if (applicantOfficeAddressCountry) {
            this.lookupReference('applicantOfficeAddressCountry1').setValue(applicantOfficeAddressCountry);
        } else {
            this.lookupReference('applicantOfficeAddressCountry1').setValue(null);

        }
    },
    onchangeApplicantOfficeAddress: function(cmp, newValue, oldValue, eOpts) {
        var applicantOfficeAddress = this.lookupReference('applicantOfficeAddress').value;
        if (applicantOfficeAddress) {
            this.lookupReference('applicantOfficeAddress1').setValue(applicantOfficeAddress);
        } else {
            this.lookupReference('applicantOfficeAddress1').setValue(null);

        }
    },   

    onchangeApplicantDistrictOfBirth: function(cmp, newValue, oldValue, eOpts) {
        var applicantDistrictOfBirth = this.lookupReference('applicantDistrictOfBirth').value;
        if (applicantDistrictOfBirth) {
            this.lookupReference('applicantDistrictOfBirth1').setValue(applicantDistrictOfBirth);
        } else {
            this.lookupReference('applicantDistrictOfBirth1').setValue(null);

        }
    },
    onchangeApplicantEtinNumber: function(cmp, newValue, oldValue, eOpts) {
        var applicantEtinNumber = this.lookupReference('applicantEtinNumber').value;
        if (applicantEtinNumber) {
            this.lookupReference('applicantEtinNumber1').setValue(applicantEtinNumber);
            this.lookupReference('applicantEtinNumber2').setValue(applicantEtinNumber);
        } else {
            this.lookupReference('applicantEtinNumber1').setValue(null);
            this.lookupReference('applicantEtinNumber2').setValue(null);

        }
    },
    onchangeApplicantPerAddressCountry: function(cmp, newValue, oldValue, eOpts) {
        var applicantPerAddressCountry = this.lookupReference('applicantPerAddressCountry').value;
        if (applicantPerAddressCountry) {
            this.lookupReference('applicantPerAddressCountry1').setValue(applicantPerAddressCountry);
            this.lookupReference('applicantPerAddressCountry3').setValue(applicantPerAddressCountry);
        } else {
            this.lookupReference('applicantPerAddressCountry1').setValue(null);
            this.lookupReference('applicantPerAddressCountry3').setValue(null);

        }
    },
    onchangeApplicantPerAddressDistrict: function(cmp, newValue, oldValue, eOpts) {
        var applicantPerAddressDistrict = this.lookupReference('applicantPerAddressDistrict').value;
        if (applicantPerAddressDistrict) {
            this.lookupReference('applicantPerAddressDistrict1').setValue(applicantPerAddressDistrict);   
            this.lookupReference('applicantPerAddressDistrict2').setValue(applicantPerAddressDistrict);         
        } else {
            this.lookupReference('applicantPerAddressDistrict1').setValue(null);
            this.lookupReference('applicantPerAddressDistrict2').setValue(null);  
        }
    },
    onchangeApplicantPerAddressDistrict1: function(cmp, newValue, oldValue, eOpts) {
        var applicantPerAddressDistrict1 = this.lookupReference('applicantPerAddressDistrict1').value;
        if (applicantPerAddressDistrict1) {
            this.lookupReference('applicantPerAddressDistrict').setValue(applicantPerAddressDistrict1);   
            this.lookupReference('applicantPerAddressDistrict2').setValue(applicantPerAddressDistrict1);         
        } else {
            this.lookupReference('applicantPerAddressDistrict').setValue(null);
            this.lookupReference('applicantPerAddressDistrict2').setValue(null);  
        }
    },
    onchangeApplicantPerAddressDistrict2: function(cmp, newValue, oldValue, eOpts) {
        var applicantPerAddressDistrict2 = this.lookupReference('applicantPerAddressDistrict2').value;
        if (applicantPerAddressDistrict2) {
            this.lookupReference('applicantPerAddressDistrict').setValue(applicantPerAddressDistrict2);   
            this.lookupReference('applicantPerAddressDistrict1').setValue(applicantPerAddressDistrict2);         
        } else {
            this.lookupReference('applicantPerAddressDistrict').setValue(null);
            this.lookupReference('applicantPerAddressDistrict1').setValue(null);  
        }
    },
    // onchangeApplicantPostalCode: function(cmp, newValue, oldValue, eOpts) {
    //     var applicantPostalCode = this.lookupReference('applicantPostalCode').value;
    //     if (applicantPostalCode) {
    //         this.lookupReference('applicantPostalCode2').setValue(applicantPostalCode);
    //     } else {
    //         this.lookupReference('applicantPostalCode2').setValue(null);

    //     }
    // },
    onchangeApplicantPerStreetNo: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerStreetNo1').setValue(newValue);
        } else {
            this.lookupReference('applicantPerStreetNo1').setValue(null);

        }
    },
    onchangeApplicantPerStreetNo1: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerStreetNo').setValue(newValue);
        } else {
            this.lookupReference('applicantPerStreetNo').setValue(null);

        }
    },
    onchangeApplicantPerStreetName: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerStreetName1').setValue(newValue);
        } else {
            this.lookupReference('applicantPerStreetName1').setValue(null);

        }
    },
    onchangeApplicantPerStreetName1: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerStreetName').setValue(newValue);
        } else {
            this.lookupReference('applicantPerStreetName').setValue(null);

        }
    },
    onchangeApplicantPerAddressPostCode: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerAddressPostCode1').setValue(newValue);
            this.lookupReference('applicantPerAddressPostCode2').setValue(newValue);
        } else {
            this.lookupReference('applicantPerAddressPostCode1').setValue(null);
            this.lookupReference('applicantPerAddressPostCode2').setValue(null);
        }
    },
    onchangeApplicantPerAddressPostCode1: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerAddressPostCode').setValue(newValue);
            this.lookupReference('applicantPerAddressPostCode2').setValue(newValue);
        } else {
            this.lookupReference('applicantPerAddressPostCode').setValue(null);
            this.lookupReference('applicantPerAddressPostCode2').setValue(null);
        }
    },
    onchangeApplicantPerAddressPostCode2: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerAddressPostCode').setValue(newValue);
            this.lookupReference('applicantPerAddressPostCode1').setValue(newValue);
        } else {
            this.lookupReference('applicantPerAddressPostCode').setValue(null);
            this.lookupReference('applicantPerAddressPostCode1').setValue(null);
        }
    },
    onchangeApplicantEmployeeID: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantEmployeeID1').setValue(newValue);
        } else {
            this.lookupReference('applicantEmployeeID1').setValue(null);
        }
    },  
    onchangeApplicantPerAddress: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantPerAddress1').setValue(newValue);
            this.lookupReference('applicantPerAddress2').setValue(newValue);
        } else {
            this.lookupReference('applicantPerAddress1').setValue(null);
            this.lookupReference('applicantPerAddress2').setValue(null);

        }
    },
    onchangeApplicantSpouseName: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantSpouseName1').setValue(newValue);
            this.lookupReference('applicantSpouseName2').setValue(newValue);
        } else {
            this.lookupReference('applicantSpouseName1').setValue(null);
            this.lookupReference('applicantSpouseName2').setValue(null);

        }
    },
    onchangeApplicantMotherName: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantMotherName1').setValue(newValue);
            this.lookupReference('applicantMotherName2').setValue(newValue);
        } else {
            this.lookupReference('applicantMotherName1').setValue(null);
            this.lookupReference('applicantMotherName2').setValue(null);

        }
    },
    onchangeApplicantFatherName: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantFatherName1').setValue(newValue);
            this.lookupReference('applicantFatherName2').setValue(newValue);
        } else {
            this.lookupReference('applicantFatherName1').setValue(null);
            this.lookupReference('applicantFatherName2').setValue(null);

        }
    },
    onchangeApplicantOtherIdType: function(newValue, oldValue, eOpts) {

        var applicantOtherPhotoID;
        var applicantOtherPhotoIDChecked = this.lookupReference('applicantOtherPhotoID').getChecked();
        if (applicantOtherPhotoIDChecked.length == 1) {
        if (applicantOtherPhotoIDChecked[0].inputValue == 0) {
            applicantOtherPhotoID = "Passport";
        } else if (applicantOtherPhotoIDChecked[0].inputValue == 1) {
            applicantOtherPhotoID = "Others";
        }
     }
    },
    onchangeApplicantIdIssueCountry: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantIdIssueCountry1').setValue(newValue);
            this.lookupReference('applicantIdIssueCountry2').setValue(newValue);
        } else {
            this.lookupReference('applicantIdIssueCountry1').setValue(null);
            this.lookupReference('applicantIdIssueCountry2').setValue(null);

        }
    },
    onchangeApplicantPassportNo: function(cmp, newValue, oldValue, eOpts){
        // var applicantPassportNo = this.lookupReference('applicantPassportNo').value;
        if(newValue){
            this.lookupReference('applicantIdNo').setValue(newValue);
            this.lookupReference('applicantIdNo1').setValue(newValue);
        } else {
            this.lookupReference('applicantIdNo').setValue(null);
            this.lookupReference('applicantIdNo1').setValue(null);
            }
    },
    onchangeIdIssueDate: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantIdIssueDate1').setValue(newValue);
            this.lookupReference('applicantIdIssueDate2').setValue(newValue);
        } else {
            this.lookupReference('applicantIdIssueDate1').setValue(null);
            this.lookupReference('applicantIdIssueDate2').setValue(null);

        }
    },
    onchangeIdIssueDateExp: function(cmp, newValue, oldValue, eOpts) {
        if (newValue) {
            this.lookupReference('applicantDate').setValue(newValue);
        } else {
            this.lookupReference('applicantDate').setValue(null);
        }
    },
    onchangeApplicantIdType: function(cmp, newValue, oldValue, eOpts) {
        var applicantIdTypeChecked = this.lookupReference('applicantIdType').getChecked()[0].initialConfig.inputValue;

            if (applicantIdTypeChecked[0].inputValue == 1) {
                this.lookupReference('aPassport').setValue(true)
            } else if (applicantIdTypeChecked[0].inputValue == 2) {
                this.lookupReference('aDrivingLicence').setValue(true)
            } else if (applicantIdTypeChecked[0].inputValue == 3) {
                this.lookupReference('aBirthRegistration').setValue(true)
            }else{
                return
            }       
    },
    // onchangeApplicantGender: function(cmp, newValue, oldValue, eOpts) {
    //     // var applicantGender = this.lookupReference('applicantGender').value;
    //     var applicantGenderChecked = cmp.lookupReference('applicantGender').getChecked();
    //     var applicantGender = applicantGenderChecked.length == 1 ? applicantGenderChecked[0].inputValue : null;
    //     if (applicantGender) {
    //         this.lookupReference('applicantGender1').setValue(applicantGender);
    //         this.lookupReference('applicantGender2').setValue(applicantGender);
    //     } else {
    //         this.lookupReference('applicantGender1').setValue(null);
    //         this.lookupReference('applicantGender2').setValue(null);
    //     }
    // },
    onchangeApplicantMobileNo: function(cmp, newValue, oldValue, eOpts) {
        var applicantMobileNo = this.lookupReference('applicantMobileNo').value;
        if (applicantMobileNo) {
            this.lookupReference('applicantMobileNo1').setValue(applicantMobileNo);
            this.lookupReference('applicantMobileNo2').setValue(applicantMobileNo);
            this.lookupReference('applicantMobileNo3').setValue(applicantMobileNo);
        } else {
            this.lookupReference('applicantMobileNo1').setValue(null);
            this.lookupReference('applicantMobileNo2').setValue(null);
            this.lookupReference('applicantMobileNo3').setValue(null);
        }
    },

    //End ---- Azizul Islam 2022-02-02
    onActivateAcquisitionDetailsWin: function(cmp, eOpts) {
        removeStore();
        var arrayOfGrid = getAcquisitionArrayOfGrid(cmp);
        setAcquisitionPluginWithoutListenerInAllField(arrayOfGrid);
        setDefultRowAcquisitionDetailsConfig();
        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }

        var creditCardId = this.lookupReference('hiddentCreditCardId').value;
        if (creditCardId) {
            var header = {
                reference: 'onActivateAcquisitionDetailsWin'
            };

            var payload = [{
                creditCardId: creditCardId,
                userModKey: loginUser.id
            }]
            this.sendRequest(appActionType.ACTION_TYPE_SELECT_FULL_APPLICANT_DETAILS, appContentType.CONTENT_TYPE_ACQUISITION_APPLICANT_DETAILS, payload, header);
        }

        // hideSaveActionColWithRefSaveOfAllGridAcquisition(arrayOfGrid);
    },
    onSavePreviousOrganization: function(grid, rowIndex, colIndex) {
        var me = this;
        var group = appConstants.ACQUISITION_GROUP;
        var subGroup = appConstants.ACQUISITION_PREVIOUS_ORGANIZATION_DETAILS;
        var reference = 'onSavePreviousOrganization';
        previousOrganization(grid, rowIndex, reference, group, subGroup, me);

    },
    onSaveOtherBankLiability: function(grid, rowIndex, colIndex) {
        var me = this;
        var group = appConstants.ACQUISITION_GROUP;
        var subGroup = appConstants.ACQUISITION_BANK_LIABILITY_POSTION;
        var reference = 'onSaveOtherBankLiability';
        otherBankLiability(grid, rowIndex, reference, group, subGroup, me);

    },
    onSaveOtherBankAcountDetails: function(grid, rowIndex, colIndex) {
        var me = this;
        var group = appConstants.ACQUISITION_GROUP;
        var subGroup = appConstants.ACQUISITION_OTHER_BANK_DETAILS;
        var reference = 'onSaveOtherBankAcountDetails';
        otherBankAcountDetails(grid, rowIndex, reference, group, subGroup, me);
    },
    onSaveSecurityDetails: function(grid, rowIndex, colIndex) {
        var me = this;
        var group = appConstants.ACQUISITION_GROUP;
        var subGroup = appConstants.ACQUISITION_SECURITY_DETAILS;
        var reference = 'onSaveSecurityDetails';
        securityDetails(grid, rowIndex, reference, group, subGroup, me);
    },
    onSaveCompaniesUderOwnership: function(grid, rowIndex, colIndex) {
        var me = this;
        var group = appConstants.ACQUISITION_GROUP;
        var subGroup = appConstants.ACQUISITION_COMPANIES_UNDER_OWNER_SHIP;
        var reference = 'onSaveCompaniesUderOwnership';
        companiesUderOwnership(grid, rowIndex, reference, group, subGroup, me);
    },
    onNewPreviousOrganization: function(grid, rowIndex, colIndex) {
        setAcquisitionDetailsRowAtEnd('gPriviousOrganizationStore');
    },
    onNewOtherBankLiability: function(grid, rowIndex, colIndex) {
        setAcquisitionDetailsRowAtEnd('gOthersBankLiabilityStore');
    },
    onNewOtherBankAcountDetails: function(grid, rowIndex, colIndex) {
        setAcquisitionDetailsRowAtEnd('gAboutOtherBankDetailsStore');
    },
    onNewSecurityDetails: function(grid, rowIndex, colIndex) {
        setAcquisitionDetailsRowAtEnd('gSecurityDetailsStore');
    },
    onNewCompaniesUderOwnership: function(grid, rowIndex, colIndex) {
        setAcquisitionDetailsRowAtEnd('gCompaniesUderOwnershipStore');
    },
    onDelPreviousOrganization: function(grid, rowIndex, colIndex) {
        this.onDeletePreviousOrganizationModelGrid('gPriviousOrganizationStore', rowIndex, 'onDelPreviousOrganization');
    },
    onDelOtherBankLiability: function(grid, rowIndex, colIndex) {
        this.onDeletePreviousOrganizationModelGrid('gOthersBankLiabilityStore', rowIndex, 'onDelOtherBankLiability');
    },
    onDelOtherBankAcountDetails: function(grid, rowIndex, colIndex) {
        this.onDeletePreviousOrganizationModelGrid('gAboutOtherBankDetailsStore', rowIndex, 'onDelOtherBankAcountDetails');
    },
    onDelSecurityDetails: function(grid, rowIndex, colIndex) {
        this.onDeletePreviousOrganizationModelGrid('gSecurityDetailsStore', rowIndex, 'onDelSecurityDetails');
    },
    onDelCompaniesUderOwnership: function(grid, rowIndex, colIndex) {
        this.onDeletePreviousOrganizationModelGrid('gCompaniesUderOwnershipStore', rowIndex, 'onDelCompaniesUderOwnership');
    },
    onDeletePreviousOrganizationModelGrid(storeId, rowIndex, reference) {
        var me = this;
        var store = getGlobalStore(storeId);
        var data = store.getAt(rowIndex).data;
        if (!data.acquisitionDetailsConfigId) {
            store.removeAt(rowIndex);
            if (store.data.items.length == 0) {
                setDefultAcquisitionDetails(storeId);
            }
        } else {
            Ext.Msg.show({
                title: 'Attention',
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
                            acquisitionDetailsConfigId: data.acquisitionDetailsConfigId
                        }];

                        me.sendRequest(appActionType.ACTION_TYPE_DELETE, appContentType.CONTENT_TYPE_ACQUISITION_CONFIG, payload, header);

                        store.removeAt(rowIndex);

                        if (store.data.items.length == 0) {
                            setDefultAcquisitionDetails(storeId);
                        }
                    }

                }

            });
            Ext.defer(function() { Ext.Msg.toFront() }, 200);
        }
    },
    // onCheckCardDuplicate : function(loanId){
    //     var header = {
    //             reference: 'onCheckCardDuplicate'
    //         };

    //         var payload = [{
    //             userModKey: loginUser.id,
    //             loanId: loanId
    //         }];
    //         this.sendRequest(appActionType.ACTION_TYPE_SELECT_FOR_DUPLICATE_CHECK, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);       
    // },
    onClickCheckCardDuplications: function(cmp, e, eOpts) {

        var store = getGlobalStore('gCardDublicationGridStore');
        store.clearFilter()
        store.removeAll();

        carduplicationView = this;
        var nid4Src = this.lookupReference('nid').value;
        var bpNo4Src = this.lookupReference('bpNo').value;
        var tin4Src = this.lookupReference('tin').value;
        var creditCardId = this.lookupReference('creditCardId').value;
        var accountNo4Src = this.lookupReference('accountNo').value;

        var payload = [{
            userModKey: loginUser.id,
            accountNo4Src: accountNo4Src ? accountNo4Src : null,
            bpNo4Src: bpNo4Src ? bpNo4Src : null,
            nid4Src: nid4Src ? nid4Src : null,
            creditCardId: creditCardId ? creditCardId : null,
            tin4Src: tin4Src ? tin4Src : null,
        }];

        localStorage.setItem('cardDuplicateParam', JSON.stringify(payload[0]));

        var win = getCardDuplicationWindow('Duplication Data:');
        var duplicationCheckPanel = win.down('#CardDuplicationCheck');

        Ext.MessageBox.hide();
        isMessageBox = false;

        win.show();
    },
    onActivateCardDuplicateRender: function(cmp, e, eOpts) {
        var store = getGlobalStore('gCardDublicationGridStore');
        store.clearFilter()
        store.removeAll();

        var searchData = JSON.parse(localStorage.getItem('cardDuplicateParam'));
        var nid4Src = searchData.nid4Src;
        var bpNo4Src = searchData.bpNo4Src;
        var creditCardId = searchData.creditCardId;
        var tin4Src = searchData.tin4Src;
        var accountNo4Src = searchData.accountNo4Src;

        showProcessMessage('Loading data....');

        var header = {
            reference: 'onActivateCardDuplicateRender'
        };
        var payload = [{
            userModKey: loginUser.id,
            accountNo4Src: accountNo4Src ? accountNo4Src : null,
            bpNo4Src: bpNo4Src ? bpNo4Src : null,
            nid4Src: nid4Src ? nid4Src : null,
            creditCardId: creditCardId ? creditCardId : null,
            tin4Src: tin4Src ? tin4Src : null,
        }];
        this.sendRequest(appActionType.ACTION_TYPE_SELECT_CUTOMER_ALL_LOAN, appContentType.CONTENT_TYPE_CREDIT_CARD, payload, header);
    },
    onCardClickcibDetails: function(btn, e, eOpts) {
        cardCibReport = this;

        var applicantAskingLimit = this.lookupReference('applicantAskingLimit').value;
        var creditCardId = this.lookupReference('creditCardId').value;
        var tin = this.lookupReference('tin').value;
        var nid = this.lookupReference('nid').value;
        var dateOfBirth = this.lookupReference('dateOfBirth').value;
        var mobile = this.lookupReference('mobile').value;

        var win = getCardCibInformationWindow("CIB Generated Information Form");
        var cibInformations = win.down('#CardCibInformation');
        cibInformations.lookupReference('totalInstallmentAmount').setValue(applicantAskingLimit);
        cibInformations.lookupReference('cardIdForNewPerson').setValue(creditCardId);
        cibInformations.lookupReference('tin').setValue(tin);
        cibInformations.lookupReference('lmsNid').setValue(nid);
        cibInformations.lookupReference('lmsDateOfBirth').setValue(dateOfBirth);
        cibInformations.lookupReference('telephoneNumber').setValue(mobile);

        Ext.MessageBox.hide();
        isMessageBox = false;
        win.show();
    },
    onCardActivateCibForm: function(btn, e, eOpts) {
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

        if (searchDateOfBirth && typeof searchDateOfBirth != 'string') {
            searchDateOfBirth = Ext.Date.format(searchDateOfBirth, 'Y-m-d');
        }

        var header = {
            reference: 'onCardActivateCibForm'
        };

        var payload = [{
            userModKey: loginUser.id,
            searchDateOfBirth: searchDateOfBirth,
            nid: nid,
        }];
        this.sendRequest(appActionType.ACTION_TYPE_SEARCH_FOR_CUSTOMER_NID_DETAILS, appContentType.CONTENT_TYPE_NID_INFORMATION, payload, header);

    },
    onClickCloseCardCib: function(btn, e, eOpts) {
        cardCibDetailsWinClose.close();
    },
    onClickCardNewPerson: function(btn, e, eOpts) {
        var cmp = this;
        var creditCardId = cmp.lookupReference('cardIdForNewPerson').value;
        var quaryMod = appConstants.QUERY_MOD;
        var objectType = appConstants.CREDIT_CARD;

        if (isCardMandatoryNewPerson(cmp)) {
            var newInquiryModel = getCardNewPerson(cmp);
            var payload = [{
                userModKey: loginUser.userIdModified,
                quaryMod: quaryMod,
                creditCardId: creditCardId,
                newInquiryModel: newInquiryModel,
                objectType: objectType,
            }];

            var header = {
                reference: 'onClickCardNewPerson'
            };
            showProcessMessage('Wait For CIB Generate....');
            this.sendRequest(appActionType.ACTION_TYPE_NEW_PERSON_INQUERY, appContentType.CONTENT_TYPE_CIB_INFORMATION, payload, header);
        }
    },
    onClickCardCheckInquiry: function(btn, e, eOpts) {
        var cmp = this;
        var creditCardId = cmp.lookupReference('cardIdForNewPerson').value;
        var quaryMod = appConstants.QUERY_MOD_SUB;
        var objectType = appConstants.CREDIT_CARD;

        if (isCardMandatorySubjectCode(cmp)) {
            var checkInquiry = getCardSubCode(cmp);
            var header = {
                reference: 'onClickCardCheckInquiry'
            };
            var payload = [{
                userModKey: loginUser.userIdModified,
                quaryMod: quaryMod,
                creditCardId: creditCardId,
                checkInquiry: checkInquiry,
                objectType: objectType,
            }];
            showProcessMessage('Wait For CIB Generate....');
            this.sendRequest(appActionType.ACTION_TYPE_NEW_PERSON_INQUERY, appContentType.CONTENT_TYPE_CIB_INFORMATION, payload, header);

        }
    },
    onChangeCardCibStatusFile: function(filefield, value, eOpts) {
        var me = this;

        var refKey = filefield.up('#CardDetails').lookupReference('creditCardId').value;

        var sizeInBytes = filefield.fileInputEl.dom.files[0].size;
        var sizeInMb = sizeInBytes / 1048576;

        if (sizeInMb > 1.0) {
            Ext.MessageBox.alert('Warn', 'Maximum file size is 1 MB.');
            return;
        }

        var cardDoc = {
            refKey: refKey,
            docType: appConstants.CIB_STATUS,
            userModKey: loginUser.id
        }

        filefield.up('form').submit({
            params: {
                cardDocument: JSON.stringify(cardDoc),
                docTrack: appConstants.CIB_STATUS,
            },
            url: UPLOAD_CARD_DOC_URL,

            waitMsg: 'Uploading File...',

            success: function(result, request) {
                me.onCardReqCibStatusDoc(me);
            },

            failure: function(result, request) {
                me.onCardReqCibStatusDoc(me);
            }
        });

    },
    onCardReqCibStatusDoc: function(cmp) {
        var refKey = cmp.lookupReference('creditCardId').value;

        var header = {
            reference: 'onCardReqCibStatusDoc'
        };

        var payload = [{
            refKey: refKey,
            docType: appConstants.CIB_STATUS,
            userModKey: loginUser.id
        }]

        this.sendRequest(appActionType.SELECT_CIB_STATUS_DOC, appContentType.CONTENT_TYPE_DOCUMENT, payload, header);
    },
    onClickCardCibStatusViewFile: function(btn) {
        var refKey = this.lookupReference('creditCardId').value;
        this.viewFileByCardDocType(refKey, appConstants.CIB_STATUS);
    },
    onCardCibStatusChange: function(btn, e, eOpts) {
        var cibStatusType = this.lookupReference('cibStatusType').value;
        this.lookupReference('cibStatus').setValue(cibStatusType);
    },
    onClickCardVerifyNid: function(btn, e, eOpts) {
        var searchNidForm = Ext.create('Desktop.view.loan.SearchNidForm');
        var nid = this.lookupReference('nid').value;
        var dateOfBirth = this.lookupReference('dateOfBirth').value;
        searchNidForm.lookupReference('searchNidNumber').setValue(nid);
        searchNidForm.lookupReference('searchDateOfBirth').setValue(dateOfBirth);
        searchNidForm.show();
    },
    onClickAcquisitionPrevious: function(btn, e, eOpts) {
        var mainPanel = btn.up('#AqusitionApplicationForm');
        var btnRef = btn.reference;
        var cmpUniqId = parseInt(btnRef.split('_')[1]);
        var nameButton = btnRef.split('_')[0];
        if (nameButton == 'next') {
            cmpUniqId++;
        } else {
            cmpUniqId--;
        }
        acquisitionPanel.lookupReference('cardDetailsHome').setActiveTab(acquisitionPanel.lookupReference('step_' + cmpUniqId));

    },
    onClickAcquisitionUpdate: function(btn, e, eOpts) {
        var cmp = this;
        var action = appActionType.ACTION_TYPE_UPDATE;
        if(isMandatoryAcquisitionField(cmp)){
            Ext.Msg.show({
            title: 'Attention',
            message: 'Are your sure?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn == 'yes') {
                    showProcessMessage('Updating data....');

                    var acquisitionApplecantForm = getPayloadAcquisitionApplicantDetails(cmp);
                    var payloadReferAndSupplement = getReferAndSupplementData(cmp);
                    var applicantDocumentList = getApplicantDocumentList(cmp);
                    acquisitionApplecantForm["applicantDocumentList"] = applicantDocumentList;
                    acquisitionApplecantForm["supplementAndReferDetails"] = payloadReferAndSupplement;

                    var priviousOrganizationDetails = getPayloadPreviousOrg(cmp);
                    acquisitionApplecantForm["priviousOrganizationDetails"] = priviousOrganizationDetails;
                    var othersBankLiabilityPosition = getPayloadOthersBankLiability(cmp);
                    acquisitionApplecantForm["othersBankLiabilityPosition"] = othersBankLiabilityPosition;
                    var aboutOtherBankDetails = getPayloadAboutOtherBankDetails(cmp);
                    acquisitionApplecantForm["aboutOtherBankDetails"] = aboutOtherBankDetails;
                    // var securityDetails = getPayloadSecurityDetails(cmp);
                    // acquisitionApplecantForm["securityDetails"] = securityDetails;
                    var companiesUderOwnership = getPayloadCompaniesUderOwnership(cmp);
                    acquisitionApplecantForm["companiesUderOwnership"] = companiesUderOwnership;
                    var form = cmp.lookupReference('newFOCardAccount1');
                    form.submit({
                        params: {
                            acquisitionApplecantForm: JSON.stringify(acquisitionApplecantForm),
                            actionType: action
                        },
                        url: INITIATE_ACQUISITION_URL,

                        waitMsg: 'Working with Data...',

                        success: function(result, request) {
                            acquisitionWinToClose.close();
                        },
                        failure: function(result, request) {
                            acquisitionWinToClose.close();
                        }
                    });
                }
            }

        });
        }
        
    },
    onAcquistionGrdSelChng: function(cmp, records, eOpts) {
        var cardAcquisitionPdf = this.lookupReference('cardAcquisitionPdf');
        var bulkAcquisitionPdf = this.lookupReference('bulkAcquisitionPdf');

        var grid = this.lookupReference('addToAcquisitionDetailsView');
        var selectedRows = grid.getSelection().length;
        var selectedAcquisition = grid.getSelectionModel().getSelection();
        if (selectedAcquisition.length == 1) {
            cardAcquisitionPdf.setDisabled(false);
        } else {
            cardAcquisitionPdf.setDisabled(true);
        }
        if (selectedAcquisition.length > 0) {
            bulkAcquisitionPdf.setDisabled(false);
        } else {
            bulkAcquisitionPdf.setDisabled(true);
        }
    },
    onApplicantAccountNumber: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('applicantAccountNumber').value;
        if (applicantAccountNumber) {
            this.lookupReference('bdtPortionText').setValue(applicantAccountNumber);
        } else {
            this.lookupReference('bdtPortionText').setValue(null);

        }
    },
    onApplicantCustomerType1: function(btn, e, eOpts) {
        var newApplicantCustomerType = this.lookupReference('newApplicantCustomerType').value;
        if (newApplicantCustomerType == true) {
            this.lookupReference('existingApplicantCustomerType').setDisabled(true);
        } else if (newApplicantCustomerType == false) {
            this.lookupReference('existingApplicantCustomerType').setDisabled(false);
        }

    },
    onApplicantCustomerType2: function(btn, e, eOpts) {
        var existingApplicantCustomerType = this.lookupReference('existingApplicantCustomerType').value;
        if (existingApplicantCustomerType == true) {
            this.lookupReference('newApplicantCustomerType').setDisabled(true);
            this.lookupReference('applicantAccountNumber').setHidden(false);
        } else if (existingApplicantCustomerType == false) {
            this.lookupReference('newApplicantCustomerType').setDisabled(false);
            this.lookupReference('applicantAccountNumber').setHidden(true);
        }
    },

    onApplicantNationality: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('applicantNationalityOthers').value;
        var applicantAccountNumberText = this.lookupReference('applicantSpecifyNationality');
        if (applicantAccountNumber == true) {
            this.lookupReference('applicantSpecifyNationality').setHidden(false);
        } else {
            this.lookupReference('applicantSpecifyNationality').setHidden(true);

        }
    },
    onApplicantNationality: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('applicantNationalityOthers').value;
        var applicantAccountNumberText = this.lookupReference('applicantSpecifyNationality');
        if (applicantAccountNumber == true) {
            this.lookupReference('applicantSpecifyNationality').setHidden(false);
        } else {
            this.lookupReference('applicantSpecifyNationality').setHidden(true);

        }
    },
    // onKycMembershipOfClubYes: function(btn, e, eOpts) {
    //     var applicantAccountNumber = this.lookupReference('kycMembershipOfClubYes').value;
    //     var applicantAccountNumberText = this.lookupReference('kycMembershipOfClubYesText');
    //     if (applicantAccountNumber == true) {
    //         this.lookupReference('kycMembershipOfClubYesText').setHidden(false);
    //     } else {
    //         this.lookupReference('kycMembershipOfClubYesText').setHidden(true);

    //     }
    // },
    onKycOwnCarYes: function(btn, e, eOpts) {
        var haveCustomerOwnCarYes = this.lookupReference('haveCustomerOwnCarYes').value;
        if (haveCustomerOwnCarYes == true) {
            this.lookupReference('carBrandName').setHidden(false);
        } else {
            this.lookupReference('carBrandName').setHidden(true);

        }
    },
    onOthersYouAre: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('othersYouAre').value;
        var applicantAccountNumberText = this.lookupReference('othersYouAreText');
        if (applicantAccountNumber == true) {
            this.lookupReference('othersYouAreText').setHidden(false);
        } else {
            this.lookupReference('othersYouAreText').setHidden(true);

        }
    },
    // onkycpoint7Yes: function(btn, e, eOpts) {
    //     var applicantAccountNumber = this.lookupReference('kycpoint7Yes').value;
    //     var applicantAccountNumberText = this.lookupReference('kycpoint7ifyes');
    //     if (applicantAccountNumber == true) {
    //         this.lookupReference('kycpoint7ifyes').setHidden(false);
    //     } else {
    //         this.lookupReference('kycpoint7ifyes').setHidden(true);

    //     }
    // },
    onkycpoint9Yes: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('kycpoint9Yes').value;
        var applicantAccountNumberText = this.lookupReference('ifYesStepTakenInThisRegard');
        if (applicantAccountNumber == true) {
            this.lookupReference('ifYesStepTakenInThisRegard').setHidden(false);
        } else {
            this.lookupReference('ifYesStepTakenInThisRegard').setHidden(true);

        }
    },

    ongeoOfficeAddress: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('bankGeoLocationCheck1').value;
        var applicantAccountNumberText = this.lookupReference('bankGeoLocationText1');
        if (applicantAccountNumber == true) {
            this.lookupReference('bankGeoLocationText1').setHidden(false);
        } else {
            this.lookupReference('bankGeoLocationText1').setHidden(true);

        }
    },
    ongeoResidentalAddress: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('bankGeoLocationCheck2').value;
        var applicantAccountNumberText = this.lookupReference('bankGeoLocationText2');
        if (applicantAccountNumber == true) {
            this.lookupReference('bankGeoLocationText2').setHidden(false);
        } else {
            this.lookupReference('bankGeoLocationText2').setHidden(true);

        }
    },

    onApplicantEducationLevel: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('applicantHighestEducationOther').value;
        if (applicantAccountNumber == true) {
            this.lookupReference('applicantHighestEducationOthers').setHidden(false);
        } else {
            this.lookupReference('applicantHighestEducationOthers').setHidden(true);
        }
    },
    onApplicantCardReceivingWay : function(btn, e, eOpts) {
        var applicantCardReceivingWayCBBLBranch = this.lookupReference('applicantCardReceivingWayCBBLBranch').value;
        if (applicantCardReceivingWayCBBLBranch == true) {
            this.lookupReference('applicantCardReceivingWayName').setHidden(false);
        } else {
            this.lookupReference('applicantCardReceivingWayName').setHidden(true);
        }
    },

    onApplicantRelationship: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('relationPrincipalApplicantOther').value;
        if (applicantAccountNumber == true) {
            this.lookupReference('relationPrincipalApplicantOthers').setHidden(false);
        } else {
            this.lookupReference('relationPrincipalApplicantOthers').setHidden(true);
        }
    },
    onApplicantYesSupp: function(btn, e, eOpts) {
        var applicantAccountNumber = this.lookupReference('suppYouAreSetupLimitCardYes').value;
        var applicantAccountNumberText = this.lookupReference('fieldsetForSupplementary');
        if (applicantAccountNumber == true) {
            this.lookupReference('fieldsetForSupplementary').setHidden(false);
        } else {
            this.lookupReference('fieldsetForSupplementary').setHidden(true);
        }
    },
    generateBulkAcquisitionGridReport: function(button) {

        console.log("Generating Bulk Acquisition Report");

        var me = this;
        var grid = me.lookupReference('addToAcquisitionDetailsView');
        var selectedRows = grid.getSelection().length;
        var reportName = appConstants.CARD_ACQUISITION_REPORT;
        var reportApplicationType = appConstants.REPORT_NAME_ACQUISITION;
        var d = new Date();
        var reportReqTime = d.getTime();
        var idList = [];
        loginUser = gLoginUuser;
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var selectedLoan = grid.getSelectionModel().getSelection();
        if (selectedLoan.length > 0) {

            showDownloadProcessingBar(button, 'Downloading...', 'Please wait...');

            for (var i = 0; i < selectedRows; i++) {
                this.sendRequiest(grid.getSelection()[i].data.creditCardId);
            }
        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Id\' item(s).');
            return;
        }
    },
    sendRequiest(data) {
        var reportName = appConstants.CARD_ACQUISITION_REPORT;
        var reportApplicationType = appConstants.REPORT_NAME_ACQUISITION;
        var d = new Date();
        var reportReqTime = d.getTime();
        var idList = [];
        loginUser = gLoginUuser;
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        idList.push(data);
        var download = Ext.create('Ext.form.Panel', {
            renderTo: Ext.getBody(),
            standardSubmit: true,
            url: ACQUISITION_REPORT_BULK_URL
        });
        download.submit({
            params: {
                'idList': idList,
                'reportlocation': 'webreturn',
                'reportformat': 'pdf',
                'reportName': reportName,
                'reportReqTime': reportReqTime,
                'userId': userId,
                'userName': userName,
                '&reportApplicationTypeL': reportApplicationType,

            }
        });

    },
    generateBulkAcquisitionGridReport1111: function(button) {

        console.log("Generating Bulk Acquisition Report");

        var me = this;
        var grid = me.lookupReference('addToAcquisitionDetailsView');
        var selectedRows = grid.getSelection().length;
        var reportName = appConstants.CARD_ACQUISITION_REPORT;
        var reportApplicationType = appConstants.REPORT_NAME_ACQUISITION;
        var d = new Date();
        var reportReqTime = d.getTime();
        var idList = [];
        loginUser = gLoginUuser;
        var userId = gLoginUuser.id;
        var userName = gLoginUuser.unId;
        var selectedLoan = grid.getSelectionModel().getSelection();


        if (selectedLoan.length > 0) {
            for (var i = 0; i < selectedLoan.length; i++) {
                idList.push(grid.getSelection()[i].data.creditCardId);

                showDownloadProcessingBar(button, 'Downloading...', 'Please wait...');
                var download = Ext.create('Ext.form.Panel', {
                    renderTo: Ext.getBody(),
                    standardSubmit: true,
                    url: ACQUISITION_REPORT_BULK_URL
                });
                download.submit({
                    params: {
                        'idList': idList,
                        'reportlocation': 'webreturn',
                        'reportformat': 'pdf',
                        'reportName': reportName,
                        'reportReqTime': reportReqTime,
                        'userId': userId,
                        'userName': userName,
                        '&reportApplicationTypeL': reportApplicationType,

                    }
                });

            }

        } else {
            Ext.MessageBox.alert('Report Error', 'Please select one or more \'Id\' item(s).');
            return;
        }

    },

    onClickCardMultipleFileAttachment : function (cmp, eOpts) {
        showProcessMessage('Loading...');
        var creditCardId = this.lookupReference('creditCardId').value;
            var win = getAttachmentCardReportWindow('Report');      
            var multipleAttachmentPanel = win.down('#MultipleFileAttachmentCardPanel');

            multipleAttachmentPanel.lookupReference('hiddencardId').setValue(creditCardId);
            Ext.MessageBox.hide();
            isMessageBox = false;

            win.show();


    },
    onCardFileAttachmentGrdSelChng: function (cmp, records, eOpts) {
        var grid = this.lookupReference('attachmentCardFileSearchGrid');
        var selectedRows = grid.getSelection().length;
        var selectedReport = grid.getSelectionModel().getSelection();
        var viewCardReportAsPdf = this.lookupReference('viewCardReportAsPdf');
        if (selectedReport.length == 1) {
            viewCardReportAsPdf.setDisabled(false);
        }else{
            viewCardReportAsPdf.setDisabled(true);
        }
    },
    onBeforeCardAttachmentCardPanel : function (cmp, eOpts) {

        var me = this;
        var refKey = cmp.lookupReference('hiddencardId').value;

        if (!Ext.isEmpty(refKey)) {

            var header = {
                reference: 'onBeforeCardAttachmentCardPanel'
            };

            var payload = [{
                userModKey: loginUser.id,
                refKey: refKey
            }];

            me.sendRequest(appActionType.ACTION_TYPE_SELECT_ATTACHMENT_MULTIPLE_FILE, appContentType.CONTENT_TYPE_DOCUMENT, payload, header);
        }
    },
    generateCardAttechmentGridReport: function (grid, rowIndex, colIndex) {

        var grid = this.lookupReference('attachmentCardFileSearchGrid');
        var selectedReport = grid.getSelectionModel().getSelection();

        var objectType = 'CREDIT_CARD_TYPE';
        var dataitem = selectedReport[0].data;
        if (dataitem.filePresent == 1) {
            var serverUrl = VIEW_ATTACHMENT_LOAN_DOC_URL + '?cardDocId=' + dataitem.documentKey + '&userModKey=' + loginUser.id + '&objectType=' + objectType;

            var pdfPanel = getCardPdfPanel("", "", "", "", "", serverUrl);
            pdfPanel.show();
        } else {
            Ext.toast('File is Not Present.');
        }
    },

    generateAcquisitionGridReport: function(btn, e, eOpts) {
        var grid = this.lookupReference('addToAcquisitionDetailsView');
        var reportApplicationType = appConstants.REPORT_NAME_ACQUISITION;
        var selectedCard = grid.getSelectionModel().getSelection();
        var idList = 'idList=';
        var d = new Date();

        if (loginUser == null || loginUser == '') {
            loginUser = gLoginUuser;
        } else {
            loginUser = loginUser;
        }
        var userId = loginUser.id;
        var userName = loginUser.unId;

        var reportReqTime = d.getTime();
        var reportName = appConstants.CARD_ACQUISITION_REPORT;
        for (var i = 0; i < selectedCard.length; i++) {

            idList += selectedCard[i].data.creditCardId;

            var j = i + 1;

            if (j != selectedCard.length) {
                idList += '&idList=';
            }
        }
        var pdfPanel = Ext.create('Ext.panel.Panel', {
            title: "Acquisition Report",
            itemId: 'acquisitionPdfReportPanel',
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
                name: 'acquisitionReportPanel',
                itemId: 'acquisitionReportPanel',
                id: 'acquisitionReportPanel',
                width: 940,
                height: 540,
                modal: true,
                autoEl: {
                    tag: 'iframe',
                    style: 'overflow:auto;width:100%;height:540px;',
                    src: ACQUISITION_REPORT_URL + '?reportlocation=webreturn&reportformat=pdf' + '&reportName=' +
                        reportName + '&reportReqTime=' + reportReqTime + '&userId=' + userId + '&username=' + '&reportApplicationType=' + reportApplicationType +
                        '&' + idList
                },
                listeners: {
                    load: {
                        element: 'el',
                        fn: function() {
                            this.parent().unmask();
                        }
                    },
                    /**/
                    render: function() {
                        // this.up('panel').body.mask('Please Wait...');
                    }
                }
            }]
        });
        pdfPanel.show();
    },
});

function loadCreateNewCardTree(data, newCardTree) {
    var newCardTreeChild = newCardTree.down('#newCardTreeChildPanel');
    if (newCardTreeChild) {
        newCardTree.remove(newCardTreeChild);
    }

    var tree = [];

    for (var i = 0; i < data.length; i++) {
        var child = {
            "text": data[i].data.value1,
            "leaf": true,
            "cardPrefix": data[i].data.value3,
            "configurationId": data[i].data.configurationId
        };
        tree.push(child);
    }

    // CREATE SUB TREE AND ADD TO TREE PANEL
    var treePanel = Ext.create('Ext.tree.Panel', {
        itemId: 'newCardTreeChildPanel',
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
            itemdblclick: 'onNewCardTreeChildDblClick'
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

    newCardTree.insert(0, treePanel);
}

function loadCardStatusTree(data, cardStatusTree) {

    var cardStatusTreeChild = cardStatusTree.down('#cardStatusTreeChildPanel');
    if (cardStatusTreeChild) {
        cardStatusTree.remove(cardStatusTreeChild);
    }

    var newSubTreeForAll = {
        "text": 'ALL(0)',
        "reference": 'ALL',
        "expanded": false,
        "children": []
    };

    var tree = [];
    var statusCardMap = {};

    for (var i = 0; i < data.length; i++) {

        var child = {
            "text": getCardStatusChildText(data[i]),
            "leaf": true,
            "creditCardId": data[i].creditCardId
        };
        newSubTreeForAll.children.push(child);

        var arr = [];
        if (statusCardMap[data[i].folderName]) {
            arr = statusCardMap[data[i].folderName];
        }
        arr.push(child);
        statusCardMap[data[i].folderName] = arr;
    }

    newSubTreeForAll.text = "ALL(" + newSubTreeForAll.children.length + ")";
    tree.push(newSubTreeForAll);

    for (var key in statusCardMap) {
        var newSubTree = {
            "text": key + '(' + statusCardMap[key].length + ')',
            "reference": 'STATE_NAME :' + key,
            "expanded": false,
            "children": statusCardMap[key]
        };
        tree.push(newSubTree);
    }

    // CREATE SUB TREE AND ADD TO TREE PANEL
    var treePanel = Ext.create('Ext.tree.Panel', {
        itemId: 'cardStatusTreeChildPanel',
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
            itemdblclick: 'onCardStatusTreeDblClick',
            itemclick: 'onCardStatusTreeChildClick'
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
    cardStatusTree.insert(0, treePanel);
}

function loadCardStatusTree2(data, cardStatusTree) {

    var cardStatusTreeChild = cardStatusTree.down('#cardStatusTreeChildPanel2');
    if (cardStatusTreeChild) {
        cardStatusTree.remove(cardStatusTreeChild);
    }

    var newSubTreeForAll = {
        "text": 'ALL(0)',
        "reference": 'ALL',
        "expanded": false,
        "children": []
    };

    var tree = [];
    var statusCardMap = {};

    for (var i = 0; i < data.length; i++) {

        var child = {
            "text": getCardStatusChildText11(data[i]),
            "leaf": true,
            "creditCardId": data[i].creditCardId
        };
        newSubTreeForAll.children.push(child);

        var arr = [];
        if (statusCardMap[data[i].folderName]) {
            arr = statusCardMap[data[i].folderName];
        }
        arr.push(child);
        statusCardMap[data[i].folderName] = arr;
    }

    newSubTreeForAll.text = "ALL(" + newSubTreeForAll.children.length + ")";
    tree.push(newSubTreeForAll);

    for (var key in statusCardMap) {
        var newSubTree = {
            "text": key + '(' + statusCardMap[key].length + ')',
            "reference": 'STATE_NAME :' + key,
            "expanded": false,
            "children": statusCardMap[key]
        };
        tree.push(newSubTree);
    }

    // CREATE SUB TREE AND ADD TO TREE PANEL
    var treePanel = Ext.create('Ext.tree.Panel', {
        itemId: 'cardStatusTreeChildPanel2',
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
            itemdblclick: 'onAcquitionTreeDblClick',
            itemclick: 'onAcquitionTreeChildClick'
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
    cardStatusTree.insert(0, treePanel);
}

function getCardStatusChildText(data) {
    var returnValue;

    if (!data.cardGroupId) {
        returnValue = data.applicationNumber ? data.applicationNumber + '-' + data.customerName : data.customerName;
    } else if (data.cardGroupId && data.applicationNumber) {
        returnValue = data.applicationNumber ? data.applicationNumber + '-' + data.customerName : data.customerName;
    } else {
        returnValue = data.cardGroupId ? data.cardGroupId + '-' + data.stateName : data.stateName;
    }
    return returnValue;

}

function getCardStatusChildText11(data) {
    var returnValue;

    returnValue = data.creditCardId ? data.creditCardId + '-' + data.cardStateName : data.cardStateName;

    return returnValue;

}

function getCardWindow(title) {
    var win = Ext.create('Ext.window.Window', {
        height: 550,
        width: 1130,
        layout: 'fit',
        itemId: 'cardDetailsWin',
        reference: 'cardDetailsWin',
        maximizable: true,
        constrainHeader: true,
        closeAction: 'destroy',
        autoScroll: true,
        title: title,
        modal: true,
        listeners: {
            close: function(cmp, eOpts) {
                getGlobalStore('gCibStatusCommentStoreCard').clearData();
                getGlobalStore('gAnalystCommentStoreCard').clearData();
                getGlobalStore('gExistingLiabilitiesStoreCard').clearData();
                getGlobalStore('gExceptionDetailStoreCard').clearData();
                getGlobalStore('gIns2CADStoreCard').clearData();
                getGlobalStore('gCmntJustificationStoreCard').clearData();
                getGlobalStore('gCmntDeviationsStore').clearData();
                // getGlobalStore('gSourceRecmndStore').clearData();
                // getGlobalStore('gBranchRecmndStore').clearData();
                getGlobalStore('gCardDocumentStore').clearData();
                // getGlobalStore('gCmntOfActionStore').clearData();
            }
        },
        items: [{
            xtype: 'cardDetails'
        }]
    });

    cardDetailsWinToClose = win;

    return win;
}

function getAcqusitionApplicationWindow(title) {
    var win = Ext.create('Ext.window.Window', {
        height: 550,
        width: 1130,
        layout: 'fit',
        itemId: 'AcqusitionApplicationDetailsWin',
        reference: 'AcqusitionApplicationDetailsWin',
        maximizable: true,
        constrainHeader: true,
        closeAction: 'destroy',
        autoScroll: true,
        title: title,
        modal: true,
        items: [{
            xtype: 'AqusitionApplicationForm'
        }]
    });
    acquisitionWinToClose = win;

    return win;
}


function setCustomerInfoC(cmp, data) {

    if (cmp.lookupReference('keepHiddenCustomerId').value == data.customerId) {
        setCustInfoWithValidDataCard(cmp, data);
    } else {
        setCustInfoWithDataCard(cmp, data);
    }

    cmp.lookupReference('keepHiddenCustomerId').setValue(data.customerId);
    cmp.lookupReference('keepHiddenCustomerIdKey').setValue(data.customerIdKey);

    cmp.lookupReference('bpNo').setValue(data.bpNo);
    cmp.lookupReference('nameOfBorrower').setValue(data.customerName);
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
    cmp.lookupReference('email').setValue(data.email);
    // new cust field for cc
    cmp.lookupReference('districtOfPosting').setValue(data.districtOfPosting);
    cmp.lookupReference('nameAsPerNid').setValue(data.nameAsPerNid);
    cmp.lookupReference('nameAsPerbpcivid').setValue(data.nameAsPerbpcivid);
    if (!data.customerPostingDistrict) {
        cmp.lookupReference('customerPostingDistrict').setValue(data.districtOfPosting);
    } else {
        cmp.lookupReference('customerPostingDistrict').setValue(data.customerPostingDistrict);
    }
    cmp.lookupReference('customerPostingDivision').setValue(data.customerPostingDivision);
    cmp.lookupReference('passportNo').setValue(data.passportNo);
    cmp.lookupReference('highestLevelOfEducation').setValue(data.highestLevelOfEducation);
    cmp.lookupReference('cardMonthlyBillDebited').setValue(data.cardMonthlyBillDebited);
    cmp.lookupReference('passpordExpiryDate').setValue(data.passpordExpiryDate ? new Date(data.passpordExpiryDate.substr(0, 10)) : null);
    cmp.lookupReference('lastDateOfPosting').setValue(data.lastDateOfPosting ? new Date(data.lastDateOfPosting.substr(0, 10)) : null);

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

function setCustInfoWithValidDataCard(cmp, data) {
    if (data.tin) cmp.lookupReference('tin').setValue(data.tin);
    if (data.age) cmp.lookupReference('age').setValue(data.age);
    if (data.serviceLength) cmp.lookupReference('serviceLength').setValue(data.serviceLength);
    if (data.remainingYearOfRetirement) cmp.lookupReference('remainingYearOfRetirement').setValue(data.remainingYearOfRetirement);
    if (data.retirementDate) cmp.lookupReference('dateOfRetirement').setValue(data.retirementDate ? new Date(data.retirementDate.substr(0, 10)) : null);
    if (data.joiningDate) cmp.lookupReference('dateOfJoining').setValue(data.joiningDate ? new Date(data.joiningDate.substr(0, 10)) : null);
    if (data.dateOfBirth) cmp.lookupReference('dateOfBirth').setValue(data.dateOfBirth ? new Date(data.dateOfBirth.substr(0, 10)) : null);
}

function setCustInfoWithDataCard(cmp, data) {
    cmp.lookupReference('tin').setValue(data.tin);
    cmp.lookupReference('age').setValue(data.age);
    cmp.lookupReference('serviceLength').setValue(data.serviceLength);
    cmp.lookupReference('remainingYearOfRetirement').setValue(data.remainingYearOfRetirement);
    cmp.lookupReference('dateOfRetirement').setValue(data.retirementDate ? new Date(data.retirementDate.substr(0, 10)) : null);
    cmp.lookupReference('dateOfJoining').setValue(data.joiningDate ? new Date(data.joiningDate.substr(0, 10)) : null);
    cmp.lookupReference('dateOfBirth').setValue(data.dateOfBirth ? new Date(data.dateOfBirth.substr(0, 10)) : null);
}

function setCbblAccountNoC(controller, accountNo) {
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

function manageCardFieldForNewCard(cmp) {
    //TODO: Manage Loand panel field as per user roles, do not use loan state here

    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        cmp.lookupReference('foSaveApplicationBtn').setHidden(false);
    }
}

function expandedSet(cmp) {
    cmp.lookupReference('applicantPersonalInfoField').setExpanded(true);
    cmp.lookupReference('salaryFinancialInformationDetails').setExpanded(true);
    cmp.lookupReference('creditCardLimitInformation').setExpanded(true);
    cmp.lookupReference('autoDebitRequest').setExpanded(true);
    cmp.lookupReference('cardDocument').setExpanded(true);
}

function isMandatoryField(cmp) {

    var ccTrackingNumber = cmp.lookupReference('ccTrackingNumber').value;
    var applicationNumber = cmp.lookupReference('applicationNumber').value;

    var totalEmiPaidInCbbl = cmp.lookupReference('totalEmiPaidInCbbl').value;
    var additionalIncomeAmount = cmp.lookupReference('additionalIncomeAmount').value;
    var afterCbblEmi = cmp.lookupReference('afterCbblEmi').value;
    var totalIncome = cmp.lookupReference('totalIncome').value;
    var additionalIncomeSource = cmp.lookupReference('additionalIncomeSource').value;

    var appliedAmount = cmp.lookupReference('appliedAmount').value;
    cardTypeKey = cmp.lookupReference('cardType').value;
    var appliedCardMinBill = cmp.lookupReference('appliedCardMinBill').value;
    var individualDeclaration = cmp.lookupReference('individualDeclaration').value;
    var cardDeliveryFrom = cmp.lookupReference('cardDeliveryFrom').value;
    var autoDebitReqMinimumAmount = cmp.lookupReference('autoDebitReqMinimumAmount').value;
    var autoDebitReqFullOutstanding = cmp.lookupReference('autoDebitReqFullOutstanding').value;

    var cardStateName = cmp.lookupReference('cardStateName').value;
    var cardStateId = cmp.lookupReference('cardStateId').value;
    var hiddenCardPrefix = cmp.lookupReference('hiddenCardPrefix').value;
    var creditCardId = cmp.lookupReference('creditCardId').value;

    var accountNo4Src = cmp.lookupReference('CbblAccountNo').value;

    var loanToValue = cmp.lookupReference('loanToValue').value;
    var valueOfSecurity = cmp.lookupReference('valueOfSecurity').value;
    var duplications = cmp.lookupReference('duplications').value;
    var applicantAskingLimit = cmp.lookupReference('applicantAskingLimit').value;
    var cardProposedLimit = cmp.lookupReference('cardProposedLimit').value;
    var concerBankName = cmp.lookupReference('concerBankName').value;
    var btRequest = cmp.lookupReference('btRequest').value;
    var btCreditCardOutstanding = cmp.lookupReference('btCreditCardOutstanding').value;
    var proposedBillingDate = cmp.lookupReference('proposedBillingDate').value;
    var autoDebitAmount = cmp.lookupReference('autoDebitAmount').value;

    // var preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange').value;
    var recommendForApproval = cmp.lookupReference('recommendForApproval').value;
    var interestRate = cmp.lookupReference('interestRate').value;
    var balanceTransferRequestAmount = cmp.lookupReference('balanceTransferRequestAmount').value;
    var kycLevel = cmp.lookupReference('kycLevel').value;


    var lastDateOfPosting = cmp.lookupReference('lastDateOfPosting').value;
    var cibGeneration = Ext.Date.format(cmp.lookupReference('cibGeneration').value, 'Ymd');
    var accountNo = cmp.lookupReference('CbblAccountNo').value;
    var nid = cmp.lookupReference('nid').value;
    var tin = cmp.lookupReference('tin').value;
    var customerName = cmp.lookupReference('nameOfBorrower').value;
    var designation = cmp.lookupReference('designation').value;
    var bpNo = cmp.lookupReference('bpNo').value;
    var maritalStatusChecked = cmp.lookupReference('maritalStatus').getChecked();
    var maritalStatus = maritalStatusChecked.length == 1 ? maritalStatusChecked[0].inputValue : null;
    var mobile = cmp.lookupReference('mobile').value;

    // var uploadPassportSizePhoto = cmp.lookupReference('uploadPassportSizePhoto').value;
    var uploadValidPassportDualCard = cmp.lookupReference('uploadValidPassportDualCard').value;
    var uploadSupplApplicatPhoto = cmp.lookupReference('uploadSupplApplicatPhoto').value;
    var uploadNIdCard = cmp.lookupReference('uploadNIdCard').value;
    var uploadTINFO = cmp.lookupReference('uploadTINFO').value;
    var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;
    var cardMonthlyBillDebited = cmp.lookupReference('cardMonthlyBillDebited').value;
    var referenceEmail = cmp.lookupReference('referenceEmail').value;
    var referenceTelephone = cmp.lookupReference('referenceTelephone').value;
    var referenceMobile = cmp.lookupReference('referenceMobile').value;
    var nameOfCard = cmp.lookupReference('nameOfCard').value;
    if (cardMonthlyBillDebited == "") {
        cardMonthlyBillDebited = null;
    }
    var email = cmp.lookupReference('email').value;
    var emerPhone = cmp.lookupReference('emerPhone').value;
    var emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var regex = /^[0-9]+$/;
    if (!mobile && (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER))) {
        Ext.MessageBox.alert('Missing Field', 'Mobile should not be Empty.');
        return false;
    } else if (!mobile.match(regex) && (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER))) {
        Ext.MessageBox.alert('Missing Field', 'Mobile must input numbers.');
        return false;
    } else if (mobile.length != 11 && userRoles.containsKey(appConstants.FIELD_ORIGINATOR)) {
        Ext.MessageBox.alert('Missing Field', 'Mobile must be 11 length.');
        return false;
    } else if (!designation) {
        Ext.MessageBox.alert('Missing Field', 'Designation should not be Empty.');
        return false;
    } else if (!appliedAmount) {
        Ext.MessageBox.alert('Missing Field', 'Applied Amount should not be Empty.');
        return false;
    } else if (!bpNo) {
        Ext.MessageBox.alert('Missing Field', 'BP No should not be Empty.');
        return false;
    } else if (!individualDeclaration) {
        Ext.MessageBox.alert('Missing Field', 'Individual Declaration should not be Empty.');
        return false;
    } else if (!tin && (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER))) {
        Ext.MessageBox.alert('Missing Field', 'tin should not be Empty.');
        return false;
    } else if (tin && tin.length < 12) {
        Ext.MessageBox.alert('Missing Field', 'TIN should not be less then 12.');
        return false;
    } else if (tin && !tin.match(regex)) {
        Ext.MessageBox.alert('Missing Field', 'TIN must input numbers.');
        return false;
    } else if (email && !email.match(emailValidator)) {
        Ext.MessageBox.alert('Invalid Email', 'Please Give Valid Email.');
        return false;
    } else if (referenceEmail && !referenceEmail.match(emailValidator)) {
        Ext.MessageBox.alert('Invalid Email', 'Please Give Valid Reference Email.');
        return false;
    } else if (cardMonthlyBillDebited && !cardMonthlyBillDebited.match(regex)) {
        Ext.MessageBox.alert('Missing Field', 'Card Monthly Bill Debited must input numbers.');
        return false;
    } else {
        console.log('Validation ok');
    }
    if (emerPhone) {
        if ((emerPhone.length != 11) && !(userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER))) {
            Ext.MessageBox.alert('Missing Field', 'Home/Emergency Phone must be 11 length.');
            return false;
        }
        if ((!emerPhone.match(regex)) && !(userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER))) {
            Ext.MessageBox.alert('Missing Field', 'Home/Emergency Phone input numbers.');
            return false;
        }
    }
    if (mobile) {
        if (mobile.length != 11) {
            Ext.MessageBox.alert('Missing Field', 'Mobile must be 11 length.');
            return false;
        }
        if (!mobile.match(regex)) {
            Ext.MessageBox.alert('Missing Field', 'Mobile input numbers.');
            return false;
        }
    }
    if (referenceTelephone) {
        if (!referenceTelephone.match(regex)) {
            Ext.MessageBox.alert('Invalid', 'Reference Telephone input numbers.');
            return false;
        }
    }
    if (nameOfCard) {
        if (nameOfCard.length > 19) {
            Ext.MessageBox.alert('Invalid', 'Name ON Card should not be greater then 19.');
            return false;
        }
    }
    if (referenceMobile) {
        if (referenceMobile.length != 11) {
            Ext.MessageBox.alert('Invalid', 'Reference Mobile must be 11 length.');
            return false;
        }
        if (!referenceMobile.match(regex)) {
            Ext.MessageBox.alert('Invalid', 'Reference Mobile input numbers.');
            return false;
        }
    }
    return true;
}

function getCardCustomerObjFO(cmp) {
    var dateOfBirth = Ext.Date.format(cmp.lookupReference('dateOfBirth').value, 'Ymd');
    var joiningDate = Ext.Date.format(cmp.lookupReference('dateOfJoining').value, 'Ymd');
    var retirementDate = Ext.Date.format(cmp.lookupReference('dateOfRetirement').value, 'Ymd');

    var age = cmp.lookupReference('age').value;
    var serviceLength = cmp.lookupReference('serviceLength').value;
    var remainYearToRetir = cmp.lookupReference('remainingYearOfRetirement').value;

    var customerIdKey = cmp.lookupReference('keepHiddenCustomerIdKey').value;
    var customerId = cmp.lookupReference('keepHiddenCustomerId').value;
    var customerName = cmp.lookupReference('nameOfBorrower').value;
    var bpNo = cmp.lookupReference('bpNo').value;
    var nid = cmp.lookupReference('nid').value;
    var tin = cmp.lookupReference('tin').value;
    var designation = cmp.lookupReference('designation').value;
    var isMatchedNid = cmp.lookupReference('isMatchedNid').value;

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
    var email = cmp.lookupReference('email').value;

    //new field for customer


    var customerPostingDivision = cmp.lookupReference('customerPostingDivision').value;
    var customerPostingDistrict = cmp.lookupReference('customerPostingDistrict').value;
    var districtOfPosting = cmp.lookupReference('districtOfPosting').value;
    var nameAsPerNid = cmp.lookupReference('nameAsPerNid').value;
    var nameAsPerbpcivid = cmp.lookupReference('nameAsPerbpcivid').value;
    var passportNo = cmp.lookupReference('passportNo').value;
    var highestLevelOfEducation = cmp.lookupReference('highestLevelOfEducation').value;
    var cardMonthlyBillDebited = cmp.lookupReference('cardMonthlyBillDebited').value;
    var passpordExpiryDate = Ext.Date.format(cmp.lookupReference('passpordExpiryDate').value, 'Ymd');
    var lastDateOfPosting = Ext.Date.format(cmp.lookupReference('lastDateOfPosting').value, 'Ymd');

    var custmer = {
        userModKey: loginUser.id,
        customerIdKey: customerIdKey ? customerIdKey : null,
        customerId: customerId ? customerId : null,
        customerName: customerName ? customerName : null,
        bpNo: bpNo ? bpNo : null,
        nid: nid ? nid : null,
        tin: tin ? tin : null,
        isMatchedNid: isMatchedNid ? isMatchedNid : null,
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
        email: email ? email : null,
        officeDivision: officeDivision ? officeDivision : null,
        officeDistrict: officeDistrict ? officeDistrict : null,
        customerPostingDivision: customerPostingDivision ? customerPostingDivision : null,
        customerPostingDistrict: customerPostingDistrict ? customerPostingDistrict : null,
        districtOfPosting: districtOfPosting ? districtOfPosting : null,
        nameAsPerNid: nameAsPerNid ? nameAsPerNid : null,
        nameAsPerbpcivid: nameAsPerbpcivid ? nameAsPerbpcivid : null,
        highestLevelOfEducation: highestLevelOfEducation ? highestLevelOfEducation : null,
        passportNo: passportNo ? passportNo : null,
        cardMonthlyBillDebited: cardMonthlyBillDebited ? cardMonthlyBillDebited : null,
        passpordExpiryDate: passpordExpiryDate ? passpordExpiryDate : null,
        lastDateOfPosting: lastDateOfPosting ? lastDateOfPosting : null,

    }
    return custmer;
}

function getCardObjFO(cmp, action) {

    var cardTypeKey;
    var appliedAmount;
    var minimumPayment;
    var preApprovedLimitRange;
    var kycLevel;

    var sourceBrance;
    var sourceCSE;
    var sourceSelfApplication;
    var sourceOthers;

    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        sourceCSE = true;
        sourceBrance = false;
        sourceSelfApplication = false;
        sourceOthers = false
    } else {
        sourceCSE = false;
        sourceBrance = false;
        sourceSelfApplication = true;
        sourceOthers = false
    }

    var ccTrackingNumber = cmp.lookupReference('ccTrackingNumber').value;
    var applicationNumber = cmp.lookupReference('applicationNumber').value;

    var salaryDepositedLastMonth = cmp.lookupReference('salaryDepositedLastMonth').value;
    var totalEmiPaidInCbbl = cmp.lookupReference('totalEmiPaidInCbbl').value;
    var additionalIncomeAmount = cmp.lookupReference('additionalIncomeAmount').value;
    var afterCbblEmi = cmp.lookupReference('afterCbblEmi').value;
    var totalIncome = cmp.lookupReference('totalIncome').value;
    var additionalIncomeSource = cmp.lookupReference('additionalIncomeSource').value;

    cardTypeKey = cmp.lookupReference('cardType').value;
    var appliedCardMinBill = cmp.lookupReference('appliedCardMinBill').value;
    var individualDeclaration = cmp.lookupReference('individualDeclaration').value;
    var cardDeliveryFrom = cmp.lookupReference('cardDeliveryFrom').value;
    var autoDebitReqFullOutstanding = cmp.lookupReference('autoDebitReqFullOutstanding').value;

    var cardStateName = cmp.lookupReference('cardStateName').value;
    var cardStateId = cmp.lookupReference('cardStateId').value;
    var hiddenCardPrefix = cmp.lookupReference('hiddenCardPrefix').value;
    var creditCardId = cmp.lookupReference('creditCardId').value;
    var idCustomerTypeKey = cmp.lookupReference('customerType').value;

    var accountNo4Src = cmp.lookupReference('CbblAccountNo').value;

    var loanToValue = cmp.lookupReference('loanToValue').value;
    var valueOfSecurity = cmp.lookupReference('valueOfSecurity').value;
    var duplications = cmp.lookupReference('duplications').value;
    var duplicationAreas = cmp.lookupReference('duplicationAreas').value;
    var applicantAskingLimit = cmp.lookupReference('applicantAskingLimit').value;
    var cardProposedLimit = cmp.lookupReference('cardProposedLimit').value;
    var concerBankName = cmp.lookupReference('concerBankName').value;
    var btRequest = cmp.lookupReference('btRequest').value;
    var btCreditCardOutstanding = cmp.lookupReference('btCreditCardOutstanding').value;
    cardTypeKey = cmp.lookupReference('cardType1').value;
    cardTypeKey = cmp.lookupReference('cardType2').value;
    var proposedBillingDate = cmp.lookupReference('proposedBillingDate').value;
    var autoDebitAmount = cmp.lookupReference('autoDebitAmount').value;
    kycLevel = cmp.lookupReference('kycLevel').value;
    var kycLevel1 = cmp.lookupReference('kycLevel1').value;

    var sourcingBranch = cmp.lookupReference('sourcingBranch').value;
    var staffId = cmp.lookupReference('staffId').value;
    var uiActionName = action;

    var cardDuplicationResult = cmp.lookupReference('cardDuplicationResult').value;
    var cardDuplicationReason = cmp.lookupReference('cardDuplicationReason').value;
    var unSanctionResult = cmp.lookupReference('unSanctionResult').value;
    var unSanctionReason = cmp.lookupReference('unSanctionReason').value;
    var ofacSanctionResult = cmp.lookupReference('ofacSanctionResult').value;
    var ofacSanctionReason = cmp.lookupReference('ofacSanctionReason').value;

    var referenceName = cmp.lookupReference('referenceName').value;
    var relationShipWithApplicant = cmp.lookupReference('relationShipWithApplicant').value;
    var referProfesion = cmp.lookupReference('referProfesion').getChecked()[length].boxLabel;;
    var referenceNameOfOrganization = cmp.lookupReference('referenceNameOfOrganization').value;
    var referenceDesignation = cmp.lookupReference('referenceDesignation').value;
    var referenceWorkAndResidenceAddress = cmp.lookupReference('referenceWorkAndResidenceAddress').value;
    var referenceTelephone = cmp.lookupReference('referenceTelephone').value;
    var referenceMobile = cmp.lookupReference('referenceMobile').value;
    var referenceEmail = cmp.lookupReference('referenceEmail').value;

    if (!kycLevel1) {
        kycLevel = kycLevel;
    } else {
        kycLevel = kycLevel1;
    }

    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        appliedAmount = cmp.lookupReference('appliedAmount').value;
    } else {
        var appliedAmount1 = cmp.lookupReference('appliedAmount1').value;
        var appliedAmount2 = cmp.lookupReference('appliedAmount2').value;

        if (!appliedAmount2 || !appliedAmount1) {
            appliedAmount = appliedAmount;
        } else {
            appliedAmount = appliedAmount1;
        }
    }
    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.CARD_OFFICER) ||
        userRoles.containsKey(appConstants.HEAD_OF_CARD) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        var minimumPayment1 = cmp.lookupReference('minimumPayment1').value;
        minimumPayment = minimumPayment1;
    } else {
        var minimumPayment2 = cmp.lookupReference('minimumPayment2').value;
        minimumPayment = minimumPayment2;
    }


    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange1').value;
    } else if (userRoles.containsKey(appConstants.CARD_OFFICER) || userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
        preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange2').value;
    } else {
        preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange3').value;
    }
    var approvedLimit = cmp.lookupReference('approvedLimit').value;
    var recommendForApproval = cmp.lookupReference('recommendForApproval').value;
    var interestRate = cmp.lookupReference('interestRate').value;
    var balanceTransferRequestAmount = cmp.lookupReference('balanceTransferRequestAmount').value;

    kycLevel = cmp.lookupReference('kycLevel').value;
    kycLevel = cmp.lookupReference('kycLevel1').value;

    var currentTypeBasedOnCardNature = cmp.lookupReference('currentTypeBasedOnCardNature').value;
    var cardSecurityType = cmp.lookupReference('cardSecurityType').value;
    var cibStatus = cmp.lookupReference('cibStatus').value;
    var cibGeneration = Ext.Date.format(cmp.lookupReference('cibGeneration').value, 'Ymd');
    var autoDebitReqMinimumAmount = cmp.lookupReference('autoDebitReqMinimumAmount').value;
    var nameOfCard = cmp.lookupReference('nameOfCard').value;

    var card = {
        userModKey: loginUser.id,
        creditCardId: creditCardId ? creditCardId : null,
        stateId: cardStateId ? cardStateId : null,
        stateName: cardStateName ? cardStateName : null,

        sourceBrance: sourceBrance,
        sourceCSE: sourceCSE,
        sourceSelfApplication: sourceSelfApplication,
        sourceOthers: sourceOthers,
        ccTrackingNumber: ccTrackingNumber ? ccTrackingNumber : null,
        applicationNumber: applicationNumber ? applicationNumber : null,

        salaryDepositedLastMonth: salaryDepositedLastMonth ? salaryDepositedLastMonth : null,
        totalEmiPaidInCbbl: totalEmiPaidInCbbl ? totalEmiPaidInCbbl : null,
        additionalIncomeAmount: additionalIncomeAmount ? additionalIncomeAmount : null,
        afterCbblEmi: afterCbblEmi ? afterCbblEmi : null,
        totalIncome: totalIncome ? totalIncome : null,
        additionalIncomeSource: additionalIncomeSource ? additionalIncomeSource : null,
        appliedAmount: appliedAmount ? appliedAmount : null,
        cardTypeKey: cardTypeKey ? cardTypeKey : null,
        appliedCardMinBill: appliedCardMinBill ? appliedCardMinBill : null,
        individualDeclaration: individualDeclaration ? individualDeclaration : null,
        cardDeliveryFrom: cardDeliveryFrom ? cardDeliveryFrom : null,
        accountNo4Src: accountNo4Src ? accountNo4Src : null,
        dataSource: appConstants.DATA_SOURCE_WEB,
        idLegalEntityKey: loginUser.legalEntityTypeId,
        autoDebitReqFullOutstanding: autoDebitReqFullOutstanding,
        loanToValue: loanToValue ? loanToValue : null,
        valueOfSecurity: valueOfSecurity ? valueOfSecurity : null,
        duplications: duplications ? duplications : null,
        duplicationAreas: duplicationAreas ? duplicationAreas : null,
        applicantAskingLimit: applicantAskingLimit ? applicantAskingLimit : null,
        cardProposedLimit: cardProposedLimit ? cardProposedLimit : null,
        concerBankName: concerBankName ? concerBankName : null,
        btRequest: btRequest ? btRequest : null,
        btCreditCardOutstanding: btCreditCardOutstanding ? btCreditCardOutstanding : null,
        proposedBillingDate: proposedBillingDate ? proposedBillingDate : null,
        autoDebitAmount: autoDebitAmount ? autoDebitAmount : null,
        minimumPayment: minimumPayment ? minimumPayment : null,
        preApprovedLimitRange: preApprovedLimitRange ? preApprovedLimitRange : null,
        recommendForApproval: recommendForApproval ? recommendForApproval : null,
        balanceTransferRequestAmount: balanceTransferRequestAmount ? balanceTransferRequestAmount : null,
        kycLevel: kycLevel ? kycLevel : null,
        currentTypeBasedOnCardNature: currentTypeBasedOnCardNature ? currentTypeBasedOnCardNature : null,
        cardSecurityType: cardSecurityType ? cardSecurityType : null,
        cibStatus: cibStatus ? cibStatus : null,
        cibGeneration: cibGeneration ? cibGeneration : null,
        interestRate: interestRate ? interestRate : null,
        // preApprovedLimit : preApprovedLimit ? preApprovedLimit : null,   
        sourcingBranch: sourcingBranch ? sourcingBranch : null,
        staffId: staffId ? staffId : null,
        cardDuplicationResult: cardDuplicationResult ? cardDuplicationResult : null,
        cardDuplicationReason: cardDuplicationReason ? cardDuplicationReason : null,
        unSanctionResult: unSanctionResult ? unSanctionResult : null,
        unSanctionReason: unSanctionReason ? unSanctionReason : null,
        ofacSanctionResult: ofacSanctionResult ? ofacSanctionResult : null,
        ofacSanctionReason: ofacSanctionReason ? ofacSanctionReason : null,
        approvedLimit: approvedLimit ? approvedLimit : null,
        idCustomerTypeKey: idCustomerTypeKey ? idCustomerTypeKey : null,
        nameOfCard: nameOfCard ? nameOfCard : null,
        referenceName: referenceName ? referenceName : null,
        relationShipWithApplicant: relationShipWithApplicant ? relationShipWithApplicant : null,
        referProfesion: referProfesion ? referProfesion : null,
        referenceNameOfOrganization: referenceNameOfOrganization ? referenceNameOfOrganization : null,
        referenceDesignation: referenceDesignation ? referenceDesignation : null,
        referenceWorkAndResidenceAddress: referenceWorkAndResidenceAddress ? referenceWorkAndResidenceAddress : null,
        referenceTelephone: referenceTelephone ? referenceTelephone : null,
        referenceMobile: referenceMobile ? referenceMobile : null,
        referenceEmail: referenceEmail ? referenceEmail : null,
        autoDebitReqMinimumAmount: autoDebitReqMinimumAmount,
        uiActionName: uiActionName
    }

    return card;
}

function getCardDocumentList(cmp) {

    var arr = [];
    var obj1 = {
        docType: appConstants.DOC_TYPE_NID_CARD,
        docName: cmp.lookupReference('uploadNIdCard').value,
        isMandatory: 1,
        uploadStatus: 1,
        active: 1
    };
    var obj2 = {
        docType: appConstants.DOC_TYPE_TIN,
        docName: cmp.lookupReference('uploadTINFO').value,
        isMandatory: 1,
        uploadStatus: 1,
        active: 1
    };
    var obj3 = {
        docType: appConstants.DOC_TYPE_CIB_UNDERTAKING,
        docName: cmp.lookupReference('uploadCibUnderTaking').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj4 = {
        docType: appConstants.DOC_TYPE_LETTER_OF_INTRODUCTION,
        docName: cmp.lookupReference('uploadLetterOfIntroduction').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj5 = {
        docType: appConstants.DOC_TYPE_SALARY_STATEMENT,
        docName: cmp.lookupReference('uploadsalaryStatement').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj6 = {
        docType: appConstants.DOC_TYPE_REFERENCE_DETAILS,
        docName: cmp.lookupReference('uploadReferenceDetails').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj7 = {
        docType: appConstants.DOC_TYPE_BP_CIV_ID_DOCUMENTS_COPY,
        docName: cmp.lookupReference('uploadBpCibDocuments').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj8 = {
        docType: appConstants.DOC_TYPE_PASSPORT_SIZE_PHOTO_1,
        docName: cmp.lookupReference('uploadPassportSizePhoto1').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj9 = {
        docType: appConstants.DOC_TYPE_PASSPORT_SIZE_PHOTO_2,
        docName: cmp.lookupReference('uploadPassportSizePhoto2').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj10 = {
        docType: appConstants.DOC_TYPE_VALID_PASSPORT_DUAL_CARD,
        docName: cmp.lookupReference('uploadValidPassportDualCard').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj11 = {
        docType: appConstants.DOC_TYPE_SUPPLEMENTARY_APPLICANT_PHOTO,
        docName: cmp.lookupReference('uploadSupplApplicatPhoto').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj12 = {
        docType: appConstants.DOC_TYPE_SUPPLEMENTARY_APPLICANT_NID,
        docName: cmp.lookupReference('uploadSupplApplicatNid').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj13 = {
        docType: appConstants.DOC_TYPE_SECURITY_DOC_SECURE_CARD,
        docName: cmp.lookupReference('uploadSecDocSecuredCard').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };



    if (obj1.docName) arr.push(obj1);
    if (obj2.docName) arr.push(obj2);
    if (obj3.docName) arr.push(obj3);
    if (obj4.docName) arr.push(obj4);
    if (obj5.docName) arr.push(obj5);
    if (obj6.docName) arr.push(obj6);
    if (obj7.docName) arr.push(obj7);
    if (obj8.docName) arr.push(obj8);
    if (obj9.docName) arr.push(obj9);
    if (obj10.docName) arr.push(obj10);
    if (obj11.docName) arr.push(obj11);
    if (obj12.docName) arr.push(obj12);
    if (obj13.docName) arr.push(obj13);
    return arr;
}

function getPayloadOfCardApplication(cmp, reason) {
    var payloadOfCustomer = getPayloadOfCardCustomer(cmp);
    var payloadOfCard = getPayloadOfCard(cmp);

    payloadOfCard[0]["customer"] = payloadOfCustomer[0];
    // var payloadOfCardDoc = getPayloadOfCardDocument('gCardDocumentStore');
    // payloadOfCard[0]["cardDocumentList"] = payloadOfCardDoc;
    var payloadOfLiability = getPayloadOfCardLiability(cmp);
    var payloadOfCibStatus = getPayloadOfCibStatusCard(cmp);
    var payloadOfDeivationList = getPayloadOftDeviationsCard(cmp);
    var payloadOfAnalystsCmnt = getPayloadOfAnalystsCmntCard(cmp);
    var payloadOfExceptionDtls = getPayloadOfExceptionDtlsCard(cmp);
    var payloadOfIns2Cad = getPayloadOfIns2CadCard(cmp);
    var payloadOfCmntJustification = getPayloadOfCmntJustificationCard(cmp);

    payloadOfCard[0]["existingLiabilityList"] = payloadOfLiability;
    payloadOfCard[0]["cibStatusList"] = payloadOfCibStatus;
    payloadOfCard[0]["analystsCommentsList"] = payloadOfAnalystsCmnt;
    payloadOfCard[0]["exceptionDetailsList"] = payloadOfExceptionDtls;
    payloadOfCard[0]["instructionToCadList"] = payloadOfIns2Cad;
    payloadOfCard[0]["cmntJustificationList"] = payloadOfCmntJustification;
    payloadOfCard[0]["cmntDeivationList"] = payloadOfDeivationList;
    return payloadOfCard;
}

function getPayloadOfCardCustomer(cmp) {
    var dateOfBirth = Ext.Date.format(cmp.lookupReference('dateOfBirth').value, 'Ymd');
    var joiningDate = Ext.Date.format(cmp.lookupReference('dateOfJoining').value, 'Ymd');
    var retirementDate = Ext.Date.format(cmp.lookupReference('dateOfRetirement').value, 'Ymd');

    var age = cmp.lookupReference('age').value;
    var serviceLength = cmp.lookupReference('serviceLength').value;
    var remainYearToRetir = cmp.lookupReference('remainingYearOfRetirement').value;

    var customerIdKey = cmp.lookupReference('keepHiddenCustomerIdKey').value;
    var customerId = cmp.lookupReference('keepHiddenCustomerId').value;
    var customerName = cmp.lookupReference('nameOfBorrower').value;
    var bpNo = cmp.lookupReference('bpNo').value;
    var nid = cmp.lookupReference('nid').value;
    var tin = cmp.lookupReference('tin').value;
    var designation = cmp.lookupReference('designation').value;
    var isMatchedNid = cmp.lookupReference('isMatchedNid').value;

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
    var email = cmp.lookupReference('email').value;

    //new field for customer

    var sourcingBranch = cmp.lookupReference('sourcingBranch').value;
    var staffId = cmp.lookupReference('staffId').value;
    var customerPostingDivision = cmp.lookupReference('customerPostingDivision').value;
    var customerPostingDistrict = cmp.lookupReference('customerPostingDistrict').value;
    var districtOfPosting = cmp.lookupReference('districtOfPosting').value;
    var nameAsPerNid = cmp.lookupReference('nameAsPerNid').value;
    var nameAsPerbpcivid = cmp.lookupReference('nameAsPerbpcivid').value;
    var passportNo = cmp.lookupReference('passportNo').value;
    var highestLevelOfEducation = cmp.lookupReference('highestLevelOfEducation').value;
    var cardMonthlyBillDebited = cmp.lookupReference('cardMonthlyBillDebited').value;
    var passpordExpiryDate = Ext.Date.format(cmp.lookupReference('passpordExpiryDate').value, 'Ymd');
    var lastDateOfPosting = Ext.Date.format(cmp.lookupReference('lastDateOfPosting').value, 'Ymd');

    var payload = [{
        userModKey: loginUser.id,
        customerIdKey: customerIdKey ? customerIdKey : null,
        customerId: customerId ? customerId : null,
        customerName: customerName ? customerName : null,
        bpNo: bpNo ? bpNo : null,
        nid: nid ? nid : null,
        tin: tin ? tin : null,
        isMatchedNid: isMatchedNid ? isMatchedNid : null,
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
        email: email ? email : null,
        officeDivision: officeDivision ? officeDivision : null,
        officeDistrict: officeDistrict ? officeDistrict : null,
        sourcingBranch: sourcingBranch ? sourcingBranch : null,
        staffId: staffId ? staffId : null,
        customerPostingDivision: customerPostingDivision ? customerPostingDivision : null,
        customerPostingDistrict: customerPostingDistrict ? customerPostingDistrict : null,
        districtOfPosting: districtOfPosting ? districtOfPosting : null,
        nameAsPerNid: nameAsPerNid ? nameAsPerNid : null,
        nameAsPerbpcivid: nameAsPerbpcivid ? nameAsPerbpcivid : null,
        highestLevelOfEducation: highestLevelOfEducation ? highestLevelOfEducation : null,
        passportNo: passportNo ? passportNo : null,
        cardMonthlyBillDebited: cardMonthlyBillDebited ? cardMonthlyBillDebited : null,
        passpordExpiryDate: passpordExpiryDate ? passpordExpiryDate : null,
        lastDateOfPosting: lastDateOfPosting ? lastDateOfPosting : null,

    }]
    return payload;
}

function getPayloadOfCard(cmp) {

    var cardTypeKey;
    var appliedAmount;
    var minimumPayment;
    var kycLevel;

    var proposedBillingDate
    var autoDebitAmount
    var preApprovedLimitRange;

    var sourceBrance = cmp.lookupReference('sourceBrance').value;
    var sourceCSE = cmp.lookupReference('sourceCSE').value;
    var sourceSelfApplication = cmp.lookupReference('sourceSelfApplication').value;
    var sourceOthers = cmp.lookupReference('sourceOthers').value;

    var ccTrackingNumber = cmp.lookupReference('ccTrackingNumber').value;
    var applicationNumber = cmp.lookupReference('applicationNumber').value;

    var salaryDepositedLastMonth = cmp.lookupReference('salaryDepositedLastMonth').value;
    var totalEmiPaidInCbbl = cmp.lookupReference('totalEmiPaidInCbbl').value;
    var additionalIncomeAmount = cmp.lookupReference('additionalIncomeAmount').value;
    var afterCbblEmi = cmp.lookupReference('afterCbblEmi').value;
    var totalIncome = cmp.lookupReference('totalIncome').value;
    var additionalIncomeSource = cmp.lookupReference('additionalIncomeSource').value;

    var appliedAmount = cmp.lookupReference('appliedAmount').value;
    cardTypeKey = cmp.lookupReference('cardType').value;
    var appliedCardMinBill = cmp.lookupReference('appliedCardMinBill').value;
    var individualDeclaration = cmp.lookupReference('individualDeclaration').value;
    var cardDeliveryFrom = cmp.lookupReference('cardDeliveryFrom').value;
    var autoDebitReqMinimumAmount = cmp.lookupReference('autoDebitReqMinimumAmount').value;
    var autoDebitReqFullOutstanding = cmp.lookupReference('autoDebitReqFullOutstanding').value;

    var cardStateName = cmp.lookupReference('cardStateName').value;
    var cardStateId = cmp.lookupReference('cardStateId').value;
    var hiddenCardPrefix = cmp.lookupReference('hiddenCardPrefix').value;
    var creditCardId = cmp.lookupReference('creditCardId').value;

    var accountNo4Src = cmp.lookupReference('CbblAccountNo').value;

    var loanToValue = cmp.lookupReference('loanToValue').value;
    var valueOfSecurity = cmp.lookupReference('valueOfSecurity').value;
    var duplications = cmp.lookupReference('duplications').value;
    var duplicationAreas = cmp.lookupReference('duplicationAreas').value;
    var applicantAskingLimit = cmp.lookupReference('applicantAskingLimit').value;
    var cardProposedLimit = cmp.lookupReference('cardProposedLimit').value;
    var concerBankName = cmp.lookupReference('concerBankName').value;
    var btRequest = cmp.lookupReference('btRequest').value;
    var btCreditCardOutstanding = cmp.lookupReference('btCreditCardOutstanding').value;
    cardTypeKey = cmp.lookupReference('cardType1').value;
    cardTypeKey = cmp.lookupReference('cardType2').value;

    if (userRoles.containsKey(appConstants.CARD_OFFICER) || userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
        proposedBillingDate = cmp.lookupReference('proposedBillingDate').value;
        autoDebitAmount = cmp.lookupReference('autoDebitAmount').value;
    } else {
        proposedBillingDate = cmp.lookupReference('proposedBillingDate1').value;
        autoDebitAmount = cmp.lookupReference('autoDebitAmount1').value;
    }

    var appliedAmount1 = cmp.lookupReference('appliedAmount1').value;
    if (!appliedAmount1) {
        appliedAmount = appliedAmount;
    } else {
        appliedAmount = appliedAmount1;
    }
    var minimumPayment1 = cmp.lookupReference('minimumPayment1').value;
    var minimumPayment2 = cmp.lookupReference('minimumPayment2').value;
    if (!minimumPayment2) {
        minimumPayment = minimumPayment1;
    } else {
        minimumPayment = minimumPayment2;
    }

    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange1').value;
    } else if (userRoles.containsKey(appConstants.CARD_OFFICER) || userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
        preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange2').value;
    } else {
        preApprovedLimitRange = cmp.lookupReference('preApprovedLimitRange3').value;
    }
    var recommendForApproval = cmp.lookupReference('recommendForApproval').value;
    var interestRate = cmp.lookupReference('interestRate').value;
    var balanceTransferRequestAmount = cmp.lookupReference('balanceTransferRequestAmount').value;

    kycLevel = cmp.lookupReference('kycLevel').value;
    var kycLevel1 = cmp.lookupReference('kycLevel1').value;
    if (!kycLevel1) {
        kycLevel = kycLevel;
    } else {
        kycLevel = kycLevel1;
    }

    var currentTypeBasedOnCardNature = cmp.lookupReference('currentTypeBasedOnCardNature').value;
    var cardSecurityType = cmp.lookupReference('cardSecurityType').value;
    var cibStatus = cmp.lookupReference('cibStatus').value;
    var cibGeneration = Ext.Date.format(cmp.lookupReference('cibGeneration').value, 'Ymd');
    var netMonthlyIncome = cmp.lookupReference('netMonthlyIncome').value;

    var cardDuplicationResult = cmp.lookupReference('cardDuplicationResult').value;
    var cardDuplicationReason = cmp.lookupReference('cardDuplicationReason').value;
    var unSanctionResult = cmp.lookupReference('unSanctionResult').value;
    var unSanctionReason = cmp.lookupReference('unSanctionReason').value;
    var ofacSanctionResult = cmp.lookupReference('ofacSanctionResult').value;
    var ofacSanctionReason = cmp.lookupReference('ofacSanctionReason').value;
    var approvedLimit = cmp.lookupReference('approvedLimit').value;

    var nameOfCard = cmp.lookupReference('nameOfCard').value;
    var referenceName = cmp.lookupReference('referenceName').value;
    var relationShipWithApplicant = cmp.lookupReference('relationShipWithApplicant').value;
    var referProfesion = cmp.lookupReference('referProfesion').getChecked()[length].boxLabel;;
    var referenceNameOfOrganization = cmp.lookupReference('referenceNameOfOrganization').value;
    var referenceDesignation = cmp.lookupReference('referenceDesignation').value;
    var referenceWorkAndResidenceAddress = cmp.lookupReference('referenceWorkAndResidenceAddress').value;
    var referenceTelephone = cmp.lookupReference('referenceTelephone').value;
    var referenceMobile = cmp.lookupReference('referenceMobile').value;
    var referenceEmail = cmp.lookupReference('referenceEmail').value;

    var payloadOfCard = [{
        userModKey: loginUser.id,
        creditCardId: creditCardId ? creditCardId : null,
        stateId: cardStateId ? cardStateId : null,
        stateName: cardStateName ? cardStateName : null,

        sourceBrance: sourceBrance ? sourceBrance : null,
        sourceCSE: sourceCSE ? sourceCSE : null,
        sourceSelfApplication: sourceSelfApplication ? sourceSelfApplication : null,
        sourceOthers: sourceOthers ? sourceOthers : null,

        ccTrackingNumber: ccTrackingNumber ? ccTrackingNumber : null,
        applicationNumber: applicationNumber ? applicationNumber : null,

        salaryDepositedLastMonth: salaryDepositedLastMonth ? salaryDepositedLastMonth : null,
        totalEmiPaidInCbbl: totalEmiPaidInCbbl ? totalEmiPaidInCbbl : null,
        additionalIncomeAmount: additionalIncomeAmount ? additionalIncomeAmount : null,
        afterCbblEmi: afterCbblEmi ? afterCbblEmi : null,
        totalIncome: totalIncome ? totalIncome : null,
        additionalIncomeSource: additionalIncomeSource ? additionalIncomeSource : null,
        appliedAmount: appliedAmount ? appliedAmount : null,
        cardTypeKey: cardTypeKey ? cardTypeKey : null,
        appliedCardMinBill: appliedCardMinBill ? appliedCardMinBill : null,
        individualDeclaration: individualDeclaration ? individualDeclaration : null,
        cardDeliveryFrom: cardDeliveryFrom ? cardDeliveryFrom : null,
        autoDebitReqMinimumAmount,
        accountNo4Src: accountNo4Src ? accountNo4Src : null,
        dataSource: appConstants.DATA_SOURCE_WEB,
        idLegalEntityKey: loginUser.legalEntityTypeId,
        autoDebitReqFullOutstanding,
        loanToValue: loanToValue ? loanToValue : null,
        valueOfSecurity: valueOfSecurity ? valueOfSecurity : null,
        duplications: duplications ? duplications : null,
        duplicationAreas: duplicationAreas ? duplicationAreas : null,
        applicantAskingLimit: applicantAskingLimit ? applicantAskingLimit : null,
        cardProposedLimit: cardProposedLimit ? cardProposedLimit : null,
        concerBankName: concerBankName ? concerBankName : null,
        btRequest: btRequest ? btRequest : null,
        btCreditCardOutstanding: btCreditCardOutstanding ? btCreditCardOutstanding : null,
        proposedBillingDate: proposedBillingDate ? proposedBillingDate : null,
        autoDebitAmount: autoDebitAmount ? autoDebitAmount : null,
        minimumPayment: minimumPayment ? minimumPayment : null,
        preApprovedLimitRange: preApprovedLimitRange ? preApprovedLimitRange : null,
        recommendForApproval: recommendForApproval ? recommendForApproval : null,
        balanceTransferRequestAmount: balanceTransferRequestAmount ? balanceTransferRequestAmount : null,
        kycLevel: kycLevel ? kycLevel : null,
        currentTypeBasedOnCardNature: currentTypeBasedOnCardNature ? currentTypeBasedOnCardNature : null,
        cardSecurityType: cardSecurityType ? cardSecurityType : null,
        cibStatus: cibStatus ? cibStatus : null,
        cibGeneration: cibGeneration ? cibGeneration : null,
        interestRate: interestRate ? interestRate : null,
        netMonthlyIncome: netMonthlyIncome ? netMonthlyIncome : null,

        cardDuplicationResult: cardDuplicationResult ? cardDuplicationResult : null,
        cardDuplicationReason: cardDuplicationReason ? cardDuplicationReason : null,
        unSanctionResult: unSanctionResult ? unSanctionResult : null,
        unSanctionReason: unSanctionReason ? unSanctionReason : null,
        ofacSanctionResult: ofacSanctionResult ? ofacSanctionResult : null,
        ofacSanctionReason: ofacSanctionReason ? ofacSanctionReason : null,
        approvedLimit: approvedLimit ? approvedLimit : null,
        nameOfCard: nameOfCard ? nameOfCard : null,
        referenceName: referenceName ? referenceName : null,
        relationShipWithApplicant: relationShipWithApplicant ? relationShipWithApplicant : null,
        referProfesion: referProfesion ? referProfesion : null,
        referenceNameOfOrganization: referenceNameOfOrganization ? referenceNameOfOrganization : null,
        referenceDesignation: referenceDesignation ? referenceDesignation : null,
        referenceWorkAndResidenceAddress: referenceWorkAndResidenceAddress ? referenceWorkAndResidenceAddress : null,
        referenceTelephone: referenceTelephone ? referenceTelephone : null,
        referenceMobile: referenceMobile ? referenceMobile : null,
        referenceEmail: referenceEmail ? referenceEmail : null,

    }];
    return payloadOfCard
}

function setCardData(cmp, data) {

    if (cmp.lookupReference('keepHiddenCreditCardId').value == data.customerIdKey) {
        setCardInfoWithValidData(cmp, data);
    } else {
        setCardInfoWithData(cmp, data);
    }


    cmp.lookupReference('ccTrackingNumber').setValue(data.ccTrackingNumber);
    if (data.salaryDepositedLastMonth != -2147483648) {
        cmp.lookupReference('salaryDepositedLastMonth').setValue(data.salaryDepositedLastMonth);
    }
    if (data.applicantAskingLimit != -2147483648) {
        cmp.lookupReference('applicantAskingLimit').setValue(data.applicantAskingLimit);
    } else {
        cmp.lookupReference('applicantAskingLimit').setValue(data.appliedAmount);
    }

    if (data.totalEmiPaidInCbbl != -2147483648) {
        cmp.lookupReference('totalEmiPaidInCbbl').setValue(data.totalEmiPaidInCbbl);
    }
    if (data.additionalIncomeAmount != -2147483648) {
        cmp.lookupReference('additionalIncomeAmount').setValue(data.additionalIncomeAmount);
    }
    if (data.afterCbblEmi != -2147483648) {
        cmp.lookupReference('afterCbblEmi').setValue(data.afterCbblEmi);
    }
    if (data.additionalIncomeSource != -2147483648) {
        cmp.lookupReference('additionalIncomeSource').setValue(data.additionalIncomeSource);
    }

    if (data.appliedAmount != -2147483648) {
        cmp.lookupReference('appliedAmount').setValue(data.appliedAmount);
    }
    cmp.lookupReference('cardType').setValue(data.cardTypeKey);
    cmp.lookupReference('cardType1').setValue(data.cardTypeKey);
    cmp.lookupReference('cardType2').setValue(data.cardTypeKey);
    cmp.lookupReference('autoDebitAmount').setValue(data.autoDebitAmount);

    cmp.lookupReference('btCreditCardOutstanding').setValue(data.btCreditCardOutstanding);
    cmp.lookupReference('proposedBillingDate').setValue(data.proposedBillingDate);
    cmp.lookupReference('autoDebitAmount1').setValue(data.autoDebitAmount);

    if (data.appliedCardMinBill != -2147483648) {
        cmp.lookupReference('appliedCardMinBill').setValue(data.appliedCardMinBill);
    }

    cmp.lookupReference('individualDeclaration').setValue(data.individualDeclaration);
    cmp.lookupReference('cardDeliveryFrom').setValue(data.cardDeliveryFrom);

    var autoDebitReqFullOutstanding = cmp.lookupReference('autoDebitReqFullOutstanding');
    data.autoDebitReqFullOutstanding == "true" ? autoDebitReqFullOutstanding.setValue(true) : autoDebitReqFullOutstanding.setValue(false);
    var autoDebitReqMinimumAmount = cmp.lookupReference('autoDebitReqMinimumAmount');
    data.autoDebitReqMinimumAmount == "true" ? autoDebitReqMinimumAmount.setValue(true) : autoDebitReqMinimumAmount.setValue(false);

    cmp.lookupReference('cardStateName').setValue(data.cardStateName);
    cmp.lookupReference('cardStateId').setValue(data.cardStateId);
    cmp.lookupReference('hiddenCardPrefix').setValue(data.hiddenCardPrefix);
    cmp.lookupReference('creditCardId').setValue(data.creditCardId);
    cmp.lookupReference('loanToValue').setValue(data.loanToValue);
    cmp.lookupReference('valueOfSecurity').setValue(data.valueOfSecurity);
    cmp.lookupReference('duplications').setValue(data.duplications);
    cmp.lookupReference('duplicationAreas').setValue(data.duplicationAreas);
    cmp.lookupReference('applicationNumber').setValue(data.applicationNumber);

    if (data.cardProposedLimit != -2147483648) {
        cmp.lookupReference('cardProposedLimit').setValue(data.cardProposedLimit);
    }

    cmp.lookupReference('concerBankName').setValue(data.concerBankName);
    cmp.lookupReference('concerBankName1').setValue(data.concerBankName);
    cmp.lookupReference('btRequest').setValue(data.btRequest);
    cmp.lookupReference('btRequest1').setValue(data.btRequest);
    if (data.btCreditCardOutstanding != -2147483648) {
        cmp.lookupReference('btCreditCardOutstanding').setValue(data.btCreditCardOutstanding);
    }

    if (data.netMonthlyIncome != -2147483648) {
        cmp.lookupReference('netMonthlyIncome').setValue(data.netMonthlyIncome);
    }
    cmp.lookupReference('cardType1').setValue(data.cardTypeKey);
    cmp.lookupReference('cardType2').setValue(data.cardTypeKey);
    cmp.lookupReference('proposedBillingDate1').setValue(data.proposedBillingDate);

    if (data.appliedAmount != -2147483648) {
        cmp.lookupReference('appliedAmount1').setValue(data.appliedAmount);
    }
    if (data.appliedAmount != -2147483648) {
        cmp.lookupReference('appliedAmount2').setValue(data.appliedAmount);
    }

    if (data.minimumPayment != -2147483648) {
        cmp.lookupReference('minimumPayment1').setValue(data.minimumPayment);
    }

    if (data.minimumPayment != -2147483648) {
        cmp.lookupReference('minimumPayment2').setValue(data.minimumPayment);
    }

    if (data.approvedLimit != -2147483648) {
        cmp.lookupReference('approvedLimit').setValue(data.approvedLimit);
    }


    if (data.preApprovedLimitRange != -2147483648) {
        cmp.lookupReference('preApprovedLimitRange1').setValue(data.preApprovedLimitRange);
        cmp.lookupReference('preApprovedLimitRange2').setValue(data.preApprovedLimitRange);
        cmp.lookupReference('preApprovedLimitRange3').setValue(data.preApprovedLimitRange);
    }

    cmp.lookupReference('interestRate').setValue(data.interestRate);
    if (data.recommendForApproval != -2147483648) {
        cmp.lookupReference('recommendForApproval').setValue(data.recommendForApproval);
    }
    if (data.balanceTransferRequestAmount != -2147483648) {
        cmp.lookupReference('balanceTransferRequestAmount').setValue(data.balanceTransferRequestAmount);
    }
    cmp.lookupReference('kycLevel').setValue(data.kycLevel);
    cmp.lookupReference('kycLevel1').setValue(data.kycLevel);
    cmp.lookupReference('currentTypeBasedOnCardNature').setValue(data.currentTypeBasedOnCardNature);
    cmp.lookupReference('cardSecurityType').setValue(data.cardSecurityType);
    cmp.lookupReference('cibStatus').setValue(data.cibStatus);
    cmp.lookupReference('cibGeneration').setValue(data.cibGeneration ? new Date(data.cibGeneration.substr(0, 10)) : null);

    var sourceBrance = cmp.lookupReference('sourceBrance');
    data.sourceBrance == "true" ? sourceBrance.setValue(true) : sourceBrance.setValue(false);

    var sourceCSE = cmp.lookupReference('sourceCSE');
    data.sourceCSE == "true" ? sourceCSE.setValue(true) : sourceCSE.setValue(false);

    var sourceSelfApplication = cmp.lookupReference('sourceSelfApplication');
    data.sourceSelfApplication == "true" ? sourceSelfApplication.setValue(true) : sourceSelfApplication.setValue(false);

    var sourceOthers = cmp.lookupReference('sourceOthers');
    data.sourceOthers == "true" ? sourceOthers.setValue(true) : sourceOthers.setValue(false);

    cmp.lookupReference('cardDuplicationResult').setValue(data.cardDuplicationResult);
    cmp.lookupReference('cardDuplicationReason').setValue(data.cardDuplicationReason);
    cmp.lookupReference('unSanctionResult').setValue(data.unSanctionResult);
    cmp.lookupReference('unSanctionReason').setValue(data.unSanctionReason);
    cmp.lookupReference('ofacSanctionResult').setValue(data.ofacSanctionResult);
    cmp.lookupReference('ofacSanctionReason').setValue(data.ofacSanctionReason);

    cmp.lookupReference('nameOfCard').setValue(data.nameOfCard);
    cmp.lookupReference('referenceName').setValue(data.referenceName);
    cmp.lookupReference('relationShipWithApplicant').setValue(data.relationShipWithApplicant);
    cmp.lookupReference('referenceNameOfOrganization').setValue(data.referenceNameOfOrganization);
    cmp.lookupReference('referenceDesignation').setValue(data.referenceDesignation);
    cmp.lookupReference('referenceWorkAndResidenceAddress').setValue(data.referenceWorkAndResidenceAddress);
    cmp.lookupReference('referenceTelephone').setValue(data.referenceTelephone);
    cmp.lookupReference('referenceMobile').setValue(data.referenceMobile);
    cmp.lookupReference('referenceEmail').setValue(data.referenceEmail);
}

function buildCardTitle(data) {
    var customerName = data.customerName;
    var accountNo = data.accountNo;
    var ccTrackingNumber = data.ccTrackingNumber;

    var cardType = "";
    var rec = getGlobalStore('gCardTypeStore').findRecord('configurationId', data.cardTypeKey);
    if (rec) {
        cardType = rec.data.value1;
    }

    var state = data.stateDisplayLabel;

    return "Tracking Number : " + ccTrackingNumber + ", " + "Applicant : " + customerName + ", ACCOUNT : " + accountNo + ", Card Type: " + cardType + ", State : " + state;

}

function setHiddenCardInfo(cmp, data) {
    cmp.lookupReference('cardStateName').setValue(data.stateName);
    cmp.lookupReference('cardStateId').setValue(data.stateId);
    cmp.lookupReference('creditCardId').setValue(data.creditCardId);
    cmp.lookupReference('creditCardVer').setValue(data.creditCardVer);
    // if(userRoles.containsKey(appConstants.CARD_OFFICER)){
    // 	cmp.lookupReference('cardType1').setHidden(false);
    // }
}

function expandAllFieldSetInCardShow(cmp, arr) {
    for (var i = 0; i < arr.length; i++) {
        cmp.lookupReference(arr[i]).setHidden(false);
        cmp.lookupReference(arr[i]).setExpanded(true);
    }
    if (userRoles.containsKey(appConstants.CD) || userRoles.containsKey(appConstants.HO_CRM)) {
        cmp.lookupReference('existingLiabilitiesFieldCard').setHidden(true);
    }
}

function setCustFiledDisplay(cmp) {
    cmp.lookupReference('ccTrackingNumber').setHidden(true);
    cmp.lookupReference('applicationNumber').setHidden(false);
    cmp.lookupReference('salaryDisbursedWithCBBL').setHidden(false);
    cmp.lookupReference('CbblAccountNo').setHidden(false);
    cmp.lookupReference('cif').setHidden(false);
    cmp.lookupReference('dateOfRetirement').setHidden(false);
    cmp.lookupReference('remainingYearOfRetirement').setHidden(false);
    cmp.lookupReference('sourcingBranch').setHidden(false);
    cmp.lookupReference('emerPhone').setHidden(false);
    cmp.lookupReference('staffId').setHidden(false);
    cmp.lookupReference('customerPostingDivision').setHidden(false);
    cmp.lookupReference('customerPostingDistrict').setHidden(false);
    cmp.lookupReference('nameAsPerNid').setHidden(false);
    cmp.lookupReference('passportNo').setHidden(false);
    cmp.lookupReference('valueOfSecurity').setHidden(false);
    cmp.lookupReference('loanToValue').setHidden(false);
    cmp.lookupReference('cibStatus').setHidden(false);
    cmp.lookupReference('cibGeneration').setHidden(false);
    if (userRoles.containsKey(appConstants.CD)) {
        // cmp.lookupReference('cibStatus').setHidden(true);
        cmp.lookupReference('cibGeneration').setHidden(true);
        cmp.lookupReference('netMonthlyIncome').setHidden(true);
        cmp.lookupReference('districtOfPosting').setHidden(true);
        cmp.lookupReference('officeAddress').setHidden(true);
        cmp.lookupReference('cardMonthlyBillDebited').setHidden(true);
        cmp.lookupReference('permanentAddress').setHidden(true);
        cmp.lookupReference('duplications').setHidden(true);
        cmp.lookupReference('passpordExpiryDate').setHidden(false);
    } else if (userRoles.containsKey(appConstants.CARD_OFFICER) ||
        userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
        cmp.lookupReference('cardType1').setHidden(false);
        // cmp.lookupReference('cibStatus').setHidden(true);
        cmp.lookupReference('cibGeneration').setHidden(true);
        cmp.lookupReference('districtOfPosting').setHidden(true);
    } else {
        console.log('No hidden field');
    }

}

function getCardPdfPanel(title, itemId, cmpName, cmpItemId, cmpId, serverUrl) {
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
            close: function(cmp, eOpts) {
                if (title == 'Sanction Letter') {

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
                    fn: function() {
                        this.parent().unmask();
                    }
                },
                render: function() {}
            }
        }]
    });

    return pdfPanel;
}

function getArrayOfGridCard(cmp) {
    var arrayOfGrid = [];
    arrayOfGrid.push(cmp.lookupReference('existingLiabilitiesGridCard'));
    arrayOfGrid.push(cmp.lookupReference('cibStatusGrid'));
    arrayOfGrid.push(cmp.lookupReference('analystsCommentsGrid'));
    arrayOfGrid.push(cmp.lookupReference('exceptionDetailGrid'));
    arrayOfGrid.push(cmp.lookupReference('instrucationsToCADGrid'));
    arrayOfGrid.push(cmp.lookupReference('cmntJustificationGrid'));
    // arrayOfGrid.push(cmp.lookupReference('sourceRecmndGrid'));
    // arrayOfGrid.push(cmp.lookupReference('branchRecmndGrid'));
    arrayOfGrid.push(cmp.lookupReference('cmntDeviationGrid'));
    arrayOfGrid.push(cmp.lookupReference('queryResponseGrid'));

    return arrayOfGrid;
}

function hideAllActionColumnCard(arr) {
    for (var i = 0; i < arr.length; i++) {
        hideActionColumn(arr[i], 'saveReference');
        hideActionColumn(arr[i], 'deleteReference');
        hideActionColumn(arr[i], 'addNewCellReference');
    }
}

function setDefultCommentRowCard(storeId) {
    var store = getGlobalStore(storeId);
    var items = store.data.items;
    if (items.length == 0) {
        store.insert(0, new Desktop.model.Comment());
    }
}

function handleAfterSaveCommentCard(data, cmp, storeId, gridRef) {
    if (data.commentId && data.rowIndex != null && data.rowIndex !== undefined) {
        setCommentIdInStoreCard(storeId, data.commentId, data.rowIndex);
    }
    Ext.toast('Successfully Saved.');
    cmp.lookupReference(gridRef).getView().refresh();
}


function setCommentIdInStoreCard(storeId, commentId, rowIndex) {
    var store = getGlobalStore(storeId);
    var data = store.getAt(rowIndex).data;

    data.commentId = commentId;
    data.commentedBy = loginUser.unId;
    data.createdDate = new Date();
}

function setCommentRowAtEndCard(storeId) {
    var store = getGlobalStore(storeId);
    var items = store.data.items;
    store.insert(items.length, new Desktop.model.Comment());
}

function getPayloadOfCmntJustificationCard(cmp) {
    return getCommentListArrayCard('gCmntJustificationStoreCard');
}

function getCommentListArrayCard(storeId) {

    var data = getGlobalStore(storeId).data.items;

    var commentType;
    if (storeId == 'gCibStatusCommentStoreCard') {
        commentType = appConstants.CIB_STATUS;
    } else if (storeId == 'gAnalystCommentStoreCard') {
        commentType = appConstants.ANALYSTS_COMMENTS;
    } else if (storeId == 'gExceptionDetailStoreCard') {
        commentType = appConstants.EXCEPTION_DETAILS;
    } else if (storeId == 'gIns2CADStoreCard') {
        commentType = appConstants.INS_2_CAD;
    } else if (storeId == 'gCmntJustificationStoreCard') {
        commentType = appConstants.COMMENTS_JUSTIFICATION;
    } else if (storeId == 'gCmntDeviationsStore') {
        commentType = appConstants.COMMENTS_DEVIATION;
    }
    // else if (storeId == 'gSourceRecmndStore') {
    // 	commentType = appConstants.SO_RECOMMENDATION;
    // } else if (storeId == 'gBranchRecmndStore') {
    // 	commentType = appConstants.BM_RECOMMENDATION;
    // }

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
        data[i].data.objectType = appContentType.CONTENT_TYPE_CREDIT_CARD_CMD.toUpperCase();

        if (isValidCommentCard(data[i].data.comments)) {
            arr.push(data[i].data);
        }
    }
    return arr;
}

function isValidCommentCard(comment) {
    comment = doTrim(comment);

    if (!comment) return false;
    if (Ext.isEmpty(comment)) return false;

    return true;
}

function setDefultRowOfAllGridCard() {
    setDefultCommentRowCard('gCibStatusCommentStoreCard');
    setDefultCommentRowCard('gAnalystCommentStoreCard');
    setDefultCommentRowCard('gExceptionDetailStoreCard');
    setDefultCommentRowCard('gCmntJustificationStoreCard');
    setDefultCommentRow('gCmntDeviationsStore');
    // setDefultCommentRow('gSourceRecmndStore');
    // setDefultCommentRow('gBranchRecmndStore');
    setDefultCommentRowCard('gIns2CADStoreCard');

    setDefultLiabilityRowCard('gExistingLiabilitiesStoreCard');
}

function hideSaveActionColWithRefSaveOfAllGridCard(arr) {
    for (var i = 0; i < arr.length; i++) {
        hideActionColumn(arr[i], 'saveReference');
    }
}

function setPluginWithoutListenerInAllFieldCard(arr) {
    for (var i = 0; i < arr.length; i++) {
        setPluginWithoutListener(arr[i]);
    }
}

function setLiabilityRowAtEndCard(storeId) {
    var store = getGlobalStore(storeId);
    var items = store.data.items;
    store.insert(items.length, new Desktop.model.ExistingLiabilitiesModel());
}

function getLiabilitiesForSaveAndNewColCard(cmp) {
    var creditCardKey = cmp.lookupReference('keepHiddenCreditCardId').value;
    var arr = [];
    var store = getGlobalStore('gExistingLiabilitiesStoreCard');
    var data = store.data.items;
    for (var i = 0; i < data.length; i++) {
        if (data[i].data.existingLiabilityId) {
            arr.push(data[i].data);
        } else {
            if (isValidLiabilityCard(data[i].data)) {
                var groupNameCheck = data[i].data.bankName;
                var groupName;
                groupNameCheck = groupNameCheck.toUpperCase().trim();
                if (groupNameCheck == appConstants.CBBL) {
                    groupName = appConstants.CBBL;
                } else {
                    groupName = appConstants.WITHOUT_CBBL;
                }
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
                    creditCardKey: creditCardKey,
                    groupName: groupName,
                    objectType: appConstants.CREDIT_CARD
                };
                arr.push(payload);
            }
        }
    }
    return arr;
}

function isValidLiabilityCard(data) {

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

function getPayloadOfLiabilityCard(cmp) {
    return getLiabilitiesListArrayCard('gExistingLiabilitiesStoreCard');
}

function getLiabilitiesListArrayCard(storeId) {
    var arr = [];
    var store = getGlobalStore(storeId);
    var data = store.data.items;
    for (var i = 0; i < data.length; i++) {
        if (Ext.isEmpty(data[i].data.creditCardKey) || !data[i].data.creditCardKey) data[i].data.creditCardKey = null;
        if (Ext.isEmpty(data[i].data.existingLiabilityId) || !data[i].data.existingLiabilityId) {
            data[i].data.existingLiabilityId = null;
        }
        data[i].data.userModKey = loginUser.id;

        if (isValidLiabilityCard(data[i].data)) {
            arr.push(data[i].data);
        }
    }
    return arr;
}

function setDefultLiabilityRowCard(storeId) {
    var store = getGlobalStore(storeId);
    var items = store.data.items;
    if (items.length == 0) {
        store.insert(0, new Desktop.model.ExistingLiabilitiesModel());
    }
}

function manageCardField(cmp, data) {
    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {
        if (data.stateName == 'FO_CREATED') {
            cmp.lookupReference('foUpdateApplicationBtn').setHidden(false);
            cmp.lookupReference('foDeleteApplicationBtn').setHidden(false);
            cmp.lookupReference('foCloseApplicationBtn').setHidden(false);
            cmp.lookupReference('foRecommendedApplicationBtn').setHidden(false);
        } else if (data.stateName == 'USER_CREATED') {
            cmp.lookupReference('foUpdateApplicationBtn').setHidden(false);
            cmp.lookupReference('foCloseApplicationBtn').setHidden(false);
            cmp.lookupReference('foRecommendedApplicationBtn').setHidden(false);
        } else if (data.stateName == 'FO_UPDATED') {
            cmp.lookupReference('foUpdateApplicationBtn').setHidden(false);
            cmp.lookupReference('foRecommendedApplicationBtn').setHidden(false);
            cmp.lookupReference('foDeleteApplicationBtn').setHidden(false);
            cmp.lookupReference('foCloseApplicationBtn').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.CARD_OFFICER)) {
        if (data.stateName == 'FO_RECOMMENDED') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
        } else if (data.stateName == 'CA_RETURNED') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
        } else if (data.stateName == 'C_OFFICER_UPDATED') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
            cmp.lookupReference('coOfCORecommend').setHidden(false);
            cmp.lookupReference('coOfCORejectAppBtn').setHidden(false);
        } else if (data.stateName == 'HOC_RETURNED') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
        } else if (data.stateName == 'CA_QUERY_TO_C_OFFICER') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
        } else if (data.stateName == 'CO_QUERY_TO_C_OFFICER') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
        } else if (data.stateName == 'C_OFFICER_REJECT') {
            cmp.lookupReference('coOfCOUpdateAppBtn').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.HEAD_OF_CARD)) {
        if (data.stateName == 'C_OFFICER_RECOMMENDED') {
            cmp.lookupReference('hoCoCDRecommendbtn').setHidden(false);
            cmp.lookupReference('hoCoCDReturnBtn').setHidden(false);
            cmp.lookupReference('btnHeadOfCardApprove').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.CREDIT_ANALYST)) {
        if (data.stateName == 'HOC_RECOMMENDED') {
            cmp.lookupReference('creAnalystPendRecBtn').setHidden(false);
            // cmp.lookupReference('btnCaQuery').setHidden(false);
            // cmp.lookupReference('btnCaReturn').setHidden(false);
        } else if (data.stateName == 'CARD_RECEIVED') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
            // cmp.lookupReference('caRecommendBtn').setHidden(false);
            cmp.lookupReference('btnCaReturn').setHidden(false);
            cmp.lookupReference('btnCaQuery').setHidden(false);
        } else if (data.stateName == 'CA_UPDATED') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
            cmp.lookupReference('caRecommendBtn').setHidden(false);
            cmp.lookupReference('btnCaReturn').setHidden(false);
            cmp.lookupReference('btnCaQuery').setHidden(false);
        } else if (data.stateName == 'RM_RETURN') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
        } else if (data.stateName == 'RM_DECLINE') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
        } else if (data.stateName == 'UH_DECLINE') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
        } else if (data.stateName == 'HO_CRM_RETURN' || data.stateName == 'HO_CRM_DELINE') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
        } else if (data.stateName == 'HOCRM_REMOVED_FROM_GROUP') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
            cmp.lookupReference('btnCaQuery').setHidden(false);
        } else if (data.stateName == 'CA_QUERY_TO_C_OFFICER_UPDATED') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
            cmp.lookupReference('caRecommendBtn').setHidden(false);
            cmp.lookupReference('btnCaReturn').setHidden(false);
            cmp.lookupReference('btnCaQuery').setHidden(false);
            // cmp.lookupReference('btnCaResend').setHidden(false);
        } else if (data.stateName == 'UH_QUERY_TO_CA') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
        } else if (data.stateName == 'CO_QUERY_TO_CA') {
            cmp.lookupReference('creAnalystUpdtBtn').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.RISK_MANAGER)) {
        if (data.stateName == 'CA_RECOMMENDED') {
            cmp.lookupReference('rmOfCRMdeclineBtn').setHidden(false);
            cmp.lookupReference('rmCardRecommendGroupMenuBtn').setHidden(false);
            cmp.lookupReference('btnRmOfCRMReturn').setHidden(false);
            cmp.lookupReference('btnRMApprove').setHidden(false);
        }
    } else if (userRoles.containsKey(appConstants.UNIT_HEAD)) {
        if (data.stateName == 'CA_RECOMMENDED' || data.stateName == 'UH_QUERY_TO_CA_UPDATED') {
            cmp.lookupReference('btnUhOfCRMApprove').setHidden(false);
            cmp.lookupReference('uhOfCRMdeclineBtn').setHidden(false);
            cmp.lookupReference('uhOfCRMRecommendBtn').setHidden(false);
            cmp.lookupReference('btnUhQuery').setHidden(false);
        } else if (data.stateName == 'RM_RECOMMENDED_TO_UH') {
            cmp.lookupReference('btnUhOfCRMApprove').setHidden(false);
            cmp.lookupReference('uhOfCRMRecommendBtn').setHidden(false);
            cmp.lookupReference('uhOfCRMdeclineBtn').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.HO_CRM)) {
        if (data.stateName == 'UH_APPROVE' || data.stateName == 'RM_APPROVE' || data.stateName == 'HOCRM_APPROVE') {
            cmp.lookupReference('btnHoCRMofCRMSendToCo').setHidden(false);
        } else if (data.stateName == 'RM_RECOMMENDED_TO_HOCRM' || data.stateName == 'UH_RECOMMENDED_HO_CRM') {
            cmp.lookupReference('btnHoCRMofCRMApprove').setHidden(false);
            cmp.lookupReference('btnHoCRMofCRMReturn').setHidden(false);
            cmp.lookupReference('hoCRMofCRMdeclineBtn').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.MANAGING_DIRECTOR)) {
        console.log("This state action not define");
    } else if (userRoles.containsKey(appConstants.CD)) {
        if (data.stateName == 'RM_RECOMMENDED_TO_CD') {
            cmp.lookupReference('btnCDByAgree').setHidden(false);
            cmp.lookupReference('btnCDByReject').setHidden(false);
        } else if (data.stateName == 'UH_RECOMMENDED_TO_CD') {
            cmp.lookupReference('btnCDByAgree').setHidden(false);
            cmp.lookupReference('btnCDByReject').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else if (userRoles.containsKey(appConstants.CO)) {
        if (data.stateName == 'SENT_TO_CO') {
            cmp.lookupReference('btnCOperationReadyCard').setHidden(false);
            cmp.lookupReference('btnCOperationQueryToCo').setHidden(false);
            cmp.lookupReference('btnbtnCOperationQueryToCa').setHidden(false);
        } else if (data.stateName == 'CO_QUERY_TO_CA_UPDATED') {
            cmp.lookupReference('btnCOperationReadyCard').setHidden(false);
            cmp.lookupReference('btnCOperationQueryToCo').setHidden(false);
            cmp.lookupReference('btnbtnCOperationQueryToCa').setHidden(false);
        } else if (data.stateName == 'CO_QUERY_TO_C_OFFICER_UPDATED') {
            cmp.lookupReference('btnCOperationReadyCard').setHidden(false);
            cmp.lookupReference('btnCOperationQueryToCo').setHidden(false);
            cmp.lookupReference('btnbtnCOperationQueryToCa').setHidden(false);
        } else {
            console.log("This state action not define");
        }
    } else {
        console.log('your role action undefine');
    }
}

function isMandatoryCardDocument(storeId) {
    var data = getGlobalStore(storeId).data.items;
    for (var i = 0; i < data.length; i++) {
        if (data[i].data.isMandatory == 1 && data[i].data.uploadStatus != 1) {
            return false;
        }
    }
    return true;

}

function getPayloadOfCardDocument(storeId) {
    var data = getGlobalStore(storeId).data.items;

    var arr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = {
            documentKey: data[i].data.documentKey ? data[i].data.documentKey : null,
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

function getPayloadOfCardLiability(cmp) {
    return getLiabilitiesCardListArray('gExistingLiabilitiesStoreCard');
}

function getLiabilitiesCardListArray(storeId) {
    var arr = [];
    var store = getGlobalStore(storeId);
    var data = store.data.items;
    for (var i = 0; i < data.length; i++) {
        if (Ext.isEmpty(data[i].data.creditCardKey) || !data[i].data.creditCardKey) data[i].data.creditCardKey = null;
        if (Ext.isEmpty(data[i].data.existingLiabilityId) || !data[i].data.existingLiabilityId) {
            data[i].data.existingLiabilityId = null;
        }
        data[i].data.userModKey = loginUser.id;

        if (isValidLiabilityCard(data[i].data)) {
            arr.push(data[i].data);
        }
    }
    return arr;
}

function getCommentList(cmp) {

    var commentList = new Array();
    commentList.push(getPayloadOfCibStatusCard(cmp));
    commentList.push(getPayloadOfAnalystsCmntCard(cmp));
    commentList.push(getPayloadOfExceptionDtlsCard(cmp));
    commentList.push(getPayloadOfIns2CadCard(cmp));
    commentList.push(getPayloadOfCmntJustificationCard(cmp));
    return commentList;
}

function getPayloadOfCibStatusCard(cmp) {
    return getCommentListArrayCard('gCibStatusCommentStoreCard');
}

function getPayloadOftDeviationsCard(cmp) {
    return getCommentListArrayCard('gCmntDeviationsStore');
}

function getPayloadOfAnalystsCmntCard(cmp) {
    return getCommentListArrayCard('gAnalystCommentStoreCard');
}

function getPayloadOfExceptionDtlsCard(cmp) {
    return getCommentListArrayCard('gExceptionDetailStoreCard');
}

function getPayloadOfIns2CadCard(cmp) {
    return getCommentListArrayCard('gIns2CADStoreCard');
}

function recommentSetValueOnBtnClickCard(newRecomment, cmp, commentType, actionType) {
    newRecomment.lookupReference('commentType').setValue(commentType);
    newRecomment.lookupReference('actionType').setValue(actionType);
    newRecomment.lookupReference('uiActionName').setValue(actionType);

    var creditCardId = cmp.lookupReference('keepHiddenCreditCardId').value;
    var cardStateName = cmp.lookupReference('cardStateName').value;
    var cardStateId = cmp.lookupReference('cardStateId').value;

    var cardRawData = cmp.lookupReference('hiddenCardRawData').value;

    newRecomment.lookupReference('creditCardId').setValue(creditCardId);
    newRecomment.lookupReference('stateName').setValue(cardStateName);
    newRecomment.lookupReference('stateId').setValue(cardStateId);
    newRecomment.lookupReference('roleId').setValue(cardRawData.recommendGroupId);
    newRecomment.lookupReference('currentUserroleName').setValue(loginUser.roleList[0].name);
    newRecomment.lookupReference('custDesignation').setValue(cardRawData.customer.designation);
    newRecomment.lookupReference('applicantAskingLimit').setValue(cardRawData.applicantAskingLimit);
}

function isCardValidComment(comment) {
    comment = doTrim(comment);

    if (!comment) return false;
    if (Ext.isEmpty(comment)) return false;

    return true;
}

function showDownloadProcessingBarCard(button, title, pText) {

    Ext.MessageBox.show({
        title: title,
        // msg: message,
        progressText: pText,
        width: 300,
        progress: true,
        closable: true
    });
    showProgressBarCard();
}

function showProgressBarCard() {
    for (var i = 1; i < 16; i++) {
        setTimeout(progressBarCard(i), i * 500);
    }
}

function progressBarCard(v) {
    return function() {
        if (v == 15) {
            Ext.MessageBox.hide();
        } else {
            var i = v / 14;
            Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
        }
    };
}

function getCardTypeFromKey(key) {
    var value = "";
    var rec = getGlobalStore('gCardTypeStore').findRecord('configurationId', key);
    if (rec) {
        value = rec.data.value1;
    }
    return value;
}

function getCardCustomerTypeFromKey(key) {
    var value = "";
    var rec = getGlobalStore('gCustTypeStore').findRecord('configurationId', key);
    if (rec) {
        value = rec.data.value1;
    }
    return value;
}

function setCardInfoWithData(cmp, data) {
    cmp.lookupReference('sourcingBranch').setValue(data.sourcingBranch);
    cmp.lookupReference('staffId').setValue(data.staffId);
}

function setCardInfoWithValidData(cmp, data) {
    if (data.sourcingBranch) cmp.lookupReference('sourcingBranch').setValue(data.sourcingBranch);
    if (data.staffId) cmp.lookupReference('staffId').setValue(data.staffId);
}

function getNewCardAddToCardGroupWindow(title) {
    var win = Ext.create('Ext.window.Window', {
        height: 550,
        width: 1000,
        itemId: 'newCardAddToCardGroup',
        reference: 'newCardAddToCardGroup',
        maximizable: true,
        constrainHeader: true,
        closeAction: 'destroy',
        //scrollable: true,
        //autoScroll : true,   
        title: title,
        modal: true,
        layout: 'anchor',
        listeners: {
            close: function(cmp, eOpts) {
                getGlobalStore('gAddToCardGroupGridViewStore').clearData();
            }
        },
        items: [{
            xtype: 'CardAddToCardGroupDetails'
        }]
    });

    addCardToCardGroupWindow = win;
    return win;
}

function checkAdditionalDcumentFiled(cmp, data) {
    var count = 0;
    for (var i = 0; i < data.cardDocumentList.length; i++) {
        if (data.cardDocumentList[i].docType == "SECURITY_DOC_SECURE_CARD") {
            cmp.lookupReference('uploadSecDocSecuredCard').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "VALID_PASSPORT_DUAL_CARD") {
            cmp.lookupReference('uploadValidPassportDualCard').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SUPPLEMENTARY_APPLICANT_PHOTO") {
            cmp.lookupReference('uploadSupplApplicatPhoto').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SUPPLEMENTARY_APPLICANT_NID") {
            cmp.lookupReference('uploadSupplApplicatNid').setHidden(true);
            count++;
        }
    }
    if (count == 4) {
        cmp.lookupReference('additionalDocument').setHidden(true);
    }
}

function checkNonAdditionalDcumentFiled(cmp, data) {
    var count = 0;
    for (var i = 0; i < data.cardDocumentList.length; i++) {
        if (data.cardDocumentList[i].docType == "PASSPORT_SIZE_PHOTI 2") {
            cmp.lookupReference('uploadPassportSizePhoto2').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "PASSPORT_SIZE_PHOTI 1") {
            cmp.lookupReference('uploadPassportSizePhoto1').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SALARY_STATEMENT") {
            cmp.lookupReference('uploadsalaryStatement').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "REFERENCH_DETAILS") {
            cmp.lookupReference('uploadReferenceDetails').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "BP/CIV_ID_DOCUMENTS_COPY") {
            cmp.lookupReference('uploadBpCibDocuments').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "LETTER_OF_INTRODUCTION(LOI)") {
            cmp.lookupReference('uploadLetterOfIntroduction').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "CIB_UNDERTAKING") {
            cmp.lookupReference('uploadCibUnderTaking').setHidden(true);
            count++;
        }
    }
    if (count == 7) {
        cmp.lookupReference('regularDocument').setHidden(true);
    }
    // cmp.lookupReference('uploadNIdCard').setHidden(true);
    // cmp.lookupReference('uploadTINFO').setHidden(true);
}

function checkDcumentFiled(cmp, data) {
    var count = 0;
    for (var i = 0; i < data.cardDocumentList.length; i++) {
        if (data.cardDocumentList[i].docType == "PASSPORT_SIZE_PHOTI 2") {
            cmp.lookupReference('uploadPassportSizePhoto2').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "PASSPORT_SIZE_PHOTI 1") {
            cmp.lookupReference('uploadPassportSizePhoto1').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SALARY_STATEMENT") {
            cmp.lookupReference('uploadsalaryStatement').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "REFERENCH_DETAILS") {
            cmp.lookupReference('uploadReferenceDetails').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "BP/CIV_ID_DOCUMENTS_COPY") {
            cmp.lookupReference('uploadBpCibDocuments').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "LETTER_OF_INTRODUCTION(LOI)") {
            cmp.lookupReference('uploadLetterOfIntroduction').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "CIB_UNDERTAKING") {
            cmp.lookupReference('uploadCibUnderTaking').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SECURITY_DOC_SECURE_CARD") {
            cmp.lookupReference('uploadSecDocSecuredCard').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "VALID_PASSPORT_DUAL_CARD") {
            cmp.lookupReference('uploadValidPassportDualCard').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SUPPLEMENTARY_APPLICANT_PHOTO") {
            cmp.lookupReference('uploadSupplApplicatPhoto').setHidden(true);
            count++;
        } else if (data.cardDocumentList[i].docType == "SUPPLEMENTARY_APPLICANT_NID") {
            cmp.lookupReference('uploadSupplApplicatNid').setHidden(true);
            count++;
        }
    }
    if (count == 11) {
        cmp.lookupReference('cardDocument').setHidden(true);
    } else if ((data.stateName != 'FO_CREATED') && (data.stateName != 'FO_UPDATED')) {
        cmp.lookupReference('cardDocument').setHidden(true);
    } else if ((data.stateName == 'FO_CREATED') && (data.stateName == 'FO_UPDATED') && count == 11) {
        cmp.lookupReference('cardDocument').setHidden(true);
    }
}

function getCardRecmndToProprtyMap() {
    var map = {};

    // TODO: fix this map values according to user and state

    if (userRoles.containsKey(appConstants.RISK_MANAGER)) {
        map[appConstants.MAP_KEY_RECOMMEND_TO_GROUP_CLICK] = 'onCardRmRecommendToGroupClick';
        map[appConstants.MAP_KEY_RECOMMEND_TO_USER_CLICK] = 'onCardRmRecommendToUserClick';
        map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU] = 'rmCardRecommendGroupMenu';
        map[appConstants.MAP_KEY_RECOMMEND_GROUP_MENU_BTN] = 'rmCardRecommendGroupMenuBtn';
    }

    return map;
}

function getCardRecomndAndReturnMenu(data, onGroupClick, onUserClick) {

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

function cardRecommentSetValue(newRecomment, cmp, commentType, actionType) {
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

    var cardDetailsPanel = cmp.up('#CardDetails');
    var creditCardId = cardDetailsPanel.lookupReference('keepHiddenCreditCardId').value;
    var cardStateName = cardDetailsPanel.lookupReference('cardStateName').value;
    var cardStateId = cardDetailsPanel.lookupReference('cardStateId').value;

    newRecomment.lookupReference('creditCardId').setValue(creditCardId);
    newRecomment.lookupReference('stateName').setValue(cardStateName);
    newRecomment.lookupReference('stateId').setValue(cardStateId);

    newRecomment.lookupReference('cardDetailsPanel').setValue(cardDetailsPanel);
}

function getCardRmRecommendAction(cmp) {
    var stateName = cmp.lookupReference('cardStateName').value;
    var action = appActionType.ACTION_TYPE_RM_RECOMMEND;
    if (action + 'ED' == stateName) {
        action = appActionType.ACTION_TYPE_RM_RE_RECOMMEND;
    }
}

function setCardDocObjForView(cmp, data) {
    var count = 0;

    fixCardLayoutForViewBtnWithTextField(cmp, data, appConstants.DOC_TYPE_NID_CARD, 'nidCardUploadedYes',
        'nidCardUploadedNo', 'uploadNIdCard', 'viewNidFile', 'nid', count);
    count++;

    fixCardLayoutForViewBtnWithTextField(cmp, data, appConstants.DOC_TYPE_TIN, 'tinCardUploadedYes',
        'tinCardUploadedNo', 'uploadTINFO', 'viewTinFile', 'tin', count);
}

function fixCardLayoutForViewBtnWithTextField(cmp, data, docType, yesRef, noRef, fileFieldRef, viewBtnRef, textFieldRef, count) {
    if (userRoles.containsKey(appConstants.FIELD_ORIGINATOR) || userRoles.containsKey(appConstants.FIELD_OFFICER)) {

        if (data[count]) {
            // if (rec.data.uploadStatus == 1) cmp.lookupReference(yesRef).setValue(true);
            // else cmp.lookupReference(noRef).setValue(true);

            if (data[count].filePresent) {
                cmp.lookupReference(fileFieldRef).columnWidth = .2;
                cmp.lookupReference(textFieldRef).columnWidth = .7;
                cmp.lookupReference(viewBtnRef).setHidden(false);
                cmp.lookupReference(fileFieldRef).setHidden(false);
            }
        }
    } else {
        cmp.lookupReference(textFieldRef).columnWidth = 1;
        cmp.lookupReference(fileFieldRef).setHidden(true);
    }
}

function isValidRecommendedApprovalCard(cmp) {
    var appliedAmount2 = cmp.lookupReference('appliedAmount2').value;
    var approvedLimit = cmp.lookupReference('approvedLimit').value;

    if (approvedLimit && approvedLimit > appliedAmount2) {
        cmp.lookupReference('approvedLimit').reset();
        Ext.MessageBox.alert('Not Valid Data', 'Approved Limit can not bigger than Applied Amount');
        return false;
    }
    if (!approvedLimit) {
        Ext.MessageBox.alert('Not Valid Data', 'Approved Limit should not be Empty.');
        return false;
    }

    return true;
}

function setDefaultIns2CadCard() {
    var store = getGlobalStore('gIns2CADStoreCard');
    var items = store.data.items;

    if (items.length <= 1 && userRoles.containsKey(appConstants.CREDIT_ANALYST)) {
        var insOne = Ext.create('Desktop.model.Comment', {
            comments: 'Max unsecured limit BDT 10 lac, secured BDT 25 lac, ERQ 90% of outstanding lien balance instruction to be followed (BRPD Circular No-04, 03 April, 2017)'
        });
        var insTwo = Ext.create('Desktop.model.Comment', {
            comments: 'Age both primary & Supplementary 18 years & above to be maintained (BRPD Circular-06, 20th June, 2018)'
        });
        var insThree = Ext.create('Desktop.model.Comment', {
            comments: 'In case, card emboss after one month of approval date, re-cib to be taken from CRM, Approval validity 90 days.'
        });
        var insFour = Ext.create('Desktop.model.Comment', {
            comments: 'CM can endorse USD limit as per Individual travel quota(Fex circular, nov 13, 2017) within remaining card limit.'
        });
        var insFive = Ext.create('Desktop.model.Comment', {
            comments: 'Auto Debit instruction is mandatory (against salary account with CBBL)'
        });
        var insSix = Ext.create('Desktop.model.Comment', {
            comments: 'Card duplication to be checked before card personalization'
        });
        store.insert(0, insOne);
        store.insert(1, insTwo);
        store.insert(2, insThree);
        store.insert(3, insFour);
        store.insert(4, insFive);
        store.insert(5, insSix);
    }
}

function getCardDuplicationWindow(title) {
    var win = Ext.create('Ext.window.Window', {
        height: 600,
        width: 950,
        layout: 'fit',
        itemId: 'cardDuplicationCheckWin',
        reference: 'cardDuplicationCheckWin',
        maximizable: true,
        constrainHeader: true,
        closeAction: 'destroy',
        scrollable: true,
        autoScroll: true,
        title: title,
        modal: true,
        items: [{
            xtype: 'CardDuplicationCheck'
        }]
    });

    carDuplicationWinToClose = win;

    return win;
}

function getCardCibInformationWindow(title) {
    var win = Ext.create('Ext.window.Window', {
        height: 600,
        width: 800,
        layout: 'fit',
        itemId: 'cardCibInformationWin',
        reference: 'cardCibInformationWin',
        maximizable: true,
        constrainHeader: true,
        closeAction: 'destroy',
        scrollable: true,
        autoScroll: true,
        title: title,
        modal: true,
        items: [{
            xtype: 'CardCibInformation'
        }]
    });

    cardCibDetailsWinClose = win;

    return win;
}

function setCardCibFormInformation(cmp, data) {
    var date = data.dateOfBirth.year + '-' + data.dateOfBirth.month + '-' + data.dateOfBirth.day;
    cmp.lookupReference('dateofBirth').setValue(date ? new Date(date.substr(0, 10)) : null);
    cmp.lookupReference('nid').setValue(data.nidPin);
    cmp.lookupReference('nameOfBrrower').setValue(data.nameEnglish);
    cmp.lookupReference('fatherName').setValue(data.fatherName);
    cmp.lookupReference('motherName').setValue(data.motherName);
    cmp.lookupReference('spouseName').setValue(data.spouseName);
    cmp.lookupReference('parmanentDistrict').setValue(data.permanentDistrict);
    cmp.lookupReference('postalCode').setValue(data.permanentPostalCode);
    cmp.lookupReference('presentDistrict').setValue(data.presentDistrict);
    cmp.lookupReference('presentPostalCode').setValue(data.presentPostalCode);
}

function isCardMandatoryNewPerson(cmp) {
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
    } else if (!typeOfFinancing) {
        Ext.MessageBox.alert('Missing Field', 'Type of financing should not be Empty.');
        return false;
    } else if (!numberOfInstallment) {
        Ext.MessageBox.alert('Missing Field', 'Number of installment should not be Empty.');
        return false;
    } else if (!installmentAmount) {
        Ext.MessageBox.alert('Missing Field', 'Installment amount should not be Empty.');
        return false;
    } else if (!totalInstallmentAmount) {
        Ext.MessageBox.alert('Missing Field', 'Total installment amount should not be Empty.');
        return false;
    } else if (!periodicityofPayment) {
        Ext.MessageBox.alert('Missing Field', 'Periodicity of payment should not be Empty.');
        return false;
    } else if (!nameOfBrrower) {
        Ext.MessageBox.alert('Missing Field', 'Name of brrower should not be Empty.');
        return false;
    } else if (!fatherName) {
        Ext.MessageBox.alert('Missing Field', 'Father name should not be Empty.');
        return false;
    } else if (!motherName) {
        Ext.MessageBox.alert('Missing Field', 'Mother name should not be Empty.');
        return false;
    } else if (!dateofBirth) {
        Ext.MessageBox.alert('Missing Field', 'Date of birth should not be Empty.');
        return false;
    } else if (!districtOfBirth) {
        Ext.MessageBox.alert('Missing Field', 'District of birth should not be Empty.');
        return false;
    } else if (!countryOfBirth) {
        Ext.MessageBox.alert('Missing Field', 'Country of birth should not be Empty.');
        return false;
    } else if (!parmanentDistrict) {
        Ext.MessageBox.alert('Missing Field', 'Parmanent district should not be Empty.');
        return false;
    } else if (!streetNameAndNumber) {
        Ext.MessageBox.alert('Missing Field', 'Street name and number should not be Empty.');
        return false;
    } else if (!parmanentCountryOfBirth) {
        Ext.MessageBox.alert('Missing Field', 'Parmanent country should not be Empty.');
        return false;
    }

    return true;
}

function getCardNewPerson(cmp) {
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
    var gender = cmp.lookupReference('gender').getChecked()[0].initialConfig.inputValue;
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
    var sectorType = cmp.lookupReference('sectorType').getChecked()[0].initialConfig.inputValue;
    var sectorCode = cmp.lookupReference('sectorCode').value;
    var title = cmp.lookupReference('title').value;
    var fathersTitle = cmp.lookupReference('fathertitle').value;
    var mothersTitle = cmp.lookupReference('mothertitle').value;
    var spouseTitle = cmp.lookupReference('spousetitle').value;
    var spouseName = cmp.lookupReference('spouseName').value;
    var tin = cmp.lookupReference('tin').value;
    var nid = cmp.lookupReference('nid').value;
    var idType = cmp.lookupReference('iDType').value;
    var idNum = cmp.lookupReference('iDNumber').value;
    var idIssueCountry = cmp.lookupReference('iDIssueCountry').value;
    var idIssueDateObj = cmp.lookupReference('iDIssueDate').value;
    var telephoneNum = cmp.lookupReference('telephoneNumber').value;
    var contractHistory = cmp.lookupReference('contractHistory').getChecked()[0].initialConfig.inputValue;
    var contractPhase = cmp.lookupReference('newInQueryContractPhase').value;
    var idIssueDate;
    var month1 = dateOfBirthObj.getMonth() + 1;
    var dateOfBirth = {
        "year": dateOfBirthObj.getFullYear(),
        "month": month1,
        "day": dateOfBirthObj.getDate()
    }

    if (idIssueDateObj) {
        var month2 = idIssueDateObj.getMonth() + 1;
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
        contractPhase: contractPhase ? contractPhase : null,
    }
    return newInquiryModel;

}

function isCardMandatorySubjectCode(cmp) {
    var cibSubjectCode = cmp.lookupReference('cibSubjectCode').value;
    if (!cibSubjectCode) {
        Ext.MessageBox.alert('Missing Field', 'Subject Code should not be Empty.');
        return false;
    }

    return true;
}

function getCardSubCode(cmp) {
    var subjectCode = cmp.lookupReference('cibSubjectCode').value;
    var contractHistory = cmp.lookupReference('codeContractHistory').getChecked()[0].initialConfig.inputValue;
    var contractPhase = cmp.lookupReference('contractPhase').value;
    var subjectTypeCode = cmp.lookupReference('subjectTypeCode').value;

    var checkInquiry = {
        contractHistory: contractHistory ? contractHistory : null,
        subjectCode: subjectCode ? subjectCode : null,
        contractPhase: contractPhase ? contractPhase : null,
        subjectTypeCode: subjectTypeCode ? subjectTypeCode : null,
    }
    return checkInquiry;
}

function getPayloadAcquisitionApplicantDetails(cmp, action) {

    var applicantTId = cmp.lookupReference('applicantTId').value;
    var idAcquisitionApplicantKey = cmp.lookupReference('hiddentidAcquisitionApplicantKey').value;
    var creditCardId = cmp.lookupReference('hiddentCreditCardId').value;
    var applicantCustomerType //= cmp.lookupReference('applicantCustomerType').value;
    var newApplicantCustomerType = cmp.lookupReference('newApplicantCustomerType').value;
    var existingApplicantCustomerType = cmp.lookupReference('existingApplicantCustomerType').value;
    if (newApplicantCustomerType != null || existingApplicantCustomerType != null) {
        if (newApplicantCustomerType == true) {
            applicantCustomerType = "New";
        } else if (existingApplicantCustomerType == true) {
            applicantCustomerType = "Existing CBBL A/C";
        }
    }

    var applicantAccountNumber = cmp.lookupReference('applicantAccountNumber').value;
    var applicantNidNumber = cmp.lookupReference('applicantNidNumber').value;
    var applicantBpNumber = cmp.lookupReference('applicantBpNumber').value;
    var applyingFor;
    var applyingForChecked = cmp.lookupReference('applicantApplyingFor').getChecked();
    if (applyingForChecked.length == 1) {
        if (applyingForChecked[0].inputValue == 0) {
            applyingFor = "CREDIT_CARD";
        } else if (applyingForChecked[0].inputValue == 1) {
            applyingFor = "Prepaid Card";
        } else if (applyingForChecked[0].inputValue == 2) {
            applyingFor = "Others";
        }
    }

    var cibSubjectCode = cmp.lookupReference('cibSubjectCode').value;
    var fiSubjectCode     = cmp.lookupReference('fiSubjectCode').value;

    var applicantTypeOfCard;
    var applicantTypeOfCardChecked = cmp.lookupReference('applicantTypeOfCard').getChecked();
    if (applicantTypeOfCardChecked.length == 1) {
        if (applicantTypeOfCardChecked[0].inputValue == 0) {
            applicantTypeOfCard = "VISA CLASSIC";
        } else if (applicantTypeOfCardChecked[0].inputValue == 1) {
            applicantTypeOfCard = "VISA GOLD";
        } else if (applicantTypeOfCardChecked[0].inputValue == 2) {
            applicantTypeOfCard = "VISA PLATINUM";
        } else if (applicantTypeOfCardChecked[0].inputValue == 3) {
            applicantTypeOfCard = "VISA SIGNATURE";
        }
    }
    var applicantName = cmp.lookupReference('applicantName').value;
    // var applicantGenderNeutralTitle = cmp.lookupReference('applicantGenderNeutralTitle').value;
    var applicantGenderNeutralTitle;
    var applicantGenderNeutralTitleChecked = cmp.lookupReference('applicantGenderNeutralTitle').getChecked();
    if (applicantGenderNeutralTitleChecked.length == 1) {
        if (applicantGenderNeutralTitleChecked[0].inputValue == 0) {
            applicantGenderNeutralTitle = "Mr.";
        } else if (applicantGenderNeutralTitleChecked[0].inputValue == 1) {
            applicantGenderNeutralTitle = "Ms.";
        } else if (applicantGenderNeutralTitleChecked[0].inputValue == 2) {
            applicantGenderNeutralTitle = "Mrs.";
        } else if (applicantGenderNeutralTitleChecked[0].inputValue == 3) {
            applicantGenderNeutralTitle = "Others";
        }
    }
    var applicantNameOnCard = cmp.lookupReference('applicantNameOnCard').value;
    var applicantNameInBangla = cmp.lookupReference('applicantNameInBangla').value;
    // var applicantNationality = cmp.lookupReference('applicantNationality').value;
    var applicantNationality;
    var applicantNationalityChecked = cmp.lookupReference('applicantNationality').getChecked();
    if (applicantNationalityChecked.length == 1) {
        if (applicantNationalityChecked[0].inputValue == 0) {
            applicantNationality = "Bangladeshi";
        } else if (applicantNationalityChecked[0].inputValue == 1) {
            applicantNationality = "Others";
        }
    }
    var applicantSpecifyNationality = cmp.lookupReference('applicantSpecifyNationality').value;
    var applicantProfession = cmp.lookupReference('applicantProfession').value;
    var applicantDateOfBirth = Ext.Date.format(cmp.lookupReference('applicantDateOfBirth').value, 'Ymd');
    var applicantEtinNumber = cmp.lookupReference('applicantEtinNumber').value;
    var applicantGender;
    var applicantGenderChecked = cmp.lookupReference('applicantGender').getChecked();
    var applicantGenderChecked1 = cmp.lookupReference('applicantGender1').getChecked();
    var applicantGenderChecked2 = cmp.lookupReference('applicantGender2').getChecked();
    if(applicantGenderChecked == 0){
         if(applicantGenderChecked1.length == 1 && applicantGenderChecked2.length == 0){
            applicantGenderChecked = applicantGenderChecked1;
        }else if(applicantGenderChecked1.length == 0 && applicantGenderChecked2.length == 1){
            applicantGenderChecked = applicantGenderChecked2;
        }else if(applicantGenderChecked1.length == 1 && applicantGenderChecked2.length == 1){
            applicantGenderChecked = applicantGenderChecked2;
        }else{
            applicantGenderChecked = applicantGenderChecked;
        }

    }
    var applicantIdTypeChecked = cmp.lookupReference('applicantIdType').getChecked();
    var applicantIdTypeChecked1 = cmp.lookupReference('applicantIdType1').getChecked();
    var applicantIdType;
    
    if(applicantIdTypeChecked == 0){
             if(applicantIdTypeChecked1.length){
                applicantIdTypeChecked = applicantIdTypeChecked1;
            }else{
                applicantIdTypeChecked = applicantIdTypeChecked;
            }
    
        }
        if (applicantIdTypeChecked.length == 1) {
            if (applicantIdTypeChecked[0].inputValue == 1) {
                applicantIdType = "Passport";
            } else if (applicantIdTypeChecked[0].inputValue == 2) {
                applicantIdType = "Driving License";
            } else if (applicantIdTypeChecked[0].inputValue == 3) {
                applicantIdType = "Birth Registration";
            }
        }        
    if (applicantGenderChecked.length == 1) {
        if (applicantGenderChecked[0].inputValue == 0) {
            applicantGender = "Male";
        } else if (applicantGenderChecked[0].inputValue == 1) {
            applicantGender = "Female";
        } else if (applicantGenderChecked[0].inputValue == 2) {
            applicantGender = "Third Gender";
        }
    }
    var applicantMobileNo = cmp.lookupReference('applicantMobileNo').value;
    // var applicantOtherPhotoID = cmp.lookupReference('applicantOtherPhotoID').value;
    var applicantOtherPhotoID;
    var applicantOtherPhotoIDChecked = cmp.lookupReference('applicantOtherPhotoID').getChecked();
    if (applicantOtherPhotoIDChecked.length == 1) {
        if (applicantOtherPhotoIDChecked[0].inputValue == 0) {
            applicantOtherPhotoID = "Passport";
        } else if (applicantOtherPhotoIDChecked[0].inputValue == 1) {
            applicantOtherPhotoID = "Others";
        }
    }
    if(applicantOtherPhotoID != "Passport"){
        applicantOtherPhotoID = applicantIdType
    }
    var applicantPassportNo = cmp.lookupReference('applicantPassportNo').value;
    var applicantIdIssueCountry = cmp.lookupReference('applicantIdIssueCountry').value;
    var applicantIdIssueDate = Ext.Date.format(cmp.lookupReference('applicantIdIssueDate').value, 'Ymd');
    var applicantIdIssueDateExp = Ext.Date.format(cmp.lookupReference('applicantIdIssueDateExp').value, 'Ymd');
    var applicantFatherName = cmp.lookupReference('applicantFatherName').value;
    var applicantMotherName = cmp.lookupReference('applicantMotherName').value;

    var applicantSpouseName = cmp.lookupReference('applicantSpouseName').value;
    var applicantSpouseName1 = cmp.lookupReference('applicantSpouseName1').value;
    var applicantSpouseName2 = cmp.lookupReference('applicantSpouseName2').value;
    var applicantSpouseMobileNo = cmp.lookupReference('applicantSpouseMobileNo').value;
    // var applicantMaritalStatus = cmp.lookupReference('applicantMaritalStatus').value;
    if(!applicantSpouseName){
        if(applicantSpouseName1 && !applicantSpouseName2){
            applicantSpouseName = applicantSpouseName1;
        }else if(!applicantSpouseName1 && applicantSpouseName2){
            applicantSpouseName = applicantSpouseName2;
        }else if(applicantSpouseName1 && applicantSpouseName2){
            applicantSpouseName = applicantSpouseName1;
        }else{
            applicantSpouseName = applicantSpouseName;
        }
    }

    var applicantMaritalStatus;
    var applicantMaritalStatusChecked = cmp.lookupReference('applicantMaritalStatus').getChecked();
    if (applicantMaritalStatusChecked.length == 1) {
        if (applicantMaritalStatusChecked[0].inputValue == 0) {
            applicantMaritalStatus = "Single";
        } else if (applicantMaritalStatusChecked[0].inputValue == 1) {
            applicantMaritalStatus = "Married";
        }
    }
    var applicantMaritalStatusOthers = cmp.lookupReference('applicantMaritalStatusOthers').value;
    var applicantNoOfDependents = cmp.lookupReference('applicantNoOfDependents').value;
    // var applicantHighestEducation = cmp.lookupReference('applicantHighestEducation').value;
    var applicantHighestEducation;
    var applicantHighestEducationChecked = cmp.lookupReference('applicantHighestEducation').getChecked();
    if (applicantHighestEducationChecked.length == 1) {
        if (applicantHighestEducationChecked[0].inputValue == 0) {
            applicantHighestEducation = "SSC";
        } else if (applicantHighestEducationChecked[0].inputValue == 1) {
            applicantHighestEducation = "HSC";
        } else if (applicantHighestEducationChecked[0].inputValue == 2) {
            applicantHighestEducation = "Graduate";
        } else if (applicantHighestEducationChecked[0].inputValue == 3) {
            applicantHighestEducation = "Post Graduate";
        } else if (applicantHighestEducationChecked[0].inputValue == 4) {
            applicantHighestEducation = "Others";
        }
    }
    var applicantHighestEducationOthers = cmp.lookupReference('applicantHighestEducationOthers').value;
    // var applicantResStatus      =  cmp.lookupReference('applicantResStatus').value;
    var applicantResStatus;
    var applicantResStatusChecked = cmp.lookupReference('applicantResStatus').getChecked();
    if (applicantResStatusChecked.length == 1) {
        if (applicantResStatusChecked[0].inputValue == 1) {
            applicantResStatus = "Owned";
        } else if (applicantResStatusChecked[0].inputValue == 2) {
            applicantResStatus = "Family Owned";
        } else if (applicantResStatusChecked[0].inputValue == 3) {
            applicantResStatus = "Rented";
        } else if (applicantResStatusChecked[0].inputValue == 4) {
            applicantResStatus = "Company Provided";
        } else if (applicantResStatusChecked[0].inputValue == 5) {
            applicantResStatus = "Others";
        }
    }

    var applicantResiAddress = cmp.lookupReference('applicantResiAddress').value;
    var applicantResiNearLandmark = cmp.lookupReference('applicantResiNearLandmark').value;
    var applicantResiAddressPS = cmp.lookupReference('applicantResiAddressPS').value;
    var applicantResiAddressPostCode = cmp.lookupReference('applicantResiAddressPostCode').value;
    var applicantResiAddressDistrict = cmp.lookupReference('applicantResiAddressDistrict').value;
    var applicantResiAddressCountry = cmp.lookupReference('applicantResiAddressCountry').value;
    var applicantPerAddress = cmp.lookupReference('applicantPerAddress').value;
    var applicantPerAddress1 = cmp.lookupReference('applicantPerAddress1').value;
    var applicantPerAddress2 = cmp.lookupReference('applicantPerAddress2').value;

    if(!applicantPerAddress){
        if(applicantPerAddress1 && !applicantPerAddress2){
            applicantPerAddress = applicantPerAddress1;
        }else if(!applicantPerAddress1 && applicantPerAddress2){
            applicantPerAddress = applicantPerAddress2;
        }else if(applicantPerAddress1 && applicantPerAddress2){
            applicantPerAddress = applicantPerAddress1;
        }else{
            applicantPerAddress = applicantPerAddress;
        }
    }

    var applicantPerAddressNearLand = cmp.lookupReference('applicantPerAddressNearLand').value;
    var applicantPerAddressPS = cmp.lookupReference('applicantPerAddressPS').value;
    var applicantPerAddressPostCode = cmp.lookupReference('applicantPerAddressPostCode').value;
    var applicantPerAddressDistrict = cmp.lookupReference('applicantPerAddressDistrict').value;
    var applicantPerAddressCountry = cmp.lookupReference('applicantPerAddressCountry').value;
    var applicantPerAddressCountry1 = cmp.lookupReference('applicantPerAddressCountry1').value;
    var applicantPerAddressCountry3 = cmp.lookupReference('applicantPerAddressCountry3').value;

    if(!applicantPerAddressCountry){
        if(applicantPerAddressCountry1 && !applicantPerAddressCountry3){
            applicantPerAddressCountry = applicantPerAddressCountry1;
        }else if(!applicantPerAddressCountry1 && applicantPerAddressCountry3){
            applicantPerAddressCountry = applicantPerAddressCountry3;
        }else if(applicantPerAddressCountry1 && applicantPerAddressCountry3){
            applicantPerAddressCountry = applicantPerAddressCountry1;
        }else{
            applicantPerAddressCountry = applicantPerAddressCountry;
        }
    }

    // var applicantOccupation = cmp.lookupReference('applicantOccupation').value;
    var applicantOccupation;
    var applicantOccupationChecked = cmp.lookupReference('applicantOccupation').getChecked();
    if (applicantOccupationChecked.length == 1) {
        if (applicantOccupationChecked[0].inputValue == 1) {
            applicantOccupation = "Service Holder";
        } else if (applicantOccupationChecked[0].inputValue == 2) {
            applicantOccupation = "Businessman";
        } else if (applicantOccupationChecked[0].inputValue == 3) {
            applicantOccupation = "Salaried";
        } else if (applicantOccupationChecked[0].inputValue == 4) {
            applicantOccupation = "Company Provided";
        } else if (applicantOccupationChecked[0].inputValue == 5) {
            applicantOccupation = "Others";
        }
    }
    // var applicantOccupationOthers       =  cmp.lookupReference('applicantOccupationOthers').value;
    var applicantCompanyName = cmp.lookupReference('applicantCompanyName').value;
    var applicantDesignation = cmp.lookupReference('applicantDesignation').value;
    var applicantDepartment = cmp.lookupReference('applicantDepartment').value;
    var applicantNatureOfBusiness = cmp.lookupReference('applicantNatureOfBusiness').value;
    var applicantEmployeeID = cmp.lookupReference('applicantEmployeeID').value;
    var applicantOfficeAddress = cmp.lookupReference('applicantOfficeAddress').value;
    var applicantOfficeAddressPS = cmp.lookupReference('applicantOfficeAddressPS').value;
    var applicantOfficeAddressPostCode = cmp.lookupReference('applicantOfficeAddressPostCode').value;
    var applicantOfficeAddressDistrict = cmp.lookupReference('applicantOfficeAddressDistrict').value;
    var applicantOfficeAddressCountry = cmp.lookupReference('applicantOfficeAddressCountry').value;
    // var applicantEmployeeStatus = cmp.lookupReference('applicantEmployeeStatus').value;
    var applicantEmployeeStatus;
    var applicantEmployeeStatusChecked = cmp.lookupReference('applicantEmployeeStatus').getChecked();
    if (applicantEmployeeStatusChecked.length == 1) {
        if (applicantEmployeeStatusChecked[0].inputValue == 1) {
            applicantEmployeeStatus = "Permanent";
        } else if (applicantEmployeeStatusChecked[0].inputValue == 2) {
            applicantEmployeeStatus = "Contractual";
        }
    }
    var applicantBusinessEstablished = cmp.lookupReference('applicantBusinessEstablished').value;
    var applicantDurInCurrentJobYear = cmp.lookupReference('applicantDurInCurrentJobYear').value;
    var applicantDurInCurrentJobMonth = cmp.lookupReference('applicantDurInCurrentJobMonth').value;
    var applicantTotalWorkExpYear = cmp.lookupReference('applicantTotalWorkExpYear').value;
    var applicantTotalWorkExpMonth = cmp.lookupReference('applicantTotalWorkExpMonth').value;
    var applicantOfficePhoneNo = cmp.lookupReference('applicantOfficePhoneNo').value;
    var applicantMobileNo = cmp.lookupReference('applicantMobileNo').value;
    var applicantOtherId = cmp.lookupReference('applicantOtherId').value;
    var applicantMailingComAddress;
    var applicantMailingComAddressChecked = cmp.lookupReference('applicantMailingComAddress').getChecked();
    if (applicantMailingComAddressChecked.length == 1) {
        if (applicantMailingComAddressChecked[0].inputValue == 0) {
            applicantMailingComAddress = "Office Address";
        } else if (applicantMailingComAddressChecked[0].inputValue == 1) {
            applicantMailingComAddress = "Residental Address";
        } else if (applicantMailingComAddressChecked[0].inputValue == 2) {
            applicantMailingComAddress = "Permanent Address";
        }
    }
    var applicantCardReceivingWayName = cmp.lookupReference('applicantCardReceivingWayName').value;
    // var applicantCardReceivingWay = cmp.lookupReference('applicantCardReceivingWay').value;
    var applicantCardReceivingWay;
    var applicantCardReceivingWayChecked = cmp.lookupReference('applicantCardReceivingWay').getChecked();
    if (applicantCardReceivingWayChecked.length == 1) {
        if (applicantCardReceivingWayChecked[0].inputValue == 0) {
            applicantCardReceivingWay = "Communication Address";
        } else if (applicantCardReceivingWayChecked[0].inputValue == 1) {
            applicantCardReceivingWay = "CBBL Branch";
        }
    }
    var applicantMonthlyStatementsSentWay = cmp.lookupReference('applicantMonthlyStatementsSentWay').value;
    var applicantPromActivitPurposeId = cmp.lookupReference('applicantPromActivitPurposeId').value;
    var applicantAdditionalIncome = cmp.lookupReference('applicantAdditionalIncome').value;
    var applicantSpouseIncome = cmp.lookupReference('applicantSpouseIncome').value;
    var salariedMonthGrossSalary = cmp.lookupReference('salariedMonthGrossSalary').value;
    var salariedMonthTotalDeduction = cmp.lookupReference('salariedMonthTotalDeduction').value;
    var salariedMonthNetIncome = cmp.lookupReference('salariedMonthNetIncome').value;
    var nonSalariedMonthGrossSalary = cmp.lookupReference('nonSalariedMonthGrossSalary').value;
    var nonSalariedMonthTotalExpense = cmp.lookupReference('nonSalariedMonthTotalExpense').value;
    var nonSalariedMonthNetIncome = cmp.lookupReference('nonSalariedMonthNetIncome').value;
    var demandPromissoryTaka = cmp.lookupReference('demandPromissoryTaka').value;
    var demandPromissoryDate = Ext.Date.format(cmp.lookupReference('demandPromissoryDate').value, 'Ymd');
    var demandPromissoryPlace = cmp.lookupReference('demandPromissoryPlace').value;
    var demandPromissoryMessage = cmp.lookupReference('demandPromissoryMessage').value;
    var demandPromissorySecondTaka = cmp.lookupReference('demandPromissorySecondTaka').value;
    var demandPromissoryRate = cmp.lookupReference('demandPromissoryRate').value;
    var bankBranchname = cmp.lookupReference('bankBranchname').value;
    var bankSolID = cmp.lookupReference('bankSolID').value;
    var bankGeoLocationCheck1 = cmp.lookupReference('bankGeoLocationCheck1').value;
    var bankGeoLocationText1 = cmp.lookupReference('bankGeoLocationText1').value;
    var bankGeoLocationText2 = cmp.lookupReference('bankGeoLocationText2').value;
    var bankGeoLocationCheck2 = cmp.lookupReference('bankGeoLocationCheck2').value;
    var sourceComments      =  cmp.lookupReference('sourceComments').value;
    var applicantPostalCode = cmp.lookupReference('applicantPostalCode').value;
    var applicantAddress = cmp.lookupReference('applicantAddress').value;
    var applicantDistrict = cmp.lookupReference('applicantDistrict').value;
    // var applicantDistrict2 = cmp.lookupReference('applicantDistrict2').value;

    // if(!applicantDistrict){
    //     applicantDistrict = applicantDistrict2;       
    // }
    
    // var applicantStreetName = cmp.lookupReference('applicantStreetName').value;  

    // var applicantStreetNo = cmp.lookupReference('applicantStreetNo').value;
    // var applicantPostCode = cmp.lookupReference('applicantPostCode').value;
    var applicantDistrictOfBirth = cmp.lookupReference('applicantDistrictOfBirth').value;
    var applicantDistrictOfBirth1 = cmp.lookupReference('applicantDistrictOfBirth1').value;
    if(!applicantDistrictOfBirth && applicantDistrictOfBirth1){
        applicantDistrictOfBirth = applicantDistrictOfBirth1;
    }
    var applicantCountryOfBirth = cmp.lookupReference('applicantCountryOfBirth').value;
    var applicantCountryOfBirth1 = cmp.lookupReference('applicantCountryOfBirth1').value;
    if(!applicantCountryOfBirth && applicantCountryOfBirth1){
        applicantCountryOfBirth = applicantCountryOfBirth1;
    }
    var applicantIdNo = cmp.lookupReference('applicantIdNo').value;
    // var cibSubjectCode      =  cmp.lookupReference('cibSubjectCode').value;
    // var fiSubjectCode       =  cmp.lookupReference('fiSubjectCode').value;
    var bankName = cmp.lookupReference('bankName').value;
    var tradeName = cmp.lookupReference('tradeName').value;
    var fiCode = cmp.lookupReference('fiCode').value;
    var branchCode = cmp.lookupReference('branchCode').value;
    var typeOfFinancing = cmp.lookupReference('typeOfFinancing').value;
    var totalRequestedAmountOrCreditLmt = cmp.lookupReference('totalRequestedAmountOrCreditLmt').value;
    var installmentContractDate = Ext.Date.format(cmp.lookupReference('installmentContractDate').value, 'Ymd');
    var installmentAmount = cmp.lookupReference('installmentAmount').value;
    var numOfInstallment = cmp.lookupReference('numOfInstallment').value;
    var paymentPeriodicity = cmp.lookupReference('paymentPeriodicity').value;
    // var sectorType = cmp.lookupReference('sectorType').value;
    var sectorType;
    var sectorTypeChecked = cmp.lookupReference('sectorType').getChecked();
    if (sectorTypeChecked.length == 1) {
        if (sectorTypeChecked[0].inputValue == 1) {
            sectorType = "Public";
        } else if (sectorTypeChecked[0].inputValue == 2) {
            sectorType = "Private";
        }
    }
    var sectorCode = cmp.lookupReference('sectorCode').value;
    // var managerSealAndSignaure      =  cmp.lookupReference('managerSealAndSignaure').value;
    // var applicantSignature      =  cmp.lookupReference('applicantSignature').value;
    // var authorizedOfficerSealAndSignaure        =  cmp.lookupReference('authorizedOfficerSealAndSignaure').value;
    var applicantPresentaddressStreetName = cmp.lookupReference('applicantPresentaddressStreetName').value;
    var applicantPresentaddressStreetNumber = cmp.lookupReference('applicantPresentaddressStreetNumber').value;
    var cifNo = cmp.lookupReference('cifNo').value;
    var fundSource = cmp.lookupReference('fundSource').value;
    var monthlyincome = cmp.lookupReference('monthlyincome').value;
    // var spouseEmploymentStatus = cmp.lookupReference('spouseEmploymentStatus').value;
    var spouseEmploymentStatus;
    var spouseEmploymentStatusChecked = cmp.lookupReference('spouseEmploymentStatus').getChecked();
    if (spouseEmploymentStatusChecked.length == 1) {
        if (spouseEmploymentStatusChecked[0].inputValue == 1) {
            spouseEmploymentStatus = "Salaried";
        } else if (spouseEmploymentStatusChecked[0].inputValue == 2) {
            spouseEmploymentStatus = "Self Employed";
        } else if (spouseEmploymentStatusChecked[0].inputValue == 3) {
            spouseEmploymentStatus = "Other";
        }
    }
    // var membershipOfClub = cmp.lookupReference('membershipOfClub').value;
    var membershipOfClub;
    var membershipOfClubChecked = cmp.lookupReference('membershipOfClub').getChecked();
    if (membershipOfClubChecked.length == 1) {
        if (membershipOfClubChecked[0].inputValue == 1) {
            membershipOfClub = "Yes";
        } else if (membershipOfClubChecked[0].inputValue == 2) {
            membershipOfClub = "No";
        }
    }
    var specifyClubName = cmp.lookupReference('specifyClubName').value;
    // var youAreVerifiedCustomer = cmp.lookupReference('youAreVerifiedCustomer').value;
    var youAreVerifiedCustomer;
    var youAreVerifiedCustomerChecked = cmp.lookupReference('youAreVerifiedCustomer').getChecked();
    if (youAreVerifiedCustomerChecked.length == 1) {
        if (youAreVerifiedCustomerChecked[0].inputValue == 1) {
            youAreVerifiedCustomer = "Yes";
        } else if (youAreVerifiedCustomerChecked[0].inputValue == 2) {
            youAreVerifiedCustomer = "No";
        }
    }
    var houseRentRange = cmp.lookupReference('houseRentRange').value;
    // var haveCustomerOwnCard = cmp.lookupReference('haveCustomerOwnCard').value;
    var haveCustomerOwnCar;
    var haveCustomerOwnCardChecked = cmp.lookupReference('haveCustomerOwnCar').getChecked();
    if (haveCustomerOwnCardChecked.length == 1) {
        if (haveCustomerOwnCardChecked[0].inputValue == 1) {
            haveCustomerOwnCar = "Yes";
        } else if (haveCustomerOwnCardChecked[0].inputValue == 2) {
            haveCustomerOwnCar = "No";
        }
    }
    var otherBankLiabilityPosition;
    var otherBankLiabilityPositionChecked = cmp.lookupReference('otherBankLiabilityPosition').getChecked();
    if (otherBankLiabilityPositionChecked.length == 1) {
        if (otherBankLiabilityPositionChecked[0].inputValue == 0) {
            otherBankLiabilityPosition = "YES";
        } else if (otherBankLiabilityPositionChecked[0].inputValue == 1) {
            otherBankLiabilityPosition = "NO";
        }
    }
    var otherBankAccDetails;
    var otherBankAccDetailsChecked = cmp.lookupReference('otherBankAccDetails').getChecked();
    if (otherBankAccDetailsChecked.length == 1) {
        if (otherBankAccDetailsChecked[0].inputValue == 0) {
            otherBankAccDetails = "YES";
        } else if (otherBankAccDetailsChecked[0].inputValue == 1) {
            otherBankAccDetails = "NO";
        }
    }
       
    var carBrandName = cmp.lookupReference('carBrandName').value;
    var travelYearlyNumber = cmp.lookupReference('travelYearlyNumber').value;
    var passportNumberIndentity = cmp.lookupReference('passportNumberIndentity').value;
    var nidIndetity = cmp.lookupReference('nidIndetity').value;
    var eTinIdIdentity = cmp.lookupReference('eTinIdIdentity').value;
    var passportNumberObtained = cmp.lookupReference('passportNumberObtained').value;
    var passportNumberVerified = cmp.lookupReference('passportNumberVerified').value;
    var nidIndetityObtained = cmp.lookupReference('nidIndetityObtained').value;
    var nidIndetityVerified = cmp.lookupReference('nidIndetityVerified').value;
    var eTinIdIdentityObtained = cmp.lookupReference('eTinIdIdentityObtained').value;
    var eTinIdIdentityVerified = cmp.lookupReference('eTinIdIdentityVerified').value;
    // var politicallyExposedPerson        =  cmp.lookupReference('politicallyExposedPerson').value;
    var politicallyExposedPerson;
    var politicallyExposedPersonChecked = cmp.lookupReference('politicallyExposedPerson').getChecked();
    if (politicallyExposedPersonChecked.length == 1) {
        if (politicallyExposedPersonChecked[0].inputValue == 1) {
            politicallyExposedPerson = "Yes";
        } else if (politicallyExposedPersonChecked[0].inputValue == 2) {
            politicallyExposedPerson = "No";
        }
    }
    // var youAreSeniorManagment       =  cmp.lookupReference('youAreSeniorManagment').value;
    var youAreSeniorManagment;
    var youAreSeniorManagmentChecked = cmp.lookupReference('youAreSeniorManagment').getChecked();
    if (youAreSeniorManagmentChecked.length == 1) {
        if (youAreSeniorManagmentChecked[0].inputValue == 1) {
            youAreSeniorManagment = "Yes";
        } else if (youAreSeniorManagmentChecked[0].inputValue == 2) {
            youAreSeniorManagment = "No";
        }
    }
    // var youAreFaceToFaceInterview       =  cmp.lookupReference('youAreFaceToFaceInterview').value;
    var youAreFaceToFaceInterview;
    var youAreFaceToFaceInterviewChecked = cmp.lookupReference('youAreFaceToFaceInterview').getChecked();
    if (youAreFaceToFaceInterviewChecked.length == 1) {
        if (youAreFaceToFaceInterviewChecked[0].inputValue == 1) {
            youAreFaceToFaceInterview = "Yes";
        } else if (youAreFaceToFaceInterviewChecked[0].inputValue == 2) {
            youAreFaceToFaceInterview = "No";
        }
    }
    // var youAreTerroristActivities       =  cmp.lookupReference('youAreTerroristActivities').value;
    var youAreTerroristActivities;
    var youAreTerroristActivitiesChecked = cmp.lookupReference('youAreTerroristActivities').getChecked();
    if (youAreTerroristActivitiesChecked.length == 1) {
        if (youAreTerroristActivitiesChecked[0].inputValue == 1) {
            youAreTerroristActivities = "Yes";
        } else if (youAreTerroristActivitiesChecked[0].inputValue == 2) {
            youAreTerroristActivities = "No";
        }
    }
    var youAreTerroristActivitieRegard = cmp.lookupReference('youAreTerroristActivitieRegard').value;
    var exceptionDetails = cmp.lookupReference('exceptionDetails').value;
    var applicantAskingLimit = cmp.lookupReference('applicantAskingLimit').value;
    var applicantRecommendedLimit = cmp.lookupReference('applicantRecommendedLimit').value;
    // var interviewedSourceSign = cmp.lookupReference('interviewedSourceSign').value;
    // var managerOrUnitHeadSign = cmp.lookupReference('managerOrUnitHeadSign').value;
    // var youAreCbblAccountHolder = cmp.lookupReference('youAreCbblAccountHolder').value;
    var passportNumberObtained = cmp.lookupReference('passportNumberObtained').value;
    var passportNumberVerified = cmp.lookupReference('passportNumberVerified').value;
    var nidIndetityObtained = cmp.lookupReference('nidIndetityObtained').value;
    var nidIndetityVerified = cmp.lookupReference('nidIndetityVerified').value;
    var eTinIdIdentityObtained = cmp.lookupReference('eTinIdIdentityObtained').value;
    var eTinIdIdentityVerified = cmp.lookupReference('eTinIdIdentityVerified').value;
    var youAreCbblAccountHolder;
    var youAreCbblAccountHolderChecked = cmp.lookupReference('youAreCbblAccountHolder').getChecked();
    if (youAreCbblAccountHolderChecked.length == 1) {
        if (youAreCbblAccountHolderChecked[0].inputValue == 0) {
            youAreCbblAccountHolder = "Yes";
        } else if (youAreCbblAccountHolderChecked[0].inputValue == 1) {
            youAreCbblAccountHolder = "No";
        }
    }
    // var autoPayInstruction      =  cmp.lookupReference('autoPayInstruction').value;
    var autoPayInstruction;
    var autoPayInstructionChecked = cmp.lookupReference('autoPayInstruction').getChecked();
    if (autoPayInstructionChecked.length == 1) {
        if (autoPayInstructionChecked[0].inputValue == 0) {
            autoPayInstruction = "Yes";
        } else if (autoPayInstructionChecked[0].inputValue == 1) {
            autoPayInstruction = "No";
        }
    }
    var applicantUsdAccountPortion      =  cmp.lookupReference('applicantUsdAccountPortion').value;
    var idSupplementAndReferKey = cmp.lookupReference('hiddenSupplymentReferKey').value;
    var paymentTypeOfStandingInstruction;
    var paymentTypeOfStandingInstruction1;

    var paymentTypeOfStandingInstructionChecked = cmp.lookupReference('paymentTypeOfStandingInstruction').getChecked();
    if (paymentTypeOfStandingInstructionChecked.length == 1) {
        if (paymentTypeOfStandingInstructionChecked[0].inputValue == 0) {
            paymentTypeOfStandingInstruction = "Full Payment";
        } else {
            paymentTypeOfStandingInstruction = "Minimum Payment";
        } 
    }

    var paymentTypeOfStandingInstructionChecked1 = cmp.lookupReference('paymentTypeOfStandingInstruction1').getChecked();
    if (paymentTypeOfStandingInstructionChecked1.length == 1) {
        if (paymentTypeOfStandingInstructionChecked1[0].inputValue == 0) {
            paymentTypeOfStandingInstruction1 = "Full Payment";
        } else {
            paymentTypeOfStandingInstruction1 = "Minimum Payment";
        } 
    }

    var businessAddress         = cmp.lookupReference('businessAddress').value;
    var businessDistrict        = cmp.lookupReference('businessDistrict').value;    
    var businessStreetName      = cmp.lookupReference('businessStreetName').value;  
    var businessStreetNumber    = cmp.lookupReference('businessStreetNumber').value;        
    var businessPostalCode      = cmp.lookupReference('businessPostalCode').value;  
    var businessCountry         = cmp.lookupReference('businessCountry').value;
    var applicantOwnerPartner   = cmp.lookupReference('applicantOwnerPartner').value;       
    var applicantPerStreetNo    = cmp.lookupReference('applicantPerStreetNo').value;        
    var applicantPerStreetName  = cmp.lookupReference('applicantPerStreetName').value;  


    var acquisitionApplicantDetails = {

        idSupplementAndReferKey: idSupplementAndReferKey ? idSupplementAndReferKey : null,
        idAcquisitionApplicantKey: idAcquisitionApplicantKey ? idAcquisitionApplicantKey : null,
        creditCardId: creditCardId ? creditCardId : null,
        applicantTId: applicantTId ? applicantTId : null,
        applicantCustomerType: applicantCustomerType ? applicantCustomerType : null,
        applicantAccountNumber: applicantAccountNumber ? applicantAccountNumber : null,
        applicantNidNumber: applicantNidNumber ? applicantNidNumber : null,
        applicantBpNumber: applicantBpNumber ? applicantBpNumber : null,
        applicantApplyingFor: applyingFor ? applyingFor : null,
        applicantTypeOfCard: applicantTypeOfCard ? applicantTypeOfCard : null,
        applicantName: applicantName ? applicantName : null,
        applicantGenderNeutralTitle: applicantGenderNeutralTitle ? applicantGenderNeutralTitle : null,
        applicantNameOnCard: applicantNameOnCard ? applicantNameOnCard : null,
        applicantNameInBangla: applicantNameInBangla ? applicantNameInBangla : null,
        applicantNationality: applicantNationality ? applicantNationality : null,
        applicantSpecifyNationality: applicantSpecifyNationality ? applicantSpecifyNationality : null,
        applicantProfession: applicantProfession ? applicantProfession : null,
        applicantDateOfBirth: applicantDateOfBirth ? applicantDateOfBirth : null,
        applicantEtinNumber: applicantEtinNumber ? applicantEtinNumber : null,
        applicantGender: applicantGender ? applicantGender : null,
        applicantMobileNo: applicantMobileNo ? applicantMobileNo : null,
        applicantOtherPhotoID: applicantOtherPhotoID ? applicantOtherPhotoID : null,
        applicantPassportNo: applicantPassportNo ? applicantPassportNo : null,
        applicantIdIssueCountry: applicantIdIssueCountry ? applicantIdIssueCountry : null,
        applicantIdIssueDate: applicantIdIssueDate ? applicantIdIssueDate : null,
        applicantIdIssueDateExp: applicantIdIssueDateExp ? applicantIdIssueDateExp : null,
        applicantFatherName: applicantFatherName ? applicantFatherName : null,
        applicantMotherName: applicantMotherName ? applicantMotherName : null,
        applicantSpouseName: applicantSpouseName ? applicantSpouseName : null,
        applicantSpouseMobileNo: applicantSpouseMobileNo ? applicantSpouseMobileNo : null,
        applicantMaritalStatus: applicantMaritalStatus ? applicantMaritalStatus : null,
        applicantMaritalStatusOthers: applicantMaritalStatusOthers ? applicantMaritalStatusOthers : null,
        applicantNoOfDependents: applicantNoOfDependents ? applicantNoOfDependents : null,
        applicantHighestEducation: applicantHighestEducation ? applicantHighestEducation : null,
        applicantHighestEducationOthers: applicantHighestEducationOthers ? applicantHighestEducationOthers : null,
        applicantResStatus: applicantResStatus ? applicantResStatus : null,
        applicantResiAddress: applicantResiAddress ? applicantResiAddress : null,
        applicantResiNearLandmark: applicantResiNearLandmark ? applicantResiNearLandmark : null,
        applicantResiAddressPS: applicantResiAddressPS ? applicantResiAddressPS : null,
        applicantResiAddressPostCode: applicantResiAddressPostCode ? applicantResiAddressPostCode : null,
        applicantResiAddressDistrict: applicantResiAddressDistrict ? applicantResiAddressDistrict : null,
        applicantResiAddressCountry: applicantResiAddressCountry ? applicantResiAddressCountry : null,
        applicantPerAddress: applicantPerAddress ? applicantPerAddress : null,
        applicantPerAddressNearLand: applicantPerAddressNearLand ? applicantPerAddressNearLand : null,
        applicantPerAddressPS: applicantPerAddressPS ? applicantPerAddressPS : null,
        applicantPerAddressPostCode: applicantPerAddressPostCode ? applicantPerAddressPostCode : null,
        applicantPerAddressDistrict: applicantPerAddressDistrict ? applicantPerAddressDistrict : null,
        applicantPerAddressCountry: applicantPerAddressCountry ? applicantPerAddressCountry : null,
        applicantOccupation: applicantOccupation ? applicantOccupation : null,
        applicantIdType           : applicantIdType                 ?   applicantIdType:null,         
        applicantCompanyName: applicantCompanyName ? applicantCompanyName : null,
        applicantDesignation: applicantDesignation ? applicantDesignation : null,
        applicantDepartment: applicantDepartment ? applicantDepartment : null,
        applicantNatureOfBusiness: applicantNatureOfBusiness ? applicantNatureOfBusiness : null,
        applicantEmployeeID: applicantEmployeeID ? applicantEmployeeID : null,
        applicantOfficeAddress: applicantOfficeAddress ? applicantOfficeAddress : null,
        applicantOfficeAddressPS: applicantOfficeAddressPS ? applicantOfficeAddressPS : null,
        applicantOfficeAddressPostCode: applicantOfficeAddressPostCode ? applicantOfficeAddressPostCode : null,
        applicantOfficeAddressDistrict: applicantOfficeAddressDistrict ? applicantOfficeAddressDistrict : null,
        applicantOfficeAddressCountry: applicantOfficeAddressCountry ? applicantOfficeAddressCountry : null,
        applicantEmployeeStatus: applicantEmployeeStatus ? applicantEmployeeStatus : null,
        applicantBusinessEstablished: applicantBusinessEstablished ? applicantBusinessEstablished : null,
        applicantDurInCurrentJobYear: applicantDurInCurrentJobYear ? applicantDurInCurrentJobYear : null,
        applicantDurInCurrentJobMonth: applicantDurInCurrentJobMonth ? applicantDurInCurrentJobMonth : null,
        applicantTotalWorkExpYear: applicantTotalWorkExpYear ? applicantTotalWorkExpYear : null,
        applicantTotalWorkExpMonth: applicantTotalWorkExpMonth ? applicantTotalWorkExpMonth : null,
        applicantOfficePhoneNo: applicantOfficePhoneNo ? applicantOfficePhoneNo : null,
        applicantMobileNo: applicantMobileNo ? applicantMobileNo : null,
        applicantMailingComAddress: applicantMailingComAddress ? applicantMailingComAddress : null,
        applicantCardReceivingWayName: applicantCardReceivingWayName ? applicantCardReceivingWayName : null,
        applicantCardReceivingWay: applicantCardReceivingWay ? applicantCardReceivingWay : null,
        applicantMonthlyStatementsSentWay: applicantMonthlyStatementsSentWay ? applicantMonthlyStatementsSentWay : null,
        applicantPromActivitPurposeId: applicantPromActivitPurposeId ? applicantPromActivitPurposeId : null,
        applicantAdditionalIncome: applicantAdditionalIncome ? applicantAdditionalIncome : null,
        applicantSpouseIncome: applicantSpouseIncome ? applicantSpouseIncome : null,
        salariedMonthGrossSalary: salariedMonthGrossSalary ? salariedMonthGrossSalary : null,
        salariedMonthTotalDeduction: salariedMonthTotalDeduction ? salariedMonthTotalDeduction : null,
        salariedMonthNetIncome: salariedMonthNetIncome ? salariedMonthNetIncome : null,
        nonSalariedMonthGrossSalary: nonSalariedMonthGrossSalary ? nonSalariedMonthGrossSalary : null,
        nonSalariedMonthTotalExpense: nonSalariedMonthTotalExpense ? nonSalariedMonthTotalExpense : null,
        nonSalariedMonthNetIncome: nonSalariedMonthNetIncome ? nonSalariedMonthNetIncome : null,
        demandPromissoryTaka: demandPromissoryTaka ? demandPromissoryTaka : null,
        demandPromissoryDate: demandPromissoryDate ? demandPromissoryDate : null,
        demandPromissoryPlace: demandPromissoryPlace ? demandPromissoryPlace : null,
        demandPromissoryMessage: demandPromissoryMessage ? demandPromissoryMessage : null,
        demandPromissorySecondTaka: demandPromissorySecondTaka ? demandPromissorySecondTaka : null,
        demandPromissoryRate: demandPromissoryRate ? demandPromissoryRate : null,
        bankBranchname: bankBranchname ? bankBranchname : null,
        bankSolID: bankSolID ? bankSolID : null,
        bankGeoLocationCheck1: bankGeoLocationCheck1 ? bankGeoLocationCheck1 : null,
        bankGeoLocationText1: bankGeoLocationText1 ? bankGeoLocationText1 : null,
        bankGeoLocationText2: bankGeoLocationText2 ? bankGeoLocationText2 : null,
        bankGeoLocationCheck2: bankGeoLocationCheck2 ? bankGeoLocationCheck2 : null,
        sourceComments                      : sourceComments                            ?   sourceComments:null,            
        applicantPostalCode: applicantPostalCode ? applicantPostalCode : null,
        applicantAddress: applicantAddress ? applicantAddress : null,
        applicantDistrict: applicantDistrict ? applicantDistrict : null,
        // applicantStreetName: applicantStreetName ? applicantStreetName : null,
        // applicantStreetNo: applicantStreetNo ? applicantStreetNo : null,
        // applicantPostCode: applicantPostCode ? applicantPostCode : null,
        applicantDistrictOfBirth: applicantDistrictOfBirth ? applicantDistrictOfBirth : null,
        applicantCountryOfBirth: applicantCountryOfBirth ? applicantCountryOfBirth : null,
        applicantIdNo: applicantIdNo ? applicantIdNo : null,
        otherBankLiabilityPosition: otherBankLiabilityPosition ? otherBankLiabilityPosition : null,
        otherBankAccDetails: otherBankAccDetails ? otherBankAccDetails : null,
        applicantOtherId                      : applicantOtherId                            ?   applicantOtherId:null,            
        fiSubjectCode                         : fiSubjectCode                              ?   fiSubjectCode:null,         
        cibSubjectCode                         : cibSubjectCode                              ?   cibSubjectCode:null,
        bankName: bankName ? bankName : null,
        tradeName: tradeName ? tradeName : null,
        fiCode: fiCode ? fiCode : null,
        branchCode: branchCode ? branchCode : null,
        typeOfFinancing: typeOfFinancing ? typeOfFinancing : null,
        totalRequestedAmountOrCreditLmt: totalRequestedAmountOrCreditLmt ? totalRequestedAmountOrCreditLmt : null,
        installmentContractDate: installmentContractDate ? installmentContractDate : null,
        installmentAmount: installmentAmount ? installmentAmount : null,
        numOfInstallment: numOfInstallment ? numOfInstallment : null,
        paymentPeriodicity: paymentPeriodicity ? paymentPeriodicity : null,
        sectorType: sectorType ? sectorType : null,
        sectorCode: sectorCode ? sectorCode : null,
        applicantUsdAccountPortion              : applicantUsdAccountPortion                    ?   applicantUsdAccountPortion:null,            
        // applicantSignature                  : applicantSignature                        ?   applicantSignature:null,            
        // authorizedOfficerSealAndSignaure    : authorizedOfficerSealAndSignaure          ?   authorizedOfficerSealAndSignaure:null,          
        applicantPresentaddressStreetName: applicantPresentaddressStreetName ? applicantPresentaddressStreetName : null,
        applicantPresentaddressStreetNumber: applicantPresentaddressStreetNumber ? applicantPresentaddressStreetNumber : null,
        cifNo: cifNo ? cifNo : null,
        fundSource: fundSource ? fundSource : null,
        monthlyincome: monthlyincome ? monthlyincome : null,
        spouseEmploymentStatus: spouseEmploymentStatus ? spouseEmploymentStatus : null,
        membershipOfClub: membershipOfClub ? membershipOfClub : null,
        specifyClubName: specifyClubName ? specifyClubName : null,
        youAreVerifiedCustomer: youAreVerifiedCustomer ? youAreVerifiedCustomer : null,
        houseRentRange: houseRentRange ? houseRentRange : null,
        haveCustomerOwnCar: haveCustomerOwnCar ? haveCustomerOwnCar : null,
        carBrandName: carBrandName ? carBrandName : null,
        travelYearlyNumber: travelYearlyNumber ? travelYearlyNumber : null,
        passportNumberIndentity: passportNumberIndentity ? passportNumberIndentity : null,
        nidIndetity: nidIndetity ? nidIndetity : null,
        eTinIdIdentity: eTinIdIdentity ? eTinIdIdentity : null,
        passportNumberObtained: passportNumberObtained ? passportNumberObtained : null,
        passportNumberVerified: passportNumberVerified ? passportNumberVerified : null,
        nidIndetityObtained: nidIndetityObtained ? nidIndetityObtained : null,
        nidIndetityVerified: nidIndetityVerified ? nidIndetityVerified : null,
        eTinIdIdentityObtained: eTinIdIdentityObtained ? eTinIdIdentityObtained : null,
        eTinIdIdentityVerified: eTinIdIdentityVerified ? eTinIdIdentityVerified : null,
        politicallyExposedPerson: politicallyExposedPerson ? politicallyExposedPerson : null,
        youAreSeniorManagment: youAreSeniorManagment ? youAreSeniorManagment : null,
        youAreFaceToFaceInterview: youAreFaceToFaceInterview ? youAreFaceToFaceInterview : null,
        youAreTerroristActivities: youAreTerroristActivities ? youAreTerroristActivities : null,
        youAreTerroristActivitieRegard: youAreTerroristActivitieRegard ? youAreTerroristActivitieRegard : null,
        exceptionDetails: exceptionDetails ? exceptionDetails : null,
        applicantAskingLimit: applicantAskingLimit ? applicantAskingLimit : null,
        applicantRecommendedLimit: applicantRecommendedLimit ? applicantRecommendedLimit : null,
        // interviewedSourceSign: interviewedSourceSign ? interviewedSourceSign : null,
        // managerOrUnitHeadSign: managerOrUnitHeadSign ? managerOrUnitHeadSign : null,
        youAreCbblAccountHolder: youAreCbblAccountHolder ? youAreCbblAccountHolder : null,
        autoPayInstruction: autoPayInstruction ? autoPayInstruction : null,
        paymentTypeOfStandingInstruction   : paymentTypeOfStandingInstruction ?   paymentTypeOfStandingInstruction:null, 
        paymentTypeOfStandingInstruction1  : paymentTypeOfStandingInstruction1 ?   paymentTypeOfStandingInstruction1:null, 
        businessAddress                    : businessAddress                    ? businessAddress                   : null,            
        businessDistrict                   : businessDistrict                   ? businessDistrict                  : null,                    
        businessStreetName                 : businessStreetName                 ? businessStreetName                : null,                        
        businessStreetNumber               : businessStreetNumber               ? businessStreetNumber              : null,                                
        businessPostalCode                 : businessPostalCode                 ? businessPostalCode                : null,                        
        businessCountry                    : businessCountry                    ? businessCountry                   : null,            
        applicantOwnerPartner              : applicantOwnerPartner              ? applicantOwnerPartner             : null,                                
        applicantPerStreetNo               : applicantPerStreetNo               ? applicantPerStreetNo              : null,                                
        applicantPerStreetName             : applicantPerStreetName             ? applicantPerStreetName            : null,                                    
        userModKey: loginUser.id,
    };
    return acquisitionApplicantDetails;
}

function getReferAndSupplementData(cmp, action) {

    var idSupplementAndReferKey = cmp.lookupReference('hiddenSupplymentReferKey').value;
    var suppApplicantName = cmp.lookupReference('suppApplicantName').value;
    var relationPrincipalApplicant = cmp.lookupReference('relationPrincipalApplicant').value;
    var relationPrincipalApplicantChecked = cmp.lookupReference('relationPrincipalApplicant').getChecked();
    if (relationPrincipalApplicantChecked.length == 1) {
        if (relationPrincipalApplicantChecked[0].inputValue == 0) {
            relationPrincipalApplicant = "Spouse";
        } else if (relationPrincipalApplicantChecked[0].inputValue == 1) {
            relationPrincipalApplicant = "Parents";
        } else if (relationPrincipalApplicantChecked[0].inputValue == 2) {
            relationPrincipalApplicant = "Brother/Sister";
        } else if (relationPrincipalApplicantChecked[0].inputValue == 3) {
            relationPrincipalApplicant = "Child";
        } else if (relationPrincipalApplicantChecked[0].inputValue == 4) {
            relationPrincipalApplicant = "Other";
        }
    }
    var relationPrincipalApplicantOthers = cmp.lookupReference('relationPrincipalApplicantOthers').value;
    // var suppApplicantGender = cmp.lookupReference('suppApplicantGender').value;
    var suppApplicantGender;
    var suppApplicantGenderChecked = cmp.lookupReference('suppApplicantGender').getChecked();

    if (suppApplicantGenderChecked.length == 1) {
        if (suppApplicantGenderChecked[0].inputValue == 0) {
            suppApplicantGender = "Male";
        } else if (suppApplicantGenderChecked[0].inputValue == 1) {
            suppApplicantGender = "Female";
        }
    }
    var suppApplicantDateOfBirth = Ext.Date.format(cmp.lookupReference('suppApplicantDateOfBirth').value, 'Ymd');
    //var suppApplicantOccupation = cmp.lookupReference('suppApplicantOccupation').value;
    var suppApplicantOccupation;
    var suppApplicantOccupationChecked = cmp.lookupReference('suppApplicantOccupation').getChecked();
    if (suppApplicantOccupationChecked.length == 1) {
        if (suppApplicantOccupationChecked[0].inputValue == 0) {
            suppApplicantOccupation = "Service";
        } else if (suppApplicantOccupationChecked[0].inputValue == 1) {
            suppApplicantOccupation = "Business";
        } else if (suppApplicantOccupationChecked[0].inputValue == 2) {
            suppApplicantOccupation = "Self Employed";
        } else if (suppApplicantOccupationChecked[0].inputValue == 3) {
            suppApplicantOccupation = "Others";
        }
    }
    var suppApplicantFatherName = cmp.lookupReference('suppApplicantFatherName').value;
    var suppApplicantMotherName = cmp.lookupReference('suppApplicantMotherName').value;
    var suppApplicantSpouseName = cmp.lookupReference('suppApplicantSpouseName').value;
    var suppApplicantPresentAddress = cmp.lookupReference('suppApplicantPresentAddress').value;
    var  suppApplicantPerAddress    = cmp.lookupReference('suppApplicantPerAddress').value;                                                 
    var suppApplicantMobile = cmp.lookupReference('suppApplicantMobile').value;
    var suppApplicantEmail = cmp.lookupReference('suppApplicantEmail').value;
    var suppApplicantNid = cmp.lookupReference('suppApplicantNid').value;
    var suppApplicantPassport = cmp.lookupReference('suppApplicantPassport').value;
    var suppApplicantDateOfExp = Ext.Date.format(cmp.lookupReference('suppApplicantDateOfExp').value, 'Ymd');
    // var suppYouAreSetupLimitCard = cmp.lookupReference('suppYouAreSetupLimitCard').value;
    var suppYouAreSetupLimitCard;
    var suppYouAreSetupLimitCardChecked = cmp.lookupReference('suppYouAreSetupLimitCard').getChecked();
    if (suppYouAreSetupLimitCardChecked.length == 1) {
        if (suppYouAreSetupLimitCardChecked[0].inputValue == 0) {
            suppYouAreSetupLimitCard = "Yes";
        } else if (suppYouAreSetupLimitCardChecked[0].inputValue == 1) {
            suppYouAreSetupLimitCard = "No";
        }
    }
    var suppSetUpLimitBDAmount = cmp.lookupReference('suppSetUpLimitBDAmount').value;
    var suppSetUpLimitPercent = cmp.lookupReference('suppSetUpLimitPercent').value;
    var suppSetUpLimitUSDAmount = cmp.lookupReference('suppSetUpLimitUSDAmount').value;
    var refName = cmp.lookupReference('refName').value;
    var refRelationWithApplicant = cmp.lookupReference('refRelationWithApplicant').value;
    var refProfession = cmp.lookupReference('refProfession').value;
    var refProfession;
    var refProfessionChecked = cmp.lookupReference('refProfession').getChecked();
    if (refProfessionChecked.length == 1) {
        if (refProfessionChecked[0].inputValue == 1) {
            refProfession = "Service";
        } else if (refProfessionChecked[0].inputValue == 2) {
            refProfession = "Self Employed";
        } else if (refProfessionChecked[0].inputValue == 3) {
            refProfession = "Business";
        } else if (refProfessionChecked[0].inputValue == 4) {
            refProfession = "Other";
        }
    }
    var refOrgName = cmp.lookupReference('refOrgName').value;
    var refDesignation = cmp.lookupReference('refDesignation').value;
    var refWorkOrResidenceAddress = cmp.lookupReference('refWorkOrResidenceAddress').value;
    var refTelephone = cmp.lookupReference('refTelephone').value;
    var refMobile = cmp.lookupReference('refMobile').value;
    var refEmail = cmp.lookupReference('refEmail').value;

    var referAndSupplement = {
        idSupplementAndReferKey: idSupplementAndReferKey ? idSupplementAndReferKey : null,
        suppApplicantName: suppApplicantName ? suppApplicantName : null,
        relationPrincipalApplicant: relationPrincipalApplicant ? relationPrincipalApplicant : null,
        relationPrincipalApplicantOthers: relationPrincipalApplicantOthers ? relationPrincipalApplicantOthers : null,
        suppApplicantGender: suppApplicantGender ? suppApplicantGender : null,
        suppApplicantDateOfBirth: suppApplicantDateOfBirth ? suppApplicantDateOfBirth : null,
        suppApplicantOccupation: suppApplicantOccupation ? suppApplicantOccupation : null,
        suppApplicantFatherName: suppApplicantFatherName ? suppApplicantFatherName : null,
        suppApplicantMotherName: suppApplicantMotherName ? suppApplicantMotherName : null,
        suppApplicantSpouseName: suppApplicantSpouseName ? suppApplicantSpouseName : null,
        suppApplicantPresentAddress: suppApplicantPresentAddress ? suppApplicantPresentAddress : null,
        suppApplicantPerAddress             : suppApplicantPerAddress               ?   suppApplicantPerAddress:null,                   
        suppApplicantMobile: suppApplicantMobile ? suppApplicantMobile : null,
        suppApplicantEmail: suppApplicantEmail ? suppApplicantEmail : null,
        suppApplicantNid: suppApplicantNid ? suppApplicantNid : null,
        suppApplicantPassport: suppApplicantPassport ? suppApplicantPassport : null,
        suppApplicantDateOfExp: suppApplicantDateOfExp ? suppApplicantDateOfExp : null,
        suppYouAreSetupLimitCard: suppYouAreSetupLimitCard ? suppYouAreSetupLimitCard : null,
        suppSetUpLimitBDAmount: suppSetUpLimitBDAmount ? suppSetUpLimitBDAmount : null,
        suppSetUpLimitPercent: suppSetUpLimitPercent ? suppSetUpLimitPercent : null,
        suppSetUpLimitUSDAmount: suppSetUpLimitUSDAmount ? suppSetUpLimitUSDAmount : null,
        refName: refName ? refName : null,
        refRelationWithApplicant: refRelationWithApplicant ? refRelationWithApplicant : null,
        refProfession: refProfession ? refProfession : null,
        refOrgName: refOrgName ? refOrgName : null,
        refDesignation: refDesignation ? refDesignation : null,
        refWorkOrResidenceAddress: refWorkOrResidenceAddress ? refWorkOrResidenceAddress : null,
        refTelephone: refTelephone ? refTelephone : null,
        refMobile: refMobile ? refMobile : null,
        refEmail: refEmail ? refEmail : null,
        userModKey: loginUser.id,
    };
    return referAndSupplement;
}

function getAcquisitionDetailsConfigData(cmp, action) {

    var organizationName = cmp.lookupReference('organizationName').value;
    var designation = cmp.lookupReference('designation').value;
    var serviceLength = cmp.lookupReference('serviceLength').value;
    // var otherBankLiabilityPosition = cmp.lookupReference('otherBankLiabilityPosition').value;
    
    var loanType = cmp.lookupReference('loanType').value;
    var FinancialInstitutionName = cmp.lookupReference('FinancialInstitutionName').value;
    var loanACnoOrCardNo = cmp.lookupReference('loanACnoOrCardNo').value;
    var sanctionLmit = cmp.lookupReference('sanctionLmit').value;
    var validity = cmp.lookupReference('validity').value;
    var presentOutstanding = cmp.lookupReference('presentOutstanding').value;
    var emi = cmp.lookupReference('emi').value;
    // var otherBankAccDetails = cmp.lookupReference('otherBankAccDetails').value;
    
    var accountTitle = cmp.lookupReference('accountTitle').value;
    var branchName = cmp.lookupReference('branchName').value;
    var accountNo = cmp.lookupReference('accountNo').value;
    var securityType = cmp.lookupReference('securityType').value;
    var beneficiary = cmp.lookupReference('beneficiary').value;
    var rate = cmp.lookupReference('rate').value;
    var aCInstrumentNo = cmp.lookupReference('aCInstrumentNo').value;
    var bankName = cmp.lookupReference('bankName').value;
    var issueDate = Ext.Date.format(cmp.lookupReference('issueDate').value, 'Ymd');
    var faceValue = cmp.lookupReference('faceValue').value;
    var presentValue = cmp.lookupReference('presentValue').value;
    var companyName = cmp.lookupReference('companyName').value;
    var mainAddress = cmp.lookupReference('mainAddress').value;
    var additionalAddress = cmp.lookupReference('additionalAddress').value;
    var availingAnyLoanThisCompany = cmp.lookupReference('availingAnyLoanThisCompany').value;
    var nameOfCompanyBank = cmp.lookupReference('nameOfCompanyBank').value;
    var branchOfCompanyBank = cmp.lookupReference('branchOfCompanyBank').value;
    var objectType = cmp.lookupReference('objectType').value;
    var inputedBy = cmp.lookupReference('inputedBy').value;
    var group = cmp.lookupReference('group').value;
    var subGroup = cmp.lookupReference('subGroup').value;

    var acquisitionDetailsConfig = [{
        organizationName: organizationName ? organizationName : null,
        designation: designation ? designation : null,
        serviceLength: serviceLength ? serviceLength : null,
        otherBankLiabilityPosition: otherBankLiabilityPosition ? otherBankLiabilityPosition : null,
        loanType: loanType ? loanType : null,
        FinancialInstitutionName: FinancialInstitutionName ? FinancialInstitutionName : null,
        loanACnoOrCardNo: loanACnoOrCardNo ? loanACnoOrCardNo : null,
        sanctionLmit: sanctionLmit ? sanctionLmit : null,
        validity: validity ? validity : null,
        presentOutstanding: presentOutstanding ? presentOutstanding : null,
        emi: emi ? emi : null,
        accountTitle: accountTitle ? accountTitle : null,
        branchName: branchName ? branchName : null,
        accountNo: accountNo ? accountNo : null,
        securityType: securityType ? securityType : null,
        beneficiary: beneficiary ? beneficiary : null,
        rate: rate ? rate : null,
        aCInstrumentNo: aCInstrumentNo ? aCInstrumentNo : null,
        bankName: bankName ? bankName : null,
        issueDate: issueDate ? issueDate : null,
        faceValue: faceValue ? faceValue : null,
        presentValue: presentValue ? presentValue : null,
        companyName: companyName ? companyName : null,
        mainAddress: mainAddress ? mainAddress : null,
        additionalAddress: additionalAddress ? additionalAddress : null,
        availingAnyLoanThisCompany: availingAnyLoanThisCompany ? availingAnyLoanThisCompany : null,
        nameOfCompanyBank: nameOfCompanyBank ? nameOfCompanyBank : null,
        branchOfCompanyBank: branchOfCompanyBank ? branchOfCompanyBank : null,
        objectType: objectType ? objectType : null,
        inputedBy: inputedBy ? inputedBy : null,
        group: group ? group : null,
        subGroup: subGroup ? subGroup : null,
        userModKey: loginUser.id,
    }];
    return acquisitionDetailsConfig;
}

function setAcquisitionDetailsConfigData(cmp, data) {
    cmp.lookupReference('organizationName').setValue(data.organizationName);
    cmp.lookupReference('designation').setValue(data.designation);
    cmp.lookupReference('serviceLength').setValue(data.serviceLength);
    cmp.lookupReference('loanType').setValue(data.loanType);
    cmp.lookupReference('FinancialInstitutionName').setValue(data.FinancialInstitutionName);
    cmp.lookupReference('loanACnoOrCardNo').setValue(data.loanACnoOrCardNo);
    cmp.lookupReference('sanctionLmit').setValue(data.sanctionLmit);
    cmp.lookupReference('validity').setValue(data.validity);
    cmp.lookupReference('presentOutstanding').setValue(data.presentOutstanding);
    cmp.lookupReference('emi').setValue(data.emi);
    // cmp.lookupReference('otherBankAccDetails').setValue(data.otherBankAccDetails);
    cmp.lookupReference('accountTitle').setValue(data.accountTitle);
    cmp.lookupReference('branchName').setValue(data.branchName);
    cmp.lookupReference('accountNo').setValue(data.accountNo);
    cmp.lookupReference('securityType').setValue(data.securityType);
    cmp.lookupReference('beneficiary').setValue(data.beneficiary);
    cmp.lookupReference('rate').setValue(data.rate);
    cmp.lookupReference('aCInstrumentNo').setValue(data.aCInstrumentNo);
    cmp.lookupReference('bankName').setValue(data.bankName);
    if (data.issueDate) cmp.lookupReference('issueDate').setValue(data.issueDate ? new Date(data.issueDate.substr(0, 10)) : null);
    cmp.lookupReference('faceValue').setValue(data.faceValue);
    cmp.lookupReference('presentValue').setValue(data.presentValue);
    cmp.lookupReference('companyName').setValue(data.companyName);
    cmp.lookupReference('mainAddress').setValue(data.mainAddress);
    cmp.lookupReference('additionalAddress').setValue(data.additionalAddress);
    cmp.lookupReference('availingAnyLoanThisCompany').setValue(data.availingAnyLoanThisCompany);
    cmp.lookupReference('nameOfCompanyBank').setValue(data.nameOfCompanyBank);
    cmp.lookupReference('branchOfCompanyBank').setValue(data.branchOfCompanyBank);
    cmp.lookupReference('objectType').setValue(data.objectType);
    cmp.lookupReference('inputedBy').setValue(data.inputedBy);
    cmp.lookupReference('group').setValue(data.group);
    cmp.lookupReference('subGroup').setValue(data.subGroup);
}

function setReferAndSupplementData(cmp, data) {
    cmp.lookupReference('suppApplicantName').setValue(data.suppApplicantName);
    // cmp.lookupReference('relationPrincipalApplicant').setValue(data.relationPrincipalApplicant);
    if (data.relationPrincipalApplicant == "Spouse") {
        cmp.lookupReference('relationPrincipalApplicantSpouse').setValue(true);
    } else if (data.relationPrincipalApplicant == "Parents") {
        cmp.lookupReference('relationPrincipalApplicantParents').setValue(true);
    } else if (data.relationPrincipalApplicant == "Brother/Sister") {
        cmp.lookupReference('relationPrincipalApplicantBroSis').setValue(true);
    } else if (data.relationPrincipalApplicant == "Child") {
        cmp.lookupReference('relationPrincipalApplicantChild').setValue(true);
    } else if (data.relationPrincipalApplicant == "Other") {
        cmp.lookupReference('relationPrincipalApplicantOther').setValue(true);
    }
    cmp.lookupReference('hiddenSupplymentReferKey').setValue(data.idSupplementAndReferKey);
    // cmp.lookupReference('suppApplicantGender').setValue(data.suppApplicantGender);
    if (data.suppApplicantGender == "Male") {
        cmp.lookupReference('suppApplicantGenderMale').setValue(true);
    } else if (data.suppApplicantGender == "Female") {
        cmp.lookupReference('suppApplicantGenderFemale').setValue(true);
    }
    if (data.suppApplicantDateOfBirth) cmp.lookupReference('suppApplicantDateOfBirth').setValue(data.suppApplicantDateOfBirth ? new Date(data.suppApplicantDateOfBirth.substr(0, 10)) : null);     
    cmp.lookupReference('suppApplicantOccupation').setValue(data.suppApplicantOccupation);
    if (data.suppApplicantOccupation == "Service") {
        cmp.lookupReference('suppApplicantOccupationService').setValue(true);
    } else if (data.suppApplicantOccupation == "Business") {
        cmp.lookupReference('suppApplicantOccupationBusiness').setValue(true);
    } else if (data.suppApplicantOccupation == "Self Employed") {
        cmp.lookupReference('suppApplicantOccupationSelfEmployed').setValue(true);
    } else if (data.suppApplicantOccupation == "Others") {
        cmp.lookupReference('suppApplicantOccupationOthers').setValue(true);
    }
    cmp.lookupReference('suppApplicantFatherName').setValue(data.suppApplicantFatherName);
    cmp.lookupReference('suppApplicantMotherName').setValue(data.suppApplicantMotherName);
    cmp.lookupReference('suppApplicantSpouseName').setValue(data.suppApplicantSpouseName);
    cmp.lookupReference('suppApplicantPresentAddress').setValue(data.suppApplicantPresentAddress);
    cmp.lookupReference('suppApplicantPerAddress').setValue(data.suppApplicantPerAddress);
    cmp.lookupReference('suppApplicantMobile').setValue(data.suppApplicantMobile);
    cmp.lookupReference('suppApplicantEmail').setValue(data.suppApplicantEmail);
    cmp.lookupReference('suppApplicantNid').setValue(data.suppApplicantNid);
    cmp.lookupReference('suppApplicantPassport').setValue(data.suppApplicantPassport);
    if (data.suppApplicantDateOfExp) cmp.lookupReference('suppApplicantDateOfExp').setValue(data.suppApplicantDateOfExp ? new Date(data.suppApplicantDateOfExp.substr(0, 10)) : null);
    // cmp.lookupReference('suppYouAreSetupLimitCard').setValue(data.suppYouAreSetupLimitCard);
    if (data.suppYouAreSetupLimitCard == "Yes") {
        cmp.lookupReference('suppYouAreSetupLimitCardYes').setValue(true);
    } else if (data.suppYouAreSetupLimitCard == "No") {
        cmp.lookupReference('suppYouAreSetupLimitCardNo').setValue(true);
    }
    if (data.suppSetUpLimitBDAmount == -2147483648) {
        cmp.lookupReference('suppSetUpLimitBDAmount').setValue(null);
    } else {
        cmp.lookupReference('suppSetUpLimitBDAmount').setValue(data.suppSetUpLimitBDAmount);
    }
    if (data.suppSetUpLimitPercent == -2147483648) {
        cmp.lookupReference('suppSetUpLimitPercent').setValue(null);
    } else {
        cmp.lookupReference('suppSetUpLimitPercent').setValue(data.suppSetUpLimitPercent);
    }
    if (data.suppSetUpLimitUSDAmount == -2147483648) {
        cmp.lookupReference('suppSetUpLimitUSDAmount').setValue(null);
    } else {
        cmp.lookupReference('suppSetUpLimitUSDAmount').setValue(data.suppSetUpLimitUSDAmount);
    }
    cmp.lookupReference('refName').setValue(data.refName);
    cmp.lookupReference('refRelationWithApplicant').setValue(data.refRelationWithApplicant);
    // cmp.lookupReference('refProfession').setValue(data.refProfession);
    if (data.refProfession == "Service") {
        cmp.lookupReference('refProfessionService').setValue(true);
    } else if (data.refProfession == "Self Employed") {
        cmp.lookupReference('refProfessionSelfEmployed').setValue(true);
    } else if (data.refProfession == "Business") {
        cmp.lookupReference('refProfessionBusiness').setValue(true);
    } else if (data.refProfession == "Other") {
        cmp.lookupReference('refProfessionOther').setValue(true);
    }
    cmp.lookupReference('refOrgName').setValue(data.refOrgName);
    cmp.lookupReference('refDesignation').setValue(data.refDesignation);
    cmp.lookupReference('refWorkOrResidenceAddress').setValue(data.refWorkOrResidenceAddress);
    cmp.lookupReference('refTelephone').setValue(data.refTelephone);
    cmp.lookupReference('refMobile').setValue(data.refMobile);
    cmp.lookupReference('refEmail').setValue(data.refEmail);
}

function setAcquisitionApplicantDetails(cmp, data) {

    cmp.lookupReference('hiddentidAcquisitionApplicantKey').setValue(data.idAcquisitionApplicantKey);
    cmp.lookupReference('applicantTId').setValue(data.applicantTId);
    cmp.lookupReference('applicantCustomerType').setValue(data.applicantCustomerType);
    if (data.applicantCustomerType == "New") {
        cmp.lookupReference('newApplicantCustomerType').setValue(true);
    } else if (data.applicantCustomerType == "Existing CBBL A/C") {
        cmp.lookupReference('existingApplicantCustomerType').setValue(true);
    }

    cmp.lookupReference('cibSubjectCode').setValue(data.cibSubjectCode);
    cmp.lookupReference('fiSubjectCode').setValue(data.fiSubjectCode);

    cmp.lookupReference('applicantAccountNumber').setValue(data.applicantAccountNumber);
    cmp.lookupReference('applicantNidNumber').setValue(data.applicantNidNumber);
    cmp.lookupReference('applicantBpNumber').setValue(data.applicantBpNumber);
    if (data.applicantApplyingFor == "CREDIT_CARD") {
        cmp.lookupReference('applicantApplyingForCreditCard').setValue(true);
    } else if (data.applicantApplyingFor == "Prepaid Card") {
        cmp.lookupReference('applicantApplyingForPrepaidCard').setValue(true);
    } else if (data.applicantApplyingFor == "Others") {
        cmp.lookupReference('applicantApplyingForOthers').setValue(true);
    }
    // cmp.lookupReference('applicantApplyingFor').setValue(data.applicantApplyingFor);
    // cmp.lookupReference('applicantTypeOfCard').setValue(data.applicantTypeOfCard);
    if (data.applicantTypeOfCard ==  "VISA CLASSIC") {
        cmp.lookupReference('applicantTypeOfCardVisaClassic').setValue(true);
    } else if (data.applicantTypeOfCard == "VISA GOLD") {
        cmp.lookupReference('applicantTypeOfCardVisaGold').setValue(true);
    } else if (data.applicantTypeOfCard == "VISA PLATINUM") {
        cmp.lookupReference('applicantTypeOfCardVisaPlatinum').setValue(true);
    } else if (data.applicantTypeOfCard == "VISA SIGNATURE") {
        cmp.lookupReference('applicantTypeOfCardVisaSignature').setValue(true);
    }
    cmp.lookupReference('applicantName').setValue(data.applicantName);
    // cmp.lookupReference('applicantGenderNeutralTitle').setValue(data.applicantGenderNeutralTitle);
    if (data.applicantGenderNeutralTitle == "Mr.") {
        cmp.lookupReference('applicantGenderNeutralTitleMr').setValue(true);
    } else if (data.applicantGenderNeutralTitle == "Ms.") {
        cmp.lookupReference('applicantGenderNeutralTitleMs').setValue(true);
    } else if (data.applicantGenderNeutralTitle == "Mrs.") {
        cmp.lookupReference('applicantGenderNeutralTitleMrs').setValue(true);
    } else if (data.applicantGenderNeutralTitle == "Others") {
        cmp.lookupReference('applicantGenderNeutralTitleOthers').setValue(true);
    }
    // if (data.applicantIdType == "Passport") {
    //     cmp.lookupReference('applicantIdTypePassport').setValue(true);
    //     cmp.lookupReference('aPassport').setValue(true);
    // } else if (data.applicantIdType == "Driving License") {
    //     cmp.lookupReference('applicantIdTypeDrivingLicense').setValue(true);
    //     cmp.lookupReference('aDrivingLicence').setValue(true);
    // } else if (data.applicantIdType == "Birth Registration") {
    //     cmp.lookupReference('applicantIdTypeBirthReg').setValue(true);
    //     cmp.lookupReference('aBirthRegistration').setValue(true);
    // }
    cmp.lookupReference('applicantNameOnCard').setValue(data.applicantNameOnCard);
    cmp.lookupReference('applicantNameInBangla').setValue(data.applicantNameInBangla);
    // cmp.lookupReference('applicantNationality').setValue(data.applicantNationality);
    if (data.applicantNationality == "Bangladeshi") {
        cmp.lookupReference('applicantNationalityBangladeshi').setValue(true);
    } else if (data.applicantNationality == "Others") {
        cmp.lookupReference('applicantNationalityOthers').setValue(true);
    }
    cmp.lookupReference('applicantSpecifyNationality').setValue(data.applicantSpecifyNationality);
    cmp.lookupReference('applicantProfession').setValue(data.applicantProfession);
    if (data.applicantDateOfBirth) cmp.lookupReference('applicantDateOfBirth').setValue(data.applicantDateOfBirth ? new Date(data.applicantDateOfBirth.substr(0, 10)) : null);
    cmp.lookupReference('applicantEtinNumber').setValue(data.applicantEtinNumber);
    // cmp.lookupReference('applicantGender').setValue(data.applicantGender);
    if (data.applicantGender == "Male") {
        cmp.lookupReference('applicantGenderMale').setValue(true);
        cmp.lookupReference('applicantGenderMale1').setValue(true);
        cmp.lookupReference('aMale').setValue(true);
        
    } else if (data.applicantGender == "Female") {
        cmp.lookupReference('applicantGenderFemale').setValue(true);
        cmp.lookupReference('applicantGenderFemale1').setValue(true);
        cmp.lookupReference('aFemale').setValue(true);
        
    } else if (data.applicantGender == "Third Gender") {
        cmp.lookupReference('applicantGenderThirdGender').setValue(true);
    }
    cmp.lookupReference('applicantMobileNo').setValue(data.applicantMobileNo);
    // cmp.lookupReference('applicantOtherPhotoID').setValue(data.applicantOtherPhotoID);
    if (data.applicantOtherPhotoID == "Passport") {
        cmp.lookupReference('applicantOtherPhotoIDPassport').setValue(true);
        cmp.lookupReference('applicantIdTypePassport').setValue(true);
        cmp.lookupReference('aPassport').setValue(true);
    }  
    if (data.applicantOtherPhotoID == "Others" || data.applicantOtherPhotoID == "Driving License" || data.applicantOtherPhotoID == "Birth Registration") {
        cmp.lookupReference('applicantOtherPhotoIDOthers').setValue(true);
    } 
    if (data.applicantOtherPhotoID == "Driving License") {
        cmp.lookupReference('applicantIdTypeDrivingLicense').setValue(true);
        cmp.lookupReference('aDrivingLicence').setValue(true);
    } 
    if (data.applicantOtherPhotoID == "Birth Registration") {
        cmp.lookupReference('aBirthRegistration').setValue(true);
        cmp.lookupReference('applicantIdTypeBirthReg').setValue(true);
    }
    cmp.lookupReference('applicantPassportNo').setValue(data.applicantPassportNo);
    cmp.lookupReference('applicantIdIssueCountry').setValue(data.applicantIdIssueCountry);
    if (data.applicantIdIssueDate) cmp.lookupReference('applicantIdIssueDate').setValue(data.applicantIdIssueDate ? new Date(data.applicantIdIssueDate.substr(0, 10)) : null);
    if (data.applicantIdIssueDateExp) cmp.lookupReference('applicantIdIssueDateExp').setValue(data.applicantIdIssueDateExp ? new Date(data.applicantIdIssueDateExp.substr(0, 10)) : null);
    cmp.lookupReference('applicantFatherName').setValue(data.applicantFatherName);
    cmp.lookupReference('applicantMotherName').setValue(data.applicantMotherName);
    cmp.lookupReference('applicantSpouseName').setValue(data.applicantSpouseName);
    cmp.lookupReference('applicantSpouseMobileNo').setValue(data.applicantSpouseMobileNo);
    // cmp.lookupReference('applicantMaritalStatus').setValue(data.applicantMaritalStatus);
    if (data.applicantMaritalStatus == "Single") {
        cmp.lookupReference('applicantMaritalStatusSingle').setValue(true);
    } else if (data.applicantMaritalStatus == "Married") {
        cmp.lookupReference('applicantMaritalStatusMarried').setValue(true);
    }
    cmp.lookupReference('applicantMaritalStatusOthers').setValue(data.applicantMaritalStatusOthers);
    cmp.lookupReference('applicantNoOfDependents').setValue(data.applicantNoOfDependents);
    // cmp.lookupReference('applicantHighestEducation').setValue(data.applicantHighestEducation);
    if (data.applicantHighestEducation == "SSC") {
        cmp.lookupReference('applicantHighestEducationSSC').setValue(true);
    } else if (data.applicantHighestEducation == "HSC") {
        cmp.lookupReference('applicantHighestEducationHSC').setValue(true);
    } else if (data.applicantHighestEducation == "Graduate") {
        cmp.lookupReference('applicantHighestEducationGraduate').setValue(true);
    } else if (data.applicantHighestEducation == "Post Graduate") {
        cmp.lookupReference('applicantHighestEducationPostGraduate').setValue(true);
    } else if (data.applicantHighestEducation == "Others") {
        cmp.lookupReference('applicantHighestEducationOthers').setValue(true);
    }
    cmp.lookupReference('applicantHighestEducationOthers').setValue(data.applicantHighestEducationOthers);
    // cmp.lookupReference('applicantResStatus').setValue(data.applicantResStatus);
    if (data.applicantResStatus == "Owned") {
        cmp.lookupReference('applicantResStatusOwned').setValue(true);
    } else if (data.applicantResStatus == "Family Owned") {
        cmp.lookupReference('applicantResStatusFamilyOwned').setValue(true);
    } else if (data.applicantResStatus == "Rented") {
        cmp.lookupReference('applicantResStatusRented').setValue(true);
    } else if (data.applicantResStatus == "ompany Provided") {
        cmp.lookupReference('applicantResStatusCompanyProvided').setValue(true);
    } else if (data.applicantResStatus == "Others") {
        cmp.lookupReference('applicantResStatusOthers').setValue(true);
    }
    cmp.lookupReference('applicantResiAddress').setValue(data.applicantResiAddress);
    cmp.lookupReference('applicantResiNearLandmark').setValue(data.applicantResiNearLandmark);
    cmp.lookupReference('applicantResiAddressPS').setValue(data.applicantResiAddressPS);
    cmp.lookupReference('applicantResiAddressPostCode').setValue(data.applicantResiAddressPostCode);
    cmp.lookupReference('applicantResiAddressDistrict').setValue(data.applicantResiAddressDistrict);
    cmp.lookupReference('applicantResiAddressCountry').setValue(data.applicantResiAddressCountry);
    cmp.lookupReference('applicantPerAddress').setValue(data.applicantPerAddress);
    cmp.lookupReference('applicantPerAddressNearLand').setValue(data.applicantPerAddressNearLand);
    cmp.lookupReference('applicantPerAddressPS').setValue(data.applicantPerAddressPS);
    cmp.lookupReference('applicantPerAddressPostCode').setValue(data.applicantPerAddressPostCode);
    cmp.lookupReference('applicantPerAddressDistrict').setValue(data.applicantPerAddressDistrict);
    cmp.lookupReference('applicantPerAddressCountry').setValue(data.applicantPerAddressCountry);
    // cmp.lookupReference('applicantOccupation').setValue(data.applicantOccupation);
    if (data.applicantOccupation == "Service Holder") {
        cmp.lookupReference('serviceHolder').setValue(true);
    } else if (data.applicantOccupation == "Businessman") {
        cmp.lookupReference('businessman').setValue(true);
    } else if (data.applicantOccupation == "Salaried") {
        cmp.lookupReference('salaried').setValue(true);
    } else if (data.applicantOccupation == "ompany Provided") {
        cmp.lookupReference('companyProvided').setValue(true);
    } else if (data.applicantOccupation == "Others") {
        cmp.lookupReference('othersYouAre').setValue(true);
    }

    // cmp.lookupReference('applicantOccupationOthers').setValue(data.applicantOccupationOthers);
    cmp.lookupReference('applicantCompanyName').setValue(data.applicantCompanyName);
    cmp.lookupReference('applicantDesignation').setValue(data.applicantDesignation);
    cmp.lookupReference('applicantDepartment').setValue(data.applicantDepartment);
    cmp.lookupReference('applicantNatureOfBusiness').setValue(data.applicantNatureOfBusiness);
    // cmp.lookupReference('applicantEmployeeID').setValue(data.applicantEmployeeID);
    cmp.lookupReference('applicantOfficeAddress').setValue(data.applicantOfficeAddress);
    cmp.lookupReference('applicantOfficeAddressPS').setValue(data.applicantOfficeAddressPS);
    cmp.lookupReference('applicantOfficeAddressPostCode').setValue(data.applicantOfficeAddressPostCode);
    cmp.lookupReference('applicantOfficeAddressDistrict').setValue(data.applicantOfficeAddressDistrict);
    cmp.lookupReference('applicantOfficeAddressCountry').setValue(data.applicantOfficeAddressCountry);
    cmp.lookupReference('applicantOtherId').setValue(data.applicantOtherId);
    if (data.applicantEmployeeStatus == "Permanent") {
        cmp.lookupReference('applicantEmployeeStatusPermanent').setValue(true);
    } else if (data.applicantEmployeeStatus == "Contractual") {
        cmp.lookupReference('applicantEmployeeStatusContractual').setValue(true);
    }
    cmp.lookupReference('applicantBusinessEstablished').setValue(data.applicantBusinessEstablished);
    cmp.lookupReference('applicantDurInCurrentJobYear').setValue(data.applicantDurInCurrentJobYear);
    cmp.lookupReference('applicantDurInCurrentJobMonth').setValue(data.applicantDurInCurrentJobMonth);
    cmp.lookupReference('applicantTotalWorkExpYear').setValue(data.applicantTotalWorkExpYear);
    cmp.lookupReference('applicantTotalWorkExpMonth').setValue(data.applicantTotalWorkExpMonth);
    cmp.lookupReference('applicantOfficePhoneNo').setValue(data.applicantOfficePhoneNo);
    // cmp.lookupReference('applicantMobileNo').setValue(data.applicantMobileNo);
    // cmp.lookupReference('applicantMailingComAddress').setValue(data.applicantMailingComAddress);
    if (data.applicantMailingComAddress == "Office Address") {
        cmp.lookupReference('applicantMailingComAddressOfficeAddress').setValue(true);
    } else if (data.applicantMailingComAddress == "Residental Address") {
        cmp.lookupReference('applicantMailingComAddressResidentalAddress').setValue(true);
    } else if (data.applicantMailingComAddress == "Permanent Address") {
        cmp.lookupReference('applicantMailingComAddressPermanentAddress').setValue(true);
    }
    cmp.lookupReference('applicantCardReceivingWayName').setValue(data.applicantCardReceivingWayName);
    // cmp.lookupReference('applicantCardReceivingWay').setValue(data.applicantCardReceivingWay);
    if (data.applicantCardReceivingWay == "Communication Address") {
        cmp.lookupReference('applicantCardReceivingWayComAddress').setValue(true);
    } else if (data.applicantCardReceivingWay == "CBBL Branch") {
        cmp.lookupReference('applicantCardReceivingWayCBBLBranch').setValue(true);
    }

    cmp.lookupReference('applicantMonthlyStatementsSentWay').setValue(data.applicantMonthlyStatementsSentWay);
    cmp.lookupReference('applicantPromActivitPurposeId').setValue(data.applicantPromActivitPurposeId);
    if (data.applicantAdditionalIncome == -2147483648) {
        cmp.lookupReference('applicantAdditionalIncome').setValue(null);
    } else {
        cmp.lookupReference('applicantAdditionalIncome').setValue(data.applicantAdditionalIncome);

    }
    if (data.applicantSpouseIncome == -2147483648) {
        cmp.lookupReference('applicantSpouseIncome').setValue(null);
    } else {
        cmp.lookupReference('applicantSpouseIncome').setValue(data.applicantSpouseIncome);
    }

    if (data.salariedMonthGrossSalary == -2147483648) {
        cmp.lookupReference('salariedMonthGrossSalary').setValue(null);
    } else {
        cmp.lookupReference('salariedMonthGrossSalary').setValue(data.salariedMonthGrossSalary);
    }

    if (data.salariedMonthTotalDeduction == -2147483648) {
        cmp.lookupReference('salariedMonthTotalDeduction').setValue(null);
    } else {
        cmp.lookupReference('salariedMonthTotalDeduction').setValue(data.salariedMonthTotalDeduction);
    }

    if (data.salariedMonthNetIncome == -2147483648) {
        cmp.lookupReference('salariedMonthNetIncome').setValue(null);
    } else {
        cmp.lookupReference('salariedMonthNetIncome').setValue(data.salariedMonthNetIncome);
    }

    if (data.nonSalariedMonthGrossSalary == -2147483648) {
        cmp.lookupReference('nonSalariedMonthGrossSalary').setValue(null);
    } else {
        cmp.lookupReference('nonSalariedMonthGrossSalary').setValue(data.nonSalariedMonthGrossSalary);
    }

    if (data.nonSalariedMonthTotalExpense == -2147483648) {
        cmp.lookupReference('nonSalariedMonthTotalExpense').setValue(null);
    } else {
        cmp.lookupReference('nonSalariedMonthTotalExpense').setValue(data.nonSalariedMonthTotalExpense);
    }

    if (data.nonSalariedMonthNetIncome == -2147483648) {
        cmp.lookupReference('nonSalariedMonthNetIncome').setValue(null);
    } else {
        cmp.lookupReference('nonSalariedMonthNetIncome').setValue(data.nonSalariedMonthNetIncome);
    }

    if (data.demandPromissoryTaka == -2147483648) {
        cmp.lookupReference('demandPromissoryTaka').setValue(null);
    } else {
        cmp.lookupReference('demandPromissoryTaka').setValue(data.demandPromissoryTaka);
    }
    if (data.demandPromissoryDate) cmp.lookupReference('demandPromissoryDate').setValue(data.demandPromissoryDate ? new Date(data.demandPromissoryDate.substr(0, 10)) : null);
    cmp.lookupReference('demandPromissoryPlace').setValue(data.demandPromissoryPlace);
    cmp.lookupReference('demandPromissoryMessage').setValue(data.demandPromissoryMessage);
    if (data.demandPromissorySecondTaka == -2147483648) {
        cmp.lookupReference('demandPromissorySecondTaka').setValue(null);
    } else {
        cmp.lookupReference('demandPromissorySecondTaka').setValue(data.demandPromissorySecondTaka);
    }
    cmp.lookupReference('demandPromissoryRate').setValue(data.demandPromissoryRate);
    cmp.lookupReference('bankBranchname').setValue(data.bankBranchname);
    cmp.lookupReference('bankSolID').setValue(data.bankSolID);
    cmp.lookupReference('bankGeoLocationCheck1').setValue(data.bankGeoLocationCheck1);
    cmp.lookupReference('bankGeoLocationText1').setValue(data.bankGeoLocationText1);
    if(data.bankGeoLocationCheck1 == "true"){
        cmp.lookupReference('bankGeoLocationText1').setHidden(false);
    }    
    cmp.lookupReference('bankGeoLocationText2').setValue(data.bankGeoLocationText2);
    cmp.lookupReference('bankGeoLocationCheck2').setValue(data.bankGeoLocationCheck2);
    if(data.bankGeoLocationCheck2 == "true"){
        cmp.lookupReference('bankGeoLocationText2').setHidden(false);
    }
    cmp.lookupReference('sourceComments').setValue(data.sourceComments);
    cmp.lookupReference('applicantPostalCode').setValue(data.applicantPostalCode);
    cmp.lookupReference('applicantAddress').setValue(data.applicantAddress);
    cmp.lookupReference('applicantDistrict').setValue(data.applicantDistrict);
    // cmp.lookupReference('applicantStreetName').setValue(data.applicantStreetName);
    // cmp.lookupReference('applicantStreetNo').setValue(data.applicantStreetNo);
    // cmp.lookupReference('applicantPostCode').setValue(data.applicantPostCode);
    cmp.lookupReference('applicantDistrictOfBirth').setValue(data.applicantDistrictOfBirth);
    cmp.lookupReference('applicantCountryOfBirth').setValue(data.applicantCountryOfBirth);
    // cmp.lookupReference('applicantIdNo').setValue(data.applicantIdNo);
    // cmp.lookupReference('cibSubjectCode').setValue(data.cibSubjectCode);
    // cmp.lookupReference('fiSubjectCode').setValue(data.fiSubjectCode);
    cmp.lookupReference('bankName').setValue(data.bankName);
    cmp.lookupReference('tradeName').setValue(data.tradeName);
    cmp.lookupReference('fiCode').setValue(data.fiCode);
    cmp.lookupReference('branchCode').setValue(data.branchCode);
    cmp.lookupReference('typeOfFinancing').setValue(data.typeOfFinancing);
    if (data.totalRequestedAmountOrCreditLmt == -2147483648) {
        cmp.lookupReference('totalRequestedAmountOrCreditLmt').setValue(null);
    } else {
        cmp.lookupReference('totalRequestedAmountOrCreditLmt').setValue(data.totalRequestedAmountOrCreditLmt);
    }
    if (data.installmentContractDate) cmp.lookupReference('installmentContractDate').setValue(data.installmentContractDate ? new Date(data.installmentContractDate.substr(0, 10)) : null);
    if (data.installmentAmount == -2147483648) {
        cmp.lookupReference('installmentAmount').setValue(null);
    } else {
        cmp.lookupReference('installmentAmount').setValue(data.installmentAmount);
    }
    cmp.lookupReference('numOfInstallment').setValue(data.numOfInstallment);
    cmp.lookupReference('paymentPeriodicity').setValue(data.paymentPeriodicity);
    // cmp.lookupReference('sectorType').setValue(data.sectorType);
    if (data.sectorType == "Public") {
        cmp.lookupReference('sectorTypePublic').setValue(true);
    } else if (data.sectorType == "Private") {
        cmp.lookupReference('sectorTypePrivate').setValue(true);
    }

    cmp.lookupReference('sectorCode').setValue(data.sectorCode);
    // cmp.lookupReference('managerSealAndSignaure').setValue(data.managerSealAndSignaure);
    // cmp.lookupReference('applicantSignature').setValue(data.applicantSignature);
    // cmp.lookupReference('authorizedOfficerSealAndSignaure').setValue(data.authorizedOfficerSealAndSignaure);
    cmp.lookupReference('applicantPresentaddressStreetName').setValue(data.applicantPresentaddressStreetName);
    cmp.lookupReference('applicantPresentaddressStreetNumber').setValue(data.applicantPresentaddressStreetNumber);
    cmp.lookupReference('cifNo').setValue(data.cifNo);
    cmp.lookupReference('fundSource').setValue(data.fundSource);
    if (data.monthlyincome == -2147483648) {
        cmp.lookupReference('monthlyincome').setValue(null);
    } else {
        cmp.lookupReference('monthlyincome').setValue(data.monthlyincome);
    }
    // cmp.lookupReference('spouseEmploymentStatus').setValue(data.spouseEmploymentStatus);
    if (data.spouseEmploymentStatus == "Salaried") {
        cmp.lookupReference('spouseEmploymentStatusSalaried').setValue(true);
    } else if (data.spouseEmploymentStatus == "Self Employed") {
        cmp.lookupReference('spouseEmploymentStatusSelfEmployed').setValue(true);
    } else if (data.spouseEmploymentStatus == "Other") {
        cmp.lookupReference('spouseEmploymentStatusOther').setValue(true);
    }
    // cmp.lookupReference('membershipOfClub').setValue(data.membershipOfClub);
    if (data.membershipOfClub == "Yes") {
        cmp.lookupReference('membershipOfClubYes').setValue(true);
    } else if (data.membershipOfClub == "No") {
        cmp.lookupReference('membershipOfClubNo').setValue(true);
    }
    cmp.lookupReference('specifyClubName').setValue(data.specifyClubName);
    // cmp.lookupReference('youAreVerifiedCustomer').setValue(data.youAreVerifiedCustomer);
    if (data.youAreVerifiedCustomer == "Yes") {
        cmp.lookupReference('youAreVerifiedCustomerYes').setValue(true);
    } else if (data.youAreVerifiedCustomer == "No") {
        cmp.lookupReference('youAreVerifiedCustomerNo').setValue(true);
    }
    if (data.houseRentRange == -2147483648) {
        cmp.lookupReference('houseRentRange').setValue(null);
    } else {
        cmp.lookupReference('houseRentRange').setValue(data.houseRentRange);
    }
    // cmp.lookupReference('haveCustomerOwnCard').setValue(data.haveCustomerOwnCard);
    if (data.haveCustomerOwnCar == "Yes") {
        cmp.lookupReference('haveCustomerOwnCarYes').setValue(true);
    } else if (data.haveCustomerOwnCar == "No") {
        cmp.lookupReference('haveCustomerOwnCarNo').setValue(true);
    }
    cmp.lookupReference('carBrandName').setValue(data.carBrandName);
    // cmp.lookupReference('travelYearlyNumber').setValue(data.travelYearlyNumber);
    if (data.travelYearlyNumber == -2147483648) {
        cmp.lookupReference('travelYearlyNumber').setValue(null);
    } else {
        cmp.lookupReference('travelYearlyNumber').setValue(data.travelYearlyNumber);
    }
    cmp.lookupReference('passportNumberIndentity').setValue(data.passportNumberIndentity);
    cmp.lookupReference('nidIndetity').setValue(data.nidIndetity);
    cmp.lookupReference('eTinIdIdentity').setValue(data.eTinIdIdentity);
    cmp.lookupReference('passportNumberObtained').setValue(data.passportNumberObtained);
    cmp.lookupReference('passportNumberVerified').setValue(data.passportNumberVerified);
    cmp.lookupReference('nidIndetityObtained').setValue(data.nidIndetityObtained);
    cmp.lookupReference('nidIndetityVerified').setValue(data.nidIndetityVerified);
    cmp.lookupReference('eTinIdIdentityObtained').setValue(data.eTinIdIdentityObtained);
    cmp.lookupReference('eTinIdIdentityVerified').setValue(data.eTinIdIdentityVerified);
    cmp.lookupReference('otherBankLiabilityPosition').setValue(data.otherBankLiabilityPosition);
    if (data.otherBankLiabilityPosition == "YES") {
        cmp.lookupReference('otherBankLiabilityPositionYes').setValue(true);
    } else if (data.otherBankLiabilityPosition == "NO") {
        cmp.lookupReference('otherBankLiabilityPositionNo').setValue(true);
    }
    if (data.otherBankAccDetails == "YES") {
        cmp.lookupReference('otherBankAccDetailsYes').setValue(true);
    } else if (data.otherBankAccDetails == "NO") {
        cmp.lookupReference('otherBankAccDetailsNo').setValue(true);
    }
    if (data.paymentTypeOfStandingInstruction == "Full Payment") {
        cmp.lookupReference('fullPayment').setValue(true);
    } else if(data.paymentTypeOfStandingInstruction == "Minimum Payment"){
        cmp.lookupReference('minimumPayment').setValue(true);
    }

    if (data.paymentTypeOfStandingInstruction1 == "Full Payment") {
        cmp.lookupReference('fullPayment1').setValue(true);
    } else if(data.paymentTypeOfStandingInstruction1 == "Minimum Payment"){
        cmp.lookupReference('minimumPayment1').setValue(true);
    }
    // cmp.lookupReference('politicallyExposedPerson').setValue(data.politicallyExposedPerson);
    if (data.politicallyExposedPerson == "Yes") {
        cmp.lookupReference('politicallyExposedPersonYes').setValue(true);
    } else if (data.politicallyExposedPerson == "No") {
        cmp.lookupReference('politicallyExposedPersonNo').setValue(true);
    }
    if (data.youAreSeniorManagment == "Yes") {
        cmp.lookupReference('youAreSeniorManagmentYes').setValue(true);
    } else if (data.youAreSeniorManagment == "No") {
        cmp.lookupReference('youAreSeniorManagmentNo').setValue(true);
    }
    if (data.youAreFaceToFaceInterview == "Yes") {
        cmp.lookupReference('youAreFaceToFaceInterviewYes').setValue(true);
    } else if (data.youAreFaceToFaceInterview == "No") {
        cmp.lookupReference('youAreFaceToFaceInterviewNo').setValue(true);
    }
    if (data.youAreTerroristActivities == "Yes") {
        cmp.lookupReference('youAreTerroristActivitiesYes').setValue(true);
    } else if (data.youAreTerroristActivities == "No") {
        cmp.lookupReference('youAreTerroristActivitiesNo').setValue(true);
    }

    cmp.lookupReference('youAreTerroristActivitieRegard').setValue(data.youAreTerroristActivitieRegard);
    cmp.lookupReference('exceptionDetails').setValue(data.exceptionDetails);
    if (data.applicantAskingLimit == -2147483648) {
        cmp.lookupReference('applicantAskingLimit').setValue(null);
    } else {
        cmp.lookupReference('applicantAskingLimit').setValue(data.applicantAskingLimit);
    }
    if (data.applicantRecommendedLimit == -2147483648) {
        cmp.lookupReference('applicantRecommendedLimit').setValue(null);
    } else {
        cmp.lookupReference('applicantRecommendedLimit').setValue(data.applicantRecommendedLimit);
    }
    // cmp.lookupReference('interviewedSourceSign').setValue(data.interviewedSourceSign);
    // cmp.lookupReference('managerOrUnitHeadSign').setValue(data.managerOrUnitHeadSign);
    // cmp.lookupReference('youAreCbblAccountHolder').setValue(data.youAreCbblAccountHolder);
    if (data.youAreCbblAccountHolder == "Yes") {
        cmp.lookupReference('youAreCbblAccountHolderYes').setValue(true);
    } else if (data.youAreCbblAccountHolder == "No") {
        cmp.lookupReference('youAreCbblAccountHolderNo').setValue(true);
    }
    // cmp.lookupReference('autoPayInstruction').setValue(data.autoPayInstruction);
    if (data.autoPayInstruction == "Yes") {
        cmp.lookupReference('autoPayInstructionYes').setValue(true);
    } else if (data.autoPayInstruction == "No") {
        cmp.lookupReference('autoPayInstructionNo').setValue(true);
    }
    cmp.lookupReference('applicantUsdAccountPortion').setValue(data.applicantUsdAccountPortion);
    var passportNumberObtained = cmp.lookupReference('passportNumberObtained');
    data.passportNumberObtained == "true" ? passportNumberObtained.setValue(true) : passportNumberObtained.setValue(false);

    var passportNumberVerified = cmp.lookupReference('passportNumberVerified');
    data.passportNumberVerified == "true" ? passportNumberVerified.setValue(true) : passportNumberVerified.setValue(false);

    var nidIndetityObtained = cmp.lookupReference('nidIndetityObtained');
    data.nidIndetityObtained == "true" ? nidIndetityObtained.setValue(true) : nidIndetityObtained.setValue(false);

    var nidIndetityVerified = cmp.lookupReference('nidIndetityVerified');
    data.nidIndetityVerified == "true" ? nidIndetityVerified.setValue(true) : nidIndetityVerified.setValue(false);

    var eTinIdIdentityObtained = cmp.lookupReference('eTinIdIdentityObtained');
    data.eTinIdIdentityObtained == "true" ? eTinIdIdentityObtained.setValue(true) : eTinIdIdentityObtained.setValue(false);

    var eTinIdIdentityVerified = cmp.lookupReference('eTinIdIdentityVerified');
    data.eTinIdIdentityVerified == "true" ? eTinIdIdentityVerified.setValue(true) : eTinIdIdentityVerified.setValue(false);
    cmp.lookupReference('businessAddress').setValue(data.businessAddress);
    cmp.lookupReference('businessDistrict').setValue(data.businessDistrict);    
    cmp.lookupReference('businessStreetName').setValue(data.businessStreetName);    
    cmp.lookupReference('businessStreetNumber').setValue(data.businessStreetNumber);        
    cmp.lookupReference('businessPostalCode').setValue(data.businessPostalCode);    
    cmp.lookupReference('businessCountry').setValue(data.businessCountry);
    cmp.lookupReference('applicantOwnerPartner').setValue(data.applicantOwnerPartner);      
    cmp.lookupReference('applicantPerStreetNo').setValue(data.applicantPerStreetNo);        
    cmp.lookupReference('applicantPerStreetName').setValue(data.applicantPerStreetName);

}

function previousOrganization(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    if (!isValidPreviousOrganization(data)) {
        Ext.MessageBox.alert('Invalid', 'Please do some Previous Organization Details..');
        console.log('Please do some Previous Organization Details.');
        return;
    } else {
        onSaveAcquisitionConfigModelGrid(grid, rowIndex, reference, group, subGroup, me)
    }
}

function otherBankLiability(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    if (!isValidOtherBankLiability(data)) {
        Ext.MessageBox.alert('Invalid', 'Please do some Other Bank Liability..');
        console.log('Please do some Other Bank Liability.');
        return;
    } else {
        onSaveAcquisitionConfigModelGrid(grid, rowIndex, reference, group, subGroup, me)
    }
}

function otherBankAcountDetails(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    if (!isValidOtherBankAcountDetails(data)) {
        Ext.MessageBox.alert('Invalid', 'Please do some Other Bank Liability..');
        console.log('Please do some Other Bank Liability.');
        return;
    } else {
        onSaveAcquisitionConfigModelGrid(grid, rowIndex, reference, group, subGroup, me)
    }
}

function securityDetails(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    if (!isValidSecurityDetails(data)) {
        Ext.MessageBox.alert('Invalid', 'Please do some Security Details..');
        console.log('Please do some Security Details.');
        return;
    } else {
        onSaveAcquisitionConfigModelGrid(grid, rowIndex, reference, group, subGroup, me)
    }
}

function companiesUderOwnership(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    if (!isValidCompaniesUderOwnership(data)) {
        Ext.MessageBox.alert('Invalid', 'Please do some CompaniesUder Ownership..');
        console.log('Please do some CompaniesUder Ownership.');
        return;
    } else {
        onSaveAcquisitionConfigModelGrid(grid, rowIndex, reference, group, subGroup, me)
    }
}

function isValidPreviousOrganization(data) {
    var organizationName = data.organizationName;
    var designation = data.designation;
    var serviceLength = data.serviceLength;

    if (!organizationName || Ext.isEmpty(organizationName)) {
        return false;
    } else if (!designation || Ext.isEmpty(designation)) {
        return false;
    } else if (!serviceLength || Ext.isEmpty(serviceLength)) {
        return false;
    } else {
        return true;
    }
}

function isValidOtherBankAcountDetails(data) {
    var accountTitle = data.accountTitle;
    var bankName = data.bankName;
    var accountNo = data.accountNo;
    var branchName = data.branchName;

    if (!accountTitle || Ext.isEmpty(accountTitle)) {
        return false;
    } else if (!bankName || Ext.isEmpty(bankName)) {
        return false;
    } else if (!accountNo || Ext.isEmpty(accountNo)) {
        return false;
    } else if (!branchName || Ext.isEmpty(branchName)) {
        return false;
    } else {
        return true;
    }

}

function isValidCompaniesUderOwnership(data) {
    var companyName = data.companyName;
    var mainAddress = data.mainAddress;
    var additionalAddress = data.additionalAddress;
    var nameOfCompanyBank = data.nameOfCompanyBank;
    var branchOfCompanyBank = data.branchOfCompanyBank;
    var availingAnyLoanThisCompany = data.availingAnyLoanThisCompany;

    if (!companyName || Ext.isEmpty(companyName)) {
        return false;
    } else if (!mainAddress || Ext.isEmpty(mainAddress)) {
        return false;
    } else if (availingAnyLoanThisCompany == 'Yes' && (!nameOfCompanyBank || Ext.isEmpty(nameOfCompanyBank))) {
        return false;
    } else if (availingAnyLoanThisCompany == 'Yes' && (!branchOfCompanyBank || Ext.isEmpty(branchOfCompanyBank))) {
        return false;
    } else if (!additionalAddress || Ext.isEmpty(additionalAddress)) {
        return false;
    } else if (!availingAnyLoanThisCompany || Ext.isEmpty(availingAnyLoanThisCompany)) {
        return false;
    } else {
        return true;
    }

}

function isValidOtherBankLiability(data) {
    var loanType = data.loanType;
    var financialInstitutionName = data.financialInstitutionName;
    var loanACnoOrCardNo = data.loanACnoOrCardNo;
    var sanctionLimit = data.sanctionLimit;
    var validity = data.validity;
    var presentOutstanding = data.presentOutstanding;
    var emi = data.emi;

    if (!loanType || Ext.isEmpty(loanType)) {
        return false;
    } else if (!financialInstitutionName || Ext.isEmpty(financialInstitutionName)) {
        return false;
    } else if (!sanctionLimit || Ext.isEmpty(sanctionLimit)) {
        return false;
    } else if (!validity || Ext.isEmpty(validity)) {
        return false;
    } else if (!loanACnoOrCardNo || Ext.isEmpty(loanACnoOrCardNo)) {
        return false;
    } else if (!presentOutstanding || Ext.isEmpty(presentOutstanding)) {
        return false;
    } else if (!emi || Ext.isEmpty(emi)) {
        return false;
    } else {
        return true;
    }
}

function isValidSecurityDetails(data) {
    var securityType = data.securityType;
    var beneficiary = data.beneficiary;
    var rate = data.rate;
    var aCInstrumentNo = data.aCInstrumentNo;
    var bankName = data.bankName;
    var issueDate = data.issueDate;
    var faceValue = data.faceValue;
    var presentValue = data.presentValue;

    if (!securityType || Ext.isEmpty(securityType)) {
        return false;
    } else if (!beneficiary || Ext.isEmpty(beneficiary)) {
        return false;
    } else if (!aCInstrumentNo || Ext.isEmpty(aCInstrumentNo)) {
        return false;
    } else if (!bankName || Ext.isEmpty(bankName)) {
        return false;
    } else if (!rate || Ext.isEmpty(rate)) {
        return false;
    } else if (!issueDate || Ext.isEmpty(issueDate)) {
        return false;
    } else if (!faceValue || Ext.isEmpty(faceValue)) {
        return false;
    } else if (!presentValue || Ext.isEmpty(presentValue)) {
        return false;
    } else {
        return true;
    }
}

function payloadCompaniesUderOwnership(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    var companyName = doTrim(data.companyName);
    var mainAddress = doTrim(data.mainAddress);
    var additionalAddress = doTrim(data.additionalAddress);

    var nameOfCompanyBank;
    var branchOfCompanyBank;
    if (data.nameOfCompanyBank) {
        nameOfCompanyBank = doTrim(data.nameOfCompanyBank);
    }
    if (data.branchOfCompanyBank) {
        branchOfCompanyBank = doTrim(data.branchOfCompanyBank);
    }

    var availingAnyLoanThisCompany = doTrim(data.availingAnyLoanThisCompany);

    var idAcquisitionApplicantKey = me.lookupReference('hiddentidAcquisitionApplicantKey').value;
    var acquisitionDetailsConfigId;
    if (data.acquisitionDetailsConfigId) {
        acquisitionDetailsConfigId = data.acquisitionDetailsConfigId;
    }
    var payload = [{
        companyName: companyName,
        mainAddress: mainAddress,
        additionalAddress: additionalAddress,
        nameOfCompanyBank: nameOfCompanyBank ? nameOfCompanyBank : null,
        branchOfCompanyBank: branchOfCompanyBank ? branchOfCompanyBank : null,
        availingAnyLoanThisCompany: availingAnyLoanThisCompany,
        userModKey: loginUser.id,
        creatorId: loginUser.id,
        objectType: appConstants.CREDIT_CARD,
        group: group,
        subGroup: subGroup,
        idAcquisitionApplicantKey: idAcquisitionApplicantKey,
        acquisitionDetailsConfigId: acquisitionDetailsConfigId,
    }]
    return payload;
}

function payloadOtherBankLiability(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;

    var loanType = doTrim(data.loanType);
    var financialInstitutionName = doTrim(data.financialInstitutionName);
    var loanACnoOrCardNo = doTrim(data.loanACnoOrCardNo);
    var sanctionLimit = data.sanctionLimit;
    var validity = doTrim(data.validity);
    var presentOutstanding = data.presentOutstanding;
    var emi = data.emi;
    var idAcquisitionApplicantKey = me.lookupReference('hiddentidAcquisitionApplicantKey').value;
    var acquisitionDetailsConfigId;
    if (data.acquisitionDetailsConfigId) {
        acquisitionDetailsConfigId = data.acquisitionDetailsConfigId;
    }
    var payload = [{
        loanType: loanType,
        financialInstitutionName: financialInstitutionName,
        loanACnoOrCardNo: loanACnoOrCardNo,
        sanctionLimit: sanctionLimit,
        validity: validity,
        presentOutstanding: presentOutstanding,
        emi: emi,
        userModKey: loginUser.id,
        creatorId: loginUser.id,
        objectType: appConstants.CREDIT_CARD,
        group: group,
        subGroup: subGroup,
        idAcquisitionApplicantKey: idAcquisitionApplicantKey,
        acquisitionDetailsConfigId: acquisitionDetailsConfigId,
    }]
    return payload;
}

function payloadPreviousOrganization(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;

    var organizationName = doTrim(data.organizationName);
    var designation = doTrim(data.designation);
    var serviceLength = data.serviceLength;
    if(serviceLength){
        serviceLength = parseFloat(serviceLength); 
    }

    var idAcquisitionApplicantKey = me.lookupReference('hiddentidAcquisitionApplicantKey').value;
    var acquisitionDetailsConfigId;
    if (data.acquisitionDetailsConfigId) {
        acquisitionDetailsConfigId = data.acquisitionDetailsConfigId;
    }
    var payload = [{
        organizationName: organizationName,
        designation: designation,
        serviceLength: serviceLength,
        userModKey: loginUser.id,
        creatorId: loginUser.id,
        objectType: appConstants.CREDIT_CARD,
        group: group,
        subGroup: subGroup,
        idAcquisitionApplicantKey: idAcquisitionApplicantKey,
        acquisitionDetailsConfigId: acquisitionDetailsConfigId,
    }]
    return payload;
}

function payloadOtherBankAcountDetails(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;

    var accountTitle = doTrim(data.accountTitle);
    var bankName = doTrim(data.bankName);
    var accountNo = doTrim(data.accountNo);
    var branchName = doTrim(data.branchName);

    var idAcquisitionApplicantKey = me.lookupReference('hiddentidAcquisitionApplicantKey').value;
    var acquisitionDetailsConfigId;
    if (data.acquisitionDetailsConfigId) {
        acquisitionDetailsConfigId = data.acquisitionDetailsConfigId;
    }
    var payload = [{
        accountTitle: accountTitle,
        bankName: bankName,
        accountNo: accountNo,
        branchName: branchName,
        userModKey: loginUser.id,
        creatorId: loginUser.id,
        objectType: appConstants.CREDIT_CARD,
        group: group,
        subGroup: subGroup,
        idAcquisitionApplicantKey: idAcquisitionApplicantKey,
        acquisitionDetailsConfigId: acquisitionDetailsConfigId,
    }]
    return payload;
}

function payloadSecurityDetails(grid, rowIndex, reference, group, subGroup, me) {
    var data = grid.store.data.items[rowIndex].data;
    var securityType = doTrim(data.securityType);
    var beneficiary = doTrim(data.beneficiary);
    var rate = data.rate;
    var aCInstrumentNo = doTrim(data.aCInstrumentNo);
    var bankName = doTrim(data.bankName);
    var issueDate = data.issueDate;
    issueDate = Ext.Date.format(issueDate, 'Ymd H:i:s');

    var faceValue = doTrim(data.faceValue);
    var presentValue = doTrim(data.presentValue);
    var idAcquisitionApplicantKey = me.lookupReference('hiddentidAcquisitionApplicantKey').value;
    var acquisitionDetailsConfigId;
    if (data.acquisitionDetailsConfigId) {
        acquisitionDetailsConfigId = data.acquisitionDetailsConfigId;
    }
    var payload = [{
        securityType: securityType,
        beneficiary: beneficiary,
        rate: rate,
        aCInstrumentNo: aCInstrumentNo,
        bankName: bankName,
        issueDate: issueDate ? issueDate : null,
        faceValue: faceValue,
        presentValue: presentValue,
        userModKey: loginUser.id,
        creatorId: loginUser.id,
        objectType: appConstants.CREDIT_CARD,
        group: group,
        subGroup: subGroup,
        idAcquisitionApplicantKey: idAcquisitionApplicantKey,
        acquisitionDetailsConfigId: acquisitionDetailsConfigId,
    }]
    return payload;
}

function onSaveAcquisitionConfigModelGrid(grid, rowIndex, reference, group, subGroup, me) {

    var data = grid.store.data.items[rowIndex].data;
    var payload;

    var header = {
        reference: reference
    };
    if (reference == 'onSaveOtherBankLiability') {
        payload = payloadOtherBankLiability(grid, rowIndex, reference, group, subGroup, me);
    } else if (reference == 'onSavePreviousOrganization') {
        payload = payloadPreviousOrganization(grid, rowIndex, reference, group, subGroup, me);
    } else if (reference == 'onSaveOtherBankAcountDetails') {
        payload = payloadOtherBankAcountDetails(grid, rowIndex, reference, group, subGroup, me);
    } else if (reference == 'onSaveSecurityDetails') {
        payload = payloadSecurityDetails(grid, rowIndex, reference, group, subGroup, me);
    } else if (reference == 'onSaveCompaniesUderOwnership') {
        payload = payloadCompaniesUderOwnership(grid, rowIndex, reference, group, subGroup, me);
    } else {
        console.log('No Reference');
    }
    if (!data.acquisitionDetailsConfigId) {
        var idAcquisitionApplicantKey = me.lookupReference('hiddentidAcquisitionApplicantKey').value;
        me.sendRequest(appActionType.ACTION_TYPE_NEW, appContentType.CONTENT_TYPE_ACQUISITION_CONFIG, payload, header);
    } else {
        me.sendRequest(appActionType.ACTION_TYPE_UPDATE, appContentType.CONTENT_TYPE_ACQUISITION_CONFIG, payload, header);
    }
}

function getPayloadPreviousOrg(cmp) {
    return getAcquisitionDetailsConfigArray('gPriviousOrganizationStore');
}

function getPayloadOthersBankLiability(cmp) {
    return getAcquisitionDetailsConfigArray('gOthersBankLiabilityStore');
}

function getPayloadAboutOtherBankDetails(cmp) {
    return getAcquisitionDetailsConfigArray('gAboutOtherBankDetailsStore');
}

function getPayloadSecurityDetails(cmp) {
    return getAcquisitionDetailsConfigArray('gSecurityDetailsStore');
}

function getPayloadCompaniesUderOwnership(cmp) {
    return getAcquisitionDetailsConfigArray('gCompaniesUderOwnershipStore');
}

function getAcquisitionDetailsConfigArray(storeId) {

    var data = getGlobalStore(storeId).data.items;

    var group;
    var subGroup;
    if (storeId == 'gPriviousOrganizationStore') {
        group = appConstants.ACQUISITION_GROUP;
        subGroup = appConstants.ACQUISITION_PREVIOUS_ORGANIZATION_DETAILS;
    } else if (storeId == 'gOthersBankLiabilityStore') {
        group = appConstants.ACQUISITION_GROUP;
        subGroup = appConstants.ACQUISITION_BANK_LIABILITY_POSTION;
    } else if (storeId == 'gAboutOtherBankDetailsStore') {
        group = appConstants.ACQUISITION_GROUP;
        subGroup = appConstants.ACQUISITION_OTHER_BANK_DETAILS;
    } else if (storeId == 'gSecurityDetailsStore') {
        group = appConstants.ACQUISITION_GROUP;
        subGroup = appConstants.ACQUISITION_SECURITY_DETAILS;
    } else if (storeId == 'gCompaniesUderOwnershipStore') {
        group = appConstants.ACQUISITION_GROUP;
        subGroup = appConstants.ACQUISITION_COMPANIES_UNDER_OWNER_SHIP;
    } else {
        console.log('not store for acquisition form');
    }

    var arr = [];

    for (var i = 0; i < data.length; i++) {

        if (Ext.isEmpty(data[i].data.idAcquisitionApplicantKey) || !data[i].data.idAcquisitionApplicantKey) {
            data[i].data.idAcquisitionApplicantKey = null;
        }
        if (Ext.isEmpty(data[i].data.acquisitionDetailsConfigId) || !data[i].data.acquisitionDetailsConfigId) {
            data[i].data.acquisitionDetailsConfigId = null;
        }

        data[i].data.userModKey = loginUser.id;
        data[i].data.creatorId = loginUser.id;
        data[i].data.objectType = appConstants.CREDIT_CARD;
        data[i].data.group = group;
        data[i].data.subGroup = subGroup;
        if (storeId == 'gPriviousOrganizationStore' && isValidPreviousOrganization(data[i].data)) {
            arr.push(data[i].data);
        }
        if (storeId == 'gOthersBankLiabilityStore' && isValidOtherBankLiability(data[i].data)) {
            arr.push(data[i].data);
        }
        if (storeId == 'gAboutOtherBankDetailsStore' && isValidOtherBankAcountDetails(data[i].data)) {
            arr.push(data[i].data);
        }
        if (storeId == 'gSecurityDetailsStore' && isValidSecurityDetails(data[i].data)) {
            arr.push(data[i].data);
        }
        if (storeId == 'gCompaniesUderOwnershipStore' && isValidCompaniesUderOwnership(data[i].data)) {
            arr.push(data[i].data);
        }
    }
    return arr;
}

function setDefultRowAcquisitionDetailsConfig() {
    setDefultAcquisitionDetails('gPriviousOrganizationStore');
    setDefultAcquisitionDetails('gOthersBankLiabilityStore');
    setDefultAcquisitionDetails('gAboutOtherBankDetailsStore');
    setDefultAcquisitionDetails('gSecurityDetailsStore');
    setDefultAcquisitionDetails('gCompaniesUderOwnershipStore');
}

function setAcquisitionDetailsRowAtEnd(storeId) {
    var store = getGlobalStore(storeId);
    var items = store.data.items;
    store.insert(items.length, new Desktop.model.AcquisitionDetailsConfig());
}

function setDefultAcquisitionDetails(storeId) {
    var store = getGlobalStore(storeId);
    var items = store.data.items;
    if (items.length == 0) {
        store.insert(0, new Desktop.model.AcquisitionDetailsConfig());
    }
}

function setAcquisitionPluginWithoutListenerInAllField(arr) {
    for (var i = 0; i < arr.length; i++) {
        setPluginWithoutListener(arr[i]);
    }
}

function getAcquisitionArrayOfGrid(cmp) {
    var arrayOfGrid = [];
    arrayOfGrid.push(cmp.lookupReference('previousOrganizationDetailsGrid'));
    arrayOfGrid.push(cmp.lookupReference('otherBankAccDetailsGrid'));
    arrayOfGrid.push(cmp.lookupReference('aboutYourOtherBankLiabilityGrid'));
    arrayOfGrid.push(cmp.lookupReference('securityDetailsGrid'));
    arrayOfGrid.push(cmp.lookupReference('companiesUderOwnershipGrid'));
    return arrayOfGrid;
}

function hideSaveActionColWithRefSaveOfAllGridAcquisition(arr) {
    for (var i = 0; i < arr.length; i++) {
        hideActionColumn(arr[i], 'saveReference');
    }
}

function removeStore() {
    var store;
    store = getGlobalStore('gPriviousOrganizationStore');
    store.clearFilter()
    store.removeAll();

    store = getGlobalStore('gOthersBankLiabilityStore');
    store.clearFilter()
    store.removeAll();

    store = getGlobalStore('gAboutOtherBankDetailsStore');
    store.clearFilter()
    store.removeAll();

    store = getGlobalStore('gSecurityDetailsStore');
    store.clearFilter()
    store.removeAll();

    store = getGlobalStore('gCompaniesUderOwnershipStore');
    store.clearFilter()
    store.removeAll();

    store = getGlobalStore('gCardDocumentStore');
    store.clearFilter()
    store.removeAll();
}

function buildAcquisitionTitle(data) {
    var title;
    if (data.text) {
        return "Acquisition Details Form Tracking Number :" + data.text
    } else {
        return "Acquisition Details Form Tracking Number :" + data.creditCardId + ", State : " + data.cardStateName;
    }
}

function getApplicantDocumentList(cmp) {
    var arr = [];
    var obj1 = {
        docType: appConstants.DOC_TYPE_APPLICANT_SIGNATURE,
        docName: cmp.lookupReference('uploadApplicantSignature').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj2 = {
        docType: appConstants.DOC_TYPE_PASSPORT_SIZE_PHOTO,
        docName: cmp.lookupReference('uploadPassportSizePhoto').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj3 = {
        docType: appConstants.DOC_TYPE_SUPPLEMENTARY_APPLICANT_PASSPORT_PHOTO,
        docName: cmp.lookupReference('uploadSupplementaryPassportSizePhoto').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj4 = {
        docType: appConstants.DOC_TYPE_TIN,
        docName: cmp.lookupReference('uploadTinCertificate').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj5 = {
        docType: appConstants.DOC_TYPE_SALARY_CERTIFICATE,
        docName: cmp.lookupReference('uploadSalaryCertificate').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj6 = {
        docType: appConstants.DOC_TYPE_MEMORANDUM,
        docName: cmp.lookupReference('uploadArticlesOfAssociationDocuments').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj7 = {
        docType: appConstants.DOC_TYPE_BANK_STATEMENT,
        docName: cmp.lookupReference('uploadBankStatement').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj8 = {
        docType: appConstants.DOC_TYPE_COPY_OF_VALID_PASSPORT,
        docName: cmp.lookupReference('uploadCopyOfValidPassport').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj9 = {
        docType: appConstants.DOC_TYPE_TRADE_LICENSE,
        docName: cmp.lookupReference('uploadTradeLicense').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj10 = {
        docType: appConstants.DOC_TYPE_BP_CIV_ID_DOCUMENTS_COPY,
        docName: cmp.lookupReference('uploadBpId').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };

    var obj11 = {
        docType: appConstants.ADDITIONAL_INCOME_DOC,
        docName: cmp.lookupReference('uploadAditionalIncomeRelevant').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };
    var obj12 = {
        docType: appConstants.INCOME_OF_SPOUSE_DOC,
        docName: cmp.lookupReference('uploadIncomeOfSpouseRelevant').value,
        isMandatory: 0,
        uploadStatus: 1,
        active: 1
    };


    if (obj1.docName) arr.push(obj1);
    if (obj2.docName) arr.push(obj2);
    if (obj3.docName) arr.push(obj3);
    if (obj4.docName) arr.push(obj4);
    if (obj5.docName) arr.push(obj5);
    if (obj6.docName) arr.push(obj6);
    if (obj7.docName) arr.push(obj7);
    if (obj8.docName) arr.push(obj8);
    if (obj9.docName) arr.push(obj9);
    if (obj10.docName) arr.push(obj10);
    if (obj11.docName) arr.push(obj11);
    if (obj12.docName) arr.push(obj12);
    return arr;
}

function checkAcquisitionDocument(data, cmp) {
    var count = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].docType == appConstants.DOC_TYPE_APPLICANT_SIGNATURE) {
            count++;
            cmp.lookupReference('uploadApplicantSignature').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_PASSPORT_SIZE_PHOTO) {
            count++;
            cmp.lookupReference('uploadPassportSizePhoto').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_SUPPLEMENTARY_APPLICANT_PASSPORT_PHOTO) {
            count++;
            cmp.lookupReference('uploadSupplementaryPassportSizePhoto').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_TIN) {
            count++;
            cmp.lookupReference('uploadTinCertificate').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_SALARY_CERTIFICATE) {
            count++;
            cmp.lookupReference('uploadSalaryCertificate').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_MEMORANDUM) {
            count++;
            cmp.lookupReference('uploadArticlesOfAssociationDocuments').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_BANK_STATEMENT) {
            count++;
            cmp.lookupReference('uploadBankStatement').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_COPY_OF_VALID_PASSPORT) {
            count++;
            cmp.lookupReference('uploadCopyOfValidPassport').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_TRADE_LICENSE) {
            count++;
            cmp.lookupReference('uploadTradeLicense').setHidden(true);
        } else if (data[i].docType == appConstants.DOC_TYPE_BP_CIV_ID_DOCUMENTS_COPY) {
            count++;
            cmp.lookupReference('uploadBpId').setHidden(true);
        }else if (data[i].docType == appConstants.ADDITIONAL_INCOME_DOC) {
            count++;
            cmp.lookupReference('uploadAditionalIncomeRelevant').setHidden(true);
        } else if (data[i].docType == appConstants.INCOME_OF_SPOUSE_DOC) {
            count++;
            cmp.lookupReference('uploadIncomeOfSpouseRelevant').setHidden(true);
        } else {
            console.log('No hidden field for acquisition document')
        }
    }
    if (count == 12) {
        cmp.lookupReference('acqusitionFormDocument').setHidden(true);
    }

}
function isMandatoryAcquisitionField(cmp) {

    var applicantCompanyName               = cmp.lookupReference('applicantCompanyName').value;              
    var applicantOccupationcheck           = cmp.lookupReference('applicantOccupation').getChecked();;   
    var applicantOccupation = applicantOccupationcheck.length == 1 ? applicantOccupationcheck[0].inputValue : null;

    var applicantMonthlyStatementsSentWay  = cmp.lookupReference('applicantMonthlyStatementsSentWay').value;                         
    var applicantPromActivitPurposeId      = cmp.lookupReference('applicantPromActivitPurposeId').value;                     
    var typeOfFinancing                    = cmp.lookupReference('typeOfFinancing').value;     
    var totalRequestedAmountOrCreditLmt    = cmp.lookupReference('totalRequestedAmountOrCreditLmt').value;                      
    var applicantName2                     = cmp.lookupReference('applicantName2').value;     
    var applicantFatherName2               = cmp.lookupReference('applicantFatherName2').value;             
    var applicantMotherName2               = cmp.lookupReference('applicantMotherName2').value;             
    var applicantSpouseName2               = cmp.lookupReference('applicantSpouseName2').value;             
    var applicantDateOfBirth2              = cmp.lookupReference('applicantDateOfBirth2').value;             
    var applicantEtinNumber2               = cmp.lookupReference('applicantEtinNumber2').value;              
    var applicantDistrictOfBirth1          = cmp.lookupReference('applicantDistrictOfBirth1').value;                 
    var applicantCountryOfBirth1           = cmp.lookupReference('applicantCountryOfBirth1').value;                 
    var sectorCode                         = cmp.lookupReference('sectorCode').value; 
    var sectorTypeChecked                  = cmp.lookupReference('sectorType').getChecked();
    var sectorType                         = sectorTypeChecked.length == 1 ? sectorTypeChecked[0].inputValue : null;
    
    var applicantGender2Checked = cmp.lookupReference('applicantGender2').getChecked();
    var applicantGender2d = applicantGender2Checked.length == 1 ? applicantGender2Checked[0].inputValue : null;

    var applicantPerAddress2               = cmp.lookupReference('applicantPerAddress2').value;             
    // var applicantDistrict2                 = cmp.lookupReference('applicantDistrict2').value;              
    // var applicantStreetName2               = cmp.lookupReference('applicantStreetName2').value;                 
    var applicantPerAddressCountry3        = cmp.lookupReference('applicantPerAddressCountry3').value;
    var applicantNameOnCard                = cmp.lookupReference('applicantNameOnCard').value;

    if(applicantNameOnCard && applicantNameOnCard.length >19){
        Ext.MessageBox.alert('Invalid Field Step 1', 'Name On Card should be 19 Character’s.');
        return false;
    }else if (!applicantCompanyName) {
        Ext.MessageBox.alert('Missing Field Step 2', 'Company/Firm Name should not be Empty.');
        return false;
    } else if (!applicantOccupation) {
        Ext.MessageBox.alert('Missing Field Step 2', 'Applicant Occupation should not be Empty..');
        return false;
    } else if (!applicantMonthlyStatementsSentWay) {
        Ext.MessageBox.alert('Missing Field Step 2', 'Applicant Monthly Statements Sent Way should not be Empty.');
        return false;
    } else if (!applicantPromActivitPurposeId) {
        Ext.MessageBox.alert('Missing Field Step 2', 'Applicant Facebook Id Or Name  should not be Empty.');
        return false;
    } else if (!typeOfFinancing) {
        Ext.MessageBox.alert('Missing Field Step 7', 'CIB Inquiry Type Of Financing should not be Empty.');
        return false;
    } else if (!totalRequestedAmountOrCreditLmt) {
        Ext.MessageBox.alert('Missing Field', 'Total requested Amount/ Credit Limit should not be Empty.');
        return false;
    } else if (!applicantName2) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Applicant Name should not be Empty.');
        return false;
    } else if (!applicantFatherName2) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Applicant Father Name should not be Empty.');
        return false;
    } else if (!applicantMotherName2) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Applicant Mother Name should not be Empty.');
        return false;
    } else if (!applicantSpouseName2) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Applicant Spouse Name should not be Empty.');
        return false;
    } else if (!applicantDateOfBirth2) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Applicant Date Of Birth should not be Empty.');
        return false;
    }else if (!applicantEtinNumber2) {
        Ext.MessageBox.alert('Missing Field Step 7', 'ApplicantEtinNumber should not be Empty.');
        return false;
    } else if (!applicantDistrictOfBirth1) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Applicant District Of Birth should not be Empty.');
        return false;
    } else if (!applicantCountryOfBirth1) {
        Ext.MessageBox.alert('Missing Field', 'Applicant Country Of Birth should not be Empty.');
        return false;
    } else if (!sectorCode) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Sector Code should not be Empty.');
        return false;
    }else if (!sectorType) {
        Ext.MessageBox.alert('Missing Field Step 7', 'Sector Type should not be Empty.');
        return false;
    }else if (!applicantGender2d) {
        Ext.MessageBox.alert('Missing Field', 'Applicant Gender should not be Empty.');
        return false;
    }else if (!applicantPerAddress2) {
        Ext.MessageBox.alert('Missing Field', 'Permanent Address should not be Empty.');
        return false;
    }
    //  else if (!applicantDistrict2) {
    //     Ext.MessageBox.alert('Missing Field Step 7', 'Applicant District should not be Empty.');
    //     return false;
    // }
    // else if (!applicantStreetName2) {
    //     Ext.MessageBox.alert('Missing Field Step 7', 'Applicant Street Name should not be Empty.');
    //     return false;
    // }
    else if (!applicantPerAddressCountry3) {
        Ext.MessageBox.alert('Missing Field', 'applicant Country should not be Empty.');
        return false;
    }
     else {
        console.log('Validation ok');
    }
    return true;
}

function getAttachmentCardReportWindow(title){
    var win = Ext.create('Ext.window.Window', {
        height: 450,
        width: 800,
        layout: 'fit',
        itemId: 'MultipleFileAttachmentCardPanelWin',
        reference: 'MultipleFileAttachmentCardPanelWin',
        maximizable: true,
        constrainHeader: true,
        closeAction: 'destroy',
        scrollable: true,
        autoScroll : true,   
        title: title,
        modal: true,
        items: [{
            xtype: 'MultipleFileAttachmentCardPanel'
        }]
    });

    multipleCardReportPanel = win;

    return win;

}
