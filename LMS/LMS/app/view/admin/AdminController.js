Ext.define('Desktop.view.loan.AdminController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.adminPanel',

	// rcv request
	onSuccess: function(request, response) {},

	// send json request
	sendRequest: function(actionName, contentType, payload, header) {

		if (Ext.isEmpty(payload)) {
			payload = new Array();
		}

		var request = {
			actionName: actionName,
			contentType: contentType,
			requestId: null,
			requestType: null,
			header: header,
			body: payload,
			message: null,
			dispatchType: null,
			sender: this,
			component: payload[0].reference,
			onSuccess: this.onSuccess,
			onError: this.onError,
			onStatusUpdate: this.onStatusUpdate,
			destination: httpServer
		};

		var requestId = nMessageProcessor.sendRequest(request);
	}
});

