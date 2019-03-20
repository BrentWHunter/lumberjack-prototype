(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		global.utils = require('polymer-components/utils.js');
		global.countryData = require('polymer-components/country-data.js').countryData;
	}
})();

class addressInfoModel
{
	get properties()
	{
		return {
			addressLine1: { //Required, 35 char max
				type: String,
				value: ""
			},
			addressLine2: { //Optional, 35 char max
				type: String,
				value: ""
			},
			addressLine3: { //Optional, 35 char max
				type: String,
				value: ""
			},
			city: { //Required, 35 char max
				type: String,
				value: ""
			},
			stateProvince: { //?
				type: String,
				value: ""
			},
			country: { //Country code
				type: String,
				value: ""
			},
			zipPostalCode: { //Validation based on country?
				type: String,
				value: ""
			}
		};
	}

	static getCountryCommonName(addressInfo)
	{
		if(addressInfo)
		{
			return countryData.getCountryCommonName(addressInfo.country);
		}
		else
		{
			return "";
		}
	}

	static getSubdivName(addressInfo)
	{
		if(addressInfo)
		{
			return countryData.getSubdivName(addressInfo.country, addressInfo.stateProvince);
		}
		else
		{
			return "";
		}
	}

	//TODO: Add in validate call
	transformOneLine()
	{
		var returnString = this.addressLine1.trim()+", ";
		if(this.addressLine2 && this.addressLine2.trim()!== "")
		{
			returnString += this.addressLine2.trim()+ ", ";
		}
		if(this.addressLine3 && this.addressLine3.trim() !== "")
		{
			returnString += this.addressLine3.trim() + ", ";
		}
		returnString += this.city + ", ";
		if(this.stateProvince && this.stateProvince !== "")
		{
			returnString += countryData.getSubdivName(this.country, this.stateProvince) + ", ";
		}
		returnString += countryData.getCountryName(this.country) + " " + this.zipPostalCode;
		return returnString;
	}

	//TODO: Add in validate call
	transformTwoLine()
	{
		var returnObject = {line1: "", line2: ""};

		var returnString = this.addressLine1.trim()+", ";
		if(this.addressLine2 && this.addressLine2.trim()!== "")
		{
			returnString += this.addressLine2.trim()+ ", ";
		}
		if(this.addressLine3 && this.addressLine3.trim() !== "")
		{
			returnString += this.addressLine3.trim();
		}

		returnObject.line1 = returnString;

		returnString = this.city + ", ";
		if(this.stateProvince && this.stateProvince !== "")
		{
			returnString += countryData.getSubdivName(this.country, this.stateProvince) + ", ";
		}
		returnString += countryData.getCountryName(this.country) + " " + this.zipPostalCode;
		returnObject.line2 = returnString;
		return returnObject;
	}

	//TODO: Add in validate call
	//Do We Actually Need?
	transformThreeLine()
	{
		var returnObject = {line1: "", line2: ""};

		var returnString = this.addressLine1.trim()+", ";
		if(this.addressLine2 && this.addressLine2.trim()!== "")
		{
			returnString += this.addressLine2.trim()+ ", ";
		}
		if(this.addressLine3 && this.addressLine3.trim() !== "")
		{
			returnString += this.addressLine3.trim();
		}

		returnObject.line1 = returnString;

		returnString = this.city + ", ";
		if(this.stateProvince && this.stateProvince !== "")
		{
			returnString += countryData.getSubdivName(this.country, this.stateProvince) + ", ";
		}
		returnObject.line2 = returnString;

		returnString = countryData.getCountryName(this.country) + " " + this.zipPostalCode;
		returnObject.line3 = returnString;

		return returnObject;
	}

