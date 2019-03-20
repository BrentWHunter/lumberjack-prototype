enyo.kind({
	kind: "lumberjack.Popup",
	name: "lumberjack.LoadingPopup",
	zIndex: 1234,

	subComponents: [
		{kind: "enyo.FittableRows", style: "max-width: 510px; padding: 10px; text-align: center;", components: [
			//{kind: "onyx.Spinner"},
			{kind: "enyo.Image", src: "assets/lumberjack.gif"},
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