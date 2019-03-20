enyo.kind({
	name: "lumberjack.Application",
	kind: "enyo.Application",
	view: "lumberjack.LoginView",

	handlers: {
		onLoginSuccessful: "handleModeSwitch",
		onChangeCompany: "handleChangeCompany",
		onSetViewToReport: "handleSetViewToReport",
		onChangeModule: "handleChangeModule",
		onViewEventDetail: "handleViewEventDetail",
		onRequestChangeModule: "handleRequestChangeModule",
		onLogout: "handleLogout"
	},

	clearChangesFeed: function() {
		var oldView = this.get("view");

		//Clear the old changes feed if present
		if (oldView.get("changesFeed") && (oldView.get("changesFeed").cancel || oldView.get("changesFeed").close))
		{
			if (oldView.get("changesFeed").close)
			{
				oldView.get("changesFeed").close();
			}
			else
			{
				oldView.get("changesFeed").cancel();
			}
			oldView.set("changesFeed", null);
		}

		oldView.destroy();
	},

	loadCompanies: function(companyID, mode, target, record) {
		var request = new enyo.Ajax({
		  url: lumberjack.preferences.get("apiServer") + "getcompanies",
		  cacheBust: false
		});

		request.error(enyo.bind(this, function(request, response){
			console.log("Twilight Error", request, response);
			if(response == 401){
				this.handleLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			var company = null;
			for(var i = 0; i<response.companies.length; i++)
			{
				if(response.companies[i].companyID === companyID)
				{
					company = response.companies[i];
					break;
				}
			}

			if(company === null)
			{
				this.handleChangeCompany();
				return;
			}

			this.setupCompany(company);

			this.handleChangeModule({}, {target: mode, targetDetail: target, record: record});

			//Don't commit lumberjack.preferences because it breaks something and forces you to the login screen
			this.render();
		}));

		request.go({username: lumberjack.preferences.get("username"), password: lumberjack.preferences.get("password")});
	},

	handleModeSwitch: function(inSender, inEvent) {
		if (inEvent.mode === "report" || (this.getQueryVariable("report") && this.getQueryVariable("report") == 1))
		{
			this.handleSetViewToReport();
		}
		else if (this.getQueryVariable("mode") && this.getQueryVariable("target"))
		{
			this.handleChangeModule({}, {target: this.getQueryVariable("mode"), targetDetail: this.getQueryVariable("target"), record: this.getQueryVariable("record") || null});
		}
		else if(this.getQueryVariable("company"))
		{
			this.loadCompanies(this.getQueryVariable("company"), this.getQueryVariable("mode"), this.getQueryVariable("target"), this.getQueryVariable("record"));
		}
		else if(lumberjack.preferences.get("lastModule"))
		{
			this.handleChangeModule({}, {target: lumberjack.preferences.get("lastModule")});
		}
		else
		{
			this.handleChangeCompany();
		}
		history.replaceState(null, "", location.href.split("?")[0]); //Clear the query string to prevent abuse a little bit.
		this.render();
	},

	handleChangeCompany: function(inSender, inEvent)
	{
		inEvent = inEvent || {};
		if (this.$.selectCompanyPopup) {this.$.selectCompanyPopup.hide();}
		if (this.$.selectCompanyPopup) {this.$.selectCompanyPopup.destroy();}
		this.view.createComponent({
			name: "selectCompanyPopup",
			kind: "lumberjack.SelectCompanyPopup",
			onCompanySelected: "handleCompanySelected",
			onCancel: inEvent.allowCancel ? "" : "handleRequiredPopupCancelled",
			onHide: "handlePopupHidden"},
		{owner:this});
		this.$.selectCompanyPopup.show(inEvent.allowCancel);
	},

	handleChangeModule: function(inSender, inEvent){
		this.clearChangesFeed();

		if (inEvent.target === "placement" || inEvent.target === "placements")
		{
			this.set("view", new lumberjack.PlacementView({owner:this, targetPlacement: inEvent.targetDetail || null, targetSubscriber: inEvent.record || null}));
		}
		else if (inEvent.target === "transfer" || inEvent.target === "transfers")
		{
			this.set("view", new lumberjack.TransferView({owner:this, targetTransfer: inEvent.targetDetail || null}));
		}
		else if (inEvent.target === "contact" || inEvent.target === "contacts")
		{
			this.set("view", new lumberjack.ContactsView({owner:this, targetContact: inEvent.targetDetail || null}));
		}
		else if (inEvent.target === "option"|| inEvent.target === "options")
		{
			this.set("view", new lumberjack.OptionsView({owner:this, targetOption: inEvent.targetDetail || null}));
		}
		else if (inEvent.target === "warrant" || inEvent.target === "warrants")
		{
			this.set("view", new lumberjack.WarrantsView({owner:this, targetWarrant: inEvent.targetDetail || null}));
		}
		else if (inEvent.target === "proxy" || inEvent.target === "proxies")
		{
			this.set("view", new lumberjack.ProxyView({owner:this, targetProxy: inEvent.targetDetail || null, targetRecord: inEvent.record || null}));
		}
		else if (inEvent.target === "reservation" || inEvent.target === "reservations")
		{
			this.set("view", new lumberjack.ReservationView({owner:this, targetReservation: inEvent.targetDetail || null}));
		}
		else
		{
			this.set("view", new lumberjack.LoginView({owner:this}));
		}

		this.render();
	},

	handleCompanySelected: function(inSender, inEvent)
	{
		var company = inEvent.company;
		this.setupCompany(company);
		lumberjack.preferences.commit({success: enyo.bind(this, function(){
			if (this.$.selectCompanyPopup) {this.$.selectCompanyPopup.hide();}
			if (lumberjack.preferences.get("lastModule"))
			{
				this.handleChangeModule({}, {target: lumberjack.preferences.get("lastModule")});
			}
			else
			{
				this.handleRequestChangeModule();
			}
		})});
	},

	handleLogout: function(){
		if (this.$.loadingPopup) {this.$.loadingPopup.hide();}
		if (this.$.loadingPopup) {this.$.loadingPopup.destroy();}
		this.view.createComponent({
			name: "loadingPopup",
			kind: "lumberjack.LoadingPopup",
			onHide: "handlePopupHidden"},
		{owner:this});
		this.get("view").hide();
		history.replaceState(null, "", location.href.split("?")[0]); //Clear the query string to prevent abuse a little bit.
		this.$.loadingPopup.show("Logging Out");
		setTimeout(function() {
			lumberjack.preferences.destroy({commit: true, success: function() {
				location.reload();
			}});
		}, 100);
	},

	handleRequestChangeModule: function(inSender, inEvent)
	{
		if (this.$.selectModulePopup) {this.$.selectModulePopup.hide();}
		if (this.$.selectModulePopup) {this.$.selectModulePopup.destroy();}
		this.view.createComponent({
			name: "selectModulePopup",
			kind: "lumberjack.SelectModulePopup",
			onChangeModule: "handleChangeModule",
			onCancel: "handleChangeCompany",
			onHide: "handlePopupHidden"},
		{owner:this});
		this.$.selectModulePopup.show();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	},

	handleRequiredPopupCancelled: function(inSender, inEvent)
	{
		//If something has happened that broke one of the required popups, then re-render, and force a re-login.
		this.clearChangesFeed();
		this.set("view", new lumberjack.LoginView({owner:this}));
		this.render();
		return true;
	},

	handleViewEventDetail: function(inSender, inEvent)
	{
		if (this.get("eventDetailPage"))
		{
			this.get("eventDetailPage").close();
			this.set("eventDetailPage", null);
		}

		var targetURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=" + inEvent.mode + "&target=" + inEvent.target;

		if (inEvent.record)
		{
			targetURL = targetURL + "&record=" + inEvent.record;
		}

		var eventDetailWindow = window.open(targetURL);
		this.set("eventDetailPage", eventDetailWindow);
	},

	getQueryVariable: function (variable)
	{
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			   var pair = vars[i].split("=");
			   if(pair[0] == variable){return pair[1];}
		}
		return(false);
	},

	handleSetViewToReport: function()
	{
		this.clearChangesFeed();
		this.set("view", new lumberjack.ReportView({owner:this}));
		this.render();
	},

	setupCompany: function(company)
	{
		lumberjack.preferences.set("company", company.companyID);
		lumberjack.preferences.set("companyName", company.name);
		lumberjack.preferences.set("contactDatabase", company.contactDatabase);
		lumberjack.preferences.set("optionDatabase", company.optionDatabase);
		lumberjack.preferences.set("reservationDatabase", company.reservationDatabase);
		lumberjack.preferences.set("transferDatabase", company.transferDatabase);
		lumberjack.preferences.set("warrantDatabase", company.warrantDatabase);
		lumberjack.preferences.set("proxies", company.proxies);
		lumberjack.preferences.set("placements", company.placements);
		lumberjack.preferences.set("proxyDatabase", null);
		lumberjack.preferences.set("placementDatabase", null);

		if (company.placements.length === 1)
		{
			lumberjack.preferences.set("placementDatabase", company.placements[0]);
		}
		else
		{
			lumberjack.preferences.set("placementDatabase", null);
		}

		if (company.proxies.length === 1)
		{
			lumberjack.preferences.set("proxyDatabase", company.proxies[0]);
		}
		else
		{
			lumberjack.preferences.set("proxyDatabase", null);
		}
	}
});

