enyo.kind({
	name: "quantum.AdvisorDealer",

	published:
	{
		mode: "individual", //individual, corporate
		tempAdvisorDealers: null,
		advisorDealers: null,
		validating: false,
		disabled: false
	},

	style: "width: 445px;",

	_jurisdictions: [{value: "CA-AB", content: "Alberta"}, {value: "CA-BC", content: "British Columbia"}, {value: "CA-MB", content: "Manitoba"}, {value: "CA-NB", content: "New Brunswick"}, {value: "CA-NL", content: "Newfoundland"}, {value: "CA-NT", content: "Northwest Territories"}, {value: "CA-NS", content: "Nova Scotia"}, {value: "CA-NU", content: "Nunavut"}, {value: "CA-ON", content: "Ontario"}, {value: "CA-PE", content: "Prince Edward Island"}, {value: "CA-QC", content: "Quebec"}, {value: "CA-SK", content: "Saskatchewan"}, {value: "CA-YT", content: "Yukon Territory"}],
	//All corporate categories are also legitimate individual categories
	_individualCategories: [{value: "dealingRepresentative", content: "Dealing Representative"}, {value: "advisingRepresentative", content: "Advising Representative"}, {value: "associateAdvisingRepresentative", content: "Associate Advising Representative"}, {value: "ultimateDesignatedPerson", content: "Ultimate Designated Person"}, {value: "chiefComplianceOfficer", content: "Chief Compliance Officer"}],
	_corporateCategories: [{value: "investmentDealer", content: "Investment Dealer"}, {value: "mutualFundDealer", content: "Mutual Fund Dealer"}, {value: "scholarshipPlanDealer", content: "Scholarship Plan Dealer"}, {value: "exemptMarketDealer", content: "Exempt Market Dealer"}, {value: "restrictedDealer", content: "Restricted Dealer"}, {value: "portfolioManager", content: "Portfolio Manager"}, {value: "restrictedPortfolioManager", content: "Restricted Portfolio Manager"}],
	_validated: true,

	components:[
		{content: "Registered Jurisdictions", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 100%; text-align: center;"},
		{name: "noJurisdictionsItem", content: "No Registered Jurisdictions", style: "margin-top: 10px; width: 100%; text-align: center;"},
		{name: "jurisdictionsRepeater", kind: "enyo.Repeater", style: "margin-top: 10px;", count: 0, onSetupItem: "setupJurisdictionRepeaterItem", components: [
			{name: "jurisdictionItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "jurisdictionName", style: "width: 310px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteJurisdictionButtonTapped"}
				]},
				{content: "Assigned Categories", style: "font-size: 16px; font-weight: bold; width: 300px; text-align: center;"},
				{name: "noCategoriesItem", content: "No Assigned Categories", style: "margin-top: 10px; width: 300px; text-align: center;"},
				{name: "categoryRepeater", kind: "enyo.Repeater", count: 0, style: "width: 395px; margin-top: 10px;", onSetupItem: "setupCategoryRepeaterItem", components: [
					{name: "categoryItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "categoryName", style: "width: 300px; line-height: 34px;"},
						{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px; margin-left: 5px;", content: "Delete", ontap: "deleteCategoryButtonTapped"}					
					]}
				]},				
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{kind: "onyx.PickerDecorator", style: "", components: [
						{name: "categoryPickerButton", style: "width: 300px; padding: 4px 18px;"},
						{name: "categoryPicker", kind: "onyx.Picker"}
					]},
					{name: "addCategoryButton", kind: "enyo.Button", classes: "button primary", style: "line-height: 30px; margin-left: 10px;", content: "Add Category", ontap: "addCategoryButtonTapped"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "advisorJurisdictionPickerButton", style: "width: 300px;"},
				{name: "advisorJurisdictionPicker", kind: "onyx.Picker"}
			]},
			{name: "addJurisdictionButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Jurisdiction"), style: "width: 150px; height: 45px; margin-left: 10px;", ontap: "addJurisdictionButtonTapped"}
		]}
	],

	bindings:[
		{from: ".advisorDealers", to: ".tempAdvisorDealers", transform: function(v){
			try
			{
				var tempArray = [];
				v.forEach(function(value, index, array){
					var tempVal = {
						type: value.type,
						jurisdiction: value.jurisdiction,
						categories: []
					};
					value.categories.forEach(function(innerValue, innerIndex, innerArray){
						tempVal.categories.push(innerValue);
					});
					tempArray.push(tempVal);
				});

				return tempArray;
			}
			catch(err)
			{
				return [];
			}
		}},
		{from: ".disabled", to: ".$.advisorJurisdictionPickerButton.disabled"},
		{from: ".disabled", to: ".$.addJurisdictionButton.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this.populateJurisdictions();
		this.$.noJurisdictionsItem.set("showing", this.get("tempAdvisorDealers").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempAdvisorDealers").length);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.jurisdictionsRepeater.setCount(this.get("tempAdvisorDealers").length);
	},

	tempAdvisorDealersChanged: function(oldVal, newVal)
	{
		this.render();
	},

	addJurisdictionButtonTapped: function(inSender, inEvent){
		this.clearValidation();

		if (this.get("tempAdvisorDealers").length === 0 || this.validate()) //Bypass validation if we haven't added anything to validate yet.
		{
			this.get("tempAdvisorDealers").push({
				type: this.get("mode"),
				jurisdiction: this.$.advisorJurisdictionPicker.get("selected").value,
				categories: []
			});
			this.populateJurisdictions();
			this.$.noJurisdictionsItem.set("showing", this.get("tempAdvisorDealers").length === 0);
			this.$.jurisdictionsRepeater.setCount(this.get("tempAdvisorDealers").length);
		}
	},

	deleteJurisdictionButtonTapped: function(inSender, inEvent){
		this.get("tempAdvisorDealers").splice(inEvent.index, 1);
		this.populateJurisdictions();
		this.$.noJurisdictionsItem.set("showing", this.get("tempAdvisorDealers").length === 0);
		this.$.jurisdictionsRepeater.setCount(this.get("tempAdvisorDealers").length);
	},

	populateJurisdictions: function()
	{
		this.$.advisorJurisdictionPicker.set("selected", null);
		this.$.advisorJurisdictionPickerButton.set("disabled", false);
		this.$.addJurisdictionButton.set("disabled", false);
		this.$.addJurisdictionButton.addClass("primary");

		this.$.advisorJurisdictionPicker.destroyClientControls();
		var advisorJurisdictions = [];
		var activeItemSet = false;

		for (var i = 0; i < this._jurisdictions.length; i++)
		{
			var foundJurisdiction = false;
			for (var j = 0; j < this.get("tempAdvisorDealers").length; j++)
			{
				if (this.get("tempAdvisorDealers")[j].jurisdiction === this._jurisdictions[i].value)
				{
					foundJurisdiction = true;
				}
			}
			if (!foundJurisdiction)
			{
				advisorJurisdictions.push(Object.assign({active: activeItemSet === false}, this._jurisdictions[i]));
				activeItemSet = true;
			}
		}

		if (advisorJurisdictions.length === 0 || this.get("disabled"))
		{
			this.$.advisorJurisdictionPickerButton.set("disabled", true);
			this.$.addJurisdictionButton.set("disabled", true);
			this.$.addJurisdictionButton.removeClass("primary");

			advisorJurisdictions.push({content: "No Jurisdictions Available.", active: true});
		}

		this.$.advisorJurisdictionPicker.createComponents(advisorJurisdictions, {owner: this});
		this.$.advisorJurisdictionPicker.render();
	},

	addCategoryButtonTapped: function(inSender, inEvent)
	{
		this.get("tempAdvisorDealers")[inEvent.index].categories.push(inSender.controls[inEvent.index].$.categoryPicker.get("selected").value);
		this.$.jurisdictionsRepeater.renderRow(inEvent.index);
	},

	deleteCategoryButtonTapped: function(inSender, inEvent)
	{
		this.get("tempAdvisorDealers")[inEvent.indices[1]].categories.splice(inEvent.indices[0], 1);
		this.$.jurisdictionsRepeater.renderRow(inEvent.indices[1]);
	},

	populateCategories: function(item, index)
	{
		item.$.categoryPicker.set("selected", null);
		item.$.categoryPickerButton.set("disabled", false);
		item.$.addCategoryButton.set("disabled", false);
		item.$.addCategoryButton.addClass("primary");

		item.$.categoryPicker.destroyClientControls();
		var categories = [];
		var activeItemSet = false;

		for (var i = 0; i < this._corporateCategories.length; i++)
		{
			var foundCorporateCategory = false;
			for (var j = 0; j < this.get("tempAdvisorDealers")[index].categories.length; j++)
			{
				if (this.get("tempAdvisorDealers")[index].categories[j] === this._corporateCategories[i].value)
				{
					foundCorporateCategory = true;
				}
			}
			if (!foundCorporateCategory)
			{
				categories.push(Object.assign({}, this._corporateCategories[i]));
			}
		}

		if (this.get("mode") === "individual")
		{
			for (var k = 0; k < this._individualCategories.length; k++)
			{
				var foundIndividualCategory = false;
				for (var l = 0; l < this.get("tempAdvisorDealers")[index].categories.length; l++)
				{
					if (this.get("tempAdvisorDealers")[index].categories[l] === this._individualCategories[k].value)
					{
						foundIndividualCategory = true;
					}
				}
				if (!foundIndividualCategory)
				{
					categories.push(Object.assign({}, this._individualCategories[k]));
				}
			}			
		}

		if (categories.length === 0 || this.get("disabled"))
		{
			item.$.categoryPickerButton.set("disabled", true);
			item.$.addCategoryButton.set("disabled", true);
			item.$.addCategoryButton.removeClass("primary");

			categories.push({content: "No Categories Available.", active: true});
		}
		else
		{
			categories.sort(function(a, b){
				if (a.content > b.content) {return 1;}
				if (a.content < b.content) {return -1;}
				return 0;
			});

			categories[0].active = true;
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		item.$.categoryPicker.createComponents(categories, {owner: this});
		item.$.categoryPicker.render();
	},

	setupJurisdictionRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempAdvisorDealers")[inEvent.index];

		for (var i = 0; i < this._jurisdictions.length; i++)
		{
			if (target.jurisdiction === this._jurisdictions[i].value)
			{
				item.$.jurisdictionName.set("content", this._jurisdictions[i].content);
			}
		}

		this.populateCategories(item, inEvent.index);
		item.$.noCategoriesItem.set("showing", target.categories.length === 0);
		item.$.categoryRepeater.setCount(target.categories.length);
		
		if (this.get("validating") && target.categories.length === 0)
		{
			this._validated = false;
			item.$.categoryPickerButton.applyStyle("border", "1px solid red");
		}
		else
		{
			item.$.categoryPickerButton.applyStyle("border", null);
		}
		
		return true;
	},

	setupCategoryRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempAdvisorDealers")[inEvent.indices[1]].categories[inEvent.indices[0]];
		
		for (var i = 0; i < this._individualCategories.length; i++)
		{
			if (target === this._individualCategories[i].value)
			{
				item.$.categoryName.set("content", this._individualCategories[i].content);
			}
		}

		for (var j = 0; j < this._corporateCategories.length; j++)
		{
			if (target === this._corporateCategories[j].value)
			{
				item.$.categoryName.set("content", this._corporateCategories[j].content);
			}
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempAdvisorDealers").length === 0)
		{
			this._validated = false;
			this.$.advisorJurisdictionPickerButton.applyStyle("border", "1px solid red");
		}
		this.$.jurisdictionsRepeater.setCount(this.get("tempAdvisorDealers").length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.advisorJurisdictionPickerButton.applyStyle("border", null);
		this.$.jurisdictionsRepeater.setCount(this.get("tempAdvisorDealers").length);
	}
});