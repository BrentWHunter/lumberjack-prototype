enyo.kind({
	kind: "quantum.Popup",
	name: "quantum.AddDocumentPopup",

	published: {
		activeDate: moment()
	},

	events: {
		onAddDocument: ""
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "padding: 10px;", components: [
			{style: "font-size: 24px; text-align: center;", content: "Add Document"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "File Description", style: "line-height: 34px; width: 150px;"},
				{kind: "quantum.Input", name: "fileDescriptionInput", labelStyle: "", decoratorStyle: "width: 250px;", inputStyle: "width: 250px;", type:"text", required: true}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Date Received", style: "line-height: 34px; width: 150px;"},
				{components: [
					{kind: "quantum.Input", name: "dateReceivedInput", ontap: "handleDateReceivedInputTapped", labelStyle: "", decoratorStyle: "width: 250px;", inputStyle: "width: 250px;", type:"text", required: true, readonly: true},
					{name: "calendarPopup", kind: "quantum.CalendarPopup", onSelect: "calendarDateChanged"}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 7px;", components: [
				{content: "File", style: "line-height: 38px; width: 150px;"},
				{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding-left: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
					{name: "fileInput", kind: "enyo.Input", attributes: {"type": "file"}}
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
		{from: ".activeDate", to: ".$.dateReceivedInput.value", transform: function(v){
			return v.format("YYYY/MM/DD");
		}}
	],

	show: function()
	{
		this.inherited(arguments);
		quantum.fixShim();
	},

	validateInputs: function()
	{
		var borderError = "2px solid red";
		var isValid = true;

		// File Description:
		if (!this.$.fileDescriptionInput.validate()){isValid = false;}
		else { this.$.fileDescriptionInput.clearBorderError(); }

		// Date Received:
		if (!this.$.dateReceivedInput.validate()){isValid = false;}
		else { this.$.dateReceivedInput.clearBorderError(); }

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
			//TODO: better error handling;
			this.loadingPopup.hide();
			console.log("ERROR!", error);
		});

		reader.onloadend = enyo.bind(this, function(inEvent){
			var data = {
				name: files[0].name,
				attachmentID: "$"+uuid.v4().replace(/-/g, ""),
				description: this.$.fileDescriptionInput.get("value"),
				receivedDate: moment(this.$.dateReceivedInput.get("value"),"YYYY/MM/DD").valueOf(),
				fileType: files[0].type,
				fileData: inEvent.target.result
			};

			this.$.loadingPopup.hide();
			this.doAddDocument({payload: data});
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