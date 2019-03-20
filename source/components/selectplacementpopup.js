enyo.kind({
	name: "quantum.SelectPlacementPopup",
	kind: "quantum.Popup",
	_loaded: false,

	events: {
		onPlacementSelected: "",
		onArchivedPlacementSelected: "",
		onCancel: "",
		onError: "",
		onLogout: ""
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Select Placement"}
			]},
			{name: "placementDatabasePickerDecorator", kind: "onyx.PickerDecorator", style: "margin-top: 15px;", components: [
				{name: "placementDatabasePickerButton", style: "width: 450px;"},
				{name: "placementDatabasePicker", kind: "onyx.Picker"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "selectButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Select"), style: "width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]}
	],

	show: function()
	{
		if (this._loaded)
		{
			this.inherited(arguments);
		}
		else
		{
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
			this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
			this.$.loadingPopup.show($L("Loading..."));

			this.loadPlacements(enyo.bind(this, function(placements){
				this.$.placementDatabasePicker.set("selected", null);
				this.$.placementDatabasePicker.destroyClientControls();
				var placementItems = [];
				var archivedPlacements = false;
				var activeItemSet = false;

				//If the company has no placements, the for loop will typeError
				if(!placements)
				{
					alertify.error("Company Has No Placements");
					this.doError();
					this.hide();
					return;
				}

				for (var i = 0; i < placements.length; i++)
				{
					if (placements[i].status === "archived" || placements[i].status === "cancelled")
					{
						archivedPlacements = true;
					}
					else
					{
						placementItems.push({database: placements[i].database, content: placements[i].name, active: activeItemSet === false});
						activeItemSet = true;
					}
				}

				if (placementItems.length > 0 && archivedPlacements)
				{
					placementItems.push({name: "archivePlacementsPickerItem", content: "Archived Placements..."});
				}
				else if (placementItems.length === 0)
				{
					this.doArchivedPlacementSelected();
					this.hide();
					return;
				}

				this.$.placementDatabasePicker.createComponents(placementItems, {owner: this});
				this._loaded = true;
				this.show();
			}));
		}
	},

	loadPlacements: function(callback)
	{
		if (this.$.loadingPopup) {this.$.loadingPopup.hide();}
		if (this.$.loadingPopup) {this.$.loadingPopup.destroy();}
		this.createComponent({
			name: "loadingPopup",
			kind: "quantum.LoadingPopup",
			onHide: "handlePopupHidden"},
		{owner:this});

		this.$.loadingPopup.show("Loading Placements");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getplacements",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			alertify.error("Failed to load placements");
			console.log(request);
			if(response == 401){
				this.doLogout();
				return;
			}
			this.doCancel();
			this.hide();
			return true;
		}));

		request.response(enyo.bind(this, function(request, response){
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }

			callback(response.placements);
		}));

		request.go({company: quantum.preferences.get("company")});
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		if (this.$.placementDatabasePicker.get("selected") === this.$.archivePlacementsPickerItem)
		{
			this.doArchivedPlacementSelected();
		}
		else
		{
			this.doPlacementSelected({placement: this.$.placementDatabasePicker.get("selected").database});
		}

		return true;
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