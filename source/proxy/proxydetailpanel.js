enyo.kind({
	name: "quantum.ProxyDetailPanel",
	kind: "enyo.Scroller",
	//fit: true,

	style: "padding: 15px; width: 100%;",

	published: {
		database: null,
		activeEntry: null,
		proxyCollection: null,
		proxyDocStatus: "",
		proxyDocGenerated: false,
		proxyDocSent: false,
		proxyDocSigned: false
	},

	events: {
		onGoBack: "",
		onViewEventDetail: "",
		onLogout: ""
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Proxy Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "saveChangesButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Save Changes", ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]}
		]},
		{kind:"enyo.FittableColumns", style: "padding-top: 5px;", components:[
			{style: "width: 50%;", components: [
				{kind: "quantum.Input", name:"contactNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Contact Name", disabled: true},
				{name: "corporateProxySection", components: [
					{kind: "quantum.Input", name:"contactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Contact Person", disabled: true},
					{kind: "quantum.Input", name:"contactPersonTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Contact Person Title", disabled: true}
				]},
				{kind: "quantum.Input", name:"emailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Email", required:true},
				{kind: "quantum.Input", name:"numSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Number of Shares", disabled: true},
				{kind: "quantum.Input", name:"shareholderIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Shareholder ID", disabled: true},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{name: "viewContactButton", kind: "quantum.Button", style: "line-height: 34px; width: 150px;", content: "View Contact", ontap: "handleViewContactButtonTapped"},
					{name: "viewRawDataButton", kind: "quantum.Button", style: "margin-left: 10px; line-height: 34px;", content: "Dump Raw Data", ontap: "handleViewRawDataButtonTapped"},
					{name: "cancelDocumentButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin-left: 10px; line-height: 34px;", content: "Cancel Proxy", ontap: "handleCancelDocumentButtonTapped"}
				]}
			]}
		]},
		{name: "proxyDocumentSection", components: [
			{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Proxy Document"},
			{style: "margin-top: 10px;", components: [
				{name: "proxyDocStatusIcon", kind: "enyo.Image", style: "margin-left: 5px; height: 32px; width: 32px;"},
				{name: "proxyDocStatusDescription", style: "margin-left: 10px; display: inline-block;"}
			]},
			{name: "proxyDocGeneratedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Proxy Document Generated", style: "line-height: 30px; width: 350px;"},
				{name: "proxyDocGeneratedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "proxyDocSentForSignatureTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Proxy Document Sent for Signature", style: "line-height: 30px; width: 350px;"},
				{name: "proxyDocSentForSignatureTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "proxyDocSignedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Proxy Document Agreement Signed", style: "line-height: 30px; width: 350px;"},
				{name: "proxyDocSignedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{style: "margin-top: 10px;", components: [
				//{name: "generateDocumentButton", kind: "quantum.Button", content: "Generate Document", ontap: "handleGenerateDocumentButtonTapped"},
				{name: "downloadUnsignedDocumentButton", kind: "quantum.Button", /*style: "margin-left: 10px;",*/ content: "Download Unsigned Document", ontap: "handleDownloadUnsignedDocumentTapped"},
				{name: "sendForSignatureButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Send for Signature", ontap: "handleSendForSignatureButtonTapped"},
				{name: "viewDocumentStatusButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "View Document Status", ontap: "handleViewDocumentStatusButtonTapped"},
				{name: "refreshDocumentStatusButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Refresh Document Status", ontap: "handleRefreshDocumentStatusButtonTapped"},
				{name: "sendReminderButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Send Reminder", ontap: "handleSendReminderButtonTapped"},
				{name: "viewSignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "View Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"},
				{name: "downloadSignedDocumentButton", kind: "quantum.Button", style: "margin-left: 10px;", content: "Download Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"}
			]}
		]},
		{name: "proxyQuestionsSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Proxy Answers"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "#", style: "width: 50px;"},
				{content: "Question", style: "width: 600px;"},
				{content: "Management Recommendation", style: "width: 150px; text-align: center;"},
				{content: "Answer", style: "width: 150px; text-align: left;"}
			]},
			{name: "proxyQuestionsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupProxyQuestionRepeaterItem", components: [
				{name: 'questionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "questionNumber", style: "width: 50px;"},
					{name: "question", style: "width: 600px; padding-right: 15px;"},
					{name: "managementRecommendation", style: "width: 150px; text-align: center;"},
					{name: "answer", style: "width: 150px; text-align: left;"}
				]}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"},
		{name: "documentStatusPopup", kind: "quantum.ViewAdobeSignDocumentStatusPopup"}
	],
	bindings: [
		{from: ".activeEntry.contactName", to: ".$.contactNameInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.contactPerson", to: ".$.corporateProxySection.showing", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return true;
				}
				else { throw null; }
			}
			catch (err)
			{
				return false;
			}
		}},
		{from: ".activeEntry.contactPerson", to: ".$.contactPersonInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.contactPerson", to: ".$.contactPersonTitleInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.email", to: ".$.emailInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.numShares", to: ".$.numSharesInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return numeral(val).format("0,0");
				}
				else { throw null; }
			}
			catch (err)
			{
				return 0;
			}
		}},
		{from: ".activeEntry.shareholderID", to: ".$.shareholderIDInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.proxyDoc", to:".proxyDocStatus", transform: function(v){
			if(v.signed){
				return "signed";
			}else if(v.sent){
				return "sent";
			}else if(v.generated){
				return "generated";
			}else{
				return "none";
			}
		}},
		{from: ".proxyDocStatus", to: ".$.proxyDocStatusIcon.src", transform: function(v) {
			switch (v)
			{
				case "signed":
				case "SIGNED":
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
		{from: ".proxyDocStatus", to: ".$.proxyDocStatusDescription.content", transform: function(v) {
			switch (v)
			{
				case "signed":
				case "SIGNED":
					return "Proxy Document Signed";
				case "sent":
					return "Proxy Document Sent";
				case "generated":
					return "Proxy Document Generated";
				case "none":
					return "No Proxy Document Present";
				default:
					return "Status Unknown";
			}
		}},
		{from: ".activeEntry.proxyDoc.generated", to: ".proxyDocGenerated"},
		{from: ".proxyDocGenerated", to: ".$.generateDocumentButton.disabled", transform: function(v) { return v; }},
		{from: ".proxyDocGenerated", to: ".$.downloadUnsignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".activeEntry.proxyDoc.sent", to: ".proxyDocSent"},
		{from: ".proxyDocSent", to: ".$.emailInput.disabled"},
		{from: ".proxyDocStatus", to: ".$.sendForSignatureButton.disabled", transform: function(v) { return v !== "generated" || !this.canEdit(); }},
		{from: ".proxyDocStatus", to: ".$.cancelDocumentButton.disabled", transform: function(v) { return !(v === "sent" || (v === "signed" || v === "SIGNED" && this.canEdit())); }},
		{from: ".proxyDocStatus", to: ".$.viewDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed" || v === "SIGNED"); }},
		{from: ".proxyDocStatus", to: ".$.refreshDocumentStatusButton.disabled", transform: function(v) { return v !== "sent"; }},
		{from: ".proxyDocStatus", to: ".$.sendReminderButton.disabled", transform: function(v) { return v !== "sent"; }},
		{from: ".activeEntry.proxyDoc.signed", to: ".proxyDocSigned"},
		{from: ".proxyDocSigned", to: ".$.viewRawDataButton.disabled", transform: function(v) { return !v; }},
		{from: ".proxyDocSigned", to: ".$.downloadSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".proxyDocSigned", to: ".$.viewSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".proxyDocGenerated", to: ".$.proxyDocGeneratedTimestampSection.showing"},
		{from: ".activeEntry.proxyDoc.generatedTimestamp", to: ".$.proxyDocGeneratedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyDocSent", to: ".$.proxyDocSentForSignatureTimestampSection.showing"},
		{from: ".activeEntry.proxyDoc.sentTimestamp", to: ".$.proxyDocSentForSignatureTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyDocSigned", to: ".$.proxyDocSignedTimestampSection.showing"},
		{from: ".activeEntry.proxyDoc.signedTimestamp", to: ".$.proxyDocSignedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyDocSigned", to: ".$.proxyQuestionsSection.showing"},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("proxyCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === 0; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("proxyCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1; }
				else { throw null; }
			}
			catch (err) { return true; }
		}}
	],
	//Setup
	activate: function(activeEntry)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { this.doGoHome(); return; }

		this.clearBorderError();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new proxyModel());
		if (activeEntry != null) {
			this.set("activeEntry", activeEntry);
		}

		this.setShowingForRoles();
		this.setDisabledForRoles();

		this.$.proxyQuestionsRepeater.setCount(quantum.preferences.get("proxyInfo").questions.length);
	},

	setShowingForRoles: function()
	{
		var showing = this.canEdit();

		this.$.viewRawDataButton.set("showing", showing);
		this.$.cancelDocumentButton.set("showing", showing);
	},

	setDisabledForRoles: function()
	{
		var disabled = !this.canEdit();

		this.$.saveChangesButton.set("disabled", disabled);
	},

	canEdit: function()
	{
		return quantum.hasRole(["admins"], "proxy");
	},

	//Repeater
	setupProxyQuestionRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins", "users", "auditors"], "proxy")) { return; }

		if (!inEvent.item) {return true;}
		//Cheat, since we need to run this operation as part of setting up the header anyways.
		
		var questions = quantum.preferences.get("proxyInfo").questions;
		var answer = this.get("activeEntry").get("questions")[inEvent.index] || {};
		inEvent.item.$.questionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.questionNumber.set("content", inEvent.index + 1 + ".");
		inEvent.item.$.question.set("content", questions[inEvent.index].questionText);
		if (questions[inEvent.index].type === "boolean")
		{
			inEvent.item.$.managementRecommendation.set("content", questions[inEvent.index].defaultAnswer ? "For" : "Against");
			inEvent.item.$.answer.set("content", answer.answer ? "For" : "Against");
		}		
		else
		{
			inEvent.item.$.managementRecommendation.set("content", questions[inEvent.index].defaultAnswer);
			inEvent.item.$.answer.set("content", answer.answer);
		}

		return true;
	},

	//Validation
	clearBorderError: function()
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "quantum.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	validateInputs:function(options)
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		if (!this.$.emailInput.validate()) {isValid = false;}

		return isValid;
	},

	handleSaveEntryButtonTapped:function(inSender, inEvent, options)
	{
		if (!this.canEdit()) { return; }

		if (!this.validateInputs(options)) { return; }

		//if (!this.isDirty()) { return; }

		this.$.loadingPopup.show("Saving...");

		this.get("activeEntry").set("email", this.$.emailInput.get("value"));

		var tempEntry = JSON.parse(JSON.stringify(this.get("activeEntry")));
		tempEntry._attachments = this.get("activeEntry").get("_attachments");

		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
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

			this.get("database").post(tempEntry, enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Entry Update Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				this.get("activeEntry").set("_rev", response.rev);

				// Force bindings to refresh by re-activating the panel.
				this.activate(this.get("activeEntry"));

				this.$.loadingPopup.hide();
				alertify.success("Entry Updated");
				if (options && options.callback)
				{
					options.callback();
				}
			}));
		}));
	},

	isDirty:function()
	{
		if (!this.get("activeEntry")) { return false; }

		var isDirtyArray = [
			this.get("activeEntry").get("email") !== this.$.emailInput.get("value")
		];

		//console.log(isDirtyArray);

		return (isDirtyArray.indexOf(true)!==-1);
	},

	//Navigation
	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.doGoBack();
	},

	handleNextEntryButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.next_saveChangesPopup)
			{
				this.$.next_saveChangesPopup.hide();
				this.$.next_saveChangesPopup.destroy();
			}
			this.createComponent({name: "next_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "nextEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}
		else { this.nextEntry(inSender, inEvent); }
	},

	nextEntry: function(inSender, inEvent)
	{
		this.activate(this.get("proxyCollection").at(this.get("proxyCollection").indexOf(this.get("activeEntry")) + 1));
	},

	handlePreviousEntryButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.previous_saveChangesPopup)
			{
				this.$.previous_saveChangesPopup.hide();
				this.$.previous_saveChangesPopup.destroy();
			}
			this.createComponent({name: "previous_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "previousEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.previous_saveChangesPopup.show("Save changes?");
		}
		else { this.previousEntry(inSender, inEvent); }
	},

	previousEntry: function(inSender, inEvent)
	{
		this.activate(this.get("proxyCollection").at(this.get("proxyCollection").indexOf(this.get("activeEntry")) - 1));
	},

	//User search
	handleViewContactButtonTapped: function(inSender, inEvent)
	{
		this.doViewEventDetail({mode: "contacts", target: this.get("activeEntry").get("contactID")});
		return true;
	},

	handleViewRawDataButtonTapped: function(inSender, inEvent)
	{
		alertify.success("Dumped to console!");
		console.log(this.get("activeEntry").get("rawData"));
		return true;
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	//Issuance Docs Handlers
	handleGenerateDocumentButtonTapped: function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.generateDocument();
		})});
	},

	handleCancelDocumentButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.get("activeEntry").get("proxyDoc").signed)
		{
			//Manually clear the local record and write to the database as an API workaround.
			var proxyDoc = this.get("activeEntry").get("proxyDoc");
			delete this.get("activeEntry").get("_attachments")[proxyDoc.signedAttachmentID];
			proxyDoc.sent = false;
			proxyDoc.sentTimestamp = 0;
			proxyDoc.signed = false;
			proxyDoc.signedTimestamp = 0;
			proxyDoc.signedAttachmentID = "";
			proxyDoc.signedFileName = "";
			proxyDoc.adobe.agreementID = "";
			proxyDoc.adobe.status = "";
			proxyDoc.adobe.statusTimestamp = 0;

			this.handleSaveEntryButtonTapped();
		}
		else if (this.get("activeEntry").get("proxyDoc").sent && !this.get("activeEntry").get("proxyDoc").signed)
		{
			this.cancelDocument();
			return;
		}		
	},

	handleDownloadUnsignedDocumentTapped:function(inSender, inEvent)
	{
		if (!this.get("proxyDocGenerated"))
		{
			alertify.error("No Proxy document present");
			return;
		}

		this.handleDownloadDocument({documentID: this.get("activeEntry").get("proxyDoc").unsignedAttachmentID, documentName: this.get("activeEntry").get("proxyDoc").unsignedFileName});
		return true;
	},

	handleSendForSignatureButtonTapped:function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.sendForSignature();
		})});
	},

	handleViewDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getproxypackagestatus",
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
			proxyID: quantum.preferences.get("proxyDatabase"),
			proxyRecordID: this.get("activeEntry").get("_id")
		});
	},

	handleRefreshDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.refreshDocumentStatus();
		})});
	},

	handleSendReminderButtonTapped:function(inSender, inEvent)
	{
		this.sendReminder();
	},

	handleDownloadSignedDocumentButtonTapped:function(inSender, inEvent)
	{
		if (!this.get("activeEntry").get("proxyDoc").signed || this.get("activeEntry").get("proxyDoc").signedAttachmentID === "" || this.get("activeEntry").get("proxyDoc").signedFileName === "")
		{
			alertify.error("No signed proxy document present");
			return;
		}

		this.handleDownloadDocument({documentID: this.get("activeEntry").get("proxyDoc").signedAttachmentID, documentName: this.get("activeEntry").get("proxyDoc").signedFileName, view: inEvent.originator === this.$.viewSignedDocumentButton});
	},

	//Proxy Doc functions
	generateDocument: function()
	{
		if (this.get("activeEntry").get("proxyDoc").sent && !this.get("activeEntry").get("proxyDoc").signed)
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
			url: quantum.preferences.get("apiServer") + "generateproxydocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: quantum.preferences.get("company"),
				proxyID: quantum.preferences.get("proxyDatabase"),
				proxyRecordID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Generate Proxy Document");
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
				alertify.error("Failed to Generate Proxy Document");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Proxy Document Generated!");
			this.$.loadingPopup.hide();
		}));

		request.go();
	},

	cancelDocument: function(callback)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Cancelling..."));

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "cancelproxypackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: quantum.preferences.get("company"),
				proxyID: quantum.preferences.get("proxyDatabase"),
				proxyRecordID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Cancel Proxy Document");
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
				alertify.error("Failed to Cancel Proxy Document");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Proxy Document Cancelled!");
			this.$.loadingPopup.hide();
			if (callback) {callback();}
		}));

		request.go();
	},

	sendForSignature: function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendproxypackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: quantum.preferences.get("company"),
				proxyID: quantum.preferences.get("proxyDatabase"),
				proxyRecordID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
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

	sendReminder: function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendproxydocumentreminder",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: quantum.preferences.get("company"),
				proxyID: quantum.preferences.get("proxyDatabase"),
				proxyRecordID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send reminder");
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
				alertify.error("Failed to send reminder");
				console.log(response);
				return;
			}

			alertify.success("Reminder Sent!");
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
			url: quantum.preferences.get("apiServer") + "refreshproxypackagestatus",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: quantum.preferences.get("company"),
				proxyID: quantum.preferences.get("proxyDatabase"),
				proxyRecordID: this.get("activeEntry").get("_id")
			},
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

		request.go();
	},

	handleDownloadDocument: function(inEvent)
	{
		if (this.get("activeEntry").get("_attachments") && this.get("activeEntry").get("_attachments")[inEvent.documentID])
		{
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
	},

	handleRequestSave: function(inEvent)
	{
		if (this.canEdit())
		{
			if (this.isDirty())
			{
				if (this.$.saveChangesPopup)
				{
					this.$.saveChangesPopup.hide();
					this.$.saveChangesPopup.destroy();
				}
				this.createComponent({name: "saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "saveAndAction", action: inEvent.callback, onHide: "handlePopupHidden"} , {owner:this});
				this.$.saveChangesPopup.show("Must save changes before generating document. Save changes?");
			}
			else { inEvent.callback(); }
		}
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSaveEntryButtonTapped(inSender, inEvent, {callback: inSender.action});
	}
});