/* global lumberjack,alertify */
enyo.kind({
	name: "lumberjack.CSVExportPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		subscriptionCollection: null,
		checkBoxArray: null,
		checkBoxArrayCountries: null,
		countryCheckboxNames: null,
		presetMenuSelection: null
	},

	events: {
		onRequestGenerateCSVFile: "",
		onGoHome: ""
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Select Subscription Statuses"}
		]},
		{kind: "enyo.FittableColumns", style: "padding-top: 5px;" , components: [
			{kind: "enyo.FittableRows", classes: "csvCheckbox", components: [
				{kind:"lumberjack.Checkbox", name:"allStatusesCheckbox", content:"All Statuses", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "allCheckSubscription"},
				{kind:"lumberjack.Checkbox", name:"allExceptCancelledStatusesCheckbox", content:"All Non-Cancelled Statuses", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "allNonCancelledCheck"}
			]},
			{kind: "enyo.FittableColumns", style: "margin-left: 15px; padding: 0 10px 10px 10px;; border: 1px solid black; max-width: 1000px;" , components: [
				{components: [
					{kind:"lumberjack.Checkbox", name:"incompleteDocsNoFundsCheckbox", content:"Incomplete Docs, No Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"incompleteDocsPartialFundsCheckbox", content:"Incomplete Docs, Partial Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"incompleteDocsAllFundsCheckbox", content:"Incomplete Docs, All Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"completeDocsNoFundsCheckbox", content:"Complete Docs, No Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
				]},
				{style: "margin-left: 20px;", components: [
					{kind:"lumberjack.Checkbox", name:"completeDocsPartialFundsCheckbox", content:"Complete Docs, Partial Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"completeCheckbox", content:"Complete", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"pendingCancellationCheckbox", content:"Pending Cancellation", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
				]},
				{style: "margin-left: 20px;", components: [
					{kind:"lumberjack.Checkbox", name:"cancelledCheckbox", content:"Cancelled", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"closedCheckbox", content:"Closed", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"lumberjack.Checkbox", name:"newCheckbox", content:"New", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
				]}
			]}
		]},
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 10px", content: "Select Countries"},
		{kind: "enyo.FittableColumns", style: "padding-top: 5px;", components: [
			{kind: "enyo.FittableRows", classes: "csvCheckbox", components: [
				{kind:"lumberjack.Checkbox", name:"allCountriesCheckbox", content:"All Countries", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"allCheckCountries"},
				{kind:"lumberjack.Checkbox", name:"allNonUSorCanadaCheckbox", content:"All Non US/Canada", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"nonCanUSACheckCountries"}
			]},
			{style: "margin-left: 15px; padding: 0 10px 10px 0; border: 1px solid black; max-width: 1000px;", components: [
				{name: "newBoxesCountry", kind: "lumberjack.CountryCheckboxes", onAllCountriesChecked: "allCheckCountries", onAllNonUSorCanadaChecked: "nonCanUSACheckCountries", onNeitherChecked: "handleNeitherChecked"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{kind: "lumberjack.Button", enabledClasses: "button primary", style: "line-height: 30px; margin-top: 10px", content: "Generate CSV", ontap: "checkedBoxes"}
		]}
	],

	bindings: [
		{from: ".subscriptionCollection", to: ".$.newBoxesCountry.subscriptionCollection"},
		{from: ".$.newBoxesCountry.countriesArray", to: ".countryCheckboxNames"}
	],

	activate: function()
	{
		if (!lumberjack.hasRole(["admins"], "placement")) { this.doGoHome(); return; }

		if (this.get("subscriptionCollection")) {
			this.$.newBoxesCountry.set("countriesArray", this.get("subscriptionCollection").getSubscriberCountries());
			this.$.newBoxesCountry.render();
		}

		this.uncheckAllBoxes();
	},

	uncheckAllBoxes: function()
	{
		this.$.allNonUSorCanadaCheckbox.setDisabled(false);
		this.$.allNonUSorCanadaCheckbox.setChecked(false);
		this.$.allCountriesCheckbox.setDisabled(false);
		this.$.allCountriesCheckbox.setChecked(false);
		this.get("countryCheckboxNames").forEach(enyo.bind(this, function(value, index, array) {
		    this.$.newBoxesCountry.setCountryCheckbox(value, false);
		}));

		this.$.incompleteDocsNoFundsCheckbox.setChecked(false);
		this.$.incompleteDocsPartialFundsCheckbox.setChecked(false);
		this.$.incompleteDocsAllFundsCheckbox.setChecked(false);
		this.$.completeDocsNoFundsCheckbox.setChecked(false);
		this.$.completeDocsPartialFundsCheckbox.setChecked(false);
		this.$.completeCheckbox.setChecked(false);
		this.$.pendingCancellationCheckbox.setChecked(false);
		this.$.cancelledCheckbox.setChecked(false);
		this.$.closedCheckbox.setChecked(false);
		this.$.newCheckbox.setChecked(false);
		this.$.allStatusesCheckbox.setChecked(false);
		this.$.allStatusesCheckbox.setDisabled(false);
		this.$.allExceptCancelledStatusesCheckbox.setChecked(false);
		this.$.allExceptCancelledStatusesCheckbox.setDisabled(false);
	},

	checkBoxesForSubscription: function(inSender, inEvent)
	{
		// If all boxes are checked
		if (
			this.$.incompleteDocsNoFundsCheckbox.getValue() === true &&
			this.$.incompleteDocsPartialFundsCheckbox.getValue() === true &&
			this.$.incompleteDocsAllFundsCheckbox.getValue() === true &&
			this.$.completeDocsNoFundsCheckbox.getValue() === true &&
			this.$.completeDocsPartialFundsCheckbox.getValue() === true &&
			this.$.completeCheckbox.getValue() === true &&
			this.$.pendingCancellationCheckbox.getValue() === true &&
			this.$.cancelledCheckbox.getValue() === true &&
			this.$.closedCheckbox.getValue() === true &&
			this.$.newCheckbox.getValue() === true)
		{
			this.$.allStatusesCheckbox.setChecked(true);
			this.$.allStatusesCheckbox.setDisabled(true);
			this.$.allExceptCancelledStatusesCheckbox.setDisabled(false);
			this.$.allExceptCancelledStatusesCheckbox.setChecked(false);
		}
		// If all boxes except cancelled and pendingCancellation are checked
		else if (
			this.$.incompleteDocsNoFundsCheckbox.getValue() === true &&
			this.$.incompleteDocsPartialFundsCheckbox.getValue() === true &&
			this.$.incompleteDocsAllFundsCheckbox.getValue() === true &&
			this.$.completeDocsNoFundsCheckbox.getValue() === true &&
			this.$.completeDocsPartialFundsCheckbox.getValue() === true &&
			this.$.completeCheckbox.getValue() === true &&
			this.$.closedCheckbox.getValue() === true &&
			this.$.newCheckbox.getValue() === true)
		{
			this.$.allExceptCancelledStatusesCheckbox.setDisabled(true);
			this.$.allExceptCancelledStatusesCheckbox.setChecked(true);
			this.$.allStatusesCheckbox.setDisabled(false);
			this.$.allStatusesCheckbox.setChecked(false);
		}
		else
		{
			this.$.allStatusesCheckbox.setChecked(false);
			this.$.allStatusesCheckbox.setDisabled(false);
			this.$.allExceptCancelledStatusesCheckbox.setDisabled(false);
			this.$.allExceptCancelledStatusesCheckbox.setChecked(false);
		}
	},

	allCheckSubscription: function(inSender, inEvent)
	{

		this.$.incompleteDocsNoFundsCheckbox.setChecked(true);
		this.$.incompleteDocsPartialFundsCheckbox.setChecked(true);
		this.$.incompleteDocsAllFundsCheckbox.setChecked(true);
		this.$.completeDocsNoFundsCheckbox.setChecked(true);
		this.$.completeDocsPartialFundsCheckbox.setChecked(true);
		this.$.completeCheckbox.setChecked(true);
		this.$.pendingCancellationCheckbox.setChecked(true);
		this.$.cancelledCheckbox.setChecked(true);
		this.$.closedCheckbox.setChecked(true);
		this.$.newCheckbox.setChecked(true);
		this.$.allStatusesCheckbox.setDisabled(true);
		this.$.allExceptCancelledStatusesCheckbox.setDisabled(false);
		this.$.allExceptCancelledStatusesCheckbox.setChecked(false);
	},

	allNonCancelledCheck: function(inSender, inEvent)
	{
		this.$.incompleteDocsNoFundsCheckbox.setChecked(true);
		this.$.incompleteDocsPartialFundsCheckbox.setChecked(true);
		this.$.incompleteDocsAllFundsCheckbox.setChecked(true);
		this.$.completeDocsNoFundsCheckbox.setChecked(true);
		this.$.completeDocsPartialFundsCheckbox.setChecked(true);
		this.$.completeCheckbox.setChecked(true);
		this.$.pendingCancellationCheckbox.setChecked(false);
		this.$.cancelledCheckbox.setChecked(false);
		this.$.closedCheckbox.setChecked(true);
		this.$.newCheckbox.setChecked(true);
		this.$.allExceptCancelledStatusesCheckbox.setDisabled(true);
		this.$.allStatusesCheckbox.setDisabled(false);
		this.$.allStatusesCheckbox.setChecked(false);
	},

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
	},

	handleGenerateFromCheckBoxesCSVFile: function(inSender, inEvent)
	{
		var filteredCollection = this.get("subscriptionCollection");
		var outputForCSV = [];
		if (this.get("checkBoxArrayCountries").length < 1) { alertify.error("You must select at least one country"); return; }
		if (this.get("checkBoxArray").length < 1) { alertify.error("You must select at least one status"); return; }

		this.get("checkBoxArray").forEach(enyo.bind(this, function(item) {
			// Filter collection to return complete subscribers only.
			var results = filteredCollection.filter(enyo.bind(this, function(value, index, array){
				var Testcountry = value.get("contactInfo").addressInfo.country;
				var subInfo = value.get("subscriptionInfo");
				return subInfo.subscriptionStatus === item && this.get("checkBoxArrayCountries").indexOf(Testcountry) !== -1;
			}));

			outputForCSV = outputForCSV.concat(results);
		}));

		this.doRequestGenerateCSVFile({rawCollection: new lumberjack.SubscriptionCollection(outputForCSV).raw(), filename: "Placement Records Export.csv"});
	},

	checkedBoxes: function(inSender, inEvent)
	{
		this.set("checkBoxArray", []);

		if (this.$.incompleteDocsNoFundsCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("incompleteDocsNoFunds");
		}
		if (this.$.incompleteDocsPartialFundsCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("incompleteDocsPartialFunds");
		}
		if (this.$.incompleteDocsAllFundsCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("incompleteDocsAllFunds");
		}
		if (this.$.completeDocsNoFundsCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("completeDocsNoFunds");
		}
		if (this.$.completeDocsPartialFundsCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("completeDocsPartialFunds");
		}
		if (this.$.completeCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("complete");
		}
		if (this.$.pendingCancellationCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("pendingCancellation");
		}
		if (this.$.cancelledCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("cancelled");
		}
		if (this.$.closedCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("closed");
		}
		if (this.$.newCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("new");
		}
		this.checkedBoxesCountry();
		this.handleGenerateFromCheckBoxesCSVFile();
	},

	checkedBoxesCountry: function(inSender, inEvent)
	{
		this.set("checkBoxArrayCountries", []);
		this.get("countryCheckboxNames").forEach(enyo.bind(this, function(value, index, array) {
		    var checked = this.$.newBoxesCountry.$[value + "Checkbox"];
		    if (checked.getValue() === true) {
		    	//var country = checked.getContent();
		    	this.get("checkBoxArrayCountries").push(value);
			}
		}));
	}//,

	// itemSelected: function(inSender, inEvent) {
	// 	if (inEvent.originator.content) {
	// 		presetMenuSelection = inEvent.originator.content;
	// 	}
	// }
});