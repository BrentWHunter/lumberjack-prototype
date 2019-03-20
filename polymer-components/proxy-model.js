(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		global.utils = require('polymer-components/utils.js');
		global.addressInfoModel = require('polymer-components/shared-models.js').addressInfoModel;
		global.adobeDocumentModel = require('polymer-components/shared-models.js').adobeDocumentModel;
		global.moment = require('moment-timezone');
			global.moment.tz.setDefault("UTC");
		global.numeral = require('numeral');
	}
})();

class proxyQuestionModel
{
	get properties()
	{
		return {
			id: {
				type: String,
				value: ""
			},
			type: {
				type: String,
				value: ""
			},
			formField: {
				type: String,
				value: ""
			},
			questionText: {
				type: String,
				value: ""
			},
			defaultAnswer: {
				type: String,
				value: ""
			},
			passPercentage: {
				type: Number,
				value: 0.5
			}
		};
	}

	constructor (data, mode)
	{
		if (mode === "invalid")
		{
			utils.invalidConstructor(this, data);
		}
		else
		{
			utils.commonConstructor(this, data);
		}
	}

	validateCreate (compareObject)
	{
		var questionTypeArray = ["string", "boolean", "director", "majority"];

		if (this.id !== "" && typeof this.id === "string")
		{
			delete this._invalidProperties.id;
		}

		if (this.formField !== "" && typeof this.formField === "string" )
		{
			delete this._invalidProperties.formField;
		}

		if (this.questionText !== "" && typeof this.questionText === "string")
		{
			delete this._invalidProperties.questionText;
		}

		if (this.type !== "" && typeof this.type === "string" && questionTypeArray.indexOf(this.type) !== -1)
		{
			delete this._invalidProperties.type;
		}

		if (typeof this.defaultAnswer === "string" || typeof this.defaultAnswer === "boolean")
		{
			if (this.type === "string" && this.defaultAnswer !== "")
			{
				delete this._invalidProperties.defaultAnswer;
			}
			else if (this.type === "boolean" && (this.defaultAnswer === "false" || this.defaultAnswer === "true"))
			{
				delete this._invalidProperties.defaultAnswer;
			}
			else if (this.type === "director" && (this.defaultAnswer === "for" || this.defaultAnswer === "withhold"))
			{
				delete this._invalidProperties.defaultAnswer;
			}
			else if (this.type === "majority" && (this.defaultAnswer === "for" || this.defaultAnswer === "against" || this.defaultAnswer === "abstain"))
			{
				delete this._invalidProperties.defaultAnswer;
			}
		}

		if (JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: this._invalidProperties};
		}
	}
}

class proxySettingsModel
{
	get properties()
	{
		return {
			proxyName: { //Required
				type: String,
				value: ""
			},
			status: { //Optional
				type: String,
				value: ""
			},
			startDate: { //Required, Unix Timestamp
				type: Number,
				value: 0
			},
			endDate: { //Required, Unix Timestamp
				type: Number,
				value: 0
			},
			companyContactPerson: { //Required
				type: String,
				value: ""
			},
			companyContactPersonEmail: { //Required
				type: String,
				value: ""
			},
			meetingDateTime: { //Required
				type: String,
				value: ""
			},
			meetingLocation: { //Required
				type: String,
				value: ""
			},
			informationCircularFilename: { //Required
				type: String,
				value: ""
			},
			proxyFormFilename: { //Required
				type: String,
				value: ""
			},
			questions: { //Required, minimum 1
				type: Array,
				value: function(data)
				{
					if (data)
					{
						var questionData = [];
						data.forEach( (question) => {
							questionData.push(new proxyQuestionModel(question));
						});
						return questionData;
					}
					else 
					{
						return [];
					}
				}
			},
			_id: {
				type: String,
				value: "settings"
			},
			_rev: {
				type: String
			},
			_attachments: {
				type: Object,
				value: function(data) {
					if (utils.isObject(data))
					{
						return Object.assign({}, data);
					}
					else
					{
						return {};
					}
				}
			}
		};
	}
	constructor (data, mode)
	{
		if (mode === "invalid")
		{
			utils.invalidConstructor(this, data);
		}
		else if (mode === "dirty")
		{
			utils.dirtyConstructor(this, data);
		}
		else
		{
			utils.commonConstructor(this, data);
		}
	}

