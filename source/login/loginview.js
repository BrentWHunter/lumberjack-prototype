/* global lumberjack */
enyo.kind({
	name: "lumberjack.LoginView",
	kind: "FittableRows",

	events:{
		onLoginSuccessful: ""
	},

	components: [
		{kind: enyo.Signals, onkeyup: "handleKeyUp"}
	],

	rendered: function(){
		this.inherited(arguments);
		moment.tz.setDefault("UTC");
		if (lumberjack.preferences.get("username") && lumberjack.preferences.get("password") && lumberjack.preferences.get("lastModule"))
		{
			this.doLoginSuccessful();
		}
		else
		{
			if (this.$.loginPopup) {this.$.loginPopup.hide();}
			if (this.$.loginPopup) {this.$.loginPopup.destroy();}
			this.createComponent({
				name: "loginPopup",
				kind: "lumberjack.LoginPopup",
				onLoginSuccess: "handleLoginSuccess",
				onHide: "handlePopupHidden"},
			{owner:this});
			this.$.loginPopup.show();
		}
	},

	handleKeyUp: function(inSender, inEvent)
	{
		//pass it down the chain
		inEvent.delegate = null;
		this.waterfallDown("onKeyUp", inEvent, inSender);
	},

	handleLoginSuccess: function(inSender, inEvent)
	{
		this.doLoginSuccessful();
	},

	handlePopupHidden: function(inSender, inEvent)
	{
		inEvent.originator.destroy();
		return true;
	},

	handleRequiredPopupCancelled: function(inSender, inEvent)
	{
		//If something has happened that broke one of the required popups, then re-render, and force a re-login.
		this.render();
		return true;
	}
});