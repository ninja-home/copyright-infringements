import { notion, databaseId } from '../../lib/notion';

export default async function handler(req, res) {

  const notionResponse = await findItemById(req.query.itemId);

  if (!notionResponse) {
    // Item ID not found
    res.status(404).json({});
  } else {
    const returnedObject = {
      created_time: notionResponse.created_time,
      status: notionResponse.properties.Status,
      url: notionResponse.properties.URL,
    };

    // Sends a HTTP success code
    res.status(200).json(returnedObject);
  }

  res.end();
}

async function findItemById(itemId) {
  // check for empty string
  if (!itemId) {
    console.log("Item ID is empty");
    return null;
  }

  // try {
  //   const result = await notion.search({
  //     query: '',
  //     filter: {
  //       property: 'object',
  //       value: 'database'
  //     }
  //   });
  //   console.log('Search: ', result);
  // } catch (e) {
  //   console.log(e.message ?? JSON.stringify(e));
  // }

  // send request to Notion
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Item ID",
        rich_text: {
          equals: itemId,
        },
      },
    });

    console.log(response);
    if (response.results.length == 0) {
      console.log("Item ID not found", itemId);
      return null;
    }

    console.log("Found Item ID in Notion");
    console.log(response.results[0]);

    return response.results[0];
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
