enyo.kind({
	name: "lumberjack.ProvincePicker",

	published: 
	{
		disabled: false,
		selected: null
	},

	components: [
		{kind: "onyx.PickerDecorator", components: [
			{name: "pickerButton", style: "width: 100%;"},
			{name: "picker", kind: "onyx.Picker", components: [
				{content: "Alberta", value: "AB"},
				{content: "British Columbia", value: "BC"},
				{content: "Manitoba", value: "MB"},
				{content: "New Brunswick", value: "NB"},
				{content: "Newfoundland", value: "NL"},
				{content: "Northwest Territories", value: "NT"},
				{content: "Nova Scotia", value: "NS"},
				{content: "Nunavut", value: "NU"},
				{content: "Ontario", value: "ON", noFriendsAndFamilyExemption: true},
				{content: "Prince Edward Island", value: "PE"},
				{content: "Quebec", value: "QC"},
				{content: "Saskatchewan", value: "SK", noFriendsAndFamilyExemption: true},
				{content: "Yukon", value: "YT"}
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
								//console.log('Province "' + val + '" not found in picker!');
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
					else { this.$.pickerButton.set("content", "Select Province"); }
					return null;
				}
			}
			else if (dir === 2) { return val; }
		}}
	]
});