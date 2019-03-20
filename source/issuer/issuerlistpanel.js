/* global lumberjack, numeral */
enyo.kind({
	name: "lumberjack.IssuerListPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onViewItemDetail: "",
		onGoHome: ""
	},

	published: {
		issuerCollection: null,
		filteredIssuerCollection: null,
		//filterSettings: null
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Issuers:"},
			{style: "margin-left: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "margin-left: 10px; line-height: 34px;", components: [
				{kind: "lumberjack.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]},
			{fit: true},
			// {style: "line-height: 34px;", components: [
			// 	{kind: "lumberjack.Button", style: "margin: 0; padding: 2px 6px 3px;", ontap: "handleChangeFilterSettingsButtonTapped", components: [
			// 		{kind: "enyo.Image", style: "width: 24px; height: 24px;", src: "assets/icons/filter-icon.png"}
			// 	]}
			// ]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black; min-width: 1490px;", components: [
			{content: "Issuer Name", style: "width: 200px;"},
			{content: "Number of Filings", style: "width: 150px;"},
			{content: "Contact Person", style: "width: 150px;"},
			{content: "Email Address", style: "width: 250px;"},
			{content: "Phone Number", style: "width: 250px;"},
			{content: "Auditor", style: "width: 200px;"},
			{content: "Transfer Agent", style: "width: 200px;"},
			{content: "Industry Classification", style: "width: 500px;"},
			{content: "Size Of Assets", style: "width: 500px;"},
		]},
		{name: "issuerRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black; min-width: 1490px;", onSetupItem: "setupIssuerRepeaterItem", components: [
			{name: 'issuerItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleIssuerRepeaterItemTapped", components: [
				{name: "displayName", style: "width: 200px;"},
				{name: "numFilings", style: "width: 150px;"},
				{name: "contactPerson", style: "width: 150px;"},
				{name: "emailAddress", style: "width: 250px;"},
				{name: "phoneNumber", style: "width: 250px;"},
				{name: "auditor", style: "width: 200px;"},
				{name: "transferAgent", style: "width: 200px;"},
				{name: "industryClassification", style: "width: 500px;"},
				{name: "issuerAssets", style: "width: 500px;"}
			]}
		]},
		{name: "noIssuersLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Issuers Found"},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"},
		// {name: "changeFilterSettingsPopup", kind: "lumberjack.SubscriptionFilterSettingsPopup", onFilterSettingsChanged: "handleFilterSettingsChanged"}
	],

	setShowingForRoles: function()
	{
		//Nothing to do here
	},

	activate: function()
	{
		this.setShowingForRoles();

		this.scrollToTop();
		this.$.issuerRepeater.setCount(0);
		this.populateIssuers();
		this.resize();
	},

	// handleChangeFilterSettingsButtonTapped: function(inSender, inEvent)
	// {
	// 	this.$.changeFilterSettingsPopup.show(this.get("filterSettings") || new lumberjack.SubscriptionFilterSettingsModel({}));
	// 	return;
	// },

	handleClearSearchButtonTapped: function(inSender, inEvent){
		this.$.searchInput.set("value", "");
		// this.set("filterSettings", null);
		this.populateIssuers();
		return;
	},

	// handleFilterSettingsChanged: function(inSender, inEvent){
	// 	this.set("filterSettings", inEvent.filterSettings);
	// 	this.populateSubscriptions();
	// 	return;
	// },

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent){
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateIssuers();}), 300);
	},

	/*******************
	* Main Repeater Section
	*******************/

	populateIssuers: function(){
		//if (!this.get("filterSettings")) {this.set("filterSettings", new lumberjack.SubscriptionFilterSettingsModel({}));}
		//if (this.get("issuerCollection")) {this.$.changeFilterSettingsPopup.set("countryCheckboxNames", this.get("subscriptionCollection").getSubscriberCountries());}

		var results = this.get("issuerCollection").filter(enyo.bind(this, function(value, index, array){
			var searchResultFound = false;

			if (this.$.searchInput.get("value") !== "")
			{
				var searchValue = this.$.searchInput.get("value").toLowerCase();
				if (value.get("issuerName").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("contactName").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("businessEmailAddress").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("auditor").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("transferAgent").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("businessEmailAddress").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
			}
			else
			{
				searchResultFound = true;
			}

			// var allowedByFilterSettings = true;
			// var filter = this.get("filterSettings");

			// //Test Country
			// if (!filter.get("showAllCountries") && filter.get("countriesToShow").indexOf(value.get("contactInfo").addressInfo.country) === -1)
			// {
			// 	allowedByFilterSettings = false;
			// }

			return searchResultFound; // && allowedByFilterSettings;
		}));

		this.set("filteredIssuerCollection", new enyo.Collection(results));//new lumberjack.SubscriptionCollection(results));

		this.$.noIssuersLabel.set("showing", this.get("filteredIssuerCollection").length === 0);
		this.$.issuerRepeater.set("showing", this.get("filteredIssuerCollection").length > 0);
		this.$.issuerRepeater.setCount(this.get("filteredIssuerCollection").length);
		this.resize();
	},

	setupIssuerRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		var refItem = this.get("filteredIssuerCollection").at(inEvent.index);

		inEvent.item.$.issuerItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.displayName.set("content", refItem.get("issuerName") ? refItem.get("issuerName") : "");
		inEvent.item.$.numFilings.set("content", refItem.get("offeringFilings") ? refItem.get("offeringFilings").length : 0);
		inEvent.item.$.contactPerson.set("content", refItem.get("contactName") ? refItem.get("contactName") : "");
		inEvent.item.$.emailAddress.set("content", refItem.get("businessEmailAddress") ? refItem.get("businessEmailAddress") : "");
		inEvent.item.$.phoneNumber.set("content", refItem.get("telephoneNumber") ? refItem.get("telephoneNumber") : "");
		inEvent.item.$.auditor.set("content", refItem.get("auditor") ? refItem.get("auditor") : "");
		inEvent.item.$.transferAgent.set("content", refItem.get("transferAgent") ? refItem.get("transferAgent") : "");
		inEvent.item.$.industryClassification.set("content", refItem.get("industryClassification") ? refItem.get("industryClassification") : "");
		inEvent.item.$.issuerAssets.set("content", refItem.get("sizeOfIssuerAssets") ? refItem.get("sizeOfIssuerAssets") : "");
		
		return true;
	},

	handleIssuerRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredIssuerCollection").at(inEvent.index), collection: this.get("filteredIssuerCollection")});
	}
});