import config from "../config.json" assert { type: "json" };
import { Configuration, OpenAIApi } from "openai"

const conf = new Configuration({
    apiKey: config.OPEN_AI_KEY,
})

const openai = new OpenAIApi(conf);

export async function generatePrompt(channelName) {
    const prompt = `One random "${channelName.replace('-', ' ')}" ice breaker question`;
    const convo = await getConversationStarter(prompt)
    return convo
}


const getConversationStarter = async (query) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        max_tokens: 2048,
        temperature: 1,
    })
    return response.data.choices[0].text.replace('\n','').replace(':', '');

}

