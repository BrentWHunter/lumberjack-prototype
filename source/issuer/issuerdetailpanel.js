/* global moment,numeral,console,JSON,lumberjack,alertify */
enyo.kind({
	name: "lumberjack.IssuerDetailPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	handlers:{
		onScroll: "pickFix"
	},

	events: {
		onGoBack: "",
		onGoHome: "",
		onLogout: ""
	},

	published: {
		database: null,
		activeEntry: null
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Issuer Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "deleteEntryButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px;", content: "Delete Entry", disabled: true, ontap: "handleDeleteEntryButtonTapped"},
				{name: "saveEntryButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Save Entry", disabled: true, ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 50%; padding-right: 5px; min-width: 480px;", components: [
				{kind: "lumberjack.Input", name:"issuerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Issuer Name", required:true},
				{kind: "lumberjack.Input", name:"issuerNoInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Issuer No", required:true},
				{kind: "lumberjack.Input", name:"dateOfFormationInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Date of Formation", required:true},
				{kind: "lumberjack.Input", name:"jurisdictionWhereFormedInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Jurisdiction Formed", required:true},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Mailing Address", style: "line-height: 30px; width: 170px;"},
					{kind: "onyx.InputDecorator", style: "margin-left: 10px; width: 295px; height: 120px;", components: [
						{name: "mailingAddressInput", kind: "onyx.TextArea", style: "width: 100%; height: 100%;"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Head Office Address", style: "line-height: 30px; width: 170px;"},
					{kind: "onyx.InputDecorator", style: "margin-left: 10px; width: 295px; height: 120px;", components: [
						{name: "headOfficeAddressInput", kind: "onyx.TextArea", style: "width: 100%; height: 100%;"}
					]}
				]},
				{kind: "lumberjack.Input", name:"telephoneNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Telephone Number", required:true},
				{kind: "lumberjack.Input", name:"faxNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Fax Number", required:true},
				{kind: "lumberjack.Input", name:"contactNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Name", required:true},
				{kind: "lumberjack.Input", name:"businessEmailAddressInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Business Email Address", required:true}
			]},
			{style: "width: 50%; padding-left: 5px;", components: [
				{kind: "lumberjack.Input", name:"cusipNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"CUSIP Number", required:true},
				{kind: "lumberjack.Input", name:"industryClassificationInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Industry Classification", required:true},
				{kind: "lumberjack.Input", name:"principalRegulatorInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Principal Regulator", required:true},
				{kind: "lumberjack.Input", name:"reportingJurisdictionsInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Reporting Jurisdictions", required:true},
				{kind: "lumberjack.Input", name:"shortFormProspectusIssuerInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Short Form Prospectus Issuer", required:true},
				{kind: "lumberjack.Input", name:"sizeOfIssuerAssetsInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Size of Issuer Assets", required:true},
				{kind: "lumberjack.Input", name:"stockExchangeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Stock Exchange", required:true},
				{kind: "lumberjack.Input", name:"stockSymbolInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Stock Symbol", required:true},
				{kind: "lumberjack.Input", name:"financialYearEndInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Financial Year End", required:true},
				{kind: "lumberjack.Input", name:"auditorInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Auditor", required:true},
				{kind: "lumberjack.Input", name:"generalPartnerInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"General Partner", required:true},
				{kind: "lumberjack.Input", name:"transferAgentInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Transfer Agent", required:true}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px; padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Filings"}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black; min-width: 1490px;", components: [
			{content: "Filing Date", style: "width: 125px;"},
			{content: "Filing Time", style: "width: 125px;"},
			{content: "Document Type", style: "width: 450px;"}
		]},
		{name: "filingsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black; min-width: 1490px;", onSetupItem: "setupFilingRepeaterItem", components: [
			{name: 'filingItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "filingDate", style: "width: 125px;"},
				{name: "filingTime", style: "width: 125px;"},
				{name: "docType", style: "width: 450px;"},
				{name: "downloadButton", kind: "lumberjack.Button", enabledClasses: "button bg-darkViolet fg-white", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Download", ontap: "downloadDocumentButtonTapped"},
			]}
		]},
		{name: "noFilingsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Filings Found"},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		{from: ".activeEntry.issuerName", to: ".$.issuerNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.issuerNo", to: ".$.issuerNoInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.dateOfFormation", to: ".$.dateOfFormationInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.jurisdictionWhereFormed", to: ".$.jurisdictionWhereFormedInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.mailingAddress", to: ".$.mailingAddressInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.headOfficeAddress", to: ".$.headOfficeAddressInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.telephoneNumber", to: ".$.telephoneNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.faxNumber", to: ".$.faxNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactName", to: ".$.contactNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.businessEmailAddress", to: ".$.businessEmailAddressInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.cusipNumber", to: ".$.cusipNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.industryClassification", to: ".$.industryClassificationInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.principalRegulator", to: ".$.principalRegulatorInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.reportingJurisdictions", to: ".$.reportingJurisdictionsInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.shortFormProspectusIssuer", to: ".$.shortFormProspectusIssuerInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.sizeOfIssuerAssets", to: ".$.sizeOfIssuerAssetsInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.stockExchange", to: ".$.stockExchangeInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.stockSymbol", to: ".$.stockSymbolInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.financialYearEnd", to: ".$.financialYearEndInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.auditor", to: ".$.auditorInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.generalPartner", to: ".$.generalPartnerInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.transferAgent", to: ".$.transferAgentInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("issuerCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === 0; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("issuerCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1; }
				else { throw null; }
			}
			catch (err) { return true; }
		}}
	],

	clearBorderError: function()
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	canEdit: function()
	{
		return true;
	},

	setShowingForRoles: function()
	{
		this.$.deleteEntryButton.set("showing", lumberjack.hasRole(["_admin"]));
		this.$.saveEntryButton.set("showing", this.canEdit());
	},

	setElementsDisabled: function(disabled)
	{
		// for (var key in this.$)
		// {
		// 	if(this.$[key].kind === "lumberjack.Input" || this.$[key].kind === "onyx.Input" || this.$[key].kind === "lumberjack.Button" || this.$[key].kind === "lumberjack.Checkbox"  || this.$[key].kind === "onyx.Checkbox")
		// 	{
		// 		if(this.$[key].name !== "nextEntryButton" && this.$[key].name !== "previousEntryButton")
		// 		{
		// 			this.$[key].set("disabled",disabled);
		// 		}
		// 	}
		// }
	},

	setDisabledForStatus: function()
	{

	},

	setDisabledForRoles: function()
	{
		//var disabled = !this.canEdit();
		this.setElementsDisabled(true);

		if(this.canEdit())
		{
			this.setDisabledForStatus();
		}
	},

	activate: function(activeEntry)
	{
		this.clearBorderError();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new enyo.Model({}));
		if (activeEntry != null) { this.set("activeEntry", activeEntry); }

		this.setDisabledForRoles();
		this.setShowingForRoles();

		//Sort the filings by date
		var sortByDateFunction = function(a,b) {
			var momentA = moment(a.filingDate + " " + a.filingTime.substr(1, a.filingTime.length - 4), "MMM DD YYYY HH:mm:ss");
			var momentB = moment(b.filingDate + " " + b.filingTime.substr(1, b.filingTime.length - 4), "MMM DD YYYY HH:mm:ss");
			if(momentA.isBefore(momentB)) {return 1;}
			if(momentB.isBefore(momentA)) {return -1;}
			return 0;
		};

		this.get("activeEntry").get("offeringFilings").sort(sortByDateFunction);

		this.refreshRepeaters();
		this.resize();
	},

	refreshRepeaters: function()
	{
		this.$.noFilingsLabel.set("showing", this.get("activeEntry").get("offeringFilings").length === 0);
		this.$.filingsRepeater.set("showing", this.get("activeEntry").get("offeringFilings").length > 0);
		this.$.filingsRepeater.setCount(this.get("activeEntry").get("offeringFilings").length);
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	/******************
	* Button Handlers *
	*******************/

	validateInputs: function()
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		if (!isValid) { alertify.error("Validation Failed"); }
		return isValid;
	},

	pickFix: function(inSender, inEvent)
	{
		if(inEvent.originator === this)
		{
			if(this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]] !== undefined && this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]].parent !== undefined && this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]].parent.kind === "onyx.PickerDecorator")
			{
				var controls = this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]].parent.getControls();
				controls.forEach(enyo.bind(this,function(value, index, array) {
					if(value.kind == "onyx.Picker")
					{
						this.$[value.name].hide();
					}
				}));
			}
			//Account for Quantum country and province pickers
			else if(document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1] === "pickerButton")
			{
				if(this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-2]] !== undefined)
				{
					var controls = this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-2]].children[0].getControls();
					controls.forEach(enyo.bind(this,function(value, index, array) {
						if(value.kind == "onyx.Picker")
						{
							this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-2]].$[value.name].hide();
						}
					}));
				}
			}
		}
		else
		{
			//Proper scrolling
		}
	},

	handleSaveEntryButtonTapped: function(inSender, inEvent, options)
	{
		//Define helper function
		var updateActiveEntry = enyo.bind(this, function(options){
			var completedEmail = false;
			var updateShares = false;
			var signedSubscriptionAgreementCancelledEmail = false;

			this.$.loadingPopup.show("Saving...");
			if (!options || !options.skipUpdateFields)
			{
				//this.get("activeEntry").get("contactInfo").subscriberName = this.$.subscriberNameInput.get("value");
			}

			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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
				
				var tempEntry = JSON.parse(JSON.stringify(this.get("activeEntry")));
				tempEntry._attachments = this.get("activeEntry").get("_attachments");

				this.get("database").post(tempEntry, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Entry Update Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}
					this.get("activeEntry").set("_rev", response.rev);

					var finalizeSave = enyo.bind(this, function(options){
						this.$.loadingPopup.hide();
						//Sort the collection in case any of the display names have changed.
						//TODO: Implement
						// var sortByDisplayNameFunction = function(a,b) {
						// 	if(a.get("contactInfo").displayName.toLowerCase() < b.get("contactInfo").displayName.toLowerCase()) {return -1;}
						// 	if(a.get("contactInfo").displayName.toLowerCase() > b.get("contactInfo").displayName.toLowerCase()) {return 1;}
						// 	return 0;
						// };

						// this.get("subscriptionCollection").sort(sortByDisplayNameFunction);

						//Force bindings to refresh by re-activating the panel.
						this.activate(this.get("activeEntry"));

						if (options && options.callback)
						{
							options.callback();
						}
					});

					finalizeSave(options);
				}));
			}));
		});

		//Test Logic
		if (!this.canEdit()) { return; }

		if (!this.validateInputs()) { return; }

		updateActiveEntry(options);
	},

	isDirty: function()
	{
		if (!this.get("activeEntry")) { return false; }

		try
		{
			var isDirtyArray = [];

			// console.log(isDirtyArray);

			return (isDirtyArray.indexOf(true)!==-1);
		}
		catch(err)
		{
			alertify.error("Malformed Data - Check Console Log");
			console.log("Error: Malformed Data", err, this.get("activeEntry"));
			return false;
		}
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSaveEntryButtonTapped(inSender, inEvent, {callback: inSender.action});
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
			this.createComponent({name: "next_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.nextEntry), onNo: "nextEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}
		else { this.nextEntry(inSender, inEvent); }
	},

	nextEntry: function(inSender, inEvent)
	{
		this.activate(this.get("issuerCollection").at(this.get("issuerCollection").indexOf(this.get("activeEntry")) + 1));
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
			this.createComponent({name: "previous_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.previousEntry), onNo: "previousEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.previous_saveChangesPopup.show("Save changes?");
		}
		else { this.previousEntry(inSender, inEvent); }
	},

	previousEntry: function(inSender, inEvent)
	{
		this.activate(this.get("issuerCollection").at(this.get("issuerCollection").indexOf(this.get("activeEntry")) - 1));
	},

	/****************************
	* Document Repeater Section *
	****************************/

	setupFilingRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.filingItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.filingDate.set("content", this.get("activeEntry").get("offeringFilings")[inEvent.index].filingDate);
		inEvent.item.$.filingTime.set("content", this.get("activeEntry").get("offeringFilings")[inEvent.index].filingTime);
		inEvent.item.$.docType.set("content", this.get("activeEntry").get("offeringFilings")[inEvent.index].docType);

		return true;
	},

	downloadDocumentButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Downloading");
		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

			this.get("database").getAttachment(this.get("activeEntry").get("_id"), "filing" + this.get("activeEntry").get("offeringFilings")[inEvent.index].docId, enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				this.$.loadingPopup.hide();
				saveAs(response, this.get("activeEntry").get("offeringFilings")[inEvent.index].issuerName + " Filing " + this.get("activeEntry").get("offeringFilings")[inEvent.index].docId);
			}));
		}));
	},

	/**********************
	* Validation Handlers *
	**********************/

	validateNumberInput: function(inSender, inEvent)
	{
		//8 = Backspace, 9 = Tab, 37-40 = Arrow Keys, 46 = Delete 48-57 = Numbers, 96-105 = Numpad Numbers
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if (inEvent.shiftKey || validEntries.indexOf(inEvent.keyCode) === -1)
		{
			inEvent.preventDefault();
			return true;
		}
	},

	validateDecimalInput: function(inSender, inEvent)
	{
		//8 = Backspace, 9 = Tab, 37-40 = Arrow Keys, 46 = Delete, 110 + 190 = Period, 48-57 = Numbers, 96-105 = Numpad Numbers
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 110, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if(inEvent.keyCode === 110 || inEvent.keyCode === 190)
		{
			if(inEvent.originator.value.indexOf(".") !== -1)
			{
				inEvent.preventDefault();
				return true;
			}
		}

		if (inEvent.shiftKey || validEntries.indexOf(inEvent.keyCode) === -1)
		{
			inEvent.preventDefault();
			return true;
		}
	}
});