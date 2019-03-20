enyo.kind({
	kind: "quantum.Popup",
	name: "quantum.DuplicateWarnPopup",

	published: {
		duplicateEmails: null
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "padding: 10px;", components: [
			{style: "font-size: 24px; text-align: center;", content: "Duplicate Emails Warning"},
			{name: "repeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupRepeaterItem", components: [
				{name: 'repeaterItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "email", style: "color: black;"},
					{name: "count", style: "color: black; margin-left: 10px; text-align: right;", fit: true},
				]}
			]},
			{style: "text-align: center; margin-top: 10px;", components: [
				{kind: "quantum.Button", enabledClasses: "button primary", content: "Okay", ontap: "handleOkButtonTapped"},
			]},
		]}
	],

	setupRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "placement")) { return true; }
		if (!inEvent.item) { return true; }

		//Cheap Hack, probably works
		var i = 0;
		var email = "";
		var count = "";
		for(var key in this.get("duplicateEmails"))
		{
			if(inEvent.index === i)
			{
				email = key;
				count = this.get("duplicateEmails")[key];
				break;
			}
			i++;
		}

		inEvent.item.$.repeaterItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "lightgrey" : "white");

		inEvent.item.$.email.set("content", email);
		inEvent.item.$.count.set("content", count);
		return true;
	},

	handleOkButtonTapped: function()
	{
		this.hide();
	},

	show: function(duplicateEmails)
	{
		this.set("duplicateEmails", duplicateEmails);
		this.inherited(arguments);
		quantum.fixShim();
		this.$.repeater.setCount(Object.keys(duplicateEmails).length);
	},

	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	}

});