import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-xYI01Jju1cnXsBsgmBPmE1qg",
    apiKey: "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",
});




export const openai = new OpenAIApi(configuration);



