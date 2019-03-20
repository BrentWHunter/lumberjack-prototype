enyo.kind({
	name: "lumberjack.ModulesSection",

	events: {
		onChangeModule: ""
	},

	style: "width: 212px;",

	components: [
		{style: "width: 64px; height: 64px;", classes: "placements-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/placements-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Issuers"}
		], ontap: "issuersModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "transfer-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/transfer-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 9px; text-align: center;", content: "Organizations"}
		], ontap: "organizationsModuleButtonTapped"},
		{style: "margin-left: 10px; width: 64px; height: 64px;", classes: "contacts-module-button", components: [
			{kind: "onyx.IconButton", src: "assets/icons/subscribers-button-icon.png", style: "margin-left: 16px; margin-top: 8px;"},
			{style: "width: 100%; margin-top: 4px; font-size: 10px; text-align: center;", content: "Contacts"}
		], ontap: "contactsModuleButtonTapped"}
	],

	issuersModuleButtonTapped: function() {
		this.doChangeModule({target: "issuer"});
	},

	organizationsModuleButtonTapped: function() {
		this.doChangeModule({target: "organization"});
	},

	contactsModuleButtonTapped: function() {
		this.doChangeModule({target: "contact"});
	}
});