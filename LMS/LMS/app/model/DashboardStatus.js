Ext.define('Desktop.model.DashboardStatus', {
     extend: 'Ext.data.Model',

     requires: [
          'Ext.data.field.Field'
     ],

     fields    : [
          {name : 'name'},
          {name : 'value'}
     ]
});
