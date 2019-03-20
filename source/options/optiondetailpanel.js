enyo.kind({
	name: "lumberjack.OptionDetailPanel",
	kind: "enyo.Scroller",
	//fit: true,

	style: "padding: 15px; width: 100%;",

	published: {
		database: null,
		activeEntry: null,
		optionCollection: null,
		mode: "edit",
		dateIssued:null,
		expiryDate:null,
		vestingConditions:null,
		vestingHistory:null,
		exercise:null,
		documentsToUpload: null,
		paymentsReceived: null,
		agreementsToCancelQueue: null,
		agreementsToSendQueue: null
	},
	events: {
		onGoBack: "",
		onViewEventDetail: "",
		onLogout: ""
	},
	components: [
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
			{style: "font-size: 24px;", content: "Option Information"},
			{fit: true},
			{name: "editButtons", components: [
				{name: "saveChangesButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Save Changes", ontap: "handleSaveEntryButtonTapped"},
				{name: "previousEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Previous Entry", ontap: "handlePreviousEntryButtonTapped"},
				{name: "nextEntryButton", kind: "lumberjack.Button", style: "margin: 0 0 0 10px;", content: "Next Entry", ontap: "handleNextEntryButtonTapped"}
			]},
			{name: "addButtons", components: [
				{name: "cancelButton", kind: "lumberjack.Button", content: "Cancel", ontap: "handleCancelButtonTapped"},
				{name: "addEntryButton", kind: "lumberjack.Button", enabledClasses: "button primary", style: "margin-left: 10px;", content: "Add Entry", ontap: "handleSaveEntryButtonTapped"}
			]}
		]},
		{kind:"enyo.FittableColumns", style: "padding-top: 5px;", components:[
			{style: "width: 50%;", components: [
				{kind: "lumberjack.Input", name:"dateIssuedInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Option Issuance Date", required:true, ontap: "handleDateIssuedInputTapped", readonly:true},
				{name: "calendarPopup", kind: "lumberjack.CalendarPopup", onSelect: "calendarDateChanged"},
				{kind: "lumberjack.Input", name:"dateExpiresInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Expiration Date", required:true, ontap: "handleDateExpiresInputTapped", readonly:true},
				{name: "calendarPopup2", kind: "lumberjack.CalendarPopup", onSelect: "calendarDateChanged2"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Option Status", style: "line-height: 38px; width: 170px;"},
					{kind: "onyx.PickerDecorator", style: "margin-left: 10px; width: 350px;", components: [
						{name: "optionStatusPickerButton", style: "width: 100%;", disabled:"true"},
						{name: "optionStatusPicker", kind: "onyx.Picker", components: [
							{content: "Created", value: "created"},
							{content: "Active", value: "active"},
							{content: "Exhausted", value: "exhausted"},
							{content: "Expired", value: "expired"},
							{content: "Cancelled", value: "cancelled"}
						]}
					]}
				]},
				{name: "expiryEntryButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 10px 0 0 180px;", content: "Expire Entry", ontap: "handleExpireEntryButtonTapped"},
				{name: "deleteEntryButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 10px 0 0 10px;", content: "Revoke Entry", ontap: "handleDeleteEntryButtonTapped"},
				{kind: "lumberjack.Input", name:"numSharesMaxInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Total Number of Shares", required:true, inputMaxLength:10, disabled:true},
				{kind: "lumberjack.Input", name:"numSharesActiveInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Number of Active Shares", required:true, inputMaxLength:10, disabled:true},
				{kind: "lumberjack.Input", name:"totalPriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Total Option Value", required:true, inputMaxLength:10, disabled:true},
				{kind: "lumberjack.Input", name:"exercisedPriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Exercised Option Value", required:true, inputMaxLength:10, disabled:true},
				{kind: "lumberjack.Input", name:"exercisePriceInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Price per Share", onchange:"priceChange", required:true, inputMaxLength:10, onkeydown: "validateDecimalInput"},
				{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
					{content: "Exercise Currency", style: "line-height: 38px; width: 170px;"},
					{kind: "lumberjack.CurrencyPicker", name: "exerciseCurrencyPicker", style: "margin-left: 10px; width: 350px;"}
				]}
			]},
			{style: "margin-left: 1%; width: 49%;", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Option Holder Details"},
					{fit: true},
					{name: "viewHolderButton", kind: "lumberjack.Button", style: "height: 30px;", content: "View Holder", ontap: "handleViewHolder"},
					{name: "searchHolderButton", kind: "lumberjack.Button", style: "height: 30px;", content: "Search Holders", ontap: "handleSearchHolderButtonTapped"}
				]},
				{kind: "lumberjack.Input", name:"holderNameInput", columnStyle:"margin-top: 20px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", disabled:true, label:"Holder Name", required:true},
				{kind: "lumberjack.Input", name:"holderEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"email", disabled:true, label:"Holder Email Address", required:true},
				{kind: "lumberjack.Input", name:"holderPhoneInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"tel", disabled:true, label:"Holder Phone Number", required:true},
				{kind: "lumberjack.Input", name:"holderContactIDInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", showing: false, label:"Holder Contact ID", required:true},
				{name:"exerciseSection", components: [
						{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
						{style: "font-size: 24px;", content: "Exercise Options"},
						{fit: true}
					]},
					{name: "exerciseOptionsButton", kind: "lumberjack.Button", style: "height: 30px; margin-top:20px;", content: "Exercise Options", ontap: "handleExerciseOptionsButtonTapped"}
				]}
			]}
		]},
		{kind: "enyo.FittableColumns", style:"margin-top:10px;", components:[
			{style: "width: 50%; padding-right: 5px; min-width: 670px;", name:"vestingSection", components: [
				{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black;", components: [
					{style: "font-size: 24px;", content: "Vesting Conditions"},
					{fit: true},
					{name: "searchVestingButton", kind: "lumberjack.Button", style: "height: 30px;", content: "Add Vesting Condition", ontap: "handleSearchVestingButtonTapped"}
				]},
				{name:"vestingRepeaterHeaders", kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Vesting Type", style: "min-width: 100px;"},
					{content: "Date of Vest", style: "width: 140px;"},
					{content: "Condition of Vest", style: "width: 300px;"},
					{content: "Number of Shares", style: "width: 150px;"}
				]},
				{name:"vestingRepeater", kind:"enyo.Repeater", count:0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupVestingRepeaterItem", components: [
					{name: "vestCalendarPopup", kind: "lumberjack.CalendarPopup", onSelect: "vestingCalendarDateChanged"},
					{name: "vestingItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "vestingType", style: "width: 100px; line-height: 34px;"},
						{kind: "lumberjack.Input", name:"dateOfVest", columnStyle:"margin-top: 0px;", labelStyle:"line-height: 38px;", decoratorStyle: "margin-left: 0px; width: 130px; margin-right: 10px;", inputStyle: "width: 100%;", type:"text", ontap:"handleDateOfVestInputTapped", readonly:true},
						{name: "dateOfVestNonDate", style: "width: 140px; line-height: 34px;", content:"N/A"},
						{name: "vestingEventDescription", style: "width: 300px; line-height: 34px;"},
						{name: "numShares", kind:"lumberjack.Input", type:"text", required:true, style: "width: 174px; line-height: 34px;", onchange:"vestingSharesChange", onkeydown:"validateNumberInput"},
						{name: "deleteButton", kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin: 0 0 10px 10px; line-height: 30px; text-align:right;", content: "Delete", ontap: "deleteVestConditionButtonTapped"}
					]}
				]},
				{name:"vestingRepeaterReadOnlyHeaders", kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Vesting Type", style: "min-width: 100px;"},
					{content: "Date of Vest", style: "width: 140px;"},
					{content: "Condition of Vest", style: "width: 300px;"},
					{content: "Number of Shares", style: "width: 150px;"},
					{content: "Status"}
				]},
				{name:"vestingRepeaterReadOnly", kind:"enyo.Repeater", count:0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupVestingRepeaterItemReadOnly", components: [
					{name: "vestingItemReadOnly", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "vestingType", style: "width: 100px; line-height: 34px;"},
						{name: "dateOfVest", style: "width: 140px; line-height: 34px;"},
						{name: "vestingEventDescription", style: "width: 300px; line-height: 34px;"},
						{name: "numShares", style: "width: 150px; line-height: 34px;"},
						{name: "vestingStatus", style: "width: 90px; line-height: 34px; padding-right:15px;"},
						{name: "vestButton", kind: "lumberjack.Button", enabledClasses: "button bg-darkViolet fg-white", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Vest Shares", ontap: "vestConditionButtonTapped"}
					]}
				]},
				{name: "noVestingLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Vesting Conditions"}
			]},
			{style: "width: 50%; padding-left: 5px; min-width: 725px;", name: "vestingHistorySection", components: [
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Vesting History"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Type", style: "width: 200px;"},
					{content: "Amount", style: "width: 150px;"},
					{content: "Date", style: "width: 90px;"}
				]},
				{name: "vestingEventRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupVestingEventRepeaterItem", components: [
					{name: "eventItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "type", style: "width: 200px; line-height: 34px;"},
						{name: "amount", style: "width: 150px; line-height: 34px;"},
						{name: "dateReceived", style: "width: 90px; line-height: 34px;"}
					]}
				]},
				{name: "noEventsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Events Recorded"}
			]}
		]},
		{name: "optionIssuanceDocumentSection", components: [
			{style: "font-size: 18px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Issuance Document"},
			{style: "margin-top: 10px;", components: [
				{name: "issuanceDocStatusIcon", kind: "enyo.Image", style: "margin-left: 5px; height: 32px; width: 32px;"},
				{name: "issuanceDocStatusDescription", style: "margin-left: 10px; display: inline-block;"}
			]},
			{name: "issuanceDocGeneratedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Issuance Document Generated", style: "line-height: 30px; width: 350px;"},
				{name: "issuanceDocGeneratedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "issuanceDocSentForSignatureTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Issuance Document Sent for Signature", style: "line-height: 30px; width: 350px;"},
				{name: "issuanceDocSentForSignatureTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{name: "issuanceDocSignedTimestampSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
				{content: "Issuance Document Agreement Signed", style: "line-height: 30px; width: 350px;"},
				{name: "issuanceDocSignedTimestampLabel", style: "line-height: 30px; margin-left: 10px;"}
			]},
			{style: "margin-top: 10px;", components: [
				{name: "generateDocumentButton", kind: "lumberjack.Button", content: "Generate Issuance Document", ontap: "handleGenerateDocumentButtonTapped"},
				{name: "downloadUnsignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Unsigned Document", ontap: "handleDownloadUnsignedDocumentTapped"},
				{name: "sendForSignatureButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Send for Signature", ontap: "handleSendForSignatureButtonTapped"},
				{name: "viewDocumentStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Document Status", ontap: "handleViewDocumentStatusButtonTapped"},
				{name: "refreshDocumentStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Refresh Document Status", ontap: "handleRefreshDocumentStatusButtonTapped"},
				{name: "viewSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"},
				{name: "downloadSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Download Signed Document", ontap: "handleDownloadSignedDocumentButtonTapped"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{kind: "lumberjack.SupportingDocuments", name: "supportingDocuments", module: "option", style: "width: 50%", onAddDocument: "handleAddDocument", attachmentIndexKey: "attachmentID"},
			{name:"paymentSectionWrapper", style: "width: 50%", components: [
				{kind: "lumberjack.PaymentSection", name: "paymentSection", module: "option", style: "width: 100%", onAddPayment: "handleAddPayment", onAddRefund: "handleAddPayment", attachmentIndexKey: "attachmentID"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "margin-top: 25px;", components: [
			{style: "width: 100%; padding-left: 5px; min-width: 725px;", name: "exerciseLogSection", components: [
				{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Exercise History"},
				{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
					{content: "Status", style: "width: 200px;"},
					{content: "Number of Shares", style: "width: 150px;"},
					{content: "Date", style: "width: 90px;"},
					{style: "width:120px;"}
				]},
				{name: "exerciseRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupExerciseRepeaterItem", components: [
					{name: "exerciseItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
						{name: "exerciseStatus", style: "width: 200px; line-height: 34px;"},
						{name: "exerciseNumShares", style: "width: 150px; line-height: 34px;"},
						{name: "exerciseDate", style: "width: 90px; line-height: 34px;"},
						{name: "exerciseDownloadUnsignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "Download Unsigned Document", ontap: "handleExerciseDownloadUnsignedDocumentTapped"},
						{name: "exerciseSendForSignatureButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "Send for Signature", ontap: "handleExerciseSendForSignatureButtonTapped"},
						{name: "exerciseViewDocumentStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "View Status", ontap: "handleExerciseViewDocumentStatusButtonTapped"},
						{name: "exerciseRefreshDocumentStatusButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "Refresh Status", ontap: "handleExerciseRefreshDocumentStatusButtonTapped"},
						{name: "exerciseViewSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "View Signed Document", ontap: "handleExerciseDownloadSignedDocumentButtonTapped"},
						{name: "exerciseDownloadSignedDocumentButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "Download Signed Document", ontap: "handleExerciseDownloadSignedDocumentButtonTapped"},
						{name: "cancelExerciseButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "Cancel", ontap: "handleCancelExerciseButtonTapped"},
						{name: "treasuryButton", kind: "lumberjack.Button", style: "margin-left: 10px; height:24px;", content: "Treasury Order", ontap: "handleTreasuryOrderButtonTapped"}
					]}
				]},
				{name: "noExerciseLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Exercises Recorded"}
			]}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"},
		{name: "documentStatusPopup", kind: "lumberjack.ViewAdobeSignDocumentStatusPopup"}
	],
	bindings: [
		{from: ".dateIssued", to: ".$.dateIssuedInput.value", transform: function(v) {
			try
			{
				if (v != null){
					var val = moment(v);
					if(val.isValid()){return val.format("YYYY/MM/DD");}
					else { throw null; }
				}
				else { throw null; }
			}
			catch (err) { return moment().format("YYYY/MM/DD"); }
		}},
		{from: ".expiryDate", to: ".$.dateExpiresInput.value", transform: function(v) {
			try
			{
				if (v != null){
					var val = moment(v);
					if(val.isValid()){return val.format("YYYY/MM/DD");}
					else { throw null; }
				}
				else { throw null; }
			}
			catch (err) { return moment().format("YYYY/MM/DD"); }
		}},
		{from: ".mode", to: ".$.editButtons.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.expiryEntryButton.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.deleteEntryButton.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.vestingHistorySection.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.exerciseSection.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.optionIssuanceDocumentSection.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.paymentSectionWrapper.showing", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.exercisePriceInput.disabled", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.dateIssuedInput.disabled", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.dateExpiresInput.disabled", transform: function(v) { return v === "edit"; }},
		{from: ".mode", to: ".$.dateIssuedInput.ontap", transform: function(v) {
			if(v === "edit"){
				return "";
			}else{
				return "handleDateIssuedInputTapped";
			}
		}},
		{from: ".mode", to: ".$.dateExpiresInput.ontap", transform: function(v) {
			if(v === "edit"){
				return "";
			}else{
				return "handleDateExpiresInputTapped";
			}
		}},
		{from: ".mode", to: ".$.addButtons.showing", transform: function(v) { return v === "add"; }},
		{from: ".mode", to: ".$.searchVestingButton.showing", transform: function(v) { return v === "add"; }},
		{from: ".mode", to: ".$.searchHolderButton.showing", transform: function(v) { return v === "add"; }},
		{from: ".mode", to: ".$.viewHolderButton.showing", transform: function(v) { return v === "edit"; }},
		{from: ".activeEntry", to:".ae", transform: function(v){if(v){return new lumberjack.OptionModel(v.raw());} else {return null;}}},
		{from: ".ae.status", to: ".$.optionStatusPicker.selected", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var control = this.$.optionStatusPicker.controls.find(function(element, index, array) { return element.value === val; });
					if (control != null) { return control; }
					else
					{
						console.log('Option Status "' + val + '" not found in picker!');
						throw null;
					}
				}
				else { throw null; }
			}
			catch (err)
			{
				this.$.optionStatusPickerButton.set("content", "No Selection");
				return null;
			}
		}},
		{from: ".ae.exercisePrice", to: ".$.exercisePriceInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "0";
			}
		}},
		{from: ".ae.purchasePriceTotal", to: ".$.totalPriceInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "0";
			}
		}},
		{from: ".ae.purchasePriceExercised", to: ".$.exercisedPriceInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "0";
			}
		}},
		{from: ".ae", to: ".$.paymentSection.paymentsReceived", transform: function(v) {
			try
			{
				var data = v.get("paymentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: "ae.purchasePriceTotal", to: ".$.paymentSection.purchaseTotal"},
		{from: ".database", to: ".$.paymentSection.database"},
		{from: ".ae", to: ".$.paymentSection.activeEntry"},
		{from: ".activeEntry.exerciseCurrency", to: ".$.exerciseCurrencyPicker.selected", transform: function(v) {
			try
			{
				if (v != null && v !== "")
				{
					return v;
				}
				else { throw null; }
			}
			catch (err) { return "USD"; }
		}},
		{from: ".ae.numSharesMax", to: ".$.numSharesMaxInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "0";
			}
		}},
		{from: ".ae.numSharesActive", to: ".$.numSharesActiveInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "0";
			}
		}},
		{from: ".ae.numSharesActive", to: ".$.exerciseOptionsButton.disabled", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					var count = lumberjack.parseInt(val);

					if(count > 0){
						return false;
					}
				}

				return true;
			}
			catch (err)
			{
				return true;
			}
		}},
		{from: ".ae.dateIssued", to: ".dateIssued", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return moment();
			}
		}},
		{from: ".ae.expiryDate", to: ".expiryDate", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return moment();
			}
		}},
		{from: ".ae.holderContactID", to: ".$.holderContactIDInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".ae.holderDisplayName", to: ".$.holderNameInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".ae.holderEmail", to: ".$.holderEmailInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".ae.holderPhone", to: ".$.holderPhoneInput.value", transform: function(val) {
			try
			{
				if (val != null && val !== "")
				{
					return val;
				}
				else { throw null; }
			}
			catch (err)
			{
				return "";
			}
		}},
		{from: ".ae", to: ".vestingConditions", transform: function(val) {
			try
			{
				var data = val.get("vesting");
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".ae", to: ".vestingHistory", transform: function(val) {
			try
			{
				var data = val.get("history");
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return new lumberjack.OptionEventCollection(); }
		}},
		{from: ".ae", to: ".exercise", transform: function(val) {
			try
			{
				var data = val.get("exercise");
				if (data != null) { return data; }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".ae", to: ".$.supportingDocuments.documentsReceived", transform: function(v) {
			try
			{
				var data = v.get("documentsReceived");
				if (data != null && Array.isArray(data)) { return JSON.parse(JSON.stringify(data)); }
				else { throw null; }
			}
			catch (err) { return []; }
		}},
		{from: ".ae", to: ".documentsToUpload", transform: function(v) {
			// Use the binding to force the "documentsToUpload" queue to reset when the "activeEntry" changes.
			return {};
		}},
		{from: ".database", to: ".$.supportingDocuments.database"},
		{from: ".ae", to: ".$.supportingDocuments.activeEntry"},
		{from: ".ae.issuanceDoc", to:".issuanceDocStatus", transform: function(v){
			if(v.signed){
				return "signed";
			}else if(v.sent){
				return "sent";
			}else if(v.generated){
				return "generated";
			}else{
				return "none";
			}
		}},
		{from: ".issuanceDocStatus", to: ".$.issuanceDocStatusIcon.src", transform: function(v) {
			switch (v)
			{
				case "signed":
				case "SIGNED":
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
		{from: ".issuanceDocStatus", to: ".$.issuanceDocStatusDescription.content", transform: function(v) {
			switch (v)
			{
				case "signed":
				case "SIGNED":
					return "Issuance Document Signed";
				case "sent":
					return "Issuance Document Sent";
				case "generated":
					return "Issuance Document Generated";
				case "none":
					return "No Issuance Document Present";
				default:
					return "Status Unknown";
			}
		}},
		{from: ".ae.status", to:".$.exerciseOptionsButton.disabled", transform: function(v) { return v !== "active";}},
		{from: ".ae.status", to:".$.expiryEntryButton.disabled", transform: function(v) { return v === "expired";}},
		{from: ".ae.status", to:".$.deleteEntryButton.disabled", transform: function(v) { return v === "expired";}},
		{from: ".ae.issuanceDoc.generated", to: ".issuanceDocGenerated"},
		{from: ".issuanceDocGenerated", to: ".$.generateDocumentButton.disabled", transform: function(v) { return v; }},
		{from: ".issuanceDocGenerated", to: ".$.downloadUnsignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".ae.issuanceDoc.sent", to: ".issuanceDocSent"},
		{from: ".issuanceDocStatus", to: ".$.sendForSignatureButton.disabled", transform: function(v) { return v !== "generated"; }},
		{from: ".issuanceDocStatus", to: ".$.viewDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed" || v === "SIGNED"); }},
		{from: ".issuanceDocStatus", to: ".$.refreshDocumentStatusButton.disabled", transform: function(v) { return !(v === "sent" || v === "signed"|| v === "SIGNED"); }},
		{from: ".ae.issuanceDoc.signed", to: ".issuanceDocSigned"},
		{from: ".issuanceDocSigned", to: ".$.downloadSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".issuanceDocSigned", to: ".$.viewSignedDocumentButton.disabled", transform: function(v) { return !v; }},
		{from: ".ae", to: ".issuanceDocToUpload", transform: function(v) {
			//Use the binding to force the "subscription agreement to upload" object to reset when the activeEntry changes.
			return null;
		}},
		{from: ".ae", to: ".issuanceDocGeneratedTimestamp", transform: function(v) {
			//Use the binding to force the "subscription agreement generated timestamp" object to reset when the activeEntry changes.
			return null;
		}},
		{from: ".issuanceDocStatus", to: ".$.issuanceDocGeneratedTimestampSection.showing", transform: function(v) { return v === "generated" || v === "sent" || v === "signed"; }},
		{from: ".ae.issuanceDoc.generatedTimestamp", to: ".$.issuanceDocGeneratedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".issuanceDocStatus", to: ".$.issuanceDocSentForSignatureTimestampSection.showing", transform: function(v) { return v === "sent" || v === "signed"; }},
		{from: ".ae.issuanceDoc.sentTimestamp", to: ".$.issuanceDocSentForSignatureTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".issuanceDocStatus", to: ".$.issuanceDocSignedTimestampSection.showing", transform: function(v) { return v === "signed"; }},
		{from: ".ae.issuanceDoc.signedTimestamp", to: ".$.issuanceDocSignedTimestampLabel.content", transform: function(v) {
			try
			{
				var data = moment.tz(v, "Canada/Pacific");
				if (data.isValid()) { return data.format("MMMM Do YYYY, h:mm:ss a"); }
				else { throw null; }
			}
			catch (err) { return ""; }
		}},
		{from: ".activeEntry", to: ".$.previousEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("optionCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === 0; }
				else { throw null; }
			}
			catch (err) { return true; }
		}},
		{from: ".activeEntry", to: ".$.nextEntryButton.disabled", transform: function(v) {
			try
			{
				var data = this.get("optionCollection");
				if (data != null && data instanceof enyo.Collection) { return data.indexOf(v) === -1 || data.indexOf(v) === data.length - 1; }
				else { throw null; }
			}
			catch (err) { return true; }
		}}
	],
	//Setup
	activate: function(activeEntry)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "option")) { this.doGoHome(); return; }

		this.clearBorderError();

		this.$.holderNameInput.set("value", "");
		this.$.holderEmailInput.set("value", "");
		this.$.holderPhoneInput.set("value", "");
		// The "activeEntry" must be set BOTH to null AND to a new model in order to ensure that all binding are actually refreshed.
		this.set("activeEntry", null);
		this.set("activeEntry", this.initEntryAttributes(new lumberjack.OptionModel({})));
		if (activeEntry != null) {
			this.initEntryAttributes(activeEntry);
			this.set("activeEntry", activeEntry);
		}

		this.setShowingForRoles();
		this.setDisabledForRoles();

		this.refreshRepeaters();
	},

	setShowingForRoles: function()
	{
		var showing = this.canEdit();

		this.$.paymentSection.set("showing", showing);

		var controls = [];
		controls.forEach(function(currentValue) {
			currentValue.set("showing", showing);
		});

		if(this.mode === "edit" && this.get("activeEntry").get("status") !== "exhausted" && this.get("activeEntry").get("status") !== "expired" && this.get("activeEntry").get("status") !== "cancelled"){
			this.$.paymentSection.disableForFunds();
		}else if(this.mode === "edit"){
			this.$.paymentSection.setAddDisabled(true);
			this.$.paymentSection.setRefundDisabled(true);
			this.$.generateDocumentButton.set("disabled", true);
			this.$.sendForSignatureButton.set("disabled", true);
			this.$.refreshDocumentStatusButton.set("disabled", true);
		}
	},

	setDisabledForRoles: function()
	{
		var disabled = !(this.canEdit() && this.get("mode") === "add");

		this.$.exerciseCurrencyPicker.set("disabled", disabled);
	},

	canEdit: function()
	{
		return lumberjack.hasRole(["admins","users"], "option");
	},

	initEntryAttributes: function(entry)
	{
		if (!entry) { return; }

		if (entry.get("exercisePrice") === undefined) { entry.set("exercisePrice", ""); }
		if (entry.get("exerciseCurrency") === undefined) { entry.set("exerciseCurrency", "USD"); }
		if (entry.get("expiryDate") === undefined) { entry.set("expiryDate", new moment().format()); }
		if (entry.get("numSharesMax") === undefined) { entry.set("numSharesMax", ""); }
		if (entry.get("numSharesActive") === undefined) { entry.set("numSharesActive", ""); }
		if (entry.get("numSharesExercised") === undefined) { entry.set("numSharesExercised", ""); }
		if (entry.get("dateIssued") === undefined) { entry.set("dateIssued", new moment().format()); }
		if (entry.get("holderContactID") === undefined) { entry.set("holderContactID", ""); }
		if (!entry.get("status") || entry.get("status") === "") { entry.set("status", "created"); }
	},

	//Repeaters
	refreshRepeaters: function()
	{
		this.$.noVestingLabel.set("showing", this.get("vestingConditions").length === 0);
		if(this.get("mode") === "edit"){
			this.$.vestingRepeater.set("showing", false);
			this.$.vestingRepeaterHeaders.set("showing", false);
			this.$.vestingRepeaterReadOnly.set("showing", this.get("vestingConditions").length > 0);
			this.$.vestingRepeaterReadOnlyHeaders.set("showing", this.get("vestingConditions").length > 0);
			this.$.vestingRepeaterReadOnly.setCount(this.get("vestingConditions").length);

			this.$.exerciseLogSection.set("showing", true);
			this.$.exerciseRepeater.set("showing", this.get("exercise").length > 0);
			this.$.exerciseRepeater.setCount(this.get("exercise").length);
			this.$.noExerciseLabel.set("showing", this.get("exercise").length === 0);
		}else{ //add
			this.$.vestingRepeaterReadOnly.set("showing", false);
			this.$.vestingRepeaterReadOnlyHeaders.set("showing", false);
			this.$.vestingRepeater.set("showing", this.get("vestingConditions").length > 0);
			this.$.vestingRepeater.setCount(this.get("vestingConditions").length);

			this.$.exerciseLogSection.set("showing", false);
		}

		this.$.noEventsLabel.set("showing", this.get("vestingHistory").length === 0);
		this.$.vestingEventRepeater.set("showing", this.get("vestingHistory").length > 0);
		this.$.vestingEventRepeater.setCount(this.get("vestingHistory").length);

		this.$.supportingDocuments.refreshRepeater();
		this.$.paymentSection.refreshRepeater();
	},

	setupVestingRepeaterItem:function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.vestingItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		if(this.get("vestingConditions").at(inEvent.index).get("type") === "date"){
			inEvent.item.$.dateOfVest.set("showing", true);
			inEvent.item.$.dateOfVestNonDate.set("showing", false);
			var dateVal = moment(this.get("vestingConditions").at(inEvent.index).get("dateOfVest")).format("YYYY/MM/DD");
			if(dateVal !== "Invalid date"){
				inEvent.item.$.dateOfVest.set("value", dateVal);
			}else{
				inEvent.item.$.dateOfVest.set("value", "");
			}
		}else{
			inEvent.item.$.dateOfVest.set("showing", false);
			inEvent.item.$.dateOfVestNonDate.set("showing", true);
		}
		inEvent.item.$.vestingType.set("content", this.jsUcfirst(this.get("vestingConditions").at(inEvent.index).get("type")));

		inEvent.item.$.vestingEventDescription.set("content", this.get("vestingConditions").at(inEvent.index).get("vestingEventDescription"));
		inEvent.item.$.numShares.set("value", this.get("vestingConditions").at(inEvent.index).get("numShares"));
		inEvent.item.$.deleteButton.set("showing", this.canEdit());

		return true;
	},

	setupVestingRepeaterItemReadOnly:function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.vestingItemReadOnly.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		var type = this.jsUcfirst(this.get("vestingConditions").at(inEvent.index).get("type"));
		var vestDisabled = false;
		if(type === "Date")
		{
			var date = moment(this.get("vestingConditions").at(inEvent.index).get("dateOfVest"));
			inEvent.item.$.dateOfVest.set("content", date.format("YYYY/MM/DD"));
			if(this.get("vestingConditions").at(inEvent.index).get("vested") || date > moment())
			{
				vestDisabled = true;
			}
		}else{
			inEvent.item.$.dateOfVest.set("content", "N/A");
			if(this.get("vestingConditions").at(inEvent.index).get("vested"))
			{
				vestDisabled = true;
			}
		}

		inEvent.item.$.vestingType.set("content", type);
		inEvent.item.$.vestingEventDescription.set("content", this.get("vestingConditions").at(inEvent.index).get("vestingEventDescription"));
		inEvent.item.$.numShares.set("content", this.get("vestingConditions").at(inEvent.index).get("numShares"));
		inEvent.item.$.vestingStatus.set("content", this.get("vestingConditions").at(inEvent.index).get("vested") ? "Vested" : "Not Vested");
		inEvent.item.$.vestButton.set("showing", this.get("mode") === 'edit');
		inEvent.item.$.vestButton.set("disabled", vestDisabled);

		return true;
	},

	setupVestingEventRepeaterItem:function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.eventItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.amount.set("content", this.get("vestingHistory").at(inEvent.index).get("numShares"));
		inEvent.item.$.dateReceived.set("content", moment(this.get("vestingHistory").at(inEvent.index).get("date")).format("YYYY/MM/DD"));

		var type = this.get("vestingHistory").at(inEvent.index).get("type");
		var typeText = "";

		switch(type)
		{
			case "vestByEvent":
				typeText = "Vesting Event - Triggered";
				break;
			case "vestByDate":
				typeText = "Vesting Event - Date";
				break;
			case "exercise":
				typeText = "Exercise Event";
				break;
			case "expire":
				typeText = "Option Expiration";
				break;
			case "cancel":
				typeText = "Option Cancelled";
				break;
			case "create":
				typeText = "Created";
				break;
			default:
				typeText = "Undefined Event";
				break;
		}

		inEvent.item.$.type.set("content", typeText);

		return true;
	},

	//Vest
	vestConditionButtonTapped:function(inSender, inEvent)
	{
		var conds = this.get("vestingConditions");
		var vestCondition = this.get("vestingConditions").at(inEvent.index);

		if(!vestCondition.get("vested"))
		{
			if(vestCondition.get("type") === "date"){
				var vestDate = moment(vestCondition.get("dateOfVest"));
				if(moment().isBefore(vestDate, 'day')){
					alertify.error("Not yet Date of Vest.");
					return;
				}
			}

			try{
				var active = lumberjack.parseInt(this.$.numSharesActiveInput.get("value")) + lumberjack.parseInt(vestCondition.get("numShares"));
				this.$.numSharesActiveInput.set("value", active);
				vestCondition.set("vested", true);

				this.refreshRepeaters();
				var history = {
					"type" : "vestByEvent",
					"numShares": vestCondition.get("numShares")
				};
				this.addHistoryRecord(history);
				this.refreshRepeaters();
			}catch(err){
				console.log(err);
			}
		}
	},

	deleteVestConditionButtonTapped:function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.confirmDeleteVestingConditionPopup)
		{
			this.$.confirmDeleteVestingConditionPopup.hide();
			this.$.confirmDeleteVestingConditionPopup.destroy();
		}
		this.createComponent({name: "confirmDeleteVestingConditionPopup", kind: "lumberjack.ConfirmPopup", onYesWithReturnValue: "deleteVestCondition", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeleteVestingConditionPopup.show("Delete Vesting Condition? You must save entry to make this permament.", inEvent.index);
	},

	deleteVestCondition:function(inSender, inEvent)
	{
		if(this.get("vestingConditions").at(inEvent.returnValue))
		{
			this.get("vestingConditions").remove(this.get("vestingConditions").at(inEvent.returnValue));

			this.refreshRepeaters();
		}
	},

	vestingDateChange:function (inSender, inEvent)
	{
		var vestDate = moment(inEvent.target.value, "YYYY/MM/DD");
		this.get("vestingConditions").at(inEvent.index).set("dateOfVest", vestDate);
	},

	vestingSharesChange:function(inSender, inEvent)
	{
		var conds = this.get("vestingConditions");
		if(!inEvent.target.value){
			conds.at(inEvent.index).set("numShares", 0);
		}else{
			var numSharesIn = lumberjack.parseInt(inEvent.target.value);
			conds.at(inEvent.index).set("numShares", numSharesIn);
			inEvent.target.value = numSharesIn;
		}

		var total = 0;
		var active = 0;

		var totalPrice = 0;
		var price = lumberjack.parseFloat(this.$.exercisePriceInput.get("value"));

		for(var i = 0; i < conds.length; i++){
			total += lumberjack.parseInt(conds.at(i).get("numShares"));
			if(conds.at(i).get("type") === "immediate"){
				active += lumberjack.parseInt(conds.at(i).get("numShares"));
			}
		}

		totalPrice = total * price;

		this.$.numSharesMaxInput.set("value", total);
		this.$.numSharesActiveInput.set("value", active);
		this.$.totalPriceInput.set("value", totalPrice);
	},

	priceChange:function(inSender, inEvent)
	{
		var price = lumberjack.parseFloat(inEvent.target.value).toFixed(2);

		var total = this.$.numSharesMaxInput.get("value");

		totalPrice = total * price;
		this.$.totalPriceInput.set("value", totalPrice);
		this.$.exercisePriceInput.set("value", price);
	},

	//Validation
	clearBorderError: function()
	{
		this.$.optionStatusPicker.parent.applyStyle("border", null);

		for (var key in this.$)
		{
			if(this.$[key].kind === "lumberjack.Input")
			{
				this.$[key].clearBorderError();
			}
			else if (this.$[key].kind === "lumberjack.CurrencyPicker")
			{
				this.$[key].applyStyle("border", null);
			}
		}
	},

	validateInputs:function(options)
	{
		this.clearBorderError();

		var borderError = "2px solid red";
		var isValid = true;

		//Dates
		var expireInputValue = moment(this.$.dateExpiresInput.get("value"), "YYYY/MM/DD");
		var issueInputValue = moment(this.$.dateIssuedInput.get("value"), "YYYY/MM/DD");
		if(expireInputValue === "Invalid date")
		{
			isValid = false;
			this.$.dateExpiresInput.setBorderError();
		}

		if(issueInputValue === "Invalid date")
		{
			isValid = false;
			this.$.dateIssuedInput.setBorderError();
		}

		if(expireInputValue <= issueInputValue)
		{
			isValid = false;
			this.$.dateIssuedInput.setBorderError();
			alertify.error("Issuance date must be before expiration.");
		}

		if(options)
		{
			if(expireInputValue <= moment() && options.expire !== true)
			{
				isValid = false;
				this.$.dateExpiresInput.setBorderError();
				alertify.error("Expiration must be after today.")
			}
		}
		else
		{
			if(expireInputValue <= moment())
			{
				isValid = false;
				this.$.dateExpiresInput.setBorderError();
				alertify.error("Expiration must be after today.")
			}
		}

		//Status
		if (this.$.optionStatusPicker.get("selected") == null || this.$.optionStatusPicker.get("selected").value === "")
		{
			isValid = false;
			this.$.optionStatusPicker.parent.applyStyle("border", borderError);
		}

		//Main inputs
		if(!this.$.numSharesMaxInput.validate()){isValid = false;}
		if(!this.$.exercisePriceInput.validate()){isValid = false;}
		var priceRaw = this.$.exercisePriceInput.get("value");
		var price = lumberjack.parseFloat(priceRaw);
		if (price <= 0)
		{
			isValid = false;
			alertify.error("Please enter a non-negative price per share.");
			this.$.exercisePriceInput.setBorderError();
		}

		var flagAsInvalid = function(control, doNotUseParent) {
			isValid = false;
			if (control.kind === "lumberjack.Input")
			{
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

		var validate_selected = function(control, isCustom) {
			try
			{
				var data = control.get("selected").value;
				if (data == null || data === "") { throw null; }
			}
			catch (err) { flagAsInvalid(control, isCustom); }
		};

		// Exercise Currency:
		validate_selected(this.$.exerciseCurrencyPicker, true);

		if(!this.$.holderContactIDInput.validate() || !this.$.holderNameInput.validate() || !this.$.holderEmailInput.validate() || !this.$.holderPhoneInput.validate())
		{
			isValid = false;
			alertify.error("Please select a contact to be the Option holder.");
		}

		if(!this.validateVestingConditions()){isValid = false;}

		//Conditions

		//Documents

		return isValid;
	},

	validateVestingConditions:function()
	{
		var conds = this.get("vestingConditions");

		var expireInputValue = moment(this.$.dateExpiresInput.get("value"), "YYYY/MM/DD");
		var issueInputValue = moment(this.$.dateIssuedInput.get("value"), "YYYY/MM/DD");

		var isValid = true;
		if(this.get("mode") === "add"){
			if(conds.length <= 0){
				alertify.error("Please set at least one vesting condition.");
				return false;
			}

			for(var j = 0; j < conds.length; j++){
				this.$.vestingRepeater.children[j].$.numShares.clearBorderError();
				this.$.vestingRepeater.children[j].$.dateOfVest.clearBorderError();
			}

			for(var i = 0; i < conds.length; i++){
				if(!conds.at(i).get("numShares") || lumberjack.parseInt(conds.at(i).get("numShares")) <= 0){
					isValid = false;
					this.$.vestingRepeater.children[i].$.numShares.setBorderError();
				}

				if(conds.at(i).get("type") === "date"){
					if(!conds.at(i).get("dateOfVest")){
						isValid = false;
						this.$.vestingRepeater.children[i].$.dateOfVest.setBorderError();
					}else{
						var doV = moment(conds.at(i).get("dateOfVest"));
						if(doV === "Invalid Date" || doV < issueInputValue || doV > expireInputValue){
							isValid = false;
							this.$.vestingRepeater.children[i].$.dateOfVest.setBorderError();
							alertify.error("Date based Vesting must be between the Issuance and Expiry dates.");
						}
					}
				}
			}
		}

		return isValid;
	},

	handleSaveEntryButtonTapped:function(inSender, inEvent, options)
	{
		if (!this.canEdit()) { return; }

		if (!this.validateInputs(options)) { return; }

		this.$.loadingPopup.show("Saving...");

		var ae = this.get("ae").raw();
		ae.status = this.$.optionStatusPicker.get("selected").value;

		if (this.get("mode") === "add"){
			ae.exercisePrice = this.$.exercisePriceInput.get("value");
			ae.exerciseCurrency = this.getSelected(this.$.exerciseCurrencyPicker);
			ae.expiryDate = this.get("expiryDate");
			ae.dateIssued = this.get("dateIssued");
			ae.numSharesMax = this.$.numSharesMaxInput.get("value");
			ae.numSharesActive = this.$.numSharesActiveInput.get("value");
			ae.numSharesExercised = 0;
			ae.holderContactID = this.$.holderContactIDInput.get("value");

			var exPrice = lumberjack.parseFloat(ae.exercisePrice);
			totalPrice = exPrice * ae.numSharesMax;
			ae.purchasePriceTotal = totalPrice;

			if (ae._attachments == null) { ae._attachments= {}; }
			var attachments = ae._attachments;

			//Delete Documents and Document Attachments we've set to be deleted
			for(var i = 0; i < this.$.supportingDocuments.get("documentsToDelete").length; i++)
			{
				delete ae._attachments[this.$.supportingDocuments.documentsToDelete[i]];
				//Edit the activeEntry documentsReceived to match our delete
				var itemToFind = this.$.supportingDocuments.get("documentsToDelete")[i];
				var result = ae.documentsReceived.find(function(value, index, array) {
					return value.name === itemToFind;
				});
				if (result)
				{
					ae.documentsReceived.splice(ae.documentsReceived.indexOf(result), 1);
				}
			}

			var history = {
				"type" : "create",
				"numShares": ae.numSharesMax
			};
			this.addHistoryRecord(history);
		}else{
			ae.numSharesActive = this.$.numSharesActiveInput.get("value");
		}

		var vestingConditions = this.get("vestingConditions");
		ae.vesting = vestingConditions.raw();

		var vestHistory = this.get("vestingHistory");
		ae.history = vestHistory.raw();

		// Make sure that "_attachments", "documentsReceived", and "paymentsReceived" are initialized.
		if (!Array.isArray(ae.documentsReceived)) { ae.documentsReceived = []; }
		if (!Array.isArray(ae.paymentsReceived)) { ae.paymentsReceived = []; }
		if (ae._attachments == null) { ae._attachments= {}; }

		// Prepare documents and attachments that are queued to be deleted.
		this.$.supportingDocuments.get("documentsToDelete").forEach(function(currentValue, index, array) {
			// Update the "documentsReceived".
			var index = ae.documentsReceived.findIndex(function(element, index, array) { return element.attachmentID === currentValue; });
			if (index !== -1) { ae.documentsReceived.splice(index, 1); }
			// Update the "_attachments".
			delete ae._attachments[currentValue];
		});
		this.$.supportingDocuments.set("documentsToDelete", []);

		// Prepare documents and attachments that are queued to be uploaded.
		this.$.supportingDocuments.get("documentsToUpload").forEach(function(currentValue, index, array) {
			// Update the "documentsReceived".
			var value = Object.assign({}, currentValue);
			delete value.fileData;
			ae.documentsReceived.push(value);
			// Update the "_attachments".
			ae._attachments[currentValue.attachmentID] = {
				"content_type": currentValue.fileType,
				"data": new Blob([new Uint8Array(currentValue.fileData)], {type: currentValue.fileType})
			};
		});

		// Prepare payments and attachments that are queued to be deleted.
		this.$.paymentSection.get("paymentsToDelete").forEach(function(currentValue, index, array) {
			// Update the "paymentsReceived".
			var index = ae.paymentsReceived.findIndex(function(element, index, array) { return element.attachmentID === currentValue; });
			if (index !== -1) { ae.paymentsReceived.splice(index, 1); }
			// Update the "_attachments".
			delete ae._attachments[currentValue];
		});
		this.$.paymentSection.set("paymentsToDelete", []);

		// Prepare payments and attachments that are queued to be uploaded.
		this.$.paymentSection.get("paymentsToUpload").forEach(function(currentValue, index, array) {
			// Update the "paymentsReceived".
			var value = Object.assign({}, currentValue);
			delete value.fileData;
			ae.paymentsReceived.push(value);
			// Update the "_attachments".
			ae._attachments[currentValue.attachmentID] = {
				"content_type": currentValue.fileType,
				"data": new Blob([new Uint8Array(currentValue.fileData)], {type: currentValue.fileType})
			};
		});

		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response){
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

			this.get("database").post(ae, enyo.bind(this, function(err, response){
				this.$.loadingPopup.hide();

				if (err)
				{
					alertify.error("Entry Update Failed");
					console.log(err);
					return;
				}

				if (this.get("mode") === "add"){
					this.addOptionToContact(response.id, ae.holderContactID);
				}

				if (options && options.callback)
				{
					options.callback();
				} else if (this.get("mode") === "add")
				{
					this.set("activeEntry", null);
					this.doGoBack();
				}
			}));
		}));
	},

	addOptionToContact:function(optionID, contactID)
	{
		var ajaxProperties ={
			cacheBust: false,
			contentType:"application/json",
			method:"POST",
			url:lumberjack.preferences.get("apiServer") + "addoptiontocontact",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		};

		ajaxProperties.postBody = {companyID: lumberjack.preferences.get("company"), optionID: optionID, contactID: contactID};

		var ajax = new enyo.Ajax(ajaxProperties);

		ajax.response(function(request, response) {
			if (!response.error)
			{
				//console.log(response);
				alertify.success("Option added to Contact");
			}
			else
			{
				console.log(response);
				alertify.error("Failed to add Vesting Condition");
			}
		}, this);

		ajax.error(function(request, response) {
			console.log("Ajax Error: ",request, response);
		}, this);

		ajax.go();
	},

	isDirty:function()
	{
		if (!this.get("activeEntry")) { return false; }

		var isDirtyArray = [
			this.$.supportingDocuments.isDirty(),
			this.$.paymentSection.isDirty(),
			this.get("activeEntry").get("numSharesActive") !== this.$.numSharesActiveInput.get("value"),
			this.get("activeEntry").get("numSharesMax") !== this.$.numSharesMaxInput.get("value"),
			this.get("activeEntry").get("purchasePriceExercised") !== this.$.exercisedPriceInput.get("value")
		];

		//console.log(isDirtyArray);

		return (isDirtyArray.indexOf(true)!==-1);
	},

	//Navigation
	handleCancelButtonTapped: function(inSender, inEvent)
	{
		this.doGoBack();
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
			this.createComponent({name: "next_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "nextEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.next_saveChangesPopup.show("Save changes?");
		}
		else { this.nextEntry(inSender, inEvent); }
	},

	nextEntry: function(inSender, inEvent)
	{
		this.activate(this.get("optionCollection").at(this.get("optionCollection").indexOf(this.get("activeEntry")) + 1));
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
			this.createComponent({name: "previous_saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "handleSaveEntryButtonTapped", onNo: "previousEntry", onHide: "handlePopupHidden"} , {owner:this});
			this.$.previous_saveChangesPopup.show("Save changes?");
		}
		else { this.previousEntry(inSender, inEvent); }
	},

	previousEntry: function(inSender, inEvent)
	{
		this.activate(this.get("optionCollection").at(this.get("optionCollection").indexOf(this.get("activeEntry")) - 1));
	},

	//Calendar
	handleDateIssuedInputTapped: function(inSender, inEvent)
	{
		this.$.calendarPopup.show();
	},

	handleDateExpiresInputTapped:function(inSender, inEvent)
	{
		this.$.calendarPopup2.show();
	},

	handleDateOfVestInputTapped: function(inSender, inEvent)
	{
		inSender.children[inEvent.index].$.vestCalendarPopup.show();
	},

	calendarDateChanged: function(inSender, inEvent)
	{
		this.set("dateIssued", new moment(inEvent.date).valueOf());
		this.$.calendarPopup.hide();
		return true;
	},

	calendarDateChanged2: function(inSender, inEvent)
	{
		this.set("expiryDate", new moment(inEvent.date).valueOf());
		this.$.calendarPopup2.hide();
		return true;
	},

	vestingCalendarDateChanged: function(inSender, inEvent)
	{
		var doV = new moment(inEvent.date);
		inSender.children[inEvent.index].$.dateOfVest.set("value", doV.format("YYYY/MM/DD"));
		this.get("vestingConditions").at(inEvent.index).set("dateOfVest", doV);

		inSender.children[inEvent.index].$.vestCalendarPopup.hide();
	},

	//User search
	handleViewHolder: function(inSender, inEvent)
	{
		this.doViewEventDetail({mode: "contacts", target: this.get("activeEntry").get("holderContactID")});
		return true;
	},

	handleSearchHolderButtonTapped: function(inSender, inEvent)
	{
		if (this.$.shareholderSearchPopup)
		{
			this.$.shareholderSearchPopup.hide();
			this.$.shareholderSearchPopup.destroy();
		}

		this.createComponent({name: "shareholderSearchPopup", kind: "lumberjack.ShareholderSearchPopup", allowNewContact: false, enableSearch: true, searchRoles:["optionholder"], onShareholderSelected: "handleHolderSelected", onHide: "handlePopupHidden", title: "Search Option Holders"});
		this.$.shareholderSearchPopup.show(this.$.holderNameInput.get("value"), lumberjack.preferences.get("company"));
	},

	handleHolderSelected: function(inSender, inEvent)
	{
		if (!inEvent.shareholder)
		{
			alertify.error("No shareholder selected");
			return;
		}

		var shareholder = inEvent.shareholder;

		this.$.holderNameInput.set("value", shareholder.get("contactName"));

		this.$.holderEmailInput.set("value", shareholder.get("emailAddress"));
		this.$.holderPhoneInput.set("value", shareholder.get("phoneNumber"));
		this.$.holderContactIDInput.set("value", shareholder.get("_id"));
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		this.resize();
	},

	//Vesting condition search
	handleSearchVestingButtonTapped:function(inSender, inEvent)
	{
		if (this.$.vestingConditionSearchPopup)
		{
			this.$.vestingConditionSearchPopup.hide();
			this.$.vestingConditionSearchPopup.destroy();
		}

		this.createComponent({name: "vestingConditionSearchPopup", kind: "lumberjack.VestingConditionSearchPopup", allowNewCondition: true, enableSearch: true, onConditionSelected: "handleConditionSelected", onHide: "handlePopupHidden", onCreateNewCondition:"handleCreateNewCondition"});
		this.$.vestingConditionSearchPopup.show("", lumberjack.preferences.get("company"));
	},

	handleConditionSelected: function(inSender, inEvent)
	{
		if(!inEvent.condition){
			alertify.error("No condition selected");
		}

		var condition = inEvent.condition;

		var cond = new lumberjack.OptionVestingConditionModel({});

		cond.set("type", condition.get("type"));
		cond.set("numShares", 0);
		cond.set("dateOfVest", "");
		cond.set("vestingEventDescription", condition.get("description"));
		cond.set("vestingEventID", condition.get("_id"));
		if(condition.get("type") === "immediate"){
			cond.set("vested", true);
		}else{
			cond.set("vested", false);
		}

		this.get("vestingConditions").add(cond);

		this.refreshRepeaters();
	},

	handleCreateNewCondition:function(inSender, inEvent)
	{
		if (this.$.vestingCreationPopup)
		{
			this.$.vestingCreationPopup.hide();
			this.$.vestingCreationPopup.destroy();
		}

		this.createComponent({name: "vestingCreationPopup", kind: "lumberjack.VestingCreationPopup", onHide: "handlePopupHidden", onCreateNewCondition:"handleNewCondition"});
		this.$.vestingCreationPopup.show();
	},

	handleNewCondition:function(inSender, inEvent)
	{
		var addedCondition = new lumberjack.VestingEventModel({});

		addedCondition.set("name", inEvent.name);
		addedCondition.set("description", inEvent.description);
		addedCondition.set("type", inEvent.type);

		var ajaxProperties ={
			cacheBust: false,
			contentType:"application/json",
			method:"POST",
			url:lumberjack.preferences.get("apiServer") + "addvestingcondition",
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		};

		ajaxProperties.postBody = {model: addedCondition, companyID: lumberjack.preferences.get("company")};

		var ajax = new enyo.Ajax(ajaxProperties);

		ajax.response(function(request, response) {
			if (!response.error)
			{
				console.log(response);
				alertify.success("Vesting Condition added to Library");

				var condition = response.condition;

				var cond = new lumberjack.OptionVestingConditionModel({});

				cond.set("type", condition.type);
				cond.set("numShares", 0);
				cond.set("dateOfVest", moment().valueOf());
				cond.set("vestingEventDescription", condition.description);
				cond.set("vestingEventID", condition._id);
				cond.set("vested", false);

				this.get("vestingConditions").add(cond);

				this.refreshRepeaters();
			}
			else
			{
				console.log(response);
				alertify.error("Failed to add Vesting Condition");
			}
		}, this);

		ajax.error(function(request, response) {
			console.log("Ajax Error: ",request, response);
		}, this);

		ajax.go();
	},

	//Delete
	handleDeleteEntryButtonTapped:function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins"], "option")) { return; }

		var fundsPaid = this.$.paymentSection.calculateFundsPaid();
		if(fundsPaid > 0)
		{
			alertify.error("Unable to cancel until all funds are refunded");
			return;
		}

		if (this.$.confirmDeleteEntryPopup)
		{
			this.$.confirmDeleteEntryPopup.hide();
			this.$.confirmDeleteEntryPopup.destroy();
		}
		this.createComponent({name: "confirmDeleteEntryPopup", kind: "lumberjack.ConfirmPopup", onYes: "deleteEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeleteEntryPopup.show("Revoke Entry? This cannot be undone.");
	},

	deleteEntry: function(inSender, inEvent)
	{
		this.$.loadingPopup.show("Updating Contact Information.");
		var contactRequest = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "removeoptionfromcontact",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				contactID: this.get("activeEntry").get("holderContactID"),
				optionID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		contactRequest.error(enyo.bind(this, function(request, response) {
			this.$.loadingPopup.hide();
			alertify.error("Failed to update contact record.");
			console.log(request);
			if(response === 401){
				this.doLogout();
				return;
			}
		}));

		contactRequest.response(enyo.bind(this, function(request, response) {
			if (response.error) {
				this.$.loadingPopup.hide();
				alertify.error("Failed to update contact record.");
				console.log(request);
				return;
			}

			alertify.success("Successfully updated contact record.");
			var optionRequest = new enyo.Ajax({
				url: lumberjack.preferences.get("apiServer") + "deleteoption",
				method: "POST",
				cacheBust: false,
				contentType: "application/json",
				postBody: {
					companyID: lumberjack.preferences.get("company"),
					optionID: this.get("activeEntry").get("_id")
				},
				headers:{
					"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
				}
			});

			optionRequest.error(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();
				alertify.error("Failed to cancel option record.");
				console.log(request);
				if(response === 401){
					this.doLogout();
					return;
				}
			}));

			optionRequest.response(enyo.bind(this, function(request, response) {
				this.$.loadingPopup.hide();

				if (response.error) {
					alertify.error("Failed to update option record.");
					console.log(request);
					return;
				}

				var history = {
					"type" : "cancel",
					"numShares": 0
				};
				this.addHistoryRecord(history);

				alertify.success("Successfully cancelled option record.");
				this.get("optionCollection").remove(this.get("activeEntry"));
				this.set("activeEntry", null);
				this.doGoBack();
			}));

			optionRequest.go();
		}));

		contactRequest.go();
	},

	//Expire
	handleExpireEntryButtonTapped:function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins"], "option")) { return; }

		var fundsPaid = this.$.paymentSection.calculateFundsPaid();
		if(fundsPaid > 0)
		{
			alertify.error("Unable to expire until all funds are refunded");
			return;
		}

		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.expireConfirm();
		})});
	},

	expireConfirm:function(inSender, inEvent)
	{
		var vestExpire = moment(this.get("ae").get("expiryDate"));
		if(moment().isBefore(vestExpire, 'day')){
			alertify.error("The Option has not yet Expired.");
			return;
		}

		if (this.$.confirmExpiryEntryPopup)
		{
			this.$.confirmExpiryEntryPopup.hide();
			this.$.confirmExpiryEntryPopup.destroy();
		}
		this.createComponent({name: "confirmExpiryEntryPopup", kind: "lumberjack.ConfirmPopup", onYes: "expireEntry", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmExpiryEntryPopup.show("Expire Entry?");
	},

	expireEntry:function(inSender, inEvent)
	{
		this.$.loadingPopup.show();

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "expireoption",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Expire Option");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Expire Option");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Option Expired.");
			this.$.loadingPopup.hide();
			this.doGoBack();
		}));

		request.go();
	},

	/***********************
	* Supporting Documents *
	***********************/

	handleAddDocument: function(inSender, inEvent)
	{
		var documentsToUpload = this.$.supportingDocuments.get("documentsToUpload");
		var documentsReceived = this.$.supportingDocuments.get("documentsReceived");
		var attachmentIndexes = Object.keys(this.get("activeEntry").get("_attachments") || {});

		// Generate random unique "attachmentID".
		var attachmentID = null;
		var byAttachmentID = function(element, index, array) {
			return element.attachmentID === attachmentID;
		};
		// Prepend a "$" (not an underscore since an attachment name in CouchDB can't start with that) to the "attachmentID" since a GUID can start with a number.
		do { attachmentID = "$" + uuid.v4().replace(/-/g, ""); }
		while (documentsToUpload.find(byAttachmentID) !== undefined || documentsReceived.find(byAttachmentID) !== undefined || attachmentIndexes.indexOf(attachmentID) !== -1);

		inEvent.payload.attachmentID = attachmentID;

		this.$.supportingDocuments.get("documentsToUpload").push(inEvent.payload);
		this.$.supportingDocuments.get("documentsReceived").push(Object.assign({}, inEvent.payload, {localDownload:true}));
		this.$.supportingDocuments.refreshRepeater();
		alertify.message("Document(s) ready to be uploaded.<br />Save changes to complete process.");
	},

	//Issuance Docs Handlers
	handleGenerateDocumentButtonTapped: function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.generateDocument();
		})});
	},

	handleDownloadUnsignedDocumentTapped:function(inSender, inEvent)
	{
		if (!this.get("issuanceDocGenerated"))
		{
			alertify.error("No Issuance document present");
			return;
		}

		this.handleDownloadDocument({documentID: this.get("activeEntry").get("issuanceDoc").unsignedAttachmentID, documentName: this.get("activeEntry").get("issuanceDoc").unsignedFileName});
		return true;
	},

	handleSendForSignatureButtonTapped:function(inSender, inEvent)
	{
		this.sendForSignature();
	},

	handleViewDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "getissuancedocumentstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to get document status");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to get document status");
				console.log(response);
				return;
			}

			this.$.documentStatusPopup.show(response.response);
		}));

		request.go({
			companyID: lumberjack.preferences.get("company"),
			optionID: this.get("activeEntry").get("_id")
		});
	},

	handleRefreshDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.refreshDocumentStatus();
		})});
	},

	handleDownloadSignedDocumentButtonTapped:function(inSender, inEvent)
	{
		if (!this.get("activeEntry").get("issuanceDoc").signed || this.get("activeEntry").get("issuanceDoc").signedAttachmentID === "" || this.get("activeEntry").get("issuanceDoc").signedFileName === "")
		{
			alertify.error("No signed issuance document present");
			return;
		}

		this.handleDownloadDocument({documentID: this.get("activeEntry").get("issuanceDoc").signedAttachmentID, documentName: this.get("activeEntry").get("issuanceDoc").signedFileName, view: inEvent.originator === this.$.viewSignedDocumentButton});
	},

	//Issuance Doc functions
	generateDocument: function()
	{
		if (this.get("activeEntry").get("issuanceDoc").sent && !this.get("activeEntry").get("issuanceDoc").signed)
		{
			this.cancelDocument(enyo.bind(this, function(){
				this.generateDocument();
			}));
			return;
		}

		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Generating..."));

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "generateissuancedocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				contactID: this.get("activeEntry").get("holderContactID"),
				optionID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Generate Issuance Document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Generate Issuance Document");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Issuance Document Generated!");
			this.$.loadingPopup.hide();
		}));

		request.go();
	},

	cancelDocument: function(callback)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Cancelling..."));

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "cancelissuancedocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to Cancel Issuance Document");
			console.log(request);
			this.$.loadingPopup.hide();
			if(response === 401){
				this.doLogout();
				return;
			}
			return;
		}));

		request.response(enyo.bind(this, function(request, response) {
			if (response.error)
			{
				this.$.loadingPopup.hide();
				alertify.error("Failed to Cancel Issuance Document");
				this.$.loadingPopup.log(response);
				return;
			}

			alertify.success("Issuance Document Cancelled!");
			this.$.loadingPopup.hide();
			if (callback) {callback();}
		}));

		request.go();
	},

	sendForSignature: function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "sendissuancedocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id")
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send document for signature");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to send document for signature");
				console.log(response);
				return;
			}

			alertify.success("Document Sent!");
		}));

		request.go();
	},

	refreshDocumentStatus: function()
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "refreshissuancedocstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to refresh document status");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to refresh document status");
				console.log(response);
				return;
			}

			alertify.success("Successfully updated document status.");
		}));

		request.go({
			companyID: lumberjack.preferences.get("company"),
			optionID: this.get("activeEntry").get("_id")
		});
	},

	handleDownloadDocument: function(inEvent)
	{
		if (this.get("activeEntry").get("_attachments") && this.get("activeEntry").get("_attachments")[inEvent.documentID])
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

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), inEvent.documentID, enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();

					if (inEvent.view && inEvent.fileType)
					{
						//Do this when we need to force a specific filetype for the viewer.
						var reader = new FileReader();
						reader.addEventListener("loadend", enyo.bind(this, function() {
							// rebuild the blob because it's coming back from the couchdb server with the wrong MIME type
							var fileType = inEvent.fileType;
							var fileData = reader.result;
							var url = URL.createObjectURL(new Blob([reader.result], {type: fileType}));
							window.open(url);
						}));

						reader.readAsArrayBuffer(response);
					}
					else if (inEvent.view)
					{
						window.open(URL.createObjectURL(response));
					}
					else
					{
						saveAs(response, inEvent.documentName);
					}
				}));
			}));
		}
		else
		{
			alertify.error("Unable to find " + inEvent.documentName);
		}
	},

	handleRequestSave: function(inEvent)
	{
		if (this.canEdit() && this.isDirty())
		{
			if (this.$.saveChangesPopup)
			{
				this.$.saveChangesPopup.hide();
				this.$.saveChangesPopup.destroy();
			}
			this.createComponent({name: "saveChangesPopup", kind: "lumberjack.ConfirmPopup", onYes: "saveAndAction", action: inEvent.callback, onHide: "handlePopupHidden"} , {owner:this});
			this.$.saveChangesPopup.show("Must save changes before generating document. Save changes?");
		}
		else { inEvent.callback(); }
	},

	saveAndAction: function(inSender, inEvent)
	{
		this.handleSaveEntryButtonTapped(inSender, inEvent, {callback: inSender.action});
	},

	//Exercise functions
	handleExerciseOptionsButtonTapped:function(inSender, inEvent)
	{
		if (this.$.exercisePopup)
		{
			this.$.exercisePopup.hide();
			this.$.exercisePopup.destroy();
		}

		this.createComponent({name: "exercisePopup", kind: "lumberjack.OptionExercisePopup", onHide: "handlePopupHidden", onExercise:"handleExercise"});
		this.$.exercisePopup.set("activeShares", lumberjack.parseInt(this.get("activeEntry").get("numSharesActive")));
		this.$.exercisePopup.show();
	},

	handleExercise:function(inSender, inEvent)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "generateexercisedocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id"),
				shareCount : inEvent.shares
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to generate document");
			console.log(response);
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to generate document");
				console.log(response);
				return;
			}

			var history = {
				"type" : "exercise",
				"numShares": inEvent.shares
			};
			this.addHistoryRecord(history);

			alertify.success("Document Generated");
		}));

		request.go();
	},

	//Exercise Repeater
	setupExerciseRepeaterItem:function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.exerciseItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		var record = this.get("exercise").at(inEvent.index);

		inEvent.item.$.exerciseDate.set("content", moment(record.get("exerciseDoc").generatedTimestamp).format("YYYY/MM/DD"));

		var status = "";

		if(record.get("exerciseDoc").signed){
			status = "Signed";
		}else if(record.get("exerciseDoc").sent){
			status = "Sent";
		}else if(record.get("exerciseDoc").generated){
			status = "Generated";
		}else{
			status = "Cancelled";
		}

		inEvent.item.$.exerciseStatus.set("content", status);
		inEvent.item.$.exerciseNumShares.set("content", record.get("numShares"));
		inEvent.item.$.exerciseSendForSignatureButton.set("disabled", status === "Cancelled" || status === "Sent" || status === "Signed");
		inEvent.item.$.exerciseDownloadUnsignedDocumentButton.set("disabled", status === "Cancelled");
		inEvent.item.$.exerciseViewSignedDocumentButton.set("disabled", !record.get("exerciseDoc").signed || status === "Cancelled");
		inEvent.item.$.exerciseDownloadSignedDocumentButton.set("disabled", !record.get("exerciseDoc").signed || status === "Cancelled");
		inEvent.item.$.cancelExerciseButton.set("disabled", record.get("exerciseDoc").signed || status === "Cancelled");
		inEvent.item.$.exerciseViewDocumentStatusButton.set("disabled", !(status === "Sent" || status === "Signed"));
		inEvent.item.$.exerciseRefreshDocumentStatusButton.set("disabled", !(status === "Sent" || status === "Signed"));
		inEvent.item.$.treasuryButton.set("disabled", !(status === "Signed"));
	},

	handleExerciseDownloadUnsignedDocumentTapped:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);
		if(exRecord && exRecord.get("exerciseDoc")){
			var doc = exRecord.get("exerciseDoc");
			if(doc.generated){
				this.handleDownloadDocument({documentID: doc.unsignedAttachmentID, documentName: doc.unsignedFileName});
				return true;
			}
		}
		alertify.error("No Exercise document present");
		return;
	},

	handleExerciseSendForSignatureButtonTapped:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);

		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.sendExerciseForSignature(exRecord);
		})});
	},

	handleExerciseViewDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);

		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "getexercisedocumentstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to get document status");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to get document status");
				console.log(response);
				return;
			}

			this.$.documentStatusPopup.show(response.response);
		}));

		request.go({
			companyID: lumberjack.preferences.get("company"),
			optionID: this.get("activeEntry").get("_id"),
			attachmentID: exRecord.get("exerciseDoc").unsignedAttachmentID
		});
	},

	handleExerciseRefreshDocumentStatusButtonTapped:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);

		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.refreshExerciseDocumentStatus(exRecord);
		})});
	},

	handleExerciseDownloadSignedDocumentButtonTapped:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);
		if(exRecord && exRecord.get("exerciseDoc")){
			var doc = exRecord.get("exerciseDoc");
			if(doc.generated){
				this.handleDownloadDocument({documentID: doc.signedAttachmentID, documentName: doc.signedFileName, view: inEvent.originator === this.$.exerciseViewSignedDocumentButton});
				return true;
			}
		}
		alertify.error("No Exercise document present");
		return;
	},

	handleCancelExerciseButtonTapped:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);

		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "cancelexerciseoption",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id"),
				attachmentID: exRecord.get("exerciseDoc").unsignedAttachmentID
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to cancel exercise");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to cancel exercise");
				console.log(response);
				return;
			}
		}));

		request.go();
	},

	sendExerciseForSignature:function(exRecord)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Sending");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "sendexercisedocument",
			method: "POST",
			cacheBust: false,
			contentType: "application/json",
			postBody: {
				companyID: lumberjack.preferences.get("company"),
				optionID: this.get("activeEntry").get("_id"),
				attachmentID: exRecord.get("exerciseDoc").unsignedAttachmentID
			},
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to send document for signature");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to send document for signature");
				console.log(response);
				return;
			}

			alertify.success("Document Sent!");
		}));

		request.go();
	},

	refreshExerciseDocumentStatus: function(exRecord)
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show("Loading");

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "refreshexercisedocstatus",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response) {
			alertify.error("Failed to refresh document status");
			console.log(request);
			this.$.loadingPopup.hide();
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
				alertify.error("Failed to refresh document status");
				console.log(response);
				return;
			}

			alertify.success("Successfully updated document status.");
		}));

		request.go({
			companyID: lumberjack.preferences.get("company"),
			optionID: this.get("activeEntry").get("_id"),
			attachmentID: exRecord.get("exerciseDoc").unsignedAttachmentID
		});
	},

	//Helper functions
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

  	jsUcfirst:function(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
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

	/******************
	* Payment Section *
	******************/

	handleAddPayment: function(inSender, inEvent)
	{
		var paymentsToUpload = this.$.paymentSection.get("paymentsToUpload");
		var paymentsReceived = this.$.paymentSection.get("paymentsReceived");
		var attachmentIndexes = Object.keys(this.get("activeEntry").get("_attachments") || {});

		// Generate random unique "attachmentID".
		var attachmentID = null;
		var byAttachmentID = function(element, index, array) {
			return element.attachmentID === attachmentID;
		};
		// Prepend a "$" (not an underscore since an attachment name in CouchDB can't start with that) to the "attachmentID" since a GUID can start with a number.
		do { attachmentID = "$" + uuid.v4().replace(/-/g, ""); }
		while (paymentsToUpload.find(byAttachmentID) !== undefined || paymentsReceived.find(byAttachmentID) !== undefined || attachmentIndexes.indexOf(attachmentID) !== -1);

		inEvent.payload.attachmentID = attachmentID;

		this.$.paymentSection.get("paymentsToUpload").push(inEvent.payload);
		this.$.paymentSection.get("paymentsReceived").push(Object.assign({}, inEvent.payload, {localDownload:true}));
		this.$.paymentSection.refreshRepeater();
		alertify.message("Payments(s) ready to be uploaded.<br />Save changes to complete process.");
	},

	//History
	addHistoryRecord: function(historyRecord)
	{
		var history = new lumberjack.OptionEventModel({});

		history.set("type", historyRecord.type);
		history.set("numShares", historyRecord.numShares);

		if(!this.get("ae").get("history")){
			this.get("ae").set("history", new lumberjack.OptionEventCollection());
		}

		this.get("vestingHistory").add(history);
	},

	/*************************
	* Treasury Order Section *
	*************************/

	handleTreasuryOrderButtonTapped: function(inSender, inEvent)
	{
		this.handleRequestSave({callback: enyo.bind(this, function(){
			this.openTreasuryPopup(inSender, inEvent);
		})});
	},

	openTreasuryPopup:function(inSender, inEvent)
	{
		var exRecord = this.get("exercise").at(inEvent.index);

		if (this.$.treasuryPopup)
		{
			this.$.treasuryPopup.hide();
			this.$.treasuryPopup.destroy();
		}

		this.createComponent({name: "treasuryPopup", kind: "lumberjack.OptionTreasuryOrderPopup", onHide: "handlePopupHidden"});
		this.$.treasuryPopup.set("exerciseRecord", exRecord);
		this.$.treasuryPopup.set("activeEntry", this.get("activeEntry"));
		this.$.treasuryPopup.set("database", this.get("database"));
		this.$.treasuryPopup.show();
	}
});
