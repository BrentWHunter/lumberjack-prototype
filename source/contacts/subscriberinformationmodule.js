/* global numeral,lumberjack */
enyo.kind({
	name: "lumberjack.SubscriberInformationModule",

	events: {
		onViewEventDetail: ""
	},

	published: {
		subscriberInfo: null,
		title: "Subscriptions",
		mode: "active",
		subscriptions: null
	},

	components: [
		{name: "moduleTitle", style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;"},
		{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Placement", style: "width: 500px;"},
			{content: "Number of Shares", style: "width: 150px;"},
			{content: "Price Per Share", style: "width: 150px;"}
		]},
		{name: "subscriptionRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupSubscriptionItem", components: [
			{name: "subscriptionItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "placementName", style: "width: 500px; line-height: 34px;"},
				{name: "numShares", style: "width: 150px; line-height: 34px;"},
				{name: "pricePerShare", style: "width: 150px; line-height: 34px;"},
				{name: "viewButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View Detail", ontap: "viewDetailButtonTapped"}
			]}
		]},
		{name: "noHistoryLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Shareholder History"}
	],

	bindings: [
		{from: ".title", to: ".$.moduleTitle.content"},
		{from: ".subscriberInfo", to: ".subscriptions", transform: function(v){
			if (this.get("mode") === "active")
			{
				try {
					return v.get("activeSubscriptions");
				}
				catch (e)
				{
					//When all else fails, return an empty collection
					return new lumberjack.ContactSubscriptionCollection();
				}
			}
			else if (this.get("mode") === "cancelled")
			{
				try {
					return v.get("cancelledSubscriptions");
				}
				catch (e)
				{
					//When all else fails, return an empty collection
					return new lumberjack.ContactSubscriptionCollection();
				}
			}
			else
			{
				//When all else fails, return an empty collection
				return new lumberjack.ContactSubscriptionCollection();
			}
		}},
		{from: ".subscriptions", to: ".$.subscriptionRepeater.count", transform: function(v){
			try
			{
				this.$.subscriptionRepeater.setCount(v.length);
				return v.length;
			}
			catch (e)
			{
				return 0;
			}
		}}
	],

	setupSubscriptionItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var subscriptionDataItem = this.get("subscriptions").at(inEvent.index);

		inEvent.item.$.subscriptionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.placementName.set("content", subscriptionDataItem.get("placementName"));
		inEvent.item.$.numShares.set("content", numeral(subscriptionDataItem.get("numShares")).format("0,0"));
		inEvent.item.$.pricePerShare.set("content", "$" + lumberjack.formatCurrency(subscriptionDataItem.get("pricePerShare")));

		inEvent.item.$.viewButton.set("disabled", subscriptionDataItem.get("sourceDatabase") === "" || subscriptionDataItem.get("sourceRecord") === "");

		return true;
	},

	viewDetailButtonTapped: function(inSender, inEvent)
	{
		var subscriptionDataItem = this.get("subscriptions").at(inEvent.index);

		this.doViewEventDetail({mode: "placements", target: subscriptionDataItem.get("sourceDatabase"), record: subscriptionDataItem.get("sourceRecord")});
	}
});