enyo.kind({
	name: "quantum.CurrencyPicker",

	published: 
	{
		disabled: false,
		selected: null
	},

	components: [
		{kind: "onyx.PickerDecorator", components: [
			{name: "pickerButton", style: "width: 100%;"},
			{name: "picker", kind: "onyx.Picker", components: [
				{content: "AUD (Australian Dollar)", value: "AUD"},
				{content: "BRL (Brazilian Real)", value: "BRL"},
				{content: "CAD (Canadian Dollar)", value: "CAD"},
				{content: "CHF (Swiss Franc)", value: "CHF"},
				{content: "CNY (Renminbi)", value: "CNY"},
				{content: "EUR (Euro)", value: "EUR"},
				{content: "GBP (Pound Sterling)", value: "GBP"},
				{content: "HKD (Hong Kong Dollar)", value: "HKD"},
				{content: "INR (Indian Rupee)", value: "INR"},
				{content: "JPY (Japanese Yen)", value: "JPY"},
				{content: "KRW (South Korean Won)", value: "KRW"},
				{content: "MXN (Mexican Peso)", value: "MXN"},
				{content: "NOK (Norwegian Krone)", value: "NOK"},
				{content: "NZD (New Zealand Dollar)", value: "NZD"},
				{content: "RUB (Russian Ruble)", value: "RUB"},
				{content: "SEK (Swedish Krona)", value: "SEK"},
				{content: "SGD (Singapore Dollar)", value: "SGD"},
				{content: "TRY (Turkish Lira)", value: "TRY"},
				{content: "USD (US Dollar)", value: "USD"},
				{content: "ZAR (South African Rand)", value: "ZAR"}
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
								//console.log('Currency "' + val + '" not found in picker!');
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
					else { this.$.pickerButton.set("content", "Select Currency"); }
					return null;
				}
			}
			else if (dir === 2) { return val; }
		}}
	]
});