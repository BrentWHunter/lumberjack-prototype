enyo.kind({
	name: "quantum.OptionsDashboardPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		database: null,
		transferCollection: null,
		filteredTransferCollection: null,
		unassignedPayments: null,
		populatingCollection: false,
		populatingPayments: false
	},

	events: {
		onViewItemDetail: "",
		onGoHome: ""
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Options:"},
			{style: "margin-left: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "margin-left: 10px; line-height: 34px;", components: [
				{kind: "quantum.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Option Holder", style: "width: 225px;"},
			{content: "Email", style: "width: 300px; margin-left: 10px;"},
			{content: "Phone", style: "width: 150px; margin-left: 10px;"},
			{content: "Total Shares", style: "width: 100px; margin-left: 10px;"},
			{content: "Active Shares", style: "width: 100px; margin-left: 10px;"},
			{content: "Share Price", style: "width: 100px; margin-left: 10px;"},
			{content: "Issue Date", style: "width: 100px; margin-left: 10px;"},
			{content: "Status", style: "width: 100px; margin-left: 10px;"}
		]},
		{name: "optionRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupOptionRepeaterItem", components: [
			{name: 'optionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleOptionRepeaterItemTapped", components: [
				{name: "optionHolderName", style: "line-height: 34px; width: 225px;"},
				{name: "optionHolderEmail", style: "line-height: 34px; width: 300px; margin-left: 10px;"},
				{name: "optionHolderPhone", style: "line-height: 34px; width: 150px; margin-left: 10px;"},
				{name: "numSharesMax", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "numSharesActive", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "pricePerShare", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "issueDate", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "status", style: "line-height: 34px; width: 100px; margin-left: 10px;"}
			]}
		]},
		{name: "noOptionsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Options Found"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
	],
	setShowingForRoles: function()
	{
		//Nothing to do here right now.
	},
	activate: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "option")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.scrollToTop();
		this.$.optionRepeater.setCount(0);
		this.populateOptions();
		this.resize();
	},

	handleClearSearchButtonTapped: function(inSender, inEvent){
		this.$.searchInput.set("value", "");
		this.populateOptions();
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent){
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateOptions();}), 300);
	},

	/*******************
	* Main Repeater Section
	*******************/

	populateOptions: function(){
		var activeOptions = this.get("optionCollection").filter(enyo.bind(this, function(value, index, array){
			if (value.get("status") && (value.get("status").toLowerCase() == "active" || value.get("status").toLowerCase() == "created")) {return true;}
			return false;
		}));

		if (this.$.searchInput.get("value") !== "")
		{
			var results = activeOptions.filter(enyo.bind(this, function(value, index, array){
				var searchValue = this.$.searchInput.get("value").toLowerCase();

				if (value.get("exercisePrice") && value.get("exercisePrice").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("exerciseCurrency") && value.get("exerciseCurrency").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("expiryDate") && value.get("expiryDate").toString().toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("numSharesMax") && value.get("numSharesMax").toString().toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("numSharesActive") && value.get("numSharesActive").toString().toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("numSharesExercised") && value.get("numSharesExercised").toString().toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("dateIssued") && value.get("dateIssued").toString().toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("holderDisplayName") && value.get("holderDisplayName").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("holderEmail") && value.get("holderEmail").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("holderPhone") && value.get("holderPhone").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("holderContactID") && value.get("holderContactID").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				if (value.get("status") && value.get("status").toLowerCase().indexOf(searchValue) !== -1) {return true;}
				//Need to add search for name/phone/etc. after contact lookup
				return false;
			}));

			this.set("filteredOptionCollection", new quantum.OptionCollection(results));
		}
		else
		{
			this.set("filteredOptionCollection", new quantum.OptionCollection(activeOptions));
		}

		this.$.noOptionsLabel.set("showing", this.get("filteredOptionCollection").length === 0);
		this.$.optionRepeater.set("showing", this.get("filteredOptionCollection").length > 0);
		this.$.optionRepeater.setCount(this.get("filteredOptionCollection").length);
		this.resize();
	},

	setupOptionRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "option")) { return; }

		if (!inEvent.item) {return true;}

		inEvent.item.$.optionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.optionHolderName.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("holderDisplayName") ? this.get("filteredOptionCollection").at(inEvent.index).get("holderDisplayName") : "");
		inEvent.item.$.optionHolderEmail.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("holderEmail") ? this.get("filteredOptionCollection").at(inEvent.index).get("holderEmail") : "");
		inEvent.item.$.optionHolderPhone.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("holderPhone") ? this.get("filteredOptionCollection").at(inEvent.index).get("holderPhone") : "");
		inEvent.item.$.numSharesMax.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("numSharesMax") ? this.get("filteredOptionCollection").at(inEvent.index).get("numSharesMax") : "0");
		inEvent.item.$.numSharesActive.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("numSharesActive") ? this.get("filteredOptionCollection").at(inEvent.index).get("numSharesActive") : "0");
		inEvent.item.$.pricePerShare.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("exercisePrice") ? "$" + this.get("filteredOptionCollection").at(inEvent.index).get("exercisePrice") : "");
		inEvent.item.$.issueDate.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("dateIssued") ? moment(this.get("filteredOptionCollection").at(inEvent.index).get("dateIssued")).format("YYYY/MM/DD") : "");
		inEvent.item.$.status.set("content", this.get("filteredOptionCollection").at(inEvent.index).get("status") ? this.getStatus(this.get("filteredOptionCollection").at(inEvent.index).get("status")) : "");
		return true;
	},

	getStatus:function(status){
		var result = "Cancelled";
		switch(status){
			case "active":
				result = "Active";
				break;
			case "exhausted":
				result = "Exhausted";
				break;
			case "expired":
				result = "Expired";
				break;
			case "cancelled":
				result = "Cancelled";
				break;
			case "created":
				result = "Created";
				break;
			default:
				result = "Cancelled";
				break;
		}

		return result;
	},

	handleOptionRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredOptionCollection").at(inEvent.index), collection: this.get("filteredOptionCollection")});
	}
});