	validate (mode, comparisonObject)
	{
		var proxyStatusArray = ["new", "active", "complete", "cancelled"];

		var returnVal;
		if (mode === "add")
		{
			if (proxyStatusArray.indexOf(this.status) === -1)
			{
				console.error("Attempting To Create a Proxy with an Invalid Status");
				return {error: true, detail: "Attempting to create a proxy with an invalid status."};
			}

			if (this._dirtyProperties)
			{
				returnVal = this.validateCreate(this._dirtyProperties);
			}
			else
			{
				returnVal = this.validateCreate(comparisonObject);
			}
		}
		else if (mode === "edit")
		{
			if (proxyStatusArray.indexOf(this.status) === -1)
			{
				console.error("Attempting To Change a Proxy to an Invalid Status");
			}

			if (this._dirtyProperties)
			{
				returnVal = this.validateSave(this._dirtyProperties);
			}
			else
			{
				returnVal = this.validateSave(comparisonObject);
			}
		}
		return returnVal;
	}

	validateCreate (compareObject)
	{
		//Variables That We Don't Touch, or not present at creation
		delete this._invalidProperties._rev;

		if (this._id === "settings")
		{
			delete this._invalidProperties._id;
		}

		if (typeof this.proxyName === "string" && this.proxyName !== "")
		{
			delete this._invalidProperties.proxyName;
		}

		if (typeof this.status === "string" && this.status === "new")
		{
			delete this._invalidProperties.status;
		}

		if (typeof this.startDate === "number" && this.startDate >= 0)
		{
			delete this._invalidProperties.startDate;
		}
		
		var expiryDate = moment(this.endDate);
		var daysUntilSigning = expiryDate.diff(moment(), "days");

		if (typeof this.endDate === "number" && this.endDate >= 0 && daysUntilSigning > 1)
		{
			delete this._invalidProperties.endDate;
		}

		if (this.startDate > this.endDate)
		{
			this._invalidProperties.startDate = true;
			this._invalidProperties.endDate = true;
		}

		if (Array.isArray(this.questions) && this.questions.length >= 1)
		{
			let isValid = true;
			for (let question of this.questions)
			{
				var proxyQuestion = new proxyQuestionModel(question, null);
				var invalidData = new proxyQuestionModel(proxyQuestion, "invalid")._invalidProperties;
				proxyQuestion._invalidProperties = invalidData;
				var questionValidation = proxyQuestion.validateCreate(null);
				if (!questionValidation.ok)
				{
					isValid = false;
					break;
				}
			}

			if (isValid)
			{
				delete this._invalidProperties.questions;
			}
		}


		let isInfoCircularValid = false;
		let isProxyFormValid = false;

		if (this._attachments)
		{
			// Validate attachments property
			if (typeof this._attachments === "object")
			{
				delete this._invalidProperties._attachments;
			}

			// Validate on Info Circular
			if (typeof this._attachments[this.informationCircularFilename] === "object" &&
				this._attachments[this.informationCircularFilename].data &&
				this._attachments[this.informationCircularFilename].content_type === "application/pdf")
			{
				isInfoCircularValid = true;
			}

			// Validate on Proxy Form
			if (typeof this._attachments[this.proxyFormFilename] === "object" &&
				this._attachments[this.proxyFormFilename].data && 
				this._attachments[this.proxyFormFilename].content_type === "application/pdf")
			{
				isProxyFormValid = true;
			}

		}

		if (typeof this.informationCircularFilename === "string" && this.informationCircularFilename !== "" && isInfoCircularValid)
		{
			delete this._invalidProperties.informationCircularFilename;
		}
		if (typeof this.proxyFormFilename === "string" && this.proxyFormFilename !== "" && isProxyFormValid)
		{
			delete this._invalidProperties.proxyFormFilename;
		}

		if (typeof this.companyContactPerson === "string" && this.companyContactPerson !== "")
		{
			delete this._invalidProperties.companyContactPerson;
		}
		if (typeof this.companyContactPersonEmail === "string" && this.companyContactPersonEmail !== "" && this.companyContactPersonEmail.match(utils.emailRegEx))
		{
			delete this._invalidProperties.companyContactPersonEmail;
		}
		if (typeof this.meetingLocation === "string" && this.meetingLocation !== "")
		{
			delete this._invalidProperties.meetingLocation;
		}
		if (typeof this.meetingDateTime === "string" && this.meetingDateTime !== "")
		{
			delete this._invalidProperties.meetingDateTime;
		}

		if (JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: this._invalidProperties};
		}
	}

	validateSave (compareObject)
	{
		//Variables That We Don't Touch
		delete this._invalidProperties._rev;

		//Variables that are read-only and should not be changed
		if (this._id === "settings")
		{
			delete this._invalidProperties._id;
		}

		if (this.proxyName === compareObject.proxyName)
		{
			delete this._invalidProperties.proxyName;
		}

		if (this.startDate === compareObject.startDate)
		{
			delete this._invalidProperties.startDate;
		}
			
		if (this.endDate === compareObject.endDate)
		{
			delete this._invalidProperties.endDate;
		}

		if (this.questions)
		{
			let isValid = true;
			for (var questionIndex = 0; questionIndex < this.questions.length; questionIndex++)
			{
				var comparedQuestion = compareObject.questions[questionIndex];
				var question = new proxyQuestionModel(this.questions[questionIndex], null);

				if (question.id !== comparedQuestion.id || question.type !== comparedQuestion.type || question.questionText !== comparedQuestion.questionText || question.formField !== comparedQuestion.formField || question.defaultAnswer !== comparedQuestion.defaultAnswer)
				{
					isValid = false;
					break;
				}
			}

			if (isValid)
			{
				delete this._invalidProperties.questions;
			}
		}
		
		if (this.informationCircularFilename === compareObject.informationCircularFilename)
		{
			delete this._invalidProperties.informationCircularFilename;
		}
		if (this.proxyFormFilename === compareObject.proxyFormFilename)
		{
			delete this._invalidProperties.proxyFormFilename;
		}
		//Only validate if attachments are present
		if (this._attachments && compareObject._attachments)
		{
			//Ensure that all attachments are present.
			if ( (this._attachments[this.informationCircularFilename] &&
					compareObject._attachments[compareObject.informationCircularFilename] && 
					this._attachments[this.informationCircularFilename].revpos === compareObject._attachments[compareObject.informationCircularFilename].revpos && 
					this._attachments[this.informationCircularFilename].digest === compareObject._attachments[compareObject.informationCircularFilename].digest && 
					this._attachments[this.informationCircularFilename].content_type === compareObject._attachments[compareObject.informationCircularFilename].content_type) && 
				(this._attachments[this.proxyFormFilename] &&
					compareObject._attachments[compareObject.proxyFormFilename] && 
					this._attachments[this.proxyFormFilename].revpos === compareObject._attachments[compareObject.proxyFormFilename].revpos && 
					this._attachments[this.proxyFormFilename].digest === compareObject._attachments[compareObject.proxyFormFilename].digest && 
					this._attachments[this.proxyFormFilename].content_type === compareObject._attachments[compareObject.proxyFormFilename].content_type) )
			{
				delete this._invalidProperties._attachments;
			}
		}
		else
		{
			delete this._invalidProperties._attachments;
		}

		if (this.companyContactPerson === compareObject.companyContactPerson)
		{
			delete this._invalidProperties.companyContactPerson;
		}
		if (this.companyContactPersonEmail === compareObject.companyContactPersonEmail)
		{
			delete this._invalidProperties.companyContactPersonEmail;
		}
		if (this.meetingLocation === compareObject.meetingLocation)
		{
			delete this._invalidProperties.meetingLocation;
		}
		if (this.meetingDateTime === compareObject.meetingDateTime)
		{
			delete this._invalidProperties.meetingDateTime;
		}

		//Editable properties
		if (typeof compareObject.status === "string")
		{
			//If current proxy status is new, it can be set to active, complete, or cancelled
			if (compareObject.status === "new")
			{
				if (this.status === "active" || this.status === "complete" || this.status === "cancelled")
				{
					delete this._invalidProperties.status;
				}
			}
			//If current proxy status is active, it can be set to complete, or cancelled
			else if (compareObject.status === "active")
			{
				if (this.status === "complete" || this.status === "cancelled")
				{
					delete this._invalidProperties.status;
				}
			}
		}

		if (JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: this._invalidProperties};
		}
	}
}

