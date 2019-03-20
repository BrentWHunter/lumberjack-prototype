enyo.kind({
	name: "quantum.WarrantDetailPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onGoBack: "",
		onViewEventDetail: "",
		onViewItemDetailById: "",
		onLogout: ""
	},

	published: {
		database: null,
		activeEntry: null,
		warrantCollection: null,
		holderContactMap: null,
		mode: "edit",
		dateIssued: null,
		expiryDate: null,
		newWarrantID: null
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Warrant Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "expireEntryButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px;", content: "Expire Entry", ontap: "handleExpireEntryButtonTapped"},
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
				{kind: "quantum.Input", name:"dateIssuedInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Issuance Date", required:true, ontap: "handleDateIssuedInputTapped", readonly:true},
				{name: "calendarPopup", kind: "quantum.CalendarPopup", onSelect: "calendarDateChanged"},
				{kind: "quantum.Input", name:"expiryDateInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Expiration Date", required:true, ontap: "handleExpiryDateInputTapped", readonly:true},
				{name: "calendarPopup2", kind: "quantum.CalendarPopup", onSelect: "calendarDateChanged2"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Warrant Status", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "statusPickerButton", style: "width: 100%;"},
						{name: "statusPicker", kind: "onyx.Picker", components: [
							{content: "New", value: "new"},
							{content: "Active", value: "active"},
							{content: "Active - Pending Transaction", value: "pendingTransaction"},
							{content: "Exercised", value: "exercised"},
							{content: "Split", value: "split"},
							{content: "Exhausted", value: "exhausted"},
							{content: "Expired", value: "expired"}
						]}
					]}
				]},
				{kind: "quantum.Input", name:"numSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"int", label:"Number of Shares", required:true, inputMaxLength:10},
				{kind: "quantum.Input", name:"exercisePriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"float", label:"Price per Share", required:true, inputMaxLength:10},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Exercise Currency", style: "line-height: 38px; width: 170px;"},
					{kind: "quantum.CurrencyPicker", name: "exerciseCurrencyPicker", style: "margin-left: 10px; width: 350px;"}
				]}
			]},
			{style: "margin-left: 1%; width: 49%;", components: []}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{style: "width: 50%;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Warrant Holder Details"},
					{fit: true},
					{name: "viewHolderButton", kind: "quantum.Button", style: "height: 30px;", content: "View Holder", ontap: "handleViewHolderButtonTapped"},
					{name: "searchHolderButton", kind: "quantum.Button", style: "height: 30px;", content: "Search Holders", ontap: "handleSearchHolderButtonTapped"}
				]},
				{kind: "quantum.Input", name:"holderNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Holder Name", required:true},
				{kind: "quantum.Input", name:"holderEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Holder Email Address", required:true},
				{kind: "quantum.Input", name:"holderPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"tel", label:"Holder Phone Number", required:true},
				{kind: "quantum.Input", name:"holderContactIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", showing: false, label:"Holder Contact ID", required:true}
			]},
			{style: "margin-left: 1%; width: 49%;", components: []}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{name: "navigationSection", style: "width: 50%;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Warrant Tree Navigation"}
				]},
				{name: "viewRootButton", kind: "quantum.Button", style: "margin-top: 10px;", content: "View Root", ontap: "handleViewRootButtonTapped"},
				{name: "viewParentButton", kind: "quantum.Button", style: "margin-top: 10px; margin-left: 10px;", content: "View Parent", ontap: "handleViewParentButtonTapped"},
				{name: "viewChild1Button", kind: "quantum.Button", style: "margin-top: 10px; margin-left: 10px;", content: "View Child #1", ontap: "handleViewChild1ButtonTapped"},
				{name: "viewChild2Button", kind: "quantum.Button", style: "margin-top: 10px; margin-left: 10px;", content: "View Child #2", ontap: "handleViewChild2ButtonTapped"}
			]},
			{style: "margin-left: 1%; width: 49%;", components: []}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.AdobeDocumentSection", name: "issuanceDocSection",
				header: "Issuance Document",
				// Attachment keys:
				signedAttachmentIdKey: "signedAttachmentID",
				signedFileNameKey: "signedFileName",
				unsignedAttachmentIdKey: "unsignedAttachmentID",
				unsignedFileNameKey: "unsignedFileName",
				// ID key(s):
				idKey: "warrantID",
				// Routes:
				routeCancel: "cancelwarrantissuancedocument",
				routeGenerate: "generatewarrantissuancedocument",
				routeGetStatus: "getwarrantissuancedocumentstatus",
				routeRefreshStatus: "refreshwarrantissuancedocumentstatus",
				routeSend: "sendwarrantissuancedocument",
				routeSendReminder: "sendwarrantissuancedocumentreminder"
			}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.AdobeDocumentSection", name: "transactionDocSection",
				header: "Transaction Document",
				readOnly: true,
				// Attachment keys:
				signedAttachmentIdKey: "signedAttachmentID",
				signedFileNameKey: "signedFileName",
				unsignedAttachmentIdKey: "unsignedAttachmentID",
				unsignedFileNameKey: "unsignedFileName",
				// Disable flags:
				disableViewStatus: true
			}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.AdobeDocumentSection", name: "treasuryOrderDocSection",
				header: "Treasury Order Document",
				readOnly: true,
				// Attachment keys:
				signedAttachmentIdKey: "signedAttachmentID",
				signedFileNameKey: "signedFileName",
				unsignedAttachmentIdKey: "unsignedAttachmentID",
				unsignedFileNameKey: "unsignedFileName",
				// Disable flags:
				disableViewStatus: true,
				disableViewUnsigned: true
			}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.SupportingDocuments", name: "supportingDocuments", module: "warrant", style: "width: 50%", onAddDocument: "handleAddDocument", attachmentIndexKey: "attachmentID"},
			{kind: "quantum.PaymentSection", name: "paymentSection", module: "warrant", style: "width: 50%", onAddPayment: "handleAddPayment", onAddRefund: "handleAddPayment", attachmentIndexKey: "attachmentID"}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "quantum.WarrantTransactions", name: "pendingTransactionsSection", style: "width: 50%; padding-right: 5px;", mode: "pending"},
			{kind: "quantum.WarrantTransactions", name: "cancelledTransactionsSection", style: "width: 50%; padding-left: 5px;", mode: "cancelled"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".mode", to: ".$.editButtons.showing", transform: function(v) {
			return v === "edit";
		}},
		{from: ".mode", to: ".$.addButtons.showing", transform: function(v) {
			return v === "add";
		}},
		{from: ".mode", to: ".$.viewHolderButton.showing", transform: function(v) {
			return v === "edit";
		}},
		{from: ".mode", to: ".$.searchHolderButton.showing", transform: function(v) {
			return v === "add";
		}},
		{from: ".activeEntry", to: ".$.expireEntryButton.disabled", transform: function(v) {
			try
			{
				var isActionableStatus = (new quantum.WarrantFilterSettingsModel()).isActionableStatus(v.get("status"));
				if (isActionableStatus && quantum.parseInt(v.get("numShares")) > 0)
				{
					return false;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.saveEntryButton.disabled", transform: function(v) {
			try
			{
				var isActionableStatus = (new quantum.WarrantFilterSettingsModel()).isActionableStatus(v.get("status"));
				if (isActionableStatus && quantum.parseInt(v.get("numShares")) > 0)
				{
					return false;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("warrantCollection");
				if (data != null && data instanceof enyo.Collection)
				{
					return data.indexOf(v) === -1 || data.indexOf(v) === 0;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("warrantCollection");
				if (data != null && data instanceof enyo.Collection)
				{
					return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".dateIssued", to: ".$.dateIssuedInput.value", transform: function(v) {
			try
			{
				if (v != null && v.isValid())
				{
					return v.format("YYYY/MM/DD");
				}
				else { throw null; }
			}
			catch (err) { return "1984/01/10"; }
		}},
		{from: ".expiryDate", to: ".$.expiryDateInput.value", transform: function(v) {
			try
			{
				if (v != null && v.isValid())
				{
					return v.format("YYYY/MM/DD");
				}
				else { throw null; }
			}
			catch (err) { return "1984/01/10"; }
		}},
		{from: ".activeEntry.dateIssued", to: ".dateIssued", transform: function(v) {
			try
			{
				if (v != null && v !== "" && v !== 0)
				{
					return new moment(v);
				}
				else { throw null; }
			}
			catch (err) { return new moment("1984/01/10", "YYYY/MM/DD"); }
		}},
		{from: ".activeEntry.expiryDate", to: ".expiryDate", transform: function(v) {
			try
			{
				if (v != null && v !== "" && v !== 0)
				{
					return new moment(v);
				}
				else { throw null; }
			}
			catch (err) { return new moment("1984/01/10", "YYYY/MM/DD"); }
		}},
		{from: ".activeEntry.status", to: ".$.statusPicker.selected", transform: function(val) {
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
						console.log('Warrant Status "' + val + '" not found in picker!');
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
		{from: ".activeEntry.numShares", to: ".$.numSharesInput.value", transform: function(v) {
			try
			{
				if (v != null && v !== "")
				{
					return v;
				}
				else { throw null; }
			}
			catch (err) { return 0; }
		}},
		{from: ".activeEntry.exercisePrice", to: ".$.exercisePriceInput.value", transform: function(v) {
			try
			{
				if (v != null && v !== "")
				{
					return v;
				}
				else { throw null; }
			}
			catch (err) { return 0; }
		}},
		{from: ".activeEntry.exerciseCurrency", to: ".$.exerciseCurrencyPicker.selected", transform: function(v) {
			try
			{
				if (v != null && v !== "")
				{
					return v;
				}
				else { throw null; }
			}
			catch (err) { return "USD"; }
		}},
		{from: ".activeEntry.holderContactID", to: ".$.holderContactIDInput.value", transform: function(v) {
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
		{from: ".activeEntry", to: ".$.holderNameInput.value", transform: function(v) {
			try
			{
				var data = this.get("holderContactMap");
				if (this.get("mode") === "edit" && data != null && v instanceof quantum.WarrantModel)
				{
					return data[v.get("holderContactID")].contactName;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.holderEmailInput.value", transform: function(v) {
			try
			{
				var data = this.get("holderContactMap");
				if (this.get("mode") === "edit" && data != null && v instanceof quantum.WarrantModel)
				{
					return data[v.get("holderContactID")].emailAddress;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.holderPhoneInput.value", transform: function(v) {
			try
			{
				var data = this.get("holderContactMap");
				if (this.get("mode") === "edit" && data != null && v instanceof quantum.WarrantModel)
				{
					return data[v.get("holderContactID")].phoneNumber;
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		// Navigation Section
		{from: ".activeEntry", to: ".$.navigationSection.showing", transform: function(v) {
			try
			{
				var data = v.get("rootID");
				if (this.get("mode") === "edit" && typeof(data) === 'string' && data.trim() !== "")
				{
					var value;
					if (data === v.get("_id"))
					{
						value = v.get("childIDs");
						return (Array.isArray(value) && value.length > 0);
					}
					else
					{
						value = v.get("parentID");
						return (typeof(value) === 'string' && value.trim() !== "");
					}
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".activeEntry", to: ".$.viewRootButton.disabled", transform: function(v) {
			try
			{
				var data = v.get("rootID");
				if (this.get("mode") === "edit" && typeof(data) === 'string' && data.trim() !== "")
				{
					return data === v.get("_id");
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.viewParentButton.disabled", transform: function(v) {
			try
			{
				var data = v.get("parentID");
				if (this.get("mode") === "edit" && typeof(data) === 'string' && data.trim() !== "")
				{
					return false;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.viewChild1Button.disabled", transform: function(v) {
			try
			{
				var data = v.get("childIDs");
				if (this.get("mode") === "edit" && Array.isArray(data) && data.length > 0)
				{
					var value = data[0];
					return !(typeof(value) === 'string' && value.trim() !== "");
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.viewChild2Button.disabled", transform: function(v) {
			try
			{
				var data = v.get("childIDs");
				if (this.get("mode") === "edit" && Array.isArray(data) && data.length > 1)
				{
					var value = data[1];
					return !(typeof(value) === 'string' && value.trim() !== "");
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		// Issuance Document Section:
		{from: ".activeEntry", to: ".$.issuanceDocSection.activeEntry"},
		{from: ".database", to: ".$.issuanceDocSection.database"},
		{from: ".activeEntry.issuanceDoc", to: ".$.issuanceDocSection.doc"},
		{from: ".activeEntry", to: ".$.issuanceDocSection.readOnly", transform: function(v) {
			try
			{
				var data = v.get("status");
				if (data === "new")
				{
					return this.canEdit() !== true;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.issuanceDocSection.showing", transform: function(v) {
			try
			{
				var data = v.get("status");
				if (data !== "exhausted")
				{
					return this.get("mode") === "edit";
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		// Transaction Document Section:
		{from: ".activeEntry", to: ".$.transactionDocSection.activeEntry"},
		{from: ".database", to: ".$.transactionDocSection.database"},
		{from: ".activeEntry.transactionDoc", to: ".$.transactionDocSection.doc"},
		{from: ".activeEntry.status", to: ".$.transactionDocSection.showing", transform: function(v) {
			return v === "exercised" || v === "split";
		}},
		{from: ".activeEntry.status", to: ".$.transactionDocSection.header", transform: function(v) {
			try
			{
				switch (v)
				{
					case "exercised":
						return "Exercise Document";
					case "split":
						return "Sale Document";
					default:
						throw null;
				}
			}
			catch (err) { return "Transaction Document"; }
		}},
		// Treasury Order Document Section:
		{from: ".activeEntry", to: ".$.treasuryOrderDocSection.activeEntry"},
		{from: ".database", to: ".$.treasuryOrderDocSection.database"},
		{from: ".activeEntry.treasuryOrderDoc", to: ".$.treasuryOrderDocSection.doc"},
		{from: ".activeEntry.status", to: ".$.treasuryOrderDocSection.showing", transform: function(v) {
			return v === "exercised";
		}},
		// Supporting Documents:
		{from: ".activeEntry", to: ".$.supportingDocuments.activeEntry"},
		{from: ".database", to: ".$.supportingDocuments.database"},
		{from: ".activeEntry", to: ".$.supportingDocuments.documentsReceived", transform: function(v) {
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
		{from: ".activeEntry", to: ".$.supportingDocuments.readOnly", transform: function(v) {
			try
			{
				var data = v.get("status");
				if ((new quantum.WarrantFilterSettingsModel()).isActionableStatus(data))
				{
					return false;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		// Payment Section:
		{from: ".activeEntry", to: ".$.paymentSection.activeEntry"},
		{from: ".database", to: ".$.paymentSection.database"},
		{from: ".activeEntry", to: ".$.paymentSection.paymentsReceived", transform: function(v) {
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
		{from: "activeEntry", to: ".$.paymentSection.purchaseTotal", transform: function(v) {
			try
			{
				return quantum.parseInt(v.get("numShares")) * quantum.parseFloat(v.get("exercisePrice"));
			}
			catch (err) { return 0; }
		}},
		{from: ".mode", to: ".$.paymentSection.showing", transform: function(v) {
			return v === "edit";
		}},
		// Pending Transactions:
		{from: ".activeEntry", to: ".$.pendingTransactionsSection.transactionCollection", transform: function(v) {
			try
			{
				var data = v.get("pendingTransactions");
				if (data != null)
				{
					return data;
				}
				else { throw null; }
			}
			catch (err) { return null; }
		}},
		{from: ".mode", to: ".$.pendingTransactionsSection.showing", transform: function(v) {
			return v === "edit";
		}},
		{from: ".activeEntry", to: ".$.pendingTransactionsSection.$.addTransactionButton.disabled", transform: function(v) {
			try
			{
				var data = v.get("status");
				if ((data === "active" || data === "pendingTransaction") && quantum.parseInt(v.get("numShares")) > 0)
				{
					return false;
				}
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		// Cancelled Transactions:
		{from: ".activeEntry", to: ".$.cancelledTransactionsSection.transactionCollection", transform: function(v) {
			try
			{
				var data = v.get("cancelledTransactions");
				if (data != null)
				{
					return data;
				}
				else { throw null; }
			}
			catch (err) { return null; }
		}},
		{from: ".mode", to: ".$.cancelledTransactionsSection.showing", transform: function(v) {
			return v === "edit";
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
		this.$.expireEntryButton.set("showing", quantum.hasRole(["admins"], "warrant"));
		this.$.saveEntryButton.set("showing", this.canEdit());

		this.$.addEntryButton.set("showing", this.canEdit());
	},

	setDisabledForRoles: function()
	{
		// Warrant status should only change when certain events occur.
		this.$.statusPickerButton.set("disabled", true);

		// Holder Contact info is not editable here.
		this.$.holderNameInput.set("disabled", true);
		this.$.holderEmailInput.set("disabled", true);
		this.$.holderPhoneInput.set("disabled", true);
		this.$.holderContactIDInput.set("disabled", true);

		// Payments are not editable here.
		this.$.paymentSection.setAddDisabled(true);
		this.$.paymentSection.setRefundDisabled(true);

		var disabled = !(this.canEdit() && this.get("mode") === "add");

		this.$.dateIssuedInput.set("disabled", disabled);
		this.$.expiryDateInput.set("disabled", disabled);
		this.$.numSharesInput.set("disabled", disabled);
		this.$.exercisePriceInput.set("disabled", disabled);
		this.$.exerciseCurrencyPicker.set("disabled", disabled);
	},

	refreshRepeaters: function()
	{
		this.$.supportingDocuments.refreshRepeater();
		this.$.paymentSection.refreshRepeater();
		this.$.pendingTransactionsSection.refreshRepeater();
		this.$.cancelledTransactionsSection.refreshRepeater();
	},

	activate: function(activeEntry)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "warrant"))
		{
			// Setting the "activeEntry" to null before navigating away prevents a prompt to save changes.
			this.set("activeEntry", null);
			this.doGoBack();
			return;
		}

		this.clearBorderError();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new quantum.WarrantModel({}));
		if (activeEntry != null) { this.set("activeEntry", activeEntry); }

		// Set "newWarrantID" to null here so that it doesn't persist if anything goes wrong.
		this.set("newWarrantID", null);

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

		// Issuance Date:
		if (!this.$.dateIssuedInput.validate()) { isValid = false; }

		// Expiration Date:
		if (!this.$.expiryDateInput.validate()) { isValid = false; }
		else if (this.get("expiryDate").isBefore(this.get("dateIssued"), "day") || this.get("expiryDate").isBefore(moment(), "day"))
		{
			isValid = false;
			this.$.expiryDateInput.setBorderError();
		}

		// Warrant Status:
		validate_selected(this.$.statusPicker);

		// Number of Shares:
		if (!this.$.numSharesInput.validate()) { isValid = false; }
		else if (quantum.parseInt(this.$.numSharesInput.get("value")) <= 0)
		{
			isValid = false;
			this.$.numSharesInput.setBorderError();
		}

		// Price per Share:
		if (!this.$.exercisePriceInput.validate()) { isValid = false; }
		else if (quantum.parseFloat(this.$.exercisePriceInput.get("value")) <= 0)
		{
			isValid = false;
			this.$.exercisePriceInput.setBorderError();
		}

		// Exercise Currency:
		validate_selected(this.$.exerciseCurrencyPicker, true);

		// Holder Contact ID:
		if (!this.$.holderContactIDInput.validate())
		{
			isValid = false;
			this.$.holderNameInput.setBorderError();
			this.$.holderEmailInput.setBorderError();
			this.$.holderPhoneInput.setBorderError();
		}

		if (!isValid) { alertify.error("Validation failed."); }
		return isValid;
	},

	handleSaveEntryButtonTapped: function(inSender, inEvent, options)
	{
		if (!this.canEdit()) { return; }

		if (!this.validateInputs()) { return; }

		this.$.loadingPopup.show("Saving...");

		var ae = JSON.parse(JSON.stringify(this.get("activeEntry").raw()));

		if (this.get("mode") === "add")
		{
			ae._id = uuid.v4().replace(/-/g, "");
			ae.rootID = ae._id;

			// Set "newWarrantID" so that changes feed will be able to navigate to new Warrant once it has been added.
			this.set("newWarrantID", ae._id);

			ae.dateIssued = this.get("dateIssued").valueOf();
			ae.expiryDate = this.get("expiryDate").valueOf();
			ae.status = this.getSelected(this.$.statusPicker);
			ae.numShares = quantum.parseInt(this.$.numSharesInput.get("value"));
			ae.exercisePrice = quantum.parseFloat(this.$.exercisePriceInput.get("value"));
			ae.exerciseCurrency = this.getSelected(this.$.exerciseCurrencyPicker);
			ae.holderContactID = this.$.holderContactIDInput.get("value");
		}

		// Make sure that "_attachments", "documentsReceived", and "paymentsReceived" are initialized.
		if (!Array.isArray(ae.documentsReceived)) { ae.documentsReceived = []; }
		if (!Array.isArray(ae.paymentsReceived)) { ae.paymentsReceived = []; }
		if (ae._attachments == null) { ae._attachments = {}; }

		// Prepare documents and attachments that are queued to be deleted.
		this.$.supportingDocuments.get("documentsToDelete").forEach(function(currentValue, index, array) {
			// Update the "documentsReceived".
			var index = ae.documentsReceived.findIndex(function(element, index, array) { return element.attachmentID === currentValue; });
			if (index !== -1) { ae.documentsReceived.splice(index, 1); }
			// Update the "_attachments".
			delete ae._attachments[currentValue];
		});

		// Prepare documents and attachments that are queued to be uploaded.
		this.$.supportingDocuments.get("documentsToUpload").forEach(function(currentValue, index, array) {
			// Update the "documentsReceived".
			var value = Object.assign({}, currentValue);
			delete value.fileData;
			ae.documentsReceived.push(value);
			// Update the "_attachments".
			ae._attachments[currentValue.attachmentID] = {
				"content_type": currentValue.fileType,
				"data": new Blob([new Uint8Array(currentValue.fileData)], {type: currentValue.fileType})
			};
		});

		// Prepare payments and attachments that are queued to be deleted.
		this.$.paymentSection.get("paymentsToDelete").forEach(function(currentValue, index, array) {
			// Update the "paymentsReceived".
			var index = ae.paymentsReceived.findIndex(function(element, index, array) { return element.attachmentID === currentValue; });
			if (index !== -1) { ae.paymentsReceived.splice(index, 1); }
			// Update the "_attachments".
			delete ae._attachments[currentValue];
		});

		// Prepare payments and attachments that are queued to be uploaded.
		this.$.paymentSection.get("paymentsToUpload").forEach(function(currentValue, index, array) {
			// Update the "paymentsReceived".
			var value = Object.assign({}, currentValue);
			delete value.fileData;
			ae.paymentsReceived.push(value);
			// Update the "_attachments".
			ae._attachments[currentValue.attachmentID] = {
				"content_type": currentValue.fileType,
				"data": new Blob([new Uint8Array(currentValue.fileData)], {type: currentValue.fileType})
			};
		});

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
				
				this.$.loadingPopup.hide();

				// Since the save was successful, clear the document/payment queues now.
				this.$.supportingDocuments.clearQueues();
				this.$.paymentSection.clearQueues();

				// The "updateChangesFeed()" function will handle updating the underlying "activeEntry" and "warrantCollection".

				var onComplete = function() {
					if (options && options.callback)
					{
						options.callback();
					}
				};

				if (this.get("mode") === "add")
				{
					this.addWarrantToContact(ae.holderContactID, ae._id, onComplete);
				}
				else
				{
					onComplete();
				}
			}));
		}));
	},

	addWarrantToContact: function(contactID, warrantID, callback)
	{
		this.$.loadingPopup.show("Updating Contact...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			alertify.error("Failed to update Contact.");
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: quantum.preferences.get("company"),
			contactID: contactID,
			warrantID: warrantID
		};

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "addwarranttocontact",
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

			alertify.success("Contact updated.");
			this.$.loadingPopup.hide();

			callback();
		}));

		request.go();
	},

	handleExpireEntryButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "warrant")) { return; }

		var componentName = "confirmExpireEntryPopup";

		if (this.$[componentName])
		{
			this.$[componentName].hide();
			this.$[componentName].destroy();
		}
		this.createComponent({name: componentName, kind: "quantum.ConfirmPopup", onYes: "expireEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$[componentName].show("Expire entire Warrant tree? This cannot be undone.");
	},

	expireEntry: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Expiring...");

		var onError = enyo.bind(this, function(request, response) {
			console.log({request: request, response: response});
			//alertify.error("Failed to expire Warrant.");
			alertify.error(response.detail);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
		});

		var parameters = {
			companyID: quantum.preferences.get("company"),
			warrantID: this.get("activeEntry").get("_id")
		};

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "expirewarrant",
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

			alertify.success("Warrant tree expired.");
			this.$.loadingPopup.hide();
		}));

		request.go();
	},

	isDirty: function()
	{
		var data = this.get("activeEntry");

		if (data == null) { return false; }

		return (
			data.get("dateIssued") !== this.get("dateIssued").valueOf() ||
			data.get("expiryDate") !== this.get("expiryDate").valueOf() ||
			data.get("status") !== this.getSelected(this.$.statusPicker) ||
			data.get("numShares") !== quantum.parseInt(this.$.numSharesInput.get("value")) ||
			data.get("exercisePrice") !== quantum.parseFloat(this.$.exercisePriceInput.get("value")) ||
			data.get("exerciseCurrency") !== this.getSelected(this.$.exerciseCurrencyPicker) ||
			data.get("holderContactID") !== this.$.holderContactIDInput.get("value") ||
			this.$.supportingDocuments.isDirty() ||
			this.$.paymentSection.isDirty()
		);
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
		var data = this.get("warrantCollection");
		var i = data.indexOf(this.get("activeEntry")) + 1;
		this.activate(data.at(i));
	},

	handlePreviousEntryButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "previous_saveChangesPopup", "previousEntry");
	},

	previousEntry: function(inSender, inEvent)
	{
		var data = this.get("warrantCollection");
		var i = data.indexOf(this.get("activeEntry")) - 1;
		this.activate(data.at(i));
	},

	handleViewRootButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "viewRoot_saveChangesPopup", "viewRoot");
	},

	viewRoot: function(inSender, inEvent)
	{
		this.doViewItemDetailById({id: this.get("activeEntry").get("rootID")});
	},

	handleViewParentButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "viewParent_saveChangesPopup", "viewParent");
	},

	viewParent: function(inSender, inEvent)
	{
		this.doViewItemDetailById({id: this.get("activeEntry").get("parentID")});
	},

	handleViewChild1ButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "viewChild1_saveChangesPopup", "viewChild1");
	},

	viewChild1: function(inSender, inEvent)
	{
		this.doViewItemDetailById({id: this.get("activeEntry").get("childIDs")[0]});
	},

	handleViewChild2ButtonTapped: function(inSender, inEvent)
	{
		this.promptSaveChanges(inSender, inEvent, "viewChild2_saveChangesPopup", "viewChild2");
	},

	viewChild2: function(inSender, inEvent)
	{
		this.doViewItemDetailById({id: this.get("activeEntry").get("childIDs")[1]});
	},

	/***********
	* Calendar *
	***********/

	handleDateIssuedInputTapped: function(inSender, inEvent)
	{
		if (this.get("mode") === "add")
		{
			this.$.calendarPopup.show();
		}
	},

	handleExpiryDateInputTapped: function(inSender, inEvent)
	{
		if (this.get("mode") === "add")
		{
			this.$.calendarPopup2.show();
		}
	},

	calendarDateChanged: function(inSender, inEvent)
	{
		this.set("dateIssued", new moment(inEvent.date));
		this.$.calendarPopup.hide();
		return true;
	},

	calendarDateChanged2: function(inSender, inEvent)
	{
		this.set("expiryDate", new moment(inEvent.date));
		this.$.calendarPopup2.hide();
		return true;
	},

	/*****************
	* Contact Search *
	*****************/

	handleSearchHolderButtonTapped: function(inSender, inEvent)
	{
		var componentName = "shareholderSearchPopup";
		if (this.$[componentName])
		{
			this.$[componentName].hide();
			this.$[componentName].destroy();
		}
		this.createComponent({name: componentName, kind: "quantum.ShareholderSearchPopup", allowNewContact: false, enableSearch: true, searchRoles: ["warrantholder"], onShareholderSelected: "handleHolderSelected", onHide: "handlePopupHidden"});
		this.$[componentName].show(this.$.holderNameInput.get("value"), quantum.preferences.get("company"));
	},

	handleHolderSelected: function(inSender, inEvent)
	{
		if (!inEvent.shareholder)
		{
			alertify.error("No shareholder selected.");
			return;
		}

		var shareholder = inEvent.shareholder;

		this.$.holderNameInput.set("value", shareholder.get("contactName"));
		this.$.holderEmailInput.set("value", shareholder.get("emailAddress"));
		this.$.holderPhoneInput.set("value", shareholder.get("phoneNumber"));
		this.$.holderContactIDInput.set("value", shareholder.get("_id"));
	},

	handleViewHolderButtonTapped: function(inSender, inEvent)
	{
		this.doViewEventDetail({mode: "contacts", target: this.get("activeEntry").get("holderContactID")});
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