	//TODO: Improve state/province, country, zipPostalCode validation
	validate(invalidProperties)
	{
		if(typeof this.addressLine1 === "string" && this.addressLine1.length > 0 && this.addressLine1.length < 35)
		{
			delete invalidProperties.addressLine1;
		}
		if(typeof this.addressLine2 === "string" && this.addressLine2.length < 35)
		{
			delete invalidProperties.addressLine2;
		}
		if(typeof this.addressLine3 === "string" && this.addressLine3.length < 35)
		{
			delete invalidProperties.addressLine3;
		}
		if(typeof this.city === "string" && this.city.length > 0 && this.city.length < 35)
		{
			delete invalidProperties.city;
		}
		//TODO: Check to see if countryData has a list of provinces or not, if it doesn't, this is theoretically valid
		if(countryData.data[this.country] && typeof this.stateProvince === "string" && this.stateProvince.length < 35)
		{

			if(Object.keys(countryData.data[this.country].subdivisions).length === 0)
			{
				delete invalidProperties.stateProvince;
			}
			else
			{
				//TODO: FIX This hack before deploying to production.
				var valid = false;
				Object.keys(countryData.data[this.country].subdivisions).forEach(subdiv => {
					if(this.stateProvince === subdiv || this.stateProvince === subdiv.split('-')[1])
					{
						valid = true;
					}
				});

				if(valid === true)
				{
					delete invalidProperties.stateProvince;
				}
			}
		}
		if(typeof this.country === "string" && this.country.length > 0 && this.country.length <= 3)
		{
			delete invalidProperties.country;
		}
		if(this.country === "CAN" && typeof this.zipPostalCode === "string")
		{
			if(this.zipPostalCode[3] !== " ")
			{
				this.zipPostalCode = this.zipPostalCode.slice(0,3).toUpperCase()+" "+this.zipPostalCode.slice(3,6).toUpperCase();
			}

			if(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test(this.zipPostalCode) === true)
			{
				this.zipPostalCode = this.zipPostalCode.toUpperCase();
				delete invalidProperties.zipPostalCode;
			}
		}
		else if(this.country === "USA" && typeof this.zipPostalCode === "string")
		{
			if(/^[0-9]{5}(?:-[0-9]{4})?$/.test(this.zipPostalCode) === true)
			{
				delete invalidProperties.zipPostalCode;
			}
		}
		else
		{
			if(typeof this.zipPostalCode === "string" && this.zipPostalCode.length < 35)
			{
				delete invalidProperties.zipPostalCode;
			}
		}
	}

	validateEmpty(invalidProperties)
	{
		var defaultValue = new addressInfoModel();
		if(this.addressLine1 === defaultValue.addressLine1)
		{
			delete invalidProperties.addressLine1;
		}

		if(this.addressLine2 === defaultValue.addressLine2)
		{
			delete invalidProperties.addressLine2;
		}

		if(this.addressLine3 === defaultValue.addressLine3)
		{
			delete invalidProperties.addressLine3;
		}

		if(this.city === defaultValue.city);
		{
			delete invalidProperties.city;
		}

		if(this.stateProvince === defaultValue.stateProvince)
		{
			delete invalidProperties.stateProvince;
		}

		if(this.country === defaultValue.country)
		{
			delete invalidProperties.country;
		}

		if(this.zipPostalCode === defaultValue.zipPostalCode)
		{
			delete invalidProperties.zipPostalCode;
		}
	}

	constructor(data)
	{
		utils.commonConstructor(this, data);
	}
}

