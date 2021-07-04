Ext.define('Desktop.view.loan.RecommentPopup', {
	extend : 'Ext.panel.Panel',
	title : "Comment",
	requires: [
	    'Desktop.view.loan.LoanController',
		'Ext.tab.Panel',
		'Ext.tab.Tab',
		'Ext.grid.Panel',
		'Ext.grid.column.Boolean',
		'Ext.toolbar.Toolbar',
		'Ext.form.field.Text',
		'Ext.tree.Panel',
		'Ext.tree.View',
		'Ext.grid.filters.filter.Number',
		'Ext.grid.column.Date',
		'Ext.grid.filters.filter.Date',
		'Ext.grid.filters.filter.String',
		'Ext.grid.filters.filter.Boolean',
		'Ext.selection.CheckboxModel',
		'Ext.grid.filters.Filters',
		'Ext.grid.feature.Summary',
	],

	controller: 'loanPanel',

	closable : true,
	floatable : true,
	floating : true,
	draggable : true,
	width : 520,
	height :230,
	modal : true,

	itemId: 'loanActionComment',

	items : [
	{
		xtype : "panel",
		name : 'CommentAdd',
		itemId : 'commentPanelId',
		reference: 'commentPanelRef',
		width : 490,
		border:false,
		items:[
			{
				xtype: 'form',
				border: false,
				width: 490,
				layout: {
					type: 'vbox',
					align : 'stretch',
					pack  : 'start'
				},

				margin : '15 15 15 15',
				items:[{
					border:false,
					defaultType: 'textfield',
					items: [ 
						{
	                        xtype: 'combobox',
	                        itemId: 'commentForSendQuery',
	                        reference: 'commentForSendQuery',
	                        fieldLabel: 'Select Comment',
	                        labelAlign: 'left',
	                        border: 1,
	                        labelWidth: 100,
	                        margin: '10 20 10 20',
	                        mode: 'local',
	                        displayField: 'name',
	                        valueField: 'value',
	                        queryMode: 'local',
	                        forceSelection: true,
	                        editable: false,
	                        width: 450,  
	                        height: 25,   
	                        hidden : true, 
	                        listeners : {
		                        change : 'oncommentForSendQuery'
		                    },              
	                        store: Ext.create('Ext.data.Store', {
	                            fields: ['name', 'value'],
	                            data: [
	                                {
	                                    name: 'Incomplete Booklet e.g. Missing Information',
	                                    value: 'Incomplete Booklet e.g. Missing Information'
	                                },
	                                {
	                                    name: 'Fluid is used in the booklet ',
	                                    value: 'Fluid is used in the booklet '
	                                },
	                                {
	                                    name: 'Alteration/editing of Letter of Introduction (LOI) page and Lien Confirmation of End-Service Benefit page',
	                                    value: 'Alteration/editing of Letter of Introduction (LOI) page and Lien Confirmation of End-Service Benefit page'
	                                },
	                                {
	                                    name: 'Recommendation of Bangladesh Police Authority are missing in Application Form (Page 3 & 4)',
	                                    value: 'Recommendation of Bangladesh Police Authority are missing in Application Form (Page 3 & 4)'
	                                },
	                                {
	                                    name: 'Personal Guarantor does not sign on each page of letter of personal guarantee.',
	                                    value: 'Personal Guarantor does not sign on each page of letter of personal guarantee.'
	                                },
	                                {
	                                    name: 'Signature verification of guarantor is missing ',
	                                    value: 'Signature verification of guarantor is missing '
	                                },
	                                {
	                                    name: 'Borrower’s signature is missing in each pages of security documents',
	                                    value: 'Borrower’s signature is missing in each pages of security documents'
	                                },
	                                {
	                                    name: 'Guarantor’s Information, Relationship of the Borrower, Photo and NID copy and personal information of guarantor is missing',
	                                    value: 'Guarantor’s Information, Relationship of the Borrower, Photo and NID copy and personal information of guarantor is missing'
	                                },
	                                {
	                                    name: 'CIF for Personal Guarantor is not created',
	                                    value: 'CIF for Personal Guarantor is not created'
	                                },
	                                {
	                                    name: 'Signature in each pages of the booklet',
	                                    value: 'Signature in each pages of the booklet'
	                                },
	                                {
	                                    name: 'RMs seal is missing',
	                                    value: 'RMs seal is missing'
	                                },
	                                {
	                                    name: 'Front faced photograph is not submitted',
	                                    value: 'Front faced photograph is not submitted'
	                                },
	                                {
	                                    name: 'Signature mismatch among NID, BP ID, Booklet',
	                                    value: 'Signature mismatch among NID, BP ID, Booklet'
	                                },
	                                {
	                                    name: 'NID verification is missing',
	                                    value: 'NID verification is missing'
	                                },
	                                {
	                                    name: 'Relative Reference Required',
	                                    value: 'Relative Reference Required'
	                                },
	                                {
	                                    name: 'Signature Mismatch',
	                                    value: 'Signature Mismatch'
	                                },
	                                {
	                                    name: 'Others',
	                                    value: 'Others'
	                                }

	                            ]
	                        }),
	                    },
						{
		                    xtype : 'textareafield',
		                    grow : true,		           
		                    emptyText: 'Please write your comment here',
		                    reference: 'newComment',
		                    anchor : '100%',
		                    width: 450,
		                    height: 90,
		                    hidden: false,
		                    margin: '10 20 10 20'
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loginUser',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'userId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'firstName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'lastName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loginName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'legalEntityKey',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'primaryGroupId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'userModKey',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'roleName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'roleId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'commentType',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loanId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'actionType',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'stateName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'stateId',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'uiActionName',
		                    hidden: true
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loanDetailsPanel',
		                    hidden: true
		                }
					]
				}]
			}
		]
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		itemId:'btnPanel',
		items : ['->',
			{
				itemId: 'btnCommentCancel',
				text: 'Close',
				reference : 'btnCommentCancel',
				iconCls: 'remove',
				width : 80,
				name: 'btnCancel',
				handler:'onCancelCommentTypePopup'
				
			},
			{
				itemId  : 'btnCommentAdd',
				reference : 'btnCommentAdd',
				text    : 'Yes',
				name    : 'btnWLAdd',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickSaveLoanActionComment'
				}
			},
		]
	}],

});