/* global quantum,alertify,numeral,console */
enyo.kind({
	name: "quantum.MigrateSubscriptionsPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		subscriptionCollection: null,
		filteredSubscriptionCollection: null,
		checkBoxArray: null,
		checkBoxArrayCountries: null,
		countryCheckboxNames: null
	},

	events: {
		onGoHome: "",
		onLogout: ""
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "1. Select Placement To Migrate To"}
		]},
		{name: "placementDatabasePickerDecorator", kind: "onyx.PickerDecorator", style: "margin-top: 15px;", components: [
			{name: "placementDatabasePickerButton", style: "width: 450px;"},
			{name: "placementDatabasePicker", kind: "onyx.Picker"}
		]},
		{name: "subscriptionStatusesSection", style: "margin-top: 25px;", components: [
			{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
				{style: "font-size: 24px;", content: "2. Select Subscription Statuses"}
			]},
			{kind: "enyo.FittableColumns", style: "padding-top: 5px;" , components: [
				{kind: "enyo.FittableRows", classes: "csvCheckbox", components: [
					{kind:"quantum.Checkbox", name:"allStatusesCheckbox", content:"All Statuses", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "allCheckSubscription"}
				]},
				{style: "margin-left: 15px; padding: 0 10px; border: 1px solid black; max-width: 1000px;", components: [
					{kind:"quantum.Checkbox", name:"incompleteDocsNoFundsCheckbox", content:"Incomplete Docs, No Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"quantum.Checkbox", name:"incompleteDocsPartialFundsCheckbox", content:"Incomplete Docs, Partial Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"quantum.Checkbox", name:"incompleteDocsAllFundsCheckbox", content:"Incomplete Docs, All Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"quantum.Checkbox", name:"completeDocsNoFundsCheckbox", content:"Complete Docs, No Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"quantum.Checkbox", name:"completeDocsPartialFundsCheckbox", content:"Complete Docs, Partial Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"quantum.Checkbox", name:"completeCheckbox", content:"Complete", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
					{kind:"quantum.Checkbox", name:"newCheckbox", content:"New", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
				]}
			]},
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 10px;", content: "3. Select Countries"},
			{kind: "enyo.FittableColumns", style: "padding-top: 5px;", components: [
				{kind: "enyo.FittableRows", classes: "csvCheckbox", components: [
					{kind:"quantum.Checkbox", name:"allCountriesCheckbox", content:"All Countries", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"allCheckCountries"},
					{kind:"quantum.Checkbox", name:"allNonUSorCanadaCheckbox", content:"All Non US/Canada", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"nonCanUSACheckCountries"}
				]},
				{style: "margin-left: 15px; padding: 0 10px; border: 1px solid black; max-width: 1000px;", components: [
					{name: "newBoxesCountry", kind: "quantum.CountryCheckboxes", onAllCountriesChecked: "allCheckCountries", onAllNonUSorCanadaChecked: "nonCanUSACheckCountries", onNeitherChecked: "handleNeitherChecked"}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "quantum.Button", enabledClasses: "button primary", style: "line-height: 30px; margin-top: 10px", content: "Search Subscriptions", ontap: "checkedBoxes"}
			]}
		]},
		{name: "subscriptionResultsSection", showing: false, components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "4. Subscription Search Results"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; line-height: 34px; border: 1px solid black;", components: [
				{classes: "input-control checkbox", style: "text-align: center; width: 60px;", components: [
					{tag: "label", components:[
						{name: "selectAllCheckbox", kind: "enyo.Checkbox", checked: true, onActivate: "handleSelectAllCheckboxTapped"},
						{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
					]}
				]},
				{content: "Subscriber Name", style: "width: 200px;"},
				{content: "Contact Person", style: "width: 150px;"},
				{content: "Subscription Status", style: "width: 200px;"},
				{content: "Signature Status", style: "width: 115px;"},
				{content: "Number Of Shares", style: "width: 150px;"},
				{content: "Subscription Amount", style: "width: 175px;"},
				{content: "Funds Received", style: "width: 150px;"},
				{content: "Country", style: "width: 150px; margin-left: 10px;"},
				{content: "State/Province", style: "width: 150px;"}
			]},
			{name: "subscriptionRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupSubscriptionRepeaterItem", components: [
				{name: 'subscriptionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px; line-height: 34px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleSubscriptionRepeaterItemTapped", components: [
					{classes: "input-control checkbox", style: "text-align: center; width: 60px;", components: [
						{tag: "label", components:[
							{name: "migrateCheckbox", kind: "enyo.Checkbox", onActivate: "handleMigrateCheckboxTapped"},
							{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
						]}
					]},
					{name: "displayName", style: "width: 200px;"},
					{name: "contactPerson", style: "width: 150px;"},
					{name: "subscriptionStatus", style: "width: 200px;"},
					{name: "agreementSignatureStatus", style: "width: 110px; text-align: center; margin-right: 5px;", components: [
						{name: "agreementSignatureStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "numShares", style: "width: 150px; text-align: right;"},
					{name: "subscriberDollarAmount", style: "width: 175px; text-align: right;"},
					{name: "fundsReceived", style: "width: 150px; text-align: right;"},
					{name: "country", style: "width: 150px; margin-left: 10px;"},
					{name: "stateProvince", style: "width: 150px;"}
				]}
			]},
			{name: "migrateSubscriptionsButtonSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{kind: "enyo.Button", classes: "button primary", style: "line-height: 30px; margin-top: 10px", content: "Migrate Subscriptions", ontap: "handleMigrateSubscriptionsButtonTapped"}
			]}
		]},
		{name: "noSubscriptionsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Subscriptions Found"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".subscriptionCollection", to: ".$.newBoxesCountry.subscriptionCollection"},
		{from: ".$.placementDatabasePicker.selected", to: "subscriptionStatusesSection.showing", transform: function(v){
			if (v) {return true;}
			return false;
		}},
		{from: ".$.newBoxesCountry.countriesArray", to: ".countryCheckboxNames"}
	],

	activate: function()
	{
		if (!quantum.hasRole(["admins"], "placement")) { this.doGoHome(); return; }

		this.$.placementDatabasePicker.set("selected", null);
		this.$.placementDatabasePicker.destroyClientControls();
		var placements = quantum.preferences.get("placements");
		var placementItems = [];
		var active = true;
		for (var i = 0; i < placements.length; i++)
		{
			if (placements[i].status === "active" && placements[i].database !== quantum.preferences.get("placementDatabase"))
			{
				placementItems.push({database: placements[i].database, content: placements[i].name, active: active});
				active = false;
			}
		}

		if (this.get("subscriptionCollection").length === 0)
		{
			alertify.error("No Subscriptions to Migrate");
			this.doGoHome();
			return;
		}
		else if (placementItems.length === 0)
		{
			alertify.error("No Eligible Placements Available");
			this.doGoHome();
			return;
		}
		else
		{
			this.$.placementDatabasePicker.createComponents(placementItems);
			this.$.placementDatabasePicker.render();
		}

		if (this.get("subscriptionCollection")) {
			this.$.newBoxesCountry.set("countriesArray", this.get("subscriptionCollection").getSubscriberCountries());
			this.$.newBoxesCountry.render();
		}
		this.uncheckAllBoxes();
		this.set("filteredSubscriptionCollection", null);
		this.$.selectAllCheckbox.set("checked", true);
		this.$.subscriptionResultsSection.set("showing", false);
		this.$.subscriptionRepeater.setCount(0);
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
		this.$.newCheckbox.setChecked(false);
		this.$.allStatusesCheckbox.setChecked(false);
		this.$.allStatusesCheckbox.setDisabled(false);
	},

	checkBoxesForSubscription: function(inSender, inEvent)
	{
		// If all boxes are checked
		if (this.$.incompleteDocsNoFundsCheckbox.getValue() === true &&
			this.$.incompleteDocsPartialFundsCheckbox.getValue() === true &&
			this.$.incompleteDocsAllFundsCheckbox.getValue() === true &&
			this.$.completeDocsNoFundsCheckbox.getValue() === true &&
			this.$.completeDocsPartialFundsCheckbox.getValue() === true &&
			this.$.completeCheckbox.getValue() === true &&
			this.$.newCheckbox.getValue() === true)
		{
			this.$.allStatusesCheckbox.setChecked(true);
			this.$.allStatusesCheckbox.setDisabled(true);
		}
		else
		{
			this.$.allStatusesCheckbox.setChecked(false);
			this.$.allStatusesCheckbox.setDisabled(false);
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
		this.$.newCheckbox.setChecked(true);
		this.$.allStatusesCheckbox.setDisabled(true);
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

	generatefilteredSubscriptionCollection: function(inSender, inEvent)
	{
		if (this.get("checkBoxArrayCountries").length < 1) { alertify.error("You must select at least one country"); return; }
		if (this.get("checkBoxArray").length < 1) { alertify.error("You must select at least one status"); return; }

		var results = this.get("subscriptionCollection").filter(enyo.bind(this, function(value, index, array){
			var subInfo = value.get("subscriptionInfo");
			return this.get("checkBoxArray").indexOf(subInfo.subscriptionStatus) !== -1 && this.get("checkBoxArrayCountries").indexOf(value.get("contactInfo").addressInfo.country) !== -1;
		}));

		if (!results)
		{
			this.set("filteredSubscriptionCollection", []);
		}
		else
		{
			var resultsCollection = [];

			results.forEach(enyo.bind(this, function(value, index, array){
				resultsCollection.push({checked: true, subscription: value});
			}));

			this.set("filteredSubscriptionCollection", resultsCollection);
		}

		this.$.subscriptionResultsSection.set("showing", true);
		this.$.noSubscriptionsLabel.set("showing", this.get("filteredSubscriptionCollection").length === 0);
		this.$.subscriptionRepeater.set("showing", this.get("filteredSubscriptionCollection").length > 0);
		this.$.subscriptionRepeater.setCount(this.get("filteredSubscriptionCollection").length);
		this.$.migrateSubscriptionsButtonSection.set("showing", this.get("filteredSubscriptionCollection").length > 0);
		this.resize();
	},

	setupSubscriptionRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "placement")) { return; }
		if (!inEvent.item) {return true;}

		var subscriptionItem = this.get("filteredSubscriptionCollection")[inEvent.index].subscription;
		var subscriptionChecked = this.get("filteredSubscriptionCollection")[inEvent.index].checked;

		var getSubscriptionAgreementStatus = function(value)
		{
			if (value.get("subscriptionAgreementSigned"))
			{
				return "assets/icons/circle-icon-green.png";
			}

			if (value.get("subscriptionAgreementSentForSignature"))
			{
				return "assets/icons/circle-icon-yellow.png";
			}

			if (value.get("subscriptionAgreementGenerated"))
			{
				return "assets/icons/circle-icon-red.png";
			}

			return "assets/icons/circle-icon-grey.png";
		};

		var agreementSignatureStatusIconSrc = getSubscriptionAgreementStatus(subscriptionItem);

		inEvent.item.$.subscriptionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.migrateCheckbox.set("checked", subscriptionChecked);
		inEvent.item.$.displayName.set("content", subscriptionItem.get("contactInfo").displayName ? subscriptionItem.get("contactInfo").displayName : "");
		inEvent.item.$.contactPerson.set("content", subscriptionItem.get("contactInfo").corporateInfo.contactPerson ? subscriptionItem.get("contactInfo").corporateInfo.contactPerson : "");
		inEvent.item.$.subscriptionStatus.set("content", quantum.subscriptionStatusLookup(subscriptionItem.get("subscriptionInfo").subscriptionStatus));
		inEvent.item.$.agreementSignatureStatusIcon.set("src", agreementSignatureStatusIconSrc);
		inEvent.item.$.numShares.set("content", subscriptionItem.get("subscriptionInfo").numShares ? numeral(subscriptionItem.get("subscriptionInfo").numShares).format('0,0') : "0");
		inEvent.item.$.subscriberDollarAmount.set("content", subscriptionItem.get("subscriptionInfo").subscriberDollarAmount ? "$" + quantum.formatCurrency(subscriptionItem.get("subscriptionInfo").subscriberDollarAmount) : "$0");
		inEvent.item.$.fundsReceived.set("content", subscriptionItem.get("subscriptionInfo").fundsReceived ? "$" + quantum.formatCurrency(subscriptionItem.get("subscriptionInfo").fundsReceived) : "$0");
		inEvent.item.$.country.set("content", subscriptionItem.get("contactInfo").addressInfo.country ? subscriptionItem.get("contactInfo").addressInfo.country : "");
		inEvent.item.$.stateProvince.set("content", subscriptionItem.get("contactInfo").addressInfo.stateProvince ? subscriptionItem.get("contactInfo").addressInfo.stateProvince : "");
		return true;
	},

	handleMigrateCheckboxTapped: function(inSender, inEvent)
	{
		this.get("filteredSubscriptionCollection")[inEvent.index].checked = inEvent.originator.get("checked");
		return true;
	},

	handleSelectAllCheckboxTapped: function(inSender, inEvent)
	{
		// if (!this.$.selectAllCheckbox.get("checked"))
		// {
		// 	this.$.selectAllCheckbox.set("checked", true);
		// 	return true;
		// }

		if (!this.get("filteredSubscriptionCollection") || this.get("filteredSubscriptionCollection").length === 0)
		{
			return true;
		}

		this.get("filteredSubscriptionCollection").forEach(enyo.bind(this, function(value, index, array){
			value.checked = this.$.selectAllCheckbox.get("checked");
		}));

		this.$.subscriptionRepeater.setCount(this.get("filteredSubscriptionCollection").length);
		return true;
	},

	handleMigrateSubscriptionsButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		var subscriptionCount = 0;

		if (!this.get("filteredSubscriptionCollection") || this.get("filteredSubscriptionCollection").length === 0)
		{
			alertify.error("Subscription Collection Empty");
			return;
		}

		this.get("filteredSubscriptionCollection").forEach(enyo.bind(this, function(value, index, array){
			if (value.checked) {subscriptionCount = subscriptionCount + 1;}
		}));

		if (subscriptionCount === 0)
		{
			alertify.error("Must Select At Least 1 Subscription for Migration");
			return;
		}

		if (this.$.confirmMigrateSubscriptionsPopup)
		{
			this.$.confirmMigrateSubscriptionsPopup.hide();
			this.$.confirmMigrateSubscriptionsPopup.destroy();
		}
		this.createComponent({name: "confirmMigrateSubscriptionsPopup", kind: "quantum.ConfirmPopup", onYes: "handleMigrateSubscriptions", onNo: "handleMigrateSubscriptionsCancelled", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmMigrateSubscriptionsPopup.show("Are you sure that you want to migrate " + subscriptionCount + " subscription" + (subscriptionCount > 1 ? "s" : "") + "? This cannot be undone.");
	},

	handleMigrateSubscriptions: function(inSender, inEvent)
	{
		var subscriptionCount = 0;

		this.get("filteredSubscriptionCollection").forEach(enyo.bind(this, function(value, index, array){
			if (value.checked) {subscriptionCount = subscriptionCount + 1;}
		}));

		var currentSubscriptionCount = 0;

		this.$.loadingPopup.show();

		//Recursion, because it's the only way to fly asynchronously
		var migrateSubscription = enyo.bind(this, function(index) {
			if (index >= this.get("filteredSubscriptionCollection").length)
			{
				alertify.success("Subscriptions Migrated!");
				this.$.loadingPopup.hide();
				this.activate();
				return;
			}

			if (!this.get("filteredSubscriptionCollection")[index].checked)
			{
				//Next!
				migrateSubscription(index + 1);
				return;
			}

			var subscriptionItem = this.get("filteredSubscriptionCollection")[index].subscription;
			currentSubscriptionCount = currentSubscriptionCount + 1;
			this.$.loadingPopup.setMessage("Processing Record " + currentSubscriptionCount + " of " + subscriptionCount);
			this.$.loadingPopup.resize();

			var postData = {
				url: quantum.preferences.get("apiServer") + "migratesubscription",
				method: "POST",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				},
				postBody: {
					sourcePlacementID: quantum.preferences.get("placementDatabase"),
					destinationPlacementID: this.$.placementDatabasePicker.get("selected").database,
					subscriberID: subscriptionItem.get("_id"),
					companyID: quantum.preferences.get("company")
				}
			};

			console.log(index, postData);
			var request = new enyo.Ajax(postData);

			request.error(enyo.bind(this, function(request, response) {
				alertify.error("Failed to migrate subscription");
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
					alertify.error("Failed to migrate subscription");
					console.log(response);
					return;
				}

				migrateSubscription(index + 1);
				return;
			}));

			request.go();
		});

		migrateSubscription(0);

		return true;
	},

	handleMigrateSubscriptionsCancelled: function(inSender, inEvent)
	{
		alertify.message("Subscription Migration Cancelled.");
		return true;
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
		if (this.$.newCheckbox.getChecked() === true) {
			this.get("checkBoxArray").push("new");
		}
		this.checkedBoxesCountry();
		this.generatefilteredSubscriptionCollection();
	},

	checkedBoxesCountry: function(inSender, inEvent)
	{
		this.set("checkBoxArrayCountries", []);
		this.get("countryCheckboxNames").forEach(enyo.bind(this, function(value, index, array) {
		  var checked = this.$.newBoxesCountry.$[value + "Checkbox"];
		  if (checked.getValue() === true) {
		  	this.get("checkBoxArrayCountries").push(value);
			}
		}));
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	}
});