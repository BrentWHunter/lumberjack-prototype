enyo.kind({
	name: "quantum.PlacementInfoPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		placementInfo: null,
		database: null,
		companyLogoImage: "",
		paymentInstructionsFileName: "Payment Instructions.pdf",
		supportingDocumentsFileName: "Supporting Documents.pdf",
		directorsCollection: [],
		restrictiveLegendsCollection: [],
		usersToNotifyCollection: [],
		documentNamesCollection: ["usaSubscription.docx", "canadaSubscription.docx", "internationalSubscription.docx"],
		closingDocumentCollection: [],
		closingDocumentNamesCollection: [	"Unsigned - Subscription Acceptance.docx", "Unsigned - Directors Resolution.docx", "Unsigned - Treasury Order.docx",
											"Signed - Subscription Acceptance.pdf", "Signed - Directors Resolution.pdf", "Signed - Treasury Order.pdf",
											"Completed Subscribers Computershare Template.xlsx","Completed Subscribers List.csv","Completed Subscribers List (Canada).csv","Completed Subscribers List (USA).csv"],
		documentsToUpload: {},
		paymentInstructionsToUpload: null,
		supportingDocumentsToUpload: null
	},

	events: {
		onGoHome: "",
		onLogout: ""
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Placement Information"},
			{fit: true},
			{components: [
				{name: "savePlacementButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Save Placement", ontap: "handleSavePlacementButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", components: [
			{components: [
				{kind: "quantum.Input", name:"placementNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Placement Name", required:true},
				{kind: "quantum.Input", name:"placementTotalInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"number", label:"Placement Total ($)", required:true},
				{kind: "quantum.Input", name:"placementCurrencyInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Placement Currency", required:true},
				{kind: "quantum.Input", name:"shareTypeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Share Type", required:true},
				{kind: "quantum.Input", name:"sharePriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"number", label:"Share Price ($)", required:true, inputMaxLength:12},
				{kind: "quantum.Checkbox", name:"dapCheckbox", content:"This placement will be settled via DAP (Delivery Against Payment)", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Company Information"},
				{kind: "quantum.Input", name:"companyNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Company Name", required:true},
				{kind: "quantum.Input", name:"companyAddressInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Company Address", required:true},
				{kind: "quantum.Input", name:"companyPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"tel", label:"Company Phone", required:true},
				{kind: "quantum.Input", name:"companyWebsiteInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"url", label:"Company Website", required:true},
				{kind: "quantum.Input", name:"companyEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Company Email", required:true},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Company Logo", style: "line-height: 38px; width: 160px;"},
					{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "margin-left: 9px; width: 350px; padding-left: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
						{name: "companyLogoInput", kind: "enyo.Input", style: "padding-bottom: 5px;", attributes: {"type": "file", "accept": "image/jpeg, image/png, image/tiff"}, onchange: "handleCompanyLogoInputChanged"},
						{name: "companyLogoImage", kind: "enyo.Image"}
					]}
				]},
				{kind: "quantum.Input", name:"incorporationTypeInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Incorporation Type", required:true},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px; margin-left: -1px;", components: [
					{components: [
						{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
							{content: "Director Name", style: "width: 350px;"},
							{content: "Director Email", style: "width: 350px; margin-left: 10px;"}
						]},
						{name: "directorsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupDirectorsRepeaterItem", components: [
							{name: "directorItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
								{kind: "onyx.InputDecorator", style: "width: 350px;", components: [
									{name: "directorNameInput", onchange: "handleDirectorNameInputChanged", style: "width: 100%;", kind: "onyx.Input"}
								]},
								{kind: "onyx.InputDecorator", style: "width: 350px; margin-left: 10px;", components: [
									{name: "directorEmailInput", onchange: "handleDirectorEmailInputChanged", style: "width: 100%;", kind: "onyx.Input"}
								]},
								{style: "padding-top: 1px;", components: [
									{name: "deleteDirectorButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "handleDeleteDirectorButtonTapped"}
								]}
							]}
						]},
						{name: "noDirectorsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Directors Added"},
						{name: "addDirectorButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-top: 10px;", content: "Add Director", ontap: "handleAddDirectorButtonTapped"}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Global Subscription Settings"},
				{style: "margin-bottom: 15px;", content: "These settings affect all subscription documents, and are optional if not defined. External CC's should be ; seperated with no spaces."},
				{kind: "quantum.Input", name:"subscriberNamePrefixInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Subscriber Name Prefix"},
				{kind: "quantum.Input", name:"externalCCInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"External CC Emails"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Treasury Order Information"},
				{kind: "quantum.Input", name:"transferAgentNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Transfer Agent Name", required:true},
				{kind: "onyx.Groupbox", style: "margin-top: 10px; margin-left: -1px;", components: [
					{kind: "onyx.GroupboxHeader", content: "Transfer Agent Address"},
					{kind: "quantum.Input", name:"transferAgentAddressLine1Input", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;", inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Line 1", required:true},
					{kind: "quantum.Input", name:"transferAgentAddressLine2Input", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Line 2", required:true},
					{kind: "quantum.Input", name:"transferAgentAddressLine3Input", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Line 3"}
				]},
				{kind: "onyx.Groupbox", style: "margin-top: 10px; margin-left: -1px;", components: [
					{kind: "onyx.GroupboxHeader", content: "Transfer Agent Account Manager"},
					{kind: "quantum.Input", name:"transferAgentAccountManagerNameInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Name", required:true},
					{kind: "quantum.Input", name:"transferAgentAccountManagerEmailInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"email", label:"Email", required:true},
					{kind: "quantum.Input", name:"transferAgentAccountManagerPhoneInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"tel", label:"Phone", required:true}
				]},
				{kind: "quantum.Input", name:"holdPeriodExpiryInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Hold Period Expiry", required:true},
				{kind: "quantum.Input", name:"registrationMethodInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Registration Method", required:true},
				{kind: "onyx.Groupbox", style: "margin-top: 10px; margin-left: -1px;", components: [
					{kind: "onyx.GroupboxHeader", content: "Treasury Order Signing Officers"},
					{kind: "quantum.Input", name:"treasuryOrderSigningOfficer1NameInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Officer 1 Name", required:true},
					{kind: "quantum.Input", name:"treasuryOrderSigningOfficer1TitleInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Officer 1 Title", required:true},
					{kind: "quantum.Input", name:"treasuryOrderSigningOfficer1EmailInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"email", label:"Officer 1 Email", required:true},
					{kind: "quantum.Input", name:"treasuryOrderSigningOfficer2NameInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Officer 2 Name", required:true},
					{kind: "quantum.Input", name:"treasuryOrderSigningOfficer2TitleInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"text", label:"Officer 2 Name", required:true},
					{kind: "quantum.Input", name:"treasuryOrderSigningOfficer2EmailInput", columnStyle:"", labelStyle:"line-height: 38px; padding-left:5px; width: 160px; font-size:14px;", decoratorStyle: "margin-left: 10px; width: 350px; display:inline-block;",  inputStyle: "width: 100%; margin-top:4px;", type:"email", label:"Officer 2 Name", required:true}
				]},
				{kind:"quantum.Checkbox", name:"hasRestrictiveLegendsCheckbox", content:"Has Restrictive Legends?", columnStyle:"margin-top: 10px;", contentStyle:"margin-left:10px;", onchange:"allCheckCountries"},
				{kind: "enyo.FittableColumns", style: "margin-left: -1px;", name: "restrictiveLegends", components: [
					{components: [
						{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
							{content: "Restrictive Legend", style: "width: 510px;"}
						]},
						{name: "restrictiveLegendsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupRestrictiveLegendsRepeaterItem", components: [
							{name: "restrictiveLegendItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
								{kind: "enyo.FittableColumns", components: [
									{kind: "onyx.InputDecorator", style: "width: 420px;", components: [
										{name: "legendInput", onchange: "handleLegendInputChanged", style: "width: 100%;", kind: "onyx.TextArea"}
									]},
									{style: "padding-top: 1px;", components: [
										{name: "deleteRestrictiveLegendButton", kind: "enyo.Button", classes: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "handleDeleteRestrictiveLegendButtonTapped"}
									]}
								]},
								{style: "font-size: 16px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px; margin-top: 10px; margin-left: 3px;", content: "Legend Jurisdictions"},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "margin-left: 3px; line-height: 38px; padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
										{name: "legendUsaCheckbox", kind: "onyx.Checkbox", onchange: "handleLegendUsaCheckboxChanged"}
									]},
									{content: "United States", style: "line-height: 38px; width: 160px; margin-left: 5px;"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
									{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "margin-left: 3px; line-height: 38px; padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
										{name: "legendCanadaCheckbox", kind: "onyx.Checkbox", onchange: "handleLegendCanadaCheckboxChanged"}
									]},
									{content: "Canada", style: "line-height: 38px; width: 160px; margin-left: 5px;"}
								]},
								{kind: "enyo.FittableColumns", style: "margin-top: 10px; margin-bottom: 10px;", components: [
									{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "margin-left: 3px; line-height: 38px; padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
										{name: "legendInternationalCheckbox", kind: "onyx.Checkbox", onchange: "handleLegendInternationalCheckboxChanged"}
									]},
									{content: "International", style: "line-height: 38px; width: 160px; margin-left: 5px;"}
								]}
							]}
						]},
						{name: "noRestrictiveLegendsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Restrictive Legends Added"},
						{name: "addRestrictiveLegendButton", kind: "quantum.Button", classes: "button primary", style: "margin-top: 10px;", content: "Add Restrictive Legend", ontap: "handleAddRestrictiveLegendButtonTapped"}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Subscription Acceptance Information"},
				{kind: "quantum.Input", name:"signingOfficerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Signing Officer Name", required:true},
				{kind: "quantum.Input", name:"signingOfficerTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Signing Officer Title", required:true},
				{kind: "quantum.Input", name:"signingOfficerEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 160px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Signing Officer Email", required:true}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Users To Notify When A Subscription Is Received"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px; margin-left: -1px;", components: [
					{components: [
						{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
							{content: "User Email", style: "width: 510px;"}
						]},
						{name: "usersToNotifyRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupUsersToNotifyRepeaterItem", components: [
							{name: "userToNotifyItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
								{kind: "onyx.InputDecorator", style: "width: 350px;", components: [
									{name: "userEmailInput", onchange: "handleUserEmailInputChanged", style: "width: 100%;", kind: "onyx.Input"}
								]},
								{style: "padding-top: 1px;", components: [
									{name: "deleteUserToNotifyButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "handleDeleteUserToNotifyButtonTapped"}
								]}
							]}
						]},
						{name: "noUsersToNotifyLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Users Added"},
						{name: "addUserToNotifyButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-top: 10px;", content: "Add User", ontap: "handleAddUserToNotifyButtonTapped"}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", components: [
					{style: "font-size: 20px; line-height: 32px;", content: "Placement Documents"},
					{fit: true},
					{components: [
						{name: "regenerateDocumentsButton", kind: "quantum.Button", enabledClasses: "button", style: "margin: 0 0 0 10px;", content: "Regenerate Documents", ontap: "handleRegenerateDocumentsButtonTapped"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Document Name", style: "width: 300px;"},
					{content: "Download Existing", style: "width: 150px;"},
					{content: "Upload New", style: "width: 300px;"}
				]},
				{name: "documentsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupDocumentRepeaterItem", components: [
					{name: "documentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{style: "width: 300px; line-height: 34px;", components: [
							{name: "documentName"}
						]},
						{style: "width: 150px; line-height: 34px;", components: [
							{name: "downloadDocumentButton", kind: "quantum.Button", content: "Download", ontap: "downloadDocumentButtonTapped"}
						]},
						{style: "width: 300px; line-height: 34px;", components: [
							{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
								{name: "uploadDocumentInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}, onchange: "handleUploadDocumentInputChanged"}
							]}
						]}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Supporting Documents (Optional)"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Document Name", style: "width: 300px;"},
					{content: "Download Existing", style: "width: 150px;"},
					{content: "Upload New", style: "width: 300px;"}
				]},
				{style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{style: "width: 300px; line-height: 34px;", components: [
						{content: "Supporting Documents.pdf"}
					]},
					{style: "width: 150px; line-height: 34px;", components: [
						{name: "downloadSupportingDocumentsDocButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadSupportingDocumentsButtonTapped"}
					]},
					{style: "width: 300px; line-height: 34px;", components: [
						{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
							{name: "uploadSupportingDocumentsDocInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf"}, onchange: "handleUploadSupportingDocumentsInputChanged"}
						]}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Payment Instructions Document"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Document Name", style: "width: 300px;"},
					{content: "Download Existing", style: "width: 150px;"},
					{content: "Upload New", style: "width: 300px;"}
				]},
				{style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{style: "width: 300px; line-height: 34px;", components: [
						{content: "Payment Instructions.pdf"}
					]},
					{style: "width: 150px; line-height: 34px;", components: [
						{name: "downloadPaymentInstructionDocButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadPaymentInstructionsButtonTapped"}
					]},
					{style: "width: 300px; line-height: 34px;", components: [
						{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
							{name: "uploadPaymentInstructionDocInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf"}, onchange: "handleUploadPaymentInstructionsInputChanged"}
						]}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Closing Documents"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Document Name", style: "width: 300px;"},
					{content: "Download Existing", style: "width: 150px;"},
					{content: "", style: "width: 300px;"}
				]},
				{name: "closingDocumentsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupClosingDocumentRepeaterItem", components: [
					{name: "closingDocumentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{style: "width: 300px; line-height: 34px;", components: [
							{name: "closingDocumentName"}
						]},
						{style: "width: 150px; line-height: 34px;", components: [
							{name: "downloadClosingDocumentButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadClosingDocumentButtonTapped"}
						]},
						{style: "width: 300px; line-height: 34px;", components: []}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "padding-right: 5px;", components: [
				{style: "font-size: 20px; padding-bottom: 5px; border-bottom: 1px solid black; margin-bottom: 10px;", content: "Shareholder Letter"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Document Name", style: "width: 300px;"},
					{content: "Download Existing", style: "width: 150px;"},
					{content: "Upload New", style: "width: 300px;"}
				]},
				{style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{style: "width: 300px; line-height: 34px;", components: [
						{content: "Shareholder Letter.pdf"}
					]},
					{style: "width: 150px; line-height: 34px;", components: [
						{name: "downloadShareholderLetterButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", content: "Download", ontap: "downloadShareholderLetterButtonTapped"}
					]},
					{style: "width: 300px; line-height: 34px;", components: [
						{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
							{name: "uploadShareholderLetterInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf"}, onchange: "handleShareholderLetterChanged"}
						]}
					]}
				]}
			]}
		]},

		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".placementInfo", to: ".$.placementNameInput.value", transform: function(v) {
			try
			{
				var data = v.placementName;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.placementTotalInput.value", transform: function(v) {
			try
			{
				var data = v.placementTotal;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.placementCurrencyInput.value", transform: function(v) {
			try
			{
				var data = v.placementCurrency;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.shareTypeInput.value", transform: function(v) {
			try
			{
				var data = v.shareDesignation;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.sharePriceInput.value", transform: function(v) {
			try
			{
				var data = v.sharePrice;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.dapCheckbox.checked", transform: function(v) {
			try
			{
				var data = v.dapPlacement;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".placementInfo", to: ".$.companyNameInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.companyName;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.companyAddressInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.companyAddress;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.companyPhoneInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.companyPhone;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.companyWebsiteInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.companyWebsite;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.companyEmailInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.companyEmail;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".companyLogoImage", transform: function(v) {
			try
			{
				var data = v.companyInfo.companyLogo;
				if (data != null) { 
					var dataURL = "data:" + v._attachments[v.companyInfo.companyLogo].content_type + ";base64," + v._attachments[v.companyInfo.companyLogo].data;
					return dataURL; 
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".companyLogoImage", to: ".$.companyLogoImage.src"},
		{from: ".placementInfo", to: ".$.incorporationTypeInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.incorporationType;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".directorsCollection", transform: function(v) {
			try
			{
				var data = v.companyInfo.directors;
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".placementInfo", to: ".$.incorporationTypeInput.value", transform: function(v) {
			try
			{
				var data = v.companyInfo.incorporationType;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.subscriberNamePrefixInput.value", transform: function(v) {
			try
			{
				var data = v.globalSubscriptionSettings.subscriberNamePrefix;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.externalCCInput.value", transform: function(v) {
			try
			{
				var data = v.globalSubscriptionSettings.externalCC;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentNameInput.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.name;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentAddressLine1Input.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.addressLine1;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentAddressLine2Input.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.addressLine2;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentAddressLine3Input.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.addressLine3;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentAccountManagerNameInput.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.accountManager.name;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentAccountManagerEmailInput.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.accountManager.email;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.transferAgentAccountManagerPhoneInput.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.transferAgent.accountManager.phone;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.holdPeriodExpiryInput.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.holdPeriodExpiry;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.registrationMethodInput.value", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.registrationMethod;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.treasuryOrderSigningOfficer1NameInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.treasuryOrder[0].name;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.treasuryOrderSigningOfficer1TitleInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.treasuryOrder[0].title;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.treasuryOrderSigningOfficer1EmailInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.treasuryOrder[0].email;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.treasuryOrderSigningOfficer2NameInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.treasuryOrder[1].name;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.treasuryOrderSigningOfficer2TitleInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.treasuryOrder[1].title;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.treasuryOrderSigningOfficer2EmailInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.treasuryOrder[1].email;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.hasRestrictiveLegendsCheckbox.checked", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.hasRestrictiveLegends;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".placementInfo", to: ".restrictiveLegendsCollection", transform: function(v) {
			try
			{
				var data = v.treasuryOrderInfo.restrictiveLegends;
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".$.hasRestrictiveLegendsCheckbox.checked", to: ".$.restrictiveLegends.showing", transform: function(v) {
			return v === true;
		}},
		{from: ".placementInfo", to: ".$.signingOfficerNameInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.subscriptionAcceptance[0].name;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.signingOfficerTitleInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.subscriptionAcceptance[0].title;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.signingOfficerEmailInput.value", transform: function(v) {
			try
			{
				var data = v.signingOfficers.subscriptionAcceptance[0].email;
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".usersToNotifyCollection", transform: function(v) {
			try
			{
				var data = v.usersToNotify;
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".placementInfo", to: ".$.downloadShareholderLetterButton.disabled", transform: function(v) {
			try
			{
				var data = v._attachments["Shareholder Letter.pdf"];
				if (data != null) {
					return false;
				}
				else { throw null; }
			}
			catch (err) {
				return true;
			}
		}},
		{from: ".placementInfo", to: ".$.downloadPaymentInstructionDocButton.disabled", transform: function(v) {
			try
			{
				var data = v._attachments[this.paymentInstructionsFileName];
				if (data != null && data !== "") {
					return false;
				}
				else { throw null; }
			}
			catch (err) {
				return true;
			}
		}},
		{from: ".placementInfo", to: ".$.downloadSupportingDocumentsDocButton.disabled", transform: function(v) {
			try
			{
				var data = v._attachments[this.supportingDocumentsFileName];
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
		for (var i in this.$.directorsRepeater.children)
		{
			this.$.directorsRepeater.children[i].$.directorNameInput.parent.applyStyle("border", null);
			this.$.directorsRepeater.children[i].$.directorEmailInput.parent.applyStyle("border", null);
		}
		for (var i in this.$.restrictiveLegendsRepeater.children) { this.$.restrictiveLegendsRepeater.children[i].$.legendInput.parent.applyStyle("border", null); }
		for (var i in this.$.usersToNotifyRepeater.children) { this.$.usersToNotifyRepeater.children[i].$.userEmailInput.parent.applyStyle("border", null); }

		this.$.uploadPaymentInstructionDocInput.applyStyle("border", null);

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
		if (!quantum.hasRole(["admins"], "placement")) { this.doGoHome(); return; }

		this.clearBorderError();

		this.set("placementInfo", null);
		this.set("placementInfo", quantum.preferences.get("placementInfo"));
		//console.log(this.get("placementInfo"));

		this.refreshRepeaters();
	},

	refreshRepeaters: function()
	{
		this.$.noDirectorsLabel.set("showing", this.get("directorsCollection").length === 0);
		this.$.directorsRepeater.set("showing", this.get("directorsCollection").length > 0);
		this.$.directorsRepeater.setCount(this.get("directorsCollection").length);

		this.$.noRestrictiveLegendsLabel.set("showing", this.get("restrictiveLegendsCollection").length === 0);
		this.$.restrictiveLegendsRepeater.set("showing", this.get("restrictiveLegendsCollection").length > 0);
		this.$.restrictiveLegendsRepeater.setCount(this.get("restrictiveLegendsCollection").length);

		this.$.noUsersToNotifyLabel.set("showing", this.get("usersToNotifyCollection").length === 0);
		this.$.usersToNotifyRepeater.set("showing", this.get("usersToNotifyCollection").length > 0);
		this.$.usersToNotifyRepeater.setCount(this.get("usersToNotifyCollection").length);

		this.$.documentsRepeater.set("showing", this.get("documentNamesCollection").length > 0);
		this.$.documentsRepeater.setCount(this.get("documentNamesCollection").length);

		this.set("closingDocumentCollection", []);
		for(var key in quantum.preferences.get("placementInfo")._attachments)
		{
			if(quantum.preferences.get("placementInfo")._attachments.hasOwnProperty(key))
			{
				if(this.get("closingDocumentNamesCollection").indexOf(key) !== -1)
				{
					this.get("closingDocumentCollection").push(key);
				}
			}
		}
		this.$.closingDocumentsRepeater.setCount(this.get("closingDocumentCollection").length);
	},

	/******************
	* Button Handlers *
	******************/

	validateInputs: function()
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		var emailRegEx = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z]{2,10})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

		if(this.get("paymentInstructionsToUpload") === null && !this.get("placementInfo")._attachments[this.paymentInstructionsFileName])
		{
			isValid = false;
			this.$.uploadPaymentInstructionDocInput.applyStyle("border", borderError);
		}

		// Director Name:
		// Director Email:
		for (var i in this.$.directorsRepeater.children)
		{
			if (this.$.directorsRepeater.children[i].$.directorNameInput.get("value") === "")
			{
				isValid = false;
				this.$.directorsRepeater.children[i].$.directorNameInput.parent.applyStyle("border", borderError);
			}
			if (this.$.directorsRepeater.children[i].$.directorEmailInput.get("value") === ""  || !this.$.directorsRepeater.children[i].$.directorEmailInput.get("value").match(emailRegEx))
			{
				isValid = false;
				this.$.directorsRepeater.children[i].$.directorEmailInput.parent.applyStyle("border", borderError);
			}
		}

		// Restrictive Legend:
		if (this.$.hasRestrictiveLegendsCheckbox.getValue() === true)
		{
			for (var i in this.$.restrictiveLegendsRepeater.children)
			{
				if (this.$.restrictiveLegendsRepeater.children[i].$.legendInput.get("value") === "")
				{
					isValid = false;
					this.$.restrictiveLegendsRepeater.children[i].$.legendInput.parent.applyStyle("border", borderError);
				}
			}
		}

		// User Email (Users To Notify):
		for (var i in this.$.usersToNotifyRepeater.children)
		{
			if (this.$.usersToNotifyRepeater.children[i].$.userEmailInput.get("value") === "" || !this.$.usersToNotifyRepeater.children[i].$.userEmailInput.get("value").match(emailRegEx))
			{
				isValid = false;
				this.$.usersToNotifyRepeater.children[i].$.userEmailInput.parent.applyStyle("border", borderError);
			}
		}

		for (var key in this.$)
		{
			if(this.$[key].kind === "quantum.Input")
			{
				if(!this.$[key].validate()){
					isValid = false;
				}
			}
		}

		//Make sure that the emails in the external CC field are actually valid emails
		if (this.$.externalCCInput.get("value") !== "")
		{
			var emailsToTest = this.$.externalCCInput.get("value").split(";");
			for (var i in emailsToTest)
			{
				if (!emailsToTest[i].match(emailRegEx))
				{
					isValid = false;
					this.$.externalCCInput.setBorderError();
				}
			}
		}

		if (!isValid) {
			alertify.error("Validation Failed");
		}
		return isValid;
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	handleRegenerateDocumentsButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "placement")) { return; }

		if (this.isDirty())
		{
			if (this.$.regenerate_saveChangesPopup)
			{
				this.$.regenerate_saveChangesPopup.hide();
				this.$.regenerate_saveChangesPopup.destroy();
			}
			this.createComponent({name: "regenerate_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.regenerateDocuments), onHide: "handlePopupHidden"} , {owner:this});
			this.$.regenerate_saveChangesPopup.show("Must save changes before regenerating documents. Save changes?");
		}
		else
		{
			this.regenerateDocuments();
		}
	},

	handleSavePlacementButtonTapped: function(inSender, inEvent, options)
	{
		if (!this.validateInputs()) { return; }

		this.$.loadingPopup.show("Saving...");
		if (!options || !options.skipUpdateFields)
		{
			if (!this.get("placementInfo").globalSubscriptionSettings) {this.get("placementInfo").globalSubscriptionSettings = {};}

			this.get("placementInfo").placementName = this.$.placementNameInput.get("value");
			this.get("placementInfo").placementTotal = quantum.parseFloat(this.$.placementTotalInput.get("value"));
			this.get("placementInfo").placementCurrency = this.$.placementCurrencyInput.get("value");
			this.get("placementInfo").shareDesignation = this.$.shareTypeInput.get("value");
			this.get("placementInfo").sharePrice = quantum.parseFloat(this.$.sharePriceInput.get("value"));
			this.get("placementInfo").dapPlacement = this.$.dapCheckbox.get("checked");
			this.get("placementInfo").companyInfo.companyName = this.$.companyNameInput.get("value");
			this.get("placementInfo").companyInfo.companyAddress = this.$.companyAddressInput.get("value");
			this.get("placementInfo").companyInfo.companyPhone = this.$.companyPhoneInput.get("value");
			this.get("placementInfo").companyInfo.companyWebsite = this.$.companyWebsiteInput.get("value");
			this.get("placementInfo").companyInfo.companyEmail = this.$.companyEmailInput.get("value");
			this.get("placementInfo").companyInfo.companyLogo = this.get("companyLogoImage");
			this.get("placementInfo").companyInfo.incorporationType = this.$.incorporationTypeInput.get("value");
			this.get("placementInfo").companyInfo.directors = this.get("directorsCollection");
			this.get("placementInfo").globalSubscriptionSettings.subscriberNamePrefix = this.$.subscriberNamePrefixInput.get("value").trim();
			this.get("placementInfo").globalSubscriptionSettings.externalCC = this.$.externalCCInput.get("value").trim();
			this.get("placementInfo").treasuryOrderInfo.transferAgent.name = this.$.transferAgentNameInput.get("value");
			this.get("placementInfo").treasuryOrderInfo.transferAgent.addressLine1 = this.$.transferAgentAddressLine1Input.get("value");
			this.get("placementInfo").treasuryOrderInfo.transferAgent.addressLine2 = this.$.transferAgentAddressLine2Input.get("value");
			this.get("placementInfo").treasuryOrderInfo.transferAgent.addressLine3 = this.$.transferAgentAddressLine3Input.get("value");
			this.get("placementInfo").treasuryOrderInfo.transferAgent.accountManager.name = this.$.transferAgentAccountManagerNameInput.get("value");
			this.get("placementInfo").treasuryOrderInfo.transferAgent.accountManager.email = this.$.transferAgentAccountManagerEmailInput.get("value");
			this.get("placementInfo").treasuryOrderInfo.transferAgent.accountManager.phone = this.$.transferAgentAccountManagerPhoneInput.get("value");
			this.get("placementInfo").treasuryOrderInfo.holdPeriodExpiry = this.$.holdPeriodExpiryInput.get("value");
			this.get("placementInfo").treasuryOrderInfo.registrationMethod = this.$.registrationMethodInput.get("value");
			this.get("placementInfo").signingOfficers.treasuryOrder[0].name = this.$.treasuryOrderSigningOfficer1NameInput.get("value");
			this.get("placementInfo").signingOfficers.treasuryOrder[0].title = this.$.treasuryOrderSigningOfficer1TitleInput.get("value");
			this.get("placementInfo").signingOfficers.treasuryOrder[0].email = this.$.treasuryOrderSigningOfficer1EmailInput.get("value");
			this.get("placementInfo").signingOfficers.treasuryOrder[1].name = this.$.treasuryOrderSigningOfficer2NameInput.get("value");
			this.get("placementInfo").signingOfficers.treasuryOrder[1].title = this.$.treasuryOrderSigningOfficer2TitleInput.get("value");
			this.get("placementInfo").signingOfficers.treasuryOrder[1].email = this.$.treasuryOrderSigningOfficer2EmailInput.get("value");
			this.get("placementInfo").treasuryOrderInfo.hasRestrictiveLegends = this.$.hasRestrictiveLegendsCheckbox.getValue();
			if (this.$.hasRestrictiveLegendsCheckbox.getValue() === true)
			{
				this.get("placementInfo").treasuryOrderInfo.restrictiveLegends = this.get("restrictiveLegendsCollection");
			}
			this.get("placementInfo").signingOfficers.subscriptionAcceptance[0].name = this.$.signingOfficerNameInput.get("value");
			this.get("placementInfo").signingOfficers.subscriptionAcceptance[0].title = this.$.signingOfficerTitleInput.get("value");
			this.get("placementInfo").signingOfficers.subscriptionAcceptance[0].email = this.$.signingOfficerEmailInput.get("value");
			this.get("placementInfo").usersToNotify = this.get("usersToNotifyCollection");
			if (!this.get("placementInfo")._attachments)
			{
				this.get("placementInfo")._attachments = {};
			}
			var dnc = this.get("documentNamesCollection");
			for (var i = 0; i < dnc.length; i++)
			{
				var temp = this.get("documentsToUpload")[dnc[i]];
				if (temp !== undefined)
				{
					this.get("placementInfo")._attachments[dnc[i]] = temp;
				}
			}

			if(this.get("shareholderLetter")){
				var fName = "Shareholder Letter.pdf";
				var file = this.get("shareholderLetter");
				this.get("placementInfo")._attachments[fName] = file;
			}

			var pitu = this.get("paymentInstructionsToUpload");
			if (pitu != null)
			{
				// Delete old Placement Instructions document.
				delete this.get("placementInfo")._attachments[this.paymentInstructionsFileName];
				var keys = Object.keys(pitu);
				if (keys.length > 0)
				{
					this.get("placementInfo")._attachments[this.paymentInstructionsFileName] = pitu[keys[0]];
				}
			}

			var sdtu = this.get("supportingDocumentsToUpload");
			if (sdtu != null)
			{
				// Delete old Supporting Documents document.
				delete this.get("placementInfo")._attachments[this.supportingDocumentsFileName];
				var keys = Object.keys(sdtu);
				if (keys.length > 0)
				{
					this.get("placementInfo")._attachments[this.supportingDocumentsFileName] = sdtu[keys[0]];
				}
			}

			//For company logo, assume that if there is already a string here, it is a GUID reference to a filename
			if (this.get("placementInfo").companyInfo.companyLogo || this.get("placementInfo").companyInfo.companyLogo === "")
			{
				var imageUUID = "$" + uuid.v4().replace(/-/g, "");
				this.get("placementInfo").companyInfo.companyLogo = imageUUID;
			}

			var companyLogoType = this.get("companyLogoImage").split(";")[0].split(":")[1];
			var companyLogoData = this.get("companyLogoImage").split(",")[1];

			//Create the logo attachment, and update the company logo to the new UUID
			this.get("placementInfo")._attachments[this.get("placementInfo").companyInfo.companyLogo] = {
				"content_type": companyLogoType,
				"data": companyLogoData
			};
		}

		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response){
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

			//TODO: Prune the attachments tree either before or after the upload to prevent excessive memory usage.
			//Using the current code, attachments will remain loaded in memory until the page is reloaded.
			this.get("database").post(this.get("placementInfo"), enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Placement Update Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				alertify.success("Placement Updated");
				this.get("placementInfo")._rev = response.rev;
				this.set("documentsToUpload", {});
				this.set("shareholderLetter", null);
				this.set("paymentInstructionsToUpload", null);
				this.set("supportingDocumentsToUpload", null);
				quantum.preferences.set("placementInfo", this.get("placementInfo"));
				quantum.preferences.commit();

				this.$.loadingPopup.hide();
				if (options && options.callback)
				{
					options.callback();
				}

				this.activate();
			}));
		}));
	},

	isDirty: function()
	{
		var arr1 = this.get("placementInfo").companyInfo.directors;
		var arr2 = this.get("directorsCollection");
		var isDirty_directors = arr1.length !== arr2.length;
		var isDirty_restrictiveLegends = false;
		if (!isDirty_directors)
		{
			isDirty_directors = (function()
			{
				for (var i = 0; i < arr1.length; i++)
				{
					if (arr1[i].directorName !== arr2[i].directorName) { return true; }
					if (arr1[i].directorEmail !== arr2[i].directorEmail) { return true; }
				}
				return false;
			})();
		}
		if (this.$.hasRestrictiveLegendsCheckbox.getValue() === true)
		{
			var arr3 = this.get("placementInfo").treasuryOrderInfo.restrictiveLegends;
			var arr4 = this.get("restrictiveLegendsCollection");
			isDirty_restrictiveLegends = arr3.length !== arr4.length;
			if (!isDirty_restrictiveLegends)
			{
				isDirty_restrictiveLegends = (function()
				{
					for (var i = 0; i < arr3.length; i++)
					{
						if (arr3[i].legend !== arr4[i].legend) { return true; }
					}
					return false;
				})();
			}
		}
		var arr5 = this.get("placementInfo").usersToNotify;
		var arr6 = this.get("usersToNotifyCollection");
		var isDirty_usersToNotify = arr5.length !== arr6.length;
		if (!isDirty_usersToNotify)
		{
			isDirty_usersToNotify = (function()
			{
				for (var i = 0; i < arr5.length; i++)
				{
					if (arr5[i] !== arr6[i]) { return true; }
				}
				return false;
			})();
		}
		var arr7 = this.get("documentNamesCollection");
		var obj1 = this.get("documentsToUpload");
		var isDirty_documentsToUpload = (function()
		{
			for (var i = 0; i < arr7.length; i++)
			{
				if (obj1[arr7[i]] !== undefined) { return true; }
			}
			return false;
		})();

		var shLetter = this.get("shareholderLetter");
		var isDirty_shareholderLetter = (function(){
			if(shLetter !== null && shLetter !== undefined && shLetter !== "") { return true; }
			return false;
		})();

		var isDirty_paymentInstructionsToUpload = (this.get("paymentInstructionsToUpload") != null);

		var isDirty_supportingDocumentsToUpload = (this.get("supportingDocumentsToUpload") != null);

		var isDirty_globalSubscriptionSettings = enyo.bind(this,(function()
		{
			if (!this.get("placementInfo").globalSubscriptionSettings) {return true;}
			if (this.get("placementInfo").globalSubscriptionSettings.subscriberNamePrefix !== this.$.subscriberNamePrefixInput.get("value")) {return true;}
			if (this.get("placementInfo").globalSubscriptionSettings.externalCC !== this.$.externalCCInput.get("value")) {return true;}

			return false;
		}))();

		var isDirtyArray = [
			isDirty_directors, isDirty_restrictiveLegends, isDirty_usersToNotify, isDirty_documentsToUpload, isDirty_shareholderLetter, isDirty_paymentInstructionsToUpload, isDirty_supportingDocumentsToUpload, isDirty_globalSubscriptionSettings,
			this.get("placementInfo").placementName !== this.$.placementNameInput.get("value"),
			this.get("placementInfo").placementTotal !== quantum.parseFloat(this.$.placementTotalInput.get("value")),
			this.get("placementInfo").placementCurrency !== this.$.placementCurrencyInput.get("value"),
			this.get("placementInfo").shareDesignation !== this.$.shareTypeInput.get("value"),
			this.get("placementInfo").sharePrice !== quantum.parseFloat(this.$.sharePriceInput.get("value")),
			this.get("placementInfo").dapPlacement !== this.$.dapCheckbox.get("checked"),
			this.get("placementInfo").companyInfo.companyName !== this.$.companyNameInput.get("value"),
			this.get("placementInfo").companyInfo.companyAddress !== this.$.companyAddressInput.get("value"),
			this.get("placementInfo").companyInfo.companyPhone !== this.$.companyPhoneInput.get("value"),
			this.get("placementInfo").companyInfo.companyWebsite !== this.$.companyWebsiteInput.get("value"),
			this.get("placementInfo").companyInfo.companyEmail !== this.$.companyEmailInput.get("value"),
			//this.get("placementInfo").companyInfo.companyLogo !== this.get("companyLogoImage"),
			this.get("placementInfo").companyInfo.incorporationType !== this.$.incorporationTypeInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.name !== this.$.transferAgentNameInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.addressLine1 !== this.$.transferAgentAddressLine1Input.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.addressLine2 !== this.$.transferAgentAddressLine2Input.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.addressLine3 !== this.$.transferAgentAddressLine3Input.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.accountManager.name !== this.$.transferAgentAccountManagerNameInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.accountManager.email !== this.$.transferAgentAccountManagerEmailInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.transferAgent.accountManager.phone !== this.$.transferAgentAccountManagerPhoneInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.holdPeriodExpiry !== this.$.holdPeriodExpiryInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.registrationMethod !== this.$.registrationMethodInput.get("value"),
			this.get("placementInfo").signingOfficers.treasuryOrder[0].name !== this.$.treasuryOrderSigningOfficer1NameInput.get("value"),
			this.get("placementInfo").signingOfficers.treasuryOrder[0].title !== this.$.treasuryOrderSigningOfficer1TitleInput.get("value"),
			this.get("placementInfo").signingOfficers.treasuryOrder[0].email !== this.$.treasuryOrderSigningOfficer1EmailInput.get("value"),
			this.get("placementInfo").signingOfficers.treasuryOrder[1].name !== this.$.treasuryOrderSigningOfficer2NameInput.get("value"),
			this.get("placementInfo").signingOfficers.treasuryOrder[1].title !== this.$.treasuryOrderSigningOfficer2TitleInput.get("value"),
			this.get("placementInfo").signingOfficers.treasuryOrder[1].email !== this.$.treasuryOrderSigningOfficer2EmailInput.get("value"),
			this.get("placementInfo").treasuryOrderInfo.hasRestrictiveLegends !== this.$.hasRestrictiveLegendsCheckbox.getValue(),
			this.get("placementInfo").signingOfficers.subscriptionAcceptance[0].name !== this.$.signingOfficerNameInput.get("value"),
			this.get("placementInfo").signingOfficers.subscriptionAcceptance[0].title !== this.$.signingOfficerTitleInput.get("value"),
			this.get("placementInfo").signingOfficers.subscriptionAcceptance[0].email !== this.$.signingOfficerEmailInput.get("value"),
			this.get("placementInfo").shareholderLetterFileName !== this.shareholderLetterFileName
		];

		//console.log(isDirtyArray);

		return (isDirtyArray.indexOf(true)!==-1);
	},

	handleCompanyLogoInputChanged: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Uploading...");

		var files = this.$.companyLogoInput.hasNode().files;
		var reader = new FileReader();

		reader.onerror = enyo.bind(this, function(error){
			//TODO: better error handling;
			this.$.loadingPopup.hide();
			console.log("ERROR!", error);
		});

		reader.onloadend = enyo.bind(this, function(inEvent){
			this.$.loadingPopup.hide();
			this.set("companyLogoImage", inEvent.target.result);
		});

		try { reader.readAsDataURL(files[0]); }
		catch (err) { this.$.loadingPopup.hide(); }
		finally { this.$.companyLogoInput.get("eventNode").value = ""; }
	},

	regenerateDocuments: function()
	{
		this.$.loadingPopup.show();
		var ajaxProperties = {
			cacheBust: false,
			contentType: "application/json",
			method: "POST",
			url: quantum.preferences.get("apiServer") + "regenerateplacementdocuments",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		};

		ajaxProperties.postBody = {placementID: quantum.preferences.get("placementDatabase")};

		var ajax = new enyo.Ajax(ajaxProperties);

		ajax.response(function(request, response) {
			this.$.loadingPopup.hide();
			if (!response.error)
			{
				alertify.success("Documents Regenerated!");
			}
			else
			{
				console.log(response);
				alertify.error("Failed to regenerate documents");
			}
		}, this);

		ajax.error(function(request, response) {
			this.$.loadingPopup.hide();
			console.log("Ajax Error: ",request, response);
			alertify.error("Failed to regenerate documents");
		}, this);

		ajax.go();
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSavePlacementButtonTapped(inSender, inEvent, {callback: inSender.action});
	},

	/*****************************
	* Directors Repeater Section *
	*****************************/

	setupDirectorsRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.directorItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.directorNameInput.set("value", this.get("directorsCollection")[inEvent.index].directorName);
		inEvent.item.$.directorEmailInput.set("value", this.get("directorsCollection")[inEvent.index].directorEmail);
		return true;
	},

	handleAddDirectorButtonTapped: function(inSender, inEvent)
	{
		this.get("directorsCollection").push({
			directorName: "",
			directorEmail: ""
		});
		this.refreshRepeaters();
	},

	handleDeleteDirectorButtonTapped: function(inSender, inEvent)
	{
		this.get("directorsCollection").splice(inEvent.index, 1);
		this.refreshRepeaters();
	},

	handleDirectorNameInputChanged: function(inSender, inEvent)
	{
		this.get("directorsCollection")[inEvent.index].directorName = inEvent.originator.get("value");
		this.refreshRepeaters();
	},

	handleDirectorEmailInputChanged: function(inSender, inEvent)
	{
		this.get("directorsCollection")[inEvent.index].directorEmail = inEvent.originator.get("value");
		this.refreshRepeaters();
	},

	/***************************************
	* Restrictive Legends Repeater Section *
	***************************************/

	setupRestrictiveLegendsRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.restrictiveLegendItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.legendInput.set("value", this.get("restrictiveLegendsCollection")[inEvent.index].legend);
		inEvent.item.$.legendUsaCheckbox.set("checked", this.get("restrictiveLegendsCollection")[inEvent.index].applyUsa);
		inEvent.item.$.legendCanadaCheckbox.set("checked", this.get("restrictiveLegendsCollection")[inEvent.index].applyCanada);
		inEvent.item.$.legendInternationalCheckbox.set("checked", this.get("restrictiveLegendsCollection")[inEvent.index].applyInternational);
		return true;
	},

	handleAddRestrictiveLegendButtonTapped: function(inSender, inEvent)
	{
		this.get("restrictiveLegendsCollection").push({
			legend: "",
			applyCanada: true,
			applyUsa: true,
			applyInternational: true
		});
		this.refreshRepeaters();
	},

	handleDeleteRestrictiveLegendButtonTapped: function(inSender, inEvent)
	{
		this.get("restrictiveLegendsCollection").splice(inEvent.index, 1);
		this.refreshRepeaters();
	},

	handleLegendInputChanged: function(inSender, inEvent)
	{
		this.get("restrictiveLegendsCollection")[inEvent.index].legend = inEvent.originator.get("value");
		this.refreshRepeaters();
	},

	handleLegendUsaCheckboxChanged: function(inSender, inEvent)
	{
		this.get("restrictiveLegendsCollection")[inEvent.index].applyUsa = inEvent.originator.get("checked");
		this.refreshRepeaters();
	},

	handleLegendCanadaCheckboxChanged: function(inSender, inEvent)
	{
		this.get("restrictiveLegendsCollection")[inEvent.index].applyCanada = inEvent.originator.get("checked");
		this.refreshRepeaters();
	},

	handleLegendInternationalCheckboxChanged: function(inSender, inEvent)
	{
		this.get("restrictiveLegendsCollection")[inEvent.index].applyInternational = inEvent.originator.get("checked");
		this.refreshRepeaters();
	},

	/***********************************
	* Users To Notify Repeater Section *
	***********************************/

	setupUsersToNotifyRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.userToNotifyItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.userEmailInput.set("value", this.get("usersToNotifyCollection")[inEvent.index]);
		return true;
	},

	handleAddUserToNotifyButtonTapped: function(inSender, inEvent)
	{
		this.get("usersToNotifyCollection").push(
			""
		);
		this.refreshRepeaters();
	},

	handleDeleteUserToNotifyButtonTapped: function(inSender, inEvent)
	{
		this.get("usersToNotifyCollection").splice(inEvent.index, 1);
		this.refreshRepeaters();
	},

	handleUserEmailInputChanged: function(inSender, inEvent)
	{
		this.get("usersToNotifyCollection")[inEvent.index] = inEvent.originator.get("value");
		this.refreshRepeaters();
	},

	/*************************************
	* Closing Documents Repeater Section *
	**************************************/

	setupClosingDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.closingDocumentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.closingDocumentName.set("content", this.get("closingDocumentCollection")[inEvent.index]);
		return true;
	},

	downloadClosingDocumentButtonTapped: function(inSender, inEvent)
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
			this.get("database").getAttachment("settings", this.get("closingDocumentCollection")[inEvent.index], enyo.bind(this, function(err, response)
			{
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}
				this.$.loadingPopup.hide();
				saveAs(response, this.get("closingDocumentCollection")[inEvent.index]);
			}));
		}));
	},

	/*****************************
	* Documents Repeater Section *
	*****************************/

	setupDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) { return true; }
		inEvent.item.$.documentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");
		inEvent.item.$.documentName.set("content", this.get("documentNamesCollection")[inEvent.index]);
		if (this.get("placementInfo")._attachments[this.get("documentNamesCollection")[inEvent.index]] || this.get("documentsToUpload")[this.get("documentNamesCollection")[inEvent.index]])
		{
			inEvent.item.$.downloadDocumentButton.set("classes", "button bg-darkViolet fg-white");
			inEvent.item.$.downloadDocumentButton.set("disabled", false);
		}
		else
		{
			inEvent.item.$.downloadDocumentButton.set("classes", "button");
			inEvent.item.$.downloadDocumentButton.set("disabled", true);
		}

		return true;
	},

	downloadDocumentButtonTapped: function(inSender, inEvent)
	{
		if (this.get("documentsToUpload") && this.get("documentsToUpload")[this.get("documentNamesCollection")[inEvent.index]])
		{
			saveAs(this.get("documentsToUpload")[this.get("documentNamesCollection")[inEvent.index]].data, this.get("documentNamesCollection")[inEvent.index]);
		}
		else
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
				this.get("database").getAttachment("settings", this.get("documentNamesCollection")[inEvent.index], enyo.bind(this, function(err, response)
				{
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}
					this.$.loadingPopup.hide();
					saveAs(response, this.get("documentNamesCollection")[inEvent.index]);
				}));
			}));
		}
	},

	handleUploadDocumentInputChanged: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Uploading...");
		var name = this.get("documentNamesCollection")[inEvent.index];
		var file = inEvent.target.files && inEvent.target.files.length > 0 ? inEvent.target.files[0] : null;
		var reader = new FileReader();
		var targetIndex = inEvent.index;
		reader.onerror = enyo.bind(this, function(err)
		{
			console.log(err);
			this.$.loadingPopup.hide();
			alertify.error("Upload Document Failed");
		});
		reader.onloadend = enyo.bind(this, function(inEvent)
		{
			this.get("documentsToUpload")[name] = {
				"content_type": file.type,
				"data": new Blob([new Uint8Array(inEvent.target.result)], {type:file.type})
			};
			this.$.loadingPopup.hide();
			alertify.message("Document Ready To Be Uploaded<br />Save Changes To Complete Process");
			this.$.documentsRepeater.renderRow(targetIndex);
		});
		try { reader.readAsArrayBuffer(file); }
		catch (err) { this.$.loadingPopup.hide(); }
		finally { this.$.documentsRepeater.children[inEvent.index].$.uploadDocumentInput.get("eventNode").value = "";}
	},

	/*****************************
	* Shareholder letter Section *
	* ***************************/

	handleShareholderLetterChanged: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Uploading...");

		var file = inEvent.target.files && inEvent.target.files.length > 0 ? inEvent.target.files[0] : null;
		var reader = new FileReader();

		reader.onerror = enyo.bind(this, function(error){
			console.log("ERROR!", error);
			alertify.error("Error Reading PDF File");
			this.$.loadingPopup.hide();
			this.shareholderLetterFileName = "";
			//TODO: better error handling
		});

		reader.onloadend = enyo.bind(this, function(inEvent){
			this.$.loadingPopup.hide();
			this.set("shareholderLetter", {"content_type": file.type, "data": new Blob([new Uint8Array(inEvent.target.result)], {type:file.type})});
			alertify.message("Document Ready To Be Uploaded<br />Save Changes To Complete Process");
		});

		try { reader.readAsArrayBuffer(file); }
		catch (err) { this.$.loadingPopup.hide(); }
		finally {
			this.$.uploadShareholderLetterInput.get("eventNode").value = "";
		}
	},

	downloadShareholderLetterButtonTapped:function(){
		if (this.get("shareholderLetter"))
		{
			saveAs(this.get("shareholderLetter").data, "Shareholder Letter.pdf");
		}
		else
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

				this.get("database").getAttachment("settings", "Shareholder Letter.pdf", enyo.bind(this, function(err, response)
				{
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}
					this.$.loadingPopup.hide();
					saveAs(response, "Shareholder Letter.pdf");
				}));
			}));
		}
	},
	/*******************************
	* Payment Instructions Section *
	********************************/

	downloadPaymentInstructionsButtonTapped: function(inSender, inEvent)
	{
		if (this.get("paymentInstructionsToUpload") && Object.keys(this.get("paymentInstructionsToUpload")).length > 0)
		{
			saveAs(this.get("paymentInstructionsToUpload")[this.paymentInstructionsFileName].data, this.paymentInstructionsFileName);
		}
		else
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
				this.get("database").getAttachment("settings", this.paymentInstructionsFileName, enyo.bind(this, function(err, response)
				{
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}
					this.$.loadingPopup.hide();
					saveAs(response, this.paymentInstructionsFileName);
				}));
			}));
		}
	},

	handleUploadPaymentInstructionsInputChanged: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Loading...");

		var index = inEvent.index;
		var file = inEvent.target.files && inEvent.target.files.length > 0 ? inEvent.target.files[0] : new Blob();

		var reader = new FileReader();
		reader.onerror = function(err) {
			console.log("ERROR!", err);
			alertify.error("Error Reading File");
		};
		reader.onloadend = enyo.bind(this, function(inEvent) {
			try
			{
				if (file.type === "application/pdf")
				{
					this.set("paymentInstructionsToUpload", {});
					this.get("paymentInstructionsToUpload")[this.paymentInstructionsFileName] = {
						"content_type": file.type,
						"data": new Blob([new Uint8Array(inEvent.target.result)], {type:file.type})
					};
					alertify.message("Document Ready To Be Uploaded<br />Save Changes To Complete Process");
					this.$.downloadPaymentInstructionDocButton.set("disabled", false);
				}
				else
				{
					alertify.error("Payment Instructions must be a PDF");
				}
			}
			catch (err) { reader.onerror(err); }
			finally
			{
				this.$.uploadPaymentInstructionDocInput.get("eventNode").value = "";
				this.$.loadingPopup.hide();
			}
		});
		reader.readAsArrayBuffer(file);
	},

	/*******************************
	* Supporting Documents Section *
	********************************/

	downloadSupportingDocumentsButtonTapped: function(inSender, inEvent)
	{
		if (this.get("supportingDocumentsToUpload") && Object.keys(this.get("supportingDocumentsToUpload")).length > 0)
		{
			saveAs(this.get("supportingDocumentsToUpload")[this.supportingDocumentsFileName].data, this.supportingDocumentsFileName);
		}
		else
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
				this.get("database").getAttachment("settings", this.supportingDocumentsFileName, enyo.bind(this, function(err, response)
				{
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}
					this.$.loadingPopup.hide();
					saveAs(response, this.supportingDocumentsFileName);
				}));
			}));
		}
	},

	handleUploadSupportingDocumentsInputChanged: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Loading...");

		var index = inEvent.index;
		var file = inEvent.target.files && inEvent.target.files.length > 0 ? inEvent.target.files[0] : new Blob();

		var reader = new FileReader();
		reader.onerror = function(err) {
			console.log("ERROR!", err);
			alertify.error("Error Reading File");
		};
		reader.onloadend = enyo.bind(this, function(inEvent) {
			try
			{
				if (file.type === "application/pdf")
				{
					this.set("supportingDocumentsToUpload", {});
					this.get("supportingDocumentsToUpload")[this.supportingDocumentsFileName] = {
						"content_type": file.type,
						"data": new Blob([new Uint8Array(inEvent.target.result)], {type:file.type})
					};
					alertify.message("Document Ready To Be Uploaded<br />Save Changes To Complete Process");
					this.$.downloadSupportingDocumentsDocButton.set("disabled", false);
				}
				else
				{
					alertify.error("Supporting Documents must be a PDF");
				}
			}
			catch (err) { reader.onerror(err); }
			finally
			{
				this.$.uploadSupportingDocumentsDocInput.get("eventNode").value = "";
				this.$.loadingPopup.hide();
			}
		});
		reader.readAsArrayBuffer(file);
	}
});