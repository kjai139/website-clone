const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");


exports.createImage = functions.https.onCall( async (data, context) => {
  const prompt = data.prompt;

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",

    },
  };

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API,
  });
  const openai = new OpenAIApi(configuration);

  const apiResponse = await openai.createImage({
    prompt: prompt,
    n: 3,
    size: "512x512",
  });
  response.results = apiResponse.data;
  return response;
});


