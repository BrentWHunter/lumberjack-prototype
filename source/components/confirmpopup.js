enyo.kind({
	name: "lumberjack.ConfirmPopup",
	kind: "lumberjack.Popup",
	_returnValue: null,

	handlers: {
		onKeyUp: "handleKeyUp"
	},

	events: {
		onYes: "",
		onYesWithReturnValue: "",
		onNo: "",
		onNoWithReturnValue: ""
	},

	published: {
		yesMessage: $L("Yes"),
		noMessage: $L("No")
	},

	subComponents: [
		{style: "max-width: 980px; padding: 10px; text-align: center;", components: [
			{name: "displayMessage", style: "font-size: 24px;"},
			{style: "margin-top: 10px;", components: [
				{name: "yesButton", kind: "lumberjack.Button", style: "margin-right: 5px; font-size: 18px;", ontap: "yesButtonTapped"},
				{name: "noButton", kind: "lumberjack.Button", style: "margin-left: 5px; font-size: 18px;", ontap: "noButtonTapped"}
			]}
		]}
	],
	
	bindings: [
		{from: ".yesMessage", to: ".$.yesButton.content"},
		{from: ".noMessage", to: ".$.noButton.content"}
	],

	show: function(message, returnValue)
	{
		this.$.displayMessage.setContent(message);
		this._returnValue = returnValue !== null && returnValue !== undefined ? returnValue : null;
		this.inherited(arguments);
	},

	yesButtonTapped: function(inSender, inEvent)
	{
		if (this._returnValue !== null && this._returnValue !== undefined)
		{
			this.doYesWithReturnValue({type: "onYesWithReturnValue", returnValue: this._returnValue});
		}
		else
		{
			this.doYes();
		}
		this.hide();
	},

	noButtonTapped: function(inSender, inEvent)
	{
		if (this._returnValue !== null && this._returnValue !== undefined)
		{
			this.doNoWithReturnValue({type: "onNoWithReturnValue", returnValue: this._returnValue});
		}
		else
		{
			this.doNo();
		}
		this.hide();
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (this.showing)
		{
			switch(inEvent.keyCode)
			{
				case 13:
					this.yesButtonTapped();
					break;
				case 27:
					this.noButtonTapped();
					break;
			}
			return true;
		}
	}
});