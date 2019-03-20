enyo.kind({
	name: "lumberjack.OptionFilterSettingsModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		showAllStatuses: false,
		showOnlyActionableStatuses: true,
		statusesToShow: null
	},

	parse: function(data)
	{
		if (data.statusesToShow == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.statusesToShow = [];
		}

		return data;
	},

	getActionableStatuses: function()
	{
		return ["created", "active"];
	},

	isActionableStatus: function(status)
	{
		return this.getActionableStatuses().indexOf(status) !== -1;
	}
});

enyo.kind({
	name: "lumberjack.SubscriptionFilterSettingsModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		showAllCountries: true,
		countriesToShow: null, //Set as array in parse
		showAllNonCancelledStatuses: true,
		statusesToShow: null, //Set as array in parse
		showAllSubscriptionTypes: true,
		subscriptionTypesToShow: null,
		minSubscriptionValue: -1,
		maxSubscriptionValue: -1
	},

	parse: function(data)
	{
		if (!data.subscriptionTypesToShow)
		{
			data.subscriptionTypesToShow = [];
		}

		if (!data.countriesToShow)
		{
			data.countriesToShow = [];
		}

		if (!data.statusesToShow)
		{
			data.statusesToShow = [];
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.TransferFilterSettingsModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		showAllNonCancelledStatuses: true,
		statusesToShow: null, //Set as array in parse
	},

	parse: function(data)
	{
		if (!data.statusesToShow)
		{
			data.statusesToShow = [];
		}
		return data;
	}
});

enyo.kind({
	name: "lumberjack.WarrantFilterSettingsModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		showAllStatuses: false,
		showOnlyActionableStatuses: true,
		showOnlyRootWarrants: false,
		statusesToShow: null
	},

	parse: function(data)
	{
		if (data.statusesToShow == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.statusesToShow = [];
		}

		return data;
	},

	getActionableStatuses: function()
	{
		return ["new", "active", "pendingTransaction"];
	},

	isActionableStatus: function(status)
	{
		return this.getActionableStatuses().indexOf(status) !== -1;
	}
});