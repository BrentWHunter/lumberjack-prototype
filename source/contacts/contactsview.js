enyo.kind({
	name: "lumberjack.ContactsView",
	kind: "FittableRows",
	fit: true,

	events: {
		onChangeCompany: "",
		onLogout: ""
	},

	published: {
		database: null,
		loadingData: false,
		contactCollection: null,
		localChange: null,
		targetContact: null, //This one is loaded only if the page is launched from another page. IE. The digital minute book.
		changesFeed: null
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
			{kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
				{content: "Add Contact", onSelect: "addContactButtonTapped", showing: false, name: "addContactMenuItem"},
				{classes: "onyx-menu-divider"},
				{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
					//TODO: Add CSV import section
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "lumberjack.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Contacts Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "lumberjack.ContactListPanel", onGoBack: "handleGoBack", onViewItemDetail: "handleViewItemDetail"},
			{name: "addContactPanel", kind: "lumberjack.ContactDetailPanel", mode: "add", onGoBack: "handleGoBack"},
			{name: "contactDetailPanel", kind: "lumberjack.ContactDetailPanel", onGoBack: "handleGoBack"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		//Dashboard Panel
		{from: ".contactCollection", to: ".$.dashboardPanel.contactCollection"},

		//Add Contact Panel
		{from: ".database", to: ".$.addContactPanel.database"},
		{from: ".contactCollection", to: ".$.addContactPanel.contactCollection"},

		//Contact Detail Panel
		{from: ".database", to: ".$.contactDetailPanel.database"}
	],

	setShowingForRoles: function()
	{
		this.$.addContactMenuItem.set("showing", lumberjack.hasRole(["admins"], "contact"));
	},

	rendered: function(inSender, inEvent){
		this.set("showing", false);
		this.set("database", new PouchDB(lumberjack.preferences.get("server") + lumberjack.preferences.get("contactDatabase"), {skip_setup: true}));
		this.$.versionString.set("content", lumberjack.versionString);
		this.$.companyName.set("content", lumberjack.preferences.get("companyName"));
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
		this.inherited(arguments);
		lumberjack.fixShim();
		this.setShowingForRoles();
		this.resize();
		this.$.loadingPopup.show();
		this.populateContacts(enyo.bind(this, function(){
			//this.setShowingForRoles();
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
			lumberjack.preferences.set("lastModule", "contact");
			lumberjack.preferences.commit();
			if (this.get("targetContact"))
			{
				var filteredCollection = this.get("contactCollection").filter(enyo.bind(this, function(value, index, array){
					return value.get("_id") === this.get("targetContact");
				}));

				filteredCollection = new lumberjack.ContactCollection(filteredCollection);

				if (filteredCollection.length > 0)
				{
					this.handleViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
				}
			}
		}));
	},

	addContactButtonTapped: function(inSender, inEvent){
		if (!lumberjack.hasRole(["admins","users"], "contact")) { return; }

		for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
		{
			if (this.$.breadcrumbToolbar.controls[i].type === "contactDetail" ||
				this.$.breadcrumbToolbar.controls[i].type === "addContact")
			{
				this.clearBreadcrumbs(i);
				break;
			}
		}

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "addContact", icon: "assets/icons/add-subscriber-icon.png", content: "Add Contact", ontap: "addContactBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("addContactPanel"));
		this.$.addContactPanel.activate(new lumberjack.ContactModel({}));
	},

	addContactBreadcrumbTapped: function(inSender, inEvent){
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.addContactButtonTapped(inSender, inEvent);
		}));
	},

	dashboardButtonTapped: function(inSender, inEvent){
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

	navigateAway: function(inSender, inEvent, callback)
	{
		if (this.$.saveChangesPopup)
		{
			this.$.saveChangesPopup.hide();
			this.$.saveChangesPopup.destroy();
		}
		var _panel = this.$.dataPanels.getActive();
		if (_panel === this.$.contactDetailPanel || _panel === this.$.addContactPanel)
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

	executeReturnValue_yes: function(inSender, inEvent)
	{
		inEvent.returnValue.yes();
	},

	executeReturnValue_no: function(inSender, inEvent)
	{
		inEvent.returnValue.no();
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

	handleLogout: function(inSender, inEvent){
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doLogout();
		}));
	},

	handleViewItemDetail: function(inSender, inEvent){
		if (!lumberjack.hasRole(["admins","users","auditors"], "contact")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "contactDetail", icon: "assets/icons/subscriber-detail-icon.png", content: "Contact Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.contactDetailPanel.set("contactCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("contactDetailPanel"));
		this.$.contactDetailPanel.activate(inEvent.item);
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doChangeCompany({allowCancel: true});
		}));
	},

	populateContacts: function(callback){
		this.set("contactCollection", null);

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

						if (rows[i].doc){
							if (rows[i].doc._id.indexOf("_design") !== -1) {
								//Do nothing - just ignore it.
							}
							else
							{
								docs.push(rows[i].doc);
							}
						}
					}

					var sortedDocs = docs.sort(function(a,b){
					 	//Sort by Name
					 	if(a.contactName !== undefined && b.contactName !== undefined)
					 	{
						 	if (a.contactName.toLowerCase() < b.contactName.toLowerCase()) {return -1;}
						    if (a.contactName.toLowerCase() > b.contactName.toLowerCase()) {return 1;}
						}
					    //Then return 0
					    return 0;
					});

					this.set("contactCollection", new lumberjack.ContactCollection(sortedDocs));
				}
				else
				{
					this.set("contactCollection", new lumberjack.ContactCollection());
				}

				callback();
				this.updateChangesFeed();
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
			if(a.get("contactName").toLowerCase() < b.get("contactName").toLowerCase()) {return -1;}
			if(a.get("contactName").toLowerCase() > b.get("contactName").toLowerCase()) {return 1;}
			return 0;
		};

		this.set("changesFeed", io(lumberjack.preferences.get("apiServer"), {
			query: {
				username: lumberjack.preferences.get("username"),
				password: lumberjack.preferences.get("password"),
				target: lumberjack.preferences.get("contactDatabase")
			}
		}));

		this.get("changesFeed").on('change', enyo.bind(this, function (change) {
			var findResult = this.get("contactCollection").find(enyo.bind(this, function(value, index, array){
				return value.attributes._id === change.doc._id;
			}));

			// check for deleted records
			if (change.deleted) {
				if (findResult) {
					if (this.$.dataPanels.getActive() === this.$.contactDetailPanel && findResult === this.$.contactDetailPanel.get("activeEntry")){
						findResult.destroy();
						this.get("contactCollection").sort(sortByDisplayNameFunction);

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
						this.get("contactCollection").sort(sortByDisplayNameFunction);
						this.$.dashboardPanel.activate();
					}
				}
			// check for updates
		  	} else if (findResult && findResult.attributes._rev !== change.doc._rev){
				//Update the existing model and collection.

				// The ugly hack of manually calling "parse" below is necessary since enyo doesn't call the model's "parse" on a merge.
				this.get("contactCollection").add(new lumberjack.ContactModel().parse(change.doc), {merge: true});
				this.get("contactCollection").sort(sortByDisplayNameFunction);

				if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
					this.$.dashboardPanel.activate();
				}
				else if (this.$.dataPanels.getActive() === this.$.contactDetailPanel) {
					if (this.$.contactDetailPanel.get("activeEntry").get("_id") === findResult.get("_id"))
					{
						alertify.success("Entry Updated");
						this.$.contactDetailPanel.activate(findResult);
					}
				}
			// check for new records
	  	  	} else if (change && change.doc._deleted !== true && findResult === undefined){
				if (change.doc._id.indexOf("_design") !== -1) {
						//Do nothing - just ignore it.
				}
				else
				{
					this.get("contactCollection").add(change.doc);
					this.get("contactCollection").sort(sortByDisplayNameFunction);
				}

				if (this.$.dataPanels.getActive() === this.$.dashboardPanel) {
					alertify.success("Entry Added");
					this.$.dashboardPanel.activate();
				}
			} else {
				//console.log("change didn't trigger");
			}
		}));

		this.get("changesFeed").on('error', enyo.bind(this, function (err) {
			console.log("Changes feed error, retrying", err);
		}));
	}
});