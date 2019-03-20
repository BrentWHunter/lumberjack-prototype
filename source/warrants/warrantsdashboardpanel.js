enyo.kind({
	name: "quantum.WarrantsDashboardPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onGoHome: "",
		onViewItemDetail: ""
	},

	published: {
		database: null,
		warrantCollection: null,
		filteredWarrantCollection: null,
		holderContactMap: null,
		unassignedPayments: null,
		filterSettings: null
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Warrants:"},
			{style: "margin-left: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "margin-left: 10px; line-height: 34px;", components: [
				{kind: "quantum.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]},
			{fit: true},
			{style: "line-height: 34px;", components: [
				{kind: "quantum.Button", style: "margin: 0; padding: 2px 6px 3px;", ontap: "handleChangeFilterSettingsButtonTapped", components: [
					{kind: "enyo.Image", style: "width: 24px; height: 24px;", src: "assets/icons/filter-icon.png"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Holder Name", style: "width: 250px;"},
			{content: "Number of Shares", style: "width: 100px; margin-left: 10px;"},
			{content: "Exercise Price", style: "width: 100px; margin-left: 10px;"},
			{content: "Exercise Currency", style: "width: 100px; margin-left: 10px;"},
			{content: "Date Issued", style: "width: 100px; margin-left: 10px;"},
			{content: "Date of Expiration", style: "width: 100px; margin-left: 10px;"},
			{content: "Status", style: "width: 200px; margin-left: 10px;"}
		]},
		{name: "warrantRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupWarrantRepeaterItem", components: [
			{name: "warrantItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleWarrantRepeaterItemTapped", components: [
				{name: "holderName", style: "line-height: 34px; width: 250px;"},
				{name: "numShares", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "exercisePrice", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "exerciseCurrency", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "dateIssued", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "expiryDate", style: "line-height: 34px; width: 100px; margin-left: 10px;"},
				{name: "status", style: "line-height: 34px; width: 200px; margin-left: 10px;"}
			]}
		]},
		{name: "noWarrantsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Warrants Found"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"},
		{name: "changeFilterSettingsPopup", kind: "quantum.WarrantFilterSettingsPopup", onFilterSettingsChanged: "handleFilterSettingsChanged"}
	],

	bindings: [
	],

	activate: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "warrant")) { this.doGoHome(); return; }

		this.scrollToTop();
		this.$.warrantRepeater.setCount(0);
		this.populateWarrants();
		this.resize();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent)
	{
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateWarrants();}), 300);
	},

	handleClearSearchButtonTapped: function(inSender, inEvent)
	{
		this.$.searchInput.set("value", "");
		this.set("filterSettings", null);
		this.populateWarrants();
	},

	handleChangeFilterSettingsButtonTapped: function(inSender, inEvent)
	{
		this.$.changeFilterSettingsPopup.show(this.get("filterSettings"));
		return;
	},

	handleFilterSettingsChanged: function(inSender, inEvent)
	{
		this.set("filterSettings", inEvent.filterSettings);
		this.populateWarrants();
		return;
	},

	/************************
	* Main Repeater Section *
	************************/

	populateWarrants: function()
	{
		if (this.get("filterSettings") == null)
		{
			this.set("filterSettings", new quantum.WarrantFilterSettingsModel({}));
		}
		var filterSettings = this.get("filterSettings");

		var searchValue = null;
		if (this.$.searchInput.get("value") !== "")
		{
			searchValue = this.$.searchInput.get("value").toLowerCase();
		}

		var holderContactMap = this.get("holderContactMap");

		var results = this.get("warrantCollection").filter(enyo.bind(this, function(value, index, array) {
			var allowedByFilterSettings = false;
			if (filterSettings.get("showAllStatuses") === true)
			{
				allowedByFilterSettings = true;
			}
			else if (filterSettings.get("showOnlyActionableStatuses") === true)
			{
				if (filterSettings.isActionableStatus(value.get("status")))
				{
					allowedByFilterSettings = true;
				}
			}
			else
			{
				if (filterSettings.get("statusesToShow").indexOf(value.get("status")) !== -1)
				{
					allowedByFilterSettings = true;
				}
			}

			if (filterSettings.get("showOnlyRootWarrants") === true)
			{
				allowedByFilterSettings = allowedByFilterSettings && value.get("_id") === value.get("rootID");
			}

			if (!allowedByFilterSettings) { return false; }

			var allowedBySearchValue = false;
			if (searchValue == null)
			{
				allowedBySearchValue = true;
			}
			else
			{
				try
				{
					var holderContact = holderContactMap[value.get("holderContactID")];
					if ((holderContact.contactName || "").toLowerCase().indexOf(searchValue) !== -1)
					{
						allowedBySearchValue = true;
					}
					if ((holderContact.emailAddress || "").toLowerCase().indexOf(searchValue) !== -1)
					{
						allowedBySearchValue = true;
					}
					if ((holderContact.phoneNumber || "").toLowerCase().indexOf(searchValue) !== -1)
					{
						allowedBySearchValue = true;
					}
				}
				catch (err) {}

				if ((value.get("holderContactID") || "").toLowerCase().indexOf(searchValue) !== -1)
				{
					allowedBySearchValue = true;
				}
				if ((value.get("numShares") || "").toString().indexOf(searchValue) !== -1)
				{
					allowedBySearchValue = true;
				}
				if ((value.get("exercisePrice") || "").toString().indexOf(searchValue) !== -1)
				{
					allowedBySearchValue = true;
				}
				if ((value.get("exerciseCurrency") || "").toLowerCase().indexOf(searchValue) !== -1)
				{
					allowedBySearchValue = true;
				}
				if (moment(value.get("dateIssued") || "").format("YYYY/MM/DD").indexOf(searchValue) !== -1)
				{
					allowedBySearchValue = true;
				}

				if (moment(value.get("expiryDate") || "").format("YYYY/MM/DD").indexOf(searchValue) !== -1)
				{
					allowedBySearchValue = true;
				}
			}

			return allowedByFilterSettings && allowedBySearchValue;
		}));
		this.set("filteredWarrantCollection", new quantum.WarrantCollection(results));

		this.$.noWarrantsLabel.set("showing", this.get("filteredWarrantCollection").length === 0);
		this.$.warrantRepeater.set("showing", this.get("filteredWarrantCollection").length > 0);
		this.$.warrantRepeater.setCount(this.get("filteredWarrantCollection").length);
		this.resize();
	},

	setupWarrantRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "warrant")) { return; }

		if (inEvent.item == null) { return; }

		inEvent.item.$.warrantItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		var warrant = this.get("filteredWarrantCollection").at(inEvent.index);

		try
		{
			var holderContact = this.get("holderContactMap")[warrant.get("holderContactID")];
			inEvent.item.$.holderName.set("content", holderContact.contactName || "");
		}
		catch (err) {}

		inEvent.item.$.numShares.set("content", warrant.get("numShares") || "0");
		inEvent.item.$.exercisePrice.set("content", warrant.get("exercisePrice") || "");
		inEvent.item.$.exerciseCurrency.set("content", warrant.get("exerciseCurrency") || "");
		inEvent.item.$.dateIssued.set("content", moment(warrant.get("dateIssued") || "").format("YYYY/MM/DD"));
		inEvent.item.$.expiryDate.set("content", moment(warrant.get("expiryDate") || "").format("YYYY/MM/DD"));
		inEvent.item.$.status.set("content", quantum.warrantStatusLookup(warrant.get("status")));
	},

	handleWarrantRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredWarrantCollection").at(inEvent.index), collection: this.get("filteredWarrantCollection")});
	}
});