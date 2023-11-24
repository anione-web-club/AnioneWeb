'use client'

import { useChat } from 'ai/react';

export function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/anione-gpt/api',
    });

    return (
        <div>
            <ul>
                {messages.map((m, index) => (
                    <li key={index}>
                        {m.role === 'user' ? 'User: ' : 'AI: '}
                        {m.content}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <label>
                    <input value={input} onChange={handleInputChange} />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}