class adobeDocumentModel
{
	get properties()
	{
		return {
			generated: {
				type: Boolean,
				value: false
			},
			generatedTimestamp: { //Unix timestamp, or 0 if above bool is false
				type: Number,
				value: 0
			},
			sent: {
				type: Boolean,
				value: false
			},
			sentTimestamp: { //Unix timestamp, or 0 if above bool is false
				type: Number,
				value: 0
			},
			signed: {
				type: Boolean,
				value: false
			},
			signedTimestamp: { //Unix timestamp, or 0 if above bool is false
				type: Number,
				value: 0
			},
			unsignedFileName: { //Ends with .docx
				type: String,
				value: ""
			},
			unsignedAttachmentID: { //$ + Guid
				type: String,
				value: ""
			},
			signedFileName: { //Ends with .pdf
				type: String,
				value: ""
			},
			signedAttachmentID: { //$ + Guid
				type: String,
				value: ""
			},
			adobe: {
				type: Object,
				value: function(data) {
					//TODO: Determine if submodel is needed here.
					return {
						agreementID: data ? (data.agreementID ? data.agreementID : "") : "", //Check adobe docs?
						status: data ? (data.status ? data.status : "") : "", //From known adobe statuses
						statusTimestamp: data ? (data.statusTimestamp ? data.statusTimestamp : 0) : 0, //Unix timestamp
						errorType: data ? (data.errorType ? data.errorType : "") : "", //EMAIL_BOUNCED(adobe), REJECTED(adobe), PENDINGDELETE(us)
						errorMessage: data ? (data.errorMessage ? data.errorMessage : "") : ""
					};
				}
			}
		};
	}

	constructor(data)
	{
		utils.commonConstructor(this, data);
	}

	validate(mode, invalidProperties, comparisonObject)
	{
		var returnBool;
		if(mode === "add")
		{
			returnBool = this.validateCreate(invalidProperties);
		}
		else if(mode === "edit")
		{
			if(this._dirtyProperties)
			{
				returnBool = this.validateSave(invalidProperties, this._dirtyProperties);
			}
			else
			{
				//Pass in database record as compare object
				returnBool = this.validateSave(invalidProperties, comparisonObject);
			}
		}
		return returnBool;
	}

	validateSave(invalidProperties, comparisonObject)
	{
		// Exploderate everything because we don't care as much after creation
		delete invalidProperties.generated;
		delete invalidProperties.generatedTimestamp;
		delete invalidProperties.sent;
		delete invalidProperties.sentTimestamp;
		delete invalidProperties.signed;
		delete invalidProperties.signedTimestamp;
		delete invalidProperties.unsignedFileName;
		delete invalidProperties.unsignedAttachmentID;
		delete invalidProperties.signedFileName;
		delete invalidProperties.signedAttachmentID;
		delete invalidProperties.adobe;

		if(JSON.stringify(invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: invalidProperties};
		}
	}

	validateCreate(invalidProperties)
	{
		var defaultAdobeModel = new adobeDocumentModel();
		var currentObjectInstance = this;

		// Ensure nothing but default values
		Object.getOwnPropertyNames(currentObjectInstance).forEach(function(propertyName) {
			let currentPropertyValue = currentObjectInstance[propertyName];
			let defaultPropertyValue = defaultAdobeModel[propertyName];

			if(propertyName === "adobe")
			{
				Object.getOwnPropertyNames(currentPropertyValue).forEach(function(adobePropertyName) {
					let currentAdobePropertyValue = currentPropertyValue[adobePropertyName];
					let defaultAdobePropertyValue = defaultPropertyValue[adobePropertyName];
					if(currentAdobePropertyValue === defaultAdobePropertyValue)
					{
						delete invalidProperties[propertyName][adobePropertyName];
					}
				});
			}
			else if(currentPropertyValue === defaultPropertyValue)
			{
				delete invalidProperties[propertyName];
			}
		});

		if(JSON.stringify(invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: invalidProperties};
		}
	}
}

class attachmentInfoModel
{
	get properties()
	{
		return {
			fileName: {
				type: String,
				value: ""
			},
			description: {
				type: String,
				value: ""
			},
			contentType: {
				type: String,
				value: ""
			},
			timestamp: {
				type: Number,
				value: 0
			},
			size: {
				type: Number,
				value: 0
			},
			attachmentID: {
				type: String,
				value: ""
			}
		};
	}

