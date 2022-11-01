export const marketplaceOptions = [
  "Other",
  "Amazon",
  "eBay",
  "Etsy",
  "Walmart",
];

export const countryOptions = [
  "USA",
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "Egypt",
  "France",
  "Germany",
  "India",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "Poland",
  "Saudi Arabia",
  "Singapore",
  "Spain",
  "Sweden",
  "Turkey",
  "UAE",
  "UK",
];

export const violationsOptions = [
  {
    value: "Art",
    text: "Art",
  },
  {
    value: "Booklet",
    text: "Booklet",
  },
  {
    value: "Packaging",
    text: "Packaging",
  },
  {
    value: "Photos",
    text: "Photos",
  },
];

export const MARKETPLACE = {
  AMAZON: "www.amazon.com",
  ETSY: "www.etsy.com",
  EBAY: "www.ebay.com",
  WALMART: "www.walmart.com",
};

export const REGEXPSTRS = {
  Amazon: '\/dp\/([A-Za-z0-9]*)',
  eBay: '\/itm\/([A-Za-z0-9]*)',
  Etsy: '\/listing\/([A-Za-z0-9]*)',
  Walmart: '(\\d+)(?!.*\d)'
}

export const TAROT_STATUS = {
  CLOSED: 'closed',
  ARCHIEVED : 'archieved',
  NEW: 'new',
  PROCESSING: 'processing',
  RELISTED: 'relisted'
}