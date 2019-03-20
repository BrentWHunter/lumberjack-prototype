enyo.kind({
	name: "quantum.CanadaT",

	published:
	{
		tempCanadaTs: null,
		canadaTs: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; max-width: 970px; padding: 10px;",

	_validated: true,

	_tooltipPickerItemTemplate: {
		handlers: {
			onmouseover: "tooltipshow",
			onmouseout: "tooltiphide"
		},	
		tooltipshow: function (s, e) {
			if (!this.$.tooltipInfo) {
				this.startJob("tooltipjob", enyo.bindSafely(this, function (e) {
					var tooltipComponents = [{
						classes:"tooltip-popup",
						content: e.originator.tooltip
					}];

					if (this && this.$ && !this.$.tooltipInfo) {
						this.createComponent({
							name: "tooltipInfo",
							kind: "enyo.Popup",
							floating: true,
							scrim: false,
							allowHtml: true,
							classes: "tooltip",
							style: "padding: 5px; background-color: white; max-width: 800px; border: 1px solid black; box-shadow: 1px 1px;",
							components: tooltipComponents
						});
						this.$.tooltipInfo.showAtEvent(e);
					}

					tooltipComponents = e = null;

				}, e), 500);
			}
		},
		tooltiphide: function (s, e) {
			if (e.toElement.getAttribute("class") !== "tooltip-popup") //Low tech test so that we don't hide the tooltip if the mouse is over the tooltip.
			{
				if (this.$.tooltipInfo) {
					this.$.tooltipInfo.destroy();
				}
				
				this.stopJob("tooltipjob");
			}
		}
	},

	_individualAccreditedInvestorQualifications: [
		{value: "canadaD", content: "Paragraph D", tooltip: "except in Ontario, a person registered under the securities legislation of a jurisdiction of Canada as an adviser or dealer."},
		{value: "canadaD1", content: "Paragraph D.1", tooltip: "in Ontario, a person or company registered under the securities legislation of a province or territory of Canada as an adviser or dealer, except as otherwise prescribed by the regulations."},
		{value: "canadaE", content: "Paragraph E", tooltip: "an individual registered under the securities legislation of a jurisdiction of Canada as a representative of a person referred to in paragraph (d)."},
		{value: "canadaE1", content: "Paragraph E.1", tooltip: "an individual formerly registered under the securities legislation of a jurisdiction of Canada, other than an individual formerly registered solely as a representative of a limited market dealer under one or both of the Securities Act (Ontario) or the Securities Act (Newfoundland and Labrador)."},
		{value: "canadaJ", content: "Paragraph J", tooltip: "an individual who, either alone or with a spouse, beneficially owns financial assets having an aggregate realizable value that, before taxes, but net of any related liabilities, exceeds $1,000,000."},
		{value: "canadaJ1", content: "Paragraph J.1", tooltip: "an individual who beneficially owns financial assets having an aggregate realizable value that, before taxes but net of any related liabilities, exceeds $5,000,000."},
		{value: "canadaK", content: "Paragraph K", tooltip: "an individual whose net income before taxes exceeded $200,000 in each of the two most recent calendar years and who reasonably expects to exceed that net income level in the current calendar year."},
		{value: "canadaK1", content: "Paragraph K.1", tooltip: "an individual whose net income before taxes combined with that of a spouse exceeded $300,000 in each of the two most recent calendar years and who reasonably expects to exceed that net income level in the current calendar year."},
		{value: "canadaL", content: "Paragraph L", tooltip: "an individual who, either alone or with a spouse, has net assets of at least $5,000,000."},
		{value: "canadaQ", content: "Paragraph Q", tooltip: "a person acting on behalf of a fully managed account managed by that person, if that person is registered or authorized to carry on business as an adviser or the equivalent under the securities legislation of a jurisdiction of Canada or a foreign jurisdiction."},
		{value: "canadaV", content: "Paragraph V", tooltip: "a person that is recognized or designated by the securities regulatory authority or, except in Ontario and Quebec, the regulator as an accredited investor."},
		{value: "canadaV1", content: "Paragraph V.1", tooltip: "in Ontario, a person or company that is recognized or designated by the Commission as an accredited investor."}
	],
	_corporateAccreditedInvestorQualifications: [
		{value: "canadaA", content: "Paragraph A", tooltip: "except in Ontario, a Canadian financial institution or an authorized foreign bank listed in Schedule III of the Bank Act (Canada)."},
		{value: "canadaA1", content: "Paragraph A.1", tooltip: "in Ontario, a financial institution described in paragraph 1, 2 or 3 of subsection 73.1 (1) of the Securities Act (Ontario)."},
		{value: "canadaB", content: "Paragraph B", tooltip: "except in Ontario, the Business Development Bank of Canada incorporated under the Business Development Bank of Canada Act (Canada)."},
		{value: "canadaB1", content: "Paragraph B.1", tooltip: "in Ontario, the Business Development Bank of Canada."},
		{value: "canadaC", content: "Paragraph C", tooltip: "except in Ontario, a subsidiary of any person referred to in paragraph (a) or (b), if the person owns all of the voting securities of the subsidiary, except the voting securities required by law to be owned by directors of that subsidiary."},
		{value: "canadaC1", content: "Paragraph C.1", tooltip: "in Ontario, a subsidiary of any person or company referred to in clause (a.1) or (b.1), if the person or company owns all of the voting securities of the subsidiary, except the voting securities required by law to be owned by directors of that subsidiary."},
		{value: "canadaD", content: "Paragraph D", tooltip: "except in Ontario, a person registered under the securities legislation of a jurisdiction of Canada as an adviser or dealer."},
		{value: "canadaD1", content: "Paragraph D.1", tooltip: "in Ontario, a person or company registered under the securities legislation of a province or territory of Canada as an adviser or dealer, except as otherwise prescribed by the regulations."},
		{value: "canadaF", content: "Paragraph F", tooltip: "except in Ontario, the Government of Canada or a jurisdiction of Canada, or any crown corporation, agency or wholly-owned entity of the Government of Canada or a jurisdiction of Canada."},
		{value: "canadaF1", content: "Paragraph F.1", tooltip: "in Ontario, the Government of Canada, the government of a province or territory of Canada, or any Crown corporation, agency or wholly owned entity of the Government of Canada or of the government of a province or territory of Canada."},
		{value: "canadaG", content: "Paragraph G", tooltip: "a municipality, public board or commission in Canada and a metropolitan community, school board, the Comité de gestion de la taxe scolaire de l’île de Montréal or an intermunicipal management board in Québec."},
		{value: "canadaH", content: "Paragraph H", tooltip: "any national, federal, state, provincial, territorial or municipal government of or in any foreign jurisdiction, or any agency of that government."},
		{value: "canadaI", content: "Paragraph I", tooltip: "except in Ontario, a pension fund that is regulated by the Office of the Superintendent of Financial Institutions (Canada) or a pension commission or similar regulatory authority of a jurisdiction of Canada."},
		{value: "canadaI1", content: "Paragraph I.1", tooltip: "in Ontario, a pension fund that is regulated by either the Office of the Superintendent of Financial Institutions (Canada) or a pension commission or similar regulatory authority of a province or territory of Canada,"},
		{value: "canadaM", content: "Paragraph M", tooltip: "a person, other than an individual or investment fund, that has net assets of at least $5,000,000 as shown on its most recently prepared financial statements"},
		{value: "canadaN", content: "Paragraph N", tooltip: "an investment fund that distributes or has distributed its securities only to: (i) a person that is or was an accredited investor at the time of the distribution, (ii) a person that acquires or acquired securities in the circumstances referred to in sections 2.10 [Minimum amount investment] or 2.19 [Additional investment in investment funds] of NI 45-106, or (iii) a person described in paragraph (i) or (ii) immediately above that acquires or acquired securities under section 2.18 [Investment fund reinvestment] of NI 45-106."},
		{value: "canadaO", content: "Paragraph O", tooltip: "an investment fund that distributes or has distributed securities under a prospectus in a jurisdiction of Canada for which the regulator or, in Quebec, the securities regulatory authority, has issued a receipt."},
		{value: "canadaP", content: "Paragraph P", tooltip: "a trust company or trust corporation registered or authorized to carry on business under the Trust and Loan Companies Act (Canada) or under comparable legislation in a jurisdiction of Canada or a foreign jurisdiction, acting on behalf of a fully managed account managed by the trust company or trust corporation, as the case may be."},
		{value: "canadaQ", content: "Paragraph Q", tooltip: "a person acting on behalf of a fully managed account managed by that person, if that person is registered or authorized to carry on business as an adviser or the equivalent under the securities legislation of a jurisdiction of Canada or a foreign jurisdiction."},
		{value: "canadaR", content: "Paragraph R", tooltip: "a registered charity under the Income Tax Act (Canada) that, in regard to the trade, has obtained advice from an eligibility adviser or an adviser registered under the securities legislation of the jurisdiction of the registered charity to give advice on the securities being traded."},
		{value: "canadaS", content: "Paragraph S", tooltip: "an entity organized in a foreign jurisdiction that is analogous to any of the entities referred to in paragraphs (a) to (d) or paragraph (i) [and in Ontario, paragraphs (a.1) to (d.1) or paragraph (i.1)] in form and function."},
		{value: "canadaT", content: "Paragraph T", tooltip: "a person in respect of which all of the owners of interests, direct, indirect or beneficial, except the voting securities required by law to be owned by directors, are persons that are accredited investors."},
		{value: "canadaU", content: "Paragraph U", tooltip: "an investment fund that is advised by a person registered as an adviser or a person that is exempt from registration as an adviser."},
		{value: "canadaV", content: "Paragraph V", tooltip: "a person that is recognized or designated by the securities regulatory authority or, except in Ontario and Quebec, the regulator as an accredited investor."},
		{value: "canadaV1", content: "Paragraph V.1", tooltip: "a person that is recognized or designated by the securities regulatory authority or, except in Ontario and Quebec, the regulator as an accredited investor."},
		{value: "canadaW", content: "Paragraph W", tooltip: "a trust established by an accredited investor for the benefit of the accredited investor’s family members of which a majority of the trustees are accredited investors and all of the beneficiaries are the accredited investor’s spouse, a former spouse of the accredited investor or a parent, grandparent, brother, sister, child or grandchild of that accredited investor, of that accredited investor’s spouse or of that accredited investor’s former spouse."}
	],
	_detailQualifications: ["canadaD", "canadaD1", "canadaE", "canadaE1", "canadaI", "canadaI1", "canadaM", "canadaP", "canadaQ", "canadaR", "canadaS", "canadaT", "canadaU", "canadaW"],
	_activeIndex: -1,

	components:[
		{content: "Equity Owners", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 100%; text-align: center;"},
		{name: "noEquityOwnersItem", content: "No Equity Owners", style: "margin-top: 10px; width: 100%; text-align: center;"},
		{name: "equityOwnersRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 468px; margin-top: 10px;", onSetupItem: "setupEquityOwnerRepeaterItem", components: [
			{name: "equityOwnerItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "equityOwnerName", style: "width: 310px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteEquityOwnerButtonTapped"},
					{fit: true},
					{name: "collapseIcon", kind: "enyo.Image", src: "assets/icons/down-arrow.png", style: "cursor: pointer;", ontap: "collapseIconTapped"}
				]},
				{name: "equityOwnerDetailDrawer", kind: "enyo.Drawer", components: [
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Email Address:", style: "width: 150px;"},
						{name: "equityOwnerEmail", style: "width: 310px;"}
					]},
					{name: "equityOwnerContactPersonSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Contact Person:", style: "width: 150px;"},
						{name: "equityOwnerContactPerson", style: "width: 310px;"}
					]},
					{name: "equityOwnerContactPersonTitleSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Contact Person Title:", style: "width: 150px;"},
						{name: "equityOwnerContactPersonTitle", style: "width: 310px;"}
					]},
					{content: "Accredited Investor Qualifications", style: "font-size: 16px; font-weight: bold; width: 300px; text-align: center; margin-top: 15px;"},
					{name: "noQualificationsItem", content: "No Accredited Investor Qualifications", style: "margin-top: 10px; width: 300px; text-align: center;"},
					{name: "qualificationRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 395px; margin-top: 10px;", onSetupItem: "setupQualificationRepeaterItem", components: [
						{name: "qualificationItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
							{kind: "enyo.FittableColumns", components: [
								{name: "qualificationName", style: "width: 300px; line-height: 34px;"},
								{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px; margin-left: 5px;", content: "Delete", ontap: "deleteQualificationButtonTapped"}
							]},
							{name: "qualificationDetailSection"}
						]}
					]},				
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{kind: "onyx.PickerDecorator", style: "", components: [
							{name: "qualificationPickerButton", style: "width: 300px; padding: 4px 18px;"},
							{name: "qualificationPicker", kind: "onyx.Picker"}
						]},
						{name: "addQualificationButton", kind: "enyo.Button", classes: "button primary", style: "line-height: 30px; margin-left: 10px;", content: "Add Qualification", ontap: "addQualificationButtonTapped"}
					]}
				]}
			]}
		]},
		{kind: "quantum.Input", name:"addEquityOwnerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Equity Owner Name", required:true},
		{kind: "quantum.Input", name:"equityOwnerEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"email", label:"Email", required:true},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Owner Type", style: "line-height: 30px; width: 160px;"},
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "ownerTypePickerButton", style: "width: 300px; padding: 4px 18px;"},
				{name: "ownerTypePicker", kind: "onyx.Picker", onChange: "ownerTypePickerChanged", components: [
					{name: "individualOwnerTypePickerItem", value: "individual", content: "Individual/Joint", active: true},
					{name: "corporateOwnerTypePickerItem", value: "corporate", content: "Corporate/Trust/Other"}
				]}
			]}
		]},
		{kind: "quantum.Input", name:"equityOwnerContactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Contact Person", required:true},
		{kind: "quantum.Input", name:"equityOwnerContactPersonTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Contact Person Title", required:true},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{fit: true},
			{name: "addEquityOwnerButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Equity Owner"), style: "width: 175px; height: 30px; margin-right: 8px;", ontap: "addEquityOwnerButtonTapped"}
		]}
	],

	bindings:[
		{from: ".canadaTs", to: ".tempCanadaTs", transform: function(v){
			try
			{
				var tempArray = [];
				v.forEach(function(value, index, array){
					var tempVal = {
						entityName: value.entityName,
						type: value.type,
						contactPersonName: value.contactPersonName,
						contactPersonTitle: value.contactPersonTitle,
						emailAddress: value.emailAddress,
						accreditedInvestorQualification: [],
						accreditedInvestorQualificationDetail: {}
					};

					value.accreditedInvestorQualification.forEach(function(innerValue, innerIndex, innerArray){
						tempVal.accreditedInvestorQualification.push(innerValue);

						//We either rely on an array or a single object, so we know that it should be one or the other if we're loading it here.
						if (Array.isArray(value.accreditedInvestorQualificationDetail[innerValue]))
						{
							tempVal.accreditedInvestorQualificationDetail[innerValue] = [];
							value.accreditedInvestorQualificationDetail[innerValue].forEach(function(innerInnerValue, innerInnerIndex, innerInnerArray){
								tempVal.accreditedInvestorQualificationDetail[innerValue].push(Object.assign({}, innerInnerValue));
							});
						}
						else
						{
							tempVal.accreditedInvestorQualificationDetail[innerValue] = Object.assign({}, value.accreditedInvestorQualificationDetail[innerValue]);
						}
					});
					tempArray.push(tempVal);
				});

				return tempArray;
			}
			catch(err)
			{
				return [];
			}
		}},
		{from: ".disabled", to: ".$.addEquityOwnerNameInput.disabled"},
		{from: ".disabled", to: ".$.equityOwnerEmailInput.disabled"},
		{from: ".disabled", to: ".$.ownerTypePickerButton.disabled"},
		{from: ".disabled", to: ".$.equityOwnerContactPersonInput.disabled"},
		{from: ".disabled", to: ".$.equityOwnerContactPersonTitleInput.disabled"},
		{from: ".disabled", to: ".$.addEquityOwnerButton.disabled"},
		{from: ".$.ownerTypePicker.selected", to: ".$.equityOwnerContactPersonInput.showing", transform: function(v){return v.name === "corporateOwnerTypePickerItem";}},
		{from: ".$.ownerTypePicker.selected", to: ".$.equityOwnerContactPersonTitleInput.showing", transform: function(v){return v.name === "corporateOwnerTypePickerItem";}}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this._activeIndex = -1;
		this.$.noEquityOwnersItem.set("showing", this.get("tempCanadaTs").length === 0);
		this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
	},

	tempCanadaTsChanged: function(oldVal, newVal)
	{
		this.render();
	},

	ownerTypePickerChanged: function(){
		if (this.$.equityOwnerContactPersonInput) //This gets called before render, so we wait for the objects to exist.
		{
			this.$.equityOwnerContactPersonInput.set("value", "");
			this.$.equityOwnerContactPersonTitleInput.set("value", "");
		}
	},

	addEquityOwnerButtonTapped: function(inSender, inEvent)
	{
		this.$.addEquityOwnerNameInput.clearBorderError();
		this.$.equityOwnerContactPersonInput.clearBorderError();
		this.$.equityOwnerContactPersonTitleInput.clearBorderError();
		this.$.equityOwnerEmailInput.clearBorderError();

		var validated = true;

		//This chunk makes sure that the validation function always gets run, and that it doesn't effect the current value if validated true is returned.
		validated = this.$.addEquityOwnerNameInput.validate() ? validated : false;
		validated = this.$.equityOwnerEmailInput.validate() ? validated : false;

		if (this.$.ownerTypePicker.get("selected").value === "corporate")
		{
			validated = this.$.equityOwnerContactPersonInput.validate() ? validated : false;
			validated = this.$.equityOwnerContactPersonTitleInput.validate() ? validated : false;
		}

		if (validated && (this.get("tempCanadaTs").length === 0 || this.validate()))
		{
			this.get("tempCanadaTs").push({
				entityName: this.$.addEquityOwnerNameInput.get("value"),
				type: this.$.ownerTypePicker.get("selected").value,
				contactPersonName: this.$.equityOwnerContactPersonInput.get("value"),
				contactPersonTitle: this.$.equityOwnerContactPersonTitleInput.get("value"),
				emailAddress: this.$.equityOwnerEmailInput.get("value"),
				accreditedInvestorQualification: [],
				accreditedInvestorQualificationDetail: {}
			});
			this._activeIndex = this.get("tempCanadaTs").length - 1;
			this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
			this.$.noEquityOwnersItem.set("showing", this.get("tempCanadaTs").length === 0);
			this.$.addEquityOwnerNameInput.set("value", "");
			this.$.equityOwnerContactPersonInput.set("value", "");
			this.$.equityOwnerContactPersonTitleInput.set("value", "");
			this.$.equityOwnerEmailInput.set("value", "");
		}
	},

	deleteEquityOwnerButtonTapped: function(inSender, inEvent)
	{
		this.get("tempCanadaTs").splice(inEvent.index, 1);
		this._activeIndex = this.get("tempCanadaTs").length - 1;
		this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
		this.$.noEquityOwnersItem.set("showing", this.get("tempCanadaTs").length === 0);
	},

	addQualificationButtonTapped: function(inSender, inEvent)
	{
		this.get("tempCanadaTs")[inEvent.index].accreditedInvestorQualification.push(inSender.controls[inEvent.index].$.qualificationPicker.get("selected").value);
		this.$.equityOwnersRepeater.renderRow(inEvent.index);
	},

	deleteQualificationButtonTapped: function(inSender, inEvent)
	{
		delete this.get("tempCanadaTs")[inEvent.indices[1]].accreditedInvestorQualificationDetail[this.get("tempCanadaTs")[inEvent.indices[1]].accreditedInvestorQualification[inEvent.indices[0]]];
		this.get("tempCanadaTs")[inEvent.indices[1]].accreditedInvestorQualification.splice(inEvent.indices[0], 1);
		this.$.equityOwnersRepeater.renderRow(inEvent.indices[1]);
	},

	populateQualifications: function(item, index)
	{
		item.$.qualificationPicker.set("selected", null);
		item.$.qualificationPickerButton.set("disabled", false);
		item.$.addQualificationButton.set("disabled", false);
		item.$.addQualificationButton.addClass("primary");

		item.$.qualificationPicker.destroyClientControls();
		var accreditedInvestorQualification = [];
		var activeItemSet = false;

		var sourceArray = this.get("tempCanadaTs")[index].type === "individual" ? this._individualAccreditedInvestorQualifications : this._corporateAccreditedInvestorQualifications;

		for (var i = 0; i < sourceArray.length; i++)
		{
			var foundQualification = false;
			for (var j = 0; j < this.get("tempCanadaTs")[index].accreditedInvestorQualification.length; j++)
			{
				if (this.get("tempCanadaTs")[index].accreditedInvestorQualification[j] === sourceArray[i].value)
				{
					foundQualification = true;
				}
			}
			if (!foundQualification)
			{
				accreditedInvestorQualification.push(Object.assign({}, this._tooltipPickerItemTemplate, sourceArray[i]));
			}
		}

		if (accreditedInvestorQualification.length === 0 || this.get("disabled"))
		{
			item.$.qualificationPickerButton.set("disabled", true);
			item.$.addQualificationButton.set("disabled", true);
			item.$.addQualificationButton.removeClass("primary");

			accreditedInvestorQualification.push({content: "No Qualifications Available.", active: true});
		}
		else
		{
			accreditedInvestorQualification.sort(function(a, b){
				if (a.content > b.content) {return 1;}
				if (a.content < b.content) {return -1;}
				return 0;
			});

			accreditedInvestorQualification[0].active = true;
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		item.$.qualificationPicker.createComponents(accreditedInvestorQualification, {owner: this});
		item.$.qualificationPicker.render();
	},

	setupEquityOwnerRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempCanadaTs")[inEvent.index];
		if (this._activeIndex === -1) {this._activeIndex = 0;}

		item.$.equityOwnerName.set("content", target.entityName);
		item.$.equityOwnerEmail.set("content", target.emailAddress);

		item.$.equityOwnerContactPersonSection.set("showing", target.type === "corporate");
		item.$.equityOwnerContactPerson.set("content", target.contactPersonName);
		item.$.equityOwnerContactPersonTitleSection.set("showing", target.type === "corporate");
		item.$.equityOwnerContactPersonTitle.set("content", target.contactPersonTitle);

		this.populateQualifications(item, inEvent.index);
		item.$.noQualificationsItem.set("showing", target.accreditedInvestorQualification.length === 0);
		item.$.qualificationRepeater.setCount(target.accreditedInvestorQualification.length);
		
		item.$.collapseIcon.set("showing", this._activeIndex !== inEvent.index);
		item.$.equityOwnerDetailDrawer.set("open", this._activeIndex === inEvent.index);

		if (this.get("validating") && target.accreditedInvestorQualification.length === 0)
		{
			this._validated = false;
			item.$.qualificationPickerButton.applyStyle("border", "1px solid red");
		}
		else
		{
			item.$.qualificationPickerButton.applyStyle("border", null);
		}
		
		return true;
	},

	collapseIconTapped: function(inSender, inEvent)
	{
		this._activeIndex = inEvent.index;
		this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
		return true;
	},

	setupQualificationRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempCanadaTs")[inEvent.indices[1]].accreditedInvestorQualification[inEvent.indices[0]];
		var detailItem = this.get("tempCanadaTs")[inEvent.indices[1]].accreditedInvestorQualificationDetail;

		var sourceArray = this.get("tempCanadaTs")[inEvent.indices[1]].type === "individual" ? this._individualAccreditedInvestorQualifications : this._corporateAccreditedInvestorQualifications;

		for (var i = 0; i < sourceArray.length; i++)
		{
			if (target === sourceArray[i].value)
			{
				item.$.qualificationName.set("content", sourceArray[i].content);
			}
		}

		if (this._detailQualifications.indexOf(target) !== -1 && !detailItem[target])
		{
			detailItem[target] = null;
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		var qualificationDetailObject;

		//First set up the object
		switch(target)
		{
			case "canadaD":
			case "canadaD1":
			case "canadaE":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.AdvisorDealer", disabled: this.get("disabled"), advisorDealers: detailItem[target]};
				break;
			case "canadaI":
			case "canadaI1":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.PensionFund", disabled: this.get("disabled"), pensionFunds: detailItem[target]};
				break;
			case "canadaM":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.LargeAssetNonIndividual", disabled: this.get("disabled"), largeAssetNonIndividual: detailItem[target]};
				break;
			case "canadaP":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.TrustCompany", disabled: this.get("disabled"), trustCompanies: detailItem[target]};
				break;
			case "canadaQ":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.ForeignAdvisorDealer", disabled: this.get("disabled"), foreignAdvisorDealers: detailItem[target]};
				break;
			case "canadaR":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.Charity", disabled: this.get("disabled"), charity: detailItem[target]};
				break;
			case "canadaS":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.ForeignBank", disabled: this.get("disabled"), foreignBank: detailItem[target]};
				break;
			case "canadaT":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.CanadaT", disabled: this.get("disabled"), canadaTs: detailItem[target]};
				break;
			case "canadaU":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.InvestmentFund", disabled: this.get("disabled"), investmentFund: detailItem[target]};
				break;
			case "canadaW":
				qualificationDetailObject = {name: "qualificationDetail", kind: "quantum.FamilyTrust", disabled: this.get("disabled"), familyTrust: detailItem[target]};
				break;
		}

		//Create it
		if (qualificationDetailObject)
		{
			item.$.qualificationDetailSection.createComponent(qualificationDetailObject, {owner: item});
		}

		//Then map the detail object to the component's temp object so that we persist across changes/re-creations. 
		switch(target)
		{
			case "canadaD":
			case "canadaD1":
			case "canadaE":
				detailItem[target] = item.$.qualificationDetail.get("tempAdvisorDealers");
				break;
			case "canadaI":
			case "canadaI1":
				detailItem[target] = item.$.qualificationDetail.get("tempPensionFunds");
				break;
			case "canadaM":
				detailItem[target] = item.$.qualificationDetail.get("tempLargeAssetNonIndividual");
				break;
			case "canadaP":
				detailItem[target] = item.$.qualificationDetail.get("tempTrustCompanies");
				break;
			case "canadaQ":
				detailItem[target] = item.$.qualificationDetail.get("tempForeignAdvisorDealers");
				break;
			case "canadaR":
				detailItem[target] = item.$.qualificationDetail.get("tempCharity");
				break;
			case "canadaS":
				detailItem[target] = item.$.qualificationDetail.get("tempForeignBank");
				break;
			case "canadaT":
				detailItem[target] = item.$.qualificationDetail.get("tempCanadaTs");
				break;
			case "canadaU":
				detailItem[target] = item.$.qualificationDetail.get("tempInvestmentFund");
				break;
			case "canadaW":
				detailItem[target] = item.$.qualificationDetail.get("tempFamilyTrust");
				break;
		}

		if (this.get("validating") && item.$.qualificationDetail && !item.$.qualificationDetail.validate())
		{
			this._validated = false;
		}

		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempCanadaTs").length === 0)
		{
			this._validated = false;
			this.$.addEquityOwnerNameInput.validate();
			this.$.equityOwnerEmailInput.validate();
		}
		this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.addEquityOwnerNameInput.clearBorderError();
		this.$.equityOwnerEmailInput.clearBorderError();
		this.$.equityOwnersRepeater.setCount(this.get("tempCanadaTs").length);
	}
});