var lumberjack;

lumberjack.fixShim = function()
{
	//This works around a bug where the shim is sometimes not shown correctly the first time that we have a dialog over a dialog.
	var loadingPopup = new lumberjack.LoadingPopup();
	loadingPopup.show();
	loadingPopup.hide();
	loadingPopup.destroy();
};

lumberjack.subscriptionStatusLookup = function(status)
{
	switch(status)
	{
		case "incompleteDocsNoFunds":
			return "Incomplete Docs, No Funds";
		case "incompleteDocsPartialFunds":
			return "Incomplete Docs, Partial Funds";
		case "incompleteDocsAllFunds":
			return "Incomplete Docs, All Funds";
		case "completeDocsNoFunds":
			return "Complete Docs, No Funds";
		case "completeDocsPartialFunds":
			return "Complete Docs, Partial Funds";
		case "complete":
			return "Complete";
		case "pendingCancellation":
			return "Pending Cancellation";
		case "cancelled":
			return "Cancelled";
		case "closed":
			return "Closed";
		case "new":
			return "New";
		default:
			return "Unknown";
	}
};

lumberjack.transferStatusLookup = function(status)
{
	switch(status)
	{
		case "docsOnly":
			return "Documents Only";
		case "fundsOnly":
			return "Funds Only";
		case "incompleteDocsAllFunds":
			return "Incomplete Docs, All Funds";
		case "completeDocsAndFunds":
			return "Documents And Funds Received";
		case "complete":
			return "Complete";
		case "cancelled":
			return "Cancelled";
		case "withLawyer":
			return "With Lawyer";
		case "withTransferAgent":
			return "With Transfer Agent";
		case "new":
			return "New";
		default:
			return "Unknown";
	}
};

