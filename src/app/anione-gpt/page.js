"use client"

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export default function () {
    const { messages, setMessages, reload } = useChat({
        api: '/anione-gpt/api',
    })
    messages.forEach(message => console.log(message))

    useEffect(() => {
        setMessages([{
            role: 'user',
            content: '넌 누구냐?',
        }])
    }, [])
    return (
        <>
        </>
    )
}