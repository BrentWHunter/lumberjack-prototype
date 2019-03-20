/* global lumberjack,PouchDB,alertify,Papa,saveAs,console */

enyo.kind({
	name: "lumberjack.IssuerView",
	kind: "FittableRows",
	fit: true,

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
		issuerCollection: null,
		unassignedPayments: null,
		localChange: null,
		targetIssuer: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
		changesFeed: null,
		salespeople: null
	},

	components:[
		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", style: "background: black; border: 1px solid black; padding: 0px 0px;", noStretch: true, components: [
			{name: "leftButton", kind: "onyx.MenuDecorator", style: "margin: 0 10px 0 0; padding: 10px;", classes: "breadcrumb modules-breadcrumb", ontap: "buttonfix", components: [
				{kind: "onyx.IconButton", src: "assets/icons/modules-button-icon.png"},
				{name: "leftMenu", kind: "lumberjack.IconMenu", onChangeModule: "handleChangeModule"}
			]},
			{kind: "enyo.Image", style: "height: 40px;", src: "assets/logo.png"},
			{name: "companyName", style: "color: white; margin-left: 15px; font-size: 24px; font-family: Tahoma, sans-serif;"},
			{fit: true},
			{name:"rightButton", kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", ontap: "buttonfix", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{name: "rightMenu", kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "lumberjack.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Issuers Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "listPanel", kind: "lumberjack.IssuerListPanel", onViewItemDetail: "handleViewItemDetail", onAddNewSubscription: "addEntryButtonTapped"},
			{name: "detailPanel", kind: "lumberjack.SubscriberDetailPanel", onGoBack: "handleGoBack"},
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "archivedPlacementsPopup", kind: "lumberjack.SelectArchivedPlacementPopup", onPlacementSelected: "handleArchivedPlacementSelected", onCancel: "handleArchivedPlacementCancelled"},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		//List Panel
		{from: ".issuerCollection", to: ".$.listPanel.issuerCollection"},

		//Detail Panel
		{from: ".database", to: ".$.detailPanel.database"}
		//{from: ".subscriptionCollection", to: ".$.detailPanel.subscriptionCollection"}
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
		//Nothing to do here.
	},

	rendered: function(inSender, inEvent)
	{
		this.set("showing", false);
		this.set("database", new PouchDB(lumberjack.preferences.get("server") + lumberjack.preferences.get("issuerDatabase")), {skip_setup: true});
		this.$.versionString.set("content", lumberjack.versionString);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel")); //Workaround for "wrong" panel being set when the view is loaded.
		this.inherited(arguments);
		lumberjack.fixShim();
		this.$.loadingPopup.show();
		this.populateIssuers(enyo.bind(this, function(){
			lumberjack.preferences.set("lastModule", "issuer");
			lumberjack.preferences.commit();
			this.setShowingForRoles();
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
			if (this.get("targetIssuer"))
			{
				var filteredCollection = this.get("issuerCollection").filter(enyo.bind(this, function(value, index, array){
					return value.get("_id") === this.get("targetSubscriber");
				}));

				filteredCollection = new lumberjack.SubscriptionCollection(filteredCollection);

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
				this.createComponent({name: "saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYesWithReturnValue: "executeReturnValue_yes", onNoWithReturnValue: "executeReturnValue_no", onHide: "handlePopupHidden"}, {owner:this});
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
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}));
	},

	editEntryButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { return; }

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
			this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "subscriptions", icon: "assets/icons/list-icon.png", content: "Subscriptions", ontap: "subscriptionsBreadcrumbTapped", last: true}, {owner: this});
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

	handleSelectPlacementError: function(inSender, inEvent)
	{
		lumberjack.preferences.set("lastModule", "");
		this.doRequestChangeModule();
	},

	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "subscriberDetail", icon: "assets/icons/subscriber-detail-icon.png", content: "Subscriber Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.detailPanel.set("subscriptionCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("detailPanel"));
		this.$.detailPanel.activate(inEvent.item);
	},

	handleChangeModule: function(inSender, inEvent)
	{
		//If we're trying to reload the same module, just go back to the dashboard. Otherwise, let the event continue bubbling up so that we can change views.
		if (inEvent.target === "issuer")
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
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement"))
		{
			lumberjack.preferences.set("lastModule", "");
			lumberjack.preferences.commit();
			this.doRequestChangeModule();
		}
		else
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}
	},

	handleLogout: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doLogout();
		}));
	},

	populateIssuers: function(callback)
	{
		this.set("subscriptionCollection", null);
		this.set("unassignedPayments", null);

		//Get data from database and load it into collection
		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response){
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

			lumberjack.preferences.set("roles", response.roles);

			this.get("database").query("onlyDocIds", {include_docs: true}, enyo.bind(this, function(err, response){
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
						if (rows[i].doc){
							if (rows[i].doc.issuerName)
							{
								docs.push(rows[i].doc);
							}
							else
							{
								//Not a record we want, do nothing or throw an error.
							}
						}
					}

					var sortedDocs = docs.sort(function(a,b){
						if(a.issuerName.toLowerCase() < b.issuerName.toLowerCase()) {return -1;}
						if(a.issuerName.toLowerCase() > b.issuerName.toLowerCase()) {return 1;}
						return 0;
					});
					this.set("issuerCollection", new enyo.Collection(sortedDocs));// TODO: Issuer Collection new lumberjack.SubscriptionCollection(sortedDocs));

					this.$.listPanel.handleClearSearchButtonTapped();
					lumberjack.preferences.commit();
					callback();
				}

				//this.updateChangesFeed(); //TODO: Implement
			}));
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
			if(a.get("issuerName").toLowerCase() < b.get("issuerName").toLowerCase()) {return -1;}
			if(a.get("issuerName").toLowerCase() > b.get("issuerName").toLowerCase()) {return 1;}
			return 0;
		};

		this.set("changesFeed", io(lumberjack.preferences.get("apiServer"), {
			query: {
				username: lumberjack.preferences.get("username"),
				password: lumberjack.preferences.get("password"),
				target: (this.get("targetPlacement") || lumberjack.preferences.get("placementDatabase"))
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
				this.get("subscriptionCollection").add(new lumberjack.SubscriptionModel().parse(change.doc), {merge: true});
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
					lumberjack.preferences.set("placementInfo", change.doc);

					//Update the doc manually since we need the attachments for this one only
					if (lumberjack.preferences.get("placementInfo").companyInfo.companyLogo)
					{
						this.get("database").getAttachment("settings", lumberjack.preferences.get("placementInfo").companyInfo.companyLogo, enyo.bind(this, function(err, response){
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
								
								lumberjack.preferences.get("placementInfo")._attachments[lumberjack.preferences.get("placementInfo").companyInfo.companyLogo] = attachment;
								lumberjack.preferences.commit();
							});
						}));
					}
					else
					{
						lumberjack.preferences.commit();
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
	}
});