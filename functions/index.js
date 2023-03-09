const functions = require("firebase-functions");
const {Configuration, OpenAIApi} = require("openai");
const admin = require("firebase-admin");

admin.initializeApp();
exports.createImage = functions.https.onCall(async (data, context) => {
  const prompt = data.text;

  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated");
  }
  if (!data.text) {
    throw new functions.https.HttpsError("invalid arg");
  }

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API,
  });
  const openai = new OpenAIApi(configuration);

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
