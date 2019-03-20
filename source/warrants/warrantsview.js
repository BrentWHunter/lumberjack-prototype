enyo.kind({
	name: "quantum.WarrantsView",
	kind: "FittableRows",
	fit: true,
	_reportWindow: null,

	handlers: {
		onGoBack: "handleGoBack",
		onGoHome: "handleGoHome",
		onViewItemDetail: "handleViewItemDetail",
		onViewItemDetailById: "handleViewItemDetailById",
		onPromptSaveRequired: "handlePromptSaveRequired",
		onAddTransaction: "handleAddTransaction",
		onViewTransaction: "handleViewTransaction"
	},

	events: {
		onChangeCompany: "",
		onLogout: "",
		onRequestChangeModule: ""
	},

	published: {
		database: null,
		contactDatabase: null,
		warrantCollection: null,
		holderContactMap: null,
		unassignedPayments: null,
		changesFeed: null,

		// This one is loaded only if the page is launched from another page. IE. The digital minute book.
		targetWarrant: null
	},

	components:[
		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", style: "background: black; border: 1px solid black; padding: 0px 0px;", noStretch: true, components: [
			{kind: "onyx.MenuDecorator", style: "margin: 0 10px 0 0; padding: 10px;", classes: "breadcrumb modules-breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/modules-button-icon.png"},
				{kind: "quantum.IconMenu", onChangeModule: "handleChangeModule"}
			]},
			{kind: "enyo.Image", style: "height: 40px;", src: "assets/logo.png"},
			{name: "companyName", style: "color: white; margin-left: 15px; font-size: 24px; font-family: Tahoma, sans-serif;"},
			{fit: true},
			{style: "margin: 0; padding: 10px;", classes: "breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/list-button-icon.png", ontap: "dashboardButtonTapped"}
			]},
			{kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					{content: "Add Warrant", onSelect: "addWarrantButtonTapped", showing: false, name: "addWarrantMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "quantum.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Warrants Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "quantum.WarrantsDashboardPanel"},
			{name: "addWarrantPanel", kind: "quantum.WarrantDetailPanel", mode: "add"},
			{name: "warrantDetailPanel", kind: "quantum.WarrantDetailPanel", mode: "edit"},
			{name: "addTransactionPanel", kind: "quantum.WarrantTransactionPanel", mode: "add"},
			{name: "pendingTransactionDetailPanel", kind: "quantum.WarrantTransactionPanel", mode: "pending"},
			{name: "cancelledTransactionDetailPanel", kind: "quantum.WarrantTransactionPanel", mode: "cancelled"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		// Dashboard panel:
		{from: ".database", to: ".$.dashboardPanel.database"},
		{from: ".warrantCollection", to: ".$.dashboardPanel.warrantCollection"},
		{from: ".holderContactMap", to: ".$.dashboardPanel.holderContactMap"},
		{from: ".unassignedPayments", to: ".$.dashboardPanel.unassignedPayments"},

		// Add Warrant panel:
		{from: ".database", to: ".$.addWarrantPanel.database"},
		{from: ".warrantCollection", to: ".$.addWarrantPanel.warrantCollection"},
		{from: ".holderContactMap", to: ".$.addWarrantPanel.holderContactMap"},

		// Warrant Detail panel:
		{from: ".database", to: ".$.warrantDetailPanel.database"},
		{from: ".warrantCollection", to: ".$.warrantDetailPanel.warrantCollection"},
		{from: ".holderContactMap", to: ".$.warrantDetailPanel.holderContactMap"},

		// Add Transaction panel:
		{from: ".database", to: ".$.addTransactionPanel.database"},
		{from: ".holderContactMap", to: ".$.addTransactionPanel.holderContactMap"},
		{from: ".$.warrantDetailPanel.activeEntry", to: ".$.addTransactionPanel.activeEntry"},

		// Pending Transaction Detail panel:
		{from: ".database", to: ".$.pendingTransactionDetailPanel.database"},
		{from: ".holderContactMap", to: ".$.pendingTransactionDetailPanel.holderContactMap"},
		{from: ".$.warrantDetailPanel.activeEntry", to: ".$.pendingTransactionDetailPanel.activeEntry"},

		// Cancelled Transaction Detail panel:
		{from: ".database", to: ".$.cancelledTransactionDetailPanel.database"},
		{from: ".holderContactMap", to: ".$.cancelledTransactionDetailPanel.holderContactMap"},
		{from: ".$.warrantDetailPanel.activeEntry", to: ".$.cancelledTransactionDetailPanel.activeEntry"}
	],

	handleGoBack: function(inSender, inEvent)
	{
		var breadcrumb = this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 2];
		var breadcrumbType = breadcrumb.get("type");

		switch (breadcrumbType)
		{
			case "dashboard":
				this.dashboardButtonTapped();
				break;
			case "warrantDetail":
				this.navigateToWarrantFromTransaction(inSender, inEvent, breadcrumb);
				break;
			default:
				this.dashboardButtonTapped();
				break;
		}

		// Stop further DOM event bubbling.
		return true;
	},

	handleGoHome: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "warrant"))
		{
			quantum.preferences.set("lastModule", "");
			quantum.preferences.commit();
			this.doRequestChangeModule();
		}
		else
		{
			this.clearBreadcrumbs(1);
			var panelName = "dashboardPanel";
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
			this.$[panelName].activate();
		}

		// Stop further DOM event bubbling.
		return true;
	},

	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "warrant")) { return true; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "warrantDetail", icon: "assets/icons/warrants-icon.png", content: "Warrant Detail", ontap: "warrantDetailBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		var panelName = "warrantDetailPanel";
		this.$[panelName].set("warrantCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
		this.$[panelName].activate(inEvent.item);

		// Stop further DOM event bubbling.
		return true;
	},

	handleViewItemDetailById: function(inSender, inEvent)
	{
		inEvent.item = this.get("warrantCollection").find(function(element, index, array) {
			return element.get("_id") === inEvent.id;
		});
		inEvent.collection = new quantum.WarrantCollection([]);

		// Clear the last breadcrumb before a new one is added.
		this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.length - 1);

		this.handleViewItemDetail(inSender, inEvent);

		// Stop further DOM event bubbling.
		return true;
	},

	handlePromptSaveRequired: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], "warrant")) { return true; }

		if (this.$.saveChangesPopup != null)
		{
			this.$.saveChangesPopup.hide();
			this.$.saveChangesPopup.destroy();
		}
		var _panel = this.$.dataPanels.getActive();
		if (_panel === this.$.addWarrantPanel || _panel === this.$.warrantDetailPanel || _panel === this.$.addTransactionPanel || _panel === this.$.pendingTransactionDetailPanel)
		{
			if (_panel.canEdit() && _panel.isDirty())
			{
				this.createComponent({name: "saveChangesPopup", kind: "quantum.ConfirmPopup", onYesWithReturnValue: "executeReturnValue_yes", onNoWithReturnValue: "executeReturnValue_no", onHide: "handlePopupHidden"}, {owner:this});
				this.$.saveChangesPopup.show("Changes must be saved before proceeding. Save changes now?", {
					yes: function() { _panel.handleSaveEntryButtonTapped(inSender, inEvent, {callback:inEvent.callback}); },
					no: function() {}
				});
			}
			else { inEvent.callback(inSender, inEvent); }
		}
		else { inEvent.callback(inSender, inEvent); }

		// Stop further DOM event bubbling.
		return true;
	},

	handleAddTransaction: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], "warrant")) { return true; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "addTransaction", icon: "assets/icons/add-warrant-icon.png", content: "Add Transaction", ontap: "addTransactionBreadcrumbTapped", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			var panelName = "addTransactionPanel";
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
			this.$[panelName].activate(new quantum.WarrantTransactionModel({}));
		}));

		// Stop further DOM event bubbling.
		return true;
	},

	handleViewTransaction: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "warrant")) { return true; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			var panelName;
			if (inEvent.mode === "pending")
			{
				panelName = "pendingTransactionDetailPanel";
			}
			else if (inEvent.mode === "cancelled")
			{
				panelName = "cancelledTransactionDetailPanel";
			}
			else
			{
				alertify.error("Unexpected transaction mode.");
				return;
			}
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "transactionDetail", icon: "assets/icons/warrants-icon.png", content: "Transaction Detail", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
			this.$[panelName].activate(inEvent.item);
		}));

		// Stop further DOM event bubbling.
		return true;
	},

	setShowingForRoles: function()
	{
		this.$.addWarrantMenuItem.set("showing", quantum.hasRole(["admins"], "warrant"));
	},

	rendered: function(inSender, inEvent)
	{
		this.set("showing", false);
		this.set("database", new PouchDB(quantum.preferences.get("server") + quantum.preferences.get("warrantDatabase"), {skip_setup: true}));
		this.set("contactDatabase", new PouchDB(quantum.preferences.get("server") + quantum.preferences.get("contactDatabase"), {skip_setup: true}));
		this.$.versionString.set("content", quantum.versionString);
		this.$.companyName.set("content", quantum.preferences.get("companyName"));
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
		this.inherited(arguments);
		quantum.fixShim();
		this.setShowingForRoles();
		this.resize();
		this.$.loadingPopup.show();
		this.populateWarrants(enyo.bind(this, function() {
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
			quantum.preferences.set("lastModule", "warrant");
			quantum.preferences.commit();
			if (this.get("targetWarrant"))
			{
				var filteredCollection = this.get("warrantCollection").filter(enyo.bind(this, function(value, index, array) {
					return value.get("_id") === this.get("targetWarrant");
				}));

				filteredCollection = new quantum.WarrantCollection(filteredCollection);

				if (filteredCollection.length > 0)
				{
					this.handleViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
				}
			}
		}));
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

	dashboardButtonTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			var panelName = "dashboardPanel";
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
			this.$[panelName].activate();
		}));
	},

	addWarrantButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "warrant")) { return; }

		for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
		{
			if (this.$.breadcrumbToolbar.controls[i].type === "warrantDetail" ||
				this.$.breadcrumbToolbar.controls[i].type === "addWarrant")
			{
				this.clearBreadcrumbs(i);
				break;
			}
		}

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "quantum.Breadcrumb", type: "addWarrant", icon: "assets/icons/add-warrant-icon.png", content: "Add Warrant", ontap: "addWarrantBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		var panelName = "addWarrantPanel";
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
		this.$[panelName].activate(new quantum.WarrantModel({}));
	},

	addWarrantBreadcrumbTapped: function(inSender, inEvent)
	{
		this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
		this.addWarrantButtonTapped(inSender, inEvent);
	},

	navigateToWarrantFromTransaction: function(inSender, inEvent, breadcrumb)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			// Clear any breadcrumbs following this one then make the Warrant Detail Panel visible.
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(breadcrumb) + 1);
			var panelName = "warrantDetailPanel";
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName(panelName));
			this.$[panelName].activate(this.$[panelName].get("activeEntry"));
		}));
	},

	warrantDetailBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateToWarrantFromTransaction(inSender, inEvent, inSender);
	},

	executeReturnValue_yes: function(inSender, inEvent)
	{
		inEvent.returnValue.yes();
	},

	executeReturnValue_no: function(inSender, inEvent)
	{
		inEvent.returnValue.no();
	},

	navigateAway: function(inSender, inEvent, callback)
	{
		if (this.$.saveChangesPopup)
		{
			this.$.saveChangesPopup.hide();
			this.$.saveChangesPopup.destroy();
		}
		var _panel = this.$.dataPanels.getActive();
		if (_panel === this.$.addWarrantPanel || _panel === this.$.warrantDetailPanel || _panel === this.$.addTransactionPanel || _panel === this.$.pendingTransactionDetailPanel)
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

	clearBreadcrumbs: function(index)
	{
		for (var i = index; i < this.$.breadcrumbToolbar.controls.length; i)
		{
			this.$.breadcrumbToolbar.controls[i].destroy();
		}
		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", true);
	},

	parseWarrantContactIDs: function(warrant, holderContactMap)
	{
		var hasNewContactID = false;

		if (holderContactMap[warrant.holderContactID] == undefined)
		{
			holderContactMap[warrant.holderContactID] = null;
			hasNewContactID = true;
		}

		var parseTransactionsContactIDs = function(transactions) {
			if (Array.isArray(transactions))
			{
				transactions.forEach(function(transaction) {
					if (holderContactMap[transaction.contactID] == undefined)
					{
						holderContactMap[transaction.contactID] = null;
						hasNewContactID = true;
					}
				});
			}
		};
		parseTransactionsContactIDs(warrant.pendingTransactions);
		parseTransactionsContactIDs(warrant.cancelledTransactions);

		return hasNewContactID;
	},

	sortWarrants: function(a, b)
	{
		// This sort function can handle both Warrant model collections and Warrant arrays.
		var get = function(obj, property) {
			if (obj instanceof enyo.Model) { return obj.get(property); }
			else { return obj[property]; }
		};
		try
		{
			// First sort by date:
			var momentA = moment(get(a, "dateIssued"));
			var momentB = moment(get(b, "dateIssued"));
			if (momentA.isBefore(momentB, "day")) { return -1; }
			if (momentA.isAfter(momentB, "day")) { return 1; }
			// Then return 0:
			throw null;
		}
		catch (err) { return 0; }
	},

	populateWarrants: function(callback)
	{
		this.set("warrantCollection", null);
		this.set("unassignedPayments", null);
		this.set("holderContactMap", null);

		// Get data from database and load it into collection.
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
			if (err)
			{
				alertify.error("Login failed.");
				console.log(err);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				callback();
				return;
			}

			quantum.preferences.set("roles", response.roles);
			quantum.preferences.commit();

			this.get("database").query("onlyDocs", {include_docs: true}, enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("All docs get failed.");
					console.log(err);
					callback();
					return;
				}

				if (Array.isArray(response.rows) && response.rows.length > 0)
				{
					var rows = response.rows;
					var docs = [];
					var holderContactMap = {};

					for (var i = 0; i < rows.length; i++)
					{
						var row = rows[i].doc;
						if (row != null)
						{
							if (row._id === "unassignedPayments")
							{
								this.set("unassignedPayments", row);
							}
							else
							{
								docs.push(row);
								this.parseWarrantContactIDs(row, holderContactMap);
							}
						}
					}

					docs.sort(this.sortWarrants);

					this.set("warrantCollection", new quantum.WarrantCollection(docs));

					this.populateHolderContactMap(holderContactMap, enyo.bind(this, function(result) {
						if (result.err)
						{
							callback();
							return;
						}

						callback();
						this.updateChangesFeed();
					}));
				}
				else
				{
					this.set("warrantCollection", new quantum.WarrantCollection());
					this.set("holderContactMap", {});
					callback();
					this.updateChangesFeed();
				}
			}));
		}));
	},

	populateHolderContactMap: function(holderContactMap, callback)
	{
		this.get("contactDatabase").query("contactInfoBasic", {keys: Object.keys(holderContactMap)}, enyo.bind(this, function(err, response) {
			if (err)
			{
				alertify.error("Contact info get failed.");
				console.log(err);
				callback({err: true});
				return;
			}

			if (Array.isArray(response.rows) && response.rows.length > 0)
			{
				response.rows.forEach(function(row) {
					holderContactMap[row.id] = row.value;
				});

				this.set("holderContactMap", holderContactMap);
				callback({ok: true});
			}
			else
			{
				this.set("holderContactMap", {});
				callback({ok: true});
			}
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

		this.set("changesFeed", io(quantum.preferences.get("apiServer"), {
			query: {
				username: quantum.preferences.get("username"),
				password: quantum.preferences.get("password"),
				target: quantum.preferences.get("warrantDatabase")
			}
		}));

		this.get("changesFeed").on('change', enyo.bind(this, function(change) {
			// Find the changed doc in the collection.
			var findResult = this.get("warrantCollection").find(function(element) {
				return element.get("_id") === change.doc._id;
			});

			// Get the active panel.
			var activePanel = this.$.dataPanels.getActive();

			// Do some checks to determine if a panel that we care about here is currently active.
			var isDashboardPanel = activePanel === this.$.dashboardPanel;
			var isAddWarrantPanel = activePanel === this.$.addWarrantPanel;
			var isWarrantDetailPanel = activePanel === this.$.warrantDetailPanel;
			var isAddTransactionPanel = activePanel === this.$.addTransactionPanel;
			var isPendingTransactionDetailPanel = activePanel === this.$.pendingTransactionDetailPanel;
			var isCancelledTransactionDetailPanel = activePanel === this.$.cancelledTransactionDetailPanel;

			// Check for deleted records:
			if (change.deleted === true && findResult != undefined)
			{
				if (isWarrantDetailPanel || isAddTransactionPanel || isPendingTransactionDetailPanel || isCancelledTransactionDetailPanel)
				{
					if (findResult === activePanel.get("activeEntry"))
					{
						// Setting the "activeEntry" to null before navigating away prevents a prompt to save changes.
						activePanel.set("activeEntry", null);

						findResult.destroy();
						this.get("warrantCollection").sort(this.sortWarrants);
						alertify.message("Entry deleted from<br />another terminal.");

						if (isWarrantDetailPanel)
						{
							this.handleGoBack();
						}
						else if (isAddTransactionPanel || isPendingTransactionDetailPanel || isCancelledTransactionDetailPanel)
						{
							// Setting the "activeSubentry" to null before navigating away prevents a prompt to save changes.
							activePanel.set("activeSubentry", null);
							this.handleGoHome();
						}
					}
				}
				else if (isDashboardPanel)
				{
					var found = activePanel.get("filteredWarrantCollection").find(function(element) {
						return element === findResult;
					});

					findResult.destroy();
					this.get("warrantCollection").sort(this.sortWarrants);

					if (found != undefined)
					{
						alertify.message("Entry deleted from<br />another terminal.");
						activePanel.activate();
					}
				}
				else
				{
					findResult.destroy();
					this.get("warrantCollection").sort(this.sortWarrants);
				}
			}
			// Check for updated records:
			else if (change.deleted !== true && findResult != undefined && findResult.get("_rev") !== change.doc._rev)
			{
				var holderContactMap = JSON.parse(JSON.stringify(this.get("holderContactMap")));
				var updateHolderContactMap = this.parseWarrantContactIDs(change.doc, holderContactMap);

				// Update the existing model and collection.

				// The ugly hack of manually calling "parse" below is necessary since enyo doesn't call the model's "parse" on a merge.
				this.get("warrantCollection").add(new quantum.WarrantModel().parse(change.doc), {merge: true});
				this.get("warrantCollection").sort(this.sortWarrants);

				var refreshUI_update = enyo.bind(this, function() {
					if (isWarrantDetailPanel || isAddTransactionPanel || isPendingTransactionDetailPanel || isCancelledTransactionDetailPanel)
					{
						if (activePanel.get("activeEntry").get("_id") === findResult.get("_id"))
						{
							alertify.message("Entry updated from<br />another terminal.");

							if (isWarrantDetailPanel)
							{
								// If the current Warrant was updated, then re-activate the panel to ensure that its values are current.
								activePanel.activate(findResult);
							}
							else if (isAddTransactionPanel || isPendingTransactionDetailPanel || isCancelledTransactionDetailPanel)
							{
								// Call the Warrant Detail Panel's "activate" function to update the transaction panels via bindings.
								this.$.warrantDetailPanel.activate(findResult);

								var as = activePanel.get("activeSubentry");

								if (isAddTransactionPanel)
								{
									if (activePanel.get("newTransactionID") === as.get("_id"))
									{
										// Clear the "newTransactionID" since it is no longer needed.
										activePanel.set("newTransactionID", null);

										// Find the properly wrapped Transaction model that was just added to the collection.
										var found = activePanel.get("activeEntry").get("pendingTransactions").find(function(element) {
											return element.get("_id") === as.get("_id");
										});

										// Setting the "activeSubentry" to null before navigating away prevents a prompt to save changes.
										activePanel.set("activeSubentry", null);

										if (found != undefined)
										{
											// Clear the last breadcrumb before a new one is added.
											this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.length - 1);

											// Navigate to the detail panel for the new Transaction.
											this.handleViewTransaction({}, {item: found, mode: "pending"});
										}
										else
										{
											// If the new Transaction was not found, then go back instead.
											this.handleGoBack();
										}
									}
									else
									{
										// If a different Transaction was added, then just re-activate the panel to ensure that its values are all current.
										activePanel.activate(as);
									}
								}
								else if (isPendingTransactionDetailPanel || isCancelledTransactionDetailPanel)
								{
									var found = activePanel.get("transactionCollection").find(function(element) {
										return element.get("_id") === as.get("_id");
									});

									// Setting the "activeSubentry" to null before navigating away prevents a prompt to save changes.
									activePanel.set("activeSubentry", null);

									if (found != undefined)
									{
										// If the current Transaction was found, then re-activate the panel to ensure that its values are current.
										activePanel.activate(found);
									}
									else
									{
										// If the current Transaction was not found, then go back.
										this.handleGoBack();
									}
								}
							}
						}
					}
					else if (isDashboardPanel)
					{
						activePanel.activate();
					}
				});

				if (updateHolderContactMap)
				{
					this.populateHolderContactMap(holderContactMap, refreshUI_update);
				}
				else
				{
					refreshUI_update();
				}
			}
			// Check for new records:
			else if (change.deleted !== true && findResult == undefined)
			{
				var holderContactMap = JSON.parse(JSON.stringify(this.get("holderContactMap")));
				var updateHolderContactMap = false;

				if (change.doc._id === "unassignedPayments")
				{
					this.set("unassignedPayments", change.doc);
				}
				else if (change.doc._id.startsWith("_design/"))
				{
					// We don't care about changes to the design documents here.
					return;
				}
				else
				{
					this.get("warrantCollection").add(change.doc);
					this.get("warrantCollection").sort(this.sortWarrants);
					updateHolderContactMap = this.parseWarrantContactIDs(change.doc, holderContactMap);
				}

				var refreshUI_add = enyo.bind(this, function() {
					// Update the UI.
					if (isAddWarrantPanel)
					{
						if (activePanel.get("newWarrantID") === change.doc._id)
						{
							// Clear the "newWarrantID" since it is no longer needed.
							activePanel.set("newWarrantID", null);

							// Find the properly wrapped Warrant model that was just added to the collection.
							var found = this.get("warrantCollection").find(function(element) {
								return element.get("_id") === change.doc._id;
							});

							// Setting the "activeEntry" to null before navigating away prevents a prompt to save changes.
							activePanel.set("activeEntry", null);

							if (found != undefined)
							{
								// Clear the last breadcrumb before a new one is added.
								this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.length - 1);

								// Navigate to the detail panel for the new Warrant.
								this.handleViewItemDetail({}, {item: found, collection: this.get("warrantCollection")});
							}
							else
							{
								// If the new Warrant was not found, then go back instead.
								this.handleGoBack();
							}
						}
					}
					else if (isDashboardPanel)
					{
						alertify.message("Entry added from<br />another terminal.");
						activePanel.activate();
					}
				});

				if (updateHolderContactMap)
				{
					this.populateHolderContactMap(holderContactMap, refreshUI_add);
				}
				else
				{
					refreshUI_add();
				}
			}
		}));

		this.get("changesFeed").on('error', enyo.bind(this, function (err) {
			console.log("Changes feed error", err);
		}));
	}
});