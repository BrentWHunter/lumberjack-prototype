enyo.kind({
	kind: "quantum.Popup",
	name: "quantum.AssignPaymentPopup",

	published: {
		subscriptionCollection: null,
		payment: null
	},

	events: {
		onAssignPayment: ""
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "padding: 10px;", components: [
			{style: "font-size: 24px; text-align: center;", content: "Assign Payment"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Amount", style: "width: 130px; line-height: 34px;"},
				{kind: "quantum.Input", name:"paymentAmountInput", labelStyle:"color: white; display: inline-block; font-size: 20px; line-height: 34px;", decoratorStyle: "width: 220px;", inputStyle: "margin-left: 10px; width: 220px;", type:"text", label:"$", required:true}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Subscription", style: "line-height: 38px; width: 150px;"},
				{kind: "onyx.PickerDecorator", alwaysLooksFocused: true, components: [
					{style: "width: 220px;", content: "Choose Subscription..."},
					{name: "subscriberPicker", kind: "onyx.Picker"}
				]}
			]},
			{style: "text-align: center; margin-top: 10px;", components: [
				{kind: "quantum.Button", enabledClasses: "button primary", content: "Assign", ontap: "handleAddButtonTapped"},
				{kind: "quantum.Button", style: "margin-left: 10px;", content: "Cancel", ontap: "handleCancelButtonTapped"}
			]},
			{name: "loadingPopup", kind: "quantum.LoadingPopup"}
		]}
	],

	show: function()
	{
		this.populateSubscribersDropdown();
		this.$.paymentAmountInput.set("value", this.get("payment").amount);
		this.inherited(arguments);
		quantum.fixShim();
	},

	validateInputs: function()
	{
		var borderError = "2px solid red";
		var isValid = true;

		// Amount:
		if (!this.$.paymentAmountInput.validate()){isValid = false;}
		else { this.$.paymentAmountInput.clearBorderError(); }

		// Subscription:
		if (this.$.subscriberPicker.get("selected") == null || this.$.subscriberPicker.get("selected").subscriberID === "")
		{
			isValid = false;
			this.$.subscriberPicker.parent.applyStyle("border", borderError);
		}
		else { this.$.subscriberPicker.parent.applyStyle("border", null); }

		if (!isValid) { alertify.error("Validation Failed"); }
		return isValid;
	},

	assignPayment: function(){
		var data = {
			amount: quantum.parseFloat(this.$.paymentAmountInput.get("value")),
			targetID: this.$.subscriberPicker.get("selected").subscriberID,
			payment: this.get("payment")
		};

		this.doAssignPayment({payload: data});
		this.hide();
	},

	handleAddButtonTapped: function(inSender, inEvent)
	{
		if (!this.validateInputs()) { return; }

		if (quantum.parseFloat(this.$.subscriberPicker.get("selected").fundsReceived) + quantum.parseFloat(this.$.paymentAmountInput.get("value")) > quantum.parseFloat(this.$.subscriberPicker.get("selected").subscriberDollarAmount)) {
			if (this.$.confirmOverAssignPaymentPopup)
			{
				this.$.confirmOverAssignPaymentPopup.hide();
				this.$.confirmOverAssignPaymentPopup.destroy();
			}
			this.createComponent({name: "confirmOverAssignPaymentPopup", kind: "quantum.ConfirmPopup", onYes: "assignPayment", onHide: "handlePopupHidden"} , {owner:this});
			this.$.confirmOverAssignPaymentPopup.show("Are you sure that you want to assign more funds than the value of the subscription?");
		}
		else
		{
			this.assignPayment();
		}
	},

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	populateSubscribersDropdown: function()
	{
		this.$.subscriberPicker.destroyClientControls();

		var subscribers = [];

		var sortByContent = function(a, b)
		{
			if (a.content.toLowerCase() < b.content.toLowerCase())
			{
				return -1;
			}

			if (a.content.toLowerCase() > b.content.toLowerCase())
			{
				return 1;
			}

			if (a.content.toLowerCase() < b.content.toLowerCase())
			{
				return 0;
			}
		};

		var populatePickersFunction = function(value, index, array){
			subscribers.push({subscriberID: value.get("_id"), content: value.get("displayName"), fundsReceived: value.get("fundsReceived"), subscriberDollarAmount: value.get("subscriberDollarAmount")});
		};

		this.get("subscriptionCollection").forEach(populatePickersFunction);

		subscribers.sort(sortByContent);

		this.$.subscriberPicker.createComponents(subscribers);
		this.$.subscriberPicker.render();
	}
});