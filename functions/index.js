const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");


exports.createImage = functions.https.onCall(async (data, context) => {
  const prompt = data.prompt;

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API,
  });
  const openai = new OpenAIApi(configuration);

  return openai.createImage({
    prompt: prompt,
    n: 3,
    size: "512x512",
  }).then( (response) => {
    const imageURLS = response.data;
    return imageURLS;
  });
});