	validate(invalidProperties)
	{
		if(typeof this.fileName === "string" && this.fileName !== "")
		{
			delete invalidProperties.fileName;
		}
		if(typeof this.description === "string" && this.description !== "")
		{
			delete invalidProperties.description;
		}
		//Check against valid mime types?
		if(typeof this.contentType === "string" && this.contentType !== "")
		{
			delete invalidProperties.contentType;
		}
		if(typeof this.timestamp === "number" && this.timestamp > 0)
		{
			delete invalidProperties.timestamp;
		}
		if(typeof this.size === "number" && this.size > 0)
		{
			delete invalidProperties.size;
		}
		//TODO: Decide on how we're formatting attachment id strings $ prepended or not
		//Make sure this exists in attachments somehow
		if(typeof this.attachmentID === "string" && this.attachmentID !== "")
		{
			delete invalidProperties.attachmentID;
		}
	}

	constructor(data)
	{
		utils.commonConstructor(this, data);
	}
}

class clientIdentityValidatorModel {
	get properties() {
		return {
			type: {
				//Lawyer, Accountant, Broker, Financial Advisor
				type: String,
				value: ""
			},
			verificationSource: {
				//thirdParty, self, verifyInvestor.com
				type: String,
				value: ""
			},
			name: {
				type: String,
				value: ""
			},
			firmName: {
				type: String,
				value: ""
			},
			phoneNumber: {
				type: String,
				value: ""
			},
			emailAddress: {
				type: String,
				value: ""
			},
			addressInfo: {
				type: Object,
				value: function(data) {
					//Deferred to shared model validation
					if(utils.isObject(data) && utils.isObject(data.addressInfo))
					{
						return new addressInfoModel(data.addressInfo);
					}
					else if(data)
					{
						return new addressInfoModel(data);
					}
					else
					{
						return new addressInfoModel();
					}
				}
			},
			identityVerificationDoc: {
				type: Object,
				value: function(data) {
					// Based on verificationSource this may be either an emptyDocumentModel (self),
					// an adobeDocumentModel (thirdParty)
					// or verifyInvestorDocumentModel (verifyInvestor.com)
					if(utils.isObject(data))
					{
						if(data.hasOwnProperty("verifyInvestorID"))
						{
							return new verifyInvestorDocumentModel(data);
						}
						else if(data.hasOwnProperty("adobe"))
						{
							return new adobeDocumentModel(data);
						}
					}
					return new emptyDocumentModel();
				}
			},
			verifyManually: {
				// UI flag to allow setting verification status manually
				// Automatically true if verificationSource is 'self'
				type: Boolean,
				value: false
			},
			documentsReceived: {
				type: Array,
				value: function(data)
				{
					if(Array.isArray(data))
					{
						var details = [];
						for(var index in data)
						{
							details.push(new supportDocumentDataModel(data[index]));
						}
						return details;
					}
					else
					{
						return [];
					}
				}
			},
			verificationStatus: {
				//pending, verified, notVerified
				type: String,
				value: "notVerified"
			}
		};
	}

	constructor(data, mode)
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

