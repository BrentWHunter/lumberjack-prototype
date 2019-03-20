enyo.kind({
	kind: "lumberjack.Popup",
	name: "lumberjack.CorrectEntryPopup",

	handlers: {
		onHide: "handleHide"
	},

	published: {
		activeEntry: null
	},

	events: {
		onLogout: ""
	},

	subComponents: [
		{style: "text-align: center; margin-top: 10px;", components: [
			{style: "width: 50%; padding-right: 5px; min-width: 480px;", components: [
				{kind: "lumberjack.Input", name:"subscriberNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Subscriber Name", required:true},
				{kind: "lumberjack.Input", name:"displayNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Display Name", required:true},
				{name: "corporateContactSection", components: [
					{kind: "lumberjack.Input", name:"contactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Person", required:true},
					{kind: "lumberjack.Input", name:"contactPersonTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Person Title", required:true}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Date of Birth", style: "line-height: 28px; width: 170px;"},
					{kind: "lumberjack.Input", name:"birthDayInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 10px; width: 35px; margin-right: 3px;", inputStyle: "width: 35px; text-align: center;", type:"text", label:"", placeholder: "DD", required:true, inputMaxLength:2, onkeydown: "validateNumberInput"},
					{kind: "lumberjack.Input", name:"birthMonthInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 3px; width: 35px; margin-right: 3px;", inputStyle: "width: 35px; text-align: center;", type:"text", label:"/", required:true, placeholder: "MM", inputMaxLength:2, onkeydown: "validateNumberInput"},
					{kind: "lumberjack.Input", name:"birthYearInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 3px; width: 50px; margin-right: 3px;", inputStyle: "width: 50px; text-align: center;", type:"text", label:"/", required:true, placeholder: "YYYY", inputMaxLength:4, onkeydown: "validateNumberInput"},
				]}
			]},
			{name: "contactInfoSection", kind: "lumberjack.ContactInfo"},
			{name: "addressInfoSection", kind: "lumberjack.AddressInfo"},
			{kind: "lumberjack.Button", style: "margin-top: 10px;", enabledClasses: "button primary", content: "Update", ontap: "handleUpdateButtonTapped"},
			{kind: "lumberjack.Button", style: "margin-top: 10px; margin-left: 10px;", content: "Cancel", ontap: "handleCancelButtonTapped"}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings:[
		{from: ".activeEntry.contactInfo", to: ".$.addressInfoSection.activeEntry"},
		{from: ".activeEntry.contactInfo", to: ".$.contactInfoSection.activeEntry"},
		{from: ".activeEntry.contactInfo.subscriberName", to: ".$.subscriberNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.displayName", to: ".$.displayNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.corporateInfo.contactPerson", to: ".$.contactPersonInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.corporateInfo.contactPersonTitle", to: ".$.contactPersonTitleInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.dateOfBirth", to: ".$.birthDayInput.value", transform: function(v) {
			try
			{
				var data = moment(v);
				if (data.isValid()) { return data.format("DD"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.dateOfBirth", to: ".$.birthMonthInput.value", transform: function(v) {
			try
			{
				var data = moment(v);
				if (data.isValid()) { return data.format("MM"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.dateOfBirth", to: ".$.birthYearInput.value", transform: function(v) {
			try
			{
				var data = moment(v);
				if (data.isValid()) { return data.format("YYYY"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.subscriptionInfo.subscriptionType", to: ".$.corporateContactSection.showing", transform: function(v) { return v === "corporate"; }}
	],

	show: function()
	{
		this.inherited(arguments);
		lumberjack.fixShim();

		if (!lumberjack.hasRole(["admins"], "placement")) { alertify.error("User does not have permissions to access this functionality."); this.hide(); return; }
	},

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	},

	handleUpdateButtonTapped: function(inSender, inEvent)
	{
		//Update ActiveEntry
		this.$.loadingPopup.show();
		if(this.validate())
		{
			this.get("activeEntry").get("contactInfo").subscriberName = this.$.subscriberNameInput.get("value");
			this.get("activeEntry").get("contactInfo").displayName = this.$.displayNameInput.get("value");
			this.get("activeEntry").get("contactInfo").dateOfBirth = moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").valueOf();
			this.$.addressInfoSection.updateActiveEntry();
			this.$.contactInfoSection.updateActiveEntry();

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + "correctsubscription",
				method: "POST",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				},
				postBody: {
					placementID: lumberjack.preferences.get("placementDatabase"),
					activeEntry: this.get("activeEntry")
				}
			});

			request.error(enyo.bind(this, function(request, response) {
				alertify.error("Failed to Correct Subscription");
				console.log(request);
				this.hide();
				this.$.loadingPopup.hide();
				if(response === 401){
					this.doLogout();
					return;
				}
				return;
			}));

			request.response(enyo.bind(this, function(request, response) {
				if (response.error)
				{
					alertify.error("Failed to Correct Subscription");
					console.log(response);
					this.hide();
					this.$.loadingPopup.hide();
					return;
				}

				alertify.success("Subscription Corrected!");
				this.hide();
				this.$.loadingPopup.hide();
			}));

			request.go();
		}
		else
		{
			this.$.loadingPopup.hide();
		}
	},

	clearBorderError: function()
	{
		this.$.contactInfoSection.clearBorderError();
		this.$.addressInfoSection.clearBorderError();

		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	validate: function()
	{
		this.clearBorderError();
		var isValid = true;

		if (!this.$.subscriberNameInput.validate()){isValid = false;}

		// Display Name:
		if (!this.$.displayNameInput.validate()){isValid = false;}

		//Catches anything thats wrong but not sanity checkable
		if(moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").format("MMMM Do, YYYY") === "Invalid date")
		{
			isValid = false;
			this.$.birthYearInput.setBorderError();
			this.$.birthMonthInput.setBorderError();
			this.$.birthDayInput.setBorderError();
		}

		//Contact Info Section
		if(!this.$.contactInfoSection.validate()){isValid = false;}

		//Address Info Section
		if(!this.$.addressInfoSection.validate()){isValid = false;}

		return isValid;
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	}

});