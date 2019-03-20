enyo.kind({
	name: "quantum.TransferDashboardPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		database: null,
		transferCollection: null,
		filteredTransferCollection: null,
		unassignedPayments: null,
		populatingCollection: false,
		populatingPayments: false
	},

	events: {
		onViewItemDetail: "",
		onGoHome: "",
		onLogout: ""
	},

	computed: {
		shouldShowLoadingPopup: ["buildingReport", "populatingCollection", "populatingPayments"]
	},

	components: [
		{name: "unassignedPaymentsSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Unassigned Payments"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Sender", style: "width: 200px;"},
				{content: "Payment Amount", style: "width: 150px;"},
				{content: "Currency", style: "width: 75px;"},
				{content: "Date Received", style: "width: 150px;"},
				{content: "Additional Information", style: "width: 300px;"}
			]},
			{name: "unassignedPaymentsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupUnassignedPaymentRepeaterItem", components: [
				{name: 'paymentItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "paymentFrom", style: "width: 200px;"},
					{name: "paymentAmount", style: "width: 150px; text-align: right; padding-right: 15px;"},
					{name: "currency", style: "width: 75px;"},
					{name: "dateReceived", style: "width: 150px;"},
					{name: "additionalInformation", fit: true},
					{kind: "quantum.Button", enabledClasses: "button danger", style: "margin-left: 10px;", content: "Delete", ontap: "handleDeletePaymentButtonTapped"},
					{kind: "quantum.Button", style: "margin-left: 10px;", content: "View", ontap: "handleViewPaymentButtonTapped"},
					{kind: "quantum.Button", style: "margin-left: 10px;", content: "Assign", ontap: "handleAssignPaymentButtonTapped"}
				]}
			]}
		]},
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Incomplete Transfers"},
		{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Transfer Date", style: "width: 150px;"},
			{content: "Seller Name", style: "width: 200px;"},
			{content: "Buyer Name", style: "width: 200px;"},
			{content: "Transfer Status", style: "width: 200px;"},
			{content: "Number Of Shares", style: "width: 150px;"},
			{content: "Price Per Share", style: "width: 150px;"},
			{content: "Transfer Amount", style: "width: 150px;"}
		]},
		{name: "incompleteTransfersSection", components: [
			{name: "incompleteTransferRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupTransferRepeaterItem", components: [
				{name: 'transferItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleTransferRepeaterItemTapped", components: [
					{name: "transferDate", style: "width: 150px;"},
					{name: "sellerName", style: "width: 200px;"},
					{name: "buyerName", style: "width: 200px;"},
					{name: "transferStatus", style: "width: 200px;"},
					{name: "numShares", style: "width: 150px; text-align: right;"},
					{name: "pricePerShare", style: "width: 150px; text-align: right;"},
					{name: "transferDollarAmount", style: "width: 150px; text-align: right;"}
				]}
			]}
		]},
		{name: "noTransfersLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Transfers Found"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".shouldShowLoadingPopup", to: ".$.loadingPopup.showing"},
		{from: ".filteredTransferCollection", to: ".$.incompleteTransfersSection.showing", transform: function(v){
			return v && v.length > 0;
		}},
		{from: ".unassignedPayments", to: ".$.unassignedPaymentsSection.showing", transform: function(v){
			return v && v.payments && v.payments.length > 0;
		}}
	],

	setShowingForRoles: function()
	{
		//this.$.emailClosedSubscribersButton.set("showing", quantum.hasRole(["admins"], "transfer"));
		this.$.unassignedPaymentsSection.set("showing", this.$.unassignedPaymentsSection.get("showing") && quantum.hasRole(["admins","users"], "transfer"));
	},

	activate: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "transfer")) { this.doGoHome(); return; }

		this.setShowingForRoles();
		
		this.$.incompleteTransferRepeater.setCount(0);
		this.$.unassignedPaymentsRepeater.setCount(0);
		this.populateIncompleteTransfers();
		this.populateUnassignedPayments();
	},

	shouldShowLoadingPopup: function()
	{
		return this.get("populatingCollection") || this.get("populatingPayments");
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	/*****************
	* Repeater Section
	*****************/

	populateIncompleteTransfers: function()
	{
		this.set("populatingCollection", true);
		
		var filteredByStatus = this.get("transferCollection").filter(function(element) {
			try
			{
				return !(element.get("transferStatus") === "complete" || element.get("transferStatus") === "closed" || element.get("transferStatus") === "cancelled");
			}
			catch (err) { return true; }
		});

		this.set("filteredTransferCollection", new quantum.TransferCollection(filteredByStatus));
		this.$.noTransfersLabel.set("showing", this.get("filteredTransferCollection").length === 0);
		this.$.incompleteTransferRepeater.setCount(this.get("filteredTransferCollection").length);
		this.set("populatingCollection", false);
	},

	setupTransferRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.transferItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.transferDate.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("transactionDate") ? moment(this.get("filteredTransferCollection").at(inEvent.index).get("transactionDate")).format("YYYY/MM/DD") : "");
		inEvent.item.$.sellerName.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("seller").name || "");
		inEvent.item.$.buyerName.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("buyer").name || "");
		inEvent.item.$.transferStatus.set("content", quantum.transferStatusLookup(this.get("filteredTransferCollection").at(inEvent.index).get("transferStatus")));
		inEvent.item.$.numShares.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("numShares") ? numeral(this.get("filteredTransferCollection").at(inEvent.index).get("numShares")).format('0,0') : "0");
		inEvent.item.$.pricePerShare.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("pricePerShare") ? "$" + quantum.formatCurrency(this.get("filteredTransferCollection").at(inEvent.index).get("pricePerShare")) : "$0");
		inEvent.item.$.transferDollarAmount.set("content", this.get("filteredTransferCollection").at(inEvent.index).get("totalPurchasePrice") ? "$" + quantum.formatCurrency(this.get("filteredTransferCollection").at(inEvent.index).get("totalPurchasePrice")) : "$0");
		return true;
	},

	handleTransferRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredTransferCollection").at(inEvent.index), collection: this.get("filteredTransferCollection")});
	},

	/*****************
	* Unassigned Payments Repeater Section
	*****************/

	populateUnassignedPayments: function()
	{
		if (!quantum.hasRole(["admins","users"], "transfer")) { return; }

		if (!this.get("unassignedPayments")) {return true;}
		this.set("populatingPayments", true);

		//Force the bindings to refresh
		var tempUnassignedPayments = this.get("unassignedPayments");
		this.set("unassignedPayments", null);
		this.set("unassignedPayments", tempUnassignedPayments);
		
		this.$.unassignedPaymentsRepeater.setCount(this.get("unassignedPayments").payments.length);
		this.set("populatingPayments", false);
	},

	setupUnassignedPaymentRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], "transfer")) { return; }

		if (!inEvent.item) {return true;}

		inEvent.item.$.paymentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.paymentFrom.set("content", this.get("unassignedPayments").payments[inEvent.index].sender);
		inEvent.item.$.paymentAmount.set("content", "$" + quantum.formatCurrency(this.get("unassignedPayments").payments[inEvent.index].amount));
		inEvent.item.$.currency.set("content", this.get("unassignedPayments").payments[inEvent.index].currency);
		inEvent.item.$.dateReceived.set("content", this.get("unassignedPayments").payments[inEvent.index].valueDate);
		inEvent.item.$.additionalInformation.set("content", this.get("unassignedPayments").payments[inEvent.index].additionalInformation);
		return true;
	},

	handleAssignPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], "transfer")) { return; }

		if (this.$.assignPaymentPopup) {
			this.$.assignPaymentPopup.hide();
			this.$.assignPaymentPopup.destroy();
		}
		this.createComponent({name: "assignPaymentPopup", kind: "quantum.AssignPaymentPopup", transferCollection: this.get("filteredTransferCollection"), payment: this.get("unassignedPayments").payments[inEvent.index], onAssignPayment: "handleAssignPayment", onHide: "handlePopupHidden"} , {owner:this});
		this.$.assignPaymentPopup.show();
	},

	handleAssignPayment: function(inSender, inEvent)
	{
		this.set("populatingPayments", true);
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.set("populatingPayments", false);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			//First, muck with the local objects
			var paymentToAssign = inEvent.payload;

			var transferResult = this.get("filteredTransferCollection").find(function(value, index, array){
				return value.get("_id") === paymentToAssign.targetID;
			});

			if (!transferResult){
				alertify.error("Could not find payment to assign");
				return true;
			}

			if (!transferResult.get("paymentsReceived")) {transferResult.set("paymentsReceived", []);}

			transferResult.get("paymentsReceived").push({
				name: paymentToAssign.payment.filename,
				amount: paymentToAssign.amount,
				paymentType: "wire",
				receivedDate: moment(paymentToAssign.payment.valueDate).format("YYYY/MM/DD"),
				fileType: "application/pdf"
			});

			transferResult.set("fundsReceived", quantum.parseFloat(transferResult.get("fundsReceived")) + paymentToAssign.amount);

			if (!transferResult.get("_attachments")) {transferResult.set("_attachments", {});}

			if (paymentToAssign.payment.amount - paymentToAssign.amount <= 0)
			{
				delete this.get("unassignedPayments")._attachments[paymentToAssign.payment.filename];
				var paymentIndex = this.get("unassignedPayments").payments.indexOf(paymentToAssign.payment);
				this.get("unassignedPayments").payments.splice(paymentIndex, 1);
			}
			else
			{
				paymentToAssign.payment.amount = paymentToAssign.payment.amount - paymentToAssign.amount;
			}
			
			//Next, get the attatchment so that we can move it.
			this.get("database").getAttachment("unassignedPayments", paymentToAssign.payment.filename, enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.set("populatingPayments", false);
					return;
				}

				transferResult.get("_attachments")[paymentToAssign.payment.filename] = {
					"content_type": "application/pdf",
					"data": response
				};

				//Finally, commit the changed objects and refresh the repeaters
				//TODO: Activate the subscriber detail page automatically?
				this.get("database").bulkDocs([this.get("unassignedPayments"), transferResult.raw()], enyo.bind(this, function(err, response){
					this.set("populatingPayments", false);

					if (err)
					{
						alertify.error("Failed to update database");
						console.log(err);
						return;
					}

					response.forEach(enyo.bind(this, function(value, index, array){
						if (value.error)
						{	
							alertify.error("Failed To Update Record");
							console.log("Failed To Update Record", value);
						}
						
						if (value.id === "unassignedPayments")
						{
							this.get("unassignedPayments")._rev = value.rev;
						}
						else
						{
							transferResult.set("_rev", value.rev);
						}
					}));

					alertify.success("Successfully updated database");
					this.activate();
				}));
			}));
		}));
	},

	handleDeletePaymentButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], "transfer")) { return; }

		this.set("populatingPayments", true);
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.set("populatingPayments", false);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			//First, muck with the local objects
			delete this.get("unassignedPayments")._attachments[this.get("unassignedPayments").payments[inEvent.index].filename];
			this.get("unassignedPayments").payments.splice(inEvent.index, 1);

			//Then commit the changed object and refresh the repeaters
			//TODO: Activate the subscriber detail page automatically?
			this.get("database").post(this.get("unassignedPayments"), enyo.bind(this, function(err, response){
				this.set("populatingPayments", false);

				if (err)
				{
					alertify.error("Failed to update database");
					console.log(err);
					return;
				}

				this.get("unassignedPayments")._rev = response.rev;

				alertify.success("Successfully updated database");
				this.activate();
			}));
		}));
	},

	handleViewPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users"], "transfer")) { return; }

		this.set("populatingPayments", true);
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.set("populatingPayments", false);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			this.get("database").getAttachment("unassignedPayments", this.get("unassignedPayments").payments[inEvent.index].filename, enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.set("populatingPayments", false);
					return;
				}

				var url = URL.createObjectURL(response);
				this.set("populatingPayments", false);
				window.open(url);
			}));
		}));
	}
});