const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

exports.createImage = functions.https.onCall( async (data, context) => {
  const response = await openai.createImage({
    prompt: data.prompt,
    n: 3,
    size: "512x512",
  });


  const imgUrls = response.data;
  return imgUrls;
});


