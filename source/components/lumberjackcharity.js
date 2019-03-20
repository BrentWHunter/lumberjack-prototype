enyo.kind({
	name: "lumberjack.Charity",

	published:
	{
		tempCharity: null,
		charity: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; width: 485px; padding: 10px;",

	_validated: true,

	components:[
		{kind: "lumberjack.Input", name:"registrationNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 140px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Registration Number", required:true, oninput: "handleRegistrationNumberChanged"},
		{kind: "lumberjack.Input", name:"advisorNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 140px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Advisor Name", required:true, oninput: "handleAdvisorNameChanged"},
		{kind: "lumberjack.AdvisorDealer", name: "advisorRegistrationsSection", style: "margin-top: 10px;"}
	],

	bindings:[
		{from: ".charity", to: ".tempCharity", transform: function(v){
			try
			{
				var tempVal = {
					registrationNumber: v.registrationNumber || "",
					advisorName: v.advisorName || "",
					advisorRegistrations: []
				};

				if (Array.isArray(v.advisorRegistrations)){
					v.advisorRegistrations.forEach(function(value, index, array){
						tempVal.advisorRegistrations.push(Object.assign({}, value));
					});
				}

				return tempVal;
			}
			catch(err)
			{
				return {
					registrationNumber: "",
					advisorName: "",
					advisorRegistrations: []
				};
			}
		}},
		{from: ".tempCharity.registrationNumber", to: ".$.registrationNumberInput.value"},
		{from: ".tempCharity.advisorName", to: ".$.advisorNameInput.value"},
		{from: ".tempCharity.advisorRegistrations", to: ".$.advisorRegistrationsSection.advisorDealers"},
		{from: ".disabled", to: ".$.registrationNumberInput.disabled"},
		{from: ".disabled", to: ".$.advisorNameInput.disabled"},
		{from: ".disabled", to: ".$.advisorRegistrationsSection.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this.get("tempCharity").advisorRegistrations = this.$.advisorRegistrationsSection.get("tempAdvisorDealers");
	},

	handleRegistrationNumberChanged: function(inSender, inEvent)
	{
		this.get("tempCharity").registrationNumber = this.$.registrationNumberInput.get("value");
		return true;
	},

	handleAdvisorNameChanged: function(inSender, inEvent)
	{
		this.get("tempCharity").advisorName = this.$.advisorNameInput.get("value");
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempCharity").registrationNumber.length === 0)
		{
			this._validated = false;
			this.$.registrationNumberInput.validate();
		}
		if (this.get("tempCharity").advisorName.length === 0)
		{
			this._validated = false;
			this.$.advisorNameInput.validate();
		}
		if (!this.$.advisorRegistrationsSection.validate())
		{
			this._validated = false;
		}
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.registrationNumberInput.clearBorderError();
		this.$.advisorNameInput.clearBorderError();
		this.$.advisorRegistrationsSection.clearValidation();
	}
});