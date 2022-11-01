import { Client } from "@notionhq/client";
// export const notion = new Client({
//   auth: process.env.NOTION_API_KEY,
// });

export const notion = new Client({
  // auth: 'secret_PnMdCDcyyzqKiDBCRPPqbX4amqBP5hmVmncZwmydTeN',
  auth: 'secret_AK1OSnRF7UMvhNirA3RJXBfGM8msyuKzproMBS8BYMC',
});

export const databaseId = "07bc07b1-36df-4c01-b526-e6b72ccd4644";
// export const databaseId = process.env.DATABASE_ID;