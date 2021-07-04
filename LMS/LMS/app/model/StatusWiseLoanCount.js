Ext.define('Desktop.model.StatusWiseLoanCount', {
	extend: 'Ext.data.Model',

	requires: [
		'Ext.data.field.Field'
	],

	fields	: [
		{name : 'date'				},
		{name : 'newEntry'			},
		{name : 'pendingRecomPpc'	},
		{name : 'recomByPpc'		},
		{name : 'receivebyCrm'		},
		{name : 'conApp'			},
		{name : 'complete'			},
		{name : 'conApproved'		},
		{name : 'onProcess'			},
		{name : 'pending'			},
		{name : 'slGenerated'		},
		{name : 'mdApproved'		},
		{name : 'rejectOrDeclien'	},
	]
});