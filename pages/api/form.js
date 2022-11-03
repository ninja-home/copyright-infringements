import axios from "axios";

const webhook =
  "https://n8n.sirenimports.com/webhook-test/7087828d-51ce-40a6-907d-2c5439022e23";

export default async function handler(req, res) {
  if (!req.body.params) {
    res.status(200).json({
      submit_status: false,
    });
  }

  // send request to Webhook
  try {
    const response = await axios.post(webhook, {
      params: req.body.params,
    });

    res.status(200).json({
      submit_status: true,
    });
  } catch (e) {
    res.status(404).json({
      submit_status: false,
      message: "server not found. Start webhook!",
    });
  }
  res.end();
}