class proxyModel 
{
	get properties()
	{
		return {
			contactID: { //Database ID, Guid validation, validate ID against DB?
				type: String,
				value: ""
			},
			contactName: { //Required
				type: String,
				value: ""
			},
			contactPerson: { //Optional
				type: String,
				value: ""
			},
			contactPersonTitle: { //Optional
				type: String,
				value: ""
			},
			numShares: { //Positive, whole numbers
				type: Number,
				value: 0
			},
			shareholderID: { //IE Certificate number, Transfer Agent ID
				type: String,
				value: ""
			},
			email: { //email regex check
				type: String,
				value: ""
			},
			proxyDoc: {
				type: Object,
				value: function(data)
				{
					if (data)
					{
						return new adobeDocumentModel(data);
					}
					else
					{
						return new adobeDocumentModel();
					}
				} 	
			},
			rawData: {
				type: Object
			},
			questions: {
				type: Array,
				value: function(data) {
					if (Array.isArray(data))
					{
						//TODO: Determine if submodel is needed here.
						return Array.from(data);
					}
					else
					{
						return [];
					}
				}
			},
			//No default values because couchdb will generate them on save
			_id: {
				type: String
			},
			_rev: {
				type: String
			},
			//NO BLOBS! Dont use Binary: true!
			_attachments: {
				type: Object,
				value: function(data) {
					if (utils.isObject(data))
					{
						return Object.assign({}, data);
					}
					else
					{
						return {};
					}
				}
			}
		};
	}

