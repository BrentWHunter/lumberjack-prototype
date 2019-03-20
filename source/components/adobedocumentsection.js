enyo.kind({

	name: "lumberjack.AdobeDocumentSection",

	published: {
		activeEntry: null,
		activeSubentry: null,
		database: null,
		doc: null,
		header: "",
		readOnly: false,
		// Attachment keys:
		signedAttachmentIdKey: "",// "signedAttachmentID"
		signedFileNameKey: "",// "signedFileName"
		unsignedAttachmentIdKey: "",// "unsignedAttachmentID"
		unsignedFileNameKey: "",// "unsignedFileName"
		// Disable flags:
		disableViewStatus: false,
		disableViewUnsigned: false,
		// ID keys:
		idKey: "",
		subIdKey: "",
		// Routes:
		routeCancel: "",
		routeDownloadSigned: "", //Only if not doing local downloads
		routeDownloadUnsigned: "", //Only if not doing local downloads
		routeGenerate: "",
		routeGetStatus: "",
		routeRefreshStatus: "",
		routeSend: "",
		routeSendReminder: "",
		routeViewSigned: "", //Only if not doing local downloads
		routeViewUnsigned: "" //Only if not doing local downloads
	},

	events: {
		onPromptSaveRequired: "",
		onLogout: ""
	},

	components: [
		{name: "header", style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: ""},
		{style: "margin-top: 10px; margin-bottom: 10px;", components: [
			{name: "statusIcon", kind: "enyo.Image", style: "margin-left: 5px; height: 32px; width: 32px;"},
			{name: "statusDescription", style: "margin-left: 10px; display: inline-block;"}
		]},
		{name: "generatedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Generated:", style: "line-height: 20px; width: 150px;"},
			{name: "generatedTimestampLabel", style: "line-height: 20px; margin-left: 10px;"}
		]},
		{name: "sentTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Sent for Signature:", style: "line-height: 20px; width: 150px;"},
			{name: "sentTimestampLabel", style: "line-height: 20px; margin-left: 10px;"}
		]},
		{name: "signedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Signed:", style: "line-height: 20px; width: 150px;"},
			{name: "signedTimestampLabel", style: "line-height: 20px; margin-left: 10px;"}
		]},
		{style: "margin-top: 10px;", components: [
			{name: "generateButton", kind: "lumberjack.Button", content: "Generate", ontap: "handleGenerateButtonTapped"},
			{name: "viewUnsignedButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Unsigned", ontap: "handleViewUnsignedButtonTapped"},
			{name: "downloadUnsignedButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadUnsignedButtonTapped"},
			{name: "sendButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send for Signature", ontap: "handleSendButtonTapped"},
			{name: "viewStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Status", ontap: "handleViewStatusButtonTapped"},
			{name: "refreshStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Refresh Status", ontap: "handleRefreshStatusButtonTapped"},
			{name: "sendReminderButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send Reminder", ontap: "handleSendReminderButtonTapped"},
			{name: "viewSignedButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Signed", ontap: "handleViewSignedButtonTapped"},
			{name: "downloadSignedButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedButtonTapped"}
		]},
		{name: "documentStatusPopup", kind: "lumberjack.ViewAdobeSignDocumentStatusPopup"}
	],

	bindings: [
		{from: ".header", to: ".$.header.content"},
		{from: ".doc", to: ".$.statusIcon.src", transform: function(v) {
			try
			{
				if (v.signed) { return "assets/icons/circle-icon-green.png"; }
				else if (v.sent) { return "assets/icons/circle-icon-yellow.png"; }
				else if (v.generated) { return "assets/icons/circle-icon-red.png"; }
				else { throw null; }
			}
			catch (err) { return "assets/icons/circle-icon-grey.png"; }
		}},
 		{from: ".doc", to: ".$.statusDescription.content", transform: function(v) {
 			try
			{
				if (v.signed) { return "Document has been signed."; }
				else if (v.sent) { return "Document has been sent for signature."; }
				else if (v.generated) { return "Document has been generated."; }
				else { throw null; }
			}
			catch (err) { return "Document has not yet been generated."; }
 		}},
 		{from: ".doc", to: ".$.generatedTimestampSection.showing", transform: function(v) {
 			try { return v.generated === true; }
			catch (err) { return false; }
 		}},
		{from: ".doc", to: ".$.generatedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v.generatedTimestamp,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".doc", to: ".$.sentTimestampSection.showing", transform: function(v) {
 			try { return v.sent === true; }
			catch (err) { return false; }
 		}},
		{from: ".doc", to: ".$.sentTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v.sentTimestamp, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".doc", to: ".$.signedTimestampSection.showing", transform: function(v) {
 			try { return v.signed === true; }
			catch (err) { return false; }
 		}},
		{from: ".doc", to: ".$.signedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v.signedTimestamp, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".doc", to: ".$.generateButton.disabled", transform: function(v) {
 			try
 			{
 				if (this.get("readOnly") === true) { return true; }
 				return v.sent === true;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.viewUnsignedButton.disabled", transform: function(v) {
 			try
 			{
 				return v.generated === false || this.get("disableViewUnsigned") === true;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.downloadUnsignedButton.disabled", transform: function(v) {
 			try
 			{
 				return v.generated === false;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.sendButton.disabled", transform: function(v) {
 			try
 			{
 				if (this.get("readOnly") === true) { return true; }
 				return v.generated === false || v.sent === true;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.viewStatusButton.disabled", transform: function(v) {
 			try
 			{
 				return v.sent === false || this.get("disableViewStatus") === true;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.refreshStatusButton.disabled", transform: function(v) {
 			try
 			{
 				if (this.get("readOnly") === true) { return true; }
 				return v.sent === false;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.sendReminderButton.disabled", transform: function(v) {
 			try
 			{
 				if (this.get("readOnly") === true) { return true; }
 				return v.sent === false || v.signed === true;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.viewSignedButton.disabled", transform: function(v) {
 			try
 			{
 				return v.signed === false;
 			}
			catch (err) { return true; }
 		}},
 		{from: ".doc", to: ".$.downloadSignedButton.disabled", transform: function(v) {
 			try
 			{
 				return v.signed === false;
 			}
			catch (err) { return true; }
 		}}
	],

	cancel: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeCancel");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		if (!this.get("doc").sent)
		{
			alertify.error("Document not sent.");
			return;
		}

		this.showLoadingPopup("Cancelling...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to cancel document.");
			this.hideLoadingPopup();
			if(response == 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: lumberjack.preferences.get("company")
		};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatible with the Warrants module's transactions:
		if (this.get("idKey") === "warrantID" && this.get("subIdKey") === "transactionID")
		{
			parameters[this.get("subIdKey")] = this.get("activeSubentry").get("_id");
		}

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
		{
			parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + route,
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Document cancelled.");
			this.hideLoadingPopup();

			callback();
		}));

		request.go();
	},

	downloadSigned: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		var doc = this.get("doc");

		if (!doc.signed)
		{
			alertify.error("Document not signed.");
			return;
		}

		var route = this.get("routeDownloadSigned");

		if (route)
		{
			//If a route has been provided, assume that we are using the route rather than downloading directly from the database
			this.showLoadingPopup("Downloading Signed Document...");

			var onError = enyo.bind(this, function(request, response) {
				console.log({request: request, response: response});
				alertify.error("Failed to download signed document.");
				this.hideLoadingPopup();
				if(response == 401){
					this.doLogout();
					return;
				}
			});

			var parameters = {};
			parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");;

			// Make this component compatable with the Placement Module requiring two parameters.
			if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
			{
				parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
			}

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + route,
				method: "GET",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			request.error(onError);

			request.response(enyo.bind(this, function(request, response) {
				if (response.error)
				{
					onError(request, response);
					return;
				}

				this.hideLoadingPopup();
				//At the moment, this only needs to work with files from the Twilight/Clients API.
				saveAs(lumberjack.b64ToBlob(response.file.content, response.file.contentType), response.file.fileName);

				callback();
			}));

			request.go(parameters);
		}
		else
		{
			var attachmentIndex = doc[this.get("signedAttachmentIdKey")];

			this.getAttachment(attachmentIndex, enyo.bind(this, function(blobOrBuffer) {
				saveAs(blobOrBuffer, doc[this.get("signedFileNameKey")]);

				callback();
			}));
		}
	},

	downloadUnsigned: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		var doc = this.get("doc");

		if (!doc.generated)
		{
			alertify.error("Document not generated.");
			return;
		}

		var route = this.get("routeDownloadUnsigned");

		if (route)
		{
			//If a route has been provided, assume that we are using the route rather than downloading directly from the database
			this.showLoadingPopup("Downloading Unsigned Document...");

			var onError = enyo.bind(this, function(request, response) {
				console.log({request: request, response: response});
				alertify.error("Failed to download unsigned document.");
				this.hideLoadingPopup();
				if(response == 401){
					this.doLogout();
					return;
				}
			});

			var parameters = {};
			parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

			// Make this component compatable with the Placement Module requiring two parameters.
			if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
			{
				parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
			}

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + route,
				method: "GET",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			request.error(onError);

			request.response(enyo.bind(this, function(request, response) {
				if (response.error)
				{
					onError(request, response);
					return;
				}

				this.hideLoadingPopup();
				//At the moment, this only needs to work with files from the Twilight/Clients API.
				saveAs(lumberjack.b64ToBlob(response.file.content, response.file.contentType), response.file.fileName);

				callback();
			}));

			request.go(parameters);
		}
		else
		{
			var attachmentIndex = doc[this.get("unsignedAttachmentIdKey")];

			this.getAttachment(attachmentIndex, enyo.bind(this, function(blobOrBuffer) {
				saveAs(blobOrBuffer, doc[this.get("unsignedFileNameKey")]);

				callback();
			}));
		}
	},

	generate: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeGenerate");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		if (this.get("doc").sent && !this.get("doc").signed)
		{
			this.cancel(enyo.bind(this, function() {
				setTimeout(enyo.bind(this, function() {
					this.generate();
				}, 1000));
			}));
			return;
		}

		this.showLoadingPopup("Generating...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to generate document.");
			this.hideLoadingPopup();
			if(response == 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: lumberjack.preferences.get("company")
		};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatible with the Options module:
		if (this.get("idKey") === "optionID")
		{
			parameters["contactID"] = this.get("activeEntry").get("holderContactID");
		}

		// Make this component compatible with the Warrants module's transactions:
		if (this.get("idKey") === "warrantID" && this.get("subIdKey") === "transactionID")
		{
			parameters[this.get("subIdKey")] = this.get("activeSubentry").get("_id");
		}

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
		{
			parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + route,
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Document generated.");
			this.hideLoadingPopup();

			callback();
		}));

		request.go();
	},

	getAttachment: function(attachmentIndex, callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (typeof(attachmentIndex) !== 'string' || attachmentIndex === "")
		{
			alertify.error("Document not found.");
			return;
		}

		this.showLoadingPopup("Downloading...");

		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
			if (err)
			{
				console.log(err);
				alertify.error("Login Failed.");
				this.hideLoadingPopup();
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			this.get("database").getAttachment(this.get("activeEntry").get("_id"), attachmentIndex, enyo.bind(this, function(err, blobOrBuffer) {
				if (err)
				{
					console.log(err);
					alertify.error("Failed to get attachment.");
					this.hideLoadingPopup();
					return;
				}

				this.hideLoadingPopup();

				callback(blobOrBuffer);
			}));
		}));
	},

	refreshStatus: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeRefreshStatus");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		if (!this.get("doc").sent)
		{
			alertify.error("Document not sent.");
			return;
		}

		this.showLoadingPopup("Refreshing status...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to refresh document status.");
			this.hideLoadingPopup();
			if(response == 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: lumberjack.preferences.get("company")
		};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatible with the Warrants module's transactions:
		if (this.get("idKey") === "warrantID" && this.get("subIdKey") === "transactionID")
		{
			parameters[this.get("subIdKey")] = this.get("activeSubentry").get("_id");
		}

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
		{
			parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + route,
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		// Make this component compatible with the Options module and the Clients module:
		if (this.get("idKey") === "optionID" || this.get("idKey") === "clientID" || this.get("idKey") === "subscriberID")
		{
			request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + route,
				method: "GET",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});
		}

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Document status refreshed.");
			this.hideLoadingPopup();

			callback();
		}));

		// Make this component compatible with the Options module and the Clients module:
		if (this.get("idKey") === "optionID" || this.get("idKey") === "clientID" || this.get("idKey") === "subscriberID")
		{
			request.go(parameters);
			return;
		}

		request.go();
	},

	send: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeSend");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		var doc = this.get("doc");

		if (!doc.generated)
		{
			alertify.error("Document not generated.");
			return;
		}
		else if (doc.sent && !doc.signed)
		{
			this.cancel(enyo.bind(this, function() {
				setTimeout(enyo.bind(this, function() {
					this.send();
				}, 1000));
			}));
			return;
		}
		else if (doc.signed)
		{
			alertify.error("Document already signed.");
			return;
		}

		this.showLoadingPopup("Sending for signature...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to send document for signature.");
			this.hideLoadingPopup();
			if(response == 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: lumberjack.preferences.get("company")
		};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatible with the Warrants module's transactions:
		if (this.get("idKey") === "warrantID" && this.get("subIdKey") === "transactionID")
		{
			parameters[this.get("subIdKey")] = this.get("activeSubentry").get("_id");
		}

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
		{
			parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + route,
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Document sent for signature.");
			this.hideLoadingPopup();

			callback();
		}));

		request.go();
	},

	sendReminder: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeSendReminder");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		if (!this.get("doc").sent)
		{
			alertify.error("Document not sent.");
			return;
		}
		else if (this.get("doc").signed)
		{
			alertify.error("Document already signed.");
			return;
		}

		this.showLoadingPopup("Sending Reminder...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to send document reminder.");
			this.hideLoadingPopup();
			if(response == 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: lumberjack.preferences.get("company")
		};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatible with the Warrants module's transactions:
		if (this.get("idKey") === "warrantID" && this.get("subIdKey") === "transactionID")
		{
			parameters[this.get("subIdKey")] = this.get("activeSubentry").get("_id");
		}

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
		{
			parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + route,
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Document reminder sent.");
			this.hideLoadingPopup();

			callback();
		}));

		request.go();
	},

	viewSigned: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		var doc = this.get("doc");

		if (!doc.signed)
		{
			alertify.error("Document not signed.");
			return;
		}

		var route = this.get("routeViewSigned");

		if (route)
		{
			//If a route has been provided, assume that we are using the route rather than downloading directly from the database
			this.showLoadingPopup("Loading Signed Document...");

			var onError = enyo.bind(this, function(request, response) {
				console.log({request: request, response: response});
				alertify.error("Failed to load signed document.");
				this.hideLoadingPopup();
				if(response == 401){
					this.doLogout();
					return;
				}
			});

			var parameters = {};
			parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

			// Make this component compatable with the Placement Module requiring two parameters.
			if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
			{
				parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
			}

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + route,
				method: "GET",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			request.error(onError);

			request.response(enyo.bind(this, function(request, response) {
				if (response.error)
				{
					onError(request, response);
					return;
				}

				this.hideLoadingPopup();
				//At the moment, this only needs to work with files from the Twilight/Clients API.
				window.open(URL.createObjectURL(lumberjack.b64ToBlob(response.file.content, response.file.contentType)));

				callback();
			}));

			request.go(parameters);
		}
		else
		{
			var attachmentIndex = doc[this.get("signedAttachmentIdKey")];

			this.getAttachment(attachmentIndex, enyo.bind(this, function(blobOrBuffer) {
				window.open(URL.createObjectURL(blobOrBuffer));

				callback();
			}));
		}
	},

	viewStatus: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("disableViewStatus") === true) { return; }

		var route = this.get("routeGetStatus");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		if (!this.get("doc").sent)
		{
			alertify.error("Document not sent.");
			return;
		}

		this.showLoadingPopup("Getting status...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to get document status.");
			this.hideLoadingPopup();
			if(response == 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: lumberjack.preferences.get("company")
		};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatible with the Warrants module's transactions:
		if (this.get("idKey") === "warrantID" && this.get("subIdKey") === "transactionID")
		{
			parameters[this.get("subIdKey")] = this.get("activeSubentry").get("_id");
		}

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
		{
			parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + route,
			method: "GET",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			this.hideLoadingPopup();

			var responseValueKey = "value";

			// Make this component compatible with the Options module, and the Client module:
			if (this.get("idKey") === "optionID" || this.get("idKey") === "clientID" || this.get("idKey") === "subscriberID")
			{
				responseValueKey = "response";
			}

			this.$.documentStatusPopup.show(response[responseValueKey]);

			callback();
		}));

		request.go(parameters);
	},

	viewUnsigned: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("disableViewUnsigned") === true) { return; }

		var doc = this.get("doc");

		if (!doc.generated)
		{
			alertify.error("Document not generated.");
			return;
		}

		var route = this.get("routeViewUnsigned");

		if (route)
		{
			//If a route has been provided, assume that we are using the route rather than downloading directly from the database
			this.showLoadingPopup("Loading Unsigned Document...");

			var onError = enyo.bind(this, function(request, response) {
				console.log({request: request, response: response});
				alertify.error("Failed to load unsigned document.");
				this.hideLoadingPopup();
				if(response == 401){
					this.doLogout();
					return;
				}
			});

			var parameters = {};
			parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

			// Make this component compatable with the Placement Module requiring two parameters.
			if (this.get("idKey") === "subscriberID" && this.get("subIdKey") === "placementID")
			{
				parameters[this.get("subIdKey")] = this.get("activeEntry").get("target");
			}

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + route,
				method: "GET",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			request.error(onError);

			request.response(enyo.bind(this, function(request, response) {
				if (response.error)
				{
					onError(request, response);
					return;
				}

				this.hideLoadingPopup();
				//At the moment, this only needs to work with files from the Twilight/Clients API.
				// Since unsigned documents are generated as DOCX files, additional logic is required to display them in-browser.
				var that = this;
				var reader = new FileReader();
				reader.onloadend = function() {
					mammoth.convertToHtml({arrayBuffer: reader.result}).then(function(result) {
						if (that.$.docxPopup != null) 
						{
							that.$.docxPopup.hide();
							that.$.docxPopup.destroy();
						}
						that.createComponent({name: "docxPopup", kind: "lumberjack.docxPopup"}, {owner:that});
						that.$.docxPopup.$.main.addContent(result.value);
						that.$.docxPopup.show();

						callback();
					});
				};
				reader.readAsArrayBuffer(lumberjack.b64ToBlob(response.file.content, response.file.contentType));
			}));

			request.go(parameters);
		}
		else
		{
			var attachmentIndex = doc[this.get("unsignedAttachmentIdKey")];

			this.getAttachment(attachmentIndex, enyo.bind(this, function(blobOrBuffer) {
				// Since unsigned documents are generated as DOCX files, additional logic is required to display them in-browser.
				var that = this;
				var reader = new FileReader();
				reader.onloadend = function() {
					mammoth.convertToHtml({arrayBuffer: reader.result}).then(function(result) {
						if (that.$.docxPopup != null) 
						{
							that.$.docxPopup.hide();
							that.$.docxPopup.destroy();
						}
						that.createComponent({name: "docxPopup", kind: "lumberjack.docxPopup"}, {owner:that});
						that.$.docxPopup.$.main.addContent(result.value);
						that.$.docxPopup.show();

						callback();
					});
				};
				reader.readAsArrayBuffer(blobOrBuffer);
			}));
		}
	},

	/***********
	* Handlers *
	***********/

	handleDownloadSignedButtonTapped: function(inSender, inEvent)
	{
		this.downloadSigned();
	},

	handleDownloadUnsignedButtonTapped: function(inSender, inEvent)
	{
		this.downloadUnsigned();
	},

	handleGenerateButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.generate();
		})});
	},

	handleRefreshStatusButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.refreshStatus();
		})});
	},

	handleSendButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.send();
		})});
	},

	handleSendReminderButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.sendReminder();
		})});
	},

	handleViewSignedButtonTapped: function(inSender, inEvent)
	{
		this.viewSigned();
	},

	handleViewStatusButtonTapped: function(inSender, inEvent)
	{
		this.viewStatus();
	},

	handleViewUnsignedButtonTapped: function(inSender, inEvent)
	{
		this.viewUnsigned();
	},

	/****************
	* Loading Popup *
	****************/

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	hideLoadingPopup: function()
	{
		if (this.$.loadingPopup != null)
		{
			this.$.loadingPopup.hide();
			this.$.loadingPopup.destroy();
		}
	},

	showLoadingPopup: function(message)
	{
		this.hideLoadingPopup();

		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"}, {owner:this});
		this.$.loadingPopup.show($L(message));
	}
});