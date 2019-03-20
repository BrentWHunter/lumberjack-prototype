/* global quantum, alertify */

enyo.kind({
	name: "quantum.SelectCompanyPopup",
	kind: "quantum.Popup",
	_loaded: false,

	events: {
		onCompanySelected: "",
		onCancel: "",
		onLogout: ""
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Select Company"}
			]},
			{name: "companyPickerDecorator", kind: "onyx.PickerDecorator", style: "margin-top: 15px;", components: [
				{name: "companyPickerButton", style: "width: 450px;"},
				{name: "companyPicker", kind: "onyx.Picker"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px; margin-right: 10px;", ontap: "cancelButtonTapped"},
				{name: "selectButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Select"), style: "width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]}
	],

	show: function(allowCancel)
	{
		if (this._loaded)
		{
			this.inherited(arguments);
		}
		else
		{
			this.$.cancelButton.set("showing", allowCancel);
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
			this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
			this.$.loadingPopup.show($L("Loading..."));

			this.loadCompanies(enyo.bind(this, function(companies){
				this.$.companyPicker.set("selected", null);
				this.$.companyPicker.destroyClientControls();
				var companyItems = [];
				var activeItemSet = false;

				for (var i = 0; i < companies.length; i++)
				{
					companyItems.push({companyDetail: companies[i], content: companies[i].name, active: activeItemSet === false});
					activeItemSet = true;
				}

				this.$.companyPicker.createComponents(companyItems, {owner: this});
				this._loaded = true;
				this.show();
			}));
		}
	},

	loadCompanies: function(callback) {
		var request = new enyo.Ajax({
	      url: quantum.preferences.get("apiServer") + "getcompanies",
	      cacheBust: false,
	      headers:{
				"Authorization":"Bearer " + quantum.preferences.get("username") +":"+quantum.preferences.get("password")
			}
	    });

	    request.error(enyo.bind(this, function(request, response){
	    	this.$.loadingPopup.hide();
	    	alertify.error("Failed to load companies");
			console.log(request);
			if(response == 401){
				this.doLogout();
				return;
			}
			this.doCancel();
			this.hide();
			return;
	    }));

	    request.response(enyo.bind(this, function(request, response){
	    	this.$.loadingPopup.hide();

			response.companies.sort(function(a, b){
				if (a.companyName > b.companyName) {return 1;}
				if (a.companyName < b.companyName) {return -1;}
				if (a.companyName === b.companyName) {return 0;}
			});

			callback(response.companies);
	    }));

	    request.go();
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		this.doCompanySelected({company: this.$.companyPicker.get("selected").companyDetail});

		return true;
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
		return true;
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