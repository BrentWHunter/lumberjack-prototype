(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		global.utils = require('polymer-components/utils.js');
		global.numeral = require('numeral');
	}
})();

class reservationModel 
{
	get properties()
	{
		return {
			name: {
				type: String,
				value: ""
			},
			emailAddress: { //email regex check
				type: String,
				value: ""
			},
			cellPhone: {
				type: String,
				value: ""
			},
			numShares: {
				type: Number,
				value: function(data)
				{
					return numeral(data).value() || 0;
				}
			},
			placementID: {
				type: String,
				value: ""
			},
			salespersonID: {
				type: String,
				value: ""
			},
			subscriptionID: {
				type: String,
				value: ""
			},
			dateTimeCreated: {
				type: Number,
				value: 0
			},
			notificationSent: {
				type: Boolean,
				value: false
			},
			reservationLookupGuid: {
				type: String,
				value: ""
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
				value: function(data)
				{
					if(data)
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

	validate(mode, comparisonObject)
	{
		var returnBool;
		if(mode === "add")
		{
			returnBool = this.validateCreate();
		}
		else if(mode === "edit")
		{
			if(this._dirtyProperties)
			{
				returnBool = this.validateSave(this._dirtyProperties);
			}
			else
			{
				//Pass in database record as compare object
				returnBool = this.validateSave(comparisonObject);
			}
		}
		return returnBool;
	}

	validateCreate(compareObject)
	{
		//Variables That We Don't Touch
		delete this._invalidProperties._id;
		delete this._invalidProperties._rev;
		delete this._invalidProperties._attachments;
		delete this._invalidProperties.subscriptionID;
		delete this._invalidProperties.cellPhone;
		delete this._invalidProperties.dateTimeCreated;

		if(typeof this.name === "string" && this.name.length > 0)
		{
			delete this._invalidProperties.name;
		}

		if(typeof this.emailAddress === "string" && this.emailAddress.length > 0 && this.emailAddress.match(utils.emailRegEx))
		{
			delete this._invalidProperties.emailAddress;
		}

		if(typeof this.placementID === "string" && this.placementID.length === 8)
		{
			delete this._invalidProperties.placementID;
		}

		if(typeof this.salespersonID === "string" && this.salespersonID.length === 32)
		{
			delete this._invalidProperties.salespersonID;
		}

		if(typeof this.numShares === "number" && this.numShares > 0)
		{
			delete this._invalidProperties.numShares;
		}

		if (typeof this.notificationSent === "boolean")
		{
			delete this._invalidProperties.notificationSent;
		}

		if(typeof this.reservationLookupGuid === "string" && this.reservationLookupGuid.length === 32)
		{
			delete this._invalidProperties.reservationLookupGuid;
		}

		if(JSON.stringify(this._invalidProperties).indexOf(':true') === -1)
		{
			return {ok: true};
		}
		else
		{
			utils.invalidPropertiesCleanup(this._invalidProperties);
			return {error: true, detail: this._invalidProperties};
		}
	}

	validateSave(compareObject)
	{
		return this.validateCreate(compareObject);
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
}

(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		module.exports = {
			reservationModel: reservationModel
		};
	}
})();