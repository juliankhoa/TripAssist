const COUNTRIES = [{
    name: 'Afghanistan',
    code: 'AF',
    continent: 'Asia'
  },
  {
    name: 'Åland Islands',
    code: 'AX',
    continent: 'Europe'
  },
  {
    name: 'Albania',
    code: 'AL',
    continent: 'Europe'
  },
  {
    name: 'Algeria',
    code: 'DZ',
    continent: 'Africa'
  },
  {
    name: 'American Samoa',
    code: 'AS',
    continent: 'Oceania'
  },
  {
    name: 'Andorra',
    code: 'AD',
    continent: 'Europe'
  },
  {
    name: 'Angola',
    code: 'AO',
    continent: 'Africa'
  },
  {
    name: 'Anguilla',
    code: 'AI',
    continent: 'Americas'
  },
  {
    name: 'Antigua & Barbuda',
    code: 'AG',
    continent: 'Americas'
  },
  {
    name: 'Argentina',
    code: 'AR',
    continent: 'Americas'
  },
  {
    name: 'Armenia',
    code: 'AM',
    continent: 'Asia'
  },
  {
    name: 'Aruba',
    code: 'AW',
    continent: 'Americas'
  },
  {
    name: 'Australia',
    code: 'AU',
    continent: 'Oceania',
    territories: ['NF', 'CX', 'CC', 'HM']
  },
  {
    name: 'Austria',
    code: 'AT',
    continent: 'Europe'
  },
  {
    name: 'Azerbaijan',
    code: 'AZ',
    continent: 'Asia'
  },
  {
    name: 'Azores',
    code: 'PT-20',
    continent: 'Europe'
  },
  {
    name: 'Bahamas',
    code: 'BS',
    continent: 'Americas'
  },
  {
    name: 'Bahrain',
    code: 'BH',
    continent: 'Asia'
  },
  {
    name: 'Balearic Islands',
    code: 'ES-IB',
    continent: 'Europe'
  },
  {
    name: 'Bangladesh',
    code: 'BD',
    continent: 'Asia'
  },
  {
    name: 'Barbados',
    code: 'BB',
    continent: 'Americas'
  },
  {
    name: 'Basque Country',
    code: 'ES-PV',
    continent: 'Europe'
  },
  {
    name: 'Belarus',
    code: 'BY',
    continent: 'Europe'
  },
  {
    name: 'Belgium',
    code: 'BE',
    continent: 'Europe'
  },
  {
    name: 'Belize',
    code: 'BZ',
    continent: 'Americas'
  },
  {
    name: 'Benin',
    code: 'BJ',
    continent: 'Africa'
  },
  {
    name: 'Bermuda',
    code: 'BM',
    continent: 'Americas'
  },
  {
    name: 'Bhutan',
    code: 'BT',
    continent: 'Asia'
  },
  {
    name: 'Bolivia',
    code: 'BO',
    continent: 'Americas'
  },
  {
    name: 'Bonaire',
    code: 'BQ-BO',
    continent: 'Americas'
  },
  {
    name: 'Bosnia & Herzegovina',
    code: 'BA',
    continent: 'Europe'
  },
  {
    name: 'Botswana',
    code: 'BW',
    continent: 'Africa'
  },
  {
    name: 'Brazil',
    code: 'BR',
    continent: 'Americas'
  },
  {
    name: 'British Indian Ocean Territory',
    code: 'IO',
    continent: 'Asia'
  },
  {
    name: 'Brunei',
    code: 'BN',
    continent: 'Asia'
  },
  {
    name: 'Bulgaria',
    code: 'BG',
    continent: 'Europe'
  },
  {
    name: 'Burkina Faso',
    code: 'BF',
    continent: 'Africa'
  },
  {
    name: 'Burundi',
    code: 'BI',
    continent: 'Africa'
  },
  {
    name: 'Cambodia',
    code: 'KH',
    continent: 'Asia'
  },
  {
    name: 'Cameroon',
    code: 'CM',
    continent: 'Africa'
  },
  {
    name: 'Canada',
    code: 'CA',
    continent: 'Americas'
  },
  {
    name: 'Canary Islands',
    code: 'ES-CN',
    continent: 'Africa'
  },
  {
    name: 'Cape Verde',
    code: 'CV',
    continent: 'Africa'
  },
  {
    name: 'Cayman Islands',
    code: 'KY',
    continent: 'Americas'
  },
  {
    name: 'Central African Republic',
    code: 'CF',
    continent: 'Africa'
  },
  {
    name: 'Ceuta',
    code: 'ES-CE',
    continent: 'Africa'
  },
  {
    name: 'Chad',
    code: 'TD',
    continent: 'Africa'
  },
  {
    name: 'Chile',
    code: 'CL',
    continent: 'Americas',
    territories: ['Easter Island']
  },
  {
    name: 'China',
    code: 'CN',
    continent: 'Asia',
    territories: ['HK', 'MO', 'CN-XZ']
  },
  {
    name: 'Christmas Island',
    code: 'CX',
    continent: 'Oceania'
  },
  {
    name: 'Cocos (Keeling) Islands',
    code: 'CC',
    continent: 'Oceania'
  },
  {
    name: 'Colombia',
    code: 'CO',
    continent: 'Americas'
  },
  {
    name: 'Comoros',
    code: 'KM',
    continent: 'Africa'
  },
  {
    name: 'Republic of the Congo',
    code: 'CG',
    continent: 'Africa'
  },
  {
    name: 'Democratic Republic of the Congo',
    code: 'CD',
    continent: 'Africa'
  },
  {
    name: 'Cook Islands',
    code: 'CK',
    continent: 'Oceania'
  },
  {
    name: 'Corsica',
    code: 'FR-20R',
    continent: 'Europe'
  },
  {
    name: 'Costa Rica',
    code: 'CR',
    continent: 'Americas'
  },
  {
    name: 'Croatia',
    code: 'HR',
    continent: 'Europe'
  },
  {
    name: 'Cuba',
    code: 'CU',
    continent: 'Americas'
  },
  {
    name: 'Curaçao',
    code: 'CW',
    continent: 'Americas'
  },
  {
    name: 'Cyprus',
    code: 'CY',
    continent: 'Europe'
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    continent: 'Europe'
  },
  {
    name: 'Denmark',
    code: 'DK',
    continent: 'Europe',
    territories: ['FO', 'GL']
  },
  {
    name: 'Djibouti',
    code: 'DJ',
    continent: 'Africa'
  },
  {
    name: 'Dominica',
    code: 'DM',
    continent: 'Americas'
  },
  {
    name: 'Dominican Republic',
    code: 'DO',
    continent: 'Americas'
  },
  {
    name: 'East Timor',
    code: 'TL',
    continent: 'Asia'
  },
  {
    name: 'Easter Island',
    code: 'CL-VS',
    continent: 'Americas'
  },
  {
    name: 'Ecuador',
    code: 'EC',
    continent: 'Americas',
    territories: ['EC-W']
  },
  {
    name: 'Egypt',
    code: 'EG',
    continent: 'Africa'
  },
  {
    name: 'El Salvador',
    code: 'SV',
    continent: 'Americas'
  },
  {
    name: 'England',
    code: 'GB-ENG',
    continent: 'Europe'
  },
  {
    name: 'Equatorial Guinea',
    code: 'GQ',
    continent: 'Africa'
  },
  {
    name: 'Eritrea',
    code: 'ER',
    continent: 'Africa'
  },
  {
    name: 'Estonia',
    code: 'EE',
    continent: 'Europe'
  },
  {
    name: 'Eswatini',
    code: 'SZ',
    continent: 'Africa'
  },
  {
    name: 'Ethiopia',
    code: 'ET',
    continent: 'Africa'
  },
  {
    name: 'Falkland Islands (Islas Malvinas)',
    code: 'FK',
    continent: 'Americas'
  },
  {
    name: 'Faroe Islands',
    code: 'FO',
    continent: 'Europe'
  },
  {
    name: 'Fiji',
    code: 'FJ',
    continent: 'Oceania'
  },
  {
    name: 'Finland',
    code: 'FI',
    continent: 'Europe',
    territories: ['AX']
  },
  {
    name: 'France',
    code: 'FR',
    continent: 'Europe',
    territories: ['RE', 'GP', 'MQ', 'PF', 'GF', 'TF', 'YT', 'NC', 'BL', 'PM', 'FR-20R']
  },
  {
    name: 'French Guiana',
    code: 'GF',
    continent: 'Americas'
  },
  {
    name: 'French Polynesia',
    code: 'PF',
    continent: 'Oceania'
  },
  {
    name: 'French Southern Territories',
    code: 'TF',
    continent: 'Africa'
  },
  {
    name: 'Gabon',
    code: 'GA',
    continent: 'Africa'
  },
  {
    name: 'Galápagos Islands',
    code: 'EC-W',
    continent: 'Americas'
  },
  {
    name: 'Gambia',
    code: 'GM',
    continent: 'Africa'
  },
  {
    name: 'Georgia',
    code: 'GE',
    continent: 'Europe'
  },
  {
    name: 'Germany',
    code: 'DE',
    continent: 'Europe'
  },
  {
    name: 'Ghana',
    code: 'GH',
    continent: 'Africa'
  },
  {
    name: 'Gibraltar',
    code: 'GI',
    continent: 'Europe'
  },
  {
    name: 'Greece',
    code: 'GR',
    continent: 'Europe'
  },
  {
    name: 'Greenland',
    code: 'GL',
    continent: 'Americas'
  },
  {
    name: 'Grenada',
    code: 'GD',
    continent: 'Americas'
  },
  {
    name: 'Guadeloupe',
    code: 'GP',
    continent: 'Americas'
  },
  {
    name: 'Guam',
    code: 'GU',
    continent: 'Oceania'
  },
  {
    name: 'Guatemala',
    code: 'GT',
    continent: 'Americas'
  },
  {
    name: 'Guernsey',
    code: 'GG',
    continent: 'Europe'
  },
  {
    name: 'Guinea',
    code: 'GN',
    continent: 'Africa'
  },
  {
    name: 'Guinea-Bissau',
    code: 'GW',
    continent: 'Africa'
  },
  {
    name: 'Guyana',
    code: 'GY',
    continent: 'Americas'
  },
  {
    name: 'Haiti',
    code: 'HT',
    continent: 'Americas'
  },
  {
    name: 'Hawaii',
    code: 'US-HI',
    continent: 'Oceania'
  },
  {
    name: 'Heard Island & McDonald Islands',
    code: 'HM',
    continent: 'Oceania'
  },
  {
    name: 'Honduras',
    code: 'HN',
    continent: 'Americas'
  },
  {
    name: 'Hong Kong',
    code: 'HK',
    continent: 'Asia'
  },
  {
    name: 'Hungary',
    code: 'HU',
    continent: 'Europe'
  },
  {
    name: 'Iceland',
    code: 'IS',
    continent: 'Europe'
  },
  {
    name: 'India',
    code: 'IN',
    continent: 'Asia'
  },
  {
    name: 'Indonesia',
    code: 'ID',
    continent: 'Asia'
  },
  {
    name: 'Iran',
    code: 'IR',
    continent: 'Asia'
  },
  {
    name: 'Iraq',
    code: 'IQ',
    continent: 'Asia'
  },
  {
    name: 'Ireland',
    code: 'IE',
    continent: 'Europe'
  },
  {
    name: 'Isle of Man',
    code: 'IM',
    continent: 'Europe'
  },
  {
    name: 'Israel',
    code: 'IL',
    continent: 'Asia'
  },
  {
    name: 'Italy',
    code: 'IT',
    continent: 'Europe',
    territories: ['IT-88', 'IT-82']
  },
  {
    name: 'Ivory Coast',
    code: 'CI',
    continent: 'Africa'
  },
  {
    name: 'Jamaica',
    code: 'JM',
    continent: 'Americas'
  },
  {
    name: 'Japan',
    code: 'JP',
    continent: 'Asia'
  },
  {
    name: 'Jersey',
    code: 'JE',
    continent: 'Europe'
  },
  {
    name: 'Jordan',
    code: 'JO',
    continent: 'Africa'
  },
  {
    name: 'Kazakhstan',
    code: 'KZ',
    continent: 'Asia'
  },
  {
    name: 'Kenya',
    code: 'KE',
    continent: 'Africa'
  },
  {
    name: 'Kiribati',
    code: 'KI',
    continent: 'Oceania'
  },
  {
    name: 'North Korea',
    code: 'KP',
    continent: 'Asia'
  },
  {
    name: 'South Korea',
    code: 'KR',
    continent: 'Asia'
  },
  {
    name: 'Kosovo',
    code: 'XK',
    continent: 'Europe'
  },
  {
    name: 'Kuwait',
    code: 'KW',
    continent: 'Asia'
  },
  {
    name: 'Kyrgyzstan',
    code: 'KG',
    continent: 'Asia'
  },
  {
    name: 'Laos',
    code: 'LA',
    continent: 'Asia'
  },
  {
    name: 'Latvia',
    code: 'LV',
    continent: 'Europe'
  },
  {
    name: 'Lebanon',
    code: 'LB',
    continent: 'Asia'
  },
  {
    name: 'Lesotho',
    code: 'LS',
    continent: 'Africa'
  },
  {
    name: 'Liberia',
    code: 'LR',
    continent: 'Africa'
  },
  {
    name: 'Libya',
    code: 'LY',
    continent: 'Africa'
  },
  {
    name: 'Liechtenstein',
    code: 'LI',
    continent: 'Europe'
  },
  {
    name: 'Lithuania',
    code: 'LT',
    continent: 'Europe'
  },
  {
    name: 'Luxembourg',
    code: 'LU',
    continent: 'Europe'
  },
  {
    name: 'Macao',
    code: 'MO',
    continent: 'Asia'
  },
  {
    name: 'North Macedonia',
    code: 'MK',
    continent: 'Europe'
  },
  {
    name: 'Madagascar',
    code: 'MG',
    continent: 'Africa'
  },
  {
    name: 'Madeira',
    code: 'PT-30',
    continent: 'Africa'
  },
  {
    name: 'Malawi',
    code: 'MW',
    continent: 'Africa'
  },
  {
    name: 'Malaysia',
    code: 'MY',
    continent: 'Asia'
  },
  {
    name: 'Maldives',
    code: 'MV',
    continent: 'Asia'
  },
  {
    name: 'Mali',
    code: 'ML',
    continent: 'Africa'
  },
  {
    name: 'Malta',
    code: 'MT',
    continent: 'Europe'
  },
  {
    name: 'Marshall Islands',
    code: 'MH',
    continent: 'Oceania'
  },
  {
    name: 'Martinique',
    code: 'MQ',
    continent: 'Americas'
  },
  {
    name: 'Mauritania',
    code: 'MR',
    continent: 'Africa'
  },
  {
    name: 'Mauritius',
    code: 'MU',
    continent: 'Africa'
  },
  {
    name: 'Mayotte',
    code: 'YT',
    continent: 'Africa'
  },
  {
    name: 'Melilla',
    code: 'ES-ML',
    continent: 'Africa'
  },
  {
    name: 'Mexico',
    code: 'MX',
    continent: 'Americas'
  },
  {
    name: 'Micronesia',
    code: 'FM',
    continent: 'Oceania'
  },
  {
    name: 'Moldova',
    code: 'MD',
    continent: 'Europe'
  },
  {
    name: 'Monaco',
    code: 'MC',
    continent: 'Europe'
  },
  {
    name: 'Mongolia',
    code: 'MN',
    continent: 'Asia'
  },
  {
    name: 'Montenegro',
    code: 'ME',
    continent: 'Europe'
  },
  {
    name: 'Montserrat',
    code: 'MS',
    continent: 'Americas'
  },
  {
    name: 'Morocco',
    code: 'MA',
    continent: 'Africa'
  },
  {
    name: 'Mozambique',
    code: 'MZ',
    continent: 'Africa'
  },
  {
    name: 'Myanmar',
    code: 'MM',
    continent: 'Asia'
  },
  {
    name: 'Namibia',
    code: 'NA',
    continent: 'Africa'
  },
  {
    name: 'Nauru',
    code: 'NR',
    continent: 'Oceania'
  },
  {
    name: 'Nepal',
    code: 'NP',
    continent: 'Asia'
  },
  {
    name: 'Netherlands',
    code: 'NL',
    continent: 'Europe',
    territories: ['AW', 'CW', 'SX', 'BQ-BO', 'BQ-SA', 'BQ-SE']
  },
  {
    name: 'New Caledonia',
    code: 'NC',
    continent: 'Oceania'
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    continent: 'Oceania',
    territories: ['CK', 'NU', 'TK']
  },
  {
    name: 'Nicaragua',
    code: 'NI',
    continent: 'Americas'
  },
  {
    name: 'Niger',
    code: 'NE',
    continent: 'Africa'
  },
  {
    name: 'Nigeria',
    code: 'NG',
    continent: 'Africa'
  },
  {
    name: 'Niue',
    code: 'NU',
    continent: 'Oceania'
  },
  {
    name: 'Norfolk Island',
    code: 'NF',
    continent: 'Oceania'
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MP',
    continent: 'Oceania'
  },
  {
    name: 'Norway',
    code: 'NO',
    continent: 'Europe',
    territories: ['SJ']
  },
  {
    name: 'Oman',
    code: 'OM',
    continent: 'Asia'
  },
  {
    name: 'Pakistan',
    code: 'PK',
    continent: 'Asia'
  },
  {
    name: 'Palau',
    code: 'PW',
    continent: 'Oceania'
  },
  {
    name: 'Palestine',
    code: 'PS',
    continent: 'Asia'
  },
  {
    name: 'Panama',
    code: 'PA',
    continent: 'Americas'
  },
  {
    name: 'Papua New Guinea',
    code: 'PG',
    continent: 'Asia'
  },
  {
    name: 'Paraguay',
    code: 'PY',
    continent: 'Americas'
  },
  {
    name: 'Peru',
    code: 'PE',
    continent: 'Americas'
  },
  {
    name: 'Philippines',
    code: 'PH',
    continent: 'Asia'
  },
  {
    name: 'Pitcairn Islands',
    code: 'PN',
    continent: 'Oceania'
  },
  {
    name: 'Poland',
    code: 'PL',
    continent: 'Europe'
  },
  {
    name: 'Portugal',
    code: 'PT',
    continent: 'Europe',
    territories: ['PT-30', 'PT-20']
  },
  {
    name: 'Puerto Rico',
    code: 'PR',
    continent: 'Americas'
  },
  {
    name: 'Qatar',
    code: 'QA',
    continent: 'Asia'
  },
  {
    name: 'Rwanda',
    code: 'RW',
    continent: 'Africa'
  },
  {
    name: 'Réunion',
    code: 'RE',
    continent: 'Africa'
  },
  {
    name: 'Romania',
    code: 'RO',
    continent: 'Europe'
  },
  {
    name: 'Russia',
    code: 'RU',
    continent: 'Europe'
  },
  {
    name: 'Saba',
    code: 'BQ-SA',
    continent: 'Americas'
  },
  {
    name: 'Saint Barthélemy',
    code: 'BL',
    continent: 'Americas'
  },
  {
    name: 'Saint Kitts & Nevis',
    code: 'KN',
    continent: 'Americas'
  },
  {
    name: 'Saint Lucia',
    code: 'LC',
    continent: 'Americas'
  },
  {
    name: 'Saint Pierre & Miquelon',
    code: 'PM',
    continent: 'Americas'
  },
  {
    name: 'Saint Vincent & the Grenadines',
    code: 'VC',
    continent: 'Americas'
  },
  {
    name: 'Samoa',
    code: 'WS',
    continent: 'Oceania'
  },
  {
    name: 'San Marino',
    code: 'SM',
    continent: 'Europe'
  },
  {
    name: 'Sardinia',
    code: 'IT-88',
    continent: 'Europe'
  },
  {
    name: 'São Tomé & Príncipe',
    code: 'ST',
    continent: 'Africa'
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    continent: 'Asia'
  },
  {
    name: 'Scotland',
    code: 'GB-SCT',
    continent: 'Europe'
  },
  {
    name: 'Senegal',
    code: 'SN',
    continent: 'Africa'
  },
  {
    name: 'Serbia',
    code: 'RS',
    continent: 'Europe'
  },
  {
    name: 'Seychelles',
    code: 'SC',
    continent: 'Africa'
  },
  {
    name: 'Sicily',
    code: 'IT-82',
    continent: 'Europe'
  },
  {
    name: 'Sierra Leone',
    code: 'SL',
    continent: 'Africa'
  },
  {
    name: 'Singapore',
    code: 'SG',
    continent: 'Asia'
  },
  {
    name: 'Sint Eustatius',
    code: 'BQ-SE',
    continent: 'Americas'
  },
  {
    name: 'Sint Maarten',
    code: 'SX',
    continent: 'Americas'
  },
  {
    name: 'Slovakia',
    code: 'SK',
    continent: 'Europe'
  },
  {
    name: 'Slovenia',
    code: 'SI',
    continent: 'Europe'
  },
  {
    name: 'Solomon Islands',
    code: 'SB',
    continent: 'Oceania'
  },
  {
    name: 'Somalia',
    code: 'SO',
    continent: 'Africa'
  },
  {
    name: 'South Africa',
    code: 'ZA',
    continent: 'Africa'
  },
  {
    name: 'South Sudan',
    code: 'SS',
    continent: 'Africa'
  },
  {
    name: 'Spain',
    code: 'ES',
    continent: 'Europe',
    territories: ['ES-CN', 'ES-CE', 'ES-IB', 'ES-ML', 'ES-PV']
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    continent: 'Asia'
  },
  {
    name: 'Sudan',
    code: 'SD',
    continent: 'Africa'
  },
  {
    name: 'Suriname',
    code: 'SR',
    continent: 'Americas'
  },
  {
    name: 'Svalbard & Jan Mayen',
    code: 'SJ',
    continent: 'Europe'
  },
  {
    name: 'Sweden',
    code: 'SE',
    continent: 'Europe'
  },
  {
    name: 'Switzerland',
    code: 'CH',
    continent: 'Europe'
  },
  {
    name: 'Syria',
    code: 'SY',
    continent: 'Asia'
  },
  {
    name: 'Taiwan',
    code: 'TW',
    continent: 'Asia'
  },
  {
    name: 'Tajikistan',
    code: 'TJ',
    continent: 'Asia'
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    continent: 'Africa'
  },
  {
    name: 'Thailand',
    code: 'TH',
    continent: 'Asia'
  },
  {
    name: 'Tibet',
    code: 'CN-XZ',
    continent: 'Asia'
  },
  {
    name: 'Togo',
    code: 'TG',
    continent: 'Africa'
  },
  {
    name: 'Tokelau',
    code: 'TK',
    continent: 'Oceania'
  },
  {
    name: 'Tonga',
    code: 'TO',
    continent: 'Oceania'
  },
  {
    name: 'Trinidad & Tobago',
    code: 'TT',
    continent: 'Americas'
  },
  {
    name: 'Tunisia',
    code: 'TN',
    continent: 'Africa'
  },
  {
    name: 'Turkey',
    code: 'TR',
    continent: 'Asia'
  },
  {
    name: 'Turkmenistan',
    code: 'TM',
    continent: 'Asia'
  },
  {
    name: 'Turks & Caicos Islands',
    code: 'TC',
    continent: 'Americas'
  },
  {
    name: 'Tuvalu',
    code: 'TV',
    continent: 'Oceania'
  },
  {
    name: 'Uganda',
    code: 'UG',
    continent: 'Africa'
  },
  {
    name: 'Ukraine',
    code: 'UA',
    continent: 'Europe'
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    continent: 'Asia'
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    continent: 'Europe',
    territories: ['AI', 'BM', 'IO', 'VG', 'KY', 'FK', 'GI', 'MS', 'PN', 'TC', 'GG', 'IM', 'JE', 'GB-ENG', 'GB-SCT', 'GB-WLS']
  },
  {
    name: 'United States',
    code: 'US',
    continent: 'Americas',
    territories: ['AS', 'GU', 'MP', 'PR', 'VI', 'UM', 'US-HI']
  },
  {
    name: 'US Minor Outlying Islands',
    code: 'UM',
    continent: 'Oceania'
  },
  {
    name: 'Uruguay',
    code: 'UY',
    continent: 'Americas'
  },
  {
    name: 'Uzbekistan',
    code: 'UZ',
    continent: 'Asia'
  },
  {
    name: 'Vanuatu',
    code: 'VU',
    continent: 'Oceania'
  },
  {
    name: 'Vatican City',
    code: 'VA',
    continent: 'Europe'
  },
  {
    name: 'Venezuela',
    code: 'VE',
    continent: 'Americas'
  },
  {
    name: 'Vietnam',
    code: 'VN',
    continent: 'Asia'
  },
  {
    name: 'British Virgin Islands',
    code: 'VG',
    continent: 'Americas'
  },
  {
    name: 'US Virgin Islands',
    code: 'VI',
    continent: 'Americas'
  },
  {
    name: 'Wales',
    code: 'GB-WLS',
    continent: 'Europe'
  },
  {
    name: 'Western Sahara',
    code: 'EH',
    continent: 'Africa'
  },
  {
    name: 'Yemen',
    code: 'YE',
    continent: 'Asia'
  },
  {
    name: 'Zambia',
    code: 'ZM',
    continent: 'Africa'
  },
  {
    name: 'Zimbabwe',
    code: 'ZW',
    continent: 'Africa'
  },
]
