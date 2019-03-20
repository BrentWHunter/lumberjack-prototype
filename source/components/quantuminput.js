enyo.kind({
	name: "quantum.Input",
	published:
	{
		disabled: false,
		value:"",
		type:"",
		inputMaxLength:120,
		columnStyle:"",
		labelStyle:"",
		decoratorStyle:"",
		inputStyle:"",
		label:"",
		placeholder: "",
		required:false,
		readonly:false
	},
	allowedTypes: ["text", "number", "int", "float", "tel", "email", "url"],
	previousInput:"",
	components:[
		{name:"columns", kind: "enyo.FittableColumns", components: [
			{name:"label", content: ""},
			{name:"decorator", classes:"input-control text", components: [
				{name: "field", kind: "enyo.Input", oninput:"fieldInput"}
			]}
		]}
	],
	bindings:[
		{from:".disabled", to:".$.field.disabled", oneWay: false},
		{from:".value", to:".$.field.value", oneWay: false, transform:function(v){return this.getCleanValue(v);}},
		{from:".columnStyle", to:".$.columns.style"},
		{from:".labelStyle", to:".$.label.style"},
		{from:".decoratorStyle", to:".$.decorator.style"},
		{from:".inputStyle", to:".$.field.style"},
		{from:".inputMaxLength", to:".$.field.attributes.maxlength"},
		{from:".label", to:".$.label.content"},
		{from:".type", to:".$.field.type", transform:function(v){
			if (v === "int")
			{
				this.$.field.onkeydown = "onKeyDown_int";
				return "text";
			}
			if (v === "float")
			{
				this.$.field.onkeydown = "onKeyDown_float";
				return "text";
			}
		}},
		{from:".placeholder", to:".$.field.placeholder"},
		{from:".readonly", to:".$.field.attributes.readonly"}
	],
	checkValue:function(val){
		var valid = false;

		switch(this.get("type")){
			case "text":
				valid = this.validateForText(val);
				break;
			case "number":
			case "int":
			case "float":
				valid = this.validateForNumber(val);
				break;
			case "tel":
				valid = this.validateForPhone(val);
				break;
			case "email":
				valid = this.validateForEmail(val);
				break;
			case "url":
				valid = this.validateForUrl(val);
				break;
			default:
				this.setBorderError();
				valid = false;
				break;
		}

		return valid;
	},
	fieldInput:function(inSender, inEvent){
		var val = inEvent.originator.value;

		//Triggers on-the-fly validation for URL, Email
		var valid = this.checkValue(val);

		if(this.get("type") === "number" && val.length > this.get("inputMaxLength")){
			this.$.field.set("value", val.slice(0, this.get("inputMaxLength")));
		}
	},
	validate:function(){
		var val = this.get("value");

		if(this.get("required")){
			if(!val){
				this.setBorderError();
				return false;
			}
		}
		else
		{
			if(!val)
			{
				this.clearBorderError();
				return true;
			}
		}

		var valid = this.checkValue(val);
		if(!valid){
			this.setBorderError();
		}
		return valid;
	},
	validateForText:function(val){
		return true;
	},
	validateForNumber:function(val){
		if(this.isNumeric(val)){
			return true;
		}else{
			return false;
		}
	},
	validateForPhone:function(val){
		return true;
	},
	validateForEmail:function(val){
		if(val === "" && this.get("required")){
			this.setBorderError();
			return false;
		}
		else if(val === "" && !this.get("required")){
			this.clearBorderError();
			return false;
		}

		var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z]{2,10})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		if (!val.match(emailRegEx))
		{
			this.setBorderError();
			return false;
		}else{
			this.clearBorderError();
			return true;
		}
	},
	validateForUrl:function(val){
		if(val === "" && this.get("required")){
			this.setBorderError();
			return false;
		}
		else if(val === "" && !this.get("required")){
			this.clearBorderError();
			return true;
		}

		var urlRegEx = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
		if (!val.match(urlRegEx))
		{
			this.setBorderError();
			return false;
		}else{
			this.clearBorderError();
			return true;
		}
	},
	clearBorderError:function(){
		this.$.decorator.removeClass("error");
	},
	setBorderError:function(){
		this.$.decorator.addClass("error");
	},
	getCleanValue:function(v){
		if(v && typeof v === "string"){
			return v.replace(/\s+/g,' ').trim();
		}else{
			return v;
		}
	},
	isNumeric:function(n) {
		var v = numeral(n).value();
		return typeof(v) === 'number' && isFinite(v);
	},
	onKeyDown_int:function(inSender, inEvent){
		//8 = Backspace, 9 = Tab, 37-40 = Arrow Keys, 46 = Delete, 48-57 = Numbers, 96-105 = Numpad Numbers
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if (inEvent.shiftKey || validEntries.indexOf(inEvent.keyCode) === -1)
		{
			inEvent.preventDefault();
			return true;
		}
	},
	onKeyDown_float:function(inSender, inEvent){
		//8 = Backspace, 9 = Tab, 37-40 = Arrow Keys, 46 = Delete, 110 + 190 = Period, 48-57 = Numbers, 96-105 = Numpad Numbers
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 110, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if (inEvent.keyCode === 110 || inEvent.keyCode === 190)
		{
			var value = inEvent.originator.value;
			if (value == null) { value = ""; }
			if (typeof(value) !== 'string') { value = value.toString(); }

			if (value.indexOf(".") !== -1)
			{
				inEvent.preventDefault();
				return true;
			}
		}

		if (inEvent.shiftKey || validEntries.indexOf(inEvent.keyCode) === -1)
		{
			inEvent.preventDefault();
			return true;
		}
	}
});