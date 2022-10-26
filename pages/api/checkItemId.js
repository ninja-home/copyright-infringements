import { Client } from '@notionhq/client'

console.log(`Notion api key: ${process.env.NOTION_API_KEY}`);

const notion = new Client({
    auth: process.env.NOTION_API_KEY
})

export default async function handler(req, res) {
    console.log('HTTP request query: ', req.query)

    const notionResponse = await findItemById(req.query.itemId)

    if (!notionResponse) {
        // Item ID not found
        res.status(404).json({})
    } else {
        const returnedObject = {
            created_time: notionResponse.created_time,
            status: notionResponse.properties.Status,
            url: notionResponse.properties.URL,
        }

        // Sends a HTTP success code
        res.status(200).json(returnedObject)
    }

    res.end()
}

async function findItemById(itemId) {
    // check for empty string
    if (!itemId) {
        console.log('Item ID is empty');
        return null;
    }

    // Database "Copyright infringement cases"
    const databaseId = '07bc07b136df4c01b526e6b72ccd4644';

    // send request to Notion
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Item ID',
            rich_text: {
                equals: itemId,
            }
        }
    });

    if (response.results.length == 0) {
        console.log('Item ID not found');
        return null;
    }

    console.log('Found Item ID in Notion');
    console.log(response.results[0]);

    return response.results[0];
}
