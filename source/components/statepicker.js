enyo.kind({
	name: "quantum.StatePicker",

	published: 
	{
		disabled: false,
		selected: null
	},

	components: [
		{kind: "onyx.PickerDecorator", components: [
			{name: "pickerButton", style: "width: 100%;"},
			{name: "picker", kind: "onyx.Picker", components: [
				{content: "Alabama", value: "AL"},
				{content: "Alaska", value: "AK"},
				{content: "Arizona", value: "AZ"},
				{content: "Arkansas", value: "AR"},
				{content: "California", value: "CA"},
				{content: "Colorado", value: "CO"},
				{content: "Connecticut", value: "CT"},
				{content: "Delaware", value: "DE"},
				{content: "District of Columbia", value: "DC"},
				{content: "Florida", value: "FL"},
				{content: "Georgia", value: "GA"},
				{content: "Hawaii", value: "HI"},
				{content: "Idaho", value: "ID"},
				{content: "Illinois", value: "IL"},
				{content: "Indiana", value: "IN"},
				{content: "Iowa", value: "IA"},
				{content: "Kansas", value: "KS"},
				{content: "Kentucky", value: "KY"},
				{content: "Louisiana", value: "LA"},
				{content: "Maine", value: "ME"},
				{content: "Maryland", value: "MD"},
				{content: "Massachusetts", value: "MA"},
				{content: "Michigan", value: "MI"},
				{content: "Minnesota", value: "MN"},
				{content: "Mississippi", value: "MS"},
				{content: "Missouri", value: "MO"},
				{content: "Montana", value: "MT"},
				{content: "Nebraska", value: "NE"},
				{content: "Nevada", value: "NV"},
				{content: "New Hampshire", value: "NH"},
				{content: "New Jersey", value: "NJ"},
				{content: "New Mexico", value: "NM"},
				{content: "New York", value: "NY"},
				{content: "North Carolina", value: "NC"},
				{content: "North Dakota", value: "ND"},
				{content: "Ohio", value: "OH"},
				{content: "Oklahoma", value: "OK"},
				{content: "Oregon", value: "OR"},
				{content: "Pennsylvania", value: "PA"},
				{content: "Rhode Island", value: "RI"},
				{content: "South Carolina", value: "SC"},
				{content: "South Dakota", value: "SD"},
				{content: "Tennessee", value: "TN"},
				{content: "Texas", value: "TX"},
				{content: "Utah", value: "UT"},
				{content: "Vermont", value: "VT"},
				{content: "Virginia", value: "VA"},
				{content: "Washington", value: "WA"},
				{content: "West Virginia", value: "WV"},
				{content: "Wisconsin", value: "WI"},
				{content: "Wyoming", value: "WY"}
			]}
		]}
	],

	bindings: [
		{from: ".disabled", to: ".$.pickerButton.disabled", oneWay: false},
		{from: ".selected", to: ".$.picker.selected", oneWay: false, transform: function(val, dir) {
			if (dir === 1)
			{
				try
				{
					if (val != null && val !== "")
					{
						if (typeof(val) === 'string')
						{
							// If "val" is a non-empty string, attempt to transform it into an Enyo control.
							var data = val.toLowerCase();
							var control = this.$.picker.controls.find(function(element, index, array)
							{
								var content = element.content ? element.content.toLowerCase() : null;
								var value = element.value ? element.value.toLowerCase() : null;
								return (content === data || value === data);
							});
							if (control != null)
							{
								this.set("selected", control);
								return control;
							}
							else
							{
								//console.log('State "' + val + '" not found in picker!');
								throw null;
							}
						}
						else if (val instanceof enyo.Control)
						{
							// If "val" appears to be an Enyo control, no transformation is required, so return it as-is.
							return val;
						}
						else { throw null; }
					}
					else { throw null; }
				}
				catch (err)
				{
					if (this.selected !== null) { this.set("selected", null); }
					else { this.$.pickerButton.set("content", "Select State"); }
					return null;
				}
			}
			else if (dir === 2) { return val; }
		}}
	]
});