lumberjack.warrantStatusLookup = function(status)
{
	switch(status)
	{
		case "new":
			return "New";
		case "active":
			return "Active";
		case "pendingTransaction":
			return "Active - Pending Transaction";
		case "exercised":
			return "Exercised";
		case "split":
			return "Split";
		case "exhausted":
			return "Exhausted";
		case "expired":
			return "Expired";
		default:
			return "Unknown";
	}
};

lumberjack.paymentTypeLookup = function(paymentType)
{
	switch(paymentType)
	{
		case "wire":
			return "Wire Payment";
		case "deposit":
			return "Deposit";
		case "eft":
			return "Electronic Funds Transfer";
		case "bankDraft":
			return "Bank Draft";
		case "cashiersCheck":
			return "Cashier's Check";
		case "moneyOrder":
			return "Money Order";
		case "personalCheck":
			return "Personal Check";
		case "corporateCheck":
			return "Corporate Check";
		case "debtConversion":
			return "Debt Conversion";
		case "refund":
			return "Refund";
		case "bankerror":
			return "Bank Error";
		default:
			return "Unknown";
	}
};

lumberjack.loadFile = function(url, callback){
	JSZipUtils.getBinaryContent(url,function(err,data){
		callback(null,data);
	});
};

lumberjack.hasRole = function(roles, module)
{
	try
	{
		var company = lumberjack.preferences.get("company");

		var assignedRoles = [];
		for (var i = 0; i < lumberjack.preferences.get("roles").length; i++)
		{
			if (lumberjack.preferences.get("roles")[i].startsWith(company))
			{
				assignedRoles.push(lumberjack.preferences.get("roles")[i]);
			}

			if(!module && roles.indexOf(lumberjack.preferences.get("roles")[i]) !== -1)
			{
				return true;
			}
		}

		for (var j in roles)
		{
			if (assignedRoles.indexOf(company + "-" + roles[j]) !== -1 || assignedRoles.indexOf(company + "-" + roles[j] + "-" + module) !== -1) //Test against both cases so that we are checking against admins as well as module permissions
			{
				return true;
			}
		}
	}
	catch (err)
	{
		console.log(err);
	}

	return false;
};

