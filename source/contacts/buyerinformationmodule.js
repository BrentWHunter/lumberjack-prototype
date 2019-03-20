/* global numeral,moment */ 
enyo.kind({
	name: "quantum.BuyerInformationModule",

	events: {
		onDownloadDocument: "",
		onRequestSave: "",
		onViewEventDetail: "",
		onLogout: ""
	},

	published: {
		contactInfo: null,
		buyerInfo: null,
		buyerType: "",
		buyerJurisdiction: "",
		buyerRegistrationPackageGenerated: false,
		buyerRegistrationPackageGeneratedTimestamp: null,
		buyerRegistrationPackageSent: false,
		buyerRegistrationPackageSigned: false,
		buyerRegistrationPackageToUpload: null
	},

	computed: {
		buyerRegistrationPackageStatus: ["buyerRegistrationPackageGenerated", "buyerRegistrationPackageSent", "buyerRegistrationPackageSigned"]
	},

	components: [
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Buyer Information"},
		{style: "width: 50%; padding-left: 5px;", components: [
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Shares from Pending Purchases", style: "line-height: 38px; width: 250px;"},
				{kind: "onyx.InputDecorator", style: "margin-left: 10px;", components: [
					{name: "numSharesAfterPendingTransactionsInput", kind: "onyx.Input", disabled: true, style: "width: 275px;"}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Referrer", style: "line-height: 38px; width: 250px;"},
				{kind: "onyx.InputDecorator", style: "margin-left: 10px;", components: [
					{name: "referrerInput", kind: "onyx.Input", disabled: true, style: "width: 275px;"}
				]}
			]}
		]},
		{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Pending Purchases"},
		{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Transaction Date", style: "width: 150px;"},
			{content: "Source", style: "width: 300px;"},
			{content: "Number of Shares", style: "width: 150px;"},
			{content: "Price Per Share", style: "width: 150px;"},
			{content: "Description", style: "min-width: 500px;"}
		]},
		{name: "pendingTransactionsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupPendingTransactionItem", components: [
			{name: "pendingTransactionItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "transactionDate", style: "width: 150px; line-height: 34px;"},
				{name: "transactionSource", style: "width: 300px; line-height: 34px;"},
				{name: "numShares", style: "width: 150px; line-height: 34px;"},
				{name: "pricePerShare", style: "width: 150px; line-height: 34px;"},
				{name: "description", style: "width: 500px; line-height: 34px;"},
				{name: "viewButton", kind: "quantum.Button", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View Detail", ontap: "viewPendingTransactionDetailButtonTapped"}
			]}
		]},
		{name: "noPendingTransactionsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Pending Purchases"},
		{name: "exemptionTypeSection", components: [
			{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Accredited Investor Qualification"},
			{name: "investorSection", kind: "quantum.Investor", style: "margin-top: 10px;"}
		]},
		{name: "buyerRegistrationPackageSection", components: [
			{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Buyer Package"},
			{style: "margin-top: 10px;", components: [
				{name: "buyerRegistrationPackageStatusIcon", kind: "enyo.Image", style: "margin-left: 5px; height: 32px; width: 32px;"},
				{name: "buyerRegistrationPackageStatusDescription", style: "margin-left: 10px; display: inline-block;"}
			]},
			{name: "buyerRegistrationPackageGeneratedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Buyer Registration Package Generated", style: "line-height: 30px; width: 350px;"},
				{name: "buyerRegistrationPackageGeneratedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "buyerRegistrationPackageSentForSignatureTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Buyer Registration Package Sent for Signature", style: "line-height: 30px; width: 350px;"},
				{name: "buyerRegistrationPackageSentForSignatureTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "buyerRegistrationPackageSignedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Buyer Registration Package Agreement Signed", style: "line-height: 30px; width: 350px;"},
				{name: "buyerRegistrationPackageSignedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{style: "margin-top: 10px;", components: [
				{name: "generateDocumentButton", kind: "quantum.Button", content: "Generate Buyer Registration Document", ontap: "handleGenerateDocumentButtonTapped"},
				{name: "downloadUnsignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Download Unsigned Document", ontap: "handleDownloadUnsignedDocumentTapped"},
				{name: "sendForSignatureButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Send for Signature", ontap: "handleSendForSignatureButtonTapped"},
				{name: "viewDocumentStatusButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "View Document Status", ontap: "handleViewDocumentStatusButtonTapped"},
				{name: "refreshDocumentStatusButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Refresh Document Status", ontap: "handleRefreshDocumentStatusButtonTapped"},
				{name: "viewSignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "View Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"},
				{name: "downloadSignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Download Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{name: "supportingDocuments", kind: "quantum.SupportingDocuments", module: "contact", style: "width: 50%", onAddDocument: "handleAddDocument", downloadDirect: false}
		]},
		{name: "documentStatusPopup", kind: "quantum.ViewAdobeSignDocumentStatusPopup"}
	],

	bindings: [
		{from: ".buyerInfo.numSharesAfterPendingTransactions", to: ".$.numSharesAfterPendingTransactionsInput.value", transform: function(v){
			try
			{
				return numeral(v).format("0,0");
			}
			catch (e)
			{
				return 0;
			}
		}},
		{from: ".buyerInfo.referrer", to: ".$.referrer.value", transform: function(v){
			if (v) {return v;} else {return "";}
		}},
		{from: ".buyerInfo.pendingTransactions", to: ".$.pendingTransactionsRepeater.showing", transform: function(v){
			try
			{
				return v.length > 0;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".buyerInfo.pendingTransactions", to: ".$.noPendingTransactionsLabel.showing", transform: function(v){
			try
			{
				return v.length === 0;
			}
			catch (e)
			{
				return true;
			}
		}},
		{from: ".buyerInfo.pendingTransactions", to: ".$.pendingTransactionsRepeater.count", transform: function(v){
			try
			{
				this.$.pendingTransactionsRepeater.setCount(v.length);
				return v.length;
			}
			catch (e)
			{
				return 0;
			}
		}},
		{from: ".buyerRegistrationPackageStatus", to: ".$.buyerRegistrationPackageStatusIcon.src", transform: function(v) {
			switch (v)
			{
				case "signed":
					return "assets/icons/circle-icon-green.png";
				case "sent":
					return "assets/icons/circle-icon-yellow.png";
				case "generated":
					return "assets/icons/circle-icon-red.png";
				case "none":
					return "assets/icons/circle-icon-grey.png";
				default:
					return "assets/icons/circle-icon-grey.png";
			}
		}},
		{from: ".buyerRegistrationPackageStatus", to: ".$.buyerRegistrationPackageStatusDescription.content", transform: function(v) {
			switch (v)
			{
				case "signed":
					return "Buyer Registration Package Signed";
				case "sent":
					return "Buyer Registration Package Sent";
				case "generated":
					return "Buyer Registration Package Generated";
				case "none":
					return "No Buyer Registration Package Present";
				default:
					return "Status Unknown";
			}
		}},
		//FIX
		{from: ".buyerInfo.registrationDoc.generated", to: ".buyerRegistrationPackageGenerated", transform: function(v){  
			try
			{
				var data = v; 
				if (data) { return data; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".buyerRegistrationPackageGenerated", to: ".$.downloadUnsignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".buyerInfo.registrationDoc.sent", to: ".buyerRegistrationPackageSent"},
		{from: ".buyerRegistrationPackageStatus", to: ".$.sendForSignatureButton.disabled", transform: function(v) { return v !== "generated"; }},
		{from: ".buyerRegistrationPackageStatus", to: ".$.viewDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed"); }},
		{from: ".buyerRegistrationPackageStatus", to: ".$.refreshDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed"); }},
		{from: ".buyerInfo.registrationDoc.signed", to: ".buyerRegistrationPackageSigned"},
		{from: ".buyerInfo.registrationDoc.signed", to: ".$.downloadSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".buyerInfo.registrationDoc.signed", to: ".$.viewSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".buyerInfo", to: ".buyerRegistrationPackageToUpload", transform: function(v) {
			//Use the binding to force the "subscription agreement to upload" object to reset when the activeEntry changes.
			return null;
		}},
		{from: ".buyerInfo", to: ".buyerRegistrationPackageGeneratedTimestamp", transform: function(v) {
			//Use the binding to force the "subscription agreement generated timestamp" object to reset when the activeEntry changes.
			return null;
		}},
		{from: ".buyerRegistrationPackageStatus", to: ".$.buyerRegistrationPackageGeneratedTimestampSection.showing", transform: function(v) { return v === "generated" || v === "sent" || v === "signed"; }},
		//This binding fires first.
		{from: ".buyerRegistrationPackageGeneratedTimestamp", to: ".$.buyerRegistrationPackageGeneratedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		//This binding fires second, and will overwrite the first binding result, but the first will fire again on change, if necessary.
		{from: ".buyerInfo.registrationDoc.generatedTimestamp", to: ".$.buyerRegistrationPackageGeneratedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".buyerRegistrationPackageStatus", to: ".$.buyerRegistrationPackageSentForSignatureTimestampSection.showing", transform: function(v) { return v === "sent" || v === "signed"; }},
		{from: ".buyerInfo.registrationDoc.sentTimestamp", to: ".$.buyerRegistrationPackageSentForSignatureTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".buyerRegistrationPackageStatus", to: ".$.buyerRegistrationPackageSignedTimestampSection.showing", transform: function(v) { return v === "signed"; }},
		{from: ".buyerInfo.registrationDoc.signedTimestamp", to: ".$.buyerRegistrationPackageSignedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".buyerJurisdiction", to: ".$.investorSection.jurisdiction"},
		{from: ".buyerJurisdiction", to: ".$.exemptionTypeSection.showing", transform: function(v){
			return v !== "international";
		}},
		{from: ".buyerType", to: ".$.investorSection.investorType"},
		{from: ".buyerInfo", to: ".$.investorSection.exemptionQualification", transform: function(v){  
			try
			{
				var data = v.get("accreditedInvestorQualification"); 
				if (data) { return data; }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".buyerInfo", to: ".$.supportingDocuments.documentsReceived", transform: function(v) {
			try
			{
				var data = v.get("documentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".contactInfo", to: ".$.supportingDocuments.activeEntry"}
	],

	/******************************
	* Computed Property Functions *
	******************************/

	buyerRegistrationPackageStatus: function()
	{
		if (this.get("buyerRegistrationPackageSigned"))
		{
			return "signed";
		}

		if (this.get("buyerRegistrationPackageSent"))
		{
			return "sent";
		}

		if (this.get("buyerRegistrationPackageGenerated"))
		{
			return "generated";
		}

		return "none";
	},

	setupPendingTransactionItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var pendingTransactionItem = this.get("buyerInfo").get("pendingTransactions").at(inEvent.index);

		inEvent.item.$.pendingTransactionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.transactionDate.set("content", moment(pendingTransactionItem.get("timestamp")).format("YYYY/MM/DD"));
		switch(pendingTransactionItem.get("transactionSource"))
		{
			case "placement":
				inEvent.item.$.transactionSource.set("content", "Placement Subscription");
				break;
			case "transfer":
				inEvent.item.$.transactionSource.set("content", "Transfer");
				break;
			case "option":
				inEvent.item.$.transactionSource.set("content", "Option Exercise");
				break;
			case "warrant":
				inEvent.item.$.transactionSource.set("content", "Warrant Exercise");
				break;
			default:
				inEvent.item.$.transactionSource.set("content", "Unknown");
		}

		inEvent.item.$.numShares.set("content", (pendingTransactionItem.get("transactionType") === "increase" ? "+" : "-") + numeral(pendingTransactionItem.get("numShares")).format("0,0"));
		var pricePerShareContent;
		if (pendingTransactionItem.get("pricePerShare") === 0){
			pricePerShareContent = "Nominal";
		}
		else
		{
			pricePerShareContent = "$" + quantum.formatCurrency(pendingTransactionItem.get("pricePerShare"));
		}
		inEvent.item.$.pricePerShare.set("content", pricePerShareContent);
		inEvent.item.$.description.set("content", pendingTransactionItem.get("description"));
		inEvent.item.$.viewButton.set("disabled", pendingTransactionItem.get("sourceDatabase") === "" || pendingTransactionItem.get("sourceRecord") === "");

		return true;
	},

	viewPendingTransactionDetailButtonTapped: function(inSender, inEvent)
	{
		//TODO: Update for other types of transactions
		var transferDataItem = this.get("buyerInfo").get("pendingTransactions").at(inEvent.index);

		this.doViewEventDetail({mode: "transfer", target: transferDataItem.get("sourceRecord")});
	},

	clearBorderError: function() {
		this.$.investorSection.clearBorderError();
	},

	validateInputs: function() {
		var isValid = true;

		// Accredited Investor Qualification:
		try
		{
			if (this.get("buyerJurisdiction") !== "international" && this.$.investorSection.getAccreditedInvestorQualification().length <= 0) { throw null; }
		}
		catch (err)
		{
			this.$.investorSection.flagInvalid();
			isValid = false;
		}

		return isValid;
	},

	save: function() {
		this.get("buyerInfo").set("accreditedInvestorQualification", this.$.investorSection.getAccreditedInvestorQualification());

		//Delete Documents and Document Attachments we've set to be deleted
		for(var i = 0; i < this.$.supportingDocuments.get("documentsToDelete").length; i++)
		{
			delete this.get("contactInfo").get("_attachments")[this.$.supportingDocuments.documentsToDelete[i]];
			//Edit the contactInfo documentsReceived to match our delete
			var itemToFind = this.$.supportingDocuments.get("documentsToDelete")[i];
			var result = this.get("buyerInfo").get("documentsReceived").find(function(value, index, array) {
				return value.attachmentID === itemToFind;
			});
			if (result)
			{
				this.get("buyerInfo").get("documentsReceived").splice(this.get("buyerInfo").get("documentsReceived").indexOf(result), 1);
			}
		}

		//Upload documents if we have any documents to upload
		if (this.$.supportingDocuments.get("documentsToUpload").length > 0)
		{
			//First, make sure that _attachments and documentsReceived are initialized
			if (!this.get("buyerInfo").get("documentsReceived")) {this.get("buyerInfo").set("documentsReceived", []);}
			if (!this.get("contactInfo").get("_attachments")) {this.get("contactInfo").set("_attachments", {});}

			//Next, add any that we have to upload
			this.$.supportingDocuments.get("documentsToUpload").forEach(enyo.bind(this, function(value, index, array) {
				this.get("buyerInfo").get("documentsReceived").push(
				{
					description: value.description,
					name: value.name,
					fileType: value.fileType,
					receivedDate: value.receivedDate,
					attachmentID: value.attachmentID
				});

				this.get("contactInfo").get("_attachments")[value.attachmentID] = {
					"content_type": value.fileType,
					"data": new Blob([new Uint8Array(value.fileData)], {type: value.fileType})
				};
			}));
		}
	},

	isDirty: function() 
	{
		if (this.get("buyerInfo"))
		{
			if(this.get("buyerJurisdiction") !== "international" && this.$.investorSection.getAccreditedInvestorQualification().length === 0)
			{
				return true;
			}

			return (JSON.stringify(this.get("buyerInfo").get("accreditedInvestorQualification")) !== JSON.stringify(this.$.investorSection.getAccreditedInvestorQualification()) || this.$.supportingDocuments.isDirty());
		}
		else
		{
			return false;
		}
		return false;
	},

	activate: function() 
	{
		this.$.supportingDocuments.refreshRepeater();
	},

	/******************
	* Button Handlers *
	******************/

	handleGenerateDocumentButtonTapped: function(inSender, inEvent)
	{
		this.doRequestSave({callback: enyo.bind(this, function(){
			this.generateDocument();
		})});
	},

	generateDocument: function()
	{
		if (this.get("buyerInfo").get("registrationDoc").sent && !this.get("buyerInfo").get("registrationDoc").signed)
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
			url: quantum.preferences.get("apiServer") + "generatebuyerregistrationpackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				contactID: this.get("contactInfo").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Generate Buyer Package");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Generate Buyer Package");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Buyer Registration Package Generated!");
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
			url: quantum.preferences.get("apiServer") + "cancelbuyerregistrationpackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				contactID: this.get("contactInfo").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Cancel Buyer Package");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Cancel Buyer Package");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Buyer Registration Package Cancelled!");
			this.$.loadingPopup.hide();
			if (callback) {callback();}
		}));

		request.go();
	},

	handleDownloadUnsignedDocumentTapped: function(inSender, inEvent)
	{
		if (!this.get("buyerRegistrationPackageGenerated"))
		{
			alertify.error("No Buyer Registration Package document present");
			return;
		}

		this.doDownloadDocument({documentID: this.get("buyerInfo").get("registrationDoc").unsignedAttachmentID, documentName: this.get("buyerInfo").get("registrationDoc").unsignedFileName});
		return true;
	},

	handleSendForSignatureButtonTapped: function(inSender, inEvent){
		this.doRequestSave({callback: enyo.bind(this, function(){
			this.sendForSignature();
		})});
	},

	sendForSignature: function(inSender, inEvent){
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendbuyerregistrationpackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				contactID: this.get("contactInfo").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send document for signature");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
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

	handleViewDocumentStatusButtonTapped: function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getbuyerregistrationpackagestatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to get document status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
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
			contactID: this.get("contactInfo").get("_id")
		});
	},

	handleRefreshDocumentStatusButtonTapped: function(inSender, inEvent)
	{
		this.doRequestSave({callback: enyo.bind(this, function(){
			this.refreshDocumentStatus();
		})});
	},

	refreshDocumentStatus: function()
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "refreshbuyerregistrationpackagestatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to refresh document status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
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
			contactID: this.get("contactInfo").get("_id")
		});
	},

	handleDownloadSignedDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.get("buyerInfo").get("registrationDoc").signed || this.get("buyerInfo").get("registrationDoc").signedAttachmentID === "")
		{
			alertify.error("No signed buyer registration package present");
			return;
		}

		this.doDownloadDocument({documentID: this.get("buyerInfo").get("registrationDoc").signedAttachmentID, documentName: this.get("buyerInfo").get("registrationDoc").signedFileName, view: inEvent.originator === this.$.viewSignedDocumentButton});
	},

	handleAddDocument: function(inSender, inEvent)
	{
		var byName = function(value, index, array)
		{
			return value.name === inEvent.payload.name;
		};

		//Check For Collisions Against Other Supporting Documents.
		if (this.$.supportingDocuments.get("documentsToUpload").find(byName) !== undefined || this.$.supportingDocuments.get("documentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		this.$.supportingDocuments.get("documentsToUpload").push(inEvent.payload);
		this.$.supportingDocuments.get("documentsReceived").push(
		{
			name: inEvent.payload.name,
			description: inEvent.payload.description,
			receivedDate: inEvent.payload.receivedDate,
			fileType: inEvent.payload.fileType,
			fileData: inEvent.payload.fileData,
			attachmentID: inEvent.payload.attachmentID,
			localDownload: true
		});
		this.$.supportingDocuments.refreshRepeater();
		alertify.success("Document Uploaded!");
	}
});