enyo.kind({
	name: "quantum.WarrantTransactionPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onGoBack: "",
		onPromptSaveRequired: "",
		onViewEventDetail: "",
		onLogout: ""
	},

	published: {
		database: null,
		activeEntry: null,
		activeSubentry: null,
		transactionCollection: null,
		holderContactMap: null,
		mode: "pending",
		newTransactionID: null
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{name: "header", style: "font-size: 24px;", content: "Transaction Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "finalizeEntryButton", kind: "quantum.Button", enabledClasses: "button success", style: "margin: 0 0 0 10px;", content: "Finalize Entry", ontap: "handleFinalizeEntryButtonTapped"},
				{name: "cancelEntryButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px;", content: "Cancel Entry", ontap: "handleCancelEntryButtonTapped"},
				{name: "saveEntryButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Save Entry", ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]},
			{name: "addButtons", components: [
				{name: "cancelButton", kind: "quantum.Button", content: "Cancel", ontap: "handleCancelButtonTapped"},
				{name: "addEntryButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Add Entry", ontap: "handleSaveEntryButtonTapped"}
			]}
		]},
		{kind:"enyo.FittableColumns", components:[
			{style: "width: 50%;", components: [
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Transaction Type", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "typePickerButton", style: "width: 100%;"},
						{name: "typePicker", kind: "onyx.Picker", onChange: "resize", components: [
							{content: "Exercise", value: "exercise"},
							{content: "Sale", value: "sale"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Transaction Status", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "statusPickerButton", style: "width: 100%;"},
						{name: "statusPicker", kind: "onyx.Picker", components: [
							{content: "Incomplete Docs, No Funds", value: "incompleteDocsNoFunds"},
							{content: "Incomplete Docs, Partial Funds", value: "incompleteDocsPartialFunds"},
							{content: "Incomplete Docs, All Funds", value: "incompleteDocsAllFunds"},
							{content: "Complete Docs, No Funds", value: "completeDocsNoFunds"},
							{content: "Complete Docs, Partial Funds", value: "completeDocsPartialFunds"},
							{content: "Complete", value: "complete"},
							{content: "Cancelled", value: "cancelled"}
						]}
					]}
				]},
				{kind: "quantum.Input", name:"numSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"int", label:"Number of Shares", required:true, inputMaxLength:10},
				{kind: "quantum.Input", name:"sharePriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"float", label:"Price per Share", required:true, inputMaxLength:10},
				{kind: "enyo.FittableColumns", name:"currencySection", style: "margin-top: 10px;", components: [
					{content: "Currency", style: "line-height: 38px; width: 170px;"},
					{kind: "quantum.CurrencyPicker", name: "currencyPicker", style: "margin-left: 10px; width: 350px;"}
				]}
			]},
			{style: "margin-left: 1%; width: 49%;", components: []}
		]},
		{name: "contactDetails", kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{style: "width: 50%;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Buyer Details"},
					{fit: true},
					{name: "viewContactButton", kind: "quantum.Button", style: "height: 30px;", content: "View Buyer", ontap: "handleViewContactButtonTapped"},
					{name: "searchContactButton", kind: "quantum.Button", style: "height: 30px;", content: "Search Buyers", ontap: "handleSearchContactButtonTapped"}
				]},
				{kind: "quantum.Input", name:"contactNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Name", required:true},
				{kind: "quantum.Input", name:"contactEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Buyer Email Address", required:true},
				{kind: "quantum.Input", name:"contactPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"tel", label:"Buyer Phone Number", required:true},
				{kind: "quantum.Input", name:"contactIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", showing: false, label:"Buyer Contact ID", required:true}
			]},
			{style: "margin-left: 1%; width: 49%;", components: []}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.AdobeDocumentSection", name: "transactionDocSection",
				header: "Transaction Document",
				// Attachment keys:
				signedAttachmentIdKey: "signedAttachmentID",
				signedFileNameKey: "signedFileName",
				unsignedAttachmentIdKey: "unsignedAttachmentID",
				unsignedFileNameKey: "unsignedFileName",
				// ID key(s):
				idKey: "warrantID",
				subIdKey: "transactionID",
				// Routes:
				routeCancel: "cancelwarranttransactiondocument",
				routeGenerate: "generatewarranttransactiondocument",
				routeGetStatus: "getwarranttransactiondocumentstatus",
				routeRefreshStatus: "refreshwarranttransactiondocumentstatus",
				routeSend: "sendwarranttransactiondocument",
				routeSendReminder: "sendwarranttransactiondocumentreminder"
			}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.AdobeDocumentSection", name: "treasuryOrderDocSection",
				header: "Treasury Order Document",
				// Attachment keys:
				signedAttachmentIdKey: "signedAttachmentID",
				signedFileNameKey: "signedFileName",
				unsignedAttachmentIdKey: "unsignedAttachmentID",
				unsignedFileNameKey: "unsignedFileName",
				// Disable flags:
				disableViewUnsigned: true,
				// ID key(s):
				idKey: "warrantID",
				subIdKey: "transactionID",
				// Routes:
				routeCancel: "cancelwarranttreasuryorderdocument",
				routeGenerate: "generatewarranttreasuryorderdocument",
				routeGetStatus: "getwarranttreasuryorderdocumentstatus",
				routeRefreshStatus: "refreshwarranttreasuryorderdocumentstatus",
				routeSend: "sendwarranttreasuryorderdocument",
				routeSendReminder: "sendwarranttreasuryorderdocumentreminder"
			}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.SupportingDocuments", name: "supportingDocuments", module: "warrant", style: "width: 50%", onAddDocument: "handleAddDocument", attachmentIndexKey: "attachmentID"},
			{kind: "quantum.PaymentSection", name: "paymentSection", module: "warrant", style: "width: 50%", onAddPayment: "handleAddPayment", onAddRefund: "handleAddPayment", attachmentIndexKey: "attachmentID"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".activeEntry", to: ".transactionCollection", transform: function(v) {
			try
			{
				switch (this.get("mode"))
				{
					case "pending":
						return v.get("pendingTransactions");
					case "cancelled":
						return v.get("cancelledTransactions");
					default:
						throw null;
				}
			}
			catch (err) { return []; }
		}},
		{from: ".mode", to: ".$.editButtons.showing", transform: function(v) {
			return v === "pending" || v === "cancelled";
		}},
		{from: ".mode", to: ".$.addButtons.showing", transform: function(v) {
			return v === "add";
		}},
		{from: ".mode", to: ".$.cancelEntryButton.disabled", transform: function(v) {
			return v !== "pending"
		}},
		{from: ".mode", to: ".$.saveEntryButton.disabled", transform: function(v) {
			return v !== "pending"
		}},
		{from: ".mode", to: ".$.viewContactButton.showing", transform: function(v) {
			return v === "pending" || v === "cancelled";
		}},
		{from: ".mode", to: ".$.searchContactButton.showing", transform: function(v) {
			return v === "add";
		}},
		{from: ".mode", to: ".$.header.content", transform: function(v) {
			try
			{
				switch (this.get("mode"))
				{
					case "pending":
						return "Pending Transaction Information";
					case "cancelled":
						return "Cancelled Transaction Information";
					default:
						throw null;
				}
			}
			catch (err) { return "Transaction Information"; }
		}},
		{from: ".activeSubentry", to: ".$.finalizeEntryButton.disabled", transform: function(v) {
			try
			{
				var isComplete = v.get("status") === "complete";
				switch (v.get("type"))
				{
					case "exercise":
						return !isComplete || !v.get("treasuryOrderDoc").signed;
					case "sale":
						return !isComplete;
					default:
						throw null;
				}
			}
			catch (err) { return true; }
		}},
		{from: ".activeSubentry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("transactionCollection");
				if (data != null && data instanceof enyo.Collection)
				{
					return data.indexOf(v) === -1 || data.indexOf(v) === 0;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeSubentry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("transactionCollection");
				if (data != null && data instanceof enyo.Collection)
				{
					return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeSubentry.type", to: ".$.typePicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.typePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null)
					{
						return control;
					}
					else
					{
						console.log('Transaction Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.typePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeSubentry.status", to: ".$.statusPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.statusPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null)
					{
						return control;
					}
					else
					{
						console.log('Transaction Status "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.statusPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeSubentry.numShares", to: ".$.numSharesInput.value", transform: function(v) {
			try
			{
				if (this.get("mode") === "add")
				{
					return this.getNumAvailableShares();
				}
				else
				{
					if (v != null && v !== "")
					{
						return v;
					}
					else { throw null; }
				}
			}
			catch (err) { return 0; }
		}},
		{from: ".activeSubentry.sharePrice", to: ".$.sharePriceInput.value", transform: function(v) {
			try
			{
				if (this.get("mode") === "add")
				{
					return this.get("activeEntry").get("exercisePrice");
				}
				else
				{
					if (v != null && v !== "")
					{
						return v;
					}
					else { throw null; }
				}
			}
			catch (err) { return 0; }
		}},
		{from: ".activeSubentry.currency", to: ".$.currencyPicker.selected", transform: function(v) {
			try
			{
				if (this.get("mode") === "add")
				{
					return this.get("activeEntry").get("exerciseCurrency");
				}
				else
				{
					if (v != null && v !== "")
					{
						return v;
					}
					else { throw null; }
				}
			}
			catch (err) { return "USD"; }
		}},
		{from: ".activeSubentry.contactID", to: ".$.contactIDInput.value", transform: function(v) {
			try
			{
				if (v != null && v !== "")
				{
					return v;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeSubentry", to: ".$.contactNameInput.value", transform: function(v) {
			try
			{
				var data = this.get("holderContactMap");
				if ((this.get("mode") === "pending" || this.get("mode") === "cancelled") && data != null && v instanceof quantum.WarrantTransactionModel)
				{
					return data[v.get("contactID")].contactName;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeSubentry", to: ".$.contactEmailInput.value", transform: function(v) {
			try
			{
				var data = this.get("holderContactMap");
				if ((this.get("mode") === "pending" || this.get("mode") === "cancelled") && data != null && v instanceof quantum.WarrantTransactionModel)
				{
					return data[v.get("contactID")].emailAddress;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeSubentry", to: ".$.contactPhoneInput.value", transform: function(v) {
			try
			{
				var data = this.get("holderContactMap");
				if ((this.get("mode") === "pending" || this.get("mode") === "cancelled") && data != null && v instanceof quantum.WarrantTransactionModel)
				{
					return data[v.get("contactID")].phoneNumber;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		// Transaction Document Section:
		{from: ".activeEntry", to: ".$.transactionDocSection.activeEntry"},
		{from: ".activeSubentry", to: ".$.transactionDocSection.activeSubentry"},
		{from: ".database", to: ".$.transactionDocSection.database"},
		{from: ".activeSubentry.transactionDoc", to: ".$.transactionDocSection.doc"},
		{from: ".activeSubentry", to: ".$.transactionDocSection.readOnly", transform: function(v) {
			try { return this.canEdit() !== true || this.get("mode") !== "pending"; }
			catch (err) { return true; }
		}},
		{from: ".mode", to: ".$.transactionDocSection.showing", transform: function(v) {
			return v === "pending" || v === "cancelled";
		}},
		{from: ".activeSubentry.type", to: ".$.transactionDocSection.header", transform: function(v) {
			try
			{
				switch (v)
				{
					case "exercise":
						return "Exercise Document";
					case "sale":
						return "Sale Document";
					default:
						throw null;
				}
			}
			catch (err) { return "Transaction Document"; }
		}},
		// Treasury Order Document Section:
		{from: ".activeEntry", to: ".$.treasuryOrderDocSection.activeEntry"},
		{from: ".activeSubentry", to: ".$.treasuryOrderDocSection.activeSubentry"},
		{from: ".database", to: ".$.treasuryOrderDocSection.database"},
		{from: ".activeSubentry.treasuryOrderDoc", to: ".$.treasuryOrderDocSection.doc"},
		{from: ".activeSubentry", to: ".$.treasuryOrderDocSection.readOnly", transform: function(v) {
			try { return this.canEdit() !== true || this.get("mode") !== "pending" || v.get("type") !== "exercise" || v.get("status") !== "complete"; }
			catch (err) { return true; }
		}},
		{from: ".activeSubentry", to: ".$.treasuryOrderDocSection.showing", transform: function(v) {
			try { return (this.get("mode") === "pending" || this.get("mode") === "cancelled") && v.get("type") === "exercise" && (v.get("status") === "complete" || v.get("treasuryOrderDoc").generated === true); }
			catch (err) { return false; }
		}},
		// Supporting Documents:
		{from: ".activeEntry", to: ".$.supportingDocuments.activeEntry"},
		{from: ".database", to: ".$.supportingDocuments.database"},
		{from: ".activeSubentry", to: ".$.supportingDocuments.documentsReceived", transform: function(v) {
			try
			{
				var data = v.get("documentsReceived");
				if (Array.isArray(data))
				{
					return JSON.parse(JSON.stringify(data));
				}
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".mode", to: ".$.supportingDocuments.readOnly", transform: function(v) {
			return v === "cancelled";
		}},
		// Payment Section:
		{from: ".activeEntry", to: ".$.paymentSection.activeEntry"},
		{from: ".database", to: ".$.paymentSection.database"},
		{from: ".activeSubentry", to: ".$.paymentSection.paymentsReceived", transform: function(v) {
			try
			{
				var data = v.get("paymentsReceived");
				if (Array.isArray(data))
				{
					return JSON.parse(JSON.stringify(data));
				}
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: "activeSubentry", to: ".$.paymentSection.purchaseTotal", transform: function(v) {
			try
			{
				return quantum.parseInt(v.get("numShares")) * quantum.parseFloat(v.get("sharePrice"));
			}
			catch (err) { return 0; }
		}},
		{from: ".mode", to: ".$.paymentSection.showing", transform: function(v) {
			return v === "pending" || v === "cancelled";
		}},
		// Show certain fields based on transaction type.
		{from: ".$.typePicker.selected", to: ".$.sharePriceInput.showing", transform: function(v) {
			try
			{
				if (v != null)
				{
					return v.get("value") === "sale";
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.typePicker.selected", to: ".$.currencySection.showing", transform: function(v) {
			try
			{
				if (v != null)
				{
					return v.get("value") === "sale";
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.typePicker.selected", to: ".$.contactDetails.showing", transform: function(v) {
			try
			{
				if (v != null)
				{
					return v.get("value") === "sale";
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}}
	],

	clearBorderError: function()
	{
		for (var key in this.$)
		{
			var control = this.$[key];
			if (control.kind === "quantum.Input")
			{
				control.clearBorderError();
			}
			else if (control.kind === "onyx.Picker")
			{
				control.parent.applyStyle("border", null);
			}
			else if (control.kind === "quantum.CurrencyPicker")
			{
				control.applyStyle("border", null);
			}
		}
	},

	canEdit: function()
	{
		return quantum.hasRole(["admins","users"], "warrant");
	},

	setShowingForRoles: function()
	{
		this.$.cancelEntryButton.set("showing", quantum.hasRole(["admins"], "warrant"));
		this.$.saveEntryButton.set("showing", this.canEdit());

		this.$.addEntryButton.set("showing", this.canEdit());
	},

	setDisabledForRoles: function()
	{
		// Transaction status should only change when certain events occur.
		this.$.statusPickerButton.set("disabled", true);

		// Contact info is not editable here.
		this.$.contactNameInput.set("disabled", true);
		this.$.contactEmailInput.set("disabled", true);
		this.$.contactPhoneInput.set("disabled", true);
		this.$.contactIDInput.set("disabled", true);

		if (this.get("mode") === "pending")
		{
			// Payments may be editable, depending on whether funds have been added.
			this.$.paymentSection.disableForFunds();
		}
		else
		{
			// Payments are not editable here.
			this.$.paymentSection.setAddDisabled(true);
			this.$.paymentSection.setRefundDisabled(true);
		}

		var disabled = !(this.canEdit() && this.get("mode") === "add");

		this.$.typePickerButton.set("disabled", disabled);
		this.$.numSharesInput.set("disabled", disabled);
		this.$.sharePriceInput.set("disabled", disabled);
		this.$.currencyPicker.set("disabled", disabled);
	},

	refreshRepeaters: function()
	{
		this.$.supportingDocuments.refreshRepeater();
		this.$.paymentSection.refreshRepeater();
	},

	activate: function(activeSubentry)
	{
		var warrantStatus = this.get("activeEntry").get("status");
		var warrantNumShares = quantum.parseInt(this.get("activeEntry").get("numShares"));
		var mustGoBack = this.get("mode") === "add" && !((warrantStatus === "active" || warrantStatus === "pendingTransaction") && warrantNumShares > 0);

		if (!quantum.hasRole(["admins","users","auditors"], "warrant") || mustGoBack)
		{
			// Setting the "activeSubentry" to null before navigating away prevents a prompt to save changes.
			this.set("activeSubentry", null);
			this.doGoBack();
			return;
		}

		this.clearBorderError();

		// The "activeSubentry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeSubentry", null);
		this.set("activeSubentry", new quantum.WarrantTransactionModel({}));
		if (activeSubentry != null) { this.set("activeSubentry", activeSubentry); }

		// Set "newTransactionID" to null here so that it doesn't persist if anything goes wrong.
		this.set("newTransactionID", null);

		this.setShowingForRoles();
		this.setDisabledForRoles();

		this.refreshRepeaters();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	getSelected: function(picker, propertyName)
	{
		try
		{
			if (typeof(propertyName) !== 'string') { propertyName = "value"; }
			return picker.get("selected")[propertyName];
		}
		catch (err) { return ""; }
	},

	getNumAvailableShares: function()
	{
		try
		{
			var ae = this.get("activeEntry");
			var availableShares = quantum.parseInt(ae.get("numShares"));
			ae.get("pendingTransactions").forEach(function(currentValue) {
				availableShares = availableShares - quantum.parseInt(currentValue.get("numShares"));
			});
			return availableShares;
		}
		catch (err)
		{
			console.log(err);
			alertify.error("Error calculating number of available shares.");
			return -1;
		}
	},

	calculateTransactionStatus: function(transactionRecord)
	{
		if (transactionRecord.status === "cancelled")
		{
			return transactionRecord.status;
		}

		var totalPayments = this.$.paymentSection.calculateFundsPaid();

		var totalPrice = quantum.parseInt(transactionRecord.numShares) * quantum.parseFloat(transactionRecord.sharePrice);

		var hasCompleteDocs = transactionRecord.transactionDoc.signed;

		if (totalPayments <= 0)
		{
			if (hasCompleteDocs)
			{
				return "completeDocsNoFunds";
			}
			else
			{
				return "incompleteDocsNoFunds";
			}
		}
		else if (totalPayments < totalPrice)
		{
			if (hasCompleteDocs)
			{
				return "completeDocsPartialFunds";
			}
			else
			{
				return "incompleteDocsPartialFunds";
			}
		}
		else
		{
			if (hasCompleteDocs)
			{
				return "complete";
			}
			else
			{
				return "incompleteDocsAllFunds";
			}
		}
	},

	/******************
	* Button Handlers *
	******************/

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.doGoBack();
	},

	validateInputs: function()
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		var flagAsInvalid = function(control, doNotUseParent) {
			isValid = false;
			if (control.kind === "quantum.Input")
			{
				control.setBorderError();
			}
			else if (doNotUseParent === true)
			{
				control.applyStyle("border", borderError);
			}
			else
			{
				control.parent.applyStyle("border", borderError);
			}
		};

		var validate_selected = function(control, isCustom) {
			try
			{
				var data = control.get("selected").value;
				if (data == null || data === "") { throw null; }
			}
			catch (err) { flagAsInvalid(control, isCustom); }
		};

		// Transaction Type:
		validate_selected(this.$.typePicker);

		// Transaction Status:
		validate_selected(this.$.statusPicker);

		// Number of Shares:
		if (!this.$.numSharesInput.validate()) { isValid = false; }
		else if (this.get("mode") === "add")
		{
			var numShares = quantum.parseInt(this.$.numSharesInput.get("value"));
			if (numShares <= 0)
			{
				isValid = false;
				this.$.numSharesInput.setBorderError();
			}
			else
			{
				// Verify that the specified number of shares are actually available.
				var numAvailableShares = this.getNumAvailableShares();
				if (numAvailableShares - numShares < 0)
				{
					isValid = false;
					this.$.numSharesInput.setBorderError();
					if (numAvailableShares === 0)
					{
						alertify.error("No shares are currently available.");
					}
					else if (numAvailableShares === 1)
					{
						alertify.error("Only 1 share is currently available.");
					}
					else if (numAvailableShares > 1)
					{
						alertify.error("Only " + numAvailableShares + " shares are currently available.");
					}
				}
			}
		}

		if (this.getSelected(this.$.typePicker) === "sale")
		{
			// Price per Share:
			if (!this.$.sharePriceInput.validate()) { isValid = false; }
			else if (quantum.parseFloat(this.$.sharePriceInput.get("value")) <= 0)
			{
				isValid = false;
				this.$.sharePriceInput.setBorderError();
			}

			// Currency:
			validate_selected(this.$.currencyPicker, true);

			// Contact ID:
			if (!this.$.contactIDInput.validate())
			{
				isValid = false;
				this.$.contactNameInput.setBorderError();
				this.$.contactEmailInput.setBorderError();
				this.$.contactPhoneInput.setBorderError();
			}
			else if (this.$.contactIDInput.get("value") === this.get("activeEntry").get("holderContactID"))
			{
				isValid = false;
				this.$.contactNameInput.setBorderError();
				this.$.contactEmailInput.setBorderError();
				this.$.contactPhoneInput.setBorderError();
				alertify.error("Buyer and seller cannot be the same.");
			}
		}

		if (!isValid) { alertify.error("Validation failed."); }
		return isValid;
	},

	handleSaveEntryButtonTapped: function(inSender, inEvent, options)
	{
		if (this.get("mode") === "cancelled") { return; }

		if (!this.canEdit()) { return; }

		if (!this.validateInputs()) { return; }

		this.$.loadingPopup.show("Saving...");

		var ae = JSON.parse(JSON.stringify(this.get("activeEntry").raw()));
		if (!Array.isArray(ae.pendingTransactions)) { ae.pendingTransactions = []; }

		var as = JSON.parse(JSON.stringify(this.get("activeSubentry").raw()));

		if (this.get("mode") === "add")
		{
			// Set "newTransactionID" so that changes feed will be able to navigate to new Transaction once it has been added.
			this.set("newTransactionID", as._id);

			as.type = this.getSelected(this.$.typePicker);
			as.status = this.getSelected(this.$.statusPicker);
			as.numShares = quantum.parseInt(this.$.numSharesInput.get("value"));

			if (this.getSelected(this.$.typePicker) === "sale")
			{
				as.sharePrice = quantum.parseFloat(this.$.sharePriceInput.get("value"));
				as.currency = this.getSelected(this.$.currencyPicker);
				as.contactID = this.$.contactIDInput.get("value");
			}
			else
			{
				as.sharePrice = ae.exercisePrice;
				as.currency = ae.exerciseCurrency;
				as.contactID = ae.holderContactID;
			}

			ae.pendingTransactions.push(as);
		}
		else
		{
			var isFound = false;
			for (var i = 0; i < ae.pendingTransactions.length; i++)
			{
				if (ae.pendingTransactions[i]._id === as._id)
				{
					isFound = true;
					ae.pendingTransactions[i] = as;
					break;
				}
			}
			if (!isFound)
			{
				alertify.error("Pending transaction not found.");
				this.$.loadingPopup.hide();
				return;
			}
		}

		// Make sure that "_attachments", "documentsReceived", and "paymentsReceived" are initialized.
		if (!Array.isArray(as.documentsReceived)) { as.documentsReceived = []; }
		if (!Array.isArray(as.paymentsReceived)) { as.paymentsReceived = []; }
		if (ae._attachments == null) { ae._attachments = {}; }

		// Prepare documents and attachments that are queued to be deleted.
		this.$.supportingDocuments.get("documentsToDelete").forEach(function(currentValue, index, array) {
			// Update the "documentsReceived".
			var index = as.documentsReceived.findIndex(function(element, index, array) { return element.attachmentID === currentValue; });
			if (index !== -1) { as.documentsReceived.splice(index, 1); }
			// Update the "_attachments".
			delete ae._attachments[currentValue];
		});

		// Prepare documents and attachments that are queued to be uploaded.
		this.$.supportingDocuments.get("documentsToUpload").forEach(function(currentValue, index, array) {
			// Update the "documentsReceived".
			var value = Object.assign({}, currentValue);
			delete value.fileData;
			as.documentsReceived.push(value);
			// Update the "_attachments".
			ae._attachments[currentValue.attachmentID] = {
				"content_type": currentValue.fileType,
				"data": new Blob([new Uint8Array(currentValue.fileData)], {type: currentValue.fileType})
			};
		});

		// Prepare payments and attachments that are queued to be deleted.
		this.$.paymentSection.get("paymentsToDelete").forEach(function(currentValue, index, array) {
			// Update the "paymentsReceived".
			var index = as.paymentsReceived.findIndex(function(element, index, array) { return element.attachmentID === currentValue; });
			if (index !== -1) { as.paymentsReceived.splice(index, 1); }
			// Update the "_attachments".
			delete ae._attachments[currentValue];
		});

		// Prepare payments and attachments that are queued to be uploaded.
		this.$.paymentSection.get("paymentsToUpload").forEach(function(currentValue, index, array) {
			// Update the "paymentsReceived".
			var value = Object.assign({}, currentValue);
			delete value.fileData;
			as.paymentsReceived.push(value);
			// Update the "_attachments".
			ae._attachments[currentValue.attachmentID] = {
				"content_type": currentValue.fileType,
				"data": new Blob([new Uint8Array(currentValue.fileData)], {type: currentValue.fileType})
			};
		});

		// Caclulate the Transaction's status.
		as.status = this.calculateTransactionStatus(as);

		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
			if (err)
			{
				alertify.error("Login failed.");
				console.log(err);
				this.$.loadingPopup.hide();
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			this.get("database").post(ae, enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Entry update failed.");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				alertify.success("Entry updated.");
				this.$.loadingPopup.hide();

				// Since the save was successful, clear the document/payment queues now.
				this.$.supportingDocuments.clearQueues();
				this.$.paymentSection.clearQueues();

				// The "updateChangesFeed()" function will handle updating the underlying "activeEntry" and "warrantCollection".

				if (options && options.callback)
				{
					options.callback();
				}
			}));
		}));
	},

	handleCancelEntryButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		var componentName = "confirmCancelEntryPopup";

		if (this.$[componentName])
		{
			this.$[componentName].hide();
			this.$[componentName].destroy();
		}
		this.createComponent({name: componentName, kind: "quantum.ConfirmPopup", onYes: "cancelEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$[componentName].show("Cancel Entry? This cannot be undone.");
	},

	cancelEntry: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Cancelling...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			//alertify.error("Failed to cancel Transaction.");
			alertify.error(response.detail);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: quantum.preferences.get("company"),
			warrantID: this.get("activeEntry").get("_id"),
			transactionID: this.get("activeSubentry").get("_id")
		};

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "cancelwarranttransaction",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Transaction cancelled.");
			this.$.loadingPopup.hide();
		}));

		request.go();
	},

	isDirty: function()
	{
		var data = this.get("activeSubentry");

		if (data == null) { return false; }

		if (this.get("mode") === "cancelled") { return false; }

		return (
			data.get("type") !== this.getSelected(this.$.typePicker) ||
			data.get("status") !== this.getSelected(this.$.statusPicker) ||
			data.get("numShares") !== quantum.parseInt(this.$.numSharesInput.get("value")) ||
			data.get("sharePrice") !== quantum.parseFloat(this.$.sharePriceInput.get("value")) ||
			data.get("currency") !== this.getSelected(this.$.currencyPicker) ||
			data.get("contactID") !== this.$.contactIDInput.get("value") ||
			this.$.supportingDocuments.isDirty() ||
			this.$.paymentSection.isDirty()
		);
	},

	handleFinalizeEntryButtonTapped: function(inSender, inEvent)
	{
		var warrantStatus = this.get("activeEntry").get("status");
		if (warrantStatus !== "active" && warrantStatus !== "pendingTransaction")
		{
			alertify.error("Warrant Issuance Document must be signed before finalizing.");
			return;
		}

		this.doPromptSaveRequired({callback: enyo.bind(this, function() {
			this.finalizeEntry(inSender, inEvent);
		})});
	},

	finalizeEntry: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Finalizing...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to finalize Transaction.");
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: quantum.preferences.get("company"),
			warrantID: this.get("activeEntry").get("_id"),
			transactionID: this.get("activeSubentry").get("_id")
		};

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "finalizewarranttransaction",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: parameters,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(onError);

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				onError(request, response);
				return;
			}

			alertify.success("Transaction finalized.");
			this.$.loadingPopup.hide();
		}));

		request.go();
	},

	promptSaveChanges: function(inSender, inEvent, componentName, functionName)
	{
		if (typeof(componentName) !== 'string' || componentName.trim() === "") { componentName = "saveChangesPopup"; }
		if (typeof(functionName) !== 'string' || functionName.trim() === "")
		{
			alertify.error("'functionName' not specified.");
			return;
		}

		if (this.canEdit() && this.isDirty())
		{
			if (this.$[componentName])
			{
				this.$[componentName].hide();
				this.$[componentName].destroy();
			}
			this.createComponent({name: componentName, kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: functionName, onHide: "handlePopupHidden"} , {owner:this});
			this.$[componentName].show("Save changes?");
		}
		else { this[functionName](inSender, inEvent); }
	},

	handleNextEntryButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "next_saveChangesPopup", "nextEntry");
	},

	nextEntry: function(inSender, inEvent)
	{
		var data = this.get("transactionCollection");
		var i = data.indexOf(this.get("activeSubentry")) + 1;
		this.activate(data.at(i));
	},

	handlePreviousEntryButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "previous_saveChangesPopup", "previousEntry");
	},

	previousEntry: function(inSender, inEvent)
	{
		var data = this.get("transactionCollection");
		var i = data.indexOf(this.get("activeSubentry")) - 1;
		this.activate(data.at(i));
	},

	/*****************
	* Contact Search *
	*****************/

	handleSearchContactButtonTapped: function(inSender, inEvent)
	{
		var componentName = "shareholderSearchPopup";
		if (this.$[componentName])
		{
			this.$[componentName].hide();
			this.$[componentName].destroy();
		}
		this.createComponent({name: componentName, kind: "quantum.ShareholderSearchPopup", allowNewContact: false, enableSearch: true, searchRoles: ["any"], onShareholderSelected: "handleContactSelected", onHide: "handlePopupHidden"});
		this.$[componentName].show(this.$.contactNameInput.get("value"), quantum.preferences.get("company"));
	},

	handleContactSelected: function(inSender, inEvent)
	{
		if (!inEvent.shareholder)
		{
			alertify.error("No shareholder selected.");
			return;
		}

		var shareholder = inEvent.shareholder;

		this.$.contactNameInput.set("value", shareholder.get("contactName"));
		this.$.contactEmailInput.set("value", shareholder.get("emailAddress"));
		this.$.contactPhoneInput.set("value", shareholder.get("phoneNumber"));
		this.$.contactIDInput.set("value", shareholder.get("_id"));
	},

	handleViewContactButtonTapped: function(inSender, inEvent)
	{
		this.doViewEventDetail({mode: "contacts", target: this.get("activeSubentry").get("contactID")});
	},

	/***********************
	* Supporting Documents *
	***********************/

	handleAddDocument: function(inSender, inEvent)
	{
		var documentsToUpload = this.$.supportingDocuments.get("documentsToUpload");
		var documentsReceived = this.$.supportingDocuments.get("documentsReceived");
		var attachmentIndexes = Object.keys(this.get("activeEntry").get("_attachments") || {});

		// Generate random unique "attachmentID".
		var attachmentID = null;
		var byAttachmentID = function(element, index, array) {
			return element.attachmentID === attachmentID;
		};
		// Prepend a "$" (not an underscore since an attachment name in CouchDB can't start with that) to the "attachmentID" since a GUID can start with a number.
		do { attachmentID = "$" + uuid.v4().replace(/-/g, ""); }
		while (documentsToUpload.find(byAttachmentID) !== undefined || documentsReceived.find(byAttachmentID) !== undefined || attachmentIndexes.indexOf(attachmentID) !== -1);

		inEvent.payload.attachmentID = attachmentID;

		this.$.supportingDocuments.get("documentsToUpload").push(inEvent.payload);
		this.$.supportingDocuments.get("documentsReceived").push(Object.assign({}, inEvent.payload, {localDownload:true}));
		this.$.supportingDocuments.refreshRepeater();
		alertify.message("Document(s) ready to be uploaded.<br />Save changes to complete process.");
	},

	/******************
	* Payment Section *
	******************/

	handleAddPayment: function(inSender, inEvent)
	{
		var paymentsToUpload = this.$.paymentSection.get("paymentsToUpload");
		var paymentsReceived = this.$.paymentSection.get("paymentsReceived");
		var attachmentIndexes = Object.keys(this.get("activeEntry").get("_attachments") || {});

		// Generate random unique "attachmentID".
		var attachmentID = null;
		var byAttachmentID = function(element, index, array) {
			return element.attachmentID === attachmentID;
		};
		// Prepend a "$" (not an underscore since an attachment name in CouchDB can't start with that) to the "attachmentID" since a GUID can start with a number.
		do { attachmentID = "$" + uuid.v4().replace(/-/g, ""); }
		while (paymentsToUpload.find(byAttachmentID) !== undefined || paymentsReceived.find(byAttachmentID) !== undefined || attachmentIndexes.indexOf(attachmentID) !== -1);

		inEvent.payload.attachmentID = attachmentID;

		this.$.paymentSection.get("paymentsToUpload").push(inEvent.payload);
		this.$.paymentSection.get("paymentsReceived").push(Object.assign({}, inEvent.payload, {localDownload:true}));
		this.$.paymentSection.refreshRepeater();
		alertify.message("Payments(s) ready to be uploaded.<br />Save changes to complete process.");
	}
});