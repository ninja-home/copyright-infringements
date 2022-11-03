export const marketplaceOptions = [
  "Other",
  "Amazon",
  "eBay",
  "Etsy",
  "Walmart",
  "Mercari",
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
  AMAZON: "amazon.",
  ETSY: "etsy.com",
  EBAY: "ebay.com",
  WALMART: "walmart.com",
  MERCARI: "mercari.com",
};

export const REGEXPSTRS = {
  Amazon: "/dp/([A-Za-z0-9]*)",
  eBay: "/itm/([A-Za-z0-9]*)",
  Etsy: "/listing/([A-Za-z0-9]*)",
  Walmart: "(\\d+)(?!.*d)",
  Mercari: "/item/([A-Za-z0-9]*)",
};

export const TAROT_STATUS = {
  CLOSED: "Closed",
  ARCHIEVED: "Archieved",
  NEW: "New",
  PROCESSING: "Processing",
  RELISTED: "Relisted",
  BRAND_NEW: "Brandnew",
};
