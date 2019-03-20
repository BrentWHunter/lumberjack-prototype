enyo.kind({
	name: "lumberjack.ColumnCheckbox",
	published:
	{
		disabled: false,
		groupName:"",
		content:"",
		checked:false,
		value:false
	},
	components:[
		{name:"columns", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{name: "checkDecorator", classes: "input-control checkbox", components: [
				{name:"checkLabel", tag: "label", components:[
					{name:"input", groupName:"", kind:"enyo.Checkbox"},
					{name:"checkBorder", tag: "span", classes: "check"}
				]}
			]},
			{name:"label", fit: true, style:"line-height: 18px; margin-left: 10px;", content:""}
		]}
	],
	bindings:[
		{from:".disabled", to:".$.input.disabled", oneWay: false},
		{from:".groupName", to:".$.input.groupName"},
		{from:".content", to:".$.label.content"},
		{from:".checked", to:".$.input.checked", oneWay: false},
		{from:".checked", to:".value"}
	],
	clearBorderError:function(){
		this.$.checkBorder.applyStyle("border", null);
	},
	setBorderError:function(){
		var borderError = "2px solid red";
		this.$.checkBorder.applyStyle("border", borderError);
	}
});