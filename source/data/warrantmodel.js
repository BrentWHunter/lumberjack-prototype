enyo.kind({
	name: "lumberjack.WarrantModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_attachments: null,// <Object>
		rootID: "",
		exercisePrice: 0,
		exerciseCurrency: "USD",
		expiryDate: 0,
		numShares: 0,
		dateIssued: null,// <number>
		parentID: "",
		childIDs: null,// <Array>
		holderContactID: "",
		status: "new",// "new", "active", "pendingTransaction", "exercised", "split", "exhausted", "expired"
		issuanceDoc: null,// <Object>
		transactionDoc: null,// <Object>
		treasuryOrderDoc: null,// <Object>
		documentsReceived: null,// <Array>
		paymentsReceived: null,// <Array>
		pendingTransactions: null,// <lumberjack.WarrantTransactionCollection>
		cancelledTransactions: null// <lumberjack.WarrantTransactionCollection>
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

		if (data._attachments == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same object to be shared across all instances of this model.
			data._attachments = {};
		}

		if (data.dateIssued == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same value to be shared across all instances of this model.
			data.dateIssued = moment().valueOf();
		}

		if (data.childIDs == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.childIDs = [];
		}

		if (data.issuanceDoc == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same object to be shared across all instances of this model.
			data.issuanceDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (data.transactionDoc == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same object to be shared across all instances of this model.
			data.transactionDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (data.treasuryOrderDoc == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same object to be shared across all instances of this model.
			data.treasuryOrderDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (data.documentsReceived == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.documentsReceived = [];
		}

		if (data.paymentsReceived == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.paymentsReceived = [];
		}

		if (data.pendingTransactions == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.pendingTransactions = [];
		}
		data.pendingTransactions = new lumberjack.WarrantTransactionCollection(data.pendingTransactions);

		if (data.cancelledTransactions == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.cancelledTransactions = [];
		}
		data.cancelledTransactions = new lumberjack.WarrantTransactionCollection(data.cancelledTransactions);

		return data;
	}
});

enyo.kind({
	name: "lumberjack.WarrantCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.WarrantModel"
});

enyo.kind({
	name: "lumberjack.WarrantTransactionModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_id: null,// <string>
		type: "",// "exercise", "sale"
		status: "incompleteDocsNoFunds",// "incompleteDocsNoFunds", "incompleteDocsPartialFunds", "incompleteDocsAllFunds", "completeDocsNoFunds", "completeDocsPartialFunds", "complete", "cancelled"
		numShares: 0,
		sharePrice: 0,
		currency: "USD",
		contactID: "",
		transactionDoc: null,// <Object>
		treasuryOrderDoc: null,// <Object>
		documentsReceived: null,// <Array>
		paymentsReceived: null// <Array>
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

		if (data._id == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same value to be shared across all instances of this model.
			data._id = uuid.v4().replace(/-/g, "");
		}

		if (data.transactionDoc == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same object to be shared across all instances of this model.
			data.transactionDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (data.treasuryOrderDoc == null)
		{
			// This needs to be initialized here because initializing it in attributes
			// will cause the same object to be shared across all instances of this model.
			data.treasuryOrderDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (data.documentsReceived == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.documentsReceived = [];
		}

		if (data.paymentsReceived == null)
		{
			// This needs to be initialized here because initializing it in attributes as []
			// will cause the same array to be shared across all instances of this model.
			data.paymentsReceived = [];
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.WarrantTransactionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.WarrantTransactionModel"
});