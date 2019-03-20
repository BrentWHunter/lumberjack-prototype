enyo.kind({
	name: "lumberjack.DashboardPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		database: null,
		subscriptionCollection: null,
		filteredSubscriptionCollection: null,
		unassignedPayments: null,
		buildingReport: false,
		populatingCollection: false,
		populatingPayments: false,
		salespeople: null
	},

	events: {
		onRefreshUnassignedPayments: "",
		onViewItemDetail: "",
		onGoHome: "",
		onLogout: ""
	},

	computed: {
		shouldShowLoadingPopup: ["buildingReport", "populatingCollection", "populatingPayments"]
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{kind: "enyo.FittableRows", components: [
				{kind: "enyo.FittableRows", style: "border: 1px solid black; padding: 10px; width: 350px;", components: [
					{style: "font-weight: bold;", content: "Placement Stats"},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Planned Raise:", style: "width: 200px;"},
						{name: "plannedRaiseLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Raise Remaining:", style: "width: 200px;"},
						{name: "raiseRemainingLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 15px;", kind: "enyo.FittableColumns", components: [
						{content: "Total Subscriptions:", style: "width: 200px;"},
						{name: "totalSubscriptionsLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Subscriptions Complete:", style: "width: 200px;"},
						{name: "subscriptionsCompleteLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Subscriptions Closed:", style: "width: 200px;"},
						{name: "subscriptionsClosedLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Subscriptions Outstanding:", style: "width: 200px;"},
						{name: "subscriptionsOutstandingLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Subscriptions Cancelled:", style: "width: 200px;"},
						{name: "subscriptionsCancelledLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 15px;", kind: "enyo.FittableColumns", components: [
						{content: "Funds Pledged:", style: "width: 200px;"},
						{name: "fundsPledgedLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Funds Delivered:", style: "width: 200px;"},
						{name: "fundsDeliveredLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Funds Closed:", style: "width: 200px;"},
						{name: "fundsClosedLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Funds Outstanding:", style: "width: 200px;"},
						{name: "fundsOutstandingLabel", fit: true, style: "text-align: right;"}
					]}
				]}
				// {style: "margin-top: 10px;", showing: false, name: "emailClosedSubscribersButton", components: [
				// 	{kind: "enyo.Button", classes: "button", content: "Email Closed Subscribers", ontap: "handleEmailClosedSubscribersButtonTapped"}
				// ]}
			]},
			{fit: true, style: "text-align: center;", components: [
				{name: "fundsBreakdownChart", style: "display: inline-block;"},
				{name: "subscriptionStatusBreakdownChart", style: "display: inline-block;"},
				{name: "subscriptionFundsStatusBreakdownChart", style: "display: inline-block;"}
			]}
		]},
		{name: "unassignedPaymentsSection", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", content: "Unassigned Payments"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Sender", style: "width: 200px;"},
				{content: "Payment Amount", style: "width: 150px;"},
				{content: "Currency", style: "width: 75px;"},
				{content: "Date Received", style: "width: 150px;"},
				{content: "Additional Information", style: "width: 300px;"}
			]},
			{name: "unassignedPaymentsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupUnassignedPaymentRepeaterItem", components: [
				{name: 'paymentItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "paymentFrom", style: "width: 200px;"},
					{name: "paymentAmount", style: "width: 150px; text-align: right; padding-right: 15px;"},
					{name: "currency", style: "width: 75px;"},
					{name: "dateReceived", style: "width: 150px;"},
					{name: "additionalInformation", fit: true},
					{kind: "lumberjack.Button", enabledClasses: "button danger", style: "margin-left: 10px;", content: "Delete", ontap: "handleDeletePaymentButtonTapped"},
					{kind: "lumberjack.Button", style: "margin-left: 10px;", content: "View", ontap: "handleViewPaymentButtonTapped"},
					{kind: "lumberjack.Button", style: "margin-left: 10px;", content: "Assign", ontap: "handleAssignPaymentButtonTapped"}
				]}
			]}
		]},
		{name: "incompleteSubscriptionsSection", components: [
			{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", components: [
				{style: "font-size: 24px; line-height: 38px;", content: "Incomplete Subscriptions"},
				{fit: true},
				{style: "font-size: 18px; line-height: 38px;", content: "Filter by:"},
				{kind: "onyx.PickerDecorator", style: "margin-left: 10px", components: [
					{style: "width: 300px;"},
					{name: "filterIncompleteSubscriptionsPicker", kind: "onyx.Picker", onChange: "populateIncompleteSubscriptions", components: [
						{value: "all", content: "All Incomplete", active: true},
						{value: "new", content: "New"},
						{value: "incompleteDocsNoFunds", content: "Incomplete Docs, No Funds"},
						{value: "incompleteDocsPartialFunds", content: "Incomplete Docs, Partial Funds"},
						{value: "incompleteDocsAllFunds", content: "Incomplete Docs, All Funds"},
						{value: "completeDocsNoFunds", content: "Complete Docs, No Funds"},
						{value: "completeDocsPartialFunds", content: "Complete Docs, Partial Funds"}
					]}
				]}
			]},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Subscriber Name", style: "width: 200px;"},
				{content: "Contact Person", style: "width: 150px;"},
				{content: "Salesperson Name", style: "width: 150px;"},
				{content: "Subscription Status", style: "width: 200px;"},
				{content: "Signature Status", style: "width: 115px;"},
				{name: "verificationDocumentStatusHeader", content: "Verification Document Status", style: "width: 115px;"},
				{name: "verificationStatusHeader", content: "Verification Status", style: "width: 130px;"},
				{content: "Number Of Shares", style: "width: 130px;"},
				{content: "Subscription Amount", style: "width: 150px;"},
				{content: "Funds Received", style: "width: 100px;"},
				{content: "Country", style: "width: 75px; margin-left: 10px; text-align: center;"},
				{content: "State/Province", style: "width: 100px;text-align: center;"}
			]},
			{name: "incompleteSubscriptionRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupSubscriptionRepeaterItem", components: [
				{name: 'subscriptionItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", selected: false, layoutKind: "enyo.FittableColumnsLayout", ontap: "handleSubscriptionRepeaterItemTapped", components: [
					{name: "displayName", style: "width: 200px;"},
					{name: "contactPerson", style: "width: 150px;"},
					{name: "salespersonName", style: "width: 150px;"},
					{name: "subscriptionStatus", style: "width: 200px;"},
					{name: "agreementSignatureStatus", style: "width: 110px; text-align: center; margin-right: 5px;", components: [
						{name: "agreementSignatureStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "verificationDocumentStatus", style: "width: 110px; text-align: center; margin-right: 5px;", components: [
						{name: "verificationDocumentStatusDetail", content: "N/A"},
						{name: "verificationDocumentStatusIcon", kind: "enyo.Image", style: "height: 16px; width: 16px;"}
					]},
					{name: "verificationStatus", style: "width: 130px; text-align: center;"},
					{name: "numShares", style: "width: 130px; text-align: right; margin-left: -15px; margin-right: 15px;"},
					{name: "subscriberDollarAmount", style: "width: 150px; text-align: right; margin-left: -17px; margin-right: 17px;"},
					{name: "fundsReceived", style: "width: 100px; text-align: right; margin-left: -6px; margin-right: 6px;"},
					{name: "country", style: "width: 75px; margin-left: 10px; text-align: center;"},
					{name: "stateProvince", style: "width: 100px; text-align: center;"}
				]}
			]},
			{name: "noResultsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Results"}
		]},
		{name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	bindings: [
		{from: ".shouldShowLoadingPopup", to: ".$.loadingPopup.showing"},
		{from: ".filteredSubscriptionCollection", to: ".$.incompleteSubscriptionsSection.showing", transform: function(v){
			if (this.$.filterIncompleteSubscriptionsPicker.get("selected").value === "all")
			{
				return v && v.length > 0;
			}
			else
			{
				return true;
			}
		}},
		{from: ".filteredSubscriptionCollection", to: ".$.noResultsLabel.showing", transform: function(v){
				return !v || v.length === 0;
		}},
		{from: ".unassignedPayments", to: ".$.unassignedPaymentsSection.showing", transform: function(v){
			return v && v.payments && v.payments.length > 0;
		}}
	],
	setShowingForRoles: function()
	{
		//this.$.emailClosedSubscribersButton.set("showing", lumberjack.hasRole(["admins"], "placement"));
		this.$.unassignedPaymentsSection.set("showing", this.$.unassignedPaymentsSection.get("showing") && lumberjack.hasRole(["admins","users"], "placement"));
		this.$.verificationDocumentStatusHeader.set("showing", lumberjack.preferences.get("placementInfo").is506cFinancing);
		this.$.verificationStatusHeader.set("showing", lumberjack.preferences.get("placementInfo").is506cFinancing);
	},

	activate: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users","auditors"], "placement")) { this.doGoHome(); return; }

		this.setShowingForRoles();

		this.$.incompleteSubscriptionRepeater.setCount(0);
		this.$.unassignedPaymentsRepeater.setCount(0);
		this.populateIncompleteSubscriptions();
		this.populateUnassignedPayments();
		this.buildReport();
	},

	shouldShowLoadingPopup: function(){
		return this.get("buildingReport") || this.get("populatingCollection") || this.get("populatingPayments");
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	/*****************
	* Report Section
	*****************/

	buildReport: function(inSender, inEvent)
	{
		this.set("buildingReport", true);

		//Set Total Subscription Stats
		this.$.plannedRaiseLabel.set("content", "$" + lumberjack.formatCurrency(lumberjack.preferences.get("placementInfo").placementTotal));
		this.$.totalSubscriptionsLabel.set("content", this.get("subscriptionCollection").calculateTotalSubscriptions());
		this.$.subscriptionsCompleteLabel.set("content", this.get("subscriptionCollection").calculateSubscriptionsComplete());
		this.$.subscriptionsClosedLabel.set("content", this.get("subscriptionCollection").calculateSubscriptionsClosed());
		this.$.subscriptionsOutstandingLabel.set("content", this.get("subscriptionCollection").calculateSubscriptionsOutstanding());
		this.$.subscriptionsCancelledLabel.set("content", this.get("subscriptionCollection").calculateSubscriptionsCancelled());

		var fundsPledged = this.get("subscriptionCollection").calculateFundsPledged();
		var fundsDelivered = this.get("subscriptionCollection").calculateFundsDelivered();
		var fundsClosed = this.get("subscriptionCollection").calculateFundsClosed();
		var fundsOutstanding = fundsPledged - fundsDelivered - fundsClosed;

		this.$.fundsPledgedLabel.set("content", "$" + lumberjack.formatCurrency(fundsPledged));
		this.$.fundsDeliveredLabel.set("content", "$" + lumberjack.formatCurrency(fundsDelivered));
		this.$.fundsClosedLabel.set("content", "$" + lumberjack.formatCurrency(fundsClosed));
		this.$.fundsOutstandingLabel.set("content", "$" + lumberjack.formatCurrency(fundsOutstanding));
		this.$.raiseRemainingLabel.set("content", "$" + lumberjack.formatCurrency(lumberjack.preferences.get("placementInfo").placementTotal - fundsPledged));

		try
		{
			// Create the data table.
			var fundsPledged = this.get("subscriptionCollection").calculateFundsPledged();
			var fundsDelivered = this.get("subscriptionCollection").calculateFundsDelivered();
			var fundsClosed = this.get("subscriptionCollection").calculateFundsClosed();
			var fundsOutstanding = fundsPledged - fundsDelivered - fundsClosed;
			var fundsData = new google.visualization.DataTable();
			fundsData.addColumn('string', 'Category');
			fundsData.addColumn('number', '$ Amount');
			fundsData.addRows([
				['Funds Delivered ($)', fundsDelivered],
				['Funds Outstanding ($)', fundsOutstanding],
				['Funds Closed ($)', fundsClosed],
				['Raise Remaining ($)', lumberjack.preferences.get("placementInfo").placementTotal - fundsPledged]
			]);

			// Set chart options
			var options = {
				'title': 'Funds Raised',
				'width': 500,
				'height': 500
			};

			// Instantiate and draw our chart, passing in some options.
			var fundsChart = new google.visualization.PieChart(document.getElementById(this.$.fundsBreakdownChart.id));
			fundsChart.draw(fundsData, options);
		}
		catch (err) { console.log('Error building "Funds" chart!', err); }

		try
		{
			// Create the data table.
			var subscriptionStatusBreakdown = this.get("subscriptionCollection").calculateSubscriptionStatusBreakdown();
			var subscriptionStatusBreakdownData = new google.visualization.DataTable();
			subscriptionStatusBreakdownData.addColumn('string', 'Status');
			subscriptionStatusBreakdownData.addColumn('number', 'Subscriptions');
			subscriptionStatusBreakdownData.addRows(subscriptionStatusBreakdown);

			// Set chart options
			var options = {
				'title': 'Subscription Breakdown by Status',
				'width': 400,
				'height': 500,
				legend: {
					position: 'top',
					maxLines: 3
				},
				bar: {
					groupWidth: '75%'
				},
			};

			// Instantiate and draw our chart, passing in some options.
			var subscriptionStatusBreakdownChart = new google.visualization.BarChart(document.getElementById(this.$.subscriptionStatusBreakdownChart.id));
			subscriptionStatusBreakdownChart.draw(subscriptionStatusBreakdownData, options);
		}
		catch (err) { console.log('Error building "Subscription Status Breakdown" chart!', err); }

		try
		{
			// Create the data table.
			var subscriptionFundsStatusBreakdownData = google.visualization.arrayToDataTable(this.get("subscriptionCollection").calculateSubscriptionFundsStatusBreakdown());

			// Set chart options
			var options = {
				'title': 'Funds Breakdown by Status',
				'width': 400,
				'height': 500,
				legend: {
					position: 'top',
					maxLines: 3
				},
				bar: {
					groupWidth: '75%'
				},
				hAxis: {
					format: 'currency'
				},
				isStacked: true
			};

			// Instantiate and draw our chart, passing in some options.
			var subscriptionFundsStatusBreakdownChart = new google.visualization.BarChart(document.getElementById(this.$.subscriptionFundsStatusBreakdownChart.id));
			subscriptionFundsStatusBreakdownChart.draw(subscriptionFundsStatusBreakdownData, options);
		}
		catch (err) { console.log('Error building "Funds Received By Status Breakdown" chart!', err); }

		this.set("buildingReport", false);
	},

	/*****************
	* Repeater Section
	*****************/

	populateIncompleteSubscriptions: function(){
		if (!this.get("subscriptionCollection")) {return;}

		this.set("populatingCollection", true);
		var filterFunction = function(value, index, array){
			var subInfo = value.get("subscriptionInfo");
			if (subInfo.subscriptionStatus === "complete" || subInfo.subscriptionStatus === "closed" || subInfo.subscriptionStatus === "cancelled") {return false;}

			if (this.$.filterIncompleteSubscriptionsPicker.get("selected").value === "all")
			{
				return true;
			}

			return this.$.filterIncompleteSubscriptionsPicker.get("selected").value === subInfo.subscriptionStatus;
		};

		var filteredResults = this.get("subscriptionCollection").filter(enyo.bind(this, filterFunction));

		this.set("filteredSubscriptionCollection", new lumberjack.SubscriptionCollection(filteredResults));
		this.$.incompleteSubscriptionRepeater.setCount(this.get("filteredSubscriptionCollection").length);
		this.set("populatingCollection", false);
	},

	setupSubscriptionRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		var getDocumentStatus = function(doc)
		{
			if (doc.signed)
			{
				return "assets/icons/circle-icon-green.png";
			}

			if (doc.sent)
			{
				return "assets/icons/circle-icon-yellow.png";
			}

			if (doc.generated)
			{
				return "assets/icons/circle-icon-red.png";
			}

			return "assets/icons/circle-icon-grey.png";
		};

		var getVerifyInvestorStatus = function(doc)
		{
			var retVal = "assets/icons/circle-icon-grey.png";

			if (!doc.linkAccountRequestSent)
			{
				return retVal;
			}

			if (doc.linkAccountRequestSent && doc.verifyInvestorID)
			{
				retVal = "assets/icons/circle-icon-red.png";
			}

			if (doc.verificationRequestID)
			{
				retVal = "assets/icons/circle-icon-yellow.png";
			}

			if (doc.verificationRequestID && (doc.verificationRequestStatus === "accredited" || doc.verificationRequestStatus === "not_accredited"))
			{
				retVal = "assets/icons/circle-icon-green.png";
			}

			return retVal;
		};

		var repItem = this.get("filteredSubscriptionCollection").at(inEvent.index);

		var agreementSignatureStatusIconSrc = getDocumentStatus(repItem.get("subscriptionAgreementDoc"));

		if (lumberjack.preferences.get("placementInfo").is506cFinancing)
		{
			inEvent.item.$.verificationDocumentStatus.set("showing", true);
			inEvent.item.$.verificationStatus.set("showing", true);

			if (repItem.get("subscriptionInfo").jurisdiction === "usa" && !repItem.get("subscriptionInfo").clientIdentityValidator.get("verifyManually"))
			{
				inEvent.item.$.verificationDocumentStatusDetail.set("showing", false);
				inEvent.item.$.verificationDocumentStatusIcon.set("showing", true);
				inEvent.item.$.verificationDocumentStatusIcon.set("src", repItem.get("subscriptionInfo").clientIdentityValidator.get("verificationSource") === "thirdParty" ? getDocumentStatus(repItem.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc")) : getVerifyInvestorStatus(repItem.get("subscriptionInfo").clientIdentityValidator.get("identityVerificationDoc")));
			}
			else
			{
				inEvent.item.$.verificationDocumentStatusDetail.set("showing", true);
				inEvent.item.$.verificationDocumentStatusIcon.set("showing", false);
			}

			if (repItem.get("subscriptionInfo").jurisdiction === "usa")
			{
				var verificationStatus = "";
				var verificationColor = "black";
				switch (repItem.get("subscriptionInfo").clientIdentityValidator.get("verificationStatus"))
				{
					case "pending":
						verificationStatus = "Pending";
						break;
					case "verified":
						verificationStatus = "Verified";
						verificationColor = "green";
						break;
					case "notVerified":
						verificationStatus = "Not Verified";
						verificationColor = "red";
						break;
				}

				inEvent.item.$.verificationStatus.set("content", verificationStatus);
				inEvent.item.$.verificationStatus.applyStyle("color", verificationColor);
			}
			else
			{
				inEvent.item.$.verificationStatus.set("content", "N/A");
				inEvent.item.$.verificationStatus.applyStyle("color", "black");
			}
		}
		else
		{
			inEvent.item.$.verificationDocumentStatus.set("showing", false);
			inEvent.item.$.verificationStatus.set("showing", false);
		}

		inEvent.item.$.subscriptionItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.displayName.set("content", repItem.get("contactInfo").displayName ? repItem.get("contactInfo").displayName : "");
		inEvent.item.$.contactPerson.set("content", repItem.get("contactInfo").corporateInfo.contactPerson ? repItem.get("contactInfo").corporateInfo.contactPerson : "");
		inEvent.item.$.salespersonName.set("content", (repItem.get("subscriptionInfo").salespersonID != null && repItem.get("subscriptionInfo").salespersonID !== "") ? this.get("salespeople") ? this.get("salespeople")[repItem.get("subscriptionInfo").salespersonID].salespersonName: "" : "");
		inEvent.item.$.subscriptionStatus.set("content", lumberjack.subscriptionStatusLookup(repItem.get("subscriptionInfo").subscriptionStatus));
		inEvent.item.$.agreementSignatureStatusIcon.set("src", agreementSignatureStatusIconSrc);
		inEvent.item.$.numShares.set("content", repItem.get("subscriptionInfo").numShares ? numeral(repItem.get("subscriptionInfo").numShares).format('0,0') : "0");
		inEvent.item.$.subscriberDollarAmount.set("content", repItem.get("subscriptionInfo").subscriberDollarAmount ? "$" + lumberjack.formatCurrency(repItem.get("subscriptionInfo").subscriberDollarAmount) : "$0");
		inEvent.item.$.fundsReceived.set("content", repItem.get("subscriptionInfo").fundsReceived ? "$" + lumberjack.formatCurrency(repItem.get("subscriptionInfo").fundsReceived) : "$0");
		inEvent.item.$.country.set("content", repItem.get("contactInfo").addressInfo.country ? repItem.get("contactInfo").addressInfo.country : "");
		inEvent.item.$.stateProvince.set("content", repItem.get("contactInfo").addressInfo.stateProvince ? repItem.get("contactInfo").addressInfo.stateProvince : "");
		return true;
	},

	handleSubscriptionRepeaterItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({item: this.get("filteredSubscriptionCollection").at(inEvent.index), collection: this.get("filteredSubscriptionCollection")});
	},

	/*****************
	* Unassigned Payments Repeater Section
	*****************/

	populateUnassignedPayments: function(){
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		if (!this.get("unassignedPayments")) {return true;}
		this.set("populatingPayments", true);

		//Force the bindings to refresh
		var tempUnassignedPayments = this.get("unassignedPayments");
		this.set("unassignedPayments", null);
		this.set("unassignedPayments", tempUnassignedPayments);

		this.$.unassignedPaymentsRepeater.setCount(this.get("unassignedPayments").payments.length);
		this.set("populatingPayments", false);
	},

	setupUnassignedPaymentRepeaterItem: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		if (!inEvent.item) {return true;}

		inEvent.item.$.paymentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.paymentFrom.set("content", this.get("unassignedPayments").payments[inEvent.index].sender);
		inEvent.item.$.paymentAmount.set("content", "$" + lumberjack.formatCurrency(this.get("unassignedPayments").payments[inEvent.index].amount));
		inEvent.item.$.currency.set("content", this.get("unassignedPayments").payments[inEvent.index].currency);
		inEvent.item.$.dateReceived.set("content", this.get("unassignedPayments").payments[inEvent.index].valueDate);
		inEvent.item.$.additionalInformation.set("content", this.get("unassignedPayments").payments[inEvent.index].additionalInformation);
		return true;
	},

	handleAssignPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		if (this.$.assignPaymentPopup) {
			this.$.assignPaymentPopup.hide();
			this.$.assignPaymentPopup.destroy();
		}
		this.createComponent({name: "assignPaymentPopup", kind: "lumberjack.AssignPaymentPopup", subscriptionCollection: this.get("filteredSubscriptionCollection"), payment: this.get("unassignedPayments").payments[inEvent.index], onAssignPayment: "handleAssignPayment", onHide: "handlePopupHidden"} , {owner:this});
		this.$.assignPaymentPopup.show();
	},

	handleAssignPayment: function(inSender, inEvent)
	{
		this.set("populatingPayments", true);
		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.set("populatingPayments", false);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			//First, set up the local objects
			var paymentToAssign = inEvent.payload;

			var subscriptionResult = this.get("filteredSubscriptionCollection").find(function(value, index, array){
				return value.get("_id") === paymentToAssign.targetID;
			});

			if (!subscriptionResult)
			{
				alertify.error("Could not find payment to assign");
				return true;
			}

			//Next, get the attatchment so that we can guarantee that it exists in order to move it.
			this.get("database").getAttachment("unassignedPayments", paymentToAssign.payment.filename, enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.set("populatingPayments", false);
					return;
				}

				//Next, muck with the local objects
				if (!subscriptionResult.get("paymentsReceived"))
				{
					subscriptionResult.set("paymentsReceived", []);
				}

				subscriptionResult.get("paymentsReceived").push({
					name: paymentToAssign.payment.filename,
					payerName: paymentToAssign.payment.sender,
					amount: paymentToAssign.amount,
					paymentType: "wire",
					receivedDate: moment(paymentToAssign.payment.valueDate).format("YYYY/MM/DD"),
					fileType: "application/pdf",
					rawPaymentData: paymentToAssign.payment
				});

				subscriptionResult.set("fundsReceived", lumberjack.parseFloat(subscriptionResult.get("fundsReceived")) + paymentToAssign.amount);

				if (!subscriptionResult.get("_attachments"))
				{
					subscriptionResult.set("_attachments", {});
				}

				subscriptionResult.get("_attachments")[paymentToAssign.payment.filename] = {
					"content_type": "application/pdf",
					"data": response
				};

				if (paymentToAssign.payment.amount - paymentToAssign.amount <= 0)
				{
					delete this.get("unassignedPayments")._attachments[paymentToAssign.payment.filename];
					var paymentIndex = this.get("unassignedPayments").payments.indexOf(paymentToAssign.payment);
					this.get("unassignedPayments").payments.splice(paymentIndex, 1);
				}
				else
				{
					paymentToAssign.payment.amount = paymentToAssign.payment.amount - paymentToAssign.amount;
				}

				//Finally, commit the changed objects and refresh the repeaters
				this.get("database").bulkDocs([this.get("unassignedPayments"), subscriptionResult.raw()], enyo.bind(this, function(err, response){
					this.set("populatingPayments", false);

					if (err)
					{
						alertify.error("Failed to update database");
						console.log(err);
						this.doRefreshUnassignedPayments();
						return;
					}

					response.forEach(enyo.bind(this, function(value, index, array){
						if (value.error)
						{
							alertify.error("Failed To Update Record");
							console.log("Failed To Update Record", value);
						}

						if (value.id === "unassignedPayments")
						{
							this.get("unassignedPayments")._rev = value.rev;
						}
						else
						{
							subscriptionResult.set("_rev", value.rev);
						}
					}));

					//Send the success email - best effort
					var ajaxProperties = {
						cacheBust: false,
						contentType: "application/json",
						method: "POST",
						url: lumberjack.preferences.get("apiServer") + "mailDaemon"
					};

					var tempVars = {};

					if (subscriptionResult.get("contactInfo").corporateInfo.contactPerson !== undefined && subscriptionResult.get("contactInfo").corporateInfo.contactPerson!== "")
					{
						tempVars.contactPerson = subscriptionResult.get("contactInfo").corporateInfo.contactPerson;
					}

					if (subscriptionResult.get("contactInfo").subscriberName !== undefined && subscriptionResult.get("contactInfo").subscriberName !== "")
					{
						tempVars.subscriberName = subscriptionResult.get("contactInfo").subscriberName;
					}

					tempVars.newPaymentAmount = lumberjack.parseFloat(paymentToAssign.amount).toFixed(2);
					tempVars.paymentRemaining = lumberjack.parseFloat( lumberjack.parseFloat(subscriptionResult.get("subscriptionInfo").subscriberDollarAmount) - lumberjack.parseFloat(subscriptionResult.get("subscriptionInfo").fundsReceived)).toFixed(2);
					tempVars.companyName = lumberjack.preferences.attributes.placementInfo.companyInfo.companyName;
					ajaxProperties.postBody = {data: tempVars, placement: subscriptionResult.get("target"), record: subscriptionResult.get("_id"), templateName: "Funds Received", username: lumberjack.preferences.get("username"), password: lumberjack.preferences.get("password")};

					var ajax = new enyo.Ajax(ajaxProperties);

					ajax.response(function(request, response) {
					if (!response.error)
						{
							console.log(response);
							alertify.success("Mail Sent");
						}
						else
						{
							console.log(response);
							alertify.error("Mail Failed To Send");
						}
					}, this);

					ajax.error(function(request, response) {
						console.log("Ajax Error: ",request, response);
					}, this);

					ajax.go();

					alertify.success("Successfully updated database");
					this.activate();
					this.doViewItemDetail({item: subscriptionResult, collection: this.get("filteredSubscriptionCollection")});
				}));
			}));
		}));
	},

	handleDeletePaymentButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		this.set("populatingPayments", true);
		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.set("populatingPayments", false);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}


			delete this.get("unassignedPayments")._attachments[this.get("unassignedPayments").payments[inEvent.index].filename];
			this.get("unassignedPayments").payments.splice(inEvent.index, 1);

			//Then commit the changed object and refresh the repeaters
			//TODO: Activate the subscriber detail page automatically?
			this.get("database").post(this.get("unassignedPayments"), enyo.bind(this, function(err, response){
				this.set("populatingPayments", false);

				if (err)
				{
					alertify.error("Failed to update database");
					console.log(err);
					return;
				}

				this.get("unassignedPayments")._rev = response.rev;

				alertify.success("Successfully updated database");
				this.activate();
			}));
		}));
	},

	handleViewPaymentButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins","users"], "placement")) { return; }

		this.set("populatingPayments", true);
		this.get("database").login(lumberjack.preferences.get("username"), lumberjack.preferences.get("password"), enyo.bind(this, function(err, response){
			if (err)
			{
				alertify.error("Login Failed");
				console.log(err);
				this.set("populatingPayments", false);
				if(err.status == 401){
					this.doLogout();
					return;
				}
				return;
			}

			this.get("database").get("unassignedPayments", {attachments: true}, enyo.bind(this, function(err, response){
				if (err)
				{
					alertify.error("Get Attachment Failed");
					console.log(err);
					this.set("populatingPayments", false);
					return;
				}

				var attachment = response._attachments[this.get("unassignedPayments").payments[inEvent.index].filename];

				var data = lumberjack.b64ToBlob(attachment.data, "application/pdf");
				var url = URL.createObjectURL(data);
				this.set("populatingPayments", false);
				window.open(url);
			}));
		}));
	},

	/*****************
	* Report Generation
	*****************/

	handleEmailClosedSubscribersButtonTapped: function(inSender, inEvent)
	{
		if (!lumberjack.hasRole(["admins"], "placement")) { return; }

		var subscribersEmails = "";
		this.subscriptionCollection.forEach(enyo.bind(this, function(value, index, array){
			if (value.get("subscriptionStatus") === "closed" && value.get("emailAddress"))
			{
				subscribersEmails = subscribersEmails + value.get("emailAddress") + ";";
			}
		}));

		if (subscribersEmails !== "")
		{
			var emailWindow = window.open("mailto:?bcc=" + subscribersEmails);
			setTimeout(enyo.bind(this, function(){
				emailWindow.close();
			}), 500);
		}
	}
});