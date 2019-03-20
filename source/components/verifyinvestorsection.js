enyo.kind({
	name: "lumberjack.VerifyInvestorSection",

	published: {
		activeEntry: null,
		database: null,
		header: "",
		readOnly: false,
		// Attachment keys:
		signedAttachmentIdKey: "",// "signedAttachmentID"
		signedFileNameKey: "",// "signedFileName"
		// ID keys:
		idKey: "",
		subIdKey: "",
		// Disable flags:
		disableViewStatus: false,
		disableViewUnsigned: false,
		// Routes:
		routeSendAccountLinkRequest: "",
		routeGetAccountLink: "",
		routeSendVerificationRequestLink: "",
		routeRefreshStatus: "",
		routeSendReminderEmail: "",
		routeDownloadSigned: "",
		routeViewSigned: ""
	},

	_completeStatuses: ["accredited", "not_accredited", "accepted_expire", "declined_expire", "declined_by_investor", "self_not_accredited"],

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
		{name: "lastUpdatedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Last Updated:", style: "line-height: 20px; width: 150px;"},
			{name: "lastUpdatedTimestampLabel", style: "line-height: 20px; margin-left: 10px;"}
		]},
		{style: "margin-top: 10px;", components: [
			{name: "sendEmailButton", kind: "lumberjack.Button", content: "Send Account Link Request", ontap: "handleSendEmailButtonTapped"},
			{name: "getLinkButton", kind: "lumberjack.Button", style: "margin-left: 10px;", enabledClasses: "button copy-button", content: "Get Account Link", ontap: "handleGetLinkButtonTapped"},
			{name: "sendVerificationRequestButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send Verification Request", ontap: "handleSendVerificationRequestButtonTapped"},
			{name: "refreshStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Refresh Status", ontap: "handleRefreshStatusButtonTapped"},
			{name: "sendReminderEmailButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send Reminder Email", ontap: "handleSendReminderEmailButtonTapped"},
			{name: "viewSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Signed Document", ontap: "handleViewSignedButtonTapped"},
			{name: "downloadSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Signed Document", ontap: "handleDownloadSignedButtonTapped"}
		]},
		{name: "documentStatusPopup", kind: "lumberjack.ViewAdobeSignDocumentStatusPopup"}
	],

	bindings: [
		{from: ".header", to: ".$.header.content"},
		{from: ".activeEntry", to: ".$.statusIcon.src", transform: function(v) {
			try
			{
				var identityVerificationDoc = v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc");
				var retVal = "assets/icons/circle-icon-grey.png";

				if (!identityVerificationDoc.linkAccountRequestSent)
				{
					return retVal;
				}

				if (identityVerificationDoc.linkAccountRequestSent && identityVerificationDoc.verifyInvestorID)
				{
					retVal = "assets/icons/circle-icon-red.png";
				}

				if (identityVerificationDoc.verificationRequestID)
				{
					retVal = "assets/icons/circle-icon-yellow.png";
				}

				if (identityVerificationDoc.verificationRequestID && (identityVerificationDoc.verificationRequestStatus === "accredited" || identityVerificationDoc.verificationRequestStatus === "not_accredited"))
				{
					retVal = "assets/icons/circle-icon-green.png";
				}

				return retVal;
			}
			catch (err) { return "assets/icons/circle-icon-grey.png"; }
		}},
		{from: ".activeEntry", to: ".$.statusDescription.content", transform: function(v) {
			try
			{
				var identityVerificationDoc = v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc");
				if (!identityVerificationDoc.linkAccountRequestSent)
				{
					return "An account link request has not been sent yet.";
				}

				if (identityVerificationDoc.linkAccountRequestSent && !identityVerificationDoc.verifyInvestorID)
				{
					return "An account link request has been sent.";
				}

				if (identityVerificationDoc.verifyInvestorID && !identityVerificationDoc.verificationRequestID)
				{
					return "Accounts have been linked, but no verification request has been sent.";
				}

				if (identityVerificationDoc.verificationRequestID)
				{
					switch (identityVerificationDoc.verificationRequestStatus)
					{
						case ("no_verification_request"):
							return "You have no active verification request for this user (investor).";
						case ("waiting_for_investor_acceptance"):
							return "The verification is ready and waiting for the investor to accept it.";
						case ("accepted_by_investor"):
							return "The investor has accepted the verification request but has not yet completed it.";
						case ("waiting_for_review"):
							return " 	Investor has completed the request, and it is now in the reviewers' queue.";
						case ("in_review"):
							return "The verification request has been assigned a reviewer and is under review.";
						case ("accredited"):
							return "The investor is verified as accredited.";
						case ("not_accredited"):
							return "After review, it appears the investor is not accredited.";
						case ("waiting_for_information_from_investor"):
							return "The reviewer has requested additional information from the investor.";
						case ("accepted_expire"):
							return "The verification request has expired. The investor accepted but did not complete.";
						case ("declined_expire"):
							return "The verification request has expired. The investor never accepted.";
						case ("declined_by_investor"):
							return "The investor has declined the verification request.";
						case ("self_not_accredited"):
							return "The investor has declined the verification request.";
					}
				}

				throw null;
			}
			catch (err) { return "No information is available."; }
		}},
		{from: ".activeEntry", to: ".$.lastUpdatedTimestampSection.showing", transform: function(v) {
			try { return v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").lastUpdatedTimestamp > 0; }
			catch (err) { return false; }
		}},
		{from: ".activeEntry", to: ".$.lastUpdatedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").lastUpdatedTimestamp,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.sendEmailButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID ? true : false;
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.getLinkButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID ? true : false;
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.sendVerificationRequestButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return !(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID && !v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestID);
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.refreshStatusButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return !(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestID && this._completeStatuses.indexOf(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestStatus) === -1);
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.sendReminderEmailButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return !(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestStatus === "waiting_for_investor_acceptance");
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.viewSignedDocumentButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return !(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestStatus === "accredited");
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.downloadSignedDocumentButton.disabled", transform: function(v) {
			try
			{
				if (this.get("readOnly") === true) { return true; }
				if (v.get("subscriptionInfo").clientIdentityValidator.verificationStatus === "notVerified") {return true;}
				return !(v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verifyInvestorID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestID && v.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").verificationRequestStatus === "accredited");
			}
			catch (err) { return true; }
		}}
	],

	downloadSigned: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		var route = this.get("routeDownloadSigned");

		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		//If a route has been provided, assume that we are using the route rather than downloading directly from the database
		this.showLoadingPopup("Downloading Signed Document...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to download signed document.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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
	},

	sendAccountLinkRequest: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeSendAccountLinkRequest");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		this.showLoadingPopup("Sending Email...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to get Send Account Link.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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

			alertify.success("Mail Sent");
			this.hideLoadingPopup();

			callback();
		}));

		request.go(parameters);
	},

	getAccountLink: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeGetAccountLink");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		this.showLoadingPopup("Getting Link...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to get Account Link.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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

			alertify.message("Click again if you don't get the success message.");

			//For some reason, this won't work until you click the button the second time - then it works.
			//Since this is a 1.x patch/fix, I'm not going to waste any more time on it.
			var clipboard = new ClipboardJS('.copy-button', {
				text: enyo.bind(this, function(trigger) {
					return response.link;
				})
			});

			clipboard.on('success', enyo.bind(this, function(e) {
				alertify.success("Copied to Clipboard!");
				clipboard.destroy();
			}));

			clipboard.on('error', function(e) {
				alertify.error("Failed to copy to clipboard");
				clipboard.destroy();
			});

			this.hideLoadingPopup();

			callback();
		}));

		request.go(parameters);
	},

	sendVerificationRequest: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeSendVerificationRequestLink");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		this.showLoadingPopup("Sending Verification Request...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to refresh document status.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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

			alertify.success("Verification Request Sent.");
			this.hideLoadingPopup();

			callback();
		}));

		request.go();
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

		this.showLoadingPopup("Refreshing status...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to refresh verify investor status.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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

			if (response.updated)
			{
				alertify.success("Verification status refreshed.");
			}
			else
			{
				alertify.success("Verification status refreshed. No Change.");
			}
			
			this.hideLoadingPopup();

			callback();
		}));

		request.go();
	},

	sendReminderEmail: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		if (this.get("readOnly") === true) { return; }

		var route = this.get("routeSendReminderEmail");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		this.showLoadingPopup("Sending Reminder Email...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to send reminder email.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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

			alertify.success("Email Sent.");

			this.hideLoadingPopup();

			callback();
		}));

		request.go();
	},

	viewSigned: function(callback)
	{
		if (typeof(callback) !== 'function') { callback = function(){}; }

		var route = this.get("routeViewSigned");
		if (typeof(route) !== 'string' || route.trim() === "")
		{
			alertify.error("Route not specified.");
			return;
		}

		this.showLoadingPopup("Loading Signed Document...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to load signed document.");
			this.hideLoadingPopup();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {};
		parameters[this.get("idKey")] = this.get("activeEntry")._id ? this.get("activeEntry")._id : this.get("activeEntry").get("_id");

		// Make this component compatable with the Placement Module requiring two parameters.
		if (this.get("idKey") === "subscriptionID" && this.get("subIdKey") === "placementID")
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
	},

	/***********
	* Handlers *
	***********/

	handleSendEmailButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.sendAccountLinkRequest();
		})});
	},

	handleGetLinkButtonTapped: function(inSender, inEvent)
	{
		this.getAccountLink();
	},

	handleSendVerificationRequestButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.sendVerificationRequest();
		})});
	},

	handleRefreshStatusButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.refreshStatus();
		})});
	},

	handleSendReminderEmailButtonTapped: function(inSender, inEvent)
	{
		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.sendReminderEmail();
		})});
	},

	handleViewSignedButtonTapped: function(inSender, inEvent)
	{
		this.viewSigned();
	},

	handleDownloadSignedButtonTapped: function(inSender, inEvent)
	{
		this.downloadSigned();
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