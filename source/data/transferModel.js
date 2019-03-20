enyo.kind({
	name: "quantum.TransferModel",
	kind: "enyo.Model",
	options: { parse: true },
	primaryKey: "_id",
	attributes: {
		_attachments: null,
		transactionDate: null,
		transferStatus: "",
		transferType: "standard",
		principalID: "greenhill",
		transferApprovalType: "",
		numShares: 0,
		classOfShares: "common",
		pricePerShare: 0,
		buyPricePerShare: 0,
		totalPurchasePrice: 0,
		companyName: "",
		certificateNumber: "",
		seller: null,
		buyer: null,
		approver: null,
		powerOfAttorney: null,
		lawyer: null,
		invoiceDetail : null,
		documentsReceived: null,
		paymentsReceived: null,
		transferDocuments: null,
		notes: ""
	},

	parse: function(data)
	{
		// All objects need to be initialized here because initializing them in attributes
		// will cause the same object to be shared across all instances of this model.

		var defaultBuyerSeller = {
			contactID: "",
			transferType: "individual",
			name: "",
			signatoryName: "",
			signatoryTitle: "",
			addressInfo: {
				addressLine1: "",
				addressLine2: "",
				addressLine3: "",
				city: "",
				stateProvince: "",
				country: "",
				zipPostalCode: ""
			},
			email: "",
			phone: ""
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

		if (data.transactionDate == null)
		{
			data.transactionDate = moment().valueOf();
		}

		if (data.seller == null)
		{
			data.seller = JSON.parse(JSON.stringify(defaultBuyerSeller));
		}

		if (data.buyer == null)
		{
			data.buyer = JSON.parse(JSON.stringify(defaultBuyerSeller));
			data.buyer.jurisdiction = "";
		}

		if (data.approver == null)
		{
			data.approver = {
				approverID: ""
			};
		}

		if (data.powerOfAttorney == null)
		{
			data.powerOfAttorney = {
				powerOfAttorneyID: ""
			};
		}

		if (data.lawyer == null)
		{
			data.lawyer = {
				lawFirmID: "",
				lawyerID: "",
				trustAccountID: ""
			};
		}

		if (data.invoiceDetail == null)
		{
			data.invoiceDetail = {
				feesPaidBy: "both",
				sellerDiscount: 0,
				buyerDiscount: 0,
				sellerInvoiceID: "",
				buyerInvoiceID: ""
			};
		}

		if (!Array.isArray(data.documentsReceived))
		{
			data.documentsReceived = [];
		}

		if (!Array.isArray(data.paymentsReceived))
		{
			data.paymentsReceived = [];
		}

		if (data.transferDocuments == null)
		{
			data.transferDocuments = {
				purchaseAndSaleAgreement: JSON.parse(JSON.stringify(defaultDoc)),
				sellerPurchaseAndSaleAgreement: JSON.parse(JSON.stringify(defaultDoc)),
				buyerPurchaseAndSaleAgreement: JSON.parse(JSON.stringify(defaultDoc)),
				letterOfInstruction: JSON.parse(JSON.stringify(defaultDoc)),
				powerOfAttorney: JSON.parse(JSON.stringify(defaultDoc)),
				shareTransferApproval: JSON.parse(JSON.stringify(defaultDoc)),
				securitiesTransferForm: JSON.parse(JSON.stringify(defaultDoc)),
				legalOpinion: JSON.parse(JSON.stringify(defaultDoc))
			};
		}
		
		return data;
	}
});

enyo.kind({
	name: "quantum.TransferCollection",
	kind: "enyo.Collection",
	options: { parse: true },
	model: "quantum.TransferModel"
});