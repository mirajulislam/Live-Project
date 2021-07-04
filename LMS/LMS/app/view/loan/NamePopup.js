Ext.define('Desktop.view.loan.NamePopup', {
	extend : 'Ext.panel.Panel',
	title : "Names",
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
	height :400,
	modal : true,

	itemId: 'namePopup',

	items : [
	{
		xtype : "panel",
		itemId : 'NamePopupPanel',
		reference: 'NamePopupPanel',
		width : 490,
		border:false,
		items:[
			{
				xtype: 'form',
				border: false,
				width: 490,
				margin : '15 15 15 15',
				layout: {
					type: 'vbox',
					align : 'stretch',
					pack  : 'start'
				},
				items:[{
					border:false,
					defaultType: 'textfield',
					margin: '0 0 0 60',
					items: [ 
		                {
		                    xtype: 'textfield',
		                    itemId: 'creditSupportOfficer',
		                    reference: 'creditSupportOfficer',
		                    fieldLabel: 'Credit Analyst',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20'
		                },
		                {
		                    xtype: 'checkbox',
		                    itemId: 'rmOrUhNameCheckBox',
		                    reference: 'rmOrUhNameCheckBox',
		                    fieldLabel: 'Risk Manager Or Unit Head Name & Designation',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20',
		                    listeners:{
		                    	change:'showRmOrUhNameAndDesignation',
		                    }
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'rmOrUhName',
		                    reference: 'rmOrUhName',
		                    fieldLabel: 'Risk Manager Or Unit Head Name',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20',
		                    hidden: true,
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'rmOrUhDesignation',
		                    reference: 'rmOrUhDesignation',
		                    fieldLabel: 'Risk Manager Or Unit Head Designation',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20',
		                    hidden: true,
		                },
		                // {
		                //     xtype: 'textfield',
		                //     itemId: 'riskManager',
		                //     reference: 'riskManager',
		                //     fieldLabel: 'Risk Manager',
		                //     labelAlign: 'left',
		                //     labelWidth: 150,
		                //     margin: '10 20 10 20',
		                //     value: 'Tasdik Aurangazeb'
		                // },
		                // {
		                //     xtype: 'textfield',
		                //     itemId: 'unitHeadReailCredit',
		                //     reference: 'unitHeadReailCredit',
		                //     fieldLabel: 'UnitHead, ReailCredit',
		                //     labelAlign: 'left',
		                //     labelWidth: 150,
		                //     margin: '10 20 10 20',
		                //     value: 'Md Kabir Uddin'
		                // },
		                {
		                    xtype: 'textfield',
		                    itemId: 'hocrm',
		                    reference: 'hocrm',
		                    fieldLabel: 'HoCRM',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20',
		                    value: 'Hasi Rani Bapari'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'managingDirectorCeo',
		                    reference: 'managingDirectorCeo',
		                    fieldLabel: 'Managing Director & CEO',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20',
		                    value: 'Masihul Huq Chowdhury'
		                },
		                {
		                    xtype: 'textfield',
		                    itemId: 'deputyHoCRM',
		                    reference: 'deputyHoCRM',
		                    fieldLabel: 'Deputy HoCRM',
		                    labelAlign: 'left',
		                    labelWidth: 150,
		                    margin: '10 20 10 20',
		                     value: 'Md. Monirul Islam'
		                },
		                {
		                    xtype: 'displayfield',
		                    reference: 'loanMainSearchGrid',
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
				text: 'Close',
				itemId: 'btnCancelNamePopup',
				reference : 'btnCancelNamePopup',
				iconCls: 'remove',
				width : 80,
				handler:'onCancelNamePopup'
				
			},
			{
				itemId  : 'btnYesNamePopup',
				reference : 'btnYesNamePopup',
				text    : 'Yes',
				width : 80,
				hidden  :  false,
				listeners : {
				   click : 'onClickYesOnNamePopup'
				}
			},
		]
	}],

	listeners: {
        afterrender: 'onActivateNamePopup'
    }
});