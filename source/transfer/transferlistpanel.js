enyo.kind({
	name: "quantum.TransferListPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onViewItemDetail: "",
		onCreateNewTransfer: "",
		onGoHome: ""
	},

	published: {
		transferCollection: null,
		filteredTransferCollection: null,
		fromDate: moment("2016-01-01"),
		toDate: moment(),
		filterSettings: null
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Transfers:"},
			{style: "margin-left: 10px; margin-right: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "line-height: 38px; font-size: 18px;", content: "From:"},
			{components: [
				{style: "margin-left: 10px; margin-right: 10px; width: 100px;", kind: "onyx.InputDecorator", components: [
					{name: "fromDateInput", style: "width: 100%;", kind: "onyx.Input", ontap: "handleFromDateInputTapped", attributes: {readonly:true}}
				]},
				{name: "fromCalendarPopup", kind: "quantum.CalendarPopup", onSelect: "fromCalendarDateChanged"}
			]},
			{style: "line-height: 38px; font-size: 18px;", content: "To:"},
			{components: [
				{style: "margin-left: 10px; margin-right: 10px; width: 100px;", kind: "onyx.InputDecorator", components: [
					{name: "toDateInput", style: "width: 100%;", kind: "onyx.Input", ontap: "handleToDateInputTapped", attributes: {readonly:true}}
				]},
				{name: "toCalendarPopup", kind: "quantum.CalendarPopup", onSelect: "toCalendarDateChanged"}
			]},
			{style: "line-height: 34px;", components: [
				{kind: "quantum.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]},
			{fit: true},
			{style: "line-height: 34px;", components: [
				{kind: "quantum.Button", style: "margin-right: 4px; padding: 2px 6px 3px;", ontap: "handleChangeFilterSettingsButtonTapped", components: [
					{kind: "enyo.Image", style: "width: 24px; height: 24px;", src: "assets/icons/filter-icon.png"}
				]}
			]},
			{style: "line-height: 34px;", showing: false, name: "newTransferButton", components: [
				{kind: "quantum.Button", style: "margin: 0;", content: "New Transfer", ontap: "handleNewTransferButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Transfer Date", style: "width: 150px;"},
			{content: "Seller Name", style: "width: 200px;"},
			{content: "Buyer Name", style: "width: 200px;"},
			{content: "Transfer Status", style: "width: 200px;"},
			{content: "Number Of Shares", style: "width: 150px;"},
			{content: "Price Per Share", style: "width: 150px;"},
			{content: "Transfer Amount", style: "width: 150px;"}
		]},
		{name: "transferRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupTransferRepeaterItem", components: [
			{name: 'transferItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleTransferRepeaterItemTapped", components: [
				{name: "transferDate", style: "width: 150px;"},
				{name: "sellerName", style: "width: 200px;"},
				{name: "buyerName", style: "width: 200px;"},
				{name: "transferStatus", style: "width: 200px;"},
				{name: "numShares", style: "width: 150px; text-align: right;"},
				{name: "pricePerShare", style: "width: 150px; text-align: right;"},
				{name: "transferDollarAmount", style: "width: 150px; text-align: right;"}
			]}
		]},
		{name: "noTransfersLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Transfers Found"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"},
		{name: "changeFilterSettingsPopup", kind: "quantum.TransferFilterSettingsPopup", onFilterSettingsChanged: "handleFilterSettingsChanged"}
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
		this.$.newTransferButton.set("showing", quantum.hasRole(["admins","users"], "transfer"));
	},

	activate: function()
	{
		if (!quantum.hasRole(["admins","users","auditors"], "transfer")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.scrollToTop();
		this.$.transferRepeater.setCount(0);
		this.populateTransfers();
		this.resize();
	},

	handleChangeFilterSettingsButtonTapped: function(inSender, inEvent)
	{
		this.$.changeFilterSettingsPopup.show(this.get("filterSettings") || new quantum.TransferFilterSettingsModel({}));
		return;
	},

	handleFilterSettingsChanged: function(inSender, inEvent){
		this.set("filterSettings", inEvent.filterSettings);
		this.populateTransfers();
		return;
	},

	handleNewTransferButtonTapped: function(inSender, inEvent)
	{
		this.doCreateNewTransfer();
	},

	handleClearSearchButtonTapped: function(inSender, inEvent)
	{
		this.set("fromDate", moment("2016-01-01"));
		this.set("toDate", moment());
		this.$.searchInput.set("value", "");
		this.populateTransfers();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent)
	{
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateTransfers();}), 300);
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
		this.populateTransfers();
		return true;
	},

	toCalendarDateChanged: function(inSender, inEvent)
	{
		this.set("toDate", moment(inEvent.date));
		this.$.toCalendarPopup.hide();
		this.populateTransfers();
		return true;
	},

	/************************
	* Main Repeater Section *
	************************/

	populateTransfers: function()
	{
		if (!this.get("filterSettings")) {this.set("filterSettings", new quantum.TransferFilterSettingsModel({}));}
		var filteredByDate = this.get("transferCollection").filter(function(element) {
			try
			{
				var allowedByFilterSettings = true;
				var filter = this.get("filterSettings");
				//Test Status
				if (filter.get("showAllNonCancelledStatuses") && element.get("transferStatus") === "cancelled")
				{
					allowedByFilterSettings = false;
				}
				else if (!filter.get("showAllNonCancelledStatuses") && filter.get("statusesToShow").indexOf(element.get("transferStatus")) === -1)
				{
					allowedByFilterSettings = false;
				}

				return moment(element.get("transactionDate")).isBetween(this.get("fromDate"), this.get("toDate"), "day", "[]") && allowedByFilterSettings;
			}
			catch (err) { return false; }
		}, this);

		if (this.$.searchInput.get("value") !== "")
		{
			var results = new quantum.TransferCollection(filteredByDate).filter(function(element) {
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
					containsSearchValue(element.get("seller").name) ||
					containsSearchValue(element.get("buyer").name) ||
					containsSearchValue(quantum.transferStatusLookup(element.get("transferStatus"))) ||
					containsSearchValue(numeral(element.get("numShares")).format("0,0")) ||
					containsSearchValue("$" + quantum.formatCurrency(element.get("pricePerShare"))) ||
					containsSearchValue("$" + quantum.formatCurrency(element.get("totalPurchasePrice")))
				);
			}, this);

			this.set("filteredTransferCollection", new quantum.TransferCollection(results));
		}
		else
		{
			this.set("filteredTransferCollection", new quantum.TransferCollection(filteredByDate));
		}

		this.$.noTransfersLabel.set("showing", this.get("filteredTransferCollection").length === 0);
		this.$.transferRepeater.set("showing", this.get("filteredTransferCollection").length > 0);
		this.$.transferRepeater.setCount(this.get("filteredTransferCollection").length);
		this.resize();
	},

	setupTransferRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "transfer")) { return true; }
		
		if (!inEvent.item) { return true; }

		inEvent.item.$.transferItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.transferDate.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("transactionDate") ? moment(this.get("filteredTransferCollection").at(inEvent.index).get("transactionDate")).format("YYYY/MM/DD") : "");
		inEvent.item.$.sellerName.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("seller").name || "");
		inEvent.item.$.buyerName.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("buyer").name || "");
		inEvent.item.$.transferStatus.set("content", quantum.transferStatusLookup(this.get("filteredTransferCollection").at(inEvent.index).get("transferStatus")));
		inEvent.item.$.numShares.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("numShares") ? numeral(this.get("filteredTransferCollection").at(inEvent.index).get("numShares")).format('0,0') : "0");
		inEvent.item.$.pricePerShare.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("pricePerShare") ? "$" + quantum.formatCurrency(this.get("filteredTransferCollection").at(inEvent.index).get("pricePerShare")) : "$0");
		inEvent.item.$.transferDollarAmount.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("totalPurchasePrice") ? "$" + quantum.formatCurrency(this.get("filteredTransferCollection").at(inEvent.index).get("totalPurchasePrice")) : "$0");
		return true;
	},

	handleTransferRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredTransferCollection").at(inEvent.index), collection: this.get("filteredTransferCollection")});
	}
});