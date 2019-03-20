enyo.kind({
	name: "lumberjack.ShareholderSearchPopup",
	kind: "lumberjack.Popup",

	events: {
		onShareholderSelected: "",
		onCreateNewContact: "",
		onCancel: "",
		onLogout: ""
	},

	published: {
		shareholders: null,
		companyID: "",
		searchString: "",
		selectedShareholderRepeaterIndex: -1,
		allowNewContact: true,
		enableSearch:false,
		searchRoles:["shareholder"],
		typeFilter:[""],
		title: ""
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{name: "popupTitle", style: "font-size: 24px; text-align: center;", content: "Search Shareholders"},
			{kind: "enyo.FittableColumns", name:"searchHeader", style: "margin-top: 10px;", components: [
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, components: [
					{name: "searchInput", style: "width: 270px;", kind: "onyx.Input", value:"Default Search", onkeydown: "handleSearchKeys"}
				]},
				{name: "searchButton", kind: "lumberjack.Button", content: "Search", style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "searchButtonTapped"}
			]},
			{name: "shareholdersScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 800px; height: 600px; background-color: #EEEEEE;", components: [
				{name: "shareholdersRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 275px;", onSetupItem: "setupShareholderRepeaterItem", components: [
					{name: "shareholderItem", style: "background-color: white; color: black; border-bottom: 1px solid black; padding: 10px;", selected: false, ontap: "handleShareholderRepeaterItemTapped", components: [
						{name: "shareholderName", style: "font-size: 18px; font-weight: bold;"},
						{kind: "enyo.FittableColumns", components: [
							{style: "width: 390px; display: inline-block;", components: [
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Address Line 1:"},
									{name: "shareholderAddressLine1"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Address Line 2:"},
									{name: "shareholderAddressLine2"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Address Line 3:"},
									{name: "shareholderAddressLine3"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "City:"},
									{name: "shareholderCity"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "State/Province:"},
									{name: "shareholderStateProvince"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Zip/Postal:"},
									{name: "shareholderZipPostal"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Country:"},
									{name: "shareholderCountry"}
								]}
							]},
							{style: "width: 390px; display: inline-block;", components: [
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Home Phone:"},
									{name: "shareholderHomePhone"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Business Phone:"},
									{name: "shareholderBusinessPhone"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Cell Phone:"},
									{name: "shareholderCellPhone"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Fax:"},
									{name: "shareholderFax"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Primary Email:"},
									{name: "shareholderPrimaryEmail"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{style: "width: 175px;", content: "Secondary Email:"},
									{name: "shareholderSecondaryEmail"}
								]}
							]}
						]}
					]}
				]},
				{name: "noResultsItem", showing: false, style: "text-align: center; font-size: 18px; color: black; margin-top: 10px;", content: "No Results"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "lumberjack.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "newContactButton", kind: "lumberjack.Button", content: $L("New Contact"), style: "margin-left: 10px; width: 150px; height: 40px;", ontap: "newContactButtonTapped"},
				{name: "selectButton", kind: "lumberjack.Button", content: $L("Select"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		{from: ".selectedShareholderRepeaterIndex", to: ".$.selectButton.disabled", transform: function(v){
			//Due To The Magic Of How Enyo Works, Cant assign the class properly if it's disabled
			this.$.selectButton.set("disabled", v === -1);
			this.$.selectButton.addRemoveClass("primary", v !== -1);
			return v === -1;
		}},
		{from: ".enableSearch", to: ".$.searchHeader.showing", transform: function(v) { return v; }},
		{from: ".title", to: ".$.popupTitle.content", transform: function(v){
			if(v === "" || v == null)
			{
				return "Search Shareholders";
			}
			return v;
		}}
	],

	show: function(searchString, companyID)
	{
		this.inherited(arguments);
		if (!companyID || companyID === "")
		{
			alertify.error("No Company ID");
			this.doCancel();
			this.hide();
			return;
		}

		if(this.get("enableSearch")){
			this.$.searchInput.set("value", searchString);
		}

		if(this.searchRoles.includes("any"))
		{
			this.$.popupTitle.set("content","Search Contacts");
		}

		this.set("shareholders", null);
		this.set("selectedShareholderRepeaterIndex", -1);
		this.set("searchString", searchString);
		this.set("companyID", companyID);
		this.$.newContactButton.set("showing", this.get("allowNewContact"));

		if(this.$.searchInput.get("value").trim() === "")
		{
			this.$.noResultsItem.set("showing", true);
			this.$.selectButton.set("disabled", true);
			this.$.shareholdersRepeater.setCount(0);
			return;
		}

		this.$.noResultsItem.set("showing", false);
		this.$.shareholdersRepeater.setCount(0);
		this.$.loadingPopup.show();
		this.loadShareholders();
	},

	loadShareholders: function() {
		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "searchshareholders",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();
			alertify.error("Failed to load shareholders");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
			this.doCancel();
			this.hide();
			return;
		}));

		request.response(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();

			if (response.error) {
				alertify.error("Failed to load shareholders");
				console.log(response);
					this.doCancel();
					this.hide();
					return;
			}

			var shareholders = response.shareholders;

			if (shareholders.length === 0)
			{
				this.$.noResultsItem.set("showing", true);
				this.$.selectButton.set("disabled", true);
			}
			else
			{
				this.set("shareholders", new lumberjack.ContactCollection(shareholders));
				this.$.shareholdersRepeater.setCount(shareholders.length);
			}
		}));

		request.go({companyID: this.get("companyID"), searchString: this.get("searchString"), roleFilter: this.get("searchRoles"), typeFilter: this.get("typeFilter")});
	},

	setupShareholderRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		if (inEvent.index === this.get("selectedShareholderRepeaterIndex"))
		{
			inEvent.item.$.shareholderItem.applyStyle("background-color", "lightblue");
		}
		else
		{
			inEvent.item.$.shareholderItem.applyStyle("background-color", "white");
		}

		inEvent.item.$.shareholderName.set("content", this.get("shareholders").at(inEvent.index).get("contactName"));
		inEvent.item.$.shareholderAddressLine1.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").addressLine1);
		inEvent.item.$.shareholderAddressLine2.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").addressLine2);
		inEvent.item.$.shareholderAddressLine3.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").addressLine3);
		inEvent.item.$.shareholderCity.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").city);
		inEvent.item.$.shareholderStateProvince.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").stateProvince);
		inEvent.item.$.shareholderZipPostal.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").zipPostalCode);
		inEvent.item.$.shareholderCountry.set("content", this.get("shareholders").at(inEvent.index).get("addressInfo").country);
		inEvent.item.$.shareholderHomePhone.set("content", this.get("shareholders").at(inEvent.index).get("phoneNumber"));
		inEvent.item.$.shareholderBusinessPhone.set("content", this.get("shareholders").at(inEvent.index).get("businessPhoneNumber"));
		inEvent.item.$.shareholderCellPhone.set("content", this.get("shareholders").at(inEvent.index).get("cellPhoneNumber"));
		inEvent.item.$.shareholderFax.set("content", this.get("shareholders").at(inEvent.index).get("faxNumber"));
		inEvent.item.$.shareholderPrimaryEmail.set("content", this.get("shareholders").at(inEvent.index).get("emailAddress"));
		inEvent.item.$.shareholderSecondaryEmail.set("content", this.get("shareholders").at(inEvent.index).get("secondaryEmailAddress"));

		return true;
	},

	handleShareholderRepeaterItemTapped: function(inSender, inEvent)
	{
		var oldActiveIndex = this.get("selectedShareholderRepeaterIndex");
		this.set("selectedShareholderRepeaterIndex", inEvent.index);
		if (oldActiveIndex !== -1) { this.$.shareholdersRepeater.renderRow(oldActiveIndex); }
		this.$.shareholdersRepeater.renderRow(inEvent.index);
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		this.hide();
		this.doShareholderSelected({shareholder: this.get("shareholders").at(this.get("selectedShareholderRepeaterIndex"))});
	},

	searchButtonTapped: function(inSender, inEvent){
		if(!this.get("enableSearch")){
			this.doCancel();
			this.hide();
			return;
		}

		if(this.$.searchInput.get("value").trim() === "")
		{
			this.$.noResultsItem.set("showing", true);
			this.$.selectButton.set("disabled", true);
			this.$.shareholdersRepeater.setCount(0);
			return;
		}

		this.set("searchString", this.$.searchInput.get("value"));
		this.set("shareholders", null);
		this.set("selectedShareholderRepeaterIndex", -1);
		this.$.noResultsItem.set("showing", false);
		this.$.shareholdersRepeater.setCount(0);
		this.$.loadingPopup.show();
		this.loadShareholders();
	},

	newContactButtonTapped: function(inSender, inEvent)
	{
		this.hide();
		this.doCreateNewContact();
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
	},

	handleSearchKeys: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.searchButtonTapped();
		}
		if(inEvent.keyCode === 27)
		{
			this.hide();
		}
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.selectButtonTapped();
		}
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	}
});