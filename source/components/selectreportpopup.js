enyo.kind({
	name: "quantum.SelectReportPopup",
	kind: "quantum.Popup",
	_loaded: false,

	events: {
		onReportSelected: "",
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
				{style: "", content: "Select Report"}
			]},
			{name: "reportDatabasePickerDecorator", kind: "onyx.PickerDecorator", style: "margin-top: 15px;", components: [
				{name: "reportDatabasePickerButton", style: "width: 450px;"},
				{name: "reportDatabasePicker", kind: "onyx.Picker"}
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

			this.loadReports(enyo.bind(this, function(reports){
				this.$.reportDatabasePicker.set("selected", null);
				this.$.reportDatabasePicker.destroyClientControls();
				var reportItems = [];
				var activeItemSet = false;

				for (var i = 0; i < reports.length; i++)
				{
					reportItems.push({database: reports[i].database, content: reports[i].name, active: activeItemSet === false});
					activeItemSet = true;
				}

				this.$.reportDatabasePicker.createComponents(reportItems, {owner: this});
				this._loaded = true;
				this.show();
			}));
		}
	},

	loadReports: function(callback)
	{
		if (this.$.loadingPopup) {this.$.loadingPopup.hide();}
		if (this.$.loadingPopup) {this.$.loadingPopup.destroy();}
		this.createComponent({
			name: "loadingPopup",
			kind: "quantum.LoadingPopup",
			onHide: "handlePopupHidden"},
		{owner:this});

		this.$.loadingPopup.show("Loading Reports");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "getreports",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			alertify.error("Failed to load reports");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
			this.doCancel();
			this.hide();
			return true;
		}));

		request.response(enyo.bind(this, function(request, response){
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }

			if (response.error)
			{
				alertify.error("No reports available");
				console.log(response);
				this.doCancel();
				this.hide();
				return true;
			}

			callback(response.reports);
		}));

		request.go({company: quantum.preferences.get("company")});
	},

	selectButtonTapped: function(inSender, inEvent)
	{
		this.doReportSelected({report: this.$.reportDatabasePicker.get("selected").database});
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