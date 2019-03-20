enyo.kind({
	name: "quantum.Checkbox",
	published:
	{
		disabled: false,
		columnStyle:"",
		labelStyle:"",
		decoratorStyle:"",
		inputStyle:"",
		contentStyle:"",
		content:"",
		checked:"false",
		value:"false"
	},
	components:[
		{name:"checkColumns", kind: "enyo.FittableColumns", components: [
			{name: "checkDecorator", classes: "input-control checkbox", components: [
				{name:"checkLabel", tag: "label", components:[
					{name: "checkBox", groupName: "", kind: "enyo.Checkbox"},
					{tag: "span", classes: "check"}, //This is here because otherwise the CSS breaks
					{tag:"span", name: "checkContent", content: ""}
				]}
			]}
		]}
	],
	bindings:[
		{from:".disabled", to:".$.checkBox.disabled", oneWay: false},
		{from:".columnStyle", to:".$.checkColumns.style"},
		{from:".labelStyle", to:".$.checkLabel.style"},
		{from:".decoratorStyle", to:".$.checkDecorator.style"},
		{from:".inputStyle", to:".$.checkBox.style"},
		{from:".contentStyle", to:".$.checkContent.style"},
		{from:".content", to:".$.checkContent.content"},
		{from:".checked", to:".$.checkBox.checked", oneWay: false},
		{from:".checked", to:".value"}
	],
	clearBorderError:function(){
		this.$.input.removeClass("error");
	},
	setBorderError:function(){
		this.$.input.addClass("error");
	}
});