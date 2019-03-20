enyo.kind({
	name: "lumberjack.ReservationDetailPanel",
	kind: "enyo.Scroller",
	//fit: true,

	style: "padding: 15px; width: 100%;",

	published: {
		database: null,
		activeEntry: null,
		reservationCollection: null,
		placements: null,
		salespeople: null,
		selectedPlacement: null
	},

	events: {
		onGoBack: "",
		onViewEventDetail: "",
		onLogout: ""
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Reservation Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "saveChangesButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Save Changes", ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]}
		]},
		{kind:"enyo.FittableColumns", style: "padding-top: 5px;", components:[
			{style: "width: 50%;", components: [
				{kind: "lumberjack.Input", name:"reservationNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Reservation Name"},
				{kind: "lumberjack.Input", name:"emailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Email Address"},
				{kind: "lumberjack.Input", name:"cellPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Cell Phone"},
				{kind: "lumberjack.Input", name:"numSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"number", label:"Number of Shares"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{style: "line-height: 38px; width: 170px;", content: "Date/Time Reserved"},
					{name: "dateTimeLabel", style: "margin-left: 10px; line-height: 38px; width: 350px;"}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{style: "line-height: 38px; width: 170px;", content: "Salesperson Name"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px", components: [
						{name: "salespersonPickerButton", style: "width: 350px;"},
						{name: "salespersonPicker", kind: "onyx.Picker"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 20px;", components: [
					{name: "viewSubscriptionButton", kind: "lumberjack.Button", style: "line-height: 34px;", content: "View Subscription", ontap: "handleViewSubscriptionButtonTapped"},
					{name: "resendNotificationButton", kind: "lumberjack.Button", style: "margin-left: 10px; line-height: 34px;", content: "Resend Notification", ontap: "handleResendNotificationButtonTapped"},
					{name: "getReservationLinkButton", kind: "lumberjack.Button", style: "margin-left: 10px; line-height: 34px;", enabledClasses: "button copy-button", content: "Copy Reservation Link", ontap: "handleCopyReservationLinkButtonTapped"},
					{name: "cancelReservationButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin-left: 10px; line-height: 34px;", content: "Cancel Reservation", ontap: "handleCancelReservationButtonTapped"}
				]}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"},
		{name: "documentStatusPopup", kind: "lumberjack.ViewAdobeSignDocumentStatusPopup"}
	],
	bindings: [
		{from: ".activeEntry.name", to: ".$.reservationNameInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.emailAddress", to: ".$.emailInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.cellPhone", to: ".$.cellPhoneInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.numShares", to: ".$.numSharesInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry.dateTimeCreated", to: ".$.dateTimeLabel.content", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return moment.tz(val, "Canada/Pacific").format('MMMM Do YYYY, h:mm:ss a');
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("reservationCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === 0; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("reservationCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1; }
				else { throw null; }
			}
			catch (err) { return true; }
		}}
	],
	//Setup
	activate: function(activeEntry)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "reservation")) { this.doGoHome(); return; }

		this.clearBorderError();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new reservationModel());
		if (activeEntry != null) {
			this.set("activeEntry", activeEntry);
		}

		this.populateSalespeople();

		this.setShowingForRoles();
		this.setDisabledForStatus();
		this.setDisabledForRoles();
	},

	setShowingForRoles: function()
	{
		var showing = this.canEdit();

		this.$.cancelReservationButton.set("showing", showing);
	},

	setDisabledForRoles: function()
	{
		//Only do additional disables here if we're disabling the buttons. Otherwise, status can handle this.
		var disabled = !this.canEdit();

		if (disabled)
		{
			this.$.saveChangesButton.set("disabled", disabled);
			this.$.cancelReservationButton.set("disabled", disabled);
		}
	},

	setDisabledForStatus: function()
	{
		var placementStatus = this.get("placements")[this.get("selectedPlacement")].placementStatus;

		//Disable All Editable Fields and/or the save button if the placement is not active or ready to receive reservations.
		var disableFields = ["active", "preRegistration"].indexOf(placementStatus) === -1;
		
		//Also disable fields if there is a subscription assigned to this placement.
		if (this.get("activeEntry").get("subscriptionID") !== "")
		{
			disableFields = true;
		}

		//These ones get disabled on invalid placement status/subscription exists
		for (var key in this.$)
		{
			if( this.$[key].kind === "lumberjack.Input" || 
				this.$[key].name === "salespersonPickerButton" ||
				this.$[key].name === "saveChangesButton" ||
				this.$[key].name === "cancelReservationButton")
			{
				this.$[key].set("disabled", disableFields);
			}
		}

		//These ones should also be disabled if the notification has not yet been sent
		if (!this.get("activeEntry").get("notificationSent"))
		{
			disableFields = true;
		}
		this.$.resendNotificationButton.set("disabled", disableFields);
		this.$.getReservationLinkButton.set("disabled", disableFields);

		//This one should always be active if a subscription is tied to it.
		this.$.viewSubscriptionButton.set("disabled", !this.get("activeEntry").get("subscriptionID"));
	},

	canEdit: function()
	{
		return lumberjack.hasRole(["admins","users"], "reservation");
	},

	populateSalespeople: function() {
		this.$.salespersonPicker.set("selected", null);
		this.$.salespersonPicker.destroyClientControls();

		var pickerItems = [];

		var salespeople = this.get("placements")[this.get("selectedPlacement")].salespeople;

		if (salespeople)
		{
			salespeople.sort(function(a, b){
				if(a.salespersonName.toLowerCase() < b.salespersonName.toLowerCase()) {return -1;}
				if(a.salespersonName.toLowerCase() > b.salespersonName.toLowerCase()) {return 1;}
				return 0;
			});

			salespeople.forEach(enyo.bind(this, function(value, index, array){
				pickerItems.push({salespersonID: value.salespersonID, content: value.salespersonName, active: value.salespersonID === this.get("activeEntry").get("salespersonID")});
			}));
		}

		this.$.salespersonPicker.createComponents(pickerItems, {owner: this});
		this.$.salespersonPicker.render();
	},

	//Validation
	clearBorderError: function()
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	validateInputs:function(options)
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		if (!this.$.reservationNameInput.validate()) {isValid = false;}
		if (!this.$.emailInput.validate()) {isValid = false;}
		if (!this.$.numSharesInput.validate()) {isValid = false;}

		return isValid;
	},

	handleSaveEntryButtonTapped:function(inSender, inEvent, options)
	{
		if (!this.canEdit()) { return; }

		if (!this.validateInputs(options)) { return; }

		if (!this.isDirty()) { return; }

		this.$.loadingPopup.show("Saving...");

		var tempEntry = JSON.parse(JSON.stringify(this.get("activeEntry")));

		tempEntry.name = this.$.reservationNameInput.get("value");
		tempEntry.emailAddress = this.$.emailInput.get("value");
		tempEntry.cellPhone = this.$.cellPhoneInput.get("value");
		tempEntry.numShares = this.$.numSharesInput.get("value");
		tempEntry.salespersonID = this.$.salespersonPicker.get("selected").salespersonID;

		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Saving..."));

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "savereservation",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				reservation: tempEntry
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Update Entry");
			console.log(request);
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
				this.$.loadingPopup.hide();
				alertify.error("Failed to Update Entry");
				this.$.loadingPopup.log(response);
				return;
			}

			this.$.loadingPopup.hide();
			if (options && options.callback)
			{
				options.callback();
			}
		}));

		request.go();
	},

	isDirty:function()
	{
		if (!this.get("activeEntry")) { return false; }

		var isDirtyArray = [
			this.get("activeEntry").get("name") !== this.$.reservationNameInput.get("value"),
			this.get("activeEntry").get("emailAddress") !== this.$.emailInput.get("value"),
			this.get("activeEntry").get("cellPhone") !== this.$.cellPhoneInput.get("value"),
			this.get("activeEntry").get("numShares") !== this.$.numSharesInput.get("value"),
			this.get("activeEntry").get("salespersonID") !== this.$.salespersonPicker.get("selected").salespersonID
		];

		//console.log(isDirtyArray);

		return (isDirtyArray.indexOf(true)!==-1);
	},

	//Navigation
	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.doGoBack();
	},

	handleNextEntryButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.next_saveChangesPopup)
			{
				this.$.next_saveChangesPopup.hide();
				this.$.next_saveChangesPopup.destroy();
			}
			this.createComponent({name: "next_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "nextEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}
		else { this.nextEntry(inSender, inEvent); }
	},

	nextEntry: function(inSender, inEvent)
	{
		this.activate(this.get("reservationCollection").at(this.get("reservationCollection").indexOf(this.get("activeEntry")) + 1));
	},

	handlePreviousEntryButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.previous_saveChangesPopup)
			{
				this.$.previous_saveChangesPopup.hide();
				this.$.previous_saveChangesPopup.destroy();
			}
			this.createComponent({name: "previous_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "previousEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.previous_saveChangesPopup.show("Save changes?");
		}
		else { this.previousEntry(inSender, inEvent); }
	},

	previousEntry: function(inSender, inEvent)
	{
		this.activate(this.get("reservationCollection").at(this.get("reservationCollection").indexOf(this.get("activeEntry")) - 1));
	},

	//Subscription search
	handleViewSubscriptionButtonTapped: function(inSender, inEvent)
	{
		this.doViewEventDetail({mode: "placement", target: this.get("activeEntry").get("placementID"), record: this.get("activeEntry").get("subscriptionID")});
		return true;
	},

	handleCopyReservationLinkButtonTapped: function(inSender, inEvent)
	{
		var clipboard = new ClipboardJS('.copy-button', {
			text: enyo.bind(this, function(trigger) {
				return "https://placements.greenhillequity.com/reservation/" + this.get("activeEntry").get("reservationLookupGuid"); //This will work for right now. To be fixed in v2.0;
			})
		});

		clipboard.on('success', enyo.bind(this, function(e) {
			alertify.success("Copied to Clipboard!");
			clipboard.destroy();
		}));

		clipboard.on('error', function(e) {
			alertify.error("Failed to copy to clipboard");
			clipboard.destroy();
		});
		return true;
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	handleResendNotificationButtonTapped:function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.resendNotification();
		})});
	},

	handleCancelReservationButtonTapped:function(inSender, inEvent)
	{
		if (this.canEdit())
		{
			if (this.$.cancelReservationPopup)
			{
				this.$.cancelReservationPopup.hide();
				this.$.cancelReservationPopup.destroy();
			}
			this.createComponent({name: "cancelReservationPopup", kind: "lumberjack.ConfirmPopup", onYes: "cancelReservation", onHide: "handlePopupHidden"} , {owner:this});
			this.$.cancelReservationPopup.show("Are you sure that you want to cancel this reservation? This action cannot be undone.");
		}
	},

	cancelReservation: function(callback)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Cancelling..."));

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "cancelreservation",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				reservationID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Cancel Reservation");
			console.log(request);
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
				this.$.loadingPopup.hide();
				alertify.error("Failed to Cancel Reservation");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Reservation Cancelled!");
			this.$.loadingPopup.hide();
			if (callback) {callback();}
		}));

		request.go();
	},

	resendNotification: function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "resendreservationnotification",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				reservationID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send notification");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to send notification");
				console.log(response);
				return;
			}

			alertify.success("Notification Sent!");
		}));

		request.go();
	},

	handleRequestSave: function(inEvent)
	{
		if (this.canEdit())
		{
			if (this.isDirty())
			{
				if (this.$.saveChangesPopup)
				{
					this.$.saveChangesPopup.hide();
					this.$.saveChangesPopup.destroy();
				}
				this.createComponent({name: "saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: inEvent.callback, onHide: "handlePopupHidden"} , {owner:this});
				this.$.saveChangesPopup.show("Must save changes before resending notification. Save changes?");
			}
			else { inEvent.callback(); }
		}
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSaveEntryButtonTapped(inSender, inEvent, {callback: inSender.action});
	}
});