/* global quantum */

//NOTE: Any time you update this model, be sure to update create contact from subscription in the contacts route of twilight
enyo.kind({
	name: "quantum.ContactModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_attachments: null,
		contactName: "",
		contactPerson: "",
		contactPersonTitle: "",
		dateOfBirth: 0,
		altMailAddress: false,
		addressInfo: null,
		altAddressInfo: null,
		phoneNumber: "",
		businessPhoneNumber: "",
		cellPhoneNumber: "",
		faxNumber: "",
		emailAddress: "",
		secondaryEmailAddress: "",
		emailOnly: false,
		jurisdiction: "",
		contactType: "",
		activeRoles: null,
		archivedRoles: null,
		shareholderInfo: null,
		subscriberInfo: null,
		buyerInfo: null,
		optionInfo: null,
		warrantInfo: null,

		externalID: "", //IE. CRM System
	},

	parse: function(data)
	{

		var addressObj = {
			addressLine1: "",
			addressLine2: "",
			addressLine3: "",
			city: "",
			stateProvince: "",
			country: "",
			zipPostalCode: ""
		};

		if (data.addressInfo === null)
		{
			data.addressInfo = JSON.parse(JSON.stringify(addressObj));
		}

		if (data.altAddressInfo === null)
		{
			data.altAddressInfo = JSON.parse(JSON.stringify(addressObj));
		}

		if (!data._attachments)
		{
			data._attachments = {};
		}

		if (!data.activeRoles)
		{
			//This needs to be initialized here because initializing it in attributes as []
			//will cause the same array to be shared across all instances of this model.
			data.activeRoles = [];
		}

		if (!data.archivedRoles)
		{
			//This needs to be initialized here because initializing it in attributes as []
			//will cause the same array to be shared across all instances of this model.
			data.archivedRoles = [];
		}

		if (!data.shareholderInfo)
		{
			data.shareholderInfo = {};
		}
		data.shareholderInfo = new quantum.ContactShareholderInformationModel(data.shareholderInfo);

		if (!data.subscriberInfo)
		{
			data.subscriberInfo = {};
		}
		data.subscriberInfo = new quantum.ContactSubscriberInformationModel(data.subscriberInfo);

		if (!data.warrantInfo)
		{
			data.warrantInfo = {};
		}
		data.warrantInfo = new quantum.ContactWarrantInformationModel(data.warrantInfo);

		if (!data.optionInfo)
		{
			data.optionInfo = {};
		}
		data.optionInfo = new quantum.ContactOptionInformationModel(data.optionInfo);

		if (!data.buyerInfo)
		{
			data.buyerInfo = {};
		}
		data.buyerInfo = new quantum.ContactBuyerInformationModel(data.buyerInfo);

		return data;
	}
});

enyo.kind({
	name: "quantum.ContactBuyerInformationModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		numSharesAfterPendingTransactions: 0,
		pendingTransactions: null,
		cancelledTransactions: null,
		accreditedInvestorQualification: null,
		registrationDoc: null,
		documentsReceived: null,
		referrer: ""
	},

	parse: function(data)
	{
		var defaultDoc = {
			generated: false,
			generatedTimestamp: 0,
			sent: false,
			sentTimestamp: 0,
			signed: false,
			signedTimestamp: 0,
			unsignedFileName: "",
			unsignedAttachmentID: "",
			signedFileName: "",
			signedAttachmentID: "",
			adobe: {
				agreementID: "",
				status: "",
				statusTimestamp: 0
			}
		};

		if(!data.registrationDoc)
		{
			data.registrationDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (!data.pendingTransactions)
		{
			data.pendingTransactions = [];
		}
		data.pendingTransactions = new quantum.TransactionHistoryCollection(data.pendingTransactions);


		if (!data.cancelledTransactions)
		{
			data.cancelledTransactions = [];
		}
		data.cancelledTransactions = new quantum.TransactionHistoryCollection(data.cancelledTransactions);

		if (!data.accreditedInvestorQualification)
		{
			data.accreditedInvestorQualification = [];
		}

		if (!data.documentsReceived)
		{
			data.documentsReceived = [];
		}

		return data;
	},

	//Note, we have these set up as their own functions rather than as computed properties since computed properties don't work on array changes.
	calculateNumSharesAfterPendingTransactions: function(){
		var numSharesAfterPendingTransactions = 0;

		this.get("pendingTransactions").forEach(enyo.bind(this, function(value, index, array){
			if (value.get("transactionType") === "increase")
			{
				numSharesAfterPendingTransactions = numSharesAfterPendingTransactions + value.get("numShares");
			}
			else if (value.get("transactionType") === "decrease")
			{
				numSharesAfterPendingTransactions = numSharesAfterPendingTransactions - value.get("numShares");
			}
		}));

		this.set("numSharesAfterPendingTransactions", numSharesAfterPendingTransactions);
	}
});

