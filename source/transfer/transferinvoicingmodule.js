enyo.kind({
	name: "quantum.TransferInvoicingModule",
	fit: true,

	published: {
		mode: "add",
		sellPricePerShare: 0,
		buyPricePerShare: 0,
		sellerDiscount: 0,
		buyerDiscount: 0,
		sellerCountry: "",
		buyerCountry: "",
		numShares: 0,
		feesPaidBy: "both",
		sellerInvoiceID: null,
		buyerInvoiceID: null
	},

	events: {
		onRequestGenerateSellerInvoice: "",
		onRequestDownloadSellerInvoice: "",
		onRequestGenerateBuyerInvoice: "",
		onRequestDownloadBuyerInvoice: ""
	},

	computed: {
		sellerBaseFee: ["sellPricePerShare", "sellerDiscount", "sellerCountry", "numShares", "feesPaidBy"],
		buyerBaseFee: ["buyPricePerShare", "buyerDiscount", "buyerCountry", "numShares", "feesPaidBy"],
		sellerTaxes: ["sellPricePerShare", "sellerDiscount", "sellerCountry", "numShares", "feesPaidBy"],
		buyerTaxes: ["buyPricePerShare", "buyerDiscount", "buyerCountry", "numShares", "feesPaidBy"],
		sellerTotalFee: ["sellPricePerShare", "sellerDiscount", "sellerCountry", "numShares", "feesPaidBy"],
		buyerTotalFee: ["buyPricePerShare", "buyerDiscount", "buyerCountry", "numShares", "feesPaidBy"]
	},

	components: [
		{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 15px; width: 100%;", content: "Invoicing"},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Fees Paid By:", style: "line-height: 42px; width: 170px;"},
			{name: "feesPaidByGroupbox", style: "margin-left: 10px;", kind: "onyx.RadioGroup", components: [
				{name: "feesPaidByBothRadioOption", content: "Both", active: true, value: "both"},
				{name: "feesPaidBySellerRadioOption", content: "Seller", value: "seller"},
				{name: "feesPaidByBuyerRadioOption", content: "Buyer", value: "buyer"}
			]}
		]},
		{kind: "enyo.FittableColumns",  components: [
			{style: "width: 50%;", components: [
				{kind: "quantum.Input", name:"sellerBaseFeeInput", disabled: true, columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Base Fee"},
				{kind: "quantum.Input", name:"sellerDiscountInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Discount"},
				{kind: "quantum.Input", name:"sellerTaxesInput", disabled: true, columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Taxes"},
				{kind: "quantum.Input", name:"sellerTotalFeeInput", disabled: true, columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Seller Total Fee"},				
				{kind: "quantum.Button", name: "generateSellerInvoiceButton", ontap: "handleGenerateSellerInvoiceButtonTapped", content: "Generate Seller Invoice"},
				{kind: "quantum.Button", name: "downloadSellerInvoiceButton", style: "margin-left: 10px;", ontap: "handleDownloadSellerInvoiceButtonTapped", content: "Download Seller Invoice"}
			]},
			{style: "width: 50%;", components: [
				{kind: "quantum.Input", name:"buyerBaseFeeInput", disabled: true, columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Base Fee"},
				{kind: "quantum.Input", name:"buyerDiscountInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Discount"},
				{kind: "quantum.Input", name:"buyerTaxesInput", disabled: true, columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Taxes"},
				{kind: "quantum.Input", name:"buyerTotalFeeInput", disabled: true, columnStyle:"margin-top: 10px;", labelStyle:"line-height: 38px; width: 170px;", decoratorStyle: "margin-left: 10px; width: 350px;", inputStyle: "width: 100%;", type:"text", label:"Buyer Total Fee"},
				{kind: "quantum.Button", name: "generateBuyerInvoiceButton", ontap: "handleGenerateBuyerInvoiceButtonTapped", content: "Generate Buyer Invoice"},
				{kind: "quantum.Button", name: "downloadBuyerInvoiceButton", style: "margin-left: 10px;", ontap: "handleDownloadBuyerInvoiceButtonTapped", content: "Download Buyer Invoice"}
			]}
		]}
	],

	bindings: [
		{from: ".sellerInvoiceID", to: ".$.downloadSellerInvoiceButton.disabled", transform: function(v){
			if (v) {
				return false;
			}

			return true;
		}},
		{from: ".sellerInvoiceID", to: ".$.generateSellerInvoiceButton.disabled", transform: function(v){
			if (!v && this.get("mode") === "edit") {
				return false;
			}

			return true;
		}},
		{from: ".buyerInvoiceID", to: ".$.downloadBuyerInvoiceButton.disabled", transform: function(v){
			if (v) {
				return false;
			}

			return true;
		}},
		{from: ".buyerInvoiceID", to: ".$.generateBuyerInvoiceButton.disabled", transform: function(v){
			if (!v && this.get("mode") === "edit") {
				return false;
			}

			return true;
		}},
		{from: ".mode", to: ".$.sellerDiscountInput.disabled", transform: function(v){
			return v === "edit";
		}},
		{from: ".mode", to: ".$.buyerDiscountInput.disabled", transform: function(v){
			return v === "edit";
		}},
		{from: ".mode", to: ".$.feesPaidByBothRadioOption.disabled", transform: function(v){
			return v === "edit";
		}},
		{from: ".mode", to: ".$.feesPaidBySellerRadioOption.disabled", transform: function(v){
			return v === "edit";
		}},
		{from: ".mode", to: ".$.feesPaidByBuyerRadioOption.disabled", transform: function(v){
			return v === "edit";
		}},		
		{from: ".sellerDiscount", to: ".$.sellerDiscountInput.value", oneWay: false, transform: function(v){
			this.$.sellerDiscountInput.clearBorderError();
			return quantum.parseFloat(v);
		}},
		{from: ".buyerDiscount", to: ".$.buyerDiscountInput.value", oneWay: false, transform: function(v){
			this.$.buyerDiscountInput.clearBorderError();
			return quantum.parseFloat(v);
		}},
		{from: ".feesPaidBy", to: ".$.feesPaidByGroupbox.active", oneWay: false, transform: function(v,d){
			if (d === "source")
			{
				if (v === "both")
				{
					return this.$.feesPaidByBothRadioOption;
				}
				else if (v === "buyer")
				{
					this.$.sellerDiscountInput.set("value", 0);
					return this.$.feesPaidByBuyerRadioOption;
				}
				else if (v === "seller")
				{
					this.$.buyerDiscountInput.set("value", 0);
					return this.$.feesPaidByBuyerRadioOption;
				}
			}
			else
			{
				if (v.value === "buyer")
				{
					this.$.sellerDiscountInput.set("value", 0);
				}
				else if (v.value === "seller")
				{
					this.$.buyerDiscountInput.set("value", 0);
				}

				return v.value;
			}
		}},
		{from: ".sellerBaseFee", to: ".$.sellerBaseFeeInput.value"},
		{from: ".sellerTaxes", to: ".$.sellerTaxesInput.value"},
		{from: ".sellerTotalFee", to: ".$.sellerTotalFeeInput.value"},
		{from: ".buyerBaseFee", to: ".$.buyerBaseFeeInput.value"},
		{from: ".buyerTaxes", to: ".$.buyerTaxesInput.value"},
		{from: ".buyerTotalFee", to: ".$.buyerTotalFeeInput.value"}
	],

	//Computed Properties
	sellerBaseFee: function(){
		var baseFee = this.calculateBaseFee(this.get("sellPricePerShare"), this.get("numShares"));

		if (this.get("feesPaidBy") === "seller")
		{
			baseFee = baseFee * 2;
		}
		else if (this.get("feesPaidBy") === "buyer")
		{
			return 0;
		}

		if(this.get("sellerCountry") === "CAN")
		{
			baseFee = (baseFee - this.get("sellerDiscount"))/1.05; //5% GST for Tax Calculation
		}

		return baseFee.toFixed(2);
	},

	buyerBaseFee: function(){
		var baseFee = this.calculateBaseFee(this.get("buyPricePerShare"), this.get("numShares"));

		if (this.get("feesPaidBy") === "buyer")
		{
			baseFee = baseFee * 2;
		}
		else if (this.get("feesPaidBy") === "seller")
		{
			return 0;
		}

		if(this.get("buyerCountry") === "CAN")
		{
			baseFee = (baseFee - this.get("buyerDiscount"))/1.05; //5% GST for Tax Calculation
		}

		return baseFee.toFixed(2);
	},

	sellerTaxes: function(){
		if(this.get("sellerCountry") === "CAN")
		{
			var baseFee = this.calculateBaseFee(this.get("sellPricePerShare"), this.get("numShares"));
			return (((baseFee - this.get("sellerDiscount"))/1.05) * 0.05).toFixed(2); //5% GST for Tax Calculation
		}

		return 0;
	},

	buyerTaxes: function(){
		if(this.get("buyerCountry") === "CAN")
		{
			var baseFee = this.calculateBaseFee(this.get("buyPricePerShare"), this.get("numShares"));
			return (((baseFee - this.get("buyerDiscount"))/1.05) * 0.05).toFixed(2); //5% GST for Tax Calculation
		}

		return 0;
	},

	sellerTotalFee: function(){
		var totalFee = this.sellerBaseFee() - this.get("sellerDiscount") + this.sellerTaxes();
		return totalFee > 0 ? totalFee.toFixed(2) : 0.00;
	},

	buyerTotalFee: function(){
		var totalFee = this.buyerBaseFee() - this.get("buyerDiscount") + this.buyerTaxes();
		return totalFee > 0 ? totalFee.toFixed(2) : 0.00;
	},

	calculateBaseFee: function(pricePerShare, numShares){
		var transactionValue = (pricePerShare * numShares);

		if (transactionValue === 0 || isNaN(transactionValue))
		{
			return 0;
		}

		if (transactionValue <= 25000)
		{
			return 600;
		}
		else if (transactionValue <= 50000)
		{
			return 1000;
		}
		else if (transactionValue <= 100000)
		{
			return 1500;
		}
		else if (transactionValue <= 200000)
		{
			return 2500;
		}
		else if (transactionValue <= 250000)
		{
			return 3125;
		}
		else if (transactionValue <= 300000)
		{
			return 3750;
		}
		else if (transactionValue <= 400000)
		{
			return 4000;
		}
		else if (transactionValue <= 500000)
		{
			return 5000;
		}
		else if (transactionValue <= 750000)
		{
			return 5625;
		}
		else
		{
			return 6250;
		}
	},

	//Validation
	validate: function()
	{
		var validated = true;

		if ((!this.get("sellerDiscount") && this.get("sellerDiscount") !== 0) || isNaN(this.get("sellerDiscount")))
		{
			this.$.sellerDiscountInput.setBorderError();
			validated = false;
		}

		if ((!this.get("buyerDiscount") && this.get("buyerDiscount") !== 0) || isNaN(this.get("buyerDiscount")))
		{
			this.$.buyerDiscountInput.setBorderError();
			validated = false;
		}

		return validated;
	},

	//Button Events
	handleGenerateSellerInvoiceButtonTapped: function(inSender, InEvent)
	{
		if (this.get("feesPaidBy") === "both" || this.get("feesPaidBy") === "seller")
		{
			this.doRequestGenerateSellerInvoice();
		}

		return true;
	},

	handleDownloadSellerInvoiceButtonTapped: function(inSender, InEvent)
	{
		if (this.get("sellerInvoiceID"))
		{
			this.doRequestDownloadSellerInvoice();
		}

		return true;
	},

	handleGenerateBuyerInvoiceButtonTapped: function(inSender, InEvent)
	{
		if (this.get("feesPaidBy") === "both" || this.get("feesPaidBy") === "buyer")
		{
			this.doRequestGenerateBuyerInvoice();
		}

		return true;
	},

	handleDownloadBuyerInvoiceButtonTapped: function(inSender, InEvent)
	{
		if (this.get("buyerInvoiceID"))
		{
			this.doRequestDownloadBuyerInvoice();
		}

		return true;
	}
});