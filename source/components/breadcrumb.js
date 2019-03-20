enyo.kind({
	name: "quantum.Breadcrumb",
	kind: "enyo.FittableColumns", 
	classes: "breadcrumb", 

	published: {
		icon: "",
		type: "",
		content: "",
		last: false
	},

	components: [
		{name: "icon", kind: "enyo.Image", style: "height: 24px;"},
		{name: "title", style: "margin-left: 10px;"},
		{name: "arrow", kind: "enyo.Image", style: "margin-left: 20px; height: 24px;", src: "assets/icons/right-arrow.png"}
	],

	bindings: [
		{from: ".icon", to: ".$.icon.src"},
		{from: ".content", to: ".$.title.content"},
		{from: ".last", to: ".$.arrow.showing", transform: function(v){return !v;}}
	]
});