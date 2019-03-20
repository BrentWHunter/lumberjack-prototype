enyo.kind({
	name: "quantum.TrustCompany",

	published:
	{
		tempTrustCompanies: null,
		trustCompanies: null,
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
				{kind: "quantum.Input", name:"registrationNumbersInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 120px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Registration #", required:true, oninput: "handleRegistrationNumberInputChanged"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "trustCompanyJurisdictionPickerButton", style: "width: 300px;"},
				{name: "trustCompanyJurisdictionPicker", kind: "onyx.Picker"}
			]},
			{name: "addJurisdictionButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Jurisdiction"), style: "width: 150px; height: 45px; margin-left: 10px;", ontap: "addJurisdictionButtonTapped"}
		]}
	],

	bindings:[
		{from: ".trustCompanies", to: ".tempTrustCompanies", transform: function(v){
			try
			{
				var tempArray = [];
				v.forEach(function(value, index, array){
					var tempVal = {
						jurisdiction: value.jurisdiction,
						registrationNumber: value.registrationNumber
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
		{from: ".disabled", to: ".$.trustCompanyJurisdictionPickerButton.disabled"},
		{from: ".disabled", to: ".$.addJurisdictionButton.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this.populateJurisdictions();
		this.$.noJurisdictionsItem.set("showing", this.get("tempTrustCompanies").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempTrustCompanies").length);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.jurisdictionsRepeater.setCount(this.get("tempTrustCompanies").length);
	},

	tempTrustCompaniesChanged: function(oldVal, newVal)
	{
		this.render();
	},

	addJurisdictionButtonTapped: function(inSender, inEvent){
		if (this.get("tempTrustCompanies").length === 0 || this.validate()) //Bypass validation if we haven't added anything to validate yet.
		{
			this.get("tempTrustCompanies").push({
				jurisdiction: this.$.trustCompanyJurisdictionPicker.get("selected").value,
				registrationNumber: ""
			});
			this.populateJurisdictions();
			this.$.noJurisdictionsItem.set("showing", this.get("tempTrustCompanies").length === 0);
			this.$.jurisdictionsRepeater.setCount(this.get("tempTrustCompanies").length);
		}
	},

	deleteJurisdictionButtonTapped: function(inSender, inEvent){
		this.get("tempTrustCompanies").splice(inEvent.index, 1);
		this.populateJurisdictions();
		this.$.noJurisdictionsItem.set("showing", this.get("tempTrustCompanies").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempTrustCompanies").length);
	},

	populateJurisdictions: function()
	{
		this.$.trustCompanyJurisdictionPicker.set("selected", null);
		this.$.trustCompanyJurisdictionPickerButton.set("disabled", false);
		this.$.addJurisdictionButton.set("disabled", false);
		this.$.addJurisdictionButton.addClass("primary");

		this.$.trustCompanyJurisdictionPicker.destroyClientControls();
		var trustCompanyJurisdictions = [];
		var activeItemSet = false;

		for (var i = 0; i < this._jurisdictions.length; i++)
		{
			var foundJurisdiction = false;
			for (var j = 0; j < this.get("tempTrustCompanies").length; j++)
			{
				if (this.get("tempTrustCompanies")[j].jurisdiction === this._jurisdictions[i].value)
				{
					foundJurisdiction = true;
				}
			}
			if (!foundJurisdiction)
			{
				trustCompanyJurisdictions.push(Object.assign({active: activeItemSet === false}, this._jurisdictions[i]));
				activeItemSet = true;
			}
		}

		if (trustCompanyJurisdictions.length === 0)
		{
			this.$.trustCompanyJurisdictionPickerButton.set("disabled", true);
			this.$.addJurisdictionButton.set("disabled", true);
			this.$.addJurisdictionButton.removeClass("primary");

			trustCompanyJurisdictions.push({content: "No Jurisdictions Available.", active: true});
		}

		this.$.trustCompanyJurisdictionPicker.createComponents(trustCompanyJurisdictions, {owner: this});
		this.$.trustCompanyJurisdictionPicker.render();
	},

	setupJurisdictionRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempTrustCompanies")[inEvent.index];

		for (var i = 0; i < this._jurisdictions.length; i++)
		{
			if (target.jurisdiction === this._jurisdictions[i].value)
			{
				item.$.jurisdictionName.set("content", this._jurisdictions[i].content);
			}
		}
		
		item.$.registrationNumbersInput.set("value", target.registrationNumber);

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
			item.$.registrationNumbersInput.set("disabled", true);
		}

		if (this.get("validating") && target.registrationNumber.length === 0)
		{
			this._validated = false;
			item.$.registrationNumbersInput.validate();
		}
		else
		{
			item.$.registrationNumbersInput.clearBorderError();
		}
		
		return true;
	},

	handleRegistrationNumberInputChanged: function(inSender, inEvent)
	{
		this.get("tempTrustCompanies")[inEvent.index].registrationNumber = inEvent.originator.value;
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempTrustCompanies").length === 0)
		{
			this._validated = false;
			this.$.trustCompanyJurisdictionPickerButton.applyStyle("border", "1px solid red");
		}
		this.$.jurisdictionsRepeater.setCount(this.get("tempTrustCompanies").length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.trustCompanyJurisdictionPickerButton.applyStyle("border", null);
		this.$.jurisdictionsRepeater.setCount(this.get("tempTrustCompanies").length);
	}
});