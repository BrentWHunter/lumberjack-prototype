enyo.kind({
	name: "lumberjack.ContactListPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onViewItemDetail: "",
		onGoHome: ""
	},

	published: {
		contactCollection: null,
		filteredContactCollection: null
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Contacts:"},
			{style: "margin-left: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "margin-left: 10px; line-height: 34px;", components: [
				{kind: "lumberjack.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]},
			{kind: "lumberjack.Checkbox", name: "newOnlyCheckbox", content: "New Contacts Only", columnStyle: "margin-left: 10px; margin-top: 2px;", contentStyle: "margin-left:10px;", onchange: "handleSearchInputChanged"}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Contact Name", style: "width: 250px;"},
			{content: "City", style: "width: 150px; margin-left: 10px;"},
			{content: "State/Province", style: "width: 150px; margin-left: 10px;"},
			{content: "Country", style: "width: 100px; margin-left: 10px;"},
			{content: "Subscriber", style: "width: 100px; margin-left: 10px;"},
			{content: "Shareholder", style: "width: 100px; margin-left: 10px;"},
			{content: "Buyer", style: "width: 80px; margin-left: 10px;"},
			{content: "Option Holder", style: "width: 100px; margin-left: 10px;"},
			{content: "Warrant Holder", style: "width: 100px; margin-left: 10px;"}
		]},
		{name: "contactRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupContactRepeaterItem", components: [
			{name: 'contactItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleContactRepeaterItemTapped", components: [
				{name: "contactName", style: "line-height: 34px; width: 250px;"},
				{name: "contactCity", style: "line-height: 34px; width: 150px; margin-left: 10px;"},
				{name: "contactStateProvince", style: "line-height: 34px; width: 150px; margin-left: 10px;"},
				{name: "contactCountry", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{classes: "input-control checkbox", style: "text-align: center; width: 100px;", components: [
					{tag: "label", components:[
						{name: "subscriberRoleCheckbox", kind: "enyo.Checkbox", disabled: true},
						{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
					]}
				]},
				{classes: "input-control checkbox", style: "text-align: center; width: 100px;", components: [
					{tag: "label", components:[
						{name: "shareholderRoleCheckbox", kind: "enyo.Checkbox", disabled: true},
						{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
					]}
				]},
				{classes: "input-control checkbox", style: "text-align: center; width: 100px;", components: [
					{tag: "label", components:[
						{name: "buyerRoleCheckbox", kind: "enyo.Checkbox", disabled: true},
						{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
					]}
				]},
				{classes: "input-control checkbox", style: "text-align: center; width: 100px;", components: [
					{tag: "label", components:[
						{name: "optionRoleCheckbox", kind: "enyo.Checkbox", disabled: true},
						{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
					]}
				]},
				{classes: "input-control checkbox", style: "text-align: center; width: 100px;", components: [
					{tag: "label", components:[
						{name: "warrantRoleCheckbox", kind: "enyo.Checkbox", disabled: true},
						{tag: "span", classes: "check"} //This is here because otherwise the CSS breaks
					]}
				]}
			]}
		]},
		{name: "noContactsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Contacts Found"},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	setShowingForRoles: function()
	{
		//Nothing to do here right now.
	},

	activate: function()
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "contact")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.scrollToTop();
		this.$.contactRepeater.setCount(0);
		this.populateContacts();
		this.resize();
	},

	handleClearSearchButtonTapped: function(inSender, inEvent){
		this.$.searchInput.set("value", "");
		this.populateContacts();
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent){
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateContacts();}), 300);
	},

	/*******************
	* Main Repeater Section
	*******************/

	populateContacts: function(){
		if (this.$.searchInput.get("value") !== "" || this.$.newOnlyCheckbox.get("checked"))
		{
			var results = this.get("contactCollection").filter(enyo.bind(this, function(value, index, array){
				var searchValue = this.$.searchInput.get("value").toLowerCase();
				if (this.$.newOnlyCheckbox.get("checked"))
				{
					if (!value.get("newContactFlag")) {return false;}
					if (this.$.searchInput.get("value") === "")	{return true;}
				}
				if (value.get("contactID") && value.get("contactID").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("contactName") && value.get("contactName").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").addressLine1 && value.get("addressInfo").addressLine1.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").addressLine2 && value.get("addressInfo").addressLine2.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").addressLine3 && value.get("addressInfo").addressLine3.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").city && value.get("addressInfo").city.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").stateProvince && value.get("addressInfo").stateProvince.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").country && value.get("addressInfo").country.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("addressInfo").zipPostalCode && value.get("addressInfo").zipPostalCode.toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("phoneNumber") && value.get("phoneNumber").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("businessPhoneNumber") && value.get("businessPhoneNumber").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("cellPhoneNumber") && value.get("cellPhoneNumber").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("faxNumber") && value.get("faxNumber").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("emailAddress") && value.get("emailAddress").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("secondaryEmailAddress") && value.get("secondaryEmailAddress").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				return false;
			}));

			this.set("filteredContactCollection", new lumberjack.ContactCollection(results));
		}
		else
		{
			this.set("filteredContactCollection", this.get("contactCollection"));
		}

		this.$.noContactsLabel.set("showing", this.get("filteredContactCollection").length === 0);
		this.$.contactRepeater.set("showing", this.get("filteredContactCollection").length > 0);
		this.$.contactRepeater.setCount(this.get("filteredContactCollection").length);
		this.resize();
	},

	setupContactRepeaterItem: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "contact")) { return; }
		
		if (!inEvent.item) {return true;}

		inEvent.item.$.contactItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		if (this.get("filteredContactCollection").at(inEvent.index).get("newContactFlag"))
		{
			inEvent.item.$.contactItem.applyStyle("background-color", "yellow");
		}

		inEvent.item.$.contactName.set("content", this.get("filteredContactCollection").at(inEvent.index).get("contactName") ? this.get("filteredContactCollection").at(inEvent.index).get("contactName") : "");
		inEvent.item.$.contactCity.set("content", this.get("filteredContactCollection").at(inEvent.index).get("addressInfo").city ? this.get("filteredContactCollection").at(inEvent.index).get("addressInfo").city : "");
		inEvent.item.$.contactStateProvince.set("content", this.get("filteredContactCollection").at(inEvent.index).get("addressInfo").stateProvince ? this.get("filteredContactCollection").at(inEvent.index).get("addressInfo").stateProvince : "");
		inEvent.item.$.contactCountry.set("content", this.get("filteredContactCollection").at(inEvent.index).get("addressInfo").country ? this.get("filteredContactCollection").at(inEvent.index).get("addressInfo").country : "");
		inEvent.item.$.shareholderRoleCheckbox.set("checked", this.get("filteredContactCollection").at(inEvent.index).get("activeRoles") && this.get("filteredContactCollection").at(inEvent.index).get("activeRoles").indexOf("shareholder") !== -1);
		inEvent.item.$.subscriberRoleCheckbox.set("checked", this.get("filteredContactCollection").at(inEvent.index).get("activeRoles") && this.get("filteredContactCollection").at(inEvent.index).get("activeRoles").indexOf("subscriber") !== -1);
		inEvent.item.$.buyerRoleCheckbox.set("checked", this.get("filteredContactCollection").at(inEvent.index).get("activeRoles") && this.get("filteredContactCollection").at(inEvent.index).get("activeRoles").indexOf("buyer") !== -1);
		inEvent.item.$.optionRoleCheckbox.set("checked", this.get("filteredContactCollection").at(inEvent.index).get("activeRoles") && this.get("filteredContactCollection").at(inEvent.index).get("activeRoles").indexOf("optionholder") !== -1);
		inEvent.item.$.warrantRoleCheckbox.set("checked", this.get("filteredContactCollection").at(inEvent.index).get("activeRoles") && this.get("filteredContactCollection").at(inEvent.index).get("activeRoles").indexOf("warrantholder") !== -1);
		return true;
	},

	handleContactRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredContactCollection").at(inEvent.index), collection: this.get("filteredContactCollection")});
	}
});