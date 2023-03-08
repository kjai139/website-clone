const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const axios = require("axios");

exports.generateDALLEImage = functions.https.onCall(async (data, context) => {
  const prompt = data.prompt;
  const apiKey = "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";
  const apiUrl = "https://api.openai.com/v1/images/generations";

  const response = await axios.post(apiUrl, {
    prompt: prompt,
    n: 3,
    size: "512x512",
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
  });

  return response.data;
});

