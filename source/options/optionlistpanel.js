enyo.kind({
	name: "lumberjack.OptionListPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onViewItemDetail: "",
		onCreateNewOption: "",
		onGoHome: ""
	},

	published: {
		optionCollection: null,
		filteredOptionCollection: null,
		fromDate: moment("2016-01-01"),
		toDate: moment(),
		filterSettings: null
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Options:"},
			{style: "margin-left: 10px; margin-right: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "line-height: 38px; font-size: 18px;", content: "From:"},
			{components: [
				{style: "margin-left: 10px; margin-right: 10px; width: 100px;", kind: "onyx.InputDecorator", components: [
					{name: "fromDateInput", style: "width: 100%;", kind: "onyx.Input", ontap: "handleFromDateInputTapped", attributes: {readonly:true}}
				]},
				{name: "fromCalendarPopup", kind: "lumberjack.CalendarPopup", onSelect: "fromCalendarDateChanged"}
			]},
			{style: "line-height: 38px; font-size: 18px;", content: "To:"},
			{components: [
				{style: "margin-left: 10px; margin-right: 10px; width: 100px;", kind: "onyx.InputDecorator", components: [
					{name: "toDateInput", style: "width: 100%;", kind: "onyx.Input", ontap: "handleToDateInputTapped", attributes: {readonly:true}}
				]},
				{name: "toCalendarPopup", kind: "lumberjack.CalendarPopup", onSelect: "toCalendarDateChanged"}
			]},
			{style: "line-height: 34px;", components: [
				{kind: "lumberjack.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]},
			{fit: true},
			{style: "line-height: 34px;", components: [
				{kind: "lumberjack.Button", style: "margin-right: 4px; padding: 2px 6px 3px;", ontap: "handleChangeFilterSettingsButtonTapped", components: [
					{kind: "enyo.Image", style: "width: 24px; height: 24px;", src: "assets/icons/filter-icon.png"}
				]}
			]},
			{style: "line-height: 34px;", showing: false, name: "newTransferButton", components: [
				{kind: "lumberjack.Button", style: "margin: 0;", content: "New Option", ontap: "handleNewOptionButtonTapped"}
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
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"},
		{name: "changeFilterSettingsPopup", kind: "lumberjack.OptionFilterSettingsPopup", onFilterSettingsChanged: "handleFilterSettingsChanged"}
	],

	bindings: [
		{from: ".fromDate", to: ".$.fromDateInput.value", transform: function(v) {
			return v.format("YYYY/MM/DD");
		}},
		{from: ".toDate", to: ".$.toDateInput.value", transform: function(v) {
			return v.format("YYYY/MM/DD");
		}}
	],

	setShowingForRoles: function()
	{
		this.$.newTransferButton.set("showing", lumberjack.hasRole(["admins","users"], "option"));
	},

	activate: function()
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "option")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.scrollToTop();
		this.$.optionRepeater.setCount(0);
		this.populateOptions();
		this.resize();
	},

	handleChangeFilterSettingsButtonTapped: function(inSender, inEvent)
	{
		this.$.changeFilterSettingsPopup.show(this.get("filterSettings") || new lumberjack.OptionFilterSettingsModel({}));
		return;
	},

	handleFilterSettingsChanged: function(inSender, inEvent){
		this.set("filterSettings", inEvent.filterSettings);
		this.populateOptions();
		return;
	},

	handleNewOptionButtonTapped: function(inSender, inEvent)
	{
		this.doCreateNewOption();
	},

	handleClearSearchButtonTapped: function(inSender, inEvent)
	{
		this.set("fromDate", moment("2016-01-01"));
		this.set("toDate", moment());
		this.$.searchInput.set("value", "");
		this.populateOptions();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent)
	{
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateOptions();}), 300);
	},

	handleFromDateInputTapped: function(inSender, inEvent)
	{
		this.$.fromCalendarPopup.show();
	},

	handleToDateInputTapped: function(inSender, inEvent)
	{
		this.$.toCalendarPopup.show();
	},

	fromCalendarDateChanged: function(inSender, inEvent)
	{
		this.set("fromDate", moment(inEvent.date));
		this.$.fromCalendarPopup.hide();
		this.populateOptions();
		return true;
	},

	toCalendarDateChanged: function(inSender, inEvent)
	{
		this.set("toDate", moment(inEvent.date));
		this.$.toCalendarPopup.hide();
		this.populateOptions();
		return true;
	},

	/************************
	* Main Repeater Section *
	************************/

	populateOptions: function()
	{
		if (!this.get("filterSettings")) {this.set("filterSettings", new lumberjack.OptionFilterSettingsModel({}));}
		var filteredByDate = this.get("optionCollection").filter(function(element) {
			try
			{
				var allowedByFilterSettings = true;
				var filter = this.get("filterSettings");
				//Test Status
				if (filter.get("showAllNonCancelledStatuses") && element.get("status") === "cancelled")
				{
					allowedByFilterSettings = false;
				}
				else if (!filter.get("showAllNonCancelledStatuses") && filter.get("statusesToShow").indexOf(element.get("status")) === -1)
				{
					allowedByFilterSettings = false;
				}

				return moment(element.get("dateIssued")).isBetween(this.get("fromDate"), this.get("toDate"), "day", "[]") && allowedByFilterSettings;
			}
			catch (err) { return false; }
		}, this);

		if (this.$.searchInput.get("value") !== "")
		{
			var results = new lumberjack.OptionCollection(filteredByDate).filter(function(element) {
				var searchValue = this.$.searchInput.get("value").toLowerCase();
				var containsSearchValue = function(str) {
					try
					{
						if (typeof(str) === 'string') { return str.toLowerCase().indexOf(searchValue) !== -1; }
						throw null;
					}
					catch (err) { return false; }
				};
				return (
					containsSearchValue(element.get("holderDisplayName")) ||
					containsSearchValue(element.get("holderEmail")) ||
					containsSearchValue(this.getStatus(element.get("status"))) ||
					containsSearchValue(numeral(element.get("numSharesMax")).format("0,0")) ||
					containsSearchValue(numeral(element.get("exercisePrice")).format("$0,0.00")) ||
					containsSearchValue(numeral(element.get("purchasePriceTotal")).format("$0,0"))
				);
			}, this);

			this.set("filteredOptionCollection", new lumberjack.OptionCollection(results));
		}
		else
		{
			this.set("filteredOptionCollection", new lumberjack.OptionCollection(filteredByDate));
		}

		this.$.noOptionsLabel.set("showing", this.get("filteredOptionCollection").length === 0);
		this.$.optionRepeater.set("showing", this.get("filteredOptionCollection").length > 0);
		this.$.optionRepeater.setCount(this.get("filteredOptionCollection").length);
		this.resize();
	},

	setupOptionRepeaterItem: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "option")) { return; }

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