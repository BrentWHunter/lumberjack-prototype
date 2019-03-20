/* global lumberjack,d3,alertify,console,numeral */
/**
	--Data rows used--
		jurisdiction
		country
		subscriberDollarAmount
		fundsReceived
		subscriptionStatus
		subscriptionCreatedTimestamp
		paymentsReceived
		receivedDate
		amount
		paymentType
		placementTotal (Settings row)
*/

enyo.kind({
	name: "lumberjack.ReportView",
	kind: "FittableRows",

	small: 200,
	medium: 400,
	large: 600,
	extraLarge: 700,
	storedData: "",
	countryCodeLookup: "",

	daysHistory: 30,

	fundsPromised: "",
	fundsReceived: "",
	fundsOutstanding: "",
	placement: "",
	subStatus: "",
	paymentHistory: "",
	subscriptionHistory: "",
	staleSubscriptions: "",
	placementDetails: "",

	events: {
		onLogout: ""
	},

	components:[
		{kind: "onyx.Toolbar", layoutKind: "enyo.FittableColumnsLayout", style: "background: black; border: 1px solid black; padding: 0px 0px;", noStretch: true, components: [
			{kind: "enyo.Image", style: "height: 40px; margin-left: 10px;", src: "assets/logo.png"},
			{name: "companyName", style: "color: white; margin-left: 15px; font-size: 24px; font-family: Tahoma, sans-serif;", fit: true},
			{name: "reportPickerDecorator", kind: "onyx.PickerDecorator", showing: false, components: [
				{name: "reportPickerButton", style: "width: 450px;"},
				{name: "reportPicker", kind: "onyx.Picker", onChange: "handleReportPickerChanged"}
			]},
			{name:"rightButton", kind: "onyx.MenuDecorator", style: "margin: 0; padding: 10px;", classes: "breadcrumb", ontap: "buttonfix", components: [
				{kind: "onyx.IconButton", src: "assets/icons/settings-icon.png"},
				{name: "rightMenu", kind: "onyx.Menu", maxHeight: "500px", style: "margin-top: 0;", components: [
					// {content: "Print Summary", onSelect: "printDocument", showing: false, name: "printSummaryMenuItem"},
					// {classes: "onyx-menu-divider"},
					//{content: "Change Company", onSelect: "handleChangeCompany"},
					{content: "Logout", onSelect: "handleLogout"}
				]}
			]}
		]},
	    { name: "d3", kind:"Scroller", fit: true },
	    {name: "loadingPopup", kind: "lumberjack.LoadingPopup"}
	],

	printDocument: function() {
		this.printPage();
	},

	changeDaysHistory: function(daysHistory, dimensions, className) {
		if(className === "paymentHistoryChart") {
			this.daysHistory = daysHistory;
			this.paymentHistory = this.createPaymentHistory(this.storedData, dimensions);
		}
		else if(className === "subscriptionHistoryChart") {
			this.daysHistory = daysHistory;
			this.subscriptionHistory = this.createSubscriptionHistory(this.storedData, dimensions);
		}
		else {
			this.daysHistory = daysHistory;
			this.createStaleSubscriptionChart(this.storedData, dimensions);
		}
	},

	rendered: function(inSender, inEvent) {
		this.inherited(arguments);
		this.$.companyName.set("content", lumberjack.preferences.get("companyName"));
		this.countryCodeLookup = {};
		this.countryCodeLookup.getFullCountryNameFromThreeDigitCountryCode = function(code) {
			var countryCodeLookup = lumberjack.CountryCodes.get("countries");
			var i = 0;
			while(i < countryCodeLookup.length) {
				if (countryCodeLookup[i].threeLetterCode === code) {
					return countryCodeLookup[i].Country;
				}
				i++;
			}
		};
		this.loadData();
	},

	createD3Containers: function(parentNode) {
		var parentContainer = d3.select(parentNode);

		//d3.select("#app_reportView_control").node().parentNode.appendChild(d3.select("#app_reportView_control").node());
		//d3.select("#app_reportView_button").node().parentNode.appendChild(d3.select("#app_reportView_button").node());

		parentContainer.append("div")
			.attr("id", "d3chartdiv")
			.append("div")
			.attr("id", "d3tooltip");

		var header = d3.select("#d3chartdiv").append("div")
			.attr("class", "reportHeader");

		header.append("img")
			.attr("src", this.storedData.companyLogo)
			.attr("id", "companyHeaderLogo");

		header.append("p")
			.html(this.storedData.reportName + " <br /> Executive Summary <br />" + d3.timeFormat("%B %d, %Y")(new Date()));

		header.append("img")
			.attr("src", "./assets/GreenhillEquityLogo.png")
			.attr("id", "greenhillEquityHeaderLogo");
	},

	loadData: function() {
		this.hide();
		this.$.loadingPopup.show();

		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "generatereport",
			cacheBust: false,
			headers:{
				"Authorization": "Bearer " + lumberjack.preferences.get("username") + ":" + lumberjack.preferences.get("password")
			}
	    });

	    request.error(enyo.bind(this, function(request, response){
	    	this.show();
			this.$.loadingPopup.hide();
	    	alertify.error("Failed to generate report");
			console.log(request);
			this.resize();
			if(response == 401){
				this.doLogout();
				return;
			}
			return;
	    }));

	    request.response(enyo.bind(this, function(request, response){
			this.show();
			this.$.loadingPopup.hide();

	    	if (response.error){
	    		alertify.error("Failed to generate report");
				console.log(response);
				this.resize();
				return;
	    	}

			this.storedData = response.report;
			this.createD3Containers(this.$.d3.node);
			d3.select("body").append("div")
				.attr("id", "blockActivity")
				.style("width", document.body.clientWidth + "px")
				.style("height", document.body.clientHeight + "px")
				.style("position", "absolute")
				.style("left", 0)
				.style("top", 0);
			this.createCharts();
			this.resize();
		}));

	    request.go({placementID: lumberjack.preferences.get("placementDatabase")});
	},

	// Scrub out the non-data rows, preserve settings as a special element
	// cleanData: function(data) {
	// 	var cleanedData = new Object();
	// 	cleanedData.values = [];
	// 	data.forEach(function(d) {
	// 		if(!isNaN(d.value.subscriberDollarAmount))
	// 			cleanedData.values.push(d);
	// 		else if(d.id === "settings") {
	// 				cleanedData.placementDetails = d;
	// 			}
	// 		});
	// 	return cleanedData;
	// },

	// Data loaded, let's construct all the charts in this dashboard
	createCharts: function(inSender, inEvent) {
		var pieData = this.createPieData(this.storedData);
		var subscriptionStatusData = this.createSubscriptionStatusData(this.storedData);

		this.placement = this.createPlacementDonutChart(pieData, "Placement Target", {width: this.large, height: this.large}, subscriptionStatusData);
		this.subStatus = this.createSubscriptionStatusChart(subscriptionStatusData, {width: this.large, height: this.large / 2 });
		this.staleSubscriptions = this.createStaleSubscriptionChart(this.storedData, {width: this.large, height: this.large / 2 });
		var tr = d3.select("#d3chartdiv").append("div").attr("id", "historyRow").append("table").attr("id", "historyRowTable").append("tr");
		this.paymentHistory = this.createPaymentHistory(this.storedData, {width: this.extraLarge, height: this.large / 2 });
		this.subscriptionHistory = this.createSubscriptionHistory(this.storedData, {width: this.extraLarge, height: this.large / 2 });
		tr.append("td").node().appendChild(this.paymentHistory.node());
		tr.append("td").node().appendChild(this.subscriptionHistory.node());
		d3.select("#d3chartdiv").append("div").attr("class", "divrow").attr("id", "pieFundsRow");
		this.fundsPromised = this.createDonutChart(pieData, "Funds Promised", 'fundsPromised', {width: this.medium, height: this.medium});
		this.fundsReceived = this.createDonutChart(pieData, "Funds Received", 'fundsReceived', {width: this.medium, height: this.medium});
		this.fundsOutstanding = this.createDonutChart(pieData, "Funds Outstanding", 'fundsOutstanding', {width: this.medium, height: this.medium});

		this.arrangeChartLayout();
		d3.select("#d3chartdiv").append("div").attr("class", "footer")
			.append("img")
			.attr("src", "./assets/GreenhillEquityLogo.png")
			.attr("alt", "Greenhill Equity")
			.attr("class", "greenhillEquityLogo");
	},

	// Manage page layout and CSS styles for the created charts
	arrangeChartLayout: function() {
		var d3div = d3.select("#d3chartdiv");
		var historyRow = d3.select("#historyRow");
		var pieFundsRow = d3.select("#pieFundsRow");
		var delayBeforeAllowingUserActivity = 1250;

		// Float elements so they'll group together
		this.subStatus
			.style("float", "left");
		this.staleSubscriptions
			.style("float", "left");
		this.placement
			.style("float", "left");

		pieFundsRow.node().appendChild(this.fundsPromised.node());
		pieFundsRow.node().appendChild(this.fundsReceived.node());
		pieFundsRow.node().appendChild(this.fundsOutstanding.node());

		allowUserInput();

		function allowUserInput() {
			setTimeout(function () {
				d3.select("#blockActivity").remove();
			}, delayBeforeAllowingUserActivity);
		}

		function alignVerticalCenter(element, parent) {
			var offset = 0;
			var elementSize = d3.select(element).node().getBoundingClientRect();
			var parentSize = d3.select(parent).node().getBoundingClientRect();

			offset = (parentSize.height / 2) - (elementSize.height * 1.5);
			if(offset < 0)
				{offset = 0;}
			return offset + "px";
		}
	},

	createPieData: function(data) {

		var individualRecords = [];
		data.values.forEach(function(d) {
			if(d.subscriptionStatus != 'cancelled') {
				var row = {};
				row.name = d.jurisdiction === 'international' ? d.country : d.jurisdiction;
				row.fundsPromised = d.subscriberDollarAmount;
				row.fundsReceived = d.fundsReceived;
				row.fundsOutstanding = row.fundsPromised - row.fundsReceived;
				row.subscriptionStatus = d.subscriptionStatus;

				individualRecords.push(row);
			}
		});

		var nestedData = d3.nest()
			.key(function(d) {
					return d.name;
			})
			.entries(individualRecords);

		// Country Totals
		var countries = [];
		var index = 0;
		nestedData.forEach(function(d) {
			var countryRow = {};
			countryRow.name = d.key.toUpperCase();
			countryRow.index = index++;
			countryRow.fundsPromisedTotal = d3.sum(d.values, function(v) {
					return v.fundsPromised;
			});
			countryRow.fundsReceivedTotal = d3.sum(d.values, function(v) {
					return v.fundsReceived;
			});
			countryRow.fundsOutstandingTotal = d3.sum(d.values, function(v) {
					return v.fundsOutstanding;
			});
				countries.push(countryRow);
		});

		countries.sort(function(a, b) {
			a = a.name.toLowerCase();
			b = b.name.toLowerCase();
			return (a < b) ? -1 : (a > b) ? 1 : 0;
		});

		// Global Totals
		var globalValuesRow = {};
		globalValuesRow.name = "Global Total";
		globalValuesRow.fundsPromisedTotal = d3.sum(countries, function(d) { return d.fundsPromisedTotal; });
		globalValuesRow.fundsReceivedTotal = d3.sum(countries, function(d) { return d.fundsReceivedTotal; });
		globalValuesRow.fundsOutstandingTotal = d3.sum(countries, function(d) { return d.fundsOutstandingTotal; });

		// Placement Target
		var placementTargetRow = {};
		placementTargetRow.name = "Placement Target";
		placementTargetRow.placementTotal = data.placementDetails.placementTotal;
		placementTargetRow.data = [];
		placementTargetRow.data.push({name: "Funds Collected", value: globalValuesRow.fundsReceivedTotal});
		placementTargetRow.data.push({name: "Funds Outstanding", value: globalValuesRow.fundsOutstandingTotal});
		placementTargetRow.data.push({name: "Raise Remaining", value: placementTargetRow.placementTotal - globalValuesRow.fundsPromisedTotal});

		var returnObject = {};
		returnObject.placementTarget = placementTargetRow;
		returnObject.globalTotals = globalValuesRow;
		returnObject.countryData = countries;
		returnObject.individualRecords = individualRecords;

		return returnObject;
	},

	createDonutChart: function(data, chartName, valueColumn, dimensions) {
		var countryCodeLookup = this.countryCodeLookup;
		var currency = this.storedData.placementDetails.placementCurrency;
		var width = dimensions.width;
		var height = dimensions.height;
		var legendRowHeight = 25;
		var legendWidth = 65;
		var svgWidth = dimensions.width + legendWidth;
		var svgHeight;
		var radius = Math.min(width, height) / 2;
		var colorScale = d3.scaleOrdinal(d3.schemeCategory20b); //#AABBCC #FF00A8 Silly colours to find this row faster in Atom Minimap
		var tooltip = d3.select("#d3tooltip");
		var throttleWaitPeriod = 325;

		var arc = d3.arc()
			.outerRadius(radius * 0.9)
			.innerRadius(radius * 0.5);

		var arcHighlighted = d3.arc()
			.outerRadius(radius * 0.99)
			.innerRadius(radius * 0.6);

		var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d[valueColumn + "Total"]; });

		var d3chartdiv = d3.select("#d3chartdiv");
		var container = d3chartdiv.append("div")
			.attr("class", "chartContainer " + valueColumn + "Chart");

		container.append("h2")
			.html(chartName + " (" + currency + ")" + "<br />" + numeral(data.globalTotals[valueColumn + "Total"]).format('$0,0'));

		// Set up the container for the header and total,
		// but don't do any more work since there's nothing to calculate
		if(data.globalTotals[valueColumn + "Total"] === 0) {
			container.append("p").style("width", width + "px").html("There are no " + chartName + " at this time.");
			return container;
		}

		// Otherwise create a canvas and get going
		var numberOfLegendRows = 0;
		data.countryData.forEach(function(d) {
			if(d[valueColumn + "Total"] > 0)
				{numberOfLegendRows += 1;}
		});
		svgHeight = Math.max(dimensions.height, numberOfLegendRows * legendRowHeight);

		var svg = container.append("svg")
			.attr("width", svgWidth)
			.attr("height", svgHeight)
			.append("g")
			.attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

		this.createDropShadowParameters(svg);
		svg.append("circle")
		.attr("r", radius * 0.9)
		.attr("fill", "#DDDDDD")
		.attr("class", "donutDropShadow")
		.style("filter", "url(#drop-shadow)");

		svg.append("circle")
			.attr("r", radius * 0.5)
			.attr("fill", "white")
			.style("filter", "url(#inset-shadow)");

		var sumTitle = svg.append("text")
			.attr("text-anchor", "middle")
			.attr("opacity", 0)
			.attr("font-weight", "bold")
			.text("Value of Selected");

		var sumLabel = svg.append("text")
			.attr("text-anchor", "middle")
			.attr("class", "sumLabel")
			.attr("dy", "1em")
			.attr("opacity", 0)
			.text("$0");

		// Begin the actual chart construction
		var countriesArcs = svg.selectAll(".countriesArc").data(pie(data.countryData));
		countriesArcs.enter()
			.append("g")
				.attr("class", "countriesArc")
				.append("path")
				.attr('pointer-events', 'none')
				.attr("class", function(d) { return d.data.name; })
				.attr("d", arc)
				.style("fill", function(d) {
					return colorScale(d.data.index);
				})
				.on("mouseover", function(d) {
					var legendRow = d3.select("#" + valueColumn + "Legend").select("g." + d.data.name);
					if(!d3.select(this).attr("class").includes("selected")) {
						mouseOverHighlight(d3.select(this), legendRow);
					}
				})
				.on("mousemove", function(d) {
					var mousePos = d3.mouse(d3chartdiv.node());
					mousePos[0] = d3.event.pageX;
					showTooltip(d, mousePos);
				})
				.on("mouseout", function(d) {
					if(!d3.select(this).attr("class").includes("selected")) {
						var legendRow = d3.select("#" + valueColumn + "Legend").select("g." + d.data.name);
						mouseOutRemoveHighlight(d3.select(this), legendRow);
					}
					return tooltip.style("visibility", "hidden");
				})
				.on("click", throttleRapidClicks(function(d) {
					var slice = d3.select(this);
					var legend = d3.select("#" + valueColumn + "Legend").select("g." + d.data.name);
					onClick(d, legend, slice);}, throttleWaitPeriod))
				.each(function(d) { d.selected = false; })
				.transition().duration(500)
					.attrTween('d', tweenPie)
				.transition()
					.attr("pointer-events", null);

		// Color Definition legend, map name values to colours in pie chart
		var colorBlockSize = 19;
		var selectBlockWidth = 5;
		var legend = svg.append("g")
			.attr("id", valueColumn + "Legend")
			.attr("class", "chartLegend")
			.attr("transform", "translate(" + width / 2 + ", " + -(height / 2) + ")")
			.selectAll("g").data(data.countryData).enter()
			.filter(function(d) { return d[valueColumn + "Total"] > 0; })
				.append("g")
					.attr("transform", function(d, i) {
						return "translate(0, " + i * legendRowHeight + ")"; })
					.attr("class", function(d) { return d.name; })
					.on("mouseover", function(d) {
						var slice = d3.select("." + valueColumn + "Chart").select("path." + d.name);
						var mousePos = d3.mouse(d3chartdiv.node());
						mousePos[0] = d3.event.pageX;
						var legend = d3.select(this);
						if(!legend.attr("class").includes("selected")) {
							mouseOverHighlight(slice, legend);
						}
						showTooltip(d, mousePos);
					})
					.on("mouseout", function(d) {
						var legend = d3.select(this);
						if(!legend.attr("class").includes("selected")) {
							var slice = d3.select("." + valueColumn + "Chart").select("path." + d.name);
							mouseOutRemoveHighlight(slice, legend);
						}
						hideTooltip();
					})
					.on("click", throttleRapidClicks(function(d) {
						var legend = d3.select(this);
						var slice = d3.select("." + valueColumn + "Chart").select("path." + d.name);
						onClick(d, legend, slice);}, throttleWaitPeriod))
				.append("rect")
					.attr("class", "legendSelectedBlock")
					.attr("width", selectBlockWidth)
					.attr("height", colorBlockSize + 1)
					.attr("fill", "black")
					.style("opacity", 0)
				.select(function() { return this.parentElement; })
					.append("rect")
					.attr("x", selectBlockWidth + 2)
					.attr("width", colorBlockSize)
					.attr("height", colorBlockSize)
					.attr("fill", "#DDDDDD")
				.select(function() { return this.parentElement; })
					.append("rect")
					.attr("class", "legendColorBlock")
					.attr("x", selectBlockWidth + 2)
					.attr("width", colorBlockSize)
					.attr("height", colorBlockSize)
					.attr("fill", function(d) { return colorScale(d.index); })
					.attr("stroke", "black")
				.select(function() { return this.parentElement; })
					.append("rect")
					.attr("x", selectBlockWidth + 2)
					.attr("width", colorBlockSize)
					.attr("height", colorBlockSize)
					.attr("fill", "none")
					.attr("stroke", "black")
				.select(function() { return this.parentElement; })
				.append("text")
					.attr("class", "legendLabel")
					.attr("transform", "translate(28,15)")
					.text(function(d) { return d.name.substr(0,3); });

			// Tooltip reveal, update, and hide events
			function showTooltip(d, mousePos) {
				updateTooltip(d, mousePos);
				tooltip.style("visibility", "visible");
			}

			function updateTooltip(d, mousePos) {
				var v = d.data ? d.data[valueColumn + "Total"] : d[valueColumn + "Total"];
				var value = numeral(v).format('0,0');
				var name = d.data ? d.data.name.toUpperCase() : d.name.toUpperCase();
				var country = countryCodeLookup.getFullCountryNameFromThreeDigitCountryCode(name);
				tooltip.text(country + " $" + value)
					.style("top", (mousePos[1] - 10) + "px").style("left", (mousePos[0] + 10) + "px");
			}

			function hideTooltip() {
				tooltip.style("visibility", "hidden");
			}

			// Highlight Events
			function mouseOverHighlight(slice, legendRow) {
				slice.transition()
					.duration(350)
					.attr("d", arcHighlighted)
				.select(function() { return this.parentElement; })
					.style("opacity", 1);

				legendRow.transition()
					.duration(250)
					.select(".legendColorBlock")
						.style("opacity", 1)
					.select(function() { return this.parentElement; }).select(".legendLabel")
						.style("font-weight", "bold")
					.select(function() { return this.parentElement; }).select(".legendSelectedBlock")
						.style("opacity", 1);
			}

			function mouseOutRemoveHighlight(slice, legendRow) {
				slice.transition()
					.duration(175)
					.attr("d", arc)
				.select(function(){ return this.parentElement; })
					.style("opacity", null);

				legendRow.transition()
					.duration(350)
					.select(".legendColorBlock")
						.style("opacity", null)
					.select(function() { return this.parentElement; }).select(".legendLabel")
						.style("font-weight", null)
					.select(function() { return this.parentElement; }).select(".legendSelectedBlock")
						.style("opacity", 0);
			}

			// Throttle mouse click events
			function throttleRapidClicks(fn, restPeriod) {
			  var free = true;
			  return function(){
			    if (free) {
			      fn.apply(this, arguments);
			      free = false;
			      setTimeout(function() {
			        free = true;
			      }, restPeriod);
			    }
			  };
			}

			// Update selected sum
			function onClick(d, legend, slice) {
				var sliceName = slice.attr("class");
				var legendName = legend.attr("class");
				var value = d.data ? d.data[valueColumn + "Total"] : d[valueColumn + "Total"];

				if(sliceName.includes("selected")) {
					slice.attr("class", sliceName.replace(/ selected/g, ""))
						.attr("stroke", null);
					legend.attr("class", legendName.replace(/ selected/g, ""))
						.select(".legendSelectedBlock")
						.transition()
						.duration(100)
						.style("background-color", "lightgrey")
						.style("color", "lightgrey");
					updateSum(-value);
				}
				else {
					slice.attr("class", sliceName + " selected")
						.attr("stroke", "black");
					var g = slice.node().parentNode;
					g.parentNode.appendChild(g);
					legend.attr("class", legendName + " selected")
						.select(".legendSelectedBlock")
						.transition()
						.duration(100)
						.style("opacity", 1)
						.style("background-color", "#333333")
						.style("color", "#333333");
					updateSum(value);
				}
			}

			function updateSum(amount) {
				var duration = d3.transition().duration(100);

				sumTitle.transition(duration)
					.attr("opacity", 1);

				var dollarFormat = d3.format("$,.0f");
				var sum = lumberjack.parseInt(sumLabel.text().replace(/[$,]/g, ""));
				var total = sum + amount;
				if(total < 0)
					{total = 0;}
				sumLabel.transition(duration).delay(100)
					.attr("opacity", 1)
				.transition(duration)
					.tween("text", function(d) {
						var i = d3.interpolate(sumLabel.text().replace(/[$,]/g, ""), total);
						return function(t) {
							sumLabel.text(dollarFormat(i(t)));
						};
					})
				.transition(duration)
					.attr("opacity", function() {
						if(sum + amount === 0) {
							sumTitle.transition(duration)
								.delay(200)
								.attr("opacity", 0);

							return 0;
						}
						else {return 1;}
					});
			}

			// Chart growth transition from nothing to 360 degrees
			function tweenPie(b) {
				var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
				return function(t) { return arc(i(t)); };
			}

		return container;
	},

	createPlacementDonutChart: function(data, chartName, dimensions, subscriptionData) {
		var currency = this.storedData.placementDetails.placementCurrency;
		var width = dimensions.width;
		var svgWidth = width + 201;
		var height = dimensions.height;
		var radius = Math.min(width, height) / 2;
		var tooltip = d3.select("#d3tooltip");
		var legendRowHeight = 25;

		var arc = d3.arc()
			.outerRadius(radius * 0.9)
			.innerRadius(radius * 0.5);

		var arcHighlighted = d3.arc()
			.outerRadius(radius)
			.innerRadius(radius * 0.6);

		var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d.value; });

		var d3chartdiv = d3.select("#d3chartdiv");

		var container = d3chartdiv.append("div")
			.attr("class", "chartContainer placementDetailsChart")
			.style("max-height", dimensions.height);

		container.append("h2")
			.html(chartName + " (" + currency + ")" + "<br />" + numeral(data.placementTarget.placementTotal).format('$0,0'));

		var svg = container.append("svg")
			.attr("width", svgWidth)
			.attr("height", height)
			.append("g")
			.attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")");

		this.createDropShadowParameters(svg);
		svg.append("circle")
		.attr("r", radius * 0.9)
		.attr("fill", "#DDDDDD")
		.style("filter", "url(#drop-shadow)");

		svg.append("circle")
			.attr("r", radius * 0.5)
			.attr("fill", "white")
			.style("filter", "url(#inset-shadow)");

		var placementArcs = svg.selectAll(".placementArc").data(pie(data.placementTarget.data));
		var placementColors = d3.scaleOrdinal().range(['#33a02c', '#6a3d9a', '#e31a1c']);
		//                                            Collected  Outstanding  Raise Remaining
		placementArcs.enter()
			.append("g")
				.attr("class", "placementArc")
				.append("path")
				.attr('pointer-events', 'none')
				.attr("class", function(d) { return d.data.name.replace(/ /g, ""); })
				.style("fill", function(d, i) {
					return placementColors(i);
				})
				.on("mouseover", function(d) {
					var legendRow = d3.select("#placementDetailsLegend").select("g." + d.data.name.replace(/ /g, ""));
					mouseOverHighlight(d3.select(this), legendRow);

					var value = numeral(d.data.value).format('0,0');
					tooltip.text(d.data.name + " $" + value);
					return tooltip.style("visibility", "visible");
				})
				.on("mousemove", function() {
					var mousePos = d3.mouse(d3chartdiv.node());
					mousePos[0] = d3.event.pageX;
					return tooltip.style("top", (mousePos[1] - 10) + "px").style("left", (mousePos[0] + 10) + "px");
				})
				.on("mouseout", function(d) {
					var legendRow = d3.select("#placementDetailsLegend").select("g." + d.data.name.replace(/ /g, ""));
					mouseOutRemoveHighlight(d3.select(this), legendRow);
					return tooltip.style("visibility", "hidden");
				})
				.transition().duration(500)
					.attrTween('d', tweenPie)
				.transition()
					.attr("pointer-events", null);

		var dataSummary = svg.select(function() { return this.parentNode; })
			.append("g")
				.attr("class", "placementSummaryTable");

		this.createDataSummary(dataSummary, subscriptionData, data);

		// Color Definition legend, map name values to colours in pie chart
		var legend = svg.select(function() { return this.parentNode; }).append("g")
			.attr("id", "placementDetailsLegend")
			.attr("class", "chartLegend")
			.attr("transform", "translate(" + width + ", " + Math.ceil(height / 1.75) + ")")
			.selectAll("g").data(data.placementTarget.data).enter()
				.append("g")
					.attr("class", function(d) { return d.name.replace(/ /g, ""); })
					.attr("transform", function(d, i) { return "translate(0, " + i * legendRowHeight + ")"; })
					.on("mouseover", function(d) {
						var slice = d3.select("." + "placementDetailsChart").select("path." + d.name.replace(/ /g, ""));
						mouseOverHighlight(slice, d3.select(this));
						var mousePos = d3.mouse(d3chartdiv.node());
						mousePos[0] = d3.event.pageX;
						var value = numeral(d.value).format('0,0');
						tooltip.text(d.name + " $" + value);
						tooltip.style("top", (mousePos[1] - 10) + "px").style("left", (mousePos[0] + 10) + "px");
						return tooltip.style("visibility", "visible");
					})
					.on("mouseout", function(d) {
						var slice = d3.select("." + "placementDetailsChart").select("path." + d.name.replace(/ /g, ""));
						mouseOutRemoveHighlight(slice, d3.select(this));
						return tooltip.style("visibility", "hidden");
					})
				.append("rect")
					.attr("class", "legendColorBlock")
					.attr("width", "20px")
					.attr("height", "20px")
					.attr("fill", function(d, i) { return placementColors(i); })
				.select(function() { return this.parentElement; })
				.append("rect")
					.attr("width", "20px")
					.attr("height", "20px")
					.attr("fill", "none")
					.attr("stroke", "black")
					.attr("stroke-width", 1)
				.select(function() { return this.parentElement; })
				.append("text")
					.attr("class", "legendLabel")
					.attr("transform", "translate(28,15)")
					.text(function(d) { return d.name; });

		// Highlight Events
		function mouseOverHighlight(slice, legendRow) {
			slice.transition()
				.duration(350)
				.attr("d", arcHighlighted)
			.select(function() { return this.parentElement; })
				.style("opacity", 1);

			legendRow.transition()
				.duration(250)
					//.style("height", "30px")
				.select(".legendColorBlock")
					.style("opacity", 1)
				.select(function() { return this.parentElement; }).select(".legendLabel")
					.style("font-weight", "bold");
		}

		function mouseOutRemoveHighlight(slice, legendRow) {
			slice.transition()
				.duration(175)
				.attr("d", arc)
			.select(function(){ return this.parentElement; })
				.style("opacity", null);

			legendRow.transition()
				.duration(350)
					//.style("height", "20px")
				.select(".legendColorBlock")
					.style("opacity", null)
				.select(function() { return this.parentElement; }).select(".legendLabel")
					.style("font-weight", null);
		}

		// Chart growth transition from nothing to 360 degrees
		function tweenPie(b) {
			var i = d3.interpolate({startAngle: 1.1*Math.PI, endAngle: 1.1*Math.PI}, b);
			return function(t) { return arc(i(t)); };
		}

		return container;
	},

	createSubscriptionStatusData: function(data) {
		var subscriptionStatusData = d3.nest().key(function(d) {
			return d.subscriptionStatus;
		}).entries(data.values);
		subscriptionStatusData.forEach(function(k) {
			switch(k.key.toString())
			{
					case "completeDocsNoFunds":
							k.subscriptionStatusString = "Complete Docs, No Funds";
							k.color = "#1f78b4";
							k.sortOrder = 6;
							break;
					case "fundsOnly":
							k.subscriptionStatusString = "Funds Only";
							k.color = "#b2df8a";
							k.sortOrder = 3;
							break;
					case "incompleteDocsNoFunds":
							k.subscriptionStatusString = "Incomplete Docs, No Funds";
							k.color = "#ff7f00";
							k.sortOrder = 5;
							break;
					case "incompleteDocsPartialFunds":
							k.subscriptionStatusString = "Incomplete Docs, Partial Funds";
							k.color = "#cab2d6";
							k.sortOrder = 4;
							break;
					case "incompleteDocsAllFunds":
							k.subscriptionStatusString = "Incomplete Docs, All Funds";
							k.color = "#6a3d9a";
							k.sortOrder = 2;
							break;
					case "completeDocsPartialFunds":
							k.subscriptionStatusString = "Complete Docs, Partial Funds";
							k.color = "#ffff99";
							k.sortOrder = 1;
							break;
					case "complete":
							k.subscriptionStatusString = "Complete";
							k.color = "#33a02c";
							k.sortOrder = 0;
							break;
					case "pendingCancellation":
					case "cancelled":
							k.subscriptionStatusString = "Cancelled";
							k.color = "#e31a1c";
							k.sortOrder = 8;
							break;
					case "closed":
							k.subscriptionStatusString = "Closed";
							k.color = "#fb9a99";
							k.sortOrder = 9;
							break;
					case "new":
							k.subscriptionStatusString = "New";
							k.color = "#a6cee3";
							k.sortOrder = 10;
							break;
					default:
							k.subscriptionStatusString = "Unknown";
							k.color = "#fdbf6f";
							k.sortOrder = 11;
			}
			k.numberOfRecordsInStatus = k.values.length;
		});
		subscriptionStatusData.sort(function(a, b) { return a.sortOrder - b.sortOrder; });
		return subscriptionStatusData;
	},

	createStaleSubscriptionData: function(data, filter) {
		var staleSubscriptions = [];
		var parseTime = d3.timeParse("%Y/%m/%d");
		var formatTime = d3.timeFormat("%Y/%m/%d");

		data.values.forEach(function(e) {
			var subscriptionCreated = formatTime(new Date(e.subscriptionCreatedTimestamp));
			if(parseTime(subscriptionCreated) <= filter) {
				var subscription = {};
				var statusString;
				switch(e.subscriptionStatus)
				{
					case "incompleteDocsNoFunds":
					case "incompleteDocsPartialFunds":
						statusString = "Has Not Signed";
						break;
					case "completeDocsNoFunds":
					case "completeDocsPartialFunds":
						statusString = "Signed, Has Not Paid";
						break;
					case "incompleteDocsAllFunds":
					case "fundsOnly":
						statusString = "Paid, Has Not Signed";
						break;
					default:
						statusString = "ignore";
						break;
				}

				if(statusString != "ignore") {
					subscription.subscriptionStatusString = statusString;
					staleSubscriptions.push(subscription);
				}
			}
		});
		var subscriptionStatusData = d3.nest().key(function(d) {
			return d.subscriptionStatusString;
		}).entries(staleSubscriptions);

		subscriptionStatusData.forEach(function(k) {
			switch(k.key.toString())
			{
				case "Has Not Signed":
					k.color = "#ff7f00";
					k.sortOrder = 0;
					break;
				case "Signed, Has Not Paid":
					k.color = "#1f78b4";
					k.sortOrder = 1;
					break;
				case "Paid, Has Not Signed":
					k.color = "#6a3d9a";
					k.sortOrder = 2;
					break;
				case "Cash Only":
					k.color = "#b2df8a";
					k.sortOrder = 3;
					break;
			}
			k.subscriptionStatusString = k.key;
			k.numberOfRecordsInStatus = k.values.length;
		});
		// Group payments by date and sum total for a given day
		subscriptionStatusData.sort(function(a, b) { return a.sortOrder - b.sortOrder; });
		return subscriptionStatusData;
	},

	createSubscriptionStatusChart: function(data, dimensions) {
		var chartName = "Subscription Status";
		var className = "subscriptionStatus";
		var bottomAxisLabel = "Subscriptions";
		return this.createSubscriptionBarChart(data, dimensions, chartName, className, bottomAxisLabel);
	},

	createStaleSubscriptionChart: function(data, dimensions) {
		var today = new Date();
		var days = 21;
		today.setDate(today.getDate() - days);
		var chartName = "Incomplete Subscriptions After " + days + " Days";
		var className = "staleSubscriptionStatus";
		var bottomAxisLabel = "Stale Subscriptions";
		return this.createSubscriptionBarChart(this.createStaleSubscriptionData(data, today), dimensions, chartName, className, bottomAxisLabel);
	},

	createSubscriptionBarChart: function(data, dimensions, chartName, className, bottomAxisLabel) {
		var margin = {top: 0, right: 45, bottom: 40, left: 90};
		var width = dimensions.width - margin.left - margin.right;
		var height = dimensions.height - margin.top - margin.bottom;
		var totalSubscriptions = d3.sum(data, function(d) { if(d.key != "cancelled") {return d.numberOfRecordsInStatus;} });
		if(totalSubscriptions === 0)
			{totalSubscriptions = d3.sum(data, function(d) { if(d.key === "cancelled") {return d.numberOfRecordsInStatus;} });}
		var scaleMaxValue = Math.ceil((d3.max(data, function(d) { return d.numberOfRecordsInStatus; })+1)/10)*10;

		if(scaleMaxValue > totalSubscriptions)
			{scaleMaxValue = totalSubscriptions;}

		var numTicks;
		if(scaleMaxValue > 100000)
			{numTicks = 6;}
		else if(scaleMaxValue < 10)
			{numTicks = scaleMaxValue;}
		else
			{numTicks = 10;}

		var y = d3.scaleBand()
			.domain(data.map(function(d) {
				if(d.subscriptionStatusString) {
					return d.subscriptionStatusString;
				}
				else {
					return d.key;
				}
			}))
			.rangeRound([0, height])
			.padding(0.1);

		var x = d3.scaleLinear()
			.domain([0, scaleMaxValue])
			.rangeRound([0, width]);

		var d3chartdiv = d3.select("#d3chartdiv");
		var container = d3chartdiv.append("div")
			.attr("class", "chartContainer " + className);

		container.append("h2")
			.html(chartName + "<br />")
			.append("span")
				.attr("class", "chartTitleSecondLine")
				.html(numeral(totalSubscriptions).format('0,0') + " Subscriptions");

		var svg = container.append("svg")
			.attr("width", dimensions.width)
			.attr("height", dimensions.height)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		this.createDropShadowParameters(svg);
		svg.append("g")
	      .attr("class", "axis subscriptionChartAxisX")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x)
					.ticks(numTicks)
					.tickFormat(d3.format("d")));

	  svg.append("g")
	      .attr("class", "axis subscriptionChartAxisY")
	      .call(d3.axisLeft(y));

	  svg.selectAll(".bar")
	    .data(data)
	    .enter().append("g")
				.attr("class", "bar")
				.attr("transform", function(d) {
					return "translate(0, " + y(d.subscriptionStatusString) + ")";
				})
			.append("rect")
				.style("filter", "url(#inset-shadow)")
				.style("opacity", 0.85)
	      //.attr("y", function(d) { return y(d.subscriptionStatusString); })
	      .attr("height", y.bandwidth())
	      .attr("width", function(d) { return x(d.numberOfRecordsInStatus); })
				.attr("fill", function(d) { return d.color; })
				.select(function() { return this.parentNode; }).append("text")
					.text(function(d) { return numeral(d.numberOfRecordsInStatus).format('0,0'); })
					.attr("class", "subscriptionBarValue")
					.attr("dy", function() {
						return (y.bandwidth() / 2) + Math.ceil(this.getBBox().height / 2);
					})
					.attr("dx", function(d) {
						return x(d.numberOfRecordsInStatus) + 1;
					});

		svg.append("text")
			.attr("class", "subscriptionChartAxisX")
			.attr("text-anchor", "middle")
	    .text(bottomAxisLabel)
			.attr("transform", function() {
				var w = (width / 2);
				return "translate(" + w + ", " + (height + (margin.bottom * 0.75)) + ")";
			});

		svg.select(".subscriptionChartAxisX").selectAll(".tick").each(function(d) {
			var opacity = 1;
			if((lumberjack.parseInt(d) % 10 <= 0))
				{opacity = 0.5;}
			else
				{opacity = 0.25;}
			d3.select(this).select("line")
				.attr("stroke", "#000")
				.attr("y1", 6)
				.attr("y2", -height)
				.style("opacity", opacity);
		});

		svg.select(".subscriptionChartAxisY").selectAll(".tick").each(function(d) {
			var t = d3.select(this).select("text")
				.attr("text-anchor", "end");

				var s = d.split(", ");

				if(s.length > 1) {
					t.text("")
						.attr("y", -5);

					t.append("tspan")
						.text(s[0])
						.attr("x", -8);

					t.append("tspan")
						.text(s[1])
						.attr("x", -8)
						.attr("dy", 12);
				}
		});
		return container;
	},

	createPaymentHistory: function(data, dimensions) {
		var chartName = "Payment History";
		var className = "paymentHistoryChart";
		var days = this.daysHistory;
		var firstDate = new Date();
		var lastDate = new Date();
		firstDate.setDate(firstDate.getDate() - days - 1);
		lastDate.setDate(lastDate.getDate() + 1);
		var today = new Date();
		var legendDescriptor = "Payments Received per Day";
		var dropdownHtmlId = className + "Days";
		var dropdownHtml = 'Last <select id="' + dropdownHtmlId + '">' +
													'<option value="10">10</option>' +
													'<option value="30" selected="selected">30</option>' +
													'<option value="60">60</option>' +
													'<option value="90">90</option>' +
												'</select> Days';
		today.setDate(today.getDate() - days);
		var historyData = this.createPaymentHistoryData(data, today);
		var tooltipStringGenerator = function(payments) {
			var nowDate = new Date(payments.key);
			var month = nowDate.getMonth() + 1;
			var day = nowDate.getDate();
			var date = nowDate.getFullYear() + '/';
			if(month < 10)
				{date += '0' + month + '/';}
			else
				{date += month + '/';}
			if(day < 10)
				{date += '0' + day;}
			else
				{date += day;}

			var individualPayments = "";
			payments.values.forEach(function(d) {
				var pmt;
				switch(d.type) {
					case "wire":
						pmt = "Wire Payment";
						break;
					case "deposit":
						pmt = "Deposit";
						break;
					case "eft":
						pmt = "Electronic Funds Transfer";
						break;
					case "bankDraft":
						pmt = "Bank Draft";
						break;
					case "cashiersCheck":
						pmt = "Cashier's Check";
						break;
					case "moneyOrder":
						pmt = "Money Order";
						break;
					case "personalCheck":
						pmt = "Personal Check";
						break;
					case "corporateCheck":
						pmt = "Corporate Check";
						break;
					case "debtConversion":
						pmt = "Debt Conversion";
						break;
					default:
						pmt = "Unknown";
						break;
				}
				individualPayments += "<br />" + pmt + ": " + numeral(d.amount).format('$0,0');
			});

			var tooltip = "<h3>" + date + "<br />" +
										numeral(payments.total).format('$0,0') + "</h3>" +
										individualPayments;
			return tooltip;
		};

		return this.createHistory(historyData, dimensions, chartName, className, tooltipStringGenerator, days, legendDescriptor, dropdownHtml, firstDate, lastDate);
	},

	createSubscriptionHistory: function(data, dimensions) {
		var chartName = "Subscription History";
		var className = "subscriptionHistoryChart";
		var days = this.daysHistory;
		var today = new Date();
		var legendDescriptor = "Subscriptions Placed per Day";
		var dropdownHtmlId = className + "Days";
		var dropdownHtml = 'Last <select id="' + dropdownHtmlId + '">' +
													'<option value="10">10</option>' +
													'<option value="30" selected="selected">30</option>' +
													'<option value="60">60</option>' +
													'<option value="90">90</option>' +
												'</select> Days';
		today.setDate(today.getDate() - days);
		var historyData = this.createSubscriptionHistoryData(data, today);
		var firstDate = new Date();
		var lastDate = new Date();
		firstDate.setDate(firstDate.getDate() - days - 1);
		lastDate.setDate(lastDate.getDate() + 1);
		var tooltipStringGenerator = function(subscriptions) {
			var nowDate = new Date(subscriptions.key);
			var month = nowDate.getMonth() + 1;
			var day = nowDate.getDate();
			var date = nowDate.getFullYear() + '/';
			if(month < 10)
				{date += '0' + month + '/';}
			else
				{date += month + '/';}
			if(day < 10)
				{date += '0' + day;}
			else
				{date += day;}

			var individualSubscriptions = "";
			subscriptions.values.forEach(function(d) {
				individualSubscriptions += "<br />" + d.country + ": " + numeral(d.amount).format('$0,0');
			});

			var tooltip = "<h3>" + date + "<br />" +
										numeral(subscriptions.total).format('$0,0') + "</h3>" +
										individualSubscriptions;
			return tooltip;
		};

		return this.createHistory(historyData, dimensions, chartName, className, tooltipStringGenerator, days, legendDescriptor, dropdownHtml, firstDate, lastDate);
	},

	createPaymentHistoryData: function(data, filter) {
		var payments = [];
		var parseTime = d3.timeParse("%Y/%m/%d");
		filter = moment(filter).valueOf();
		data.values.forEach(function(e) {
			if(e.paymentsReceived && e.paymentsReceived.length > 0) {
				e.paymentsReceived.forEach(function(p) {
					if(p.receivedDate >= filter) {
						var payment = {};
						//payment.payee = e.displayName;
						payment.date = moment(p.receivedDate).format("YYYY/MM/DD");
						payment.amount = lumberjack.parseInt(p.amount);
						payment.type = p.paymentType;
						payments.push(payment);
					}
				});
			}
		});
		// Group payments by date and sum total for a given day
		payments.sort(function(a, b) {
			return new Date(a.date) - new Date(b.date);
		});
		var paymentByDate = d3.nest().key(function(d) { return d.date; })
			.entries(payments);

		paymentByDate.forEach(function(p) {
			p.total = d3.sum(p.values, function(d) { return d.amount; });
		});

		return paymentByDate;
	},

	createSubscriptionHistoryData: function(data, filter) {
		var subscriptions = [];
		var parseTime = d3.timeParse("%Y/%m/%d");
		var formatTime = d3.timeFormat("%Y/%m/%d");

		data.values.forEach(function(e) {
			var subscriptionCreated = formatTime(new Date(e.subscriptionCreatedTimestamp));
			if(parseTime(subscriptionCreated) >= filter) {
				var subscription = {};
				subscription.date = subscriptionCreated;
				subscription.amount = e.subscriberDollarAmount;
				subscription.country = e.country;
				subscriptions.push(subscription);
			}
		});

		// Group payments by date and sum total for a given day
		subscriptions.sort(function(a, b) {
			return new Date(a.date) - new Date(b.date);
		});

		var subscriptionByDate = d3.nest().key(function(d) { return d.date; })
			.entries(subscriptions);

		subscriptionByDate.forEach(function(p) {
			p.total = d3.sum(p.values, function(d) { return d.amount; });
		});

		return subscriptionByDate;
	},

	createHistory: function(data, dimensions, chartName, className, tooltipStringGenerator, days, legendDescriptor, dropdownHtml, firstDate, lastDate) {
		var currency = this.storedData.placementDetails.placementCurrency;
		var firstRun = true;
		var format = d3.format(",d");
		var radius = 4;
		var margin = {top: 10, right: 10, bottom: 60, left: 75};
		var scaleWidth = dimensions.width - margin.left - margin.right;
		var svgWidth = dimensions.width;
		var height = dimensions.height - margin.top - margin.bottom;
		var legendHeight = 30;
		var svgHeight = dimensions.height + legendHeight;
		var tooltip = d3.select("#d3tooltip");
		var dropdownHtmlId = className + "Days";

		var maxAmount = d3.max(data, function(d) { return d.total; });
		var maxScaleAmount = Math.ceil(maxAmount * 1.05);
		var maxPaymentsOnSameDay = d3.max(data, function(d) { return d.values.length; });

		var colorDomain = [1,
						 Math.ceil((maxPaymentsOnSameDay + 1) * 0.25),
						 Math.round((maxPaymentsOnSameDay + 1) * 0.5),
						 Math.floor((maxPaymentsOnSameDay + 1) * 0.75),
						 maxPaymentsOnSameDay];
		var colorScale = d3.scaleQuantile()
			.domain(colorDomain)
			.range(["#2b83ba","#abdda4","#ffffbf","#fdae61","#d7191c"]);

		var y = d3.scaleLinear()
			.domain([0, maxScaleAmount])
			.range([height, 0]);

		var x = d3.scaleTime()
			.domain([firstDate, lastDate])
			.range([0, scaleWidth]);

		var d3chartdiv = d3.select("#d3chartdiv");
		var container = d3.select("." + className);
		var svg;
		if(container.empty()) {
			container = d3chartdiv.append("div")
				.attr("class", "chartContainer " + className);

			container.append("h2")
				.html(chartName + " (" + currency + ")" + "<br />")
				.append("span")
					.attr("class", "chartTitleSecondLine")
					.html(dropdownHtml);

			svg = container.append("svg")
				.attr("width", svgWidth)
				.attr("height", svgHeight)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var dropdown = d3.select("#" + dropdownHtmlId);
			var that = this;
			dropdown.on("change", function() {
				var e = lumberjack.parseInt(this.options[this.selectedIndex].text);
				that.changeDaysHistory(e, dimensions, className);
			});

			this.createDropShadowParameters(svg);
		}
		else {
			firstRun = false;
			svg = container.select("svg").select("g");
		}

		var yAxis = d3.axisLeft(y).tickFormat(function(d) { return numeral(d).format('$0,0'); }).tickSize(-scaleWidth);
		var xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")).ticks(10);

		var t = svg.transition().duration(500);
		t.select("." + className + "AxisX").call(customXAxis);
		t.select("." + className + "AxisY").call(customYAxis);

		if(firstRun) {
			svg.append("g")
					.attr("class", "axis " + className + "AxisY")
					.call(customYAxis);

			svg.append("g")
				.attr("class", "axis " + className + "AxisX")
				.attr("transform", "translate(0," + height + ")")
				.call(customXAxis);
		}

		var dataPoints, dataPaths;
		if(firstRun) {
			dataPoints = svg.append("g").attr("id", className + "DataPoints").selectAll(".dataPoint").data(data);
			dataPaths = svg.append("g").attr("id", className + "DataPaths");
		}
		else {
			dataPoints = svg.select("#" + className + "DataPoints").selectAll(".dataPoint").data(data);
			dataPaths = svg.select("#" + className + "DataPaths");
		}

		t = d3.transition()
				.duration(1000)
				.ease(d3.easeLinear);

		var lineGen = d3.line()
				.x(function(d) { return x(new Date(d.key)); })
				.y(function(d) { return y(d.total); });

		var line = dataPaths.selectAll(".line")
				.data([data]);

		line.enter().append("path").classed("line", true)
				.merge(line)
				.attr("d", lineGen)
				.attr("stroke-dasharray", function(d){ return this.getTotalLength(); })
				.attr("stroke-dashoffset", function(d){ return this.getTotalLength(); });

		dataPaths.selectAll(".line").transition(t).delay(500)
				.attr("stroke-dashoffset", 0);

		dataPoints.transition().duration(500)
			.attr("cx", function(d) { return x(new Date(d.key)); })
			.attr("cy", function(d) { return y(d.total); })
			.attr("r", radius)
			.attr("fill", function(d) { return colorScale(d.values.length);});

		dataPoints.enter()
			.append("circle")
			.attr("class", "dataPoint")
			.attr("r", 0)
			.attr("cx", function(d) { return x(new Date(d.key)); })
			.attr("cy", function(d) { return y(d.total); })
			.attr("fill", function(d) { return colorScale(d.values.length);})	// Number of payments made on same date
			.attr("stroke", "black")
			.attr("stroke-width", 1)
			.on("mouseover", function(d) {
				var mousePos = d3.mouse(d3chartdiv.node());
				mousePos[0] = d3.event.pageX;
				tooltip.html(tooltipStringGenerator(d))
					.style("visibility", "visible")
					.style("top", (mousePos[1] - 10) + "px")
					.style("left", (mousePos[0] + 10) + "px");
			})
			.on("mouseout", function(d) {
				tooltip.style("visibility", "hidden");
			})
			.transition().duration(500)
			.attr("r", radius);

		dataPoints.exit().transition().duration(500)
			.attr("r", 0)
			.style("opacity", 0)
			.transition().remove();

		// Place data points above the data path
		svg.node().appendChild(d3.select("#" + className + "DataPoints").node());

		var colorData = colorDomain.filter(function(item, pos) {
			return colorDomain.indexOf(item) == pos;
		});

		var legend;
		if(firstRun) {
			legend = svg.append("g")
				.attr("transform", "translate(0," + (dimensions.height + 10) + ")")
				.attr("class", "chartLegend " + className + "Legend");

			legend.append("text")
				.text(legendDescriptor)
				.attr("id", className + "Descriptor")
				.style("font-weight", "bold");
			legend = legend.selectAll(".historyLegendRow").data(colorData);
		}
		else {
			legend = container.select(".chartLegend").selectAll(".historyLegendRow").data(colorData);
		}

		var legendDescriptorBBox = d3.select("#" + className + "Descriptor").node().getBBox();

		legend.transition().duration(500)
			.select("rect")
			.attr("fill", function(d) { return colorScale(d); })
			.select(function() { return this.parentElement; })
			.select("text")
			.tween("text", function(d) {
				var that = d3.select(this);
				var i = d3.interpolateNumber(that.text(), d);
				return function(t) {
					that.text(format(i(t)));
				};
			});

		legend.enter()
			.append("g")
			.style("opacity", 0)
			.attr("class", "historyLegendRow")
			.attr("transform", function(d, i) { return "translate(" + Math.ceil(legendDescriptorBBox.width * 1.1 + (i * 38)) +", 5)"; })
			.append("rect")
			.attr("fill", function(d) { return colorScale(d); })
			.attr("width", 20)
			.attr("height", 20)
			.attr("stroke", "black")
			.attr("transform", function(d, i) { return "translate(0, -20)"; })
			.select(function() { return this.parentElement; })
			.append("text")
			.text("1")
			.attr("transform", function(d, i) { return "translate(22, -4)"; })
			.transition().duration(500)
			.tween("text", function(d) {
				var that = d3.select(this);
				var i = d3.interpolateNumber(that.text(), d);
				return function(t) {
					that.text(format(i(t)));
				};
			})
			.select(function() { return this.parentElement; })
				.style("opacity", 1);

		legend.exit().transition().duration(500)
			.style("opacity", 0)
			.select("text")
			.tween("text", function(d) {
				var that = d3.select(this);
				var i = d3.interpolateNumber(that.text(), 0);
				return function(t) {
					that.text(format(i(t)));
				};
			}).select(function() { return this.parentElement; })
			.transition()
			.remove();

		return container;

		function customYAxis(g) {
			var s = g.selection ? g.selection() : g;
			g.call(yAxis);
			s.select(".domain").remove();
			s.selectAll(".tick line")
				.attr("stroke", "#777")
				.attr("x1", -6);
			s.selectAll(".tick text")
				.style("text-anchor", "end")
				.attr("dx", -6);
		}

		function customXAxis(g) {
			var s = g.selection ? g.selection() : g;
			g.call(xAxis);
			s.selectAll(".tick text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", "rotate(-65)");
		}
	},

	createDataSummary: function(table, subscriptionData, pieData) {
		var filter = new Date();
		filter.setDate(filter.getDate() - 14);
		var staleSubscriptions = this.createStaleSubscriptionData(this.storedData, filter);
		var twoWeeks = d3.sum(staleSubscriptions, function(d) { return d.numberOfRecordsInStatus; });
		filter = new Date();
		filter.setDate(filter.getDate() - 30);
		staleSubscriptions = this.createStaleSubscriptionData(this.storedData, filter);
		var oneMonth = d3.sum(staleSubscriptions, function(d) { return d.numberOfRecordsInStatus; });

		var currency = this.storedData.placementDetails.placementCurrency;
		var totalSubscriptions = d3.sum(subscriptionData, function(d) { if(d.key != "cancelled") {return d.numberOfRecordsInStatus;} });

		var subscriptionComplete = 0;
		var subscriptionClosed = 0;
		var subscriptionCancelled = 0;
		subscriptionData.forEach(function(d) {
			switch(d.key) {
				case "complete" :
					subscriptionComplete = d.numberOfRecordsInStatus;
					break;
				case "closed" :
					subscriptionClosed = d.numberOfRecordsInStatus;
					break;
				case "cancelled" :
					subscriptionCancelled = d.numberOfRecordsInStatus;
					break;
			}
		});

		var subscriptionOutstanding = totalSubscriptions - subscriptionComplete - subscriptionClosed;

		var yPos = 5;
		var rowHeight = 14;
		var rowWidth = 210;
		var col2StartPos = 133;
		var headerPadding = 5;

		var columnDivider = table.append("line")
			.attr("x1", col2StartPos - 2)
 			.attr("y1", 0)
			.attr("x2", col2StartPos - 2)
			.attr("y2", table.node().getBBox().height - rowHeight)
			.attr("stroke", "black")
			.attr("stroke-width", 1);

		table.attr("transform", "translate(590, 20)");

		var tableHeader = table.append("g")
			.attr("class", "summaryTableHeader");

		tableHeader.append("rect")
			.attr("width", rowWidth)
			.attr("fill", "darkgrey");

		tableHeader.append("text")
			.text("Summary")
			.attr("dx", headerPadding);

		tableHeader.select("rect")
			.attr("height", 30)
			.attr("y", -24);

		appendTableRow("Currency", currency);
		appendTableRow("Planned Raise", toDollar(pieData.placementTarget.placementTotal));
		appendTableRow("Remaining", toDollar(pieData.placementTarget.data[2].value));
		appendHeaderRow("Subscription Status");
		appendTableRow("Total Subscriptions", toComma(totalSubscriptions));
		appendTableRow("Complete", toComma(subscriptionComplete));
		appendTableRow("Closed", toComma(subscriptionClosed));
		appendTableRow("Cancelled", toComma(subscriptionCancelled));
		appendTableRow("Outstanding", toComma(subscriptionOutstanding));
		appendHeaderRow("Incomplete Subscriptions");
		appendTableRow("After 14 Days", toComma(twoWeeks));
		appendTableRow("After 30 Days", toComma(oneMonth));
		appendHeaderRow("Funding");
		appendTableRow("Funds Promised", toDollar(pieData.globalTotals.fundsPromisedTotal));
		appendTableRow("Funds Collected", toDollar(pieData.globalTotals.fundsReceivedTotal));
		appendTableRow("Funds Outstanding", toDollar(pieData.globalTotals.fundsOutstandingTotal));

		columnDivider.attr("y2", table.node().getBBox().height - rowHeight - 10);

		function appendTableRow(col1, col2) {
			var fontSize = 14;
			yPos += rowHeight;
			var row = table.append("g")
				.attr("transform", "translate(0, " + yPos + ")");
			row.append("text")
				.text(col1);
			row.append("text")
				.text(col2)
				.attr("dx", col2StartPos)
				.style("font-size", function() {
					return Math.min(fontSize, (rowWidth - col2StartPos) / this.getComputedTextLength() * fontSize) + "px";
				});
		}

		function appendHeaderRow(label) {
			var buffer = 4;
			yPos += rowHeight + buffer;
			var row = table.append("g")
				.attr("class", "summaryGroupHeader")
				.attr("transform", "translate(0, " + yPos + ")");
			row.append("rect")
				.attr("width", rowWidth)
				.attr("height", rowHeight + buffer)
				.attr("fill", "#DADADA")
				.attr("y", -rowHeight + 1);
			row.append("text")
				.text(label)
				.attr("dx", headerPadding);

			yPos += buffer;
		}

		function toDollar(v) {
			return numeral(v).format("$0,0");
		}

		function toComma(v) {
			return numeral(v).format("0,0");
		}

		return table;
	},

	createDropShadowParameters: function(svg) {
		var defs = svg.append("defs");
		var dropfilter = defs.append("filter")
			.attr("id", "drop-shadow")
			.attr("height", "200%")
			.attr("width", "200%");

		dropfilter.append("feGaussianBlur")
			.attr("in", "SourceAlpha")
			.attr("stdDeviation", 5)
			.attr("result", "blur");

		dropfilter.append("feOffset")
			.attr("in", "blur")
			.attr("dx", 5)
			.attr("dy", 5)
			.attr("result", "offsetBlur");

		var dropfeMerge = dropfilter.append("feMerge");

		dropfeMerge.append("feMergeNode")
				.attr("in", "offsetBlur");
		dropfeMerge.append("feMergeNode")
				.attr("in", "SourceGraphic");

		var infilter = defs.append("filter")
			.attr("id", "inset-shadow")
			.attr("width", "200%")
			.attr("height", "200%")
			.attr("x", "-50%")
			.attr("y", "-50%");

		infilter.append("feComponentTransfer")
			.attr("in", "SourceAlpha")
		.append("feFuncA")
			.attr("type", "table")
			.attr("tableValues", "1 0");

		infilter.append("feGaussianBlur")
			.attr("stdDeviation", 3);

		infilter.append("feOffset")
			.attr("dx", 5)
			.attr("dy", 5)
			.attr("result", "offsetblur");

		infilter.append("feFlood")
			.attr("flood-color", "rgb(20, 0, 0)")
			.attr("result", "color");

		infilter.append("feComposite")
			.attr("in2", "offsetblur")
			.attr("operator", "in");

		infilter.append("feComposite")
			.attr("in2", "SourceAlpha")
			.attr("operator", "in");

		var infeMerge = infilter.append("feMerge");
		infeMerge.append("feMergeNode")
			.attr("in", "SourceGraphic");

		infeMerge.append("feMergeNode");
	},

	printPage: function() {
		var header = document.getElementsByClassName("reportHeader")[0];
		var summary = document.getElementsByClassName("chartContainer placementDetailsChart")[0];
		var status = document.getElementsByClassName("chartContainer subscriptionStatus")[0];

		var printHTML = "";
		printHTML += header.outerHTML;
		printHTML += summary.outerHTML;
		printHTML += status.outerHTML;
		var printContents = document.getElementById("d3chartdiv");
		var printWindow = window.open('printableCharts.html', Math.random() + '_print', 'location=yes, height=600, width=750, scrollbars=yes, status=no');
		printWindow.onload = function() {
			var print = printWindow.document;
			print.body.innerHTML = printHTML;

			print.getElementById("greenhillEquityHeaderLogo").src = "./assets/GreenhillEquityLogo.png";

			//d3.select(print.getElementById("placementDetailsLegend")).attr("transform", "translate(600, 350)");

			// Remove floating properties and drop shadow effects from containers and elements
			var charts = print.getElementsByClassName("chartContainer");
			for (var i = 0; i < charts.length; i++) {
				charts[i].removeAttribute("style");
			}

			var defs = print.getElementsByTagName("defs");
			for(var i = 0; i < defs.length; i++) {
				defs[i].parentNode.removeChild(defs[i]);
			}

			var circles = print.getElementsByTagName("circle");
			for(var i = 0; i < circles.length; i++) {
				circles[i].style.filter = null;
			}

			var rects = print.getElementsByTagName("rect");
			for(var i = 0; i < rects.length; i++) {
				rects[i].style.filter = null;
			}


			var isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
			if (isIE) {
				printWindow.print();
				setTimeout(function () { printWindow.close(); }, 100);
			}
			else {
				setTimeout(function () {
					printWindow.print();
					var ival = setInterval(function() {
						//printWindow.close();
						clearInterval(ival);
					}, 200);
				}, 500);
			}
		};
	},

	/******************************
	* Quantum Management Functions
	*******************************/

	handleLogout: function(inSender, inEvent)
	{
		this.doLogout();
	}
});