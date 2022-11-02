const webhook = 'https://'

export default async function handler(req, res) {
  const { itemId } = req.body.params;
  // Get data submitted in request's body.
  // const body = req.body

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  // console.log('body:------------------------------------------------------ ', req)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  // if (!body.first || !body.last) {
  //     // Sends a HTTP bad request error code
  //     return res.status(400).json({ data: 'First or last name not found' })
  // }

  // // Found the name.
  // // Sends a HTTP success code
  // res.status(200).json({ data: `${body.first} ${body.last}` })
  res.status(200).json({ itemId: itemId });
}

async function callWebHook(itemId) {
  // check for empty string
  if (!itemId) {
    console.log("Item ID is empty");
    return null;
  }

  // send request to Webhook
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
    // console.log(response.results[0]);

    return response.results[0];
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}