enyo.kind({
	name: "quantum.SupportingDocuments",

	published: {
		activeEntry: null,
		database: null,
		documentsReceived: null,
		documentsToUpload: null,
		documentsToDelete: null,
		downloadDirect: true,
		readOnly: false,
		attachmentIndexKey: "attachmentID",
		documentNameKey: "name",
		module: ""
	},

	events: {
		onAddDocument: "",
		onDownloadDocument: "",
		onLogout: ""
	},

	components: [
		{style: "padding-right: 5px; min-width: 670px;", components: [
			{style: "font-size: 24px; padding-bottom: 5px; border-bottom: 1px solid black;", content: "Supporting Documents"},
			{kind: "enyo.FittableColumns", style: "background-color: #343434; color: white; padding: 5px; margin-top: 10px; border: 1px solid black;", components: [
				{content: "Description", style: "min-width: 300px;"},
				{content: "Date Received", style: "width: 90px;"}
			]},
			{name: "documentsReceivedRepeater", kind: "enyo.Repeater", count: 0, style: "width: 100%; border: 1px solid black;", onSetupItem: "setupDocumentRepeaterItem", components: [
				{name: "documentItem", style: "background-color: white; border-bottom: 1px solid black; padding: 5px;", selected: false, layoutKind: "enyo.FittableColumnsLayout", components: [
					{name: "description", style: "width: 300px; line-height: 34px;"},
					{name: "dateReceived", style: "width: 90px; line-height: 34px;"},
					{name: "viewButton", kind: "quantum.Button", enabledClasses: "button primary", style: "margin: 0 0 0 10px; line-height: 30px;", content: "View", ontap: "viewDocumentButtonTapped"},
					{name: "downloadButton", kind: "quantum.Button", enabledClasses: "button bg-darkViolet fg-white", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Download", ontap: "downloadDocumentButtonTapped"},
					{name: "deleteButton", kind: "quantum.Button", enabledClasses: "button danger", style: "margin: 0 0 0 10px; line-height: 30px;", content: "Delete", ontap: "deleteDocumentButtonTapped"}
				]}
			]},
			{name: "noDocumentsLabel", style: "text-align: center; padding: 10px; border: 1px solid black;", showing: false, content: "No Documents Received"},
			{style: "margin-top: 10px;", components: [
				{name: "addDocumentButton", kind: "quantum.Button", enabledClasses: "button primary", content: "Add Document", ontap: "handleAddDocumentButtonTapped"}
			]}
		]},
		{name: "loadingPopup", kind: "quantum.LoadingPopup"}
	],

	bindings:[
		{from: ".documentsReceived", to: ".documentsToUpload", transform: function(v) {
 			// Use the binding to force the "documentsToUpload" queue to reset when the "documentsReceived" changes.
 			return [];
 		}},
 		{from: ".documentsReceived", to: ".documentsToDelete", transform: function(v) {
 			// Use the binding to force the "documentsToDelete" queue to reset when the "documentsReceived" changes.
 			return [];
 		}},
 		{from: ".readOnly", to: ".$.addDocumentButton.disabled"}
	],

	docxFilePopup: function(fileType, fileData, url)
	{
		if (fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
			var DOCXfileContents = "";

			function handleFileSelect(arrayBuffer, callback) {
				mammoth.convertToHtml({arrayBuffer: arrayBuffer})
				.then(displayResult)
				.then(callback);
			}

			function displayResult(result) {
				DOCXfileContents = result.value;
			}

			function loadPopUp(result) {
				if (that.$.showDocumentPopup) 
				{
					that.$.showDocumentPopup.hide();
					that.$.showDocumentPopup.destroy();
				}
				that.createComponent({name: "showDocumentPopup", kind: "quantum.docxPopup"}, {owner:that});
				that.$.showDocumentPopup.$.main.addContent(DOCXfileContents);
				that.$.showDocumentPopup.show();
			}

			var that = this; // sets "this" inside the function

			handleFileSelect(fileData, loadPopUp);

		} 
		else 
		{
			window.open(url);
		}
	},

	canEdit: function()
	{
		return quantum.hasRole(["admins","users"], this.get("module")) && !this.get("readOnly");
	},

	handleAddDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.addDocumentPopup) 
		{
			this.$.addDocumentPopup.hide();
			this.$.addDocumentPopup.destroy();
		}
		this.createComponent({name: "addDocumentPopup", kind: "quantum.AddDocumentPopup", onAddDocument: "", onHide: "handlePopupHidden"} , {owner:this});
		this.$.addDocumentPopup.show();
	},

	setupDocumentRepeaterItem: function(inSender, inEvent)
	{
		if (!inEvent.item) {return true;}

		inEvent.item.$.documentItem.applyStyle("background-color", inEvent.index % 2 === 0 ? "white" : "lightgrey");

		inEvent.item.$.description.set("content", this.get("documentsReceived")[inEvent.index].description);
		
		if (typeof this.get("documentsReceived")[inEvent.index].receivedDate !== 'number')
		{
			inEvent.item.$.dateReceived.set("content", this.get("documentsReceived")[inEvent.index].receivedDate);
		}
		else
		{
			inEvent.item.$.dateReceived.set("content", moment(this.get("documentsReceived")[inEvent.index].receivedDate).format("YYYY/MM/DD"));
		}

		if (this.get("documentsReceived")[inEvent.index].localDownload !== true && !quantum.hasRole(["admins"], this.get("module")))
		{	
			inEvent.item.$.deleteButton.set("disabled", true);
		}
		inEvent.item.$.deleteButton.set("showing", this.canEdit());

		return true;
	},

	viewDocumentButtonTapped: function(inSender, inEvent)
	{
		var attachmentIndexKey = this.get("attachmentIndexKey");
		var documentNameKey = this.get("documentNameKey");

		// Checks if file is DOCX format
		if (this.get("documentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			var fileType = this.get("documentsReceived")[inEvent.index].fileType;
			var fileData = this.get("documentsReceived")[inEvent.index].fileData;
			var url = URL.createObjectURL(new Blob([new Uint8Array(this.get("documentsReceived")[inEvent.index].fileData)], {type: fileType}));
			this.docxFilePopup(fileType, fileData, url);
		}
		else if (!this.get("downloadDirect"))
		{
			this.doDownloadDocument({documentID: this.get("documentsReceived")[inEvent.index][attachmentIndexKey], documentName: this.get("documentsReceived")[inEvent.index][documentNameKey], view: true, fileType: this.get("documentsReceived")[inEvent.index].fileType});
		}
		else
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Login Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("documentsReceived")[inEvent.index][attachmentIndexKey], enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					var reader = new FileReader();
					reader.addEventListener("loadend", enyo.bind(this, function() {
						// rebuild the blob because it's coming back from the couchdb server with the wrong MIME type
						var fileType = this.get("documentsReceived")[inEvent.index].fileType;
						var fileData = reader.result;
						var url = URL.createObjectURL(new Blob([reader.result], {type: fileType}));
						this.$.loadingPopup.hide();
						this.docxFilePopup(fileType, fileData, url);
						// window.open(url);
					}));
					reader.readAsArrayBuffer(response);
				}));
			}));
		}
	},

	downloadDocumentButtonTapped: function(inSender, inEvent)
	{
		var attachmentIndexKey = this.get("attachmentIndexKey");
		var documentNameKey = this.get("documentNameKey");

		if (this.get("documentsReceived")[inEvent.index].localDownload)
		{
			//Download the file data that we already have
			saveAs(new Blob([new Uint8Array(this.get("documentsReceived")[inEvent.index].fileData)], {type: this.get("documentsReceived")[inEvent.index].fileType}), this.get("documentsReceived")[inEvent.index].name);
		}
		else if (!this.get("downloadDirect"))
		{
			this.doDownloadDocument({documentID: this.get("documentsReceived")[inEvent.index][attachmentIndexKey], documentName: this.get("documentsReceived")[inEvent.index][documentNameKey]});
		}
		else
		{
			this.$.loadingPopup.show("Downloading");
			this.get("database").login(quantum.preferences.get("username"), quantum.preferences.get("password"), enyo.bind(this, function(err, response) {
				if (err)
				{
					alertify.error("Login Failed");
					console.log(err);
					this.$.loadingPopup.hide();
					if(err.status == 401){
						this.doLogout();
						return;
					}
					return;
				}

				this.get("database").getAttachment(this.get("activeEntry").get("_id"), this.get("documentsReceived")[inEvent.index][attachmentIndexKey], enyo.bind(this, function(err, response) {
					if (err)
					{
						alertify.error("Get Attachment Failed");
						console.log(err);
						this.$.loadingPopup.hide();
						return;
					}

					this.$.loadingPopup.hide();
					saveAs(response, this.get("documentsReceived")[inEvent.index][documentNameKey]);
				}));
			}));
		}
	},

	deleteDocumentButtonTapped: function(inSender, inEvent)
	{
		if (!this.canEdit()) { return; }

		if (this.$.confirmDeleteDocumentPopup)
		{
			this.$.confirmDeleteDocumentPopup.hide();
			this.$.confirmDeleteDocumentPopup.destroy();
		}
		this.createComponent({name: "confirmDeleteDocumentPopup", kind: "quantum.ConfirmPopup", onYesWithReturnValue: "deleteDocument", onHide: "handlePopupHidden"} , {owner:this});
		this.$.confirmDeleteDocumentPopup.show("Delete Document? You must save entry to make this permament.", inEvent.index);
	},

	deleteDocument: function(inSender, inEvent)
	{
		var attachmentIndexKey = this.get("attachmentIndexKey");

		if (this.get("documentsReceived")[inEvent.returnValue].localDownload)
		{
			//Delete the local data
			var itemToFind = this.get("documentsReceived")[inEvent.returnValue];
			var result = this.get("documentsToUpload").find(function(value, index, array) {
				return value[attachmentIndexKey] === itemToFind[attachmentIndexKey];
			});

			this.get("documentsToUpload").splice(this.get("documentsToUpload").indexOf(result), 1);
			this.get("documentsReceived").splice(inEvent.returnValue, 1);
			alertify.success("Document Deleted");
			this.refreshRepeater();
		}
		else
		{
			this.get("documentsToDelete").push(this.get("documentsReceived")[inEvent.returnValue][attachmentIndexKey]);
			this.get("documentsReceived").splice(inEvent.returnValue, 1);
			this.refreshRepeater();
		}
	},

	isDirty: function()
	{
		if (this.get("documentsToUpload").length !== 0 || this.get("documentsToDelete").length !== 0)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	setAddDisabled: function(disabled)
	{
		this.$.addDocumentButton.set("disabled", disabled);
	},

	refreshRepeater: function()
	{
		this.$.noDocumentsLabel.set("showing", this.get("documentsReceived").length === 0);
		this.$.documentsReceivedRepeater.set("showing", this.get("documentsReceived").length > 0);
		this.$.documentsReceivedRepeater.setCount(this.get("documentsReceived").length);
	},

	clearQueues: function()
	{
		this.set("documentsToUpload", []);
		this.set("documentsToDelete", []);
	}
});