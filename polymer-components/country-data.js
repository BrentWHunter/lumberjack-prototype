(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		global.moment = require('moment-timezone');
			global.moment.tz.setDefault("UTC");
		global.numeral = require('numeral');
	}
})();

class countryData
{

	static getCountryDropdown()
	{
		//get all the countries, etl the data for dropdowns, perform sort based on name
		var countryArray = [];
		var data = countryData.data;
		Object.keys(data).forEach(country => {
			if(data[country].commonName)
			{
				countryArray.push({label: data[country].commonName, value: data[country].threeLetterCode});
			}
			else
			{
				countryArray.push({label: data[country].shortName, value: data[country].threeLetterCode});
			}
		});

		countryArray.sort(function(a,b){
			if(a.label > b.label)
			{
				return 1;
			}
			if(a.label < b.label)
			{
				return -1;
			}
		});

		return countryArray;
	}

	static getSubdivDropdown(countryCode)
	{
		var subdivArray = [];
		var subdivType = countryData.data[countryCode].subdivisionLabel;
		var data = countryData.data[countryCode].subdivisions;
		Object.keys(data).forEach(subdiv => {
			subdivArray.push({label: data[subdiv].name, value: data[subdiv].code});
		});

		subdivArray.sort(function(a,b){
			if(a.label > b.label)
			{
				return 1;
			}
			if(a.label < b.label)
			{
				return -1;
			}
		});

		return {subdivLabel: subdivType, subdivArray: subdivArray }
	}

	static getSubdivName(countryCode, subdivCode)
	{
		if(countryData.data[countryCode] && countryData.data[countryCode].subdivisions[subdivCode])
		{
			return countryData.data[countryCode].subdivisions[subdivCode].name;
		}
		else
		{
			return "";
		}
	}

	static getCountryName(countryCode)
	{
		if(countryData.data[countryCode])
		{
			return countryData.data[countryCode].fullName;
		}
		else
		{
			return "";
		}
	}

	static getCountryShortName(countryCode)
	{
		if(countryData.data[countryCode])
		{
			return countryData.data[countryCode].shortName;
		}
		else
		{
			return "";
		}
	}

	static getCountryCommonName(countryCode)
	{
		if(countryData.data[countryCode])
		{
			if(countryData.data[countryCode].commonName)
			{
				return countryData.data[countryCode].commonName;
			}
			else
			{
				return countryData.data[countryCode].shortName;
			}
		}
		else
		{
			return "";
		}
	}

	static get data()
	{
		return {
			"ABW": {
				"threeLetterCode": "ABW",
				"shortName": "Aruba",
				"shortNameUpperCase": "ARUBA",
				"fullName": "Aruba",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"AFG": {
				"threeLetterCode": "AFG",
				"shortName": "Afghanistan",
				"shortNameUpperCase": "AFGHANISTAN",
				"fullName": "the Islamic Republic of Afghanistan",
				"subdivisionLabel": "province",
				"subdivisions": {
					"AF-BAL": {
						"category": "province",
						"code": "AF-BAL",
						"name": "Balkh",
						"parent": ""
					},
					"AF-BAM": {
						"category": "province",
						"code": "AF-BAM",
						"name": "Bāmyān",
						"parent": ""
					},
					"AF-BDG": {
						"category": "province",
						"code": "AF-BDG",
						"name": "Bādghīs",
						"parent": ""
					},
					"AF-BDS": {
						"category": "province",
						"code": "AF-BDS",
						"name": "Badakhshān",
						"parent": ""
					},
					"AF-BGL": {
						"category": "province",
						"code": "AF-BGL",
						"name": "Baghlān",
						"parent": ""
					},
					"AF-DAY": {
						"category": "province",
						"code": "AF-DAY",
						"name": "Dāykundī",
						"parent": ""
					},
					"AF-FRA": {
						"category": "province",
						"code": "AF-FRA",
						"name": "Farāh",
						"parent": ""
					},
					"AF-FYB": {
						"category": "province",
						"code": "AF-FYB",
						"name": "Fāryāb",
						"parent": ""
					},
					"AF-GHA": {
						"category": "province",
						"code": "AF-GHA",
						"name": "Ghaznī",
						"parent": ""
					},
					"AF-GHO": {
						"category": "province",
						"code": "AF-GHO",
						"name": "Ghōr",
						"parent": ""
					},
					"AF-HEL": {
						"category": "province",
						"code": "AF-HEL",
						"name": "Helmand",
						"parent": ""
					},
					"AF-HER": {
						"category": "province",
						"code": "AF-HER",
						"name": "Herāt",
						"parent": ""
					},
					"AF-JOW": {
						"category": "province",
						"code": "AF-JOW",
						"name": "Jowzjān",
						"parent": ""
					},
					"AF-KAB": {
						"category": "province",
						"code": "AF-KAB",
						"name": "Kābul",
						"parent": ""
					},
					"AF-KAN": {
						"category": "province",
						"code": "AF-KAN",
						"name": "Kandahār",
						"parent": ""
					},
					"AF-KAP": {
						"category": "province",
						"code": "AF-KAP",
						"name": "Kāpīsā",
						"parent": ""
					},
					"AF-KDZ": {
						"category": "province",
						"code": "AF-KDZ",
						"name": "Kunduz",
						"parent": ""
					},
					"AF-KHO": {
						"category": "province",
						"code": "AF-KHO",
						"name": "Khōst",
						"parent": ""
					},
					"AF-KNR": {
						"category": "province",
						"code": "AF-KNR",
						"name": "Kunaṟ",
						"parent": ""
					},
					"AF-LAG": {
						"category": "province",
						"code": "AF-LAG",
						"name": "Laghmān",
						"parent": ""
					},
					"AF-LOG": {
						"category": "province",
						"code": "AF-LOG",
						"name": "Lōgar",
						"parent": ""
					},
					"AF-NAN": {
						"category": "province",
						"code": "AF-NAN",
						"name": "Nangarhār",
						"parent": ""
					},
					"AF-NIM": {
						"category": "province",
						"code": "AF-NIM",
						"name": "Nīmrōz",
						"parent": ""
					},
					"AF-NUR": {
						"category": "province",
						"code": "AF-NUR",
						"name": "Nūristān",
						"parent": ""
					},
					"AF-PAN": {
						"category": "province",
						"code": "AF-PAN",
						"name": "Panjshayr",
						"parent": ""
					},
					"AF-PAR": {
						"category": "province",
						"code": "AF-PAR",
						"name": "Parwān",
						"parent": ""
					},
					"AF-PIA": {
						"category": "province",
						"code": "AF-PIA",
						"name": "Paktiyā",
						"parent": ""
					},
					"AF-PKA": {
						"category": "province",
						"code": "AF-PKA",
						"name": "Paktīkā",
						"parent": ""
					},
					"AF-SAM": {
						"category": "province",
						"code": "AF-SAM",
						"name": "Samangān",
						"parent": ""
					},
					"AF-SAR": {
						"category": "province",
						"code": "AF-SAR",
						"name": "Sar-e Pul",
						"parent": ""
					},
					"AF-TAK": {
						"category": "province",
						"code": "AF-TAK",
						"name": "Takhār",
						"parent": ""
					},
					"AF-URU": {
						"category": "province",
						"code": "AF-URU",
						"name": "Uruzgān",
						"parent": ""
					},
					"AF-WAR": {
						"category": "province",
						"code": "AF-WAR",
						"name": "Wardak",
						"parent": ""
					},
					"AF-ZAB": {
						"category": "province",
						"code": "AF-ZAB",
						"name": "Zābul",
						"parent": ""
					}
				}
			},
			"AGO": {
				"threeLetterCode": "AGO",
				"shortName": "Angola",
				"shortNameUpperCase": "ANGOLA",
				"fullName": "the Republic of Angola",
				"subdivisionLabel": "province",
				"subdivisions": {
					"AO-BGO": {
						"category": "province",
						"code": "AO-BGO",
						"name": "Bengo",
						"parent": ""
					},
					"AO-BGU": {
						"category": "province",
						"code": "AO-BGU",
						"name": "Benguela",
						"parent": ""
					},
					"AO-BIE": {
						"category": "province",
						"code": "AO-BIE",
						"name": "Bié",
						"parent": ""
					},
					"AO-CAB": {
						"category": "province",
						"code": "AO-CAB",
						"name": "Cabinda",
						"parent": ""
					},
					"AO-CCU": {
						"category": "province",
						"code": "AO-CCU",
						"name": "Kuando Kubango",
						"parent": ""
					},
					"AO-CNN": {
						"category": "province",
						"code": "AO-CNN",
						"name": "Cunene",
						"parent": ""
					},
					"AO-CNO": {
						"category": "province",
						"code": "AO-CNO",
						"name": "Kwanza Norte",
						"parent": ""
					},
					"AO-CUS": {
						"category": "province",
						"code": "AO-CUS",
						"name": "Kwanza Sul",
						"parent": ""
					},
					"AO-HUA": {
						"category": "province",
						"code": "AO-HUA",
						"name": "Huambo",
						"parent": ""
					},
					"AO-HUI": {
						"category": "province",
						"code": "AO-HUI",
						"name": "Huíla",
						"parent": ""
					},
					"AO-LNO": {
						"category": "province",
						"code": "AO-LNO",
						"name": "Lunda Norte",
						"parent": ""
					},
					"AO-LSU": {
						"category": "province",
						"code": "AO-LSU",
						"name": "Lunda Sul",
						"parent": ""
					},
					"AO-LUA": {
						"category": "province",
						"code": "AO-LUA",
						"name": "Luanda",
						"parent": ""
					},
					"AO-MAL": {
						"category": "province",
						"code": "AO-MAL",
						"name": "Malange",
						"parent": ""
					},
					"AO-MOX": {
						"category": "province",
						"code": "AO-MOX",
						"name": "Moxico",
						"parent": ""
					},
					"AO-NAM": {
						"category": "province",
						"code": "AO-NAM",
						"name": "Namibe",
						"parent": ""
					},
					"AO-UIG": {
						"category": "province",
						"code": "AO-UIG",
						"name": "Uíge",
						"parent": ""
					},
					"AO-ZAI": {
						"category": "province",
						"code": "AO-ZAI",
						"name": "Zaire",
						"parent": ""
					}
				}
			},
			"AIA": {
				"threeLetterCode": "AIA",
				"shortName": "Anguilla",
				"shortNameUpperCase": "ANGUILLA",
				"fullName": "Anguilla",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ALA": {
				"threeLetterCode": "ALA",
				"shortName": "Åland Islands",
				"shortNameUpperCase": "ÅLAND ISLANDS",
				"fullName": "Åland Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ALB": {
				"threeLetterCode": "ALB",
				"shortName": "Albania",
				"shortNameUpperCase": "ALBANIA",
				"fullName": "the Republic of Albania",
				"subdivisionLabel": "county",
				"subdivisions": {
					"AL-01": {
						"category": "county",
						"code": "AL-01",
						"name": "Berat",
						"parent": ""
					},
					"AL-02": {
						"category": "county",
						"code": "AL-02",
						"name": "Durrës",
						"parent": ""
					},
					"AL-03": {
						"category": "county",
						"code": "AL-03",
						"name": "Elbasan",
						"parent": ""
					},
					"AL-04": {
						"category": "county",
						"code": "AL-04",
						"name": "Fier",
						"parent": ""
					},
					"AL-05": {
						"category": "county",
						"code": "AL-05",
						"name": "Gjirokastër",
						"parent": ""
					},
					"AL-06": {
						"category": "county",
						"code": "AL-06",
						"name": "Korçë",
						"parent": ""
					},
					"AL-07": {
						"category": "county",
						"code": "AL-07",
						"name": "Kukës",
						"parent": ""
					},
					"AL-08": {
						"category": "county",
						"code": "AL-08",
						"name": "Lezhë",
						"parent": ""
					},
					"AL-09": {
						"category": "county",
						"code": "AL-09",
						"name": "Dibër",
						"parent": ""
					},
					"AL-10": {
						"category": "county",
						"code": "AL-10",
						"name": "Shkodër",
						"parent": ""
					},
					"AL-11": {
						"category": "county",
						"code": "AL-11",
						"name": "Tiranë",
						"parent": ""
					},
					"AL-12": {
						"category": "county",
						"code": "AL-12",
						"name": "Vlorë",
						"parent": ""
					}
				}
			},
			"AND": {
				"threeLetterCode": "AND",
				"shortName": "Andorra",
				"shortNameUpperCase": "ANDORRA",
				"fullName": "the Principality of Andorra",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"AD-02": {
						"category": "parish",
						"code": "AD-02",
						"name": "Canillo",
						"parent": ""
					},
					"AD-03": {
						"category": "parish",
						"code": "AD-03",
						"name": "Encamp",
						"parent": ""
					},
					"AD-04": {
						"category": "parish",
						"code": "AD-04",
						"name": "La Massana",
						"parent": ""
					},
					"AD-05": {
						"category": "parish",
						"code": "AD-05",
						"name": "Ordino",
						"parent": ""
					},
					"AD-06": {
						"category": "parish",
						"code": "AD-06",
						"name": "Sant Julià de Lòria",
						"parent": ""
					},
					"AD-07": {
						"category": "parish",
						"code": "AD-07",
						"name": "Andorra la Vella",
						"parent": ""
					},
					"AD-08": {
						"category": "parish",
						"code": "AD-08",
						"name": "Escaldes-Engordany",
						"parent": ""
					}
				}
			},
			"ARE": {
				"commonName": "United Arab Emirates",
				"threeLetterCode": "ARE",
				"shortName": "United Arab Emirates (the)",
				"shortNameUpperCase": "UNITED ARAB EMIRATES",
				"fullName": "the United Arab Emirates",
				"subdivisionLabel": "emirate",
				"subdivisions": {
					"AE-AJ": {
						"category": "emirate",
						"code": "AE-AJ",
						"name": "‘Ajmān",
						"parent": ""
					},
					"AE-AZ": {
						"category": "emirate",
						"code": "AE-AZ",
						"name": "Abū Z̧aby",
						"parent": ""
					},
					"AE-DU": {
						"category": "emirate",
						"code": "AE-DU",
						"name": "Dubayy",
						"parent": ""
					},
					"AE-FU": {
						"category": "emirate",
						"code": "AE-FU",
						"name": "Al Fujayrah",
						"parent": ""
					},
					"AE-RK": {
						"category": "emirate",
						"code": "AE-RK",
						"name": "Ra’s al Khaymah",
						"parent": ""
					},
					"AE-SH": {
						"category": "emirate",
						"code": "AE-SH",
						"name": "Ash Shāriqah",
						"parent": ""
					},
					"AE-UQ": {
						"category": "emirate",
						"code": "AE-UQ",
						"name": "Umm al Qaywayn",
						"parent": ""
					}
				}
			},
			"ARG": {
				"threeLetterCode": "ARG",
				"shortName": "Argentina",
				"shortNameUpperCase": "ARGENTINA",
				"fullName": "the Argentine Republic",
				"subdivisionLabel": "province",
				"subdivisions": {
					"AR-A": {
						"category": "province",
						"code": "AR-A",
						"name": "Salta",
						"parent": ""
					},
					"AR-B": {
						"category": "province",
						"code": "AR-B",
						"name": "Buenos Aires",
						"parent": ""
					},
					"AR-C": {
						"category": "city",
						"code": "AR-C",
						"name": "Ciudad Autónoma de Buenos Aires",
						"parent": ""
					},
					"AR-D": {
						"category": "province",
						"code": "AR-D",
						"name": "San Luis",
						"parent": ""
					},
					"AR-E": {
						"category": "province",
						"code": "AR-E",
						"name": "Entre Ríos",
						"parent": ""
					},
					"AR-F": {
						"category": "province",
						"code": "AR-F",
						"name": "La Rioja",
						"parent": ""
					},
					"AR-G": {
						"category": "province",
						"code": "AR-G",
						"name": "Santiago del Estero",
						"parent": ""
					},
					"AR-H": {
						"category": "province",
						"code": "AR-H",
						"name": "Chaco",
						"parent": ""
					},
					"AR-J": {
						"category": "province",
						"code": "AR-J",
						"name": "San Juan",
						"parent": ""
					},
					"AR-K": {
						"category": "province",
						"code": "AR-K",
						"name": "Catamarca",
						"parent": ""
					},
					"AR-L": {
						"category": "province",
						"code": "AR-L",
						"name": "La Pampa",
						"parent": ""
					},
					"AR-M": {
						"category": "province",
						"code": "AR-M",
						"name": "Mendoza",
						"parent": ""
					},
					"AR-N": {
						"category": "province",
						"code": "AR-N",
						"name": "Misiones",
						"parent": ""
					},
					"AR-P": {
						"category": "province",
						"code": "AR-P",
						"name": "Formosa",
						"parent": ""
					},
					"AR-Q": {
						"category": "province",
						"code": "AR-Q",
						"name": "Neuquén",
						"parent": ""
					},
					"AR-R": {
						"category": "province",
						"code": "AR-R",
						"name": "Río Negro",
						"parent": ""
					},
					"AR-S": {
						"category": "province",
						"code": "AR-S",
						"name": "Santa Fe",
						"parent": ""
					},
					"AR-T": {
						"category": "province",
						"code": "AR-T",
						"name": "Tucumán",
						"parent": ""
					},
					"AR-U": {
						"category": "province",
						"code": "AR-U",
						"name": "Chubut",
						"parent": ""
					},
					"AR-V": {
						"category": "province",
						"code": "AR-V",
						"name": "Tierra del Fuego",
						"parent": ""
					},
					"AR-W": {
						"category": "province",
						"code": "AR-W",
						"name": "Corrientes",
						"parent": ""
					},
					"AR-X": {
						"category": "province",
						"code": "AR-X",
						"name": "Córdoba",
						"parent": ""
					},
					"AR-Y": {
						"category": "province",
						"code": "AR-Y",
						"name": "Jujuy",
						"parent": ""
					},
					"AR-Z": {
						"category": "province",
						"code": "AR-Z",
						"name": "Santa Cruz",
						"parent": ""
					}
				}
			},
			"ARM": {
				"threeLetterCode": "ARM",
				"shortName": "Armenia",
				"shortNameUpperCase": "ARMENIA",
				"fullName": "the Republic of Armenia",
				"subdivisionLabel": "region",
				"subdivisions": {
					"AM-AG": {
						"category": "region",
						"code": "AM-AG",
						"name": "Aragac̣otn",
						"parent": ""
					},
					"AM-AR": {
						"category": "region",
						"code": "AM-AR",
						"name": "Ararat",
						"parent": ""
					},
					"AM-AV": {
						"category": "region",
						"code": "AM-AV",
						"name": "Armavir",
						"parent": ""
					},
					"AM-ER": {
						"category": "city",
						"code": "AM-ER",
						"name": "Erevan",
						"parent": ""
					},
					"AM-GR": {
						"category": "region",
						"code": "AM-GR",
						"name": "Geġark'unik'",
						"parent": ""
					},
					"AM-KT": {
						"category": "region",
						"code": "AM-KT",
						"name": "Kotayk'",
						"parent": ""
					},
					"AM-LO": {
						"category": "region",
						"code": "AM-LO",
						"name": "Loṙi",
						"parent": ""
					},
					"AM-SH": {
						"category": "region",
						"code": "AM-SH",
						"name": "Širak",
						"parent": ""
					},
					"AM-SU": {
						"category": "region",
						"code": "AM-SU",
						"name": "Syunik'",
						"parent": ""
					},
					"AM-TV": {
						"category": "region",
						"code": "AM-TV",
						"name": "Tavuš",
						"parent": ""
					},
					"AM-VD": {
						"category": "region",
						"code": "AM-VD",
						"name": "Vayoć Jor",
						"parent": ""
					}
				}
			},
			"ASM": {
				"threeLetterCode": "ASM",
				"shortName": "American Samoa",
				"shortNameUpperCase": "AMERICAN SAMOA",
				"fullName": "American Samoa",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ATA": {
				"threeLetterCode": "ATA",
				"shortName": "Antarctica",
				"shortNameUpperCase": "ANTARCTICA",
				"fullName": "Antarctica",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ATF": {
				"commonName": "French Southern Territories",
				"threeLetterCode": "ATF",
				"shortName": "French Southern Territories (the)",
				"shortNameUpperCase": "FRENCH SOUTHERN TERRITORIES",
				"fullName": "the French Southern Territories",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ATG": {
				"threeLetterCode": "ATG",
				"shortName": "Antigua and Barbuda",
				"shortNameUpperCase": "ANTIGUA AND BARBUDA",
				"fullName": "Antigua and Barbuda",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"AG-03": {
						"category": "parish",
						"code": "AG-03",
						"name": "Saint George",
						"parent": ""
					},
					"AG-04": {
						"category": "parish",
						"code": "AG-04",
						"name": "Saint John",
						"parent": ""
					},
					"AG-05": {
						"category": "parish",
						"code": "AG-05",
						"name": "Saint Mary",
						"parent": ""
					},
					"AG-06": {
						"category": "parish",
						"code": "AG-06",
						"name": "Saint Paul",
						"parent": ""
					},
					"AG-07": {
						"category": "parish",
						"code": "AG-07",
						"name": "Saint Peter",
						"parent": ""
					},
					"AG-08": {
						"category": "parish",
						"code": "AG-08",
						"name": "Saint Philip",
						"parent": ""
					},
					"AG-10": {
						"category": "dependency",
						"code": "AG-10",
						"name": "Barbuda",
						"parent": ""
					},
					"AG-11": {
						"category": "dependency",
						"code": "AG-11",
						"name": "Redonda",
						"parent": ""
					}
				}
			},
			"AUS": {
				"threeLetterCode": "AUS",
				"shortName": "Australia",
				"shortNameUpperCase": "AUSTRALIA",
				"fullName": "Australia",
				"subdivisionLabel": "state",
				"subdivisions": {
					"AU-ACT": {
						"category": "territory",
						"code": "AU-ACT",
						"name": "Australian Capital Territory",
						"parent": ""
					},
					"AU-NSW": {
						"category": "state",
						"code": "AU-NSW",
						"name": "New South Wales",
						"parent": ""
					},
					"AU-NT": {
						"category": "territory",
						"code": "AU-NT",
						"name": "Northern Territory",
						"parent": ""
					},
					"AU-QLD": {
						"category": "state",
						"code": "AU-QLD",
						"name": "Queensland",
						"parent": ""
					},
					"AU-SA": {
						"category": "state",
						"code": "AU-SA",
						"name": "South Australia",
						"parent": ""
					},
					"AU-TAS": {
						"category": "state",
						"code": "AU-TAS",
						"name": "Tasmania",
						"parent": ""
					},
					"AU-VIC": {
						"category": "state",
						"code": "AU-VIC",
						"name": "Victoria",
						"parent": ""
					},
					"AU-WA": {
						"category": "state",
						"code": "AU-WA",
						"name": "Western Australia",
						"parent": ""
					}
				}
			},
			"AUT": {
				"threeLetterCode": "AUT",
				"shortName": "Austria",
				"shortNameUpperCase": "AUSTRIA",
				"fullName": "the Republic of Austria",
				"subdivisionLabel": "state",
				"subdivisions": {
					"AT-1": {
						"category": "state",
						"code": "AT-1",
						"name": "Burgenland",
						"parent": ""
					},
					"AT-2": {
						"category": "state",
						"code": "AT-2",
						"name": "Kärnten",
						"parent": ""
					},
					"AT-3": {
						"category": "state",
						"code": "AT-3",
						"name": "Niederösterreich",
						"parent": ""
					},
					"AT-4": {
						"category": "state",
						"code": "AT-4",
						"name": "Oberösterreich",
						"parent": ""
					},
					"AT-5": {
						"category": "state",
						"code": "AT-5",
						"name": "Salzburg",
						"parent": ""
					},
					"AT-6": {
						"category": "state",
						"code": "AT-6",
						"name": "Steiermark",
						"parent": ""
					},
					"AT-7": {
						"category": "state",
						"code": "AT-7",
						"name": "Tirol",
						"parent": ""
					},
					"AT-8": {
						"category": "state",
						"code": "AT-8",
						"name": "Vorarlberg",
						"parent": ""
					},
					"AT-9": {
						"category": "state",
						"code": "AT-9",
						"name": "Wien",
						"parent": ""
					}
				}
			},
			"AZE": {
				"threeLetterCode": "AZE",
				"shortName": "Azerbaijan",
				"shortNameUpperCase": "AZERBAIJAN",
				"fullName": "the Republic of Azerbaijan",
				"subdivisionLabel": "rayon",
				"subdivisions": {
					"AZ-ABS": {
						"category": "rayon",
						"code": "AZ-ABS",
						"name": "Abşeron",
						"parent": ""
					},
					"AZ-AGA": {
						"category": "rayon",
						"code": "AZ-AGA",
						"name": "Ağstafa",
						"parent": ""
					},
					"AZ-AGC": {
						"category": "rayon",
						"code": "AZ-AGC",
						"name": "Ağcabədi",
						"parent": ""
					},
					"AZ-AGM": {
						"category": "rayon",
						"code": "AZ-AGM",
						"name": "Ağdam",
						"parent": ""
					},
					"AZ-AGS": {
						"category": "rayon",
						"code": "AZ-AGS",
						"name": "Ağdaş",
						"parent": ""
					},
					"AZ-AGU": {
						"category": "rayon",
						"code": "AZ-AGU",
						"name": "Ağsu",
						"parent": ""
					},
					"AZ-AST": {
						"category": "rayon",
						"code": "AZ-AST",
						"name": "Astara",
						"parent": ""
					},
					"AZ-BA": {
						"category": "municipality",
						"code": "AZ-BA",
						"name": "Bakı",
						"parent": ""
					},
					"AZ-BAB": {
						"category": "rayon",
						"code": "AZ-BAB",
						"name": "Babək",
						"parent": "AZ-NX"
					},
					"AZ-BAL": {
						"category": "rayon",
						"code": "AZ-BAL",
						"name": "Balakən",
						"parent": ""
					},
					"AZ-BAR": {
						"category": "rayon",
						"code": "AZ-BAR",
						"name": "Bərdə",
						"parent": ""
					},
					"AZ-BEY": {
						"category": "rayon",
						"code": "AZ-BEY",
						"name": "Beyləqan",
						"parent": ""
					},
					"AZ-BIL": {
						"category": "rayon",
						"code": "AZ-BIL",
						"name": "Biləsuvar",
						"parent": ""
					},
					"AZ-CAB": {
						"category": "rayon",
						"code": "AZ-CAB",
						"name": "Cəbrayıl",
						"parent": ""
					},
					"AZ-CAL": {
						"category": "rayon",
						"code": "AZ-CAL",
						"name": "Cəlilabad",
						"parent": ""
					},
					"AZ-CUL": {
						"category": "rayon",
						"code": "AZ-CUL",
						"name": "Culfa",
						"parent": "AZ-NX"
					},
					"AZ-DAS": {
						"category": "rayon",
						"code": "AZ-DAS",
						"name": "Daşkəsən",
						"parent": ""
					},
					"AZ-FUZ": {
						"category": "rayon",
						"code": "AZ-FUZ",
						"name": "Füzuli",
						"parent": ""
					},
					"AZ-GA": {
						"category": "municipality",
						"code": "AZ-GA",
						"name": "Gəncə",
						"parent": ""
					},
					"AZ-GAD": {
						"category": "rayon",
						"code": "AZ-GAD",
						"name": "Gədəbəy",
						"parent": ""
					},
					"AZ-GOR": {
						"category": "rayon",
						"code": "AZ-GOR",
						"name": "Goranboy",
						"parent": ""
					},
					"AZ-GOY": {
						"category": "rayon",
						"code": "AZ-GOY",
						"name": "Göyçay",
						"parent": ""
					},
					"AZ-GYG": {
						"category": "rayon",
						"code": "AZ-GYG",
						"name": "Göygöl",
						"parent": ""
					},
					"AZ-HAC": {
						"category": "rayon",
						"code": "AZ-HAC",
						"name": "Hacıqabul",
						"parent": ""
					},
					"AZ-IMI": {
						"category": "rayon",
						"code": "AZ-IMI",
						"name": "İmişli",
						"parent": ""
					},
					"AZ-ISM": {
						"category": "rayon",
						"code": "AZ-ISM",
						"name": "İsmayıllı",
						"parent": ""
					},
					"AZ-KAL": {
						"category": "rayon",
						"code": "AZ-KAL",
						"name": "Kəlbəcər",
						"parent": ""
					},
					"AZ-KAN": {
						"category": "rayon",
						"code": "AZ-KAN",
						"name": "Kǝngǝrli",
						"parent": "AZ-NX"
					},
					"AZ-KUR": {
						"category": "rayon",
						"code": "AZ-KUR",
						"name": "Kürdəmir",
						"parent": ""
					},
					"AZ-LA": {
						"category": "municipality",
						"code": "AZ-LA",
						"name": "Lənkəran",
						"parent": ""
					},
					"AZ-LAC": {
						"category": "rayon",
						"code": "AZ-LAC",
						"name": "Laçın",
						"parent": ""
					},
					"AZ-LAN": {
						"category": "rayon",
						"code": "AZ-LAN",
						"name": "Lənkəran",
						"parent": ""
					},
					"AZ-LER": {
						"category": "rayon",
						"code": "AZ-LER",
						"name": "Lerik",
						"parent": ""
					},
					"AZ-MAS": {
						"category": "rayon",
						"code": "AZ-MAS",
						"name": "Masallı",
						"parent": ""
					},
					"AZ-MI": {
						"category": "municipality",
						"code": "AZ-MI",
						"name": "Mingəçevir",
						"parent": ""
					},
					"AZ-NA": {
						"category": "municipality",
						"code": "AZ-NA",
						"name": "Naftalan",
						"parent": ""
					},
					"AZ-NEF": {
						"category": "rayon",
						"code": "AZ-NEF",
						"name": "Neftçala",
						"parent": ""
					},
					"AZ-NV": {
						"category": "municipality",
						"code": "AZ-NV",
						"name": "Naxçıvan",
						"parent": "AZ-NX"
					},
					"AZ-NX": {
						"category": "autonomous republic",
						"code": "AZ-NX",
						"name": "Naxçıvan",
						"parent": ""
					},
					"AZ-OGU": {
						"category": "rayon",
						"code": "AZ-OGU",
						"name": "Oğuz",
						"parent": ""
					},
					"AZ-ORD": {
						"category": "rayon",
						"code": "AZ-ORD",
						"name": "Ordubad",
						"parent": "AZ-NX"
					},
					"AZ-QAB": {
						"category": "rayon",
						"code": "AZ-QAB",
						"name": "Qəbələ",
						"parent": ""
					},
					"AZ-QAX": {
						"category": "rayon",
						"code": "AZ-QAX",
						"name": "Qax",
						"parent": ""
					},
					"AZ-QAZ": {
						"category": "rayon",
						"code": "AZ-QAZ",
						"name": "Qazax",
						"parent": ""
					},
					"AZ-QBA": {
						"category": "rayon",
						"code": "AZ-QBA",
						"name": "Quba",
						"parent": ""
					},
					"AZ-QBI": {
						"category": "rayon",
						"code": "AZ-QBI",
						"name": "Qubadlı",
						"parent": ""
					},
					"AZ-QOB": {
						"category": "rayon",
						"code": "AZ-QOB",
						"name": "Qobustan",
						"parent": ""
					},
					"AZ-QUS": {
						"category": "rayon",
						"code": "AZ-QUS",
						"name": "Qusar",
						"parent": ""
					},
					"AZ-SA": {
						"category": "municipality",
						"code": "AZ-SA",
						"name": "Şəki",
						"parent": ""
					},
					"AZ-SAB": {
						"category": "rayon",
						"code": "AZ-SAB",
						"name": "Sabirabad",
						"parent": ""
					},
					"AZ-SAD": {
						"category": "rayon",
						"code": "AZ-SAD",
						"name": "Sədərək",
						"parent": "AZ-NX"
					},
					"AZ-SAH": {
						"category": "rayon",
						"code": "AZ-SAH",
						"name": "Şahbuz",
						"parent": "AZ-NX"
					},
					"AZ-SAK": {
						"category": "rayon",
						"code": "AZ-SAK",
						"name": "Şəki",
						"parent": ""
					},
					"AZ-SAL": {
						"category": "rayon",
						"code": "AZ-SAL",
						"name": "Salyan",
						"parent": ""
					},
					"AZ-SAR": {
						"category": "rayon",
						"code": "AZ-SAR",
						"name": "Şərur",
						"parent": "AZ-NX"
					},
					"AZ-SAT": {
						"category": "rayon",
						"code": "AZ-SAT",
						"name": "Saatlı",
						"parent": ""
					},
					"AZ-SBN": {
						"category": "rayon",
						"code": "AZ-SBN",
						"name": "Şabran",
						"parent": ""
					},
					"AZ-SIY": {
						"category": "rayon",
						"code": "AZ-SIY",
						"name": "Siyəzən",
						"parent": ""
					},
					"AZ-SKR": {
						"category": "rayon",
						"code": "AZ-SKR",
						"name": "Şəmkir",
						"parent": ""
					},
					"AZ-SM": {
						"category": "municipality",
						"code": "AZ-SM",
						"name": "Sumqayıt",
						"parent": ""
					},
					"AZ-SMI": {
						"category": "rayon",
						"code": "AZ-SMI",
						"name": "Şamaxı",
						"parent": ""
					},
					"AZ-SMX": {
						"category": "rayon",
						"code": "AZ-SMX",
						"name": "Samux",
						"parent": ""
					},
					"AZ-SR": {
						"category": "municipality",
						"code": "AZ-SR",
						"name": "Şirvan",
						"parent": ""
					},
					"AZ-SUS": {
						"category": "rayon",
						"code": "AZ-SUS",
						"name": "Şuşa",
						"parent": ""
					},
					"AZ-TAR": {
						"category": "rayon",
						"code": "AZ-TAR",
						"name": "Tərtər",
						"parent": ""
					},
					"AZ-TOV": {
						"category": "rayon",
						"code": "AZ-TOV",
						"name": "Tovuz",
						"parent": ""
					},
					"AZ-UCA": {
						"category": "rayon",
						"code": "AZ-UCA",
						"name": "Ucar",
						"parent": ""
					},
					"AZ-XA": {
						"category": "municipality",
						"code": "AZ-XA",
						"name": "Xankəndi",
						"parent": ""
					},
					"AZ-XAC": {
						"category": "rayon",
						"code": "AZ-XAC",
						"name": "Xaçmaz",
						"parent": ""
					},
					"AZ-XCI": {
						"category": "rayon",
						"code": "AZ-XCI",
						"name": "Xocalı",
						"parent": ""
					},
					"AZ-XIZ": {
						"category": "rayon",
						"code": "AZ-XIZ",
						"name": "Xızı",
						"parent": ""
					},
					"AZ-XVD": {
						"category": "rayon",
						"code": "AZ-XVD",
						"name": "Xocavənd",
						"parent": ""
					},
					"AZ-YAR": {
						"category": "rayon",
						"code": "AZ-YAR",
						"name": "Yardımlı",
						"parent": ""
					},
					"AZ-YE": {
						"category": "municipality",
						"code": "AZ-YE",
						"name": "Yevlax",
						"parent": ""
					},
					"AZ-YEV": {
						"category": "rayon",
						"code": "AZ-YEV",
						"name": "Yevlax",
						"parent": ""
					},
					"AZ-ZAN": {
						"category": "rayon",
						"code": "AZ-ZAN",
						"name": "Zəngilan",
						"parent": ""
					},
					"AZ-ZAQ": {
						"category": "rayon",
						"code": "AZ-ZAQ",
						"name": "Zaqatala",
						"parent": ""
					},
					"AZ-ZAR": {
						"category": "rayon",
						"code": "AZ-ZAR",
						"name": "Zərdab",
						"parent": ""
					}
				}
			},
			"BDI": {
				"threeLetterCode": "BDI",
				"shortName": "Burundi",
				"shortNameUpperCase": "BURUNDI",
				"fullName": "the Republic of Burundi",
				"subdivisionLabel": "province",
				"subdivisions": {
					"BI-BB": {
						"category": "province",
						"code": "BI-BB",
						"name": "Bubanza",
						"parent": ""
					},
					"BI-BL": {
						"category": "province",
						"code": "BI-BL",
						"name": "Bujumbura Rural",
						"parent": ""
					},
					"BI-BM": {
						"category": "province",
						"code": "BI-BM",
						"name": "Bujumbura Mairie",
						"parent": ""
					},
					"BI-BR": {
						"category": "province",
						"code": "BI-BR",
						"name": "Bururi",
						"parent": ""
					},
					"BI-CA": {
						"category": "province",
						"code": "BI-CA",
						"name": "Cankuzo",
						"parent": ""
					},
					"BI-CI": {
						"category": "province",
						"code": "BI-CI",
						"name": "Cibitoke",
						"parent": ""
					},
					"BI-GI": {
						"category": "province",
						"code": "BI-GI",
						"name": "Gitega",
						"parent": ""
					},
					"BI-KI": {
						"category": "province",
						"code": "BI-KI",
						"name": "Kirundo",
						"parent": ""
					},
					"BI-KR": {
						"category": "province",
						"code": "BI-KR",
						"name": "Karuzi",
						"parent": ""
					},
					"BI-KY": {
						"category": "province",
						"code": "BI-KY",
						"name": "Kayanza",
						"parent": ""
					},
					"BI-MA": {
						"category": "province",
						"code": "BI-MA",
						"name": "Makamba",
						"parent": ""
					},
					"BI-MU": {
						"category": "province",
						"code": "BI-MU",
						"name": "Muramvya",
						"parent": ""
					},
					"BI-MW": {
						"category": "province",
						"code": "BI-MW",
						"name": "Mwaro",
						"parent": ""
					},
					"BI-MY": {
						"category": "province",
						"code": "BI-MY",
						"name": "Muyinga",
						"parent": ""
					},
					"BI-NG": {
						"category": "province",
						"code": "BI-NG",
						"name": "Ngozi",
						"parent": ""
					},
					"BI-RM": {
						"category": "province",
						"code": "BI-RM",
						"name": "Rumonge",
						"parent": ""
					},
					"BI-RT": {
						"category": "province",
						"code": "BI-RT",
						"name": "Rutana",
						"parent": ""
					},
					"BI-RY": {
						"category": "province",
						"code": "BI-RY",
						"name": "Ruyigi",
						"parent": ""
					}
				}
			},
			"BEL": {
				"threeLetterCode": "BEL",
				"shortName": "Belgium",
				"shortNameUpperCase": "BELGIUM",
				"fullName": "the Kingdom of Belgium",
				"subdivisionLabel": "province",
				"subdivisions": {
					"BE-BRU": {
						"category": "region",
						"code": "BE-BRU",
						"name": "Bruxelles-Capitale, Région de",
						"parent": ""
					},
					"BE-VAN": {
						"category": "province",
						"code": "BE-VAN",
						"name": "Antwerpen",
						"parent": "BE-VLG"
					},
					"BE-VBR": {
						"category": "province",
						"code": "BE-VBR",
						"name": "Vlaams-Brabant",
						"parent": "BE-VLG"
					},
					"BE-VLG": {
						"category": "region",
						"code": "BE-VLG",
						"name": "Vlaams Gewest",
						"parent": ""
					},
					"BE-VLI": {
						"category": "province",
						"code": "BE-VLI",
						"name": "Limburg",
						"parent": "BE-VLG"
					},
					"BE-VOV": {
						"category": "province",
						"code": "BE-VOV",
						"name": "Oost-Vlaanderen",
						"parent": "BE-VLG"
					},
					"BE-VWV": {
						"category": "province",
						"code": "BE-VWV",
						"name": "West-Vlaanderen",
						"parent": "BE-VLG"
					},
					"BE-WAL": {
						"category": "region",
						"code": "BE-WAL",
						"name": "wallonne, Région",
						"parent": ""
					},
					"BE-WBR": {
						"category": "province",
						"code": "BE-WBR",
						"name": "Brabant wallon",
						"parent": "BE-WAL"
					},
					"BE-WHT": {
						"category": "province",
						"code": "BE-WHT",
						"name": "Hainaut",
						"parent": "BE-WAL"
					},
					"BE-WLG": {
						"category": "province",
						"code": "BE-WLG",
						"name": "Liège",
						"parent": "BE-WAL"
					},
					"BE-WLX": {
						"category": "province",
						"code": "BE-WLX",
						"name": "Luxembourg",
						"parent": "BE-WAL"
					},
					"BE-WNA": {
						"category": "province",
						"code": "BE-WNA",
						"name": "Namur",
						"parent": "BE-WAL"
					}
				}
			},
			"BEN": {
				"threeLetterCode": "BEN",
				"shortName": "Benin",
				"shortNameUpperCase": "BENIN",
				"fullName": "the Republic of Benin",
				"subdivisionLabel": "department",
				"subdivisions": {
					"BJ-AK": {
						"category": "department",
						"code": "BJ-AK",
						"name": "Atacora",
						"parent": ""
					},
					"BJ-AL": {
						"category": "department",
						"code": "BJ-AL",
						"name": "Alibori",
						"parent": ""
					},
					"BJ-AQ": {
						"category": "department",
						"code": "BJ-AQ",
						"name": "Atlantique",
						"parent": ""
					},
					"BJ-BO": {
						"category": "department",
						"code": "BJ-BO",
						"name": "Borgou",
						"parent": ""
					},
					"BJ-CO": {
						"category": "department",
						"code": "BJ-CO",
						"name": "Collines",
						"parent": ""
					},
					"BJ-DO": {
						"category": "department",
						"code": "BJ-DO",
						"name": "Donga",
						"parent": ""
					},
					"BJ-KO": {
						"category": "department",
						"code": "BJ-KO",
						"name": "Couffo",
						"parent": ""
					},
					"BJ-LI": {
						"category": "department",
						"code": "BJ-LI",
						"name": "Littoral",
						"parent": ""
					},
					"BJ-MO": {
						"category": "department",
						"code": "BJ-MO",
						"name": "Mono",
						"parent": ""
					},
					"BJ-OU": {
						"category": "department",
						"code": "BJ-OU",
						"name": "Ouémé",
						"parent": ""
					},
					"BJ-PL": {
						"category": "department",
						"code": "BJ-PL",
						"name": "Plateau",
						"parent": ""
					},
					"BJ-ZO": {
						"category": "department",
						"code": "BJ-ZO",
						"name": "Zou",
						"parent": ""
					}
				}
			},
			"BES": {
				"threeLetterCode": "BES",
				"shortName": "Bonaire, Sint Eustatius and Saba",
				"shortNameUpperCase": "BONAIRE, SINT EUSTATIUS AND SABA",
				"fullName": "Bonaire, Sint Eustatius and Saba",
				"subdivisionLabel": "special municipality",
				"subdivisions": {
					"BQ-BO": {
						"category": "special municipality",
						"code": "BQ-BO",
						"name": "Bonaire",
						"parent": ""
					},
					"BQ-SA": {
						"category": "special municipality",
						"code": "BQ-SA",
						"name": "Saba",
						"parent": ""
					},
					"BQ-SE": {
						"category": "special municipality",
						"code": "BQ-SE",
						"name": "Sint Eustatius",
						"parent": ""
					}
				}
			},
			"BFA": {
				"threeLetterCode": "BFA",
				"shortName": "Burkina Faso",
				"shortNameUpperCase": "BURKINA FASO",
				"fullName": "Burkina Faso",
				"subdivisionLabel": "province",
				"subdivisions": {
					"BF-01": {
						"category": "region",
						"code": "BF-01",
						"name": "Boucle du Mouhoun",
						"parent": ""
					},
					"BF-02": {
						"category": "region",
						"code": "BF-02",
						"name": "Cascades",
						"parent": ""
					},
					"BF-03": {
						"category": "region",
						"code": "BF-03",
						"name": "Centre",
						"parent": ""
					},
					"BF-04": {
						"category": "region",
						"code": "BF-04",
						"name": "Centre-Est",
						"parent": ""
					},
					"BF-05": {
						"category": "region",
						"code": "BF-05",
						"name": "Centre-Nord",
						"parent": ""
					},
					"BF-06": {
						"category": "region",
						"code": "BF-06",
						"name": "Centre-Ouest",
						"parent": ""
					},
					"BF-07": {
						"category": "region",
						"code": "BF-07",
						"name": "Centre-Sud",
						"parent": ""
					},
					"BF-08": {
						"category": "region",
						"code": "BF-08",
						"name": "Est",
						"parent": ""
					},
					"BF-09": {
						"category": "region",
						"code": "BF-09",
						"name": "Hauts-Bassins",
						"parent": ""
					},
					"BF-10": {
						"category": "region",
						"code": "BF-10",
						"name": "Nord",
						"parent": ""
					},
					"BF-11": {
						"category": "region",
						"code": "BF-11",
						"name": "Plateau-Central",
						"parent": ""
					},
					"BF-12": {
						"category": "region",
						"code": "BF-12",
						"name": "Sahel",
						"parent": ""
					},
					"BF-13": {
						"category": "region",
						"code": "BF-13",
						"name": "Sud-Ouest",
						"parent": ""
					},
					"BF-BAL": {
						"category": "province",
						"code": "BF-BAL",
						"name": "Balé",
						"parent": "BF-01"
					},
					"BF-BAM": {
						"category": "province",
						"code": "BF-BAM",
						"name": "Bam",
						"parent": "BF-05"
					},
					"BF-BAN": {
						"category": "province",
						"code": "BF-BAN",
						"name": "Banwa",
						"parent": "BF-01"
					},
					"BF-BAZ": {
						"category": "province",
						"code": "BF-BAZ",
						"name": "Bazèga",
						"parent": "BF-07"
					},
					"BF-BGR": {
						"category": "province",
						"code": "BF-BGR",
						"name": "Bougouriba",
						"parent": "BF-13"
					},
					"BF-BLG": {
						"category": "province",
						"code": "BF-BLG",
						"name": "Boulgou",
						"parent": "BF-04"
					},
					"BF-BLK": {
						"category": "province",
						"code": "BF-BLK",
						"name": "Boulkiemdé",
						"parent": "BF-06"
					},
					"BF-COM": {
						"category": "province",
						"code": "BF-COM",
						"name": "Comoé",
						"parent": "BF-02"
					},
					"BF-GAN": {
						"category": "province",
						"code": "BF-GAN",
						"name": "Ganzourgou",
						"parent": "BF-11"
					},
					"BF-GNA": {
						"category": "province",
						"code": "BF-GNA",
						"name": "Gnagna",
						"parent": "BF-08"
					},
					"BF-GOU": {
						"category": "province",
						"code": "BF-GOU",
						"name": "Gourma",
						"parent": "BF-08"
					},
					"BF-HOU": {
						"category": "province",
						"code": "BF-HOU",
						"name": "Houet",
						"parent": "BF-09"
					},
					"BF-IOB": {
						"category": "province",
						"code": "BF-IOB",
						"name": "Ioba",
						"parent": "BF-13"
					},
					"BF-KAD": {
						"category": "province",
						"code": "BF-KAD",
						"name": "Kadiogo",
						"parent": "BF-03"
					},
					"BF-KEN": {
						"category": "province",
						"code": "BF-KEN",
						"name": "Kénédougou",
						"parent": "BF-09"
					},
					"BF-KMD": {
						"category": "province",
						"code": "BF-KMD",
						"name": "Komondjari",
						"parent": "BF-08"
					},
					"BF-KMP": {
						"category": "province",
						"code": "BF-KMP",
						"name": "Kompienga",
						"parent": "BF-08"
					},
					"BF-KOP": {
						"category": "province",
						"code": "BF-KOP",
						"name": "Koulpélogo",
						"parent": "BF-04"
					},
					"BF-KOS": {
						"category": "province",
						"code": "BF-KOS",
						"name": "Kossi",
						"parent": "BF-01"
					},
					"BF-KOT": {
						"category": "province",
						"code": "BF-KOT",
						"name": "Kouritenga",
						"parent": "BF-04"
					},
					"BF-KOW": {
						"category": "province",
						"code": "BF-KOW",
						"name": "Kourwéogo",
						"parent": "BF-11"
					},
					"BF-LER": {
						"category": "province",
						"code": "BF-LER",
						"name": "Léraba",
						"parent": "BF-02"
					},
					"BF-LOR": {
						"category": "province",
						"code": "BF-LOR",
						"name": "Loroum",
						"parent": "BF-10"
					},
					"BF-MOU": {
						"category": "province",
						"code": "BF-MOU",
						"name": "Mouhoun",
						"parent": "BF-01"
					},
					"BF-NAM": {
						"category": "province",
						"code": "BF-NAM",
						"name": "Namentenga",
						"parent": "BF-05"
					},
					"BF-NAO": {
						"category": "province",
						"code": "BF-NAO",
						"name": "Nahouri",
						"parent": "BF-07"
					},
					"BF-NAY": {
						"category": "province",
						"code": "BF-NAY",
						"name": "Nayala",
						"parent": "BF-01"
					},
					"BF-NOU": {
						"category": "province",
						"code": "BF-NOU",
						"name": "Noumbiel",
						"parent": "BF-13"
					},
					"BF-OUB": {
						"category": "province",
						"code": "BF-OUB",
						"name": "Oubritenga",
						"parent": "BF-11"
					},
					"BF-OUD": {
						"category": "province",
						"code": "BF-OUD",
						"name": "Oudalan",
						"parent": "BF-12"
					},
					"BF-PAS": {
						"category": "province",
						"code": "BF-PAS",
						"name": "Passoré",
						"parent": "BF-10"
					},
					"BF-PON": {
						"category": "province",
						"code": "BF-PON",
						"name": "Poni",
						"parent": "BF-13"
					},
					"BF-SEN": {
						"category": "province",
						"code": "BF-SEN",
						"name": "Séno",
						"parent": "BF-12"
					},
					"BF-SIS": {
						"category": "province",
						"code": "BF-SIS",
						"name": "Sissili",
						"parent": "BF-06"
					},
					"BF-SMT": {
						"category": "province",
						"code": "BF-SMT",
						"name": "Sanmatenga",
						"parent": "BF-05"
					},
					"BF-SNG": {
						"category": "province",
						"code": "BF-SNG",
						"name": "Sanguié",
						"parent": "BF-06"
					},
					"BF-SOM": {
						"category": "province",
						"code": "BF-SOM",
						"name": "Soum",
						"parent": "BF-12"
					},
					"BF-SOR": {
						"category": "province",
						"code": "BF-SOR",
						"name": "Sourou",
						"parent": "BF-01"
					},
					"BF-TAP": {
						"category": "province",
						"code": "BF-TAP",
						"name": "Tapoa",
						"parent": "BF-08"
					},
					"BF-TUI": {
						"category": "province",
						"code": "BF-TUI",
						"name": "Tuy",
						"parent": "BF-09"
					},
					"BF-YAG": {
						"category": "province",
						"code": "BF-YAG",
						"name": "Yagha",
						"parent": "BF-12"
					},
					"BF-YAT": {
						"category": "province",
						"code": "BF-YAT",
						"name": "Yatenga",
						"parent": "BF-10"
					},
					"BF-ZIR": {
						"category": "province",
						"code": "BF-ZIR",
						"name": "Ziro",
						"parent": "BF-06"
					},
					"BF-ZON": {
						"category": "province",
						"code": "BF-ZON",
						"name": "Zondoma",
						"parent": "BF-10"
					},
					"BF-ZOU": {
						"category": "province",
						"code": "BF-ZOU",
						"name": "Zoundwéogo",
						"parent": "BF-07"
					}
				}
			},
			"BGD": {
				"threeLetterCode": "BGD",
				"shortName": "Bangladesh",
				"shortNameUpperCase": "BANGLADESH",
				"fullName": "the People's Republic of Bangladesh",
				"subdivisionLabel": "district",
				"subdivisions": {
					"BD-01": {
						"category": "district",
						"code": "BD-01",
						"name": "Bandarban",
						"parent": "BD-B"
					},
					"BD-02": {
						"category": "district",
						"code": "BD-02",
						"name": "Barguna",
						"parent": "BD-A"
					},
					"BD-03": {
						"category": "district",
						"code": "BD-03",
						"name": "Bogra",
						"parent": "BD-E"
					},
					"BD-04": {
						"category": "district",
						"code": "BD-04",
						"name": "Brahmanbaria",
						"parent": "BD-B"
					},
					"BD-05": {
						"category": "district",
						"code": "BD-05",
						"name": "Bagerhat",
						"parent": "BD-D"
					},
					"BD-06": {
						"category": "district",
						"code": "BD-06",
						"name": "Barisal",
						"parent": "BD-A"
					},
					"BD-07": {
						"category": "district",
						"code": "BD-07",
						"name": "Bhola",
						"parent": "BD-A"
					},
					"BD-08": {
						"category": "district",
						"code": "BD-08",
						"name": "Comilla",
						"parent": "BD-B"
					},
					"BD-09": {
						"category": "district",
						"code": "BD-09",
						"name": "Chandpur",
						"parent": "BD-B"
					},
					"BD-10": {
						"category": "district",
						"code": "BD-10",
						"name": "Chittagong",
						"parent": "BD-B"
					},
					"BD-11": {
						"category": "district",
						"code": "BD-11",
						"name": "Cox's Bazar",
						"parent": "BD-B"
					},
					"BD-12": {
						"category": "district",
						"code": "BD-12",
						"name": "Chuadanga",
						"parent": "BD-D"
					},
					"BD-13": {
						"category": "district",
						"code": "BD-13",
						"name": "Dhaka",
						"parent": "BD-C"
					},
					"BD-14": {
						"category": "district",
						"code": "BD-14",
						"name": "Dinajpur",
						"parent": "BD-F"
					},
					"BD-15": {
						"category": "district",
						"code": "BD-15",
						"name": "Faridpur",
						"parent": "BD-C"
					},
					"BD-16": {
						"category": "district",
						"code": "BD-16",
						"name": "Feni",
						"parent": "BD-B"
					},
					"BD-17": {
						"category": "district",
						"code": "BD-17",
						"name": "Gopalganj",
						"parent": "BD-C"
					},
					"BD-18": {
						"category": "district",
						"code": "BD-18",
						"name": "Gazipur",
						"parent": "BD-C"
					},
					"BD-19": {
						"category": "district",
						"code": "BD-19",
						"name": "Gaibandha",
						"parent": "BD-F"
					},
					"BD-20": {
						"category": "district",
						"code": "BD-20",
						"name": "Habiganj",
						"parent": "BD-G"
					},
					"BD-21": {
						"category": "district",
						"code": "BD-21",
						"name": "Jamalpur",
						"parent": "BD-H"
					},
					"BD-22": {
						"category": "district",
						"code": "BD-22",
						"name": "Jessore",
						"parent": "BD-D"
					},
					"BD-23": {
						"category": "district",
						"code": "BD-23",
						"name": "Jhenaidah",
						"parent": "BD-D"
					},
					"BD-24": {
						"category": "district",
						"code": "BD-24",
						"name": "Joypurhat",
						"parent": "BD-E"
					},
					"BD-25": {
						"category": "district",
						"code": "BD-25",
						"name": "Jhalakathi",
						"parent": "BD-A"
					},
					"BD-26": {
						"category": "district",
						"code": "BD-26",
						"name": "Kishoreganj",
						"parent": "BD-C"
					},
					"BD-27": {
						"category": "district",
						"code": "BD-27",
						"name": "Khulna",
						"parent": "BD-D"
					},
					"BD-28": {
						"category": "district",
						"code": "BD-28",
						"name": "Kurigram",
						"parent": "BD-F"
					},
					"BD-29": {
						"category": "district",
						"code": "BD-29",
						"name": "Khagrachhari",
						"parent": "BD-B"
					},
					"BD-30": {
						"category": "district",
						"code": "BD-30",
						"name": "Kushtia",
						"parent": "BD-D"
					},
					"BD-31": {
						"category": "district",
						"code": "BD-31",
						"name": "Lakshmipur",
						"parent": "BD-B"
					},
					"BD-32": {
						"category": "district",
						"code": "BD-32",
						"name": "Lalmonirhat",
						"parent": "BD-F"
					},
					"BD-33": {
						"category": "district",
						"code": "BD-33",
						"name": "Manikganj",
						"parent": "BD-C"
					},
					"BD-34": {
						"category": "district",
						"code": "BD-34",
						"name": "Mymensingh",
						"parent": "BD-H"
					},
					"BD-35": {
						"category": "district",
						"code": "BD-35",
						"name": "Munshiganj",
						"parent": "BD-C"
					},
					"BD-36": {
						"category": "district",
						"code": "BD-36",
						"name": "Madaripur",
						"parent": "BD-C"
					},
					"BD-37": {
						"category": "district",
						"code": "BD-37",
						"name": "Magura",
						"parent": "BD-D"
					},
					"BD-38": {
						"category": "district",
						"code": "BD-38",
						"name": "Moulvibazar",
						"parent": "BD-G"
					},
					"BD-39": {
						"category": "district",
						"code": "BD-39",
						"name": "Meherpur",
						"parent": "BD-D"
					},
					"BD-40": {
						"category": "district",
						"code": "BD-40",
						"name": "Narayanganj",
						"parent": "BD-C"
					},
					"BD-41": {
						"category": "district",
						"code": "BD-41",
						"name": "Netrakona",
						"parent": "BD-H"
					},
					"BD-42": {
						"category": "district",
						"code": "BD-42",
						"name": "Narsingdi",
						"parent": "BD-C"
					},
					"BD-43": {
						"category": "district",
						"code": "BD-43",
						"name": "Narail",
						"parent": "BD-D"
					},
					"BD-44": {
						"category": "district",
						"code": "BD-44",
						"name": "Natore",
						"parent": "BD-E"
					},
					"BD-45": {
						"category": "district",
						"code": "BD-45",
						"name": "Chapai Nawabganj",
						"parent": "BD-E"
					},
					"BD-46": {
						"category": "district",
						"code": "BD-46",
						"name": "Nilphamari",
						"parent": "BD-F"
					},
					"BD-47": {
						"category": "district",
						"code": "BD-47",
						"name": "Noakhali",
						"parent": "BD-B"
					},
					"BD-48": {
						"category": "district",
						"code": "BD-48",
						"name": "Naogaon",
						"parent": "BD-E"
					},
					"BD-49": {
						"category": "district",
						"code": "BD-49",
						"name": "Pabna",
						"parent": "BD-E"
					},
					"BD-50": {
						"category": "district",
						"code": "BD-50",
						"name": "Pirojpur",
						"parent": "BD-A"
					},
					"BD-51": {
						"category": "district",
						"code": "BD-51",
						"name": "Patuakhali",
						"parent": "BD-A"
					},
					"BD-52": {
						"category": "district",
						"code": "BD-52",
						"name": "Panchagarh",
						"parent": "BD-F"
					},
					"BD-53": {
						"category": "district",
						"code": "BD-53",
						"name": "Rajbari",
						"parent": "BD-C"
					},
					"BD-54": {
						"category": "district",
						"code": "BD-54",
						"name": "Rajshahi",
						"parent": "BD-E"
					},
					"BD-55": {
						"category": "district",
						"code": "BD-55",
						"name": "Rangpur",
						"parent": "BD-F"
					},
					"BD-56": {
						"category": "district",
						"code": "BD-56",
						"name": "Rangamati",
						"parent": "BD-B"
					},
					"BD-57": {
						"category": "district",
						"code": "BD-57",
						"name": "Sherpur",
						"parent": "BD-H"
					},
					"BD-58": {
						"category": "district",
						"code": "BD-58",
						"name": "Satkhira",
						"parent": "BD-D"
					},
					"BD-59": {
						"category": "district",
						"code": "BD-59",
						"name": "Sirajganj",
						"parent": "BD-E"
					},
					"BD-60": {
						"category": "district",
						"code": "BD-60",
						"name": "Sylhet",
						"parent": "BD-G"
					},
					"BD-61": {
						"category": "district",
						"code": "BD-61",
						"name": "Sunamganj",
						"parent": "BD-G"
					},
					"BD-62": {
						"category": "district",
						"code": "BD-62",
						"name": "Shariatpur",
						"parent": "BD-C"
					},
					"BD-63": {
						"category": "district",
						"code": "BD-63",
						"name": "Tangail",
						"parent": "BD-C"
					},
					"BD-64": {
						"category": "district",
						"code": "BD-64",
						"name": "Thakurgaon",
						"parent": "BD-F"
					},
					"BD-A": {
						"category": "division",
						"code": "BD-A",
						"name": "Barisal",
						"parent": ""
					},
					"BD-B": {
						"category": "division",
						"code": "BD-B",
						"name": "Chittagong",
						"parent": ""
					},
					"BD-C": {
						"category": "division",
						"code": "BD-C",
						"name": "Dhaka",
						"parent": ""
					},
					"BD-D": {
						"category": "division",
						"code": "BD-D",
						"name": "Khulna",
						"parent": ""
					},
					"BD-E": {
						"category": "division",
						"code": "BD-E",
						"name": "Rajshahi",
						"parent": ""
					},
					"BD-F": {
						"category": "division",
						"code": "BD-F",
						"name": "Rangpur",
						"parent": ""
					},
					"BD-G": {
						"category": "division",
						"code": "BD-G",
						"name": "Sylhet",
						"parent": ""
					},
					"BD-H": {
						"category": "division",
						"code": "BD-H",
						"name": "Mymensingh",
						"parent": ""
					}
				}
			},
			"BGR": {
				"threeLetterCode": "BGR",
				"shortName": "Bulgaria",
				"shortNameUpperCase": "BULGARIA",
				"fullName": "the Republic of Bulgaria",
				"subdivisionLabel": "region",
				"subdivisions": {
					"BG-01": {
						"category": "region",
						"code": "BG-01",
						"name": "Blagoevgrad",
						"parent": ""
					},
					"BG-02": {
						"category": "region",
						"code": "BG-02",
						"name": "Burgas",
						"parent": ""
					},
					"BG-03": {
						"category": "region",
						"code": "BG-03",
						"name": "Varna",
						"parent": ""
					},
					"BG-04": {
						"category": "region",
						"code": "BG-04",
						"name": "Veliko Tarnovo",
						"parent": ""
					},
					"BG-05": {
						"category": "region",
						"code": "BG-05",
						"name": "Vidin",
						"parent": ""
					},
					"BG-06": {
						"category": "region",
						"code": "BG-06",
						"name": "Vratsa",
						"parent": ""
					},
					"BG-07": {
						"category": "region",
						"code": "BG-07",
						"name": "Gabrovo",
						"parent": ""
					},
					"BG-08": {
						"category": "region",
						"code": "BG-08",
						"name": "Dobrich",
						"parent": ""
					},
					"BG-09": {
						"category": "region",
						"code": "BG-09",
						"name": "Kardzhali",
						"parent": ""
					},
					"BG-10": {
						"category": "region",
						"code": "BG-10",
						"name": "Kyustendil",
						"parent": ""
					},
					"BG-11": {
						"category": "region",
						"code": "BG-11",
						"name": "Lovech",
						"parent": ""
					},
					"BG-12": {
						"category": "region",
						"code": "BG-12",
						"name": "Montana",
						"parent": ""
					},
					"BG-13": {
						"category": "region",
						"code": "BG-13",
						"name": "Pazardzhik",
						"parent": ""
					},
					"BG-14": {
						"category": "region",
						"code": "BG-14",
						"name": "Pernik",
						"parent": ""
					},
					"BG-15": {
						"category": "region",
						"code": "BG-15",
						"name": "Pleven",
						"parent": ""
					},
					"BG-16": {
						"category": "region",
						"code": "BG-16",
						"name": "Plovdiv",
						"parent": ""
					},
					"BG-17": {
						"category": "region",
						"code": "BG-17",
						"name": "Razgrad",
						"parent": ""
					},
					"BG-18": {
						"category": "region",
						"code": "BG-18",
						"name": "Ruse",
						"parent": ""
					},
					"BG-19": {
						"category": "region",
						"code": "BG-19",
						"name": "Silistra",
						"parent": ""
					},
					"BG-20": {
						"category": "region",
						"code": "BG-20",
						"name": "Sliven",
						"parent": ""
					},
					"BG-21": {
						"category": "region",
						"code": "BG-21",
						"name": "Smolyan",
						"parent": ""
					},
					"BG-22": {
						"category": "region",
						"code": "BG-22",
						"name": "Sofia (stolitsa)",
						"parent": ""
					},
					"BG-23": {
						"category": "region",
						"code": "BG-23",
						"name": "Sofia",
						"parent": ""
					},
					"BG-24": {
						"category": "region",
						"code": "BG-24",
						"name": "Stara Zagora",
						"parent": ""
					},
					"BG-25": {
						"category": "region",
						"code": "BG-25",
						"name": "Targovishte",
						"parent": ""
					},
					"BG-26": {
						"category": "region",
						"code": "BG-26",
						"name": "Haskovo",
						"parent": ""
					},
					"BG-27": {
						"category": "region",
						"code": "BG-27",
						"name": "Shumen",
						"parent": ""
					},
					"BG-28": {
						"category": "region",
						"code": "BG-28",
						"name": "Yambol",
						"parent": ""
					}
				}
			},
			"BHR": {
				"threeLetterCode": "BHR",
				"shortName": "Bahrain",
				"shortNameUpperCase": "BAHRAIN",
				"fullName": "the Kingdom of Bahrain",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"BH-13": {
						"category": "governorate",
						"code": "BH-13",
						"name": "Al ‘Āşimah",
						"parent": ""
					},
					"BH-14": {
						"category": "governorate",
						"code": "BH-14",
						"name": "Al Janūbīyah",
						"parent": ""
					},
					"BH-15": {
						"category": "governorate",
						"code": "BH-15",
						"name": "Al Muḩarraq",
						"parent": ""
					},
					"BH-17": {
						"category": "governorate",
						"code": "BH-17",
						"name": "Ash Shamālīyah",
						"parent": ""
					}
				}
			},
			"BHS": {
				"commonName": "Bahamas",
				"threeLetterCode": "BHS",
				"shortName": "Bahamas (the)",
				"shortNameUpperCase": "BAHAMAS",
				"fullName": "the Commonwealth of the Bahamas",
				"subdivisionLabel": "district",
				"subdivisions": {
					"BS-AK": {
						"category": "district",
						"code": "BS-AK",
						"name": "Acklins",
						"parent": ""
					},
					"BS-BI": {
						"category": "district",
						"code": "BS-BI",
						"name": "Bimini",
						"parent": ""
					},
					"BS-BP": {
						"category": "district",
						"code": "BS-BP",
						"name": "Black Point",
						"parent": ""
					},
					"BS-BY": {
						"category": "district",
						"code": "BS-BY",
						"name": "Berry Islands",
						"parent": ""
					},
					"BS-CE": {
						"category": "district",
						"code": "BS-CE",
						"name": "Central Eleuthera",
						"parent": ""
					},
					"BS-CI": {
						"category": "district",
						"code": "BS-CI",
						"name": "Cat Island",
						"parent": ""
					},
					"BS-CK": {
						"category": "district",
						"code": "BS-CK",
						"name": "Crooked Island and Long Cay",
						"parent": ""
					},
					"BS-CO": {
						"category": "district",
						"code": "BS-CO",
						"name": "Central Abaco",
						"parent": ""
					},
					"BS-CS": {
						"category": "district",
						"code": "BS-CS",
						"name": "Central Andros",
						"parent": ""
					},
					"BS-EG": {
						"category": "district",
						"code": "BS-EG",
						"name": "East Grand Bahama",
						"parent": ""
					},
					"BS-EX": {
						"category": "district",
						"code": "BS-EX",
						"name": "Exuma",
						"parent": ""
					},
					"BS-FP": {
						"category": "district",
						"code": "BS-FP",
						"name": "City of Freeport",
						"parent": ""
					},
					"BS-GC": {
						"category": "district",
						"code": "BS-GC",
						"name": "Grand Cay",
						"parent": ""
					},
					"BS-HI": {
						"category": "district",
						"code": "BS-HI",
						"name": "Harbour Island",
						"parent": ""
					},
					"BS-HT": {
						"category": "district",
						"code": "BS-HT",
						"name": "Hope Town",
						"parent": ""
					},
					"BS-IN": {
						"category": "district",
						"code": "BS-IN",
						"name": "Inagua",
						"parent": ""
					},
					"BS-LI": {
						"category": "district",
						"code": "BS-LI",
						"name": "Long Island",
						"parent": ""
					},
					"BS-MC": {
						"category": "district",
						"code": "BS-MC",
						"name": "Mangrove Cay",
						"parent": ""
					},
					"BS-MG": {
						"category": "district",
						"code": "BS-MG",
						"name": "Mayaguana",
						"parent": ""
					},
					"BS-MI": {
						"category": "district",
						"code": "BS-MI",
						"name": "Moore's Island",
						"parent": ""
					},
					"BS-NE": {
						"category": "district",
						"code": "BS-NE",
						"name": "North Eleuthera",
						"parent": ""
					},
					"BS-NO": {
						"category": "district",
						"code": "BS-NO",
						"name": "North Abaco",
						"parent": ""
					},
					"BS-NS": {
						"category": "district",
						"code": "BS-NS",
						"name": "North Andros",
						"parent": ""
					},
					"BS-RC": {
						"category": "district",
						"code": "BS-RC",
						"name": "Rum Cay",
						"parent": ""
					},
					"BS-RI": {
						"category": "district",
						"code": "BS-RI",
						"name": "Ragged Island",
						"parent": ""
					},
					"BS-SA": {
						"category": "district",
						"code": "BS-SA",
						"name": "South Andros",
						"parent": ""
					},
					"BS-SE": {
						"category": "district",
						"code": "BS-SE",
						"name": "South Eleuthera",
						"parent": ""
					},
					"BS-SO": {
						"category": "district",
						"code": "BS-SO",
						"name": "South Abaco",
						"parent": ""
					},
					"BS-SS": {
						"category": "district",
						"code": "BS-SS",
						"name": "San Salvador",
						"parent": ""
					},
					"BS-SW": {
						"category": "district",
						"code": "BS-SW",
						"name": "Spanish Wells",
						"parent": ""
					},
					"BS-WG": {
						"category": "district",
						"code": "BS-WG",
						"name": "West Grand Bahama",
						"parent": ""
					}
				}
			},
			"BIH": {
				"threeLetterCode": "BIH",
				"shortName": "Bosnia and Herzegovina",
				"shortNameUpperCase": "BOSNIA AND HERZEGOVINA",
				"fullName": "Bosnia and Herzegovina",
				"subdivisionLabel": "entity",
				"subdivisions": {
					"BA-BIH": {
						"category": "entity",
						"code": "BA-BIH",
						"name": "Federacija Bosne i Hercegovine",
						"parent": ""
					},
					"BA-BRC": {
						"category": "district with special status",
						"code": "BA-BRC",
						"name": "Brčko distrikt",
						"parent": ""
					},
					"BA-SRP": {
						"category": "entity",
						"code": "BA-SRP",
						"name": "Republika Srpska",
						"parent": ""
					}
				}
			},
			"BLM": {
				"threeLetterCode": "BLM",
				"shortName": "Saint Barthélemy",
				"shortNameUpperCase": "SAINT BARTHÉLEMY",
				"fullName": "Saint Barthélemy",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"BLR": {
				"threeLetterCode": "BLR",
				"shortName": "Belarus",
				"shortNameUpperCase": "BELARUS",
				"fullName": "the Republic of Belarus",
				"subdivisionLabel": "oblast",
				"subdivisions": {
					"BY-BR": {
						"category": "oblast",
						"code": "BY-BR",
						"name": "Bresckaja voblasć",
						"parent": ""
					},
					"BY-HM": {
						"category": "city",
						"code": "BY-HM",
						"name": "Horad Minsk",
						"parent": ""
					},
					"BY-HO": {
						"category": "oblast",
						"code": "BY-HO",
						"name": "Homieĺskaja voblasć",
						"parent": ""
					},
					"BY-HR": {
						"category": "oblast",
						"code": "BY-HR",
						"name": "Hrodzenskaya voblasts'",
						"parent": ""
					},
					"BY-MA": {
						"category": "oblast",
						"code": "BY-MA",
						"name": "Mahilioŭskaja voblasć",
						"parent": ""
					},
					"BY-MI": {
						"category": "oblast",
						"code": "BY-MI",
						"name": "Minskaja  voblasć",
						"parent": ""
					},
					"BY-VI": {
						"category": "oblast",
						"code": "BY-VI",
						"name": "Viciebskaja voblasć",
						"parent": ""
					}
				}
			},
			"BLZ": {
				"threeLetterCode": "BLZ",
				"shortName": "Belize",
				"shortNameUpperCase": "BELIZE",
				"fullName": "Belize",
				"subdivisionLabel": "district",
				"subdivisions": {
					"BZ-BZ": {
						"category": "district",
						"code": "BZ-BZ",
						"name": "Belize",
						"parent": ""
					},
					"BZ-CY": {
						"category": "district",
						"code": "BZ-CY",
						"name": "Cayo",
						"parent": ""
					},
					"BZ-CZL": {
						"category": "district",
						"code": "BZ-CZL",
						"name": "Corozal",
						"parent": ""
					},
					"BZ-OW": {
						"category": "district",
						"code": "BZ-OW",
						"name": "Orange Walk",
						"parent": ""
					},
					"BZ-SC": {
						"category": "district",
						"code": "BZ-SC",
						"name": "Stann Creek",
						"parent": ""
					},
					"BZ-TOL": {
						"category": "district",
						"code": "BZ-TOL",
						"name": "Toledo",
						"parent": ""
					}
				}
			},
			"BMU": {
				"threeLetterCode": "BMU",
				"shortName": "Bermuda",
				"shortNameUpperCase": "BERMUDA",
				"fullName": "Bermuda",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"BOL": {
				"commonName": "Bolivia",
				"threeLetterCode": "BOL",
				"shortName": "Bolivia (Plurinational State of)",
				"shortNameUpperCase": "BOLIVIA (PLURINATIONAL STATE OF)",
				"fullName": "the Plurinational State of Bolivia",
				"subdivisionLabel": "department",
				"subdivisions": {
					"BO-B": {
						"category": "department",
						"code": "BO-B",
						"name": "El Beni",
						"parent": ""
					},
					"BO-C": {
						"category": "department",
						"code": "BO-C",
						"name": "Cochabamba",
						"parent": ""
					},
					"BO-H": {
						"category": "department",
						"code": "BO-H",
						"name": "Chuquisaca",
						"parent": ""
					},
					"BO-L": {
						"category": "department",
						"code": "BO-L",
						"name": "La Paz",
						"parent": ""
					},
					"BO-N": {
						"category": "department",
						"code": "BO-N",
						"name": "Pando",
						"parent": ""
					},
					"BO-O": {
						"category": "department",
						"code": "BO-O",
						"name": "Oruro",
						"parent": ""
					},
					"BO-P": {
						"category": "department",
						"code": "BO-P",
						"name": "Potosí",
						"parent": ""
					},
					"BO-S": {
						"category": "department",
						"code": "BO-S",
						"name": "Santa Cruz",
						"parent": ""
					},
					"BO-T": {
						"category": "department",
						"code": "BO-T",
						"name": "Tarija",
						"parent": ""
					}
				}
			},
			"BRA": {
				"threeLetterCode": "BRA",
				"shortName": "Brazil",
				"shortNameUpperCase": "BRAZIL",
				"fullName": "the Federative Republic of Brazil",
				"subdivisionLabel": "state",
				"subdivisions": {
					"BR-AC": {
						"category": "state",
						"code": "BR-AC",
						"name": "Acre",
						"parent": ""
					},
					"BR-AL": {
						"category": "state",
						"code": "BR-AL",
						"name": "Alagoas",
						"parent": ""
					},
					"BR-AM": {
						"category": "state",
						"code": "BR-AM",
						"name": "Amazonas",
						"parent": ""
					},
					"BR-AP": {
						"category": "state",
						"code": "BR-AP",
						"name": "Amapá",
						"parent": ""
					},
					"BR-BA": {
						"category": "state",
						"code": "BR-BA",
						"name": "Bahia",
						"parent": ""
					},
					"BR-CE": {
						"category": "state",
						"code": "BR-CE",
						"name": "Ceará",
						"parent": ""
					},
					"BR-DF": {
						"category": "federal district",
						"code": "BR-DF",
						"name": "Distrito Federal",
						"parent": ""
					},
					"BR-ES": {
						"category": "state",
						"code": "BR-ES",
						"name": "Espírito Santo",
						"parent": ""
					},
					"BR-GO": {
						"category": "state",
						"code": "BR-GO",
						"name": "Goiás",
						"parent": ""
					},
					"BR-MA": {
						"category": "state",
						"code": "BR-MA",
						"name": "Maranhão",
						"parent": ""
					},
					"BR-MG": {
						"category": "state",
						"code": "BR-MG",
						"name": "Minas Gerais",
						"parent": ""
					},
					"BR-MS": {
						"category": "state",
						"code": "BR-MS",
						"name": "Mato Grosso do Sul",
						"parent": ""
					},
					"BR-MT": {
						"category": "state",
						"code": "BR-MT",
						"name": "Mato Grosso",
						"parent": ""
					},
					"BR-PA": {
						"category": "state",
						"code": "BR-PA",
						"name": "Pará",
						"parent": ""
					},
					"BR-PB": {
						"category": "state",
						"code": "BR-PB",
						"name": "Paraíba",
						"parent": ""
					},
					"BR-PE": {
						"category": "state",
						"code": "BR-PE",
						"name": "Pernambuco",
						"parent": ""
					},
					"BR-PI": {
						"category": "state",
						"code": "BR-PI",
						"name": "Piauí",
						"parent": ""
					},
					"BR-PR": {
						"category": "state",
						"code": "BR-PR",
						"name": "Paraná",
						"parent": ""
					},
					"BR-RJ": {
						"category": "state",
						"code": "BR-RJ",
						"name": "Rio de Janeiro",
						"parent": ""
					},
					"BR-RN": {
						"category": "state",
						"code": "BR-RN",
						"name": "Rio Grande do Norte",
						"parent": ""
					},
					"BR-RO": {
						"category": "state",
						"code": "BR-RO",
						"name": "Rondônia",
						"parent": ""
					},
					"BR-RR": {
						"category": "state",
						"code": "BR-RR",
						"name": "Roraima",
						"parent": ""
					},
					"BR-RS": {
						"category": "state",
						"code": "BR-RS",
						"name": "Rio Grande do Sul",
						"parent": ""
					},
					"BR-SC": {
						"category": "state",
						"code": "BR-SC",
						"name": "Santa Catarina",
						"parent": ""
					},
					"BR-SE": {
						"category": "state",
						"code": "BR-SE",
						"name": "Sergipe",
						"parent": ""
					},
					"BR-SP": {
						"category": "state",
						"code": "BR-SP",
						"name": "São Paulo",
						"parent": ""
					},
					"BR-TO": {
						"category": "state",
						"code": "BR-TO",
						"name": "Tocantins",
						"parent": ""
					}
				}
			},
			"BRB": {
				"threeLetterCode": "BRB",
				"shortName": "Barbados",
				"shortNameUpperCase": "BARBADOS",
				"fullName": "Barbados",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"BB-01": {
						"category": "parish",
						"code": "BB-01",
						"name": "Christ Church",
						"parent": ""
					},
					"BB-02": {
						"category": "parish",
						"code": "BB-02",
						"name": "Saint Andrew",
						"parent": ""
					},
					"BB-03": {
						"category": "parish",
						"code": "BB-03",
						"name": "Saint George",
						"parent": ""
					},
					"BB-04": {
						"category": "parish",
						"code": "BB-04",
						"name": "Saint James",
						"parent": ""
					},
					"BB-05": {
						"category": "parish",
						"code": "BB-05",
						"name": "Saint John",
						"parent": ""
					},
					"BB-06": {
						"category": "parish",
						"code": "BB-06",
						"name": "Saint Joseph",
						"parent": ""
					},
					"BB-07": {
						"category": "parish",
						"code": "BB-07",
						"name": "Saint Lucy",
						"parent": ""
					},
					"BB-08": {
						"category": "parish",
						"code": "BB-08",
						"name": "Saint Michael",
						"parent": ""
					},
					"BB-09": {
						"category": "parish",
						"code": "BB-09",
						"name": "Saint Peter",
						"parent": ""
					},
					"BB-10": {
						"category": "parish",
						"code": "BB-10",
						"name": "Saint Philip",
						"parent": ""
					},
					"BB-11": {
						"category": "parish",
						"code": "BB-11",
						"name": "Saint Thomas",
						"parent": ""
					}
				}
			},
			"BRN": {
				"threeLetterCode": "BRN",
				"shortName": "Brunei Darussalam",
				"shortNameUpperCase": "BRUNEI DARUSSALAM",
				"fullName": "Brunei Darussalam",
				"subdivisionLabel": "district",
				"subdivisions": {
					"BN-BE": {
						"category": "district",
						"code": "BN-BE",
						"name": "Belait",
						"parent": ""
					},
					"BN-BM": {
						"category": "district",
						"code": "BN-BM",
						"name": "Brunei-Muara",
						"parent": ""
					},
					"BN-TE": {
						"category": "district",
						"code": "BN-TE",
						"name": "Temburong",
						"parent": ""
					},
					"BN-TU": {
						"category": "district",
						"code": "BN-TU",
						"name": "Tutong",
						"parent": ""
					}
				}
			},
			"BTN": {
				"threeLetterCode": "BTN",
				"shortName": "Bhutan",
				"shortNameUpperCase": "BHUTAN",
				"fullName": "the Kingdom of Bhutan",
				"subdivisionLabel": "district",
				"subdivisions": {
					"BT-11": {
						"category": "district",
						"code": "BT-11",
						"name": "Paro",
						"parent": ""
					},
					"BT-12": {
						"category": "district",
						"code": "BT-12",
						"name": "Chhukha",
						"parent": ""
					},
					"BT-13": {
						"category": "district",
						"code": "BT-13",
						"name": "Haa",
						"parent": ""
					},
					"BT-14": {
						"category": "district",
						"code": "BT-14",
						"name": "Samtse",
						"parent": ""
					},
					"BT-15": {
						"category": "district",
						"code": "BT-15",
						"name": "Thimphu",
						"parent": ""
					},
					"BT-21": {
						"category": "district",
						"code": "BT-21",
						"name": "Tsirang",
						"parent": ""
					},
					"BT-22": {
						"category": "district",
						"code": "BT-22",
						"name": "Dagana",
						"parent": ""
					},
					"BT-23": {
						"category": "district",
						"code": "BT-23",
						"name": "Punakha",
						"parent": ""
					},
					"BT-24": {
						"category": "district",
						"code": "BT-24",
						"name": "Wangdue Phodrang",
						"parent": ""
					},
					"BT-31": {
						"category": "district",
						"code": "BT-31",
						"name": "Sarpang",
						"parent": ""
					},
					"BT-32": {
						"category": "district",
						"code": "BT-32",
						"name": "Trongsa",
						"parent": ""
					},
					"BT-33": {
						"category": "district",
						"code": "BT-33",
						"name": "Bumthang",
						"parent": ""
					},
					"BT-34": {
						"category": "district",
						"code": "BT-34",
						"name": "Zhemgang",
						"parent": ""
					},
					"BT-41": {
						"category": "district",
						"code": "BT-41",
						"name": "Trashigang",
						"parent": ""
					},
					"BT-42": {
						"category": "district",
						"code": "BT-42",
						"name": "Monggar",
						"parent": ""
					},
					"BT-43": {
						"category": "district",
						"code": "BT-43",
						"name": "Pemagatshel",
						"parent": ""
					},
					"BT-44": {
						"category": "district",
						"code": "BT-44",
						"name": "Lhuentse",
						"parent": ""
					},
					"BT-45": {
						"category": "district",
						"code": "BT-45",
						"name": "Samdrup Jongkhar",
						"parent": ""
					},
					"BT-GA": {
						"category": "district",
						"code": "BT-GA",
						"name": "Gasa",
						"parent": ""
					},
					"BT-TY": {
						"category": "district",
						"code": "BT-TY",
						"name": "Trashi Yangtse",
						"parent": ""
					}
				}
			},
			"BVT": {
				"threeLetterCode": "BVT",
				"shortName": "Bouvet Island",
				"shortNameUpperCase": "BOUVET ISLAND",
				"fullName": "Bouvet Island",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"BWA": {
				"threeLetterCode": "BWA",
				"shortName": "Botswana",
				"shortNameUpperCase": "BOTSWANA",
				"fullName": "the Republic of Botswana",
				"subdivisionLabel": "district",
				"subdivisions": {
					"BW-CE": {
						"category": "district",
						"code": "BW-CE",
						"name": "Central",
						"parent": ""
					},
					"BW-CH": {
						"category": "district",
						"code": "BW-CH",
						"name": "Chobe",
						"parent": ""
					},
					"BW-FR": {
						"category": "city",
						"code": "BW-FR",
						"name": "Francistown",
						"parent": ""
					},
					"BW-GA": {
						"category": "city",
						"code": "BW-GA",
						"name": "Gaborone",
						"parent": ""
					},
					"BW-GH": {
						"category": "district",
						"code": "BW-GH",
						"name": "Ghanzi",
						"parent": ""
					},
					"BW-JW": {
						"category": "town",
						"code": "BW-JW",
						"name": "Jwaneng",
						"parent": ""
					},
					"BW-KG": {
						"category": "district",
						"code": "BW-KG",
						"name": "Kgalagadi",
						"parent": ""
					},
					"BW-KL": {
						"category": "district",
						"code": "BW-KL",
						"name": "Kgatleng",
						"parent": ""
					},
					"BW-KW": {
						"category": "district",
						"code": "BW-KW",
						"name": "Kweneng",
						"parent": ""
					},
					"BW-LO": {
						"category": "town",
						"code": "BW-LO",
						"name": "Lobatse",
						"parent": ""
					},
					"BW-NE": {
						"category": "district",
						"code": "BW-NE",
						"name": "North East",
						"parent": ""
					},
					"BW-NW": {
						"category": "district",
						"code": "BW-NW",
						"name": "North West",
						"parent": ""
					},
					"BW-SE": {
						"category": "district",
						"code": "BW-SE",
						"name": "South East",
						"parent": ""
					},
					"BW-SO": {
						"category": "district",
						"code": "BW-SO",
						"name": "Southern",
						"parent": ""
					},
					"BW-SP": {
						"category": "town",
						"code": "BW-SP",
						"name": "Selibe Phikwe",
						"parent": ""
					},
					"BW-ST": {
						"category": "town",
						"code": "BW-ST",
						"name": "Sowa Town",
						"parent": ""
					}
				}
			},
			"CAF": {
				"commonName": "Central African Republic",
				"threeLetterCode": "CAF",
				"shortName": "Central African Republic (the)",
				"shortNameUpperCase": "CENTRAL AFRICAN REPUBLIC",
				"fullName": "the Central African Republic",
				"subdivisionLabel": "prefecture",
				"subdivisions": {
					"CF-AC": {
						"category": "prefecture",
						"code": "CF-AC",
						"name": "Ouham",
						"parent": ""
					},
					"CF-BB": {
						"category": "prefecture",
						"code": "CF-BB",
						"name": "Bamingui-Bangoran",
						"parent": ""
					},
					"CF-BGF": {
						"category": "commune",
						"code": "CF-BGF",
						"name": "Bangui",
						"parent": ""
					},
					"CF-BK": {
						"category": "prefecture",
						"code": "CF-BK",
						"name": "Basse-Kotto",
						"parent": ""
					},
					"CF-HK": {
						"category": "prefecture",
						"code": "CF-HK",
						"name": "Haute-Kotto",
						"parent": ""
					},
					"CF-HM": {
						"category": "prefecture",
						"code": "CF-HM",
						"name": "Haut-Mbomou",
						"parent": ""
					},
					"CF-HS": {
						"category": "prefecture",
						"code": "CF-HS",
						"name": "Haute-Sangha / Mambéré-Kadéï",
						"parent": ""
					},
					"CF-KB": {
						"category": "economic prefecture",
						"code": "CF-KB",
						"name": "Gribingui",
						"parent": ""
					},
					"CF-KG": {
						"category": "prefecture",
						"code": "CF-KG",
						"name": "Kémo-Gribingui",
						"parent": ""
					},
					"CF-LB": {
						"category": "prefecture",
						"code": "CF-LB",
						"name": "Lobaye",
						"parent": ""
					},
					"CF-MB": {
						"category": "prefecture",
						"code": "CF-MB",
						"name": "Mbomou",
						"parent": ""
					},
					"CF-MP": {
						"category": "prefecture",
						"code": "CF-MP",
						"name": "Ombella-Mpoko",
						"parent": ""
					},
					"CF-NM": {
						"category": "prefecture",
						"code": "CF-NM",
						"name": "Nana-Mambéré",
						"parent": ""
					},
					"CF-OP": {
						"category": "prefecture",
						"code": "CF-OP",
						"name": "Ouham-Pendé",
						"parent": ""
					},
					"CF-SE": {
						"category": "economic prefecture",
						"code": "CF-SE",
						"name": "Sangha",
						"parent": ""
					},
					"CF-UK": {
						"category": "prefecture",
						"code": "CF-UK",
						"name": "Ouaka",
						"parent": ""
					},
					"CF-VK": {
						"category": "prefecture",
						"code": "CF-VK",
						"name": "Vakaga",
						"parent": ""
					}
				}
			},
			"CAN": {
				"threeLetterCode": "CAN",
				"shortName": "Canada",
				"shortNameUpperCase": "CANADA",
				"fullName": "Canada",
				"subdivisionLabel": "province",
				"subdivisions": {
					"CA-AB": {
						"category": "province",
						"code": "CA-AB",
						"name": "Alberta",
						"parent": ""
					},
					"CA-BC": {
						"category": "province",
						"code": "CA-BC",
						"name": "British Columbia",
						"parent": ""
					},
					"CA-MB": {
						"category": "province",
						"code": "CA-MB",
						"name": "Manitoba",
						"parent": ""
					},
					"CA-NB": {
						"category": "province",
						"code": "CA-NB",
						"name": "New Brunswick",
						"parent": ""
					},
					"CA-NL": {
						"category": "province",
						"code": "CA-NL",
						"name": "Newfoundland and Labrador",
						"parent": ""
					},
					"CA-NS": {
						"category": "province",
						"code": "CA-NS",
						"name": "Nova Scotia",
						"parent": ""
					},
					"CA-NT": {
						"category": "territory",
						"code": "CA-NT",
						"name": "Northwest Territories",
						"parent": ""
					},
					"CA-NU": {
						"category": "territory",
						"code": "CA-NU",
						"name": "Nunavut",
						"parent": ""
					},
					"CA-ON": {
						"category": "province",
						"code": "CA-ON",
						"name": "Ontario",
						"parent": ""
					},
					"CA-PE": {
						"category": "province",
						"code": "CA-PE",
						"name": "Prince Edward Island",
						"parent": ""
					},
					"CA-QC": {
						"category": "province",
						"code": "CA-QC",
						"name": "Quebec",
						"parent": ""
					},
					"CA-SK": {
						"category": "province",
						"code": "CA-SK",
						"name": "Saskatchewan",
						"parent": ""
					},
					"CA-YT": {
						"category": "territory",
						"code": "CA-YT",
						"name": "Yukon",
						"parent": ""
					}
				}
			},
			"CCK": {
				"commonName": "Cocos (Keeling) Islands",
				"threeLetterCode": "CCK",
				"shortName": "Cocos (Keeling) Islands (the)",
				"shortNameUpperCase": "COCOS (KEELING) ISLANDS",
				"fullName": "the Cocos (Keeling) Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"CHE": {
				"threeLetterCode": "CHE",
				"shortName": "Switzerland",
				"shortNameUpperCase": "SWITZERLAND",
				"fullName": "the Swiss Confederation",
				"subdivisionLabel": "canton",
				"subdivisions": {
					"CH-AG": {
						"category": "canton",
						"code": "CH-AG",
						"name": "Aargau",
						"parent": ""
					},
					"CH-AI": {
						"category": "canton",
						"code": "CH-AI",
						"name": "Appenzell Innerrhoden",
						"parent": ""
					},
					"CH-AR": {
						"category": "canton",
						"code": "CH-AR",
						"name": "Appenzell Ausserrhoden",
						"parent": ""
					},
					"CH-BE": {
						"category": "canton",
						"code": "CH-BE",
						"name": "Bern",
						"parent": ""
					},
					"CH-BL": {
						"category": "canton",
						"code": "CH-BL",
						"name": "Basel-Landschaft",
						"parent": ""
					},
					"CH-BS": {
						"category": "canton",
						"code": "CH-BS",
						"name": "Basel-Stadt",
						"parent": ""
					},
					"CH-FR": {
						"category": "canton",
						"code": "CH-FR",
						"name": "Freiburg",
						"parent": ""
					},
					"CH-GE": {
						"category": "canton",
						"code": "CH-GE",
						"name": "Genève",
						"parent": ""
					},
					"CH-GL": {
						"category": "canton",
						"code": "CH-GL",
						"name": "Glarus",
						"parent": ""
					},
					"CH-GR": {
						"category": "canton",
						"code": "CH-GR",
						"name": "Graubünden",
						"parent": ""
					},
					"CH-JU": {
						"category": "canton",
						"code": "CH-JU",
						"name": "Jura",
						"parent": ""
					},
					"CH-LU": {
						"category": "canton",
						"code": "CH-LU",
						"name": "Luzern",
						"parent": ""
					},
					"CH-NE": {
						"category": "canton",
						"code": "CH-NE",
						"name": "Neuchâtel",
						"parent": ""
					},
					"CH-NW": {
						"category": "canton",
						"code": "CH-NW",
						"name": "Nidwalden",
						"parent": ""
					},
					"CH-OW": {
						"category": "canton",
						"code": "CH-OW",
						"name": "Obwalden",
						"parent": ""
					},
					"CH-SG": {
						"category": "canton",
						"code": "CH-SG",
						"name": "Sankt Gallen",
						"parent": ""
					},
					"CH-SH": {
						"category": "canton",
						"code": "CH-SH",
						"name": "Schaffhausen",
						"parent": ""
					},
					"CH-SO": {
						"category": "canton",
						"code": "CH-SO",
						"name": "Solothurn",
						"parent": ""
					},
					"CH-SZ": {
						"category": "canton",
						"code": "CH-SZ",
						"name": "Schwyz",
						"parent": ""
					},
					"CH-TG": {
						"category": "canton",
						"code": "CH-TG",
						"name": "Thurgau",
						"parent": ""
					},
					"CH-TI": {
						"category": "canton",
						"code": "CH-TI",
						"name": "Ticino",
						"parent": ""
					},
					"CH-UR": {
						"category": "canton",
						"code": "CH-UR",
						"name": "Uri",
						"parent": ""
					},
					"CH-VD": {
						"category": "canton",
						"code": "CH-VD",
						"name": "Vaud",
						"parent": ""
					},
					"CH-VS": {
						"category": "canton",
						"code": "CH-VS",
						"name": "Wallis",
						"parent": ""
					},
					"CH-ZG": {
						"category": "canton",
						"code": "CH-ZG",
						"name": "Zug",
						"parent": ""
					},
					"CH-ZH": {
						"category": "canton",
						"code": "CH-ZH",
						"name": "Zürich",
						"parent": ""
					}
				}
			},
			"CHL": {
				"threeLetterCode": "CHL",
				"shortName": "Chile",
				"shortNameUpperCase": "CHILE",
				"fullName": "the Republic of Chile",
				"subdivisionLabel": "region",
				"subdivisions": {
					"CL-AI": {
						"category": "region",
						"code": "CL-AI",
						"name": "Aisén del General Carlos Ibañez del Campo",
						"parent": ""
					},
					"CL-AN": {
						"category": "region",
						"code": "CL-AN",
						"name": "Antofagasta",
						"parent": ""
					},
					"CL-AP": {
						"category": "region",
						"code": "CL-AP",
						"name": "Arica y Parinacota",
						"parent": ""
					},
					"CL-AR": {
						"category": "region",
						"code": "CL-AR",
						"name": "La Araucanía",
						"parent": ""
					},
					"CL-AT": {
						"category": "region",
						"code": "CL-AT",
						"name": "Atacama",
						"parent": ""
					},
					"CL-BI": {
						"category": "region",
						"code": "CL-BI",
						"name": "Biobío",
						"parent": ""
					},
					"CL-CO": {
						"category": "region",
						"code": "CL-CO",
						"name": "Coquimbo",
						"parent": ""
					},
					"CL-LI": {
						"category": "region",
						"code": "CL-LI",
						"name": "Libertador General Bernardo O'Higgins",
						"parent": ""
					},
					"CL-LL": {
						"category": "region",
						"code": "CL-LL",
						"name": "Los Lagos",
						"parent": ""
					},
					"CL-LR": {
						"category": "region",
						"code": "CL-LR",
						"name": "Los Ríos",
						"parent": ""
					},
					"CL-MA": {
						"category": "region",
						"code": "CL-MA",
						"name": "Magallanes",
						"parent": ""
					},
					"CL-ML": {
						"category": "region",
						"code": "CL-ML",
						"name": "Maule",
						"parent": ""
					},
					"CL-RM": {
						"category": "region",
						"code": "CL-RM",
						"name": "Región Metropolitana de Santiago",
						"parent": ""
					},
					"CL-TA": {
						"category": "region",
						"code": "CL-TA",
						"name": "Tarapacá",
						"parent": ""
					},
					"CL-VS": {
						"category": "region",
						"code": "CL-VS",
						"name": "Valparaíso",
						"parent": ""
					}
				}
			},
			"CHN": {
				"threeLetterCode": "CHN",
				"shortName": "China",
				"shortNameUpperCase": "CHINA",
				"fullName": "the People's Republic of China",
				"subdivisionLabel": "province",
				"subdivisions": {
					"CN-AH": {
						"category": "province",
						"code": "CN-AH",
						"name": "Anhui Sheng",
						"parent": ""
					},
					"CN-BJ": {
						"category": "municipality",
						"code": "CN-BJ",
						"name": "Beijing Shi",
						"parent": ""
					},
					"CN-CQ": {
						"category": "municipality",
						"code": "CN-CQ",
						"name": "Chongqing Shi",
						"parent": ""
					},
					"CN-FJ": {
						"category": "province",
						"code": "CN-FJ",
						"name": "Fujian Sheng",
						"parent": ""
					},
					"CN-GD": {
						"category": "province",
						"code": "CN-GD",
						"name": "Guangdong Sheng",
						"parent": ""
					},
					"CN-GS": {
						"category": "province",
						"code": "CN-GS",
						"name": "Gansu Sheng",
						"parent": ""
					},
					"CN-GX": {
						"category": "autonomous region",
						"code": "CN-GX",
						"name": "Guangxi Zhuangzu Zizhiqu",
						"parent": ""
					},
					"CN-GZ": {
						"category": "province",
						"code": "CN-GZ",
						"name": "Guizhou Sheng",
						"parent": ""
					},
					"CN-HA": {
						"category": "province",
						"code": "CN-HA",
						"name": "Henan Sheng",
						"parent": ""
					},
					"CN-HB": {
						"category": "province",
						"code": "CN-HB",
						"name": "Hubei Sheng",
						"parent": ""
					},
					"CN-HE": {
						"category": "province",
						"code": "CN-HE",
						"name": "Hebei Sheng",
						"parent": ""
					},
					"CN-HI": {
						"category": "province",
						"code": "CN-HI",
						"name": "Hainan Sheng",
						"parent": ""
					},
					"CN-HL": {
						"category": "province",
						"code": "CN-HL",
						"name": "Heilongjiang Sheng",
						"parent": ""
					},
					"CN-HN": {
						"category": "province",
						"code": "CN-HN",
						"name": "Hunan Sheng",
						"parent": ""
					},
					"CN-JL": {
						"category": "province",
						"code": "CN-JL",
						"name": "Jilin Sheng",
						"parent": ""
					},
					"CN-JS": {
						"category": "province",
						"code": "CN-JS",
						"name": "Jiangsu Sheng",
						"parent": ""
					},
					"CN-JX": {
						"category": "province",
						"code": "CN-JX",
						"name": "Jiangxi Sheng",
						"parent": ""
					},
					"CN-LN": {
						"category": "province",
						"code": "CN-LN",
						"name": "Liaoning Sheng",
						"parent": ""
					},
					"CN-NM": {
						"category": "autonomous region",
						"code": "CN-NM",
						"name": "Nei Mongol Zizhiqu",
						"parent": ""
					},
					"CN-NX": {
						"category": "autonomous region",
						"code": "CN-NX",
						"name": "Ningxia Huizi Zizhiqu",
						"parent": ""
					},
					"CN-QH": {
						"category": "province",
						"code": "CN-QH",
						"name": "Qinghai Sheng",
						"parent": ""
					},
					"CN-SC": {
						"category": "province",
						"code": "CN-SC",
						"name": "Sichuan Sheng",
						"parent": ""
					},
					"CN-SD": {
						"category": "province",
						"code": "CN-SD",
						"name": "Shandong Sheng",
						"parent": ""
					},
					"CN-SH": {
						"category": "municipality",
						"code": "CN-SH",
						"name": "Shanghai Shi",
						"parent": ""
					},
					"CN-SN": {
						"category": "province",
						"code": "CN-SN",
						"name": "Shaanxi Sheng",
						"parent": ""
					},
					"CN-SX": {
						"category": "province",
						"code": "CN-SX",
						"name": "Shanxi Sheng",
						"parent": ""
					},
					"CN-TJ": {
						"category": "municipality",
						"code": "CN-TJ",
						"name": "Tianjin Shi",
						"parent": ""
					},
					"CN-XJ": {
						"category": "autonomous region",
						"code": "CN-XJ",
						"name": "Xinjiang Uygur Zizhiqu",
						"parent": ""
					},
					"CN-XZ": {
						"category": "autonomous region",
						"code": "CN-XZ",
						"name": "Xizang Zizhiqu",
						"parent": ""
					},
					"CN-YN": {
						"category": "province",
						"code": "CN-YN",
						"name": "Yunnan Sheng",
						"parent": ""
					},
					"CN-ZJ": {
						"category": "province",
						"code": "CN-ZJ",
						"name": "Zhejiang Sheng",
						"parent": ""
					}
				}
			},
			"CIV": {
				"threeLetterCode": "CIV",
				"shortName": "Côte d'Ivoire",
				"shortNameUpperCase": "CÔTE D'IVOIRE",
				"fullName": "the Republic of Côte d'Ivoire",
				"subdivisionLabel": "district",
				"subdivisions": {
					"CI-AB": {
						"category": "autonomous district",
						"code": "CI-AB",
						"name": "Abidjan",
						"parent": ""
					},
					"CI-BS": {
						"category": "district",
						"code": "CI-BS",
						"name": "Bas-Sassandra",
						"parent": ""
					},
					"CI-CM": {
						"category": "district",
						"code": "CI-CM",
						"name": "Comoé",
						"parent": ""
					},
					"CI-DN": {
						"category": "district",
						"code": "CI-DN",
						"name": "Denguélé",
						"parent": ""
					},
					"CI-GD": {
						"category": "district",
						"code": "CI-GD",
						"name": "Gôh-Djiboua",
						"parent": ""
					},
					"CI-LC": {
						"category": "district",
						"code": "CI-LC",
						"name": "Lacs",
						"parent": ""
					},
					"CI-LG": {
						"category": "district",
						"code": "CI-LG",
						"name": "Lagunes",
						"parent": ""
					},
					"CI-MG": {
						"category": "district",
						"code": "CI-MG",
						"name": "Montagnes",
						"parent": ""
					},
					"CI-SM": {
						"category": "district",
						"code": "CI-SM",
						"name": "Sassandra-Marahoué",
						"parent": ""
					},
					"CI-SV": {
						"category": "district",
						"code": "CI-SV",
						"name": "Savanes",
						"parent": ""
					},
					"CI-VB": {
						"category": "district",
						"code": "CI-VB",
						"name": "Vallée du Bandama",
						"parent": ""
					},
					"CI-WR": {
						"category": "district",
						"code": "CI-WR",
						"name": "Woroba",
						"parent": ""
					},
					"CI-YM": {
						"category": "autonomous district",
						"code": "CI-YM",
						"name": "Yamoussoukro",
						"parent": ""
					},
					"CI-ZZ": {
						"category": "district",
						"code": "CI-ZZ",
						"name": "Zanzan",
						"parent": ""
					}
				}
			},
			"CMR": {
				"threeLetterCode": "CMR",
				"shortName": "Cameroon",
				"shortNameUpperCase": "CAMEROON",
				"fullName": "the Republic of Cameroon",
				"subdivisionLabel": "region",
				"subdivisions": {
					"CM-AD": {
						"category": "region",
						"code": "CM-AD",
						"name": "Adamaoua",
						"parent": ""
					},
					"CM-CE": {
						"category": "region",
						"code": "CM-CE",
						"name": "Centre",
						"parent": ""
					},
					"CM-EN": {
						"category": "region",
						"code": "CM-EN",
						"name": "Far North",
						"parent": ""
					},
					"CM-ES": {
						"category": "region",
						"code": "CM-ES",
						"name": "East",
						"parent": ""
					},
					"CM-LT": {
						"category": "region",
						"code": "CM-LT",
						"name": "Littoral",
						"parent": ""
					},
					"CM-NO": {
						"category": "region",
						"code": "CM-NO",
						"name": "North",
						"parent": ""
					},
					"CM-NW": {
						"category": "region",
						"code": "CM-NW",
						"name": "North-West",
						"parent": ""
					},
					"CM-OU": {
						"category": "region",
						"code": "CM-OU",
						"name": "West",
						"parent": ""
					},
					"CM-SU": {
						"category": "region",
						"code": "CM-SU",
						"name": "South",
						"parent": ""
					},
					"CM-SW": {
						"category": "region",
						"code": "CM-SW",
						"name": "South-West",
						"parent": ""
					}
				}
			},
			"COD": {
				"commonName": "Congo - Kinshasa",
				"threeLetterCode": "COD",
				"shortName": "Congo (the Democratic Republic of the)",
				"shortNameUpperCase": "CONGO, DEMOCRATIC REPUBLIC OF THE",
				"fullName": "the Democratic Republic of the Congo",
				"subdivisionLabel": "province",
				"subdivisions": {
					"CD-BC": {
						"category": "province",
						"code": "CD-BC",
						"name": "Kongo Central",
						"parent": ""
					},
					"CD-BU": {
						"category": "province",
						"code": "CD-BU",
						"name": "Bas-Uélé",
						"parent": ""
					},
					"CD-EQ": {
						"category": "province",
						"code": "CD-EQ",
						"name": "Équateur",
						"parent": ""
					},
					"CD-HK": {
						"category": "province",
						"code": "CD-HK",
						"name": "Haut-Katanga",
						"parent": ""
					},
					"CD-HL": {
						"category": "province",
						"code": "CD-HL",
						"name": "Haut-Lomami",
						"parent": ""
					},
					"CD-HU": {
						"category": "province",
						"code": "CD-HU",
						"name": "Haut-Uélé",
						"parent": ""
					},
					"CD-IT": {
						"category": "province",
						"code": "CD-IT",
						"name": "Ituri",
						"parent": ""
					},
					"CD-KC": {
						"category": "province",
						"code": "CD-KC",
						"name": "Kasaï Central",
						"parent": ""
					},
					"CD-KE": {
						"category": "province",
						"code": "CD-KE",
						"name": "Kasaï Oriental",
						"parent": ""
					},
					"CD-KG": {
						"category": "province",
						"code": "CD-KG",
						"name": "Kwango",
						"parent": ""
					},
					"CD-KL": {
						"category": "province",
						"code": "CD-KL",
						"name": "Kwilu",
						"parent": ""
					},
					"CD-KN": {
						"category": "city",
						"code": "CD-KN",
						"name": "Kinshasa",
						"parent": ""
					},
					"CD-KS": {
						"category": "province",
						"code": "CD-KS",
						"name": "Kasaï",
						"parent": ""
					},
					"CD-LO": {
						"category": "province",
						"code": "CD-LO",
						"name": "Lomami",
						"parent": ""
					},
					"CD-LU": {
						"category": "province",
						"code": "CD-LU",
						"name": "Lualaba",
						"parent": ""
					},
					"CD-MA": {
						"category": "province",
						"code": "CD-MA",
						"name": "Maniema",
						"parent": ""
					},
					"CD-MN": {
						"category": "province",
						"code": "CD-MN",
						"name": "Mai-Ndombe",
						"parent": ""
					},
					"CD-MO": {
						"category": "province",
						"code": "CD-MO",
						"name": "Mongala",
						"parent": ""
					},
					"CD-NK": {
						"category": "province",
						"code": "CD-NK",
						"name": "Nord-Kivu",
						"parent": ""
					},
					"CD-NU": {
						"category": "province",
						"code": "CD-NU",
						"name": "Nord-Ubangi",
						"parent": ""
					},
					"CD-SA": {
						"category": "province",
						"code": "CD-SA",
						"name": "Sankuru",
						"parent": ""
					},
					"CD-SK": {
						"category": "province",
						"code": "CD-SK",
						"name": "Sud-Kivu",
						"parent": ""
					},
					"CD-SU": {
						"category": "province",
						"code": "CD-SU",
						"name": "Sud-Ubangi",
						"parent": ""
					},
					"CD-TA": {
						"category": "province",
						"code": "CD-TA",
						"name": "Tanganyika",
						"parent": ""
					},
					"CD-TO": {
						"category": "province",
						"code": "CD-TO",
						"name": "Tshopo",
						"parent": ""
					},
					"CD-TU": {
						"category": "province",
						"code": "CD-TU",
						"name": "Tshuapa",
						"parent": ""
					}
				}
			},
			"COG": {
				"commonName": "Congo - Brazzaville",
				"threeLetterCode": "COG",
				"shortName": "Congo (the)",
				"shortNameUpperCase": "CONGO",
				"fullName": "the Republic of the Congo",
				"subdivisionLabel": "department",
				"subdivisions": {
					"CG-11": {
						"category": "department",
						"code": "CG-11",
						"name": "Bouenza",
						"parent": ""
					},
					"CG-12": {
						"category": "department",
						"code": "CG-12",
						"name": "Pool",
						"parent": ""
					},
					"CG-13": {
						"category": "department",
						"code": "CG-13",
						"name": "Sangha",
						"parent": ""
					},
					"CG-14": {
						"category": "department",
						"code": "CG-14",
						"name": "Plateaux",
						"parent": ""
					},
					"CG-15": {
						"category": "department",
						"code": "CG-15",
						"name": "Cuvette-Ouest",
						"parent": ""
					},
					"CG-16": {
						"category": "department",
						"code": "CG-16",
						"name": "Pointe-Noire",
						"parent": ""
					},
					"CG-2": {
						"category": "department",
						"code": "CG-2",
						"name": "Lékoumou",
						"parent": ""
					},
					"CG-5": {
						"category": "department",
						"code": "CG-5",
						"name": "Kouilou",
						"parent": ""
					},
					"CG-7": {
						"category": "department",
						"code": "CG-7",
						"name": "Likouala",
						"parent": ""
					},
					"CG-8": {
						"category": "department",
						"code": "CG-8",
						"name": "Cuvette",
						"parent": ""
					},
					"CG-9": {
						"category": "department",
						"code": "CG-9",
						"name": "Niari",
						"parent": ""
					},
					"CG-BZV": {
						"category": "department",
						"code": "CG-BZV",
						"name": "Brazzaville",
						"parent": ""
					}
				}
			},
			"COK": {
				"commonName": "Cook Islands",
				"threeLetterCode": "COK",
				"shortName": "Cook Islands (the)",
				"shortNameUpperCase": "COOK ISLANDS",
				"fullName": "the Cook Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"COL": {
				"threeLetterCode": "COL",
				"shortName": "Colombia",
				"shortNameUpperCase": "COLOMBIA",
				"fullName": "the Republic of Colombia",
				"subdivisionLabel": "department",
				"subdivisions": {
					"CO-AMA": {
						"category": "department",
						"code": "CO-AMA",
						"name": "Amazonas",
						"parent": ""
					},
					"CO-ANT": {
						"category": "department",
						"code": "CO-ANT",
						"name": "Antioquia",
						"parent": ""
					},
					"CO-ARA": {
						"category": "department",
						"code": "CO-ARA",
						"name": "Arauca",
						"parent": ""
					},
					"CO-ATL": {
						"category": "department",
						"code": "CO-ATL",
						"name": "Atlántico",
						"parent": ""
					},
					"CO-BOL": {
						"category": "department",
						"code": "CO-BOL",
						"name": "Bolívar",
						"parent": ""
					},
					"CO-BOY": {
						"category": "department",
						"code": "CO-BOY",
						"name": "Boyacá",
						"parent": ""
					},
					"CO-CAL": {
						"category": "department",
						"code": "CO-CAL",
						"name": "Caldas",
						"parent": ""
					},
					"CO-CAQ": {
						"category": "department",
						"code": "CO-CAQ",
						"name": "Caquetá",
						"parent": ""
					},
					"CO-CAS": {
						"category": "department",
						"code": "CO-CAS",
						"name": "Casanare",
						"parent": ""
					},
					"CO-CAU": {
						"category": "department",
						"code": "CO-CAU",
						"name": "Cauca",
						"parent": ""
					},
					"CO-CES": {
						"category": "department",
						"code": "CO-CES",
						"name": "Cesar",
						"parent": ""
					},
					"CO-CHO": {
						"category": "department",
						"code": "CO-CHO",
						"name": "Chocó",
						"parent": ""
					},
					"CO-COR": {
						"category": "department",
						"code": "CO-COR",
						"name": "Córdoba",
						"parent": ""
					},
					"CO-CUN": {
						"category": "department",
						"code": "CO-CUN",
						"name": "Cundinamarca",
						"parent": ""
					},
					"CO-DC": {
						"category": "capital district",
						"code": "CO-DC",
						"name": "Distrito Capital de Bogotá",
						"parent": ""
					},
					"CO-GUA": {
						"category": "department",
						"code": "CO-GUA",
						"name": "Guainía",
						"parent": ""
					},
					"CO-GUV": {
						"category": "department",
						"code": "CO-GUV",
						"name": "Guaviare",
						"parent": ""
					},
					"CO-HUI": {
						"category": "department",
						"code": "CO-HUI",
						"name": "Huila",
						"parent": ""
					},
					"CO-LAG": {
						"category": "department",
						"code": "CO-LAG",
						"name": "La Guajira",
						"parent": ""
					},
					"CO-MAG": {
						"category": "department",
						"code": "CO-MAG",
						"name": "Magdalena",
						"parent": ""
					},
					"CO-MET": {
						"category": "department",
						"code": "CO-MET",
						"name": "Meta",
						"parent": ""
					},
					"CO-NAR": {
						"category": "department",
						"code": "CO-NAR",
						"name": "Nariño",
						"parent": ""
					},
					"CO-NSA": {
						"category": "department",
						"code": "CO-NSA",
						"name": "Norte de Santander",
						"parent": ""
					},
					"CO-PUT": {
						"category": "department",
						"code": "CO-PUT",
						"name": "Putumayo",
						"parent": ""
					},
					"CO-QUI": {
						"category": "department",
						"code": "CO-QUI",
						"name": "Quindío",
						"parent": ""
					},
					"CO-RIS": {
						"category": "department",
						"code": "CO-RIS",
						"name": "Risaralda",
						"parent": ""
					},
					"CO-SAN": {
						"category": "department",
						"code": "CO-SAN",
						"name": "Santander",
						"parent": ""
					},
					"CO-SAP": {
						"category": "department",
						"code": "CO-SAP",
						"name": "San Andrés, Providencia y Santa Catalina",
						"parent": ""
					},
					"CO-SUC": {
						"category": "department",
						"code": "CO-SUC",
						"name": "Sucre",
						"parent": ""
					},
					"CO-TOL": {
						"category": "department",
						"code": "CO-TOL",
						"name": "Tolima",
						"parent": ""
					},
					"CO-VAC": {
						"category": "department",
						"code": "CO-VAC",
						"name": "Valle del Cauca",
						"parent": ""
					},
					"CO-VAU": {
						"category": "department",
						"code": "CO-VAU",
						"name": "Vaupés",
						"parent": ""
					},
					"CO-VID": {
						"category": "department",
						"code": "CO-VID",
						"name": "Vichada",
						"parent": ""
					}
				}
			},
			"COM": {
				"commonName": "Comoros",
				"threeLetterCode": "COM",
				"shortName": "Comoros (the)",
				"shortNameUpperCase": "COMOROS",
				"fullName": "the Union of the Comoros",
				"subdivisionLabel": "island",
				"subdivisions": {
					"KM-A": {
						"category": "island",
						"code": "KM-A",
						"name": "Ndzuwani",
						"parent": ""
					},
					"KM-G": {
						"category": "island",
						"code": "KM-G",
						"name": "Ngazidja",
						"parent": ""
					},
					"KM-M": {
						"category": "island",
						"code": "KM-M",
						"name": "Mwali",
						"parent": ""
					}
				}
			},
			"CPV": {
				"threeLetterCode": "CPV",
				"shortName": "Cabo Verde",
				"shortNameUpperCase": "CABO VERDE",
				"fullName": "the Republic of Cabo Verde",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"CV-B": {
						"category": "geographical region",
						"code": "CV-B",
						"name": "Ilhas de Barlavento",
						"parent": ""
					},
					"CV-BR": {
						"category": "municipality",
						"code": "CV-BR",
						"name": "Brava",
						"parent": "CV-S"
					},
					"CV-BV": {
						"category": "municipality",
						"code": "CV-BV",
						"name": "Boa Vista",
						"parent": "CV-B"
					},
					"CV-CA": {
						"category": "municipality",
						"code": "CV-CA",
						"name": "Santa Catarina",
						"parent": "CV-S"
					},
					"CV-CF": {
						"category": "municipality",
						"code": "CV-CF",
						"name": "Santa Catarina do Fogo",
						"parent": "CV-S"
					},
					"CV-CR": {
						"category": "municipality",
						"code": "CV-CR",
						"name": "Santa Cruz",
						"parent": "CV-S"
					},
					"CV-MA": {
						"category": "municipality",
						"code": "CV-MA",
						"name": "Maio",
						"parent": "CV-S"
					},
					"CV-MO": {
						"category": "municipality",
						"code": "CV-MO",
						"name": "Mosteiros",
						"parent": "CV-S"
					},
					"CV-PA": {
						"category": "municipality",
						"code": "CV-PA",
						"name": "Paul",
						"parent": "CV-B"
					},
					"CV-PN": {
						"category": "municipality",
						"code": "CV-PN",
						"name": "Porto Novo",
						"parent": "CV-B"
					},
					"CV-PR": {
						"category": "municipality",
						"code": "CV-PR",
						"name": "Praia",
						"parent": "CV-S"
					},
					"CV-RB": {
						"category": "municipality",
						"code": "CV-RB",
						"name": "Ribeira Brava",
						"parent": "CV-B"
					},
					"CV-RG": {
						"category": "municipality",
						"code": "CV-RG",
						"name": "Ribeira Grande",
						"parent": "CV-B"
					},
					"CV-RS": {
						"category": "municipality",
						"code": "CV-RS",
						"name": "Ribeira Grande de Santiago",
						"parent": "CV-S"
					},
					"CV-S": {
						"category": "geographical region",
						"code": "CV-S",
						"name": "Ilhas de Sotavento",
						"parent": ""
					},
					"CV-SD": {
						"category": "municipality",
						"code": "CV-SD",
						"name": "São Domingos",
						"parent": "CV-S"
					},
					"CV-SF": {
						"category": "municipality",
						"code": "CV-SF",
						"name": "São Filipe",
						"parent": "CV-S"
					},
					"CV-SL": {
						"category": "municipality",
						"code": "CV-SL",
						"name": "Sal",
						"parent": "CV-B"
					},
					"CV-SM": {
						"category": "municipality",
						"code": "CV-SM",
						"name": "São Miguel",
						"parent": "CV-S"
					},
					"CV-SO": {
						"category": "municipality",
						"code": "CV-SO",
						"name": "São Lourenço dos Órgãos",
						"parent": "CV-S"
					},
					"CV-SS": {
						"category": "municipality",
						"code": "CV-SS",
						"name": "São Salvador do Mundo",
						"parent": "CV-S"
					},
					"CV-SV": {
						"category": "municipality",
						"code": "CV-SV",
						"name": "São Vicente",
						"parent": "CV-B"
					},
					"CV-TA": {
						"category": "municipality",
						"code": "CV-TA",
						"name": "Tarrafal",
						"parent": "CV-S"
					},
					"CV-TS": {
						"category": "municipality",
						"code": "CV-TS",
						"name": "Tarrafal de São Nicolau",
						"parent": "CV-B"
					}
				}
			},
			"CRI": {
				"threeLetterCode": "CRI",
				"shortName": "Costa Rica",
				"shortNameUpperCase": "COSTA RICA",
				"fullName": "the Republic of Costa Rica",
				"subdivisionLabel": "province",
				"subdivisions": {
					"CR-A": {
						"category": "province",
						"code": "CR-A",
						"name": "Alajuela",
						"parent": ""
					},
					"CR-C": {
						"category": "province",
						"code": "CR-C",
						"name": "Cartago",
						"parent": ""
					},
					"CR-G": {
						"category": "province",
						"code": "CR-G",
						"name": "Guanacaste",
						"parent": ""
					},
					"CR-H": {
						"category": "province",
						"code": "CR-H",
						"name": "Heredia",
						"parent": ""
					},
					"CR-L": {
						"category": "province",
						"code": "CR-L",
						"name": "Limón",
						"parent": ""
					},
					"CR-P": {
						"category": "province",
						"code": "CR-P",
						"name": "Puntarenas",
						"parent": ""
					},
					"CR-SJ": {
						"category": "province",
						"code": "CR-SJ",
						"name": "San José",
						"parent": ""
					}
				}
			},
			"CUB": {
				"threeLetterCode": "CUB",
				"shortName": "Cuba",
				"shortNameUpperCase": "CUBA",
				"fullName": "the Republic of Cuba",
				"subdivisionLabel": "province",
				"subdivisions": {
					"CU-01": {
						"category": "province",
						"code": "CU-01",
						"name": "Pinar del Río",
						"parent": ""
					},
					"CU-03": {
						"category": "province",
						"code": "CU-03",
						"name": "La Habana",
						"parent": ""
					},
					"CU-04": {
						"category": "province",
						"code": "CU-04",
						"name": "Matanzas",
						"parent": ""
					},
					"CU-05": {
						"category": "province",
						"code": "CU-05",
						"name": "Villa Clara",
						"parent": ""
					},
					"CU-06": {
						"category": "province",
						"code": "CU-06",
						"name": "Cienfuegos",
						"parent": ""
					},
					"CU-07": {
						"category": "province",
						"code": "CU-07",
						"name": "Sancti Spíritus",
						"parent": ""
					},
					"CU-08": {
						"category": "province",
						"code": "CU-08",
						"name": "Ciego de Ávila",
						"parent": ""
					},
					"CU-09": {
						"category": "province",
						"code": "CU-09",
						"name": "Camagüey",
						"parent": ""
					},
					"CU-10": {
						"category": "province",
						"code": "CU-10",
						"name": "Las Tunas",
						"parent": ""
					},
					"CU-11": {
						"category": "province",
						"code": "CU-11",
						"name": "Holguín",
						"parent": ""
					},
					"CU-12": {
						"category": "province",
						"code": "CU-12",
						"name": "Granma",
						"parent": ""
					},
					"CU-13": {
						"category": "province",
						"code": "CU-13",
						"name": "Santiago de Cuba",
						"parent": ""
					},
					"CU-14": {
						"category": "province",
						"code": "CU-14",
						"name": "Guantánamo",
						"parent": ""
					},
					"CU-15": {
						"category": "province",
						"code": "CU-15",
						"name": "Artemisa",
						"parent": ""
					},
					"CU-16": {
						"category": "province",
						"code": "CU-16",
						"name": "Mayabeque",
						"parent": ""
					},
					"CU-99": {
						"category": "special municipality",
						"code": "CU-99",
						"name": "Isla de la Juventud",
						"parent": ""
					}
				}
			},
			"CUW": {
				"threeLetterCode": "CUW",
				"shortName": "Curaçao",
				"shortNameUpperCase": "CURAÇAO",
				"fullName": "Curaçao",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"CXR": {
				"threeLetterCode": "CXR",
				"shortName": "Christmas Island",
				"shortNameUpperCase": "CHRISTMAS ISLAND",
				"fullName": "Christmas Island",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"CYM": {
				"commonName": "Cayman Islands",
				"threeLetterCode": "CYM",
				"shortName": "Cayman Islands (the)",
				"shortNameUpperCase": "CAYMAN ISLANDS",
				"fullName": "the Cayman Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"CYP": {
				"threeLetterCode": "CYP",
				"shortName": "Cyprus",
				"shortNameUpperCase": "CYPRUS",
				"fullName": "the Republic of Cyprus",
				"subdivisionLabel": "district",
				"subdivisions": {
					"CY-01": {
						"category": "district",
						"code": "CY-01",
						"name": "Lefkosia",
						"parent": ""
					},
					"CY-02": {
						"category": "district",
						"code": "CY-02",
						"name": "Lemesos",
						"parent": ""
					},
					"CY-03": {
						"category": "district",
						"code": "CY-03",
						"name": "Larnaka",
						"parent": ""
					},
					"CY-04": {
						"category": "district",
						"code": "CY-04",
						"name": "Ammochostos",
						"parent": ""
					},
					"CY-05": {
						"category": "district",
						"code": "CY-05",
						"name": "Pafos",
						"parent": ""
					},
					"CY-06": {
						"category": "district",
						"code": "CY-06",
						"name": "Keryneia",
						"parent": ""
					}
				}
			},
			"CZE": {
				"threeLetterCode": "CZE",
				"shortName": "Czechia",
				"shortNameUpperCase": "CZECHIA",
				"fullName": "the Czech Republic",
				"subdivisionLabel": "district",
				"subdivisions": {
					"CZ-10": {
						"category": "capital city",
						"code": "CZ-10",
						"name": "Praha, Hlavní mešto",
						"parent": ""
					},
					"CZ-101": {
						"category": "district",
						"code": "CZ-101",
						"name": "Praha 1",
						"parent": "CZ-10"
					},
					"CZ-102": {
						"category": "district",
						"code": "CZ-102",
						"name": "Praha 2",
						"parent": "CZ-10"
					},
					"CZ-103": {
						"category": "district",
						"code": "CZ-103",
						"name": "Praha 3",
						"parent": "CZ-10"
					},
					"CZ-104": {
						"category": "district",
						"code": "CZ-104",
						"name": "Praha 4",
						"parent": "CZ-10"
					},
					"CZ-105": {
						"category": "district",
						"code": "CZ-105",
						"name": "Praha 5",
						"parent": "CZ-10"
					},
					"CZ-106": {
						"category": "district",
						"code": "CZ-106",
						"name": "Praha 6",
						"parent": "CZ-10"
					},
					"CZ-107": {
						"category": "district",
						"code": "CZ-107",
						"name": "Praha 7",
						"parent": "CZ-10"
					},
					"CZ-108": {
						"category": "district",
						"code": "CZ-108",
						"name": "Praha 8",
						"parent": "CZ-10"
					},
					"CZ-109": {
						"category": "district",
						"code": "CZ-109",
						"name": "Praha 9",
						"parent": "CZ-10"
					},
					"CZ-110": {
						"category": "district",
						"code": "CZ-110",
						"name": "Praha 10",
						"parent": "CZ-10"
					},
					"CZ-111": {
						"category": "district",
						"code": "CZ-111",
						"name": "Praha 11",
						"parent": "CZ-10"
					},
					"CZ-112": {
						"category": "district",
						"code": "CZ-112",
						"name": "Praha 12",
						"parent": "CZ-10"
					},
					"CZ-113": {
						"category": "district",
						"code": "CZ-113",
						"name": "Praha 13",
						"parent": "CZ-10"
					},
					"CZ-114": {
						"category": "district",
						"code": "CZ-114",
						"name": "Praha 14",
						"parent": "CZ-10"
					},
					"CZ-115": {
						"category": "district",
						"code": "CZ-115",
						"name": "Praha 15",
						"parent": "CZ-10"
					},
					"CZ-116": {
						"category": "district",
						"code": "CZ-116",
						"name": "Praha 16",
						"parent": "CZ-10"
					},
					"CZ-117": {
						"category": "district",
						"code": "CZ-117",
						"name": "Praha 17",
						"parent": "CZ-10"
					},
					"CZ-118": {
						"category": "district",
						"code": "CZ-118",
						"name": "Praha 18",
						"parent": "CZ-10"
					},
					"CZ-119": {
						"category": "district",
						"code": "CZ-119",
						"name": "Praha 19",
						"parent": "CZ-10"
					},
					"CZ-120": {
						"category": "district",
						"code": "CZ-120",
						"name": "Praha 20",
						"parent": "CZ-10"
					},
					"CZ-121": {
						"category": "district",
						"code": "CZ-121",
						"name": "Praha 21",
						"parent": "CZ-10"
					},
					"CZ-122": {
						"category": "district",
						"code": "CZ-122",
						"name": "Praha 22",
						"parent": "CZ-10"
					},
					"CZ-20": {
						"category": "region",
						"code": "CZ-20",
						"name": "Středočeský kraj",
						"parent": ""
					},
					"CZ-201": {
						"category": "district",
						"code": "CZ-201",
						"name": "Benešov",
						"parent": "CZ-20"
					},
					"CZ-202": {
						"category": "district",
						"code": "CZ-202",
						"name": "Beroun",
						"parent": "CZ-20"
					},
					"CZ-203": {
						"category": "district",
						"code": "CZ-203",
						"name": "Kladno",
						"parent": "CZ-20"
					},
					"CZ-204": {
						"category": "district",
						"code": "CZ-204",
						"name": "Kolín",
						"parent": "CZ-20"
					},
					"CZ-205": {
						"category": "district",
						"code": "CZ-205",
						"name": "Kutná Hora",
						"parent": "CZ-20"
					},
					"CZ-206": {
						"category": "district",
						"code": "CZ-206",
						"name": "Mělník",
						"parent": "CZ-20"
					},
					"CZ-207": {
						"category": "district",
						"code": "CZ-207",
						"name": "Mladá Boleslav",
						"parent": "CZ-20"
					},
					"CZ-208": {
						"category": "district",
						"code": "CZ-208",
						"name": "Nymburk",
						"parent": "CZ-20"
					},
					"CZ-209": {
						"category": "district",
						"code": "CZ-209",
						"name": "Praha-východ",
						"parent": "CZ-20"
					},
					"CZ-20A": {
						"category": "district",
						"code": "CZ-20A",
						"name": "Praha-západ",
						"parent": "CZ-20"
					},
					"CZ-20B": {
						"category": "district",
						"code": "CZ-20B",
						"name": "Příbram",
						"parent": "CZ-20"
					},
					"CZ-20C": {
						"category": "district",
						"code": "CZ-20C",
						"name": "Rakovník",
						"parent": "CZ-20"
					},
					"CZ-31": {
						"category": "region",
						"code": "CZ-31",
						"name": "Jihočeský kraj",
						"parent": ""
					},
					"CZ-311": {
						"category": "district",
						"code": "CZ-311",
						"name": "České Budějovice",
						"parent": "CZ-31"
					},
					"CZ-312": {
						"category": "district",
						"code": "CZ-312",
						"name": "Český Krumlov",
						"parent": "CZ-31"
					},
					"CZ-313": {
						"category": "district",
						"code": "CZ-313",
						"name": "Jindřichův Hradec",
						"parent": "CZ-31"
					},
					"CZ-314": {
						"category": "district",
						"code": "CZ-314",
						"name": "Písek",
						"parent": "CZ-31"
					},
					"CZ-315": {
						"category": "district",
						"code": "CZ-315",
						"name": "Prachatice",
						"parent": "CZ-31"
					},
					"CZ-316": {
						"category": "district",
						"code": "CZ-316",
						"name": "Strakonice",
						"parent": "CZ-31"
					},
					"CZ-317": {
						"category": "district",
						"code": "CZ-317",
						"name": "Tábor",
						"parent": "CZ-31"
					},
					"CZ-32": {
						"category": "region",
						"code": "CZ-32",
						"name": "Plzeňský kraj",
						"parent": ""
					},
					"CZ-321": {
						"category": "district",
						"code": "CZ-321",
						"name": "Domažlice",
						"parent": "CZ-32"
					},
					"CZ-322": {
						"category": "district",
						"code": "CZ-322",
						"name": "Klatovy",
						"parent": "CZ-32"
					},
					"CZ-323": {
						"category": "district",
						"code": "CZ-323",
						"name": "Plzeň-město",
						"parent": "CZ-32"
					},
					"CZ-324": {
						"category": "district",
						"code": "CZ-324",
						"name": "Plzeň-jih",
						"parent": "CZ-32"
					},
					"CZ-325": {
						"category": "district",
						"code": "CZ-325",
						"name": "Plzeň-sever",
						"parent": "CZ-32"
					},
					"CZ-326": {
						"category": "district",
						"code": "CZ-326",
						"name": "Rokycany",
						"parent": "CZ-32"
					},
					"CZ-327": {
						"category": "district",
						"code": "CZ-327",
						"name": "Tachov",
						"parent": "CZ-32"
					},
					"CZ-41": {
						"category": "region",
						"code": "CZ-41",
						"name": "Karlovarský kraj",
						"parent": ""
					},
					"CZ-411": {
						"category": "district",
						"code": "CZ-411",
						"name": "Cheb",
						"parent": "CZ-41"
					},
					"CZ-412": {
						"category": "district",
						"code": "CZ-412",
						"name": "Karlovy Vary",
						"parent": "CZ-41"
					},
					"CZ-413": {
						"category": "district",
						"code": "CZ-413",
						"name": "Sokolov",
						"parent": "CZ-41"
					},
					"CZ-42": {
						"category": "region",
						"code": "CZ-42",
						"name": "Ústecký kraj",
						"parent": ""
					},
					"CZ-421": {
						"category": "district",
						"code": "CZ-421",
						"name": "Děčín",
						"parent": "CZ-42"
					},
					"CZ-422": {
						"category": "district",
						"code": "CZ-422",
						"name": "Chomutov",
						"parent": "CZ-42"
					},
					"CZ-423": {
						"category": "district",
						"code": "CZ-423",
						"name": "Litoměřice",
						"parent": "CZ-42"
					},
					"CZ-424": {
						"category": "district",
						"code": "CZ-424",
						"name": "Louny",
						"parent": "CZ-42"
					},
					"CZ-425": {
						"category": "district",
						"code": "CZ-425",
						"name": "Most",
						"parent": "CZ-42"
					},
					"CZ-426": {
						"category": "district",
						"code": "CZ-426",
						"name": "Teplice",
						"parent": "CZ-42"
					},
					"CZ-427": {
						"category": "district",
						"code": "CZ-427",
						"name": "Ústí nad Labem",
						"parent": "CZ-42"
					},
					"CZ-51": {
						"category": "region",
						"code": "CZ-51",
						"name": "Liberecký kraj",
						"parent": ""
					},
					"CZ-511": {
						"category": "district",
						"code": "CZ-511",
						"name": "Česká Lípa",
						"parent": "CZ-51"
					},
					"CZ-512": {
						"category": "district",
						"code": "CZ-512",
						"name": "Jablonec nad Nisou",
						"parent": "CZ-51"
					},
					"CZ-513": {
						"category": "district",
						"code": "CZ-513",
						"name": "Liberec",
						"parent": "CZ-51"
					},
					"CZ-514": {
						"category": "district",
						"code": "CZ-514",
						"name": "Semily",
						"parent": "CZ-51"
					},
					"CZ-52": {
						"category": "region",
						"code": "CZ-52",
						"name": "Královéhradecký kraj",
						"parent": ""
					},
					"CZ-521": {
						"category": "district",
						"code": "CZ-521",
						"name": "Hradec Králové",
						"parent": "CZ-52"
					},
					"CZ-522": {
						"category": "district",
						"code": "CZ-522",
						"name": "Jičín",
						"parent": "CZ-52"
					},
					"CZ-523": {
						"category": "district",
						"code": "CZ-523",
						"name": "Náchod",
						"parent": "CZ-52"
					},
					"CZ-524": {
						"category": "district",
						"code": "CZ-524",
						"name": "Rychnov nad Kněžnou",
						"parent": "CZ-52"
					},
					"CZ-525": {
						"category": "district",
						"code": "CZ-525",
						"name": "Trutnov",
						"parent": "CZ-52"
					},
					"CZ-53": {
						"category": "region",
						"code": "CZ-53",
						"name": "Pardubický kraj",
						"parent": ""
					},
					"CZ-531": {
						"category": "district",
						"code": "CZ-531",
						"name": "Chrudim",
						"parent": "CZ-53"
					},
					"CZ-532": {
						"category": "district",
						"code": "CZ-532",
						"name": "Pardubice",
						"parent": "CZ-53"
					},
					"CZ-533": {
						"category": "district",
						"code": "CZ-533",
						"name": "Svitavy",
						"parent": "CZ-53"
					},
					"CZ-534": {
						"category": "district",
						"code": "CZ-534",
						"name": "Ústí nad Orlicí",
						"parent": "CZ-53"
					},
					"CZ-63": {
						"category": "region",
						"code": "CZ-63",
						"name": "Kraj Vysočina",
						"parent": ""
					},
					"CZ-631": {
						"category": "district",
						"code": "CZ-631",
						"name": "Havlíčkův Brod",
						"parent": "CZ-63"
					},
					"CZ-632": {
						"category": "district",
						"code": "CZ-632",
						"name": "Jihlava",
						"parent": "CZ-63"
					},
					"CZ-633": {
						"category": "district",
						"code": "CZ-633",
						"name": "Pelhřimov",
						"parent": "CZ-63"
					},
					"CZ-634": {
						"category": "district",
						"code": "CZ-634",
						"name": "Třebíč",
						"parent": "CZ-63"
					},
					"CZ-635": {
						"category": "district",
						"code": "CZ-635",
						"name": "Žďár nad Sázavou",
						"parent": "CZ-63"
					},
					"CZ-64": {
						"category": "region",
						"code": "CZ-64",
						"name": "Jihomoravský kraj",
						"parent": ""
					},
					"CZ-641": {
						"category": "district",
						"code": "CZ-641",
						"name": "Blansko",
						"parent": "CZ-64"
					},
					"CZ-642": {
						"category": "district",
						"code": "CZ-642",
						"name": "Brno-město",
						"parent": "CZ-64"
					},
					"CZ-643": {
						"category": "district",
						"code": "CZ-643",
						"name": "Brno-venkov",
						"parent": "CZ-64"
					},
					"CZ-644": {
						"category": "district",
						"code": "CZ-644",
						"name": "Břeclav",
						"parent": "CZ-64"
					},
					"CZ-645": {
						"category": "district",
						"code": "CZ-645",
						"name": "Hodonín",
						"parent": "CZ-64"
					},
					"CZ-646": {
						"category": "district",
						"code": "CZ-646",
						"name": "Vyškov",
						"parent": "CZ-64"
					},
					"CZ-647": {
						"category": "district",
						"code": "CZ-647",
						"name": "Znojmo",
						"parent": "CZ-64"
					},
					"CZ-71": {
						"category": "region",
						"code": "CZ-71",
						"name": "Olomoucký kraj",
						"parent": ""
					},
					"CZ-711": {
						"category": "district",
						"code": "CZ-711",
						"name": "Jeseník",
						"parent": "CZ-71"
					},
					"CZ-712": {
						"category": "district",
						"code": "CZ-712",
						"name": "Olomouc",
						"parent": "CZ-71"
					},
					"CZ-713": {
						"category": "district",
						"code": "CZ-713",
						"name": "Prostějov",
						"parent": "CZ-71"
					},
					"CZ-714": {
						"category": "district",
						"code": "CZ-714",
						"name": "Přerov",
						"parent": "CZ-71"
					},
					"CZ-715": {
						"category": "district",
						"code": "CZ-715",
						"name": "Šumperk",
						"parent": "CZ-71"
					},
					"CZ-72": {
						"category": "region",
						"code": "CZ-72",
						"name": "Zlínský kraj",
						"parent": ""
					},
					"CZ-721": {
						"category": "district",
						"code": "CZ-721",
						"name": "Kroměříž",
						"parent": "CZ-72"
					},
					"CZ-722": {
						"category": "district",
						"code": "CZ-722",
						"name": "Uherské Hradiště",
						"parent": "CZ-72"
					},
					"CZ-723": {
						"category": "district",
						"code": "CZ-723",
						"name": "Vsetín",
						"parent": "CZ-72"
					},
					"CZ-724": {
						"category": "district",
						"code": "CZ-724",
						"name": "Zlín",
						"parent": "CZ-72"
					},
					"CZ-80": {
						"category": "region",
						"code": "CZ-80",
						"name": "Moravskoslezský kraj",
						"parent": ""
					},
					"CZ-801": {
						"category": "district",
						"code": "CZ-801",
						"name": "Bruntál",
						"parent": "CZ-80"
					},
					"CZ-802": {
						"category": "district",
						"code": "CZ-802",
						"name": "Frýdek Místek",
						"parent": "CZ-80"
					},
					"CZ-803": {
						"category": "district",
						"code": "CZ-803",
						"name": "Karviná",
						"parent": "CZ-80"
					},
					"CZ-804": {
						"category": "district",
						"code": "CZ-804",
						"name": "Nový Jičín",
						"parent": "CZ-80"
					},
					"CZ-805": {
						"category": "district",
						"code": "CZ-805",
						"name": "Opava",
						"parent": "CZ-80"
					},
					"CZ-806": {
						"category": "district",
						"code": "CZ-806",
						"name": "Ostrava-město",
						"parent": "CZ-80"
					}
				}
			},
			"DEU": {
				"threeLetterCode": "DEU",
				"shortName": "Germany",
				"shortNameUpperCase": "GERMANY",
				"fullName": "the Federal Republic of Germany",
				"subdivisionLabel": "Land",
				"subdivisions": {
					"DE-BB": {
						"category": "Land",
						"code": "DE-BB",
						"name": "Brandenburg",
						"parent": ""
					},
					"DE-BE": {
						"category": "Land",
						"code": "DE-BE",
						"name": "Berlin",
						"parent": ""
					},
					"DE-BW": {
						"category": "Land",
						"code": "DE-BW",
						"name": "Baden-Württemberg",
						"parent": ""
					},
					"DE-BY": {
						"category": "Land",
						"code": "DE-BY",
						"name": "Bayern",
						"parent": ""
					},
					"DE-HB": {
						"category": "Land",
						"code": "DE-HB",
						"name": "Bremen",
						"parent": ""
					},
					"DE-HE": {
						"category": "Land",
						"code": "DE-HE",
						"name": "Hessen",
						"parent": ""
					},
					"DE-HH": {
						"category": "Land",
						"code": "DE-HH",
						"name": "Hamburg",
						"parent": ""
					},
					"DE-MV": {
						"category": "Land",
						"code": "DE-MV",
						"name": "Mecklenburg-Vorpommern",
						"parent": ""
					},
					"DE-NI": {
						"category": "Land",
						"code": "DE-NI",
						"name": "Niedersachsen",
						"parent": ""
					},
					"DE-NW": {
						"category": "Land",
						"code": "DE-NW",
						"name": "Nordrhein-Westfalen",
						"parent": ""
					},
					"DE-RP": {
						"category": "Land",
						"code": "DE-RP",
						"name": "Rheinland-Pfalz",
						"parent": ""
					},
					"DE-SH": {
						"category": "Land",
						"code": "DE-SH",
						"name": "Schleswig-Holstein",
						"parent": ""
					},
					"DE-SL": {
						"category": "Land",
						"code": "DE-SL",
						"name": "Saarland",
						"parent": ""
					},
					"DE-SN": {
						"category": "Land",
						"code": "DE-SN",
						"name": "Sachsen",
						"parent": ""
					},
					"DE-ST": {
						"category": "Land",
						"code": "DE-ST",
						"name": "Sachsen-Anhalt",
						"parent": ""
					},
					"DE-TH": {
						"category": "Land",
						"code": "DE-TH",
						"name": "Thüringen",
						"parent": ""
					}
				}
			},
			"DJI": {
				"threeLetterCode": "DJI",
				"shortName": "Djibouti",
				"shortNameUpperCase": "DJIBOUTI",
				"fullName": "the Republic of Djibouti",
				"subdivisionLabel": "region",
				"subdivisions": {
					"DJ-AR": {
						"category": "region",
						"code": "DJ-AR",
						"name": "‘Artā",
						"parent": ""
					},
					"DJ-AS": {
						"category": "region",
						"code": "DJ-AS",
						"name": "‘Alī Şabīḩ",
						"parent": ""
					},
					"DJ-DI": {
						"category": "region",
						"code": "DJ-DI",
						"name": "Dikhīl",
						"parent": ""
					},
					"DJ-DJ": {
						"category": "city",
						"code": "DJ-DJ",
						"name": "Jībūtī",
						"parent": ""
					},
					"DJ-OB": {
						"category": "region",
						"code": "DJ-OB",
						"name": "Awbūk",
						"parent": ""
					},
					"DJ-TA": {
						"category": "region",
						"code": "DJ-TA",
						"name": "Tājūrah",
						"parent": ""
					}
				}
			},
			"DMA": {
				"threeLetterCode": "DMA",
				"shortName": "Dominica",
				"shortNameUpperCase": "DOMINICA",
				"fullName": "the Commonwealth of Dominica",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"DM-02": {
						"category": "parish",
						"code": "DM-02",
						"name": "Saint Andrew",
						"parent": ""
					},
					"DM-03": {
						"category": "parish",
						"code": "DM-03",
						"name": "Saint David",
						"parent": ""
					},
					"DM-04": {
						"category": "parish",
						"code": "DM-04",
						"name": "Saint George",
						"parent": ""
					},
					"DM-05": {
						"category": "parish",
						"code": "DM-05",
						"name": "Saint John",
						"parent": ""
					},
					"DM-06": {
						"category": "parish",
						"code": "DM-06",
						"name": "Saint Joseph",
						"parent": ""
					},
					"DM-07": {
						"category": "parish",
						"code": "DM-07",
						"name": "Saint Luke",
						"parent": ""
					},
					"DM-08": {
						"category": "parish",
						"code": "DM-08",
						"name": "Saint Mark",
						"parent": ""
					},
					"DM-09": {
						"category": "parish",
						"code": "DM-09",
						"name": "Saint Patrick",
						"parent": ""
					},
					"DM-10": {
						"category": "parish",
						"code": "DM-10",
						"name": "Saint Paul",
						"parent": ""
					},
					"DM-11": {
						"category": "parish",
						"code": "DM-11",
						"name": "Saint Peter",
						"parent": ""
					}
				}
			},
			"DNK": {
				"threeLetterCode": "DNK",
				"shortName": "Denmark",
				"shortNameUpperCase": "DENMARK",
				"fullName": "the Kingdom of Denmark",
				"subdivisionLabel": "region",
				"subdivisions": {
					"DK-81": {
						"category": "region",
						"code": "DK-81",
						"name": "Nordjylland",
						"parent": ""
					},
					"DK-82": {
						"category": "region",
						"code": "DK-82",
						"name": "Midtjylland",
						"parent": ""
					},
					"DK-83": {
						"category": "region",
						"code": "DK-83",
						"name": "Syddanmark",
						"parent": ""
					},
					"DK-84": {
						"category": "region",
						"code": "DK-84",
						"name": "Hovedstaden",
						"parent": ""
					},
					"DK-85": {
						"category": "region",
						"code": "DK-85",
						"name": "Sjælland",
						"parent": ""
					}
				}
			},
			"DOM": {
				"commonName": "Dominican Republic",
				"threeLetterCode": "DOM",
				"shortName": "Dominican Republic (the)",
				"shortNameUpperCase": "DOMINICAN REPUBLIC",
				"fullName": "the Dominican Republic",
				"subdivisionLabel": "province",
				"subdivisions": {
					"DO-01": {
						"category": "district",
						"code": "DO-01",
						"name": "Distrito Nacional (Santo Domingo)",
						"parent": "DO-40"
					},
					"DO-02": {
						"category": "province",
						"code": "DO-02",
						"name": "Azua",
						"parent": "DO-41"
					},
					"DO-03": {
						"category": "province",
						"code": "DO-03",
						"name": "Baoruco",
						"parent": "DO-38"
					},
					"DO-04": {
						"category": "province",
						"code": "DO-04",
						"name": "Barahona",
						"parent": "DO-38"
					},
					"DO-05": {
						"category": "province",
						"code": "DO-05",
						"name": "Dajabón",
						"parent": "DO-34"
					},
					"DO-06": {
						"category": "province",
						"code": "DO-06",
						"name": "Duarte",
						"parent": "DO-33"
					},
					"DO-07": {
						"category": "province",
						"code": "DO-07",
						"name": "Elías Piña",
						"parent": "DO-37"
					},
					"DO-08": {
						"category": "province",
						"code": "DO-08",
						"name": "El Seibo",
						"parent": "DO-42"
					},
					"DO-09": {
						"category": "province",
						"code": "DO-09",
						"name": "Espaillat",
						"parent": "DO-35"
					},
					"DO-10": {
						"category": "province",
						"code": "DO-10",
						"name": "Independencia",
						"parent": "DO-38"
					},
					"DO-11": {
						"category": "province",
						"code": "DO-11",
						"name": "La Altagracia",
						"parent": "DO-42"
					},
					"DO-12": {
						"category": "province",
						"code": "DO-12",
						"name": "La Romana",
						"parent": "DO-42"
					},
					"DO-13": {
						"category": "province",
						"code": "DO-13",
						"name": "La Vega",
						"parent": "DO-36"
					},
					"DO-14": {
						"category": "province",
						"code": "DO-14",
						"name": "María Trinidad Sánchez",
						"parent": "DO-33"
					},
					"DO-15": {
						"category": "province",
						"code": "DO-15",
						"name": "Monte Cristi",
						"parent": "DO-34"
					},
					"DO-16": {
						"category": "province",
						"code": "DO-16",
						"name": "Pedernales",
						"parent": "DO-38"
					},
					"DO-17": {
						"category": "province",
						"code": "DO-17",
						"name": "Peravia",
						"parent": "DO-41"
					},
					"DO-18": {
						"category": "province",
						"code": "DO-18",
						"name": "Puerto Plata",
						"parent": "DO-35"
					},
					"DO-19": {
						"category": "province",
						"code": "DO-19",
						"name": "Hermanas Mirabal",
						"parent": "DO-33"
					},
					"DO-20": {
						"category": "province",
						"code": "DO-20",
						"name": "Samaná",
						"parent": "DO-33"
					},
					"DO-21": {
						"category": "province",
						"code": "DO-21",
						"name": "San Cristóbal",
						"parent": "DO-41"
					},
					"DO-22": {
						"category": "province",
						"code": "DO-22",
						"name": "San Juan",
						"parent": "DO-37"
					},
					"DO-23": {
						"category": "province",
						"code": "DO-23",
						"name": "San Pedro de Macorís",
						"parent": "DO-39"
					},
					"DO-24": {
						"category": "province",
						"code": "DO-24",
						"name": "Sánchez Ramírez",
						"parent": "DO-36"
					},
					"DO-25": {
						"category": "province",
						"code": "DO-25",
						"name": "Santiago",
						"parent": "DO-35"
					},
					"DO-26": {
						"category": "province",
						"code": "DO-26",
						"name": "Santiago Rodríguez",
						"parent": "DO-34"
					},
					"DO-27": {
						"category": "province",
						"code": "DO-27",
						"name": "Valverde",
						"parent": "DO-34"
					},
					"DO-28": {
						"category": "province",
						"code": "DO-28",
						"name": "Monseñor Nouel",
						"parent": "DO-36"
					},
					"DO-29": {
						"category": "province",
						"code": "DO-29",
						"name": "Monte Plata",
						"parent": "DO-39"
					},
					"DO-30": {
						"category": "province",
						"code": "DO-30",
						"name": "Hato Mayor",
						"parent": "DO-39"
					},
					"DO-31": {
						"category": "province",
						"code": "DO-31",
						"name": "San José de Ocoa",
						"parent": "DO-41"
					},
					"DO-32": {
						"category": "province",
						"code": "DO-32",
						"name": "Santo Domingo",
						"parent": "DO-40"
					},
					"DO-33": {
						"category": "region",
						"code": "DO-33",
						"name": "Cibao Nordeste",
						"parent": ""
					},
					"DO-34": {
						"category": "region",
						"code": "DO-34",
						"name": "Cibao Noroeste",
						"parent": ""
					},
					"DO-35": {
						"category": "region",
						"code": "DO-35",
						"name": "Cibao Norte",
						"parent": ""
					},
					"DO-36": {
						"category": "region",
						"code": "DO-36",
						"name": "Cibao Sur",
						"parent": ""
					},
					"DO-37": {
						"category": "region",
						"code": "DO-37",
						"name": "El Valle",
						"parent": ""
					},
					"DO-38": {
						"category": "region",
						"code": "DO-38",
						"name": "Enriquillo",
						"parent": ""
					},
					"DO-39": {
						"category": "region",
						"code": "DO-39",
						"name": "Higuamo",
						"parent": ""
					},
					"DO-40": {
						"category": "region",
						"code": "DO-40",
						"name": "Ozama",
						"parent": ""
					},
					"DO-41": {
						"category": "region",
						"code": "DO-41",
						"name": "Valdesia",
						"parent": ""
					},
					"DO-42": {
						"category": "region",
						"code": "DO-42",
						"name": "Yuma",
						"parent": ""
					}
				}
			},
			"DZA": {
				"threeLetterCode": "DZA",
				"shortName": "Algeria",
				"shortNameUpperCase": "ALGERIA",
				"fullName": "the People's Democratic Republic of Algeria",
				"subdivisionLabel": "province",
				"subdivisions": {
					"DZ-01": {
						"category": "province",
						"code": "DZ-01",
						"name": "Adrar",
						"parent": ""
					},
					"DZ-02": {
						"category": "province",
						"code": "DZ-02",
						"name": "Chlef",
						"parent": ""
					},
					"DZ-03": {
						"category": "province",
						"code": "DZ-03",
						"name": "Laghouat",
						"parent": ""
					},
					"DZ-04": {
						"category": "province",
						"code": "DZ-04",
						"name": "Oum el Bouaghi",
						"parent": ""
					},
					"DZ-05": {
						"category": "province",
						"code": "DZ-05",
						"name": "Batna",
						"parent": ""
					},
					"DZ-06": {
						"category": "province",
						"code": "DZ-06",
						"name": "Béjaïa",
						"parent": ""
					},
					"DZ-07": {
						"category": "province",
						"code": "DZ-07",
						"name": "Biskra",
						"parent": ""
					},
					"DZ-08": {
						"category": "province",
						"code": "DZ-08",
						"name": "Béchar",
						"parent": ""
					},
					"DZ-09": {
						"category": "province",
						"code": "DZ-09",
						"name": "Blida",
						"parent": ""
					},
					"DZ-10": {
						"category": "province",
						"code": "DZ-10",
						"name": "Bouira",
						"parent": ""
					},
					"DZ-11": {
						"category": "province",
						"code": "DZ-11",
						"name": "Tamanrasset",
						"parent": ""
					},
					"DZ-12": {
						"category": "province",
						"code": "DZ-12",
						"name": "Tébessa",
						"parent": ""
					},
					"DZ-13": {
						"category": "province",
						"code": "DZ-13",
						"name": "Tlemcen",
						"parent": ""
					},
					"DZ-14": {
						"category": "province",
						"code": "DZ-14",
						"name": "Tiaret",
						"parent": ""
					},
					"DZ-15": {
						"category": "province",
						"code": "DZ-15",
						"name": "Tizi Ouzou",
						"parent": ""
					},
					"DZ-16": {
						"category": "province",
						"code": "DZ-16",
						"name": "Alger",
						"parent": ""
					},
					"DZ-17": {
						"category": "province",
						"code": "DZ-17",
						"name": "Djelfa",
						"parent": ""
					},
					"DZ-18": {
						"category": "province",
						"code": "DZ-18",
						"name": "Jijel",
						"parent": ""
					},
					"DZ-19": {
						"category": "province",
						"code": "DZ-19",
						"name": "Sétif",
						"parent": ""
					},
					"DZ-20": {
						"category": "province",
						"code": "DZ-20",
						"name": "Saïda",
						"parent": ""
					},
					"DZ-21": {
						"category": "province",
						"code": "DZ-21",
						"name": "Skikda",
						"parent": ""
					},
					"DZ-22": {
						"category": "province",
						"code": "DZ-22",
						"name": "Sidi Bel Abbès",
						"parent": ""
					},
					"DZ-23": {
						"category": "province",
						"code": "DZ-23",
						"name": "Annaba",
						"parent": ""
					},
					"DZ-24": {
						"category": "province",
						"code": "DZ-24",
						"name": "Guelma",
						"parent": ""
					},
					"DZ-25": {
						"category": "province",
						"code": "DZ-25",
						"name": "Constantine",
						"parent": ""
					},
					"DZ-26": {
						"category": "province",
						"code": "DZ-26",
						"name": "Médéa",
						"parent": ""
					},
					"DZ-27": {
						"category": "province",
						"code": "DZ-27",
						"name": "Mostaganem",
						"parent": ""
					},
					"DZ-28": {
						"category": "province",
						"code": "DZ-28",
						"name": "M'sila",
						"parent": ""
					},
					"DZ-29": {
						"category": "province",
						"code": "DZ-29",
						"name": "Mascara",
						"parent": ""
					},
					"DZ-30": {
						"category": "province",
						"code": "DZ-30",
						"name": "Ouargla",
						"parent": ""
					},
					"DZ-31": {
						"category": "province",
						"code": "DZ-31",
						"name": "Oran",
						"parent": ""
					},
					"DZ-32": {
						"category": "province",
						"code": "DZ-32",
						"name": "El Bayadh",
						"parent": ""
					},
					"DZ-33": {
						"category": "province",
						"code": "DZ-33",
						"name": "Illizi",
						"parent": ""
					},
					"DZ-34": {
						"category": "province",
						"code": "DZ-34",
						"name": "Bordj Bou Arréridj",
						"parent": ""
					},
					"DZ-35": {
						"category": "province",
						"code": "DZ-35",
						"name": "Boumerdès",
						"parent": ""
					},
					"DZ-36": {
						"category": "province",
						"code": "DZ-36",
						"name": "El Tarf",
						"parent": ""
					},
					"DZ-37": {
						"category": "province",
						"code": "DZ-37",
						"name": "Tindouf",
						"parent": ""
					},
					"DZ-38": {
						"category": "province",
						"code": "DZ-38",
						"name": "Tissemsilt",
						"parent": ""
					},
					"DZ-39": {
						"category": "province",
						"code": "DZ-39",
						"name": "El Oued",
						"parent": ""
					},
					"DZ-40": {
						"category": "province",
						"code": "DZ-40",
						"name": "Khenchela",
						"parent": ""
					},
					"DZ-41": {
						"category": "province",
						"code": "DZ-41",
						"name": "Souk Ahras",
						"parent": ""
					},
					"DZ-42": {
						"category": "province",
						"code": "DZ-42",
						"name": "Tipaza",
						"parent": ""
					},
					"DZ-43": {
						"category": "province",
						"code": "DZ-43",
						"name": "Mila",
						"parent": ""
					},
					"DZ-44": {
						"category": "province",
						"code": "DZ-44",
						"name": "Aïn Defla",
						"parent": ""
					},
					"DZ-45": {
						"category": "province",
						"code": "DZ-45",
						"name": "Naama",
						"parent": ""
					},
					"DZ-46": {
						"category": "province",
						"code": "DZ-46",
						"name": "Aïn Témouchent",
						"parent": ""
					},
					"DZ-47": {
						"category": "province",
						"code": "DZ-47",
						"name": "Ghardaïa",
						"parent": ""
					},
					"DZ-48": {
						"category": "province",
						"code": "DZ-48",
						"name": "Relizane",
						"parent": ""
					}
				}
			},
			"ECU": {
				"threeLetterCode": "ECU",
				"shortName": "Ecuador",
				"shortNameUpperCase": "ECUADOR",
				"fullName": "the Republic of Ecuador",
				"subdivisionLabel": "province",
				"subdivisions": {
					"EC-A": {
						"category": "province",
						"code": "EC-A",
						"name": "Azuay",
						"parent": ""
					},
					"EC-B": {
						"category": "province",
						"code": "EC-B",
						"name": "Bolívar",
						"parent": ""
					},
					"EC-C": {
						"category": "province",
						"code": "EC-C",
						"name": "Carchi",
						"parent": ""
					},
					"EC-D": {
						"category": "province",
						"code": "EC-D",
						"name": "Orellana",
						"parent": ""
					},
					"EC-E": {
						"category": "province",
						"code": "EC-E",
						"name": "Esmeraldas",
						"parent": ""
					},
					"EC-F": {
						"category": "province",
						"code": "EC-F",
						"name": "Cañar",
						"parent": ""
					},
					"EC-G": {
						"category": "province",
						"code": "EC-G",
						"name": "Guayas",
						"parent": ""
					},
					"EC-H": {
						"category": "province",
						"code": "EC-H",
						"name": "Chimborazo",
						"parent": ""
					},
					"EC-I": {
						"category": "province",
						"code": "EC-I",
						"name": "Imbabura",
						"parent": ""
					},
					"EC-L": {
						"category": "province",
						"code": "EC-L",
						"name": "Loja",
						"parent": ""
					},
					"EC-M": {
						"category": "province",
						"code": "EC-M",
						"name": "Manabí",
						"parent": ""
					},
					"EC-N": {
						"category": "province",
						"code": "EC-N",
						"name": "Napo",
						"parent": ""
					},
					"EC-O": {
						"category": "province",
						"code": "EC-O",
						"name": "El Oro",
						"parent": ""
					},
					"EC-P": {
						"category": "province",
						"code": "EC-P",
						"name": "Pichincha",
						"parent": ""
					},
					"EC-R": {
						"category": "province",
						"code": "EC-R",
						"name": "Los Ríos",
						"parent": ""
					},
					"EC-S": {
						"category": "province",
						"code": "EC-S",
						"name": "Morona Santiago",
						"parent": ""
					},
					"EC-SD": {
						"category": "province",
						"code": "EC-SD",
						"name": "Santo Domingo de los Tsáchilas",
						"parent": ""
					},
					"EC-SE": {
						"category": "province",
						"code": "EC-SE",
						"name": "Santa Elena",
						"parent": ""
					},
					"EC-T": {
						"category": "province",
						"code": "EC-T",
						"name": "Tungurahua",
						"parent": ""
					},
					"EC-U": {
						"category": "province",
						"code": "EC-U",
						"name": "Sucumbíos",
						"parent": ""
					},
					"EC-W": {
						"category": "province",
						"code": "EC-W",
						"name": "Galápagos",
						"parent": ""
					},
					"EC-X": {
						"category": "province",
						"code": "EC-X",
						"name": "Cotopaxi",
						"parent": ""
					},
					"EC-Y": {
						"category": "province",
						"code": "EC-Y",
						"name": "Pastaza",
						"parent": ""
					},
					"EC-Z": {
						"category": "province",
						"code": "EC-Z",
						"name": "Zamora Chinchipe",
						"parent": ""
					}
				}
			},
			"EGY": {
				"threeLetterCode": "EGY",
				"shortName": "Egypt",
				"shortNameUpperCase": "EGYPT",
				"fullName": "the Arab Republic of Egypt",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"EG-ALX": {
						"category": "governorate",
						"code": "EG-ALX",
						"name": "Al Iskandarīyah",
						"parent": ""
					},
					"EG-ASN": {
						"category": "governorate",
						"code": "EG-ASN",
						"name": "Aswān",
						"parent": ""
					},
					"EG-AST": {
						"category": "governorate",
						"code": "EG-AST",
						"name": "Asyūţ",
						"parent": ""
					},
					"EG-BA": {
						"category": "governorate",
						"code": "EG-BA",
						"name": "Al Baḩr al Aḩmar",
						"parent": ""
					},
					"EG-BH": {
						"category": "governorate",
						"code": "EG-BH",
						"name": "Al Buḩayrah",
						"parent": ""
					},
					"EG-BNS": {
						"category": "governorate",
						"code": "EG-BNS",
						"name": "Banī Suwayf",
						"parent": ""
					},
					"EG-C": {
						"category": "governorate",
						"code": "EG-C",
						"name": "Al Qāhirah",
						"parent": ""
					},
					"EG-DK": {
						"category": "governorate",
						"code": "EG-DK",
						"name": "Ad Daqahlīyah",
						"parent": ""
					},
					"EG-DT": {
						"category": "governorate",
						"code": "EG-DT",
						"name": "Dumyāţ",
						"parent": ""
					},
					"EG-FYM": {
						"category": "governorate",
						"code": "EG-FYM",
						"name": "Al Fayyūm",
						"parent": ""
					},
					"EG-GH": {
						"category": "governorate",
						"code": "EG-GH",
						"name": "Al Gharbīyah",
						"parent": ""
					},
					"EG-GZ": {
						"category": "governorate",
						"code": "EG-GZ",
						"name": "Al Jīzah",
						"parent": ""
					},
					"EG-IS": {
						"category": "governorate",
						"code": "EG-IS",
						"name": "Al Ismā'īlīyah",
						"parent": ""
					},
					"EG-JS": {
						"category": "governorate",
						"code": "EG-JS",
						"name": "Janūb Sīnā'",
						"parent": ""
					},
					"EG-KB": {
						"category": "governorate",
						"code": "EG-KB",
						"name": "Al Qalyūbīyah",
						"parent": ""
					},
					"EG-KFS": {
						"category": "governorate",
						"code": "EG-KFS",
						"name": "Kafr ash Shaykh",
						"parent": ""
					},
					"EG-KN": {
						"category": "governorate",
						"code": "EG-KN",
						"name": "Qinā",
						"parent": ""
					},
					"EG-LX": {
						"category": "governorate",
						"code": "EG-LX",
						"name": "Al Uqşur",
						"parent": ""
					},
					"EG-MN": {
						"category": "governorate",
						"code": "EG-MN",
						"name": "Al Minyā",
						"parent": ""
					},
					"EG-MNF": {
						"category": "governorate",
						"code": "EG-MNF",
						"name": "Al Minūfīyah",
						"parent": ""
					},
					"EG-MT": {
						"category": "governorate",
						"code": "EG-MT",
						"name": "Maţrūḩ",
						"parent": ""
					},
					"EG-PTS": {
						"category": "governorate",
						"code": "EG-PTS",
						"name": "Būr Sa‘īd",
						"parent": ""
					},
					"EG-SHG": {
						"category": "governorate",
						"code": "EG-SHG",
						"name": "Sūhāj",
						"parent": ""
					},
					"EG-SHR": {
						"category": "governorate",
						"code": "EG-SHR",
						"name": "Ash Sharqīyah",
						"parent": ""
					},
					"EG-SIN": {
						"category": "governorate",
						"code": "EG-SIN",
						"name": "Shamāl Sīnā'",
						"parent": ""
					},
					"EG-SUZ": {
						"category": "governorate",
						"code": "EG-SUZ",
						"name": "As Suways",
						"parent": ""
					},
					"EG-WAD": {
						"category": "governorate",
						"code": "EG-WAD",
						"name": "Al Wādī al Jadīd",
						"parent": ""
					}
				}
			},
			"ERI": {
				"threeLetterCode": "ERI",
				"shortName": "Eritrea",
				"shortNameUpperCase": "ERITREA",
				"fullName": "the State of Eritrea",
				"subdivisionLabel": "region",
				"subdivisions": {
					"ER-AN": {
						"category": "region",
						"code": "ER-AN",
						"name": "Ansabā",
						"parent": ""
					},
					"ER-DK": {
						"category": "region",
						"code": "ER-DK",
						"name": "Janūbī al Baḩrī al Aḩmar",
						"parent": ""
					},
					"ER-DU": {
						"category": "region",
						"code": "ER-DU",
						"name": "Al Janūbī",
						"parent": ""
					},
					"ER-GB": {
						"category": "region",
						"code": "ER-GB",
						"name": "Qāsh-Barkah",
						"parent": ""
					},
					"ER-MA": {
						"category": "region",
						"code": "ER-MA",
						"name": "Al Awsaţ",
						"parent": ""
					},
					"ER-SK": {
						"category": "region",
						"code": "ER-SK",
						"name": "Shimālī al Baḩrī al Aḩmar",
						"parent": ""
					}
				}
			},
			"ESH": {
				"threeLetterCode": "ESH",
				"shortName": "Western Sahara",
				"shortNameUpperCase": "WESTERN SAHARA",
				"fullName": "Western Sahara",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ESP": {
				"threeLetterCode": "ESP",
				"shortName": "Spain",
				"shortNameUpperCase": "SPAIN",
				"fullName": "the Kingdom of Spain",
				"subdivisionLabel": "province",
				"subdivisions": {
					"ES-A": {
						"category": "province",
						"code": "ES-A",
						"name": "Alacant",
						"parent": "ES-VC"
					},
					"ES-AB": {
						"category": "province",
						"code": "ES-AB",
						"name": "Albacete",
						"parent": "ES-CM"
					},
					"ES-AL": {
						"category": "province",
						"code": "ES-AL",
						"name": "Almería",
						"parent": "ES-AN"
					},
					"ES-AN": {
						"category": "autonomous community",
						"code": "ES-AN",
						"name": "Andalucía",
						"parent": ""
					},
					"ES-AR": {
						"category": "autonomous community",
						"code": "ES-AR",
						"name": "Aragón",
						"parent": ""
					},
					"ES-AS": {
						"category": "autonomous community",
						"code": "ES-AS",
						"name": "Asturias, Principado de",
						"parent": ""
					},
					"ES-AV": {
						"category": "province",
						"code": "ES-AV",
						"name": "Ávila",
						"parent": "ES-CL"
					},
					"ES-B": {
						"category": "province",
						"code": "ES-B",
						"name": "Barcelona [Barcelona]",
						"parent": "ES-CT"
					},
					"ES-BA": {
						"category": "province",
						"code": "ES-BA",
						"name": "Badajoz",
						"parent": "ES-EX"
					},
					"ES-BI": {
						"category": "province",
						"code": "ES-BI",
						"name": "Bizkaia",
						"parent": "ES-PV"
					},
					"ES-BU": {
						"category": "province",
						"code": "ES-BU",
						"name": "Burgos",
						"parent": "ES-CL"
					},
					"ES-C": {
						"category": "province",
						"code": "ES-C",
						"name": "A Coruña [La Coruña]",
						"parent": "ES-GA"
					},
					"ES-CA": {
						"category": "province",
						"code": "ES-CA",
						"name": "Cádiz",
						"parent": "ES-AN"
					},
					"ES-CB": {
						"category": "autonomous community",
						"code": "ES-CB",
						"name": "Cantabria",
						"parent": ""
					},
					"ES-CC": {
						"category": "province",
						"code": "ES-CC",
						"name": "Cáceres",
						"parent": "ES-EX"
					},
					"ES-CE": {
						"category": "autonomous city in North Africa",
						"code": "ES-CE",
						"name": "Ceuta",
						"parent": ""
					},
					"ES-CL": {
						"category": "autonomous community",
						"code": "ES-CL",
						"name": "Castilla y León",
						"parent": ""
					},
					"ES-CM": {
						"category": "autonomous community",
						"code": "ES-CM",
						"name": "Castilla-La Mancha",
						"parent": ""
					},
					"ES-CN": {
						"category": "autonomous community",
						"code": "ES-CN",
						"name": "Canarias",
						"parent": ""
					},
					"ES-CO": {
						"category": "province",
						"code": "ES-CO",
						"name": "Córdoba",
						"parent": "ES-AN"
					},
					"ES-CR": {
						"category": "province",
						"code": "ES-CR",
						"name": "Ciudad Real",
						"parent": "ES-CM"
					},
					"ES-CS": {
						"category": "province",
						"code": "ES-CS",
						"name": "Castelló",
						"parent": "ES-VC"
					},
					"ES-CT": {
						"category": "autonomous community",
						"code": "ES-CT",
						"name": "Catalunya [Cataluña]",
						"parent": ""
					},
					"ES-CU": {
						"category": "province",
						"code": "ES-CU",
						"name": "Cuenca",
						"parent": "ES-CM"
					},
					"ES-EX": {
						"category": "autonomous community",
						"code": "ES-EX",
						"name": "Extremadura",
						"parent": ""
					},
					"ES-GA": {
						"category": "autonomous community",
						"code": "ES-GA",
						"name": "Galicia [Galicia]",
						"parent": ""
					},
					"ES-GC": {
						"category": "province",
						"code": "ES-GC",
						"name": "Las Palmas",
						"parent": "ES-CN"
					},
					"ES-GI": {
						"category": "province",
						"code": "ES-GI",
						"name": "Girona [Gerona]",
						"parent": "ES-CT"
					},
					"ES-GR": {
						"category": "province",
						"code": "ES-GR",
						"name": "Granada",
						"parent": "ES-AN"
					},
					"ES-GU": {
						"category": "province",
						"code": "ES-GU",
						"name": "Guadalajara",
						"parent": "ES-CM"
					},
					"ES-H": {
						"category": "province",
						"code": "ES-H",
						"name": "Huelva",
						"parent": "ES-AN"
					},
					"ES-HU": {
						"category": "province",
						"code": "ES-HU",
						"name": "Huesca",
						"parent": "ES-AR"
					},
					"ES-IB": {
						"category": "autonomous community",
						"code": "ES-IB",
						"name": "Illes Balears [Islas Baleares]",
						"parent": ""
					},
					"ES-J": {
						"category": "province",
						"code": "ES-J",
						"name": "Jaén",
						"parent": "ES-AN"
					},
					"ES-L": {
						"category": "province",
						"code": "ES-L",
						"name": "Lleida [Lérida]",
						"parent": "ES-CT"
					},
					"ES-LE": {
						"category": "province",
						"code": "ES-LE",
						"name": "León",
						"parent": "ES-CL"
					},
					"ES-LO": {
						"category": "province",
						"code": "ES-LO",
						"name": "La Rioja",
						"parent": "ES-RI"
					},
					"ES-LU": {
						"category": "province",
						"code": "ES-LU",
						"name": "Lugo [Lugo]",
						"parent": "ES-GA"
					},
					"ES-M": {
						"category": "province",
						"code": "ES-M",
						"name": "Madrid",
						"parent": "ES-MD"
					},
					"ES-MA": {
						"category": "province",
						"code": "ES-MA",
						"name": "Málaga",
						"parent": "ES-AN"
					},
					"ES-MC": {
						"category": "autonomous community",
						"code": "ES-MC",
						"name": "Murcia, Región de",
						"parent": ""
					},
					"ES-MD": {
						"category": "autonomous community",
						"code": "ES-MD",
						"name": "Madrid, Comunidad de",
						"parent": ""
					},
					"ES-ML": {
						"category": "autonomous city in North Africa",
						"code": "ES-ML",
						"name": "Melilla",
						"parent": ""
					},
					"ES-MU": {
						"category": "province",
						"code": "ES-MU",
						"name": "Murcia",
						"parent": "ES-MC"
					},
					"ES-NA": {
						"category": "province",
						"code": "ES-NA",
						"name": "Navarra",
						"parent": "ES-NC"
					},
					"ES-NC": {
						"category": "autonomous community",
						"code": "ES-NC",
						"name": "Navarra, Comunidad Foral de",
						"parent": ""
					},
					"ES-O": {
						"category": "province",
						"code": "ES-O",
						"name": "Asturias",
						"parent": "ES-AS"
					},
					"ES-OR": {
						"category": "province",
						"code": "ES-OR",
						"name": "Ourense [Orense]",
						"parent": "ES-GA"
					},
					"ES-P": {
						"category": "province",
						"code": "ES-P",
						"name": "Palencia",
						"parent": "ES-CL"
					},
					"ES-PM": {
						"category": "province",
						"code": "ES-PM",
						"name": "Balears [Baleares]",
						"parent": "ES-IB"
					},
					"ES-PO": {
						"category": "province",
						"code": "ES-PO",
						"name": "Pontevedra [Pontevedra]",
						"parent": "ES-GA"
					},
					"ES-PV": {
						"category": "autonomous community",
						"code": "ES-PV",
						"name": "País Vasco",
						"parent": ""
					},
					"ES-RI": {
						"category": "autonomous community",
						"code": "ES-RI",
						"name": "La Rioja",
						"parent": ""
					},
					"ES-S": {
						"category": "province",
						"code": "ES-S",
						"name": "Cantabria",
						"parent": "ES-CB"
					},
					"ES-SA": {
						"category": "province",
						"code": "ES-SA",
						"name": "Salamanca",
						"parent": "ES-CL"
					},
					"ES-SE": {
						"category": "province",
						"code": "ES-SE",
						"name": "Sevilla",
						"parent": "ES-AN"
					},
					"ES-SG": {
						"category": "province",
						"code": "ES-SG",
						"name": "Segovia",
						"parent": "ES-CL"
					},
					"ES-SO": {
						"category": "province",
						"code": "ES-SO",
						"name": "Soria",
						"parent": "ES-CL"
					},
					"ES-SS": {
						"category": "province",
						"code": "ES-SS",
						"name": "Gipuzkoa",
						"parent": "ES-PV"
					},
					"ES-T": {
						"category": "province",
						"code": "ES-T",
						"name": "Tarragona [Tarragona]",
						"parent": "ES-CT"
					},
					"ES-TE": {
						"category": "province",
						"code": "ES-TE",
						"name": "Teruel",
						"parent": "ES-AR"
					},
					"ES-TF": {
						"category": "province",
						"code": "ES-TF",
						"name": "Santa Cruz de Tenerife",
						"parent": "ES-CN"
					},
					"ES-TO": {
						"category": "province",
						"code": "ES-TO",
						"name": "Toledo",
						"parent": "ES-CM"
					},
					"ES-V": {
						"category": "province",
						"code": "ES-V",
						"name": "València",
						"parent": "ES-VC"
					},
					"ES-VA": {
						"category": "province",
						"code": "ES-VA",
						"name": "Valladolid",
						"parent": "ES-CL"
					},
					"ES-VC": {
						"category": "autonomous community",
						"code": "ES-VC",
						"name": "Valenciana, Comunitat",
						"parent": ""
					},
					"ES-VI": {
						"category": "province",
						"code": "ES-VI",
						"name": "Álava",
						"parent": "ES-PV"
					},
					"ES-Z": {
						"category": "province",
						"code": "ES-Z",
						"name": "Zaragoza",
						"parent": "ES-AR"
					},
					"ES-ZA": {
						"category": "province",
						"code": "ES-ZA",
						"name": "Zamora",
						"parent": "ES-CL"
					}
				}
			},
			"EST": {
				"threeLetterCode": "EST",
				"shortName": "Estonia",
				"shortNameUpperCase": "ESTONIA",
				"fullName": "the Republic of Estonia",
				"subdivisionLabel": "county",
				"subdivisions": {
					"EE-37": {
						"category": "county",
						"code": "EE-37",
						"name": "Harjumaa",
						"parent": ""
					},
					"EE-39": {
						"category": "county",
						"code": "EE-39",
						"name": "Hiiumaa",
						"parent": ""
					},
					"EE-44": {
						"category": "county",
						"code": "EE-44",
						"name": "Ida-Virumaa",
						"parent": ""
					},
					"EE-49": {
						"category": "county",
						"code": "EE-49",
						"name": "Jõgevamaa",
						"parent": ""
					},
					"EE-51": {
						"category": "county",
						"code": "EE-51",
						"name": "Järvamaa",
						"parent": ""
					},
					"EE-57": {
						"category": "county",
						"code": "EE-57",
						"name": "Läänemaa",
						"parent": ""
					},
					"EE-59": {
						"category": "county",
						"code": "EE-59",
						"name": "Lääne-Virumaa",
						"parent": ""
					},
					"EE-65": {
						"category": "county",
						"code": "EE-65",
						"name": "Põlvamaa",
						"parent": ""
					},
					"EE-67": {
						"category": "county",
						"code": "EE-67",
						"name": "Pärnumaa",
						"parent": ""
					},
					"EE-70": {
						"category": "county",
						"code": "EE-70",
						"name": "Raplamaa",
						"parent": ""
					},
					"EE-74": {
						"category": "county",
						"code": "EE-74",
						"name": "Saaremaa",
						"parent": ""
					},
					"EE-78": {
						"category": "county",
						"code": "EE-78",
						"name": "Tartumaa",
						"parent": ""
					},
					"EE-82": {
						"category": "county",
						"code": "EE-82",
						"name": "Valgamaa",
						"parent": ""
					},
					"EE-84": {
						"category": "county",
						"code": "EE-84",
						"name": "Viljandimaa",
						"parent": ""
					},
					"EE-86": {
						"category": "county",
						"code": "EE-86",
						"name": "Võrumaa",
						"parent": ""
					}
				}
			},
			"ETH": {
				"threeLetterCode": "ETH",
				"shortName": "Ethiopia",
				"shortNameUpperCase": "ETHIOPIA",
				"fullName": "the Federal Democratic Republic of Ethiopia",
				"subdivisionLabel": "state",
				"subdivisions": {
					"ET-AA": {
						"category": "administration",
						"code": "ET-AA",
						"name": "Addis Ababa",
						"parent": ""
					},
					"ET-AF": {
						"category": "state",
						"code": "ET-AF",
						"name": "Afar",
						"parent": ""
					},
					"ET-AM": {
						"category": "state",
						"code": "ET-AM",
						"name": "Amara",
						"parent": ""
					},
					"ET-BE": {
						"category": "state",
						"code": "ET-BE",
						"name": "Benshangul-Gumaz",
						"parent": ""
					},
					"ET-DD": {
						"category": "administration",
						"code": "ET-DD",
						"name": "Dire Dawa",
						"parent": ""
					},
					"ET-GA": {
						"category": "state",
						"code": "ET-GA",
						"name": "Gambela Peoples",
						"parent": ""
					},
					"ET-HA": {
						"category": "state",
						"code": "ET-HA",
						"name": "Harari People",
						"parent": ""
					},
					"ET-OR": {
						"category": "state",
						"code": "ET-OR",
						"name": "Oromia",
						"parent": ""
					},
					"ET-SN": {
						"category": "state",
						"code": "ET-SN",
						"name": "Southern Nations, Nationalities and Peoples",
						"parent": ""
					},
					"ET-SO": {
						"category": "state",
						"code": "ET-SO",
						"name": "Somali",
						"parent": ""
					},
					"ET-TI": {
						"category": "state",
						"code": "ET-TI",
						"name": "Tigrai",
						"parent": ""
					}
				}
			},
			"FIN": {
				"threeLetterCode": "FIN",
				"shortName": "Finland",
				"shortNameUpperCase": "FINLAND",
				"fullName": "the Republic of Finland",
				"subdivisionLabel": "region",
				"subdivisions": {
					"FI-01": {
						"category": "region",
						"code": "FI-01",
						"name": "Ahvenanmaan maakunta",
						"parent": ""
					},
					"FI-02": {
						"category": "region",
						"code": "FI-02",
						"name": "Etelä-Karjala",
						"parent": ""
					},
					"FI-03": {
						"category": "region",
						"code": "FI-03",
						"name": "Etelä-Pohjanmaa",
						"parent": ""
					},
					"FI-04": {
						"category": "region",
						"code": "FI-04",
						"name": "Etelä-Savo",
						"parent": ""
					},
					"FI-05": {
						"category": "region",
						"code": "FI-05",
						"name": "Kainuu",
						"parent": ""
					},
					"FI-06": {
						"category": "region",
						"code": "FI-06",
						"name": "Kanta-Häme",
						"parent": ""
					},
					"FI-07": {
						"category": "region",
						"code": "FI-07",
						"name": "Keski-Pohjanmaa",
						"parent": ""
					},
					"FI-08": {
						"category": "region",
						"code": "FI-08",
						"name": "Keski-Suomi",
						"parent": ""
					},
					"FI-09": {
						"category": "region",
						"code": "FI-09",
						"name": "Kymenlaakso",
						"parent": ""
					},
					"FI-10": {
						"category": "region",
						"code": "FI-10",
						"name": "Lappi",
						"parent": ""
					},
					"FI-11": {
						"category": "region",
						"code": "FI-11",
						"name": "Pirkanmaa",
						"parent": ""
					},
					"FI-12": {
						"category": "region",
						"code": "FI-12",
						"name": "Pohjanmaa",
						"parent": ""
					},
					"FI-13": {
						"category": "region",
						"code": "FI-13",
						"name": "Pohjois-Karjala",
						"parent": ""
					},
					"FI-14": {
						"category": "region",
						"code": "FI-14",
						"name": "Pohjois-Pohjanmaa",
						"parent": ""
					},
					"FI-15": {
						"category": "region",
						"code": "FI-15",
						"name": "Pohjois-Savo",
						"parent": ""
					},
					"FI-16": {
						"category": "region",
						"code": "FI-16",
						"name": "Päijät-Häme",
						"parent": ""
					},
					"FI-17": {
						"category": "region",
						"code": "FI-17",
						"name": "Satakunta",
						"parent": ""
					},
					"FI-18": {
						"category": "region",
						"code": "FI-18",
						"name": "Uusimaa",
						"parent": ""
					},
					"FI-19": {
						"category": "region",
						"code": "FI-19",
						"name": "Varsinais-Suomi",
						"parent": ""
					}
				}
			},
			"FJI": {
				"threeLetterCode": "FJI",
				"shortName": "Fiji",
				"shortNameUpperCase": "FIJI",
				"fullName": "the Republic of Fiji",
				"subdivisionLabel": "province",
				"subdivisions": {
					"FJ-01": {
						"category": "province",
						"code": "FJ-01",
						"name": "Ba",
						"parent": "FJ-W"
					},
					"FJ-02": {
						"category": "province",
						"code": "FJ-02",
						"name": "Bua",
						"parent": "FJ-N"
					},
					"FJ-03": {
						"category": "province",
						"code": "FJ-03",
						"name": "Cakaudrove",
						"parent": "FJ-N"
					},
					"FJ-04": {
						"category": "province",
						"code": "FJ-04",
						"name": "Kadavu",
						"parent": "FJ-E"
					},
					"FJ-05": {
						"category": "province",
						"code": "FJ-05",
						"name": "Lau",
						"parent": "FJ-E"
					},
					"FJ-06": {
						"category": "province",
						"code": "FJ-06",
						"name": "Lomaiviti",
						"parent": "FJ-E"
					},
					"FJ-07": {
						"category": "province",
						"code": "FJ-07",
						"name": "Macuata",
						"parent": "FJ-N"
					},
					"FJ-08": {
						"category": "province",
						"code": "FJ-08",
						"name": "Nadroga and Navosa",
						"parent": "FJ-W"
					},
					"FJ-09": {
						"category": "province",
						"code": "FJ-09",
						"name": "Naitasiri",
						"parent": "FJ-C"
					},
					"FJ-10": {
						"category": "province",
						"code": "FJ-10",
						"name": "Namosi",
						"parent": "FJ-C"
					},
					"FJ-11": {
						"category": "province",
						"code": "FJ-11",
						"name": "Ra",
						"parent": "FJ-W"
					},
					"FJ-12": {
						"category": "province",
						"code": "FJ-12",
						"name": "Rewa",
						"parent": "FJ-C"
					},
					"FJ-13": {
						"category": "province",
						"code": "FJ-13",
						"name": "Serua",
						"parent": "FJ-C"
					},
					"FJ-14": {
						"category": "province",
						"code": "FJ-14",
						"name": "Tailevu",
						"parent": "FJ-C"
					},
					"FJ-C": {
						"category": "division",
						"code": "FJ-C",
						"name": "Central",
						"parent": ""
					},
					"FJ-E": {
						"category": "division",
						"code": "FJ-E",
						"name": "Eastern",
						"parent": ""
					},
					"FJ-N": {
						"category": "division",
						"code": "FJ-N",
						"name": "Northern",
						"parent": ""
					},
					"FJ-R": {
						"category": "dependency",
						"code": "FJ-R",
						"name": "Rotuma",
						"parent": ""
					},
					"FJ-W": {
						"category": "division",
						"code": "FJ-W",
						"name": "Western",
						"parent": ""
					}
				}
			},
			"FLK": {
				"commonName": "Falkland Islands",
				"threeLetterCode": "FLK",
				"shortName": "Falkland Islands (the) [Malvinas]",
				"shortNameUpperCase": "FALKLAND ISLANDS (MALVINAS)",
				"fullName": "the Falkland Islands [Malvinas]",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"FRA": {
				"threeLetterCode": "FRA",
				"shortName": "France",
				"shortNameUpperCase": "FRANCE",
				"fullName": "the French Republic",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"FR-01": {
						"category": "metropolitan department",
						"code": "FR-01",
						"name": "Ain",
						"parent": "FR-ARA"
					},
					"FR-02": {
						"category": "metropolitan department",
						"code": "FR-02",
						"name": "Aisne",
						"parent": "FR-HDF"
					},
					"FR-03": {
						"category": "metropolitan department",
						"code": "FR-03",
						"name": "Allier",
						"parent": "FR-ARA"
					},
					"FR-04": {
						"category": "metropolitan department",
						"code": "FR-04",
						"name": "Alpes-de-Haute-Provence",
						"parent": "FR-PAC"
					},
					"FR-05": {
						"category": "metropolitan department",
						"code": "FR-05",
						"name": "Hautes-Alpes",
						"parent": "FR-PAC"
					},
					"FR-06": {
						"category": "metropolitan department",
						"code": "FR-06",
						"name": "Alpes-Maritimes",
						"parent": "FR-PAC"
					},
					"FR-07": {
						"category": "metropolitan department",
						"code": "FR-07",
						"name": "Ardèche",
						"parent": "FR-ARA"
					},
					"FR-08": {
						"category": "metropolitan department",
						"code": "FR-08",
						"name": "Ardennes",
						"parent": "FR-GES"
					},
					"FR-09": {
						"category": "metropolitan department",
						"code": "FR-09",
						"name": "Ariège",
						"parent": "FR-OCC"
					},
					"FR-10": {
						"category": "metropolitan department",
						"code": "FR-10",
						"name": "Aube",
						"parent": "FR-GES"
					},
					"FR-11": {
						"category": "metropolitan department",
						"code": "FR-11",
						"name": "Aude",
						"parent": "FR-OCC"
					},
					"FR-12": {
						"category": "metropolitan department",
						"code": "FR-12",
						"name": "Aveyron",
						"parent": "FR-OCC"
					},
					"FR-13": {
						"category": "metropolitan department",
						"code": "FR-13",
						"name": "Bouches-du-Rhône",
						"parent": "FR-PAC"
					},
					"FR-14": {
						"category": "metropolitan department",
						"code": "FR-14",
						"name": "Calvados",
						"parent": "FR-NOR"
					},
					"FR-15": {
						"category": "metropolitan department",
						"code": "FR-15",
						"name": "Cantal",
						"parent": "FR-ARA"
					},
					"FR-16": {
						"category": "metropolitan department",
						"code": "FR-16",
						"name": "Charente",
						"parent": "FR-NAQ"
					},
					"FR-17": {
						"category": "metropolitan department",
						"code": "FR-17",
						"name": "Charente-Maritime",
						"parent": "FR-NAQ"
					},
					"FR-18": {
						"category": "metropolitan department",
						"code": "FR-18",
						"name": "Cher",
						"parent": "FR-CVL"
					},
					"FR-19": {
						"category": "metropolitan department",
						"code": "FR-19",
						"name": "Corrèze",
						"parent": "FR-NAQ"
					},
					"FR-21": {
						"category": "metropolitan department",
						"code": "FR-21",
						"name": "Côte-d'Or",
						"parent": "FR-BFC"
					},
					"FR-22": {
						"category": "metropolitan department",
						"code": "FR-22",
						"name": "Côtes-d'Armor",
						"parent": "FR-BRE"
					},
					"FR-23": {
						"category": "metropolitan department",
						"code": "FR-23",
						"name": "Creuse",
						"parent": "FR-NAQ"
					},
					"FR-24": {
						"category": "metropolitan department",
						"code": "FR-24",
						"name": "Dordogne",
						"parent": "FR-NAQ"
					},
					"FR-25": {
						"category": "metropolitan department",
						"code": "FR-25",
						"name": "Doubs",
						"parent": "FR-BFC"
					},
					"FR-26": {
						"category": "metropolitan department",
						"code": "FR-26",
						"name": "Drôme",
						"parent": "FR-ARA"
					},
					"FR-27": {
						"category": "metropolitan department",
						"code": "FR-27",
						"name": "Eure",
						"parent": "FR-NOR"
					},
					"FR-28": {
						"category": "metropolitan department",
						"code": "FR-28",
						"name": "Eure-et-Loir",
						"parent": "FR-CVL"
					},
					"FR-29": {
						"category": "metropolitan department",
						"code": "FR-29",
						"name": "Finistère",
						"parent": "FR-BRE"
					},
					"FR-2A": {
						"category": "metropolitan department",
						"code": "FR-2A",
						"name": "Corse-du-Sud",
						"parent": "FR-COR"
					},
					"FR-2B": {
						"category": "metropolitan department",
						"code": "FR-2B",
						"name": "Haute-Corse",
						"parent": "FR-COR"
					},
					"FR-30": {
						"category": "metropolitan department",
						"code": "FR-30",
						"name": "Gard",
						"parent": "FR-OCC"
					},
					"FR-31": {
						"category": "metropolitan department",
						"code": "FR-31",
						"name": "Haute-Garonne",
						"parent": "FR-OCC"
					},
					"FR-32": {
						"category": "metropolitan department",
						"code": "FR-32",
						"name": "Gers",
						"parent": "FR-OCC"
					},
					"FR-33": {
						"category": "metropolitan department",
						"code": "FR-33",
						"name": "Gironde",
						"parent": "FR-NAQ"
					},
					"FR-34": {
						"category": "metropolitan department",
						"code": "FR-34",
						"name": "Hérault",
						"parent": "FR-OCC"
					},
					"FR-35": {
						"category": "metropolitan department",
						"code": "FR-35",
						"name": "Ille-et-Vilaine",
						"parent": "FR-BRE"
					},
					"FR-36": {
						"category": "metropolitan department",
						"code": "FR-36",
						"name": "Indre",
						"parent": "FR-CVL"
					},
					"FR-37": {
						"category": "metropolitan department",
						"code": "FR-37",
						"name": "Indre-et-Loire",
						"parent": "FR-CVL"
					},
					"FR-38": {
						"category": "metropolitan department",
						"code": "FR-38",
						"name": "Isère",
						"parent": "FR-ARA"
					},
					"FR-39": {
						"category": "metropolitan department",
						"code": "FR-39",
						"name": "Jura",
						"parent": "FR-BFC"
					},
					"FR-40": {
						"category": "metropolitan department",
						"code": "FR-40",
						"name": "Landes",
						"parent": "FR-NAQ"
					},
					"FR-41": {
						"category": "metropolitan department",
						"code": "FR-41",
						"name": "Loir-et-Cher",
						"parent": "FR-CVL"
					},
					"FR-42": {
						"category": "metropolitan department",
						"code": "FR-42",
						"name": "Loire",
						"parent": "FR-ARA"
					},
					"FR-43": {
						"category": "metropolitan department",
						"code": "FR-43",
						"name": "Haute-Loire",
						"parent": "FR-ARA"
					},
					"FR-44": {
						"category": "metropolitan department",
						"code": "FR-44",
						"name": "Loire-Atlantique",
						"parent": "FR-PDL"
					},
					"FR-45": {
						"category": "metropolitan department",
						"code": "FR-45",
						"name": "Loiret",
						"parent": "FR-CVL"
					},
					"FR-46": {
						"category": "metropolitan department",
						"code": "FR-46",
						"name": "Lot",
						"parent": "FR-OCC"
					},
					"FR-47": {
						"category": "metropolitan department",
						"code": "FR-47",
						"name": "Lot-et-Garonne",
						"parent": "FR-NAQ"
					},
					"FR-48": {
						"category": "metropolitan department",
						"code": "FR-48",
						"name": "Lozère",
						"parent": "FR-OCC"
					},
					"FR-49": {
						"category": "metropolitan department",
						"code": "FR-49",
						"name": "Maine-et-Loire",
						"parent": "FR-PDL"
					},
					"FR-50": {
						"category": "metropolitan department",
						"code": "FR-50",
						"name": "Manche",
						"parent": "FR-NOR"
					},
					"FR-51": {
						"category": "metropolitan department",
						"code": "FR-51",
						"name": "Marne",
						"parent": "FR-GES"
					},
					"FR-52": {
						"category": "metropolitan department",
						"code": "FR-52",
						"name": "Haute-Marne",
						"parent": "FR-GES"
					},
					"FR-53": {
						"category": "metropolitan department",
						"code": "FR-53",
						"name": "Mayenne",
						"parent": "FR-PDL"
					},
					"FR-54": {
						"category": "metropolitan department",
						"code": "FR-54",
						"name": "Meurthe-et-Moselle",
						"parent": "FR-GES"
					},
					"FR-55": {
						"category": "metropolitan department",
						"code": "FR-55",
						"name": "Meuse",
						"parent": "FR-GES"
					},
					"FR-56": {
						"category": "metropolitan department",
						"code": "FR-56",
						"name": "Morbihan",
						"parent": "FR-BRE"
					},
					"FR-57": {
						"category": "metropolitan department",
						"code": "FR-57",
						"name": "Moselle",
						"parent": "FR-GES"
					},
					"FR-58": {
						"category": "metropolitan department",
						"code": "FR-58",
						"name": "Nièvre",
						"parent": "FR-BFC"
					},
					"FR-59": {
						"category": "metropolitan department",
						"code": "FR-59",
						"name": "Nord",
						"parent": "FR-HDF"
					},
					"FR-60": {
						"category": "metropolitan department",
						"code": "FR-60",
						"name": "Oise",
						"parent": "FR-HDF"
					},
					"FR-61": {
						"category": "metropolitan department",
						"code": "FR-61",
						"name": "Orne",
						"parent": "FR-NOR"
					},
					"FR-62": {
						"category": "metropolitan department",
						"code": "FR-62",
						"name": "Pas-de-Calais",
						"parent": "FR-HDF"
					},
					"FR-63": {
						"category": "metropolitan department",
						"code": "FR-63",
						"name": "Puy-de-Dôme",
						"parent": "FR-ARA"
					},
					"FR-64": {
						"category": "metropolitan department",
						"code": "FR-64",
						"name": "Pyrénées-Atlantiques",
						"parent": "FR-NAQ"
					},
					"FR-65": {
						"category": "metropolitan department",
						"code": "FR-65",
						"name": "Hautes-Pyrénées",
						"parent": "FR-OCC"
					},
					"FR-66": {
						"category": "metropolitan department",
						"code": "FR-66",
						"name": "Pyrénées-Orientales",
						"parent": "FR-OCC"
					},
					"FR-67": {
						"category": "metropolitan department",
						"code": "FR-67",
						"name": "Bas-Rhin",
						"parent": "FR-GES"
					},
					"FR-68": {
						"category": "metropolitan department",
						"code": "FR-68",
						"name": "Haut-Rhin",
						"parent": "FR-GES"
					},
					"FR-69": {
						"category": "metropolitan department",
						"code": "FR-69",
						"name": "Rhône",
						"parent": "FR-ARA"
					},
					"FR-70": {
						"category": "metropolitan department",
						"code": "FR-70",
						"name": "Haute-Saône",
						"parent": "FR-BFC"
					},
					"FR-71": {
						"category": "metropolitan department",
						"code": "FR-71",
						"name": "Saône-et-Loire",
						"parent": "FR-BFC"
					},
					"FR-72": {
						"category": "metropolitan department",
						"code": "FR-72",
						"name": "Sarthe",
						"parent": "FR-PDL"
					},
					"FR-73": {
						"category": "metropolitan department",
						"code": "FR-73",
						"name": "Savoie",
						"parent": "FR-ARA"
					},
					"FR-74": {
						"category": "metropolitan department",
						"code": "FR-74",
						"name": "Haute-Savoie",
						"parent": "FR-ARA"
					},
					"FR-75": {
						"category": "metropolitan department",
						"code": "FR-75",
						"name": "Paris",
						"parent": "FR-IDF"
					},
					"FR-76": {
						"category": "metropolitan department",
						"code": "FR-76",
						"name": "Seine-Maritime",
						"parent": "FR-NOR"
					},
					"FR-77": {
						"category": "metropolitan department",
						"code": "FR-77",
						"name": "Seine-et-Marne",
						"parent": "FR-IDF"
					},
					"FR-78": {
						"category": "metropolitan department",
						"code": "FR-78",
						"name": "Yvelines",
						"parent": "FR-IDF"
					},
					"FR-79": {
						"category": "metropolitan department",
						"code": "FR-79",
						"name": "Deux-Sèvres",
						"parent": "FR-NAQ"
					},
					"FR-80": {
						"category": "metropolitan department",
						"code": "FR-80",
						"name": "Somme",
						"parent": "FR-HDF"
					},
					"FR-81": {
						"category": "metropolitan department",
						"code": "FR-81",
						"name": "Tarn",
						"parent": "FR-OCC"
					},
					"FR-82": {
						"category": "metropolitan department",
						"code": "FR-82",
						"name": "Tarn-et-Garonne",
						"parent": "FR-OCC"
					},
					"FR-83": {
						"category": "metropolitan department",
						"code": "FR-83",
						"name": "Var",
						"parent": "FR-PAC"
					},
					"FR-84": {
						"category": "metropolitan department",
						"code": "FR-84",
						"name": "Vaucluse",
						"parent": "FR-PAC"
					},
					"FR-85": {
						"category": "metropolitan department",
						"code": "FR-85",
						"name": "Vendée",
						"parent": "FR-PDL"
					},
					"FR-86": {
						"category": "metropolitan department",
						"code": "FR-86",
						"name": "Vienne",
						"parent": "FR-NAQ"
					},
					"FR-87": {
						"category": "metropolitan department",
						"code": "FR-87",
						"name": "Haute-Vienne",
						"parent": "FR-NAQ"
					},
					"FR-88": {
						"category": "metropolitan department",
						"code": "FR-88",
						"name": "Vosges",
						"parent": "FR-GES"
					},
					"FR-89": {
						"category": "metropolitan department",
						"code": "FR-89",
						"name": "Yonne",
						"parent": "FR-BFC"
					},
					"FR-90": {
						"category": "metropolitan department",
						"code": "FR-90",
						"name": "Territoire de Belfort",
						"parent": "FR-BFC"
					},
					"FR-91": {
						"category": "metropolitan department",
						"code": "FR-91",
						"name": "Essonne",
						"parent": "FR-IDF"
					},
					"FR-92": {
						"category": "metropolitan department",
						"code": "FR-92",
						"name": "Hauts-de-Seine",
						"parent": "FR-IDF"
					},
					"FR-93": {
						"category": "metropolitan department",
						"code": "FR-93",
						"name": "Seine-Saint-Denis",
						"parent": "FR-IDF"
					},
					"FR-94": {
						"category": "metropolitan department",
						"code": "FR-94",
						"name": "Val-de-Marne",
						"parent": "FR-IDF"
					},
					"FR-95": {
						"category": "metropolitan department",
						"code": "FR-95",
						"name": "Val-d'Oise",
						"parent": "FR-IDF"
					},
					"FR-ARA": {
						"category": "metropolitan region",
						"code": "FR-ARA",
						"name": "Auvergne-Rhône-Alpes",
						"parent": ""
					},
					"FR-BFC": {
						"category": "metropolitan region",
						"code": "FR-BFC",
						"name": "Bourgogne-Franche-Comté",
						"parent": ""
					},
					"FR-BRE": {
						"category": "metropolitan region",
						"code": "FR-BRE",
						"name": "Bretagne",
						"parent": ""
					},
					"FR-COR": {
						"category": "metropolitan region",
						"code": "FR-COR",
						"name": "Corse",
						"parent": ""
					},
					"FR-CP": {
						"category": "dependency",
						"code": "FR-CP",
						"name": "Clipperton",
						"parent": ""
					},
					"FR-CVL": {
						"category": "metropolitan region",
						"code": "FR-CVL",
						"name": "Centre-Val de Loire",
						"parent": ""
					},
					"FR-GES": {
						"category": "metropolitan region",
						"code": "FR-GES",
						"name": "Grand-Est",
						"parent": ""
					},
					"FR-GUA": {
						"category": "overseas region",
						"code": "FR-GUA",
						"name": "Guadeloupe",
						"parent": ""
					},
					"FR-HDF": {
						"category": "metropolitan region",
						"code": "FR-HDF",
						"name": "Hauts-de-France",
						"parent": ""
					},
					"FR-IDF": {
						"category": "metropolitan region",
						"code": "FR-IDF",
						"name": "Île-de-France",
						"parent": ""
					},
					"FR-LRE": {
						"category": "overseas region",
						"code": "FR-LRE",
						"name": "La Réunion",
						"parent": ""
					},
					"FR-MAY": {
						"category": "overseas region",
						"code": "FR-MAY",
						"name": "Mayotte",
						"parent": ""
					},
					"FR-NAQ": {
						"category": "metropolitan region",
						"code": "FR-NAQ",
						"name": "Nouvelle-Aquitaine",
						"parent": ""
					},
					"FR-NOR": {
						"category": "metropolitan region",
						"code": "FR-NOR",
						"name": "Normandie",
						"parent": ""
					},
					"FR-OCC": {
						"category": "metropolitan region",
						"code": "FR-OCC",
						"name": "Occitanie",
						"parent": ""
					},
					"FR-PAC": {
						"category": "metropolitan region",
						"code": "FR-PAC",
						"name": "Provence-Alpes-Côte-d’Azur",
						"parent": ""
					},
					"FR-PDL": {
						"category": "metropolitan region",
						"code": "FR-PDL",
						"name": "Pays-de-la-Loire",
						"parent": ""
					}
				}
			},
			"FRO": {
				"commonName": "Faroe Islands",
				"threeLetterCode": "FRO",
				"shortName": "Faroe Islands (the)",
				"shortNameUpperCase": "FAROE ISLANDS",
				"fullName": "the Faroe Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"FSM": {
				"commonName": "Micronesia",
				"threeLetterCode": "FSM",
				"shortName": "Micronesia (Federated States of)",
				"shortNameUpperCase": "MICRONESIA (FEDERATED STATES OF)",
				"fullName": "the Federated States of Micronesia",
				"subdivisionLabel": "state",
				"subdivisions": {
					"FM-KSA": {
						"category": "state",
						"code": "FM-KSA",
						"name": "Kosrae",
						"parent": ""
					},
					"FM-PNI": {
						"category": "state",
						"code": "FM-PNI",
						"name": "Pohnpei",
						"parent": ""
					},
					"FM-TRK": {
						"category": "state",
						"code": "FM-TRK",
						"name": "Chuuk",
						"parent": ""
					},
					"FM-YAP": {
						"category": "state",
						"code": "FM-YAP",
						"name": "Yap",
						"parent": ""
					}
				}
			},
			"GAB": {
				"threeLetterCode": "GAB",
				"shortName": "Gabon",
				"shortNameUpperCase": "GABON",
				"fullName": "the Gabonese Republic",
				"subdivisionLabel": "province",
				"subdivisions": {
					"GA-1": {
						"category": "province",
						"code": "GA-1",
						"name": "Estuaire",
						"parent": ""
					},
					"GA-2": {
						"category": "province",
						"code": "GA-2",
						"name": "Haut-Ogooué",
						"parent": ""
					},
					"GA-3": {
						"category": "province",
						"code": "GA-3",
						"name": "Moyen-Ogooué",
						"parent": ""
					},
					"GA-4": {
						"category": "province",
						"code": "GA-4",
						"name": "Ngounié",
						"parent": ""
					},
					"GA-5": {
						"category": "province",
						"code": "GA-5",
						"name": "Nyanga",
						"parent": ""
					},
					"GA-6": {
						"category": "province",
						"code": "GA-6",
						"name": "Ogooué-Ivindo",
						"parent": ""
					},
					"GA-7": {
						"category": "province",
						"code": "GA-7",
						"name": "Ogooué-Lolo",
						"parent": ""
					},
					"GA-8": {
						"category": "province",
						"code": "GA-8",
						"name": "Ogooué-Maritime",
						"parent": ""
					},
					"GA-9": {
						"category": "province",
						"code": "GA-9",
						"name": "Woleu-Ntem",
						"parent": ""
					}
				}
			},
			"GBR": {
				"commonName": "United Kingdom",
				"threeLetterCode": "GBR",
				"shortName": "United Kingdom of Great Britain and Northern Ireland (the)",
				"shortNameUpperCase": "UNITED KINGDOM OF GREAT BRITAIN AND NORTHERN  IRELAND",
				"fullName": "the United Kingdom of Great Britain and Northern Ireland",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"GB-ABC": {
						"category": "district",
						"code": "GB-ABC",
						"name": "Armagh, Banbridge and Craigavon",
						"parent": "GB-NIR"
					},
					"GB-ABD": {
						"category": "council area",
						"code": "GB-ABD",
						"name": "Aberdeenshire",
						"parent": "GB-SCT"
					},
					"GB-ABE": {
						"category": "council area",
						"code": "GB-ABE",
						"name": "Aberdeen City",
						"parent": "GB-SCT"
					},
					"GB-AGB": {
						"category": "council area",
						"code": "GB-AGB",
						"name": "Argyll and Bute",
						"parent": "GB-SCT"
					},
					"GB-AGY": {
						"category": "unitary authority",
						"code": "GB-AGY",
						"name": "Isle of Anglesey [Sir Ynys Môn GB-YNM]",
						"parent": "GB-WLS"
					},
					"GB-AND": {
						"category": "district",
						"code": "GB-AND",
						"name": "Ards and North Down",
						"parent": "GB-NIR"
					},
					"GB-ANN": {
						"category": "district",
						"code": "GB-ANN",
						"name": "Antrim and Newtownabbey",
						"parent": "GB-NIR"
					},
					"GB-ANS": {
						"category": "council area",
						"code": "GB-ANS",
						"name": "Angus",
						"parent": "GB-SCT"
					},
					"GB-BAS": {
						"category": "unitary authority",
						"code": "GB-BAS",
						"name": "Bath and North East Somerset",
						"parent": "GB-ENG"
					},
					"GB-BBD": {
						"category": "unitary authority",
						"code": "GB-BBD",
						"name": "Blackburn with Darwen",
						"parent": "GB-ENG"
					},
					"GB-BDF": {
						"category": "unitary authority",
						"code": "GB-BDF",
						"name": "Bedford",
						"parent": "GB-ENG"
					},
					"GB-BDG": {
						"category": "London borough",
						"code": "GB-BDG",
						"name": "Barking and Dagenham",
						"parent": "GB-ENG"
					},
					"GB-BEN": {
						"category": "London borough",
						"code": "GB-BEN",
						"name": "Brent",
						"parent": "GB-ENG"
					},
					"GB-BEX": {
						"category": "London borough",
						"code": "GB-BEX",
						"name": "Bexley",
						"parent": "GB-ENG"
					},
					"GB-BFS": {
						"category": "district",
						"code": "GB-BFS",
						"name": "Belfast",
						"parent": "GB-NIR"
					},
					"GB-BGE": {
						"category": "unitary authority",
						"code": "GB-BGE",
						"name": "Bridgend [Pen-y-bont ar Ogwr GB-POG]",
						"parent": "GB-WLS"
					},
					"GB-BGW": {
						"category": "unitary authority",
						"code": "GB-BGW",
						"name": "Blaenau Gwent",
						"parent": "GB-WLS"
					},
					"GB-BIR": {
						"category": "metropolitan district",
						"code": "GB-BIR",
						"name": "Birmingham",
						"parent": "GB-ENG"
					},
					"GB-BKM": {
						"category": "two-tier county",
						"code": "GB-BKM",
						"name": "Buckinghamshire",
						"parent": "GB-ENG"
					},
					"GB-BMH": {
						"category": "unitary authority",
						"code": "GB-BMH",
						"name": "Bournemouth",
						"parent": "GB-ENG"
					},
					"GB-BNE": {
						"category": "London borough",
						"code": "GB-BNE",
						"name": "Barnet",
						"parent": "GB-ENG"
					},
					"GB-BNH": {
						"category": "unitary authority",
						"code": "GB-BNH",
						"name": "Brighton and Hove",
						"parent": "GB-ENG"
					},
					"GB-BNS": {
						"category": "metropolitan district",
						"code": "GB-BNS",
						"name": "Barnsley",
						"parent": "GB-ENG"
					},
					"GB-BOL": {
						"category": "metropolitan district",
						"code": "GB-BOL",
						"name": "Bolton",
						"parent": "GB-ENG"
					},
					"GB-BPL": {
						"category": "unitary authority",
						"code": "GB-BPL",
						"name": "Blackpool",
						"parent": "GB-ENG"
					},
					"GB-BRC": {
						"category": "unitary authority",
						"code": "GB-BRC",
						"name": "Bracknell Forest",
						"parent": "GB-ENG"
					},
					"GB-BRD": {
						"category": "metropolitan district",
						"code": "GB-BRD",
						"name": "Bradford",
						"parent": "GB-ENG"
					},
					"GB-BRY": {
						"category": "London borough",
						"code": "GB-BRY",
						"name": "Bromley",
						"parent": "GB-ENG"
					},
					"GB-BST": {
						"category": "unitary authority",
						"code": "GB-BST",
						"name": "Bristol, City of",
						"parent": "GB-ENG"
					},
					"GB-BUR": {
						"category": "metropolitan district",
						"code": "GB-BUR",
						"name": "Bury",
						"parent": "GB-ENG"
					},
					"GB-CAM": {
						"category": "two-tier county",
						"code": "GB-CAM",
						"name": "Cambridgeshire",
						"parent": "GB-ENG"
					},
					"GB-CAY": {
						"category": "unitary authority",
						"code": "GB-CAY",
						"name": "Caerphilly [Caerffili GB-CAF]",
						"parent": "GB-WLS"
					},
					"GB-CBF": {
						"category": "unitary authority",
						"code": "GB-CBF",
						"name": "Central Bedfordshire",
						"parent": "GB-ENG"
					},
					"GB-CCG": {
						"category": "district",
						"code": "GB-CCG",
						"name": "Causeway Coast and Glens",
						"parent": "GB-NIR"
					},
					"GB-CGN": {
						"category": "unitary authority",
						"code": "GB-CGN",
						"name": "Ceredigion [Sir Ceredigion]",
						"parent": "GB-WLS"
					},
					"GB-CHE": {
						"category": "unitary authority",
						"code": "GB-CHE",
						"name": "Cheshire East",
						"parent": "GB-ENG"
					},
					"GB-CHW": {
						"category": "unitary authority",
						"code": "GB-CHW",
						"name": "Cheshire West and Chester",
						"parent": "GB-ENG"
					},
					"GB-CLD": {
						"category": "metropolitan district",
						"code": "GB-CLD",
						"name": "Calderdale",
						"parent": "GB-ENG"
					},
					"GB-CLK": {
						"category": "council area",
						"code": "GB-CLK",
						"name": "Clackmannanshire",
						"parent": "GB-SCT"
					},
					"GB-CMA": {
						"category": "two-tier county",
						"code": "GB-CMA",
						"name": "Cumbria",
						"parent": "GB-ENG"
					},
					"GB-CMD": {
						"category": "London borough",
						"code": "GB-CMD",
						"name": "Camden",
						"parent": "GB-ENG"
					},
					"GB-CMN": {
						"category": "unitary authority",
						"code": "GB-CMN",
						"name": "Carmarthenshire [Sir Gaerfyrddin GB-GFY]",
						"parent": "GB-WLS"
					},
					"GB-CON": {
						"category": "unitary authority",
						"code": "GB-CON",
						"name": "Cornwall",
						"parent": "GB-ENG"
					},
					"GB-COV": {
						"category": "metropolitan district",
						"code": "GB-COV",
						"name": "Coventry",
						"parent": "GB-ENG"
					},
					"GB-CRF": {
						"category": "unitary authority",
						"code": "GB-CRF",
						"name": "Cardiff [Caerdydd GB-CRD]",
						"parent": "GB-WLS"
					},
					"GB-CRY": {
						"category": "London borough",
						"code": "GB-CRY",
						"name": "Croydon",
						"parent": "GB-ENG"
					},
					"GB-CWY": {
						"category": "unitary authority",
						"code": "GB-CWY",
						"name": "Conwy",
						"parent": "GB-WLS"
					},
					"GB-DAL": {
						"category": "unitary authority",
						"code": "GB-DAL",
						"name": "Darlington",
						"parent": "GB-ENG"
					},
					"GB-DBY": {
						"category": "two-tier county",
						"code": "GB-DBY",
						"name": "Derbyshire",
						"parent": "GB-ENG"
					},
					"GB-DEN": {
						"category": "unitary authority",
						"code": "GB-DEN",
						"name": "Denbighshire [Sir Ddinbych GB-DDB]",
						"parent": "GB-WLS"
					},
					"GB-DER": {
						"category": "unitary authority",
						"code": "GB-DER",
						"name": "Derby",
						"parent": "GB-ENG"
					},
					"GB-DEV": {
						"category": "two-tier county",
						"code": "GB-DEV",
						"name": "Devon",
						"parent": "GB-ENG"
					},
					"GB-DGY": {
						"category": "council area",
						"code": "GB-DGY",
						"name": "Dumfries and Galloway",
						"parent": "GB-SCT"
					},
					"GB-DNC": {
						"category": "metropolitan district",
						"code": "GB-DNC",
						"name": "Doncaster",
						"parent": "GB-ENG"
					},
					"GB-DND": {
						"category": "council area",
						"code": "GB-DND",
						"name": "Dundee City",
						"parent": "GB-SCT"
					},
					"GB-DOR": {
						"category": "two-tier county",
						"code": "GB-DOR",
						"name": "Dorset",
						"parent": "GB-ENG"
					},
					"GB-DRS": {
						"category": "district",
						"code": "GB-DRS",
						"name": "Derry and Strabane",
						"parent": "GB-NIR"
					},
					"GB-DUD": {
						"category": "metropolitan district",
						"code": "GB-DUD",
						"name": "Dudley",
						"parent": "GB-ENG"
					},
					"GB-DUR": {
						"category": "unitary authority",
						"code": "GB-DUR",
						"name": "Durham County",
						"parent": "GB-ENG"
					},
					"GB-EAL": {
						"category": "London borough",
						"code": "GB-EAL",
						"name": "Ealing",
						"parent": "GB-ENG"
					},
					"GB-EAW": {
						"category": "nation",
						"code": "GB-EAW",
						"name": "England and Wales",
						"parent": ""
					},
					"GB-EAY": {
						"category": "council area",
						"code": "GB-EAY",
						"name": "East Ayrshire",
						"parent": "GB-SCT"
					},
					"GB-EDH": {
						"category": "council area",
						"code": "GB-EDH",
						"name": "Edinburgh, City of",
						"parent": "GB-SCT"
					},
					"GB-EDU": {
						"category": "council area",
						"code": "GB-EDU",
						"name": "East Dunbartonshire",
						"parent": "GB-SCT"
					},
					"GB-ELN": {
						"category": "council area",
						"code": "GB-ELN",
						"name": "East Lothian",
						"parent": "GB-SCT"
					},
					"GB-ELS": {
						"category": "council area",
						"code": "GB-ELS",
						"name": "Eilean Siar",
						"parent": "GB-SCT"
					},
					"GB-ENF": {
						"category": "London borough",
						"code": "GB-ENF",
						"name": "Enfield",
						"parent": "GB-ENG"
					},
					"GB-ENG": {
						"category": "country",
						"code": "GB-ENG",
						"name": "England",
						"parent": ""
					},
					"GB-ERW": {
						"category": "council area",
						"code": "GB-ERW",
						"name": "East Renfrewshire",
						"parent": "GB-SCT"
					},
					"GB-ERY": {
						"category": "unitary authority",
						"code": "GB-ERY",
						"name": "East Riding of Yorkshire",
						"parent": "GB-ENG"
					},
					"GB-ESS": {
						"category": "two-tier county",
						"code": "GB-ESS",
						"name": "Essex",
						"parent": "GB-ENG"
					},
					"GB-ESX": {
						"category": "two-tier county",
						"code": "GB-ESX",
						"name": "East Sussex",
						"parent": "GB-ENG"
					},
					"GB-FAL": {
						"category": "council area",
						"code": "GB-FAL",
						"name": "Falkirk",
						"parent": "GB-SCT"
					},
					"GB-FIF": {
						"category": "council area",
						"code": "GB-FIF",
						"name": "Fife",
						"parent": "GB-SCT"
					},
					"GB-FLN": {
						"category": "unitary authority",
						"code": "GB-FLN",
						"name": "Flintshire [Sir y Fflint GB-FFL]",
						"parent": "GB-WLS"
					},
					"GB-FMO": {
						"category": "district",
						"code": "GB-FMO",
						"name": "Fermanagh and Omagh",
						"parent": "GB-NIR"
					},
					"GB-GAT": {
						"category": "metropolitan district",
						"code": "GB-GAT",
						"name": "Gateshead",
						"parent": "GB-ENG"
					},
					"GB-GBN": {
						"category": "nation",
						"code": "GB-GBN",
						"name": "Great Britain",
						"parent": ""
					},
					"GB-GLG": {
						"category": "council area",
						"code": "GB-GLG",
						"name": "Glasgow City",
						"parent": "GB-SCT"
					},
					"GB-GLS": {
						"category": "two-tier county",
						"code": "GB-GLS",
						"name": "Gloucestershire",
						"parent": "GB-ENG"
					},
					"GB-GRE": {
						"category": "London borough",
						"code": "GB-GRE",
						"name": "Greenwich",
						"parent": "GB-ENG"
					},
					"GB-GWN": {
						"category": "unitary authority",
						"code": "GB-GWN",
						"name": "Gwynedd",
						"parent": "GB-WLS"
					},
					"GB-HAL": {
						"category": "unitary authority",
						"code": "GB-HAL",
						"name": "Halton",
						"parent": "GB-ENG"
					},
					"GB-HAM": {
						"category": "two-tier county",
						"code": "GB-HAM",
						"name": "Hampshire",
						"parent": "GB-ENG"
					},
					"GB-HAV": {
						"category": "London borough",
						"code": "GB-HAV",
						"name": "Havering",
						"parent": "GB-ENG"
					},
					"GB-HCK": {
						"category": "London borough",
						"code": "GB-HCK",
						"name": "Hackney",
						"parent": "GB-ENG"
					},
					"GB-HEF": {
						"category": "unitary authority",
						"code": "GB-HEF",
						"name": "Herefordshire",
						"parent": "GB-ENG"
					},
					"GB-HIL": {
						"category": "London borough",
						"code": "GB-HIL",
						"name": "Hillingdon",
						"parent": "GB-ENG"
					},
					"GB-HLD": {
						"category": "council area",
						"code": "GB-HLD",
						"name": "Highland",
						"parent": "GB-SCT"
					},
					"GB-HMF": {
						"category": "London borough",
						"code": "GB-HMF",
						"name": "Hammersmith and Fulham",
						"parent": "GB-ENG"
					},
					"GB-HNS": {
						"category": "London borough",
						"code": "GB-HNS",
						"name": "Hounslow",
						"parent": "GB-ENG"
					},
					"GB-HPL": {
						"category": "unitary authority",
						"code": "GB-HPL",
						"name": "Hartlepool",
						"parent": "GB-ENG"
					},
					"GB-HRT": {
						"category": "two-tier county",
						"code": "GB-HRT",
						"name": "Hertfordshire",
						"parent": "GB-ENG"
					},
					"GB-HRW": {
						"category": "London borough",
						"code": "GB-HRW",
						"name": "Harrow",
						"parent": "GB-ENG"
					},
					"GB-HRY": {
						"category": "London borough",
						"code": "GB-HRY",
						"name": "Haringey",
						"parent": "GB-ENG"
					},
					"GB-IOS": {
						"category": "unitary authority",
						"code": "GB-IOS",
						"name": "Isles of Scilly",
						"parent": "GB-ENG"
					},
					"GB-IOW": {
						"category": "unitary authority",
						"code": "GB-IOW",
						"name": "Isle of Wight",
						"parent": "GB-ENG"
					},
					"GB-ISL": {
						"category": "London borough",
						"code": "GB-ISL",
						"name": "Islington",
						"parent": "GB-ENG"
					},
					"GB-IVC": {
						"category": "council area",
						"code": "GB-IVC",
						"name": "Inverclyde",
						"parent": "GB-SCT"
					},
					"GB-KEC": {
						"category": "London borough",
						"code": "GB-KEC",
						"name": "Kensington and Chelsea",
						"parent": "GB-ENG"
					},
					"GB-KEN": {
						"category": "two-tier county",
						"code": "GB-KEN",
						"name": "Kent",
						"parent": "GB-ENG"
					},
					"GB-KHL": {
						"category": "unitary authority",
						"code": "GB-KHL",
						"name": "Kingston upon Hull",
						"parent": "GB-ENG"
					},
					"GB-KIR": {
						"category": "metropolitan district",
						"code": "GB-KIR",
						"name": "Kirklees",
						"parent": "GB-ENG"
					},
					"GB-KTT": {
						"category": "London borough",
						"code": "GB-KTT",
						"name": "Kingston upon Thames",
						"parent": "GB-ENG"
					},
					"GB-KWL": {
						"category": "metropolitan district",
						"code": "GB-KWL",
						"name": "Knowsley",
						"parent": "GB-ENG"
					},
					"GB-LAN": {
						"category": "two-tier county",
						"code": "GB-LAN",
						"name": "Lancashire",
						"parent": "GB-ENG"
					},
					"GB-LBC": {
						"category": "district",
						"code": "GB-LBC",
						"name": "Lisburn and Castlereagh",
						"parent": "GB-NIR"
					},
					"GB-LBH": {
						"category": "London borough",
						"code": "GB-LBH",
						"name": "Lambeth",
						"parent": "GB-ENG"
					},
					"GB-LCE": {
						"category": "unitary authority",
						"code": "GB-LCE",
						"name": "Leicester",
						"parent": "GB-ENG"
					},
					"GB-LDS": {
						"category": "metropolitan district",
						"code": "GB-LDS",
						"name": "Leeds",
						"parent": "GB-ENG"
					},
					"GB-LEC": {
						"category": "two-tier county",
						"code": "GB-LEC",
						"name": "Leicestershire",
						"parent": "GB-ENG"
					},
					"GB-LEW": {
						"category": "London borough",
						"code": "GB-LEW",
						"name": "Lewisham",
						"parent": "GB-ENG"
					},
					"GB-LIN": {
						"category": "two-tier county",
						"code": "GB-LIN",
						"name": "Lincolnshire",
						"parent": "GB-ENG"
					},
					"GB-LIV": {
						"category": "metropolitan district",
						"code": "GB-LIV",
						"name": "Liverpool",
						"parent": "GB-ENG"
					},
					"GB-LND": {
						"category": "city corporation",
						"code": "GB-LND",
						"name": "London, City of",
						"parent": "GB-ENG"
					},
					"GB-LUT": {
						"category": "unitary authority",
						"code": "GB-LUT",
						"name": "Luton",
						"parent": "GB-ENG"
					},
					"GB-MAN": {
						"category": "metropolitan district",
						"code": "GB-MAN",
						"name": "Manchester",
						"parent": "GB-ENG"
					},
					"GB-MDB": {
						"category": "unitary authority",
						"code": "GB-MDB",
						"name": "Middlesbrough",
						"parent": "GB-ENG"
					},
					"GB-MDW": {
						"category": "unitary authority",
						"code": "GB-MDW",
						"name": "Medway",
						"parent": "GB-ENG"
					},
					"GB-MEA": {
						"category": "district",
						"code": "GB-MEA",
						"name": "Mid and East Antrim",
						"parent": "GB-NIR"
					},
					"GB-MIK": {
						"category": "unitary authority",
						"code": "GB-MIK",
						"name": "Milton Keynes",
						"parent": "GB-ENG"
					},
					"GB-MLN": {
						"category": "council area",
						"code": "GB-MLN",
						"name": "Midlothian",
						"parent": "GB-SCT"
					},
					"GB-MON": {
						"category": "unitary authority",
						"code": "GB-MON",
						"name": "Monmouthshire [Sir Fynwy GB-FYN]",
						"parent": "GB-WLS"
					},
					"GB-MRT": {
						"category": "London borough",
						"code": "GB-MRT",
						"name": "Merton",
						"parent": "GB-ENG"
					},
					"GB-MRY": {
						"category": "council area",
						"code": "GB-MRY",
						"name": "Moray",
						"parent": "GB-SCT"
					},
					"GB-MTY": {
						"category": "unitary authority",
						"code": "GB-MTY",
						"name": "Merthyr Tydfil [Merthyr Tudful GB-MTU]",
						"parent": "GB-WLS"
					},
					"GB-MUL": {
						"category": "district",
						"code": "GB-MUL",
						"name": "Mid Ulster",
						"parent": "GB-NIR"
					},
					"GB-NAY": {
						"category": "council area",
						"code": "GB-NAY",
						"name": "North Ayrshire",
						"parent": "GB-SCT"
					},
					"GB-NBL": {
						"category": "unitary authority",
						"code": "GB-NBL",
						"name": "Northumberland",
						"parent": "GB-ENG"
					},
					"GB-NEL": {
						"category": "unitary authority",
						"code": "GB-NEL",
						"name": "North East Lincolnshire",
						"parent": "GB-ENG"
					},
					"GB-NET": {
						"category": "metropolitan district",
						"code": "GB-NET",
						"name": "Newcastle upon Tyne",
						"parent": "GB-ENG"
					},
					"GB-NFK": {
						"category": "two-tier county",
						"code": "GB-NFK",
						"name": "Norfolk",
						"parent": "GB-ENG"
					},
					"GB-NGM": {
						"category": "unitary authority",
						"code": "GB-NGM",
						"name": "Nottingham",
						"parent": "GB-ENG"
					},
					"GB-NIR": {
						"category": "province",
						"code": "GB-NIR",
						"name": "Northern Ireland",
						"parent": ""
					},
					"GB-NLK": {
						"category": "council area",
						"code": "GB-NLK",
						"name": "North Lanarkshire",
						"parent": "GB-SCT"
					},
					"GB-NLN": {
						"category": "unitary authority",
						"code": "GB-NLN",
						"name": "North Lincolnshire",
						"parent": "GB-ENG"
					},
					"GB-NMD": {
						"category": "district",
						"code": "GB-NMD",
						"name": "Newry, Mourne and Down",
						"parent": "GB-NIR"
					},
					"GB-NSM": {
						"category": "unitary authority",
						"code": "GB-NSM",
						"name": "North Somerset",
						"parent": "GB-ENG"
					},
					"GB-NTH": {
						"category": "two-tier county",
						"code": "GB-NTH",
						"name": "Northamptonshire",
						"parent": "GB-ENG"
					},
					"GB-NTL": {
						"category": "unitary authority",
						"code": "GB-NTL",
						"name": "Neath Port Talbot [Castell-nedd Port Talbot GB-CTL]",
						"parent": "GB-WLS"
					},
					"GB-NTT": {
						"category": "two-tier county",
						"code": "GB-NTT",
						"name": "Nottinghamshire",
						"parent": "GB-ENG"
					},
					"GB-NTY": {
						"category": "metropolitan district",
						"code": "GB-NTY",
						"name": "North Tyneside",
						"parent": "GB-ENG"
					},
					"GB-NWM": {
						"category": "London borough",
						"code": "GB-NWM",
						"name": "Newham",
						"parent": "GB-ENG"
					},
					"GB-NWP": {
						"category": "unitary authority",
						"code": "GB-NWP",
						"name": "Newport [Casnewydd GB-CNW]",
						"parent": "GB-WLS"
					},
					"GB-NYK": {
						"category": "two-tier county",
						"code": "GB-NYK",
						"name": "North Yorkshire",
						"parent": "GB-ENG"
					},
					"GB-OLD": {
						"category": "metropolitan district",
						"code": "GB-OLD",
						"name": "Oldham",
						"parent": "GB-ENG"
					},
					"GB-ORK": {
						"category": "council area",
						"code": "GB-ORK",
						"name": "Orkney Islands",
						"parent": "GB-SCT"
					},
					"GB-OXF": {
						"category": "two-tier county",
						"code": "GB-OXF",
						"name": "Oxfordshire",
						"parent": "GB-ENG"
					},
					"GB-PEM": {
						"category": "unitary authority",
						"code": "GB-PEM",
						"name": "Pembrokeshire [Sir Benfro GB-BNF]",
						"parent": "GB-WLS"
					},
					"GB-PKN": {
						"category": "council area",
						"code": "GB-PKN",
						"name": "Perth and Kinross",
						"parent": "GB-SCT"
					},
					"GB-PLY": {
						"category": "unitary authority",
						"code": "GB-PLY",
						"name": "Plymouth",
						"parent": "GB-ENG"
					},
					"GB-POL": {
						"category": "unitary authority",
						"code": "GB-POL",
						"name": "Poole",
						"parent": "GB-ENG"
					},
					"GB-POR": {
						"category": "unitary authority",
						"code": "GB-POR",
						"name": "Portsmouth",
						"parent": "GB-ENG"
					},
					"GB-POW": {
						"category": "unitary authority",
						"code": "GB-POW",
						"name": "Powys",
						"parent": "GB-WLS"
					},
					"GB-PTE": {
						"category": "unitary authority",
						"code": "GB-PTE",
						"name": "Peterborough",
						"parent": "GB-ENG"
					},
					"GB-RCC": {
						"category": "unitary authority",
						"code": "GB-RCC",
						"name": "Redcar and Cleveland",
						"parent": "GB-ENG"
					},
					"GB-RCH": {
						"category": "metropolitan district",
						"code": "GB-RCH",
						"name": "Rochdale",
						"parent": "GB-ENG"
					},
					"GB-RCT": {
						"category": "unitary authority",
						"code": "GB-RCT",
						"name": "Rhondda, Cynon, Taff [Rhondda, Cynon,Taf]",
						"parent": "GB-WLS"
					},
					"GB-RDB": {
						"category": "London borough",
						"code": "GB-RDB",
						"name": "Redbridge",
						"parent": "GB-ENG"
					},
					"GB-RDG": {
						"category": "unitary authority",
						"code": "GB-RDG",
						"name": "Reading",
						"parent": "GB-ENG"
					},
					"GB-RFW": {
						"category": "council area",
						"code": "GB-RFW",
						"name": "Renfrewshire",
						"parent": "GB-SCT"
					},
					"GB-RIC": {
						"category": "London borough",
						"code": "GB-RIC",
						"name": "Richmond upon Thames",
						"parent": "GB-ENG"
					},
					"GB-ROT": {
						"category": "metropolitan district",
						"code": "GB-ROT",
						"name": "Rotherham",
						"parent": "GB-ENG"
					},
					"GB-RUT": {
						"category": "unitary authority",
						"code": "GB-RUT",
						"name": "Rutland",
						"parent": "GB-ENG"
					},
					"GB-SAW": {
						"category": "metropolitan district",
						"code": "GB-SAW",
						"name": "Sandwell",
						"parent": "GB-ENG"
					},
					"GB-SAY": {
						"category": "council area",
						"code": "GB-SAY",
						"name": "South Ayrshire",
						"parent": "GB-SCT"
					},
					"GB-SCB": {
						"category": "council area",
						"code": "GB-SCB",
						"name": "Scottish Borders, The",
						"parent": "GB-SCT"
					},
					"GB-SCT": {
						"category": "country",
						"code": "GB-SCT",
						"name": "Scotland",
						"parent": ""
					},
					"GB-SFK": {
						"category": "two-tier county",
						"code": "GB-SFK",
						"name": "Suffolk",
						"parent": "GB-ENG"
					},
					"GB-SFT": {
						"category": "metropolitan district",
						"code": "GB-SFT",
						"name": "Sefton",
						"parent": "GB-ENG"
					},
					"GB-SGC": {
						"category": "unitary authority",
						"code": "GB-SGC",
						"name": "South Gloucestershire",
						"parent": "GB-ENG"
					},
					"GB-SHF": {
						"category": "metropolitan district",
						"code": "GB-SHF",
						"name": "Sheffield",
						"parent": "GB-ENG"
					},
					"GB-SHN": {
						"category": "metropolitan district",
						"code": "GB-SHN",
						"name": "St. Helens",
						"parent": "GB-ENG"
					},
					"GB-SHR": {
						"category": "unitary authority",
						"code": "GB-SHR",
						"name": "Shropshire",
						"parent": "GB-ENG"
					},
					"GB-SKP": {
						"category": "metropolitan district",
						"code": "GB-SKP",
						"name": "Stockport",
						"parent": "GB-ENG"
					},
					"GB-SLF": {
						"category": "metropolitan district",
						"code": "GB-SLF",
						"name": "Salford",
						"parent": "GB-ENG"
					},
					"GB-SLG": {
						"category": "unitary authority",
						"code": "GB-SLG",
						"name": "Slough",
						"parent": "GB-ENG"
					},
					"GB-SLK": {
						"category": "council area",
						"code": "GB-SLK",
						"name": "South Lanarkshire",
						"parent": "GB-SCT"
					},
					"GB-SND": {
						"category": "metropolitan district",
						"code": "GB-SND",
						"name": "Sunderland",
						"parent": "GB-ENG"
					},
					"GB-SOL": {
						"category": "metropolitan district",
						"code": "GB-SOL",
						"name": "Solihull",
						"parent": "GB-ENG"
					},
					"GB-SOM": {
						"category": "two-tier county",
						"code": "GB-SOM",
						"name": "Somerset",
						"parent": "GB-ENG"
					},
					"GB-SOS": {
						"category": "unitary authority",
						"code": "GB-SOS",
						"name": "Southend-on-Sea",
						"parent": "GB-ENG"
					},
					"GB-SRY": {
						"category": "two-tier county",
						"code": "GB-SRY",
						"name": "Surrey",
						"parent": "GB-ENG"
					},
					"GB-STE": {
						"category": "unitary authority",
						"code": "GB-STE",
						"name": "Stoke-on-Trent",
						"parent": "GB-ENG"
					},
					"GB-STG": {
						"category": "council area",
						"code": "GB-STG",
						"name": "Stirling",
						"parent": "GB-SCT"
					},
					"GB-STH": {
						"category": "unitary authority",
						"code": "GB-STH",
						"name": "Southampton",
						"parent": "GB-ENG"
					},
					"GB-STN": {
						"category": "London borough",
						"code": "GB-STN",
						"name": "Sutton",
						"parent": "GB-ENG"
					},
					"GB-STS": {
						"category": "two-tier county",
						"code": "GB-STS",
						"name": "Staffordshire",
						"parent": "GB-ENG"
					},
					"GB-STT": {
						"category": "unitary authority",
						"code": "GB-STT",
						"name": "Stockton-on-Tees",
						"parent": "GB-ENG"
					},
					"GB-STY": {
						"category": "metropolitan district",
						"code": "GB-STY",
						"name": "South Tyneside",
						"parent": "GB-ENG"
					},
					"GB-SWA": {
						"category": "unitary authority",
						"code": "GB-SWA",
						"name": "Swansea [Abertawe GB-ATA]",
						"parent": "GB-WLS"
					},
					"GB-SWD": {
						"category": "unitary authority",
						"code": "GB-SWD",
						"name": "Swindon",
						"parent": "GB-ENG"
					},
					"GB-SWK": {
						"category": "London borough",
						"code": "GB-SWK",
						"name": "Southwark",
						"parent": "GB-ENG"
					},
					"GB-TAM": {
						"category": "metropolitan district",
						"code": "GB-TAM",
						"name": "Tameside",
						"parent": "GB-ENG"
					},
					"GB-TFW": {
						"category": "unitary authority",
						"code": "GB-TFW",
						"name": "Telford and Wrekin",
						"parent": "GB-ENG"
					},
					"GB-THR": {
						"category": "unitary authority",
						"code": "GB-THR",
						"name": "Thurrock",
						"parent": "GB-ENG"
					},
					"GB-TOB": {
						"category": "unitary authority",
						"code": "GB-TOB",
						"name": "Torbay",
						"parent": "GB-ENG"
					},
					"GB-TOF": {
						"category": "unitary authority",
						"code": "GB-TOF",
						"name": "Torfaen [Tor-faen]",
						"parent": "GB-WLS"
					},
					"GB-TRF": {
						"category": "metropolitan district",
						"code": "GB-TRF",
						"name": "Trafford",
						"parent": "GB-ENG"
					},
					"GB-TWH": {
						"category": "London borough",
						"code": "GB-TWH",
						"name": "Tower Hamlets",
						"parent": "GB-ENG"
					},
					"GB-UKM": {
						"category": "nation",
						"code": "GB-UKM",
						"name": "United Kingdom",
						"parent": ""
					},
					"GB-VGL": {
						"category": "unitary authority",
						"code": "GB-VGL",
						"name": "Vale of Glamorgan, The [Bro Morgannwg GB-BMG]",
						"parent": "GB-WLS"
					},
					"GB-WAR": {
						"category": "two-tier county",
						"code": "GB-WAR",
						"name": "Warwickshire",
						"parent": "GB-ENG"
					},
					"GB-WBK": {
						"category": "unitary authority",
						"code": "GB-WBK",
						"name": "West Berkshire",
						"parent": "GB-ENG"
					},
					"GB-WDU": {
						"category": "council area",
						"code": "GB-WDU",
						"name": "West Dunbartonshire",
						"parent": "GB-SCT"
					},
					"GB-WFT": {
						"category": "London borough",
						"code": "GB-WFT",
						"name": "Waltham Forest",
						"parent": "GB-ENG"
					},
					"GB-WGN": {
						"category": "metropolitan district",
						"code": "GB-WGN",
						"name": "Wigan",
						"parent": "GB-ENG"
					},
					"GB-WIL": {
						"category": "unitary authority",
						"code": "GB-WIL",
						"name": "Wiltshire",
						"parent": "GB-ENG"
					},
					"GB-WKF": {
						"category": "metropolitan district",
						"code": "GB-WKF",
						"name": "Wakefield",
						"parent": "GB-ENG"
					},
					"GB-WLL": {
						"category": "metropolitan district",
						"code": "GB-WLL",
						"name": "Walsall",
						"parent": "GB-ENG"
					},
					"GB-WLN": {
						"category": "council area",
						"code": "GB-WLN",
						"name": "West Lothian",
						"parent": "GB-SCT"
					},
					"GB-WLS": {
						"category": "country",
						"code": "GB-WLS",
						"name": "Wales [Cymru GB-CYM]",
						"parent": ""
					},
					"GB-WLV": {
						"category": "metropolitan district",
						"code": "GB-WLV",
						"name": "Wolverhampton",
						"parent": "GB-ENG"
					},
					"GB-WND": {
						"category": "London borough",
						"code": "GB-WND",
						"name": "Wandsworth",
						"parent": "GB-ENG"
					},
					"GB-WNM": {
						"category": "unitary authority",
						"code": "GB-WNM",
						"name": "Windsor and Maidenhead",
						"parent": "GB-ENG"
					},
					"GB-WOK": {
						"category": "unitary authority",
						"code": "GB-WOK",
						"name": "Wokingham",
						"parent": "GB-ENG"
					},
					"GB-WOR": {
						"category": "two-tier county",
						"code": "GB-WOR",
						"name": "Worcestershire",
						"parent": "GB-ENG"
					},
					"GB-WRL": {
						"category": "metropolitan district",
						"code": "GB-WRL",
						"name": "Wirral",
						"parent": "GB-ENG"
					},
					"GB-WRT": {
						"category": "unitary authority",
						"code": "GB-WRT",
						"name": "Warrington",
						"parent": "GB-ENG"
					},
					"GB-WRX": {
						"category": "unitary authority",
						"code": "GB-WRX",
						"name": "Wrexham [Wrecsam GB-WRC]",
						"parent": "GB-WLS"
					},
					"GB-WSM": {
						"category": "London borough",
						"code": "GB-WSM",
						"name": "Westminster",
						"parent": "GB-ENG"
					},
					"GB-WSX": {
						"category": "two-tier county",
						"code": "GB-WSX",
						"name": "West Sussex",
						"parent": "GB-ENG"
					},
					"GB-YOR": {
						"category": "unitary authority",
						"code": "GB-YOR",
						"name": "York",
						"parent": "GB-ENG"
					},
					"GB-ZET": {
						"category": "council area",
						"code": "GB-ZET",
						"name": "Shetland Islands",
						"parent": "GB-SCT"
					}
				}
			},
			"GEO": {
				"threeLetterCode": "GEO",
				"shortName": "Georgia",
				"shortNameUpperCase": "GEORGIA",
				"fullName": "Georgia",
				"subdivisionLabel": "region",
				"subdivisions": {
					"GE-AB": {
						"category": "autonomous republic",
						"code": "GE-AB",
						"name": "Abkhazia",
						"parent": ""
					},
					"GE-AJ": {
						"category": "autonomous republic",
						"code": "GE-AJ",
						"name": "Ajaria",
						"parent": ""
					},
					"GE-GU": {
						"category": "region",
						"code": "GE-GU",
						"name": "Guria",
						"parent": ""
					},
					"GE-IM": {
						"category": "region",
						"code": "GE-IM",
						"name": "Imereti",
						"parent": ""
					},
					"GE-KA": {
						"category": "region",
						"code": "GE-KA",
						"name": "K'akheti",
						"parent": ""
					},
					"GE-KK": {
						"category": "region",
						"code": "GE-KK",
						"name": "Kvemo Kartli",
						"parent": ""
					},
					"GE-MM": {
						"category": "region",
						"code": "GE-MM",
						"name": "Mtskheta-Mtianeti",
						"parent": ""
					},
					"GE-RL": {
						"category": "region",
						"code": "GE-RL",
						"name": "Rach'a-Lechkhumi-Kvemo Svaneti",
						"parent": ""
					},
					"GE-SJ": {
						"category": "region",
						"code": "GE-SJ",
						"name": "Samtskhe-Javakheti",
						"parent": ""
					},
					"GE-SK": {
						"category": "region",
						"code": "GE-SK",
						"name": "Shida Kartli",
						"parent": ""
					},
					"GE-SZ": {
						"category": "region",
						"code": "GE-SZ",
						"name": "Samegrelo-Zemo Svaneti",
						"parent": ""
					},
					"GE-TB": {
						"category": "city",
						"code": "GE-TB",
						"name": "Tbilisi",
						"parent": ""
					}
				}
			},
			"GGY": {
				"threeLetterCode": "GGY",
				"shortName": "Guernsey",
				"shortNameUpperCase": "GUERNSEY",
				"fullName": "Guernsey",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"GHA": {
				"threeLetterCode": "GHA",
				"shortName": "Ghana",
				"shortNameUpperCase": "GHANA",
				"fullName": "the Republic of Ghana",
				"subdivisionLabel": "region",
				"subdivisions": {
					"GH-AA": {
						"category": "region",
						"code": "GH-AA",
						"name": "Greater Accra",
						"parent": ""
					},
					"GH-AH": {
						"category": "region",
						"code": "GH-AH",
						"name": "Ashanti",
						"parent": ""
					},
					"GH-BA": {
						"category": "region",
						"code": "GH-BA",
						"name": "Brong-Ahafo",
						"parent": ""
					},
					"GH-CP": {
						"category": "region",
						"code": "GH-CP",
						"name": "Central",
						"parent": ""
					},
					"GH-EP": {
						"category": "region",
						"code": "GH-EP",
						"name": "Eastern",
						"parent": ""
					},
					"GH-NP": {
						"category": "region",
						"code": "GH-NP",
						"name": "Northern",
						"parent": ""
					},
					"GH-TV": {
						"category": "region",
						"code": "GH-TV",
						"name": "Volta",
						"parent": ""
					},
					"GH-UE": {
						"category": "region",
						"code": "GH-UE",
						"name": "Upper East",
						"parent": ""
					},
					"GH-UW": {
						"category": "region",
						"code": "GH-UW",
						"name": "Upper West",
						"parent": ""
					},
					"GH-WP": {
						"category": "region",
						"code": "GH-WP",
						"name": "Western",
						"parent": ""
					}
				}
			},
			"GIB": {
				"threeLetterCode": "GIB",
				"shortName": "Gibraltar",
				"shortNameUpperCase": "GIBRALTAR",
				"fullName": "Gibraltar",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"GIN": {
				"threeLetterCode": "GIN",
				"shortName": "Guinea",
				"shortNameUpperCase": "GUINEA",
				"fullName": "the Republic of Guinea",
				"subdivisionLabel": "prefecture",
				"subdivisions": {
					"GN-B": {
						"category": "administrative region",
						"code": "GN-B",
						"name": "Boké",
						"parent": ""
					},
					"GN-BE": {
						"category": "prefecture",
						"code": "GN-BE",
						"name": "Beyla",
						"parent": "GN-N"
					},
					"GN-BF": {
						"category": "prefecture",
						"code": "GN-BF",
						"name": "Boffa",
						"parent": "GN-B"
					},
					"GN-BK": {
						"category": "prefecture",
						"code": "GN-BK",
						"name": "Boké",
						"parent": "GN-B"
					},
					"GN-C": {
						"category": "governorate",
						"code": "GN-C",
						"name": "Conakry",
						"parent": ""
					},
					"GN-CO": {
						"category": "prefecture",
						"code": "GN-CO",
						"name": "Coyah",
						"parent": "GN-D"
					},
					"GN-D": {
						"category": "administrative region",
						"code": "GN-D",
						"name": "Kindia",
						"parent": ""
					},
					"GN-DB": {
						"category": "prefecture",
						"code": "GN-DB",
						"name": "Dabola",
						"parent": "GN-F"
					},
					"GN-DI": {
						"category": "prefecture",
						"code": "GN-DI",
						"name": "Dinguiraye",
						"parent": "GN-F"
					},
					"GN-DL": {
						"category": "prefecture",
						"code": "GN-DL",
						"name": "Dalaba",
						"parent": "GN-M"
					},
					"GN-DU": {
						"category": "prefecture",
						"code": "GN-DU",
						"name": "Dubréka",
						"parent": "GN-D"
					},
					"GN-F": {
						"category": "administrative region",
						"code": "GN-F",
						"name": "Faranah",
						"parent": ""
					},
					"GN-FA": {
						"category": "prefecture",
						"code": "GN-FA",
						"name": "Faranah",
						"parent": "GN-F"
					},
					"GN-FO": {
						"category": "prefecture",
						"code": "GN-FO",
						"name": "Forécariah",
						"parent": "GN-D"
					},
					"GN-FR": {
						"category": "prefecture",
						"code": "GN-FR",
						"name": "Fria",
						"parent": "GN-B"
					},
					"GN-GA": {
						"category": "prefecture",
						"code": "GN-GA",
						"name": "Gaoual",
						"parent": "GN-B"
					},
					"GN-GU": {
						"category": "prefecture",
						"code": "GN-GU",
						"name": "Guékédou",
						"parent": "GN-N"
					},
					"GN-K": {
						"category": "administrative region",
						"code": "GN-K",
						"name": "Kankan",
						"parent": ""
					},
					"GN-KA": {
						"category": "prefecture",
						"code": "GN-KA",
						"name": "Kankan",
						"parent": "GN-K"
					},
					"GN-KB": {
						"category": "prefecture",
						"code": "GN-KB",
						"name": "Koubia",
						"parent": "GN-L"
					},
					"GN-KD": {
						"category": "prefecture",
						"code": "GN-KD",
						"name": "Kindia",
						"parent": "GN-D"
					},
					"GN-KE": {
						"category": "prefecture",
						"code": "GN-KE",
						"name": "Kérouané",
						"parent": "GN-K"
					},
					"GN-KN": {
						"category": "prefecture",
						"code": "GN-KN",
						"name": "Koundara",
						"parent": "GN-B"
					},
					"GN-KO": {
						"category": "prefecture",
						"code": "GN-KO",
						"name": "Kouroussa",
						"parent": "GN-K"
					},
					"GN-KS": {
						"category": "prefecture",
						"code": "GN-KS",
						"name": "Kissidougou",
						"parent": "GN-F"
					},
					"GN-L": {
						"category": "administrative region",
						"code": "GN-L",
						"name": "Labé",
						"parent": ""
					},
					"GN-LA": {
						"category": "prefecture",
						"code": "GN-LA",
						"name": "Labé",
						"parent": "GN-L"
					},
					"GN-LE": {
						"category": "prefecture",
						"code": "GN-LE",
						"name": "Lélouma",
						"parent": "GN-L"
					},
					"GN-LO": {
						"category": "prefecture",
						"code": "GN-LO",
						"name": "Lola",
						"parent": "GN-N"
					},
					"GN-M": {
						"category": "administrative region",
						"code": "GN-M",
						"name": "Mamou",
						"parent": ""
					},
					"GN-MC": {
						"category": "prefecture",
						"code": "GN-MC",
						"name": "Macenta",
						"parent": "GN-N"
					},
					"GN-MD": {
						"category": "prefecture",
						"code": "GN-MD",
						"name": "Mandiana",
						"parent": "GN-K"
					},
					"GN-ML": {
						"category": "prefecture",
						"code": "GN-ML",
						"name": "Mali",
						"parent": "GN-L"
					},
					"GN-MM": {
						"category": "prefecture",
						"code": "GN-MM",
						"name": "Mamou",
						"parent": "GN-M"
					},
					"GN-N": {
						"category": "administrative region",
						"code": "GN-N",
						"name": "Nzérékoré",
						"parent": ""
					},
					"GN-NZ": {
						"category": "prefecture",
						"code": "GN-NZ",
						"name": "Nzérékoré",
						"parent": "GN-N"
					},
					"GN-PI": {
						"category": "prefecture",
						"code": "GN-PI",
						"name": "Pita",
						"parent": "GN-M"
					},
					"GN-SI": {
						"category": "prefecture",
						"code": "GN-SI",
						"name": "Siguiri",
						"parent": "GN-K"
					},
					"GN-TE": {
						"category": "prefecture",
						"code": "GN-TE",
						"name": "Télimélé",
						"parent": "GN-D"
					},
					"GN-TO": {
						"category": "prefecture",
						"code": "GN-TO",
						"name": "Tougué",
						"parent": "GN-L"
					},
					"GN-YO": {
						"category": "prefecture",
						"code": "GN-YO",
						"name": "Yomou",
						"parent": "GN-N"
					}
				}
			},
			"GLP": {
				"threeLetterCode": "GLP",
				"shortName": "Guadeloupe",
				"shortNameUpperCase": "GUADELOUPE",
				"fullName": "Guadeloupe",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"GMB": {
				"commonName": "Gambia",
				"threeLetterCode": "GMB",
				"shortName": "Gambia (the)",
				"shortNameUpperCase": "GAMBIA",
				"fullName": "the Republic of the Gambia",
				"subdivisionLabel": "division",
				"subdivisions": {
					"GM-B": {
						"category": "city",
						"code": "GM-B",
						"name": "Banjul",
						"parent": ""
					},
					"GM-L": {
						"category": "division",
						"code": "GM-L",
						"name": "Lower River",
						"parent": ""
					},
					"GM-M": {
						"category": "division",
						"code": "GM-M",
						"name": "Central River",
						"parent": ""
					},
					"GM-N": {
						"category": "division",
						"code": "GM-N",
						"name": "North Bank",
						"parent": ""
					},
					"GM-U": {
						"category": "division",
						"code": "GM-U",
						"name": "Upper River",
						"parent": ""
					},
					"GM-W": {
						"category": "division",
						"code": "GM-W",
						"name": "Western",
						"parent": ""
					}
				}
			},
			"GNB": {
				"threeLetterCode": "GNB",
				"shortName": "Guinea-Bissau",
				"shortNameUpperCase": "GUINEA-BISSAU",
				"fullName": "the Republic of Guinea-Bissau",
				"subdivisionLabel": "region",
				"subdivisions": {
					"GW-BA": {
						"category": "region",
						"code": "GW-BA",
						"name": "Bafatá",
						"parent": "GW-L"
					},
					"GW-BL": {
						"category": "region",
						"code": "GW-BL",
						"name": "Bolama",
						"parent": "GW-S"
					},
					"GW-BM": {
						"category": "region",
						"code": "GW-BM",
						"name": "Biombo",
						"parent": "GW-N"
					},
					"GW-BS": {
						"category": "autonomous sector",
						"code": "GW-BS",
						"name": "Bissau",
						"parent": ""
					},
					"GW-CA": {
						"category": "region",
						"code": "GW-CA",
						"name": "Cacheu",
						"parent": "GW-N"
					},
					"GW-GA": {
						"category": "region",
						"code": "GW-GA",
						"name": "Gabú",
						"parent": "GW-L"
					},
					"GW-L": {
						"category": "province",
						"code": "GW-L",
						"name": "Leste",
						"parent": ""
					},
					"GW-N": {
						"category": "province",
						"code": "GW-N",
						"name": "Norte",
						"parent": ""
					},
					"GW-OI": {
						"category": "region",
						"code": "GW-OI",
						"name": "Oio",
						"parent": "GW-N"
					},
					"GW-QU": {
						"category": "region",
						"code": "GW-QU",
						"name": "Quinara",
						"parent": "GW-S"
					},
					"GW-S": {
						"category": "province",
						"code": "GW-S",
						"name": "Sul",
						"parent": ""
					},
					"GW-TO": {
						"category": "region",
						"code": "GW-TO",
						"name": "Tombali",
						"parent": "GW-S"
					}
				}
			},
			"GNQ": {
				"threeLetterCode": "GNQ",
				"shortName": "Equatorial Guinea",
				"shortNameUpperCase": "EQUATORIAL GUINEA",
				"fullName": "the Republic of Equatorial Guinea",
				"subdivisionLabel": "province",
				"subdivisions": {
					"GQ-AN": {
						"category": "province",
						"code": "GQ-AN",
						"name": "Annobón",
						"parent": "GQ-I"
					},
					"GQ-BN": {
						"category": "province",
						"code": "GQ-BN",
						"name": "Bioko Norte",
						"parent": "GQ-I"
					},
					"GQ-BS": {
						"category": "province",
						"code": "GQ-BS",
						"name": "Bioko Sur",
						"parent": "GQ-I"
					},
					"GQ-C": {
						"category": "region",
						"code": "GQ-C",
						"name": "Región Continental",
						"parent": ""
					},
					"GQ-CS": {
						"category": "province",
						"code": "GQ-CS",
						"name": "Centro Sur",
						"parent": "GQ-C"
					},
					"GQ-I": {
						"category": "region",
						"code": "GQ-I",
						"name": "Región Insular",
						"parent": ""
					},
					"GQ-KN": {
						"category": "province",
						"code": "GQ-KN",
						"name": "Kié-Ntem",
						"parent": "GQ-C"
					},
					"GQ-LI": {
						"category": "province",
						"code": "GQ-LI",
						"name": "Litoral",
						"parent": "GQ-C"
					},
					"GQ-WN": {
						"category": "province",
						"code": "GQ-WN",
						"name": "Wele-Nzas",
						"parent": "GQ-C"
					}
				}
			},
			"GRC": {
				"threeLetterCode": "GRC",
				"shortName": "Greece",
				"shortNameUpperCase": "GREECE",
				"fullName": "the Hellenic Republic",
				"subdivisionLabel": "administrative region",
				"subdivisions": {
					"GR-69": {
						"category": "self-governed part",
						"code": "GR-69",
						"name": "Ágion Óros",
						"parent": ""
					},
					"GR-A": {
						"category": "administrative region",
						"code": "GR-A",
						"name": "Anatolikí Makedonía kai Thráki",
						"parent": ""
					},
					"GR-B": {
						"category": "administrative region",
						"code": "GR-B",
						"name": "Kentrikí Makedonía",
						"parent": ""
					},
					"GR-C": {
						"category": "administrative region",
						"code": "GR-C",
						"name": "Dytikí Makedonía",
						"parent": ""
					},
					"GR-D": {
						"category": "administrative region",
						"code": "GR-D",
						"name": "Ípeiros",
						"parent": ""
					},
					"GR-E": {
						"category": "administrative region",
						"code": "GR-E",
						"name": "Thessalía",
						"parent": ""
					},
					"GR-F": {
						"category": "administrative region",
						"code": "GR-F",
						"name": "Ionía Nísia",
						"parent": ""
					},
					"GR-G": {
						"category": "administrative region",
						"code": "GR-G",
						"name": "Dytikí Elláda",
						"parent": ""
					},
					"GR-H": {
						"category": "administrative region",
						"code": "GR-H",
						"name": "Stereá Elláda",
						"parent": ""
					},
					"GR-I": {
						"category": "administrative region",
						"code": "GR-I",
						"name": "Attikí",
						"parent": ""
					},
					"GR-J": {
						"category": "administrative region",
						"code": "GR-J",
						"name": "Peloponnísos",
						"parent": ""
					},
					"GR-K": {
						"category": "administrative region",
						"code": "GR-K",
						"name": "Voreío Aigaío",
						"parent": ""
					},
					"GR-L": {
						"category": "administrative region",
						"code": "GR-L",
						"name": "Notío Aigaío",
						"parent": ""
					},
					"GR-M": {
						"category": "administrative region",
						"code": "GR-M",
						"name": "Kríti",
						"parent": ""
					}
				}
			},
			"GRD": {
				"threeLetterCode": "GRD",
				"shortName": "Grenada",
				"shortNameUpperCase": "GRENADA",
				"fullName": "Grenada",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"GD-01": {
						"category": "parish",
						"code": "GD-01",
						"name": "Saint Andrew",
						"parent": ""
					},
					"GD-02": {
						"category": "parish",
						"code": "GD-02",
						"name": "Saint David",
						"parent": ""
					},
					"GD-03": {
						"category": "parish",
						"code": "GD-03",
						"name": "Saint George",
						"parent": ""
					},
					"GD-04": {
						"category": "parish",
						"code": "GD-04",
						"name": "Saint John",
						"parent": ""
					},
					"GD-05": {
						"category": "parish",
						"code": "GD-05",
						"name": "Saint Mark",
						"parent": ""
					},
					"GD-06": {
						"category": "parish",
						"code": "GD-06",
						"name": "Saint Patrick",
						"parent": ""
					},
					"GD-10": {
						"category": "dependency",
						"code": "GD-10",
						"name": "Southern Grenadine Islands",
						"parent": ""
					}
				}
			},
			"GRL": {
				"threeLetterCode": "GRL",
				"shortName": "Greenland",
				"shortNameUpperCase": "GREENLAND",
				"fullName": "Greenland",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"GL-KU": {
						"category": "municipality",
						"code": "GL-KU",
						"name": "Kommune Kujalleq",
						"parent": ""
					},
					"GL-QA": {
						"category": "municipality",
						"code": "GL-QA",
						"name": "Qaasuitsup Kommunia",
						"parent": ""
					},
					"GL-QE": {
						"category": "municipality",
						"code": "GL-QE",
						"name": "Qeqqata Kommunia",
						"parent": ""
					},
					"GL-SM": {
						"category": "municipality",
						"code": "GL-SM",
						"name": "Kommuneqarfik Sermersooq",
						"parent": ""
					}
				}
			},
			"GTM": {
				"threeLetterCode": "GTM",
				"shortName": "Guatemala",
				"shortNameUpperCase": "GUATEMALA",
				"fullName": "the Republic of Guatemala",
				"subdivisionLabel": "department",
				"subdivisions": {
					"GT-AV": {
						"category": "department",
						"code": "GT-AV",
						"name": "Alta Verapaz",
						"parent": ""
					},
					"GT-BV": {
						"category": "department",
						"code": "GT-BV",
						"name": "Baja Verapaz",
						"parent": ""
					},
					"GT-CM": {
						"category": "department",
						"code": "GT-CM",
						"name": "Chimaltenango",
						"parent": ""
					},
					"GT-CQ": {
						"category": "department",
						"code": "GT-CQ",
						"name": "Chiquimula",
						"parent": ""
					},
					"GT-ES": {
						"category": "department",
						"code": "GT-ES",
						"name": "Escuintla",
						"parent": ""
					},
					"GT-GU": {
						"category": "department",
						"code": "GT-GU",
						"name": "Guatemala",
						"parent": ""
					},
					"GT-HU": {
						"category": "department",
						"code": "GT-HU",
						"name": "Huehuetenango",
						"parent": ""
					},
					"GT-IZ": {
						"category": "department",
						"code": "GT-IZ",
						"name": "Izabal",
						"parent": ""
					},
					"GT-JA": {
						"category": "department",
						"code": "GT-JA",
						"name": "Jalapa",
						"parent": ""
					},
					"GT-JU": {
						"category": "department",
						"code": "GT-JU",
						"name": "Jutiapa",
						"parent": ""
					},
					"GT-PE": {
						"category": "department",
						"code": "GT-PE",
						"name": "Petén",
						"parent": ""
					},
					"GT-PR": {
						"category": "department",
						"code": "GT-PR",
						"name": "El Progreso",
						"parent": ""
					},
					"GT-QC": {
						"category": "department",
						"code": "GT-QC",
						"name": "Quiché",
						"parent": ""
					},
					"GT-QZ": {
						"category": "department",
						"code": "GT-QZ",
						"name": "Quetzaltenango",
						"parent": ""
					},
					"GT-RE": {
						"category": "department",
						"code": "GT-RE",
						"name": "Retalhuleu",
						"parent": ""
					},
					"GT-SA": {
						"category": "department",
						"code": "GT-SA",
						"name": "Sacatepéquez",
						"parent": ""
					},
					"GT-SM": {
						"category": "department",
						"code": "GT-SM",
						"name": "San Marcos",
						"parent": ""
					},
					"GT-SO": {
						"category": "department",
						"code": "GT-SO",
						"name": "Sololá",
						"parent": ""
					},
					"GT-SR": {
						"category": "department",
						"code": "GT-SR",
						"name": "Santa Rosa",
						"parent": ""
					},
					"GT-SU": {
						"category": "department",
						"code": "GT-SU",
						"name": "Suchitepéquez",
						"parent": ""
					},
					"GT-TO": {
						"category": "department",
						"code": "GT-TO",
						"name": "Totonicapán",
						"parent": ""
					},
					"GT-ZA": {
						"category": "department",
						"code": "GT-ZA",
						"name": "Zacapa",
						"parent": ""
					}
				}
			},
			"GUF": {
				"threeLetterCode": "GUF",
				"shortName": "French Guiana",
				"shortNameUpperCase": "FRENCH GUIANA",
				"fullName": "French Guiana",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"GUM": {
				"threeLetterCode": "GUM",
				"shortName": "Guam",
				"shortNameUpperCase": "GUAM",
				"fullName": "Guam",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"GUY": {
				"threeLetterCode": "GUY",
				"shortName": "Guyana",
				"shortNameUpperCase": "GUYANA",
				"fullName": "the Republic of Guyana",
				"subdivisionLabel": "region",
				"subdivisions": {
					"GY-BA": {
						"category": "region",
						"code": "GY-BA",
						"name": "Barima-Waini",
						"parent": ""
					},
					"GY-CU": {
						"category": "region",
						"code": "GY-CU",
						"name": "Cuyuni-Mazaruni",
						"parent": ""
					},
					"GY-DE": {
						"category": "region",
						"code": "GY-DE",
						"name": "Demerara-Mahaica",
						"parent": ""
					},
					"GY-EB": {
						"category": "region",
						"code": "GY-EB",
						"name": "East Berbice-Corentyne",
						"parent": ""
					},
					"GY-ES": {
						"category": "region",
						"code": "GY-ES",
						"name": "Essequibo Islands-West Demerara",
						"parent": ""
					},
					"GY-MA": {
						"category": "region",
						"code": "GY-MA",
						"name": "Mahaica-Berbice",
						"parent": ""
					},
					"GY-PM": {
						"category": "region",
						"code": "GY-PM",
						"name": "Pomeroon-Supenaam",
						"parent": ""
					},
					"GY-PT": {
						"category": "region",
						"code": "GY-PT",
						"name": "Potaro-Siparuni",
						"parent": ""
					},
					"GY-UD": {
						"category": "region",
						"code": "GY-UD",
						"name": "Upper Demerara-Berbice",
						"parent": ""
					},
					"GY-UT": {
						"category": "region",
						"code": "GY-UT",
						"name": "Upper Takutu-Upper Essequibo",
						"parent": ""
					}
				}
			},
			"HKG": {
				"threeLetterCode": "HKG",
				"shortName": "Hong Kong",
				"shortNameUpperCase": "HONG KONG",
				"fullName": "the Hong Kong Special Administrative Region of China",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"HMD": {
				"threeLetterCode": "HMD",
				"shortName": "Heard Island and McDonald Islands",
				"shortNameUpperCase": "HEARD ISLAND AND MCDONALD ISLANDS",
				"fullName": "Heard Island and McDonald Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"HND": {
				"threeLetterCode": "HND",
				"shortName": "Honduras",
				"shortNameUpperCase": "HONDURAS",
				"fullName": "the Republic of Honduras",
				"subdivisionLabel": "department",
				"subdivisions": {
					"HN-AT": {
						"category": "department",
						"code": "HN-AT",
						"name": "Atlántida",
						"parent": ""
					},
					"HN-CH": {
						"category": "department",
						"code": "HN-CH",
						"name": "Choluteca",
						"parent": ""
					},
					"HN-CL": {
						"category": "department",
						"code": "HN-CL",
						"name": "Colón",
						"parent": ""
					},
					"HN-CM": {
						"category": "department",
						"code": "HN-CM",
						"name": "Comayagua",
						"parent": ""
					},
					"HN-CP": {
						"category": "department",
						"code": "HN-CP",
						"name": "Copán",
						"parent": ""
					},
					"HN-CR": {
						"category": "department",
						"code": "HN-CR",
						"name": "Cortés",
						"parent": ""
					},
					"HN-EP": {
						"category": "department",
						"code": "HN-EP",
						"name": "El Paraíso",
						"parent": ""
					},
					"HN-FM": {
						"category": "department",
						"code": "HN-FM",
						"name": "Francisco Morazán",
						"parent": ""
					},
					"HN-GD": {
						"category": "department",
						"code": "HN-GD",
						"name": "Gracias a Dios",
						"parent": ""
					},
					"HN-IB": {
						"category": "department",
						"code": "HN-IB",
						"name": "Islas de la Bahía",
						"parent": ""
					},
					"HN-IN": {
						"category": "department",
						"code": "HN-IN",
						"name": "Intibucá",
						"parent": ""
					},
					"HN-LE": {
						"category": "department",
						"code": "HN-LE",
						"name": "Lempira",
						"parent": ""
					},
					"HN-LP": {
						"category": "department",
						"code": "HN-LP",
						"name": "La Paz",
						"parent": ""
					},
					"HN-OC": {
						"category": "department",
						"code": "HN-OC",
						"name": "Ocotepeque",
						"parent": ""
					},
					"HN-OL": {
						"category": "department",
						"code": "HN-OL",
						"name": "Olancho",
						"parent": ""
					},
					"HN-SB": {
						"category": "department",
						"code": "HN-SB",
						"name": "Santa Bárbara",
						"parent": ""
					},
					"HN-VA": {
						"category": "department",
						"code": "HN-VA",
						"name": "Valle",
						"parent": ""
					},
					"HN-YO": {
						"category": "department",
						"code": "HN-YO",
						"name": "Yoro",
						"parent": ""
					}
				}
			},
			"HRV": {
				"threeLetterCode": "HRV",
				"shortName": "Croatia",
				"shortNameUpperCase": "CROATIA",
				"fullName": "the Republic of Croatia",
				"subdivisionLabel": "county",
				"subdivisions": {
					"HR-01": {
						"category": "county",
						"code": "HR-01",
						"name": "Zagrebačka županija",
						"parent": ""
					},
					"HR-02": {
						"category": "county",
						"code": "HR-02",
						"name": "Krapinsko-zagorska županija",
						"parent": ""
					},
					"HR-03": {
						"category": "county",
						"code": "HR-03",
						"name": "Sisačko-moslavačka županija",
						"parent": ""
					},
					"HR-04": {
						"category": "county",
						"code": "HR-04",
						"name": "Karlovačka županija",
						"parent": ""
					},
					"HR-05": {
						"category": "county",
						"code": "HR-05",
						"name": "Varaždinska županija",
						"parent": ""
					},
					"HR-06": {
						"category": "county",
						"code": "HR-06",
						"name": "Koprivničko-križevačka županija",
						"parent": ""
					},
					"HR-07": {
						"category": "county",
						"code": "HR-07",
						"name": "Bjelovarsko-bilogorska županija",
						"parent": ""
					},
					"HR-08": {
						"category": "county",
						"code": "HR-08",
						"name": "Primorsko-goranska županija",
						"parent": ""
					},
					"HR-09": {
						"category": "county",
						"code": "HR-09",
						"name": "Ličko-senjska županija",
						"parent": ""
					},
					"HR-10": {
						"category": "county",
						"code": "HR-10",
						"name": "Virovitičko-podravska županija",
						"parent": ""
					},
					"HR-11": {
						"category": "county",
						"code": "HR-11",
						"name": "Požeško-slavonska županija",
						"parent": ""
					},
					"HR-12": {
						"category": "county",
						"code": "HR-12",
						"name": "Brodsko-posavska županija",
						"parent": ""
					},
					"HR-13": {
						"category": "county",
						"code": "HR-13",
						"name": "Zadarska županija",
						"parent": ""
					},
					"HR-14": {
						"category": "county",
						"code": "HR-14",
						"name": "Osječko-baranjska županija",
						"parent": ""
					},
					"HR-15": {
						"category": "county",
						"code": "HR-15",
						"name": "Šibensko-kninska županija",
						"parent": ""
					},
					"HR-16": {
						"category": "county",
						"code": "HR-16",
						"name": "Vukovarsko-srijemska županija",
						"parent": ""
					},
					"HR-17": {
						"category": "county",
						"code": "HR-17",
						"name": "Splitsko-dalmatinska županija",
						"parent": ""
					},
					"HR-18": {
						"category": "county",
						"code": "HR-18",
						"name": "Istarska županija",
						"parent": ""
					},
					"HR-19": {
						"category": "county",
						"code": "HR-19",
						"name": "Dubrovačko-neretvanska županija",
						"parent": ""
					},
					"HR-20": {
						"category": "county",
						"code": "HR-20",
						"name": "Međimurska županija",
						"parent": ""
					},
					"HR-21": {
						"category": "city",
						"code": "HR-21",
						"name": "Grad Zagreb",
						"parent": ""
					}
				}
			},
			"HTI": {
				"threeLetterCode": "HTI",
				"shortName": "Haiti",
				"shortNameUpperCase": "HAITI",
				"fullName": "the Republic of Haiti",
				"subdivisionLabel": "department",
				"subdivisions": {
					"HT-AR": {
						"category": "department",
						"code": "HT-AR",
						"name": "Artibonite",
						"parent": ""
					},
					"HT-CE": {
						"category": "department",
						"code": "HT-CE",
						"name": "Centre",
						"parent": ""
					},
					"HT-GA": {
						"category": "department",
						"code": "HT-GA",
						"name": "Grande’Anse",
						"parent": ""
					},
					"HT-ND": {
						"category": "department",
						"code": "HT-ND",
						"name": "Nord",
						"parent": ""
					},
					"HT-NE": {
						"category": "department",
						"code": "HT-NE",
						"name": "Nord-Est",
						"parent": ""
					},
					"HT-NI": {
						"category": "department",
						"code": "HT-NI",
						"name": "Nippes",
						"parent": ""
					},
					"HT-NO": {
						"category": "department",
						"code": "HT-NO",
						"name": "Nord-Ouest",
						"parent": ""
					},
					"HT-OU": {
						"category": "department",
						"code": "HT-OU",
						"name": "Ouest",
						"parent": ""
					},
					"HT-SD": {
						"category": "department",
						"code": "HT-SD",
						"name": "Sud",
						"parent": ""
					},
					"HT-SE": {
						"category": "department",
						"code": "HT-SE",
						"name": "Sud-Est",
						"parent": ""
					}
				}
			},
			"HUN": {
				"threeLetterCode": "HUN",
				"shortName": "Hungary",
				"shortNameUpperCase": "HUNGARY",
				"fullName": "Hungary",
				"subdivisionLabel": "city with county rights",
				"subdivisions": {
					"HU-BA": {
						"category": "county",
						"code": "HU-BA",
						"name": "Baranya",
						"parent": ""
					},
					"HU-BC": {
						"category": "city with county rights",
						"code": "HU-BC",
						"name": "Békéscsaba",
						"parent": ""
					},
					"HU-BE": {
						"category": "county",
						"code": "HU-BE",
						"name": "Békés",
						"parent": ""
					},
					"HU-BK": {
						"category": "county",
						"code": "HU-BK",
						"name": "Bács-Kiskun",
						"parent": ""
					},
					"HU-BU": {
						"category": "capital city",
						"code": "HU-BU",
						"name": "Budapest",
						"parent": ""
					},
					"HU-BZ": {
						"category": "county",
						"code": "HU-BZ",
						"name": "Borsod-Abaúj-Zemplén",
						"parent": ""
					},
					"HU-CS": {
						"category": "county",
						"code": "HU-CS",
						"name": "Csongrád",
						"parent": ""
					},
					"HU-DE": {
						"category": "city with county rights",
						"code": "HU-DE",
						"name": "Debrecen",
						"parent": ""
					},
					"HU-DU": {
						"category": "city with county rights",
						"code": "HU-DU",
						"name": "Dunaújváros",
						"parent": ""
					},
					"HU-EG": {
						"category": "city with county rights",
						"code": "HU-EG",
						"name": "Eger",
						"parent": ""
					},
					"HU-ER": {
						"category": "city with county rights",
						"code": "HU-ER",
						"name": "Érd",
						"parent": ""
					},
					"HU-FE": {
						"category": "county",
						"code": "HU-FE",
						"name": "Fejér",
						"parent": ""
					},
					"HU-GS": {
						"category": "county",
						"code": "HU-GS",
						"name": "Győr-Moson-Sopron",
						"parent": ""
					},
					"HU-GY": {
						"category": "city with county rights",
						"code": "HU-GY",
						"name": "Győr",
						"parent": ""
					},
					"HU-HB": {
						"category": "county",
						"code": "HU-HB",
						"name": "Hajdú-Bihar",
						"parent": ""
					},
					"HU-HE": {
						"category": "county",
						"code": "HU-HE",
						"name": "Heves",
						"parent": ""
					},
					"HU-HV": {
						"category": "city with county rights",
						"code": "HU-HV",
						"name": "Hódmezővásárhely",
						"parent": ""
					},
					"HU-JN": {
						"category": "county",
						"code": "HU-JN",
						"name": "Jász-Nagykun-Szolnok",
						"parent": ""
					},
					"HU-KE": {
						"category": "county",
						"code": "HU-KE",
						"name": "Komárom-Esztergom",
						"parent": ""
					},
					"HU-KM": {
						"category": "city with county rights",
						"code": "HU-KM",
						"name": "Kecskemét",
						"parent": ""
					},
					"HU-KV": {
						"category": "city with county rights",
						"code": "HU-KV",
						"name": "Kaposvár",
						"parent": ""
					},
					"HU-MI": {
						"category": "city with county rights",
						"code": "HU-MI",
						"name": "Miskolc",
						"parent": ""
					},
					"HU-NK": {
						"category": "city with county rights",
						"code": "HU-NK",
						"name": "Nagykanizsa",
						"parent": ""
					},
					"HU-NO": {
						"category": "county",
						"code": "HU-NO",
						"name": "Nógrád",
						"parent": ""
					},
					"HU-NY": {
						"category": "city with county rights",
						"code": "HU-NY",
						"name": "Nyíregyháza",
						"parent": ""
					},
					"HU-PE": {
						"category": "county",
						"code": "HU-PE",
						"name": "Pest",
						"parent": ""
					},
					"HU-PS": {
						"category": "city with county rights",
						"code": "HU-PS",
						"name": "Pécs",
						"parent": ""
					},
					"HU-SD": {
						"category": "city with county rights",
						"code": "HU-SD",
						"name": "Szeged",
						"parent": ""
					},
					"HU-SF": {
						"category": "city with county rights",
						"code": "HU-SF",
						"name": "Székesfehérvár",
						"parent": ""
					},
					"HU-SH": {
						"category": "city with county rights",
						"code": "HU-SH",
						"name": "Szombathely",
						"parent": ""
					},
					"HU-SK": {
						"category": "city with county rights",
						"code": "HU-SK",
						"name": "Szolnok",
						"parent": ""
					},
					"HU-SN": {
						"category": "city with county rights",
						"code": "HU-SN",
						"name": "Sopron",
						"parent": ""
					},
					"HU-SO": {
						"category": "county",
						"code": "HU-SO",
						"name": "Somogy",
						"parent": ""
					},
					"HU-SS": {
						"category": "city with county rights",
						"code": "HU-SS",
						"name": "Szekszárd",
						"parent": ""
					},
					"HU-ST": {
						"category": "city with county rights",
						"code": "HU-ST",
						"name": "Salgótarján",
						"parent": ""
					},
					"HU-SZ": {
						"category": "county",
						"code": "HU-SZ",
						"name": "Szabolcs-Szatmár-Bereg",
						"parent": ""
					},
					"HU-TB": {
						"category": "city with county rights",
						"code": "HU-TB",
						"name": "Tatabánya",
						"parent": ""
					},
					"HU-TO": {
						"category": "county",
						"code": "HU-TO",
						"name": "Tolna",
						"parent": ""
					},
					"HU-VA": {
						"category": "county",
						"code": "HU-VA",
						"name": "Vas",
						"parent": ""
					},
					"HU-VE": {
						"category": "county",
						"code": "HU-VE",
						"name": "Veszprém",
						"parent": ""
					},
					"HU-VM": {
						"category": "city with county rights",
						"code": "HU-VM",
						"name": "Veszprém",
						"parent": ""
					},
					"HU-ZA": {
						"category": "county",
						"code": "HU-ZA",
						"name": "Zala",
						"parent": ""
					},
					"HU-ZE": {
						"category": "city with county rights",
						"code": "HU-ZE",
						"name": "Zalaegerszeg",
						"parent": ""
					}
				}
			},
			"IDN": {
				"threeLetterCode": "IDN",
				"shortName": "Indonesia",
				"shortNameUpperCase": "INDONESIA",
				"fullName": "the Republic of Indonesia",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"ID-AC": {
						"category": "province",
						"code": "ID-AC",
						"name": "Aceh",
						"parent": "ID-SM"
					},
					"ID-BA": {
						"category": "province",
						"code": "ID-BA",
						"name": "Bali",
						"parent": "ID-NU"
					},
					"ID-BB": {
						"category": "province",
						"code": "ID-BB",
						"name": "Kepulauan Bangka Belitung",
						"parent": "ID-SM"
					},
					"ID-BE": {
						"category": "province",
						"code": "ID-BE",
						"name": "Bengkulu",
						"parent": "ID-SM"
					},
					"ID-BT": {
						"category": "province",
						"code": "ID-BT",
						"name": "Banten",
						"parent": "ID-JW"
					},
					"ID-GO": {
						"category": "province",
						"code": "ID-GO",
						"name": "Gorontalo",
						"parent": "ID-SL"
					},
					"ID-JA": {
						"category": "province",
						"code": "ID-JA",
						"name": "Jambi",
						"parent": "ID-SM"
					},
					"ID-JB": {
						"category": "province",
						"code": "ID-JB",
						"name": "Jawa Barat",
						"parent": "ID-JW"
					},
					"ID-JI": {
						"category": "province",
						"code": "ID-JI",
						"name": "Jawa Timur",
						"parent": "ID-JW"
					},
					"ID-JK": {
						"category": "capital district",
						"code": "ID-JK",
						"name": "Jakarta Raya",
						"parent": "ID-JW"
					},
					"ID-JT": {
						"category": "province",
						"code": "ID-JT",
						"name": "Jawa Tengah",
						"parent": "ID-JW"
					},
					"ID-JW": {
						"category": "geographical unit",
						"code": "ID-JW",
						"name": "Jawa",
						"parent": ""
					},
					"ID-KA": {
						"category": "geographical unit",
						"code": "ID-KA",
						"name": "Kalimantan",
						"parent": ""
					},
					"ID-KB": {
						"category": "province",
						"code": "ID-KB",
						"name": "Kalimantan Barat",
						"parent": "ID-KA"
					},
					"ID-KI": {
						"category": "province",
						"code": "ID-KI",
						"name": "Kalimantan Timur",
						"parent": "ID-KA"
					},
					"ID-KR": {
						"category": "province",
						"code": "ID-KR",
						"name": "Kepulauan Riau",
						"parent": "ID-SM"
					},
					"ID-KS": {
						"category": "province",
						"code": "ID-KS",
						"name": "Kalimantan Selatan",
						"parent": "ID-KA"
					},
					"ID-KT": {
						"category": "province",
						"code": "ID-KT",
						"name": "Kalimantan Tengah",
						"parent": "ID-KA"
					},
					"ID-KU": {
						"category": "province",
						"code": "ID-KU",
						"name": "Kalimantan Utara",
						"parent": "ID-KA"
					},
					"ID-LA": {
						"category": "province",
						"code": "ID-LA",
						"name": "Lampung",
						"parent": "ID-SM"
					},
					"ID-MA": {
						"category": "province",
						"code": "ID-MA",
						"name": "Maluku",
						"parent": "ID-ML"
					},
					"ID-ML": {
						"category": "geographical unit",
						"code": "ID-ML",
						"name": "Maluku",
						"parent": ""
					},
					"ID-MU": {
						"category": "province",
						"code": "ID-MU",
						"name": "Maluku Utara",
						"parent": "ID-ML"
					},
					"ID-NB": {
						"category": "province",
						"code": "ID-NB",
						"name": "Nusa Tenggara Barat",
						"parent": "ID-NU"
					},
					"ID-NT": {
						"category": "province",
						"code": "ID-NT",
						"name": "Nusa Tenggara Timur",
						"parent": "ID-NU"
					},
					"ID-NU": {
						"category": "geographical unit",
						"code": "ID-NU",
						"name": "Nusa Tenggara",
						"parent": ""
					},
					"ID-PA": {
						"category": "province",
						"code": "ID-PA",
						"name": "Papua",
						"parent": "ID-PP"
					},
					"ID-PB": {
						"category": "province",
						"code": "ID-PB",
						"name": "Papua Barat",
						"parent": "ID-PP"
					},
					"ID-PP": {
						"category": "geographical unit",
						"code": "ID-PP",
						"name": "Papua",
						"parent": ""
					},
					"ID-RI": {
						"category": "province",
						"code": "ID-RI",
						"name": "Riau",
						"parent": "ID-SM"
					},
					"ID-SA": {
						"category": "province",
						"code": "ID-SA",
						"name": "Sulawesi Utara",
						"parent": "ID-SL"
					},
					"ID-SB": {
						"category": "province",
						"code": "ID-SB",
						"name": "Sumatera Barat",
						"parent": "ID-SM"
					},
					"ID-SG": {
						"category": "province",
						"code": "ID-SG",
						"name": "Sulawesi Tenggara",
						"parent": "ID-SL"
					},
					"ID-SL": {
						"category": "geographical unit",
						"code": "ID-SL",
						"name": "Sulawesi",
						"parent": ""
					},
					"ID-SM": {
						"category": "geographical unit",
						"code": "ID-SM",
						"name": "Sumatera",
						"parent": ""
					},
					"ID-SN": {
						"category": "province",
						"code": "ID-SN",
						"name": "Sulawesi Selatan",
						"parent": "ID-SL"
					},
					"ID-SR": {
						"category": "province",
						"code": "ID-SR",
						"name": "Sulawesi Barat",
						"parent": "ID-SL"
					},
					"ID-SS": {
						"category": "province",
						"code": "ID-SS",
						"name": "Sumatera Selatan",
						"parent": "ID-SM"
					},
					"ID-ST": {
						"category": "province",
						"code": "ID-ST",
						"name": "Sulawesi Tengah",
						"parent": "ID-SL"
					},
					"ID-SU": {
						"category": "province",
						"code": "ID-SU",
						"name": "Sumatera Utara",
						"parent": "ID-SM"
					},
					"ID-YO": {
						"category": "special region",
						"code": "ID-YO",
						"name": "Yogyakarta",
						"parent": "ID-JW"
					}
				}
			},
			"IMN": {
				"threeLetterCode": "IMN",
				"shortName": "Isle of Man",
				"shortNameUpperCase": "ISLE OF MAN",
				"fullName": "Isle of Man",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"IND": {
				"threeLetterCode": "IND",
				"shortName": "India",
				"shortNameUpperCase": "INDIA",
				"fullName": "the Republic of India",
				"subdivisionLabel": "state",
				"subdivisions": {
					"IN-AN": {
						"category": "Union territory",
						"code": "IN-AN",
						"name": "Andaman and Nicobar Islands",
						"parent": ""
					},
					"IN-AP": {
						"category": "state",
						"code": "IN-AP",
						"name": "Andhra Pradesh",
						"parent": ""
					},
					"IN-AR": {
						"category": "state",
						"code": "IN-AR",
						"name": "Arunachal Pradesh",
						"parent": ""
					},
					"IN-AS": {
						"category": "state",
						"code": "IN-AS",
						"name": "Assam",
						"parent": ""
					},
					"IN-BR": {
						"category": "state",
						"code": "IN-BR",
						"name": "Bihar",
						"parent": ""
					},
					"IN-CH": {
						"category": "Union territory",
						"code": "IN-CH",
						"name": "Chandigarh",
						"parent": ""
					},
					"IN-CT": {
						"category": "state",
						"code": "IN-CT",
						"name": "Chhattisgarh",
						"parent": ""
					},
					"IN-DD": {
						"category": "Union territory",
						"code": "IN-DD",
						"name": "Daman and Diu",
						"parent": ""
					},
					"IN-DL": {
						"category": "Union territory",
						"code": "IN-DL",
						"name": "Delhi",
						"parent": ""
					},
					"IN-DN": {
						"category": "Union territory",
						"code": "IN-DN",
						"name": "Dadra and Nagar Haveli",
						"parent": ""
					},
					"IN-GA": {
						"category": "state",
						"code": "IN-GA",
						"name": "Goa",
						"parent": ""
					},
					"IN-GJ": {
						"category": "state",
						"code": "IN-GJ",
						"name": "Gujarat",
						"parent": ""
					},
					"IN-HP": {
						"category": "state",
						"code": "IN-HP",
						"name": "Himachal Pradesh",
						"parent": ""
					},
					"IN-HR": {
						"category": "state",
						"code": "IN-HR",
						"name": "Haryana",
						"parent": ""
					},
					"IN-JH": {
						"category": "state",
						"code": "IN-JH",
						"name": "Jharkhand",
						"parent": ""
					},
					"IN-JK": {
						"category": "state",
						"code": "IN-JK",
						"name": "Jammu and Kashmir",
						"parent": ""
					},
					"IN-KA": {
						"category": "state",
						"code": "IN-KA",
						"name": "Karnataka",
						"parent": ""
					},
					"IN-KL": {
						"category": "state",
						"code": "IN-KL",
						"name": "Kerala",
						"parent": ""
					},
					"IN-LD": {
						"category": "Union territory",
						"code": "IN-LD",
						"name": "Lakshadweep",
						"parent": ""
					},
					"IN-MH": {
						"category": "state",
						"code": "IN-MH",
						"name": "Maharashtra",
						"parent": ""
					},
					"IN-ML": {
						"category": "state",
						"code": "IN-ML",
						"name": "Meghalaya",
						"parent": ""
					},
					"IN-MN": {
						"category": "state",
						"code": "IN-MN",
						"name": "Manipur",
						"parent": ""
					},
					"IN-MP": {
						"category": "state",
						"code": "IN-MP",
						"name": "Madhya Pradesh",
						"parent": ""
					},
					"IN-MZ": {
						"category": "state",
						"code": "IN-MZ",
						"name": "Mizoram",
						"parent": ""
					},
					"IN-NL": {
						"category": "state",
						"code": "IN-NL",
						"name": "Nagaland",
						"parent": ""
					},
					"IN-OR": {
						"category": "state",
						"code": "IN-OR",
						"name": "Odisha",
						"parent": ""
					},
					"IN-PB": {
						"category": "state",
						"code": "IN-PB",
						"name": "Punjab",
						"parent": ""
					},
					"IN-PY": {
						"category": "Union territory",
						"code": "IN-PY",
						"name": "Puducherry",
						"parent": ""
					},
					"IN-RJ": {
						"category": "state",
						"code": "IN-RJ",
						"name": "Rajasthan",
						"parent": ""
					},
					"IN-SK": {
						"category": "state",
						"code": "IN-SK",
						"name": "Sikkim",
						"parent": ""
					},
					"IN-TG": {
						"category": "state",
						"code": "IN-TG",
						"name": "Telangana",
						"parent": ""
					},
					"IN-TN": {
						"category": "state",
						"code": "IN-TN",
						"name": "Tamil Nadu",
						"parent": ""
					},
					"IN-TR": {
						"category": "state",
						"code": "IN-TR",
						"name": "Tripura",
						"parent": ""
					},
					"IN-UP": {
						"category": "state",
						"code": "IN-UP",
						"name": "Uttar Pradesh",
						"parent": ""
					},
					"IN-UT": {
						"category": "state",
						"code": "IN-UT",
						"name": "Uttarakhand",
						"parent": ""
					},
					"IN-WB": {
						"category": "state",
						"code": "IN-WB",
						"name": "West Bengal",
						"parent": ""
					}
				}
			},
			"IOT": {
				"commonName": "British Indian Ocean Territory",
				"threeLetterCode": "IOT",
				"shortName": "British Indian Ocean Territory (the)",
				"shortNameUpperCase": "BRITISH INDIAN OCEAN TERRITORY",
				"fullName": "the British Indian Ocean Territory",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"IRL": {
				"threeLetterCode": "IRL",
				"shortName": "Ireland",
				"shortNameUpperCase": "IRELAND",
				"fullName": "Ireland",
				"subdivisionLabel": "county",
				"subdivisions": {
					"IE-C": {
						"category": "province",
						"code": "IE-C",
						"name": "Connaught",
						"parent": ""
					},
					"IE-CE": {
						"category": "county",
						"code": "IE-CE",
						"name": "Clare",
						"parent": "IE-M"
					},
					"IE-CN": {
						"category": "county",
						"code": "IE-CN",
						"name": "Cavan",
						"parent": "IE-U"
					},
					"IE-CO": {
						"category": "county",
						"code": "IE-CO",
						"name": "Cork",
						"parent": "IE-M"
					},
					"IE-CW": {
						"category": "county",
						"code": "IE-CW",
						"name": "Carlow",
						"parent": "IE-L"
					},
					"IE-D": {
						"category": "county",
						"code": "IE-D",
						"name": "Dublin",
						"parent": "IE-L"
					},
					"IE-DL": {
						"category": "county",
						"code": "IE-DL",
						"name": "Donegal",
						"parent": "IE-U"
					},
					"IE-G": {
						"category": "county",
						"code": "IE-G",
						"name": "Galway",
						"parent": "IE-C"
					},
					"IE-KE": {
						"category": "county",
						"code": "IE-KE",
						"name": "Kildare",
						"parent": "IE-L"
					},
					"IE-KK": {
						"category": "county",
						"code": "IE-KK",
						"name": "Kilkenny",
						"parent": "IE-L"
					},
					"IE-KY": {
						"category": "county",
						"code": "IE-KY",
						"name": "Kerry",
						"parent": "IE-M"
					},
					"IE-L": {
						"category": "province",
						"code": "IE-L",
						"name": "Leinster",
						"parent": ""
					},
					"IE-LD": {
						"category": "county",
						"code": "IE-LD",
						"name": "Longford",
						"parent": "IE-L"
					},
					"IE-LH": {
						"category": "county",
						"code": "IE-LH",
						"name": "Louth",
						"parent": "IE-L"
					},
					"IE-LK": {
						"category": "county",
						"code": "IE-LK",
						"name": "Limerick",
						"parent": "IE-M"
					},
					"IE-LM": {
						"category": "county",
						"code": "IE-LM",
						"name": "Leitrim",
						"parent": "IE-C"
					},
					"IE-LS": {
						"category": "county",
						"code": "IE-LS",
						"name": "Laois",
						"parent": "IE-L"
					},
					"IE-M": {
						"category": "province",
						"code": "IE-M",
						"name": "Munster",
						"parent": ""
					},
					"IE-MH": {
						"category": "county",
						"code": "IE-MH",
						"name": "Meath",
						"parent": "IE-L"
					},
					"IE-MN": {
						"category": "county",
						"code": "IE-MN",
						"name": "Monaghan",
						"parent": "IE-U"
					},
					"IE-MO": {
						"category": "county",
						"code": "IE-MO",
						"name": "Mayo",
						"parent": "IE-C"
					},
					"IE-OY": {
						"category": "county",
						"code": "IE-OY",
						"name": "Offaly",
						"parent": "IE-L"
					},
					"IE-RN": {
						"category": "county",
						"code": "IE-RN",
						"name": "Roscommon",
						"parent": "IE-C"
					},
					"IE-SO": {
						"category": "county",
						"code": "IE-SO",
						"name": "Sligo",
						"parent": "IE-C"
					},
					"IE-TA": {
						"category": "county",
						"code": "IE-TA",
						"name": "Tipperary",
						"parent": "IE-M"
					},
					"IE-U": {
						"category": "province",
						"code": "IE-U",
						"name": "Ulster",
						"parent": ""
					},
					"IE-WD": {
						"category": "county",
						"code": "IE-WD",
						"name": "Waterford",
						"parent": "IE-M"
					},
					"IE-WH": {
						"category": "county",
						"code": "IE-WH",
						"name": "Westmeath",
						"parent": "IE-L"
					},
					"IE-WW": {
						"category": "county",
						"code": "IE-WW",
						"name": "Wicklow",
						"parent": "IE-L"
					},
					"IE-WX": {
						"category": "county",
						"code": "IE-WX",
						"name": "Wexford",
						"parent": "IE-L"
					}
				}
			},
			"IRN": {
				"commonName": "Iran",
				"threeLetterCode": "IRN",
				"shortName": "Iran (Islamic Republic of)",
				"shortNameUpperCase": "IRAN (ISLAMIC REPUBLIC OF)",
				"fullName": "the Islamic Republic of Iran",
				"subdivisionLabel": "province",
				"subdivisions": {
					"IR-01": {
						"category": "province",
						"code": "IR-01",
						"name": "Āz̄ārbāyjān-e Shārqī",
						"parent": ""
					},
					"IR-02": {
						"category": "province",
						"code": "IR-02",
						"name": "Āz̄ārbāyjān-e Ghārbī",
						"parent": ""
					},
					"IR-03": {
						"category": "province",
						"code": "IR-03",
						"name": "Ardabīl",
						"parent": ""
					},
					"IR-04": {
						"category": "province",
						"code": "IR-04",
						"name": "Eşfahān",
						"parent": ""
					},
					"IR-05": {
						"category": "province",
						"code": "IR-05",
						"name": "Īlām",
						"parent": ""
					},
					"IR-06": {
						"category": "province",
						"code": "IR-06",
						"name": "Būshehr",
						"parent": ""
					},
					"IR-07": {
						"category": "province",
						"code": "IR-07",
						"name": "Tehrān",
						"parent": ""
					},
					"IR-08": {
						"category": "province",
						"code": "IR-08",
						"name": "Chahār Maḩāl va Bakhtīārī",
						"parent": ""
					},
					"IR-10": {
						"category": "province",
						"code": "IR-10",
						"name": "Khūzestān",
						"parent": ""
					},
					"IR-11": {
						"category": "province",
						"code": "IR-11",
						"name": "Zanjān",
						"parent": ""
					},
					"IR-12": {
						"category": "province",
						"code": "IR-12",
						"name": "Semnān",
						"parent": ""
					},
					"IR-13": {
						"category": "province",
						"code": "IR-13",
						"name": "Sīstān va Balūchestān",
						"parent": ""
					},
					"IR-14": {
						"category": "province",
						"code": "IR-14",
						"name": "Fārs",
						"parent": ""
					},
					"IR-15": {
						"category": "province",
						"code": "IR-15",
						"name": "Kermān",
						"parent": ""
					},
					"IR-16": {
						"category": "province",
						"code": "IR-16",
						"name": "Kordestān",
						"parent": ""
					},
					"IR-17": {
						"category": "province",
						"code": "IR-17",
						"name": "Kermānshāh",
						"parent": ""
					},
					"IR-18": {
						"category": "province",
						"code": "IR-18",
						"name": "Kohgīlūyeh va Bowyer Aḩmad",
						"parent": ""
					},
					"IR-19": {
						"category": "province",
						"code": "IR-19",
						"name": "Gīlān",
						"parent": ""
					},
					"IR-20": {
						"category": "province",
						"code": "IR-20",
						"name": "Lorestān",
						"parent": ""
					},
					"IR-21": {
						"category": "province",
						"code": "IR-21",
						"name": "Māzandarān",
						"parent": ""
					},
					"IR-22": {
						"category": "province",
						"code": "IR-22",
						"name": "Markazī",
						"parent": ""
					},
					"IR-23": {
						"category": "province",
						"code": "IR-23",
						"name": "Hormozgān",
						"parent": ""
					},
					"IR-24": {
						"category": "province",
						"code": "IR-24",
						"name": "Hamadān",
						"parent": ""
					},
					"IR-25": {
						"category": "province",
						"code": "IR-25",
						"name": "Yazd",
						"parent": ""
					},
					"IR-26": {
						"category": "province",
						"code": "IR-26",
						"name": "Qom",
						"parent": ""
					},
					"IR-27": {
						"category": "province",
						"code": "IR-27",
						"name": "Golestān",
						"parent": ""
					},
					"IR-28": {
						"category": "province",
						"code": "IR-28",
						"name": "Qazvīn",
						"parent": ""
					},
					"IR-29": {
						"category": "province",
						"code": "IR-29",
						"name": "Khorāsān-e Jonūbī",
						"parent": ""
					},
					"IR-30": {
						"category": "province",
						"code": "IR-30",
						"name": "Khorāsān-e Raẕavī",
						"parent": ""
					},
					"IR-31": {
						"category": "province",
						"code": "IR-31",
						"name": "Khorāsān-e Shomālī",
						"parent": ""
					},
					"IR-32": {
						"category": "province",
						"code": "IR-32",
						"name": "Alborz",
						"parent": ""
					}
				}
			},
			"IRQ": {
				"threeLetterCode": "IRQ",
				"shortName": "Iraq",
				"shortNameUpperCase": "IRAQ",
				"fullName": "the Republic of Iraq",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"IQ-AN": {
						"category": "governorate",
						"code": "IQ-AN",
						"name": "Al Anbār",
						"parent": ""
					},
					"IQ-AR": {
						"category": "governorate",
						"code": "IQ-AR",
						"name": "Arbīl",
						"parent": ""
					},
					"IQ-BA": {
						"category": "governorate",
						"code": "IQ-BA",
						"name": "Al Başrah",
						"parent": ""
					},
					"IQ-BB": {
						"category": "governorate",
						"code": "IQ-BB",
						"name": "Bābil",
						"parent": ""
					},
					"IQ-BG": {
						"category": "governorate",
						"code": "IQ-BG",
						"name": "Baghdād",
						"parent": ""
					},
					"IQ-DA": {
						"category": "governorate",
						"code": "IQ-DA",
						"name": "Dahūk",
						"parent": ""
					},
					"IQ-DI": {
						"category": "governorate",
						"code": "IQ-DI",
						"name": "Diyālá",
						"parent": ""
					},
					"IQ-DQ": {
						"category": "governorate",
						"code": "IQ-DQ",
						"name": "Dhī Qār",
						"parent": ""
					},
					"IQ-KA": {
						"category": "governorate",
						"code": "IQ-KA",
						"name": "Karbalā’",
						"parent": ""
					},
					"IQ-KI": {
						"category": "governorate",
						"code": "IQ-KI",
						"name": "Kirkūk",
						"parent": ""
					},
					"IQ-MA": {
						"category": "governorate",
						"code": "IQ-MA",
						"name": "Maysān",
						"parent": ""
					},
					"IQ-MU": {
						"category": "governorate",
						"code": "IQ-MU",
						"name": "Al Muthanná",
						"parent": ""
					},
					"IQ-NA": {
						"category": "governorate",
						"code": "IQ-NA",
						"name": "An Najaf",
						"parent": ""
					},
					"IQ-NI": {
						"category": "governorate",
						"code": "IQ-NI",
						"name": "Nīnawá",
						"parent": ""
					},
					"IQ-QA": {
						"category": "governorate",
						"code": "IQ-QA",
						"name": "Al Qādisīyah",
						"parent": ""
					},
					"IQ-SD": {
						"category": "governorate",
						"code": "IQ-SD",
						"name": "Şalāḩ ad Dīn",
						"parent": ""
					},
					"IQ-SU": {
						"category": "governorate",
						"code": "IQ-SU",
						"name": "As Sulaymānīyah",
						"parent": ""
					},
					"IQ-WA": {
						"category": "governorate",
						"code": "IQ-WA",
						"name": "Wāsiţ",
						"parent": ""
					}
				}
			},
			"ISL": {
				"threeLetterCode": "ISL",
				"shortName": "Iceland",
				"shortNameUpperCase": "ICELAND",
				"fullName": "the Republic of Iceland",
				"subdivisionLabel": "region",
				"subdivisions": {
					"IS-1": {
						"category": "region",
						"code": "IS-1",
						"name": "Höfuðborgarsvæði",
						"parent": ""
					},
					"IS-2": {
						"category": "region",
						"code": "IS-2",
						"name": "Suðurnes",
						"parent": ""
					},
					"IS-3": {
						"category": "region",
						"code": "IS-3",
						"name": "Vesturland",
						"parent": ""
					},
					"IS-4": {
						"category": "region",
						"code": "IS-4",
						"name": "Vestfirðir",
						"parent": ""
					},
					"IS-5": {
						"category": "region",
						"code": "IS-5",
						"name": "Norðurland vestra",
						"parent": ""
					},
					"IS-6": {
						"category": "region",
						"code": "IS-6",
						"name": "Norðurland eystra",
						"parent": ""
					},
					"IS-7": {
						"category": "region",
						"code": "IS-7",
						"name": "Austurland",
						"parent": ""
					},
					"IS-8": {
						"category": "region",
						"code": "IS-8",
						"name": "Suðurland",
						"parent": ""
					}
				}
			},
			"ISR": {
				"threeLetterCode": "ISR",
				"shortName": "Israel",
				"shortNameUpperCase": "ISRAEL",
				"fullName": "the State of Israel",
				"subdivisionLabel": "district",
				"subdivisions": {
					"IL-D": {
						"category": "district",
						"code": "IL-D",
						"name": "Al Janūbī",
						"parent": ""
					},
					"IL-HA": {
						"category": "district",
						"code": "IL-HA",
						"name": "Ḩayfā",
						"parent": ""
					},
					"IL-JM": {
						"category": "district",
						"code": "IL-JM",
						"name": "Al Quds",
						"parent": ""
					},
					"IL-M": {
						"category": "district",
						"code": "IL-M",
						"name": "Al Awsaţ",
						"parent": ""
					},
					"IL-TA": {
						"category": "district",
						"code": "IL-TA",
						"name": "Tall Abīb",
						"parent": ""
					},
					"IL-Z": {
						"category": "district",
						"code": "IL-Z",
						"name": "Ash Shamālī",
						"parent": ""
					}
				}
			},
			"ITA": {
				"threeLetterCode": "ITA",
				"shortName": "Italy",
				"shortNameUpperCase": "ITALY",
				"fullName": "the Republic of Italy",
				"subdivisionLabel": "province",
				"subdivisions": {
					"IT-21": {
						"category": "region",
						"code": "IT-21",
						"name": "Piemonte",
						"parent": ""
					},
					"IT-23": {
						"category": "region",
						"code": "IT-23",
						"name": "Val d'Aoste",
						"parent": ""
					},
					"IT-25": {
						"category": "region",
						"code": "IT-25",
						"name": "Lombardia",
						"parent": ""
					},
					"IT-32": {
						"category": "region",
						"code": "IT-32",
						"name": "Trentino-Südtirol",
						"parent": ""
					},
					"IT-34": {
						"category": "region",
						"code": "IT-34",
						"name": "Veneto",
						"parent": ""
					},
					"IT-36": {
						"category": "region",
						"code": "IT-36",
						"name": "Friuli-Venezia Giulia",
						"parent": ""
					},
					"IT-42": {
						"category": "region",
						"code": "IT-42",
						"name": "Liguria",
						"parent": ""
					},
					"IT-45": {
						"category": "region",
						"code": "IT-45",
						"name": "Emilia-Romagna",
						"parent": ""
					},
					"IT-52": {
						"category": "region",
						"code": "IT-52",
						"name": "Toscana",
						"parent": ""
					},
					"IT-55": {
						"category": "region",
						"code": "IT-55",
						"name": "Umbria",
						"parent": ""
					},
					"IT-57": {
						"category": "region",
						"code": "IT-57",
						"name": "Marche",
						"parent": ""
					},
					"IT-62": {
						"category": "region",
						"code": "IT-62",
						"name": "Lazio",
						"parent": ""
					},
					"IT-65": {
						"category": "region",
						"code": "IT-65",
						"name": "Abruzzo",
						"parent": ""
					},
					"IT-67": {
						"category": "region",
						"code": "IT-67",
						"name": "Molise",
						"parent": ""
					},
					"IT-72": {
						"category": "region",
						"code": "IT-72",
						"name": "Campania",
						"parent": ""
					},
					"IT-75": {
						"category": "region",
						"code": "IT-75",
						"name": "Puglia",
						"parent": ""
					},
					"IT-77": {
						"category": "region",
						"code": "IT-77",
						"name": "Basilicata",
						"parent": ""
					},
					"IT-78": {
						"category": "region",
						"code": "IT-78",
						"name": "Calabria",
						"parent": ""
					},
					"IT-82": {
						"category": "region",
						"code": "IT-82",
						"name": "Sicilia",
						"parent": ""
					},
					"IT-88": {
						"category": "region",
						"code": "IT-88",
						"name": "Sardegna",
						"parent": ""
					},
					"IT-AG": {
						"category": "province",
						"code": "IT-AG",
						"name": "Agrigento",
						"parent": "IT-82"
					},
					"IT-AL": {
						"category": "province",
						"code": "IT-AL",
						"name": "Alessandria",
						"parent": "IT-21"
					},
					"IT-AN": {
						"category": "province",
						"code": "IT-AN",
						"name": "Ancona",
						"parent": "IT-57"
					},
					"IT-AO": {
						"category": "province",
						"code": "IT-AO",
						"name": "Aoste",
						"parent": "IT-23"
					},
					"IT-AP": {
						"category": "province",
						"code": "IT-AP",
						"name": "Ascoli Piceno",
						"parent": "IT-57"
					},
					"IT-AQ": {
						"category": "province",
						"code": "IT-AQ",
						"name": "L'Aquila",
						"parent": "IT-65"
					},
					"IT-AR": {
						"category": "province",
						"code": "IT-AR",
						"name": "Arezzo",
						"parent": "IT-52"
					},
					"IT-AT": {
						"category": "province",
						"code": "IT-AT",
						"name": "Asti",
						"parent": "IT-21"
					},
					"IT-AV": {
						"category": "province",
						"code": "IT-AV",
						"name": "Avellino",
						"parent": "IT-72"
					},
					"IT-BA": {
						"category": "province",
						"code": "IT-BA",
						"name": "Bari",
						"parent": "IT-75"
					},
					"IT-BG": {
						"category": "province",
						"code": "IT-BG",
						"name": "Bergamo",
						"parent": "IT-25"
					},
					"IT-BI": {
						"category": "province",
						"code": "IT-BI",
						"name": "Biella",
						"parent": "IT-21"
					},
					"IT-BL": {
						"category": "province",
						"code": "IT-BL",
						"name": "Belluno",
						"parent": "IT-34"
					},
					"IT-BN": {
						"category": "province",
						"code": "IT-BN",
						"name": "Benevento",
						"parent": "IT-72"
					},
					"IT-BO": {
						"category": "province",
						"code": "IT-BO",
						"name": "Bologna",
						"parent": "IT-45"
					},
					"IT-BR": {
						"category": "province",
						"code": "IT-BR",
						"name": "Brindisi",
						"parent": "IT-75"
					},
					"IT-BS": {
						"category": "province",
						"code": "IT-BS",
						"name": "Brescia",
						"parent": "IT-25"
					},
					"IT-BT": {
						"category": "province",
						"code": "IT-BT",
						"name": "Barletta-Andria-Trani",
						"parent": "IT-75"
					},
					"IT-BZ": {
						"category": "province",
						"code": "IT-BZ",
						"name": "Bozen",
						"parent": "IT-32"
					},
					"IT-CA": {
						"category": "province",
						"code": "IT-CA",
						"name": "Cagliari",
						"parent": "IT-88"
					},
					"IT-CB": {
						"category": "province",
						"code": "IT-CB",
						"name": "Campobasso",
						"parent": "IT-67"
					},
					"IT-CE": {
						"category": "province",
						"code": "IT-CE",
						"name": "Caserta",
						"parent": "IT-72"
					},
					"IT-CH": {
						"category": "province",
						"code": "IT-CH",
						"name": "Chieti",
						"parent": "IT-65"
					},
					"IT-CI": {
						"category": "province",
						"code": "IT-CI",
						"name": "Carbonia-Iglesias",
						"parent": "IT-88"
					},
					"IT-CL": {
						"category": "province",
						"code": "IT-CL",
						"name": "Caltanissetta",
						"parent": "IT-82"
					},
					"IT-CN": {
						"category": "province",
						"code": "IT-CN",
						"name": "Cuneo",
						"parent": "IT-21"
					},
					"IT-CO": {
						"category": "province",
						"code": "IT-CO",
						"name": "Como",
						"parent": "IT-25"
					},
					"IT-CR": {
						"category": "province",
						"code": "IT-CR",
						"name": "Cremona",
						"parent": "IT-25"
					},
					"IT-CS": {
						"category": "province",
						"code": "IT-CS",
						"name": "Cosenza",
						"parent": "IT-78"
					},
					"IT-CT": {
						"category": "province",
						"code": "IT-CT",
						"name": "Catania",
						"parent": "IT-82"
					},
					"IT-CZ": {
						"category": "province",
						"code": "IT-CZ",
						"name": "Catanzaro",
						"parent": "IT-78"
					},
					"IT-EN": {
						"category": "province",
						"code": "IT-EN",
						"name": "Enna",
						"parent": "IT-82"
					},
					"IT-FC": {
						"category": "province",
						"code": "IT-FC",
						"name": "Forlì-Cesena",
						"parent": "IT-45"
					},
					"IT-FE": {
						"category": "province",
						"code": "IT-FE",
						"name": "Ferrara",
						"parent": "IT-45"
					},
					"IT-FG": {
						"category": "province",
						"code": "IT-FG",
						"name": "Foggia",
						"parent": "IT-75"
					},
					"IT-FI": {
						"category": "province",
						"code": "IT-FI",
						"name": "Firenze",
						"parent": "IT-52"
					},
					"IT-FM": {
						"category": "province",
						"code": "IT-FM",
						"name": "Fermo",
						"parent": "IT-57"
					},
					"IT-FR": {
						"category": "province",
						"code": "IT-FR",
						"name": "Frosinone",
						"parent": "IT-62"
					},
					"IT-GE": {
						"category": "province",
						"code": "IT-GE",
						"name": "Genova",
						"parent": "IT-42"
					},
					"IT-GO": {
						"category": "province",
						"code": "IT-GO",
						"name": "Gorizia",
						"parent": "IT-36"
					},
					"IT-GR": {
						"category": "province",
						"code": "IT-GR",
						"name": "Grosseto",
						"parent": "IT-52"
					},
					"IT-IM": {
						"category": "province",
						"code": "IT-IM",
						"name": "Imperia",
						"parent": "IT-42"
					},
					"IT-IS": {
						"category": "province",
						"code": "IT-IS",
						"name": "Isernia",
						"parent": "IT-67"
					},
					"IT-KR": {
						"category": "province",
						"code": "IT-KR",
						"name": "Crotone",
						"parent": "IT-78"
					},
					"IT-LC": {
						"category": "province",
						"code": "IT-LC",
						"name": "Lecco",
						"parent": "IT-25"
					},
					"IT-LE": {
						"category": "province",
						"code": "IT-LE",
						"name": "Lecce",
						"parent": "IT-75"
					},
					"IT-LI": {
						"category": "province",
						"code": "IT-LI",
						"name": "Livorno",
						"parent": "IT-52"
					},
					"IT-LO": {
						"category": "province",
						"code": "IT-LO",
						"name": "Lodi",
						"parent": "IT-25"
					},
					"IT-LT": {
						"category": "province",
						"code": "IT-LT",
						"name": "Latina",
						"parent": "IT-62"
					},
					"IT-LU": {
						"category": "province",
						"code": "IT-LU",
						"name": "Lucca",
						"parent": "IT-52"
					},
					"IT-MB": {
						"category": "province",
						"code": "IT-MB",
						"name": "Monza e Brianza",
						"parent": "IT-25"
					},
					"IT-MC": {
						"category": "province",
						"code": "IT-MC",
						"name": "Macerata",
						"parent": "IT-57"
					},
					"IT-ME": {
						"category": "province",
						"code": "IT-ME",
						"name": "Messina",
						"parent": "IT-82"
					},
					"IT-MI": {
						"category": "province",
						"code": "IT-MI",
						"name": "Milano",
						"parent": "IT-25"
					},
					"IT-MN": {
						"category": "province",
						"code": "IT-MN",
						"name": "Mantova",
						"parent": "IT-25"
					},
					"IT-MO": {
						"category": "province",
						"code": "IT-MO",
						"name": "Modena",
						"parent": "IT-45"
					},
					"IT-MS": {
						"category": "province",
						"code": "IT-MS",
						"name": "Massa-Carrara",
						"parent": "IT-52"
					},
					"IT-MT": {
						"category": "province",
						"code": "IT-MT",
						"name": "Matera",
						"parent": "IT-77"
					},
					"IT-NA": {
						"category": "province",
						"code": "IT-NA",
						"name": "Napoli",
						"parent": "IT-72"
					},
					"IT-NO": {
						"category": "province",
						"code": "IT-NO",
						"name": "Novara",
						"parent": "IT-21"
					},
					"IT-NU": {
						"category": "province",
						"code": "IT-NU",
						"name": "Nuoro",
						"parent": "IT-88"
					},
					"IT-OG": {
						"category": "province",
						"code": "IT-OG",
						"name": "Ogliastra",
						"parent": "IT-88"
					},
					"IT-OR": {
						"category": "province",
						"code": "IT-OR",
						"name": "Oristano",
						"parent": "IT-88"
					},
					"IT-OT": {
						"category": "province",
						"code": "IT-OT",
						"name": "Olbia-Tempio",
						"parent": "IT-88"
					},
					"IT-PA": {
						"category": "province",
						"code": "IT-PA",
						"name": "Palermo",
						"parent": "IT-82"
					},
					"IT-PC": {
						"category": "province",
						"code": "IT-PC",
						"name": "Piacenza",
						"parent": "IT-45"
					},
					"IT-PD": {
						"category": "province",
						"code": "IT-PD",
						"name": "Padova",
						"parent": "IT-34"
					},
					"IT-PE": {
						"category": "province",
						"code": "IT-PE",
						"name": "Pescara",
						"parent": "IT-65"
					},
					"IT-PG": {
						"category": "province",
						"code": "IT-PG",
						"name": "Perugia",
						"parent": "IT-55"
					},
					"IT-PI": {
						"category": "province",
						"code": "IT-PI",
						"name": "Pisa",
						"parent": "IT-52"
					},
					"IT-PN": {
						"category": "province",
						"code": "IT-PN",
						"name": "Pordenone",
						"parent": "IT-36"
					},
					"IT-PO": {
						"category": "province",
						"code": "IT-PO",
						"name": "Prato",
						"parent": "IT-52"
					},
					"IT-PR": {
						"category": "province",
						"code": "IT-PR",
						"name": "Parma",
						"parent": "IT-45"
					},
					"IT-PT": {
						"category": "province",
						"code": "IT-PT",
						"name": "Pistoia",
						"parent": "IT-52"
					},
					"IT-PU": {
						"category": "province",
						"code": "IT-PU",
						"name": "Pesaro e Urbino",
						"parent": "IT-57"
					},
					"IT-PV": {
						"category": "province",
						"code": "IT-PV",
						"name": "Pavia",
						"parent": "IT-25"
					},
					"IT-PZ": {
						"category": "province",
						"code": "IT-PZ",
						"name": "Potenza",
						"parent": "IT-77"
					},
					"IT-RA": {
						"category": "province",
						"code": "IT-RA",
						"name": "Ravenna",
						"parent": "IT-45"
					},
					"IT-RC": {
						"category": "province",
						"code": "IT-RC",
						"name": "Reggio Calabria",
						"parent": "IT-78"
					},
					"IT-RE": {
						"category": "province",
						"code": "IT-RE",
						"name": "Reggio Emilia",
						"parent": "IT-45"
					},
					"IT-RG": {
						"category": "province",
						"code": "IT-RG",
						"name": "Ragusa",
						"parent": "IT-82"
					},
					"IT-RI": {
						"category": "province",
						"code": "IT-RI",
						"name": "Rieti",
						"parent": "IT-62"
					},
					"IT-RM": {
						"category": "province",
						"code": "IT-RM",
						"name": "Roma",
						"parent": "IT-62"
					},
					"IT-RN": {
						"category": "province",
						"code": "IT-RN",
						"name": "Rimini",
						"parent": "IT-45"
					},
					"IT-RO": {
						"category": "province",
						"code": "IT-RO",
						"name": "Rovigo",
						"parent": "IT-34"
					},
					"IT-SA": {
						"category": "province",
						"code": "IT-SA",
						"name": "Salerno",
						"parent": "IT-72"
					},
					"IT-SI": {
						"category": "province",
						"code": "IT-SI",
						"name": "Siena",
						"parent": "IT-52"
					},
					"IT-SO": {
						"category": "province",
						"code": "IT-SO",
						"name": "Sondrio",
						"parent": "IT-25"
					},
					"IT-SP": {
						"category": "province",
						"code": "IT-SP",
						"name": "La Spezia",
						"parent": "IT-42"
					},
					"IT-SR": {
						"category": "province",
						"code": "IT-SR",
						"name": "Siracusa",
						"parent": "IT-82"
					},
					"IT-SS": {
						"category": "province",
						"code": "IT-SS",
						"name": "Sassari",
						"parent": "IT-88"
					},
					"IT-SV": {
						"category": "province",
						"code": "IT-SV",
						"name": "Savona",
						"parent": "IT-42"
					},
					"IT-TA": {
						"category": "province",
						"code": "IT-TA",
						"name": "Taranto",
						"parent": "IT-75"
					},
					"IT-TE": {
						"category": "province",
						"code": "IT-TE",
						"name": "Teramo",
						"parent": "IT-65"
					},
					"IT-TN": {
						"category": "province",
						"code": "IT-TN",
						"name": "Trento",
						"parent": "IT-32"
					},
					"IT-TO": {
						"category": "province",
						"code": "IT-TO",
						"name": "Torino",
						"parent": "IT-21"
					},
					"IT-TP": {
						"category": "province",
						"code": "IT-TP",
						"name": "Trapani",
						"parent": "IT-82"
					},
					"IT-TR": {
						"category": "province",
						"code": "IT-TR",
						"name": "Terni",
						"parent": "IT-55"
					},
					"IT-TS": {
						"category": "province",
						"code": "IT-TS",
						"name": "Trieste",
						"parent": "IT-36"
					},
					"IT-TV": {
						"category": "province",
						"code": "IT-TV",
						"name": "Treviso",
						"parent": "IT-34"
					},
					"IT-UD": {
						"category": "province",
						"code": "IT-UD",
						"name": "Udine",
						"parent": "IT-36"
					},
					"IT-VA": {
						"category": "province",
						"code": "IT-VA",
						"name": "Varese",
						"parent": "IT-25"
					},
					"IT-VB": {
						"category": "province",
						"code": "IT-VB",
						"name": "Verbano-Cusio-Ossola",
						"parent": "IT-21"
					},
					"IT-VC": {
						"category": "province",
						"code": "IT-VC",
						"name": "Vercelli",
						"parent": "IT-21"
					},
					"IT-VE": {
						"category": "province",
						"code": "IT-VE",
						"name": "Venezia",
						"parent": "IT-34"
					},
					"IT-VI": {
						"category": "province",
						"code": "IT-VI",
						"name": "Vicenza",
						"parent": "IT-34"
					},
					"IT-VR": {
						"category": "province",
						"code": "IT-VR",
						"name": "Verona",
						"parent": "IT-34"
					},
					"IT-VS": {
						"category": "province",
						"code": "IT-VS",
						"name": "Medio Campidano",
						"parent": "IT-88"
					},
					"IT-VT": {
						"category": "province",
						"code": "IT-VT",
						"name": "Viterbo",
						"parent": "IT-62"
					},
					"IT-VV": {
						"category": "province",
						"code": "IT-VV",
						"name": "Vibo Valentia",
						"parent": "IT-78"
					}
				}
			},
			"JAM": {
				"threeLetterCode": "JAM",
				"shortName": "Jamaica",
				"shortNameUpperCase": "JAMAICA",
				"fullName": "Jamaica",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"JM-01": {
						"category": "parish",
						"code": "JM-01",
						"name": "Kingston",
						"parent": ""
					},
					"JM-02": {
						"category": "parish",
						"code": "JM-02",
						"name": "Saint Andrew",
						"parent": ""
					},
					"JM-03": {
						"category": "parish",
						"code": "JM-03",
						"name": "Saint Thomas",
						"parent": ""
					},
					"JM-04": {
						"category": "parish",
						"code": "JM-04",
						"name": "Portland",
						"parent": ""
					},
					"JM-05": {
						"category": "parish",
						"code": "JM-05",
						"name": "Saint Mary",
						"parent": ""
					},
					"JM-06": {
						"category": "parish",
						"code": "JM-06",
						"name": "Saint Ann",
						"parent": ""
					},
					"JM-07": {
						"category": "parish",
						"code": "JM-07",
						"name": "Trelawny",
						"parent": ""
					},
					"JM-08": {
						"category": "parish",
						"code": "JM-08",
						"name": "Saint James",
						"parent": ""
					},
					"JM-09": {
						"category": "parish",
						"code": "JM-09",
						"name": "Hanover",
						"parent": ""
					},
					"JM-10": {
						"category": "parish",
						"code": "JM-10",
						"name": "Westmoreland",
						"parent": ""
					},
					"JM-11": {
						"category": "parish",
						"code": "JM-11",
						"name": "Saint Elizabeth",
						"parent": ""
					},
					"JM-12": {
						"category": "parish",
						"code": "JM-12",
						"name": "Manchester",
						"parent": ""
					},
					"JM-13": {
						"category": "parish",
						"code": "JM-13",
						"name": "Clarendon",
						"parent": ""
					},
					"JM-14": {
						"category": "parish",
						"code": "JM-14",
						"name": "Saint Catherine",
						"parent": ""
					}
				}
			},
			"JEY": {
				"threeLetterCode": "JEY",
				"shortName": "Jersey",
				"shortNameUpperCase": "JERSEY",
				"fullName": "Jersey",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"JOR": {
				"threeLetterCode": "JOR",
				"shortName": "Jordan",
				"shortNameUpperCase": "JORDAN",
				"fullName": "the Hashemite Kingdom of Jordan",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"JO-AJ": {
						"category": "governorate",
						"code": "JO-AJ",
						"name": "‘Ajlūn",
						"parent": ""
					},
					"JO-AM": {
						"category": "governorate",
						"code": "JO-AM",
						"name": "Al ‘A̅şimah",
						"parent": ""
					},
					"JO-AQ": {
						"category": "governorate",
						"code": "JO-AQ",
						"name": "Al ‘Aqabah",
						"parent": ""
					},
					"JO-AT": {
						"category": "governorate",
						"code": "JO-AT",
						"name": "Aţ Ţafīlah",
						"parent": ""
					},
					"JO-AZ": {
						"category": "governorate",
						"code": "JO-AZ",
						"name": "Az Zarqā’",
						"parent": ""
					},
					"JO-BA": {
						"category": "governorate",
						"code": "JO-BA",
						"name": "Al Balqā’",
						"parent": ""
					},
					"JO-IR": {
						"category": "governorate",
						"code": "JO-IR",
						"name": "Irbid",
						"parent": ""
					},
					"JO-JA": {
						"category": "governorate",
						"code": "JO-JA",
						"name": "Jarash",
						"parent": ""
					},
					"JO-KA": {
						"category": "governorate",
						"code": "JO-KA",
						"name": "Al Karak",
						"parent": ""
					},
					"JO-MA": {
						"category": "governorate",
						"code": "JO-MA",
						"name": "Al Mafraq",
						"parent": ""
					},
					"JO-MD": {
						"category": "governorate",
						"code": "JO-MD",
						"name": "Mādabā",
						"parent": ""
					},
					"JO-MN": {
						"category": "governorate",
						"code": "JO-MN",
						"name": "Ma‘ān",
						"parent": ""
					}
				}
			},
			"JPN": {
				"threeLetterCode": "JPN",
				"shortName": "Japan",
				"shortNameUpperCase": "JAPAN",
				"fullName": "Japan",
				"subdivisionLabel": "prefecture",
				"subdivisions": {
					"JP-01": {
						"category": "prefecture",
						"code": "JP-01",
						"name": "Hokkaido",
						"parent": ""
					},
					"JP-02": {
						"category": "prefecture",
						"code": "JP-02",
						"name": "Aomori",
						"parent": ""
					},
					"JP-03": {
						"category": "prefecture",
						"code": "JP-03",
						"name": "Iwate",
						"parent": ""
					},
					"JP-04": {
						"category": "prefecture",
						"code": "JP-04",
						"name": "Miyagi",
						"parent": ""
					},
					"JP-05": {
						"category": "prefecture",
						"code": "JP-05",
						"name": "Akita",
						"parent": ""
					},
					"JP-06": {
						"category": "prefecture",
						"code": "JP-06",
						"name": "Yamagata",
						"parent": ""
					},
					"JP-07": {
						"category": "prefecture",
						"code": "JP-07",
						"name": "Fukushima",
						"parent": ""
					},
					"JP-08": {
						"category": "prefecture",
						"code": "JP-08",
						"name": "Ibaraki",
						"parent": ""
					},
					"JP-09": {
						"category": "prefecture",
						"code": "JP-09",
						"name": "Tochigi",
						"parent": ""
					},
					"JP-10": {
						"category": "prefecture",
						"code": "JP-10",
						"name": "Gunma",
						"parent": ""
					},
					"JP-11": {
						"category": "prefecture",
						"code": "JP-11",
						"name": "Saitama",
						"parent": ""
					},
					"JP-12": {
						"category": "prefecture",
						"code": "JP-12",
						"name": "Chiba",
						"parent": ""
					},
					"JP-13": {
						"category": "prefecture",
						"code": "JP-13",
						"name": "Tokyo",
						"parent": ""
					},
					"JP-14": {
						"category": "prefecture",
						"code": "JP-14",
						"name": "Kanagawa",
						"parent": ""
					},
					"JP-15": {
						"category": "prefecture",
						"code": "JP-15",
						"name": "Niigata",
						"parent": ""
					},
					"JP-16": {
						"category": "prefecture",
						"code": "JP-16",
						"name": "Toyama",
						"parent": ""
					},
					"JP-17": {
						"category": "prefecture",
						"code": "JP-17",
						"name": "Ishikawa",
						"parent": ""
					},
					"JP-18": {
						"category": "prefecture",
						"code": "JP-18",
						"name": "Fukui",
						"parent": ""
					},
					"JP-19": {
						"category": "prefecture",
						"code": "JP-19",
						"name": "Yamanashi",
						"parent": ""
					},
					"JP-20": {
						"category": "prefecture",
						"code": "JP-20",
						"name": "Nagano",
						"parent": ""
					},
					"JP-21": {
						"category": "prefecture",
						"code": "JP-21",
						"name": "Gifu",
						"parent": ""
					},
					"JP-22": {
						"category": "prefecture",
						"code": "JP-22",
						"name": "Shizuoka",
						"parent": ""
					},
					"JP-23": {
						"category": "prefecture",
						"code": "JP-23",
						"name": "Aichi",
						"parent": ""
					},
					"JP-24": {
						"category": "prefecture",
						"code": "JP-24",
						"name": "Mie",
						"parent": ""
					},
					"JP-25": {
						"category": "prefecture",
						"code": "JP-25",
						"name": "Shiga",
						"parent": ""
					},
					"JP-26": {
						"category": "prefecture",
						"code": "JP-26",
						"name": "Kyoto",
						"parent": ""
					},
					"JP-27": {
						"category": "prefecture",
						"code": "JP-27",
						"name": "Osaka",
						"parent": ""
					},
					"JP-28": {
						"category": "prefecture",
						"code": "JP-28",
						"name": "Hyogo",
						"parent": ""
					},
					"JP-29": {
						"category": "prefecture",
						"code": "JP-29",
						"name": "Nara",
						"parent": ""
					},
					"JP-30": {
						"category": "prefecture",
						"code": "JP-30",
						"name": "Wakayama",
						"parent": ""
					},
					"JP-31": {
						"category": "prefecture",
						"code": "JP-31",
						"name": "Tottori",
						"parent": ""
					},
					"JP-32": {
						"category": "prefecture",
						"code": "JP-32",
						"name": "Shimane",
						"parent": ""
					},
					"JP-33": {
						"category": "prefecture",
						"code": "JP-33",
						"name": "Okayama",
						"parent": ""
					},
					"JP-34": {
						"category": "prefecture",
						"code": "JP-34",
						"name": "Hiroshima",
						"parent": ""
					},
					"JP-35": {
						"category": "prefecture",
						"code": "JP-35",
						"name": "Yamaguchi",
						"parent": ""
					},
					"JP-36": {
						"category": "prefecture",
						"code": "JP-36",
						"name": "Tokushima",
						"parent": ""
					},
					"JP-37": {
						"category": "prefecture",
						"code": "JP-37",
						"name": "Kagawa",
						"parent": ""
					},
					"JP-38": {
						"category": "prefecture",
						"code": "JP-38",
						"name": "Ehime",
						"parent": ""
					},
					"JP-39": {
						"category": "prefecture",
						"code": "JP-39",
						"name": "Kochi",
						"parent": ""
					},
					"JP-40": {
						"category": "prefecture",
						"code": "JP-40",
						"name": "Fukuoka",
						"parent": ""
					},
					"JP-41": {
						"category": "prefecture",
						"code": "JP-41",
						"name": "Saga",
						"parent": ""
					},
					"JP-42": {
						"category": "prefecture",
						"code": "JP-42",
						"name": "Nagasaki",
						"parent": ""
					},
					"JP-43": {
						"category": "prefecture",
						"code": "JP-43",
						"name": "Kumamoto",
						"parent": ""
					},
					"JP-44": {
						"category": "prefecture",
						"code": "JP-44",
						"name": "Oita",
						"parent": ""
					},
					"JP-45": {
						"category": "prefecture",
						"code": "JP-45",
						"name": "Miyazaki",
						"parent": ""
					},
					"JP-46": {
						"category": "prefecture",
						"code": "JP-46",
						"name": "Kagoshima",
						"parent": ""
					},
					"JP-47": {
						"category": "prefecture",
						"code": "JP-47",
						"name": "Okinawa",
						"parent": ""
					}
				}
			},
			"KAZ": {
				"threeLetterCode": "KAZ",
				"shortName": "Kazakhstan",
				"shortNameUpperCase": "KAZAKHSTAN",
				"fullName": "the Republic of Kazakhstan",
				"subdivisionLabel": "region",
				"subdivisions": {
					"KZ-AKM": {
						"category": "region",
						"code": "KZ-AKM",
						"name": "Aqmola oblysy",
						"parent": ""
					},
					"KZ-AKT": {
						"category": "region",
						"code": "KZ-AKT",
						"name": "Aqtöbe oblysy",
						"parent": ""
					},
					"KZ-ALA": {
						"category": "city",
						"code": "KZ-ALA",
						"name": "Almaty",
						"parent": ""
					},
					"KZ-ALM": {
						"category": "region",
						"code": "KZ-ALM",
						"name": "Almaty oblysy",
						"parent": ""
					},
					"KZ-AST": {
						"category": "city",
						"code": "KZ-AST",
						"name": "Astana",
						"parent": ""
					},
					"KZ-ATY": {
						"category": "region",
						"code": "KZ-ATY",
						"name": "Atyraū oblysy",
						"parent": ""
					},
					"KZ-BAY": {
						"category": "city",
						"code": "KZ-BAY",
						"name": "Bayqongyr",
						"parent": ""
					},
					"KZ-KAR": {
						"category": "region",
						"code": "KZ-KAR",
						"name": "Qaraghandy oblysy",
						"parent": ""
					},
					"KZ-KUS": {
						"category": "region",
						"code": "KZ-KUS",
						"name": "Qostanay oblysy",
						"parent": ""
					},
					"KZ-KZY": {
						"category": "region",
						"code": "KZ-KZY",
						"name": "Qyzylorda oblysy",
						"parent": ""
					},
					"KZ-MAN": {
						"category": "region",
						"code": "KZ-MAN",
						"name": "Mangghystaū oblysy",
						"parent": ""
					},
					"KZ-PAV": {
						"category": "region",
						"code": "KZ-PAV",
						"name": "Pavlodar oblysy",
						"parent": ""
					},
					"KZ-SEV": {
						"category": "region",
						"code": "KZ-SEV",
						"name": "Soltüstik Qazaqstan oblysy",
						"parent": ""
					},
					"KZ-VOS": {
						"category": "region",
						"code": "KZ-VOS",
						"name": "Shyghys Qazaqstan oblysy",
						"parent": ""
					},
					"KZ-YUZ": {
						"category": "region",
						"code": "KZ-YUZ",
						"name": "Ongtüstik Qazaqstan oblysy",
						"parent": ""
					},
					"KZ-ZAP": {
						"category": "region",
						"code": "KZ-ZAP",
						"name": "Batys Qazaqstan oblysy",
						"parent": ""
					},
					"KZ-ZHA": {
						"category": "region",
						"code": "KZ-ZHA",
						"name": "Zhambyl oblysy",
						"parent": ""
					}
				}
			},
			"KEN": {
				"threeLetterCode": "KEN",
				"shortName": "Kenya",
				"shortNameUpperCase": "KENYA",
				"fullName": "the Republic of Kenya",
				"subdivisionLabel": "county",
				"subdivisions": {
					"KE-01": {
						"category": "county",
						"code": "KE-01",
						"name": "Baringo",
						"parent": ""
					},
					"KE-02": {
						"category": "county",
						"code": "KE-02",
						"name": "Bomet",
						"parent": ""
					},
					"KE-03": {
						"category": "county",
						"code": "KE-03",
						"name": "Bungoma",
						"parent": ""
					},
					"KE-04": {
						"category": "county",
						"code": "KE-04",
						"name": "Busia",
						"parent": ""
					},
					"KE-05": {
						"category": "county",
						"code": "KE-05",
						"name": "Elgeyo/Marakwet",
						"parent": ""
					},
					"KE-06": {
						"category": "county",
						"code": "KE-06",
						"name": "Embu",
						"parent": ""
					},
					"KE-07": {
						"category": "county",
						"code": "KE-07",
						"name": "Garissa",
						"parent": ""
					},
					"KE-08": {
						"category": "county",
						"code": "KE-08",
						"name": "Homa Bay",
						"parent": ""
					},
					"KE-09": {
						"category": "county",
						"code": "KE-09",
						"name": "Isiolo",
						"parent": ""
					},
					"KE-10": {
						"category": "county",
						"code": "KE-10",
						"name": "Kajiado",
						"parent": ""
					},
					"KE-11": {
						"category": "county",
						"code": "KE-11",
						"name": "Kakamega",
						"parent": ""
					},
					"KE-12": {
						"category": "county",
						"code": "KE-12",
						"name": "Kericho",
						"parent": ""
					},
					"KE-13": {
						"category": "county",
						"code": "KE-13",
						"name": "Kiambu",
						"parent": ""
					},
					"KE-14": {
						"category": "county",
						"code": "KE-14",
						"name": "Kilifi",
						"parent": ""
					},
					"KE-15": {
						"category": "county",
						"code": "KE-15",
						"name": "Kirinyaga",
						"parent": ""
					},
					"KE-16": {
						"category": "county",
						"code": "KE-16",
						"name": "Kisii",
						"parent": ""
					},
					"KE-17": {
						"category": "county",
						"code": "KE-17",
						"name": "Kisumu",
						"parent": ""
					},
					"KE-18": {
						"category": "county",
						"code": "KE-18",
						"name": "Kitui",
						"parent": ""
					},
					"KE-19": {
						"category": "county",
						"code": "KE-19",
						"name": "Kwale",
						"parent": ""
					},
					"KE-20": {
						"category": "county",
						"code": "KE-20",
						"name": "Laikipia",
						"parent": ""
					},
					"KE-21": {
						"category": "county",
						"code": "KE-21",
						"name": "Lamu",
						"parent": ""
					},
					"KE-22": {
						"category": "county",
						"code": "KE-22",
						"name": "Machakos",
						"parent": ""
					},
					"KE-23": {
						"category": "county",
						"code": "KE-23",
						"name": "Makueni",
						"parent": ""
					},
					"KE-24": {
						"category": "county",
						"code": "KE-24",
						"name": "Mandera",
						"parent": ""
					},
					"KE-25": {
						"category": "county",
						"code": "KE-25",
						"name": "Marsabit",
						"parent": ""
					},
					"KE-26": {
						"category": "county",
						"code": "KE-26",
						"name": "Meru",
						"parent": ""
					},
					"KE-27": {
						"category": "county",
						"code": "KE-27",
						"name": "Migori",
						"parent": ""
					},
					"KE-28": {
						"category": "county",
						"code": "KE-28",
						"name": "Mombasa",
						"parent": ""
					},
					"KE-29": {
						"category": "county",
						"code": "KE-29",
						"name": "Murang'a",
						"parent": ""
					},
					"KE-30": {
						"category": "county",
						"code": "KE-30",
						"name": "Nairobi City",
						"parent": ""
					},
					"KE-31": {
						"category": "county",
						"code": "KE-31",
						"name": "Nakuru",
						"parent": ""
					},
					"KE-32": {
						"category": "county",
						"code": "KE-32",
						"name": "Nandi",
						"parent": ""
					},
					"KE-33": {
						"category": "county",
						"code": "KE-33",
						"name": "Narok",
						"parent": ""
					},
					"KE-34": {
						"category": "county",
						"code": "KE-34",
						"name": "Nyamira",
						"parent": ""
					},
					"KE-35": {
						"category": "county",
						"code": "KE-35",
						"name": "Nyandarua",
						"parent": ""
					},
					"KE-36": {
						"category": "county",
						"code": "KE-36",
						"name": "Nyeri",
						"parent": ""
					},
					"KE-37": {
						"category": "county",
						"code": "KE-37",
						"name": "Samburu",
						"parent": ""
					},
					"KE-38": {
						"category": "county",
						"code": "KE-38",
						"name": "Siaya",
						"parent": ""
					},
					"KE-39": {
						"category": "county",
						"code": "KE-39",
						"name": "Taita/Taveta",
						"parent": ""
					},
					"KE-40": {
						"category": "county",
						"code": "KE-40",
						"name": "Tana River",
						"parent": ""
					},
					"KE-41": {
						"category": "county",
						"code": "KE-41",
						"name": "Tharaka-Nithi",
						"parent": ""
					},
					"KE-42": {
						"category": "county",
						"code": "KE-42",
						"name": "Trans Nzoia",
						"parent": ""
					},
					"KE-43": {
						"category": "county",
						"code": "KE-43",
						"name": "Turkana",
						"parent": ""
					},
					"KE-44": {
						"category": "county",
						"code": "KE-44",
						"name": "Uasin Gishu",
						"parent": ""
					},
					"KE-45": {
						"category": "county",
						"code": "KE-45",
						"name": "Vihiga",
						"parent": ""
					},
					"KE-46": {
						"category": "county",
						"code": "KE-46",
						"name": "Wajir",
						"parent": ""
					},
					"KE-47": {
						"category": "county",
						"code": "KE-47",
						"name": "West Pokot",
						"parent": ""
					}
				}
			},
			"KGZ": {
				"threeLetterCode": "KGZ",
				"shortName": "Kyrgyzstan",
				"shortNameUpperCase": "KYRGYZSTAN",
				"fullName": "the Kyrgyz Republic",
				"subdivisionLabel": "region",
				"subdivisions": {
					"KG-B": {
						"category": "region",
						"code": "KG-B",
						"name": "Batken",
						"parent": ""
					},
					"KG-C": {
						"category": "region",
						"code": "KG-C",
						"name": "Chüy",
						"parent": ""
					},
					"KG-GB": {
						"category": "city",
						"code": "KG-GB",
						"name": "Bishkek",
						"parent": ""
					},
					"KG-GO": {
						"category": "city",
						"code": "KG-GO",
						"name": "Osh",
						"parent": ""
					},
					"KG-J": {
						"category": "region",
						"code": "KG-J",
						"name": "Jalal-Abad",
						"parent": ""
					},
					"KG-N": {
						"category": "region",
						"code": "KG-N",
						"name": "Naryn",
						"parent": ""
					},
					"KG-O": {
						"category": "region",
						"code": "KG-O",
						"name": "Osh",
						"parent": ""
					},
					"KG-T": {
						"category": "region",
						"code": "KG-T",
						"name": "Talas",
						"parent": ""
					},
					"KG-Y": {
						"category": "region",
						"code": "KG-Y",
						"name": "Ysyk-Köl",
						"parent": ""
					}
				}
			},
			"KHM": {
				"threeLetterCode": "KHM",
				"shortName": "Cambodia",
				"shortNameUpperCase": "CAMBODIA",
				"fullName": "the Kingdom of Cambodia",
				"subdivisionLabel": "province",
				"subdivisions": {
					"KH-1": {
						"category": "province",
						"code": "KH-1",
						"name": "Banteay Mean Chey",
						"parent": ""
					},
					"KH-10": {
						"category": "province",
						"code": "KH-10",
						"name": "Kracheh",
						"parent": ""
					},
					"KH-11": {
						"category": "province",
						"code": "KH-11",
						"name": "Mondol Kiri",
						"parent": ""
					},
					"KH-12": {
						"category": "autonomous municipality",
						"code": "KH-12",
						"name": "Phnom Penh",
						"parent": ""
					},
					"KH-13": {
						"category": "province",
						"code": "KH-13",
						"name": "Preah Vihear",
						"parent": ""
					},
					"KH-14": {
						"category": "province",
						"code": "KH-14",
						"name": "Prey Veaeng",
						"parent": ""
					},
					"KH-15": {
						"category": "province",
						"code": "KH-15",
						"name": "Pousaat",
						"parent": ""
					},
					"KH-16": {
						"category": "province",
						"code": "KH-16",
						"name": "Rotanak Kiri",
						"parent": ""
					},
					"KH-17": {
						"category": "province",
						"code": "KH-17",
						"name": "Siem Reab",
						"parent": ""
					},
					"KH-18": {
						"category": "province",
						"code": "KH-18",
						"name": "Krong Preah Sihanouk",
						"parent": ""
					},
					"KH-19": {
						"category": "province",
						"code": "KH-19",
						"name": "Stoĕng Trêng",
						"parent": ""
					},
					"KH-2": {
						"category": "province",
						"code": "KH-2",
						"name": "Baat Dambang",
						"parent": ""
					},
					"KH-20": {
						"category": "province",
						"code": "KH-20",
						"name": "Svaay Rieng",
						"parent": ""
					},
					"KH-21": {
						"category": "province",
						"code": "KH-21",
						"name": "Taakaev",
						"parent": ""
					},
					"KH-22": {
						"category": "province",
						"code": "KH-22",
						"name": "Otdar Mean Chey",
						"parent": ""
					},
					"KH-23": {
						"category": "province",
						"code": "KH-23",
						"name": "Krong Kaeb",
						"parent": ""
					},
					"KH-24": {
						"category": "province",
						"code": "KH-24",
						"name": "Krong Pailin",
						"parent": ""
					},
					"KH-25": {
						"category": "province",
						"code": "KH-25",
						"name": "Tbong Khmum",
						"parent": ""
					},
					"KH-3": {
						"category": "province",
						"code": "KH-3",
						"name": "Kampong Chaam",
						"parent": ""
					},
					"KH-4": {
						"category": "province",
						"code": "KH-4",
						"name": "Kampong Chhnang",
						"parent": ""
					},
					"KH-5": {
						"category": "province",
						"code": "KH-5",
						"name": "Kampong Spueu",
						"parent": ""
					},
					"KH-6": {
						"category": "province",
						"code": "KH-6",
						"name": "Kampong Thum",
						"parent": ""
					},
					"KH-7": {
						"category": "province",
						"code": "KH-7",
						"name": "Kampot",
						"parent": ""
					},
					"KH-8": {
						"category": "province",
						"code": "KH-8",
						"name": "Kandaal",
						"parent": ""
					},
					"KH-9": {
						"category": "province",
						"code": "KH-9",
						"name": "Kaoh Kong",
						"parent": ""
					}
				}
			},
			"KIR": {
				"threeLetterCode": "KIR",
				"shortName": "Kiribati",
				"shortNameUpperCase": "KIRIBATI",
				"fullName": "the Republic of Kiribati",
				"subdivisionLabel": "group of islands (20 inhabited islands)",
				"subdivisions": {
					"KI-G": {
						"category": "group of islands (20 inhabited islands)",
						"code": "KI-G",
						"name": "Gilbert Islands",
						"parent": ""
					},
					"KI-L": {
						"category": "group of islands (20 inhabited islands)",
						"code": "KI-L",
						"name": "Line Islands",
						"parent": ""
					},
					"KI-P": {
						"category": "group of islands (20 inhabited islands)",
						"code": "KI-P",
						"name": "Phoenix Islands",
						"parent": ""
					}
				}
			},
			"KNA": {
				"threeLetterCode": "KNA",
				"shortName": "Saint Kitts and Nevis",
				"shortNameUpperCase": "SAINT KITTS AND NEVIS",
				"fullName": "Saint Kitts and Nevis",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"KN-01": {
						"category": "parish",
						"code": "KN-01",
						"name": "Christ Church Nichola Town",
						"parent": "KN-K"
					},
					"KN-02": {
						"category": "parish",
						"code": "KN-02",
						"name": "Saint Anne Sandy Point",
						"parent": "KN-K"
					},
					"KN-03": {
						"category": "parish",
						"code": "KN-03",
						"name": "Saint George Basseterre",
						"parent": "KN-K"
					},
					"KN-04": {
						"category": "parish",
						"code": "KN-04",
						"name": "Saint George Gingerland",
						"parent": "KN-N"
					},
					"KN-05": {
						"category": "parish",
						"code": "KN-05",
						"name": "Saint James Windward",
						"parent": "KN-N"
					},
					"KN-06": {
						"category": "parish",
						"code": "KN-06",
						"name": "Saint John Capisterre",
						"parent": "KN-K"
					},
					"KN-07": {
						"category": "parish",
						"code": "KN-07",
						"name": "Saint John Figtree",
						"parent": "KN-N"
					},
					"KN-08": {
						"category": "parish",
						"code": "KN-08",
						"name": "Saint Mary Cayon",
						"parent": "KN-K"
					},
					"KN-09": {
						"category": "parish",
						"code": "KN-09",
						"name": "Saint Paul Capisterre",
						"parent": "KN-K"
					},
					"KN-10": {
						"category": "parish",
						"code": "KN-10",
						"name": "Saint Paul Charlestown",
						"parent": "KN-N"
					},
					"KN-11": {
						"category": "parish",
						"code": "KN-11",
						"name": "Saint Peter Basseterre",
						"parent": "KN-K"
					},
					"KN-12": {
						"category": "parish",
						"code": "KN-12",
						"name": "Saint Thomas Lowland",
						"parent": "KN-N"
					},
					"KN-13": {
						"category": "parish",
						"code": "KN-13",
						"name": "Saint Thomas Middle Island",
						"parent": "KN-K"
					},
					"KN-15": {
						"category": "parish",
						"code": "KN-15",
						"name": "Trinity Palmetto Point",
						"parent": "KN-K"
					},
					"KN-K": {
						"category": "state",
						"code": "KN-K",
						"name": "Saint Kitts",
						"parent": ""
					},
					"KN-N": {
						"category": "state",
						"code": "KN-N",
						"name": "Nevis",
						"parent": ""
					}
				}
			},
			"KOR": {
				"commonName": "South Korea",
				"threeLetterCode": "KOR",
				"shortName": "Korea (the Republic of)",
				"shortNameUpperCase": "KOREA, REPUBLIC OF",
				"fullName": "the Republic of Korea",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"KR-11": {
						"category": "special city",
						"code": "KR-11",
						"name": "Seoul-teukbyeolsi",
						"parent": ""
					},
					"KR-26": {
						"category": "metropolitan city",
						"code": "KR-26",
						"name": "Busan-gwangyeoksi",
						"parent": ""
					},
					"KR-27": {
						"category": "metropolitan city",
						"code": "KR-27",
						"name": "Daegu-gwangyeoksi",
						"parent": ""
					},
					"KR-28": {
						"category": "metropolitan city",
						"code": "KR-28",
						"name": "Incheon-gwangyeoksi",
						"parent": ""
					},
					"KR-29": {
						"category": "metropolitan city",
						"code": "KR-29",
						"name": "Gwangju-gwangyeoksi",
						"parent": ""
					},
					"KR-30": {
						"category": "metropolitan city",
						"code": "KR-30",
						"name": "Daejeon-gwangyeoksi",
						"parent": ""
					},
					"KR-31": {
						"category": "metropolitan city",
						"code": "KR-31",
						"name": "Ulsan-gwangyeoksi",
						"parent": ""
					},
					"KR-41": {
						"category": "province",
						"code": "KR-41",
						"name": "Gyeonggi-do",
						"parent": ""
					},
					"KR-42": {
						"category": "province",
						"code": "KR-42",
						"name": "Gangwon-do",
						"parent": ""
					},
					"KR-43": {
						"category": "province",
						"code": "KR-43",
						"name": "Chungcheongbuk-do",
						"parent": ""
					},
					"KR-44": {
						"category": "province",
						"code": "KR-44",
						"name": "Chungcheongnam-do",
						"parent": ""
					},
					"KR-45": {
						"category": "province",
						"code": "KR-45",
						"name": "Jeollabuk-do",
						"parent": ""
					},
					"KR-46": {
						"category": "province",
						"code": "KR-46",
						"name": "Jeollanam-do",
						"parent": ""
					},
					"KR-47": {
						"category": "province",
						"code": "KR-47",
						"name": "Gyeongsangbuk-do",
						"parent": ""
					},
					"KR-48": {
						"category": "province",
						"code": "KR-48",
						"name": "Gyeongsangnam-do",
						"parent": ""
					},
					"KR-49": {
						"category": "special self-governing province",
						"code": "KR-49",
						"name": "Jeju-teukbyeoljachido",
						"parent": ""
					},
					"KR-50": {
						"category": "special self-governing city",
						"code": "KR-50",
						"name": "Sejong",
						"parent": ""
					}
				}
			},
			"KWT": {
				"threeLetterCode": "KWT",
				"shortName": "Kuwait",
				"shortNameUpperCase": "KUWAIT",
				"fullName": "the State of Kuwait",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"KW-AH": {
						"category": "governorate",
						"code": "KW-AH",
						"name": "Al Aḩmadī",
						"parent": ""
					},
					"KW-FA": {
						"category": "governorate",
						"code": "KW-FA",
						"name": "Al Farwānīyah",
						"parent": ""
					},
					"KW-HA": {
						"category": "governorate",
						"code": "KW-HA",
						"name": "Ḩawallī",
						"parent": ""
					},
					"KW-JA": {
						"category": "governorate",
						"code": "KW-JA",
						"name": "Al Jahrā’",
						"parent": ""
					},
					"KW-KU": {
						"category": "governorate",
						"code": "KW-KU",
						"name": "Al ‘Āşimah",
						"parent": ""
					},
					"KW-MU": {
						"category": "governorate",
						"code": "KW-MU",
						"name": "Mubārak al Kabīr",
						"parent": ""
					}
				}
			},
			"LAO": {
				"commonName": "Laos",
				"threeLetterCode": "LAO",
				"shortName": "Lao People's Democratic Republic (the)",
				"shortNameUpperCase": "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
				"fullName": "the Lao People's Democratic Republic",
				"subdivisionLabel": "province",
				"subdivisions": {
					"LA-AT": {
						"category": "province",
						"code": "LA-AT",
						"name": "Attapu",
						"parent": ""
					},
					"LA-BK": {
						"category": "province",
						"code": "LA-BK",
						"name": "Bokèo",
						"parent": ""
					},
					"LA-BL": {
						"category": "province",
						"code": "LA-BL",
						"name": "Bolikhamxai",
						"parent": ""
					},
					"LA-CH": {
						"category": "province",
						"code": "LA-CH",
						"name": "Champasak",
						"parent": ""
					},
					"LA-HO": {
						"category": "province",
						"code": "LA-HO",
						"name": "Houaphan",
						"parent": ""
					},
					"LA-KH": {
						"category": "province",
						"code": "LA-KH",
						"name": "Khammouan",
						"parent": ""
					},
					"LA-LM": {
						"category": "province",
						"code": "LA-LM",
						"name": "Louang Namtha",
						"parent": ""
					},
					"LA-LP": {
						"category": "province",
						"code": "LA-LP",
						"name": "Louangphabang",
						"parent": ""
					},
					"LA-OU": {
						"category": "province",
						"code": "LA-OU",
						"name": "Oudômxai",
						"parent": ""
					},
					"LA-PH": {
						"category": "province",
						"code": "LA-PH",
						"name": "Phôngsali",
						"parent": ""
					},
					"LA-SL": {
						"category": "province",
						"code": "LA-SL",
						"name": "Salavan",
						"parent": ""
					},
					"LA-SV": {
						"category": "province",
						"code": "LA-SV",
						"name": "Savannakhét",
						"parent": ""
					},
					"LA-VI": {
						"category": "province",
						"code": "LA-VI",
						"name": "Viangchan",
						"parent": ""
					},
					"LA-VT": {
						"category": "prefecture",
						"code": "LA-VT",
						"name": "Viangchan",
						"parent": ""
					},
					"LA-XA": {
						"category": "province",
						"code": "LA-XA",
						"name": "Xaignabouli",
						"parent": ""
					},
					"LA-XE": {
						"category": "province",
						"code": "LA-XE",
						"name": "Xékong",
						"parent": ""
					},
					"LA-XI": {
						"category": "province",
						"code": "LA-XI",
						"name": "Xiangkhouang",
						"parent": ""
					},
					"LA-XS": {
						"category": "province",
						"code": "LA-XS",
						"name": "Xaisômboun",
						"parent": ""
					}
				}
			},
			"LBN": {
				"threeLetterCode": "LBN",
				"shortName": "Lebanon",
				"shortNameUpperCase": "LEBANON",
				"fullName": "the Lebanese Republic",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"LB-AK": {
						"category": "governorate",
						"code": "LB-AK",
						"name": "Aakkâr",
						"parent": ""
					},
					"LB-AS": {
						"category": "governorate",
						"code": "LB-AS",
						"name": "Ash Shimāl",
						"parent": ""
					},
					"LB-BA": {
						"category": "governorate",
						"code": "LB-BA",
						"name": "Bayrūt",
						"parent": ""
					},
					"LB-BH": {
						"category": "governorate",
						"code": "LB-BH",
						"name": "Baalbek-Hermel",
						"parent": ""
					},
					"LB-BI": {
						"category": "governorate",
						"code": "LB-BI",
						"name": "Al Biqā‘",
						"parent": ""
					},
					"LB-JA": {
						"category": "governorate",
						"code": "LB-JA",
						"name": "Al Janūb",
						"parent": ""
					},
					"LB-JL": {
						"category": "governorate",
						"code": "LB-JL",
						"name": "Jabal Lubnān",
						"parent": ""
					},
					"LB-NA": {
						"category": "governorate",
						"code": "LB-NA",
						"name": "An Nabaţīyah",
						"parent": ""
					}
				}
			},
			"LBR": {
				"threeLetterCode": "LBR",
				"shortName": "Liberia",
				"shortNameUpperCase": "LIBERIA",
				"fullName": "the Republic of Liberia",
				"subdivisionLabel": "county",
				"subdivisions": {
					"LR-BG": {
						"category": "county",
						"code": "LR-BG",
						"name": "Bong",
						"parent": ""
					},
					"LR-BM": {
						"category": "county",
						"code": "LR-BM",
						"name": "Bomi",
						"parent": ""
					},
					"LR-CM": {
						"category": "county",
						"code": "LR-CM",
						"name": "Grand Cape Mount",
						"parent": ""
					},
					"LR-GB": {
						"category": "county",
						"code": "LR-GB",
						"name": "Grand Bassa",
						"parent": ""
					},
					"LR-GG": {
						"category": "county",
						"code": "LR-GG",
						"name": "Grand Gedeh",
						"parent": ""
					},
					"LR-GK": {
						"category": "county",
						"code": "LR-GK",
						"name": "Grand Kru",
						"parent": ""
					},
					"LR-GP": {
						"category": "county",
						"code": "LR-GP",
						"name": "Gbarpolu",
						"parent": ""
					},
					"LR-LO": {
						"category": "county",
						"code": "LR-LO",
						"name": "Lofa",
						"parent": ""
					},
					"LR-MG": {
						"category": "county",
						"code": "LR-MG",
						"name": "Margibi",
						"parent": ""
					},
					"LR-MO": {
						"category": "county",
						"code": "LR-MO",
						"name": "Montserrado",
						"parent": ""
					},
					"LR-MY": {
						"category": "county",
						"code": "LR-MY",
						"name": "Maryland",
						"parent": ""
					},
					"LR-NI": {
						"category": "county",
						"code": "LR-NI",
						"name": "Nimba",
						"parent": ""
					},
					"LR-RG": {
						"category": "county",
						"code": "LR-RG",
						"name": "River Gee",
						"parent": ""
					},
					"LR-RI": {
						"category": "county",
						"code": "LR-RI",
						"name": "River Cess",
						"parent": ""
					},
					"LR-SI": {
						"category": "county",
						"code": "LR-SI",
						"name": "Sinoe",
						"parent": ""
					}
				}
			},
			"LBY": {
				"threeLetterCode": "LBY",
				"shortName": "Libya",
				"shortNameUpperCase": "LIBYA",
				"fullName": "the State of Libya",
				"subdivisionLabel": "popularate",
				"subdivisions": {
					"LY-BA": {
						"category": "popularate",
						"code": "LY-BA",
						"name": "Banghāzī",
						"parent": ""
					},
					"LY-BU": {
						"category": "popularate",
						"code": "LY-BU",
						"name": "Al Buţnān",
						"parent": ""
					},
					"LY-DR": {
						"category": "popularate",
						"code": "LY-DR",
						"name": "Darnah",
						"parent": ""
					},
					"LY-GT": {
						"category": "popularate",
						"code": "LY-GT",
						"name": "Ghāt",
						"parent": ""
					},
					"LY-JA": {
						"category": "popularate",
						"code": "LY-JA",
						"name": "Al Jabal al Akhḑar",
						"parent": ""
					},
					"LY-JG": {
						"category": "popularate",
						"code": "LY-JG",
						"name": "Al Jabal al Gharbī",
						"parent": ""
					},
					"LY-JI": {
						"category": "popularate",
						"code": "LY-JI",
						"name": "Al Jafārah",
						"parent": ""
					},
					"LY-JU": {
						"category": "popularate",
						"code": "LY-JU",
						"name": "Al Jufrah",
						"parent": ""
					},
					"LY-KF": {
						"category": "popularate",
						"code": "LY-KF",
						"name": "Al Kufrah",
						"parent": ""
					},
					"LY-MB": {
						"category": "popularate",
						"code": "LY-MB",
						"name": "Al Marqab",
						"parent": ""
					},
					"LY-MI": {
						"category": "popularate",
						"code": "LY-MI",
						"name": "Mişrātah",
						"parent": ""
					},
					"LY-MJ": {
						"category": "popularate",
						"code": "LY-MJ",
						"name": "Al Marj",
						"parent": ""
					},
					"LY-MQ": {
						"category": "popularate",
						"code": "LY-MQ",
						"name": "Murzuq",
						"parent": ""
					},
					"LY-NL": {
						"category": "popularate",
						"code": "LY-NL",
						"name": "Nālūt",
						"parent": ""
					},
					"LY-NQ": {
						"category": "popularate",
						"code": "LY-NQ",
						"name": "An Nuqāţ al Khams",
						"parent": ""
					},
					"LY-SB": {
						"category": "popularate",
						"code": "LY-SB",
						"name": "Sabhā",
						"parent": ""
					},
					"LY-SR": {
						"category": "popularate",
						"code": "LY-SR",
						"name": "Surt",
						"parent": ""
					},
					"LY-TB": {
						"category": "popularate",
						"code": "LY-TB",
						"name": "Ţarābulus",
						"parent": ""
					},
					"LY-WA": {
						"category": "popularate",
						"code": "LY-WA",
						"name": "Al Wāḩāt",
						"parent": ""
					},
					"LY-WD": {
						"category": "popularate",
						"code": "LY-WD",
						"name": "Wādī al Ḩayāt",
						"parent": ""
					},
					"LY-WS": {
						"category": "popularate",
						"code": "LY-WS",
						"name": "Wādī ash Shāţi’",
						"parent": ""
					},
					"LY-ZA": {
						"category": "popularate",
						"code": "LY-ZA",
						"name": "Az Zāwiyah",
						"parent": ""
					}
				}
			},
			"LCA": {
				"threeLetterCode": "LCA",
				"shortName": "Saint Lucia",
				"shortNameUpperCase": "SAINT LUCIA",
				"fullName": "Saint Lucia",
				"subdivisionLabel": "district",
				"subdivisions": {
					"LC-01": {
						"category": "district",
						"code": "LC-01",
						"name": "Anse la Raye",
						"parent": ""
					},
					"LC-02": {
						"category": "district",
						"code": "LC-02",
						"name": "Castries",
						"parent": ""
					},
					"LC-03": {
						"category": "district",
						"code": "LC-03",
						"name": "Choiseul",
						"parent": ""
					},
					"LC-05": {
						"category": "district",
						"code": "LC-05",
						"name": "Dennery",
						"parent": ""
					},
					"LC-06": {
						"category": "district",
						"code": "LC-06",
						"name": "Gros Islet",
						"parent": ""
					},
					"LC-07": {
						"category": "district",
						"code": "LC-07",
						"name": "Laborie",
						"parent": ""
					},
					"LC-08": {
						"category": "district",
						"code": "LC-08",
						"name": "Micoud",
						"parent": ""
					},
					"LC-10": {
						"category": "district",
						"code": "LC-10",
						"name": "Soufrière",
						"parent": ""
					},
					"LC-11": {
						"category": "district",
						"code": "LC-11",
						"name": "Vieux Fort",
						"parent": ""
					},
					"LC-12": {
						"category": "district",
						"code": "LC-12",
						"name": "Canaries",
						"parent": ""
					}
				}
			},
			"LIE": {
				"threeLetterCode": "LIE",
				"shortName": "Liechtenstein",
				"shortNameUpperCase": "LIECHTENSTEIN",
				"fullName": "the Principality of Liechtenstein",
				"subdivisionLabel": "commune",
				"subdivisions": {
					"LI-01": {
						"category": "commune",
						"code": "LI-01",
						"name": "Balzers",
						"parent": ""
					},
					"LI-02": {
						"category": "commune",
						"code": "LI-02",
						"name": "Eschen",
						"parent": ""
					},
					"LI-03": {
						"category": "commune",
						"code": "LI-03",
						"name": "Gamprin",
						"parent": ""
					},
					"LI-04": {
						"category": "commune",
						"code": "LI-04",
						"name": "Mauren",
						"parent": ""
					},
					"LI-05": {
						"category": "commune",
						"code": "LI-05",
						"name": "Planken",
						"parent": ""
					},
					"LI-06": {
						"category": "commune",
						"code": "LI-06",
						"name": "Ruggell",
						"parent": ""
					},
					"LI-07": {
						"category": "commune",
						"code": "LI-07",
						"name": "Schaan",
						"parent": ""
					},
					"LI-08": {
						"category": "commune",
						"code": "LI-08",
						"name": "Schellenberg",
						"parent": ""
					},
					"LI-09": {
						"category": "commune",
						"code": "LI-09",
						"name": "Triesen",
						"parent": ""
					},
					"LI-10": {
						"category": "commune",
						"code": "LI-10",
						"name": "Triesenberg",
						"parent": ""
					},
					"LI-11": {
						"category": "commune",
						"code": "LI-11",
						"name": "Vaduz",
						"parent": ""
					}
				}
			},
			"LKA": {
				"threeLetterCode": "LKA",
				"shortName": "Sri Lanka",
				"shortNameUpperCase": "SRI LANKA",
				"fullName": "the Democratic Socialist Republic of Sri Lanka",
				"subdivisionLabel": "district",
				"subdivisions": {
					"LK-1": {
						"category": "province",
						"code": "LK-1",
						"name": "Western Province",
						"parent": ""
					},
					"LK-11": {
						"category": "district",
						"code": "LK-11",
						"name": "Colombo",
						"parent": "LK-2"
					},
					"LK-12": {
						"category": "district",
						"code": "LK-12",
						"name": "Gampaha",
						"parent": "LK-3"
					},
					"LK-13": {
						"category": "district",
						"code": "LK-13",
						"name": "Kalutara",
						"parent": "LK-4"
					},
					"LK-2": {
						"category": "province",
						"code": "LK-2",
						"name": "Central Province",
						"parent": ""
					},
					"LK-21": {
						"category": "district",
						"code": "LK-21",
						"name": "Kandy",
						"parent": "LK-4"
					},
					"LK-22": {
						"category": "district",
						"code": "LK-22",
						"name": "Matale",
						"parent": "LK-5"
					},
					"LK-23": {
						"category": "district",
						"code": "LK-23",
						"name": "Nuwara Eliya",
						"parent": "LK-7"
					},
					"LK-3": {
						"category": "province",
						"code": "LK-3",
						"name": "Southern Province",
						"parent": ""
					},
					"LK-31": {
						"category": "district",
						"code": "LK-31",
						"name": "Galle",
						"parent": "LK-2"
					},
					"LK-32": {
						"category": "district",
						"code": "LK-32",
						"name": "Matara",
						"parent": "LK-5"
					},
					"LK-33": {
						"category": "district",
						"code": "LK-33",
						"name": "Hambantota",
						"parent": "LK-3"
					},
					"LK-4": {
						"category": "province",
						"code": "LK-4",
						"name": "Northern Province",
						"parent": ""
					},
					"LK-41": {
						"category": "district",
						"code": "LK-41",
						"name": "Jaffna",
						"parent": "LK-3"
					},
					"LK-42": {
						"category": "district",
						"code": "LK-42",
						"name": "Kilinochchi",
						"parent": "LK-4"
					},
					"LK-43": {
						"category": "district",
						"code": "LK-43",
						"name": "Mannar",
						"parent": "LK-5"
					},
					"LK-44": {
						"category": "district",
						"code": "LK-44",
						"name": "Vavuniya",
						"parent": "LK-9"
					},
					"LK-45": {
						"category": "district",
						"code": "LK-45",
						"name": "Mullaittivu",
						"parent": "LK-6"
					},
					"LK-5": {
						"category": "province",
						"code": "LK-5",
						"name": "Eastern Province",
						"parent": ""
					},
					"LK-51": {
						"category": "district",
						"code": "LK-51",
						"name": "Batticaloa",
						"parent": "LK-2"
					},
					"LK-52": {
						"category": "district",
						"code": "LK-52",
						"name": "Ampara",
						"parent": "LK-1"
					},
					"LK-53": {
						"category": "district",
						"code": "LK-53",
						"name": "Trincomalee",
						"parent": "LK-9"
					},
					"LK-6": {
						"category": "province",
						"code": "LK-6",
						"name": "North Western Province",
						"parent": ""
					},
					"LK-61": {
						"category": "district",
						"code": "LK-61",
						"name": "Kurunegala",
						"parent": "LK-4"
					},
					"LK-62": {
						"category": "district",
						"code": "LK-62",
						"name": "Puttalam",
						"parent": "LK-8"
					},
					"LK-7": {
						"category": "province",
						"code": "LK-7",
						"name": "North Central Province",
						"parent": ""
					},
					"LK-71": {
						"category": "district",
						"code": "LK-71",
						"name": "Anuradhapura",
						"parent": "LK-1"
					},
					"LK-72": {
						"category": "district",
						"code": "LK-72",
						"name": "Polonnaruwa",
						"parent": "LK-7"
					},
					"LK-8": {
						"category": "province",
						"code": "LK-8",
						"name": "Uva Province",
						"parent": ""
					},
					"LK-81": {
						"category": "district",
						"code": "LK-81",
						"name": "Badulla",
						"parent": "LK-1"
					},
					"LK-82": {
						"category": "district",
						"code": "LK-82",
						"name": "Monaragala",
						"parent": "LK-6"
					},
					"LK-9": {
						"category": "province",
						"code": "LK-9",
						"name": "Sabaragamuwa Province",
						"parent": ""
					},
					"LK-91": {
						"category": "district",
						"code": "LK-91",
						"name": "Ratnapura",
						"parent": "LK-8"
					},
					"LK-92": {
						"category": "district",
						"code": "LK-92",
						"name": "Kegalla",
						"parent": "LK-4"
					}
				}
			},
			"LSO": {
				"threeLetterCode": "LSO",
				"shortName": "Lesotho",
				"shortNameUpperCase": "LESOTHO",
				"fullName": "the Kingdom of Lesotho",
				"subdivisionLabel": "district",
				"subdivisions": {
					"LS-A": {
						"category": "district",
						"code": "LS-A",
						"name": "Maseru",
						"parent": ""
					},
					"LS-B": {
						"category": "district",
						"code": "LS-B",
						"name": "Butha-Buthe",
						"parent": ""
					},
					"LS-C": {
						"category": "district",
						"code": "LS-C",
						"name": "Leribe",
						"parent": ""
					},
					"LS-D": {
						"category": "district",
						"code": "LS-D",
						"name": "Berea",
						"parent": ""
					},
					"LS-E": {
						"category": "district",
						"code": "LS-E",
						"name": "Mafeteng",
						"parent": ""
					},
					"LS-F": {
						"category": "district",
						"code": "LS-F",
						"name": "Mohale's Hoek",
						"parent": ""
					},
					"LS-G": {
						"category": "district",
						"code": "LS-G",
						"name": "Quthing",
						"parent": ""
					},
					"LS-H": {
						"category": "district",
						"code": "LS-H",
						"name": "Qacha's Nek",
						"parent": ""
					},
					"LS-J": {
						"category": "district",
						"code": "LS-J",
						"name": "Mokhotlong",
						"parent": ""
					},
					"LS-K": {
						"category": "district",
						"code": "LS-K",
						"name": "Thaba-Tseka",
						"parent": ""
					}
				}
			},
			"LTU": {
				"threeLetterCode": "LTU",
				"shortName": "Lithuania",
				"shortNameUpperCase": "LITHUANIA",
				"fullName": "the Republic of Lithuania",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"LT-01": {
						"category": "district municipality",
						"code": "LT-01",
						"name": "Akmenė",
						"parent": ""
					},
					"LT-02": {
						"category": "city municipality",
						"code": "LT-02",
						"name": "Alytaus miestas",
						"parent": ""
					},
					"LT-03": {
						"category": "district municipality",
						"code": "LT-03",
						"name": "Alytus",
						"parent": ""
					},
					"LT-04": {
						"category": "district municipality",
						"code": "LT-04",
						"name": "Anykščiai",
						"parent": ""
					},
					"LT-05": {
						"category": "municipality",
						"code": "LT-05",
						"name": "Birštono",
						"parent": ""
					},
					"LT-06": {
						"category": "district municipality",
						"code": "LT-06",
						"name": "Biržai",
						"parent": ""
					},
					"LT-07": {
						"category": "municipality",
						"code": "LT-07",
						"name": "Druskininkai",
						"parent": ""
					},
					"LT-08": {
						"category": "municipality",
						"code": "LT-08",
						"name": "Elektrėnai",
						"parent": ""
					},
					"LT-09": {
						"category": "district municipality",
						"code": "LT-09",
						"name": "Ignalina",
						"parent": ""
					},
					"LT-10": {
						"category": "district municipality",
						"code": "LT-10",
						"name": "Jonava",
						"parent": ""
					},
					"LT-11": {
						"category": "district municipality",
						"code": "LT-11",
						"name": "Joniškis",
						"parent": ""
					},
					"LT-12": {
						"category": "district municipality",
						"code": "LT-12",
						"name": "Jurbarkas",
						"parent": ""
					},
					"LT-13": {
						"category": "district municipality",
						"code": "LT-13",
						"name": "Kaišiadorys",
						"parent": ""
					},
					"LT-14": {
						"category": "municipality",
						"code": "LT-14",
						"name": "Kalvarijos",
						"parent": ""
					},
					"LT-15": {
						"category": "city municipality",
						"code": "LT-15",
						"name": "Kauno miestas",
						"parent": ""
					},
					"LT-16": {
						"category": "district municipality",
						"code": "LT-16",
						"name": "Kaunas",
						"parent": ""
					},
					"LT-17": {
						"category": "municipality",
						"code": "LT-17",
						"name": "Kazlų Rūdos",
						"parent": ""
					},
					"LT-18": {
						"category": "district municipality",
						"code": "LT-18",
						"name": "Kėdainiai",
						"parent": ""
					},
					"LT-19": {
						"category": "district municipality",
						"code": "LT-19",
						"name": "Kelmė",
						"parent": ""
					},
					"LT-20": {
						"category": "city municipality",
						"code": "LT-20",
						"name": "Klaipėdos miestas",
						"parent": ""
					},
					"LT-21": {
						"category": "district municipality",
						"code": "LT-21",
						"name": "Klaipėda",
						"parent": ""
					},
					"LT-22": {
						"category": "district municipality",
						"code": "LT-22",
						"name": "Kretinga",
						"parent": ""
					},
					"LT-23": {
						"category": "district municipality",
						"code": "LT-23",
						"name": "Kupiškis",
						"parent": ""
					},
					"LT-24": {
						"category": "district municipality",
						"code": "LT-24",
						"name": "Lazdijai",
						"parent": ""
					},
					"LT-25": {
						"category": "district municipality",
						"code": "LT-25",
						"name": "Marijampolė",
						"parent": ""
					},
					"LT-26": {
						"category": "district municipality",
						"code": "LT-26",
						"name": "Mažeikiai",
						"parent": ""
					},
					"LT-27": {
						"category": "district municipality",
						"code": "LT-27",
						"name": "Molėtai",
						"parent": ""
					},
					"LT-28": {
						"category": "municipality",
						"code": "LT-28",
						"name": "Neringa",
						"parent": ""
					},
					"LT-29": {
						"category": "municipality",
						"code": "LT-29",
						"name": "Pagėgiai",
						"parent": ""
					},
					"LT-30": {
						"category": "district municipality",
						"code": "LT-30",
						"name": "Pakruojis",
						"parent": ""
					},
					"LT-31": {
						"category": "city municipality",
						"code": "LT-31",
						"name": "Palangos miestas",
						"parent": ""
					},
					"LT-32": {
						"category": "city municipality",
						"code": "LT-32",
						"name": "Panevėžio miestas",
						"parent": ""
					},
					"LT-33": {
						"category": "district municipality",
						"code": "LT-33",
						"name": "Panevėžys",
						"parent": ""
					},
					"LT-34": {
						"category": "district municipality",
						"code": "LT-34",
						"name": "Pasvalys",
						"parent": ""
					},
					"LT-35": {
						"category": "district municipality",
						"code": "LT-35",
						"name": "Plungė",
						"parent": ""
					},
					"LT-36": {
						"category": "district municipality",
						"code": "LT-36",
						"name": "Prienai",
						"parent": ""
					},
					"LT-37": {
						"category": "district municipality",
						"code": "LT-37",
						"name": "Radviliškis",
						"parent": ""
					},
					"LT-38": {
						"category": "district municipality",
						"code": "LT-38",
						"name": "Raseiniai",
						"parent": ""
					},
					"LT-39": {
						"category": "municipality",
						"code": "LT-39",
						"name": "Rietavo",
						"parent": ""
					},
					"LT-40": {
						"category": "district municipality",
						"code": "LT-40",
						"name": "Rokiškis",
						"parent": ""
					},
					"LT-41": {
						"category": "district municipality",
						"code": "LT-41",
						"name": "Šakiai",
						"parent": ""
					},
					"LT-42": {
						"category": "district municipality",
						"code": "LT-42",
						"name": "Šalčininkai",
						"parent": ""
					},
					"LT-43": {
						"category": "city municipality",
						"code": "LT-43",
						"name": "Šiaulių miestas",
						"parent": ""
					},
					"LT-44": {
						"category": "district municipality",
						"code": "LT-44",
						"name": "Šiauliai",
						"parent": ""
					},
					"LT-45": {
						"category": "district municipality",
						"code": "LT-45",
						"name": "Šilalė",
						"parent": ""
					},
					"LT-46": {
						"category": "district municipality",
						"code": "LT-46",
						"name": "Šilutė",
						"parent": ""
					},
					"LT-47": {
						"category": "district municipality",
						"code": "LT-47",
						"name": "Širvintos",
						"parent": ""
					},
					"LT-48": {
						"category": "district municipality",
						"code": "LT-48",
						"name": "Skuodas",
						"parent": ""
					},
					"LT-49": {
						"category": "district municipality",
						"code": "LT-49",
						"name": "Švenčionys",
						"parent": ""
					},
					"LT-50": {
						"category": "district municipality",
						"code": "LT-50",
						"name": "Tauragė",
						"parent": ""
					},
					"LT-51": {
						"category": "district municipality",
						"code": "LT-51",
						"name": "Telšiai",
						"parent": ""
					},
					"LT-52": {
						"category": "district municipality",
						"code": "LT-52",
						"name": "Trakai",
						"parent": ""
					},
					"LT-53": {
						"category": "district municipality",
						"code": "LT-53",
						"name": "Ukmergė",
						"parent": ""
					},
					"LT-54": {
						"category": "district municipality",
						"code": "LT-54",
						"name": "Utena",
						"parent": ""
					},
					"LT-55": {
						"category": "district municipality",
						"code": "LT-55",
						"name": "Varėna",
						"parent": ""
					},
					"LT-56": {
						"category": "district municipality",
						"code": "LT-56",
						"name": "Vilkaviškis",
						"parent": ""
					},
					"LT-57": {
						"category": "city municipality",
						"code": "LT-57",
						"name": "Vilniaus miestas",
						"parent": ""
					},
					"LT-58": {
						"category": "district municipality",
						"code": "LT-58",
						"name": "Vilnius",
						"parent": ""
					},
					"LT-59": {
						"category": "municipality",
						"code": "LT-59",
						"name": "Visaginas",
						"parent": ""
					},
					"LT-60": {
						"category": "district municipality",
						"code": "LT-60",
						"name": "Zarasai",
						"parent": ""
					},
					"LT-AL": {
						"category": "county",
						"code": "LT-AL",
						"name": "Alytaus apskritis",
						"parent": ""
					},
					"LT-KL": {
						"category": "county",
						"code": "LT-KL",
						"name": "Klaipėdos apskritis",
						"parent": ""
					},
					"LT-KU": {
						"category": "county",
						"code": "LT-KU",
						"name": "Kauno apskritis",
						"parent": ""
					},
					"LT-MR": {
						"category": "county",
						"code": "LT-MR",
						"name": "Marijampolės apskritis",
						"parent": ""
					},
					"LT-PN": {
						"category": "county",
						"code": "LT-PN",
						"name": "Panevėžio apskritis",
						"parent": ""
					},
					"LT-SA": {
						"category": "county",
						"code": "LT-SA",
						"name": "Šiaulių apskritis",
						"parent": ""
					},
					"LT-TA": {
						"category": "county",
						"code": "LT-TA",
						"name": "Tauragės apskritis",
						"parent": ""
					},
					"LT-TE": {
						"category": "county",
						"code": "LT-TE",
						"name": "Telšių apskritis",
						"parent": ""
					},
					"LT-UT": {
						"category": "county",
						"code": "LT-UT",
						"name": "Utenos apskritis",
						"parent": ""
					},
					"LT-VL": {
						"category": "county",
						"code": "LT-VL",
						"name": "Vilniaus apskritis",
						"parent": ""
					}
				}
			},
			"LUX": {
				"threeLetterCode": "LUX",
				"shortName": "Luxembourg",
				"shortNameUpperCase": "LUXEMBOURG",
				"fullName": "the Grand Duchy of Luxembourg",
				"subdivisionLabel": "canton",
				"subdivisions": {
					"LU-CA": {
						"category": "canton",
						"code": "LU-CA",
						"name": "Capellen",
						"parent": ""
					},
					"LU-CL": {
						"category": "canton",
						"code": "LU-CL",
						"name": "Clerf",
						"parent": ""
					},
					"LU-DI": {
						"category": "canton",
						"code": "LU-DI",
						"name": "Diekirch",
						"parent": ""
					},
					"LU-EC": {
						"category": "canton",
						"code": "LU-EC",
						"name": "Echternach",
						"parent": ""
					},
					"LU-ES": {
						"category": "canton",
						"code": "LU-ES",
						"name": "Esch an der Alzette",
						"parent": ""
					},
					"LU-GR": {
						"category": "canton",
						"code": "LU-GR",
						"name": "Grevenmacher",
						"parent": ""
					},
					"LU-LU": {
						"category": "canton",
						"code": "LU-LU",
						"name": "Luxemburg",
						"parent": ""
					},
					"LU-ME": {
						"category": "canton",
						"code": "LU-ME",
						"name": "Mersch",
						"parent": ""
					},
					"LU-RD": {
						"category": "canton",
						"code": "LU-RD",
						"name": "Redingen",
						"parent": ""
					},
					"LU-RM": {
						"category": "canton",
						"code": "LU-RM",
						"name": "Remich",
						"parent": ""
					},
					"LU-VD": {
						"category": "canton",
						"code": "LU-VD",
						"name": "Vianden",
						"parent": ""
					},
					"LU-WI": {
						"category": "canton",
						"code": "LU-WI",
						"name": "Wiltz",
						"parent": ""
					}
				}
			},
			"LVA": {
				"threeLetterCode": "LVA",
				"shortName": "Latvia",
				"shortNameUpperCase": "LATVIA",
				"fullName": "the Republic of Latvia",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"LV-001": {
						"category": "municipality",
						"code": "LV-001",
						"name": "Aglonas novads",
						"parent": ""
					},
					"LV-002": {
						"category": "municipality",
						"code": "LV-002",
						"name": "Aizkraukles novads",
						"parent": ""
					},
					"LV-003": {
						"category": "municipality",
						"code": "LV-003",
						"name": "Aizputes novads",
						"parent": ""
					},
					"LV-004": {
						"category": "municipality",
						"code": "LV-004",
						"name": "Aknīstes novads",
						"parent": ""
					},
					"LV-005": {
						"category": "municipality",
						"code": "LV-005",
						"name": "Alojas novads",
						"parent": ""
					},
					"LV-006": {
						"category": "municipality",
						"code": "LV-006",
						"name": "Alsungas novads",
						"parent": ""
					},
					"LV-007": {
						"category": "municipality",
						"code": "LV-007",
						"name": "Alūksnes novads",
						"parent": ""
					},
					"LV-008": {
						"category": "municipality",
						"code": "LV-008",
						"name": "Amatas novads",
						"parent": ""
					},
					"LV-009": {
						"category": "municipality",
						"code": "LV-009",
						"name": "Apes novads",
						"parent": ""
					},
					"LV-010": {
						"category": "municipality",
						"code": "LV-010",
						"name": "Auces novads",
						"parent": ""
					},
					"LV-011": {
						"category": "municipality",
						"code": "LV-011",
						"name": "Ādažu novads",
						"parent": ""
					},
					"LV-012": {
						"category": "municipality",
						"code": "LV-012",
						"name": "Babītes novads",
						"parent": ""
					},
					"LV-013": {
						"category": "municipality",
						"code": "LV-013",
						"name": "Baldones novads",
						"parent": ""
					},
					"LV-014": {
						"category": "municipality",
						"code": "LV-014",
						"name": "Baltinavas novads",
						"parent": ""
					},
					"LV-015": {
						"category": "municipality",
						"code": "LV-015",
						"name": "Balvu novads",
						"parent": ""
					},
					"LV-016": {
						"category": "municipality",
						"code": "LV-016",
						"name": "Bauskas novads",
						"parent": ""
					},
					"LV-017": {
						"category": "municipality",
						"code": "LV-017",
						"name": "Beverīnas novads",
						"parent": ""
					},
					"LV-018": {
						"category": "municipality",
						"code": "LV-018",
						"name": "Brocēnu novads",
						"parent": ""
					},
					"LV-019": {
						"category": "municipality",
						"code": "LV-019",
						"name": "Burtnieku novads",
						"parent": ""
					},
					"LV-020": {
						"category": "municipality",
						"code": "LV-020",
						"name": "Carnikavas novads",
						"parent": ""
					},
					"LV-021": {
						"category": "municipality",
						"code": "LV-021",
						"name": "Cesvaines novads",
						"parent": ""
					},
					"LV-022": {
						"category": "municipality",
						"code": "LV-022",
						"name": "Cēsu novads",
						"parent": ""
					},
					"LV-023": {
						"category": "municipality",
						"code": "LV-023",
						"name": "Ciblas novads",
						"parent": ""
					},
					"LV-024": {
						"category": "municipality",
						"code": "LV-024",
						"name": "Dagdas novads",
						"parent": ""
					},
					"LV-025": {
						"category": "municipality",
						"code": "LV-025",
						"name": "Daugavpils novads",
						"parent": ""
					},
					"LV-026": {
						"category": "municipality",
						"code": "LV-026",
						"name": "Dobeles novads",
						"parent": ""
					},
					"LV-027": {
						"category": "municipality",
						"code": "LV-027",
						"name": "Dundagas novads",
						"parent": ""
					},
					"LV-028": {
						"category": "municipality",
						"code": "LV-028",
						"name": "Durbes novads",
						"parent": ""
					},
					"LV-029": {
						"category": "municipality",
						"code": "LV-029",
						"name": "Engures novads",
						"parent": ""
					},
					"LV-030": {
						"category": "municipality",
						"code": "LV-030",
						"name": "Ērgļu novads",
						"parent": ""
					},
					"LV-031": {
						"category": "municipality",
						"code": "LV-031",
						"name": "Garkalnes novads",
						"parent": ""
					},
					"LV-032": {
						"category": "municipality",
						"code": "LV-032",
						"name": "Grobiņas novads",
						"parent": ""
					},
					"LV-033": {
						"category": "municipality",
						"code": "LV-033",
						"name": "Gulbenes novads",
						"parent": ""
					},
					"LV-034": {
						"category": "municipality",
						"code": "LV-034",
						"name": "Iecavas novads",
						"parent": ""
					},
					"LV-035": {
						"category": "municipality",
						"code": "LV-035",
						"name": "Ikšķiles novads",
						"parent": ""
					},
					"LV-036": {
						"category": "municipality",
						"code": "LV-036",
						"name": "Ilūkstes novads",
						"parent": ""
					},
					"LV-037": {
						"category": "municipality",
						"code": "LV-037",
						"name": "Inčukalna novads",
						"parent": ""
					},
					"LV-038": {
						"category": "municipality",
						"code": "LV-038",
						"name": "Jaunjelgavas novads",
						"parent": ""
					},
					"LV-039": {
						"category": "municipality",
						"code": "LV-039",
						"name": "Jaunpiebalgas novads",
						"parent": ""
					},
					"LV-040": {
						"category": "municipality",
						"code": "LV-040",
						"name": "Jaunpils novads",
						"parent": ""
					},
					"LV-041": {
						"category": "municipality",
						"code": "LV-041",
						"name": "Jelgavas novads",
						"parent": ""
					},
					"LV-042": {
						"category": "municipality",
						"code": "LV-042",
						"name": "Jēkabpils novads",
						"parent": ""
					},
					"LV-043": {
						"category": "municipality",
						"code": "LV-043",
						"name": "Kandavas novads",
						"parent": ""
					},
					"LV-044": {
						"category": "municipality",
						"code": "LV-044",
						"name": "Kārsavas novads",
						"parent": ""
					},
					"LV-045": {
						"category": "municipality",
						"code": "LV-045",
						"name": "Kocēnu novads",
						"parent": ""
					},
					"LV-046": {
						"category": "municipality",
						"code": "LV-046",
						"name": "Kokneses novads",
						"parent": ""
					},
					"LV-047": {
						"category": "municipality",
						"code": "LV-047",
						"name": "Krāslavas novads",
						"parent": ""
					},
					"LV-048": {
						"category": "municipality",
						"code": "LV-048",
						"name": "Krimuldas novads",
						"parent": ""
					},
					"LV-049": {
						"category": "municipality",
						"code": "LV-049",
						"name": "Krustpils novads",
						"parent": ""
					},
					"LV-050": {
						"category": "municipality",
						"code": "LV-050",
						"name": "Kuldīgas novads",
						"parent": ""
					},
					"LV-051": {
						"category": "municipality",
						"code": "LV-051",
						"name": "Ķeguma novads",
						"parent": ""
					},
					"LV-052": {
						"category": "municipality",
						"code": "LV-052",
						"name": "Ķekavas novads",
						"parent": ""
					},
					"LV-053": {
						"category": "municipality",
						"code": "LV-053",
						"name": "Lielvārdes novads",
						"parent": ""
					},
					"LV-054": {
						"category": "municipality",
						"code": "LV-054",
						"name": "Limbažu novads",
						"parent": ""
					},
					"LV-055": {
						"category": "municipality",
						"code": "LV-055",
						"name": "Līgatnes novads",
						"parent": ""
					},
					"LV-056": {
						"category": "municipality",
						"code": "LV-056",
						"name": "Līvānu novads",
						"parent": ""
					},
					"LV-057": {
						"category": "municipality",
						"code": "LV-057",
						"name": "Lubānas novads",
						"parent": ""
					},
					"LV-058": {
						"category": "municipality",
						"code": "LV-058",
						"name": "Ludzas novads",
						"parent": ""
					},
					"LV-059": {
						"category": "municipality",
						"code": "LV-059",
						"name": "Madonas novads",
						"parent": ""
					},
					"LV-060": {
						"category": "municipality",
						"code": "LV-060",
						"name": "Mazsalacas novads",
						"parent": ""
					},
					"LV-061": {
						"category": "municipality",
						"code": "LV-061",
						"name": "Mālpils novads",
						"parent": ""
					},
					"LV-062": {
						"category": "municipality",
						"code": "LV-062",
						"name": "Mārupes novads",
						"parent": ""
					},
					"LV-063": {
						"category": "municipality",
						"code": "LV-063",
						"name": "Mērsraga novads",
						"parent": ""
					},
					"LV-064": {
						"category": "municipality",
						"code": "LV-064",
						"name": "Naukšēnu novads",
						"parent": ""
					},
					"LV-065": {
						"category": "municipality",
						"code": "LV-065",
						"name": "Neretas novads",
						"parent": ""
					},
					"LV-066": {
						"category": "municipality",
						"code": "LV-066",
						"name": "Nīcas novads",
						"parent": ""
					},
					"LV-067": {
						"category": "municipality",
						"code": "LV-067",
						"name": "Ogres novads",
						"parent": ""
					},
					"LV-068": {
						"category": "municipality",
						"code": "LV-068",
						"name": "Olaines novads",
						"parent": ""
					},
					"LV-069": {
						"category": "municipality",
						"code": "LV-069",
						"name": "Ozolnieku novads",
						"parent": ""
					},
					"LV-070": {
						"category": "municipality",
						"code": "LV-070",
						"name": "Pārgaujas novads",
						"parent": ""
					},
					"LV-071": {
						"category": "municipality",
						"code": "LV-071",
						"name": "Pāvilostas novads",
						"parent": ""
					},
					"LV-072": {
						"category": "municipality",
						"code": "LV-072",
						"name": "Pļaviņu novads",
						"parent": ""
					},
					"LV-073": {
						"category": "municipality",
						"code": "LV-073",
						"name": "Preiļu novads",
						"parent": ""
					},
					"LV-074": {
						"category": "municipality",
						"code": "LV-074",
						"name": "Priekules novads",
						"parent": ""
					},
					"LV-075": {
						"category": "municipality",
						"code": "LV-075",
						"name": "Priekuļu novads",
						"parent": ""
					},
					"LV-076": {
						"category": "municipality",
						"code": "LV-076",
						"name": "Raunas novads",
						"parent": ""
					},
					"LV-077": {
						"category": "municipality",
						"code": "LV-077",
						"name": "Rēzeknes novads",
						"parent": ""
					},
					"LV-078": {
						"category": "municipality",
						"code": "LV-078",
						"name": "Riebiņu novads",
						"parent": ""
					},
					"LV-079": {
						"category": "municipality",
						"code": "LV-079",
						"name": "Rojas novads",
						"parent": ""
					},
					"LV-080": {
						"category": "municipality",
						"code": "LV-080",
						"name": "Ropažu novads",
						"parent": ""
					},
					"LV-081": {
						"category": "municipality",
						"code": "LV-081",
						"name": "Rucavas novads",
						"parent": ""
					},
					"LV-082": {
						"category": "municipality",
						"code": "LV-082",
						"name": "Rugāju novads",
						"parent": ""
					},
					"LV-083": {
						"category": "municipality",
						"code": "LV-083",
						"name": "Rundāles novads",
						"parent": ""
					},
					"LV-084": {
						"category": "municipality",
						"code": "LV-084",
						"name": "Rūjienas novads",
						"parent": ""
					},
					"LV-085": {
						"category": "municipality",
						"code": "LV-085",
						"name": "Salas novads",
						"parent": ""
					},
					"LV-086": {
						"category": "municipality",
						"code": "LV-086",
						"name": "Salacgrīvas novads",
						"parent": ""
					},
					"LV-087": {
						"category": "municipality",
						"code": "LV-087",
						"name": "Salaspils novads",
						"parent": ""
					},
					"LV-088": {
						"category": "municipality",
						"code": "LV-088",
						"name": "Saldus novads",
						"parent": ""
					},
					"LV-089": {
						"category": "municipality",
						"code": "LV-089",
						"name": "Saulkrastu novads",
						"parent": ""
					},
					"LV-090": {
						"category": "municipality",
						"code": "LV-090",
						"name": "Sējas novads",
						"parent": ""
					},
					"LV-091": {
						"category": "municipality",
						"code": "LV-091",
						"name": "Siguldas novads",
						"parent": ""
					},
					"LV-092": {
						"category": "municipality",
						"code": "LV-092",
						"name": "Skrīveru novads",
						"parent": ""
					},
					"LV-093": {
						"category": "municipality",
						"code": "LV-093",
						"name": "Skrundas novads",
						"parent": ""
					},
					"LV-094": {
						"category": "municipality",
						"code": "LV-094",
						"name": "Smiltenes novads",
						"parent": ""
					},
					"LV-095": {
						"category": "municipality",
						"code": "LV-095",
						"name": "Stopiņu novads",
						"parent": ""
					},
					"LV-096": {
						"category": "municipality",
						"code": "LV-096",
						"name": "Strenču novads",
						"parent": ""
					},
					"LV-097": {
						"category": "municipality",
						"code": "LV-097",
						"name": "Talsu novads",
						"parent": ""
					},
					"LV-098": {
						"category": "municipality",
						"code": "LV-098",
						"name": "Tērvetes novads",
						"parent": ""
					},
					"LV-099": {
						"category": "municipality",
						"code": "LV-099",
						"name": "Tukuma novads",
						"parent": ""
					},
					"LV-100": {
						"category": "municipality",
						"code": "LV-100",
						"name": "Vaiņodes novads",
						"parent": ""
					},
					"LV-101": {
						"category": "municipality",
						"code": "LV-101",
						"name": "Valkas novads",
						"parent": ""
					},
					"LV-102": {
						"category": "municipality",
						"code": "LV-102",
						"name": "Varakļānu novads",
						"parent": ""
					},
					"LV-103": {
						"category": "municipality",
						"code": "LV-103",
						"name": "Vārkavas novads",
						"parent": ""
					},
					"LV-104": {
						"category": "municipality",
						"code": "LV-104",
						"name": "Vecpiebalgas novads",
						"parent": ""
					},
					"LV-105": {
						"category": "municipality",
						"code": "LV-105",
						"name": "Vecumnieku novads",
						"parent": ""
					},
					"LV-106": {
						"category": "municipality",
						"code": "LV-106",
						"name": "Ventspils novads",
						"parent": ""
					},
					"LV-107": {
						"category": "municipality",
						"code": "LV-107",
						"name": "Viesītes novads",
						"parent": ""
					},
					"LV-108": {
						"category": "municipality",
						"code": "LV-108",
						"name": "Viļakas novads",
						"parent": ""
					},
					"LV-109": {
						"category": "municipality",
						"code": "LV-109",
						"name": "Viļānu novads",
						"parent": ""
					},
					"LV-110": {
						"category": "municipality",
						"code": "LV-110",
						"name": "Zilupes novads",
						"parent": ""
					},
					"LV-DGV": {
						"category": "republican city",
						"code": "LV-DGV",
						"name": "Daugavpils",
						"parent": ""
					},
					"LV-JEL": {
						"category": "republican city",
						"code": "LV-JEL",
						"name": "Jelgava",
						"parent": ""
					},
					"LV-JKB": {
						"category": "republican city",
						"code": "LV-JKB",
						"name": "Jēkabpils",
						"parent": ""
					},
					"LV-JUR": {
						"category": "republican city",
						"code": "LV-JUR",
						"name": "Jūrmala",
						"parent": ""
					},
					"LV-LPX": {
						"category": "republican city",
						"code": "LV-LPX",
						"name": "Liepāja",
						"parent": ""
					},
					"LV-REZ": {
						"category": "republican city",
						"code": "LV-REZ",
						"name": "Rēzekne",
						"parent": ""
					},
					"LV-RIX": {
						"category": "republican city",
						"code": "LV-RIX",
						"name": "Rīga",
						"parent": ""
					},
					"LV-VEN": {
						"category": "republican city",
						"code": "LV-VEN",
						"name": "Ventspils",
						"parent": ""
					},
					"LV-VMR": {
						"category": "republican city",
						"code": "LV-VMR",
						"name": "Valmiera",
						"parent": ""
					}
				}
			},
			"MAC": {
				"threeLetterCode": "MAC",
				"shortName": "Macao",
				"shortNameUpperCase": "MACAO",
				"fullName": "Macao Special Administrative Region of China",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"MAF": {
				"threeLetterCode": "MAF",
				"shortName": "Saint Martin (French part)",
				"shortNameUpperCase": "SAINT MARTIN (FRENCH PART)",
				"fullName": "Saint Martin (French part)",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"MAR": {
				"threeLetterCode": "MAR",
				"shortName": "Morocco",
				"shortNameUpperCase": "MOROCCO",
				"fullName": "the Kingdom of Morocco",
				"subdivisionLabel": "province",
				"subdivisions": {
					"MA-01": {
						"category": "region",
						"code": "MA-01",
						"name": "Tanger-Tétouan",
						"parent": ""
					},
					"MA-02": {
						"category": "region",
						"code": "MA-02",
						"name": "Gharb-Chrarda-Beni Hssen",
						"parent": ""
					},
					"MA-03": {
						"category": "region",
						"code": "MA-03",
						"name": "Taza-Al Hoceima-Taounate",
						"parent": ""
					},
					"MA-04": {
						"category": "region",
						"code": "MA-04",
						"name": "L'Oriental",
						"parent": ""
					},
					"MA-05": {
						"category": "region",
						"code": "MA-05",
						"name": "Fès-Boulemane",
						"parent": ""
					},
					"MA-06": {
						"category": "region",
						"code": "MA-06",
						"name": "Meknès-Tafilalet",
						"parent": ""
					},
					"MA-07": {
						"category": "region",
						"code": "MA-07",
						"name": "Rabat-Salé-Zemmour-Zaer",
						"parent": ""
					},
					"MA-08": {
						"category": "region",
						"code": "MA-08",
						"name": "Grand Casablanca",
						"parent": ""
					},
					"MA-09": {
						"category": "region",
						"code": "MA-09",
						"name": "Chaouia-Ouardigha",
						"parent": ""
					},
					"MA-10": {
						"category": "region",
						"code": "MA-10",
						"name": "Doukkala-Abda",
						"parent": ""
					},
					"MA-11": {
						"category": "region",
						"code": "MA-11",
						"name": "Marrakech-Tensift-Al Haouz",
						"parent": ""
					},
					"MA-12": {
						"category": "region",
						"code": "MA-12",
						"name": "Tadla-Azilal",
						"parent": ""
					},
					"MA-13": {
						"category": "region",
						"code": "MA-13",
						"name": "Sous-Massa-Draa",
						"parent": ""
					},
					"MA-14": {
						"category": "region",
						"code": "MA-14",
						"name": "Guelmim-Es Semara",
						"parent": ""
					},
					"MA-15": {
						"category": "region",
						"code": "MA-15",
						"name": "Laâyoune-Boujdour-Sakia el Hamra",
						"parent": ""
					},
					"MA-16": {
						"category": "region",
						"code": "MA-16",
						"name": "Oued ed Dahab-Lagouira (EH)",
						"parent": ""
					},
					"MA-AGD": {
						"category": "prefecture",
						"code": "MA-AGD",
						"name": "Agadir-Ida-Outanane",
						"parent": "MA-13"
					},
					"MA-AOU": {
						"category": "prefecture",
						"code": "MA-AOU",
						"name": "Aousserd (EH)",
						"parent": "MA-16"
					},
					"MA-ASZ": {
						"category": "province",
						"code": "MA-ASZ",
						"name": "Assa-Zag",
						"parent": "MA-14"
					},
					"MA-AZI": {
						"category": "province",
						"code": "MA-AZI",
						"name": "Azilal",
						"parent": "MA-12"
					},
					"MA-BEM": {
						"category": "province",
						"code": "MA-BEM",
						"name": "Beni Mellal",
						"parent": "MA-12"
					},
					"MA-BER": {
						"category": "province",
						"code": "MA-BER",
						"name": "Berkane",
						"parent": "MA-04"
					},
					"MA-BES": {
						"category": "province",
						"code": "MA-BES",
						"name": "Ben Slimane",
						"parent": "MA-09"
					},
					"MA-BOD": {
						"category": "province",
						"code": "MA-BOD",
						"name": "Boujdour (EH)",
						"parent": "MA-15"
					},
					"MA-BOM": {
						"category": "province",
						"code": "MA-BOM",
						"name": "Boulemane",
						"parent": "MA-05"
					},
					"MA-CAS": {
						"category": "prefecture",
						"code": "MA-CAS",
						"name": "Casablanca",
						"parent": "MA-08"
					},
					"MA-CHE": {
						"category": "province",
						"code": "MA-CHE",
						"name": "Chefchaouen",
						"parent": "MA-01"
					},
					"MA-CHI": {
						"category": "province",
						"code": "MA-CHI",
						"name": "Chichaoua",
						"parent": "MA-11"
					},
					"MA-CHT": {
						"category": "province",
						"code": "MA-CHT",
						"name": "Chtouka-Ait Baha",
						"parent": "MA-13"
					},
					"MA-ERR": {
						"category": "province",
						"code": "MA-ERR",
						"name": "Errachidia",
						"parent": "MA-06"
					},
					"MA-ESI": {
						"category": "province",
						"code": "MA-ESI",
						"name": "Essaouira",
						"parent": "MA-11"
					},
					"MA-ESM": {
						"category": "province",
						"code": "MA-ESM",
						"name": "Es Smara (EH)",
						"parent": "MA-14"
					},
					"MA-FAH": {
						"category": "prefecture",
						"code": "MA-FAH",
						"name": "Fahs-Beni Makada",
						"parent": "MA-01"
					},
					"MA-FES": {
						"category": "prefecture",
						"code": "MA-FES",
						"name": "Fès-Dar-Dbibegh",
						"parent": "MA-05"
					},
					"MA-FIG": {
						"category": "province",
						"code": "MA-FIG",
						"name": "Figuig",
						"parent": "MA-04"
					},
					"MA-GUE": {
						"category": "province",
						"code": "MA-GUE",
						"name": "Guelmim",
						"parent": "MA-14"
					},
					"MA-HAJ": {
						"category": "province",
						"code": "MA-HAJ",
						"name": "El Hajeb",
						"parent": "MA-06"
					},
					"MA-HAO": {
						"category": "province",
						"code": "MA-HAO",
						"name": "Al Haouz",
						"parent": "MA-11"
					},
					"MA-HOC": {
						"category": "province",
						"code": "MA-HOC",
						"name": "Al Hoceïma",
						"parent": "MA-03"
					},
					"MA-IFR": {
						"category": "province",
						"code": "MA-IFR",
						"name": "Ifrane",
						"parent": "MA-06"
					},
					"MA-INE": {
						"category": "prefecture",
						"code": "MA-INE",
						"name": "Inezgane-Ait Melloul",
						"parent": "MA-13"
					},
					"MA-JDI": {
						"category": "province",
						"code": "MA-JDI",
						"name": "El Jadida",
						"parent": "MA-10"
					},
					"MA-JRA": {
						"category": "province",
						"code": "MA-JRA",
						"name": "Jrada",
						"parent": "MA-04"
					},
					"MA-KEN": {
						"category": "province",
						"code": "MA-KEN",
						"name": "Kénitra",
						"parent": "MA-02"
					},
					"MA-KES": {
						"category": "province",
						"code": "MA-KES",
						"name": "Kelaat es Sraghna",
						"parent": "MA-11"
					},
					"MA-KHE": {
						"category": "province",
						"code": "MA-KHE",
						"name": "Khemisset",
						"parent": "MA-07"
					},
					"MA-KHN": {
						"category": "province",
						"code": "MA-KHN",
						"name": "Khenifra",
						"parent": "MA-06"
					},
					"MA-KHO": {
						"category": "province",
						"code": "MA-KHO",
						"name": "Khouribga",
						"parent": "MA-09"
					},
					"MA-LAA": {
						"category": "province",
						"code": "MA-LAA",
						"name": "Laâyoune",
						"parent": "MA-15"
					},
					"MA-LAR": {
						"category": "province",
						"code": "MA-LAR",
						"name": "Larache",
						"parent": "MA-01"
					},
					"MA-MED": {
						"category": "province",
						"code": "MA-MED",
						"name": "Médiouna",
						"parent": "MA-08"
					},
					"MA-MEK": {
						"category": "prefecture",
						"code": "MA-MEK",
						"name": "Meknès",
						"parent": "MA-06"
					},
					"MA-MMD": {
						"category": "prefecture",
						"code": "MA-MMD",
						"name": "Marrakech-Medina",
						"parent": "MA-11"
					},
					"MA-MMN": {
						"category": "prefecture",
						"code": "MA-MMN",
						"name": "Marrakech-Menara",
						"parent": "MA-11"
					},
					"MA-MOH": {
						"category": "prefecture",
						"code": "MA-MOH",
						"name": "Mohammadia",
						"parent": "MA-08"
					},
					"MA-MOU": {
						"category": "province",
						"code": "MA-MOU",
						"name": "Moulay Yacoub",
						"parent": "MA-05"
					},
					"MA-NAD": {
						"category": "province",
						"code": "MA-NAD",
						"name": "Nador",
						"parent": "MA-04"
					},
					"MA-NOU": {
						"category": "province",
						"code": "MA-NOU",
						"name": "Nouaceur",
						"parent": "MA-08"
					},
					"MA-OUA": {
						"category": "province",
						"code": "MA-OUA",
						"name": "Ouarzazate",
						"parent": "MA-13"
					},
					"MA-OUD": {
						"category": "province",
						"code": "MA-OUD",
						"name": "Oued ed Dahab (EH)",
						"parent": "MA-16"
					},
					"MA-OUJ": {
						"category": "prefecture",
						"code": "MA-OUJ",
						"name": "Oujda-Angad",
						"parent": "MA-04"
					},
					"MA-RAB": {
						"category": "prefecture",
						"code": "MA-RAB",
						"name": "Rabat",
						"parent": "MA-07"
					},
					"MA-SAF": {
						"category": "province",
						"code": "MA-SAF",
						"name": "Safi",
						"parent": "MA-10"
					},
					"MA-SAL": {
						"category": "prefecture",
						"code": "MA-SAL",
						"name": "Salé",
						"parent": "MA-07"
					},
					"MA-SEF": {
						"category": "province",
						"code": "MA-SEF",
						"name": "Sefrou",
						"parent": "MA-05"
					},
					"MA-SET": {
						"category": "province",
						"code": "MA-SET",
						"name": "Settat",
						"parent": "MA-09"
					},
					"MA-SIK": {
						"category": "province",
						"code": "MA-SIK",
						"name": "Sidi Kacem",
						"parent": "MA-02"
					},
					"MA-SKH": {
						"category": "prefecture",
						"code": "MA-SKH",
						"name": "Skhirate-Témara",
						"parent": "MA-07"
					},
					"MA-SYB": {
						"category": "prefecture",
						"code": "MA-SYB",
						"name": "Sidi Youssef Ben Ali",
						"parent": "MA-11"
					},
					"MA-TAI": {
						"category": "province",
						"code": "MA-TAI",
						"name": "Taourirt",
						"parent": "MA-04"
					},
					"MA-TAO": {
						"category": "province",
						"code": "MA-TAO",
						"name": "Taounate",
						"parent": "MA-03"
					},
					"MA-TAR": {
						"category": "province",
						"code": "MA-TAR",
						"name": "Taroudant",
						"parent": "MA-13"
					},
					"MA-TAT": {
						"category": "province",
						"code": "MA-TAT",
						"name": "Tata",
						"parent": "MA-14"
					},
					"MA-TAZ": {
						"category": "province",
						"code": "MA-TAZ",
						"name": "Taza",
						"parent": "MA-03"
					},
					"MA-TET": {
						"category": "prefecture",
						"code": "MA-TET",
						"name": "Tétouan",
						"parent": "MA-01"
					},
					"MA-TIZ": {
						"category": "province",
						"code": "MA-TIZ",
						"name": "Tiznit",
						"parent": "MA-13"
					},
					"MA-TNG": {
						"category": "prefecture",
						"code": "MA-TNG",
						"name": "Tanger-Assilah",
						"parent": "MA-01"
					},
					"MA-TNT": {
						"category": "province",
						"code": "MA-TNT",
						"name": "Tan-Tan",
						"parent": "MA-14"
					},
					"MA-ZAG": {
						"category": "province",
						"code": "MA-ZAG",
						"name": "Zagora",
						"parent": "MA-13"
					}
				}
			},
			"MCO": {
				"threeLetterCode": "MCO",
				"shortName": "Monaco",
				"shortNameUpperCase": "MONACO",
				"fullName": "the Principality of Monaco",
				"subdivisionLabel": "quarter",
				"subdivisions": {
					"MC-CL": {
						"category": "quarter",
						"code": "MC-CL",
						"name": "La Colle",
						"parent": ""
					},
					"MC-CO": {
						"category": "quarter",
						"code": "MC-CO",
						"name": "La Condamine",
						"parent": ""
					},
					"MC-FO": {
						"category": "quarter",
						"code": "MC-FO",
						"name": "Fontvieille",
						"parent": ""
					},
					"MC-GA": {
						"category": "quarter",
						"code": "MC-GA",
						"name": "La Gare",
						"parent": ""
					},
					"MC-JE": {
						"category": "quarter",
						"code": "MC-JE",
						"name": "Jardin Exotique",
						"parent": ""
					},
					"MC-LA": {
						"category": "quarter",
						"code": "MC-LA",
						"name": "Larvotto",
						"parent": ""
					},
					"MC-MA": {
						"category": "quarter",
						"code": "MC-MA",
						"name": "Malbousquet",
						"parent": ""
					},
					"MC-MC": {
						"category": "quarter",
						"code": "MC-MC",
						"name": "Monte-Carlo",
						"parent": ""
					},
					"MC-MG": {
						"category": "quarter",
						"code": "MC-MG",
						"name": "Moneghetti",
						"parent": ""
					},
					"MC-MO": {
						"category": "quarter",
						"code": "MC-MO",
						"name": "Monaco-Ville",
						"parent": ""
					},
					"MC-MU": {
						"category": "quarter",
						"code": "MC-MU",
						"name": "Moulins",
						"parent": ""
					},
					"MC-PH": {
						"category": "quarter",
						"code": "MC-PH",
						"name": "Port-Hercule",
						"parent": ""
					},
					"MC-SD": {
						"category": "quarter",
						"code": "MC-SD",
						"name": "Sainte-Dévote",
						"parent": ""
					},
					"MC-SO": {
						"category": "quarter",
						"code": "MC-SO",
						"name": "La Source",
						"parent": ""
					},
					"MC-SP": {
						"category": "quarter",
						"code": "MC-SP",
						"name": "Spélugues",
						"parent": ""
					},
					"MC-SR": {
						"category": "quarter",
						"code": "MC-SR",
						"name": "Saint-Roman",
						"parent": ""
					},
					"MC-VR": {
						"category": "quarter",
						"code": "MC-VR",
						"name": "Vallon de la Rousse",
						"parent": ""
					}
				}
			},
			"MDA": {
				"commonName": "Moldova",
				"threeLetterCode": "MDA",
				"shortName": "Moldova (the Republic of)",
				"shortNameUpperCase": "MOLDOVA, REPUBLIC OF",
				"fullName": "the Republic of Moldova",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"MD-AN": {
						"category": "district",
						"code": "MD-AN",
						"name": "Anenii Noi",
						"parent": ""
					},
					"MD-BA": {
						"category": "city",
						"code": "MD-BA",
						"name": "Bălți",
						"parent": ""
					},
					"MD-BD": {
						"category": "city",
						"code": "MD-BD",
						"name": "Bender [Tighina]",
						"parent": ""
					},
					"MD-BR": {
						"category": "district",
						"code": "MD-BR",
						"name": "Briceni",
						"parent": ""
					},
					"MD-BS": {
						"category": "district",
						"code": "MD-BS",
						"name": "Basarabeasca",
						"parent": ""
					},
					"MD-CA": {
						"category": "district",
						"code": "MD-CA",
						"name": "Cahul",
						"parent": ""
					},
					"MD-CL": {
						"category": "district",
						"code": "MD-CL",
						"name": "Călărași",
						"parent": ""
					},
					"MD-CM": {
						"category": "district",
						"code": "MD-CM",
						"name": "Cimișlia",
						"parent": ""
					},
					"MD-CR": {
						"category": "district",
						"code": "MD-CR",
						"name": "Criuleni",
						"parent": ""
					},
					"MD-CS": {
						"category": "district",
						"code": "MD-CS",
						"name": "Căușeni",
						"parent": ""
					},
					"MD-CT": {
						"category": "district",
						"code": "MD-CT",
						"name": "Cantemir",
						"parent": ""
					},
					"MD-CU": {
						"category": "city",
						"code": "MD-CU",
						"name": "Chișinău",
						"parent": ""
					},
					"MD-DO": {
						"category": "district",
						"code": "MD-DO",
						"name": "Dondușeni",
						"parent": ""
					},
					"MD-DR": {
						"category": "district",
						"code": "MD-DR",
						"name": "Drochia",
						"parent": ""
					},
					"MD-DU": {
						"category": "district",
						"code": "MD-DU",
						"name": "Dubăsari",
						"parent": ""
					},
					"MD-ED": {
						"category": "district",
						"code": "MD-ED",
						"name": "Edineț",
						"parent": ""
					},
					"MD-FA": {
						"category": "district",
						"code": "MD-FA",
						"name": "Fălești",
						"parent": ""
					},
					"MD-FL": {
						"category": "district",
						"code": "MD-FL",
						"name": "Florești",
						"parent": ""
					},
					"MD-GA": {
						"category": "autonomous territorial unit",
						"code": "MD-GA",
						"name": "Găgăuzia, Unitatea teritorială autonomă (UTAG)",
						"parent": ""
					},
					"MD-GL": {
						"category": "district",
						"code": "MD-GL",
						"name": "Glodeni",
						"parent": ""
					},
					"MD-HI": {
						"category": "district",
						"code": "MD-HI",
						"name": "Hîncești",
						"parent": ""
					},
					"MD-IA": {
						"category": "district",
						"code": "MD-IA",
						"name": "Ialoveni",
						"parent": ""
					},
					"MD-LE": {
						"category": "district",
						"code": "MD-LE",
						"name": "Leova",
						"parent": ""
					},
					"MD-NI": {
						"category": "district",
						"code": "MD-NI",
						"name": "Nisporeni",
						"parent": ""
					},
					"MD-OC": {
						"category": "district",
						"code": "MD-OC",
						"name": "Ocnița",
						"parent": ""
					},
					"MD-OR": {
						"category": "district",
						"code": "MD-OR",
						"name": "Orhei",
						"parent": ""
					},
					"MD-RE": {
						"category": "district",
						"code": "MD-RE",
						"name": "Rezina",
						"parent": ""
					},
					"MD-RI": {
						"category": "district",
						"code": "MD-RI",
						"name": "Rîșcani",
						"parent": ""
					},
					"MD-SD": {
						"category": "district",
						"code": "MD-SD",
						"name": "Șoldănești",
						"parent": ""
					},
					"MD-SI": {
						"category": "district",
						"code": "MD-SI",
						"name": "Sîngerei",
						"parent": ""
					},
					"MD-SN": {
						"category": "territorial unit",
						"code": "MD-SN",
						"name": "Stînga Nistrului, unitatea teritorială din",
						"parent": ""
					},
					"MD-SO": {
						"category": "district",
						"code": "MD-SO",
						"name": "Soroca",
						"parent": ""
					},
					"MD-ST": {
						"category": "district",
						"code": "MD-ST",
						"name": "Strășeni",
						"parent": ""
					},
					"MD-SV": {
						"category": "district",
						"code": "MD-SV",
						"name": "Ștefan Vodă",
						"parent": ""
					},
					"MD-TA": {
						"category": "district",
						"code": "MD-TA",
						"name": "Taraclia",
						"parent": ""
					},
					"MD-TE": {
						"category": "district",
						"code": "MD-TE",
						"name": "Telenești",
						"parent": ""
					},
					"MD-UN": {
						"category": "district",
						"code": "MD-UN",
						"name": "Ungheni",
						"parent": ""
					}
				}
			},
			"MDG": {
				"threeLetterCode": "MDG",
				"shortName": "Madagascar",
				"shortNameUpperCase": "MADAGASCAR",
				"fullName": "the Republic of Madagascar",
				"subdivisionLabel": "province",
				"subdivisions": {
					"MG-A": {
						"category": "province",
						"code": "MG-A",
						"name": "Toamasina",
						"parent": ""
					},
					"MG-D": {
						"category": "province",
						"code": "MG-D",
						"name": "Antsiranana",
						"parent": ""
					},
					"MG-F": {
						"category": "province",
						"code": "MG-F",
						"name": "Fianarantsoa",
						"parent": ""
					},
					"MG-M": {
						"category": "province",
						"code": "MG-M",
						"name": "Mahajanga",
						"parent": ""
					},
					"MG-T": {
						"category": "province",
						"code": "MG-T",
						"name": "Antananarivo",
						"parent": ""
					},
					"MG-U": {
						"category": "province",
						"code": "MG-U",
						"name": "Toliara",
						"parent": ""
					}
				}
			},
			"MDV": {
				"threeLetterCode": "MDV",
				"shortName": "Maldives",
				"shortNameUpperCase": "MALDIVES",
				"fullName": "the Republic of Maldives",
				"subdivisionLabel": "administrative atoll",
				"subdivisions": {
					"MV-00": {
						"category": "administrative atoll",
						"code": "MV-00",
						"name": "Alifu Dhaalu",
						"parent": "MV-NC"
					},
					"MV-01": {
						"category": "administrative atoll",
						"code": "MV-01",
						"name": "Seenu",
						"parent": "MV-SU"
					},
					"MV-02": {
						"category": "administrative atoll",
						"code": "MV-02",
						"name": "Alifu Alifu",
						"parent": "MV-NC"
					},
					"MV-03": {
						"category": "administrative atoll",
						"code": "MV-03",
						"name": "Lhaviyani",
						"parent": "MV-NO"
					},
					"MV-04": {
						"category": "administrative atoll",
						"code": "MV-04",
						"name": "Vaavu",
						"parent": "MV-NC"
					},
					"MV-05": {
						"category": "administrative atoll",
						"code": "MV-05",
						"name": "Laamu",
						"parent": "MV-US"
					},
					"MV-07": {
						"category": "administrative atoll",
						"code": "MV-07",
						"name": "Haa Alifu",
						"parent": "MV-UN"
					},
					"MV-08": {
						"category": "administrative atoll",
						"code": "MV-08",
						"name": "Thaa",
						"parent": "MV-US"
					},
					"MV-12": {
						"category": "administrative atoll",
						"code": "MV-12",
						"name": "Meemu",
						"parent": "MV-CE"
					},
					"MV-13": {
						"category": "administrative atoll",
						"code": "MV-13",
						"name": "Raa",
						"parent": "MV-NO"
					},
					"MV-14": {
						"category": "administrative atoll",
						"code": "MV-14",
						"name": "Faafu",
						"parent": "MV-CE"
					},
					"MV-17": {
						"category": "administrative atoll",
						"code": "MV-17",
						"name": "Dhaalu",
						"parent": "MV-CE"
					},
					"MV-20": {
						"category": "administrative atoll",
						"code": "MV-20",
						"name": "Baa",
						"parent": "MV-NO"
					},
					"MV-23": {
						"category": "administrative atoll",
						"code": "MV-23",
						"name": "Haa Dhaalu",
						"parent": "MV-UN"
					},
					"MV-24": {
						"category": "administrative atoll",
						"code": "MV-24",
						"name": "Shaviyani",
						"parent": "MV-UN"
					},
					"MV-25": {
						"category": "administrative atoll",
						"code": "MV-25",
						"name": "Noonu",
						"parent": "MV-NO"
					},
					"MV-26": {
						"category": "administrative atoll",
						"code": "MV-26",
						"name": "Kaafu",
						"parent": "MV-NC"
					},
					"MV-27": {
						"category": "administrative atoll",
						"code": "MV-27",
						"name": "Gaafu Alifu",
						"parent": "MV-SC"
					},
					"MV-28": {
						"category": "administrative atoll",
						"code": "MV-28",
						"name": "Gaafu Dhaalu",
						"parent": "MV-SC"
					},
					"MV-29": {
						"category": "administrative atoll",
						"code": "MV-29",
						"name": "Gnaviyani",
						"parent": "MV-SU"
					},
					"MV-CE": {
						"category": "province",
						"code": "MV-CE",
						"name": "Central",
						"parent": ""
					},
					"MV-MLE": {
						"category": "capital",
						"code": "MV-MLE",
						"name": "Male",
						"parent": ""
					},
					"MV-NC": {
						"category": "province",
						"code": "MV-NC",
						"name": "North Central",
						"parent": ""
					},
					"MV-NO": {
						"category": "province",
						"code": "MV-NO",
						"name": "North",
						"parent": ""
					},
					"MV-SC": {
						"category": "province",
						"code": "MV-SC",
						"name": "South Central",
						"parent": ""
					},
					"MV-SU": {
						"category": "province",
						"code": "MV-SU",
						"name": "South",
						"parent": ""
					},
					"MV-UN": {
						"category": "province",
						"code": "MV-UN",
						"name": "Upper North",
						"parent": ""
					},
					"MV-US": {
						"category": "province",
						"code": "MV-US",
						"name": "Upper South",
						"parent": ""
					}
				}
			},
			"MEX": {
				"threeLetterCode": "MEX",
				"shortName": "Mexico",
				"shortNameUpperCase": "MEXICO",
				"fullName": "the United Mexican States",
				"subdivisionLabel": "state",
				"subdivisions": {
					"MX-AGU": {
						"category": "state",
						"code": "MX-AGU",
						"name": "Aguascalientes",
						"parent": ""
					},
					"MX-BCN": {
						"category": "state",
						"code": "MX-BCN",
						"name": "Baja California",
						"parent": ""
					},
					"MX-BCS": {
						"category": "state",
						"code": "MX-BCS",
						"name": "Baja California Sur",
						"parent": ""
					},
					"MX-CAM": {
						"category": "state",
						"code": "MX-CAM",
						"name": "Campeche",
						"parent": ""
					},
					"MX-CHH": {
						"category": "state",
						"code": "MX-CHH",
						"name": "Chihuahua",
						"parent": ""
					},
					"MX-CHP": {
						"category": "state",
						"code": "MX-CHP",
						"name": "Chiapas",
						"parent": ""
					},
					"MX-CMX": {
						"category": "federal district",
						"code": "MX-CMX",
						"name": "Ciudad de México",
						"parent": ""
					},
					"MX-COA": {
						"category": "state",
						"code": "MX-COA",
						"name": "Coahuila de Zaragoza",
						"parent": ""
					},
					"MX-COL": {
						"category": "state",
						"code": "MX-COL",
						"name": "Colima",
						"parent": ""
					},
					"MX-DUR": {
						"category": "state",
						"code": "MX-DUR",
						"name": "Durango",
						"parent": ""
					},
					"MX-GRO": {
						"category": "state",
						"code": "MX-GRO",
						"name": "Guerrero",
						"parent": ""
					},
					"MX-GUA": {
						"category": "state",
						"code": "MX-GUA",
						"name": "Guanajuato",
						"parent": ""
					},
					"MX-HID": {
						"category": "state",
						"code": "MX-HID",
						"name": "Hidalgo",
						"parent": ""
					},
					"MX-JAL": {
						"category": "state",
						"code": "MX-JAL",
						"name": "Jalisco",
						"parent": ""
					},
					"MX-MEX": {
						"category": "state",
						"code": "MX-MEX",
						"name": "México",
						"parent": ""
					},
					"MX-MIC": {
						"category": "state",
						"code": "MX-MIC",
						"name": "Michoacán de Ocampo",
						"parent": ""
					},
					"MX-MOR": {
						"category": "state",
						"code": "MX-MOR",
						"name": "Morelos",
						"parent": ""
					},
					"MX-NAY": {
						"category": "state",
						"code": "MX-NAY",
						"name": "Nayarit",
						"parent": ""
					},
					"MX-NLE": {
						"category": "state",
						"code": "MX-NLE",
						"name": "Nuevo León",
						"parent": ""
					},
					"MX-OAX": {
						"category": "state",
						"code": "MX-OAX",
						"name": "Oaxaca",
						"parent": ""
					},
					"MX-PUE": {
						"category": "state",
						"code": "MX-PUE",
						"name": "Puebla",
						"parent": ""
					},
					"MX-QUE": {
						"category": "state",
						"code": "MX-QUE",
						"name": "Querétaro",
						"parent": ""
					},
					"MX-ROO": {
						"category": "state",
						"code": "MX-ROO",
						"name": "Quintana Roo",
						"parent": ""
					},
					"MX-SIN": {
						"category": "state",
						"code": "MX-SIN",
						"name": "Sinaloa",
						"parent": ""
					},
					"MX-SLP": {
						"category": "state",
						"code": "MX-SLP",
						"name": "San Luis Potosí",
						"parent": ""
					},
					"MX-SON": {
						"category": "state",
						"code": "MX-SON",
						"name": "Sonora",
						"parent": ""
					},
					"MX-TAB": {
						"category": "state",
						"code": "MX-TAB",
						"name": "Tabasco",
						"parent": ""
					},
					"MX-TAM": {
						"category": "state",
						"code": "MX-TAM",
						"name": "Tamaulipas",
						"parent": ""
					},
					"MX-TLA": {
						"category": "state",
						"code": "MX-TLA",
						"name": "Tlaxcala",
						"parent": ""
					},
					"MX-VER": {
						"category": "state",
						"code": "MX-VER",
						"name": "Veracruz de Ignacio de la Llave",
						"parent": ""
					},
					"MX-YUC": {
						"category": "state",
						"code": "MX-YUC",
						"name": "Yucatán",
						"parent": ""
					},
					"MX-ZAC": {
						"category": "state",
						"code": "MX-ZAC",
						"name": "Zacatecas",
						"parent": ""
					}
				}
			},
			"MHL": {
				"commonName": "Marshall Islands",
				"threeLetterCode": "MHL",
				"shortName": "Marshall Islands (the)",
				"shortNameUpperCase": "MARSHALL ISLANDS",
				"fullName": "the Republic of the Marshall Islands",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"MH-ALK": {
						"category": "municipality",
						"code": "MH-ALK",
						"name": "Ailuk",
						"parent": "MH-T"
					},
					"MH-ALL": {
						"category": "municipality",
						"code": "MH-ALL",
						"name": "Ailinglaplap",
						"parent": "MH-L"
					},
					"MH-ARN": {
						"category": "municipality",
						"code": "MH-ARN",
						"name": "Arno",
						"parent": "MH-T"
					},
					"MH-AUR": {
						"category": "municipality",
						"code": "MH-AUR",
						"name": "Aur",
						"parent": "MH-T"
					},
					"MH-EBO": {
						"category": "municipality",
						"code": "MH-EBO",
						"name": "Ebon",
						"parent": "MH-L"
					},
					"MH-ENI": {
						"category": "municipality",
						"code": "MH-ENI",
						"name": "Enewetak & Ujelang",
						"parent": "MH-L"
					},
					"MH-JAB": {
						"category": "municipality",
						"code": "MH-JAB",
						"name": "Jabat",
						"parent": "MH-L"
					},
					"MH-JAL": {
						"category": "municipality",
						"code": "MH-JAL",
						"name": "Jaluit",
						"parent": "MH-L"
					},
					"MH-KIL": {
						"category": "municipality",
						"code": "MH-KIL",
						"name": "Bikini & Kili",
						"parent": "MH-L"
					},
					"MH-KWA": {
						"category": "municipality",
						"code": "MH-KWA",
						"name": "Kwajalein",
						"parent": "MH-L"
					},
					"MH-L": {
						"category": "chain (of islands)",
						"code": "MH-L",
						"name": "Ralik chain",
						"parent": ""
					},
					"MH-LAE": {
						"category": "municipality",
						"code": "MH-LAE",
						"name": "Lae",
						"parent": "MH-L"
					},
					"MH-LIB": {
						"category": "municipality",
						"code": "MH-LIB",
						"name": "Lib",
						"parent": "MH-L"
					},
					"MH-LIK": {
						"category": "municipality",
						"code": "MH-LIK",
						"name": "Likiep",
						"parent": "MH-T"
					},
					"MH-MAJ": {
						"category": "municipality",
						"code": "MH-MAJ",
						"name": "Majuro",
						"parent": "MH-T"
					},
					"MH-MAL": {
						"category": "municipality",
						"code": "MH-MAL",
						"name": "Maloelap",
						"parent": "MH-T"
					},
					"MH-MEJ": {
						"category": "municipality",
						"code": "MH-MEJ",
						"name": "Mejit",
						"parent": "MH-T"
					},
					"MH-MIL": {
						"category": "municipality",
						"code": "MH-MIL",
						"name": "Mili",
						"parent": "MH-T"
					},
					"MH-NMK": {
						"category": "municipality",
						"code": "MH-NMK",
						"name": "Namdrik",
						"parent": "MH-L"
					},
					"MH-NMU": {
						"category": "municipality",
						"code": "MH-NMU",
						"name": "Namu",
						"parent": "MH-L"
					},
					"MH-RON": {
						"category": "municipality",
						"code": "MH-RON",
						"name": "Rongelap",
						"parent": "MH-L"
					},
					"MH-T": {
						"category": "chain (of islands)",
						"code": "MH-T",
						"name": "Ratak chain",
						"parent": ""
					},
					"MH-UJA": {
						"category": "municipality",
						"code": "MH-UJA",
						"name": "Ujae",
						"parent": "MH-L"
					},
					"MH-UTI": {
						"category": "municipality",
						"code": "MH-UTI",
						"name": "Utrik",
						"parent": "MH-T"
					},
					"MH-WTH": {
						"category": "municipality",
						"code": "MH-WTH",
						"name": "Wotho",
						"parent": "MH-L"
					},
					"MH-WTJ": {
						"category": "municipality",
						"code": "MH-WTJ",
						"name": "Wotje",
						"parent": "MH-T"
					}
				}
			},
			"MKD": {
				"commonName": "Macedonia",
				"threeLetterCode": "MKD",
				"shortName": "Macedonia (the former Yugoslav Republic of)",
				"shortNameUpperCase": "MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",
				"fullName": "the former Yugoslav Republic of Macedonia",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"MK-02": {
						"category": "municipality",
						"code": "MK-02",
						"name": "Aračinovo",
						"parent": ""
					},
					"MK-03": {
						"category": "municipality",
						"code": "MK-03",
						"name": "Berovo",
						"parent": ""
					},
					"MK-04": {
						"category": "municipality",
						"code": "MK-04",
						"name": "Bitola",
						"parent": ""
					},
					"MK-05": {
						"category": "municipality",
						"code": "MK-05",
						"name": "Bogdanci",
						"parent": ""
					},
					"MK-06": {
						"category": "municipality",
						"code": "MK-06",
						"name": "Bogovinje",
						"parent": ""
					},
					"MK-07": {
						"category": "municipality",
						"code": "MK-07",
						"name": "Bosilovo",
						"parent": ""
					},
					"MK-08": {
						"category": "municipality",
						"code": "MK-08",
						"name": "Brvenica",
						"parent": ""
					},
					"MK-10": {
						"category": "municipality",
						"code": "MK-10",
						"name": "Valandovo",
						"parent": ""
					},
					"MK-11": {
						"category": "municipality",
						"code": "MK-11",
						"name": "Vasilevo",
						"parent": ""
					},
					"MK-12": {
						"category": "municipality",
						"code": "MK-12",
						"name": "Vevčani",
						"parent": ""
					},
					"MK-13": {
						"category": "municipality",
						"code": "MK-13",
						"name": "Veles",
						"parent": ""
					},
					"MK-14": {
						"category": "municipality",
						"code": "MK-14",
						"name": "Vinica",
						"parent": ""
					},
					"MK-16": {
						"category": "municipality",
						"code": "MK-16",
						"name": "Vrapčište",
						"parent": ""
					},
					"MK-18": {
						"category": "municipality",
						"code": "MK-18",
						"name": "Gevgelija",
						"parent": ""
					},
					"MK-19": {
						"category": "municipality",
						"code": "MK-19",
						"name": "Gostivar",
						"parent": ""
					},
					"MK-20": {
						"category": "municipality",
						"code": "MK-20",
						"name": "Gradsko",
						"parent": ""
					},
					"MK-21": {
						"category": "municipality",
						"code": "MK-21",
						"name": "Debar",
						"parent": ""
					},
					"MK-22": {
						"category": "municipality",
						"code": "MK-22",
						"name": "Debarca",
						"parent": ""
					},
					"MK-23": {
						"category": "municipality",
						"code": "MK-23",
						"name": "Delčevo",
						"parent": ""
					},
					"MK-24": {
						"category": "municipality",
						"code": "MK-24",
						"name": "Demir Kapija",
						"parent": ""
					},
					"MK-25": {
						"category": "municipality",
						"code": "MK-25",
						"name": "Demir Hisar",
						"parent": ""
					},
					"MK-26": {
						"category": "municipality",
						"code": "MK-26",
						"name": "Dojran",
						"parent": ""
					},
					"MK-27": {
						"category": "municipality",
						"code": "MK-27",
						"name": "Dolneni",
						"parent": ""
					},
					"MK-30": {
						"category": "municipality",
						"code": "MK-30",
						"name": "Želino",
						"parent": ""
					},
					"MK-32": {
						"category": "municipality",
						"code": "MK-32",
						"name": "Zelenikovo",
						"parent": ""
					},
					"MK-33": {
						"category": "municipality",
						"code": "MK-33",
						"name": "Zrnovci",
						"parent": ""
					},
					"MK-34": {
						"category": "municipality",
						"code": "MK-34",
						"name": "Ilinden",
						"parent": ""
					},
					"MK-35": {
						"category": "municipality",
						"code": "MK-35",
						"name": "Jegunovce",
						"parent": ""
					},
					"MK-36": {
						"category": "municipality",
						"code": "MK-36",
						"name": "Kavadarci",
						"parent": ""
					},
					"MK-37": {
						"category": "municipality",
						"code": "MK-37",
						"name": "Karbinci",
						"parent": ""
					},
					"MK-40": {
						"category": "municipality",
						"code": "MK-40",
						"name": "Kičevo",
						"parent": ""
					},
					"MK-41": {
						"category": "municipality",
						"code": "MK-41",
						"name": "Konče",
						"parent": ""
					},
					"MK-42": {
						"category": "municipality",
						"code": "MK-42",
						"name": "Kočani",
						"parent": ""
					},
					"MK-43": {
						"category": "municipality",
						"code": "MK-43",
						"name": "Kratovo",
						"parent": ""
					},
					"MK-44": {
						"category": "municipality",
						"code": "MK-44",
						"name": "Kriva Palanka",
						"parent": ""
					},
					"MK-45": {
						"category": "municipality",
						"code": "MK-45",
						"name": "Krivogaštani",
						"parent": ""
					},
					"MK-46": {
						"category": "municipality",
						"code": "MK-46",
						"name": "Kruševo",
						"parent": ""
					},
					"MK-47": {
						"category": "municipality",
						"code": "MK-47",
						"name": "Kumanovo",
						"parent": ""
					},
					"MK-48": {
						"category": "municipality",
						"code": "MK-48",
						"name": "Lipkovo",
						"parent": ""
					},
					"MK-49": {
						"category": "municipality",
						"code": "MK-49",
						"name": "Lozovo",
						"parent": ""
					},
					"MK-50": {
						"category": "municipality",
						"code": "MK-50",
						"name": "Mavrovo i Rostuša",
						"parent": ""
					},
					"MK-51": {
						"category": "municipality",
						"code": "MK-51",
						"name": "Makedonska Kamenica",
						"parent": ""
					},
					"MK-52": {
						"category": "municipality",
						"code": "MK-52",
						"name": "Makedonski Brod",
						"parent": ""
					},
					"MK-53": {
						"category": "municipality",
						"code": "MK-53",
						"name": "Mogila",
						"parent": ""
					},
					"MK-54": {
						"category": "municipality",
						"code": "MK-54",
						"name": "Negotino",
						"parent": ""
					},
					"MK-55": {
						"category": "municipality",
						"code": "MK-55",
						"name": "Novaci",
						"parent": ""
					},
					"MK-56": {
						"category": "municipality",
						"code": "MK-56",
						"name": "Novo Selo",
						"parent": ""
					},
					"MK-58": {
						"category": "municipality",
						"code": "MK-58",
						"name": "Ohrid",
						"parent": ""
					},
					"MK-59": {
						"category": "municipality",
						"code": "MK-59",
						"name": "Petrovec",
						"parent": ""
					},
					"MK-60": {
						"category": "municipality",
						"code": "MK-60",
						"name": "Pehčevo",
						"parent": ""
					},
					"MK-61": {
						"category": "municipality",
						"code": "MK-61",
						"name": "Plasnica",
						"parent": ""
					},
					"MK-62": {
						"category": "municipality",
						"code": "MK-62",
						"name": "Prilep",
						"parent": ""
					},
					"MK-63": {
						"category": "municipality",
						"code": "MK-63",
						"name": "Probištip",
						"parent": ""
					},
					"MK-64": {
						"category": "municipality",
						"code": "MK-64",
						"name": "Radoviš",
						"parent": ""
					},
					"MK-65": {
						"category": "municipality",
						"code": "MK-65",
						"name": "Rankovce",
						"parent": ""
					},
					"MK-66": {
						"category": "municipality",
						"code": "MK-66",
						"name": "Resen",
						"parent": ""
					},
					"MK-67": {
						"category": "municipality",
						"code": "MK-67",
						"name": "Rosoman",
						"parent": ""
					},
					"MK-69": {
						"category": "municipality",
						"code": "MK-69",
						"name": "Sveti Nikole",
						"parent": ""
					},
					"MK-70": {
						"category": "municipality",
						"code": "MK-70",
						"name": "Sopište",
						"parent": ""
					},
					"MK-71": {
						"category": "municipality",
						"code": "MK-71",
						"name": "Staro Nagoričane",
						"parent": ""
					},
					"MK-72": {
						"category": "municipality",
						"code": "MK-72",
						"name": "Struga",
						"parent": ""
					},
					"MK-73": {
						"category": "municipality",
						"code": "MK-73",
						"name": "Strumica",
						"parent": ""
					},
					"MK-74": {
						"category": "municipality",
						"code": "MK-74",
						"name": "Studeničani",
						"parent": ""
					},
					"MK-75": {
						"category": "municipality",
						"code": "MK-75",
						"name": "Tearce",
						"parent": ""
					},
					"MK-76": {
						"category": "municipality",
						"code": "MK-76",
						"name": "Tetovo",
						"parent": ""
					},
					"MK-78": {
						"category": "municipality",
						"code": "MK-78",
						"name": "Centar Župa",
						"parent": ""
					},
					"MK-80": {
						"category": "municipality",
						"code": "MK-80",
						"name": "Čaška",
						"parent": ""
					},
					"MK-81": {
						"category": "municipality",
						"code": "MK-81",
						"name": "Češinovo-Obleševo",
						"parent": ""
					},
					"MK-82": {
						"category": "municipality",
						"code": "MK-82",
						"name": "Čučer Sandevo",
						"parent": ""
					},
					"MK-83": {
						"category": "municipality",
						"code": "MK-83",
						"name": "Štip",
						"parent": ""
					},
					"MK-85": {
						"category": "municipality",
						"code": "MK-85",
						"name": "Skopje",
						"parent": ""
					}
				}
			},
			"MLI": {
				"threeLetterCode": "MLI",
				"shortName": "Mali",
				"shortNameUpperCase": "MALI",
				"fullName": "the Republic of Mali",
				"subdivisionLabel": "region",
				"subdivisions": {
					"ML-1": {
						"category": "region",
						"code": "ML-1",
						"name": "Kayes",
						"parent": ""
					},
					"ML-10": {
						"category": "region",
						"code": "ML-10",
						"name": "Taoudénit",
						"parent": ""
					},
					"ML-2": {
						"category": "region",
						"code": "ML-2",
						"name": "Koulikoro",
						"parent": ""
					},
					"ML-3": {
						"category": "region",
						"code": "ML-3",
						"name": "Sikasso",
						"parent": ""
					},
					"ML-4": {
						"category": "region",
						"code": "ML-4",
						"name": "Ségou",
						"parent": ""
					},
					"ML-5": {
						"category": "region",
						"code": "ML-5",
						"name": "Mopti",
						"parent": ""
					},
					"ML-6": {
						"category": "region",
						"code": "ML-6",
						"name": "Tombouctou",
						"parent": ""
					},
					"ML-7": {
						"category": "region",
						"code": "ML-7",
						"name": "Gao",
						"parent": ""
					},
					"ML-8": {
						"category": "region",
						"code": "ML-8",
						"name": "Kidal",
						"parent": ""
					},
					"ML-9": {
						"category": "region",
						"code": "ML-9",
						"name": "Ménaka",
						"parent": ""
					},
					"ML-BKO": {
						"category": "district",
						"code": "ML-BKO",
						"name": "Bamako",
						"parent": ""
					}
				}
			},
			"MLT": {
				"threeLetterCode": "MLT",
				"shortName": "Malta",
				"shortNameUpperCase": "MALTA",
				"fullName": "the Republic of Malta",
				"subdivisionLabel": "local council",
				"subdivisions": {
					"MT-01": {
						"category": "local council",
						"code": "MT-01",
						"name": "Attard",
						"parent": ""
					},
					"MT-02": {
						"category": "local council",
						"code": "MT-02",
						"name": "Balzan",
						"parent": ""
					},
					"MT-03": {
						"category": "local council",
						"code": "MT-03",
						"name": "Birgu",
						"parent": ""
					},
					"MT-04": {
						"category": "local council",
						"code": "MT-04",
						"name": "Birkirkara",
						"parent": ""
					},
					"MT-05": {
						"category": "local council",
						"code": "MT-05",
						"name": "Birżebbuġa",
						"parent": ""
					},
					"MT-06": {
						"category": "local council",
						"code": "MT-06",
						"name": "Bormla",
						"parent": ""
					},
					"MT-07": {
						"category": "local council",
						"code": "MT-07",
						"name": "Dingli",
						"parent": ""
					},
					"MT-08": {
						"category": "local council",
						"code": "MT-08",
						"name": "Fgura",
						"parent": ""
					},
					"MT-09": {
						"category": "local council",
						"code": "MT-09",
						"name": "Floriana",
						"parent": ""
					},
					"MT-10": {
						"category": "local council",
						"code": "MT-10",
						"name": "Fontana",
						"parent": ""
					},
					"MT-11": {
						"category": "local council",
						"code": "MT-11",
						"name": "Gudja",
						"parent": ""
					},
					"MT-12": {
						"category": "local council",
						"code": "MT-12",
						"name": "Gżira",
						"parent": ""
					},
					"MT-13": {
						"category": "local council",
						"code": "MT-13",
						"name": "Għajnsielem",
						"parent": ""
					},
					"MT-14": {
						"category": "local council",
						"code": "MT-14",
						"name": "Għarb",
						"parent": ""
					},
					"MT-15": {
						"category": "local council",
						"code": "MT-15",
						"name": "Għargħur",
						"parent": ""
					},
					"MT-16": {
						"category": "local council",
						"code": "MT-16",
						"name": "Għasri",
						"parent": ""
					},
					"MT-17": {
						"category": "local council",
						"code": "MT-17",
						"name": "Għaxaq",
						"parent": ""
					},
					"MT-18": {
						"category": "local council",
						"code": "MT-18",
						"name": "Ħamrun",
						"parent": ""
					},
					"MT-19": {
						"category": "local council",
						"code": "MT-19",
						"name": "Iklin",
						"parent": ""
					},
					"MT-20": {
						"category": "local council",
						"code": "MT-20",
						"name": "Isla",
						"parent": ""
					},
					"MT-21": {
						"category": "local council",
						"code": "MT-21",
						"name": "Kalkara",
						"parent": ""
					},
					"MT-22": {
						"category": "local council",
						"code": "MT-22",
						"name": "Kerċem",
						"parent": ""
					},
					"MT-23": {
						"category": "local council",
						"code": "MT-23",
						"name": "Kirkop",
						"parent": ""
					},
					"MT-24": {
						"category": "local council",
						"code": "MT-24",
						"name": "Lija",
						"parent": ""
					},
					"MT-25": {
						"category": "local council",
						"code": "MT-25",
						"name": "Luqa",
						"parent": ""
					},
					"MT-26": {
						"category": "local council",
						"code": "MT-26",
						"name": "Marsa",
						"parent": ""
					},
					"MT-27": {
						"category": "local council",
						"code": "MT-27",
						"name": "Marsaskala",
						"parent": ""
					},
					"MT-28": {
						"category": "local council",
						"code": "MT-28",
						"name": "Marsaxlokk",
						"parent": ""
					},
					"MT-29": {
						"category": "local council",
						"code": "MT-29",
						"name": "Mdina",
						"parent": ""
					},
					"MT-30": {
						"category": "local council",
						"code": "MT-30",
						"name": "Mellieħa",
						"parent": ""
					},
					"MT-31": {
						"category": "local council",
						"code": "MT-31",
						"name": "Mġarr",
						"parent": ""
					},
					"MT-32": {
						"category": "local council",
						"code": "MT-32",
						"name": "Mosta",
						"parent": ""
					},
					"MT-33": {
						"category": "local council",
						"code": "MT-33",
						"name": "Mqabba",
						"parent": ""
					},
					"MT-34": {
						"category": "local council",
						"code": "MT-34",
						"name": "Msida",
						"parent": ""
					},
					"MT-35": {
						"category": "local council",
						"code": "MT-35",
						"name": "Mtarfa",
						"parent": ""
					},
					"MT-36": {
						"category": "local council",
						"code": "MT-36",
						"name": "Munxar",
						"parent": ""
					},
					"MT-37": {
						"category": "local council",
						"code": "MT-37",
						"name": "Nadur",
						"parent": ""
					},
					"MT-38": {
						"category": "local council",
						"code": "MT-38",
						"name": "Naxxar",
						"parent": ""
					},
					"MT-39": {
						"category": "local council",
						"code": "MT-39",
						"name": "Paola",
						"parent": ""
					},
					"MT-40": {
						"category": "local council",
						"code": "MT-40",
						"name": "Pembroke",
						"parent": ""
					},
					"MT-41": {
						"category": "local council",
						"code": "MT-41",
						"name": "Pietà",
						"parent": ""
					},
					"MT-42": {
						"category": "local council",
						"code": "MT-42",
						"name": "Qala",
						"parent": ""
					},
					"MT-43": {
						"category": "local council",
						"code": "MT-43",
						"name": "Qormi",
						"parent": ""
					},
					"MT-44": {
						"category": "local council",
						"code": "MT-44",
						"name": "Qrendi",
						"parent": ""
					},
					"MT-45": {
						"category": "local council",
						"code": "MT-45",
						"name": "Rabat Gozo",
						"parent": ""
					},
					"MT-46": {
						"category": "local council",
						"code": "MT-46",
						"name": "Rabat Malta",
						"parent": ""
					},
					"MT-47": {
						"category": "local council",
						"code": "MT-47",
						"name": "Safi",
						"parent": ""
					},
					"MT-48": {
						"category": "local council",
						"code": "MT-48",
						"name": "Saint Julian's",
						"parent": ""
					},
					"MT-49": {
						"category": "local council",
						"code": "MT-49",
						"name": "Saint John",
						"parent": ""
					},
					"MT-50": {
						"category": "local council",
						"code": "MT-50",
						"name": "Saint Lawrence",
						"parent": ""
					},
					"MT-51": {
						"category": "local council",
						"code": "MT-51",
						"name": "Saint Paul's Bay",
						"parent": ""
					},
					"MT-52": {
						"category": "local council",
						"code": "MT-52",
						"name": "Sannat",
						"parent": ""
					},
					"MT-53": {
						"category": "local council",
						"code": "MT-53",
						"name": "Saint Lucia's",
						"parent": ""
					},
					"MT-54": {
						"category": "local council",
						"code": "MT-54",
						"name": "Santa Venera",
						"parent": ""
					},
					"MT-55": {
						"category": "local council",
						"code": "MT-55",
						"name": "Siġġiewi",
						"parent": ""
					},
					"MT-56": {
						"category": "local council",
						"code": "MT-56",
						"name": "Sliema",
						"parent": ""
					},
					"MT-57": {
						"category": "local council",
						"code": "MT-57",
						"name": "Swieqi",
						"parent": ""
					},
					"MT-58": {
						"category": "local council",
						"code": "MT-58",
						"name": "Ta' Xbiex",
						"parent": ""
					},
					"MT-59": {
						"category": "local council",
						"code": "MT-59",
						"name": "Tarxien",
						"parent": ""
					},
					"MT-60": {
						"category": "local council",
						"code": "MT-60",
						"name": "Valletta",
						"parent": ""
					},
					"MT-61": {
						"category": "local council",
						"code": "MT-61",
						"name": "Xagħra",
						"parent": ""
					},
					"MT-62": {
						"category": "local council",
						"code": "MT-62",
						"name": "Xewkija",
						"parent": ""
					},
					"MT-63": {
						"category": "local council",
						"code": "MT-63",
						"name": "Xgħajra",
						"parent": ""
					},
					"MT-64": {
						"category": "local council",
						"code": "MT-64",
						"name": "Żabbar",
						"parent": ""
					},
					"MT-65": {
						"category": "local council",
						"code": "MT-65",
						"name": "Żebbuġ Gozo",
						"parent": ""
					},
					"MT-66": {
						"category": "local council",
						"code": "MT-66",
						"name": "Żebbuġ Malta",
						"parent": ""
					},
					"MT-67": {
						"category": "local council",
						"code": "MT-67",
						"name": "Żejtun",
						"parent": ""
					},
					"MT-68": {
						"category": "local council",
						"code": "MT-68",
						"name": "Żurrieq",
						"parent": ""
					}
				}
			},
			"MMR": {
				"threeLetterCode": "MMR",
				"shortName": "Myanmar",
				"shortNameUpperCase": "MYANMAR",
				"fullName": "the Republic of the Union of Myanmar",
				"subdivisionLabel": "region",
				"subdivisions": {
					"MM-01": {
						"category": "region",
						"code": "MM-01",
						"name": "Sagaing",
						"parent": ""
					},
					"MM-02": {
						"category": "region",
						"code": "MM-02",
						"name": "Bago",
						"parent": ""
					},
					"MM-03": {
						"category": "region",
						"code": "MM-03",
						"name": "Magway",
						"parent": ""
					},
					"MM-04": {
						"category": "region",
						"code": "MM-04",
						"name": "Mandalay",
						"parent": ""
					},
					"MM-05": {
						"category": "region",
						"code": "MM-05",
						"name": "Tanintharyi",
						"parent": ""
					},
					"MM-06": {
						"category": "region",
						"code": "MM-06",
						"name": "Yangon",
						"parent": ""
					},
					"MM-07": {
						"category": "region",
						"code": "MM-07",
						"name": "Ayeyarwady",
						"parent": ""
					},
					"MM-11": {
						"category": "state",
						"code": "MM-11",
						"name": "Kachin",
						"parent": ""
					},
					"MM-12": {
						"category": "state",
						"code": "MM-12",
						"name": "Kayah",
						"parent": ""
					},
					"MM-13": {
						"category": "state",
						"code": "MM-13",
						"name": "Kayin",
						"parent": ""
					},
					"MM-14": {
						"category": "state",
						"code": "MM-14",
						"name": "Chin",
						"parent": ""
					},
					"MM-15": {
						"category": "state",
						"code": "MM-15",
						"name": "Mon",
						"parent": ""
					},
					"MM-16": {
						"category": "state",
						"code": "MM-16",
						"name": "Rakhine",
						"parent": ""
					},
					"MM-17": {
						"category": "state",
						"code": "MM-17",
						"name": "Shan",
						"parent": ""
					},
					"MM-18": {
						"category": "union territory",
						"code": "MM-18",
						"name": "Nay Pyi Taw",
						"parent": ""
					}
				}
			},
			"MNE": {
				"threeLetterCode": "MNE",
				"shortName": "Montenegro",
				"shortNameUpperCase": "MONTENEGRO",
				"fullName": "Montenegro",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"ME-01": {
						"category": "municipality",
						"code": "ME-01",
						"name": "Andrijevica",
						"parent": ""
					},
					"ME-02": {
						"category": "municipality",
						"code": "ME-02",
						"name": "Bar",
						"parent": ""
					},
					"ME-03": {
						"category": "municipality",
						"code": "ME-03",
						"name": "Berane",
						"parent": ""
					},
					"ME-04": {
						"category": "municipality",
						"code": "ME-04",
						"name": "Bijelo Polje",
						"parent": ""
					},
					"ME-05": {
						"category": "municipality",
						"code": "ME-05",
						"name": "Budva",
						"parent": ""
					},
					"ME-06": {
						"category": "municipality",
						"code": "ME-06",
						"name": "Cetinje",
						"parent": ""
					},
					"ME-07": {
						"category": "municipality",
						"code": "ME-07",
						"name": "Danilovgrad",
						"parent": ""
					},
					"ME-08": {
						"category": "municipality",
						"code": "ME-08",
						"name": "Herceg-Novi",
						"parent": ""
					},
					"ME-09": {
						"category": "municipality",
						"code": "ME-09",
						"name": "Kolašin",
						"parent": ""
					},
					"ME-10": {
						"category": "municipality",
						"code": "ME-10",
						"name": "Kotor",
						"parent": ""
					},
					"ME-11": {
						"category": "municipality",
						"code": "ME-11",
						"name": "Mojkovac",
						"parent": ""
					},
					"ME-12": {
						"category": "municipality",
						"code": "ME-12",
						"name": "Nikšić",
						"parent": ""
					},
					"ME-13": {
						"category": "municipality",
						"code": "ME-13",
						"name": "Plav",
						"parent": ""
					},
					"ME-14": {
						"category": "municipality",
						"code": "ME-14",
						"name": "Pljevlja",
						"parent": ""
					},
					"ME-15": {
						"category": "municipality",
						"code": "ME-15",
						"name": "Plužine",
						"parent": ""
					},
					"ME-16": {
						"category": "municipality",
						"code": "ME-16",
						"name": "Podgorica",
						"parent": ""
					},
					"ME-17": {
						"category": "municipality",
						"code": "ME-17",
						"name": "Rožaje",
						"parent": ""
					},
					"ME-18": {
						"category": "municipality",
						"code": "ME-18",
						"name": "Šavnik",
						"parent": ""
					},
					"ME-19": {
						"category": "municipality",
						"code": "ME-19",
						"name": "Tivat",
						"parent": ""
					},
					"ME-20": {
						"category": "municipality",
						"code": "ME-20",
						"name": "Ulcinj",
						"parent": ""
					},
					"ME-21": {
						"category": "municipality",
						"code": "ME-21",
						"name": "Žabljak",
						"parent": ""
					},
					"ME-22": {
						"category": "municipality",
						"code": "ME-22",
						"name": "Gusinje",
						"parent": ""
					},
					"ME-23": {
						"category": "municipality",
						"code": "ME-23",
						"name": "Petnjica",
						"parent": ""
					}
				}
			},
			"MNG": {
				"threeLetterCode": "MNG",
				"shortName": "Mongolia",
				"shortNameUpperCase": "MONGOLIA",
				"fullName": "Mongolia",
				"subdivisionLabel": "province",
				"subdivisions": {
					"MN-035": {
						"category": "province",
						"code": "MN-035",
						"name": "Orhon",
						"parent": ""
					},
					"MN-037": {
						"category": "province",
						"code": "MN-037",
						"name": "Darhan uul",
						"parent": ""
					},
					"MN-039": {
						"category": "province",
						"code": "MN-039",
						"name": "Hentiy",
						"parent": ""
					},
					"MN-041": {
						"category": "province",
						"code": "MN-041",
						"name": "Hövsgöl",
						"parent": ""
					},
					"MN-043": {
						"category": "province",
						"code": "MN-043",
						"name": "Hovd",
						"parent": ""
					},
					"MN-046": {
						"category": "province",
						"code": "MN-046",
						"name": "Uvs",
						"parent": ""
					},
					"MN-047": {
						"category": "province",
						"code": "MN-047",
						"name": "Töv",
						"parent": ""
					},
					"MN-049": {
						"category": "province",
						"code": "MN-049",
						"name": "Selenge",
						"parent": ""
					},
					"MN-051": {
						"category": "province",
						"code": "MN-051",
						"name": "Sühbaatar",
						"parent": ""
					},
					"MN-053": {
						"category": "province",
						"code": "MN-053",
						"name": "Ömnögovĭ",
						"parent": ""
					},
					"MN-055": {
						"category": "province",
						"code": "MN-055",
						"name": "Övörhangay",
						"parent": ""
					},
					"MN-057": {
						"category": "province",
						"code": "MN-057",
						"name": "Dzavhan",
						"parent": ""
					},
					"MN-059": {
						"category": "province",
						"code": "MN-059",
						"name": "Dundgovĭ",
						"parent": ""
					},
					"MN-061": {
						"category": "province",
						"code": "MN-061",
						"name": "Dornod",
						"parent": ""
					},
					"MN-063": {
						"category": "province",
						"code": "MN-063",
						"name": "Dornogovĭ",
						"parent": ""
					},
					"MN-064": {
						"category": "province",
						"code": "MN-064",
						"name": "Govĭ-Sümber",
						"parent": ""
					},
					"MN-065": {
						"category": "province",
						"code": "MN-065",
						"name": "Govĭ-Altay",
						"parent": ""
					},
					"MN-067": {
						"category": "province",
						"code": "MN-067",
						"name": "Bulgan",
						"parent": ""
					},
					"MN-069": {
						"category": "province",
						"code": "MN-069",
						"name": "Bayanhongor",
						"parent": ""
					},
					"MN-071": {
						"category": "province",
						"code": "MN-071",
						"name": "Bayan-Ölgiy",
						"parent": ""
					},
					"MN-073": {
						"category": "province",
						"code": "MN-073",
						"name": "Arhangay",
						"parent": ""
					},
					"MN-1": {
						"category": "capital city",
						"code": "MN-1",
						"name": "Ulaanbaatar",
						"parent": ""
					}
				}
			},
			"MNP": {
				"commonName": "Northern Mariana Islands",
				"threeLetterCode": "MNP",
				"shortName": "Northern Mariana Islands (the)",
				"shortNameUpperCase": "NORTHERN MARIANA ISLANDS",
				"fullName": "the Commonwealth of the Northern Mariana Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"MOZ": {
				"threeLetterCode": "MOZ",
				"shortName": "Mozambique",
				"shortNameUpperCase": "MOZAMBIQUE",
				"fullName": "the Republic of Mozambique",
				"subdivisionLabel": "province",
				"subdivisions": {
					"MZ-A": {
						"category": "province",
						"code": "MZ-A",
						"name": "Niassa",
						"parent": ""
					},
					"MZ-B": {
						"category": "province",
						"code": "MZ-B",
						"name": "Manica",
						"parent": ""
					},
					"MZ-G": {
						"category": "province",
						"code": "MZ-G",
						"name": "Gaza",
						"parent": ""
					},
					"MZ-I": {
						"category": "province",
						"code": "MZ-I",
						"name": "Inhambane",
						"parent": ""
					},
					"MZ-L": {
						"category": "province",
						"code": "MZ-L",
						"name": "Maputo",
						"parent": ""
					},
					"MZ-MPM": {
						"category": "city",
						"code": "MZ-MPM",
						"name": "Maputo",
						"parent": ""
					},
					"MZ-N": {
						"category": "province",
						"code": "MZ-N",
						"name": "Nampula",
						"parent": ""
					},
					"MZ-P": {
						"category": "province",
						"code": "MZ-P",
						"name": "Cabo Delgado",
						"parent": ""
					},
					"MZ-Q": {
						"category": "province",
						"code": "MZ-Q",
						"name": "Zambézia",
						"parent": ""
					},
					"MZ-S": {
						"category": "province",
						"code": "MZ-S",
						"name": "Sofala",
						"parent": ""
					},
					"MZ-T": {
						"category": "province",
						"code": "MZ-T",
						"name": "Tete",
						"parent": ""
					}
				}
			},
			"MRT": {
				"threeLetterCode": "MRT",
				"shortName": "Mauritania",
				"shortNameUpperCase": "MAURITANIA",
				"fullName": "the Islamic Republic of Mauritania",
				"subdivisionLabel": "region",
				"subdivisions": {
					"MR-01": {
						"category": "region",
						"code": "MR-01",
						"name": "Hodh ech Chargui",
						"parent": ""
					},
					"MR-02": {
						"category": "region",
						"code": "MR-02",
						"name": "Hodh el Gharbi",
						"parent": ""
					},
					"MR-03": {
						"category": "region",
						"code": "MR-03",
						"name": "Assaba",
						"parent": ""
					},
					"MR-04": {
						"category": "region",
						"code": "MR-04",
						"name": "Gorgol",
						"parent": ""
					},
					"MR-05": {
						"category": "region",
						"code": "MR-05",
						"name": "Brakna",
						"parent": ""
					},
					"MR-06": {
						"category": "region",
						"code": "MR-06",
						"name": "Trarza",
						"parent": ""
					},
					"MR-07": {
						"category": "region",
						"code": "MR-07",
						"name": "Adrar",
						"parent": ""
					},
					"MR-08": {
						"category": "region",
						"code": "MR-08",
						"name": "Dakhlet Nouâdhibou",
						"parent": ""
					},
					"MR-09": {
						"category": "region",
						"code": "MR-09",
						"name": "Tagant",
						"parent": ""
					},
					"MR-10": {
						"category": "region",
						"code": "MR-10",
						"name": "Guidimaka",
						"parent": ""
					},
					"MR-11": {
						"category": "region",
						"code": "MR-11",
						"name": "Tiris Zemmour",
						"parent": ""
					},
					"MR-12": {
						"category": "region",
						"code": "MR-12",
						"name": "Inchiri",
						"parent": ""
					},
					"MR-13": {
						"category": "region",
						"code": "MR-13",
						"name": "Nuwākshūţ al Gharbīyah",
						"parent": ""
					},
					"MR-14": {
						"category": "region",
						"code": "MR-14",
						"name": "Nuwākshūţ ash Shamālīyah",
						"parent": ""
					},
					"MR-15": {
						"category": "region",
						"code": "MR-15",
						"name": "Nuwākshūţ al Janūbīyah",
						"parent": ""
					}
				}
			},
			"MSR": {
				"threeLetterCode": "MSR",
				"shortName": "Montserrat",
				"shortNameUpperCase": "MONTSERRAT",
				"fullName": "Montserrat",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"MTQ": {
				"threeLetterCode": "MTQ",
				"shortName": "Martinique",
				"shortNameUpperCase": "MARTINIQUE",
				"fullName": "Martinique",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"MUS": {
				"threeLetterCode": "MUS",
				"shortName": "Mauritius",
				"shortNameUpperCase": "MAURITIUS",
				"fullName": "the Republic of Mauritius",
				"subdivisionLabel": "district",
				"subdivisions": {
					"MU-AG": {
						"category": "dependency",
						"code": "MU-AG",
						"name": "Agalega Islands",
						"parent": ""
					},
					"MU-BL": {
						"category": "district",
						"code": "MU-BL",
						"name": "Black River",
						"parent": ""
					},
					"MU-BR": {
						"category": "city",
						"code": "MU-BR",
						"name": "Beau Bassin-Rose Hill",
						"parent": ""
					},
					"MU-CC": {
						"category": "dependency",
						"code": "MU-CC",
						"name": "Cargados Carajos Shoals",
						"parent": ""
					},
					"MU-CU": {
						"category": "city",
						"code": "MU-CU",
						"name": "Curepipe",
						"parent": ""
					},
					"MU-FL": {
						"category": "district",
						"code": "MU-FL",
						"name": "Flacq",
						"parent": ""
					},
					"MU-GP": {
						"category": "district",
						"code": "MU-GP",
						"name": "Grand Port",
						"parent": ""
					},
					"MU-MO": {
						"category": "district",
						"code": "MU-MO",
						"name": "Moka",
						"parent": ""
					},
					"MU-PA": {
						"category": "district",
						"code": "MU-PA",
						"name": "Pamplemousses",
						"parent": ""
					},
					"MU-PL": {
						"category": "district",
						"code": "MU-PL",
						"name": "Port Louis",
						"parent": ""
					},
					"MU-PU": {
						"category": "city",
						"code": "MU-PU",
						"name": "Port Louis",
						"parent": ""
					},
					"MU-PW": {
						"category": "district",
						"code": "MU-PW",
						"name": "Plaines Wilhems",
						"parent": ""
					},
					"MU-QB": {
						"category": "city",
						"code": "MU-QB",
						"name": "Quatre Bornes",
						"parent": ""
					},
					"MU-RO": {
						"category": "dependency",
						"code": "MU-RO",
						"name": "Rodrigues Island",
						"parent": ""
					},
					"MU-RR": {
						"category": "district",
						"code": "MU-RR",
						"name": "Rivière du Rempart",
						"parent": ""
					},
					"MU-SA": {
						"category": "district",
						"code": "MU-SA",
						"name": "Savanne",
						"parent": ""
					},
					"MU-VP": {
						"category": "city",
						"code": "MU-VP",
						"name": "Vacoas-Phoenix",
						"parent": ""
					}
				}
			},
			"MWI": {
				"threeLetterCode": "MWI",
				"shortName": "Malawi",
				"shortNameUpperCase": "MALAWI",
				"fullName": "the Republic of Malawi",
				"subdivisionLabel": "district",
				"subdivisions": {
					"MW-BA": {
						"category": "district",
						"code": "MW-BA",
						"name": "Balaka",
						"parent": "MW-S"
					},
					"MW-BL": {
						"category": "district",
						"code": "MW-BL",
						"name": "Blantyre",
						"parent": "MW-S"
					},
					"MW-C": {
						"category": "region",
						"code": "MW-C",
						"name": "Central Region",
						"parent": ""
					},
					"MW-CK": {
						"category": "district",
						"code": "MW-CK",
						"name": "Chikwawa",
						"parent": "MW-S"
					},
					"MW-CR": {
						"category": "district",
						"code": "MW-CR",
						"name": "Chiradzulu",
						"parent": "MW-S"
					},
					"MW-CT": {
						"category": "district",
						"code": "MW-CT",
						"name": "Chitipa",
						"parent": "MW-N"
					},
					"MW-DE": {
						"category": "district",
						"code": "MW-DE",
						"name": "Dedza",
						"parent": "MW-C"
					},
					"MW-DO": {
						"category": "district",
						"code": "MW-DO",
						"name": "Dowa",
						"parent": "MW-C"
					},
					"MW-KR": {
						"category": "district",
						"code": "MW-KR",
						"name": "Karonga",
						"parent": "MW-N"
					},
					"MW-KS": {
						"category": "district",
						"code": "MW-KS",
						"name": "Kasungu",
						"parent": "MW-C"
					},
					"MW-LI": {
						"category": "district",
						"code": "MW-LI",
						"name": "Lilongwe",
						"parent": "MW-C"
					},
					"MW-LK": {
						"category": "district",
						"code": "MW-LK",
						"name": "Likoma",
						"parent": "MW-N"
					},
					"MW-MC": {
						"category": "district",
						"code": "MW-MC",
						"name": "Mchinji",
						"parent": "MW-C"
					},
					"MW-MG": {
						"category": "district",
						"code": "MW-MG",
						"name": "Mangochi",
						"parent": "MW-S"
					},
					"MW-MH": {
						"category": "district",
						"code": "MW-MH",
						"name": "Machinga",
						"parent": "MW-S"
					},
					"MW-MU": {
						"category": "district",
						"code": "MW-MU",
						"name": "Mulanje",
						"parent": "MW-S"
					},
					"MW-MW": {
						"category": "district",
						"code": "MW-MW",
						"name": "Mwanza",
						"parent": "MW-S"
					},
					"MW-MZ": {
						"category": "district",
						"code": "MW-MZ",
						"name": "Mzimba",
						"parent": "MW-N"
					},
					"MW-N": {
						"category": "region",
						"code": "MW-N",
						"name": "Northern Region",
						"parent": ""
					},
					"MW-NB": {
						"category": "district",
						"code": "MW-NB",
						"name": "Nkhata Bay",
						"parent": "MW-N"
					},
					"MW-NE": {
						"category": "district",
						"code": "MW-NE",
						"name": "Neno",
						"parent": "MW-S"
					},
					"MW-NI": {
						"category": "district",
						"code": "MW-NI",
						"name": "Ntchisi",
						"parent": "MW-C"
					},
					"MW-NK": {
						"category": "district",
						"code": "MW-NK",
						"name": "Nkhotakota",
						"parent": "MW-C"
					},
					"MW-NS": {
						"category": "district",
						"code": "MW-NS",
						"name": "Nsanje",
						"parent": "MW-S"
					},
					"MW-NU": {
						"category": "district",
						"code": "MW-NU",
						"name": "Ntcheu",
						"parent": "MW-C"
					},
					"MW-PH": {
						"category": "district",
						"code": "MW-PH",
						"name": "Phalombe",
						"parent": "MW-S"
					},
					"MW-RU": {
						"category": "district",
						"code": "MW-RU",
						"name": "Rumphi",
						"parent": "MW-N"
					},
					"MW-S": {
						"category": "region",
						"code": "MW-S",
						"name": "Southern Region",
						"parent": ""
					},
					"MW-SA": {
						"category": "district",
						"code": "MW-SA",
						"name": "Salima",
						"parent": "MW-C"
					},
					"MW-TH": {
						"category": "district",
						"code": "MW-TH",
						"name": "Thyolo",
						"parent": "MW-S"
					},
					"MW-ZO": {
						"category": "district",
						"code": "MW-ZO",
						"name": "Zomba",
						"parent": "MW-S"
					}
				}
			},
			"MYS": {
				"threeLetterCode": "MYS",
				"shortName": "Malaysia",
				"shortNameUpperCase": "MALAYSIA",
				"fullName": "Malaysia",
				"subdivisionLabel": "state",
				"subdivisions": {
					"MY-01": {
						"category": "state",
						"code": "MY-01",
						"name": "Johor",
						"parent": ""
					},
					"MY-02": {
						"category": "state",
						"code": "MY-02",
						"name": "Kedah",
						"parent": ""
					},
					"MY-03": {
						"category": "state",
						"code": "MY-03",
						"name": "Kelantan",
						"parent": ""
					},
					"MY-04": {
						"category": "state",
						"code": "MY-04",
						"name": "Melaka",
						"parent": ""
					},
					"MY-05": {
						"category": "state",
						"code": "MY-05",
						"name": "Negeri Sembilan",
						"parent": ""
					},
					"MY-06": {
						"category": "state",
						"code": "MY-06",
						"name": "Pahang",
						"parent": ""
					},
					"MY-07": {
						"category": "state",
						"code": "MY-07",
						"name": "Pulau Pinang",
						"parent": ""
					},
					"MY-08": {
						"category": "state",
						"code": "MY-08",
						"name": "Perak",
						"parent": ""
					},
					"MY-09": {
						"category": "state",
						"code": "MY-09",
						"name": "Perlis",
						"parent": ""
					},
					"MY-10": {
						"category": "state",
						"code": "MY-10",
						"name": "Selangor",
						"parent": ""
					},
					"MY-11": {
						"category": "state",
						"code": "MY-11",
						"name": "Terengganu",
						"parent": ""
					},
					"MY-12": {
						"category": "state",
						"code": "MY-12",
						"name": "Sabah",
						"parent": ""
					},
					"MY-13": {
						"category": "state",
						"code": "MY-13",
						"name": "Sarawak",
						"parent": ""
					},
					"MY-14": {
						"category": "federal territory",
						"code": "MY-14",
						"name": "Wilayah Persekutuan Kuala Lumpur",
						"parent": ""
					},
					"MY-15": {
						"category": "federal territory",
						"code": "MY-15",
						"name": "Wilayah Persekutuan Labuan",
						"parent": ""
					},
					"MY-16": {
						"category": "federal territory",
						"code": "MY-16",
						"name": "Wilayah Persekutuan Putrajaya",
						"parent": ""
					}
				}
			},
			"MYT": {
				"threeLetterCode": "MYT",
				"shortName": "Mayotte",
				"shortNameUpperCase": "MAYOTTE",
				"fullName": "Mayotte",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"NAM": {
				"threeLetterCode": "NAM",
				"shortName": "Namibia",
				"shortNameUpperCase": "NAMIBIA",
				"fullName": "the Republic of Namibia",
				"subdivisionLabel": "region",
				"subdivisions": {
					"NA-CA": {
						"category": "region",
						"code": "NA-CA",
						"name": "Zambezi",
						"parent": ""
					},
					"NA-ER": {
						"category": "region",
						"code": "NA-ER",
						"name": "Erongo",
						"parent": ""
					},
					"NA-HA": {
						"category": "region",
						"code": "NA-HA",
						"name": "Hardap",
						"parent": ""
					},
					"NA-KA": {
						"category": "region",
						"code": "NA-KA",
						"name": "Karas",
						"parent": ""
					},
					"NA-KE": {
						"category": "region",
						"code": "NA-KE",
						"name": "Kavango East",
						"parent": ""
					},
					"NA-KH": {
						"category": "region",
						"code": "NA-KH",
						"name": "Khomas",
						"parent": ""
					},
					"NA-KU": {
						"category": "region",
						"code": "NA-KU",
						"name": "Kunene",
						"parent": ""
					},
					"NA-KW": {
						"category": "region",
						"code": "NA-KW",
						"name": "Kavango West",
						"parent": ""
					},
					"NA-OD": {
						"category": "region",
						"code": "NA-OD",
						"name": "Otjozondjupa",
						"parent": ""
					},
					"NA-OH": {
						"category": "region",
						"code": "NA-OH",
						"name": "Omaheke",
						"parent": ""
					},
					"NA-ON": {
						"category": "region",
						"code": "NA-ON",
						"name": "Oshana",
						"parent": ""
					},
					"NA-OS": {
						"category": "region",
						"code": "NA-OS",
						"name": "Omusati",
						"parent": ""
					},
					"NA-OT": {
						"category": "region",
						"code": "NA-OT",
						"name": "Oshikoto",
						"parent": ""
					},
					"NA-OW": {
						"category": "region",
						"code": "NA-OW",
						"name": "Ohangwena",
						"parent": ""
					}
				}
			},
			"NCL": {
				"threeLetterCode": "NCL",
				"shortName": "New Caledonia",
				"shortNameUpperCase": "NEW CALEDONIA",
				"fullName": "New Caledonia",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"NER": {
				"commonName": "Niger",
				"threeLetterCode": "NER",
				"shortName": "Niger (the)",
				"shortNameUpperCase": "NIGER",
				"fullName": "the Republic of the Niger",
				"subdivisionLabel": "region",
				"subdivisions": {
					"NE-1": {
						"category": "region",
						"code": "NE-1",
						"name": "Agadez",
						"parent": ""
					},
					"NE-2": {
						"category": "region",
						"code": "NE-2",
						"name": "Diffa",
						"parent": ""
					},
					"NE-3": {
						"category": "region",
						"code": "NE-3",
						"name": "Dosso",
						"parent": ""
					},
					"NE-4": {
						"category": "region",
						"code": "NE-4",
						"name": "Maradi",
						"parent": ""
					},
					"NE-5": {
						"category": "region",
						"code": "NE-5",
						"name": "Tahoua",
						"parent": ""
					},
					"NE-6": {
						"category": "region",
						"code": "NE-6",
						"name": "Tillabéri",
						"parent": ""
					},
					"NE-7": {
						"category": "region",
						"code": "NE-7",
						"name": "Zinder",
						"parent": ""
					},
					"NE-8": {
						"category": "urban community",
						"code": "NE-8",
						"name": "Niamey",
						"parent": ""
					}
				}
			},
			"NFK": {
				"threeLetterCode": "NFK",
				"shortName": "Norfolk Island",
				"shortNameUpperCase": "NORFOLK ISLAND",
				"fullName": "Norfolk Island",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"NGA": {
				"threeLetterCode": "NGA",
				"shortName": "Nigeria",
				"shortNameUpperCase": "NIGERIA",
				"fullName": "the Federal Republic of Nigeria",
				"subdivisionLabel": "state",
				"subdivisions": {
					"NG-AB": {
						"category": "state",
						"code": "NG-AB",
						"name": "Abia",
						"parent": ""
					},
					"NG-AD": {
						"category": "state",
						"code": "NG-AD",
						"name": "Adamawa",
						"parent": ""
					},
					"NG-AK": {
						"category": "state",
						"code": "NG-AK",
						"name": "Akwa Ibom",
						"parent": ""
					},
					"NG-AN": {
						"category": "state",
						"code": "NG-AN",
						"name": "Anambra",
						"parent": ""
					},
					"NG-BA": {
						"category": "state",
						"code": "NG-BA",
						"name": "Bauchi",
						"parent": ""
					},
					"NG-BE": {
						"category": "state",
						"code": "NG-BE",
						"name": "Benue",
						"parent": ""
					},
					"NG-BO": {
						"category": "state",
						"code": "NG-BO",
						"name": "Borno",
						"parent": ""
					},
					"NG-BY": {
						"category": "state",
						"code": "NG-BY",
						"name": "Bayelsa",
						"parent": ""
					},
					"NG-CR": {
						"category": "state",
						"code": "NG-CR",
						"name": "Cross River",
						"parent": ""
					},
					"NG-DE": {
						"category": "state",
						"code": "NG-DE",
						"name": "Delta",
						"parent": ""
					},
					"NG-EB": {
						"category": "state",
						"code": "NG-EB",
						"name": "Ebonyi",
						"parent": ""
					},
					"NG-ED": {
						"category": "state",
						"code": "NG-ED",
						"name": "Edo",
						"parent": ""
					},
					"NG-EK": {
						"category": "state",
						"code": "NG-EK",
						"name": "Ekiti",
						"parent": ""
					},
					"NG-EN": {
						"category": "state",
						"code": "NG-EN",
						"name": "Enugu",
						"parent": ""
					},
					"NG-FC": {
						"category": "capital territory",
						"code": "NG-FC",
						"name": "Abuja Federal Capital Territory",
						"parent": ""
					},
					"NG-GO": {
						"category": "state",
						"code": "NG-GO",
						"name": "Gombe",
						"parent": ""
					},
					"NG-IM": {
						"category": "state",
						"code": "NG-IM",
						"name": "Imo",
						"parent": ""
					},
					"NG-JI": {
						"category": "state",
						"code": "NG-JI",
						"name": "Jigawa",
						"parent": ""
					},
					"NG-KD": {
						"category": "state",
						"code": "NG-KD",
						"name": "Kaduna",
						"parent": ""
					},
					"NG-KE": {
						"category": "state",
						"code": "NG-KE",
						"name": "Kebbi",
						"parent": ""
					},
					"NG-KN": {
						"category": "state",
						"code": "NG-KN",
						"name": "Kano",
						"parent": ""
					},
					"NG-KO": {
						"category": "state",
						"code": "NG-KO",
						"name": "Kogi",
						"parent": ""
					},
					"NG-KT": {
						"category": "state",
						"code": "NG-KT",
						"name": "Katsina",
						"parent": ""
					},
					"NG-KW": {
						"category": "state",
						"code": "NG-KW",
						"name": "Kwara",
						"parent": ""
					},
					"NG-LA": {
						"category": "state",
						"code": "NG-LA",
						"name": "Lagos",
						"parent": ""
					},
					"NG-NA": {
						"category": "state",
						"code": "NG-NA",
						"name": "Nasarawa",
						"parent": ""
					},
					"NG-NI": {
						"category": "state",
						"code": "NG-NI",
						"name": "Niger",
						"parent": ""
					},
					"NG-OG": {
						"category": "state",
						"code": "NG-OG",
						"name": "Ogun",
						"parent": ""
					},
					"NG-ON": {
						"category": "state",
						"code": "NG-ON",
						"name": "Ondo",
						"parent": ""
					},
					"NG-OS": {
						"category": "state",
						"code": "NG-OS",
						"name": "Osun",
						"parent": ""
					},
					"NG-OY": {
						"category": "state",
						"code": "NG-OY",
						"name": "Oyo",
						"parent": ""
					},
					"NG-PL": {
						"category": "state",
						"code": "NG-PL",
						"name": "Plateau",
						"parent": ""
					},
					"NG-RI": {
						"category": "state",
						"code": "NG-RI",
						"name": "Rivers",
						"parent": ""
					},
					"NG-SO": {
						"category": "state",
						"code": "NG-SO",
						"name": "Sokoto",
						"parent": ""
					},
					"NG-TA": {
						"category": "state",
						"code": "NG-TA",
						"name": "Taraba",
						"parent": ""
					},
					"NG-YO": {
						"category": "state",
						"code": "NG-YO",
						"name": "Yobe",
						"parent": ""
					},
					"NG-ZA": {
						"category": "state",
						"code": "NG-ZA",
						"name": "Zamfara",
						"parent": ""
					}
				}
			},
			"NIC": {
				"threeLetterCode": "NIC",
				"shortName": "Nicaragua",
				"shortNameUpperCase": "NICARAGUA",
				"fullName": "the Republic of Nicaragua",
				"subdivisionLabel": "department",
				"subdivisions": {
					"NI-AN": {
						"category": "autonomous region",
						"code": "NI-AN",
						"name": "Atlántico Norte",
						"parent": ""
					},
					"NI-AS": {
						"category": "autonomous region",
						"code": "NI-AS",
						"name": "Atlántico Sur",
						"parent": ""
					},
					"NI-BO": {
						"category": "department",
						"code": "NI-BO",
						"name": "Boaco",
						"parent": ""
					},
					"NI-CA": {
						"category": "department",
						"code": "NI-CA",
						"name": "Carazo",
						"parent": ""
					},
					"NI-CI": {
						"category": "department",
						"code": "NI-CI",
						"name": "Chinandega",
						"parent": ""
					},
					"NI-CO": {
						"category": "department",
						"code": "NI-CO",
						"name": "Chontales",
						"parent": ""
					},
					"NI-ES": {
						"category": "department",
						"code": "NI-ES",
						"name": "Estelí",
						"parent": ""
					},
					"NI-GR": {
						"category": "department",
						"code": "NI-GR",
						"name": "Granada",
						"parent": ""
					},
					"NI-JI": {
						"category": "department",
						"code": "NI-JI",
						"name": "Jinotega",
						"parent": ""
					},
					"NI-LE": {
						"category": "department",
						"code": "NI-LE",
						"name": "León",
						"parent": ""
					},
					"NI-MD": {
						"category": "department",
						"code": "NI-MD",
						"name": "Madriz",
						"parent": ""
					},
					"NI-MN": {
						"category": "department",
						"code": "NI-MN",
						"name": "Managua",
						"parent": ""
					},
					"NI-MS": {
						"category": "department",
						"code": "NI-MS",
						"name": "Masaya",
						"parent": ""
					},
					"NI-MT": {
						"category": "department",
						"code": "NI-MT",
						"name": "Matagalpa",
						"parent": ""
					},
					"NI-NS": {
						"category": "department",
						"code": "NI-NS",
						"name": "Nueva Segovia",
						"parent": ""
					},
					"NI-RI": {
						"category": "department",
						"code": "NI-RI",
						"name": "Rivas",
						"parent": ""
					},
					"NI-SJ": {
						"category": "department",
						"code": "NI-SJ",
						"name": "Río San Juan",
						"parent": ""
					}
				}
			},
			"NIU": {
				"threeLetterCode": "NIU",
				"shortName": "Niue",
				"shortNameUpperCase": "NIUE",
				"fullName": "Niue",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"NLD": {
				"commonName": "Netherlands",
				"threeLetterCode": "NLD",
				"shortName": "Netherlands (the)",
				"shortNameUpperCase": "NETHERLANDS",
				"fullName": "the Kingdom of the Netherlands",
				"subdivisionLabel": "province",
				"subdivisions": {
					"NL-DR": {
						"category": "province",
						"code": "NL-DR",
						"name": "Drenthe",
						"parent": ""
					},
					"NL-FL": {
						"category": "province",
						"code": "NL-FL",
						"name": "Flevoland",
						"parent": ""
					},
					"NL-FR": {
						"category": "province",
						"code": "NL-FR",
						"name": "Fryslân",
						"parent": ""
					},
					"NL-GE": {
						"category": "province",
						"code": "NL-GE",
						"name": "Gelderland",
						"parent": ""
					},
					"NL-GR": {
						"category": "province",
						"code": "NL-GR",
						"name": "Groningen",
						"parent": ""
					},
					"NL-LI": {
						"category": "province",
						"code": "NL-LI",
						"name": "Limburg",
						"parent": ""
					},
					"NL-NB": {
						"category": "province",
						"code": "NL-NB",
						"name": "Noord-Brabant",
						"parent": ""
					},
					"NL-NH": {
						"category": "province",
						"code": "NL-NH",
						"name": "Noord-Holland",
						"parent": ""
					},
					"NL-OV": {
						"category": "province",
						"code": "NL-OV",
						"name": "Overijssel",
						"parent": ""
					},
					"NL-UT": {
						"category": "province",
						"code": "NL-UT",
						"name": "Utrecht",
						"parent": ""
					},
					"NL-ZE": {
						"category": "province",
						"code": "NL-ZE",
						"name": "Zeeland",
						"parent": ""
					},
					"NL-ZH": {
						"category": "province",
						"code": "NL-ZH",
						"name": "Zuid-Holland",
						"parent": ""
					}
				}
			},
			"NOR": {
				"threeLetterCode": "NOR",
				"shortName": "Norway",
				"shortNameUpperCase": "NORWAY",
				"fullName": "the Kingdom of Norway",
				"subdivisionLabel": "county",
				"subdivisions": {
					"NO-01": {
						"category": "county",
						"code": "NO-01",
						"name": "Østfold",
						"parent": ""
					},
					"NO-02": {
						"category": "county",
						"code": "NO-02",
						"name": "Akershus",
						"parent": ""
					},
					"NO-03": {
						"category": "county",
						"code": "NO-03",
						"name": "Oslo",
						"parent": ""
					},
					"NO-04": {
						"category": "county",
						"code": "NO-04",
						"name": "Hedmark",
						"parent": ""
					},
					"NO-05": {
						"category": "county",
						"code": "NO-05",
						"name": "Oppland",
						"parent": ""
					},
					"NO-06": {
						"category": "county",
						"code": "NO-06",
						"name": "Buskerud",
						"parent": ""
					},
					"NO-07": {
						"category": "county",
						"code": "NO-07",
						"name": "Vestfold",
						"parent": ""
					},
					"NO-08": {
						"category": "county",
						"code": "NO-08",
						"name": "Telemark",
						"parent": ""
					},
					"NO-09": {
						"category": "county",
						"code": "NO-09",
						"name": "Aust-Agder",
						"parent": ""
					},
					"NO-10": {
						"category": "county",
						"code": "NO-10",
						"name": "Vest-Agder",
						"parent": ""
					},
					"NO-11": {
						"category": "county",
						"code": "NO-11",
						"name": "Rogaland",
						"parent": ""
					},
					"NO-12": {
						"category": "county",
						"code": "NO-12",
						"name": "Hordaland",
						"parent": ""
					},
					"NO-14": {
						"category": "county",
						"code": "NO-14",
						"name": "Sogn og Fjordane",
						"parent": ""
					},
					"NO-15": {
						"category": "county",
						"code": "NO-15",
						"name": "Møre og Romsdal",
						"parent": ""
					},
					"NO-16": {
						"category": "county",
						"code": "NO-16",
						"name": "Sør-Trøndelag",
						"parent": ""
					},
					"NO-17": {
						"category": "county",
						"code": "NO-17",
						"name": "Nord-Trøndelag",
						"parent": ""
					},
					"NO-18": {
						"category": "county",
						"code": "NO-18",
						"name": "Nordland",
						"parent": ""
					},
					"NO-19": {
						"category": "county",
						"code": "NO-19",
						"name": "Troms",
						"parent": ""
					},
					"NO-20": {
						"category": "county",
						"code": "NO-20",
						"name": "Finnmark",
						"parent": ""
					}
				}
			},
			"NPL": {
				"threeLetterCode": "NPL",
				"shortName": "Nepal",
				"shortNameUpperCase": "NEPAL",
				"fullName": "the Federal Democratic Republic of Nepal",
				"subdivisionLabel": "zone",
				"subdivisions": {
					"NP-1": {
						"category": "development region",
						"code": "NP-1",
						"name": "Central",
						"parent": ""
					},
					"NP-2": {
						"category": "development region",
						"code": "NP-2",
						"name": "Mid Western",
						"parent": ""
					},
					"NP-3": {
						"category": "development region",
						"code": "NP-3",
						"name": "Western",
						"parent": ""
					},
					"NP-4": {
						"category": "development region",
						"code": "NP-4",
						"name": "Eastern",
						"parent": ""
					},
					"NP-5": {
						"category": "development region",
						"code": "NP-5",
						"name": "Far Western",
						"parent": ""
					},
					"NP-BA": {
						"category": "zone",
						"code": "NP-BA",
						"name": "Bagmati",
						"parent": "NP-1"
					},
					"NP-BH": {
						"category": "zone",
						"code": "NP-BH",
						"name": "Bheri",
						"parent": "NP-2"
					},
					"NP-DH": {
						"category": "zone",
						"code": "NP-DH",
						"name": "Dhawalagiri",
						"parent": "NP-3"
					},
					"NP-GA": {
						"category": "zone",
						"code": "NP-GA",
						"name": "Gandaki",
						"parent": "NP-3"
					},
					"NP-JA": {
						"category": "zone",
						"code": "NP-JA",
						"name": "Janakpur",
						"parent": "NP-1"
					},
					"NP-KA": {
						"category": "zone",
						"code": "NP-KA",
						"name": "Karnali",
						"parent": "NP-2"
					},
					"NP-KO": {
						"category": "zone",
						"code": "NP-KO",
						"name": "Kosi",
						"parent": "NP-4"
					},
					"NP-LU": {
						"category": "zone",
						"code": "NP-LU",
						"name": "Lumbini",
						"parent": "NP-3"
					},
					"NP-MA": {
						"category": "zone",
						"code": "NP-MA",
						"name": "Mahakali",
						"parent": "NP-5"
					},
					"NP-ME": {
						"category": "zone",
						"code": "NP-ME",
						"name": "Mechi",
						"parent": "NP-4"
					},
					"NP-NA": {
						"category": "zone",
						"code": "NP-NA",
						"name": "Narayani",
						"parent": "NP-1"
					},
					"NP-RA": {
						"category": "zone",
						"code": "NP-RA",
						"name": "Rapti",
						"parent": "NP-2"
					},
					"NP-SA": {
						"category": "zone",
						"code": "NP-SA",
						"name": "Sagarmatha",
						"parent": "NP-4"
					},
					"NP-SE": {
						"category": "zone",
						"code": "NP-SE",
						"name": "Seti",
						"parent": "NP-5"
					}
				}
			},
			"NRU": {
				"threeLetterCode": "NRU",
				"shortName": "Nauru",
				"shortNameUpperCase": "NAURU",
				"fullName": "the Republic of Nauru",
				"subdivisionLabel": "district",
				"subdivisions": {
					"NR-01": {
						"category": "district",
						"code": "NR-01",
						"name": "Aiwo",
						"parent": ""
					},
					"NR-02": {
						"category": "district",
						"code": "NR-02",
						"name": "Anabar",
						"parent": ""
					},
					"NR-03": {
						"category": "district",
						"code": "NR-03",
						"name": "Anetan",
						"parent": ""
					},
					"NR-04": {
						"category": "district",
						"code": "NR-04",
						"name": "Anibare",
						"parent": ""
					},
					"NR-05": {
						"category": "district",
						"code": "NR-05",
						"name": "Baitsi",
						"parent": ""
					},
					"NR-06": {
						"category": "district",
						"code": "NR-06",
						"name": "Boe",
						"parent": ""
					},
					"NR-07": {
						"category": "district",
						"code": "NR-07",
						"name": "Buada",
						"parent": ""
					},
					"NR-08": {
						"category": "district",
						"code": "NR-08",
						"name": "Denigomodu",
						"parent": ""
					},
					"NR-09": {
						"category": "district",
						"code": "NR-09",
						"name": "Ewa",
						"parent": ""
					},
					"NR-10": {
						"category": "district",
						"code": "NR-10",
						"name": "Ijuw",
						"parent": ""
					},
					"NR-11": {
						"category": "district",
						"code": "NR-11",
						"name": "Meneng",
						"parent": ""
					},
					"NR-12": {
						"category": "district",
						"code": "NR-12",
						"name": "Nibok",
						"parent": ""
					},
					"NR-13": {
						"category": "district",
						"code": "NR-13",
						"name": "Uaboe",
						"parent": ""
					},
					"NR-14": {
						"category": "district",
						"code": "NR-14",
						"name": "Yaren",
						"parent": ""
					}
				}
			},
			"NZL": {
				"threeLetterCode": "NZL",
				"shortName": "New Zealand",
				"shortNameUpperCase": "NEW ZEALAND",
				"fullName": "New Zealand",
				"subdivisionLabel": "region",
				"subdivisions": {
					"NZ-AUK": {
						"category": "region",
						"code": "NZ-AUK",
						"name": "Auckland",
						"parent": ""
					},
					"NZ-BOP": {
						"category": "region",
						"code": "NZ-BOP",
						"name": "Bay of Plenty",
						"parent": ""
					},
					"NZ-CAN": {
						"category": "region",
						"code": "NZ-CAN",
						"name": "Canterbury",
						"parent": ""
					},
					"NZ-CIT": {
						"category": "special island authority",
						"code": "NZ-CIT",
						"name": "Chatham Islands Territory",
						"parent": ""
					},
					"NZ-GIS": {
						"category": "region",
						"code": "NZ-GIS",
						"name": "Gisborne",
						"parent": ""
					},
					"NZ-HKB": {
						"category": "region",
						"code": "NZ-HKB",
						"name": "Hawke's Bay",
						"parent": ""
					},
					"NZ-MBH": {
						"category": "region",
						"code": "NZ-MBH",
						"name": "Marlborough",
						"parent": ""
					},
					"NZ-MWT": {
						"category": "region",
						"code": "NZ-MWT",
						"name": "Manawatu-Wanganui",
						"parent": ""
					},
					"NZ-NSN": {
						"category": "region",
						"code": "NZ-NSN",
						"name": "Nelson",
						"parent": ""
					},
					"NZ-NTL": {
						"category": "region",
						"code": "NZ-NTL",
						"name": "Northland",
						"parent": ""
					},
					"NZ-OTA": {
						"category": "region",
						"code": "NZ-OTA",
						"name": "Otago",
						"parent": ""
					},
					"NZ-STL": {
						"category": "region",
						"code": "NZ-STL",
						"name": "Southland",
						"parent": ""
					},
					"NZ-TAS": {
						"category": "region",
						"code": "NZ-TAS",
						"name": "Tasman",
						"parent": ""
					},
					"NZ-TKI": {
						"category": "region",
						"code": "NZ-TKI",
						"name": "Taranaki",
						"parent": ""
					},
					"NZ-WGN": {
						"category": "region",
						"code": "NZ-WGN",
						"name": "Wellington",
						"parent": ""
					},
					"NZ-WKO": {
						"category": "region",
						"code": "NZ-WKO",
						"name": "Waikato",
						"parent": ""
					},
					"NZ-WTC": {
						"category": "region",
						"code": "NZ-WTC",
						"name": "West Coast",
						"parent": ""
					}
				}
			},
			"OMN": {
				"threeLetterCode": "OMN",
				"shortName": "Oman",
				"shortNameUpperCase": "OMAN",
				"fullName": "the Sultanate of Oman",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"OM-BJ": {
						"category": "governorate",
						"code": "OM-BJ",
						"name": "Janūb al Bāţinah",
						"parent": ""
					},
					"OM-BS": {
						"category": "governorate",
						"code": "OM-BS",
						"name": "Shamāl al Bāţinah",
						"parent": ""
					},
					"OM-BU": {
						"category": "governorate",
						"code": "OM-BU",
						"name": "Al Buraymī",
						"parent": ""
					},
					"OM-DA": {
						"category": "governorate",
						"code": "OM-DA",
						"name": "Ad Dākhilīyah",
						"parent": ""
					},
					"OM-MA": {
						"category": "governorate",
						"code": "OM-MA",
						"name": "Masqaţ",
						"parent": ""
					},
					"OM-MU": {
						"category": "governorate",
						"code": "OM-MU",
						"name": "Musandam",
						"parent": ""
					},
					"OM-SJ": {
						"category": "governorate",
						"code": "OM-SJ",
						"name": "Janūb ash Sharqīyah",
						"parent": ""
					},
					"OM-SS": {
						"category": "governorate",
						"code": "OM-SS",
						"name": "Shamāl ash Sharqīyah",
						"parent": ""
					},
					"OM-WU": {
						"category": "governorate",
						"code": "OM-WU",
						"name": "Al Wusţá",
						"parent": ""
					},
					"OM-ZA": {
						"category": "governorate",
						"code": "OM-ZA",
						"name": "Az̧ Z̧āhirah",
						"parent": ""
					},
					"OM-ZU": {
						"category": "governorate",
						"code": "OM-ZU",
						"name": "Z̧ufār",
						"parent": ""
					}
				}
			},
			"PAK": {
				"threeLetterCode": "PAK",
				"shortName": "Pakistan",
				"shortNameUpperCase": "PAKISTAN",
				"fullName": "the Islamic Republic of Pakistan",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"PK-BA": {
						"category": "province",
						"code": "PK-BA",
						"name": "Balochistan",
						"parent": ""
					},
					"PK-GB": {
						"category": "Pakistan administered area",
						"code": "PK-GB",
						"name": "Gilgit-Baltistan",
						"parent": ""
					},
					"PK-IS": {
						"category": "federal capital territory",
						"code": "PK-IS",
						"name": "Islamabad",
						"parent": ""
					},
					"PK-JK": {
						"category": "Pakistan administered area",
						"code": "PK-JK",
						"name": "Azad Jammu and Kashmir",
						"parent": ""
					},
					"PK-KP": {
						"category": "province",
						"code": "PK-KP",
						"name": "Khyber Pakhtunkhwa",
						"parent": ""
					},
					"PK-PB": {
						"category": "province",
						"code": "PK-PB",
						"name": "Punjab",
						"parent": ""
					},
					"PK-SD": {
						"category": "province",
						"code": "PK-SD",
						"name": "Sindh",
						"parent": ""
					},
					"PK-TA": {
						"category": "territory",
						"code": "PK-TA",
						"name": "Federally Administered Tribal Areas",
						"parent": ""
					}
				}
			},
			"PAN": {
				"threeLetterCode": "PAN",
				"shortName": "Panama",
				"shortNameUpperCase": "PANAMA",
				"fullName": "the Republic of Panama",
				"subdivisionLabel": "province",
				"subdivisions": {
					"PA-1": {
						"category": "province",
						"code": "PA-1",
						"name": "Bocas del Toro",
						"parent": ""
					},
					"PA-10": {
						"category": "province",
						"code": "PA-10",
						"name": "Panamá Oeste",
						"parent": ""
					},
					"PA-2": {
						"category": "province",
						"code": "PA-2",
						"name": "Coclé",
						"parent": ""
					},
					"PA-3": {
						"category": "province",
						"code": "PA-3",
						"name": "Colón",
						"parent": ""
					},
					"PA-4": {
						"category": "province",
						"code": "PA-4",
						"name": "Chiriquí",
						"parent": ""
					},
					"PA-5": {
						"category": "province",
						"code": "PA-5",
						"name": "Darién",
						"parent": ""
					},
					"PA-6": {
						"category": "province",
						"code": "PA-6",
						"name": "Herrera",
						"parent": ""
					},
					"PA-7": {
						"category": "province",
						"code": "PA-7",
						"name": "Los Santos",
						"parent": ""
					},
					"PA-8": {
						"category": "province",
						"code": "PA-8",
						"name": "Panamá",
						"parent": ""
					},
					"PA-9": {
						"category": "province",
						"code": "PA-9",
						"name": "Veraguas",
						"parent": ""
					},
					"PA-EM": {
						"category": "indigenous region",
						"code": "PA-EM",
						"name": "Emberá",
						"parent": ""
					},
					"PA-KY": {
						"category": "indigenous region",
						"code": "PA-KY",
						"name": "Guna Yala",
						"parent": ""
					},
					"PA-NB": {
						"category": "indigenous region",
						"code": "PA-NB",
						"name": "Ngöbe-Buglé",
						"parent": ""
					}
				}
			},
			"PCN": {
				"threeLetterCode": "PCN",
				"shortName": "Pitcairn",
				"shortNameUpperCase": "PITCAIRN",
				"fullName": "Pitcairn",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"PER": {
				"threeLetterCode": "PER",
				"shortName": "Peru",
				"shortNameUpperCase": "PERU",
				"fullName": "the Republic of Peru",
				"subdivisionLabel": "region",
				"subdivisions": {
					"PE-AMA": {
						"category": "region",
						"code": "PE-AMA",
						"name": "Amasunu",
						"parent": ""
					},
					"PE-ANC": {
						"category": "region",
						"code": "PE-ANC",
						"name": "Ankashu",
						"parent": ""
					},
					"PE-APU": {
						"category": "region",
						"code": "PE-APU",
						"name": "Apurimaq",
						"parent": ""
					},
					"PE-ARE": {
						"category": "region",
						"code": "PE-ARE",
						"name": "Arikipa",
						"parent": ""
					},
					"PE-AYA": {
						"category": "region",
						"code": "PE-AYA",
						"name": "Ayaquchu",
						"parent": ""
					},
					"PE-CAJ": {
						"category": "region",
						"code": "PE-CAJ",
						"name": "Qajamarka",
						"parent": ""
					},
					"PE-CAL": {
						"category": "region",
						"code": "PE-CAL",
						"name": "Kallao",
						"parent": ""
					},
					"PE-CUS": {
						"category": "region",
						"code": "PE-CUS",
						"name": "Kusku",
						"parent": ""
					},
					"PE-HUC": {
						"category": "region",
						"code": "PE-HUC",
						"name": "Wanuku",
						"parent": ""
					},
					"PE-HUV": {
						"category": "region",
						"code": "PE-HUV",
						"name": "Wankawelika",
						"parent": ""
					},
					"PE-ICA": {
						"category": "region",
						"code": "PE-ICA",
						"name": "Ika",
						"parent": ""
					},
					"PE-JUN": {
						"category": "region",
						"code": "PE-JUN",
						"name": "Junin",
						"parent": ""
					},
					"PE-LAL": {
						"category": "region",
						"code": "PE-LAL",
						"name": "La Libertad",
						"parent": ""
					},
					"PE-LAM": {
						"category": "region",
						"code": "PE-LAM",
						"name": "Lambayeque",
						"parent": ""
					},
					"PE-LIM": {
						"category": "region",
						"code": "PE-LIM",
						"name": "Lima",
						"parent": ""
					},
					"PE-LMA": {
						"category": "municipality",
						"code": "PE-LMA",
						"name": "Lima hatun llaqta",
						"parent": ""
					},
					"PE-LOR": {
						"category": "region",
						"code": "PE-LOR",
						"name": "Luritu",
						"parent": ""
					},
					"PE-MDD": {
						"category": "region",
						"code": "PE-MDD",
						"name": "Madre de Dios",
						"parent": ""
					},
					"PE-MOQ": {
						"category": "region",
						"code": "PE-MOQ",
						"name": "Moqwegwa",
						"parent": ""
					},
					"PE-PAS": {
						"category": "region",
						"code": "PE-PAS",
						"name": "Pasqu",
						"parent": ""
					},
					"PE-PIU": {
						"category": "region",
						"code": "PE-PIU",
						"name": "Piura",
						"parent": ""
					},
					"PE-PUN": {
						"category": "region",
						"code": "PE-PUN",
						"name": "Puno",
						"parent": ""
					},
					"PE-SAM": {
						"category": "region",
						"code": "PE-SAM",
						"name": "San Martín",
						"parent": ""
					},
					"PE-TAC": {
						"category": "region",
						"code": "PE-TAC",
						"name": "Takna",
						"parent": ""
					},
					"PE-TUM": {
						"category": "region",
						"code": "PE-TUM",
						"name": "Tumbes",
						"parent": ""
					},
					"PE-UCA": {
						"category": "region",
						"code": "PE-UCA",
						"name": "Ukayali",
						"parent": ""
					}
				}
			},
			"PHL": {
				"commonName": "Philippines",
				"threeLetterCode": "PHL",
				"shortName": "Philippines (the)",
				"shortNameUpperCase": "PHILIPPINES",
				"fullName": "the Republic of the Philippines",
				"subdivisionLabel": "province",
				"subdivisions": {
					"PH-00": {
						"category": "region",
						"code": "PH-00",
						"name": "National Capital Region",
						"parent": ""
					},
					"PH-01": {
						"category": "region",
						"code": "PH-01",
						"name": "Ilocos (Region I)",
						"parent": ""
					},
					"PH-02": {
						"category": "region",
						"code": "PH-02",
						"name": "Cagayan Valley (Region II)",
						"parent": ""
					},
					"PH-03": {
						"category": "region",
						"code": "PH-03",
						"name": "Central Luzon (Region III)",
						"parent": ""
					},
					"PH-05": {
						"category": "region",
						"code": "PH-05",
						"name": "Bicol (Region V)",
						"parent": ""
					},
					"PH-06": {
						"category": "region",
						"code": "PH-06",
						"name": "Western Visayas (Region VI)",
						"parent": ""
					},
					"PH-07": {
						"category": "region",
						"code": "PH-07",
						"name": "Central Visayas (Region VII)",
						"parent": ""
					},
					"PH-08": {
						"category": "region",
						"code": "PH-08",
						"name": "Eastern Visayas (Region VIII)",
						"parent": ""
					},
					"PH-09": {
						"category": "region",
						"code": "PH-09",
						"name": "Zamboanga Peninsula (Region IX)",
						"parent": ""
					},
					"PH-10": {
						"category": "region",
						"code": "PH-10",
						"name": "Northern Mindanao (Region X)",
						"parent": ""
					},
					"PH-11": {
						"category": "region",
						"code": "PH-11",
						"name": "Davao (Region XI)",
						"parent": ""
					},
					"PH-12": {
						"category": "region",
						"code": "PH-12",
						"name": "Soccsksargen (Region XII)",
						"parent": ""
					},
					"PH-13": {
						"category": "region",
						"code": "PH-13",
						"name": "Caraga (Region XIII)",
						"parent": ""
					},
					"PH-14": {
						"category": "region",
						"code": "PH-14",
						"name": "Autonomous Region in Muslim Mindanao (ARMM)",
						"parent": ""
					},
					"PH-15": {
						"category": "region",
						"code": "PH-15",
						"name": "Cordillera Administrative Region (CAR)",
						"parent": ""
					},
					"PH-40": {
						"category": "region",
						"code": "PH-40",
						"name": "Calabarzon (Region IV-A)",
						"parent": ""
					},
					"PH-41": {
						"category": "region",
						"code": "PH-41",
						"name": "Mimaropa (Region IV-B)",
						"parent": ""
					},
					"PH-ABR": {
						"category": "province",
						"code": "PH-ABR",
						"name": "Abra",
						"parent": "PH-15"
					},
					"PH-AGN": {
						"category": "province",
						"code": "PH-AGN",
						"name": "Agusan del Norte",
						"parent": "PH-13"
					},
					"PH-AGS": {
						"category": "province",
						"code": "PH-AGS",
						"name": "Agusan del Sur",
						"parent": "PH-13"
					},
					"PH-AKL": {
						"category": "province",
						"code": "PH-AKL",
						"name": "Aklan",
						"parent": "PH-06"
					},
					"PH-ALB": {
						"category": "province",
						"code": "PH-ALB",
						"name": "Albay",
						"parent": "PH-05"
					},
					"PH-ANT": {
						"category": "province",
						"code": "PH-ANT",
						"name": "Antique",
						"parent": "PH-06"
					},
					"PH-APA": {
						"category": "province",
						"code": "PH-APA",
						"name": "Apayao",
						"parent": "PH-15"
					},
					"PH-AUR": {
						"category": "province",
						"code": "PH-AUR",
						"name": "Aurora",
						"parent": "PH-03"
					},
					"PH-BAN": {
						"category": "province",
						"code": "PH-BAN",
						"name": "Bataan",
						"parent": "PH-03"
					},
					"PH-BAS": {
						"category": "province",
						"code": "PH-BAS",
						"name": "Basilan",
						"parent": "PH-09"
					},
					"PH-BEN": {
						"category": "province",
						"code": "PH-BEN",
						"name": "Benguet",
						"parent": "PH-15"
					},
					"PH-BIL": {
						"category": "province",
						"code": "PH-BIL",
						"name": "Biliran",
						"parent": "PH-08"
					},
					"PH-BOH": {
						"category": "province",
						"code": "PH-BOH",
						"name": "Bohol",
						"parent": "PH-07"
					},
					"PH-BTG": {
						"category": "province",
						"code": "PH-BTG",
						"name": "Batangas",
						"parent": "PH-40"
					},
					"PH-BTN": {
						"category": "province",
						"code": "PH-BTN",
						"name": "Batanes",
						"parent": "PH-02"
					},
					"PH-BUK": {
						"category": "province",
						"code": "PH-BUK",
						"name": "Bukidnon",
						"parent": "PH-10"
					},
					"PH-BUL": {
						"category": "province",
						"code": "PH-BUL",
						"name": "Bulacan",
						"parent": "PH-03"
					},
					"PH-CAG": {
						"category": "province",
						"code": "PH-CAG",
						"name": "Cagayan",
						"parent": "PH-02"
					},
					"PH-CAM": {
						"category": "province",
						"code": "PH-CAM",
						"name": "Camiguin",
						"parent": "PH-10"
					},
					"PH-CAN": {
						"category": "province",
						"code": "PH-CAN",
						"name": "Camarines Norte",
						"parent": "PH-05"
					},
					"PH-CAP": {
						"category": "province",
						"code": "PH-CAP",
						"name": "Capiz",
						"parent": "PH-06"
					},
					"PH-CAS": {
						"category": "province",
						"code": "PH-CAS",
						"name": "Camarines Sur",
						"parent": "PH-05"
					},
					"PH-CAT": {
						"category": "province",
						"code": "PH-CAT",
						"name": "Catanduanes",
						"parent": "PH-05"
					},
					"PH-CAV": {
						"category": "province",
						"code": "PH-CAV",
						"name": "Cavite",
						"parent": "PH-40"
					},
					"PH-CEB": {
						"category": "province",
						"code": "PH-CEB",
						"name": "Cebu",
						"parent": "PH-07"
					},
					"PH-COM": {
						"category": "province",
						"code": "PH-COM",
						"name": "Compostela Valley",
						"parent": "PH-11"
					},
					"PH-DAO": {
						"category": "province",
						"code": "PH-DAO",
						"name": "Davao Oriental",
						"parent": "PH-11"
					},
					"PH-DAS": {
						"category": "province",
						"code": "PH-DAS",
						"name": "Davao del Sur",
						"parent": "PH-11"
					},
					"PH-DAV": {
						"category": "province",
						"code": "PH-DAV",
						"name": "Davao del Norte",
						"parent": "PH-11"
					},
					"PH-DIN": {
						"category": "province",
						"code": "PH-DIN",
						"name": "Dinagat Islands",
						"parent": "PH-13"
					},
					"PH-DVO": {
						"category": "province",
						"code": "PH-DVO",
						"name": "Davao Occidental",
						"parent": "PH-11"
					},
					"PH-EAS": {
						"category": "province",
						"code": "PH-EAS",
						"name": "Eastern Samar",
						"parent": "PH-08"
					},
					"PH-GUI": {
						"category": "province",
						"code": "PH-GUI",
						"name": "Guimaras",
						"parent": "PH-06"
					},
					"PH-IFU": {
						"category": "province",
						"code": "PH-IFU",
						"name": "Ifugao",
						"parent": "PH-15"
					},
					"PH-ILI": {
						"category": "province",
						"code": "PH-ILI",
						"name": "Iloilo",
						"parent": "PH-06"
					},
					"PH-ILN": {
						"category": "province",
						"code": "PH-ILN",
						"name": "Ilocos Norte",
						"parent": "PH-01"
					},
					"PH-ILS": {
						"category": "province",
						"code": "PH-ILS",
						"name": "Ilocos Sur",
						"parent": "PH-01"
					},
					"PH-ISA": {
						"category": "province",
						"code": "PH-ISA",
						"name": "Isabela",
						"parent": "PH-02"
					},
					"PH-KAL": {
						"category": "province",
						"code": "PH-KAL",
						"name": "Kalinga",
						"parent": "PH-15"
					},
					"PH-LAG": {
						"category": "province",
						"code": "PH-LAG",
						"name": "Laguna",
						"parent": "PH-40"
					},
					"PH-LAN": {
						"category": "province",
						"code": "PH-LAN",
						"name": "Lanao del Norte",
						"parent": "PH-12"
					},
					"PH-LAS": {
						"category": "province",
						"code": "PH-LAS",
						"name": "Lanao del Sur",
						"parent": "PH-14"
					},
					"PH-LEY": {
						"category": "province",
						"code": "PH-LEY",
						"name": "Leyte",
						"parent": "PH-08"
					},
					"PH-LUN": {
						"category": "province",
						"code": "PH-LUN",
						"name": "La Union",
						"parent": "PH-01"
					},
					"PH-MAD": {
						"category": "province",
						"code": "PH-MAD",
						"name": "Marinduque",
						"parent": "PH-41"
					},
					"PH-MAG": {
						"category": "province",
						"code": "PH-MAG",
						"name": "Maguindanao",
						"parent": "PH-14"
					},
					"PH-MAS": {
						"category": "province",
						"code": "PH-MAS",
						"name": "Masbate",
						"parent": "PH-05"
					},
					"PH-MDC": {
						"category": "province",
						"code": "PH-MDC",
						"name": "Mindoro Occidental",
						"parent": "PH-41"
					},
					"PH-MDR": {
						"category": "province",
						"code": "PH-MDR",
						"name": "Mindoro Oriental",
						"parent": "PH-41"
					},
					"PH-MOU": {
						"category": "province",
						"code": "PH-MOU",
						"name": "Mountain Province",
						"parent": "PH-15"
					},
					"PH-MSC": {
						"category": "province",
						"code": "PH-MSC",
						"name": "Misamis Occidental",
						"parent": "PH-10"
					},
					"PH-MSR": {
						"category": "province",
						"code": "PH-MSR",
						"name": "Misamis Oriental",
						"parent": "PH-10"
					},
					"PH-NCO": {
						"category": "province",
						"code": "PH-NCO",
						"name": "Cotabato",
						"parent": "PH-12"
					},
					"PH-NEC": {
						"category": "province",
						"code": "PH-NEC",
						"name": "Negros Occidental",
						"parent": "PH-06"
					},
					"PH-NER": {
						"category": "province",
						"code": "PH-NER",
						"name": "Negros Oriental",
						"parent": "PH-07"
					},
					"PH-NSA": {
						"category": "province",
						"code": "PH-NSA",
						"name": "Northern Samar",
						"parent": "PH-08"
					},
					"PH-NUE": {
						"category": "province",
						"code": "PH-NUE",
						"name": "Nueva Ecija",
						"parent": "PH-03"
					},
					"PH-NUV": {
						"category": "province",
						"code": "PH-NUV",
						"name": "Nueva Vizcaya",
						"parent": "PH-02"
					},
					"PH-PAM": {
						"category": "province",
						"code": "PH-PAM",
						"name": "Pampanga",
						"parent": "PH-03"
					},
					"PH-PAN": {
						"category": "province",
						"code": "PH-PAN",
						"name": "Pangasinan",
						"parent": "PH-01"
					},
					"PH-PLW": {
						"category": "province",
						"code": "PH-PLW",
						"name": "Palawan",
						"parent": "PH-41"
					},
					"PH-QUE": {
						"category": "province",
						"code": "PH-QUE",
						"name": "Quezon",
						"parent": "PH-40"
					},
					"PH-QUI": {
						"category": "province",
						"code": "PH-QUI",
						"name": "Quirino",
						"parent": "PH-02"
					},
					"PH-RIZ": {
						"category": "province",
						"code": "PH-RIZ",
						"name": "Rizal",
						"parent": "PH-40"
					},
					"PH-ROM": {
						"category": "province",
						"code": "PH-ROM",
						"name": "Romblon",
						"parent": "PH-41"
					},
					"PH-SAR": {
						"category": "province",
						"code": "PH-SAR",
						"name": "Sarangani",
						"parent": "PH-11"
					},
					"PH-SCO": {
						"category": "province",
						"code": "PH-SCO",
						"name": "South Cotabato",
						"parent": "PH-11"
					},
					"PH-SIG": {
						"category": "province",
						"code": "PH-SIG",
						"name": "Siquijor",
						"parent": "PH-07"
					},
					"PH-SLE": {
						"category": "province",
						"code": "PH-SLE",
						"name": "Southern Leyte",
						"parent": "PH-08"
					},
					"PH-SLU": {
						"category": "province",
						"code": "PH-SLU",
						"name": "Sulu",
						"parent": "PH-14"
					},
					"PH-SOR": {
						"category": "province",
						"code": "PH-SOR",
						"name": "Sorsogon",
						"parent": "PH-05"
					},
					"PH-SUK": {
						"category": "province",
						"code": "PH-SUK",
						"name": "Sultan Kudarat",
						"parent": "PH-12"
					},
					"PH-SUN": {
						"category": "province",
						"code": "PH-SUN",
						"name": "Surigao del Norte",
						"parent": "PH-13"
					},
					"PH-SUR": {
						"category": "province",
						"code": "PH-SUR",
						"name": "Surigao del Sur",
						"parent": "PH-13"
					},
					"PH-TAR": {
						"category": "province",
						"code": "PH-TAR",
						"name": "Tarlac",
						"parent": "PH-03"
					},
					"PH-TAW": {
						"category": "province",
						"code": "PH-TAW",
						"name": "Tawi-Tawi",
						"parent": "PH-14"
					},
					"PH-WSA": {
						"category": "province",
						"code": "PH-WSA",
						"name": "Samar",
						"parent": "PH-08"
					},
					"PH-ZAN": {
						"category": "province",
						"code": "PH-ZAN",
						"name": "Zamboanga del Norte",
						"parent": "PH-09"
					},
					"PH-ZAS": {
						"category": "province",
						"code": "PH-ZAS",
						"name": "Zamboanga del Sur",
						"parent": "PH-09"
					},
					"PH-ZMB": {
						"category": "province",
						"code": "PH-ZMB",
						"name": "Zambales",
						"parent": "PH-03"
					},
					"PH-ZSI": {
						"category": "province",
						"code": "PH-ZSI",
						"name": "Zamboanga Sibugay",
						"parent": "PH-09"
					}
				}
			},
			"PLW": {
				"threeLetterCode": "PLW",
				"shortName": "Palau",
				"shortNameUpperCase": "PALAU",
				"fullName": "the Republic of Palau",
				"subdivisionLabel": "state",
				"subdivisions": {
					"PW-002": {
						"category": "state",
						"code": "PW-002",
						"name": "Aimeliik",
						"parent": ""
					},
					"PW-004": {
						"category": "state",
						"code": "PW-004",
						"name": "Airai",
						"parent": ""
					},
					"PW-010": {
						"category": "state",
						"code": "PW-010",
						"name": "Angaur",
						"parent": ""
					},
					"PW-050": {
						"category": "state",
						"code": "PW-050",
						"name": "Hatohobei",
						"parent": ""
					},
					"PW-100": {
						"category": "state",
						"code": "PW-100",
						"name": "Kayangel",
						"parent": ""
					},
					"PW-150": {
						"category": "state",
						"code": "PW-150",
						"name": "Koror",
						"parent": ""
					},
					"PW-212": {
						"category": "state",
						"code": "PW-212",
						"name": "Melekeok",
						"parent": ""
					},
					"PW-214": {
						"category": "state",
						"code": "PW-214",
						"name": "Ngaraard",
						"parent": ""
					},
					"PW-218": {
						"category": "state",
						"code": "PW-218",
						"name": "Ngarchelong",
						"parent": ""
					},
					"PW-222": {
						"category": "state",
						"code": "PW-222",
						"name": "Ngardmau",
						"parent": ""
					},
					"PW-224": {
						"category": "state",
						"code": "PW-224",
						"name": "Ngatpang",
						"parent": ""
					},
					"PW-226": {
						"category": "state",
						"code": "PW-226",
						"name": "Ngchesar",
						"parent": ""
					},
					"PW-227": {
						"category": "state",
						"code": "PW-227",
						"name": "Ngeremlengui",
						"parent": ""
					},
					"PW-228": {
						"category": "state",
						"code": "PW-228",
						"name": "Ngiwal",
						"parent": ""
					},
					"PW-350": {
						"category": "state",
						"code": "PW-350",
						"name": "Peleliu",
						"parent": ""
					},
					"PW-370": {
						"category": "state",
						"code": "PW-370",
						"name": "Sonsorol",
						"parent": ""
					}
				}
			},
			"PNG": {
				"threeLetterCode": "PNG",
				"shortName": "Papua New Guinea",
				"shortNameUpperCase": "PAPUA NEW GUINEA",
				"fullName": "the Independent State of Papua New Guinea",
				"subdivisionLabel": "province",
				"subdivisions": {
					"PG-CPK": {
						"category": "province",
						"code": "PG-CPK",
						"name": "Chimbu",
						"parent": ""
					},
					"PG-CPM": {
						"category": "province",
						"code": "PG-CPM",
						"name": "Central",
						"parent": ""
					},
					"PG-EBR": {
						"category": "province",
						"code": "PG-EBR",
						"name": "East New Britain",
						"parent": ""
					},
					"PG-EHG": {
						"category": "province",
						"code": "PG-EHG",
						"name": "Eastern Highlands",
						"parent": ""
					},
					"PG-EPW": {
						"category": "province",
						"code": "PG-EPW",
						"name": "Enga",
						"parent": ""
					},
					"PG-ESW": {
						"category": "province",
						"code": "PG-ESW",
						"name": "East Sepik",
						"parent": ""
					},
					"PG-GPK": {
						"category": "province",
						"code": "PG-GPK",
						"name": "Gulf",
						"parent": ""
					},
					"PG-HLA": {
						"category": "province",
						"code": "PG-HLA",
						"name": "Hela",
						"parent": ""
					},
					"PG-JWK": {
						"category": "province",
						"code": "PG-JWK",
						"name": "Jiwaka",
						"parent": ""
					},
					"PG-MBA": {
						"category": "province",
						"code": "PG-MBA",
						"name": "Milne Bay",
						"parent": ""
					},
					"PG-MPL": {
						"category": "province",
						"code": "PG-MPL",
						"name": "Morobe",
						"parent": ""
					},
					"PG-MPM": {
						"category": "province",
						"code": "PG-MPM",
						"name": "Madang",
						"parent": ""
					},
					"PG-MRL": {
						"category": "province",
						"code": "PG-MRL",
						"name": "Manus",
						"parent": ""
					},
					"PG-NCD": {
						"category": "district",
						"code": "PG-NCD",
						"name": "National Capital District (Port Moresby)",
						"parent": ""
					},
					"PG-NIK": {
						"category": "province",
						"code": "PG-NIK",
						"name": "New Ireland",
						"parent": ""
					},
					"PG-NPP": {
						"category": "province",
						"code": "PG-NPP",
						"name": "Northern",
						"parent": ""
					},
					"PG-NSB": {
						"category": "autonomous region",
						"code": "PG-NSB",
						"name": "Bougainville",
						"parent": ""
					},
					"PG-SAN": {
						"category": "province",
						"code": "PG-SAN",
						"name": "West Sepik",
						"parent": ""
					},
					"PG-SHM": {
						"category": "province",
						"code": "PG-SHM",
						"name": "Southern Highlands",
						"parent": ""
					},
					"PG-WBK": {
						"category": "province",
						"code": "PG-WBK",
						"name": "West New Britain",
						"parent": ""
					},
					"PG-WHM": {
						"category": "province",
						"code": "PG-WHM",
						"name": "Western Highlands",
						"parent": ""
					},
					"PG-WPD": {
						"category": "province",
						"code": "PG-WPD",
						"name": "Western",
						"parent": ""
					}
				}
			},
			"POL": {
				"threeLetterCode": "POL",
				"shortName": "Poland",
				"shortNameUpperCase": "POLAND",
				"fullName": "the Republic of Poland",
				"subdivisionLabel": "province",
				"subdivisions": {
					"PL-DS": {
						"category": "province",
						"code": "PL-DS",
						"name": "Dolnośląskie",
						"parent": ""
					},
					"PL-KP": {
						"category": "province",
						"code": "PL-KP",
						"name": "Kujawsko-pomorskie",
						"parent": ""
					},
					"PL-LB": {
						"category": "province",
						"code": "PL-LB",
						"name": "Lubuskie",
						"parent": ""
					},
					"PL-LD": {
						"category": "province",
						"code": "PL-LD",
						"name": "Łódzkie",
						"parent": ""
					},
					"PL-LU": {
						"category": "province",
						"code": "PL-LU",
						"name": "Lubelskie",
						"parent": ""
					},
					"PL-MA": {
						"category": "province",
						"code": "PL-MA",
						"name": "Małopolskie",
						"parent": ""
					},
					"PL-MZ": {
						"category": "province",
						"code": "PL-MZ",
						"name": "Mazowieckie",
						"parent": ""
					},
					"PL-OP": {
						"category": "province",
						"code": "PL-OP",
						"name": "Opolskie",
						"parent": ""
					},
					"PL-PD": {
						"category": "province",
						"code": "PL-PD",
						"name": "Podlaskie",
						"parent": ""
					},
					"PL-PK": {
						"category": "province",
						"code": "PL-PK",
						"name": "Podkarpackie",
						"parent": ""
					},
					"PL-PM": {
						"category": "province",
						"code": "PL-PM",
						"name": "Pomorskie",
						"parent": ""
					},
					"PL-SK": {
						"category": "province",
						"code": "PL-SK",
						"name": "Świętokrzyskie",
						"parent": ""
					},
					"PL-SL": {
						"category": "province",
						"code": "PL-SL",
						"name": "Śląskie",
						"parent": ""
					},
					"PL-WN": {
						"category": "province",
						"code": "PL-WN",
						"name": "Warmińsko-mazurskie",
						"parent": ""
					},
					"PL-WP": {
						"category": "province",
						"code": "PL-WP",
						"name": "Wielkopolskie",
						"parent": ""
					},
					"PL-ZP": {
						"category": "province",
						"code": "PL-ZP",
						"name": "Zachodniopomorskie",
						"parent": ""
					}
				}
			},
			"PRI": {
				"threeLetterCode": "PRI",
				"shortName": "Puerto Rico",
				"shortNameUpperCase": "PUERTO RICO",
				"fullName": "Puerto Rico",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"PRK": {
				"commonName": "North Korea",
				"threeLetterCode": "PRK",
				"shortName": "Korea (the Democratic People's Republic of)",
				"shortNameUpperCase": "KOREA (DEMOCRATIC PEOPLE'S REPUBLIC OF)",
				"fullName": "the Democratic People's Republic of Korea",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"KP-01": {
						"category": "capital city",
						"code": "KP-01",
						"name": "P'yǒngyang",
						"parent": ""
					},
					"KP-02": {
						"category": "province",
						"code": "KP-02",
						"name": "P'yǒngan-namdo",
						"parent": ""
					},
					"KP-03": {
						"category": "province",
						"code": "KP-03",
						"name": "P'yǒngan-bukto",
						"parent": ""
					},
					"KP-04": {
						"category": "province",
						"code": "KP-04",
						"name": "Chagang-do",
						"parent": ""
					},
					"KP-05": {
						"category": "province",
						"code": "KP-05",
						"name": "Hwanghae-namdo",
						"parent": ""
					},
					"KP-06": {
						"category": "province",
						"code": "KP-06",
						"name": "Hwanghae-bukto",
						"parent": ""
					},
					"KP-07": {
						"category": "province",
						"code": "KP-07",
						"name": "Kangweonto",
						"parent": ""
					},
					"KP-08": {
						"category": "province",
						"code": "KP-08",
						"name": "Hamgyǒng-namdo",
						"parent": ""
					},
					"KP-09": {
						"category": "province",
						"code": "KP-09",
						"name": "Hamgyǒng-bukto",
						"parent": ""
					},
					"KP-10": {
						"category": "province",
						"code": "KP-10",
						"name": "Ryanggang-do",
						"parent": ""
					},
					"KP-13": {
						"category": "special city",
						"code": "KP-13",
						"name": "Raseon",
						"parent": ""
					},
					"KP-14": {
						"category": "metropolitan city",
						"code": "KP-14",
						"name": "Nampho",
						"parent": ""
					}
				}
			},
			"PRT": {
				"threeLetterCode": "PRT",
				"shortName": "Portugal",
				"shortNameUpperCase": "PORTUGAL",
				"fullName": "the Portuguese Republic",
				"subdivisionLabel": "district",
				"subdivisions": {
					"PT-01": {
						"category": "district",
						"code": "PT-01",
						"name": "Aveiro",
						"parent": ""
					},
					"PT-02": {
						"category": "district",
						"code": "PT-02",
						"name": "Beja",
						"parent": ""
					},
					"PT-03": {
						"category": "district",
						"code": "PT-03",
						"name": "Braga",
						"parent": ""
					},
					"PT-04": {
						"category": "district",
						"code": "PT-04",
						"name": "Bragança",
						"parent": ""
					},
					"PT-05": {
						"category": "district",
						"code": "PT-05",
						"name": "Castelo Branco",
						"parent": ""
					},
					"PT-06": {
						"category": "district",
						"code": "PT-06",
						"name": "Coimbra",
						"parent": ""
					},
					"PT-07": {
						"category": "district",
						"code": "PT-07",
						"name": "Évora",
						"parent": ""
					},
					"PT-08": {
						"category": "district",
						"code": "PT-08",
						"name": "Faro",
						"parent": ""
					},
					"PT-09": {
						"category": "district",
						"code": "PT-09",
						"name": "Guarda",
						"parent": ""
					},
					"PT-10": {
						"category": "district",
						"code": "PT-10",
						"name": "Leiria",
						"parent": ""
					},
					"PT-11": {
						"category": "district",
						"code": "PT-11",
						"name": "Lisboa",
						"parent": ""
					},
					"PT-12": {
						"category": "district",
						"code": "PT-12",
						"name": "Portalegre",
						"parent": ""
					},
					"PT-13": {
						"category": "district",
						"code": "PT-13",
						"name": "Porto",
						"parent": ""
					},
					"PT-14": {
						"category": "district",
						"code": "PT-14",
						"name": "Santarém",
						"parent": ""
					},
					"PT-15": {
						"category": "district",
						"code": "PT-15",
						"name": "Setúbal",
						"parent": ""
					},
					"PT-16": {
						"category": "district",
						"code": "PT-16",
						"name": "Viana do Castelo",
						"parent": ""
					},
					"PT-17": {
						"category": "district",
						"code": "PT-17",
						"name": "Vila Real",
						"parent": ""
					},
					"PT-18": {
						"category": "district",
						"code": "PT-18",
						"name": "Viseu",
						"parent": ""
					},
					"PT-20": {
						"category": "autonomous region",
						"code": "PT-20",
						"name": "Região Autónoma dos Açores",
						"parent": ""
					},
					"PT-30": {
						"category": "autonomous region",
						"code": "PT-30",
						"name": "Região Autónoma da Madeira",
						"parent": ""
					}
				}
			},
			"PRY": {
				"threeLetterCode": "PRY",
				"shortName": "Paraguay",
				"shortNameUpperCase": "PARAGUAY",
				"fullName": "the Republic of Paraguay",
				"subdivisionLabel": "department",
				"subdivisions": {
					"PY-1": {
						"category": "department",
						"code": "PY-1",
						"name": "Concepción",
						"parent": ""
					},
					"PY-10": {
						"category": "department",
						"code": "PY-10",
						"name": "Alto Paraná",
						"parent": ""
					},
					"PY-11": {
						"category": "department",
						"code": "PY-11",
						"name": "Central",
						"parent": ""
					},
					"PY-12": {
						"category": "department",
						"code": "PY-12",
						"name": "Ñeembucú",
						"parent": ""
					},
					"PY-13": {
						"category": "department",
						"code": "PY-13",
						"name": "Amambay",
						"parent": ""
					},
					"PY-14": {
						"category": "department",
						"code": "PY-14",
						"name": "Canindeyú",
						"parent": ""
					},
					"PY-15": {
						"category": "department",
						"code": "PY-15",
						"name": "Presidente Hayes",
						"parent": ""
					},
					"PY-16": {
						"category": "department",
						"code": "PY-16",
						"name": "Alto Paraguay",
						"parent": ""
					},
					"PY-19": {
						"category": "department",
						"code": "PY-19",
						"name": "Boquerón",
						"parent": ""
					},
					"PY-2": {
						"category": "department",
						"code": "PY-2",
						"name": "San Pedro",
						"parent": ""
					},
					"PY-3": {
						"category": "department",
						"code": "PY-3",
						"name": "Cordillera",
						"parent": ""
					},
					"PY-4": {
						"category": "department",
						"code": "PY-4",
						"name": "Guairá",
						"parent": ""
					},
					"PY-5": {
						"category": "department",
						"code": "PY-5",
						"name": "Caaguazú",
						"parent": ""
					},
					"PY-6": {
						"category": "department",
						"code": "PY-6",
						"name": "Caazapá",
						"parent": ""
					},
					"PY-7": {
						"category": "department",
						"code": "PY-7",
						"name": "Itapúa",
						"parent": ""
					},
					"PY-8": {
						"category": "department",
						"code": "PY-8",
						"name": "Misiones",
						"parent": ""
					},
					"PY-9": {
						"category": "department",
						"code": "PY-9",
						"name": "Paraguarí",
						"parent": ""
					},
					"PY-ASU": {
						"category": "capital",
						"code": "PY-ASU",
						"name": "Asunción",
						"parent": ""
					}
				}
			},
			"PSE": {
				"commonName": "Palestinian Territories",
				"threeLetterCode": "PSE",
				"shortName": "Palestine, State of",
				"shortNameUpperCase": "PALESTINE, STATE OF",
				"fullName": "the State of Palestine",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"PS-BTH": {
						"category": "governorate",
						"code": "PS-BTH",
						"name": "Bethlehem",
						"parent": ""
					},
					"PS-DEB": {
						"category": "governorate",
						"code": "PS-DEB",
						"name": "Deir El Balah",
						"parent": ""
					},
					"PS-GZA": {
						"category": "governorate",
						"code": "PS-GZA",
						"name": "Gaza",
						"parent": ""
					},
					"PS-HBN": {
						"category": "governorate",
						"code": "PS-HBN",
						"name": "Hebron",
						"parent": ""
					},
					"PS-JEM": {
						"category": "governorate",
						"code": "PS-JEM",
						"name": "Jerusalem",
						"parent": ""
					},
					"PS-JEN": {
						"category": "governorate",
						"code": "PS-JEN",
						"name": "Jenin",
						"parent": ""
					},
					"PS-JRH": {
						"category": "governorate",
						"code": "PS-JRH",
						"name": "Jericho and Al Aghwar",
						"parent": ""
					},
					"PS-KYS": {
						"category": "governorate",
						"code": "PS-KYS",
						"name": "Khan Yunis",
						"parent": ""
					},
					"PS-NBS": {
						"category": "governorate",
						"code": "PS-NBS",
						"name": "Nablus",
						"parent": ""
					},
					"PS-NGZ": {
						"category": "governorate",
						"code": "PS-NGZ",
						"name": "North Gaza",
						"parent": ""
					},
					"PS-QQA": {
						"category": "governorate",
						"code": "PS-QQA",
						"name": "Qalqilya",
						"parent": ""
					},
					"PS-RBH": {
						"category": "governorate",
						"code": "PS-RBH",
						"name": "Ramallah",
						"parent": ""
					},
					"PS-RFH": {
						"category": "governorate",
						"code": "PS-RFH",
						"name": "Rafah",
						"parent": ""
					},
					"PS-SLT": {
						"category": "governorate",
						"code": "PS-SLT",
						"name": "Salfit",
						"parent": ""
					},
					"PS-TBS": {
						"category": "governorate",
						"code": "PS-TBS",
						"name": "Tubas",
						"parent": ""
					},
					"PS-TKM": {
						"category": "governorate",
						"code": "PS-TKM",
						"name": "Tulkarm",
						"parent": ""
					}
				}
			},
			"PYF": {
				"threeLetterCode": "PYF",
				"shortName": "French Polynesia",
				"shortNameUpperCase": "FRENCH POLYNESIA",
				"fullName": "French Polynesia",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"QAT": {
				"threeLetterCode": "QAT",
				"shortName": "Qatar",
				"shortNameUpperCase": "QATAR",
				"fullName": "the State of Qatar",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"QA-DA": {
						"category": "municipality",
						"code": "QA-DA",
						"name": "Ad Dawḩah",
						"parent": ""
					},
					"QA-KH": {
						"category": "municipality",
						"code": "QA-KH",
						"name": "Al Khawr wa adh Dhakhīrah",
						"parent": ""
					},
					"QA-MS": {
						"category": "municipality",
						"code": "QA-MS",
						"name": "Ash Shamāl",
						"parent": ""
					},
					"QA-RA": {
						"category": "municipality",
						"code": "QA-RA",
						"name": "Ar Rayyān",
						"parent": ""
					},
					"QA-SH": {
						"category": "municipality",
						"code": "QA-SH",
						"name": "Ash Shīḩānīyah",
						"parent": ""
					},
					"QA-US": {
						"category": "municipality",
						"code": "QA-US",
						"name": "Umm Şalāl",
						"parent": ""
					},
					"QA-WA": {
						"category": "municipality",
						"code": "QA-WA",
						"name": "Al Wakrah",
						"parent": ""
					},
					"QA-ZA": {
						"category": "municipality",
						"code": "QA-ZA",
						"name": "Az̧ Z̧a‘āyin",
						"parent": ""
					}
				}
			},
			"REU": {
				"threeLetterCode": "REU",
				"shortName": "Réunion",
				"shortNameUpperCase": "RÉUNION",
				"fullName": "Réunion",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"ROU": {
				"threeLetterCode": "ROU",
				"shortName": "Romania",
				"shortNameUpperCase": "ROMANIA",
				"fullName": "Romania",
				"subdivisionLabel": "department",
				"subdivisions": {
					"RO-AB": {
						"category": "department",
						"code": "RO-AB",
						"name": "Alba",
						"parent": ""
					},
					"RO-AG": {
						"category": "department",
						"code": "RO-AG",
						"name": "Argeș",
						"parent": ""
					},
					"RO-AR": {
						"category": "department",
						"code": "RO-AR",
						"name": "Arad",
						"parent": ""
					},
					"RO-B": {
						"category": "municipality",
						"code": "RO-B",
						"name": "București",
						"parent": ""
					},
					"RO-BC": {
						"category": "department",
						"code": "RO-BC",
						"name": "Bacău",
						"parent": ""
					},
					"RO-BH": {
						"category": "department",
						"code": "RO-BH",
						"name": "Bihor",
						"parent": ""
					},
					"RO-BN": {
						"category": "department",
						"code": "RO-BN",
						"name": "Bistrița-Năsăud",
						"parent": ""
					},
					"RO-BR": {
						"category": "department",
						"code": "RO-BR",
						"name": "Brăila",
						"parent": ""
					},
					"RO-BT": {
						"category": "department",
						"code": "RO-BT",
						"name": "Botoșani",
						"parent": ""
					},
					"RO-BV": {
						"category": "department",
						"code": "RO-BV",
						"name": "Brașov",
						"parent": ""
					},
					"RO-BZ": {
						"category": "department",
						"code": "RO-BZ",
						"name": "Buzău",
						"parent": ""
					},
					"RO-CJ": {
						"category": "department",
						"code": "RO-CJ",
						"name": "Cluj",
						"parent": ""
					},
					"RO-CL": {
						"category": "department",
						"code": "RO-CL",
						"name": "Călărași",
						"parent": ""
					},
					"RO-CS": {
						"category": "department",
						"code": "RO-CS",
						"name": "Caraș-Severin",
						"parent": ""
					},
					"RO-CT": {
						"category": "department",
						"code": "RO-CT",
						"name": "Constanța",
						"parent": ""
					},
					"RO-CV": {
						"category": "department",
						"code": "RO-CV",
						"name": "Covasna",
						"parent": ""
					},
					"RO-DB": {
						"category": "department",
						"code": "RO-DB",
						"name": "Dâmbovița",
						"parent": ""
					},
					"RO-DJ": {
						"category": "department",
						"code": "RO-DJ",
						"name": "Dolj",
						"parent": ""
					},
					"RO-GJ": {
						"category": "department",
						"code": "RO-GJ",
						"name": "Gorj",
						"parent": ""
					},
					"RO-GL": {
						"category": "department",
						"code": "RO-GL",
						"name": "Galați",
						"parent": ""
					},
					"RO-GR": {
						"category": "department",
						"code": "RO-GR",
						"name": "Giurgiu",
						"parent": ""
					},
					"RO-HD": {
						"category": "department",
						"code": "RO-HD",
						"name": "Hunedoara",
						"parent": ""
					},
					"RO-HR": {
						"category": "department",
						"code": "RO-HR",
						"name": "Harghita",
						"parent": ""
					},
					"RO-IF": {
						"category": "department",
						"code": "RO-IF",
						"name": "Ilfov",
						"parent": ""
					},
					"RO-IL": {
						"category": "department",
						"code": "RO-IL",
						"name": "Ialomița",
						"parent": ""
					},
					"RO-IS": {
						"category": "department",
						"code": "RO-IS",
						"name": "Iași",
						"parent": ""
					},
					"RO-MH": {
						"category": "department",
						"code": "RO-MH",
						"name": "Mehedinți",
						"parent": ""
					},
					"RO-MM": {
						"category": "department",
						"code": "RO-MM",
						"name": "Maramureș",
						"parent": ""
					},
					"RO-MS": {
						"category": "department",
						"code": "RO-MS",
						"name": "Mureș",
						"parent": ""
					},
					"RO-NT": {
						"category": "department",
						"code": "RO-NT",
						"name": "Neamț",
						"parent": ""
					},
					"RO-OT": {
						"category": "department",
						"code": "RO-OT",
						"name": "Olt",
						"parent": ""
					},
					"RO-PH": {
						"category": "department",
						"code": "RO-PH",
						"name": "Prahova",
						"parent": ""
					},
					"RO-SB": {
						"category": "department",
						"code": "RO-SB",
						"name": "Sibiu",
						"parent": ""
					},
					"RO-SJ": {
						"category": "department",
						"code": "RO-SJ",
						"name": "Sălaj",
						"parent": ""
					},
					"RO-SM": {
						"category": "department",
						"code": "RO-SM",
						"name": "Satu Mare",
						"parent": ""
					},
					"RO-SV": {
						"category": "department",
						"code": "RO-SV",
						"name": "Suceava",
						"parent": ""
					},
					"RO-TL": {
						"category": "department",
						"code": "RO-TL",
						"name": "Tulcea",
						"parent": ""
					},
					"RO-TM": {
						"category": "department",
						"code": "RO-TM",
						"name": "Timiș",
						"parent": ""
					},
					"RO-TR": {
						"category": "department",
						"code": "RO-TR",
						"name": "Teleorman",
						"parent": ""
					},
					"RO-VL": {
						"category": "department",
						"code": "RO-VL",
						"name": "Vâlcea",
						"parent": ""
					},
					"RO-VN": {
						"category": "department",
						"code": "RO-VN",
						"name": "Vrancea",
						"parent": ""
					},
					"RO-VS": {
						"category": "department",
						"code": "RO-VS",
						"name": "Vaslui",
						"parent": ""
					}
				}
			},
			"RUS": {
				"commonName": "Russia",
				"threeLetterCode": "RUS",
				"shortName": "Russian Federation (the)",
				"shortNameUpperCase": "RUSSIAN FEDERATION",
				"fullName": "the Russian Federation",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"RU-AD": {
						"category": "republic",
						"code": "RU-AD",
						"name": "Adygeja, Respublika",
						"parent": ""
					},
					"RU-AL": {
						"category": "republic",
						"code": "RU-AL",
						"name": "Altaj, Respublika",
						"parent": ""
					},
					"RU-ALT": {
						"category": "administrative territory",
						"code": "RU-ALT",
						"name": "Altajskij kraj",
						"parent": ""
					},
					"RU-AMU": {
						"category": "administrative region",
						"code": "RU-AMU",
						"name": "Amurskaja oblast'",
						"parent": ""
					},
					"RU-ARK": {
						"category": "administrative region",
						"code": "RU-ARK",
						"name": "Arhangel'skaja oblast'",
						"parent": ""
					},
					"RU-AST": {
						"category": "administrative region",
						"code": "RU-AST",
						"name": "Astrahanskaja oblast'",
						"parent": ""
					},
					"RU-BA": {
						"category": "republic",
						"code": "RU-BA",
						"name": "Bashkortostan, Respublika",
						"parent": ""
					},
					"RU-BEL": {
						"category": "administrative region",
						"code": "RU-BEL",
						"name": "Belgorodskaja oblast'",
						"parent": ""
					},
					"RU-BRY": {
						"category": "administrative region",
						"code": "RU-BRY",
						"name": "Brjanskaja oblast'",
						"parent": ""
					},
					"RU-BU": {
						"category": "republic",
						"code": "RU-BU",
						"name": "Burjatija, Respublika",
						"parent": ""
					},
					"RU-CE": {
						"category": "republic",
						"code": "RU-CE",
						"name": "Chechenskaya Respublika",
						"parent": ""
					},
					"RU-CHE": {
						"category": "administrative region",
						"code": "RU-CHE",
						"name": "Chelyabinskaya oblast'",
						"parent": ""
					},
					"RU-CHU": {
						"category": "autonomous district",
						"code": "RU-CHU",
						"name": "Chukotskiy avtonomnyy okrug",
						"parent": ""
					},
					"RU-CU": {
						"category": "republic",
						"code": "RU-CU",
						"name": "Chuvashskaya Respublika",
						"parent": ""
					},
					"RU-DA": {
						"category": "republic",
						"code": "RU-DA",
						"name": "Dagestan, Respublika",
						"parent": ""
					},
					"RU-IN": {
						"category": "republic",
						"code": "RU-IN",
						"name": "Ingushetiya, Respublika",
						"parent": ""
					},
					"RU-IRK": {
						"category": "administrative region",
						"code": "RU-IRK",
						"name": "Irkutskaja oblast'",
						"parent": ""
					},
					"RU-IVA": {
						"category": "administrative region",
						"code": "RU-IVA",
						"name": "Ivanovskaja oblast'",
						"parent": ""
					},
					"RU-KAM": {
						"category": "administrative territory",
						"code": "RU-KAM",
						"name": "Kamchatskiy kray",
						"parent": ""
					},
					"RU-KB": {
						"category": "republic",
						"code": "RU-KB",
						"name": "Kabardino-Balkarskaja Respublika",
						"parent": ""
					},
					"RU-KC": {
						"category": "republic",
						"code": "RU-KC",
						"name": "Karachayevo-Cherkesskaya Respublika",
						"parent": ""
					},
					"RU-KDA": {
						"category": "administrative territory",
						"code": "RU-KDA",
						"name": "Krasnodarskij kraj",
						"parent": ""
					},
					"RU-KEM": {
						"category": "administrative region",
						"code": "RU-KEM",
						"name": "Kemerovskaja oblast'",
						"parent": ""
					},
					"RU-KGD": {
						"category": "administrative region",
						"code": "RU-KGD",
						"name": "Kaliningradskaja oblast'",
						"parent": ""
					},
					"RU-KGN": {
						"category": "administrative region",
						"code": "RU-KGN",
						"name": "Kurganskaja oblast'",
						"parent": ""
					},
					"RU-KHA": {
						"category": "administrative territory",
						"code": "RU-KHA",
						"name": "Habarovskij kraj",
						"parent": ""
					},
					"RU-KHM": {
						"category": "autonomous district",
						"code": "RU-KHM",
						"name": "Hanty-Mansijskij avtonomnyj okrug",
						"parent": ""
					},
					"RU-KIR": {
						"category": "administrative region",
						"code": "RU-KIR",
						"name": "Kirovskaja oblast'",
						"parent": ""
					},
					"RU-KK": {
						"category": "republic",
						"code": "RU-KK",
						"name": "Hakasija, Respublika",
						"parent": ""
					},
					"RU-KL": {
						"category": "republic",
						"code": "RU-KL",
						"name": "Kalmykija, Respublika",
						"parent": ""
					},
					"RU-KLU": {
						"category": "administrative region",
						"code": "RU-KLU",
						"name": "Kaluzhskaya oblast'",
						"parent": ""
					},
					"RU-KO": {
						"category": "republic",
						"code": "RU-KO",
						"name": "Komi, Respublika",
						"parent": ""
					},
					"RU-KOS": {
						"category": "administrative region",
						"code": "RU-KOS",
						"name": "Kostromskaja oblast'",
						"parent": ""
					},
					"RU-KR": {
						"category": "republic",
						"code": "RU-KR",
						"name": "Karelija, Respublika",
						"parent": ""
					},
					"RU-KRS": {
						"category": "administrative region",
						"code": "RU-KRS",
						"name": "Kurskaja oblast'",
						"parent": ""
					},
					"RU-KYA": {
						"category": "administrative territory",
						"code": "RU-KYA",
						"name": "Krasnojarskij kraj",
						"parent": ""
					},
					"RU-LEN": {
						"category": "administrative region",
						"code": "RU-LEN",
						"name": "Leningradskaja oblast'",
						"parent": ""
					},
					"RU-LIP": {
						"category": "administrative region",
						"code": "RU-LIP",
						"name": "Lipeckaja oblast'",
						"parent": ""
					},
					"RU-MAG": {
						"category": "administrative region",
						"code": "RU-MAG",
						"name": "Magadanskaja oblast'",
						"parent": ""
					},
					"RU-ME": {
						"category": "republic",
						"code": "RU-ME",
						"name": "Marij Èl, Respublika",
						"parent": ""
					},
					"RU-MO": {
						"category": "republic",
						"code": "RU-MO",
						"name": "Mordovija, Respublika",
						"parent": ""
					},
					"RU-MOS": {
						"category": "administrative region",
						"code": "RU-MOS",
						"name": "Moskovskaja oblast'",
						"parent": ""
					},
					"RU-MOW": {
						"category": "autonomous city",
						"code": "RU-MOW",
						"name": "Moskva",
						"parent": ""
					},
					"RU-MUR": {
						"category": "administrative region",
						"code": "RU-MUR",
						"name": "Murmanskaja oblast'",
						"parent": ""
					},
					"RU-NEN": {
						"category": "autonomous district",
						"code": "RU-NEN",
						"name": "Neneckij avtonomnyj okrug",
						"parent": ""
					},
					"RU-NGR": {
						"category": "administrative region",
						"code": "RU-NGR",
						"name": "Novgorodskaja oblast'",
						"parent": ""
					},
					"RU-NIZ": {
						"category": "administrative region",
						"code": "RU-NIZ",
						"name": "Nizhegorodskaya oblast'",
						"parent": ""
					},
					"RU-NVS": {
						"category": "administrative region",
						"code": "RU-NVS",
						"name": "Novosibirskaja oblast'",
						"parent": ""
					},
					"RU-OMS": {
						"category": "administrative region",
						"code": "RU-OMS",
						"name": "Omskaja oblast'",
						"parent": ""
					},
					"RU-ORE": {
						"category": "administrative region",
						"code": "RU-ORE",
						"name": "Orenburgskaja oblast'",
						"parent": ""
					},
					"RU-ORL": {
						"category": "administrative region",
						"code": "RU-ORL",
						"name": "Orlovskaja oblast'",
						"parent": ""
					},
					"RU-PER": {
						"category": "administrative territory",
						"code": "RU-PER",
						"name": "Permskij kraj",
						"parent": ""
					},
					"RU-PNZ": {
						"category": "administrative region",
						"code": "RU-PNZ",
						"name": "Penzenskaja oblast'",
						"parent": ""
					},
					"RU-PRI": {
						"category": "administrative territory",
						"code": "RU-PRI",
						"name": "Primorskiy kray",
						"parent": ""
					},
					"RU-PSK": {
						"category": "administrative region",
						"code": "RU-PSK",
						"name": "Pskovskaya oblast'",
						"parent": ""
					},
					"RU-ROS": {
						"category": "administrative region",
						"code": "RU-ROS",
						"name": "Rostovskaya oblast'",
						"parent": ""
					},
					"RU-RYA": {
						"category": "administrative region",
						"code": "RU-RYA",
						"name": "Rjazanskaja oblast'",
						"parent": ""
					},
					"RU-SA": {
						"category": "republic",
						"code": "RU-SA",
						"name": "Saha, Respublika",
						"parent": ""
					},
					"RU-SAK": {
						"category": "administrative region",
						"code": "RU-SAK",
						"name": "Sahalinskaja oblast'",
						"parent": ""
					},
					"RU-SAM": {
						"category": "administrative region",
						"code": "RU-SAM",
						"name": "Samarskaja oblast'",
						"parent": ""
					},
					"RU-SAR": {
						"category": "administrative region",
						"code": "RU-SAR",
						"name": "Saratovskaja oblast'",
						"parent": ""
					},
					"RU-SE": {
						"category": "republic",
						"code": "RU-SE",
						"name": "Severnaja Osetija, Respublika",
						"parent": ""
					},
					"RU-SMO": {
						"category": "administrative region",
						"code": "RU-SMO",
						"name": "Smolenskaja oblast'",
						"parent": ""
					},
					"RU-SPE": {
						"category": "autonomous city",
						"code": "RU-SPE",
						"name": "Sankt-Peterburg",
						"parent": ""
					},
					"RU-STA": {
						"category": "administrative territory",
						"code": "RU-STA",
						"name": "Stavropol'skij kraj",
						"parent": ""
					},
					"RU-SVE": {
						"category": "administrative region",
						"code": "RU-SVE",
						"name": "Sverdlovskaja oblast'",
						"parent": ""
					},
					"RU-TA": {
						"category": "republic",
						"code": "RU-TA",
						"name": "Tatarstan, Respublika",
						"parent": ""
					},
					"RU-TAM": {
						"category": "administrative region",
						"code": "RU-TAM",
						"name": "Tambovskaja oblast'",
						"parent": ""
					},
					"RU-TOM": {
						"category": "administrative region",
						"code": "RU-TOM",
						"name": "Tomskaja oblast'",
						"parent": ""
					},
					"RU-TUL": {
						"category": "administrative region",
						"code": "RU-TUL",
						"name": "Tul'skaja oblast'",
						"parent": ""
					},
					"RU-TVE": {
						"category": "administrative region",
						"code": "RU-TVE",
						"name": "Tverskaja oblast'",
						"parent": ""
					},
					"RU-TY": {
						"category": "republic",
						"code": "RU-TY",
						"name": "Tyva, Respublika",
						"parent": ""
					},
					"RU-TYU": {
						"category": "administrative region",
						"code": "RU-TYU",
						"name": "Tjumenskaja oblast'",
						"parent": ""
					},
					"RU-UD": {
						"category": "republic",
						"code": "RU-UD",
						"name": "Udmurtskaja Respublika",
						"parent": ""
					},
					"RU-ULY": {
						"category": "administrative region",
						"code": "RU-ULY",
						"name": "Ul'janovskaja oblast'",
						"parent": ""
					},
					"RU-VGG": {
						"category": "administrative region",
						"code": "RU-VGG",
						"name": "Volgogradskaja oblast'",
						"parent": ""
					},
					"RU-VLA": {
						"category": "administrative region",
						"code": "RU-VLA",
						"name": "Vladimirskaja oblast'",
						"parent": ""
					},
					"RU-VLG": {
						"category": "administrative region",
						"code": "RU-VLG",
						"name": "Vologodskaja oblast'",
						"parent": ""
					},
					"RU-VOR": {
						"category": "administrative region",
						"code": "RU-VOR",
						"name": "Voronezhskaya oblast'",
						"parent": ""
					},
					"RU-YAN": {
						"category": "autonomous district",
						"code": "RU-YAN",
						"name": "Jamalo-Neneckij avtonomnyj okrug",
						"parent": ""
					},
					"RU-YAR": {
						"category": "administrative region",
						"code": "RU-YAR",
						"name": "Jaroslavskaja oblast'",
						"parent": ""
					},
					"RU-YEV": {
						"category": "autonomous region",
						"code": "RU-YEV",
						"name": "Evrejskaja avtonomnaja oblast'",
						"parent": ""
					},
					"RU-ZAB": {
						"category": "administrative territory",
						"code": "RU-ZAB",
						"name": "Zabajkal'skij kraj",
						"parent": ""
					}
				}
			},
			"RWA": {
				"threeLetterCode": "RWA",
				"shortName": "Rwanda",
				"shortNameUpperCase": "RWANDA",
				"fullName": "the Republic of Rwanda",
				"subdivisionLabel": "province",
				"subdivisions": {
					"RW-01": {
						"category": "city",
						"code": "RW-01",
						"name": "City of Kigali",
						"parent": ""
					},
					"RW-02": {
						"category": "province",
						"code": "RW-02",
						"name": "Eastern",
						"parent": ""
					},
					"RW-03": {
						"category": "province",
						"code": "RW-03",
						"name": "Northern",
						"parent": ""
					},
					"RW-04": {
						"category": "province",
						"code": "RW-04",
						"name": "Western",
						"parent": ""
					},
					"RW-05": {
						"category": "province",
						"code": "RW-05",
						"name": "Southern",
						"parent": ""
					}
				}
			},
			"SAU": {
				"threeLetterCode": "SAU",
				"shortName": "Saudi Arabia",
				"shortNameUpperCase": "SAUDI ARABIA",
				"fullName": "the Kingdom of Saudi Arabia",
				"subdivisionLabel": "province",
				"subdivisions": {
					"SA-01": {
						"category": "province",
						"code": "SA-01",
						"name": "Ar Riyāḑ",
						"parent": ""
					},
					"SA-02": {
						"category": "province",
						"code": "SA-02",
						"name": "Makkah al Mukarramah",
						"parent": ""
					},
					"SA-03": {
						"category": "province",
						"code": "SA-03",
						"name": "Al Madīnah al Munawwarah",
						"parent": ""
					},
					"SA-04": {
						"category": "province",
						"code": "SA-04",
						"name": "Ash Sharqīyah",
						"parent": ""
					},
					"SA-05": {
						"category": "province",
						"code": "SA-05",
						"name": "Al Qaşīm",
						"parent": ""
					},
					"SA-06": {
						"category": "province",
						"code": "SA-06",
						"name": "Ḩā'il",
						"parent": ""
					},
					"SA-07": {
						"category": "province",
						"code": "SA-07",
						"name": "Tabūk",
						"parent": ""
					},
					"SA-08": {
						"category": "province",
						"code": "SA-08",
						"name": "Al Ḩudūd ash Shamālīyah",
						"parent": ""
					},
					"SA-09": {
						"category": "province",
						"code": "SA-09",
						"name": "Jāzān",
						"parent": ""
					},
					"SA-10": {
						"category": "province",
						"code": "SA-10",
						"name": "Najrān",
						"parent": ""
					},
					"SA-11": {
						"category": "province",
						"code": "SA-11",
						"name": "Al Bāḩah",
						"parent": ""
					},
					"SA-12": {
						"category": "province",
						"code": "SA-12",
						"name": "Al Jawf",
						"parent": ""
					},
					"SA-14": {
						"category": "province",
						"code": "SA-14",
						"name": "'Asīr",
						"parent": ""
					}
				}
			},
			"SDN": {
				"commonName": "Sudan",
				"threeLetterCode": "SDN",
				"shortName": "Sudan (the)",
				"shortNameUpperCase": "SUDAN",
				"fullName": "the Republic of the Sudan",
				"subdivisionLabel": "state",
				"subdivisions": {
					"SD-DC": {
						"category": "state",
						"code": "SD-DC",
						"name": "Central Darfur",
						"parent": ""
					},
					"SD-DE": {
						"category": "state",
						"code": "SD-DE",
						"name": "East Darfur",
						"parent": ""
					},
					"SD-DN": {
						"category": "state",
						"code": "SD-DN",
						"name": "North Darfur",
						"parent": ""
					},
					"SD-DS": {
						"category": "state",
						"code": "SD-DS",
						"name": "South Darfur",
						"parent": ""
					},
					"SD-DW": {
						"category": "state",
						"code": "SD-DW",
						"name": "West Darfur",
						"parent": ""
					},
					"SD-GD": {
						"category": "state",
						"code": "SD-GD",
						"name": "Gedaref",
						"parent": ""
					},
					"SD-GK": {
						"category": "state",
						"code": "SD-GK",
						"name": "West Kordofan",
						"parent": ""
					},
					"SD-GZ": {
						"category": "state",
						"code": "SD-GZ",
						"name": "Gezira",
						"parent": ""
					},
					"SD-KA": {
						"category": "state",
						"code": "SD-KA",
						"name": "Kassala",
						"parent": ""
					},
					"SD-KH": {
						"category": "state",
						"code": "SD-KH",
						"name": "Khartoum",
						"parent": ""
					},
					"SD-KN": {
						"category": "state",
						"code": "SD-KN",
						"name": "North Kordofan",
						"parent": ""
					},
					"SD-KS": {
						"category": "state",
						"code": "SD-KS",
						"name": "South Kordofan",
						"parent": ""
					},
					"SD-NB": {
						"category": "state",
						"code": "SD-NB",
						"name": "Blue Nile",
						"parent": ""
					},
					"SD-NO": {
						"category": "state",
						"code": "SD-NO",
						"name": "Northern",
						"parent": ""
					},
					"SD-NR": {
						"category": "state",
						"code": "SD-NR",
						"name": "River Nile",
						"parent": ""
					},
					"SD-NW": {
						"category": "state",
						"code": "SD-NW",
						"name": "White Nile",
						"parent": ""
					},
					"SD-RS": {
						"category": "state",
						"code": "SD-RS",
						"name": "Red Sea",
						"parent": ""
					},
					"SD-SI": {
						"category": "state",
						"code": "SD-SI",
						"name": "Sennar",
						"parent": ""
					}
				}
			},
			"SEN": {
				"threeLetterCode": "SEN",
				"shortName": "Senegal",
				"shortNameUpperCase": "SENEGAL",
				"fullName": "the Republic of Senegal",
				"subdivisionLabel": "region",
				"subdivisions": {
					"SN-DB": {
						"category": "region",
						"code": "SN-DB",
						"name": "Diourbel",
						"parent": ""
					},
					"SN-DK": {
						"category": "region",
						"code": "SN-DK",
						"name": "Dakar",
						"parent": ""
					},
					"SN-FK": {
						"category": "region",
						"code": "SN-FK",
						"name": "Fatick",
						"parent": ""
					},
					"SN-KA": {
						"category": "region",
						"code": "SN-KA",
						"name": "Kaffrine",
						"parent": ""
					},
					"SN-KD": {
						"category": "region",
						"code": "SN-KD",
						"name": "Kolda",
						"parent": ""
					},
					"SN-KE": {
						"category": "region",
						"code": "SN-KE",
						"name": "Kédougou",
						"parent": ""
					},
					"SN-KL": {
						"category": "region",
						"code": "SN-KL",
						"name": "Kaolack",
						"parent": ""
					},
					"SN-LG": {
						"category": "region",
						"code": "SN-LG",
						"name": "Louga",
						"parent": ""
					},
					"SN-MT": {
						"category": "region",
						"code": "SN-MT",
						"name": "Matam",
						"parent": ""
					},
					"SN-SE": {
						"category": "region",
						"code": "SN-SE",
						"name": "Sédhiou",
						"parent": ""
					},
					"SN-SL": {
						"category": "region",
						"code": "SN-SL",
						"name": "Saint-Louis",
						"parent": ""
					},
					"SN-TC": {
						"category": "region",
						"code": "SN-TC",
						"name": "Tambacounda",
						"parent": ""
					},
					"SN-TH": {
						"category": "region",
						"code": "SN-TH",
						"name": "Thiès",
						"parent": ""
					},
					"SN-ZG": {
						"category": "region",
						"code": "SN-ZG",
						"name": "Ziguinchor",
						"parent": ""
					}
				}
			},
			"SGP": {
				"threeLetterCode": "SGP",
				"shortName": "Singapore",
				"shortNameUpperCase": "SINGAPORE",
				"fullName": "the Republic of Singapore",
				"subdivisionLabel": "district",
				"subdivisions": {
					"SG-01": {
						"category": "district",
						"code": "SG-01",
						"name": "Central Singapore",
						"parent": ""
					},
					"SG-02": {
						"category": "district",
						"code": "SG-02",
						"name": "North East",
						"parent": ""
					},
					"SG-03": {
						"category": "district",
						"code": "SG-03",
						"name": "North West",
						"parent": ""
					},
					"SG-04": {
						"category": "district",
						"code": "SG-04",
						"name": "South East",
						"parent": ""
					},
					"SG-05": {
						"category": "district",
						"code": "SG-05",
						"name": "South West",
						"parent": ""
					}
				}
			},
			"SGS": {
				"commonName": "South Georgia",
				"threeLetterCode": "SGS",
				"shortName": "South Georgia and the South Sandwich Islands",
				"shortNameUpperCase": "SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",
				"fullName": "South Georgia and the South Sandwich Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"SHN": {
				"commonName": "Saint Helena",
				"threeLetterCode": "SHN",
				"shortName": "Saint Helena, Ascension and Tristan da Cunha",
				"shortNameUpperCase": "SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA",
				"fullName": "Saint Helena, Ascension and Tristan da Cunha",
				"subdivisionLabel": "geographical entity",
				"subdivisions": {
					"SH-AC": {
						"category": "geographical entity",
						"code": "SH-AC",
						"name": "Ascension",
						"parent": ""
					},
					"SH-HL": {
						"category": "geographical entity",
						"code": "SH-HL",
						"name": "Saint Helena",
						"parent": ""
					},
					"SH-TA": {
						"category": "geographical entity",
						"code": "SH-TA",
						"name": "Tristan da Cunha",
						"parent": ""
					}
				}
			},
			"SJM": {
				"threeLetterCode": "SJM",
				"shortName": "Svalbard and Jan Mayen",
				"shortNameUpperCase": "SVALBARD AND JAN MAYEN",
				"fullName": "Svalbard and Jan Mayen",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"SLB": {
				"threeLetterCode": "SLB",
				"shortName": "Solomon Islands",
				"shortNameUpperCase": "SOLOMON ISLANDS",
				"fullName": "Solomon Islands",
				"subdivisionLabel": "province",
				"subdivisions": {
					"SB-CE": {
						"category": "province",
						"code": "SB-CE",
						"name": "Central",
						"parent": ""
					},
					"SB-CH": {
						"category": "province",
						"code": "SB-CH",
						"name": "Choiseul",
						"parent": ""
					},
					"SB-CT": {
						"category": "capital territory",
						"code": "SB-CT",
						"name": "Capital Territory (Honiara)",
						"parent": ""
					},
					"SB-GU": {
						"category": "province",
						"code": "SB-GU",
						"name": "Guadalcanal",
						"parent": ""
					},
					"SB-IS": {
						"category": "province",
						"code": "SB-IS",
						"name": "Isabel",
						"parent": ""
					},
					"SB-MK": {
						"category": "province",
						"code": "SB-MK",
						"name": "Makira-Ulawa",
						"parent": ""
					},
					"SB-ML": {
						"category": "province",
						"code": "SB-ML",
						"name": "Malaita",
						"parent": ""
					},
					"SB-RB": {
						"category": "province",
						"code": "SB-RB",
						"name": "Rennell and Bellona",
						"parent": ""
					},
					"SB-TE": {
						"category": "province",
						"code": "SB-TE",
						"name": "Temotu",
						"parent": ""
					},
					"SB-WE": {
						"category": "province",
						"code": "SB-WE",
						"name": "Western",
						"parent": ""
					}
				}
			},
			"SLE": {
				"threeLetterCode": "SLE",
				"shortName": "Sierra Leone",
				"shortNameUpperCase": "SIERRA LEONE",
				"fullName": "the Republic of Sierra Leone",
				"subdivisionLabel": "province",
				"subdivisions": {
					"SL-E": {
						"category": "province",
						"code": "SL-E",
						"name": "Eastern",
						"parent": ""
					},
					"SL-N": {
						"category": "province",
						"code": "SL-N",
						"name": "Northern",
						"parent": ""
					},
					"SL-S": {
						"category": "province",
						"code": "SL-S",
						"name": "Southern",
						"parent": ""
					},
					"SL-W": {
						"category": "area",
						"code": "SL-W",
						"name": "Western Area (Freetown)",
						"parent": ""
					}
				}
			},
			"SLV": {
				"threeLetterCode": "SLV",
				"shortName": "El Salvador",
				"shortNameUpperCase": "EL SALVADOR",
				"fullName": "the Republic of El Salvador",
				"subdivisionLabel": "department",
				"subdivisions": {
					"SV-AH": {
						"category": "department",
						"code": "SV-AH",
						"name": "Ahuachapán",
						"parent": ""
					},
					"SV-CA": {
						"category": "department",
						"code": "SV-CA",
						"name": "Cabañas",
						"parent": ""
					},
					"SV-CH": {
						"category": "department",
						"code": "SV-CH",
						"name": "Chalatenango",
						"parent": ""
					},
					"SV-CU": {
						"category": "department",
						"code": "SV-CU",
						"name": "Cuscatlán",
						"parent": ""
					},
					"SV-LI": {
						"category": "department",
						"code": "SV-LI",
						"name": "La Libertad",
						"parent": ""
					},
					"SV-MO": {
						"category": "department",
						"code": "SV-MO",
						"name": "Morazán",
						"parent": ""
					},
					"SV-PA": {
						"category": "department",
						"code": "SV-PA",
						"name": "La Paz",
						"parent": ""
					},
					"SV-SA": {
						"category": "department",
						"code": "SV-SA",
						"name": "Santa Ana",
						"parent": ""
					},
					"SV-SM": {
						"category": "department",
						"code": "SV-SM",
						"name": "San Miguel",
						"parent": ""
					},
					"SV-SO": {
						"category": "department",
						"code": "SV-SO",
						"name": "Sonsonate",
						"parent": ""
					},
					"SV-SS": {
						"category": "department",
						"code": "SV-SS",
						"name": "San Salvador",
						"parent": ""
					},
					"SV-SV": {
						"category": "department",
						"code": "SV-SV",
						"name": "San Vicente",
						"parent": ""
					},
					"SV-UN": {
						"category": "department",
						"code": "SV-UN",
						"name": "La Unión",
						"parent": ""
					},
					"SV-US": {
						"category": "department",
						"code": "SV-US",
						"name": "Usulután",
						"parent": ""
					}
				}
			},
			"SMR": {
				"threeLetterCode": "SMR",
				"shortName": "San Marino",
				"shortNameUpperCase": "SAN MARINO",
				"fullName": "the Republic of San Marino",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"SM-01": {
						"category": "municipality",
						"code": "SM-01",
						"name": "Acquaviva",
						"parent": ""
					},
					"SM-02": {
						"category": "municipality",
						"code": "SM-02",
						"name": "Chiesanuova",
						"parent": ""
					},
					"SM-03": {
						"category": "municipality",
						"code": "SM-03",
						"name": "Domagnano",
						"parent": ""
					},
					"SM-04": {
						"category": "municipality",
						"code": "SM-04",
						"name": "Faetano",
						"parent": ""
					},
					"SM-05": {
						"category": "municipality",
						"code": "SM-05",
						"name": "Fiorentino",
						"parent": ""
					},
					"SM-06": {
						"category": "municipality",
						"code": "SM-06",
						"name": "Borgo Maggiore",
						"parent": ""
					},
					"SM-07": {
						"category": "municipality",
						"code": "SM-07",
						"name": "San Marino",
						"parent": ""
					},
					"SM-08": {
						"category": "municipality",
						"code": "SM-08",
						"name": "Montegiardino",
						"parent": ""
					},
					"SM-09": {
						"category": "municipality",
						"code": "SM-09",
						"name": "Serravalle",
						"parent": ""
					}
				}
			},
			"SOM": {
				"threeLetterCode": "SOM",
				"shortName": "Somalia",
				"shortNameUpperCase": "SOMALIA",
				"fullName": "the Federal Republic of Somalia",
				"subdivisionLabel": "region",
				"subdivisions": {
					"SO-AW": {
						"category": "region",
						"code": "SO-AW",
						"name": "Awdal",
						"parent": ""
					},
					"SO-BK": {
						"category": "region",
						"code": "SO-BK",
						"name": "Bakool",
						"parent": ""
					},
					"SO-BN": {
						"category": "region",
						"code": "SO-BN",
						"name": "Banaadir",
						"parent": ""
					},
					"SO-BR": {
						"category": "region",
						"code": "SO-BR",
						"name": "Bari",
						"parent": ""
					},
					"SO-BY": {
						"category": "region",
						"code": "SO-BY",
						"name": "Bay",
						"parent": ""
					},
					"SO-GA": {
						"category": "region",
						"code": "SO-GA",
						"name": "Galguduud",
						"parent": ""
					},
					"SO-GE": {
						"category": "region",
						"code": "SO-GE",
						"name": "Gedo",
						"parent": ""
					},
					"SO-HI": {
						"category": "region",
						"code": "SO-HI",
						"name": "Hiiraan",
						"parent": ""
					},
					"SO-JD": {
						"category": "region",
						"code": "SO-JD",
						"name": "Jubbada Dhexe",
						"parent": ""
					},
					"SO-JH": {
						"category": "region",
						"code": "SO-JH",
						"name": "Jubbada Hoose",
						"parent": ""
					},
					"SO-MU": {
						"category": "region",
						"code": "SO-MU",
						"name": "Mudug",
						"parent": ""
					},
					"SO-NU": {
						"category": "region",
						"code": "SO-NU",
						"name": "Nugaal",
						"parent": ""
					},
					"SO-SA": {
						"category": "region",
						"code": "SO-SA",
						"name": "Sanaag",
						"parent": ""
					},
					"SO-SD": {
						"category": "region",
						"code": "SO-SD",
						"name": "Shabeellaha Dhexe",
						"parent": ""
					},
					"SO-SH": {
						"category": "region",
						"code": "SO-SH",
						"name": "Shabeellaha Hoose",
						"parent": ""
					},
					"SO-SO": {
						"category": "region",
						"code": "SO-SO",
						"name": "Sool",
						"parent": ""
					},
					"SO-TO": {
						"category": "region",
						"code": "SO-TO",
						"name": "Togdheer",
						"parent": ""
					},
					"SO-WO": {
						"category": "region",
						"code": "SO-WO",
						"name": "Woqooyi Galbeed",
						"parent": ""
					}
				}
			},
			"SPM": {
				"threeLetterCode": "SPM",
				"shortName": "Saint Pierre and Miquelon",
				"shortNameUpperCase": "SAINT PIERRE AND MIQUELON",
				"fullName": "Saint Pierre and Miquelon",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"SRB": {
				"threeLetterCode": "SRB",
				"shortName": "Serbia",
				"shortNameUpperCase": "SERBIA",
				"fullName": "the Republic of Serbia",
				"subdivisionLabel": "district",
				"subdivisions": {
					"RS-00": {
						"category": "city",
						"code": "RS-00",
						"name": "Beograd",
						"parent": ""
					},
					"RS-01": {
						"category": "district",
						"code": "RS-01",
						"name": "Severnobački okrug",
						"parent": "RS-VO"
					},
					"RS-02": {
						"category": "district",
						"code": "RS-02",
						"name": "Srednjebanatski okrug",
						"parent": "RS-VO"
					},
					"RS-03": {
						"category": "district",
						"code": "RS-03",
						"name": "Severnobanatski okrug",
						"parent": "RS-VO"
					},
					"RS-04": {
						"category": "district",
						"code": "RS-04",
						"name": "Južnobanatski okrug",
						"parent": "RS-VO"
					},
					"RS-05": {
						"category": "district",
						"code": "RS-05",
						"name": "Zapadnobački okrug",
						"parent": "RS-VO"
					},
					"RS-06": {
						"category": "district",
						"code": "RS-06",
						"name": "Južnobački okrug",
						"parent": "RS-VO"
					},
					"RS-07": {
						"category": "district",
						"code": "RS-07",
						"name": "Sremski okrug",
						"parent": "RS-VO"
					},
					"RS-08": {
						"category": "district",
						"code": "RS-08",
						"name": "Mačvanski okrug",
						"parent": ""
					},
					"RS-09": {
						"category": "district",
						"code": "RS-09",
						"name": "Kolubarski okrug",
						"parent": ""
					},
					"RS-10": {
						"category": "district",
						"code": "RS-10",
						"name": "Podunavski okrug",
						"parent": ""
					},
					"RS-11": {
						"category": "district",
						"code": "RS-11",
						"name": "Braničevski okrug",
						"parent": ""
					},
					"RS-12": {
						"category": "district",
						"code": "RS-12",
						"name": "Šumadijski okrug",
						"parent": ""
					},
					"RS-13": {
						"category": "district",
						"code": "RS-13",
						"name": "Pomoravski okrug",
						"parent": ""
					},
					"RS-14": {
						"category": "district",
						"code": "RS-14",
						"name": "Borski okrug",
						"parent": ""
					},
					"RS-15": {
						"category": "district",
						"code": "RS-15",
						"name": "Zaječarski okrug",
						"parent": ""
					},
					"RS-16": {
						"category": "district",
						"code": "RS-16",
						"name": "Zlatiborski okrug",
						"parent": ""
					},
					"RS-17": {
						"category": "district",
						"code": "RS-17",
						"name": "Moravički okrug",
						"parent": ""
					},
					"RS-18": {
						"category": "district",
						"code": "RS-18",
						"name": "Raški okrug",
						"parent": ""
					},
					"RS-19": {
						"category": "district",
						"code": "RS-19",
						"name": "Rasinski okrug",
						"parent": ""
					},
					"RS-20": {
						"category": "district",
						"code": "RS-20",
						"name": "Nišavski okrug",
						"parent": ""
					},
					"RS-21": {
						"category": "district",
						"code": "RS-21",
						"name": "Toplički okrug",
						"parent": ""
					},
					"RS-22": {
						"category": "district",
						"code": "RS-22",
						"name": "Pirotski okrug",
						"parent": ""
					},
					"RS-23": {
						"category": "district",
						"code": "RS-23",
						"name": "Jablanički okrug",
						"parent": ""
					},
					"RS-24": {
						"category": "district",
						"code": "RS-24",
						"name": "Pčinjski okrug",
						"parent": ""
					},
					"RS-25": {
						"category": "district",
						"code": "RS-25",
						"name": "Kosovski okrug",
						"parent": "RS-KM"
					},
					"RS-26": {
						"category": "district",
						"code": "RS-26",
						"name": "Pećki okrug",
						"parent": "RS-KM"
					},
					"RS-27": {
						"category": "district",
						"code": "RS-27",
						"name": "Prizrenski okrug",
						"parent": "RS-KM"
					},
					"RS-28": {
						"category": "district",
						"code": "RS-28",
						"name": "Kosovsko-Mitrovački okrug",
						"parent": "RS-KM"
					},
					"RS-29": {
						"category": "district",
						"code": "RS-29",
						"name": "Kosovsko-Pomoravski okrug",
						"parent": "RS-KM"
					},
					"RS-KM": {
						"category": "autonomous province",
						"code": "RS-KM",
						"name": "Kosovo-Metohija",
						"parent": ""
					},
					"RS-VO": {
						"category": "autonomous province",
						"code": "RS-VO",
						"name": "Vojvodina",
						"parent": ""
					}
				}
			},
			"SSD": {
				"threeLetterCode": "SSD",
				"shortName": "South Sudan",
				"shortNameUpperCase": "SOUTH SUDAN",
				"fullName": "the Republic of South Sudan",
				"subdivisionLabel": "state",
				"subdivisions": {
					"SS-BN": {
						"category": "state",
						"code": "SS-BN",
						"name": "Northern Bahr el Ghazal",
						"parent": ""
					},
					"SS-BW": {
						"category": "state",
						"code": "SS-BW",
						"name": "Western Bahr el  Ghazal",
						"parent": ""
					},
					"SS-EC": {
						"category": "state",
						"code": "SS-EC",
						"name": "Central Equatoria",
						"parent": ""
					},
					"SS-EE": {
						"category": "state",
						"code": "SS-EE",
						"name": "Eastern Equatoria",
						"parent": ""
					},
					"SS-EW": {
						"category": "state",
						"code": "SS-EW",
						"name": "Western Equatoria",
						"parent": ""
					},
					"SS-JG": {
						"category": "state",
						"code": "SS-JG",
						"name": "Jonglei",
						"parent": ""
					},
					"SS-LK": {
						"category": "state",
						"code": "SS-LK",
						"name": "Lakes",
						"parent": ""
					},
					"SS-NU": {
						"category": "state",
						"code": "SS-NU",
						"name": "Upper Nile",
						"parent": ""
					},
					"SS-UY": {
						"category": "state",
						"code": "SS-UY",
						"name": "Unity",
						"parent": ""
					},
					"SS-WR": {
						"category": "state",
						"code": "SS-WR",
						"name": "Warrap",
						"parent": ""
					}
				}
			},
			"STP": {
				"threeLetterCode": "STP",
				"shortName": "Sao Tome and Principe",
				"shortNameUpperCase": "SAO TOME AND PRINCIPE",
				"fullName": "the Democratic Republic of Sao Tome and Principe",
				"subdivisionLabel": "province",
				"subdivisions": {
					"ST-P": {
						"category": "province",
						"code": "ST-P",
						"name": "Príncipe",
						"parent": ""
					},
					"ST-S": {
						"category": "province",
						"code": "ST-S",
						"name": "São Tomé",
						"parent": ""
					}
				}
			},
			"SUR": {
				"threeLetterCode": "SUR",
				"shortName": "Suriname",
				"shortNameUpperCase": "SURINAME",
				"fullName": "the Republic of Suriname",
				"subdivisionLabel": "district",
				"subdivisions": {
					"SR-BR": {
						"category": "district",
						"code": "SR-BR",
						"name": "Brokopondo",
						"parent": ""
					},
					"SR-CM": {
						"category": "district",
						"code": "SR-CM",
						"name": "Commewijne",
						"parent": ""
					},
					"SR-CR": {
						"category": "district",
						"code": "SR-CR",
						"name": "Coronie",
						"parent": ""
					},
					"SR-MA": {
						"category": "district",
						"code": "SR-MA",
						"name": "Marowijne",
						"parent": ""
					},
					"SR-NI": {
						"category": "district",
						"code": "SR-NI",
						"name": "Nickerie",
						"parent": ""
					},
					"SR-PM": {
						"category": "district",
						"code": "SR-PM",
						"name": "Paramaribo",
						"parent": ""
					},
					"SR-PR": {
						"category": "district",
						"code": "SR-PR",
						"name": "Para",
						"parent": ""
					},
					"SR-SA": {
						"category": "district",
						"code": "SR-SA",
						"name": "Saramacca",
						"parent": ""
					},
					"SR-SI": {
						"category": "district",
						"code": "SR-SI",
						"name": "Sipaliwini",
						"parent": ""
					},
					"SR-WA": {
						"category": "district",
						"code": "SR-WA",
						"name": "Wanica",
						"parent": ""
					}
				}
			},
			"SVK": {
				"threeLetterCode": "SVK",
				"shortName": "Slovakia",
				"shortNameUpperCase": "SLOVAKIA",
				"fullName": "the Slovak Republic",
				"subdivisionLabel": "region",
				"subdivisions": {
					"SK-BC": {
						"category": "region",
						"code": "SK-BC",
						"name": "Banskobystrický kraj",
						"parent": ""
					},
					"SK-BL": {
						"category": "region",
						"code": "SK-BL",
						"name": "Bratislavský kraj",
						"parent": ""
					},
					"SK-KI": {
						"category": "region",
						"code": "SK-KI",
						"name": "Košický kraj",
						"parent": ""
					},
					"SK-NI": {
						"category": "region",
						"code": "SK-NI",
						"name": "Nitriansky kraj",
						"parent": ""
					},
					"SK-PV": {
						"category": "region",
						"code": "SK-PV",
						"name": "Prešovský kraj",
						"parent": ""
					},
					"SK-TA": {
						"category": "region",
						"code": "SK-TA",
						"name": "Trnavský kraj",
						"parent": ""
					},
					"SK-TC": {
						"category": "region",
						"code": "SK-TC",
						"name": "Trenčiansky kraj",
						"parent": ""
					},
					"SK-ZI": {
						"category": "region",
						"code": "SK-ZI",
						"name": "Žilinský kraj",
						"parent": ""
					}
				}
			},
			"SVN": {
				"threeLetterCode": "SVN",
				"shortName": "Slovenia",
				"shortNameUpperCase": "SLOVENIA",
				"fullName": "the Republic of Slovenia",
				"subdivisionLabel": "municipality",
				"subdivisions": {
					"SI-001": {
						"category": "municipality",
						"code": "SI-001",
						"name": "Ajdovščina",
						"parent": ""
					},
					"SI-002": {
						"category": "municipality",
						"code": "SI-002",
						"name": "Beltinci",
						"parent": ""
					},
					"SI-003": {
						"category": "municipality",
						"code": "SI-003",
						"name": "Bled",
						"parent": ""
					},
					"SI-004": {
						"category": "municipality",
						"code": "SI-004",
						"name": "Bohinj",
						"parent": ""
					},
					"SI-005": {
						"category": "municipality",
						"code": "SI-005",
						"name": "Borovnica",
						"parent": ""
					},
					"SI-006": {
						"category": "municipality",
						"code": "SI-006",
						"name": "Bovec",
						"parent": ""
					},
					"SI-007": {
						"category": "municipality",
						"code": "SI-007",
						"name": "Brda",
						"parent": ""
					},
					"SI-008": {
						"category": "municipality",
						"code": "SI-008",
						"name": "Brezovica",
						"parent": ""
					},
					"SI-009": {
						"category": "municipality",
						"code": "SI-009",
						"name": "Brežice",
						"parent": ""
					},
					"SI-010": {
						"category": "municipality",
						"code": "SI-010",
						"name": "Tišina",
						"parent": ""
					},
					"SI-011": {
						"category": "municipality",
						"code": "SI-011",
						"name": "Celje",
						"parent": ""
					},
					"SI-012": {
						"category": "municipality",
						"code": "SI-012",
						"name": "Cerklje na Gorenjskem",
						"parent": ""
					},
					"SI-013": {
						"category": "municipality",
						"code": "SI-013",
						"name": "Cerknica",
						"parent": ""
					},
					"SI-014": {
						"category": "municipality",
						"code": "SI-014",
						"name": "Cerkno",
						"parent": ""
					},
					"SI-015": {
						"category": "municipality",
						"code": "SI-015",
						"name": "Črenšovci",
						"parent": ""
					},
					"SI-016": {
						"category": "municipality",
						"code": "SI-016",
						"name": "Črna na Koroškem",
						"parent": ""
					},
					"SI-017": {
						"category": "municipality",
						"code": "SI-017",
						"name": "Črnomelj",
						"parent": ""
					},
					"SI-018": {
						"category": "municipality",
						"code": "SI-018",
						"name": "Destrnik",
						"parent": ""
					},
					"SI-019": {
						"category": "municipality",
						"code": "SI-019",
						"name": "Divača",
						"parent": ""
					},
					"SI-020": {
						"category": "municipality",
						"code": "SI-020",
						"name": "Dobrepolje",
						"parent": ""
					},
					"SI-021": {
						"category": "municipality",
						"code": "SI-021",
						"name": "Dobrova-Polhov Gradec",
						"parent": ""
					},
					"SI-022": {
						"category": "municipality",
						"code": "SI-022",
						"name": "Dol pri Ljubljani",
						"parent": ""
					},
					"SI-023": {
						"category": "municipality",
						"code": "SI-023",
						"name": "Domžale",
						"parent": ""
					},
					"SI-024": {
						"category": "municipality",
						"code": "SI-024",
						"name": "Dornava",
						"parent": ""
					},
					"SI-025": {
						"category": "municipality",
						"code": "SI-025",
						"name": "Dravograd",
						"parent": ""
					},
					"SI-026": {
						"category": "municipality",
						"code": "SI-026",
						"name": "Duplek",
						"parent": ""
					},
					"SI-027": {
						"category": "municipality",
						"code": "SI-027",
						"name": "Gorenja vas-Poljane",
						"parent": ""
					},
					"SI-028": {
						"category": "municipality",
						"code": "SI-028",
						"name": "Gorišnica",
						"parent": ""
					},
					"SI-029": {
						"category": "municipality",
						"code": "SI-029",
						"name": "Gornja Radgona",
						"parent": ""
					},
					"SI-030": {
						"category": "municipality",
						"code": "SI-030",
						"name": "Gornji Grad",
						"parent": ""
					},
					"SI-031": {
						"category": "municipality",
						"code": "SI-031",
						"name": "Gornji Petrovci",
						"parent": ""
					},
					"SI-032": {
						"category": "municipality",
						"code": "SI-032",
						"name": "Grosuplje",
						"parent": ""
					},
					"SI-033": {
						"category": "municipality",
						"code": "SI-033",
						"name": "Šalovci",
						"parent": ""
					},
					"SI-034": {
						"category": "municipality",
						"code": "SI-034",
						"name": "Hrastnik",
						"parent": ""
					},
					"SI-035": {
						"category": "municipality",
						"code": "SI-035",
						"name": "Hrpelje-Kozina",
						"parent": ""
					},
					"SI-036": {
						"category": "municipality",
						"code": "SI-036",
						"name": "Idrija",
						"parent": ""
					},
					"SI-037": {
						"category": "municipality",
						"code": "SI-037",
						"name": "Ig",
						"parent": ""
					},
					"SI-038": {
						"category": "municipality",
						"code": "SI-038",
						"name": "Ilirska Bistrica",
						"parent": ""
					},
					"SI-039": {
						"category": "municipality",
						"code": "SI-039",
						"name": "Ivančna Gorica",
						"parent": ""
					},
					"SI-040": {
						"category": "municipality",
						"code": "SI-040",
						"name": "Izola",
						"parent": ""
					},
					"SI-041": {
						"category": "municipality",
						"code": "SI-041",
						"name": "Jesenice",
						"parent": ""
					},
					"SI-042": {
						"category": "municipality",
						"code": "SI-042",
						"name": "Juršinci",
						"parent": ""
					},
					"SI-043": {
						"category": "municipality",
						"code": "SI-043",
						"name": "Kamnik",
						"parent": ""
					},
					"SI-044": {
						"category": "municipality",
						"code": "SI-044",
						"name": "Kanal",
						"parent": ""
					},
					"SI-045": {
						"category": "municipality",
						"code": "SI-045",
						"name": "Kidričevo",
						"parent": ""
					},
					"SI-046": {
						"category": "municipality",
						"code": "SI-046",
						"name": "Kobarid",
						"parent": ""
					},
					"SI-047": {
						"category": "municipality",
						"code": "SI-047",
						"name": "Kobilje",
						"parent": ""
					},
					"SI-048": {
						"category": "municipality",
						"code": "SI-048",
						"name": "Kočevje",
						"parent": ""
					},
					"SI-049": {
						"category": "municipality",
						"code": "SI-049",
						"name": "Komen",
						"parent": ""
					},
					"SI-050": {
						"category": "municipality",
						"code": "SI-050",
						"name": "Koper",
						"parent": ""
					},
					"SI-051": {
						"category": "municipality",
						"code": "SI-051",
						"name": "Kozje",
						"parent": ""
					},
					"SI-052": {
						"category": "municipality",
						"code": "SI-052",
						"name": "Kranj",
						"parent": ""
					},
					"SI-053": {
						"category": "municipality",
						"code": "SI-053",
						"name": "Kranjska Gora",
						"parent": ""
					},
					"SI-054": {
						"category": "municipality",
						"code": "SI-054",
						"name": "Krško",
						"parent": ""
					},
					"SI-055": {
						"category": "municipality",
						"code": "SI-055",
						"name": "Kungota",
						"parent": ""
					},
					"SI-056": {
						"category": "municipality",
						"code": "SI-056",
						"name": "Kuzma",
						"parent": ""
					},
					"SI-057": {
						"category": "municipality",
						"code": "SI-057",
						"name": "Laško",
						"parent": ""
					},
					"SI-058": {
						"category": "municipality",
						"code": "SI-058",
						"name": "Lenart",
						"parent": ""
					},
					"SI-059": {
						"category": "municipality",
						"code": "SI-059",
						"name": "Lendava",
						"parent": ""
					},
					"SI-060": {
						"category": "municipality",
						"code": "SI-060",
						"name": "Litija",
						"parent": ""
					},
					"SI-061": {
						"category": "municipality",
						"code": "SI-061",
						"name": "Ljubljana",
						"parent": ""
					},
					"SI-062": {
						"category": "municipality",
						"code": "SI-062",
						"name": "Ljubno",
						"parent": ""
					},
					"SI-063": {
						"category": "municipality",
						"code": "SI-063",
						"name": "Ljutomer",
						"parent": ""
					},
					"SI-064": {
						"category": "municipality",
						"code": "SI-064",
						"name": "Logatec",
						"parent": ""
					},
					"SI-065": {
						"category": "municipality",
						"code": "SI-065",
						"name": "Loška Dolina",
						"parent": ""
					},
					"SI-066": {
						"category": "municipality",
						"code": "SI-066",
						"name": "Loški Potok",
						"parent": ""
					},
					"SI-067": {
						"category": "municipality",
						"code": "SI-067",
						"name": "Luče",
						"parent": ""
					},
					"SI-068": {
						"category": "municipality",
						"code": "SI-068",
						"name": "Lukovica",
						"parent": ""
					},
					"SI-069": {
						"category": "municipality",
						"code": "SI-069",
						"name": "Majšperk",
						"parent": ""
					},
					"SI-070": {
						"category": "municipality",
						"code": "SI-070",
						"name": "Maribor",
						"parent": ""
					},
					"SI-071": {
						"category": "municipality",
						"code": "SI-071",
						"name": "Medvode",
						"parent": ""
					},
					"SI-072": {
						"category": "municipality",
						"code": "SI-072",
						"name": "Mengeš",
						"parent": ""
					},
					"SI-073": {
						"category": "municipality",
						"code": "SI-073",
						"name": "Metlika",
						"parent": ""
					},
					"SI-074": {
						"category": "municipality",
						"code": "SI-074",
						"name": "Mežica",
						"parent": ""
					},
					"SI-075": {
						"category": "municipality",
						"code": "SI-075",
						"name": "Miren-Kostanjevica",
						"parent": ""
					},
					"SI-076": {
						"category": "municipality",
						"code": "SI-076",
						"name": "Mislinja",
						"parent": ""
					},
					"SI-077": {
						"category": "municipality",
						"code": "SI-077",
						"name": "Moravče",
						"parent": ""
					},
					"SI-078": {
						"category": "municipality",
						"code": "SI-078",
						"name": "Moravske Toplice",
						"parent": ""
					},
					"SI-079": {
						"category": "municipality",
						"code": "SI-079",
						"name": "Mozirje",
						"parent": ""
					},
					"SI-080": {
						"category": "municipality",
						"code": "SI-080",
						"name": "Murska Sobota",
						"parent": ""
					},
					"SI-081": {
						"category": "municipality",
						"code": "SI-081",
						"name": "Muta",
						"parent": ""
					},
					"SI-082": {
						"category": "municipality",
						"code": "SI-082",
						"name": "Naklo",
						"parent": ""
					},
					"SI-083": {
						"category": "municipality",
						"code": "SI-083",
						"name": "Nazarje",
						"parent": ""
					},
					"SI-084": {
						"category": "municipality",
						"code": "SI-084",
						"name": "Nova Gorica",
						"parent": ""
					},
					"SI-085": {
						"category": "municipality",
						"code": "SI-085",
						"name": "Novo Mesto",
						"parent": ""
					},
					"SI-086": {
						"category": "municipality",
						"code": "SI-086",
						"name": "Odranci",
						"parent": ""
					},
					"SI-087": {
						"category": "municipality",
						"code": "SI-087",
						"name": "Ormož",
						"parent": ""
					},
					"SI-088": {
						"category": "municipality",
						"code": "SI-088",
						"name": "Osilnica",
						"parent": ""
					},
					"SI-089": {
						"category": "municipality",
						"code": "SI-089",
						"name": "Pesnica",
						"parent": ""
					},
					"SI-090": {
						"category": "municipality",
						"code": "SI-090",
						"name": "Piran",
						"parent": ""
					},
					"SI-091": {
						"category": "municipality",
						"code": "SI-091",
						"name": "Pivka",
						"parent": ""
					},
					"SI-092": {
						"category": "municipality",
						"code": "SI-092",
						"name": "Podčetrtek",
						"parent": ""
					},
					"SI-093": {
						"category": "municipality",
						"code": "SI-093",
						"name": "Podvelka",
						"parent": ""
					},
					"SI-094": {
						"category": "municipality",
						"code": "SI-094",
						"name": "Postojna",
						"parent": ""
					},
					"SI-095": {
						"category": "municipality",
						"code": "SI-095",
						"name": "Preddvor",
						"parent": ""
					},
					"SI-096": {
						"category": "municipality",
						"code": "SI-096",
						"name": "Ptuj",
						"parent": ""
					},
					"SI-097": {
						"category": "municipality",
						"code": "SI-097",
						"name": "Puconci",
						"parent": ""
					},
					"SI-098": {
						"category": "municipality",
						"code": "SI-098",
						"name": "Rače-Fram",
						"parent": ""
					},
					"SI-099": {
						"category": "municipality",
						"code": "SI-099",
						"name": "Radeče",
						"parent": ""
					},
					"SI-100": {
						"category": "municipality",
						"code": "SI-100",
						"name": "Radenci",
						"parent": ""
					},
					"SI-101": {
						"category": "municipality",
						"code": "SI-101",
						"name": "Radlje ob Dravi",
						"parent": ""
					},
					"SI-102": {
						"category": "municipality",
						"code": "SI-102",
						"name": "Radovljica",
						"parent": ""
					},
					"SI-103": {
						"category": "municipality",
						"code": "SI-103",
						"name": "Ravne na Koroškem",
						"parent": ""
					},
					"SI-104": {
						"category": "municipality",
						"code": "SI-104",
						"name": "Ribnica",
						"parent": ""
					},
					"SI-105": {
						"category": "municipality",
						"code": "SI-105",
						"name": "Rogašovci",
						"parent": ""
					},
					"SI-106": {
						"category": "municipality",
						"code": "SI-106",
						"name": "Rogaška Slatina",
						"parent": ""
					},
					"SI-107": {
						"category": "municipality",
						"code": "SI-107",
						"name": "Rogatec",
						"parent": ""
					},
					"SI-108": {
						"category": "municipality",
						"code": "SI-108",
						"name": "Ruše",
						"parent": ""
					},
					"SI-109": {
						"category": "municipality",
						"code": "SI-109",
						"name": "Semič",
						"parent": ""
					},
					"SI-110": {
						"category": "municipality",
						"code": "SI-110",
						"name": "Sevnica",
						"parent": ""
					},
					"SI-111": {
						"category": "municipality",
						"code": "SI-111",
						"name": "Sežana",
						"parent": ""
					},
					"SI-112": {
						"category": "municipality",
						"code": "SI-112",
						"name": "Slovenj Gradec",
						"parent": ""
					},
					"SI-113": {
						"category": "municipality",
						"code": "SI-113",
						"name": "Slovenska Bistrica",
						"parent": ""
					},
					"SI-114": {
						"category": "municipality",
						"code": "SI-114",
						"name": "Slovenske Konjice",
						"parent": ""
					},
					"SI-115": {
						"category": "municipality",
						"code": "SI-115",
						"name": "Starše",
						"parent": ""
					},
					"SI-116": {
						"category": "municipality",
						"code": "SI-116",
						"name": "Sveti Jurij",
						"parent": ""
					},
					"SI-117": {
						"category": "municipality",
						"code": "SI-117",
						"name": "Šenčur",
						"parent": ""
					},
					"SI-118": {
						"category": "municipality",
						"code": "SI-118",
						"name": "Šentilj",
						"parent": ""
					},
					"SI-119": {
						"category": "municipality",
						"code": "SI-119",
						"name": "Šentjernej",
						"parent": ""
					},
					"SI-120": {
						"category": "municipality",
						"code": "SI-120",
						"name": "Šentjur",
						"parent": ""
					},
					"SI-121": {
						"category": "municipality",
						"code": "SI-121",
						"name": "Škocjan",
						"parent": ""
					},
					"SI-122": {
						"category": "municipality",
						"code": "SI-122",
						"name": "Škofja Loka",
						"parent": ""
					},
					"SI-123": {
						"category": "municipality",
						"code": "SI-123",
						"name": "Škofljica",
						"parent": ""
					},
					"SI-124": {
						"category": "municipality",
						"code": "SI-124",
						"name": "Šmarje pri Jelšah",
						"parent": ""
					},
					"SI-125": {
						"category": "municipality",
						"code": "SI-125",
						"name": "Šmartno ob Paki",
						"parent": ""
					},
					"SI-126": {
						"category": "municipality",
						"code": "SI-126",
						"name": "Šoštanj",
						"parent": ""
					},
					"SI-127": {
						"category": "municipality",
						"code": "SI-127",
						"name": "Štore",
						"parent": ""
					},
					"SI-128": {
						"category": "municipality",
						"code": "SI-128",
						"name": "Tolmin",
						"parent": ""
					},
					"SI-129": {
						"category": "municipality",
						"code": "SI-129",
						"name": "Trbovlje",
						"parent": ""
					},
					"SI-130": {
						"category": "municipality",
						"code": "SI-130",
						"name": "Trebnje",
						"parent": ""
					},
					"SI-131": {
						"category": "municipality",
						"code": "SI-131",
						"name": "Tržič",
						"parent": ""
					},
					"SI-132": {
						"category": "municipality",
						"code": "SI-132",
						"name": "Turnišče",
						"parent": ""
					},
					"SI-133": {
						"category": "municipality",
						"code": "SI-133",
						"name": "Velenje",
						"parent": ""
					},
					"SI-134": {
						"category": "municipality",
						"code": "SI-134",
						"name": "Velike Lašče",
						"parent": ""
					},
					"SI-135": {
						"category": "municipality",
						"code": "SI-135",
						"name": "Videm",
						"parent": ""
					},
					"SI-136": {
						"category": "municipality",
						"code": "SI-136",
						"name": "Vipava",
						"parent": ""
					},
					"SI-137": {
						"category": "municipality",
						"code": "SI-137",
						"name": "Vitanje",
						"parent": ""
					},
					"SI-138": {
						"category": "municipality",
						"code": "SI-138",
						"name": "Vodice",
						"parent": ""
					},
					"SI-139": {
						"category": "municipality",
						"code": "SI-139",
						"name": "Vojnik",
						"parent": ""
					},
					"SI-140": {
						"category": "municipality",
						"code": "SI-140",
						"name": "Vrhnika",
						"parent": ""
					},
					"SI-141": {
						"category": "municipality",
						"code": "SI-141",
						"name": "Vuzenica",
						"parent": ""
					},
					"SI-142": {
						"category": "municipality",
						"code": "SI-142",
						"name": "Zagorje ob Savi",
						"parent": ""
					},
					"SI-143": {
						"category": "municipality",
						"code": "SI-143",
						"name": "Zavrč",
						"parent": ""
					},
					"SI-144": {
						"category": "municipality",
						"code": "SI-144",
						"name": "Zreče",
						"parent": ""
					},
					"SI-146": {
						"category": "municipality",
						"code": "SI-146",
						"name": "Železniki",
						"parent": ""
					},
					"SI-147": {
						"category": "municipality",
						"code": "SI-147",
						"name": "Žiri",
						"parent": ""
					},
					"SI-148": {
						"category": "municipality",
						"code": "SI-148",
						"name": "Benedikt",
						"parent": ""
					},
					"SI-149": {
						"category": "municipality",
						"code": "SI-149",
						"name": "Bistrica ob Sotli",
						"parent": ""
					},
					"SI-150": {
						"category": "municipality",
						"code": "SI-150",
						"name": "Bloke",
						"parent": ""
					},
					"SI-151": {
						"category": "municipality",
						"code": "SI-151",
						"name": "Braslovče",
						"parent": ""
					},
					"SI-152": {
						"category": "municipality",
						"code": "SI-152",
						"name": "Cankova",
						"parent": ""
					},
					"SI-153": {
						"category": "municipality",
						"code": "SI-153",
						"name": "Cerkvenjak",
						"parent": ""
					},
					"SI-154": {
						"category": "municipality",
						"code": "SI-154",
						"name": "Dobje",
						"parent": ""
					},
					"SI-155": {
						"category": "municipality",
						"code": "SI-155",
						"name": "Dobrna",
						"parent": ""
					},
					"SI-156": {
						"category": "municipality",
						"code": "SI-156",
						"name": "Dobrovnik",
						"parent": ""
					},
					"SI-157": {
						"category": "municipality",
						"code": "SI-157",
						"name": "Dolenjske Toplice",
						"parent": ""
					},
					"SI-158": {
						"category": "municipality",
						"code": "SI-158",
						"name": "Grad",
						"parent": ""
					},
					"SI-159": {
						"category": "municipality",
						"code": "SI-159",
						"name": "Hajdina",
						"parent": ""
					},
					"SI-160": {
						"category": "municipality",
						"code": "SI-160",
						"name": "Hoče-Slivnica",
						"parent": ""
					},
					"SI-161": {
						"category": "municipality",
						"code": "SI-161",
						"name": "Hodoš",
						"parent": ""
					},
					"SI-162": {
						"category": "municipality",
						"code": "SI-162",
						"name": "Horjul",
						"parent": ""
					},
					"SI-163": {
						"category": "municipality",
						"code": "SI-163",
						"name": "Jezersko",
						"parent": ""
					},
					"SI-164": {
						"category": "municipality",
						"code": "SI-164",
						"name": "Komenda",
						"parent": ""
					},
					"SI-165": {
						"category": "municipality",
						"code": "SI-165",
						"name": "Kostel",
						"parent": ""
					},
					"SI-166": {
						"category": "municipality",
						"code": "SI-166",
						"name": "Križevci",
						"parent": ""
					},
					"SI-167": {
						"category": "municipality",
						"code": "SI-167",
						"name": "Lovrenc na Pohorju",
						"parent": ""
					},
					"SI-168": {
						"category": "municipality",
						"code": "SI-168",
						"name": "Markovci",
						"parent": ""
					},
					"SI-169": {
						"category": "municipality",
						"code": "SI-169",
						"name": "Miklavž na Dravskem Polju",
						"parent": ""
					},
					"SI-170": {
						"category": "municipality",
						"code": "SI-170",
						"name": "Mirna Peč",
						"parent": ""
					},
					"SI-171": {
						"category": "municipality",
						"code": "SI-171",
						"name": "Oplotnica",
						"parent": ""
					},
					"SI-172": {
						"category": "municipality",
						"code": "SI-172",
						"name": "Podlehnik",
						"parent": ""
					},
					"SI-173": {
						"category": "municipality",
						"code": "SI-173",
						"name": "Polzela",
						"parent": ""
					},
					"SI-174": {
						"category": "municipality",
						"code": "SI-174",
						"name": "Prebold",
						"parent": ""
					},
					"SI-175": {
						"category": "municipality",
						"code": "SI-175",
						"name": "Prevalje",
						"parent": ""
					},
					"SI-176": {
						"category": "municipality",
						"code": "SI-176",
						"name": "Razkrižje",
						"parent": ""
					},
					"SI-177": {
						"category": "municipality",
						"code": "SI-177",
						"name": "Ribnica na Pohorju",
						"parent": ""
					},
					"SI-178": {
						"category": "municipality",
						"code": "SI-178",
						"name": "Selnica ob Dravi",
						"parent": ""
					},
					"SI-179": {
						"category": "municipality",
						"code": "SI-179",
						"name": "Sodražica",
						"parent": ""
					},
					"SI-180": {
						"category": "municipality",
						"code": "SI-180",
						"name": "Solčava",
						"parent": ""
					},
					"SI-181": {
						"category": "municipality",
						"code": "SI-181",
						"name": "Sveta Ana",
						"parent": ""
					},
					"SI-182": {
						"category": "municipality",
						"code": "SI-182",
						"name": "Sveti Andraž v Slovenskih Goricah",
						"parent": ""
					},
					"SI-183": {
						"category": "municipality",
						"code": "SI-183",
						"name": "Šempeter-Vrtojba",
						"parent": ""
					},
					"SI-184": {
						"category": "municipality",
						"code": "SI-184",
						"name": "Tabor",
						"parent": ""
					},
					"SI-185": {
						"category": "municipality",
						"code": "SI-185",
						"name": "Trnovska Vas",
						"parent": ""
					},
					"SI-186": {
						"category": "municipality",
						"code": "SI-186",
						"name": "Trzin",
						"parent": ""
					},
					"SI-187": {
						"category": "municipality",
						"code": "SI-187",
						"name": "Velika Polana",
						"parent": ""
					},
					"SI-188": {
						"category": "municipality",
						"code": "SI-188",
						"name": "Veržej",
						"parent": ""
					},
					"SI-189": {
						"category": "municipality",
						"code": "SI-189",
						"name": "Vransko",
						"parent": ""
					},
					"SI-190": {
						"category": "municipality",
						"code": "SI-190",
						"name": "Žalec",
						"parent": ""
					},
					"SI-191": {
						"category": "municipality",
						"code": "SI-191",
						"name": "Žetale",
						"parent": ""
					},
					"SI-192": {
						"category": "municipality",
						"code": "SI-192",
						"name": "Žirovnica",
						"parent": ""
					},
					"SI-193": {
						"category": "municipality",
						"code": "SI-193",
						"name": "Žužemberk",
						"parent": ""
					},
					"SI-194": {
						"category": "municipality",
						"code": "SI-194",
						"name": "Šmartno pri Litiji",
						"parent": ""
					},
					"SI-195": {
						"category": "municipality",
						"code": "SI-195",
						"name": "Apače",
						"parent": ""
					},
					"SI-196": {
						"category": "municipality",
						"code": "SI-196",
						"name": "Cirkulane",
						"parent": ""
					},
					"SI-197": {
						"category": "municipality",
						"code": "SI-197",
						"name": "Kosanjevica na Krki",
						"parent": ""
					},
					"SI-198": {
						"category": "municipality",
						"code": "SI-198",
						"name": "Makole",
						"parent": ""
					},
					"SI-199": {
						"category": "municipality",
						"code": "SI-199",
						"name": "Mokronog-Trebelno",
						"parent": ""
					},
					"SI-200": {
						"category": "municipality",
						"code": "SI-200",
						"name": "Poljčane",
						"parent": ""
					},
					"SI-201": {
						"category": "municipality",
						"code": "SI-201",
						"name": "Renče-Vogrsko",
						"parent": ""
					},
					"SI-202": {
						"category": "municipality",
						"code": "SI-202",
						"name": "Središče ob Dravi",
						"parent": ""
					},
					"SI-203": {
						"category": "municipality",
						"code": "SI-203",
						"name": "Straža",
						"parent": ""
					},
					"SI-204": {
						"category": "municipality",
						"code": "SI-204",
						"name": "Sveta Trojica v Slovenskih Goricah",
						"parent": ""
					},
					"SI-205": {
						"category": "municipality",
						"code": "SI-205",
						"name": "Sveti Tomaž",
						"parent": ""
					},
					"SI-206": {
						"category": "municipality",
						"code": "SI-206",
						"name": "Šmarješke Toplice",
						"parent": ""
					},
					"SI-207": {
						"category": "municipality",
						"code": "SI-207",
						"name": "Gorje",
						"parent": ""
					},
					"SI-208": {
						"category": "municipality",
						"code": "SI-208",
						"name": "Log-Dragomer",
						"parent": ""
					},
					"SI-209": {
						"category": "municipality",
						"code": "SI-209",
						"name": "Rečica ob Savinji",
						"parent": ""
					},
					"SI-210": {
						"category": "municipality",
						"code": "SI-210",
						"name": "Sveti Jurij v Slovenskih Goricah",
						"parent": ""
					},
					"SI-211": {
						"category": "municipality",
						"code": "SI-211",
						"name": "Šentrupert",
						"parent": ""
					},
					"SI-212": {
						"category": "municipality",
						"code": "SI-212",
						"name": "Mirna",
						"parent": ""
					},
					"SI-213": {
						"category": "municipality",
						"code": "SI-213",
						"name": "Ankaran",
						"parent": ""
					}
				}
			},
			"SWE": {
				"threeLetterCode": "SWE",
				"shortName": "Sweden",
				"shortNameUpperCase": "SWEDEN",
				"fullName": "the Kingdom of Sweden",
				"subdivisionLabel": "county",
				"subdivisions": {
					"SE-AB": {
						"category": "county",
						"code": "SE-AB",
						"name": "Stockholms län [SE-01]",
						"parent": ""
					},
					"SE-AC": {
						"category": "county",
						"code": "SE-AC",
						"name": "Västerbottens län [SE-24]",
						"parent": ""
					},
					"SE-BD": {
						"category": "county",
						"code": "SE-BD",
						"name": "Norrbottens län [SE-25]",
						"parent": ""
					},
					"SE-C": {
						"category": "county",
						"code": "SE-C",
						"name": "Uppsala län [SE-03]",
						"parent": ""
					},
					"SE-D": {
						"category": "county",
						"code": "SE-D",
						"name": "Södermanlands län [SE-04]",
						"parent": ""
					},
					"SE-E": {
						"category": "county",
						"code": "SE-E",
						"name": "Östergötlands län [SE-05]",
						"parent": ""
					},
					"SE-F": {
						"category": "county",
						"code": "SE-F",
						"name": "Jönköpings län [SE-06]",
						"parent": ""
					},
					"SE-G": {
						"category": "county",
						"code": "SE-G",
						"name": "Kronobergs län [SE-07]",
						"parent": ""
					},
					"SE-H": {
						"category": "county",
						"code": "SE-H",
						"name": "Kalmar län [SE-08]",
						"parent": ""
					},
					"SE-I": {
						"category": "county",
						"code": "SE-I",
						"name": "Gotlands län [SE-09]",
						"parent": ""
					},
					"SE-K": {
						"category": "county",
						"code": "SE-K",
						"name": "Blekinge län [SE-10]",
						"parent": ""
					},
					"SE-M": {
						"category": "county",
						"code": "SE-M",
						"name": "Skåne län [SE-12]",
						"parent": ""
					},
					"SE-N": {
						"category": "county",
						"code": "SE-N",
						"name": "Hallands län [SE-13]",
						"parent": ""
					},
					"SE-O": {
						"category": "county",
						"code": "SE-O",
						"name": "Västra Götalands län [SE-14]",
						"parent": ""
					},
					"SE-S": {
						"category": "county",
						"code": "SE-S",
						"name": "Värmlands län [SE-17]",
						"parent": ""
					},
					"SE-T": {
						"category": "county",
						"code": "SE-T",
						"name": "Örebro län [SE-18]",
						"parent": ""
					},
					"SE-U": {
						"category": "county",
						"code": "SE-U",
						"name": "Västmanlands län [SE-19]",
						"parent": ""
					},
					"SE-W": {
						"category": "county",
						"code": "SE-W",
						"name": "Dalarnas län [SE-20]",
						"parent": ""
					},
					"SE-X": {
						"category": "county",
						"code": "SE-X",
						"name": "Gävleborgs län [SE-21]",
						"parent": ""
					},
					"SE-Y": {
						"category": "county",
						"code": "SE-Y",
						"name": "Västernorrlands län [SE-22]",
						"parent": ""
					},
					"SE-Z": {
						"category": "county",
						"code": "SE-Z",
						"name": "Jämtlands län [SE-23]",
						"parent": ""
					}
				}
			},
			"SWZ": {
				"threeLetterCode": "SWZ",
				"shortName": "Swaziland",
				"shortNameUpperCase": "SWAZILAND",
				"fullName": "the Kingdom of Swaziland",
				"subdivisionLabel": "district",
				"subdivisions": {
					"SZ-HH": {
						"category": "district",
						"code": "SZ-HH",
						"name": "Hhohho",
						"parent": ""
					},
					"SZ-LU": {
						"category": "district",
						"code": "SZ-LU",
						"name": "Lubombo",
						"parent": ""
					},
					"SZ-MA": {
						"category": "district",
						"code": "SZ-MA",
						"name": "Manzini",
						"parent": ""
					},
					"SZ-SH": {
						"category": "district",
						"code": "SZ-SH",
						"name": "Shiselweni",
						"parent": ""
					}
				}
			},
			"SXM": {
				"threeLetterCode": "SXM",
				"shortName": "Sint Maarten (Dutch part)",
				"shortNameUpperCase": "SINT MAARTEN (DUTCH PART)",
				"fullName": "Sint Maarten (Dutch part)",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"SYC": {
				"threeLetterCode": "SYC",
				"shortName": "Seychelles",
				"shortNameUpperCase": "SEYCHELLES",
				"fullName": "the Republic of Seychelles",
				"subdivisionLabel": "district",
				"subdivisions": {
					"SC-01": {
						"category": "district",
						"code": "SC-01",
						"name": "Anse aux Pins",
						"parent": ""
					},
					"SC-02": {
						"category": "district",
						"code": "SC-02",
						"name": "Anse Boileau",
						"parent": ""
					},
					"SC-03": {
						"category": "district",
						"code": "SC-03",
						"name": "Anse Etoile",
						"parent": ""
					},
					"SC-04": {
						"category": "district",
						"code": "SC-04",
						"name": "Au Cap",
						"parent": ""
					},
					"SC-05": {
						"category": "district",
						"code": "SC-05",
						"name": "Anse Royale",
						"parent": ""
					},
					"SC-06": {
						"category": "district",
						"code": "SC-06",
						"name": "Baie Lazare",
						"parent": ""
					},
					"SC-07": {
						"category": "district",
						"code": "SC-07",
						"name": "Baie Sainte Anne",
						"parent": ""
					},
					"SC-08": {
						"category": "district",
						"code": "SC-08",
						"name": "Beau Vallon",
						"parent": ""
					},
					"SC-09": {
						"category": "district",
						"code": "SC-09",
						"name": "Bel Air",
						"parent": ""
					},
					"SC-10": {
						"category": "district",
						"code": "SC-10",
						"name": "Bel Ombre",
						"parent": ""
					},
					"SC-11": {
						"category": "district",
						"code": "SC-11",
						"name": "Cascade",
						"parent": ""
					},
					"SC-12": {
						"category": "district",
						"code": "SC-12",
						"name": "Glacis",
						"parent": ""
					},
					"SC-13": {
						"category": "district",
						"code": "SC-13",
						"name": "Grand Anse Mahe",
						"parent": ""
					},
					"SC-14": {
						"category": "district",
						"code": "SC-14",
						"name": "Grand Anse Praslin",
						"parent": ""
					},
					"SC-15": {
						"category": "district",
						"code": "SC-15",
						"name": "La Digue",
						"parent": ""
					},
					"SC-16": {
						"category": "district",
						"code": "SC-16",
						"name": "English River",
						"parent": ""
					},
					"SC-17": {
						"category": "district",
						"code": "SC-17",
						"name": "Mont Buxton",
						"parent": ""
					},
					"SC-18": {
						"category": "district",
						"code": "SC-18",
						"name": "Mont Fleuri",
						"parent": ""
					},
					"SC-19": {
						"category": "district",
						"code": "SC-19",
						"name": "Plaisance",
						"parent": ""
					},
					"SC-20": {
						"category": "district",
						"code": "SC-20",
						"name": "Pointe Larue",
						"parent": ""
					},
					"SC-21": {
						"category": "district",
						"code": "SC-21",
						"name": "Port Glaud",
						"parent": ""
					},
					"SC-22": {
						"category": "district",
						"code": "SC-22",
						"name": "Saint Louis",
						"parent": ""
					},
					"SC-23": {
						"category": "district",
						"code": "SC-23",
						"name": "Takamaka",
						"parent": ""
					},
					"SC-24": {
						"category": "district",
						"code": "SC-24",
						"name": "Les Mamelles",
						"parent": ""
					},
					"SC-25": {
						"category": "district",
						"code": "SC-25",
						"name": "Roche Caiman",
						"parent": ""
					}
				}
			},
			"SYR": {
				"threeLetterCode": "SYR",
				"shortName": "Syrian Arab Republic",
				"shortNameUpperCase": "SYRIAN ARAB REPUBLIC",
				"fullName": "the Syrian Arab Republic",
				"subdivisionLabel": "province",
				"subdivisions": {
					"SY-DI": {
						"category": "province",
						"code": "SY-DI",
						"name": "Dimashq",
						"parent": ""
					},
					"SY-DR": {
						"category": "province",
						"code": "SY-DR",
						"name": "Dar'ā",
						"parent": ""
					},
					"SY-DY": {
						"category": "province",
						"code": "SY-DY",
						"name": "Dayr az Zawr",
						"parent": ""
					},
					"SY-HA": {
						"category": "province",
						"code": "SY-HA",
						"name": "Al Ḩasakah",
						"parent": ""
					},
					"SY-HI": {
						"category": "province",
						"code": "SY-HI",
						"name": "Ḩimş",
						"parent": ""
					},
					"SY-HL": {
						"category": "province",
						"code": "SY-HL",
						"name": "Ḩalab",
						"parent": ""
					},
					"SY-HM": {
						"category": "province",
						"code": "SY-HM",
						"name": "Ḩamāh",
						"parent": ""
					},
					"SY-ID": {
						"category": "province",
						"code": "SY-ID",
						"name": "Idlib",
						"parent": ""
					},
					"SY-LA": {
						"category": "province",
						"code": "SY-LA",
						"name": "Al Lādhiqīyah",
						"parent": ""
					},
					"SY-QU": {
						"category": "province",
						"code": "SY-QU",
						"name": "Al Qunayţirah",
						"parent": ""
					},
					"SY-RA": {
						"category": "province",
						"code": "SY-RA",
						"name": "Ar Raqqah",
						"parent": ""
					},
					"SY-RD": {
						"category": "province",
						"code": "SY-RD",
						"name": "Rīf Dimashq",
						"parent": ""
					},
					"SY-SU": {
						"category": "province",
						"code": "SY-SU",
						"name": "As Suwaydā'",
						"parent": ""
					},
					"SY-TA": {
						"category": "province",
						"code": "SY-TA",
						"name": "Ţarţūs",
						"parent": ""
					}
				}
			},
			"TCA": {
				"commonName": "Turks and Caicos Islands",
				"threeLetterCode": "TCA",
				"shortName": "Turks and Caicos Islands (the)",
				"shortNameUpperCase": "TURKS AND CAICOS ISLANDS",
				"fullName": "the Turks and Caicos Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"TCD": {
				"threeLetterCode": "TCD",
				"shortName": "Chad",
				"shortNameUpperCase": "CHAD",
				"fullName": "the Republic of Chad",
				"subdivisionLabel": "region",
				"subdivisions": {
					"TD-BA": {
						"category": "region",
						"code": "TD-BA",
						"name": "Al Baţḩah",
						"parent": ""
					},
					"TD-BG": {
						"category": "region",
						"code": "TD-BG",
						"name": "Baḩr al Ghazāl",
						"parent": ""
					},
					"TD-BO": {
						"category": "region",
						"code": "TD-BO",
						"name": "Būrkū",
						"parent": ""
					},
					"TD-CB": {
						"category": "region",
						"code": "TD-CB",
						"name": "Shārī Bāqirmī",
						"parent": ""
					},
					"TD-EE": {
						"category": "region",
						"code": "TD-EE",
						"name": "Ennedi-Est",
						"parent": ""
					},
					"TD-EO": {
						"category": "region",
						"code": "TD-EO",
						"name": "Ennedi-Ouest",
						"parent": ""
					},
					"TD-GR": {
						"category": "region",
						"code": "TD-GR",
						"name": "Qīrā",
						"parent": ""
					},
					"TD-HL": {
						"category": "region",
						"code": "TD-HL",
						"name": "Ḩajjar Lamīs",
						"parent": ""
					},
					"TD-KA": {
						"category": "region",
						"code": "TD-KA",
						"name": "Kānim",
						"parent": ""
					},
					"TD-LC": {
						"category": "region",
						"code": "TD-LC",
						"name": "Al Buḩayrah",
						"parent": ""
					},
					"TD-LO": {
						"category": "region",
						"code": "TD-LO",
						"name": "Lūqūn al Gharbī",
						"parent": ""
					},
					"TD-LR": {
						"category": "region",
						"code": "TD-LR",
						"name": "Lūqūn ash Sharqī",
						"parent": ""
					},
					"TD-MA": {
						"category": "region",
						"code": "TD-MA",
						"name": "Māndūl",
						"parent": ""
					},
					"TD-MC": {
						"category": "region",
						"code": "TD-MC",
						"name": "Shārī al Awsaţ",
						"parent": ""
					},
					"TD-ME": {
						"category": "region",
						"code": "TD-ME",
						"name": "Māyū Kībbī ash Sharqī",
						"parent": ""
					},
					"TD-MO": {
						"category": "region",
						"code": "TD-MO",
						"name": "Māyū Kībbī al Gharbī",
						"parent": ""
					},
					"TD-ND": {
						"category": "region",
						"code": "TD-ND",
						"name": "Madīnat Injamīnā",
						"parent": ""
					},
					"TD-OD": {
						"category": "region",
						"code": "TD-OD",
						"name": "Waddāy",
						"parent": ""
					},
					"TD-SA": {
						"category": "region",
						"code": "TD-SA",
						"name": "Salāmāt",
						"parent": ""
					},
					"TD-SI": {
						"category": "region",
						"code": "TD-SI",
						"name": "Sīlā",
						"parent": ""
					},
					"TD-TA": {
						"category": "region",
						"code": "TD-TA",
						"name": "Tānjilī",
						"parent": ""
					},
					"TD-TI": {
						"category": "region",
						"code": "TD-TI",
						"name": "Tibastī",
						"parent": ""
					},
					"TD-WF": {
						"category": "region",
						"code": "TD-WF",
						"name": "Wādī Fīrā",
						"parent": ""
					}
				}
			},
			"TGO": {
				"threeLetterCode": "TGO",
				"shortName": "Togo",
				"shortNameUpperCase": "TOGO",
				"fullName": "the Togolese Republic",
				"subdivisionLabel": "region",
				"subdivisions": {
					"TG-C": {
						"category": "region",
						"code": "TG-C",
						"name": "Centrale",
						"parent": ""
					},
					"TG-K": {
						"category": "region",
						"code": "TG-K",
						"name": "Kara",
						"parent": ""
					},
					"TG-M": {
						"category": "region",
						"code": "TG-M",
						"name": "Maritime (Région)",
						"parent": ""
					},
					"TG-P": {
						"category": "region",
						"code": "TG-P",
						"name": "Plateaux",
						"parent": ""
					},
					"TG-S": {
						"category": "region",
						"code": "TG-S",
						"name": "Savanes",
						"parent": ""
					}
				}
			},
			"THA": {
				"threeLetterCode": "THA",
				"shortName": "Thailand",
				"shortNameUpperCase": "THAILAND",
				"fullName": "the Kingdom of Thailand",
				"subdivisionLabel": "province",
				"subdivisions": {
					"TH-10": {
						"category": "metropolitan administration",
						"code": "TH-10",
						"name": "Krung Thep Maha Nakhon",
						"parent": ""
					},
					"TH-11": {
						"category": "province",
						"code": "TH-11",
						"name": "Samut Prakan",
						"parent": ""
					},
					"TH-12": {
						"category": "province",
						"code": "TH-12",
						"name": "Nonthaburi",
						"parent": ""
					},
					"TH-13": {
						"category": "province",
						"code": "TH-13",
						"name": "Pathum Thani",
						"parent": ""
					},
					"TH-14": {
						"category": "province",
						"code": "TH-14",
						"name": "Phra Nakhon Si Ayutthaya",
						"parent": ""
					},
					"TH-15": {
						"category": "province",
						"code": "TH-15",
						"name": "Ang Thong",
						"parent": ""
					},
					"TH-16": {
						"category": "province",
						"code": "TH-16",
						"name": "Lop Buri",
						"parent": ""
					},
					"TH-17": {
						"category": "province",
						"code": "TH-17",
						"name": "Sing Buri",
						"parent": ""
					},
					"TH-18": {
						"category": "province",
						"code": "TH-18",
						"name": "Chai Nat",
						"parent": ""
					},
					"TH-19": {
						"category": "province",
						"code": "TH-19",
						"name": "Saraburi",
						"parent": ""
					},
					"TH-20": {
						"category": "province",
						"code": "TH-20",
						"name": "Chon Buri",
						"parent": ""
					},
					"TH-21": {
						"category": "province",
						"code": "TH-21",
						"name": "Rayong",
						"parent": ""
					},
					"TH-22": {
						"category": "province",
						"code": "TH-22",
						"name": "Chanthaburi",
						"parent": ""
					},
					"TH-23": {
						"category": "province",
						"code": "TH-23",
						"name": "Trat",
						"parent": ""
					},
					"TH-24": {
						"category": "province",
						"code": "TH-24",
						"name": "Chachoengsao",
						"parent": ""
					},
					"TH-25": {
						"category": "province",
						"code": "TH-25",
						"name": "Prachin Buri",
						"parent": ""
					},
					"TH-26": {
						"category": "province",
						"code": "TH-26",
						"name": "Nakhon Nayok",
						"parent": ""
					},
					"TH-27": {
						"category": "province",
						"code": "TH-27",
						"name": "Sa Kaeo",
						"parent": ""
					},
					"TH-30": {
						"category": "province",
						"code": "TH-30",
						"name": "Nakhon Ratchasima",
						"parent": ""
					},
					"TH-31": {
						"category": "province",
						"code": "TH-31",
						"name": "Buri Ram",
						"parent": ""
					},
					"TH-32": {
						"category": "province",
						"code": "TH-32",
						"name": "Surin",
						"parent": ""
					},
					"TH-33": {
						"category": "province",
						"code": "TH-33",
						"name": "Si Sa Ket",
						"parent": ""
					},
					"TH-34": {
						"category": "province",
						"code": "TH-34",
						"name": "Ubon Ratchathani",
						"parent": ""
					},
					"TH-35": {
						"category": "province",
						"code": "TH-35",
						"name": "Yasothon",
						"parent": ""
					},
					"TH-36": {
						"category": "province",
						"code": "TH-36",
						"name": "Chaiyaphum",
						"parent": ""
					},
					"TH-37": {
						"category": "province",
						"code": "TH-37",
						"name": "Amnat Charoen",
						"parent": ""
					},
					"TH-38": {
						"category": "province",
						"code": "TH-38",
						"name": "Bueng Kan",
						"parent": ""
					},
					"TH-39": {
						"category": "province",
						"code": "TH-39",
						"name": "Nong Bua Lam Phu",
						"parent": ""
					},
					"TH-40": {
						"category": "province",
						"code": "TH-40",
						"name": "Khon Kaen",
						"parent": ""
					},
					"TH-41": {
						"category": "province",
						"code": "TH-41",
						"name": "Udon Thani",
						"parent": ""
					},
					"TH-42": {
						"category": "province",
						"code": "TH-42",
						"name": "Loei",
						"parent": ""
					},
					"TH-43": {
						"category": "province",
						"code": "TH-43",
						"name": "Nong Khai",
						"parent": ""
					},
					"TH-44": {
						"category": "province",
						"code": "TH-44",
						"name": "Maha Sarakham",
						"parent": ""
					},
					"TH-45": {
						"category": "province",
						"code": "TH-45",
						"name": "Roi Et",
						"parent": ""
					},
					"TH-46": {
						"category": "province",
						"code": "TH-46",
						"name": "Kalasin",
						"parent": ""
					},
					"TH-47": {
						"category": "province",
						"code": "TH-47",
						"name": "Sakon Nakhon",
						"parent": ""
					},
					"TH-48": {
						"category": "province",
						"code": "TH-48",
						"name": "Nakhon Phanom",
						"parent": ""
					},
					"TH-49": {
						"category": "province",
						"code": "TH-49",
						"name": "Mukdahan",
						"parent": ""
					},
					"TH-50": {
						"category": "province",
						"code": "TH-50",
						"name": "Chiang Mai",
						"parent": ""
					},
					"TH-51": {
						"category": "province",
						"code": "TH-51",
						"name": "Lamphun",
						"parent": ""
					},
					"TH-52": {
						"category": "province",
						"code": "TH-52",
						"name": "Lampang",
						"parent": ""
					},
					"TH-53": {
						"category": "province",
						"code": "TH-53",
						"name": "Uttaradit",
						"parent": ""
					},
					"TH-54": {
						"category": "province",
						"code": "TH-54",
						"name": "Phrae",
						"parent": ""
					},
					"TH-55": {
						"category": "province",
						"code": "TH-55",
						"name": "Nan",
						"parent": ""
					},
					"TH-56": {
						"category": "province",
						"code": "TH-56",
						"name": "Phayao",
						"parent": ""
					},
					"TH-57": {
						"category": "province",
						"code": "TH-57",
						"name": "Chiang Rai",
						"parent": ""
					},
					"TH-58": {
						"category": "province",
						"code": "TH-58",
						"name": "Mae Hong Son",
						"parent": ""
					},
					"TH-60": {
						"category": "province",
						"code": "TH-60",
						"name": "Nakhon Sawan",
						"parent": ""
					},
					"TH-61": {
						"category": "province",
						"code": "TH-61",
						"name": "Uthai Thani",
						"parent": ""
					},
					"TH-62": {
						"category": "province",
						"code": "TH-62",
						"name": "Kamphaeng Phet",
						"parent": ""
					},
					"TH-63": {
						"category": "province",
						"code": "TH-63",
						"name": "Tak",
						"parent": ""
					},
					"TH-64": {
						"category": "province",
						"code": "TH-64",
						"name": "Sukhothai",
						"parent": ""
					},
					"TH-65": {
						"category": "province",
						"code": "TH-65",
						"name": "Phitsanulok",
						"parent": ""
					},
					"TH-66": {
						"category": "province",
						"code": "TH-66",
						"name": "Phichit",
						"parent": ""
					},
					"TH-67": {
						"category": "province",
						"code": "TH-67",
						"name": "Phetchabun",
						"parent": ""
					},
					"TH-70": {
						"category": "province",
						"code": "TH-70",
						"name": "Ratchaburi",
						"parent": ""
					},
					"TH-71": {
						"category": "province",
						"code": "TH-71",
						"name": "Kanchanaburi",
						"parent": ""
					},
					"TH-72": {
						"category": "province",
						"code": "TH-72",
						"name": "Suphan Buri",
						"parent": ""
					},
					"TH-73": {
						"category": "province",
						"code": "TH-73",
						"name": "Nakhon Pathom",
						"parent": ""
					},
					"TH-74": {
						"category": "province",
						"code": "TH-74",
						"name": "Samut Sakhon",
						"parent": ""
					},
					"TH-75": {
						"category": "province",
						"code": "TH-75",
						"name": "Samut Songkhram",
						"parent": ""
					},
					"TH-76": {
						"category": "province",
						"code": "TH-76",
						"name": "Phetchaburi",
						"parent": ""
					},
					"TH-77": {
						"category": "province",
						"code": "TH-77",
						"name": "Prachuap Khiri Khan",
						"parent": ""
					},
					"TH-80": {
						"category": "province",
						"code": "TH-80",
						"name": "Nakhon Si Thammarat",
						"parent": ""
					},
					"TH-81": {
						"category": "province",
						"code": "TH-81",
						"name": "Krabi",
						"parent": ""
					},
					"TH-82": {
						"category": "province",
						"code": "TH-82",
						"name": "Phangnga",
						"parent": ""
					},
					"TH-83": {
						"category": "province",
						"code": "TH-83",
						"name": "Phuket",
						"parent": ""
					},
					"TH-84": {
						"category": "province",
						"code": "TH-84",
						"name": "Surat Thani",
						"parent": ""
					},
					"TH-85": {
						"category": "province",
						"code": "TH-85",
						"name": "Ranong",
						"parent": ""
					},
					"TH-86": {
						"category": "province",
						"code": "TH-86",
						"name": "Chumphon",
						"parent": ""
					},
					"TH-90": {
						"category": "province",
						"code": "TH-90",
						"name": "Songkhla",
						"parent": ""
					},
					"TH-91": {
						"category": "province",
						"code": "TH-91",
						"name": "Satun",
						"parent": ""
					},
					"TH-92": {
						"category": "province",
						"code": "TH-92",
						"name": "Trang",
						"parent": ""
					},
					"TH-93": {
						"category": "province",
						"code": "TH-93",
						"name": "Phatthalung",
						"parent": ""
					},
					"TH-94": {
						"category": "province",
						"code": "TH-94",
						"name": "Pattani",
						"parent": ""
					},
					"TH-95": {
						"category": "province",
						"code": "TH-95",
						"name": "Yala",
						"parent": ""
					},
					"TH-96": {
						"category": "province",
						"code": "TH-96",
						"name": "Narathiwat",
						"parent": ""
					},
					"TH-S": {
						"category": "special administrative city",
						"code": "TH-S",
						"name": "Phatthaya",
						"parent": ""
					}
				}
			},
			"TJK": {
				"threeLetterCode": "TJK",
				"shortName": "Tajikistan",
				"shortNameUpperCase": "TAJIKISTAN",
				"fullName": "the Republic of Tajikistan",
				"subdivisionLabel": "subdivision",
				"subdivisions": {
					"TJ-DU": {
						"category": "capital territory",
						"code": "TJ-DU",
						"name": "Dushanbe",
						"parent": ""
					},
					"TJ-GB": {
						"category": "autonomous region",
						"code": "TJ-GB",
						"name": "Kŭhistoni Badakhshon",
						"parent": ""
					},
					"TJ-KT": {
						"category": "region",
						"code": "TJ-KT",
						"name": "Khatlon",
						"parent": ""
					},
					"TJ-RA": {
						"category": "districts under republic administration",
						"code": "TJ-RA",
						"name": "nohiyahoi tobei jumhurí",
						"parent": ""
					},
					"TJ-SU": {
						"category": "region",
						"code": "TJ-SU",
						"name": "Sughd",
						"parent": ""
					}
				}
			},
			"TKL": {
				"threeLetterCode": "TKL",
				"shortName": "Tokelau",
				"shortNameUpperCase": "TOKELAU",
				"fullName": "Tokelau",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"TKM": {
				"threeLetterCode": "TKM",
				"shortName": "Turkmenistan",
				"shortNameUpperCase": "TURKMENISTAN",
				"fullName": "Turkmenistan",
				"subdivisionLabel": "region",
				"subdivisions": {
					"TM-A": {
						"category": "region",
						"code": "TM-A",
						"name": "Ahal",
						"parent": ""
					},
					"TM-B": {
						"category": "region",
						"code": "TM-B",
						"name": "Balkan",
						"parent": ""
					},
					"TM-D": {
						"category": "region",
						"code": "TM-D",
						"name": "Daşoguz",
						"parent": ""
					},
					"TM-L": {
						"category": "region",
						"code": "TM-L",
						"name": "Lebap",
						"parent": ""
					},
					"TM-M": {
						"category": "region",
						"code": "TM-M",
						"name": "Mary",
						"parent": ""
					},
					"TM-S": {
						"category": "city",
						"code": "TM-S",
						"name": "Aşgabat",
						"parent": ""
					}
				}
			},
			"TLS": {
				"threeLetterCode": "TLS",
				"shortName": "Timor-Leste",
				"shortNameUpperCase": "TIMOR-LESTE",
				"fullName": "the Democratic Republic of Timor-Leste",
				"subdivisionLabel": "district",
				"subdivisions": {
					"TL-AL": {
						"category": "district",
						"code": "TL-AL",
						"name": "Aileu",
						"parent": ""
					},
					"TL-AN": {
						"category": "district",
						"code": "TL-AN",
						"name": "Ainaru",
						"parent": ""
					},
					"TL-BA": {
						"category": "district",
						"code": "TL-BA",
						"name": "Baukau",
						"parent": ""
					},
					"TL-BO": {
						"category": "district",
						"code": "TL-BO",
						"name": "Bobonaru",
						"parent": ""
					},
					"TL-CO": {
						"category": "district",
						"code": "TL-CO",
						"name": "Kovalima",
						"parent": ""
					},
					"TL-DI": {
						"category": "district",
						"code": "TL-DI",
						"name": "Díli",
						"parent": ""
					},
					"TL-ER": {
						"category": "district",
						"code": "TL-ER",
						"name": "Ermera",
						"parent": ""
					},
					"TL-LA": {
						"category": "district",
						"code": "TL-LA",
						"name": "Lautém",
						"parent": ""
					},
					"TL-LI": {
						"category": "district",
						"code": "TL-LI",
						"name": "Likisá",
						"parent": ""
					},
					"TL-MF": {
						"category": "district",
						"code": "TL-MF",
						"name": "Manufahi",
						"parent": ""
					},
					"TL-MT": {
						"category": "district",
						"code": "TL-MT",
						"name": "Manatutu",
						"parent": ""
					},
					"TL-OE": {
						"category": "district",
						"code": "TL-OE",
						"name": "Oekusi-Ambenu",
						"parent": ""
					},
					"TL-VI": {
						"category": "district",
						"code": "TL-VI",
						"name": "Vikeke",
						"parent": ""
					}
				}
			},
			"TON": {
				"threeLetterCode": "TON",
				"shortName": "Tonga",
				"shortNameUpperCase": "TONGA",
				"fullName": "the Kingdom of Tonga",
				"subdivisionLabel": "division",
				"subdivisions": {
					"TO-01": {
						"category": "division",
						"code": "TO-01",
						"name": "'Eua",
						"parent": ""
					},
					"TO-02": {
						"category": "division",
						"code": "TO-02",
						"name": "Ha'apai",
						"parent": ""
					},
					"TO-03": {
						"category": "division",
						"code": "TO-03",
						"name": "Niuas",
						"parent": ""
					},
					"TO-04": {
						"category": "division",
						"code": "TO-04",
						"name": "Tongatapu",
						"parent": ""
					},
					"TO-05": {
						"category": "division",
						"code": "TO-05",
						"name": "Vava'u",
						"parent": ""
					}
				}
			},
			"TTO": {
				"threeLetterCode": "TTO",
				"shortName": "Trinidad and Tobago",
				"shortNameUpperCase": "TRINIDAD AND TOBAGO",
				"fullName": "the Republic of Trinidad and Tobago",
				"subdivisionLabel": "region",
				"subdivisions": {
					"TT-ARI": {
						"category": "municipality",
						"code": "TT-ARI",
						"name": "Arima",
						"parent": ""
					},
					"TT-CHA": {
						"category": "municipality",
						"code": "TT-CHA",
						"name": "Chaguanas",
						"parent": ""
					},
					"TT-CTT": {
						"category": "region",
						"code": "TT-CTT",
						"name": "Couva-Tabaquite-Talparo",
						"parent": ""
					},
					"TT-DMN": {
						"category": "region",
						"code": "TT-DMN",
						"name": "Diego Martin",
						"parent": ""
					},
					"TT-MRC": {
						"category": "region",
						"code": "TT-MRC",
						"name": "Mayaro-Rio Claro",
						"parent": ""
					},
					"TT-PED": {
						"category": "region",
						"code": "TT-PED",
						"name": "Penal-Debe",
						"parent": ""
					},
					"TT-POS": {
						"category": "municipality",
						"code": "TT-POS",
						"name": "Port of Spain",
						"parent": ""
					},
					"TT-PRT": {
						"category": "region",
						"code": "TT-PRT",
						"name": "Princes Town",
						"parent": ""
					},
					"TT-PTF": {
						"category": "municipality",
						"code": "TT-PTF",
						"name": "Point Fortin",
						"parent": ""
					},
					"TT-SFO": {
						"category": "municipality",
						"code": "TT-SFO",
						"name": "San Fernando",
						"parent": ""
					},
					"TT-SGE": {
						"category": "region",
						"code": "TT-SGE",
						"name": "Sangre Grande",
						"parent": ""
					},
					"TT-SIP": {
						"category": "region",
						"code": "TT-SIP",
						"name": "Siparia",
						"parent": ""
					},
					"TT-SJL": {
						"category": "region",
						"code": "TT-SJL",
						"name": "San Juan-Laventille",
						"parent": ""
					},
					"TT-TOB": {
						"category": "ward",
						"code": "TT-TOB",
						"name": "Tobago",
						"parent": ""
					},
					"TT-TUP": {
						"category": "region",
						"code": "TT-TUP",
						"name": "Tunapuna-Piarco",
						"parent": ""
					}
				}
			},
			"TUN": {
				"threeLetterCode": "TUN",
				"shortName": "Tunisia",
				"shortNameUpperCase": "TUNISIA",
				"fullName": "the Republic of Tunisia",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"TN-11": {
						"category": "governorate",
						"code": "TN-11",
						"name": "Tunis",
						"parent": ""
					},
					"TN-12": {
						"category": "governorate",
						"code": "TN-12",
						"name": "L'Ariana",
						"parent": ""
					},
					"TN-13": {
						"category": "governorate",
						"code": "TN-13",
						"name": "Ben Arous",
						"parent": ""
					},
					"TN-14": {
						"category": "governorate",
						"code": "TN-14",
						"name": "La Manouba",
						"parent": ""
					},
					"TN-21": {
						"category": "governorate",
						"code": "TN-21",
						"name": "Nabeul",
						"parent": ""
					},
					"TN-22": {
						"category": "governorate",
						"code": "TN-22",
						"name": "Zaghouan",
						"parent": ""
					},
					"TN-23": {
						"category": "governorate",
						"code": "TN-23",
						"name": "Bizerte",
						"parent": ""
					},
					"TN-31": {
						"category": "governorate",
						"code": "TN-31",
						"name": "Béja",
						"parent": ""
					},
					"TN-32": {
						"category": "governorate",
						"code": "TN-32",
						"name": "Jendouba",
						"parent": ""
					},
					"TN-33": {
						"category": "governorate",
						"code": "TN-33",
						"name": "Le Kef",
						"parent": ""
					},
					"TN-34": {
						"category": "governorate",
						"code": "TN-34",
						"name": "Siliana",
						"parent": ""
					},
					"TN-41": {
						"category": "governorate",
						"code": "TN-41",
						"name": "Kairouan",
						"parent": ""
					},
					"TN-42": {
						"category": "governorate",
						"code": "TN-42",
						"name": "Kasserine",
						"parent": ""
					},
					"TN-43": {
						"category": "governorate",
						"code": "TN-43",
						"name": "Sidi Bouzid",
						"parent": ""
					},
					"TN-51": {
						"category": "governorate",
						"code": "TN-51",
						"name": "Sousse",
						"parent": ""
					},
					"TN-52": {
						"category": "governorate",
						"code": "TN-52",
						"name": "Monastir",
						"parent": ""
					},
					"TN-53": {
						"category": "governorate",
						"code": "TN-53",
						"name": "Mahdia",
						"parent": ""
					},
					"TN-61": {
						"category": "governorate",
						"code": "TN-61",
						"name": "Sfax",
						"parent": ""
					},
					"TN-71": {
						"category": "governorate",
						"code": "TN-71",
						"name": "Gafsa",
						"parent": ""
					},
					"TN-72": {
						"category": "governorate",
						"code": "TN-72",
						"name": "Tozeur",
						"parent": ""
					},
					"TN-73": {
						"category": "governorate",
						"code": "TN-73",
						"name": "Kébili",
						"parent": ""
					},
					"TN-81": {
						"category": "governorate",
						"code": "TN-81",
						"name": "Gabès",
						"parent": ""
					},
					"TN-82": {
						"category": "governorate",
						"code": "TN-82",
						"name": "Médenine",
						"parent": ""
					},
					"TN-83": {
						"category": "governorate",
						"code": "TN-83",
						"name": "Tataouine",
						"parent": ""
					}
				}
			},
			"TUR": {
				"threeLetterCode": "TUR",
				"shortName": "Turkey",
				"shortNameUpperCase": "TURKEY",
				"fullName": "the Republic of Turkey",
				"subdivisionLabel": "province",
				"subdivisions": {
					"TR-01": {
						"category": "province",
						"code": "TR-01",
						"name": "Adana",
						"parent": ""
					},
					"TR-02": {
						"category": "province",
						"code": "TR-02",
						"name": "Adıyaman",
						"parent": ""
					},
					"TR-03": {
						"category": "province",
						"code": "TR-03",
						"name": "Afyonkarahisar",
						"parent": ""
					},
					"TR-04": {
						"category": "province",
						"code": "TR-04",
						"name": "Ağrı",
						"parent": ""
					},
					"TR-05": {
						"category": "province",
						"code": "TR-05",
						"name": "Amasya",
						"parent": ""
					},
					"TR-06": {
						"category": "province",
						"code": "TR-06",
						"name": "Ankara",
						"parent": ""
					},
					"TR-07": {
						"category": "province",
						"code": "TR-07",
						"name": "Antalya",
						"parent": ""
					},
					"TR-08": {
						"category": "province",
						"code": "TR-08",
						"name": "Artvin",
						"parent": ""
					},
					"TR-09": {
						"category": "province",
						"code": "TR-09",
						"name": "Aydın",
						"parent": ""
					},
					"TR-10": {
						"category": "province",
						"code": "TR-10",
						"name": "Balıkesir",
						"parent": ""
					},
					"TR-11": {
						"category": "province",
						"code": "TR-11",
						"name": "Bilecik",
						"parent": ""
					},
					"TR-12": {
						"category": "province",
						"code": "TR-12",
						"name": "Bingöl",
						"parent": ""
					},
					"TR-13": {
						"category": "province",
						"code": "TR-13",
						"name": "Bitlis",
						"parent": ""
					},
					"TR-14": {
						"category": "province",
						"code": "TR-14",
						"name": "Bolu",
						"parent": ""
					},
					"TR-15": {
						"category": "province",
						"code": "TR-15",
						"name": "Burdur",
						"parent": ""
					},
					"TR-16": {
						"category": "province",
						"code": "TR-16",
						"name": "Bursa",
						"parent": ""
					},
					"TR-17": {
						"category": "province",
						"code": "TR-17",
						"name": "Çanakkale",
						"parent": ""
					},
					"TR-18": {
						"category": "province",
						"code": "TR-18",
						"name": "Çankırı",
						"parent": ""
					},
					"TR-19": {
						"category": "province",
						"code": "TR-19",
						"name": "Çorum",
						"parent": ""
					},
					"TR-20": {
						"category": "province",
						"code": "TR-20",
						"name": "Denizli",
						"parent": ""
					},
					"TR-21": {
						"category": "province",
						"code": "TR-21",
						"name": "Diyarbakır",
						"parent": ""
					},
					"TR-22": {
						"category": "province",
						"code": "TR-22",
						"name": "Edirne",
						"parent": ""
					},
					"TR-23": {
						"category": "province",
						"code": "TR-23",
						"name": "Elazığ",
						"parent": ""
					},
					"TR-24": {
						"category": "province",
						"code": "TR-24",
						"name": "Erzincan",
						"parent": ""
					},
					"TR-25": {
						"category": "province",
						"code": "TR-25",
						"name": "Erzurum",
						"parent": ""
					},
					"TR-26": {
						"category": "province",
						"code": "TR-26",
						"name": "Eskişehir",
						"parent": ""
					},
					"TR-27": {
						"category": "province",
						"code": "TR-27",
						"name": "Gaziantep",
						"parent": ""
					},
					"TR-28": {
						"category": "province",
						"code": "TR-28",
						"name": "Giresun",
						"parent": ""
					},
					"TR-29": {
						"category": "province",
						"code": "TR-29",
						"name": "Gümüşhane",
						"parent": ""
					},
					"TR-30": {
						"category": "province",
						"code": "TR-30",
						"name": "Hakkâri",
						"parent": ""
					},
					"TR-31": {
						"category": "province",
						"code": "TR-31",
						"name": "Hatay",
						"parent": ""
					},
					"TR-32": {
						"category": "province",
						"code": "TR-32",
						"name": "Isparta",
						"parent": ""
					},
					"TR-33": {
						"category": "province",
						"code": "TR-33",
						"name": "Mersin",
						"parent": ""
					},
					"TR-34": {
						"category": "province",
						"code": "TR-34",
						"name": "İstanbul",
						"parent": ""
					},
					"TR-35": {
						"category": "province",
						"code": "TR-35",
						"name": "İzmir",
						"parent": ""
					},
					"TR-36": {
						"category": "province",
						"code": "TR-36",
						"name": "Kars",
						"parent": ""
					},
					"TR-37": {
						"category": "province",
						"code": "TR-37",
						"name": "Kastamonu",
						"parent": ""
					},
					"TR-38": {
						"category": "province",
						"code": "TR-38",
						"name": "Kayseri",
						"parent": ""
					},
					"TR-39": {
						"category": "province",
						"code": "TR-39",
						"name": "Kırklareli",
						"parent": ""
					},
					"TR-40": {
						"category": "province",
						"code": "TR-40",
						"name": "Kırşehir",
						"parent": ""
					},
					"TR-41": {
						"category": "province",
						"code": "TR-41",
						"name": "Kocaeli",
						"parent": ""
					},
					"TR-42": {
						"category": "province",
						"code": "TR-42",
						"name": "Konya",
						"parent": ""
					},
					"TR-43": {
						"category": "province",
						"code": "TR-43",
						"name": "Kütahya",
						"parent": ""
					},
					"TR-44": {
						"category": "province",
						"code": "TR-44",
						"name": "Malatya",
						"parent": ""
					},
					"TR-45": {
						"category": "province",
						"code": "TR-45",
						"name": "Manisa",
						"parent": ""
					},
					"TR-46": {
						"category": "province",
						"code": "TR-46",
						"name": "Kahramanmaraş",
						"parent": ""
					},
					"TR-47": {
						"category": "province",
						"code": "TR-47",
						"name": "Mardin",
						"parent": ""
					},
					"TR-48": {
						"category": "province",
						"code": "TR-48",
						"name": "Muğla",
						"parent": ""
					},
					"TR-49": {
						"category": "province",
						"code": "TR-49",
						"name": "Muş",
						"parent": ""
					},
					"TR-50": {
						"category": "province",
						"code": "TR-50",
						"name": "Nevşehir",
						"parent": ""
					},
					"TR-51": {
						"category": "province",
						"code": "TR-51",
						"name": "Niğde",
						"parent": ""
					},
					"TR-52": {
						"category": "province",
						"code": "TR-52",
						"name": "Ordu",
						"parent": ""
					},
					"TR-53": {
						"category": "province",
						"code": "TR-53",
						"name": "Rize",
						"parent": ""
					},
					"TR-54": {
						"category": "province",
						"code": "TR-54",
						"name": "Sakarya",
						"parent": ""
					},
					"TR-55": {
						"category": "province",
						"code": "TR-55",
						"name": "Samsun",
						"parent": ""
					},
					"TR-56": {
						"category": "province",
						"code": "TR-56",
						"name": "Siirt",
						"parent": ""
					},
					"TR-57": {
						"category": "province",
						"code": "TR-57",
						"name": "Sinop",
						"parent": ""
					},
					"TR-58": {
						"category": "province",
						"code": "TR-58",
						"name": "Sivas",
						"parent": ""
					},
					"TR-59": {
						"category": "province",
						"code": "TR-59",
						"name": "Tekirdağ",
						"parent": ""
					},
					"TR-60": {
						"category": "province",
						"code": "TR-60",
						"name": "Tokat",
						"parent": ""
					},
					"TR-61": {
						"category": "province",
						"code": "TR-61",
						"name": "Trabzon",
						"parent": ""
					},
					"TR-62": {
						"category": "province",
						"code": "TR-62",
						"name": "Tunceli",
						"parent": ""
					},
					"TR-63": {
						"category": "province",
						"code": "TR-63",
						"name": "Şanlıurfa",
						"parent": ""
					},
					"TR-64": {
						"category": "province",
						"code": "TR-64",
						"name": "Uşak",
						"parent": ""
					},
					"TR-65": {
						"category": "province",
						"code": "TR-65",
						"name": "Van",
						"parent": ""
					},
					"TR-66": {
						"category": "province",
						"code": "TR-66",
						"name": "Yozgat",
						"parent": ""
					},
					"TR-67": {
						"category": "province",
						"code": "TR-67",
						"name": "Zonguldak",
						"parent": ""
					},
					"TR-68": {
						"category": "province",
						"code": "TR-68",
						"name": "Aksaray",
						"parent": ""
					},
					"TR-69": {
						"category": "province",
						"code": "TR-69",
						"name": "Bayburt",
						"parent": ""
					},
					"TR-70": {
						"category": "province",
						"code": "TR-70",
						"name": "Karaman",
						"parent": ""
					},
					"TR-71": {
						"category": "province",
						"code": "TR-71",
						"name": "Kırıkkale",
						"parent": ""
					},
					"TR-72": {
						"category": "province",
						"code": "TR-72",
						"name": "Batman",
						"parent": ""
					},
					"TR-73": {
						"category": "province",
						"code": "TR-73",
						"name": "Şırnak",
						"parent": ""
					},
					"TR-74": {
						"category": "province",
						"code": "TR-74",
						"name": "Bartın",
						"parent": ""
					},
					"TR-75": {
						"category": "province",
						"code": "TR-75",
						"name": "Ardahan",
						"parent": ""
					},
					"TR-76": {
						"category": "province",
						"code": "TR-76",
						"name": "Iğdır",
						"parent": ""
					},
					"TR-77": {
						"category": "province",
						"code": "TR-77",
						"name": "Yalova",
						"parent": ""
					},
					"TR-78": {
						"category": "province",
						"code": "TR-78",
						"name": "Karabük",
						"parent": ""
					},
					"TR-79": {
						"category": "province",
						"code": "TR-79",
						"name": "Kilis",
						"parent": ""
					},
					"TR-80": {
						"category": "province",
						"code": "TR-80",
						"name": "Osmaniye",
						"parent": ""
					},
					"TR-81": {
						"category": "province",
						"code": "TR-81",
						"name": "Düzce",
						"parent": ""
					}
				}
			},
			"TUV": {
				"threeLetterCode": "TUV",
				"shortName": "Tuvalu",
				"shortNameUpperCase": "TUVALU",
				"fullName": "Tuvalu",
				"subdivisionLabel": "island council",
				"subdivisions": {
					"TV-FUN": {
						"category": "town council",
						"code": "TV-FUN",
						"name": "Funafuti",
						"parent": ""
					},
					"TV-NIT": {
						"category": "island council",
						"code": "TV-NIT",
						"name": "Niutao",
						"parent": ""
					},
					"TV-NKF": {
						"category": "island council",
						"code": "TV-NKF",
						"name": "Nukufetau",
						"parent": ""
					},
					"TV-NKL": {
						"category": "island council",
						"code": "TV-NKL",
						"name": "Nukulaelae",
						"parent": ""
					},
					"TV-NMA": {
						"category": "island council",
						"code": "TV-NMA",
						"name": "Nanumea",
						"parent": ""
					},
					"TV-NMG": {
						"category": "island council",
						"code": "TV-NMG",
						"name": "Nanumaga",
						"parent": ""
					},
					"TV-NUI": {
						"category": "island council",
						"code": "TV-NUI",
						"name": "Nui",
						"parent": ""
					},
					"TV-VAI": {
						"category": "island council",
						"code": "TV-VAI",
						"name": "Vaitupu",
						"parent": ""
					}
				}
			},
			"TWN": {
				"commonName": "Taiwan",
				"threeLetterCode": "TWN",
				"shortName": "Taiwan (Province of China)",
				"shortNameUpperCase": "TAIWAN, PROVINCE OF CHINA",
				"fullName": "Taiwan (Province of China)",
				"subdivisionLabel": "county",
				"subdivisions": {
					"TW-CHA": {
						"category": "county",
						"code": "TW-CHA",
						"name": "Changhua",
						"parent": ""
					},
					"TW-CYI": {
						"category": "city",
						"code": "TW-CYI",
						"name": "Chiayi",
						"parent": ""
					},
					"TW-CYQ": {
						"category": "county",
						"code": "TW-CYQ",
						"name": "Chiayi",
						"parent": ""
					},
					"TW-HSQ": {
						"category": "county",
						"code": "TW-HSQ",
						"name": "Hsinchu",
						"parent": ""
					},
					"TW-HSZ": {
						"category": "city",
						"code": "TW-HSZ",
						"name": "Hsinchu",
						"parent": ""
					},
					"TW-HUA": {
						"category": "county",
						"code": "TW-HUA",
						"name": "Hualien",
						"parent": ""
					},
					"TW-ILA": {
						"category": "county",
						"code": "TW-ILA",
						"name": "Yilan",
						"parent": ""
					},
					"TW-KEE": {
						"category": "city",
						"code": "TW-KEE",
						"name": "Keelung",
						"parent": ""
					},
					"TW-KHH": {
						"category": "special municipality",
						"code": "TW-KHH",
						"name": "Kaohsiung",
						"parent": ""
					},
					"TW-KIN": {
						"category": "county",
						"code": "TW-KIN",
						"name": "Kinmen",
						"parent": ""
					},
					"TW-LIE": {
						"category": "county",
						"code": "TW-LIE",
						"name": "Lienchiang",
						"parent": ""
					},
					"TW-MIA": {
						"category": "county",
						"code": "TW-MIA",
						"name": "Miaoli",
						"parent": ""
					},
					"TW-NAN": {
						"category": "county",
						"code": "TW-NAN",
						"name": "Nantou",
						"parent": ""
					},
					"TW-NWT": {
						"category": "special municipality",
						"code": "TW-NWT",
						"name": "New Taipei",
						"parent": ""
					},
					"TW-PEN": {
						"category": "county",
						"code": "TW-PEN",
						"name": "Penghu",
						"parent": ""
					},
					"TW-PIF": {
						"category": "county",
						"code": "TW-PIF",
						"name": "Pingtung",
						"parent": ""
					},
					"TW-TAO": {
						"category": "special municipality",
						"code": "TW-TAO",
						"name": "Taoyuan",
						"parent": ""
					},
					"TW-TNN": {
						"category": "special municipality",
						"code": "TW-TNN",
						"name": "Tainan",
						"parent": ""
					},
					"TW-TPE": {
						"category": "special municipality",
						"code": "TW-TPE",
						"name": "Taipei",
						"parent": ""
					},
					"TW-TTT": {
						"category": "county",
						"code": "TW-TTT",
						"name": "Taitung",
						"parent": ""
					},
					"TW-TXG": {
						"category": "special municipality",
						"code": "TW-TXG",
						"name": "Taichung",
						"parent": ""
					},
					"TW-YUN": {
						"category": "county",
						"code": "TW-YUN",
						"name": "Yunlin",
						"parent": ""
					}
				}
			},
			"TZA": {
				"commonName": "Tanzania",
				"threeLetterCode": "TZA",
				"shortName": "Tanzania, United Republic of",
				"shortNameUpperCase": "TANZANIA, UNITED REPUBLIC OF",
				"fullName": "the United Republic of Tanzania",
				"subdivisionLabel": "region",
				"subdivisions": {
					"TZ-01": {
						"category": "region",
						"code": "TZ-01",
						"name": "Arusha",
						"parent": ""
					},
					"TZ-02": {
						"category": "region",
						"code": "TZ-02",
						"name": "Dar es Salaam",
						"parent": ""
					},
					"TZ-03": {
						"category": "region",
						"code": "TZ-03",
						"name": "Dodoma",
						"parent": ""
					},
					"TZ-04": {
						"category": "region",
						"code": "TZ-04",
						"name": "Iringa",
						"parent": ""
					},
					"TZ-05": {
						"category": "region",
						"code": "TZ-05",
						"name": "Kagera",
						"parent": ""
					},
					"TZ-06": {
						"category": "region",
						"code": "TZ-06",
						"name": "Pemba North",
						"parent": ""
					},
					"TZ-07": {
						"category": "region",
						"code": "TZ-07",
						"name": "Zanzibar North",
						"parent": ""
					},
					"TZ-08": {
						"category": "region",
						"code": "TZ-08",
						"name": "Kigoma",
						"parent": ""
					},
					"TZ-09": {
						"category": "region",
						"code": "TZ-09",
						"name": "Kilimanjaro",
						"parent": ""
					},
					"TZ-10": {
						"category": "region",
						"code": "TZ-10",
						"name": "Pemba South",
						"parent": ""
					},
					"TZ-11": {
						"category": "region",
						"code": "TZ-11",
						"name": "Zanzibar South",
						"parent": ""
					},
					"TZ-12": {
						"category": "region",
						"code": "TZ-12",
						"name": "Lindi",
						"parent": ""
					},
					"TZ-13": {
						"category": "region",
						"code": "TZ-13",
						"name": "Mara",
						"parent": ""
					},
					"TZ-14": {
						"category": "region",
						"code": "TZ-14",
						"name": "Mbeya",
						"parent": ""
					},
					"TZ-15": {
						"category": "region",
						"code": "TZ-15",
						"name": "Zanzibar West",
						"parent": ""
					},
					"TZ-16": {
						"category": "region",
						"code": "TZ-16",
						"name": "Morogoro",
						"parent": ""
					},
					"TZ-17": {
						"category": "region",
						"code": "TZ-17",
						"name": "Mtwara",
						"parent": ""
					},
					"TZ-18": {
						"category": "region",
						"code": "TZ-18",
						"name": "Mwanza",
						"parent": ""
					},
					"TZ-19": {
						"category": "region",
						"code": "TZ-19",
						"name": "Coast",
						"parent": ""
					},
					"TZ-20": {
						"category": "region",
						"code": "TZ-20",
						"name": "Rukwa",
						"parent": ""
					},
					"TZ-21": {
						"category": "region",
						"code": "TZ-21",
						"name": "Ruvuma",
						"parent": ""
					},
					"TZ-22": {
						"category": "region",
						"code": "TZ-22",
						"name": "Shinyanga",
						"parent": ""
					},
					"TZ-23": {
						"category": "region",
						"code": "TZ-23",
						"name": "Singida",
						"parent": ""
					},
					"TZ-24": {
						"category": "region",
						"code": "TZ-24",
						"name": "Tabora",
						"parent": ""
					},
					"TZ-25": {
						"category": "region",
						"code": "TZ-25",
						"name": "Tanga",
						"parent": ""
					},
					"TZ-26": {
						"category": "region",
						"code": "TZ-26",
						"name": "Manyara",
						"parent": ""
					},
					"TZ-27": {
						"category": "region",
						"code": "TZ-27",
						"name": "Geita",
						"parent": ""
					},
					"TZ-28": {
						"category": "region",
						"code": "TZ-28",
						"name": "Katavi",
						"parent": ""
					},
					"TZ-29": {
						"category": "region",
						"code": "TZ-29",
						"name": "Njombe",
						"parent": ""
					},
					"TZ-30": {
						"category": "region",
						"code": "TZ-30",
						"name": "Simiyu",
						"parent": ""
					}
				}
			},
			"UGA": {
				"threeLetterCode": "UGA",
				"shortName": "Uganda",
				"shortNameUpperCase": "UGANDA",
				"fullName": "the Republic of Uganda",
				"subdivisionLabel": "district",
				"subdivisions": {
					"UG-101": {
						"category": "district",
						"code": "UG-101",
						"name": "Kalangala",
						"parent": "UG-C"
					},
					"UG-102": {
						"category": "city",
						"code": "UG-102",
						"name": "Kampala",
						"parent": "UG-C"
					},
					"UG-103": {
						"category": "district",
						"code": "UG-103",
						"name": "Kiboga",
						"parent": "UG-C"
					},
					"UG-104": {
						"category": "district",
						"code": "UG-104",
						"name": "Luwero",
						"parent": "UG-C"
					},
					"UG-105": {
						"category": "district",
						"code": "UG-105",
						"name": "Masaka",
						"parent": "UG-C"
					},
					"UG-106": {
						"category": "district",
						"code": "UG-106",
						"name": "Mpigi",
						"parent": "UG-C"
					},
					"UG-107": {
						"category": "district",
						"code": "UG-107",
						"name": "Mubende",
						"parent": "UG-C"
					},
					"UG-108": {
						"category": "district",
						"code": "UG-108",
						"name": "Mukono",
						"parent": "UG-C"
					},
					"UG-109": {
						"category": "district",
						"code": "UG-109",
						"name": "Nakasongola",
						"parent": "UG-C"
					},
					"UG-110": {
						"category": "district",
						"code": "UG-110",
						"name": "Rakai",
						"parent": "UG-C"
					},
					"UG-111": {
						"category": "district",
						"code": "UG-111",
						"name": "Sembabule",
						"parent": "UG-C"
					},
					"UG-112": {
						"category": "district",
						"code": "UG-112",
						"name": "Kayunga",
						"parent": "UG-C"
					},
					"UG-113": {
						"category": "district",
						"code": "UG-113",
						"name": "Wakiso",
						"parent": "UG-C"
					},
					"UG-114": {
						"category": "district",
						"code": "UG-114",
						"name": "Lyantonde",
						"parent": "UG-C"
					},
					"UG-115": {
						"category": "district",
						"code": "UG-115",
						"name": "Mityana",
						"parent": "UG-C"
					},
					"UG-116": {
						"category": "district",
						"code": "UG-116",
						"name": "Nakaseke",
						"parent": "UG-C"
					},
					"UG-117": {
						"category": "district",
						"code": "UG-117",
						"name": "Buikwe",
						"parent": "UG-C"
					},
					"UG-118": {
						"category": "district",
						"code": "UG-118",
						"name": "Bukomansibi",
						"parent": "UG-C"
					},
					"UG-119": {
						"category": "district",
						"code": "UG-119",
						"name": "Butambala",
						"parent": "UG-C"
					},
					"UG-120": {
						"category": "district",
						"code": "UG-120",
						"name": "Buvuma",
						"parent": "UG-C"
					},
					"UG-121": {
						"category": "district",
						"code": "UG-121",
						"name": "Gomba",
						"parent": "UG-C"
					},
					"UG-122": {
						"category": "district",
						"code": "UG-122",
						"name": "Kalungu",
						"parent": "UG-C"
					},
					"UG-123": {
						"category": "district",
						"code": "UG-123",
						"name": "Kyankwanzi",
						"parent": "UG-C"
					},
					"UG-124": {
						"category": "district",
						"code": "UG-124",
						"name": "Lwengo",
						"parent": "UG-C"
					},
					"UG-125": {
						"category": "district",
						"code": "UG-125",
						"name": "Kyotera",
						"parent": "UG-C"
					},
					"UG-201": {
						"category": "district",
						"code": "UG-201",
						"name": "Bugiri",
						"parent": "UG-E"
					},
					"UG-202": {
						"category": "district",
						"code": "UG-202",
						"name": "Busia",
						"parent": "UG-E"
					},
					"UG-203": {
						"category": "district",
						"code": "UG-203",
						"name": "Iganga",
						"parent": "UG-E"
					},
					"UG-204": {
						"category": "district",
						"code": "UG-204",
						"name": "Jinja",
						"parent": "UG-E"
					},
					"UG-205": {
						"category": "district",
						"code": "UG-205",
						"name": "Kamuli",
						"parent": "UG-E"
					},
					"UG-206": {
						"category": "district",
						"code": "UG-206",
						"name": "Kapchorwa",
						"parent": "UG-E"
					},
					"UG-207": {
						"category": "district",
						"code": "UG-207",
						"name": "Katakwi",
						"parent": "UG-E"
					},
					"UG-208": {
						"category": "district",
						"code": "UG-208",
						"name": "Kumi",
						"parent": "UG-E"
					},
					"UG-209": {
						"category": "district",
						"code": "UG-209",
						"name": "Mbale",
						"parent": "UG-E"
					},
					"UG-210": {
						"category": "district",
						"code": "UG-210",
						"name": "Pallisa",
						"parent": "UG-E"
					},
					"UG-211": {
						"category": "district",
						"code": "UG-211",
						"name": "Soroti",
						"parent": "UG-E"
					},
					"UG-212": {
						"category": "district",
						"code": "UG-212",
						"name": "Tororo",
						"parent": "UG-E"
					},
					"UG-213": {
						"category": "district",
						"code": "UG-213",
						"name": "Kaberamaido",
						"parent": "UG-E"
					},
					"UG-214": {
						"category": "district",
						"code": "UG-214",
						"name": "Mayuge",
						"parent": "UG-E"
					},
					"UG-215": {
						"category": "district",
						"code": "UG-215",
						"name": "Sironko",
						"parent": "UG-E"
					},
					"UG-216": {
						"category": "district",
						"code": "UG-216",
						"name": "Amuria",
						"parent": "UG-E"
					},
					"UG-217": {
						"category": "district",
						"code": "UG-217",
						"name": "Budaka",
						"parent": "UG-E"
					},
					"UG-218": {
						"category": "district",
						"code": "UG-218",
						"name": "Bududa",
						"parent": "UG-E"
					},
					"UG-219": {
						"category": "district",
						"code": "UG-219",
						"name": "Bukedea",
						"parent": "UG-E"
					},
					"UG-220": {
						"category": "district",
						"code": "UG-220",
						"name": "Bukwa",
						"parent": "UG-E"
					},
					"UG-221": {
						"category": "district",
						"code": "UG-221",
						"name": "Butaleja",
						"parent": "UG-E"
					},
					"UG-222": {
						"category": "district",
						"code": "UG-222",
						"name": "Kaliro",
						"parent": "UG-E"
					},
					"UG-223": {
						"category": "district",
						"code": "UG-223",
						"name": "Manafwa",
						"parent": "UG-E"
					},
					"UG-224": {
						"category": "district",
						"code": "UG-224",
						"name": "Namutumba",
						"parent": "UG-E"
					},
					"UG-225": {
						"category": "district",
						"code": "UG-225",
						"name": "Bulambuli",
						"parent": "UG-E"
					},
					"UG-226": {
						"category": "district",
						"code": "UG-226",
						"name": "Buyende",
						"parent": "UG-E"
					},
					"UG-227": {
						"category": "district",
						"code": "UG-227",
						"name": "Kibuku",
						"parent": "UG-E"
					},
					"UG-228": {
						"category": "district",
						"code": "UG-228",
						"name": "Kween",
						"parent": "UG-E"
					},
					"UG-229": {
						"category": "district",
						"code": "UG-229",
						"name": "Luuka",
						"parent": "UG-E"
					},
					"UG-230": {
						"category": "district",
						"code": "UG-230",
						"name": "Namayingo",
						"parent": "UG-E"
					},
					"UG-231": {
						"category": "district",
						"code": "UG-231",
						"name": "Ngora",
						"parent": "UG-E"
					},
					"UG-232": {
						"category": "district",
						"code": "UG-232",
						"name": "Serere",
						"parent": "UG-E"
					},
					"UG-233": {
						"category": "district",
						"code": "UG-233",
						"name": "Butebo",
						"parent": "UG-E"
					},
					"UG-234": {
						"category": "district",
						"code": "UG-234",
						"name": "Namisindwa",
						"parent": "UG-E"
					},
					"UG-301": {
						"category": "district",
						"code": "UG-301",
						"name": "Adjumani",
						"parent": "UG-N"
					},
					"UG-302": {
						"category": "district",
						"code": "UG-302",
						"name": "Apac",
						"parent": "UG-N"
					},
					"UG-303": {
						"category": "district",
						"code": "UG-303",
						"name": "Arua",
						"parent": "UG-N"
					},
					"UG-304": {
						"category": "district",
						"code": "UG-304",
						"name": "Gulu",
						"parent": "UG-N"
					},
					"UG-305": {
						"category": "district",
						"code": "UG-305",
						"name": "Kitgum",
						"parent": "UG-N"
					},
					"UG-306": {
						"category": "district",
						"code": "UG-306",
						"name": "Kotido",
						"parent": "UG-N"
					},
					"UG-307": {
						"category": "district",
						"code": "UG-307",
						"name": "Lira",
						"parent": "UG-N"
					},
					"UG-308": {
						"category": "district",
						"code": "UG-308",
						"name": "Moroto",
						"parent": "UG-N"
					},
					"UG-309": {
						"category": "district",
						"code": "UG-309",
						"name": "Moyo",
						"parent": "UG-N"
					},
					"UG-310": {
						"category": "district",
						"code": "UG-310",
						"name": "Nebbi",
						"parent": "UG-N"
					},
					"UG-311": {
						"category": "district",
						"code": "UG-311",
						"name": "Nakapiripirit",
						"parent": "UG-N"
					},
					"UG-312": {
						"category": "district",
						"code": "UG-312",
						"name": "Pader",
						"parent": "UG-N"
					},
					"UG-313": {
						"category": "district",
						"code": "UG-313",
						"name": "Yumbe",
						"parent": "UG-N"
					},
					"UG-314": {
						"category": "district",
						"code": "UG-314",
						"name": "Abim",
						"parent": "UG-N"
					},
					"UG-315": {
						"category": "district",
						"code": "UG-315",
						"name": "Amolatar",
						"parent": "UG-N"
					},
					"UG-316": {
						"category": "district",
						"code": "UG-316",
						"name": "Amuru",
						"parent": "UG-N"
					},
					"UG-317": {
						"category": "district",
						"code": "UG-317",
						"name": "Dokolo",
						"parent": "UG-N"
					},
					"UG-318": {
						"category": "district",
						"code": "UG-318",
						"name": "Kaabong",
						"parent": "UG-N"
					},
					"UG-319": {
						"category": "district",
						"code": "UG-319",
						"name": "Koboko",
						"parent": "UG-N"
					},
					"UG-320": {
						"category": "district",
						"code": "UG-320",
						"name": "Maracha",
						"parent": "UG-N"
					},
					"UG-321": {
						"category": "district",
						"code": "UG-321",
						"name": "Oyam",
						"parent": "UG-N"
					},
					"UG-322": {
						"category": "district",
						"code": "UG-322",
						"name": "Agago",
						"parent": "UG-N"
					},
					"UG-323": {
						"category": "district",
						"code": "UG-323",
						"name": "Alebtong",
						"parent": "UG-N"
					},
					"UG-324": {
						"category": "district",
						"code": "UG-324",
						"name": "Amudat",
						"parent": "UG-N"
					},
					"UG-325": {
						"category": "district",
						"code": "UG-325",
						"name": "Kole",
						"parent": "UG-N"
					},
					"UG-326": {
						"category": "district",
						"code": "UG-326",
						"name": "Lamwo",
						"parent": "UG-N"
					},
					"UG-327": {
						"category": "district",
						"code": "UG-327",
						"name": "Napak",
						"parent": "UG-N"
					},
					"UG-328": {
						"category": "district",
						"code": "UG-328",
						"name": "Nwoya",
						"parent": "UG-N"
					},
					"UG-329": {
						"category": "district",
						"code": "UG-329",
						"name": "Otuke",
						"parent": "UG-N"
					},
					"UG-330": {
						"category": "district",
						"code": "UG-330",
						"name": "Zombo",
						"parent": "UG-N"
					},
					"UG-331": {
						"category": "district",
						"code": "UG-331",
						"name": "Omoro",
						"parent": "UG-N"
					},
					"UG-332": {
						"category": "district",
						"code": "UG-332",
						"name": "Pakwach",
						"parent": "UG-N"
					},
					"UG-401": {
						"category": "district",
						"code": "UG-401",
						"name": "Bundibugyo",
						"parent": "UG-W"
					},
					"UG-402": {
						"category": "district",
						"code": "UG-402",
						"name": "Bushenyi",
						"parent": "UG-W"
					},
					"UG-403": {
						"category": "district",
						"code": "UG-403",
						"name": "Hoima",
						"parent": "UG-W"
					},
					"UG-404": {
						"category": "district",
						"code": "UG-404",
						"name": "Kabale",
						"parent": "UG-W"
					},
					"UG-405": {
						"category": "district",
						"code": "UG-405",
						"name": "Kabarole",
						"parent": "UG-W"
					},
					"UG-406": {
						"category": "district",
						"code": "UG-406",
						"name": "Kasese",
						"parent": "UG-W"
					},
					"UG-407": {
						"category": "district",
						"code": "UG-407",
						"name": "Kibaale",
						"parent": "UG-W"
					},
					"UG-408": {
						"category": "district",
						"code": "UG-408",
						"name": "Kisoro",
						"parent": "UG-W"
					},
					"UG-409": {
						"category": "district",
						"code": "UG-409",
						"name": "Masindi",
						"parent": "UG-W"
					},
					"UG-410": {
						"category": "district",
						"code": "UG-410",
						"name": "Mbarara",
						"parent": "UG-W"
					},
					"UG-411": {
						"category": "district",
						"code": "UG-411",
						"name": "Ntungamo",
						"parent": "UG-W"
					},
					"UG-412": {
						"category": "district",
						"code": "UG-412",
						"name": "Rukungiri",
						"parent": "UG-W"
					},
					"UG-413": {
						"category": "district",
						"code": "UG-413",
						"name": "Kamwenge",
						"parent": "UG-W"
					},
					"UG-414": {
						"category": "district",
						"code": "UG-414",
						"name": "Kanungu",
						"parent": "UG-W"
					},
					"UG-415": {
						"category": "district",
						"code": "UG-415",
						"name": "Kyenjojo",
						"parent": "UG-W"
					},
					"UG-416": {
						"category": "district",
						"code": "UG-416",
						"name": "Buliisa",
						"parent": "UG-W"
					},
					"UG-417": {
						"category": "district",
						"code": "UG-417",
						"name": "Ibanda",
						"parent": "UG-W"
					},
					"UG-418": {
						"category": "district",
						"code": "UG-418",
						"name": "Isingiro",
						"parent": "UG-W"
					},
					"UG-419": {
						"category": "district",
						"code": "UG-419",
						"name": "Kiruhura",
						"parent": "UG-W"
					},
					"UG-420": {
						"category": "district",
						"code": "UG-420",
						"name": "Buhweju",
						"parent": "UG-W"
					},
					"UG-421": {
						"category": "district",
						"code": "UG-421",
						"name": "Kiryandongo",
						"parent": "UG-W"
					},
					"UG-422": {
						"category": "district",
						"code": "UG-422",
						"name": "Kyegegwa",
						"parent": "UG-W"
					},
					"UG-423": {
						"category": "district",
						"code": "UG-423",
						"name": "Mitooma",
						"parent": "UG-W"
					},
					"UG-424": {
						"category": "district",
						"code": "UG-424",
						"name": "Ntoroko",
						"parent": "UG-W"
					},
					"UG-425": {
						"category": "district",
						"code": "UG-425",
						"name": "Rubirizi",
						"parent": "UG-W"
					},
					"UG-426": {
						"category": "district",
						"code": "UG-426",
						"name": "Sheema",
						"parent": "UG-W"
					},
					"UG-427": {
						"category": "district",
						"code": "UG-427",
						"name": "Kagadi",
						"parent": "UG-W"
					},
					"UG-428": {
						"category": "district",
						"code": "UG-428",
						"name": "Kakumiro",
						"parent": "UG-W"
					},
					"UG-429": {
						"category": "district",
						"code": "UG-429",
						"name": "Rubanda",
						"parent": "UG-W"
					},
					"UG-430": {
						"category": "district",
						"code": "UG-430",
						"name": "Bunyangabu",
						"parent": "UG-W"
					},
					"UG-431": {
						"category": "district",
						"code": "UG-431",
						"name": "Rukiga",
						"parent": "UG-W"
					},
					"UG-C": {
						"category": "geographical region",
						"code": "UG-C",
						"name": "Central",
						"parent": ""
					},
					"UG-E": {
						"category": "geographical region",
						"code": "UG-E",
						"name": "Eastern",
						"parent": ""
					},
					"UG-N": {
						"category": "geographical region",
						"code": "UG-N",
						"name": "Northern",
						"parent": ""
					},
					"UG-W": {
						"category": "geographical region",
						"code": "UG-W",
						"name": "Western",
						"parent": ""
					}
				}
			},
			"UKR": {
				"threeLetterCode": "UKR",
				"shortName": "Ukraine",
				"shortNameUpperCase": "UKRAINE",
				"fullName": "Ukraine",
				"subdivisionLabel": "region",
				"subdivisions": {
					"UA-05": {
						"category": "region",
						"code": "UA-05",
						"name": "Vinnytska oblast",
						"parent": ""
					},
					"UA-07": {
						"category": "region",
						"code": "UA-07",
						"name": "Volynska oblast",
						"parent": ""
					},
					"UA-09": {
						"category": "region",
						"code": "UA-09",
						"name": "Luhanska oblast",
						"parent": ""
					},
					"UA-12": {
						"category": "region",
						"code": "UA-12",
						"name": "Dnipropetrovska oblast",
						"parent": ""
					},
					"UA-14": {
						"category": "region",
						"code": "UA-14",
						"name": "Donetska oblast",
						"parent": ""
					},
					"UA-18": {
						"category": "region",
						"code": "UA-18",
						"name": "Zhytomyrska oblast",
						"parent": ""
					},
					"UA-21": {
						"category": "region",
						"code": "UA-21",
						"name": "Zakarpatska oblast",
						"parent": ""
					},
					"UA-23": {
						"category": "region",
						"code": "UA-23",
						"name": "Zaporizka oblast",
						"parent": ""
					},
					"UA-26": {
						"category": "region",
						"code": "UA-26",
						"name": "Ivano-Frankivska oblast",
						"parent": ""
					},
					"UA-30": {
						"category": "city",
						"code": "UA-30",
						"name": "Kyiv",
						"parent": ""
					},
					"UA-32": {
						"category": "region",
						"code": "UA-32",
						"name": "Kyivska oblast",
						"parent": ""
					},
					"UA-35": {
						"category": "region",
						"code": "UA-35",
						"name": "Kirovohradska oblast",
						"parent": ""
					},
					"UA-40": {
						"category": "city",
						"code": "UA-40",
						"name": "Sevastopol",
						"parent": ""
					},
					"UA-43": {
						"category": "republic",
						"code": "UA-43",
						"name": "Avtonomna Respublika Krym",
						"parent": ""
					},
					"UA-46": {
						"category": "region",
						"code": "UA-46",
						"name": "Lvivska oblast",
						"parent": ""
					},
					"UA-48": {
						"category": "region",
						"code": "UA-48",
						"name": "Mykolaivska oblast",
						"parent": ""
					},
					"UA-51": {
						"category": "region",
						"code": "UA-51",
						"name": "Odeska oblast",
						"parent": ""
					},
					"UA-53": {
						"category": "region",
						"code": "UA-53",
						"name": "Poltavska oblast",
						"parent": ""
					},
					"UA-56": {
						"category": "region",
						"code": "UA-56",
						"name": "Rivnenska oblast",
						"parent": ""
					},
					"UA-59": {
						"category": "region",
						"code": "UA-59",
						"name": "Sumska oblast",
						"parent": ""
					},
					"UA-61": {
						"category": "region",
						"code": "UA-61",
						"name": "Ternopilska oblast",
						"parent": ""
					},
					"UA-63": {
						"category": "region",
						"code": "UA-63",
						"name": "Kharkivska oblast",
						"parent": ""
					},
					"UA-65": {
						"category": "region",
						"code": "UA-65",
						"name": "Khersonska oblast",
						"parent": ""
					},
					"UA-68": {
						"category": "region",
						"code": "UA-68",
						"name": "Khmelnytska oblast",
						"parent": ""
					},
					"UA-71": {
						"category": "region",
						"code": "UA-71",
						"name": "Cherkaska oblast",
						"parent": ""
					},
					"UA-74": {
						"category": "region",
						"code": "UA-74",
						"name": "Chernihivska oblast",
						"parent": ""
					},
					"UA-77": {
						"category": "region",
						"code": "UA-77",
						"name": "Chernivetska oblast",
						"parent": ""
					}
				}
			},
			"UMI": {
				"commonName": "United States Minor Outlying Islands",
				"threeLetterCode": "UMI",
				"shortName": "United States Minor Outlying Islands (the)",
				"shortNameUpperCase": "UNITED STATES MINOR OUTLYING ISLANDS",
				"fullName": "the United States Minor Outlying Islands",
				"subdivisionLabel": "islands, groups of islands",
				"subdivisions": {
					"UM-67": {
						"category": "islands, groups of islands",
						"code": "UM-67",
						"name": "Johnston Atoll",
						"parent": ""
					},
					"UM-71": {
						"category": "islands, groups of islands",
						"code": "UM-71",
						"name": "Midway Islands",
						"parent": ""
					},
					"UM-76": {
						"category": "islands, groups of islands",
						"code": "UM-76",
						"name": "Navassa Island",
						"parent": ""
					},
					"UM-79": {
						"category": "islands, groups of islands",
						"code": "UM-79",
						"name": "Wake Island",
						"parent": ""
					},
					"UM-81": {
						"category": "islands, groups of islands",
						"code": "UM-81",
						"name": "Baker Island",
						"parent": ""
					},
					"UM-84": {
						"category": "islands, groups of islands",
						"code": "UM-84",
						"name": "Howland Island",
						"parent": ""
					},
					"UM-86": {
						"category": "islands, groups of islands",
						"code": "UM-86",
						"name": "Jarvis Island",
						"parent": ""
					},
					"UM-89": {
						"category": "islands, groups of islands",
						"code": "UM-89",
						"name": "Kingman Reef",
						"parent": ""
					},
					"UM-95": {
						"category": "islands, groups of islands",
						"code": "UM-95",
						"name": "Palmyra Atoll",
						"parent": ""
					}
				}
			},
			"URY": {
				"threeLetterCode": "URY",
				"shortName": "Uruguay",
				"shortNameUpperCase": "URUGUAY",
				"fullName": "the Eastern Republic of Uruguay",
				"subdivisionLabel": "department",
				"subdivisions": {
					"UY-AR": {
						"category": "department",
						"code": "UY-AR",
						"name": "Artigas",
						"parent": ""
					},
					"UY-CA": {
						"category": "department",
						"code": "UY-CA",
						"name": "Canelones",
						"parent": ""
					},
					"UY-CL": {
						"category": "department",
						"code": "UY-CL",
						"name": "Cerro Largo",
						"parent": ""
					},
					"UY-CO": {
						"category": "department",
						"code": "UY-CO",
						"name": "Colonia",
						"parent": ""
					},
					"UY-DU": {
						"category": "department",
						"code": "UY-DU",
						"name": "Durazno",
						"parent": ""
					},
					"UY-FD": {
						"category": "department",
						"code": "UY-FD",
						"name": "Florida",
						"parent": ""
					},
					"UY-FS": {
						"category": "department",
						"code": "UY-FS",
						"name": "Flores",
						"parent": ""
					},
					"UY-LA": {
						"category": "department",
						"code": "UY-LA",
						"name": "Lavalleja",
						"parent": ""
					},
					"UY-MA": {
						"category": "department",
						"code": "UY-MA",
						"name": "Maldonado",
						"parent": ""
					},
					"UY-MO": {
						"category": "department",
						"code": "UY-MO",
						"name": "Montevideo",
						"parent": ""
					},
					"UY-PA": {
						"category": "department",
						"code": "UY-PA",
						"name": "Paysandú",
						"parent": ""
					},
					"UY-RN": {
						"category": "department",
						"code": "UY-RN",
						"name": "Río Negro",
						"parent": ""
					},
					"UY-RO": {
						"category": "department",
						"code": "UY-RO",
						"name": "Rocha",
						"parent": ""
					},
					"UY-RV": {
						"category": "department",
						"code": "UY-RV",
						"name": "Rivera",
						"parent": ""
					},
					"UY-SA": {
						"category": "department",
						"code": "UY-SA",
						"name": "Salto",
						"parent": ""
					},
					"UY-SJ": {
						"category": "department",
						"code": "UY-SJ",
						"name": "San José",
						"parent": ""
					},
					"UY-SO": {
						"category": "department",
						"code": "UY-SO",
						"name": "Soriano",
						"parent": ""
					},
					"UY-TA": {
						"category": "department",
						"code": "UY-TA",
						"name": "Tacuarembó",
						"parent": ""
					},
					"UY-TT": {
						"category": "department",
						"code": "UY-TT",
						"name": "Treinta y Tres",
						"parent": ""
					}
				}
			},
			"USA": {
				"commonName": "United States of America",
				"threeLetterCode": "USA",
				"shortName": "United States of America (the)",
				"shortNameUpperCase": "UNITED STATES OF AMERICA",
				"fullName": "the United States of America",
				"subdivisionLabel": "state",
				"subdivisions": {
					"US-AK": {
						"category": "state",
						"code": "US-AK",
						"name": "Alaska",
						"parent": ""
					},
					"US-AL": {
						"category": "state",
						"code": "US-AL",
						"name": "Alabama",
						"parent": ""
					},
					"US-AR": {
						"category": "state",
						"code": "US-AR",
						"name": "Arkansas",
						"parent": ""
					},
					"US-AZ": {
						"category": "state",
						"code": "US-AZ",
						"name": "Arizona",
						"parent": ""
					},
					"US-CA": {
						"category": "state",
						"code": "US-CA",
						"name": "California",
						"parent": ""
					},
					"US-CO": {
						"category": "state",
						"code": "US-CO",
						"name": "Colorado",
						"parent": ""
					},
					"US-CT": {
						"category": "state",
						"code": "US-CT",
						"name": "Connecticut",
						"parent": ""
					},
					"US-DC": {
						"category": "district",
						"code": "US-DC",
						"name": "District of Columbia",
						"parent": ""
					},
					"US-DE": {
						"category": "state",
						"code": "US-DE",
						"name": "Delaware",
						"parent": ""
					},
					"US-FL": {
						"category": "state",
						"code": "US-FL",
						"name": "Florida",
						"parent": ""
					},
					"US-GA": {
						"category": "state",
						"code": "US-GA",
						"name": "Georgia",
						"parent": ""
					},
					"US-HI": {
						"category": "state",
						"code": "US-HI",
						"name": "Hawaii",
						"parent": ""
					},
					"US-IA": {
						"category": "state",
						"code": "US-IA",
						"name": "Iowa",
						"parent": ""
					},
					"US-ID": {
						"category": "state",
						"code": "US-ID",
						"name": "Idaho",
						"parent": ""
					},
					"US-IL": {
						"category": "state",
						"code": "US-IL",
						"name": "Illinois",
						"parent": ""
					},
					"US-IN": {
						"category": "state",
						"code": "US-IN",
						"name": "Indiana",
						"parent": ""
					},
					"US-KS": {
						"category": "state",
						"code": "US-KS",
						"name": "Kansas",
						"parent": ""
					},
					"US-KY": {
						"category": "state",
						"code": "US-KY",
						"name": "Kentucky",
						"parent": ""
					},
					"US-LA": {
						"category": "state",
						"code": "US-LA",
						"name": "Louisiana",
						"parent": ""
					},
					"US-MA": {
						"category": "state",
						"code": "US-MA",
						"name": "Massachusetts",
						"parent": ""
					},
					"US-MD": {
						"category": "state",
						"code": "US-MD",
						"name": "Maryland",
						"parent": ""
					},
					"US-ME": {
						"category": "state",
						"code": "US-ME",
						"name": "Maine",
						"parent": ""
					},
					"US-MI": {
						"category": "state",
						"code": "US-MI",
						"name": "Michigan",
						"parent": ""
					},
					"US-MN": {
						"category": "state",
						"code": "US-MN",
						"name": "Minnesota",
						"parent": ""
					},
					"US-MO": {
						"category": "state",
						"code": "US-MO",
						"name": "Missouri",
						"parent": ""
					},
					"US-MS": {
						"category": "state",
						"code": "US-MS",
						"name": "Mississippi",
						"parent": ""
					},
					"US-MT": {
						"category": "state",
						"code": "US-MT",
						"name": "Montana",
						"parent": ""
					},
					"US-NC": {
						"category": "state",
						"code": "US-NC",
						"name": "North Carolina",
						"parent": ""
					},
					"US-ND": {
						"category": "state",
						"code": "US-ND",
						"name": "North Dakota",
						"parent": ""
					},
					"US-NE": {
						"category": "state",
						"code": "US-NE",
						"name": "Nebraska",
						"parent": ""
					},
					"US-NH": {
						"category": "state",
						"code": "US-NH",
						"name": "New Hampshire",
						"parent": ""
					},
					"US-NJ": {
						"category": "state",
						"code": "US-NJ",
						"name": "New Jersey",
						"parent": ""
					},
					"US-NM": {
						"category": "state",
						"code": "US-NM",
						"name": "New Mexico",
						"parent": ""
					},
					"US-NV": {
						"category": "state",
						"code": "US-NV",
						"name": "Nevada",
						"parent": ""
					},
					"US-NY": {
						"category": "state",
						"code": "US-NY",
						"name": "New York",
						"parent": ""
					},
					"US-OH": {
						"category": "state",
						"code": "US-OH",
						"name": "Ohio",
						"parent": ""
					},
					"US-OK": {
						"category": "state",
						"code": "US-OK",
						"name": "Oklahoma",
						"parent": ""
					},
					"US-OR": {
						"category": "state",
						"code": "US-OR",
						"name": "Oregon",
						"parent": ""
					},
					"US-PA": {
						"category": "state",
						"code": "US-PA",
						"name": "Pennsylvania",
						"parent": ""
					},
					"US-RI": {
						"category": "state",
						"code": "US-RI",
						"name": "Rhode Island",
						"parent": ""
					},
					"US-SC": {
						"category": "state",
						"code": "US-SC",
						"name": "South Carolina",
						"parent": ""
					},
					"US-SD": {
						"category": "state",
						"code": "US-SD",
						"name": "South Dakota",
						"parent": ""
					},
					"US-TN": {
						"category": "state",
						"code": "US-TN",
						"name": "Tennessee",
						"parent": ""
					},
					"US-TX": {
						"category": "state",
						"code": "US-TX",
						"name": "Texas",
						"parent": ""
					},
					"US-UT": {
						"category": "state",
						"code": "US-UT",
						"name": "Utah",
						"parent": ""
					},
					"US-VA": {
						"category": "state",
						"code": "US-VA",
						"name": "Virginia",
						"parent": ""
					},
					"US-VT": {
						"category": "state",
						"code": "US-VT",
						"name": "Vermont",
						"parent": ""
					},
					"US-WA": {
						"category": "state",
						"code": "US-WA",
						"name": "Washington",
						"parent": ""
					},
					"US-WI": {
						"category": "state",
						"code": "US-WI",
						"name": "Wisconsin",
						"parent": ""
					},
					"US-WV": {
						"category": "state",
						"code": "US-WV",
						"name": "West Virginia",
						"parent": ""
					},
					"US-WY": {
						"category": "state",
						"code": "US-WY",
						"name": "Wyoming",
						"parent": ""
					}
				}
			},
			"UZB": {
				"threeLetterCode": "UZB",
				"shortName": "Uzbekistan",
				"shortNameUpperCase": "UZBEKISTAN",
				"fullName": "the Republic of Uzbekistan",
				"subdivisionLabel": "region",
				"subdivisions": {
					"UZ-AN": {
						"category": "region",
						"code": "UZ-AN",
						"name": "Andijon",
						"parent": ""
					},
					"UZ-BU": {
						"category": "region",
						"code": "UZ-BU",
						"name": "Buxoro",
						"parent": ""
					},
					"UZ-FA": {
						"category": "region",
						"code": "UZ-FA",
						"name": "Farg‘ona",
						"parent": ""
					},
					"UZ-JI": {
						"category": "region",
						"code": "UZ-JI",
						"name": "Jizzax",
						"parent": ""
					},
					"UZ-NG": {
						"category": "region",
						"code": "UZ-NG",
						"name": "Namangan",
						"parent": ""
					},
					"UZ-NW": {
						"category": "region",
						"code": "UZ-NW",
						"name": "Navoiy",
						"parent": ""
					},
					"UZ-QA": {
						"category": "region",
						"code": "UZ-QA",
						"name": "Qashqadaryo",
						"parent": ""
					},
					"UZ-QR": {
						"category": "republic",
						"code": "UZ-QR",
						"name": "Qoraqalpog‘iston Respublikasi",
						"parent": ""
					},
					"UZ-SA": {
						"category": "region",
						"code": "UZ-SA",
						"name": "Samarqand",
						"parent": ""
					},
					"UZ-SI": {
						"category": "region",
						"code": "UZ-SI",
						"name": "Sirdaryo",
						"parent": ""
					},
					"UZ-SU": {
						"category": "region",
						"code": "UZ-SU",
						"name": "Surxondaryo",
						"parent": ""
					},
					"UZ-TK": {
						"category": "city",
						"code": "UZ-TK",
						"name": "Toshkent",
						"parent": ""
					},
					"UZ-TO": {
						"category": "region",
						"code": "UZ-TO",
						"name": "Toshkent",
						"parent": ""
					},
					"UZ-XO": {
						"category": "region",
						"code": "UZ-XO",
						"name": "Xorazm",
						"parent": ""
					}
				}
			},
			"VAT": {
				"commonName": "Vatican City",
				"threeLetterCode": "VAT",
				"shortName": "Holy See (the)",
				"shortNameUpperCase": "HOLY SEE",
				"fullName": "the Holy See",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"VCT": {
				"threeLetterCode": "VCT",
				"shortName": "Saint Vincent and the Grenadines",
				"shortNameUpperCase": "SAINT VINCENT AND THE GRENADINES",
				"fullName": "Saint Vincent and the Grenadines",
				"subdivisionLabel": "parish",
				"subdivisions": {
					"VC-01": {
						"category": "parish",
						"code": "VC-01",
						"name": "Charlotte",
						"parent": ""
					},
					"VC-02": {
						"category": "parish",
						"code": "VC-02",
						"name": "Saint Andrew",
						"parent": ""
					},
					"VC-03": {
						"category": "parish",
						"code": "VC-03",
						"name": "Saint David",
						"parent": ""
					},
					"VC-04": {
						"category": "parish",
						"code": "VC-04",
						"name": "Saint George",
						"parent": ""
					},
					"VC-05": {
						"category": "parish",
						"code": "VC-05",
						"name": "Saint Patrick",
						"parent": ""
					},
					"VC-06": {
						"category": "parish",
						"code": "VC-06",
						"name": "Grenadines",
						"parent": ""
					}
				}
			},
			"VEN": {
				"commonName": "Venezuela",
				"threeLetterCode": "VEN",
				"shortName": "Venezuela (Bolivarian Republic of)",
				"shortNameUpperCase": "VENEZUELA (BOLIVARIAN REPUBLIC OF)",
				"fullName": "the Bolivarian Republic of Venezuela",
				"subdivisionLabel": "state",
				"subdivisions": {
					"VE-A": {
						"category": "capital district",
						"code": "VE-A",
						"name": "Distrito Capital",
						"parent": ""
					},
					"VE-B": {
						"category": "state",
						"code": "VE-B",
						"name": "Anzoátegui",
						"parent": ""
					},
					"VE-C": {
						"category": "state",
						"code": "VE-C",
						"name": "Apure",
						"parent": ""
					},
					"VE-D": {
						"category": "state",
						"code": "VE-D",
						"name": "Aragua",
						"parent": ""
					},
					"VE-E": {
						"category": "state",
						"code": "VE-E",
						"name": "Barinas",
						"parent": ""
					},
					"VE-F": {
						"category": "state",
						"code": "VE-F",
						"name": "Bolívar",
						"parent": ""
					},
					"VE-G": {
						"category": "state",
						"code": "VE-G",
						"name": "Carabobo",
						"parent": ""
					},
					"VE-H": {
						"category": "state",
						"code": "VE-H",
						"name": "Cojedes",
						"parent": ""
					},
					"VE-I": {
						"category": "state",
						"code": "VE-I",
						"name": "Falcón",
						"parent": ""
					},
					"VE-J": {
						"category": "state",
						"code": "VE-J",
						"name": "Guárico",
						"parent": ""
					},
					"VE-K": {
						"category": "state",
						"code": "VE-K",
						"name": "Lara",
						"parent": ""
					},
					"VE-L": {
						"category": "state",
						"code": "VE-L",
						"name": "Mérida",
						"parent": ""
					},
					"VE-M": {
						"category": "state",
						"code": "VE-M",
						"name": "Miranda",
						"parent": ""
					},
					"VE-N": {
						"category": "state",
						"code": "VE-N",
						"name": "Monagas",
						"parent": ""
					},
					"VE-O": {
						"category": "state",
						"code": "VE-O",
						"name": "Nueva Esparta",
						"parent": ""
					},
					"VE-P": {
						"category": "state",
						"code": "VE-P",
						"name": "Portuguesa",
						"parent": ""
					},
					"VE-R": {
						"category": "state",
						"code": "VE-R",
						"name": "Sucre",
						"parent": ""
					},
					"VE-S": {
						"category": "state",
						"code": "VE-S",
						"name": "Táchira",
						"parent": ""
					},
					"VE-T": {
						"category": "state",
						"code": "VE-T",
						"name": "Trujillo",
						"parent": ""
					},
					"VE-U": {
						"category": "state",
						"code": "VE-U",
						"name": "Yaracuy",
						"parent": ""
					},
					"VE-V": {
						"category": "state",
						"code": "VE-V",
						"name": "Zulia",
						"parent": ""
					},
					"VE-W": {
						"category": "federal dependency",
						"code": "VE-W",
						"name": "Dependencias Federales",
						"parent": ""
					},
					"VE-X": {
						"category": "state",
						"code": "VE-X",
						"name": "Vargas",
						"parent": ""
					},
					"VE-Y": {
						"category": "state",
						"code": "VE-Y",
						"name": "Delta Amacuro",
						"parent": ""
					},
					"VE-Z": {
						"category": "state",
						"code": "VE-Z",
						"name": "Amazonas",
						"parent": ""
					}
				}
			},
			"VGB": {
				"threeLetterCode": "VGB",
				"shortName": "Virgin Islands (British)",
				"shortNameUpperCase": "VIRGIN ISLANDS (BRITISH)",
				"fullName": "the British Virgin Islands",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"VIR": {
				"threeLetterCode": "VIR",
				"shortName": "Virgin Islands (U.S.)",
				"shortNameUpperCase": "VIRGIN ISLANDS (U.S.)",
				"fullName": "the Virgin Islands of the United States",
				"subdivisionLabel": "",
				"subdivisions": {}
			},
			"VNM": {
				"threeLetterCode": "VNM",
				"shortName": "Viet Nam",
				"shortNameUpperCase": "VIET NAM",
				"fullName": "the Socialist Republic of Viet Nam",
				"subdivisionLabel": "province",
				"subdivisions": {
					"VN-01": {
						"category": "province",
						"code": "VN-01",
						"name": "Lai Châu",
						"parent": ""
					},
					"VN-02": {
						"category": "province",
						"code": "VN-02",
						"name": "Lào Cai",
						"parent": ""
					},
					"VN-03": {
						"category": "province",
						"code": "VN-03",
						"name": "Hà Giang",
						"parent": ""
					},
					"VN-04": {
						"category": "province",
						"code": "VN-04",
						"name": "Cao Bằng",
						"parent": ""
					},
					"VN-05": {
						"category": "province",
						"code": "VN-05",
						"name": "Sơn La",
						"parent": ""
					},
					"VN-06": {
						"category": "province",
						"code": "VN-06",
						"name": "Yên Bái",
						"parent": ""
					},
					"VN-07": {
						"category": "province",
						"code": "VN-07",
						"name": "Tuyên Quang",
						"parent": ""
					},
					"VN-09": {
						"category": "province",
						"code": "VN-09",
						"name": "Lạng Sơn",
						"parent": ""
					},
					"VN-13": {
						"category": "province",
						"code": "VN-13",
						"name": "Quảng Ninh",
						"parent": ""
					},
					"VN-14": {
						"category": "province",
						"code": "VN-14",
						"name": "Hòa Bình",
						"parent": ""
					},
					"VN-18": {
						"category": "province",
						"code": "VN-18",
						"name": "Ninh Bình",
						"parent": ""
					},
					"VN-20": {
						"category": "province",
						"code": "VN-20",
						"name": "Thái Bình",
						"parent": ""
					},
					"VN-21": {
						"category": "province",
						"code": "VN-21",
						"name": "Thanh Hóa",
						"parent": ""
					},
					"VN-22": {
						"category": "province",
						"code": "VN-22",
						"name": "Nghệ An",
						"parent": ""
					},
					"VN-23": {
						"category": "province",
						"code": "VN-23",
						"name": "Hà Tĩnh",
						"parent": ""
					},
					"VN-24": {
						"category": "province",
						"code": "VN-24",
						"name": "Quảng Bình",
						"parent": ""
					},
					"VN-25": {
						"category": "province",
						"code": "VN-25",
						"name": "Quảng Trị",
						"parent": ""
					},
					"VN-26": {
						"category": "province",
						"code": "VN-26",
						"name": "Thừa Thiên-Huế",
						"parent": ""
					},
					"VN-27": {
						"category": "province",
						"code": "VN-27",
						"name": "Quảng Nam",
						"parent": ""
					},
					"VN-28": {
						"category": "province",
						"code": "VN-28",
						"name": "Kon Tum",
						"parent": ""
					},
					"VN-29": {
						"category": "province",
						"code": "VN-29",
						"name": "Quảng Ngãi",
						"parent": ""
					},
					"VN-30": {
						"category": "province",
						"code": "VN-30",
						"name": "Gia Lai",
						"parent": ""
					},
					"VN-31": {
						"category": "province",
						"code": "VN-31",
						"name": "Bình Định",
						"parent": ""
					},
					"VN-32": {
						"category": "province",
						"code": "VN-32",
						"name": "Phú Yên",
						"parent": ""
					},
					"VN-33": {
						"category": "province",
						"code": "VN-33",
						"name": "Đắk Lắk",
						"parent": ""
					},
					"VN-34": {
						"category": "province",
						"code": "VN-34",
						"name": "Khánh Hòa",
						"parent": ""
					},
					"VN-35": {
						"category": "province",
						"code": "VN-35",
						"name": "Lâm Đồng",
						"parent": ""
					},
					"VN-36": {
						"category": "province",
						"code": "VN-36",
						"name": "Ninh Thuận",
						"parent": ""
					},
					"VN-37": {
						"category": "province",
						"code": "VN-37",
						"name": "Tây Ninh",
						"parent": ""
					},
					"VN-39": {
						"category": "province",
						"code": "VN-39",
						"name": "Đồng Nai",
						"parent": ""
					},
					"VN-40": {
						"category": "province",
						"code": "VN-40",
						"name": "Bình Thuận",
						"parent": ""
					},
					"VN-41": {
						"category": "province",
						"code": "VN-41",
						"name": "Long An",
						"parent": ""
					},
					"VN-43": {
						"category": "province",
						"code": "VN-43",
						"name": "Bà Rịa - Vũng Tàu",
						"parent": ""
					},
					"VN-44": {
						"category": "province",
						"code": "VN-44",
						"name": "An Giang",
						"parent": ""
					},
					"VN-45": {
						"category": "province",
						"code": "VN-45",
						"name": "Đồng Tháp",
						"parent": ""
					},
					"VN-46": {
						"category": "province",
						"code": "VN-46",
						"name": "Tiền Giang",
						"parent": ""
					},
					"VN-47": {
						"category": "province",
						"code": "VN-47",
						"name": "Kiến Giang",
						"parent": ""
					},
					"VN-49": {
						"category": "province",
						"code": "VN-49",
						"name": "Vĩnh Long",
						"parent": ""
					},
					"VN-50": {
						"category": "province",
						"code": "VN-50",
						"name": "Bến Tre",
						"parent": ""
					},
					"VN-51": {
						"category": "province",
						"code": "VN-51",
						"name": "Trà Vinh",
						"parent": ""
					},
					"VN-52": {
						"category": "province",
						"code": "VN-52",
						"name": "Sóc Trăng",
						"parent": ""
					},
					"VN-53": {
						"category": "province",
						"code": "VN-53",
						"name": "Bắc Kạn",
						"parent": ""
					},
					"VN-54": {
						"category": "province",
						"code": "VN-54",
						"name": "Bắc Giang",
						"parent": ""
					},
					"VN-55": {
						"category": "province",
						"code": "VN-55",
						"name": "Bạc Liêu",
						"parent": ""
					},
					"VN-56": {
						"category": "province",
						"code": "VN-56",
						"name": "Bắc Ninh",
						"parent": ""
					},
					"VN-57": {
						"category": "province",
						"code": "VN-57",
						"name": "Bình Dương",
						"parent": ""
					},
					"VN-58": {
						"category": "province",
						"code": "VN-58",
						"name": "Bình Phước",
						"parent": ""
					},
					"VN-59": {
						"category": "province",
						"code": "VN-59",
						"name": "Cà Mau",
						"parent": ""
					},
					"VN-61": {
						"category": "province",
						"code": "VN-61",
						"name": "Hải Dương",
						"parent": ""
					},
					"VN-63": {
						"category": "province",
						"code": "VN-63",
						"name": "Hà Nam",
						"parent": ""
					},
					"VN-66": {
						"category": "province",
						"code": "VN-66",
						"name": "Hưng Yên",
						"parent": ""
					},
					"VN-67": {
						"category": "province",
						"code": "VN-67",
						"name": "Nam Định",
						"parent": ""
					},
					"VN-68": {
						"category": "province",
						"code": "VN-68",
						"name": "Phú Thọ",
						"parent": ""
					},
					"VN-69": {
						"category": "province",
						"code": "VN-69",
						"name": "Thái Nguyên",
						"parent": ""
					},
					"VN-70": {
						"category": "province",
						"code": "VN-70",
						"name": "Vĩnh Phúc",
						"parent": ""
					},
					"VN-71": {
						"category": "province",
						"code": "VN-71",
						"name": "Điện Biên",
						"parent": ""
					},
					"VN-72": {
						"category": "province",
						"code": "VN-72",
						"name": "Đắk Nông",
						"parent": ""
					},
					"VN-73": {
						"category": "province",
						"code": "VN-73",
						"name": "Hậu Giang",
						"parent": ""
					},
					"VN-CT": {
						"category": "municipality",
						"code": "VN-CT",
						"name": "Can Tho",
						"parent": ""
					},
					"VN-DN": {
						"category": "municipality",
						"code": "VN-DN",
						"name": "Da Nang",
						"parent": ""
					},
					"VN-HN": {
						"category": "municipality",
						"code": "VN-HN",
						"name": "Ha Noi",
						"parent": ""
					},
					"VN-HP": {
						"category": "municipality",
						"code": "VN-HP",
						"name": "Hai Phong",
						"parent": ""
					},
					"VN-SG": {
						"category": "municipality",
						"code": "VN-SG",
						"name": "Ho Chi Minh",
						"parent": ""
					}
				}
			},
			"VUT": {
				"threeLetterCode": "VUT",
				"shortName": "Vanuatu",
				"shortNameUpperCase": "VANUATU",
				"fullName": "the Republic of Vanuatu",
				"subdivisionLabel": "province",
				"subdivisions": {
					"VU-MAP": {
						"category": "province",
						"code": "VU-MAP",
						"name": "Malampa",
						"parent": ""
					},
					"VU-PAM": {
						"category": "province",
						"code": "VU-PAM",
						"name": "Pénama",
						"parent": ""
					},
					"VU-SAM": {
						"category": "province",
						"code": "VU-SAM",
						"name": "Sanma",
						"parent": ""
					},
					"VU-SEE": {
						"category": "province",
						"code": "VU-SEE",
						"name": "Shéfa",
						"parent": ""
					},
					"VU-TAE": {
						"category": "province",
						"code": "VU-TAE",
						"name": "Taféa",
						"parent": ""
					},
					"VU-TOB": {
						"category": "province",
						"code": "VU-TOB",
						"name": "Torba",
						"parent": ""
					}
				}
			},
			"WLF": {
				"threeLetterCode": "WLF",
				"shortName": "Wallis and Futuna",
				"shortNameUpperCase": "WALLIS AND FUTUNA",
				"fullName": "Wallis and Futuna Islands",
				"subdivisionLabel": "administrative precinct",
				"subdivisions": {
					"WF-AL": {
						"category": "administrative precinct",
						"code": "WF-AL",
						"name": "Alo",
						"parent": ""
					},
					"WF-SG": {
						"category": "administrative precinct",
						"code": "WF-SG",
						"name": "Sigave",
						"parent": ""
					},
					"WF-UV": {
						"category": "administrative precinct",
						"code": "WF-UV",
						"name": "Uvea",
						"parent": ""
					}
				}
			},
			"WSM": {
				"threeLetterCode": "WSM",
				"shortName": "Samoa",
				"shortNameUpperCase": "SAMOA",
				"fullName": "the Independent State of Samoa",
				"subdivisionLabel": "district",
				"subdivisions": {
					"WS-AA": {
						"category": "district",
						"code": "WS-AA",
						"name": "A'ana",
						"parent": ""
					},
					"WS-AL": {
						"category": "district",
						"code": "WS-AL",
						"name": "Aiga-i-le-Tai",
						"parent": ""
					},
					"WS-AT": {
						"category": "district",
						"code": "WS-AT",
						"name": "Atua",
						"parent": ""
					},
					"WS-FA": {
						"category": "district",
						"code": "WS-FA",
						"name": "Fa'asaleleaga",
						"parent": ""
					},
					"WS-GE": {
						"category": "district",
						"code": "WS-GE",
						"name": "Gaga'emauga",
						"parent": ""
					},
					"WS-GI": {
						"category": "district",
						"code": "WS-GI",
						"name": "Gagaifomauga",
						"parent": ""
					},
					"WS-PA": {
						"category": "district",
						"code": "WS-PA",
						"name": "Palauli",
						"parent": ""
					},
					"WS-SA": {
						"category": "district",
						"code": "WS-SA",
						"name": "Satupa'itea",
						"parent": ""
					},
					"WS-TU": {
						"category": "district",
						"code": "WS-TU",
						"name": "Tuamasaga",
						"parent": ""
					},
					"WS-VF": {
						"category": "district",
						"code": "WS-VF",
						"name": "Va'a-o-Fonoti",
						"parent": ""
					},
					"WS-VS": {
						"category": "district",
						"code": "WS-VS",
						"name": "Vaisigano",
						"parent": ""
					}
				}
			},
			"YEM": {
				"threeLetterCode": "YEM",
				"shortName": "Yemen",
				"shortNameUpperCase": "YEMEN",
				"fullName": "the  Republic of Yemen",
				"subdivisionLabel": "governorate",
				"subdivisions": {
					"YE-AB": {
						"category": "governorate",
						"code": "YE-AB",
						"name": "Abyan",
						"parent": ""
					},
					"YE-AD": {
						"category": "governorate",
						"code": "YE-AD",
						"name": "‘Adan",
						"parent": ""
					},
					"YE-AM": {
						"category": "governorate",
						"code": "YE-AM",
						"name": "‘Amrān",
						"parent": ""
					},
					"YE-BA": {
						"category": "governorate",
						"code": "YE-BA",
						"name": "Al Bayḑā’",
						"parent": ""
					},
					"YE-DA": {
						"category": "governorate",
						"code": "YE-DA",
						"name": "Aḑ Ḑāli‘",
						"parent": ""
					},
					"YE-DH": {
						"category": "governorate",
						"code": "YE-DH",
						"name": "Dhamār",
						"parent": ""
					},
					"YE-HD": {
						"category": "governorate",
						"code": "YE-HD",
						"name": "Ḩaḑramawt",
						"parent": ""
					},
					"YE-HJ": {
						"category": "governorate",
						"code": "YE-HJ",
						"name": "Ḩajjah",
						"parent": ""
					},
					"YE-HU": {
						"category": "governorate",
						"code": "YE-HU",
						"name": "Al Ḩudaydah",
						"parent": ""
					},
					"YE-IB": {
						"category": "governorate",
						"code": "YE-IB",
						"name": "Ibb",
						"parent": ""
					},
					"YE-JA": {
						"category": "governorate",
						"code": "YE-JA",
						"name": "Al Jawf",
						"parent": ""
					},
					"YE-LA": {
						"category": "governorate",
						"code": "YE-LA",
						"name": "Laḩij",
						"parent": ""
					},
					"YE-MA": {
						"category": "governorate",
						"code": "YE-MA",
						"name": "Ma’rib",
						"parent": ""
					},
					"YE-MR": {
						"category": "governorate",
						"code": "YE-MR",
						"name": "Al Mahrah",
						"parent": ""
					},
					"YE-MW": {
						"category": "governorate",
						"code": "YE-MW",
						"name": "Al Maḩwīt",
						"parent": ""
					},
					"YE-RA": {
						"category": "governorate",
						"code": "YE-RA",
						"name": "Raymah",
						"parent": ""
					},
					"YE-SA": {
						"category": "municipality",
						"code": "YE-SA",
						"name": "Amānat al ‘Āşimah [city]",
						"parent": ""
					},
					"YE-SD": {
						"category": "governorate",
						"code": "YE-SD",
						"name": "Şāʻdah",
						"parent": ""
					},
					"YE-SH": {
						"category": "governorate",
						"code": "YE-SH",
						"name": "Shabwah",
						"parent": ""
					},
					"YE-SN": {
						"category": "governorate",
						"code": "YE-SN",
						"name": "Şanʻā’",
						"parent": ""
					},
					"YE-SU": {
						"category": "governorate",
						"code": "YE-SU",
						"name": "Arkhabīl Suquţrá",
						"parent": ""
					},
					"YE-TA": {
						"category": "governorate",
						"code": "YE-TA",
						"name": "Tāʻizz",
						"parent": ""
					}
				}
			},
			"ZAF": {
				"threeLetterCode": "ZAF",
				"shortName": "South Africa",
				"shortNameUpperCase": "SOUTH AFRICA",
				"fullName": "the Republic of South Africa",
				"subdivisionLabel": "province",
				"subdivisions": {
					"ZA-EC": {
						"category": "province",
						"code": "ZA-EC",
						"name": "Eastern Cape",
						"parent": ""
					},
					"ZA-FS": {
						"category": "province",
						"code": "ZA-FS",
						"name": "Free State",
						"parent": ""
					},
					"ZA-GT": {
						"category": "province",
						"code": "ZA-GT",
						"name": "Gauteng",
						"parent": ""
					},
					"ZA-LP": {
						"category": "province",
						"code": "ZA-LP",
						"name": "Limpopo",
						"parent": ""
					},
					"ZA-MP": {
						"category": "province",
						"code": "ZA-MP",
						"name": "Mpumalanga",
						"parent": ""
					},
					"ZA-NC": {
						"category": "province",
						"code": "ZA-NC",
						"name": "Northern Cape",
						"parent": ""
					},
					"ZA-NL": {
						"category": "province",
						"code": "ZA-NL",
						"name": "Kwazulu-Natal",
						"parent": ""
					},
					"ZA-NW": {
						"category": "province",
						"code": "ZA-NW",
						"name": "North-West",
						"parent": ""
					},
					"ZA-WC": {
						"category": "province",
						"code": "ZA-WC",
						"name": "Western Cape",
						"parent": ""
					}
				}
			},
			"ZMB": {
				"threeLetterCode": "ZMB",
				"shortName": "Zambia",
				"shortNameUpperCase": "ZAMBIA",
				"fullName": "the Republic of Zambia",
				"subdivisionLabel": "province",
				"subdivisions": {
					"ZM-01": {
						"category": "province",
						"code": "ZM-01",
						"name": "Western",
						"parent": ""
					},
					"ZM-02": {
						"category": "province",
						"code": "ZM-02",
						"name": "Central",
						"parent": ""
					},
					"ZM-03": {
						"category": "province",
						"code": "ZM-03",
						"name": "Eastern",
						"parent": ""
					},
					"ZM-04": {
						"category": "province",
						"code": "ZM-04",
						"name": "Luapula",
						"parent": ""
					},
					"ZM-05": {
						"category": "province",
						"code": "ZM-05",
						"name": "Northern",
						"parent": ""
					},
					"ZM-06": {
						"category": "province",
						"code": "ZM-06",
						"name": "North-Western",
						"parent": ""
					},
					"ZM-07": {
						"category": "province",
						"code": "ZM-07",
						"name": "Southern",
						"parent": ""
					},
					"ZM-08": {
						"category": "province",
						"code": "ZM-08",
						"name": "Copperbelt",
						"parent": ""
					},
					"ZM-09": {
						"category": "province",
						"code": "ZM-09",
						"name": "Lusaka",
						"parent": ""
					},
					"ZM-10": {
						"category": "province",
						"code": "ZM-10",
						"name": "Muchinga",
						"parent": ""
					}
				}
			},
			"ZWE": {
				"threeLetterCode": "ZWE",
				"shortName": "Zimbabwe",
				"shortNameUpperCase": "ZIMBABWE",
				"fullName": "the Republic of Zimbabwe",
				"subdivisionLabel": "province",
				"subdivisions": {
					"ZW-BU": {
						"category": "province",
						"code": "ZW-BU",
						"name": "Bulawayo",
						"parent": ""
					},
					"ZW-HA": {
						"category": "province",
						"code": "ZW-HA",
						"name": "Harare",
						"parent": ""
					},
					"ZW-MA": {
						"category": "province",
						"code": "ZW-MA",
						"name": "Manicaland",
						"parent": ""
					},
					"ZW-MC": {
						"category": "province",
						"code": "ZW-MC",
						"name": "Mashonaland Central",
						"parent": ""
					},
					"ZW-ME": {
						"category": "province",
						"code": "ZW-ME",
						"name": "Mashonaland East",
						"parent": ""
					},
					"ZW-MI": {
						"category": "province",
						"code": "ZW-MI",
						"name": "Midlands",
						"parent": ""
					},
					"ZW-MN": {
						"category": "province",
						"code": "ZW-MN",
						"name": "Matabeleland North",
						"parent": ""
					},
					"ZW-MS": {
						"category": "province",
						"code": "ZW-MS",
						"name": "Matabeleland South",
						"parent": ""
					},
					"ZW-MV": {
						"category": "province",
						"code": "ZW-MV",
						"name": "Masvingo",
						"parent": ""
					},
					"ZW-MW": {
						"category": "province",
						"code": "ZW-MW",
						"name": "Mashonaland West",
						"parent": ""
					}
				}
			}
		};
	}
}

(function() {
	if(typeof module !== 'undefined' && module.exports)
	{
		module.exports = {
			countryData: countryData
		};
	}
})();
