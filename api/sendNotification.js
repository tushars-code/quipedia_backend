// api/sendNotification.js

const axios = require("axios");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { playerId, message } = req.body;

  if (!playerId || !message) {
    return res.status(400).json({ error: "Missing playerId or message" });
  }

  try {
    await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: process.env.ONESIGNAL_APP_ID,
        include_player_ids: [playerId],
        contents: { en: message },
      },
      {
        headers: {
          Authorization: `Basic ${process.env.ONESIGNAL_REST_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true, message: "Notification sent" });
  } catch (error) {
    console.error("OneSignal Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
}
