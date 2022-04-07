Ext.define('nazdaq.message.MessageDispatcher', {
	alias: 'nMessageDispatcher',
	alternateClassName: 'nMessageDispatcher',
	statics: {

		dispatch : function(request, dispatchType) {

			if (Ext.isEmpty(dispatchType)) {
				dispatchType = appConstants.DISPATCH_TYPE_AJAX;
			}

			if (dispatchType === appConstants.DISPATCH_TYPE_AJAX) {
				this.dispatchAjaxRequest(request);
			} 
			else {
				Ext.MessageBox.alert('Warn', 'Unknown dispatch type ' + dispatchType);
			}
		},

		dispatchAjaxRequest : function(appRequest) {

			if (!Ext.isEmpty(appRequest.message))
			{
				var urlDestination = null;
				if(appRequest.header && appRequest.header.destinationUrl){
					urlDestination = appRequest.header.destinationUrl
				}
				else{
					urlDestination= SERVER_URL;
				}
				var payLoadString= appRequest.message.toString();

				Ext.Ajax.request({

					url			: urlDestination,
					method		: appConstants.REQUEST_METHOD_POST,
					jsonData	: payLoadString,
					timeout 	: ajaxRequestTimeout,
					success: function(result, request) {
						if(result.responseText == "Logged Out By Admin/System"){
							//Ext.MessageBox.alert('Warning', 'You are forcefully logged out from the system by administrator/system.');
							showLogoutWaring();
							setTimeout(function(){ 
								javascript: document.location.reload();
							}, 1000);
						}
						else{
							var response = Ext.JSON.decode(result.responseText);
						
							nMessageProcessor.processResponse(appRequest, response);
						}
						
					},

					failure: function(result, request) {
						Ext.MessageBox.alert('Server Error', 'Server Error');
					}
				});
			}
		}
	}
});