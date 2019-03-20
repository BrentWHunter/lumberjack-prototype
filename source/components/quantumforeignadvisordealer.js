enyo.kind({
	name: "lumberjack.ForeignAdvisorDealer",

	published:
	{
		tempForeignAdvisorDealers: null,
		foreignAdvisorDealers: null,
		validating: false,
		disabled: false
	},

	style: "width: 445px;",

	_validated: true,

	components:[
		{content: "Registered Jurisdictions", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 100%; text-align: center;"},
		{name: "noJurisdictionsItem", content: "No Registered Jurisdictions", style: "margin-top: 10px; width: 100%; text-align: center;"},
		{name: "jurisdictionsRepeater", kind: "enyo.Repeater", count: 0, style: "margin-top: 10px;", onSetupItem: "setupJurisdictionRepeaterItem", components: [
			{name: "jurisdictionItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "jurisdictionName", style: "width: 348px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteJurisdictionButtonTapped"}
				]},
				{kind: "lumberjack.Input", name:"assignedCategoriesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 120px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Fund Categories", required:true, oninput: "handleAssignedCategoriesInputChanged"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "lumberjack.Input", name:"addJurisdictionInput", columnStyle:"", labelStyle:"line-height: 30px; width: 75px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 195px;", type:"text", label:"Jurisdiction", required:true},
			{name: "addJurisdictionButton", kind: "lumberjack.Button", enabledClasses: "button primary", content: $L("Add Jurisdiction"), style: "width: 150px; height: 30px; margin-left: 30px;", ontap: "addJurisdictionButtonTapped"}
		]}
	],

	bindings:[
		{from: ".foreignAdvisorDealers", to: ".tempForeignAdvisorDealers", transform: function(v){
			try
			{
				var tempArray = [];
				v.forEach(function(value, index, array){
					var tempVal = {
						jurisdiction: value.jurisdiction,
						categories: value.categories
					};
					tempArray.push(tempVal);
				});

				return tempArray;
			}
			catch(err)
			{
				return [];
			}
		}},
		{from: ".disabled", to: ".$.addJurisdictionInput.disabled"},
		{from: ".disabled", to: ".$.addJurisdictionButton.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this.$.noJurisdictionsItem.set("showing", this.get("tempForeignAdvisorDealers").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempForeignAdvisorDealers").length);
		this.set("disabled", true);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.jurisdictionsRepeater.setCount(this.get("tempForeignAdvisorDealers").length);
	},

	tempForeignAdvisorDealersChanged: function(oldVal, newVal)
	{
		this.render();
	},

	addJurisdictionButtonTapped: function(inSender, inEvent){
		this.$.addJurisdictionInput.clearBorderError();

		if (this.$.addJurisdictionInput.validate() && (this.get("tempForeignAdvisorDealers").length === 0 || this.validate()))
		{
			this.get("tempForeignAdvisorDealers").push({
				jurisdiction: this.$.addJurisdictionInput.get("value"),
				categories: ""
			});

			this.$.addJurisdictionInput.set("value", "");
			this.$.noJurisdictionsItem.set("showing", this.get("tempForeignAdvisorDealers").length === 0);
			this.$.jurisdictionsRepeater.setCount(this.get("tempForeignAdvisorDealers").length);
		}
	},

	deleteJurisdictionButtonTapped: function(inSender, inEvent){
		this.get("tempForeignAdvisorDealers").splice(inEvent.index, 1);
		this.$.noJurisdictionsItem.set("showing", this.get("tempForeignAdvisorDealers").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempForeignAdvisorDealers").length);
	},

	setupJurisdictionRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempForeignAdvisorDealers")[inEvent.index];

		item.$.jurisdictionName.set("content", target.jurisdiction);
		
		item.$.assignedCategoriesInput.set("value", target.categories);

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
			item.$.assignedCategoriesInput.set("disabled", true);
		}

		if (this.get("validating") && target.categories.length === 0)
		{
			this._validated = false;
			item.$.assignedCategoriesInput.validate();
		}
		else
		{
			item.$.assignedCategoriesInput.clearBorderError();
		}
		
		return true;
	},

	handleAssignedCategoriesInputChanged: function(inSender, inEvent)
	{
		this.get("tempForeignAdvisorDealers")[inEvent.index].categories = inEvent.originator.value;
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempForeignAdvisorDealers").length === 0)
		{
			this._validated = false;
			this.$.addJurisdictionInput.validate();
		}
		this.$.jurisdictionsRepeater.setCount(this.get("tempForeignAdvisorDealers").length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.addJurisdictionInput.clearBorderError();
		this.$.jurisdictionsRepeater.setCount(this.get("tempForeignAdvisorDealers").length);
	}
});