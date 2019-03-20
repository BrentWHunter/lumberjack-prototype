enyo.kind({
	name: "lumberjack.Usa6F",

	published:
	{
		tempUsa6Fs: null,
		usa6Fs: null,
		validating: false,
		disabled: false
	},

	style: "border: 1px solid black; max-width: 970px; padding: 10px;",

	_validated: true,

	_tooltipPickerItemTemplate: {
		handlers: {
			onmouseover: "tooltipshow",
			onmouseout: "tooltiphide"
		},	
		tooltipshow: function (s, e) {
			if (!this.$.tooltipInfo) {
				this.startJob("tooltipjob", enyo.bindSafely(this, function (e) {
					var tooltipComponents = [{
						classes:"tooltip-popup",
						content: e.originator.tooltip
					}];

					if (this && this.$ && !this.$.tooltipInfo) {
						this.createComponent({
							name: "tooltipInfo",
							kind: "enyo.Popup",
							floating: true,
							scrim: false,
							allowHtml: true,
							classes: "tooltip",
							style: "padding: 5px; background-color: white; max-width: 800px; border: 1px solid black; box-shadow: 1px 1px;",
							components: tooltipComponents
						});
						this.$.tooltipInfo.showAtEvent(e);
					}

					tooltipComponents = e = null;

				}, e), 500);
			}
		},
		tooltiphide: function (s, e) {
			if (e.toElement.getAttribute("class") !== "tooltip-popup") //Low tech test so that we don't hide the tooltip if the mouse is over the tooltip.
			{
				if (this.$.tooltipInfo) {
					this.$.tooltipInfo.destroy();
				}
				
				this.stopJob("tooltipjob");
			}
		}
	},

	_individualAccreditedInvestorQualifications: [
		{value: "usa5A", content: "Paragraph 5A", tooltip: "A natural person whose individual net worth, or joint net worth with that person’s spouse, at the time of purchase, exceeds US$1,000,000 (note: for the purposes of calculating net worth, (i) the person’s primary residence shall not be included as an asset; (ii) indebtedness that is secured by the person’s primary residence, up to the estimated fair market value of the primary residence at the time of this certification, shall not be included as a liability (except that if the amount of such indebtedness outstanding at the time of this certification exceeds the amount outstanding 60 days before such time, other than as a result of the acquisition of the primary residence, the amount of such excess shall be included as a liability); and (iii) indebtedness that is secured by the person’s primary residence in excess of the estimated fair market value of the primary residence shall be included as a liability)."}, 
		{value: "usa5B", content: "Paragraph 5B", tooltip: "A natural person who had an individual income in excess of US $200,000 in each of the two most recent years or joint income with that person’s spouse in excess of US $300,000 in each of those years and has a reasonable expectation of reaching the same income level in the current year."}
	],
	_corporateAccreditedInvestorQualifications: [
		{value: "usa6A", content: "Paragraph 6A", tooltip: "An organization described in Section 501(c)(3) of the United States Internal Revenue Code, a corporation, a Massachusetts or similar business trust or partnership, not formed for the specific purpose of acquiring the Shares, with total assets in excess of US $5,000,000."}, 
		{value: "usa6B", content: "Paragraph 6B", tooltip: "A trust that (a) has total assets in excess of US $5,000,000, (b) was not formed for the specific purpose of acquiring the Shares and (c) is directed in its purchases of securities by a person who has such knowledge and experience in financial and business matters that he/she is capable of evaluating the merits and risks of an investment in the Shares."}, 
		{value: "usa6C", content: "Paragraph 6C", tooltip: "An investment company registered under the Investment Company Act of 1940 or a business development company as defined in Section 2(a)(48) of that Act."},
		{value: "usa6D", content: "Paragraph 6D", tooltip: "A Small Business Investment Company licensed by the U.S. Small Business Administration under Section 301(c) or (d) of the Small Business Investment Act of 1958."}, 
		{value: "usa6E", content: "Paragraph 6E", tooltip: "A private business development company as defined in Section 202(a)(22) of the Investment Advisors Act of 1940."}, 
		{value: "usa6F", content: "Paragraph 6F", tooltip: "An entity in which all of the equity owners satisfy the requirements of one or more of the foregoing categories."}
	],
	_detailQualifications: ["usa6F"],
	_activeIndex: -1,

	components:[
		{content: "Equity Owners", style: "margin-top: 10px; font-size: 16px; font-weight: bold; width: 100%; text-align: center;"},
		{name: "noEquityOwnersItem", content: "No Equity Owners", style: "margin-top: 10px; width: 100%; text-align: center;"},
		{name: "equityOwnersRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 468px; margin-top: 10px;", onSetupItem: "setupEquityOwnerRepeaterItem", components: [
			{name: "equityOwnerItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
				{kind: "enyo.FittableColumns", components: [
					{name: "equityOwnerName", style: "width: 310px; line-height: 34px; font-size: 16px;"},
					{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px;", content: "Delete", ontap: "deleteEquityOwnerButtonTapped"},
					{fit: true},
					{name: "collapseIcon", kind: "enyo.Image", src: "assets/icons/down-arrow.png", style: "cursor: pointer;", ontap: "collapseIconTapped"}
				]},
				{name: "equityOwnerDetailDrawer", kind: "enyo.Drawer", components: [
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Email Address:", style: "width: 150px;"},
						{name: "equityOwnerEmail", style: "width: 310px;"}
					]},
					{name: "equityOwnerContactPersonSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Contact Person:", style: "width: 150px;"},
						{name: "equityOwnerContactPerson", style: "width: 310px;"}
					]},
					{name: "equityOwnerContactPersonTitleSection", kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{content: "Contact Person Title:", style: "width: 150px;"},
						{name: "equityOwnerContactPersonTitle", style: "width: 310px;"}
					]},
					{content: "Accredited Investor Qualifications", style: "font-size: 16px; font-weight: bold; width: 300px; text-align: center; margin-top: 15px;"},
					{name: "noQualificationsItem", content: "No Accredited Investor Qualifications", style: "margin-top: 10px; width: 300px; text-align: center;"},
					{name: "qualificationRepeater", kind: "enyo.Repeater", count: 0, style: "min-width: 395px; margin-top: 10px;", onSetupItem: "setupQualificationRepeaterItem", components: [
						{name: "qualificationItem", style: "background-color: white; border: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableRowsLayout", components: [
							{kind: "enyo.FittableColumns", components: [
								{name: "qualificationName", style: "width: 300px; line-height: 34px;"},
								{name: "deleteButton", kind: "enyo.Button", classes: "button danger", style: "line-height: 30px; margin-left: 5px;", content: "Delete", ontap: "deleteQualificationButtonTapped"}
							]},
							{name: "qualificationDetailSection"}
						]}
					]},				
					{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
						{kind: "onyx.PickerDecorator", style: "", components: [
							{name: "qualificationPickerButton", style: "width: 300px; padding: 4px 18px;"},
							{name: "qualificationPicker", kind: "onyx.Picker"}
						]},
						{name: "addQualificationButton", kind: "enyo.Button", classes: "button primary", style: "line-height: 30px; margin-left: 10px;", content: "Add Qualification", ontap: "addQualificationButtonTapped"}
					]}
				]}
			]}
		]},
		{kind: "lumberjack.Input", name:"addEquityOwnerNameInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Equity Owner Name", required:true},
		{kind: "lumberjack.Input", name:"equityOwnerEmailInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"email", label:"Email", required:true},
		{kind: "enyo.FittableColumns", style: "margin-top: 10px;", components: [
			{content: "Owner Type", style: "line-height: 30px; width: 160px;"},
			{kind: "onyx.PickerDecorator", style: "", components: [
				{name: "ownerTypePickerButton", style: "width: 300px; padding: 4px 18px;"},
				{name: "ownerTypePicker", kind: "onyx.Picker", onChange: "ownerTypePickerChanged", components: [
					{name: "individualOwnerTypePickerItem", value: "individual", content: "Individual/Joint", active: true},
					{name: "corporateOwnerTypePickerItem", value: "corporate", content: "Corporate/Trust/Other"}
				]}
			]}
		]},
		{kind: "lumberjack.Input", name:"equityOwnerContactPersonInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Contact Person", required:true},
		{kind: "lumberjack.Input", name:"equityOwnerContactPersonTitleInput", columnStyle:"margin-top: 10px;", labelStyle:"line-height: 30px; width: 150px;", decoratorStyle: "margin-left: 10px;", inputStyle: "width: 300px;", type:"text", label:"Contact Person Title", required:true},
		{kind: "enyo.FittableColumns", style: "margin-top: 15px;", components: [
			{fit: true},
			{name: "addEquityOwnerButton", kind: "lumberjack.Button", enabledClasses: "button primary", content: $L("Add Equity Owner"), style: "width: 175px; height: 30px; margin-right: 8px;", ontap: "addEquityOwnerButtonTapped"}
		]}
	],

	bindings:[
		{from: ".usa6Fs", to: ".tempUsa6Fs", transform: function(v){
			try
			{
				var tempArray = [];
				v.forEach(function(value, index, array){
					var tempVal = {
						entityName: value.entityName,
						type: value.type,
						contactPersonName: value.contactPersonName,
						contactPersonTitle: value.contactPersonTitle,
						emailAddress: value.emailAddress,
						accreditedInvestorQualification: [],
						accreditedInvestorQualificationDetail: {}
					};

					value.accreditedInvestorQualification.forEach(function(innerValue, innerIndex, innerArray){
						tempVal.accreditedInvestorQualification.push(innerValue);

						//We either rely on an array or a single object, so we know that it should be one or the other if we're loading it here.
						if (Array.isArray(value.accreditedInvestorQualificationDetail[innerValue]))
						{
							tempVal.accreditedInvestorQualificationDetail[innerValue] = [];
							value.accreditedInvestorQualificationDetail[innerValue].forEach(function(innerInnerValue, innerInnerIndex, innerInnerArray){
								tempVal.accreditedInvestorQualificationDetail[innerValue].push(Object.assign({}, innerInnerValue));
							});
						}
						else
						{
							tempVal.accreditedInvestorQualificationDetail[innerValue] = Object.assign({}, value.accreditedInvestorQualificationDetail[innerValue]);
						}
					});
					tempArray.push(tempVal);
				});

				return tempArray;
			}
			catch(err)
			{
				return [];
			}
		}},
		{from: ".disabled", to: ".$.addEquityOwnerNameInput.disabled"},
		{from: ".disabled", to: ".$.equityOwnerEmailInput.disabled"},
		{from: ".disabled", to: ".$.ownerTypePickerButton.disabled"},
		{from: ".disabled", to: ".$.equityOwnerContactPersonInput.disabled"},
		{from: ".disabled", to: ".$.equityOwnerContactPersonTitleInput.disabled"},
		{from: ".disabled", to: ".$.addEquityOwnerButton.disabled"},
		{from: ".$.ownerTypePicker.selected", to: ".$.equityOwnerContactPersonInput.showing", transform: function(v){return v.name === "corporateOwnerTypePickerItem";}},
		{from: ".$.ownerTypePicker.selected", to: ".$.equityOwnerContactPersonTitleInput.showing", transform: function(v){return v.name === "corporateOwnerTypePickerItem";}}
	],

	create: function(){
		this.inherited(arguments);
	},

	rendered: function(){
		this.inherited(arguments);
		this._activeIndex = -1;
		this.$.noEquityOwnersItem.set("showing", this.get("tempUsa6Fs").length === 0);
		this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
	},

	/*****************
	* Observers
	*****************/

	disabledChanged: function(oldVal, newVal)
	{
		//If the disabled status is changed, the reset the repeater so that it will redraw all of the components and set the disabled status correctly
		this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
	},

	tempUsa6FsChanged: function(oldVal, newVal)
	{
		this.render();
	},

	ownerTypePickerChanged: function(){
		if (this.$.equityOwnerContactPersonInput) //This gets called before render, so we wait for the objects to exist.
		{
			this.$.equityOwnerContactPersonInput.set("value", "");
			this.$.equityOwnerContactPersonTitleInput.set("value", "");
		}
	},

	addEquityOwnerButtonTapped: function(inSender, inEvent)
	{
		this.$.addEquityOwnerNameInput.clearBorderError();
		this.$.equityOwnerContactPersonInput.clearBorderError();
		this.$.equityOwnerContactPersonTitleInput.clearBorderError();
		this.$.equityOwnerEmailInput.clearBorderError();

		var validated = true;

		//This chunk makes sure that the validation function always gets run, and that it doesn't effect the current value if validated true is returned.
		validated = this.$.addEquityOwnerNameInput.validate() ? validated : false;
		validated = this.$.equityOwnerEmailInput.validate() ? validated : false;

		if (this.$.ownerTypePicker.get("selected").value === "corporate")
		{
			validated = this.$.equityOwnerContactPersonInput.validate() ? validated : false;
			validated = this.$.equityOwnerContactPersonTitleInput.validate() ? validated : false;
		}

		if (validated && (this.get("tempUsa6Fs").length === 0 || this.validate()))
		{
			this.get("tempUsa6Fs").push({
				entityName: this.$.addEquityOwnerNameInput.get("value"),
				type: this.$.ownerTypePicker.get("selected").value,
				contactPersonName: this.$.equityOwnerContactPersonInput.get("value"),
				contactPersonTitle: this.$.equityOwnerContactPersonTitleInput.get("value"),
				emailAddress: this.$.equityOwnerEmailInput.get("value"),
				accreditedInvestorQualification: [],
				accreditedInvestorQualificationDetail: {}
			});
			this._activeIndex = this.get("tempUsa6Fs").length - 1;
			this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
			this.$.noEquityOwnersItem.set("showing", this.get("tempUsa6Fs").length === 0);
			this.$.addEquityOwnerNameInput.set("value", "");
			this.$.equityOwnerContactPersonInput.set("value", "");
			this.$.equityOwnerContactPersonTitleInput.set("value", "");
			this.$.equityOwnerEmailInput.set("value", "");
		}
	},

	deleteEquityOwnerButtonTapped: function(inSender, inEvent)
	{
		this.get("tempUsa6Fs").splice(inEvent.index, 1);
		this._activeIndex = this.get("tempUsa6Fs").length - 1;
		this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
		this.$.noEquityOwnersItem.set("showing", this.get("tempUsa6Fs").length === 0);
	},

	addQualificationButtonTapped: function(inSender, inEvent)
	{
		this.get("tempUsa6Fs")[inEvent.index].accreditedInvestorQualification.push(inSender.controls[inEvent.index].$.qualificationPicker.get("selected").value);
		this.$.equityOwnersRepeater.renderRow(inEvent.index);
	},

	deleteQualificationButtonTapped: function(inSender, inEvent)
	{
		delete this.get("tempUsa6Fs")[inEvent.indices[1]].accreditedInvestorQualificationDetail[this.get("tempUsa6Fs")[inEvent.indices[1]].accreditedInvestorQualification[inEvent.indices[0]]];
		this.get("tempUsa6Fs")[inEvent.indices[1]].accreditedInvestorQualification.splice(inEvent.indices[0], 1);
		this.$.equityOwnersRepeater.renderRow(inEvent.indices[1]);
	},

	populateQualifications: function(item, index)
	{
		item.$.qualificationPicker.set("selected", null);
		item.$.qualificationPickerButton.set("disabled", false);
		item.$.addQualificationButton.set("disabled", false);
		item.$.addQualificationButton.addClass("primary");

		item.$.qualificationPicker.destroyClientControls();
		var accreditedInvestorQualification = [];
		var activeItemSet = false;

		var sourceArray = this.get("tempUsa6Fs")[index].type === "individual" ? this._individualAccreditedInvestorQualifications : this._corporateAccreditedInvestorQualifications;

		for (var i = 0; i < sourceArray.length; i++)
		{
			var foundQualification = false;
			for (var j = 0; j < this.get("tempUsa6Fs")[index].accreditedInvestorQualification.length; j++)
			{
				if (this.get("tempUsa6Fs")[index].accreditedInvestorQualification[j] === sourceArray[i].value)
				{
					foundQualification = true;
				}
			}
			if (!foundQualification)
			{
				accreditedInvestorQualification.push(Object.assign({}, this._tooltipPickerItemTemplate, sourceArray[i]));
			}
		}

		if (accreditedInvestorQualification.length === 0 || this.get("disabled"))
		{
			item.$.qualificationPickerButton.set("disabled", true);
			item.$.addQualificationButton.set("disabled", true);
			item.$.addQualificationButton.removeClass("primary");

			accreditedInvestorQualification.push({content: "No Qualifications Available.", active: true});
		}
		else
		{
			accreditedInvestorQualification.sort(function(a, b){
				if (a.content > b.content) {return 1;}
				if (a.content < b.content) {return -1;}
				return 0;
			});

			accreditedInvestorQualification[0].active = true;
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		item.$.qualificationPicker.createComponents(accreditedInvestorQualification, {owner: this});
		item.$.qualificationPicker.render();
	},

	setupEquityOwnerRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempUsa6Fs")[inEvent.index];
		if (this._activeIndex === -1) {this._activeIndex = 0;}

		item.$.equityOwnerName.set("content", target.entityName);
		item.$.equityOwnerEmail.set("content", target.emailAddress);

		item.$.equityOwnerContactPersonSection.set("showing", target.type === "corporate");
		item.$.equityOwnerContactPerson.set("content", target.contactPersonName);
		item.$.equityOwnerContactPersonTitleSection.set("showing", target.type === "corporate");
		item.$.equityOwnerContactPersonTitle.set("content", target.contactPersonTitle);

		this.populateQualifications(item, inEvent.index);
		item.$.noQualificationsItem.set("showing", target.accreditedInvestorQualification.length === 0);
		item.$.qualificationRepeater.setCount(target.accreditedInvestorQualification.length);
		
		item.$.collapseIcon.set("showing", this._activeIndex !== inEvent.index);
		item.$.equityOwnerDetailDrawer.set("open", this._activeIndex === inEvent.index);

		if (this.get("validating") && target.accreditedInvestorQualification.length === 0)
		{
			this._validated = false;
			item.$.qualificationPickerButton.applyStyle("border", "1px solid red");
		}
		else
		{
			item.$.qualificationPickerButton.applyStyle("border", null);
		}
		
		return true;
	},

	collapseIconTapped: function(inSender, inEvent)
	{
		this._activeIndex = inEvent.index;
		this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
		return true;
	},

	setupQualificationRepeaterItem: function(inSender, inEvent)
	{
		var item = inEvent.item;
		var target = this.get("tempUsa6Fs")[inEvent.indices[1]].accreditedInvestorQualification[inEvent.indices[0]];
		var detailItem = this.get("tempUsa6Fs")[inEvent.indices[1]].accreditedInvestorQualificationDetail;

		var sourceArray = this.get("tempUsa6Fs")[inEvent.indices[1]].type === "individual" ? this._individualAccreditedInvestorQualifications : this._corporateAccreditedInvestorQualifications;

		for (var i = 0; i < sourceArray.length; i++)
		{
			if (target === sourceArray[i].value)
			{
				item.$.qualificationName.set("content", sourceArray[i].content);
			}
		}

		if (this._detailQualifications.indexOf(target) !== -1 && !detailItem[target])
		{
			detailItem[target] = null;
		}

		if (this.get("disabled"))
		{
			item.$.deleteButton.set("disabled", true);
			item.$.deleteButton.removeClass("danger");
		}

		var qualificationDetailObject;

		//First set up the object
		switch(target)
		{
			case "usa6F":
				qualificationDetailObject = {name: "qualificationDetail", kind: "lumberjack.Usa6F", disabled: this.get("disabled"), usa6Fs: detailItem[target]};
				break;
		}

		//Create it
		if (qualificationDetailObject)
		{
			item.$.qualificationDetailSection.createComponent(qualificationDetailObject, {owner: item});
		}

		//Then map the detail object to the component's temp object so that we persist across changes/re-creations. 
		switch(target)
		{
			case "usa6F":
				detailItem[target] = item.$.qualificationDetail.get("tempUsa6Fs");
				break;
		}

		if (this.get("validating") && item.$.qualificationDetail && !item.$.qualificationDetail.validate())
		{
			this._validated = false;
		}

		return true;
	},

	validate: function()
	{
		this.clearValidation();
		this.set("validating", true);
		this._validated = true;
		if (this.get("tempUsa6Fs").length === 0)
		{
			this._validated = false;
			this.$.addEquityOwnerNameInput.validate();
			this.$.equityOwnerEmailInput.validate();
		}
		this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
		this.set("validating", false);
		return this._validated;
	},

	clearValidation: function()
	{
		this.set("validating", false);
		this.$.addEquityOwnerNameInput.clearBorderError();
		this.$.equityOwnerEmailInput.clearBorderError();
		this.$.equityOwnersRepeater.setCount(this.get("tempUsa6Fs").length);
	}
});