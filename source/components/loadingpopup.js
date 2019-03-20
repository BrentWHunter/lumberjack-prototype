enyo.kind({
	kind: "quantum.Popup",
	name: "quantum.LoadingPopup",
	zIndex: 1234,

	subComponents: [
		{kind: "enyo.FittableRows", style: "max-width: 510px; padding: 10px; text-align: center;", components: [
			{kind: "onyx.Spinner"},
			{name: "loadingMessage", style: "text-align: center; font-size: 24px; font-weight: bold; margin-top: 10px;", content: $L("Loading")}
		]}
	],

	show: function(message)
	{
		this.$.loadingMessage.setContent(message ? message : $L("Loading"));
		this.inherited(arguments);
	},

	setMessage: function(message)
	{
		this.$.loadingMessage.setContent(message ? message : $L("Loading"));
		this.render();
	}
});