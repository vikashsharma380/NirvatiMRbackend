const axios = require("axios");

const sendWhatsApp = async ({ mobile, message }) => {
  const appkey = process.env.WHATSAPP_APPKEY;
  const authkey = process.env.WHATSAPP_AUTHKEY;

  if (!appkey || !authkey) {
    throw new Error(
      "WhatsApp API credentials are not configured"
    );
  }

  const response = await axios.post(
    "https://softapi.in/api/create-message",
    {
      appkey,
      authkey,
      to: `91${String(mobile).replace(/\D/g, "")}`,
      message,
    },
    {
      timeout: 15000,
    }
  );

  return response.data;
};

module.exports = {
  sendWhatsApp,
};