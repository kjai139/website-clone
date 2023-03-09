const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");
const admin = require("firebase-admin");
const apiKey = functions.config().openai.api_key;

admin.initializeApp();
const OPENAI_API_KEY = apiKey;
exports.createImage = functions.https.onCall(async (data, context) => {
  const prompt = data.text;

  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }
  if (!data.text) {
    throw new functions.https.HttpsError("invalid arg");
  }

  const configuration = new Configuration({
    organization: "org-xYI01Jju1cnXsBsgmBPmE1qg",
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listModels();
  console.log(response);

  try {
    return openai.createImage({
      prompt: prompt,
      n: 3,
      size: "512x512",
    }).then( (response) => {
      const imageURLS = response.data;
      return imageURLS;
    });
  } catch (error) {
    console.error(error);
    throw new functions.https.HttpsError("internal error");
  }
});
