import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

const countries = [
  { code: 'AF', name: 'Afghanistan', currency: 'AFN', symbol: '؋' },
  { code: 'AL', name: 'Albania', currency: 'ALL', symbol: 'L' },
  { code: 'DZ', name: 'Algeria', currency: 'DZD', symbol: 'د.ج' },
  { code: 'AD', name: 'Andorra', currency: 'EUR', symbol: '€' },
  { code: 'AO', name: 'Angola', currency: 'AOA', symbol: 'Kz' },
  { code: 'AG', name: 'Antigua and Barbuda', currency: 'XCD', symbol: '$' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', symbol: '$' },
  { code: 'AM', name: 'Armenia', currency: 'AMD', symbol: '֏' },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: '$' },
  { code: 'AT', name: 'Austria', currency: 'EUR', symbol: '€' },
  { code: 'AZ', name: 'Azerbaijan', currency: 'AZN', symbol: '₼' },
  { code: 'BS', name: 'Bahamas', currency: 'BSD', symbol: '$' },
  { code: 'BH', name: 'Bahrain', currency: 'BHD', symbol: '.د.ب' },
  { code: 'BD', name: 'Bangladesh', currency: 'BDT', symbol: '৳' },
  { code: 'BB', name: 'Barbados', currency: 'BBD', symbol: '$' },
  { code: 'BY', name: 'Belarus', currency: 'BYN', symbol: 'Br' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', symbol: '€' },
  { code: 'BZ', name: 'Belize', currency: 'BZD', symbol: '$' },
  { code: 'BJ', name: 'Benin', currency: 'XOF', symbol: 'CFA' },
  { code: 'BT', name: 'Bhutan', currency: 'BTN', symbol: 'Nu.' },
  { code: 'BO', name: 'Bolivia', currency: 'BOB', symbol: 'Bs.' },
  { code: 'BA', name: 'Bosnia and Herzegovina', currency: 'BAM', symbol: 'KM' },
  { code: 'BW', name: 'Botswana', currency: 'BWP', symbol: 'P' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', symbol: 'R$' },
  { code: 'BN', name: 'Brunei', currency: 'BND', symbol: '$' },
  { code: 'BG', name: 'Bulgaria', currency: 'BGN', symbol: 'лв' },
  { code: 'BF', name: 'Burkina Faso', currency: 'XOF', symbol: 'CFA' },
  { code: 'BI', name: 'Burundi', currency: 'BIF', symbol: 'FBu' },
  { code: 'KH', name: 'Cambodia', currency: 'KHR', symbol: '៛' },
  { code: 'CM', name: 'Cameroon', currency: 'XAF', symbol: 'FCFA' },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: '$' },
  { code: 'CV', name: 'Cape Verde', currency: 'CVE', symbol: '$' },
  { code: 'CF', name: 'Central African Republic', currency: 'XAF', symbol: 'FCFA' },
  { code: 'TD', name: 'Chad', currency: 'XAF', symbol: 'FCFA' },
  { code: 'CL', name: 'Chile', currency: 'CLP', symbol: '$' },
  { code: 'CN', name: 'China', currency: 'CNY', symbol: '¥' },
  { code: 'CO', name: 'Colombia', currency: 'COP', symbol: '$' },
  { code: 'KM', name: 'Comoros', currency: 'KMF', symbol: 'CF' },
  { code: 'CG', name: 'Congo', currency: 'XAF', symbol: 'FCFA' },
  { code: 'CR', name: 'Costa Rica', currency: 'CRC', symbol: '₡' },
  { code: 'HR', name: 'Croatia', currency: 'HRK', symbol: 'kn' },
  { code: 'CU', name: 'Cuba', currency: 'CUP', symbol: '₱' },
  { code: 'CY', name: 'Cyprus', currency: 'EUR', symbol: '€' },
  { code: 'CZ', name: 'Czech Republic', currency: 'CZK', symbol: 'Kč' },
  { code: 'DK', name: 'Denmark', currency: 'DKK', symbol: 'kr' },
  { code: 'DJ', name: 'Djibouti', currency: 'DJF', symbol: 'Fdj' },
  { code: 'DM', name: 'Dominica', currency: 'XCD', symbol: '$' },
  { code: 'DO', name: 'Dominican Republic', currency: 'DOP', symbol: 'RD$' },
  { code: 'EC', name: 'Ecuador', currency: 'USD', symbol: '$' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', symbol: '£' },
  { code: 'SV', name: 'El Salvador', currency: 'USD', symbol: '$' },
  { code: 'GQ', name: 'Equatorial Guinea', currency: 'XAF', symbol: 'FCFA' },
  { code: 'ER', name: 'Eritrea', currency: 'ERN', symbol: 'Nfk' },
  { code: 'EE', name: 'Estonia', currency: 'EUR', symbol: '€' },
  { code: 'ET', name: 'Ethiopia', currency: 'ETB', symbol: 'Br' },
  { code: 'FJ', name: 'Fiji', currency: 'FJD', symbol: '$' },
  { code: 'FI', name: 'Finland', currency: 'EUR', symbol: '€' },
  { code: 'FR', name: 'France', currency: 'EUR', symbol: '€' },
  { code: 'GA', name: 'Gabon', currency: 'XAF', symbol: 'FCFA' },
  { code: 'GM', name: 'Gambia', currency: 'GMD', symbol: 'D' },
  { code: 'GE', name: 'Georgia', currency: 'GEL', symbol: '₾' },
  { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', symbol: '₵' },
  { code: 'GR', name: 'Greece', currency: 'EUR', symbol: '€' },
  { code: 'GD', name: 'Grenada', currency: 'XCD', symbol: '$' },
  { code: 'GT', name: 'Guatemala', currency: 'GTQ', symbol: 'Q' },
  { code: 'GN', name: 'Guinea', currency: 'GNF', symbol: 'FG' },
  { code: 'GW', name: 'Guinea-Bissau', currency: 'XOF', symbol: 'CFA' },
  { code: 'GY', name: 'Guyana', currency: 'GYD', symbol: '$' },
  { code: 'HT', name: 'Haiti', currency: 'HTG', symbol: 'G' },
  { code: 'HN', name: 'Honduras', currency: 'HNL', symbol: 'L' },
  { code: 'HU', name: 'Hungary', currency: 'HUF', symbol: 'Ft' },
  { code: 'IS', name: 'Iceland', currency: 'ISK', symbol: 'kr' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹' },
  { code: 'ID', name: 'Indonesia', currency: 'IDR', symbol: 'Rp' },
  { code: 'IR', name: 'Iran', currency: 'IRR', symbol: '﷼' },
  { code: 'IQ', name: 'Iraq', currency: 'IQD', symbol: 'ع.د' },
  { code: 'IE', name: 'Ireland', currency: 'EUR', symbol: '€' },
  { code: 'IL', name: 'Israel', currency: 'ILS', symbol: '₪' },
  { code: 'IT', name: 'Italy', currency: 'EUR', symbol: '€' },
  { code: 'JM', name: 'Jamaica', currency: 'JMD', symbol: '$' },
  { code: 'JP', name: 'Japan', currency: 'JPY', symbol: '¥' },
  { code: 'JO', name: 'Jordan', currency: 'JOD', symbol: 'د.ا' },
  { code: 'KZ', name: 'Kazakhstan', currency: 'KZT', symbol: '₸' },
  { code: 'KE', name: 'Kenya', currency: 'KES', symbol: 'KSh' },
  { code: 'KI', name: 'Kiribati', currency: 'AUD', symbol: '$' },
  { code: 'KP', name: 'North Korea', currency: 'KPW', symbol: '₩' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', symbol: '₩' },
  { code: 'KW', name: 'Kuwait', currency: 'KWD', symbol: 'د.ك' },
  { code: 'KG', name: 'Kyrgyzstan', currency: 'KGS', symbol: 'с' },
  { code: 'LA', name: 'Laos', currency: 'LAK', symbol: '₭' },
  { code: 'LV', name: 'Latvia', currency: 'EUR', symbol: '€' },
  { code: 'LB', name: 'Lebanon', currency: 'LBP', symbol: 'ل.ل' },
  { code: 'LS', name: 'Lesotho', currency: 'LSL', symbol: 'L' },
  { code: 'LR', name: 'Liberia', currency: 'LRD', symbol: '$' },
  { code: 'LY', name: 'Libya', currency: 'LYD', symbol: 'ل.د' },
  { code: 'LI', name: 'Liechtenstein', currency: 'CHF', symbol: 'Fr' },
  { code: 'LT', name: 'Lithuania', currency: 'EUR', symbol: '€' },
  { code: 'LU', name: 'Luxembourg', currency: 'EUR', symbol: '€' },
  { code: 'MK', name: 'North Macedonia', currency: 'MKD', symbol: 'ден' },
  { code: 'MG', name: 'Madagascar', currency: 'MGA', symbol: 'Ar' },
  { code: 'MW', name: 'Malawi', currency: 'MWK', symbol: 'MK' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', symbol: 'RM' },
  { code: 'MV', name: 'Maldives', currency: 'MVR', symbol: '.ރ' },
  { code: 'ML', name: 'Mali', currency: 'XOF', symbol: 'CFA' },
  { code: 'MT', name: 'Malta', currency: 'EUR', symbol: '€' },
  { code: 'MH', name: 'Marshall Islands', currency: 'USD', symbol: '$' },
  { code: 'MR', name: 'Mauritania', currency: 'MRU', symbol: 'UM' },
  { code: 'MU', name: 'Mauritius', currency: 'MUR', symbol: '₨' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', symbol: '$' },
  { code: 'FM', name: 'Micronesia', currency: 'USD', symbol: '$' },
  { code: 'MD', name: 'Moldova', currency: 'MDL', symbol: 'L' },
  { code: 'MC', name: 'Monaco', currency: 'EUR', symbol: '€' },
  { code: 'MN', name: 'Mongolia', currency: 'MNT', symbol: '₮' },
  { code: 'ME', name: 'Montenegro', currency: 'EUR', symbol: '€' },
  { code: 'MA', name: 'Morocco', currency: 'MAD', symbol: 'د.م.' },
  { code: 'MZ', name: 'Mozambique', currency: 'MZN', symbol: 'MT' },
  { code: 'MM', name: 'Myanmar', currency: 'MMK', symbol: 'Ks' },
  { code: 'NA', name: 'Namibia', currency: 'NAD', symbol: '$' },
  { code: 'NR', name: 'Nauru', currency: 'AUD', symbol: '$' },
  { code: 'NP', name: 'Nepal', currency: 'NPR', symbol: '₨' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', symbol: '€' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', symbol: '$' },
  { code: 'NI', name: 'Nicaragua', currency: 'NIO', symbol: 'C$' },
  { code: 'NE', name: 'Niger', currency: 'XOF', symbol: 'CFA' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', symbol: '₦' },
  { code: 'NO', name: 'Norway', currency: 'NOK', symbol: 'kr' },
  { code: 'OM', name: 'Oman', currency: 'OMR', symbol: 'ر.ع.' },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', symbol: '₨' },
  { code: 'PW', name: 'Palau', currency: 'USD', symbol: '$' },
  { code: 'PA', name: 'Panama', currency: 'PAB', symbol: 'B/.' },
  { code: 'PG', name: 'Papua New Guinea', currency: 'PGK', symbol: 'K' },
  { code: 'PY', name: 'Paraguay', currency: 'PYG', symbol: '₲' },
  { code: 'PE', name: 'Peru', currency: 'PEN', symbol: 'S/.' },
  { code: 'PH', name: 'Philippines', currency: 'PHP', symbol: '₱' },
  { code: 'PL', name: 'Poland', currency: 'PLN', symbol: 'zł' },
  { code: 'PT', name: 'Portugal', currency: 'EUR', symbol: '€' },
  { code: 'QA', name: 'Qatar', currency: 'QAR', symbol: 'ر.ق' },
  { code: 'RO', name: 'Romania', currency: 'RON', symbol: 'lei' },
  { code: 'RU', name: 'Russia', currency: 'RUB', symbol: '₽' },
  { code: 'RW', name: 'Rwanda', currency: 'RWF', symbol: 'FRw' },
  { code: 'KN', name: 'Saint Kitts and Nevis', currency: 'XCD', symbol: '$' },
  { code: 'LC', name: 'Saint Lucia', currency: 'XCD', symbol: '$' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', currency: 'XCD', symbol: '$' },
  { code: 'WS', name: 'Samoa', currency: 'WST', symbol: 'T' },
  { code: 'SM', name: 'San Marino', currency: 'EUR', symbol: '€' },
  { code: 'ST', name: 'Sao Tome and Principe', currency: 'STN', symbol: 'Db' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', symbol: 'ر.س' },
  { code: 'SN', name: 'Senegal', currency: 'XOF', symbol: 'CFA' },
  { code: 'RS', name: 'Serbia', currency: 'RSD', symbol: 'дин.' },
  { code: 'SC', name: 'Seychelles', currency: 'SCR', symbol: '₨' },
  { code: 'SL', name: 'Sierra Leone', currency: 'SLL', symbol: 'Le' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', symbol: '$' },
  { code: 'SK', name: 'Slovakia', currency: 'EUR', symbol: '€' },
  { code: 'SI', name: 'Slovenia', currency: 'EUR', symbol: '€' },
  { code: 'SB', name: 'Solomon Islands', currency: 'SBD', symbol: '$' },
  { code: 'SO', name: 'Somalia', currency: 'SOS', symbol: 'S' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', symbol: 'R' },
  { code: 'SS', name: 'South Sudan', currency: 'SSP', symbol: '£' },
  { code: 'ES', name: 'Spain', currency: 'EUR', symbol: '€' },
  { code: 'LK', name: 'Sri Lanka', currency: 'LKR', symbol: '₨' },
  { code: 'SD', name: 'Sudan', currency: 'SDG', symbol: 'ج.س.' },
  { code: 'SR', name: 'Suriname', currency: 'SRD', symbol: '$' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', symbol: 'kr' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', symbol: 'Fr' },
  { code: 'SY', name: 'Syria', currency: 'SYP', symbol: '£' },
  { code: 'TW', name: 'Taiwan', currency: 'TWD', symbol: 'NT$' },
  { code: 'TJ', name: 'Tajikistan', currency: 'TJS', symbol: 'ЅМ' },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', symbol: 'TSh' },
  { code: 'TH', name: 'Thailand', currency: 'THB', symbol: '฿' },
  { code: 'TL', name: 'Timor-Leste', currency: 'USD', symbol: '$' },
  { code: 'TG', name: 'Togo', currency: 'XOF', symbol: 'CFA' },
  { code: 'TO', name: 'Tonga', currency: 'TOP', symbol: 'T$' },
  { code: 'TT', name: 'Trinidad and Tobago', currency: 'TTD', symbol: 'TT$' },
  { code: 'TN', name: 'Tunisia', currency: 'TND', symbol: 'د.ت' },
  { code: 'TR', name: 'Turkey', currency: 'TRY', symbol: '₺' },
  { code: 'TM', name: 'Turkmenistan', currency: 'TMT', symbol: 'T' },
  { code: 'TV', name: 'Tuvalu', currency: 'AUD', symbol: '$' },
  { code: 'UG', name: 'Uganda', currency: 'UGX', symbol: 'USh' },
  { code: 'UA', name: 'Ukraine', currency: 'UAH', symbol: '₴' },
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', symbol: 'د.إ' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£' },
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$' },
  { code: 'UY', name: 'Uruguay', currency: 'UYU', symbol: '$U' },
  { code: 'UZ', name: 'Uzbekistan', currency: 'UZS', symbol: 'лв' },
  { code: 'VU', name: 'Vanuatu', currency: 'VUV', symbol: 'VT' },
  { code: 'VA', name: 'Vatican City', currency: 'EUR', symbol: '€' },
  { code: 'VE', name: 'Venezuela', currency: 'VES', symbol: 'Bs.' },
  { code: 'VN', name: 'Vietnam', currency: 'VND', symbol: '₫' },
  { code: 'YE', name: 'Yemen', currency: 'YER', symbol: '﷼' },
  { code: 'ZM', name: 'Zambia', currency: 'ZMW', symbol: 'ZK' },
  { code: 'ZW', name: 'Zimbabwe', currency: 'ZWL', symbol: '$' }
];

export default function CountrySelector({ onSelectCountry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const dropdownRef = useRef(null);
  const country = useSelector(state => state.currency.selectedCountry)

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    onSelectCountry(country);
    setIsOpen(false);
    setSearchTerm('')
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span>{country.code}</span>
        <ChevronDown size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                className="w-full pl-8 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Search countries"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleSelectCountry(country)}
              >
                {country.name} ({country.currency})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}