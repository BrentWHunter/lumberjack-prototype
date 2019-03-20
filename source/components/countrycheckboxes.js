enyo.kind({
	name: "quantum.CountryCheckboxes",
	kind: enyo.Control,
  
	published: {
		countriesArray: null,
		countriesArrayNonCanUSA: null,
		checkedCountries: null,
		allCountriesChecked: false,
		allNonUSorCanadaChecked: false
	},

	events: {
		onAllCountriesChecked: "",
		onAllNonUSorCanadaChecked: "",
		onNeitherChecked: ""
	},

	components: [
		{name: "checkboxesContainer", kind: "enyo.FittableColumns"}
	],
	
	rendered: function(inSender, inEvent){
		this.inherited(arguments);

		if (!Array.isArray(this.get("countriesArray")) || this.get("countriesArray").length === 0) { return; }

		if (!this.get("checkedCountries")) {this.set("checkedCountries", []);}

		var fieldsToAdd = [];
		var countriesArrayNonCanUSA = [];
		var activeColumn = null;

		this.get("countriesArray").forEach(enyo.bind(this, function(value, index, array){
			if (value !== "CAN" && value !== "USA")
			{
				countriesArrayNonCanUSA.push(value);
			}

			if (index % 5 === 0) //Set up columns with 5 entries each
			{
				if (activeColumn)
				{
					fieldsToAdd.push(activeColumn);
				}

				activeColumn = {components: []};
			}

			var checked = this.get("allCountriesChecked") || this.get("checkedCountries").indexOf(value) !== -1;

			activeColumn.components.push({name: value + "Checkbox", kind: "quantum.Checkbox", style: "margin-left: 10px;", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", content: value, onchange: "checkBoxesForCountry", checked: checked});
		}));

		fieldsToAdd.push(activeColumn);

		this.set("countriesArrayNonCanUSA", countriesArrayNonCanUSA);
		this.$.checkboxesContainer.destroyClientControls();
		this.$.checkboxesContainer.createComponents(fieldsToAdd, {owner: this});
		this.$.checkboxesContainer.render();
		this.checkBoxesForCountry();
	},

	checkBoxesForCountry: function(inSender, inEvent){
		var countChecked = 0;
		var countNonCanUSA = 0;
		this.set("allCountriesChecked", false);
		this.set("allNonUSorCanadaChecked", false);
		this.set("checkedCountries", []);

		this.get("countriesArray").forEach(enyo.bind(this, function(value, index, array) {
			var checked = this.$[value + "Checkbox"];
			if (checked.getValue() === true) {
				countChecked += 1;
				this.get("checkedCountries").push(value);
			
				if (value !== "CAN" && value !== "USA") {
					countNonCanUSA += 1;
				}
			}
		}));

		var allBoxes = this.get("countriesArray").length;
		var allNonCanUSABoxes = this.get("countriesArrayNonCanUSA").length;

		if ((!this.$.CANCheckbox || this.$.CANCheckbox.getValue() === false) && (!this.$.USACheckbox || this.$.USACheckbox.getValue() === false) && countNonCanUSA === allNonCanUSABoxes) {
			// If all boxes are checked except Canada/USA
			this.set("allNonUSorCanadaChecked", true);
			this.doAllNonUSorCanadaChecked();
		} else if (countChecked == allBoxes) {
			// If all boxes are checked
			this.set("allCountriesChecked", false);
			this.doAllCountriesChecked();
		} else {
			this.doNeitherChecked();
		}
	},

	setCountryCheckbox: function(country, checked){
		var checkbox = this.$[country + "Checkbox"];
		if (checkbox) {checkbox.setChecked(checked);}
	}
});