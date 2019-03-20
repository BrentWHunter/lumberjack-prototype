enyo.kind({
	name: "lumberjack.CountryPicker",

	published: 
	{
		disabled: false,
		selected: null
	},

	components: [
		{kind: "onyx.PickerDecorator", components: [
			{name: "pickerButton", style: "width: 100%;"},
			{name: "picker", kind: "onyx.Picker", components: [
				{content: "Afghanistan", value: "AFG"},
				{content: "Albania", value: "ALB"},
				{content: "Algeria", value: "DZA"},
				{content: "American Samoa", value: "ASM"},
				{content: "Andorra", value: "AND"},
				{content: "Angola", value: "AGO"},
				{content: "Anguilla", value: "AIA"},
				{content: "Antarctica", value: "ATA"},
				{content: "Antigua and Barbuda", value: "ATG"},
				{content: "Argentina", value: "ARG"},
				{content: "Armenia", value: "ARM"},
				{content: "Aruba", value: "ABW"},
				{content: "Australia", value: "AUS"},
				{content: "Austria", value: "AUT"},
				{content: "Azerbaijan", value: "AZE"},
				{content: "Bahamas", value: "BHS"},
				{content: "Bahrain", value: "BHR"},
				{content: "Bangladesh", value: "BGD"},
				{content: "Barbados", value: "BRB"},
				{content: "Belarus", value: "BLR"},
				{content: "Belgium", value: "BEL"},
				{content: "Belize", value: "BLZ"},
				{content: "Benin", value: "BEN"},
				{content: "Bermuda", value: "BMU"},
				{content: "Bhutan", value: "BTN"},
				{content: "Bolivia", value: "BOL"},
				{content: "Bosnia and Herzegovina", value: "BIH"},
				{content: "Botswana", value: "BWA"},
				{content: "Bouvet Island", value: "BVT"},
				{content: "Brazil", value: "BRA"},
				{content: "British Indian Ocean Territory", value: "IOT"},
				{content: "British Virgin Islands", value: "VGB"},
				{content: "Brunei Darussalam", value: "BRN"},
				{content: "Bulgaria", value: "BGR"},
				{content: "Burkina Faso", value: "BFA"},
				{content: "Burundi", value: "BDI"},
				{content: "Cambodia", value: "KHM"},
				{content: "Cameroon", value: "CMR"},
				{name: "canada", content: "Canada", value: "CAN"},
				{content: "Cape Verde", value: "CPV"},
				{content: "Cayman Islands", value: "CYM"},
				{content: "Central African Republic", value: "CAF"},
				{content: "Chad", value: "TCD"},
				{content: "Chile", value: "CHL"},
				{content: "China", value: "CHN"},
				{content: "Christmas Island", value: "CXR"},
				{content: "Cocos (Keeling) Islands", value: "CCK"},
				{content: "Colombia", value: "COL"},
				{content: "Comoros", value: "COM"},
				{content: "Congo", value: "COG"},
				{content: "Cook Islands", value: "COK"},
				{content: "Costa Rica", value: "CRI"},
				{content: "Cote D'Ivoire", value: "CIV"},
				{content: "Croatia", value: "HRV"},
				{content: "Cuba", value: "CUB"},
				{content: "Cyprus", value: "CYP"},
				{content: "Czech Republic", value: "CZE"},
				{content: "Democratic Republic of Congo", value: "COD"},
				{content: "Democratic Republic of Congo", value: "ZAR"},
				{content: "Denmark", value: "DNK"},
				{content: "Djibouti", value: "DJI"},
				{content: "Dominica", value: "DMA"},
				{content: "Dominican Republic", value: "DOM"},
				{content: "East Timor", value: "TMP"},
				{content: "Ecuador", value: "ECU"},
				{content: "Egypt", value: "EGY"},
				{content: "El Salvador", value: "SLV"},
				{content: "Equatorial Guinea", value: "GNQ"},
				{content: "Eritrea", value: "ERI"},
				{content: "Estonia", value: "EST"},
				{content: "Ethiopia", value: "ETH"},
				{content: "Faeroe Islands", value: "FRO"},
				{content: "Falkland Islands (Malvinas)", value: "FLK"},
				{content: "Fiji", value: "Fji"},
				{content: "Finland", value: "FIN"},
				{content: "France", value: "FRA"},
				{content: "French Guiana", value: "GUF"},
				{content: "French Polynesia", value: "PYF"},
				{content: "French Southern Territories", value: "ATF"},
				{content: "Gabon", value: "GAB"},
				{content: "Gambia", value: "GMB"},
				{content: "Georgia", value: "GEO"},
				{content: "Germany", value: "DEU"},
				{content: "Ghana", value: "GHA"},
				{content: "Gibraltar", value: "GIB"},
				{content: "Greece", value: "GRC"},
				{content: "Greenland", value: "GRL"},
				{content: "Grenada", value: "GRD"},
				{content: "Guadeloupe", value: "GLP"},
				{content: "Guam", value: "GUM"},
				{content: "Guatemala", value: "GTM"},
				{content: "Guinea-Bissau", value: "GNB"},
				{content: "Guinea", value: "GIN"},
				{content: "Guyana", value: "GUY"},
				{content: "Haiti", value: "HTI"},
				{content: "Heard and McDonald Islands", value: "HMD"},
				{content: "Holy See", value: "VAT"},
				{content: "Honduras", value: "HND"},
				{content: "Hong Kong", value: "HKG"},
				{content: "Hungary", value: "HUN"},
				{content: "Iceland", value: "ISL"},
				{content: "India", value: "IND"},
				{content: "Indonesia", value: "IDN"},
				{content: "Iran", value: "IRN"},
				{content: "Iraq", value: "IRQ"},
				{content: "Ireland", value: "IRL"},
				{content: "Israel", value: "ISR"},
				{content: "Italy", value: "ITA"},
				{content: "Jamaica", value: "JAM"},
				{content: "Japan", value: "JPN"},
				{content: "Jordan", value: "JOR"},
				{content: "Kazakhstan", value: "KAZ"},
				{content: "Kenya", value: "KEN"},
				{content: "Kiribati", value: "KIR"},
				{content: "Korea Democratic Peoples Republic", value: "PRK"},
				{content: "Kuwait", value: "KWT"},
				{content: "Kyrgyzstan", value: "KGZ"},
				{content: "Lao Peoples Democratic Republic", value: "LAO"},
				{content: "Latvia", value: "LVA"},
				{content: "Lebanon", value: "LBN"},
				{content: "Lesotho", value: "LSO"},
				{content: "Liberia", value: "LBR"},
				{content: "Libyan Arab Jamahiriya", value: "LBY"},
				{content: "Liechtenstein", value: "LIE"},
				{content: "Lithuania", value: "LTU"},
				{content: "Luxembourg", value: "LUX"},
				{content: "Macau", value: "MAC"},
				{content: "Macedonia", value: "MKD"},
				{content: "Madagascar", value: "MDG"},
				{content: "Malawi", value: "MWI"},
				{content: "Malaysia", value: "MYS"},
				{content: "Maldives", value: "MDV"},
				{content: "Mali", value: "MLI"},
				{content: "Malta", value: "MLT"},
				{content: "Marshall Islands", value: "MHL"},
				{content: "Martinique", value: "MTQ"},
				{content: "Mauritania", value: "MRT"},
				{content: "Mauritius", value: "MUS"},
				{content: "Mayotte", value: "MYT"},
				{content: "Mexico", value: "MEX"},
				{content: "Micronesia Federated States", value: "FSM"},
				{content: "Monaco", value: "MCO"},
				{content: "Mongolia", value: "MNG"},
				{content: "Montserrat", value: "MSR"},
				{content: "Morocco", value: "MAR"},
				{content: "Mozambique", value: "MOZ"},
				{content: "Myanmar", value: "MMR"},
				{content: "Namibia", value: "NAM"},
				{content: "Nauru", value: "NRU"},
				{content: "Nepal", value: "NPL"},
				{content: "Netherlands Antilles", value: "ANT"},
				{content: "Netherlands", value: "NLD"},
				{content: "New Caledonia", value: "NCL"},
				{content: "New Zealand", value: "NZL"},
				{content: "Nicaragua", value: "NIC"},
				{content: "Niger", value: "NER"},
				{content: "Nigeria", value: "NGA"},
				{content: "Niue", value: "NIU"},
				{content: "Norfolk Island", value: "NFK"},
				{content: "Northern Mariana Islands", value: "MNP"},
				{content: "Norway", value: "NOR"},
				{content: "Occupied Palestinian Territory", value: "PSE"},
				{content: "Oman", value: "OMN"},
				{content: "Pakistan", value: "PAK"},
				{content: "Palau", value: "PLW"},
				{content: "Panama", value: "PAN"},
				{content: "Papua New Guinea", value: "PNG"},
				{content: "Paraguay", value: "PRY"},
				{content: "Peru", value: "PER"},
				{content: "Philippines", value: "PHL"},
				{content: "Pitcairn", value: "PCN"},
				{content: "Poland", value: "POL"},
				{content: "Portugal", value: "PRT"},
				{content: "Puerto Rico", value: "PRI"},
				{content: "Qatar", value: "QAT"},
				{content: "Republic of Korea", value: "KOR"},
				{content: "Republic of Moldova", value: "MDA"},
				{content: "Reunion", value: "REU"},
				{content: "Romania", value: "ROM"},
				{content: "Russian Federation", value: "RUS"},
				{content: "Rwanda", value: "RWA"},
				{content: "Saint Helena", value: "SHN"},
				{content: "Saint Kitts and Nevis", value: "KNA"},
				{content: "Saint Lucia", value: "LCA"},
				{content: "Saint Pierre and Miquelon", value: "SPM"},
				{content: "Saint Vincent & The Grenadines", value: "VCT"},
				{content: "Samoa", value: "WSM"},
				{content: "San Marino", value: "SMR"},
				{content: "Sao Tome and Principe", value: "STP"},
				{content: "Saudi Arabia", value: "SAU"},
				{content: "Senegal", value: "SEN"},
				{content: "Seychelles", value: "SYC"},
				{content: "Sierra Leone", value: "SLE"},
				{content: "Singapore", value: "SGP"},
				{content: "Slovakia", value: "SVK"},
				{content: "Slovenia", value: "SVN"},
				{content: "Solomon Islands", value: "SLB"},
				{content: "Somalia", value: "SOM"},
				{content: "South Africa", value: "ZAF"},
				{content: "South Georgia & South Sandwich Islands", value: "SGS"},
				{content: "Spain", value: "ESP"},
				{content: "Sri Lanka", value: "LKA"},
				{content: "Sudan", value: "SDN"},
				{content: "Suriname", value: "SUR"},
				{content: "Svalbard and Jan Mayen Islands", value: "SJM"},
				{content: "Swaziland", value: "SWZ"},
				{content: "Sweden", value: "SWE"},
				{content: "Switzerland", value: "CHE"},
				{content: "Syrian Arab Republic", value: "SYR"},
				{content: "Taiwan", value: "TWN"},
				{content: "Tajikistan", value: "TJK"},
				{content: "Thailand", value: "THA"},
				{content: "Togo", value: "TGO"},
				{content: "Tokelau", value: "TKL"},
				{content: "Tonga", value: "TON"},
				{content: "Trinidad and Tobago", value: "TTO"},
				{content: "Tunisia", value: "TUN"},
				{content: "Turkey", value: "TUR"},
				{content: "Turkmenistan", value: "TKM"},
				{content: "Turks and Cacos Islands", value: "TCA"},
				{content: "Tuvalu", value: "TUV"},
				{content: "Uganda", value: "UGA"},
				{content: "Ukraine", value: "UKR"},
				{content: "United Arab Emirates", value: "ARE"},
				{content: "United Kingdom", value: "GBR"},
				{content: "United Republic of Tanzania", value: "TZA"},
				{content: "United States Minor Outlying Islands", value: "UMI"},
				{content: "United States Virgin Islands", value: "VIR"},
				{name: "usa", content: "United States", value: "USA"},
				{content: "Uruguay", value: "URY"},
				{content: "Uzbekistan", value: "UZB"},
				{content: "Vanuatu", value: "VUT"},
				{content: "Venezuela", value: "VEN"},
				{content: "Viet Nam", value: "VNM"},
				{content: "Wallis and Futuna Islands", value: "WLF"},
				{content: "Western Sahara", value: "ESH"},
				{content: "Yemen", value: "YEM"},
				{content: "Yugoslavia", value: "YUG"},
				{content: "Zambia", value: "ZMB"},
				{content: "Zimbabwe", value: "ZWE"}
			]}
		]}
	],

	bindings: [
		{from: ".disabled", to: ".$.pickerButton.disabled", oneWay: false},
		{from: ".selected", to: ".$.picker.selected", oneWay: false, transform: function(val, dir) {
			if (dir === 1)
			{
				try
				{
					if (val != null && val !== "")
					{
						if (typeof(val) === 'string')
						{
							// If "val" is a non-empty string, attempt to transform it into an Enyo control.
							var data = val.toLowerCase();
							var control = this.$.picker.controls.find(function(element, index, array)
							{
								var content = element.content ? element.content.toLowerCase() : null;
								var value = element.value ? element.value.toLowerCase() : null;
								return (content === data || value === data);
							});
							if (control != null)
							{
								this.set("selected", control);
								return control;
							}
							else
							{
								//console.log('Country "' + val + '" not found in picker!');
								throw null;
							}
						}
						else if (val instanceof enyo.Control)
						{
							// If "val" appears to be an Enyo control, no transformation is required, so return it as-is.
							return val;
						}
						else { throw null; }
					}
					else { throw null; }
				}
				catch (err)
				{
					if (this.selected !== null) { this.set("selected", null); }
					else { this.$.pickerButton.set("content", "Select Country"); }
					return null;
				}
			}
			else if (dir === 2) { return val; }
		}}
	]
});