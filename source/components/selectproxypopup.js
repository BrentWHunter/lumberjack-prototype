enyo.kind({
	name: "quantum.SelectProxyPopup",
	kind: "quantum.Popup",
	_loaded: false,

	events: {
		onProxySelected: "",
		onClosedProxySelected: "",
		onCancel: "",
		onError: "",
		onLogout: ""
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Select Proxy"}
			]},
			{name: "proxyDatabasePickerDecorator", kind: "onyx.PickerDecorator", style: "margin-top: 15px;", components: [
				{name: "proxyDatabasePickerButton", style: "width: 450px;"},
				{name: "proxyDatabasePicker", kind: "onyx.Picker"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "selectButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Select"), style: "width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]}
	],

	show: function()
	{
		if (this._loaded)
		{
			this.inherited(arguments);
		}
		else
		{
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
			this.createComponent({name: "loadingPopup", kind: "quantum.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
			this.$.loadingPopup.show($L("Loading..."));

			this.loadProxies(enyo.bind(this, function(proxies){
				this.$.proxyDatabasePicker.set("selected", null);
				this.$.proxyDatabasePicker.destroyClientControls();
				var proxyItems = [];
				var closedProxies = false;
				var activeItemSet = false;

				//If the company has no proxies, the for loop will typeError
				if(!proxies)
				{
					alertify.error("Company Has No Proxies");
					this.doError();
					this.hide();
					return;
				}

				var sortByDisplayNameFunction = function(a,b){
					if(a.proxyName.toLowerCase() < b.proxyName.toLowerCase()) {return -1;}
					if(a.proxyName.toLowerCase() > b.proxyName.toLowerCase()) {return 1;}
					return 0;
				};

				proxies.sort(sortByDisplayNameFunction);

				for (var i = 0; i < proxies.length; i++)
				{
					if (proxies[i].status === "closed" || proxies[i].status === "cancelled")
					{
						closedProxies = true;
					}
					else
					{
						proxyItems.push({database: proxies[i].proxyID, content: proxies[i].proxyName, active: activeItemSet === false});
						activeItemSet = true;
					}
				}

				if (proxyItems.length > 0 && closedProxies)
				{
					proxyItems.push({name: "closedProxiesPickerItem", content: "Closed Proxies..."});
				}
				else if (proxyItems.length === 0)
				{
					this.doClosedProxySelected();
					this.hide();
					return;
				}

				this.$.proxyDatabasePicker.createComponents(proxyItems, {owner: this});
				this._loaded = true;
				this.show();
			}));
		}
	},

	loadProxies: function(callback)
	{
		if (this.$.loadingPopup) {this.$.loadingPopup.hide();}
		if (this.$.loadingPopup) {this.$.loadingPopup.destroy();}
		this.createComponent({
			name: "loadingPopup",
			kind: "quantum.LoadingPopup",
			onHide: "handlePopupHidden"},
		{owner:this});

		this.$.loadingPopup.show("Loading Proxies");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getproxydropdowndata",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		var errorFunction = enyo.bind(this, function(request, response){
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			alertify.error("Failed to load proxies");
			console.log(request);
			if(response == 401){
				this.doLogout();
				return;
			}
			this.doError();
			this.hide();
			return true;
		});

		request.error(errorFunction);

		request.response(enyo.bind(this, function(request, response){
			if (response.error) {
				return errorFunction(request, response);
			}

			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			callback(response.proxyEvents);
		}));

		request.go({companyID: quantum.preferences.get("company")});
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		if (this.$.proxyDatabasePicker.get("selected") === this.$.closedProxiesPickerItem)
		{
			this.doClosedProxySelected();
		}
		else
		{
			this.doProxySelected({proxy: this.$.proxyDatabasePicker.get("selected").database});
		}

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