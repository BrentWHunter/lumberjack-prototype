enyo.kind({
	name: "lumberjack.OptionsView",
	kind: "FittableRows",
	fit: true,

	events: {
		onChangeCompany: "",
		onLogout: ""
	},

	published: {
		database: null,
		loadingData: false,
		transferTemplateDatabase: null,
		transferCollection: null,
		unassignedPayments: null,
		localChange: null,
		changesFeed: null,

		// This one is loaded only if the page is launched from another page. IE. The digital minute book.
		targetTransfer: null
	},

	components:[
		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", style: "background: black; border: 1px solid black; padding: 0px 0px;", noStretch: true, components: [
			{kind: "onyx.MenuDecorator", style: "margin: 0 10px 0 0; padding: 10px;", classes: "breadcrumb modules-breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/modules-button-icon.png"},
				{kind: "lumberjack.IconMenu", onChangeModule: "handleChangeModule"}
			]},
			{kind: "enyo.Image", style: "height: 40px;", src: "assets/logo.png"},
			{name: "companyName", style: "color: white; margin-left: 15px; font-size: 24px; font-family: Tahoma, sans-serif;"},
			{fit: true},
			{style: "margin: 0; padding: 10px;", classes: "breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/list-button-icon.png", ontap: "optionButtonTapped"}
			]},
			{kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					{content: "Create Options", onSelect: "createOptionMenuItemTapped", showing: false, name: "createOptionMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "lumberjack.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Options Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "lumberjack.OptionsDashboardPanel", onGoBack: "handleGoBack", onViewItemDetail: "handleViewItemDetail"},
			{name: "listPanel", kind: "lumberjack.OptionListPanel", onViewItemDetail: "handleViewItemDetail", onCreateNewOption: "createOptionButtonTapped"},
			{name: "createOptionPanel", kind: "lumberjack.OptionDetailPanel", mode: "add", onGoBack: "handleGoBack"},
			{name: "optionDetailPanel", kind: "lumberjack.OptionDetailPanel", mode:"edit", onGoBack: "handleGoBack"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		//Dashboard Panel
		{from: ".database", to: ".$.dashboardPanel.database"},
		{from: ".optionCollection", to: ".$.dashboardPanel.optionCollection"},

		//Add Option Panel
		{from: ".database", to: ".$.createOptionPanel.database"},
		{from: ".optionCollection", to: ".$.createOptionPanel.optionCollection"},

		//Option Detail Panel
		{from: ".database", to: ".$.optionDetailPanel.database"},

		//Transfer List Panel
		{from: ".optionCollection", to: ".$.listPanel.optionCollection"}
	],

	rendered: function(inSender, inEvent)
	{
		this.set("showing", false);
		this.set("database", new PouchDB(lumberjack.preferences.get("server") + lumberjack.preferences.get("optionDatabase"), {skip_setup: true}));
		this.set("contactDatabase", new PouchDB(lumberjack.preferences.get("server") + lumberjack.preferences.get("contactDatabase"), {skip_setup: true}));
		this.$.companyName.set("content", lumberjack.preferences.get("companyName"));
		this.$.versionString.set("content", lumberjack.versionString);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
		this.inherited(arguments);
		lumberjack.fixShim();
		this.setShowingForRoles();
		this.resize();
		this.$.loadingPopup.show();
		this.populateOptions(enyo.bind(this, function() {
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
			lumberjack.preferences.set("lastModule", "option");
			lumberjack.preferences.commit();
			if (this.get("targetOption"))
			{
				var filteredCollection = this.get("optionCollection").filter(enyo.bind(this, function(value, index, array){
					return value.get("_id") === this.get("targetOption");
				}));

				filteredCollection = new lumberjack.OptionCollection(filteredCollection);

				if (filteredCollection.length > 0)
				{
					this.handleViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
				}
			}
		}));
	},

	// Toolbar Handlers
	setShowingForRoles: function()
	{
		this.$.createOptionMenuItem.set("showing", lumberjack.hasRole(["admins"], "option"));
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doChangeCompany({allowCancel: true});
		}));
	},

	handleLogout: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doLogout();
		}));
	},

	optionsButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "option")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
			{
				if (
					this.$.breadcrumbToolbar.controls[i].type === "optionDetail" ||
					this.$.breadcrumbToolbar.controls[i].type === "options" ||
					this.$.breadcrumbToolbar.controls[i].type === "createOption"
				){
					this.clearBreadcrumbs(i);
					break;
				}
			}
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "options", icon: "assets/icons/list-icon.png", content: "Options", ontap: "optionsBreadcrumbTapped", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}));
	},

	createOptionButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "option")) { return; }

		for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
		{
			if (this.$.breadcrumbToolbar.controls[i].type === "optionDetail" ||
				this.$.breadcrumbToolbar.controls[i].type === "createOption")
			{
				this.clearBreadcrumbs(i);
				break;
			}
		}

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "createOption", icon: "assets/icons/create-option-icon.png", content: "Create Option", ontap: "createOptionBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("createOptionPanel"));
		this.$.createOptionPanel.activate(new lumberjack.OptionModel({}));
	},

	createOptionMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.createOptionButtonTapped(inSender, inEvent);
		}));
	},

	//Breadcrumb handlers
	dashboardButtonTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel"));
			this.$.dashboardPanel.activate();
		}));
	},

	optionsBreadcrumbTapped: function(inSender, inEvent)
	{
		this.optionsButtonTapped(inSender, inEvent);
	},
	
	createOptionBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.createOptionButtonTapped(inSender, inEvent);
		}));
	},

	optionButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "option")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
			{
				if (
					this.$.breadcrumbToolbar.controls[i].type === "optionDetail" ||
					this.$.breadcrumbToolbar.controls[i].type === "options" ||
					this.$.breadcrumbToolbar.controls[i].type === "createOption"
				){
					this.clearBreadcrumbs(i);
					break;
				}
			}
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "options", icon: "assets/icons/list-icon.png", content: "Options", ontap: "optionsBreadcrumbTapped", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}));
	},

	//Repeater Handlers
	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "option")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "optionDetail", icon: "assets/icons/options-icon.png", content: "Option Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.optionDetailPanel.set("optionCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("optionDetailPanel"));
		this.$.optionDetailPanel.activate(inEvent.item);
	},

	//General functions
	navigateAway: function(inSender, inEvent, callback)
	{
		if (this.$.saveChangesPopup)
		{
			this.$.saveChangesPopup.hide();
			this.$.saveChangesPopup.destroy();
		}
		var _panel = this.$.dataPanels.getActive();
		if (_panel === this.$.optionDetailPanel || _panel === this.$.createOptionPanel)
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

	handleGoBack: function(inSender, inEvent)
	{
		var breadcrumb = this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 2];
		var breadcrumbType = breadcrumb.get("type");

		this.$.loadingPopup.show();
		this.populateOptions(enyo.bind(this, function() {
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
		}));
	},

	clearBreadcrumbs: function(index)
	{
		for (var i = index; i < this.$.breadcrumbToolbar.controls.length; i)
		{
			this.$.breadcrumbToolbar.controls[i].destroy();
		}
		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", true);
	},

	executeReturnValue_yes: function(inSender, inEvent)
	{
		inEvent.returnValue.yes();
	},

	executeReturnValue_no: function(inSender, inEvent)
	{
		inEvent.returnValue.no();
	},

	//Loading
	populateOptions:function(callback){
		this.set("optionCollection", null);

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
					var holderContactIDArray = [];

					for (var i = 0; i < rows.length; i++ )
					{

						if (rows[i].doc){
							if (rows[i].doc._id.indexOf("_design") !== -1 || rows[i].doc._id === "unassignedPayments" || rows[i].doc._id === "vestingConditions") {
								//Do nothing - just ignore it.
							}
							else
							{
								docs.push(rows[i].doc);
								if(!holderContactIDArray.includes(rows[i].doc.holderContactID)){
									holderContactIDArray.push(rows[i].doc.holderContactID);
								}
							}
						}
					}

					var sortedDocs = docs.sort(function(a,b){
					 	//Sort by Name
					 	if(a.dateIssued !== undefined && b.dateIssued !== undefined)
					 	{
						 	if (a.dateIssued < b.dateIssued) {return -1;}
						    if (a.dateIssued > b.dateIssued) {return 1;}
						}
					    //Then return 0
					    return 0;
					});

					this.set("optionsRaw", sortedDocs);
					this.set("optionCollection", new lumberjack.OptionCollection());
					this.populateContactData(holderContactIDArray, callback);
				}
				else
				{
					this.set("optionCollection", new lumberjack.OptionCollection());
					callback();
					this.updateChangesFeed();
				}
			}));
		}));
	},

	populateContactData:function(holderContactIDArray, callback)
	{
		var holderContactInfoMap={};

		this.get("contactDatabase").query("contactInfoBasic", {keys: holderContactIDArray}, enyo.bind(this, function(err, response) {
			if (err)
			{
				alertify.error("Contact info get failed.");
				console.log(err);
				return;
			}

			if(response && response.rows){
				for(var i = 0; i < response.rows.length; i++)
				{
					var row = response.rows[i];
					holderContactInfoMap[row.id] = row.value;
				}
			}

			this.set("holderContactInfoMap", holderContactInfoMap);
			this.setOptionsCollection(callback);
		}));
	},

	setOptionsCollection:function(callback)
	{
		var options = this.get("optionsRaw");
		var holderContactInfoMap = this.get("holderContactInfoMap");

		for(var i = 0; i < options.length; i++){
			if(holderContactInfoMap[options[i].holderContactID]){
				var contactInfo = holderContactInfoMap[options[i].holderContactID];
				options[i].holderDisplayName = contactInfo.contactName;
				options[i].holderEmail = contactInfo.emailAddress;
				options[i].holderPhone = contactInfo.phoneNumber;
			}else{
				options[i].holderDisplayName = "No data found";
			}
		}

		this.set("optionCollection", new lumberjack.OptionCollection(options));
		callback();
		this.updateChangesFeed();
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

		var sortByDateIssuedFunction = function(a,b){
			if(a === null || a === undefined){return 1;}
			if(b === null || b === undefined){return -1;}
			if(a.get("dateIssued") < b.get("dateIssued")) {return -1;}
			if(a.get("dateIssued") > b.get("dateIssued")) {return 1;}
			return 0;
		};

		this.set("changesFeed", io(lumberjack.preferences.get("apiServer"), {
			query: {
				username: lumberjack.preferences.get("username"),
				password: lumberjack.preferences.get("password"),
				target: lumberjack.preferences.get("optionDatabase")
			}
		}));

		this.get("changesFeed").on('change', enyo.bind(this, function (change) {
			if(this.get("optionCollection")){
				var findResult = this.get("optionCollection").find(enyo.bind(this, function(value, index, array){
					return value.attributes._id === change.doc._id;
				}));

				// check for deleted records
				if (change.deleted) {
					if (findResult) {
						if (this.$.dataPanels.getActive() === this.$.optionDetailPanel && findResult === this.$.optionDetailPanel.get("activeEntry")){
							findResult.destroy();
							this.get("optionCollection").sort(sortByDateIssuedFunction);

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
							this.get("optionCollection").sort(sortByDateIssuedFunction);
							this.$.dashboardPanel.activate();
						}
					}
				// check for updates
			  	} else if (findResult && findResult.attributes._rev !== change.doc._rev){
					//Update the existing model and collection.
					// The ugly hack of manually calling "parse" below is necessary since enyo doesn't call the model's "parse" on a merge.
					this.get("optionCollection").add(new lumberjack.OptionModel().parse(change.doc), {merge: true});
					this.get("optionCollection").sort(sortByDateIssuedFunction);

					if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
						this.$.dashboardPanel.activate();
					}
					else if (this.$.dataPanels.getActive() === this.$.optionDetailPanel) {
						if (this.$.optionDetailPanel.get("activeEntry").get("_id") === findResult.get("_id"))
						{
							alertify.success("Entry Updated");
							this.$.optionDetailPanel.activate(findResult);
						}
					}
				// check for new records
		  	  	} else if (change && change.doc._deleted !== true && findResult === undefined){
					if (change.doc._id.indexOf("_design") !== -1) {
						//Do nothing - just ignore it.
					}
					else
					{
						this.addNewOption(change.doc);
					}
				} else {
					//console.log("change didn't trigger");
				}
			}
		}));

		this.get("changesFeed").on('error', enyo.bind(this, function (err) {
			console.log("Changes feed error, retrying", err);
		}));
	},

	addNewOption:function(option)
	{
		var sortByDateIssuedFunction = function(a,b){
			if(a === null || a === undefined){return 1;}
			if(b === null || b === undefined){return -1;}
			if(a.get("dateIssued") < b.get("dateIssued")) {return -1;}
			if(a.get("dateIssued") > b.get("dateIssued")) {return 1;}
			return 0;
		};

		var holderContactInfoMap = this.get("holderContactInfoMap");

		if(holderContactInfoMap[option.holderContactID]){
			var contactInfo = holderContactInfoMap[option.holderContactID];
			option.holderDisplayName = contactInfo.contactName;
			this.get("optionCollection").add(option);
			this.get("optionCollection").sort(sortByDateIssuedFunction);

			if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
				alertify.success("Entry Added");
				this.$.dashboardPanel.activate();
			}
		}else{
			var contactID = option.holderContactID;
			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + "findcontactbyid",
				cacheBust: false,
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			request.error(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();
				alertify.error("Failed to get updated contact");
				console.log(request);
				if(response === 401){
					this.doLogout();
					return;
				}
			}));

			request.response(enyo.bind(this, function(request, response) {
				//this.$.loadingPopup.hide();
				if (response.error)
				{
					alertify.error("Failed to get updated contact");
					option.holderDisplayName = "Name Not Found";
				}
				else
				{
					option.holderDisplayName = response.record.contactName;
					option.holderEmail = response.record.emailAddress;
					option.holderPhone = response.record.phoneNumber;
					this.get("optionCollection").add(option);
				}

				if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
					alertify.success("Entry Added");
					this.$.dashboardPanel.activate();
				}
			}));

			request.go({
				companyID: lumberjack.preferences.get("company"),
				searchID: contactID
			});
		}
	}
});