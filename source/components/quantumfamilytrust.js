enyo.kind({
	name: "quantum.FamilyTrust",

	published:
	{
		tempTrust: null,
		trust: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; width: 490px; padding: 10px;",

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

	_beneficiaryCategories: [{value: "spouse", content: "Spouse"}, {value: "formerSpouse", content: "Former Spouse"}, {value: "parent", content: "Parent"}, {value: "grandparent", content: "Grandparent"}, {value: "brother", content: "Brother"}, {value: "sister", content: "Sister"}, {value: "child", content: "Child"}, {value: "grandchild", content: "Grandchild"}, {value: "spouseParent", content: "Parent of Spouse"}, {value: "spouseGrandparent", content: "Grandparent of Spouse"}, {value: "spouseBrother", content: "Brother of Spouse"}, {value: "spouseSister", content: "Sister of Spouse"}, {value: "spouseChild", content: "Child of Spouse"}, {value: "spouseGrandchild", content: "Grandchild of Spouse"}, {value: "formerSpouseParent", content: "Parent of Former Spouse"}, {value: "formerSpouseGrandparent", content: "Grandparent of Former Spouse"}, {value: "formerSpouseBrother", content: "Brother of Former Spouse"}, {value: "formerSpouseSister", content: "Sister of Former Spouse"}, {value: "formerSpouseChild", content: "Child of Former Spouse"}, {value: "formerSpouseGrandchild", content: "Grandchild of Former Spouse"}],
	_accreditedInvestorQualifications: [
		{value: "canadaA", content: "Paragraph A", tooltip: "except in Ontario, a Canadian financial institution or an authorized foreign bank listed in Schedule III of the Bank Act (Canada)."},
		{value: "canadaA1", content: "Paragraph A.1", tooltip: "in Ontario, a financial institution described in paragraph 1, 2 or 3 of subsection 73.1 (1) of the Securities Act (Ontario)."},
		{value: "canadaB", content: "Paragraph B", tooltip: "except in Ontario, the Business Development Bank of Canada incorporated under the Business Development Bank of Canada Act (Canada)."},
		{value: "canadaB1", content: "Paragraph B.1", tooltip: "in Ontario, the Business Development Bank of Canada."},
		{value: "canadaC", content: "Paragraph C", tooltip: "except in Ontario, a subsidiary of any person referred to in paragraph (a) or (b), if the person owns all of the voting securities of the subsidiary, except the voting securities required by law to be owned by directors of that subsidiary."},
		{value: "canadaC1", content: "Paragraph C.1", tooltip: "in Ontario, a subsidiary of any person or company referred to in clause (a.1) or (b.1), if the person or company owns all of the voting securities of the subsidiary, except the voting securities required by law to be owned by directors of that subsidiary."},
		{value: "canadaD", content: "Paragraph D", tooltip: "except in Ontario, a person registered under the securities legislation of a jurisdiction of Canada as an adviser or dealer."},
		{value: "canadaD1", content: "Paragraph D.1", tooltip: "in Ontario, a person or company registered under the securities legislation of a province or territory of Canada as an adviser or dealer, except as otherwise prescribed by the regulations."},
		{value: "canadaE", content: "Paragraph E", tooltip: "an individual registered under the securities legislation of a jurisdiction of Canada as a representative of a person referred to in paragraph (d)."},
		{value: "canadaE1", content: "Paragraph E.1", tooltip: "an individual formerly registered under the securities legislation of a jurisdiction of Canada, other than an individual formerly registered solely as a representative of a limited market dealer under one or both of the Securities Act (Ontario) or the Securities Act (Newfoundland and Labrador)."},
		{value: "canadaF", content: "Paragraph F", tooltip: "except in Ontario, the Government of Canada or a jurisdiction of Canada, or any crown corporation, agency or wholly-owned entity of the Government of Canada or a jurisdiction of Canada."},
		{value: "canadaF1", content: "Paragraph F.1", tooltip: "in Ontario, the Government of Canada, the government of a province or territory of Canada, or any Crown corporation, agency or wholly owned entity of the Government of Canada or of the government of a province or territory of Canada."},
		{value: "canadaG", content: "Paragraph G", tooltip: "a municipality, public board or commission in Canada and a metropolitan community, school board, the Comité de gestion de la taxe scolaire de l’île de Montréal or an intermunicipal management board in Québec."},
		{value: "canadaH", content: "Paragraph H", tooltip: "any national, federal, state, provincial, territorial or municipal government of or in any foreign jurisdiction, or any agency of that government."},
		{value: "canadaI", content: "Paragraph I", tooltip: "except in Ontario, a pension fund that is regulated by the Office of the Superintendent of Financial Institutions (Canada) or a pension commission or similar regulatory authority of a jurisdiction of Canada."},
		{value: "canadaI1", content: "Paragraph I.1", tooltip: "in Ontario, a pension fund that is regulated by either the Office of the Superintendent of Financial Institutions (Canada) or a pension commission or similar regulatory authority of a province or territory of Canada,"},
		{value: "canadaJ", content: "Paragraph J", tooltip: "an individual who, either alone or with a spouse, beneficially owns financial assets having an aggregate realizable value that, before taxes, but net of any related liabilities, exceeds $1,000,000."},
		{value: "canadaJ1", content: "Paragraph J.1", tooltip: "an individual who beneficially owns financial assets having an aggregate realizable value that, before taxes but net of any related liabilities, exceeds $5,000,000."},
		{value: "canadaK", content: "Paragraph K", tooltip: "an individual whose net income before taxes exceeded $200,000 or whose net income before taxes combined with that of a spouse exceeded $300,000 in each of the two most recent calendar years and who reasonably expects to exceed that net income level in the current calendar year."},
		{value: "canadaL", content: "Paragraph L", tooltip: "an individual who, either alone or with a spouse, has net assets of at least $5,000,000."},
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
	
	components:[
		{content: "Trust Settlors", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 300px; text-align: center;"},
		{name: "noSettlorsItem", content: "No Assigned Settlors", style: "margin-top: 10px; width: 300px; text-align: center;"},
		{name: "settlorsRepeater", kind: "enyo.Repeater", count: 0, style: "margin-top: 10px; width: 445px;", onSetupItem: "setupSettlorRepeaterItem", components: [
			{name: "settlorItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "settlorName", style: "width: 348px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteSettlorButtonTapped"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "quantum.Input", name:"addSettlorInput", columnStyle:"", labelStyle:"line-height: 30px; width: 95px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 195px;", type:"text", label:"Settlor Name", required:true},
			{name: "addSettlorButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Settlor"), style: "width: 150px; height: 30px; margin-left: 30px;", ontap: "addSettlorButtonTapped"}
		]},
		{content: "Trustees", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 300px; text-align: center;"},
		{name: "noTrusteesItem", content: "No Assigned Trustees", style: "margin-top: 10px; width: 300px; text-align: center;"},
		{name: "trusteesRepeater", kind: "enyo.Repeater", count: 0, style: "width: 468px; margin-top: 10px;", onSetupItem: "setupTrusteeRepeaterItem", components: [
			{name: "trusteeItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "trusteeName", style: "width: 310px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteTrusteeButtonTapped"}
				]},
				{content: "Accredited Investor Qualification", style: "font-size: 16px; font-weight: bold; width: 300px; text-align: center;"},
				{name: "noQualificationsItem", content: "No Accredited Investor Qualifications", style: "margin-top: 10px; width: 300px; text-align: center;"},
				{name: "qualificationRepeater", kind: "enyo.Repeater", count: 0, style: "width: 395px; margin-top: 10px;", onSetupItem: "setupQualificationRepeaterItem", components: [
					{name: "qualificationItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "qualificationName", style: "width: 300px; line-height: 34px;"},
						{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px; margin-left: 5px;", content: "Delete", ontap: "deleteQualificationButtonTapped"}					
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
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "quantum.Input", name:"addTrusteeInput", columnStyle:"", labelStyle:"line-height: 30px; width: 95px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 195px;", type:"text", label:"Trustee Name", required:true},
			{name: "addTrusteeButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Trustee"), style: "width: 150px; height: 30px; margin-left: 30px;", ontap: "addTrusteeButtonTapped"}
		]},
		{content: "Beneficiary Categories", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 300px; text-align: center;"},
		{name: "noBeneficiaryCategoriesItem", content: "No Assigned Categories", style: "margin-top: 10px; width: 300px; text-align: center;"},
		{name: "beneficiaryCategoriesRepeater", kind: "enyo.Repeater", count: 0, style: "width: 395px; margin-top: 10px;", onSetupItem: "setupBeneficiaryCategoryRepeaterItem", components: [
			{name: "beneficiaryCategoryItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "beneficiaryCategoryName", style: "width: 300px; line-height: 34px;"},
				{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px; margin-left: 5px;", content: "Delete", ontap: "deleteBeneficiaryCategoryButtonTapped"}					
			]}
		]},	
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "beneficiaryCategoriesPickerButton", style: "width: 300px;"},
				{name: "beneficiaryCategoriesPicker", kind: "onyx.Picker"}
			]},
			{name: "addBeneficiaryCategoryButton", kind: "quantum.Button", enabledClasses: "button primary", content: $L("Add Beneficary Category"), style: "width: 150px; height: 45px; margin-left: 10px;", ontap: "addBeneficiaryCategoryButtonTapped"}
		]}
	],

	bindings:[
		{from: ".trust", to: ".tempTrust", transform: function(v){
			try
			{
				var tempVal = {
					settlorNames: [],
					trustees: [],
					beneficiaryCategories: []
				};

				if (Array.isArray(v.settlorNames)){
					v.settlorNames.forEach(function(value, index, array){
						tempVal.settlorNames.push(value);
					});
				}

				if (Array.isArray(v.trustees)){
					v.trustees.forEach(function(value, index, array){
						tempVal.trustees.push(Object.assign({}, value));
					});
				}

				if (Array.isArray(v.beneficiaryCategories)){
					v.beneficiaryCategories.forEach(function(value, index, array){
						tempVal.beneficiaryCategories.push(value);
					});
				}

				return tempVal;
			}
			catch(err)
			{
				return {
					settlorNames: [],
					trustees: [],
					beneficiaryCategories: []
				};
			}
		}},
		{from: ".disabled", to: ".$.addSettlorInput.disabled"},
		{from: ".disabled", to: ".$.addSettlorButton.disabled"},
		{from: ".disabled", to: ".$.addTrusteeInput.disabled"},
		{from: ".disabled", to: ".$.addTrusteeButton.disabled"},
		{from: ".disabled", to: ".$.beneficiaryCategoriesPickerButton.disabled"},
		{from: ".disabled", to: ".$.addBeneficiaryCategoryButton.disabled"}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.settlorsRepeater.setCount(this.get("tempTrust").settlorNames.length);
		this.$.trusteesRepeater.setCount(this.get("tempTrust").trustees.length);
		this.$.beneficiaryCategoriesRepeater.setCount(this.get("tempTrust").beneficiaryCategories.length);
	},

	tempTrustChanged: function(oldVal, newVal)
	{
		this.$.noSettlorsItem.set("showing", this.get("tempTrust").settlorNames.length === 0);
		this.$.settlorsRepeater.setCount(this.get("tempTrust").settlorNames.length);
		this.$.noTrusteesItem.set("showing", this.get("tempTrust").trustees.length === 0);
		this.$.trusteesRepeater.setCount(this.get("tempTrust").trustees.length);
		this.$.noBeneficiaryCategoriesItem.set("showing", this.get("tempTrust").beneficiaryCategories.length === 0);
		this.$.beneficiaryCategoriesRepeater.setCount(this.get("tempTrust").beneficiaryCategories.length);
		this.populateBeneficiaryCategories();
	},

	addSettlorButtonTapped: function(inSender, inEvent)
	{
		this.$.addSettlorInput.clearBorderError();

		if (this.$.addSettlorInput.validate())
		{
			this.get("tempTrust").settlorNames.push(this.$.addSettlorInput.get("value"));
			this.$.settlorsRepeater.setCount(this.get("tempTrust").settlorNames.length);
			this.$.noSettlorsItem.set("showing", this.get("tempTrust").settlorNames.length === 0);
			this.$.addSettlorInput.set("value", "");
		}
	},

	deleteSettlorButtonTapped: function(inSender, inEvent)
	{
		this.get("tempTrust").settlorNames.splice(inEvent.index, 1);
		this.$.settlorsRepeater.setCount(this.get("tempTrust").settlorNames.length);
		this.$.noSettlorsItem.set("showing", this.get("tempTrust").settlorNames.length === 0);
	},

	setupSettlorRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempTrust").settlorNames[inEvent.index];

		item.$.settlorName.set("content", target);

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}
		
		return true;
	},

	addTrusteeButtonTapped: function(inSender, inEvent)
	{
		this.$.addTrusteeInput.clearBorderError();

		if (this.$.addTrusteeInput.validate())
		{
			this.get("tempTrust").trustees.push({trusteeName: this.$.addTrusteeInput.get("value"), accreditedInvestorQualification: []});
			this.$.trusteesRepeater.setCount(this.get("tempTrust").trustees.length);
			this.$.noTrusteesItem.set("showing", this.get("tempTrust").trustees.length === 0);
			this.$.addTrusteeInput.set("value", "");
		}
	},

	deleteTrusteeButtonTapped: function(inSender, inEvent)
	{
		this.get("tempTrust").trustees.splice(inEvent.index, 1);
		this.$.trusteesRepeater.setCount(this.get("tempTrust").trustees.length);
		this.$.noTrusteesItem.set("showing", this.get("tempTrust").trustees.length === 0);
	},

	addQualificationButtonTapped: function(inSender, inEvent)
	{
		this.get("tempTrust").trustees[inEvent.index].accreditedInvestorQualification.push(inSender.controls[inEvent.index].$.qualificationPicker.get("selected").value);
		this.$.trusteesRepeater.renderRow(inEvent.index);
	},

	deleteQualificationButtonTapped: function(inSender, inEvent)
	{
		this.get("tempTrust").trustees[inEvent.indices[1]].accreditedInvestorQualification.splice(inEvent.indices[0], 1);
		this.$.trusteesRepeater.renderRow(inEvent.indices[1]);
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

		for (var i = 0; i < this._accreditedInvestorQualifications.length; i++)
		{
			var foundQualification = false;
			for (var j = 0; j < this.get("tempTrust").trustees[index].accreditedInvestorQualification.length; j++)
			{
				if (this.get("tempTrust").trustees[index].accreditedInvestorQualification[j] === this._accreditedInvestorQualifications[i].value)
				{
					foundQualification = true;
				}
			}
			if (!foundQualification)
			{
				accreditedInvestorQualification.push(Object.assign({}, this._tooltipPickerItemTemplate, this._accreditedInvestorQualifications[i]));
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

	setupTrusteeRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempTrust").trustees[inEvent.index];

		item.$.trusteeName.set("content", target.trusteeName);

		this.populateQualifications(item, inEvent.index);
		item.$.noQualificationsItem.set("showing", target.accreditedInvestorQualification.length === 0);
		item.$.qualificationRepeater.setCount(target.accreditedInvestorQualification.length);

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

	setupQualificationRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempTrust").trustees[inEvent.indices[1]].accreditedInvestorQualification[inEvent.indices[0]];
		
		for (var i = 0; i < this._accreditedInvestorQualifications.length; i++)
		{
			if (target === this._accreditedInvestorQualifications[i].value)
			{
				item.$.qualificationName.set("content", this._accreditedInvestorQualifications[i].content);
			}
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		return true;
	},

	addBeneficiaryCategoryButtonTapped: function(inSender, inEvent)
	{
		this.get("tempTrust").beneficiaryCategories.push(this.$.beneficiaryCategoriesPicker.get("selected").value);
		this.$.beneficiaryCategoriesRepeater.setCount(this.get("tempTrust").beneficiaryCategories.length);
		this.$.noBeneficiaryCategoriesItem.set("showing", this.get("tempTrust").beneficiaryCategories.length === 0);
		this.populateBeneficiaryCategories();
	},

	deleteBeneficiaryCategoryButtonTapped: function(inSender, inEvent)
	{
		this.get("tempTrust").beneficiaryCategories.splice(inEvent.index, 1);
		this.$.beneficiaryCategoriesRepeater.setCount(this.get("tempTrust").beneficiaryCategories.length);
		this.$.noBeneficiaryCategoriesItem.set("showing", this.get("tempTrust").beneficiaryCategories.length === 0);
		this.populateBeneficiaryCategories();
	},

	populateBeneficiaryCategories: function()
	{
		this.$.beneficiaryCategoriesPicker.set("selected", null);
		this.$.beneficiaryCategoriesPickerButton.set("disabled", false);
		this.$.addBeneficiaryCategoryButton.set("disabled", false);
		this.$.addBeneficiaryCategoryButton.addClass("primary");

		this.$.beneficiaryCategoriesPicker.destroyClientControls();
		var beneficiaryCategories = [];

		for (var i = 0; i < this._beneficiaryCategories.length; i++)
		{
			var foundBeneficiaryCategory = false;
			for (var j = 0; j < this.get("tempTrust").beneficiaryCategories.length; j++)
			{
				if (this.get("tempTrust").beneficiaryCategories[j] === this._beneficiaryCategories[i].value)
				{
					foundBeneficiaryCategory = true;
				}
			}
			if (!foundBeneficiaryCategory)
			{
				beneficiaryCategories.push(Object.assign({}, this._beneficiaryCategories[i]));
			}
		}

		if (beneficiaryCategories.length === 0)
		{
			this.$.beneficiaryCategoriesPickerButton.set("disabled", true);
			this.$.addBeneficiaryCategoryButton.set("disabled", true);
			this.$.addBeneficiaryCategoryButton.removeClass("primary");

			beneficiaryCategories.push({content: "No Categories Available.", active: true});
		}
		else
		{
			beneficiaryCategories.sort(function(a, b){
				if (a.content > b.content) {return 1;}
				if (a.content < b.content) {return -1;}
				return 0;
			});

			beneficiaryCategories[0].active = true;
		}

		this.$.beneficiaryCategoriesPicker.createComponents(beneficiaryCategories, {owner: this});
		this.$.beneficiaryCategoriesPicker.render();
	},

	setupBeneficiaryCategoryRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempTrust").beneficiaryCategories[inEvent.index];

		for (var i = 0; i < this._beneficiaryCategories.length; i++)
		{
			if (target === this._beneficiaryCategories[i].value)
			{
				item.$.beneficiaryCategoryName.set("content", this._beneficiaryCategories[i].content);
			}
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}
		
		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempTrust").settlorNames.length === 0)
		{
			this._validated = false;
			this.$.addSettlorInput.validate();
		}
		if (this.get("tempTrust").trustees.length === 0)
		{
			this._validated = false;
			this.$.addTrusteeInput.validate();
		}
		if (this.get("tempTrust").beneficiaryCategories.length === 0)
		{
			this._validated = false;
			this.$.beneficiaryCategoriesPickerButton.applyStyle("border", "1px solid red");
		}
		this.$.trusteesRepeater.setCount(this.get("tempTrust").trustees.length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.addSettlorInput.clearBorderError();
		this.$.addTrusteeInput.clearBorderError();
		this.$.beneficiaryCategoriesPickerButton.applyStyle("border", null);
		this.$.trusteesRepeater.setCount(this.get("tempTrust").trustees.length);
		this.render();
	}
});