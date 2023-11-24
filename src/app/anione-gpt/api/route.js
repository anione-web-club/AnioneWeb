import OpenAI from "openai"
import { readFileSync } from 'fs';
import { join } from 'path';
import { buildMessage } from "@/util/message";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI()
const system = readFileSync(join(
    process.cwd(),
    'public', 'anione-gpt', 'system.txt'
)).toString()

export async function POST(req) {
    const messages = [
        buildMessage('system', system),
        ...(await req.json()).messages,
    ]
    const data = {
        messages,
        model: process.env.ANIONE_GPT_MODEL_ID,
        stream: true,
    }
    const response = await openai.chat.completions.create(data)
    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream)
}