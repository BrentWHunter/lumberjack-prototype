enyo.kind({
	name: "quantum.SelectArchivedPlacementPopup",
	kind: "quantum.Popup",

	events: {
		onPlacementSelected: "",
		onCancel: "",
		onLogout: ""
	},

	published: {
		placements: null,
		rawPlacements: null,
		selectedPlacementRepeaterIndex: -1
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Select Archived Placement"}
			]},
			{name: "placementsScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 800px; height: 600px; background-color: #EEEEEE;", components: [
				{name: "placementsRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 275px;", onSetupItem: "setupPlacementRepeaterItem", components: [
					{name: "divider", style: "color: white; background-color: #333333; padding: 5px;"},
					{name: "placementItem", style: "background-color: white; border-bottom: 1px solid black; padding: 10px;", selected: false, ontap: "handlePlacementRepeaterItemTapped", components: [
						{name: "placementName", style: "color: black; font-size: 18px; font-weight: bold;"}
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "selectButton", kind: "quantum.Button", content: $L("Select"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".selectedPlacementRepeaterIndex", to: ".$.selectButton.disabled", transform: function(v){
			this.$.selectButton.addRemoveClass("primary", v !== -1);
			return v === -1;
		}}
	],

	show: function()
	{
		this.inherited(arguments);
		this.$.loadingPopup.show();
		this.set("placements", null);
		this.set("rawPlacements", null);
		this.set("selectedPlacementRepeaterIndex", -1);
		this.$.placementsRepeater.setCount(0);
		this.loadPlacements();
	},

	loadPlacements: function() {
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getplacements",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
	    });

	    request.error(enyo.bind(this, function(request, response){
	    	this.$.loadingPopup.hide();
	    	alertify.error("Failed to load placements");
			console.log(request);
			if(response == 401){
				this.doLogout();
				return;
			}
			this.doCancel();
			this.hide();
			return;
	    }));

	    request.response(enyo.bind(this, function(request, response){
	    	this.$.loadingPopup.hide();
	    	this.set("rawPlacements", response.placements);

			if (response.placements.length > 1)
			{
				var placements = [];

				for (var i = 0; i < response.placements.length; i++)
				{
					if (response.placements[i].status === "archived" || response.placements[i].status === "cancelled")
					{
						placements.push(response.placements[i]);
					}
				}

				if (placements.length === 0)
				{
					alertify.error("No Archived Placements");
					this.doCancel({placements: this.get("rawPlacements")});
					this.hide();
					return true;
				}

				placements.sort(function(a, b){
					if (a.companyDisplayName > b.companyDisplayName) {return 1;}
					if (a.companyDisplayName < b.companyDisplayName) {return -1;}
					if (a.companyDisplayName === b.companyDisplayName) {return 0;}
				});

				this.set("placements", placements);
				this.$.placementsRepeater.setCount(placements.length);
			}
			else
			{
				alertify.error("Failed to load placements");
				this.doCancel({placements: this.get("rawPlacements")});
				this.hide();
			}
	    }));

	    request.go({username: quantum.preferences.get("username"), password: quantum.preferences.get("password"), company: quantum.preferences.get("company")});
	},

	setupPlacementRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var curr = this.get("placements")[inEvent.index].companyDisplayName;
		var prev = inEvent.index > 0 ? this.get("placements")[inEvent.index - 1].companyDisplayName : null;
		inEvent.item.$.divider.canGenerate = curr !== prev;
		delete curr, prev;
		if (inEvent.item.$.divider.canGenerate)
		{
			inEvent.item.$.divider.set("content", this.get("placements")[inEvent.index].companyDisplayName);
		}

		if (inEvent.index === this.get("selectedPlacementRepeaterIndex"))
		{
			inEvent.item.$.placementItem.applyStyle("background-color", "lightblue");
		}
		else
		{
			inEvent.item.$.placementItem.applyStyle("background-color", "white");
		}

		inEvent.item.$.placementName.set("content", this.get("placements")[inEvent.index].name + (this.get("placements")[inEvent.index].status === "cancelled" ? " (Cancelled)" : ""));

		return true;
	},

	handlePlacementRepeaterItemTapped: function(inSender, inEvent)
	{
		var oldActiveIndex = this.get("selectedPlacementRepeaterIndex");
		this.set("selectedPlacementRepeaterIndex", inEvent.index);
		if (oldActiveIndex !== -1) { this.$.placementsRepeater.renderRow(oldActiveIndex); }
		this.$.placementsRepeater.renderRow(inEvent.index);
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		this.hide();
		this.doPlacementSelected({database: this.get("placements")[this.get("selectedPlacementRepeaterIndex")].database});
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel({placements: this.get("rawPlacements")});
		this.hide();
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