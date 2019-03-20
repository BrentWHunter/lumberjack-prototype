enyo.kind({
	name: "quantum.OptionFilterSettingsPopup",
	kind: "quantum.Popup",

	events: {
		onFilterSettingsChanged: "",
		onCancel: ""
	},

	published: {
		filterSettings: null,
		countryCheckboxNames: null
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Filter Settings"}
			]},
			{name: "filterSettingsScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 800px; height: 600px; background-color: #FFFFFF; color: black; padding: 10px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Subscription Statuses"},
				{kind: "enyo.FittableColumns", style: "padding-top: 5px;" , components: [
					{components: [
						{kind:"quantum.Checkbox", name:"allStatusesCheckbox", content:"All Statuses", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"checkAllStatuses"},
						{kind:"quantum.Checkbox", name:"onlyActionableStatusesCheckbox", content:"Only Actionable Statuses", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"checkOnlyActionableStatuses"}
					]},
					{style: "margin-left: 20px;", components: [
						{kind:"quantum.Checkbox", name:"newCheckbox", content:"Created", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "onStatusCheckedChange"},
						{kind:"quantum.Checkbox", name:"activeCheckbox", content:"Active", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "onStatusCheckedChange"}
					]},
					{style: "margin-left: 20px;", components: [
						{kind:"quantum.Checkbox", name:"exercisedCheckbox", content:"Exercised", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "onStatusCheckedChange"},
						{kind:"quantum.Checkbox", name:"exhaustedCheckbox", content:"Exhausted", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "onStatusCheckedChange"},
						{kind:"quantum.Checkbox", name:"expiredCheckbox", content:"Expired", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "onStatusCheckedChange"},
						{kind:"quantum.Checkbox", name:"cancelledCheckbox", content:"Cancelled", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "onStatusCheckedChange"}
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "saveButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Save"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "saveButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".filterSettings", to: ".$.allStatusesCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			return v.get("showAllStatuses");
		}},
		{from: ".filterSettings", to: ".$.allStatusesCheckbox.disabled", transform: function(v) {
			if (v == null) { return false; }
			return v.get("showAllStatuses");
		}},
		{from: ".filterSettings", to: ".$.onlyActionableStatusesCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			return v.get("showOnlyActionableStatuses");
		}},
		{from: ".filterSettings", to: ".$.onlyActionableStatusesCheckbox.disabled", transform: function(v) {
			if (v == null) { return false; }
			return v.get("showOnlyActionableStatuses");
		}},
		{from: ".filterSettings", to: ".$.newCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			if (v.get("showAllStatuses") === true) { return true; }
			var status = "new";
			if (v.get("showOnlyActionableStatuses") === true) { return v.isActionableStatus(status); }
			if (v.get("statusesToShow").indexOf(status) !== -1) { return true; }
			return false;
		}},
		{from: ".filterSettings", to: ".$.activeCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			if (v.get("showAllStatuses") === true) { return true; }
			var status = "active";
			if (v.get("showOnlyActionableStatuses") === true) { return v.isActionableStatus(status); }
			if (v.get("statusesToShow").indexOf(status) !== -1) { return true; }
			return false;
		}},
		{from: ".filterSettings", to: ".$.exercisedCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			if (v.get("showAllStatuses") === true) { return true; }
			var status = "exercised";
			if (v.get("showOnlyActionableStatuses") === true) { return v.isActionableStatus(status); }
			if (v.get("statusesToShow").indexOf(status) !== -1) { return true; }
			return false;
		}},
		{from: ".filterSettings", to: ".$.exhaustedCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			if (v.get("showAllStatuses") === true) { return true; }
			var status = "exhausted";
			if (v.get("showOnlyActionableStatuses") === true) { return v.isActionableStatus(status); }
			if (v.get("statusesToShow").indexOf(status) !== -1) { return true; }
			return false;
		}},
		{from: ".filterSettings", to: ".$.expiredCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			if (v.get("showAllStatuses") === true) { return true; }
			var status = "expired";
			if (v.get("showOnlyActionableStatuses") === true) { return v.isActionableStatus(status); }
			if (v.get("statusesToShow").indexOf(status) !== -1) { return true; }
			return false;
		}},
		{from: ".filterSettings", to: ".$.cancelledCheckbox.checked", transform: function(v) {
			if (v == null) { return false; }
			if (v.get("showAllStatuses") === true) { return true; }
			var status = "cancelled";
			if (v.get("showOnlyActionableStatuses") === true) { return v.isActionableStatus(status); }
			if (v.get("statusesToShow").indexOf(status) !== -1) { return true; }
			return false;
		}}
	],

	show: function(filterSettings)
	{
		this.inherited(arguments);

		// The "filterSettings" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("filterSettings", null);
		this.set("filterSettings", new quantum.WarrantFilterSettingsModel({}));
		if (filterSettings != null) { this.set("filterSettings", filterSettings); }
	},

	getAllStatusCheckboxes: function()
	{
		return [
			this.$.newCheckbox,
			this.$.activeCheckbox,
			this.$.exercisedCheckbox,
			this.$.exhaustedCheckbox,
			this.$.expiredCheckbox,
			this.$.cancelledCheckbox
		];
	},

	getActionableStatusCheckboxes: function()
	{
		return [
			this.$.newCheckbox,
			this.$.activeCheckbox
		];
	},

	isChecked: function(checkboxes)
	{
		if (!Array.isArray(checkboxes)) { checkboxes = [checkboxes]; }

		for (var i = 0; i < checkboxes.length; i++)
		{
			if (checkboxes[i].getChecked() !== true) { return false; }
		}
		return true;
	},

	getAllStatusCheckboxesChecked: function()
	{
		return this.isChecked(this.getAllStatusCheckboxes());
	},

	getOnlyActionableStatusCheckboxesChecked: function()
	{
		var actionableStatusCheckboxes = this.getActionableStatusCheckboxes();
		var nonActionableStatusCheckboxes = this.getAllStatusCheckboxes().filter(function(element) {
			return actionableStatusCheckboxes.indexOf(element) === -1;
		});

		var actionableStatusCheckboxesChecked = this.isChecked(actionableStatusCheckboxes);
		var nonActionableStatusCheckboxesChecked = false;
		for (var i = 0; i < nonActionableStatusCheckboxes.length; i++)
		{
			if (nonActionableStatusCheckboxes[i].getChecked() === true)
			{
				nonActionableStatusCheckboxesChecked = true;
				break;
			}
		}

		return actionableStatusCheckboxesChecked && !nonActionableStatusCheckboxesChecked;
	},

	getCheckedStatuses: function()
	{
		var statuses = [];

		if (this.$.newCheckbox.getChecked() === true)
		{
			statuses.push("created");
		}
		if (this.$.activeCheckbox.getChecked() === true)
		{
			statuses.push("active");
		}
		if (this.$.exercisedCheckbox.getChecked() === true)
		{
			statuses.push("exercised");
		}
		if (this.$.exhaustedCheckbox.getChecked() === true)
		{
			statuses.push("exhausted");
		}
		if (this.$.expiredCheckbox.getChecked() === true)
		{
			statuses.push("expired");
		}
		if (this.$.cancelledCheckbox.getChecked() === true)
		{
			statuses.push("cancelled");
		}

		return statuses;
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.saveButtonTapped();
		}
	},

	handleHide: function(inSender, inEvent)
	{
		// Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) { return true; }
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	},

	/***********
	* onchange *
	************/

	checkAllStatuses: function(inSender, inEvent)
	{
		this.getAllStatusCheckboxes().forEach(function(currentValue) {
			currentValue.setChecked(true);
		});

		this.$.allStatusesCheckbox.setChecked(true);
		this.$.allStatusesCheckbox.setDisabled(true);

		this.$.onlyActionableStatusesCheckbox.setChecked(false);
		this.$.onlyActionableStatusesCheckbox.setDisabled(false);
	},

	checkOnlyActionableStatuses: function(inSender, inEvent)
	{
		var actionableStatusCheckboxes = this.getActionableStatusCheckboxes();
		var nonActionableStatusCheckboxes = this.getAllStatusCheckboxes().filter(function(element) {
			return actionableStatusCheckboxes.indexOf(element) === -1;
		});

		actionableStatusCheckboxes.forEach(function(currentValue) {
			currentValue.setChecked(true);
		});
		nonActionableStatusCheckboxes.forEach(function(currentValue) {
			currentValue.setChecked(false);
		});

		this.$.allStatusesCheckbox.setChecked(false);
		this.$.allStatusesCheckbox.setDisabled(false);

		this.$.onlyActionableStatusesCheckbox.setChecked(true);
		this.$.onlyActionableStatusesCheckbox.setDisabled(true);
	},

	onStatusCheckedChange: function(inSender, inEvent)
	{
		var allStatusCheckboxesChecked = this.getAllStatusCheckboxesChecked();
		this.$.allStatusesCheckbox.setChecked(allStatusCheckboxesChecked);
		this.$.allStatusesCheckbox.setDisabled(allStatusCheckboxesChecked);

		var onlyActionableStatusCheckboxesChecked = this.getOnlyActionableStatusCheckboxesChecked();
		this.$.onlyActionableStatusesCheckbox.setChecked(onlyActionableStatusCheckboxesChecked);
		this.$.onlyActionableStatusesCheckbox.setDisabled(onlyActionableStatusCheckboxesChecked);
	},

	/********
	* ontap *
	********/

	saveButtonTapped: function(inSender, inEvent)
	{
		var statuses = this.getCheckedStatuses();

		this.get("filterSettings").set("showAllStatuses", this.getAllStatusCheckboxesChecked());
		this.get("filterSettings").set("showOnlyActionableStatuses", this.getOnlyActionableStatusCheckboxesChecked());
		this.get("filterSettings").set("statusesToShow", statuses);

		this.doFilterSettingsChanged({filterSettings: this.get("filterSettings")});
		this.hide();
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	}
});