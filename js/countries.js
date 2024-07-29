const COUNTRIES = {
  "AF": {
    "name": "Afghanistan",
    "continent": "Asia"
  },
  "AX": {
    "name": "Åland Islands",
    "continent": "Europe",
    "parent": "FI"
  },
  "AL": {
    "name": "Albania",
    "continent": "Europe"
  },
  "DZ": {
    "name": "Algeria",
    "continent": "Africa"
  },
  "AS": {
    "name": "American Samoa",
    "continent": "Oceania",
    "parent": "US"
  },
  "AD": {
    "name": "Andorra",
    "continent": "Europe"
  },
  "AO": {
    "name": "Angola",
    "continent": "Africa"
  },
  "AI": {
    "name": "Anguilla",
    "continent": "Americas",
    "parent": "GB"
  },
  "AG": {
    "name": "Antigua & Barbuda",
    "continent": "Americas"
  },
  "AR": {
    "name": "Argentina",
    "continent": "Americas"
  },
  "AM": {
    "name": "Armenia",
    "continent": "Asia"
  },
  "AW": {
    "name": "Aruba",
    "continent": "Americas",
    "parent": "NL"
  },
  "AU": {
    "name": "Australia",
    "continent": "Oceania"
  },
  "AT": {
    "name": "Austria",
    "continent": "Europe"
  },
  "AZ": {
    "name": "Azerbaijan",
    "continent": "Asia"
  },
  "PT-20": {
    "name": "Azores",
    "continent": "Europe",
    "parent": "PT"
  },
  "BS": {
    "name": "Bahamas",
    "continent": "Americas"
  },
  "BH": {
    "name": "Bahrain",
    "continent": "Asia"
  },
  "ES-IB": {
    "name": "Balearic Islands",
    "continent": "Europe",
    "parent": "ES"
  },
  "BD": {
    "name": "Bangladesh",
    "continent": "Asia"
  },
  "BB": {
    "name": "Barbados",
    "continent": "Americas"
  },
  "ES-PV": {
    "name": "Basque Country",
    "continent": "Europe",
    "parent": "ES"
  },
  "BY": {
    "name": "Belarus",
    "continent": "Europe"
  },
  "BE": {
    "name": "Belgium",
    "continent": "Europe"
  },
  "BZ": {
    "name": "Belize",
    "continent": "Americas"
  },
  "BJ": {
    "name": "Benin",
    "continent": "Africa"
  },
  "BM": {
    "name": "Bermuda",
    "continent": "Americas",
    "parent": "GB"
  },
  "BT": {
    "name": "Bhutan",
    "continent": "Asia"
  },
  "BO": {
    "name": "Bolivia",
    "continent": "Americas"
  },
  "BQ-BO": {
    "name": "Bonaire",
    "continent": "Americas",
    "parent": "NL"
  },
  "BA": {
    "name": "Bosnia & Herzegovina",
    "continent": "Europe"
  },
  "BW": {
    "name": "Botswana",
    "continent": "Africa"
  },
  "BR": {
    "name": "Brazil",
    "continent": "Americas"
  },
  "IO": {
    "name": "British Indian Ocean Territory",
    "continent": "Asia",
    "parent": "GB"
  },
  "BN": {
    "name": "Brunei",
    "continent": "Asia"
  },
  "BG": {
    "name": "Bulgaria",
    "continent": "Europe"
  },
  "BF": {
    "name": "Burkina Faso",
    "continent": "Africa"
  },
  "BI": {
    "name": "Burundi",
    "continent": "Africa"
  },
  "KH": {
    "name": "Cambodia",
    "continent": "Asia"
  },
  "CM": {
    "name": "Cameroon",
    "continent": "Africa"
  },
  "CA": {
    "name": "Canada",
    "continent": "Americas"
  },
  "ES-CN": {
    "name": "Canary Islands",
    "continent": "Africa",
    "parent": "ES"
  },
  "CV": {
    "name": "Cape Verde",
    "continent": "Africa"
  },
  "KY": {
    "name": "Cayman Islands",
    "continent": "Americas",
    "parent": "GB"
  },
  "CF": {
    "name": "Central African Republic",
    "continent": "Africa"
  },
  "ES-CE": {
    "name": "Ceuta",
    "continent": "Africa",
    "parent": "ES"
  },
  "TD": {
    "name": "Chad",
    "continent": "Africa"
  },
  "CL": {
    "name": "Chile",
    "continent": "Americas"
  },
  "CN": {
    "name": "China",
    "continent": "Asia"
  },
  "CX": {
    "name": "Christmas Island",
    "continent": "Oceania",
    "parent": "AU"
  },
  "CC": {
    "name": "Cocos (Keeling) Islands",
    "continent": "Oceania",
    "parent": "AU"
  },
  "CO": {
    "name": "Colombia",
    "continent": "Americas"
  },
  "KM": {
    "name": "Comoros",
    "continent": "Africa"
  },
  "CG": {
    "name": "Republic of the Congo",
    "continent": "Africa"
  },
  "CD": {
    "name": "Democratic Republic of the Congo",
    "continent": "Africa"
  },
  "CK": {
    "name": "Cook Islands",
    "continent": "Oceania",
    "parent": "NZ"
  },
  "FR-20R": {
    "name": "Corsica",
    "continent": "Europe",
    "parent": "FR"
  },
  "CR": {
    "name": "Costa Rica",
    "continent": "Americas"
  },
  "HR": {
    "name": "Croatia",
    "continent": "Europe"
  },
  "CU": {
    "name": "Cuba",
    "continent": "Americas"
  },
  "CW": {
    "name": "Curaçao",
    "continent": "Americas",
    "parent": "NL"
  },
  "CY": {
    "name": "Cyprus",
    "continent": "Europe"
  },
  "CZ": {
    "name": "Czech Republic",
    "continent": "Europe"
  },
  "DK": {
    "name": "Denmark",
    "continent": "Europe"
  },
  "DJ": {
    "name": "Djibouti",
    "continent": "Africa"
  },
  "DM": {
    "name": "Dominica",
    "continent": "Americas"
  },
  "DO": {
    "name": "Dominican Republic",
    "continent": "Americas"
  },
  "TL": {
    "name": "East Timor",
    "continent": "Asia"
  },
  "CL-VS": {
    "name": "Easter Island",
    "continent": "Americas",
    "parent": "CL"
  },
  "EC": {
    "name": "Ecuador",
    "continent": "Americas"
  },
  "EG": {
    "name": "Egypt",
    "continent": "Africa"
  },
  "SV": {
    "name": "El Salvador",
    "continent": "Americas"
  },
  "GB-ENG": {
    "name": "England",
    "continent": "Europe",
    "parent": "GB"
  },
  "GQ": {
    "name": "Equatorial Guinea",
    "continent": "Africa"
  },
  "ER": {
    "name": "Eritrea",
    "continent": "Africa"
  },
  "EE": {
    "name": "Estonia",
    "continent": "Europe"
  },
  "SZ": {
    "name": "Eswatini",
    "continent": "Africa"
  },
  "ET": {
    "name": "Ethiopia",
    "continent": "Africa"
  },
  "FK": {
    "name": "Falkland Islands (Islas Malvinas)",
    "continent": "Americas",
    "parent": "GB"
  },
  "FO": {
    "name": "Faroe Islands",
    "continent": "Europe",
    "parent": "DK"
  },
  "FJ": {
    "name": "Fiji",
    "continent": "Oceania"
  },
  "FI": {
    "name": "Finland",
    "continent": "Europe"
  },
  "FR": {
    "name": "France",
    "continent": "Europe"
  },
  "GF": {
    "name": "French Guiana",
    "continent": "Americas",
    "parent": "FR"
  },
  "PF": {
    "name": "French Polynesia",
    "continent": "Oceania",
    "parent": "FR"
  },
  "TF": {
    "name": "French Southern Territories",
    "continent": "Africa",
    "parent": "FR"
  },
  "GA": {
    "name": "Gabon",
    "continent": "Africa"
  },
  "EC-W": {
    "name": "Galápagos Islands",
    "continent": "Americas",
    "parent": "EC"
  },
  "GM": {
    "name": "Gambia",
    "continent": "Africa"
  },
  "GE": {
    "name": "Georgia",
    "continent": "Europe"
  },
  "DE": {
    "name": "Germany",
    "continent": "Europe"
  },
  "GH": {
    "name": "Ghana",
    "continent": "Africa"
  },
  "GI": {
    "name": "Gibraltar",
    "continent": "Europe"
  },
  "GR": {
    "name": "Greece",
    "continent": "Europe"
  },
  "GL": {
    "name": "Greenland",
    "continent": "Americas",
    "parent": "DK"
  },
  "GD": {
    "name": "Grenada",
    "continent": "Americas"
  },
  "GP": {
    "name": "Guadeloupe",
    "continent": "Americas",
    "parent": "FR"
  },
  "GU": {
    "name": "Guam",
    "continent": "Oceania",
    "parent": "US"
  },
  "GT": {
    "name": "Guatemala",
    "continent": "Americas"
  },
  "GG": {
    "name": "Guernsey",
    "continent": "Europe",
    "parent": "GB"
  },
  "GN": {
    "name": "Guinea",
    "continent": "Africa"
  },
  "GW": {
    "name": "Guinea-Bissau",
    "continent": "Africa"
  },
  "GY": {
    "name": "Guyana",
    "continent": "Americas"
  },
  "HT": {
    "name": "Haiti",
    "continent": "Americas"
  },
  "US-HI": {
    "name": "Hawaii",
    "continent": "Oceania",
    "parent": "US"
  },
  "HM": {
    "name": "Heard Island & McDonald Islands",
    "continent": "Oceania",
    "parent": "AU"
  },
  "HN": {
    "name": "Honduras",
    "continent": "Americas"
  },
  "HK": {
    "name": "Hong Kong",
    "continent": "Asia",
    "parent": "CN"
  },
  "HU": {
    "name": "Hungary",
    "continent": "Europe"
  },
  "IS": {
    "name": "Iceland",
    "continent": "Europe"
  },
  "IN": {
    "name": "India",
    "continent": "Asia"
  },
  "ID": {
    "name": "Indonesia",
    "continent": "Asia"
  },
  "IR": {
    "name": "Iran",
    "continent": "Asia"
  },
  "IQ": {
    "name": "Iraq",
    "continent": "Asia"
  },
  "IE": {
    "name": "Ireland",
    "continent": "Europe"
  },
  "IM": {
    "name": "Isle of Man",
    "continent": "Europe",
    "parent": "GB"
  },
  "IL": {
    "name": "Israel",
    "continent": "Asia"
  },
  "IT": {
    "name": "Italy",
    "continent": "Europe"
  },
  "CI": {
    "name": "Ivory Coast",
    "continent": "Africa"
  },
  "JM": {
    "name": "Jamaica",
    "continent": "Americas"
  },
  "JP": {
    "name": "Japan",
    "continent": "Asia"
  },
  "JE": {
    "name": "Jersey",
    "continent": "Europe",
    "parent": "GB"
  },
  "JO": {
    "name": "Jordan",
    "continent": "Africa"
  },
  "KZ": {
    "name": "Kazakhstan",
    "continent": "Asia"
  },
  "KE": {
    "name": "Kenya",
    "continent": "Africa"
  },
  "KI": {
    "name": "Kiribati",
    "continent": "Oceania"
  },
  "KP": {
    "name": "North Korea",
    "continent": "Asia"
  },
  "KR": {
    "name": "South Korea",
    "continent": "Asia"
  },
  "XK": {
    "name": "Kosovo",
    "continent": "Europe"
  },
  "KW": {
    "name": "Kuwait",
    "continent": "Asia"
  },
  "KG": {
    "name": "Kyrgyzstan",
    "continent": "Asia"
  },
  "LA": {
    "name": "Laos",
    "continent": "Asia"
  },
  "LV": {
    "name": "Latvia",
    "continent": "Europe"
  },
  "LB": {
    "name": "Lebanon",
    "continent": "Asia"
  },
  "LS": {
    "name": "Lesotho",
    "continent": "Africa"
  },
  "LR": {
    "name": "Liberia",
    "continent": "Africa"
  },
  "LY": {
    "name": "Libya",
    "continent": "Africa"
  },
  "LI": {
    "name": "Liechtenstein",
    "continent": "Europe"
  },
  "LT": {
    "name": "Lithuania",
    "continent": "Europe"
  },
  "LU": {
    "name": "Luxembourg",
    "continent": "Europe"
  },
  "MO": {
    "name": "Macao",
    "continent": "Asia",
    "parent": "CN"
  },
  "MK": {
    "name": "North Macedonia",
    "continent": "Europe"
  },
  "MG": {
    "name": "Madagascar",
    "continent": "Africa"
  },
  "PT-30": {
    "name": "Madeira",
    "continent": "Africa",
    "parent": "PT"
  },
  "MW": {
    "name": "Malawi",
    "continent": "Africa"
  },
  "MY": {
    "name": "Malaysia",
    "continent": "Asia"
  },
  "MV": {
    "name": "Maldives",
    "continent": "Asia"
  },
  "ML": {
    "name": "Mali",
    "continent": "Africa"
  },
  "MT": {
    "name": "Malta",
    "continent": "Europe"
  },
  "MH": {
    "name": "Marshall Islands",
    "continent": "Oceania"
  },
  "MQ": {
    "name": "Martinique",
    "continent": "Americas",
    "parent": "FR"
  },
  "MR": {
    "name": "Mauritania",
    "continent": "Africa"
  },
  "MU": {
    "name": "Mauritius",
    "continent": "Africa"
  },
  "YT": {
    "name": "Mayotte",
    "continent": "Africa",
    "parent": "FR"
  },
  "ES-ML": {
    "name": "Melilla",
    "continent": "Africa",
    "parent": "ES"
  },
  "MX": {
    "name": "Mexico",
    "continent": "Americas"
  },
  "FM": {
    "name": "Micronesia",
    "continent": "Oceania"
  },
  "MD": {
    "name": "Moldova",
    "continent": "Europe"
  },
  "MC": {
    "name": "Monaco",
    "continent": "Europe"
  },
  "MN": {
    "name": "Mongolia",
    "continent": "Asia"
  },
  "ME": {
    "name": "Montenegro",
    "continent": "Europe"
  },
  "MS": {
    "name": "Montserrat",
    "continent": "Americas",
    "parent": "GB"
  },
  "MA": {
    "name": "Morocco",
    "continent": "Africa"
  },
  "MZ": {
    "name": "Mozambique",
    "continent": "Africa"
  },
  "MM": {
    "name": "Myanmar",
    "continent": "Asia"
  },
  "NA": {
    "name": "Namibia",
    "continent": "Africa"
  },
  "NR": {
    "name": "Nauru",
    "continent": "Oceania"
  },
  "NP": {
    "name": "Nepal",
    "continent": "Asia"
  },
  "NL": {
    "name": "Netherlands",
    "continent": "Europe"
  },
  "NC": {
    "name": "New Caledonia",
    "continent": "Oceania",
    "parent": "FR"
  },
  "NZ": {
    "name": "New Zealand",
    "continent": "Oceania"
  },
  "NI": {
    "name": "Nicaragua",
    "continent": "Americas"
  },
  "NE": {
    "name": "Niger",
    "continent": "Africa"
  },
  "NG": {
    "name": "Nigeria",
    "continent": "Africa"
  },
  "NU": {
    "name": "Niue",
    "continent": "Oceania",
    "parent": "NZ"
  },
  "NF": {
    "name": "Norfolk Island",
    "continent": "Oceania",
    "parent": "AU"
  },
  "MP": {
    "name": "Northern Mariana Islands",
    "continent": "Oceania",
    "parent": "US"
  },
  "NO": {
    "name": "Norway",
    "continent": "Europe"
  },
  "OM": {
    "name": "Oman",
    "continent": "Asia"
  },
  "PK": {
    "name": "Pakistan",
    "continent": "Asia"
  },
  "PW": {
    "name": "Palau",
    "continent": "Oceania"
  },
  "PS": {
    "name": "Palestine",
    "continent": "Asia"
  },
  "PA": {
    "name": "Panama",
    "continent": "Americas"
  },
  "PG": {
    "name": "Papua New Guinea",
    "continent": "Asia"
  },
  "PY": {
    "name": "Paraguay",
    "continent": "Americas"
  },
  "PE": {
    "name": "Peru",
    "continent": "Americas"
  },
  "PH": {
    "name": "Philippines",
    "continent": "Asia"
  },
  "PN": {
    "name": "Pitcairn Islands",
    "continent": "Oceania",
    "parent": "GB"
  },
  "PL": {
    "name": "Poland",
    "continent": "Europe"
  },
  "PT": {
    "name": "Portugal",
    "continent": "Europe"
  },
  "PR": {
    "name": "Puerto Rico",
    "continent": "Americas",
    "parent": "US"
  },
  "QA": {
    "name": "Qatar",
    "continent": "Asia"
  },
  "RW": {
    "name": "Rwanda",
    "continent": "Africa"
  },
  "RE": {
    "name": "Réunion",
    "continent": "Africa",
    "parent": "FR"
  },
  "RO": {
    "name": "Romania",
    "continent": "Europe"
  },
  "RU": {
    "name": "Russia",
    "continent": "Europe"
  },
  "BQ-SA": {
    "name": "Saba",
    "continent": "Americas",
    "parent": "NL"
  },
  "BL": {
    "name": "Saint Barthélemy",
    "continent": "Americas",
    "parent": "FR"
  },
  "KN": {
    "name": "Saint Kitts & Nevis",
    "continent": "Americas"
  },
  "LC": {
    "name": "Saint Lucia",
    "continent": "Americas"
  },
  "PM": {
    "name": "Saint Pierre & Miquelon",
    "continent": "Americas",
    "parent": "FR"
  },
  "VC": {
    "name": "Saint Vincent & the Grenadines",
    "continent": "Americas"
  },
  "WS": {
    "name": "Samoa",
    "continent": "Oceania"
  },
  "SM": {
    "name": "San Marino",
    "continent": "Europe"
  },
  "IT-88": {
    "name": "Sardinia",
    "continent": "Europe",
    "parent": "IT"
  },
  "ST": {
    "name": "São Tomé & Príncipe",
    "continent": "Africa"
  },
  "SA": {
    "name": "Saudi Arabia",
    "continent": "Asia"
  },
  "GB-SCT": {
    "name": "Scotland",
    "continent": "Europe",
    "parent": "GB"
  },
  "SN": {
    "name": "Senegal",
    "continent": "Africa"
  },
  "RS": {
    "name": "Serbia",
    "continent": "Europe"
  },
  "SC": {
    "name": "Seychelles",
    "continent": "Africa"
  },
  "IT-82": {
    "name": "Sicily",
    "continent": "Europe",
    "parent": "IT"
  },
  "SL": {
    "name": "Sierra Leone",
    "continent": "Africa"
  },
  "SG": {
    "name": "Singapore",
    "continent": "Asia"
  },
  "BQ-SE": {
    "name": "Sint Eustatius",
    "continent": "Americas",
    "parent": "NL"
  },
  "SX": {
    "name": "Sint Maarten",
    "continent": "Americas",
    "parent": "NL"
  },
  "SK": {
    "name": "Slovakia",
    "continent": "Europe"
  },
  "SI": {
    "name": "Slovenia",
    "continent": "Europe"
  },
  "SB": {
    "name": "Solomon Islands",
    "continent": "Oceania"
  },
  "SO": {
    "name": "Somalia",
    "continent": "Africa"
  },
  "ZA": {
    "name": "South Africa",
    "continent": "Africa"
  },
  "SS": {
    "name": "South Sudan",
    "continent": "Africa"
  },
  "ES": {
    "name": "Spain",
    "continent": "Europe"
  },
  "LK": {
    "name": "Sri Lanka",
    "continent": "Asia"
  },
  "SD": {
    "name": "Sudan",
    "continent": "Africa"
  },
  "SR": {
    "name": "Suriname",
    "continent": "Americas"
  },
  "SJ": {
    "name": "Svalbard & Jan Mayen",
    "continent": "Europe",
    "parent": "NO"
  },
  "SE": {
    "name": "Sweden",
    "continent": "Europe"
  },
  "CH": {
    "name": "Switzerland",
    "continent": "Europe"
  },
  "SY": {
    "name": "Syria",
    "continent": "Asia"
  },
  "TW": {
    "name": "Taiwan",
    "continent": "Asia"
  },
  "TJ": {
    "name": "Tajikistan",
    "continent": "Asia"
  },
  "TZ": {
    "name": "Tanzania",
    "continent": "Africa"
  },
  "TH": {
    "name": "Thailand",
    "continent": "Asia"
  },
  "CN-XZ": {
    "name": "Tibet",
    "continent": "Asia",
    "parent": "CN"
  },
  "TG": {
    "name": "Togo",
    "continent": "Africa"
  },
  "TK": {
    "name": "Tokelau",
    "continent": "Oceania",
    "parent": "NZ"
  },
  "TO": {
    "name": "Tonga",
    "continent": "Oceania"
  },
  "TT": {
    "name": "Trinidad & Tobago",
    "continent": "Americas"
  },
  "TN": {
    "name": "Tunisia",
    "continent": "Africa"
  },
  "TR": {
    "name": "Turkey",
    "continent": "Asia"
  },
  "TM": {
    "name": "Turkmenistan",
    "continent": "Asia"
  },
  "TC": {
    "name": "Turks & Caicos Islands",
    "continent": "Americas",
    "parent": "GB"
  },
  "TV": {
    "name": "Tuvalu",
    "continent": "Oceania"
  },
  "UG": {
    "name": "Uganda",
    "continent": "Africa"
  },
  "UA": {
    "name": "Ukraine",
    "continent": "Europe"
  },
  "AE": {
    "name": "United Arab Emirates",
    "continent": "Asia"
  },
  "GB": {
    "name": "United Kingdom",
    "continent": "Europe"
  },
  "US": {
    "name": "United States",
    "continent": "Americas"
  },
  "UM": {
    "name": "US Minor Outlying Islands",
    "continent": "Oceania",
    "parent": "US"
  },
  "UY": {
    "name": "Uruguay",
    "continent": "Americas"
  },
  "UZ": {
    "name": "Uzbekistan",
    "continent": "Asia"
  },
  "VU": {
    "name": "Vanuatu",
    "continent": "Oceania"
  },
  "VA": {
    "name": "Vatican City",
    "continent": "Europe"
  },
  "VE": {
    "name": "Venezuela",
    "continent": "Americas"
  },
  "VN": {
    "name": "Vietnam",
    "continent": "Asia"
  },
  "VG": {
    "name": "British Virgin Islands",
    "continent": "Americas",
    "parent": "GB"
  },
  "VI": {
    "name": "US Virgin Islands",
    "continent": "Americas",
    "parent": "US"
  },
  "GB-WLS": {
    "name": "Wales",
    "continent": "Europe",
    "parent": "GB"
  },
  "EH": {
    "name": "Western Sahara",
    "continent": "Africa"
  },
  "YE": {
    "name": "Yemen",
    "continent": "Asia"
  },
  "ZM": {
    "name": "Zambia",
    "continent": "Africa"
  },
  "ZW": {
    "name": "Zimbabwe",
    "continent": "Africa"
  }
};
