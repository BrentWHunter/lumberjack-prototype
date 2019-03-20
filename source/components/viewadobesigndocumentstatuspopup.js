enyo.kind({
	name: "lumberjack.ViewAdobeSignDocumentStatusPopup",
	kind: "lumberjack.Popup",

	published: {
		documentStatus: null,
		signerInformation: null
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; width: 1180px; padding: 10px;", components: [
			{kind: "enyo.FittableRows", style: "font-size: 18px;", components: [
				{kind: "enyo.FittableColumns", components: [
					{style: "width: 800px;", components: [
						{name: "documentName"}
					]},
					{style: "margin-left: 10px; text-align: right; width: 350px;", components: [
						{style: "display: inline-block;", content: "Status:"},
						{name: "documentStatus", style: "display: inline-block; margin-left: 10px;"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
					{name: "documentStatusScroller", kind: "enyo.Scroller", style: "width: 800px; height: 600px; background-color: #EEEEEE;", components: [
						{name: "documentStatusRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 275px;", onSetupItem: "setupDocumentRepeaterItem", components: [
							{name: "documentStatusItem", style: "background-color: white; border-bottom: 1px solid black;", selected: false, components: [
								{name: "eventHeader", style: "color: white; background-color: #333333; font-weight: bold; font-size: 16px; padding: 10px;"},
								{style: "padding: 10px; color: black;", components: [
									{kind: "enyo.FittableColumns", components: [
										{style: "font-size: 16px; font-weight: bold; width: 125px;", content: "Email Address:"},
										{name: "eventEmailAddress", style: "margin-left: 10px; font-size: 16px;"}
									]},
									{name: "eventIPAddressRow", style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
										{style: "font-size: 16px; font-weight: bold; width: 125px;", content: "IP Address:"},
										{name: "eventIPAddress", style: "margin-left: 10px; font-size: 16px;"}
									]},
									{kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
										{style: "font-size: 16px; font-weight: bold; width: 125px;", content: "Description:"},
										{name: "eventDescription", style: "margin-left: 10px; font-size: 16px;"}
									]},
									{kind: "enyo.FittableColumns", style: "margin-top: 5px;", components: [
										{style: "font-size: 16px; font-weight: bold; width: 125px;", content: "Event Type:"},
										{name: "eventType", style: "margin-left: 10px; font-size: 16px;"}
									]}
								]}
							]}
						]}
					]},
					{name: "signerStatusScroller", kind: "enyo.Scroller", style: "margin-left: 10px; width: 350px; height: 600px;", components: [
						{name: "signerStatusRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 275px;", onSetupItem: "setupSignerRepeaterItem", components: [
							{name: "signerStatusItem", selected: false, components: [
								{style: "padding: 10px; color: white;", components: [
									{name: "signatureStatus", style: "width: 16px; text-align: center; display: inline-block;", components: [
										{name: "signatureStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
									]},
									{name: "displayName", style: "width: 300px; margin-left: 10px; display: inline-block; font-size: 16px;"}
								]}
							]}
						]}
					]}
				]}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "doneButton", kind: "lumberjack.Button", enabledClasses: "button primary", content: $L("Done"), style: "width: 100px; height: 40px;", ontap: "doneButtonTapped"}
			]}
		]}
	],

	bindings: [
		{from: ".documentStatus.name", to: ".$.documentName.content"},
		{from: ".documentStatus.status", to: ".$.documentStatus.content"}
	],

	show: function(documentStatus)
	{
		this.set("documentStatus", documentStatus);
		this.set("signerInformation", this.parseSignerInformation(documentStatus));
		this.inherited(arguments);
		this.$.documentStatusRepeater.setCount(this.get("documentStatus").events.length);
		this.$.signerStatusRepeater.setCount(this.get("signerInformation").length);
	},

	setupDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var eventDate = moment.parseZone(this.get("documentStatus").events[inEvent.index].date);
		//eventDate.subtract(eventDate.utcOffset(), "minutes");
		inEvent.item.$.eventHeader.set("content", eventDate.format("dddd, MMMM Do YYYY, h:mm:ss a"));
		inEvent.item.$.eventEmailAddress.set("content", this.get("documentStatus").events[inEvent.index].actingUserEmail);
		inEvent.item.$.eventIPAddressRow.set("showing", this.get("documentStatus").events[inEvent.index].actingUserIpAddress ? true : false);
		inEvent.item.$.eventIPAddress.set("content", this.get("documentStatus").events[inEvent.index].actingUserIpAddress);
		inEvent.item.$.eventDescription.set("content", this.get("documentStatus").events[inEvent.index].description);
		inEvent.item.$.eventType.set("content", this.get("documentStatus").events[inEvent.index].type);

		return true;
	},

	setupSignerRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }

		var getAgreementStatus = function(value)
		{
			if (value === "ESIGNED")
			{
				return "assets/icons/circle-icon-green.png";
			}

			if (value === "EMAIL_VIEWED")
			{
				return "assets/icons/circle-icon-yellow.png";
			}

			if (value === "SIGNATURE_REQUESTED")
			{
				return "assets/icons/circle-icon-red.png";
			}

			return "assets/icons/circle-icon-grey.png";
		};

		var signatureStatusIconSrc = getAgreementStatus(this.get("signerInformation")[inEvent.index].status);

		inEvent.item.$.displayName.set("content", this.get("signerInformation")[inEvent.index].email);
		inEvent.item.$.signatureStatusIcon.set("src", signatureStatusIconSrc);

		return true;
	},

	parseSignerInformation: function(documentStatus)
	{
		if (!documentStatus || !Array.isArray(documentStatus.events) || documentStatus.events.length === 0)
		{
			return [];
		}

		var signerInfoMap = {};

		documentStatus.events.forEach(function(value, index, array){
			if (value.type === "CREATED")
			{
				return;
			}

			//Since these are presented in chronological order, we can assume that later events can override previous ones.
			signerInfoMap[value.participantEmail] = value.type;
		});

		var signerInfo = [];

		for (var prop in signerInfoMap)
		{
			if (signerInfoMap.hasOwnProperty(prop))
			{
				signerInfo.push({email: prop, status: signerInfoMap[prop]});
			}
		}

		return signerInfo;
	},

	doneButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.doneButtonTapped();
		}
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	}
});