	validate(invalidProperties)
	{
		if(this.verificationSource === "self")
		{
			this.validateEmpty(invalidProperties);
			delete invalidProperties.verificationSource;
			if(this.verifyManually === true)
			{
				delete invalidProperties.verifyManually;
			}
			else
			{
				invalidProperties.verifyManually = true;
			}

			if(typeof this.verificationStatus === "string" && this.verificationStatus.trim().length > 0)
			{
				delete invalidProperties.verificationStatus;
			}

			return;
		}

		delete invalidProperties.identityVerificationDoc;
		if(typeof this.type === "string" && this.type.trim().length > 0)
		{
			var validTypes = ["lawyer", "accountant", "broker", "financialAdvisor"];
			if(validTypes.indexOf(this.type) !== -1)
			{
				delete invalidProperties.type;
			}
		}

		if(this.addressInfo)
		{
			this.addressInfo.validate(invalidProperties.addressInfo);
		}

		if(typeof this.name === "string" && this.name.trim().length > 0)
		{
			delete invalidProperties.name;
		}

		if(typeof this.firmName === "string" && this.firmName.trim().length > 0)
		{
			delete invalidProperties.firmName;
		}

		if(typeof this.phoneNumber === "string" && this.phoneNumber.trim().length > 0)
		{
			delete invalidProperties.phoneNumber;
		}

		var emailRegEx = utils.emailRegEx;
		if(typeof this.emailAddress === "string" && this.emailAddress.trim().length > 0 && this.emailAddress.match(emailRegEx))
		{
			delete invalidProperties.emailAddress;
		}

		if(typeof this.verifyManually === "boolean")
		{
			delete invalidProperties.verifyManually;
		}

		if(Array.isArray(this.documentsReceived))
		{
			delete invalidProperties.documentsReceived;
		}

		if(typeof this.verificationStatus === "string" && this.verificationStatus.trim().length > 0)
		{
			var validVerificationStatuses = ["pending", "verified", "notVerified"];
			if(validVerificationStatuses.indexOf(this.verificationStatus) !== -1)
			{
				delete invalidProperties.verificationStatus;
			}
		}

		if(typeof this.verificationSource === "string" && this.verificationSource.trim().length > 0)
		{
			var validSources = ['thirdParty', 'self', 'verifyInvestor.com'];
			if(validSources.indexOf(this.verificationSource) !== -1)
			{
				delete invalidProperties.verificationSource;
			}
		}
	}

	validateEmpty(invalidProperties)
	{
		delete invalidProperties.identityVerificationDoc;
		var defaultValue = new clientIdentityValidatorModel();

		if(this.addressInfo)
		{
			this.addressInfo.validateEmpty(invalidProperties.addressInfo);
		}

		if(this.type === defaultValue.type)
		{
			delete invalidProperties.type;
		}

		if(this.name === defaultValue.name)
		{
			delete invalidProperties.name;
		}

		if(this.firmName === defaultValue.firmName)
		{
			delete invalidProperties.firmName;
		}

		if(this.phoneNumber === defaultValue.phoneNumber)
		{
			delete invalidProperties.phoneNumber;
		}

		if(this.emailAddress === defaultValue.emailAddress)
		{
			delete invalidProperties.emailAddress;
		}

		if(typeof this.verifyManually === defaultValue.verifyManually)
		{
			delete invalidProperties.verifyManually;
		}

		if(this.verificationStatus === defaultValue.verificationStatus)
		{
			delete invalidProperties.verificationStatus;
		}

		if(this.verificationSource === defaultValue.verificationSource)
		{
			delete invalidProperties.verificationSource;
		}

		delete invalidProperties.documentsReceived;
	}
}

class supportDocumentDataModel {
	get properties() {
		return {
			attachmentID: {
				type: String,
				value: ""
			},
			dateReceived: {
				type: Number,
				value: utils.defaultDate
			},
			documentDescription: {
				type: String,
				value: ""
			},
			fileName: {
				type: String,
				value: ""
			},
			fileType: {
				// fileType should match attachment's content_type property
				type: String,
				value: ""
			}
		};
	}

	constructor(data, mode)
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

	validate(mode, invalidProperties)
	{
		if(typeof this.attachmentID === "string")
		{
			delete invalidProperties.attachmentID;
		}
		if(typeof this.fileType === "string")
		{
			var validMimeTypes = utils.validMimeTypes;
			if(validMimeTypes.indexOf(this.fileType) !== -1)
			{
				delete invalidProperties.fileType;
			}
		}
		if(typeof this.fileName === "string" && this.fileName.trim().length > 0 && this.fileName.trim().length <= 250)
		{
			delete invalidProperties.fileName;
		}
		if(typeof this.documentDescription === "string" && this.documentDescription.trim().length > 0 && this.documentDescription.trim().length <= 250)
		{
			delete invalidProperties.documentDescription;
		}
		if(typeof this.dateReceived === "number")
		{
			delete invalidProperties.dateReceived;
		}
	}

