/* global moment,numeral,console,JSON,lumberjack,alertify */
enyo.kind({
	name: "lumberjack.SubscriberDetailPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	handlers:{
		onScroll: "pickFix"
	},

	events: {
		onGoBack: "",
		onGoHome: "",
		onViewEventDetail: "",
		onLogout: ""
	},

	published: {
		database: null,
		activeEntry: null,
		documentsToUpload: null,
		documentsToDelete: null,
		paymentsToUpload: null,
		paymentsToDelete: null,
		subscriptionCollection: null,
		documentsReceived: null,
		paymentsReceived: null,
		jurisdiction: "",
		subscriptionType: "",
		numSigners: 1,
		exemptionType: "",
		subscriptionAgreementGenerated: false,
		subscriptionAgreementGeneratedTimestamp: null,
		subscriptionAgreementSent: false,
		subscriptionAgreementSigned: false,
		subscriptionAgreementToUpload: null,
		paymentDelta: 0,
		verificationType: "",
		verificationSource: "",
		accreditedInvestorQualification: null,
		salespeople: null
	},

	computed: {
		showExemptionTypeSection: ["jurisdiction"],
		showThirdPartyAccreditationPackageSection: ["jurisdiction", "subscriptionType"],
		subscriptionAgreementStatus: ["subscriptionAgreementGenerated", "subscriptionAgreementSent", "subscriptionAgreementSigned"],
		disableAdobeVerificationType: ["jurisdiction", "subscriptionType", "accreditedInvestorQualification"]
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Subscriber Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "deleteEntryButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px;", content: "Delete Entry", ontap: "handleDeleteEntryButtonTapped"},
				{name: "correctEntryButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Correct Entry", ontap: "handleCorrectEntryButtonTapped"},
				{name: "saveEntryButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Save Entry", ontap: "handleSaveEntryButtonTapped"},
				//{name: "createContactButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Create Contact", ontap: "handleCreateContactButtonTapped"},
				{name: "previousEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 50%; padding-right: 5px; min-width: 480px;", components: [
				{kind: "lumberjack.Input", name:"subscriberNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Subscriber Name", required:true},
				{kind: "lumberjack.Input", name:"displayNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Display Name", required:true},
				{name: "corporateContactSection", components: [
					{kind: "lumberjack.Input", name:"contactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Person", required:true},
					{kind: "lumberjack.Input", name:"contactPersonTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Contact Person Title", required:true}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Date of Birth", style: "line-height: 28px; width: 170px;"},
					{kind: "lumberjack.Input", name:"birthDayInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 10px; width: 35px; margin-right: 3px;", inputStyle: "width: 35px; text-align: center;", type:"text", label:"", placeholder: "DD", required:true, inputMaxLength:2, onkeydown: "validateNumberInput"},
					{kind: "lumberjack.Input", name:"birthMonthInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 3px; width: 35px; margin-right: 3px;", inputStyle: "width: 35px; text-align: center;", type:"text", label:"/", required:true, placeholder: "MM", inputMaxLength:2, onkeydown: "validateNumberInput"},
					{kind: "lumberjack.Input", name:"birthYearInput", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 28px;", decoratorStyle: "margin-left: 3px; width: 50px; margin-right: 3px;", inputStyle: "width: 50px; text-align: center;", type:"text", label:"/", required:true, placeholder: "YYYY", inputMaxLength:4, onkeydown: "validateNumberInput"},
				]},
				{kind: "lumberjack.Input", name:"referrerInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Referrer", required:true},
				{kind: "lumberjack.Input", name:"salespersonNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Salesperson Name", required:true},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Notes", style: "line-height: 30px; width: 170px;"},
					{kind: "onyx.InputDecorator", style: "margin-left: 10px; width: 295px; height: 100px;", components: [
						{name: "notesInput", kind: "onyx.TextArea", style: "width: 100%; height: 100%;"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Special Instructions", style: "line-height: 30px; width: 170px;"},
					{kind: "onyx.InputDecorator", style: "margin-left: 10px; width: 295px; height: 100px;", components: [
						{name: "specialInstructionsInput", kind: "onyx.TextArea", style: "width: 100%; height: 100%;"}
					]}
				]}
			]},
			{style: "width: 50%; padding-left: 5px;", components: [
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Subscription Jurisdiction", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 320px;", components: [
						{name: "jurisdictionPickerButton", style: "width: 100%;"},
						{name: "jurisdictionPicker", kind: "onyx.Picker", onSelect:"handleJurisdictionChange", components: [
							{content: "United States", value: "usa"},
							{content: "Canada", value: "canada"},
							{content: "International", value: "international"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Subscription Type", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 320px;", components: [
						{name: "subscriptionTypePickerButton", style: "width: 100%;"},
						{name: "subscriptionTypePicker", kind: "onyx.Picker", components: [
							{content: "Individual/Joint", value: "individual"},
							{content: "Corporate/Trust/Other", value: "corporate"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Subscription Status", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 320px;", components: [
						{name: "subscriptionStatusPickerButton", disabled: true, style: "width: 100%;"},
						{name: "subscriptionStatusPicker", kind: "onyx.Picker", components: [
							{name: "subscriptionStatusPickerNew", content: "New", value: "new"},
							{content: "Incomplete Docs, No Funds", value: "incompleteDocsNoFunds"},
							{content: "Incomplete Docs, Partial Funds", value: "incompleteDocsPartialFunds"},
							{content: "Incomplete Docs, All Funds", value: "incompleteDocsAllFunds"},
							{content: "Complete Docs, No Funds", value: "completeDocsNoFunds"},
							{content: "Complete Docs, Partial Funds", value: "completeDocsPartialFunds"},
							{content: "Complete", value: "complete"},
							{name: "subscriptionStatusPickerPending", content: "Pending Cancellation", value: "pendingCancellation"},
							{name: "subscriptionStatusPickerCancelled", content: "Cancelled", value: "cancelled"},
							{content: "Closed", value: "closed"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{name: "renewSubscriptionButton", kind: "lumberjack.Button", style: "margin-left: 180px; line-height: 34px;", content: "Renew Subscription", ontap: "handleRenewSubscriptionButtonTapped"},
					{name: "cancelSubscriptionButton", kind: "lumberjack.Button", style: "margin-left: 10px; line-height: 34px;", content: "Cancel Subscription", ontap: "handleCancelSubscriptionButtonTapped"}
				]},
				{kind: "lumberjack.Input", name:"subscriptionPricePerShareInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Share Price ($)", required:true, inputMaxLength:12},
				{kind: "lumberjack.Input", name:"numSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Number of Shares", required:true, onblur:"handleSubscriptionAmountUpdated", inputMaxLength:12, onkeydown: "validateNumberInput"},
				{kind: "lumberjack.Input", name:"subscriberDollarAmountInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Subscription Amount ($)", required:true, onblur:"handleSubscriptionAmountUpdated", inputMaxLength:12, onkeydown: "validateDecimalInput"},
				{kind: "lumberjack.Input", name:"fundsReceivedInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Funds Received ($)", required:true, inputMaxLength:12},
				{kind: "lumberjack.Input", name:"contactIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 320px;", type:"text", label:"Contact ID", required:true, inputMaxLength:12},
				{name: "subscriptionCreatedSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Subscription Created", style: "line-height: 30px; width: 170px;"},
					{name: "subscriptionCreatedLabel", style: "line-height: 30px; margin-left: 10px;"}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Contact Information", style: "line-height: 30px; width: 170px;"},
					{name: "searchShareholdersButton", kind: "lumberjack.Button", style: "margin-left: 10px; line-height: 34px;", content: "Search Contacts", ontap: "handleSearchShareholdersButtonTapped"},
					{name: "viewContactButton", kind: "lumberjack.Button", style: "margin-left: 10px; line-height: 34px; width: 150px;", content: "View Contact", ontap: "handleViewContactButtonTapped"}
				]}
			]}
		]},
		{name: "contactInfoSection", kind: "lumberjack.ContactInfo"},
		{name: "addressInfoSection", kind: "lumberjack.AddressInfo"},
		{name: "validateAddressButton", kind: "lumberjack.Button", style: "margin-top: 10px; line-height: 34px; width: 150px;", content: "Validate Address", ontap: "handleValidateAddressButtonTapped"},
		{name: "exemptionTypeSection", style: "margin-top: 25px;", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Investor Exemption"},
			{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
				{style: "font-weight: bold; line-height: 34px;", content: "Exemption Type:"},
				{name: "exemptionTypeGroupbox", style: "margin-left: 10px;", kind: "onyx.RadioGroup", components: [
					{name: "accreditedInvestorRadioOption", content: "Accredited Investor", value: "accreditedInvestor"},
					{name: "friendsAndFamilyRadioOption", content: "Friends, Family, and Business Associates", value: "friendsAndFamily"},
					{name: "nonAccreditedInvestorRadioOption", content: 'Non-Accredited Investor', value: "nonAccredited"}
				]}
			]},
			{name: "investorSection", kind:"lumberjack.Investor", style: "margin-top: 10px;"},
			{name: "thirdPartyAccreditationPackageSection", style: "margin-top: 25px;", components: [
				{style: "font-size: 25px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Third Party Accredited Investor Verification"},
				{kind: "enyo.FittableColumns", components: [
					{style: "width: 50%; padding-right: 5px;", components: [
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "Verification Status", style: "line-height: 38px; width: 170px;"},
							{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 292px;", components: [
								{name: "verificationStatusPickerButton", style: "width: 100%;", content: "No Selection"},
								{name: "verificationStatusPicker", kind: "onyx.Picker", components: [
									{name: "verificationStatusPickerPendingOption", content: "Pending", value: "pending"},
									{content: "Verified", value: "verified"},
									{content: "Not Verified", value: "notVerified"}
								]}
							]}
						]},
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{style: "font-weight: bold; line-height: 34px; width: 170px;", content: "Verification Source"},
							{name: "verificationSourceGroupbox", style: "margin-left: 10px;", kind: "onyx.RadioGroup", components: [
								{name: "verificationSourceThirdPartyRadioOption", content: "Third Party", active: true, value: "thirdParty"},
								{name: "verificationSourceVerifyInvestorRadioOption", content: "VerifyInvestor.com", value: "verifyInvestor"},
								{name: "verificationSourceSelfRadioOption", content: "Self", value: "self"}
							]}
						]},
						{name: "thirdPartyManualVerificationSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{style: "font-weight: bold; line-height: 34px; width: 170px;", content: "Verify Manually"},
							{name: "verifyManuallyGroupbox", style: "margin-left: 10px;", kind: "onyx.RadioGroup", components: [
								{name: "verificationManualRadioOption", content: "Yes", value: "manual"},
								{name: "verificationAdobeRadioOption", content: "No", active: true, value: "adobe"}
							]}
						]},
						{name: "thirdPartyAccreditationVerifierInformationLeftColumn", components: [
							{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
								{content: "Verifier Type", style: "line-height: 38px; width: 170px;"},
								{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 292px;", components: [
									{name: "verifierTypePickerButton", style: "width: 100%;", content: "No Selection"},
									{name: "verifierTypePicker", kind: "onyx.Picker", components: [
										{content: "Accountant", value: "accountant"},
										{content: "Attorney", value: "lawyer"},
										{content: "Broker", value: "broker"},
										{content: "Investment Advisor", value: "financialAdvisor"}
									]}
								]}
							]},
							{kind: "lumberjack.Input", name: "verifierNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Verifier Name", required:true},
							{kind: "lumberjack.Input", name: "verifierFirmNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Verifier Firm Name", required:true},
							{kind: "lumberjack.Input", name: "verifierPhoneNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"text", label:"Verifier Phone Number", required:true},
							{kind: "lumberjack.Input", name: "verifierEmailAddressInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 295px;", type:"email", label:"Verifier Email Address", required:true}
						]}
					]},
					{name: "thirdPartyAccreditationVerifierInformationRightColumn", style: "width: 50%; padding-right: 5px;", components: [
						{name: "verifierAddress", kind: "lumberjack.AddressInfo", hideMailingAddressSection: true, hideHeader: true}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
					{kind: "lumberjack.SupportingDocuments", name: "thirdPartySupportingDocuments", module: "transfer", style: "width: 50%", attachmentIndexKey: "name", onAddDocument: "handleAddThirdPartyDocument"}
				]},
				{name: "thirdPartyAccreditationDocumentSection", style: "margin-top: 25px;", components: [
					{name: "thirdPartyAccreditationAdobeDocumentSection", kind: "lumberjack.AdobeDocumentSection", header: "Third Party Verification Package", idKey: "subscriberID", subIdKey: "placementID", onPromptSaveRequired: "handlePromptSaveRequired", routeCancel: "cancelsubscriberthirdpartyaccreditationpackage", routeDownloadSigned: "getsignedsubscriberthirdpartyaccreditationpackage", routeDownloadUnsigned: "getunsignedsubscriberthirdpartyaccreditationpackage", routeGenerate: "generatesubscriberthirdpartyaccreditationpackage", routeGetStatus: "getsubscriberthirdpartyaccreditationpackagestatus", routeRefreshStatus: "refreshsubscriberthirdpartyaccreditationpackagestatus", routeSend: "sendsubscriberthirdpartyaccreditationpackage", routeSendReminder: "sendsubscriberthirdpartyaccreditationpackagereminder", routeViewSigned: "getsignedsubscriberthirdpartyaccreditationpackage", routeViewUnsigned: "getunsignedsubscriberthirdpartyaccreditationpackage"},
					{name: "thirdPartyAccreditationVerifyInvestorDocumentSection", kind: "lumberjack.VerifyInvestorSection", header: "VerifyInvestor.com Verification", idKey: "subscriptionID", subIdKey: "placementID", onPromptSaveRequired: "handlePromptSaveRequired", routeSendAccountLinkRequest: "placements/sendverifyinvestoraccountlinkrequest", routeGetAccountLink: "placements/getverifyinvestoraccountlink", routeSendVerificationRequestLink: "placements/sendverifyinvestorverificationrequest", routeRefreshStatus: "placements/refreshverifyinvestorverificationrequeststatus", routeSendReminderEmail: "placements/sendverifyinvestorverificationrequestreminderemail", routeViewSigned: "placements/getcompletedverifyinvestorverificationdocument", routeDownloadSigned: "placements/getcompletedverifyinvestorverificationdocument"}
				]}
			]}
		]},
		{name: "subscriptionAgreementSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Subscription Agreement"},
			{style: "margin-top: 10px;", components: [
				{name: "subscriptionAgreementStatusIcon", kind: "enyo.Image", style: "margin-left: 5px; height: 32px; width: 32px;"},
				{name: "subscriptionAgreementStatusDescription", style: "margin-left: 10px; display: inline-block;"}
			]},
			{name: "subscriptionAgreementGeneratedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Subscription Agreement Generated", style: "line-height: 30px; width: 300px;"},
				{name: "subscriptionAgreementGeneratedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "subscriptionAgreementSentForSignatureTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Subscription Agreement Sent for Signature", style: "line-height: 30px; width: 300px;"},
				{name: "subscriptionAgreementSentForSignatureTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "subscriptionAgreementSignedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Subscription Agreement Signed", style: "line-height: 30px; width: 300px;"},
				{name: "subscriptionAgreementSignedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{style: "margin-top: 10px;", components: [
				{name: "generateDocumentButton", kind: "lumberjack.Button", content: "Generate Subscription Document", ontap: "handleGenerateDocumentButtonTapped"},
				{name: "downloadUnsignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Unsigned Document", ontap: "handleDownloadUnsignedDocumentTapped"},
				{name: "sendForSignatureButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send for Signature", ontap: "handleSendForSignatureButtonTapped"},
				{name: "viewDocumentStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Document Status", ontap: "handleViewDocumentStatusButtonTapped"},
				{name: "sendReminderButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send Reminder", ontap: "handleSendReminderButtonTapped"},
				{name: "refreshDocumentStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Refresh Document Status", ontap: "handleRefreshDocumentStatusButtonTapped"},
				{name: "viewSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"},
				{name: "downloadSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "width: 50%; padding-right: 5px; min-width: 670px;", components: [
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Supporting Documents"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Description", style: "min-width: 300px;"},
					{content: "Date Received", style: "width: 90px;"}
				]},
				{name: "documentsReceivedRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupDocumentRepeaterItem", components: [
					{name: "documentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "description", style: "width: 300px; line-height: 34px;"},
						{name: "dateReceived", style: "width: 90px; line-height: 34px;"},
						{name: "viewButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View", ontap: "viewDocumentButtonTapped"},
						{name: "downloadButton", kind: "lumberjack.Button", enabledClasses: "button bg-darkViolet fg-white", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Download", ontap: "downloadDocumentButtonTapped"},
						{name: "deleteButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "deleteDocumentButtonTapped"}
					]}
				]},
				{name: "noDocumentsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Documents Received"},
				{style: "margin-top: 10px;", components: [
					{name: "addDocumentButton", kind: "lumberjack.Button", enabledClasses: "button primary", content: "Add Document", ontap: "handleAddDocumentButtonTapped"}
				]}
			]},
			{style: "width: 50%; padding-left: 5px; min-width: 725px;", showing: false, name: "receivedPaymentsSection", components: [
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Received Payments"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Amount", style: "width: 150px;"},
					{content: "Type", style: "width: 200px;"},
					{content: "Date Received", style: "width: 90px;"}
				]},
				{name: "paymentsReceivedRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupPaymentRepeaterItem", components: [
					{name: "paymentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "amount", style: "width: 150px; line-height: 34px;"},
						{name: "paymentType", style: "width: 200px; line-height: 34px;"},
						{name: "dateReceived", style: "width: 90px; line-height: 34px;"},
						{name: "viewButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View", ontap: "viewPaymentButtonTapped"},
						{name: "downloadButton", kind: "lumberjack.Button", enabledClasses: "button bg-darkViolet fg-white", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Download", ontap: "downloadPaymentButtonTapped"},
						{name: "deleteButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "deletePaymentButtonTapped"}
					]}
				]},
				{name: "noPaymentsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Payments Received"},
				{name: "addPaymentButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin-top: 10px;", content: "Add Payment", ontap: "handleAddPaymentButtonTapped"},
				{name: "addRefundButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin-top: 10px; margin-left: 10px;", content: "Reverse Payment", ontap: "handleAddRefundButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"},
		{name: "documentStatusPopup", kind: "lumberjack.ViewAdobeSignDocumentStatusPopup"},
		{name: "shareholderSearchPopup", kind: "lumberjack.ShareholderSearchPopup", onShareholderSelected: "handleShareholderSelected", onCreateNewContact: "handleCreateNewContact", searchRoles: ["any"]}
	],

	bindings: [
		{from: ".subscriptionAgreementStatus", to: ".$.subscriptionAgreementStatusIcon.src", transform: function(v) {
			switch (v)
			{
				case "signed":
					return "assets/icons/circle-icon-green.png";
				case "sent":
					return "assets/icons/circle-icon-yellow.png";
				case "generated":
					return "assets/icons/circle-icon-red.png";
				case "none":
					return "assets/icons/circle-icon-grey.png";
				default:
					return "assets/icons/circle-icon-grey.png";
			}
		}},
		{from: ".subscriptionAgreementStatus", to: ".$.subscriptionAgreementStatusDescription.content", transform: function(v) {
			switch (v)
			{
				case "signed":
					return "Subscription Agreement Signed";
				case "sent":
					return "Subscription Agreement Sent";
				case "generated":
					return "Subscription Agreement Generated";
				case "none":
					return "No Subscription Agreement Present";
				default:
					return "Status Unknown";
			}
		}},
		{from: ".activeEntry", to: ".$.generateDocumentButton.disabled", transform: function(v) {
			try
			{
				var data = v.get("subscriptionInfo").jurisdiction;
				if (data) { return false; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".subscriptionAgreementGenerated", transform: function(v){
			try
			{
				var data = v.get("subscriptionAgreementDoc");
				if (data) { return data.generated; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".subscriptionAgreementGenerated", to: ".$.downloadUnsignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".activeEntry.subscriptionAgreementDoc.sent", to: ".subscriptionAgreementSent"},
		{from: ".subscriptionAgreementStatus", to: ".$.sendForSignatureButton.disabled", transform: function(v) { return v !== "generated"; }},
		{from: ".subscriptionAgreementStatus", to: ".$.viewDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed"); }},
		{from: ".subscriptionAgreementStatus", to: ".$.sendReminderButton.disabled", transform: function(v) { return v !== "sent"; }},
		{from: ".subscriptionAgreementStatus", to: ".$.refreshDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed"); }},
		{from: ".activeEntry.subscriptionAgreementDoc.signed", to: ".subscriptionAgreementSigned"},
		{from: ".activeEntry.subscriptionAgreementDoc.signed", to: ".$.downloadSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".activeEntry.subscriptionAgreementDoc.signed", to: ".$.viewSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".activeEntry.contactInfo.contactID", to: ".$.contactIDInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.contactID", to: ".$.viewContactButton.disabled", transform: function(v) {
			return v === "";
		}},
		{from: ".activeEntry.contactInfo.subscriberName", to: ".$.subscriberNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		//TODO: Rebuild to handle contacts
		// {from: ".$.subscriberNameInput.value", to: ".$.searchShareholdersButton.disabled", transform: function(v) {
		// 	try
		// 	{
		// 		if (v != null) { return v.trim().length === 0; }
		// 		else { throw null; }
		// 	}
		// 	catch (err) { return true; }
		// }},
		{from: ".activeEntry.contactInfo.displayName", to: ".$.displayNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.contactPersonInput.value", transform: function(v) {
			try
			{
				if (v.get("contactInfo").corporateInfo.contactPerson != null) { return v.get("contactInfo").corporateInfo.contactPerson; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.contactPersonTitleInput.value", transform: function(v) {
			try
			{
				if (v.get("contactInfo").corporateInfo.contactPersonTitle != null) { return v.get("contactInfo").corporateInfo.contactPersonTitle; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.dateOfBirth", to: ".$.birthDayInput.value", transform: function(v) {
			try
			{
				var data = moment(v).format("DD");
				if (data && data != "Invalid date") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.dateOfBirth", to: ".$.birthMonthInput.value", transform: function(v) {
			try
			{
				var data = moment(v).format("MM");
				if (data && data != "Invalid date") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo.dateOfBirth", to: ".$.birthYearInput.value", transform: function(v) {
			try
			{
				var data = moment(v).format("YYYY");
				if (data && data != "Invalid date") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.subscriptionInfo.subscriptionCreatedTimestamp", to: ".$.subscriptionCreatedLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.contactInfo", to: ".$.addressInfoSection.activeEntry"},
		{from: ".activeEntry.contactInfo", to: ".$.contactInfoSection.activeEntry"},
		{from: ".activeEntry.subscriptionInfo.jurisdiction", to: ".$.jurisdictionPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.jurisdictionPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Jurisdiction "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.jurisdictionPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.subscriptionInfo.subscriptionType", to: ".$.subscriptionTypePicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.subscriptionTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Subscription Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.subscriptionTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.subscriptionInfo.subscriptionStatus", to: ".$.subscriptionStatusPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.subscriptionStatusPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Subscription Status "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.subscriptionStatusPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.subscriptionInfo.subscriptionStatus", to: ".$.renewSubscriptionButton.disabled", transform: function(val) {
			try
			{
				if (val !== null && (val !== "pendingCancellation" && val !== "cancelled"))
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry.subscriptionInfo.subscriptionStatus", to: ".$.cancelSubscriptionButton.disabled", transform: function(val) {
			try
			{
				if (val !== null && (val === "closed" || val === "cancelled"))
				{
					return true;
				}
				else
				{
					return false;
				}
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry.subscriptionInfo.numShares", to: ".$.numSharesInput.value", transform: function(v) {
			try
			{
				if (v != null && !isNaN(v)) { return numeral(v).format("0"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.subscriptionInfo.subscriberDollarAmount", to: ".$.subscriberDollarAmountInput.value", transform: function(v)
		{
			try
			{
				if (v != null && !isNaN(v)) { return numeral(v).format("0[.]00"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.subscriptionInfo.fundsReceived", to: ".$.fundsReceivedInput.value", transform: function(v) {
			try
			{
				if (v != null && !isNaN(v)) {return v; }
				else { throw null; }
			}
			catch (err) {return ""; }
		}},
		{from: ".activeEntry", to: ".$.referrerInput.value", transform: function(v) {
			try
			{
				if (v.get("subscriptionInfo").referrer != null) { return v.get("subscriptionInfo").referrer; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.salespersonNameInput.value", transform: function(v) {
			try
			{
				if (v.get("subscriptionInfo").salespersonName != null && v.get("subscriptionInfo").salespersonName !== "") { return v.get("subscriptionInfo").salespersonName; }
				else if (v.get("subscriptionInfo").salespersonID != null && v.get("subscriptionInfo").salespersonID !== "") { return this.get("salespeople")[v.get("subscriptionInfo").salespersonID].salespersonName; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.notesInput.value", transform: function(v) {
			try
			{
				if (v.get("subscriptionInfo").notes != null) { return v.get("subscriptionInfo").notes; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.specialInstructionsInput.value", transform: function(v) {
			try
			{
				if (v.get("subscriptionInfo").specialInstructions != null) { return v.get("subscriptionInfo").specialInstructions; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.subscriptionInfo.exemptionType", to: "$.exemptionTypeGroupbox.active", transform: function(v) {
			try
			{
				if (v === "friendsAndFamily")
				{
					return this.$.friendsAndFamilyRadioOption;
				}
				else if (v === "nonAccredited")
				{
					return this.$.nonAccreditedInvestorRadioOption;
				}
				else if (v === "accreditedInvestor")
				{
					return this.$.accreditedInvestorRadioOption;
				}
			}
			catch (err) { return null; }
		}},
		{from: ".activeEntry", to: ".documentsReceived", transform: function(v) {
			try
			{
				var data = v.get("documentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".activeEntry", to: ".paymentsReceived", transform: function(v) {
			try
			{
				var data = v.get("paymentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".activeEntry", to: ".documentsToUpload", transform: function(v) {
			//Use the binding to force the "documents to upload" queue to reset when the activeEntry changes.
			return [];
		}},
		{from: ".activeEntry", to: ".documentsToDelete", transform: function(v) {
			//Use the binding to force the "documents to delete" queue to reset when the activeEntry changes.
			return [];
		}},
		{from: ".activeEntry", to: ".paymentsToUpload", transform: function(v) {
			//Use the binding to force the "payments to upload" queue to reset when the activeEntry changes.
			return [];
		}},
		{from: ".activeEntry", to: ".paymentsToDelete", transform: function(v) {
			//Use the binding to force the "payments to upload" queue to reset when the activeEntry changes.
			return [];
		}},
		{from: ".activeEntry", to: ".subscriptionAgreementGeneratedTimestamp", transform: function(v) {
			//Use the binding to force the "subscription agreement generated timestamp" object to reset when the activeEntry changes.
			return null;
		}},
		{from: ".subscriptionAgreementStatus", to: ".$.subscriptionAgreementGeneratedTimestampSection.showing", transform: function(v) { return v === "generated" || v === "sent" || v === "signed"; }},
		//This binding fires first.
		{from: ".subscriptionAgreementGeneratedTimestamp", to: ".$.subscriptionAgreementGeneratedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		//This binding fires second, and will overwrite the first binding result, but the first will fire again on change, if necessary.
		{from: ".activeEntry.subscriptionAgreementDoc.generatedTimestamp", to: ".$.subscriptionAgreementGeneratedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".subscriptionAgreementStatus", to: ".$.subscriptionAgreementSentForSignatureTimestampSection.showing", transform: function(v) { return v === "sent" || v === "signed"; }},
		{from: ".activeEntry.subscriptionAgreementDoc.sentTimestamp", to: ".$.subscriptionAgreementSentForSignatureTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".subscriptionAgreementStatus", to: ".$.subscriptionAgreementSignedTimestampSection.showing", transform: function(v) { return v === "signed"; }},
		{from: ".activeEntry.subscriptionAgreementDoc.signedTimestamp", to: ".$.subscriptionAgreementSignedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v,"Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("subscriptionCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === 0; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("subscriptionCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".$.jurisdictionPicker.selected", to: ".jurisdiction", transform: function(v) {
			try
			{
				if (v != null) { return v.value; }
				else { throw null; }
			}
			catch (err) { return null; }
		}},
		{from: ".$.subscriptionTypePicker.selected", to: ".subscriptionType", transform: function(v) {
			try
			{
				if (v != null) { return v.value; }
				else { throw null; }
			}
			catch (err) { return null; }
		}},
		{from: ".$.exemptionTypeGroupbox.active", to: ".exemptionType", transform: function(v) {
			try
			{
				if (v != null) { return v.value; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".subscriptionType", to: ".$.corporateContactSection.showing", transform: function(v) { return v === "corporate"; }},
		{from: ".showExemptionTypeSection", to: ".$.exemptionTypeSection.showing"},
		// {from: ".jurisdiction", to: ".$.friendsAndFamilyRadioOption.disabled", transform: function(v) {
		// 	try
		// 	{
		// 		if (v === "canada" && this.$.addressInfoSection.$.provincePicker.get("selected").noFriendsAndFamilyExemption)
		// 		{
		// 			this.$.exemptionTypeGroupbox.set("active", this.$.accreditedInvestorRadioOption);
		// 			return true;
		// 		}
		// 		else { throw null; }
		// 	}
		// 	catch (err) { return false; }
		// }},
		// {from: ".$.provincePicker.selected", to: ".$.friendsAndFamilyRadioOption.disabled", transform: function(v) {
		// 	try
		// 	{
		// 		if (v != null && v.noFriendsAndFamilyExemption)
		// 		{
		// 			this.$.exemptionTypeGroupbox.set("active", this.$.accreditedInvestorRadioOption);
		// 			return true;
		// 		}
		// 		else { throw null; }
		// 	}
		// 	catch (err) { return false; }
		// }},
		{from: ".jurisdiction", to: ".$.addressInfoSection.$.countryPicker.disabled", transform: function(v) {
			try
			{
				if (v === "canada")
				{
					this.$.addressInfoSection.$.countryPicker.set("selected", "CAN");
					return true;
				}
				else if (v === "usa")
				{
					this.$.addressInfoSection.$.countryPicker.set("selected", "USA");
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch (err) { return false; }
		}},
		{from: ".jurisdiction", to: ".$.investorSection.jurisdiction"},
		{from: ".showThirdPartyAccreditationPackageSection", to: ".$.thirdPartyAccreditationPackageSection.showing"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.identityVerificationDoc", to: ".$.thirdPartyAccreditationAdobeDocumentSection.doc"},
		{from: ".activeEntry", to: ".$.thirdPartyAccreditationAdobeDocumentSection.activeEntry"},
		{from: ".activeEntry", to: ".$.thirdPartyAccreditationVerifyInvestorDocumentSection.activeEntry"},
		{from: ".exemptionType", to: ".$.investorSection.exemptionType"},
		{from: ".subscriptionType", to: ".$.investorSection.investorType"},
		{from: ".activeEntry.subscriptionInfo.accreditedInvestorQualification", to: ".$.investorSection.exemptionQualification"},
		{from: ".activeEntry.subscriptionInfo.accreditedInvestorQualificationDetail", to: ".$.investorSection.exemptionQualificationDetail"},
		{from: ".activeEntry.subscriptionInfo.salespersonDetail", to: ".$.investorSection.salespersonDetail"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.verificationStatus", to: ".$.verificationStatusPicker.selected", transform: function(val) {
			for (var i = 0; i < this.$.verificationStatusPicker.controls.length; i++)
			{
				if (this.$.verificationStatusPicker.controls[i].value && this.$.verificationStatusPicker.controls[i].value == val)
				{
					return this.$.verificationStatusPicker.controls[i];
				}
			}
			this.$.verificationStatusPickerButton.set("content", "No Selection");
			return null;
		}},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.type", to: ".$.verifierTypePicker.selected", transform: function(val) {
			for (var i = 0; i < this.$.verifierTypePicker.controls.length; i++)
			{
				if (this.$.verifierTypePicker.controls[i].value && this.$.verifierTypePicker.controls[i].value == val)
				{
					return this.$.verifierTypePicker.controls[i];
				}
			}
			this.$.verifierTypePickerButton.set("content", "No Selection");
			return null;
		}},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.name", to: ".$.verifierNameInput.value"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.firmName", to: ".$.verifierFirmNameInput.value"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.phoneNumber", to: ".$.verifierPhoneNumberInput.value"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.emailAddress", to: ".$.verifierEmailAddressInput.value"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator", to: ".$.verifierAddress.activeEntry"},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.verifyManually", to: "$.verifyManuallyGroupbox.active", transform: function(v) {
			try
			{
				if (v)
				{
					return this.$.verificationManualRadioOption;
				}
				else
				{
					return this.$.verificationAdobeRadioOption;
				}
			}
			catch (err) { return null; }
		}},
		{from: ".$.verifyManuallyGroupbox.active", to: ".verificationType", transform: function(v) {
			try
			{
				if (v != null) { return v.value; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.subscriptionInfo.clientIdentityValidator.verificationSource", to: "$.verificationSourceGroupbox.active", transform: function(v) {
			try
			{
				switch (v)
				{
					case "thirdParty":
						return this.$.verificationSourceThirdPartyRadioOption;
					case "verifyInvestor":
						return this.$.verificationSourceVerifyInvestorRadioOption;
					case "self":
						return this.$.verificationSourceSelfRadioOption;
					default:
						throw new Error();
				}
			}
			catch (err) { return null; }
		}},
		{from: ".$.verificationSourceGroupbox.active", to: ".verificationSource", transform: function(v) {
			try
			{
				if (v != null) { return v.value; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".verificationType", to: ".$.thirdPartyAccreditationDocumentSection.showing", transform: function(v){
			return v === "adobe";
		}},
		{from: ".verificationSource", to: ".$.thirdPartyAccreditationAdobeDocumentSection.showing", transform: function(v){
			return v === "thirdParty";
		}},
		{from: ".verificationSource", to: ".$.thirdPartyAccreditationVerifyInvestorDocumentSection.showing", transform: function(v){
			return v === "verifyInvestor";
		}},
		{from: ".verificationSource", to: ".$.thirdPartyManualVerificationSection.showing", transform: function(v){
			return v !== "self";
		}},
		{from: ".verificationSource", to: ".$.thirdPartyAccreditationVerifierInformationLeftColumn.showing", transform: function(v){
			return v !== "self" && v !== "verifyInvestor";
		}},
		{from: ".verificationSource", to: ".$.thirdPartyAccreditationVerifierInformationRightColumn.showing", transform: function(v){
			return v !== "self" && v !== "verifyInvestor";
		}},
		{from: ".verificationType", to: ".$.verificationStatusPickerButton.disabled", transform: function(v){
			return v === "adobe";
		}},
		{from: ".$.investorSection.checkedBoxes", to: ".accreditedInvestorQualification"},
		{from: ".disableAdobeVerificationType", to: ".$.verificationAdobeRadioOption.disabled", transform: function(v){
			if (v)
			{
				this.$.verifyManuallyGroupbox.set("active", this.$.verificationManualRadioOption);
			}

			return v;
		}},
		{from: ".activeEntry", to: ".$.thirdPartySupportingDocuments.documentsReceived", transform: function(v) {
			try
			{
				var data = v.get("subscriptionInfo").clientIdentityValidator.get("documentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".database", to: ".$.thirdPartySupportingDocuments.database"},
		{from: ".activeEntry", to: ".$.thirdPartySupportingDocuments.activeEntry"},
	],

	clearBorderError: function()
	{
		this.$.contactInfoSection.clearBorderError();
		this.$.addressInfoSection.clearBorderError();
		this.$.jurisdictionPicker.parent.applyStyle("border", null);
		this.$.subscriptionTypePicker.parent.applyStyle("border", null);
		this.$.subscriptionStatusPicker.parent.applyStyle("border", null);
		this.$.verificationSourceGroupbox.applyStyle("border", null);

		this.$.investorSection.clearBorderError();

		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input")
			{
				this.$[key].clearBorderError();
			}
		}
	},

	canEdit: function()
	{
		return lumberjack.hasRole(["admins"], "placement") || (lumberjack.hasRole(["users"], "placement") && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "closed");
	},

	setShowingForRoles: function()
	{
		this.$.deleteEntryButton.set("showing", lumberjack.hasRole(["_admin"]));
		this.$.correctEntryButton.set("showing", lumberjack.hasRole(["admins"], "placement"));
		this.$.saveEntryButton.set("showing", this.canEdit());
		this.$.addDocumentButton.set("showing", this.canEdit());
		this.$.receivedPaymentsSection.set("showing", lumberjack.hasRole(["admins","users"], "placement"));
		this.$.addPaymentButton.set("showing", this.canEdit());
		this.$.addRefundButton.set("showing", lumberjack.hasRole(["admins"], "placement"));
		//If the placement is in closing/closed remove the shareholder search button.
		if(lumberjack.preferences.get("placementInfo").closingDocumentID && Object.keys(lumberjack.preferences.get("placementInfo").closingDocumentID).length > 0)
		{
			this.$.searchShareholdersButton.set("showing", false);
		}
	},

	setElementsDisabled: function(disabled)
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input" || this.$[key].kind === "onyx.Input" || this.$[key].kind === "lumberjack.Button" || this.$[key].kind === "lumberjack.Checkbox"  || this.$[key].kind === "onyx.Checkbox")
			{
				if(this.$[key].name !== "nextEntryButton" && this.$[key].name !== "previousEntryButton")
				{
					this.$[key].set("disabled",disabled);
				}
			}
		}

		this.$.contactInfoSection.setDisabled(disabled);
		this.$.addressInfoSection.setDisabled(disabled);
		this.$.investorSection.setDisabledForRoles(disabled);

		this.$.notesInput.set("disabled", disabled);
		this.$.specialInstructionsInput.set("disabled", disabled);

		this.$.jurisdictionPickerButton.set("disabled", disabled);
		this.$.subscriptionTypePickerButton.set("disabled", disabled);
		this.$.verifierTypePickerButton.set("disabled", disabled);

		this.$.subscriptionStatusPickerButton.set("disabled", true);
		this.$.subscriptionPricePerShareInput.set("disabled", true);
		this.$.fundsReceivedInput.set("disabled", true);
		this.$.salespersonNameInput.set("disabled", true);

		// this.$.accreditedInvestorRadioOption.set("disabled", disabled);

		// if(lumberjack.preferences.get("placementInfo").allowFriendsAndFamily === true)
		// {
		// 	this.$.friendsAndFamilyRadioOption.set("disabled", disabled);
		// }
		// else
		// {
		// 	this.$.friendsAndFamilyRadioOption.set("disabled", true);
		// }

		// if(lumberjack.preferences.get("placementInfo").allowNonAccredited === true)
		// {
		// 	this.$.nonAccreditedInvestorRadioOption.set("disabled", disabled);
		// }
		// else
		// {
		// 	this.$.nonAccreditedInvestorRadioOption.set("disabled", true);
		// }

		this.$.accreditedInvestorRadioOption.set("disabled", true);
		this.$.friendsAndFamilyRadioOption.set("disabled", true);
		this.$.nonAccreditedInvestorRadioOption.set("disabled", true);

		if (this.get("verificationType") === "adobe")
		{
			this.$.verificationStatusPickerButton.set("disabled", true);
		}
		else
		{
			this.$.verificationStatusPickerButton.set("disabled", false);
		}

		this.$.verifierAddress.setDisabled(disabled);

		//Enabled The Non-Data Entry Functions
		if(this.get("activeEntry").get("contactInfo").contactID !== "" && this.get("activeEntry").get("contactInfo").contactID !== undefined && this.get("activeEntry").get("contactInfo").contactID !== null)
		{
			this.$.viewContactButton.set("disabled", false);
		}
		else
		{
			this.$.viewContactButton.set("disabled", true);
		}

		if (!this.get("subscriptionAgreementGenerated"))
		{
			this.$.generateDocumentButton.set("disabled", false);
		}
		if (this.get("subscriptionAgreementGenerated"))
		{
			this.$.downloadUnsignedDocumentButton.set("disabled", false);
		}
		if (this.get("subscriptionAgreementSent"))
		{
			this.$.viewDocumentStatusButton.set("disabled", false);
			this.$.refreshDocumentStatusButton.set("disabled", false);
		}
		if (this.get("subscriptionAgreementSigned"))
		{
			this.$.viewSignedDocumentButton.set("disabled", false);
			this.$.downloadSignedDocumentButton.set("disabled", false);
		}

		if (this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator && 
			this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get && 
				(this.get("subscriptionAgreementSent") || 
				this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").generated || 
				this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").linkAccountRequestSent))
		{
			this.$.verificationManualRadioOption.set("disabled", true);
			this.$.verificationSourceThirdPartyRadioOption.set("disabled", true);
			this.$.verificationSourceVerifyInvestorRadioOption.set("disabled", true);
			this.$.verificationSourceSelfRadioOption.set("disabled", true);
		}
		else
		{
			this.$.verificationManualRadioOption.set("disabled", false);
			this.$.verificationSourceThirdPartyRadioOption.set("disabled", false);
			this.$.verificationSourceVerifyInvestorRadioOption.set("disabled", false);
			this.$.verificationSourceSelfRadioOption.set("disabled", false);
		}
	},

	setDisabledForStatus: function()
	{
		if(this.canEdit())
		{
			if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "new")
			{
				this.setElementsDisabled(true);
				if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "cancelled" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "pendingCancellation")
				{
					this.$.correctEntryButton.set("disabled", false);
				}

				if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "closed")
				{
					this.$.addRefundButton.set("disabled", true);
					this.$.addDocumentButton.set("disabled", true);
					this.$.thirdPartySupportingDocuments.set("readOnly", true);
					this.$.refreshDocumentStatusButton.set("disabled", true);
					this.$.sendReminderButton.set("disabled", true);
				}
			}
			else if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "new")
			{
				this.setElementsDisabled(false);
				this.$.searchShareholdersButton.set("disabled", false);
				this.$.renewSubscriptionButton.set("disabled", true);
				this.$.downloadUnsignedDocumentButton.set("disabled", true);
				this.$.sendForSignatureButton.set("disabled", true);
				this.$.viewDocumentStatusButton.set("disabled", true);
				this.$.refreshDocumentStatusButton.set("disabled", true);
				this.$.sendReminderButton.set("disabled", true);
				this.$.viewSignedDocumentButton.set("disabled", true);
				this.$.downloadSignedDocumentButton.set("disabled", true);
				this.$.correctEntryButton.set("disabled", true);
				this.$.deleteEntryButton.set("disabled", true);

				if(this.$.jurisdictionPicker.get("selected").value === "canada" || this.$.jurisdictionPicker.get("selected").value === "usa")
				{
					this.$.addressInfoSection.disableCountryPicker(true);
				}
				else
				{
					this.$.addressInfoSection.disableCountryPicker(false);
				}
			}

			this.$.notesInput.set("disabled", false);
			//this.$.specialInstructionsInput.set("disabled", false);
			this.$.saveEntryButton.set("disabled", false);
			this.$.addPaymentButton.set("disabled", false);
			this.$.addDocumentButton.set("disabled", false);
			this.$.thirdPartySupportingDocuments.set("readOnly", false);

			//Special Cases
			if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "new" && !this.get("activeEntry").get("contactInfo").contactID)
			{
				this.$.deleteEntryButton.set("disabled", false);
			}
			if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "pendingCancellation" || this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "cancelled")
			{
				this.$.renewSubscriptionButton.set("disabled", false);
			}
			if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "closed" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "cancelled")
			{
				this.$.cancelSubscriptionButton.set("disabled", false);
			}
			if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "pendingCancellation")
			{
				this.$.addPaymentButton.set("disabled", true);
				this.$.verificationStatusPickerButton.set("disabled", true);
			}
			if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "cancelled" || this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "complete" || this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "closed")
			{
				this.$.addPaymentButton.set("disabled", true);
				this.$.verificationStatusPickerButton.set("disabled", true);
			}

			if (this.get("subscriptionAgreementGenerated"))
			{
				this.$.downloadUnsignedDocumentButton.set("disabled", false);
				if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "closed" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "cancelled" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "pendingCancellation")
				{
					this.$.sendForSignatureButton.set("disabled", false);
				}
			}
			if (this.get("subscriptionAgreementSent"))
			{
				this.$.sendForSignatureButton.set("disabled", true);
				this.$.viewDocumentStatusButton.set("disabled", false);
				if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "closed" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "cancelled" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "pendingCancellation")
				{
					this.$.refreshDocumentStatusButton.set("disabled", false);
					this.$.sendReminderButton.set("disabled", false);
				}
			}
			if (this.get("subscriptionAgreementSigned"))
			{
				this.$.sendReminderButton.set("disabled", true);
				this.$.viewSignedDocumentButton.set("disabled", false);
				this.$.downloadSignedDocumentButton.set("disabled", false);
			}
		}

		//Prevent Issues when already in closing
		if(lumberjack.preferences.get("placementInfo").closingDocumentID && Object.keys(lumberjack.preferences.get("placementInfo").closingDocumentID).length > 0)
		{
			this.$.renewSubscriptionButton.set("disabled", true);
		}

		//Prevent Issues when subscription is already set to closed (unable to be editted via database rule)
		if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "closed")
		{
			this.$.addDocumentButton.set("disabled", true);
			this.$.thirdPartySupportingDocuments.set("readOnly", true);
			this.$.notesInput.set("disabled", true);
			this.$.correctEntryButton.set("disabled", true);
			this.$.saveEntryButton.set("disabled", true);
		}

		var tempFunds = 0;

		for (var i = 0; i < this.get("paymentsReceived").length; i++)
		{
			tempFunds += lumberjack.parseFloat(this.get("paymentsReceived")[i].amount);
		}

		if (tempFunds >= this.get("activeEntry").get("subscriberDollarAmount"))
		{
			this.$.addPaymentButton.set("disabled", true);
		}

		if(tempFunds <= 0)
		{
			this.$.addRefundButton.set("disabled", true);
		}
		else if(tempFunds > 0 && lumberjack.hasRole(["admins"], "placement") && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "closed" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "cancelled")
		{
			this.$.addRefundButton.set("disabled", false);
		}
	},

	setDisabledForRoles: function()
	{
		//var disabled = !this.canEdit();
		this.setElementsDisabled(true);

		if(this.canEdit())
		{
			this.setDisabledForStatus();
		}
	},

	activate: function(activeEntry)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { this.doGoHome(); return; }

		this.clearBorderError();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new lumberjack.SubscriptionModel({}));
		if (activeEntry != null) { this.set("activeEntry", activeEntry); }

		this.$.subscriptionPricePerShareInput.set("value", numeral(lumberjack.preferences.get("placementInfo").sharePrice).format("0.00[000]"));

		//Force render for disabled inputs to work around case 253
		//this.$.subscriptionPricePerShareInput.render();
		//this.$.fundsReceivedInput.render();

		this.$.contactIDInput.hide();
		this.set("paymentDelta", 0);

		this.setDisabledForRoles();
		this.setShowingForRoles();

		this.refreshRepeaters();
		this.resize();
	},

	refreshRepeaters: function()
	{
		this.$.noDocumentsLabel.set("showing", this.get("documentsReceived").length === 0);
		this.$.documentsReceivedRepeater.set("showing", this.get("documentsReceived").length > 0);
		this.$.documentsReceivedRepeater.setCount(this.get("documentsReceived").length);

		this.$.noPaymentsLabel.set("showing", this.get("paymentsReceived").length === 0);
		this.$.paymentsReceivedRepeater.set("showing", this.get("paymentsReceived").length > 0);
		this.$.paymentsReceivedRepeater.setCount(this.get("paymentsReceived").length);

		var tempFunds = 0;

		for (var i = 0; i < this.get("paymentsReceived").length; i++)
		{
			tempFunds += lumberjack.parseFloat(this.get("paymentsReceived")[i].amount);
		}

		this.$.fundsReceivedInput.set("value", lumberjack.parseFloat(tempFunds).toFixed(2));
		this.$.thirdPartySupportingDocuments.refreshRepeater();
	},

	handleJurisdictionChange: function(inSender, inEvent)
	{
		this.$.addressInfoSection.jurisdictionChange(this.$.jurisdictionPicker.get("selected").value);
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	handleSubscriptionAmountUpdated: function(inSender, inEvent)
	{
		var subscriptionPrice = lumberjack.parseFloat(this.$.subscriptionPricePerShareInput.get("value"));
		//Bail on error
		if (subscriptionPrice <= 0) {
			return;
		}
		else if(lumberjack.parseFloat(this.$.subscriberDollarAmountInput.get("value")) <= 0)
		{
			this.$.subscriberDollarAmountInput.set("value", numeral(this.get("activeEntry").get("subscriberDollarAmount")).format("0[.]00"));
		}
		else if(lumberjack.parseInt(this.$.numSharesInput.get("value")) <= 0)
		{
			this.$.numSharesInput.set("value", numeral(this.get("activeEntry").get("numShares")).format("0"));
		}

		switch (inSender.name)
		{
			case "numSharesInput":
				this.$.subscriberDollarAmountInput.set("value", numeral(lumberjack.parseInt(this.$.numSharesInput.get("value")) * subscriptionPrice).format("0[.]00"));
				break;
			case "subscriberDollarAmountInput":
				this.$.numSharesInput.set("value", numeral(lumberjack.parseFloat(this.$.subscriberDollarAmountInput.get("value")) / subscriptionPrice).format("0"));
				break;
		}
	},

	/******************************
	* Computed Property Functions *
	******************************/

	showThirdPartyAccreditationPackageSection: function()
	{
		return this.get("jurisdiction") === "usa" && this.get("exemptionType") === "accreditedInvestor" && lumberjack.preferences.get("placementInfo") && lumberjack.preferences.get("placementInfo").is506cFinancing; 
	},

	showExemptionTypeSection: function()
	{
		return true;
	},

	subscriptionAgreementStatus: function()
	{
		if (this.get("subscriptionAgreementSigned"))
		{
			return "signed";
		}

		if (this.get("subscriptionAgreementSent"))
		{
			return "sent";
		}

		if (this.get("subscriptionAgreementGenerated"))
		{
			return "generated";
		}

		return "none";
	},

	disableAdobeVerificationType: function()
	{
		if (!(lumberjack.preferences.get("placementInfo") && lumberjack.preferences.get("placementInfo").is506cFinancing) || this.get("exemptionType") !== "accreditedInvestor")
		{
			return false;
		}

		if (this.get("jurisdiction") === "usa" && this.get("subscriptionType") === "individual")
		{
			return false;
		}
		else if (this.get("jurisdiction") === "usa" && this.get("subscriptionType") === "corporate")
		{
			if (this.get("accreditedInvestorQualification").indexOf("usa6A") === -1 && this.get("accreditedInvestorQualification").indexOf("usa6B") === -1 &&this.get("accreditedInvestorQualification").indexOf("usa6F") === -1)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		else
		{
			return false;
		}
	},

	/************
	* Observers *
	*************/

	verificationSourceChanged: function(oldVal, newVal)
	{
		if (this.get("activeEntry") && newVal && newVal !== oldVal)
		{
			var verificationSource = this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.getVerificationSource(newVal);

			this.$.verificationStatusPicker.setSelected(this.$.verificationStatusPickerPendingOption); //At the moment, this is *always* pending
			this.$.verifyManuallyGroupbox.set("active", verificationSource.verifyManually ? this.$.verificationManualRadioOption : this.$.verificationAdobeRadioOption);

			this.$.verifierTypePicker.set("selected", null);
			for (var i = 0; i < this.$.verifierTypePicker.controls.length; i++)
			{
				if (this.$.verifierTypePicker.controls[i].value && this.$.verifierTypePicker.controls[i].value == verificationSource.type)
				{
					this.$.verifierTypePicker.set("selected", this.$.verifierTypePicker.controls[i]);
				}
			}
			if (this.$.verifierTypePicker.get("selected") === null)
			{
				this.$.verifierTypePickerButton.set("content", "No Selection");
			}

			this.$.verifierNameInput.set("value", verificationSource.name);
			this.$.verifierFirmNameInput.set("value", verificationSource.firmName);
			this.$.verifierPhoneNumberInput.set("value", verificationSource.phoneNumber);
			this.$.verifierEmailAddressInput.set("value", verificationSource.emailAddress);
			this.$.verifierAddress.updateAddressFields(verificationSource.addressInfo);
		}
	},

	/******************
	* Button Handlers *
	*******************/

	handleAddDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.addDocumentPopup) {
			this.$.addDocumentPopup.hide();
			this.$.addDocumentPopup.destroy();
		}
		this.createComponent({name: "addDocumentPopup", kind: "lumberjack.AddDocumentPopup", onAddDocument: "handleAddDocument", onHide: "handlePopupHidden"} , {owner:this});
		this.$.addDocumentPopup.show();
	},

	handleAddPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.addPaymentPopup) {
			this.$.addPaymentPopup.hide();
			this.$.addPaymentPopup.destroy();
		}
		this.createComponent({name: "addPaymentPopup", kind: "lumberjack.AddPaymentPopup", onAddPayment: "handleAddPayment", onHide: "handlePopupHidden"} , {owner:this});
		this.$.addPaymentPopup.show();
	},

	handleAddRefundButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.addRefundPopup) {
			this.$.addRefundPopup.hide();
			this.$.addRefundPopup.destroy();
		}
		this.createComponent({name: "addRefundPopup", kind: "lumberjack.AddRefundPopup", defaultRefund: this.$.fundsReceivedInput.get("value"), onAddRefund: "handleAddPayment", onHide: "handlePopupHidden"} , {owner:this});
		this.$.addRefundPopup.show();
	},

	handleSearchShareholdersButtonTapped: function(inSender, inEvent)
	{
		if (this.$.subscriberNameInput.get("value").trim().length > 0)
		{
			if (lumberjack.preferences.get("company"))
			{
				this.$.shareholderSearchPopup.show(this.$.subscriberNameInput.get("value").trim(), lumberjack.preferences.get("company"));
			}
			else
			{
				alertify.error("Falied to load Company ID");
			}
		}

		return true;
	},

	//For the moment, just set the contactID
	handleShareholderSelected: function(inSender, inEvent)
	{
		var shareholder = inEvent.shareholder;
		if (!shareholder)
		{
			alertify.error("No Shareholder Selected");
			return true;
		}

		alertify.success("Shareholder Selected. Will update on save.");
		this.$.contactIDInput.set("value", shareholder.get("_id"));
		this.$.viewContactButton.set("disabled", true);
		return true;
	},

	handleCreateNewContact: function(inSender, inEvent)
	{
		alertify.success("New contact will be created when the subscription is saved.");
		this.$.contactIDInput.set("value", "new");
		this.$.viewContactButton.set("disabled", true);
		return true;
	},

	handleViewContactButtonTapped: function(inSender, inEvent)
	{
		this.doViewEventDetail({mode: "contacts", target: this.get("activeEntry").get("contactInfo").contactID});
		return true;
	},

	handleValidateAddressButtonTapped: function(inSender, inEvent)
	{
		var targetURL = "https://www.google.com/maps/place/";


		targetURL = targetURL + this.$.addressInfoSection.$.addressLine1Input.get("value") + ", ";
		if (this.$.addressInfoSection.$.addressLine2Input.get("value")) {targetURL = targetURL + this.$.addressInfoSection.$.addressLine2Input.get("value") + ", ";}
		if (this.$.addressInfoSection.$.addressLine3Input.get("value")) {targetURL = targetURL + this.$.addressInfoSection.$.addressLine3Input.get("value") + ", ";}
		targetURL = targetURL + this.$.addressInfoSection.$.cityInput.get("value") + ", ";
		if (this.$.addressInfoSection.$.countryPicker.get("selected").value === "CAN")
		{
			targetURL = targetURL + this.$.addressInfoSection.$.provincePicker.get("selected").value + ", ";
			targetURL = targetURL + this.$.addressInfoSection.$.postalCodeInput.get("value") + ", ";
		}
		else if (this.$.addressInfoSection.$.countryPicker.get("selected").value === "USA")
		{
			targetURL = targetURL + this.$.addressInfoSection.$.statePicker.get("selected").value + ", ";
			targetURL = targetURL + this.$.addressInfoSection.$.zipCodeInput.get("value") + ", ";
		}
		else
		{
			targetURL = targetURL + this.$.addressInfoSection.$.internationalProvinceInput.get("value") + ", ";
			targetURL = targetURL + this.$.addressInfoSection.$.internationalPostalCodeInput.get("value") + ", ";
		}
		targetURL = targetURL + this.$.addressInfoSection.$.countryPicker.get("selected").content;

		targetURL = targetURL.trim();
		targetURL = targetURL.replace(" ", "+");

		window.open(targetURL);
		return true;
	},

	validateInputs: function()
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		// Subscriber Name:
		if (!this.$.subscriberNameInput.validate()){isValid = false;}

		// Display Name:
		if (!this.$.displayNameInput.validate()){isValid = false;}

		//Catches anything thats wrong but not sanity checkable
		if(moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").format("MMMM Do, YYYY") === "Invalid date")
		{
			isValid = false;
			this.$.birthYearInput.setBorderError();
			this.$.birthMonthInput.setBorderError();
			this.$.birthDayInput.setBorderError();
		}
		if(this.$.birthYearInput.get("value") < 1900 || this.$.birthYearInput.get("value") > lumberjack.parseInt(moment().format('YYYY')))
		{
			isValid = false;
			this.$.birthYearInput.setBorderError();
		}

		//Contact Info Section
		if(!this.$.contactInfoSection.validate()){isValid = false;}

		//Address Info Section
		if(!this.$.addressInfoSection.validate()){isValid = false;}

		// Subscription Jurisdiction:
		if (this.$.jurisdictionPicker.get("selected") == null || this.$.jurisdictionPicker.get("selected").value === "")
		{
			isValid = false;
			this.$.jurisdictionPicker.parent.applyStyle("border", borderError);
		}

		// Subscription Type:
		if (this.$.subscriptionTypePicker.get("selected") == null || this.$.subscriptionTypePicker.get("selected").value === "")
		{
			isValid = false;
			this.$.subscriptionTypePicker.parent.applyStyle("border", borderError);
		}

		// Subscription Status:
		if (this.$.subscriptionStatusPicker.get("selected") == null || this.$.subscriptionStatusPicker.get("selected").value === "")
		{
			isValid = false;
			this.$.subscriptionStatusPicker.parent.applyStyle("border", borderError);
		}

		// Share Price ($):
		if (this.$.subscriptionPricePerShareInput.get("value").trim() === "" || isNaN(this.$.subscriptionPricePerShareInput.get("value"))|| lumberjack.parseFloat(this.$.subscriptionPricePerShareInput.get("value")) <= 0)
		{
			isValid = false;
			this.$.subscriptionPricePerShareInput.setBorderError();
		}

		// Number of Shares:
		if (this.$.numSharesInput.get("value").trim() === "" || isNaN(this.$.numSharesInput.get("value")) || lumberjack.parseInt(this.$.numSharesInput.get("value")) <= 0)
		{
			isValid = false;
			this.$.numSharesInput.setBorderError();
		}

		// Subscription Amount ($):
		if (this.$.subscriberDollarAmountInput.get("value").trim() === "" || isNaN(this.$.subscriberDollarAmountInput.get("value")) || lumberjack.parseFloat(this.$.subscriberDollarAmountInput.get("value")) <= 0)
		{
			isValid = false;
			this.$.subscriberDollarAmountInput.setBorderError();
		}

		// Funds Received ($):
		if (!this.$.fundsReceivedInput.validate()){isValid = false;}

		if( numeral(lumberjack.parseInt(this.$.numSharesInput.get("value")) * lumberjack.parseFloat(this.$.subscriptionPricePerShareInput.get("value"))).format("0.00") != numeral(this.$.subscriberDollarAmountInput.get("value")).format("0.00"))
		{
			isValid = false;
			this.$.numSharesInput.setBorderError();
			this.$.subscriberDollarAmountInput.setBorderError();
			this.$.subscriptionPricePerShareInput.setBorderError();
		}

		if(lumberjack.parseFloat(this.$.fundsReceivedInput.get("value")) < 0)
		{
			isValid = false;
			this.$.fundsReceivedInput.setBorderError();
		}

		// Accredited Investor Qualification:
		if(this.get("exemptionType") !== "nonAccredited" && !this.$.investorSection.validate()){
			isValid = false;			
		}

		//Third Party Verifier
		if (this.get("jurisdiction") === "usa" && this.get("exemptionType") === "accreditedInvestor" && lumberjack.preferences.get("placementInfo").is506cFinancing)
		{
			if (this.get("verificationSource") === "")
			{
				this.$.verificationSourceGroupbox.applyStyle("border", borderError);
				isValid = false;
			}

			if (this.get("verificationSource") !== "self")
			{
				if (this.$.verifierTypePicker.get("selected") == null || this.$.verifierTypePicker.get("selected").value === "")
				{
					this.$.verifierTypePicker.parent.applyStyle("border", borderError);
					isValid = false;
				}

				if (!this.$.verifierNameInput.validate()) {isValid = false;}
				if (!this.$.verifierFirmNameInput.validate()) {isValid = false;}
				if (!this.$.verifierPhoneNumberInput.validate()) {isValid = false;}
				if (!this.$.verifierEmailAddressInput.validate()) {isValid = false;}
				if (!this.$.verifierAddress.validate()) {isValid = false;}
			}
		}

		if (!isValid) { alertify.error("Validation Failed"); }
		return isValid;
	},

	pickFix: function(inSender, inEvent)
	{
		if(inEvent.originator === this)
		{
			if(this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]] !== undefined && this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]].parent !== undefined && this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]].parent.kind === "onyx.PickerDecorator")
			{
				var controls = this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1]].parent.getControls();
				controls.forEach(enyo.bind(this,function(value, index, array) {
					if(value.kind == "onyx.Picker")
					{
						this.$[value.name].hide();
					}
				}));
			}
			//Account for Quantum country and province pickers
			else if(document.activeElement.id.split("_")[document.activeElement.id.split("_").length-1] === "pickerButton")
			{
				if(this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-2]] !== undefined)
				{
					var controls = this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-2]].children[0].getControls();
					controls.forEach(enyo.bind(this,function(value, index, array) {
						if(value.kind == "onyx.Picker")
						{
							this.$[document.activeElement.id.split("_")[document.activeElement.id.split("_").length-2]].$[value.name].hide();
						}
					}));
				}
			}
		}
		else
		{
			//Proper scrolling
		}
	},

	validateSubscriptionStatus: function()
	{
		//Never set to new, pending, cancelled, and closed manually, only via buttons
		var validMatrix = {
			incompleteDocsNoFunds: true,
			incompleteDocsPartialFunds: true,
			incompleteDocsAllFunds: true,
			completeDocsNoFunds: true,
			completeDocsPartialFunds: true,
			complete: true
		};

		var fundsReceived = 0;
		for(var i = 0; i < this.get("paymentsReceived").length; i++)
		{
			fundsReceived = fundsReceived + lumberjack.parseFloat(this.get("paymentsReceived")[i].amount);
		}

		if(!this.get("subscriptionAgreementGenerated") || (this.get("subscriptionAgreementGenerated") && !this.get("subscriptionAgreementSent")))
		{
			validMatrix['completeDocsNoFunds'] = false;
			validMatrix['incompleteDocsAllFunds'] = false;
			validMatrix['incompleteDocsPartialFunds'] = false;
			validMatrix['incompleteDocsNoFunds'] = false;
			validMatrix['completeDocsPartialFunds'] = false;
			validMatrix['complete'] = false;
		}

		if(!this.get("subscriptionAgreementSigned"))
		{
			validMatrix['completeDocsNoFunds'] = false;
			validMatrix['completeDocsPartialFunds'] = false;
			validMatrix['complete'] = false;
		}
		else if(lumberjack.preferences.get("placementInfo").is506cFinancing && this.get("jurisdiction") === "usa" && this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("verificationStatus") !== "verified" && this.get("subscriptionAgreementSigned"))
		{
			//Do nothing? All of the below scenarios are acceptable.
		}
		else if (this.get("subscriptionAgreementSigned"))
		{
			validMatrix['incompleteDocsAllFunds'] = false;
			validMatrix['incompleteDocsPartialFunds'] = false;
			validMatrix['incompleteDocsNoFunds'] = false;
		}

		if (fundsReceived < this.$.subscriberDollarAmountInput.value && fundsReceived > 0)
		{
			validMatrix['completeDocsNoFunds'] = false;
			validMatrix['incompleteDocsAllFunds'] = false;
			validMatrix['incompleteDocsNoFunds'] = false;
			validMatrix['complete'] = false;
		}
		else if(!lumberjack.preferences.get("placementInfo").dapPlacement && fundsReceived <= 0)
		{
			validMatrix['incompleteDocsPartialFunds'] = false;
			validMatrix['incompleteDocsAllFunds'] = false;
			validMatrix['completeDocsPartialFunds'] = false;
			validMatrix['complete'] = false;
		}
		else if(fundsReceived >= this.$.subscriberDollarAmountInput.value)
		{
			validMatrix['completeDocsNoFunds'] = false;
			validMatrix['incompleteDocsPartialFunds'] = false;
			validMatrix['incompleteDocsNoFunds'] = false;
			validMatrix['completeDocsPartialFunds'] = false;
		}

		if (lumberjack.preferences.get("placementInfo").is506cFinancing && this.get("jurisdiction") === "usa" && this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("verificationStatus") !== "verified")
		{
			validMatrix['completeDocsNoFunds'] = false;
			validMatrix['completeDocsPartialFunds'] = false;
			validMatrix['complete'] = false;
		}

		for(var key in validMatrix)
		{
			if(validMatrix[key] === true)
			{
				return key;
			}
		}
		return false;
	},

	validateBusinessRules: function()
	{
		var isValid = true;

		//First, test for subscription closed status. You can't make changes (including marking it as not complete) if the subscription has been closed.
		if (this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "closed")
		{
			alertify.error("Cannot make changes to a closed record.");
			isValid = false;
			return isValid;
		}

		//Check To Make Sure That The Registered Address Country Matches the Subscription Jurisdiction
		if (!this.$.addressInfoSection.$.countryPicker.get("selected"))
		{
			alertify.error("No Country Selected");
			isValid = false;
			return isValid;
		}
		else if ((this.$.addressInfoSection.$.countryPicker.get("selected").value === "CAN" && this.$.jurisdictionPicker.get("selected").value !== "canada") || (this.$.addressInfoSection.$.countryPicker.get("selected").value !== "CAN" && this.$.jurisdictionPicker.get("selected").value === "canada"))
		{
			alertify.error("Jurisdiction and Country Do Not Match");
			isValid = false;
			return isValid;
		}
		else if ((this.$.addressInfoSection.$.countryPicker.get("selected").value === "USA" && this.$.jurisdictionPicker.get("selected").value !== "usa") || (this.$.addressInfoSection.$.countryPicker.get("selected").value !== "USA" && this.$.jurisdictionPicker.get("selected").value === "usa"))
		{
			alertify.error("Jurisdiction and Country Do Not Match");
			isValid = false;
			return isValid;
		}

		var statusUpdate = this.validateSubscriptionStatus();
		if(statusUpdate !== false && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "cancelled" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "pendingCancellation" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== "closed")
		{
			this.$.subscriptionStatusPicker.getControls().forEach(enyo.bind(this,function(value, index, array){
				if(value.value !== undefined && value.value === statusUpdate)
				{
					this.$.subscriptionStatusPicker.set("selected", value);
				}
			}));

		}
		return isValid;
	},

	handleSaveEntryButtonTapped: function(inSender, inEvent, options)
	{
		//Define helper function
		var updateActiveEntry = enyo.bind(this, function(options){
			var completedEmail = false;
			var updateShares = false;
			var signedSubscriptionAgreementCancelledEmail = false;

			this.$.loadingPopup.show("Saving...");
			if (!options || !options.skipUpdateFields)
			{
				this.get("activeEntry").get("contactInfo").subscriberName = this.$.subscriberNameInput.get("value");
				this.get("activeEntry").get("contactInfo").displayName = this.$.displayNameInput.get("value");
				this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson = this.$.contactPersonInput.get("value");
				this.get("activeEntry").get("contactInfo").corporateInfo.contactPersonTitle = this.$.contactPersonTitleInput.get("value");
				this.get("activeEntry").get("contactInfo").dateOfBirth = moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").valueOf();

				this.$.addressInfoSection.updateActiveEntry();
				this.$.contactInfoSection.updateActiveEntry();

				this.get("activeEntry").get("subscriptionInfo").jurisdiction = this.$.jurisdictionPicker.get("selected").value;
				this.get("activeEntry").get("subscriptionInfo").subscriptionType = this.$.subscriptionTypePicker.get("selected").value;
				if(this.$.subscriptionStatusPicker.get("selected").value === "complete" && this.get("activeEntry").get("subscriptionInfo").subscriptionStatus != "complete")
				{
					completedEmail = true;
				}
				this.get("activeEntry").get("subscriptionInfo").subscriptionStatus = this.$.subscriptionStatusPicker.get("selected").value;
				if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "pendingCancellation" && this.$.fundsReceivedInput.get("value") === "0.00")
				{
					this.get("activeEntry").get("subscriptionInfo").subscriptionStatus = "cancelled";
				}
				if(this.get("activeEntry").get("subscriptionInfo").numShares !== lumberjack.parseInt(this.$.numSharesInput.get("value")))
				{
					updateShares = true;
				}
				this.get("activeEntry").get("subscriptionInfo").numShares = lumberjack.parseInt(this.$.numSharesInput.get("value"));
				this.get("activeEntry").get("subscriptionInfo").subscriberDollarAmount = lumberjack.parseFloat(this.$.subscriberDollarAmountInput.get("value"));
				this.get("activeEntry").get("subscriptionInfo").referrer = this.$.referrerInput.get("value");
				this.get("activeEntry").get("subscriptionInfo").salespersonName = this.$.salespersonNameInput.get("value");
				this.get("activeEntry").get("subscriptionInfo").notes = this.$.notesInput.get("value");
				this.get("activeEntry").get("subscriptionInfo").specialInstructions = this.$.specialInstructionsInput.get("value");
				this.get("activeEntry").get("subscriptionInfo").exemptionType = this.get("exemptionType");
				this.get("activeEntry").get("subscriptionInfo").accreditedInvestorQualification = this.$.investorSection.getAccreditedInvestorQualification();
				this.get("activeEntry").get("subscriptionInfo").accreditedInvestorQualificationDetail = this.$.investorSection.getAccreditedInvestorQualificationDetail();
				this.get("activeEntry").get("contactInfo").contactID = this.$.contactIDInput.get("value");

				if (this.get("jurisdiction") === "usa" && this.get("exemptionType") === "accreditedInvestor" && lumberjack.preferences.get("placementInfo").is506cFinancing)
				{
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("type", this.$.verifierTypePicker.get("selected").value);
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("verificationStatus", this.$.verificationStatusPicker.get("selected").value);
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("verifyManually", this.get("verificationType") !== "adobe");
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("name", this.$.verifierNameInput.get("value"));
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("firmName", this.$.verifierFirmNameInput.get("value"));
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("phoneNumber", this.$.verifierPhoneNumberInput.get("value"));
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("emailAddress", this.$.verifierEmailAddressInput.get("value"));
					if (this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("verificationSource") !== this.get("verificationSource"))
					{
						if (this.get("verificationSource") === "verifyInvestor")
						{
							this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("identityVerificationDoc", this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.defaultVerifyInvestorDoc());
						}
						else
						{
							this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("identityVerificationDoc", this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.defaultDoc());
						}
					}
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.set("verificationSource", this.get("verificationSource"));
					this.$.verifierAddress.updateActiveEntry();
				}

				//Very first, make sure that _attachments is initialized
				if (!this.get("activeEntry").get("_attachments")) {this.get("activeEntry").set("_attachments", {});}

				//Delete Documents and Document Attachments we've set to be deleted
				for(var i = 0; i < this.documentsToDelete.length; i++)
				{
					delete this.get("activeEntry").get("_attachments")[this.documentsToDelete[i]];
					//Edit the activeEntry documentsReceived to match our delete
					var itemToFind = this.documentsToDelete[i];
					var result = this.get("activeEntry").get("documentsReceived").find(function(value, index, array) {
						return value.attachmentID === itemToFind;
					});
					if (result)
					{
						this.get("activeEntry").get("documentsReceived").splice(this.get("activeEntry").get("documentsReceived").indexOf(result), 1);
					}
				}
				documentsToDelete = [];

				//Upload documents if we have any documents to upload
				if (this.get("documentsToUpload").length > 0)
				{
					//First, make sure that documentsReceived is initialized
					if (!this.get("activeEntry").get("documentsReceived")) {this.get("activeEntry").set("documentsReceived", []);}

					//Next, add any that we have to upload
					this.get("documentsToUpload").forEach(enyo.bind(this, function(value, index, array) {
						this.get("activeEntry").get("documentsReceived").push(
						{
							description: value.description,
							attachmentID: value.attachmentID,
							name: value.name,
							fileType: value.fileType,
							receivedDate: value.receivedDate
						});

						this.get("activeEntry").get("_attachments")[value.attachmentID] = {
							"content_type": value.fileType,
							"data": new Blob([new Uint8Array(value.fileData)], {type: value.fileType})
						};
					}));
				}

				var clientIdentityValidator = this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator;
				//Delete Third Party Documents and Document Attachments we've set to be deleted
				for(var i = 0; i < this.$.thirdPartySupportingDocuments.get("documentsToDelete").length; i++)
				{
					delete this.get("activeEntry").get("_attachments")[this.$.thirdPartySupportingDocuments.documentsToDelete[i]];
					//Edit the activeEntry documentsReceived to match our delete
					var itemToFind = this.$.thirdPartySupportingDocuments.get("documentsToDelete")[i];
					var result = clientIdentityValidator.get("documentsReceived").find(function(value, index, array) {
						return value.name === itemToFind;
					});
					if (result)
					{
						clientIdentityValidator.get("documentsReceived").splice(clientIdentityValidator.get("documentsReceived").indexOf(result), 1);
					}
				}
				this.$.thirdPartySupportingDocuments.set("documentsToDelete", []);

				//Upload documents if we have any documents to upload
				if (this.$.thirdPartySupportingDocuments.get("documentsToUpload").length > 0)
				{
					//First, make sure that _attachments and documentsReceived are initialized
					if (!clientIdentityValidator.get("documentsReceived")) {clientIdentityValidator.set("documentsReceived", []);}
					if (!this.get("activeEntry").get("_attachments")) {this.get("activeEntry").set("_attachments", {});}

					//Next, add any that we have to upload
					this.$.thirdPartySupportingDocuments.get("documentsToUpload").forEach(enyo.bind(this, function(value, index, array) {
						clientIdentityValidator.get("documentsReceived").push(
						{
							description: value.description,
							name: value.name,
							fileType: value.fileType,
							receivedDate: value.receivedDate
						});

						this.get("activeEntry").get("_attachments")[value.name] = {
							"content_type": value.fileType,
							"data": new Blob([new Uint8Array(value.fileData)], {type: value.fileType})
						};
					}));
				}

				//Delete Payments and Payment Attachments we've set to be deleted
				for(var i = 0; i < this.paymentsToDelete.length; i++)
				{
					delete this.get("activeEntry").get("_attachments")[this.paymentsToDelete[i]];
					//Edit the activeEntry paymentsReceived to match the local one.
					var itemToFind = this.paymentsToDelete[i];
					var result = this.get("activeEntry").get("paymentsReceived").find(function(value, index, array) {
						return value.attachmentID === itemToFind;
					});
					if (result)
					{
						this.get("activeEntry").get("paymentsReceived").splice(this.get("activeEntry").get("paymentsReceived").indexOf(result), 1);
					}
				}
				paymentsToDelete = [];

				//Upload payments if we have any documents to upload
				if (this.get("paymentsToUpload").length > 0)
				{
					//First, make sure that _attachments and paymentsReceived are initialized
					if (!this.get("activeEntry").get("paymentsReceived")) {this.get("activeEntry").set("paymentsReceived", []);}
					if (!this.get("activeEntry").get("_attachments")) {this.get("activeEntry").set("_attachments", {});}

					//Next, add any that we have to upload
					this.get("paymentsToUpload").forEach(enyo.bind(this, function(value, index, array) {
						this.get("activeEntry").get("paymentsReceived").push(
						{
							amount: value.amount, //appliedAmount
							receivedAmount: value.receivedAmount,
							payerName: value.payerName,
							name: value.name,
							attachmentID: value.attachmentID,
							paymentType: value.paymentType,
							fileType: value.fileType,
							receivedDate: value.receivedDate
						});

						this.get("activeEntry").get("_attachments")[value.attachmentID] = {
							"content_type": value.fileType,
							"data": new Blob([new Uint8Array(value.fileData)], {type: value.fileType})
						};
					}));
				}

				//Set the received funds to be the sum of received payments
				if(this.get("activeEntry").get("paymentsReceived") === null || this.get("activeEntry").get("paymentsReceived") === undefined)
				{
					this.get("activeEntry").get("subscriptionInfo").fundsReceived = 0.00;
				}
				else if(this.get("activeEntry").get("paymentsReceived").length === 0)
				{
					this.get("activeEntry").get("subscriptionInfo").fundsReceived = 0.00;
				}
				else
				{
					var sumTotal = 0.00;
					for(var i = 0; i < this.get("activeEntry").get("paymentsReceived").length; i++)
					{
						sumTotal = sumTotal + lumberjack.parseFloat(this.get("activeEntry").get("paymentsReceived")[i].amount);
					}
					this.get("activeEntry").get("subscriptionInfo").fundsReceived = lumberjack.parseFloat(lumberjack.parseFloat(sumTotal).toFixed(2));
				}
			}

			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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
				
				var tempEntry = JSON.parse(JSON.stringify(this.get("activeEntry")));
				tempEntry._attachments = this.get("activeEntry").get("_attachments");

				this.get("database").post(tempEntry, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Entry Update Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}
					this.get("activeEntry").set("_rev", response.rev);

					//Email if new payments have been added
					if(this.paymentDelta > 0)
					{
						var ajaxProperties = {
							cacheBust: false,
							contentType: "application/json",
							method: "POST",
							url: lumberjack.preferences.get("apiServer") + "mailDaemon",
							headers:{
								"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
							}
						};

						var tempVars = {};
						if (this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson !== undefined && this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson !== "")
						{
							tempVars.contactPerson = this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson;
						}
						if (this.get("activeEntry").get("contactInfo").subscriberName !== undefined && this.get("activeEntry").get("contactInfo").subscriberName !== "")
						{
							tempVars.subscriberName = this.get("activeEntry").get("contactInfo").subscriberName;
						}
						tempVars.newPaymentAmount = lumberjack.formatCurrency(this.paymentDelta);
						tempVars.paymentRemaining = lumberjack.formatCurrency(lumberjack.parseFloat(this.get("activeEntry").get("subscriptionInfo").subscriberDollarAmount) - lumberjack.parseFloat(this.get("activeEntry").get("subscriptionInfo").fundsReceived));
						tempVars.companyName = lumberjack.preferences.attributes.placementInfo.companyInfo.companyName;
						ajaxProperties.postBody = {data: tempVars, placement:this.get("activeEntry").get("target"), record: this.get("activeEntry").get("_id"), templateName: "Funds Received"};

						var ajax = new enyo.Ajax(ajaxProperties);

						ajax.response(function(request, response) {
							if (!response.error)
							{
								console.log(response);
								alertify.success("Mail Sent");
							}
							else
							{
								console.log(response);
								alertify.error("Mail Failed To Send");
							}
						}, this);

						ajax.error(function(request, response) {
							console.log("Ajax Error: ",request, response);
						}, this);

						ajax.go();
						this.paymentDelta = 0;

						if (this.get("activeEntry").get("salespersonID"))
						{
							//Silent, best effort.
							var salespersonAjaxProperties = {
								cacheBust: false,
								contentType: "application/json",
								method: "POST",
								url: lumberjack.preferences.get("apiServer") + "sendsalespersonmessagesubscriber",
								headers:{
									"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
								}
							};

							var salespersonAjax = new enyo.Ajax(salespersonAjaxProperties);

							salespersonAjaxProperties.postBody = {placementID: this.get("activeEntry").get("target"), subscriberID: this.get("activeEntry").get("_id"), messageType: "payment"};

							salespersonAjax.go();
						}
					}

					var sendEmailOnSave = enyo.bind(this, function(templateName)
					{
						var ajaxProperties = {
							cacheBust: false,
							contentType: "application/json",
							method: "POST",
							url: lumberjack.preferences.get("apiServer") + "mailDaemon",
							headers:{
								"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
							}
						};

						var tempVars = {};
						if (this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson !== undefined && this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson !== "")
						{
							tempVars.contactPerson = this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson;
						}
						if (this.get("activeEntry").get("contactInfo").subscriberName !== undefined && this.get("activeEntry").get("contactInfo").subscriberName !== "")
						{
							tempVars.subscriberName = this.get("activeEntry").get("contactInfo").subscriberName;
						}
						tempVars.companyName = lumberjack.preferences.attributes.placementInfo.companyInfo.companyName;
						ajaxProperties.postBody = {data: tempVars, placement:this.get("activeEntry").get("target"), record: this.get("activeEntry").get("_id"), templateName: templateName};

						var ajax = new enyo.Ajax(ajaxProperties);

						ajax.response(function(request, response) {
							if (!response.error)
							{
								console.log(response);
								alertify.success("Mail Sent");
							}
							else
							{
								console.log(response);
								alertify.error("Mail Failed To Send");
							}
						}, this);

						ajax.error(function(request, response) {
							console.log("Ajax Error: ",request, response);
						}, this);

						ajax.go();

						if (this.get("activeEntry").get("subscriptionInfo").salespersonID)
						{
							//Silent, best effort.
							var salespersonAjaxProperties = {
								cacheBust: false,
								contentType: "application/json",
								method: "POST",
								url: lumberjack.preferences.get("apiServer") + "sendsalespersonmessagesubscriber",
								headers:{
									"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
								}
							};

							var salespersonAjax = new enyo.Ajax(salespersonAjaxProperties);

							salespersonAjaxProperties.postBody = {placementID: this.get("activeEntry").get("target"), subscriberID: this.get("activeEntry").get("_id"), messageType: "complete"};

							salespersonAjax.go();
						}
					});

					//Email if we have completed the subscription or if we have cancelled a signed subscription agreement
					if (completedEmail)
					{
						sendEmailOnSave("Subscription Complete");
					}

					if(updateShares)
					{
						this.updateContactShares();
					}

					var finalizeSave = enyo.bind(this, function(options){
						this.$.loadingPopup.hide();
						//Sort the collection in case any of the display names have changed.
						var sortByDisplayNameFunction = function(a,b) {
							if(a.get("contactInfo").displayName.toLowerCase() < b.get("contactInfo").displayName.toLowerCase()) {return -1;}
							if(a.get("contactInfo").displayName.toLowerCase() > b.get("contactInfo").displayName.toLowerCase()) {return 1;}
							return 0;
						};

						this.get("subscriptionCollection").sort(sortByDisplayNameFunction);

						//Force bindings to refresh by re-activating the panel.
						this.activate(this.get("activeEntry"));

						if (options && options.callback)
						{
							options.callback();
						}
					});

					finalizeSave(options);
				}));
			}));
		});

		//Test Logic
		if (!this.canEdit()) { return; }

		if (!this.validateInputs()) { return; }

		if (!this.validateBusinessRules()) { return; }

		//Logic tree. Only do contact operations if the contact doesn't match what we had before and we have a contact ID value.
		if (this.get("activeEntry").get("contactInfo").contactID !== this.$.contactIDInput.get("value") && this.$.contactIDInput.get("value") !== "")
		{
			//If there was no contact before, determine if we need to create a new one or just update an existing one.
			if (!this.get("activeEntry").get("contactInfo").contactID || this.get("activeEntry").get("contactInfo").contactID === "")
			{
				if (this.$.contactIDInput.get("value") === "new")
				{
					this.createNewContact(enyo.bind(this, function(response){
						if (response && response.error)
						{
							//If there was an error creating the contact, then bail.
							return;
						}

						updateActiveEntry(options);
					}));
				}
				else
				{
					this.addSubscriptionEntryToContact(enyo.bind(this, function(response){
						if (response && response.error)
						{
							//If there was an error creating the entry, then bail.
							return;
						}

						updateActiveEntry(options);
					}));
				}
			}
			else
			{
				//Otherwise, remove the existing entry before proceeding
				this.removeSubscriptionEntryFromContact(enyo.bind(this, function(response){
					if (response && response.error)
					{
						//If there was an error removing the entry, then bail.
						return;
					}

					if (this.$.contactIDInput.get("value") === "new")
					{
						this.createNewContact(enyo.bind(this, function(response){
							if (response && response.error)
							{
								//If there was an error creating the contact, then bail.
								return;
							}

							updateActiveEntry(options);
						}));
					}
					else
					{
						this.addSubscriptionEntryToContact(enyo.bind(this, function(response){
							if (response && response.error)
							{
								//If there was an error creating the entry, then bail.
								return;
							}

							updateActiveEntry(options);
						}));
					}
				}));
			}
		}
		else
		{
			updateActiveEntry(options);
		}
	},

	cancelSubscriptionAgreement: function(successCallback, errorCallback)
	{
		this.$.loadingPopup.show("Cancelling");
		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "cancelsubscriptionagreement",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				placementID: lumberjack.preferences.get("placementDatabase"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to cancel subscription agreement");
			console.log(response);
			if(response == 401){
				this.doLogout();
				return;
			}
			if(errorCallback)
			{
				setTimeout(errorCallback(),1000);
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				alertify.error("Failed to cancel subscription agreement");
				console.log(response);
				if(errorCallback)
				{
					setTimeout(errorCallback(),1000);
				}
				return;
			}

			alertify.success("Subscription Agreement Annulled!");
			if(successCallback)
			{
				setTimeout(successCallback(),1000);
			}
		}));

		request.go();
	},

	handleRenewSubscriptionButtonTapped: function(inSender, inEvent)
	{
		if(lumberjack.preferences.get("placementInfo").closingDocumentID && Object.keys(lumberjack.preferences.get("placementInfo").closingDocumentID).length > 0)
		{
			alertify.error("Cannot Renew when placement is in closing");
			return;
		}
		this.markSubscriptionEntryAsReactivatedForContact(enyo.bind(this, function(response){
			if (response && response.error)
			{
				alertify.error("Unable To Reactivate Contact");
				return;
			}
			this.get("activeEntry").get("subscriptionInfo").subscriptionStatus = "new";
			this.$.subscriptionStatusPicker.getControls().forEach(enyo.bind(this,function(value, index, array){
				if(value.value === "new")
				{
					this.$.subscriptionStatusPicker.set("selected", value);
				}
			}));
			this.handleSaveEntryButtonTapped();
		}));
	},

	cancelEntry: function(inSender, inEvent)
	{
		if(this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "pendingCancellation" && this.$.fundsReceivedInput.get("value") == 0)
		{
			this.get("activeEntry").get("subscriptionInfo").subscriptionStatus = "cancelled";
			this.handleSaveEntryButtonTapped();
		}
		else
		{
			this.markSubscriptionEntryAsCancelledForContact(enyo.bind(this, function(response){
				if (response && response.error)
				{
					if(response.code === "NOTSUBSCRIBED")
					{
						//Pending Cancellation Makes This Not Necessarily An Error
						alertify.error("Contact Already Not Subscribed");
					}
					else
					{
						alertify.error("Unable To Cancel Contact");
						return;
					}
				}
				this.cancelSubscriptionAgreement(enyo.bind(this, function(){this.$.loadingPopup.hide();}), enyo.bind(this, function(){this.$.loadingPopup.hide();}));
				if (this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator && this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get && this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc").sent)
				{
					this.cancelThirdPartyAccreditationPackage(enyo.bind(this, function(){this.$.loadingPopup.hide();}), enyo.bind(this, function(){this.$.loadingPopup.hide();}));
				}
			}));
		}
	},

	handleCancelSubscriptionButtonTapped: function(inSender, inEvent)
	{
		//this.set("subscriptionAgreementGenerated", false);
		//this.set("subscriptionAgreementSent", false);
		//this.set("subscriptionAgreementSigned", false);

		if (!lumberjack.hasRole(["admins"], "placement")) { return; }

		if (this.$.confirmCancelEntryPopup)
		{
			this.$.confirmCancelEntryPopup.hide();
			this.$.confirmCancelEntryPopup.destroy();
		}

		this.createComponent({name: "confirmCancelEntryPopup", kind: "lumberjack.ConfirmPopup", onYes: "cancelEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmCancelEntryPopup.show("Cancel Entry? This cannot be undone.");
	},

	correctEntry: function()
	{
		if (!lumberjack.hasRole(["admins"], "placement")) { return; }

		if (this.$.correctEntryPopup)
		{
			this.$.correctEntryPopup.hide();
			this.$.correctEntryPopup.destroy();
		}
		this.createComponent({name: "correctEntryPopup", kind: "lumberjack.CorrectEntryPopup", onHide: "handlePopupHidden", activeEntry: this.get("activeEntry")} , {owner:this});
		this.$.correctEntryPopup.show();
	},

	handleCorrectEntryButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins"], "placement")) { return; }

		if (this.isDirty())
		{
			if (this.$.correct_saveChangesPopup)
			{
				this.$.correct_saveChangesPopup.hide();
				this.$.correct_saveChangesPopup.destroy();
			}
			this.createComponent({name: "correct_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.correctEntry), onNo: "correctEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.correct_saveChangesPopup.show("Save changes?");
		}
		else
		{
			this.correctEntry();
		}
	},

	handleDeleteEntryButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["_admin"])) { return; }

		if (this.$.confirmDeleteEntryPopup)
		{
			this.$.confirmDeleteEntryPopup.hide();
			this.$.confirmDeleteEntryPopup.destroy();
		}
		this.createComponent({name: "confirmDeleteEntryPopup", kind: "lumberjack.ConfirmPopup", onYes: "deleteEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeleteEntryPopup.show("Delete Entry? This cannot be undone.");
	},

	deleteEntry: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Deleting...");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "deletesubscription",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				placementID: lumberjack.preferences.get("placementDatabase"),
				subscriptionID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to delete subscription");
			console.log(response, request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to delete subscription");
				console.log(response);
				return;
			}

			alertify.success("Subscription Deleted!");
			//Give the database a chance to update.
			this.set("activeEntry", null);
			this.$.loadingPopup.hide();
			this.doGoBack();
		}));

		request.go();
	},

	createNewContact: function(callback)
	{
		if (this.$.contactIDInput.get("value") !== "new")
		{
			callback({error: true});
			return;
		}

		this.$.loadingPopup.show("Creating...");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "newcontactfromsubscriber",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				placementID: lumberjack.preferences.get("placementDatabase"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to create contact");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			callback({error: true});
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to create contact");
				console.log(response);
				callback({error: true});
				return;
			}

			alertify.success("Contact Created!");
			//Give the database a chance to update.
			setTimeout(enyo.bind(this, function() {
				this.$.loadingPopup.hide();
				this.$.contactIDInput.set("value", response.contactID);
				callback();
			}), 1000);
		}));

		request.go();
	},

	addSubscriptionEntryToContact: function(callback)
	{
		if (this.$.contactIDInput.get("value") === "" || this.$.contactIDInput.get("value") === "new")
		{
			callback({error: true});
			return;
		}

		this.$.loadingPopup.show("Creating...");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "createcontactsubscriptionrecord",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				placementID: lumberjack.preferences.get("placementDatabase"),
				contactID: this.$.contactIDInput.get("value"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to create contact");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			callback({error: true});
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to create contact");
				console.log(response);
				callback({error: true});
				return;
			}

			alertify.success("Contact Created!");
			//Give the database a chance to update.
			setTimeout(enyo.bind(this, function() {
				this.$.loadingPopup.hide();
				callback();
			}), 1000);
		}));

		request.go();
	},

	updateContactShares: function()
	{
		if (this.$.contactIDInput.get("value") === "" || this.$.contactIDInput.get("value") === "new")
		{
			//No need to change contact
			return;
		}

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "updatecontactsubscriptionrecord",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				placementID: lumberjack.preferences.get("placementDatabase"),
				numShares: this.get("activeEntry").get("subscriptionInfo").numShares,
				contactID: this.$.contactIDInput.get("value"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to update share count for contact");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to update share count for contact");
				console.log(response);
				return;
			}

			alertify.success("Contact Share Count Updated!");
		}));

		request.go();
	},

	markSubscriptionEntryAsCancelledForContact: function(callback)
	{
		if (this.$.contactIDInput.get("value") === "" || this.$.contactIDInput.get("value") === "new")
		{
			alertify.error("No contact ID present, or contact ID 'new'");
			callback({error: true});
			return;
		}

		this.$.loadingPopup.show("Updating Contact...");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "cancelcontactsubscriptionrecord",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				placementID: lumberjack.preferences.get("placementDatabase"),
				contactID: this.$.contactIDInput.get("value"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to mark subscription entry as cancelled for contact");
			console.log(response);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			callback({error: true});
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to mark subscription entry as cancelled for contact");
				console.log(response);
				callback(response);
				return;
			}

			alertify.success("Subscription Entry Marked as Cancelled For Contact!");
			//Give the database a chance to update.
			setTimeout(enyo.bind(this, function() {
				this.$.loadingPopup.hide();
				callback();
			}), 1000);
		}));

		request.go();
	},

	markSubscriptionEntryAsReactivatedForContact: function(callback)
	{
		if (this.$.contactIDInput.get("value") === "" || this.$.contactIDInput.get("value") === "new")
		{
			alertify.error("No contact ID present, or contact ID 'new'");
			callback({error: true});
			return;
		}

		this.$.loadingPopup.show("Updating Contact...");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "reactivatecontactsubscriptionrecord",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				placementID: lumberjack.preferences.get("placementDatabase"),
				contactID: this.$.contactIDInput.get("value"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to mark subscription entry as new for contact");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			callback({error: true});
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to mark subscription entry as new for contact");
				console.log(response);
				callback({error: true});
				return;
			}

			alertify.success("Subscription Entry Re-activated for Contact!");
			//Give the database a chance to update.
			setTimeout(enyo.bind(this, function() {
				this.$.loadingPopup.hide();
				callback();
			}), 1000);
		}));

		request.go();
	},

	removeSubscriptionEntryFromContact: function(callback)
	{
		if (!this.get("activeEntry").get("contactID") || this.get("activeEntry").get("contactID") === "")
		{
			alertify.error("No contact to remove");
			callback();
			return;
		}

		this.$.loadingPopup.show("Removing...");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "deletecontactsubscriptionrecord",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				placementID: lumberjack.preferences.get("placementDatabase"),
				contactID: this.get("activeEntry").get("contactInfo").contactID,
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to remove subscription entry");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			callback({error: true});
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to remove subscription entry");
				console.log(response);
				callback({error: true});
				return;
			}

			alertify.success("Subscription Entry Removed!");
			//Give the database a chance to update.
			setTimeout(enyo.bind(this, function() {
				this.$.loadingPopup.hide();
				callback();
			}), 1000);
		}));

		request.go();
	},

	isDirty: function()
	{
		if (!this.get("activeEntry")) { return false; }

		try
		{
			var isDirty_accreditedInvestorQualification = this.$.investorSection.isDirty();

			var isDirty_thirdPartyVerification = false;

			//TODO: Third party dirty checking

			if (this.get("jurisdiction") === "usa" && lumberjack.preferences.get("placementInfo").is506cFinancing)
			{
				var isDirty_thirdPartyVerificationArray = [
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("type") !== (this.$.verifierTypePicker.get("selected")?this.$.verifierTypePicker.get("selected").value:null),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("verificationStatus") !== (this.$.verificationStatusPicker.get("selected")?this.$.verificationStatusPicker.get("selected").value:null),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("verifyManually") !== (this.get("verificationType") === "manual"),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("name") !== this.$.verifierNameInput.get("value"),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("firmName") !== this.$.verifierFirmNameInput.get("value"),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("phoneNumber") !== this.$.verifierPhoneNumberInput.get("value"),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("emailAddress") !== this.$.verifierEmailAddressInput.get("value"),
					this.get("activeEntry").get("subscriptionInfo").clientIdentityValidator.get("verificationSource") !== this.get("verificationSource"),
					this.$.verifierAddress.isDirty(),
					this.$.thirdPartySupportingDocuments.isDirty()
				];
				
				if (isDirty_thirdPartyVerificationArray.indexOf(true)!==-1)
				{
					isDirty_thirdPartyVerification = true;
				}
			}

			var isDirtyArray = [
				isDirty_thirdPartyVerification,
				isDirty_accreditedInvestorQualification,
				this.$.addressInfoSection.isDirty(),
				this.$.contactInfoSection.isDirty(),
				this.get("activeEntry").get("contactInfo").subscriberName !== this.$.subscriberNameInput.get("value"),
				this.get("activeEntry").get("contactInfo").displayName !== this.$.displayNameInput.get("value"),
				this.get("activeEntry").get("contactInfo").corporateInfo.contactPerson !== this.$.contactPersonInput.get("value"),
				this.get("activeEntry").get("contactInfo").corporateInfo.contactPersonTitle !== this.$.contactPersonTitleInput.get("value"),
				this.get("activeEntry").get("contactInfo").dateOfBirth !== moment(this.$.birthDayInput.get("value") + "-" + this.$.birthMonthInput.get("value") + "-" + this.$.birthYearInput.get("value"), "DD-MM-YYYY").valueOf(),
				this.get("activeEntry").get("contactInfo").contactID !== this.$.contactIDInput.get("value"),
				this.get("activeEntry").get("subscriptionInfo").jurisdiction !== (this.$.jurisdictionPicker.get("selected")?this.$.jurisdictionPicker.get("selected").value:null),
				this.get("activeEntry").get("subscriptionInfo").subscriptionType !== (this.$.subscriptionTypePicker.get("selected")?this.$.subscriptionTypePicker.get("selected").value:null),
				this.get("activeEntry").get("subscriptionInfo").subscriptionStatus !== (this.$.subscriptionStatusPicker.get("selected")?this.$.subscriptionStatusPicker.get("selected").value:null),
				this.get("activeEntry").get("subscriptionInfo").numShares !== lumberjack.parseInt(this.$.numSharesInput.get("value")),
				this.get("activeEntry").get("subscriptionInfo").subscriberDollarAmount !== lumberjack.parseFloat(this.$.subscriberDollarAmountInput.get("value")),
				this.get("activeEntry").get("subscriptionInfo").fundsReceived !== lumberjack.parseFloat(this.$.fundsReceivedInput.get("value")),
				this.get("activeEntry").get("subscriptionInfo").referrer !== this.$.referrerInput.get("value"),
				this.get("activeEntry").get("subscriptionInfo").salespersonName !== this.$.salespersonNameInput.get("value"),
				this.get("activeEntry").get("subscriptionInfo").notes !== this.$.notesInput.get("value"),
				this.get("activeEntry").get("subscriptionInfo").specialInstructions !== this.$.specialInstructionsInput.get("value"),
				this.get("activeEntry").get("subscriptionInfo").exemptionType !== (this.get("exemptionType")),
				this.get("documentsToUpload").length !== 0,
				this.get("paymentsToUpload").length !== 0
			];

			// console.log(isDirtyArray);

			return (isDirtyArray.indexOf(true)!==-1);
		}
		catch(err)
		{
			alertify.error("Malformed Data - Check Console Log");
			console.log("Error: Malformed Data", err, this.get("activeEntry"));
			return false;
		}
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSaveEntryButtonTapped(inSender, inEvent, {callback: inSender.action});
	},

	handleNextEntryButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.next_saveChangesPopup)
			{
				this.$.next_saveChangesPopup.hide();
				this.$.next_saveChangesPopup.destroy();
			}
			this.createComponent({name: "next_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.nextEntry), onNo: "nextEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}
		else { this.nextEntry(inSender, inEvent); }
	},

	nextEntry: function(inSender, inEvent)
	{
		this.activate(this.get("subscriptionCollection").at(this.get("subscriptionCollection").indexOf(this.get("activeEntry")) + 1));
	},

	handlePreviousEntryButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.previous_saveChangesPopup)
			{
				this.$.previous_saveChangesPopup.hide();
				this.$.previous_saveChangesPopup.destroy();
			}
			this.createComponent({name: "previous_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.previousEntry), onNo: "previousEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.previous_saveChangesPopup.show("Save changes?");
		}
		else { this.previousEntry(inSender, inEvent); }
	},

	previousEntry: function(inSender, inEvent)
	{
		this.activate(this.get("subscriptionCollection").at(this.get("subscriptionCollection").indexOf(this.get("activeEntry")) - 1));
	},

	/****************************
	* Document Repeater Section *
	****************************/

	setupDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.documentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.description.set("content", this.get("documentsReceived")[inEvent.index].description);
		if(moment(this.get("documentsReceived")[inEvent.index].receivedDate).isValid()){
			inEvent.item.$.dateReceived.set("content", moment(this.get("documentsReceived")[inEvent.index].receivedDate).format("YYYY/MM/DD"));
		}else{
			inEvent.item.$.dateReceived.set("content", this.get("documentsReceived")[inEvent.index].receivedDate);
		}

		inEvent.item.$.deleteButton.set("showing", this.canEdit());

		if( (this.get("documentsReceived")[inEvent.index].localDownload !== true && !lumberjack.hasRole(["admins"], "placement") ) || this.get("activeEntry").get("subscriptionInfo").subscriptionStatus === "closed")
		{
			inEvent.item.$.deleteButton.set("disabled", true);
		}

		return true;
	},

	viewDocumentButtonTapped: function(inSender, inEvent)
	{	// Checks if file is DOCX format
		if (this.get("documentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			var fileType = this.get("documentsReceived")[inEvent.index].fileType;
			var fileData = this.get("documentsReceived")[inEvent.index].fileData;
			var url = URL.createObjectURL(new Blob([new Uint8Array(this.get("documentsReceived")[inEvent.index].fileData)], {type: fileType}));
			this.docxFilePopup(fileType, fileData, url);
		}
		else
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("documentsReceived")[inEvent.index].attachmentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					var reader = new FileReader();
					reader.addEventListener("loadend", enyo.bind(this, function() {
						// rebuild the blob because it's coming back from the couchdb server with the wrong MIME type
						var fileType = this.get("documentsReceived")[inEvent.index].fileType;
						var fileData = reader.result;
						var url = URL.createObjectURL(new Blob([reader.result], {type: fileType}));
						this.$.loadingPopup.hide();
						this.docxFilePopup(fileType, fileData, url);
						// window.open(url);
					}));
					reader.readAsArrayBuffer(response);
				}));
			}));
		}
	},

	downloadDocumentButtonTapped: function(inSender, inEvent)
	{
		if (this.get("documentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			saveAs(new Blob([new Uint8Array(this.get("documentsReceived")[inEvent.index].fileData)], {type: this.get("documentsReceived")[inEvent.index].fileType}), this.get("documentsReceived")[inEvent.index].name);
		}
		else
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("documentsReceived")[inEvent.index].attachmentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();
					saveAs(response, this.get("documentsReceived")[inEvent.index].name);
				}));
			}));
		}
	},

	deleteDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.confirmDeleteDocumentPopup)
		{
			this.$.confirmDeleteDocumentPopup.hide();
			this.$.confirmDeleteDocumentPopup.destroy();
		}
		this.createComponent({name: "confirmDeleteDocumentPopup", kind: "lumberjack.ConfirmPopup", onYesWithReturnValue: "deleteDocument", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeleteDocumentPopup.show("Delete Document? You must save entry to make this permament.", inEvent.index);
	},

	deleteDocument: function(inSender, inEvent)
	{
		if (this.get("documentsReceived")[inEvent.returnValue].localDownload)
		{
			//Delete the local data
			var itemToFind = this.get("documentsReceived")[inEvent.returnValue];
			var result = this.get("documentsToUpload").find(function(value, index, array) {
				return value.name === itemToFind.name;
			});

			this.get("documentsToUpload").splice(this.get("documentsToUpload").indexOf(result), 1);
			this.get("documentsReceived").splice(inEvent.returnValue, 1);
			alertify.success("Document Deleted");
			this.refreshRepeaters();
		}
		else
		{
			this.documentsToDelete.push(this.get("documentsReceived")[inEvent.returnValue].attachmentID);
			this.get("documentsReceived").splice(inEvent.returnValue, 1);
			this.refreshRepeaters();
		}
	},

	/*********************
	* Mammoth DOCX Stuff *
	*********************/
	docxFilePopup: function(fileType, fileData, url)
	{
		if (fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
			var DOCXfileContents = "";

			function handleFileSelect(arrayBuffer, callback) {
				mammoth.convertToHtml({arrayBuffer: arrayBuffer})
				.then(displayResult)
				.then(callback);
			}

			function displayResult(result) {
				DOCXfileContents = result.value;
			}

			function loadPopUp(result) {
				if (that.$.showDocumentPopup) {
					that.$.showDocumentPopup.hide();
					that.$.showDocumentPopup.destroy();
				}
				that.createComponent({name: "showDocumentPopup", kind: "lumberjack.docxPopup"}, {owner:that});
				that.$.showDocumentPopup.$.main.addContent(DOCXfileContents);
				that.$.showDocumentPopup.show();
			}

			var that = this; // sets "this" inside the function

			handleFileSelect(fileData, loadPopUp);

		} else {
			window.open(url);
		}
	},

	/********************
	* Document Handlers *
	********************/

	handleAddDocument: function(inSender, inEvent)
	{
		var byName = function(value, index, array)
		{
			return value.name === inEvent.payload.name;
		};

		if (this.get("documentsToUpload").find(byName) !== undefined || this.get("documentsReceived").find(byName) !== undefined || this.$.thirdPartySupportingDocuments.get("documentsToUpload").find(byName) !== undefined || this.$.thirdPartySupportingDocuments.get("documentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		this.get("documentsToUpload").push(inEvent.payload);
		this.get("documentsReceived").push(
		{
			name: inEvent.payload.name,
			attachmentID: inEvent.payload.attachmentID,
			description: inEvent.payload.description,
			receivedDate: inEvent.payload.receivedDate,
			fileType: inEvent.payload.fileType,
			fileData: inEvent.payload.fileData,
			localDownload: true
		});
		this.refreshRepeaters();
		alertify.success("Document Uploaded!");
	},

	handleAddThirdPartyDocument: function(inSender, inEvent)
	{
		var byName = function(value, index, array)
		{
			return value.name === inEvent.payload.name;
		};

		if (this.get("documentsToUpload").find(byName) !== undefined || this.get("documentsReceived").find(byName) !== undefined || this.$.thirdPartySupportingDocuments.get("documentsToUpload").find(byName) !== undefined || this.$.thirdPartySupportingDocuments.get("documentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		this.$.thirdPartySupportingDocuments.get("documentsToUpload").push(inEvent.payload);
		this.$.thirdPartySupportingDocuments.get("documentsReceived").push(
		{
			name: inEvent.payload.name,
			description: inEvent.payload.description,
			receivedDate: inEvent.payload.receivedDate,
			fileType: inEvent.payload.fileType,
			fileData: inEvent.payload.fileData,
			localDownload: true
		});
		this.$.thirdPartySupportingDocuments.refreshRepeater();
		alertify.success("Document Uploaded!");
	},

	handleDownloadSignedDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.get("activeEntry").get("subscriptionAgreementDoc").signed || this.get("activeEntry").get("subscriptionAgreementDoc").signedAttachmentID === "")
		{
			alertify.error("No signed subscription document present");
			return;
		}

		if (this.get("activeEntry").get("_attachments") && this.get("activeEntry").get("_attachments")[this.get("activeEntry").get("subscriptionAgreementDoc").signedAttachmentID])
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("activeEntry").get("subscriptionAgreementDoc").signedAttachmentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();
					if (inEvent.originator === this.$.viewSignedDocumentButton)
					{
						window.open(URL.createObjectURL(response));
					}
					else
					{
						saveAs(response, this.get("activeEntry").get("subscriptionAgreementDoc").signedFileName);
					}
				}));
			}));
		}
		else
		{
			alertify.error("Unable to find signed subscription document");
		}
	},

	handleDownloadUnsignedDocumentTapped: function(inSender, inEvent)
	{
		if (!this.get("activeEntry").get("subscriptionAgreementDoc").generated)
		{
			alertify.error("No subscription document present");
			return;
		}

		if (this.get("activeEntry").get("_attachments") && this.get("activeEntry").get("_attachments")[this.get("activeEntry").get("subscriptionAgreementDoc").unsignedAttachmentID])
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").get(this.get("activeEntry").get("_id"), {attachments: true}, enyo.bind(this, function(err, response){
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();

					saveAs(lumberjack.b64ToBlob(response._attachments[response.subscriptionAgreementDoc.unsignedAttachmentID].data, response._attachments[response.subscriptionAgreementDoc.unsignedAttachmentID].content_type), response.subscriptionAgreementDoc.unsignedFileName);

					if (response.supportingAccreditedInvestorQuestionnaires) {
						response.supportingAccreditedInvestorQuestionnaires.forEach(enyo.bind(this, function(value, index, array){
							saveAs(lumberjack.b64ToBlob(response._attachments[value.attachmentID].data, response._attachments[value.attachmentID].content_type), value.attachmentName);
						}));
					}
				}));
			}));
		}
		else
		{
			alertify.error("Unable to find subscription document");
		}
	},

	handleGenerateDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.validateInputs()) { return; }

		//As a seperate check, make sure that a contactID has been assigned, since this does not necessarially invalidate other save requests.
		if (this.$.contactIDInput.get("value") === "")
		{
			alertify.error("Cannot generate document without an associated contact.");
			return;
		}

		if (!this.get("jurisdiction"))
		{
			alertify.error("No Jurisdiction Set!");
			return;
		}

		//Check to see if salesperson name is present for canadian and international individual subscribers. It is necessary for document generation.
		if ((this.get("jurisdiction") === "canada" || this.get("jurisdiction") === "international") && this.get("subscriptionType") === "individual" && this.get("exemptionType") === "accreditedInvestor" && this.$.salespersonNameInput.get("value") === "")
		{
			alertify.error("Salesperson Name required for Canadian Individual Subscription");
			this.$.salespersonNameInput.setBorderError();
			return;
		}

		//Require Save before doing this
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.generate_saveChangesPopup)
			{
				this.$.generate_saveChangesPopup.hide();
				this.$.generate_saveChangesPopup.destroy();
			}
			this.createComponent({name: "generate_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.handleGenerateDocumentButtonTapped), onHide: "handlePopupHidden"} , {owner:this});
			this.$.generate_saveChangesPopup.show("Must save changes before generating subscription agreement. Save changes?");
			return;
		}
		else
		{
			this.$.loadingPopup.show("Generating");

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + "generatesubscriptionagreement",
				method: "POST",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				},
				postBody: {
					placementID: lumberjack.preferences.get("placementDatabase"),
					subscriptionID: this.get("activeEntry").get("_id")
				}
			});

			request.error(enyo.bind(this, function(request, response) {
				alertify.error("Failed to generate subscription agreement");
				console.log(request);
				this.$.loadingPopup.hide();
				if(response == 401){
					this.doLogout();
					return;
				}
				return;
			}));

			request.response(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();

				if (response.error)
				{
					alertify.error("Failed to generate subscription agreement");
					console.log(response);
					return;
				}

				alertify.success("Document Generated!");
			}));

			request.go();
		}
	},

	handleSendForSignatureButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.signature_saveChangesPopup)
			{
				this.$.signature_saveChangesPopup.hide();
				this.$.signature_saveChangesPopup.destroy();
			}
			this.createComponent({name: "signature_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.handleSendForSignatureButtonTapped), onHide: "handlePopupHidden"} , {owner:this});
			this.$.signature_saveChangesPopup.show("Must save changes before sending for signature. Save changes?");
			return;
		}
		else
		{
			this.$.loadingPopup.show("Sending");

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + "sendsubscriptionagreement",
				method: "POST",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				},
				postBody: {
					placementID: lumberjack.preferences.get("placementDatabase"),
					subscriberID: this.get("activeEntry").get("_id")
				}
			});

			request.error(enyo.bind(this, function(request, response) {
				alertify.error("Failed to send document for signature");
				console.log(request);
				this.$.loadingPopup.hide();
				if(response == 401){
					this.doLogout();
					return;
				}
				return;
			}));

			request.response(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();

				if (response.error)
				{
					alertify.error("Failed to send document for signature");
					console.log(response);
					return;
				}

				alertify.success("Document Sent!");
			}));

			request.go();
		}
	},

	handleViewDocumentStatusButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "getsubscriptionagreementstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to get document status");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to get document status");
				console.log(response);
				return;
			}

			this.$.documentStatusPopup.show(response.response);
		}));

		request.go({placementID: lumberjack.preferences.get("placementDatabase"),
		subscriberID: this.get("activeEntry").get("_id")});
	},

	handleRefreshDocumentStatusButtonTapped: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.refreshStatus_saveChangesPopup)
			{
				this.$.refreshStatus_saveChangesPopup.hide();
				this.$.refreshStatus_saveChangesPopup.destroy();
			}
			this.createComponent({name: "refreshStatus_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,this.handleRefreshDocumentStatusButtonTapped), onHide: "handlePopupHidden"} , {owner:this});
			this.$.refreshStatus_saveChangesPopup.show("Must save changes before refreshing document status. Save changes?");
			return;
		}
		else
		{
			this.$.loadingPopup.show("Loading");

			var request = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + "refreshsubscriptionagreementstatus",
				cacheBust: false,
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			request.error(enyo.bind(this, function(request, response) {
				alertify.error("Failed to refresh document status");
				console.log(request);
				this.$.loadingPopup.hide();
				if(response == 401){
					this.doLogout();
					return;
				}
				return;
			}));

			request.response(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();

				if (response.error)
				{
					alertify.error("Failed to refresh document status");
					console.log(response);
					return;
				}

				alertify.success("Successfully updated document status.");
			}));

			request.go({placementID: lumberjack.preferences.get("placementDatabase"),
			subscriberID: this.get("activeEntry").get("_id")});
		}
	},

	handleSendReminderButtonTapped: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "sendsubscriptionreminder",
			contentType: "application/json",
			method: "POST",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.postBody = {
			placementID: lumberjack.preferences.get("placementDatabase"),
			subscriberID: this.get("activeEntry").get("_id")
		};

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send subscription reminder");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();

			if (response.error)
			{
				alertify.error("Failed to send subscription reminder");
				console.log(response);
				return;
			}

			alertify.success("Successfully sent subscription reminder.");
		}));

		request.go();
	},

	/*******************************
	* Third Party Verifier Section *
	********************************/

	handlePromptSaveRequired: function(inSender, inEvent)
	{
		//As a seperate check, make sure that a contactID has been assigned, since this does not necessarially invalidate other save requests.
		if (this.$.contactIDInput.get("value") === "")
		{
			alertify.error("Cannot generate document without an associated contact.");
			return true;
		}

		if (this.canEdit() && this.isDirty())
		{
			if (this.$.generate_saveChangesPopup)
			{
				this.$.generate_saveChangesPopup.hide();
				this.$.generate_saveChangesPopup.destroy();
			}
			this.createComponent({name: "generate_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: enyo.bind(this,inEvent.callback), onHide: "handlePopupHidden"} , {owner:this});
			this.$.generate_saveChangesPopup.show("Must save changes before operating on Third Party Verification Package. Save changes?");
		}
		else if (this.canEdit())
		{
			inEvent.callback();
		}

		return true;
	},

	cancelThirdPartyAccreditationPackage: function(successCallback, errorCallback)
	{
		this.$.loadingPopup.show("Cancelling");
		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "cancelsubscriberthirdpartyaccreditationpackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			},
			postBody: {
				placementID: lumberjack.preferences.get("placementDatabase"),
				subscriberID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to cancel third party verification document");
			console.log(response);
			if(response == 401){
				this.doLogout();
				return;
			}
			if(errorCallback)
			{
				setTimeout(errorCallback(),1000);
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				alertify.error("Failed to cancel third party verification document");
				console.log(response);
				if(errorCallback)
				{
					setTimeout(errorCallback(),1000);
				}
				return;
			}

			alertify.success("Third Party Verification Document Annulled!");
			if(successCallback)
			{
				setTimeout(successCallback(),1000);
			}
		}));

		request.go();
	},

	/***************************
	* Payment Repeater Section *
	***************************/

	setupPaymentRepeaterItem: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		if (!inEvent.item) {return true;}

		inEvent.item.$.paymentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.amount.set("content", "$" + lumberjack.formatCurrency(this.get("paymentsReceived")[inEvent.index].amount));
		inEvent.item.$.paymentType.set("content", lumberjack.paymentTypeLookup(this.get("paymentsReceived")[inEvent.index].paymentType));
		if(moment(this.get("paymentsReceived")[inEvent.index].receivedDate).isValid()){
			inEvent.item.$.dateReceived.set("content", moment(this.get("paymentsReceived")[inEvent.index].receivedDate).format("YYYY/MM/DD"));
		}else{
			inEvent.item.$.dateReceived.set("content", this.get("paymentsReceived")[inEvent.index].receivedDate);
		}

		inEvent.item.$.deleteButton.set("showing", this.canEdit());
		if(this.get("paymentsReceived")[inEvent.index].localDownload !== true)
		{
			inEvent.item.$.deleteButton.set("disabled", true);
		}

		return true;
	},

	viewPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		if (this.get("paymentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			var fileType = this.get("paymentsReceived")[inEvent.index].fileType;
			var fileData = this.get("paymentsReceived")[inEvent.index].fileData;
			var url = URL.createObjectURL(new Blob([new Uint8Array(this.get("paymentsReceived")[inEvent.index].fileData)], {type: this.get("paymentsReceived")[inEvent.index].fileType}));
			this.docxFilePopup(fileType, fileData, url);
		}
		else
		{
			this.$.loadingPopup.show("Loading");
			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("paymentsReceived")[inEvent.index].attachmentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					var reader = new FileReader();
					reader.addEventListener("loadend", enyo.bind(this, function() {
						// rebuild the blob because it's coming back from the couchdb server with the wrong MIME type
						var fileType = this.get("paymentsReceived")[inEvent.index].fileType;
						var fileData = reader.result;
						var url = URL.createObjectURL(new Blob([reader.result], {type: fileType}));
						this.$.loadingPopup.hide();
						// window.open(url);
						this.docxFilePopup(fileType, fileData, url);
					}));
					reader.readAsArrayBuffer(response);
				}));
			}));
		}
	},

	downloadPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		if (this.get("paymentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			saveAs(new Blob([new Uint8Array(this.get("paymentsReceived")[inEvent.index].fileData)], {type: this.get("paymentsReceived")[inEvent.index].fileType}), this.get("paymentsReceived")[inEvent.index].name);
		}
		else
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("paymentsReceived")[inEvent.index].attachmentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();
					saveAs(response, this.get("paymentsReceived")[inEvent.index].name);
				}));
			}));
		}
	},

	deletePaymentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.confirmDeletePaymentPopup)
		{
			this.$.confirmDeletePaymentPopup.hide();
			this.$.confirmDeletePaymentPopup.destroy();
		}
		this.createComponent({name: "confirmDeletePaymentPopup", kind: "lumberjack.ConfirmPopup", onYesWithReturnValue: "deletePayment", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeletePaymentPopup.show("Delete? You must save entry to make this permament.", inEvent.index);
	},

	deletePayment: function(inSender, inEvent)
	{
		var itemToFind = this.get("paymentsReceived")[inEvent.returnValue];

		if (this.get("paymentsReceived")[inEvent.returnValue].localDownload)
		{
			//Delete the local data
			var result = this.get("paymentsToUpload").find(function(value, index, array) {
				return value.name === itemToFind.name;
			});

			this.get("paymentsToUpload").splice(this.get("paymentsToUpload").indexOf(result), 1);
			this.paymentDelta -= lumberjack.parseFloat(itemToFind.amount);
			this.get("paymentsReceived").splice(inEvent.returnValue, 1);
			alertify.success("Payment Deleted");
			this.refreshRepeaters();
		}
		else
		{
			this.paymentsToDelete.push(this.get("paymentsReceived")[inEvent.returnValue].attachmentID);
			this.paymentDelta -= lumberjack.parseFloat(itemToFind.amount);
			this.get("paymentsReceived").splice(inEvent.returnValue, 1);
			this.refreshRepeaters();
		}
	},

	/*******************
	* Payment Handlers *
	*******************/

	handleAddPayment: function(inSender, inEvent)
	{
		var byName = function(value, index, array)
		{
			return value.name === inEvent.payload.name;
		};

		if (this.get("paymentsToUpload").find(byName) !== undefined || this.get("paymentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		this.get("paymentsToUpload").push(inEvent.payload);
		this.get("paymentsReceived").push(
		{
			name: inEvent.payload.name,
			attachmentID: inEvent.payload.attachmentID,
			payerName: inEvent.payload.payerName,
			amount: inEvent.payload.amount,
			receivedAmount: inEvent.payload.receivedAmount,
			paymentType: inEvent.payload.paymentType,
			receivedDate: inEvent.payload.receivedDate,
			fileType: inEvent.payload.fileType,
			fileData: inEvent.payload.fileData,
			localDownload: true
		});
		this.paymentDelta += lumberjack.parseFloat(inEvent.payload.amount);
		this.setDisabledForStatus();
		this.refreshRepeaters();
		alertify.success("Payment Uploaded!");
	},

	/**********************
	* Validation Handlers *
	**********************/

	validateNumberInput: function(inSender, inEvent)
	{
		//8 = Backspace, 9 = Tab, 37-40 = Arrow Keys, 46 = Delete 48-57 = Numbers, 96-105 = Numpad Numbers
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if (inEvent.shiftKey || validEntries.indexOf(inEvent.keyCode) === -1)
		{
			inEvent.preventDefault();
			return true;
		}
	},

	validateDecimalInput: function(inSender, inEvent)
	{
		//8 = Backspace, 9 = Tab, 37-40 = Arrow Keys, 46 = Delete, 110 + 190 = Period, 48-57 = Numbers, 96-105 = Numpad Numbers
		var validEntries = [8, 9, 37, 38, 39, 40, 46, 110, 190, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

		if(inEvent.keyCode === 110 || inEvent.keyCode === 190)
		{
			if(inEvent.originator.value.indexOf(".") !== -1)
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