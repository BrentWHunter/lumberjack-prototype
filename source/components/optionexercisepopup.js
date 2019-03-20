enyo.kind({
	name: "quantum.OptionExercisePopup",
	kind: "quantum.Popup",

	events: {
		onExercise: "",
		onCancel: ""
	},

	published: {
		activeShares: 0
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 400px; padding: 10px;", components: [
			{name: "popupTitle", style: "font-size: 24px; text-align: center;", content: "Exercise Shares"},
			{name: "exerciseScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 630px; height: 170px; background-color: #EEEEEE;", components: [
				{name: "currentActiveSharesInput", type:"text", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 240px; color:black; padding-left:10px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", kind:"quantum.Input", readonly:true, required:true, disabled:true, value:"", label: "Current Active Shares:"},
				{name: "exerciseSharesInput", type:"text", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 240px; color:black; padding-left:10px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", kind:"quantum.Input", required:true, label: "Number of Shares to Exercise:"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "quantum.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "exerciseButton", kind: "quantum.Button", content: $L("Exercise"), style: "margin-left: 10px; width: 150px; height: 40px;", ontap: "exerciseButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],
	bindings: [
		{from: ".activeShares", to: ".$.currentActiveSharesInput.value", transform: function(v) { return v; }}
	],
	show: function()
	{
		this.inherited(arguments);
	},
	exerciseButtonTapped: function(inSender, inEvent)
	{
		this.$.exerciseSharesInput.clearBorderError();

		var isValid = true;

		if(!this.$.exerciseSharesInput.validate()){
			isValid = false;
		}

		var shares = this.$.exerciseSharesInput.get("value").trim();
		var shareCount = quantum.parseInt(shares);
		if(shareCount <= 0 || shareCount > this.get("activeShares")){
			isValid = false;
		}

		if(isValid){
			var exerciseData = {
				shares:shareCount
			};
			this.hide();
			this.doExercise(exerciseData);
		}
	},
	cancelButtonTapped: function(inSender, inEvent)
	{
		this.doCancel();
		this.hide();
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
	}
});