lumberjack.parseInt = function(value)
{
	try
	{
		// It's worth noting that due to how numeral works,
		// if the given number here has any decimal places,
		// it will be rounded to the nearest whole number, not truncated.
		var number = numeral(numeral(value).format("0")).value();
		if (typeof(number) === 'number' && isFinite(number))
		{
			return number;
		}
		else
		{
			throw null;
		}
	}
	catch (err)
	{
		if (err != null) { console.error({err: err, value: value}); }
		alertify.error("Failed to parse a finite integer from '" + value + "'.");
		return 0;
	}
};

lumberjack.parseFloat = function(value)
{
	try
	{
		// It's worth noting that due to how numeral works,
		// if the given number here has more than eight decimal places,
		// it will be rounded to the nearest eight decimal places, not truncated.
		var number = numeral(numeral(value).format("0[.]00000000")).value();
		if (typeof(number) === 'number' && isFinite(number))
		{
			return number;
		}
		else
		{
			throw null;
		}
	}
	catch (err)
	{
		if (err != null) { console.error({err: err, value: value}); }
		alertify.error("Failed to parse a finite float from '" + value + "'.");
		return 0;
	}
};

lumberjack.formatCurrency = function(value)
{
	return numeral(value).format("0,0[.]00[00]");
};

lumberjack.b64ToBlob = function(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
	var slice = byteCharacters.slice(offset, offset + sliceSize);

	var byteNumbers = new Array(slice.length);
	for (var i = 0; i < slice.length; i++) {
	  byteNumbers[i] = slice.charCodeAt(i);
	}

	var byteArray = new Uint8Array(byteNumbers);

	byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
};

lumberjack.dataURIToBlob = function (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
	  ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;

  // Old code
  // var bb = new BlobBuilder();
  // bb.append(ab);
  // return bb.getBlob(mimeString);
};

lumberjack.databaseSchemaVersion = "2.0.2";
lumberjack.serviceVersion = "1.7.22";
lumberjack.versionString = "Version " + lumberjack.serviceVersion + " - Copyright 2019 Greenhill Equity Solutions Ltd.";

enyo.ready(function () {
	try {
		google.charts.load('current', {'packages':['corechart']});
	}
	catch (e)
	{
		//if there's an error, it's probably already loaded.
	}
	lumberjack.preferences = new lumberjack.PreferencesModel();
	lumberjack.preferences.fetch({success: function(){new lumberjack.Application({name: "app"});}});

	// Set up audit "plugin".
	var pouchBulkDocs = PouchDB.prototype.bulkDocs;
	function validBulkDocs(body, options, callback)
	{
		if (typeof options == 'function')
		{
			callback = options;
			options = {};
		}

		if (Array.isArray(body))
		{
			var docs = body;
		}
		else
		{
			var docs = body.docs;
		}

		for (var i = 0; i < docs.length; i++)
		{
			//Delete old audit information
			if(docs[i].auditUser)
			{
				delete docs[i].auditUser;
			}
			if(docs[i].auditTime)
			{
				delete docs[i].auditTime;
			}
			docs[i].audit = {
				user: lumberjack.preferences.get("username"),
				timestamp: moment().valueOf(),
				databaseSchemaVersion: lumberjack.databaseSchemaVersion,
				service: "Quantum",
				serviceVersion: lumberjack.serviceVersion
			};
		}

		// All documents check out. Pass them to PouchDB.
		return pouchBulkDocs.call(this, docs, options, callback);
	}
	PouchDB.plugin({bulkDocs:validBulkDocs});
});
