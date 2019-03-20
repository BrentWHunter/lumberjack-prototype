enyo.kind({
	name: "quantum.ProxyInfoPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		proxyInfo: null,
		database: null
	},

	events: {
		onGoHome: "",
		onLogout: ""
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Proxy Information"},
			{fit: true}
		]},
		{kind: "quantum.Input", name:"proxyNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Proxy Name", disabled:true},
		{kind: "quantum.Input", name:"proxyStatusInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Proxy Status", disabled:true},
		{kind: "quantum.Input", name:"companyContactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Company Contact Person", disabled:true},
		{kind: "quantum.Input", name:"companyContactPersonEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Company Contact Person Email", disabled:true},
		{kind: "quantum.Input", name:"meetingDateTimeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Meeting Date/Time", disabled:true},
		{kind: "quantum.Input", name:"meetingLocationInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Meeting Location", disabled:true},
		{kind: "quantum.Input", name:"proxyStartDateInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Proxy Start Date", disabled:true},
		{kind: "quantum.Input", name:"proxyEndDateInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 220px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Proxy End Date", disabled:true},
		{name: "proxyQuestionsSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Proxy Questions"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "#", style: "width: 50px;"},
				{content: "Question", style: "width: 600px;"},
				{content: "Question Type", style: "width: 150px; text-align: center;"},
				{content: "Management Recommendation", style: "width: 150px; text-align: center;"}
			]},
			{name: "proxyQuestionsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupProxyQuestionRepeaterItem", components: [
				{name: 'questionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "questionNumber", style: "width: 50px;"},
					{name: "question", style: "width: 600px; padding-right: 15px;"},
					{name: "questionType", style: "width: 150px; text-align: center;"},
					{name: "managementRecommendation", style: "width: 150px; text-align: center;"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Proxy Documents"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Document Name", style: "width: 300px;"},
					{content: "Download Existing", style: "width: 150px;"}
				]},
				{name: "informationCircularDocumentItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{style: "width: 300px; line-height: 34px;", components: [
						{content: "Information Circular"}
					]},
					{style: "width: 150px; line-height: 34px;", components: [
						{name: "downloadInformationCircularDocumentButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadInformationCircularButtonTapped"}
					]}
				]},
				{name: "proxyFormDocumentItem", style: "background-color: lightgrey; border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{style: "width: 300px; line-height: 34px;", components: [
						{content: "Proxy Form"}
					]},
					{style: "width: 150px; line-height: 34px;", components: [
						{name: "downloadProxyFormDocumentButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadProxyFormButtonTapped"}
					]}
				]}
			]}
		]},

		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".proxyInfo", to: ".$.proxyNameInput.value", transform: function(v) {
			try
			{
				var data = v.proxyName;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.proxyStatusInput.value", transform: function(v) {
			try
			{
				var data = v.status;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.companyContactPersonInput.value", transform: function(v) {
			try
			{
				var data = v.companyContactPerson;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.companyContactPersonEmailInput.value", transform: function(v) {
			try
			{
				var data = v.companyContactPersonEmail;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.meetingDateTimeInput.value", transform: function(v) {
			try
			{
				var data = v.meetingDateTime;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.meetingLocationInput.value", transform: function(v) {
			try
			{
				var data = v.meetingLocation;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.proxyStartDateInput.value", transform: function(v) {
			try
			{
				var data = v.startDate;
				if (data != null) { return moment(data).format("MMMM Do, YYYY"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.proxyEndDateInput.value", transform: function(v) {
			try
			{
				var data = v.endDate;
				if (data != null) { return moment(data).format("MMMM Do, YYYY"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".proxyInfo", to: ".$.downloadInformationCircularDocumentButton.disabled", transform: function(v) {
			try
			{
				var data = v._attachments[v.informationCircularFilename];
				if (data != null && data !== "") {
					return false;
				}
				else { throw null; }
			}
			catch (err) {
				return true;
			}
		}},
		{from: ".proxyInfo", to: ".$.downloadProxyFormDocumentButton.disabled", transform: function(v) {
			try
			{
				var data = v._attachments[v.proxyFormFilename];
				if (data != null && data !== "") {
					return false;
				}
				else { throw null; }
			}
			catch (err) {
				return true;
			}
		}}
	],

	clearBorderError: function()
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "quantum.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	activate: function()
	{
		if (!quantum.hasRole(["admins"], "proxy")) { this.doGoHome(); return; }

		this.clearBorderError();

		this.set("proxyInfo", null);
		this.set("proxyInfo", quantum.preferences.get("proxyInfo"));
		//console.log(this.get("placementInfo"));

		this.$.proxyQuestionsRepeater.setCount(quantum.preferences.get("proxyInfo").questions.length);
	},

	/******************
	* Button Handlers *
	******************/

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	/**************************
	* Proxy Questions Section *
	**************************/

	setupProxyQuestionRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "proxy")) { return; }

		if (!inEvent.item) {return true;}
	
		var questions = quantum.preferences.get("proxyInfo").questions;
		inEvent.item.$.questionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.questionNumber.set("content", inEvent.index + 1 + ".");
		inEvent.item.$.question.set("content", questions[inEvent.index].questionText);
		inEvent.item.$.questionType.set("content", questions[inEvent.index].type);
		if (questions[inEvent.index].type === "boolean")
		{
			inEvent.item.$.managementRecommendation.set("content", questions[inEvent.index].defaultAnswer ? "For" : "Against");
		}
		else
		{
			inEvent.item.$.managementRecommendation.set("content", questions[inEvent.index].defaultAnswer);
		}

		return true;
	},

	/*******************************
	* Payment Instructions Section *
	********************************/

	downloadInformationCircularButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Downloading");
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response)
		{
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.$.loadingPopup.hide();
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}
			this.get("database").getAttachment("settings", this.get("proxyInfo").informationCircularFilename, enyo.bind(this, function(err, response)
			{
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}
				this.$.loadingPopup.hide();
				saveAs(response, this.get("proxyInfo").informationCircularFilename);
			}));
		}));
	},

	downloadProxyFormButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Downloading");
		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response)
		{
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.$.loadingPopup.hide();
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}
			this.get("database").getAttachment("settings", this.get("proxyInfo").proxyFormFilename, enyo.bind(this, function(err, response)
			{
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}
				this.$.loadingPopup.hide();
				saveAs(response, this.get("proxyInfo").proxyFormFilename);
			}));
		}));
	}
});