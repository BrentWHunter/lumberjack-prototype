enyo.kind({
	name: "lumberjack.SelectClosedProxyPopup",
	kind: "lumberjack.Popup",

	events: {
		onProxySelected: "",
		onCancel: "",
		onLogout: ""
	},

	published: {
		proxies: null,
		rawProxies: null,
		selectedProxyRepeaterIndex: -1
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Select Closed Proxy"}
			]},
			{name: "proxiesScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 800px; height: 600px; background-color: #EEEEEE;", components: [
				{name: "proxiesRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 275px;", onSetupItem: "setupProxyRepeaterItem", components: [
					//{name: "divider", style: "color: white; background-color: #333333; padding: 5px;"},
					{name: "proxyItem", style: "background-color: white; border-bottom: 1px solid black; padding: 10px;", selected: false, ontap: "handleProxyRepeaterItemTapped", components: [
						{name: "proxyName", style: "color: black; font-size: 18px; font-weight: bold;"}
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "lumberjack.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "selectButton", kind: "lumberjack.Button", content: $L("Select"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "selectButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		{from: ".selectedProxyRepeaterIndex", to: ".$.selectButton.disabled", transform: function(v){
			this.$.selectButton.addRemoveClass("primary", v !== -1);
			return v === -1;
		}}
	],

	show: function()
	{
		this.inherited(arguments);
		this.$.loadingPopup.show();
		this.set("proxies", null);
		this.set("rawProxies", null);
		this.set("selectedProxyRepeaterIndex", -1);
		this.$.proxiesRepeater.setCount(0);
		this.loadProxies();
	},

	loadProxies: function() {
		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "getproxydropdowndata",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			this.$.loadingPopup.hide();
			alertify.error("Failed to load proxies");
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
			this.set("rawProxies", response.proxyEvents);

			if (response.proxyEvents.length > 1)
			{
				var proxies = [];

				for (var i = 0; i < response.proxyEvents.length; i++)
				{
					if (response.proxyEvents[i].status === "complete" || response.proxyEvents[i].status === "cancelled")
					{
						proxies.push(response.proxyEvents[i]);
					}
				}

				if (proxies.length === 0)
				{
					alertify.error("No Closed Proxies");
					this.doCancel({proxies: this.get("rawProxies")});
					this.hide();
					return true;
				}

				proxies.sort(function(a, b){
					if (a.proxyName > b.proxyName) {return 1;}
					if (a.proxyName < b.proxyName) {return -1;}
					if (a.proxyName === b.proxyName) {return 0;}
				});

				this.set("proxies", proxies);
				this.$.proxiesRepeater.setCount(proxies.length);
			}
			else
			{
				alertify.error("Failed to load proxies");
				this.doCancel({proxies: this.get("rawProxies")});
				this.hide();
			}
		}));

		request.go({companyID: lumberjack.preferences.get("company")});
	},

	setupProxyRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		//Should not have more than one company for any given set of closed proxies
		// var curr = this.get("proxies")[inEvent.index].proxyName;
		// var prev = inEvent.index > 0 ? this.get("proxies")[inEvent.index - 1].proxyName : null;
		// inEvent.item.$.divider.canGenerate = curr !== prev;
		// delete curr, prev;
		// if (inEvent.item.$.divider.canGenerate)
		// {
		// 	inEvent.item.$.divider.set("content", this.get("proxies")[inEvent.index].proxyName);
		// }

		if (inEvent.index === this.get("selectedProxyRepeaterIndex"))
		{
			inEvent.item.$.proxyItem.applyStyle("background-color", "lightblue");
		}
		else
		{
			inEvent.item.$.proxyItem.applyStyle("background-color", "white");
		}

		inEvent.item.$.proxyName.set("content", this.get("proxies")[inEvent.index].proxyName);

		return true;
	},

	handleProxyRepeaterItemTapped: function(inSender, inEvent)
	{
		var oldActiveIndex = this.get("selectedProxyRepeaterIndex");
		this.set("selectedProxyRepeaterIndex", inEvent.index);
		if (oldActiveIndex !== -1) { this.$.proxiesRepeater.renderRow(oldActiveIndex); }
		this.$.proxiesRepeater.renderRow(inEvent.index);
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		this.hide();
		this.doProxySelected({database: this.get("proxies")[this.get("selectedProxyRepeaterIndex")].proxyID});
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel({proxies: this.get("rawProxies")});
		this.hide();
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