	validateSelf(mode)
	{
		if(typeof mode !== "string" || mode.trim().length === 0)
		{
			return {error: true, detail: this._invalidProperties, message: "Mode not provided."};
		}

		this.validate(mode, this._invalidProperties);
		if(JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			return {error: true, detail: this._invalidProperties};
		}
	}
}

class emptyDocumentModel {
	get properties() {
		return {
			noVerificationDocumentModel: {
				//Lawyer, Accountant, Broker, Financial Advisor
				type: Boolean,
				value: true
			}
		};
	}

	constructor(data, mode)
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

	validate(invalidProperties)
	{
		if(this.noVerificationDocumentModel)
		{
			delete invalidProperties.noVerificationDocumentModel;
		}
	}
}

class verifyInvestorDocumentModel {
	get properties() {
		return {
			lastUpdatedTimestamp: {
				type: Number,
				value: 0
			},
			verifyInvestorID: {
				type: String,
				value: ""
			},
			verificationRequestID: {
				type: String,
				value: ""
			},
			verificationRequestStatus: {
				type: String,
				value: ""
			},
			linkAccountRequestSent: {
				type: Boolean,
				value: false
			},
			signedFileName: {
				type: String,
				value: ""
			},
			signedAttachmentID: {
				type: String,
				value: ""
			}
		};
	}

	constructor(data, mode)
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

	validate(invalidProperties)
	{
		delete invalidProperties.lastUpdatedTimestamp;
		delete invalidProperties.verifyInvestorID;
		delete invalidProperties.verificationRequestID;
		delete invalidProperties.verificationRequestStatus;
		delete invalidProperties.linkAccountRequestSent;
		delete invalidProperties.signedFileName;
		delete invalidProperties.signedAttachmentID;
	}

	validateEmpty(invalidProperties)
	{
		delete invalidProperties.lastUpdatedTimestamp;
		delete invalidProperties.verifyInvestorID;
		delete invalidProperties.verificationRequestID;
		delete invalidProperties.verificationRequestStatus;
		delete invalidProperties.linkAccountRequestSent;
		delete invalidProperties.signedFileName;
		delete invalidProperties.signedAttachmentID;
	}
}

class generalContactDetailsModel
{
	get properties()
	{
		return {
			contactName: {
				//35 characters, extended validation forthcoming
				type: String,
				value: ""
			},
			contactPerson: {
				type: String,
				value: ""
			},
			contactPersonTitle: {
				type: String,
				value: ""
			},
			dateOfBirth: {
				type: Number,
				value: 0
			},
			altMailAddress: {
				type: Boolean,
				value: false
			},
			addressInfo: {
				type: Object,
				value: function(data) {
					//Deferred to shared model validation
					if(data && data.addressInfo)
					{
						return new addressInfoModel(data.addressInfo);
					}
					else if(data)
					{
						return new addressInfoModel(data);
					}
					else
					{
						return new addressInfoModel();
					}
				}
			},
			altAddressInfo: {
				type: Object,
				value: function(data) {
					//Deferred to shared model validation
					if(data && data.addressInfo)
					{
						return new addressInfoModel(data.addressInfo);
					}
					else if(data)
					{
						return new addressInfoModel(data);
					}
					else
					{
						return new addressInfoModel();
					}
				}
			},
			phoneNumber: {
				//Non-empty, might have Ext., other weird stuff
				type: String,
				value: ""
			},
			businessPhoneNumber: {
				type: String,
				value: ""
			},
			cellPhoneNumber: {
				type: String,
				value: ""
			},
			faxNumber: {
				type: String,
				value: ""
			},
			emailAddress: {
				//email regex check
				type: String,
				value: ""
			},
			secondaryEmailAddress: {
				type: String,
				value: ""
			},
			emailOnly: {
				type: Boolean,
				value: false
			},
			contactType: {
				type: String,
				value: ""
			}
		};
	}

