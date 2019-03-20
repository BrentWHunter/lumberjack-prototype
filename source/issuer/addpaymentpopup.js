enyo.kind({
	kind: "lumberjack.Popup",
	name: "lumberjack.AddPaymentPopup",

	published: {
		activeDate: moment()
	},

	events: {
		onAddPayment: ""
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "padding: 10px;", components: [
			{style: "font-size: 24px; text-align: center;", content: "Add Payment"},
			{kind: "lumberjack.Input", name:"payerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 34px; width: 161px;", decoratorStyle: "width: 250px;", inputStyle: "width: 100%;", type:"text", label:"Payer Name", required:true},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Applied Amount", style: "width: 140px; line-height: 34px;"},
				{kind: "lumberjack.Input", name:"paymentAmountInput", labelStyle:"color: white; display: inline-block; font-size: 20px; line-height: 34px;", decoratorStyle: "width: 250px;", inputStyle: "margin-left: 10px; width: 250px;", type:"text", label:"$", required:true}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Received Amount", style: "width: 140px; line-height: 34px;"},
				{kind: "lumberjack.Input", name:"receivedAmountInput", labelStyle:"color: white; display: inline-block; font-size: 20px; line-height: 34px;", decoratorStyle: "width: 250px;", inputStyle: "margin-left: 10px; width: 250px;", type:"text", label:"$", required:true}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Payment Type", style: "line-height: 38px; width: 160px;"},
				{kind: "onyx.PickerDecorator", alwaysLooksFocused: true, components: [
					{style: "width: 250px;"},
					{name: "paymentTypePicker", kind: "onyx.Picker", components: [
						{content: "Wire Payment", value: "wire", active: true},
						{content: "Deposit", value: "deposit"},
						{content: "Electronic Funds Transfer", value: "eft"},
						{content: "Bank Draft", value: "bankDraft"},
						{content: "Cashier's Check", value: "cashiersCheck"},
						{content: "Money Order", value: "moneyOrder"},
						{content: "Personal Check", value: "personalCheck"},
						{content: "Corporate Check", value: "corporateCheck"},
						{content: "Debt Conversion", value: "debtConversion"}
					]}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Date Received", style: "line-height: 34px; width: 160px;"},
				{components: [
					{kind: "lumberjack.Input", name: "dateReceivedInput", ontap: "handleDateReceivedInputTapped", labelStyle: "", decoratorStyle: "width: 250px;", inputStyle: "width: 250px;", type:"text", required: true, readonly: true},
					{name: "calendarPopup", kind: "lumberjack.CalendarPopup", onSelect: "calendarDateChanged"}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Documentation", style: "line-height: 38px; width: 160px;"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding-left: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
					{name: "fileInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf, image/jpeg, image/png, image/tiff"}}
				]}
			]},
			{style: "text-align: center; margin-top: 10px;", components: [
				{kind: "lumberjack.Button", enabledClasses: "button primary", content: "Add", ontap: "handleAddButtonTapped"},
				{kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Cancel", ontap: "handleCancelButtonTapped"}
			]},
			{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
		]}
	],

	bindings: [
		{from: ".activeDate", to: ".$.dateReceivedInput.value", transform: function(v){
			return v.format("YYYY/MM/DD");
		}}
	],

	show: function()
	{
		this.inherited(arguments);
		lumberjack.fixShim();
	},

	getPaymentAmount: function()
	{
		return lumberjack.parseFloat(lumberjack.formatCurrency(this.$.paymentAmountInput.get("value")));
	},

	getReceivedAmount: function()
	{
		return lumberjack.parseFloat(lumberjack.formatCurrency(this.$.receivedAmountInput.get("value")));
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
		else if (this.getPaymentAmount() <= 0)
		{
			isValid = false;
			this.$.paymentAmountInput.setBorderError();
		}
		else { this.$.paymentAmountInput.clearBorderError(); }

		// Received Amount:
		if (!this.$.receivedAmountInput.validate()) { isValid = false; }
		else if (this.getReceivedAmount() <= 0)
		{
			isValid = false;
			this.$.receivedAmountInput.setBorderError();
		}
		else { this.$.receivedAmountInput.clearBorderError(); }

		// Payment Type:
		if (this.$.paymentTypePicker.get("selected") == null || this.$.paymentTypePicker.get("selected").value === "")
		{
			isValid = false;
			this.$.paymentTypePicker.parent.applyStyle("border", borderError);
		}
		else { this.$.paymentTypePicker.parent.applyStyle("border", null); }

		// Date Received:
		if (!this.$.dateReceivedInput.validate()) { isValid = false; }
		else
		{
			var dateReceived = moment(this.$.dateReceivedInput.get("value"), "YYYY/MM/DD");
			var now = moment();
			if (!dateReceived.isValid() || dateReceived.isAfter(now, 'day'))
			{
				isValid = false;
				this.$.dateReceivedInput.setBorderError();
			}
			else { this.$.dateReceivedInput.clearBorderError(); }
		}

		// File:
		if (this.$.fileInput.hasNode().files.length <= 0)
		{
			isValid = false;
			this.$.fileInput.applyStyle("border", borderError);
		}
		else { this.$.fileInput.applyStyle("border", null); }

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
			this.loadingPopup.hide();
			alertify.error("Error Reading File For Upload");
			console.log("File upload error", error);
			return;
		});

		reader.onloadend = enyo.bind(this, function(inEvent){
			var data = {
				name: files[0].name,
				attachmentID: "$"+uuid.v4().replace(/-/g, ""),
				payerName: this.$.payerNameInput.get("value"),
				amount: this.getPaymentAmount(),
				receivedAmount: this.getReceivedAmount(),
				paymentType: this.$.paymentTypePicker.get("selected").value,
				receivedDate: moment(this.$.dateReceivedInput.get("value"), "YYYY/MM/DD").valueOf(),
				fileType: files[0].type,
				fileData: inEvent.target.result
			};

			this.$.loadingPopup.hide();
			this.doAddPayment({payload: data});
			this.hide();
		});

		reader.readAsArrayBuffer(files[0]);
	},

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	},

	handleDateReceivedInputTapped: function(inSender, inEvent)
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