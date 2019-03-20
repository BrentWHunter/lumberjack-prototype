/* global quantum,PouchDB,alertify,console */

enyo.kind({
	name: "quantum.ReservationView",
	kind: "FittableRows",
	fit: true,

	handlers: {
		onGoHome: "handleGoHome"
	},

	events: {
		onChangeCompany: "",
		onRequestChangeModule: "",
		onLogout: ""
	},

	published: {
		database: null,
		loadingData: false,
		reservationCollection: null,
		selectedPlacement: null,
		placements: null,
		salespeople: null,
		targetReservation: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
		changesFeed: null
	},

	components:[
		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", style: "background: black; border: 1px solid black; padding: 0px 0px;", noStretch: true, components: [
			{name: "leftButton", kind: "onyx.MenuDecorator", style: "margin: 0 10px 0 0; padding: 10px;", classes: "breadcrumb modules-breadcrumb", ontap: "buttonfix", components: [
				{kind: "onyx.IconButton", src: "assets/icons/modules-button-icon.png"},
				{name: "leftMenu", kind: "quantum.IconMenu", onChangeModule: "handleChangeModule"}
			]},
			{kind: "enyo.Image", style: "height: 40px;", src: "assets/logo.png"},
			{name: "companyName", style: "color: white; margin-left: 15px; font-size: 24px; font-family: Tahoma, sans-serif;"},
			{fit: true},
			{name: "placementDatabasePickerDecorator", kind: "onyx.PickerDecorator", showing: false, components: [
				{name: "placementDatabasePickerButton", style: "width: 450px;"},
				{name: "placementDatabasePicker", kind: "onyx.Picker", onChange: "handlePlacementDatabasePickerChanged"}
			]},
			{name: "editEntryButton", style: "margin: 0; padding: 10px;", classes: "breadcrumb", showing: false , ontap: "editEntryButtonTapped", components: [
				{kind: "onyx.IconButton", src: "assets/icons/list-button-icon.png"}
			]},
			{name:"rightButton", kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", ontap: "buttonfix", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{name: "rightMenu", kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "quantum.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Reservations Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "quantum.ReservationDashboardPanel", onViewItemDetail: "handleViewItemDetail"},
			{name: "detailPanel", kind: "quantum.ReservationDetailPanel", onGoBack: "handleGoBack"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		//Dashboard Panel
		{from: ".database", to: ".$.dashboardPanel.database"},
		{from: ".reservationCollection", to: ".$.dashboardPanel.reservationCollection"},
		{from: ".placements", to: ".$.dashboardPanel.placements"},
		{from: ".salespeople", to: ".$.dashboardPanel.salespeople"},
		{from: ".selectedPlacement", to: ".$.dashboardPanel.selectedPlacement"},

		//Detail Panel
		{from: ".database", to: ".$.detailPanel.database"},
		{from: ".salespeople", to: ".$.detailPanel.salespeople"},
		{from: ".placements", to: ".$.detailPanel.placements"},
		{from: ".salespeople", to: ".$.detailPanel.salespeople"},
		{from: ".selectedPlacement", to: ".$.detailPanel.selectedPlacement"}
	],

	buttonfix: function(inSender, inEvent)
	{
		if(inEvent.originator.name === "leftButton")
		{
			this.$.leftMenu.show();
		}
		else if(inEvent.originator.name === "rightButton")
		{
			this.$.rightMenu.show();
		}
	},

	setShowingForRoles: function()
	{
		//Nothing to hide here
	},

	rendered: function(inSender, inEvent)
	{
		this.set("showing", false);
		this.set("database", new PouchDB(quantum.preferences.get("server") + quantum.preferences.get("reservationDatabase"), {skip_setup: true}));
		this.$.versionString.set("content", quantum.versionString);
		this.$.companyName.set("content", quantum.preferences.get("companyName"));
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
		this.inherited(arguments);
		quantum.fixShim();
		this.$.loadingPopup.show();
		this.populateReservations(enyo.bind(this, function(){
			this.setShowingForRoles();
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
			quantum.preferences.set("lastModule", "reservation");
			quantum.preferences.commit();
			if (this.get("targetReservation"))
			{
				var filteredCollection = this.get("reservationCollection").filter(enyo.bind(this, function(value, index, array){
					return value.get("_id") === this.get("targetReservation");
				}));

				filteredCollection = new enyo.Collection(filteredCollection);

				if (filteredCollection && filteredCollection.length > 0)
				{
					this.handleViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
				}
			}
		}));
	},

	navigateAway: function(inSender, inEvent, callback)
	{
		if (this.$.saveChangesPopup)
		{
			this.$.saveChangesPopup.hide();
			this.$.saveChangesPopup.destroy();
		}
		var _panel = this.$.dataPanels.getActive();
		if (_panel === this.$.detailPanel)
		{
			if (_panel.canEdit() && _panel.isDirty())
			{
				this.createComponent({name: "saveChangesPopup", kind: "quantum.ConfirmPopup", onYesWithReturnValue: "executeReturnValue_yes", onNoWithReturnValue: "executeReturnValue_no", onHide: "handlePopupHidden"}, {owner:this});
				this.$.saveChangesPopup.show("Save changes?", {
					yes: function() { _panel.handleSaveEntryButtonTapped(inSender, inEvent, {callback:callback}); },
					no: callback
				});
			}
			else { callback(inSender, inEvent); }
		}
		else { callback(inSender, inEvent); }
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	executeReturnValue_yes: function(inSender, inEvent)
	{
		inEvent.returnValue.yes();
	},

	executeReturnValue_no: function(inSender, inEvent)
	{
		inEvent.returnValue.no();
	},

	dashboardButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "reservation")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel"));
			this.$.dashboardPanel.activate();
		}));
	},

	clearBreadcrumbs: function(index)
	{
		for (var i = index; i < this.$.breadcrumbToolbar.controls.length; i){
			this.$.breadcrumbToolbar.controls[i].destroy();
		}
		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", true);
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doChangeCompany({allowCancel: true});
		}));
	},

	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "reservation")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "reservationDetail", icon: "assets/icons/reservation-detail-icon.png", content: "Reservation Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.detailPanel.set("reservationCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("detailPanel"));
		this.$.detailPanel.activate(inEvent.item);
	},

	handleChangeModule: function(inSender, inEvent)
	{
		//If we're trying to reload the same module, just go back to the dashboard. Otherwise, let the event continue bubbling up so that we can change views.
		if (inEvent.target === "reservation")
		{
			this.dashboardButtonTapped();
			return true;
		}
	},

	handleGoBack: function(inSender, inEvent)
	{
		var breadcrumb = this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 2];
		var breadcrumbType = breadcrumb.get("type");

		switch(breadcrumbType)
		{
			case "dashboard":
				this.dashboardButtonTapped();
				break;
			default:
				this.dashboardButtonTapped();
		}
	},

	handleGoHome: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "reservation"))
		{
			quantum.preferences.set("lastModule", "");
			quantum.preferences.commit();
			this.doRequestChangeModule();
		}
		else
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel"));
			this.$.dashboardPanel.activate();
		}
	},

	handleLogout: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doLogout();
		}));
	},

	handlePlacementDatabasePickerChanged: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.$.placementDatabasePickerButton.set("content", inEvent.content);

			if (!this.get("loadingData")){
				this.set("selectedPlacement", inEvent.selected.database);
			}
		}));

		return true;
	},

	populateReservations: function(callback)
	{
		this.set("reservationCollection", null);

		//Get data from database and load it into collection
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				callback();
				return;
			}

			quantum.preferences.set("roles", response.roles);

			this.set("loadingData", true);
			this.$.placementDatabasePicker.set("selected", null);
			this.$.placementDatabasePicker.destroyClientControls();

			var request = new enyo.Ajax({
				url: quantum.preferences.get("apiServer") + "getreservations",
				cacheBust: false,
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				}
		    });

		    request.error(enyo.bind(this, function(request, response){
		    	alertify.error("Failed to load reservations");
				console.log(request);
				if(response === 401){
					this.doLogout();
					return;
				}
				callback();
				return;
		    }));

		    request.response(enyo.bind(this, function(request, response){
				if (response.error)
				{
					alertify.error("Failed to load reservations");
					console.log(request);
					callback();
					return;
				}

				this.set("placements", response.placements);
				this.set("salespeople", response.salespeople);

				if (Object.keys(response.placements).length > 1)
				{
					var placements = [];

					for (var i = 0; i < Object.keys(response.placements).length; i++)
					{
						placements.push({database: Object.keys(response.placements)[i], content: response.placements[Object.keys(response.placements)[i]].placementName});
					}

					var sortByDisplayNameFunction = function(a,b){
						if(a.content.toLowerCase() < b.content.toLowerCase()) {return -1;}
						if(a.content.toLowerCase() > b.content.toLowerCase()) {return 1;}
						return 0;
					};

					placements.sort(sortByDisplayNameFunction);

					//Need to do a second pass on this because we need to determine active after sort (and if)
					if (quantum.preferences.get("placementDatabase"))
					{
						placements.forEach(function(value, index, array){
							if (value.database === quantum.preferences.get("placementDatabase"))
							{
								value.active = true;
							}
						});
					}
					else
					{
						placements[0].active = true;
					}

					this.$.placementDatabasePicker.createComponents(placements, {owner: this});

                    this.$.placementDatabasePickerDecorator.set("showing", true);
				}
				else
				{
					this.$.placementDatabasePickerDecorator.set("showing", false);
				}

				this.set("loadingData", false);

				var sortedDocs = response.reservations.sort(function(a,b){
					if(a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
				    if(a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
				    return 0;
				});
				
				this.set("reservationCollection", new enyo.Collection(sortedDocs));
				this.set("selectedPlacement", quantum.preferences.get("placementDatabase") ? quantum.preferences.get("placementDatabase") : Object.keys(response.placements)[0]); //Cheat.

				quantum.preferences.commit();
				callback();

				this.updateChangesFeed();
		    }));

		    request.go({companyID: quantum.preferences.get("company")});
		}));
	},

	updateChangesFeed: function()
	{
		if (this.get("changesFeed"))
		{
			if (this.get("changesFeed").close)
			{
				this.get("changesFeed").close();
			}

			this.set("changesFeed", null);
		}

		var sortByDisplayNameFunction = function(a,b){
			if(a.get("name").toLowerCase() < b.get("name").toLowerCase()) {return -1;}
			if(a.get("name").toLowerCase() > b.get("name").toLowerCase()) {return 1;}
			return 0;
		};

		this.set("changesFeed", io(quantum.preferences.get("apiServer"), {
			query: {
				username: quantum.preferences.get("username"),
				password: quantum.preferences.get("password"),
				target: quantum.preferences.get("reservationDatabase")
			}
		}));

		this.get("changesFeed").on('change', enyo.bind(this, function (change) {
			var findResult = this.get("reservationCollection").find(enyo.bind(this, function(value, index, array){
				return value.attributes._id === change.doc._id;
			}));

			// check for deleted records
			if (change.deleted) {
				if (findResult) {
					if (this.$.dataPanels.getActive() === this.$.detailPanel && findResult === this.$.detailPanel.get("activeEntry")){
						findResult.destroy();
						this.get("reservationCollection").sort(sortByDisplayNameFunction);

						alertify.error("Entry Deleted From Another Terminal.");
						if (this.$.breadcrumbToolbar.controls.length - 2 > 0)
						{
							//Cheat a little bit. Trigger the ontap event for the breadcrumb prior to the active tab.
							this[this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 2].ontap](this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1], {});
						}
						else
						{
							//If something goes wrong, just go back to the dashboard.
							this.dashboardButtonTapped();
						}
					}
					else {
						//No need to alert if it is not the active entry that the user is working on.
						findResult.destroy();
						this.get("reservationCollection").sort(sortByDisplayNameFunction);
						this.$.dashboardPanel.filterReservations();
					}
				}
			// check for updates
		  	} else if (findResult && findResult.attributes._rev !== change.doc._rev){
				//Destroy the existing model, replace it, and update the collection.
				findResult.destroy();
				var newModel = this.get("reservationCollection").add(new reservationModel(change.doc))[0];
				this.get("reservationCollection").sort(sortByDisplayNameFunction);

				//Always call activate on the dashboard panel so that we always force re-filtering.
				this.$.dashboardPanel.filterReservations();

				if (this.$.dataPanels.getActive() === this.$.detailPanel) {
					if (this.$.detailPanel.get("activeEntry").get("_id") === findResult.get("_id"))
					{
						alertify.success("Entry Updated");
						//Make sure that we also update the filtered collection so that the forward and back buttons work.
						this.$.detailPanel.set("reservationCollection", this.$.dashboardPanel.get("filteredReservationCollection"));
						this.$.detailPanel.activate(newModel);
					}
				}

				
			// check for new records
	  	  	} else if (change && change.doc._deleted !== true && findResult === undefined){
				if (change.doc._id.indexOf("_design") !== -1) {
					//Do nothing - just ignore it.
				}
				else
				{
					this.get("reservationCollection").add(change.doc);
					this.get("reservationCollection").sort(sortByDisplayNameFunction);
				}

				if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
					alertify.success("Entry Added");
					this.$.dashboardPanel.filterReservations();
				}
			} else {
				//console.log("change didn't trigger");
			}
		}));

		this.get("changesFeed").on('error', enyo.bind(this, function (err) {
			console.log("Changes feed error", err);
		}));
	}
});