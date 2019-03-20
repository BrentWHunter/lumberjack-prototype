enyo.kind({
	name: "lumberjack.ModulesSection",

	events: {
		onChangeModule: ""
	},

	style: "width: 514px;",

	components: [
		{style: "width: 64px; height: 64px;", classes: "placements-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/placements-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Placements"}
		], ontap: "placementsModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "transfer-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/transfer-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Transfers"}
		], ontap: "transferModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "contacts-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/subscribers-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Contacts"}
		], ontap: "contactsModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "options-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/options-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Options"}
		], ontap: "optionsModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "warrants-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/warrants-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Warrants"}
		], ontap: "warrantsModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "proxies-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/proxies-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Proxies"}
		], ontap: "proxiesModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "reservations-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/reservations-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Reservations"}
		], ontap: "reservationsModuleButtonTapped"}
	],

	placementsModuleButtonTapped: function() {
		this.doChangeModule({target: "placement"});
	},

	transferModuleButtonTapped: function() {
		this.doChangeModule({target: "transfer"});
	},

	contactsModuleButtonTapped: function() {
		this.doChangeModule({target: "contact"});
	},

	optionsModuleButtonTapped: function() {
		this.doChangeModule({target: "option"});
	},

	warrantsModuleButtonTapped: function() {
		this.doChangeModule({target: "warrant"});
	},

	proxiesModuleButtonTapped: function() {
		this.doChangeModule({target: "proxy"});
	},

	reservationsModuleButtonTapped: function() {
		this.doChangeModule({target: "reservation"});
	}
});