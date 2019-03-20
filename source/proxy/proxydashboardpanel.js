enyo.kind({
	name: "quantum.ProxyDashboardPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		database: null,
		proxyCollection: null,
		outstandingProxyCollection: null,
		completedProxyCollection: null,
		buildingReport: false,
		populatingCollection: false,
		populatingQuestions: false
	},

	events: {
		onViewItemDetail: "",
		onGoHome: ""
	},

	computed: {
		shouldShowLoadingPopup: ["buildingReport", "populatingCollection", "populatingQuestions"]
	},

	_totalShares: 0,
	_sharesVoted: 0,
	_numShareholders: 0,
	_numShareholdersVoted: 0,
	_questions: null,

	components: [
		{kind: "enyo.FittableColumns", components: [
			{kind: "enyo.FittableRows", components: [
				{kind: "enyo.FittableRows", style: "border: 1px solid black; padding: 10px; width: 350px;", components: [
					{style: "font-weight: bold;", content: "Voting Stats"},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Number of Shares:", style: "width: 200px;"},
						{name: "numSharesLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Shares Voted:", style: "width: 200px;"},
						{name: "votedSharesLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Required for Quorum:", style: "width: 200px;"},
						{name: "requiredForQuorumLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Shares Remaining:", style: "width: 200px;"},
						{name: "sharesRemainingLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 15px;", kind: "enyo.FittableColumns", components: [
						{content: "Proxies Sent:", style: "width: 200px;"},
						{name: "proxiesSentLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Proxies Returned:", style: "width: 200px;"},
						{name: "proxiesReturnedLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Proxies Outstanding:", style: "width: 200px;"},
						{name: "proxiesOutstandingLabel", fit: true, style: "text-align: right;"}
					]}
				]}
			]},
			{fit: true, style: "text-align: center;", components: [
				{name: "proxiesBreakdownChart", style: "display: inline-block;"}
			]},
			{name: "outstandingProxiesSection", components: [
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Top Outstanding Proxies"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Shareholder Name", style: "width: 200px;"},
					{content: "Shareholder Email", style: "width: 250px;"},
					{content: "Outstanding Shares", style: "width: 135px;"}
				]},
				{name: "outstandingProxiesRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupOutstandingProxyRepeaterItem", components: [
					{name: 'outstandingProxyItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, ontap: "handleOutstandingProxyItemTapped", layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "shareholderName", style: "width: 200px;"},
						{name: "shareholderEmail", style: "width: 250px;"},
						{name: "outstandingShares", style: "width: 135px; text-align: right;"}
					]}
				]}
			]}
		]},
		{name: "proxyQuestionsSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Breakdown by Question"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "#", style: "width: 50px;"},
				{content: "Question", style: "width: 600px;"},
				{content: "Management Recommendation", style: "width: 150px; text-align: center;"},
				{content: "Current Status", style: "width: 150px; margin-left: 10px; text-align: center;"},
				{content: "Shares For", style: "width: 100px; text-align: right;"},
				{content: "Shares Against", style: "width: 120px; text-align: right;"},
				{content: "Shares Abstaining/ Withholding", style: "width: 140px; text-align: right;"}
			]},
			{name: "proxyQuestionsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupProxyQuestionRepeaterItem", components: [
				{name: 'questionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "questionNumber", style: "width: 50px;"},
					{name: "question", style: "width: 600px; padding-right: 15px;"},
					{name: "managementRecommendation", style: "width: 150px; text-align: center;"},
					{name: "currentStatus", style: "width: 150px; margin-left: 10px; text-align: center;"},
					{name: "sharesFor", style: "width: 100px; text-align: right;"},
					{name: "sharesAgainst", style: "width: 120px; text-align: right;"},
					{name: "sharesAbstaining", style: "width: 140px; text-align: right;"}
					
				]}
			]}
		]},
		{name: "completedProxiesSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Proxy Detail"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Shareholder Name", style: "width: 200px;"},
				{content: "Email Address", style: "width: 250px;"},
				{content: "Number of Shares", style: "width: 135px;"},
				{name: "proxyQuestionsHeaderContainer", kind: "enyo.FittableColumns"}
			]},
			{name: "completedProxiesRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupCompletedProxyRepeaterItem", components: [
				{name: 'completedProxyItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", ontap: "handleCompletedProxyItemTapped", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "shareholderName", style: "width: 200px;"},
					{name: "emailAddress", style: "width: 250px;"},
					{name: "numShares", style: "width: 135px; text-align: right; padding-right: 10px;"}
				]}
			]},
			{name: "noResultsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Results"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".shouldShowLoadingPopup", to: ".$.loadingPopup.showing"}
	],

	setShowingForRoles: function()
	{
		//Nothing to do here.
	},

	activate: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "proxy")) { this.doGoHome(); return; }

		this._totalShares = 0;
		this._sharesVoted = 0;
		this._numShareholders = 0;
		this._numShareholdersVoted = 0;
		this._questions = [];

		this.setShowingForRoles();

		quantum.preferences.get("proxyInfo").questions.forEach(enyo.bind(this, function(value, index, array){
			this._questions.push({
				id: value.id,
				type: value.type,
				sharesFor: 0,
				sharesAgainst: 0,
				sharesAbstaining: 0,
				questionText: value.questionText,
				defaultAnswer: value.defaultAnswer,
				passPercentage: value.passPercentage || 0.5
			});
		}));
		
		this.filterProxies(); //Do this first, so that we have the proper filtered collections to run question data against.

		this.$.proxyQuestionsHeaderContainer.destroyClientControls();
		this.$.proxyQuestionsRepeater.setCount(this._questions.length);
		this.$.proxyQuestionsHeaderContainer.render();

		this.buildReport();
	},

	shouldShowLoadingPopup: function(){
		return this.get("buildingReport") || this.get("populatingCollection") || this.get("populatingQuestions");
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	filterProxies: function(){
		//Do this all in one pass, because why not.
		var outstandingProxies = [];
		var completedProxies = [];
		this.proxyCollection.forEach(enyo.bind(this, function(value, index, array){
			var sharesAvailable = numeral(value.get("numShares")).value();
			this._totalShares += sharesAvailable;
			this._numShareholders++;

			if (value.get("proxyDoc").signed)
			{
				completedProxies.push(value);

				this._sharesVoted += sharesAvailable;
				this._numShareholdersVoted++;
				
				value.get("questions").forEach(enyo.bind(this, function(value, index, array){
					if (value.questionID !== this._questions[index].id)
					{
						//PANIC! Don't stop though.
						alertify.error("Bad Question ID Match. Report Data is unreliable.");
					}

					if (this._questions[index].type === "string")
					{
						//String fields are always going to assume that they go towards the "for" total
						this._questions[index].sharesFor += sharesAvailable;
					}
					else if (this._questions[index].type === "boolean")
					{
						if (value.answer) {
							this._questions[index].sharesFor += sharesAvailable;
						}
						else {
							this._questions[index].sharesAgainst += sharesAvailable;
						}
					}
					else if (this._questions[index].type === "director")
					{
						if (value.answer.toLowerCase() === "for") {
							this._questions[index].sharesFor += sharesAvailable;
						}
						else {
							this._questions[index].sharesAbstaining += sharesAvailable;
						}
					}
					else if (this._questions[index].type === "majority")
					{
						if (value.answer.toLowerCase() === "for") {
							this._questions[index].sharesFor += sharesAvailable;
						}
						else if (value.answer.toLowerCase() === "against")
						{
							this._questions[index].sharesAgainst += sharesAvailable;
						}
						else {
							this._questions[index].sharesAbstaining += sharesAvailable;
						}
					}
				}));
			}
			else
			{
				outstandingProxies.push(value);
			}
		}));

		outstandingProxies.sort(function(a, b){
			return b.get("numShares") - a.get("numShares");
		});

		this.set("outstandingProxyCollection", new enyo.Collection(outstandingProxies));
		this.set("completedProxyCollection", new enyo.Collection(completedProxies));

		//Don't need to sort completedProxies, since it should already be in alpha order from the initial sort.

		this.$.outstandingProxiesSection.set("showing", outstandingProxies.length > 0);
		this.$.outstandingProxiesRepeater.setCount(outstandingProxies.length < 10 ? outstandingProxies.length : 10);

		this.$.completedProxiesSection.set("showing", completedProxies.length > 0);
		this.$.completedProxiesRepeater.setCount(completedProxies.length);
	},

	/*****************
	* Report Section
	*****************/

	buildReport: function(inSender, inEvent)
	{
		this.set("buildingReport", true);

		//Set Total Subscription Stats
		this.$.numSharesLabel.set("content", numeral(this._totalShares).format("0,0"));
		this.$.votedSharesLabel.set("content", numeral(this._sharesVoted).format("0,0"));
		this.$.requiredForQuorumLabel.set("content", numeral((this._totalShares/2) + 1).format("0,0"));
		this.$.sharesRemainingLabel.set("content", numeral(this._totalShares - this._sharesVoted).format("0,0"));
		this.$.proxiesSentLabel.set("content", numeral(this._numShareholders).format("0,0"));
		this.$.proxiesReturnedLabel.set("content", numeral(this._numShareholdersVoted).format("0,0"));
		this.$.proxiesOutstandingLabel.set("content", numeral(this._numShareholders - this._numShareholdersVoted).format("0,0"));

		try
		{
			// Create the data table.
			var fundsData = new google.visualization.DataTable();
			fundsData.addColumn('string', 'Category');
			fundsData.addColumn('number', 'Shares Voted');
			fundsData.addRows([
				['Shares Voted', this._sharesVoted],
				['Shares Remaining', this._totalShares - this._sharesVoted]
			]);

			// Set chart options
			var options = {
				'title': 'Shares Voted',
				'width': 350,
				'height': 350
			};

			// Instantiate and draw our chart, passing in some options.
			var fundsChart = new google.visualization.PieChart(document.getElementById(this.$.proxiesBreakdownChart.id));
			fundsChart.draw(fundsData, options);
		}
		catch (err) { console.log('Error building "Funds" chart!', err); }

		this.set("buildingReport", false);
	},

	/*****************
	* Completed Repeater Section
	*****************/

	setupCompletedProxyRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		var proxy = this.get("completedProxyCollection").at(inEvent.index);

		inEvent.item.$.completedProxyItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.shareholderName.set("content", proxy.get("contactName"));
		inEvent.item.$.emailAddress.set("content", proxy.get("email"));
		inEvent.item.$.numShares.set("content", numeral(proxy.get("numShares")).format("0,0"));
		
		//These are expected to be in order, as delivered by the proxy module.
		proxy.get("questions").forEach(enyo.bind(this, function(value, index, array){
			var columnItem = inEvent.item.$.completedProxyItem.createComponent({style: "width: 75px; text-align: center;"}, {owner: inEvent.item});
			var question = this._questions[index];

			if (value.questionID !== question.id)
			{
				//PANIC! Don't stop though.
				alertify.error("Bad Question ID Match. Report Data is unreliable.");
			}

			if (question.type === "boolean"){
				columnItem.set("content", value.answer ? "✓" : "X");
				columnItem.applyStyle("color", value.answer ? "green" : "red");
			}
			else if (question.type === "director"){
				columnItem.set("content", value.answer.toLowerCase() === "for" ? "✓" : "O");
				columnItem.applyStyle("color", value.answer.toLowerCase() === "for" ? "green" : "black");
			}
			else if (question.type === "majority"){
				if (value.answer.toLowerCase() === "for")
				{
					columnItem.set("content", "✓");
					columnItem.applyStyle("color", "green");
				}
				else if (value.answer.toLowerCase() === "against")
				{
					columnItem.set("content", "X");
					columnItem.applyStyle("color", "red");
				}
				else if (value.answer.toLowerCase() === "abstain")
				{
					columnItem.set("content", "O");
					columnItem.applyStyle("color", "black");
				}
			}
			else
			{
				columnItem.set("content", value.answer);
			}
		}));

		return true;
	},

	handleCompletedProxyItemTapped: function(inSender, inEvent) {
		this.doViewItemDetail({collection: this.get("completedProxyCollection"), item: this.get("completedProxyCollection").at(inEvent.index)});
	},

	/*****************
	* Proxy Questions Repeater Section
	*****************/

	setupProxyQuestionRepeaterItem: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins", "users", "auditors"], "proxy")) { return; }

		if (!inEvent.item) {return true;}
		//Cheat, since we need to run this operation as part of setting up the header anyways.
		this.$.proxyQuestionsHeaderContainer.createComponent({content: "Q" + (inEvent.index + 1), style: "width: 75px; text-align: center;"}, {owner: this.$.proxyQuestionsHeaderContainer});
		
		// var questions = quantum.preferences.get("proxyInfo").questions;
		var questions = this._questions;
		inEvent.item.$.questionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.questionNumber.set("content", inEvent.index + 1 + ".");
		inEvent.item.$.question.set("content", questions[inEvent.index].questionText);

		if (questions[inEvent.index].type === "boolean")
		{
			inEvent.item.$.managementRecommendation.set("content", questions[inEvent.index].defaultAnswer ? "For" : "Against");
		}
		else
		{
			inEvent.item.$.managementRecommendation.set("content", questions[inEvent.index].defaultAnswer);
		}
		
		if (questions[inEvent.index].type === "boolean")
		{
			inEvent.item.$.sharesFor.set("content", numeral(questions[inEvent.index].sharesFor).format("0,0"));
			inEvent.item.$.sharesAgainst.set("content", numeral(questions[inEvent.index].sharesAgainst).format("0,0"));
			inEvent.item.$.sharesAbstaining.set("content", "N/A");
		}
		else if (questions[inEvent.index].type === "director")
		{
			inEvent.item.$.sharesFor.set("content", numeral(questions[inEvent.index].sharesFor).format("0,0"));
			inEvent.item.$.sharesAgainst.set("content", "N/A");
			inEvent.item.$.sharesAbstaining.set("content", numeral(questions[inEvent.index].sharesAbstaining).format("0,0"));
		}
		else if (questions[inEvent.index].type === "majority")
		{
			inEvent.item.$.sharesFor.set("content", numeral(questions[inEvent.index].sharesFor).format("0,0"));
			inEvent.item.$.sharesAgainst.set("content", numeral(questions[inEvent.index].sharesAgainst).format("0,0"));
			inEvent.item.$.sharesAbstaining.set("content", numeral(questions[inEvent.index].sharesAbstaining).format("0,0"));
		}
		else
		{
			inEvent.item.$.sharesFor.set("content", "N/A");
			inEvent.item.$.sharesAgainst.set("content", "N/A");
			inEvent.item.$.sharesAbstaining.set("content", "N/A");
		}

		//Calculate Status
		var status;
		var color;

		if (this._sharesVoted < Math.floor(this._totalShares * questions[inEvent.index].passPercentage) + 1)
		{
			status = "Quorum Not Met";
			color = "black";
		}
		else if (this._questions[inEvent.index].sharesFor > this._questions[inEvent.index].sharesAgainst)
		{
			status = "Passing";
			color = "green";
		}
		else
		{
			status = "Failing";
			color = "red";
		}

		inEvent.item.$.currentStatus.set("content", status);
		inEvent.item.$.currentStatus.applyStyle("color", color);

		return true;
	},

	/*****************
	* Outstanding Proxies Repeater Section
	*****************/

	setupOutstandingProxyRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.outstandingProxyItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.shareholderName.set("content",  this.get("outstandingProxyCollection").at(inEvent.index).get("contactName"));
		inEvent.item.$.shareholderEmail.set("content", this.get("outstandingProxyCollection").at(inEvent.index).get("email"));
		inEvent.item.$.outstandingShares.set("content", numeral(this.get("outstandingProxyCollection").at(inEvent.index).get("numShares")).format("0,0"));
		return true;
	},

	handleOutstandingProxyItemTapped: function(inSender, inEvent) {
		this.doViewItemDetail({collection: this.get("outstandingProxyCollection"), item: this.get("outstandingProxyCollection").at(inEvent.index)});
	}
});