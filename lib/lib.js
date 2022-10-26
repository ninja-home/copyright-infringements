export function parseUrl(e) {
    const url = e.target.value;
    console.log(`Parsing url ${url}`);

    // Amazon
    if (url.indexOf('amazon.') != -1) {
        // Set 'Marketplace' field
        setMarketplace('Amazon');

        // Set 'Item ID' field
        const itemId = extractAmazonAsin(url);
        setItemId(itemId);

        // Set 'Country' field
        const country = determineAmazonCountry(url);
        setCountry(country);
    }
}

function setMarketplace(value) {
    document.forms[0].elements['marketplace'].value = value;
}

function setCountry(value) {
    document.forms[0].elements['country'].value = value;
}

function setItemId(value) {
    document.forms[0].elements['itemId'].value = value;
}

function determineAmazonCountry(url) {
    var country = 'unknown-amazon-country';

    if (url.indexOf('amazon.ae') != -1) {
        country = 'UAE';
    } else if (url.indexOf('amazon.ca') != -1) {
        country = 'Canada';
    } else if (url.indexOf('amazon.cn') != -1) {
        country = 'China';
    } else if (url.indexOf('amazon.co.jp') != -1) {
        country = 'Japan';
    } else if (url.indexOf('amazon.co.uk') != -1) {
        country = 'UK';
    } else if (url.indexOf('amazon.com') != -1) {
        country = 'USA';
    } else if (url.indexOf('amazon.com.au') != -1) {
        country = 'Australia';
    } else if (url.indexOf('amazon.com.br') != -1) {
        country = 'Brazil';
    } else if (url.indexOf('amazon.com.mx') != -1) {
        country = 'Mexico';
    } else if (url.indexOf('amazon.com.tr') != -1) {
        country = 'Turkey';
    } else if (url.indexOf('amazon.de') != -1) {
        country = 'Germany';
    } else if (url.indexOf('amazon.eg') != -1) {
        country = 'Egypt';
    } else if (url.indexOf('amazon.es') != -1) {
        country = 'Spain';
    } else if (url.indexOf('amazon.fr') != -1) {
        country = 'France';
    } else if (url.indexOf('amazon.in') != -1) {
        country = 'India';
    } else if (url.indexOf('amazon.it') != -1) {
        country = 'Italy';
    } else if (url.indexOf('amazon.nl') != -1) {
        country = 'Netherlands';
    } else if (url.indexOf('amazon.pl') != -1) {
        country = 'Poland';
    } else if (url.indexOf('amazon.sa') != -1) {
        country = 'Saudi Arabia';
    } else if (url.indexOf('amazon.se') != -1) {
        country = 'Sweden';
    } else if (url.indexOf('amazon.sg') != -1) {
        country = 'Singapore';
    }

    return country;
}

function extractAmazonAsin(url) {
    const re = new RegExp('\/dp\/([A-Za-z0-9]*)');
    const matches = re.exec(url);

    if (matches != null) {
        return matches[1];
    }

    return 'error';
}
