/* global lumberjack, alertify */

enyo.kind({
	name: "lumberjack.LoginPopup",
	kind: "lumberjack.Popup",

	events: {
		onLoginSuccess: ""
	},

	handlers: {
		onKeyUp: "handleKeyUp"
	},

	subComponents: [
		{style: "width: 300px; height 90%; padding: 10px;", components: [
			{style: "text-align: center;", components: [
				{kind: "enyo.Image", style: "height: 60px; display: inline-block;", src: "assets/logo.png"}
			]},
			{style: "margin-top: 15px;", kind: "enyo.FittableColumns", components: [
				{style: "font-size: 18px; line-height: 38px; width: 90px;", content: $L("Username: ")},
				{style: "margin-left: 10px;", name: "usernameInputDecorator", kind: "onyx.InputDecorator", fit: true, alwaysLooksFocused: true, components: [
					{name: "usernameInput", kind: "onyx.Input", style: "width: 100%;"}
				]}
			]},
			{style: "margin-top: 10px;", kind: "enyo.FittableColumns", components: [
				{style: "font-size: 18px; line-height: 38px; width: 90px;", content: $L("Password: ")},
				{style: "margin-left: 10px;", name: "passwordInputDecorator", kind: "onyx.InputDecorator", fit: true, alwaysLooksFocused: true, components: [
					{name: "passwordInput", kind: "onyx.Input", attributes: {type: "password"}, style: "width: 100%;"}
				]}
			]},
			{name: "loginFailedLabel", style: "text-align: center; margin-top: 15px; color: red; font-size: 16px;", showing: false},
			{style: "text-align: center; margin-top: 15px;", components: [
				{name: "loginButton", kind: "lumberjack.Button", enabledClasses: "button primary", content: $L("Login"), style: "width: 100px; height: 40px;", ontap: "loginButtonTapped"}
			]}
		]}
	],

	loginButtonTapped: function(inSender, inEvent)
	{
		this.$.loginFailedLabel.hide();

		if (this.$.usernameInput.get("value") === "")
		{
			this.$.loginFailedLabel.set("content", $L("Missing Username"));
			this.$.loginFailedLabel.show();
			return true;
		}

		if (this.$.passwordInput.get("value") === "")
		{
			this.$.loginFailedLabel.set("content", $L("Missing Password"));
			this.$.loginFailedLabel.show();
			return true;
		}

		this.handleLogin();
	},

	handleLogin:function()
	{
		if (this.$.loadingPopup) { this.$.loadingPopup.destroy(); }
		this.createComponent({name: "loadingPopup", kind: "lumberjack.LoadingPopup", onHide: "handlePopupHidden"} , {owner:this});
		this.$.loadingPopup.show($L("Logging in..."));

		var loginData = {
			"username": this.$.usernameInput.get("value"),
			"password": this.$.passwordInput.get("value")
		};

		var ajaxProperties = {
			cacheBust: false,
			contentType: "application/json",
			method: "POST",
			url: lumberjack.preferences.get("apiServer") + "auth/login"
		};

		ajaxProperties.postBody = loginData;

		var ajax = new enyo.Ajax(ajaxProperties);

		ajax.error(function(request, response)
		{
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }

			if (request.xhrResponse.status === 401)
			{
				this.$.loginFailedLabel.set("content", $L("Bad Username or Password"));
			}
			else
			{
				this.$.loginFailedLabel.set("content", $L("Failed to Connect to Server"));
			}

			this.$.loginFailedLabel.show();
		}, this);

		ajax.response(function(request, response)
		{
			if (response.error)
			{
				if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
				alertify.error("Failed to Log In");
			}
			else
			{
				var roles = response.roles;

				if(roles.indexOf("newUser") !== -1)
				{
					if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
					alertify.error("Failed to Log In");
					console.log("New Users, login invalid.");
				}
				else
				{
					alertify.success("Logged In");

					lumberjack.preferences.set("roles", response.roles);
					lumberjack.preferences.set("userData", response);
					lumberjack.preferences.set("username", response.token);
					lumberjack.preferences.set("password", response.password);

					this.getCompanies();
				}
			}
		}, this);

		ajax.go();
	},

	getCompanies: function()
	{
		var request = new enyo.Ajax({
			url: lumberjack.preferences.get("apiServer") + "getcompanies",
			cacheBust: false,
			headers:{
				"Authorization":"Bearer " + lumberjack.preferences.get("username") +":"+lumberjack.preferences.get("password")
			}
		});

		request.error(enyo.bind(this, function(request, response){
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
			this.$.loginFailedLabel.set("content", $L("Failed to load companies"));
			this.$.loginFailedLabel.show();
			return true;
		}));

		request.response(enyo.bind(this, function(request, response)
		{
			if(response.error)
			{
				if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }
				this.$.loginFailedLabel.set("content", response.detail);
				this.$.loginFailedLabel.show();
				console.log(response);
				return true;
			}
			if (this.$.loadingPopup) { this.$.loadingPopup.hide(); }

			if(response.companies.length === 0)
			{
				this.$.loginFailedLabel.set("content", "No Assigned Companies");
				this.$.loginFailedLabel.show();
				return true;
			}
			else
			{
				this.doLoginSuccess();
			}

			this.hide();
		}));

		request.go();
	},

	handleKeyUp: function(inSender, inEvent)
	{
		if (inEvent.keyCode === 13)
		{
			this.loginButtonTapped();
		}
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	}
});