/* global quantum,PouchDB,alertify,Papa,saveAs,console */

enyo.kind({
	name: "quantum.PlacementView",
	kind: "FittableRows",
	fit: true,
	_reportWindow: null,

	handlers: {
		onGoHome: "handleGoHome"
	},

	events: {
		onChangeCompany: "",
		onSetViewToReport: "",
		onRequestChangeModule: "",
		onLogout: ""
	},

	published: {
		database: null,
		loadingData: false,
		subscriptionCollection: null,
		unassignedPayments: null,
		localChange: null,
		targetPlacement: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
		targetSubscriber: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
		changesFeed: null,
		salespeople: null
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
			{name: "placementName", style: "color: white; font-size: 18px; font-family: Tahoma, sans-serif;"},
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
					{content: "Placement Info", onSelect: "placementInformationMenuItemTapped", showing: false, name: "placementInfoMenuItem"},
					{content: "Placement Status", onSelect: "closePlacementMenuItemTapped", showing: false, name: "closePlacementMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Refresh Subscriptions", onSelect: "refreshSubscriptionsMenuItemTapped", showing: false, name: "refreshSubscriptionsMenuItem"},
					{content: "Migrate Subscriptions", onSelect: "migrateSubscriptionsMenuItemTapped", showing: false, name: "migrateSubscriptionsMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Generate Report", onSelect: "generateReportButtonTapped", showing: false, name: "generateReportMenuItem"},
					{content: "Generate Payment Report", onSelect: "generatePaymentReportButtonTapped", showing: false, name: "generatePaymentReportMenuItem"},
					{content: "Export CSV File", onSelect: "exportCSVFileMenuItemTapped", showing: false, name: "exportCsvMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "quantum.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Placements Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "quantum.DashboardPanel", onViewItemDetail: "handleViewItemDetail", onRefreshUnassignedPayments: "handleRefreshUnassignedPayments"},
			//{name: "addPanel", kind: "quantum.SubscriberDetailPanel", mode: "add", onGoBack: "handleGoBack"},
			{name: "listPanel", kind: "quantum.SubscriberListPanel", onViewItemDetail: "handleViewItemDetail", onAddNewSubscription: "addEntryButtonTapped"},
			{name: "detailPanel", kind: "quantum.SubscriberDetailPanel", onGoBack: "handleGoBack"},
			{name: "closePlacementPanel", kind: "quantum.ClosePlacementPanel", onRequestGenerateCSVFile: "generateCSVFile"},
			{name: "csvExportPanel", kind: "quantum.CSVExportPanel", onRequestGenerateCSVFile: "generateCSVFile"},
			{name: "migrateSubscriptionsPanel", kind: "quantum.MigrateSubscriptionsPanel"},
			{name: "placementInfoPanel", kind: "quantum.PlacementInfoPanel"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "archivedPlacementsPopup", kind: "quantum.SelectArchivedPlacementPopup", onPlacementSelected: "handleArchivedPlacementSelected", onCancel: "handleArchivedPlacementCancelled"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		//Add Panel
		// {from: ".database", to: ".$.addPanel.database"},
		// {from: ".subscriptionCollection", to: ".$.addPanel.subscriptionCollection"},

		//Dashboard Panel
		{from: ".database", to: ".$.dashboardPanel.database"},
		{from: ".subscriptionCollection", to: ".$.dashboardPanel.subscriptionCollection"},
		{from: ".unassignedPayments", to: ".$.dashboardPanel.unassignedPayments"},
		{from: ".salespeople", to: ".$.dashboardPanel.salespeople"},

		//List Panel
		{from: ".subscriptionCollection", to: ".$.listPanel.subscriptionCollection"},
		{from: ".salespeople", to: ".$.listPanel.salespeople"},

		//Detail Panel
		{from: ".database", to: ".$.detailPanel.database"},
		{from: ".salespeople", to: ".$.detailPanel.salespeople"},
		//{from: ".subscriptionCollection", to: ".$.detailPanel.subscriptionCollection"}

		//Close Placement Panel
		{from: ".database", to: ".$.closePlacementPanel.database"},
		{from: ".subscriptionCollection", to: ".$.closePlacementPanel.subscriptionCollection"},

		//Generate Spreadsheet Panel
		{from: ".subscriptionCollection", to: ".$.csvExportPanel.subscriptionCollection"},

		//Migrate Panel
		{from: ".subscriptionCollection", to: ".$.migrateSubscriptionsPanel.subscriptionCollection"},

		//Placement Info Panel
		{from: ".database", to: ".$.placementInfoPanel.database"}
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
		this.$.editEntryButton.set("showing", quantum.hasRole(["admins","users","auditors"], "placement"));
		this.$.placementInfoMenuItem.set("showing", quantum.hasRole(["admins"], "placement"));
		this.$.generateReportMenuItem.set("showing", quantum.hasRole(["admins", "users", "auditors"], "placement"));
		this.$.generatePaymentReportMenuItem.set("showing", quantum.hasRole(["admins", "users", "auditors"], "placement"));
		this.$.migrateSubscriptionsMenuItem.set("showing", quantum.hasRole(["admins"], "placement"));
		this.$.exportCsvMenuItem.set("showing", quantum.hasRole(["admins"], "placement"));
		this.$.closePlacementMenuItem.set("showing", quantum.hasRole(["admins"], "placement"));
		this.$.refreshSubscriptionsMenuItem.set("showing", quantum.hasRole(["admins","users"], "placement"));
	},

	rendered: function(inSender, inEvent)
	{
		if(!quantum.preferences.get("placementDatabase") && !this.get("targetPlacement")){
			this.set("showing", false);
			if (this.$.selectPlacementPopup) {this.$.selectPlacementPopup.hide();}
			if (this.$.selectPlacementPopup) {this.$.selectPlacementPopup.destroy();}
			this.createComponent({
				name: "selectPlacementPopup",
				kind: "quantum.SelectPlacementPopup",
				onError: "handleSelectPlacementError",
				onPlacementSelected: "handlePlacementSelected",
				onArchivedPlacementSelected: "handleShowArchivedPlacementsPopup",
				onHide: "handlePopupHidden"},
			{owner:this});

			this.inherited(arguments);
			this.$.selectPlacementPopup.show();
		}
		else
		{
			this.set("showing", false);
			this.set("database", new PouchDB(quantum.preferences.get("server") + (this.get("targetPlacement") || quantum.preferences.get("placementDatabase")), {skip_setup: true}));
			this.$.versionString.set("content", quantum.versionString);
			this.$.companyName.set("content", quantum.preferences.get("companyName"));
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
			this.inherited(arguments);
			quantum.fixShim();
			this.$.loadingPopup.show();
			this.populateSubscriptions(enyo.bind(this, function(){
				this.populateSalespeople(enyo.bind(this, function(){
					quantum.preferences.set("lastModule", "placement");
					quantum.preferences.commit();
					if (quantum.hasRole(["reporting"], "placement"))
					{
						this.doSetViewToReport();
					}
					else
					{
						this.setShowingForRoles();
						this.set("showing", true);
						this.$.loadingPopup.hide();
						this.dashboardButtonTapped();
						this.resize();
						if (this.get("targetSubscriber"))
						{
							var filteredCollection = this.get("subscriptionCollection").filter(enyo.bind(this, function(value, index, array){
								return value.get("_id") === this.get("targetSubscriber");
							}));

							filteredCollection = new quantum.SubscriptionCollection(filteredCollection);

							if (filteredCollection && filteredCollection.length > 0)
							{
								this.handleViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
							}
						}
					}
				}));
			}));
		}
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
		else if (_panel === this.$.placementInfoPanel)
		{
			if (quantum.hasRole(["admins"], "placement") && _panel.isDirty())
			{
				this.createComponent({name: "saveChangesPopup", kind: "quantum.ConfirmPopup", onYesWithReturnValue: "executeReturnValue_yes", onNoWithReturnValue: "executeReturnValue_no", onHide: "handlePopupHidden"}, {owner:this});
				this.$.saveChangesPopup.show("Save changes?", {
					yes: function() { _panel.handleSavePlacementButtonTapped(inSender, inEvent, {callback:callback}); },
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

	// addEntryButtonTapped: function(inSender, inEvent)
	// {
	// 	if (!quantum.hasRole(["admins","users"], "placement")) { return; }

	// 	for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
	// 	{
	// 		if (this.$.breadcrumbToolbar.controls[i].type === "subscriberDetail" ||
	// 			this.$.breadcrumbToolbar.controls[i].type === "closePlacement" ||
	// 			this.$.breadcrumbToolbar.controls[i].type === "addSubscriber")
	// 		{
	// 			this.clearBreadcrumbs(i);
	// 			break;
	// 		}
	// 	}

	// 	this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
	// 	this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "addSubscriber", icon: "assets/icons/add-subscriber-icon.png", content: "Add Subscriber", ontap: "addSubscriptionBreadcrumbTapped", last: true}, {owner: this});
	// 	this.$.breadcrumbToolbar.render();
	// 	this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("addPanel"));
	// 	this.$.addPanel.activate(new quantum.SubscriptionModel({}));
	// },

	// addSubscriptionBreadcrumbTapped: function(inSender, inEvent)
	// {
	// 	this.navigateAway(inSender, inEvent, enyo.bind(this, function()
	// 	{
	// 		this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
	// 		this.addEntryButtonTapped(inSender, inEvent);
	// 	}));
	// },

	dashboardButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "placement")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel"));
			this.$.dashboardPanel.activate();
		}));
	},

	editEntryButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "placement")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
			{
				if (
					this.$.breadcrumbToolbar.controls[i].type === "subscriberDetail" ||
					this.$.breadcrumbToolbar.controls[i].type === "subscriptions" ||
					this.$.breadcrumbToolbar.controls[i].type === "closePlacement" /*||
					this.$.breadcrumbToolbar.controls[i].type === "addSubscriber"*/
				){
					this.clearBreadcrumbs(i);
					break;
				}
			}
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "subscriptions", icon: "assets/icons/list-icon.png", content: "Subscriptions", ontap: "subscriptionsBreadcrumbTapped", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}));
	},

	subscriptionsBreadcrumbTapped: function(inSender, inEvent)
	{
		//this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
		this.editEntryButtonTapped(inSender, inEvent);
	},

	clearBreadcrumbs: function(index)
	{
		for (var i = index; i < this.$.breadcrumbToolbar.controls.length; i){
			this.$.breadcrumbToolbar.controls[i].destroy();
		}
		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", true);
	},

	generatePaymentReportButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins", "auditors", "users"], "placement")) { return; }

		var csvCollection = [];

		this.get("subscriptionCollection").forEach(function(value, index, array){
			value.get("paymentsReceived").forEach(function(innerValue, innerIndex, innerArray){
				csvCollection.push({
					receivedDate: innerValue.receivedDate,
					payerName: innerValue.payerName,
					paymentType: quantum.paymentTypeLookup(innerValue.paymentType),
					paymentAmount: innerValue.amount,
					subscriberName: value.get("contactInfo").subscriberName,
					contactPerson: value.get("contactInfo").corporateInfo.contactPerson,
					subscriptionAmount: value.get("subscriptionInfo").subscriberDollarAmount,
					totalFundsReceived: value.get("subscriptionInfo").fundsReceived,
					subsciptionStatus: quantum.subscriptionStatusLookup(value.get("subscriptionInfo").subscriptionStatus)
				});
			});
		});

		//Next, sort.
		csvCollection.sort(function(a, b){
			return a.receivedDate - b.receivedDate;
		});

		//Then, make the date human-readable
		csvCollection.forEach(function(value, index, array){
			value.receivedDate = moment(value.receivedDate).format("YYYY/MM/DD");
		});

		//finally, parse the collection to CSV
		var csv = Papa.unparse(csvCollection);
		var output = new Blob([csv], {type: "text/csv"});
		saveAs(new Blob([csv], {type: "text/csv"}), moment().format("YYYY-MM-DD") + " " + quantum.preferences.get("placementInfo").placementName + " Payment Report.csv");
	},

	generateReportButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins", "auditors", "users"], "placement")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			if (this._reportWindow)
			{
				this._reportWindow.close();
			}
			this._reportWindow = window.open("index.html?report=1", "height=700px,width=1366px,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
		}));
	},

	closePlacementBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.handleLaunchClosePlacement(inSender, inEvent);
		}));
	},

	closePlacementMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.handleLaunchClosePlacement(inSender, inEvent);
		}));
	},

	refreshSubscriptionsMenuItemTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Refreshing. This may take a while...");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "refreshallsubscriptionagreementstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();
			alertify.error("Failed to refresh subscriptions");
			console.log(request);
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to refresh subscriptions");
				console.log(response);
			}
			else
			{
				alertify.success("Subscription refresh complete!");
			}
		}));

		request.go({placementID: quantum.preferences.get("placementDatabase")});
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doChangeCompany({allowCancel: true});
		}));
	},

	handleSelectPlacementError: function(inSender, inEvent)
	{
		quantum.preferences.set("lastModule", "");
		this.doRequestChangeModule();
	},

	handleLaunchClosePlacement: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "closePlacement", icon: "assets/icons/close-placement-icon.png", content: "Placement Status", ontap: "closePlacementBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("closePlacementPanel"));
		this.$.closePlacementPanel.activate();
	},

	handlePlacementSelected: function(inSender, inEvent)
	{
		this.$.selectPlacementPopup.hide();
		quantum.preferences.set("placementDatabase", inEvent.placement);
		quantum.preferences.commit({success: enyo.bind(this, function(){
			//Slight pause here to give the UI time to refresh
			setTimeout(enyo.bind(this, function(){this.render();}), 50);
		})});
	},

	handleShowArchivedPlacementsPopup: function(inSender, inEvent)
	{
		this.$.archivedPlacementsPopup.show();
		if (this.$.selectPlacementPopup) {this.$.selectPlacementPopup.hide();} //Hide second to avoid a white flash.
		if (this.$.selectPlacementPopup) {this.$.selectPlacementPopup.destroy();}
	},

	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "placement")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "subscriberDetail", icon: "assets/icons/subscriber-detail-icon.png", content: "Subscriber Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.detailPanel.set("subscriptionCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("detailPanel"));
		this.$.detailPanel.activate(inEvent.item);
	},

	exportCSVFileButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "generateCSVFile", icon: "assets/icons/csv-export-icon.png", content: "Export CSV File", ontap: "exportCSVFileBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("csvExportPanel"));
		this.$.csvExportPanel.activate();
	},

	exportCSVFileBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.exportCSVFileButtonTapped(inSender, inEvent);
		}));
	},

	exportCSVFileMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.exportCSVFileButtonTapped(inSender, inEvent);
		}));
	},

	migrateSubscriptionsButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "migrateSubscriptions", icon: "assets/icons/migrate-subscriptions-icon.png", content: "Migrate Subscriptions", ontap: "migrateSubscriptionsBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("migrateSubscriptionsPanel"));
		this.$.migrateSubscriptionsPanel.activate();
	},

	migrateSubscriptionsBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.migrateSubscriptionsButtonTapped(inSender, inEvent);
		}));
	},

	migrateSubscriptionsMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.migrateSubscriptionsButtonTapped(inSender, inEvent);
		}));
	},

	placementInformationButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "placementInformation", icon: "assets/icons/information-icon.png", content: "Placement Information", ontap: "placementInformationBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("placementInfoPanel"));
		this.$.placementInfoPanel.activate();
	},

	placementInformationBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.placementInformationButtonTapped(inSender, inEvent);
		}));
	},

	placementInformationMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.placementInformationButtonTapped(inSender, inEvent);
		}));
	},

	handleChangeModule: function(inSender, inEvent)
	{
		//If we're trying to reload the same module, just go back to the dashboard. Otherwise, let the event continue bubbling up so that we can change views.
		if (inEvent.target === "placement")
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
			// case "addSubscriber":
			// 	this.addSubscriptionBreadcrumbTapped(breadcrumb, inEvent);
			// 	break;
			case "subscriptions":
				this.subscriptionsBreadcrumbTapped(breadcrumb, inEvent);
				break;
			default:
				this.dashboardButtonTapped();
		}
	},

	handleGoHome: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "placement"))
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
				if (inEvent.selected === this.$.archivePlacementsPickerItem)
				{
					this.$.archivedPlacementsPopup.show();
				}
				else
				{
					quantum.preferences.set("placementDatabase", inEvent.selected.database);
					quantum.preferences.commit({success: enyo.bind(this, function(){
						//Slight pause here to give the UI time to refresh
						setTimeout(enyo.bind(this, function(){this.render();}), 50);
					})});
				}
			}
		}));

		return true;
	},

	handleArchivedPlacementSelected: function(inSender, inEvent)
	{
		quantum.preferences.set("placementDatabase", inEvent.database);
		quantum.preferences.commit({success: enyo.bind(this, function(){
			//Slight pause here to give the UI time to refresh
			setTimeout(enyo.bind(this, function(){this.render();}), 50);
		})});
	},

	handleArchivedPlacementCancelled: function(inSender, inEvent)
	{
		if(!quantum.preferences.get("placementDatabase") && !this.get("targetPlacement")){
			//If we don't have a placement database at this point. Just re-render. It will force a proper re-pick of the database.
			this.render();
		}
		else
		{
			var activePlacement = null;
			this.$.placementDatabasePicker.controls.forEach(enyo.bind(this, function(value, index, array){
				if (value.database && (value.database === quantum.preferences.get("placementDatabase") || value.database === this.get("targetPlacement"))){
					activePlacement = value;
				}
			}));

			//Workaround to stop the db from reloading
			this.set("loadingData", true);
			if (!activePlacement) {this.$.placementDatabasePickerButton.set("content", "Archived Placement");}
			this.$.placementDatabasePicker.set("selected", activePlacement);
			this.set("loadingData", false);
		}
	},

	handleRefreshUnassignedPayments: function(inSender, inEvent)
	{
		this.populateSubscriptions(enyo.bind(this, function(){
			this.populateSalespeople(enyo.bind(this, function(){
				//Do nothing
			}));
		}));
		return true;
	},

	populateSalespeople: function(callback)
	{
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getplacementsalespeople",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			alertify.error("Failed to load salespeople.");
			console.log(request);
			//The way that this is used elsewhere, this is optional.
			this.set("salespeople", {});
			if(response == 401){
				this.doLogout();
				return;
			}
			callback();
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			if (response.error)
			{
				alertify.error("Failed to load salespeople.");
				console.log(response);
				this.set("salespeople", {});
			}
			else
			{
				this.set("salespeople", response.salespeople);
			}

			callback();
			return;		
		}));

		request.go({companyID: quantum.preferences.get("company"), placementID: quantum.preferences.get("placementDatabase")});
	},

	populateSubscriptions: function(callback)
	{
		this.set("subscriptionCollection", null);
		this.set("unassignedPayments", null);

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
				url: quantum.preferences.get("apiServer") + "getplacements",
				cacheBust: false,
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				}
			});

			request.error(enyo.bind(this, function(request, response){
				alertify.error("Failed to load placements. Logging out.");
				//If we are failing here, assume that something has gone catastrophically wrong and that we should bail, regardless of error code.
				this.doLogout();
				return;
			}));

			request.response(enyo.bind(this, function(request, response){
				quantum.preferences.set("placements", response.placements);
				if (response.placements && response.placements.length > 1)
				{
					var placements = [];
					var archivedPlacements = false;
					var archivedPlacementsSelected = true;

					for (var i = 0; i < response.placements.length; i++)
					{
						if (response.placements[i].status === "archived" || response.placements[i].status === "cancelled")
						{
							archivedPlacements = true;
						}
						else
						{
							if (response.placements[i].database === quantum.preferences.get("placementDatabase")) {archivedPlacementsSelected = false;}
							placements.push({database: response.placements[i].database, content: response.placements[i].name, active: this.get("targetPlacement") ? response.placements[i].database === this.get("targetPlacement") : response.placements[i].database === quantum.preferences.get("placementDatabase")});
						}
					}

					if (archivedPlacements)
					{
						placements.push({name: "archivePlacementsPickerItem", content: "Archived Placements..."});
					}

					this.$.placementDatabasePicker.createComponents(placements, {owner: this});

					//this.$.placementDatabasePickerDecorator.set("showing", this.get("targetPlacement") ? false : true);
					this.$.placementName.set("content", "");
					this.$.placementDatabasePickerDecorator.set("showing", true);

					if (archivedPlacementsSelected) {
						this.$.placementDatabasePickerButton.setContent("Archived Placement");
					}
				}
				else
				{
					this.$.placementDatabasePickerDecorator.set("showing", false);
					this.$.placementName.set("content", response.placements ? response.placements[0].name : "");
				}

				this.set("loadingData", false);

				this.get("database").query("onlyDocs", {include_docs: true}, enyo.bind(this, function(err, response){
					if (err)
					{
						alertify.error("All docs get failed");
						console.log(err);
						callback();
						return;
					}

					if (response.rows && response.rows.length > 0)
					{
						var rows = response.rows;
						var docs = [];

						for (var i = 0; i < rows.length; i++ )
						{

							if (rows[i].value){
								if (rows[i].value._id.indexOf("_design") !== -1) {
									//Do nothing - just ignore it.
								}
								else if (rows[i].value._id === "settings")
								{
									quantum.preferences.set("placementInfo", rows[i].value);
									// console.log(quantum.preferences.get(placementInfo));
								}
								else if (rows[i].value._id === "unassignedPayments")
								{
									this.set("unassignedPayments", rows[i].value);
									// console.log(this.get("unassignedPayments"));
								}
								else
								{
									if (rows[i].value.contactInfo.displayName)
									{
										docs.push(rows[i].value);
									}
									else if(rows[i].value.contactInfo.subscriberName)
									{
										rows[i].value.contactInfo.displayName = rows[i].value.contactInfo.subscriberName;
										docs.push(rows[i].value);
									}
									else
									{
										//Not a record we want, do nothing or throw an error.
									}
								}
							}
						}

						var sortedDocs = docs.sort(function(a,b){
							if(a.contactInfo.displayName.toLowerCase() < b.contactInfo.displayName.toLowerCase()) {return -1;}
							if(a.contactInfo.displayName.toLowerCase() > b.contactInfo.displayName.toLowerCase()) {return 1;}
							return 0;
						});
						this.set("subscriptionCollection", new quantum.SubscriptionCollection(sortedDocs));

						if (quantum.preferences.get("placementInfo").companyInfo.companyLogo)
						{
							this.get("database").getAttachment("settings", quantum.preferences.get("placementInfo").companyInfo.companyLogo, enyo.bind(this, function(err, response){
								if (err)
								{
									alertify.error("Settings doc get failed");
									console.log(err);
									callback();
									return;
								}
								
								var reader = new window.FileReader();
								reader.readAsDataURL(response);
								reader.onloadend = enyo.bind(this, function() {               
									var attachment = {
										"content_type": reader.result.split(";")[0].split(":")[1],
										"data": reader.result.split(",")[1]
									};
									
									quantum.preferences.get("placementInfo")._attachments[quantum.preferences.get("placementInfo").companyInfo.companyLogo] = attachment;
									this.$.listPanel.handleClearSearchButtonTapped();
									quantum.preferences.commit();
									callback();
								});
							}));
						}
						else
						{
							this.$.listPanel.handleClearSearchButtonTapped();
							quantum.preferences.commit();
							callback();
						}
					}

					this.updateChangesFeed();
				}));
			}));

			request.go({company: quantum.preferences.get("company")});
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
			if(a.get("contactInfo").displayName.toLowerCase() < b.get("contactInfo").displayName.toLowerCase()) {return -1;}
			if(a.get("contactInfo").displayName.toLowerCase() > b.get("contactInfo").displayName.toLowerCase()) {return 1;}
			return 0;
		};

		this.set("changesFeed", io(quantum.preferences.get("apiServer"), {
			query: {
				username: quantum.preferences.get("username"),
				password: quantum.preferences.get("password"),
				target: (this.get("targetPlacement") || quantum.preferences.get("placementDatabase"))
			}
		}));

		this.get("changesFeed").on('change', enyo.bind(this, function (change) {
			var findResult = this.get("subscriptionCollection").find(enyo.bind(this, function(value, index, array){
				return value.attributes._id === change.doc._id;
			}));

			// check for deleted records
			if (change.deleted) {
				if (findResult) {
					if (this.$.dataPanels.getActive() === this.$.detailPanel && findResult === this.$.detailPanel.get("activeEntry")){
						findResult.destroy();
						this.get("subscriptionCollection").sort(sortByDisplayNameFunction);

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
					else if (this.$.dataPanels.getActive() === this.$.listPanel) {
						var listContainsValue = this.$.listPanel.get("filteredSubscriptionCollection").find(enyo.bind(this, function(value, index, array){
							return value === findResult;
						}));

						if (listContainsValue){
							findResult.destroy();
							this.get("subscriptionCollection").sort(sortByDisplayNameFunction);
							this.$.listPanel.activate();
							alertify.success("Entry Deleted From Another Terminal");
						}
						else
						{
							findResult.destroy();
							this.get("subscriptionCollection").sort(sortByDisplayNameFunction);
						}
					}
					else {
						//No need to alert if it is not the active entry that the user is working on.
						findResult.destroy();
						this.get("subscriptionCollection").sort(sortByDisplayNameFunction);
						this.$.dashboardPanel.activate();
					}
				}
			// check for updates
			} else if (findResult && findResult.attributes._rev !== change.doc._rev){
				//Update the existing model and collection.

				// The ugly hack of manually calling "parse" below is necessary since enyo doesn't call the model's "parse" on a merge.
				this.get("subscriptionCollection").add(new quantum.SubscriptionModel().parse(change.doc), {merge: true});
				this.get("subscriptionCollection").sort(sortByDisplayNameFunction);

				if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
					this.$.dashboardPanel.activate();
				}
				else if (this.$.dataPanels.getActive() === this.$.detailPanel) {
					if (this.$.detailPanel.get("activeEntry").get("_id") === findResult.get("_id"))
					{
						alertify.success("Entry Updated");
						this.$.detailPanel.activate(findResult);
					}
				}
				else if (this.$.dataPanels.getActive() === this.$.listPanel) {
					this.$.listPanel.activate();
				}
			// check for new records
			} else if (change && change.doc._deleted !== true && findResult === undefined){
				if (change.doc._id.indexOf("_design") !== -1) {
						//Do nothing - just ignore it.
				}
				else if (change.doc._id === "settings")
				{
					quantum.preferences.set("placementInfo", change.doc);

					//Update the doc manually since we need the attachments for this one only
					if (quantum.preferences.get("placementInfo").companyInfo.companyLogo)
					{
						this.get("database").getAttachment("settings", quantum.preferences.get("placementInfo").companyInfo.companyLogo, enyo.bind(this, function(err, response){
							if (err)
							{
								alertify.error("Failed To Get Company Logo");
								console.log(err);
								return;
							}
							
							var reader = new window.FileReader();
							reader.readAsDataURL(response);
							reader.onloadend = enyo.bind(this, function() {               
								var attachment = {
									"content_type": reader.result.split(";")[0].split(":")[1],
									"data": reader.result.split(",")[1]
								};
								
								quantum.preferences.get("placementInfo")._attachments[quantum.preferences.get("placementInfo").companyInfo.companyLogo] = attachment;
								quantum.preferences.commit();
							});
						}));
					}
					else
					{
						quantum.preferences.commit();
					}
				}
				else if (change.doc._id === "unassignedPayments")
				{
					this.set("unassignedPayments", change.doc);
				}
				else
				{
					if (!change.doc.displayName)
					{
						change.doc.displayName = change.doc.subscriberName;
					}
					this.get("subscriptionCollection").add(change.doc);
					this.get("subscriptionCollection").sort(sortByDisplayNameFunction);
				}

				if (this.$.dataPanels.getActive() === this.$.listPanel) {
					alertify.success("Entry Added");
					this.$.listPanel.activate();
				}
				else if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
					alertify.success("Entry Added");
					this.$.dashboardPanel.activate();
				}
			} else {
				//console.log("change didn't trigger");
			}
		}));

		this.get("changesFeed").on('error', enyo.bind(this, function (err) {
			console.log("Changes feed error", err);
		}));
	},

	generateCSVFile: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		var rawCollection = inEvent.rawCollection;
		var filename = inEvent.filename;

		//sort the raw collection by subscriber name
		rawCollection.sort(function(a, b){
			if(a.contactInfo.subscriberName.toLowerCase() < b.contactInfo.subscriberName.toLowerCase()) {return -1;}
			if(a.contactInfo.subscriberName.toLowerCase() > b.contactInfo.subscriberName.toLowerCase()) {return 1;}
			return 0;
		});

		var csvCollection = [];

		//strip the _id, _rev, displayName, paymentsReceived, documentsReceived, and _attachments fields
		rawCollection.forEach(enyo.bind(this, function(value, index, array){
			csvCollection.push({
				subscriberName: value.contactInfo.subscriberName,
				subscriptionType: value.subscriptionInfo.subscriptionType,
				contactPerson: value.contactInfo.corporateInfo.contactPerson,
				contactPersonTitle: value.contactInfo.corporateInfo.contactPersonTitle,
				subscriptionStatus: value.subscriptionInfo.subscriptionStatus,
				contactID: value.contactInfo.contactID,
				dateOfBirth: value.contactInfo.dateOfBirth,
				addressLine1: value.contactInfo.addressInfo.addressLine1,
				addressLine2: value.contactInfo.addressInfo.addressLine2,
				addressLine3: value.contactInfo.addressInfo.addressLine3,
				city: value.contactInfo.addressInfo.city,
				country: value.contactInfo.addressInfo.country,
				stateProvince: value.contactInfo.addressInfo.stateProvince,
				zipPostalCode: value.contactInfo.addressInfo.zipPostalCode,
				altMailAddress: value.contactInfo.altMailAddress,
				altAddressLine1: value.contactInfo.altAddressInfo.addressLine1,
				altAddressLine2: value.contactInfo.altAddressInfo.addressLine2,
				altAddressLine3: value.contactInfo.altAddressInfo.addressLine3,
				altCity: value.contactInfo.altAddressInfo.city,
				altCountry: value.contactInfo.altAddressInfo.country,
				altStateProvince: value.contactInfo.altAddressInfo.stateProvince,
				altZipPostalCode: value.contactInfo.altAddressInfo.zipPostalCode,
				phoneNumber: value.contactInfo.phoneNumber,
				businessPhoneNumber: value.contactInfo.businessPhoneNumber,
				cellPhoneNumber: value.contactInfo.cellPhoneNumber,
				faxNumber: value.contactInfo.faxNumber,
				emailOnly: value.contactInfo.emailOnly,
				emailAddress: value.contactInfo.emailAddress,
				secondaryEmailAddress: value.contactInfo.secondaryEmailAddress,
				jurisdiction: value.subscriptionInfo.jurisdiction,
				exemptionType: value.subscriptionInfo.exemptionType,
				accreditedInvestorQualification: value.subscriptionInfo.accreditedInvestorQualification,
				numShares: value.subscriptionInfo.numShares,
				subscriberDollarAmount: value.subscriptionInfo.subscriberDollarAmount,
				fundsReceived: value.subscriptionInfo.fundsReceived,
				subscriptionCreatedTimestamp: value.subscriptionInfo.subscriptionCreatedTimestamp,
				specialInstructions: value.subscriptionInfo.specialInstructions,
				notes: value.subscriptionInfo.notes,
				referrer: value.subscriptionInfo.referrer,
				salespersonID: value.subscriptionInfo.salespersonID
			});
		}));

		//finally, parse the collection to CSV
		var csv = Papa.unparse(csvCollection);
		var output = new Blob([csv], {type: "text/csv"});
		saveAs(new Blob([csv], {type: "text/csv"}), filename);

		//If these are closing documents we want to save them to the settings object for later
		if(filename.includes("Completed Subscribers List") === true)
		{
			var settingsFilename = "Completed Subscribers List"+ filename.split('Completed Subscribers List')[1];

			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Login Failed");
					console.log(err);
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").get("settings", enyo.bind(this, function(err, settingsDoc){

					if (err)
					{
						alertify.error("Unable To Get Settings");
						console.log(err);
						return;
					}

					settingsDoc._attachments[settingsFilename] = {
						content_type: "text/csv",
						data: output
					};

					this.get("database").post(settingsDoc, enyo.bind(this, function(err, response){
						if (err)
						{
							alertify.error("Unable To Update Settings");
							console.log(err);
							return;
						}
					}));

				}));
			}));
		}
	}
});
