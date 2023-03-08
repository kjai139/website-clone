import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-xYI01Jju1cnXsBsgmBPmE1qg",
    apiKey: "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",
});




export const openai = new OpenAIApi(configuration);



