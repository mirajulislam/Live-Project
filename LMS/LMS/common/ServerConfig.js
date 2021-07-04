//<LOCAL>
//location.host is used for machine independency of url as it will auto complete 
//machine url:port where this app is runnin for local test on your machine make it localhost:port\
var url = 'localhost:8083';
var loginUrl = '10.33.44.3:8080';
//var url = location.host;

var LOGIN_URL = 'http://'+loginUrl+'/nSMARTLite-server/server/processJsonRequest.htm';
var SERVER_URL = 'http://'+url+'/jsonRequest';
var LMS_REPORT_URL = 'http://'+url+'/generateLmsReport';
var UPLOAD_LOAN_DOC_URL = 'http://'+url+'/uploadLoanDocumentFile';
var DOWNLOAN_LOAN_DOC_URL = 'http://'+url+'/download/file';
var VIEW_LOAN_DOC_URL = 'http://'+url+'/view/file';
var INITIATE_LOAN_URL = 'http://'+url+'/initiateLoan';
var LMS_LOAN_GRID_MIS_EXCEL_REPORT_URL = 'http://'+url+'/generateLmsLoanMISGridExcelReport';
var LMS_LOAN_GRID_PPC_EXCEL_REPORT_URL = 'http://'+url+'/generateLmsLoan_MIS_PPC_GridExcelReport';
var LMS_LOAN_GRID_EXCEL_REPORT_URL = 'http://'+url+'/generateLmsGridExcelReport';
var DOWNLOAN_ELOAN_URL = 'http://'+url+'/app/eloan/download';
var VIEW_CIB_URL = 'http://'+url+'/cib/link';
