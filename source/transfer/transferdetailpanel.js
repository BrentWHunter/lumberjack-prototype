enyo.kind({
	name: "quantum.TransferDetailPanel",
	kind: "enyo.Scroller",
	//fit: true,

	style: "padding: 15px; width: 100%;",

	published: {
		database: null,
		transferCollection: null,
		activeDate: null,
		activeEntry: null,
		tempEntry: null,
		mode: "edit",
		transferType: "",
		numShares: 0,
		pricePerShare: 0,
		buyPricePerShare: 0,
		sharesAvailable: 0,
		cancelFlag: false,
		sendFlag: false,
		documentsToUpload: null,
		manualDocumentStore: null,
		paymentsReceived: null,
		invoiceDetail: null,
		documentNames: ["purchaseAndSaleAgreement", "sellerPurchaseAndSaleAgreement", "buyerPurchaseAndSaleAgreement", "letterOfInstruction", "powerOfAttorney", "shareTransferApproval", "securitiesTransferForm", "legalOpinion"],
		principals: null,
		lawFirms: null,
		lawyers: null,
		trustAccounts: null,
		poaRecipients: null,
		approvers: null,
		paymentDelta: 0
	},

	events: {
		onGoBack: "",
		onViewEventDetail: "",
		onViewItemDetail: "handleViewItemDetail",
		onLogout: ""
	},

	computed: {
		totalPurchasePrice: ["numShares", "pricePerShare", "buyPricePerShare"]
	},

	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Transfer Information"},
			{fit: true},
			{name: "editButtons", components: [
				//{name: "deleteEntryButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px;", content: "Delete Entry", ontap: "handleDeleteEntryButtonTapped"},
				{name: "saveEntryButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px;", content: "Save Entry", ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "quantum.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]},
			{name: "addButtons", components: [
				{name: "cancelButton", kind: "quantum.Button", content: "Cancel", ontap: "handleCancelButtonTapped"},
				{name: "addEntryButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Add Entry", ontap: "handleSaveEntryButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", components: [
			{style: "width: 50%; min-width: 530px;", components: [
				{kind: "quantum.Input", name:"dateReceivedInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Transaction Date", required:true, ontap: "handleDateReceivedInputTapped", readonly:true},
				{name: "calendarPopup", kind: "quantum.CalendarPopup", onSelect: "calendarDateChanged"},
				{name: "transferStatusContainer", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Transfer Status", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "transferStatusPickerButton", style: "width: 100%;"},
						{name: "transferStatusPicker", kind: "onyx.Picker", components: [
							{content: "New", value: "new"},
							{content: "Funds Only", value: "fundsOnly"},
							{content: "Incomplete Docs, All Funds", value: "incompleteDocsAllFunds"},
							{content: "Documents And Funds Received", value: "completeDocsAndFunds"},
							{content: "With Lawyer", value: "withLawyer"},
							{content: "With Transfer Agent", value: "withTransferAgent"},
							{content: "Complete", value: "complete"},
							{content: "Cancelled", value: "cancelled"}
						]}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Transfer Type", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "transferTypePickerButton", style: "width: 100%;"},
						{name: "transferTypePicker", kind: "onyx.Picker", components: [
							{content: "Standard Transfer", value: "standard"},
							{content: "Custom Transfer", value: "custom"},
							{content: "Transfer for Nominal Value", value: "nominal"},
							{content: "Custom Nominal Value Transfer", value: "customNominal"},
							{content: "Sell Order", value: "order"}
						]}
					]}
				]},
				{name: "principalSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Principal", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "principalPickerButton", style: "width: 100%;"},
						{name: "principalPicker", kind: "onyx.Picker"}
					]}
				]},
				{name: "customCheckboxesSection", kind: "enyo.FittableColumns", style: "margin-top: 10px; margin-left: 180px;", showing: false, components: [
					{name: "psaCheckbox", kind: "quantum.Checkbox", content: "PSA", contentStyle: "margin-right: 4px; margin-left: 4px;"},
					{name: "psa2SCheckbox", kind: "quantum.Checkbox", content: "PSA2S", contentStyle: "margin-right: 4px; margin-left: 4px;", showing: false},
					{name: "psa2BCheckbox", kind: "quantum.Checkbox", content: "PSA2B", contentStyle: "margin-right: 4px; margin-left: 4px;", showing: false},
					{name: "loiCheckbox", kind: "quantum.Checkbox", content: "LOI", contentStyle: "margin-right: 4px; margin-left: 4px;"},
					{name: "poaCheckbox", kind: "quantum.Checkbox", content: "POA", contentStyle: "margin-right: 4px; margin-left: 4px;"},
					{name: "staCheckbox", kind: "quantum.Checkbox", content: "STA", contentStyle: "margin-right: 4px; margin-left: 4px;"},
					{name: "stfCheckbox", kind: "quantum.Checkbox", content: "STF", contentStyle: "margin-right: 4px; margin-left: 4px;"},
					{name: "lgoCheckbox", kind: "quantum.Checkbox", content: "LGO", contentStyle: "margin-right: 4px; margin-left: 4px;"}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Transfer Approval Type", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "transferApprovalTypePickerButton", style: "width: 100%;"},
						{name: "transferApprovalTypePicker", kind: "onyx.Picker", onChange: "handleTransferApprovalTypePickerChanged", components: [
							{content: "Approved by Company", value: "company"},
							{content: "Approved by Greenhill", value: "greenhill"}
						]}
					]}
				]},
				{kind: "quantum.Input", name:"numSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Number of Shares", required:true, inputMaxLength:10, onkeydown: "validateNumberInput"},
				{kind: "quantum.Input", name:"classSharesInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Class of Shares", required:true},
				{kind: "quantum.Input", name:"pricePerShareInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Sell Price per Share", required:true, inputMaxLength:10, onkeydown: "validateDecimalInput"},
				{kind: "quantum.Input", name:"buyPricePerShareInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buy Price per Share", inputMaxLength:10, onkeydown: "validateDecimalInput"},
				{kind: "quantum.Input", name:"purchasePriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Total Purchase Price", required:true},
				{kind: "quantum.Input", name:"companyNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Company Name", required:true},
				{kind: "quantum.Input", name:"certificateNumberInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Certificate Number", required:true},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Notes", style: "line-height: 30px; width: 170px;"},
					{kind: "onyx.InputDecorator", style: "margin-left: 10px; width: 295px; height: 100px;", components: [
						{name: "notesInput", kind: "onyx.TextArea", style: "width: 100%; height: 100%;"}
					]}
				]}
			]},
			{style: "margin-left: 1%; min-width: 530px;", components:[
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Approver Details"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Greenhill Approver", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "approverPickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "approverPicker", kind: "onyx.Picker"}
					]}
				]},	
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Seller Power of Attorney Details"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "POA Recipient", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "poaRecipientPickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "poaRecipientPicker", kind: "onyx.Picker"}
					]}
				]},				
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Lawyer Details"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Law Firm", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "lawFirmPickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "lawFirmPicker", kind: "onyx.Picker", onChange: "handleLawFirmPickerChanged"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Lawyer", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "lawyerPickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "lawyerPicker", kind: "onyx.Picker"}
					]}
				]},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Trust Account", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "trustAccountPickerButton", style: "width: 100%;", content: "No Selection"},
						{name: "trustAccountPicker", kind: "onyx.Picker"}
					]}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{style: "width: 50%; min-width: 530px;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Seller Details"},
					{fit: true},
					{name: "viewSellerButton", kind: "quantum.Button", style: "height: 30px;", content: "View Contact", ontap: "handleViewContact"},
					{name: "refreshSellerButton", kind: "quantum.Button", style: "height: 30px; margin-left: 10px;", content: "Refresh Contact", ontap: "handleRefreshContactButtonTapped"},
					{name: "searchSellerButton", kind: "quantum.Button", style: "height: 30px; margin-left: 10px;", content: "Search Sellers", ontap: "handleSearchSellerButtonTapped"}
				]},
				{name: "sellerSection", components:[
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Seller Type", style: "line-height: 42px; width: 170px;"},
						{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
							{name: "sellerTransferTypePickerButton", disabled: true, style: "width: 100%;"},
							{name: "sellerTransferTypePicker", kind: "onyx.Picker", components: [
								{name: "sellerTransferTypeIndividualPickerItem", content: "Individual/Joint", value: "individual"},
								{name: "sellerTransferTypeCorporatePickerItem", content: "Corporate/Trust/Other", value: "corporate"}
							]}
						]}
					]},
					{kind: "quantum.Input", name:"sellerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Name", required:true},
					{kind: "enyo.Drawer", name:"sellerDrawer", open: false, components:[
						{kind: "quantum.Input", name:"sellerSignatoryNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Signatory Name", required:true},
						{kind: "quantum.Input", name:"sellerSignatoryTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Signatory Title", required:true}
					]},
					{kind: "quantum.Input", name:"sellerAddress1Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Address Line 1", required:true},
					{kind: "quantum.Input", name:"sellerAddress2Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Address Line 2", required:false},
					{kind: "quantum.Input", name:"sellerAddress3Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Address Line 3", required:false},
					{kind: "quantum.Input", name:"sellerCityInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller City", required:true},
					{name: "sellerInternationalStateProvince", showing: false, components: [
						{kind: "quantum.Input", name:"sellerStateProvinceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller State/Province", required:true}
					]},
					{name: "sellerCanadaStateProvince", showing: false, components: [
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "Seller Province", style: "line-height: 42px; width: 170px;"},
							{name: "sellerProvincePicker", disabled: true, style: "margin-left: 10px; width: 350px;", kind: "quantum.ProvincePicker"}
						]}
					]},
					{name: "sellerUSAStateProvince", showing: false, components: [
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "Seller State", style: "line-height: 42px; width: 170px;"},
							{name: "sellerStatePicker", disabled: true, style: "margin-left: 10px; width: 350px;", kind: "quantum.StatePicker"}
						]}
					]},
					{kind: "quantum.Input", name:"sellerZipPostalInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"", required:true},
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Seller Country", style: "line-height: 42px; width: 170px;"},
						{name: "sellerCountryPicker", disabled: true, style: "margin-left: 10px; width: 350px;", kind: "quantum.CountryPicker"}
					]},
					{kind: "quantum.Input", name:"sellerEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Seller Email Address", required:true},
					{kind: "quantum.Input", name:"sellerPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"tel", label:"Seller Phone Number", required:true},
					{kind: "quantum.Input", name:"sellerContactIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", showing: false, label:"Seller Contact ID", required:true}
				]}
			]},
			{style: "margin-left: 1%; width: 49%;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Buyer Details"},
					{fit: true},
					{name: "viewBuyerButton", kind: "quantum.Button", style: "height: 30px;", content: "View Contact", ontap: "handleViewContact"},
					{name: "refreshBuyerButton", kind: "quantum.Button", style: "height: 30px; margin-left: 10px;", content: "Refresh Contact", ontap: "handleRefreshContactButtonTapped"},
					{name: "searchBuyerButton", kind: "quantum.Button", style: "height: 30px; margin-left: 10px;", content: "Search Buyers", ontap: "handleSearchBuyerButtonTapped"}
				]},
				{name: "buyerSection", components:[
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Buyer Type", style: "line-height: 42px; width: 170px;"},
						{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
							{name: "buyerTransferTypePickerButton", disabled: true, style: "width: 100%;"},
							{name: "buyerTransferTypePicker", kind: "onyx.Picker", components: [
								{name: "buyerTransferTypeIndividualPickerItem", content: "Individual/Joint", value: "individual"},
								{name: "buyerTransferTypeCorporatePickerItem", content: "Corporate/Trust/Other", value: "corporate"}
							]}
						]}
					]},
					{kind: "quantum.Input", name:"buyerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Name", required:true},
					{kind: "enyo.Drawer", name:"buyerDrawer", open: false, components:[
						{kind: "quantum.Input", name:"buyerSignatoryNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Signatory Name", required:true},
						{kind: "quantum.Input", name:"buyerSignatoryTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Signatory Title", required:true}
					]},
					{kind: "quantum.Input", name:"buyerAddress1Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Address Line 1", required:true},
					{kind: "quantum.Input", name:"buyerAddress2Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Address Line 2", required:false},
					{kind: "quantum.Input", name:"buyerAddress3Input", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Address Line 3", required:false},
					{kind: "quantum.Input", name:"buyerCityInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer City", required:true},
					{name: "buyerInternationalStateProvince", showing: false, components: [
						{kind: "quantum.Input", name:"buyerStateProvinceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer State/Province", required:true}
					]},
					{name: "buyerCanadaStateProvince", showing: false, components: [
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "Buyer Province", style: "line-height: 42px; width: 170px;"},
							{name: "buyerProvincePicker", disabled: true, style: "margin-left: 10px; width: 350px;", kind: "quantum.ProvincePicker"}
						]}
					]},
					{name: "buyerUSAStateProvince", showing: false, components: [
						{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
							{content: "Buyer State", style: "line-height: 42px; width: 170px;"},
							{name: "buyerStatePicker", disabled: true, style: "margin-left: 10px; width: 350px;", kind: "quantum.StatePicker"}
						]}
					]},
					{kind: "quantum.Input", name:"buyerZipPostalInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"", required:true},
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Buyer Country", style: "line-height: 42px; width: 170px;"},
						{name: "buyerCountryPicker", disabled: true, style: "margin-left: 10px; width: 350px;", kind: "quantum.CountryPicker"}
					]},
					{kind: "quantum.Input", name:"buyerEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", label:"Buyer Email Address", required:true},
					{kind: "quantum.Input", name:"buyerPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"tel", label:"Buyer Phone Number", required:true},
					{kind: "quantum.Input", name:"buyerContactIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Contact ID", showing: false, required:true}
				]}
			]}
		]},
		{name: "editSection", components:[
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px;", content: "Transfer Documents"},
			{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{name: "generateDocumentsButton", kind: "quantum.Button", enabledClasses: "button primary", style: "line-height: 30px;", content: "Generate Documents", ontap: "handleGenerateDocuments"},
				{name: "sendDocumentsButton", kind: "quantum.Button", style: "line-height: 30px; margin-left: 10px;", content: "Send Documents", ontap: "handleSendDocuments"},
				{name: "cancelDocumentsButton", kind: "quantum.Button", style: "line-height: 30px; margin-left: 10px;", content: "Cancel All", ontap: "handleCancelDocuments"},
				{name: "sendToLawyerButton", kind: "quantum.Button", style: "line-height: 30px; margin-left: 10px;", content: "Send To Lawyer", ontap: "handlePostToLawyer", disabled: true}
			]},
			{style: "margin-top: 10px; min-width: 955px; border: 1px solid black; display: inline-block;", components: [
				{name: "purchaseAndSaleAgreementSection", style: "background-color: white; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Purchase and Sale Agreement", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "purchaseAndSaleAgreementStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "purchaseAndSaleAgreementDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "purchaseAndSaleAgreementDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{name: "purchaseAndSaleAgreementResendButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Send Reminder", ontap: "handleResendDocument"},
					{name: "purchaseAndSaleAgreementStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Status", ontap: "handleGetDocumentStatus"},
					{name: "purchaseAndSaleAgreementUpdateStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Refresh Status", ontap: "handleUpdateDocumentStatus"}
				]},
				{name: "sellerPurchaseAndSaleAgreementSection", style: "background-color: white; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Seller Purchase and Sale Agreement", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "sellerPurchaseAndSaleAgreementStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "sellerPurchaseAndSaleAgreementDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "sellerPurchaseAndSaleAgreementDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{name: "sellerPurchaseAndSaleAgreementResendButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Send Reminder", ontap: "handleResendDocument"},
					{name: "sellerPurchaseAndSaleAgreementStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Status", ontap: "handleGetDocumentStatus"},
					{name: "sellerPurchaseAndSaleAgreementUpdateStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Refresh Status", ontap: "handleUpdateDocumentStatus"}
				]},
				{name: "buyerPurchaseAndSaleAgreementSection", style: "background-color: white; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Buyer Purchase and Sale Agreement", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "buyerPurchaseAndSaleAgreementStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "buyerPurchaseAndSaleAgreementDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "buyerPurchaseAndSaleAgreementDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{name: "buyerPurchaseAndSaleAgreementResendButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Send Reminder", ontap: "handleResendDocument"},
					{name: "buyerPurchaseAndSaleAgreementStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Status", ontap: "handleGetDocumentStatus"},
					{name: "buyerPurchaseAndSaleAgreementUpdateStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Refresh Status", ontap: "handleUpdateDocumentStatus"}
				]},
				{name: "letterOfInstructionSection",style: "background-color: lightgrey; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Letter of Instruction", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "letterOfInstructionStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "letterOfInstructionDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "letterOfInstructionDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{name: "letterOfInstructionResendButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Send Reminder", ontap: "handleResendDocument"},
					{name: "letterOfInstructionStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Status", ontap: "handleGetDocumentStatus"},
					{name: "letterOfInstructionUpdateStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Refresh Status", ontap: "handleUpdateDocumentStatus"}
				]},
				{name: "powerOfAttorneySection",kind: "enyo.FittableColumns", style: "background-color: white; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Power of Attorney", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "powerOfAttorneyStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "powerOfAttorneyDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "powerOfAttorneyDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{style: "width: 300px; line-height: 30px; margin-left: 10px;", components: [
						{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
							{name: "poaUploadDocumentInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf"}, onchange: "handleDocumentUpload"}
						]}
					]}
				]},
				{name: "shareTransferApprovalSection", style: "background-color: lightgrey; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Share Transfer Approval", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "shareTransferApprovalStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "shareTransferApprovalDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "shareTransferApprovalDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{name: "shareTransferApprovalResendButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Send Reminder", ontap: "handleResendDocument"},
					{name: "shareTransferApprovalStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Status", ontap: "handleGetDocumentStatus"},
					{name: "shareTransferApprovalUpdateStatusButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Refresh Status", ontap: "handleUpdateDocumentStatus"}
				]},
				{name: "securitiesTransferFormSection", kind: "enyo.FittableColumns", style: "background-color: white; line-height: 30px; padding: 3px 5px; border-bottom: 1px solid black;", components: [
					{content: "Securities Transfer Form", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "securitiesTransferFormStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "securitiesTransferFormDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "securitiesTransferFormDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{style: "width: 300px; line-height: 30px; margin-left: 10px;", components: [
						{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
							{name: "stfUploadDocumentInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf"}, onchange: "handleDocumentUpload"}
						]}
					]}
				]},
				{name: "legalOpinionSection", kind: "enyo.FittableColumns", style: "background-color: lightgrey; line-height: 30px; padding: 3px 5px;", components: [
					{content: "Legal Opinion", style: "line-height: 30px; width: 250px; display: inline-block;"},
					{style: "line-height: 30px; display: inline-block;", components: [
						{name: "legalOpinionStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "legalOpinionDownloadUnsignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Unsigned", ontap: "handleDownloadDocument"},
					{name: "legalOpinionDownloadSignedButton", kind: "quantum.Button", style: "line-height: 30px; display: inline-block; margin-left: 10px;", content: "Download Signed", ontap: "handleDownloadSignedDocument"},
					{style: "width: 300px; line-height: 30px; margin-left: 10px;", components: [
						{kind: "onyx.InputDecorator", alwaysLooksFocused: true, style: "padding: 0; background-color: transparent; border-color: transparent; box-shadow: none;", components: [
							{name: "lgoUploadDocumentInput", kind: "enyo.Input", attributes: {"type": "file", "accept": "application/pdf"}, onchange: "handleDocumentUpload"}
						]}
					]}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
				{kind: "quantum.SupportingDocuments", name: "supportingDocuments", module: "transfer", style: "width: 50%", attachmentIndexKey: "name", onAddDocument: "handleAddDocument"},
				{kind: "quantum.PaymentSection", name: "paymentSection", module: "transfer", style: "width: 50%", attachmentIndexKey: "name", onAddPayment: "handleAddPayment", onAddRefund: "handleAddPayment", onDeletePayment: "handleDeletePayment"}
			]}
		]},
		{style: "margin-top: 25px;", components: [
			{name: "transferInvoicingModule", kind: "quantum.TransferInvoicingModule", onRequestGenerateSellerInvoice: "handleRequestGenerateSellerInvoice", onRequestGenerateBuyerInvoice: "handleRequestGenerateBuyerInvoice", onRequestDownloadBuyerInvoice: "handleRequestDownloadBuyerInvoice", onRequestDownloadSellerInvoice: "handleRequestDownloadSellerInvoice"}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"},
		{name: "documentStatusPopup", kind: "quantum.ViewAdobeSignDocumentStatusPopup"}
	],

	observers: {
		watchValues: ["lawFirms", "lawyers", "trustAccounts", "poaRecipients", "approvers"]
	},

	bindings: [
		// Page Setup
		{from: ".mode", to: ".$.editButtons.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.addButtons.showing", transform: function(v) { return v === "add"; }},
		{from: ".mode", to: ".$.transferInvoicingModule.mode"},
		{from: ".activeEntry", to: ".$.supportingDocuments.documentsReceived", transform: function(v) {
			try
			{
				var data = v.get("documentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".database", to: ".$.supportingDocuments.database"},
		{from: ".activeEntry", to: ".$.supportingDocuments.activeEntry"},
		{from: ".activeEntry", to: ".$.paymentSection.paymentsReceived", transform: function(v) {
			try
			{
				var data = v.get("paymentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".activeEntry.totalPurchasePrice", to: ".$.paymentSection.purchaseTotal"},
		{from: ".database", to: ".$.paymentSection.database"},
		{from: ".activeEntry", to: ".$.paymentSection.activeEntry"},
		{from: ".activeDate", to: ".$.dateReceivedInput.value", transform: function(v) {
			try
			{
				if (v != null && v.isValid()) { return v.format("YYYY/MM/DD"); }
				else { throw null; }
			}
			catch (err) { return "1984/01/10"; }
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("transferCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === 0; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("transferCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".documentsToUpload", transform: function(v) {
			// Use the binding to force the "documentsToUpload" queue to reset when the "activeEntry" changes.
			return {};
		}},
		{from: ".activeEntry", to: ".manualDocumentStore", transform: function(v) {
			// Use the binding to force the "documentsToUpload" queue to reset when the "activeEntry" changes.
			return {};
		}},
		{from: ".activeEntry", to : ".$.psaCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return true;
				}
				else if(v.get("customTransferSettings").purchaseAndSaleAgreement === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.psaCheckbox.checked", to: ".$.purchaseAndSaleAgreementSection.showing"},
		{from: ".activeEntry", to : ".$.psa2SCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return false;
				}
				else if(v.get("customTransferSettings").sellerPurchaseAndSaleAgreement === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.psa2SCheckbox.checked", to: ".$.sellerPurchaseAndSaleAgreementSection.showing"},
		{from: ".activeEntry", to : ".$.psa2BCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return false;
				}
				else if(v.get("customTransferSettings").buyerPurchaseAndSaleAgreement === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.psa2BCheckbox.checked", to: ".$.buyerPurchaseAndSaleAgreementSection.showing"},
		{from: ".activeEntry", to : ".$.loiCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return true;
				}
				else if(v.get("customTransferSettings").letterOfInstruction === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.loiCheckbox.checked", to: ".$.letterOfInstructionSection.showing"},
		{from: ".activeEntry", to : ".$.poaCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return true;
				}
				else if(v.get("customTransferSettings").powerOfAttorney === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.poaCheckbox.checked", to: ".$.powerOfAttorneySection.showing"},
		{from: ".activeEntry", to : ".$.staCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return true;
				}
				else if(v.get("customTransferSettings").shareTransferApproval === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.staCheckbox.checked", to: ".$.shareTransferApprovalSection.showing"},
		{from: ".activeEntry", to : ".$.stfCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return true;
				}
				else if(v.get("customTransferSettings").securitiesTransferForm === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.stfCheckbox.checked", to: ".$.securitiesTransferFormSection.showing"},
		{from: ".activeEntry", to : ".$.lgoCheckbox.checked", transform: function(v){
			try
			{
				if(v.get("customTransferSettings") === undefined)
				{
					return true;
				}
				else if(v.get("customTransferSettings").legalOpinion === true)
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.lgoCheckbox.checked", to: ".$.legalOpinionSection.showing"},
		{from: ".$.sellerTransferTypePicker.selected", to: ".$.sellerDrawer.open", transform: function(v) {
			try
			{
				if (v != null)
				{
					if (v.value === "individual")
					{
						this.$.sellerSignatoryNameInput.set("value", "");
						this.$.sellerSignatoryTitleInput.set("value", "");
					}
					return v.value === "corporate";
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.sellerCountryPicker.selected", to: ".$.sellerInternationalStateProvince.showing", transform: function(v) {
			try
			{
				if (v != null) { return !(v.value === "USA" || v.value === "CAN"); }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".$.sellerCountryPicker.selected", to: ".$.sellerUSAStateProvince.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "USA"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.sellerCountryPicker.selected", to: ".$.sellerZipPostalInput.label", transform: function(v) {
			try
			{
				if (v != null)
				{
					if (v.value === "USA") { return "Seller ZIP Code"; }
					else if (v.value === "CAN") { return "Seller Postal Code"; }
					else { throw null; }
				}
				else { throw null; }
			}
			catch (err) { return "Seller ZIP / Postal Code"; }
		}},
		{from: ".$.sellerCountryPicker.selected", to: ".$.sellerCanadaStateProvince.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "CAN"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.sellerCountryPicker.selected", to: ".$.sellerStateProvinceInput.disabled", transform: function(v) {
			try
			{
				if (v != null) { return true; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.buyerTransferTypePicker.selected", to: ".$.buyerDrawer.open", transform: function(v) {
			try
			{
				if (v != null)
				{
					if (v.value === "individual")
					{
						this.$.buyerSignatoryNameInput.set("value", "");
						this.$.buyerSignatoryTitleInput.set("value", "");
					}
					return v.value === "corporate";
				}
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.buyerCountryPicker.selected", to: ".$.buyerInternationalStateProvince.showing", transform: function(v) {
			try
			{
				if (v != null) { return !(v.value === "USA" || v.value === "CAN"); }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".$.buyerCountryPicker.selected", to: ".$.buyerZipPostalInput.label", transform: function(v) {
			try
			{
				if (v != null)
				{
					if (v.value === "USA") { return "Buyer ZIP Code"; }
					else if (v.value === "CAN") { return "Buyer Postal Code"; }
					else { throw null; }
				}
				else { throw null; }
			}
			catch (err) { return "Buyer ZIP / Postal Code"; }
		}},
		{from: ".$.buyerCountryPicker.selected", to: ".$.buyerUSAStateProvince.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "USA"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.buyerCountryPicker.selected", to: ".$.buyerCanadaStateProvince.showing", transform: function(v) {
			try
			{
				if (v != null) { return v.value === "CAN"; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},
		{from: ".$.buyerCountryPicker.selected", to: ".$.buyerStateProvinceInput.disabled", transform: function(v) {
			try
			{
				if (v != null) { return true; }
				else { throw null; }
			}
			catch (err) { return false; }
		}},

		{from: ".activeEntry", to: ".$.purchaseAndSaleAgreementStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").purchaseAndSaleAgreement); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.sellerPurchaseAndSaleAgreementStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").sellerPurchaseAndSaleAgreement); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.buyerPurchaseAndSaleAgreementStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").buyerPurchaseAndSaleAgreement); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.letterOfInstructionStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").letterOfInstruction); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.powerOfAttorneyStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").powerOfAttorney, true); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.shareTransferApprovalStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").shareTransferApproval); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.securitiesTransferFormStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").securitiesTransferForm, true); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.legalOpinionStatusIcon.src", transform: function(v) {
			try
			{
				if (v != null) { return this.getDocumentStatusIcon(v.get("transferDocuments").legalOpinion, true); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		// Transfer
		{from: ".activeEntry.transactionDate", to: ".activeDate", transform: function(v) {
			try
			{
				var data = moment(v);
				if (data.isValid()) { return data; }
				else { throw null; }
			}
			catch (err) { return moment(); }
		}},
		{from: ".activeEntry.transferStatus", to: ".$.transferStatusPicker.selected", transform: function(val) {
			var control;
			try
			{
				if (val != null && val !== "")
				{
					control = this.$.transferStatusPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Transfer Status "' + val + '" not found in picker!');
						throw null;
					}
				}
				else {
					control = this.$.transferStatusPicker.controls.find(function(element, index, array) { return element.value === "new"; });
					if (control != null) { return control; }
					else
					{
						console.log('Transfer Status "' + val + '" not found in picker!');
						throw null;
					}
				}
			}
			catch (err)
			{
				this.$.transferStatusPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.transferType", to: ".$.transferTypePicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.transferTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Transfer Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.transferTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".$.transferTypePicker.selected", to: ".$.buyPricePerShareInput.showing", transform: function(v){
			try
			{
				if(v.value === "order"){return true;}
				else{throw null;}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.transferTypePicker.selected", to: ".$.pricePerShareInput.showing", transform: function(v){
			try
			{
				if(v.value === "nominal" || v.value === "customNominal"){return false;}
				else{throw null;}
			}
			catch(err)
			{
				return true;
			}
		}},
		{from: ".$.transferTypePicker.selected", to: ".$.pricePerShareInput.disabled", transform: function(v){
			try
			{
				if(v.value === "nominal" || v.value === "customNominal"){return true;}
				else{throw null;}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".$.transferTypePicker.selected", to: ".$.principalSection.showing", transform: function(v){
			try
			{
				if(v.value === "order")
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".activeEntry.principalID", to: ".$.principalPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.principalPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Transfer Approval Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.principalPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".$.transferTypePicker.selected", to: ".$.customCheckboxesSection.showing", transform: function(v){
			try
			{
				if(v.value === "custom" || v.value === "customNominal")
				{
					return true;
				}
				else
				{
					throw null;
				}
			}
			catch(err)
			{
				return false;
			}
		}},
		{from: ".activeEntry.transferApprovalType", to: ".$.transferApprovalTypePicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.transferApprovalTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Transfer Approval Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.transferApprovalTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.numShares", to: ".$.numSharesInput.value", transform: function(v) {
			try
			{
				if (v != null && !isNaN(v)) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".$.numSharesInput.value", to: ".numShares"},
		{from: ".activeEntry.classOfShares", to: ".$.classSharesInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.pricePerShare", to: ".$.pricePerShareInput.value", transform: function(v) {
			try
			{
				if (v != null && !isNaN(v)) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyPricePerShare", to: ".$.buyPricePerShareInput.value", transform: function(v) {
			try
			{
				if (v != null && !isNaN(v)) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".$.pricePerShareInput.value", to: ".pricePerShare"},
		{from: ".$.buyPricePerShareInput.value", to: ".buyPricePerShare"},
		{from: ".totalPurchasePrice", to: ".$.purchasePriceInput.value", transform: function(v) {
			try
			{
				if (v != null && !isNaN(v)) { return quantum.formatCurrency(v); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.companyName", to: ".$.companyNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.certificateNumber", to: ".$.certificateNumberInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.notes", to: ".$.notesInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},

		// Seller
		{from: ".activeEntry.seller.transferType", to: ".$.sellerTransferTypePicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.sellerTransferTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Seller Transfer Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.sellerTransferTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.seller.name", to: ".$.sellerNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		/*
		{from: ".$.sellerNameInput.value", to: ".$.searchSellerButton.disabled", transform: function(v) {
			return v === "" || this.get("mode") === "edit";
		}},
		*/
		{from: ".activeEntry.seller.signatoryName", to: ".$.sellerSignatoryNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.signatoryTitle", to: ".$.sellerSignatoryTitleInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.addressInfo.addressLine1", to: ".$.sellerAddress1Input.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller", to: ".$.sellerAddress2Input.value", transform: function(v) {
			try
			{
				if (v.addressInfo.addressLine2 != null) { return v.addressInfo.addressLine2; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller", to: ".$.sellerAddress3Input.value", transform: function(v) {
			try
			{
				if (v.addressInfo.addressLine3 != null) { return v.addressInfo.addressLine3; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.addressInfo.city", to: ".$.sellerCityInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.sellerStateProvinceInput.value", transform: function(v) {
			try
			{
				if (v != null)
				{
					var data = v.get("seller").addressInfo.stateProvince;
					var country = v.get("seller").addressInfo.country;
					if (data != null && !(country === "CAN" || country === "USA")) { return data; }
					else { throw null; }
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.sellerProvincePicker.selected", transform: function(v) {
			try
			{
				var data = v.get("seller").addressInfo.stateProvince;
				if (data != null && v.get("seller").addressInfo.country === "CAN") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.sellerStatePicker.selected", transform: function(v) {
			try
			{
				var data = v.get("seller").addressInfo.stateProvince;
				if (data != null && v.get("seller").addressInfo.country === "USA") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.addressInfo.zipPostalCode", to: ".$.sellerZipPostalInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.addressInfo.country", to: ".$.sellerCountryPicker.selected", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.email", to: ".$.sellerEmailInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.phone", to: ".$.sellerPhoneInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.seller.contactID", to: ".$.sellerContactIDInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},

		// Buyer
		{from: ".activeEntry.buyer.transferType", to: ".$.buyerTransferTypePicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.buyerTransferTypePicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Buyer Transfer Type "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.buyerTransferTypePickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".activeEntry.buyer.name", to: ".$.buyerNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		/*
		{from: ".$.buyerNameInput.value", to: ".$.searchBuyerButton.disabled", transform: function(v) {
			return v === "" || this.get("mode") === "edit";
		}},
		*/
		{from: ".activeEntry.buyer.signatoryName", to: ".$.buyerSignatoryNameInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.signatoryTitle", to: ".$.buyerSignatoryTitleInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.addressInfo.addressLine1", to: ".$.buyerAddress1Input.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer", to: ".$.buyerAddress2Input.value", transform: function(v) {
			try
			{
				if (v.addressInfo.addressLine2 != null) { return v.addressInfo.addressLine2;}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer", to: ".$.buyerAddress3Input.value", transform: function(v) {
			try
			{
				if (v.addressInfo.addressLine3 != null) { return v.addressInfo.addressLine3;}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.addressInfo.city", to: ".$.buyerCityInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.buyerStateProvinceInput.value", transform: function(v) {
			try
			{
				if (v != null)
				{
					var data = v.get("buyer").addressInfo.stateProvince;
					var country = v.get("buyer").addressInfo.country;
					if (data != null && !(country === "CAN" || country === "USA")) { return data; }
					else { throw null; }
				}
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.buyerProvincePicker.selected", transform: function(v) {
			try
			{
				var data = v.get("buyer").addressInfo.stateProvince;
				if (data != null && v.get("buyer").addressInfo.country === "CAN") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.buyerStatePicker.selected", transform: function(v) {
			try
			{
				var data = v.get("buyer").addressInfo.stateProvince;
				if (data != null && v.get("buyer").addressInfo.country === "USA") { return data; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.addressInfo.zipPostalCode", to: ".$.buyerZipPostalInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.addressInfo.country", to: ".$.buyerCountryPicker.selected", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.email", to: ".$.buyerEmailInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.phone", to: ".$.buyerPhoneInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry.buyer.contactID", to: ".$.buyerContactIDInput.value", transform: function(v) {
			try
			{
				if (v != null) { return v; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},

		// Approver
		{from: ".activeEntry.approver.approverID", to: ".$.approverPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.approverPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Approver "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.approverPickerButton.set("content", "No Selection");
				return null;
			}
		}},

		// Power of Attorney
		{from: ".activeEntry.powerOfAttorney.powerOfAttorneyID", to: ".$.poaRecipientPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.poaRecipientPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('POA Recipient "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.poaRecipientPickerButton.set("content", "No Selection");
				return null;
			}
		}},

		// Lawyer
		{from: ".activeEntry.lawyer.lawFirmID", to: ".$.lawFirmPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.lawFirmPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Law Firm "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.lawFirmPickerButton.set("content", "No Selection");
				return null;
			}
		}},

		// Accredited Investor Section
		{from: ".$.buyerTransferTypePicker.selected", to: ".transferType", transform: function(v) {
			try
			{
				if (v != null) { return v.value; }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},

		//Lawyer Email Button
		{from: ".activeEntry", to: ".$.sendToLawyerButton.content", transform: function(v){
			try
			{
				if(v.get("loggedMail").length > 0)
				{
					return "Resend To Lawyer";
				}
				return "Send To Lawyer";
			}
			catch(e)
			{
				return "Send To Lawyer";
			}
		}},
		{from: ".pricePerShare", to: ".$.transferInvoicingModule.sellPricePerShare"},
		{from: ".pricePerShare", to: ".$.transferInvoicingModule.buyPricePerShare", transform: function(v){
			if(this.getSelected(this.$.transferTypePicker) !== "order")
			{
				return v;
			}
			else
			{
				return this.get("buyPricePerShare");
			}
		}},
		{from: ".buyPricePerShare", to: ".$.transferInvoicingModule.buyPricePerShare", transform: function(v){
			if(this.getSelected(this.$.transferTypePicker) === "order")
			{
				return v;
			}
			else
			{
				return this.get("pricePerShare");
			}
		}},
		{from: ".numShares", to: ".$.transferInvoicingModule.numShares"},
		{from: ".activeEntry.invoiceDetail", to: ".invoiceDetail"},
		{from: ".invoiceDetail.feesPaidBy", to: ".$.transferInvoicingModule.feesPaidBy"},
		{from: ".invoiceDetail.sellerDiscount", to: ".$.transferInvoicingModule.sellerDiscount"},
		{from: ".invoiceDetail.buyerDiscount", to: ".$.transferInvoicingModule.buyerDiscount"},
		{from: ".invoiceDetail.sellerInvoiceID", to: ".$.transferInvoicingModule.sellerInvoiceID"},
		{from: ".invoiceDetail.buyerInvoiceID", to: ".$.transferInvoicingModule.buyerInvoiceID"}
	],

	/****************
	* Observers
	*****************/

	watchValues: function(previous, current, property)
	{
		if (property === "lawFirms" && current)
		{
			this.$.lawFirmPicker.destroyClientControls();
			for (var i = 0; i < current.length; i++)
			{
				this.$.lawFirmPicker.createComponent({content: current[i].displayName, value: current[i]._id});
			}
			this.$.lawFirmPicker.render();

			try
			{
				var data = this.get("activeEntry").get("lawyer").lawFirmID;
				if (data != null)
				{
					var c = this.$.lawFirmPicker.controls;
					for (var i = 0; i < c.length; i++) { if (c[i].value === data) { this.$.lawFirmPicker.set("selected", c[i]); } }
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.lawFirmPicker.set("selected", null);
				this.$.lawFirmPickerButton.set("content", "No Selection");
				this.$.lawyerPickerButton.set("disabled", true);
				this.$.trustAccountPickerButton.set("disabled", true);
			}
		}
		else if (property === "lawyers" && current)
		{
			this.$.lawyerPicker.destroyClientControls();
			for (var i = 0; i < current.length; i++)
			{
				this.$.lawyerPicker.createComponent({content: current[i].name, value: current[i].id});
			}
			this.$.lawyerPicker.render();
			if (this.get("mode") !== "edit")
			{
				this.$.lawyerPickerButton.set("disabled", false);
			}

			try
			{
				var data = this.get("activeEntry").get("lawyer").lawyerID;
				if (data != null)
				{
					var c = this.$.lawyerPicker.controls;
					for (var i = 0; i < c.length; i++) { if (c[i].value === data) { this.$.lawyerPicker.set("selected", c[i]); } }
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.lawyerPicker.set("selected", null);
				this.$.lawyerPickerButton.set("content", "No Selection");
			}
		}
		else if (property === "trustAccounts" && current)
		{
			this.$.trustAccountPicker.destroyClientControls();
			for (var i = 0; i < current.length; i++)
			{
				this.$.trustAccountPicker.createComponent({content: current[i].displayName, value: current[i].id});
			}
			this.$.trustAccountPicker.render();
			if (this.get("mode") !== "edit")
			{
				this.$.trustAccountPickerButton.set("disabled", false);
			}

			try
			{
				var data = this.get("activeEntry").get("lawyer").trustAccountID;
				if (data != null)
				{
					var c = this.$.trustAccountPicker.controls;
					for (var i = 0; i < c.length; i++) { if (c[i].value === data) { this.$.trustAccountPicker.set("selected", c[i]); } }
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.trustAccountPicker.set("selected", null);
				this.$.trustAccountPickerButton.set("content", "No Selection");
			}
		}
		else if (property === "poaRecipients" && current)
		{
			this.$.poaRecipientPicker.destroyClientControls();
			for (var i = 0; i < current.length; i++)
			{
				this.$.poaRecipientPicker.createComponent({content: current[i].displayName, value: current[i]._id});
			}
			this.$.poaRecipientPicker.render();

			try
			{
				var data = this.get("activeEntry").get("powerOfAttorney").powerOfAttorneyID;
				if (data != null)
				{
					var c = this.$.poaRecipientPicker.controls;
					for (var i = 0; i < c.length; i++) { if (c[i].value === data) { this.$.poaRecipientPicker.set("selected", c[i]); } }
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.poaRecipientPicker.set("selected", null);
				this.$.poaRecipientPickerButton.set("content", "No Selection");
			}
		}
		else if (property === "approvers" && current)
		{
			this.$.approverPicker.destroyClientControls();
			for (var i = 0; i < current.length; i++)
			{
				this.$.approverPicker.createComponent({content: current[i].displayName, value: current[i]._id});
			}
			this.$.approverPicker.render();

			try
			{
				var data = this.get("activeEntry").get("approver").approverID;
				if (data != null)
				{
					var c = this.$.approverPicker.controls;
					for (var i = 0; i < c.length; i++) { if (c[i].value === data) { this.$.approverPicker.set("selected", c[i]); } }
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.approverPicker.set("selected", null);
				this.$.approverPickerButton.set("content", "No Selection");
			}
		}
	},

	handleAddPayment: function(inSender, inEvent)
	{
		var byName = function(value, index, array)
		{
			return value.name === inEvent.payload.name;
		};

		this.documentNames.forEach(enyo.bind(this, function(name){
			if(this.get("activeEntry").get("transferDocuments")[name].unsignedFileName.indexOf(inEvent.payload.name) !== -1)
			{
				alertify.error("Filename Must Be Unique");
				return;
			}
			else if(this.get("activeEntry").get("transferDocuments")[name].signedFileName.indexOf(inEvent.payload.name) !== -1)
			{
				alertify.error("Filename Must Be Unique");
				return;
			}
		}));

		//Check For Collisions Against Supporting Documents.
		if (this.$.supportingDocuments.get("documentsToUpload").find(byName) !== undefined || this.$.supportingDocuments.get("documentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		//Check For Collisions Against Other Payments
		if (this.$.paymentSection.get("paymentsToUpload").find(byName) !== undefined || this.$.paymentSection.get("paymentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		this.$.paymentSection.get("paymentsToUpload").push(inEvent.payload);
		this.$.paymentSection.get("paymentsReceived").push(
		{
			name: inEvent.payload.name,
			payerName: inEvent.payload.payerName,
			amount: inEvent.payload.amount,
			paymentType: inEvent.payload.paymentType,
			receivedDate: inEvent.payload.receivedDate,
			fileType: inEvent.payload.fileType,
			fileData: inEvent.payload.fileData,
			localDownload: true
		});
		this.paymentDelta += quantum.parseFloat(inEvent.payload.amount);
		this.$.paymentSection.refreshRepeater();
		this.$.paymentSection.disableForFunds();
		alertify.success("Payment Uploaded!");
	},

	handleAddDocument: function(inSender, inEvent)
	{
		var byName = function(value, index, array)
		{
			return value.name === inEvent.payload.name;
		};

		//Check For Collisions Against Transfer Documents.
		this.documentNames.forEach(enyo.bind(this, function(name){
			if(this.get("activeEntry").get("transferDocuments")[name].unsignedFileName.indexOf(inEvent.payload.name) !== -1)
			{
				alertify.error("Filename Must Be Unique");
				return;
			}
			else if(this.get("activeEntry").get("transferDocuments")[name].signedFileName.indexOf(inEvent.payload.name) !== -1)
			{
				alertify.error("Filename Must Be Unique");
				return;
			}
		}));

		//Check For Collisions Against Other Supporting Documents.
		if (this.$.supportingDocuments.get("documentsToUpload").find(byName) !== undefined || this.$.supportingDocuments.get("documentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		//Check For Collisions Against Payments
		if (this.$.paymentSection.get("paymentsToUpload").find(byName) !== undefined || this.$.paymentSection.get("paymentsReceived").find(byName) !== undefined)
		{
			alertify.error("Filename Must Be Unique!");
			return;
		}

		this.$.supportingDocuments.get("documentsToUpload").push(inEvent.payload);
		this.$.supportingDocuments.get("documentsReceived").push(
		{
			name: inEvent.payload.name,
			description: inEvent.payload.description,
			receivedDate: inEvent.payload.receivedDate,
			fileType: inEvent.payload.fileType,
			fileData: inEvent.payload.fileData,
			localDownload: true
		});
		this.$.supportingDocuments.refreshRepeater();
		alertify.success("Document Uploaded!");
	},

	handleDeletePayment: function(inSender, inEvent)
	{
		this.paymentDelta -= quantum.parseFloat(inEvent.payment.amount);	
	},

	getActiveEntryDocument: function(name)
	{
		if(this.get("documentsToUpload") != null && Object.keys(this.get("documentsToUpload")).length > 0)
		{
			if (name == null) { return null; }
			else if (name.indexOf("purchaseAndSaleAgreement") !== -1) { return {unsignedFileName: "purchaseAndSaleAgreement"};}
			else if (name.indexOf("buyerPurchaseAndSaleAgreement") !== -1) { return {unsignedFileName: "buyerPurchaseAndSaleAgreement"};}
			else if (name.indexOf("sellerPurchaseAndSaleAgreement") !== -1) { return {unsignedFileName: "sellerPurchaseAndSaleAgreement"};}
			else if (name.indexOf("letterOfInstruction") !== -1) { return {unsignedFileName: "letterOfInstruction"};}
			else if (name.indexOf("powerOfAttorney") !== -1) { return {unsignedFileName: "powerOfAttorney"};}
			else if (name.indexOf("shareTransferApproval") !== -1) { return {unsignedFileName: "shareTransferApproval"};}
			else if (name.indexOf("securitiesTransferForm") !== -1) { return {unsignedFileName: "securitiesTransferForm"};}
			else if (name.indexOf("legalOpinion") !== -1) { return {unsignedFileName: "legalOpinion"};}
			else{ return null; }
		}

		var docs = this.get("activeEntry").get("transferDocuments");
		if (name == null) { return null; }
		else if (name.indexOf("purchaseAndSaleAgreement") !== -1) { return docs.purchaseAndSaleAgreement; }
		else if (name.indexOf("buyerPurchaseAndSaleAgreement") !== -1) { return docs.buyerPurchaseAndSaleAgreement; }
		else if (name.indexOf("sellerPurchaseAndSaleAgreement") !== -1) { return docs.sellerPurchaseAndSaleAgreement; }
		else if (name.indexOf("letterOfInstruction") !== -1) { return docs.letterOfInstruction; }
		else if (name.indexOf("powerOfAttorney") !== -1) { return docs.powerOfAttorney; }
		else if (name.indexOf("shareTransferApproval") !== -1) { return docs.shareTransferApproval; }
		else if (name.indexOf("securitiesTransferForm") !== -1) { return docs.securitiesTransferForm; }
		else if (name.indexOf("legalOpinion") !== -1) { return docs.legalOpinion; }
		else { return null; }
	},

	clearBorderError: function()
	{
		for (var key in this.$)
		{
			if(this.$[key].kind === "quantum.Input")
			{
				this.$[key].clearBorderError();
			}
			else if(this.$[key].kind === "onyx.Picker")
			{
				this.$[key].parent.applyStyle("border", null);
			}
		}
	},

	canEdit: function()
	{
		return quantum.hasRole(["admins","users"], "transfer");
	},

	setShowingForRoles: function()
	{
		var showing = this.canEdit();

		this.$.paymentSection.set("showing", showing);

		this.$.saveEntryButton.set("showing", showing);
		this.$.generateDocumentsButton.set("showing", showing);
		this.$.sendDocumentsButton.set("showing", showing);
		this.$.cancelDocumentsButton.set("showing", showing);

		this.$.purchaseAndSaleAgreementResendButton.set("showing", showing);
		this.$.letterOfInstructionResendButton.set("showing", showing);
		this.$.shareTransferApprovalResendButton.set("showing", showing);

		if(this.mode === "add")
		{
			this.$.editSection.set("showing", false);
			this.$.transferStatusContainer.set("showing", false);
			this.$.refreshSellerButton.set("showing", false);
			this.$.refreshBuyerButton.set("showing", false);
			this.$.viewSellerButton.set("showing", false);
			this.$.viewBuyerButton.set("showing", false);
		}
		else if(this.mode === "edit")
		{
			this.$.editSection.set("showing", true);
			this.$.transferStatusContainer.set("showing", true);
			this.$.searchSellerButton.set("showing", false);
			this.$.searchBuyerButton.set("showing", false);
			this.$.viewSellerButton.set("showing", true);
			this.$.viewBuyerButton.set("showing", true);
		}

		// Only admins can delete a transfer.
		//this.$.deleteEntryButton.set("showing", quantum.hasRole(["admins"], "transfer"));
		this.resize();
	},

	setDisabledForStatus: function()
	{
		var disabled = !this.canEdit();

		//Documents Have Been Generated
		if(this.get("activeEntry").get("transferDocuments").purchaseAndSaleAgreement.generated === true || 
		  //Legacy Transfers workaround
		  (this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement.generated === true) || 
		  (this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement.generated === true) || 
		  this.get("activeEntry").get("transferDocuments").powerOfAttorney.generated === true || 
		  this.get("activeEntry").get("transferDocuments").letterOfInstruction.generated === true || 
		  this.get("activeEntry").get("transferDocuments").shareTransferApproval.generated === true || 
		  this.get("activeEntry").get("transferDocuments").securitiesTransferForm.generated === true || 
		  this.get("activeEntry").get("transferDocuments").legalOpinion.generated === true || 
		  Object.keys(this.get("documentsToUpload")).length > 0)
		{
			this.$.cancelDocumentsButton.set("disabled", true); //Set this here, and enable if the individual documents have been sent
			this.$.generateDocumentsButton.set("disabled", true);
			this.$.sendDocumentsButton.set("disabled", disabled); //Set this here, and disable if the individual documents have been sent

			if(this.get("activeEntry").get("transferDocuments").purchaseAndSaleAgreement.generated === true || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.purchaseAndSaleAgreementDownloadUnsignedButton.set("disabled", false);
			}
			if((this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement.generated === true) || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.sellerPurchaseAndSaleAgreementDownloadUnsignedButton.set("disabled", false);
			}
			if((this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement.generated === true) || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.buyerPurchaseAndSaleAgreementDownloadUnsignedButton.set("disabled", false);
			}
			if(this.get("activeEntry").get("transferDocuments").powerOfAttorney.generated === true || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.powerOfAttorneyDownloadUnsignedButton.set("disabled", false);
				this.$.poaUploadDocumentInput.set("disabled", false);
			}
			if(this.get("activeEntry").get("transferDocuments").letterOfInstruction.generated === true || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.letterOfInstructionDownloadUnsignedButton.set("disabled", false);
			}
			if(this.get("activeEntry").get("transferDocuments").shareTransferApproval.generated === true || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.shareTransferApprovalDownloadUnsignedButton.set("disabled", false);
			}
			if(this.get("activeEntry").get("transferDocuments").securitiesTransferForm.generated === true || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.securitiesTransferFormDownloadUnsignedButton.set("disabled", false);
				this.$.stfUploadDocumentInput.set("disabled", false);
			}
			if(this.get("activeEntry").get("transferDocuments").legalOpinion.generated === true || Object.keys(this.get("documentsToUpload")).length > 0)
			{
				this.$.legalOpinionDownloadUnsignedButton.set("disabled", false);
				this.$.lgoUploadDocumentInput.set("disabled", false);
			}
		}
		else
		{
			this.$.cancelDocumentsButton.set("disabled", true);
			this.$.sendDocumentsButton.set("disabled", true);
			this.$.generateDocumentsButton.set("disabled", disabled);
			this.$.refreshBuyerButton.set("disabled", disabled);
			this.$.refreshSellerButton.set("disabled", disabled);
		}

		//Documents Have Been Sent. In theory we could just do it on one, but better for it to be obvious when something broke.
		if(this.get("activeEntry").get("transferDocuments").purchaseAndSaleAgreement.sent === true)
		{
			this.$.purchaseAndSaleAgreementStatusButton.set("disabled", false);
			this.$.purchaseAndSaleAgreementUpdateStatusButton.set("disabled", false);
			this.$.purchaseAndSaleAgreementResendButton.set("disabled", false);
			this.$.sendDocumentsButton.set("disabled", true);
			this.$.cancelDocumentsButton.set("disabled", disabled);
		}
		if(this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement.sent === true)
		{
			this.$.buyerPurchaseAndSaleAgreementStatusButton.set("disabled", false);
			this.$.buyerPurchaseAndSaleAgreementUpdateStatusButton.set("disabled", false);
			this.$.buyerPurchaseAndSaleAgreementResendButton.set("disabled", false);
			this.$.sendDocumentsButton.set("disabled", true);
			this.$.cancelDocumentsButton.set("disabled", disabled);
		}
		if(this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement.sent === true)
		{
			this.$.sellerPurchaseAndSaleAgreementStatusButton.set("disabled", false);
			this.$.sellerPurchaseAndSaleAgreementUpdateStatusButton.set("disabled", false);
			this.$.sellerPurchaseAndSaleAgreementResendButton.set("disabled", false);
			this.$.sendDocumentsButton.set("disabled", true);
			this.$.cancelDocumentsButton.set("disabled", disabled);
		}
		if(this.get("activeEntry").get("transferDocuments").letterOfInstruction.sent === true)
		{
			this.$.letterOfInstructionStatusButton.set("disabled", false);
			this.$.letterOfInstructionUpdateStatusButton.set("disabled", false);
			this.$.letterOfInstructionResendButton.set("disabled", false);
			this.$.sendDocumentsButton.set("disabled", true);
			this.$.cancelDocumentsButton.set("disabled", disabled);
		}
		if(this.get("activeEntry").get("transferDocuments").shareTransferApproval.sent === true)
		{
			this.$.shareTransferApprovalStatusButton.set("disabled", false);
			this.$.shareTransferApprovalUpdateStatusButton.set("disabled", false);
			this.$.shareTransferApprovalResendButton.set("disabled", false);
			this.$.sendDocumentsButton.set("disabled", true);
			this.$.cancelDocumentsButton.set("disabled", disabled);
		}

		//Documents Have Been Signed
		if(this.get("activeEntry").get("transferDocuments").purchaseAndSaleAgreement.signed === true)
		{
			this.$.purchaseAndSaleAgreementDownloadSignedButton.set("disabled", false);
			this.$.purchaseAndSaleAgreementResendButton.set("disabled", true);
		}
		if(this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").buyerPurchaseAndSaleAgreement.signed === true)
		{
			this.$.buyerPurchaseAndSaleAgreementDownloadSignedButton.set("disabled", false);
			this.$.buyerPurchaseAndSaleAgreementResendButton.set("disabled", true);
		}
		if(this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement && this.get("activeEntry").get("transferDocuments").sellerPurchaseAndSaleAgreement.signed === true)
		{
			this.$.sellerPurchaseAndSaleAgreementDownloadSignedButton.set("disabled", false);
			this.$.sellerPurchaseAndSaleAgreementResendButton.set("disabled", true);
		}
		if(this.get("activeEntry").get("transferDocuments").letterOfInstruction.signed === true)
		{
			this.$.letterOfInstructionDownloadSignedButton.set("disabled", false);
			this.$.letterOfInstructionResendButton.set("disabled", true);
		}
		if(this.get("activeEntry").get("transferDocuments").powerOfAttorney.signed === true)
		{
			this.$.powerOfAttorneyDownloadSignedButton.set("disabled", false);
			this.$.poaUploadDocumentInput.set("disabled", false);
		}
		if(this.get("activeEntry").get("transferDocuments").shareTransferApproval.signed === true)
		{
			this.$.shareTransferApprovalDownloadSignedButton.set("disabled", false);
			this.$.shareTransferApprovalResendButton.set("disabled", true);
		}
		if(this.get("activeEntry").get("transferDocuments").securitiesTransferForm.signed === true)
		{
			this.$.securitiesTransferFormDownloadSignedButton.set("disabled", false);
			this.$.stfUploadDocumentInput.set("disabled", false);
		}
		if(this.get("activeEntry").get("transferDocuments").legalOpinion.signed === true)
		{
			this.$.legalOpinionDownloadSignedButton.set("disabled", false);
			this.$.lgoUploadDocumentInput.set("disabled", false);
		}

		if(this.mode === "edit")
		{
			this.$.psaCheckbox.set("disabled", true);
			this.$.psa2SCheckbox.set("disabled", true);
			this.$.psa2BCheckbox.set("disabled", true);
			this.$.loiCheckbox.set("disabled", true);
			this.$.poaCheckbox.set("disabled", true);
			this.$.staCheckbox.set("disabled", true);
			this.$.stfCheckbox.set("disabled", true);
		}

		//Transaction is complete. Disable some things that aren't disabled from other things
		if (this.get("activeEntry").get("transferStatus") === "complete")
		{
			this.$.cancelDocumentsButton.set("disabled", true);
			this.$.purchaseAndSaleAgreementUpdateStatusButton.set("disabled", true);
			this.$.buyerPurchaseAndSaleAgreementUpdateStatusButton.set("disabled", true);
			this.$.sellerPurchaseAndSaleAgreementUpdateStatusButton.set("disabled", true);
			this.$.letterOfInstructionUpdateStatusButton.set("disabled", true);
			this.$.poaUploadDocumentInput.set("disabled", true);
			this.$.shareTransferApprovalUpdateStatusButton.set("disabled", true);
			this.$.stfUploadDocumentInput.set("disabled", true);
			this.$.lgoUploadDocumentInput.set("disabled", true);
		}

		//Temporarially leave the button disabled until we sort out some other portions of the send to lawyer logic.
		//Send to Lawyer button rules
		// if(this.getSelected(this.$.transferStatusPicker) === "completeDocsAndFunds")
		// {
		// 	this.$.sendToLawyerButton.set("disabled", false);
		// }
	},

	setDisabledForRoles: function()
	{
		var disabled = true;

		//First, Disable Everything
		for (var key in this.$)
		{
			if(this.$[key].kind === "quantum.Input" || this.$[key].kind === "quantum.Button" || this.$[key].kind === "enyo.Input")
			{
				if(this.$[key].name !== "nextEntryButton" && this.$[key].name !== "previousEntryButton")
				{
					this.$[key].set("disabled",disabled);
				}
			}
		}
		this.$.transferTypePickerButton.set("disabled", disabled);
		this.$.transferStatusPickerButton.set("disabled", disabled);
		this.$.transferApprovalTypePickerButton.set("disabled", disabled);
		this.$.principalPickerButton.set("disabled", disabled);
		this.$.lawFirmPickerButton.set("disabled", disabled);
		this.$.lawyerPickerButton.set("disabled", disabled);
		this.$.trustAccountPickerButton.set("disabled", disabled);
		this.$.poaRecipientPickerButton.set("disabled", disabled);
		this.$.approverPickerButton.set("disabled", disabled);
		this.$.notesInput.set("disabled", disabled);

		disabled = !this.canEdit();

		//Then Enable Based on Add or Edit
		if(this.mode === "add")
		{
			this.$.addEntryButton.set("disabled", disabled);
			this.$.cancelButton.set("disabled", disabled);
			this.$.searchSellerButton.set("disabled", disabled);
			this.$.searchBuyerButton.set("disabled", disabled);

			this.$.dateReceivedInput.set("disabled", disabled);
			this.$.numSharesInput.set("disabled",disabled);
			this.$.classSharesInput.set("disabled", disabled);
			this.$.pricePerShareInput.set("disabled", disabled);
			this.$.buyPricePerShareInput.set("disabled", disabled);
			this.$.certificateNumberInput.set("disabled", disabled);

			this.$.transferTypePickerButton.set("disabled", disabled);
			this.$.principalPickerButton.set("disabled", disabled);
			//this.$.transferStatusPickerButton.set("disabled", disabled);
			this.$.transferApprovalTypePickerButton.set("disabled", disabled);

			this.$.approverPickerButton.set("disabled", disabled);
			this.$.poaRecipientPickerButton.set("disabled", disabled);
			this.$.lawFirmPickerButton.set("disabled", disabled);
			this.$.notesInput.set("disabled", disabled);
		}
		else if(this.mode === "edit" && this.get("activeEntry").get("transferStatus") !== "complete" && this.get("activeEntry").get("transferStatus") !== "cancelled")
		{
			this.$.saveEntryButton.set("disabled", disabled);
			//this.$.deleteEntryButton.set("disabled", disabled);
			//Temporarily Leave As Dropdown instead of Computed Status
			this.$.transferStatusPickerButton.set("disabled", disabled);

			this.$.supportingDocuments.set("readOnly", disabled);
			this.$.paymentSection.disableForFunds();
			this.setDisabledForStatus();
			if(this.get("activeEntry").get("transferType") === "nominal" || this.get("activeEntry").get("transferType") === "customNominal")
			{
				this.$.pricePerShareInput.set("disabled", true);
			}
			this.$.notesInput.set("disabled", disabled);
		}
		else if (this.mode === "edit" && this.get("activeEntry").get("transferStatus") === "complete")
		{
			this.$.supportingDocuments.set("readOnly", true);
			this.$.paymentSection.disableForFunds();
			this.$.paymentSection.setRefundDisabled(true);
			this.setDisabledForStatus();			
		}
		else if(this.mode === "edit")
		{
			//Def want this for cancelled, do we want if for complete?
			//this.$.deleteEntryButton.set("disabled", disabled);
			this.$.paymentSection.setAddDisabled(true);
			this.$.paymentSection.setRefundDisabled(true);
		}

		//Finally, Things That Will Always Be Disabled
		this.$.companyNameInput.set("disabled", true);
		this.$.purchasePriceInput.set("disabled",true);
		//And Things that will always be enabled
		this.$.viewSellerButton.set("disabled", false);
		this.$.viewBuyerButton.set("disabled", false);
	},

	activate: function(activeEntry)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "transfer")) { this.doGoHome(); return; }

		this.clearBorderError();
		this.populatePrincipalsDropdown();

		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", new quantum.TransferModel({}));
		if (activeEntry != null) { this.set("activeEntry", activeEntry); }

		this.$.companyNameInput.set("value", quantum.preferences.get("companyName"));
		this.set("paymentDelta", 0);

		this.setShowingForRoles();
		this.setDisabledForRoles();

		this.refreshRepeaters();
	},

	refreshRepeaters: function()
	{
		this.$.supportingDocuments.refreshRepeater();

		this.$.paymentSection.refreshRepeater();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	getDocumentStatusIcon: function(doc, alt)
	{
		if (doc.signed)
		{
			return "assets/icons/circle-icon-green.png";
		}
		else if (doc.sent || (doc.generated && alt))
		{
			return "assets/icons/circle-icon-yellow.png";
		}
		else if (doc.generated)
		{
			return "assets/icons/circle-icon-red.png";
		}
		else
		{
			return "assets/icons/circle-icon-grey.png";
		}
	},

	getSelected: function(picker, propertyName)
	{
		try
		{
			if (typeof(propertyName) !== 'string') { propertyName = "value"; }
			return picker.get("selected")[propertyName];
		}
		catch (err) { return ""; }
	},

	/******************************
	* Computed Property Functions *
	******************************/

	totalPurchasePrice: function()
	{
		if(this.getSelected(this.$.transferTypePicker) === "nominal" || this.getSelected(this.$.transferTypePicker) === "customNominal")
		{
			return 1;
		}
		else if(this.getSelected(this.$.transferTypePicker) === "order")
		{
			return quantum.parseInt(this.get("numShares")) * quantum.parseFloat(this.get("buyPricePerShare"));
		}
		else 
		{
			var retVal = quantum.parseInt(this.get("numShares")) * quantum.parseFloat(this.get("pricePerShare"));
			return isNaN(retVal) ? 0 : retVal;
		}
	},

	/*****************
	* Event Handlers *
	*****************/

	handleDateReceivedInputTapped: function(inSender, inEvent)
	{
		if(this.$.dateReceivedInput.get("disabled") !== true)
		{
			this.$.calendarPopup.show();
		}
	},

	calendarDateChanged: function(inSender, inEvent)
	{
		this.set("activeDate", new moment(inEvent.date));
		this.$.calendarPopup.hide();
		return true;
	},

	handleCancelButtonTapped: function(inSender, inEvent)
	{	
		this.doGoBack();
	},

	/*
	handleDeleteEntryButtonTapped: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins"], "transfer")) { return; }

		if (this.$.confirmDeleteEntryPopup)
		{
			this.$.confirmDeleteEntryPopup.hide();
			this.$.confirmDeleteEntryPopup.destroy();
		}
		this.createComponent({name: "confirmDeleteEntryPopup", kind: "quantum.ConfirmPopup", onYes: "deleteEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeleteEntryPopup.show("Delete Entry? This cannot be undone.");
	},
	*/

	handleTransferApprovalTypePickerChanged: function(inSender, inEvent)
	{
		if (inEvent.selected)
		{
			if (inEvent.selected.value === "company")
			{
				this.$.approverPicker.set("selected", null);
				this.$.approverPickerButton.set("content", "No Selection");
				this.$.approverPickerButton.set("disabled", true);
			}
			else
			{
				if (this.get("mode") !== "edit")
				{
					this.$.approverPickerButton.set("disabled", false);
				}
			}
		}
	},

	handleLawFirmPickerChanged: function(inSender, inEvent)
	{
		this.$.lawyerPicker.set("selected", null);
		this.$.lawyerPickerButton.set("content", "No Selection");
		this.$.trustAccountPicker.set("selected", null);
		this.$.trustAccountPickerButton.set("content", "No Selection");

		if (inEvent.selected)
		{
			var lf = this.get("lawFirms");
			for (var i = 0; i < lf.length; i++)
			{
				if (lf[i]._id === inEvent.selected.value)
				{
					var lawyers = JSON.parse(JSON.stringify(lf[i].lawyers));
					lawyers.sort(function(a, b) {
						if (a.name < b.name) { return -1; }
						if (a.name > b.name) { return 1; }
						return 0;
					});
					this.set("lawyers", lawyers);

					var trustAccounts = JSON.parse(JSON.stringify(lf[i].trustAccounts));
					trustAccounts.sort(function(a, b) {
						if (a.displayName < b.displayName) { return -1; }
						if (a.displayName > b.displayName) { return 1; }
						return 0;
					});
					this.set("trustAccounts", trustAccounts);

					return;
				}
			}
		}
	},

	handleSearchSellerButtonTapped: function(inSender, inEvent)
	{
		if (this.$.shareholderSearchPopup)
		{
			this.$.shareholderSearchPopup.hide();
			this.$.shareholderSearchPopup.destroy();
		}

		this.createComponent({name: "shareholderSearchPopup", kind: "quantum.ShareholderSearchPopup", title: "Search Sellers", allowNewContact: false, enableSearch: true, typeFilter: ["seller"], onShareholderSelected: "handleSellingShareholderSelected", onHide: "handlePopupHidden"});
		this.$.shareholderSearchPopup.show(this.$.sellerNameInput.get("value"), quantum.preferences.get("company"));
	},

	handleSellingShareholderSelected: function(inSender, inEvent)
	{
		if (!inEvent.shareholder)
		{
			alertify.error("No shareholder selected");
			return;
		}

		if(this.mode === "add")
		{
			this.sharesAvailable = inEvent.shareholder.get("shareholderInfo").get("numSharesAfterPendingTransactions");
		}

		var shareholder = inEvent.shareholder;

		if (shareholder.get("contactType") === "individual")
		{
			this.$.sellerTransferTypePicker.set("selected", this.$.sellerTransferTypeIndividualPickerItem);
		}
		else
		{
			this.$.sellerTransferTypePicker.set("selected", this.$.sellerTransferTypeCorporatePickerItem);
		}

		this.$.sellerNameInput.set("value", shareholder.get("contactName"));

		if (shareholder.get("contactType") === "corporate")
		{
			this.$.sellerSignatoryNameInput.set("value", shareholder.get("contactPerson"));
			this.$.sellerSignatoryTitleInput.set("value", shareholder.get("contactPersonTitle"));
		}
		else
		{
			this.$.sellerSignatoryNameInput.set("value", "");
			this.$.sellerSignatoryTitleInput.set("value", "");
		}

		this.$.sellerAddress1Input.set("value", shareholder.get("addressInfo").addressLine1);
		this.$.sellerAddress2Input.set("value", shareholder.get("addressInfo").addressLine2);
		this.$.sellerAddress3Input.set("value", shareholder.get("addressInfo").addressLine3);
		this.$.sellerCityInput.set("value", shareholder.get("addressInfo").city);
		this.$.sellerCountryPicker.set("selected", shareholder.get("addressInfo").country);
		this.$.sellerZipPostalInput.set("value", shareholder.get("addressInfo").zipPostalCode);

		if (shareholder.get("addressInfo").country=== "CAN") 
		{
			this.$.sellerProvincePicker.set("selected", shareholder.get("addressInfo").stateProvince);
		}
		else if (shareholder.get("addressInfo").country === "USA") 
		{
			this.$.sellerStatePicker.set("selected", shareholder.get("addressInfo").stateProvince);
		}
		else 
		{
			this.$.sellerStateProvinceInput.set("value", shareholder.get("addressInfo").stateProvince);
		}

		this.$.sellerEmailInput.set("value", shareholder.get("emailAddress"));
		this.$.sellerPhoneInput.set("value", shareholder.get("phoneNumber"));
		this.$.sellerContactIDInput.set("value", shareholder.get("_id"));
	},

	handleRefreshContactButtonTapped: function(inSender, inEvent)
	{
		var contactID = null;
		if(inEvent.originator.name === "refreshSellerButton")
		{
			contactID = this.$.sellerContactIDInput.get("value");
		}
		else if(inEvent.originator.name === "refreshBuyerButton")
		{
			contactID = this.$.buyerContactIDInput.get("value");
		}

		this.$.loadingPopup.show("Loading...");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "findcontactbyid",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to get updated contact");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to get updated contact");
				console.log(response);
			}
			else
			{
				if(inEvent.originator.name === "refreshSellerButton")
				{
					this.handleSellingShareholderSelected(inSender, {shareholder: new quantum.ContactModel(response.record)})
				}
				else if(inEvent.originator.name === "refreshBuyerButton")
				{
					this.handleBuyingShareholderSelected(inSender, {shareholder: new quantum.ContactModel(response.record)})
				}
			}
		}));

		request.go({
			companyID: quantum.preferences.get("company"),
			searchID: contactID
		});
	},

	handleViewContact: function(inSender, inEvent)
	{
		if(inEvent.originator.name === "viewBuyerButton")
		{
			this.doViewEventDetail({mode: "contacts", target: this.get("activeEntry").get("buyer").contactID});
			return true;
		}
		else if(inEvent.originator.name === "viewSellerButton")
		{
			this.doViewEventDetail({mode: "contacts", target: this.get("activeEntry").get("seller").contactID});
			return true;
		}

		alertify.error("Unable To Find Contact");
	},

	handleSearchBuyerButtonTapped: function(inSender, inEvent)
	{
		if (this.$.shareholderSearchPopup)
		{
			this.$.shareholderSearchPopup.hide();
			this.$.shareholderSearchPopup.destroy();
		}

		this.createComponent({name: "shareholderSearchPopup", kind: "quantum.ShareholderSearchPopup",title: "Search Buyers", allowNewContact: false, enableSearch: true, searchRoles: ["buyer"], onShareholderSelected: "handleBuyingShareholderSelected", onHide: "handlePopupHidden"});
		this.$.shareholderSearchPopup.show(this.$.buyerNameInput.get("value"), quantum.preferences.get("company"));
	},

	handleBuyingShareholderSelected: function(inSender, inEvent)
	{
		if (!inEvent.shareholder)
		{
			alertify.error("No shareholder selected");
			return;
		}

		var shareholder = inEvent.shareholder;

		if (shareholder.get("contactType") === "individual")
		{
			this.$.buyerTransferTypePicker.set("selected", this.$.buyerTransferTypeIndividualPickerItem);
		}
		else
		{
			this.$.buyerTransferTypePicker.set("selected", this.$.buyerTransferTypeCorporatePickerItem);
		}

		this.$.buyerNameInput.set("value", shareholder.get("contactName"));

		if (shareholder.get("contactType") === "corporate")
		{
			this.$.buyerSignatoryNameInput.set("value", shareholder.get("contactPerson"));
			this.$.buyerSignatoryTitleInput.set("value", shareholder.get("contactPersonTitle"));
		}
		else
		{
			this.$.buyerSignatoryNameInput.set("value", "");
			this.$.buyerSignatoryTitleInput.set("value", "");
		}

		this.$.buyerAddress1Input.set("value", shareholder.get("addressInfo").addressLine1);
		this.$.buyerAddress2Input.set("value", shareholder.get("addressInfo").addressLine2);
		this.$.buyerAddress3Input.set("value", shareholder.get("addressInfo").addressLine3);
		this.$.buyerCityInput.set("value", shareholder.get("addressInfo").city);
		this.$.buyerCountryPicker.set("selected", shareholder.get("addressInfo").country);
		this.$.buyerZipPostalInput.set("value", shareholder.get("addressInfo").zipPostalCode);

		if (shareholder.get("addressInfo").country === "CAN") {
			this.$.buyerProvincePicker.set("selected", shareholder.get("addressInfo").stateProvince);
		}
		else if (shareholder.get("addressInfo").country === "USA") {
			this.$.buyerStatePicker.set("selected", shareholder.get("addressInfo").stateProvince);
		}
		else {
			this.$.buyerStateProvinceInput.set("value", shareholder.get("addressInfo").stateProvince);
		}

		this.$.buyerEmailInput.set("value", shareholder.get("emailAddress"));
		this.$.buyerPhoneInput.set("value", shareholder.get("phoneNumber"));
		this.$.buyerContactIDInput.set("value", shareholder.get("_id"));
	},

	populatePrincipalsDropdown: function()
	{
		this.$.principalPicker.destroyClientControls();

		var principals = [];

		var populatePickersFunction = function(value, index, array){
			principals.push({value: value.principalID, content: value.name});
		};

		this.get("principals").forEach(populatePickersFunction);

		this.$.principalPicker.createComponents(principals);
		this.$.principalPicker.render();
	},

	validateInputs: function()
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		var flagAsInvalid = function(control, doNotUseParent) {
			isValid = false;
			if(control.kind === "quantum.Input"){
				control.setBorderError();
			}
			else if (doNotUseParent === true)
			{
				control.applyStyle("border", borderError);
			}
			else
			{
				control.parent.applyStyle("border", borderError);
			}
		};

		var postalRegEx = /^[abceghjklmnprstvxy][0-9][abceghjklmnprstvwxyz]\s?[0-9][abceghjklmnprstvwxyz][0-9]$/i;
		var zipRegEx = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

		var validate_regEx = function(control, regEx) {
			try
			{
				if (control.get("value").match(regEx) === null) { throw null; }
			}
			catch (err) { flagAsInvalid(control); }
		};

		var validate_selected = function(control, isCustom) {
			try
			{
				var data = control.get("selected").value;
				if (data == null || data === "") { throw null; }
			}
			catch (err) { flagAsInvalid(control, isCustom); }
		};

		// Transaction Date:
		if(this.$.dateReceivedInput.get("value") === ""){flagAsInvalid(this.$.dateReceivedInput);}

		// Transfer Status:
		validate_selected(this.$.transferStatusPicker);

		// Transfer Type:
		validate_selected(this.$.transferTypePicker);

		// Principal
		validate_selected(this.$.principalPicker);

		// Transfer Approval Type:
		validate_selected(this.$.transferApprovalTypePicker);

		// Seller Type:
		validate_selected(this.$.sellerTransferTypePicker);

		if(!this.$.numSharesInput.validate()){isValid = false;}

		if(this.$.numSharesInput.get("value") <= 0)
		{
			this.$.numSharesInput.setBorderError();
			isValid = false;
		}

		// Class of Shares:
		if(!this.$.classSharesInput.validate()){isValid = false;}

		// Price per Share:
		if(this.getSelected(this.$.transferTypePicker) !== "nominal" && this.getSelected(this.$.transferTypePicker) !== "customNominal" && !this.$.pricePerShareInput.validate()){isValid = false;}

		if(this.getSelected(this.$.transferTypePicker) !== "nominal" && this.getSelected(this.$.transferTypePicker) !== "customNominal" && this.$.pricePerShareInput.get("value") <= 0)
		{
			this.$.pricePerShareInput.setBorderError();
			isValid = false;
		}

		//Sell Order Buy Price:
		if(this.getSelected(this.$.transferTypePicker) === "order")
		{
			if(!this.$.buyPricePerShareInput.validate()){isValid = false;}

			if(this.$.buyPricePerShareInput.get("value") <= this.$.pricePerShareInput.get("value"))
			{
				this.$.pricePerShareInput.setBorderError();
				this.$.buyPricePerShareInput.setBorderError();
				isValid = false;
			}
		}	

		// Total Purchase Price:
		if(!this.$.purchasePriceInput.validate()){isValid = false;}

		// Company Name:
		if(!this.$.companyNameInput.validate()){isValid = false;}

		// Certificate Number:
		if(!this.$.certificateNumberInput.validate()){isValid = false;}

		// Seller Name:
		if(!this.$.sellerNameInput.validate()){isValid = false;}

		try
		{
			if (this.getSelected(this.$.sellerTransferTypePicker) === "corporate")
			{
				// Seller Signatory Name:
				if(!this.$.sellerSignatoryNameInput.validate()){isValid = false;}

				// Seller Signatory Title:
				if(!this.$.sellerSignatoryTitleInput.validate()){isValid = false;}
			}
		}
		catch (err) {}

		// Seller Address Line 1:
		if(!this.$.sellerAddress1Input.validate()){isValid = false;}

		// Seller City:
		if(!this.$.sellerCityInput.validate()){isValid = false;}

		try
		{
			var country = this.getSelected(this.$.sellerCountryPicker);
			if (country === "USA")
			{
				// Seller State:
				validate_selected(this.$.sellerStatePicker, true);

				// Seller ZIP:
				validate_regEx(this.$.sellerZipPostalInput, zipRegEx);
			}
			else if (country === "CAN")
			{
				// Seller Province:
				validate_selected(this.$.sellerProvincePicker, true);

				// Seller Postal Code:
				validate_regEx(this.$.sellerZipPostalInput, postalRegEx);
			}
			else
			{
				// Seller State / Province
				//validate_nonEmptyString(this.$.sellerStateProvinceInput);

				// Seller ZIP / Postal Code:
				//validate_nonEmptyString(this.$.sellerZipPostalInput);
			}
		}
		catch (err) {}

		// Seller Country
		validate_selected(this.$.sellerCountryPicker, true);

		// Seller Email Address:
		if(!this.$.sellerEmailInput.validate()){isValid = false;}

		// Seller Phone Number:
		if(!this.$.sellerPhoneInput.validate()){isValid = false;}

		// Seller Contact ID:
		if (this.$.sellerContactIDInput.get("value") === "")
		{
			alertify.error("Must Select a Valid Contact as Seller");
			isValid = false;
		}

		// Buyer Type:
		validate_selected(this.$.buyerTransferTypePicker);

		// Buyer Name:
		if(!this.$.buyerNameInput.validate()){isValid = false;}

		try
		{
			if (this.getSelected(this.$.buyerTransferTypePicker) === "corporate")
			{
				// Buyer Signatory Name:
				if(!this.$.buyerSignatoryNameInput.validate()){isValid = false;}

				// Buyer Signatory Title:
				if(!this.$.buyerSignatoryTitleInput.validate()){isValid = false;}
			}
		}
		catch (err) {}

		// Buyer Address Line 1:
		if(!this.$.buyerAddress1Input.validate()){isValid = false;}

		// Buyer City:
		if(!this.$.buyerCityInput.validate()){isValid = false;}

		try
		{
			var buyerCountry = this.getSelected(this.$.buyerCountryPicker);
			if (buyerCountry === "USA")
			{
				// Buyer State:
				validate_selected(this.$.buyerStatePicker, true);

				// Buyer ZIP:
				validate_regEx(this.$.buyerZipPostalInput, zipRegEx);
			}
			else if (buyerCountry === "CAN")
			{
				// Buyer Province:
				validate_selected(this.$.buyerProvincePicker, true);

				// Buyer Postal Code:
				validate_regEx(this.$.buyerZipPostalInput, postalRegEx);
			}
			else
			{
				// Buyer State / Province
				//validate_nonEmptyString(this.$.buyerStateProvinceInput);

				// Buyer ZIP / Postal Code:
				//validate_nonEmptyString(this.$.buyerZipPostalInput);
			}
		}
		catch (err) {}

		// Buyer Country
		validate_selected(this.$.buyerCountryPicker, true);

		// Buyer Email Address:
		if(!this.$.buyerEmailInput.validate()){isValid = false;}

		// Buyer Phone Number:
		if(!this.$.buyerPhoneInput.validate()){isValid = false;}

		// Buyer Contact ID:
		if (this.$.buyerContactIDInput.get("value") === "")
		{
			alertify.error("Must Select a Valid Contact as Buyer");
			isValid = false;
		}

		if(this.$.sellerContactIDInput.get("value") === this.$.buyerContactIDInput.get("value"))
		{
			alertify.error("Seller and Buyer Must Be Two Different Contacts");
			isValid = false;
		}

		//Optionally, Approver
		if (this.getSelected(this.$.transferApprovalTypePicker) !== "company")
		{
			validate_selected(this.$.approverPicker);
		}

		// POA Recipient
		validate_selected(this.$.poaRecipientPicker);

		// Law Firm ID:
		validate_selected(this.$.lawFirmPicker);

		// Lawyer ID:
		validate_selected(this.$.lawyerPicker);

		// Trust Account ID:
		validate_selected(this.$.trustAccountPicker);

		// Invoice Module
		if (!this.$.transferInvoicingModule.validate()){isValid = false;}

		if (!isValid) { alertify.error("Validation Failed"); }
		return isValid;
	},

	validateBusinessRules: function()
	{
		var isValid = true;

		if (this.get("activeEntry").get("transferStatus") === "complete")
		{
			alertify.error("Cannot make any changes to a completed transfer.");
			isValid = false;
		}

		var completeDocCheck = true;
		var generatedDocCheck = true;
		incompleteDocs = [];

		if(this.$.psaCheckbox.checked === true)
		{
			if(this.get("activeEntry").get("transferDocuments")["purchaseAndSaleAgreement"].signed !== true)
			{
				completeDocCheck = false;
				incompleteDocs.push("purchaseAndSaleAgreement");
			}
			if(this.get("activeEntry").get("transferDocuments")["purchaseAndSaleAgreement"].generated !== true)
			{
				generatedDocCheck = false;
			}
		}
		if(this.$.loiCheckbox.checked === true)
		{
			if(this.get("activeEntry").get("transferDocuments")["letterOfInstruction"].signed !== true)
			{
				completeDocCheck = false;
				incompleteDocs.push("letterOfInstruction");
			}
			if(this.get("activeEntry").get("transferDocuments")["letterOfInstruction"].generated !== true)
			{
				generatedDocCheck = false;
			}
		}
		if(this.$.poaCheckbox.checked === true)
		{
			if(this.get("activeEntry").get("transferDocuments")["powerOfAttorney"].generated !== true)
			{
				completeDocCheck = false;
				incompleteDocs.push("powerOfAttorney");
			}
			if(this.get("activeEntry").get("transferDocuments")["powerOfAttorney"].generated !== true)
			{
				generatedDocCheck = false;
			}
		}
		if(this.$.stfCheckbox.checked === true)
		{
			if(this.get("activeEntry").get("transferDocuments")["securitiesTransferForm"].generated !== true)
			{
				completeDocCheck = false;
				incompleteDocs.push("securitiesTransferForm");
			}
			if(this.get("activeEntry").get("transferDocuments")["securitiesTransferForm"].generated !== true)
			{
				generatedDocCheck = false;
			}
		}
		if(this.$.lgoCheckbox.checked === true)
		{
			if(this.get("activeEntry").get("transferDocuments")["legalOpinion"].generated !== true)
			{
				completeDocCheck = false;
				incompleteDocs.push("legalOpinion");
			}
			if(this.get("activeEntry").get("transferDocuments")["legalOpinion"].generated !== true)
			{
				generatedDocCheck = false;
			}
		}
		if(this.$.staCheckbox.checked === true)
		{
			if(this.get("activeEntry").get("transferDocuments")["shareTransferApproval"].signed !== true)
			{
				completeDocCheck = false;
				incompleteDocs.push("shareTransferApproval");
			}
			if(this.get("activeEntry").get("transferDocuments")["shareTransferApproval"].generated !== true)
			{
				generatedDocCheck = false;
			}
		}

		var fundsPaid = this.$.paymentSection.calculateFundsPaid();

		//General Checks
		if (this.getSelected(this.$.transferStatusPicker) === "new" && this.mode === "edit")
		{
			if(fundsPaid >= this.get("activeEntry").get("totalPurchasePrice"))
			{
				isValid = false;
				alertify.error("Unable to set new with funds completed");
			}
		}
		else if (this.getSelected(this.$.transferStatusPicker) !== "new" && this.getSelected(this.$.transferStatusPicker) !== "cancelled")
		{
			if(fundsPaid < this.get("activeEntry").get("totalPurchasePrice"))
			{
				isValid = false;
				alertify.error("Unable to set status without full payment");
			}
		}

		if((this.getSelected(this.$.transferStatusPicker) === "completeDocsAndFunds" || this.getSelected(this.$.transferStatusPicker) === "withLawyer" || this.getSelected(this.$.transferStatusPicker) === "withTransferAgent" || this.getSelected(this.$.transferStatusPicker) === "complete")&& completeDocCheck === false)
		{
			alertify.error("Cannot set status without all documents signed.");
			isValid = false;
		}

		//Specific checks
		if (this.getSelected(this.$.transferStatusPicker) === "fundsOnly")
		{
			if(generatedDocCheck === true)
			{
				isValid = false;
				alertify.error("Unable to set status with documents generated");
			}
			else if(completeDocCheck === true)
			{
				isValid = false;
				alertify.error("Unable to set status with all documents signed");
			}		
		}
		else if(this.getSelected(this.$.transferStatusPicker) === "incompleteDocsAllFunds")
		{
			if(generatedDocCheck === false)
			{
				isValid = false;
				alertify.error("Unable to set status without documents generated");
			}
			else if(completeDocCheck === true)
			{
				isValid = false;
				alertify.error("Unable to set status with all documents signed");
			}
		}
		else if(this.getSelected(this.$.transferStatusPicker) === "cancelled")
		{
			//Call the cancel function. Probably add a warning in there somewhere.
			if(fundsPaid > 0)
			{
				isValid = false;
				alertify.error("Unable to cancel until all funds are refunded");
			}
			else
			{
				this.set("cancelFlag", true);
			}
		}
		else if(this.getSelected(this.$.transferStatusPicker) === "complete")
		{
			//Check to make sure that the appropriate signed documents exist
			this.documentNames.forEach(enyo.bind(this, function(currentValue) {
				if(this.get("activeEntry").get("transferDocuments")[currentValue].signed === false || this.get("activeEntry").get("transferDocuments")[currentValue].signedFileName === "")
				{
					if(!this.get("activeEntry").get("customTransferSettings") || this.get("activeEntry").get("customTransferSettings")[currentValue] === true)
					{
						isValid = false;
						alertify.error("Cannot Complete Without Signed "+currentValue);
					}
				}
			}));
		}

		if(this.mode === "add" && this.$.numSharesInput.get("value") > this.sharesAvailable)
		{
			this.$.numSharesInput.setBorderError();
			alertify.error("Seller only has " + this.sharesAvailable + " shares available to sell");
			isValid = false;
		}

		return isValid;
	},

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
	},

	rollback: function(database, record, revision)
	{
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "rollback",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				databaseID: database,
				recordID: record,
				revisionID: revision
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to rollback");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to rollback");
				console.log(response);
				return;
			}
			else
			{
				alertify.success("Rollback Successful");
			}
		}));

		request.go();
	},

	rollbackAdd: function()
	{
		if(this.mode === "add")
		{
			this.get("database").remove(this.get("activeEntry").raw(), enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Failed To Delete Malformed Transfer");
					console.log(err);
					this.$.loadingPopup.hide();
					return;
				}

				alertify.error("Failed To Create Transfer Due To Malformed Contact");
				this.set("activeEntry", null);
				this.$.loadingPopup.hide();
				this.doGoBack();
				return;
			}));
		}
	},

	updateContacts: function(agreementsToSend, agreementsToCancel)
	{
		//Cant pass these through the object because saving will trigger an update and null them
		var agreementsToSendQueue = agreementsToSend;
		var agreementsToCancelQueue = agreementsToCancel;

		var processQueues = enyo.bind(this, function(callback) {
			if (agreementsToCancelQueue.length > 0)
			{
				this.cancelAdobeDocument(agreementsToCancelQueue.pop(), function() { processQueues(); });
			}
			else if (agreementsToSendQueue.length > 0)
			{
				this.sendAdobeDocument(agreementsToSendQueue.pop(), function() { processQueues(); });
			}
			else
			{
				if (typeof(callback) === 'function') { callback(); }
			}
		});

		//Determine which functionality to use. Stupid sassafrassing add order of operation nonsense means we need to generate the data before calling this.
		var sellerRoute = "";
		var buyerRoute = "";
		if (this.get("mode") === "add") 
		{
			sellerRoute = "createcontactpendingtransactionrecord";
			buyerRoute = "createbuyerpendingtransactionrecord";
		}
		else if (this.get("mode") === "edit" && this.getSelected(this.$.transferStatusPicker) === "complete")
		{
			sellerRoute = "finalizecontactpendingtransactionrecord";
			buyerRoute = "finalizebuyerpendingtransactionrecord";
		}
		else if(this.get("mode") === "edit" && this.getSelected(this.$.transferStatusPicker) === "cancelled")
		{
			sellerRoute = "cancelcontactpendingtransactionrecord";
			buyerRoute = "cancelbuyerpendingtransactionrecord";
		}
		else
		{
			processQueues();
			return;
		}

		this.$.loadingPopup.show("Updating Contact Information.");
		var sellerRequest = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + sellerRoute,
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				companyID: quantum.preferences.get("company"),
				transferID: this.get("tempEntry")._id,
				contactID: this.get("tempEntry").seller.contactID
			}
		});

		sellerRequest.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to update seller transaction record.");
			if(response === 401){
				this.doLogout();
				return;
			}
			//Rollback activeEntry
			if(this.mode === "add")
			{
				this.rollbackAdd();
			}
			else
			{
				this.rollback(quantum.preferences.get("transferDatabase"), this.get("tempEntry")._id, this.get("tempEntry").rollbackRevision);
			}
			console.log(request, response);
			return;
		}));

		sellerRequest.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to update seller transaction record.");
				//Rollback activeEntry
				if(this.mode === "add")
				{
					this.rollbackAdd();
				}
				else
				{
					this.rollback(quantum.preferences.get("transferDatabase"), this.get("tempEntry")._id, this.get("tempEntry").rollbackRevision);
				}
				console.log(request, response);
				return;
			}

			alertify.success("Successfully updated seller transaction record.");

			var sellerRevision = response.rev;

			var buyerRequest = new enyo.Ajax({
				url: quantum.preferences.get("apiServer") + buyerRoute,
				method: "POST",
				cacheBust: false,
				contentType: "application/json",
				headers:{
					"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
				},
				postBody: {
					companyID: quantum.preferences.get("company"),
					transferID: this.get("tempEntry")._id,
					contactID: this.get("tempEntry").buyer.contactID
				}
			});

			buyerRequest.error(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();
				alertify.error("Failed to update buyer transaction record.");
				if(response === 401){
					this.doLogout();
					return;
				}
				//Rollback seller and activeEntry
				this.rollback(quantum.preferences.get("contactDatabase"), this.get("activeEntry").get("seller").contactID, sellerRevision);
				if(this.mode === "add")
				{
					this.rollbackAdd();
				}
				else
				{
					this.rollback(quantum.preferences.get("transferDatabase"), this.get("tempEntry")._id, this.get("tempEntry").rollbackRevision);
				}
				console.log(request, response);
				return;
			}));

			buyerRequest.response(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();
				if (response.error)
				{
					alertify.error("Failed to update buyer transaction record.");
					console.log(request, response);
					//Rollback seller and activeEntry
					this.rollback(quantum.preferences.get("contactDatabase"), this.get("activeEntry").get("seller").contactID, sellerRevision);
					if(this.mode === "add")
					{
						this.rollbackAdd();
					}
					else
					{
						this.rollback(quantum.preferences.get("transferDatabase"), this.get("tempEntry")._id, this.get("tempEntry").rollbackRevision);
					}
					return;
				}
				else
				{
					alertify.success("Successfully updated buyer transaction record.");
				}

				processQueues();
				this.set("tempEntry", null)

				if(this.mode === "add")
				{
					var filteredCollection = this.get("transferCollection").filter(enyo.bind(this, function(value, index, array){
						return value.get("_id") === this.get("activeEntry").get("_id");
					}));

					this.set("activeEntry", null)

					filteredCollection = new quantum.TransferCollection(filteredCollection);

					if (filteredCollection.length > 0)
					{
						this.doViewItemDetail({}, {item: filteredCollection.at(0), collection: filteredCollection});
					}
				}
				else if (this.get("mode") === "edit" && this.getSelected(this.$.transferStatusPicker) === "complete")
				{
					this.doGoBack();
				}

			}));
			buyerRequest.go();
		}));
		sellerRequest.go();
	},

	saveEntry: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Saving...");
		var tempEntry = JSON.parse(JSON.stringify(this.get("activeEntry").raw()));

		tempEntry.transactionDate = this.get("activeDate").valueOf();
		tempEntry.transferStatus = this.getSelected(this.$.transferStatusPicker);
		tempEntry.transferType = this.getSelected(this.$.transferTypePicker);
		tempEntry.principalID = this.getSelected(this.$.principalPicker);
		tempEntry.transferApprovalType = this.getSelected(this.$.transferApprovalTypePicker);
		tempEntry.numShares = quantum.parseInt(this.get("numShares"));
		tempEntry.classOfShares = this.$.classSharesInput.get("value");
		tempEntry.pricePerShare = quantum.parseFloat(this.get("pricePerShare"));
		tempEntry.buyPricePerShare = quantum.parseFloat(this.get("buyPricePerShare"));
		tempEntry.totalPurchasePrice = quantum.parseFloat(this.get("totalPurchasePrice"));
		tempEntry.companyName = this.$.companyNameInput.get("value");
		tempEntry.certificateNumber = this.$.certificateNumberInput.get("value");
		tempEntry.notes = this.$.notesInput.get("value");

		if(this.mode === "add" && (this.getSelected(this.$.transferTypePicker) === "custom" || this.getSelected(this.$.transferTypePicker) === "customNominal"))
		{
			var customTransferSettings =
			{
				purchaseAndSaleAgreement: this.$.psaCheckbox.checked,
				sellerPurchaseAndSaleAgreement: this.$.psa2SCheckbox.checked,
				buyerPurchaseAndSaleAgreement: this.$.psa2BCheckbox.checked,
				letterOfInstruction: this.$.loiCheckbox.checked,
				powerOfAttorney: this.$.poaCheckbox.checked,
				shareTransferApproval: this.$.staCheckbox.checked,
				securitiesTransferForm: this.$.stfCheckbox.checked,
				legalOpinion: this.$.lgoCheckbox.checked
			};
			tempEntry.customTransferSettings = customTransferSettings;
		}
		else if(this.mode === "add" && this.getSelected(this.$.transferTypePicker) === "order")
		{
			var customTransferSettings =
			{
				purchaseAndSaleAgreement: false,
				sellerPurchaseAndSaleAgreement: true,
				buyerPurchaseAndSaleAgreement: true,
				letterOfInstruction: false,
				powerOfAttorney: true,
				shareTransferApproval: true,
				securitiesTransferForm: true,
				legalOpinion: true
			};
			tempEntry.customTransferSettings = customTransferSettings;
		}
		else if(this.mode === "add")
		{
			var customTransferSettings =
			{
				purchaseAndSaleAgreement: true,
				sellerPurchaseAndSaleAgreement: false,
				buyerPurchaseAndSaleAgreement: false,
				letterOfInstruction: true,
				powerOfAttorney: true,
				shareTransferApproval: true,
				securitiesTransferForm: true,
				legalOpinion: true
			};
			tempEntry.customTransferSettings = customTransferSettings;
		}

		//Seller
		tempEntry.seller.transferType = this.getSelected(this.$.sellerTransferTypePicker);
		tempEntry.seller.name = this.$.sellerNameInput.get("value");
		tempEntry.seller.signatoryName = this.$.sellerSignatoryNameInput.get("value");
		tempEntry.seller.signatoryTitle = this.$.sellerSignatoryTitleInput.get("value");
		tempEntry.seller.addressInfo.addressLine1 = this.$.sellerAddress1Input.get("value");
		tempEntry.seller.addressInfo.addressLine2 = this.$.sellerAddress2Input.get("value");
		tempEntry.seller.addressInfo.addressLine3 = this.$.sellerAddress3Input.get("value");
		tempEntry.seller.addressInfo.city = this.$.sellerCityInput.get("value");
		if (this.getSelected(this.$.sellerCountryPicker) === "USA")
		{
			tempEntry.seller.addressInfo.stateProvince = this.getSelected(this.$.sellerStatePicker, "content");
		}
		else if (this.getSelected(this.$.sellerCountryPicker) === "CAN")
		{
			tempEntry.seller.addressInfo.stateProvince = this.getSelected(this.$.sellerProvincePicker, "content");
		}
		else
		{
			tempEntry.seller.addressInfo.stateProvince = this.$.sellerStateProvinceInput.get("value");
		}
		tempEntry.seller.addressInfo.zipPostalCode = this.$.sellerZipPostalInput.get("value");
		tempEntry.seller.addressInfo.country = this.getSelected(this.$.sellerCountryPicker);
		tempEntry.seller.email = this.$.sellerEmailInput.get("value");
		tempEntry.seller.phone = this.$.sellerPhoneInput.get("value");
		tempEntry.seller.contactID = this.$.sellerContactIDInput.get("value");

		//Buyer
		tempEntry.buyer.transferType = this.getSelected(this.$.buyerTransferTypePicker);
		tempEntry.buyer.name = this.$.buyerNameInput.get("value");
		tempEntry.buyer.signatoryName = this.$.buyerSignatoryNameInput.get("value");
		tempEntry.buyer.signatoryTitle = this.$.buyerSignatoryTitleInput.get("value");
		tempEntry.buyer.addressInfo.addressLine1 = this.$.buyerAddress1Input.get("value");
		tempEntry.buyer.addressInfo.addressLine2 = this.$.buyerAddress2Input.get("value");
		tempEntry.buyer.addressInfo.addressLine3 = this.$.buyerAddress3Input.get("value");
		tempEntry.buyer.addressInfo.city = this.$.buyerCityInput.get("value");
		if (this.getSelected(this.$.buyerCountryPicker) === "USA")
		{
			tempEntry.buyer.addressInfo.stateProvince = this.getSelected(this.$.buyerStatePicker, "content");
		}
		else if (this.getSelected(this.$.buyerCountryPicker) === "CAN")
		{
			tempEntry.buyer.addressInfo.stateProvince = this.getSelected(this.$.buyerProvincePicker, "content");
		}
		else
		{
			tempEntry.buyer.addressInfo.stateProvince = this.$.buyerStateProvinceInput.get("value");
		}
		tempEntry.buyer.addressInfo.zipPostalCode = this.$.buyerZipPostalInput.get("value");
		tempEntry.buyer.addressInfo.country = this.getSelected(this.$.buyerCountryPicker);
		tempEntry.buyer.email = this.$.buyerEmailInput.get("value");
		tempEntry.buyer.phone = this.$.buyerPhoneInput.get("value");
		tempEntry.buyer.contactID = this.$.buyerContactIDInput.get("value");

		//Approver
		tempEntry.approver.approverID = this.getSelected(this.$.approverPicker);

		//Power of Attorney
		tempEntry.powerOfAttorney.powerOfAttorneyID = this.getSelected(this.$.poaRecipientPicker);

		//Lawyer
		tempEntry.lawyer.lawFirmID = this.getSelected(this.$.lawFirmPicker);
		tempEntry.lawyer.lawyerID = this.getSelected(this.$.lawyerPicker);
		tempEntry.lawyer.trustAccountID = this.getSelected(this.$.trustAccountPicker);

		//Invoice Data
		if (this.get("mode") === "add")
		{
			tempEntry.invoiceDetail.feesPaidBy = this.$.transferInvoicingModule.get("feesPaidBy");
			tempEntry.invoiceDetail.sellerDiscount = this.$.transferInvoicingModule.get("sellerDiscount");
			tempEntry.invoiceDetail.buyerDiscount = this.$.transferInvoicingModule.get("buyerDiscount");
			tempEntry.invoiceDetail.sellerInvoiceID = this.$.transferInvoicingModule.get("sellerInvoiceID");
			tempEntry.invoiceDetail.buyerInvoiceID = this.$.transferInvoicingModule.get("buyerInvoiceID");
		}

		//Attachments
		if (tempEntry._attachments == null) { tempEntry._attachments = {}; }
		var attachments = tempEntry._attachments;

		var agreementsToSendQueue = [];
		var agreementsToCancelQueue = [];

		if(this.get("cancelFlag") === true)
		{
			if(Object.keys(this.get("documentsToUpload")).length > 0 && this.get("documentsToUpload").constructor === Object)
			{
				this.set("documentsToUpload", {});
				this.setDisabledForRoles();
			}
			else
			{
				var adobeAgreementIds = [];
				this.documentNames.forEach(enyo.bind(this, function(name) {
					var adobeAgreementId = this.get("activeEntry").get("transferDocuments")[name].adobe.agreementId;
					if (adobeAgreementId != null && adobeAgreementId !== "")
					{
						adobeAgreementIds.push(adobeAgreementId);
					}
				}));

				agreementsToCancelQueue = adobeAgreementIds;

				this.documentNames.forEach(enyo.bind(this, function(currentValue)
				{
					if (tempEntry.transferDocuments[currentValue].generated) { delete tempEntry._attachments[tempEntry.transferDocuments[currentValue].unsignedFileName]; }
					tempEntry.transferDocuments[currentValue].generated = false;
					tempEntry.transferDocuments[currentValue].generatedTimestamp = 0;
					tempEntry.transferDocuments[currentValue].unsignedFileName = "";
					if (tempEntry.transferDocuments[currentValue].signed) { delete tempEntry._attachments[tempEntry.transferDocuments[currentValue].signedFileName]; }
					tempEntry.transferDocuments[currentValue].sent = false;
					tempEntry.transferDocuments[currentValue].sentTimestamp = 0;
					tempEntry.transferDocuments[currentValue].signed = false;
					tempEntry.transferDocuments[currentValue].signedTimestamp = 0;
					tempEntry.transferDocuments[currentValue].signedFileName = "";
					tempEntry.transferDocuments[currentValue].adobe.agreementId = "";
					tempEntry.transferDocuments[currentValue].adobe.status = "";
					tempEntry.transferDocuments[currentValue].adobe.statusTimestamp = 0;
				}));
			}
		}

		if(this.get("sendFlag") === true)
		{
			// Process any Transfer documents.
			var processDoc = enyo.bind(this, function(name) {
				var aeDoc = tempEntry.transferDocuments[name];
				if (!aeDoc.generated)
				{
					//If we haven't generated the document, we don't need to be processing it here.
					return;
				}

				//Shouldnt ever happen
				if (aeDoc.signed) 
				{ 
					delete attachments[aeDoc.signedFileName]; 
				}
				aeDoc.sent = false;
				aeDoc.sentTimestamp = 0;
				aeDoc.signed = false;
				aeDoc.signedTimestamp = 0;
				aeDoc.signedFileName = "";
				var adobeAgreementId = aeDoc.adobe.agreementId;
				if (adobeAgreementId != null && adobeAgreementId !== "")
				{
					// Queue the doc to be cancelled.
					if (agreementsToCancelQueue.indexOf(adobeAgreementId) === -1) 
					{ 
						agreementsToCancelQueue.push(adobeAgreementId); 
					}
				}
				// Queue the doc to be sent.
				if (agreementsToSendQueue.indexOf(name) === -1) 
				{ 
					agreementsToSendQueue.push(name); 
				}
			});

			this.documentNames.forEach(function(currentValue) {
				//These documents dont need to be "sent", so sould be ignored here
				if(currentValue !== "securitiesTransferForm" && currentValue !== "powerOfAttorney" && currentValue !== "legalOpinion")
				{
					processDoc(currentValue);
				}
			});
		}
		if(this.get("manualDocumentStore")["powerOfAttorney - Signed.pdf"])
		{
			tempEntry._attachments["powerOfAttorney - Signed.pdf"] = this.get("manualDocumentStore")["powerOfAttorney - Signed.pdf"];
		}
		if(this.get("manualDocumentStore")["securitiesTransferForm - Signed.pdf"])
		{
			tempEntry._attachments["securitiesTransferForm - Signed.pdf"] = this.get("manualDocumentStore")["securitiesTransferForm - Signed.pdf"];
		}
		if(this.get("manualDocumentStore")["legalOpinion - Signed.pdf"])
		{
			tempEntry._attachments["legalOpinion - Signed.pdf"] = this.get("manualDocumentStore")["legalOpinion - Signed.pdf"];
		}

		//Delete Documents and Document Attachments we've set to be deleted
		for(var i = 0; i < this.$.supportingDocuments.get("documentsToDelete").length; i++)
		{
			delete tempEntry._attachments[this.$.supportingDocuments.documentsToDelete[i]];
			//Edit the activeEntry documentsReceived to match our delete
			var itemToFind = this.$.supportingDocuments.get("documentsToDelete")[i];
			var result = tempEntry.documentsReceived.find(function(value, index, array) {
				return value.name === itemToFind;
			});
			if (result)
			{
				tempEntry.documentsReceived.splice(tempEntry.documentsReceived.indexOf(result), 1);
			}
		}
		this.$.supportingDocuments.set("documentsToDelete", []);

		//Upload documents if we have any documents to upload
		if (this.$.supportingDocuments.get("documentsToUpload").length > 0)
		{
			//First, make sure that _attachments and documentsReceived are initialized
			if (!tempEntry.documentsReceived) {tempEntry.documentsReceived = [];}
			if (!tempEntry._attachments) {tempEntry.attachments = {};}

			//Next, add any that we have to upload
			this.$.supportingDocuments.get("documentsToUpload").forEach(enyo.bind(this, function(value, index, array) {
				tempEntry.documentsReceived.push(
				{
					description: value.description,
					name: value.name,
					fileType: value.fileType,
					receivedDate: value.receivedDate
				});

				tempEntry._attachments[value.name] = {
					"content_type": value.fileType,
					"data": new Blob([new Uint8Array(value.fileData)], {type: value.fileType})
				};
			}));
		}

		//Delete Payments and Payment Attachments we've set to be deleted
		for(var i = 0; i < this.$.paymentSection.get("paymentsToDelete").length; i++)
		{
			delete tempEntry._attachments[this.paymentsToDelete[i]];
			//Edit the activeEntry paymentsReceived to match the local one.
			var itemToFind = this.paymentsToDelete[i];
			var result = tempEntry.paymentsReceived.find(function(value, index, array) {
				return value.name === itemToFind;
			});
			if (result)
			{
				tempEntry.paymentsReceived.splice(tempEntry.paymentsReceived.indexOf(result), 1);
			}
		}
		this.$.supportingDocuments.set("paymentsToDelete", []);

		//Upload payments if we have any documents to upload
		if (this.$.paymentSection.get("paymentsToUpload").length > 0)
		{
			//First, make sure that _attachments and paymentsReceived are initialized
			if (!tempEntry.paymentsReceived) {tempEntry.paymentsReceived = [];}
			if (!tempEntry._attachments) {tempEntry._attachments = {};}

			//Next, add any that we have to upload
			this.$.paymentSection.get("paymentsToUpload").forEach(enyo.bind(this, function(value, index, array) {
				tempEntry.paymentsReceived.push(
				{
					amount: value.amount,
					payerName: value.payerName,
					name: value.name,
					paymentType: value.paymentType,
					fileType: value.fileType,
					receivedDate: value.receivedDate
				});

				tempEntry._attachments[value.name] = {
					"content_type": value.fileType,
					"data": new Blob([new Uint8Array(value.fileData)], {type: value.fileType})
				};
			}));
		}

		if (this.get("mode") === "add")
		{
			tempEntry._id = uuid.v4().replace(/-/g,"");
		}

		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
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
			tempEntry.rollbackRevision = tempEntry._rev;

			this.get("database").post(tempEntry, enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Entry Update Failed");
					console.log(err, response);
					this.$.loadingPopup.hide();
					return;
				}

				this.set("cancelFlag", false);
				this.set("sendFlag", false);

				tempEntry._rev = response.rev;
				this.set("tempEntry",tempEntry);

				//Attempt to update the buyer and seller
				this.updateContacts(agreementsToSendQueue, agreementsToCancelQueue);

				//Email if new payments have been added
				if(this.paymentDelta > 0)
				{
					var ajaxProperties = {
						cacheBust: false,
						contentType: "application/json",
						method: "POST",
						url: quantum.preferences.get("apiServer") + "mailDaemon",
						headers:{
							"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
						}
					};

					var tempVars = {};
					if (this.get("activeEntry").get("buyer").contactPerson !== undefined && this.get("activeEntry").get("buyer").contactPerson !== "")
					{
						tempVars.contactPerson = this.get("activeEntry").get("buyer").contactPerson;
					}
					if (this.get("activeEntry").get("buyer").name !== undefined && this.get("activeEntry").get("buyer").name !== "")
					{
						tempVars.buyerName = this.get("activeEntry").get("buyer").name;
					}
					tempVars.newPaymentAmount = quantum.formatCurrency(this.paymentDelta);
					tempVars.paymentRemaining = quantum.formatCurrency(quantum.parseFloat(this.get("activeEntry").get("totalPurchasePrice")) - this.$.paymentSection.calculateFundsPaid());
					tempVars.companyName = this.get("activeEntry").get("companyName");
					tempVars.emailType = "transferBuyer";
					ajaxProperties.postBody = {data: tempVars, placement:quantum.preferences.get("transferDatabase"), record: this.get("activeEntry").get("_id"), templateName: "Transfer Funds Received"};

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
				}
				
				this.$.loadingPopup.hide(); //Hide at the very end, just in case it is still showing

				if(this.get("mode") === "add")
				{
					this.activate(new quantum.TransferModel(tempEntry));
				}
			}));
		}));
	},

	handleSaveEntryButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (!this.validateInputs()) { return; }

		if (!this.validateBusinessRules()) { return; }

		this.saveEntry();
	},

	isDirty: function()
	{
		var data = this.get("activeEntry");

		if (data == null) { return false; }

		var isDirtyArray = [
			this.$.supportingDocuments.isDirty(),
			this.$.paymentSection.isDirty(),

			data.get("transactionDate") !== this.get("activeDate").valueOf(),
			(this.mode === "edit" && data.get("transferStatus") !== this.getSelected(this.$.transferStatusPicker)),
			data.get("transferType") !== this.getSelected(this.$.transferTypePicker),
			data.get("principalID") !== this.getSelected(this.$.principalPicker),
			data.get("transferApprovalType") !== this.getSelected(this.$.transferApprovalTypePicker),
			data.get("numShares") !== quantum.parseInt(this.get("numShares")),
			data.get("classOfShares") !== this.$.classSharesInput.get("value"),
			data.get("pricePerShare") !== quantum.parseFloat(this.get("pricePerShare")),
			data.get("buyPricePerShare") !== quantum.parseFloat(this.get("buyPricePerShare")),
			data.get("totalPurchasePrice") !== quantum.parseFloat(this.get("totalPurchasePrice")),
			//data.get("companyName") !== this.$.companyNameInput.get("value"),
			data.get("certificateNumber") !== this.$.certificateNumberInput.get("value"),
			data.get("notes") !== this.$.notesInput.get("value"),

			data.get("seller").transferType !== this.getSelected(this.$.sellerTransferTypePicker),
			data.get("seller").name !== this.$.sellerNameInput.get("value"),
			(this.getSelected(this.$.sellerTransferTypePicker) === "corporate" && data.get("seller").signatoryName !== this.$.sellerSignatoryNameInput.get("value")),
			(this.getSelected(this.$.sellerTransferTypePicker) === "corporate" && data.get("seller").signatoryTitle !== this.$.sellerSignatoryTitleInput.get("value")),
			data.get("seller").addressInfo.addressLine1 !== this.$.sellerAddress1Input.get("value"),
			data.get("seller").addressInfo.addressLine2 !== this.$.sellerAddress2Input.get("value"),
			data.get("seller").addressInfo.addressLine3 !== this.$.sellerAddress3Input.get("value"),
			data.get("seller").addressInfo.city !== this.$.sellerCityInput.get("value"),
			(this.getSelected(this.$.sellerCountryPicker) === "USA" && data.get("seller").addressInfo.stateProvince !== this.getSelected(this.$.sellerStatePicker, "content")),
			(this.getSelected(this.$.sellerCountryPicker) === "CAN" && data.get("seller").addressInfo.stateProvince !== this.getSelected(this.$.sellerProvincePicker, "content")),
			(this.getSelected(this.$.sellerCountryPicker) !== "USA" && this.getSelected(this.$.sellerCountryPicker) !== "CAN" && data.get("seller").addressInfo.stateProvince !== this.$.sellerStateProvinceInput.get("value")),
			data.get("seller").addressInfo.zipPostalCode !== this.$.sellerZipPostalInput.get("value"),
			data.get("seller").addressInfo.country !== this.getSelected(this.$.sellerCountryPicker),
			data.get("seller").email !== this.$.sellerEmailInput.get("value"),
			data.get("seller").phone !== this.$.sellerPhoneInput.get("value"),
			data.get("seller").contactID !== this.$.sellerContactIDInput.get("value"),

			data.get("buyer").transferType !== this.getSelected(this.$.buyerTransferTypePicker),
			data.get("buyer").name !== this.$.buyerNameInput.get("value"),
			(this.getSelected(this.$.buyerTransferTypePicker) === "corporate" && data.get("buyer").signatoryName !== this.$.buyerSignatoryNameInput.get("value")),
			(this.getSelected(this.$.buyerTransferTypePicker) === "corporate" && data.get("buyer").signatoryTitle !== this.$.buyerSignatoryTitleInput.get("value")),
			data.get("buyer").addressInfo.addressLine1 !== this.$.buyerAddress1Input.get("value"),
			data.get("buyer").addressInfo.addressLine2 !== this.$.buyerAddress2Input.get("value"),
			data.get("buyer").addressInfo.addressLine3 !== this.$.buyerAddress3Input.get("value"),
			data.get("buyer").addressInfo.city !== this.$.buyerCityInput.get("value"),
			(this.getSelected(this.$.buyerCountryPicker) === "USA" && data.get("buyer").addressInfo.stateProvince !== this.getSelected(this.$.buyerStatePicker, "content")),
			(this.getSelected(this.$.buyerCountryPicker) === "CAN" && data.get("buyer").addressInfo.stateProvince !== this.getSelected(this.$.buyerProvincePicker, "content")),
			(this.getSelected(this.$.buyerCountryPicker) !== "USA" && this.getSelected(this.$.buyerCountryPicker) !== "CAN" && data.get("buyer").addressInfo.stateProvince !== this.$.buyerStateProvinceInput.get("value")),
			data.get("buyer").addressInfo.zipPostalCode !== this.$.buyerZipPostalInput.get("value"),
			data.get("buyer").addressInfo.country !== this.getSelected(this.$.buyerCountryPicker),
			data.get("buyer").email !== this.$.buyerEmailInput.get("value"),
			data.get("buyer").phone !== this.$.buyerPhoneInput.get("value"),
			data.get("buyer").contactID !== this.$.buyerContactIDInput.get("value"),

			data.get("approver").approverID !== this.getSelected(this.$.approverPicker),

			data.get("powerOfAttorney").powerOfAttorneyID !== this.getSelected(this.$.poaRecipientPicker),

			data.get("lawyer").lawFirmID !== this.getSelected(this.$.lawFirmPicker),
			data.get("lawyer").lawyerID !== this.getSelected(this.$.lawyerPicker),
			data.get("lawyer").trustAccountID !== this.getSelected(this.$.trustAccountPicker),

			(Object.keys(this.get("documentsToUpload")).length > 0 && this.get("documentsToUpload").constructor === Object)
		];

		//console.log(isDirtyArray);
		return (isDirtyArray.indexOf(true)!== -1);
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
			this.createComponent({name: "next_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "nextEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}
		else { this.nextEntry(inSender, inEvent); }
	},

	nextEntry: function(inSender, inEvent)
	{
		this.activate(this.get("transferCollection").at(this.get("transferCollection").indexOf(this.get("activeEntry")) + 1));
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
			this.createComponent({name: "previous_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "previousEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.previous_saveChangesPopup.show("Save changes?");
		}
		else { this.previousEntry(inSender, inEvent); }
	},

	previousEntry: function(inSender, inEvent)
	{
		this.activate(this.get("transferCollection").at(this.get("transferCollection").indexOf(this.get("activeEntry")) - 1));
	},

	handleGenerateDocuments: function(inSender, inEvent)
	{
		this.set("documentsToUpload", {});

		var validated = true;

		if (!this.validateFormPurchaseAndSaleAgreement())
		{
			alertify.error("Failed to Validate Fields for Purchase And Sale Agreement");
			validated = false;
		}

		if (!this.validateFormLetterOfInstruction())
		{
			alertify.error("Failed to Validate Fields for Letter Of Instruction");
			validated = false;
		}

		if (!this.validateFormPowerOfAttorney())
		{
			alertify.error("Failed to Validate Fields for Power Of Attorney");
			validated = false;
		}

		if (!this.validateFormShareTransferApproval())
		{
			alertify.error("Failed to Validate Fields for Share Transfer Approval");
			validated = false;
		}

		if (!this.validateFormGreenhillShareTransferApproval())
		{
			alertify.error("Failed to Validate Fields for Greenhill Share Transfer Approval");
			validated = false;
		}

		if (!this.validateFormSecuritiesTransferForm())
		{
			alertify.error("Failed to Validate Fields for Securities Transfer Form");
			validated = false;
		}

		if (!this.validateFormLegalOpinion())
		{
			alertify.error("Failed to Validate Fields for Legal Opinion");
			validated = false;
		}

		if (!validated)
		{
			return;
		}

		if(this.isDirty())
		{
			if (this.$.generateSaveChangesPopup)
			{
				this.$.generateSaveChangesPopup.hide();
				this.$.generateSaveChangesPopup.destroy();
			}
			this.createComponent({name: "generateSaveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "", onHide: "handlePopupHidden"} , {owner:this});
			this.$.generateSaveChangesPopup.show("You Must Save Before Generating Documents, Save?");
			return;
		}

		this.$.loadingPopup.show("Generating...");

		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generatetransferdocs",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				transferDatabase: quantum.preferences.get("transferDatabase"),
				transferID: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to generate transfer documents");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
			this.setDisabledForRoles();
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to generate transfer documents");
				console.log(response);
				this.setDisabledForRoles();
			}
			else
			{
				alertify.success("Transfer documents generated!");
				this.setDisabledForRoles();
			}
		}));

		request.go();
	},

	handleCancelDocuments: function(inSender, inEvent)
	{
		this.set("cancelFlag", true);
		this.handleSaveEntryButtonTapped();
	},

	handleSendDocuments: function(inSender, inEvent)
	{
		this.set("sendFlag", true);
		this.handleSaveEntryButtonTapped();
	},

	handlePostToLawyer: function(inSender, inEvent)
	{
		this.$.loadingPopup.show();
		var lawyerPackage = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendlawyerpackage",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				transferDatabase: quantum.preferences.get("transferDatabase"),
				transferId: this.get("activeEntry").get("_id")
			}
		});

		lawyerPackage.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("super post error.");
			console.log(request);
		}));

		lawyerPackage.response(enyo.bind(this, function(request, response) {
			if (response.error) {
				this.$.loadingPopup.hide();
				alertify.error("post error.");
				console.log(request, response);
				return;
			}

			this.$.loadingPopup.hide();

		}));

		lawyerPackage.go();
	},

	handleDownloadDocument: function(inSender, inEvent)
	{
		var documentName = this.getActiveEntryDocument(inEvent.originator.name).unsignedFileName;
		if (documentName == null)
		{
			alertify.error("Nothing to Download");
			return;
		}

		if (this.get("documentsToUpload") != null && this.get("documentsToUpload")[documentName] != null)
		{
			saveAs(this.get("documentsToUpload")[documentName].data, this.get("documentsToUpload")[documentName].documentName);
		}
		else
		{
			this.$.loadingPopup.show("Downloading");

			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), documentName, enyo.bind(this, function(err, response) {
					this.$.loadingPopup.hide();

					if (err)
					{
						alertify.error("Download Failed");
						console.log(err);
						return;
					}

					saveAs(response, documentName);
				}));
			}));
		}
	},

	handleDownloadSignedDocument: function(inSender, inEvent)
	{
		var documentName = this.getActiveEntryDocument(inEvent.originator.name).signedFileName;
		if (documentName == null)
		{
			alertify.error("Nothing to Download");
			return;
		}

		this.$.loadingPopup.show("Downloading");

		this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
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

			this.get("database").getAttachment(this.get("activeEntry").get("_id"), documentName, enyo.bind(this, function(err, response) {
				this.$.loadingPopup.hide();

				if (err)
				{
					alertify.error("Download Failed");
					console.log(err);
					return;
				}

				saveAs(response, documentName);
			}));
		}));
	},

	//Change This To Send Reminder, not cancel and redo individual documents?
	handleResendDocument: function(inSender, inEvent)
	{
		var name = inEvent.originator.name;
		var adobeAgreementId = this.getActiveEntryDocument(name).adobe.agreementId;

		this.$.loadingPopup.show("Sending Adobe Reminder...");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendtransferreminder",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				transferDatabase: quantum.preferences.get("transferDatabase"),
				transferId: this.get("activeEntry").get("_id"),
				agreementId: adobeAgreementId
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to send Adobe Reminder");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to send Adobe Reminder");
				console.log(response);
			}
			else
			{
				alertify.success("Adobe Reminder Resent");
			}
		}));

		request.go();
	},

	handleGetDocumentStatus: function(inSender, inEvent)
	{
		var adobeAgreementId = this.getActiveEntryDocument(inEvent.originator.name).adobe.agreementId;
		if (adobeAgreementId == null || adobeAgreementId === "")
		{
			alertify.error("Adobe Agreement ID not present.");
			return;
		}

		this.getAdobeDocumentStatus(adobeAgreementId, enyo.bind(this, function(agreementInfo) {
			this.$.documentStatusPopup.show(agreementInfo);
		}));
	},

	handleUpdateDocumentStatus: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.next_saveChangesPopup)
			{
				this.$.next_saveChangesPopup.hide();
				this.$.next_saveChangesPopup.destroy();
			}
			this.createComponent({name: "next_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "handlePopupHidden", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}else{
			var adobeAgreementId = this.getActiveEntryDocument(inEvent.originator.name).adobe.agreementId;
			if (adobeAgreementId == null || adobeAgreementId === "")
			{
				alertify.error("Adobe Agreement ID not present.");
				return;
			}

			this.updateAdobeDocumentStatus(adobeAgreementId);
		}
	},

	//Temporary Fix until such time as we can build the lawyer upload form.
	handleDocumentUpload: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Loading...");

		var file = inEvent.target.files && inEvent.target.files.length > 0 ? inEvent.target.files[0] : new Blob();

		var name = "";
		var signedDocumentName = "";

		if(inEvent.originator.name === "poaUploadDocumentInput")
		{
			name = "powerOfAttorney";
			signedDocumentName = "powerOfAttorney - Signed.pdf";
		}
		else if(inEvent.originator.name === "stfUploadDocumentInput")
		{
			name = "securitiesTransferForm";
			signedDocumentName = "securitiesTransferForm - Signed.pdf";
		}
		else if(inEvent.originator.name === "lgoUploadDocumentInput")
		{
			name = "legalOpinion";
			signedDocumentName = "legalOpinion - Signed.pdf";
		}
		else
		{
			return;
		}

		var aeDoc = this.get("activeEntry").get("transferDocuments")[name];
		aeDoc.signed = true;
		aeDoc.signedTimestamp = moment().valueOf();
		aeDoc.signedFileName = signedDocumentName;
		aeDoc.signedAttachmentID = signedDocumentName;

		var reader = new FileReader();
		reader.onerror = function(err) {
			console.log("ERROR!", err);
			alertify.error("Error Reading File");
			this.$.loadingPopup.hide();
		};

		reader.onloadend = enyo.bind(this, function(inEvent) {
			try
			{
				this.get("manualDocumentStore")[signedDocumentName] = {
					"content_type": "application/pdf",
					"data": new Blob([new Uint8Array(inEvent.target.result)], {type:file.type})
				};
				alertify.message("Document Ready To Be Uploaded<br />Save Changes To Complete Process");
			}
			catch (err) { reader.onerror(err); }
			finally
			{
				if(name === "powerOfAttorney")
				{
					this.$.poaUploadDocumentInput.get("eventNode").value = "";
				}
				else if(name === "securitiesTransferForm")
				{
					this.$.stfUploadDocumentInput.get("eventNode").value = "";
				}
				else if(name === "legalOpinion")
				{
					this.$.lgoUploadDocumentInput.get("eventNode").value = "";
				}
				this.$.loadingPopup.hide();
			}
		});

		reader.readAsArrayBuffer(file);
	},

	/************************
	* Web Service Functions *
	************************/

	cancelAdobeDocument: function(adobeAgreementId, callback)
	{
		this.$.loadingPopup.show("Cancelling Transfer Document(s)...");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "canceltransferdoc",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				transferDatabase: quantum.preferences.get("transferDatabase"),
				agreementId: adobeAgreementId
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to cancel transfer document");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to cancel transfer document");
				console.log(response);
			}
			else
			{
				if (typeof(callback) === 'function') { callback(response.result); }
			}
		}));

		request.go();
	},

	getAdobeDocumentStatus: function(adobeAgreementId, callback)
	{
		this.$.loadingPopup.show("Loading...");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "gettransferdocstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to get document status");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to get document status");
				console.log(response);
			}
			else
			{
				if (typeof(callback) === 'function') { callback(response.agreementInfo); }
			}
		}));

		request.go({
			transferDatabase: quantum.preferences.get("transferDatabase"),
			agreementId: adobeAgreementId
		});
	},

	updateAdobeDocumentStatus: function(adobeAgreementId, callback)
	{
		this.$.loadingPopup.show("Loading...");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "refreshtransferdocstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to update document status");
			console.log(request);
				if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to update document status");
				console.log(response);
			}
			else
			{
				if (typeof(callback) === 'function') { callback(response.agreementInfo); }
			}
		}));

		request.go({
			transferDatabase: quantum.preferences.get("transferDatabase"),
			agreementId: adobeAgreementId,
			transferId: this.get("activeEntry").get("_id")
		});
	},

	sendAdobeDocument: function(name, callback)
	{	
		//Adobe doesn't handle these docs
		if(name === "securitiesTransferForm" || name === "powerOfAttorney" || name === "legalOpinion")
		{
			if (typeof(callback) === 'function') { callback(); }
			return;
		}

		this.$.loadingPopup.show("Sending Transfer Document(s)...");
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "sendtransferdoc",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				transferDatabase: quantum.preferences.get("transferDatabase"),
				transferId: this.get("activeEntry").get("_id"),
				documentName: this.getActiveEntryDocument(name).unsignedFileName,
				documentType: name
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to send transfer document");
			console.log(response);
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to send transfer document");
				console.log(response);
				return;
			}
			else
			{
				this.getActiveEntryDocument(name).adobe.agreementId = response.agreementId;
				if (typeof(callback) === 'function') { callback(); }
			}
		}));

		request.go();
	},

	/**********************
	* Invoice Generation *
	**********************/

	handleRequestGenerateSellerInvoice: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.generateSellerInvoice_saveChangesPopup)
			{
				this.$.generateSellerInvoice_saveChangesPopup.hide();
				this.$.generateSellerInvoice_saveChangesPopup.destroy();
			}
			this.createComponent({name: "generateSellerInvoice_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onHide: "handlePopupHidden"} , {owner:this});
			this.$.generateSellerInvoice_saveChangesPopup.show("Must Save Changes Before Generating Invoice. Save changes?");
		}
		else { this.generateSellerInvoice(inSender, inEvent); }
	},

	generateSellerInvoice: function(inSender, inEvent)
	{
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generatetransferinvoice",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				type: "seller",
				transferDatabase: quantum.preferences.get("transferDatabase"),
				transferId: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to generate seller invoice");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to generate seller invoice");
				console.log(response);
				return;
			}
			else
			{
				alertify.success("Successfully generated seller invoice");
			}
		}));

		this.$.loadingPopup.show("Generating");
		request.go();
	},

	handleRequestGenerateBuyerInvoice: function(inSender, inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.generateBuyerInvoice_saveChangesPopup)
			{
				this.$.generateBuyerInvoice_saveChangesPopup.hide();
				this.$.generateBuyerInvoice_saveChangesPopup.destroy();
			}
			this.createComponent({name: "generateBuyerInvoice_saveChangesPopup", kind: "quantum.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onHide: "handlePopupHidden"} , {owner:this});
			this.$.generateBuyerInvoice_saveChangesPopup.show("Must Save Changes Before Generating Invoice. Save changes?");
		}
		else { this.generateBuyerInvoice(inSender, inEvent); }
	},

	generateBuyerInvoice: function(inSender, inEvent)
	{
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "generatetransferinvoice",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			},
			postBody: {
				type: "buyer",
				transferDatabase: quantum.preferences.get("transferDatabase"),
				transferId: this.get("activeEntry").get("_id")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to generate buyer invoice");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to generate buyer invoice");
				console.log(response);
				return;
			}
			else
			{
				alertify.success("Successfully generated buyer invoice");
			}
		}));

		this.$.loadingPopup.show("Generating");
		request.go();
	},

	handleRequestDownloadBuyerInvoice: function(inSender, inEvent)
	{
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "downloadtransferinvoice",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to download buyer invoice");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to download buyer invoice");
				console.log(response);
				return;
			}
			else
			{
				saveAs(quantum.b64ToBlob(response.fileData, "application/pdf"), response.fileName);
			}
		}));

		this.$.loadingPopup.show("Downloading");
		request.go({type: "buyer", transferDatabase: quantum.preferences.get("transferDatabase"), transferId: this.get("activeEntry").get("_id")});
	},

	handleRequestDownloadSellerInvoice: function(inSender, inEvent)
	{
		var request = new enyo.Ajax({
			url: quantum.preferences.get("apiServer") + "downloadtransferinvoice",
			cacheBust: false,
			contentType: "application/json",
			headers:{
				"Authorization": "Bearer " + quantum.preferences.get("username") + ":" + quantum.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to download seller invoice");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		request.response(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			if (response.error)
			{
				alertify.error("Failed to download seller invoice");
				console.log(response);
				return;
			}
			else
			{
				saveAs(quantum.b64ToBlob(response.fileData, "application/pdf"), response.fileName);
			}
		}));

		this.$.loadingPopup.show("Downloading");
		request.go({type: "seller", transferDatabase: quantum.preferences.get("transferDatabase"), transferId: this.get("activeEntry").get("_id")});
	},

	/**********************
	* Document Validation *
	**********************/

	validateFormPurchaseAndSaleAgreement: function()
	{
		this.clearBorderError();

		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valSa1 = this.validateStringField(this.$.sellerAddress1Input);
		var valBn = this.validateStringField(this.$.buyerNameInput);
		var valBa1 = this.validateStringField(this.$.buyerAddress1Input);

		var valSci = this.validateStringField(this.$.sellerCityInput);
		var valBci = this.validateStringField(this.$.buyerCityInput);

		var valSsn = this.validateStringFieldConditional(this.$.sellerSignatoryNameInput, this.$.sellerTransferTypePicker.selected, "individual");
		var valSst = this.validateStringFieldConditional(this.$.sellerSignatoryTitleInput, this.$.sellerTransferTypePicker.selected, "individual");
		var valBsn = this.validateStringFieldConditional(this.$.buyerSignatoryNameInput, this.$.buyerTransferTypePicker.selected, "individual");
		var valBst = this.validateStringFieldConditional(this.$.buyerSignatoryTitleInput, this.$.buyerTransferTypePicker.selected, "individual");

		var valCni = this.validateStringField(this.$.companyNameInput);
		var valNs = this.validateNumberField(this.$.numSharesInput);
		var valPp = this.validateStringField(this.$.purchasePriceInput);
		var valPps = this.validateStringField(this.$.pricePerShareInput);

		if (!valSn || !valSa1 || !valBn || !valBa1 || !valSci || !valBci || !valSsn || !valSst || !valBsn || !valBst || !valCni || !valNs || ! valPp || !valPps)
		{
			return false;
		}

		return true;
	},

	validateFormLetterOfInstruction: function()
	{
		this.clearBorderError();

		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valSa1 = this.validateStringField(this.$.sellerAddress1Input);
		var valBn = this.validateStringField(this.$.buyerNameInput);
		var valBa1 = this.validateStringField(this.$.buyerAddress1Input);

		var valSci = this.validateStringField(this.$.sellerCityInput);
		var valBci = this.validateStringField(this.$.buyerCityInput);

		var valCni = this.validateStringField(this.$.companyNameInput);
		var valNs = this.validateNumberField(this.$.numSharesInput);
		var valCn = this.validateStringField(this.$.certificateNumberInput);
		var valSn2 = this.validateStringFieldConditional(this.$.sellerSignatoryNameInput, this.$.sellerTransferTypePicker.selected, "individual");
		var valSt = this.validateStringFieldConditional(this.$.sellerSignatoryTitleInput, this.$.sellerTransferTypePicker.selected, "individual");

		if (!valSn || !valSa1 || !valBn || !valBa1 || !valSci || !valBci || !valCni || !valNs || ! valCn || !valSn2 || !valSt)
		{
			return false;
		}

		return true;
	},

	validateFormPowerOfAttorney: function()
	{
		this.clearBorderError();

		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valSa1 = this.validateStringField(this.$.sellerAddress1Input);
		var valPn = this.validatePickerSelected(this.$.poaRecipientPicker);
		var valNs = this.validateNumberField(this.$.numSharesInput);
		var valCni = this.validateStringField(this.$.companyNameInput);
		var valCn = this.validateStringField(this.$.certificateNumberInput);

		if (!valSn || !valSa1 || !valPn || !valNs || !valCni || !valCn)
		{
			return false;
		}

		return true;
	},

	validateFormShareTransferApproval: function()
	{
		this.clearBorderError();

		var valCni = this.validateStringField(this.$.companyNameInput);
		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valBn = this.validateStringField(this.$.buyerNameInput);
		var valNs = this.validateNumberField(this.$.numSharesInput);
		var valAn;
		if (this.getSelected(this.$.transferApprovalTypePicker) !== "company")
		{
			valAn = this.validatePickerSelected(this.$.approverPicker);
		}
		else
		{
			valAn = true;
		}

		if (!valCni || !valSn || !valBn || !valNs || !valAn)
		{
			return false;
		}

		return true;
	},

	validateFormGreenhillShareTransferApproval: function()
	{
		this.clearBorderError();

		var valCni = this.validateStringField(this.$.companyNameInput);
		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valBn = this.validateStringField(this.$.buyerNameInput);
		var valNs = this.validateNumberField(this.$.numSharesInput);
		var valAn;
		if (this.getSelected(this.$.transferApprovalTypePicker) !== "company")
		{
			valAn = this.validatePickerSelected(this.$.approverPicker);
		}
		else
		{
			valAn = true;
		}

		if (!valCni || !valSn || !valBn || !valNs || !valAn)
		{
			return false;
		}

		return true;
	},

	validateFormSecuritiesTransferForm: function()
	{
		this.clearBorderError();

		var valCni = this.validateStringField(this.$.companyNameInput);
		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valBn = this.validateStringField(this.$.buyerNameInput);
		var valNs = this.validateNumberField(this.$.numSharesInput);
		var valBa1 = this.validateStringField(this.$.buyerAddress1Input);
		var valBc = this.validateStringField(this.$.buyerCityInput);
		var valCs = this.validateStringField(this.$.classSharesInput);
		var valCn = this.validateStringField(this.$.certificateNumberInput);
		var valPps = this.validateStringField(this.$.pricePerShareInput);

		if (!valCni || !valSn || !valBn || !valNs || !valBa1 || !valBc || !valCs || !valCn || !valPps)
		{
			return false;
		}

		return true;
	},

	validateFormLegalOpinion: function()
	{
		this.clearBorderError();

		var valCni = this.validateStringField(this.$.companyNameInput);
		var valSn = this.validateStringField(this.$.sellerNameInput);
		var valBn = this.validateStringField(this.$.buyerNameInput);
		var valNs = this.validateNumberField(this.$.numSharesInput);

		if (!valCni || !valSn || !valBn || !valNs)
		{
			return false;
		}

		return true;
	},

	validatePickerSelected: function(picker) {
		try
		{
			var data = picker.get("selected").value;
			if (data == null || data === "") { throw null; }
		}
		catch (err) { 
			picker.parent.applyStyle("border", "2px solid red");
			return false;
		}

		return true;
	},

	validateStringField: function(stringInput)
	{
		if (stringInput.get("value") === "")
		{
			stringInput.parent.applyStyle("border", "2px solid red");
			return false;
		}
		else { return true; }
	},

	validateStringFieldConditional: function(stringInput, selectionInput, selectionValue)
	{
		if (selectionInput.get("value") === selectionValue) { return true; }
		else
		{
			if (stringInput.get("value") === "")
			{
				stringInput.parent.applyStyle("border", "2px solid red");
				return false;
			}
			else { return true; }
		}
	},

	validateNumberField: function(numberInput)
	{
		if (numberInput.get("value") === "" || isNaN(numberInput.get("value")))
		{
			numberInput.parent.applyStyle("border", "2px solid red");
			return false;
		}
		else { return true; }
	}
});