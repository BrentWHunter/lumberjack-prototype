enyo.kind({
	name: "lumberjack.TransferView",
	kind: "FittableRows",
	fit: true,
	_reportWindow: null,

	events: {
		onChangeCompany: "",
		onLogout: ""
	},

	published: {
		database: null,
		loadingData: false,
		transferCollection: null,
		unassignedPayments: null,
		localChange: null,
		changesFeed: null,
		principals: null,
		lawFirms: null,
		poaRecipients: null,
		approvers: null,

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
				{kind: "onyx.IconButton", src: "assets/icons/list-button-icon.png", ontap: "transfersButtonTapped"}
			]},
			{kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					{content: "Create Transfer", onSelect: "createTransferMenuItemTapped", showing: false, name: "createTransferMenuItem"},
					{classes: "onyx-menu-divider"},
					{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
		{name: "breadcrumbToolbar", kind: "onyx.Toolbar", style: "background: #333333; border: none; padding: 0;", components: [
			{kind: "lumberjack.Breadcrumb", type: "dashboard", icon: "assets/icons/home-icon.png", content: "Transfers Home", last: true, ontap: "dashboardButtonTapped"}
		]},
		{name: "dataPanels", kind: "enyo.Panels", fit: true, draggable: false, components: [
			{name: "dashboardPanel", kind: "lumberjack.TransferDashboardPanel", onGoBack: "handleGoBack", onViewItemDetail: "handleViewItemDetail"},
			{name: "listPanel", kind: "lumberjack.TransferListPanel", onViewItemDetail: "handleViewItemDetail", onCreateNewTransfer: "createTransferButtonTapped"},
			{name: "createTransferPanel", kind: "lumberjack.TransferDetailPanel", mode: "add", onGoBack: "handleGoBack"},
			{name: "transferDetailPanel", kind: "lumberjack.TransferDetailPanel", onGoBack: "handleGoBack"}
		]},
		{kind: "onyx.Toolbar", style: "background: #333333; border: 1px solid #333333;", components: [
			{name: "versionString", style: "font-size: 10px; text-align: center; width: 100%;"}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		//Dashboard Panel
		{from: ".database", to: ".$.dashboardPanel.database"},
		{from: ".transferCollection", to: ".$.dashboardPanel.transferCollection"},

		//Create Transfer Panel
		{from: ".database", to: ".$.createTransferPanel.database"},
		{from: ".principals", to: ".$.createTransferPanel.principals"},
		{from: ".lawFirms", to: ".$.createTransferPanel.lawFirms"},
		{from: ".poaRecipients", to: ".$.createTransferPanel.poaRecipients"},
		{from: ".approvers", to: ".$.createTransferPanel.approvers"},
		{from: ".transferCollection", to: ".$.createTransferPanel.transferCollection"},

		//Transfer List Panel
		{from: ".transferCollection", to: ".$.listPanel.transferCollection"},

		//Transfer Detail Panel
		{from: ".database", to: ".$.transferDetailPanel.database"},
		{from: ".principals", to: ".$.transferDetailPanel.principals"},
		{from: ".lawFirms", to: ".$.transferDetailPanel.lawFirms"},
		{from: ".poaRecipients", to: ".$.transferDetailPanel.poaRecipients"},
		{from: ".approvers", to: ".$.transferDetailPanel.approvers"}
	],

	setShowingForRoles: function()
	{
		this.$.createTransferMenuItem.set("showing", lumberjack.hasRole(["admins"], "transfer"));
	},

	rendered: function(inSender, inEvent)
	{
		this.set("showing", false);
		this.set("database", new PouchDB(lumberjack.preferences.get("server") + lumberjack.preferences.get("transferDatabase"), {skip_setup: true}));
		this.$.versionString.set("content", lumberjack.versionString);
		this.$.companyName.set("content", lumberjack.preferences.get("companyName"));
    	this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel")); //Workaround for "wrong" panel being set when the view is loaded.
		this.inherited(arguments);
		lumberjack.fixShim();
		this.setShowingForRoles();
		this.resize();
		this.$.loadingPopup.show();
		this.populateTransfers(enyo.bind(this, function() {
			//this.setShowingForRoles();
			this.set("showing", true);
			this.$.loadingPopup.hide();
			this.dashboardButtonTapped();
			this.resize();
			lumberjack.preferences.set("lastModule", "transfer");
			lumberjack.preferences.commit();
			if (this.get("targetTransfer"))
			{
				var filteredCollection = this.get("transferCollection").filter(enyo.bind(this, function(value, index, array){
					return value.get("_id") === this.get("targetTransfer");
				}));

				filteredCollection = new lumberjack.TransferCollection(filteredCollection);

				if (filteredCollection.length > 0)
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
		if (_panel === this.$.transferDetailPanel || _panel === this.$.createTransferPanel)
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

	createTransferButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "transfer")) { return; }

		for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
		{
			if (this.$.breadcrumbToolbar.controls[i].type === "transferDetail" ||
				this.$.breadcrumbToolbar.controls[i].type === "createTransfer")
			{
				this.clearBreadcrumbs(i);
				break;
			}
		}

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "createTransfer", icon: "assets/icons/create-transfer-icon.png", content: "Create Transfer", ontap: "createTransferBreadcrumbTapped", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("createTransferPanel"));
		this.$.createTransferPanel.activate(null);
	},

	createTransferBreadcrumbTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(this.$.breadcrumbToolbar.controls.indexOf(inSender));
			this.createTransferButtonTapped(inSender, inEvent);
		}));
	},

	createTransferMenuItemTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.createTransferButtonTapped(inSender, inEvent);
		}));
	},

	dashboardButtonTapped: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.clearBreadcrumbs(1);
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("dashboardPanel"));
			this.$.dashboardPanel.activate();
		}));
	},

	transfersButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "transfer")) { return; }

		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			for (var i = 0; i < this.$.breadcrumbToolbar.controls.length; i++)
			{
				if (
					this.$.breadcrumbToolbar.controls[i].type === "transferDetail" ||
					this.$.breadcrumbToolbar.controls[i].type === "transfers" ||
					this.$.breadcrumbToolbar.controls[i].type === "createTransfer"
				){
					this.clearBreadcrumbs(i);
					break;
				}
			}
			this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
			this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "transfers", icon: "assets/icons/list-icon.png", content: "Transfers", ontap: "transfersBreadcrumbTapped", last: true}, {owner: this});
			this.$.breadcrumbToolbar.render();
			this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("listPanel"));
			this.$.listPanel.activate();
		}));
	},

	transfersBreadcrumbTapped: function(inSender, inEvent)
	{
		this.transfersButtonTapped(inSender, inEvent);
	},

	clearBreadcrumbs: function(index)
	{
		for (var i = index; i < this.$.breadcrumbToolbar.controls.length; i)
		{
			this.$.breadcrumbToolbar.controls[i].destroy();
		}
		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", true);
	},

	handleGoBack: function(inSender, inEvent)
	{
		var breadcrumb = this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 2];
		var breadcrumbType = breadcrumb.get("type");

		switch (breadcrumbType)
		{
			case "dashboard":
				this.dashboardButtonTapped();
				break;
			case "transfers":
				this.transfersBreadcrumbTapped();
				break;
			case "createTransfer":
				this.createTransferBreadcrumbTapped();
				break;
			default:
				this.dashboardButtonTapped();
		}
	},

	handleLogout: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doLogout();
		}));
	},

	handleViewItemDetail: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "transfer")) { return; }

		this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1].set("last", false);
		this.$.breadcrumbToolbar.createComponent({kind: "lumberjack.Breadcrumb", type: "transferDetail", icon: "assets/icons/transfer-detail-icon.png", content: "Transfer Detail", last: true}, {owner: this});
		this.$.breadcrumbToolbar.render();
		this.$.transferDetailPanel.set("transferCollection", inEvent.collection);
		this.$.dataPanels.setIndex(this.$.dataPanels.selectPanelByName("transferDetailPanel"));
		this.$.transferDetailPanel.activate(inEvent.item);
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		this.navigateAway(inSender, inEvent, enyo.bind(this, function()
		{
			this.doChangeCompany({allowCancel: true});
		}));
	},

	populateTransfers: function(callback)
	{
		this.set("transferCollection", null);
		this.set("unassignedPayments", null);
		this.set("lawFirms", null);
		this.set("principals", null);
		this.set("poaRecipients", null);
		this.set("approvers", null);

		//I wish that we could do await/async here, but no dice with Enyo, so we do it the old fashoned way :S
		//Load Lawyers so that we can populate the appropriate dropdowns
		var lawFirmsRequest = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "getlawfirms",
			cacheBust: false,
    		headers:{
   				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
   			}
		});

		lawFirmsRequest.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to populate transfers");
			console.log("Failed to load law firms", request, response);
			if(response === 401){
				this.doLogout();
				return;
			}
			callback();
			return;
		}));

		lawFirmsRequest.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				alertify.error("Failed to load law firms");
				console.log("Failed to load law firms", response);
				//Give the UI time to respond so that the user sees the error message before they are kicked back to the placements module.
				//Kick the user back to the placements module b/c that is our default. In Polymer, they should be kicked back to the dashboard.
				setTimeout(enyo.bind(this, function(){this.doChangeModule({target: "placements"});}), 1000);
				return;
			}
			else
			{
				this.set("lawFirms", response.lawFirms);
				
				//Load the approvers so that we can populate the dropdown
				var approversRequest = new enyo.Ajax({
					url: lumberjack.preferences.get("apiServer") + "gettransferapprovers",
					cacheBust: false,
		    		headers:{
		   				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
		   			}
				});

				approversRequest.error(enyo.bind(this, function(request, response) {
					alertify.error("Failed to populate transfers");
					console.log("Failed to load approvers", request, response);
					if(response === 401){
						this.doLogout();
						return;
					}
					callback();
					return;
				}));

				approversRequest.response(enyo.bind(this, function(request, response) {
					if (response.error)
					{
						alertify.error("Failed to populate transfers");
						console.log("Failed to load approvers", response);
						callback();
						return;
					}
					else
					{
						this.set("approvers", response.approvers);

						//Load the POA Recipients so that we can populate the dropdown
						var poaRecipientsRequest = new enyo.Ajax({
							url: lumberjack.preferences.get("apiServer") + "getpoarecipients",
							cacheBust: false,
				    		headers:{
				   				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				   			}
						});

						poaRecipientsRequest.error(enyo.bind(this, function(request, response) {
							alertify.error("Failed to populate transfers");
							console.log("Failed to load POA recipients", request, response);
							if(response === 401){
								this.doLogout();
								return;
							}
							callback();
							return;
						}));

						poaRecipientsRequest.response(enyo.bind(this, function(request, response) {
							if (response.error)
							{
								alertify.error("Failed to populate transfers");
								console.log("Failed to load POA recipients", response);
								callback();
								return;
							}
							else
							{
								this.set("poaRecipients", response.poaRecipients);

								//Load the principals so that we can populate the dropdown
								var request = new enyo.Ajax({
									url: lumberjack.preferences.get("apiServer") + "getprincipals",
									cacheBust: false,
						    		headers:{
						   				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
						   			}
								});

								request.error(enyo.bind(this, function(request, response) {
									alertify.error("Failed to populate transfers");
									console.log("Failed to load principals", request, response);
									if(response === 401){
										this.doLogout();
										return;
									}
									callback();
									return;
								}));

								request.response(enyo.bind(this, function(request, response) {
									if (response.error)
									{
										alertify.error("Failed to populate transfers");
										console.log("Failed to load principals", response);
										callback();
										return;
									}
									else
									{
										this.set("principals", response.principals);
										//Get data from database and load it into collection
										this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

											this.get("database").query("onlyDocs", {include_docs: true}, enyo.bind(this, function(err, response) {
												if (err)
												{
													alertify.error("All docs get failed");
													console.log(err);
													callback();
													return;
												}

												var sortByTransactionDate = function(a, b) {
													var get = function(obj, property) {
														if (obj instanceof enyo.Model) { return obj.get(property); }
														else { return obj[property]; }
													};
													try
													{
														// First sort by date:
														if (moment(get(a,"transactionDate")).isBefore(moment(get(b,"transactionDate")), "day")) { return -1; }
														if (moment(get(a,"transactionDate")).isAfter(moment(get(b,"transactionDate")), "day")) { return 1; }
														// Then by seller:
														if (get(a,"seller").name.toLowerCase() < get(b,"seller").name.toLowerCase()) { return -1; }
														if (get(a,"seller").name.toLowerCase() > get(b,"seller").name.toLowerCase()) { return 1; }
														// Then by buyer:
														if (get(a,"buyer").name.toLowerCase() < get(b,"buyer").name.toLowerCase()) { return -1; }
														if (get(a,"buyer").name.toLowerCase() > get(b,"buyer").name.toLowerCase()) { return 1; }
														// Then return 0:
														throw null;
													}
													catch (err) { return 0; }
												};

												if (response.rows && response.rows.length > 0)
												{
													var rows = response.rows;
													var docs = [];

													for (var i = 0; i < rows.length; i++ )
													{

														if (rows[i].doc)
														{
															if (rows[i].doc._id === "unassignedPayments")
															{
																this.set("unassignedPayments", rows[i].doc);
															}
															else
															{
																if (!rows[i].doc.displayName)
																{
																	rows[i].doc.displayName = rows[i].doc.subscriberName;
																}
																docs.push(rows[i].doc);
															}
														}
													}

													var sortedDocs = docs.sort(sortByTransactionDate);

													this.set("transferCollection", new lumberjack.TransferCollection(docs));
												}
												else
												{
													this.set("transferCollection", new lumberjack.TransferCollection());
												}
												
												callback();
												this.updateChangesFeed();
											}));
										}));
									}
								}));

								request.go({
									companyID: lumberjack.preferences.get("company")
								});
							}
						}));
						
						poaRecipientsRequest.go({
							companyID: lumberjack.preferences.get("company")
						});
					}
				}));

				approversRequest.go({
					companyID: lumberjack.preferences.get("company")
				});
			}
		}));

		lawFirmsRequest.go({
			companyID: lumberjack.preferences.get("company")
		});
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

		var sortByTransactionDate = function(a, b) {
			var get = function(obj, property) {
				if (obj instanceof enyo.Model) { return obj.get(property); }
				else { return obj[property]; }
			};
			try
			{
				// First sort by date:
				if (moment(get(a,"transactionDate")).isBefore(moment(get(b,"transactionDate")), "day")) { return -1; }
				if (moment(get(a,"transactionDate")).isAfter(moment(get(b,"transactionDate")), "day")) { return 1; }
				// Then by seller:
				if (get(a,"seller").name.toLowerCase() < get(b,"seller").name.toLowerCase()) { return -1; }
				if (get(a,"seller").name.toLowerCase() > get(b,"seller").name.toLowerCase()) { return 1; }
				// Then by buyer:
				if (get(a,"buyer").name.toLowerCase() < get(b,"buyer").name.toLowerCase()) { return -1; }
				if (get(a,"buyer").name.toLowerCase() > get(b,"buyer").name.toLowerCase()) { return 1; }
				// Then return 0:
				throw null;
			}
			catch (err) { return 0; }
		};

		this.set("changesFeed", io(lumberjack.preferences.get("apiServer"), {
			query: {
				username: lumberjack.preferences.get("username"),
				password: lumberjack.preferences.get("password"),
				target: lumberjack.preferences.get("transferDatabase")
			}
		}));

		this.get("changesFeed").on('change', enyo.bind(this, function(change) {
			var findResult = this.get("transferCollection").find(function(element) {
				return element.attributes._id === change.doc._id;
			});
			// Check for deleted records:
			if (change.deleted && findResult)
			{
				if (this.$.dataPanels.getActive() === this.$.transferDetailPanel)
				{
					if (findResult === this.$.transferDetailPanel.get("activeEntry"))
					{
						findResult.destroy();
						this.get("transferCollection").sort(sortByTransactionDate);
						alertify.message("Entry deleted from<br />another terminal.");
						if (this.$.breadcrumbToolbar.controls.length - 2 > 0)
						{
							// Cheat a little bit. Trigger the ontap event for the breadcrumb prior to the active tab.
							this[this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 2].ontap](this.$.breadcrumbToolbar.controls[this.$.breadcrumbToolbar.controls.length - 1], {});
						}
						else
						{
							// If something goes wrong, just go back to the dashboard.
							this.dashboardButtonTapped();
						}
					}
				}
				else if (this.$.dataPanels.getActive() === this.$.listPanel)
				{
					var found = this.$.listPanel.get("filteredTransferCollection").find(function(element) {
						return element === findResult;
					});
					if (found)
					{
						findResult.destroy();
						this.get("transferCollection").sort(sortByTransactionDate);
						alertify.message("Entry deleted from<br />another terminal.");
						this.$.listPanel.activate();
					}
					else
					{
						findResult.destroy();
						this.get("transferCollection").sort(sortByTransactionDate);
					}
				}
				else if (this.$.dataPanels.getActive() === this.$.dashboardPanel)
				{
					findResult.destroy();
					this.get("transferCollection").sort(sortByTransactionDate);
					this.$.dashboardPanel.activate();
				}
			}
			// Check for updated records:
			else if (findResult && findResult.attributes._rev !== change.doc._rev)
			{
				// Update the existing model and collection.

				// The ugly hack of manually calling "parse" below is necessary since enyo doesn't call the model's "parse" on a merge.
				// NOTE: Merge isn't guaranteed to work the way we want it to. 
				this.get("transferCollection").add(new lumberjack.TransferModel().parse(change.doc), {merge: true});
				this.get("transferCollection").sort(sortByTransactionDate);

				if (this.$.dataPanels.getActive() === this.$.transferDetailPanel)
				{
					if (this.$.transferDetailPanel.get("activeEntry").get("_id") === findResult.get("_id"))
					{
						alertify.message("Entry updated from<br />another terminal.");
						this.$.transferDetailPanel.activate(new lumberjack.TransferModel(change.doc));
					}
				}
				else if (this.$.dataPanels.getActive() === this.$.listPanel)
				{
					this.$.listPanel.activate();
				}
				else if (this.$.dataPanels.getActive() === this.$.dashboardPanel)
				{
					this.$.dashboardPanel.activate();
				}
			}
			// Check for new records:
			else if (change && change.doc._deleted !== true && findResult === undefined)
			{
				if (change.doc._id === "unassignedPayments")
				{
					this.set("unassignedPayments", change.doc);
				}
				else if (!change.doc._id.startsWith("_design/"))
				{
					this.get("transferCollection").add(change.doc);
					this.get("transferCollection").sort(sortByTransactionDate);
				}
				else { return; }
				// Update the UI.
				if (this.$.dataPanels.getActive() === this.$.transferDetailPanel)
				{
					// Do nothing.
				}
				else if (this.$.dataPanels.getActive() === this.$.listPanel)
				{
					alertify.message("Entry added from<br />another terminal.");
					this.$.listPanel.activate();
				}
				else if (this.$.dataPanels.getActive() === this.$.dashboardPanel)
				{
					alertify.message("Entry added from<br />another terminal.");
					this.$.dashboardPanel.activate();
				}
			}
		}));

		this.get("changesFeed").on('error', enyo.bind(this, function (err) {
			console.log("Changes feed error", err);
		}));
	},

	handleTransferSelected: function(inSender, inEvent)
	{
		lumberjack.preferences.commit({success: enyo.bind(this, function() {
			this.render();
		})});

		return true;
	}
});