enyo.kind({
	name: "quantum.docxPopup",
	kind: "quantum.Popup",

	published: {
		activeDate: moment(),
	},

	events: {
		onAddDocument: ""
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "padding: 10px;", components: [
			{kind: "enyo.Scroller", fit: true, classes: "docxPopup", components: [
				{name: "main", allowHtml: true}
			]},
			{style: "text-align: center; margin-top: 10px;", components: [
				{kind: "quantum.Button", style: "margin-left: 10px;", content: "Exit", ontap: "handleCancelButtonTapped"}
			]},
			//{name: "loadingPopup", kind: "quantum.LoadingPopup"}
		]}
	],

	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.hide();
	},
	
	handleHide: function(inSender, inEvent)
	{
		//Stop the hide event from propigating only for other things that generate it. Ie. Menus.
		if (inEvent.originator !== this) {return true;}
	}
});