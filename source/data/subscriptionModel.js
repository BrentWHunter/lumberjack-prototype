enyo.kind({
	name: "quantum.SubscriptionModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_attachments: null,
		target: "",
		subscriptionInfo: null,
		contactInfo: null,
		documentsReceived: null,
		paymentsReceived: null,
		subscriptionAgreementDoc: null,
		loggedMail: null
	},

	parse: function(data) {
		// All objects need to be initialized here because initializing them in attributes
		// will cause the same object to be shared across all instances of this model.

		var defaultAddressInfo = {
			addressLine1: "",
			addressLine2: "",
			addressLine3: "",
			city: "",
			stateProvince: "",
			country: "",
			zipPostalCode: ""
		};

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
			data._attachments = {};
		}

		if (data.subscriptionInfo == null)
		{
			data.subscriptionInfo = {
				jurisdiction: null,
				subscriptionType: null,
				exemptionType: null,
				referrer: "",
				specialInstructions: "",
				salespersonName: "",
				salespersonID: "",
				salespersonDetail: {},
				accreditedInvestorQualification: [],
				accreditedInvestorQualificationDetail: {},
				numShares: 0,
				subscriptionStatus: null,
				subscriberDollarAmount: 0,
				fundsReceived: 0,
				notes: "",
				subscriptionCreatedTimestamp: 0,
				clientIdentityValidator: null
			};
		}

		if (data.contactInfo == null)
		{
			data.contactInfo = {
				contactID: "",
				subscriberName: "",
				displayName: "",
				dateOfBirth: 0,
				phoneNumber: "",
				businessPhoneNumber: "",
				cellPhoneNumber: "",
				faxNumber: "",
				emailAddress: "",
				secondaryEmailAddress: "",
				emailOnly: false,
				altMailAddress: false,
				addressInfo: JSON.parse(JSON.stringify(defaultAddressInfo)),
				altAddressInfo: JSON.parse(JSON.stringify(defaultAddressInfo)),
				corporateInfo: {
					contactPerson: "",
					contactPersonTitle: "",
					contactPerson2: "",
					contactPerson2Title: "",
					numSigners: 1
				}
			};
		}

		if (!data.subscriptionInfo.clientIdentityValidator)
		{
			data.subscriptionInfo.clientIdentityValidator = {};
		}
		data.subscriptionInfo.clientIdentityValidator = new quantum.ClientIdentityValidatorModel(data.subscriptionInfo.clientIdentityValidator);

		if (!Array.isArray(data.documentsReceived))
		{
			data.documentsReceived = [];
		}

		if (!Array.isArray(data.paymentsReceived))
		{
			data.paymentsReceived = [];
		}

		if (data.subscriptionAgreementDoc == null)
		{
			data.subscriptionAgreementDoc = JSON.parse(JSON.stringify(defaultDoc));
		}

		if (!Array.isArray(data.loggedMail))
		{
			data.loggedMail = [];
		}
		
		return data;
	}
});

