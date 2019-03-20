enyo.kind({
	name: "quantum.OptionModel",
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
		vesting: null,// <quantum.OptionVestingConditionCollection>
		history: null,// <quantum.OptionEventCollection>
		exercise: null,// <quantum.OptionExerciseCollection>
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
			data.vesting = new quantum.OptionVestingConditionCollection();
		}
		else
		{
			data.vesting = new quantum.OptionVestingConditionCollection(data.vesting);
		}

		if (!data.history)
		{
			data.history = new quantum.OptionEventCollection();
		}
		else
		{
			data.history = new quantum.OptionEventCollection(data.history);
		}

		if (!data.exercise)
		{
			data.exercise = new quantum.OptionExerciseCollection();
		}
		else
		{
			data.exercise = new quantum.OptionExerciseCollection(data.exercise);
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
	name: "quantum.OptionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.OptionModel"
});

enyo.kind({
	name: "quantum.OptionVestingConditionModel",
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
	name: "quantum.OptionVestingConditionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.OptionVestingConditionModel"
});

enyo.kind({
	name: "quantum.OptionEventModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "date",
	attributes: {
		type: "",// "vestByDate", "vestByEvent", "exercise", "expire", "cancel"
		numShares: 0,
		date: null,// <number>
		// Option event may have a document associated with it, and one or more payments if it is an exercise event.
		payments: null,// <quantum.OptionPaymentCollection>
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
			data.payments = new quantum.OptionPaymentCollection();
		}
		else
		{
			data.payments = new quantum.OptionPaymentCollection(data.payments);
		}

		if (!data.doc)
		{
			data.doc = JSON.parse(JSON.stringify(defaultDoc));
		}

		return data;
	}
});

enyo.kind({
	name: "quantum.OptionEventCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.OptionEventModel"
});

enyo.kind({
	name: "quantum.OptionPaymentModel",
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
	name: "quantum.OptionPaymentCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.OptionPaymentModel"
});

enyo.kind({
	name: "quantum.OptionExerciseModel",
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
	name: "quantum.OptionExerciseCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.OptionExerciseModel"
});

//Model for vesting conditions in the library, that are used as a base for adding conditions to an option.
enyo.kind({
	name: "quantum.VestingEventModel",
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
	name: "quantum.VestingEventCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.VestingEventModel"
});