enyo.kind({
	name: "quantum.ContactShareholderInformationModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		numShares: 0,
		numSharesAfterPendingTransactions: 0,
		transferAgentIDs: null,
		transactionHistory: null,
		pendingTransactions: null,
		cancelledTransactions: null
	},

	parse: function(data)
	{
		if (!data.transferAgentIDs)
		{
			data.transferAgentIDs = [];
		}

		if (!data.transactionHistory)
		{
			data.transactionHistory = [];
		}
		data.transactionHistory = new quantum.TransactionHistoryCollection(data.transactionHistory);


		if (!data.pendingTransactions)
		{
			data.pendingTransactions = [];
		}
		data.pendingTransactions = new quantum.TransactionHistoryCollection(data.pendingTransactions);

		if (!data.cancelledTransactions)
		{
			data.cancelledTransactions = [];
		}
		data.cancelledTransactions = new quantum.TransactionHistoryCollection(data.cancelledTransactions);

		return data;
	},

	//Note, we have these set up as their own functions rather than as computed properties since computed properties don't work on array changes.
	calculateNumSharesAfterPendingTransactions: function(){
		this.calculateNumShares();

		var numSharesAfterPendingTransactions = this.get("numShares");

		this.get("pendingTransactions").forEach(enyo.bind(this, function(value, index, array){
			if (value.get("transactionType") === "increase")
			{
				numSharesAfterPendingTransactions = numSharesAfterPendingTransactions + value.get("numShares");
			}
			else if (value.get("transactionType") === "decrease")
			{
				numSharesAfterPendingTransactions = numSharesAfterPendingTransactions - value.get("numShares");
			}
		}));

		this.set("numSharesAfterPendingTransactions", numSharesAfterPendingTransactions);
	},

	calculateNumShares: function() {
		var numShares = 0;

		this.get("transactionHistory").forEach(enyo.bind(this, function(value, index, array){
			if (value.get("transactionType") === "increase")
			{
				numShares = numShares + value.get("numShares");
			}
			else if (value.get("transactionType") === "decrease")
			{
				numShares = numShares - value.get("numShares");
			}
		}));

		this.set("numShares", numShares);
	}
});

enyo.kind({
	name: "quantum.TransactionHistoryModel",
	kind: "enyo.Model",
	attributes: {
		timestamp: 0,
		transactionSource: "", //placement, transfer, option, warrant
		transactionType: "", //increase/decrease
		numShares: 0,
		pricePerShare: 0,
		description: "",
		sourceDatabase: "",
		sourceRecord: ""
	}
});

enyo.kind({
	name: "quantum.ContactSubscriberInformationModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		activeSubscriptions: null,
		cancelledSubscriptions: null
	},

	parse: function(data)
	{
		if (!data.activeSubscriptions)
		{
			data.activeSubscriptions = [];
		}
		data.activeSubscriptions = new quantum.ContactSubscriptionCollection(data.activeSubscriptions);


		if (!data.cancelledSubscriptions)
		{
			data.cancelledSubscriptions = [];
		}
		data.cancelledSubscriptions = new quantum.ContactSubscriptionCollection(data.cancelledSubscriptions);
		
		return data;
	}
});

enyo.kind({
	name: "quantum.ContactSubscriptionModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		placementName: "",
		numShares: 0,
		pricePerShare: 0,
		sourceDatabase: "",
		sourceRecord: ""
	}
});

//Warrants
enyo.kind({
	name: "quantum.ContactWarrantInformationModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		warrantIDs: null,
		warrantIDsActionable: null
	},

	parse: function(data)
	{
		if (!data.warrantIDs)
		{
			data.warrantIDs = [];
		}

		if (!data.warrantIDsActionable)
		{
			data.warrantIDsActionable = [];
		}
		return data;
	}
});

//Options
enyo.kind({
	name: "quantum.ContactOptionInformationModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		optionIDs: null,
		optionIDsActionable: null
	},

	parse: function(data)
	{
		if (!data.optionIDs)
		{
			data.optionIDs = [];
		}

		if (!data.optionIDsActionable)
		{
			data.optionIDsActionable = [];
		}
		return data;
	}
});

//TODO: Create submodels for different roles - ie Shareholder, etc.

enyo.kind({
	name: "quantum.ContactCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.ContactModel"
});

enyo.kind({
	name: "quantum.TransactionHistoryCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.TransactionHistoryModel"
});

enyo.kind({
	name: "quantum.ContactSubscriptionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.ContactSubscriptionModel"
});