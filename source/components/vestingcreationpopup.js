enyo.kind({
	name: "lumberjack.VestingCreationPopup",
	kind: "lumberjack.Popup",

	events: {
		onCreateNewCondition: "",
		onCancel: ""
	},

	handlers: {
		onHide: "handleHide"
	},

	subComponents: [
		{style: "height 400px; padding: 10px;", components: [
			{name: "popupTitle", style: "font-size: 24px; text-align: center;", content: "Add Vesting Event"},
			{name: "vestingConditionScroller", kind: "enyo.Scroller", style: "margin-top: 15px; width: 560px; height: 170px; background-color: #EEEEEE;", components: [
				{name: "conditionTypeInput", type:"text", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px; color:black; padding-left:10px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", kind:"lumberjack.Input", readonly:true, required:true, disabled:true, value:"Event", label: "Condition Type:"},
				{name: "conditionNameInput", type:"text", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px; color:black; padding-left:10px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", kind:"lumberjack.Input", required:true, label: "Condition Name:"},
				{name: "conditionDescriptionInput", type:"text", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px; color:black; padding-left:10px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", kind:"lumberjack.Input", required:true, label:"Condition Description:"}
			]},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "cancelButton", kind: "lumberjack.Button", content: $L("Cancel"), style: "width: 100px; height: 40px;", ontap: "cancelButtonTapped"},
				{name: "newConditionButton", kind: "lumberjack.Button", content: $L("Add Condition"), style: "margin-left: 10px; width: 150px; height: 40px;", ontap: "newConditionButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],
	bindings: [
	],
	show: function()
	{
		this.inherited(arguments);
	},
	newConditionButtonTapped: function(inSender, inEvent)
	{
		this.$.conditionTypeInput.clearBorderError();
		this.$.conditionNameInput.clearBorderError();
		this.$.conditionDescriptionInput.clearBorderError();

		var isValid = true;

		if(!this.$.conditionNameInput.validate()){
			console.log("Name fail");
			console.log(this.$.conditionNameInput.get("value"));
			isValid = false;
		}

		if(!this.$.conditionDescriptionInput.validate()){
			console.log("Desc fail");
			console.log(this.$.conditionDescriptionInput.get("value"));
			isValid = false;
		}

		if(isValid){
			var conditionData = {
				type:this.$.conditionTypeInput.get("value").trim(),
				name:this.$.conditionNameInput.get("value").trim(),
				description:this.$.conditionDescriptionInput.get("value").trim()
			};
			this.hide();
			this.doCreateNewCondition(conditionData);
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