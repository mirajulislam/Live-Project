
//  -- var --
var isMessageBox = false;

// ----------

function replacer(key, value) {

	if (typeof value === 'number' && !isFinite(value)) {
		return String(value);
	}

	return value;
}

function showProcessMessage(message){
	Ext.MessageBox.show({
		title: 'Status',
		msg : message,
		progressText : message,
		zIndex: 99999,
		buttons : Ext.window.MessageBox.OK,
		width : 300,
		progress:true,
		floating:true,
		modal: true,
		wait:false,
		fn : function() {
			Ext.MessageBox.hide();
		}
	});
	Ext.defer(function() {
                    Ext.Msg.toFront()
                }, 20);

	isMessageBox = true;
}

function closeTab(form){
	var tabPanel = form.findParentByType('tabpanel');
	tabPanel.remove(tabPanel.getActiveTab());
}

function formatDateOnly(value){
	return value ? Ext.Date.dateFormat(value, 'M d, Y') : '';
}

function formatDate(value){
	return value ? Ext.Date.dateFormat(value, 'M d, Y') : '';
}

function formatDateTime(value){
	return value ? ((Ext.Date.dateFormat(value, 'Ymd') != '19700101') ? Ext.Date.dateFormat(value, 'M d, Y h:i:s a') : '') : '';
}

/*
p == principal amount
n = number of year
r = rate of interest
m = number of installment per year

*/
function calculateEMI(p, n, r, m){
	var mn = n * m;
	return calculateEMI_on_total_installment(p, r, mn);
}

/*
p == principal amount
r = rate of interest 
m = total number of installment for this loan

*/
function calculateEMI_on_total_installment(p, r, m){
	if(!p || !r || !m){
		return 0;
	}
	var intr   = r / 1200;
	var emi = p * intr / (1 - (Math.pow(1/(1 + intr), m)));
  emi = Math.ceil(emi)
	return emi;
}

function calculateAgePart(dob, toDate) {
  var now = toDate;
  var dob = new Date(dob);
  var year=now.getYear()-dob.getYear();
  var month=now.getMonth()-dob.getMonth();
  if(month<0){
    month=now.getMonth()+12-dob.getMonth();
    year=year-1;
  }
  var day=now.getDate()-dob.getDate();
  if(day<0){
    var monthNumber=dob.getMonth();
    var fullDate=getFullDate(monthNumber);
    day=now.getDate()+fullDate-dob.getDate();
    month=month-1;
  }

  return [year, month, day];
}

/*
* Return: Map with key 'YEAR', 'MONTH', 'DATE'
* With associated value
*/
function parseDiffOfTowDate(fromDate, toDate){

  var now = toDate;
  var yearNow = now.getYear();
  var monthNow = now.getMonth();
  var dateNow = now.getDate();

  var fromDate = new Date(fromDate);
  var yearThen = fromDate.getYear();
  var monthThen = fromDate.getMonth();
  var dateThen = fromDate.getDate();

  var year;
  var month;
  var date;

  year = yearNow - yearThen;

  if (monthNow >= monthThen){
    month = monthNow - monthThen;
  }
  else {
    year--;
    month = 12 + monthNow -monthThen;
  }

  if (dateNow >= dateThen){
    date = dateNow - dateThen;
  }
  else {
    month--;
    date = 31 + dateNow - dateThen;

    if (month < 0) {
      month = 11;
      year--;
    }
  }

  var valueMap = {};
  valueMap['YEAR'] = year;
  valueMap['MONTH'] = month;
  valueMap['DATE'] = date;

  return valueMap;
}

function calculateAge(dob, toDate) {
  var partMap = parseDiffOfTowDate(dob, toDate);
  return partMap['YEAR']+"y, "+partMap['MONTH']+"m, "+partMap['DATE']+"d";
}

