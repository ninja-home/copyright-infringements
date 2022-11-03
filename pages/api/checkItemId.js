import { notion, databaseId } from "../../lib/notion";

export default async function handler(req, res) {
  const notionResponse = await findItemById(req.query.itemId);

  if (!notionResponse) {
    // Item ID not found from the database
    const noItemObject = {
      created_time: null,
      status: {
        select: {
          name: "Brandnew",
        },
      },
      url: null,
    };
    // res.status(404).json(noItemObject);
    res.status(200).json(noItemObject);
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

    if (response.results.length == 0) {
      // itemID Not found
      return null;
    }

    console.log("Found Item ID in Notion");
    return response.results[0];
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
