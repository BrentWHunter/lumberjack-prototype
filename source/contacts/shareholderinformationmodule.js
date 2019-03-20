/* global numeral,moment */ 
enyo.kind({
	name: "lumberjack.ShareholderInformationModule",

	events: {
		onViewEventDetail: ""
	},

	published: {
		shareholderInfo: null
	},

	components: [
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Shareholder Information"},
		{style: "width: 50%; padding-left: 5px;", components: [
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Number of Shares", style: "line-height: 38px; width: 250px;"},
				{kind: "onyx.InputDecorator", style: "margin-left: 10px;", components: [
					{name: "numSharesInput", kind: "onyx.Input", disabled: true, style: "width: 275px;"}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Shares Available For Sale", style: "line-height: 38px; width: 250px;"},
				{kind: "onyx.InputDecorator", style: "margin-left: 10px;", components: [
					{name: "numSharesAfterPendingTransactionsInput", kind: "onyx.Input", disabled: true, style: "width: 275px;"}
				]}
			]}
		]},
		{name: "transferAgentIDSection", style: "width: 50%; padding-left: 5px;", components: [
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Transfer Agent ID", style: "line-height: 38px; width: 170px;"},
				{kind: "onyx.InputDecorator", style: "margin-left: 10px;", components: [
					{name: "transferAgentIDInput", kind: "onyx.Input", style: "width: 275px;"}
				]}
			]}
		]},
		{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Shareholder History"},
		{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Transaction Date", style: "width: 150px;"},
			{content: "Source", style: "width: 300px;"},
			{content: "Number of Shares", style: "width: 150px;"},
			{content: "Price Per Share", style: "width: 150px;"},
			{content: "Description", style: "min-width: 500px;"}
		]},
		{name: "shareholderHistoryRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupHistoryItem", components: [
			{name: "historyItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "transactionDate", style: "width: 150px; line-height: 34px;"},
				{name: "transactionSource", style: "width: 300px; line-height: 34px;"},
				{name: "numShares", style: "width: 150px; line-height: 34px;"},
				{name: "pricePerShare", style: "width: 150px; line-height: 34px;"},
				{name: "description", style: "width: 500px; line-height: 34px;"},
				{name: "viewButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View Detail", ontap: "viewHistoryDetailButtonTapped"}
			]}
		]},
		{name: "noHistoryLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Shareholder History"},
		{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Pending Sales"},
		{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Transaction Date", style: "width: 150px;"},
			{content: "Source", style: "width: 300px;"},
			{content: "Number of Shares", style: "width: 150px;"},
			{content: "Price Per Share", style: "width: 150px;"},
			{content: "Description", style: "min-width: 500px;"}
		]},
		{name: "pendingTransactionsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupPendingTransactionItem", components: [
			{name: "pendingTransactionItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "transactionDate", style: "width: 150px; line-height: 34px;"},
				{name: "transactionSource", style: "width: 300px; line-height: 34px;"},
				{name: "numShares", style: "width: 150px; line-height: 34px;"},
				{name: "pricePerShare", style: "width: 150px; line-height: 34px;"},
				{name: "description", style: "width: 500px; line-height: 34px;"},
				{name: "viewButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View Detail", ontap: "viewPendingTransactionDetailButtonTapped"}
			]}
		]},
		{name: "noPendingTransactionsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Pending Sales"}
	],

	bindings: [
		{from: ".shareholderInfo.numShares", to: ".$.numSharesInput.value", transform: function(v){
			try
			{
				return numeral(v).format("0,0");
			}
			catch (e)
			{
				return 0;
			}
		}},
		{from: ".shareholderInfo.numSharesAfterPendingTransactions", to: ".$.numSharesAfterPendingTransactionsInput.value", transform: function(v){
			try
			{
				return numeral(v).format("0,0");
			}
			catch (e)
			{
				return 0;
			}
		}},
		{from: ".shareholderInfo.transferAgentIDs", to: ".$.transferAgentIDSection.showing", transform: function(v){
			try
			{
				return v.length > 0;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".shareholderInfo.transferAgentIDs", to: ".$.transferAgentIDInput.value", transform: function(v){
			try
			{
				return v[0];
			}
			catch (e)
			{
				return "";
			}
		}},
		{from: ".shareholderInfo.transactionHistory", to: ".$.shareholderHistoryRepeater.showing", transform: function(v){
			try
			{
				return v.length > 0;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".shareholderInfo.transactionHistory", to: ".$.noHistoryLabel.showing", transform: function(v){
			try
			{
				return v.length === 0;
			}
			catch (e)
			{
				return true;
			}
		}},
		{from: ".shareholderInfo.transactionHistory", to: ".$.shareholderHistoryRepeater.count", transform: function(v){
			try
			{
				this.$.shareholderHistoryRepeater.setCount(v.length);
				return v.length;
			}
			catch (e)
			{
				return 0;
			}
		}},
		{from: ".shareholderInfo.pendingTransactions", to: ".$.pendingTransactionsRepeater.showing", transform: function(v){
			try
			{
				return v.length > 0;
			}
			catch (e)
			{
				return false;
			}
		}},
		{from: ".shareholderInfo.pendingTransactions", to: ".$.noPendingTransactionsLabel.showing", transform: function(v){
			try
			{
				return v.length === 0;
			}
			catch (e)
			{
				return true;
			}
		}},
		{from: ".shareholderInfo.pendingTransactions", to: ".$.pendingTransactionsRepeater.count", transform: function(v){
			try
			{
				this.$.pendingTransactionsRepeater.setCount(v.length);
				return v.length;
			}
			catch (e)
			{
				return 0;
			}
		}}
	],

	setupHistoryItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var transactionHistoryItem = this.get("shareholderInfo").get("transactionHistory").at(inEvent.index);

		inEvent.item.$.historyItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.transactionDate.set("content", moment(transactionHistoryItem.get("timestamp")).format("YYYY/MM/DD"));
		switch(transactionHistoryItem.get("transactionSource"))
		{
			case "placement":
				inEvent.item.$.transactionSource.set("content", "Placement Subscription");
				break;
			case "transfer":
				inEvent.item.$.transactionSource.set("content", "Transfer");
				break;
			case "option":
				inEvent.item.$.transactionSource.set("content", "Option Exercise");
				break;
			case "warrant":
				inEvent.item.$.transactionSource.set("content", "Warrant Exercise");
				break;
			default:
				inEvent.item.$.transactionSource.set("content", "Unknown");
		}

		inEvent.item.$.numShares.set("content", (transactionHistoryItem.get("transactionType") === "increase" ? "+" : "-") + numeral(transactionHistoryItem.get("numShares")).format("0,0"));
		var pricePerShareContent;
		if (transactionHistoryItem.get("pricePerShare") === 0){
			pricePerShareContent = "Nominal";
		}
		else
		{
			pricePerShareContent = "$" + lumberjack.formatCurrency(transactionHistoryItem.get("pricePerShare"));
		}
		inEvent.item.$.pricePerShare.set("content", pricePerShareContent);
		inEvent.item.$.description.set("content", transactionHistoryItem.get("description"));
		inEvent.item.$.viewButton.set("disabled", transactionHistoryItem.get("sourceDatabase") === "" || transactionHistoryItem.get("sourceRecord") === "");
		return true;
	},

	setupPendingTransactionItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var pendingTransactionItem = this.get("shareholderInfo").get("pendingTransactions").at(inEvent.index);

		inEvent.item.$.pendingTransactionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.transactionDate.set("content", moment(pendingTransactionItem.get("timestamp")).format("YYYY/MM/DD"));
		switch(pendingTransactionItem.get("transactionSource"))
		{
			case "placement":
				inEvent.item.$.transactionSource.set("content", "Placement Subscription");
				break;
			case "transfer":
				inEvent.item.$.transactionSource.set("content", "Transfer");
				break;
			case "option":
				inEvent.item.$.transactionSource.set("content", "Option Exercise");
				break;
			case "warrant":
				inEvent.item.$.transactionSource.set("content", "Warrant Exercise");
				break;
			default:
				inEvent.item.$.transactionSource.set("content", "Unknown");
		}

		inEvent.item.$.numShares.set("content", (pendingTransactionItem.get("transactionType") === "increase" ? "+" : "-") + numeral(pendingTransactionItem.get("numShares")).format("0,0"));
		var pricePerShareContent;
		if (pendingTransactionItem.get("pricePerShare") === 0){
			pricePerShareContent = "Nominal";
		}
		else
		{
			pricePerShareContent = "$" + lumberjack.formatCurrency(pendingTransactionItem.get("pricePerShare"));
		}
		inEvent.item.$.pricePerShare.set("content", pricePerShareContent);
		inEvent.item.$.description.set("content", pendingTransactionItem.get("description"));
		inEvent.item.$.viewButton.set("disabled", pendingTransactionItem.get("sourceDatabase") === "" || pendingTransactionItem.get("sourceRecord") === "");

		return true;
	},

	viewHistoryDetailButtonTapped: function(inSender, inEvent)
	{
		var transferDataItem = this.get("shareholderInfo").get("transactionHistory").at(inEvent.index);
		if(transferDataItem.get("transactionSource") === "placement")
		{
			this.doViewEventDetail({mode: "placements", target: transferDataItem.get("sourceDatabase"), record: transferDataItem.get("sourceRecord")});
		}
		else
		{
			this.doViewEventDetail({mode: transferDataItem.get("transactionSource"), target: transferDataItem.get("sourceRecord")});
		}
	},

	viewPendingTransactionDetailButtonTapped: function(inSender, inEvent)
	{
		var transferDataItem = this.get("shareholderInfo").get("pendingTransactions").at(inEvent.index);
		if(transferDataItem.get("transactionSource") === "placement")
		{
			this.doViewEventDetail({mode: "placements", target: transferDataItem.get("sourceDatabase"), record: transferDataItem.get("sourceRecord")});
		}
		else
		{
			this.doViewEventDetail({mode: transferDataItem.get("transactionSource"), target: transferDataItem.get("sourceRecord")});
		}
	}
});