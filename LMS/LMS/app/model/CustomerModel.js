Ext.define('Desktop.model.CustomerModel', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'customerId'				, type: 'string'},
		{name : 'customerName'				, type: 'string'},
		{name : 'banglaNameOfBorrower'		, type: 'string'},		
		{name : 'accountNo'					, type: 'string'},
		{name : 'currentPlaceofPosting'		, type: 'string'},
		{name : 'dateOfBirth'				, type: 'date'},
		{name : 'joiningDate'				, type: 'date'},
		{name : 'retirementDate'			, type: 'date'},
		{name : 'customerType'				, type: 'string'},
		{name : 'nid'						, type: 'string'},
		{name : 'isMatchedNid'			    , type: 'string'},
		{name : 'tin'						, type: 'string'},
		{name : 'bpNo'						, type: 'string'},
		{name : 'salaryDisbursedWithCBBL'	, type: 'int'},
		{name : 'maritalStatus'				, type: 'string'},
		{name : 'houseOwnership'			, type: 'string'},

		{name : 'customerIdKey'				, type: 'int'},
		{name : 'sourcingBrc'				, type: 'string'},
		{name : 'staffId'					, type: 'string'},
		{name : 'designation'				, type: 'string'},
		{name : 'permanetAddr'				, type: 'string'},
		{name : 'officeAddr'				, type: 'string'},
		{name : 'cif'						, type: 'string'},
		{name : 'motherName'				, type: 'string'},
		{name : 'fatherName'				, type: 'string'},
		{name : 'spouse'					, type: 'string'},
		{name : 'mobile'				    , type: 'string'},
		{name : 'emerPhone'				    , type: 'string'},
		{name : 'officeId'				    , type: 'string'},
		{name : 'age'				        , type: 'string'},
		{name : 'serviceLength'				, type: 'string'},
		{name : 'remainingYearOfRetirement'	, type: 'string'},
		{name : 'officeDistrict'			, type: 'string'},
		{name : 'officeDivision'	, type: 'string'},

	]
});
