/* global lumberjack, numeral */
enyo.kind({
	name: "lumberjack.SubscriberListPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onViewItemDetail: "",
		onGoHome: ""
	},

	published: {
		subscriptionCollection: null,
		filteredSubscriptionCollection: null,
		filterSettings: null,
		salespeople: null
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Subscriptions:"},
			{style: "margin-left: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "margin-left: 10px; line-height: 34px;", components: [
				{kind: "lumberjack.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]},
			{fit: true},
			{style: "line-height: 34px;", components: [
				{kind: "lumberjack.Button", style: "margin: 0; padding: 2px 6px 3px;", ontap: "handleChangeFilterSettingsButtonTapped", components: [
					{kind: "enyo.Image", style: "width: 24px; height: 24px;", src: "assets/icons/filter-icon.png"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black; min-width: 1490px;", components: [
			{content: "Subscriber Name", style: "width: 200px;"},
			{content: "Contact Person", style: "width: 150px;"},
			{content: "Salesperson Name", style: "width: 150px;"},
			{content: "Email Address", style: "width: 250px;"},
			{content: "Subscription Status", style: "width: 200px;"},
			{content: "Signature Status", style: "width: 115px;"},
			{name: "verificationDocumentStatusHeader", content: "Verification Document Status", style: "width: 115px;"},
			{name: "verificationStatusHeader", content: "Verification Status", style: "width: 130px;"},
			{content: "Number Of Shares", style: "width: 130px;"},
			{content: "Subscription Amount", style: "width: 150px;"},
			{content: "Funds Received", style: "width: 100px;"},
			{content: "Country", style: "width: 75px; margin-left: 10px; text-align: center;"},
			{content: "State/Province", style: "width: 100px;text-align: center;"}
		]},
		{name: "subscriptionRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black; min-width: 1490px;", onSetupItem: "setupSubscriptionRepeaterItem", components: [
			{name: 'subscriptionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleSubscriptionRepeaterItemTapped", components: [
				{name: "displayName", style: "width: 200px;"},
				{name: "contactPerson", style: "width: 150px;"},
				{name: "salespersonName", style: "width: 150px;"},
				{name: "email", style: "width: 250px;"},
				{name: "subscriptionStatus", style: "width: 200px;"},
				{name: "agreementSignatureStatus", style: "width: 110px; text-align: center; margin-right: 5px;", components: [
					{name: "agreementSignatureStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
				]},
				{name: "verificationDocumentStatus", style: "width: 110px; text-align: center; margin-right: 5px;", components: [
					{name: "verificationDocumentStatusDetail", content: "N/A"},
					{name: "verificationDocumentStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
				]},
				{name: "verificationStatus", style: "width: 130px; text-align: center;"},
				{name: "numShares", style: "width: 130px; text-align: right; margin-left: -15px; margin-right: 15px;"},
				{name: "subscriberDollarAmount", style: "width: 150px; text-align: right; margin-left: -17px; margin-right: 17px;"},
				{name: "fundsReceived", style: "width: 100px; text-align: right; margin-left: -6px; margin-right: 6px;"},
				{name: "country", style: "width: 75px; margin-left: 10px; text-align: center;"},
				{name: "stateProvince", style: "width: 100px; text-align: center;"}
			]}
		]},
		{name: "noSubscriptionsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Subscriptions Found"},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"},
		{name: "changeFilterSettingsPopup", kind: "lumberjack.SubscriptionFilterSettingsPopup", onFilterSettingsChanged: "handleFilterSettingsChanged"}
	],

	setShowingForRoles: function()
	{
		//this.$.newSubscriptionButton.set("showing", lumberjack.hasRole(["admins","users"], "placement"));
		this.$.verificationDocumentStatusHeader.set("showing", lumberjack.preferences.get("placementInfo").is506cFinancing);
		this.$.verificationStatusHeader.set("showing", lumberjack.preferences.get("placementInfo").is506cFinancing);
	},

	activate: function()
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.scrollToTop();
		this.$.subscriptionRepeater.setCount(0);
		this.populateSubscriptions();
		this.resize();
	},

	handleChangeFilterSettingsButtonTapped: function(inSender, inEvent)
	{
		this.$.changeFilterSettingsPopup.show(this.get("filterSettings") || new lumberjack.SubscriptionFilterSettingsModel({}));
		return;
	},

	handleClearSearchButtonTapped: function(inSender, inEvent){
		this.$.searchInput.set("value", "");
		this.set("filterSettings", null);
		this.populateSubscriptions();
		return;
	},

	handleFilterSettingsChanged: function(inSender, inEvent){
		this.set("filterSettings", inEvent.filterSettings);
		this.populateSubscriptions();
		return;
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent){
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateSubscriptions();}), 300);
	},

	/*******************
	* Main Repeater Section
	*******************/

	populateSubscriptions: function(){
		if (!this.get("filterSettings")) {this.set("filterSettings", new lumberjack.SubscriptionFilterSettingsModel({}));}
		if (this.get("subscriptionCollection")) {this.$.changeFilterSettingsPopup.set("countryCheckboxNames", this.get("subscriptionCollection").getSubscriberCountries());}

		var results = this.get("subscriptionCollection").filter(enyo.bind(this, function(value, index, array){
			var searchResultFound = false;

			if (this.$.searchInput.get("value") !== "")
			{
				var searchValue = this.$.searchInput.get("value").toLowerCase();
				if (value.get("contactInfo").displayName.toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("contactInfo").corporateInfo.contactPerson && value.get("contactInfo").corporateInfo.contactPerson.toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("contactInfo").emailAddress.toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
			}
			else
			{
				searchResultFound = true;
			}

			var allowedByFilterSettings = true;
			var filter = this.get("filterSettings");

			//Test Country
			if (!filter.get("showAllCountries") && filter.get("countriesToShow").indexOf(value.get("contactInfo").addressInfo.country) === -1)
			{
				allowedByFilterSettings = false;
			}

			//Test Status
			if (filter.get("showAllNonCancelledStatuses") && value.get("subscriptionInfo").subscriptionStatus === "cancelled")
			{
				allowedByFilterSettings = false;
			}
			else if (!filter.get("showAllNonCancelledStatuses") && filter.get("statusesToShow").indexOf(value.get("subscriptionInfo").subscriptionStatus) === -1)
			{
				allowedByFilterSettings = false;
			}

			//Test Subscription Type
			if (!filter.get("showAllSubscriptionTypes") && filter.get("subscriptionTypesToShow").indexOf(value.get("subscriptionInfo").subscriptionType) === -1)
			{
				allowedByFilterSettings = false;
			}

			//Test Minimum Subscription Value
			if (filter.get("minSubscriptionValue") !== -1 && lumberjack.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount) < filter.get("minSubscriptionValue"))
			{
				allowedByFilterSettings = false;
			}

			//Test Maximum Subscription Value
			if (filter.get("maxSubscriptionValue") !== -1 && lumberjack.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount) > filter.get("maxSubscriptionValue"))
			{
				allowedByFilterSettings = false;
			}

			return searchResultFound && allowedByFilterSettings;
		}));

		this.set("filteredSubscriptionCollection", new lumberjack.SubscriptionCollection(results));

		this.$.noSubscriptionsLabel.set("showing", this.get("filteredSubscriptionCollection").length === 0);
		this.$.subscriptionRepeater.set("showing", this.get("filteredSubscriptionCollection").length > 0);
		this.$.subscriptionRepeater.setCount(this.get("filteredSubscriptionCollection").length);
		this.resize();
	},

	setupSubscriptionRepeaterItem: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { return; }
		if (!inEvent.item) {return true;}

		var getDocumentStatus = function(doc)
		{
			if (doc.signed)
			{
				return "assets/icons/circle-icon-green.png";
			}

			if (doc.sent)
			{
				return "assets/icons/circle-icon-yellow.png";
			}

			if (doc.generated)
			{
				return "assets/icons/circle-icon-red.png";
			}

			return "assets/icons/circle-icon-grey.png";
		};

		var getVerifyInvestorStatus = function(doc)
		{
			var retVal = "assets/icons/circle-icon-grey.png";

			if (!doc.linkAccountRequestSent)
			{
				return retVal;
			}

			if (doc.linkAccountRequestSent && doc.verifyInvestorID)
			{
				retVal = "assets/icons/circle-icon-red.png";
			}

			if (doc.verificationRequestID)
			{
				retVal = "assets/icons/circle-icon-yellow.png";
			}

			if (doc.verificationRequestID && (doc.verificationRequestStatus === "accredited" || doc.verificationRequestStatus === "not_accredited"))
			{
				retVal = "assets/icons/circle-icon-green.png";
			}

			return retVal;
		};

		var refItem = this.get("filteredSubscriptionCollection").at(inEvent.index);

		var agreementSignatureStatusIconSrc = getDocumentStatus(refItem.get("subscriptionAgreementDoc"));

		inEvent.item.$.subscriptionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		if (lumberjack.preferences.get("placementInfo").is506cFinancing)
		{
			inEvent.item.$.verificationDocumentStatus.set("showing", true);
			inEvent.item.$.verificationStatus.set("showing", true);

			if (refItem.get("subscriptionInfo").jurisdiction === "usa" && (!refItem.get("subscriptionInfo").clientIdentityValidator.get("verifyManually") || refItem.get("subscriptionInfo").clientIdentityValidator.get("verificationSource") !== "self"))
			{
				inEvent.item.$.verificationDocumentStatusDetail.set("showing", false);
				inEvent.item.$.verificationDocumentStatusIcon.set("showing", true);
				inEvent.item.$.verificationDocumentStatusIcon.set("src", refItem.get("subscriptionInfo").clientIdentityValidator.get("verificationSource") === "thirdParty" ? getDocumentStatus(refItem.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc")) : getVerifyInvestorStatus(refItem.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc")));
			}
			else
			{
				inEvent.item.$.verificationDocumentStatusDetail.set("showing", true);
				inEvent.item.$.verificationDocumentStatusIcon.set("showing", false);
			}

			if (refItem.get("subscriptionInfo").jurisdiction === "usa")
			{
				var verificationStatus = "";
				var verificationColor = "black";
				switch (refItem.get("subscriptionInfo").clientIdentityValidator.get("verificationStatus"))
				{
					case "pending":
						verificationStatus = "Pending";
						break;
					case "verified":
						verificationStatus = "Verified";
						verificationColor = "green";
						break;
					case "notVerified":
						verificationStatus = "Not Verified";
						verificationColor = "red";
						break;
				}

				inEvent.item.$.verificationStatus.set("content", verificationStatus);
				inEvent.item.$.verificationStatus.applyStyle("color", verificationColor);
			}
			else
			{
				inEvent.item.$.verificationStatus.set("content", "N/A");
				inEvent.item.$.verificationStatus.applyStyle("color", "black");
			}
		}
		else
		{
			inEvent.item.$.verificationDocumentStatus.set("showing", false);
			inEvent.item.$.verificationStatus.set("showing", false);
		}

		inEvent.item.$.displayName.set("content", refItem.get("contactInfo").displayName ? refItem.get("contactInfo").displayName : "");
		inEvent.item.$.contactPerson.set("content", refItem.get("contactInfo").corporateInfo.contactPerson ? refItem.get("contactInfo").corporateInfo.contactPerson : "");
		inEvent.item.$.salespersonName.set("content", (refItem.get("subscriptionInfo").salespersonID != null && refItem.get("subscriptionInfo").salespersonID !== "") ? this.get("salespeople") ? this.get("salespeople")[refItem.get("subscriptionInfo").salespersonID].salespersonName: "" : "");
		inEvent.item.$.email.set("content", refItem.get("contactInfo").emailAddress ? refItem.get("contactInfo").emailAddress : "");
		inEvent.item.$.subscriptionStatus.set("content", lumberjack.subscriptionStatusLookup(refItem.get("subscriptionInfo").subscriptionStatus));
		inEvent.item.$.agreementSignatureStatusIcon.set("src", agreementSignatureStatusIconSrc);
		inEvent.item.$.numShares.set("content", refItem.get("subscriptionInfo").numShares ? numeral(refItem.get("subscriptionInfo").numShares).format('0,0') : "0");
		inEvent.item.$.subscriberDollarAmount.set("content", refItem.get("subscriptionInfo").subscriberDollarAmount ? "$" + lumberjack.formatCurrency(refItem.get("subscriptionInfo").subscriberDollarAmount) : "$0");
		inEvent.item.$.fundsReceived.set("content", refItem.get("subscriptionInfo").fundsReceived ? "$" + lumberjack.formatCurrency(refItem.get("subscriptionInfo").fundsReceived) : "$0");
		inEvent.item.$.country.set("content", refItem.get("contactInfo").addressInfo.country ? refItem.get("contactInfo").addressInfo.country : "");
		inEvent.item.$.stateProvince.set("content", refItem.get("contactInfo").addressInfo.stateProvince ? refItem.get("contactInfo").addressInfo.stateProvince : "");
		return true;
	},

	handleSubscriptionRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredSubscriptionCollection").at(inEvent.index), collection: this.get("filteredSubscriptionCollection")});
	}
});