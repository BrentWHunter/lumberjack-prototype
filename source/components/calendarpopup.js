enyo.kind({
	name: "lumberjack.CalendarPopup",
	kind: "onyx.Popup",

	//style: "margin-left: 150px;",

	components: [
		{name: "datePicker", kind: "gts.DatePicker"}
	],

	setDate: function(date)
	{
		this.$.datePicker.setValue(date);
	}
});