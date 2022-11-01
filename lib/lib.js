import { MARKETPLACE, REGEXPSTRS } from "./constants";

export function parseUrl(url) {
  const { market, country } = getMarket(url);
  const item = getId(url, market);

  return { market, item, country };
}

function determineAmazonCountry(url) {
  let country = "unknown-amazon-country";

  if (url.indexOf("amazon.ae") != -1) {
    country = "UAE";
  } else if (url.indexOf("amazon.ca") != -1) {
    country = "Canada";
  } else if (url.indexOf("amazon.cn") != -1) {
    country = "China";
  } else if (url.indexOf("amazon.co.jp") != -1) {
    country = "Japan";
  } else if (url.indexOf("amazon.co.uk") != -1) {
    country = "UK";
  } else if (url.indexOf("amazon.com") != -1) {
    country = "USA";
  } else if (url.indexOf("amazon.com.au") != -1) {
    country = "Australia";
  } else if (url.indexOf("amazon.com.br") != -1) {
    country = "Brazil";
  } else if (url.indexOf("amazon.com.mx") != -1) {
    country = "Mexico";
  } else if (url.indexOf("amazon.com.tr") != -1) {
    country = "Turkey";
  } else if (url.indexOf("amazon.de") != -1) {
    country = "Germany";
  } else if (url.indexOf("amazon.eg") != -1) {
    country = "Egypt";
  } else if (url.indexOf("amazon.es") != -1) {
    country = "Spain";
  } else if (url.indexOf("amazon.fr") != -1) {
    country = "France";
  } else if (url.indexOf("amazon.in") != -1) {
    country = "India";
  } else if (url.indexOf("amazon.it") != -1) {
    country = "Italy";
  } else if (url.indexOf("amazon.nl") != -1) {
    country = "Netherlands";
  } else if (url.indexOf("amazon.pl") != -1) {
    country = "Poland";
  } else if (url.indexOf("amazon.sa") != -1) {
    country = "Saudi Arabia";
  } else if (url.indexOf("amazon.se") != -1) {
    country = "Sweden";
  } else if (url.indexOf("amazon.sg") != -1) {
    country = "Singapore";
  }

  return country;
}

const getMarket = (url) => {
  if (!url) {
    return { market: "", country: "" };
  }

  if (url.indexOf(MARKETPLACE.AMAZON) != -1) {
    const market = "Amazon";
    const country = determineAmazonCountry(url);

    return { market, country };
  } else if (url.indexOf(MARKETPLACE.EBAY) != -1) {
    const market = "eBay";
    const country = "USA";

    return { market, country };
  } else if (url.indexOf(MARKETPLACE.ETSY) != -1) {
    const market = "Etsy";
    const country = "USA";

    return { market, country };
  } else if (url.indexOf(MARKETPLACE.WALMART) != -1) {
    const market = "Walmart";
    const country = "USA";

    return { market, country };
  }

  return { market: "", country: "" };
};

const getId = (url, market) => {
  if (!market) {
    return "";
  }

  const re = new RegExp(REGEXPSTRS[market]);
  const matches = re.exec(url);

  return matches[1];
};