function getFullDate(x){
  switch(x){
    case 0:
      return 31;
      break;
    case 1:
      return 28;
      break;
    case 2:
      return 31;
      break;
    case 3:
      return 30;
      break;
    case 4:
      return 31;
      break;
    case 5:
      return 30;
      break;
    case 6:
      return 31;
      break;
    case 7:
      return 31;
      break;
    case 8:
      return 30;
      break;
    case 9:
      return 31;
      break;
    case 10:
      return 30;
      break;
    case 11:
      return 31;
  }
}

function getRetirementDate(dob){
	if(!dob){
		return null;
	}
	var year = dob.getFullYear();
    var month = dob.getMonth();
    var day = dob.getDate();
    var dateOfRetirementBaseOnDob = new Date(year + gGovernmentJobServiceAge, month, day);

    return dateOfRetirementBaseOnDob;
}

//Imamul Hossain
function showLogoutWaring(){
	Ext.MessageBox.show({
		title: 'Warning',
		msg : 'You are forcefully logged out by the system/administrator.',
		progressText : 'Logging out.......',
		zIndex: 99999,
		buttons : Ext.window.MessageBox.OK,
		width : 300,
		progress:true,
		floating:true,
		modal: true,
		wait:false,
		fn : function() {
			Ext.MessageBox.hide();
		}
	});
	Ext.defer(function() {
        Ext.Msg.toFront()
    }, 500);

	isMessageBox = true;
}

//Imamul Hossain
function checkIsEmpty(value){
  return Ext.isEmpty(value)?null:value;
}

// Kh. Assaduzzaman Sohan
function doTrim(str) {
  return str.replace(/^\s+|\s+$/gm,'');
}

function getGlobalStore(storeId){
  return Ext.data.StoreManager.lookup(storeId);
}

function setPluginWithListener(cmp, listener){
  cmp.addPlugin(
    Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1,
            listeners: {
                edit: listener
            }
      })
  );
}

function setPluginWithoutListener(cmp){
  cmp.addPlugin(
    Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
      })
  );
}

function loadDataInGlobalStore(data, storeId){
  var store = getGlobalStore(storeId);
  store.clearData();
  store.loadData(data);
}

function hideActionColumn(grid, reference){
  var columns = grid.columns;
  for (var i = columns.length - 1; i >= 0; i--) {
    if(columns[i].reference == reference){
      columns[i].setVisible(false);
      break;
    }
  }
}

function showActionColumn(grid, reference){
  var columns = grid.columns;
  for (var i = columns.length - 1; i >= 0; i--) {
    if(columns[i].reference == reference){
      columns[i].setVisible(true);
      break;
    }
  }
}

function isHeadOfficeUser(){
  //return Ext.data.StoreManager.lookup('gLegalEntityStore').getById(loginUser.legalEntityTypeId).data.isHeadOffice;
  if(loginUser && !gLoginUuser){
    gLoginUuser = loginUser
  }

 if(gLoginUuser && !loginUser){
    loginUser  = gLoginUuser
  }

 return globalLegalEntityStore.getById(loginUser.legalEntityTypeId).data.isHeadOffice;
}


function hasRole(role){
  return loginUser.roleList.findIndex(i => i.name == role) > -1;
}

function hasAnyRole(roles){
  if(loginUser == null ||  loginUser == '') {
      loginUser=gLoginUuser;
    }
    else{
      loginUser=loginUser;
    }
  if(loginUser.roleList.length == 0 || !roles || roles.length == 0) return false;
  for(var i = 0; i < roles.length; i ++){
    if(hasRole(roles[i])) {
      return true;
    }
  }
  return false;
}

function hasAllRole(roles) {
  if(loginUser == null ||  loginUser == '') {
      loginUser=gLoginUuser;
    }
    else{
      loginUser=loginUser;
    }
  if(loginUser.roleList.length == 0 || !roles || roles.length == 0) return false;
  for(var i = 0; i < roles.length; i ++){
    if(!hasRole(roles[i])) {
      return false;
    }
  }
  return true;
}