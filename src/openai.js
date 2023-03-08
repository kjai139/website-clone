import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-xYI01Jju1cnXsBsgmBPmE1qg",
    apiKey: "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",
});




export const openai = new OpenAIApi(configuration);



