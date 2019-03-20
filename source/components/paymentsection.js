enyo.kind({
	name: "quantum.PaymentSection",

	published: {
		activeEntry: null,
		database: null,
		paymentsReceived: null,
		paymentsToUpload: null,
		paymentsToDelete: null,
		purchaseTotal: null,
		attachmentIndexKey: "attachmentID",
		module: ""
	},

	events: {
		onAddPayment: "",
		onAddRefund: "",
		onDeletePayment: "",
		onLogout: ""
	},

	components: [
		{style: "padding-left: 5px; min-width: 725px;", name: "receivedPaymentsSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Received Payments"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Amount", style: "width: 150px;"},
				{content: "Type", style: "width: 200px;"},
				{content: "Date Received", style: "width: 90px;"}
			]},
			{name: "paymentsReceivedRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupPaymentRepeaterItem", components: [
				{name: "paymentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "amount", style: "width: 150px; line-height: 34px;"},
					{name: "paymentType", style: "width: 200px; line-height: 34px;"},
					{name: "dateReceived", style: "width: 90px; line-height: 34px;"},
					{name: "viewButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View", ontap: "viewPaymentButtonTapped"},
					{name: "downloadButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Download", ontap: "downloadPaymentButtonTapped"},
					{name: "deleteButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "deletePaymentButtonTapped"}
				]}
			]},
			{name: "noPaymentsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Payments Received"},
			{name: "addPaymentButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-top: 10px;", content: "Add Payment", ontap: "handleAddPaymentButtonTapped"},
			{name: "addRefundButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-top: 10px; margin-left: 10px;", content: "Reverse Payment", ontap: "handleAddRefundButtonTapped"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"},
	],

	bindings:[
		{from: ".paymentsReceived", to: ".paymentsToUpload", transform: function(v) {
 			// Use the binding to force the "paymentsToUpload" queue to reset when the "paymentsReceived" changes.
 			return [];
 		}},
 		{from: ".paymentsReceived", to: ".paymentsToDelete", transform: function(v) {
 			// Use the binding to force the "paymentsToDelete" queue to reset when the "paymentsReceived" changes.
 			return [];
 		}}
	],

	rendered: function()
	{
		if(!quantum.hasRole(["admins"], this.get("module")))
		{
			this.$.addRefundButton.set("showing", false);
		}
	},

	setupPaymentRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], this.get("module"))) { return; }

		if (!inEvent.item) {return true;}

		inEvent.item.$.paymentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.amount.set("content", "$" + quantum.formatCurrency(this.get("paymentsReceived")[inEvent.index].amount));
		inEvent.item.$.paymentType.set("content", quantum.paymentTypeLookup(this.get("paymentsReceived")[inEvent.index].paymentType));
		inEvent.item.$.dateReceived.set("content", this.get("paymentsReceived")[inEvent.index].receivedDate);

		inEvent.item.$.deleteButton.set("showing", this.canEdit());
		if(this.get("paymentsReceived")[inEvent.index].localDownload !== true)
		{
			inEvent.item.$.deleteButton.set("disabled", true);
		}

		return true;
	},

	docxFilePopup: function(fileType, fileData, url)
	{
		if (fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
			var DOCXfileContents = "";

			function handleFileSelect(arrayBuffer, callback) {
				mammoth.convertToHtml({arrayBuffer: arrayBuffer})
				.then(displayResult)
				.then(callback);
			}

			function displayResult(result) {
				DOCXfileContents = result.value;
			}

			function loadPopUp(result) {
				if (that.$.showDocumentPopup) 
				{
					that.$.showDocumentPopup.hide();
					that.$.showDocumentPopup.destroy();
				}
				that.createComponent({name: "showDocumentPopup", kind: "quantum.docxPopup"}, {owner:that});
				that.$.showDocumentPopup.$.main.addContent(DOCXfileContents);
				that.$.showDocumentPopup.show();
			}

			var that = this; // sets "this" inside the function

			handleFileSelect(fileData, loadPopUp);

		} 
		else 
		{
			window.open(url);
		}
	},

	viewPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], this.get("module"))) { return; }

		var attachmentIndexKey = this.get("attachmentIndexKey");

		if (this.get("paymentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			var fileType = this.get("paymentsReceived")[inEvent.index].fileType;
			var fileData = this.get("paymentsReceived")[inEvent.index].fileData;
			var url = URL.createObjectURL(new Blob([new Uint8Array(this.get("paymentsReceived")[inEvent.index].fileData)], {type: this.get("paymentsReceived")[inEvent.index].fileType}));
			this.docxFilePopup(fileType, fileData, url);
		}
		else
		{
			this.$.loadingPopup.show("Loading");
			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Login Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("paymentsReceived")[inEvent.index][attachmentIndexKey], enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					var reader = new FileReader();
					reader.addEventListener("loadend", enyo.bind(this, function() {
						// rebuild the blob because it's coming back from the couchdb server with the wrong MIME type
						var fileType = this.get("paymentsReceived")[inEvent.index].fileType;
						var fileData = reader.result;
						var url = URL.createObjectURL(new Blob([reader.result], {type: fileType}));
						this.$.loadingPopup.hide();
						// window.open(url);
						this.docxFilePopup(fileType, fileData, url);
					}));
					reader.readAsArrayBuffer(response);
				}));
			}));
		}
	},

	downloadPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], this.get("module"))) { return; }

		var attachmentIndexKey = this.get("attachmentIndexKey");

		if (this.get("paymentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			saveAs(new Blob([new Uint8Array(this.get("paymentsReceived")[inEvent.index].fileData)], {type: this.get("paymentsReceived")[inEvent.index].fileType}), this.get("paymentsReceived")[inEvent.index].name);
		}
		else
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Login Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("paymentsReceived")[inEvent.index][attachmentIndexKey], enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();
					saveAs(response, this.get("paymentsReceived")[inEvent.index].name);
				}));
			}));
		}
	},

	deletePaymentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.confirmDeletePaymentPopup)
		{
			this.$.confirmDeletePaymentPopup.hide();
			this.$.confirmDeletePaymentPopup.destroy();
		}
		this.createComponent({name: "confirmDeletePaymentPopup", kind: "quantum.ConfirmPopup", onYesWithReturnValue: "deletePayment", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeletePaymentPopup.show("Delete? You must save entry to make this permament.", inEvent.index);
	},

	deletePayment: function(inSender, inEvent)
	{
		var attachmentIndexKey = this.get("attachmentIndexKey");
		var itemToFind = this.get("paymentsReceived")[inEvent.returnValue];

		if (this.get("paymentsReceived")[inEvent.returnValue].localDownload)
		{
			//Delete the local data
			var result = this.get("paymentsToUpload").find(function(value, index, array) {
				return value[attachmentIndexKey] === itemToFind[attachmentIndexKey];
			});

			this.get("paymentsToUpload").splice(this.get("paymentsToUpload").indexOf(result), 1);
			this.doDeletePayment({payment: itemToFind});
			this.get("paymentsReceived").splice(inEvent.returnValue, 1);
			alertify.success("Payment Deleted");
			this.refreshRepeater();
		}
		else
		{
			this.paymentsToDelete.push(this.get("paymentsReceived")[inEvent.returnValue][attachmentIndexKey]);
			this.doDeletePayment({payment: itemToFind});
			this.get("paymentsReceived").splice(inEvent.returnValue, 1);
			this.refreshRepeater();
		}

		if(this.calculateFundsPaid() < this.get("purchaseTotal"))
		{
			this.$.addPaymentButton.set("disabled", false);
		}
		if(this.calculateFundsPaid() <= 0)
		{
			this.$.addRefundButton.set("disabled", true);
		}
	},

	canEdit: function()
	{
		return quantum.hasRole(["admins","users"], this.get("module"));
	},

	calculateFundsPaid: function()
	{
		var fundsReceived = 0;
		for(var i = 0; i < this.get("paymentsReceived").length; i++)
		{
			fundsReceived = fundsReceived + quantum.parseFloat(this.get("paymentsReceived")[i].amount);
		}
		return fundsReceived;
	},

	handleAddPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.addPaymentPopup) {
			this.$.addPaymentPopup.hide();
			this.$.addPaymentPopup.destroy();
		}
		this.createComponent({name: "addPaymentPopup", kind: "quantum.AddPaymentPopup", onAddPayment: "", onHide: "handlePopupHidden"} , {owner:this});
		this.$.addPaymentPopup.show();
	},

	handleAddRefundButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.addRefundPopup) {
			this.$.addRefundPopup.hide();
			this.$.addRefundPopup.destroy();
		}
		this.createComponent({name: "addRefundPopup", kind: "quantum.AddRefundPopup", defaultRefund: this.calculateFundsPaid(), onAddRefund: "", onHide: "handlePopupHidden"} , {owner:this});
		this.$.addRefundPopup.show();
	},

	isDirty: function()
	{
		if(this.get("paymentsToUpload").length !== 0 || this.get("paymentsToDelete").length !== 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	disableForFunds: function()
	{
		if(this.calculateFundsPaid() >= this.get("purchaseTotal"))
		{
			this.$.addPaymentButton.set("disabled", true);
		}
		else
		{
			this.$.addPaymentButton.set("disabled", false);
		}

		if(this.calculateFundsPaid() > 0)
		{
			this.$.addRefundButton.set("disabled", false);
		}
		else
		{
			this.$.addRefundButton.set("disabled", true);
		}
	},

	setAddDisabled: function(disabled)
	{
		this.$.addPaymentButton.set("disabled", disabled);
	},

	setRefundDisabled: function(disabled)
	{
		this.$.addRefundButton.set("disabled", disabled);
	},

	refreshRepeater: function()
	{
		this.$.noPaymentsLabel.set("showing", this.get("paymentsReceived").length === 0);
		this.$.paymentsReceivedRepeater.set("showing", this.get("paymentsReceived").length > 0);
		this.$.paymentsReceivedRepeater.setCount(this.get("paymentsReceived").length);
	},

	clearQueues: function()
	{
		this.set("paymentsToUpload", []);
		this.set("paymentsToDelete", []);
	}
});