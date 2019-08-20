export default {
  object: {
      group: 'Object',
      options: [],
      negative: []
    },
    firstName: {
        group: 'Name',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    lastName: {
        group: 'Name',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    fullName: {
        group: 'Name',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    suffix: {
        group: 'Name',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    prefix: {
        group: 'Name',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    gender: {
        group: 'Name',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    country: {
        group: 'Address',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    countryCode: {
        group: 'Address',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    state: {
        group: 'Address',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    stateCode: {
        group: 'Address',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    county: {
        group: 'Address',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    city: {
        group: 'Address',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    addressPrimary: {
        group: 'Address',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    addressSecondary: {
        group: 'Address',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    zipCode: {
        group: 'Address',
        options: [],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    latitude: {
        group: 'Address',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Chars']
    },
    longitude: {
        group: 'Address',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Chars']
    },
    email: {
        group: 'Internet',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    userName: {
        group: 'Internet',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    domainName: {
        group: 'Internet',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    ip: {
        group: 'Internet',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    ipv6: {
        group: 'Internet',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    url: {
        group: 'Internet',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    integer: {
        group: 'Numbers',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Chars']
    },
    float: {
        group: 'Numbers',
        options: ['min', 'max', 'float'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Chars']
    },
    incremental: {
        group: 'Numbers',
        options: ['start', 'step'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Chars']
    },
    phoneCountryCode: {
        group: 'Phone Number',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    phoneNumber: {
        group: 'Phone Number',
        options: ['phoneFormat'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    currentDate: {
        group: 'Date Time',
        options: ['dateFormat'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars'],
    },
    currentTime: {
        group: 'Date Time',
        options: ['timeFormat'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    currentDateTime: {
        group: 'Date Time',
        options: ['dateFormat', 'timeFormat'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    futureDate: {
        group: 'Date Time',
        options: ['dateFormat', 'days'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    futureTime: {
        group: 'Date Time',
        options: ['timeFormat', 'mins'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    futureDateTime: {
        group: 'Date Time',
        options: ['dateFormat', 'timeFormat', 'days', 'mins'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    pastDate: {
        group: 'Date Time',
        options: ['dateFormat', 'days'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    pastTime: {
        group: 'Date Time',
        options: ['timeFormat', 'mins'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    pastDateTime: {
        group: 'Date Time',
        options: ['dateFormat', 'timeFormat', 'days', 'mins'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    rangeDate: {
        group: 'Date Time',
        options: ['dateFormat', 'from', 'to'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars'],
        format: 'LL-dd-yyyy',
        type: 'date'
    },
    rangeTime: {
        group: 'Date Time',
        options: ['timeFormat', 'from', 'to'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars'],
        format: 'hh-mm',
        type: 'time'
    },
    rangeDateTime: {
        group: 'Date Time',
        options: ['dateFormat', 'timeFormat', 'from', 'to'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars'],
        format: 'LL-dd-yyyy hh-mm',
        type: 'datetime'
    },
    timestamp: {
        group: 'Date Time',
        options: ['from', 'to'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    timezone: {
        group: 'Date Time',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    boolean: {
        group: 'Boolean',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    cardType: {
        group: 'Credit Card',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    cardNumber: {
        group: 'Credit Card',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Chars']
    },
    currencyCode: {
        group: 'Currency',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    currencySymbol: {
        group: 'Currency',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    words: {
        group: 'Text',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    sentences: {
        group: 'Text',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    paragraphs: {
        group: 'Text',
        options: ['min', 'max'],
        negative: ['Above/Below', 'Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    color: {
        group: 'Text',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers']
    },
    custom: {
        group: 'Custom',
        options: ['value'],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    blank: {
        group: 'Custom',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    },
    null: {
        group: 'Custom',
        options: [],
        negative: ['Spaces', 'SQL injection', 'Special Chars', 'Numbers', 'Chars']
    }
}
