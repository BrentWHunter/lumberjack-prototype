enyo.kind({
	name: "quantum.PensionFund",

	published:
	{
		tempPensionFunds: null,
		pensionFunds: null,
		validating: false,
		disabled: false
	},

	style: "width: 445px;",

	_validated: true,

	_jurisdictions: [{value: "CA-AB", content: "Alberta"}, {value: "CA-BC", content: "British Columbia"}, {value: "CA-MB", content: "Manitoba"}, {value: "CA-NB", content: "New Brunswick"}, {value: "CA-NL", content: "Newfoundland"}, {value: "CA-NT", content: "Northwest Territories"}, {value: "CA-NS", content: "Nova Scotia"}, {value: "CA-NU", content: "Nunavut"}, {value: "CA-ON", content: "Ontario"}, {value: "CA-PE", content: "Prince Edward Island"}, {value: "CA-QC", content: "Quebec"}, {value: "CA-SK", content: "Saskatchewan"}, {value: "CA-YT", content: "Yukon Territory"}],

	components:[
		{content: "Registered Jurisdictions", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 100%; text-align: center;"},
		{name: "noJurisdictionsItem", content: "No Registered Jurisdictions", style: "margin-top: 10px; width: 100%; text-align: center;"},
		{name: "jurisdictionsRepeater", kind: "enyo.Repeater", count: 0, style: "margin-top: 10px;", onSetupItem: "setupJurisdictionRepeaterItem", components: [
			{name: "jurisdictionItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "jurisdictionName", style: "width: 348px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteJurisdictionButtonTapped"}
				]},
				{kind: "quantum.Input", name:"assignedCategoriesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 120px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Fund Categories", required:true, oninput: "handleAssignedCategoriesInputChanged"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "pensionFundJurisdictionPickerButton", style: "width: 300px;"},
				{name: "pensionFundJurisdictionPicker", kind: "onyx.Picker"}
			]},
			{name: "addJurisdictionButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Jurisdiction"), style: "width: 150px; height: 45px; margin-left: 10px;", ontap: "addJurisdictionButtonTapped"}
		]}
	],

	bindings:[
		{from: ".pensionFunds", to: ".tempPensionFunds", transform: function(v){
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
		{from: ".disabled", to: ".$.pensionFundJurisdictionPickerButton.disabled"},
		{from: ".disabled", to: ".$.addJurisdictionButton.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this.populateJurisdictions();
		this.$.noJurisdictionsItem.set("showing", this.get("tempPensionFunds").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempPensionFunds").length);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.jurisdictionsRepeater.setCount(this.get("tempPensionFunds").length);
	},

	tempPensionFundsChanged: function(oldVal, newVal)
	{
		this.render();
	},

	addJurisdictionButtonTapped: function(inSender, inEvent){
		if (this.get("tempPensionFunds").length === 0 || this.validate()) //Bypass validation if we haven't added anything to validate yet.
		{
			this.get("tempPensionFunds").push({
				jurisdiction: this.$.pensionFundJurisdictionPicker.get("selected").value,
				categories: ""
			});
			this.populateJurisdictions();
			this.$.noJurisdictionsItem.set("showing", this.get("tempPensionFunds").length === 0);
			this.$.jurisdictionsRepeater.setCount(this.get("tempPensionFunds").length);
		}
	},

	deleteJurisdictionButtonTapped: function(inSender, inEvent){
		this.get("tempPensionFunds").splice(inEvent.index, 1);
		this.populateJurisdictions();
		this.$.noJurisdictionsItem.set("showing", this.get("tempPensionFunds").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempPensionFunds").length);
	},

	populateJurisdictions: function()
	{
		this.$.pensionFundJurisdictionPicker.set("selected", null);
		this.$.pensionFundJurisdictionPickerButton.set("disabled", false);
		this.$.addJurisdictionButton.set("disabled", false);
		this.$.addJurisdictionButton.addClass("primary");

		this.$.pensionFundJurisdictionPicker.destroyClientControls();
		var pensionFundJurisdictions = [];
		var activeItemSet = false;

		for (var i = 0; i < this._jurisdictions.length; i++)
		{
			var foundJurisdiction = false;
			for (var j = 0; j < this.get("tempPensionFunds").length; j++)
			{
				if (this.get("tempPensionFunds")[j].jurisdiction === this._jurisdictions[i].value)
				{
					foundJurisdiction = true;
				}
			}
			if (!foundJurisdiction)
			{
				pensionFundJurisdictions.push(Object.assign({active: activeItemSet === false}, this._jurisdictions[i]));
				activeItemSet = true;
			}
		}

		if (pensionFundJurisdictions.length === 0)
		{
			this.$.pensionFundJurisdictionPickerButton.set("disabled", true);
			this.$.addJurisdictionButton.set("disabled", true);
			this.$.addJurisdictionButton.removeClass("primary");

			pensionFundJurisdictions.push({content: "No Jurisdictions Available.", active: true});
		}

		this.$.pensionFundJurisdictionPicker.createComponents(pensionFundJurisdictions, {owner: this});
		this.$.pensionFundJurisdictionPicker.render();
	},

	setupJurisdictionRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempPensionFunds")[inEvent.index];

		for (var i = 0; i < this._jurisdictions.length; i++)
		{
			if (target.jurisdiction === this._jurisdictions[i].value)
			{
				item.$.jurisdictionName.set("content", this._jurisdictions[i].content);
			}
		}
		
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
		this.get("tempPensionFunds")[inEvent.index].categories = inEvent.originator.value;
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempPensionFunds").length === 0)
		{
			this._validated = false;
			this.$.pensionFundJurisdictionPickerButton.applyStyle("border", "1px solid red");
		}
		this.$.jurisdictionsRepeater.setCount(this.get("tempPensionFunds").length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.pensionFundJurisdictionPickerButton.applyStyle("border", null);
		this.$.jurisdictionsRepeater.setCount(this.get("tempPensionFunds").length);
	}
});