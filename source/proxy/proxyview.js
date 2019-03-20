/* global quantum,PouchDB,alertify,Papa,saveAs,console */

enyo.kind({
	name: "quantum.ProxyView",
	kind: "FittableRows",
	fit: true,

	handlers: {
		onGoHome: "handleGoHome",
		onLogout: ""
	},

	events: {
		onChangeCompany: "",
		onRequestChangeModule: "",
		onLogout: ""
	},

	published: {
		database: null,
		loadingData: false,
		proxyCollection: null,
		localChange: null,
		targetProxy: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
		targetRecord: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
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
			{name: "proxyDatabasePickerDecorator", kind: "onyx.PickerDecorator", showing: false, components: [
				{name: "proxyDatabasePickerButton", style: "width: 450px;"},
				{name: "proxyDatabasePicker", kind: "onyx.Picker", onChange: "handleProxyDatabasePickerChanged"}
			]},
			{name: "editEntryButton", style: "margin: 0; padding: 10px;", classes: "breadcrumb", showing: false , ontap: "editEntryButtonTapped", components: [
				{kind: "onyx.IconButton", src: "assets/icons/list-button-icon.png"}
			]},
			{name:"rightButton", kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", ontap: "buttonfix", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{name: "rightMenu", kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					{content: "Proxy Info", onSelect: "proxyInformationMenuItemTapped", name: "proxyInfoMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Generate Report", onSelect: "generateReportButtonTapped", name: "generateReportMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "quantum.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Proxies Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "quantum.ProxyDashboardPanel", onViewItemDetail: "handleViewItemDetail"},
			{name: "listPanel", kind: "quantum.ProxyListPanel", onViewItemDetail: "handleViewItemDetail"},
			{name: "detailPanel", kind: "quantum.ProxyDetailPanel", onGoBack: "handleGoBack"},
			{name: "proxyInfoPanel", kind: "quantum.ProxyInfoPanel"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "closedProxiesPopup", kind: "quantum.SelectClosedProxyPopup", onProxySelected: "handleClosedProxySelected", onCancel: "handleClosedProxyCancelled"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		//Dashboard Panel
		{from: ".database", to: ".$.dashboardPanel.database"},
		{from: ".proxyCollection", to: ".$.dashboardPanel.proxyCollection"},

		//List Panel
		{from: ".proxyCollection", to: ".$.listPanel.proxyCollection"},

		//Detail Panel
		{from: ".database", to: ".$.detailPanel.database"},

		//Info Panel
		{from: ".database", to: ".$.proxyInfoPanel.database"}
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
		this.$.editEntryButton.set("showing", quantum.hasRole(["admins","users","auditors"], "proxy"));
		this.$.proxyInfoMenuItem.set("showing", quantum.hasRole(["admins"], "proxy"));
		this.$.generateReportMenuItem.set("showing", quantum.hasRole(["admins"], "proxy"));
	},

	rendered: function(inSender, inEvent)
	{
		if(!quantum.preferences.get("proxyDatabase") && !this.get("targetProxy")){
			this.set("showing", false);
			if (this.$.selectProxyPopup) {this.$.selectProxyPopup.hide();}
			if (this.$.selectProxyPopup) {this.$.selectProxyPopup.destroy();}
			this.createComponent({
				name: "selectProxyPopup",
				kind: "quantum.SelectProxyPopup",
				onError: "handleSelectProxyError",
				onProxySelected: "handleProxySelected",
				onClosedProxySelected: "handleShowClosedProxiesPopup",
				onHide: "handlePopupHidden"},
			{owner:this});

			this.inherited(arguments);
			this.$.selectProxyPopup.show();
		}
		else
		{
			this.set("showing", false);
			this.set("database", new PouchDB(quantum.preferences.get("server") + (this.get("targetProxy") || quantum.preferences.get("proxyDatabase")), {skip_setup: true}));
			this.$.versionString.set("content", quantum.versionString);
			this.$.companyName.set("content", quantum.preferences.get("companyName"));
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
			this.inherited(arguments);
			quantum.fixShim();
			this.$.loadingPopup.show();
			this.populateProxies(enyo.bind(this, function(){
				this.setShowingForRoles();
				this.set("showing", true);
				this.$.loadingPopup.hide();
				this.dashboardButtonTapped();
				this.resize();
				quantum.preferences.set("lastModule", "proxy");
				quantum.preferences.commit();
				if (this.get("targetProxy"))
				{
					var filteredCollection = this.get("proxyCollection").filter(enyo.bind(this, function(value, index, array){
						return value.get("_id") === this.get("targetRecord");
					}));

					filteredCollection = new enyo.Collection(filteredCollection);

					if (filteredCollection && filteredCollection.length > 0)
					{
						this.handleViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
					}
				}
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
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel"));
			this.$.dashboardPanel.activate();
		}));
	},

	editEntryButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
			{
				if (
					this.$.breadcrumbToolbar.controls[i].type === "proxyDetail" ||
					this.$.breadcrumbToolbar.controls[i].type === "proxies"
				){
					this.clearBreadcrumbs(i);
					break;
				}
			}
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "proxies", icon: "assets/icons/list-icon.png", content: "Proxies", ontap: "proxiesBreadcrumbTapped", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}));
	},

	proxiesBreadcrumbTapped: function(inSender, inEvent)
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

	generateReportButtonTapped: function(inSender, inEvent)
	{
		//TODO: Implement
		alertify.error("Not Implemented Yet");
		return;

		// if (!quantum.hasRole(["admins"], "proxy")) { return; }

		// this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		// {
		// 	if (this._reportWindow)
		// 	{
		// 		this._reportWindow.close();
		// 	}
		// 	this._reportWindow = window.open("index.html?report=1", "height=700px,width=1366px,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
		// }));
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doChangeCompany({allowCancel: true});
		}));
	},

	handleSelectProxyError: function(inSender, inEvent)
	{
		quantum.preferences.set("lastModule", "");
		this.doRequestChangeModule();
	},

	handleProxySelected: function(inSender, inEvent)
	{
		this.$.selectProxyPopup.hide();
		quantum.preferences.set("proxyDatabase", inEvent.proxy);
		quantum.preferences.commit({success: enyo.bind(this, function(){
			//Slight pause here to give the UI time to refresh
			setTimeout(enyo.bind(this, function(){this.render();}), 50);
		})});
	},

	handleShowClosedProxiesPopup: function(inSender, inEvent)
	{
		this.$.closedProxiesPopup.show();
	},

	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "proxyDetail", icon: "assets/icons/proxy-detail-icon.png", content: "Proxy Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.detailPanel.set("proxyCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("detailPanel"));
		this.$.detailPanel.activate(inEvent.item);
	},

	proxyInformationButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "proxy")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "proxyInformation", icon: "assets/icons/information-icon.png", content: "Proxy Information", ontap: "proxyInformationBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("proxyInfoPanel"));
		this.$.proxyInfoPanel.activate();
	},

	proxyInformationBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.proxyInformationButtonTapped(inSender, inEvent);
		}));
	},

	proxyInformationMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.proxyInformationButtonTapped(inSender, inEvent);
		}));
	},

	handleChangeModule: function(inSender, inEvent)
	{
		//If we're trying to reload the same module, just go back to the dashboard. Otherwise, let the event continue bubbling up so that we can change views.
		if (inEvent.target === "proxy")
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
			case "proxies":
				this.proxiesBreadcrumbTapped(breadcrumb, inEvent);
				break;
			default:
				this.dashboardButtonTapped();
		}
	},

	handleGoHome: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy"))
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

	handleProxyDatabasePickerChanged: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.$.proxyDatabasePickerButton.set("content", inEvent.content);

			if (!this.get("loadingData")){
				if (inEvent.selected === this.$.closedProxiesPickerItem)
				{
					this.$.closedProxiesPopup.show();
				}
				else
				{
					quantum.preferences.set("proxyDatabase", inEvent.selected.database);
					quantum.preferences.commit({success: enyo.bind(this, function(){
						//Slight pause here to give the UI time to refresh
						setTimeout(enyo.bind(this, function(){this.render();}), 50);
					})});
				}
			}
		}));

		return true;
	},

	handleClosedProxySelected: function(inSender, inEvent)
	{
		quantum.preferences.set("proxyDatabase", inEvent.database);
		quantum.preferences.commit({success: enyo.bind(this, function(){
			//Slight pause here to give the UI time to refresh
			setTimeout(enyo.bind(this, function(){this.render();}), 50);
		})});
	},

	handleClosedProxyCancelled: function(inSender, inEvent)
	{
		if(!quantum.preferences.get("proxyDatabase") && !this.get("targetProxy")){
			//If we don't have a proxy database at this point. Just re-render. It will force a proper re-pick of the database.
			this.render();
		}
		else
		{
			var activeProxy = null;
			this.$.proxyDatabasePicker.controls.forEach(enyo.bind(this, function(value, index, array){
				if (value.database && (value.database === quantum.preferences.get("proxyDatabase") || value.database === this.get("targetProxy"))){
					activeProxy = value;
				}
			}));

			//Workaround to stop the db from reloading
			this.set("loadingData", true);
			if (!activeProxy) {this.$.proxyDatabasePickerButton.set("content", "Closed Proxy");}
			this.$.proxyDatabasePicker.set("selected", activeProxy);
			this.set("loadingData", false);
		}
	},

	populateProxies: function(callback)
	{
		this.set("proxyCollection", null);

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
			this.$.proxyDatabasePicker.set("selected", null);
			this.$.proxyDatabasePicker.destroyClientControls();

			var request = new enyo.Ajax({
				url: quantum.preferences.get("apiServer") + "getproxydropdowndata",
				cacheBust: false,
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				}
		    });

		    request.error(enyo.bind(this, function(request, response){
		    	alertify.error("Failed to load proxies");
				console.log(request);
				if(response == 401){
					this.doLogout();
					return;
				}
				callback();
				return;
		    }));

		    request.response(enyo.bind(this, function(request, response){
				quantum.preferences.set("proxies", response.proxyEvents);

				if (response.proxyEvents.length > 1)
				{
					var proxies = [];
					var closedProxies = false;
					var closedProxiesSelected = true;

					for (var i = 0; i < response.proxyEvents.length; i++)
					{
						if (response.proxyEvents[i].status === "complete" || response.proxyEvents[i].status === "cancelled")
						{
							closedProxies = true;
						}
						else
						{
							if (response.proxyEvents[i].proxyID === quantum.preferences.get("proxyDatabase")) {closedProxiesSelected = false;}
							proxies.push({database: response.proxyEvents[i].proxyID, content: response.proxyEvents[i].proxyName, active: this.get("targetProxy") ? response.proxyEvents[i].proxyID === this.get("targetProxy") : response.proxyEvents[i].proxyID === quantum.preferences.get("proxyDatabase")});
						}
					}

					var sortByDisplayNameFunction = function(a,b){
						if(a.content.toLowerCase() < b.content.toLowerCase()) {return -1;}
						if(a.content.toLowerCase() > b.content.toLowerCase()) {return 1;}
						return 0;
					};

					proxies.sort(sortByDisplayNameFunction);

					if (closedProxies)
					{
						proxies.push({name: "closedProxiesPickerItem", content: "Closed Proxies..."});
					}

					this.$.proxyDatabasePicker.createComponents(proxies, {owner: this});

					//this.$.proxyDatabasePickerDecorator.set("showing", this.get("targetProxy") ? false : true);
                    this.$.proxyDatabasePickerDecorator.set("showing", true);

					if (closedProxiesSelected) {
						this.$.proxyDatabasePickerButton.setContent("Closed Proxy");
					}
				}
				else
				{
					this.$.proxyDatabasePickerDecorator.set("showing", false);
				}

				this.set("loadingData", false);

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
								if (rows[i].doc._id.indexOf("_design") !== -1) {
									//Do nothing - just ignore it.
								}
								else if (rows[i].doc._id === "settings")
								{
									quantum.preferences.set("proxyInfo", rows[i].doc);
									// console.log(quantum.preferences.get(proxyInfo));
								}
								else if (rows[i].doc._id === "alreadyMailed")
								{
									//Ignore - we don't need it.
								}
								else if (rows[i].doc._id === "emailNoticeFlag")
								{
									//Ignore - we don't need it.
								}
								else if (rows[i].doc._id === "unsignedDocFlag")
								{
									//Ignore - we don't need it.
								}
								else if (rows[i].doc._id === "generateUnsignedDocsFlag")
								{
									//Ignore - we don't need it.
								}
								else
								{
									docs.push(new proxyModel(rows[i].doc));
								}
							}
						}

						var sortedDocs = docs.sort(function(a,b){
							if(a.contactName.toLowerCase() < b.contactName.toLowerCase()) {return -1;}
						    if(a.contactName.toLowerCase() > b.contactName.toLowerCase()) {return 1;}
						    return 0;
						});
						this.set("proxyCollection", new enyo.Collection(sortedDocs));

						this.$.listPanel.handleClearSearchButtonTapped();
						quantum.preferences.commit();
						callback();
					}

					this.updateChangesFeed();
				}));
		    }));

		    request.go({companyID: quantum.preferences.get("company")});
		}));
	},

	updateChangesFeed: function()
	{
		if (this.get("changesFeed"))
		{
			if (this.get("changesFeed").cancel)
			{
				this.get("changesFeed").cancel();
			}

			this.set("changesFeed", null);
		}

		var sortByDisplayNameFunction = function(a,b){
			if(a.get("contactName").toLowerCase() < b.get("contactName").toLowerCase()) {return -1;}
			if(a.get("contactName").toLowerCase() > b.get("contactName").toLowerCase()) {return 1;}
			return 0;
		};

		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, result){
			if (err)
			{
				//Fail "silently".
				console.log("Failed to log in for changes feed", err);
				//Presumably, there is a connection error of some sort here. Backoff and try again in a minute.
				setTimeout(enyo.bind(this, function(){this.updateChangesFeed();}), 60000);
				return;
			}

			var changesFeed = this.get("database").changes({
				since: 'now',
				live: true,
				include_docs: true
			}).on('change', enyo.bind(this, function (change) {
				var findResult = this.get("proxyCollection").find(enyo.bind(this, function(value, index, array){
					return value.attributes._id === change.doc._id;
				}));

				// check for deleted records
				if (change.deleted) {
					if (findResult) {
						if (this.$.dataPanels.getActive() === this.$.detailPanel && findResult === this.$.detailPanel.get("activeEntry")){
							findResult.destroy();
							this.get("proxyCollection").sort(sortByDisplayNameFunction);

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
							var listContainsValue = this.$.listPanel.get("filteredProxyCollection").find(enyo.bind(this, function(value, index, array){
								return value === findResult;
							}));

							if (listContainsValue){
								findResult.destroy();
								this.get("proxyCollection").sort(sortByDisplayNameFunction);
								this.$.listPanel.activate();
								alertify.success("Entry Deleted From Another Terminal");
							}
							else
							{
								findResult.destroy();
								this.get("proxyCollection").sort(sortByDisplayNameFunction);
							}
						}
						else {
							//No need to alert if it is not the active entry that the user is working on.
							findResult.destroy();
							this.get("proxyCollection").sort(sortByDisplayNameFunction);
							this.$.dashboardPanel.activate();
						}
					}
				// check for updates
			  	} else if (findResult && findResult.attributes._rev !== change.doc._rev){
					//Destroy the existing model, replace it, and update the collection.
					findResult.destroy();
					var newModel = this.get("proxyCollection").add(new proxyModel(change.doc))[0]; //TODO: this is not merging correctly?
					this.get("proxyCollection").sort(sortByDisplayNameFunction);

					if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
						this.$.dashboardPanel.activate();
					}
					else if (this.$.dataPanels.getActive() === this.$.detailPanel) {
						if (this.$.detailPanel.get("activeEntry").get("_id") === findResult.get("_id"))
						{
							alertify.success("Entry Updated");
							this.$.detailPanel.activate(newModel);
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
					else if (change.doc._id === "alreadyMailed") {
						//Do nothing - just ignore it.
					}
					else if (rows[i].doc._id === "emailNoticeFlag")
					{
						//Ignore - we don't need it.
					}
					else if (rows[i].doc._id === "unsignedDocFlag")
					{
						//Ignore - we don't need it.
					}
					else if (rows[i].doc._id === "generateUnsignedDocsFlag")
					{
						//Ignore - we don't need it.
					}
					else if (change.doc._id === "settings")
					{
						quantum.preferences.set("proxyInfo", change.doc);
						quantum.preferences.commit();
					}
					else
					{
						this.get("proxyCollection").add(change.doc);
						this.get("proxyCollection").sort(sortByDisplayNameFunction);
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
			})).on('error', enyo.bind(this, function (err) {
				console.log("Changes feed error, retrying", err);
				this.updateChangesFeed();
			}));

			this.set("changesFeed", changesFeed);
		}));
	}
});