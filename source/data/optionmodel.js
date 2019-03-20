enyo.kind({
	name: "lumberjack.OptionModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_attachments: null,// <Object>
		exercisePrice: null,// <number>
		exerciseCurrency: "USD",
		expiryDate: null,// <number>
		numSharesMax: 0,// <number>
		numSharesActive: 0,// <number>
		numSharesExercised: 0,// <number>
		purchasePriceTotal: 0,
		purchasePriceExercised: 0,
		dateIssued: null,// <number>
		holderContactID: "",
		status: "",// "created", "active", "exhausted", "expired", "cancelled"
		issuanceDoc: null,// <Object>
		// Option has collection of vesting conditions, and past events.
		vesting: null,// <lumberjack.OptionVestingConditionCollection>
		history: null,// <lumberjack.OptionEventCollection>
		exercise: null,// <lumberjack.OptionExerciseCollection>
		documentsReceived: null,// <Array>
		paymentsReceived: null// <Array>
	},

	parse: function(data)
	{
		// All objects need to be initialized here because initializing them in attributes
		// will cause the same object to be shared across all instances of this model.

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

		if (!data._attachments)
		{
			data._attachments = {};
		}

		if (!data.expiryDate)
		{
			data.expiryDate = moment().valueOf();
		}

		if (!data.dateIssued)
		{
			data.dateIssued = moment().valueOf();
		}

		if (!data.issuanceDoc)
		{
			data.issuanceDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (!data.vesting)
		{
			data.vesting = new lumberjack.OptionVestingConditionCollection();
		}
		else
		{
			data.vesting = new lumberjack.OptionVestingConditionCollection(data.vesting);
		}

		if (!data.history)
		{
			data.history = new lumberjack.OptionEventCollection();
		}
		else
		{
			data.history = new lumberjack.OptionEventCollection(data.history);
		}

		if (!data.exercise)
		{
			data.exercise = new lumberjack.OptionExerciseCollection();
		}
		else
		{
			data.exercise = new lumberjack.OptionExerciseCollection(data.exercise);
		}

		if (!data.documentsReceived)
		{
			data.documentsReceived = [];
		}

		if (!data.paymentsReceived)
		{
			data.paymentsReceived = [];
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.OptionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.OptionModel"
});

enyo.kind({
	name: "lumberjack.OptionVestingConditionModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		type: "",// "date", "event", "immediate"
		numShares: 0,
		dateOfVest: null,// <number>
		vestingEventDescription: "",// Description of the event that triggers vesting - needs manual activation
		vestingEventID: "",
		vested: false
	},
	parse: function(data)
	{
		if (!data.dateOfVest)
		{
			data.dateOfVest = moment().valueOf();
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.OptionVestingConditionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.OptionVestingConditionModel"
});

enyo.kind({
	name: "lumberjack.OptionEventModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "date",
	attributes: {
		type: "",// "vestByDate", "vestByEvent", "exercise", "expire", "cancel"
		numShares: 0,
		date: null,// <number>
		// Option event may have a document associated with it, and one or more payments if it is an exercise event.
		payments: null,// <lumberjack.OptionPaymentCollection>
		doc: null// <Object>
	},

	parse: function(data)
	{
		// All objects need to be initialized here because initializing them in attributes
		// will cause the same object to be shared across all instances of this model.

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

		if (!data.date)
		{
			data.date = moment().valueOf();
		}

		if (!data.payments)
		{
			data.payments = new lumberjack.OptionPaymentCollection();
		}
		else
		{
			data.payments = new lumberjack.OptionPaymentCollection(data.payments);
		}

		if (!data.doc)
		{
			data.doc = JSON.parse(JSON.stringify(defaultDoc));
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.OptionEventCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.OptionEventModel"
});

enyo.kind({
	name: "lumberjack.OptionPaymentModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "fileName",
	attributes: {
		fileName: "",
		type: "",// "wire", "deposit", "eft", "bankDraft", "cashiersCheck", "moneyOrder", "personalCheck", "corporateCheck", "debtConversion"
		amount: 0,
		currency: "USD",
		dateReceived: null,// <number>
		payerName: ""
	},

	parse: function(data)
	{
		if (!data.dateReceived)
		{
			data.dateReceived = moment().valueOf();
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.OptionPaymentCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.OptionPaymentModel"
});

enyo.kind({
	name: "lumberjack.OptionExerciseModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_id: null,// <string>
		numShares: 0,
		status: "",// "created", "signed", "cancelled"
		exerciseDoc: null,// <Object>
		treasuryDoc: null// <Object>
	},

	parse: function(data)
	{
		// All objects need to be initialized here because initializing them in attributes
		// will cause the same object to be shared across all instances of this model.

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

		if (!data.exerciseDoc)
		{
			data.exerciseDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (!data.treasuryDoc)
		{
			data.treasuryDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		return data;
	}
});

enyo.kind({
	name: "lumberjack.OptionExerciseCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.OptionExerciseModel"
});

//Model for vesting conditions in the library, that are used as a base for adding conditions to an option.
enyo.kind({
	name: "lumberjack.VestingEventModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		name: "",
		type: "",// "date", "event", "immediate"
		description: "",
		active: true
	}
});

enyo.kind({
	name: "lumberjack.VestingEventCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "lumberjack.VestingEventModel"
});