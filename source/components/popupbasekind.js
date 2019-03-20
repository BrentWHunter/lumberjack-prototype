enyo.kind({
	name: "lumberjack.Popup",
	kind: "enyo.Control",
	zIndex: 999,

	components: [
		{name: "scrim", kind: "enyo.Scrim", floating: true, components: [
			{name: "popup", kind: "onyx.Popup", autoDismiss: false, centered: true, floating: true, modal: true}
		]}
	],

	subComponents: null,

	initComponents: function()
	{
		this.inherited(arguments);
		if (this.subComponents !== null)
		{
			this.$.popup.createComponents(this.subComponents, {owner: this});
		}
	},

	show: function()
	{
		this.inherited(arguments);
		this.$.scrim.addClass("enyo-scrim-translucent");
		this.$.scrim.showAtZIndex(this.zIndex);
		this.$.popup.defaultZ = this.zIndex + 1;
		this.$.popup.show();
		this.$.popup.resize();
	},

	hide: function()
	{
		this.inherited(arguments);
		try
		{
			this.$.scrim.hideAtZIndex(this.zIndex);
			this.$.popup.hide();
		}
		catch (err) {}
	}
});