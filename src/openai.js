import { Configuration, OpenAIApi } from "openai";





const configuration = new Configuration({
    organization: "org-xYI01Jju1cnXsBsgmBPmE1qg",
    apiKey: `${process.env.REACT_APP_OPENAI_API}`,
});




export const openai = new OpenAIApi(configuration);



