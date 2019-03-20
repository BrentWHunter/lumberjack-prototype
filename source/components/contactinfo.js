enyo.kind({
	name: "lumberjack.ContactInfo",

	style: "margin-top: 25px;",

	published: {
		activeEntry: null
	},

	components: [
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Contact Information"},
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 50%; padding-right: 5px; min-width: 480px;", components: [
				{kind: "lumberjack.Input", name:"phoneNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"tel", label:"Primary Phone Number", required:true},
				{kind: "lumberjack.Input", name:"businessPhoneNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"tel", label:"Business Phone Number", required:true},
				{kind: "lumberjack.Input", name:"cellPhoneNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"tel", label:"Cell Phone Number", required:true},
				{kind: "lumberjack.Input", name:"faxNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"tel", label:"Fax Number", required:true}
			]},
			{style: "width: 50%; padding-left: 5px;", components: [
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{name: "emailAddressInput", kind: "lumberjack.Input", columnStyle:"", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 275px;", type:"email", label:"Primary Email", required:true},
					{name: "emailAddressInputCopyButton", kind: "lumberjack.Button", enabledClasses: "toolbar-button", style: "margin-left: 110px;  width: 30px; height: 30px; padding: 0px 0px 0px 0px;", target: "emailAddressInput", components: [
						{kind: "enyo.Image", src: "assets/icons/copy-clipboard-icon.png", style: "width: 14px; height: 14px;"}
					], ontap: "handleCopyToClipboardButtonTapped"}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{name: "secondaryEmailAddressInput", kind: "lumberjack.Input", columnStyle:"", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 275px;", type:"email", label:"Secondary Email", required:false},
					{name: "secondaryEmailAddressInputCopyButton",kind: "lumberjack.Button", enabledClasses: "toolbar-button", style: "margin-left: 110px; width: 30px; height: 30px; padding: 0px 0px 0px 0px;", target: "secondaryEmailAddressInput", components: [
						{kind: "enyo.Image", src: "assets/icons/copy-clipboard-icon.png", style: "width: 14px; height: 14px;"}
					], ontap: "handleCopyToClipboardButtonTapped"}
				]},
				{kind:"lumberjack.Checkbox", name:"emailContactCheckbox", content:"Receive correspondence by email instead of postal mail.", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;"}
			]}
		]}
	],

	bindings: [
		{from: ".activeEntry.phoneNumber", to: ".$.phoneNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.businessPhoneNumber", to: ".$.businessPhoneNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.cellPhoneNumber", to: ".$.cellPhoneNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.faxNumber", to: ".$.faxNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.emailAddress", to: ".$.emailAddressInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.secondaryEmailAddress", to: ".$.secondaryEmailAddressInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".$.secondaryEmailAddressInput.value", to: ".$.secondaryEmailAddressInputCopyButton.showing", transform: function(v) {
			try
			{
				if (v != null && v !== "") { return true; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".activeEntry.emailOnly", to: ".$.emailContactCheckbox.checked", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return false; }
		}}
	],

	updateActiveEntry: function()
	{
		if(typeof this.get("activeEntry").raw === "function")
		{
			this.get("activeEntry").set("phoneNumber", this.$.phoneNumberInput.get("value"));
			this.get("activeEntry").set("businessPhoneNumber", this.$.businessPhoneNumberInput.get("value"));
			this.get("activeEntry").set("cellPhoneNumber", this.$.cellPhoneNumberInput.get("value"));
			this.get("activeEntry").set("faxNumber", this.$.faxNumberInput.get("value"));
			this.get("activeEntry").set("emailAddress", this.$.emailAddressInput.get("value"));
			this.get("activeEntry").set("secondaryEmailAddress", this.$.secondaryEmailAddressInput.get("value"));
			this.get("activeEntry").set("emailOnly", this.$.emailContactCheckbox.get("checked"));
		}
		else
		{
			this.get("activeEntry").phoneNumber = this.$.phoneNumberInput.get("value");
			this.get("activeEntry").businessPhoneNumber = this.$.businessPhoneNumberInput.get("value");
			this.get("activeEntry").cellPhoneNumber = this.$.cellPhoneNumberInput.get("value");
			this.get("activeEntry").faxNumber = this.$.faxNumberInput.get("value");
			this.get("activeEntry").emailAddress = this.$.emailAddressInput.get("value");
			this.get("activeEntry").secondaryEmailAddress = this.$.secondaryEmailAddressInput.get("value");
			this.get("activeEntry").emailOnly = this.$.emailContactCheckbox.get("checked");
		}
	},

	isDirty: function()
	{	
		if(typeof this.get("activeEntry").raw === "function")
		{
			return(	this.get("activeEntry").get("phoneNumber") !== this.$.phoneNumberInput.get("value") ||
				this.get("activeEntry").get("businessPhoneNumber") !== this.$.businessPhoneNumberInput.get("value") ||
				this.get("activeEntry").get("cellPhoneNumber") !== this.$.cellPhoneNumberInput.get("value") ||
				this.get("activeEntry").get("faxNumber") !== this.$.faxNumberInput.get("value") ||
				this.get("activeEntry").get("emailAddress") !== this.$.emailAddressInput.get("value") ||
				this.get("activeEntry").get("secondaryEmailAddress") !== this.$.secondaryEmailAddressInput.get("value") ||
				this.get("activeEntry").get("emailOnly") !== this.$.emailContactCheckbox.get("checked")
			);
		}
		else
		{
			return(	this.get("activeEntry").phoneNumber !== this.$.phoneNumberInput.get("value") ||
				this.get("activeEntry").businessPhoneNumber !== this.$.businessPhoneNumberInput.get("value") ||
				this.get("activeEntry").cellPhoneNumber !== this.$.cellPhoneNumberInput.get("value") ||
				this.get("activeEntry").faxNumber !== this.$.faxNumberInput.get("value") ||
				this.get("activeEntry").emailAddress !== this.$.emailAddressInput.get("value") ||
				this.get("activeEntry").secondaryEmailAddress !== this.$.secondaryEmailAddressInput.get("value") ||
				this.get("activeEntry").emailOnly !== this.$.emailContactCheckbox.get("checked")
			);
		}
	},

	setDisabled: function(disabled)
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input" || this.$[key].kind === "lumberjack.Checkbox")
			{
				this.$[key].set("disabled",disabled);
			}
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
	},

	validate: function()
	{
		var isValid = true;
		// Primary Phone Number:
		if (!this.$.phoneNumberInput.validate()){isValid = false;}

		// Primary Email:
		if (!this.$.emailAddressInput.validate()){isValid = false;}

		// Secondary Email:
		if (!this.$.secondaryEmailAddressInput.validate()){isValid = false;}

		return isValid;
	},

	handleCopyToClipboardButtonTapped: function(inSender, inEvent)
	{
		var oldType = this.$[inSender.target].type;
		var oldDisabled = this.$[inSender.target].get("disabled");
		var clipboard = new ClipboardJS('.toolbar-button', {
			target: enyo.bind(this, function(trigger) {
				//Clipboard won't copy if type isn't set to text or textarea
				this.$[inSender.target].set("disabled", false);
				this.$[inSender.target].$.field.set("type","text");
				return this.$[inSender.target].$.field.hasNode();
			})
		});

		clipboard.on('success', enyo.bind(this, function(e) {
			alertify.success("Copied to Clipboard!");
			e.clearSelection();
			clipboard.destroy();
			this.$[inSender.target].$.field.set("type",oldType);
			this.$[inSender.target].set("disabled",oldDisabled)
		}));

		clipboard.on('error', function(e) {
			alertify.error("Failed to copy to clipboard");
			clipboard.destroy();
		});
	}
});