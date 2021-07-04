Ext.define('Desktop.view.loan.NewLiability', {
	extend: 'Ext.window.Window',
	alias: 'widget.newLiability',
	
	reference: 'newLiability',
	renderTo: Ext.getBody(),

	controller: 'loanPanel',

	autoWidth: true,
	title: 'New Liability',
	width: 400,
	height: 290,
	layout: 'fit',
	modal: true,
	items: [
		{
			xtype: 'form',
			autoWidth: true,
			reference: 'newLiabilityForm',
			bodyPadding: 5,
			bind: {
				scrollable: 'true'
			},
			items: [
				{
					xtype : 'textfield',
					labelWidth: 100,
					anchor: '100%',
					fieldLabel: 'Bank/Fis Name',
					reference: 'bankName'
				},
				{
					xtype : 'textfield',
					labelWidth: 100,
					anchor: '100%',
					fieldLabel: 'Product',
					reference: 'product'
				},
				{
					xtype : 'numberfield',
					labelWidth: 100,
					anchor: '100%',
					fieldLabel: 'Disbursed',
					reference: 'disbursed',
					minValue: 0,
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false
				},
				{
					xtype : 'numberfield',
					labelWidth: 100,
					anchor: '100%',
					fieldLabel: 'Current Outstanding',
					reference: 'currentOutstanding',
					minValue: 0,
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false
				},
				{
					xtype : 'numberfield',
					labelWidth: 100,
					anchor: '100%',
					fieldLabel: 'EMI Size',
					reference: 'eMISize',
					minValue: 0,
					hideTrigger: true,
					keyNavEnabled: false,
					mouseWheelEnabled: false

				},
				{
					xtype : 'textarea',
					labelWidth: 100,
					fieldLabel: 'Remark',
					reference: 'remarks',
					anchor: '100%',
					emptyText: 'Enter remark here....'
				},
				{
					xtype : 'textfield',
					fieldLabel: 'Loan Id',
					reference: 'loanId',
					hidden: true
				}
			],
			dockedItems:[
				{
					xtype: 'toolbar',
					dock: 'bottom',
					layout: {
						pack: 'center',
						type: 'hbox'
					},
					items: [
						{
							xtype: 'button',
							style: 'border: groove',
							text: 'Save',
							width: 50,
							reference: 'saveLiability',
							handler: 'onSaveLiability'
						},
						{
							xtype: 'button',
							style: 'border: groove',
							text: 'Cancel',
							width: 50,
							reference: 'cancelCommentBtn',
							handler: 'onCancel'
						},
					]
				}
			] 
		}
	]
});
