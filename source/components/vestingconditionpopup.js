enyo.kind({
	name: "lumberjack.VestingConditionSearchPopup",
	kind: "lumberjack.Popup",

	events: {
		onConditionSelected: "",
		onCreateNewCondition: "",
		onCancel: "",
		onLogout: ""
	},

	published: {
		vestingConditions: null,
		companyID: "",
		searchString: "",
		selectedVestingConditionRepeaterIndex: -1,
		allowNewCondition: true,
		enableSearch:false
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{name: "popupTitle", style: "font-size: 24px; text-align: center;", content: "Search Vesting Conditions"},
			{kind: "enyo.FittableColumns", name:"searchHeader", style: "margin-top: 10px;", components: [
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
					{name: "searchInput", style: "width: 270px;", kind: "onyx.Input", value:"Default Search", onkeydown: "handleSearchKeys"}
				]},
				{name: "searchButton", kind: "lumberjack.Button", content: "Search", style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "searchButtonTapped"}
			]},
			{name: "vestingConditionScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 800px; height: 600px; background-color: #EEEEEE;", components: [
				{name: "vestingConditionRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 275px;", onSetupItem: "setupVestingConditionRepeaterItem", components: [
					{name: "vestingConditionItem", style: "background-color: white; color: black; border-bottom: 1px solid black; padding: 10px;", selected: false, ontap: "handleVestingConditionRepeaterItemTapped", components: [
						{name: "vestingConditionName", style: "font-size: 18px; font-weight: bold;"},
						{kind: "enyo.FittableColumns", components: [
							{style: "width: 590px; display: inline-block;", components: [
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;font-weight: bold;", content: "Description:"},
									{name: "vestingDescription"}
								]}
							]},
							{style: "width: 190px; display: inline-block;", components: [
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 75px;font-weight: bold;", content: "Active:"},
									{name: "vestingActive"}
								]}
							]}
						]}
					]}
				]},
				{name: "noResultsItem", showing: false, style: "text-align: center; font-size: 18px; color: black; margin-top: 10px;", content: "No Results"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "lumberjack.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "newConditionButton", kind: "lumberjack.Button", content: $L("New Condition"), style: "margin-left: 10px; width: 150px; height: 40px;", ontap: "newConditionButtonTapped"},
				{name: "selectButton", kind: "lumberjack.Button", content: $L("Select"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],
	bindings: [
		{from: ".selectedVestingConditionRepeaterIndex", to: ".$.selectButton.disabled", transform: function(v){
			this.$.selectButton.addRemoveClass("primary", v !== -1);
			return (v === null || v === -1);
		}},
		{from: ".enableSearch", to: ".$.searchHeader.showing", transform: function(v) { return v; }}
	],

	show: function(searchString, companyID)
	{
		this.inherited(arguments);
		if (!companyID || companyID === "")
		{
			alertify.error("No Company ID");
			this.doCancel();
			this.hide();
			return;
		}

		if(this.get("enableSearch")){
			this.$.searchInput.set("value", searchString);
		}

		this.set("vestingConditions", null);
		this.set("selectedVestingConditionRepeaterIndex", -1);
		this.set("searchString", searchString);
		this.set("companyID", companyID);
		this.$.newConditionButton.set("showing", this.get("allowNewCondition"));
		this.$.noResultsItem.set("showing", false);
		this.$.vestingConditionRepeater.setCount(0);
		this.$.loadingPopup.show();
		this.loadVestingConditions();
	},
	loadVestingConditions: function() {
		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "searchvestingconditions",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
	    });

	    request.error(enyo.bind(this, function(request, response){
	    	this.$.loadingPopup.hide();
	    	alertify.error("Failed to load vesting conditions.");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
			this.doCancel();
			this.hide();
			return;
	    }));

	    request.response(enyo.bind(this, function(request, response){
	    	this.$.loadingPopup.hide();

	    	if (response.error) {
	    		alertify.error("Failed to load vesting conditions.");
	    		console.log(response);
					this.doCancel();
					this.hide();
					return;
	    	}

			var conditions = response.conditions;

			if (conditions.length === 0)
			{
				this.$.noResultsItem.set("showing", true);
				this.$.selectButton.set("disabled", true);
			}
			else
			{
				this.set("vestingConditions", new lumberjack.VestingEventCollection(conditions));
				this.$.vestingConditionRepeater.setCount(conditions.length);
			}

			this.$.loadingPopup.hide();
	    }));

	    request.go({companyID: this.get("companyID"), searchString: this.get("searchString")});
	},
	setupVestingConditionRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		if (inEvent.index === this.get("selectedVestingConditionRepeaterIndex"))
		{
			inEvent.item.$.vestingConditionItem.applyStyle("background-color", "lightblue");
		}
		else
		{
			inEvent.item.$.vestingConditionItem.applyStyle("background-color", "white");
		}

		inEvent.item.$.vestingConditionName.set("content", this.get("vestingConditions").at(inEvent.index).get("name"));
		inEvent.item.$.vestingDescription.set("content", this.get("vestingConditions").at(inEvent.index).get("description"));
		inEvent.item.$.vestingActive.set("content", this.get("vestingConditions").at(inEvent.index).get("active"));

		return true;
	},

	handleVestingConditionRepeaterItemTapped: function(inSender, inEvent)
	{
		var oldActiveIndex = this.get("selectedVestingConditionRepeaterIndex");
		this.set("selectedVestingConditionRepeaterIndex", inEvent.index);
		if (oldActiveIndex !== -1) { this.$.vestingConditionRepeater.renderRow(oldActiveIndex); }
		this.$.vestingConditionRepeater.renderRow(inEvent.index);
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		this.hide();
		this.doConditionSelected({condition: this.get("vestingConditions").at(this.get("selectedVestingConditionRepeaterIndex"))});
	},

	searchButtonTapped: function(inSender, inEvent){
		if(!this.get("enableSearch")){
			this.doCancel();
			this.hide();
			return;
		}

		this.set("searchString", this.$.searchInput.get("value"));
		this.set("vestingConditions", null);
		this.set("selectedVestingConditionRepeaterIndex", -1);
		this.$.noResultsItem.set("showing", false);
		this.$.vestingConditionRepeater.setCount(0);
		this.$.loadingPopup.show();
		this.loadVestingConditions();
	},

	newConditionButtonTapped: function(inSender, inEvent)
	{
		this.hide();
		this.doCreateNewCondition();
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
	},

	handleSearchKeys: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.searchButtonTapped();
		}
		if(inEvent.keyCode === 27)
		{
			this.hide();
		}
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
	}
});