enyo.kind({
	name: "quantum.ClientIdentityValidatorModel",
	kind: "enyo.Model",
	options: { parse: true },
	attributes: {
		type: "",
		name: "",
		firmName: "",
		phoneNumber: "",
		emailAddress: "",
		addressInfo: null,
		identityVerificationDoc: null,
		verificationSource: "thirdParty", //"self", "thirdParty", "verifyInvestor"
		verifyManually: false,
		documentsReceived: null,
		verificationStatus: "pending"
	},

	parse: function(data)
	{
		if(!data.addressInfo)
		{
			data.addressInfo = this.defaultAddressInfo();
		}

		//We assume that the default verification source is adobe unless otherwise specified.
		if(!data.identityVerificationDoc)
		{
			data.identityVerificationDoc = this.defaultDoc();
		}

		if (!Array.isArray(data.documentsReceived))
		{
			data.documentsReceived = [];
		}

		return data;
	},

	defaultAddressInfo: function()
	{
		return {
			addressLine1: "",
			addressLine2: "",
			addressLine3: "",
			city: "",
			stateProvince: "",
			country: "",
			zipPostalCode: ""
		};
	},

	defaultDoc: function()
	{
		return {
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
	},

	defaultVerifyInvestorDoc: function()
	{
		return {
			lastUpdatedTimestamp: 0,
			verifyInvestorID: "",
			verificationRequestID: "",
			verificationRequestStatus: "",
			linkAccountRequestSent: false,
			signedFileName: "",
			signedAttachmentID: ""
		};
	},

	//Be careful! This function will not remove any existing documents from the documentsReceived array or the _attachments object. You need to do it manually.
	getVerificationSource: function(source)
	{
		var verificationSource = {
			name: "",
			firmName: "",
			phoneNumber: "",
			emailAddress: "",
			verificationStatus: "pending",
			verifyManually: false,
			addressInfo: this.defaultAddressInfo()
		};

		if (source === "verifyInvestor")
		{
			verificationSource.type = "lawyer";
			verificationSource.name = "VerifyInvestor.com";
			verificationSource.firmName = "Verify Investor, LLC";
			verificationSource.phoneNumber = "818-925-6701";
			verificationSource.emailAddress = "support@verifyinvestor.com";
			verificationSource.addressInfo.addressLine1 = "13400 Riverside Drive";
			verificationSource.addressInfo.addressLine2 = "Suite 120";
			verificationSource.addressInfo.city = "Sherman Oaks";
			verificationSource.addressInfo.stateProvince = "CA";
			verificationSource.addressInfo.country = "USA";
			verificationSource.addressInfo.zipPostalCode = "91423";
			verificationSource.verificationSource = "verifyInvestor";
		}
		else
		{
			if (source === "thirdParty")
			{
				verificationSource.type = "accountant";
				verificationSource.verificationSource = "thirdParty";
			}
			else if (source === "self")
			{
				verificationSource.type = "";
				verificationSource.verificationSource = "self";
				verificationSource.verifyManually = true;
			}
		}

		return verificationSource;
	}
});

enyo.kind({
	name: "quantum.SubscriptionCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.SubscriptionModel",

	calculateTotalSharesComplete: function(country, isDAP)
	{
		var shares = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if ((value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds")) && value.get("contactInfo").addressInfo.country === country) 
				{
					shares = shares + value.get("subscriptionInfo").numShares;
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds")) 
				{
					shares = shares + value.get("subscriptionInfo").numShares;
				}
			}
		});

		return shares;
	},

	calculateTotalDollarsComplete: function(country, isDAP)
	{
		var total = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if ((value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds")) && value.get("contactInfo").addressInfo.country === country) 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount);
					}
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds"))
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount);
					}
				}
			}
		});

		return total;
	},

	calculateTotalSubscriptions: function(country) 
	{
		var count = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled" && value.get("contactInfo").addressInfo.country === country) 
				{
					count = count + 1;
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled") 
				{
					count = count + 1;
				}
			}
		});

		return count;
	},

	calculateSubscriptionsComplete: function(country) 
	{
		var count = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "complete" && value.get("contactInfo").addressInfo.country === country) 
				{
					count = count + 1;
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "complete") 
				{
					count = count + 1;
				}	
			}
		});

		return count;
	},	

	calculateSubscriptionsClosed: function(country) 
	{
		var count = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "closed" && value.get("contactInfo").addressInfo.country === country) 
				{
					count = count + 1;
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "closed") 
				{
					count = count + 1;
				}	
			}
		});

		return count;
	},

	calculateSubscriptionsOutstanding: function(country) 
	{
		var count = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "complete" && value.get("subscriptionInfo").subscriptionStatus !== "cancelled" && value.get("subscriptionInfo").subscriptionStatus !== "closed" && value.get("contactInfo").addressInfo.country === country) 
				{
					count = count + 1;
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "complete" && value.get("subscriptionInfo").subscriptionStatus !== "cancelled" && value.get("subscriptionInfo").subscriptionStatus !== "closed") 
				{
					count = count + 1;
				}	
			}
		});

		return count;
	},	

	calculateSubscriptionsCancelled: function(country) 
	{
		var count = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "cancelled" && value.get("contactInfo").addressInfo.country === country) 
				{
					count = count + 1;
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "cancelled") 
				{
					count = count + 1;
				}	
			}
		});

		return count;
	},

	calculateFundsDelivered: function(country) 
	{
		var total = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled" && value.get("subscriptionInfo").subscriptionStatus !== "closed" && value.get("contactInfo").addressInfo.country === country) 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").fundsReceived)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").fundsReceived);
					}
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled" && value.get("subscriptionInfo").subscriptionStatus !== "closed") 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").fundsReceived)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").fundsReceived);
					}
				}	
			}
		});

		return total;
	},

	calculateFundsClosed: function(country) 
	{
		var total = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "closed" && value.get("contactInfo").addressInfo.country === country) 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").fundsReceived)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").fundsReceived);
					}
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus === "closed") 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").fundsReceived)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").fundsReceived);
					}
				}	
			}
		});

		return total;
	},

	calculateFundsPledged: function(country) 
	{
		var total = 0;

		this.forEach(function(value, index, array){
			if (country)
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled" && value.get("contactInfo").addressInfo.country === country) 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount);
					}
				}
			}
			else
			{
				if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled") 
				{
					if(!isNaN(quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount)))
					{
						total = total + quantum.parseFloat(value.get("subscriptionInfo").subscriberDollarAmount);
					}
				}
			}
		});

		return total;
	},

	calculateSubscriptionStatusBreakdown: function()
	{
		var statuses = {};
		var statusesArray = [];

		this.forEach(function(value, index, array){
			if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled") 
			{
				//[countryName, fundsDelivered, fundsOutstanding]
				if (!statuses[value.get("subscriptionInfo").subscriptionStatus])
				{
					statuses[value.get("subscriptionInfo").subscriptionStatus] = [quantum.subscriptionStatusLookup(value.get("subscriptionInfo").subscriptionStatus), 1];
				}
				else
				{
					statuses[value.get("subscriptionInfo").subscriptionStatus][1] = statuses[value.get("subscriptionInfo").subscriptionStatus][1] + 1;
				}
			}
		});

		var statusKeys = Object.keys(statuses);
		for (var i = 0; i < statusKeys.length; i++)
		{
			statusesArray.push(statuses[statusKeys[i]]);
		}

		return statusesArray;
	},

	calculateSubscriptionFundsStatusBreakdown: function()
	{
		var statuses = {};
		var statusesArray = [["Funds", "Funds Received", "Funds Outstanding"]];

		this.forEach(function(value, index, array){
			if (value.get("subscriptionInfo").subscriptionStatus !== "cancelled") 
			{
				//[countryName, fundsDelivered, fundsOutstanding]
				if (!statuses[value.get("subscriptionInfo").subscriptionStatus])
				{
					statuses[value.get("subscriptionInfo").subscriptionStatus] = [quantum.subscriptionStatusLookup(value.get("subscriptionInfo").subscriptionStatus), numeral(value.get("subscriptionInfo").fundsReceived).value(), numeral(value.get("subscriptionInfo").subscriberDollarAmount - value.get("subscriptionInfo").fundsReceived).value()];
				}
				else
				{
					statuses[value.get("subscriptionInfo").subscriptionStatus][1] = statuses[value.get("subscriptionInfo").subscriptionStatus][1] + numeral(value.get("subscriptionInfo").fundsReceived).value();
					statuses[value.get("subscriptionInfo").subscriptionStatus][2] = statuses[value.get("subscriptionInfo").subscriptionStatus][2] + numeral(value.get("subscriptionInfo").subscriberDollarAmount - value.get("subscriptionInfo").fundsReceived).value();
				}
			}
		});

		var statusKeys = Object.keys(statuses);
		for (var i = 0; i < statusKeys.length; i++)
		{
			statusesArray.push(statuses[statusKeys[i]]);
		}

		return statusesArray;
	},

	/****************
	* Get Countries
	****************/

	getSubscriberCountries: function()
	{
		var countriesArray = [];
		var usa = false;
		var can = false;

		this.forEach(function(value, index, array){
			if (countriesArray.indexOf(value.get("contactInfo").addressInfo.country) === -1)
			{
				if (value.get("contactInfo").addressInfo.country === "USA")
				{
					//This may get hit more than once, but that's okay.
					usa = true;
				}
				else if (value.get("contactInfo").addressInfo.country === "CAN")
				{
					//This one too.
					can = true;
				}
				else
				{
					//This one should only get hit once per country.
					countriesArray.push(value.get("contactInfo").addressInfo.country);
				}
			}
		});

		countriesArray.sort();

		if (can)
		{
			countriesArray.unshift("CAN");
		}

		if (usa)
		{
			countriesArray.unshift("USA");
		}

		return countriesArray;
	},

	/****************
	* Generate Data for Output
	****************/
	generateResolutionData: function(isDAP)
	{
		var data = {};

		data.subscriptions = [];

		this.forEach(function(value, index, array){
			if (value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds"))
			{
				var subscription = {
					subscriberName: value.get("contactInfo").subscriberName,
					numberOfShares: numeral(value.get("subscriptionInfo").numShares).format('0,0'),
					shareDesignation: quantum.preferences.get("placementInfo").shareDesignation,
					shareTotalCost: "$" + quantum.formatCurrency(value.get("subscriptionInfo").numShares * quantum.preferences.get("placementInfo").sharePrice)
				};

				data.subscriptions.push(subscription);
			}
		});

		data.subscriptions.sort(function(a, b){
			if(a.subscriberName.toLowerCase() < b.subscriberName.toLowerCase()) {return -1;}
		    if(a.subscriberName.toLowerCase() > b.subscriberName.toLowerCase()) {return 1;}
		    return 0;
		});

		return data;
	},

	generateSubscriptionAcceptanceData: function(isDAP)
	{
		var data = {};

		data.subscriptions = [];

		this.forEach(function(value, index, array){
			if (value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds"))
			{
				var subscription = {
					subscriberName: value.get("contactInfo").subscriberName,
					numberOfShares: numeral(value.get("subscriptionInfo").numShares).format('0,0'),
					shareDesignation: quantum.preferences.get("placementInfo").shareDesignation,
					shareTotalCost: "$" + quantum.formatCurrency(value.get("subscriptionInfo").numShares * quantum.preferences.get("placementInfo").sharePrice)
				};

				data.subscriptions.push(subscription);
			}
		});

		data.subscriptions.sort(function(a, b){
			if(a.subscriberName.toLowerCase() < b.subscriberName.toLowerCase()) {return -1;}
		    if(a.subscriberName.toLowerCase() > b.subscriberName.toLowerCase()) {return 1;}
		    return 0;
		});

		return data;
	},

	generateTreasuryOrderData: function(closingDate, isDAP)
	{
		var pre = '<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>';
		var post = '</w:t></w:r></w:p>';
		var lineBreak = '<w:br/>';
		var data = {};

		data.placements = [];

		this.forEach(function(value, index, array){
			if (value.get("subscriptionInfo").subscriptionStatus === "complete" || (isDAP && value.get("subscriptionInfo").subscriptionStatus === "completeDocsNoFunds"))
			{
				var subscriberAddress = pre + value.get("contactInfo").addressInfo.addressLine1;
				if (value.get("contactInfo").addressInfo.addressLine2) {subscriberAddress = subscriberAddress + lineBreak + value.get("contactInfo").addressInfo.addressLine2;}
				if (value.get("contactInfo").addressInfo.addressLine3) {subscriberAddress = subscriberAddress + lineBreak + value.get("contactInfo").addressInfo.addressLine3;}
				if (value.get("contactInfo").addressInfo.city) {subscriberAddress = subscriberAddress + lineBreak + value.get("contactInfo").addressInfo.city;}
				if (value.get("contactInfo").addressInfo.stateProvince) {subscriberAddress = subscriberAddress + ", " + value.get("contactInfo").addressInfo.stateProvince;}
				if (value.get("contactInfo").addressInfo.zipPostalCode) {subscriberAddress = subscriberAddress + " " + value.get("contactInfo").addressInfo.zipPostalCode;}
				if (value.get("contactInfo").addressInfo.country) {subscriberAddress = subscriberAddress + " " + value.get("contactInfo").addressInfo.country;}
				if (value.get("contactInfo").contactPerson) {subscriberAddress = subscriberAddress + lineBreak + value.get("contactInfo").contactPerson;}
				if (value.get("contactInfo").phoneNumber) {subscriberAddress = subscriberAddress + lineBreak + value.get("contactInfo").phoneNumber;}
				subscriberAddress = (subscriberAddress + post).replace("&", "&amp;");

				var mailingAddress;

				if (value.get("altMailAddress"))
				{
					mailingAddress = pre + value.get("contactInfo").altAddressInfo.addressLine1;
					if (value.get("contactInfo").altAddressInfo.addressLine2) {mailingAddress = mailingAddress + lineBreak + value.get("contactInfo").altAddressInfo.addressLine2;}
					if (value.get("contactInfo").altAddressInfo.addressLine3) {mailingAddress = mailingAddress + lineBreak + value.get("contactInfo").altAddressInfo.addressLine3;}
					if (value.get("contactInfo").altAddressInfo.city) {mailingAddress = mailingAddress + lineBreak + value.get("contactInfo").altAddressInfo.city;}
					if (value.get("contactInfo").altAddressInfo.stateProvince) {mailingAddress = mailingAddress + ", " + value.get("contactInfo").altAddressInfo.stateProvince;}
					if (value.get("contactInfo").altAddressInfo.zipPostalCode) {mailingAddress = mailingAddress + " " + value.get("contactInfo").altAddressInfo.zipPostalCode;}
					if (value.get("contactInfo").altAddressInfo.country) {mailingAddress = mailingAddress + " " + value.get("contactInfo").altAddressInfo.country;}
					mailingAddress = (mailingAddress + post).replace("&", "&amp;");
				}
				else
				{
					mailingAddress = pre + post;
				}

				var placement = {
					subscriberName: value.get("contactInfo").subscriberName,
					registrationAddress: subscriberAddress,
					deliveryAddress: mailingAddress,
					numberOfShares: numeral(value.get("subscriptionInfo").numShares).format('0,0'),
					holdPeriodExpiry: quantum.preferences.get("placementInfo").treasuryOrderInfo.holdPeriodExpiry,
					registrationMethod: quantum.preferences.get("placementInfo").treasuryOrderInfo.registrationMethod,
					coveredShares: "",
					acquisitionDate: value.get("contactInfo").addressInfo.country === "USA" ? closingDate.format("MMMM D, YYYY") : "",
					acquisitionPrice: value.get("contactInfo").addressInfo.country === "USA" ? "$" + quantum.formatCurrency(quantum.preferences.get("placementInfo").sharePrice) : "",
					placementCurrency: value.get("contactInfo").addressInfo.country === "USA" ? quantum.preferences.get("placementInfo").placementCurrency : ""
				};

				data.placements.push(placement);
			}
		});

		data.placements.sort(function(a, b){
			if(a.subscriberName.toLowerCase() < b.subscriberName.toLowerCase()) {return -1;}
		    if(a.subscriberName.toLowerCase() > b.subscriberName.toLowerCase()) {return 1;}
		    return 0;
		});

		return data;
	}
});

