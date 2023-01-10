from faker import Faker

FAKER_METHODS = {
    'faker__name':  {'title': 'Full name'},
    'faker__address':  {'title': 'Address'},
    'faker__first_name':  {'title': 'First name'},
    'faker__first_name_female': {'title': 'First name female'},
    'faker__first_name_male': {'title': 'First name male'},
    'faker__last_name': {'title': 'Last name'},
    'faker__last_name_female': {'title': 'Last female name'},
    'faker__last_name_male': {'title': 'Last male name'},
    'faker__suffix': {'title': 'Titul'},
    'faker__city':  {'title': 'City'},
    'faker__country':  {'title': 'Country'},
    'faker__country_code':  {'title': 'Country code short'},
    'faker__bban':  {'title': 'Bank BBAN'},
    'faker__iban':  {'title': 'Bank IBAN'},
    'faker__swift':  {'title': 'Bank Swift code'},
    'faker__swift8':  {'title': 'Bank Swift code 8 digit'},
    'faker__ean8':  {'title': 'Barcode 8 digit EAN'},
    'faker__ean13':  {'title': 'Barcode 13 digit EAN'},
    'faker__hex_color':  {'title': 'HEX Color'},
    'faker__rgb_color':  {'title': 'RGB Color'},
    'faker__color_name':  {'title': 'Color name'},
    'faker__bs':  {'title': 'Company short description'},
    'faker__catch_phrase':  {'title': 'Company catch phrase'},
    'faker__company':  {'title': 'Company name'},
    'faker__company_suffix':  {'title': 'Company Type'},
    'faker__credit_card_expire':  {'title': 'Credit card expire'},
    'faker__credit_card_number':  {'title': 'Credit card number'},
    'faker__credit_card_provider':  {'title': 'Credit card provider'},
    'faker__credit_card_security_code':  {'title': 'Credit card code CVV'},
    'faker__currency_code':  {'title': 'Currency code'},
    'faker__am_pm':  {'title': 'Date format 12/24h'},
    'faker__date':  {'title': 'Date in format 1970-01-01', 'options': {'from': '', 'to': ''}, 'format': 'fDate'},
    'faker__date_time':  {'title': 'Random datetime', 'options': {'from': '', 'to': ''}, 'format': 'fDatetime'},
    'faker__date_time_this_month':  {'title': 'Datetime this month', 'options': {'from': '', 'to': ''}, 'format': 'fDatetime'},
    'faker__date_time_this_year':  {'title': 'Datetime this year', 'options': {'from': '', 'to': ''}, 'format': 'fDatetime'},
    'faker__month':  {'title': 'Month', 'format': 'fInteger'},
    'faker__month_name':  {'title': 'Month name'},
    'faker__future_datetime':  {'title': 'Future datetime', 'format': 'fDatetime'},
    'faker__future_date':  {'title': 'Future date', 'format': 'fDatetime'},
    'faker__past_date':  {'title': 'Past date', 'format': 'fDatetime'},
    'faker__past_datetime':  {'title': 'Past datetime', 'format': 'fDatetime'},
    'faker__unix_time':  {'title': 'Unit time', 'format': 'fInteger'},
    'faker__year':  {'title': 'Year', 'format': 'fInteger'},
    'faker__file_extension':  {'title': 'File extensions'},
    'faker__mime_type':  {'title': 'File API mime type'},
    'faker__ascii_free_email':  {'title': 'Free email'},
    'faker__ascii_company_email':  {'title': 'Company email'},
    'faker__ascii_email':  {'title': 'Email'},
    'faker__free_email_domain':  {'title': 'Free email domain'},
    'faker__ipv4':  {'title': 'IPv4'},
    'faker__ipv6':  {'title': 'IPv6'},
    'faker__mac_address':  {'title': 'Network MAC address'},
    'faker__port_number':  {'title': 'Network port number'},
    'faker__uri':  {'title': 'URI'},
    'faker__url':  {'title': 'URL'},
    'faker__job':  {'title': 'Job title'},
    'faker__paragraph':  {'title': 'Random text', 'options': {'nb_sentences': 5}},
    'faker__word':  {'title': 'Word'},
    'faker__json':  {'title': 'Json', 'format': 'fJson'},
    'faker__md5':  {'title': 'MD5'},
    'faker__password':  {'title': 'Passowrd', 'options': {'length': 12, 'special_chars': False}},
    'faker__sha1':  {'title': 'SHA1'},
    'faker__sha256':  {'title': 'SHA256'},
    'faker__uuid4':  {'title': 'UUID4'},
    'faker__country_calling_code':  {'title': 'Country calling code'},
    'faker__msisdn':  {'title': 'Phone MSISDN', 'format': 'fInteger'},
    'faker__user_agent':  {'title': 'User agent'},
}
