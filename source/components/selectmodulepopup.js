/* global quantum, alertify */

enyo.kind({
	name: "quantum.SelectModulePopup",
	kind: "quantum.Popup",

	events: {
		onCancel: "",
		onChangeModule: ""
	},

	handlers: {
		onKeyUp: "handleKeyUp",
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 90%; padding: 10px;", components: [
			{style: "text-align: center; font-size: 24px;", components: [
				{style: "", content: "Select Module"}
			]},
			{kind: "quantum.ModulesSection", style: "margin-top: 15px;", onChangeModule: "handleChangeModule"},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px; margin-right: 10px;", ontap: "cancelButtonTapped"}
			]}
		]}
	],

	show: function()
	{
		this.inherited(arguments);
	},

	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
		return true;
	},

	handleChangeModule: function(inSender, inEvent)
	{
		this.doChangeModule(inEvent);
		return true;
	}
});