enyo.kind({
	name: "quantum.TransferFilterSettingsPopup",
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
						{kind:"quantum.Checkbox", name:"fundsOnlyCheckbox", content:"Funds Only", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"incompleteDocsAllFundsCheckbox", content:"Incomplete Docs, All Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"completeDocsAllFundsCheckbox", content:"Complete Docs, All Funds", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
					]},
					{style: "margin-left: 20px;", components: [
						{kind:"quantum.Checkbox", name:"transferAgentCheckbox", content:"With Transfer Agent", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"lawyerCheckbox", content:"With Lawyer", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
					]},
					{style: "margin-left: 20px;", components: [
						{kind:"quantum.Checkbox", name:"cancelledCheckbox", content:"Cancelled", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"completeCheckbox", content:"Complete", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"},
						{kind:"quantum.Checkbox", name:"newCheckbox", content:"New", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange: "checkBoxesForSubscription"}
					]}
				]},
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "saveButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Save"), style: "margin-left: 10px; width: 100px; height: 40px;", ontap: "saveButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings:[
		{from: ".filterSettings", to: ".$.fundsOnlyCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("fundsOnly") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.incompleteDocsAllFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("incompleteDocsAllFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.completeDocsAllFundsCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("completeDocsAndFunds") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.transferAgentCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("withTransferAgent") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.lawyerCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("withLawyer") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.cancelledCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("statusesToShow").indexOf("cancelled") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.completeCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("complete") !== -1) {return true;}

			return false;
		}},
		{from: ".filterSettings", to: ".$.newCheckbox.checked", transform: function(v){
			if (!v) {return false;}

			if (v.get("showAllNonCancelledStatuses")) {return true;}

			if (v.get("statusesToShow").indexOf("new") !== -1) {return true;}

			return false;
		}}
	],


	show: function(filterSettings)
	{
		this.inherited(arguments);
		this.set("filterSettings", filterSettings);
	},

	getCheckedStatuses: function(inSender, inEvent)
	{
		//Cheat here a little bit
		var numBoxesChecked = 0;
		var cancelledChecked = false;
		var statusesArray = [];

		if (this.$.fundsOnlyCheckbox.getChecked() === true) {
			statusesArray.push("fundsOnly");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.incompleteDocsAllFundsCheckbox.getChecked() === true) {
			statusesArray.push("incompleteDocsAllFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.completeDocsAllFundsCheckbox.getChecked() === true) {
			statusesArray.push("completeDocsAndFunds");
			numBoxesChecked = numBoxesChecked + 1;
		}
		
		if (this.$.lawyerCheckbox.getChecked() === true) {
			statusesArray.push("withLaywer");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.transferAgentCheckbox.getChecked() === true) {
			statusesArray.push("withTransferAgent");
			numBoxesChecked = numBoxesChecked + 1;
		}

		if (this.$.completeCheckbox.getChecked() === true) {
			statusesArray.push("complete");
			numBoxesChecked = numBoxesChecked + 1;
		}
		if (this.$.cancelledCheckbox.getChecked() === true) {
			statusesArray.push("cancelled");
			cancelledChecked = true;
		}
		if (this.$.newCheckbox.getChecked() === true) {
			statusesArray.push("new");
			numBoxesChecked = numBoxesChecked + 1;
		}
		
		return {showAllNonCancelledStatuses: (numBoxesChecked === 7 && !cancelledChecked), statusesToShow: statusesArray};
	},

	saveButtonTapped: function(inSender, inEvent)
	{
		var statuses = this.getCheckedStatuses();
		this.get("filterSettings").set("showAllNonCancelledStatuses", statuses.showAllNonCancelledStatuses);
		this.get("filterSettings").set("statusesToShow", statuses.showAllNonCancelledStatuses ? [] : statuses.statusesToShow);

		this.doFilterSettingsChanged({filterSettings: this.get("filterSettings")});
		this.hide();
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.selectButtonTapped();
		}
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	},

});