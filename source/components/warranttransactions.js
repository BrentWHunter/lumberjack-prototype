enyo.kind({

	name: "quantum.WarrantTransactions",

	published: {
		mode: "pending",
		transactionCollection: null
	},

	events: {
		onAddTransaction: "",
		onViewTransaction: ""
	},

	components: [
		{style: "min-width: 670px;", components: [
			{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
				{name: "header", style: "font-size: 24px; padding-top: 6px;", content: "Transactions"},
				{fit: true},
				{name: "addTransactionButton", kind: "quantum.Button", style: "height: 30px;", content: "Add Transaction", ontap: "handleAddTransactionButtonTapped"}
			]},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Type", style: "width: 100px;"},
				{content: "Status", style: "width: 250px; margin-left: 10px;"},
				{content: "Number of Shares", style: "width: 100px; margin-left: 10px;"},
				{content: "Share Price", style: "width: 100px; margin-left: 10px;"},
				{content: "Currency", style: "width: 100px; margin-left: 10px;"}
			]},
			{name: "transactionsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupTransactionRepeaterItem", components: [
				{name: "transactionItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleTransactionRepeaterItemTapped", components: [
					{name: "type", style: "width: 100px; line-height: 34px; text-transform: capitalize;"},
					{name: "status", style: "width: 250px; line-height: 34px; margin-left: 10px;"},
					{name: "numShares", style: "width: 100px; line-height: 34px; margin-left: 10px;"},
					{name: "sharePrice", style: "width: 100px; line-height: 34px; margin-left: 10px;"},
					{name: "currency", style: "width: 100px; line-height: 34px; margin-left: 10px;"},
				]}
			]},
			{name: "noTransactionsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Transactions"}
		]}
	],

	bindings:[
		{from: ".mode", to: ".$.header.content", transform: function(v) {
 			switch (v)
 			{
 				case "pending":
 					return "Pending Transactions";
 				case "cancelled":
 					return "Cancelled Transactions";
 				default:
 					return "Transactions";
 			}
 		}},
 		{from: ".mode", to: ".$.addTransactionButton.showing", transform: function(v) {
 			return v === "pending";
 		}},
 		{from: ".mode", to: ".$.noTransactionsLabel.content", transform: function(v) {
 			switch (v)
 			{
 				case "pending":
 					return "No Pending Transactions";
 				case "cancelled":
 					return "No Cancelled Transactions";
 				default:
 					return "No Transactions";
 			}
 		}}
	],

	setupTransactionRepeaterItem: function(inSender, inEvent)
	{
		if (inEvent.item == null) { return true; }

		inEvent.item.$.transactionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		var transactionCollection = this.get("transactionCollection") || [];

		inEvent.item.$.type.set("content", transactionCollection.at(inEvent.index).get("type"));
		inEvent.item.$.status.set("content", quantum.subscriptionStatusLookup(transactionCollection.at(inEvent.index).get("status")));
		inEvent.item.$.numShares.set("content", transactionCollection.at(inEvent.index).get("numShares"));
		inEvent.item.$.sharePrice.set("content", transactionCollection.at(inEvent.index).get("sharePrice"));
		inEvent.item.$.currency.set("content", transactionCollection.at(inEvent.index).get("currency"));

		return true;
	},

	handleAddTransactionButtonTapped: function(inSender, inEvent)
	{
		if (this.get("mode") !== "pending") { return; }

		this.doAddTransaction();
	},

	handleTransactionRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewTransaction({mode: this.get("mode"), item: this.get("transactionCollection").at(inEvent.index), collection: this.get("transactionCollection")});
	},

	refreshRepeater: function()
	{
		var transactionCollection = this.get("transactionCollection") || [];
		this.$.noTransactionsLabel.set("showing", transactionCollection.length === 0);
		this.$.transactionsRepeater.set("showing", transactionCollection.length > 0);
		this.$.transactionsRepeater.setCount(transactionCollection.length);
	}
});