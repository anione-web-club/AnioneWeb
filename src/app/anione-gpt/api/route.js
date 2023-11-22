import OpenAI from "openai"

const openai = new OpenAI()

export async function POST(req) {
    const messages = [await req.json()]
    const data = {
        messages,
        model: 'gpt-3.5-turbo',
        stream: false,
    }
    const response = await openai.chat.completions.create(data)
    return Response.json(response.choices[0].message)
}