/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.GraphanaDashoard', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
    ],

    id:'graphana-dashboard-win',

    init : function(){
        this.launcher = {
            text: 'Graphana Dashboard',
            iconCls:'gra-dashboard-shortcut',
        };
    },

    createWindow : function(){
       window.open(GRAPHANA_DASHBORD_URL, '_blank').focus();
    },
});
