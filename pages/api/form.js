import axios from "axios";

const webhook = 'https://n8n.sirenimports.com/webhook-test/7087828d-51ce-40a6-907d-2c5439022e23'

export default async function handler(req, res) {
  const webhookResponse = await callWebHook(req.body.params);
  console.log(webhookResponse)
}

async function callWebHook(params) {
  // check for empty string
  if (!params) {
    console.log("params invalid");
    return null;
  }

  // send request to Webhook
  try {
    const response = await webhookResponse.post(webhook, {
      params: params
    });

    console.log('response===>', response);

    return response;
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}