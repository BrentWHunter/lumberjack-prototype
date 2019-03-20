enyo.kind({
	name: "lumberjack.LargeAssetNonIndividual",

	published:
	{
		tempLargeAssetNonIndividual: null,
		largeAssetNonIndividual: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; width: 475px; padding: 10px;",

	_validated: false,

	components:[
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 150px; line-height: 34px;", content: "Type of Entity"},
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "largeAssetNonIndividualTypePickerButton", style: "width: 300px;"},
				{name: "largeAssetNonIndividualTypePicker", kind: "onyx.Picker", onChange: "handleLargeAssetNonIndividualTypePickerChanged", components: [
					{value: "corporate", content: "Corporation"},
					{value: "trust", content: "Trust"},
					{value: "fund", content: "Fund"},
					{value: "otherOrganization", content: "Other Organization"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{style: "width: 150px; line-height: 34px;", content: "Jurisdiction"},
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "largeAssetNonIndividualJurisdictionPickerButton", style: "width: 300px;"},
				{name: "largeAssetNonIndividualJurisdictionPicker", kind: "onyx.Picker", onChange: "handleLargeAssetNonIndividualJurisdictionPickerChanged", components: [
					{value: "CA-AB", content: "Alberta"},
					{value: "CA-BC", content: "British Columbia"},
					{value: "CA-MB", content: "Manitoba"},
					{value: "CA-NB", content: "New Brunswick"},
					{value: "CA-NL", content: "Newfoundland"},
					{value: "CA-NT", content: "Northwest Territories"},
					{value: "CA-NS", content: "Nova Scotia"},
					{value: "CA-NU", content: "Nunavut"},
					{value: "CA-ON", content: "Ontario"},
					{value: "CA-PE", content: "Prince Edward Island"},
					{value: "CA-QC", content: "Quebec"},
					{value: "CA-SK", content: "Saskatchewan"},
					{value: "CA-YT", content: "Yukon Territory"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Date Formed", style: "line-height: 34px; width: 150px;"},
			{components: [
				{kind: "lumberjack.Input", name: "dateReceivedInput", labelStyle: "", decoratorStyle: "width: 300px;", inputStyle: "width: 300px;", type:"text", required: true, oninput: "handleDateReceivedInputChanged"}
			]}
		]}
	],

	bindings:[
		{from: ".largeAssetNonIndividual", to: ".tempLargeAssetNonIndividual", transform: function(v){
			try
			{
				var tempVal = {
					type: v.type || this.$.largeAssetNonIndividualTypePicker.get("selected").value,
					jurisdiction: v.jurisdiction || this.$.largeAssetNonIndividualJurisdictionPicker.get("selected").value,
					dateOfFormation: v.dateOfFormation || ""
				};

				return tempVal;
			}
			catch(err)
			{
				return {
					type: this.$.largeAssetNonIndividualTypePicker.get("selected") ? this.$.largeAssetNonIndividualTypePicker.get("selected").value : "",
					jurisdiction: this.$.largeAssetNonIndividualJurisdictionPicker.get("selected") ? this.$.largeAssetNonIndividualJurisdictionPicker.get("selected").value : "",
					dateOfFormation: ""
				};
			}
		}},
		{from: ".tempLargeAssetNonIndividual.type", to: ".$.largeAssetNonIndividualTypePicker.selected", transform: function(val){
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.largeAssetNonIndividualTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Jurisdiction "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { return this.$.largeAssetNonIndividualTypePicker.controls[1]; } //Because position 0 is the scroller.
			}
			catch (err)
			{
				this.$.largeAssetNonIndividualTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".tempLargeAssetNonIndividual.jurisdiction", to: ".$.largeAssetNonIndividualJurisdictionPicker.selected", transform: function(val){
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.largeAssetNonIndividualJurisdictionPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Jurisdiction "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { return this.$.largeAssetNonIndividualJurisdictionPicker.controls[1]; } //Because position 0 is the scroller.
			}
			catch (err)
			{
				this.$.largeAssetNonIndividualJurisdictionPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".tempLargeAssetNonIndividual.dateOfFormation", to: ".$.dateReceivedInput.value"},
		{from: ".disabled", to: ".$.largeAssetNonIndividualTypePickerButton.disabled"},
		{from: ".disabled", to: ".$.largeAssetNonIndividualJurisdictionPickerButton.disabled"},
		{from: ".disabled", to: ".$.dateReceivedInput.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
	},

	handleLargeAssetNonIndividualTypePickerChanged: function(inSender, inEvent)
	{
		if (this.get("tempLargeAssetNonIndividual") && this.get("tempLargeAssetNonIndividual").type !== this.$.largeAssetNonIndividualTypePicker.get("selected").value)
		{
			this.get("tempLargeAssetNonIndividual").type = this.$.largeAssetNonIndividualTypePicker.get("selected").value;
		}
	},

	handleLargeAssetNonIndividualJurisdictionPickerChanged: function(inSender, inEvent)
	{
		if (this.get("tempLargeAssetNonIndividual") && this.get("tempLargeAssetNonIndividual").jurisdiction !== this.$.largeAssetNonIndividualJurisdictionPicker.get("selected").value)
		{
			this.get("tempLargeAssetNonIndividual").jurisdiction = this.$.largeAssetNonIndividualJurisdictionPicker.get("selected").value;
		}
	},

	handleDateReceivedInputChanged: function(inSender, inEvent)
	{
		this.get("tempLargeAssetNonIndividual").dateOfFormation = this.$.dateReceivedInput.get("value");
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempLargeAssetNonIndividual").dateOfFormation.length === 0)
		{
			this._validated = false;
			this.$.dateReceivedInput.validate();
		}
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.dateReceivedInput.clearBorderError();
	}
});