enyo.kind({
	name: "quantum.SubscriptionFilterSettingsPopup",
	kind: "quantum.Popup",

	events: {
		onFilterSettingsChanged: "",
		onCancel: ""
	},

	published: {
		filterSettings: null,
		countryCheckboxNames: null
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Filter Settings"}
			]},
			{name: "filterSettingsScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 800px; height: 600px; background-color: #FFFFFF; color: black; padding: 10px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Subscription Statuses"},
				{kind: "enyo.FittableColumns", style: "padding-top: 5px;" , components: [
					{components: [
						{kind:"quantum.Checkbox", name:"incompleteDocsNoFundsCheckbox", content:"Incomplete Docs, No Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"incompleteDocsPartialFundsCheckbox", content:"Incomplete Docs, Partial Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"incompleteDocsAllFundsCheckbox", content:"Incomplete Docs, All Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"completeDocsNoFundsCheckbox", content:"Complete Docs, No Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
					]},
					{style: "margin-left: 20px;", components: [
						{kind:"quantum.Checkbox", name:"completeDocsPartialFundsCheckbox", content:"Complete Docs, Partial Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"completeCheckbox", content:"Complete", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"pendingCancellationCheckbox", content:"Pending Cancellation", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
					]},
					{style: "margin-left: 20px;", components: [
						{kind:"quantum.Checkbox", name:"cancelledCheckbox", content:"Cancelled", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"closedCheckbox", content:"Closed", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"newCheckbox", content:"New", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
					]}
				]},
				{style: "font-size: 20px; margin-top: 10px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Subscriber Countries"},
				{kind: "enyo.FittableColumns", style: "padding-top: 5px;", components: [
					{kind: "enyo.FittableRows", classes: "csvCheckbox", components: [
						{kind:"quantum.Checkbox", name:"allCountriesCheckbox", content:"All Countries", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"allCheckCountries"},
						{kind:"quantum.Checkbox", name:"allNonUSorCanadaCheckbox", content:"All Non US/Canada", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"nonCanUSACheckCountries"}
					]},
					{style: "margin-left: 25px; padding: 0 10px 10px 0; max-width: 1000px;", components: [
						{name: "newBoxesCountry", kind: "quantum.CountryCheckboxes", onAllCountriesChecked: "allCheckCountries", onAllNonUSorCanadaChecked: "nonCanUSACheckCountries", onNeitherChecked: "handleNeitherChecked"}
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "saveButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Save"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "saveButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".countryCheckboxNames", to: ".$.newBoxesCountry.countriesArray"},
		{from: ".filterSettings", to: ".$.incompleteDocsNoFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("incompleteDocsNoFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.incompleteDocsPartialFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("incompleteDocsPartialFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.incompleteDocsAllFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("incompleteDocsAllFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.completeDocsNoFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("completeDocsNoFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.completeDocsPartialFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("completeDocsPartialFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.completeCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("complete") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.pendingCancellationCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("pendingCancellation") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.cancelledCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("statusesToShow").indexOf("cancelled") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.closedCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("closed") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.newCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("new") !== -1) {return true;}

			return false;
		}}
	],

	show: function(filterSettings)
	{
		this.inherited(arguments);
		this.set("filterSettings", filterSettings);
		this.$.newBoxesCountry.set("allCountriesChecked", this.get("filterSettings").get("showAllCountries"));
		this.$.newBoxesCountry.set("checkedCountries", this.get("filterSettings").get("countriesToShow"));
		this.$.newBoxesCountry.render();
	},

	getCheckedStatuses: function(inSender, inEvent)
	{
		//Cheat here a little bit
		var numBoxesChecked = 0;
		var cancelledChecked = false;
		var statusesArray = [];

		if (this.$.incompleteDocsNoFundsCheckbox.getChecked() === true) {
			statusesArray.push("incompleteDocsNoFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.incompleteDocsPartialFundsCheckbox.getChecked() === true) {
			statusesArray.push("incompleteDocsPartialFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.incompleteDocsAllFundsCheckbox.getChecked() === true) {
			statusesArray.push("incompleteDocsAllFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.completeDocsNoFundsCheckbox.getChecked() === true) {
			statusesArray.push("completeDocsNoFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.completeDocsPartialFundsCheckbox.getChecked() === true) {
			statusesArray.push("completeDocsPartialFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.completeCheckbox.getChecked() === true) {
			statusesArray.push("complete");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.pendingCancellationCheckbox.getChecked() === true) {
			statusesArray.push("pendingCancellation");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.cancelledCheckbox.getChecked() === true) {
			statusesArray.push("cancelled");
			cancelledChecked = true;
		}
		if (this.$.closedCheckbox.getChecked() === true) {
			statusesArray.push("closed");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.newCheckbox.getChecked() === true) {
			statusesArray.push("new");
			numBoxesChecked = numBoxesChecked + 1;
		}

		return {showAllNonCancelledStatuses: (numBoxesChecked === 9 && !cancelledChecked), statusesToShow: statusesArray};
	},

	saveButtonTapped: function(inSender, inEvent)
	{
		var statuses = this.getCheckedStatuses();
		this.get("filterSettings").set("showAllNonCancelledStatuses", statuses.showAllNonCancelledStatuses);
		this.get("filterSettings").set("statusesToShow", statuses.showAllNonCancelledStatuses ? [] : statuses.statusesToShow);

		this.$.newBoxesCountry.checkBoxesForCountry(); //Refresh the list before saving.
        this.get("filterSettings").set("showAllCountries", this.$.newBoxesCountry.get("allCountriesChecked"));
		this.get("filterSettings").set("countriesToShow", this.$.newBoxesCountry.get("allCountriesChecked") ? [] : this.$.newBoxesCountry.get("checkedCountries"));

		this.doFilterSettingsChanged({filterSettings: this.get("filterSettings")});
		this.hide();
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.selectButtonTapped();
		}
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	},

	/************
	* Checkbox Handling
	************/

	allCheckCountries: function(inSender, inEvent)
	{
		this.get("countryCheckboxNames").forEach(enyo.bind(this, function(value, index, array) {
			this.$.newBoxesCountry.setCountryCheckbox(value, true);
		}));

		this.$.allNonUSorCanadaCheckbox.setDisabled(false);
		this.$.allNonUSorCanadaCheckbox.setChecked(false);
		this.$.allCountriesCheckbox.setDisabled(true);
		this.$.allCountriesCheckbox.setChecked(true);
	},

	nonCanUSACheckCountries: function(inSender, inEvent)
	{
		this.get("countryCheckboxNames").forEach(enyo.bind(this, function(value, index, array) {
			if (value === "USA" || value === "CAN")
			{
				this.$.newBoxesCountry.setCountryCheckbox(value, false);
			}
			else
			{
				this.$.newBoxesCountry.setCountryCheckbox(value, true);
			}
		}));

		this.$.allCountriesCheckbox.setDisabled(false);
		this.$.allCountriesCheckbox.setChecked(false);
		this.$.allNonUSorCanadaCheckbox.setDisabled(true);
		this.$.allNonUSorCanadaCheckbox.setChecked(true);
	},

	handleNeitherChecked: function(inSender, inEvent)
	{
		this.$.allCountriesCheckbox.setDisabled(false);
		this.$.allCountriesCheckbox.setChecked(false);
		this.$.allNonUSorCanadaCheckbox.setDisabled(false);
		this.$.allNonUSorCanadaCheckbox.setChecked(false);
	}
});