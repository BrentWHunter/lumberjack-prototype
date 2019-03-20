enyo.kind({
	kind: "quantum.Popup",
	name: "quantum.AddRefundPopup",

	published: {
		activeDate: moment(),
		defaultRefund: 0
	},

	events: {
		onAddRefund: ""
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "padding: 10px;", components: [
			{style: "font-size: 24px; text-align: center;", content: "Reverse Payment"},
			{kind: "quantum.Input", name:"payerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 34px; width: 151px;", decoratorStyle: "width: 250px;", inputStyle: "width: 100%;", type:"text", label:"Authed By", required:true},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Amount", style: "width: 130px; line-height: 34px;"},
				{kind: "quantum.Input", name:"paymentAmountInput", labelStyle:"color: white; display: inline-block; font-size: 20px; line-height: 34px;", decoratorStyle: "width: 250px;", inputStyle: "margin-left: 10px; width: 250px;", type:"text", label:"$", inputMaxLength:"12", required:true}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Date Sent", style: "line-height: 34px; width: 150px;"},
				{components: [
					{kind: "quantum.Input", name: "dateSentInput", ontap: "handleDateSentInputTapped", labelStyle: "", decoratorStyle: "width: 250px;", inputStyle: "width: 250px;", type:"text", required: true, readonly: true},
					{name: "calendarPopup", kind: "quantum.CalendarPopup", onSelect: "calendarDateChanged"}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Documentation", style: "line-height: 38px; width: 150px;"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding-left: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
					{name: "fileInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf, image/jpeg, image/png, image/tiff"}}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Reason", style: "line-height: 38px; width: 150px;"},
				{kind: "onyx.PickerDecorator", alwaysLooksFocused: true, components: [
					{style: "width: 250px;"},
					{name: "paymentTypePicker", kind: "onyx.Picker", components: [
						{content: "Refund", value: "refund", active: true},
						{content: "Bank Error", value: "bankerror"},
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 10px;", components: [
				{kind: "quantum.Button", enabledClasses: "button primary", content: "Add", ontap: "handleAddButtonTapped"},
				{kind: "quantum.Button", style: "margin-left: 10px;", content: "Cancel", ontap: "handleCancelButtonTapped"}
			]},
			{name: "loadingPopup", kind: "quantum.LoadingPopup"}
		]}
	],

	bindings: [
		{from: ".activeDate", to: ".$.dateSentInput.value", transform: function(v){
			return v.format("YYYY/MM/DD");
		}},
		{from: ".defaultRefund", to: "$.paymentAmountInput.value"}
	],

	show: function()
	{
		this.inherited(arguments);
		quantum.fixShim();
	},

	getPaymentAmount: function()
	{
		return quantum.parseFloat(quantum.formatCurrency(this.$.paymentAmountInput.get("value")));
	},

	validateInputs: function()
	{
		var borderError = "2px solid red";
		var isValid = true;

		// Payer Name:
		if (!this.$.payerNameInput.validate()) { isValid = false; }
		else { this.$.payerNameInput.clearBorderError(); }

		// Amount:
		if (!this.$.paymentAmountInput.validate()) { isValid = false; }
		else
		{
			var amount = this.getPaymentAmount();
			if (amount <= 0 || amount > this.get("defaultRefund"))
			{
				isValid = false;
				this.$.paymentAmountInput.setBorderError();
			}
			else { this.$.paymentAmountInput.clearBorderError(); }
		}

		// Date Sent:
		if (!this.$.dateSentInput.validate()) { isValid = false; }
		else
		{
			var dateSent = moment(this.$.dateSentInput.get("value"), "YYYY/MM/DD");
			var now = moment();
			if (!dateSent.isValid() || dateSent.isAfter(now, 'day'))
			{
				isValid = false;
				this.$.dateSentInput.setBorderError();
			}
			else { this.$.dateSentInput.clearBorderError(); }
		}

		// File:
		if (this.$.fileInput.hasNode().files.length <= 0)
		{
			isValid = false;
			this.$.fileInput.applyStyle("border", borderError);
		}
		else { this.$.fileInput.applyStyle("border", null); }

		// Reason:
		if (this.$.paymentTypePicker.get("selected") == null || this.$.paymentTypePicker.get("selected").value === "")
		{
			isValid = false;
			this.$.paymentTypePicker.parent.applyStyle("border", borderError);
		}
		else { this.$.paymentTypePicker.parent.applyStyle("border", null); }

		if (!isValid) { alertify.error("Validation Failed"); }
		return isValid;
	},

	handleAddButtonTapped: function()
	{
		if (!this.validateInputs()) { return; }

		this.$.loadingPopup.show("Uploading...");

		var files = this.$.fileInput.hasNode().files;
		var reader = new FileReader();

		reader.onerror = enyo.bind(this, function(error){
			//TODO: better error handling;
			this.loadingPopup.hide();
			console.log("ERROR!", error);
		});

		reader.onloadend = enyo.bind(this, function(inEvent){
			var data = {
				name: files[0].name,
				attachmentID: "$"+uuid.v4().replace(/-/g, ""),
				payerName: this.$.payerNameInput.get("value"),
				amount: this.getPaymentAmount() * -1,
				paymentType: this.$.paymentTypePicker.get("selected").value,
				receivedDate: moment(this.$.dateSentInput.get("value"), "YYYY/MM/DD").valueOf(),
				fileType: files[0].type,
				fileData: inEvent.target.result
			};

			this.$.loadingPopup.hide();
			this.doAddRefund({payload: data});
			this.hide();
		});

		reader.readAsArrayBuffer(files[0]);
	},

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	},

	handleDateSentInputTapped: function(inSender, inEvent)
	{
		this.$.calendarPopup.show();
	},

	calendarDateChanged: function(inSender, inEvent)
	{
		this.set("activeDate", new moment(inEvent.date));
		this.$.calendarPopup.hide();
		return true;
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	}
});