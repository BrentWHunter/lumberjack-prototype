enyo.kind({
	name: "quantum.ForeignBank",

	published:
	{
		tempForeignBank: null,
		foreignBank: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; width: 475px; padding: 10px;",

	_validated: true,

	components:[
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 150px; line-height: 34px;", content: "Type of Entity"},
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "foreignBankTypePickerButton", style: "width: 300px;"},
				{name: "foreignBankTypePicker", kind: "onyx.Picker", onChange: "handleForeignBankTypePickerChanged", components: [
					{value: "bank", content: "Financial Institution"},
					{value: "ontarioBank", content: "Financial Institution (Ontario)"},
					{value: "bdbc", content: "Business Development Bank of Canada"},
					{value: "ontarioBdbc", content: "Business Development Bank of Canada (Ontario)"},
					{value: "bankSubsidiary", content: "Financial Institution Subsidiary"},
					{value: "ontarioBankSubsidiary", content: "Financial Institution Subsidiary (Ontario)"},
					{value: "advisorDealer", content: "Adviser/Dealer"},
					{value: "ontarioAdvisorDealer", content: "Adviser/Dealer (Ontario)"},
					{value: "pensionFund", content: "Pension Fund"},
					{value: "ontarioPensionFund", content: "Pension Fund (Ontario)"}
				]}
			]}
		]},
		{kind: "quantum.Input", name:"jurisdictionInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 140px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Jurisdiction", required:true, oninput: "handleJurisdictionInputChanged"}
	],

	bindings:[
		{from: ".foreignBank", to: ".tempForeignBank", transform: function(v){
			try
			{
				var tempVal = {
					type: v.type || this.$.foreignBankTypePicker.get("selected").value,
					jurisdiction: v.jurisdiction || ""
				};

				return tempVal;
			}
			catch(err)
			{
				return {
					type: this.$.foreignBankTypePicker.get("selected") ? this.$.foreignBankTypePicker.get("selected").value : "",
					jurisdiction: ""
				};
			}
		}},
		{from: ".tempForeignBank.type", to: ".$.foreignBankTypePicker.selected", transform: function(val){
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.foreignBankTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { return this.$.foreignBankTypePicker.controls[1]; } //Because position 0 is the scroller.
			}
			catch (err)
			{
				this.$.foreignBankTypePicker.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".tempForeignBank.jurisdiction", to: ".$.jurisdictionInput.value"},
		{from: ".disabled", to: ".$.foreignBankTypePickerButton.disabled"},
		{from: ".disabled", to: ".$.jurisdictionInput.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
	},

	handleForeignBankTypePickerChanged: function(inSender, inEvent)
	{
		if (this.get("tempForeignBank") && this.get("tempForeignBank").type !== this.$.foreignBankTypePicker.get("selected").value)
		{
			this.get("tempForeignBank").type = this.$.foreignBankTypePicker.get("selected").value;
		}
	},

	handleJurisdictionInputChanged: function(inSender, inEvent)
	{
		this.get("tempForeignBank").jurisdiction = this.$.jurisdictionInput.get("value");
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempForeignBank").jurisdiction.length === 0)
		{
			this._validated = false;
			this.$.jurisdictionInput.validate();
		}
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.jurisdictionInput.clearBorderError();
	}
});