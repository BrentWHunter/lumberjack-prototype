enyo.kind({
	name: "lumberjack.InvestmentFund",

	published:
	{
		tempInvestmentFund: null,
		investmentFund: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; width: 500px; padding: 10px;",

	_validated: true,

	components:[
		{kind: "lumberjack.Input", name:"advisorNameInput", columnStyle:"margin-top: 5px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Advisor Name", required:true, oninput: "handleAdvisorNameChanged"},
		{kind: "lumberjack.Input", name:"jurisdictionsRegisteredInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Jurisdictions Registered", required:true, oninput: "handlejurisdictionsRegisteredChanged"},
		{kind: "lumberjack.Input", name:"categoriesOfRegistrationInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Categories of Registration", required:true, oninput: "handleCategoriesOfRegistrationChanged"},
		{kind: "lumberjack.Input", name:"basisOfExemptionInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Basis of Exemption", required:true, oninput: "handleBasisOfExemptionChanged"}
	],

	bindings:[
		{from: ".investmentFund", to: ".tempInvestmentFund", transform: function(v){
			try
			{
				var tempVal = {
					advisorName: v.advisorName || "",
					jurisdictionsRegistered: v.jurisdictionsRegistered || "",
					categoriesOfRegistration: v.categoriesOfRegistration || "",
					basisOfExemption: v.basisOfExemption || ""
				};

				return tempVal;
			}
			catch(err)
			{
				return {
					advisorName: "",
					jurisdictionsRegistered: "",
					categoriesOfRegistration: "",
					basisOfExemption: ""
				};
			}
		}},
		{from: ".tempInvestmentFund.advisorName", to: ".$.advisorNameInput.value"},
		{from: ".tempInvestmentFund.jurisdictionsRegistered", to: ".$.jurisdictionsRegisteredInput.value"},
		{from: ".tempInvestmentFund.categoriesOfRegistration", to: ".$.categoriesOfRegistrationInput.value"},
		{from: ".tempInvestmentFund.basisOfExemption", to: ".$.basisOfExemptionInput.value"},
		{from: ".disabled", to: ".$.advisorNameInput.disabled"},
		{from: ".disabled", to: ".$.jurisdictionsRegisteredInput.disabled"},
		{from: ".disabled", to: ".$.categoriesOfRegistrationInput.disabled"},
		{from: ".disabled", to: ".$.basisOfExemptionInput.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
	},

	handleAdvisorNameChanged: function(inSender, inEvent)
	{
		this.get("tempInvestmentFund").advisorName = this.$.advisorNameInput.get("value");
		return true;
	},

	handlejurisdictionsRegisteredChanged: function(inSender, inEvent)
	{
		this.get("tempInvestmentFund").jurisdictionsRegistered = this.$.jurisdictionsRegisteredInput.get("value");
		return true;
	},

	handleCategoriesOfRegistrationChanged: function(inSender, inEvent)
	{
		this.get("tempInvestmentFund").categoriesOfRegistration = this.$.categoriesOfRegistrationInput.get("value");
		return true;
	},

	handleBasisOfExemptionChanged: function(inSender, inEvent)
	{
		this.get("tempInvestmentFund").basisOfExemption = this.$.basisOfExemptionInput.get("value");
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempInvestmentFund").advisorName.length === 0)
		{
			this._validated = false;
			this.$.advisorNameInput.validate();
		}
		if (this.get("tempInvestmentFund").jurisdictionsRegistered.length === 0)
		{
			this._validated = false;
			this.$.jurisdictionsRegisteredInput.validate();
		}
		if (this.get("tempInvestmentFund").categoriesOfRegistration.length === 0)
		{
			this._validated = false;
			this.$.categoriesOfRegistrationInput.validate();
		}
		if (this.get("tempInvestmentFund").basisOfExemption.length === 0)
		{
			this._validated = false;
			this.$.basisOfExemptionInput.validate();
		}
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.advisorNameInput.clearBorderError();
		this.$.jurisdictionsRegisteredInput.clearBorderError();
		this.$.categoriesOfRegistrationInput.clearBorderError();
		this.$.basisOfExemptionInput.clearBorderError();
	}
});