enyo.kind({
	name: "lumberjack.Investor",

	handlers: 
	{
		onchange: "handleCheckboxChanged"
	},

	published:
	{
		mode: "placement", //placement, transfer
		exemptionType: "accreditedInvestor", //accreditedInvestor, friendsAndFamily
		jurisdiction: "usa", //usa,canada,international
		investorType: "individual", //individual,corporate
		exemptionQualification: null,
		tempExemptionQualification: null,
		exemptionQualificationDetail: null,
		tempExemptionQualificationDetail: null,
		checkedBoxes: null,
		showInstructions: true,
		friendsAndFamilyRelationshipType: "",
		friendsAndFamilyFamilyMemberType: "",
		salespersonDetail: null
	},

	computed: {
		showUSAIndividualAccreditedInvestorSection: ["exemptionType", "jurisdiction", "investorType"],
		showUSACorporateAccreditedInvestorSection: ["exemptionType", "jurisdiction", "investorType"],
		showCanadaIndividualAccreditedInvestorSection: ["mode", "exemptionType", "jurisdiction", "investorType"],
		showCanadaCorporateAccreditedInvestorSection: ["mode", "exemptionType", "jurisdiction", "investorType"],
		showCanadaDefinitionsSection: ["mode", "exemptionType", "jurisdiction"],
		friendsAndFamilyDetail: ["tempExemptionQualification", "tempExemptionQualificationDetail", "exemptionType"]
	},

	components:[
		{name: "friendsAndFamilySection", style: "margin-top: 15px;", components: [
			{style: "font-weight: bold; font-size: 18px;", content: "Family, Friends, and Business Associates Status"},
			{style: "margin-top: 10px;", content: "Please select applicable checkbox", allowHtml: true},
			{kind: "enyo.Group", allowHighlanderDeactivate: true, groupName: "friendsAndFamilyCheckboxes", components: [
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyA", detail: "ffA", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(a) a director, executive officer or control person of the Company or affiliate"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyB", detail: "ffB", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(b) a spouse, parent, grandparent, brother, sister or child of a director, executive officer or control person of the Company, or affiliate"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyC", detail: "ffC", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(c) a parent, grandparent, brother, sister or child of the spouse of a director, executive officer or control person of the Company or affiliate"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyD", detail: "ffD", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(d) a close personal friend of a director, executive officer or control person of the Company or affiliate who will provide a signed statement if requested"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyE", detail: "ffE", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(e) a close business associate of a director, executive officer or control person of the Company or affiliate who will provide a signed statement if requested"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyF", detail: "ffF", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(f) a founder of the Company or a spouse, parent, grandparent, brother, sister, child, close personal friend or close business associate of a founder of the Company;"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyG", detail: "ffG", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(g) a parent, grandparent, brother, sister or child of a spouse of a founder of the Company;"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyH", detail: "ffH", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(h) a person of which a majority of the voting securities are beneficially owned by, or a majority of the directors are, persons described in paragraphs (a) to (g)"},
				{kind:"lumberjack.ColumnCheckbox", name: "friendsAndFamilyI", detail: "ffI", groupName: "friendsAndFamilyCheckboxes", disabled: true, content: "(i) a trust or estate of which all of the beneficiaries or a majority of the trustees or executors are persons described in paragraphs (a) to (g)."}
			]},
			{style: "font-weight: bold; font-size: 18px; margin-top: 15px;", content: "Friends, Family, and Business Associates Relationship"},
			{style: "margin-top: 10px;", components: [
				{style: "display: inline-block; width: 250px;", content: "Relationship with salesperson"},
				{name: "friendsAndFamilyRelationshipTypePickerDecorator", kind: "onyx.PickerDecorator", style: "margin-left: 10px; display: inline-block;", components: [
					{name: "friendsAndFamilyRelationshipTypePickerButton", style: "width: 250px;", content: "Select", classes: "metro-picker-button"},
					{name: "friendsAndFamilyRelationshipTypePicker", kind: "onyx.Picker", classes: "metro-picker", components: [
						{content: "Family Member", value: "family"},
						{content: "Friend", value: "friend"},
						{content: "Close Business Associate", value: "businessAssociate"}
					]}
				]}
			]},
			{name: "friendsAndFamilyFamilyMemberSection", style: "margin-top: 10px;", components: [
				{style: "display: inline-block; width: 250px;", content: "Family Relationship to Salesperson"},
				{name: "friendsAndFamilyFamilyMemberPickerDecorator", kind: "onyx.PickerDecorator", style: "margin-left: 10px; display: inline-block;", components: [
					{name: "friendsAndFamilyFamilyMemberPickerButton", style: "width: 250px;", content: "Select", classes: "metro-picker-button"},
					{name: "friendsAndFamilyFamilyMemberPicker", kind: "onyx.Picker", classes: "metro-picker", components: [
						{content: "Spouse", value: "spouse"},
						{content: "Parent", value: "parent"},
						{content: "Grandparent", value: "grandparent"},
						{content: "Brother", value: "brother"},
						{content: "Sister", value: "sister"},
						{content: "Child", value: "child"},
						{content: "Grandchild", value: "grandchild"},
						{content: "Parent of Spouse", value: "spouseParent"},
						{content: "Grandparent of Spouse", value: "spouseGrandparent"},
						{content: "Brother of Spouse", value: "spouseBrother"},
						{content: "Sister of Spouse", value: "spouseSister"},
						{content: "Child of Spouse", value: "spouseChild"},
						{content: "Grandchild of Spouse", value: "spouseGrandchild"}
					]}
				]}
			]},
			{name: "friendsAndFamilyNonFamilyMemberSection", style: "margin-top: 10px;", components: [
				{style: "display: inline-block; width: 250px;", content: "Length of Relationship (years)"},
				{name: "friendsAndFamilyNonFamilyMemberTimeKnownInputDecorator", style: "display: inline-block; margin-left: 10px; width: 50px;", classes: "input-control text", components: [
					{name: "friendsAndFamilyNonFamilyMemberTimeKnownInput", kind: "enyo.Input", attributes: {maxlength: 2}, onkeydown: "validateNumberInput"}
				]}
			]},
			{name: "friendsAndFamilyBusinessAssociateSection", style: "margin-top: 10px;", components: [
				{content: "Business Relationship Details"},
				{name: "friendsAndFamilyBusinessAssociateDetailTextAreaDecorator", classes: "input-control textarea", style: "width: 800px; margin-top: 10px;", components: [
					{name: "friendsAndFamilyBusinessAssociateDetailTextArea", kind: "onyx.TextArea", style: "width: 100%; resize: none;", attributes: {maxlength: 5000}}
				]}
			]}
		]},
		{name: "accreditedInvestorSection", style: "margin-top: 10px;", components: [
			{name: "accreditedInvestorInstructionsLabel", style: "margin-top: 10px;", content: "Please select all applicable checkboxes"},
			{name: "usaIndividualAccreditedInvestorSection", kind: "enyo.FittableRows", style: "margin-top: 10px;", components: [
				{kind:"lumberjack.ColumnCheckbox", name: "usa5A", detail: "usa5A", content: "A natural person whose individual net worth, or joint net worth with that person’s spouse, at the time of purchase, exceeds US$1,000,000 (note: for the purposes of calculating net worth, (i) the person’s primary residence shall not be included as an asset; (ii) indebtedness that is secured by the person’s primary residence, up to the estimated fair market value of the primary residence at the time of this certification, shall not be included as a liability (except that if the amount of such indebtedness outstanding at the time of this certification exceeds the amount outstanding 60 days before such time, other than as a result of the acquisition of the primary residence, the amount of such excess shall be included as a liability); and (iii) indebtedness that is secured by the person’s primary residence in excess of the estimated fair market value of the primary residence shall be included as a liability);"},
				{kind:"lumberjack.ColumnCheckbox", name: "usa5B", detail: "usa5B", content: "A natural person who had an individual income in excess of US $200,000 in each of the two most recent years or joint income with that person’s spouse in excess of US $300,000 in each of those years and has a reasonable expectation of reaching the same income level in the current year;"}
			]},
			{name: "usaCorporateAccreditedInvestorSection", kind: "enyo.FittableRows", style: "margin-top: 10px;", components: [
				{kind:"lumberjack.ColumnCheckbox", name: "usa6A", detail: "usa6A", content: "An organization described in Section 501(c)(3) of the United States Internal Revenue Code, a corporation, a Massachusetts or similar business trust or partnership, not formed for the specific purpose of acquiring the Shares, with total assets in excess of US $5,000,000;"},
				{kind:"lumberjack.ColumnCheckbox", name: "usa6B", detail: "usa6B", content: "A trust that (a) has total assets in excess of US $5,000,000, (b) was not formed for the specific purpose of acquiring the Shares and (c) is directed in its purchases of securities by a person who has such knowledge and experience in financial and business matters that he/she is capable of evaluating the merits and risks of an investment in the Shares;"},
				{kind:"lumberjack.ColumnCheckbox", name: "usa6C", detail: "usa6C", content: "An investment company registered under the Investment Company Act of 1940 or a business development company as defined in Section 2(a)(48) of that Act;"},
				{kind:"lumberjack.ColumnCheckbox", name: "usa6D", detail: "usa6D", content: "A Small Business Investment Company licensed by the U.S. Small Business Administration under Section 301(c) or (d) of the Small Business Investment Act of 1958;"},
				{kind:"lumberjack.ColumnCheckbox", name: "usa6E", detail: "usa6E", content: "A private business development company as defined in Section 202(a)(22) of the Investment Advisors Act of 1940; or"},
				{kind:"lumberjack.ColumnCheckbox", name: "usa6F", detail: "usa6F", content: "An entity in which all of the equity owners satisfy the requirements of one or more of the foregoing categories."},
				{name: "usa6FDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "usa6FDetail", kind: "lumberjack.Usa6F"}
				]}
			]},
			{name: "canadaIndividualAccreditedInvestorSection", kind: "enyo.FittableRows", style: "margin-top: 10px;", components: [
				{kind:"lumberjack.ColumnCheckbox", name: "canadaIndividualD", detail: "canadaD", content: "(d) except in Ontario, a person registered under the securities legislation of a jurisdiction of Canada as an adviser or dealer,"},
				{name: "canadaIndividualDDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaIndividualDDetail", kind: "lumberjack.AdvisorDealer"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaIndividualD1", detail: "canadaD1", content: "(d.1) in Ontario, a person or company registered under the securities legislation of a province or territory of Canada as an adviser or dealer, except as otherwise prescribed by the regulations,"},
				{name: "canadaIndividualD1Drawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaIndividualD1Detail", kind: "lumberjack.AdvisorDealer"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaE", detail: "canadaE", content: "(e) an individual registered under the securities legislation of a jurisdiction of Canada as a representative of a person referred to in paragraph (d),"},
				{name: "canadaEDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaEDetail", kind: "lumberjack.AdvisorDealer"}
				]},					
				{kind:"lumberjack.ColumnCheckbox", name: "canadaE1", detail: "canadaE1", content: "(e.1) an individual formerly registered under the securities legislation of a jurisdiction of Canada, other than an individual formerly registered solely as a representative of a limited market dealer under one or both of the Securities Act (Ontario) or the Securities Act (Newfoundland and Labrador),"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaJ", detail: "canadaJ", content: "(j) an individual who, either alone or with a spouse, beneficially owns financial assets having an aggregate realizable value that, before taxes, but net of any related liabilities, exceeds $1,000,000,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaJ1", detail: "canadaJ1", content: "(j.1) an individual who beneficially owns financial assets having an aggregate realizable value that, before taxes but net of any related liabilities, exceeds $5,000,000,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaK", detail: "canadaK", content: "(k) an individual whose net income before taxes exceeded $200,000 in each of the two most recent calendar years and who reasonably expects to exceed that net income level in the current calendar year,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaK1", detail: "canadaK1", content: "(k.1) an individual whose net income before taxes combined with that of a spouse exceeded $300,000 in each of the two most recent calendar years and who reasonably expects to exceed that net income level in the current calendar year,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaL", detail: "canadaL", content: "(l) an individual who, either alone or with a spouse, has net assets of at least $5,000,000,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaIndividualQ", detail: "canadaQ", content: "(q) a person acting on behalf of a fully managed account managed by that person, if that person is registered or authorized to carry on business as an adviser or the equivalent under the securities legislation of a jurisdiction of Canada or a foreign jurisdiction,"},
				{name: "canadaIndividualQDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaIndividualQDetail", kind: "lumberjack.ForeignAdvisorDealer"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaIndividualV", detail: "canadaV", content: "(v) a person that is recognized or designated by the securities regulatory authority or, except in Ontario and Quebec, the regulator as an accredited investor, or"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaIndividualV1", detail: "canadaV1", content: "(v.1) in Ontario, a person or company that is recognized or designated by the Commission as an accredited investor."}
			]},
			{name: "canadaCorporateAccreditedInvestorSection", kind: "enyo.FittableRows", style: "margin-top: 10px;", components: [
				{style: "margin-top: 10px;", content: "Note: Options relevant only to individual/joint subscriptions are not displayed"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaA", detail: "canadaA", content: "(a) except in Ontario, a Canadian financial institution or an authorized foreign bank listed in Schedule III of the Bank Act (Canada),"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaA1", detail: "canadaA1", content: "(a.1) in Ontario, a financial institution described in paragraph 1, 2 or 3 of subsection 73.1 (1) of the Securities Act (Ontario),"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaB", detail: "canadaB", content: "(b) except in Ontario, the Business Development Bank of Canada incorporated under the Business Development Bank of Canada Act (Canada),"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaB1", detail: "canadaB1", content: "(b.1) in Ontario, the Business Development Bank of Canada,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaC", detail: "canadaC", content: "(c) except in Ontario, a subsidiary of any person referred to in paragraph (a) or (b), if the person owns all of the voting securities of the subsidiary, except the voting securities required by law to be owned by directors of that subsidiary,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaC1", detail: "canadaC1", content: "(c.1) in Ontario, a subsidiary of any person or company referred to in clause (a.1) or (b.1), if the person or company owns all of the voting securities of the subsidiary, except the voting securities required by law to be owned by directors of that subsidiary,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaCorporateD", detail: "canadaD", content: "(d) except in Ontario, a person registered under the securities legislation of a jurisdiction of Canada as an adviser or dealer,"},
				{name: "canadaCorporateDDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaCorporateDDetail", kind: "lumberjack.AdvisorDealer", mode: "corporate"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaCorporateD1", detail: "canadaD1", content: "(d.1) in Ontario, a person or company registered under the securities legislation of a province or territory of Canada as an adviser or dealer, except as otherwise prescribed by the regulations,"},
				{name: "canadaCorporateD1Drawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaCorporateD1Detail", kind: "lumberjack.AdvisorDealer", mode: "corporate"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaF", detail: "canadaF", content: "(f) except in Ontario, the Government of Canada or a jurisdiction of Canada, or any crown corporation, agency or wholly-owned entity of the Government of Canada or a jurisdiction of Canada,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaF1", detail: "canadaF1", content: "(f.1) in Ontario, the Government of Canada, the government of a province or territory of Canada, or any Crown corporation, agency or wholly owned entity of the Government of Canada or of the government of a province or territory of Canada,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaG", detail: "canadaG", content: "(g) a municipality, public board or commission in Canada and a metropolitan community, school board, the Comité de gestion de la taxe scolaire de l’île de Montréal or an intermunicipal management board in Québec,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaH", detail: "canadaH", content: "(h) any national, federal, state, provincial, territorial or municipal government of or in any foreign jurisdiction, or any agency of that government,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaI", detail: "canadaI", content: "(i) except in Ontario, a pension fund that is regulated by the Office of the Superintendent of Financial Institutions (Canada) or a pension commission or similar regulatory authority of a jurisdiction of Canada,"},
				{name: "canadaIDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaIDetail", kind: "lumberjack.PensionFund"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaI1", detail: "canadaI1", content: "(i.1) in Ontario, a pension fund that is regulated by either the Office of the Superintendent of Financial Institutions (Canada) or a pension commission or similar regulatory authority of a province or territory of Canada,"},
				{name: "canadaI1Drawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaI1Detail", kind: "lumberjack.PensionFund"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaM", detail: "canadaM", content: "(m) a person, other than an individual or investment fund, that has net assets of at least $5,000,000 as shown on its most recently prepared financial statements,"},
				{name: "canadaMDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaMDetail", kind: "lumberjack.LargeAssetNonIndividual"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaN", detail: "canadaN", content: "(n) an investment fund that distributes or has distributed its securities only to: (i) a person that is or was an accredited investor at the time of the distribution, (ii) a person that acquires or acquired securities in the circumstances referred to in sections 2.10 [Minimum amount investment] or 2.19 [Additional investment in investment funds] of NI 45-106, or (iii) a person described in paragraph (i) or (ii) immediately above that acquires or acquired securities under section 2.18 [Investment fund reinvestment] of NI 45-106,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaO", detail: "canadaO", content: "(o) an investment fund that distributes or has distributed securities under a prospectus in a jurisdiction of Canada for which the regulator or, in Quebec, the securities regulatory authority, has issued a receipt,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaP", detail: "canadaP", content: "(p) a trust company or trust corporation registered or authorized to carry on business under the Trust and Loan Companies Act (Canada) or under comparable legislation in a jurisdiction of Canada or a foreign jurisdiction, acting on behalf of a fully managed account managed by the trust company or trust corporation, as the case may be,"},
				{name: "canadaPDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaPDetail", kind: "lumberjack.TrustCompany"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaCorporateQ", detail: "canadaQ", content: "(q) a person acting on behalf of a fully managed account managed by that person, if that person is registered or authorized to carry on business as an adviser or the equivalent under the securities legislation of a jurisdiction of Canada or a foreign jurisdiction,"},
				{name: "canadaCorporateQDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaCorporateQDetail", kind: "lumberjack.ForeignAdvisorDealer"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaR", detail: "canadaR", content: "(r) a registered charity under the Income Tax Act (Canada) that, in regard to the trade, has obtained advice from an eligibility adviser or an adviser registered under the securities legislation of the jurisdiction of the registered charity to give advice on the securities being traded,"},
				{name: "canadaRDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaRDetail", kind: "lumberjack.Charity"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaS", detail: "canadaS", content: "(s) an entity organized in a foreign jurisdiction that is analogous to any of the entities referred to in paragraphs (a) to (d) or paragraph (i) [and in Ontario, paragraphs (a.1) to (d.1) or paragraph (i.1)] in form and function,"},
				{name: "canadaSDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaSDetail", kind: "lumberjack.ForeignBank"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaT", detail: "canadaT", content: "(t) a person in respect of which all of the owners of interests, direct, indirect or beneficial, except the voting securities required by law to be owned by directors, are persons that are accredited investors,"},
				{name: "canadaTDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaTDetail", kind: "lumberjack.CanadaT"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaU", detail: "canadaU", content: "(u) an investment fund that is advised by a person registered as an adviser or a person that is exempt from registration as an adviser,"},
				{name: "canadaUDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaUDetail", kind: "lumberjack.InvestmentFund"}
				]},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaCorporateV", detail: "canadaV", content: "(v) a person that is recognized or designated by the securities regulatory authority or, except in Ontario and Quebec, the regulator as an accredited investor,"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaCorporateV1", detail: "canadaV1", content: "(v.1) in Ontario, a person or company that is recognized or designated by the Commission as an accredited investor, or"},
				{kind:"lumberjack.ColumnCheckbox", name: "canadaW", detail: "canadaW", content: "(w) a trust established by an accredited investor for the benefit of the accredited investor’s family members of which a majority of the trustees are accredited investors and all of the beneficiaries are the accredited investor’s spouse, a former spouse of the accredited investor or a parent, grandparent, brother, sister, child or grandchild of that accredited investor, of that accredited investor’s spouse or of that accredited investor’s former spouse."},
				{name: "canadaWDrawer", kind: "enyo.Drawer", style: "margin-top: 10px; margin-left:10px; padding-left:15px;", components: [
					{name: "canadaWDetail", kind: "lumberjack.FamilyTrust"}
				]}
			]},
			{name: "canadaDefinitionsSection", style: "margin-top: 20px;", components: [
				{style: "font-weight: bold; font-size: 16px;", content: "Accredited Investor Status Definitions"},
				{tag: "ol", style: "list-style-type: lower-alpha;", components:[
					{tag: "li", content: '“bank” means a bank named in Schedule I or II of the Bank Act (Canada);'},
					{tag: "li", style: "margin-top: 10px;", content: '“Canadian financial institution” means (i) an association governed by the Cooperative Credit Associations Act (Canada) or a central cooperative credit society for which an order has been made under section 473(1) of that Act, or (ii) a bank, loan corporation, trust company, trust corporation, insurance company, treasury branch, credit union, caisse populaire, financial services cooperative, or league that, in each case, is authorized by an enactment of Canada or a jurisdiction of Canada to carry on business in Canada or a jurisdiction of Canada;'},
					{tag: "li", style: "margin-top: 10px;", content: '“company” means any corporation, incorporated association, incorporated syndicate or other incorporated organization;'},
					{tag: "li", style: "margin-top: 10px;", content: '“financial assets” means (i) cash, (ii) securities, or (iii) a contract of insurance, a deposit or an evidence of a deposit that is not a security for the purposes of securities legislation;'},
					{tag: "li", style: "margin-top: 10px;", content: '“fully managed account” means an account of a client for which a person makes the investment decisions if that person has full discretion to trade in securities for the account without requiring the client’s express consent to a transaction;'},
					{tag: "li", style: "margin-top: 10px;", content: '“investment fund” has the same meaning as in National Instrument 81-106 Investment Fund Continuous Disclosure;'},
					{tag: "li", style: "margin-top: 10px;", components: [
						{content: '"person" includes'},
						{tag: "ol", style: "list-style-type: lower-roman; margin-top: 10px;", components:[
							{tag: "li", style: "margin-top: 10px;", content: 'an individual,'},
							{tag: "li", style: "margin-top: 10px;", content: 'a corporation,'},
							{tag: "li", style: "margin-top: 10px;", content: 'a partnership, trust, fund and an association, syndicate, organization or other organized group of persons whether incorporated or not, and'},
							{tag: "li", style: "margin-top: 10px;", content: 'an individual or other person in that person’s capacity as a trustee, executor, administrator or personal or other legal representative;'}
						]}
					]},
					{tag: "li", style: "margin-top: 10px;", content: '“related liabilities” means (i) liabilities incurred or assumed for the purpose of financing the acquisition or ownership of financial assets, or (ii) liabilities that are secured by financial assets;'},
					{tag: "li", style: "margin-top: 10px;", content: '“Schedule III bank” means an authorized foreign bank named in Schedule III of the Bank Act (Canada);'},
					{tag: "li", style: "margin-top: 10px;", content: '“spouse” means, an individual who, (i) is married to another individual and is not living separate and apart within the meaning of the Divorce Act (Canada), from the other individual, (ii) is living with another individual in a marriage-like relationship, including a marriage-like relationship between individuals of the same gender, or (iii) in Alberta, is an individual referred to in paragraph (i) or (ii), or is an adult interdependent partner within the meaning of the Adult Interdependent Relationships Act (Alberta); and'},
					{tag: "li", style: "margin-top: 10px;", content: '“subsidiary” means an issuer that is controlled directly or indirectly by another issuer and includes a subsidiary of that subsidiary.'}
				]}
			]}
		]}
	],

	bindings:[
		{from: ".exemptionQualification", to: ".tempExemptionQualification", transform: function(v) {
			try
			{
				var tempArray = [];
				v.forEach(function(value, index, array){
					tempArray.push(value);
				});

				return tempArray;
			}
			catch(err)
			{
				return [];
			}
		}},
		{from: ".exemptionQualificationDetail", to: ".tempExemptionQualificationDetail", transform: function(v) {
			try
			{
				//Should be able to get away with parse/stringify here, since these are expected to be simple objects/array.
				if (v)
				{
					var cloned = JSON.parse(JSON.stringify(v));
					return cloned;
				}
				else
				{
					throw null;
				}

			}
			catch(err)
			{
				return {};
			}
		}},
		{from: ".showCanadaDefinitionsSection", to: ".$.canadaDefinitionsSection.showing"},
		{from: ".exemptionType", to: ".$.friendsAndFamilySection.showing", transform: function(v) {
			if (v === "friendsAndFamily") { setTimeout(enyo.bind(this, function() { this.resize(); }), 100); }
			return v === "friendsAndFamily";
		}},
		{from: ".exemptionType", to: ".$.accreditedInvestorSection.showing", transform: function(v) {
			if (v === "accreditedInvestor") { setTimeout(enyo.bind(this, function() { this.resize(); }), 100); }
			return v === "accreditedInvestor";
		}},
		{from: ".showUSAIndividualAccreditedInvestorSection", to: ".$.usaIndividualAccreditedInvestorSection.showing", transform: function(v) {
			if (v) { setTimeout(enyo.bind(this, function() { this.resize(); }), 100); }
			return v;
		}},
		{from: ".showUSACorporateAccreditedInvestorSection", to: ".$.usaCorporateAccreditedInvestorSection.showing", transform: function(v) {
			if (v) { setTimeout(enyo.bind(this, function() { this.resize(); }), 100); }
			return v;
		}},
		{from: ".showCanadaIndividualAccreditedInvestorSection", to: ".$.canadaIndividualAccreditedInvestorSection.showing", transform: function(v) {
			if (v) { setTimeout(enyo.bind(this, function() { this.resize(); }), 100); }
			return v;
		}},
		{from: ".showCanadaCorporateAccreditedInvestorSection", to: ".$.canadaCorporateAccreditedInvestorSection.showing", transform: function(v) {
			if (v) { setTimeout(enyo.bind(this, function() { this.resize(); }), 100); }
			return v;
		}},
		{from: ".showInstructions", to: ".$.accreditedInvestorInstructionsLabel.showing"},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyA.checked", transform: function(v) { try { return v.indexOf("ffA") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyB.checked", transform: function(v) { try { return v.indexOf("ffB") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyC.checked", transform: function(v) { try { return v.indexOf("ffC") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyD.checked", transform: function(v) { try { return v.indexOf("ffD") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyE.checked", transform: function(v) { try { return v.indexOf("ffE") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyF.checked", transform: function(v) { try { return v.indexOf("ffF") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyG.checked", transform: function(v) { try { return v.indexOf("ffG") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyH.checked", transform: function(v) { try { return v.indexOf("ffH") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.friendsAndFamilyI.checked", transform: function(v) { try { return v.indexOf("ffI") > -1; } catch (err) { return false; }}},
		{from: ".friendsAndFamilyDetail", to: ".$.friendsAndFamilyRelationshipTypePicker.selected", transform: function(val){
			try
			{
				if (val.relationshipType != null && val.relationshipType !== "")
				{
					var control = this.$.friendsAndFamilyRelationshipTypePicker.controls.find(function(element, index, array) { return element.value === val.relationshipType; });
					if (control != null) { return control; }
					else
					{
						console.log('Relationship Type "' + val.relationshipType + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.friendsAndFamilyRelationshipTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".friendsAndFamilyDetail", to: ".$.friendsAndFamilyFamilyMemberPicker.selected", transform: function(val){
			try
			{
				if (val.familyMemberRelationship != null && val.familyMemberRelationship !== "")
				{
					var control = this.$.friendsAndFamilyFamilyMemberPicker.controls.find(function(element, index, array) { return element.value === val.familyMemberRelationship; });
					if (control != null) { return control; }
					else
					{
						console.log('Family Member Relationship Type "' + val.familyMemberRelationship + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.friendsAndFamilyFamilyMemberPicker.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".friendsAndFamilyDetail", to: ".$.friendsAndFamilyNonFamilyMemberTimeKnownInput.value", transform: function(v){try {return v.yearsKnown || "";} catch (err){return "";}}},
		{from: ".friendsAndFamilyDetail", to: ".$.friendsAndFamilyBusinessAssociateDetailTextArea.value", transform: function(v){try {return v.relationshipDetail || "";} catch (err){return "";}}},
		{from: ".$.friendsAndFamilyRelationshipTypePicker.selected", to: ".friendsAndFamilyRelationshipType", transform: function(v){return v ? v.value : "";}},
		{from: ".$.friendsAndFamilyFamilyMemberPicker.selected", to: ".friendsAndFamilyFamilyMemberType", transform: function(v){return v ? v.value : "";}},
		{from: ".friendsAndFamilyRelationshipType", to: ".$.friendsAndFamilyFamilyMemberSection.showing", transform: function(v){if (v) {setTimeout(enyo.bind(this, function(){this.resize();}), 100);} return v === "family";}},
		{from: ".friendsAndFamilyRelationshipType", to: ".$.friendsAndFamilyNonFamilyMemberSection.showing", transform: function(v){if (v) {setTimeout(enyo.bind(this, function(){this.resize();}), 100);} return v !== "" && v !== "family";}},
		{from: ".friendsAndFamilyRelationshipType", to: ".$.friendsAndFamilyBusinessAssociateSection.showing", transform: function(v){if (v) {setTimeout(enyo.bind(this, function(){this.resize();}), 100);} return v === "businessAssociate";}},
		{from: ".tempExemptionQualification", to: ".$.usa5A.checked", transform: function(v) { try { return v.indexOf("usa5A") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa5B.checked", transform: function(v) { try { return v.indexOf("usa5B") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa6A.checked", transform: function(v) { try { return v.indexOf("usa6A") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa6B.checked", transform: function(v) { try { return v.indexOf("usa6B") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa6C.checked", transform: function(v) { try { return v.indexOf("usa6C") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa6D.checked", transform: function(v) { try { return v.indexOf("usa6D") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa6E.checked", transform: function(v) { try { return v.indexOf("usa6E") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.usa6F.checked", transform: function(v) { try { return v.indexOf("usa6F") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.usa6FDetail.usa6Fs", transform: function(v) { try { return v.usa6F || []; } catch (err) { return []; }}},
		{from: ".$.usa6FDetail.tempUsa6Fs", to: ".tempExemptionQualificationDetail.usa6F"},
		{from: ".tempExemptionQualification", to: ".$.canadaIndividualD.checked", transform: function(v) { try { return v.indexOf("canadaD") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaIndividualDDetail.advisorDealers", transform: function(v) { try { return v.canadaD || []; } catch (err) { return []; }}},
		{from: ".$.canadaIndividualDDetail.tempAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaD"},
		{from: ".tempExemptionQualification", to: ".$.canadaIndividualD1.checked", transform: function(v) { try { return v.indexOf("canadaD1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaIndividualD1Detail.advisorDealers", transform: function(v) { try { return v.canadaD1 || []; } catch (err) { return []; }}},
		{from: ".$.canadaIndividualD1Detail.tempAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaD1"},
		{from: ".tempExemptionQualification", to: ".$.canadaE.checked", transform: function(v) { try { return v.indexOf("canadaE") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaEDetail.advisorDealers", transform: function(v) { try { return v.canadaE || []; } catch (err) { return []; }}},
		{from: ".$.canadaEDetail.tempAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaE"},
		{from: ".tempExemptionQualification", to: ".$.canadaE1.checked", transform: function(v) { try { return v.indexOf("canadaE1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaJ.checked", transform: function(v) { try { return v.indexOf("canadaJ") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaJ1.checked", transform: function(v) { try { return v.indexOf("canadaJ1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaK.checked", transform: function(v) { try { return v.indexOf("canadaK") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaK1.checked", transform: function(v) { try { return v.indexOf("canadaK1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaL.checked", transform: function(v) { try { return v.indexOf("canadaL") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaIndividualQ.checked", transform: function(v) { try { return v.indexOf("canadaQ") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaIndividualQDetail.foreignAdvisorDealers", transform: function(v) { try { return v.canadaQ || []; } catch (err) { return []; }}},
		{from: ".$.canadaIndividualQDetail.tempForeignAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaQ"},
		{from: ".tempExemptionQualification", to: ".$.canadaIndividualV.checked", transform: function(v) { try { return v.indexOf("canadaV") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaIndividualV1.checked", transform: function(v) { try { return v.indexOf("canadaV1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaA.checked", transform: function(v) { try { return v.indexOf("canadaA") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaA1.checked", transform: function(v) { try { return v.indexOf("canadaA1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaB.checked", transform: function(v) { try { return v.indexOf("canadaB") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaB1.checked", transform: function(v) { try { return v.indexOf("canadaB1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaC.checked", transform: function(v) { try { return v.indexOf("canadaC") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaC1.checked", transform: function(v) { try { return v.indexOf("canadaC1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaCorporateD.checked", transform: function(v) { try { return v.indexOf("canadaD") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaCorporateDDetail.advisorDealers", transform: function(v) { try { return v.canadaD || []; } catch (err) { return []; }}},
		{from: ".$.canadaCorporateDDetail.tempAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaD"},
		{from: ".tempExemptionQualification", to: ".$.canadaCorporateD1.checked", transform: function(v) { try { return v.indexOf("canadaD1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaCorporateD1Detail.advisorDealers", transform: function(v) { try { return v.canadaD1 || []; } catch (err) { return []; }}},
		{from: ".$.canadaCorporateD1Detail.tempAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaD1"},
		{from: ".tempExemptionQualification", to: ".$.canadaF.checked", transform: function(v) { try { return v.indexOf("canadaF") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaF1.checked", transform: function(v) { try { return v.indexOf("canadaF1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaG.checked", transform: function(v) { try { return v.indexOf("canadaG") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaH.checked", transform: function(v) { try { return v.indexOf("canadaH") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaI.checked", transform: function(v) { try { return v.indexOf("canadaI") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaIDetail.pensionFunds", transform: function(v) { try { return v.canadaI || []; } catch (err) { return []; }}},
		{from: ".$.canadaIDetail.tempPensionFunds", to: ".tempExemptionQualificationDetail.canadaI"},
		{from: ".tempExemptionQualification", to: ".$.canadaI1.checked", transform: function(v) { try { return v.indexOf("canadaI1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaI1Detail.pensionFunds", transform: function(v) { try { return v.canadaI1 || []; } catch (err) { return []; }}},
		{from: ".$.canadaI1Detail.tempPensionFunds", to: ".tempExemptionQualificationDetail.canadaI1"},
		{from: ".tempExemptionQualification", to: ".$.canadaM.checked", transform: function(v) { try { return v.indexOf("canadaM") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaMDetail.largeAssetNonIndividual", transform: function(v) { try { return v.canadaM || {}; } catch (err) { return {}; }}},
		{from: ".$.canadaMDetail.tempLargeAssetNonIndividual", to: ".tempExemptionQualificationDetail.canadaM"},
		{from: ".tempExemptionQualification", to: ".$.canadaN.checked", transform: function(v) { try { return v.indexOf("canadaN") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaO.checked", transform: function(v) { try { return v.indexOf("canadaO") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaP.checked", transform: function(v) { try { return v.indexOf("canadaP") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaPDetail.trustCompanies", transform: function(v) { try { return v.canadaP || []; } catch (err) { return []; }}},
		{from: ".$.canadaPDetail.tempTrustCompanies", to: ".tempExemptionQualificationDetail.canadaP"},
		{from: ".tempExemptionQualification", to: ".$.canadaCorporateQ.checked", transform: function(v) { try { return v.indexOf("canadaQ") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaCorporateQDetail.foreignAdvisorDealers", transform: function(v) { try { return v.canadaQ || []; } catch (err) { return []; }}},
		{from: ".$.canadaCorporateQDetail.tempForeignAdvisorDealers", to: ".tempExemptionQualificationDetail.canadaQ"},
		{from: ".tempExemptionQualification", to: ".$.canadaR.checked", transform: function(v) { try { return v.indexOf("canadaR") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaRDetail.charity", transform: function(v) { try { return v.canadaR || {}; } catch (err) { return {}; }}},
		{from: ".$.canadaRDetail.tempCharity", to: ".tempExemptionQualificationDetail.canadaR"},
		{from: ".tempExemptionQualification", to: ".$.canadaS.checked", transform: function(v) { try { return v.indexOf("canadaS") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaSDetail.foreignBank", transform: function(v) { try { return v.canadaS || {}; } catch (err) { return {}; }}},
		{from: ".$.canadaSDetail.tempForeignBank", to: ".tempExemptionQualificationDetail.canadaS"},
		{from: ".tempExemptionQualification", to: ".$.canadaT.checked", transform: function(v) { try { return v.indexOf("canadaT") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaTDetail.canadaTs", transform: function(v) { try { return v.canadaT || []; } catch (err) { return []; }}},
		{from: ".$.canadaTDetail.tempCanadaTs", to: ".tempExemptionQualificationDetail.canadaT"},
		{from: ".tempExemptionQualification", to: ".$.canadaU.checked", transform: function(v) { try { return v.indexOf("canadaU") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaUDetail.investmentFund", transform: function(v) { try { return v.canadaU || {}; } catch (err) { return {}; }}},
		{from: ".$.canadaUDetail.tempInvestmentFund", to: ".tempExemptionQualificationDetail.canadaU"},
		{from: ".tempExemptionQualification", to: ".$.canadaCorporateV.checked", transform: function(v) { try { return v.indexOf("canadaV") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaCorporateV1.checked", transform: function(v) { try { return v.indexOf("canadaV1") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualification", to: ".$.canadaW.checked", transform: function(v) { try { return v.indexOf("canadaW") > -1; } catch (err) { return false; }}},
		{from: ".tempExemptionQualificationDetail", to: ".$.canadaWDetail.trust", transform: function(v) { try { return v.canadaW || {}; } catch (err) { return {}; }}},
		{from: ".$.canadaWDetail.tempTrust", to: ".tempExemptionQualificationDetail.canadaW"},
		//Detail Drawers
		{from:".$.canadaIndividualD.checked", to:".$.canadaIndividualDDrawer.open"},
		{from:".$.canadaCorporateD.checked", to:".$.canadaCorporateDDrawer.open"},
		{from:".$.canadaIndividualD1.checked", to:".$.canadaIndividualD1Drawer.open"},
		{from:".$.canadaCorporateD1.checked", to:".$.canadaCorporateD1Drawer.open"},
		{from:".$.canadaE.checked", to:".$.canadaEDrawer.open"},
		{from:".$.canadaI.checked", to:".$.canadaIDrawer.open"},
		{from:".$.canadaI1.checked", to:".$.canadaI1Drawer.open"},
		{from:".$.canadaM.checked", to:".$.canadaMDrawer.open"},
		{from:".$.canadaP.checked", to:".$.canadaPDrawer.open"},
		{from:".$.canadaIndividualQ.checked", to:".$.canadaIndividualQDrawer.open"},
		{from:".$.canadaCorporateQ.checked", to:".$.canadaCorporateQDrawer.open"},
		{from:".$.canadaR.checked", to:".$.canadaRDrawer.open"},
		{from:".$.canadaS.checked", to:".$.canadaSDrawer.open"},
		{from:".$.canadaT.checked", to:".$.canadaTDrawer.open"},
		{from:".$.canadaU.checked", to:".$.canadaUDrawer.open"},
		{from:".$.canadaW.checked", to:".$.canadaWDrawer.open"},
		{from:".$.usa6F.checked", to:".$.usa6FDrawer.open"},
		{from: ".tempExemptionQualification", to: ".checkedBoxes", transform: function(v){var result = []; v.forEach(function(value, index, array){result.push(value);}); return result;}}
	],

	create: function(){
		this.inherited(arguments);
		this.set("exemptionQualification", []); //Can't define this as an empty array thanks to Javascript.
		this.set("exemptionQualificationDetail", {}); //Can't define this as an empty object thanks to Javascript.
		this.set("checkedBoxes", []);
	},

	jurisdictionChanged: function(oldVal, newVal)
	{
		//If !oldVal do nothing. This value starts as null when loading the object, so we're only interested in a change if we're changing between values.
		//Reset all of the values if we change any of this.
		if (oldVal)
		{
			this.set("exemptionQualification", []); //Can't define this as an empty array thanks to Javascript.
			this.set("exemptionQualificationDetail", {}); //Can't define this as an empty object thanks to Javascript.
			this.set("checkedBoxes", []);
		}
	},

	exemptionTypeChanged: function(oldVal, newVal)
	{
		//If !oldVal do nothing. This value starts as null when loading the object, so we're only interested in a change if we're changing between values.
		//Reset all of the values if we change any of this.
		if (oldVal)
		{
			this.set("exemptionQualification", []); //Can't define this as an empty array thanks to Javascript.
			this.set("exemptionQualificationDetail", {}); //Can't define this as an empty object thanks to Javascript.
			this.set("checkedBoxes", []);
		}
	},

	investorTypeChanged: function(oldVal, newVal)
	{
		//If !oldVal do nothing. This value starts as null when loading the object, so we're only interested in a change if we're changing between values.
		//Reset all of the values if we change any of this.
		if (oldVal)
		{
			this.set("exemptionQualification", []); //Can't define this as an empty array thanks to Javascript.
			this.set("exemptionQualificationDetail", {}); //Can't define this as an empty object thanks to Javascript.
			this.set("checkedBoxes", []);
		}
	},

	friendsAndFamilyRelationshipTypeChanged: function(oldVal, newVal)
	{
		if (oldVal === "") {return;} //Assume that if the old val is blank, we are initializing, and don't need to reset.

		if (oldVal !== newVal)
		{
			try
			{
				var detailObject = this.friendsAndFamilyDetail();
				detailObject.relationshipType = newVal;
				this.$.friendsAndFamilyFamilyMemberPicker.set("selected", null);
				this.$.friendsAndFamilyFamilyMemberPickerButton.set("content", "Select");
				this.$.friendsAndFamilyNonFamilyMemberTimeKnownInput.set("value", "");
				this.$.friendsAndFamilyBusinessAssociateDetailTextArea.set("value", "");
				this.calculateFriendsAndFamilyStatus();
			}
			catch (err)
			{
				//Panic? Do Nothing.
				//If this is exceptioning, it is probably because we are in the process of resetting.
				//In that case, just let it go. Poor programming, but the right thing to do would be to remove and recreate the object rather than just reset the properties.
				//However, that will take too much work.
			}
		}

	},

	friendsAndFamilyFamilyMemberTypeChanged: function(oldVal, newVal)
	{
		if (oldVal === "") {return;} //Assume that if the old val is blank, we are initializing, and don't need to reset.

		if (oldVal !== newVal)
		{
			try
			{
				var detailObject = this.friendsAndFamilyDetail();
				detailObject.familyMemberRelationship = newVal;
				this.calculateFriendsAndFamilyStatus();
			}
			catch (err)
			{
				//Panic? Do Nothing.
				//Same as friendsAndFamilyRelationshipTypeChanged. See above.
			}
		}
	},

	calculateFriendsAndFamilyStatus: function()
	{
		var friendsAndFamilyQualification;
		var qualificationDetail = this.friendsAndFamilyDetail();

		//Do some fun branching logic to figure out what the appropriate friendsAndFamilyQualification is.
		//First, switch on individual/corporate subscription type.
		if (this.investorType === "individual")
		{
			//Now, we can use (b)-(g). (a) needs to be validated manually.
			//Test for founders
			if (this.salespersonDetail.salespersonRole === "founder")
			{
				//Valid options are (f) and (g)
				if (qualificationDetail.relationshipType !== "family")
				{
					//Must be (f) in this case.
					friendsAndFamilyQualification = "friendsAndFamilyF";
				}
				else
				{
					if (qualificationDetail.familyMemberRelationship === "spouse" || qualificationDetail.familyMemberRelationship.indexOf("spouse") === -1)
					{
						friendsAndFamilyQualification = "friendsAndFamilyF";
					}
					else
					{
						friendsAndFamilyQualification = "friendsAndFamilyG";
					}
				}
			}
			else
			{
				//Valid options are (b), (c), (d), and (e)
				if (qualificationDetail.relationshipType === "family")
				{
					//Valid options are (b) and (c)
					if (qualificationDetail.familyMemberRelationship === "spouse" || qualificationDetail.familyMemberRelationship.indexOf("spouse") === -1)
					{
						friendsAndFamilyQualification = "friendsAndFamilyB";
					}
					else
					{
						friendsAndFamilyQualification = "friendsAndFamilyC";
					}
				}
				else if (qualificationDetail.relationshipType === "friend")
				{
					friendsAndFamilyQualification = "friendsAndFamilyD";
				}
				else if (qualificationDetail.relationshipType === "businessAssociate")
				{
					friendsAndFamilyQualification = "friendsAndFamilyE";
				}
			}
		}
		else
		{
			//Valid options here are (h). (g) will need to be validated manually.
			friendsAndFamilyQualification = "friendsAndFamilyH";
		}

		this.$[friendsAndFamilyQualification].set("checked", true);
		//Do this here instead of the checkedchanged handler, since that event doesn't get fired when we set the checkbox manually.
		//If this stuff is firing, we assume that everything else is set up correctly.
		var oldVal = this.tempExemptionQualification[0];
		var newVal = this.$[friendsAndFamilyQualification].detail;
		
		//If we don't do this check, we will accidentally delete the exemption qualification that we want to keep.
		if (oldVal !== newVal)
		{
			this.tempExemptionQualification[0] = newVal; //Update array
			this.tempExemptionQualificationDetail[newVal] = this.tempExemptionQualificationDetail[oldVal]; //Update ref
			delete this.tempExemptionQualificationDetail[oldVal]; //Replace
			this.set("checkedBoxes", this.getAccreditedInvestorQualification()); //Finally, set checked boxes.
		}
	},

	isDirty: function()
	{
		return (JSON.stringify(this.get("exemptionQualification")) !== JSON.stringify(this.get("tempExemptionQualification"))) || (JSON.stringify(this.get("exemptionQualificationDetail")) !== JSON.stringify(this.getAccreditedInvestorQualificationDetail()));
	},

	validate: function()
	{
		var validated = true;

		if (this.get("tempExemptionQualification").length === 0)
		{
			validated = false;
			this.flagInvalid();
		}

		//Test AccreditedInvestor vs Friends and Family
		if (this.get("exemptionType") === "accreditedInvestor")
		{
			Object.keys(this.get("tempExemptionQualificationDetail")).forEach(enyo.bind(this, function(value, index, array){
				if (this.get("tempExemptionQualification").indexOf(value) === -1)
				{
					//Ignore things that we're not testing for.
					return;
				}

				switch (value)
				{
					case "canadaD":
						if (this.get("investorType") === "individual")
						{
							if (!this.$.canadaIndividualDDetail.validate())
							{
								validated = false;
							}
						}
						else
						{
							if (!this.$.canadaCorporateDDetail.validate())
							{
								validated = false;
							}
						}
						break;
					case "canadaD1":
						if (this.get("investorType") === "individual")
						{
							if (!this.$.canadaIndividualD1Detail.validate())
							{
								validated = false;
							}
						}
						else
						{
							if (!this.$.canadaCorporateD1Detail.validate())
							{
								validated = false;
							}
						}
						break;
					case "canadaE":
						if (!this.$.canadaEDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaI":
						if (!this.$.canadaIDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaI1":
						if (!this.$.canadaI1Detail.validate())
						{
							validated = false;
						}
						break;
					case "canadaM":
						if (!this.$.canadaMDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaP":
						if (!this.$.canadaPDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaQ":
						if (this.get("investorType") === "individual")
						{
							if (!this.$.canadaIndividualQDetail.validate())
							{
								validated = false;
							}
						}
						else
						{
							if (!this.$.canadaCorporateQDetail.validate())
							{
								validated = false;
							}
						}
						break;
					case "canadaR":
						if (!this.$.canadaRDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaS":
						if (!this.$.canadaSDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaT":
						if (!this.$.canadaTDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaU":
						if (!this.$.canadaUDetail.validate())
						{
							validated = false;
						}
						break;
					case "canadaW":
						if (!this.$.canadaWDetail.validate())
						{
							validated = false;
						}
						break;
					case "usa6F":
						if (!this.$.usa6FDetail.validate())
						{
							validated = false;
						}
						break;				
				}
			}));
		}
		else if (this.get("exemptionType") === "friendsAndFamily")
		{
			if (this.get("tempExemptionQualification").length > 1)
			{
				validated = false;
				this.flagInvalid();
			}

			if (!this.friendsAndFamilyRelationshipType)
			{
				this.$.friendsAndFamilyRelationshipTypePickerDecorator.applyStyle("border", "2px solid red");
				validated = false;
			}
			else
			{
				if (this.friendsAndFamilyRelationshipType === "family")
				{
					if (this.$.friendsAndFamilyFamilyMemberPicker.get("selected") === null)
					{
						this.$.friendsAndFamilyFamilyMemberPickerDecorator.applyStyle("border", "2px solid red");
						validated = false;
					}
				}
				else
				{
					if (!numeral(this.$.friendsAndFamilyNonFamilyMemberTimeKnownInput.get("value")).value()) //This will also catch "" and 0 b/c Javascript
					{
						this.$.friendsAndFamilyNonFamilyMemberTimeKnownInputDecorator.applyStyle("border", "2px solid red");
						validated = false;
					}

					if (this.friendsAndFamilyRelationshipType === "businessAssociate" && this.$.friendsAndFamilyBusinessAssociateDetailTextArea.get("value") === "")
					{
						this.$.friendsAndFamilyBusinessAssociateDetailTextAreaDecorator.applyStyle("border", "2px solid red");
						validated = false;
					}
				}
			}
		}

		return validated;
	},

	getCheckboxControls: function()
	{
		return [
			// this.$.friendsAndFamilyA,
			// this.$.friendsAndFamilyB,
			// this.$.friendsAndFamilyC,
			// this.$.friendsAndFamilyD,
			// this.$.friendsAndFamilyE,
			// this.$.friendsAndFamilyF,
			// this.$.friendsAndFamilyG,
			// this.$.friendsAndFamilyH,
			// this.$.friendsAndFamilyI,
			this.$.usa5A,
			this.$.usa5B,
			this.$.usa6A,
			this.$.usa6B,
			this.$.usa6C,
			this.$.usa6D,
			this.$.usa6E,
			this.$.usa6F,
			this.$.canadaIndividualD,
			this.$.canadaIndividualD1,
			this.$.canadaE,
			this.$.canadaE1,
			this.$.canadaJ,
			this.$.canadaJ1,
			this.$.canadaK,
			this.$.canadaK1,
			this.$.canadaL,
			this.$.canadaIndividualQ,
			this.$.canadaIndividualV,
			this.$.canadaIndividualV1,
			this.$.canadaA,
			this.$.canadaA1,
			this.$.canadaB,
			this.$.canadaB1,
			this.$.canadaC,
			this.$.canadaC1,
			this.$.canadaCorporateD,
			this.$.canadaCorporateD1,
			this.$.canadaF,
			this.$.canadaF1,
			this.$.canadaG,
			this.$.canadaH,
			this.$.canadaI,
			this.$.canadaI1,
			this.$.canadaM,
			this.$.canadaN,
			this.$.canadaO,
			this.$.canadaP,
			this.$.canadaCorporateQ,
			this.$.canadaR,
			this.$.canadaS,
			this.$.canadaT,
			this.$.canadaU,
			this.$.canadaCorporateV,
			this.$.canadaCorporateV1,
			this.$.canadaW
		];
	},

	getDetailControls: function()
	{
		return [
			this.$.usa6FDetail,
			this.$.canadaCorporateDDetail,
			this.$.canadaIndividualDDetail,
			this.$.canadaCorporateD1Detail,
			this.$.canadaIndividualD1Detail,
			this.$.canadaEDetail,
			this.$.canadaIDetail,
			this.$.canadaI1Detail,
			this.$.canadaMDetail,
			this.$.canadaPDetail,
			this.$.canadaCorporateQDetail,
			this.$.canadaIndividualQDetail,
			this.$.canadaRDetail,
			this.$.canadaSDetail,
			this.$.canadaTDetail,
			this.$.canadaUDetail,
			this.$.canadaWDetail
		];
	},

	// Computed Functions
	// showUSAIndividualAccreditedInvestorSection: ["exemptionType", "jurisdiction", "investorType"],
	showUSAIndividualAccreditedInvestorSection: function()
	{
		return this.get("exemptionType") === "accreditedInvestor" && this.get("jurisdiction") === "usa" && this.get("investorType") === "individual";
	},

	// showUSACorporateAccreditedInvestorSection: ["exemptionType", "jurisdiction", "investorType"],
	showUSACorporateAccreditedInvestorSection: function()
	{
		return this.get("exemptionType") === "accreditedInvestor" && this.get("jurisdiction") === "usa" && this.get("investorType") === "corporate";
	},

	// showCanadaIndividualAccreditedInvestorSection: ["mode", "exemptionType", "jurisdiction", "investorType"],
	showCanadaIndividualAccreditedInvestorSection: function()
	{
		return this.get("exemptionType") === "accreditedInvestor" && (this.get("jurisdiction") === "canada" || this.get("jurisdiction") === "international") && this.get("investorType") === "individual";
	},

	// showCanadaCorporateAccreditedInvestorSection: ["mode", "exemptionType", "jurisdiction", "investorType"]
	showCanadaCorporateAccreditedInvestorSection: function()
	{
		return this.get("exemptionType") === "accreditedInvestor" && (this.get("jurisdiction") === "canada" || this.get("jurisdiction") === "international") && this.get("investorType") === "corporate";
	},

	// showCanadaDefinitionsSection: ["mode", "exemptionType", "jurisdiction"]
	showCanadaDefinitionsSection: function()
	{
		return this.get("exemptionType") === "accreditedInvestor" && (this.get("jurisdiction") === "canada" || this.get("jurisdiction") === "international");
	},

	//friendsAndFamilyDetail: ["tempExemptionQualification", "tempExemptionQualificationDetail", "exemptionType"]
	friendsAndFamilyDetail: function()
	{
		if (this.exemptionType !== "friendsAndFamily")
		{
			return null;
		}

		if (this.tempExemptionQualification.length !== 1)
		{
			return null;
		}

		return this.tempExemptionQualificationDetail[this.tempExemptionQualification[0]];
	},

	//Reset on jurisdiction and mode changes

	setDisabledForRoles: function(disState)
	{
		this.getCheckboxControls().forEach(function(currentValue) {
			currentValue.set("disabled", disState);
		});

		this.getDetailControls().forEach(function(currentValue) {
			currentValue.set("disabled", disState);
		});

		this.$.friendsAndFamilyRelationshipTypePickerButton.set("disabled", disState);
		this.$.friendsAndFamilyFamilyMemberPickerButton.set("disabled", disState);
		this.$.friendsAndFamilyNonFamilyMemberTimeKnownInput.set("disabled", disState);
		this.$.friendsAndFamilyBusinessAssociateDetailTextArea.set("disabled", disState);
	},

	clearBorderError: function()
	{
		this.getCheckboxControls().forEach(function(currentValue) {
			currentValue.clearBorderError();
		});

		this.$.friendsAndFamilyRelationshipTypePickerDecorator.applyStyle("border", null);
		this.$.friendsAndFamilyFamilyMemberPickerDecorator.applyStyle("border", null);
		this.$.friendsAndFamilyNonFamilyMemberTimeKnownInputDecorator.applyStyle("border", null);
		this.$.friendsAndFamilyBusinessAssociateDetailTextAreaDecorator.applyStyle("border", null);
	},

	flagInvalid: function()
	{
		this.getCheckboxControls().forEach(function(currentValue) {
			currentValue.setBorderError();
		});

		this.$.friendsAndFamilyA.setBorderError();
		this.$.friendsAndFamilyB.setBorderError();
		this.$.friendsAndFamilyC.setBorderError();
		this.$.friendsAndFamilyD.setBorderError();
		this.$.friendsAndFamilyE.setBorderError();
		this.$.friendsAndFamilyF.setBorderError();
		this.$.friendsAndFamilyG.setBorderError();
		this.$.friendsAndFamilyH.setBorderError();
		this.$.friendsAndFamilyI.setBorderError();
	},

	getAccreditedInvestorQualification: function()
	{
		return this.get("tempExemptionQualification");
	},

	getAccreditedInvestorQualificationDetail: function()
	{
		var requiresMoreDetailQualification = ["ffA", "ffB", "ffC", "ffD", "ffE", "ffF", "ffG", "ffH", "ffI", "usa6F", "canadaD", "canadaD1", "canadaE", "canadaI", "canadaI1", "canadaM", "canadaP", "canadaQ", "canadaR", "canadaS", "canadaT", "canadaU", "canadaW"];

		var returnValue = JSON.parse(JSON.stringify(this.get("tempExemptionQualificationDetail"))); //Another clone so that we don't break anything with the "real" array
		Object.keys(returnValue).forEach(enyo.bind(this, function(value, index, array){
			if (this.get("tempExemptionQualification").indexOf(value) === -1 || requiresMoreDetailQualification.indexOf(value) === -1)
			{
				delete returnValue[value];
			}
		}));

		return returnValue;
	},

	handleCheckboxChanged: function(inSender, inEvent)
	{
		var requiresMoreDetailQualification = ["usa6F", "canadaD", "canadaD1", "canadaE", "canadaI", "canadaI1", "canadaM", "canadaP", "canadaQ", "canadaR", "canadaS", "canadaT", "canadaU", "canadaW"];

		//Switch on inEvent.originator.owner.detail
		if (inEvent.originator.get("checked") && this.get("tempExemptionQualification").indexOf(inEvent.originator.owner.detail) === -1)
		{
			this.get("tempExemptionQualification").push(inEvent.originator.owner.detail);
		}
		else if (!inEvent.originator.get("checked") && this.get("tempExemptionQualification").indexOf(inEvent.originator.owner.detail) !== -1)
		{
			this.get("tempExemptionQualification").splice(this.get("tempExemptionQualification").indexOf(inEvent.originator.owner.detail), 1);
		}

		if (requiresMoreDetailQualification.indexOf(inEvent.originator.owner.detail) !== -1)
		{
			if (!inEvent.originator.get("checked"))
			{
				delete this.get("tempExemptionQualificationDetail")[inEvent.originator.owner.detail];
			}
			else
			{
				switch (inEvent.originator.owner.detail)
				{
					case "canadaD":
						if (this.get("investorType") === "individual")
						{
							this.$.canadaIndividualDDetail.set("advisorDealers", []);
							this.get("tempExemptionQualificationDetail").canadaD = this.$.canadaIndividualDDetail.get("tempAdvisorDealers");
						}
						else
						{
							this.$.canadaCorporateDDetail.set("advisorDealers", []);
							this.get("tempExemptionQualificationDetail").canadaD = this.$.canadaCorporateDDetail.get("tempAdvisorDealers");
						}
						break;
					case "canadaD1":
						if (this.get("investorType") === "individual")
						{
							this.$.canadaIndividualD1Detail.set("advisorDealers", []);
							this.get("tempExemptionQualificationDetail").canadaD1 = this.$.canadaIndividualD1Detail.get("tempAdvisorDealers");
						}
						else
						{
							this.$.canadaCorporateD1Detail.set("advisorDealers", []);
							this.get("tempExemptionQualificationDetail").canadaD1 = this.$.canadaCorporateD1Detail.get("tempAdvisorDealers");
						}
						break;
					case "canadaE":
						this.$.canadaEDetail.set("advisorDealers", []);
						this.get("tempExemptionQualificationDetail").canadaE = this.$.canadaEDetail.get("tempAdvisorDealers");
						break;
					case "canadaI":
						this.$.canadaIDetail.set("pensionFunds", []);
						this.get("tempExemptionQualificationDetail").canadaI = this.$.canadaIDetail.get("tempPensionFunds");
						break;
					case "canadaI1":
						this.$.canadaI1Detail.set("pensionFunds", []);
						this.get("tempExemptionQualificationDetail").canadaI1 = this.$.canadaI1Detail.get("tempPensionFunds");
						break;
					case "canadaM":
						this.$.canadaMDetail.set("largeAssetNonIndividual", {});
						this.get("tempExemptionQualificationDetail").canadaM = this.$.canadaMDetail.get("tempLargeAssetNonIndividual");
						break;
					case "canadaP":
						this.$.canadaPDetail.set("trustCompanies", []);
						this.get("tempExemptionQualificationDetail").canadaP = this.$.canadaPDetail.get("tempTrustCompanies");
						break;
					case "canadaQ":
						if (this.get("investorType") === "individual")
						{
							this.$.canadaIndividualQDetail.set("foreignAdvisorDealers", []);
							this.get("tempExemptionQualificationDetail").canadaQ = this.$.canadaIndividualQDetail.get("tempForeignAdvisorDealers");
						}
						else
						{
							this.$.canadaCorporateQDetail.set("foreignAdvisorDealers", []);
							this.get("tempExemptionQualificationDetail").canadaQ = this.$.canadaCorporateQDetail.get("tempForeignAdvisorDealers");
						}
						break;
					case "canadaR":
						this.$.canadaRDetail.set("charity", {});
						this.$.canadaRDetail.render(); //Do an explicit render to force the render handler to fire, to make sure that all arrays are mapped properly.
						this.get("tempExemptionQualificationDetail").canadaR = this.$.canadaRDetail.get("tempCharity");
						break;
					case "canadaS":
						this.$.canadaSDetail.set("foreignBank", {});
						this.get("tempExemptionQualificationDetail").canadaS = this.$.canadaSDetail.get("tempForeignBank");
						break;
					case "canadaT":
						this.$.canadaTDetail.set("canadaTs", []);
						this.get("tempExemptionQualificationDetail").canadaT = this.$.canadaTDetail.get("tempCanadaTs");
						break;
					case "canadaU":
						this.$.canadaUDetail.set("investmentFund", {});
						this.get("tempExemptionQualificationDetail").canadaU = this.$.canadaUDetail.get("tempInvestmentFund");
						break;
					case "canadaW":
						this.$.canadaWDetail.set("familyTrust", {});
						this.get("tempExemptionQualificationDetail").canadaW = this.$.canadaWDetail.get("tempTrust");
						break;
					case "usa6F":
						this.$.usa6FDetail.set("usa6Fs", []);
						this.get("tempExemptionQualificationDetail").usa6F = this.$.usa6FDetail.get("tempUsa6Fs");
						break;
				}
			}
		}

		this.set("checkedBoxes", this.getAccreditedInvestorQualification());
	}
});