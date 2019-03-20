enyo.kind({
	name: "quantum.PreferencesModel",
	kind: "enyo.Model",
	options: { parse: true },
	source: enyo.LocalStorageSource.create(),
	attributes: {
		id: "quantumPreferencesModel",
		server: "http://dev.greenhill.local:5984/",
		apiServer: "http://localhost:3000/",
		placementDatabase: "",
		transferDatabase: "",
		contactDatabase: "",
		optionDatabase: "",
		warrantDatabase: "",
		proxyDatabase: "",
		username: "",
		password: "",
		company: "",
		companyName: "",
		placementInfo: null,
		placements: null,
		proxyInfo: null,
		proxies: null,
		roles: null,
		lastModule: ""
	},
	commit: function()
	{
		var attachmentsObj;

		if (this.get("placementInfo") && this.get("placementInfo")._attachments)
		{
			attachmentsObj = this.get("placementInfo")._attachments;
			delete this.get("placementInfo")._attachments;
		}

		this.inherited(arguments); //NOTE: We fire this regardless to make sure that any handlers fire properly.

		if (attachmentsObj)
		{
			this.get("placementInfo")._attachments = attachmentsObj;
		}
	}
});