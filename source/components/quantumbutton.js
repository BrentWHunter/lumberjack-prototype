enyo.kind({
	name: "quantum.Button",

	kind: 'enyo.ToolDecorator',

	tag: 'button',

	attributes: {
		type: 'button'
	},

	published: {
		disabled: false,
		enabledClasses: "button",
		disabledClasses: "button",
	},

	computed: {
		cssfix: ["disabled", "enabledClasses", "disabledClasses"]
	},

	components:[
	],

	bindings: [
		{from: ".cssfix", to: ".classes"},
	],

	cssfix: function()
	{
		if(this.disabled === false)
		{
			this.setAttribute('disabled', this.disabled);
			return this.enabledClasses;
		}
		else if(this.disabled === true)
		{
			this.setAttribute('disabled', this.disabled);
			return this.disabledClasses;
		}
	},

	create: enyo.inherit(function (sup) {
		return function() {
			sup.apply(this, arguments);
			this.setAttribute('disabled', this.disabled);
		};
	}),

	tap: function () {
		if (this.disabled) {
			// work around for platforms like Chrome on Android or Opera that send
			// mouseup to disabled form controls
			return true;
		} else {
			this.setActive(true);
		}
	}
});