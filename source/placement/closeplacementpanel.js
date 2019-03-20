/* global numeral, moment, quantum, alertify, console, saveAs */

enyo.kind({
	name: "quantum.ClosePlacementPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		database: null,
		subscriptionCollection: null,
		activeDate: moment(),
		placementStatus: "",
		closingDocumentNamesCollection: ["Unsigned - Subscription Acceptance.docx", "Unsigned - Treasury Order.docx", "Unsigned - Directors Resolution.docx"],
		closingDocumentSignedNamesCollection: ["Signed - Subscription Acceptance.pdf", "Signed - Treasury Order.pdf", "Signed - Directors Resolution.pdf"],
		closingDocumentHashCollection: ["subscriptionAcceptanceDoc", "treasuryOrderDoc", "directorsResolutionDoc"],
		closingDocumentStatusCollection: ["Generated", "Generated", "Generated"]
	},

	events: {
		onRequestGenerateCSVFile: "",
		onGoHome: "",
		onLogout: ""
	},

	components: [
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Placement Status"},
		{style: "margin-top: 10px;", components: [
			{name: "placementStatusIcon", kind: "enyo.Image", style: "margin-left: 5px; height: 32px; width: 32px;"},
			{name: "placementStatusDescription", style: "margin-left: 10px; display: inline-block;"}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{name: "allowNewSubscriptionsButton", kind: "quantum.Button", style: "line-height: 30px;", ontap: "handleAllowNewSubscriptionsButtonTapped"},
			{name: "closePlacementButton", kind: "quantum.Button", style: "margin-left: 10px; line-height: 30px;", content: "Begin Closing Placement", ontap: "showClosePlacementSection"},
			{name: "finishClosePlacementButton", kind: "quantum.Button", style: "margin-left: 10px; line-height: 30px;", content: "Finish Closing Placement", ontap: "showClosingPlacementSection"},
			{name: "archivePlacementButton", kind: "quantum.Button", style: "margin-left: 10px; line-height: 30px;", content: "Archive Placement", ontap: "handleArchivePlacementButtonTapped"}
		]},
		{name: "closePlacementSection", showing: false, style: "margin-top: 15px;", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Step 1: Select Closing Date"},
			{style: "margin-top: 10px;", kind: "enyo.FittableColumns", components: [
				{name: "datePicker", style: "background-color: lightgrey; padding: 10px;", kind: "gts.DatePicker", onSelect: "handleDateSelected"}
			]},
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Step 2: Generate Closing Documents"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Generate Subscription Acceptance", ontap: "handleGenerateSubscriptionAcceptance"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A document accepting all of the completed subscriptions on behalf of the company."}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Generate Resolution", ontap: "handleGenerateResolution"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A directors' resolution authorizing the issuance of the shares for all completed subscriptions."}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components:[
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Generate Treasury Order", ontap: "handleGenerateTreasuryOrder"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A treasury order authorizing the transfer agent to issue all of the subscribed-for shares."}
			]},
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Step 3: Generate Subscriber Lists"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Completed Subscribers", ontap: "handleGenerateCompletedSubscribersCSVFile"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A full list of completed subscribers, necessary for the transfer agent to generate share certificates and/or DRS statements."}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Completed Subscribers - Computershare Template", ontap: "handleGenerateCompletedSubscribersComputershareTemplate"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A full list of completed subscribers, necessary for the transfer agent to generate share certificates and/or DRS statements in their template form."}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components:[
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Completed Subscribers (USA)", ontap: "handleGenerateCompletedSubscribersUSACSVFile"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A list of completed subscribers from the USA. Necessary for generating Blue Sky filings."}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "quantum.Button", style: "line-height: 30px;", content: "Completed Subscribers (Canada)", ontap: "handleGenerateCompletedSubscribersCanadaCSVFile"},
				{style: "margin-left: 10px; line-height: 32px;", content: "- A list of completed subscribers from Canada. Necessary for generating Canadian Securities filings."}
			]},
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Step 4: Begin Closing Procedure"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{name: "beginClosingButton", kind: "quantum.Button", enabledClasses: "button primary", style: "line-height: 30px;", content: "Begin Closing", ontap: "requestCloseCompletedSubscriptions"},
				{kind: "quantum.Button", style: "margin-left: 10px; line-height: 30px;", content: "Cancel", ontap: "hideClosePlacementSection"}
				//{style: "margin-left: 10px; line-height: 32px;", content: "- After all documents have been generated, mark completed subscribers as closed."}
			]}
		]},
		{name: "closingPlacementSection", showing: false, style: "margin-top: 15px", components:[
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Step 1: Review & Send Closing Documents For Signature"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{style: "padding-right: 5px;", components: [
					{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
						{content: "Document Name", style: "width: 300px;"},
						{content: "Status", style: "width: 150px;"},
						{content: "Download Document", style: "width: 160px;"},
						{content: "Send For Signing", style: "width: 170px;"},
						{content: "View Document Status", style: "width: 170px;"},
						{content: "Refresh Document", style: "width: 150px;"},
						{content: "Cancel Document", style: "width: 150px;"}
					]},
					{name: "closingDocumentsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupClosingDocumentRepeaterItem", components: [
						{name: "closingDocumentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
							{style: "width: 300px; line-height: 34px;", components: [
								{name: "closingDocumentName", content: "Hrm"}
							]},
							{style: "width: 150px; line-height: 34px;", components: [
								{name: "closingDocumentStatus", content: "Generated"}
							]},
							{style: "width: 150px; line-height: 34px; text-align: center;", components: [
								{name: "downloadClosingDocumentButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadClosingDocumentButtonTapped"}
							]},
							{style: "width: 170px; line-height: 34px; text-align: center;", components: [
								{name: "sendClosingDocumentButton", style: "width: 150px;", kind: "quantum.Button", content: "Send Document For Signing", ontap: "sendClosingDocumentButtonTapped"}
							]},
							{style: "width: 170px; line-height: 34px; text-align: center;", components: [
								{name: "viewDocumentStatusButton", style: "width: 150px;", kind: "quantum.Button", content: "View Document Status", ontap: "handleViewDocumentStatusButtonTapped"}
							]},
							{style: "width: 140px; line-height: 34px;", components: [
								{name: "refreshClosingDocumentsButton", kind: "quantum.Button", enabledClasses: "button bg-blue fg-white", content: "Refresh Status", ontap: "refreshClosingDocuments"}
							]},
							{style: "width: 150px; line-height: 34px;", components: [
								{name: "cancelClosingDocumentsButton", kind: "quantum.Button", enabledClasses: "button bg-red fg-white", content: "Cancel Document", ontap: "cancelClosingDocument"}
							]}
						]}
					]}
				]}
			]},
			{style: "font-size: 24px; padding-top: 10px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Step 2: Review Signed Documents"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{style: "padding-right: 5px;", components: [
					{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
						{content: "Document Name", style: "width: 300px;"},
						{content: "Download Document", style: "width: 150px;"}
					]},
					{name: "signedClosingDocumentsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupSignedClosingDocumentRepeaterItem", components: [
						{name: "signedClosingDocumentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
							{style: "width: 300px; line-height: 34px;", components: [
								{name: "signedClosingDocumentName", content: "Hrm"}
							]},
							{style: "width: 150px; line-height: 34px;", components: [
								{name: "downloadSignedClosingDocumentButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadSignedClosingDocumentButtonTapped"}
							]}
						]}
					]}
				]}
			]},
			{style: "font-size: 24px; padding-top: 10px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Step 3: Send Out Shareholder Letter"},
			{name: "massMailButton", kind: "quantum.Button", content: "Mass Mail", ontap: "handleMassMailButtonTapped"},
			{name: "massMailError", style: "color: red", content: "No Shareholder Letter Uploaded", showing: false},
			{style: "font-size: 24px; padding-top: 10px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Step 4: Close Placement"},
			{name: "finalizePlacementButton", kind: "quantum.Button", enabledClasses: "button bg-blue fg-white", content: "Close Placement", ontap: "finalizePlacementButtonTapped"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"},
		{name: "documentStatusPopup", kind: "quantum.ViewAdobeSignDocumentStatusPopup"}
	],

	bindings: [
		{from: ".placementStatus", to: ".$.placementStatusIcon.src", transform: function(v) {
			switch (v){
				case "new":
					return "assets/icons/circle-icon-yellow.png";
				case "preRegistration":
					return "assets/icons/circle-icon-yellow.png";
				case "active":
					return "assets/icons/circle-icon-green.png";
				case "noNewSubscribers":
					return "assets/icons/circle-icon-yellow.png";
				case "closing":
					return "assets/icons/circle-icon-yellow.png";
				case "closed":
					return "assets/icons/circle-icon-red.png";
				case "archived":
					return "assets/icons/circle-icon-grey.png";
				default:
					return "assets/icons/circle-icon-grey.png";
			}
		}},
		{from: ".placementStatus", to: ".$.placementStatusDescription.content", transform: function(v){
			switch (v){
				case "new":
					return "New Placement";
				case "preRegistration":
					return "Placement Accepting Pre-Registrations";
				case "active":
					return "Placement Active";
				case "noNewSubscribers":
					return "Placement Active, No New Subscribers Accepted";
				case "closing":
					return "Awaiting Signed Closing Documents";
				case "closed":
					return "Placement Closed";
				case "archived":
					return "Placement Archived";
				default:
					return "Status Unknown";
			}
		}},
		{from: ".placementStatus", to: ".$.allowNewSubscriptionsButton.content", transform: function(v){
			if (v === "active") {return "Stop Allowing New Subscribers";}
			return "Allow New Subscribers";
		}},
		{from: ".placementStatus", to: ".$.allowNewSubscriptionsButton.disabled", transform: function(v){
			if (v === "active" || v === "noNewSubscribers") {return false;}
			return true;
		}},
		{from: ".placementStatus", to: ".$.finishClosePlacementButton.disabled", transform: function(v){
			if (v === "closing") {return false;}
			return true;
		}},
		{from: ".placementStatus", to: ".$.closePlacementButton.disabled", transform: function(v){
			if (v === "noNewSubscribers") {return false;}
			return true;
		}},
		{from: ".placementStatus", to: ".$.archivePlacementButton.disabled", transform: function(v){
			if (v === "closed") {return false;}
			return true;
		}}
	],

	activate: function()
	{
		if (!quantum.hasRole(["admins"], "placement")) { this.doGoHome(); return; }
		this.$.closePlacementSection.set("showing", false);
		this.updateClosingDocumentStatus();
		this.updateSignedDocumentNames();
		this.updateShareholderLetterStatus();
		this.updatePlacementStatus();
		this.updateFinalizeState();
		this.disableBeginClosingButton();
		this.$.closingDocumentsRepeater.setCount(this.get("closingDocumentStatusCollection").length);
	},

	handleDateSelected: function(inSender, inEvent)
	{
		this.set("activeDate", moment(inEvent.date));
	},

	disableBeginClosingButton: function()
	{
		var disableFlag = false;
		if(quantum.preferences.get("placementInfo")._attachments["Unsigned - Directors Resolution.docx"] === undefined)
		{
			disableFlag = true;
		}
		if(quantum.preferences.get("placementInfo")._attachments["Unsigned - Subscription Acceptance.docx"] === undefined)
		{
			disableFlag = true;
		}
		if(quantum.preferences.get("placementInfo")._attachments["Unsigned - Treasury Order.docx"] === undefined)
		{
			disableFlag = true;
		}
		this.$.beginClosingButton.set("disabled", disableFlag);
	},

	requestCloseCompletedSubscriptions: function(inSender, inEvent)
	{
		if(quantum.preferences.get("placementInfo")._attachments["Unsigned - Directors Resolution.docx"] === undefined)
		{
			alertify.error("Director's Resolution Not Generated");
			return false;
		}
		if(quantum.preferences.get("placementInfo")._attachments["Unsigned - Subscription Acceptance.docx"] === undefined)
		{
			alertify.error("Subscription Acceptance Not Generated");
			return false;
		}
		if(quantum.preferences.get("placementInfo")._attachments["Unsigned - Treasury Order.docx"] === undefined)
		{
			alertify.error("Treasury Order Not Generated");
			return false;
		}

		if (this.$.confirmClosePopup) {this.$.confirmClosePopup.destroy();}
		this.createComponent({name: "confirmClosePopup", kind: "quantum.ConfirmPopup", onYes: "closeCompletedSubscriptions", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmClosePopup.show("Begin Closing?");
		return true;
	},

	saveClosingDate: function(inSender, inEvent)
	{
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed for saving doc to database");
				console.log(err);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			this.get("database").get("settings", enyo.bind(this, function(err, settingsDoc){
				if (err)
				{
					alertify.error("Unable To Get Settings");
					console.log(err);
					return;
				}

				settingsDoc.closingDate = moment(this.$.datePicker.get("value")).valueOf();

				this.get("database").post(settingsDoc, enyo.bind(this, function(err, response){
					if (err)
					{
						alertify.error("Unable To Update Settings");
						console.log(err);
						return;
					}
				}));
			}));
		}));
	},

	closeCompletedSubscriptions: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Closing...");
		this.saveClosingDate();
		//First, make sure that we can log into the database.
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

			var settingsObj = quantum.preferences.get("placementInfo");

			//Sanity Check Completed/Closed/Cancelled
			var checkCollection = new quantum.SubscriptionCollection(this.get("subscriptionCollection").filter(function(value, index, array){
				return (settingsObj.dapPlacement && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds") || value.get("subscriptionInfo").subscriptionStatus === "complete" || value.get("subscriptionInfo").subscriptionStatus === "cancelled" || value.get("subscriptionInfo").subscriptionStatus === "closed";
			}));

			if(checkCollection.length != this.get("subscriptionCollection").length)
			{
				alertify.error("Not all records are complete or cancelled");
				this.$.loadingPopup.hide();
				return;
			}

			//Prepare collection
			var filteredCollection = new quantum.SubscriptionCollection(this.get("subscriptionCollection").filter(function(value, index, array){
				return (settingsObj.dapPlacement && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds") || value.get("subscriptionInfo").subscriptionStatus === "complete";
			}));

			var contactError = false;
			var errorIDs = [];

			var duplicateEmails = {};

			filteredCollection.forEach(function(value, index, array){
				if(value.get("contactInfo").contactID === undefined || value.get("contactInfo").contactID === "" || value.get("contactInfo").contactID === null)
				{
					console.log(value);
					contactError = true;
					errorIDs.push({id:value.get("_id"), name: value.get("contactInfo").subscriberName});
				}
				else
				{
					//value.set("subscriptionStatus", "closed");
					if(!duplicateEmails[value.get("contactInfo").emailAddress])
					{
						duplicateEmails[value.get("contactInfo").emailAddress] = 1;
					}
					else
					{
						duplicateEmails[value.get("contactInfo").emailAddress] = duplicateEmails[value.get("contactInfo").emailAddress] + 1;
					}
				}
			});

			//If > 3 single duplicate, or greater than 10 duplicates, warn
			var sum = 0;
			var duplicateFlag = false;
			for(var key in duplicateEmails)
			{
				sum = sum + (duplicateEmails[key]-1);
				if(sum > 10 || duplicateEmails[key] > 3)
				{
					duplicateFlag = true;
				}
				//Remove Single Emails From The List
				if(duplicateEmails[key] === 1)
				{
					delete duplicateEmails[key];
				}
			}

			if(duplicateFlag === true)
			{
				if (this.$.confirmClosePopup) { this.$.confirmClosePopup.destroy(); }
				this.createComponent({name: "duplicateEmailPopup", kind: "quantum.DuplicateWarnPopup", onHide: "handlePopupHidden"} , {owner:this});
				this.$.duplicateEmailPopup.show(duplicateEmails);
			}

			if(contactError === true)
			{
				alertify.error("Unable to Close, Missing Contact IDs, Contact Admin");
				console.log("No Contact IDs For:", errorIDs);
				this.$.loadingPopup.hide();
				return;
			}

			var placementDBTarget = this.get("database").name.split("/")[this.get("database").name.split("/").length-1];

			var ajaxProperties = {
				cacheBust: false,
				contentType: "application/json",
				method: "POST",
				url: quantum.preferences.get("apiServer")+"closecompletedsubscriptions",
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				}
			};

			ajaxProperties.postBody = {placementDB: placementDBTarget};

			var ajax = new enyo.Ajax(ajaxProperties);

			ajax.response(function(request, response){
				if (!response.error)
				{
					alertify.success("Subscriptions Closed");
					this.$.loadingPopup.hide();
					this.setNewPlacementStatus("closing");
					this.$.closePlacementSection.set("showing", false);
				}
				else
				{
					alertify.error("Subscriptions Not Closed");
					console.log(response);
					this.$.loadingPopup.hide();
				}
			}, this);

			ajax.error(function(request, response){
				console.log("Ajax Error: ",request, response);
			}, this);

			ajax.go();
		}));
	},

	cancelClosingDocument: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Cancelling");

		var ajaxProperties = {
				cacheBust: false,
				contentType: "application/json",
				method: "POST",
				url: quantum.preferences.get("apiServer")+"cancelclosingdocument",
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				}
			};

		ajaxProperties.postBody = {placementID: quantum.preferences.get("placementDatabase"), documentName: this.get("closingDocumentNamesCollection")[inEvent.index]};

		var ajax = new enyo.Ajax(ajaxProperties);

		ajax.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to cancel document");
			console.log(response);
			this.$.loadingPopup.hide();
			return;
		}));

		ajax.response(enyo.bind(this, function(request, response){

			this.updateSignedDocumentNames();
			this.updateClosingDocumentStatus();

			this.$.loadingPopup.hide();
		}));

		ajax.go();
	},

	refreshClosingDocuments: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Refreshing");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "refreshclosingdocuments",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to refresh document");
			console.log(response);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){

			this.updateSignedDocumentNames();
			this.updateClosingDocumentStatus();

			this.$.loadingPopup.hide();
		}));

		request.go({placementDB: quantum.preferences.get("placementDatabase"), closingDocumentID: quantum.preferences.get("placementInfo").closingDocuments[this.get("closingDocumentHashCollection")[inEvent.index]].adobe.agreementID});
	},

	finalizePlacementButtonTapped: function(inSender, inEvent)
	{
		if(this.get("closingDocumentSignedNamesCollection").length < this.get("closingDocumentNamesCollection").length)
		{
			alertify.error("Missing Required Signed Document");
			return false;
		}

		if (this.$.confirmClosePopup) {this.$.confirmClosePopup.destroy();}
		this.createComponent({name: "confirmClosePopup", kind: "quantum.ConfirmPopup", onYes: "finalizePlacement", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmClosePopup.show("Finish Closing?");
		return true;
	},

	finalizePlacementPost: function(inSender, inEvent)
	{
		var placementDBTarget = this.get("database").name.split("/")[this.get("database").name.split("/").length-1];
		var contactDBTarget = quantum.preferences.get("contactDatabase");

		var ajaxProperties = {
			cacheBust: false,
			contentType: "application/json",
			method: "POST",
			url: quantum.preferences.get("apiServer")+"finalizeclosing",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		};

		//On Redesign, this should just be the company ID and twilight should figure out the databases
		ajaxProperties.postBody = {placementDB: placementDBTarget, contactDB: contactDBTarget};

		var ajax = new enyo.Ajax(ajaxProperties);

		ajax.response(function(request, response){
			if (!response.error)
			{
				alertify.success("Subscribers Converted To Shareholders");
				this.setNewPlacementStatus("closed");
				this.$.loadingPopup.hide();
			}
			else
			{
				alertify.error("Error Occurred Transferring Subscribers to Shareholders");
				console.log(response);
				this.$.loadingPopup.hide();
			}
		}, this);

		ajax.error(function(request, response){
			console.log("Ajax Error: ",request, response);
			this.$.loadingPopup.hide();
		}, this);

		ajax.go();
	},

	finalizePlacement: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Finalizing Close");
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

			//Prepare collection
			var filteredCollection = new quantum.SubscriptionCollection(this.get("subscriptionCollection").filter(function(value, index, array){
				return value.get("subscriptionInfo").subscriptionStatus === "closed" || value.get("subscriptionInfo").subscriptionStatus === "cancelled";
			}));

			if(filteredCollection.length < this.get("subscriptionCollection").length)
			{
				//if (this.$.confirmClosePopup) this.$.confirmClosePopup.destroy();
				//this.createComponent({name: "confirmClosePopup", kind: "quantum.ConfirmPopup", onYes: "finalizePlacementPost", onHide: "handlePopupHidden"} , {owner:this});
				//this.$.confirmClosePopup.show("Not All Subscribers are Closed, Proceed Anyway?");
				//return;
				alertify.error("Not All Subscribers are Closed or Cancelled");
				this.$.loadingPopup.hide();
				return;
			}
			else
			{
				this.finalizePlacementPost();
			}

		}));

		this.$.closingPlacementSection.set("showing", false);
	},

	handleAllowNewSubscriptionsButtonTapped: function(inSender, inEvent)
	{
		if (this.get("placementStatus") !== "active" && this.get("placementStatus") !== "noNewSubscribers")
		{
			alertify.error("Invalid Placement Status");
			return;
		}

		var newPlacementStatus = this.get("placementStatus") === "active" ? "noNewSubscribers" : "active";

		this.setNewPlacementStatus(newPlacementStatus);
	},

	handleArchivePlacementButtonTapped: function(inSender, inEvent)
	{
		if (this.get("placementStatus") !== "closed")
		{
			alertify.error("Invalid Placement Status");
			return;
		}

		this.setNewPlacementStatus("archived");
	},

	handleGenerateSubscriptionAcceptance: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Generating");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generatesubscriptionacceptance",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers: {
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
			},
			postBody: {
				placementID: quantum.preferences.get("placementDatabase"),
				placementDate: this.get("activeDate").valueOf()
			}
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to generate document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to generate document");
				console.log(response);
				return;
			}

			var output = quantum.b64ToBlob(response.data, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
			saveAs(output, this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " " + quantum.preferences.get("placementInfo").placementName + " Subscription Acceptance.docx");

			this.disableBeginClosingButton();
		}));
		request.go({placementDB: quantum.preferences.get("placementDatabase"), placementDate: this.get("activeDate").valueOf()});
	},

	handleGenerateResolution: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Generating");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generateclosingresolution",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers: {
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
			},
			postBody: {
				placementID: quantum.preferences.get("placementDatabase"),
				placementDate: this.get("activeDate").valueOf()
			}
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to generate document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to generate document");
				console.log(response);
				return;
			}

			var output = quantum.b64ToBlob(response.data, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
			saveAs(output, this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " Directors Resolution to Close " + quantum.preferences.get("placementInfo").placementName + ".docx");

			this.disableBeginClosingButton();
		}));

		request.go({placementDB: quantum.preferences.get("placementDatabase"), placementDate: this.get("activeDate").valueOf()});
	},

	handleGenerateTreasuryOrder: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Generating");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generateclosingtreasuryorder",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers: {
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
			},
			postBody: {
				placementID: quantum.preferences.get("placementDatabase"),
				placementDate: this.get("activeDate").valueOf()
			}
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to generate document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to generate document");
				console.log(response);
				return;
			}

			var output = quantum.b64ToBlob(response.data, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
			saveAs(output, this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " " + quantum.preferences.get("placementInfo").placementName + " Treasury Order.docx");

			this.disableBeginClosingButton();
		}));

		request.go({placementDB: quantum.preferences.get("placementDatabase"), placementDate: this.get("activeDate").valueOf()});
	},

	handleGenerateCompletedSubscribersComputershareTemplate: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Generating");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generatecomputersharereport",
			cacheBust: false,
			headers: {
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to generate document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to generate document");
				console.log(response);
				return;
			}

			var output = quantum.b64ToBlob(response.data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			saveAs(quantum.b64ToBlob(response.data, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " " + quantum.preferences.get("placementInfo").placementName + " Treasury File.xlsx");

			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Login Failed for saving doc to database");
					console.log(err);
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").get("settings", enyo.bind(this, function(err, settingsDoc){

					if (err)
					{
						alertify.error("Unable To Get Settings");
						console.log(err);
						return;
					}

					settingsDoc._attachments["Completed Subscribers Computershare Template.xlsx"] = {
						content_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
						data: output
					};

					this.get("database").post(settingsDoc, enyo.bind(this, function(err, response){
						if (err)
						{
							alertify.error("Unable To Update Settings");
							console.log(err);
							return;
						}

						this.disableBeginClosingButton();
					}));

				}));
			}));

		}));
		request.go({placementDB: quantum.preferences.get("placementDatabase"), placementDate: this.get("activeDate").valueOf()});
	},

	handleGenerateCompletedSubscribersCSVFile: function(inSender, inEvent)
	{
		//Filter collection to return complete subscribers only.
		var filteredCollection = this.get("subscriptionCollection").filter(enyo.bind(this, function(value, index, array){
			return value.get("subscriptionInfo").subscriptionStatus === "complete" || (quantum.preferences.get("placementInfo").dapPlacement && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds");
		}));

		if (filteredCollection.length === 0)
		{
			alertify.error("No completed subscribers");
			return;
		}

		//collection.filter returns an array, so rebuild it into a collection, and get the raw objects from it so that
		//we can edit them without affecting the underlying models.
		this.doRequestGenerateCSVFile({rawCollection: new quantum.SubscriptionCollection(filteredCollection).raw(), filename: this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " " + quantum.preferences.get("placementInfo").placementName + " Completed Subscribers List.csv"});
		this.disableBeginClosingButton();
	},

	handleGenerateCompletedSubscribersUSACSVFile: function(inSender, inEvent)
	{
		//Filter collection to return complete subscribers only.
		var filteredCollection = this.get("subscriptionCollection").filter(enyo.bind(this, function(value, index, array){
			return (value.get("subscriptionInfo").subscriptionStatus === "complete" || (quantum.preferences.get("placementInfo").dapPlacement && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds")) && value.get("contactInfo").addressInfo.country === "USA";
		}));

		if (filteredCollection.length === 0)
		{
			alertify.error("No completed subscribers for USA");
			return;
		}

		//collection.filter returns an array, so rebuild it into a collection, and get the raw objects from it so that
		//we can edit them without affecting the underlying models.
		this.doRequestGenerateCSVFile({rawCollection: new quantum.SubscriptionCollection(filteredCollection).raw(), filename: this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " " + quantum.preferences.get("placementInfo").placementName + " Completed Subscribers List (USA).csv"});
		this.disableBeginClosingButton();
	},

	handleGenerateCompletedSubscribersCanadaCSVFile: function(inSender, inEvent)
	{
		//Filter collection to return complete subscribers only.
		var filteredCollection = this.get("subscriptionCollection").filter(enyo.bind(this, function(value, index, array){
			return (value.get("subscriptionInfo").subscriptionStatus === "complete" || (quantum.preferences.get("placementInfo").dapPlacement && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds")) && value.get("contactInfo").addressInfo.country === "CAN";
		}));

		if (filteredCollection.length === 0)
		{
			alertify.error("No completed subscribers for Canada");
			return;
		}

		//collection.filter returns an array, so rebuild it into a collection, and get the raw objects from it so that
		//we can edit them without affecting the underlying models.
		this.disableBeginClosingButton();
		this.doRequestGenerateCSVFile({rawCollection: new quantum.SubscriptionCollection(filteredCollection).raw(), filename: this.get("activeDate").format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").companyInfo.companyName + " " + quantum.preferences.get("placementInfo").placementName + " Completed Subscribers List (Canada).csv"});
	},

	hideClosePlacementSection: function()
	{
		this.$.closePlacementSection.set("showing", false);
		this.$.closePlacementButton.set("disabled", false);
		this.$.allowNewSubscriptionsButton.set("disabled", false);
	},

	showClosePlacementSection: function()
	{
		var checkCollection = new quantum.SubscriptionCollection(this.get("subscriptionCollection").filter(function(value, index, array){
			return value.get("subscriptionInfo").subscriptionStatus === "complete" || value.get("subscriptionInfo").subscriptionStatus === "cancelled" || value.get("subscriptionInfo").subscriptionStatus === "closed" || (quantum.preferences.get("placementInfo").dapPlacement && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds");
		}));

		if(checkCollection.length != this.get("subscriptionCollection").length)
		{
			alertify.error("Not all records are complete or cancelled");
			return;
		}

		this.$.closePlacementSection.set("showing", true);
		this.$.closePlacementButton.set("disabled", true);
		this.$.allowNewSubscriptionsButton.set("disabled", true);
		this.resize();
	},

	showClosingPlacementSection: function()
	{
		this.$.closingPlacementSection.set("showing", true);
		this.$.closePlacementSection.set("disabled", true);
		this.$.closePlacementButton.set("disabled", true);
		this.$.allowNewSubscriptionsButton.set("disabled", true);
		this.resize();
	},

	setNewPlacementStatus: function(newStatus)
	{
		this.$.loadingPopup.show("Updating");

		var request = new enyo.Ajax({
		  url: quantum.preferences.get("apiServer") + "setplacementstatus",
		  method: "POST",
		  cacheBust: false,
		  contentType: "application/json",
		  headers: {
			"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
		  },
		  postBody: {
			placementID: quantum.preferences.get("placementDatabase"),
			placementStatus: newStatus
		  }
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to update placement status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to update placement status");
				console.log(response);
				return;
			}

			alertify.success("Placement Status Updated");
			this.set("placementStatus", newStatus);
		}));

		request.go();
	},

	updatePlacementStatus: function()
	{
		//Refresh Content
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
		  url: quantum.preferences.get("apiServer") + "getplacementstatus",
		  cacheBust: false,
		  headers: {
			"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
		  }
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to get placement status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			this.doGoHome();
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to get placement status");
				console.log(response);
				this.doGoHome();
				return;
			}
			//Force the bindings to update.
			this.set("placementStatus", null);
			this.set("placementStatus", response.placementStatus);
		}));
		request.go({placementID: quantum.preferences.get("placementDatabase")});
	},

	updateSignedDocumentNames: function()
	{
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response)
		{
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
			this.get("database").get("settings", enyo.bind(this, function(err, response)
			{
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				this.set("closingDocumentSignedNamesCollection", []);
				for(var i in response._attachments)
				{
					if(i.includes("Signed - "))
					{
						this.get("closingDocumentSignedNamesCollection").push(i);
					}
				}
				this.$.signedClosingDocumentsRepeater.setCount(this.get("closingDocumentSignedNamesCollection").length);
				this.updateClosingDocumentStatus();
			}));
		}));
	},

	updateClosingDocumentStatus: function()
	{
		//Subscription Acceptance, Treasury Order, Director's Resolution
		//Generated (Default) -> Sent For Signing -> Signed
		var totalSigned = 0;
		for(var i = 0; i < this.get("closingDocumentNamesCollection").length; i++)
		{
			if(quantum.preferences.get("placementInfo")._attachments[this.get("closingDocumentNamesCollection")[i].replace("Unsigned","Signed").replace(".docx",".pdf")] !== undefined)
			{
				this.get("closingDocumentStatusCollection")[i] = "Signed";
				totalSigned = totalSigned + 1;
			}
			else if(quantum.preferences.get("placementInfo").closingDocuments !== undefined && 
					quantum.preferences.get("placementInfo").closingDocuments[this.get("closingDocumentHashCollection")[i]] !== undefined && 
					quantum.preferences.get("placementInfo").closingDocuments[this.get("closingDocumentHashCollection")[i]].adobe.agreementID !== undefined && 
					quantum.preferences.get("placementInfo").closingDocuments[this.get("closingDocumentHashCollection")[i]].adobe.agreementID !== "")
			{
				this.get("closingDocumentStatusCollection")[i] = "Sent For Signing";
			}
			else
			{
				this.get("closingDocumentStatusCollection")[i] = "Generated";
			}
		}
		this.$.closingDocumentsRepeater.setCount(this.get("closingDocumentNamesCollection").length);

		if(totalSigned >= this.get("closingDocumentNamesCollection").length && this.alreadyMailed !== true)
		{
			this.$.massMailButton.set("disabled", false);
		}
		else
		{
			this.$.massMailButton.set("disabled", true);
		}
	},

	updateShareholderLetterStatus:function()
	{
		this.shareholderLetterStatus = false;
		this.alreadyMailed = false;
		if(quantum.preferences.get("placementInfo")._attachments["Shareholder Letter.pdf"] !== undefined)
		{
			this.shareholderLetterStatus = true;
			this.$.massMailError.set("showing", false);
		}
		else
		{
			this.$.massMailError.set("showing", true);
		}

		if(!this.shareholderLetterStatus)
		{
			this.$.massMailButton.set("disabled", true);
		}

		if(quantum.preferences.get("placementInfo").alreadyMailed)
		{
			this.alreadyMailed = true;
			this.$.massMailButton.set("disabled", true);
		}
	},

	updateFinalizeState:function()
	{
		if(this.get("closingDocumentSignedNamesCollection").length < 3 || !this.alreadyMailed)
		{
			this.$.finalizePlacementButton.set("disabled", true);
		}
		else
		{
			this.$.finalizePlacementButton.set("disabled", false);
		}
	},

	setupClosingDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.closingDocumentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.closingDocumentName.set("content", this.get("closingDocumentNamesCollection")[inEvent.index]);
		inEvent.item.$.closingDocumentStatus.set("content", this.get("closingDocumentStatusCollection")[inEvent.index]);
		inEvent.item.$.refreshClosingDocumentsButton.set("value", this.get("closingDocumentNamesCollection")[inEvent.index]);
		if(this.get("closingDocumentStatusCollection")[inEvent.index] === "Sent For Signing" || this.get("closingDocumentStatusCollection")[inEvent.index] === "Signed")
		{
			inEvent.item.$.sendClosingDocumentButton.set("disabled", true);
		}

		if(this.get("closingDocumentStatusCollection")[inEvent.index] !== "Sent For Signing" && this.get("closingDocumentStatusCollection")[inEvent.index] !== "Signed")
		{
			inEvent.item.$.viewDocumentStatusButton.set("disabled", true);
			inEvent.item.$.refreshClosingDocumentsButton.set("disabled", true);
			inEvent.item.$.cancelClosingDocumentsButton.set("disabled", true);
		}

		return true;
	},

	setupSignedClosingDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.signedClosingDocumentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.signedClosingDocumentName.set("content", this.get("closingDocumentSignedNamesCollection")[inEvent.index]);
		return true;
	},

	downloadClosingDocumentButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Downloading");
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response)
		{
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
			this.get("database").getAttachment("settings", this.get("closingDocumentNamesCollection")[inEvent.index], enyo.bind(this, function(err, response)
			{
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}
				this.$.loadingPopup.hide();
				saveAs(response, this.get("closingDocumentNamesCollection")[inEvent.index]);
			}));
		}));
	},

	handleViewDocumentStatusButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getclosingdocumentstatus",
			cacheBust: false,
			headers: {
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
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

		request.go({placementID: quantum.preferences.get("placementDatabase"), closingDocumentName: this.get("closingDocumentHashCollection")[inEvent.index]});
	},

	downloadSignedClosingDocumentButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Downloading");
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response)
		{
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
			this.get("database").getAttachment("settings", this.get("closingDocumentSignedNamesCollection")[inEvent.index], enyo.bind(this, function(err, response)
			{
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}
				this.$.loadingPopup.hide();
				saveAs(response, this.get("closingDocumentSignedNamesCollection")[inEvent.index]);
			}));
		}));
	},

	sendClosingDocumentButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Sending Document");

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

			this.get("database").get("settings", enyo.bind(this, function(err, settingsDoc){

				if (err)
				{
					alertify.error("Unable To Get Settings");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				var ajaxProperties = {
					cacheBust: false,
					contentType: "application/json",
					method: "POST",
					url: quantum.preferences.get("apiServer")+"sendclosingdocument",
					headers: {
						"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
					}
				};

				ajaxProperties.postBody = {directors: settingsDoc.companyInfo.directors, subscriptionAcceptanceInfo: settingsDoc.signingOfficers.subscriptionAcceptance, treasuryOrderSigningOfficers: settingsDoc.signingOfficers.treasuryOrder, placementID: quantum.preferences.get("placementDatabase"), documentName: this.get("closingDocumentNamesCollection")[inEvent.index], closeDate: moment(settingsDoc.closingDate).format("YYYY-MM-DD")};

				var ajax = new enyo.Ajax(ajaxProperties);

				ajax.response(function(request, response){
					if (response.error)
					{
						alertify.error("Error Occurred Sending For Signing");
						console.log(response);
						this.$.loadingPopup.hide();
					}
					else
					{
						alertify.success("Document Generated & Sent For Signing");
						this.$.loadingPopup.hide();
						this.get("closingDocumentStatusCollection")[inEvent.index] = "Sent For Signing";
						this.$.closingDocumentsRepeater.setCount(this.get("closingDocumentStatusCollection").length);
					}
				}, this);

				ajax.error(function(request, response){
					console.log("Ajax Error: ", request, response);
				}, this);

				ajax.go();

			}));
		}));
	},

	handleMassMailButtonTapped: function()
	{
		if(!this.shareholderLetterStatus)
		{
			alertify.error("No Shareholder Letter");
			return;
		}
		if(this.placementStatus !== "closing")
		{
			alertify.error("Placement Not Closing");
			return;
		}
		if(this.alreadyMailed === true)
		{
			alertify.error("Mailing Already Sent");
			return;
		}

		this.$.loadingPopup.show("Mailing...");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendshareholderletters",
			cacheBust: false,
			contentType: "application/json",
			method: "POST",
			headers: {
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
			}
		});

		request.postBody = {placementID: quantum.preferences.get("placementDatabase"), companyID: quantum.preferences.get("company")};

		request.error(enyo.bind(this, function(request, response) {
			console.log(response);
			alertify.error("Failed to send Mail.");
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
				console.log(response);
				alertify.error("Failed to send Mail.");
				return;
			}

			this.alreadyMailed = true;
			this.$.massMailButton.set("disabled", true);
			this.activate();
		}));

		request.go();
	}
});