	constructor(data)
	{
		utils.commonConstructor(this, data);
	}

	validate(invalidProperties)
	{
		if(invalidProperties && invalidProperties.dateOfBirth)
		{
			delete invalidProperties.dateOfBirth;
		}

		// Booleans
		if(typeof this.emailOnly === "boolean")
		{
			delete invalidProperties.emailOnly;
		}

		// Address
		this.addressInfo.validate(invalidProperties.addressInfo);
		//delete invalidProperties.addressInfo;

		if(typeof this.altMailAddress === "boolean")
		{
			delete invalidProperties.altMailAddress;

			// We know the checkbox is valid so confirm alt address is in use
			if(this.altMailAddress === true)
			{
				this.altAddressInfo.validate(invalidProperties.altAddressInfo);
			}
			else
			{
				this.altAddressInfo.validateEmpty(invalidProperties.altAddressInfo);
			}
		}

		// Hard Coded values
		if(typeof this.contactType === "string")
		{
			var contactType = this.contactType;
			if(contactType === "individual" || contactType === "corporate")
			{
				delete invalidProperties.contactType;
			}

			// We know contactType is valid so check appropriate name inputs
			if(contactType === "corporate")
			{
				if(typeof this.contactPerson === "string" && this.contactPerson.trim().length > 0 && this.contactPerson.length <= 35 && this.contactPerson.trim().indexOf(" ") !== -1)
				{
					delete invalidProperties.contactPerson;
				}

				if(typeof this.contactPersonTitle === "string" && this.contactPersonTitle.trim().length > 0 && this.contactPersonTitle.length <= 35)
				{
					delete invalidProperties.contactPersonTitle;
				}

				if(typeof this.contactName === "string" && this.contactName.trim().length > 0 && this.contactName.length <= 35 && this.contactName.trim().indexOf(" ") !== -1)
				{
					delete invalidProperties.contactName;
				}
			}
			else
			{
				var defaultValue = new generalContactDetailsModel();
				// Make sure corporate fields are left blank
				if(this.contactPerson === defaultValue.contactPerson)
				{
					delete invalidProperties.contactPerson;
				}
				if(this.contactPersonTitle === defaultValue.contactPersonTitle)
				{
					delete invalidProperties.contactPersonTitle;
				}

				// Individuals have a First and Last name
				if(typeof this.contactName === "string" && this.contactName.trim().length > 0 && this.contactName.length <= 35 && this.contactName.trim().indexOf(" ") !== -1)
				{
					delete invalidProperties.contactName;
				}
			}
		}

		// Email
		var emailRegEx = utils.emailRegEx;
		if(typeof this.emailAddress === "string" && this.emailAddress.trim().length > 0 && this.emailAddress.match(emailRegEx) && this.emailAddress.trim().length <= 250)
		{
			delete invalidProperties.emailAddress;
		}

		if(this.secondaryEmailAddress === undefined || this.secondaryEmailAddress === "" || this.secondaryEmailAddress.trim().length === 0)
		{
			// Secondary email address was not entered
			delete invalidProperties.secondaryEmailAddress;
		}
		else if(typeof this.secondaryEmailAddress === "string" && this.secondaryEmailAddress.trim().length > 0 && this.secondaryEmailAddress.trim().length <= 250 && this.secondaryEmailAddress.trim().match(emailRegEx))
		{
			delete invalidProperties.secondaryEmailAddress;
		}

		// Phone
		var phoneValid = (typeof this.phoneNumber === "string" && this.phoneNumber.length > 0 && this.phoneNumber.length <= 35);
		var businessValid = (typeof this.businessPhoneNumber === "string" && this.businessPhoneNumber.length > 0 && this.businessPhoneNumber.length <= 35);
		var cellValid = (typeof this.cellPhoneNumber === "string" && this.cellPhoneNumber.length > 0 && this.cellPhoneNumber.length <= 35);

		var atLeastOnePhoneNumberValid = (phoneValid || businessValid || cellValid);
		if(atLeastOnePhoneNumberValid)
		{
			delete invalidProperties.phoneNumber;
			delete invalidProperties.businessPhoneNumber;
			delete invalidProperties.cellPhoneNumber;
		}

		if(typeof this.faxNumber === "string" && this.faxNumber.trim().length > 0 && this.faxNumber.trim().length <= 35)
		{
			//TODO: Worldwide phone number regex to confirm whatever was input is valid, until then just always delete fax invalid record
		}
		delete invalidProperties.faxNumber;
	}
}

