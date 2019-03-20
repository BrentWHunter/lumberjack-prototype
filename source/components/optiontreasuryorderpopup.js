enyo.kind({
	name: "quantum.OptionTreasuryOrderPopup",
	kind: "quantum.Popup",

	published: {
		activeEntry:null,
		exerciseRecord: null,
		database: null
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	events: {
		onLogout: ""
	},

	subComponents: [
		{style: "height 70%; padding: 10px;", components: [
			{kind: "enyo.FittableRows", style: "font-size: 18px;", components: [
				{kind: "enyo.FittableColumns", components: [
					{style: "width: 170px;", components: [
						{name: "numShares"}
					]},
					{style: "margin-left: 10px; text-align: right; width: 200px;", components: [
						{style: "display: inline-block;", content: "Status:"},
						{name: "documentStatus", style: "display: inline-block; margin-left: 10px;"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
					{name: "documentStatusScroller", kind: "enyo.Scroller", style: "width: 350px; height: 230px; background-color: #EEEEEE;", components: [
						{style: "padding: 10px; color: black;", components: [
							{name: "treasuryOrderGenerateRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderGenerateDocumentButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "Generate Document", ontap: "handleTreasuryOrderGenerateDocumentTapped"}
							]},
							{name: "treasuryOrderDownloadUnsignedRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderDownloadUnsignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "Download Unsigned Document", ontap: "handleTreasuryOrderDownloadUnsignedDocumentTapped"}
							]},
							{name: "treasuryOrderSendForSignatureRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderSendForSignatureButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "Send for Signature", ontap: "handleTreasuryOrderSendForSignatureButtonTapped"}
							]},
							{name: "treasuryOrderViewDocStatusRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderViewDocumentStatusButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "View Status", ontap: "handleTreasuryOrderViewDocumentStatusButtonTapped"}
							]},
							{name: "treasuryOrderRefreshDocStatusRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderRefreshDocumentStatusButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "Refresh Status", ontap: "handleTreasuryOrderRefreshDocumentStatusButtonTapped"}
							]},
							{name: "treasuryOrderViewSignedRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderViewSignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "View Signed Document", ontap: "handleTreasuryOrderDownloadSignedDocumentButtonTapped"}
							]},
							{name: "treasuryOrderDownloadSignedRow", kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
								{name: "treasuryOrderDownloadSignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px; height:24px;", content: "Download Signed Document", ontap: "handleTreasuryOrderDownloadSignedDocumentButtonTapped"}
							]}
						]}
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "doneButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Done"), style: "width: 100px; height: 40px;", ontap: "doneButtonTapped"}
			]}
		]},
		{name: "documentStatusPopup", kind: "quantum.ViewAdobeSignDocumentStatusPopup"}
	],

	bindings: [
		{from: ".exerciseRecord.treasuryDoc", to: ".treasuryDoc"},
		{from: ".exerciseRecord.numShares", to:".$.numShares.content", transform: function(v){
			return v + " shares";
		}},
		{from: ".treasuryDoc.adobe.status", to:".documentStatus"},
		{from: ".treasuryDoc.generated", to: ".docGenerated"},
		{from: ".treasuryDoc.sent", to: ".docSent"},
		{from: ".treasuryDoc.signed", to: ".docSigned"},
		{from: ".documentStatus", to:".$.documentStatus.content", transform: function(v){
			if(this.docSigned){
				return "Document Signed";
			}

			if(this.docSent){
				return "Document Sent";
			}

			if(this.docGenerated){
				return "Document Generated";
			}

			return "Not Generated";
		}},
		{from: ".docGenerated", to: ".$.treasuryOrderDownloadUnsignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".docGenerated", to: ".$.treasuryOrderSendForSignatureButton.disabled", transform: function(v) { return !v; }},
		{from: ".docSent", to: ".$.treasuryOrderViewDocumentStatusButton.disabled", transform: function(v) { return !v; }},
		{from: ".docSent", to: ".$.treasuryOrderRefreshDocumentStatusButton.disabled", transform: function(v) { return !v; }},
		{from: ".docSigned", to: ".$.treasuryOrderViewSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".docSigned", to: ".$.treasuryOrderDownloadSignedDocumentButton.disabled", transform: function(v) { return !v; }}
	],

	show: function()
	{
		this.inherited(arguments);
	},

	doneButtonTapped: function(inSender, inEvent)
	{
		this.exerciseRecord = null;
		this.treasuryDoc = null;
		this.hide();
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.doneButtonTapped();
		}
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	},

	handleTreasuryOrderGenerateDocumentTapped:function(inSender, inEvent)
	{
		this.generateDocument();
	},

	handleTreasuryOrderDownloadUnsignedDocumentTapped:function(inSender, inEvent)
	{
		if (!this.get("docGenerated"))
		{
			alertify.error("No Treasury Order document present");
			return;
		}

		this.handleDownloadDocument({documentID: this.get("exerciseRecord").get("treasuryDoc").unsignedAttachmentID, documentName: this.get("exerciseRecord").get("treasuryDoc").unsignedFileName});
		return true;
	},

	handleTreasuryOrderSendForSignatureButtonTapped:function(inSender, inEvent)
	{
		this.sendForSignature();
	},

	handleTreasuryOrderViewDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "gettreasurydocumentstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to get document status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to get document status");
				console.log(response);
				return;
			}

			this.$.documentStatusPopup.show(response.response);
		}));

		request.go({
			companyID: quantum.preferences.get("company"),
			optionID: this.get("activeEntry").get("_id"),
			attachmentID: this.get("exerciseRecord").get("treasuryDoc").unsignedAttachmentID
		});
	},

	handleTreasuryOrderRefreshDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		this.refreshDocumentStatus();
	},

	handleTreasuryOrderDownloadSignedDocumentButtonTapped:function(inSender, inEvent)
	{
		if (!this.get("treasuryDoc").signed || this.get("treasuryDoc").signedAttachmentID === "" || this.get("treasuryDoc").signedFileName === "")
		{
			alertify.error("No signed issuance document present");
			return;
		}

		this.handleDownloadDocument({documentID: this.get("treasuryDoc").signedAttachmentID, documentName: this.get("treasuryDoc").signedFileName, view: inEvent.originator === this.$.treasuryOrderViewSignedDocumentButton});
	},

	generateDocument: function()
	{
		if (this.get("treasuryDoc") && this.get("treasuryDoc").sent && !this.get("treasuryDoc").signed)
		{
			this.cancelDocument(enyo.bind(this, function(){
				this.generateDocument();
			}));
			return;
		}

		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Generating..."));

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generatetreasuryorderdocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				contactID: this.get("activeEntry").get("holderContactID"),
				optionID: this.get("activeEntry").get("_id"),
				attachmentID: this.get("exerciseRecord").get("exerciseDoc").unsignedAttachmentID,
				dap: false
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Generate Treasury Order Document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Generate Treasury Order Document");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Treasury Order Document Generated!");
			this.$.loadingPopup.hide();
		}));

		request.go();
	},

	cancelDocument: function(callback){
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Cancelling..."));

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "canceltreasuryorderdocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id"),
				attachmentID: this.get("exerciseRecord").get("treasuryDoc").unsignedAttachmentID
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Cancel Issuance Document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Cancel Issuance Document");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Issuance Document Cancelled!");
			this.$.loadingPopup.hide();
			if (callback) {callback();}
		}));

		request.go();
	},

	sendForSignature: function(inSender, inEvent){
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendtreasuryorderdocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id"),
				attachmentID: this.get("exerciseRecord").get("treasuryDoc").unsignedAttachmentID
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send document for signature");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to send document for signature");
				console.log(response);
				return;
			}

			alertify.success("Document Sent!");
		}));

		request.go();
	},

	refreshDocumentStatus: function()
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "refreshtreasuryorderdocumentstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to refresh document status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to refresh document status");
				console.log(response);
				return;
			}

			alertify.success("Successfully updated document status.");
		}));

		request.go({
			companyID: quantum.preferences.get("company"),
			optionID: this.get("activeEntry").get("_id"),
			attachmentID: this.get("exerciseRecord").get("treasuryDoc").unsignedAttachmentID
		});
	},

	handleDownloadDocument: function(inEvent)
	{
		if (this.get("activeEntry").get("_attachments") && this.get("activeEntry").get("_attachments")[inEvent.documentID])
		{
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
			this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Login Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), inEvent.documentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();

					if (inEvent.view && inEvent.fileType)
					{
						//Do this when we need to force a specific filetype for the viewer.
						var reader = new FileReader();
						reader.addEventListener("loadend", enyo.bind(this, function() {
							// rebuild the blob because it's coming back from the couchdb server with the wrong MIME type
							var fileType = inEvent.fileType;
							var fileData = reader.result;
							var url = URL.createObjectURL(new Blob([reader.result], {type: fileType}));
							window.open(url);
						}));

						reader.readAsArrayBuffer(response);
					}
					else if (inEvent.view)
					{
						window.open(URL.createObjectURL(response));
					}
					else
					{
						saveAs(response, inEvent.documentName);
					}
				}));
			}));
		}
		else
		{
			alertify.error("Unable to find " + inEvent.documentName);
		}
	}
});