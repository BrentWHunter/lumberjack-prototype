/* global quantum, numeral */
enyo.kind({
	name: "quantum.ProxyListPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	events: {
		onViewItemDetail: "",
		onGoHome: ""
	},

	published: {
		proxyCollection: null,
		filteredProxyCollection: null,
		filterColumn: "displayName",
		filterDirection: "asc"
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{style: "line-height: 38px; font-size: 18px;", content: "Search Proxies:"},
			{style: "margin-left: 10px; width: 350px;", kind: "onyx.InputDecorator", components: [
				{name: "searchInput", style: "width: 100%;", kind: "onyx.Input", oninput: "handleSearchInputChanged"}
			]},
			{style: "margin-left: 10px; line-height: 34px;", components: [
				{kind: "quantum.Button", style: "margin: 0;", content: "Clear Search", ontap: "handleClearSearchButtonTapped"}
			]}
		]},
		{name: "headerColumns", kind: "enyo.FittableColumns", style: "margin-top: 10px; background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black; min-width: 1490px;", components: [
			{content: "Shareholder Name  &uarr;", allowHtml: true, style: "width: 200px; cursor: pointer;", sortTarget: "displayName", ontap: "sortColumnTapped"},
			{content: "Contact Person ", allowHtml: true, style: "width: 150px; cursor: pointer;", sortTarget: "contactPerson", ontap: "sortColumnTapped"},
			{content: "Email Address ", allowHtml: true, style: "width: 250px; cursor: pointer;", sortTarget: "email", ontap: "sortColumnTapped"},
			{content: "Signature Status", style: "width: 150px;"},
			{content: "Number Of Shares ", allowHtml: true, style: "width: 150px; cursor: pointer;", sortTarget: "numShares", ontap: "sortColumnTapped"},
			{content: "Shareholder ID ", allowHtml: true, style: "width: 150px; cursor: pointer;", sortTarget: "shareholderID", ontap: "sortColumnTapped"},
			{content: "Date/Time Signed ", allowHtml: true, style: "width: 250px; margin-left: 17px; cursor: pointer;", sortTarget: "dateTimeSigned", ontap: "sortColumnTapped"}
		]},
		{name: "proxyRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black; min-width: 1490px;", onSetupItem: "setupProxyRepeaterItem", components: [
			{name: 'proxyItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleProxyRepeaterItemTapped", components: [
				{name: "displayName", style: "width: 200px;"},
				{name: "contactPerson", style: "width: 150px;"},
				{name: "email", style: "width: 250px;"},
				{name: "agreementSignatureStatus", style: "width: 145px; text-align: center; margin-right: 5px;", components: [
					{name: "agreementSignatureStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
				]},
				{name: "numShares", style: "width: 150px; text-align: right; margin-left: -15px; margin-right: 15px;"},
				{name: "shareholderID", style: "width: 150px; text-align: right; margin-right: 17px;"},
				{name: "dateTimeSigned", style: "width: 250px;"}
			]}
		]},
		{name: "noProxiesLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Proxies Found"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	setShowingForRoles: function()
	{
		//Nothing to do here.
	},

	activate: function()
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.scrollToTop();
		this.$.proxyRepeater.setCount(0);
		this.populateProxies();
		this.resize();
	},

	handleClearSearchButtonTapped: function(inSender, inEvent){
		this.$.searchInput.set("value", "");
		this.populateProxies();
		return;
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	handleSearchInputChanged: function(inSender, inEvent){
		this.startJob("throttleSearch", enyo.bindSafely(this, function(){this.populateProxies();}), 300);
	},

	/*******************
	* Main Repeater Section
	*******************/

	populateProxies: function(){
		var results = this.get("proxyCollection").filter(enyo.bind(this, function(value, index, array){
			var searchResultFound = false;

			if (this.$.searchInput.get("value") !== "")
			{
				var searchValue = this.$.searchInput.get("value").toLowerCase();
				if (value.get("contactName").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("contactPerson").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("email").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
				if (value.get("shareholderID").toLowerCase().indexOf(searchValue) !== -1) {searchResultFound = true;}
			}
			else
			{
				searchResultFound = true;
			}

			return searchResultFound;
		}));

		//Sort!
		var sortFunction = function() {return 0;};

		switch(this.get("filterColumn"))
		{
			case "displayName":
				sortFunction = function(a, b) {
					if(a.get("contactName").toLowerCase() < b.get("contactName").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("contactName").toLowerCase() > b.get("contactName").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "contactPerson":
				sortFunction = function(a, b) {
					if(a.get("contactPerson").toLowerCase() < b.get("contactPerson").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("contactPerson").toLowerCase() > b.get("contactPerson").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "email":
				sortFunction = function(a, b) {
					if(a.get("email").toLowerCase() < b.get("email").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("email").toLowerCase() > b.get("email").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "numShares":
				sortFunction = function(a, b) {
					if(a.get("numShares") < b.get("numShares")) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("numShares") > b.get("numShares")) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "shareholderID":
				sortFunction = function(a, b) {
					if(a.get("shareholderID").toLowerCase() < b.get("shareholderID").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("shareholderID").toLowerCase() > b.get("shareholderID").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "dateTimeSigned":
				sortFunction = function(a, b) {
					if (this.get("filterDirection") === "asc")
					{
						if (!a.get("proxyDoc").signedTimestamp)
						{
							return -1;
						}

						return a.get("proxyDoc").signedTimestamp - b.get("proxyDoc").signedTimestamp;
					}
					else if (this.get("filterDirection") === "desc")
					{
						if (!a.get("proxyDoc").signedTimestamp)
						{
							return 1;
						}

						return b.get("proxyDoc").signedTimestamp - a.get("proxyDoc").signedTimestamp;
					}
					return 0;
				};
				break;
		}

		results.sort(enyo.bind(this, sortFunction));

		this.set("filteredProxyCollection", new enyo.Collection(results));

		this.$.noProxiesLabel.set("showing", this.get("filteredProxyCollection").length === 0);
		this.$.proxyRepeater.set("showing", this.get("filteredProxyCollection").length > 0);
		this.$.proxyRepeater.setCount(this.get("filteredProxyCollection").length);
		this.resize();
	},

	setupProxyRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { return; }
		if (!inEvent.item) {return true;}

		var getDocumentStatus = function(doc)
		{
			if (doc.signed)
			{
				return "assets/icons/circle-icon-green.png";
			}

			if (doc.sent)
			{
				return "assets/icons/circle-icon-yellow.png";
			}

			if (doc.generated)
			{
				return "assets/icons/circle-icon-red.png";
			}

			return "assets/icons/circle-icon-grey.png";
		};

		var refItem = this.get("filteredProxyCollection").at(inEvent.index);

		var agreementSignatureStatusIconSrc = getDocumentStatus(refItem.get("proxyDoc"));

		inEvent.item.$.proxyItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.displayName.set("content", refItem.get("contactName") ? refItem.get("contactName") : "");
		inEvent.item.$.contactPerson.set("content", refItem.get("contactPerson") ? refItem.get("contactPerson") : "");
		inEvent.item.$.email.set("content", refItem.get("email") ? refItem.get("email") : "");
		inEvent.item.$.agreementSignatureStatusIcon.set("src", agreementSignatureStatusIconSrc);
		inEvent.item.$.numShares.set("content", refItem.get("numShares") ? numeral(refItem.get("numShares")).format('0,0') : "0");
		inEvent.item.$.shareholderID.set("content", refItem.get("shareholderID") ? refItem.get("shareholderID") : "");
		inEvent.item.$.dateTimeSigned.set("content", refItem.get("proxyDoc").signed ? moment.tz(refItem.get("proxyDoc").signedTimestamp, "Canada/Pacific").format('MMMM Do YYYY, h:mm:ss a') : "");
		return true;
	},

	handleProxyRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredProxyCollection").at(inEvent.index), collection: this.get("filteredProxyCollection")});
	},

	/*****************
	* Sort Functions
	*****************/

	sortColumnTapped: function(inSender, inEvent)
	{
		var targetColumn = inEvent.originator.sortTarget;

		if (this.get("filterColumn") === targetColumn)
		{
			this.set("filterDirection", this.get("filterDirection") === "asc" ? "desc" : "asc");
			inEvent.originator.set("content", inEvent.originator.get("content").slice(0, -6) + (this.get("filterDirection") === "asc" ? "&uarr;" : "&darr;"));
		}
		else
		{
			this.$.headerColumns.controls.forEach(enyo.bind(this, function(value, index, array){
				if (value.sortTarget === this.get("filterColumn"))
				{
					value.content = value.content.slice(0, -6);
				}
			}));
			this.set("filterColumn", targetColumn);
			this.set("filterDirection", "asc");
			inEvent.originator.set("content", inEvent.originator.get("content") + "&uarr;");
			this.$.headerColumns.render();
		}

		this.populateProxies();
	}
});