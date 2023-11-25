import OpenAI from "openai"
import { buildMessage } from "@/util/message";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'

const openai = new OpenAI()

let system = ''
async function loadSystem() {
    const file = await openai.files.content(process.env.ANIONE_GPT_FILE_ID)
    const messages = await file.text()
    system = JSON.parse(messages.split('\n')[0]).messages[0].content
}

export async function POST(req) {
    if (!system) await loadSystem()
    let { messages } = await req.json()
    messages = [
        buildMessage('system', system),
        ...messages,
    ]
    const response = await openai.chat.completions.create({
        messages,
        model: process.env.ANIONE_GPT_MODEL_ID,
        stream: true,
    })
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}