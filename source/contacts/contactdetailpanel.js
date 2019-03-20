enyo.kind({
	name: "quantum.ContactDetailPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onGoBack: "",
		onGoHome: ""
	},

	published: {
		database: null,
		activeEntry: null,
		contactCollection: null,
		mode: "edit",
		jurisdiction: "",
		contactType: "",
		shareholderRoleActive: false,
		shareholderRoleArchived: false
	},

	computed: {
		showShareholderInformationSection: ["shareholderRoleActive", "shareholderRoleArchived"]
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "General Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "deleteEntryButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px;", content: "Delete Entry", ontap: "handleDeleteEntryButtonTapped"},
				{name: "saveEntryButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Save Entry", ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]},
			{name: "addButtons", components: [
				{name: "cancelButton", kind: "quantum.Button", content: "Cancel", ontap: "handleCancelButtonTapped"},
				{name: "addEntryButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Add Entry", ontap: "handleSaveEntryButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 50%; padding-right: 5px;", components: [
				{kind: "quantum.Input", name:"contactNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Name", required:true},
				{name: "corporateContactSection", components: [
					{kind: "quantum.Input", name:"contactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Person", required:true},
					{kind: "quantum.Input", name:"contactPersonTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Person Title", required:true},
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Date of Birth", style: "line-height: 28px; width: 170px;"},
					{kind: "quantum.Input", name:"birthDayInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 10px; width: 35px; margin-right: 3px;", inputStyle: "width: 35px; text-align: center;", type:"text", label:"", placeholder: "DD", required:true, inputMaxLength:2, onkeydown: "validateNumberInput"},
					{kind: "quantum.Input", name:"birthMonthInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 3px; width: 35px; margin-right: 3px;", inputStyle: "width: 35px; text-align: center;", type:"text", label:"/", required:true, placeholder: "MM", inputMaxLength:2, onkeydown: "validateNumberInput"},
					{kind: "quantum.Input", name:"birthYearInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 3px; width: 50px; margin-right: 3px;", inputStyle: "width: 50px; text-align: center;", type:"text", label:"/", required:true, placeholder: "YYYY", inputMaxLength:4, onkeydown: "validateNumberInput"},
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Contact Jurisdiction", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 292px;", components: [
						{name: "jurisdictionPickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "jurisdictionPicker", kind: "onyx.Picker", onSelect:"handleJurisdictionChange", components: [
							{content: "United States", value: "usa"},
							{content: "Canada", value: "canada"},
							{content: "International", value: "international"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Contact Type", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 292px;", components: [
						{name: "contactTypePickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "contactTypePicker", kind: "onyx.Picker", components: [
							{content: "Individual/Joint", value: "individual"},
							{content: "Corporate/Trust/Other", value: "corporate"}
						]}
					]}
				]}
			]},
			{style: "width: 50%; padding-left: 5px;", components: [
				{content: "Roles", style: "margin-top: 20px; font-size: 18px;"},
				{kind:"quantum.Checkbox", name:"shareholderRoleCheckbox", content:"Shareholder", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", disabled: true, onActivate: "handleRoleCheckboxActivated"},
				{kind:"quantum.Checkbox", name:"subscriberRoleCheckbox", content:"Subscriber", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", disabled: true, onActivate: "handleRoleCheckboxActivated"},
				{kind:"quantum.Checkbox", name:"buyerRoleCheckbox", content:"Buyer", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onActivate: "handleRoleCheckboxActivated"},
				{kind:"quantum.Checkbox", name:"optionholderRoleCheckbox", content:"Option Holder", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onActivate: "handleRoleCheckboxActivated"},
				{kind:"quantum.Checkbox", name:"warrantholderRoleCheckbox", content:"Warrant Holder", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onActivate: "handleRoleCheckboxActivated"}
			]}
		]},
		{name: "contactInfoSection", kind: "quantum.ContactInfo"},
		{name: "addressInfoSection", kind: "quantum.AddressInfo"},
		{name: "shareholderInformationSection", kind: "quantum.ShareholderInformationModule"},
		{name: "activeSubscriberInformationSection", kind: "quantum.SubscriberInformationModule", title: "Active Subscriptions"},
		{name: "cancelledSubscriberInformationSection", kind: "quantum.SubscriberInformationModule", mode: "cancelled", title: "Cancelled Subscriptions"},
		{name: "buyerInformationSection", kind: "quantum.BuyerInformationModule", onRequestSave: "handleRequestSave", onDownloadDocument: "handleDownloadDocument"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".mode", to: ".$.editButtons.showing", transform: function(v){
			return v === "edit";
		}},
		{from: ".mode", to: ".$.addButtons.showing", transform: function(v){
			return v === "add";
		}},
		//Shareholder Role
		{from: ".activeEntry.activeRoles", to: ".shareholderRoleActive", transform: function(v){
			try {
				if (v.indexOf("shareholder") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".activeEntry.archivedRoles", to: ".shareholderRoleArchived", transform: function(v){
			try {
				if (v.indexOf("shareholder") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".shareholderRoleActive", to: ".$.shareholderRoleCheckbox.checked"},	
		{from: ".showShareholderInformationSection", to: ".$.shareholderInformationSection.showing"},
		{from: ".activeEntry", to: ".$.shareholderInformationSection.shareholderInfo", transform: function(v){
			try {
				if ((v.get("archivedRoles").indexOf("shareholder") !== -1 || v.get("activeRoles").indexOf("shareholder") !== -1) && v.get("shareholderInfo")) {
					return v.get("shareholderInfo");
				}
				return null;
			}
			catch (e)
			{
				return null;
			}
		}},
		//Subscriber Role
		{from: ".activeEntry.activeRoles", to: ".$.subscriberRoleCheckbox.checked", transform: function(v){
			try {
				if (v.indexOf("subscriber") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".activeEntry", to: ".$.activeSubscriberInformationSection.subscriberInfo", transform: function(v){
			try {
				if (v.get("activeRoles").indexOf("subscriber") !== -1 && v.get("subscriberInfo")) {
					return v.get("subscriberInfo");
				}
				return null;
			}
			catch (e)
			{
				return null;
			}
		}},
		{from: ".activeEntry", to: ".$.cancelledSubscriberInformationSection.subscriberInfo", transform: function(v){
			try {
				if (v.get("activeRoles").indexOf("subscriber") !== -1 && v.get("subscriberInfo")) {
					return v.get("subscriberInfo");
				}
				return null;
			}
			catch (e)
			{
				return null;
			}
		}},
		{from: ".$.activeSubscriberInformationSection.subscriptions", to: ".$.activeSubscriberInformationSection.showing", transform: function(v){
			return v && v.length > 0;
		}},
		{from: ".$.cancelledSubscriberInformationSection.subscriptions", to: ".$.cancelledSubscriberInformationSection.showing", transform: function(v){
			return v && v.length > 0;
		}},
		//Buyer Role
		{from: ".activeEntry.activeRoles", to: ".$.buyerRoleCheckbox.checked", transform: function(v){
			try {
				if (v.indexOf("buyer") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".activeEntry.activeRoles", to: ".$.buyerRoleCheckbox.disabled", transform: function(v){
			try {
				if (v.indexOf("buyer") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		//Holder Roles
		{from: ".activeEntry.activeRoles", to: ".$.optionholderRoleCheckbox.checked", transform: function(v){
			try {
				if (v.indexOf("optionholder") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".activeEntry.activeRoles", to: ".$.optionholderRoleCheckbox.disabled", transform: function(v){
			try {
				if (v.indexOf("optionholder") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".activeEntry.activeRoles", to: ".$.warrantholderRoleCheckbox.checked", transform: function(v){
			try {
				if (v.indexOf("warrantholder") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".activeEntry.activeRoles", to: ".$.warrantholderRoleCheckbox.disabled", transform: function(v){
			try {
				if (v.indexOf("warrantholder") !== -1) {return true;}
				return false;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".jurisdiction", to: ".$.buyerInformationSection.buyerJurisdiction"},
		{from: ".contactType", to: ".$.buyerInformationSection.buyerType"},
		{from: ".activeEntry", to: ".$.buyerInformationSection.contactInfo"},
		{from: ".activeEntry", to: ".$.buyerInformationSection.buyerInfo", transform: function(v){
			try {
				if (v.get("activeRoles").indexOf("buyer") !== -1 && v.get("buyerInfo")) {
					return v.get("buyerInfo");
				}
				return null;
			}
			catch (e)
			{
				return null;
			}
		}},
		{from: ".$.buyerRoleCheckbox.checked", to: ".$.buyerInformationSection.showing", transform: function(v){
			return v;
		}},
		//Main Info Section
		{from: ".activeEntry.contactName", to: ".$.contactNameInput.value", transform: function(v){return v ? v : "";}},
		{from: ".activeEntry", to: ".$.contactPersonInput.value", transform: function(v){
			try
			{
				if (v.get("contactPerson") != null) { return v.get("contactPerson"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.contactPersonTitleInput.value", transform: function(v){try
			{
				if (v.get("contactPersonTitle") != null) { return v.get("contactPersonTitle"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.dateOfBirth", to: ".$.birthDayInput.value", transform: function(v){return v ? moment(v).format("DD") : "";}},
		{from: ".activeEntry.dateOfBirth", to: ".$.birthMonthInput.value", transform: function(v){return v ? moment(v).format("MM") : "";}},
		{from: ".activeEntry.dateOfBirth", to: ".$.birthYearInput.value", transform: function(v){return v ? moment(v).format("YYYY") : "";}},
		{from: ".activeEntry", to: ".$.addressInfoSection.activeEntry"},
		{from: ".activeEntry", to: ".$.contactInfoSection.activeEntry"},
		{from: ".$.contactInfoSection.$.secondaryEmailAddressInput.value", to: ".$.contactInfoSection.$.secondaryEmailAddressInputCopyButton.showing", transform: function(v) {
			try
			{
				if (v != null && v !== "") { return true; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".activeEntry.jurisdiction", to: ".$.jurisdictionPicker.selected", transform: function(val) {
			for (var i = 0; i < this.$.jurisdictionPicker.controls.length; i++)
			{
				if (this.$.jurisdictionPicker.controls[i].value && this.$.jurisdictionPicker.controls[i].value == val)
				{
					return this.$.jurisdictionPicker.controls[i];
				}
			}
			this.$.jurisdictionPickerButton.set("content", "No Selection");
			return null;
		}},
		{from: ".activeEntry.contactType", to: ".$.contactTypePicker.selected", transform: function(val) {
			for (var i = 0; i < this.$.contactTypePicker.controls.length; i++)
			{
				if (this.$.contactTypePicker.controls[i].value && this.$.contactTypePicker.controls[i].value == val)
				{
					return this.$.contactTypePicker.controls[i];
				}
			}
			this.$.contactTypePickerButton.set("content", "No Selection");
			return null;
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v){
			if (!v || !this.get("contactCollection")) {return true;}
			return this.get("contactCollection").indexOf(v) === -1 || this.get("contactCollection").indexOf(v) === 0;
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v){
			if (!v || !this.get("contactCollection")) {return true;}
			return this.get("contactCollection").indexOf(v) === -1 || this.get("contactCollection").indexOf(v) === this.get("contactCollection").length - 1;
		}},
		{from: ".$.jurisdictionPicker.selected", to: ".jurisdiction", transform: function(v){return v ? v.value : null;}},
		{from: ".$.contactTypePicker.selected", to: ".contactType", transform: function(v){return v ? v.value : null;}},
		{from: ".contactType", to: ".$.corporateContactSection.showing", transform: function(v){return v === "corporate";}},
		{from: ".jurisdiction", to: ".$.addressInfoSection.$.countryPicker.disabled", transform: function(v){
			if (v === "canada")
			{
				this.$.addressInfoSection.$.countryPicker.set("selected", "CAN");
				return true;
			}
			else if (v === "usa")
			{
				this.$.addressInfoSection.$.countryPicker.set("selected", "USA");
				return true;
			}

			return false;
		}}
	],
	
	clearBorderError: function()
	{
		this.$.jurisdictionPicker.parent.applyStyle("border", null);
		this.$.contactTypePicker.parent.applyStyle("border", null);
		this.$.contactInfoSection.clearBorderError();
		this.$.addressInfoSection.clearBorderError();
		this.$.buyerInformationSection.clearBorderError();

		for (var key in this.$)
		{
			if(this.$[key].kind === "quantum.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	canEdit: function()
	{
		return quantum.hasRole(["admins"], "contact");
	},

	setShowingForRoles: function()
	{
		this.$.deleteEntryButton.set("showing", quantum.hasRole(["admins"], "contact"));
		this.$.saveEntryButton.set("showing", this.canEdit());
	},

	setDisabledForStatus: function()
	{	
		if(this.$.jurisdictionPicker.get("selected") === null || this.$.jurisdictionPicker.get("selected").value === "canada" || this.$.jurisdictionPicker.get("selected").value === "usa")
		{	
			this.$.addressInfoSection.disableCountryPicker(true);
		}	
		else
		{
			this.$.addressInfoSection.disableCountryPicker(false);
		}		
	},

	setDisabledForRoles: function()
	{
		var disabled = !this.canEdit();

		this.$.contactNameInput.set("disabled", disabled);
		this.$.contactPersonInput.set("disabled", disabled);
		this.$.contactPersonTitleInput.set("disabled", disabled);
		this.$.birthDayInput.set("disabled", disabled);
		this.$.birthMonthInput.set("disabled", disabled);
		this.$.birthYearInput.set("disabled", disabled);
		this.$.addressInfoSection.setDisabled(disabled);
		this.$.contactInfoSection.setDisabled(disabled);
		this.$.jurisdictionPickerButton.set("disabled", disabled);
		this.$.contactTypePickerButton.set("disabled", disabled);

		if(this.canEdit())
		{
			this.setDisabledForStatus();
		}
	},

	showShareholderInformationSection: function()
	{
		return this.get("shareholderRoleActive") || this.get("shareholderRoleArchived");
	},

	initEntryAttributes: function(entry)
	{
		if (!entry) { return; }
		if (entry.get("contactName") === undefined) { entry.set("contactName", ""); }
		if (entry.get("contactPerson") === undefined) { entry.set("contactPerson", ""); }
		if (entry.get("contactPersonTitle") === undefined) { entry.set("contactPersonTitle", ""); }
		if (entry.get("dateOfBirth") === undefined) { entry.set("dateOfBirth", 0); }
		if (entry.get("addressInfo") === undefined || entry.get("addressInfo") === null) { entry.set("addressInfo", {}); }
		if (entry.get("altAddressInfo") === undefined || entry.get("altAddressInfo") === null) { entry.set("altAddressInfo", {}); }
		if (entry.get("addressInfo").addressLine1 === undefined) { entry.get("addressInfo").addressLine1 = ""; }
		if (entry.get("addressInfo").addressLine2 === undefined) { entry.get("addressInfo").addressLine2 = ""; }
		if (entry.get("addressInfo").addressLine3 === undefined) { entry.get("addressInfo").addressLine3 = ""; }
		if (entry.get("addressInfo").city === undefined) { entry.get("addressInfo").city = "" }
		if (entry.get("addressInfo").stateProvince === undefined) { entry.get("addressInfo").stateProvince = ""; }
		if (entry.get("addressInfo").country === undefined) { entry.get("addressInfo").country = ""; }
		if (entry.get("addressInfo").zipPostalCode === undefined) { entry.get("addressInfo").zipPostalCode = ""; }
		if (entry.get("altAddressInfo").addressLine1 === undefined) { entry.get("altAddressInfo").addressLine1 = ""; }
		if (entry.get("altAddressInfo").addressLine2 === undefined) { entry.get("altAddressInfo").addressLine2 = ""; }
		if (entry.get("altAddressInfo").addressLine3 === undefined) { entry.get("altAddressInfo").addressLine3 = ""; }
		if (entry.get("altAddressInfo").city === undefined) { entry.get("altAddressInfo").city = "" }
		if (entry.get("altAddressInfo").stateProvince === undefined) { entry.get("altAddressInfo").stateProvince = ""; }
		if (entry.get("altAddressInfo").country === undefined) { entry.get("altAddressInfo").country = ""; }
		if (entry.get("altAddressInfo").zipPostalCode === undefined) { entry.get("altAddressInfo").zipPostalCode = ""; }
		if (entry.get("phoneNumber") === undefined) { entry.set("phoneNumber", ""); }
		if (entry.get("businessPhoneNumber") === undefined) { entry.set("businessPhoneNumber", ""); }
		if (entry.get("cellPhoneNumber") === undefined) { entry.set("cellPhoneNumber", ""); }
		if (entry.get("faxNumber") === undefined) { entry.set("faxNumber", ""); }
		if (entry.get("emailAddress") === undefined) { entry.set("emailAddress", ""); }
		if (entry.get("secondaryEmailAddress") === undefined) { entry.set("secondaryEmailAddress", ""); }
		if (entry.get("jurisdiction") === undefined) { entry.set("jurisdiction", null); }
		if (entry.get("contactType") === undefined) { entry.set("contactType", null); }
		//if (entry.get("contactID") === undefined) { entry.set("contactID", ""); }
		//if (entry.get("numShares") === undefined) { entry.set("numShares", 0); }
	},

	activate: function(activeEntry)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "contact")) { this.doGoHome(); return; }

		this.clearBorderError();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new quantum.ContactModel({}));
		if (activeEntry != null) { this.set("activeEntry", activeEntry); }

		this.initEntryAttributes(this.get("activeEntry"));

		this.setShowingForRoles();
		this.setDisabledForRoles();
		this.$.buyerInformationSection.activate();
		this.$.addressInfoSection.hideCanadaUSA();
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	/*******************
	* Button Handlers
	*******************/

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.doGoBack();
	},

	validateInputs: function()
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		if(this.$.birthDayInput.get("value") === "Invalid date")
		{
			isValid = false;
			this.$.birthDayInput.setBorderError();
		}
		if(this.$.birthMonthInput.get("value") === "Invalid date")
		{
			isValid = false;
			this.$.birthMonthInput.setBorderError();
		}
		if(this.$.birthYearInput.get("value") === "Invalid date")
		{
			isValid = false;
			this.$.birthYearInput.setBorderError();
		}

		if(moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY") === "Invalid date")
		{
			isValid = false;
			this.$.birthYearInput.setBorderError();
			this.$.birthMonthInput.setBorderError();
			this.$.birthDayInput.setBorderError();
		}
		if(this.$.birthYearInput.get("value") < 1900 || this.$.birthYearInput.get("value") > quantum.parseInt(moment().format('YYYY')))
		{
			isValid = false;
			this.$.birthYearInput.setBorderError();
		}

		// contact Name:
		if (!this.$.contactNameInput.validate()){isValid = false;}

		//Corporate contact info
		if (this.get("contactType") === "corporate")
		{
			if (!this.$.contactPersonInput.validate()){isValid = false;}
			if (!this.$.contactPersonTitleInput.validate()){isValid = false;}
		}

		//Contact Info Section
		if (!this.$.contactInfoSection.validate()){isValid = false;}

		if(!this.$.addressInfoSection.validate()){isValid = false;}

		// Jurisdiction:
		if (this.$.jurisdictionPicker.get("selected") == null || this.$.jurisdictionPicker.get("selected").value === "")
		{
			isValid = false;
			this.$.jurisdictionPicker.parent.applyStyle("border", borderError);
		}

		// Contact Type:
		if (this.$.contactTypePicker.get("selected") == null || this.$.contactTypePicker.get("selected").value === "")
		{
			isValid = false;
			this.$.contactTypePicker.parent.applyStyle("border", borderError);
		}

		//Buyer Information Module
		if (this.$.buyerRoleCheckbox.get("checked"))
		{
			if (!this.$.buyerInformationSection.validateInputs()){
				isValid = false;
			}
		}

		if (!isValid) { alertify.error("Validation Failed"); }
		return isValid;
	},

	handleSaveEntryButtonTapped: function(inSender, inEvent, options)
	{
		if (!this.canEdit()) { return; }

		if (!this.validateInputs()) { return; }

		this.$.loadingPopup.show("Saving...");

		//TODO: Add logic for editing roles

		if (!options || !options.skipUpdateFields)
		{
			this.get("activeEntry").set("contactName", this.$.contactNameInput.get("value"));
			this.get("activeEntry").set("contactPerson", this.$.contactTypePicker.get("selected").value === "corporate" ? this.$.contactPersonInput.get("value") : "");
			this.get("activeEntry").set("contactPersonTitle", this.$.contactTypePicker.get("selected").value === "corporate" ? this.$.contactPersonTitleInput.get("value") : "");
			this.get("activeEntry").set("dateOfBirth", moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").valueOf());
			this.$.addressInfoSection.updateActiveEntry();
			this.$.contactInfoSection.updateActiveEntry();
			this.get("activeEntry").set("jurisdiction", this.$.jurisdictionPicker.get("selected").value);
			this.get("activeEntry").set("contactType", this.$.contactTypePicker.get("selected").value);

			//Handle the buyer module update
			if (this.$.buyerRoleCheckbox.get("checked"))
			{
				this.$.buyerInformationSection.save();

				//Add the role if it doesn't exist already
				if (this.get("activeEntry").get("activeRoles").indexOf("buyer") === -1)
				{
					this.get("activeEntry").get("activeRoles").push("buyer");

					var index = this.get("activeEntry").get("archivedRoles").indexOf("buyer");
					if (index !== -1)
					{
						this.get("activeEntry").get("archivedRoles").splice(index, 1);
					}

					//Since we create a new model when the role doesn't exist, we can't just save it, we also need to apply the object to activeEntry.
					this.get("activeEntry").set("buyerInfo", this.$.buyerInformationSection.get("buyerInfo"));
				}
			}

			if (this.$.optionholderRoleCheckbox.get("checked"))
			{
				//Add the role if it doesn't exist already
				if (this.get("activeEntry").get("activeRoles").indexOf("optionholder") === -1)
				{
					this.get("activeEntry").get("activeRoles").push("optionholder");

					var index = this.get("activeEntry").get("archivedRoles").indexOf("optionholder");
					if (index !== -1)
					{
						this.get("activeEntry").get("archivedRoles").splice(index, 1);
					}
				}
			}

			if (this.$.warrantholderRoleCheckbox.get("checked"))
			{
				//Add the role if it doesn't exist already
				if (this.get("activeEntry").get("activeRoles").indexOf("warrantholder") === -1)
				{
					this.get("activeEntry").get("activeRoles").push("warrantholder");

					var index = this.get("activeEntry").get("archivedRoles").indexOf("warrantholder");
					if (index !== -1)
					{
						this.get("activeEntry").get("archivedRoles").splice(index, 1);
					}
				}
			}
		}

		if (this.get("activeEntry").get("newContactFlag"))
		{
			this.get("activeEntry").set("newContactFlag", false);
		}

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

			this.get("database").post(this.get("activeEntry").raw(), enyo.bind(this, function(err, response){
				this.$.loadingPopup.hide();
				
				if (err)
				{
					alertify.error("Entry Update Failed");
					console.log(err);
					return;
				}

				if (options && options.callback)
				{
					options.callback();
				} else if (this.get("mode") === "add")
				{
					this.doGoBack();
				}
			}));
		}));
	},

	handleDeleteEntryButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "contact")) { return; }

		if (this.$.confirmDeleteEntryPopup)
		{
			this.$.confirmDeleteEntryPopup.hide();
			this.$.confirmDeleteEntryPopup.destroy();
		}
   		this.createComponent({name: "confirmDeleteEntryPopup", kind: "quantum.ConfirmPopup", onYes: "deleteEntry", onHide: "handlePopupHidden"} , {owner:this});
   		this.$.confirmDeleteEntryPopup.show("Delete Entry? This cannot be undone.");
	},

	deleteEntry: function(inSender, inEvent){
		this.$.loadingPopup.show("Deleting...");

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
			var entry = this.get("activeEntry");
			entry.destroy();
			this.get("database").remove(this.get("activeEntry").raw(), enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Entry Delete Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				alertify.success("Entry Deleted");
				this.set("activeEntry", null);
				this.$.loadingPopup.hide();
				this.doGoBack();
			}));
		}));
	},

	isDirty: function()
	{
		if (!this.get("activeEntry")){return false;}

		try
		{

			var isDirtyArray = [
				this.$.buyerInformationSection.isDirty(),
				this.$.addressInfoSection.isDirty(),
				this.$.contactInfoSection.isDirty(),
				this.get("activeEntry").get("newContactFlag"),
				this.get("activeEntry").get("contactName") !== this.$.contactNameInput.get("value"),
				this.get("activeEntry").get("contactPerson") !== this.$.contactPersonInput.get("value"),
				this.get("activeEntry").get("contactPersonTitle") !== this.$.contactPersonTitleInput.get("value"),
				this.get("activeEntry").get("dateOfBirth") !== moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").valueOf(),
				this.get("activeEntry").get("jurisdiction") !== (this.$.jurisdictionPicker.get("selected")?this.$.jurisdictionPicker.get("selected").value:null),
				this.get("activeEntry").get("contactType") !== (this.$.contactTypePicker.get("selected")?this.$.contactTypePicker.get("selected").value:null)
			];

			//console.log(isDirtyArray);

			return (isDirtyArray.indexOf(true)!==-1);
		}
		catch(err)
		{
			alertify.error("Malformed Data - Check Console Log");
			console.log("Error: Malformed Data", err, this.get("activeEntry"));
			return false;
		}
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
		var i = this.get("contactCollection").indexOf(this.get("activeEntry")) + 1;
		this.activate(this.get("contactCollection").at(i));
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
		var i = this.get("contactCollection").indexOf(this.get("activeEntry")) - 1;
		this.activate(this.get("contactCollection").at(i));
	},

	handleJurisdictionChange: function(inSender, inEvent)
	{
		this.$.addressInfoSection.jurisdictionChange(this.$.jurisdictionPicker.get("selected").value);
	},

	handleRoleCheckboxActivated: function(inSender, inEvent)
	{
		if (this.get("activeEntry") && this.get("activeEntry").get("activeRoles") && this.get("activeEntry").get("activeRoles").indexOf("buyer") === -1 && inEvent.originator.owner === this.$.buyerRoleCheckbox && inEvent.originator.get("checked"))
		{
			this.$.buyerInformationSection.set("buyerInfo", new quantum.ContactBuyerInformationModel({}));
			this.$.buyerInformationSection.resize();
		}
	},

	handleRequestSave: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.buyer_saveChangesPopup)
			{
				this.$.buyer_saveChangesPopup.hide();
				this.$.buyer_saveChangesPopup.destroy();
			}
			this.createComponent({name: "buyer_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "saveAndAction", action: inEvent.callback, onHide: "handlePopupHidden"} , {owner:this});
			this.$.buyer_saveChangesPopup.show("Must save changes before proceeding. Save changes?");
		}
		else { inEvent.callback(); }
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSaveEntryButtonTapped(inSender, inEvent, {callback: inSender.action});
	},

	/*******************
	* Event Handlers
	*******************/

	handleDownloadDocument: function(inSender, inEvent)
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

	/*******************
	* Validation Handlers
	*******************/

	validateNumberInput: function(inSender, inEvent)
	{
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if (inEvent.shiftKey || validEntries.indexOf(inEvent.keyCode) === -1)
		{
			inEvent.preventDefault();
			return true;
		}
	}
});