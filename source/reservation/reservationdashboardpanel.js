enyo.kind({
	name: "quantum.ReservationDashboardPanel",
	kind: "enyo.Scroller",
	fit: true,

	style: "padding: 15px;",

	published: {
		database: null,
		reservationCollection: null,
		filteredReservationCollection: null,
		buildingReport: false,
		populatingCollection: false,
		placements: null,
		salespeople: null,
		selectedPlacement: null,
		filterColumn: "reservationName",
		filterDirection: "asc",
		activeSalespeople: null,
		selectedSalesperson: null
	},

	events: {
		onViewEventDetail: "",
		onViewItemDetail: "",
		onGoHome: ""
	},

	_totalShares: 0,
	_totalReservations: 0,
	_sharesComplete: 0,
	_reservationsComplete: 0,

	computed: {
		shouldShowLoadingPopup: ["buildingReport", "populatingCollection"]
	},

	components: [
		{kind: "enyo.FittableColumns", components: [
			{kind: "enyo.FittableRows", components: [
				{kind: "enyo.FittableRows", style: "border: 1px solid black; padding: 10px; width: 350px;", components: [
					{style: "font-weight: bold;", content: "Reservation Stats"},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Number of Shares:", style: "width: 200px;"},
						{name: "numSharesLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Number of Reservations:", style: "width: 200px;"},
						{name: "numReservationsLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 15px;", kind: "enyo.FittableColumns", components: [
						{content: "Number of Shares Complete:", style: "width: 200px;"},
						{name: "numSharesCompleteLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Reservations Complete:", style: "width: 200px;"},
						{name: "numReservationsCompleteLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 15px;", kind: "enyo.FittableColumns", components: [
						{content: "Number of Shares Remaining:", style: "width: 200px;"},
						{name: "numSharesRemainingLabel", fit: true, style: "text-align: right;"}
					]},
					{style: "margin-top: 5px;", kind: "enyo.FittableColumns", components: [
						{content: "Reservations Remaining:", style: "width: 200px;"},
						{name: "numReservationsRemainingLabel", fit: true, style: "text-align: right;"}
					]}
				]}
			]},
			{fit: true, style: "text-align: left;", components: [
				{name: "numSharesBySalespersonBreakdownChart", style: "margin-left: 30px; display: inline-block;"},
				{name: "numReservationsBySalespersonBreakdownChart", style: "margin-left: 30px; display: inline-block;"}
			]}
		]},
		{kind: "enyo.FittableColumns", style: "padding-bottom: 5px; border-bottom: 1px solid black; margin-top: 25px;", components: [
			{style: "font-size: 24px; line-height: 38px;", content: "Reservation Detail"},
			{fit: true},
			{name: "filterSalespeopleSection", kind: "enyo.FittableColumns", components: [
				{style: "font-size: 18px; line-height: 38px;", content: "Filter by:"},
				{kind: "onyx.PickerDecorator", style: "margin-left: 10px", components: [
					{style: "width: 300px;"},
					{name: "filterSalespeoplePicker", kind: "onyx.Picker", onChange: "filterSalespeoplePickerChanged"}
				]}
			]}
		]},
		{name: "headerColumns", kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
			{content: "Reservation Name &uarr;", allowHtml: true, style: "width: 200px; cursor: pointer;", sortTarget: "reservationName", ontap: "sortColumnTapped"},
			{content: "Email Address ", allowHtml: true, style: "width: 250px; cursor: pointer;", sortTarget: "emailAddress", ontap: "sortColumnTapped"},
			{content: "Cell Phone ", allowHtml: true, style: "width: 200px; cursor: pointer;", sortTarget: "cellPhone", ontap: "sortColumnTapped"},
			{content: "Number of Shares ", allowHtml: true, style: "width: 135px; cursor: pointer;", sortTarget: "numShares", ontap: "sortColumnTapped"},
			{content: "Salesperson Name ", allowHtml: true, style: "width: 200px; cursor: pointer;", sortTarget: "salespersonName", ontap: "sortColumnTapped"},
			{content: "Date/Time Reserved ", allowHtml: true, style: "width: 250px; cursor: pointer;", sortTarget: "dateTimeReserved", ontap: "sortColumnTapped"},
			{content: "Subscription ", style: "width: 200px;"}
		]},
		{name: "reservationsRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupReservationRepeaterItem", components: [
			{name: 'reservationItem', style: "background-color: white; border-bottom: 1px solid black; padding: 5px; cursor: pointer;", selected: false, ontap: "handleReservationItemTapped", layoutKind: "enyo.FittableColumnsLayout", components: [
				{name: "reservationName", style: "width: 200px; line-height: 34px;"},
				{name: "emailAddress", style: "width: 250px; line-height: 34px;"},
				{name: "cellPhone", style: "width: 200px; line-height: 34px;"},
				{name: "numShares", style: "width: 135px; text-align: right; padding-right: 10px; line-height: 34px;"},
				{name: "salespersonName", style: "width: 200px; line-height: 34px;"},
				{name: "dateTimeReserved", style: "width: 250px; line-height: 34px;"},
				{style: "width: 200px;", components: [
					{name: "viewSubscriptionButton", kind: "quantum.Button", enabledClasses: "button", content: "View Subscription", ontap: "handleViewSubscriptionButtonTapped"}
				]}
			]}
		]},
		{name: "noResultsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Results"},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings: [
		{from: ".shouldShowLoadingPopup", to: ".$.loadingPopup.showing"},
		{from: ".filteredReservationCollection.length", to: ".$.noResultsLabel.showing", transform: function(v){return v === 0;}}
	],

	setShowingForRoles: function()
	{
		//Nothing to do here.
	},

	activate: function(inSender, inEvent)
	{
		if (!quantum.hasRole(["admins","users","auditors"], "reservation")) { this.doGoHome(); return; }

		this.setShowingForRoles();
		this.buildReport();
	},

	shouldShowLoadingPopup: function(){
		return this.get("buildingReport") || this.get("populatingCollection");
	},

	handlePopupHidden: function(inSender, inEvent){
		inEvent.originator.destroy();
		this.resize();
	},

	populateSalespeople: function() {
		this.$.filterSalespeoplePicker.set("selected", null);
		this.$.filterSalespeoplePicker.destroyClientControls();

		var pickerItems = [
			{salespersonID: "all", content: "All Salespeople"}
		];

		var salespeople = this.get("placements")[this.get("selectedPlacement")].salespeople;

		var activeSalespersonFound = false;
		if (salespeople)
		{
			salespeople.sort(function(a, b){
				if(a.salespersonName.toLowerCase() < b.salespersonName.toLowerCase()) {return -1;}
				if(a.salespersonName.toLowerCase() > b.salespersonName.toLowerCase()) {return 1;}
				return 0;
			});

			salespeople.forEach(enyo.bind(this, function(value, index, array){
				if (value.salespersonID === this.get("selectedSalesperson"))
				{
					activeSalespersonFound = true;
				}
				pickerItems.push({salespersonID: value.salespersonID, content: value.salespersonName, active: value.salespersonID === this.get("selectedSalesperson")});
			}));
		}

		this.set("activeSalespeople", salespeople || []);
		
		if (!activeSalespersonFound)
		{
			pickerItems[0].active = true; //We know that this will be the "all salespeople" picker item.
			this.set("selectedSalesperson", "all");
		}

		this.$.filterSalespeoplePicker.createComponents(pickerItems, {owner: this});
		this.$.filterSalespeopleSection.set("showing", pickerItems.length > 1);
		this.$.filterSalespeoplePicker.render();

		this.filterReservations();
	},

	selectedPlacementChanged: function() {
		this.populateSalespeople();
		//Don't need to re-filter reservations here, since this will trigger a change in salespeople.
	},

	filterSalespeoplePickerChanged: function(){
		if (this.get("selectedSalesperson") !== this.$.filterSalespeoplePicker.get("selected").salespersonID)
		{
			this.set("selectedSalesperson", this.$.filterSalespeoplePicker.get("selected").salespersonID);
			this.filterReservations();
		}
	},

	filterReservations: function(){
		this.set("populatingCollection", true);

		var reservations = [];
		this._totalShares = 0;
		this._totalReservations = 0;
		this._sharesComplete = 0;
		this._reservationsComplete = 0;

		this.get("activeSalespeople").forEach(function(value, index, array){
			value.numShares = 0;
			value.numReservations = 0;
			value.numReservationsComplete = 0;
		});

		this.reservationCollection.forEach(enyo.bind(this, function(value, index, array){
			if (value.get("placementID") === this.get("selectedPlacement"))
			{
				var salespersonID = this.$.filterSalespeoplePicker.get("selected").salespersonID;
				var sharesAvailable = numeral(value.get("numShares")).value();
				this._totalShares += sharesAvailable;
				this._totalReservations++;

				if (value.get("subscriptionID"))
				{
					this._sharesComplete += sharesAvailable;
					this._reservationsComplete++;
				}

				this.get("activeSalespeople").forEach(function(innerValue, innerIndex, innerArray){
					if (innerValue.salespersonID === value.get("salespersonID"))
					{
						innerValue.numShares += sharesAvailable;
						innerValue.numReservations++;

						if (value.get("subscriptionID"))
						{
							innerValue.numReservationsComplete++;
						}
					}
				});

				if (salespersonID === "all" || value.get("salespersonID") === salespersonID)
				{
					reservations.push(value);
				}
			}
		}));

		//Sort!
		var sortFunction = function() {return 0;};

		switch(this.get("filterColumn"))
		{
			case "reservationName":
				sortFunction = function(a, b) {
					if(a.get("name").toLowerCase() < b.get("name").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("name").toLowerCase() > b.get("name").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "emailAddress":
				sortFunction = function(a, b) {
					if(a.get("emailAddress").toLowerCase() < b.get("emailAddress").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("emailAddress").toLowerCase() > b.get("emailAddress").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "cellPhone":
				sortFunction = function(a, b) {
					if(a.get("cellPhone").toLowerCase() < b.get("cellPhone").toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("cellPhone").toLowerCase() > b.get("cellPhone").toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "numShares":
				sortFunction = function(a, b) {
					if(a.get("numShares") < b.get("numShares")) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(a.get("numShares") > b.get("numShares")) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "salespersonName":
				sortFunction = function(a, b) {
					if(this.get("salespeople")[a.get("salespersonID")].salespersonName.toLowerCase() < this.get("salespeople")[b.get("salespersonID")].salespersonName.toLowerCase()) {return this.get("filterDirection") === "asc" ? -1 : 1;}
					if(this.get("salespeople")[a.get("salespersonID")].salespersonName.toLowerCase() > this.get("salespeople")[b.get("salespersonID")].salespersonName.toLowerCase()) {return this.get("filterDirection") === "asc" ? 1 : -1;}
					return 0;
				};
				break;
			case "dateTimeReserved":
				sortFunction = function(a, b) {
					if (this.get("filterDirection") === "asc") {return a.get("dateTimeCreated") - b.get("dateTimeCreated");}
					else if (this.get("filterDirection") === "desc") {return b.get("dateTimeCreated") - a.get("dateTimeCreated");}
				};
				break;
		}

		reservations.sort(enyo.bind(this, sortFunction));

		this.set("filteredReservationCollection", new enyo.Collection(reservations));

		this.$.reservationsRepeater.setCount(reservations.length);

		this.set("populatingCollection", false);
		this.resize();
		this.buildReport();
	},

	/*****************
	* Report Section
	*****************/

	buildReport: function(inSender, inEvent)
	{
		this.set("buildingReport", true);

		//Set Total Subscription Stats
		this.$.numSharesLabel.set("content", numeral(this._totalShares).format("0,0"));
		this.$.numReservationsLabel.set("content", numeral(this._totalReservations).format("0,0"));

		this.$.numSharesCompleteLabel.set("content", numeral(this._sharesComplete).format("0,0"));
		this.$.numReservationsCompleteLabel.set("content", numeral(this._reservationsComplete).format("0,0"));

		this.$.numSharesRemainingLabel.set("content", numeral(this._totalShares - this._sharesComplete).format("0,0"));
		this.$.numReservationsRemainingLabel.set("content", numeral(this._totalReservations - this._reservationsComplete).format("0,0"));

		if (this.get("activeSalespeople") && this.get("activeSalespeople").length > 0)
		{	
			try
			{
				// Create the data table.
				var numSharesBySalespersonBreakdown = [];
				this.get("activeSalespeople").forEach(function(value, index, array){
					numSharesBySalespersonBreakdown.push([value.salespersonName, value.numShares]);
				});
				var numSharesBySalespersonBreakdownData = new google.visualization.DataTable();
				numSharesBySalespersonBreakdownData.addColumn('string', 'Salesperson');
				numSharesBySalespersonBreakdownData.addColumn('number', 'Number of Shares');
				numSharesBySalespersonBreakdownData.addRows(numSharesBySalespersonBreakdown);

				// Set chart options
				var options = {
					'title': 'Number of Shares By Salesperson',
					'width': 500,
					'height': 500,
					legend: {
						position: 'top',
						maxLines: 3
					},
					bar: {
						groupWidth: '75%'
					},
					chartArea: {width: "48%"}
				};

				// Instantiate and draw our chart, passing in some options.
				this.$.numSharesBySalespersonBreakdownChart.set("showing", true);
				var numSharesBySalespersonBreakdownChart = new google.visualization.BarChart(document.getElementById(this.$.numSharesBySalespersonBreakdownChart.id));
				numSharesBySalespersonBreakdownChart.draw(numSharesBySalespersonBreakdownData, options);
			}
			catch (err) { console.log('Error building "Num Shares By Salesperson Breakdown" chart!', err); }

			try
			{
				// Create the data table.
				var numReservationsBySalespersonBreakdown = [];
				this.get("activeSalespeople").forEach(function(value, index, array){
					numReservationsBySalespersonBreakdown.push([value.salespersonName, value.numReservationsComplete, value.numReservations - value.numReservationsComplete]);
				});
				var numReservationsBySalespersonBreakdownData = new google.visualization.DataTable();
				numReservationsBySalespersonBreakdownData.addColumn('string', 'Salesperson');
				numReservationsBySalespersonBreakdownData.addColumn('number', 'Reservations Complete');
				numReservationsBySalespersonBreakdownData.addColumn('number', 'Reservations Outstanding');
				numReservationsBySalespersonBreakdownData.addRows(numReservationsBySalespersonBreakdown);

				// Set chart options
				var options = {
					'title': 'Number of Reservations By Salesperson',
					'width': 500,
					'height': 500,
					legend: {
						position: 'top',
						maxLines: 3
					},
					bar: {
						groupWidth: '75%'
					},
					isStacked: true,
					chartArea: {width: "48%"}
				};

				// Instantiate and draw our chart, passing in some options.
				this.$.numReservationsBySalespersonBreakdownChart.set("showing", true);
				var numReservationsBySalespersonBreakdownChart = new google.visualization.BarChart(document.getElementById(this.$.numReservationsBySalespersonBreakdownChart.id));
				numReservationsBySalespersonBreakdownChart.draw(numReservationsBySalespersonBreakdownData, options);
			}
			catch (err) { console.log('Error building "Num Shares By Reservation Breakdown" chart!', err); }
		}
		else
		{
			this.$.numSharesBySalespersonBreakdownChart.set("showing", false);
			this.$.numReservationsBySalespersonBreakdownChart.set("showing", false);
		}

		this.set("buildingReport", false);
	},

	/*****************
	* Reservation Repeater Section
	*****************/

	setupReservationRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		var reservation = this.get("filteredReservationCollection").at(inEvent.index);

		inEvent.item.$.reservationItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.reservationName.set("content", reservation.get("name"));
		inEvent.item.$.emailAddress.set("content", reservation.get("emailAddress"));
		inEvent.item.$.cellPhone.set("content", reservation.get("cellPhone") || "");
		inEvent.item.$.numShares.set("content", numeral(reservation.get("numShares")).format("0,0"));
		inEvent.item.$.salespersonName.set("content", this.salespeople[reservation.get("salespersonID")].salespersonName);
		inEvent.item.$.dateTimeReserved.set("content", moment.tz(reservation.get("dateTimeCreated"), "Canada/Pacific").format('MMMM Do YYYY, h:mm:ss a'));
		inEvent.item.$.viewSubscriptionButton.set("disabled", reservation.get("subscriptionID") === "");

		return true;
	},

	handleReservationItemTapped: function(inSender, inEvent)
	{
		this.doViewItemDetail({collection: this.get("filteredReservationCollection"), item: this.get("filteredReservationCollection").at(inEvent.index)});
	},

	handleViewSubscriptionButtonTapped: function(inSender, inEvent)
	{
		var record = this.get("filteredReservationCollection").at(inEvent.index);
		this.doViewEventDetail({mode: "placement", target: record.get("placementID"), record: record.get("subscriptionID")});
		return true;
	},

	/*****************
	* Sort Functions
	*****************/

	sortColumnTapped: function(inSender, inEvent)
	{
		var targetColumn = inEvent.originator.sortTarget;

		if (this.get("filterColumn") === targetColumn)
		{
			this.set("filterDirection", this.get("filterDirection") === "asc" ? "desc" : "asc");
			inEvent.originator.set("content", inEvent.originator.get("content").slice(0, -6) + (this.get("filterDirection") === "asc" ? "&uarr;" : "&darr;"));
		}
		else
		{
			this.$.headerColumns.controls.forEach(enyo.bind(this, function(value, index, array){
				if (value.sortTarget === this.get("filterColumn"))
				{
					value.content = value.content.slice(0, -6);
				}
			}));
			this.set("filterColumn", targetColumn);
			this.set("filterDirection", "asc");
			inEvent.originator.set("content", inEvent.originator.get("content") + "&uarr;");
			this.$.headerColumns.render();
		}

		this.filterReservations();
	}
});