	constructor (data, mode)
	{
		if(mode === "invalid")
		{
			utils.invalidConstructor(this, data);
		}
		else if(mode === "dirty")
		{
			utils.dirtyConstructor(this, data);
		}
		else
		{
			utils.commonConstructor(this, data);
		}
	}

	validate (mode, comparisonObject)
	{
		//Do I need to check if ID is GUID?? -- number of chars?

		var returnVal;
		if (mode === "add")
		{
			if (this._dirtyProperties)
			{
				returnVal = this.validateCreate(this._dirtyProperties);
			}
			else 
			{
				returnVal = this.validateCreate(comparisonObject);
			}
		}
		else if (mode === "edit")
		{
			if (this._dirtyProperties)
			{
				returnVal = this.validateSave(this._dirtyProperties);
			}
			else
			{
				returnVal = this.validateSave(comparisonObject);
			}
		}
		return returnVal;
	}

	validateCreate(compareObject)
	{
		//Variables That We Don't Touch
		delete this._invalidProperties._id;
		delete this._invalidProperties._rev;
		delete this._invalidProperties._attachments;
		delete this._invalidProperties.rawData;
		delete this._invalidProperties.questions;

		if (typeof this.contactID === "string" && this.contactID.length === 32)
		{
			delete this._invalidProperties.contactID;
		}

		if (typeof this.contactName === "string" && this.contactName.length > 0)
		{
			delete this._invalidProperties.contactName;
		}

		if (typeof this.numShares === "number" && this.numShares > 0)
		{
			delete this._invalidProperties.numShares;
		}

		if (typeof this.shareholderID === "string" && this.shareholderID.length === 32)
		{
			delete this._invalidProperties.shareholderID;
		}

		if (typeof this.email === "string" && this.email.length > 0 && this.email.match(utils.emailRegEx))
		{
			delete this._invalidProperties.email;
		};
		
		//Optional fields
		if (typeof this.contactPerson === "string")
		{
			delete this._invalidProperties.contactPerson;
		}

		if (typeof this.contactPersonTitle === "string")
		{
			delete this._invalidProperties.contactPersonTitle;
		}
	
		//Optional to pass data for initialization?
		if (this.proxyDoc)
		{
			if (typeof this.proxyDoc === "object")
			{
				delete this._invalidProperties.proxyDoc;
			}
		}

		if (JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: this._invalidProperties};
		}
	}

	validateSave(compareObject)
	{
		//Variable(s) That We Don't Touch
		delete this._invalidProperties._rev;
		delete this._invalidProperties._attachments;
		delete this._invalidProperties.rawData;

		delete this._invalidProperties.proxyDoc;

		//Variables that are read-only and should not be changed
		if (this._id === compareObject._id)
		{
			delete this._invalidProperties._id;
		}

		if (this.shareholderID === compareObject.shareholderID)
		{
			delete this._invalidProperties.shareholderID;
		}

		if (this.numShares === compareObject.numShares)
		{
			delete this._invalidProperties.numShares;
		}
		
		if (this.rawData === compareObject.rawData)
		{
			delete this._invalidProperties.rawData;
		}

		if (this.contactID === compareObject.contactID)
		{
			delete this._invalidProperties.contactID;
		}

		if (this.questions)
		{
			let isValid = true;
			for (var questionIndex = 0; questionIndex < this.questions.length; questionIndex++)
			{
				var comparedQuestion = compareObject.questions[questionIndex];
				var question = this.questions[questionIndex];

				if (question.questionID !== comparedQuestion.questionID || question.answer !== comparedQuestion.answer)
				{
					isValid = false;
					break;
				}
			}

			if (isValid)
			{
				delete this._invalidProperties.questions;
			}
		}

		//Contact-info (Editable properties)
		if (typeof this.contactName === "string" && this.contactName.length > 0)
		{
			delete this._invalidProperties.contactName;
		}

		if (typeof this.contactPerson === "string" && this.contactPerson.length > 0)
		{
			delete this._invalidProperties.contactPerson;
		}

		if (typeof this.contactPersonTitle === "string" && this.contactPersonTitle.length > 0)
		{
			delete this._invalidProperties.contactPersonTitle;
		}

		if (typeof this.email === "string" && this.email.length > 0 && this.email.match(utils.emailRegEx))
		{
			delete this._invalidProperties.email;
		}

		if (JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: this._invalidProperties};
		}
	}
}

(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		module.exports = {
			proxyModel: proxyModel,
			proxySettingsModel: proxySettingsModel,
			proxyQuestionModel: proxyQuestionModel
		};
	}
})();