class roleModel
{
	get properties()
	{
		return {
			director:{
				type: String,
				value: "false"
			},
			treasuryOfficer:{
				type: String,
				value: "false"
			},
			signingOfficer:{
				type: String,
				value: "false"
			}
		};
	}

	constructor(data)
	{
		utils.commonConstructor(this, data);
	}

	enableRole(roleName)
	{
		let isDirty = false;
		if(this[roleName])
		{
			if(this[roleName] == "false" || this[roleName] == "archived")
			{
				this[roleName] = "true";
				isDirty = true;
			}
		}
		else
		{
			return {error: true, code: "INVALIDROLE", detail: ("'" + roleName + "' is not a valid role."), isDirty: isDirty};
		}

		return {ok: true, isDirty: isDirty};
	}

	disableRole(roleName)
	{
		let isDirty = false;
		if(this[roleName])
		{
			if(this[roleName] == "true")
			{
				this[roleName] = "archived";
				isDirty = true;
			}
		}
		else
		{
			return {error: true, code: "INVALIDROLE", detail: ("'" + roleName + "' is not a valid role."), isDirty: isDirty};
		}

		return {ok: true, isDirty: isDirty};
	}

	validate(invalidProperties)
	{
		if(invalidProperties)
		{
			if(this.validateRoleState(this.director))
			{
				delete invalidProperties.director;
			}

			if(this.validateRoleState(this.treasuryOfficer))
			{
				delete invalidProperties.treasuryOfficer;
			}

			if(this.validateRoleState(this.signingOfficer))
			{
				delete invalidProperties.signingOfficer;
			}
		}
	}

	validateRoleState(roleValue)
	{
		if(roleValue == "false" || roleValue == "true" || roleValue == "archived")
		{
			return true;
		}

		return false;
	}
}

class paymentReceivedModel
{
	get properties()
	{
		return {
			paymentID: {
				type:String
			},
			payerName:{
				type:String
			},
			amount: {
				type:Number
			},
			currency: {
				type:String
			},
			receivedDate: {
				type:Number //Unix timestamp
			},
			status: {
				type:String
			},
			subRecordID:{
				type:String
			}
		};
	}

	//Very rough, needs work
	validate(invalidProperties)
	{
		//Optional
		delete invalidProperties.subRecordID;

		if(this.paymentID)
		{
			delete invalidProperties.paymentID;
		}
		if(this.payerName)
		{
			delete invalidProperties.payerName;
		}
		if(this.amount)
		{
			delete invalidProperties.amount;
		}
		if(this.currency)
		{
			delete invalidProperties.currency;
		}
		if(this.receivedDate)
		{
			delete invalidProperties.receivedDate;
		}
		if(this.status)
		{
			delete invalidProperties.status;
		}
	}

	constructor(data)
	{
		utils.commonConstructor(this, data);
	}
}

(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		module.exports = {
			adobeDocumentModel: adobeDocumentModel,
			verifyInvestorDocumentModel: verifyInvestorDocumentModel,
			addressInfoModel: addressInfoModel,
			attachmentInfoModel: attachmentInfoModel,
			clientIdentityValidatorModel: clientIdentityValidatorModel,
			generalContactDetailsModel: generalContactDetailsModel,
			paymentReceivedModel: paymentReceivedModel,
			roleModel: roleModel,
			supportDocumentDataModel: supportDocumentDataModel
		};
	}
})();
