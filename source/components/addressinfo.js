enyo.kind({
	name: "lumberjack.AddressInfo",

	published: {
		activeEntry: null,
		hideMailingAddressSection: false,
		hideHeader: false
	},

	components:[
		{name: "wrapper", kind: "enyo.FittableColumns", components: [
			{style: "width: 50%; padding-right: 5px; min-width: 480px;", components: [
				{name: "registeredAddressHeader", style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Registered Address"},
				{kind: "lumberjack.Input", name:"addressLine1Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Address Line 1", required:true, inputMaxLength:35},
				{kind: "lumberjack.Input", name:"addressLine2Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Address Line 2", required:false, inputMaxLength:35},
				{kind: "lumberjack.Input", name:"addressLine3Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Address Line 3", required:false, inputMaxLength:35},
				{kind: "lumberjack.Input", name:"cityInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"City", required:true, inputMaxLength:31},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Country", style: "line-height: 40px; width: 170px;"},
					{name: "countryPicker", kind: "lumberjack.CountryPicker", style: "margin-left: 10px; width: 295px;"}
				]},
				{name: "addressCanadaSection", components:[
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Province", style: "line-height: 40px; width: 170px;"},
						{name: "provincePicker", kind: "lumberjack.ProvincePicker", style: "margin-left: 10px; width: 295px;"}
					]},
					{kind: "lumberjack.Input", name:"postalCodeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:295px;", inputStyle: "width: 100%", type:"text", label:"Postal Code", required:true, inputMaxLength:7}
				]},
				{name: "addressUsaSection", components:[
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "State", style: "line-height: 40px; width: 170px;"},
						{name: "statePicker", kind: "lumberjack.StatePicker", style: "margin-left: 10px; width: 295px;"}
					]},
					{kind: "lumberjack.Input", name:"zipCodeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:295px;", inputStyle: "width: 100%", type:"text", label:"Zip Code", required:true, inputMaxLength:5}
				]},
				{name: "addressInternationalSection", components:[
					{kind: "lumberjack.Input", name:"internationalProvinceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:295px;", inputStyle: "width: 100%", type:"text", label:"Province/State/Prefecture", required:true},
					{kind: "lumberjack.Input", name:"internationalPostalCodeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:295px;", inputStyle: "width: 100%", type:"text", label:"Postal Code", required:true}
				]}
			]},
			{name: "mailingAddressSection", style: "width: 50%; padding-left: 5px;", components: [
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Mailing Address"},
				{kind:"lumberjack.Checkbox", name:"mailingAddressCheckbox", content:"Mailing Address is different from registration address.", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;"},
				{name: "altAddressSection", components:[
					{kind: "lumberjack.Input", name:"altAddressLine1Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Address Line 1", required:true, inputMaxLength:35},
					{kind: "lumberjack.Input", name:"altAddressLine2Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Address Line 2", required:false, inputMaxLength:35},
					{kind: "lumberjack.Input", name:"altAddressLine3Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Address Line 3", required:false, inputMaxLength:35},
					{kind: "lumberjack.Input", name:"altCityInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"City", required:true, inputMaxLength:31},
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Country", style: "line-height: 40px; width: 170px;"},
						{name: "altCountryPicker", kind: "lumberjack.CountryPicker", style: "margin-left: 10px; width: 320px;"}
					]},
					{name: "altAddressCanadaSection", components:[
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "Province", style: "line-height: 40px; width: 170px;"},
							{name: "altProvincePicker", kind: "lumberjack.ProvincePicker", style: "margin-left: 10px; width: 320px;"}
						]},
						{kind: "lumberjack.Input", name:"altPostalCodeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:320px;", inputStyle: "width: 100%", type:"text", label:"Postal Code", required:true, inputMaxLength:7}
					]},
					{name: "altAddressUsaSection", components:[
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "State", style: "line-height: 40px; width: 170px;"},
							{name: "altStatePicker", kind: "lumberjack.StatePicker", style: "margin-left: 10px; width: 320px;"}
						]},
						{kind: "lumberjack.Input", name:"altZipCodeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:320px;", inputStyle: "width: 100%", type:"text", label:"Zip Code", required:true, inputMaxLength:5}
					]},
					{name: "altAddressInternationalSection", components:[
						{kind: "lumberjack.Input", name:"altInternationalProvinceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:320px;", inputStyle: "width: 100%", type:"text", label:"Province/State/Prefecture", required:true},
						{kind: "lumberjack.Input", name:"altInternationalPostalCodeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px; width:320px;", inputStyle: "width: 100%", type:"text", label:"Postal Code", required:true}
					]}
				]}
			]}
		]}
	],

	bindings:[
		{from: ".$.mailingAddressCheckbox.checked", to: ".$.altAddressSection.showing"},
		{from: ".hideMailingAddressSection", to: ".$.mailingAddressSection.showing", transform: function(v) {return !v;}},
		{from: ".hideHeader", to: ".$.registeredAddressHeader.showing", transform: function(v) {return !v;}},
		{from: ".hideHeader", to: ".$.wrapper.style", transform: function(v) {return v ? "" : "margin-top: 25px;";}},
		{from: ".$.countryPicker.selected", to: ".$.addressCanadaSection.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "CAN"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.countryPicker.selected", to: ".$.addressUsaSection.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "USA"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.countryPicker.selected", to: ".$.addressInternationalSection.showing", transform: function(v) {
			try
			{
				if (v != null) { return !(v.value === "CAN" || v.value === "USA"); }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.altCountryPicker.selected", to: ".$.altAddressCanadaSection.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "CAN"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.altCountryPicker.selected", to: ".$.altAddressUsaSection.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "USA"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.altCountryPicker.selected", to: ".$.altAddressInternationalSection.showing", transform: function(v) {
			try
			{
				if (v != null) { return !(v.value === "CAN" || v.value === "USA"); }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.addressLine1Input.value", transform: function(v) {
			try
			{
				if (v.addressLine1 != null) { return v.addressLine1; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.addressLine2Input.value", transform: function(v) {
			try
			{
				if (v.addressLine2 != null) { return v.addressLine2; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.addressLine3Input.value", transform: function(v) {
			try
			{
				if (v.addressLine3 != null) { return v.addressLine3; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.cityInput.value", transform: function(v) {
			try
			{
				if (v.city != null) { return v.city; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.provincePicker.selected", transform: function(v) {
			try
			{
				var data = v.stateProvince;
				if (data != null && v.country === "CAN") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.statePicker.selected", transform: function(v) {
			try
			{
				var data = v.stateProvince;
				if (data != null && v.country === "USA") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.countryPicker.selected", transform: function(v) {
			try
			{
				if (v.country != null) { return v.country; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.internationalProvinceInput.value", transform: function(v) {
			try
			{
				if (v.stateProvince != null) { return v.stateProvince; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.zipCodeInput.value", transform: function(v) {
			try
			{
				if (v.zipPostalCode != null) { return v.zipPostalCode; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.postalCodeInput.value", transform: function(v) {
			try
			{
				if (v.zipPostalCode != null) { return v.zipPostalCode; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.addressInfo", to: ".$.internationalPostalCodeInput.value", transform: function(v) {
			try
			{
				if (v.zipPostalCode != null) { return v.zipPostalCode; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altMailAddress", to: ".$.mailingAddressCheckbox.checked", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altAddressLine1Input.value", transform: function(v) {
			try
			{
				if (v.addressLine1 != null) { return v.addressLine1; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altAddressLine2Input.value", transform: function(v) {
			try
			{
				if (v.addressLine2 != null) { return v.addressLine2; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altAddressLine3Input.value", transform: function(v) {
			try
			{
				if (v.addressLine3 != null) { return v.addressLine3; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altCityInput.value", transform: function(v) {
			try
			{
				if (v.city != null) { return v.city; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altProvincePicker.selected", transform: function(v) {
			try
			{
				if (v.stateProvince != null) { return v.stateProvince; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altStatePicker.selected", transform: function(v) {
			try
			{
				if (v.stateProvince != null) { return v.stateProvince; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altCountryPicker.selected", transform: function(v) {
			try
			{
				if (v.country != null) { return v.country; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altInternationalProvinceInput.value", transform: function(v) {
			try
			{
				if (v.stateProvince != null) { return v.stateProvince; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altZipCodeInput.value", transform: function(v) {
			try
			{
				if (v.zipPostalCode != null) { return v.zipPostalCode; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altPostalCodeInput.value", transform: function(v) {
			try
			{
				if (v.zipPostalCode != null) { return v.zipPostalCode; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.altAddressInfo", to: ".$.altInternationalPostalCodeInput.value", transform: function(v) {
			try
			{
				if (v.zipPostalCode != null) { return v.zipPostalCode; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}}
	],

	setDisabled: function(disabled)
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input" || this.$[key].kind === "lumberjack.Checkbox")
			{
				this.$[key].set("disabled",disabled);
			}
		}

		this.$.provincePicker.set("disabled", disabled);
		this.$.statePicker.set("disabled", disabled);
		this.$.countryPicker.set("disabled", disabled);
		this.$.altProvincePicker.set("disabled", disabled);
		this.$.altStatePicker.set("disabled", disabled);
		this.$.altCountryPicker.set("disabled", disabled);
	},

	disableCountryPicker: function(disabled)
	{
		this.$.countryPicker.set("disabled", disabled);
	},

	hideCanadaUSA: function()
	{
		this.$.countryPicker.$.canada.hide();
		this.$.countryPicker.$.usa.hide();
	},

	jurisdictionChange: function(jurisdiction)
	{
		if(jurisdiction === "international")
		{
			this.$.countryPicker.set("selected", null);
			this.$.countryPicker.$.canada.hide();
			this.$.countryPicker.$.usa.hide();
		}
	},

	clearBorderError: function()
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input")
			{
				this.$[key].clearBorderError();
			}
		}

		this.$.countryPicker.applyStyle("border", null);
		this.$.altCountryPicker.applyStyle("border", null);
	},

	updateActiveEntry: function()
	{
		if(typeof this.get("activeEntry").raw === "function")
		{
			this.get("activeEntry").get("addressInfo").addressLine1 = this.$.addressLine1Input.get("value");
			this.get("activeEntry").get("addressInfo").addressLine2 = this.$.addressLine2Input.get("value");
			this.get("activeEntry").get("addressInfo").addressLine3 = this.$.addressLine3Input.get("value");
			this.get("activeEntry").get("addressInfo").city = this.$.cityInput.get("value");
			if (this.$.countryPicker.get("selected").value === "CAN")
			{
				this.get("activeEntry").get("addressInfo").stateProvince = this.$.provincePicker.get("selected").value;
				this.get("activeEntry").get("addressInfo").zipPostalCode = this.$.postalCodeInput.get("value");
			}
			else if (this.$.countryPicker.get("selected").value === "USA")
			{
				this.get("activeEntry").get("addressInfo").stateProvince = this.$.statePicker.get("selected").value;
				this.get("activeEntry").get("addressInfo").zipPostalCode = this.$.zipCodeInput.get("value");
			}
			else
			{
				this.get("activeEntry").get("addressInfo").stateProvince = this.$.internationalProvinceInput.get("value");
				this.get("activeEntry").get("addressInfo").zipPostalCode = this.$.internationalPostalCodeInput.get("value");
			}
			this.get("activeEntry").get("addressInfo").country = this.$.countryPicker.get("selected").value;
			if (!this.get("hideMailingAddressSection"))
			{
				this.get("activeEntry").set("altMailAddress", this.$.mailingAddressCheckbox.get("checked"));

				this.get("activeEntry").get("altAddressInfo").addressLine1 = this.$.mailingAddressCheckbox.get("checked") ? this.$.altAddressLine1Input.get("value") : "";
				this.get("activeEntry").get("altAddressInfo").addressLine2 = this.$.mailingAddressCheckbox.get("checked") ? this.$.altAddressLine2Input.get("value") : "";
				this.get("activeEntry").get("altAddressInfo").addressLine3 = this.$.mailingAddressCheckbox.get("checked") ? this.$.altAddressLine3Input.get("value") : "";
				this.get("activeEntry").get("altAddressInfo").city = this.$.mailingAddressCheckbox.get("checked") ? this.$.altCityInput.get("value") : "";
				this.get("activeEntry").get("altAddressInfo").country = this.$.mailingAddressCheckbox.get("checked") ? this.$.altCountryPicker.get("selected").value : "";
				if (!this.$.mailingAddressCheckbox.get("checked"))
				{
					this.get("activeEntry").get("altAddressInfo").stateProvince = "";
					this.get("activeEntry").get("altAddressInfo").zipPostalCode = "";
				}
				else if (this.$.altCountryPicker.get("selected").value === "CAN")
				{
					this.get("activeEntry").get("altAddressInfo").stateProvince = this.$.mailingAddressCheckbox.get("checked") ? this.$.altProvincePicker.get("selected").value : "";
					this.get("activeEntry").get("altAddressInfo").zipPostalCode = this.$.mailingAddressCheckbox.get("checked") ? this.$.altPostalCodeInput.get("value") : "";
				}
				else if (this.$.altCountryPicker.get("selected").value === "USA")
				{
					this.get("activeEntry").get("altAddressInfo").stateProvince = this.$.mailingAddressCheckbox.get("checked") ? this.$.altStatePicker.get("selected").value : "";
					this.get("activeEntry").get("altAddressInfo").zipPostalCode = this.$.mailingAddressCheckbox.get("checked") ? this.$.altZipCodeInput.get("value") : "";
				}
				else
				{
					this.get("activeEntry").get("altAddressInfo").stateProvince = this.$.mailingAddressCheckbox.get("checked") ? this.$.altInternationalProvinceInput.get("value") : "";
					this.get("activeEntry").get("altAddressInfo").zipPostalCode = this.$.mailingAddressCheckbox.get("checked") ? this.$.altInternationalPostalCodeInput.get("value") : "";
				}
			}
		}
		else
		{
			this.get("activeEntry").addressInfo.addressLine1 = this.$.addressLine1Input.get("value");
			this.get("activeEntry").addressInfo.addressLine2 = this.$.addressLine2Input.get("value");
			this.get("activeEntry").addressInfo.addressLine3 = this.$.addressLine3Input.get("value");
			this.get("activeEntry").addressInfo.city = this.$.cityInput.get("value");
			if (this.$.countryPicker.get("selected").value === "CAN")
			{
				this.get("activeEntry").addressInfo.stateProvince = this.$.provincePicker.get("selected").value;
				this.get("activeEntry").addressInfo.zipPostalCode = this.$.postalCodeInput.get("value");
			}
			else if (this.$.countryPicker.get("selected").value === "USA")
			{
				this.get("activeEntry").addressInfo.stateProvince = this.$.statePicker.get("selected").value;
				this.get("activeEntry").addressInfo.zipPostalCode = this.$.zipCodeInput.get("value");
			}
			else
			{
				this.get("activeEntry").addressInfo.stateProvince = this.$.internationalProvinceInput.get("value");
				this.get("activeEntry").addressInfo.zipPostalCode = this.$.internationalPostalCodeInput.get("value");
			}
			this.get("activeEntry").addressInfo.country = this.$.countryPicker.get("selected").value;

			if (!this.get("hideMailingAddressSection"))
			{
				this.get("activeEntry").altMailAddress = this.$.mailingAddressCheckbox.get("checked");

				this.get("activeEntry").altAddressInfo.addressLine1 = this.$.mailingAddressCheckbox.get("checked") ? this.$.altAddressLine1Input.get("value") : "";
				this.get("activeEntry").altAddressInfo.addressLine2 = this.$.mailingAddressCheckbox.get("checked") ? this.$.altAddressLine2Input.get("value") : "";
				this.get("activeEntry").altAddressInfo.addressLine3 = this.$.mailingAddressCheckbox.get("checked") ? this.$.altAddressLine3Input.get("value") : "";
				this.get("activeEntry").altAddressInfo.city = this.$.mailingAddressCheckbox.get("checked") ? this.$.altCityInput.get("value") : "";
				this.get("activeEntry").altAddressInfo.country = this.$.mailingAddressCheckbox.get("checked") ? this.$.altCountryPicker.get("selected").value : "";
				if (!this.$.mailingAddressCheckbox.get("checked"))
				{
					this.get("activeEntry").altAddressInfo.stateProvince = "";
					this.get("activeEntry").altAddressInfo.zipPostalCode = "";
				}
				else if (this.$.altCountryPicker.get("selected").value === "CAN")
				{
					this.get("activeEntry").altAddressInfo.stateProvince = this.$.mailingAddressCheckbox.get("checked") ? this.$.altProvincePicker.get("selected").value : "";
					this.get("activeEntry").altAddressInfo.zipPostalCode = this.$.mailingAddressCheckbox.get("checked") ? this.$.altPostalCodeInput.get("value") : "";
				}
				else if (this.$.altCountryPicker.get("selected").value === "USA")
				{
					this.get("activeEntry").altAddressInfo.stateProvince = this.$.mailingAddressCheckbox.get("checked") ? this.$.altStatePicker.get("selected").value : "";
					this.get("activeEntry").altAddressInfo.zipPostalCode = this.$.mailingAddressCheckbox.get("checked") ? this.$.altZipCodeInput.get("value") : "";
				}
				else
				{
					this.get("activeEntry").altAddressInfo.stateProvince = this.$.mailingAddressCheckbox.get("checked") ? this.$.altInternationalProvinceInput.get("value") : "";
					this.get("activeEntry").altAddressInfo.zipPostalCode = this.$.mailingAddressCheckbox.get("checked") ? this.$.altInternationalPostalCodeInput.get("value") : "";
				}
			}
		}
	},

	updateAddressFields: function(addressInfo)
	{
		this.$.addressLine1Input.set("value", addressInfo.addressLine1);
		this.$.addressLine2Input.set("value", addressInfo.addressLine2);
		this.$.addressLine3Input.set("value", addressInfo.addressLine3);
		this.$.cityInput.set("value", addressInfo.city);
		if (addressInfo.country === "CAN")
		{
			this.$.provincePicker.set("selected", addressInfo.stateProvince);
			this.$.postalCodeInput.set("value", addressInfo.zipPostalCode);
		}
		else if (addressInfo.country === "USA")
		{
			this.$.statePicker.set("selected", addressInfo.stateProvince);
			this.$.zipCodeInput.set("value", addressInfo.zipPostalCode);
		}
		else
		{
			this.$.internationalProvinceInput.set("value", addressInfo.stateProvince);
			this.$.internationalPostalCodeInput.set("value", addressInfo.zipPostalCode);
		}
		this.$.countryPicker.set("selected", addressInfo.country);
	},

	isDirty: function()
	{	
		var isDirtyArray;

		if(typeof this.get("activeEntry").raw === "function")
		{
			isDirtyArray = [
				this.get("activeEntry").get("addressInfo").addressLine1 !== this.$.addressLine1Input.get("value"),
				this.get("activeEntry").get("addressInfo").addressLine2 !== this.$.addressLine2Input.get("value"),
				this.get("activeEntry").get("addressInfo").addressLine3 !== this.$.addressLine3Input.get("value"),
				this.get("activeEntry").get("addressInfo").city !== this.$.cityInput.get("value"),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "CAN" && this.$.provincePicker.get("selected") && this.get("activeEntry").get("addressInfo").stateProvince !== this.$.provincePicker.get("selected").value),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "USA" && this.$.statePicker.get("selected") && this.get("activeEntry").get("addressInfo").stateProvince !== this.$.statePicker.get("selected").value),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value !== "CAN" && this.$.countryPicker.get("selected").value !== "USA" && this.$.statePicker.get("selected") && this.get("activeEntry").get("addressInfo").stateProvince !== this.$.internationalProvinceInput.get("value")),
				(this.$.countryPicker.get("selected") && this.get("activeEntry").get("addressInfo").country.toLowerCase() !== this.$.countryPicker.get("selected").content.toLowerCase() && this.get("activeEntry").get("addressInfo").country.toLowerCase() !== this.$.countryPicker.get("selected").value.toLowerCase()),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "CAN" && this.get("activeEntry").get("addressInfo").zipPostalCode !== this.$.postalCodeInput.get("value")),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "USA" && this.get("activeEntry").get("addressInfo").zipPostalCode !== this.$.zipCodeInput.get("value")),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value !== "CAN" && this.$.countryPicker.get("selected").value !== "USA" && this.get("activeEntry").get("addressInfo").zipPostalCode !== this.$.internationalPostalCodeInput.get("value")),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").get("altMailAddress") !== this.$.mailingAddressCheckbox.get("checked"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").get("altAddressInfo").addressLine1 !== this.$.altAddressLine1Input.get("value"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").get("altAddressInfo").addressLine2 !== this.$.altAddressLine2Input.get("value"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").get("altAddressInfo").addressLine3 !== this.$.altAddressLine3Input.get("value"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").get("altAddressInfo").city !== this.$.altCityInput.get("value"),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "CAN" && this.$.altProvincePicker.get("selected") && this.get("activeEntry").get("altAddressInfo").stateProvince !== this.$.altProvincePicker.get("selected").value),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "USA" && this.$.altStatePicker.get("selected") && this.get("activeEntry").get("altAddressInfo").stateProvince !== this.$.altStatePicker.get("selected").value),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value !== "CAN" && this.$.altCountryPicker.get("selected").value !== "USA" && this.$.altStatePicker.get("selected") && this.get("activeEntry").get("altAddressInfo").stateProvince !== this.$.altInternationalProvinceInput.get("value")),
				(this.$.altCountryPicker.get("selected") && this.get("activeEntry").get("altAddressInfo").country.toLowerCase() !== this.$.altCountryPicker.get("selected").content.toLowerCase() && this.get("activeEntry").get("altAddressInfo").country.toLowerCase() !== this.$.altCountryPicker.get("selected").value.toLowerCase()),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "CAN" && this.get("activeEntry").get("altAddressInfo").zipPostalCode !== this.$.altPostalCodeInput.get("value")),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "USA" && this.get("activeEntry").get("altAddressInfo").zipPostalCode !== this.$.altZipCodeInput.get("value")),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value !== "CAN" && this.$.altCountryPicker.get("selected").value !== "USA" && this.get("activeEntry").get("altAddressInfo").zipPostalCode !== this.$.altInternationalPostalCodeInput.get("value"))
			];	
		}
		else
		{
			isDirtyArray = [
				this.get("activeEntry").addressInfo.addressLine1 !== this.$.addressLine1Input.get("value"),
				this.get("activeEntry").addressInfo.addressLine2 !== this.$.addressLine2Input.get("value"),
				this.get("activeEntry").addressInfo.addressLine3 !== this.$.addressLine3Input.get("value"),
				this.get("activeEntry").addressInfo.city !== this.$.cityInput.get("value"),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "CAN" && this.$.provincePicker.get("selected") && this.get("activeEntry").addressInfo.stateProvince !== this.$.provincePicker.get("selected").value),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "USA" && this.$.statePicker.get("selected") && this.get("activeEntry").addressInfo.stateProvince !== this.$.statePicker.get("selected").value),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value !== "CAN" && this.$.countryPicker.get("selected").value !== "USA" && this.$.statePicker.get("selected") && this.get("activeEntry").addressInfo.stateProvince !== this.$.internationalProvinceInput.get("value")),
				(this.$.countryPicker.get("selected") && this.get("activeEntry").addressInfo.country.toLowerCase() !== this.$.countryPicker.get("selected").content.toLowerCase() && this.get("activeEntry").addressInfo.country.toLowerCase() !== this.$.countryPicker.get("selected").value.toLowerCase()),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "CAN" && this.get("activeEntry").addressInfo.zipPostalCode !== this.$.postalCodeInput.get("value")),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value === "USA" && this.get("activeEntry").addressInfo.zipPostalCode !== this.$.zipCodeInput.get("value")),
				(this.$.countryPicker.get("selected") && this.$.countryPicker.get("selected").value !== "CAN" && this.$.countryPicker.get("selected").value !== "USA" && this.get("activeEntry").addressInfo.zipPostalCode !== this.$.internationalPostalCodeInput.get("value")),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").altMailAddress !== this.$.mailingAddressCheckbox.get("checked"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").altAddressInfo.addressLine1 !== this.$.altAddressLine1Input.get("value"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").altAddressInfo.addressLine2 !== this.$.altAddressLine2Input.get("value"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").altAddressInfo.addressLine3 !== this.$.altAddressLine3Input.get("value"),
				!this.get("hideMailingAddressSection") && this.get("activeEntry").altAddressInfo.city !== this.$.altCityInput.get("value"),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "CAN" && this.$.altProvincePicker.get("selected") && this.get("activeEntry").altAddressInfo.stateProvince !== this.$.altProvincePicker.get("selected").value),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "USA" && this.$.altStatePicker.get("selected") && this.get("activeEntry").altAddressInfo.stateProvince !== this.$.altStatePicker.get("selected").value),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value !== "CAN" && this.$.altCountryPicker.get("selected").value !== "USA" && this.$.altStatePicker.get("selected") && this.get("activeEntry").altAddressInfo.stateProvince !== this.$.altInternationalProvinceInput.get("value")),
				(this.$.altCountryPicker.get("selected") && this.get("activeEntry").altAddressInfo.country.toLowerCase() !== this.$.altCountryPicker.get("selected").content.toLowerCase() && this.get("activeEntry").altAddressInfo.country.toLowerCase() !== this.$.altCountryPicker.get("selected").value.toLowerCase()),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "CAN" && this.get("activeEntry").altAddressInfo.zipPostalCode !== this.$.altPostalCodeInput.get("value")),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value === "USA" && this.get("activeEntry").altAddressInfo.zipPostalCode !== this.$.altZipCodeInput.get("value")),
				(this.$.mailingAddressCheckbox.get("checked") && this.$.altCountryPicker.get("selected") && this.$.altCountryPicker.get("selected").value !== "CAN" && this.$.altCountryPicker.get("selected").value !== "USA" && this.get("activeEntry").altAddressInfo.zipPostalCode !== this.$.altInternationalPostalCodeInput.get("value"))
			];	
		}

		//console.log(isDirtyArray);
		if(isDirtyArray.indexOf(true)!== -1)
		{
			return true;
		}
		else 
		{
			return false;
		}
	},

	validate: function()
	{
		var isValid = true;
		var borderError = "2px solid red";

		// Address Line 1:
		if (!this.$.addressLine1Input.validate()){isValid = false;}

		// Address Line 2:
		if (!this.$.addressLine2Input.validate()){isValid = false;}

		// Address Line 3:
		if (!this.$.addressLine3Input.validate()){isValid = false;}

		// City:
		if (!this.$.cityInput.validate()){isValid = false;}

		// Country:
		if (!this.$.countryPicker.get("selected"))
		{
			isValid = false;
			this.$.countryPicker.applyStyle("border", borderError);
		}

		// Zip/Postal Code:
		var zipRegEx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
		var postalRegEx = /^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i;
		if (this.$.countryPicker.get("selected") && (this.$.countryPicker.get("selected").value === "USA" && !this.$.zipCodeInput.get("value").match(zipRegEx)))
		{
			isValid = false;
			this.$.zipCodeInput.setBorderError();
		}

		if (this.$.countryPicker.get("selected") && (this.$.countryPicker.get("selected").value === "CAN" && !this.$.postalCodeInput.get("value").match(postalRegEx)))
		{
			isValid = false;
			this.$.postalCodeInput.setBorderError();
		}

		//Canada Province
		if (this.$.countryPicker.get("selected") && (this.$.countryPicker.get("selected").value === "CAN" && !this.$.provincePicker.get("selected")))
		{
			isValid = false;
			this.$.provincePicker.applyStyle("border", borderError);
		}
		
		//USA State
		if (this.$.countryPicker.get("selected") && (this.$.countryPicker.get("selected").value === "USA" && !this.$.statePicker.get("selected")))
		{
			isValid = false;
			this.$.statePicker.applyStyle("border", borderError);
		}

		//International State/Province
		if (this.$.countryPicker.get("selected") && (this.$.countryPicker.get("selected").value !== "USA" && this.$.countryPicker.get("selected").value !== "CAN"))
		{
			if (this.$.internationalProvinceInput.get("value").length > 3) {
				isValid = false;
				this.$.internationalProvinceInput.setBorderError();
			}
		}

		//Mailing Address
		if (this.$.mailingAddressCheckbox.get("checked"))
		{
			// Alt Address Line 1:
			if (!this.$.altAddressLine1Input.validate()){isValid = false;}

			// Address Line 2:
			if (!this.$.altAddressLine2Input.validate()){isValid = false;}

			// Address Line 3:
			if (!this.$.altAddressLine3Input.validate()){isValid = false;}

			// City:
			if (!this.$.altCityInput.validate()){isValid = false;}

			// Country:
			if (!this.$.altCountryPicker.get("selected"))
			{
				isValid = false;
				this.$.altCountryPicker.applyStyle("border", borderError);
			}

			// Zip/Postal Code:
			if (this.$.altCountryPicker.get("selected") && (this.$.altCountryPicker.get("selected").value === "USA" && !this.$.altZipCodeInput.get("value").match(zipRegEx)))
			{
				isValid = false;
				this.$.altZipCodeInput.setBorderError();
			}

			if (this.$.altCountryPicker.get("selected") && (this.$.altCountryPicker.get("selected").value === "CAN" && !this.$.altPostalCodeInput.get("value").match(postalRegEx)))
			{
				isValid = false;
				this.$.altPostalCodeInput.setBorderError();
			}

			// International State/Province
			if (this.$.altCountryPicker.get("selected") && (this.$.altCountryPicker.get("selected").value !== "USA" && this.$.altCountryPicker.get("selected").value !== "CAN"))
			{
				if (this.$.altInternationalProvinceInput.get("value").length > 3) {
					isValid = false;
					this.$.altInternationalProvinceInput.setBorderError();
				}
			}
		}

		return isValid;
	}
});