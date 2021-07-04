Ext.define('Desktop.view.loan.NewComment', {
	extend: 'Ext.window.Window',
	alias: 'widget.newComment',
	
	reference: 'newComment',
	renderTo: Ext.getBody(),

	controller: 'loanPanel',

	autoWidth: true,
	title: 'New Comment',
	width: 400,
	height: 190,
	layout: 'fit',
	modal: true,
	items: [
		{
			xtype: 'form',
			autoWidth: true,
			reference: 'newCommentForm',
			bodyPadding: 5,
			bind: {
				scrollable: 'true'
			},
			items: [
				{
					xtype : 'fieldcontainer',
					layout : 'column',
					margin : '10 0 5 0',
					columnWidth : 1,
					items: [
						{
							xtype : 'fieldcontainer',
							columnWidth : .4,
							items: [
								{
									xtype:'displayfield',
									fieldLabel: 'Object Type',
									hidden : true,
									labelWidth: 75,
									width : '100%',
									reference: 'objectType'
								}
							]
						},
						{
							xtype : 'fieldcontainer',
							columnWidth : .6,
							items: [
								{
									xtype:'displayfield',
									fieldLabel: 'Comment Type',
									hidden : true,
									labelWidth: 90,
									width : '100%',
									reference: 'commentType'
								}
							]
						}
					]
				},
				{
					xtype : 'textarea',
					labelWidth: 75,
					reference: 'comment',
					anchor: '100%',
					emptyText: 'Enter text here....',
					listeners: {
						change: 'onNewComment'
					}
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
							reference: 'saveComment',
							handler: 'onSaveComment',
							disabled: true
						},
						{
							xtype: 'button',
							style: 'border: groove',
							text: 'Cancel',
							width: 50,
							reference: 'cancelCommentBtn',
							handler: 'onCancelComment'
						},
					]
				}
			] 
		}
	]
});
